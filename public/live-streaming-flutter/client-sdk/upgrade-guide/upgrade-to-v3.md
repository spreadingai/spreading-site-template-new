# 3.0.0 及以上版本升级指南

---

<Warning title="注意">
- 如果您当前的 SDK 低于 3.0.0 版本，需要升级到任一 3.0.0 或以上的 SDK 版本时，都请务必阅读本文。
- 此外，建议您根据**当前版本号**与**升级目标版本号**，参考 [发布日志](https://doc-zh.zego.im/article/17144) 中两个版本区间的变更说明，检查您的业务相关接口。
</Warning>

本文将介绍 Express Flutter SDK 版本升级至 3.0.0 及以上版本时的说明和注意事项。

## 废弃说明

1. 废弃 [ZegoScenario](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoScenario.html) 场景枚举中的 [General], [Communication], [Live] 三种场景，详情请参考 [场景化音视频配置](https://doc-zh.zego.im/article/17153) 文档进行适配。

2. 从这个版本开始，Express iOS SDK 不再支持 bitcode。

    请参考 Apple [Xcode 14 Release Notes](https://developer.apple.com/documentation/xcode-release-notes/xcode-14-release-notes#Deprecations) 中关于废弃 bitcode 的说明。

    适配方式：打开 Xcode 工程的配置页面，在 App Target 的 "Build Settings" 页面中找到 "Enable Bitcode" 选项，将其设置为 "No"。

3. 废弃了 [ZegoEngineConfig > advancedConfig](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoEngineConfig/advancedConfig.html) 的配置项 "audio_device_mode"，请使用 [setAudioDeviceMode](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngineDevice/setAudioDeviceMode.html) 接口代替。

## 删除说明

删除下列在先前版本已废弃的接口。

方法名 | 描述 |
--- | --- |
setDebugVerbose | 设置调试详细信息开关以及语言。此函数在 2.3.0 版本废弃，请使用 [enableDebugAssistant](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngine/enableDebugAssistant.html) 来实现原来的功能。
loginMultiRoom | 登录多房间。此方法在版本 2.9.0 以后已废弃，若需实现多房间功能，请先在引擎初始化之前调用 [setRoomMode](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngine/setRoomMode.html) 函数设置多房间模式，再使用 [loginRoom](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngineRoom/loginRoom.html) 登录多房间，如果调用 [loginRoom](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngineRoom/loginRoom.html) 函数登录多房间，请确保传入相同的用户信息。
setPlayStreamVideoLayer | 设置选取拉流视频图层。此函数在 2.3.0 版本以后已废弃, 请使用 [setPlayStreamVideoType](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePlayer/setPlayStreamVideoType.html) 代替。
enableAudioDataCallback | 开启额外接收音频数据的回调。此函数在 2.7.0 版本以后已废弃，请使用 [startAudioDataObserver](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngineCustomAudioIO/startAudioDataObserver.html) 和 [stopAudioDataObserver](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngineCustomAudioIO/stopAudioDataObserver.html) 代替。
setReverbParam | 设置混响的具体参数。此函数在 1.18.0 版本以后已废弃，请使用 [setReverbPreset](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePreprocess/setReverbPreset.html) 或者 [setReverbAdvancedParam](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePreprocess/setReverbAdvancedParam.html) 代替。
setBuiltInSpeakerOn | 是否使用内置扬声器播放声音。此函数在 2.3.0 版本以后已废弃，请使用 [setAudioRouteToSpeaker](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngineDevice/setAudioRouteToSpeaker.html) 代替。
onDeviceError | 设备异常通知。此函数在 2.15.0 版本及以上已废弃，请使用 [onLocalDeviceExceptionOccurred](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngine/onLocalDeviceExceptionOccurred.html) 代替。

## 示例代码

您可以参考以下示例代码进行接口变更。

### setAudioDeviceMode

<Tabs>
<Tab title="3.0.0 版本前">
```dart
ZegoExpressEngine.setEngineConfig(ZegoEngineConfig(advancedConfig: { 'audio_device_mode': '2' }));
```
</Tab>
<Tab title="3.0.0 及以上版本">
```dart
ZegoExpressEngine.instance.setAudioDeviceMode(ZegoAudioDeviceMode.General);
```
</Tab>
</Tabs>

### setDebugVerbose

<Tabs>
<Tab title="3.0.0 版本前">
```dart
ZegoExpressEngine.instance.setDebugVerbose(true, ZegoLanguage.English);
```
</Tab>
<Tab title="3.0.0 及以上版本">
```dart
// 注意，请勿在线上版本开启此功能！仅在开发阶段使用！
// Note, do not enable this feature in the online version! Use only during development phase!"
ZegoExpressEngine.instance.enableDebugAssistant(true);
```
</Tab>
</Tabs>

### loginMultiRoom

<Tabs>
<Tab title="3.0.0 版本前">
```dart
ZegoExpressEngine.createEngineWithProfile(profile);

var user = ZegoUser.id("user1");
ZegoExpressEngine.instance.loginRoom("first_room", user);
ZegoExpressEngine.instance.loginMultiRoom("second_room");
```
</Tab>
<Tab title="3.0.0 及以上版本">
可以参考 [登录多房间](/real-time-video-android-java/room/multi-room-login) 文档

```dart
// 必须在调用 [createEngine] 之前设置才生效，否则会失败。
// Must be set before calling [createEngine] to take effect, otherwise it will fail.
ZegoExpressEngine.setRoomMode(ZegoRoomMode.MultiRoom);

ZegoExpressEngine.createEngineWithProfile(profile);

var user = ZegoUser.id("user1");
ZegoExpressEngine.instance.loginRoom("first_room", user);
ZegoExpressEngine.instance.loginRoom("second_room", user);
```
</Tab>
</Tabs>

### setPlayStreamVideoLayer

<Tabs>
<Tab title="3.0.0 版本前">
```dart
ZegoExpressEngine.instance.setPlayStreamVideoLayer("stream1", ZegoPlayerVideoLayer.Auto);
```
</Tab>
<Tab title="3.0.0 及以上版本">
可以参考 [设置视频编码方式](/real-time-video-android-java/video/set-video-encoding) 文档

```dart
ZegoExpressEngine.instance.setPlayStreamVideoType("stream1", ZegoVideoStreamType.Default);
```
</Tab>
</Tabs>

### enableAudioDataCallback

<Tabs>
<Tab title="3.0.0 版本前">
```dart
int bitmask = ZegoAudioDataCallbackBitMask.Captured | ZegoAudioDataCallbackBitMask.Player;
var param = ZegoAudioFrameParam(ZegoAudioSampleRate.SampleRate48K, ZegoAudioChannel.Mono);

// Start
ZegoExpressEngine.instance.enableAudioDataCallback(true, bitmask, param);

// Stop
ZegoExpressEngine.instance.enableAudioDataCallback(false, bitmask, param);
```
</Tab>
<Tab title="3.0.0 及以上版本">
```dart
int bitmask = ZegoAudioDataCallbackBitMask.Captured | ZegoAudioDataCallbackBitMask.Player;
var param = ZegoAudioFrameParam(ZegoAudioSampleRate.SampleRate48K, ZegoAudioChannel.Mono);

// Start
ZegoExpressEngine.instance.startAudioDataObserver(bitmask, param);

// Stop
ZegoExpressEngine.instance.stopAudioDataObserver();
```
</Tab>
</Tabs>

### setReverbParam

<Tabs>
<Tab title="3.0.0 版本前">
```dart
var param = ZegoReverbParam(ZegoReverbPreset.Basement);
ZegoExpressEngine.instance.setReverbParam(param);
```
</Tab>
<Tab title="3.0.0 及以上版本">
```dart
ZegoExpressEngine.instance.setReverbPreset(ZegoReverbPreset.Basement);

// param 为 ZegoReverbAdvancedParam 对象;
ZegoExpressEngine.instance.setReverbAdvancedParam(param);
```
</Tab>
</Tabs>

### setBuiltInSpeakerOn

<Tabs>
<Tab title="3.0.0 版本前">
```dart
ZegoExpressEngine.instance.setBuiltInSpeakerOn(true);
```
</Tab>
<Tab title="3.0.0 及以上版本">
```dart
ZegoExpressEngine.instance.setAudioRouteToSpeaker(true);
```
</Tab>
</Tabs>

### onDeviceError

<Tabs>
<Tab title="3.0.0 版本前">
```dart
ZegoExpressEngine.onDeviceError(int errorCode, String deviceName) {
    // Handle device error
    // 处理设备错误
}
```
</Tab>
<Tab title="3.0.0 及以上版本">
```dart
ZegoExpressEngine.onLocalDeviceExceptionOccurred(ZegoDeviceExceptionType exceptionType, ZegoDeviceType deviceType, String deviceID) {
    // Handle device error
    // 处理设备错误
}
```
</Tab>
</Tabs>

<Content />

