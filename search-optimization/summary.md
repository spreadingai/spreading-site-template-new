# 搜索与 AI 功能现状简报

## 一、技术架构概览

本项目基于 **Next.js + React + TypeScript**，搜索与 AI 相关功能分布在 4 个核心模块中：

| 模块             | 路径                          | 核心技术                                | 用途                                      |
| ---------------- | ----------------------------- | --------------------------------------- | ----------------------------------------- |
| 全局搜索页       | `pages/search/index.tsx`      | `algoliasearch` + `react-instantsearch` | 全站全文搜索，支持分组/平台/语言筛选      |
| 独立 AI 搜索页   | `pages/ai-search/index.tsx`   | 动态导入 `AskAI/modal`                  | 供外部站点通过 iframe 嵌入的 AI 问答入口  |
| Header Ask AI    | `components/header/AskAI/`    | 自研流式对话 + Ant Design Modal         | 导航栏内的 AI 文档助手弹窗                |
| Header DocSearch | `components/header/index.tsx` | `@docsearch/react`                      | 导航栏内的快速搜索框（Algolia DocSearch） |

---

## 二、模块详细分析

### 2.1 全局搜索页 (`/search`)

**文件**：`pages/search/index.tsx`（~840 行）

- **Algolia 配置**：硬编码默认值 `appId=N61JOMLMAK`, `apiKey=cc55591748c47b1e5e24d363cdf1d5eb`, `indexName=zegocloud`；优先从 `docuoConfig.search.algolia` 读取覆盖。
- **搜索参数**：通过 `<Configure>` 配置 `attributesToRetrieve`（hierarchy.lvl0~6, content, type, url）和 `attributesToSnippet`。
- **筛选维度**：支持 group（产品组）、platform（平台）、language（语言）、docType（文档类型）4 个维度的 facet 筛选。
- **UI 组成**：`SearchBoxWrap`（搜索输入框 + 动态分组列表）、`HitWrap`（结果列表）、`PaginationWrap`（分页）、`SearchSelectWrap`（筛选下拉）。
- **独立布局**：使用 `components/search/layout.tsx` 提供独立的 Context Provider 体系。

### 2.2 独立 AI 搜索页 (`/ai-search`)

**文件**：`pages/ai-search/index.tsx`（135 行）

- **核心逻辑**：动态导入 `components/header/AskAI/modal`（SSR 关闭），复用 Header 中的 AskAI 弹窗。
- **iframe 通信**：通过 `window.addEventListener("message")` 接收父页面消息，白名单：`localhost:5666/5668`、`doc-zh.zego.im`、`www.zegocloud.com`、`docs.zegocloud.com`。
- **数据传递**：从父页面接收 `language`、`product`、`platform` 三个参数，默认值 `{ language: "zh", product: "", platform: "" }`。
- **关闭行为**：关闭时通过 `window.parent.postMessage` 通知父页面。

### 2.3 Header Ask AI（新版）

**目录**：`components/header/AskAI/`

| 文件                   | 职责                                             |
| ---------------------- | ------------------------------------------------ |
| `index.tsx`            | 入口组件，显示 AI 按钮，管理弹窗开关状态         |
| `modal.tsx`            | 对话弹窗主体，管理消息流、流式请求、会话生命周期 |
| `api.ts`               | API 层：SSE 流式对话、欢迎提示获取、评分反馈     |
| `MessageList.tsx`      | 消息列表渲染                                     |
| `MessageSender.tsx`    | 输入框组件                                       |
| `ReferencesFooter.tsx` | 参考来源展示                                     |
| `EventStatus.tsx`      | 事件状态展示（搜索中、选择知识库等）             |
| `utils.ts`             | 工具函数（UUID 生成、用户 ID 等）                |

- **API 服务器**：开发环境 `localhost:8765`，生产环境 `https://zego-doc-ai.spreading.cc:8000`
- **接口**：`/agents/zego-doc-agent-zh/runs`（对话）、`/prompts/welcome`（欢迎语）、`/qa/vote`（评分）
- **流式处理**：自研 SSE 解析，通过 `ReadableStream` 逐块输出

### 2.4 Header DocSearch

**文件**：`components/header/index.tsx`（92~135 行）

- **组件**：`@docsearch/react` 的 `<DocSearch>` 组件
- **配置来源**：`docuoConfig.search.algolia`（与 /search 页共享同一配置源）
- **搜索参数**：通过 `facetFilters` 过滤 `version`、`group`、`language`、`platform`
- **结果跳转**：底部显示 "查看全部 N 条结果"，点击跳转到 `/search?k=query`
- **控制逻辑**：`searchHidden` 为 true 或无 algolia 配置时隐藏

---

## 三、依赖关系图谱

```
docuoConfig.search.algolia (appId / apiKey / indexName)
    ├── Header DocSearch (@docsearch/react)
    │     └── 跳转 → /search?k=query
    └── /search 页 (react-instantsearch)

docuoConfig.themeConfig.showAskAI
    └── Header AskAI 按钮
          └── AskAI/modal.tsx (对话核心)
                ├── AskAI/api.ts → zego-doc-ai 后端
                ├── AskAI/MessageList.tsx
                ├── AskAI/MessageSender.tsx
                └── AskAI/ReferencesFooter.tsx

/ai-search 页 (iframe 入口)
    └── 复用 AskAI/modal.tsx
```

---

## 四、AskAI 目录现状

AI 问答功能统一收敛在 `components/header/AskAI/` 目录下：

| 文件                   | 职责                                         |
| ---------------------- | -------------------------------------------- |
| `index.tsx`            | 入口组件：渲染 Ask AI 按钮，管理弹窗状态     |
| `index.module.scss`    | 按钮样式                                     |
| `modal.tsx`            | 对话弹窗主体（被 Header 和 /ai-search 共用） |
| `modal.module.scss`    | 弹窗样式                                     |
| `api.ts`               | API 层（SSE 流式对话、欢迎提示、评分）       |
| `MessageList.tsx`      | 消息列表组件                                 |
| `MessageSender.tsx`    | 输入框组件                                   |
| `ReferencesFooter.tsx` | 参考来源展示                                 |
| `EventStatus.tsx`      | 事件状态展示                                 |
| `utils.ts`             | 工具函数                                     |

---

## 五、当前痛点

### 5.1 Algolia 配置分散

- `/search` 页面硬编码了默认 appId/apiKey/indexName，同时又从 config 读取覆盖。
- `DocSearch` 直接透传 config 中的 algolia 配置。
- 两者的 facetFilters 逻辑不一致：DocSearch 使用 `version` 维度，`/search` 页不使用。

### 5.2 样式分散

- DocSearch 使用全局 `styles/docsearch.scss` 覆盖默认样式，与其他组件的 SCSS Module 风格不一致。

### 5.3 iframe 场景脆弱

- `/ai-search` 页面白名单硬编码，新增域名需修改代码。
- 关闭时需向多个域名分别发送 postMessage，逻辑不够优雅。
- `iframeData` 的 `product` 字段与 `currentGroup` 的语义映射不明确。

### 5.4 类型安全缺失

- `/search` 页面多个组件的 props 使用 `any` 类型。
