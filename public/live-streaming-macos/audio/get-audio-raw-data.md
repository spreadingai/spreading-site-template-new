# 原始音频数据获取

- - -

## 功能简介

SDK 为开发者提供了获取原始音频数据的功能，获取的原始音频数据格式为 PCM，开发者可以将此数据写到本地设备中，实现录制音频。

## 示例源码下载

请参考 [下载示例源码](https://doc-zh.zego.im/article/21224) 获取源码。

相关源码请查看 “/ZegoExpressExample/Examples/AdvancedAudioProcessing/OriginalAudioDataAcquisition” 目录下的文件。

## 前提条件

在获取原始音频数据之前，请确保：

- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppID 和 AppSign，详情请参考 [控制台 - 项目信息](/console/project-info)。
- 已在项目中集成 ZEGO Express SDK，并实现了基本的音视频推拉流功能，详情请参考 [快速开始 - 集成](https://doc-zh.zego.im/article/21225) 和 [快速开始 - 实现流程](https://doc-zh.zego.im/article/21272)。



## 使用步骤

### 1 初始化 SDK

请参考 [快速开始 - 实现流程](https://doc-zh.zego.im/article/21272#CreateEngine) 的 “创建引擎”。

### 2 开启获取原始音频数据功能

开发者可调用 [startAudioDataObserver ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_macos~class~ZegoExpressEngine#start-audio-data-observer-param) 接口，开启音频数据回调监测。回调的音频数据类型为 [ZegoAudioDataCallbackBitMask](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_macos~enum~ZegoAudioDataCallbackBitMask)，包括有 `ZegoAudioDataCallbackBitMaskCaptured`、`ZegoAudioDataCallbackBitMaskPlayback`、`ZegoAudioDataCallbackBitMaskMixed`、`ZegoAudioDataCallbackBitMaskPlayer`，这四个回调类型都需要开启。

```objc
// 需要的音频数据类型 Bitmask，此处示例四个回调都开启
ZegoAudioDataCallbackBitMask bitmask = ZegoAudioDataCallbackBitMaskCaptured | ZegoAudioDataCallbackBitMaskPlayback | ZegoAudioDataCallbackBitMaskMixed | ZegoAudioDataCallbackBitMaskPlayer;

// 需要的音频数据参数，此处示例单声道、16 K
ZegoAudioFrameParam *param = [[ZegoAudioFrameParam alloc] init];
param.channel = ZegoAudioChannelMono;
param.sampleRate = ZegoAudioSampleRate16K;

// 开启获取原始音频数据功能
[[ZegoExpressEngine sharedEngine] startAudioDataObserver:bitmask param:param];
```

<Note title="说明">


如有需要可参考 [位掩码的使用](https://doc-zh.zego.im/article/8660)。
</Note>

### 3 设置回调获取原始音频数据并处理

开发者可调用 [setAudioDataHandler ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_macos~class~ZegoExpressEngine#set-audio-data-handler) 接口设置额外接收音频数据的回调。根据需要可实现回调 [onCapturedAudioData](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_macos~protocol~ZegoAudioDataHandler#on-captured-audio-data-data-length-param)、[onPlaybackAudioData](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_macos~protocol~ZegoAudioDataHandler#on-playback-audio-data-data-length-param)、[onMixedAudioData](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_macos~protocol~ZegoAudioDataHandler#on-mixed-audio-data-data-length-param)、[onPlayerAudioData](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_macos~protocol~ZegoAudioDataHandler#on-player-audio-data-data-length-param-stream-id)，分别对应上述 [ZegoAudioDataCallbackBitMask](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_macos~enum~ZegoAudioDataCallbackBitMask) 中的四个音频数据类型。

```objc
// 设置音频数据回调
[[ZegoExpressEngine sharedEngine] setAudioDataHandler:self];
```

```objc
// 根据需要实现以下四个回调，分别对应上述 Bitmask 的四个选项

- (void)onCapturedAudioData:(const unsigned char *)data dataLength:(unsigned int)dataLength param:(ZegoAudioFrameParam *)param {
    // 本地采集音频数据，推流后可收到回调
}

- (void)onPlaybackAudioData:(const unsigned char *)data dataLength:(unsigned int)dataLength param:(ZegoAudioFrameParam *)param {
    // SDK 播放的音频数据，在非拉流状态的引擎启动状态且未使用媒体播放器播放媒体文件状态时，回调的音频数据是静音的音频数据
}

- (void)onMixedAudioData:(const unsigned char *)data dataLength:(unsigned int)dataLength param:(ZegoAudioFrameParam *)param {
    // 本地采集与 SDK 播放的声音混合后的音频数据回调
}

- (void)onPlayerAudioData:(const unsigned char *)data dataLength:(unsigned int)dataLength param:(ZegoAudioFrameParam *)param streamID:(NSString *)streamID {
    // 远端拉流音频数据，开始拉流后每条拉流数据的回调
}
```

### 4 停止音频数据回调监测

若想停止音频数据回调监测，可调用 [stopAudioDataObserver ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_macos~class~ZegoExpressEngine#stop-audio-data-observer) 接口。

```objc
[[ZegoExpressEngine sharedEngine] stopAudioDataObserver];
```

<Content />