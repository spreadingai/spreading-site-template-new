# 禁止 RTC 推流

---

## 描述

调用本接口禁止 RTC 推流，可以禁止指定流 ID 推送到 RTC 服务。禁止推流操作会向正在推流的客户端和正在拉流的客户端发送推流被禁止的通知。

推流客户端接收推流被服务端禁止的通知使用 ZEGO SDK 回调接口：

<table>
  
  <tbody><tr>
    <th rowspan="2">平台</th>
    <th colspan="2">ZegoExpress SDK</th>
    <th colspan="2">LiveRoom SDK</th>
  </tr>
  <tr>
    <th>接口</th>
    <th>错误码</th>
    <th>接口</th>
    <th>错误码</th>
  </tr>
  <tr>
    <td>iOS/macOS</td>
    <td>onPublisherStateUpdate</td>
    <td>1003025</td>
    <td>onPublishStateUpdate</td>
    <td>12301011</td>
  </tr>
  <tr>
    <td>Android</td>
    <td>onPublisherStateUpdate</td>
    <td>1003025</td>
    <td>onPublishStateUpdate</td>
    <td>12301011</td>
  </tr>
  <tr>
    <td>Windows</td>
    <td>onPublisherStateUpdate</td>
    <td>1003025</td>
    <td>OnPublishStateUpdate</td>
    <td>12301011</td>
  </tr>
</tbody></table>



拉流客户端接收所拉流被服务端禁止的通知使用 ZEGO SDK 回调接口：


<table>
  
<tbody><tr>
<th rowspan="2">平台</th>
<th colspan="2">ZegoExpress SDK</th>
<th colspan="2">LiveRoom SDK</th>
</tr>
<tr>
<th>接口</th>
<th>错误码</th>
<th>接口</th>
<th>错误码</th>
</tr>
<tr>
<td>iOS/macOS</td>
<td>onPlayerStateUpdate</td>
<td>1004025</td>
<td>onPlayStateUpdate</td>
<td>12301011</td>
</tr>
<tr>
<td>Android</td>
<td>onPlayerStateUpdate</td>
<td>1004025</td>
<td>onPlayStateUpdate</td>
<td>12301011</td>
</tr>
<tr>
<td>Windows</td>
<td>onPlayerStateUpdate</td>
<td>1004025</td>
<td>OnPlayStateUpdate</td>
<td>12301011</td>
</tr>
</tbody></table>


## 接口原型

- 请求方法：GET
- 请求地址：`https://rtc-api.zego.im/?Action=ForbidRTCStream`
- 传输协议：HTTPS
- 调用频率限制：20 次/秒（测试环境：5 次/秒）


## 请求参数

以下请求参数列表仅列出了接口请求参数和部分公共参数，完整公共参数列表请参考 完整公共参数列表请参考 [调用方式](/live-streaming-server/api-reference/accessing-server-apis#公共请求参数) 中的 “公共请求参数”。

<Note title="说明">

测试环境下（详见 <a target="_blank" href="https://doc-zh.zego.im/article/19458#公共请求参数">调用方式</a> 中的 “公共参数” 中的 IsTest 的参数说明），流 ID 需要加上 “zegotest-AppId-” 前缀。例如，流 ID 为 “test”，在 AppId 为 “123456789” 的测试环境下，流 ID 应为 “zegotest-123456789-test”。

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
请求序列号。

<Warning title="注意">
对于同一个流 StreamId，连续 10 秒内，必须保证发出的该 StreamId 的请求序列号是严格递增的；避免服务端收到请求的时序不一致而导致操作错乱。
</Warning>

如果没有并发场景，推荐使用时间戳（毫秒级别）。
</td>
</tr>
</tbody></table>


## 请求示例

```
https://rtc-api.zego.im/?Action=ForbidRTCStream
&StreamId=rtc01
&Sequence=1617249600001
&<公共请求参数>
```

## 响应参数


<table>

<thead>
  <tr>
    <th>参数</th>
    <th>类型</th>
    <th>描述</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>Code</td>
    <td>Number</td>
    <td>返回码。</td>
  </tr>
  <tr>
    <td>Message</td>
    <td>String</td>
    <td>操作结果描述。</td>
  </tr>
  <tr>
    <td>RequestId</td>
    <td>String</td>
    <td>请求 ID。</td>
  </tr>
  <tr>
    <td>Data</td>
    <td>Object</td>
    <td>响应数据。</td>
  </tr>
</tbody>
</table>


## 响应示例

```
{
    "Code":0,
    "Message":"ok",
    "RequestId":"1929203990360298509",
    "Data":null
}
```

## 返回码

以下仅列出了接口业务逻辑相关的部分返回码，完整返回码请参考 [全局返回码](https://doc-zh.zego.im/)。

|返回码|说明|处理建议|
|-----|------|-----|
| 3000 | 无效的 App。 | 请联系 ZEGO 技术支持处理。|
| 3001、5006、30003 | 内部错误。 | 请联系 ZEGO 技术支持处理。|
| 3002 | Timestamp 时间戳错误。 | 请重新生成新的 Timestamp。|
| 3003 | App 未配置 Token。 | 请联系 ZEGO 技术支持处理。|
| 30002 | 接口调用频率过高。| 请降低接口请求频率。|
| 30004 | 参数 isTest 错误。| 请检查公共请求参数 isTest 是否正确。|
| 30005 | 无效的 AppId。 | 请检查 AppId 是否正确。|
| 30009 | 无效的 StreamId，流名不规范。 | 请检查 StreamId 是否符合流名编码规范。|
| 40005 | 鉴权失败。 | 请检查签名 Signature 是否正确。|
