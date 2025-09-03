
# 查询实时规模 

- - -

## 描述

获取最近 2 小时的实时推拉流并发数、房间并发数、在线用户数、最大房间用户数以及混流并发数。返回数据粒度为秒。

## 接口原型

- 请求方法：GET
- 请求地址：`https://analytics-api.zego.im/?Action=GetRealtimeUsage`
- 传输协议：HTTPS
- 调用频率限制（同一 AppID）：3 次/分，480 次/天
- 数据延迟：3分钟

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
<td>Metrics[]</td>
<td>Array of String</td>
<td>是</td>
<td>需要查询的指标，支持以下字符串：<ul><li>publish_concurrent：推流并发。</li><li>play_concurrent: 拉流并发。</li><li>room_concurrent: 房间并发。</li><li>online_user: 在线用户数。</li><li>max_room_user：最大房间用户数</li><li>mix_concurrent: 混流并发。</li></ul></td>
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
https://analytics-api.zego.im/?Action=GetRealtimeUsage
&Metrics[]=publish_concurrent
&Metrics[]=online_user
&StartTs=1672565276000
&EndTs=1672565456000
&<公共请求参数>
```

## 响应参数

<table class="collapsible-table" >
  <colgroup>
    <col width="25%" />
    <col width="25%" />
    <col width="50%" />
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
<td>Array</td>
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
<td>指标名称。</td>
</tr>
<tr data-row-level="5-1-2" data-row-child="true">
<td>&nbsp;&nbsp;└Values</td>
<td>Array of Object</td>
<td>指标值列表。</td>
</tr>
<tr data-row-level="5-1-2-1">
<td>&nbsp;&nbsp;&nbsp;&nbsp;└Timestamp</td>
<td>Number</td>
<td>UTC 时间戳，单位为毫秒。</td>
</tr>
<tr data-row-level="5-1-2-2">
<td>&nbsp;&nbsp;&nbsp;&nbsp;└Value</td>
<td>Number</td>
<td>指标值。</td>
</tr>
</tbody></table>

## 响应示例

```json
{
    "Code": 0,
    "Message": "success",
    "Data": {
        "Metrics": [
            {
                "Metric": "publish_concurrent",
                "Values": [
                    {
                        "Timestamp": 1660634097767,
                        "Value": 1000
                    }
                ]
            },
            {
                "Metric": "online_user",
                "Values": [
                    {
                        "Timestamp": 1660634097767,
                        "Value": 99999
                    }
                ]
            }
        ]
    },
    "RequestId": 1660645050860325000
}
```

## 返回码

| 返回码 | 说明 | 处理意见 |
|--------|------|----------|
| 0      | 成功。 | -        |
| 500    | 接口错误。 | 请联系 ZEGO 技术支持。 |
| 10001  | 参数格式错误。 | 请检查参数。 |
| 10002  | 参数错误或参数无效。 | 请检查参数。 |
| 30002  | 接口请求频率超过上限。	 | 请确认对应接口的 QPS 限制，降低请求频率。 |
