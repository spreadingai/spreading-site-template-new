
为提高数据安全性，建议开发者在收到 ZEGO 服务端发出的回调时，进行本地签名计算，并与 signature 进行对比，判断该请求是否合法。

校验的使用流程如下：

<Steps>
<Step title="对参数进行排序">
将 `callbacksecret`、`timestamp`、`nonce` 三个参数按照字典序进行排序
</Step>
<Step title="计算 SHA1">
将排序后的 `callbacksecret`、`timestamp`、`nonce` 拼接成一个字符串并进行sha1计算
</Step>
<Step title="校验 signature">
将计算后的哈希字符串与 `signature` 进行校验对比，如果相同则标识该请求来源于 ZEGO
</Step>
</Steps>

参数说明如下：

| 参数 | 说明  |
|---- | ------ | 
| callbacksecret  | 服务端校验密钥。在 [ZEGO 控制台](https://console.zego.im/) 注册项目时生成，可在 “控制台 > 项目配置 > 项目信息 > 配置信息” 中查看。 | 
| timestamp| Unix 时间戳。|
| nonce | 随机数。|

<Accordion title="使用示例" defaultOpen="false">

以下示例代码用于生成和检验 signature。

<CodeGroup> 
```PHP title="PHP 示例"
// 从请求参数中获取到 signature, timestamp, nonce
$signature = $_POST["signature"];
$timestamp = $_POST["timestamp"];
$nonce = $_POST["nonce"];

$secret = callbacksecret;// 控制台获取的 callbacksecret
$tmpArr = array($secret, $timestamp, $nonce);
sort($tmpArr, SORT_STRING);
$tmpStr = implode( $tmpArr );
$tmpStr = sha1( $tmpStr );

if( $tmpStr == $signature ){
    return true;
} else {
    return false;
}
```
```java title="Java 示例"
// 从请求参数中获取到 signature, timestamp, nonce
String signature = request.getParameter("signature");
long timestamp = request.getParameter("timestamp");
String nonce = request.getParameter("nonce");

// 控制台获取的 callbacksecret
String secret = callbacksecret;

String[] tempArr = {secret, ""+timestamp, nonce};
Arrays.sort(tempArr);
        
String tmpStr = "";
for (int i = 0; i < tempArr.length; i++) {
    tmpStr += tempArr[i];
}
tmpStr = org.apache.commons.codec.digest.DigestUtils.sha1Hex(tmpStr);

return tmpStr.equals(signature);
```

</CodeGroup>

输出示例如下：

```PHP title="PHP 示例"
$nonce = 123412;
$timestamp = 1470820198;
$secret = 'secret';
// 三个参数经过排序后的顺序为：nonce、timestamp、secret
// 排序拼接后需要加密的原始串为：1234121470820198secret
// 哈希运算的结果为：5bd59fd62953a8059fb7eaba95720f66d19e4517
```

</Accordion>
# 接收回调


<Warning title="注意">回调服务不能保证完全可靠，请慎重考虑使用回调方案构建核心业务流程的风险。</Warning>


通过本回调，您可以监听用户与智能体对话过程中所发生的事件，包含 ASR 结果、LLM 结果、异常事件、智能体被打断事件、用户说话行为、智能体说话行为、用户说话音频数据、智能体实例创建成功、智能体实例删除成功。

<Note title="说明">

如您需要接收以下类型的回调结果，请在[创建智能体实例](/aiagent-server/api-reference/agent-instance-management/create-agent-instance)时，配置相应的 [CallbackConfig](/aiagent-server/api-reference/agent-instance-management/create-agent-instance#callbackconfig) 参数为 `1`：
- ASR 结果：`CallbackConfig.ASRResult`。
- LLM 结果：`CallbackConfig.LLMResult`。
- 智能体被打断事件：`CallbackConfig.Interrupted`。
- 用户说话行为：`CallbackConfig.UserSpeakAction`。
- 智能体说话行为：`CallbackConfig.AgentSpeakAction`。
- 用户说话音频数据：`CallbackConfig.UserAudioData`。
</Note>

## 回调说明

- 请求方法：POST。
    <Note title="说明">回调数据格式为 JSON。您需要对其进行 UrlDecode 解码.</Note>
- 请求地址：请提供您业务后台用于接收回调的地址并联系 ZEGO 技术支持配置。
- 传输协议：HTTPS/HTTP，建议使用 HTTPS。

## 回调参数

<Note title="说明">回调的相关参数，ZEGO 会在之后的迭代计划中，持续优化更新（例如：新增字段、或新增某些字段的参数取值）。开发者在接入时，请避免将代码写死，造成后期更新后，无法兼容新版本。</Note>

| 参数 | 类型 | 描述 |
|------|------|------|
| AppId | Number | ZEGO 给开发者 APP 的唯一标识。 |
| Event | String | 事件通知类型。<ul><li>ASRResult：ASR 结果。</li><li>LLMResult：LLM 结果。</li><li>Exception：异常事件。</li><li>Interrupted：智能体被打断。</li><li>UserSpeakAction：用户说话行为。</li><li>AgentSpeakAction：智能体说话行为。</li><li>UserAudioData：用户说话音频数据。</li><li>AgentInstanceCreated：智能体实例创建成功。</li><li>AgentInstanceDeleted：智能体实例删除成功。</li></ul> |
| Nonce | String | 随机数，用于检验串计算。 |
| Timestamp | Number | 回调发送时的 Unix 时间戳（毫秒），用于检验串计算。 |
| Signature | String | 检验串，验证回调发送方身份。 |
| AgentInstanceId  | String | 智能体实例的唯一标识。 |
| AgentUserId | String | 智能体的用户 ID。 |
| RoomId | String | 房间 ID。 |
| Sequence | Number | 回调序号，保证有序性，不保证连续性。 |
| Data | Object | 事件详细信息。本参数结构，请参考 [Data](#data)。 |

### Data

**根据 `Event` 取值不同，Data 包含的参数不同。**

<Tabs>
<Tab title="ASRResult">
| 参数 | 类型 | 描述 |
|------|------|------|
| UserId | String | 讲话人的 UserId。 |
| Round | Number | 对话轮次，每次用户主动说话，轮次增加（有序，非递增）。 |
| Text | String | ASR 结果文本。 |

</Tab>
<Tab title="LLMResult">
| 参数 | 类型 | 描述 |
|------|------|------|
| Round | Number | LLM 结果所属的对话轮次，每次用户主动说话，轮次都会增加（有序，非递增）。 |
| Text | String | LLM 输出文本。 |
</Tab>
<Tab title="Exception">
| 参数 | 类型 | 描述 |
|------|------|------|
| Code | Number | 详情请参考 [异常事件错误码](/aiagent-server/callbacks/exception-codes)。 |
| Message | String | 异常信息描述。 |
</Tab>
<Tab title="Interrupted">
| 参数 | 类型 | 描述 |
|------|------|------|
| Round | Number | 对话轮次，被打断时的轮次ID。 |
| Reason | Number | 被打断的原因：<ul><li>1：用户讲话。</li><li>2：您在服务端 [主动调用 LLM](/aiagent-server/api-reference/agent-instance-control/send-agent-instance-llm)。</li><li>3：您在服务端 [主动调用 TTS](/aiagent-server/api-reference/agent-instance-control/send-agent-instance-tts)。</li><li>4：您在服务端 [打断智能体实例](/aiagent-server/api-reference/agent-instance-control/interrupt-agent-instance)。</li></ul> |
</Tab>
<Tab title="UserSpeakAction">
| 参数 | 类型 | 描述 |
|------|------|------|
| UserId | String | 讲话人的 UserId。 |
| Action | String | 用户说话行为：<ul><li>SPEAK_BEGIN：开始说话。</li><li>SPEAK_END：说话结束。</li></ul> |
</Tab>
<Tab title="AgentSpeakAction">
| 参数 | 类型 | 描述 |
|------|------|------|
| Action | String | 智能体说话行为：<ul><li>SPEAK_BEGIN：开始说话。</li><li>SPEAK_END：说话结束。</li></ul> |
</Tab>
<Tab title="UserAudioData">
<Warning title="注意">如果用户说话音频时长小于 1s，则不会回调。</Warning>

| 参数 | 类型 | 描述 |
|------|------|------|
| UserId | String | User ID |
| Round | Int | 轮次ID |
| SampleRate | Int | 声音数据采样率，默认为 16000 |
| Format | String | 音频数据格式，默认为 "pcm" |
| Audio | String | 音频 base64 编码后的数据，每轮对话最前面的 1～1.5s |
</Tab>
<Tab title="AgentInstanceCreated">
| 参数 | 类型 | 描述 |
|------|------|------|
| CreatedTimestamp | Int64 | 创建成功时间，毫秒级时间戳。 |
</Tab>
<Tab title="AgentInstanceDeleted">
| 参数 | 类型 | 描述 |
|------|------|------|
| Code | Int | 删除的原因：<ul><li>0：调用 DeleteAgentInstance 删除的实例。</li><li>1201：RTC 通用错误。</li><li>1202：RTC 房间空闲超过 120 秒。</li><li>1203：智能体实例被踢出 RTC 房间。</li><li>1204：智能体实例登录 RTC 房间失败。</li><li>1205：智能体实例与 RTC 房间断连。</li><li>1206：智能体实例推流失败。</li></ul> |
| DeletedTimestamp | Int64 | 删除成功时间，毫秒级时间戳。 |
| LatencyData | Object | 和智能体实例对话的延迟数据。 |

**Data.LatencyData**

<Frame width="auto" height="auto" caption=""><img src="https://media-resource.spreading.io/docuo/workspace741/896bc39e2e65b82d5670b01b7c131c30/f5b0a66d11.png" alt="AI Agent耗时分析.png"/></Frame>

| 参数 | 类型 | 描述 |
|------|------|------|
| LLMTTFT | Int | LLM 首 token 平均耗时（毫秒）。请求大语言模型至大语言模型返回首个非空 token 的耗时。 |
| LLMTPS | Float64 | LLM 平均输出速度（tokens/秒）。大语言模型平均每秒输出的 token 数量 |
| TTSAudioFirstFrameTime | Int | TTS 音频首帧平均耗时（毫秒）。从首个非空 LLM token 至首个 TTS 非静音首帧返回（包含了建立请求的时间）|
| TotalCost | Int | AI Agent 服务端平均总耗时（毫秒）: <ul><li>用户说话: AI Agent 服务端拉流并判断用户说话结束至 TTS 返回首个非静音帧并开始推流的耗时。所有服务端产生的耗时，至少包含语音识别 ASR 耗时、大语言模型 LLM 相关耗时、文字转语音 TTS 相关耗时等。</li><li>自定义调用 LLM/TTS: 从 API 调用开始至开始推流的耗时。</li></ul> |
</Tab>
</Tabs>

## 回调示例

以下展示各 `Event` 的回调示例。

<Tabs>
<Tab title="ASRResult">
```json
{
    "AppId": 1234567,
    "AgentInstanceId": "1912124734317838336",
    "AgentUserId": "agent_user_1",
    "RoomId": "room_1",
    "Sequence": 1234567890,
    "Data": {
        "UserId": "user_1",
        "Round": 650459806,
        "Text": "你好"
    },
    "Event": "ASRResult",
    "Nonce": "7450395512627324902",
    "Signature": "fd9c1ce54e85bd92f48b0a805e82a52b0c0c6445",
    "Timestamp": 1745502313000
}
```
</Tab>
<Tab title="LLMResult">
```json
{
    "AppId": 1234567,
    "AgentInstanceId": "1912124734317838336",
    "AgentUserId": "agent_user_1",
    "RoomId": "room_1",
    "Sequence": 1234567890,
    "Data": {
        "Round": 650459806,
        "Text": "哈喽呀，今天的你看起来充满活力呢。"
    },
    "Event": "LLMResult",
    "Nonce": "7450395512627324902",
    "Signature": "fd9c1ce54e85bd92f48b0a805e82a52b0c0c6445",
    "Timestamp": 1745502313000
}
```
</Tab>
<Tab title="Exception">
```json
{
    "AppId": 1234567,
    "AgentInstanceId": "1912124734317838336",
    "AgentUserId": "agent_user_1",
    "RoomId": "room_1",
    "Sequence": 1234567890,
    "Data": {
        "Code": 1001,
        "Message": "AI Agent 通用错误"
    },
    "Event": "Exception",
    "Nonce": "7450395512627324902",
    "Signature": "fd9c1ce54e85bd92f48b0a805e82a52b0c0c6445",
    "Timestamp": 1745502313000
}
```
</Tab>
<Tab title="Interrupted">
```json
{
    "AppId": 1234567,
    "AgentInstanceId": "1912124734317838336",
    "AgentUserId": "agent_user_1",
    "RoomId": "room_1",
    "Sequence": 1234567890,
    "Data": {
        "Round": 650459806,
        "Reason": 1
    },
    "Event": "Interrupted",
    "Nonce": "7450395512627324902",
    "Signature": "fd9c1ce54e85bd92f48b0a805e82a52b0c0c6445",
    "Timestamp": 1745502313000
}
```
</Tab>
<Tab title="UserSpeakAction">
```json
{
    "AppId": 1234567,
    "AgentInstanceId": "1912124734317838336",
    "AgentUserId": "agent_user_1",
    "RoomId": "room_1",
    "Sequence": 1234567890,
    "Data": {
        "UserId": "user_1",
        "Action": "SPEAK_BEGIN"
    },
    "Event": "UserSpeakAction",
    "Nonce": "7450395512627324902",
    "Signature": "fd9c1ce54e85bd92f48b0a805e82a52b0c0c6445",
    "Timestamp": 1745502313000
}
```
</Tab>
<Tab title="AgentSpeakAction">
```json
{
    "AppId": 1234567,
    "AgentInstanceId": "1912124734317838336",
    "AgentUserId": "agent_user_1",
    "RoomId": "room_1",
    "Sequence": 1234567890,
    "Data": {
        "Action": "SPEAK_BEGIN"
    },
    "Event": "AgentSpeakAction",
    "Nonce": "7450395512627324902",
    "Signature": "fd9c1ce54e85bd92f48b0a805e82a52b0c0c6445",
    "Timestamp": 1745502313000
}
```
</Tab>
<Tab title="UserAudioData">
```json
{
    "AppId": 1234567,
    "AgentInstanceId": "1912124734317838336",
    "AgentUserId": "agent_user_1",
    "RoomId": "room_1",
    "Sequence": 1234567890,
    "Data": {
        "UserId": "user_1",
        "Round": 123456,
        "SampleRate": 16000,
        "Format": "pcm",
        "Audio": "base64_encoded_audio_data"
    },
    "Event": "UserAudioData",
    "Nonce": "7450395512627324902",
    "Signature": "fd9c1ce54e85bd92f48b0a805e82a52b0c0c6445",
    "Timestamp": 1745502313000
}
```
</Tab>
<Tab title="AgentInstanceCreated">
```json
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
<Tab title="AgentInstanceDeleted">
```json
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
</Tab>
</Tabs>

## 验证签名

<Content />
## 返回响应

当您收到回调后，请返回 HTTP status code 为 2XX （例如 200），表示接收成功。返回其他，都表示接收失败。


## 回调重试策略

如果 ZEGO 服务器没有收到响应，或收到的 HTTP status code 不为 2XX（例如 200），都会尝试重试，**最多进行 5 次重试**。每次重试请求与**上一次请求**的间隔时间分别为 2s、4s、8s、16s、32s。若第 5 次重试后仍然失败，将不再重试，该回调丢失。
