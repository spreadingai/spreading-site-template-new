
# 撤回单聊消息

- - -

## 描述

调用此接口，您可以撤回 2 分钟内的单聊会话消息。如需撤回更早之前的消息，请联系 ZEGO 技术支持，最多可撤回 24 小时内发出的消息。

消息撤回后，消息接收用户将通过以下 ZIM SDK 的回调接口，接收消息已被撤回的通知。

| iOS-25% | Android-25% | macOS-25% | Windows-25% |
|-----|---------|-------|---------|
| [messageRevokeReceived](https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_ios~protocol~ZIMEventHandler#zim-message-revoke-received) | [onMessageRevokeReceived](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIMEventHandler#on-message-revoke-received) | [messageRevokeReceived](https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_macos~protocol~ZIMEventHandler#zim-message-revoke-received) | [onMessageRevokeReceived](https://doc-zh.zego.im/article/api?doc=zim_API~cpp_windows~class~ZIMEventHandler#on-message-revoke-received) |

| Web-25% | 小程序-25% | Flutter-25% | React Native-25% |
|---------|-----|--------|--------------|
| [messageRevokeReceived](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_web~interface~ZIMEventHandler#message-revoke-received) | [messageRevokeReceived](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_wxxcx~interface~ZIMEventHandler#message-revoke-received) | [onMessageRevokeReceived](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMEventHandler/onMessageRevokeReceived.html) | [messageRevokeReceived](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_react-native~interface~ZIMEventHandler#message-revoke-received) |

| Unity3D-25% | uni-app \| uni-app x-25% | HarmonyOS-25% |
|---------|---------|---------|
| [OnMessageRevokeReceived](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~class~ZIMEventHandler#on-message-revoke-received) | [messageRevokeReceived](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_uni-app~interface~ZIMEventHandler#message-revoke-received) | [messageRevokeReceived](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_harmony~interface~ZIMEventHandler#message-revoke-received) |


## 接口原型

- 请求方法：POST
- 请求地址： `https://zim-api.zego.im/?Action=RevokePeerMessage`
- 传输协议：HTTPS
- 调用频率限制：20 次/秒。

## 请求参数

以下请求参数列表仅列出了接口请求参数和部分公共参数，完整公共参数列表请参考 [调用方式 - 公共请求参数](/zim-server/accessing-server-apis#2-公共参数)。

<Note title="说明">
以下 `FromUserId` 和 `ToUserId` 对应的用户已在客户端调用 `login` 方法登录 ZIM 服务，或开发者已调用 [服务端 API](/zim-server/user/batch-register-users) 注册相关的 userID。
</Note>

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
<td>消息发送者的用户 ID。</td>
</tr>
<tr>
<td>ToUserId</td>
<td>String</td>
<td>是</td>
<td>消息接收方的用户 ID。</td>
</tr>
<tr>
<td>MsgSeq</td>
<td>Number</td>
<td>是</td>
<td>
消息 seq。获取方式：
- 若需要撤回由**客户端**发出的单聊消息，通过 [消息发送后回调](/zim-server/callbacks/message-sent) 获取 MsgSeq。
- 若需要撤回由 服务端 API [SendPeerMessage](/zim-server/messaging/send-a-one-to-one-message) 发出的单聊消息，通过接口响应数据获取 MsgSeq。
</td>
</tr>
<tr>
<td>Payload</td>
<td>String</td>
<td>否</td>
<td>撤回操作附加的信息，最大 200 字节。</td>
</tr>
<tr>
<td>OfflinePush</td>
<td>Object</td>
<td>否</td>
<td>离线推送配置，详情请参考 [OfflinePush 说明](/zim-server/messaging/messagebody-introduction#offlinepush-说明房间消息不支持此字段)。</td>
</tr>
</tbody></table>

## 请求示例

- 请求地址 URL：

```json
https://zim-api.zego.im/?Action=RevokePeerMessage
&<公共请求参数>
```
- 请求消息体：

```json
{
  "FromUserId": "u1",
  "ToUserId": "u2",
  "MsgSeq": 10,
  "Payload": "payload",
  "OfflinePush" :{
      "Enable":1,
      "Title":"title",
      "Content":"content",
      "Payload":"payload"
  }
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
<td>返回码。</td>
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
<td>参数错误。</td>
<td>请参考 <a href="#请求参数">请求参数</a> 输入正确参数。</td>
</tr>
<tr>
<td>660000022</td>
<td>未找到消息，可能是消息已经被删除或者消息不存在。</td>
<td>请检查消息是否被删除，以及 MsgSeq 是否正确。</td>
</tr>
<tr>
<td>660000023</td>
<td>消息已被撤回。</td>
<td>请确认消息是否已被撤回。<ul><li>如经确认，消息已被撤回，则无需处理。</li><li>如经确认，消息未被撤回，请联系 ZEGO 技术支持排查问题。</li></ul></td>
</tr>
<tr>
<td>660000024</td>
<td>已超过撤回时间。</td>
<td>如需撤回更长时间内的消息，请联系 ZEGO 技术支持进行配置。</td>
</tr>
<tr>
<td>660000026</td>
<td>待撤回消息与 FromUserId 不匹配。</td>
<td>请检查 FromUserId 字段是否正确。</td>
</tr>
<tr>
<td>660300005</td>
<td>调用接口的频率超出了 AppID 级别限制。</td>
<td>请稍后再试，或参考相关文档了解调用频率。</td>
</tr>
</tbody></table>
