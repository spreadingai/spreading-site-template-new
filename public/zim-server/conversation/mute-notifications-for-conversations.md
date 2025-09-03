
# 设置会话消息免打扰

- - -

## 描述

调用过此接口，可批量设置单聊或群聊会话的消息免打扰状态。设置为免打扰后，ZIM SDK 将不会向用户推送相关会话的消息通知，同时用户的“消息未读总数”也不会增加。

用户默认最多可对 500 个单聊会话设置为免打扰。如需上调，请联系 ZEGO 技术支持，最多可为 1000。

群聊会话的免打扰上限是各用户加入群组的数量上限。

客户端将通过 ZIM SDK 的回调接口，接收会话的消息免打扰状态变化。

| iOS-25% | Android-25% | macOS-25% | Windows-25% |
|-----|---------|-------|---------|
| [conversationChanged](https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_ios~protocol~ZIMEventHandler#zim-group-member-info-updated-operated-info-group-id) | [onConversationChanged](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIMEventHandler#on-conversation-changed) | [conversationChanged](https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_macos~protocol~ZIMEventHandler#zim-group-member-info-updated-operated-info-group-id) | [onConversationChanged](https://doc-zh.zego.im/article/api?doc=zim_API~cpp_windows~class~ZIMEventHandler#on-conversation-changed) |

| Web-25% | 小程序-25% | Flutter-25% | React Native-25% |
|-----|--------|---------|--------------|
| [conversationChanged](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_web~interface~ZIMEventHandler#conversation-changed) | [conversationChanged](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_wxxcx~interface~ZIMEventHandler#conversation-changed) | [onConversationChanged](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMEventHandler/onConversationChanged.html) | [conversationChanged](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_react-native~interface~ZIMEventHandler#conversation-changed) |

| Unity3D-25% | uni-app \| uni-app x-25% | HarmonyOS-25%  |
|---------|---------|---------|
| [OnConversationChanged](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~class~ZIMEventHandler#on-conversation-changed) | [conversationChanged](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_uni-app~interface~ZIMEventHandler#conversation-changed) | [conversationChanged](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_harmony~interface~ZIMEventHandler#conversation-changed) |


## 接口原型

- 请求方法：POST
- 请求地址：`https://zim-api.zego.im/?Action=SilenceConvNotification`
- 传输协议：HTTPS
- 调用频率限制：20次/秒。

## 请求参数

以下请求参数列表仅列出了接口请求参数和部分公共参数，完整公共参数列表请参考 [调用方式 - 公共请求参数](/zim-server/accessing-server-apis#2-公共参数)。

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
<td>请求设置该 UserID（已在客户端调用 `login` 方法登录 ZIM 服务，或已调用 [服务端 API](/zim-server/user/batch-register-users) 完成注册）的会话消息免打扰状态。</td>
</tr>
<tr>
<td>ConvType</td>
<td>Number</td>
<td>是</td>
<td>会话类型：
<ul><li>0：单聊会话。</li><li>2：群聊会话。</li></ul></td>
</tr>
<tr>
<td>ConvIds</td>
<td>Array of String</td>
<td>是</td>
<td>
待设置免打扰状态的会话 ID 列表，长度不超过 10。<ul><li>单聊会话：会话 ID 为用户 ID。</li><li>群聊会话：会话 ID 为群组 ID。</li></ul>
<Warning title="注意">

<p>此列表中的会话类型需保持一致，否则会导致接口调用失败。</p>
</Warning>
</td>
</tr>
<tr>
<td>Enable</td>
<td>Boolean</td>
<td>是</td>
<td>是否免打扰：
<ul><li>true：开启免打扰。</li><li>false：取消免打扰。</li></ul></td>
</tr>
</tbody></table>

<Note title="说明">

FromUserId 仅支持数字，英文字符和 {"'!'，'#'，'$'，'%'，'&'，'('，')'，'+'，'-'，':'，';'，'<'，'='，'.'，'>'，'?'，'@'，'['，']'，'^'，'_'，' '，'{'，'}'，'|'，'~'"}。
</Note>

## 请求示例

- 请求地址 URL：

```json
https://zim-api.zego.im/?Action=SilenceConvNotification
&<公共请求参数>
```

- 请求消息体：

```json
{
    "FromUserId": "userA",
    "ConvIds": [
        "ConvId1",
        "ConvId2",
    ],
    "ConvType": 0,
    "Enable": true
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
<Note title="说明">当您发起请求修改多个会话的免打扰状态时：<ul><li>只需成功修改 1 个或以上会话的状态，Code 都会返回 0，表示成功。此时请参考 ErrorList 中的具体信息，了解会话修改状态失败详情。</li><li>如果所有会话的状态都修改失败，Code 会返回相关返回码，具体请参考 <a href="/zim-server/return-codes">全局返回码</a>。</li></ul></Note></td>
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
<ul><li>ErrorList 为空，全部会话的免打扰状态修改成功。</li><li>ErrorList 不为空，表示部分会话的免打扰状态修改失败。请参考 SubCode、SubMessage 处理。</li></ul></li>
<li>Code 不为 0：
<ul><li>ErrorList 为空，表示参数错误、接口频率限制、系统错误。</li><li>ErrorList 不为空，表示全部会话免打扰状态都修改失败。</li></ul></li>
</ul></td>
</tr>
<tr data-row-level="5-1">
<td>└ConvId</td>
<td>String</td>
<td>免打扰状态修改失败的会话 ID。<ul><li>单聊会话：会话 ID 为用户 ID。</li><li>群聊会话：会话 ID 为群组 ID。</li></ul></td>
</tr>
<tr data-row-level="5-2">
<td>└SubCode</td>
<td>Number</td>
<td>免打扰状态修改失败的具体错误码。</td>
</tr>
<tr data-row-level="5-3">
<td>└SubMessage</td>
<td>String</td>
<td>免打扰状态修改失败的具体错误描述。</td>
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
            "ConvId": "ConvId1",
            "SubCode": 660800030,
            "SubMessage": "input params error"
        }
    ]
}
```


## 返回码

以下仅列出了接口业务逻辑相关的返回码，完整返回码请参考 [全局返回码\|_balnk](/zim-server/return-codes)。

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
<td>FromUserId 未注册。</td>
<td>请先注册 FromUserId。</td>
</tr>
<tr>
<td>660600001</td>
<td>群组不存在。</td>
<td>请确认输入的 GroupId 是否正确。</td>
</tr>
<tr>
<td>660600009</td>
<td>获取群相关信息失败。</td>
<td>请先确认 GroupID 是否正确。如果正确，请联系 ZEGO 技术支持。</td>
</tr>
<tr>
<td>660600024</td>
<td>FromUserId 不在目标群组中。</td>
<td>请先加入该群组。</td>
</tr>
<tr>
<td>660700015</td>
<td>
<ul><li>如果此错误码是 code，表示所有单聊会话的对端用户都未注册。</li>
<li>如果此错误码是 subCode，表示 ConvID 对应的单聊会话对端用户未注册。</li></ul>
</td>
<td>请先注册对端用户。</td>
</tr>
<tr>
<td>660800030</td>
<td>用户的免打扰列表超过长度限制，默认 500，可联系技术支持配置，最大可为 1000。</td>
<td>请联系 ZEGO 技术支持。</td>
</tr>
<tr>
<td>660800051</td>
<td>会话已为免打扰，无法再次设置为免打扰。</td>
<td>无需处理。</td>
</tr>
<tr>
<td>660800052</td>
<td>会话已被取消免打扰，无法再次取消。</td>
<td>无需处理</td>
</tr>
</tbody></table>
