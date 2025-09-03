# 通话质量监测

- - - 


## 功能简介

在推流/拉流成功后，SDK 会采集 live-pusher/live-player 的推流/拉流的质量回调，以供用户监测此次通话/直播的音视频质量。

<Warning title="注意">


本功能仅支持在 `微信小程序` 上使用。

</Warning>





## 推流质量统计

推流质量包含了视频码率、音频码率、视频帧率等。

> **返回推流质量的回调：**
> 调用 [updatePlayerNetStatus](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_wxxcx~class~ZegoExpressEngine#update-player-net-status) 后会触发 SDK 的回调 [publishQualityUpdate](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_wxxcx~interface~ZegoWechatMiniEvent#publish-quality-update)。

- `videoBitrate`：视频码率，单位 Kbps
- `audioBitrate`：音频码率，单位 Kbps
- `videoFPS`：视频编码帧率，单位 f/s
- `videoWidth`：视频画面的宽度
- `videoHeight`：视频画面的高度
  
## 拉流质量统计
拉流质量包含了视频码率、音频码率、视频帧率等。

> **返回拉流质量的回调：**
> 调用 [updatePlayerNetStatus](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_wxxcx~class~ZegoExpressEngine#update-player-net-status) 后会触发 SDK 的回调 [playQualityUpdate](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_wxxcx~interface~ZegoWechatMiniEvent#play-quality-update)。

- `videoBitrate`：视频码率，单位 Kbps
- `audioBitrate`：音频码率，单位 Kbps
- `videoFPS`：视频编码帧率，单位 f/s
- `videoWidth`：视频画面的宽度
- `videoHeight`：视频画面的高度

<Content />
