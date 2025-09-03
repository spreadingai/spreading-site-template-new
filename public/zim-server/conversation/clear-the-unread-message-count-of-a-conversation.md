
# 清除单个会话消息未读数

---

## 描述

本接口可为指定用户清除指定会话的消息未读数。

<Note title="说明">本接口默认仅适用于用户最新的 1000 个会话。如需适用于更多会话，请联系 ZEGO 技术支持。</Note>

客户端将通过 ZIM SDK 的回调接口，接收会话的未读数变化。

| iOS-25% | Android-25% | macOS-25% | Windows-25% |
| ----- | ------- | ----- | ------- |
| [conversationChanged](https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_ios~protocol~ZIMEventHandler#zim-group-member-info-updated-operated-info-group-id) | [onConversationChanged](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIMEventHandler#on-conversation-changed) | [conversationChanged](https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_macos~protocol~ZIMEventHandler#zim-group-member-info-updated-operated-info-group-id) | [onConversationChanged](https://doc-zh.zego.im/article/api?doc=zim_API~cpp_windows~class~ZIMEventHandler#on-conversation-changed) |

| Web-25% | 小程序-25% | Flutter-25% | React Native-25% |
| ----- | ------ | ------- | ------------ |
| [conversationChanged](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_web~interface~ZIMEventHandler#conversation-changed) | [conversationChanged](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_wxxcx~interface~ZIMEventHandler#conversation-changed) | [onConversationChanged](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMEventHandler/onConversationChanged.html) | [conversationChanged](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_react-native~interface~ZIMEventHandler#conversation-changed) |

| Unity3D-25% | uni-app \| uni-app x-25% | HarmonyOS-25% |  
| ----- | ------- | --------- | 
| [OnConversationChanged](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~class~ZIMEventHandler#on-conversation-changed) | [conversationChanged](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_uni-app~interface~ZIMEventHandler#group-application-updated) | [conversationChanged](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_harmony~interface~ZIMEventHandler#conversation-changed) |  

## 接口原型

- 请求方法：GET
- 请求地址：`https://zim-api.zego.im/?Action=ClearConversationUnread`
- 传输协议：HTTPS
- 调用频率限制：20次/秒。

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
<td>目标用户 ID（已注册）。本接口为该用户清除一个会话的消息未读数。</td>
</tr>
<tr>
<td>ConvId</td>
<td>String</td>
<td>是</td>
<td>目标会话 ID。<ul><li>单聊会话：会话 ID 为用户 ID。</li><li>群聊会话：会话 ID 为群组 ID。</li></ul></td>
</tr>
<tr>
<td>ConvType</td>
<td>Number</td>
<td>是</td>
<td>会话类型：<ul><li>0：单聊。</li><li>2：群聊。</li></ul></td>
</tr>
</tbody></table>


<Note title="说明">

FromUserId 仅支持数字，英文字符和 {"'!'，'#'，'$'，'%'，'&'，'('，')'，'+'，''，':'，';'，'<'，'='，'.'，'>'，'?'，'@'，'['，']'，'^'，'_'，' '，'{'，'}'，'|'，'~'"}。
</Note>

## 请求示例

```json
https://zim-api.zego.im/?Action=ClearConversationUnread
&FromUserId=user1
&ConvId=user2
&ConvType=0
&<公共请求参数>
```

## 响应参数

<table>
  <colgroup>
    <col />
    <col />
    <col />
  </colgroup>
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
<td>660800002</td>
<td>会话不存在，或者该会话不适用此接口（不属于最新的 1000 个会话）。</td>
<td>请确认会话 ID 是否正确。</td>
</tr>
</tbody></table>
