<Note title="说明">
开通内容审核功能后，默认情况下服务端发送的消息会进行审核。如果服务端发送的消息不需要审核，请联系 ZEGO 技术支持进行配置。
</Note>
# 发送单聊消息

- - -

## 描述

发送 1v1 单聊消息，支持向单个用户、或批量向多个用户发送消息。

目标客户端将通过 ZIM SDK 的回调接口，接收单聊消息的通知。

<MessageModerationNote />

| iOS-25% | Android-25% | macOS-25% | Windows-25% |
|-----|---------|-------|---------|
| [peerMessageReceived](https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_ios~protocol~ZIMEventHandler#zim-peer-message-received-info-from-user-id) | [onPeerMessageReceived](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIMEventHandler#on-peer-message-received) | [peerMessageReceived](https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_macos~protocol~ZIMEventHandler#zim-peer-message-received-info-from-user-id) | [onPeerMessageReceived](https://doc-zh.zego.im/article/api?doc=zim_API~cpp_windows~class~ZIMEventHandler#on-peer-message-received) |

| Web-25% | 小程序-25% | Flutter-25% | React Native-25% |
|-----|---------|-------|---------|
| [peerMessageReceived](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_web~interface~ZIMEventHandler#peer-message-received) | [peerMessageReceived](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_wxxcx~interface~ZIMEventHandler#peer-message-received) | [onPeerMessageReceived](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMEventHandler/onPeerMessageReceived.html) | [peerMessageReceived](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_react-native~interface~ZIMEventHandler#peer-message-received) |

| Unity3D-25% | uni-app \| uni-app x-25% | HarmonyOS-25% |
|-----|---------|-------|
| [OnReceivePeerMessage](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~class~ZIMEventHandler#on-receive-peer-message) | [peerMessageReceived](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_uni-app~interface~ZIMEventHandler#peer-message-received) | [peerMessageReceived](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_harmony~interface~ZIMEventHandler#peer-message-received) |  |

## 接口原型

- 请求方法：POST
- 请求地址：`https://zim-api.zego.im/?Action=SendPeerMessage`
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
<td>发送方的用户 ID。</td>
</tr>
<tr>
<td>ToUserId</td>
<td>Array of String</td>
<td>是</td>
<td>接收方的用户 ID 列表，最大支持 100 个用户 ID。<Note title="说明">列表中不能包含与 FromUserId 相同的 userID，即发送方不可以给自己发消息。</Note></td>
</tr>
<tr>
<td>MessageType</td>
<td>Number</td>
<td>是</td>
<td>消息类型，单聊会话的适用类型请参考 [MessageBody 说明](/zim-server/messaging/messagebody-introduction)。</td>
</tr>
<tr>
<td>Priority</td>
<td>Number</td>
<td>是</td>
<td><p>消息优先级（详情请参考 [基本概念介绍 - 消息优先级](https://doc-zh.zego.im/zim-android/introduction/basic-concepts#消息优先级)），取值如下：</p><ul><li>1：低。</li><li>2：中。</li><li>3：高。</li></ul></td>
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
<td>通过本服务端接口发送消息，请求参数中的 FromUserId 所对应的客户端是否能感知此次发送：<ul><li>0：（默认）可以感知。</li><li>1：无感知。</li></ul></td>
</tr>
<tr>
<td>SendMsgOptions</td>
<td>Object</td>
<td>否</td>
<td>可选配置项。</td>
</tr>
<tr>
<td>└NoUnread</td>
<td>bool</td>
<td>否</td>
<td>此消息是否会增加接收方的消息未读数。<ul><li>false: （默认值）会。</li><li>true：不会。</li></ul></td>
</tr>
</tbody></table>

<Note title="说明">

- FromUserId、ToUserId 仅支持数字，英文字符和 {"'!'，'#'，'$'，'%'，'&'，'('，')'，'+'，'-'，':'，';'，'<'，'='，'.'，'>'，'?'，'@'，'['，']'，'^'，'_'，' '，'{'，'}'，'|'，'~'"}。
- 如果发送方使用的 SDK 版本（版本说明请参考 [发布日志](/zim-android/client-sdks/zim-release-notes)）低于 `2.0.0`，ZIM 服务端对应的仅支持 `MessageType` 为 `2` 的 Command 类型消息，不支持其他类型。  
    为了给开发者带来更好的体验，ZEGO 推荐开发者使用最新版本的 SDK。
- 如果发送方请求发送 MessageType 为 1 的文本消息，则发送方对应的客户端（SDK 版本需为 2.7.0 或以上）也会收到该消息。
- 对于发送和接收 MessageType 为 200 的自定义消息，发送方和接收放对应的客户端的 SDK 版本需为 2.8.0 或以上。
- 如果接收端的 SDK 版本介乎 [2.0.0, 2.8.0) 区间，可以收到自定义消息时，但会显示此消息类型为未知，且无法获取信息内容。如需获取此条消息，请将 SDK 升级为 2.8.0 或以上版本。
- 如果接收端的 SDK 版本为 1.x.x 版本，则无法收到自定义消息，也不会收到未知消息。
</Note>


## 请求示例

- 请求地址 URL：

```json
https://zim-api.zego.im/?Action=SendPeerMessage
&<公共请求参数>
```

- 请求消息体：

```json
{
    "FromUserId": "u1",
    "ToUserId":[
        "u2",
        "u3"
    ],
    "MessageType": 1,
    "Priority": 1,
    "MessageBody": {
        "Message":"hello world",
        "ExtendedData":"s",
        "OfflinePush" :{
            "Enable":0,
            "Title":"Title",
            "Content":"Content",
            "Payload":"data"
        }
    },
    "SendMsgOptions": {
        "NoUnread": true
    }
}
```

## 响应参数

| 参数        | 类型                | 描述                                                                 |
|------------|--------------------|--------------------------------------------------------------------|
| Code       | Number             | 返回码。<Note title="说明">当您发起请求同时向多个用户发送消息时：<ul><li>如果只需成功向 1 个或以上的用户发送消息，Code 都会返回 0，表示成功。此时请参考 ErrorList 中的具体信息，确认操作结果，了解是否向部分用户发送消息失败。</li><li>如果向所有用户发送消息都失败，Code 会返回相关返回码，具体请参考 [全局返回码](/zim-server/return-codes)。</li></ul></Note> |
| Message    | String             | 请求结果的说明信息。                                                  |
| RequestId  | String             | 请求 ID。                                                            |
| ErrorList  | Array of String    | 失败列表。<ul><li>Code 为 0：<ul><li>ErrorList 为空，全部单聊消息发送成功。</li><li>ErrorList 不为空，表示部分单聊消息发送失败，请参考 SubCode 处理。</li></ul></li><li>Code 不为 0：<ul><li>ErrorList 为空，表示参数错误、接口频率限制、系统错误。</li><li>ErrorList 不为空，表示全部单聊消息发送失败。</li></ul></li></ul> |
| └UserID    | String             | 发送消息失败的目标 UserID。                                           |
| └SubCode   | Number             | 发送消息失败的具体返回码。                                             |
| SuccList   | Array of Object    | 消息接受成功的用户列表。                                               |
| └UserId    | String             | 用户 ID。                                                            |
| └MsgId     | String             | 消息 ID。全局唯一。                                                   |
| └MsgSeq    | Number             | 消息 Seq。当消息类型为信令消息时，此字段为空。可用于 [撤回单聊消息](/zim-server/messaging/recall-a-one-to-one-message)。 |
| AuditInfos   | Array of Object    | 审核结构数组，当数组不为空时，说明存在审核失败的消息，可以通过该结构查看审核失败原因。    |
| └Index    | Number             |  <ul><li>此参数可能出现以下几种情况：<ul><li>当您已启用 ZIM 内容审核服务，且未通过 [发送消息前回调](/zim-server/callbacks/message-not-sent-yet) 拒绝该消息时：<ul><li>对于组合消息，此参数表示未通过审核的 Item 在组合消息中的索引，从 0 开始。</li><li>对于其他类型消息，则此参数始终为 0。</li></ul></li><li>当您收到发送消息前回调后拒绝了此消息，则不论消息类型，此参数始终为 0。</li></ul></li></ul>  |
| └Reason    | String             | 拒绝原因。  |

## 响应示例

```json
{
    "Code":0,
    "Message":"success",
    "RequestId":"343649807833778782",
    "ErrorList": [
        {
            "UserId": "u3",
            "SubCode": 1
        }
    ],
    "SuccList": [
        {
            "UserId": "id4",
            "MsgId": "6654861479614",
            "MsgSeq": 1
        }
    ],
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
<td>660000011</td>
<td>用户个数超过限制，输入的用户列表过大。</td>
<td>请检查输入的用户列表。</td>
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
</tbody></table>
