# 查询媒体文件任务

- - -

## 描述

本接口用于查询 [合并媒体文件](https://doc-zh.zego.im/article/19641)、[开始点播转码](https://doc-zh.zego.im/article/19645) 及 [开始点播截图](https://doc-zh.zego.im/article/21352) 任务的详细信息，作为 [媒体文件合并完成回调](https://doc-zh.zego.im/article/19692) 和 [点播转码完成回调](https://doc-zh.zego.im/article/19694) 的补充。

本接口支持查询“合并任务”、“转码任务”及“截图任务”的进度；任务完成后，也可以通过本接口获取合并文件或转码文件的播放地址。

## 接口原型

- 请求方法：GET
- 请求地址：`https://rtc-api.zego.im/?Action=DescribeMediaTask`
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
<td>TaskId</td>
<td>String</td>
<td>是</td>
<td>需要查询的任务 ID，即 <a href="https://doc-zh.zego.im/article/19641" target="_blank">合并媒体文件</a>、<a href="https://doc-zh.zego.im/article/19645" target="_blank">开始点播转码</a> 及 <a href="https://doc-zh.zego.im/article/21352" target="_blank">开始点播截图</a> 接口响应参数中 Data 内携带的 TaskId。</td>
</tr>
<tr>
<td>Vendor</td>
<td>String</td>
<td>是</td>
<td><p>可能的取值及对应的 CDN 厂商：</p><ul><li>Tencent：腾讯云。<li>Huawei：华为云。</li>
注意：当前华为云只支持查询截图任务，暂不支持查询合并任务和转码任务。</li></ul></td>
</tr>
</tbody></table>


## 请求示例

```
https://rtc-api.zego.im/?Action=DescribeMediaTask
&Vendor=Tencent
&TaskId=1234567890
&<公共请求参数>
```

## 响应参数

| 参数 | 类型 | 描述 |
|---|---|---|
| Code | Number | 返回码。 |
| Message | String | 操作结果描述。 |
| RequestId | String | 请求 ID，由 ZEGO 服务端返回。 |
| Data | Object | 响应数据。 |
| └ Tencent | Object | 腾讯云返回内容（Vendor 取值为 Tencent 时返回），详情可见[Tencent](#tencent)。 |
| └ Huawei | Object | 华为云返回内容（Vendor 取值为 Huawei 时返回），详情可见[Huawei](#huawei)。 |

<a id="tencent"></a>
**Tencent**
| 参数 | 类型 | 描述 |
|---|---|---|
| TaskId | String | 查询的任务 ID。 |
| Event | String | <p>任务的事件类型，返回值为：</p><ul><li>compose：媒体文件合并。</li><li>transcode：媒体文件点播转码。</li><li>SnapshotByTimeOffset：时间点截图任务。</li><li>SampleSnapshot：时间间隔截图任务。</li></ul> |
| Status | String | <p>任务状态。</p><ul><li>WAITING：等待中。</li><li>PROCESSING：处理中。</li><li>FINISH：已完成。</li><li>FAIL：失败。</li></ul> |
| FileId | String | 媒体文件合并或转码后的文件 ID，与 <a href="https://doc-zh.zego.im/article/19637" target="_blank">检索媒体信息</a> 接口响应参数中 Data 内携带的 FileId 相同。 |
| ReplayUrl | String | 媒体文件合并或转码后的文件回放地址，不超过 1024 字节。 |
| RequestId | String | 唯一请求 ID，由请求参数 Vendor 取值对应的 CDN 厂商（即腾讯云）返回，定位问题时需要提供该次请求的 RequestId。 |
| Message | String | 媒体文件任务失败的错误信息。 |
| ThumbnailsUrl | Array of String | 点播截图任务生成的文件链接。 |

<a id="huawei"></a>
**Huawei**
| 参数 | 类型 | 描述 |
|---|---|---|
| TaskId | String | 查询的任务 ID。 |
| Status | String | 任务状态。<ul><li>NO_TASK：任务不存在。</li><li>WAITING：等待处理。</li><li>PROCESSING：处理中。</li><li>SUCCEEDED：已完成。</li><li>FAILED：失败。</li><li>CANCELED：任务取消。</li></ul> |
| CreateTime | String | 任务开始时间，云厂商服务端 UTC 时间。 |
| EndTime | String | 任务结束时间，云厂商服务端 UTC 时间。 |
| FileName | Array of String | 点播截图任务生成的文件。 |


## 响应示例

```json
{
    "Code": 0,
    "Message": "success",
    "Data":  {
        "Tencent":  {
            "TaskId": "1400341231-ComposeMedia-6fdfc967d7eb12f5e9b27f52519f1afatt0",
            "Event": "compose" ,
            "Status": "FINISH",
            "FileId": "xxxxxxxx",
            "ReplayUrl": "https://xxxxx-xxxxxxxx.zego.im/xxxxxxxx/xxxxxxx/xxxxxx.mp4",
            "RequestId": "6aac31f4-xxxx-xxxx-xxxx-5cc10ce11a49",
            "Message": ""
            "ThumbnailsUrl":[
                "http://vod-tc-restorefile.zego.im/43b7b075vodtranscq1500030200/93172bfa1397757897438985100/sampleSnapshot/sampleSnapshot_10_0.jpg",
                "http://vod-tc-restorefile.zego.im/43b7b075vodtranscq1500030200/93172bfa1397757897438985100/sampleSnapshot/sampleSnapshot_10_2.jpg"]
        },
    },
        "Huawei":{
            "TaskId":"289665200",
            "Status":"SUCCEEDED",
            "CreateTime":"20241118065429",
            "EndTime":"20241118065430",
            "FileName":[
                "record/pickrecord/command_record/clarechen_test/0.jpg",
                "record/pickrecord/command_record/clarechen_test/10.jpg",]}
    "RequestId": ""
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
