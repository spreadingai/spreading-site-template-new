# 多源采集

- - -
## 功能简介

多源采集用于管理各个通道的音视频源配置，通过此能力您可以灵活快速的实现不同音视频内容的实时互动，如屏幕共享、混音等功能。

多源采集主要的能力特性与限制如下：
- 推流通道支持设置的多种音视频源，但同一个音视频源仅能被一个通道占用。
- 主路的音视频源支持动态切换，也支持音频的混音能力。辅路仅支持推流前指定采集源，不支持混音。
- 采集屏幕时，仅 iOS 及 Android 平台支持同时采集视频和音频；其他平台仅支持采集视频，如需采集音频，请开发者自行实现相关逻辑。

## 示例源码

相关源码请查看官网示例源码，详情请参考 [跑通示例源码](https://doc-zh.zego.im/article/21124) 获取源码。

## 前提条件

在使用多源采集功能之前，请确保：

- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppID 和 AppSign，详情请参考 [控制台 - 项目信息](/console/project-info)。
- 已在项目中集成 ZEGO Express SDK，并实现了基本的音视频推拉流功能，详情请参考 [快速开始 - 集成](https://doc-zh.zego.im/article/21125) 和 [快速开始 - 实现流程](https://doc-zh.zego.im/article/21036)。


## 实现流程

<Warning title="注意">

实时语音产品仅支持设置音频采集源。

</Warning>



### 1 创建 ZegoExpressEngine 引擎

创建 ZegoExpressEngine 引擎流程，请参考实现视频通话的 [创建引擎](https://doc-zh.zego.im/article/21036#createEngine)。

```js
// 引入 ZegoExpressEngine
const zgEngine = window.require('zego-express-engine-electron/ZegoExpressEngine');
const zgDefines = window.require('zego-express-engine-electron/ZegoExpressDefines');

// 指定使用直播场景 (请根据实际情况填写适合你业务的场景)
const profile = {
appID : xxx,
appSign : "xxx",
scenario : zgDefines.ZegoScenario.Default
};

zgEngine.createEngine(profile)
.then(() => {
    console.log("init succeed")
}).catch((e) => {
    console.log("init failed", e)
});
```

### 2 设置音视频采集源

1. 调用 [setVideoSource](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_electron~class~ZegoExpressEngine#set-video-source) 接口设置视频采集源。

```js
/** 使用摄像头作为视频采集源 */
zgEngine.setVideoSource(zgDefines.ZegoVideoSourceType.Camera, 0, zgDefines.ZegoPublishChannel.Main)
```

<Note title="说明">


- 如果需要使用自定义视频采集作为视频采集源，需设置视频采集源类型为 `Custom`，调用 [enableCustomVideoCapture](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_electron~class~ZegoExpressEngine#enable-custom-video-capture) 接口设置要发送的视频帧数据类型，然后向 SDK 注册自定义视频采集插件 [registerCustomVideoCapturePlugin](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_electron~class~ZegoExpressEngine#register-custom-video-capture-plugin)。
- 如果需要使用媒体播放器作为视频采集源，需先调用 [createMediaPlayer](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_electron~class~ZegoExpressEngine#create-media-player) 接口创建媒体播放器，再通过调用 [setVideoSource](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_electron~class~ZegoExpressEngine#set-video-source) 接口设置视频采集源类型为 `Player` 和设置视频采集源所使用的媒体播放器实例索引，然后再使用刚创建的媒体播放器加载资源并播放。
- 如果需要使用屏幕共享作为视频采集源，需设置视频采集源类型为 `ScreenCapture`，并开启屏幕共享向 SDK 推屏幕共享视频数据，详情请参考 [屏幕共享](https://doc-zh.zego.im/article/6519) 。


</Note>


2. 调用 [setAudioSource](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_electron~class~ZegoExpressEngine#set-audio-source) 接口设置音频采集源。

    - 仅设置音频采集源
        ```js
        /** 使用麦克风作为音频采集源 */
        zgEngine.setAudioSource(zgDefines.ZegoAudioSourceType.Microphone, zgDefines.ZegoPublishChannel.Main)
        ```

    - 设置音频采集源，同时设置混音配置
        ```js
        let audioSourceMixConfig;
        /** 混入系统声卡播放的声音*/
        audioSourceMixConfig.enableMixSystemPlayout = true;
        /** 混入 SDK 播放的声音*/
        audioSourceMixConfig.enableMixEnginePlayout = true;

        /** 混入媒体播放器播放的声音*/
        let mediaplayerList = []
        mp = zgEngine.createMediaPlayer();
        mediaplayerList.push(mp.getIndex())
        audioSourceMixConfig.mediaPlayerIndexList = mediaplayerList;

        /** 混入音效播放器播放的声音*/
        let audioplayerList = []
        audioEffectPlayer = zgEngine.createAudioEffectPlayer();
        audioplayerList.push(audioEffectPlayer.getIndex())
        audioSourceMixConfig.audioEffectPlayerIndexList = audioplayerList ;

        /** 使用麦克风作为音频采集源，且设置混音配置 */
        zgEngine.setAudioSourceWithConfig(zgDefines.ZegoAudioSourceType.Microphone, audioSourceMixConfig);
        ```

<Note title="说明">
- 如果需要使用自定义音频采集作为音频采集源，需设置音频采集源类型为 `Custom`，并且向 SDK 注册音频采集插件 [registerCustomAudioCapturePlugin](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_electron~class~ZegoExpressEngine#register-custom-audio-capture-plugin)。
- 如果需要使用媒体播放器作为音频采集源，需设置音频采集源类型为 `MediaPlayer`，调用 [createMediaPlayer](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_electron~class~ZegoExpressEngine#create-media-player) 接口创建媒体播放器，然后使用刚创建的媒体播放器加载资源并播放。
</Note>

### 3 登录房间并推流

登录房间及推流流程，请参考实现视频通话的 [登录房间](https://doc-zh.zego.im/article/21036#loginRoom) 及 [推流](https://doc-zh.zego.im/article/21036#startPublishingStream) 。

### 4（可选）切换音视频采集源

1. 调用 [setVideoSource](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_electron~class~ZegoExpressEngine#set-video-source) 接口切换视频采集源。

```js
/** 使用屏幕共享作为视频采集源 */
zgEngine.setVideoSource(zgDefines.ZegoVideoSourceType.ScreenCapture, 0, zgDefines.ZegoPublishChannel.Main)
```

2. 调用 [setAudioSource](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_electron~class~ZegoExpressEngine#set-audio-source) 接口切换音频采集源。

```js
/** 使用媒体播放器作为音频采集源 */
zgEngine.setAudioSource(zgDefines.ZegoAudioSourceType.MediaPlayer, zgDefines.ZegoPublishChannel.Main)
```

### 5 结束推流

结束推流流程，请参考实现视频通话的 [停止推拉流](https://doc-zh.zego.im/article/21036#stopPublishingStream)。

```js
/** 停止推流*/
zgEngine.stopPublishingStream(zgDefines.ZegoPublishChannel.Main);
```


## 常见问题

1. **如何采集屏幕视频与系统声音?**

如需采集屏幕视频与系统声音，请参考 [屏幕共享](https://doc-zh.zego.im/article/6519)。

2. **是否支持设置多个媒体播放器?**

支持，但需要注意相同的播放器实例仅能被一个通道占用。

3. **组合使用视频源和音频源时有哪些限制？**

    组合使用视频源和音频源限制如下：
    1. 主路不能使用媒体播放器的视频或音频源。
    2. 辅路使用媒体播放器作为音视频源时，需要主路使用并启动麦克风设备（`enableMicrophone`）。
    如果您主路不需要麦克风声音，可通过 `mutePublishStreamAudio` 禁用音频推流保持麦克风启动。
    3. 仅在主路使用摄像头视频源或者麦克风音频源时，辅路复制主路视频源或者音频源才能生效。
    4. 主路的音频来源不能设置为 `None`，否则会导致音频无法渲染。

<Content />

