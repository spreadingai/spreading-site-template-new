# 停止 CDN 录制

---

## 描述

调用本接口停止 CDN 录制。相关回调请参考 [录制文件生成回调](https://doc-zh.zego.im/article/19690)。



## 接口原型

- 请求方法：GET
- 请求地址：`https://rtc-api.zego.im/?Action=StopCDNRecord`
- 传输协议：HTTPS
- 调用频率限制：20 次/秒

## 请求参数

以下请求参数列表仅列出了接口请求参数和部分公共参数，完整公共参数列表请参考 完整公共参数列表请参考 [调用方式](/real-time-video-server/api-reference/accessing-server-apis#公共请求参数) 中的 “公共请求参数”。


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
    <td>StreamId[]</td>
    <td>Array of String</td>
    <td>是</td>
    <td>流 ID 列表。<br />以同时停止录制 “cdn01” 和 “cdn02” 两个流为例，请求的参数为：StreamId[]=cdn01和StreamId[]=cdn02。</td>
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
</tbody>
</table>


## 请求示例

```
https://rtc-api.zego.im/?Action=StopCDNRecord
&StreamId[]=cdn01
&StreamId[]=cdn02
&Vendor=Tencent
&<公共请求参数>
```

## 响应参数


| 参数 | 类型 | 描述 |
|---|---|---|
| Code | Number | 返回码。 |
| Message | String | 操作结果描述。 |
| RequestId | String | 请求 ID，由 ZEGO 服务端返回。 |
| Data | Object | 响应数据。 |
| └ Tencent | Array of Object | <code>腾讯云</code> 返回内容（Vendor 为 Tencent 时返回），详情可见 [Tencent](#tencent)。 |
| └ Ws | Object | <code>网宿</code> 返回内容（Vendor 为 Ws 时返回），详情可见 [Ws](#ws)。 |
| └ Huawei | Array of Object | <code>华为云</code> 返回内容（Vendor 为 Huawei 时返回），详情可见 [Huawei](#huawei)。 |

<a id="tencent"></a>
**Tencent**
| 参数 | 类型 | 描述 |
|---|---|---|
| StreamName | String | 流名称，即请求参数中的 StreamId。 |
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
        "Tencent":[//此 Key 仅对 Vendor 设置为 Tencent 有效
            {
                "StreamName":"cdn01",
                "RequestId":"d39548da-fbd4-4dce-8023-cfccd28a9963",
                "Code":"",
                "Message":""
            }
        ],
        "Ws":{//此 Key 仅对 Vendor 设置为 Ws 有效
            "call_time":"2022-05-26 11:46:06",
            "http_code":200,
            "list":[
                {
                    "http_code":200,
                    "id":"test",
                    "msg":"success",
                    "persistentId":"202009a378bae528409f87dbe20717415676",
                    "task":"mp4"
                }
            ],
            "msg":null,
            "trace_id":"10021988-6472-4b6d-9f9a-6b5a6d4b6551"
        },
        "Huawei":[ //此 Key 仅对 Vendor 设置为 Huawei 有效
            {
                "StreamName":"hwtest",
                "RequestId":"f7b1e2f0ca92e7e90f8f0c8b96cds757",
                "Code":0,
                "Message":"success"            
            }
        ]
    },
    "RequestId":"4315169065145771656"
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
