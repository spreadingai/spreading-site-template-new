
# 查询用户信息

- - -

## 描述

支持通过用户 ID 查询用户的信息，包含用户名称、用户头像和扩展字段。

## 接口原型

- 请求方法：POST
- 请求地址：`https://zim-api.zego.im/?Action=QueryUserInfos`
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
<td>UserIds[]</td>
<td>Array of String</td>
<td>是</td>
<td>需要查询的用户 ID 列表（已在客户端调用 `login` 方法登录 ZIM 服务，或已调用 [服务端 API](/zim-server/user/batch-register-users)，最大支持查询 100 个用户 ID。单个用户 ID 不超过 64 字节。</td>
</tr>
</tbody></table>

<Note title="说明">

UserIds 仅支持数字，英文字符和 {"'!'，'#'，'$'，'%'，'&'，'('，')'，'+'，'-'，':'，';'，'<'，'='，'.'，'>'，'?'，'@'，'['，']'，'^'，'_'，' '，'{'，'}'，'|'，'~'"}。
</Note>


## 请求示例

- 请求地址 URL：

```json
https://zim-api.zego.im/?Action=QueryUserInfos
&<公共请求参数>
```

- 请求消息体：

```json
{
    "UserIds": ["userA","userB","userC"]
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
<td>请求结果的说明信息。</td>
</tr>
<tr data-row-level="4">
<td>RequestId</td>
<td>String</td>
<td>请求 ID。</td>
</tr>
<tr data-row-level="5" data-row-child="true">
<td>Result</td>
<td>Object</td>
<td>查询成功结果。</td>
</tr>
<tr data-row-level="5-1">
<td>└UserId</td>
<td>String</td>
<td>查询成功的用户 ID。</td>
</tr>
<tr data-row-level="5-2">
<td>└UserName</td>
<td>String</td>
<td>用户名称。</td>
</tr>
<tr data-row-level="5-3">
<td>└UserAvatar</td>
<td>String</td>
<td>用户头像地址。</td>
</tr>
<tr data-row-level="5-4">
<td>└Extra</td>
<td>String</td>
<td>扩展字段。</td>
</tr>
<tr data-row-level="6" data-row-child="true">
<td>ErrorList</td>
<td>Object</td>
<td>
查询失败列表。用户 ID 不存在或者用户未注册时，通过该字段返回。
<ul>
<li>
Code 为 0：
<ul><li>ErrorList 为空，全部用户信息查询成功。</li><li>ErrorList 不为空，表示部分用户信息查询失败，请参考 SubCode 处理。</li></ul>
</li>
<li>
Code 不为 0：
<ul><li>ErrorList 为空，表示参数错误、接口频率限制、系统错误。</li></ul>
</li>
</ul></td>
</tr>
<tr data-row-level="6-5">
<td>└UserId</td>
<td>String</td>
<td>查询失败的用户 ID。</td>
</tr>
<tr data-row-level="6-6">
<td>└SubCode</td>
<td>Number</td>
<td>查询失败时的返回码。</td>
</tr>
</tbody></table>

## 响应示例

```json
{
    "Code": 0,
    "Message": "success",
    "RequestId": "343649807833778782",
    "Result": [
        {
            "UserId": "UserA",
            "UserName": "userName",
            "UserAvatar": "avatar",
            "Extra": "extra"
        }
    ],
    "ErrorList": [
        {
            "UserId": "UserB",
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
<td>660000001</td>
<td>业务类通用错误。</td>
<td>请重试，或联系 ZEGO 技术支持。</td>
</tr>
<tr>
<td>660000002</td>
<td>不存在的用户 ID，或者用户已经登出。</td>
<td>请检查输入的参数。</td>
</tr>
<tr>
<td>660300005</td>
<td>调用接口的频率超出了 AppID 级别限制。</td>
<td>请稍后再试。</td>
</tr>
<tr>
<td>660700008</td>
<td>获取用户信息出错。</td>
<td>请检查用户 ID 是否正确，或联系 ZEGO 技术支持。</td>
</tr>
<tr>
<td>660700015</td>
<td>用户未注册。</td>
<td>请先注册用户。</td>
</tr>
</tbody></table>
