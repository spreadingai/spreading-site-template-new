# 获取智能体状态及延迟数据

---

在与智能体进行实时语音通话时，您可能需要获取智能体实例的状态或实时变化消息，以便在业务端及时进行后续处理或保证业务的稳定性。您可以通过主调接口或者监听相应的服务端回调来获取这些信息。

信息包括以下类型：
- 服务端异常事件：包括 AI Agent 服务错误、实时音视频 RTC 相关错误、大语言模型（LLM）相关错误、文本转语音（TTS）相关错误（例如 TTS 并发超限等）等。
- 智能体实例状态：
    - 通过服务端主调接口可查询的状态：空闲中、聆听中、思考中、讲话中等。
    - 通过服务端回调可监听智能体创建成功、被打断、删除成功等事件。
- 智能体平均延迟数据：
    - 大语言模型(LLM)相关耗时。
    - 文字转语音(TTS)相关耗时。
    - AI Agent服务端总耗时。
    - 客户端&服务端耗时。可通过 ZEGO Express SDK 获取。详情请参考[通话质量监测](https://doc-zh.zego.im/article/1074)。

## 监听服务端异常事件

<Note title="注意">请联系 ZEGO 技术支持配置用于接收 AI Agent 后台回调的地址。</Note>

当服务端有异常事件时，AI Agent 后台会向上述配置的地址发送异常事件通知（`Event`为`Exception`），内容示例如下：

```json {3}
{
    "AppId": 123456789,
    "Event": "Exception",
    "Nonce": "abcdd22113",
    "Timestamp":1741221508000,
    "Signature": "XXXXXXX",
    "Sequence": 1921825797275873300,
    "RoomId": "test_room",
    "AgentUserId": "test_agent",
    "AgentInstanceId": "1912124734317838336",
    "Data": {
        "Code": 2203,
        "Message": "The API key in the request is missing or invalid"
    }
}
```
更多详细信息请参考 [接收回调](/aiagent-server/callbacks/receiving-callback) 和 [异常事件错误码](/aiagent-server/callbacks/exception-codes)文档。

## 获取智能体实例状态

### 主动调用服务端接口获取

调用查询智能体实例状态接口（ [QueryAgentInstanceStatus](/aiagent-server/api-reference/agent-instance-control/query-agent-instance-status) ），传入对应的 `AgentInstanceId` ，服务端将返回智能体实例当前的状态（如空闲中、聆听中、思考中、讲话中等）。

<Note title="说明">在你创建智能体实例（CreateAgentInstance）的成功响应中包含 `AgentInstanceId` 字段。</Note>

### 监听智能体相关事件

<Note title="注意">请联系 ZEGO 技术支持配置用于接收 AI Agent 后台回调的地址。</Note>

<Tabs>
<Tab title="智能体创建成功">
当智能体实例创建成功，且已进入 RTC 房间和推流后，会回调 AgentInstanceCreated 事件。

```json title="AgentInstanceCreated 回调数据示例"
{
    "AppId": 1234567,
    "AgentInstanceId": "1912124734317838336",
    "AgentUserId": "agent_user_1",
    "RoomId": "room_1",
    "Sequence": 1234567890,
    "Data": {
        "CreatedTimestamp": 1745502312982
    },
    "Event": "AgentInstanceCreated",
    "Nonce": "7450395512627324902",
    "Signature": "fd9c1ce54e85bd92f48b0a805e82a52b0c0c6445",
    "Timestamp": 1745502313000
}
```
</Tab>
<Tab title="智能体被打断">
[创建智能体实例](/aiagent-server/api-reference/agent-instance-management/create-agent-instance) 时，请求参数 `CallbackConfig.Interrupted` 设置为 1。

当智能体被打断时，AI Agent 后台会向上述配置的地址发送打断事件通知（`Event`为`Interrupted`），可根据实际需求中断某些进行中的任务，如终止 RAG 任务等。内容示例如下：
```json title="Interrupted 回调数据示例"
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
`Reason`（被打断的原因）定义如下：
| 参数   | 类型   | 说明         |
|--------|--------|--------------|
| Reason | Number  | 被打断的原因：<ul><li>1：用户讲话。</li><li>2：您在服务端 [主动调用 LLM](/aiagent-server/api-reference/agent-instance-control/send-agent-instance-llm)。</li><li>3：您在服务端 [主动调用 TTS](/aiagent-server/api-reference/agent-instance-control/send-agent-instance-tts)。</li><li>4：您在服务端 [打断智能体实例](/aiagent-server/api-reference/agent-instance-control/interrupt-agent-instance)。</li></ul> |
</Tab>
<Tab title="智能体删除成功">
当智能体实例删除成功，会回调 AgentInstanceDeleted 事件。其中 Code 为 0 表示是通过服务端 API DeleteAgentInstance 删除的实例。

```json title="AgentInstanceDeleted 回调数据示例"
{
    "AppId": 1234567,
    "AgentInstanceId": "1912124734317838336",
    "AgentUserId": "agent_user_1",
    "RoomId": "room_1",
    "Sequence": 1234567890,
    "Data": {
        "Code": 0,
        "DeletedTimestamp": 1745502345138,
        "LatencyData": {
            "LLMTTFT": 613,
            "LLMTPS": 11.493,
            "TTSAudioFirstFrameTime": 783,
            "TotalCost": 1693
        }
    },
    "Event": "AgentInstanceDeleted",
    "Nonce": "7450395512627324902",
    "Signature": "fd9c1ce54e85bd92f48b0a805e82a52b0c0c6445",
    "Timestamp": 1745502313000
}
```

删除原因定义如下：

| 参数 | 类型 | 描述 |
|------|------|------|
| Code | Int | <ul><li>0：调用 DeleteAgentInstance 删除的实例。</li><li>1201：RTC 通用错误。</li><li>1202：RTC 房间空闲超过 120 秒。</li><li>1203：智能体实例被踢出 RTC 房间。</li><li>1204：智能体实例登录 RTC 房间失败。</li><li>1205：智能体实例与 RTC 房间断连。</li><li>1206：智能体实例推流失败。</li></ul> |
</Tab>
</Tabs>


## 获取智能体延迟数据

<Note title="注意">请联系 ZEGO 技术支持配置用于接收 AI Agent 后台回调的地址。</Note>

当智能体实例删除成功，会回调 AgentInstanceDeleted 事件，其中会包含与智能体实例对话的平均延迟数据。

```json title="AgentInstanceDeleted 回调数据示例"
{
    "AppId": 1234567,
    "AgentInstanceId": "1912124734317838336",
    "AgentUserId": "agent_user_1",
    "RoomId": "room_1",
    "Sequence": 1234567890,
    "Data": {
        "Code": 0,
        "DeletedTimestamp": 1745502345138,
        "LatencyData": {
            "LLMTTFT": 613,
            "LLMTPS": 11.493,
            "TTSAudioFirstFrameTime": 783,
            "TotalCost": 1693
        }
    },
    "Event": "AgentInstanceDeleted",
    "Nonce": "7450395512627324902",
    "Signature": "fd9c1ce54e85bd92f48b0a805e82a52b0c0c6445",
    "Timestamp": 1745502313000
}
```

其中几个延迟数据（平均值）定义如下：


<Frame width="auto" height="auto" caption=""><img src="https://media-resource.spreading.io/docuo/workspace741/896bc39e2e65b82d5670b01b7c131c30/f5b0a66d11.png" alt="AI Agent耗时分析.png"/></Frame>

| 参数 | 类型 | 描述 |
|------|------|------|
| LLMTTFT | Int | LLM 首 token 平均耗时（毫秒）。请求大语言模型至大语言模型返回首个非空 token 的耗时。 |
| LLMTPS | Float64 | LLM 平均输出速度（tokens/秒）。大语言模型平均每秒输出的 token 数量 |
| TTSAudioFirstFrameTime | Int | TTS 音频首帧平均耗时（毫秒）。从首个非空 LLM token 至首个 TTS 非静音首帧返回（包含了建立请求的时间）|
| TotalCost | Int | AI Agent 服务端平均总耗时（毫秒）: <ul><li>用户说话: AI Agent 服务端拉流并判断用户说话结束至 TTS 返回首个非静音帧并开始推流的耗时。所有服务端产生的耗时，至少包含语音识别 ASR 耗时、大语言模型 LLM 相关耗时、文字转语音 TTS 相关耗时等。</li><li>自定义调用 LLM/TTS: 从 API 调用开始至开始推流的耗时。</li></ul> |
