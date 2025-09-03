
# 获取房间成员信息

- - -

## 描述

根据房间 ID 获取房间成员的信息，包括房间用户数量、用户 ID 及名称。


## 接口原型

- 请求方法：GET
- 请求地址：`https://zim-api.zego.im/?Action=QueryRoomUserList`
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
<td>RoomId</td>
<td>String</td>
<td>是</td>
<td>房间ID，长度上限为 32 字节，仅支持数字，英文字符和{" '!'，'#'，'$'，'%'，'&'，'('，')'，'+'，'-'，':'，';'，'<'，'='，'.'，'>'，'?'，'@'，'['，']'，'^'，'_'，'{'，'}'，'|'，'~'"}。</td>
</tr>
<tr>
<td>Mode</td>
<td>Number</td>
<td>否</td>
<td><p>按用户登录房间时间排序：</p><ul><li>0：按时间顺序（默认值）。</li><li>1：按时间倒序。</li></ul></td>
</tr>
<tr>
<td>NextFlag</td>
<td>String</td>
<td>否</td>
<td><p>分页拉取标志，第一次填空，之后填上一次返回的 NextFlag 值。当返回的 NextFlag 为 0 时，代表房间成员列表获取完毕。</p><p> 例如，房间内有 250 个成员，调用本接口查询房间成员列表时：</p><ol><li> 第一次调用本接口，Limit 填 100，NextFlag 传空，查询第 1 ～ 100 名用户；返回结果中的 NextFlag 值为 1。</li><li> 第二次调用本接口，Limit 填 100，NextFlag 填 1，查询第 101 ～ 200 名用户；返回结果中 NextFlag 值为 2。</li><li> 第三次调用本接口，Limit 填 100，NextFlag 填 2，查询第 201 ～ 250 名用户；查询完毕，返回结果中的 NextFlag 为 0。</li></ol><p></p></td>
</tr>
<tr>
<td>Limit</td>
<td>Number</td>
<td>否</td>
<td><p>单次查询用户的数量，取值范围为 [0, 500]，即调用本接口一次最多返回 500 个成员。</p><p> 当房间内成员超过 Limit 时，需调用多次本接口<strong>且 Limit 需保持一致</strong>。 </p><p>如果传空或大于 500，则默认取值为 500。</p><p>如需提高查询结果上限，请联系 ZEGO 技术支持进行配置。</p></td>
</tr>
</tbody></table>


## 请求示例

```json
https://zim-api.zego.im/?Action=QueryRoomUserList
&RoomId=RoomId
&Mode=0
&NextFlag=0
&Limit=500
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
<tr data-row-level="5">
<td>Count</td>
<td>Number</td>
<td>当前房间用户数。</td>
</tr>
<tr data-row-level="6">
<td>NextFlag</td>
<td>String</td>
<td>分页拉取标志，非空表示还有用户的信息未返回，需要将该字段设置到请求参数 NextFlag 中拉取更多用户的信息；为空表示已经返回所有用户的信息。<Note>除上述说明之外，此字段与列表信息无任何关联，请勿基于此做任何其他逻辑。</Note></td>
</tr>
<tr data-row-level="7" data-row-child="true">
<td>UserList</td>
<td>Array of Object</td>
<td>成员列表。</td>
</tr>
<tr data-row-level="7-1">
<td>└UserId</td>
<td>String</td>
<td>用户 ID。</td>
</tr>
<tr data-row-level="7-2">
<td>└UserName</td>
<td>String</td>
<td>用户名称。</td>
</tr>
</tbody></table>

## 响应示例

```json
{
    "Code": 0,
    "Message": "success",
    "RequestId": "343649807833778782",
    "Count": 2,
    "NextFlag": "0",
    "UserList": [
        {
            "UserId": "aaa",
            "UserName": "UserA"
        },
        {
            "UserId": "bbb",
            "UserName": "UserB"
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
<th>处理建议</th>
</tr>
<tr>
<td>660000002</td>
<td>参数错误。</td>
<td>请检查请求参数。</td>
</tr>
<tr>
<td>660300001</td>
<td>房间不存在。</td>
<td>请检查 RoomId 是否正确或房间是否已被销毁。</td>
</tr>
<tr>
<td>660300006</td>
<td>超出调用频率限制。</td>
<td>调用频率为 20 次/秒，请稍后重试。</td>
</tr>
<tr>
<td>660300007</td>
<td>获取房间失败。</td>
<td>请联系 ZEGO 技术支持。</td>
</tr>
<tr>
<td>660300008</td>
<td>获取房间用户列表失败；房间人数为空，一般是处于房间延迟销毁期间。</td>
<td>无需操作。</td>
</tr>
</tbody></table>
