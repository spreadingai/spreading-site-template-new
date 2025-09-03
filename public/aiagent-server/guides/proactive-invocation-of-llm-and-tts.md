# 主动调用 LLM 和 TTS

大语言模型 ( LLM ) 本身并不支持主动输出，需要通过开发者基于一定规则主动触发智能体说话，从而提升实时互动中的沉浸感。例如当用户5s中没有说话，则让智能体主动通过文本转语音 ( TTS ) 说一句话等。

AI Agent 主动说话的方式：

- 主动调用 LLM。本质上是模拟用户发起一条消息，从而实现基于上下文的智能体主动文字和语音输出。
- 主动调用 TTS。直接让智能体用语音说一段文本内容，通常是固定模式话术，例如“你好呀，欢迎使用 ZEGO AI Agent 服务”。

## 主动调用 LLM

您可以调用 [SendAgentInstanceLLM](/aiagent-server/api-reference/agent-instance-control/send-agent-instance-llm) 接口，主动让 LLM 输出文本和语音。

调用 `SendAgentInstanceLLM` 时 AI Agent 服务端会拼接一个上下文，这个上下文由 3 部分组成：

- 放在最前面的是 `SystemPrompt` ，本次对话的临时智能体系统提示词。
- 放在中间的是之前的对话记录，使用的对话记录数量由 `WindowSize` 决定。
- 放在最后的部分是本接口中设置的 `Text`。

调用本接口传入的文本信息不会记录在会话历史消息中，也不会通过 RTC 房间消息下发。但 LLM 生成的回复会被记录在会话历史消息中并且会通过 RTC 房间消息下发。

接口参数如下：

| 参数            | 类型   | 是否必选 | 描述                                                                                                                                                                                                                                          |
| --------------- | ------ | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| AgentInstanceId | String | 是       | 智能体实例的唯一标识，通过 [创建智能体实例](/aiagent-server/api-reference/agent-instance-management/create-agent-instance) 接口的响应参数获取。                                                                                                               |
| Text            | String | 是       | 发送给 LLM 服务的文本内容。                                                                                                                                                                                                                   |
| SystemPrompt    | String | 否       | 本次对话的临时智能体系统提示词。如果不填则使用[注册智能体](/aiagent-server/api-reference/agent-configuration-management/register-agent)或者[创建智能体实例](/aiagent-server/api-reference/agent-instance-management/create-agent-instance)时的 LLM 参数中的 `SystemPrompt`。 |
| AddQuestionToHistory | Boolean | 否 | 是否把问题加入到上下文。默认值为 `false`。 |
| AddAnswerToHistory | Boolean | 否 | 是否把答案加入到上下文。默认值为 `false`。 |

请求示例如下：
```json
{
    "AgentInstanceId": "1907755175297171456",
    "Text": "今天天气怎么样？"
}
```

## 主动调用 TTS

您可以通过调用 [SendAgentInstanceTTS](/aiagent-server/api-reference/agent-instance-control/send-agent-instance-tts) 接口，主动让智能体用语音说一段文本内容。

调用本接口传入的文本消息，会根据 `AddHistory` 参数决定是否被记录在会话消息历史之中，作为上下文输入给 LLM，同时该消息还会通过 RTC 房间消息下发。

接口参数如下：

| 参数            | 类型   | 是否必选 | 描述                                                                                                                            |
| --------------- | ------ | -------- | ------------------------------------------------------------------------------------------------------------------------------- |
| AgentInstanceId | String | 是       | 智能体实例的唯一标识，通过 [创建智能体实例](/aiagent-server/api-reference/agent-instance-management/create-agent-instance) 接口的响应参数获取。 |
| Text            | String | 是       | 用于 TTS 的文本内容，最大不超过 300 个字符。                                                                                    |
| AddHistory      | Boolean | 否       | 是否将文本消息记录在会话消息历史之中，作为上下文输入给 LLM。默认值为 `true`。         |
| InterruptMode | Int | 否 | 智能体说话时被用户语音打断的模式：<ul><li>0：立即打断。如果在 AI 说话时用户说话，那么 AI 将被立刻打断，停止说话（默认）。</li><li>1: 不打断。如果在 AI 说话时用户说话，那么 AI 不会被影响直到内容说完。</li></ul> |

请求示例如下：
```json
{
    "AgentInstanceId": "1907780504753553408",
    "Text": "你好呀，欢迎使用 ZEGO AI Agent 服务。",
    "InterruptMode": 1
}
```

