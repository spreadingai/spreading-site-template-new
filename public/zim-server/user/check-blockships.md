
# 检查黑名单关系

- - -

## 描述

调用此接口，可为一名用户批量检查其与至多 20 名其他用户的黑名单关系（是否已拉黑这些用户）。如需上调，请联系 ZEGO 技术支持。

## 接口原型

- 请求方法：POST
- 请求地址：`https://zim-api.zego.im/?Action=CheckUsersIsInBlacklist`
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
<td>为此用户查询黑名单关系。</td>
</tr>
<tr data-row-level="4">
<td>UserIds</td>
<td>Array of String</td>
<td>是</td>
<td>待检查黑名单关系的目标用户列表。默认数量上限为 20。</td>
</tr>
</tbody></table>

<Note title="说明">

FromUserId 和 UserIds 仅支持数字，英文字符和 {"'!', '#', '$', '%', '&', '(', ')', '+', '-', ':', ';', '<', '=', '.', '>', '?', '@', '[', ']', '^', '_', '{', '}', '|', '~'"}。
</Note>

## 请求示例

- 请求地址 URL：

```json
https://zim-api.zego.im/?Action=CheckUsersIsInBlacklis
&<公共请求参数>
```

- 请求消息体：

```json
{
    "FromUserId": "zego_user",
    "UserIds": [
        "user1",
        "user2",
        "user3",
        "user4"
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
<td>返回码。
<Note title="说明">当您发起请求同时检查 FromUserId 与多名用户的黑名单关系时：<ul><li>如果成功检查 FromUserId 与 1 名或更多用户的黑名单关系，Code 都会返回 0。此时请参考 ErrList 中的具体信息，确认操作结果。</li><li>如果 FromUserId 与全部目标用户的黑名单关系都检查失败，Code 会返回相关返回码，具体请参考 [全局返回码](/zim-server/return-codes)。</li></ul></Note></td>
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
<td>Succ</td>
<td>Array of Object</td>
<td>检查成功列表。</td>
</tr>
<tr data-row-level="5-1">
<td>└UserId</td>
<td>String</td>
<td>成功检查 `FromUserId` 与此用户 ID 的黑名单关系。</td>
</tr>
<tr data-row-level="5-2">
<td>└Result</td>
<td>Number</td>
<td>检查结果：<ul><li>0：没被 FromUserId 拉黑。</li><li>1：已被 FromUserId 拉黑。</li></ul></td>
</tr>
<tr data-row-level="6" data-row-child="true">
<td>ErrList</td>
<td>Array of Object</td>
<td>
检查失败列表。
<ul>
<li>
Code 为 0：
<ul><li>ErrList 为空，表示成功检查 `FromUserId` 与全部目标用户的黑名单关系。</li><li>ErrList 不为空，表示 `FromUserId` 与部分目标用户的黑名单关系检查失败，请参考 SubCode 处理。</li></ul>
</li>
<li>
Code 不为 0：
<ul><li>ErrList 为空，表示参数错误、接口频率限制、系统错误。</li><li>ErrList 不为空，表示`FromUserId` 与全部目标用户的黑名单关系检查失败。</li></ul>
</li>
</ul></td>
</tr>
<tr data-row-level="6-3">
<td>└UserID</td>
<td>String</td>
<td>`FromUserId` 与此用户 ID 的黑名单关系检查失败。</td>
</tr>
<tr data-row-level="6-5">
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
    "Succ": [
        {
            "UserId": "user1",
            "Result": 1
        },
        {
            "UserId": "user2",
            "Result": 1
        }
    ],
    "ErrList": [
        {
            "UserId": "user3",
            "SubCode": 660000002
        },
        {
            "UserId": "user4",
            "SubCode": 660000002
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
<td>
请确认该用户是否已注册：
- 确认已注册，请联系 ZEGO 技术支持排查。
- 确认未注册，请注册此用户。
</td>
</tr>
<tr>
<td>660700015</td>
<td>接口目标用户未注册。</td>
<td>
请确认该用户是否已注册：
- 确认已注册，请联系 ZEGO 技术支持排查。
- 确认未注册，请注册此用户。
</td>
</tr>
<tr>
<td>660800001</td>
<td>`FromUserId` 未注册。</td>
<td>
请确认该用户是否已注册：
- 确认已注册，请联系 ZEGO 技术支持排查。
- 确认未注册，请注册此用户。
</td>
</tr>
<tr>
<td>660800039</td>
<td>传入的用户列表超过限制。</td>
<td>请缩短传入的用户列表。</td>
</tr>
</tbody></table>
