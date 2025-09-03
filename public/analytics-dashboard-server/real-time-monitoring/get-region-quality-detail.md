
# 查看地区质量实时数据

- - -

## 描述

查询指定地区（或所有地区）和指定平台（或所有平台）上 1 小时内的质量数据。

## 接口原型

- 请求方法：GET
- 请求地址：`https://analytics-api.zego.im/?Action=GetRegionQualityDetail`
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
<td>Region</td>
<td>String</td>
<td>否</td>
<td>国家或地区的名称。<ul><li>all：默认值，表示所有国家和地区。</li><li>其他值：仅支持中文地名，具体值请参考 <a href="https://prism.zego.im">星图 - 实时监控 - 业务监控 - 用户体验</a> 筛选 <code>地区</code> 后的下拉列表。<img src="https://media-resource.spreading.io/docuo/workspace564/27e54a759d23575969552654cb45bf89/51a706c402.jpeg" /></li></ul></td>
</tr>
<tr>
<td>Platform</td>
<td>String</td>
<td>否</td>
<td>平台类型。<ul><li>all：默认值，全部平台。</li><li>native：Native 平台（指除了 Web 和 小程序之外的所有平台）。</li><li>web：Web 和小程序。</li></ul><Warning title="注意">有些指标可能不支持平台类型维度，返回值可能为空。</Warning></td>
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
https://analytics-api.zego.im/?Action=GetRegionQualityDetail
&Region=中国
&Platform=all
&StartTs=1659411617456000
&EndTs=1659415217000
&<公共请求参数>
```

## 响应参数

<table class="collapsible-table" >
  <colgroup>
    <col width="35%" />
    <col width="20%" />
    <col width="45%" />
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
<td>└List</td>
<td>Array of Object</td>
<td>指标列表。</td>
</tr>
<tr data-row-level="5-1-1">
<td>&nbsp;&nbsp;└Timestamp</td>
<td>Number</td>
<td>UTC 时间戳，单位为毫秒。</td>
</tr>
<tr data-row-level="5-1-2" data-row-child="true">
<td>&nbsp;&nbsp;└QualityInfo</td>
<td>Array of Object</td>
<td>质量列表。</td>
</tr>
<tr data-row-level="5-1-2-1">
<td>&nbsp;&nbsp;&nbsp;&nbsp;└Region</td>
<td>String</td>
<td>国家或地区的名称。</td>
</tr>
<tr data-row-level="5-1-2-2" data-row-child="true">
<td>&nbsp;&nbsp;&nbsp;&nbsp;└P2pDelayDetail</td>
<td>Object</td>
<td>端到端延迟。</td>
</tr>
<tr data-row-level="5-1-2-2-1">
<td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└Total</td>
<td>Number</td>
<td>分钟样本总数量。</td>
</tr>
<tr data-row-level="5-1-2-2-2">
<td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└Rate1</td>
<td>Number</td>
<td>在 (0, 400ms) 区间数量占比。</td>
</tr>
<tr data-row-level="5-1-2-2-3">
<td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└Rate2</td>
<td>Number</td>
<td>在 [400ms, 600ms) 区间数量占比。</td>
</tr>
<tr data-row-level="5-1-2-2-4">
<td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└Rate3</td>
<td>Number</td>
<td>在 [600ms, 800ms) 区间数量占比。</td>
</tr>
<tr data-row-level="5-1-2-2-5">
<td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└Rate4</td>
<td>Number</td>
<td>在 800ms 及以上数量占比。</td>
</tr>
<tr data-row-level="5-1-2-3" data-row-child="true">
<td>&nbsp;&nbsp;&nbsp;&nbsp;└P2pPlrDetail</td>
<td>Array of Object</td>
<td>端到端丢包率分布。</td>
</tr>
<tr data-row-level="5-1-2-3-1">
<td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└Total</td>
<td>Number</td>
<td>分钟样本总数量。</td>
</tr>
<tr data-row-level="5-1-2-3-2">
<td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└Rate1</td>
<td>Number</td>
<td>丢包率为 0 的数量占比。</td>
</tr>
<tr data-row-level="5-1-2-3-3">
<td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└Rate2</td>
<td>Number</td>
<td>丢包率在 (0, 5%) 的数量占比。</td>
</tr>
<tr data-row-level="5-1-2-3-4">
<td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└Rate3</td>
<td>Number</td>
<td>丢包率在 [5%, 10%) 的数量占比。</td>
</tr>
<tr data-row-level="5-1-2-3-5">
<td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└Rate4</td>
<td>Number</td>
<td>丢包率在 [10%, 50%) 的数量占比。</td>
</tr>
<tr data-row-level="5-1-2-3-6">
<td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└Rate5</td>
<td>Number</td>
<td>丢包率在 [50%, 100%]的数量占比。</td>
</tr>
<tr data-row-level="5-1-2-4" data-row-child="true">
<td>&nbsp;&nbsp;&nbsp;&nbsp;└VideoBreakDetail</td>
<td>Array of Object</td>
<td>视频卡顿率分布。</td>
</tr>
<tr data-row-level="5-1-2-4-1">
<td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└Total</td>
<td>Number</td>
<td>分钟样本总数量。</td>
</tr>
<tr data-row-level="5-1-2-4-2">
<td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└Rate1</td>
<td>Number</td>
<td>卡顿率为 0 的数量占比。</td>
</tr>
<tr data-row-level="5-1-2-4-3">
<td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└Rate2</td>
<td>Number</td>
<td>卡顿率在 (0, 20%) 的数量占比。</td>
</tr>
<tr data-row-level="5-1-2-4-4">
<td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└Rate3</td>
<td>Number</td>
<td>卡顿率在 [20%, 50%) 的数量占比。</td>
</tr>
<tr data-row-level="5-1-2-4-5">
<td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└Rate4</td>
<td>Number</td>
<td>卡顿率在 [50%, 100%) 的数量占比。</td>
</tr>
<tr data-row-level="5-1-2-4-6">
<td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└Rate5</td>
<td>Number</td>
<td>卡顿率在 100% 的数量占比。</td>
</tr>
<tr data-row-level="5-1-2-5" data-row-child="true">
<td>&nbsp;&nbsp;&nbsp;&nbsp;└AudioBreakDetail</td>
<td>Array of Object</td>
<td>音频卡顿率分布。</td>
</tr>
<tr data-row-level="5-1-2-5-1">
<td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└Total</td>
<td>Number</td>
<td>分钟样本总数量。</td>
</tr>
<tr data-row-level="5-1-2-5-2">
<td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└Rate1</td>
<td>Number</td>
<td>卡顿率为 0 的数量占比。</td>
</tr>
<tr data-row-level="5-1-2-5-3">
<td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└Rate2</td>
<td>Number</td>
<td>卡顿率在 (0, 20%) 的数量占比。</td>
</tr>
<tr data-row-level="5-1-2-5-4">
<td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└Rate3</td>
<td>Number</td>
<td>卡顿率在 [20%, 50%) 的数量占比。</td>
</tr>
<tr data-row-level="5-1-2-5-5">
<td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└Rate4</td>
<td>Number</td>
<td>卡顿率在 [50%, 100%) 的数量占比。</td>
</tr>
<tr data-row-level="5-1-2-5-6">
<td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└Rate5</td>
<td>Number</td>
<td>卡顿率在 100% 的数量占比。</td>
</tr>
<tr data-row-level="5-1-2-6" data-row-child="true">
<td>&nbsp;&nbsp;&nbsp;&nbsp;└LoginSuccessRateDetail</td>
<td>Array of Object</td>
<td>登录成功率。</td>
</tr>
<tr data-row-level="5-1-2-6-1">
<td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└LoginSuccessRate</td>
<td>Number</td>
<td>登录成功率。</td>
</tr>
<tr data-row-level="5-1-2-6-2">
<td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└LoginSuccessRate5s</td>
<td>Number</td>
<td>5 秒内登录成功率。</td>
</tr>
<tr data-row-level="5-1-2-7" data-row-child="true">
<td>&nbsp;&nbsp;&nbsp;&nbsp;└VideoFFTDetail</td>
<td>Array of Object</td>
<td>视频首帧耗时分布。</td>
</tr>
<tr data-row-level="5-1-2-7-1">
<td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└Total</td>
<td>Number</td>
<td>分钟样本总数量。</td>
</tr>
<tr data-row-level="5-1-2-7-2">
<td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└Rate1</td>
<td>Number</td>
<td>耗时在 (0, 500ms] 的数量占比。</td>
</tr>
<tr data-row-level="5-1-2-7-3">
<td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└Rate2</td>
<td>Number</td>
<td>耗时在 (500ms, 1000ms] 的数量占比。</td>
</tr>
<tr data-row-level="5-1-2-7-4">
<td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└Rate3</td>
<td>Number</td>
<td>耗时在 (1000ms, 2000ms] 的数量占比。</td>
</tr>
<tr data-row-level="5-1-2-7-5">
<td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└Rate4</td>
<td>Number</td>
<td>耗时在 (2000, 5000ms] 的数量占比。</td>
</tr>
<tr data-row-level="5-1-2-7-6">
<td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└Rate5</td>
<td>Number</td>
<td>卡顿率在 5000ms 以上的数量占比。</td>
</tr>
<tr data-row-level="5-1-2-8" data-row-child="true">
<td>&nbsp;&nbsp;&nbsp;&nbsp;└AudioFFTDetail</td>
<td>Array of Object</td>
<td>音频首帧耗时分布。</td>
</tr>
<tr data-row-level="5-1-2-8-1">
<td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└Total</td>
<td>Number</td>
<td>分钟样本总数量。</td>
</tr>
<tr data-row-level="5-1-2-8-2">
<td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└Rate1</td>
<td>Number</td>
<td>耗时在 (0, 500ms] 的数量占比。</td>
</tr>
<tr data-row-level="5-1-2-8-3">
<td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└Rate2</td>
<td>Number</td>
<td>耗时在 (500ms, 1000ms] 的数量占比。</td>
</tr>
<tr data-row-level="5-1-2-8-4">
<td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└Rate3</td>
<td>Number</td>
<td>耗时在 (1000ms, 2000ms] 的数量占比。</td>
</tr>
<tr data-row-level="5-1-2-8-5">
<td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└Rate4</td>
<td>Number</td>
<td>耗时在 (2000, 5000ms] 的数量占比。</td>
</tr>
<tr data-row-level="5-1-2-8-6">
<td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└Rate5</td>
<td>Number</td>
<td>卡顿率在 5000ms 以上的数量占比。</td>
</tr>
</tbody></table>

## 响应示例

```json
{
    "Code": 0,
    "Data": {
        "List": [
            {
                "Timestamp": 1676961480000,
                "QualityInfo": [
                    {
                        "Region": "中国",
                        "P2pDelayDetail": {
                            "Total": 298,
                            "Rate1": 0.9966,
                            "Rate2": 0,
                            "Rate3": 0,
                            "Rate4": 0.0034
                        },
                        "P2pPlrDetail": {
                            "Total": 1123,
                            "Rate1": 0.9386,
                            "Rate2": 0.0561,
                            "Rate3": 0.0018,
                            "Rate4": 0.0036,
                            "Rate5": 0
                        },
                        "VideoBreakDetail": {
                            "Total": 920,
                            "Rate1": 0.9304,
                            "Rate2": 0.0022,
                            "Rate3": 0.0109,
                            "Rate4": 0.0446,
                            "Rate5": 0.012
                        },
                        "AudioBreakDetail": {
                            "Total": 1123,
                            "Rate1": 0.951,
                            "Rate2": 0.016,
                            "Rate3": 0.0107,
                            "Rate4": 0.0098,
                            "Rate5": 0.0125
                        },
                        "LoginSuccessRateDetail": {
                            "LoginSuccessRate": 1,
                            "LoginSuccessRate5s": 1
                        },
                        "VideoFFTDetail": {
                            "Total": 39,
                            "Rate1": 0.9231,
                            "Rate2": 0,
                            "Rate3": 0.0513,
                            "Rate4": 0.0256,
                            "Rate5": 0
                        },
                        "AudioFFTDetail": {
                            "Total": 36,
                            "Rate1": 0.9167,
                            "Rate2": 0.0278,
                            "Rate3": 0.0556,
                            "Rate4": 0,
                            "Rate5": 0
                        }
                    }
                ]
            },
        ]
    },
    "Message": "success"
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
