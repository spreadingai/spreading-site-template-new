
# 编辑消息

---

## 描述

ZIM 服务端支持开发者编辑已发送的单聊或群聊消息。

编辑消息成功后，会触发 [消息发送后回调](/zim-server/callbacks/message-sent)。同时消息接收用户可以通过以下 ZIM SDK 回调接口，接收消息已编辑通知。

| iOS-25% | Android-25% | macOS-25% | Windows-25% |
|-----|---------|-------|---------|
| [messageEdited](https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_ios~protocol~ZIMEventHandler#zim-message-edited) | [onMessageEdited](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIMEventHandler#on-message-edited) | [messageEdited](https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_macos~protocol~ZIMEventHandler#zim-message-edited) | [onMessageEdited](https://doc-zh.zego.im/article/api?doc=zim_API~cpp_windows~class~ZIMEventHandler#on-message-edited) |

| Web-25% | 小程序-25% | Flutter-25% | React Native-25% |
|---------|-----|--------|--------------|
| [messageEdited](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_web~interface~ZIMEventHandler#message-edited) | [messageEdited](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_wxxcx~interface~ZIMEventHandler#message-edited) | [onMessageEdited](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMEventHandler/onMessageEdited.html) | [messageEdited](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_react-native~interface~ZIMEventHandler#message-edited) |

| uni-app \| uni-app x-25% | HarmonyOS-25% |  
|---------|---------|
|[messageEdited](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_uni-app~interface~ZIMEventHandler#message-edited) | [messageEdited](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_harmony~interface~ZIMEventHandler#message-edited) | 


<Note title="说明">

- 单次调用仅可每次修改一个会话的一条消息。
- 默认仅支持 24 小时内发送的消息，如需编辑更早的历史消息，请联系 ZEGO 技术支持配置。
</Note>

## 接口原型

- 请求方法：POST
- 请求地址：
    - 单聊消息：`https://zim-api.zego.im/?Action=EditC2cMsgBody`
    - 群聊消息：`https://zim-api.zego.im/?Action=EditGroupMsgBody`
- 传输协议：HTTPS
- 调用频率限制：20 次/秒。

## 请求参数

以下请求参数列表仅列出了接口请求参数和部分公共参数，完整公共参数列表请参考 [调用方式 - 公共请求参数](/zim-server/accessing-server-apis#2-公共参数)。

| 参数 | 类型 | 是否必选 | 描述 |
|------|------|----------|------|
| FromUserId | String | 是 | 消息编辑用户 ID。<Note title="说明">编辑群聊消息时，此用户需为目标群组成员。</Note>|
| SenderId | String | 是 | 消息发送者 ID。<ul><li>编辑单聊消息时，此处必填。</li><li>编辑群聊消息时，此处选填。</li></ul>|
| ConvId | String | 是 | 会话 ID。<ul><li>编辑单聊消息时，此处填入另一参与用户的 userID。</li><li>编辑群聊消息时，此处填入目标群组的 groupID。</li></ul>|
| MsgType | Number | 是 | 消息类型。支持以下值：<ul><li>1：文本。</li><li>10：组合。</li><li>200：自定义。</li></ul>|
| ConvMsgSeq | Number | 是 | 消息 Seq。获取方式：<ul><li>若需要编辑由**客户端**发出的消息，通过 [消息发送后回调](/zim-server/callbacks/message-sent) 获取 MsgSeq。</li><li>若需要编辑由 服务端 API [SendPeerMessage](/zim-server/messaging/send-a-one-to-one-message) 发出的**单聊**消息，通过接口响应数据获取 MsgSeq。</li><li>若需要编辑由 服务端 API [SendGroupMessage](/zim-server/messaging/send-group-messages) 发出的**群聊**消息，通过接口响应数据获取 MsgSeq。</li></ul>  |
| EditType | Number | 是 | 编辑类型。支持以下值：<ul><li>1：EM_MSG（编辑消息的内容），即修改 `MessageBody` 中的 `Message` 字段，此时，`Message` 不能为空。</li><li>2：EM_PAYLOAD（编辑消息的扩展内容），即修改 `MessageBody` 中的 `ExtendedData` 字段。此时，`ExtendedData` 可以为空</li><li>4：EM_AT（编辑消息的提醒属性），即修改 `AtListInfo` 或 `IsAtAll`。此时，`AtListInfo` 和 `IsAtAll` 都可以为空。</li><li>8：EM_AT_ALL（编辑是否提醒全部用户），即修改 `IsAtAll`。</li><li>16：EM_SUBMSGTYPE（编辑自定义消息的类型），即修改 `subMsgType`。此时需要 `MsgType` 为 `200`。</li></ul>您可以将以上任意值做位运算，表示同时编辑消息的多种属性，如：3：同时选择 EM_MSG 和 EM_PAYLOAD，修改 `MessageBody` 中的 `Message` 和 `ExtendedData` 字段。 |
| MessageBody | Object | 否 | 当 `EditType` 包含 EM_MSG 或 EM_PAYLOAD 时，必填。<br/>此参数结构请参考 [MessageBody 说明](/zim-server/messaging/messagebody-introduction) 中文本消息、组合消息和自定义消息中 `Message`、`ExtendedData` 字段说明。 |
| AtListInfo | Object | 否 | 被提醒用户列表。当 `EditType` 包含 EM_AT 时，必填。<br/>此参数结构请参考 [AtListInfo 说明](#atlistinfo-结构)。 |
| IsAtAll | Bool | 否 | 是否全部用户都被提醒。当 `EditType` 包含 EM_AT_ALL 时，必填。 |
| SubMsgType | Number | 否 | 自定义消息的类型，由您定义，取值范围为 [0, 200]。当 `EditType` 包含 EM_SUBMSGTYPE 时，必填。 |

### AtListInfo 结构

| 参数 | 类型 | 描述 |
|------|------|------|
| AtList | Array of String | At列表，用户id，可以为空 |

## 请求示例

- 请求地址 URL：

    ```json
    https://zim-api.zego.im/?Action=EditGroupMsgBody
    &<公共请求参数>
    ```

- 请求消息体：

    ```json
    {
        "FromUserId": "editer",
        "SenderId": "sender",
        "ConvId": "conv_id_007",
        "MsgType": 200,
        "ConvMsgSeq": 110,
        "EditType": 31,
        "MessageBody": {
            "Message": "edit msg",
            "ExtendedData": "extend data"
        },
        "AtListInfo": {
            "AtList": [
                "userA",
                "userB"
            ]
        },
        "IsAtAll": false,
        "SubMsgType": 101
    }
    ```

## 响应参数

| 参数 | 类型 | 描述 |
|------|------|------|
| Code | Number | 返回码。 |
| Message | String | 操作结果描述。 |
| RequestId | String | 请求 ID。 |
| StateMsgSeq | Number | 消息状态 Seq。 |
| EditMsgSeq | Number | 消息编辑 Seq。 |
| LatestEditTime | Number | 最近一次消息编辑的 Unix 时间戳，单位为秒（s）。 |

## 响应示例

```json
{
    "Code": 0,
    "Message": "success",
    "RequestId": "343649807833778782",
    "StateMsgSeq": 1,
    "EditMsgSeq": 1,
    "LatestEditTime": "173436478"
}
```

## 返回码

以下仅列出了接口业务逻辑相关的返回码，完整返回码请参考 [全局返回码](/zim-server/return-codes)。

| 返回码 | 说明 | 处理建议 |
| --- | --- | --- |
| 660000002 | 输入参数错误。 | 请检查参数 | 
| 661000001 | 已超过可编辑时间。 | 如需编辑更早的历史消息，请联系 ZEGO 技术支持。 |
| 661000005 | 编辑失败。 | 请联系 ZEGO 技术支持。 |
