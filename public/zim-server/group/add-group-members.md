
# 添加群成员

- - -

## 描述

通过该接口向指定的群中批量添加新成员。单次最多加入 100 人，如需调整，请联系 ZEGO 技术支持。

添加成功后，全体群成员（包括被添加的用户）通过以下 ZIM SDK 的回调接口，收到相关通知：

| iOS-25% | Android-25% | macOS-25% |Windows-25% |
|-----|---------|--------|---------|
| [groupMemberStateChanged](https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_ios~protocol~ZIMEventHandler#zim-group-member-state-changed-event-user-list-operated-info-group-id) | [onGroupMemberStateChanged](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIMEventHandler#on-group-member-state-changed) | [groupMemberStateChanged](https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_macos~protocol~ZIMEventHandler#zim-group-member-state-changed-event-user-list-operated-info-group-id)| [onGroupMemberStateChanged](https://doc-zh.zego.im/article/api?doc=zim_API~cpp_windows~class~ZIMEventHandler#on-group-member-state-changed)  |

|  Web-25% | 小程序-25% |Flutter-25% |React Native-25% |
|---------|-----|---------|---------|
| [groupMemberStateChanged](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_web~interface~ZIMEventHandler#group-member-state-changed) | [groupMemberStateChanged](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_wxxcx~interface~ZIMEventHandler#group-member-state-changed) | [onGroupMemberStateChanged](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMEventHandler/onGroupMemberStateChanged.html)| [groupMemberStateChanged](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_react-native~interface~ZIMEventHandler#group-member-state-changed) |

|  Unity3D-25% | uni-app \| uni-app x-25% | HarmonyOS-25% | 
|---------|---------|---------|
| [OnGroupMemberStateChanged](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~class~ZIMEventHandler#on-group-member-state-changed) | [groupMemberStateChanged](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_uni-app~interface~ZIMEventHandler#group-member-state-changed) | [groupMemberStateChanged](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_harmony~interface~ZIMEventHandler#group-member-state-changed) | 



## 接口原型
- 请求方法：POST
- 请求地址：`https://zim-api.zego.im/?Action=InviteUsersIntoGroup`
- 传输协议：HTTPS
- 调用频率限制：1 次/秒，群级别限制。如需调整，请联系 ZEGO 技术支持。

## 请求参数

以下请求参数列表仅列出了接口请求参数和部分公共参数，完整公共参数列表请参考 [调用方式 - 公共请求参数](/zim-server/accessing-server-apis#2-公共参数)。

<Note title="说明">
以下 `FromUserId` 和 `UserIds` 对应的用户已在客户端调用 `login` 方法登录 ZIM 服务，或开发者已调用 [服务端 API](/zim-server/user/batch-register-users) 注册相关的 userID。
</Note>

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
<td>操作者用户 ID。用户需已注册 ZIM 服务。</td>
</tr>
<tr data-row-level="3">
<td>GroupId</td>
<td>String</td>
<td>是</td>
<td>群 ID。</td>
</tr>
<tr data-row-level="4">
<td>UserIds</td>
<td>Array of String</td>
<td>是</td>
<td>
加入群的用户 ID 列表，默认最大支持 100 个用户 ID。
<Note title="说明">

- 若数组包含与 `FromUserId` 一样的值，该值会被剔除。
- 此参数与 `GroupMemberInfos` 作用相同，二者选其一即可。
- 此参数仅在 `GroupMemberInfos` 长度为 0 时有效。
</Note>
</td>
</tr>
<tr data-row-level="5" data-row-child="true">
<td>GroupMemberInfos</td>
<td>Array of Object</td>
<td>是</td>
<td>
加入群的用户信息列表，默认最大支持 100 个用户信息。
<Note title="说明"><p>此参数与 `GroupMemberInfos` 作用相同，二者选其一即可。</p></Note>
</td>
</tr>
<tr data-row-level="5-1">
<td>└UserId</td>
<td>String</td>
<td>是</td>
<td>
加入群组的用户 ID。
<Note title="说明"><p>若此参数与 `FromUserId` 相同，则会被剔除。</p></Note>
</td>
</tr>
<tr data-row-level="5-2">
<td>└EnterGroupTime</td>
<td>Number</td>
<td>否</td>
<td>
进群时间戳（毫秒级别）。
- 0 或不传：使用当前时间戳。
- 其他：不可以大于当前时间。
</td>
</tr>
<tr data-row-level="5-3">
<td>└IsInvite</td>
<td>Number</td>
<td>否</td>
<td>
用户的入群模式。
- 0：（默认）邀请用户即可直接将对方拉入群组，无需对方同意。
- 1：用户收到邀请后，需要同意才能入群。
</td>
</tr>
</tbody></table>

<Note title="说明">

FromUserId、GroupId 和 UserIds 仅支持数字，英文字符和 {"'!'，'#'，'$'，'%'，'&'，'('，')'，'+'，''，':'，';'，'<'，'='，'.'，'>'，'?'，'@'，'['，']'，'^'，'_'，'{'，'}'，'|'，'~'"}。
</Note>

## 请求示例

- 请求地址

```json
https://zim-api.zego.im/?Action=InviteUsersIntoGroup
&<公共请求参数>
```

- 请求消息体

```json
{
    "FromUserId": "zego_user",
    "GroupId": "groupA",
    "GroupMemberInfos": [
        {
            "UserId": "user_a",
            "EnterGroupTime": 123
        },
        {
            "UserId": "user_b",
            "EnterGroupTime": 0
        }
    ]
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
<td>返回码。</td>
</tr>
<tr data-row-level="3">
<td>Message</td>
<td>String</td>
<td>操作结果描述。</td>
</tr>
<tr data-row-level="4">
<td>RequestId</td>
<td>String</td>
<td>请求 ID。</td>
</tr>
<tr data-row-level="5" data-row-child="true">
<td>ErrorUsers</td>
<td>Array of Object</td>
<td>
失败列表。
<ul><li>
Code 为 0：
<ul><li>ErrorUsers 为空，全部指定用户邀请成功。</li><li>ErrorUsers 不为空，表示部分指定用户邀请失败，请参考 SubCode 处理。</li></ul>
</li>
<li>
Code 不为 0：
<ul><li>ErrorUsers 为空，表示参数错误、接口频率限制、系统错误。</li><li>ErrorUsers 不为空，表示全部指定用户邀请失败。</li></ul>
</li>
</ul></td>
</tr>
<tr data-row-level="5-1">
<td>└UserId</td>
<td>String</td>
<td>邀请失败的用户 ID。</td>
</tr>
<tr data-row-level="5-2">
<td>└SubCode</td>
<td>Number</td>
<td>邀请失败返回码。</td>
</tr>
</tbody></table>

## 响应示例

```json
{
    "Code": 0,
    "Message": "success",
    "RequestId": "343649807833778782",
    "ErrorUsers": [
        {
            "UserId": "usera",
            "SubCode": 660000002
        }
    ]
}
```

## 返回码

以下仅列出了接口业务逻辑相关的返回码，完整返回码请参考 [全局返回码](/zim-server/return-codes)。

<table>
<tbody><tr>
<th>返回码</th>
<th>说明</th>
<th>处理建议</th>
</tr>
<tr>
<td>660000002</td>
<td>输入参数错误。</td>
<td>请检查输入参数。</td>
</tr>
<tr>
<td>660300006</td>
<td>频率限制</td>
<td>请稍后再试，或了解相关频率限制。</td>
</tr>
<tr>
<td>660500002</td>
<td>操作者用户未注册。</td>
<td>请让操作者先注册 ZIM 服务。</td>
</tr>
<tr>
<td>660600001</td>
<td>群组不存在。</td>
<td>请确认输入的 GroupID 是否正确。</td>
</tr>
<tr>
<td>660000011</td>
<td>用户个数超过限制。</td>
<td>请检查输入的用户列表。</td>
</tr>
</tbody></table>
