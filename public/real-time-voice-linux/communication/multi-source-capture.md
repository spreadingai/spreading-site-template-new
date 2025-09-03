# 多源采集

- - -
## 功能简介

多源采集用于管理各个通道的音视频源配置，通过此能力您可以灵活快速的实现不同音视频内容的实时互动，如屏幕共享、混音等功能。

多源采集主要的能力特性与限制如下：
- 推流通道支持设置的多种音视频源，但同一个音视频源仅能被一个通道占用。
- 主路的音视频源支持动态切换，也支持音频的混音能力。辅路仅支持推流前指定采集源，不支持混音。
- 采集屏幕时，仅 iOS 及 Android 平台支持同时采集视频和音频；其他平台仅支持采集视频，如需采集音频，请开发者自行实现相关逻辑。

## 示例源码

请参考 [下载示例源码](https://doc-zh.zego.im/article/14537) 获取源码。

相关源码请查看 “/ZegoExpressExample/Examples/Others/MultiVideoSource” 目录下的文件。

## 前提条件

在使用多源采集功能之前，请确保：

- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppID 和 AppSign，详情请参考 [控制台 - 项目信息](/console/project-info)。
- 已在项目中集成 ZEGO Express SDK，并实现了基本的音视频推拉流功能，详情请参考 [快速开始 - 集成](https://doc-zh.zego.im/article/8331) 和 [快速开始 - 实现流程](https://doc-zh.zego.im/article/8228)。


## 实现流程

<Warning title="注意">

实时语音产品仅支持设置音频采集源。

</Warning>



### 1 创建 ZegoExpressEngine 引擎

创建 ZegoExpressEngine 引擎流程，请参考实现视频通话的 [创建引擎](https://doc-zh.zego.im/article/8228#CreateEngine)。

```cpp
ZegoEngineProfile profile;
// AppID 和 AppSign 由 ZEGO 分配给各 App；其中，为了安全考虑，建议将 AppSign 存储在 App 的业务后台，需要使用时从后台获取
profile.appID = appID;
profile.appSign = appSign;
// 指定使用直播场景 (请根据实际情况填写适合你业务的场景)
profile.scenario = ZegoScenario::ZEGO_SCENARIO_BROADCAST;
// 创建引擎实例
auto engine = ZegoExpressSDK::createEngine(profile, nullptr);
```

### 2 设置音视频采集源

1. 调用 [setVideoSource](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cpp_linux~class~IZegoExpressEngine#set-video-source) 接口设置视频采集源。

```cpp
/** 使用摄像头作为视频采集源 */
engine->setVideoSource(ZEGO_VIDEO_SOURCE_TYPE_CAMERA);
```

<Note title="说明">

- 如果需要使用自定义视频采集作为视频采集源，需设置视频采集源类型为 [ZegoVideoSourceTypeCustom](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cpp_linux~enum~ZegoVideoSourceType#zego-video-source-type-custom)，调用 [enableCustomVideoCapture](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cpp_linux~class~IZegoExpressEngine#enable-custom-video-capture) 接口设置要发送的视频帧数据类型，调用 [sendCustomVideoCaptureRawData](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cpp_linux~class~IZegoExpressEngine#send-custom-video-capture-raw-data) 或 [sendCustomVideoCaptureEncodedData](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cpp_linux~class~IZegoExpressEngine#send-custom-video-capture-encoded-data) 接口向 SDK 发送视频帧数据，详情请参考 [进阶功能 - 自定义视频采集](https://doc-zh.zego.im/article/6874)。
- 如果需要使用媒体播放器作为视频采集源，需先调用 [createMediaPlayer](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cpp_linux~class~IZegoExpressEngine#create-media-player) 接口创建媒体播放器，再通过调用 [setVideoSource](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cpp_linux~class~IZegoExpressEngine#set-video-source) 接口设置视频采集源类型为 [ZegoVideoSourceTypePlayer](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cpp_linux~enum~ZegoVideoSourceType#zego-video-source-type-player) 和设置视频采集源所使用的媒体播放器实例索引，然后再使用刚创建的媒体播放器加载资源并播放，详情请参考 [媒体播放器](https://doc-zh.zego.im/article/8276) 。

</Note>



2. 调用 [setAudioSource](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cpp_linux~class~IZegoExpressEngine#set-audio-source) 接口设置音频采集源。

```cpp
/** 使用麦克风作为音频采集源 */
engine->setAudioSource(ZEGO_AUDIO_SOURCE_TYPE_MICROPHONE);
```

<Note title="说明">


- 如果需要使用自定义音频采集作为音频采集源，需设置音频采集源类型为 [ZegoAudioSourceTypeCustom](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cpp_linux~enum~ZegoAudioSourceType#zego-audio-source-type-custom)，调用 [sendCustomAudioCaptureAACData](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cpp_linux~class~IZegoExpressEngine#send-custom-audio-capture-aac-data) 或 [sendCustomAudioCapturePCMData](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cpp_linux~class~IZegoExpressEngine#send-custom-audio-capture-pcm-data) 等接口向 SDK 发送音频数据，详情请参考 [进阶功能 - 自定义音频采集与渲染](https://doc-zh.zego.im/article/8294)。
- 如果需要使用媒体播放器作为音频采集源，需设置音频采集源类型为 [ZegoAudioSourceTypeMediaPlayer](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cpp_linux~enum~ZegoAudioSourceType#zego-audio-source-type-media-player)，调用 [createMediaPlayer](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cpp_linux~class~IZegoExpressEngine#create-media-player) 接口创建媒体播放器，然后使用刚创建的媒体播放器加载资源并播放，详情请参考 [媒体播放器](https://doc-zh.zego.im/article/8276) 。


</Note>



### 3 登录房间并推流

登录房间及推流流程，请参考实现视频通话的 [登录房间](https://doc-zh.zego.im/article/8228#loginRoom) 及 [推流](https://doc-zh.zego.im/article/8228#publishingStream) 。

### 4（可选）切换音视频采集源

1. 调用 [setVideoSource](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cpp_linux~class~IZegoExpressEngine#set-video-source) 接口切换视频采集源。

```cpp
/** 使用屏幕共享作为视频采集源 */
engine->setVideoSource(ZEGO_VIDEO_SOURCE_TYPE_SCREEN_CAPTURE);
```

2. 调用 [setAudioSource](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cpp_linux~class~IZegoExpressEngine#set-audio-source) 接口切换音频采集源。

```cpp
/** 使用媒体播放器作为音频采集源 */
engine->setAudioSource(ZEGO_AUDIO_SOURCE_TYPE_MEDIA_PLAYER);
```

### 5 结束推流

结束推流流程，请参考实现视频通话的 [停止推拉流](https://doc-zh.zego.im/article/8228#stopPublishingStream)。

```cpp
// 停止推流
engine->stopPublishingStream();
```


## 常见问题


<Accordion title="是否支持设置多个媒体播放器?" defaultOpen="false">
支持，但需要注意相同的播放器实例仅能被一个通道占用。
</Accordion>

<Accordion title="组合使用视频源和音频源时有哪些限制？" defaultOpen="false">
组合使用视频源和音频源限制如下：
1. 主路不能使用媒体播放器的视频或音频源。
2. 辅路使用媒体播放器作为音视频源时，需要主路使用并启动麦克风设备（`enableMicrophone`）。
如果您主路不需要麦克风声音，可通过 `mutePublishStreamAudio` 禁用音频推流保持麦克风启动。
3. 仅在主路使用摄像头视频源或者麦克风音频源时，辅路复制主路视频源或者音频源才能生效。
4. 主路的音频来源不能设置为 `None`，否则会导致音频无法渲染。
</Accordion>
<Content />

