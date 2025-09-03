
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

通过本回调，您可以监听实时语音识别过程中所发生的事件，包含 ASR 结果、异常事件。

<Warning title="注意">请确保您已参考 [开始任务](/cloud-realtime-asr/api-reference/start) 接口成功开启了实时语音识别任务。</Warning>

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
| Event | String | 事件通知类型。<ul><li>ASRResult：ASR 结果。</li><li>Exception：异常事件。</li></ul> |
| Nonce | String | 随机数，用于检验串计算。 |
| Timestamp | Number | 回调发送时的 Unix 时间戳（毫秒），用于检验串计算。 |
| Signature | String | 检验串，验证回调发送方身份。 |
| TaskId | String | 任务的唯一标识，全局唯一。 |
| RoomId | String | 房间 ID。 |
| Data | Object | 事件详细信息。根据 Event 取值不同，该回调参数的成员不同。 |

### Data

**根据 `Event` 取值不同，Data 包含的参数不同。**

<Tabs>
<Tab title="Event 为 ASRResult">
| 参数    | 类型   | 描述                                                                 |
|---------|--------|----------------------------------------------------------------------|
| UserId  | String | 讲话人的 UserId                                                      |
| Round   | Int64  | 对话轮次，每次用户主动说话，轮次增加。保证有序性，不保证连续性。      |
| Text    | String | 文本内容                                                             |
</Tab>
<Tab title="Event 为 Exception">
| 参数    | 类型   | 描述                                                                                                                                                                                                                      |
|---------|--------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Code    | Int    | 事件码：请参考 [异常事件错误码](/cloud-realtime-asr/callbacks/exception-codes) |
| Message | String | 异常信息描述                                                                                                                                                                                                            |
</Tab>
</Tabs>


## 回调示例

以下展示各 `Event` 的回调示例。

<Tabs>
<Tab title="Event 为 ASRResult">
```json
{
    "AppId": 1285661813,
    "Data": {
        "Round": 67202235,
        "Text": "你好，我是即构实时语音识别服务",
        "UserId": "abcd123"
    },
    "Event": "ASRResult",
    "Nonce": "7503829353462121337",
    "RoomId": "111",
    "Signature": "bc457c45e23c1026afdb6dae93f702ccffad4182",
    "TaskId": "1922184164614877184",
    "Timestamp": 1747121418250
}
```
</Tab>
<Tab title="Event 为 Exception">
```json

{
    "AppId": 1285661813,
    "Data": {
        "Code": 1001,
        "Message": "通用错误"
    },
    "Event": "Exception",
    "Nonce": "7503829353462121337",
    "RoomId": "111",
    "Signature": "bc457c45e23c1026afdb6dae93f702ccffad4182",
    "TaskId": "1922184164614877184",
    "Timestamp": 1747121418250
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
