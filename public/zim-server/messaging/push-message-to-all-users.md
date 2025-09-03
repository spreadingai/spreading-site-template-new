# 全员推送

- - -


## 描述

全员推送，是指向所有在线用户（包括消息发送用户自己）、离线用户发送特定内容的消息，如文本、图片等。本功能适用于全员活动公告、送礼跨房间飘屏等场景。

- 在线用户：登录 ZIM 并且心跳未超时的用户。
- 离线用户：登录 ZIM 并上报 ZPNsPushId 之后，心跳超时的用户。

<Note title="说明">
- 如需使用本功能，请开通 ZIM 专业版或旗舰版服务。
- 通过本接口发送的消息不会导致会话产生，也不会被保存。
</Note>

消息接收用户仅通过以下 ZIM SDK 的回调接口，接收全员推送的消息，得知消息由哪位用户发出。

| iOS-25% | Android-25% | macOS-25% | Windows-25% |
|-----|---------|-------|---------|
| [broadcastMessageReceived](https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_ios~protocol~ZIMEventHandler#zim-broadcast-message-received) | [onBroadcastMessageReceived](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIMEventHandler#on-broadcast-message-received) | [broadcastMessageReceived](https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_macos~protocol~ZIMEventHandler#zim-broadcast-message-received) | [onBroadcastMessageReceived](https://doc-zh.zego.im/article/api?doc=zim_API~cpp_windows~class~ZIMEventHandler#on-broadcast-message-received) |

| Web-25% | 小程序-25% | Flutter-25% | React Native-25% |
|---------|-----|--------|--------------|
| [broadcastMessageReceived](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_web~interface~ZIMEventHandler#broadcast-message-received) | [broadcastMessageReceived](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_wxxcx~interface~ZIMEventHandler#broadcast-message-received) | [onBroadcastMessageReceived](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMEventHandler/onBroadcastMessageReceived.html) | [broadcastMessageReceived](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_react-native~interface~ZIMEventHandler#broadcast-message-received) |

| uni-app \| uni-app x-25% | HarmonyOS-25% |
|---------|-----------|
| [broadcastMessageReceived](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_uni-app~interface~ZIMEventHandler#broadcast-message-received) | [broadcastMessageReceived](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_harmony~interface~ZIMEventHandler#broadcast-message-received) | |


## 接口原型

- 请求方法：POST
- 请求地址：`https://zim-api.zego.im/?Action=SendMessageToAllUsers`
- 传输协议：HTTPS
- 调用频率限制：1 次/秒，每 24 小时内仅限 100 次，如需调整，请联系 ZEGO 技术支持。

## 请求参数

以下请求参数列表仅列出了接口请求参数和部分公共参数，完整公共参数列表请参考 [调用方式 - 公共请求参数](/zim-server/accessing-server-apis#2-公共参数)。

<table>
<tbody><tr>
<th>参数</th>
<th>类型</th>
<th>是否必选</th>
<th>描述</th>
</tr>
<tr>
<td>FromUserId</td>
<td>String</td>
<td>是</td>
<td>发送方的用户 ID（已在客户端调用 `login` 方法登录 ZIM 服务，或已调用 [服务端 API](/zim-server/user/batch-register-users) 完成注册）。</td>
</tr>
<tr>
<td>MessageType</td>
<td>Number</td>
<td>是</td>
<td>消息类型，全员推送的适用类型请参考 [MessageBody 说明](/zim-server/messaging/messagebody-introduction)。</td>
</tr>
<tr>
<td>MessageBody</td>
<td>Object</td>
<td>是</td>
<td>消息内容，具体参数格式请参考 [MessageBody 说明](/zim-server/messaging/messagebody-introduction)。</td>
</tr>
<tr>
<td>SubMsgType</td>
<td>Number</td>
<td>当 MessageType 为自定义消息时，才需赋值此参数</td>
<td>具体的自定义类型。值由您定义，取值范围为 [0,200]。</td>
</tr>
<tr>
<td>PushType</td>
<td>Number</td>
<td>否</td>
<td>推送类别：<ul><li>0：对在线用户进行在线推送。</li><li>1：对在线用户进行在线推送，对离线用户进行离线推送。</li><li>2：对所有上报了 ZPNsPushId 的用户进行离线推送。</li></ul></td>
</tr>
</tbody></table>

<Note title="说明">

- FromUserId 仅支持数字，英文字符和 {"'!'，'#'，'$'，'%'，'&'，'('，')'，'+'，'-'，':'，';'，'<'，'='，'.'，'>'，'?'，'@'，'['，']'，'^'，'_'，' '，'{'，'}'，'|'，'~'"}。
- 如果发送方使用的 SDK 版本（版本说明请参考 [发布日志](/zim-android/client-sdks/zim-release-notes)）低于 `2.0.0`，ZIM 服务端对应的仅支持 `MessageType` 为 `2` 的 Command 类型消息，不支持其他类型。  
    为了给开发者带来更好的体验，ZEGO 推荐开发者使用最新版本的 SDK。
- 消息接收方的 SDK 版本必须为 2.10.0 或以上，才能接受全员推送消息。
</Note>

## 请求示例

- 请求地址 URL：

```json
https://zim-api.zego.im/?Action=SendMessageToAllUsers
&<公共请求参数>
```

- 请求消息体：

```json
{
    "FromUserId": "u1",
    "MessageType": 1,
    "MessageBody": {
        "Message":"hello world",
        "ExtendedData":"s"
    },
    "SubMsgType": 0,
    "PushType": 0
}
```

## 响应参数

<table>
<tbody><tr data-row-level="1">
<th>参数</th>
<th>类型</th>
<th>描述</th>
</tr>
<tr data-row-level="2">
<td>Code</td>
<td>Number</td>
<td>返回码。
<Note title="说明">当您发起请求同时向多个用户发送消息时：<ul><li>如果只需成功向 1 个或以上的用户发送消息，Code 都会返回 0，表示成功。此时请参考 ErrorList 中的具体信息，确认操作结果，了解是否向部分用户发送消息失败。</li><li>如果向所有用户发送消息都失败，Code 会返回相关返回码，具体请参考 [全局返回码](/zim-server/return-codes)。</li></ul></Note></td>
</tr>
<tr data-row-level="3">
<td>Message</td>
<td>String</td>
<td>请求结果的说明信息。</td>
</tr>
<tr data-row-level="4">
<td>RequestId</td>
<td>String</td>
<td>请求 ID。</td>
</tr>
</tbody></table>


## 响应示例

```json
{
    "Code": 0,
    "Message": "success",
    "RequestId": "343649807833778782"
}
```


## 返回码

以下仅列出了接口业务逻辑相关的返回码，完整返回码请参考 [全局返回码](/zim-server/return-codes)。

<table>
<tbody><tr>
<th>返回码</th>
<th>说明</th>
<th>处理建议</th>
</tr>
<tr>
<td>660000002</td>
<td>输入参数错误。</td>
<td>请检查输入的参数。</td>
</tr>
<tr>
<td>660400001</td>
<td>输入的消息大小超出限制。</td>
<td>请检查输入的消息大小。</td>
</tr>
<tr>
<td>660500002</td>
<td>消息发送者未登录 SDK。</td>
<td>请登录 ZIM SDK 后再发送消息。</td>
</tr>
<tr>
<td>660500003</td>
<td>调用 SendMessageToAllUsers 接口的频率超出限制。</td>
<td>请稍后再试。</td>
</tr>
</tbody></table>
