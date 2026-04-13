# 搜索与 AI 功能优化 — 操作记录

## 2026-04-10：Phase 1 — 清理废弃代码

### 背景

项目中 `components/header/AISearch/` 目录下存在大量已废弃的旧版 AI 对话组件。这些组件基于 `@ant-design/pro-chat`，连接的是旧版后端 `ai-search.zegocloud.com`。实际上 `AISearch/index.tsx` 入口已经切换为动态导入新版 `AskAI/modal.tsx`，旧版 modal、API、类型定义等文件已无任何活跃引用。

### 操作 1：删除 7 个废弃文件

**原因**：这些文件仅被彼此互相引用或被注释掉的 import 引用，无任何活跃代码依赖。

| 文件                                               | 说明                                                                       | 行数    |
| -------------------------------------------------- | -------------------------------------------------------------------------- | ------- |
| `components/header/AISearch/modal.tsx`             | 旧版对话组件，基于 `@ant-design/pro-chat`，大量注释代码                    | 1161 行 |
| `components/header/AISearch/modal-new.tsx`         | 过渡版本，基于 `@ant-design/pro-chat` + `useXAgent`                        | ~900 行 |
| `components/header/AISearch/fetch.ts`              | 旧版 API，指向 `ai-search.zegocloud.com`（与新版 `api.ts` 完全不同的后端） | 184 行  |
| `components/header/AISearch/types.ts`              | 旧版类型定义（`Question`、`ScoreType` 等）                                 | —       |
| `components/header/AISearch/chatIDMap.json`        | 旧版产品→chatID 映射表                                                     | —       |
| `components/header/AISearch/modal.module.scss`     | 旧版 modal 样式                                                            | —       |
| `components/header/AISearch/modal.new.module.scss` | 过渡版本 modal 样式                                                        | —       |

**验证方式**：通过 `grep -rn` 确认所有引用均为注释或废弃文件间的互相引用。

### 操作 2：清理 `components/header/AISearch/index.tsx` 注释代码

**原因**：文件中残留了旧版 modal 的注释 import 和备用代码块，引用的文件已被删除。

**具体清理**：

- 移除 `// import AISearchModal from "./modal"` 注释
- 移除 `// const NewAISearchModal = dynamic(...)` 注释块
- 移除 `// 使用新的AskAI模态框` 注释
- 移除注释掉的旧版 `NewAISearchModal` 备用 JSX 块（约 10 行）

**结果**：文件从 75 行精简至 57 行。

### 操作 3：清理 `pages/ai-search/index.tsx` 注释代码

**原因**：该页面同样残留了大量已废弃的注释代码，包括引用已删除文件的 import、旧版 `useRef` 方案、测试代码等。

**具体清理**：

- 移除 `// import AISearchModal from "@/components/header/AISearch/modal"` 注释
- 移除 `// () => import("@/components/header/AISearch/modal-new")` 注释
- 移除未使用的 `useRouter` import
- 移除旧版 `useRef` 方案注释（5 行）
- 移除 `// const language = iframeData.current.language` 注释
- 移除旧版 origin 校验注释块（9 行）
- 移除 `// iframeData.current = { ...event.data }` 注释
- 移除测试用 `setTimeout` 注释块（11 行）
- 移除旧版 props 注释（3 行）
- 变量名 `NewAISearchModal` 重命名为 `AskAIModal`（与 import 一致）
- `event` 参数补充 `MessageEvent` 类型

**结果**：文件从 136 行精简至 97 行。

### 操作 4：更新分析文档

**原因**：Phase 1 执行后，`summary.md` 中多处描述与实际代码不符。

**具体修改**：

- **第四节**："遗留组件：AISearch（旧版）"整节重写为"AISearch 与 AskAI 目录现状"，准确反映清理后的文件结构
- **痛点 5.1**：从"两套 AI 组件并存 / 两套 API 后端 / 不必要的间接层"改为"入口组件冗余"
- **痛点 5.3**：从列举已删除的样式文件改为描述实际存在的两个入口样式差异
- **痛点 5.5**：移除已删除文件 `AISearch/modal.tsx` 的 `@ts-ignore` 描述
- `implementation-plan.md` 中 `/ai-search` 页面行数从 135 更新为 97

---

## 2026-04-10：统一入口 — 删除 AISearch 目录，Header 改用 AskAI

### 背景

AISearch/index.tsx 和 AskAI/index.tsx 功能高度相似（按钮 + 弹窗开关 + 传参给 AskAI/modal），但样式和图片渲染方式不同。经手动调整 AskAI/index.tsx 后，决定统一使用 AskAI 作为唯一入口。

### 操作 1：修改 Header 引用

**文件**：`components/header/index.tsx`

**改动**：

- `import AISearch from "./AISearch"` → `import AskAI from "./AskAI"`
- `<AISearch />` → `<AskAI />`

### 操作 2：删除 AISearch 目录剩余文件

| 文件                                           | 说明                                  |
| ---------------------------------------------- | ------------------------------------- |
| `components/header/AISearch/index.tsx`         | 旧入口组件，已被 AskAI/index.tsx 替代 |
| `components/header/AISearch/index.module.scss` | 旧入口样式                            |

**结果**：`components/header/AISearch/` 目录完全清除。

### 操作 3：更新分析文档

- `summary.md`：第四节从"AISearch 与 AskAI 目录现状"简化为"AskAI 目录现状"；移除痛点 5.1"入口组件冗余"（已解决）；重新编号痛点
- `implementation-plan.md`：所有 AISearch 引用更新为 AskAI；移除痛点 5.2"入口组件冗余"和 5.5"AskAI/index.tsx 未使用"（已解决）；重新编号痛点

### 当前保留的文件结构

```
components/header/AskAI/        ← AI 问答唯一入口 + 对话核心
├── index.tsx                   ← 入口组件（Header 引用）
├── index.module.scss
├── modal.tsx                   ← 对话弹窗主体
├── modal.module.scss
├── api.ts                      ← API 层
├── MessageList.tsx
├── MessageList.module.scss
├── MessageSender.tsx
├── MessageSender.module.scss
├── ReferencesFooter.tsx
├── ReferencesFooter.module.scss
├── EventStatus.tsx
├── EventStatus.module.scss
└── utils.ts

pages/ai-search/index.tsx       ← iframe 独立页面（97 行）
```
