# 开始 CDN 录制

---

## 描述

CDN 可配置是否对所有直播流录制，若需要选择录制某条具体的直播流，可调用本接口实现。相关回调请参考 [录制文件生成回调](https://doc-zh.zego.im/article/19690)。


在使用腾讯云提供的 CDN 服务时，要明确以下录制参数：
- 录制文件格式：支持 M3U8、FLV、MP4、AAC（单音频）和 MP3（单音频）。
- 录制间隔：录制文件的时长，单位为秒 (s)，取值范围为 300 s ～ 7200 s，默认值为 7200 s。此参数对 M3U8 录制文件格式无效。如果希望录制文件的时长超过 7200 s（2 小时），则需要使用录制文件合并接口对多个录制文件进行合并。
- 存储时长：明确录制文件的保留时长。

<Warning title="注意">
使用本接口之前需要明确录制参数，然后将录制参数同步给 ZEGO 技术支持进行配置，或前往 [ZEGO 控制台](https://console.zego.im) 自助配置，详情请参考 [控制台 - 服务配置 - CDN](/console/service-configuration/activate-cdn-service)。

</Warning>



## 接口原型

- 请求方法：GET
- 请求地址：`https://rtc-api.zego.im/?Action=StartCDNRecord`
- 传输协议：HTTPS
- 调用频率限制：20 次/秒

## 请求参数

以下请求参数列表仅列出了接口请求参数和部分公共参数，完整公共参数列表请参考 完整公共参数列表请参考 [调用方式](/live-streaming-server/api-reference/accessing-server-apis#公共请求参数) 中的 “公共请求参数”。


<table>

<tbody><tr>
<th>参数</th>
<th>类型</th>
<th>是否必选</th>
<th>描述</th>
</tr>
<tr>
<td>StreamId[]</td>
<td>Array of String</td>
<td>是</td>
<td>流 ID 列表。<br />以同时录制 “cdn01” 和 “cdn02” 两个流为例，请求的参数为：StreamId[]=cdn01和StreamId[]=cdn02。</td>
</tr>
<tr>
<td>Vendor</td>
<td>String</td>
<td>是</td>
<td>
<p>CDN 厂商名。</p>
<ul>
<li>Tencent：腾讯云。</li><li>Ws：网宿。</li><li>Huawei：华为云。</li>
</ul>
</td>
</tr>
<tr>
<td>EndTime</td>
<td>String</td>
<td>否</td>
<td><p>录制任务结束时间，Unix 时间戳。设置时间必须大于当前时间，且不能超过从当前时刻开始 24 小时之内的时间。</p>
<p><b>此参数仅在 Vendor 为 “Tencent” 时才生效。</b></p></td>
</tr>
</tbody></table>


## 请求示例

```
https://rtc-api.zego.im/?Action=StartCDNRecord
&StreamId[]=cdn01
&StreamId[]=cdn02
&Vendor=Tencent
&EndTime=1616415377
&<公共请求参数>
```

## 响应参数


| 参数 | 类型 | 描述 |
|---|---|---|
| Code | Number | 返回码。 |
| Message | String | 操作结果描述。 |
| RequestId | String | 请求 ID，由 ZEGO 服务端返回。 |
| Data | Object | 响应数据。 |
| └ Tencent | Array of Object | <code>腾讯云</code> 返回内容（Vendor 为 Tencent 时返回），详情可见[Tencent](#tencent)。 |
| └ Ws | Object | <code>网宿</code> 返回内容（Vendor 为 Ws 时返回），详情可见[Ws](#ws)。 |
| └ Huawei | Array of Object | <code>华为云</code> 返回内容（Vendor 为 Huawei 时返回），详情可见[Huawei](#huawei)。 |

<a id="tencent"></a>
**Tencent**
| 参数 | 类型 | 描述 |
|---|---|---|
| StreamName | String | 流名称，即请求参数中的 StreamId。 |
| TaskId | String | 任务 ID，全局唯一标识录制任务。 |
| RequestId | String | 唯一请求 ID，由请求参数 Vendor 取值对应的 CDN 厂商（即腾讯云）返回，定位问题时需要提供该次请求的 RequestId。 |
| Code | String | 当前流的错误码，请参考 Message 信息处理，或联系 ZEGO 技术支持。 |
| Message | String | 当前流错误信息。 |

<a id="ws"></a>
**Ws**
| 参数 | 类型 | 描述 |
|---|---|---|
| msg | String | 操作结果提示语。 |
| http_code | Number | 业务操作状态。 |
| trace_id | String | 流水号。 |
| call_time | String | 发起请求时间。 |
| list | Array of Object | 请求任务的处理结果列表。 |
| task | String | 录制文件的格式。 |
| id | String | 流名称，即请求参数中的 StreamId。 |
| http_code | Number | 该任务的操作状态，请参考 msg 信息处理，或联系 ZEGO 技术支持。 |
| msg | Object | 该任务的操作结果提示语。 |
| persistentId | String | 该任务的文件标识。 |

<a id="huawei"></a>
**Huawei**
| 参数 | 类型 | 描述 |
|---|---|---|
| StreamName | String | 流名称，即请求参数中的 StreamId。 |
| RequestId | String | 唯一请求 ID，由请求参数 Vendor 取值对应的 CDN 厂商（即 Huawei）返回，定位问题时需要提供该次请求的 RequestId。 |
| Code | Number | 当前流录制的错误码，请参考 Message 信息处理，或联系 ZEGO 技术支持。 |
| Message | String | 当前流录制的错误信息。 |



## 响应示例

```json
{
    "Code":0,
    "Message":"success",
    "Data":{
        "Tencent":[ //此 Key 仅对 Vendor 设置为 Tencent 有效
            {
                "StreamName":"cdn01",
                "TaskId":"UUpTbkZUQV5WQVxrRFtDUQIUB29FWwMeAxwALBxMAggNHxw7WRUWGBVeEzoTDl0CDEoFNgIESVpXQV9rRVRCXlVKWGlFV0daVENeaFdURVNY",
                "RequestId":"70628bcd-5652-4d5c-aa04-97956a4e771a",
                "Code":"",
                "Message":""
            }
        ],
        "Ws":{//此 Key 仅对 Vendor 设置为 Ws 有效
            "call_time": "2022-04-27 14:27:48",
            "http_code": 200,
            "list": [
                {
                    "http_code": 200,
                    "id": "vega_test",
                    "msg": "success",
                    "persistentId": "2020bc8b648883c64e7e81f03cf72b70b86f",
                    "task": "mp4"
                }
            ],
            "msg": null,
            "trace_id": "15ccf21b-f3c2-4ee3-aaad-d995393f80cd"
        },
        "Huawei":[ //此 Key 仅对 Vendor 设置为 Huawei 有效
            {
                "StreamName":"hwtest",
                "RequestId":"c373b2cc8a51159d4d60e0ec543csd88",
                "Code":0,
                "Message":"success"
            }
        ]
    },
    "RequestId":"4191282558729715911"
}
```

## 返回码

以下仅列出了接口业务逻辑相关的部分返回码，完整返回码请参考 [全局返回码](https://doc-zh.zego.im/)。

|返回码|说明|处理建议|
|-----|------|-----|
| 0 | 请求成功。 |-|
| 2 | 输入参数错误。 |-|
| 3 | 未开通相关权限。 | 请联系 ZEGO 技术支持。|
| 4 | CDN 类型不匹配。 | 请检查参数。|
| 5 | 配置错误。 | 请联系 ZEGO 技术支持。|
| 6 | 请求过于频繁。 | 请稍后重试。|
| 7 | 鉴权失败。 | 请检查鉴权参数是否正确。|
| 1000  | 请求失败。 | 请联系 ZEGO 技术支持。|
