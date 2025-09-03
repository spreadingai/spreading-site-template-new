# 开始音频流审核

- - -

## 描述

音频流审核是 ZEGO 实时音视频产品的互动扩展服务。开发者通过音频流审核接口，可以调用实时音频审核，包含音频语义识别和音频特征（音调、音色、声纹、旋律等）识别，ZEGO 会通过 [音频流审核回调](https://doc-zh.zego.im/article/21504) 或配置的自定义回调地址，把识别结果发送给开发者，开始音频流审核功能与 [结束音频流审核功能](https://doc-zh.zego.im/article/18722) 请结合使用。

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




- 请求地址：`https://rtc-api.zego.im/?Action=StartCensorAudioV2`
- 传输协议：HTTPS
- 调用频率限制（同一个 AppID 下所有房间）：100 次/秒



## 请求参数

以下请求参数列表仅列出了接口请求参数和部分公共参数，完整公共参数列表请参考 完整公共参数列表请参考 [调用方式](/shumei-moderation/accessing-server-apis#公共请求参数) 中的 “公共请求参数”。


<table>
  
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
<td>需要进行音频审核的房间 ID。<br />
默认会将该房间内的所有流送审，如果房间内有流不需要送审（比如受信任的用户所推的流），请在调用客户端 SDK `startPublishingStream` 推流时，将 `ZegoPulisherConfig.streamCensorshipFlag` 设置为不允许送审。</td>
</tr>
<tr>
<td>EventId</td>
<td>String</td>
<td>是</td>
<td>场景标识。<br />通过该参数标识音频流对应的场景。审核策略可以根据场景进行调整，从而实现不同的场景审核尺度的控制。<br />
<ul><li>直播：live_streaming。</li><li>语聊房：audio_room。</li><li>1v1：private_chat。</li></ul>
如果以上可选值不能完全满足您的使用诉求，请联系 ZEGO 技术支持。</td>
</tr>
<tr>
<td>ResultCallbackUrl</td>
<td>String</td>
<td>否</td>
<td>自定义审核结果的回调地址。<br />
如果您需要将此次审核任务的审核结果，通过其他的回调地址抛出，可以通过本参数实现。如果不需要，可以在 ZEGO 控制台配置统一的回调地址，详情请参考 [控制台 - 云市场 - 数美内容审核](/console/cloud-market/shumei-moderation#配置音频视频流审核回调地址)。</td>
</tr>
<tr>
<td>StatusCallbackUrl</td>
<td>String</td>
<td>否</td>
<td>自定义审核状态回调地址。<br />
如果您需要将此次审核任务的审核状态，通过其他的回调地址抛出，可以通过本参数实现。如果不需要，可以在 ZEGO 后台配置统一的回调地址，详情请参考 [控制台 - 云市场 - 数美内容审核](/console/cloud-market/shumei-moderation#配置音频视频流审核回调地址)。</td>
</tr>
<tr>
<td>IsMixingEnabled</td>
<td>Int32</td>
<td>否</td>
<td>是否通过混流方式送审。
<ul><li>0：默认值，不混流送审，即单流送审。房间内每条音频流独立审核。</li><li>1：混流送审，房间内所有音频流混成一路流。</li></ul>
混流送审可以节省音频审核的费用，但是相应地不容易准确区分违规的流和用户，请根据业务的实际情况选择合适的送审方式。</td>
</tr>
<tr>
<td>AudioLanguage</td>
<td>String</td>
<td>是</td>
<td>音频流语种。<br />在需要识别音频流的语义时，请准确传入该值。若以下语种无法满足需求请联系技术支持进行配置。<br />
zh：中文、ja：日语、ko：韩语、th：泰语<br />
vi：越南语、ms：马来语、tl：菲律宾语、id：印尼语<br />
hi：印地语、ar：阿拉伯语、tr：土耳其语、en：英文<br />
es：西班牙语、pt：葡萄牙语、it：意大利语、fr：法语<br />
de：德语、ru：俄语</td>
</tr>
<tr>
<td>RiskTypeList</td>
<td>Array of String</td>
<td>是</td>
<td>
风险类型列表。<br />RiskTypeList 与 BusinessTypeList 至少一个不为空，数组中可添加的值如下：
<ul>
<li>
音频语义
<ul>
<li>ADLAW：违反广告法</li>
<li>EROTIC：色情</li>
<li>DIRTY：辱骂</li>
<li>POLITY：涉政</li>
<li>BAN：违禁</li>
<li>VIOLENT：暴恐</li>
<li>ADVERT：广告</li>
</ul>
</li>
<li>
音频特征：
<ul>
<li>MOAN：娇喘</li>
<li>ANTHEN：国歌识别</li>
<li>BANDAUDIO：违禁歌曲</li>
<li>AUDIOPOLITICAL：详情请联系 ZEGO 技术支持。</li>
</ul>
</li>
</ul></td>
</tr>
<tr>
<td>BusinessTypeList</td>
<td>Array of String</td>
<td>否</td>
<td>
业务识别类别。<br />RiskTypeList 与 BusinessTypeList 至少一个不为空，数组中可添加的值如下：<br />
<ul>
<li>
音频语义：
<ul>
<li>MOINIR：未成年人</li>
</ul>
</li>
<li>
音频特征：
<ul>
<li>SING：唱歌</li>
<li>LANGUAGE：语种识别</li>
<li>VOICE：人声属性识别</li>
</ul></li></ul>

音频流的识别并不仅限于违规内容，也可以辅助开发者进行业务运营。
如果以上可选值无法满足您的业务诉求，请联系 ZEGO 技术支持。
</td>
</tr>
<tr>
<td>LabelLanguage</td>
<td>String</td>
<td>是</td>
<td>
回调信息中标签的语种类型（Label 相关）。
- zh：中文。
- en：英文。
</td>
</tr>
<tr>
<td>ReturnAllText</td>
<td>Int32</td>
<td>否</td>
<td>
是否返回当前 10s 片段的所有文本。<br />审核结果的风险等级将分为以下三类：<br />
PASS：正常内容，建议直接放行。<br />REVIEW：可疑内容，建议人工审核。<br />REJECT：违规内容，建议直接拦截。<br />
- 0：返回风险等级为非 pass 的音频片段文本（默认值）。
- 1：返回所有风险等级的音频文本片段。
</td>
</tr>
<tr>
<td>ReturnPreText</td>
<td>Int32</td>
<td>否</td>
<td>
是否返回违规片段的前一个片段语义。
- 0：不返回违规片段前一个片段文字。
- 1：返回违规片段前一个片段文字。
</td>
</tr>
<tr>
<td>ReturnPreAudio</td>
<td>Int32</td>
<td>否</td>
<td>
是否返回违规片段的前一个音频片段链接。
- 0：不返回违规片段的前一个音频片段链接，只返回违规片段音频链接。（默认值）
- 1：返回违规片段前一个片段音频链接。
</td>
</tr>
<tr>
<td>ReturnFinishInfo</td>
<td>Int32</td>
<td>否</td>
<td>
审核任务结束时，是否进行“审核任务状态”回调。
- 0：审核结束时不发送结束通知。
- 1：审核结束时发起结束通知。
</td>
</tr>
</tbody></table>



## 请求示例

- 请求 URL  
    ```
    https://rtc-api.zego.im/?Action=StartCensorAudioV2
    &<公共请求参数>
    ```
- 请求消息体 
    ```json
    {
        "RoomId": "room_1",
        "IsMixingEnabled": 0,
        "EventId": "live_streaming",
        "RiskTypeList": [
            "ADLAW",
            "ADVERT",
            "AUDIOPOLITICAL",
            "BAN",
            "DIRTY",
            "EROTIC",
            "MOAN",
            "POLITY",
            "VIOLENT"
        ],
        "AudioLanguage": "zh",
        "LabelLanguage": "zh",
        "ReturnAllText": 1,
        "ReturnPreText": 1,
        "ReturnPreAudio": 1,
        "ReturnFinishInfo": 1,
        "ResultCallbackUrl": "",
        "StatusCallbackUrl": ""
    }
    ```

## 响应参数

| 参数 | 类型 | 描述 |
|---|---|---|
| [Code](#返回码) | Int32 | 返回码。|
| Message | String | 操作结果描述。 |
| RequestId | String | 请求 ID。 |
| Data | Object | 响应数据。 |
| └ TaskId | String | 审核任务 ID，用于结束审核任务。 |


## 响应示例

```json
{
    "Code":0,
    "Message":"success",
    "RequestId":"TestRequestId1635941437248027000",
    "Data":{
      "TaskId":"15515d8fef61801b05c22e0ebbe8681f"
    }
}
```

## 返回码

以下仅列出了接口业务逻辑相关的部分返回码，完整返回码请参考 [全局返回码](https://doc-zh.zego.im/)。

|返回码|说明| 处理建议 |
|-----|----|----|
| 50006、50007 |  HTTP 请求失败。 | 请稍后重试（建议 300s），或联系 ZEGO 技术支持。|
| 50009 | 审核失败。 | 请稍后重试（建议 300s），或联系 ZEGO 技术支持。|
| 50117 | 配置错误，未开通数美权限。 | 请参考 [控制台 - 云市场 - 数美内容审核](/console/cloud-market/shumei-moderation)，按照页面指引，自助开通 `数美内容审核` 相关权限。|

<Content />

