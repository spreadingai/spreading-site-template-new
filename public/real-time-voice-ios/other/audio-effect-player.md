# 音效文件播放器

- - -

## 功能简介

音效，主要指为了增强真实感或者烘托场景氛围播放的简短效果音。例如：在直播期间，经常会有一些播放音效的场景，如掌声、礼物音效、提示音等。在游戏中，有时也需要播放子弹声、碰撞打击声等。

ZEGO Express SDK 提供的音效文件播放器（ZegoAudioEffectPlayer），统一管理音效，支持音效播放（可以多音效重叠播放）、播放控制（如暂停播放、音量调节、设置播放进度）、音效预加载等功能。

### 支持格式

音效文件播放器支持以下格式：

**音频编码格式：**
- AAC、MP2、MP3、FLAC、WMA V1、WMA V2、PCM、AC3、EAC3

**容器格式：**
- WAV、FLAC、MP3、MP4、MOV、MPEG-TS、FLV、Matroska(MKV)、ASF

<Content />
## 示例源码下载

请参考 [下载示例源码](https://doc-zh.zego.im/article/3582) 获取源码。

相关源码请查看 “/ZegoExpressExample/Examples/AdvancedAudioProcessing/AudioEffectPlayer” 目录下的文件。

## 前提条件

在实现音效文件播放器功能之前，请确保：

- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppID 和 AppSign，详情请参考 [控制台 - 项目信息](/console/project-info)。
- 已在项目中集成 ZEGO Express SDK，并实现了基本的音视频推拉流功能，详情请参考 [快速开始 - 集成](https://doc-zh.zego.im/article/3574) 和 [快速开始 - 实现流程](https://doc-zh.zego.im/article/7631)。


## 使用步骤

### 1 创建音效播放器

调用 [ZegoExpressEngine](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~objective-c_ios~class~ZegoExpressEngine) 的 [createAudioEffectPlayer](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~objective-c_ios~class~ZegoExpressEngine#create-audio-effect-player) 方法创建音效播放器实例。

<Warning title="注意">


引擎当前只支持同时创建一个实例，超出后将返回 `nil`。
</Warning>

```objc
@property (nonatomic, strong) ZegoAudioEffectPlayer *audioEffectPlayer;
```

```objc
self.audioEffectPlayer = [[ZegoExpressEngine sharedEngine] createAudioEffectPlayer];
if (!self.audioEffectPlayer) {
    NSLog(@"创建音效播放器失败");
}
```

### 2（可选）预加载资源

<Accordion title="预加载资源" defaultOpen="false">
在频繁播放相同音效场景中，SDK 为了优化重复读文件并解码的性能，提供了预加载音效文件到内存中的功能。

调用 [loadResource](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~objective-c_ios~class~ZegoAudioEffectPlayer#load-resource-audio-effect-id-callback) 方法加载音效资源，可通过 “callback” 参数来监听加载的结果，显示加载成功后方可播放。最多支持同时预加载 15 个本地音效文件（不支持网络资源），并且单个音效文件时长不能超过 30s，否则加载会报错。

当加载的音效使用完成后，可以调用 [unloadResource](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~objective-c_ios~class~ZegoAudioEffectPlayer#unload-resource) 接口卸载，以释放相关资源。否则 SDK 将在 [ZegoAudioEffectPlayer](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~objective-c_ios~class~ZegoAudioEffectPlayer) 实例释放时会自动卸载已加载的音效。

<Note title="说明">


预加载为非必须操作，为了提高性能或者需要反复播放某个特定的音效时推荐使用。
</Note>


```objc
// 此处示例获取已存放于 App Bundle 内的 test.wav 资源
NSString *filePath = [[NSBundle mainBundle] pathForResource:@"test" ofType:@"wav"];

[self.audioEffectPlayer loadResource:filePath audioEffectID:0 callback:^(int errorCode) {
    NSLog(@"loadResource result, errorCode: %d", errorCode);
}];
```
</Accordion>

### 3 播放控制

#### （可选）为音效播放器设置事件回调

<Accordion title="音效播放器事件回调设置" defaultOpen="false">
可以根据需要调用音效播放器的 [setEventHandler](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~objective-c_ios~class~ZegoAudioEffectPlayer#set-event-handler) 方法为播放器设置事件回调，用于监听“音效播放状态改变”等通知。

```objc
[self.audioEffectPlayer setEventHandler:self];
```

```objc
- (void)audioEffectPlayer:(ZegoAudioEffectPlayer *)audioEffectPlayer audioEffectID:(unsigned int)audioEffectID playStateUpdate:(ZegoAudioEffectPlayState)state errorCode:(int)errorCode {
    NSLog(@"Play state update. ID:%d, state:%lu, err:%d", audioEffectID, (unsigned long)state, (int)errorCode);
}
```
</Accordion>


#### 开始播放

调用 [start ](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~objective-c_ios~class~ZegoAudioEffectPlayer#start-path-config) 方法播放音效，目前仅支持同时播放 12 个，且只能为本地文件，不支持播放网络资源。 其中 “audioEffectID” 需要保持全局唯一。

* 如果已通过 [loadResource](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~objective-c_ios~class~ZegoAudioEffectPlayer#load-resource-audio-effect-id-callback) 方法预先加载了音效，则只需要传入预加载时的 “audioEffectID”，“path”（音效资源的路径）字段传空即可。
* 若需要重复播放可以通过 [ZegoAudioEffectPlayConfig](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~objective-c_ios~class~ZegoAudioEffectPlayConfig) 中 “playCount” 配置重复次数。如果设置为 “0”，则表示无限重复播放，直到用户手动调用 [stop](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~objective-c_ios~class~ZegoAudioEffectPlayer#stop) 停止。

```objc
// 此处示例获取已存放于 App Bundle 内的 test.wav 资源
NSString *filePath = [[NSBundle mainBundle] pathForResource:@"test" ofType:@"wav"];

ZegoAudioEffectPlayConfig *config = [[ZegoAudioEffectPlayConfig alloc] init];
// 播放一次
config.playCount = 1; 
// 播放混入推流中
config.isPublishOut = YES; 

// 使用 0 作为此次的 audioEffectID
[self.audioEffectPlayer start:0 path:filePath config:config];
```

#### 暂停/恢复/停止播放

1. 调用 [pause](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~objective-c_ios~class~ZegoAudioEffectPlayer#pause) 方法可以暂停播放 “audioEffectID” 指定的音效，调用 [pauseAll](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~objective-c_ios~class~ZegoAudioEffectPlayer#pause-all) 方法则暂停所有正在播放的音效。
2. 音效暂停播放后，调用 [resume](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~objective-c_ios~class~ZegoAudioEffectPlayer#resume) 方法可以恢复播放 “audioEffectID” 指定的音效，调用 [resumeAll](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~objective-c_ios~class~ZegoAudioEffectPlayer#resume-all) 方法则恢复所有已暂停音效。
3. 调用 [stop](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~objective-c_ios~class~ZegoAudioEffectPlayer#stop) 方法可以停止播放 “audioEffectID” 指定的音效，调用 [stopAll](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~objective-c_ios~class~ZegoAudioEffectPlayer#stop-all) 方法则停止播放所有音效。

```objc
// 暂停 0 号 audioEffectID 资源的播放
[self.audioEffectPlayer pause:0];

// 恢复 0 号 audioEffectID 资源的播放
[self.audioEffectPlayer resume:0];

// 停止 0 号 audioEffectID 资源的播放
[self.audioEffectPlayer stop:0];

// 暂停所有资源的播放
[self.audioEffectPlayer pauseAll];

// 恢复所有资源的播放
[self.audioEffectPlayer resumeAll];

// 停止所有资源的播放
[self.audioEffectPlayer stopAll];
```

#### 调节音量

1. 调用 [setVolume](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~objective-c_ios~class~ZegoAudioEffectPlayer#set-volume-audio-effect-id) 方法可以设置 “audioEffectID” 指定的音效音量，取值范围为 [0, 200]，默认值为 “100”。
2. 调用 [setVolumeAll](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~objective-c_ios~class~ZegoAudioEffectPlayer#set-volume-all) 方法则同时设置所有音效音量，取值范围为 [0, 200]，默认值为 “100”。

```objc
// 设置 0 号 audioEffectID 的音量为 100
[self.audioEffectPlayer setVolume:100 audioEffectID:0];

// 设置所有资源的音量为 100
[self.audioEffectPlayer setVolumeAll:100];
```

#### 播放进度控制

1. 调用 [getTotalDuration](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~objective-c_ios~class~ZegoAudioEffectPlayer#get-total-duration) 方法获取单个音效的总时长。
2. 调用 [getCurrentProgress](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~objective-c_ios~class~ZegoAudioEffectPlayer#get-current-progress) 方法获取音效当前播放进度。
3. 调用 [seekTo](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~objective-c_ios~class~ZegoAudioEffectPlayer#seek-to-audio-effect-id-callback) 方法可以根据需要设置播放进度。

```objc
// 获取 0 号 audioEffectID 的总时长
unsigned long long totalDuration = [self.audioEffectPlayer getTotalDuration:0];

// 获取 0 号 audioEffectID 的当前播放进度
unsigned long long currentProgress = [self.audioEffectPlayer getCurrentProgress:0];

// 设置 0 号 audioEffectID 的播放进度为总进度的一半
[self.audioEffectPlayer seekTo:(unsigned long long)(totalDuration / 2) audioEffectID:0 callback:^(int errorCode) {
    NSLog(@"seekTo result: %d", errorCode);
}];
```

### 4 销毁音效文件播放器

使用完音效播放器后，需要及时调用 [destroyAudioEffectPlayer](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~objective-c_ios~class~ZegoExpressEngine#destroy-audio-effect-player) 方法销毁，释放该播放器占用的资源。

```objc
[[ZegoExpressEngine sharedEngine] destroyAudioEffectPlayer:self.audioEffectPlayer];
```

## 常见问题

1. **音效播放器与媒体播放器有什么区别？**

| 播放器类型   | 区别 |
| -------- | ------------------------------------------------------------ |
| 媒体播放器 | 主要用于播放视频及较长的音乐，支持播放网络资源。同一时间最多支持创建 4 个播放器实例，一个实例只能播放一个音视频。 |
| 音效播放器 | 主要用于播放时间较短的音效，不支持播放网络资源。同一时间只支持创建一个音效播放器实例，音效播放器支持多路音效并发播放，一个实例最多同时播放 12 个音效。 |

<Content />