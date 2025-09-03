
# 查询用户在线状态

- - -

## 描述

查询用户的在线状态，支持查询单个用户、或批量查询多个用户的在线状态。

## 接口原型

- 请求方法：GET
- 请求地址：`https://zim-api.zego.im/?Action=QueryUserOnlineState`
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
  <td>UserId[]</td>
  <td>Array of String</td>
  <td>是</td>
  <td>
  <p>需要查询的用户 ID 列表（已在客户端调用 `login` 方法登录 ZIM 服务，或已调用 [服务端 API](/zim-server/user/batch-register-users)，最大支持查询 100 个用户 ID。</p><p>示例：UserId[]=a&UserId[]=b</p>
  </td>
</tr>
</tbody></table>

<Note title="说明">

UserId 仅支持数字，英文字符和 {"'!'，'#'，'$'，'%'，'&'，'('，')'，'+'，'-'，':'，';'，'<'，'='，'.'，'>'，'?'，'@'，'['，']'，'^'，'_'，' '，'{'，'}'，'|'，'~'"}。
</Note>


## 请求示例

```json
https://zim-api.zego.im/?Action=QueryUserOnlineState
&UserId[]=a&UserId[]=b
&<公共请求参数>
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
<td>查询的用户状态结果。用户处于在线状态或离线状态时，通过该字段返回。</td>
</tr>
<tr data-row-level="5-1">
<td>└UserId</td>
<td>String</td>
<td>在线或离线用户的 ID。</td>
</tr>
<tr data-row-level="5-2">
<td>└Status</td>
<td>String</td>
<td>用户状态，包括：<ul><li>Online：在线。</li><li>Offline：离线。</li></ul></td>
</tr>
<tr data-row-level="6" data-row-child="true">
<td>ErrorList</td>
<td>Object</td>
<td>
查询失败列表。用户 ID 不存在或者用户已登出时，通过该字段返回。
<ul>
<li>
Code 为 0：
<ul><li>ErrorList 为空，全部用户在线状态查询成功。</li><li>ErrorList 不为空，表示部分用户在线状态查询失败，请参考 SubCode 处理。</li></ul>
</li>
<li>
Code 不为 0：
<ul><li>ErrorList 为空，表示参数错误、接口频率限制、系统错误。</li><li>ErrorList 不为空，表示所有用户在线状态查询失败。</li></ul>
</li>
</ul></td>
</tr>
<tr data-row-level="6-1">
<td>└UserId</td>
<td>String</td>
<td>不存在的用户 ID 或已登出用户的 ID。</td>
</tr>
<tr data-row-level="6-2">
<td>└SubCode</td>
<td>Number</td>
<td>
查询失败时的返回码。
</td>
</tr>
</tbody></table>

## 响应示例

```json
{
    "Code":0,
    "Message":"success",
    "RequestId":"343649807833778782",
    "Result": [
      {
          "UserId": "id1",
          "Status": "Offline"
      },
      {
          "UserId": "id2",
          "Status": "Online"
      }
    ],
    "ErrorList": [
      {
          "UserId": "id4",
          "SubCode": 660200001
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
</tr>
<tr>
<td>660000011</td>
<td>用户个数超过限制。</td>
</tr>
<tr>
<td>660200001</td>
<td>不存在的用户 ID，或者用户已经登出。</td>
</tr>
</tbody></table>
