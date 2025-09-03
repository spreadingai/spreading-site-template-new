# 3.0.0 及以上版本升级指南

---

<Warning title="注意">
- 如果您当前的 SDK 低于 3.0.0 版本，需要升级到任一 3.0.0 或以上的 SDK 版本时，都请务必阅读本文。
- 此外，建议您根据**当前版本号**与**升级目标版本号**，参考 [发布日志](https://doc-zh.zego.im/article/17542) 中两个版本区间的变更说明，检查您的业务相关接口。
</Warning>


本文将介绍 Express SDK 版本升级至 3.0.0 及以上版本时的说明和注意事项。

## 废弃说明

1. 废弃 [ZegoScenario](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~enum~ZegoScenario) 场景枚举中的 `General`、`Communication`、`Live` 三种场景，请参考 [场景化音视频配置](https://doc-zh.zego.im/article/16633) 文档进行适配。

2. 从 3.0.0 版本开始，Express iOS SDK 不再支持 bitcode，详情请参考 [Xcode 14 Release Notes](https://developer.apple.com/documentation/xcode-release-notes/xcode-14-release-notes#Deprecations) 中关于废弃 bitcode 的说明。

<Note title="说明">


适配方式：打开 Xcode 工程的配置页面，在 App Target 的 "Build Settings" 页面中找到 "Enable Bitcode" 选项，将其设置为 "No"。

</Note>




    

## 删除说明

删除下列在先前版本已废弃的接口。

方法名 | 描述 |
--- | --- |
SetDebugVerbose | 设置调试详细信息开关以及语言。此函数在 2.3.0 版本废弃，请使用 [EnableDebugAssistant](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~ZegoExpressEngine#enable-debug-assistant) 来实现原来的功能。
LoginMultiRoom | 登录多房间。此方法在版本 2.9.0 以后已废弃，若需实现多房间功能，请先在引擎初始化之前调用 [SetRoomMode](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~ZegoExpressEngine#set-room-mode) 函数设置多房间模式，再使用 [LoginRoom](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~ZegoExpressEngine#login-room) 登录多房间，如果调用 [LoginRoom](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~ZegoExpressEngine#login-room) 函数登录多房间，请确保传入相同的用户信息。
SetPlayStreamVideoLayer | 设置选取拉流视频图层。此函数在 2.3.0 版本以后已废弃, 请使用 [SetPlayStreamVideoType](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~ZegoExpressEngine#set-play-stream-video-type) 代替。
EnableAudioDataCallback | 开启额外接收音频数据的回调。此函数在 2.7.0 版本以后已废弃，请使用 [StartAudioDataObserver](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~ZegoExpressEngine#start-audio-data-observer) 和 [StopAudioDataObserver](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~ZegoExpressEngine#stop-audio-data-observer) 代替。
SetBuiltInSpeakerOn | 是否使用内置扬声器播放声音。此函数在 2.3.0 版本以后已废弃，请使用 [SetAudioRouteToSpeaker](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~ZegoExpressEngine#set-audio-route-to-speaker) 代替。
OnDeviceError | 设备异常通知。此函数在 2.15.0 版本及以上已废弃，请使用 [OnLocalDeviceExceptionOccurred](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~IZegoEventHandler#on-local-device-exception-occurred) 代替。

## 变更示例代码

您可以参考以下示例代码进行接口变更。

### SetDebugVerbose

<Tabs>
<Tab title="3.0.0 版本前">
```cs
ZegoExpressEngine.GetEngine().SetDebugVerbose(true, ZegoLanguage.English);
```
</Tab>
<Tab title="3.0.0 版本及以上">
```cs
// 注意，请勿在线上版本开启此功能！仅在开发阶段使用！
// Note, do not enable this feature in the online version! Use only during development phase!"
ZegoExpressEngine.GetEngine().EnableDebugAssistant(true);
```
</Tab>
</Tabs>


### LoginMultiRoom

<Tabs>
<Tab title="3.0.0 版本前">

```cs
ZegoExpressEngine.CreateEngine(profile, null);

ZegoUser user = new ZegoUser("user1");
ZegoExpressEngine.GetEngine().LoginRoom("first_room", user);
ZegoExpressEngine.GetEngine().LoginMultiRoom("second_room", null);
```
</Tab>
<Tab title="3.0.0 版本及以上">

```cs
// 必须在调用 [createEngine] 之前设置才生效，否则会失败。
// Must be set before calling [createEngine] to take effect, otherwise it will fail.
ZegoExpressEngine.SetRoomMode(ZegoRoomMode.MULTI_ROOM);

ZegoExpressEngine.CreateEngine(profile, null);

ZegoUser user = new ZegoUser("user1");
ZegoExpressEngine.GetEngine().LoginRoom("first_room", user);
ZegoExpressEngine.GetEngine().LoginRoom("second_room", user);
```
</Tab>
</Tabs>

### SetPlayStreamVideoLayer

<Tabs>
<Tab title="3.0.0 版本前">

```cs
ZegoExpressEngine.GetEngine().SetPlayStreamVideoLayer("stream1", ZegoPlayerVideoLayer.Auto);
```
</Tab>
<Tab title="3.0.0 版本及以上">

```cs
ZegoExpressEngine.GetEngine().SetPlayStreamVideoType("stream1", ZegoVideoStreamType.Default);
```
</Tab>
</Tabs>

### EnableAudioDataCallback

<Tabs>
<Tab title="3.0.0 版本前">

```cs
int bitmask = ZegoAudioDataCallbackBitMask.Captured | ZegoAudioDataCallbackBitMask.Player;
ZegoAudioFrameParam param = new ZegoAudioFrameParam();
param.sampleRate = ZegoAudioSampleRate.ZegoAudioSampleRate48K;
param.channel = ZegoAudioChannel.Mono;

// Start
ZegoExpressEngine.GetEngine().SetAudioDataHandler(handler);
ZegoExpressEngine.GetEngine().EnableAudioDataCallback(true, bitmask, param);

// Stop
ZegoExpressEngine.GetEngine().SetAudioDataHandler(null);
ZegoExpressEngine.GetEngine().EnableAudioDataCallback(false, bitmask, param);
```
</Tab>
<Tab title="3.0.0 版本及以上">

```cs
int bitmask = ZegoAudioDataCallbackBitMask.Captured | ZegoAudioDataCallbackBitMask.Player;
ZegoAudioFrameParam param = new ZegoAudioFrameParam();
param.sampleRate = ZegoAudioSampleRate.ZegoAudioSampleRate48K;
param.channel = ZegoAudioChannel.Mono;

// Start
ZegoExpressEngine.getEngine().SetAudioDataHandler(handler);
ZegoExpressEngine.getEngine().StartAudioDataObserver(bitmask, param);

// Stop
ZegoExpressEngine.getEngine().SetAudioDataHandler(null);
ZegoExpressEngine.getEngine().StopAudioDataObserver();
```
</Tab>
</Tabs>

### SetBuiltInSpeakerOn

<Tabs>
<Tab title="3.0.0 版本前">

```cs
ZegoExpressEngine.GetEngine().SetBuiltInSpeakerOn(true);
```
</Tab>
<Tab title="3.0.0 版本及以上">

```cs
ZegoExpressEngine.GetEngine().SetAudioRouteToSpeaker(true);
```
</Tab>
</Tabs>

### OnDeviceError

<Tabs>
<Tab title="3.0.0 版本前">

```cs
public void OnDeviceError(int errorCode, string deviceName) {
    // Handle device error
    // 处理设备错误
}
engine.onDeviceError = OnDeviceError;
```
</Tab>
<Tab title="3.0.0 版本及以上">

```cs
public void OnLocalDeviceExceptionOccurred(ZegoDeviceExceptionType exceptionType, ZegoDeviceType deviceType, string deviceID) {
    // Handle device error
    // 处理设备错误
}

engine.onLocalDeviceExceptionOccurred = OnLocalDeviceExceptionOccurred;
```
</Tab>
</Tabs>

<Content />

