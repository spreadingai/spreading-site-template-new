# 开始视频流审核

- - -

## 描述

视频流审核是 ZEGO 实时音视频产品的互动扩展服务。开发者通过视频流审核接口，可以调用实时视频审核对视频中的音频和画面进行审核，包括音频的语义和特征（音调、音色、声纹、旋律等）识别，视频画面中的文字语义和内容的识别。ZEGO 会通过 [视频流审核回调](https://doc-zh.zego.im/article/19698) 或配置的自定义回调地址，把识别结果发送给开发者，开始视频流审核功能与 [结束视频流审核](https://doc-zh.zego.im/article/19654) 请结合使用。

<Warning title="注意">
使用该接口前，请参考 [控制台 - 云市场 - 数美内容审核](/console/cloud-market/shumei-moderation)，按照页面指引，自助开通 `数美内容审核` 相关权限。

</Warning>




## 接口原型

- 请求方法：POST

<Note title="说明">
  使用 POST 请求方法传递参数时：
  - Body 中的参数直接传 JsonObject 格式即可，无需序列化为 String 格式。
  - Headers 中，设置 “Content-type” 为 “application/json”。
  
</Note>




- 请求地址：`https://rtc-api.zego.im/?Action=StartCensorVideoV2`
- 传输协议：HTTPS
- 调用频率限制（同一个 AppID 下所有房间）：100 次/秒



## 请求参数

以下请求参数列表仅列出了接口请求参数和部分公共参数，完整公共参数列表请参考 完整公共参数列表请参考 [调用方式](/real-time-video-server/api-reference/accessing-server-apis#公共请求参数) 中的 “公共请求参数”。


| 参数 | 类型 | 是否必选 | 描述 |
|---|---|---|---|
| RoomId | String | 是 | 需要进行音频审核的房间 ID。<br/>默认会将该房间内的所有流送审，如果房间内有流不需要送审（比如受信任的用户所推的流），请在调用客户端 SDK `startPublishingStream` 推流时，将 `ZegoPulisherConfig.streamCensorshipFlag` 设置为不允许送审。 |
| EventId | String | 是 | 场景标识。<br/>通过该参数标识音频流对应的场景。审核策略可以根据场景进行调整，从而实现不同的场景审核尺度的控制。<br/><ul><li>直播：live_streaming。</li><li>1v1：private_chat。</li></ul>如果以上可选值不能完全满足您的使用诉求，请联系 ZEGO 技术支持。 |
| Language | String | 否 | 语言类型，对音频和截帧识别的语种类型。<ul><li>zh：中文（默认值）</li><li>en：英文</li><li>ar：阿拉伯语</li></ul>|
| AudioParam | Object | 否 | 音频的参数，不传则不审核音频流。 |
| └ RiskTypeList | Array of String | 否 | 风险审核类别。<br/>RiskTypeList 与 BusinessTypeList 至少一个不为空，如果二者同时为空，则不审核音频，仅审核视频。数组中可添加的值如下：<br/>音频语义：<ul><li>EROTIC：色情</li><li>DIRTY：辱骂</li><li>POLITY：涉政</li><li>BAN：违禁</li><li>VIOLENT：暴恐</li><li>ADVERT：广告</li></ul><br/>音频特征：<ul><li>MOAN：娇喘</li><li>ANTHEN：国歌识别</li><li>BANEDAUDIO：违禁歌曲</li><li>如需其他特征，请联系 ZEGO 技术支持。</li></ul>|
| └ BusinessTypeList | Array of String | 否 | 业务识别类别。<br/>RiskTypeList 与 BusinessTypeList 至少一个不为空，如果二者同时为空，则不审核音频，仅审核视频。数组中可添加的值如下：<br/>音频语义:<ul><li>MOINIR：未成年人   </li></ul><br/>音频特征：<ul><li>SING：唱歌</li><li>LANGUAGE：语种识别</li><li>VOICE：人声属性识别</li><li>如需其他特征，请联系 ZEGO 技术支持。</li></ul>音频流的识别并不仅限于违规内容，也可以辅助开发者进行业务运营。<br/>如果以上可选值无法满足您的业务诉求，请联系 ZEGO 技术支持。 |
| └ AudioLanguage | Array of String | 否 | 视频流中的音频语种。<br/>在需要识别音频的语义时，请准确传入该值。可选值：<br/><ul><li>zh：中文、ja：日语、ko：韩语、th：泰语</li><li>vi：越南语、ms：马来语、tl：菲律宾语、id：印尼语</li><li>hi：印地语中、ar：阿拉伯语、tr：土耳其语、en：英文</li><li>es：西班牙语、pt：葡萄牙语、it：意大利语、fr：法语</li><li>de：德语、ru：俄语</li></ul> |
| └ ReturnAllText | Int32 | 否 | 是否返回当前 10s 片段的所有文本。<ul><li>0：（默认值）返回风险等级为非 PASS 的音频片段文本。</li><li>1：返回所有风险等级的音频文本片段。</li></ul><br/>审核结果的风险等级将分为以下三类：<br/>PASS：正常内容，建议直接放行。<br/>REVIEW：可疑内容，建议人工审核。<br/>REJECT：违规内容，建议直接拦截。<br/> |
| └ ReturnPreText | Int32 | 否 | 是否返回违规片段的前一个片段文本。<ul><li>0：（默认值）不返回违规片段前一个 10s 片段文字。</li><li>1：返回违规片段前一个 10s 片段文字。</li></ul> |
| └ ReturnPreAudio | Int32 | 否 | 是否返回违规片段的前一个音频片段链接。<ul><li>0：（默认值）不返回违规片段前一个 10s 片段音频，只返回违规片段音频链接。</li><li>1：返回违规片段前一个 10s 片段音频链接。</li></ul> |
| └ ResultCallbackUrl | String | 否 | 自定义审核结果的回调地址。<br/>如果您需要将此次审核任务的审核结果，通过其他的回调地址抛出，可以通过本参数实现。如果不需要，可以在 ZEGO 控制台配置统一的回调地址，详情请参考 [控制台 - 云市场 - 数美内容审核](/console/cloud-market/shumei-moderation#配置音频视频流审核回调地址)。 |
| └ StatusCallbackUrl | String | 否 | 自定义审核状态回调地址。<br/>如果您需要将此次审核任务的审核状态，通过其他的回调地址抛出，可以通过本参数实现。如果不需要，可以在 ZEGO 后台配置统一的回调地址，详情请参考 [控制台 - 云市场 - 数美内容审核](/console/cloud-market/shumei-moderation#配置音频视频流审核回调地址)。 |
| VideoParam | Object | 是 | 视频审核相关参数。 |
| └ RiskTypeList | Array of String | 否 | 风险审核类别。<br/> RiskTypeList 与 BusinessTypeList 至少一个不为空。数组中可添加的值如下：<br/>画面文字语义：<ul><li>IMGTEXTRISK：基础违规识别，包含多个常见标签（涉政、暴恐、违禁、色情、辱骂、广告、灌水隐私、广告法）</li></ul>画面内容：<ul><li>POLITY：涉政</li><li>EROTIC：色情、性感</li><li>VIOLENT：暴恐、违禁</li><li>QRCODE：二维码</li><li>ADVERT：广告</li></ul>如果以上可选值无法满足您的业务诉求，请联系 ZEGO 技术支持。 |
| └ BusinessTypeList | Array of String | 否 | 业务识别类别。<br/> RiskTypeList 与 BusinessTypeList 至少一个不为空。数组中可添加的值：<br/>画面内容:<ul><li>AGE：未成年人</li><li>PHOTOMATERIALLOGO：CFP 等版权 LOGO，还支持其他十余种 LOGO，详情请联系技术支持了解。</li></ul>画面内容扩展：<ul><li>FACEDETECTION：人脸检测</li><li>BEAUTY：颜值打分</li></ul>视频流的识别并不仅限于违规内容，也可以辅助开发者进行业务运营。如果以上可选值无法满足您的业务诉求，请联系 ZEGO 技术支持。 |
| └ ReturnAllImg | Int32 | 否 | 视频流截帧的风险等级，建议传入 1。<br/><ul><li>0：（默认值）返回风险等级为非 PASS 的截帧审核信息。</li><li>1：返回所有风险等级的截帧审核信息。</li></ul>审核结果的风险等级将分为以下三类：<ul><li>PASS：正常内容，建议直接放行。</li><li>REVIEW：可疑内容，建议人工审核。</li><li>REJECT：违规内容，建议直接拦截。</li></ul> |
| └ DetectFrequency | Int32 | 否 | 截帧频率。<br/>单位：秒。默认为 3s 截帧一次进行审核。 |
| └ ResultCallbackUrl | String | 否 | 自定义审核结果的回调地址。<br/>如果您需要将此次审核任务的审核结果，通过其他的回调地址抛出，可以通过本参数实现。如果不需要，可以在 ZEGO 控制台配置统一的回调地址，详情请参考 [控制台 - 云市场 - 数美内容审核](/console/cloud-market/shumei-moderation#配置音频视频流审核回调地址)。 |
| └ StatusCallbackUrl | String | 否 | 自定义审核状态回调地址。<br/>如果您需要将此次审核任务的审核状态，通过其他的回调地址抛出，可以通过本参数实现。如果不需要，可以在 ZEGO 后台配置统一的回调地址，详情请参考 [控制台 - 云市场 - 数美内容审核](/console/cloud-market/shumei-moderation#配置音频视频流审核回调地址)。 |
| ReturnFinishInfo | Int32 | 否 | 审核任务结束时，是否进行“审核任务状态”回调。<ul><li>0：审核结束时不发送结束通知。</li><li>1：审核结束时发起结束通知。</li></ul> |



## 请求示例
- 请求 URL  
    ```
    https://rtc-api.zego.im/?Action=StartCensorVideoV2
    &<公共请求参数>
    ```
- 请求消息体 
    ```json
    {
        "RoomId": "room_1",
        "EventId": "live_streaming",
        "Language": "zh",
        "AudioParam": {
            "RiskTypeList": [
                "ADLAW",
                "ADVERT",
                "AUDIOPOLITICAL",
                "DIRTY",
                "EROTIC",
                "MOAN",
                "POLITY"
            ],
            "ReturnAllText": 1,
            "ReturnPreAudio": 1,
            "ReturnPreText": 1,
            "ResultCallbackUrl": "",
            "StatusCallbackUrl": ""
        },
        "VideoParam": {
            "RiskTypeList": [
                "ADVERT",
                "EROTIC",
                "IMGTEXTRISK",
                "POLITY",
                "QRCODE",
                "VIOLENT"
            ],
            "ReturnAllImg": 1,
            "DetectFrequency": 5,
            "ResultCallbackUrl": "",
            "StatusCallbackUrl": ""
        },
        "ReturnFinishInfo": 1
    }
    ```

## 响应参数

| 参数 | 类型 | 描述 |
|---|---|---|
| [Code](#返回码) | Int32 | 返回码。 |
| Message | String | 操作结果描述。 |
| RequestId | String | 请求 ID。 |
| Data | Object | 响应数据。 |
| └ TaskId | String | 审核任务 ID，用于结束审核任务。 |




## 响应示例

```json
{
    "Code": 0,
    "Data": {
        "TaskId": "05e7a786a5191e8f5eb8e5851b01afcd"
    },
    "Message": "success",
    "RequestId": "TestRequestId1722597387688544000"
}
```

## 返回码

以下仅列出了接口业务逻辑相关的部分返回码，完整返回码请参考 [全局返回码](https://doc-zh.zego.im/)。

|返回码|说明| 处理建议 |
|-----|----|----|
| 50006、50007 |  HTTP 请求失败。 | 请稍后重试（建议 300s），或联系 ZEGO 技术支持。|
| 50009 | 审核失败。 | 请稍后重试（建议 300s），或联系 ZEGO 技术支持。|
| 50117 | 配置错误，未开通数美权限。 | 请参考 [控制台 - 云市场 - 数美内容审核](/console/cloud-market/shumei-moderation)，按照页面指引，自助开通 `数美内容审核` 相关权限。|
