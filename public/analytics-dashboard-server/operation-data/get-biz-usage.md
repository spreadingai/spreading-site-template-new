
# 查询业务规模

- - -

## 描述

本接口支持查询指定时间段内每日的实时音视频数据统计，包括房间并发峰数、用户并发数、推拉流并发数及推拉流累计总数。

<Note title="说明">查询时间段与您开通的套餐包中 <strong>数据存储和查询</strong> 有效期一致，详情请参考 [计费说明 - 套餐包功能](/analytics-dashboard/introduction/pricing#套餐包功能)。</Note>

## 接口原型

- 请求方法：GET
- 请求地址：`https://analytics-api.zego.im/?Action=GetBizUsage`
- 传输协议：HTTPS
- 调用频率限制（同一 AppID）：3 次/分，480 次/天

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
<td>StartDate</td>
<td>String</td>
<td>是</td>
<td>查询的起始日期，格式必须为 yyyyMMdd 的字符串格式。<Note title="说明">与 <code>EndDate</code> 配合使用时，二者所构成的日期区间不超过您开通的套餐包中 <strong>数据存储和查询</strong> 有效期，详情请参考 [计费说明 - 套餐包功能](/analytics-dashboard/introduction/pricing#套餐包功能)。</Note></td>
</tr>
<tr>
<td>EndDate</td>
<td>String</td>
<td>是</td>
<td>查询的结束日期，格式必须为 yyyyMMdd 的字符串格式。</td>
</tr>
<tr>
<td>Metrics[]</td>
<td>Array of String</td>
<td>是</td>
<td>需要查询的指标，支持以下字符串：<ul><li>room_concurrent: 房间并发。</li><li>user_concurrent: 房间用户并发。</li><li>publish_concurrent：推流并发。</li><li>play_concurrent: 拉流并发。</li><li>publish_count: 推流累计。</li><li>play_count: 拉流累计。</li></ul></td>
</tr>
</tbody></table>

## 请求示例

```txt
https://analytics-api.zego.im/?Action=GetBizUsage
&StartDate=20250110
&EndDate=20250112
&Metrics[]=publish_count
&Metrics[]=play_count
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
<td>&nbsp;&nbsp;&nbsp;&nbsp;└Date</td>
<td>String</td>
<td>日期，格式为"yyyyMMdd"。</td>
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
    "Data": {
        "Metrics": [
            {
                "Metric": "publish_count",
                "Values": [
                    {
                        "Date": "20250110",
                        "Value": 100
                    },
                    {
                        "Date": "20250111",
                        "Value": 30
                    },
                    {
                        "Date": "20250112",
                        "Value": 40
                    }
                ]
            },
            {
                "Metric": "play_count",
                "Values": [
                    {
                        "Date": "20250110",
                        "Value": 60
                    },
                    {
                        "Date": "20250111",
                        "Value": 20
                    },
                    {
                        "Date": "20250112",
                        "Value": 10
                    }
                ]
            }
        ]
    },
    "Message": "success",
    "RequestId": 1659512998878671000
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
