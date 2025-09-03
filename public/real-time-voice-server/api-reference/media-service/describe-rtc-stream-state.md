# RTC 流状态查询

---

## 描述

本接口支持查询指定流的实时状态（是否活跃或存在）。只支持查询推流到 ZEGO 媒体服务器（RTC 服务）的流，不支持查询直接推流到 CDN 或者混流服务输出的流。

推荐优先使用 [流创建回调](https://doc-zh.zego.im/article/19676) 和 [流关闭回调](https://doc-zh.zego.im/article/19678) 异步获取当前推流信息。本接口一般作为流创建回调和流关闭回调的辅助接口，或者在业务后台查询指定单流是否活跃时使用。

<Note title="说明">


本接口默认支持在开始推流后，对流状态信息进行查询。

</Note>



## 接口原型

- 请求方法：GET
- 请求地址：`https://rtc-api.zego.im/?Action=DescribeRTCStreamState`
- 传输协议：HTTPS
- 调用频率限制：40 次/秒（测试环境：10 次/秒）

## 请求参数

以下请求参数列表仅列出了接口请求参数和部分公共参数，完整公共参数列表请参考 完整公共参数列表请参考 [调用方式](/real-time-voice-server/api-reference/accessing-server-apis#公共请求参数) 中的 “公共请求参数”。

<Note title="说明">

测试环境下（详见 <a target="_blank" href="/real-time-voice-server/api-reference/accessing-server-apis#公共请求参数">调用方式</a> 中的 “公共参数” 中的 IsTest 的参数说明），流 ID 需要加上 “zegotest-AppId-” 前缀。例如，流 ID 为 “test”，在 AppId 为 “123456789” 的测试环境下，流 ID 应为 “zegotest-123456789-test”。

</Note>



<table>
  
<tbody><tr>
<th>参数</th>
<th>类型</th>
<th>是否必选</th>
<th>描述</th>
</tr>
<tr>
<td>StreamId</td>
<td>String</td>
<td>是</td>
<td>流 ID。</td>
</tr>
<tr>
<td>Sequence</td>
<td>String</td>
<td>是</td>
<td>
请求序列号，由用户自定义。

<Warning title="注意">
<p>对于同一个流 Streamld，连续 10 秒内，必须保证发出的该 Streamld 的请求序列号是严格递增的；避免服务端收到请求的时序不一致而导致操作错乱。</p>
</Warning>

如果没有并发场景，推荐使用时间戳（毫秒级别）。
</td>
</tr>
</tbody></table>


## 请求示例

```
https://rtc-api.zego.im/?Action=DescribeRTCStreamState
&StreamId=rtc01
&Sequence=1617249600001
&<公共请求参数>
```

## 响应参数


| 参数 | 类型 | 描述 |
|---|---|---|
| Code | Number | <p>返回码。</p><ul><li>0：查询成功，查询的流存在，且是活跃状态。</li><li>其它：表示查询失败，请参考 <a href="https://doc-zh.zego.im/article/21389#7">7 返回码</a> 中的建议处理。</li></ul> |
| Message | String | 操作结果描述。 |
| RequestId | String | 请求 ID。 |



## 响应示例

```json
{
    "Code": 0,
    "Message": "ok",
    "RequestId": "98004",
    "Data": {
        "create_time": "1673334117",
        "close_time": ""
    }
}
```

## 返回码

以下仅列出了接口业务逻辑相关的部分返回码，完整返回码请参考 [全局返回码](https://doc-zh.zego.im/)。

|返回码|说明|处理建议|
|-----|------|-----|
| 0 | 查询成功，查询的流存在、且是活跃状态。 | -|
| 3000 | 无效的 App。 | 请联系 ZEGO 技术支持处理。|
| 3001、30003 | 内部错误。 | 请联系 ZEGO 技术支持处理。|
| 3002 | Timestamp 时间戳错误。 | 请重新生成新的 Timestamp。|
| 3003 | App 未配置 Token。 | 请联系 ZEGO 技术支持处理。|
| 30002 | 接口调用频率过高。| 请降低接口请求频率。|
| 30004 | 参数 isTest 错误。| 请检查公共请求参数 isTest 是否正确。|
| 30005 | 无效的 AppId。 | 请检查 AppId 是否正确。|
| 30009 | 无效的 StreamId，流名不规范。 | 请检查 StreamId 是否符合流名编码规范。|
| 40005 | 鉴权失败。 | 请检查签名 Signature 是否正确。|
| 41004 | 查询失败，StreamId 不存在。 | 请检查 StreamId 是否正确、或“查询流状态历史信息权限”是否过期。|
| 41006 | 查询成功，查询的流存在、但是关闭状态。仅在开通了“查询流状态历史信息权限”的有效期内会返回。 | - |
