
# 移除群成员

- - -

## 描述

通过指定用户 ID 移除群内用户。

<Note title="说明">

- 群内用户 ID 可通过 [查询群成员列表](/zim-server/group/query-group-member-list) 获取。
- 如果被移除的用户为群主，则群列表第一位用户会自动成为新群主。
</Note>

成功移除用户后，全体群成员（包括群主自己、被移除的成员）会通过 ZIM SDK 回调接口收到群成员状态变更通知：

| iOS-25% | Android-25% | macOS-25% | Windows-25% |
|-----|---------|--------|---------|
| [groupMemberStateChanged](https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_ios~protocol~ZIMEventHandler#zim-group-member-state-changed-event-user-list-operated-info-group-id) | [onGroupMemberStateChanged](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIMEventHandler#on-group-member-state-changed) | [groupMemberStateChanged](https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_macos~protocol~ZIMEventHandler#zim-group-member-state-changed-event-user-list-operated-info-group-id) | [onGroupMemberStateChanged](https://doc-zh.zego.im/article/api?doc=zim_API~cpp_windows~class~ZIMEventHandler#on-group-member-state-changed) |

| Web-25% | 小程序-25% | Flutter-25% | React Native-25% |
|---------|-----|---------|---------|
| [groupMemberStateChanged](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_web~interface~ZIMEventHandler#group-member-state-changed) | [groupMemberStateChanged](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_wxxcx~interface~ZIMEventHandler#group-member-state-changed) | [onGroupMemberStateChanged](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMEventHandler/onGroupMemberStateChanged.html) | [groupMemberStateChanged](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_react-native~interface~ZIMEventHandler#group-member-state-changed) |

| Unity3D-25% | uni-app \| uni-app x-25% | HarmonyOS-25% |
|---------|---------|---------|
| [OnGroupMemberStateChanged](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~class~ZIMEventHandler#on-group-member-state-changed) | [groupMemberStateChanged](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_uni-app~interface~ZIMEventHandler#group-member-state-changed) | [groupMemberStateChanged](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_harmony~interface~ZIMEventHandler#group-member-state-changed) |


## 接口原型

- 请求方法：POST
- 请求地址：`https://zim-api.zego.im/?Action=KickoutGroupUser`
- 传输协议：HTTPS
- 调用频率限制：20 次/秒

## 请求参数

以下请求参数列表仅列出了接口请求参数和部分公共参数，完整公共参数列表请参考 [调用方式 - 公共请求参数](/zim-server/accessing-server-apis#2-公共参数)。

<Note title="说明">
以下 `FromUserId` 和 `UserId` 对应的用户已在客户端调用 `login` 方法登录 ZIM 服务，或开发者已调用 [服务端 API](/zim-server/user/batch-register-users) 注册相关的 userID。
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
<td>操作者的用户 ID。</td>
</tr>
<tr>
<td>GroupId</td>
<td>String</td>
<td>是</td>
<td>群组 ID。</td>
</tr>
<tr>
<td>UserId</td>
<td>Array of String</td>
<td>是</td>
<td><p>需要被移除的用户 ID 列表，最大支持 50 个用户 ID。</p><p> 示例："UserId": ["usera","userb"]。</p></td>
</tr>
<tr>
<td>CustomReason</td>
<td>String</td>
<td>否</td>
<td>移除原因，长度限制为 32 字节。</td>
</tr>
</tbody></table>

<Note title="说明">

FromUserId、GroupId、UserId[] 和 CustomReason 仅支持数字，英文字符和 {"'!'，'#'，'$'，'%'，'&'，'('，')'，'+'，''，':'，';'，'<'，'='，'.'，'>'，'?'，'@'，'['，']'，'^'，'_'，'{'，'}'，'|'，'~'"}。
</Note>


## 请求示例

- 请求地址 URL：

```json
https://zim-api.zego.im/?Action=KickoutGroupUser
&<公共请求参数>
```

- 请求消息体：

```json
{
  "FromUserId":"zego_user",
  "GroupId":"groupA",
  "CustomReason":"reason",
  "UserId":["userA"]
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
<Note title="说明">如果您发起请求同时移除多名用户时：<ul><li>如果成功移除 1 个或以上的用户，Code 都会返回 0。此时请参考 ErrorList 中的具体信息，确认操作结果。</li><li>如果所有用户都没被成功移除，Code 会返回相关返回码，具体请参考 <a href="!Server_APIs/Return_Codes" target="_blank">全局返回码</a>。</li></ul></Note></td>
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
<td>Array of String</td>
<td>
失败列表。
<ul><li>
Code 为 0：
<ul><li>ErrorList 为空，全部指定用户移除成功。</li><li>ErrorList 不为空，表示部分指定用户移除失败，请参考 SubCode 处理。</li></ul>
</li>
<li>
Code 不为 0：
<ul><li>ErrorList 为空，表示参数错误、接口频率限制、系统错误。</li><li>ErrorList 不为空，表示全部指定用户移除失败。</li></ul>
</li>
</ul></td>
</tr>
<tr data-row-level="5-1">
<td>└UserId</td>
<td>String</td>
<td>移除失败的用户 ID。</td>
</tr>
<tr data-row-level="5-2">
<td>└SubCode</td>
<td>Number</td>
<td>移除失败的错误码。</td>
</tr>
</tbody></table>


## 响应示例

```json
{
  "Code":0,
  "Message":"success",
  "RequestId":"343649807833778782",
  "ErrorList": [
    {
        "UserId":"u2",
        "SubCode":660000012
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
<td>660000002</td>
<td>参数错误。</td>
<td>请参考 <a href="#3">请求参数</a> 输入正确参数。</td>
</tr>
<tr>
<td>660000011</td>
<td>需要被移除的用户数量超过限制。</td>
<td>数量应不超过 50。</td>
</tr>
<tr>
<td>660600001</td>
<td>群不存在。</td>
<td>请确认 GroupId 是否正确。</td>
</tr>
<tr>
<td>660600005</td>
<td>调用 KickoutGroupUser 接口的频率超出限制。</td>
<td>调用频率为 20 次/秒，请勿超出限制。</td>
</tr>
<tr>
<td>660600008</td>
<td>需要被移除的用户不在群内。</td>
<td>用户已退出群，无需处理。</td>
</tr>
<tr>
<td>660600009</td>
<td>获取群相关信息失败，该群组可能不存在。</td>
<td>请先确认 GroupID 是否正确。如果正确，请联系 ZEGO 技术支持。</td>
</tr>
</tbody></table>
