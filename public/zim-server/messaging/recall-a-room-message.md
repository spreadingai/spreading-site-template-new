
# 撤回房间消息

- - -

<Note title="说明">

如需使用本功能，请开通 ZIM 旗舰版服务，以确保您的 App ID 已设置为启用保存房间消息。
</Note>

## 描述

调用此接口，您可以撤回房间会话消息。

消息撤回后，房间内的用户将通过以下 ZIM SDK 的回调接口，接收消息已被撤回的通知。

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
- 请求地址：`https://zim-api.zego.im/?Action=RevokeRoomMessage`
- 传输协议：HTTPS
- 调用频率限制：20 次/秒。

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
<td>消息发送者用户 ID（已在客户端调用 `login` 方法登录 ZIM 服务，或已调用 [服务端 API](/zim-server/user/batch-register-users) 完成注册）。</td>
</tr>
<tr>
<td>RoomId</td>
<td>String</td>
<td>是</td>
<td>房间 ID。</td>
</tr>
<tr>
<td>MsgSeq</td>
<td>Number</td>
<td>是</td>
<td>
消息 seq。获取方式：
- 若需要撤回由**客户端**发出的房间消息，通过 [消息发送后回调](/zim-server/callbacks/message-sent) 获取 MsgSeq。
- 若需要撤回由服务端 API [SendRoomMessage](/zim-server/messaging/send-room-messages) 发出的房间消息，通过接口响应数据获取 MsgSeq。
</td>
</tr>
<tr>
<td>Payload</td>
<td>String</td>
<td>否</td>
<td>撤回附加信息，最大 200 字节。</td>
</tr>
</tbody></table>

## 请求示例

- 请求地址 URL：

```json
https://zim-api.zego.im/?Action=RevokeRoomMessage
&<公共请求参数>
```
- 请求消息体：

```json
{
    "FromUserId": "u1",
    "GroupId": "room1",
    "MsgSeq": 10,
    "Payload": "hello world"
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
<td>660000001</td>
<td>业务类通用错误。</td>
<td>请重试，或联系 ZEGO 技术支持。</td>
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
<td>660000027</td>
<td>未启用保存房间消息配置，无法撤回消息。</td>
<td>请开通 ZIM 旗舰版服务。</td>
</tr>
<tr>
<td>660300001</td>
<td>房间不存在。</td>
<td>请确认输入的 RoomId 是否正确或房间是否已被销毁。</td>
</tr>
<tr>
<td>660300002</td>
<td>用户不在此房间内。</td>
<td>请确认输入的 UserId 是否正确。</td>
</tr>
<tr>
<td>660300005</td>
<td>调用接口的频率超出了 AppID 级别限制。</td>
<td>请稍后再试，或参考相关文档了解调用频率。</td>
</tr>
</tbody></table>
