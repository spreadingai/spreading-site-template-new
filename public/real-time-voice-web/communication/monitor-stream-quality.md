# 通话质量监测

- - - 

## 功能简介

在推流/拉流成功后，SDK 默认每 3 秒触发一次推流/拉流的质量回调，以供用户监测此次通话/直播的音视频质量。

## 推流质量统计

<Note title="说明">

返回推流质量的回调 [publishQualityUpdate](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~interface~ZegoRTCEvent#publish-quality-update)，默认每 3 秒触发一次。

</Note>



### 推流视频质量

推流时的视频质量的相关参数如下：

- frameHeight：采集视频高。
- frameWidth：采集视频宽。
- googCodecName：视频编码格式。
- muteState：视轨是否被关闭。
- videoBitrate：视频码率，单位为 kbps。
- videoFPS：视频编码帧率，单位为 f/s。
- videoPacketsLost：视频丢包数。
- videoPacketsLostRate：视频丢包率，单位为百分比，范围为 0.0 ～ 1.0。
- videoTransferFPS：视频发送帧率，单位为 f/s。
- videoQuality：推流视频质量。
  - -1：未知
  - 0：极好
  - 1：好
  - 2：中等
  - 3：差
  - 4：极差


### 推流音频质量

推流时的音频质量的相关参数如下：

- audioBitrate：音频码率，单位为 kbps。
- audioCodec：音频编码格式。
- audioPacketsLost：音频丢包数。
- audioPacketsLostRate：音频丢包率，单位为百分比，范围为 0.0 ～ 1.0。
- googCodecName：音频编码格式。
- muteState：音轨是否被关闭。
- audioFPS：音频帧率，单位为 f/s。
- audioQuality：推流音频质量。
  - -1：未知
  - 0：极好
  - 1：好
  - 2：中等
  - 3：差
  - 4：极差



## 拉流质量统计

<Note title="说明">


返回拉流质量的回调 [playQualityUpdate](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~interface~ZegoRTCEvent#play-quality-update)，默认每 3 秒触发一次。 

</Note>




### 拉流视频质量

拉流时的视频质量的相关参数如下：

- frameHeight：接收视频高。
- frameWidth：接收视频宽。
- googCodecName：视频编码格式。
- muteState：视轨是否被关闭。
- videoBitrate：视频码率，单位为 kbps。
- videoFPS：视频编码帧率，单位为 f/s。
- videoPacketsLost：视频丢包数。
- videoPacketsLostRate：视频丢包率，单位为百分比，范围为 0.0 ～ 1.0。
- videoTransferFPS：视频发送帧率，单位为 f/s。
- videoQuality：拉流视频质量。
  - -1：未知
  - 0：极好
  - 1：好
  - 2：中等
  - 3：差
  - 4：极差
- videoFramesDecoded：视频解码总大小。
- videoFramesDropped：当前实际接收的视频帧丢失数。


### 拉流音频质量

拉流时的音频质量的相关参数如下：

- audioBitrate：音频码率，单位为 kbps。
- audioCodec：音频编码格式 “opus”。
- audioJitter：网络抖动。
- audioLevel：音量。
- audioPacketsLost：丢包数。
- audioPacketsLostRate：丢包率，单位为百分比，范围为 0.0 ～ 1.0。。
- audioQuality：拉流音频质量。
  - -1：未知
  - 0：极好
  - 1：好
  - 2：中等
  - 3：差
  - 4：极差
- audioSamplingRate：采样率。
- muteState：音轨是否被关闭。
- audioFPS：音频帧率，单位为 f/s。
- audioSendLevel：音频发送能量。
- googCodecName：音频编码格式。


## API 参考列表

| 方法 | 描述 |
|-------|--------|
| [publishQualityUpdate](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~interface~ZegoRTCEvent#publish-quality-update) | 推流质量回调 |
| [ZegoPublishVideoStats](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~interface~ZegoPublishVideoStats) | 推流视频数据 |
| [ZegoPublishAudioStats](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~interface~ZegoPublishAudioStats) | 推流音频数据 |
| [playQualityUpdate](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~interface~ZegoRTCEvent#play-quality-update) | 拉流质量回调 |
| [ZegoPlayVideoStats](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~interface~ZegoPlayVideoStats) | 拉流视频数据 |
| [ZegoPlayAudioStats](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~interface~ZegoPlayAudioStats) | 拉流音频数据 |
