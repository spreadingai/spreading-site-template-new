# 导入群聊消息

- - -

## 描述

如果您正使用其他即时通讯服务并希望接入 ZIM，可调用此接口，向 ZIM 导入群组的历史消息（按时间顺序）。

## 接口原型

- 请求方法：POST
- 请求地址：`https://zim-api.zego.im/?Action=ImportGroupMsg`
- 传输协议：HTTPS
- 调用频率限制：20 次/秒

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
<td>消息发送者的用户 ID（已在客户端调用 `login` 方法登录 ZIM 服务，或已调用 [服务端 API](/zim-server/user/batch-register-users) 完成注册）。</td>
</tr>
<tr>
<td>GroupId</td>
<td>String</td>
<td>是</td>
<td>群组 ID。</td>
</tr>
<tr>
<td>MessageType</td>
<td>Number</td>
<td>是</td>
<td>消息类型，群聊会话的适用类型请参考 [MessageBody 说明](/zim-server/messaging/messagebody-introduction)。<Warning title="注意">不支持信令消息。</Warning></td>
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
<td>消息内容，具体参数格式请参考 [MessageBody 说明](/zim-server/messaging/messagebody-introduction)。<Warning title="注意">不支持 `OfflinePush` 和 `HasReceipt` 字段。</Warning></td>
</tr>
<tr>
<td>SubMsgType</td>
<td>Number</td>
<td>否（但当 MessageType 为自定义消息时，必选）</td>
<td>具体的自定义类型。值由您定义，取值范围为 [0,200]。</td>
</tr>
<tr>
<td>SearchedContent</td>
<td>String</td>
<td>否</td>
<td>自定义消息的检索字段。当 MessageType 为自定义消息时，才可填写此字段，长度上限默认为 64 字节。此字段作用于客户端，除非填写了此字段，否则无法通过客户端搜索到关联的自定义消息。</td>
</tr>
<tr>
<td>SendMessageTime</td>
<td>Number</td>
<td>否</td>
<td>
消息发送时间戳（Unix，毫秒级别）。请按照发送时间从前到后的顺序进行导入。
- 传 0 或不传：取“当前时间”。
- 其他值：最早可取“当前时间 - 套餐包规定的历史消息保存天数（详情请参考 [计费说明 - 版本差异](/zim-server/introduction/pricing#版本差异)）* 86400000”，最晚不得晚于“当前时间”。

不能早于套餐包规定的历史消息保存天数（详情请参考 [计费说明 - 版本差异](/zim-server/introduction/pricing#版本差异)），也不能晚于当前时间。
</td>
</tr>
</tbody></table>

<Note title="说明">

FromUserId、GroupId 仅支持数字，英文字符和 {"'!'，'#'，'$'，'%'，'&'，'('，')'，'+'，'-'，':'，';'，'<'，'='，'.'，'>'，'?'，'@'，'['，']'，'^'，'_'，' '，'{'，'}'，'|'，'~'"}。
</Note>

<Note title="说明">

- 为了给开发者带来更好的体验，ZEGO 推荐开发者使用最新版本的 SDK。
- 如果发送方请求发送 MessageType 为 1 的文本消息，则发送方对应的客户端（SDK 版本需为 2.7.0 或以上）也会收到该消息。
- 对于发送和接收 MessageType 为 200 的自定义消息，发送方和接收放对应的客户端的 SDK 版本需为 2.8.0 或以上。
- 如果接收端的 SDK 版本介乎 [2.0.0, 2.8.0) 区间，可以收到自定义消息时，但会显示此消息类型为未知，且无法获取信息内容。如需获取此条消息，请将 SDK 升级为 2.8.0 或以上版本。
- 如果接收端的 SDK 版本为 1.x.x 版本，则无法收到自定义消息，也不会收到未知消息。
</Note>


## 请求示例

- 请求地址 URL：

```json
https://zim-api.zego.im/?Action=ImportGroupMsg
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
        "Message": "hello world",
        "ExtendedData": "d"
    },
    "SubMsgType": 200,
    "SearchedContent": "ex",
    "SendMessageTime": 123
}
```

## 响应参数

<table>
<tbody><tr>
<th>参数</th>
<th>类型</th>
<th>描述</th>
</tr>
<tr>
<td>Code</td>
<td>Number</td>
<td>返回码。</td>
</tr>
<tr>
<td>Message</td>
<td>String</td>
<td>请求结果的说明信息。</td>
</tr>
<tr>
<td>RequestId</td>
<td>String</td>
<td>请求 ID。</td>
</tr>
<tr>
<td>MsgSeq</td>
<td>Number</td>
<td>消息 seq。</td>
</tr>
</tbody></table>


## 响应示例

```json
{
    "Code": 0,
    "Message": "success",
    "RequestId": "343649807833778782",
    "MsgSeq": 123
}
```

## 验证效果

成功导入消息后，可调用 ZIM 服务端接口 [查询群聊会话消息列表](/zim-server/conversation/query-the-message-list-of-group-chats)，确认群聊会话消息是否导入完整。


## 返回码

以下仅列出了接口业务逻辑相关的返回码，完整返回码请参考 [全局返回码](/zim-server/return-codes)。

<table>
<tbody><tr>
<th>返回码</th>
<th>说明</th>
<th>处理建议</th>
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
