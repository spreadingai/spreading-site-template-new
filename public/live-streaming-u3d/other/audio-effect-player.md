# 音效文件播放器

- - -

## 功能简介

### 应用场景

音效，主要指为了增强真实感或者烘托场景氛围播放的简短效果音。例如：在直播期间，经常会有一些播放音效的场景，如掌声、礼物音效、提示音等。在游戏中，有时也需要播放子弹声、碰撞打击声等。

ZEGO Express SDK 提供音效文件播放器（ZegoAudioEffectPlayer），统一管理音效，支持音效播放（可以多音效重叠播放）、播放控制（如暂停播放、音量调节、设置播放进度）、预加载音效等功能。

<Warning title="注意">
本功能不支持在 WebGL 环境中运行使用。
</Warning>

### 支持格式

音效文件播放器支持以下格式：

**音频编码格式：**
- AAC、MP2、MP3、FLAC、WMA V1、WMA V2、PCM、AC3、EAC3

**容器格式：**
- WAV、FLAC、MP3、MP4、MOV、MPEG-TS、FLV、Matroska(MKV)、ASF

<Content />

## 示例源码下载

请参考 [下载示例源码](https://doc-zh.zego.im/article/21097) 获取源码。

相关源码请查看 “/ZegoExpressExample/Examples/AdvancedAudioProcessing” 目录下的文件。

## 前提条件

在实现音效文件播放器功能之前，请确保：

- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppID 和 AppSign，详情请参考 [控制台 - 项目信息](/console/project-info)。
- 已在项目中集成 ZEGO Express SDK，并实现了基本的音视频推拉流功能，详情请参考 [快速开始 - 集成](https://doc-zh.zego.im/article/21098) 和 [快速开始 - 实现流程](https://doc-zh.zego.im/article/21035)。


## 使用步骤

### 1 创建音效播放器

调用 [ZegoExpressEngine](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoExpressEngine) 的 [CreateAudioEffectPlayer](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoExpressEngine#create-audio-effect-player) 方法创建音效播放器实例。

<Warning title="注意">


引擎当前只支持同时创建一个实例，超出后将返回 `null`。

</Warning>



```cs
ZegoAudioEffectPlayer audioEffectPlayer = engine.CreateAudioEffectPlayer();
```

### 2（可选）预加载资源

<Accordion title="预加载资源" defaultOpen="false">
在频繁播放相同音效场景中，SDK 为了优化重复读文件并解码的性能，提供了预加载音效文件到内存中的功能。

调用  [LoadResource](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoAudioEffectPlayer#load-resource) 方法加载音效资源，可通过 “callback” 参数来监听加载的结果，显示加载成功后方可播放。

<Note title="说明">


最多支持同时预加载 15 个本地音效文件（不支持网络资源），并且单个音效文件时长不能超过 30s，否则加载会报错。

</Note>



当加载的音效使用完成后，可以调用 [UnloadResource](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoAudioEffectPlayer#unload-resource) 接口卸载，以释放相关资源，否则 SDK 将在 [ZegoAudioEffectPlayer](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoAudioEffectPlayer) 实例释放时，自动卸载已加载的音效。

<Note title="说明">


预加载为非必须操作，为了提高性能或者需要反复播放某个特定的音效时推荐使用。

</Note>




```cs
// 加载音效资源
audioEffectPlayer.LoadResource(audioEffectID, "path", (int errorCode)=>{

});

// 卸载音效资源
audioEffectPlayer.UnloadResource(audioEffectID);
```
</Accordion>

### 3 播放控制

#### （可选）为音效播放器设置事件回调

<Accordion title="音效播放器事件回调设置" defaultOpen="false">
可以根据需要监听音效播放器的 [OnAudioEffectPlayStateUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~IZegoAudioEffectPlayerHandler#on-audio-effect-play-state-update) 方法为播放器设置事件回调，用于监听“音效播放状态改变”等通知。

```cs
public void OnAudioEffectPlayStateUpdate(ZegoAudioEffectPlayer audioEffectPlayer, uint audioEffectID, ZegoAudioEffectPlayState state, int errorCode) {

}
```
</Accordion>


#### 开始播放

调用 [Start](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoAudioEffectPlayer#start) 方法播放音效，目前仅支持同时播放 12 个，且只能为本地文件，不支持播放网络资源。

* 如果已通过 [LoadResource](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoAudioEffectPlayer#load-resource) 方法预先加载了音效，则只需要传入预加载时的 “audioEffectID”，“path”（音效资源的路径）字段传空即可。

<Warning title="注意">


    `audioEffectID` 需要保持全局唯一。

</Warning>



* 若需要重复播放可以通过 [ZegoAudioEffectPlayConfig](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~struct~ZegoAudioEffectPlayConfig) 中 “playCount” 配置重复次数。如果设置为 “0”，则表示无限重复播放，直到用户手动调用 [Stop](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoAudioEffectPlayer#stop) 停止。

```cs
uint audioEffectID = 1;
ZegoAudioEffectPlayConfig playConfig = new ZegoAudioEffectPlayConfig();
config.playCount = 10;
config.isPublishOut = true;
audioEffectPlayer.Start(audioEffectID,"path",playConfig);
```

#### 暂停/恢复/停止播放

- **暂停播放**：调用 [Pause](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoAudioEffectPlayer#pause) 方法可以暂停播放 “audioEffectID” 指定的音效，调用 [PauseAll](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoAudioEffectPlayer#pause-all) 方法则暂停所有正在播放的音效。
- **恢复播放**：音效暂停播放后，调用 [Resume](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoAudioEffectPlayer#resume) 方法可以恢复播放 “audioEffectID” 指定的音效，调用 [ResumeAll](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoAudioEffectPlayer#resume-all) 方法则恢复所有已暂停音效。
- **停止播放**：调用 [Stop](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoAudioEffectPlayer#stop) 方法可以停止播放 “audioEffectID” 指定的音效，调用 [StopAll](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoAudioEffectPlayer#stop-all) 方法则停止播放所有音效。

```cs
audioEffectPlayer.Pause(audioEffectID);
audioEffectPlayer.Resume(audioEffectID);
audioEffectPlayer.Stop(audioEffectID);
audioEffectPlayer.PauseAll();
audioEffectPlayer.ResumeAll();
audioEffectPlayer.StopAll();
```

#### 调节音量

- 调用 [SetVolume](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoAudioEffectPlayer#set-volume) 方法可以设置 “audioEffectID” 指定的音效音量，取值范围为 [0, 200]，默认值为 “100”。
- 调用 [SetVolumeAll](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoAudioEffectPlayer#set-volume-all) 方法则同时设置所有音效音量，取值范围为 [0, 200]，默认值为 “100”。

```cs
int volume =70;
audioEffectPlayer.SetVolume(audioEffectID, volume);

// 设置所有音效的音量
audioEffectPlayer.SetVolumeAll(volume);
```

#### 播放进度控制

- 调用 [GetTotalDuration](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoAudioEffectPlayer#get-total-duration) 方法获取单个音效的总时长。
- 调用 [GetCurrentProgress](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoAudioEffectPlayer#get-current-progress) 方法获取音效当前播放进度。
- 调用 [SeekTo](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoAudioEffectPlayer#seek-to) 方法可以根据需要设置播放进度。

```cs
// 获取音效的总时长
ulong totalDuration = audioEffectPlayer.GetTotalDuration(audioEffectID);
// 获取音效当前播放进度
ulong progress = audioEffectPlayer.GetCurrentProgress(audioEffectID);
// 设置播放进度
audioEffectPlayer.SeekTo(audioEffectID, 1, (int errorCode)=>{

});
```

### 4 销毁媒体播放器

使用完音效播放器后，需要及时调用 [DestroyAudioEffectPlayer](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoExpressEngine#destroy-audio-effect-player) 方法销毁，释放该播放器占用的资源。

```cs
engine.DestroyAudioEffectPlayer(audioEffectPlayer);
```

## 常见问题

1. **音效播放器与媒体播放器有什么区别？**

<table>

    <tbody><tr>
    <th>播放器类型</th>
    <th>区别</th>
    </tr>
    <tr>
    <td>
    媒体播放器
    </td>
    <td>主要用于播放视频及较长的音乐，支持播放网络资源。同一时间最多支持创建 4 个播放器实例，一个实例只能播放一个音视频。</td>
    </tr>
    <tr>
    <td>音效播放器</td>
    <td>主要用于播放时间较短的音效，不支持播放网络资源。同一时间只支持创建一个音效播放器实例，音效播放器支持多路音效并发播放，一个实例最多同时播放 12 个音效。</td>
    </tr>
    </tbody></table>

<Content />

