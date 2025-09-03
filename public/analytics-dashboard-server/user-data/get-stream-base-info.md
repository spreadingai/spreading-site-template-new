
# 查看用户推拉流基本信息

- - -

## 描述

查询用户在指定时间段内与指定房间 ID 和流 ID 相关的基本信息。

## 接口原型

- 请求方法：GET
- 请求地址：`https://analytics-api.zego.im/?Action=GetStreamBaseInfo`
- 传输协议：HTTPS
- 调用频率限制（同一 AppID）：3 次/秒，10000 次/天

## 请求参数

以下请求参数列表仅列出了接口请求参数和部分公共参数，完整公共参数列表请参考 [调用方式 - 公共请求参数](/analytics-dashboard-server/access-server-apis#公共请求参数)。

<table>
  <colgroup>
    <col width="20%" />
    <col width="15%" />
    <col width="15%" />
    <col width="50%" />
  </colgroup>
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
<td>UserId</td>
<td>String</td>
<td>是</td>
<td>用户 ID。</td>
</tr>
<tr>
<td>StreamId</td>
<td>String</td>
<td>是</td>
<td>流 ID。</td>
</tr>
<tr>
<td>StreamType</td>
<td>String</td>
<td>是</td>
<td>流的类型：<ul><li><code>publish</code>：推流。</li><li><code>play</code>：拉流。</li></ul></td>
</tr>
<tr>
<td>StartTs</td>
<td>Number</td>
<td>是</td>
<td>开始时间，UTC 时间戳，单位为毫秒。</td>
</tr>
<tr>
<td>EndTs</td>
<td>Number</td>
<td>是</td>
<td>结束时间，UTC 时间戳，单位为毫秒。如果推流未结束，则可以用 0 或者当前时间戳表示进行中。</td>
</tr>
</tbody></table>

## 请求示例

```txt
https://analytics-api.zego.im/?Action=GetStreamBaseInfo
&RoomId=room
&UserId=userA
&StreamId=streamA
&StreamType=publish
&StartTs=1672565276000
&EndTs=1672565456000
&<公共请求参数>
```

## 响应参数

<table class="collapsible-table" >
  <colgroup>
    <col width="20%" />
    <col width="20%" />
    <col width="60%" />
  </colgroup>
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
<td>操作结果描述。</td>
</tr>
<tr data-row-level="4">
<td>RequestId</td>
<td>String</td>
<td>请求 ID。</td>
</tr>
<tr data-row-level="5" data-row-child="true">
<td>Data</td>
<td>Object</td>
<td>响应数据。</td>
</tr>
<tr data-row-level="5-1" data-row-child="true">
<td>└Metrics</td>
<td>Array of Object</td>
<td>指标列表。</td>
</tr>
<tr data-row-level="5-1-1">
<td>&nbsp;&nbsp;└Metric</td>
<td>String</td>
<td>指标名，可能为下列名称：<ul><li>isp：网络服务提供商。</li><li>net_type：网络类型。</li><li>os_type：设备类型。</li><li>device_model：设备名称。</li><li>sdk_version：SDK 版本。</li><li>region：国家或地区。</li></ul></td>
</tr>
<tr data-row-level="5-1-2" data-row-child="true">
<td>&nbsp;&nbsp;└Values</td>
<td>Array of Object</td>
<td>指标值列表。</td>
</tr>
<tr data-row-level="5-1-2-1">
<td>&nbsp;&nbsp;&nbsp;&nbsp;└Value</td>
<td>String</td>
<td>指标值。<br />当 <code>Metric</code> 为 <code>net_type</code> 时，此字段为下列固定内容：<ul><li>2G: 2G 网络。</li><li>3G: 3G 网络。</li><li>4G: 4G 网络。</li><li>5G: 5G 网络。</li><li>WIFI: 无线网络。</li><li>LINE: 有线网络。</li><li>NONE: 无网络连接。</li><li>UNKNOWN: 网络类型未能识别。</li></ul>当 <code>Metric</code> 为其他值时，此字段内容不固定。</td>
</tr>
<tr data-row-level="5-1-2-2">
<td>&nbsp;&nbsp;&nbsp;&nbsp;└Timestamp</td>
<td>Number</td>
<td>UTC 时间戳，单位为毫秒。</td>
</tr>
</tbody></table>

### 响应示例

```json
{
    "Code": 0,
    "Message": "success",
    "Data": {
        "Metrics": [
            {
                "Metric": "net_type",
                "Values": [
                    {
                        "Timestamp": 1660634097767,
                        "Value": "WIFI"
                    }
                ]
            }
        ]
    },
    "RequestId": 1660645050860325000
}
```

### 返回码

| 返回码 | 说明 | 处理意见 |
|--------|------|----------|
| 0      | 成功。 | -        |
| 500    | 接口错误。 | 请联系 ZEGO 技术支持。 |
| 10001  | 参数格式错误。 | 请检查参数。 |
| 10002  | 参数错误或参数无效。 | 请检查参数。 |
| 30002  | 接口请求频率超过上限。 | 请确认对应接口的 QPS 限制，降低请求频率。 |
