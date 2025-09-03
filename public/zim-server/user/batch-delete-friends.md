
# 批量删除好友

- - -

## 描述

调用此接口，可为用户批量单向或双向删除至多 20 名好友。如需上调（最多可为 50），请联系 ZEGO 技术支持。

以用户 A、B 举例说明单向删除和双向删除：
- 单向删除：当用户 A 单向删除了用户 B，用户 B 不再是用户 A 的好友、用户 A 仍为用户 B 的好友。
- 双向删除：当用户 A 双向删除了用户 B，彼此都不再是对方的好友。


为用户删除好友成功后，相关用户的客户端将通过以下 ZIM SDK 的回调接口接收好友列表更新的通知：

| iOS-25% | Android-25% | macOS-25% | Windows-25% |
|-----|---------|--------|---------|
| [friendListChanged](https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_ios~protocol~ZIMEventHandler#zim-friend-list-changed-friend-info-list) | [onFriendListChanged](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIMEventHandler#on-friend-list-changed) | [friendListChanged](https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_macos~protocol~ZIMEventHandler#zim-friend-list-changed-friend-info-list) | [onFriendListChanged](https://doc-zh.zego.im/article/api?doc=zim_API~cpp_windows~class~ZIMEventHandler#on-friend-list-changed) |

| Web-25% | 小程序-25% | Flutter-25% | React Native-25% |
|-----|---------|---------|---------|
| [friendListChanged](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_web~interface~ZIMEventHandler#friend-list-changed) | [friendListChanged](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_wxxcx~interface~ZIMEventHandler#friend-list-changed) | [onFriendListChanged](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMEventHandler/onFriendListChanged.html) | [friendListChanged](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_uni-app~interface~ZIMEventHandler#friend-list-changed) |

| uni-app \| uni-app x-25% | HarmonyOS-25% |
|---------|---------|
| [friendListChanged](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_uni-app~interface~ZIMEventHandler#friend-list-changed) | [friendListChanged](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_harmony~interface~ZIMEventHandler#friend-list-changed) |



## 接口原型

- 请求方法：POST
- 请求地址：`https://zim-api.zego.im/?Action=DeleteFriends`
- 传输协议：HTTPS
- 调用频率限制：20 次/秒。


## 请求参数

以下请求参数列表仅列出了接口请求参数和部分公共参数，完整公共参数列表请参考 [调用方式 - 公共请求参数](/zim-server/accessing-server-apis#2-公共参数)。

<Note title="说明">

以下 `FromUserId` 和 `UserIds` 对应的用户已在客户端调用 `login` 方法登录 ZIM 服务，或已调用 [服务端 API](/zim-server/user/batch-register-users) 完成注册。
</Note>

<table>
<tbody><tr data-row-level="1">
<th>参数</th>
<th>类型</th>
<th>是否必选</th>
<th>描述</th>
</tr>
<tr data-row-level="3">
<td>FromUserId</td>
<td>String</td>
<td>是</td>
<td>为此 UserId 删除好友。</td>
</tr>
<tr data-row-level="4">
<td>UserIds</td>
<td>Array of String</td>
<td>是</td>
<td>删除目标好友列表。默认数量上限为 20。</td>
</tr>
<tr data-row-level="5">
<td>DeleteType</td>
<td>Number</td>
<td>是</td>
<td>删除类型：
<ul><li>0：双向删除。</li><li>1：单向删除。</li></ul></td>
</tr>
</tbody></table>

<Note title="说明">

FromUserId 和 UserId 仅支持数字，英文字符和{" '!', '#', '$', '%', '&', '(', ')', '+', '-', ':', ';', '<', '=', '.', '>', '?', '@', '[', ']', '^', '_', '{', '}', '|', '~'"}。
</Note>

## 请求示例

- 请求地址 URL：

```json
https://zim-api.zego.im/?Action=DeleteFriends
&<公共请求参数>
```

- 请求消息体：

```json
{
    "FromUserId": "zego_user",
    "UserIds": [
        "user_id1",
        "user_id2"
    ],
    "DeleteType": 1
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
<Note title="说明">当您发起请求同时删除多名好友时：<ul><li>如果成功删除 1 名或更多好友，Code 都会返回 0。此时请参考 ErrorList 中的具体信息，确认操作结果。</li><li>如果全部目标好友删除失败，Code 会返回相关返回码，具体请参考[全局返回码](/zim-server/return-codes)。</li></ul></Note></td>
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
<td>Array of Object</td>
<td>
失败信息列表。
<ul>
<li>
Code 为 0：
<ul><li>ErrorList 为空，成功删除全部目标好友。</li><li>ErrorList 不为空，表示删除部分好友失败，请参考 SubCode 处理。</li></ul>
</li>
<li>
Code 不为 0：
<ul><li>ErrorList 为空，表示参数错误、接口频率限制、系统错误。</li><li>ErrorList 不为空，表示全部指定好友删除失败。</li></ul>
</li>
</ul></td>
</tr>
<tr data-row-level="5-3">
<td>└UserID</td>
<td>String</td>
<td>无法删除 UserID 为此的好友。</td>
</tr>
<tr data-row-level="5-5">
<td>└SubCode</td>
<td>Number</td>
<td>具体失败返回码。</td>
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
            "UserId": "usera2",
            "SubCode": 660800022
        }
    ]
}
```


## 返回码

以下仅列出了接口业务逻辑相关的返回码，完整返回码请参考 [全局返回码](/zim-server/return-codes)。

<table>
<tbody><tr>
<th>返回码</th>
<th>描述</th>
<th>处理建议</th>
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
<td>660800019</td>
<td>单次批量操作超过上限。</td>
<td>减少单次批量操作数量。</td>
</tr>
<tr>
<td>660800022</td>
<td>参数中的用户 ID 相关参数重复。</td>
<td>请删除或修改重复参数。</td>
</tr>
<tr>
<td>660800033</td>
<td>`UserIds` 中的字符串不能与 `FromUserId` 相同。</td>
<td>请修改 `UserIds` 中与 `FromUserId` 相同的字符串。</td>
</tr>
<tr>
<td>660800034</td>
<td>目标用户不是 `FromUserId` 的好友。</td>
<td>无需处理。</td>
</tr>
</tbody></table>
