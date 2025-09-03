# 通话质量监测

- - -

## 功能简介

在使用 ZEGO Express SDK 进行通话中，用户有时会出现网络不好的情况，此时您可以通过相关回调了解当前通话的网络质量和音频/视频信息的变化。

例如，在进行多人音视频通话或者多人唱歌时，我们需要实时显示用户的网络质量，就可以参考本文档实现相应功能。

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Common/ZegoExpressEngine/Call_quality_monitoring.png" /></Frame>


## 示例源码下载

请参考 [下载示例源码](https://doc-zh.zego.im/article/3211) 获取源码。

相关源码请查看 “src/Examples/AdvancedStreaming/StreamMonitoring” 目录下的文件。

## 前提条件

在监测通话质量之前，请确保：

- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppID 和 Server 地址，详情请参考 [控制台 - 项目信息](/console/project-info)。
- 已在项目中集成 ZEGO Express SDK，并实现了基本的音视频推拉流功能，详情请参考 [快速开始 - 集成](https://doc-zh.zego.im/article/199) 和 [快速开始 - 实现流程](https://doc-zh.zego.im/article/7638)。

## 基础网络质量报告

您可以通过监听 [networkQuality](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoRTCEvent#network-quality) 回调，收到用户（包括您自己）的上下行网络质量。此回调每隔两秒会收到一次，网络质量等级请参考 [QualityGrade](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoRTCEvent#network-quality-call-back)。

[networkQuality](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoRTCEvent#network-quality) 回调逻辑：

 - 您只要推流或者拉流，就能收到自己的网络质量回调。
 - 当您拉取了其他用户推送的音视频流并且该用户在您的房间内时，您才会收到该用户的网络质量回调。
- 当 “userID” 为 ""（空字符串）时，代表本次是您自己的网络质量，当 “userID” 不为 ""（空字符串）时，代表是房间内其他用户的报告。
- 可预估远端推流用户的网络情况，如果远端推流用户心跳丢失 1 次，回调其网络质量为 unknown；如果远端推流用户心跳丢失达到 3 次，回调其网络质量为 die。

<Warning title="注意">
[networkQuality](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoRTCEvent#network-quality) 不适用于使用 CDN 进行直播的场景。
</Warning>




```javascript
zg.on("networkQuality", (userID, upstreamQuality, downstreamQuality) => {
        console.log("networkQuality", userID, upstreamQuality, downstreamQuality)
})
```


## 进阶质量报告

如果上述的基础网络质量报告不能满足您的需求，ZEGO 还提供了更详细的推流质量报告、拉流质量报告以及其他相关信息。

### 推流质量报告

推流质量报告，是指描述用户把音视频推送到 ZEGO 服务端这个过程的质量报告，包含了采集、编码阶段音视频流的帧率，传输（发送）的音视频流的帧率、码率、延时及丢包率。

您可以通过注册 [publishQualityUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoRTCEvent#publish-quality-update) 接收推流质量回调，推流成功后每隔三秒会收到此回调。可根据 stats（[ZegoPublishStats](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoPublishStats)) 参数实时了解推送的音视频流的健康情况。

- 大多数情况下，您只需关注 `video` 的 `videoQuality` 参数 和 `audio` 的 `audioQuality` 参数，可通过这两个参数的枚举值来判断推流的综合质量。
- 如果您想关注更详细的推流质量参数，可以参考 [ZegoPublishStats](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoPublishStats)。


```javascript
zg.on('publishQualityUpdate', (streamId, stats) => {
    console.log('publishQualityUpdate', streamId, stats);
})
```
### 推流质量详解

推流质量包括有推流时的视频质量和音频质量，分别是视频码率、音频码率、视频帧率等。

#### 视频质量

推流时的视频质量 [ZegoPublishVideoStats](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoPublishVideoStats) 数据的相关参数如下：

<table>

<tbody><tr>
<th>参数名称</th>
<th>说明</th>
</tr>
<tr>
<td>
[frameHeight](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoPublishVideoStats#frame-height)
</td>
<td>
采集视频高。
</td>
</tr>
<tr>
<td>[frameWidth](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoPublishVideoStats#frame-width)</td>
<td>采集视频宽。</td>
</tr>
<tr>
<td>[googCodecName](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoPublishVideoStats#goog-codec-name)</td>
<td>视频编码格式。</td>
</tr>
<tr>
<td>[muteState](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoPublishVideoStats#mute-state)</td>
<td>视轨是否被关闭。</td>
</tr>
<tr>
<td>[videoBitrate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoPublishVideoStats#video-bitrate)</td>
<td>视频码率，单位为 kbps。</td>
</tr>
<tr>
<td>[videoFPS](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoPublishVideoStats#video-fps)</td>
<td>视频编码帧率，单位为 f/s。</td>
</tr>
<tr>
<td>[videoPacketsLost](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoPublishVideoStats#video-packets-lost)</td>
<td>视频丢包数。</td>
</tr>
<tr>
<td>[videoPacketsLostRate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoPublishVideoStats#video-packets-lost-rate)</td>
<td>视频丢包率，单位为百分比，范围为 0.0 ～ 1.0。</td>
</tr>
<tr>
<td>[videoTransferFPS](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoPublishVideoStats#video-transfer-fps)</td>
<td>视频发送帧率，单位为 f/s。</td>
</tr>
<tr>
<td>[videoQuality](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoPublishVideoStats#video-quality)</td>
<td>推流视频质量：
<ul><li>-1：未知
</li><li>0：极好
</li><li>1：好
</li><li>2：中等
&nbsp;</li><li> 3：差
&nbsp;</li><li> 4：极差</li></ul></td>
</tr>
</tbody></table>


#### 音频质量

推流时的音频质量 [ZegoPublishAudioStats](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoPublishAudioStats) 的相关参数如下：

<table>

<tbody><tr>
<th>参数名称</th>
<th>说明</th>
</tr>
<tr>
<td>
&nbsp;[audioBitrate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoPublishAudioStats#audio-bitrate)
</td>
<td>音频码率，单位为 kbps。</td>
</tr>
<tr>
<td>[audioPacketsLost](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoPublishAudioStats#audio-packets-lost)</td>
<td>音频丢包数。</td>
</tr>
<tr>
<td>[audioPacketsLostRate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoPublishAudioStats#audio-packets-lost-rate)</td>
<td>音频丢包率，单位为百分比，范围为 0.0 ～ 1.0。</td>
</tr>
<tr>
<td>[googCodecName](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoPublishAudioStats#goog-codec-name)</td>
<td>音频编码格式。</td>
</tr>
<tr>
<td>[muteState](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoPublishAudioStats#mute-state)</td>
<td>音轨是否被关闭。</td>
</tr>
<tr>
<td>[audioFPS](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoPublishAudioStats#audio-fps)</td>
<td>音频帧率，单位为 f/s。</td>
</tr>
<tr>
<td>[audioQuality](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoPublishAudioStats#audio-quality)</td>
<td>推流音频质量：
<ul><li>-1：未知
</li><li>0：极好
</li><li>1：好
</li><li>2：中等
</li><li>3：差
</li><li>4：极差</li></ul></td>
</tr>
</tbody></table>


### 拉流质量报告

拉流质量报告，是指用户拉取播放音视频流这个过程的质量报告，包含了接收的音视频流的帧率、码率、延时和丢包率，解码阶段音视频流的帧率、音视频整体质量。

您可以通过注册 [playQualityUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoRTCEvent#play-quality-update) 接收拉流质量回调，拉流成功后每隔三秒会收到此回调。开发者可根据 stats（[ZegoPlayStats](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoPlayStats)) 参数实时了解拉取的音视频流的健康情况。

- 大多数情况下，您只需关注 `video` 的 `videoQuality` 参数和 `audio` 的 `audioQuality` 参数，可通过这两个参数的枚举值来判断拉流的综合质量。
- 如果您想关注更详细的拉流质量参数，可以参考 [ZegoPlayStats](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoPlayStats)。


```javascript
zg.on('playQualityUpdate', (streamId, stats) => {
    console.log('publishQualityUpdate', streamId, stats);
})
```

### 拉流质量详解

拉流质量包括有拉流时的视频质量和音频质量，分别是视频码率、音频码率、视频帧率等。

#### 视频质量

拉流时的视频质量 [ZegoPlayVideoStats](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoPlayVideoStats) 数据的相关参数如下：

<table>

<tbody><tr>
<th>参数名称</th>
<th>说明</th>
</tr>
<tr>
<td>
[frameHeight](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoPlayVideoStats#frame-height)
</td>
<td>接收视频高。</td>
</tr>
<tr>
<td>[frameWidth](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoPlayVideoStats#frame-width)</td>
<td>接收视频宽。</td>
</tr>
<tr>
<td>[googCodecName](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoPlayVideoStats#goog-codec-name)</td>
<td>视频编码格式。</td>
</tr>
<tr>
<td>[muteState](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoPlayVideoStats#mute-state)</td>
<td>视轨是否被关闭。</td>
</tr>
<tr>
<td>[videoBitrate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoPlayVideoStats#video-bitrate)</td>
<td>视频码率，单位为 kbps。</td>
</tr>
<tr>
<td>[videoFPS](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoPlayVideoStats#video-fps)</td>
<td>视频解码帧率，单位为 f/s。</td>
</tr>
<tr>
<td>[videoPacketsLost](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoPlayVideoStats#video-packets-lost)</td>
<td>视频丢包数。</td>
</tr>
<tr>
<td>[videoPacketsLostRate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoPlayVideoStats#video-packets-lost-rate)</td>
<td>视频丢包率，单位为百分比，范围为 0.0 ～ 1.0。</td>
</tr>
<tr>
<td>[videoTransferFPS](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoPlayVideoStats#video-transfer-fps)</td>
<td>视频接收帧率，单位为 f/s。</td>
</tr>
<tr>
<td>[videoFramesDecoded](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoPlayVideoStats#video-frames-decoded)</td>
<td>视频解码总大小。</td>
</tr>
<tr>
<td>[videoFramesDropped](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoPlayVideoStats#video-frames-dropped)</td>
<td>当前实际接收的视频帧丢失数。</td>
</tr>
<tr>
<td>[videoQuality](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoPlayVideoStats#video-quality)</td>
<td>拉流视频质量：
<ul><li>-1：未知
</li><li>0：极好
</li><li>1：好
&nbsp;</li><li>2：中等
&nbsp;</li><li>3：差
&nbsp;</li><li>4：极差</li></ul></td>
</tr>
</tbody></table>

#### 音频质量

拉流时的音频质量 [ZegoPlayAudioStats](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoPlayAudioStats) 的相关参数如下：

<table>

<tbody><tr>
<th>参数名称</th>
<th>说明</th>
</tr>
<tr>
<td>
[audioBitrate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoPlayAudioStats#audio-bitrate)
</td>
<td>音频码率，单位为 kbps。</td>
</tr>
<tr>
<td>[audioJitter](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoPlayAudioStats#audio-jitter)</td>
<td>网络抖动。</td>
</tr>
<tr>
<td>[audioLevel](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoPlayAudioStats#audio-level)</td>
<td>音量。</td>
</tr>
<tr>
<td>[audioPacketsLost](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoPlayAudioStats#audio-packets-lost)</td>
<td>丢包数。</td>
</tr>
<tr>
<td>[audioPacketsLostRate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoPlayAudioStats#audio-packets-lost-rate)</td>
<td>丢包率，单位为百分比，范围为 0.0 ～ 1.0。</td>
</tr>
<tr>
<td>[audioSamplingRate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoPlayAudioStats#audio-sampling-rate)</td>
<td>采样率。</td>
</tr>
<tr>
<td>[muteState](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoPlayAudioStats#mute-state)</td>
<td>音轨是否被关闭。</td>
</tr>
<tr>
<td>[audioFPS](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoPlayAudioStats#audio-fps)</td>
<td>音频帧率，单位为 f/s。</td>
</tr>
<tr>
<td>[audioSendLevel](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoPlayAudioStats#audio-send-level)</td>
<td>音频发送能量。</td>
</tr>
<tr>
<td>[googCodecName](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoPlayAudioStats#goog-codec-name)</td>
<td>音频编码格式。</td>
</tr>
<tr>
<td>[audioQuality](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoPlayAudioStats#audio-quality)</td>
<td>拉流音频质量：
<ul><li>-1：未知
</li><li>0：极好
</li><li>1：好
</li><li>2：中等
</li><li>3：差
</li><li>4：极差</li></ul></td>
</tr>
</tbody></table>

## 其他信息监测

### 推流/拉流状态变化通知

#### 推流状态回调

在推流成功后，您可以通过 [publisherStateUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoRTCEvent#publisher-state-update) 获取推流状态变更的通知。

```javascript
zg.on('publisherStateUpdate', result => {
    console.log('publisherStateUpdate: ', result.streamID, result.state, result);
});
```

您可以根据回调内的 `state` 参数是否在 “正在请求推流状态” 来大体判断用户的推流网络情况。`state` 参数的取值与用户推流状态对应如下:

<table>

<tbody><tr>
<th>状态值</th>
<th>说明</th>
</tr>
<tr>
<td>NO_PUBLISH</td>
<td>未推流状态，在推流前处于该状态。如果推流过程出现稳态的异常，例如 AppID、AppSign、或 Token 等不正确，或者如果其他用户已经在推送流，推送相同流 ID 的流会失败，都会进入未推流状态。</td>
</tr>
<tr>
<td>PUBLISH_REQUESTING</td>
<td>正在请求推流状态，推流操作执行成功后会进入正在请求推流状态，通常通过该状态进行 UI 界面的展示。如果因为网络质量不佳产生的中断，SDK 会进行内部重试，也会回到正在请求推流状态。</td>
</tr>
<tr>
<td>PUBLISHING</td>
<td>正在推流状态，进入该状态表明推流已经成功，用户可以正常通信。</td>
</tr>
</tbody></table>


#### 拉流状态变更回调

在拉流成功后，开发者可通过 [playerStateUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoRTCEvent#player-state-update) 获取拉流状态变更的通知。

```javascript
zg.on('playerStateUpdate', result => {
        console.warn('playerStateUpdate', result.streamID, result.state);
})
```

开发者可根据 `state` 参数是否在 “正在请求拉流状态” 来大体判断用户的拉流网络情况。`state` 参数的取值与用户拉流状态对应如下:

<table>

<tbody><tr>
<th>状态值</th>
<th>说明</th>
</tr>
<tr>
<td>NO_PLAY</td>
<td>未拉流状态，在拉流前处于该状态。如果拉流过程出现稳态的异常，例如 AppID、AppSign、或 Token 等不正确，都会进入未拉流状态。</td>
</tr>
<tr>
<td>PLAY_REQUESTING</td>
<td>正在请求拉流状态，拉流操作执行成功后会进入正在请求拉流状态，通常通过该状态进行应用界面的展示。如果因为网络质量不佳产生的中断，SDK 会进行内部重试，也会回到正在请求拉流状态。</td>
</tr>
<tr>
<td>PLAYING</td>
<td>正在拉流状态，进入该状态表明拉流已经成功，用户可以正常通信。</td>
</tr>
</tbody></table>

## 相关文档

- [怎么处理视频卡顿问题？](https://doc-zh.zego.im/faq/video_freeze?product=ExpressVideo&platform=all)
- [怎么处理音频卡顿问题？](https://doc-zh.zego.im/faq/audio_freeze?product=ExpressVideo&platform=all)
- [如何理解和使用 SEI（媒体补充增强信息）？](https://doc-zh.zego.im/faq/sei?product=ExpressVideo&platform=all)
