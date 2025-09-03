# 发布日志

---

## V2

### 2025-07-31

<Accordion title="服务端 v2.4.15" defaultOpen="true">

**新增功能**

| 功能项 | 功能描述 | 相关文档-15% |
| -- | -- | -- |
| WindowSize、LoadMessageCount 上限调整为 200 |创建智能体实例/创建数字人智能体实例接口的 `MessageHistory.WindowSize` 和 `MessageHistory.ZIM.LoadMessageCount` 上限调整为 200。|[创建智能体实例](/aiagent-server/api-reference/agent-instance-management/create-agent-instance.mdx) <br/> [创建数字人智能体实例](/aiagent-server/api-reference/agent-instance-management/create-digital-human-agent-instance.mdx) |
|TTS 新增 TerminatorText 字段|注册/修改智能体、创建/修改智能体实例接口的 `TTS` 字段新增 `TerminatorText` 字段。该字段可用于设置 TTS 的终止文本。若输入 TTS 的文本中出现匹配 TerminatorText 字符串的内容，则本轮 TTS 从 TerminatorText 字符串（包含）开始的内容将不再进行语音合成。||

**改进优化**
- 优化单向流式 TTS 的断句逻辑。

</Accordion>

### 2025-06-26

<Accordion title="服务端 v2.4.0" defaultOpen="true">

**新增功能**

| 功能项 | 功能描述 | 相关文档 |
| -- | -- | -- |
| 支持数字人视频通话 | 支持在[数字人 PaaS 服务](https://doc-zh.zego.im/article/18520)创建数字人形象，通过创建数字人智能体实例，实现与数字人的超低延迟实时视频互动。<ul><li>数字人驱动延迟 500ms 内，互动端到端延迟 2s 内（用户说话结束至看到 AI 数字人视频）。</li><li>超清数字人视频，真实 1080P 效果。</li><li>面部表情真实自然。嘴部及面部表情自然。</li><li>唇形准确。支持所有语种，尤其中英文，口型准确。</li></ul> | [实现数字人视频通话](/aiagent-android/quick-start-with-digital-human) |
|多智能体多音色输出|支持与多智能体互动时，主动调用 TTS 支持多音色输出|[主动调用 TTS](/aiagent-server/api-reference/agent-instance-control/send-agent-instance-tts)|

**改进优化**

- 更新 MiniMax TTS (文本转语音)的默认 model 为 speech-02-turbo ，并优化其延迟到约 300ms。

</Accordion>

### 2025-06-19

<Accordion title="服务端 v2.3.0" defaultOpen="true">

**新增功能**

| 功能项 | 功能描述 | 相关文档 |
| -- | -- | -- |
| 支持在实例销毁时，获取本次语音对话的平均延迟信息 | 延迟信息包括：<ul><li>大语言模型 LLM 相关耗时：LLM 首 token 耗时（毫秒）、LLM 输出速度（tokens/秒）</li><li>文字转语音TTS相关耗时：TTS音频首帧耗时（毫秒）</li><li>服务端总耗时（毫秒）</li></ul> | [获取智能体服务状态&延迟数据](/aiagent-android/guides/get-ai-agent-status) |
|支持阿里 CosyVoice 的 TTS 的双向流式|通过创建智能体时配置 [Vendor](/aiagent-server/api-reference/common-parameter-description#tts) 为阿里 CosyVoice ，并配置支持的音色，即可实现基于 CosyVoice 的 AI 实时语音通话。|-|
|支持获取智能体实例的创建成功、销毁回调|可搭配查询智能体实例状态、服务端异常回调、智能体被打断回调等，实现智能体全生命周期流程的管理| [获取智能体服务状态&延迟数据](/aiagent-android/guides/get-ai-agent-status)|

**改进优化**

- 接入测试期间，无需单独申请相关账号及鉴权即可使用部分 ZEGO 支持的大语言模型（豆包、MiniMax、通义千问、阶跃星辰等）及TTS厂商（MinMax、火山、阿里CosyVoice）提供的服务。详细请参考[快速开始](/aiagent-server/quick-start)。
- 更新支持 MiniMax TTS 的 WebSocket 的单向流式，进一步优化延迟及音色效果。

</Accordion>

### 2025-05-30

<Accordion title="服务端 v2.2.0" defaultOpen="true">

**新增功能**

| 功能项 | 功能描述 | 相关文档 |
| -- | -- | -- |
| 1个用户与多个AI角色语音互动 | <Note title="说明">功能内测中，详情请联系 ZEGO 商务。</Note> | - |
|请求 LLM 时请求体包含智能体实例及用户相关信息|当创建智能体实例将 `AddAgentInfo` 字段设置为 `true` 时，AI Agent 后台向自定义 LLM 发起请求的请求体参数在基于 OpenAI 兼容协议上，额外增加 `agent_info` 字段，包含 `room_id` 、 `user_id` 、 `agent_instance_id` 等信息。从而可以实现针对不同用户或智能体实例，做个性化回应，例如根据用户id，调用不同的function calling或记忆等。|[配置大语言模型](/aiagent-server/guides/configuring-llm)|
|回调每轮用户说话的音频片段|当创建智能体实例将 `CallbackConfig` 的 `UserAudioData` 设置为1时，则 AI Agent 后台会回调用户每轮对话的前1～1.5s的音频数据（若小于1s则不发送）。业务侧可以基于此音频信息实现声纹识别等能力。|[接收回调](/aiagent-server/callbacks/receiving-callback)|

**改进优化**

- 优化了在开启 ASR 多语句拼接时字幕、LLM 回调过早而带来的用户体验问题。详情请参考 [语音识别断句](/aiagent-server/advanced/speech-segmentation-control)。

</Accordion>

### 2025-05-16

<Accordion title="服务端 v2.1.0" defaultOpen="true">

**新增功能**

| 功能项 | 功能描述 | 相关文档 |
| -- | -- | -- |
| 多用户 vs 1 智能体 | 支持多用户同时与一个智能体语音互动的能力。支持包括语音打断、手动打断、智能体主动说话等能力，且智能体可区分用户进行回应等。<Note title="说明">功能内测中，详情请联系 ZEGO 商务。</Note> | - |
| 语音识别断句 | 支持人声检测的断句阈值设置、停顿时长设置，从而实现延迟和语音识别断句之间的平衡。 | [语音识别断句](/aiagent-server/advanced/speech-segmentation-control) |
| 支持更多 TTS 服务提供商 | 新增支持阿里云、MiniMax两家厂商，支持火山引擎双向流式 API。  | [智能体参数说明 - TTS](/aiagent-server/api-reference/common-parameter-description#tts) |
| 打断智能体说话 | 支持关闭语音打断，同时支持手动打断。从而实现手动打断、Push-to-talk 对讲机等语音互动场景。| [打断智能体说话](/aiagent-server/guides/interrupt-agent-speech) |
| 上下文管理 | 支持智能体实例级别的上下文管理相关能力，包括查询上下文、重置上下文等。 | [AI短期记忆（智能体上下文）管理](/aiagent-server/advanced/ai-short-term-memory) |
| LLM 内容过滤 | 支持针对 LLM 输出内容过滤，可用于实现过滤 emoji、替换特定词等。<Note title="说明">详情请联系 ZEGO 技术支持。</Note> | - |
| 回调事件 | 支持开发者通过服务端回调获取智能体被打断事件、用户说话行为和智能体说话行为。 | <ul><li>[获取智能体服务状态](/aiagent-server/guides/get-ai-agent-status)</li><li>[接收回调](/aiagent-server/callbacks/receiving-callback)</li></ul> |

**改进优化**

- 全面优化接入示例，提供业务服务控制页面及配套客户端示例代码。详情请参考 [快速开始](/aiagent-android/quick-start)。
- 进一步优化语音识别、打断准确率，尤其针对外部环境的音乐声。
- 进一步优化语音端到端延迟，进一步降低 200ms+ 延迟
- 支持在实时音视频（RTC）设置 token 鉴权，进一步增加互动的安全性，且不影响智能体互动。
</Accordion>

### 2025-04-25

<Accordion title="服务端 v2.0.0" defaultOpen="true">

**版本更新**

- 接入体验升级，通过不到 10 行代码，即可实现与 AI 智能体的语音通话。
- 全流程音频处理能力升级，大幅优化语音打断及识别准确率，尤其是在噪音环境、播放 BGM、双讲（AI 和用户同时讲话）等场景，全面覆盖居家、办公室、公共环境等各种环境下的 AI 互动。
- 同步支持包括：自定义三方大语言模型（LLM）、500ms 内的自然语音打断、实时字幕、智能体状态查询、主动调用 LLM、主动调用 TTS 等能力。
- 功能架构升级：支持多用户 vs 多 AI 智能体架构，更灵活的互动形式。
</Accordion>

## V1

### 2025-03-21
<Accordion title="服务端 v1.4.0" defaultOpen="true">

**新增功能**

- 新增`查询智能体状态`服务端接口。
- 创建会话时，文本转语音配置对象新增 `透传第三方参数` 字段。
- 适用于 MiniMax 文本转语音服务的 `透传第三方参数` 新增 `模型` 字段。
- ASR 配置对象新增 `热词` 字段和 `扩展参数` 字段。
- 用于主动调用文本转语音服务的服务端接口的请求参数新增 `移除历史` 字段。
</Accordion>

### 2025-02-10

<Accordion title="服务端 v1.3.0" defaultOpen="true">

**新增功能**

- 新增异常事件服务端回调。
- 文本转语音配置对象新增`断句停顿耗时`字段。
</Accordion>

### 2025-01-16

<Accordion title="服务端 v1.2.0" defaultOpen="true">

**新增功能**

- 创建会话时，大语言模型配置对象新增`响应格式种类` 和 `响应消息名称`字段。
- 会话、对话相关服务端接口和用于主动调用大语言模型和文本转语音服务的服务端接口的请求参数新增 `用户 ID`（必选）。
- 文本转语音配置对象中的扩展参数新增字段 `API 种类` 和 `资源 ID`。
</Accordion>

### 2025-01-08

<Accordion title="服务端 v1.1.0" defaultOpen="true">

**新增功能**

- 获取会话列表服务端接口新增 `会话 ID` 字段，支持根据会话 ID 查询会话详情。
- 创建会话服务端接口新增 `对话历史模式` 字段，支持是否保存会话历史消息。

**改进优化**

- 调整房间事件消息协议。

**废弃删除**

- 删除大语言模型、文本转语音配置对象中的 `账号来源` 字段。
</Accordion>

### 2024-12-31

<Accordion title="服务端 v1.0.0" defaultOpen="true">

**版本更新**

- 全面的服务可靠性 & 稳定性。
- 更低的端到端延迟、打断延迟。
- 更新音频处理能力，支持嘈杂环境，满足 80% 以上场景覆盖。
- 智能体模版库。
- 支持主动调用大语言模型。
- 支持主动调用文本转语音服务。
- 支持自定义 RAG 等能力。
- 大语言模型配置对象新增 `忽略括号文本` 字段，支持过滤大语言模型文本的表情包。
</Accordion>

## Beta

### 2024-12-16

<Accordion title="服务端 v0.5.0" defaultOpen="true">

**新增功能**

- 新增用于主动调用文本转语音服务的服务端接口。
- 新增用于主动调用大语言模型服务的服务端接口。
- 新增用于获取大语言模型结果的服务端回调接口。
- 创建会话服务端接口新增 `启用大语言模型服务端消息` 配置。
- 大语言模型配置对象新增 `忽略括号文本` 字段，支持过滤大语言模型文本的表情包。

**改进优化**

- 自定义当轮对话大语言模型提示词的 `时间戳` 字段统一为 Int 类型。
</Accordion>

### 2024-12-05

<Accordion title="服务端 v0.3.0" defaultOpen="true">

**新增功能**

- 创建、更新、查询会话等服务端接口新增 `对话配置` 字段。
- 新增自定义大语言模型提示词前处理服务端接口协议。
- 文本转语音配置对象新增 `忽略括号文本`、`忽略自定义括号文本` 字段，支持忽略部分文本转语音服务的输入内容，例如中英文括号内的内容。
</Accordion>

### 2024-11-26

<Accordion title="服务端 v0.2.0" defaultOpen="true">

**新增功能**

- 新增适用于文本转语音服务的 `扩展参数` 字段，支持火山引擎和 Minimax 的复刻音色。
- 新增 `410003101` 等错误码。

**问题修复**

- 修复了在某些场景下，AI 智能体无法正常打断的问题。
</Accordion>

### 2024-10-01

<Accordion title="服务端 v0.1.0" defaultOpen="true">

**版本发布**

- 支持 AI 实时语音通话、IM 文字聊天等基础场景。
- 支持切换大语言模型（LLM）、文本转语音（TTS）服务提供商及音色等。
</Accordion>

<Content />