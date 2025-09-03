# 多源采集

- - -
## 功能简介

多源采集用于管理各个通道的音视频源配置，通过此能力您可以灵活快速的实现不同音视频内容的实时互动，如屏幕共享、混音等功能。

多源采集主要的能力特性与限制如下：
- 推流通道支持设置的多种音视频源，但同一个音视频源仅能被一个通道占用。
- 主路的音视频源支持动态切换，也支持音频的混音能力。辅路仅支持推流前指定采集源，不支持混音。
- 采集屏幕时，仅 iOS 及 Android 平台支持同时采集视频和音频；其他平台仅支持采集视频，如需采集音频，请开发者自行实现相关逻辑。

## 示例源码

请参考 [下载示例源码](https://doc-zh.zego.im/article/13411) 获取源码。

相关源码请查看 “/ZegoExpressExample/Examples/Others/MultiVideoSource” 目录下的文件。

## 前提条件

在使用多源采集功能之前，请确保：

- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppID 和 AppSign，详情请参考 [控制台 - 项目信息](/console/project-info)。
- 已在项目中集成 ZEGO Express SDK，并实现了基本的音视频推拉流功能，详情请参考 [快速开始 - 集成](https://doc-zh.zego.im/article/13413) 和 [快速开始 - 实现流程](https://doc-zh.zego.im/article/13415)。


## 实现流程

<Warning title="注意">



实时语音产品仅支持设置音频采集源。
</Warning>



### 1 创建 ZegoExpressEngine 引擎

创建 ZegoExpressEngine 引擎流程，请参考实现视频通话的 [创建引擎](https://doc-zh.zego.im/article/13415#CreateEngine)。

```objc
ZegoEngineProfile *profile = [[ZegoEngineProfile alloc] init];
profile.appID = [KeyCenter appID];
profile.appSign = [KeyCenter appSign];
profile.scenario = ZegoScenarioDefault;
[ZegoExpressEngine createEngineWithProfile:profile eventHandler:self];
```

### 2 设置音视频采集源

1. 调用 [setVideoSource](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoExpressEngine#set-video-source) 接口设置视频采集源。

```objc
/** 使用摄像头作为视频采集源 */
[[ZegoExpressEngine sharedEngine] setVideoSource:ZegoVideoSourceTypeCamera];
```

<Note title="说明">

- 如果需要使用自定义视频采集作为视频采集源，需设置视频采集源类型为 [ZegoVideoSourceTypeCustom](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~enum~ZegoVideoSourceType#zego-video-source-type-custom)，调用 [enableCustomVideoCapture](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoExpressEngine#enable-custom-video-capture-config) 接口设置要发送的视频帧数据类型，调用 [sendCustomVideoCapturePixelBuffer](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoExpressEngine#send-custom-video-capture-pixel-buffer-timestamp)，[sendCustomVideoCaptureTextureData](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoExpressEngine#send-custom-video-capture-texture-data-size-timestamp) 或 [sendCustomVideoCaptureEncodedData](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoExpressEngine#send-custom-video-capture-encoded-data-params-timestamp) 接口向 SDK 发送视频帧数据，详情请参考 [进阶功能 - 自定义视频采集](https://doc-zh.zego.im/article/3676)。
- 如果需要使用媒体播放器作为视频采集源，需先调用 [createMediaPlayer](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoExpressEngine#create-media-player) 接口创建媒体播放器，再通过调用 [setVideoSource](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoExpressEngine#set-video-source) 接口设置视频采集源类型为 [ZegoVideoSourceTypePlayer](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~enum~ZegoVideoSourceType#zego-video-source-type-player) 和设置视频采集源所使用的媒体播放器实例索引，然后再使用刚创建的媒体播放器加载资源并播放，详情请参考 [、媒体播放器](https://doc-zh.zego.im/article/14779) 。
- 如果需要使用屏幕共享作为视频采集源，需设置视频采集源类型为 [ZegoVideoSourceTypeScreenCapture](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~enum~ZegoVideoSourceType#zego-video-source-type-screen-capture)，并开启屏幕共享向 SDK 推屏幕共享视频数据，详情请参考 [屏幕共享](https://doc-zh.zego.im/article/10460) 。

</Note>


2. 调用 [setAudioSource](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoExpressEngine#set-audio-source) 接口设置音频采集源。

    - 仅设置音频采集源

        ```objc
        /** 使用麦克风作为音频采集源 */
        [[ZegoExpressEngine sharedEngine] setAudioSource:ZegoAudioSourceTypeMicrophone];
        ```

    - 设置音频采集源，同时设置混音配置

        ```objc
        ZegoAudioSourceMixConfig *audioSourceMixConfig = [ZegoAudioSourceMixConfig defaultConfig];

        /** 混入序号为 0 的媒体播放器播放的声音*/
        audioSourceMixConfig.mediaPlayerCount = 1;
        audioSourceMixConfig.mediaPlayerIndexList = (int *)malloc(sizeof(int)*1);
        audioSourceMixConfig.mediaPlayerIndexList[0] = 0;

        /** 混入序号为 0 的音效播放器播放的声音*/
        audioSourceMixConfig.audioEffectPlayerCount = 1;
        audioSourceMixConfig.audioEffectPlayerIndexList = (int *)malloc(sizeof(int)*1);
        audioSourceMixConfig.audioEffectPlayerIndexList[0] = 0;

        /** 使用麦克风作为音频采集源，且设置混音配置 */
        [[ZegoExpressEngine sharedEngine] setAudioSource:ZegoAudioSourceTypeMicrophone config:audioSourceMixConfig];

        free(audioSourceMixConfig.mediaPlayerIndexList);
        free(audioSourceMixConfig.audioEffectPlayerIndexList);
        ```

<Note title="说明">

- 如果需要使用自定义音频采集作为音频采集源，需设置音频采集源类型为 [ZegoAudioSourceTypeCustom](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~enum~ZegoAudioSourceType#zego-audio-source-type-custom)，调用 [sendCustomAudioCaptureAACData](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoExpressEngine#send-custom-audio-capture-aac-data-data-length-config-length-timestamp-samples-param-channel) 或 [sendCustomAudioCapturePCMData](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoExpressEngine#send-custom-audio-capture-pcm-data-data-length-param) 等接口向 SDK 发送音频数据，详情请参考 [进阶功能 - 自定义音频采集与渲染](https://doc-zh.zego.im/article/14831)。
- 如果需要使用媒体播放器作为音频采集源，需设置音频采集源类型为 [ZegoAudioSourceTypeMediaPlayer](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~enum~ZegoAudioSourceType#zego-audio-source-type-media-player)，调用 [createMediaPlayer](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoExpressEngine#create-media-player) 接口创建媒体播放器，然后使用刚创建的媒体播放器加载资源并播放，详情请参考 [媒体播放器](https://doc-zh.zego.im/article/14779) 。

</Note>

### 3 登录房间并推流

登录房间及推流流程，请参考实现视频通话的 [登录房间](https://doc-zh.zego.im/article/13415#createroom) 及 [推流](https://doc-zh.zego.im/article/13415#publishingStream) 。

### 4（可选）切换音视频采集源

1. 调用 [setVideoSource](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoExpressEngine#set-video-source) 接口切换视频采集源。

```objc
/** 使用屏幕共享作为视频采集源 */
[[ZegoExpressEngine sharedEngine] setVideoSource:ZegoVideoSourceTypeScreenCapture];
```

2. 调用 [setAudioSource](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoExpressEngine#set-audio-source) 接口切换音频采集源。

```objc
/** 使用媒体播放器作为音频采集源 */
[[ZegoExpressEngine sharedEngine] setAudioSource:ZegoAudioSourceTypeMediaPlayer];
```

### 5 结束推流

结束推流流程，请参考实现视频通话的 [停止推拉流](https://doc-zh.zego.im/article/13415#stopPublishingStream)。

```objc
/** 停止推流 */
[[ZegoExpressEngine sharedEngine] stopPublishingStream];
```


## 常见问题


<Accordion title="如何采集屏幕视频与系统声音?" defaultOpen="false">
如需采集屏幕视频与系统声音，请参考 [屏幕共享](https://doc-zh.zego.im/article/10460)。
</Accordion>

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

