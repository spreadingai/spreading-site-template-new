# 开始点播截图

- - -


## 描述

本接口用于对点播中的音视频媒体（比如 CDN 录制后文件）发起截图处理任务，包括“指定时间点截图”和“按时间间隔截图”。
- 指定时间点截图：文件开始播放后，将在所设置的时间点进行截图。
- 按时间间隔截图：文件开始播放后，将会根据所设置的时间间隔，反复进行截图，直至文件播放结束。

## 接口原型

- 请求方法：GET
- 请求地址：`https://rtc-api.zego.im/?Action=MediaThumbnails`
- 传输协议：HTTPS
- 调用频率限制：20 次/秒

## 请求参数

以下请求参数列表仅列出了接口请求参数和部分公共参数，完整公共参数列表请参考 完整公共参数列表请参考 [调用方式](/real-time-voice-server/api-reference/accessing-server-apis#公共请求参数) 中的 “公共请求参数”。

<table>
  
<tbody><tr>
<th>参数</th>
<th>类型</th>
<th>是否必选</th>
<th>描述</th>
</tr>
<tr>
<td>Vendor</td>
<td>String</td>
<td>是</td>
<td>对应的 CDN 厂商：<br/><ul><li>Tencent：腾讯云。</li><li>Huawei：华为云。</li></ul></td>
</tr>
<tr>
<td>FileId</td>
<td>String</td>
<td>是</td>
<td>
文件唯一标识。各 CDN 厂商的录制文件唯一标识不同：<br/>
<ul>
<li>腾讯云：FileID。</li><li>华为云：ObsObject。</li>
</ul>
您可以通过以下方式获取：
<ul>
<li><a href="https://doc-zh.zego.im/article/19690" target="blank">录制文件生成回调</a> 的参数 FileID 及 ObsObject。</li>
<li><a href="https://doc-zh.zego.im/article/19692" target="blank">媒体文件合并完成回调</a> 的参数 file_id。</li>
<li><a href="https://doc-zh.zego.im/article/19637" target="blank">检索媒体信息</a> 的参数 FileId。</li>
</ul>

<Warning title="注意">
ZEGO 不会对“传入的 FileId 文件是否真实存在”进行验证，请您注意填写正确的 FileId；传入错误的 FileId，响应参数中的 Code 为 1000。
</Warning>

</td>
</tr>
<tr>
<td>Type</td>
<td>String</td>
<td>是</td>
<td>
截图方式。
<ul>
<li>指定时间点截图：SnapshotByTimeOffset。</li><li>按时间间隔截图：SampleSnapshot。</li>
</ul>
</td>
</tr>
<tr>
<td>Definition</td>
<td>Number</td>
<td>否</td>
<td>截图模板 ID，请联系 ZEGO 技术支持获取。<br/><b>仅对 Vendor 取值为 Tencent 有效且为必填项，取值为 Huawei 无效。</b><br/></td>
</tr>
<tr>
<td>ExtTimeOffsetSet[]</td>
<td>Array of Number</td>
<td>否</td>
<td>需要截图的时间点，单位秒。<br/><b>Type 取值为 SnapshotByTimeOffset 时必填。</b><br/></td>
</tr>
<tr>
<td>Interval</td>
<td>Number</td>
<td>否</td>
<td>需要连续截图的时间间隔，单位秒。<br/><b>仅对 Vendor 取值为 Huawei 有效且为必填项，取值为 Tencent 时无效。</b><br/></td>
</tr>
</tbody></table>


## 请求示例
```
https://rtc-api.zego.im/?Action=MediaThumbnails
&Vendor=Huawei
&FileId=/record/pickrecord/command_record/clarechen_test/2024-11-13-06-10-48.mp4
&Interval=2
&Type=SampleSnapshot
&<公共请求参数>

https://rtc-api.zego.im/?Action=MediaThumbnails
&Vendor=Tencent
&FileId=1397757897438985100
&Definition=10
&ExtTimeOffsetSet[]=1
&ExtTimeOffsetSet[]=2
&Type=SnapshotByTimeOffset
&<公共请求参数>
```

## 响应参数

| 参数 | 类型 | 描述 |
|---|---|---|
| Code | Number | 返回码。 |
| Message | String | 操作结果描述。 |
| RequestId | String | 请求 ID，由 ZEGO 服务端返回。 |
| Data | Object | 响应数据。 |
| └ Tencent | Array of Object | 腾讯云返回内容（Vendor 为 Tencent 时返回），详情可见[Tencent](#tencent)。 |
| └ Huawei | Array of Object | 华为云返回内容（Vendor 为 Huawei 时返回），详情可见[Huawei](#huawei)。 |

<a id="tencent"></a>
**Tencent**
| 参数 | 类型 | 描述 |
|---|---|---|
| TaskId | String | 全局唯一标识点播截图任务的任务 ID。 |
| RequestId | String | 唯一请求 ID。<br/>如需 ZEGO 技术支持定位问题，需要提供该 RequestId。 |

<a id="huawei"></a>
**Huawei**
| 参数 | 类型 | 描述 |
|---|---|---|
| task_id | String | 全局唯一标识点播截图任务的任务 ID。 |



## 响应示例

```json
{
    "Code":0,
    "Message":"success",
    "Data":{
        "Tencent":{
            "TaskId":"1500030200-procedurev2-afc1fe7dfe51cd88a5d588cacba53393tt0",
            "RequestId":"474284b3-d722-490a-ba2c-de0b472eab83"}
    }
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
| 41003  | 文件不存在。 | 请确认文件格式、文件 ID 等是否正确。|
