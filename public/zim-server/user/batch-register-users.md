
# 批量注册用户

- - -

## 描述

后端注册，开发者可以通过该接口批量帮用户注册 IM 账号，实现消息的接收，以便在用户登录 ZIM 后接收历史消息，常用于教育场景。

## 接口原型

- 请求方法：POST
- 请求地址：`https://zim-api.zego.im/?Action=UserRegister`
- 传输协议：HTTPS
- 调用频率限制：20 次/秒。

## 请求参数

以下请求参数列表仅列出了接口请求参数和部分公共参数，完整公共参数列表请参考 [调用方式 - 公共请求参数](/zim-server/accessing-server-apis#2-公共参数)。

<table class="collapsible-table" >
<tbody><tr data-row-level="1">
<th>参数</th>
<th>类型</th>
<th>是否必选</th>
<th>描述</th>
</tr>
<tr data-row-level="3" data-row-child="true">
<td>UserInfo</td>
<td>Array of Object</td>
<td>是</td>
<td>用户信息，单次最多注册 100 个用户。</td>
</tr>
<tr data-row-level="3-1">
<td>└UserId</td>
<td>String</td>
<td>是</td>
<td>用户 ID，长度不超过 32 字节。</td>
</tr>
<tr data-row-level="3-2">
<td>└UserName</td>
<td>String</td>
<td>否</td>
<td>用户名称，长度不超过 256 字节。</td>
</tr>
<tr data-row-level="3-3">
<td>└UserAvatar</td>
<td>String</td>
<td>否</td>
<td>用户头像地址，长度不超过 500 字节。</td>
</tr>
</tbody></table>

<Note title="说明">

UserID 仅支持数字，英文字符和 {"'!', '#', '$', '%', '&', '(', ')', '+', '-', ':', ';', '<', '=', '.', '>', '?', '@', '[', ']', '^', '_', '{', '}', '|', '~'"}。
</Note>

## 请求示例

- 请求地址 URL：

```json
https://zim-api.zego.im/?Action=UserRegister
&<公共请求参数>
```

- 请求消息体：

```json
{
  "UserInfo":[
    {
      "UserId": "aaa",
      "UserName": "userNamea",
      "UserAvatar": "http"
    },
    {
      "UserId": "bbb",
      "UserName": "userNameb",
      "UserAvatar": "http"
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
<td>返回码。
<Note title="说明">当您发起请求同时注册多个用户时：<ul><li>如果有 1 个或以上的用户 ID 注册成功，Code 都会返回 0。此时请参考 ErrorList 中的具体信息，确认操作结果。</li><li>如果全部用户注册失败，Code 会返回相关返回码，具体请参考 [全局返回码](/zim-server/return-codes)。</li></ul></Note></td>
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
<ul><li>ErrorList 为空，全部用户注册成功。</li><li>ErrorList 不为空，表示部分用户注册失败，请参考 SubCode、SubMessage 处理。</li></ul>
</li>
<li>
Code 不为 0：
<ul><li>ErrorList 为空，表示参数错误、接口频率限制、系统错误。</li><li>ErrorList 不为空，表示所有用户都注册失败，全部都是已经存在的用户。</li></ul>
</li>
</ul></td>
</tr>
<tr data-row-level="5-3">
<td>└UserID</td>
<td>String</td>
<td>注册失败的 UserID。</td>
</tr>
<tr data-row-level="5-4">
<td>└SubCode</td>
<td>Number</td>
<td>用户注册失败的具体返回码。</td>
</tr>
<tr data-row-level="5-5">
<td>└SubMessage</td>
<td>String</td>
<td>用户注册失败的原因说明。</td>
</tr>
</tbody></table>


## 响应示例

```json
{
    "Code":0,   // 同时注册多个用户时，如果有 1 个或以上的用户 ID 注册成功，Code 都会返回 0。此时请参考 ErrorList 中的具体信息进一步确认。
    "Message":"success",
    "RequestId":"343649807833778782",
    "ErrorList": [
      {
          "UserId": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
          "SubCode": 660000012,
          "SubMessage":"user length limit"
      }
    ] 
}
```


## 返回码

以下仅列出了接口业务逻辑相关的返回码，完整返回码请参考 [全局返回码](/zim-server/return-codes)。

| 返回码 | 描述 | 可能原因 | 处理建议 |
|--------|------|----------|----------|
| 660000001 | 业务类通用错误。 | 服务端出错。 | 请重试，或联系 ZEGO 技术支持。 |
| 660000002 | 输入参数错误。 | 输入的参数缺失或不合法。 | 请检查输入的参数。 |
| 660000012 | UserID 长度超过限制。 | UserID 最大长度为 32 字节。 | 请确认 UserID 的长度。 |
| 660700001 | 请求过于频繁。 | 发起请求频率超过 20 次/秒。 | 请稍后再试。 |
| 660700002 | 用户已存在。 | 发送请求的 UserID 已存在。 | 请避免重复注册相同的 UserID。 |
| 660700006 | UserName 长度超过限制。 | UserName 长度最大为 256 字节。 | 请确认 UserName 的长度。 |
| 660700007 | UserAvatar 地址长度超过限制。 | UserAvatar 地址长度最大为 500 字节。 | 请确认 UserAvatar 的长度。 |
