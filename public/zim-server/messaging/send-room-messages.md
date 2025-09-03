<Note title="说明">
开通内容审核功能后，默认情况下服务端发送的消息会进行审核。如果服务端发送的消息不需要审核，请联系 ZEGO 技术支持进行配置。
</Note>
# 发送房间消息

- - -


## 描述

发送房间消息，推送给房间内的所有在线用户。

客户端将通过 ZIM SDK 的回调接口，接收房间内的消息通知。

<MessageModerationNote />

| iOS-25% | Android-25% | macOS-25% | Windows-25% |
|-----|---------|-------|---------|
| [roomMessageReceived](https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_ios~protocol~ZIMEventHandler#zim-room-message-received-info-from-room-id) | [onRoomMessageReceived](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIMEventHandler#on-room-message-received) | [roomMessageReceived](https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_macos~protocol~ZIMEventHandler#zim-room-message-received-info-from-room-id) | [onRoomMessageReceived](https://doc-zh.zego.im/article/api?doc=zim_API~cpp_windows~class~ZIMEventHandler#on-room-message-received) |

| Web-25% | 小程序-25% | Flutter-25% | React Native-25% |
|---------|---------|---------|---------|
| [roomMessageReceived](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_web~interface~ZIMEventHandler#room-message-received) | [roomMessageReceived](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_wxxcx~interface~ZIMEventHandler#room-message-received) | [onRoomMessageReceived](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMEventHandler/onRoomMessageReceived.html) | [roomMessageReceived](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_react-native~interface~ZIMEventHandler#room-message-received) |

| Unity3D-25% | uni-app \| uni-app x-25% | HarmonyOS-25% |
|---------|---------|---------|
| [onReceiveRoomMessage](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~class~ZIMEventHandler#on-receive-room-message) | [roomMessageReceived](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_uni-app~interface~ZIMEventHandler#room-message-received) | [roomMessageReceived](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_harmony~interface~ZIMEventHandler#room-message-received) |


## 接口原型

- 请求方法：POST
- 请求地址：`https://zim-api.zego.im/?Action=SendRoomMessage`
- 传输协议：HTTPS
- 调用频率限制：10 次/秒，如需调整，请联系 ZEGO 商务人员了解具体计费规则。


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
<td>RoomId</td>
<td>String</td>
<td>是</td>
<td>房间 ID。</td>
</tr>
<tr>
<td>MessageType</td>
<td>Number</td>
<td>是</td>
<td>消息类型，房间会话的适用类型请参考 [MessageBody 说明](/zim-server/messaging/messagebody-introduction)。</td>
</tr>
<tr>
<td>Priority</td>
<td>Number</td>
<td>是</td>
<td>消息优先级（详情请参考 [基本概念介绍 - 消息优先级](https://doc-zh.zego.im/zim-android/introduction/basic-concepts#消息优先级)），取值如下：<p></p><ul><li>1：低。</li><li>2：中。</li><li>3：高。</li></ul></td>
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
<td>SearchedContent</td>
<td>String</td>
<td>否</td>
<td>自定义消息的检索字段。当 MessageType 为自定义消息时，才可填写此字段，长度上限默认为 64 字节。此字段作用于客户端，除非填写了此字段，否则无法通过客户端搜索到关联的自定义消息。</td>
</tr>
<tr>
<td>SenderUnaware</td>
<td>Number</td>
<td>否</td>
<td>通过本服务端接口发送消息，请求参数中的 FromUserId 所对应的客户端是否能感知此次发送：<ul><li>0：可以感知。</li><li>1：（默认）无感知。</li></ul></td>
</tr>
</tbody></table>

<Note title="说明">

- FromUserId、RoomId 仅支持数字，英文字符和 {"'!'，'#'，'$'，'%'，'&'，'('，')'，'+'，'-'，':'，';'，'<'，'='，'.'，'>'，'?'，'@'，'['，']'，'^'，'_'，' '，'{'，'}'，'|'，'~'"}。
- 对于发送和接收 MessageType 为 200 的自定义消息，发送方和接收放对应的客户端的 SDK 版本需为 2.8.0 或以上。
- 如果接收端的 SDK 版本介乎 [2.0.0, 2.8.0) 区间，可以收到自定义消息时，但会显示此消息类型为未知，且无法获取信息内容。如需获取此条消息，请将 SDK 升级为 2.8.0 或以上版本。
- 如果接收端的 SDK 版本为 1.x.x 版本，则无法收到自定义消息，也不会收到未知消息。
</Note>

## 请求示例

- 请求地址 URL：

```json
https://zim-api.zego.im/?Action=SendRoomMessage
&<公共请求参数>
```

- 请求消息体：

```json
{
    "FromUserId": "u1",
    "RoomId": "r1",
    "MessageType": 1,
    "Priority": 1,
    "MessageBody": {
        "Message":"hello world",
        "ExtendedData":"d"
    }
}
```

## 响应参数

| 参数       | 类型    | 描述               |
|-----------|--------|------------------|
| Code      | Number | 返回码。            |
| Message   | String | 请求结果的说明信息。  |
| RequestId | String | 请求 ID。          |
| AuditInfos   | Array of Object    | 审核结构数组，当数组不为空时，说明存在审核失败的消息，可以通过该结构查看审核失败原因。    |
| └Index    | Number             |  <ul><li>此参数可能出现以下几种情况：<ul><li>当您已启用 ZIM 内容审核服务，且未通过 [发送消息前回调](/zim-server/callbacks/message-not-sent-yet) 拒绝该消息时：<ul><li>对于组合消息，此参数表示未通过审核的 Item 在组合消息中的索引，从 0 开始。</li><li>对于其他类型消息，则此参数始终为 0。</li></ul></li><li>当您收到发送消息前回调后拒绝了此消息，则不论消息类型，此参数始终为 0。</li></ul></li></ul>  |
| └Reason    | String             | 拒绝原因。  |

## 响应示例

```json
{
    "Code":0,
    "Message":"success",
    "RequestId":"343649807833778782",
    "AuditInfos":[
      {
          "Index": 0,
          "Reason": "reason"    // 返回审核失败原因
      }
    ]
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
<td>660000025</td>
<td>`MessageBody` 中 `IsBase64` 传入 1 后，发送经 base64 编码的信令消息失败。</td>
<td>
请确认：
- 请确认 `IsBase64` 是否需要为 1，即是否需要发送二进制类型信令消息。
- 请确认消息内容是否经 base64 编码。
</td>
</tr>
<tr>
<td>660300001</td>
<td>输入的 RoomId 不存在。</td>
<td>请确认输入的 RoomId 是否正确。</td>
</tr>
<tr>
<td>660300013</td>
<td>房间消息不支持附带回执。</td>
<td>请删除请求消息体中的 “HasReceipt” 字段。</td>
</tr>
<tr>
<td>660400001</td>
<td>输入的消息大小超出限制。</td>
<td>请检查输入的消息大小。</td>
</tr>
<tr>
<td>660500002</td>
<td>消息发送者未登录过 SDK。</td>
<td>请用户先登录后再发送消息。</td>
</tr>
</tbody></table>
