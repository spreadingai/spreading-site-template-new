# 开始点播转码

- - -

## 描述


用户进行 CDN 录制时，可以将录制好的媒体文件存放在 CDN 服务器上，并通过本接口对媒体文件进行点播转码，改变源文件的编码格式、分辨率和码率等属性，在不同终端、网络环境中进行播放。

<Warning title="注意">


首次使用本接口之前，请确认是否已经开通 CDN 录制服务。若未开通，请前往 [ZEGO 控制台](https://console.zego.im) 自助开通，详情请参考 [控制台 - 服务配置 - CDN](/console/service-configuration/activate-cdn-service)，或联系 ZEGO 技术支持开通，并配置回调地址，媒体文件转码完成后会通过 [点播转码完成回调](https://doc-zh.zego.im/article/19694) 通知。

</Warning>



开发者可以通过 [点播转码完成回调](https://doc-zh.zego.im/article/19694) 或 [查询媒体文件任务](https://doc-zh.zego.im/article/19643) 接口，查看转码任务的状态、文件回放地址等详细信息。


## 接口原型

- 请求方法：GET
- 请求地址：`https://rtc-api.zego.im/?Action=TranscodeMedia`
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
<td>Vendor</td>
<td>String</td>
<td>是</td>
<td><p>CDN 厂商名。</p><p>当前仅支持取值为 Tencent：腾讯云。</p></td>
</tr>
<tr>
<td>FileId</td>
<td>String</td>
<td>是</td>
<td>
<p>需要转码的源文件 ID，可以通过以下方式获取：</p><ul><li><a href="https://doc-zh.zego.im/article/19690" target="blank">录制文件生成回调</a> 的参数 FileID，仅 CDN 厂商为 Tencent 时会回调该参数。</li><li><a href="https://doc-zh.zego.im/article/19692" target="blank">媒体文件合并完成回调</a> 的参数 file_id。</li><li><a href="https://doc-zh.zego.im/article/19637" target="blank">检索媒体信息</a> 的参数 FileId。</li></ul>

<Warning title="注意">
ZEGO 不会对“传入的 FileId 文件是否真实存在”进行验证，请您注意填写正确的 FileId；传入错误的 FileId，响应参数中的 Code 为 1000。
</Warning>

</td>
</tr>
<tr>
<td>Resolution</td>
<td>String</td>
<td>是</td>
<td>
<p>转码后的媒体文件分辨率，有以下取值可选：</p><ul><li>360p</li><li>540p</li><li>720p</li></ul>

<Warning title="注意">
如果您需要自定义文件转码参数，请联系 ZEGO 技术支持配置自定义模板。对于常见的转码规格，默认的各分辨率转码模板对应的参数如下：

- 360p：封装格式 MP4，视频编码 H.264，码率 400 kbps，帧率25 fps，音频编码 AAC。
- 540p：封装格式 MP4，视频编码 H.264，码率 1000 kbps，帧率 25 fps，音频编码 AAC。
- 720p：封装格式 MP4，视频编码 H.264，码率 1800 kbps，帧率 25 fps，音频编码 AAC。

</Warning>

</td>
</tr>
</tbody></table>


## 请求示例

```
https://rtc-api.zego.im/?Action=TranscodeMedia
&Vendor=Tencent
&FileId=3270835011032053401
&Resolution=360p
&<公共请求参数>
```

## 响应参数

| 参数 | 类型 | 描述 |
|---|---|---|
| Code | Number | 返回码。 |
| Message | String | 操作结果描述。 |
| RequestId | String | 请求 ID，由 ZEGO 服务端返回。 |
| Data | Object | 响应数据。 |
| └ Tencent | Object | <code>腾讯云</code> 返回内容（Vendor 为 Tencent 时返回），详情可见[Tencent](#tencent)。 |

<a id="tencent"></a>
**Tencent**
| 参数 | 类型 | 描述 |
|---|---|---|
| TaskId | String | 媒体文件转码任务的唯一标识 ID，转码结果可以通过 <a href="https://doc-zh.zego.im/article/19694" target="blank">点播转码完成回调</a> 查看。 |
| RequestId | String | 唯一请求 ID，由请求参数 Vendor 取值对应的 CDN 厂商（即 Tencent）返回，定位问题时需要提供该次请求的 RequestId。 |



## 响应示例

```json
{
    "Code": 0,
    "Message": "success",
    "Data": {
        "Tencent": {
            "TaskId": "1500020831-procedurev2-58ed61fcdbb0f78a0bf15cabd8ae4713tt0",
            "RequestId": "1413c592-5ad4-404e-bfa1-589c32dbcee8"
        }
    },
    "RequestId": "3574501647605445341"
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
