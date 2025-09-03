# 耳返与声道设置与声道设置

- - -

## 功能简介

ZEGO Express SDK 提供了耳返和双声道的功能，开发者可根据需要设置。

- 耳返，是指耳机采集监听，在设备上插入耳机（普通耳机或蓝牙耳机）后，能从本机耳机侧听到本设备麦克风采集的声音。
- 双声道，是指两个声音通道，听到声音时可以根据左耳和右耳对声音相位差来判断声源的具体位置。ZEGO Express SDK 默认音频采集单声道，当开发者有高音质需求时，可开启双声道采集功能，通过专门的双声道采集设备可以采集到双声道的音频数据并进行推流。

## 示例源码下载

请参考 [下载示例源码](https://doc-zh.zego.im/article/13411) 获取源码。

相关源码请查看 “/ZegoExpressExample/Examples/AdvancedAudioProcessing/EarReturnAndChannelSettings” 目录下的文件。

## 前提条件

在进行耳返与声道设置之前，请确保：

- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppID 和 AppSign，详情请参考 [控制台 - 项目信息](/console/project-info)。
- 已在项目中集成 ZEGO Express SDK，并实现了基本的音视频推拉流功能，详情请参考 [快速开始 - 集成](https://doc-zh.zego.im/article/13413) 和 [快速开始 - 实现流程](https://doc-zh.zego.im/article/13415)。


## 使用步骤

### 设置耳返

#### 开启耳返

开启预览后或者开始推流后，调用 [enableHeadphoneMonitor](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoExpressEngine#enable-headphone-monitor) 接口开启耳返（即开启采集监听），连接上耳机，用户发出声音后，即可听到自己的声音。

<Note title="说明">

开启耳返功能后，必须连接上耳机后，该功能才会实际生效。
</Note>

```objc
[[ZegoExpressEngine sharedEngine] enableHeadphoneMonitor:YES];
```

#### 设置耳返音量

开启预览后或者开始推流后，调用 [setHeadphoneMonitorVolume](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoExpressEngine#set-headphone-monitor-volume) 接口调整耳返的音量。

其中参数 “volume” 为采集耳返音量大小，取值范围为 [0, 200]，默认为 60。

```objc
[[ZegoExpressEngine sharedEngine] setHeadphoneMonitorVolume:60];
```

### 设置声道

<Warning title="注意">


[setAudioConfig](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoExpressEngine#set-audio-config) 和 [setAudioCaptureStereoMode](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoExpressEngine#set-audio-capture-stereo-mode) 都需要在 [startPublishingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoExpressEngine#start-publishing-stream)、[startPlayingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoExpressEngine#start-playing-stream-canvas)、[startPreview](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoExpressEngine#start-preview)、[createMediaPlayer](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoExpressEngine#create-media-player) 和 [createAudioEffectPlayer](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoExpressEngine#create-audio-effect-player) 之前调用才有效。
</Warning>

#### 设置音频双声道编码

调用 [setAudioConfig](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoExpressEngine#set-audio-config) 方法设置音频质量相关配置，其中音频编码声道参数 “channel” 需要设置为双声道编码（默认值为单声道编码），其他参数取默认值即可。

```objc
ZegoAudioConfig *audioConfig = [ZegoAudioConfig configWithPreset:ZegoAudioConfigPresetHighQualityStereo];
[[ZegoExpressEngine sharedEngine] setAudioConfig:audioConfig];
```

#### 设置音频采集双声道模式

<Note title="说明">


音频采集双声道模式，需要推流端使用支持双声道采集的设备作为音频输入源，一般手机的麦克风不支持采集双声道。
</Note>

调用 [setAudioCaptureStereoMode](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoExpressEngine#set-audio-capture-stereo-mode) 方法，根据实际场景设置 “Mode” 参数（默认为不开启双声道，即单声道采集）为“始终开启双声道采集”，开启音频双声道采集。

```objc
[[ZegoExpressEngine sharedEngine] setAudioCaptureStereoMode:ZegoAudioCaptureStereoModeAlways];
```

#### 推流

请参考 [快速开始 - 实现流程](https://doc-zh.zego.im/article/13415#publishingStream) 的 “推流”，此时所推流的音频是双声道，拉流端无需做额外的配置，直接拉流即可播放双声道音频。

## 常见问题

1. **推流端开启双声道采集后，拉流端（iOS）使用有线耳机能正常播放双声道，但使用 AirPods 播放时却变成了单声道？**

    iOS 由于系统限制，在使用蓝牙耳机时存在如下场景：
    - 如果拉流端既推流又需要拉流，例如通话场景下同时执行播放和录音操作，则只能播放单声道。
    - 如果确定拉流端仅需拉流而不用推流，则可以联系 ZEGO 技术支持获取解决方案。

<Content />

