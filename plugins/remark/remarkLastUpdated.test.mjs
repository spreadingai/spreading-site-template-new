import assert from 'node:assert/strict';
import fs from 'node:fs';
import { createRequire } from 'node:module';
import path from 'node:path';
import test from 'node:test';
import ts from 'typescript';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { MDXProvider, useMDXComponents } from '@mdx-js/react';
import { bundleMDX } from 'mdx-bundler';
import { getMDXComponent } from 'mdx-bundler/client/index.js';

process.env.NODE_ENV = 'production';
const require = createRequire(import.meta.url);
// Load the real TSX components in Node, replacing only CSS module loading.
for (const extension of ['.ts', '.tsx']) {
  require.extensions[extension] = (module, filename) => {
    const { outputText } = ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
      compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.React, esModuleInterop: true },
    });
    module._compile(outputText, filename);
  };
}
require.extensions['.scss'] = (module) => {
  module.exports = { lastUpdated: 'lastUpdated', dateText: 'dateText', calendarIcon: 'calendarIcon' };
};
const { Heading } = require('../../components/mdx/Heading/index.tsx');
const lastUpdated = require('../../components/mdx/LastUpdated/index.tsx');
const pluginSource = ts.transpileModule(fs.readFileSync(new URL('./remarkLastUpdated.ts', import.meta.url), 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.ESNext },
}).outputText.replace('"unist-util-visit"', JSON.stringify(import.meta.resolve('unist-util-visit')));
const plugin = await import('data:text/javascript;base64,' + Buffer.from(pluginSource).toString('base64'));
const utilsUrl = 'data:text/javascript;base64,' + Buffer.from(
  fs.readFileSync(new URL('../utils/index.js', import.meta.url), 'utf8')
).toString('base64');
let tocSource = fs.readFileSync(new URL('./remarkToc.js', import.meta.url), 'utf8');
for (const name of ['unist-util-visit', 'github-slugger', 'mdast-util-to-string']) {
  tocSource = tocSource.replace(JSON.stringify(name), JSON.stringify(import.meta.resolve(name)));
}
tocSource = tocSource.replace('"../utils"', JSON.stringify(utilsUrl));
const { remarkToc } = await import('data:text/javascript;base64,' + Buffer.from(tocSource).toString('base64'));

async function render(source, files = {}) {
  const entryFilePath = path.resolve('date-test-entry.mdx');
  const exportRef = { entryFilePath, dates: new Map() };
  const bundled = await bundleMDX({
    cwd: process.cwd(), source: { value: source, path: entryFilePath }, files,
    globals: { '@mdx-js/react': { varName: 'MdxJsReact', namedExports: ['useMDXComponents'], defaultExport: false } },
    mdxOptions(opts) {
      opts.remarkPlugins = [...opts.remarkPlugins,
        [remarkToc, { exportRef: {} }], [plugin.remarkLastUpdated, { exportRef }],
      ];
      opts.providerImportSource = '@mdx-js/react';
      return opts;
    },
  });
  const Component = getMDXComponent(bundled.code, { MdxJsReact: { useMDXComponents } });
  const date = plugin.resolveLastUpdatedDate(exportRef);
  return renderToStaticMarkup(React.createElement(lastUpdated.LastUpdatedProvider, { value: date },
    React.createElement(MDXProvider, { components: {
      Heading, LastUpdated: lastUpdated.LastUpdated,
    } }, React.createElement(Component))));
}

const b = '---\ndate: "2026-01-01"\n---\n\nFirst paragraph\n\nSecond paragraph';
const imports = 'import B from "./b.mdx"\n\n';
function assertDate(html, date) {
  assert.equal((html.match(/class="lastUpdated"/g) || []).length, date ? 1 : 0, html);
  if (date) {
    assert.match(html, new RegExp('</h1>\\s*<div class="lastUpdated">'));
    assert.ok(html.includes(`<span class="dateText">${date}</span>`), html);
  }
}

test('inherits imported date immediately after the entry h1', async () => {
  assertDate(await render(imports + '# Entry\n\n<B />', { 'b.mdx': b }), '2026-01-01');
});
test('entry none disables imported date', async () => {
  assertDate(await render('---\ndate: none\n---\n\n' + imports + '# Entry\n\n<B />', { 'b.mdx': b }));
});
test('entry date takes precedence over one imported date', async () => {
  assertDate(await render('---\ndate: "2026-01-02"\n---\n\n' + imports + '# Entry\n\n<B />', { 'b.mdx': b }), '2026-01-02');
});
for (const entryDate of ['', '---\ndate: "2026-01-02"\n---\n\n']) {
  test(`multiple imported dates disable display (${entryDate ? 'with' : 'without'} entry date)`, async () => {
    assertDate(await render(entryDate + imports + 'import D from "./d.mdx"\n\n# Entry\n\n<B />\n\n<D />', { 'b.mdx': b, 'd.mdx': b }));
  });
}
test('no h1 disables even an explicit entry date', async () => {
  assertDate(await render('---\ndate: "2026-01-02"\n---\n\n' + imports + 'Entry paragraph\n\n<B />', { 'b.mdx': b }));
});
test('no date renders no date element', async () => {
  assertDate(await render('# Entry\n\nContent'));
});
test('standalone entry date is visible in server HTML', async () => {
  assertDate(await render('---\ndate: "2026-01-02"\n---\n\n# Entry\n\nContent'), '2026-01-02');
});
test('nested imports can provide the date and the h1', async () => {
  assertDate(await render(imports + '<B />', {
    'b.mdx': 'import D from "./d.mdx"\n\n<D />',
    'd.mdx': '---\ndate: "2026-01-01"\n---\n\n# Imported title\n\nContent',
  }), '2026-01-01');
});
test('a nested explicit Heading renders the date immediately after h1', async () => {
  assertDate(await render('---\ndate: "2026-01-02"\n---\n\n<div>\n<Heading level="1">Entry</Heading>\n</div>'), '2026-01-02');
});
test('imported none is not displayed as a date', async () => {
  assertDate(await render(imports + '# Entry\n\n<B />', { 'b.mdx': '---\ndate: none\n---\n\nContent' }));
});
test('explicit JSX h1 shares the same date position', async () => {
  assertDate(await render('---\ndate: "2026-01-02"\n---\n\n<h1 id="title">Entry</h1>\n\nContent'), '2026-01-02');
});
test('multiple imports with only one date still inherit that date', async () => {
  assertDate(await render(imports + 'import D from "./d.mdx"\n\n# Entry\n\n<B />\n\n<D />', {
    'b.mdx': b, 'd.mdx': 'Content without date',
  }), '2026-01-01');
});
test('rendering the same imported file twice counts its date once', async () => {
  assertDate(await render(imports + '# Entry\n\n<B />\n\n<B />', { 'b.mdx': b }), '2026-01-01');
});
test('separate page builds do not retain the previous page date', async () => {
  assertDate(await render(imports + '# Entry\n\n<B />', { 'b.mdx': b }), '2026-01-01');
  assertDate(await render('# Another page\n\nContent'));
});
test('inline JSX h1 also renders its date', async () => {
  assertDate(await render('---\ndate: "2026-01-02"\n---\n\nText <h1>Entry</h1>'), '2026-01-02');
});
test('explicit h1 retains its accessibility and other DOM attributes', async () => {
  const html = await render('---\ndate: "2026-01-02"\n---\n\n<h1 aria-label="Page title" data-test="title" title="Tooltip">Entry</h1>');
  assertDate(html, '2026-01-02');
  assert.match(html, /aria-label="Page title"/);
  assert.match(html, /data-test="title"/);
  assert.match(html, /title="Tooltip"/);
});
