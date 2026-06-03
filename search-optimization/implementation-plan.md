# 搜索与 AI 功能 — 现状详细文档

## 一、模块全景

项目中搜索与 AI 功能由 4 个模块组成，分属两条技术路线：

| 技术路线         | 模块                      | 入口                                                    | 核心依赖                                |
| ---------------- | ------------------------- | ------------------------------------------------------- | --------------------------------------- |
| **Algolia 搜索** | Header DocSearch          | `components/header/index.tsx`                           | `@docsearch/react`                      |
| **Algolia 搜索** | 全局搜索页 /search        | `pages/search/index.tsx`                                | `algoliasearch` + `react-instantsearch` |
| **AI 问答**      | Header Ask AI 按钮        | `components/header/AskAI/index.tsx` → `AskAI/modal.tsx` | 自研 SSE 流式对话                       |
| **AI 问答**      | 独立 AI 搜索页 /ai-search | `pages/ai-search/index.tsx` → `AskAI/modal.tsx`         | 同上 + iframe postMessage               |

---

## 二、Algolia 搜索详细现状

### 2.1 配置来源

统一配置定义在 `lib/types/index.ts` 的 `DocuoConfig.search.algolia`：

```typescript
search?: {
  hidden?: boolean;
  algolia?: {
    appId: string;
    apiKey: string;
    indexName: string;
  };
};
```

**实际使用情况**：

- **DocSearch**（Header）：直接透传 `docuoConfig.search.algolia`，无默认值。当 `algolia` 为空或 `search.hidden` 为 true 时，组件不渲染。
- **/search 页面**：硬编码了一套默认值（`appId=N61JOMLMAK`, `apiKey=cc55591748c47b1e5e24d363cdf1d5eb`, `indexName=zegocloud`），仅当 config 存在时覆盖。

### 2.2 DocSearch（Header 快速搜索）

**位置**：`components/header/index.tsx` 第 92~135 行

**搜索参数**：

```typescript
searchParameters: {
  facetFilters: [
    `version:${docVersion}`,
    `group:${currentGroup}`,
    `language:${currentLanguage}`,
    `platform:${currentPlatform}`,
  ],
}
```

**特有逻辑**：

- `maxResultsPerGroup: 20`
- 底部 footer：显示 "查看全部 N 条结果"，点击跳转 `/search?k=${query}`
- `getMissingResultsUrl`：跳转到 /search 页
- 多语言文案：从 `copywriting[currentLanguage].search` 获取

**样式**：全局覆盖文件 `styles/docsearch.scss`

### 2.3 全局搜索页 (/search)

**位置**：`pages/search/index.tsx`（~840 行）

**组件结构**：

```
SearchPage
├── InstantSearch (react-instantsearch)
│   ├── Configure (attributesToRetrieve, attributesToSnippet)
│   ├── PoweredBy
│   ├── SearchBoxWrap (搜索输入框 + 动态分组列表)
│   ├── SearchSelectWrap (筛选下拉)
│   ├── HitWrap → NewCustomHit (结果列表)
│   └── PaginationWrap (分页)
└── DocTypeContext.Provider (文档类型筛选上下文)
```

**筛选维度**：

- group（产品组）、platform（平台）、language（语言）、docType（文档类型）
- 筛选逻辑通过 `facets` 动态生成可选项

**与 DocSearch 的差异**：
| 维度 | DocSearch | /search 页 |
|------|----------|------------|
| facetFilters | 包含 `version` | 不包含 `version` |
| 默认值 | 无（config 为空则不渲染） | 有硬编码默认值 |
| 结果数量 | 每组最多 20 条 | 分页展示全部 |
| UI 库 | @docsearch/react 内置 UI | 自定义 UI + antd |

**独立布局**：使用 `components/search/layout.tsx`，独立管理 Context Provider（语言、分组、平台、版本等），与主站布局分离。

---

## 三、AI 问答详细现状

### 3.1 组件层次

```
Header
└── AskAI/index.tsx (入口按钮 + 样式)
    └── AskAI/modal.tsx (对话弹窗主体，dynamic import, ssr: false)
        ├── AskAI/MessageList.tsx (消息列表)
        ├── AskAI/MessageSender.tsx (输入框)
        ├── AskAI/ReferencesFooter.tsx (参考来源)
        ├── AskAI/EventStatus.tsx (事件状态：搜索中、选择知识库等)
        └── AskAI/api.ts (API 层)

/ai-search 页
└── AskAI/modal.tsx (同上，直接 dynamic import)
```

### 3.2 AskAI 入口组件

**位置**：`components/header/AskAI/index.tsx`

**职责**：

- 渲染 Ask AI 按钮（Next.js `<Image>` 组件）
- 管理弹窗开关状态（`isModalOpen`）
- 组装上下文参数传入 Modal：`theme`、`currentLanguage`、`currentGroupLabel`、`currentPlatform`

### 3.3 AskAI Modal（对话核心）

**位置**：`components/header/AskAI/modal.tsx`

**Props 接口**：

```typescript
interface Props {
  rootClassName?: string;
  currentTheme: string;
  currentLanguage: string;
  currentGroup: string;
  currentPlatform: string;
  isModalOpen: boolean;
  onCloseHandle: () => void;
}
```

**消费者**：

1. `AskAI/index.tsx`（Header 按钮触发，`rootClassName` 不传）
2. `pages/ai-search/index.tsx`（iframe 页面，`rootClassName="ai-search-page"`）

**核心状态**：

- `messages: Message[]` — 消息列表
- `isLoading` — 请求中状态
- `sessionId` — 会话 ID
- `streamingMessageId` — 当前流式消息 ID
- `screenType` — 响应式断点（0: >700, 1: 400~700, 2: <400）

**流式对话流程**：

1. 用户发送消息 → `handleSendMessage`
2. 创建 AI 回复占位消息（status: loading）
3. 调用 `sendStreamRequest`（SSE 流式请求）
4. 通过 `onEvent` 回调处理不同事件：`RunStarted`、`ToolStarted`、`ToolEnded`、`TextDelta`、`RunEnded`
5. 实时更新消息内容，完成后更新链接 target 和 footer 样式

### 3.4 API 层

**位置**：`components/header/AskAI/api.ts`（486 行）

**服务器地址**：

- 开发：`http://localhost:8765`
- 生产：`https://zego-doc-ai.spreading.cc:8000`

**接口列表**：
| 接口 | 路径 | 方法 | 用途 |
|------|------|------|------|
| 对话 | `/agents/zego-doc-agent-zh/runs` | POST (SSE) | 流式问答 |
| 欢迎提示 | `/prompts/welcome` | POST | 获取推荐问题 |
| 评分 | `/qa/vote` | POST | 用户反馈（赞/踩） |

**请求参数**：

```typescript
interface RequestParams {
  message: string;
  product: string; // 对应 currentGroup
  platform: string; // 对应 currentPlatform
  language?: string;
  user_id?: string; // 通过 getStableUserId() 生成
  session_id?: string;
}
```

### 3.5 /ai-search 独立页面（iframe 场景）

**位置**：`pages/ai-search/index.tsx`（97 行）

**iframe 通信机制**：

- **接收消息**：监听 `message` 事件，校验 `event.origin` 是否在白名单中
- **白名单**（硬编码）：`localhost:5666/5668`、`doc-zh.zego.im`、`www.zegocloud.com`、`docs.zegocloud.com`
- **消息协议**：
  - 父→子：`{ origin: "zego parent", open: true, language, product, platform }`
  - 子→父：`{ origin: "docuo children", close: true }`
- **特殊行为**：Modal 默认打开（`isModalOpen` 初始值 true），关闭时向父页面发 postMessage

---

## 四、多语言文案现状

**位置**：`components/constant/language.ts`

| 字段       | 消费者                | 内容                                                                             |
| ---------- | --------------------- | -------------------------------------------------------------------------------- |
| `search`   | DocSearch、/search 页 | 按钮文案、placeholder、无结果提示、footer 文案                                   |
| `aiSearch` | AskAI Modal           | 默认问候语、弹窗标题、输入框 placeholder（3 种尺寸）、参考来源标题、事件状态文案 |

---

## 五、已知问题与优化方向

### 5.1 Algolia 配置分散

- /search 页硬编码默认 appId/apiKey，DocSearch 无默认值，两者取值逻辑不一致。
- facetFilters 不一致：DocSearch 使用 `version`，/search 页不使用。
- **优化方向**：抽取共享配置模块，统一默认值和筛选逻辑。

### 5.2 iframe 白名单硬编码

- 新增域名需修改源代码。
- 关闭时需向多个域名逐一发送 postMessage。
- **优化方向**：白名单移至环境变量或配置文件。

### 5.3 类型安全

- /search 页多个组件 props 使用 `any`。
- **优化方向**：补全 Props 接口定义。
