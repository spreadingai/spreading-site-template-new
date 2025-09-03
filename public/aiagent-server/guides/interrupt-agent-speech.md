# 打断智能体

在不同场景下，需要支持不同的方式来打断智能体说话。目前支持两种打断形式，且两种打断组合使用。

| 打断方式 | 打断说明                                                                                                                                                                                                                                       |
| -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 语音打断 | 若开启语音打断，则智能体正在说话时，持续监听用户说话状态及识别说话内容，若用户开始说话，则会打断停止智能体说话（停止本轮LLM请求、TTS请求），并开始下一轮回答。若关闭语音打断，则直到智能体说话结束，才开始下一轮。 |
| 手动打断 | 通过 API ，即可直接打断智能体本轮内容                                                                                                                                                                                                                |

## 常见场景

| 语音通话模式                 | 打断组合                          | 常见场景                                                             |
| ---------------------------- | --------------------------------- | -------------------------------------------------------------------- |
| 自然语音聊天                 | ✅开启语音打断<br/>❌不用手动打断 | AI虚拟陪聊<br/>AI智能对话语音助手<br/>AI客服                         |
| Push-to-talk的对讲机模式 | ❌关闭语音打断<br/>✅使用手动打断 | 异常嘈杂的展会环境<br/>研讨会中短暂发言<br/>狼人杀等有规定时间的发言 |

## 使用步骤

### 开启或关闭语音打断


在[创建智能体实例](/aiagent-server/api-reference/agent-instance-management/create-agent-instance)时可通过设置 `AdvancedConfig.InterruptMode` 参数控制语音打断开或者关。

| 参数         | 类型 | 必填 | 描述                                                                 |
|----------------|------|------|----------------------------------------------------------------------|
| InterruptMode  | Number  | 否   | 智能体回复时被用户语音打断的模式：<ul><li>0：语音打断</li><li>1：语音不打断（AI输出（TTS播放完成）后开启ASR）</li></ul>不设置默认为 0。 |

### 手动打断

调用打断智能体实例状态接口（[InterruptAgentInstance](/aiagent-server/api-reference/agent-instance-control/interrupt-agent-instance)）时传入[创建智能体实例](/aiagent-server/api-reference/agent-instance-management/create-agent-instance)接口返回的 `AgentInstanceId`，即可立即打断智能体讲话。

## 获取智能体被打断的事件通知
<Steps>
<Step title="配置回调地址">
请联系 ZEGO 技术支持配置用于接收 AI Agent 后台回调的地址。
</Step>
<Step title="启用回调接收">
[创建智能体实例](/aiagent-server/api-reference/agent-instance-management/create-agent-instance) 时，请求参数 `CallbackConfig.Interrupted` 设置为 1。
</Step>
<Step title="接收回调">
当智能体被打断时，AI Agent 后台会向上述配置的地址发送打断事件通知（`Event`为`Interrupted`），内容示例如下：
```json {7}
{
    "AppId": 123456789,
    "Nonce": "abcdd22113",
    "Timestamp": 1747033950524，
    "Sequence": 1921825797275873300,
    "Signature": "XXXXXXX",
    "Event": "Interrupted",
    "RoomId": "90000001237",
    "AgentInstanceId": "1921825671047294976",
    "AgentUserId": "apitest689_agent",
    "Data": {
        "Round": 1481651956,
        "Reason": 1
    }
}
```
`Reason`（被打断的原因）解释如下：
| 参数   | 类型   | 说明         |
|--------|--------|--------------|
| Reason | Number  | 被打断的原因：<ul><li>1：用户讲话。</li><li>2：您在服务端 [主动调用 LLM](/aiagent-server/api-reference/agent-instance-control/send-agent-instance-llm)。</li><li>3：您在服务端 [主动调用 TTS](/aiagent-server/api-reference/agent-instance-control/send-agent-instance-tts)。</li><li>4：您在服务端 [打断智能体实例](/aiagent-server/api-reference/agent-instance-control/interrupt-agent-instance)。</li></ul> |
</Step>
</Steps>

