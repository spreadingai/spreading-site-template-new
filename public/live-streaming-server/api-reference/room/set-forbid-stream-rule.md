# 房间音视频流封禁规则

- - -

## 描述

当开发者需要从业务后台直接管理用户在某些房间的发言权限时，可以通过 ZEGO 服务端的 `房间音视频流封禁规则` 接口，指定该用户在对应房间的某条流 ID 的权限，直接封禁对应的音频或视频，实现直播间主播直接将房间内的某些违规用户闭麦等操作。

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
<td><a href="https://doc-zh.zego.im/article/19573#3_1">设置音视频流封禁规则</a></td>
<td rowspan="3">GET</td>
<td rowspan="3">HTTPS</td>
<td rowspan="3">10 次/秒</td>
<td>https://rtc-api.zego.im/?Action=<b>SetForbidStreamRule</b></td>
</tr>
<tr>
<td><a href="https://doc-zh.zego.im/article/19573#3_2">查询音视频流封禁规则</a></td>
<td>https://rtc-api.zego.im/?Action=<b>DescribeForbidStreamRules</b></td>
</tr>
<tr>
<td><a href="https://doc-zh.zego.im/article/19573#3_3">删除音视频流封禁规则</a></td>
<td>https://rtc-api.zego.im/?Action=<b>DelForbidStreamRule</b></td>
</tr>
</tbody></table>

## 使用步骤

下文详细介绍 `音视频流封禁规则` 接口的请求参数配置、响应参数说明。

### 设置音视频流封禁规则

当开发者需要封禁某条流的音频或视频时，需要先通过 `SetForbidStreamRule` 设置对应的音视频流封禁规则。

#### 请求参数及请求示例

以下请求参数列表仅列出了接口请求参数和部分公共参数，完整公共参数列表请参考 完整公共参数列表请参考 [调用方式](/live-streaming-server/api-reference/accessing-server-apis#公共请求参数) 中的 “公共请求参数”。


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
<td>房间 ID。</td>
</tr>
<tr>
<td>StreamId</td>
<td>String</td>
<td>是</td>
<td>流 ID，最大不超过 256 字节。</td>
</tr>
<tr>
<td>DisableAudio</td>
<td>Int32</td>
<td>否</td>
<td><p>是否封禁音频。</p><ul><li>0：不封禁，默认值。</li><li>1：封禁。</li></ul></td>
</tr>
<tr>
<td>DisableVideo</td>
<td>Int32</td>
<td>否</td>
<td><p>是否封禁视频。</p><ul><li>0：不封禁，默认值。</li><li>1：封禁。</li></ul></td>
</tr>
<tr>
<td>EffectiveTime</td>
<td>Int64</td>
<td>否</td>
<td><p>封禁规则有效时长，单位：秒，默认为 21600（即 6 小时）。</p><p>取值范围 1 ～ 86400（24 小时），超过 24 小时的取值将自动调整为 24 小时。</p></td>
</tr>
</tbody></table>

<Warning title="注意">


<p>参数 DisableAudio 和 DisableVideo 的使用：</p>
- 必须至少有一个取值为 1，否则调用本接口会出错。
- 针对同一条流 ID，如果多次调用本接口设置不同的封禁规则（每次调用接口时的 DisableAudio 和 DisableVideo 参数取值不同），则以最后一次调用接口的参数设置为准。
</Warning>



```url
https://rtc-api.zego.im/?Action=SetForbidStreamRule
&RoomId=room1
&StreamId=streamId1
&DisableAudio=1
&DisableVideo=1
&EffectiveTime=3600
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
    "RequestId": "TestRequestId167562222222915000"
}
```

<Note title="说明">


- 响应结果中，Code 为 0 表示设置成功，不为 0 表示设置失败，请参考 [4 返回码](https://doc-zh.zego.im/article/19573#4) 进行处理。
- 设置成功后，您可以 [查询音视频流封禁规则](https://doc-zh.zego.im/article/19573#3_2) 或 [删除音视频流封禁规则](https://doc-zh.zego.im/article/19573#3_3)。

</Note>



### 查询音视频流封禁规则

设置规则成功后，通过 `DescribeForbidStreamRules` 了解当前已存在的音视频流封禁规则。

<Warning title="注意">


调用 `DescribeForbidStreamRules` 接口，可以查询到当前处于有效期内的规则，也可以查询到已失效的规则。<b>请注意，ZEGO 会不定期清理数据库中的已失效的封禁规则，调用本接口查询得到的失效规则列表可能不完整。</b>

</Warning>



#### 请求参数及请求示例

以下请求参数列表仅列出了接口请求参数和部分公共参数，完整公共参数列表请参考 完整公共参数列表请参考 [调用方式](/live-streaming-server/api-reference/accessing-server-apis#公共请求参数) 中的 “公共请求参数”。


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
<td>需要查询的房间 ID。</td>
</tr>
<tr>
<td>StreamId[]</td>
<td>Array of String</td>
<td>是</td>
<td>需要查询的流 ID，调用本接口查询时不可超过 10 个流 ID。</td>
</tr>
</tbody></table>

```url
https://rtc-api.zego.im/?Action=DescribeForbidStreamRules
&RoomId=room1
&StreamId[]=streamId1
&StreamId[]=streamId2
&<公共请求参数>
```

#### 响应参数及响应示例

| 参数 | 类型 | 描述 |
|------|------|------|
| Code | Int32 | 返回码。 |
| Message | String | 操作结果描述。 |
| RequestId | String | 请求 ID。 |
| Data | Object | 响应数据。 |
| └ RoomId | String | 房间 ID。 |
| └ ForbidStreamRuleList | Object | 查询到的音视频流封禁规则信息列表，详情可见[ForbidStreamRuleList](#forbidstreamrulelist)。 |

<a id="forbidstreamrulelist"></a>
**ForbidStreamRuleList**
| 参数 | 类型 | 描述 |
|------|------|------|
| StreamId | String | 查询的流 ID。 |
| DisableAudio | Int32 | 流 ID 对应的音频是否封禁。0：不封禁。1：封禁。 |
| DisableVideo | Int32 | 流 ID 对应的视频是否封禁。0：不封禁。1：封禁。 |
| CreateTime | Int64 | 音视频流封禁规则的创建时间，Unix 时间戳，单位：秒。 |
| EffectiveTime | Int64 | 音视频流封禁规则的有效时间，Unix 时间戳，单位：秒。 |


```json
{
    "Code": 0,
    "Data": {
        "RoomId": "room1",
        "ForbidStreamRuleList": [
            {
                "StreamId": "streamId1",
                "DisableAudio": 1,
                "DisableVideo": 1,
                "CreateTime": 1343313411,
                "EffectiveTime": 3600
            }，
            {
                "StreamId": "streamId2",
                "DisableAudio": 0,
                "DisableVideo": 0,
                "CreateTime": 0,
                "EffectiveTime": 0
            }
        ]
    },
    "Message": "success",
    "RequestId": "TestRequestId1710224543000"
}
```

<Note title="说明">


- 响应结果中，Code 为 0 表示查询成功，不为 0 表示查询失败，请参考 [4 返回码](https://doc-zh.zego.im/article/19573#4) 进行处理。
- 如果所查询的 StreamId 不存在、或未设置任何音视频流封禁规则，则返回结果中的 DisableAudio 等字段值将会为 0，如上述响应示例中的 streamId2。

</Note>



### 删除音视频流封禁规则

当某些音视频流封禁规则失效或无用时，可以通过 `DelForbidStreamRule` 删除音视频流封禁规则。

#### 请求参数及请求示例

以下请求参数列表仅列出了接口请求参数和部分公共参数，完整公共参数列表请参考 完整公共参数列表请参考 [调用方式](/live-streaming-server/api-reference/accessing-server-apis#公共请求参数) 中的 “公共请求参数”。


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
<td>房间 ID。</td>
</tr>
<tr>
<td>StreamId</td>
<td>String</td>
<td>是</td>
<td>流 ID，最大不超过 256 字节。</td>
</tr>
</tbody></table>

```url
https://rtc-api.zego.im/?Action=DelForbidStreamRule
&RoomId=roomm1
&StreamId=stream1
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
    "Code":0,
    "Message":"success",
    "RequestId":"4443515903622222208307334"
}
```

<Note title="说明">


- 响应结果中，Code 为 0 表示删除成功，不为 0 表示删除失败，请参考 [4 返回码](https://doc-zh.zego.im/article/19573#4) 进行处理。
- 您也可以通过 [查询音视频流封禁规则](https://doc-zh.zego.im/article/19573#3_2) 查看对应的音视频流封禁规则是否删除成功。
- 如果需要删除的流 ID 对应的封禁规则不存在，调用本接口不会报错。

</Note>




## 返回码


以下仅列出了接口业务逻辑相关的部分返回码，完整返回码请参考 [全局返回码](https://doc-zh.zego.im/)。

|返回码|说明| 处理建议 |
|-----|----|----|
| 0 | 请求成功。 | - |
| 1  | 请求失败。 | 请联系 ZEGO 技术支持处理。 |
| 2  | 输入参数错误。 | - |
| 9  | 未开通当前接口的使用权限。 | 请联系 ZEGO 技术支持处理。 |
| 123  | 设置流信息失败。 | 请重试，或联系 ZEGO 技术支持处理。 |
| 206  | App 请求 QPS 过高被限制。 | 降低请求频率，或联系 ZEGO 技术支持提高 QPS 限制阈值。 |
