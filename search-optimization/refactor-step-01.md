# Step 01：DocSearch 现状分析与官方能力调研

## 一、当前集成现状

### 1.1 配置参数来源

**文件**：`components/header/index.tsx`（第 56~57 行）

```typescript
const { algolia } = search || {};           // 来自 docuoConfig.search.algolia
const searchHidden = search?.hidden ?? false;
```

`algolia` 对象通过 `{...algolia}` 整个透传给 `<DocSearch>`，即 `appId`、`apiKey`、`indexName` 均来自外部 `docuoConfig`，**无本地硬编码默认值**。若 `algolia` 为空或 `searchHidden` 为 true，整个组件不渲染（返回 null）。

### 1.2 facetFilters 逻辑

```typescript
searchParameters={{
  facetFilters: [
    `version:${docVersion}`,
    `group:${currentGroup}`,
    `language:${currentLanguage}`,
    `platform:${currentPlatform}`,
  ],
}}
```

4 个维度全部动态注入，来自各自的 hook（`useVersion`、`useGroup`、`useLanguage`、`usePlatform`），随用户当前上下文实时变化。

### 1.3 useMemo 渲染逻辑

`DocSearchComponent` 通过 `useMemo` 包裹，依赖项为：

```typescript
[algolia, searchHidden, currentLanguage, docVersion, currentGroup, currentPlatform]
```

任意依赖变化时重新生成组件实例。`searchParameters` 中的 facetFilters 也是动态的，因此每次语言/分组/平台/版本切换都会重新创建搜索上下文。

### 1.4 resultsFooterComponent 与 getMissingResultsUrl

**resultsFooterComponent**：在搜索结果列表底部渲染一个跳转链接：
- 读取 `state.context.nbHits` 获取总结果数
- 跳转到 `/search?k=${query}`（全局搜索页，携带当前关键词）
- 中英文文案写死在组件内（`See all N results` / `查看全部 N 条结果`），未走多语言配置

**getMissingResultsUrl**：在无结果时展示"报告缺失结果"链接，当前跳转到 `/search`（不携带 query），实际上只做了页面跳转，并非 GitHub issue 链接。

### 1.5 多语言文案

通过 `{...copywriting[currentLanguage].search}` 展开传入，涵盖：

| 字段 | 英文 | 中文 |
|------|------|------|
| `placeholder` | `"Find or ask what you want"` | `"请输入关键词"` |
| `translations.button.buttonText` | `"Quick search..."` | `"本文档内搜索"` |
| `translations.modal.startScreen.recentSearchesTitle` | `"Recent"` | `"最近"` |
| `translations.modal.footer.*` | select/navigate/close | 选择/导航/关闭 |
| `translations.modal.noResultsScreen.*` | No results for... | 没有找到... |

注意：`copywriting[currentLanguage].search` 只包含 `translations` 和 `placeholder` 两个字段，不包含 `appId/apiKey/indexName`，这些由 `{...algolia}` 单独透传。

### 1.6 maxResultsPerGroup

设置为 `20`（官方默认值为 5），每个搜索分组最多显示 20 条结果。

### 1.7 样式覆盖分析

**文件**：`styles/docsearch.scss`（685 行，完整重写，非官方 import）

注意：`components/header/index.tsx` 第 26 行 `// import "@docsearch/css"` 已注释，说明**官方 CSS 完全不加载**，由 `styles/docsearch.scss` 全量替代。

主要自定义内容：

| 类别 | 修改内容 |
|------|----------|
| **按钮样式** | 宽 194px、高 36px、圆角 8px、无 icon（`.DocSearch-Search-Icon { display: none }`） |
| **按钮文字** | 自定义 `::before` 伪元素替换搜索图标（`icon_docsearch.png`）|
| **快捷键** | 样式重置为纯文字，去掉键盘按键 UI（`box-shadow: unset` 等）|
| **暗色模式** | 仅覆盖 searchbox 相关变量；完整的暗色方案被注释掉（L46~64）|
| **遮罩层** | 添加 `backdrop-filter: blur(6px)` 毛玻璃效果 |
| **命中项** | 背景色改为 `#f9fafc`（非官方变量），选中态改为 `#e2f8e7`（绿色）|
| **响应式** | 1200px 以下隐藏搜索按钮；768px 以下隐藏按钮文字/快捷键 |
| **overflow** | 注释掉 `.DocSearch--active` 的 `overflow: hidden`（防页面偏移）|
| **NoResults** | `.DocSearch-Screen-Icon` 和 `.DocSearch-NoResults-Prefill-List` 设为 `display: none` |

---

## 二、官方能力调研（v4.x）

参考：https://docsearch.algolia.com/docs/api/

### 2.1 当前已使用的配置项

| 参数 | 当前使用值 |
|------|-----------|
| `appId` | 来自 docuoConfig |
| `apiKey` | 来自 docuoConfig |
| `indexName` | 来自 docuoConfig（**已废弃，推荐改用 `indices`**） |
| `searchParameters` | facetFilters（**已废弃，推荐移到 `indices[].searchParameters`**）|
| `maxResultsPerGroup` | 20 |
| `resultsFooterComponent` | 自定义跳转链接 |
| `getMissingResultsUrl` | 跳转 /search |
| `translations` | 中英文多语言文案 |

### 2.2 官方支持但当前未使用的能力

| 参数 | 说明 | 潜在价值 |
|------|------|----------|
| `indices` | 多索引搜索，替代 `indexName`，支持结果按索引排序 | ⭐ 可支持跨产品线搜索 |
| `transformItems` | 对搜索结果进行映射/过滤/重排 | ⭐ 可按产品优先级排序结果 |
| `hitComponent` | 完全自定义每条结果的渲染 | 可定制 UI 布局 |
| `askAi` | 接入 Algolia AI 问答（需 Algolia Assistant ID） | 可作为内置 AI 能力参考 |
| `initialQuery` | 预填搜索词 | 可从 URL 参数初始化 |
| `disableUserPersonalization` | 禁用最近搜索/收藏的本地存储 | 隐私合规场景 |
| `keyboardShortcuts` | 自定义/禁用 Ctrl+K / `/` 快捷键 | 当前两个快捷键均默认开启 |
| `recentSearchesLimit` | 最近搜索记录数量限制（默认 7） | — |
| `portalContainer` | 自定义 Modal 挂载节点 | 解决 z-index 层叠问题 |
| `transformSearchClient` | 拦截/改造 Algolia 搜索客户端 | 可加防抖、日志等 |
| `navigator` | 自定义链接跳转行为 | Next.js router 集成 |

### 2.3 重要废弃警告

官方文档明确标注以下参数正在计划废弃：

1. **`indexName`** → 推荐使用 `indices: ['INDEX_NAME']`
2. **`searchParameters`（顶层）** → 推荐移到 `indices[{ name, searchParameters }]` 内

当前代码两者均在使用，后续需要迁移。

---

## 三、扩展性评估

### 可扩展的部分

- `resultsFooterComponent` 和 `hitComponent` 提供了完整的 UI 自定义能力，当前 footer 已在用
- `transformItems` 可在不改架构的前提下对结果做排序/过滤
- `translations` 已接入多语言体系，后续扩展语言只需加 copywriting 条目
- `indices` 支持多索引，可为不同产品配置不同的 searchParameters

### 当前限制

- **样式完全自持**：官方 CSS 被完整替代，官方版本升级时样式不会自动跟进，维护成本高
- **废弃 API 未迁移**：`indexName` 和顶层 `searchParameters` 均在废弃计划中，需评估迁移时机
- **暗色模式不完整**：完整的暗色变量方案被注释掉，当前暗色仅覆盖 searchbox 部分
- **resultsFooterComponent 文案硬编码**：中英文文案直接写在组件内，未走 `translations` 统一管理
- **getMissingResultsUrl 跳转不携带 query**：用户体验断层，点击后 /search 页需要重新输入关键词
