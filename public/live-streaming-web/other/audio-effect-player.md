# 音效文件播放器

- - -

## 功能简介

音效，主要指为了增强真实感或者烘托场景氛围播放的简短效果音。例如：在直播期间，经常会有一些播放音效的场景，如掌声、礼物音效、提示音等。在游戏中，有时也需要播放子弹声、碰撞打击声等。

ZEGO Express SDK 提供的音效文件播放器（ZegoAudioEffectPlayer），统一管理媒体流上的音效，支持音效播放（可以多音效重叠播放）、播放控制（如暂停播放、音量调节、设置播放进度）、音效预加载等功能。

### 支持格式

音效文件播放器支持以下格式：

**音频编码格式：**
- AAC、MP2、MP3、FLAC、WMA V1、WMA V2、PCM、AC3、EAC3

**容器格式：**
- WAV、FLAC、MP3、MP4、MOV、MPEG-TS、FLV、Matroska(MKV)、ASF

<Content />

<Warning title="注意">

在线音频文件的地址需要符合 [浏览器的同源策略](https://developer.mozilla.orghttps://doc-zh.zego.im/article-CN/docs/Web/Security/Same-origin_policy)。

</Warning>




## 前提条件

在实现音效文件播放器功能之前，请确保：

- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppID 和 Server 地址，详情请参考 [控制台 - 项目信息](/console/project-info)。
- 已在项目中集成 ZEGO Express SDK，并实现了基本的音视频推拉流功能，详情请参考 [快速开始 - 集成](https://doc-zh.zego.im/article/199) 和 [快速开始 - 实现流程](https://doc-zh.zego.im/article/7638)。

## 使用步骤

### 1 创建音效播放器

调用 [ZegoExpressEngine](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine) 的 [createAudioEffectPlayer](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#create-audio-effect-player) 方法创建音效播放器实例。

<Warning title="注意">


每个媒体流对象只支持同时创建一个 [ZegoAudioEffectPlayer](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoAudioEffectPlayer) 实例。

</Warning>



```js
// localStream 为通过 createZegoStream 创建的 ZegoLocalStream 实例对
const audioEffectPlayer = zg.createAudioEffectPlayer(
    localStream
)
```

### 2（可选）预加载资源

在频繁播放相同音效的场景中，SDK 为了优化重复下载文件并解码的网络和性能浪费，提供了预加载音效文件到内存中的功能。使用预加载音效还可以提前把音效加载好，避免出现通过 [start](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoAudioEffectPlayer#start) 接口播放音效时加载慢导致播放延迟的问题。

调用 [ZegoExpressEngine](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine) 的 [loadAudioEffect](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#load-audio-effect) 接口加载音效资源，通过 Promise 获取异步加载结果。

当加载的音效使用完成后，可以调用 [unloadAudioEffect](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#unload-audio-effect) 接口卸载音效资源，以释放相关资源。

<Note title="说明">


预加载为非必须操作，为了提高性能或者需要反复播放某个特定的音效时推荐使用。

</Note>



```js
const audioEffectID = "2";
// 在线音频文件地址
const path = "https//xxx.mp3";

// 加载音效资源
zg.loadAudioEffect(audioEffectID, path).then(res=>{
    // 音效加载完成
});

// 加载完成后可释放音效资源
zg.unloadAudioEffect(audioEffectID);
```

### 3 播放控制

#### 开始播放

调用 [start](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoAudioEffectPlayer#start) 接口播放音效。

* “audioEffectID” 需要保持全局唯一，“options.path” 为 MP3、M4A、AAC、WAV 或浏览器支持的其他音频格式的在线音频文件地址。

* 如果已通过 [loadAudioEffect](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#load-audio-effect) 方法预先加载了音效，则只需要传入预加载时的 “audioEffectID”，“options.path”（音效资源的路径）字段传空即可。

```js
const audioEffectID = "1"
const options = {
    // 音效文件地址
    path: "https://xxx.mp3"
}
audioEffectPlayer.start(
    audioEffect.id,
    options,
    () => {
        // 音效播放开始回调
    },
    () => {
        // 音效播放结束回调
    }
)
```

#### 暂停/恢复/停止播放

1. 调用 [pause](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressPlayer#pause) 接口可以暂停播放 “audioEffectID” 指定的音效， 不传 “audioEffectID” 则暂停所有正在播放的音效。

```js
// 暂停指定音效
audioEffectPlayer.pause(audioEffectID);
// 暂停所有音效
audioEffectPlayer.pauseAll();
```

2. 音效暂停播放后，调用 [resume](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoAudioEffectPlayer#resume) 接口可以恢复播放 “audioEffectID” 指定的音效，不传 “audioEffectID” 则恢复所有已暂停音效。

```js
// 恢复指定音效
audioEffectPlayer.resume(audioEffectID);
// 恢复所有音效
audioEffectPlayer.resume();
```

3. 调用 [stop](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoAudioEffectPlayer#stop) 接口可以停止播放 “audioEffectID” 指定的音效，不传 “audioEffectID” 则停止播放所有音效。

```js
// 停止指定音效
audioEffectPlayer.stop(audioEffectID);
// 停止所有音效
audioEffectPlayer.stop();
```

#### 调节音量

调用 [setVolume](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoAudioEffectPlayer#set-volume) 接口可以设置 “audioEffectID” 指定的音效音量，音量 “volume” 取值范围为 [0, 100]，默认值为 100。

```js
const volume = 70;
audioEffectPlayer.setVolume(audioEffectID, volume);
```

#### 播放进度控制

1. 调用 [getTotalDuration](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoAudioEffectPlayer#get-total-duration) 接口获取单个音效的总时长，单位为毫秒。
2. 调用 [getCurrentProgress](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoAudioEffectPlayer#get-current-progress) 接口获取音效当前播放进度。
3. 调用 [seekTo](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoAudioEffectPlayer#seek-to) 接口可以根据需要设置播放进度。

```js
// 获取音效的总时长
long totalDuration = audioEffectPlayer.getTotalDuration(audioEffectID);
// 获取音效当前播放进度
long progress = audioEffectPlayer.getCurrentProgress(audioEffectID);
// 设置播放进度, 示例跳到音效进度中间位置
audioEffectPlayer.seekTo(audioEffectID, totalDuration/2);
```

<Content />

