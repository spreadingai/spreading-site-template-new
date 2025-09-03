
# 查看用户拉流质量和性能明细

- - -

## 描述

本接口可用于根据用户 ID、时间段、房间 ID 和流 ID 查询拉流质量和设备性能。

## 接口原型

- 请求方法：GET
- 请求地址：`https://analytics-api.zego.im/?Action=GetPlayQualityDetail`
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
<td>Metrics[]</td>
<td>Array of String</td>
<td>是</td>
<td>需要查询的指标列表，详情见 [拉流质量指标说明](#拉流质量指标说明)。</td>
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

### 拉流质量指标说明

<table>
  <colgroup>
    <col width="20%"/>
    <col />
    <col />
    <col />
  </colgroup>
<tbody><tr>
<th>指标名称</th>
<th>字段名</th>
<th>数据类型</th>
<th>备注</th>
</tr>
<tr>
<td>音频码率</td>
<td>audio_bitrate</td>
<td>Int</td>
<td>单位：Kbps</td>
</tr>
<tr>
<td>音频接收帧率</td>
<td>audio_network_fps</td>
<td>Float</td>
<td>单位：fps</td>
</tr>
<tr>
<td>音频卡顿率</td>
<td>audio_break_percentage</td>
<td>Float</td>
<td>取值范围：0-100</td>
</tr>
<tr>
<td>视频码率</td>
<td>video_bitrate</td>
<td>Float</td>
<td>单位：Kbps</td>
</tr>
<tr>
<td>视频接收帧率</td>
<td>video_network_fps</td>
<td>Float</td>
<td>单位：fps</td>
</tr>
<tr>
<td>视频卡顿率</td>
<td>video_break_percentage</td>
<td>Float</td>
<td>取值范围：0-100</td>
</tr>
<tr>
<td>视频解码分辨率</td>
<td>decode_resolution</td>
<td>String</td>
<td>格式：宽*高</td>
</tr>
<tr>
<td>端到端延迟</td>
<td>peer_to_peer_delay</td>
<td>Float</td>
<td>单位: ms</td>
</tr>
<tr>
<td>端到端丢包</td>
<td>peer_to_peer_plr</td>
<td>Int</td>
<td>取值范围：0-100</td>
</tr>
<tr>
<td>下行延迟</td>
<td>downlink_delay</td>
<td>Int</td>
<td>单位: ms</td>
</tr>
<tr>
<td>下行丢包</td>
<td>downlink_packet_loss_rate</td>
<td>Int</td>
<td>取值范围：0-100</td>
</tr>
<tr>
<td>输出音量</td>
<td>rendered_sound_level</td>
<td>Int</td>
<td>取值范围：0-100</td>
</tr>
<tr>
<td>音频体验</td>
<td>mos</td>
<td>Float</td>
<td>取值范围：0-5<ul><li>大于 4.0 ：优，音质佳，清晰流畅。</li><li>3.5-4.0：良，音质较好，偶有音质损伤，但依然清晰。</li><li>3.0-3.5：中，音质一般，偶有卡顿，不是非常流畅，需要一点注意力才能听。</li><li>2.5-3.0：音质较差，卡顿频繁，需要集中精力才能听清。</li><li>2.0-2.5：音质很差，偶有杂音，部分语义丢失，难以交流。</li><li>小于2.0：音质非常差，杂音频现，大量语义丢失，完全无法交流。</li></ul></td>
</tr>
<tr>
<td>系统 CPU 使用率</td>
<td>sys_cpu_used</td>
<td>Int</td>
<td>取值范围：0-100</td>
</tr>
<tr>
<td>App CPU使用率</td>
<td>app_cpu_used</td>
<td>Int</td>
<td>取值范围：0-100</td>
</tr>
<tr>
<td>系统内存使用量</td>
<td>sys_mem_used</td>
<td>Int</td>
<td>单位：MB</td>
</tr>
<tr>
<td>App 内存使用量</td>
<td>app_mem_used</td>
<td>Int</td>
<td>单位：MB</td>
</tr>
</tbody></table>

## 请求示例

```txt
https://analytics-api.zego.im/?Action=GetPlayQualityDetail
&RoomId=room
&UserId=userA
&StreamId=streamA
&Metrics[]=audio_bitrate
&Metrics[]=downlink_delay
&StartTs=1672565276000
&EndTs=1672565456000
&<公共请求参数>
```

## 响应参数

<table class="collapsible-table">
  <colgroup>
    <col width="20%" />
    <col width="25%" />
    <col width="55%" />
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
<td>指标名。</td>
</tr>
<tr data-row-level="5-1-2" data-row-child="true">
<td>&nbsp;&nbsp;└Values</td>
<td>Array of Object</td>
<td>指标值列表。</td>
</tr>
<tr data-row-level="5-1-2-1">
<td>&nbsp;&nbsp;&nbsp;&nbsp;└Value</td>
<td>见上文 [拉流质量指标说明](#拉流质量指标说明)</td>
<td>指标值。</td>
</tr>
<tr data-row-level="5-1-2-2">
<td>&nbsp;&nbsp;&nbsp;&nbsp;└Timestamp</td>
<td>Number</td>
<td>UTC 时间戳，单位为毫秒。</td>
</tr>
</tbody></table>

## 响应示例

```json
{
    "Code": 0,
    "Data": {
        "Metrics": [
            {
                "Metric": "audio_bitrate",
                "Values": [
                    {
                        "Timestamp": 1659411660000,
                        "Value": 0
                    },
                    {
                        "Timestamp": 1659411720000,
                        "Value": 0
                    },
                    {
                        "Timestamp": 1659411780000,
                        "Value": 0
                    },
                    {
                        "Timestamp": 1659411840000,
                        "Value": 0
                    },
                    {
                        "Timestamp": 1659411900000,
                        "Value": 0
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
