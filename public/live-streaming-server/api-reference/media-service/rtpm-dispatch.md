# RTMP 推拉流调度

- - -

## 描述

调用本接口可以发起 RTMP 推拉流调度，支持 “pull” 和 “push” 两种调度模式。

当您需要自行通过 RTMP 协议，从 ZEGO 音视频云进行直播流的推流或拉流时，可以通过本接口获取 RTMP 的推流或拉流节点。开发者在客户端传入流 ID（StreamId）、调度模式（Type）、客户端 IP（ClientIP）和序列号（Sequence）后，ZEGO 媒体服务器（RTC 服务）返回调度结果集，供客户推拉流。

例如，当通过 OBS 等第三方推流工具进行 RTMP 推流时，需要进行推流调度；当需要第三方播放器拉 RTMP 流进行播放时，需要进行拉流调度。

<Warning title="注意">

首次使用本接口，需要联系 ZEGO 技术支持进行配置。

</Warning>



## 接口原型

- 请求方法：GET
- 请求地址：`https://rtc-api.zego.im/?Action=RTMPDispatchV2`
- 传输协议：HTTPS
- 调用频率限制（同一个 AppID 下）：40 次/秒


## 请求参数

以下请求参数列表仅列出了接口请求参数和部分公共参数，完整公共参数列表请参考 完整公共参数列表请参考 [调用方式](/live-streaming-server/api-reference/accessing-server-apis#公共请求参数) 中的 “公共请求参数”。

<Note title="说明">

测试环境下（详见 <a target="_blank" href="/live-streaming-server/api-reference/accessing-server-apis#公共请求参数">调用方式</a> 中的 “公共参数” 中的 IsTest 的参数说明），流 ID 需要加上 “zegotest-AppId-” 前缀。例如，流 ID 为 “test”，在 AppId 为 “123456789” 的测试环境下，流 ID 应为 “zegotest-123456789-test”。

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
<td><p>流 ID，长度不超过 256 的字符串。</p><ul><li>流 ID 由您自己定义。</li><li>在推流时，需要在整个 AppID 内全局唯一，若出现在同一个 AppID 内，不同的用户各推了一条流且流名相同，将会导致后推流的用户推流失败。</li><li>仅支持数字，英文字符 和 '-', '_'。</li></ul></td>
</tr>
<tr>
<td>Sequence</td>
<td>Int64</td>
<td>是</td>
<td>请求序列号；仅用于请求对帐，推荐使用时间戳（毫秒级别）。</td>
</tr>
<tr>
<td>Type</td>
<td>String</td>
<td>是</td>
<td>调度模式。&nbsp;
<ul><li>pull：获取 RTMP 的拉流节点。</li><li>push：获取 RTMP 的推流节点。</li><ul></ul></ul></td>
</tr>
<tr>
<td>ClientIP</td>
<td>String</td>
<td>否</td>
<td>
非必选，如有，则传入客户端 IP 地址，例如：119.23.242.129。

<Warning title="注意">
<p>当前不支持 IPv6 格式的 IP 地址。</p>
</Warning>

</td>
</tr>
</tbody></table>



## 请求示例

```
https://rtc-api.zego.im/?Action=RTMPDispatchV2
&StreamId=rtc01
&Sequence=1617249600001
&Type=pull
&ClientIP=47.102.152.118
&<公共请求参数>
```

## 响应参数

<table>
  
<tbody><tr>
<th>参数</th>
<th>类型</th>
<th>描述</th>
</tr>
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
<td>
RTMP 推流或拉流节点。

<Note title="说明">
获取此节点后，请在 2 小时内发起推流或拉流，否则可能导致节点被占用或下线。因此，建议每次进行 RTMP 推拉流时，都调用本接口获得最新的节点。
</Note>

</td>
</tr>
</tbody></table>



## 响应示例

```json
{
    "Code":0,
    "Message":"ok",
    "RequestId":"5094436160208407316",
    "Data":[
        "rtmp://81.69.49.115:1935/1540531164/caodantest"
    ]
}
```


## 返回码

以下仅列出了接口业务逻辑相关的部分返回码，完整返回码请参考 [全局返回码](https://doc-zh.zego.im/)。

|返回码|说明|处理建议|
|-----|------|-----|
| 1010、30002 | 接口调用频率过高。| 请降低接口请求频率。|
| 1001 | 调度失败。 | 请联系 ZEGO 技术支持处理。|
| 1002 | 推流节点为空。 | 请联系 ZEGO 技术支持处理。|
| 1003 | 拉流节点为空。 | 请联系 ZEGO 技术支持处理。|
| 1005 | App 不在线。 | 请联系 ZEGO 技术支持处理。|
| 1006 | 无效参数。 | 请联系 ZEGO 技术支持处理。|
| 30003 | 内部错误。| 请联系 ZEGO 技术支持处理。|
| 30004 | 参数 isTest 错误。| 请检查公共请求参数 isTest 是否正确。|
| 30005 | 无效的 AppId。 | 请检查 AppId 是否正确。|
| 30009 | 无效的 StreamId，流名不规范。 | 请检查 StreamId 是否符合流名编码规范。|
| 30010 | 无效的调度动作。 | 请检查 Type 是否正确。|
| 30011 | 无效的客户端 IP 地址。 | 请检查 ClientIP 是否正确。|


## 旧版接口使用说明

<Accordion title="使用 RTMPDispatch 访问 ZEGO 服务端" defaultOpen="false">
<Note title="说明">


**RTMPDispatchV2（推荐）** 和 **RTMPDispatch** 的区别是，访问 ZEGO 服务端时：

- 使用的是 `RTMPDispatchV2`，ZEGO 服务端返回的 Data 数据为 URL 形式。
- 使用的是 `RTMPDispatch`，ZEGO 服务端返回的 Data 数据为 IP Port 形式。

</Note>



请求地址：`https://rtc-api.zego.im/?Action=RTMPDispatch`

响应示例：

```json
{
    "Code":0,
    "Message":"ok",
    "RequestId":"5094436160208407316",
    "Data":[
        "81.69.49.115:1935"
    ]
}
```
</Accordion>
