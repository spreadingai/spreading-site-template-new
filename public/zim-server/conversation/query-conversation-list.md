
# 查询会话列表

- - -

## 描述

调用此接口，分页拉取指定用户的全量会话列表，最多返回 1000 个最新会话（单聊与群聊）。

<Note title="说明">

即便用户被踢出会话，本接口返回结果仍包含该会话；但是如果会话解散，则无法通过本接口获取该会话相关信息。
</Note>

## 接口原型

- 请求方法：POST
- 请求地址：`https://zim-api.zego.im/?Action=QueryConversationList`
- 传输协议：HTTPS
- 调用频率限制：20次/秒。

## 请求参数

以下请求参数列表仅列出了接口请求参数和部分公共参数，完整公共参数列表请参考 [调用方式 - 公共请求参数](/zim-server/accessing-server-apis#2-公共参数)。

<table>
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
<td>查询此 UserID（已在客户端调用 `login` 方法登录 ZIM 服务，或已调用 [服务端 API](/zim-server/user/batch-register-users) 完成注册） 的会话列表。</td>
</tr>
<tr data-row-level="3">
<td>Limit</td>
<td>Number</td>
<td>否</td>
<td>单次获取会话的数量，默认为 100，取值范围为 (0, 500]。
<ul><li>当值 ≤ 0 时，修正为 100。</li><li>当值 &gt; 500，修正为 500。</li></ul></td>
</tr>
<tr data-row-level="4">
<td>Next</td>
<td>Number</td>
<td>否</td>
<td><p>分页拉取标志，第一次填 0 ，之后填上一次返回的 Next 值。当返回的 Next 为 0 时，代表好友列表获取完毕。</p><p> 例如，FromUserId 有 250 个会话，调用本接口查询时：</p><ol><li> 第一次调用本接口，Limit 填 100，Next 传 0，查询第 1 ～100 个会话；返回结果中的 Next 值为 num1。</li><li> 第二次调用本接口，Limit 填 100，Next 填 num1，查询第 101 ～ 200 个会话；返回结果中 Next 值为 num2。</li><li> 第三次调用本接口，Limit 填 100，Next 填 num2，查询第 201 ～ 250 个会话；查询完毕，返回结果中的 Next 为 0。</li></ol><p></p></td>
</tr>
</tbody></table>

<Note title="说明">

FromUserId 仅支持数字，英文字符和 {"'!'，'#'，'$'，'%'，'&'，'('，')'，'+'，''，':'，';'，'<'，'='，'.'，'>'，'?'，'@'，'['，']'，'^'，'_'，' '，'{'，'}'，'|'，'~'"}。
</Note>

## 请求示例

- 请求地址 URL：

```json
https://zim-api.zego.im/?Action=QueryConversationList
&<公共请求参数>
```

- 请求消息体：

```json
{
    "FromUserId": "u1",
    "Limit": 10,
    "Next": 0
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
<td>当前的会话总数。</td>
</tr>
<tr data-row-level="6">
<td>Next</td>
<td>Number</td>
<td>分页拉取标志。<ul><li>非 0：表示还有会话信息未返回，需要将该字段设置到请求参数 Next 中拉取更多会话信息。</li><li>为 0：表示已经返回完整会话列表。</li></ul><Note>除上述说明之外，此字段与列表信息无任何关联，请勿基于此做任何其他逻辑。</Note></td>
</tr>
<tr data-row-level="7" data-row-child="true">
<td>List</td>
<td>Array of Object</td>
<td>会话列表。按 UpdateTime 升序返回结果。</td>
</tr>
<tr data-row-level="7-1">
<td>└ConvId</td>
<td>String</td>
<td>会话 ID。<ul><li>单聊会话：会话 ID 为对端用户的 ID。</li><li>群聊会话：会话 ID 为群组 ID。</li></ul></td>
</tr>
<tr data-row-level="7-2">
<td>└ConvType</td>
<td>Number</td>
<td>会话类型。<ul><li>0&nbsp; 或没有返回此字段：单聊会话。</li><li>2：群聊会话。</li></ul></td>
</tr>
<tr data-row-level="7-3">
<td>└UpdateTime</td>
<td>Number</td>
<td>会话最后修改时间，毫秒时间戳。</td>
</tr>
</tbody></table>


## 响应示例

```json
{
    "Code": 0,
    "Message": "success",
    "RequestId": "343649807833778782",
    "TotalCount": 500,
    "Next": 1000,
    "List": [
        {
            "ConvId": "conv1",
            "ConvType": 2,
            "UpdateTime": 1708254395000
        },
        {
            "ConvId": "conv2",
            "ConvType": 0,
            "UpdateTime": 1708254395000
        },
        {
            "ConvId": "conv3",
            "UpdateTime": 1708254395000
        },
        ...
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
<td>请检查 `FromUserId` 是否正确。</td>
</tr>
<tr>
<td>660800053</td>
<td>查询会话列表失败。</td>
<td>请联系 ZEGO 技术支持。</td>
</tr>
</tbody></table>
