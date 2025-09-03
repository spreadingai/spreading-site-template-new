# 用户封禁规则

- - -

## 描述

ZEGO 服务端提供了一套 `用户封禁规则` 接口，当开发者需要从业务后台直接管理用户的登录、推流等权限时，可以通过设置相关的封禁规则（例如通过用户的 IP 地址、UserId 等信息），直接封禁对应的用户，从而实现违规用户不能登录某些房间、或登录房间后不能开麦等功能。

开发者还可以查询已存在的封禁规则、删除过期或不适用的封禁规则，更好地维护业务秩序，保护用户权益，提升产品体验。

<Warning title="注意">


如需使用该功能，请联系 ZEGO 技术支持开启相关权限。

</Warning>



## 接口原型

<table>
  
<tbody><tr>
<th>方法名</th>
<th>请求方法</th>
<th>传输协议</th>
<th>调用频率限制（同一个 AppID 下所有房间）</th>
<th>请求地址</th>
</tr>
<tr>
<td><a href="https://doc-zh.zego.im/article/19571#3_1">设置用户封禁规则</a></td>
<td rowspan="3">GET</td>
<td rowspan="3">HTTPS</td>
<td>10 次/秒</td>
<td>https://rtc-api.zego.im/?Action=<b>SetForbidUserRule</b></td>
</tr>
<tr>
<td><a href="https://doc-zh.zego.im/article/19571#3_2">查询用户封禁规则</a></td>
<td>1 次/秒</td>
<td>https://rtc-api.zego.im/?Action=<b>DescribeForbidUserRules</b></td>
</tr>
<tr>
<td><a href="https://doc-zh.zego.im/article/19571#3_3">删除用户封禁规则</a></td>
<td>10 次/秒</td>
<td>https://rtc-api.zego.im/?Action=<b>DelForbidUserRule</b></td>
</tr>
</tbody></table>

## 使用步骤

下文详细介绍 `用户封禁规则` 接口的请求参数配置、响应参数说明。

### 设置用户封禁规则

当开发者需要封禁某些用户时，需要先通过 `SetForbidUserRule` 设置对应的用户封禁规则。

#### 请求参数及请求示例

以下请求参数列表仅列出了接口请求参数和部分公共参数，完整公共参数列表请参考 完整公共参数列表请参考 [调用方式](/real-time-video-server/api-reference/accessing-server-apis#公共请求参数) 中的 “公共请求参数”。


<table>
  
<tbody><tr>
<th>参数</th>
<th>类型</th>
<th>是否必选</th>
<th>描述</th>
</tr>
<tr>
<td>RuleType</td>
<td>Int32</td>
<td>是</td>
<td><p>封禁规则类型：</p><ul><li>1：通过 IP 地址封禁用户，最多可设置 100 条。</li><li>2：通过 RoomId 封禁用户，最多可设置 200 条。</li><li>3：通过 UserId 封禁用户，最多可设置 200 条。</li><li>4：通过 RoomId 和 UserId 封禁用户，最多可设置 200 条。</li></ul><p>其中，最多可设置的规则条数，指同时在有效期内的规则条数，不包含已失效的规则。</p><p>如果您不需要某些规则，请及时调用 <a href="https://doc-zh.zego.im/article/19571#3_3" target="blank">删除用户封禁规则</a> 接口进行清理。</p></td>
</tr>
<tr>
<td>IP</td>
<td>String</td>
<td>RuleType 取值为 1 时，该参数必填。</td>
<td>IP 地址。</td>
</tr>
<tr>
<td>RoomId</td>
<td>String</td>
<td>RuleType 取值为 2、4 时，该参数必填。</td>
<td>房间 ID。</td>
</tr>
<tr>
<td>UserId</td>
<td>String</td>
<td>RuleType 取值为 3、4 时，该参数必填。</td>
<td>用户 ID。</td>
</tr>
<tr>
<td>DisabledPrivilege[]</td>
<td>Array of Int32</td>
<td>是</td>
<td><p>封禁用户所能使用的功能：</p><ul><li>1：登录。</li><li>2：推流。</li></ul></td>
</tr>
<tr>
<td>EffectiveTime</td>
<td>Int64</td>
<td>是</td>
<td>封禁规则有效时长，单位：秒，取值范围 1 ～ 86400（1 天）。</td>
</tr>
</tbody></table>

参数配置举例：

- 假设需要封禁的用户是 user1，未登录房间 room1：

    - RuleType 取值为 1、DisabledPrivilege[] 取值为 1 时，表示该 IP 地址对应的用户无法登录任何房间。
    - RuleType 取值为 2、DisabledPrivilege[] 取值为 1 时，表示任何用户都无法登录 room1。
    - RuleType 取值为 3、DisabledPrivilege[] 取值为 2 时，表示 user1 可以正常登录到任何房间，但无法在任何房间内推流。
    - RuleType 取值为 4、DisabledPrivilege[] 取值为 2 时，表示 user1 可以正常登录到 room1，但无法在 room1 内推流。

- 假设需要封禁的用户是 user1，且已登录房间 room1，无论 RuleType 取值如何：

    - DisabledPrivilege[] 取值为 1 或 1&2 时，user1 仍在 room1 内、但无法正常推流，需要调用 [踢出房间用户](https://doc-zh.zego.im/article/19569) 接口踢出用户。
    - DisabledPrivilege[] 取值为 2 时，user1 无法在 room1 内推流。


```url
https://rtc-api.zego.im/?Action=SetForbidUserRule
&RuleType=2
&RoomId=room1
&DisabledPrivilege[]=1&DisabledPrivilege[]=2
&EffectiveTime=1800
&<公共请求参数>
```

#### 响应参数及响应示例

| 参数 | 类型 | 描述 |
|------|------|------|
| Code | Int32 | 返回码。 |
| Message | String | 操作结果描述。 |
| RequestId | String | 请求 ID。 |
| Data | Object | 响应数据。 |
| └ ExpireTime | Int64 | 封禁规则的过期时间，Unix 时间戳，单位：秒。 |


```json
{
    "Code": 0,
    "Message": "success",
    "RequestId": "TestRequestId1675674022729915000",
    "Data": {
        "ExpireTime": 1704282648
    }
}
```

<Note title="说明">


- 响应结果中，Code 为 0 表示设置成功，不为 0 表示设置失败，请参考 [4 返回码](https://doc-zh.zego.im/article/19571#4) 进行处理。
- 设置成功后，您可以 [查询用户封禁规则](https://doc-zh.zego.im/article/19571#3_2) 或 [删除用户封禁规则](https://doc-zh.zego.im/article/19571#3_3)。

</Note>



### 查询用户封禁规则

设置规则成功后，通过 `DescribeForbidUserRules` 了解当前已存在的用户封禁规则。

<Warning title="注意">
调用 `DescribeForbidUserRules` 接口，可以查询到当前处于有效期内的规则，也可以查询到已失效的规则。<b>请注意，ZEGO 会不定期清理数据库中的已失效的封禁规则，调用本接口查询得到的失效规则列表可能不完整。</b>
</Warning>



#### 请求参数及请求示例

以下请求参数列表仅列出了接口请求参数和部分公共参数，完整公共参数列表请参考 完整公共参数列表请参考 [调用方式](/real-time-video-server/api-reference/accessing-server-apis#公共请求参数) 中的 “公共请求参数”。


<table>
  
<tbody><tr>
<th>参数</th>
<th>类型</th>
<th>是否必选</th>
<th>描述</th>
</tr>
<tr>
<td>RuleType</td>
<td>Int32</td>
<td>是</td>
<td><p>需要查询的封禁规则类型：</p><ul><li>1：通过 IP 地址封禁用户。</li><li>2：通过 RoomId 封禁用户。</li><li>3：通过 UserId 封禁用户。</li><li>4：通过 RoomId 和 UserId 封禁用户。</li></ul></td>
</tr>
</tbody></table>

```url
https://rtc-api.zego.im/?Action=DescribeForbidUserRules
&RuleType=2
&<公共请求参数>
```

#### 响应参数及响应示例

| 参数 | 类型 | 描述 |
|------|------|------|
| Code | Int32 | 返回码。 |
| Message | String | 操作结果描述。 |
| RequestId | String | 请求 ID。 |
| Data | Object | 响应数据。 |
| └ RuleList | Array of Object | 用户封禁规则列表，详情可见[RuleList](#ruleList)。 |

<a id="rulelist"></a>
**RuleList**
| 参数 | 类型 | 描述 |
|------|------|------|
| RuleType | Int32 | 封禁规则类型：1：通过 IP 地址封禁用户。2：通过 RoomId 封禁用户。3：通过 UserId 封禁用户。4：通过 RoomId 和 UserId 封禁用户。 |
| IP | String | IP 地址。RuleType 为 1 时，该参数有值。 |
| RoomId | String | 房间 ID。RuleType 为 2、4 时，该参数有值。 |
| UserId | String | 用户 ID。RuleType 为 3、4 时，该参数有值。 |
| DisabledPrivilegeList | Array of Int32 | 规则封禁用户所能使用的功能：1：登录2：推流 |
| ExpireTime | Int64 | 用户封禁规则的过期时间，Unix 时间戳，单位：秒。 |


```json
{
    "Code": 0,
    "Message": "success",
    "RequestId": "TestRequestId1675674022729915000",
    "Data": {
        "RuleList": [
            {
                "RuleType": 2,
                "IP": "",
                "RoomId": "room1",
                "UserId": "",
                "DisabledPrivilegeList": [
                    1,
                    2
                ],
                "ExpireTime": 1704282648
            },
            {
                "RuleType": 2,
                "IP": "",
                "RoomId": "room2",
                "UserId": "",
                "DisabledPrivilegeList": [
                    1
                ],
                "ExpireTime": 1704282648
            }
        ]
    }
}
```

<Note title="说明">


响应结果中，Code 为 0 表示查询成功，不为 0 表示查询失败，请参考 [4 返回码](https://doc-zh.zego.im/article/19571#4) 进行处理。

</Note>



### 删除用户封禁规则

当某些用户封禁规则失效、无用或规则总条数超过上限时，可以通过 `DelForbidUserRule` 删除用户封禁规则。

<Warning title="注意">


每个 RuleType 所支持设置的最大条数限制不同，如果您不需要某些规则，请及时调用本接口进行清理。此外，ZEGO 也会不定期清理数据库中的<b>已失效</b>的封禁规则。

</Warning>




#### 请求参数及请求示例

以下请求参数列表仅列出了接口请求参数和部分公共参数，完整公共参数列表请参考 完整公共参数列表请参考 [调用方式](/real-time-video-server/api-reference/accessing-server-apis#公共请求参数) 中的 “公共请求参数”。


<table>
  
<tbody><tr>
<th>参数</th>
<th>类型</th>
<th>是否必选</th>
<th>描述</th>
</tr>
<tr>
<td>RuleType</td>
<td>Int32</td>
<td>是</td>
<td><p>所需删除的封禁规则类型：</p><ul><li>1：通过 IP 地址封禁用户。</li><li>2：通过 RoomId 封禁用户。</li><li>3：通过 UserId 封禁用户。</li><li>4：通过 RoomId 和 UserId 封禁用户。</li></ul></td>
</tr>
<tr>
<td>IP</td>
<td>String</td>
<td>RuleType 取值为 1 时，该参数必填。</td>
<td>IP 地址。</td>
</tr>
<tr>
<td>RoomId</td>
<td>String</td>
<td>RuleType 取值为 2、4 时，该参数必填。</td>
<td>房间 ID。</td>
</tr>
<tr>
<td>UserId</td>
<td>String</td>
<td>RuleType 取值为 3、4 时，该参数必填。</td>
<td>用户 ID。</td>
</tr>
</tbody></table>

```url
https://rtc-api.zego.im/?Action=DelForbidUserRule
&RuleType=2
&RoomId=room1
&<公共请求参数>
```

#### 响应参数及响应示例

| 参数 | 类型 | 描述 |
|------|------|------|
| Code | Int32 | 返回码。 |
| Message | String | 操作结果描述。 |
| RequestId | String | 请求 ID。 |


```json
{
    "Code": 0,
    "Message": "success",
    "RequestId": "TestRequestId1675674022729915000"
}
```

<Note title="说明">


- 响应结果中，Code 为 0 表示删除成功，不为 0 表示删除失败，请参考 [4 返回码](https://doc-zh.zego.im/article/19571#4) 进行处理。
- 您也可以通过 [查询用户封禁规则](https://doc-zh.zego.im/article/19571#3_2) 查看对应的用户封禁规则是否删除成功。

</Note>




## 返回码


以下仅列出了接口业务逻辑相关的部分返回码，完整返回码请参考 [全局返回码](https://doc-zh.zego.im/)。

|返回码|说明| 处理建议 |
|-----|----|----|
| 0 | 请求成功。 | - |
| 1  | 请求失败。 | 请联系 ZEGO 技术支持处理。 |
| 2  | 输入参数错误。 | - |
| 9  | 未开通当前接口的使用权限。 | 请联系 ZEGO 技术支持处理。 |
| 206  | App 请求 QPS 过高被限制。 | 降低请求频率，或联系 ZEGO 技术支持提高 QPS 限制阈值。 |
| 50123  | 当前处于有效期内的封禁规则条数超过限制。 | 请减少规则条数。 |
