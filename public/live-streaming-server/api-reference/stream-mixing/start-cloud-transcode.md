# 开始单流转码

- - -

## 简介

本文介绍如何调用服务端 API 接口，将指定的单路输入流，输出为不同分辨率、码率及帧率的视频流。

“客户端”基于转码模板触发的单流转码介绍，请参考 [单流转码](/real-time-video-android-java/live-streaming/single-stream-transcoding)；“服务端”的相关回调，请参考 [单流转码开始回调](https://doc-zh.zego.im/article/19686) 和 [单流转码停止回调](https://doc-zh.zego.im/article/19688)。


## 前提条件

在实现单流转码之前，请确保：

- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppId 和 ServerSecret，详情请参考 [控制台 - 项目信息](/console/project-info)。
- 已在 [ZEGO 控制台](https://console.zego.im) 自助接入服务开通“混流”服务权限，详情请参考 [控制台 - 服务配置 - 混流](/console/service-configuration/enable-stream-mixing-service)，或联系 ZEGO 技术支持开通。

## 接口原型

- 请求方法：POST

<Note title="说明">

  使用 POST 请求方法传递参数时：
  - Body 中的参数直接传 JsonObject 格式即可，无需序列化为 String 格式。
  - Headers 中，设置 “Content-type” 为 “application/json”。

</Note>




- 请求地址：`https://rtc-api.zego.im/?Action=StartCloudTranscode`
- 传输协议：HTTPS
- 调用频率限制：100 次/秒




## 请求参数

以下请求参数列表仅列出了接口请求参数和部分公共参数，完整公共参数列表请参考 完整公共参数列表请参考 [调用方式](/live-streaming-server/api-reference/accessing-server-apis#公共请求参数) 中的 “公共请求参数”。


***此接口中只有部分参数在开始混流后支持动态更新，未标注的则不支持动态更新，详情请参考下表中的参数描述。***

| 名称 | 类型 | 必填 | 描述 |
|---|---|---|---|
| TaskId | String | 是 | <p>任务 ID，单流转码任务的唯一标识，由开发者自定义。</p><p><b>重复调用“开始单流转码”接口，传入相同的 TaskId，可以直接更新转码任务信息。</b></p> |
| UserId | String | 是 | <p>发起转码任务的用户 ID，由开发者自定义。<b>同一个 TaskId 任务的用户 ID 需要一致，不同 TaskId 任务的用户 ID 需要保持不同。</b></p><p>通过 UserId 可以实现转码任务的用户归属，也就是该用户才能更新或者停止对应 TaskId 的转码任务，该功能需要联系 ZEGO 技术支持开通。</p> |
| TranscodeInput | Object | 是 | 转码任务的输入流设置。 |
| └ StreamId | String | 是 | <p>转码输入流 ID，该流 ID 来自 RTC 服务，仅支持数字、英文字符和 "-"、"_"。</p><Warning title="注意">StreamId 和 StreamUrl 二者取其一即可，若同时填写 StreamId 和 StreamUrl，则 StreamUrl 生效。</Warning> |
| └ StreamUrl | String | 是 | <p>转码输入流 URL，支持 RTMP 协议。</p><Warning title="注意">StreamId 和 StreamUrl 二者取其一即可，若同时填写 StreamId 和 StreamUrl，则 StreamUrl 生效。</Warning> |
| TranscodeOutput | Array of Object | 是 | 转码任务的输出流信息。 |
| └ StreamId | String | 是 | <p>输出流 ID。</p><ul><li>默认情况下，转码任务输出至 RTC 或低延迟直播产品。</li><li>您也可联系 ZEGO 技术支持，配置转码流输出至 ZEGO 代理的 CDN 直播产品，生效范围为整个 AppId。如果指定流输出至 CDN 直播产品，则必须设置 StreamUrl，不能配置转码默认输出至 ZEGO 代理 CDN。</li></ul><p><b>StreamId 和 StreamUrl 二者取其一即可，若填写了 StreamId，则 StreamUrl 不生效。</b></p> |
| └ StreamUrl | String | 是 | <p>仅支持 RTMP 协议，表示转码输出至 CDN 直播服务，观众可以从 CDN 直播拉转码流。</p><p><b>StreamId 和 StreamUrl 二者取其一即可，若填写了 StreamId，则 StreamUrl 不生效。</b></p> |
| └ TemplateId | Int | 是 | <p>单流转码输出模板 ID，ZEGO 提供了如下模板：</p><ul><li>0：输出分辨率为 360P 转码流。</li><li>1：输出分辨率为 540P 转码流。</li><li>2：输出分辨率为 720P 转码流。</li><li>3：输出分辨率为 1080P 转码流。</li><li>4：自定义模板。通用模板不能满足需求时，请使用自定义模板设置输出参数。</li></ul><p>请点击 <a href="https://doc-zh.zego.im/article/19605#template">单流转码的预设输出模板</a>，查看具体的预设模板配置参数。</p> |
| └ TemplateConfig | Object | 否 | 自定义设置输出流的视频参数，TemplateId 取值为 4 时，该参数必填，详情可见[TemplateConfig](#templateConfig)。 |
| Sequence | Int | 否 | 转码任务的序列号，用于保证时序，同个任务的参数修改需要保证序列号的递增。 |

<a id="templateconfig"></a>
**TemplateConfig**
| 名称 | 类型 | 必填 | 描述 |
|---|---|---|---|
| VideoEncId | Int | 否 | <p>输出流的视频编码格式。</p><ul><li>0：默认值，表示输出流编码格式与输入流编码格保持一致。</li><li>1：H264。</li><li>2：H265。</li></ul> |
| Fps | Int | 否 | <p>视频帧率，取值必须大于或等于 0。</p><ul><li>0：默认值，表示输出流帧率与输入流帧率保持一致。</li><li>其他值：转码流的输出帧率，最大帧率默认限制在 20 fps 以内。如果需要输出更大帧率的流，请联系 ZEGO 技术支持进行配置。</li></ul><p>目前暂时不支持输出不同帧率的转码流，各个输出流的帧率设置必须保持一致。</p> |
| GOP | Int | 否 | <p>转码输出流的关键帧间隔，取值必须大于 0，默认值为 2，单位：秒。</p><p>如果需要自定义，请联系 ZEGO 技术支持开启支持自定义。</p> |
| ShortEdgeAdaption | Int | 否 | <p>输出流的分辨率是否按照设置的 Width 作为短边，自适应横竖屏。</p><ul><li>0：默认值，直接按照设置的 Width 和 Height 输出。</li><li>1：按照设置的 Width 作为短边，并按照输入流的分辨率，等比例缩放后自适应横竖屏。</li></ul> |
| Width | Int | 否 | <p>宽，范围为 [0, 3000]，数值必须是 2 的倍数。</p><ul><li>0：默认值，与参数 Height 同时为 0，则表示输出流分辨率与输入流分辨率保持一致。</li><li>其他值：转码流自定义分辨率的宽。</li></ul><p><b>支持转码过程中实时更新。再次调用本接口，即可动态更新该参数。</b></p> |
| Height | Int | 否 | <p>高，范围为 [0, 3000]，数值必须是 2 的倍数。</p><ul><li>0：默认值，与参数 Width 同时为 0，则表示输出流分辨率与输入流分辨率保持一致。</li><li>其他值：转码流自定义分辨率的高。</li></ul><p><b>支持转码过程中实时更新。再次调用本接口，即可动态更新该参数。</b></p> |
| VideoBitrate | Int | 否 | <p>视频码率，取值必须大于或等于 0，单位为 bps。</p><ul><li>0：默认值，表示输出码率与输入流码率保持一致。</li><li>其他值：转码流的输出码率。</li></ul> |
| LowBitrateHD | Int | 否 | <p>是否开启“高清低码”功能。</p><ul><li>0：默认值，不开启。</li><li>1：开启。</li></ul><p>目前“高清低码”功能需要联系 ZEGO 技术支持开通权限，且仅在 VideoEncId 取值为 3（H265）时生效。</p> |


<h4 id="template">单流转码的预设输出模板</h4>

预设模版（TemplateId 取值为 0、1、2、3）的各项参数配置如下：

<table>

<tbody><tr>
<th>模版 ID</th>
<th>分辨率（短边）</th>
<th>码率（kbps）</th>
<th>其他配置</th>
</tr>
<tr>
<td>0（360P）</td>
<td>360</td>
<td>600</td>
<td rowspan="4"><ul><li>帧率：保持为原始输入流帧率。</li><li>GOP：默认为 2。</li><li>视频编码格式：默认为 H.264。</li><li>音频编码格式：默认为 AAC-LC。</li><li>预设模板按照短边自适应输出分辨率，根据转码模板的短边自适应输出长边。</li></ul></td>
</tr>
<tr>
<td>1（540P）</td>
<td>540</td>
<td>1000</td>
</tr>
<tr>
<td>2（720P）</td>
<td>720</td>
<td>1500</td>
</tr>
<tr>
<td>3（1080P）</td>
<td>1080</td>
<td>2000</td>
</tr>
</tbody></table>

## 请求示例

- 请求 URL
    ```
    https://rtc-api.zego.im/?Action=StartCloudTranscode
    &<公共请求参数>
    ```

- 请求消息体
    ```json
    {
        "TaskId": "2213699902971205739",
        "UserId": "456",
        "TranscodeInput": {
            "StreamId": "stream1"
        },
        "TranscodeOutput": [
            {
                "StreamId": "stream3",
                "TemplateId": 3
            }
        ]
    }
    ```


## 响应参数

| 参数 | 类型 | 描述 |
|---|---|---|
| Code | Number | 返回码。 |
| Message | String | 操作结果描述。 |
| RequestId | String | 请求 ID。 |



## 响应示例

```json
{
    "Code": 0,
    "Message": "success",
    "RequestId": "8472822294336370476"
}
```

## 返回码

以下仅列出了接口业务逻辑相关的部分返回码，完整返回码请参考 [全局返回码](https://doc-zh.zego.im/)。

|返回码|说明|处理建议|
|-----|------|-----|
| 110200002 | 输入参数错误。 | 请参考 Message 信息处理。|
| 110200150 | 单流转码的输入流不存在。 |请确认输入流 StreamId 或 StreamUrl 是否存在。|
| 110200151 | 单流转码任务失败。 |请重试，或联系 ZEGO 技术支持处理。|
