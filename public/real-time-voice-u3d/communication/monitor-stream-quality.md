# 通话质量监测

- - -

## 功能简介

在使用 ZEGO Express SDK 进行通话中，用户有时会出现网络不好的情况，此时您可以通过相关回调了解当前通话的网络质量和音频/视频信息的变化。

例如，在进行多人音视频通话或者多人唱歌时，我们需要实时显示用户的网络质量，就可以参考本文档实现相应功能。

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Common/ZegoExpressEngine/Call_quality_monitoring.png" /></Frame>



## 示例源码

请参考 [下载示例源码](https://doc-zh.zego.im/article/13241) 获取源码。

相关源码请查看 “Assets/ZegoExpressExample/Examples/AdvancedStreaming/StreamMonitoring” 目录下的文件。

## 前提条件

在监测通话质量之前，请确保：

- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppID 和 AppSign，详情请参考 [控制台 - 项目信息](/console/project-info)。
- 已在项目中集成 ZEGO Express SDK，并实现了基本的音视频推拉流功能，详情请参考 [快速开始 - 集成](https://doc-zh.zego.im/article/13242) 和 [快速开始 - 实现流程](https://doc-zh.zego.im/article/13243)。

## 基础网络质量报告

您可以通过监听 [OnNetworkQuality](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~IZegoEventHandler#on-network-quality) 回调，收到房间内用户（包括您自己）的上下行网络质量。此回调每隔两秒会收到一次，网络质量等级请参考 [ZegoStreamQualityLevel](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~enum~ZegoStreamQualityLevel)。

[OnNetworkQuality](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~IZegoEventHandler#on-network-quality) 回调的逻辑为：
- 您只要推流或者拉流，就能收到自己的网络质量回调。
- 当您拉取了其他用户推送的音视频流并且该用户在您的房间内时，您才会收到该用户的网络质量回调。
- 当 “userID” 为 “null” 时，代表本次是您自己的网络质量，当 “userID” 不为 “null” 时，代表是房间内其他用户的报告。

<Warning title="注意">



[OnNetworkQuality](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~IZegoEventHandler#on-network-quality) 不适用于使用 CDN 进行直播的场景，您可以参考 [进阶质量报告 - 推流质量报告](https://doc-zh.zego.im/article/15181#5_1) 监测 CDN 的推流质量。

</Warning>




```Cs
void OnNetworkQuality(string userID, ZegoStreamQualityLevel upstreamQuality, ZegoStreamQualityLevel downstreamQuality)
{
    // 开发者可以在此回调中监控用户的上下行网络质量以上报到业务服务器做监控，或者给用户友好的提示
    if (userID == "") {
        // 代表本地用户（我）的网络质量
    } else {
        //代表房间内其他用户的网络质量
    }

    /*
     ZegoStreamQualityLevel.Excellent 网络质量极好
     ZegoStreamQualityLevel.Good 网络质量好
     ZegoStreamQualityLevel.Medium 网络质量正常
     ZegoStreamQualityLevel.Bad 网络质量差
     ZegoStreamQualityLevel.Die 网络异常
     ZegoStreamQualityLevel.Unknown 网络质量未知
     */
}
engine.onNetworkQuality = OnNetworkQuality;
```


## 进阶质量报告

如果上述的基础网络质量报告不能满足您的需求，ZEGO 还提供了更详细的推流质量报告、拉流质量报告以及其他相关信息。

### 推流质量报告

推流质量报告指用户把音视频推送到 ZEGO 服务端这个过程的质量报告，包含了采集、编码阶段音视频流的帧率，传输（发送）的音视频流的帧率、码率、延时及丢包率。

您可以通过注册 [OnPublisherQualityUpdate](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~IZegoEventHandler#on-publisher-quality-update) 接收推流质量回调，推流成功后每隔三秒会收到此回调。可根据 quality(ZegoPublishStreamQuality) 参数实时了解推送的音视频流的健康情况。

- 大多数情况下，您只需关注 “quality” 的 “level” 参数，以 “level” 枚举值来判断推流的综合质量，详情可参考 [ZegoStreamQualityLevel](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~enum~ZegoStreamQualityLevel)。
- 如果您想关注更详细的推流质量参数，可以参考 [ZegoPublishStreamQuality](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~struct~ZegoPublishStreamQuality)。


```Cs
void OnPublisherQualityUpdate(string streamID, ZegoPublishStreamQuality quality){
    // 开发者可以在此回调中监控具体的质量以上报到业务服务器做监控，或者监控质量对象的某个字段以给用户友好的提示
    // 若开发者不知道监控质量哪个字段可以关注 level 字段，这个字段是质量对象的综合值

    switch (quality.level) {
	case ZegoStreamQualityLevel.Excellent:
		// 非常好
		break;
	case ZegoStreamQualityLevel.Good:
		// 好
		break;
	case ZegoStreamQualityLevel.Medium:
		// 一般
		break;
	case ZegoStreamQualityLevel.Bad:
		// 差
		break;
	case ZegoStreamQualityLevel.Die:
		// 失败
		break;
	case ZegoStreamQualityLevel.Unknown:
		// 未知
		break;
	default:
		break;
    }
}
engine.onPublisherQualityUpdate = OnPublisherQualityUpdate;
```

### 拉流质量报告

拉流质量报告指用户拉取播放音视频流这个过程的质量报告，包含了接收的音视频流的帧率、码率、延时和丢包率，解码阶段音视频流的帧率，以及渲染阶段的帧率、卡顿率、音视频整体质量。

您可以通过注册 [OnPlayerQualityUpdate](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~IZegoEventHandler#on-player-quality-update) 接收拉流质量回调，拉流成功后每隔三秒会收到此回调。开发者可根据 quality(ZegoPlayStreamQuality) 参数实时了解拉取的音视频流的健康情况。

- 大多数情况下，您只需关注 “quality” 的 “level” 参数，以 “level” 枚举值来判断拉流的综合质量，详情可参考 [ZegoStreamQualityLevel](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~enum~ZegoStreamQualityLevel)。
- 如果您想关注更详细的拉流质量参数，可以参考 [ZegoPlayStreamQuality](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~struct~ZegoPlayStreamQuality)。


```Cs
void OnPlayerQualityUpdate(string streamID, ZegoPlayStreamQuality quality)
{
    // 开发者可以在此回调中监控具体的质量以上报到业务服务器做监控，或者监控质量对象的某个字段以给用户友好的提示
    // 若开发者不知道监控质量哪个字段可以关注 level 字段，这个字段是质量对象的综合值
}
engine.onPlayerQualityUpdate = OnPlayerQualityUpdate;
```

## MOS 音质评分

ZEGO Express SDK 2.16.0 版本开始，拉流质量回调 [OnPlayerQualityUpdate](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~IZegoEventHandler#on-player-quality-update) 中新增 "mos" 字段，表示对拉流音质的评分。开发者对音频质量比较关注时，可通过该字段了解当前音频的质量情况。

mos 字段的取值范围为 [-1, 5]，其中 -1 表示未知（例如异常拉流时无法评分），[0, 5] 表示评分。实时音频 MOS 评分对应的主观音质感受如下：

<table>

  <tbody><tr>
    <th>MOS 值</th>
    <th>评价标准</th>
  </tr>
  <tr>
    <td>4.0～5.0</td>
    <td>音质很好，清晰流畅，听的清楚。</td>
  </tr>
  <tr>
    <td>3.5～4.0</td>
    <td>音质较好，偶有音质损伤，但依然清晰流畅，听的清楚。</td>
  </tr>
  <tr>
    <td>3.0～3.5</td>
    <td>音质一般，偶有卡顿，需要一点注意力才能听清。</td>
  </tr>
  <tr>
    <td>2.5～3.0</td>
    <td>音质较差，卡顿频繁，需要集中注意力才能听清。</td>
  </tr>
  <tr>
    <td>2.0～2.5</td>
    <td>音质很差，部分语义丢失，难以交流。</td>
  </tr>
  <tr>
    <td>小于 2.0</td>
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

在推流成功后，您可以通过 [OnPublisherStateUpdate](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~IZegoEventHandler#on-publisher-state-update) 获取推流状态变更的通知。

```Cs
void OnPublisherStateUpdate(string streamID, ZegoPublisherState state, int errorCode, string extendedData)
{
    // 当 state 为 NoPublish 时，且 errcode 非 0，表示推流失败，同时不会再进行重试推流了，此时可在界面作出推流失败提示；
    // 当 state 为 PublishRequesting 时，且 errcode 非 0，表示在重试推流，此时如果超出重试时间未成功推流会抛出推流失败通知。
}
engine.onPublisherStateUpdate = OnPublisherStateUpdate;
```

您可以根据回调内的 “state” 参数是否在 “正在请求推流状态” 来大体判断用户的推流网络情况。“state” 参数的取值与用户推流状态对应如下:

|枚举值|说明|
|-|-|
|ZegoPublisherState.NoPublish|未推流状态，在推流前处于该状态。如果推流过程出现稳态的异常，例如 AppID、AppSign、或 Token 等不正确，或者如果其他用户已经在推送流，推送相同流 ID 的流会失败，都会进入未推流状态。|
|ZegoPublisherState.PublishRequesting |正在请求推流状态，推流操作执行成功后会进入正在请求推流状态，通常通过该状态进行 UI 界面的展示。如果因为网络质量不佳产生的中断，SDK 会进行内部重试，也会回到正在请求推流状态。|
|ZegoPublisherState.Publishing|正在推流状态，进入该状态表明推流已经成功，用户可以正常通信。|

参数 “extendedData” 为状态更新附带的扩展信息。若使用 ZEGO 的 CDN 内容分发网络，在推流成功后，该参数的内容的键为 “flv_url_list”、“rtmp_url_list”、“hls_url_list”，分别对应 flv、rtmp、hls 协议的拉流 URL。

#### 拉流状态变更回调

在拉流成功后，开发者可通过 [OnPlayerStateUpdate](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~IZegoEventHandler#on-player-state-update) 获取推流状态变更的通知。

```Cs
void OnPlayerStateUpdate(string streamID, ZegoPlayerState state, int errorCode, string extendedData)
{
    // 当 state 为 NoPlay 时，且 errcode 非 0，表示拉流失败，同时不会再进行重试拉流了，此时可在界面作出拉流失败提示；
    // 当 state 为 PlayRequesting 时，且 errcode 非 0，表示重试拉流，此时如果超出重试时间未成功拉到流会抛出拉流失败通知。
}
engine.onPlayerStateUpdate = OnPlayerStateUpdate;
```

开发者可根据 “state” 参数是否在 “正在请求拉流状态” 来大体判断用户的拉流网络情况。“state” 参数的取值与用户拉流状态对应如下:

|枚举值|说明|
|-|-|
|ZegoPlayerState.NoPlay|未拉流状态，在拉流前处于该状态。如果拉流过程出现稳态的异常，例如 AppID、AppSign、或 Token 等不正确，都会进入未拉流状态。|
|ZegoPlayerState.PlayRequesting |正在请求拉流状态，拉流操作执行成功后会进入正在请求拉流状态，通常通过该状态进行应用界面的展示。如果因为网络质量不佳产生的中断，SDK 会进行内部重试，也会回到正在请求拉流状态。|
|ZegoPlayerState.Playing|正在拉流状态，进入该状态表明拉流已经成功，用户可以正常通信。|

### 接收到音频首帧的通知

#### 推流端音频采集首帧回调

您可以通过注册 [OnPublisherCapturedAudioFirstFrame](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~IZegoEventHandler#on-publisher-captured-audio-first-frame) 接收音频首帧回调。调用推流接口成功后，SDK 采集到第一帧音频数据时会收到此回调。

<Note title="说明">


在未推流或未预览的情况下，首次推流或首次预览，即 SDK 内部的音视频模块的引擎启动时，会去采集本机设备的音频数据，会收到该回调。开发者可根据该回调判断 SDK 是否真的采集到音频数据，若未收到该回调，说明音频采集设备被占用或异常。

</Note>





```Cs
void OnPublisherCapturedAudioFirstFrame()
{

}
engine.onPublisherCapturedAudioFirstFrame = OnPublisherCapturedAudioFirstFrame;
```



#### 拉流端音频接收首帧回调

开发者可通过注册 [OnPlayerRecvAudioFirstFrame](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~IZegoEventHandler#on-player-recv-audio-first-frame) 监听拉流端音频接收首帧回调。调用拉流接口成功后，SDK 拉流拉到第一帧音频数据时会收到此回调。

```Cs
void OnPlayerRecvAudioFirstFrame(string streamID)
{

}
engine.onPlayerRecvAudioFirstFrame = OnPlayerRecvAudioFirstFrame;
```





## 相关文档

- [怎么处理视频卡顿问题？](https://doc-zh.zego.im/faq/video_freeze?product=ExpressVideo&platform=all)
- [怎么处理音频卡顿问题？](https://doc-zh.zego.im/faq/audio_freeze?product=ExpressVideo&platform=all)
- [如何理解和使用 SEI（媒体补充增强信息）？](https://doc-zh.zego.im/faq/sei?product=ExpressVideo&platform=all)
