# 获取伴奏高潮时间点

- - -

## 描述

通过获取伴奏高潮时间点，可以标示出一首伴奏中高潮片段的时间节点。

## 接口原型

- 请求方法：GET
- 请求地址：`https://ktv-api.zego.im/?Action=DescribeAccompanyClipInfo`
- 传输协议：HTTPS
- 调用频率限制：200 次/秒



## 请求参数

以下请求参数列表仅列出了接口请求参数和部分公共参数，完整公共参数列表请参考 [调用方式 - 公共请求参数](/online-ktv-server/accessing-server-apis#公共请求参数)。

<Note title="说明">
在线 KTV 服务端接口的公共请求参数与实时音视频、实时语音的不同，包含了 VendorId（版权方 ID），请务必阅读上述参考文档。
</Note>

<table>
  
  <tbody><tr>
    <th>参数</th>
    <th>类型</th>
    <th>是否必选</th>
    <th>描述</th>
  </tr>
  <tr>
    <td>SongId</td>
    <td>String</td>
    <td>是</td>
    <td>歌曲 ID。</td>
  </tr>
</tbody></table>



## 请求示例

```
https://ktv-api.zego.im/?Action=DescribeAccompanyClipInfo
&SongId=125282604
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
    <td>Data</td>
    <td>Object</td>
    <td>响应结果，详情可见 [Data](#data)。</td>
</tr>
</tbody></table>

##### Data
<table>
  <tbody><tr>
    <th>参数</th>
    <th>类型</th>
    <th>描述</th>
  </tr>
  <tr>
    <td>SegmentBegin</td>
    <td>Number</td>
    <td><p>高潮开始时间，单位：毫秒。</p><p><b>仅当 VendorId 为 0、1 或 4 时，此字段的返回值才有实际意义。</b></p></td>
  </tr>
  <tr>
    <td>SegmentEnd</td>
    <td>Number</td>
    <td><p>高潮结束时间，单位：毫秒。</p><p><b>仅当 VendorId 为 0、1 或 4 时，此字段的返回值才有实际意义。</b></p></td>
  </tr>
  <tr>
    <td>ShortSegmentBegin</td>
    <td>Number</td>
    <td><p>高潮片段资源短分片的开始时间，单位：毫秒。</p><p><b>仅当 VendorId 为 2 时，此字段的返回值才有实际意义。</b></p></td>
  </tr>
  <tr>
    <td>ShortSegmentEnd</td>
    <td>Number</td>
    <td><p>高潮片段资源短分片的结束时间，单位：毫秒。</p><p><b>仅当 VendorId 为 2 时，此字段的返回值才有实际意义。</b></p></td>
  </tr>
</tbody></table>


## 响应示例

```json
{
    "Code": 0,
    "Message": "succeed",
    "RequestId": "94987a7c-a386-43df-a164-2b8c72be4ce9",
    "Data": {
        "SegmentBegin": 0,
        "SegmentEnd": 0,
        "ShortSegmentBegin": 77059,
        "ShortSegmentEnd": 103955
    }
}
```

## 返回码

以下仅列出了接口业务逻辑相关的部分返回码，完整返回码请参考 [全局返回码](/online-ktv-server/return-code)。

|返回码|说明|处理建议|
|-|-|-|
| 320000004 | 参数非法。 | 请根据 Message 提示判断非法参数，调整对应参数值。 |
| 320010000 | AppId 不可用 | 请联系 ZEGO 技术支持开通版权音乐服务。 |
| 320010001 | 不支持的付费类型。 | 请联系 ZEGO 技术支持开通版权音乐对应的付费类型。<ul><li>按次计费</li></ul>  |
| 320050000 | 系统错误。 | 请联系 ZEGO 技术支持。|
| 320050002 | 系统繁忙。 | 请稍后重试。|
| 320050003 | 未定义的引擎错误。 | 请联系 ZEGO 技术支持。|
| 320050004 | 引擎内部错误。 | 请联系 ZEGO 技术支持。|
