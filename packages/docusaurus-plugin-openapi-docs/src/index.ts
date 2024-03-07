/* ============================================================================
 * Copyright (c) Palo Alto Networks
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 * ========================================================================== */

import fs from "fs";
import path from "path";
import zlib from "zlib";

import type { LoadContext, Plugin } from "@docusaurus/types";
import { Globby, posixPath } from "@docusaurus/utils";
import chalk from "chalk";
import mustache from "mustache";
const render = mustache.render;

import { createApiPageMD, createInfoPageMD, createTagPageMD } from "./markdown";
import { readOpenapiFiles, processOpenapiFiles } from "./openapi";
import { OptionsSchema } from "./options";
import generateSidebarSlice from "./sidebars";
import type { PluginOptions, LoadedContent, APIOptions } from "./types";

export function isURL(str: string): boolean {
  return /^(https?:)\/\//m.test(str);
}

export function getDocsPluginConfig(
  presetsPlugins: any[],
  pluginId: string
): Object | undefined {
  // eslint-disable-next-line array-callback-return
  const filteredConfig = presetsPlugins.filter((data) => {
    // Search presets
    if (Array.isArray(data)) {
      if (typeof data[0] === "string" && data[0].endsWith(pluginId)) {
        return data[1];
      }

      // Search plugin-content-docs instances
      if (
        typeof data[0] === "string" &&
        data[0] === "@docusaurus/plugin-content-docs"
      ) {
        const configPluginId = data[1].id ? data[1].id : "default";
        if (configPluginId === pluginId) {
          return data[1];
        }
      }
    }
  })[0];

  if (filteredConfig) {
    // Search presets, e.g. "classic"
    if (filteredConfig[0].endsWith(pluginId)) {
      return filteredConfig[1].docs;
    }

    // Search plugin-content-docs instances
    if (filteredConfig[0] === "@docusaurus/plugin-content-docs") {
      const configPluginId = filteredConfig[1].id
        ? filteredConfig[1].id
        : "default";
      if (configPluginId === pluginId) {
        return filteredConfig[1];
      }
    }
  }
  return;
}

function getPluginConfig(plugins: any[], pluginId: string): any {
  return plugins.filter((data) => data[1].id === pluginId)[0][1];
}

function getPluginInstances(plugins: any[]): any {
  return plugins.filter((data) => data[0] === "docusaurus-plugin-openapi-docs");
}

export default function pluginOpenAPIDocs(
  context: LoadContext,
  options: PluginOptions
): Plugin<LoadedContent> {
  const { config, docsPluginId } = options;
  const { siteDir, siteConfig } = context;

  // Get routeBasePath and path from plugin-content-docs or preset
  // DOCUO: Add default values of presets and plugins
  const presets: any = siteConfig.presets || [];
  const plugins: any = siteConfig.plugins || [];
  const presetsPlugins = presets.concat(plugins);
  // DOCUO: Add comment, the main thing is to get the default configuration
  let docData: any = getDocsPluginConfig(presetsPlugins, docsPluginId);
  let docRouteBasePath = docData ? docData.routeBasePath : undefined;
  let docPath = docData ? (docData.path ? docData.path : "docs") : undefined;

  async function generateApiDocs(options: APIOptions, pluginId: any) {
    console.log(chalk.green(`###### generateApiDocs pluginId "${pluginId}"`));
    console.log(
      chalk.green(`###### generateApiDocs options "${JSON.stringify(options)}"`)
    );
    let {
      specPath,
      outputDir,
      template,
      markdownGenerators,
      downloadUrl,
      sidebarOptions,
    } = options;

    // Remove trailing slash before proceeding
    outputDir = outputDir.replace(/\/$/, "");

    // Override docPath if pluginId provided
    if (pluginId) {
      docData = getDocsPluginConfig(presetsPlugins, pluginId);
      docRouteBasePath = docData ? docData.routeBasePath : undefined;
      docPath = docData ? (docData.path ? docData.path : "docs") : undefined;
    }

    const contentPath = isURL(specPath)
      ? specPath
      : path.resolve(siteDir, specPath);

    try {
      const openapiFiles = await readOpenapiFiles(contentPath);
      const [loadedApi, tags] = await processOpenapiFiles(
        openapiFiles,
        options,
        sidebarOptions!
      );
      if (!fs.existsSync(outputDir)) {
        try {
          fs.mkdirSync(outputDir, { recursive: true });
          console.log(chalk.green(`Successfully created "${outputDir}"`));
        } catch (err) {
          console.error(
            chalk.red(`Failed to create "${outputDir}"`),
            chalk.yellow(err)
          );
        }
      }

      // TODO: figure out better way to set default
      if (Object.keys(sidebarOptions ?? {}).length > 0) {
        const sidebarSlice = generateSidebarSlice(
          sidebarOptions!,
          options,
          loadedApi,
          tags,
          docPath
        );

        const sidebarSliceTemplate = `module.exports = {{{slice}}};`;

        const view = render(sidebarSliceTemplate, {
          slice: JSON.stringify(sidebarSlice),
        });

        if (!fs.existsSync(`${outputDir}/sidebar.js`)) {
          try {
            fs.writeFileSync(`${outputDir}/sidebar.js`, view, "utf8");
            console.log(
              chalk.green(`Successfully created "${outputDir}/sidebar.js"`)
            );
          } catch (err) {
            console.error(
              chalk.red(`Failed to write "${outputDir}/sidebar.js"`),
              chalk.yellow(err)
            );
          }
        }
      }

      const mdTemplate = template
        ? fs.readFileSync(template).toString()
        : `---
id: {{{id}}}
title: "{{{title}}}"
description: "{{{frontMatter.description}}}"
{{^api}}
sidebar_label: Introduction
{{/api}}
{{#api}}
sidebar_label: "{{{title}}}"
{{/api}}
{{^api}}
sidebar_position: 0
{{/api}}
hide_title: true
{{#api}}
hide_table_of_contents: true
{{/api}}
{{#json}}
api: {{{json}}}
{{/json}}
{{#api.method}}
sidebar_class_name: "{{{api.method}}} api-method"
{{/api.method}}
{{#infoPath}}
info_path: {{{infoPath}}}
{{/infoPath}}
custom_edit_url: null
{{#frontMatter.proxy}}
proxy: {{{frontMatter.proxy}}}
{{/frontMatter.proxy}}
{{#frontMatter.hide_send_button}}
hide_send_button: true
{{/frontMatter.hide_send_button}}
{{#frontMatter.show_extensions}}
show_extensions: true
{{/frontMatter.show_extensions}}
---

{{{markdown}}}
      `;

      const infoMdTemplate = `---
id: {{{id}}}
title: "{{{title}}}"
description: "{{{frontMatter.description}}}"
sidebar_label: "{{{title}}}"
hide_title: true
custom_edit_url: null
---

{{{markdown}}}

\`\`\`mdx-code-block
import DocCardList from '@theme/DocCardList';
import {useCurrentSidebarCategory} from '@docusaurus/theme-common';

<DocCardList items={useCurrentSidebarCategory().items}/>
\`\`\`
      `;

      const tagMdTemplate = `---
id: {{{id}}}
title: "{{{frontMatter.description}}}"
description: "{{{frontMatter.description}}}"
custom_edit_url: null
---

{{{markdown}}}

\`\`\`mdx-code-block
import DocCardList from '@theme/DocCardList';
import {useCurrentSidebarCategory} from '@docusaurus/theme-common';

<DocCardList items={useCurrentSidebarCategory().items}/>
\`\`\`
      `;

      const apiPageGenerator =
        markdownGenerators?.createApiPageMD ?? createApiPageMD;
      const infoPageGenerator =
        markdownGenerators?.createInfoPageMD ?? createInfoPageMD;
      const tagPageGenerator =
        markdownGenerators?.createTagPageMD ?? createTagPageMD;

      loadedApi.map(async (item) => {
        if (item.type === "info") {
          if (downloadUrl && isURL(downloadUrl)) {
            item.downloadUrl = downloadUrl;
          }
        }
        const markdown =
          item.type === "api"
            ? apiPageGenerator(item)
            : item.type === "info"
              ? infoPageGenerator(item)
              : tagPageGenerator(item);
        item.markdown = markdown;
        if (item.type === "api") {
          // opportunity to compress JSON
          // const serialize = (o: any) => {
          //   return zlib.deflateSync(JSON.stringify(o)).toString("base64");
          // };
          // const deserialize = (s: any) => {
          //   return zlib.inflateSync(Buffer.from(s, "base64")).toString();
          // };
          item.json = zlib
            .deflateSync(JSON.stringify(item.api))
            .toString("base64");
          let infoBasePath = `${outputDir}/${item.infoId}`;
          if (docRouteBasePath) {
            infoBasePath = `${docRouteBasePath}/${outputDir
              .split(docPath!)[1]
              .replace(/^\/+/g, "")}/${item.infoId}`.replace(/^\/+/g, "");
          }
          if (item.infoId) item.infoPath = infoBasePath;
        }

        const view = render(mdTemplate, item);
        const utils = render(infoMdTemplate, item);
        const tagUtils = render(tagMdTemplate, item);

        if (item.type === "api") {
          if (!fs.existsSync(`${outputDir}/${item.id}.api.mdx`)) {
            try {
              // kebabCase(arg) returns 0-length string when arg is undefined
              if (item.id.length === 0) {
                throw Error(
                  "Operation must have summary or operationId defined"
                );
              }
              fs.writeFileSync(`${outputDir}/${item.id}.api.mdx`, view, "utf8");
              console.log(
                chalk.green(
                  `Successfully created "${outputDir}/${item.id}.api.mdx"`
                )
              );
            } catch (err) {
              console.error(
                chalk.red(`Failed to write "${outputDir}/${item.id}.api.mdx"`),
                chalk.yellow(err)
              );
            }
          }
        }

        // TODO: determine if we actually want/need this
        if (item.type === "info") {
          if (!fs.existsSync(`${outputDir}/${item.id}.info.mdx`)) {
            try {
              sidebarOptions?.categoryLinkSource === "info" // Only use utils template if set to "info"
                ? fs.writeFileSync(
                    `${outputDir}/${item.id}.info.mdx`,
                    utils,
                    "utf8"
                  )
                : fs.writeFileSync(
                    `${outputDir}/${item.id}.info.mdx`,
                    view,
                    "utf8"
                  );
              console.log(
                chalk.green(
                  `Successfully created "${outputDir}/${item.id}.info.mdx"`
                )
              );
            } catch (err) {
              console.error(
                chalk.red(`Failed to write "${outputDir}/${item.id}.info.mdx"`),
                chalk.yellow(err)
              );
            }
          }
        }

        if (item.type === "tag") {
          if (!fs.existsSync(`${outputDir}/${item.id}.tag.mdx`)) {
            try {
              fs.writeFileSync(
                `${outputDir}/${item.id}.tag.mdx`,
                tagUtils,
                "utf8"
              );
              console.log(
                chalk.green(
                  `Successfully created "${outputDir}/${item.id}.tag.mdx"`
                )
              );
            } catch (err) {
              console.error(
                chalk.red(`Failed to write "${outputDir}/${item.id}.tag.mdx"`),
                chalk.yellow(err)
              );
            }
          }
        }
        return;
      });

      return;
    } catch (e) {
      console.error(chalk.red(`Loading of api failed for "${contentPath}"`));
      throw e;
    }
  }

  async function cleanApiDocs(options: APIOptions) {
    const { outputDir } = options;
    const apiDir = posixPath(path.join(siteDir, outputDir));
    const apiMdxFiles = await Globby(["*.api.mdx", "*.info.mdx", "*.tag.mdx"], {
      cwd: path.resolve(apiDir),
      deep: 1,
    });
    const sidebarFile = await Globby(["sidebar.js"], {
      cwd: path.resolve(apiDir),
      deep: 1,
    });
    apiMdxFiles.map((mdx) =>
      fs.unlink(`${apiDir}/${mdx}`, (err) => {
        if (err) {
          console.error(
            chalk.red(`Cleanup failed for "${apiDir}/${mdx}"`),
            chalk.yellow(err)
          );
        } else {
          console.log(chalk.green(`Cleanup succeeded for "${apiDir}/${mdx}"`));
        }
      })
    );

    sidebarFile.map((sidebar) =>
      fs.unlink(`${apiDir}/${sidebar}`, (err) => {
        if (err) {
          console.error(
            chalk.red(`Cleanup failed for "${apiDir}/${sidebar}"`),
            chalk.yellow(err)
          );
        } else {
          console.log(
            chalk.green(`Cleanup succeeded for "${apiDir}/${sidebar}"`)
          );
        }
      })
    );
  }

  async function generateVersions(versions: object, outputDir: string) {
    let versionsArray = [] as object[];
    for (const [version, metadata] of Object.entries(versions)) {
      versionsArray.push({
        version: version,
        label: metadata.label,
        baseUrl: metadata.baseUrl,
      });
    }

    const versionsJson = JSON.stringify(versionsArray, null, 2);
    try {
      // DOCUO: Fixed a bug where the directory does not exist
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir);
      }
      fs.writeFileSync(`${outputDir}/versions.json`, versionsJson, "utf8");
      console.log(
        chalk.green(`Successfully created "${outputDir}/versions.json"`)
      );
    } catch (err) {
      console.error(
        chalk.red(`Failed to write "${outputDir}/versions.json"`),
        chalk.yellow(err)
      );
    }
  }

  async function cleanVersions(outputDir: string) {
    if (fs.existsSync(`${outputDir}/versions.json`)) {
      fs.unlink(`${outputDir}/versions.json`, (err) => {
        if (err) {
          console.error(
            chalk.red(`Cleanup failed for "${outputDir}/versions.json"`),
            chalk.yellow(err)
          );
        } else {
          console.log(
            chalk.green(`Cleanup succeeded for "${outputDir}/versions.json"`)
          );
        }
      });
    }
  }

  return {
    name: `docusaurus-plugin-openapi-docs`,

    // DOCUO: Adapt cli
    extendCli(cli: any): void {
      cli.usage("$0 gen-api-docs --id <id>").command(
        `gen-api-docs`,
        `Generates OpenAPI docs in MDX file format and sidebar.js (if enabled).`,
        () => undefined,
        async (args: any, instance: any) => {
          // DOCUO: Adapt params
          const id = args["id"];
          const options = instance ? instance.opts() : { pluginId: undefined };
          const pluginId = options.pluginId;
          const pluginInstances = getPluginInstances(plugins);
          let targetConfig: any;
          let targetDocsPluginId: any;
          if (pluginId) {
            try {
              const pluginConfig = getPluginConfig(plugins, pluginId);
              targetConfig = pluginConfig.config ?? {};
              targetDocsPluginId = pluginConfig.docsPluginId;
            } catch {
              console.error(
                chalk.red(`OpenAPI docs plugin ID '${pluginId}' not found.`)
              );
              return;
            }
          } else {
            if (pluginInstances.length > 1) {
              console.error(
                chalk.red(
                  "OpenAPI docs plugin ID must be specified when more than one plugin instance exists."
                )
              );
              return;
            }
            targetConfig = config;
          }

          if (id === "all") {
            if (targetConfig[id]) {
              console.error(
                chalk.red(
                  "Can't use id 'all' for OpenAPI docs configuration key."
                )
              );
            } else {
              Object.keys(targetConfig).forEach(async function (key) {
                await generateApiDocs(targetConfig[key], targetDocsPluginId);
              });
            }
          } else if (!targetConfig[id]) {
            console.error(
              chalk.red(`ID '${id}' does not exist in OpenAPI docs config.`)
            );
          } else {
            await generateApiDocs(targetConfig[id], targetDocsPluginId);
          }
        }
      );

      cli.usage("$0 gen-api-docs:version --id:version <id:version>").command(
        `gen-api-docs:version`,
        `Generates versioned OpenAPI docs in MDX file format, versions.js and sidebar.js (if enabled).`,
        () => undefined,
        async (args: any, instance: any) => {
          // DOCUO: Adapt params
          const id = args["id:version"];
          const options = instance ? instance.opts() : { pluginId: undefined };
          const pluginId = options.pluginId;
          const pluginInstances = getPluginInstances(plugins);
          let targetConfig: any;
          let targetDocsPluginId: any;
          if (pluginId) {
            try {
              const pluginConfig = getPluginConfig(plugins, pluginId);
              targetConfig = pluginConfig.config ?? {};
              targetDocsPluginId = pluginConfig.docsPluginId;
            } catch {
              console.error(
                chalk.red(`OpenAPI docs plugin ID '${pluginId}' not found.`)
              );
              return;
            }
          } else {
            if (pluginInstances.length > 1) {
              console.error(
                chalk.red(
                  "OpenAPI docs plugin ID must be specified when more than one plugin instance exists."
                )
              );
              return;
            }
            targetConfig = config;
          }
          const [parentId, versionId] = id.split(":");
          const parentConfig = Object.assign({}, targetConfig[parentId]);

          const version = parentConfig.version as string;
          const label = parentConfig.label as string;
          const baseUrl = parentConfig.baseUrl as string;

          let parentVersion = {} as any;
          parentVersion[version] = { label: label, baseUrl: baseUrl };

          const { versions } = targetConfig[parentId] as any;
          const mergedVersions = Object.assign(parentVersion, versions);

          // Prepare for merge
          delete parentConfig.versions;
          delete parentConfig.version;
          delete parentConfig.label;
          delete parentConfig.baseUrl;

          // TODO: handle when no versions are defined by version command is passed
          if (versionId === "all") {
            if (versions[id]) {
              console.error(
                chalk.red(
                  "Can't use id 'all' for OpenAPI docs versions configuration key."
                )
              );
            } else {
              await generateVersions(mergedVersions, parentConfig.outputDir);
              Object.keys(versions).forEach(async (key) => {
                const versionConfig = versions[key];
                const mergedConfig = {
                  ...parentConfig,
                  ...versionConfig,
                };
                await generateApiDocs(mergedConfig, targetDocsPluginId);
              });
            }
          } else if (!versions[versionId]) {
            console.error(
              chalk.red(
                `Version ID '${versionId}' does not exist in OpenAPI docs versions config.`
              )
            );
          } else {
            const versionConfig = versions[versionId];
            const mergedConfig = {
              ...parentConfig,
              ...versionConfig,
            };
            await generateVersions(mergedVersions, parentConfig.outputDir);
            await generateApiDocs(mergedConfig, targetDocsPluginId);
          }
        }
      );

      cli.usage("$0 clean-api-docs --id <id>").command(
        `clean-api-docs`,
        `Clears the generated OpenAPI docs MDX files and sidebar.js (if enabled).`,
        () => undefined,
        async (args: any, instance: any) => {
          // DOCUO: Adapt params
          const id = args["id"];
          const options = instance ? instance.opts() : { pluginId: undefined };
          const pluginId = options.pluginId;
          const pluginInstances = getPluginInstances(plugins);
          let targetConfig: any;
          if (pluginId) {
            try {
              const pluginConfig = getPluginConfig(plugins, pluginId);
              targetConfig = pluginConfig.config ?? {};
            } catch {
              console.error(
                chalk.red(`OpenAPI docs plugin ID '${pluginId}' not found.`)
              );
              return;
            }
          } else {
            if (pluginInstances.length > 1) {
              console.error(
                chalk.red(
                  "OpenAPI docs plugin ID must be specified when more than one plugin instance exists."
                )
              );
              return;
            }
            targetConfig = config;
          }
          if (id === "all") {
            if (targetConfig[id]) {
              console.error(
                chalk.red(
                  "Can't use id 'all' for OpenAPI docs configuration key."
                )
              );
            } else {
              Object.keys(targetConfig).forEach(async function (key) {
                await cleanApiDocs(targetConfig[key]);
              });
            }
          } else {
            await cleanApiDocs(targetConfig[id]);
          }
        }
      );

      cli.usage("$0 clean-api-docs:version --id:version <id:version>").command(
        `clean-api-docs:version`,
        `Clears the versioned, generated OpenAPI docs MDX files, versions.json and sidebar.js (if enabled).`,
        () => undefined,
        async (args: any, instance: any) => {
          // DOCUO: Adapt params
          const id = args["id:version"];
          const options = instance ? instance.opts() : { pluginId: undefined };
          const pluginId = options.pluginId;
          const pluginInstances = getPluginInstances(plugins);
          let targetConfig: any;
          if (pluginId) {
            try {
              const pluginConfig = getPluginConfig(plugins, pluginId);
              targetConfig = pluginConfig.config ?? {};
            } catch {
              console.error(
                chalk.red(`OpenAPI docs plugin ID '${pluginId}' not found.`)
              );
              return;
            }
          } else {
            if (pluginInstances.length > 1) {
              console.error(
                chalk.red(
                  "OpenAPI docs plugin ID must be specified when more than one plugin instance exists."
                )
              );
              return;
            }
            targetConfig = config;
          }
          const [parentId, versionId] = id.split(":");
          const { versions } = targetConfig[parentId] as any;

          const parentConfig = Object.assign({}, targetConfig[parentId]);
          delete parentConfig.versions;

          if (versionId === "all") {
            if (versions[id]) {
              chalk.red(
                "Can't use id 'all' for OpenAPI docs versions configuration key."
              );
            } else {
              await cleanVersions(parentConfig.outputDir);
              Object.keys(versions).forEach(async (key) => {
                const versionConfig = versions[key];
                const mergedConfig = {
                  ...parentConfig,
                  ...versionConfig,
                };
                await cleanApiDocs(mergedConfig);
              });
            }
          } else {
            const versionConfig = versions[versionId];
            const mergedConfig = {
              ...parentConfig,
              ...versionConfig,
            };
            await cleanApiDocs(mergedConfig);
          }
        }
      );
    },
  };
}

pluginOpenAPIDocs.validateOptions = ({ options, validate }: any) => {
  const validatedOptions = validate(OptionsSchema, options);
  return validatedOptions;
};