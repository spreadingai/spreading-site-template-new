<Title>如何修改音频 3A 处理的配置？</Title>


---

在实时音视频通话时，可以对音频进行 3A 处理，主要包括 AEC（Acoustic Echo Cancelling，回声消除），AGC（Automatic Gain Control，自动增益控制）和 ANS（Active Noise Control，降噪），以提高通话质量和用户体验。

- AEC（回声消除）：对采集到的音频数据进行过滤以减少音频中的回声。
- AGC（自动增益控制）：开启该功能后，SDK 能够自动调节麦克风音量，适应远近拾音，保持音量稳定。
- ANS（降噪）：识别声音中的背景噪声并进行消除，开启该功能后可以使人声更加清晰。

我们提供了 [示例源码](/real-time-video-ios-oc/quick-start/run-example-code) 供您参考，请查看代码中 “/ZegoExpressExample/Examples/AdvancedAudioProcessing/AECANSAGC” 目录下的文件。

<Note title="说明">


以下文档示例（代码、API 接口、文档链接等）均以 iOS 为例。

</Note>




## 操作步骤

在使用音频 3A 处理之前，请确保：

- 已在项目中集成 ZEGO Express SDK，实现基本的实时音视频功能，详情请参考 [快速开始 - 集成](/real-time-video-ios-oc/quick-start/integrating-sdk) 和 [快速开始 - 实现视频通话](/real-time-video-ios-oc/quick-start/implementing-video-call)。
- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppID 和 AppSign，详情请参考 [控制台 - 项目管理](/console/project-info) 中的“项目信息”。

### 设置 AEC（回声消除）

<Warning title="注意">


[enableAEC](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoExpressEngine#enable-aec) 、[enableHeadphoneAEC](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoExpressEngine#enable-headphone-aec) 和 [setAECMode](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoExpressEngine#set-aec-mode) 都需要在 [startPublishingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoExpressEngine#start-publishing-stream)、 [startPlayingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoExpressEngine#start-playing-stream-canvas)、 [startPreview](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoExpressEngine#start-preview)、 [createMediaPlayer](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoExpressEngine#create-media-player) 和 [createAudioEffectPlayer](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoExpressEngine#create-audio-effect-player) 这些接口之前调用才有效。


</Warning>



开发者可以按照以下步骤完成回声消除相关设置：

1. 调用 [enableAEC](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoExpressEngine#enable-aec) 接口开启回声消除，该功能开启后，SDK 会对采集到的音频数据进行过滤以减少音频中的回声。

2. （可选）开发者可通过调用 [enableHeadphoneAEC](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoExpressEngine#enable-headphone-aec) 接口设置是否在使用耳机的时候开启回声消除。

3. 开启回声消除后，开发者可通过调用 [setAECMode](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoExpressEngine#set-aec-mode) 接口设置回声消除模式。SDK 支持以下三种回声消除模式：

|枚举值|说明|
|-|-|
|ZegoAECModeAggressive| 激进的回声抵消，可能会比较明显的影响音质，但是回声会消除得很干净。|
|ZegoAECModeMedium|适度的回声抵消，可能会稍微影响一点点音质，但是残留的回声会更少。|
|ZegoAECModeSoft|舒适的回声抵消，回声抵消基本不会影响声音的音质，可能有时会残留一点回声，但不会影响正常听音。|

以设置适度的回声抵消为例：

```objc
// 开启 AEC
[[ZegoExpressEngine sharedEngine] enableAEC:YES];
// 在使用耳机时开启 AEC
[[ZegoExpressEngine sharedEngine] enableHeadphoneAEC:YES];
// 设置 AEC 模式为 ZegoAECModeMedium
[[ZegoExpressEngine sharedEngine] setAECMode:ZegoAECModeMedium];
```

### 设置 AGC （自动增益控制）

<Warning title="注意">


[enableAGC](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoExpressEngine#enable-agc) 需要在 [startPublishingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoExpressEngine#start-publishing-stream)、 [startPlayingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoExpressEngine#start-playing-stream-canvas)、 [startPreview](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoExpressEngine#start-preview)、 [createMediaPlayer](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoExpressEngine#create-media-player) 和 [createAudioEffectPlayer](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoExpressEngine#create-audio-effect-player) 这些接口之前调用才有效。


</Warning>



调用 [enableAGC](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoExpressEngine#enable-agc) 接口开启自动增益控制，开启该功能后，SDK 能够自动调节麦克风音量，适应远近拾音，保持音量稳定。

```objc
// 开启 AGC
[[ZegoExpressEngine sharedEngine] enableAGC:YES];
```

### 设置 ANS (噪声抑制)

<Warning title="注意">


[enableANS](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoExpressEngine#enable-ans) 、[enableTransientANS](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoExpressEngine#enable-transient-ans) 和 [setANSMode](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoExpressEngine#set-ans-mode) 都需要在 [startPublishingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoExpressEngine#start-publishing-stream)、 [startPlayingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoExpressEngine#start-playing-stream-canvas)、 [startPreview](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoExpressEngine#start-preview)、 [createMediaPlayer](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoExpressEngine#create-media-player) 和 [createAudioEffectPlayer](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoExpressEngine#create-audio-effect-player) 这些接口之前调用才有效。


</Warning>



开发者可以按照以下步骤完成噪声抑制相关设置：

1. 调用 [enableANS](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoExpressEngine#enable-ans) 接口开启噪声抑制，该功能开启后可以使人声更加清晰。

2. （可选）开发者可通过调用 [enableTransientANS](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoExpressEngine#enable-transient-ans) 接口设置是否开启瞬态噪声抑制。瞬态噪声抑制用于抑制敲击键盘、桌子等瞬态噪声。

3. 开启噪声抑制后，开发者可通过调用 [setANSMode](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoExpressEngine#set-ans-mode) 接口设置噪声抑制模式，默认值为 “ZegoANSModeMedium”。

SDK 支持以下三种噪声抑制模式：

|枚举值|说明|
|-|-|
|ZegoANSModeAggressive|激进的噪声抑制，有可能明显损伤音质，但有很好的降噪效果。|
|ZegoANSModeMedium|适度的噪声抑制，有可能损伤一些音质，但有不错的降噪效果。|
|ZegoANSModeSoft|轻度的噪声抑制，基本不会损伤音质，但会残留一些噪声。|

以设置适度的噪声抑制为例：
```objc
// 开启 ANS
[[ZegoExpressEngine sharedEngine] enableANS:YES];
// 开启瞬态噪声抑制
[[ZegoExpressEngine sharedEngine] enableTransientANS:YES];
// 设置 ANS 模式为 ZegoANSModeMedium
[[ZegoExpressEngine sharedEngine] setANSMode:ZegoANSModeMedium];
```

## 推荐配置

SDK 中音频 3A 处理的默认配置和推荐配置如下：

|接口名称|接口描述|默认配置|推荐配置
|-|-|-|-|
|enableAEC|开/关回声消除 |默认为 Yes，但在通话模式下会关闭。|在一般使用场景中，建议不修改该配置，保持默认即可。|
|enableHeadphoneAEC|是否在使用耳机时开启回声消除|Yes|在普通语聊或游戏开黑时，建议启用该功能，其他情况下一般无需启用。|
|setAECMode|设置回声消除模式|ZegoAECModeAggressive（激进的回声抵消）|在一般使用场景中，建议不修改该配置，保持默认即可。|
|enableAGC|开/关自动增益控制|Yes|<ul><li>在普通语聊场景中，建议使用默认配置。</li><li>在音乐电台场景中，建议不开启自动增益控制以还原人声。</li><li>在教育场景中，如大班课、小班课和 1V1 等，建议开启自动增益控制。</li></ul>|
|enableANS|开/关噪声抑制|Yes|在一般使用场景中，建议不修改该配置，保持默认即可。|
|setANSMode|设置音频噪声抑制模式|ZegoANSModeMedium（适度的噪声抑制）|在一般使用场景中，建议不修改该配置，保持默认即可。|


## 相关文档

- [怎么处理音频回声问题？](https://doc-zh.zego.im/faq/echo)
- [怎么处理音频噪声问题？](https://doc-zh.zego.im/faq/audio_noise)
