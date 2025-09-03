# 通话质量监测

- - -

## 功能简介

在使用 ZEGO Express SDK 进行通话中，用户有时会出现网络不好的情况，此时您可以通过相关回调了解当前通话的网络质量和音频/视频信息的变化。

例如，在进行多人音视频通话或者多人唱歌时，我们需要实时显示用户的网络质量，就可以参考本文档实现相应功能。

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Common/ZegoExpressEngine/Call_quality_monitoring.png" /></Frame>



## 前提条件

在监测通话质量之前，请确保：

- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppID 和 AppSign，详情请参考 [控制台 - 项目信息](/console/project-info)。
- 已在项目中集成 ZEGO Express SDK，并实现了基本的音视频推拉流功能，详情请参考 [快速开始 - 集成](https://doc-zh.zego.im/article/4835) 和 [快速开始 - 实现流程](https://doc-zh.zego.im/article/8328)。


## 质量报告

ZEGO 提供了详细的推流质量报告、拉流质量报告以及其他相关信息。

### 推流质量报告

推流质量报告指用户把音视频推送到 ZEGO 服务端这个过程的质量报告，包含了采集、编码阶段音视频流的帧率，传输（发送）的音视频流的帧率、码率、延时及丢包率。

您可以通过注册 [publisherQualityUpdate](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/interfaces/_zegoexpresseventhandler_.zegoeventlistener.html#publisherqualityupdate) 接收推流质量回调，推流成功后每隔三秒会收到此回调。可根据 quality([ZegoPublishStreamQuality](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/interfaces/_zegoexpressdefines_.zegopublishstreamquality.html)) 参数实时了解推送的音视频流的健康情况。

- 大多数情况下，您只需关注 “quality” 的 “level” 参数，以 “level” 枚举值来判断推流的综合质量，详情可参考 [ZegoStreamQualityLevel](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/enums/_zegoexpressdefines_.zegostreamqualitylevel.html)。
- 如果您想关注更详细的推流质量参数，可以参考 [ZegoPublishStreamQuality](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/interfaces/_zegoexpressdefines_.zegopublishstreamquality.html)。


```javascript
ZegoExpressEngine.instance().on("publisherQualityUpdate", (streamID, quality) => {
    console.info(`publisherQualityUpdate:width:streamID:${streamID}, quality:${JSON.stringify(quality)}`);
    // 开发者可以在此回调中监控具体的质量以上报到业务服务器做监控，或者监控质量对象的某个字段以给用户友好的提示
    // 若开发者不知道监控质量哪个字段可以关注 level 字段，这个字段是质量对象的综合值
}
```

### 拉流质量报告

拉流质量报告指用户拉取播放音视频流这个过程的质量报告，包含了接收的音视频流的帧率、码率、延时和丢包率，解码阶段音视频流的帧率，以及渲染阶段的帧率、卡顿率、音视频整体质量。

您可以通过注册 [playerQualityUpdate](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/interfaces/_zegoexpresseventhandler_.zegoeventlistener.html#playerqualityupdate) 接收拉流质量回调，拉流成功后每隔三秒会收到此回调。开发者可根据 quality([ZegoPlayStreamQuality](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/interfaces/_zegoexpressdefines_.zegoplaystreamquality.html)) 参数实时了解拉取的音视频流的健康情况。

- 大多数情况下，您只需关注 “quality” 的 “level” 参数，以 “level” 枚举值来判断拉流的综合质量，详情可参考 [ZegoStreamQualityLevel](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/enums/_zegoexpressdefines_.zegostreamqualitylevel.html)。
- 如果您想关注更详细的拉流质量参数，可以参考 [ZegoPlayStreamQuality](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/interfaces/_zegoexpressdefines_.zegoplaystreamquality.html)。


```javascript
ZegoExpressEngine.instance().on("playerQualityUpdate", (streamID, quality) => {
    console.info(`playerQualityUpdate:streamID:${streamID}, quality:${JSON.stringify(quality)}`););
    // 开发者可以在此回调中监控具体的质量以上报到业务服务器做监控，或者监控质量对象的某个字段以给用户友好的提示
    // 若开发者不知道监控质量哪个字段可以关注 level 字段，这个字段是质量对象的综合值
}
```


## MOS 音质评分

ZEGO Express SDK 2.16.0 版本开始，拉流质量回调 [playerQualityUpdate](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/interfaces/_zegoexpresseventhandler_.zegoeventlistener.html#playerqualityupdate) 中新增 "mos" 字段，表示对拉流音质的评分。开发者对音频质量比较关注时，可通过该字段了解当前音频的质量情况。

`mos` 字段的取值范围为 [-1, 5]，其中 -1 表示未知（例如异常拉流时无法评分），[0, 5] 表示正常评分区间。实时音频 MOS 评分对应的主观音质感受如下：

<table>

  <tbody><tr>
    <th>MOS 值</th>
    <th>评价标准</th>
  </tr>
  <tr>
    <td>4.0 ～ 5.0</td>
    <td>音质很好，清晰流畅，听的清楚。</td>
  </tr>
  <tr>
    <td>3.5 ～ 4.0</td>
    <td>音质较好，偶有音质损伤，但依然清晰流畅，听的清楚。</td>
  </tr>
  <tr>
    <td>3.0 ～ 3.5</td>
    <td>音质一般，偶有卡顿，需要一点注意力才能听清。</td>
  </tr>
  <tr>
    <td>2.5 ～ 3.0</td>
    <td>音质较差，卡顿频繁，需要集中注意力才能听清。</td>
  </tr>
  <tr>
    <td>2.0 ～ 2.5</td>
    <td>音质很差，部分语义丢失，难以交流。</td>
  </tr>
  <tr>
    <td>0 ～ 2.0</td>
    <td>音质极差，大量语义丢失，无法交流。</td>
  </tr>
  <tr>
    <td>-1</td>
    <td>未知。</td>
  </tr>
</tbody></table>



## 其他信息监测

### 推流/拉流状态变化通知

#### 推流状态回调

在推流成功后，您可以通过 [publisherStateUpdate](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/interfaces/_zegoexpresseventhandler_.zegoeventlistener.html#publisherstateupdate) 获取推流状态变更的通知。

```javascript
ZegoExpressEngine.instance().on("publisherStateUpdate", (streamID, state, errorCode, extendedData) => {
    console.info(`publisherStateUpdate:streamID:${streamID}, state:${state}, errorCode:${errorCode}, extendedData:${JSON.stringify(extendedData)}`);
    // 当 state 为 ZegoPublisherState.NoPublish 时，且 errcode 非 0，表示推流失败，同时不会再进行重试推流了，此时可在界面作出推流失败提示；
    // 当 state 为 ZegoPublisherState.PublishRequesting 时，且 errcode 非 0，表示在重试推流，此时如果超出重试时间未成功推流会抛出推流失败通知。
}
```

您可以根据回调内的 “state” 参数是否在 “正在请求推流状态” 来大体判断用户的推流网络情况。“state” 参数的取值与用户推流状态对应如下:

<table>

<tbody><tr>
<th>枚举值</th>
<th>说明</th>
</tr>
<tr>
<td>ZegoPublisherState.NoPublish</td>
<td>未推流状态，在推流前处于该状态。如果推流过程出现稳态的异常，例如 AppID、AppSign、或 Token 等不正确，或者如果其他用户已经在推送流，推送相同流 ID 的流会失败，都会进入未推流状态。</td>
</tr>
<tr>
<td>ZegoPublisherState.PublishRequesting</td>
<td>正在请求推流状态，推流操作执行成功后会进入正在请求推流状态，通常通过该状态进行 UI 界面的展示。如果因为网络质量不佳产生的中断，SDK 会进行内部重试，也会回到正在请求推流状态。</td>
</tr>
<tr>
<td>ZegoPublisherState.Publishing</td>
<td>正在推流状态，进入该状态表明推流已经成功，用户可以正常通信。</td>
</tr>
</tbody></table>

参数 “extendedData” 为状态更新附带的扩展信息。若使用 ZEGO 的 CDN 内容分发网络，在推流成功后，该参数的内容的键为 “flv_url_list”、“rtmp_url_list”、“hls_url_list”，分别对应 flv、rtmp、hls 协议的拉流 URL。

#### 拉流状态变更回调

在拉流成功后，开发者可通过 [playerStateUpdate](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/interfaces/_zegoexpresseventhandler_.zegoeventlistener.html#playerstateupdate) 获取拉流状态变更的通知。

```javascript
ZegoExpressEngine.instance().on("playerStateUpdate", (streamID, state, errorCode, extendedData) => {
    console.info(`playerStateUpdate:streamID:${streamID}, state:${state}, errorCode:${errorCode}, extendedData:${JSON.stringify(extendedData)}`);
    // 当 state 为 ZegoPlayerState.NoPlay 时，且 errcode 非 0，表示推流失败，同时不会再进行重试推流了，此时可在界面作出推流失败提示；
    // 当 state 为 ZegoPlayerState.PlayRequesting 时，且 errcode 非 0，表示在重试推流，此时如果超出重试时间未成功推流会抛出推流失败通知。
}
```

开发者可根据 “state” 参数是否在 “正在请求拉流状态” 来大体判断用户的拉流网络情况。“state” 参数的取值与用户拉流状态对应如下:

<table>

<tbody><tr>
<th>枚举值</th>
<th>说明</th>
</tr>
<tr>
<td>ZegoPlayerState.NoPlay</td>
<td>未拉流状态，在拉流前处于该状态。如果拉流过程出现稳态的异常，例如 AppID、AppSign、或 Token 等不正确，都会进入未拉流状态。</td>
</tr>
<tr>
<td>ZegoPlayerState.PlayRequesting</td>
<td>正在请求拉流状态，拉流操作执行成功后会进入正在请求拉流状态，通常通过该状态进行应用界面的展示。如果因为网络质量不佳产生的中断，SDK 会进行内部重试，也会回到正在请求拉流状态。</td>
</tr>
<tr>
<td>ZegoPlayerState.Playing</td>
<td>正在拉流状态，进入该状态表明拉流已经成功，用户可以正常通信。</td>
</tr>
</tbody></table>

### 接收到音频/视频首帧的通知

#### 推流端音频采集首帧回调

您可以通过注册 [publisherCapturedAudioFirstFrame](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/interfaces/_zegoexpresseventhandler_.zegoeventlistener.html#publishercapturedaudiofirstframe) 接收音频首帧回调。调用推流接口成功后，SDK 采集到第一帧音频数据时会收到此回调。

<Note title="说明">


在未推流或未预览的情况下，首次推流或首次预览，即 SDK 内部的音视频模块的引擎启动时，会去采集本机设备的音频数据，会收到该回调。开发者可根据该回调判断 SDK 是否真的采集到音频数据，若未收到该回调，说明音频采集设备被占用或异常。

</Note>




```javascript
ZegoExpressEngine.instance().on("publisherCapturedAudioFirstFrame", () => {
    console.info(`publisherCapturedAudioFirstFrame`);
}
```

#### 推流端视频采集首帧回调

您可以通过注册 [publisherCapturedVideoFirstFrame](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/interfaces/_zegoexpresseventhandler_.zegoeventlistener.html#publishercapturedvideofirstframe) 接收视频首帧回调。调用推流接口成功后，SDK 采集到第一帧视频数据时会收到此回调。

<Note title="说明">


在未推流或未预览的情况下，首次推流或首次预览，即 SDK 内部的音视频模块的引擎启动时，会去采集本机设备的视频数据，会收到该回调。您可以根据该回调判断 SDK 是否真的采集到视频数据，若未收到该回调，说明视频采集设备被占用或异常。

</Note>




```javascript
ZegoExpressEngine.instance().on("publisherCapturedVideoFirstFrame", (channel) => {
    console.info(`publisherCapturedVideoFirstFrame:width:channel:${channel}`);
}
```

#### 拉流端音频接收首帧回调

开发者可通过注册 [playerRecvAudioFirstFrame](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/interfaces/_zegoexpresseventhandler_.zegoeventlistener.html#playerrecvaudiofirstframe) 监听拉流端音频接收首帧回调。调用拉流接口成功后，SDK 拉流拉到第一帧音频数据时会收到此回调。

```javascript
ZegoExpressEngine.instance().on("playerRecvAudioFirstFrame", (streamID) => {
    console.info(`playerRecvAudioFirstFrame:streamID:${streamID}`);
}
```

#### 拉流端视频接收首帧回调

您可以通过注册 [playerRecvVideoFirstFrame](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/interfaces/_zegoexpresseventhandler_.zegoeventlistener.html#playerrecvvideofirstframe) 监听拉流端接收视频首帧回调。调用拉流接口成功后，SDK 拉流拉到第一帧视频数据时会收到此回调。

```javascript
ZegoExpressEngine.instance().on("playerRecvVideoFirstFrame", (streamID) => {
    console.info(`playerRecvVideoFirstFrame:streamID:${streamID}`);
}
```

#### 拉流端渲染完视频首帧回调

您可以通过注册 [playerRenderVideoFirstFrame](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/interfaces/_zegoexpresseventhandler_.zegoeventlistener.html#playerrendervideofirstframe) 监听拉流端渲染完视频首帧回调。调用拉流接口成功后，SDK 拉流并渲染完第一帧视频数据后会收到此回调。

<Note title="说明">


您可以用该回调来统计首帧耗时或更新播放流的 UI 组件。


</Note>



```javascript
ZegoExpressEngine.instance().on("playerRenderVideoFirstFrame", (streamID) => {
    console.info(`playerRenderVideoFirstFrame:streamID:${streamID}`);
}
```

### 视频分辨率变化的回调

#### 采集视频分辨率变更回调

您可以通过注册 [publisherVideoSizeChanged](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/interfaces/_zegoexpresseventhandler_.zegoeventlistener.html#publishervideosizechanged) 监听采集视频大小变更回调。推流成功后，在推流中途如果视频采集分辨率发生变化将会收到此回调。

<Note title="说明">


当在未推流或未预览的情况下，首次推流或首次预览，即 SDK 内部的音视频模块的引擎启动时，会去采集本机设备的视频数据，此时采集分辨率会改变。

您可以根据此回调来去除本地预览的 UI 的遮盖等类似操作。也可以根据该回调的分辨率来动态调整预览视图的比例等。

</Note>




```javascript
ZegoExpressEngine.instance().on("publisherVideoSizeChanged", (width, height, channel) => {
    console.info(`publisherVideoSizeChanged:width:${width}, height:${height}, channel:${channel}`);
}
```

#### 拉流分辨率变更通知

您可以通过注册 [playerVideoSizeChanged](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/interfaces/_zegoexpresseventhandler_.zegoeventlistener.html#playervideosizechanged) 获取拉流分辨率变更通知。拉流成功后，在拉流中途如果有视频分辨率发生变化将会收到此回调，用户可根据流的最终分辨率调整显示。

<Note title="说明">


- 若拉的流只有音频数据，会收不到该回调。
- 若推流端由于网络问题触发 SDK 内部的流量控制时，可能会动态减小推流端的编码分辨率，此时也会收到此回调。所拉的音视频流真正渲染到所设置 UI 播放界面时会触发此回调。开发者可利用该回调通知来更新或切换真正播放流的 UI 组件。

</Note>




```javascript
ZegoExpressEngine.instance().on("playerVideoSizeChanged", (streamID, width, height) => {
    console.info(`playerVideoSizeChanged:streamID:${streamID},width:${width},height:${height}`);
}
```
