# 通话质量监测

- - -

## 功能简介

在使用 ZEGO Express SDK 进行通话中，用户有时会出现网络不好的情况，此时您可以通过相关回调了解当前通话的网络质量和音频/视频信息的变化。

例如，在进行多人音视频通话或者多人唱歌时，我们需要实时显示用户的网络质量，就可以参考本文档实现相应功能。

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Common/ZegoExpressEngine/Call_quality_monitoring.png" /></Frame>



## 前提条件

在监测通话质量之前，请确保：

- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppID 和 AppSign，详情请参考 [控制台 - 项目信息](/console/project-info)。
- 已在项目中集成 ZEGO Express SDK，并实现了基本的音视频推拉流功能，详情请参考 [快速开始 - 集成](https://doc-zh.zego.im/article/19409) 和 [快速开始 - 实现流程](https://doc-zh.zego.im/article/19410)。


## 基础网络质量报告

您可以通过监听 [onNetworkQuality](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/ets_ohos/interfaces/_zegoexpresseventhandler_.zegoeventlistener.html#onnetworkquality) 回调，收到用户（包括您自己）的上下行网络质量。此回调每隔两秒会收到一次，网络质量等级请参考 [ZegoStreamQualityLevel](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/ets_ohos/enums/_zegoexpressdefines_.zegostreamqualitylevel.html#zegostreamqualitylevel)。

不同版本的 [onNetworkQuality](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/ets_ohos/interfaces/_zegoexpresseventhandler_.zegoeventlistener.html#onnetworkquality) 回调逻辑有所不同：

<table>

<tbody><tr>
<th>版本号</th>
<th>回调逻辑</th>
</tr>
<tr>
<td>2.22.0 及以上</td>
<td>基于 2.14.0 ～ 2.21.1 的 onNetworkQuality 接口的回调逻辑上，还可预估远端推流用户的网络情况，如果远端推流用户心跳丢失 1 次，回调其网络质量为 unknown；如果远端推流用户心跳丢失达到 3 次，回调其网络质量为 die。</td>
</tr>
<tr>
<td>2.14.0 ～ 2.21.1</td>
<td>
* 您只要推流或者拉流，就能收到自己的网络质量回调。&nbsp;&nbsp;
* 当您拉取了其他用户推送的音视频流并且该用户在您的房间内时，您才会收到该用户的网络质量回调。&nbsp;
* 当 “userID” 为 ""（空字符串）时，代表本次是您自己的网络质量，当 “userID” 不为 ""（空字符串）时，代表是房间内其他用户的报告。
</td>
</tr>
<tr>
<td>2.10.0 ～ 2.13.1</td>
<td>
* 您必须既推流又拉流，才会收到自身的网络质量回调。&nbsp;
* 当您拉取一条流时，推送该条流的用户必须在同一房间内，且他也进行了拉流，您才会收到该用户的网络质量回调。
* 当 “userID” 为 ""（空字符串）时，代表本次是您自己的网络质量，当 “userID” 不为 ""（空字符串）时，代表是房间内其他用户的报告。
</td>
</tr>
</tbody></table>

<Warning title="注意">



[onNetworkQuality](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/ets_ohos/interfaces/_zegoexpresseventhandler_.zegoeventlistener.html#onnetworkquality) 不适用于使用 CDN 进行直播的场景，您可以参考 [进阶质量报告 - 推流质量报告](https://doc-zh.zego.im/article/20935#4_1) 监测 CDN 的推流质量。

</Warning>




```ts
engine.on('onNetworkQuality', (userID: string, upstreamQuality: zego.ZegoStreamQualityLevel, downstreamQuality: zego.ZegoStreamQualityLevel)=>{
    if (userID == "") {
                    // 代表本地用户（本端）的网络质量
                    //("我的上行网络质量是 %lu", (unsigned long)upstreamQuality);
                    //("我的下行网络质量是 %lu", (unsigned long)downstreamQuality);
                } else {
                    //代表房间内其他用户的网络质量
                    //("用户 %s 的上行网络质量是 %lu", userID, (unsigned long)upstreamQuality);
                    //("用户 %s 的下行网络质量是 %lu", userID, (unsigned long)downstreamQuality);
                }

                /*
                ZegoStreamQualityLevel.Excellent, 网络质量极好
                ZegoStreamQualityLevel.Good, 网络质量好
                ZegoStreamQualityLevel.Medium, 网络质量正常
                ZegoStreamQualityLevel.Bad, 网络质量差
                ZegoStreamQualityLevel.Die, 网络异常
                ZegoStreamQualityLevel.Unknown, 网络质量未知
                */
})
```


## 进阶质量报告

如果上述的基础网络质量报告不能满足您的需求，ZEGO 还提供了更详细的推流质量报告、拉流质量报告以及其他相关信息。

### 推流质量报告

推流质量报告是指描述用户把音视频推送到 ZEGO 服务端这个过程的质量报告，包含了采集、编码阶段音视频流的帧率，传输（发送）的音视频流的帧率、码率、延时及丢包率。

您可以通过注册 [onPublisherQualityUpdate](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/ets_ohos/interfaces/_zegoexpresseventhandler_.zegoeventlistener.html#onpublisherqualityupdate) 接收推流质量回调，推流成功后每隔三秒会收到此回调。可根据 quality（[ZegoPublishStreamQuality](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/ets_ohos/classes/_zegoexpressdefines_.zegopublishstreamquality.html)) 参数实时了解推送的音视频流的健康情况。

- 大多数情况下，您只需关注 “quality” 的 “level” 参数，以 “level” 枚举值来判断推流的综合质量，详情可参考 [ZegoStreamQualityLevel](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/ets_ohos/enums/_zegoexpressdefines_.zegostreamqualitylevel.html)。
- 如果您想关注更详细的推流质量参数，可以参考 [ZegoPublishStreamQuality](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/ets_ohos/classes/_zegoexpressdefines_.zegopublishstreamquality.html)。


```ts
engine.on('onPublisherQualityUpdate',(streamID: string, quality: zego.ZegoPublishStreamQuality)=>{
    let networkQuality: string = '';
    // level 代表了推流质量的综合分数，大部分情况下，开发者可以参考此分数展示上行网络的质量
    switch (quality.level) {
    case Excellent:
        networkQuality = "非常好";
        break;
    case Good:
        networkQuality = "好";
        break;
    case Medium:
        networkQuality = "一般";
        break;
    case Bad:
        networkQuality = "差";
        break;
    case Die:
        networkQuality = "失败";
        break;
    case Unknown:
        networkQuality = "未知";
        break;
    default:
        break;
    }
    //("网络质量是：%s", networkQuality);

});
```

### 拉流质量报告

拉流质量报告指用户拉取播放音视频流这个过程的质量报告，包含了接收的音视频流的帧率、码率、延时和丢包率，解码阶段音视频流的帧率，以及渲染阶段的帧率、卡顿率、音视频整体质量。

您可以通过注册 [onPlayerQualityUpdate](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/ets_ohos/interfaces/_zegoexpresseventhandler_.zegoeventlistener.html#onplayerqualityupdate) 接收拉流质量回调，拉流成功后每隔三秒会收到此回调。开发者可根据 quality（[ZegoPlayStreamQuality](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/ets_ohos/classes/_zegoexpressdefines_.zegoplaystreamquality.html)) 参数实时了解拉取的音视频流的健康情况。

- 大多数情况下，您只需关注 “quality” 的 “level” 参数，以 “level” 枚举值来判断拉流的综合质量，详情可参考 [ZegoStreamQualityLevel](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/ets_ohos/enums/_zegoexpressdefines_.zegostreamqualitylevel.html)。
- 如果您想关注更详细的拉流质量参数，可以参考 [ZegoPlayStreamQuality](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/ets_ohos/classes/_zegoexpressdefines_.zegoplaystreamquality.html)。


```ts
engine.on('onPlayerQualityUpdate', (streamID: string, quality: zego.ZegoPlayStreamQuality) =>{
    // level 代表了拉流质量的综合分数，大部分情况下，开发者可以参考此分数展示下行网络的质量
    let networkQuality: string = '';
    switch (quality.level) {
        case Excellent:
            networkQuality = "非常好";
            break;
        case Good:
            networkQuality = "好";
            break;
        case Medium:
            networkQuality = "一般";
            break;
        case Bad:
            networkQuality = "差";
            break;
        case Die:
            networkQuality = "失败";
            break;
        case Unknown:
            networkQuality = "未知";
            break;
        default:
            break;
    }
    //("网络质量是：%s", networkQuality);
});
```

## MOS 音质评分

ZEGO Express SDK 2.16.0 版本开始，拉流质量回调 [onPlayerQualityUpdate](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/ets_ohos/interfaces/_zegoexpresseventhandler_.zegoeventlistener.html#onplayerqualityupdate) 中新增 "mos" 字段，表示对拉流音质的评分。开发者对音频质量比较关注时，可通过该字段了解当前音频的质量情况。

mos 字段的取值范围为 [-1, 5]，其中 -1 表示未知（例如异常拉流时无法评分），[0, 5] 表示正常评分区间。实时音频 MOS 评分对应的主观音质感受如下：

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

**推流状态回调**

在推流成功后，您可以通过 [onPublisherStateUpdate](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/ets_ohos/interfaces/_zegoexpresseventhandler_.zegoeventlistener.html#onpublisherstateupdate) 获取推流状态变更的通知。

```ts
engine.on('onPublisherStateUpdate', (streamID: string, state: zego.ZegoPublisherState, errorCode: number, extendedData: string)=>{
// 当 state 为 NoPublish 时，且 errcode 非 0，表示推流失败，同时不会再进行重试推流了，此时可在界面作出推流失败提示；
        // 当 state 为 PublishRequesting 时，且 errcode 非 0，表示在重试推流，此时如果超出重试时间未成功推流会抛出推流失败通知。
});
```

您可以根据回调内的 “state” 参数是否在 “正在请求推流状态” 来大体判断用户的推流网络情况。“state” 参数的取值与用户推流状态对应如下:

<table>

<tbody><tr>
<th>枚举值</th>
<th>说明</th>
</tr>
<tr>
<td>NoPublish</td>
<td>未推流状态，在推流前处于该状态。如果推流过程出现稳态的异常，例如 AppID、AppSign、或 Token 等不正确，或者如果其他用户已经在推送流，推送相同流 ID 的流会失败，都会进入未推流状态。</td>
</tr>
<tr>
<td>PublishRequesting</td>
<td>正在请求推流状态，推流操作执行成功后会进入正在请求推流状态，通常通过该状态进行 UI 界面的展示。如果因为网络质量不佳产生的中断，SDK 会进行内部重试，也会回到正在请求推流状态。</td>
</tr>
<tr>
<td>Publishing</td>
<td>正在推流状态，进入该状态表明推流已经成功，用户可以正常通信。</td>
</tr>
</tbody></table>

参数 “extendedData” 为状态更新附带的扩展信息。若使用 ZEGO 的 CDN 内容分发网络，在推流成功后，该参数的内容的键为 “flv_url_list”、“rtmp_url_list”、“hls_url_list”，分别对应 flv、rtmp、hls 协议的拉流 URL。

**拉流状态变更回调**

在拉流成功后，开发者可通过 [onPlayerStateUpdate](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/ets_ohos/interfaces/_zegoexpresseventhandler_.zegoeventlistener.html#onplayerstateupdate) 获取拉流状态变更的通知。

```ts
engine.on('onPlayerStateUpdate',(streamID: string, state: zego.ZegoPlayerState, errorCode: number, extendedData: string)=>{
// 当 state 为 NoPlay 时，且 errcode 非 0，表示拉流失败，同时不会再进行重试拉流了，此时可在界面作出拉流失败提示；
// 当 state 为 PlayRequesting 时，且 errcode 非 0，表示重试拉流，此时如果超出重试时间未成功拉到流会抛出拉流失败通知。
})
```

开发者可根据 “state” 参数是否在 “正在请求拉流状态” 来大体判断用户的拉流网络情况。“state” 参数的取值与用户拉流状态对应如下:

<table>

<tbody><tr>
<th>枚举值</th>
<th>说明</th>
</tr>
<tr>
<td>NoPlay</td>
<td>未拉流状态，在拉流前处于该状态。如果拉流过程出现稳态的异常，例如 AppID、AppSign、或 Token 等不正确，都会进入未拉流状态。</td>
</tr>
<tr>
<td>PlayRequesting</td>
<td>正在请求拉流状态，拉流操作执行成功后会进入正在请求拉流状态，通常通过该状态进行应用界面的展示。如果因为网络质量不佳产生的中断，SDK 会进行内部重试，也会回到正在请求拉流状态。</td>
</tr>
<tr>
<td>Playing</td>
<td>正在拉流状态，进入该状态表明拉流已经成功，用户可以正常通信。</td>
</tr>
</tbody></table>

### 接收到音频/视频首帧的通知

**推流端音频采集首帧回调**

您可以通过注册 [onPublisherCapturedAudioFirstFrame](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/ets_ohos/interfaces/_zegoexpresseventhandler_.zegoeventlistener.html#onpublishercapturedaudiofirstframe) 接收音频首帧回调。调用推流接口成功后，SDK 采集到第一帧音频数据时会收到此回调。

<Note title="说明">


在未推流的情况下，调用推流接口后，即 SDK 内部的音视频模块的引擎启动时，会采集本机设备的音频数据，收到该回调。开发者可根据该回调判断 SDK 是否真的采集到音频数据，若未收到该回调，说明音频采集设备被占用或异常。

</Note>




```ts
engine.on('onPublisherCapturedAudioFirstFrame',()=>{

});
```

**推流端视频采集首帧回调**

您可以通过注册 [onPublisherCapturedVideoFirstFrame](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/ets_ohos/interfaces/_zegoexpresseventhandler_.zegoeventlistener.html#onpublishercapturedvideofirstframe) 接收视频首帧回调。调用推流接口成功后，SDK 采集到第一帧视频数据时会收到此回调。

<Note title="说明">


在未推流或未预览的情况下，调用推流或预览接口后，即 SDK 内部的音视频模块的引擎启动时，会采集本机设备的视频数据，收到该回调。您可以根据该回调判断 SDK 是否真的采集到视频数据，若未收到该回调，说明视频采集设备被占用或异常。

</Note>




```ts
engine.on('onPublisherCapturedVideoFirstFrame',(channel: zego.ZegoPublishChannel)=>{

});
```

**拉流端音频接收首帧回调**

开发者可通过注册 [onPlayerRecvAudioFirstFrame](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/ets_ohos/interfaces/_zegoexpresseventhandler_.zegoeventlistener.html#onplayerrecvaudiofirstframe) 监听拉流端音频接收首帧回调。调用拉流接口成功后，SDK 拉流拉到第一帧音频数据时会收到此回调。

```ts
engine.on('onPlayerRecvAudioFirstFrame',(streamID: string)=>{

});
```

**拉流端视频接收首帧回调**

您可以通过注册 [onPlayerRecvVideoFirstFrame](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/ets_ohos/interfaces/_zegoexpresseventhandler_.zegoeventlistener.html#onplayerrecvvideofirstframe) 监听拉流端接收视频首帧回调。调用拉流接口成功后，SDK 拉流拉到第一帧视频数据时会收到此回调。

```ts
engine.on('onPlayerRecvVideoFirstFrame',(streamID: string)=>{

});
```

**拉流端渲染完视频首帧回调**

您可以通过注册 [onPlayerRenderVideoFirstFrame](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/ets_ohos/interfaces/_zegoexpresseventhandler_.zegoeventlistener.html#onplayerrendervideofirstframe) 监听拉流端渲染完视频首帧回调。调用拉流接口成功后，SDK 拉流并渲染完第一帧视频数据后会收到此回调。

<Note title="说明">


您可以用该回调来统计首帧耗时或更新播放流的 UI 组件。


</Note>



```ts
engine.on('onPlayerRenderVideoFirstFrame',(streamID: string)=>{

});
```

### 视频分辨率变化的回调

**采集视频分辨率变更回调**

您可以通过注册 [onPublisherVideoSizeChanged](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/ets_ohos/interfaces/_zegoexpresseventhandler_.zegoeventlistener.html#onpublishervideosizechanged) 监听采集视频分辨率大小变更回调。推流成功后，在推流中途如果视频采集分辨率发生变化将会收到此回调。

<Note title="说明">


当在未推流或未预览的情况下，首次推流或首次预览，即 SDK 内部的音视频模块的引擎启动时，会采集本机设备的视频数据，此时采集分辨率会改变。

您可以根据此回调来去除本地预览的 UI 的遮盖等类似操作。也可以根据该回调的分辨率来动态调整预览视图的比例等。

</Note>





```ts
engine.on('onPublisherVideoSizeChanged',(width: number, height: number, channel: zego.ZegoPublishChannel)=>{

});
```

**拉流分辨率变更通知**

您可以通过注册 [onPlayerVideoSizeChanged](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/ets_ohos/interfaces/_zegoexpresseventhandler_.zegoeventlistener.html#onplayervideosizechanged) 获取拉流分辨率变更通知。拉流成功后，在拉流中途如果有视频分辨率发生变化将会收到此回调，用户可根据流的最终分辨率调整显示。

<Note title="说明">


- 若拉的流只有音频数据，会收不到该回调。
- 若推流端由于网络问题触发 SDK 内部的流量控制时，可能会动态减小推流端的编码分辨率，此时也会收到此回调。
- 所拉的音视频流真正渲染到所设置 UI 播放界面时会触发此回调。开发者可利用该回调通知来更新或切换真正播放流的 UI 组件。

</Note>




```ts
engine.on('onPlayerVideoSizeChanged',(streamID: string, width: number, height: number)=>{

});
```

## 相关文档

- [怎么处理视频卡顿问题？](https://doc-zh.zego.im/faq/video_freeze?product=ExpressVideo&platform=all)
- [怎么处理音频卡顿问题？](https://doc-zh.zego.im/faq/audio_freeze?product=ExpressVideo&platform=all)
- [如何理解和使用 SEI（媒体补充增强信息）？](https://doc-zh.zego.im/faq/sei?product=ExpressVideo&platform=all)
