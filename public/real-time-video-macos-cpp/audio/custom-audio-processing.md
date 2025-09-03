# 自定义音频处理

---

## 功能简介

自定义音频处理一般用于去除语音中的干扰，由于 SDK 已经对采集的音频原始数据进行了回声消除、噪声抑制等处理，通常情况下，开发者无需再重复处理。如果开发者想在采集音频数据后或拉取远端音频数据渲染前，通过自定义处理实现特殊功能时（例如变声、美声等），可以参考本文档。

<Note title="说明">
自定义音频处理的数据，是原始音频进行 3A（AEC 回声消除、AGC 自动增益控制、ANS 降噪）处理之后的音频数据：

- 如果开发者需要对原始数据进行处理，请先调用 [enableAEC](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#enable-aec)、[enableAGC](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#enable-agc)、[enableANS](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#enable-ans) 接口关闭音频 3A 处理。如果开启了变声、混响、立体声等音效处理（默认是关闭的），也需要先关闭后，才能获取到原始音频数据。
- 如果开发者需要同时获取原始数据和 3A 处理之后的音频数据进行处理，请参考 [自定义音频采集与渲染](https://doc-zh.zego.im/article/11814)。
</Note>

## 使用步骤

### 1 创建 SDK 引擎

调用 [createEngine ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~CPP~class~zego-express-zego-express-sdk#create-engine) 接口创建 SDK 引擎实例，详情可参考 [快速开始 - 实现流程](https://doc-zh.zego.im/article/9976#CreateEngine) 的 “创建引擎”。

```cpp
ZegoEngineProfile profile;
profile.appID = ZegoUtilHelper::AppID();
profile.appSign = ZegoUtilHelper::AppSign();
profile.scenario = ZegoScenario::ZEGO_SCENARIO_DEFAULT;
ZegoExpressSDK::createEngine(profile, nullptr);
```

### 2 设置音频自定义处理对象并实现回调方法

调用 [setCustomAudioProcessHandler ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~CPP~class~zego-express-i-zego-express-engine#set-custom-audio-process-handler) 接口设置音频自定义处理对象，并实现回调方法：自定义音频处理本地采集 PCM 音频帧回调 [onProcessCapturedAudioData](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoCustomAudioProcessHandler#on-process-captured-audio-data) 和自定义音频处理远端拉流 PCM 音频帧回调 [onProcessRemoteAudioData](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoCustomAudioProcessHandler#on-process-remote-audio-data)。在回调方法中直接处理获取的 `data`，即可实现对推拉流音频数据的处理。

```cpp
class MyAudioProcessHandler: public IZegoCustomAudioProcessHandler{
public:
    void onProcessCapturedAudioData(unsigned char* data, unsigned int dataLength, ZegoAudioFrameParam* param, double timestamp) override{

    }

    void onProcessRemoteAudioData(unsigned char* data, unsigned int dataLength, ZegoAudioFrameParam* param, const std::string& streamID, double timestamp) override {

    }
};

engine->setCustomAudioProcessHandler(std::make_shared<MyAudioProcessHandler>());
```

### 3 自定义音频处理

- 在开始推流或启动本地预览前，调用 [enableCustomAudioCaptureProcessing ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~CPP~class~zego-express-i-zego-express-engine#enable-custom-audio-capture-processing) 接口开启本地采集自定义音频处理。开启后，开发者可以通过 [onProcessCapturedAudioData ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~CPP~class~zego-express-i-zego-custom-audio-process-handler#on-process-captured-audio-data) 回调收到本地采集的音频帧，并可以对音频数据进行修改。

- 在开始拉流前，调用 [enableCustomAudioRemoteProcessing ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~CPP~class~zego-express-i-zego-express-engine#enable-custom-audio-remote-processing) 接口开启远端拉流自定义音频处理。开启后，开发者可以通过 [onProcessRemoteAudioData ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~CPP~class~zego-express-i-zego-custom-audio-process-handler#on-process-remote-audio-data) 收到远端拉流的音频帧，并且可以对音频数据进行修改。

```cpp
ZegoCustomAudioProcessConfig config;
config.channel = ZEGO_AUDIO_CHANNEL_MONO;
config.samples = 2048;
config.sampleRate = ZEGO_AUDIO_SAMPLE_RATE_44K;

engine->enableCustomAudioRemoteProcessing(true, &config);
engine->enableCustomAudioCaptureProcessing(true, &config);
```

<Content />
