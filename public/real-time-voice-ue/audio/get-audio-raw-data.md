# 原始音频数据获取

- - -

## 功能简介

SDK 为开发者提供了获取原始音频数据的功能，获取的原始音频数据格式为 PCM，开发者可以将此数据写到本地设备中，实现录制音频。


## 使用步骤

获取原始音频功能的使用流程如下：

### 初始化SDK

请参考 [快速开始 - 实现流程](/real-time-voice-ue/quick-start/implementing-voice-call#创建引擎) 的 “创建引擎”。

### 启用原始音频数据功能

```cpp
// 开启获取原始音频数据功能
ZegoAudioFrameParam param;
param.channel = ZEGO_AUDIO_CHANNEL_STEREO;
param.sampleRate = ZEGO_AUDIO_SAMPLE_RATE_8K;
unsigned int bitmask = ZEGO_AUDIO_DATA_CALLBACK_BIT_MASK_CAPTURED | ZEGO_AUDIO_DATA_CALLBACK_BIT_MASK_PLAYBACK | ZEGO_AUDIO_DATA_CALLBACK_BIT_MASK_MIXED | ZEGO_AUDIO_DATA_CALLBACK_BIT_MASK_PLAYER;
engine->startAudioDataObserver(bitmask, param);
```

<Note title="说明">


如有需要可参考 [位掩码的使用](https://doc-zh.zego.im/article/8663)。

</Note>



### 设置回调接收原始音频数据并处理

```cpp
// 设置原始音频数据回调
class MyAudioDataHandler: public IZegoAudioDataHandler
{
public:
    /** 本地采集音频数据，推流后可收到回调 */
    virtual void onCapturedAudioData(const unsigned char* /*data*/, unsigned int /*dataLength*/, ZegoAudioFrameParam /*param*/) {

    }

    /** SDK 播放的音频数据，在非拉流状态的引擎启动状态且未使用媒体播放器播放媒体文件状态时，回调的音频数据是静音的音频数据 */
    virtual void onPlaybackAudioData(const unsigned char* /*data*/, unsigned int /*dataLength*/, ZegoAudioFrameParam /*param*/) {

    }

    /** 本地采集与 SDK 播放的声音混合后的音频数据回调 */
    virtual void onMixedAudioData(const unsigned char* /*data*/, unsigned int /*dataLength*/, ZegoAudioFrameParam /*param*/) {

    }

    /** 远端拉流音频数据，开始拉流后每条拉流数据的回调 */
    virtual void onPlayerAudioData(const unsigned char* /*data*/, unsigned int /*dataLength*/, ZegoAudioFrameParam /*param*/, const std::string& /*streamID*/) {

    }
};

engine->setAudioDataHandler(std::make_shared<MyAudioDataHandler>());
```
