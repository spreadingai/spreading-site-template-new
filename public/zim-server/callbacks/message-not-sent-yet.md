
<Accordion title="展开查看详细内容" defaultOpen="false">
#### 基础参数

| 参数              | 类型     | 描述    |
|-----------------|--------|-------|
| md5             | String | 文件的 MD5 值。   |
| file_name       | String | 文件名称。  |
| file_size       | String | 文件大小，单位为字节（B）。  |
| download_url    | String | 下载地址。  |
| media_duration  | String | 音视频时长，单位为秒（s）。 |

#### 图片消息扩展参数

如果是图片消息，在基础参数上额外以下参数。

| 参数                      | 类型   | 描述                         |
|-------------------------|------|----------------------------|
| origin_image_width      | Int  | 原图的宽度，单位为像素（px）。   |
| origin_image_height     | Int  | 原图的高度，单位为像素（px）。   |
| large_image_download_url| String | 大图下载地址。                  |
| large_image_width       | Int  | 大图的宽度，单位为像素（px）。   |
| large_image_height      | Int  | 大图的高度，单位为像素（px）。   |
| thumbnail_download_url  | String | 缩略图下载地址。                |
| thumbnail_width         | Int  | 缩略图的宽度，单位为像素（px）。 |
| thumbnail_height        | Int  | 缩略图的高度，单位为像素（px）。 |

#### 视频消息扩展参数

如果是视频消息，在基础参数上额外以下参数。

| 参数                          | 类型   | 描述                           |
|-----------------------------|------|------------------------------|
| video_first_frame_download_url | String | 视频首帧图的下载地址。              |
| video_first_frame_width     | Int  | 视频首帧图的宽度，单位为像素（px）。   |
| video_first_frame_height    | Int  | 视频首帧图的高度，单位为像素（px）。   |
</Accordion>
<Accordion title="展开查看详细内容" defaultOpen="false">

| 参数              | 类型     | 描述    |
|-----------------|--------|-------|
| multi_msg       | Array of Object | 组合消息 Item 数组。  |
|  └msg_type       | Int | Item 类型：<ul><li>1：文本。</li><li>11：图片。</li><li>12：文档。</li><li>13：音频。</li><li>14：视频。</li><li>200：自定义消息类型。</li></ul>  |
|  └sub_msg_type | Int | 仅当 msg_type 为 200 时，返回此参数。  |
|  └callback_content | Object | Item 内容。<ul><li>仅当 msg_type 为 1 或 200 时，可直接在此参数阅读消息内容。</li><li>当 Item 为 11、12、13 或 14，请参考本文 [多媒体消息结构](#多媒体消息) 了解消息的的各个字段数据。</li></ul>  |
</Accordion>
<Accordion title="展开查看详细内容" defaultOpen="false">

| 参数              | 类型     | 描述    |
|-----------------|--------|-------|
| Title       | String | 标题。  |
| Summary       | String | 概要。  |
</Accordion>
# 消息发送前回调

- - -

## 描述

<Warning title="注意">

- 此回调支持的消息类型为文本消息、图片消息、文件消息、音频消息、视频消息、自定义消息，不支持信令消息、弹幕消息。 
- 此回调仅支持通过 SDK 发送的消息。若通过服务端发送消息，则您的业务后台不会收到此回调。
</Warning>

设置此回调后，当用户发送单聊、群聊或房间聊天消息时，ZIM 会向您的业务后台发起请求，您可以通过应答，对消息进行实时操作，如：
- 记录聊天消息，拦截违规发言请求；
- 实现黑白名单功能，由您判断哪些消息可以正常发出。

ZIM 会根据您的应答和 ZIM 内容服务的开通情况，决定消息是否发送，详情请参考本文档 <a href="#应答参数">应答参数</a>。

## 回调说明

- 请求方法：POST。
  <Note title="说明">
  回调数据格式为 JSON，您需要对其进行 UrlDecode 解码。
  </Note>
- 请求地址：请在 [ZEGO 控制台](https://console.zego.im/) 上配置回调地址，配置流程请参考控制台文档 [ZIM 相关回调配置](https://doc-zh.zego.im/article/17223)。
- 传输协议：HTTPS/HTTP，建议使用 HTTPS。

## 回调参数

| 参数 | 类型 | 描述 |
|------|------|------|
| **公共参数** | | |
| appid | String | App 的唯一标识。 |
| event | String | 回调事件，此回调返回值为 `before_send_msg`。 |
| nonce | String | 随机数，用于计算 signature。 |
| signature | String | 检验串，详情见 [检验说明](/zim-server/callbacks/authenticating-server-to-server-callbacks)。 |
| timestamp | Int | 服务器当前时间，Unix 时间戳，单位为秒（s），用于计算 signature。 |
| request_id | String | 请求 ID。 |
| **业务参数** | | |
| from_user_id | String | 消息发送者 ID。 |
| conv_id | String | 目标会话 ID。 |
| conv_type | Int | 目标会话类型：<ul><li>0：单聊。</li><li>1：房间。</li><li>2：群聊。</li></ul> |
| msg_id | String | 消息 ID，可借此确定消息的唯一性。 |
| payload | String | 消息扩展字段。 |
| msg_type | Int | 消息类型：<ul><li>1：文本。</li><li>10：组合。</li><li>11：图片。</li><li>12：文档。</li><li>13：音频。</li><li>14：视频。</li><li>100：合并</li><li>200：自定义。</li></ul> |
| sub_msg_type | Int | 具体的自定义类型。值由用户发送自定义消息时填写，取值范围为 [0,200]。只有当 msg_type 为 200（自定义类型）时，此参数才有意义。 |
| msg_body | String | 消息内容：<ul><li>当 msg_type 为 1（文本类型）或 200（自定义类型），msg_body 为发送消息时传入的消息内容，开发者可直接阅读消息内容。</li><li>当 msg_type 为下列类型时，msg_body 为 JSON 字符串。请使用 URLDecode 对此 JSON 字符串解码，并按照对应结构获取消息中各字段数据：<ul><li>当 msg_type 为 11、12、13、14（多媒体消息）：<a href="#多媒体消息">msg_body JSON 字符串解析结果参数说明 - 多媒体消息</a>。</li><li>当 msg_type 为 10（组合消息）：<a href="#组合消息">msg_body JSON 字符串解析结果参数说明 - 组合消息</a>。</li><li>当 msg_type 为 100（合并消息）：<a href="#合并消息">msg_body JSON 字符串解析结果参数说明 - 合并消息</a>。</li></ul></li></ul> |

<Note title="说明">

建议您将部分参数转换为 Int 进行逻辑处理，相关字段包括 `appid` 和 `nonce`。
</Note>

### msg_body JSON 字符串解析结果参数说明

#### 多媒体消息

<MediaMsgBodyDescriptionZh />

#### 组合消息

<MultiMsgBodyDescriptionZh />

#### 合并消息

<CombinedMsgBodyDescriptionZh />

## 回调示例

```json
{
    "appid": "1",
    "event": "before_send_msg",
    "from_user_id": "sender",
    "conv_id": "receiver",
    "request_id": "3501907290370176",
    "msg_id": "1234232421343",
    "conv_type": 0,
    "timestamp": 1499676968,
    "msg_body": "msg_body",
    "msg_type": 1,
    "signature": "abc",
    "nonce": "321",
    "sub_msg_type": 0,
    "payload": "payload"
}
```

## 应答参数

| 参数 | 类型 | 描述 |
|--------|--------|-------|
| result | Int | 您的业务后台应答的值，ZIM 会判断是否发送该消息。<ul><li>0：中立（不判断是否发送）。</li><li>1：发送。</li><li>2：静默推送。</li><li>3：不发送。</li><li>其他：默认按中立处理。</li></ul> |  
| reason | String | 当 result 为 3 时，您可以在此填写拒绝发送消息的原因。   |


消息发送者的客户端可通过 ZIM SDK 的回调接口获取消息被拒绝发送的原因，详细步骤请参考 [收发消息 - 监听消息状态](https://doc-zh.zego.im/zim-android/guides/messaging/send-and-receive-messages#%E7%9B%91%E5%90%AC%E6%B6%88%E6%81%AF%E7%8A%B6%E6%80%81)。

<Note title="提示">
如果需要此回调获取 ZIM 内容审核服务的拒绝原因，请联系 ZEGO 技术支持配置开通。
</Note>

| iOS | Android | macOS |
|-----|---------|-------|
| [messageSentStatusChanged](https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_ios~protocol~ZIMEventHandler#zim-message-sent-status-changed)    | [onMessageSentStatusChanged](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~struct~ZIMMessageSentStatusChangeInfo)|[messageSentStatusChanged](https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_macos~protocol~ZIMEventHandler#zim-message-sent-status-changed)|

| Windows | Web | 小程序 |
|---------|-----|--------|
| [onMessageSentStatusChanged](https://doc-zh.zego.im/article/api?doc=zim_API~cpp_windows~class~ZIMEventHandler#on-message-sent-status-changed)| [messageSentStatusChanged](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_web~interface~ZIMEventHandler#message-sent-status-changed)| [messageSentStatusChanged](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_wxxcx~interface~ZIMEventHandler#message-sent-status-changed)|

| Flutter | Unity3D | uni-app |
|---------|---------|---------|
| [onMessageSentStatusChanged](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMEventHandler/onMessageSentStatusChanged.html)|[OnMessageSentStatusChanged](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~class~ZIMEventHandler#on-message-sent-status-changed)|[messageSentStatusChanged](https://doc-zh.zego.im/zim-uniapp/guides/messaging/send-and-receive-messages)|

| uni-app x | React Native | HarmonyOS |  
|--------------|-----------|---|
| [messageSentStatusChanged](https://doc-zh.zego.im/zim-uniapp/guides/messaging/send-and-receive-messages)|[messageSentStatusChanged](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_react-native~interface~ZIMEventHandler#message-sent-status-changed)|[messageSentStatusChanged](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_harmony~interface~ZIMEventHandler#message-sent-status-changed)| 



基于您的应答以及 ZIM [内容审核](/zim-android/guides/content-moderation/overview) 服务开通与否，ZIM 会决定是否向消息接受端发送消息。ZIM 操作如下表所示：

<Tabs>
<Tab title="有开通 ZIM 内容审核服务">
<table>
<tbody><tr>
<th colspan="2">您的应答</th>
<th rowspan="2">ZIM 审核结果</th>
<th rowspan="2">ZIM 是否发送该消息</th>
<th rowspan="2">ZIM 返回给消息发送端的发送结果</th>
<th rowspan="2">消息接收端是否可接收该消息</th>
</tr>
<tr>
<th>值</th>
<th>含义</th>
</tr>
<tr>
<td rowspan="2">0</td>
<td rowspan="2"> 中立<br/>（不判断是否发送 </td>
<td>通过</td>
<td>发送</td>
<td>已发送</td>
<td>可接收</td>
</tr>
<tr>
<td>不通过</td>
<td>不发送</td>
<td>不发送</td>
<td>不可接收</td>
</tr>
<tr>
<td rowspan="2">1</td>
<td rowspan="2">发送</td>
<td>通过</td>
<td>发送</td>
<td>已发送</td>
<td>可接收</td>
</tr>
<tr>
<td>不通过</td>
<td>发送</td>
<td>已发送</td>
<td>可接收</td>
</tr>
<tr>
<td rowspan="2">2</td>
<td rowspan="2">静默发送</td>
<td>通过</td>
<td>发送</td>
<td>已发送</td>
<td>不可接收</td>
</tr>
<tr>
<td>不通过</td>
<td>不发送</td>
<td>不发送</td>
<td>不可接收</td>
</tr>
<tr>
<td rowspan="2">3</td>
<td rowspan="2">不发送</td>
<td>通过</td>
<td>不发送</td>
<td>不发送</td>
<td>不可接收</td>
</tr>
<tr>
<td>不通过</td>
<td>不发送</td>
<td>不发送</td>
<td>不可接收</td>
</tr>
</tbody></table>
</Tab>
<Tab title="无开通 ZIM 内容审核服务">
<table>
<tbody><tr>
<th colspan="2">您的应答</th>
<th rowspan="2">ZIM 是否发送该消息</th>
<th rowspan="2">ZIM 返回给消息发送端的发送结果</th>
<th rowspan="2">消息接收端是否可接收该消息</th>
</tr>
<tr>
<th>值</th>
<th>含义</th>
</tr>
<tr>
<td>0</td>
<td>中立<br/>（不判断是否发送）</td>
<td>发送</td>
<td>已发送</td>
<td>可接收</td>
</tr>
<tr>
<td>1</td>
<td>发送</td>
<td>发送</td>
<td>已发送</td>
<td>可接收</td>
</tr>
<tr>
<td>2</td>
<td>静默发送</td>
<td>发送</td>
<td>已发送</td>
<td>不可接收</td>
</tr>
<tr>
<td>3</td>
<td>不发送</td>
<td>不发送</td>
<td>不发送</td>
<td>不可接收</td>
</tr>
</tbody></table>
</Tab>
</Tabs>

根据您的业务后台应答的值，消息发送方的客户端可能会收到以下错误码：

<table>
<tbody><tr>
<th>错误码</th>
<th>说明</th>
</tr>
<tr>
<td>111101</td>
<td>您的业务后台不同意发送此消息，ZIM 服务端拒绝发送此消息。</td>
</tr>
</tbody></table>



## 应答示例

```json
{
    "result": 0
}
```

## 返回响应

收到回调后，如果您的服务器返回的 HTTP status code 为 2XX （例如 200），表示成功；返回其他，表示失败。

## 回调重试策略

如果 ZEGO 服务器在 2.5 秒内没有收到响应，判定为本次请求失败；随后会立即进行重试，若此次请求发起后 2.5 秒内仍未收到相应，则不再重试。

## 说明

当 ZEGO 客户端向您发起请求时，如果您的业务侧发生异常，则默认不发送消息。如需默认发送消息，请联系 ZEGO 技术支持。
