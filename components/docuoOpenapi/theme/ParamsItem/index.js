/* ============================================================================
 * Copyright (c) Palo Alto Networks
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 * ========================================================================== */

import React from "react";

// import CodeBlock from "@docusaurus/theme-classic/lib/theme/CodeBlock";
import { Callout, Code } from "@/components/mdx";
import SchemaItem from "@/components/docuoOpenapi/theme/SchemaItem";
import SchemaTabs from "@/components/docuoOpenapi/theme/SchemaTabs";
import TabItem from "@/components/docuoOpenapi/theme-classic/src/theme/TabItem";
/* eslint-disable import/no-extraneous-dependencies*/
import { createDescription } from "@/components/docuoOpenapi/markdown/createDescription";
/* eslint-disable import/no-extraneous-dependencies*/
import {
  getQualifierMessage,
  getSchemaName,
} from "@/components/docuoOpenapi/markdown/schema";
/* eslint-disable import/no-extraneous-dependencies*/
import { guard } from "@/components/docuoOpenapi/markdown/utils";
import {
  getParameterDisplayName,
  getRecursiveParameterTree,
  getStructureQualifierSchema,
  getVisibleParameterExamples,
} from "./parameterDisplay";
import { normalizeDescriptionCallouts } from "./descriptionCallouts";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

import useLanguage from "@/components/hooks/useLanguage";
import { copywriting } from "@/components/constant/language";

function QueryParameterName({ name, currentLanguage }) {
  const queryNameLabel =
    currentLanguage === "zh" ? "Query 参数名" : "Query parameter";

  return (
    <div className="openapi-params__query-name">
      <strong>{queryNameLabel}：</strong>
      <code>{name}</code>
    </div>
  );
}

function RecursiveQualifier({ schema, currentLanguage }) {
  const t =
    (copywriting[currentLanguage] && copywriting[currentLanguage].openapi) ||
    copywriting.en.openapi;
  const message = getQualifierMessage(schema);
  if (!message) return null;

  const localized =
    typeof message === "string"
      ? message.replace(
          /^\*{2}Possible values:\*{2}/,
          `**${t.content.possibleValuesLabel}:**`
        )
      : message;

  return (
    <ReactMarkdown
      children={createDescription(localized)}
      rehypePlugins={[rehypeRaw]}
    />
  );
}

function RecursiveArrayContainer({ node, currentLanguage }) {
  const children = Array.isArray(node.children) ? node.children : [];
  const isPrimitiveItem = node.itemSchema?.type !== "object";

  return (
    <div className="openapi-params__array-container">
      <div className="opening-array-bracket-container">
        <div className="opening-array-bracket">
          <span className="opening-array-bracket_text">Array</span>
          <span className="opening-array-bracket_symbol">[</span>
        </div>
      </div>
      {isPrimitiveItem ? (
        <div className="openapi-params__array-value">
          <span className="openapi-schema__name">
            {getSchemaName(node.itemSchema)}
          </span>
          <RecursiveQualifier
            schema={node.itemSchema}
            currentLanguage={currentLanguage}
          />
          {node.queryName ? (
            <QueryParameterName
              name={node.queryName}
              currentLanguage={currentLanguage}
            />
          ) : null}
        </div>
      ) : null}
      {children.map((child) => (
        <RecursiveParameterNode
          key={child.path}
          node={child}
          currentLanguage={currentLanguage}
        />
      ))}
      <div className="closing-array-bracket-container">
        <div className="closing-array-bracket">]</div>
      </div>
    </div>
  );
}

function RecursiveParameterNode({ node, currentLanguage }) {
  const children = Array.isArray(node.children) ? node.children : [];

  return (
    <SchemaItem
      collapsible={false}
      name={node.name}
      qualifierMessage={getQualifierMessage(getStructureQualifierSchema(node))}
      required={node.required}
      schemaName={getSchemaName(node.schema)}
      schema={node.schema}
    >
      {node.kind !== "array" && node.queryName ? (
        <QueryParameterName
          name={node.queryName}
          currentLanguage={currentLanguage}
        />
      ) : null}
      {node.kind === "array" ? (
        <RecursiveArrayContainer node={node} currentLanguage={currentLanguage} />
      ) : children.length > 0 ? (
        <div className="openapi-params__recursive-children">
          {children.map((child) => (
            <RecursiveParameterNode
              key={child.path}
              node={child}
              currentLanguage={currentLanguage}
            />
          ))}
        </div>
      ) : null}
    </SchemaItem>
  );
}

function ParamsItem({ param }) {
  let { description, example, examples, name, required, schema } = param;
  const { currentLanguage } = useLanguage();
  const t = (copywriting[currentLanguage] && copywriting[currentLanguage].openapi) || copywriting.en.openapi;
  const displayName = getParameterDisplayName(param);

  if (!schema || !schema?.type) {
    schema = { type: "any" };
  }

  const renderSchemaName = guard(schema, (schema) => (
    <span className="openapi-schema__type"> {getSchemaName(schema)}</span>
  ));

  const renderSchemaRequired = guard(required, () => (
    <span className="openapi-schema__required">{t.content.requiredTag}</span>
  ));

  const renderSchema = guard(getQualifierMessage(schema), (message) => {
    const localized =
      typeof message === "string"
        ? message.replace(/^\*{2}Possible values:\*{2}/, `**${t.content.possibleValuesLabel}:**`)
        : message;
    return (
      <div>
        <ReactMarkdown
          // eslint-disable-next-line react/no-children-prop
          children={createDescription(localized)}
          rehypePlugins={[rehypeRaw]}
        />
      </div>
    );
  });

  const renderDescription = guard(description, (description) => (
    <div>
      <ReactMarkdown
        // eslint-disable-next-line react/no-children-prop
        children={createDescription(normalizeDescriptionCallouts(description))}
        components={{
          pre: "div",
          div({ node, children, ...props }) {
            if (props["data-docuo-callout"] === "warning") {
              const calloutProps = { ...props };
              const title = calloutProps["data-title"] || "注意";
              delete calloutProps["data-docuo-callout"];
              delete calloutProps["data-title"];
              return (
                <Callout.Warning title={title} {...calloutProps}>
                  {children}
                </Callout.Warning>
              );
            }
            return <div {...props}>{children}</div>;
          },
          a({ href, children, ...props }) {
            const raw = href || "";
            const isExternal = raw.startsWith("http") || raw.startsWith("mailto:") || raw.startsWith("tel:");
            if (isExternal || raw.startsWith("/article/")) return <a {...props} href={href}>{children}</a>;
            const clean = raw.split("#")[0].split("?")[0];
            const last = clean.substring(clean.lastIndexOf("/") + 1);
            const hasExt = /\.[^./]+$/.test(last);
            const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
            const needBase = raw.startsWith("/") && basePath && !raw.startsWith(`${basePath}/`) && !hasExt;
            const finalHref = needBase ? `${basePath}${raw}` : raw;
            return <a {...props} href={finalHref}>{children}</a>;
          },
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "");
            if (inline || !children.endsWith("\n")) return <code>{children}</code>;
            const lang = match ? match[1] : "text";
            const codeString = Array.isArray(children) ? children.join("") : children;
            return !inline ? (
              <Code code={codeString} lang={lang} className={className} />
            ) : (
              <Code code={codeString} lang="text" />
            );
          },
        }}
        rehypePlugins={[rehypeRaw]}
      />
    </div>
  ));

  const defaultValue = schema && schema.items
    ? schema.items.default
    : schema
    ? schema.default
    : undefined;

  const renderDefaultValue = defaultValue !== undefined ? (
    <div>
      {/* eslint-disable-next-line react/no-children-prop */}
      <ReactMarkdown children={`**${t.content.defaultValueLabel}:** \`${defaultValue}\``} />
    </div>
  ) : null;

  const recursiveParameterTree = getRecursiveParameterTree(param);
  const renderRecursiveParameterStructure = recursiveParameterTree ? (
    <div className="openapi-params__recursive-structure">
      <RecursiveArrayContainer
        node={recursiveParameterTree}
        currentLanguage={currentLanguage}
      />
    </div>
  ) : null;

  const { structured: formattedExample, query: queryExample } =
    getVisibleParameterExamples(param);
  const renderExample = formattedExample ? (
    <div>
      <strong>{t.content.example}: </strong>
      {formattedExample.language === "json" ? (
        <Code code={formattedExample.value} lang="json" />
      ) : (
        formattedExample.value
      )}
    </div>
  ) : null;

  const renderQueryExample = queryExample ? (
    <div>
      <strong>
        {currentLanguage === "zh" ? "Query 示例" : "Query example"}:
      </strong>
      <Code code={queryExample} lang="text" />
    </div>
  ) : null;

  const renderExamples = guard(examples, (examples) => {
    const exampleEntries = Object.entries(examples);
    return (
      <>
        <strong>{t.content.examples}:</strong>
        <SchemaTabs>
          {exampleEntries.map(([exampleName, exampleProperties]) => (
            <TabItem value={exampleName} label={exampleName} key={exampleName}>
              {exampleProperties.summary && <p>{exampleProperties.summary}</p>}
              {exampleProperties.description && (
                <p>
                  <strong>{t.content.description}: </strong>
                  <span>{exampleProperties.description}</span>
                </p>
              )}
              <p>
                <strong>{t.content.example}: </strong>
                <code>{exampleProperties.value}</code>
              </p>
            </TabItem>
          ))}
        </SchemaTabs>
      </>
    );
  });

  return (
    <div className="openapi-params__list-item">
      <span className="openapi-schema__container">
        <strong className="openapi-schema__property">{displayName}</strong>
        {renderSchemaName}
        {required && <span className="openapi-schema__divider"></span>}
        {renderSchemaRequired}
      </span>
      {renderSchema ? (
        <div className="openapi-params_schema">{renderSchema} </div>
      ) : null}
      {renderDefaultValue ? (
        <div className="openapi-params_default_value">{renderDefaultValue}</div>
      ) : null}
      {renderDescription ? (
        <div className="openapi-params_description">{renderDescription}</div>
      ) : null}
      {renderRecursiveParameterStructure}
      {renderExample ? (
        <div className="openapi-params_example">{renderExample}</div>
      ) : null}
      {renderQueryExample ? (
        <div className="openapi-params_query_example">{renderQueryExample}</div>
      ) : null}
      {renderExamples ? (
        <div className="openapi-params_examples">{renderExamples}</div>
      ) : null}
    </div>
  );
}

export default ParamsItem;
