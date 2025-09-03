# 视频流审核回调

---

## 描述

当开发者有视频流内容审核的需求时，在 [开始视频流审核](https://doc-zh.zego.im/article/19652) 任务后，将会以 POST 的形式对回调地址进行请求，获取音频流审核识别结果。当 [开始视频流审核](https://doc-zh.zego.im/article/19652) 任务中的 `ReturnFinishInfo` 参数为 1 时，审核任务结束后，会发起审核任务状态回调。

## 回调说明

- 请求方法：POST。

<Note title="说明">


  回调数据格式为 JSON，您需要对其进行 UrlDecode 解码。
   
</Note>



- 请求地址：请参考 [控制台 - 云市场 - 数美内容审核](/console/cloud-market/shumei-moderation)，按照页面指引，完成相关回调地址的配置。
- 传输协议：HTTPS/HTTP，建议使用 HTTPS。

## 回调参数

### 审核结果回调

视频流审核结果回调分为两部分：视频中的音频审核结果回调和画面审核结果回调，下面分别对这两部分进行介绍。

#### 音频审核结果回调

| 公共参数 | 类型 | 描述 |
|---|---|---|
| Event | String | 回调事件，此回调返回值为 `censor_video_v2_audio_result`。 |
| AppId | Number | AppID。 |
| Timestamp | Number | 服务器当前时间，Unix 时间戳（秒）。 |
| Nonce | String | 随机数。 |
| Signature | String | 签名，具体见  <a href="https://doc-zh.zego.im/article/19700" target="_blank">检验说明</a>。 |

| 业务参数 | 类型 | 描述 |
|---|---|---|
| Code | Number | 返回码。0 为成功。 |
| Message | String | 操作结果描述。 |
| TaskId | String | 审核任务的 TaskId。<br/>对应 [开始视频流审核](https://doc-zh.zego.im/article/19652) 响应参数中返回的 TaskId。 |
| ResultTaskId | String | 此次回调信息的 ID。 |
| Detail | Object | 10s 片段的审核结果详情。 |
| └ RiskLevel | String | 风险级别（code 为 0 时存在）。<br/>开发者可以根据该值对违规片段对应的音频流和用户进行相应处理。<br/>注意：该字段将返回的 10s 音频中，风险程度最高的“风险类型列表”（比如“涉政”通常风险程度更高），具体“风险类型列表”的风险程度优先级由数美审核内部决定。<br/><ul><li>PASS：正常内容，建议直接放行。</li><li>REVIEW：可疑内容，建议人工审核。</li><li>REJECT：违规内容，建议直接拦截。</li></ul> |
| └ Content | String | 视频流中音频识别出的文字内容。<br/><br/>当 ReturnPreText 值为 1，且当前音频片段的风险级别为 REJECT 时，返回当前 10 秒和前 10 秒，共20秒的音频片段文本内容。否则仅返回当前片段文本内容。 |
| └ AudioUrl | String | 10s 音频片段的 URL。 |
| └ PreAudioUrl | String | 仅当开始审核任务请求的参数 ReturnPreAudio=1 时，该参数有值，表示当前违规音频片段 + 前一个音频片段的 20s 音频片段的 URL 地址。 |
| └ RiskDescription | String | 当前 10s 片段中，风险程度最高的违规内容的具体“风险类型列表”及细分类别。<br/>将按照详细程度分为，一级标签，二级标签及三级标签。<br/>注意：仅供人了解风险原因时作为参考，请勿依赖该参数的值做逻辑处理。<br/><ul><li>RiskLevel 为 PASS 时，返回 “正常”。</li><li>命中自定义名单时，返回自定义名单名称。</li><li>其他情况展现形式为：一级标签：二级标签：三级标签。</li></ul> |
| └ RiskLabel1 | String | 一级标签。<br/>RiskLevel 为 PASS 时，返回 “normal”。 |
| └ RiskLabel2 | String | 二级标签。<br/>二级标签归属于一级标签，当 riskLevel 为 PASS 时为空。 |
| └ RiskLabel3 | String | 三级标签。<br/>三级标签归属于二级标签，当 riskLevel 为 PASS 时为空。 |
| └ VadStatus | Number | 音频片段的静音状态：<ul><li>0 ：静音片段。为静音片段时，其他部分字段将返回空，以实际回调内容为准。</li><li>1 ：非静音片段。</li></ul> |
| └ RiskDetail | Object | 风险详情，将展示 10s 片段中，风险程度最高的风险信息。<br/>例如当前 10s 片段命中“色情”和“涉政”两个“风险类型列表”，后台判定“涉政”的风险程度高于“色情”，则当前将返回“涉政”相关的风险详情，详情可见[RiskDetail](#riskDetail)。 |
| └ RiskInfoList | Array of Object | 10s 音频片段中，所有存在风险的信息列表。<br/>按照数美内部自定义的风险程度优先级，由大到小进行排序，详情可见[RiskInfoList](#riskInfoList)。 |
| └ BusinessInfoList | Array of Object | 所有业务信息列表。<br/>若以下字段无法满足您的需求，可联系技术支持进行调整，详情可见[BusinessInfoList](#businessInfoList)。 |
| AuxInfo | Object | 辅助信息。 |
| └ RoomId | String | 审核的房间 ID。 |
| └ ProcessBeginTime | Number | 10s 音频开始审核的时间（13 位 Unix 时间戳）。 |
| └ ProcessFinishTime | Number | 10s 音频结束审核的时间（13 位 Unix 时间戳）。 |

<a id="riskdetail"></a>
**RiskDetail**
| 公共参数 | 类型 | 描述 |
|---|---|---|
| RiskSource | Number | 风险来源：<ul><li>1000：无风险。</li><li>1001：音频语义。</li><li>1003：音频特征（如：音调、音色、声纹、旋律等）。</li></ul> |
| AudioText | String | 10s 音频语义转译的文本。 |
| MatchedLists | Array of Object | 命中的自定义名单（由开发者联系技术支持进行配置）。 |
| Name | String | 自定义名单名称。 |

<a id="riskinfolist"></a>
**RiskInfoList**
| 公共参数 | 类型 | 描述 |
|---|---|---|
| RiskLevel | Number | 风险级别（code 为 0 时存在）。开发者可以根据该值对违规片段对应的音频流和用户进行相应处理。<ul><li>PASS：正常内容，建议直接放行。</li><li>REVIEW：可疑内容，建议人工审核。</li><li>REJECT：违规内容，建议直接拦截。</li></ul> |
| RiskDescription | String | 当前 10s 片段中，风险程度最高的违规内容的具体“风险类型列表”及细分类别。<br/>将按照详细程度分为，一级标签，二级标签及三级标签。<br/>注意：仅供人了解风险原因时作为参考，请勿依赖该参数的值做逻辑处理。<br/><ul><li>RiskLevel 为 PASS 时，返回 “正常”。</li><li>命中自定义名单时，返回自定义名单名称。</li><li>其他情况展现形式为：一级标签：二级标签：三级标签。</li></ul> |
| RiskLabel1 | String | 一级标签。<br/>RiskLevel 为 PASS 时，返回 “normal”。 |
| RiskLabel2 | String | 二级标签。<br/>二级标签归属于一级标签，当 riskLevel 为 PASS 时为空。 |
| RiskLabel3 | String | 三级标签。<br/>三级标签归属于二级标签，当 riskLevel 为 PASS 时为空。 |
| RiskDetail | Object | 风险详情，将展示 10s 片段中，风险程度最高的风险信息。<br/>例如当前 10s 片段命中“色情”和“涉政”两个“风险类型列表”，后台判定“涉政”的风险程度高于“色情”，则当前将返回“涉政”相关的风险详情。 |
| RiskSource | Number | 风险来源：<ul><li>1000：无风险。</li><li>1001：音频语义。</li><li>1003：音频特征（如：音调、音色、声纹、旋律等）。</li></ul> |
| AudioText | String | 10s 音频语义转译的文本。<br/>仅风险程度最高的风险信息此字段有值。 |
| MatchedLists | Array of Object | 命中的自定义名单（由开发者联系技术支持进行配置）。 |
| Name | String | 自定义名单名称。 |

<a id="businessinfolist"></a>
**BusinessInfoList**
| 公共参数 | 类型 | 描述 |
|---|---|---|
| BusinessDescription | String | 业务标签中文描述。<br/>格式
| BusinessLabel1 | String | 一级业务标签。 |
| BusinessLabel2 | String | 二级业务标签。 |
| BusinessLabe3 | String | 三级业务标签。 |


#### 画面审核结果回调

| 公共参数 | 类型 | 描述 |
|---|---|---|
| Event | String | 回调事件，此回调返回值为 `censor_video_v2_img_result`。 |
| AppId | Number | AppID。 |
| Timestamp | Number | 服务器当前时间，Unix 时间戳（秒）。 |
| Nonce | String | 随机数。 |
| Signature | String | 签名，具体见  <a href="https://doc-zh.zego.im/article/19700" target="_blank">检验说明</a>。 |

| 业务参数 | 类型 | 描述 |
|---|---|---|
| Code | Number | 返回码。0 为成功。 |
| Message | String | 操作结果描述。 |
| TaskId | String | 审核任务的 TaskId。<br/>对应 [开始视频流审核](https://doc-zh.zego.im/article/19652) 中响应参数中返回的 TaskId。 |
| ResultTaskId | String | 此次回调信息的 ID。 |
| Detail | Object | 截帧画面整体风险标签详情。 |
| └ RiskLevel | String | 风险级别（code 为 0 时存在）。<br/>开发者可以根据该值对违规片段对应的视频流和用户进行相应处理。<br/>注意：该字段将返回的截帧画面中，风险程度最高的“风险类型列表”（比如“涉政”通常风险程度更高），具体“风险类型列表”的风险程度优先级由数美审核内部决定。<ul><li>PASS：正常内容，建议直接放行。</li><li>REVIEW：可疑内容，建议人工审核。</li><li>REJECT：违规内容，建议直接拦截。</li></ul> |
| └ ImgUrl | String | 截帧画面地址。 |
| └ RiskDescription | String | 当前截帧画面中，风险程度最高的违规内容的具体“风险类型列表”及细分类别。<br/>将按照详细程度分为，一级标签，二级标签及三级标签。<br/>注意：仅供人了解风险原因时作为参考，请勿依赖该参数的值做逻辑处理。<br/><ul><li>RiskLevel 为 PASS 时，返回 “正常”。</li><li>命中自定义名单时，返回自定义名单名称。</li><li>其他情况展现形式为：一级标签：二级标签：三级标签。</li></ul> |
| └ RiskLabel1 | String | 一级标签。<br/>RiskLevel 为 PASS 时，返回 “normal”。 |
| └ RiskLabel2 | String | 二级标签。<br/>二级标签归属于一级标签，当 riskLevel 为 PASS 时为空。 |
| └ RiskLabel3 | String | 三级标签。<br/>三级标签归属于二级标签，当 riskLevel 为 PASS 时为空。 |
| └ RiskDetail | Object | 风险详情。<br/>将展示当前截帧画面中，风险程度最高的风险信息。例如当前截帧画面命中“色情”和“涉政”两个“截帧画面内容风险”，后台判定“涉政”的风险程度高于“色情”，则当前将返回“涉政”相关的风险详情，详情可见[RiskDetail](#riskDetail)。 |
| └ RiskInfoList | Array of Object | 所有风险详情信息，详情可见[RiskInfoList](#riskInfoList)。 |
| └ BusinessInfoList | Array of Object | 所有业务信息列表。<br/>若以下字段无法满足您的需求，可联系技术支持进行调整，详情可见[BusinessInfoList](#businessInfoList)。 |
| AuxInfo | Object | 辅助信息。 |
| └ RoomId | String | 审核的房间 ID。 |
| └ ImgTime | String | 截帧图片发生的绝对时间（北京时间）。 |

<a id="riskdetail"></a>
**RiskDetail**
| 公共参数 | 类型 | 描述 |
|---|---|---|
| RiskSource | Number | 风险来源：<ul><li>1000：无风险。</li><li>1001：文本风险。</li><li>1002：视觉图片风险。</li></ul> |
| FaceInfoList | Array of String | 截帧画面中涉政人物的名称及位置信息。<br/>当命中多个人脸时，数组元素最多列举 10 个。如果超过 10 个，选择 `probability` 最高的 10 个。 |
| Name | String | 人物名称。 |
| Id | String | 同一个人在当前截帧画面下的编号。<ul><li>截帧画面同一个位置下的人，在不同 `RiskLabel` 标签下的编号相同。</li><li>如果同一个人在同一个截帧画面中出现多次，将分配多个 ID。</li></ul> |
| FaceRatio | Float | 人脸占比，即人脸面积占截帧画面整个面积的比例。<br/>在区间 0～1，数值越大，人脸占比越高。 |
| Probability | Float | 置信度。<br/>可选值在 0～1 之间，值越大，可信度越高。 |
| Location | Array of Number | 人物位置信息。<br/>该数组有四个值，分别代表人脸左上角的坐标和右下角的坐标。<br/>例如， [207,522,340,567]：以截帧画面左上角为原点，207 代表的是人脸左上角的 x 坐标，522 代表人脸左上角的 y 坐标，340 代表的是人脸右下角的 x 坐标，567 代表的是人脸右下角的 y 坐标。 |
| OcrInfo | Object | 返回截帧画面中，通过 OCR 文字识别的内容。<br/>请求参数 `RiskTypeList` 中包含 `IMGTEXTRISK` 或 `ADVERT` 时存在。 |
| Text | String | 识别到文本信息。 |
| MatchedLists | Array of Object | 命中的自定义名单（由开发者联系技术支持进行配置）。 |
| Name | String | 自定义名单名称。 |

<a id="riskinfolist"></a>
**RiskInfoList**
| 公共参数 | 类型 | 描述 |
|---|---|---|
| RiskLevel | String | 风险级别（code 为 0 时存在）。<br/>开发者可以根据该值对违规截帧画面和用户进行相应处理。<br/><ul><li>PASS：正常内容，建议直接放行。</li><li>REVIEW：可疑内容，建议人工审核。</li><li>REJECT：违规内容，建议直接拦截。</li></ul> |
| Probability | Float | 置信度。<br/>可选值在 0～1 之间，值越大，可信度越高。 |
| RiskDescription | String | 当前截帧画面中，风险程度最高的违规内容的具体“风险类型列表”及细分类别。<br/>将按照详细程度分为，一级标签（例如违禁），二级标签（例如违禁品）及三级标签（例如烟草）。<br/>注意：仅供人了解风险原因时作为参考，请勿依赖该参数的值做逻辑处理。<br/><ul><li>RiskLevel 为 PASS 时，返回 “正常”。</li><li>命中自定义名单时，返回自定义名单名称。</li><li>其他情况展现形式为：一级标签：二级标签：三级标签。</li></ul> |
| RiskLabel1 | String | 一级标签。<br/>RiskLevel 为 PASS 时，返回 “normal”。 |
| RiskLabel2 | String | 二级标签。<br/>二级标签归属于一级标签，当 riskLevel 为 PASS 时为空。 |
| RiskLabel3 | String | 三级标签。<br/>三级标签归属于二级标签，当 riskLevel 为 PASS 时为空。 |
| RiskDetail | Object | 风险详情，内容同上方 RiskDetail 中的内容详情说明。 |
| RiskSource | Number | 风险来源：<ul><li>1000：无风险。</li><li>1001：文本风险。</li><li>1002：视觉图片风险。</li></ul> |
| FaceInfoList | Array of String | 截帧画面中涉政人物的名称及位置信息。<br/>当命中多个人脸时，数组元素最多列举 10 个。如果超过 10 个，选择 `probability` 最高的 10 个。 |
| Name | String | 人物名称。 |
| Id | String | 同一个人在当前截帧画面下的编号。<ul><li>截帧画面同一个位置下的人，在不同 `RiskLabel` 标签下的编号相同。</li><li>如果同一个人在同一个截帧画面中出现多次，将分配多个 ID。</li></ul> |
| FaceRatio | Float | 人脸占比，即人脸面积占截帧画面整个面积的比例。<br/>在区间 0～1，数值越大，人脸占比越高。 |
| Probability | Float | 置信度。<br/>可选值在 0～1 之间，值越大，可信度越高。 |
| Location | Array of Number | 人物位置信息。<br/>该数组有四个值，分别代表人脸左上角的坐标和右下角的坐标。<br/>例如， [207,522,340,567]：以截帧画面左上角为原点，207 代表的是人脸左上角的 x 坐标，522 代表人脸左上角的 y 坐标，340 代表的是人脸右下角的 x 坐标，567 代表的是人脸右下角的 y 坐标。 |
| OcrInfo | Object | 返回截帧画面中，通过 OCR 文字识别的内容。<br/>请求参数 `RiskTypeList` 中包含 `IMGTEXTRISK` 或 `ADVERT` 时存在。 |
| Text | String | 识别到文本信息。 |
| MatchedLists | Array of Object | 命中的自定义名单（由开发者联系技术支持进行配置）。 |
| Name | String | 自定义名单名称。 |

<a id="businessinfolist"></a>
**BusinessInfoList**
| 公共参数 | 类型 | 描述 |
|---|---|---|
| BusinessDescription | String | 业务标签中文描述。<br/>格式为"一级业务标签:二级业务标签:三级业务标签"的中文名称，如人像:人像姿态:坐姿。 |
| BusinessLabel1 | String | 一级业务标签。 |
| BusinessLabel2 | String | 二级业务标签。 |
| BusinessLabe3 | String | 三级业务标签。 |
| BusinessDetail | Object | 业务风险详情。 |
| FaceInfoList | Array of Object | 截帧画面中涉政人物的名称及位置信息。<br/>当命中多个人脸时，数组元素最多列举 10 个。如果超过10个，选择 `probability` 最高的 10 个。 |
| Name | String | 人物名称。 |
| Id | String | 同一个人在当前截帧画面下的编号。<ul><li>截帧画面同一个位置下的人，在不同 `RiskLabel` 标签下的编号相同。</li><li>如果同一个人在同一个截帧画面中出现多次，将分配多个 ID。</li></ul> |
| FaceRatio | Float | 人脸占比，即人脸面积占截帧画面整个面积的比例。<br/>在区间 0～1，数值越大，人脸占比越高。 |
| Probability | Float | 置信度。<br/>可选值在 0～1 之间，值越大，可信度越高。 |
| Location | Array of Number | 人物位置信息。<br/>该数组有四个值，分别代表人脸左上角的坐标和右下角的坐标。<br/>例如， [207,522,340,567]：以截帧画面左上角为原点，207 代表的是人脸左上角的 x 坐标，522 代表人脸左上角的 y 坐标，340 代表的是人脸右下角的 x 坐标，567 代表的是人脸右下角的 y 坐标。 |


### 审核任务状态回调

当 [开始视频流审核](https://doc-zh.zego.im/article/19652) 任务中的 `ReturnFinishInfo` 参数为 1 时，视频流审核任务结束后，会发起审核任务状态回调。

#### 音频审核状态回调

| 公共参数 | 类型 | 描述 |
|---|---|---|
| Event | String | 回调事件，此回调返回值为 `censor_video_v2_audio_status`。 |
| AppId | Number | AppID。 |
| Timestamp | Number | 服务器当前时间，Unix 时间戳（秒）。 |
| Nonce | String | 随机数。 |
| Signature | String | 签名，具体见  <a href="https://doc-zh.zego.im/article/19700" target="_blank">检验说明</a>。 |

| 业务参数 | 类型 | 描述 |
|---|---|---|
| Code | Number | 返回码，0 表示成功。 |
| Message | String | 操作结果描述。 |
| TaskId | String | 审核任务的 TaskId。<br/>对应 [开始视频流审核](https://doc-zh.zego.im/article/19652) 返回的 TaskId。 |
| Status | Number | 审核状态。<br/>0：审核结束。 |
| AuxInfo | Object | 辅助信息。 |
| └ RoomId | String | 房间 ID。 |
| └ CensorStreamTime | Number | 本次任务审核流的总时长（单位：秒）。 |


#### 画面审核状态回调

| 公共参数 | 类型 | 描述 |
|---|---|---|
| Event | String | 回调事件，此回调返回值为 `censor_video_v2_img_status`。 |
| AppId | Number | AppID。 |
| Timestamp | Number | 服务器当前时间，Unix 时间戳（秒）。 |
| Nonce | String | 随机数。 |
| Signature | String | 签名，具体见  <a href="https://doc-zh.zego.im/article/19700" target="_blank">检验说明</a>。 |

| 业务参数 | 类型 | 描述 |
|---|---|---|
| Code | Number | 返回码，0 表示成功。 |
| Message | String | 操作结果描述。 |
| TaskId | String | 审核任务的 TaskId，对应 [开始视频流审核](https://doc-zh.zego.im/article/19652) 返回的 TaskId。 |
| Status | Number | 审核状态。<br/>0：审核结束。 |
| AuxInfo | Object | 辅助信息。 |
| └ RoomId | String | 房间 ID。 |
| └ CensorStreamTime | Number | 本次任务审核流的总时长（单位：秒）。 |


## 审核结果回调示例

### 音频审核结果回调示例

```json
{
    //公共参数
    "Event": "censor_video_v2_audio_result",
    "AppId": 1,
    "Timestamp": 1724743250,
    "Nonce": "7407715855877898783",
    "Signature": "5cc9e67af0ba0c95f99bd73f79a36485f574ad11"
    //业务参数
    "Code": 0,
    "Message": "成功",
    "TaskId": "f5312a47e068e934c05bab75d917e48e",
    "ResultTaskId": "f5312a47e068e934c05bab75d917e48e_s_1_1",
    "Detail": {
        "RiskLevel": "REJECT",
        "Content": "加个好友吧 qq12345",
        "AudioUrl": "http://xxxxx1.cn-shanghai.oss.xxxxx.com/POST_VIDEOSTREAM%2FPOST_VIDEOSTREAM_AUDIO%xxxxxx%2Ff5312a47e068e934c05bab75d917e48e_s_1_1.mp3?Expires=1720336842&OSSAccessKeyId=LTAI5tLsVBxJ8nhyy5gQVW3K&Signature=rxwlXrBi%2FIc33qq3KK5GWNPD6P4%3D",
        "PreAudioUrl": "http://xxxx1.cn-shanghai.oss.xxxxx.com/POST_VIDEOSTREAM%2FPOST_VIDEOSTREAM_AUDIO%xxxxxxx%2Ff5312a47e068e934c05bab75d917e48e_s_1_1_pre.mp3?Expires=1720336842&OSSAccessKeyId=LTAI5tLsVBxJ8nhyy5gQVW3K&Signature=EkwixrtFuSE3ciqiDMNMcYD%2BBIk%3D",
        "RiskDescription": "广告:联系方式:联系方式",
        "RiskLabel1": "ad",
        "RiskLabel2": "lianxifangshi",
        "RiskLabel3": "lianxifangshi",
        "VadStatus": 1,
        "RiskDetail": {
            "RiskSource": 1001,
            "AudioText": "加个好友吧 qq12345",
            "MatchedLists": null
        },
        "RiskInfoList": [
            {
                "RiskLevel": "REJECT",
                "RiskDescription": "广告:联系方式:联系方式",
                "RiskLabel1": "ad",
                "RiskLabel2": "lianxifangshi",
                "RiskLabel3": "lianxifangshi",
                "RiskDetail": {
                    "RiskSource": 1001,
                    "AudioText": "加个好友吧 qq12345",
                    "MatchedLists": null
                }
            },
            {
                "RiskLevel": "REJECT",
                "RiskDescription": "广告:联系方式:联系方式",
                "RiskLabel1": "ad",
                "RiskLabel2": "lianxifangshi",
                "RiskLabel3": "lianxifangshi",
                "RiskDetail": {
                    "RiskSource": 1001,
                    "AudioText": "加个好友吧 qq12345",
                    "MatchedLists": null
                }
            }
        ],
        "BusinessInfoList": [
            {
                "ConfidenceLevel": 2,
                "Probability": 0.9980469,
                "BusinessDescription": "语种:普通话:普通话",
                "BusinessLabel1": "language",
                "BusinessLabel2": "Chinese",
                "BusinessLabel3": "Chinese"
            }
        ]
    },
    "AuxInfo": {
        "RoomId": "room_1",
        "ProcessBeginTime": 1717744842377,
        "ProcessFinishTime": 1717744842655
    }
}
```


### 画面审核结果回调示例

```json
{
     //公共参数
    "Event": "censor_video_v2_img_result",
    "AppId": 1,
    "Timestamp": 1724743250,
    "Nonce": "7407715855877898783",
    "Signature": "5cc9e67af0ba0c95f99bd73f79a36485f574ad11"
    //业务参数
    "Code": 0,
    "Message": "成功",
    "TaskId": "f5312a47e068e934c05bab75d917e48e",
    "ResultTaskId": "f5312a47e068e934c05bab75d917e48e_s_1_1",
    "Detail": {
        "RiskLevel": "REJECT",
        "ImgUrl": "http://xxxx.cn-shanghai.oss.xxxxx.com/POST_VIDEOSTREAM%2FPOST_VIDEOSTREAM_IMG%xxxxxx%2Ff5312a47e068e934c05bab75d917e48e_vs25_1717744842578756407.jpg?Expires=1720336842&OSSAccessKeyId=LTAI5tLsVBxJ8nhyy5gQVW3K&Signature=eeXh7DUiKlgrCOUTQjU%2B0y8FMrg%3D",
        "RiskDescription": "广告:联系方式:联系方式",
        "RiskLabel1": "ad",
        "RiskLabel2": "lianxifangshi",
        "RiskLabel3": "lianxifangshi",
        "RiskDetail": {
            "RiskSource": 1001,
            "FaceInfoList": null,
            "OcrInfo": {
                "Text": "",
                "MatchedLists": null
            }
        },
        "RiskInfoList": [
            {
                "RiskLevel": "REJECT",
                "Probability": 0.8550949,
                "RiskDescription": "广告:联系方式:联系方式",
                "RiskLabel1": "ad",
                "RiskLabel2": "lianxifangshi",
                "RiskLabel3": "lianxifangshi",
                "RiskDetail": {
                    "RiskSource": 1002,
                    "FaceInfoList": [
                        {
                            "Name": "xxx",
                            "Id": "7dbf511b8de523c8d93873944c2b9bf8",
                            "FaceRatio": 0.006099537,
                            "Probability": 0.7561441,
                            "Location": [
                                487,
                                219,
                                538,
                                281
                            ]
                        }
                    ],
                    "OcrInfo": {
                        "Text": "加个好友吧 qq12345",
                        "MatchedLists": null
                    }
                }
            }
        ],
        "BusinessInfoList": [
            {
                "Probability": 0.9974654,
                "ConfidenceLevel": 2,
                "BusinessDescription": "人脸:人脸类型:真人",
                "BusinessLabel1": "face",
                "BusinessLabel2": "renlianleixing",
                "BusinessLabel3": "zhenren",
                "BusinessDetail": {
                    "FaceInfoList": [
                        {
                            "Name": "xxx",
                            "Id": "7dbf511b8de523c8d93873944c2b9bf8",
                            "FaceRatio": 0.006099537,
                            "Probability": 0.7561441,
                            "Location": [
                                487,
                                219,
                                538,
                                281
                            ]
                        }
                    ]
                }
            }
        ]
    },
    "AuxInfo": {
        "RoomId": "room_1",
        "ImgTime": "2024-06-07 15:20:42.586"
    }
}
```


## 审核状态回调示例

### 音频审核状态回调示例

```json
{
    //公共参数
    "Event": "censor_video_v2_audio_status",
    "AppId": 1,
    "Timestamp": 1724743250,
    "Nonce": "7407715855877898783",
    "Signature": "5cc9e67af0ba0c95f99bd73f79a36485f574ad11"
    //业务参数
    "Code": 0,
    "Message": "success",
    "TaskId": "384a8a77aeb352d3ec8144ab4640cc52",
    "Status": 0,
    "AuxInfo": {
        "RoomId": "room_1",
        "CensorStreamTime": 31
    }
}
```

### 画面审核状态回调示例

```json
{
    //公共参数
    "Event": "censor_video_v2_img_status",
    "AppId": 1,
    "Timestamp": 1724743250,
    "Nonce": "7407715855877898783",
    "Signature": "5cc9e67af0ba0c95f99bd73f79a36485f574ad11"
    //业务参数
    "Code": 0,
    "Message": "success",
    "TaskId": "384a8a77aeb352d3ec8144ab4640cc52",
    "Status": 0,
    "AuxInfo": {
        "RoomId": "room_1",
        "CensorStreamTime": 31
    }
}
```

## 返回响应

返回 HTTP status code 为 2XX （例如 200）表示成功，其他响应都表示失败。


## 回调重试策略

如果 ZEGO 服务器没有收到响应，或收到的 HTTP status code 不为 2XX（例如 200），都会尝试重试，**最多进行 5 次重试**。每次重试请求与**上一次请求**的间隔时间分别为 2s、4s、8s、16s、32s。若第 5 次重试后仍然失败，将不再重试，该回调丢失。
