# 原始音频数据获取

- - -

## 功能简介

SDK 为开发者提供了获取原始音频数据的功能，获取的原始音频数据格式为 PCM，开发者可以将此数据写到本地设备中，实现录制音频。


## 前提条件

在获取原始音频数据之前，请确保：

- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppID 和 AppSign，详情请参考 [控制台 - 项目信息](/console/project-info)。
- 已在项目中集成 ZEGO Express SDK，并实现了基本的音视频推拉流功能，详情请参考 [快速开始 - 集成](https://doc-zh.zego.im/article/6839) 和 [快速开始 - 实现流程](https://doc-zh.zego.im/article/9540)。


## 使用步骤

### 1 初始化 SDK

请参考 [快速开始 - 实现流程](https://doc-zh.zego.im/article/9540#CreateEngine) 的 “创建引擎”。

### 2 获取本地采集流的原始音频数据功能

开发者可调用 [setCaptureAudioFrameCallback ](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#set-capture-audio-frame-callback) 接口开启原始音频数据回调监测，回调参数 [ZegoAudioFrame](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~interface~ZegoAudioFrame)  包含了音频原始数据（channels），声道数（channelCount）和音频采样率（sampleRate）。当回调函数设置为 `null` 时会停止监听此条音频数据。

```js
// 创建音频流
const localStream = await zg.createZegoStream({camera :{audio:true,video:false}});
// 获取原始音频数据功能
zg.setCaptureAudioFrameCallback(
    localStream,
    (data) => {
        // data 的类型是  { channels: Float32Array[]; channelCount: number; sampleRate: number }
    }
);

// 停止音频数据回调
zg.setCaptureAudioFrameCallback(localStream, null);
```


### 3 获取拉流的原始音频数据功能

开发者可调用 [setAudioFrameCallback ](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#set-audio-frame-callback) 接口开启原始音频数据回调监测，回调参数 [ZegoAudioFrame](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~interface~ZegoAudioFrame) 包含了音频原始数据（channels），声道数（channelCount）和音频采样率（sampleRate）。当回调函数设置为 `null` 时会停止监听此条音频数据。

```js
// 拉流
const remoteStream = await zg.startPlayingStream(streamID);
// 获取原始音频数据功能
zg.setAudioFrameCallback(
    remoteStream,
    (data) => {
        // data 的类型是  { channels: Float32Array[]; channelCount: number; sampleRate: number }
    }
);
// 停止音频数据回调
zg.setAudioFrameCallback(streamID, null);
```

<Content />
