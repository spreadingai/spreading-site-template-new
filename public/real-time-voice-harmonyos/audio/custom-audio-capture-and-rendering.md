# 自定义音频采集
- - -

## 功能简介

以下场景中，建议使用自定义音频采集功能：

- 开发者需要从现有音频流、音频文件、或者定制的采集系统中获得采集后输入，交给 SDK 传输。
- 开发者有自己对 PCM 输入源做特殊的音效处理的需求，在音效处理后输入，交给 SDK 传输。


## 前提条件

在实现自定义音频采集之前，请确保：

- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppID 和 AppSign，详情请参考 [控制台 - 项目信息](/console/project-info)。
- 已在项目中集成 ZEGO Express SDK，并实现了基本的音视频推拉流功能，详情请参考 [快速开始 - 集成](https://doc-zh.zego.im/article/19523) 和 [快速开始 - 实现流程](https://doc-zh.zego.im/article/19524)。



## 使用步骤

### 1 初始化 SDK

请参考 [快速开始 - 实现流程](https://doc-zh.zego.im/article/19524#CreateEngine) 的 “创建引擎”。

### 2 开启自定义音频采集

<Warning title="注意">


[enableCustomAudioIO](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/ets_ohos/classes/_zegoexpressengine_.zegoexpressengine.html#enablecustomaudioio) 需要在 [startPublishingStream](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/ets_ohos/classes/_zegoexpressengine_.zegoexpressengine.html#startpublishingstream)、[startPlayingStream](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/ets_ohos/classes/_zegoexpressengine_.zegoexpressengine.html#startplayingstream)、[startPreview](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/ets_ohos/classes/_zegoexpressengine_.zegoexpressengine.html#startpreview)、[createMediaPlayer](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/ets_ohos/classes/_zegoexpressengine_.zegoexpressengine.html#createmediaplayer)、[createAudioEffectPlayer](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/ets_ohos/classes/_zegoexpressengine_.zegoexpressengine.html#createaudioeffectplayer) 之前调用才有效。

</Warning>



可调用 [ZegoCustomAudioConfig](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/ets_ohos/classes/_zegoexpressdefines_.zegocustomaudioconfig.html) 设置 `sourceType = ZegoAudioSourceType.CUSTOM`，再调用 [enableCustomAudioIO](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/ets_ohos/classes/_zegoexpressengine_.zegoexpressengine.html#enablecustomaudioio) 接口开启自定义音频 IO 功能。

```ts
// 设置音频源为自定义采集
let config=new ZegoCustomAudioConfig();
config.sourceType= ZegoAudioSourceType.Custom;
engine.enableCustomAudioIO(true,config);
```

### 3 登录房间后推/拉流

请参考 [快速开始 - 实现流程](https://doc-zh.zego.im/article/19524#createroom) 的 “登录房间”、“推流”和“拉流”。

### 4 采集音频数据

鸿蒙平台通过原生插件的形式实现自定义音频采集功能。用户通过 [registerCustomAudioCapturePlugin\_blank](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/ets_ohos/classes/_zegoexpressengine_.zegoexpressengine.html#registercustomaudiocaptureplugin) 接口注册插件对象，通过 [unregisterCustomAudioCapturePlugin\_blank](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/ets_ohos/classes/_zegoexpressengine_.zegoexpressengine.html#unregistercustomaudiocaptureplugin) 接口反注册插件对象。当用户调用 [enableCustomAudioIO](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/ets_ohos/classes/_zegoexpressengine_.zegoexpressengine.html#enablecustomaudioio) 接口开启自定义音频 IO 功能后，并注册插件。

```ts
let plugin: number = GetCustomAudioCapturePlugin();
engine.registerCustomAudioCapturePlugin(plugin);
```
SDK 内部会启动一个定时线程，通过原生插件提供的 `onRequestAudioFrame` 接口发送音频数据，并通过原生插件提供的 `onReleaseAudioFrame` 回调安全释放数据。

```cpp
class ZegoExpressOHOSCustomAudioCapturePluginBase
{
public:
    // 返回音频帧。如果用户没有音频帧要发送，返回空指针。
    virtual ZegoCustomAudioFrame* onRequestAudioFrame() = 0;

    // 在 SDK 发送音频帧后，SDK 会请求释放音频帧。
    virtual void onReleaseAudioFrame(ZegoCustomAudioFrame* audioFrame) = 0;
};
```

## 常见问题

1. **调用自定义音频采集相关接口的时机？**

    - [enableCustomAudioIO](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/ets_ohos/classes/_zegoexpressengine_.zegoexpressengine.html#enablecustomaudioio)：应该在引擎启动前开始调用，即开始预览、推拉流之前。
    - [registerCustomAudioCapturePlugin](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/ets_ohos/classes/_zegoexpressengine_.zegoexpressengine.html#registercustomaudiocaptureplugin)：应该在开始预览和推流后调用。如果在开始预览、推流前调用，SDK 内部会直接丢弃收到的数据。

2. **OHOS（OpenHarmony Operating System）设备外接麦克风，使用自定义音频采集，若中途用户戴上了蓝牙耳机，如何使用 Express SDK 采集音频？**

    由于 Express SDK 内部不会自动切换到内部采集，需要开发者做业务逻辑处理，即停止外部采集。移动端 SDK 会根据系统当前的 route（音频路由）选择设备，如果系统的 route 是蓝牙，就会使用蓝牙进行采集。

<Content />

