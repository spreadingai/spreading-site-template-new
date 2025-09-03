
# 设置群成员昵称

- - -

## 描述

通过该接口批量修改群内成员在该群中的昵称。默认单次最多可修改 20 名用户的昵称，如需调整，请联系 ZEGO 技术支持。

昵称设置成功后，群内成员通过以下 ZIM SDK 的回调接口，收到相关通知：

| iOS-25% | Android-25% | macOS-25% | Windows-25% |
|-----|---------|--------|---------|
| [groupMemberInfoUpdated](https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_ios~protocol~ZIMEventHandler#zim-group-member-info-updated-operated-info-group-id) | [onGroupMemberInfoUpdated](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIMEventHandler#on-group-member-info-updated) | [groupMemberInfoUpdated](https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_macos~protocol~ZIMEventHandler#zim-group-member-info-updated-operated-info-group-id) | [onGroupMemberInfoUpdated](https://doc-zh.zego.im/article/api?doc=zim_API~cpp_windows~class~ZIMEventHandler#on-group-member-info-updated) |

| Web-25% | 小程序-25% | Flutter-25% | React Native-25% |
|---------|-----|---------|---------|
| [groupMemberInfoUpdated](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_web~interface~ZIMEventHandler#group-member-info-updated) | [groupMemberInfoUpdated](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_wxxcx~interface~ZIMEventHandler#group-member-info-updated) | [onGroupMemberInfoUpdated](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMEventHandler/onGroupMemberInfoUpdated.html) | [groupMemberInfoUpdated](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_react-native~interface~ZIMEventHandler#group-member-info-updated) |

| Unity3D-25% | uni-app \| uni-app x-25% | HarmonyOS-25% |
|---------|---------|---------|
| [OnGroupMemberInfoUpdated](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~class~ZIMEventHandler#on-group-member-info-updated) | [groupMemberInfoUpdated](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_uni-app~interface~ZIMEventHandler#group-member-info-updated) | [groupMemberInfoUpdated](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_harmony~interface~ZIMEventHandler#group-member-info-updated) |


## 接口原型
- 请求方法：POST
- 请求地址： `https://zim-api.zego.im/?Action=SetGroupMembersNickname`
- 传输协议：HTTPS
- 调用频率限制：1 次/秒，群级别限制。如需调整，请联系 ZEGO 技术支持。

## 请求参数

以下请求参数列表仅列出了接口请求参数和部分公共参数，完整公共参数列表请参考 [调用方式 - 公共请求参数](/zim-server/accessing-server-apis#2-公共参数)。

<Note title="说明">
以下 `FromUserId` 和 `UserId` 对应的用户已在客户端调用 `login` 方法登录 ZIM 服务，或开发者已调用 [服务端 API](/zim-server/user/batch-register-users) 注册相关的 userID。
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
<td>群组 ID。</td>
</tr>
<tr data-row-level="4" data-row-child="true">
<td>UserIds</td>
<td>Array of Object</td>
<td>是</td>
<td>需要被设置昵称的用户列表。</td>
</tr>
<tr data-row-level="4-1">
<td>└UserId</td>
<td>String</td>
<td>是</td>
<td>用户 ID。</td>
</tr>
<tr data-row-level="4-2">
<td>└Nickname</td>
<td>String</td>
<td>是</td>
<td>用户在群组的昵称。</td>
</tr>
</tbody></table>

<Note title="说明">

FromUserId、GroupId、UserIds 和 Nickname 仅支持数字，英文字符和 {"'!'，'#'，'$'，'%'，'&'，'('，')'，'+'，''，':'，';'，'<'，'='，'.'，'>'，'?'，'@'，'['，']'，'^'，'_'，'{'，'}'，'|'，'~'"}。
</Note>

## 请求示例

- 请求地址 URL：

```json
https://zim-api.zego.im/?Action=SetGroupMembersNickname
&<公共请求参数>
```
- 请求消息体

```json
{
    "FromUserId": "zego_user",
    "GroupId": "groupA",
    "UserIds": [
        {
            "UserId": "usera",
            "Nickname": "nicknamea"
        },
        {
            "UserId": "userb",
            "Nickname": "nicknameb"
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
<tr data-row-level="7" data-row-child="true">
<td>ErrorUsers</td>
<td>Array of Object</td>
<td>
昵称设置失败用户信息。
<ul><li>
Code 为 0：
<ul><li>ErrorUsers 为空，全部指定用户群昵称设置成功。</li><li>ErrorUsers 不为空，表示部分指定用户群昵称设置失败，请参考 SubCode 处理。</li></ul>
</li>
<li>
Code 不为 0：
<ul><li>ErrorUsers 为空，表示参数错误、接口频率限制、系统错误。</li><li>ErrorUsers 不为空，表示全部指定用户群昵称设置失败。</li></ul>
</li>
</ul></td>
</tr>
<tr data-row-level="7-1">
<td>└UserId</td>
<td>String</td>
<td>失败用户 ID。</td>
</tr>
<tr data-row-level="7-2">
<td>└SubCode</td>
<td>Number</td>
<td>昵称设置失败的具体返回码。</td>
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
<td>660000002</td>
<td>输入参数错误。</td>
<td>请检查输入参数。</td>
</tr>
<tr>
<td>660000011</td>
<td>用户个数超过限制。</td>
<td>请检查输入的用户列表。</td>
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
</tbody></table>
