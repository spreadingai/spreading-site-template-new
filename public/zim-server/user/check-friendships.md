
# 检查好友关系

- - -

## 描述

调用此接口，可为一名用户批量检查其与至多 20 名其他用户的好友关系。如需上调（最多可为 50），请联系 ZEGO 技术支持。

ZEGO 支持单边或双边检查好友关系，以检查用户 A 与目标用户 B 的好友关系为例：
- 单边检查：仅检查用户 A 的好友列表是否有用户 B。
- 双边检查：同时检查用户 A 和用户 B 的好友列表是否有对方。

检查好友关系的结果可能有：

<table>
<tbody><tr>
<th rowspan="2">检查类型</th>
<th rowspan="2">数值</th>
<th colspan="2">说明</th>
</tr>
<tr>
<th>A 的好友列表有 B</th>
<th>B 的好友列表有 A</th>
</tr>
<tr>
<td rowspan="2">单向</td>
<td>1</td>
<td>✖</td>
<td>无法确认</td>
</tr>
<tr>
<td>2</td>
<td>✔️</td>
<td>无法确认</td>
</tr>
<tr>
<td rowspan="4">双向</td>
<td>3</td>
<td>✖</td>
<td>✖</td>
</tr>
<tr>
<td>4</td>
<td>✔️</td>
<td>✖</td>
</tr>
<tr>
<td>5</td>
<td>✖</td>
<td>✔️</td>
</tr>
<tr>
<td>6</td>
<td>✔️</td>
<td>✔️</td>
</tr>
</tbody></table>


## 接口原型

- 请求方法：POST
- 请求地址：`https://zim-api.zego.im/?Action=CheckFriendsRelation`
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
<td>为此 UserId 查询好友关系。</td>
</tr>
<tr data-row-level="4">
<td>UserIds</td>
<td>Array of String</td>
<td>是</td>
<td>待检查好友关系的目标用户列表。默认数量上限为 20。</td>
</tr>
<tr data-row-level="5">
<td>CheckType</td>
<td>Number</td>
<td>是</td>
<td>检查类型：
<ul><li>0：双向检查。</li><li>1：单向检查。</li></ul></td>
</tr>
</tbody></table>

<Note title="说明">

FromUserId 和 UserIds 仅支持数字，英文字符和 {"'!', '#', '$', '%', '&', '(', ')', '+', '-', ':', ';', '<', '=', '.', '>', '?', '@', '[', ']', '^', '_', '{', '}', '|', '~'"}。
</Note>

## 请求示例

- 请求地址 URL：

```json
https://zim-api.zego.im/?Action=CheckFriendsRelation
&<公共请求参数>
```

- 请求消息体：

```json
{
    "FromUserId": "zego_user",
    "UserIds": [
        "user_id1",
        "user_id2",
        "user_id3",
        "user_id4"
    ],
    "CheckType": 0
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
<Note title="说明">当您发起请求同时检查 `FromUserId` 与多名用户的好友关系时：<ul><li>如果成功检查 `FromUserId` 与 1 名或更多用户的好友关系，Code 都会返回 0。此时请参考 Fails 中的具体信息，确认操作结果。</li><li>如果&nbsp; `FromUserId` 与全部目标用户的好友关系都检查失败，Code 会返回相关返回码，具体请参考 [全局返回码](/zim-server/return-codes)。</li></ul></Note></td>
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
<td>Successes</td>
<td>Array of Object</td>
<td>检查成功列表。</td>
</tr>
<tr data-row-level="5-1">
<td>└UserId</td>
<td>String</td>
<td>成功检查 `FromUserId` 与此用户 ID 的好友关系。</td>
</tr>
<tr data-row-level="5-2">
<td>└Relation</td>
<td>Number</td>
<td>关系类型，详情请参考 <a href="#1">描述</a>。</td>
</tr>
<tr data-row-level="6" data-row-child="true">
<td>Fails</td>
<td>Array of Object</td>
<td>
检查失败列表。
<ul>
<li>
Code 为 0：
<ul><li>Fails 为空，表示成功检查 `FromUserId` 与全部目标用户的好友关系。</li><li>Fails 不为空，表示 `FromUserId` 与部分目标用户的好友关系检查失败，请参考 SubCode 处理。</li></ul>
</li>
<li>
Code 不为 0：
<ul><li>Fails 为空，表示参数错误、接口频率限制、系统错误。</li><li>Fails 不为空，表示`FromUserId` 与全部目标用户的好友关系检查失败。</li></ul>
</li>
</ul></td>
</tr>
<tr data-row-level="6-3">
<td>└UserID</td>
<td>String</td>
<td>`FromUserId` 与此用户 ID 的好友关系检查失败。</td>
</tr>
<tr data-row-level="6-5">
<td>└SubCode</td>
<td>Number</td>
<td>具体失败返回码。</td>
</tr>
<tr data-row-level="6-6">
<td>└Relation</td>
<td>Number</td>
<td>关系类型。仅当请求参数 `CheckType` 为 0 时，此字段有值，为 1 或 2，相关数值详情请参考 <a href="#1">描述</a>。</td>
</tr>
</tbody></table>


## 响应示例

```json
{
    "Code": 0,
    "Message": "success",
    "RequestId": "343649807833778782",
    "Successes": [
        {
            "UserId": "user_id1",
            "Relation": 4
        },
        {
            "UserId": "user_id2",
            "Relation": 4
        }
    ],
    "Fails": [
        {
            "UserId": "user_id3",
            "SubCode": 660000001,
            "Relation": 1
        },
        {
            "UserId": "user_id4",
            "SubCode": 660000001,
            "Relation": 2
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
</tbody></table>
