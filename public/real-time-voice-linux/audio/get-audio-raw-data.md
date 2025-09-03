# 原始音频数据获取

- - -

## 功能简介

SDK 为开发者提供了获取原始音频数据的功能，获取的原始音频数据格式为 PCM，开发者可以将此数据写到本地设备中，实现录制音频。

## 使用步骤

获取原始音频功能的使用流程如下。

### 1 初始化 SDK

请参考 [快速开始 - 实现流程](https://doc-zh.zego.im/article/8228#CreateEngine) 的 “创建引擎”。

### 2 启用原始音频数据功能

开发者可调用 [startAudioDataObserver ](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cpp_linux~class~IZegoExpressEngine#start-audio-data-observer) 接口，开启音频数据回调监测。回调的音频数据类型为 [ZegoAudioDataCallbackBitMask](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cpp_linux~enum~ZegoAudioDataCallbackBitMask)，包括有 `ZEGO_AUDIO_DATA_CALLBACK_BIT_MASK_CAPTURED`、`ZEGO_AUDIO_DATA_CALLBACK_BIT_MASK_PLAYBACK`、`ZEGO_AUDIO_DATA_CALLBACK_BIT_MASK_MIXED`、`ZEGO_AUDIO_DATA_CALLBACK_BIT_MASK_PLAYER`，这四个回调类型都需要开启。	 

```cpp
// 开启获取原始音频数据功能
ZegoAudioFrameParam param;
param.channel = ZEGO_AUDIO_CHANNEL_STEREO;
param.sampleRate = ZEGO_AUDIO_SAMPLE_RATE_8K;
unsigned int bitmask = ZEGO_AUDIO_DATA_CALLBACK_BIT_MASK_CAPTURED | ZEGO_AUDIO_DATA_CALLBACK_BIT_MASK_PLAYBACK | ZEGO_AUDIO_DATA_CALLBACK_BIT_MASK_MIXED | ZEGO_AUDIO_DATA_CALLBACK_BIT_MASK_PLAYER;
engine->startAudioDataObserver(bitmask, param);
```

<Note title="说明">


如有需要可参考 [位掩码的使用](https://doc-zh.zego.im/article/8665)。

</Note>



### 3 设置回调接收原始音频数据并处理

开发者可调用 [setAudioDataHandler ](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cpp_linux~class~IZegoExpressEngine#set-audio-data-handler) 接口设置额外接收音频数据的回调。根据需要可实现回调 [onCapturedAudioData](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cpp_linux~class~IZegoAudioDataHandler#on-captured-audio-data)、[onPlaybackAudioData](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cpp_linux~class~IZegoAudioDataHandler#on-playback-audio-data)、[onMixedAudioData](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cpp_linux~class~IZegoAudioDataHandler#on-mixed-audio-data)、[onPlayerAudioData](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cpp_linux~class~IZegoAudioDataHandler#on-player-audio-data)，分别对应上述 [ZegoAudioDataCallbackBitMask](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cpp_linux~enum~ZegoAudioDataCallbackBitMask) 中的四个音频数据类型。

```cpp
// 设置原始音频数据回调
// 请注意，请勿在 SDK 回调线程中调用任何 SDK 接口，需要手动切换为其他线程，否则会产生死锁
class MyAudioDataHandler: public IZegoAudioDataHandler
{
public:
    // 本地采集音频数据，推流后可收到回调 
    virtual void onCapturedAudioData(const unsigned char* /*data*/, unsigned int /*dataLength*/, ZegoAudioFrameParam /*param*/) {

    }

    // 远端拉流音频数据，开始拉流后可收到回调 
    virtual void onPlaybackAudioData(const unsigned char* /*data*/, unsigned int /*dataLength*/, ZegoAudioFrameParam /*param*/) {

    }

    // 本地采集与远端拉流声音混合后的音频数据回调 
    virtual void onMixedAudioData(const unsigned char* /*data*/, unsigned int /*dataLength*/, ZegoAudioFrameParam /*param*/) {

    }

    // 远端拉流音频数据，开始拉流后每条拉流数据的回调 
    virtual void onPlayerAudioData(const unsigned char* /*data*/, unsigned int /*dataLength*/, ZegoAudioFrameParam /*param*/, const std::string& /*streamID*/) {

    }
};

engine->setAudioDataHandler(std::make_shared<MyAudioDataHandler>());
```

### 4 停止音频数据回调监测



若想停止音频数据回调监测，可调用 [stopAudioDataObserver ](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cpp_linux~class~IZegoExpressEngine#stop-audio-data-observer) 接口。

 ```objc
[[ZegoExpressEngine sharedEngine] stopAudioDataObserver];
```

<Content />
