
# 置顶会话

- - -

## 描述

调用此接口，可为用户批量置顶或取消置顶至多 20 个会话。如需上调，请联系 ZEGO 技术支持。

客户端将通过 ZIM SDK 的回调接口，接收会话的置顶状态变化。

| iOS-25% | Android-25% | macOS-25% | Windows-25% |
|-----|---------|-------|---------|
| [conversationChanged](https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_ios~protocol~ZIMEventHandler#zim-group-member-info-updated-operated-info-group-id) | [onConversationChanged](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIMEventHandler#on-conversation-changed) | [conversationChanged](https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_macos~protocol~ZIMEventHandler#zim-group-member-info-updated-operated-info-group-id) | [onConversationChanged](https://doc-zh.zego.im/article/api?doc=zim_API~cpp_windows~class~ZIMEventHandler#on-conversation-changed) |

| Web-25% | 小程序-25% | Flutter-25% | React Native-25% |
|-----|---------|-------|---------|
|[conversationChanged](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_web~interface~ZIMEventHandler#conversation-changed) |[conversationChanged](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_wxxcx~interface~ZIMEventHandler#conversation-changed) | [onConversationChanged](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMEventHandler/onConversationChanged.html) | [conversationChanged](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_react-native~interface~ZIMEventHandler#conversation-changed) | 

| Unity3D-25% |  uni-app \| uni-app x-25% |HarmonyOS-25% |  
|-----|---------|-------|
| [OnConversationChanged](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~class~ZIMEventHandler#on-conversation-changed) |[conversationChanged](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_uni-app~interface~ZIMEventHandler#conversation-changed) | [conversationChanged](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_harmony~interface~ZIMEventHandler#conversation-changed) |  


## 接口原型

- 请求方法：POST
- 请求地址：`https://zim-api.zego.im/?Action=ConvPinned`
- 传输协议：HTTPS
- 调用频率限制：20次/秒。

## 请求参数

以下请求参数列表仅列出了接口请求参数和部分公共参数，完整公共参数列表请参考 [调用方式 - 公共请求参数](/zim-server/accessing-server-apis#2-公共参数)。

<table class="collapsible-table" >
<tbody><tr data-row-level="1">
<th>参数</th>
<th>类型</th>
<th>是否必选</th>
<th>描述</th>
</tr>
<tr data-row-level="2">
<td>FromUserId</td>
<td>String</td>
<td>是</td>
<td>为此 UserID（已在客户端调用 `login` 方法登录 ZIM 服务，或已调用 [服务端 API](/zim-server/user/batch-register-users) 完成注册）设置会话的置顶状态。</td>
</tr>
<tr data-row-level="3" data-row-child="true">
<td>ConvList</td>
<td>Arrar of Object</td>
<td>是</td>
<td>会话列表，默认长度限制20。</td>
</tr>
<tr data-row-level="3-1">
<td>└ConvId</td>
<td>String</td>
<td>是</td>
<td>会话 ID。
<ul><li>单聊时，conversationID 即是对端用户的 userID（已在客户端调用 `login` 方法登录 ZIM 服务，或已调用 [服务端 API](/zim-server/user/batch-register-users) 完成注册）。</li><li>群聊时，conversationID 即是群组的 groupID。</li></ul></td>
</tr>
<tr data-row-level="3-2">
<td>└ConvType</td>
<td>Number</td>
<td>是</td>
<td>会话类型：<ul><li>0：单聊会话。</li><li>2：群聊会话。</li></ul></td>
</tr>
<tr data-row-level="4">
<td>PinnedType</td>
<td>Number</td>
<td>是</td>
<td>置顶操作：<ul><li>0：取消置顶。</li><li>1：设置置顶。</li></ul></td>
</tr>
</tbody></table>

<Note title="说明">

FromUserId 仅支持数字，英文字符和 {"'!'，'#'，'$'，'%'，'&'，'('，')'，'+'，'-'，':'，';'，'<'，'='，'.'，'>'，'?'，'@'，'['，']'，'^'，'_'，' '，'{'，'}'，'|'，'~'"}。
</Note>

## 请求示例

- 请求地址 URL：

```json
https://zim-api.zego.im/?Action=ConvPinned
&<公共请求参数>
```

- 请求消息体：

```json
{
    "FromUserId": "user0",
    "ConvList": [
        {
            "ConvId": "user1",
            "ConvType": 0
        },
        {
            "ConvId": "user2",
            "ConvType": 0
        }
    ],
    "PinnedType": 1
}
```


## 响应参数

<table class="collapsible-table" >

<tbody><tr data-row-level="1">
<th>参数</th>
<th>类型</th>
<th>描述</th>
</tr>
<tr data-row-level="2">
<td>Code</td>
<td>Number</td>
<td>返回码。
<Note title="说明">当您发起请求修改多个会话的置顶状态时：<ul><li>只需成功修改 1 个或以上会话的状态，Code 都会返回 0，表示成功。此时请参考 ErrorList 中的具体信息，了解会话修改状态失败详情。</li><li>如果所有会话的状态都修改失败，Code 会返回相关返回码，具体请参考 <a href="/zim-server/return-codes">全局返回码</a>。</li></ul></Note></td>
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
<tr data-row-level="5" data-row-child="true">
<td>ErrorList</td>
<td>Array of&nbsp;Object</td>
<td>
失败列表。
<ul>
<li>Code 为 0：
<ul><li>ErrorList 为空，全部会话的置顶状态修改成功。</li><li>ErrorList 不为空，表示部分会话的置顶状态修改失败。请参考 SubCode、SubMessage 处理。</li></ul></li>
<li>Code 不为 0：
<ul><li>ErrorList 为空，表示参数错误、接口频率限制、系统错误。</li><li>ErrorList 不为空，表示全部会话置顶状态都修改失败。</li></ul></li>
</ul></td>
</tr>
<tr data-row-level="5-1">
<td>└ConvId</td>
<td>String</td>
<td>置顶状态修改失败的会话 ID。</td>
</tr>
<tr data-row-level="5-2">
<td>└ConvType</td>
<td>Number</td>
<td>会话类型。</td>
</tr>
<tr data-row-level="5-3">
<td>└SubCode</td>
<td>Number</td>
<td>置顶状态修改失败的具体错误码。</td>
</tr>
<tr data-row-level="5-4">
<td>└SubMessage</td>
<td>String</td>
<td>具体错误描述。</td>
</tr>
</tbody></table>


## 响应示例

```json
{
    "Code": 0,
    "Message": "success",
    "RequestId": "343649807833778782",
    "ErrorList": [
        {
            "ConvId": "user1",
            "ConvType": 0,
            "SubCode": 660000002,
            "SubMessage": "input params error"
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
<td>660000001</td>
<td>业务类通用错误。</td>
<td>请重试，或联系 ZEGO 技术支持。</td>
</tr>
<tr>
<td>660000002</td>
<td>输入参数错误。</td>
<td>请检查输入的参数。</td>
</tr>
<tr>
<td>660300005</td>
<td>调用接口的频率超出了 AppID 级别限制。</td>
<td>请稍后再试。</td>
</tr>
<tr>
<td>660500002</td>
<td>`FromUserId` 未注册。</td>
<td>请先注册 `FromUserId`。</td>
</tr>
<tr>
<td>660800001</td>
<td>置顶单聊会话时，操作目标会话 `ConvID` 对应的用户未注册。</td>
<td>
请确认该 `ConvId` 对应的用户是否已注册：
- 确认已注册，请联系 ZEGO 技术支持排查。
- 确认未注册，请注册此用户。
</td>
</tr>
<tr>
<td>660800048</td>
<td>置顶列表长度超过限制（100，不可配置）。</td>
<td>无需处理。</td>
</tr>
</tbody></table>