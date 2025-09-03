
# 查询群成员列表

- - -

## 描述

根据群组 ID 获取群组中的用户列表。

<Note title="说明">

群组 ID 可通过 [查询 App 下的群组列表](/zim-server/group/query-group-list-in-the-app) 获取。
</Note>

## 接口原型

- 请求方法：POST
- 请求地址：`https://zim-api.zego.im/?Action=QueryGroupMemberList`
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
<td>GroupId</td>
<td>String</td>
<td>是</td>
<td>群组 ID。</td>
</tr>
<tr>
<td>Limit</td>
<td>Number</td>
<td>否</td>
<td><p>单次获取成员的数量，取值范围为 [0, 1000]，即调用本接口一次最多返回 1000 个成员。</p><p> 当群组内成员超过 Limit 时，需调用多次本接口<strong>且 Limit 需保持一致</strong>。 </p><p>如果传空或大于 1000，则默认取值为 1000。</p></td>
</tr>
<tr>
<td>Next</td>
<td>Number</td>
<td>否</td>
<td>分页拉取标志，第一次填 0，以后填上一次返回的值，返回的 Next 为 0 代表群成员列表获取完毕。
<p>例如，群组有 2500 个成员，调用本接口查询群成员列表时：</p>
<ul><li>第一次调用本接口，Limit 填 1000，Next 填 0，查询第 1 ～ 1000 名用户；返回结果中的 Next 值为 1 </li><li>第二次调用本接口，Limit 填 1000，Next 填 1，查询第 1001 ～ 2000 名用户；返回结果中 Next 值为 2。</li><li>第三次调用本接口，Limit 填 1000，Next 填 2，查询第 2001 ～ 2500 名用户；查询完毕，返回结果中的 Next 为 0。</li></ul></td>
</tr>
</tbody></table>

<Note title="说明">

GroupId 仅支持数字，英文字符和 {"'!'，'#'，'$'，'%'，'&'，'('，')'，'+'，'-'，':'，';'，'<'，'='，'.'，'>'，'?'，'@'，'['，']'，'^'，'_'，'{'，'}'，'|'，'~'"}。
</Note>


## 请求示例

- 请求地址 URL：

```json
https://zim-api.zego.im/?Action=QueryGroupMemberList
&<公共请求参数>
```

- 请求消息体：

```json
{
  "GroupId":"groupA",
  "Limit":1000,
  "Next":0
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
<tr data-row-level="5">
<td>TotalCount</td>
<td>Number</td>
<td>服务端开始查询时的群成员总数。</td>
</tr>
<tr data-row-level="6">
<td>Next</td>
<td>Number</td>
<td>分页拉取的标志。非 0 时表示列表获取未完。<Note>除上述说明之外，此字段与列表信息无任何关联，请勿基于此做任何其他逻辑。</Note></td>
</tr>
<tr data-row-level="7" data-row-child="true">
<td>MemberList</td>
<td>Array of String</td>
<td>群成员信息的集合。</td>
</tr>
<tr data-row-level="7-1">
<td>└UserId</td>
<td>String</td>
<td>群成员 ID。</td>
</tr>
<tr data-row-level="7-2">
<td>└UserName</td>
<td>String</td>
<td>群成员名称。</td>
</tr>
<tr data-row-level="7-3">
<td>└UserNickName</td>
<td>String</td>
<td>用户在群组内的昵称。</td>
</tr>
</tbody></table>

## 响应示例

```json
{
  "Code": 0,
  "Message": "success",
  "RequestId": "343649807833778782",
  "TotalCount": 1680,
  "Next": 168,
  "MemberList": [
    {
        "UserId": "u1",
        "UserName": "userName1",
        "UserNickName": "userNickName1"
    },
    {
        "UserId": "u2",
        "UserName": "userName2",
        "UserNickName": "userNickName2"
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
<td>参数错误。</td>
<td>请参考 <a href="#请求参数">请求参数</a> 输入正确参数。</td>
</tr>
<tr>
<td>660600001</td>
<td>群不存在。</td>
<td>请确认 GroupId 是否正确。</td>
</tr>
<tr>
<td>660600003</td>
<td>查询群成员列表出错。</td>
<td>请联系 ZEGO 技术支持。</td>
</tr>
<tr>
<td>660600004</td>
<td>调用 QueryGroupMemberList 接口的频率超出限制。</td>
<td>调用频率为 20 次/秒，请勿超出限制。</td>
</tr>
</tbody></table>
