<Note title="说明">
开通内容审核功能后，默认情况下服务端发送的消息会进行审核。如果服务端发送的消息不需要审核，请联系 ZEGO 技术支持进行配置。
</Note>
# 发送群组消息

- - -

## 描述

发送群组消息，并推送给群组内的所有在线用户。

客户端将通过 ZIM SDK 的回调接口，接收群组消息的通知。

<MessageModerationNote />

| iOS-25% | Android-25% | macOS-25% | Windows-25% |
|-----|---------|-------|---------|
| [groupMessageReceived](https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_ios~protocol~ZIMEventHandler#zim-group-message-received-info-from-group-id) | [onGroupMessageReceived](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIMEventHandler#on-group-message-received) | [groupMessageReceived](https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_macos~protocol~ZIMEventHandler#zim-group-message-received-info-from-group-id) | [onGroupMessageReceived](https://doc-zh.zego.im/article/api?doc=zim_API~cpp_windows~class~ZIMEventHandler#on-group-message-received) |

| Web-25% | 小程序-25% | Flutter-25% | React Native-25% |
|---------|---------|---------|---------|
| [groupMessageReceived](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_web~interface~ZIMEventHandler#group-message-received) | [groupMessageReceived](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_wxxcx~interface~ZIMEventHandler#group-message-received) | [onGroupMessageReceived](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMEventHandler/onGroupMessageReceived.html) | [groupMessageReceived](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_react-native~interface~ZIMEventHandler#group-message-received) |

| Unity3D-25% | uni-app \| uni-app x-25% | HarmonyOS-25% |
|---------|---------|---------|
| [onReceiveGroupMessage](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~class~ZIMEventHandler#on-receive-group-message) | [groupMessageReceived](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_uni-app~interface~ZIMEventHandler#group-message-received) | [groupMessageReceived](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_harmony~interface~ZIMEventHandler#group-message-received) |  |


## 接口原型

- 请求方法：POST
- 请求地址：`https://zim-api.zego.im/?Action=SendGroupMessage`
- 传输协议：HTTPS
- 调用频率限制：10 次/秒。

## 请求参数

以下请求参数列表仅列出了接口请求参数和部分公共参数，完整公共参数列表请参考 [调用方式 - 公共请求参数](/zim-server/accessing-server-apis#2-公共参数)。

| 参数 | 类型 | 是否必选 | 描述 |
|------|------|----------|------|
| FromUserId | String | 是 | 发送方的用户 ID（已在客户端调用 `login` 方法登录 ZIM 服务，或已调用 [服务端 API](/zim-server/user/batch-register-users) 完成注册）。 |
| GroupId | String | 是 | 群组 ID。 |
| MessageType | Number | 是 | 消息类型，群组会话的适用类型请参考 [MessageBody 说明](/zim-server/messaging/messagebody-introduction)。 |
| Priority | Number | 是 | 消息优先级（详情请参考 [基本概念介绍 - 消息优先级](https://doc-zh.zego.im/zim-android/introduction/basic-concepts#消息优先级)），取值如下：<ul><li>1：低。</li><li>2：中。</li><li>3：高。</li></ul> |
| MessageBody | Object | 是 | 消息内容，具体参数格式请参考 [MessageBody 说明](/zim-server/messaging/messagebody-introduction)。 |
| SubMsgType | Number | 当 MessageType 为自定义消息时，才需赋值此参数 | 具体的自定义类型。值由您定义，取值范围为 [0,200]。 |
| SearchedContent | String | 否 | 自定义消息的检索字段。当 MessageType 为自定义消息时，才可填写此字段，长度上限默认为 64 字节。此字段作用于客户端，除非填写了此字段，否则无法通过客户端搜索到关联的自定义消息。 |
| SendMsgOptions | Object | 否 | 可选配置项。 |
| └NoUnread | Bool | 否 | 此消息是否会增加接收方的消息未读数。<ul><li>false: （默认值）会。</li><li>true：不会。</li></ul> |
| └TargetOption | Object | 否 | 群定向消息的配置项，详情请参考 [TargetOption](#targetoption)。<Warning title="注意">如果配置了 TargetOption 参数， NoUnread 无论设置为 `false` 还是 `true` 此消息都不会计入未读数。</Warning>  |

<Note title="说明">

FromUserId、GroupId 仅支持数字，英文字符和 {"'!'，'#'，'$'，'%'，'&'，'('，')'，'+'，'-'，':'，';'，'<'，'='，'.'，'>'，'?'，'@'，'['，']'，'^'，'_'，' '，'{'，'}'，'|'，'~'"}。
</Note>

<Note title="说明">
- 如果发送方使用的 SDK 版本（版本说明请参考 [发布日志](/zim-android/client-sdks/zim-release-notes)）低于 `2.0.0`，ZIM 服务端对应的仅支持 `MessageType` 为 `2` 的 Command 类型消息，不支持其他类型。
  
    为了给开发者带来更好的体验，ZEGO 推荐开发者使用最新版本的 SDK。
- 如果发送方请求发送 MessageType 为 1 的文本消息，则发送方对应的客户端（SDK 版本需为 2.7.0 或以上）也会收到该消息。
- 对于发送和接收 MessageType 为 200 的自定义消息，发送方和接收放对应的客户端的 SDK 版本需为 2.8.0 或以上。
- 如果接收端的 SDK 版本介乎 [2.0.0, 2.8.0) 区间，可以收到自定义消息时，但会显示此消息类型为未知，且无法获取信息内容。如需获取此条消息，请将 SDK 升级为 2.8.0 或以上版本。
- 如果接收端的 SDK 版本为 1.x.x 版本，则无法收到自定义消息，也不会收到未知消息。
</Note>

### TargetOption

| 字段 | 类型 | 是否必选 | 说明 |
|------|------|----------|------|
| ReceiverUserIds | Array of String | 否 | 用户 ID 列表。 |
| Inclusive | Bool | 否 | 指向类型。<ul><li>false：（默认）反向指向，即 `ReceiverUserIds` 列明的用户不会收到此消息。</li><li>true：正向指向，即仅 `ReceiverUserIds` 列明的用户会收到此消息。</li></ul> |

## 请求示例

- 请求地址 URL：

```json
https://zim-api.zego.im/?Action=SendGroupMessage
&<公共请求参数>
```

- 请求消息体：

```json
{
    "FromUserId": "u1",
    "GroupId": "r1",
    "MessageType": 1,
    "Priority": 1,
    "MessageBody": {
        "Message":"hello world",
        "ExtendedData":"d",
        "OfflinePush" :{
            "Enable":0,
            "Title":"Title",
            "Content":"Content",
            "Payload":"data"
        }
    },
    "SendMsgOptions": {
        "NoUnread": true,
        "TargetOption" :{
            "Inclusive": true,
            "ReceiverUserIds": ["userA", "userB"]
        }
    }
}
```

## 响应参数

| 参数       | 类型    | 描述                                                                 |
|-----------|--------|--------------------------------------------------------------------|
| Code      | Number | 返回码。                                                              |
| Message   | String | 请求结果的说明信息。                                                    |
| RequestId | String | 请求 ID。                                                            |
| MsgSeq    | Number | 消息 Seq。当消息类型为信令消息时，此字段为空。可用于 [撤回群聊消息](/zim-server/messaging/recall-a-group-message)。 |
| MsgId     | Number | 消息 ID。                                                            |
| AuditInfos   | Array of Object    | 审核结构数组，当数组不为空时，说明存在审核失败的消息，可以通过该结构查看审核失败原因。    |
| └Index    | Number             |  <ul><li>此参数可能出现以下几种情况：<ul><li>当您已启用 ZIM 内容审核服务，且未通过 [发送消息前回调](/zim-server/callbacks/message-not-sent-yet) 拒绝该消息时：<ul><li>对于组合消息，此参数表示未通过审核的 Item 在组合消息中的索引，从 0 开始。</li><li>对于其他类型消息，则此参数始终为 0。</li></ul></li><li>当您收到发送消息前回调后拒绝了此消息，则不论消息类型，此参数始终为 0。</li></ul></li></ul>  |
| └Reason    | String             | 拒绝原因。  |


## 响应示例

```json
{
    "Code":0,
    "Message":"success",
    "RequestId":"343649807833778782",
    "MsgSeq": 1,
    "MsgId": 1,
    "AuditInfos":[
        {
            "Index": 0,
            "Reason": "reason"    // 返回审核失败原因
        }
    ] 
}
```


## 返回码

以下仅列出了接口业务逻辑相关的返回码，完整返回码请参考  [全局返回码](/zim-server/return-codes)。

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
<td>660400001</td>
<td>输入的消息大小超出限制。</td>
<td>请检查输入的消息大小。</td>
</tr>
<tr>
<td>660500002</td>
<td>消息发送者未登录过 SDK。</td>
<td>请用户先登录后再发送消息。</td>
</tr>
<tr>
<td>660600001</td>
<td>输入的 GroupId 不存在。</td>
<td>请确认输入的 GroupId 是否正确。</td>
</tr>
</tbody></table>
