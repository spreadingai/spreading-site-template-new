# 音频 3A 处理

- - -

## 功能简介

在实时音视频通话或直播时，可以对音频进行 3A 处理，主要包括 AEC（Acoustic Echo Cancelling，回声消除）、AGC（Automatic Gain Control，自动增益控制）和 ANS（Active Noise Control，降噪），以提高通话或直播质量和用户体验。

- AEC（回声消除）：对采集到的音频数据进行过滤以减少音频中的回声。
- AGC（自动增益控制）：开启该功能后，SDK 能够自动调节麦克风音量，适应远近拾音，保持音量稳定。
- ANS（降噪）：识别声音中的背景噪声并进行消除，开启该功能后可以使人声更加清晰。同时您可以开启音乐场景检测，实时无消耗识别通讯和音乐场景，在音乐场景对人声以及音乐的音质进一步保真。如果用户需要更加激进的降噪策略，可使用 [场景化 AI 降噪](https://doc-zh.zego.im/article/15222) 功能。

<Warning title="注意">


如需使用音乐场景检测能力，请联系 ZEGO 技术支持进行特殊编包与配置。
</Warning>


## 示例源码下载

请参考 [下载示例源码](https://doc-zh.zego.im/article/14296) 获取源码。

相关源码请查看 “/ZegoExpressExample/Examples/AdvancedAudioProcessing/AEC_ANS_AGC” 目录下的文件。

## 默认配置与推荐配置

SDK 中音频 3A 处理的默认配置和推荐配置如下：

|接口名称|接口描述|默认配置|推荐配置
|-|-|-|-|
|[enableAEC](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cpp_macos~class~IZegoExpressEngine#enable-aec)|开/关回声消除。 |未调用此函数前，SDK 内部会自动判断是否需要使用 AEC，一旦调用此函数，则 SDK 不再自动判断。|在一般使用场景中，建议不修改该配置，保持默认即可。|
|[setAECMode](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cpp_macos~class~IZegoExpressEngine#set-aec-mode)|设置回声消除模式。|ZEGO_AEC_MODE_AGGRESSIVE（激进的回声抵消）。|在一般使用场景中，建议不修改该配置，保持默认即可。|
|[enableAGC](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cpp_macos~class~IZegoExpressEngine#enable-agc)|开/关自动增益控制。|未调用此函数前，SDK 内部会自动判断是否需要使用 AGC，一旦调用此函数，则 SDK 不再自动判断。|<ul><li>在普通语聊场景中，建议使用默认配置。</li><li>在音乐电台场景中，建议不开启自动增益控制以还原人声。</li><li>在教育场景中，如大班课、小班课和 1v1 等，建议开启自动增益控制。</li></ul>|
|[enableANS](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cpp_macos~class~IZegoExpressEngine#enable-ans)|开/关噪声抑制。|未调用此函数前，SDK 内部会自动判断是否需要使用 ANS，一旦调用此函数，则 SDK 不再自动判断。|在一般使用场景中，建议不修改该配置，保持默认即可。|
|[enableTransientANS](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cpp_macos~class~IZegoExpressEngine#enable-transient-ans)|开/关瞬态噪声抑制。|未调用此函数时，默认不开启瞬态噪声抑制。|在一般使用场景中，建议不修改该配置，保持默认即可。|
|[setANSMode](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cpp_macos~class~IZegoExpressEngine#set-ans-mode)|设置音频噪声抑制模式。|ZEGO_ANS_MODE_MEDIUM（适度的噪声抑制）。|在一般使用场景中，建议不修改该配置，保持默认即可。|

## 前提条件

在使用音频 3A 处理之前，请确保：

- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppID 和 AppSign，详情请参考 [控制台 - 项目信息](/console/project-info)。
- 已在项目中集成 ZEGO Express SDK，并实现了基本的音视频推拉流功能，详情请参考 [快速开始 - 集成](https://doc-zh.zego.im/article/16878) 和 [快速开始 - 实现流程](https://doc-zh.zego.im/article/16880)。


## 使用步骤

### 设置 AEC（回声消除）

<Warning title="注意">


[enableAEC](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cpp_macos~class~IZegoExpressEngine#enable-aec)、[enableHeadphoneAEC](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cpp_macos~class~IZegoExpressEngine#enable-headphone-aec) 和 [setAECMode](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cpp_macos~class~IZegoExpressEngine#set-aec-mode) 都需要在 [startPublishingStream](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cpp_macos~class~IZegoExpressEngine#start-publishing-stream)、[startPlayingStream](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cpp_macos~class~IZegoExpressEngine#start-playing-stream)、[startPreview](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cpp_macos~class~IZegoExpressEngine#start-preview)、[createMediaPlayer](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cpp_macos~class~IZegoExpressEngine#create-media-player)、[createAudioEffectPlayer](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cpp_macos~class~IZegoExpressEngine#create-audio-effect-player) 和 [createRealTimeSequentialDataManager](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cpp_macos~class~IZegoExpressEngine#create-real-time-sequential-data-manager) 这些接口之前调用才有效。
</Warning>

开发者可以按照以下步骤完成回声消除相关设置：

1. 调用 [enableAEC](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cpp_macos~class~IZegoExpressEngine#enable-aec) 接口开启回声消除，该功能开启后，SDK 会对采集到的音频数据进行过滤以减少音频中的回声。
2. （可选）开发者可通过调用 [enableHeadphoneAEC](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cpp_macos~class~IZegoExpressEngine#enable-headphone-aec) 接口设置是否在使用耳机的时候开启回声消除。
3. 开启回声消除后，开发者可通过调用 [setAECMode](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cpp_macos~class~IZegoExpressEngine#set-aec-mode) 接口设置回声消除模式。SDK 支持以下三种回声消除模式：

    |枚举值|说明|
    |-|-|
    |ZEGO_AEC_MODE_AGGRESSIVE| 激进的回声抵消，可能会比较明显的影响音质，但是回声会消除得很干净。|
    |ZEGO_AEC_MODE_MEDIUM|适度的回声抵消，可能会稍微影响一点点音质，但是残留的回声会更少。|
    |ZEGO_AEC_MODE_SOFT|舒适的回声抵消，回声抵消基本不会影响声音的音质，可能有时会残留一点回声，但不会影响正常听音。|

<Warning title="注意">


Express SDK 支持 AI 回声消除，在有效消除回声基础上，进一步提升人声的保真度。如需使用 AI 回声消除功能，请先联系 ZEGO 技术支持进行特殊编包。
</Warning>

以设置适度的回声抵消为例：

```cpp
// 开启 AEC
engine->enableAEC(true);
// 设置 AEC 模式为 ZEGO_AEC_MODE_MEDIUM
engine->setAECMode(ZEGO_AEC_MODE_MEDIUM);
```

### 设置 AGC（自动增益控制）

<Warning title="注意">


[enableAGC](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cpp_macos~class~IZegoExpressEngine#enable-agc) 需要在 [startPublishingStream](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cpp_macos~class~IZegoExpressEngine#start-publishing-stream)、[startPlayingStream](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cpp_macos~class~IZegoExpressEngine#start-playing-stream)、[startPreview](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cpp_macos~class~IZegoExpressEngine#start-preview)、[createMediaPlayer](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cpp_macos~class~IZegoExpressEngine#create-media-player)、[createAudioEffectPlayer](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cpp_macos~class~IZegoExpressEngine#create-audio-effect-player) 和 [createRealTimeSequentialDataManager](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cpp_macos~class~IZegoExpressEngine#create-real-time-sequential-data-manager) 这些接口之前调用才有效。
</Warning>

调用 [enableAGC](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cpp_macos~class~IZegoExpressEngine#enable-agc) 接口开启自动增益控制，开启该功能后，SDK 能够自动调节麦克风音量，适应远近拾音，保持音量稳定。

```cpp
// 开启 AGC
engine->enableAGC(true);
```

### 设置 ANS (噪声抑制)

<Warning title="注意">


[enableANS](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cpp_macos~class~IZegoExpressEngine#enable-ans)、[enableTransientANS](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cpp_macos~class~IZegoExpressEngine#enable-transient-ans) 和 [setANSMode](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cpp_macos~class~IZegoExpressEngine#set-ans-mode) 都需要在 [startPublishingStream](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cpp_macos~class~IZegoExpressEngine#start-publishing-stream)、[startPlayingStream](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cpp_macos~class~IZegoExpressEngine#start-playing-stream)、[startPreview](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cpp_macos~class~IZegoExpressEngine#start-preview)、[createMediaPlayer](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cpp_macos~class~IZegoExpressEngine#create-media-player)、[createAudioEffectPlayer](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cpp_macos~class~IZegoExpressEngine#create-audio-effect-player) 和 [createRealTimeSequentialDataManager](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cpp_macos~class~IZegoExpressEngine#create-real-time-sequential-data-manager) 这些接口之前调用才有效。
</Warning>

开发者可以按照以下步骤完成噪声抑制相关设置：

1. 调用 [enableANS](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cpp_macos~class~IZegoExpressEngine#enable-ans) 接口开启噪声抑制，该功能开启后可以使人声更加清晰。

2. （可选）开发者可通过调用 [enableTransientANS](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cpp_macos~class~IZegoExpressEngine#enable-transient-ans) 接口设置是否开启瞬态噪声抑制，瞬态噪声抑制用于抑制敲击键盘、桌子等瞬态噪声。

3. 开启噪声抑制后，开发者可通过调用 [setANSMode](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cpp_macos~class~IZegoExpressEngine#set-ans-mode) 接口设置噪声抑制模式，默认值为 “ZEGO_ANS_MODE_MEDIUM”。
    SDK 支持以下三种噪声抑制模式：

    |枚举值|说明|
    |-|-|
    |ZEGO_ANS_MODE_AGGRESSIVE|激进的噪声抑制，有可能明显损伤音质，但有很好的降噪效果。|
    |ZEGO_ANS_MODE_MEDIUM|（默认值）适度的噪声抑制，有可能损伤一些音质，但有不错的降噪效果。|
    |ZEGO_ANS_MODE_SOFT|轻度的噪声抑制，基本不会损伤音质，但会残留一些噪声。|

    <Warning title="注意">


    Express SDK 支持 AI 模式噪声抑制，并提供轻量模式、均衡模式及低延迟模式三种模式，在消除稳态噪声的基础上，有效消除瞬态噪声，如键盘、咳嗽、风声、汽车喇叭等瞬态噪声，详情请参考 [场景化 AI 降噪](https://doc-zh.zego.im/article/15222)。
    </Warning>

4. （可选）开启音乐检测。请联系 ZEGO 技术支持配置开启音乐检测功能。

以设置轻度的噪声抑制为例：

```cpp
// 开启 ANS
engine->enableANS(true);
// 开启瞬态噪声抑制
engine->enableTransientANS(true);
// 设置 ANS 模式为 ZEGO_ANS_MODE_SOFT
engine->setANSMode(ZEGO_ANS_MODE_SOFT);
```

## 相关文档

- [怎么处理音频回声问题？](https://doc-zh.zego.im/faq/echo)
- [怎么处理音频噪声问题？](https://doc-zh.zego.im/faq/audio_noise)
- [如何获取、上传音频的 Dump 文件？](http://doc-zh.zego.im/faq/How_to_get_audio_dump_upload)

<Content />