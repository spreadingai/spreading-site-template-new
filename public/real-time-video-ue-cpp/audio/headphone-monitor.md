# 耳返与声道设置

- - -

## 功能简介

ZEGO Express SDK 提供了耳返和双声道的功能，开发者可根据需要设置。

- 耳返，是指耳机采集监听，在设备上插入耳机（普通耳机或蓝牙耳机）后，能从本机耳机侧听到本设备麦克风采集的声音。
- 双声道，是指两个声音通道，听到声音时可以根据左耳和右耳对声音相位差来判断声源的具体位置。ZEGO Express SDK 默认音频采集单声道，当开发者有高音质需求时，可开启双声道采集功能，通过专门的双声道采集设备可以采集到双声道的音频数据并进行推流。

## 前提条件

在进行耳返与声道设置之前，请确保：

- 已在项目中集成 ZEGO Express SDK，实现基本的实时语音功能，详情请参考 [快速开始 - 集成](https://doc-zh.zego.im/article/17991) 和 [快速开始 - 实现流程](https://doc-zh.zego.im/article/17992)。
- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppID 和 AppSign，详情请参考 [控制台 - 项目管理](/console/project-info) 中的“项目信息”。


## 使用步骤

### 设置耳返

#### 开启耳返

开启预览后或者开始推流后调用 [enableHeadphoneMonitor](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_ue~class~IZegoExpressEngine#enable-headphone-monitor) 开启采集监听即耳返，主播方讲话后，会听到自己的声音。

<Note title="说明">


开启耳返后，在连接上耳麦时耳返功能才实际生效。

</Note>



```cpp
engine->enableHeadphoneMonitor(true);
```

#### 设置耳返音量

开启预览后或者开始推流后可调用 [setHeadphoneMonitorVolume](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_ue~class~IZegoExpressEngine#set-headphone-monitor-volume) 调整耳返的音量。

其中参数 “volume” 为采集耳返音量大小，取值范围为 0 ～ 200，默认 “60”。

```cpp
engine->setHeadphoneMonitorVolume(60);
```

### 设置声道

<Warning title="注意">


[setAudioConfig](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_ue~class~IZegoExpressEngine#set-audio-config) 和 [setAudioCaptureStereoMode](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_ue~class~IZegoExpressEngine#set-audio-capture-stereo-mode) 都需要在 [startPublishingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_ue~class~IZegoExpressEngine#start-publishing-stream)、[startPlayingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_ue~class~IZegoExpressEngine#start-playing-stream)、[startPreview](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_ue~class~IZegoExpressEngine#start-preview)、[createMediaPlayer](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_ue~class~IZegoExpressEngine#create-media-player) 和 [createAudioEffectPlayer](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_ue~class~IZegoExpressEngine#create-audio-effect-player) 之前调用才有效。

</Warning>



#### 设置音频双声道编码

在推流前调用 [setAudioConfig](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_ue~class~IZegoExpressEngine#set-audio-config) 方法设置音频质量相关配置，其中音频编码声道参数 “channel” 需要设置为双声道编码（默认值为单声道编码），其他参数取默认值即可。

```cpp
ZegoAudioConfig audioConfig = ZegoAudioConfig(ZEGO_AUDIO_CONFIG_PRESET_HIGH_QUALITY_STEREO);
ZegoExpressSDK::getEngine()->setAudioConfig(audioConfig);
```

#### 设置音频采集双声道模式

调用 [setAudioCaptureStereoMode](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_ue~class~IZegoExpressEngine#set-audio-capture-stereo-mode) 方法开启音频双声道采集，并根据实际场景设置 “Mode” 参数（默认值为始终不开启双声道），用于实现始终开启双声道采集或仅在推流时开启双声道。

```cpp
ZegoExpressSDK::getEngine()->setAudioCaptureStereoMode(ZEGO_AUDIO_CAPTURE_STEREO_MODE_ALWAYS);
```

#### 推流

请参考 [快速开始 - 实现流程](https://doc-zh.zego.im/article/18088#3_3) 的 “推流”，此时所推流的音频是双声道，拉流端无需做额外的配置，直接拉流即可播放双声道音频。

<Note title="说明">


双声道采集需要推流端使用支持双声道采集的设备作为音频输入源，一般手机的麦克风不支持采集双声道。

</Note>



<Content />


