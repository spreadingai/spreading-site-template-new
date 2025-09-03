# API 概览

---

ZEGO 实时互动 AI Agent 服务端提供以下相关 API 接口及回调，可参考 [调用方式](/aiagent-server/api-reference/accessing-server-apis) 调用以下接口。

## 智能体配置管理

| 接口名称                                                                  | 接口功能                                        | 默认调用频率限制 |
| ------------------------------------------------------------------------- | ----------------------------------------------- | ---------------- |
| [注册智能体](/aiagent-server/api-reference/agent-configuration-management/register-agent)   | 注册一个智能体（Agent），以用于创建智能体实例。 | 10 次/秒         |
| [注销智能体](/aiagent-server/api-reference/agent-configuration-management/unregister-agent) | 注销一个智能体。                                | 10 次/秒         |
| [修改智能体](/aiagent-server/api-reference/agent-configuration-management/update-agent)     | 修改一个智能体。                                | 10 次/秒         |
| [获取智能体列表](/aiagent-server/api-reference/agent-configuration-management/list-agents)  | 获取可用的智能体列表。                          | 10 次/秒         |
| [获取智能体详情](/aiagent-server/api-reference/agent-configuration-management/query-agents) | 获取指定智能体的详情。                          | 10 次/秒         |

## 智能体实例管理

| 接口名称                                                                        | 接口功能                                                            | 默认调用频率限制 |
| ------------------------------------------------------------------------------- | ------------------------------------------------------------------- | ---------------- |
| [创建智能体实例](/aiagent-server/api-reference/agent-instance-management/create-agent-instance) | 创建智能体实例，并将智能体实例加入到文本对话和语音（RTC）对话之中。 | 10 次/秒         |
| [修改智能体实例](/aiagent-server/api-reference/agent-instance-management/update-agent-instance) | 更新一个现有的智能体实例。                                          | 10 次/秒         |
| [删除智能体实例](/aiagent-server/api-reference/agent-instance-management/delete-agent-instance) | 删除一个现有的智能体实例。                                          | 10 次/秒         |

## 智能体实例控制

| 接口名称                                                                                 | 接口功能                                                                                                | 默认调用频率限制 |
| ---------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- | ---------------- |
| [主动调用 LLM](/aiagent-server/api-reference/agent-instance-control/send-agent-instance-llm)           | 以用户身份主动调用 LLM 服务，并基于 LLM 的响应内容，以智能体身份主动调用 TTS 服务，向用户发送语音消息。 | 10 次/秒         |
| [主动调用 TTS](/aiagent-server/api-reference/agent-instance-control/send-agent-instance-tts)           | 以智能体身份主动调用 TTS 服务，向用户发送语音消息。                                                     | 10 次/秒         |
| [查询智能体实例状态](/aiagent-server/api-reference/agent-instance-control/query-agent-instance-status) | 在语音对话过程中查询智能体的运行状态信息。                                                              | 10 次/秒         |
| [打断智能体实例](/aiagent-server/api-reference/agent-instance-control/interrupt-agent-instance)         | 在语音对话过程中打断智能体实例。                                                | 10 次/秒         |
| [获取智能体实例上下文列表](/aiagent-server/api-reference/agent-instance-control/get-agent-instance-msg-list) | 在与智能体实例进行语音对话时，获取作为上下文的消息列表。        | 10 次/秒         |
| [重置智能体实例上下文列表](/aiagent-server/api-reference/agent-instance-control/reset-agent-instance-msg-list) |在与智能体实例进行语音对话时，重置作为上下文的消息列表。                     | 10 次/秒         |

## 回调

| 回调名称                                       | 回调说明                                             |
| ---------------------------------------------- | ---------------------------------------------------- |
| [通用回调](/aiagent-server/callbacks/receiving-callback) | 凭借此回调，监听用户与智能体对话过程中所发生的事件。 |