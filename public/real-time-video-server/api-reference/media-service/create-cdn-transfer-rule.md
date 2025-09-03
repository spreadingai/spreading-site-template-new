# 启动旁路推流

---

## 描述

调用本接口启动旁路推流任务，可将 RTC 流旁路转推至指定 CDN 直播地址，建议在推流之前调用。

如果开发者不再需要将流转推至 CDN，请参考 [停止旁路推流](https://doc-zh.zego.im/article/19626)。

<Warning title="注意">


若您是 RTC 转推 CDN、或混流转推 CDN，ZEGO 服务器会自动帮您进行 CDN 鉴权，您无需额外进行 CDN 鉴权。

</Warning>





## 接口原型

- 请求方法：GET
- 请求地址：`https://rtc-api.zego.im/?Action=CreatCDNTransferRule`
- 传输协议：HTTPS
- 调用频率限制：10 次/秒（测试环境：5 次/秒）

## 请求参数

以下请求参数列表仅列出了接口请求参数和部分公共参数，完整公共参数列表请参考 完整公共参数列表请参考 [调用方式](/real-time-video-server/api-reference/accessing-server-apis#公共请求参数) 中的 “公共请求参数”。

<Note title="说明">

测试环境下（详见 <a target="_blank" href="/real-time-video-server/api-reference/accessing-server-apis#公共请求参数">调用方式</a> 中的 “公共参数” 中的 IsTest 的参数说明），流 ID 需要加上 “zegotest-AppId-” 前缀。例如，流 ID 为 “test”，在 AppId 为 “123456789” 的测试环境下，流 ID 应为 “zegotest-123456789-test”。

</Note>



<table>

<thead>
  <tr>
    <th>参数</th>
    <th>类型</th>
    <th>是否必选</th>
    <th>描述</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>StreamId</td>
    <td>String</td>
    <td>是</td>
    <td>流 ID。</td>
  </tr>
  <tr>
    <td>CDNUrl</td>
    <td>String</td>
    <td>是</td>
    <td><p>转推的 CDN 地址，必须是 RTMP 格式。</p><p>使用时，请对该参数内容进行 UrlEncode。</p></td>
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
</tbody>
</table>


## 请求示例

```
https://rtc-api.zego.im/?Action=CreatCDNTransferRule
&StreamId=rtc01
&CDNUrl=rtmp%3A%2F%2Fwsdemo.zego.im%2Flivestream%2Frtc01
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
    <td> Object</td>
    <td>响应数据。</td>
  </tr>
</tbody>
</table>


## 响应示例

```json
{
    "Code":0,
    "Message":"ok",
    "RequestId":"918334131114317411",
    "Data":null
}
```

## 返回码

以下仅列出了接口业务逻辑相关的部分返回码，完整返回码请参考 [全局返回码](https://doc-zh.zego.im/)。

|返回码|说明|处理建议|
|-----|------|-----|
| 5000、5001、5002、5006、30003 | 内部错误。 | 请联系 ZEGO 技术支持处理。|
| 5003 | 鉴权失败。 | 请检查签名 Signature 是否正确。|
| 5004 | 无效的 CDN 地址。| 请检查请求参数 CDNUrl 是否正确。|
| 5005 | 无效请求。| 请联系 ZEGO 技术支持处理。|
| 5007、30002 | 接口调用频率过高。| 请降低接口请求频率。|
| 30001 | 无效的 CDN 地址。| 请检查请求参数 CDNUrl 是否正确。|
| 30004 | 参数 isTest 错误。| 请检查公共请求参数 isTest 是否正确。|
| 30005 | 无效的 AppId。 | 请检查 AppId 是否正确。|
| 30009 | 无效的 StreamId，流名不规范。 | 请检查 StreamId 是否符合流名编码规范。|
