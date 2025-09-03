# 多源采集

- - -
## 功能简介

多源采集用于管理各个通道的音视频源配置，通过此能力您可以灵活快速的实现不同音视频内容的实时互动，如屏幕共享、混音等功能。

多源采集主要的能力特性与限制如下：
- 推流通道支持设置的多种音视频源，但同一个音视频源仅能被一个通道占用。
- 主路的音视频源支持动态切换，也支持音频的混音能力。辅路仅支持推流前指定采集源，不支持混音。
- 采集屏幕时，仅 iOS 及 Android 平台支持同时采集视频和音频；其他平台仅支持采集视频，如需采集音频，请开发者自行实现相关逻辑。

## 前提条件

在使用多源采集功能之前，请确保：

- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppID 和 AppSign，详情请参考 [控制台 - 项目信息](/console/project-info)。
- 已在项目中集成 ZEGO Express SDK，并实现了基本的音视频推拉流功能，详情请参考 [快速开始 - 集成](https://doc-zh.zego.im/article/4835) 和 [快速开始 - 实现流程](https://doc-zh.zego.im/article/8328)。


## 实现流程

<Warning title="注意">
实时语音产品仅支持设置音频采集源。
</Warning>



### 1 设置音视频采集源

1. 调用 [setVideoSource](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/classes/_impl_zegoexpressengineimpl_.zegoexpressengineimpl.html#setvideosource) 接口设置视频采集源。

```javascript
/** 使用摄像头作为视频采集源 */
ZegoExpressEngine.instance().setVideoSource(ZegoVideoSourceType.Camera);
```

<Note title="说明">
- 如果需要使用媒体播放器作为视频采集源，需先调用 [createMediaPlayer](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/classes/_impl_zegoexpressengineimpl_.zegoexpressengineimpl.html#createmediaplayer) 接口创建媒体播放器，再通过调用 [setVideoSource](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/classes/_impl_zegoexpressengineimpl_.zegoexpressengineimpl.html#setvideosource) 接口设置视频采集源类型为 `ZegoVideoSourceType.Player` 和设置视频采集源所使用的媒体播放器实例索引，然后再使用刚创建的媒体播放器加载资源并播放，详情请参考 [媒体播放器](https://doc-zh.zego.im/article/8852)。
- 如果需要使用屏幕共享作为视频采集源，需设置视频采集源类型为 `ZegoVideoSourceType.ScreenCapture`，并开启屏幕共享向 SDK 推屏幕共享视频数据，详情请参考 [屏幕共享](https://doc-zh.zego.im/article/17369)。
</Note>



2. 调用 [setAudioSource](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/classes/_impl_zegoexpressengineimpl_.zegoexpressengineimpl.html#setaudiosource) 接口设置音频采集源。

```javascript
/** 使用麦克风作为音频采集源 */
ZegoExpressEngine.instance().setAudioSource(ZegoAudioSourceType.Microphone);
```

<Note title="说明">
- 如果需要使用媒体播放器作为音频采集源，需设置音频采集源类型为 `ZegoAudioSourceType.MediaPlayer`，调用 [createMediaPlayer](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/classes/_impl_zegoexpressengineimpl_.zegoexpressengineimpl.html#createmediaplayer) 接口创建媒体播放器，然后使用刚创建的媒体播放器加载资源并播放，详情请参考 [媒体播放器](https://doc-zh.zego.im/article/8852) 。
- 如果需要使用系统播放声音作为音频采集源，需设置视频采集源类型为 `ZegoVideoSourceType.ScreenCapture`，并开启屏幕共享向 SDK 推屏幕共享音频数据，详情请参考 [屏幕共享](https://doc-zh.zego.im/article/17369) 。
</Note>



### 2 登录房间并推流

登录房间及推流流程，请参考实现视频通话的 [登录房间](https://doc-zh.zego.im/article/8328#loginRoom) 及 [推流](https://doc-zh.zego.im/article/8328#publishingStream)。

### 3（可选）切换音视频采集源

1. 调用 [setVideoSource](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/classes/_impl_zegoexpressengineimpl_.zegoexpressengineimpl.html#setvideosource) 接口切换视频采集源。

```javascript
/** 使用屏幕共享作为视频采集源 */
ZegoExpressEngine.instance().setVideoSource(ZegoVideoSourceType.ScreenCapture);
```

2. 调用 [setAudioSource](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/classes/_impl_zegoexpressengineimpl_.zegoexpressengineimpl.html#setaudiosource) 接口切换音频采集源。

```javascript
/** 使用媒体播放器作为音频采集源 */
ZegoExpressEngine.instance().setAudioSource(ZegoAudioSourceType.MediaPlayer);
```

### 4 结束推流

结束推流流程，请参考实现视频通话的 [停止推拉流](https://doc-zh.zego.im/article/8328#stopPublishingStream)。

```javascript
// 停止推流
ZegoExpressEngine.instance().stopPublishingStream();
```


## 常见问题

1. **如何采集屏幕视频与系统声音?**

如需采集屏幕视频与系统声音，请参考 [屏幕共享](https://doc-zh.zego.im/article/17369)。

2. **是否支持设置多个媒体播放器?**

支持，但需要注意相同的播放器实例仅能被一个通道占用。

3. **组合使用视频源和音频源时有哪些限制？**

组合使用视频源和音频源限制如下：
1. 主路不能使用媒体播放器的视频或音频源。
2. 辅路使用媒体播放器作为音视频源时，需要主路使用并启动麦克风设备（`enableMicrophone`）。
如果您主路不需要麦克风声音，可通过 `mutePublishStreamAudio` 禁用音频推流保持麦克风启动。
3. 仅在主路使用摄像头视频源或者麦克风音频源时，辅路复制主路视频源或者音频源才能生效。
4. 主路的音频来源不能设置为 `None`，否则会导致音频无法渲染。
