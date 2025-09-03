
# 查询好友列表

- - -

## 描述

根据用户 ID 分页拉取其好友列表，获取备注、好友关系建立时间等信息。

## 接口原型

- 请求方法：GET
- 请求地址：`https://zim-api.zego.im/?Action=QueryFriendList`
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
<td>FromUserId</td>
<td>String</td>
<td>是</td>
<td>查询此 UserID（已在客户端调用 `login` 方法登录 ZIM 服务，或已调用 [服务端 API](/zim-server/user/batch-register-users) 完成注册）的好友列表。</td>
</tr>
<tr>
<td>Limit</td>
<td>Number</td>
<td>是</td>
<td>单次拉取多少名好友的信息。取值范围为 [0, 100]。如果不填或数值为 0、大于 100，取值为 100。</td>
</tr>
<tr>
<td>Next</td>
<td>Number</td>
<td>是</td>
<td><p>分页拉取标志，第一次填 0 ，之后填上一次返回的 Next 值。当返回的 Next 为 0 时，代表好友列表获取完毕。</p><p> 例如，FromUserId 有 250 个好友，调用本接口查询时：</p><ol><li> 第一次调用本接口，Limit 填 100，Next 传空，查询第 1 ～ 100 名好友；返回结果中的 Next 值为 num1。</li><li> 第二次调用本接口，Limit 填 100，Next 填 num1，查询第 101 ～ 200 名好友；返回结果中 Next 值为 num2。</li><li> 第三次调用本接口，Limit 填 100，Next 填 num2，查询第 201 ～ 250 名好友；查询完毕，返回结果中的 Next 为 0。</li></ol><p></p></td>
</tr>
</tbody></table>


## 请求示例

```json
https://zim-api.zego.im/?Action=QueryFriendList
&Limit=100&Next=2&FromUserId=zego
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
<td>TotalCount</td>
<td>Number</td>
<td>当前好友总数。</td>
</tr>
<tr data-row-level="6">
<td>Next</td>
<td>Number</td>
<td>分页拉取标志，非 0 仅表示还有好友的信息未返回，需要将该字段设置到请求参数 `Next` 中拉取更多用户的信息；为 0 表示已经返回所有用户的信息。<Note>除上述说明之外，此字段与列表信息无任何关联，请勿基于此做任何其他逻辑。</Note></td>
</tr>
<tr data-row-level="7" data-row-child="true">
<td>FriendInfos</td>
<td>Array of Object</td>
<td>好友数据列表。</td>
</tr>
<tr data-row-level="7-1">
<td>└UserId</td>
<td>String</td>
<td>好友的用户 ID。</td>
</tr>
<tr data-row-level="7-2">
<td>└UserName</td>
<td>String</td>
<td>用户名称。</td>
</tr>
<tr data-row-level="7-3">
<td>└Avatar</td>
<td>String</td>
<td>用户头像地址。</td>
</tr>
<tr data-row-level="7-4">
<td>└Wording</td>
<td>String</td>
<td>建立好友关系时的附言。</td>
</tr>
<tr data-row-level="7-5">
<td>└FriendAlias</td>
<td>String</td>
<td>`FromUserId` 对此好友的备注。</td>
</tr>
<tr data-row-level="7-6">
<td>└CreateTime</td>
<td>Number</td>
<td>好友关系建立时间，单位为 ms。</td>
</tr>
<tr data-row-level="7-7" data-row-child="true">
<td>└Attributes</td>
<td>Array Of Object</td>
<td>好友属性。</td>
</tr>
<tr data-row-level="7-7-1">
<td>&nbsp;&nbsp;&nbsp;&nbsp;└Key</td>
<td>String</td>
<td>好友属性的键。</td>
</tr>
<tr data-row-level="7-7-2">
<td>&nbsp;&nbsp;&nbsp;&nbsp;└Value</td>
<td>String</td>
<td>好友属性的值。</td>
</tr>
</tbody></table>

## 响应示例

```json
{
    "Code": 0,
    "Message": "success",
    "RequestId": "343649807833778782",
    "TotalCount": 500,
    "Next": 1,
    "FriendInfos": [
        {
            "UserId": "UserA",
            "UserName": "UserNameA",
            "Avatar": "Avatar1",
            "Wording": "Wording1",
            "FriendAlias": "FriendAlias1",
            "CreateTime": 1698310534000,
            "Attributes": [
                {
                    "Key": "k1",
                    "Value": "Value"
                },
                {
                    "Key": "k0",
                    "Value": "Value1"
                }
            ]
        },
        {
            "UserId": "UserB",
            "UserName": "UserNameB",
            "Avatar": "Avatar2",
            "Wording": "Wording1",
            "FriendAlias": "FriendAlias2",
            "CreateTime": 1698310534000,
            "Attributes": [
                {
                    "Key": "k3",
                    "Value": "Value"
                },
                {
                    "Key": "k4",
                    "Value": "Value1"
                }
            ]
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
<td>660000001</td>
<td>业务类通用错误。</td>
<td>请重试，或联系 ZEGO 技术支持。</td>
</tr>
<tr>
<td>660000002</td>
<td>参数错误。</td>
<td>请检查请求参数。</td>
</tr>
<tr>
<td>660300005</td>
<td>调用接口的频率超出了 AppID 级别限制。</td>
<td>请稍后再试。</td>
</tr>
</tbody></table>
