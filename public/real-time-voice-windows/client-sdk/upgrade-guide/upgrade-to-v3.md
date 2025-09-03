# 3.0.0及以上版本升级指南

---

<Warning title="注意">
- 如果您当前的 SDK 低于 3.0.0 版本，需要升级到任一 3.0.0 或以上的 SDK 版本时，都请务必阅读本文。
- 此外，建议您根据**当前版本号**与**升级目标版本号**，参考 [发布日志](https://doc-zh.zego.im/article/12585) 中两个版本区间的变更说明，检查您的业务相关接口。
</Warning>


本文将介绍 Express SDK 版本升级至 3.0.0 及以上版本时的说明和注意事项。

## 废弃说明

1. 废弃 [ZegoScenario](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cpp_windows~enum~ZegoScenario) 场景枚举中的 `General`、`Communication`、`Live` 三种场景，请参考 [场景化音视频配置](https://doc-zh.zego.im/article/16510) 文档进行适配。

2. 从 3.0.0 版本开始，Express iOS SDK 不再支持 bitcode，详情请参考 [Xcode 14 Release Notes](https://developer.apple.com/documentation/xcode-release-notes/xcode-14-release-notes#Deprecations) 中关于废弃 bitcode 的说明。

    <Note title="说明">

    适配方式：打开 Xcode 工程的配置页面，在 App Target 的 "Build Settings" 页面中找到 "Enable Bitcode" 选项，将其设置为 "No"。
    </Note>

3. 废弃了 [ZegoEngineConfig > advancedConfig](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cpp_windows~struct~ZegoEngineConfig#advanced-config) 的配置项 "audio_device_mode"，请使用 [setAudioDeviceMode](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cpp_windows~class~IZegoExpressEngine#set-audio-device-mode) 接口代替。

## 删除说明

删除下列在先前版本已废弃的接口。

方法名 | 描述 |
--- | --- |
setDebugVerbose | 设置调试详细信息开关以及语言。此函数在 2.3.0 版本废弃，请使用 [enableDebugAssistant](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cpp_windows~class~IZegoExpressEngine#enable-debug-assistant) 来实现原来的功能。
loginMultiRoom | 登录多房间。此方法在版本 2.9.0 以后已废弃，若需实现多房间功能，请先在引擎初始化之前调用 [setRoomMode](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cpp_windows~class~ZegoExpressSDK#set-room-mode) 函数设置多房间模式，再使用 [loginRoom](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cpp_windows~class~IZegoExpressEngine#login-room) 登录多房间，如果调用 [loginRoom](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cpp_windows~class~IZegoExpressEngine#login-room) 函数登录多房间，请确保传入相同的用户信息。
setPlayStreamVideoLayer | 设置选取拉流视频图层。此函数在 2.3.0 版本以后已废弃, 请使用 [setPlayStreamVideoType](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cpp_windows~class~IZegoExpressEngine#set-play-stream-video-type) 代替。
enableAudioDataCallback | 开启额外接收音频数据的回调。此函数在 2.7.0 版本以后已废弃，请使用 [startAudioDataObserver](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cpp_windows~class~IZegoExpressEngine#start-audio-data-observer) 和 [stopAudioDataObserver](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cpp_windows~class~IZegoExpressEngine#stop-audio-data-observer) 代替。
setReverbParam | 设置混响的具体参数。此函数在 1.18.0 版本以后已废弃，请使用 [setReverbPreset](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cpp_windows~class~IZegoExpressEngine#set-reverb-preset) 或者 [setReverbAdvancedParam](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cpp_windows~class~IZegoExpressEngine#set-reverb-advanced-param) 代替。
setBuiltInSpeakerOn | 是否使用内置扬声器播放声音。此函数在 2.3.0 版本以后已废弃，请使用 [setAudioRouteToSpeaker](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cpp_windows~class~IZegoExpressEngine#set-audio-route-to-speaker) 代替。
onRoomStreamUpdate | 相同房间内其他用户推的流增加或减少的通知。此回调函数自 1.18.0 起已废弃，请使用带 [extendedData] 参数的 [onRoomStreamUpdate](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cpp_windows~class~IZegoEventHandler#on-room-stream-update) 函数。
onDeviceError | 设备异常通知。此函数在 2.15.0 3.0.0 版本及以上已废弃，请使用 [onLocalDeviceExceptionOccurred](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cpp_windows~class~IZegoEventHandler#on-local-device-exception-occurred) 代替。
onNetworkQuality | 回报房间中流的网络质量。此回调函数在 2.10.0 3.0.0 版本及以上已废弃，请使用带 [ZegoStreamQualityLevel](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cpp_windows~enum~ZegoStreamQualityLevel) 枚举参数的 [onNetworkQuality](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cpp_windows~class~IZegoEventHandler#on-network-quality) 函数。
onProcessCapturedAudioData | 自定义音频处理本地采集 PCM 音频帧回调。此回调函数在 2.13.0 3.0.0 版本及以上已废弃，请使用带 [timestamp] 参数的 [onProcessCapturedAudioData](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cpp_windows~class~IZegoCustomAudioProcessHandler#on-process-captured-audio-data) 函数。
onProcessRemoteAudioData | 自定义音频处理远端拉流 PCM 音频帧回调。此回调函数在 2.13.0 3.0.0 版本及以上已废弃，请使用带 [timestamp] 参数的 [onProcessRemoteAudioData](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cpp_windows~class~IZegoCustomAudioProcessHandler#on-process-remote-audio-data) 函数。
onProcessPlaybackAudioData | 自定义音频处理 SDK 播放音频的 PCM 音频帧回调。此回调函数在 2.13.0 3.0.0 版本及以上已废弃，请使用带 [timestamp] 参数的 [onProcessPlaybackAudioData](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cpp_windows~class~IZegoCustomAudioProcessHandler#on-process-playback-audio-data) 函数。

## 变更示例代码

您可以参考以下示例代码进行接口变更。

### setAudioDeviceMode

<Tabs>
<Tab title="3.0.0 版本前">
<CodeGroup>
```java Java
ZegoEngineConfig engineConfig = new ZegoEngineConfig();
HashMap<String, String> advanceConfig = new HashMap<>();
advanceConfig.put("audio_device_mode", "2");
engineConfig.advancedConfig = advanceConfig;
ZegoExpressEngine.setEngineConfig(engineConfig);
```
```objectivec Objective-C
ZegoEngineConfig *config = [[ZegoEngineConfig alloc] init];
config.advancedConfig = @{@"audio_device_mode": @"2"};
[ZegoExpressEngine setEngineConfig:config];
```
```cpp C++
ZegoEngineConfig config;
config.advancedConfig["audio_device_mode"] = "2";
ZegoExpressSDK::setEngineConfig(config);
```
```swift Swift
let engineConfig = ZegoEngineConfig()
engineConfig.advancedConfig = ["audio_device_mode": "2"];
ZegoExpressEngine.setEngineConfig(engineConfig)
```
</CodeGroup>
</Tab>
<Tab title="3.0.0 版本及以上">
<CodeGroup>
```java Java
ZegoExpressEngine.getEngine().setAudioDeviceMode(ZegoAudioDeviceMode.GENERAL);
```
```objectivec Objective-C
[[ZegoExpressEngine sharedEngine] setAudioDeviceMode:ZegoAudioDeviceModeGeneral];
```
```cpp C++
ZegoExpressSDK::getEngine()->setAudioDeviceMode(ZEGO_AUDIO_DEVICE_MODE_GENERAL);
```
```swift Swift
ZegoExpressEngine.shared().setAudioDeviceMode(.general)
```
</CodeGroup>
</Tab>
</Tabs>

### setDebugVerbose

<Tabs>
<Tab title="3.0.0 版本前">
<CodeGroup>
```java Java
ZegoExpressEngine.getEngine().setDebugVerbose(true, ZegoLanguage.ENGLISH);
```
```objectivec Objective-C
[[ZegoExpressEngine sharedEngine] setDebugVerbose:YES language:ZegoLanguageEnglish];
```
```cpp C++
ZegoExpressSDK::getEngine()->setDebugVerbose(true, ZEGO_LANGUAGE_ENGLISH);
```
```swift Swift
ZegoExpressEngine.shared().setDebugVerbose(true, language: .english)
```
</CodeGroup>
</Tab>
<Tab title="3.0.0 版本及以上">
<CodeGroup>
```java Java
// 注意，请勿在线上版本开启此功能！仅在开发阶段使用！
// Note, do not enable this feature in the online version! Use only during development phase!"
ZegoExpressEngine.getEngine().enableDebugAssistant(true);
```
```objectivec Objective-C
// 注意，请勿在线上版本开启此功能！仅在开发阶段使用！
// Note, do not enable this feature in the online version! Use only during development phase!"
[[ZegoExpressEngine sharedEngine] enableDebugAssistant:YES];
```
```cpp C++
// 注意，请勿在线上版本开启此功能！仅在开发阶段使用！
// Note, do not enable this feature in the online version! Use only during development phase!"
ZegoExpressSDK::getEngine()->enableDebugAssistant(true);
```
```swift Swift
// 注意，请勿在线上版本开启此功能！仅在开发阶段使用！
// Note, do not enable this feature in the online version! Use only during development phase!"
ZegoExpressEngine.shared().enableDebugAssistant(true);
```
</CodeGroup>
</Tab>
</Tabs>

### loginMultiRoom

<Tabs>
<Tab title="3.0.0 版本前">
<CodeGroup>
```java Java
ZegoExpressEngine.createEngine(profile, null);

ZegoUser user = new ZegoUser("user1");
ZegoExpressEngine.getEngine().loginRoom("first_room", user);
ZegoExpressEngine.getEngine().loginMultiRoom("second_room", null);
```
```objectivec Objective-C
[ZegoExpressEngine createEngineWithProfile:profile eventHandler:nil];

ZegoUser *user = [ZegoUser userWithUserID:@"user1"];
[[ZegoExpressEngine sharedEngine] loginRoom:@"first_room" user:user];
[[ZegoExpressEngine sharedEngine] loginMultiRoom:@"second_room" config:nil];
```
```cpp C++
ZegoExpressSDK::createEngine(profile, nullptr);

auto user = ZegoUser("user1", "user1");
ZegoExpressSDK::getEngine()->loginRoom("first_room", user);
ZegoExpressSDK::getEngine()->loginMultiRoom("second_room");
```
```swift Swift
ZegoExpressEngine.createEngine(with: profile, eventHandler: nil)

let user = ZegoUser(userID: "user1")
ZegoExpressEngine.shared().loginRoom("first_room", user: user)
ZegoExpressEngine.shared().loginMultiRoom("second_room", config: nil)
```
</CodeGroup>
</Tab>
<Tab title="3.0.0 版本及以上">

相关接口使用可参考 [实时音视频 - 登录多房间](https://doc-zh.zego.im/article/4800) 或 [实时语音 - 登录多房间](https://doc-zh.zego.im/article/5006)文档。

<CodeGroup>
```java Java
// 必须在调用 [createEngine] 之前设置才生效，否则会失败。
// Must be set before calling [createEngine] to take effect, otherwise it will fail.
ZegoExpressEngine.setRoomMode(ZegoRoomMode.MULTI_ROOM);

ZegoExpressEngine.createEngine(profile, null);

ZegoUser user = new ZegoUser("user1");
ZegoExpressEngine.getEngine().loginRoom("first_room", user);
ZegoExpressEngine.getEngine().loginRoom("second_room", user);
```
```objectivec Objective-C
// 必须在调用 [createEngine] 之前设置才生效，否则会失败。
// Must be set before calling [createEngine] to take effect, otherwise it will fail.
[ZegoExpressEngine setRoomMode:ZegoRoomModeMultiRoom];

[ZegoExpressEngine createEngineWithProfile:profile eventHandler:nil];

ZegoUser *user = [ZegoUser userWithUserID:@"user1"];
[[ZegoExpressEngine sharedEngine] loginRoom:@"first_room" user:user];
[[ZegoExpressEngine sharedEngine] loginRoom:@"second_room" user:user];
```
```cpp C++
// 必须在调用 [createEngine] 之前设置才生效，否则会失败。
// Must be set before calling [createEngine] to take effect, otherwise it will fail.
ZegoExpressSDK::setRoomMode(ZEGO_ROOM_MODE_MULTI_ROOM);

ZegoExpressSDK::createEngine(profile, nullptr);

auto user = ZegoUser("user1", "user1");
ZegoExpressSDK::getEngine()->loginRoom("first_room", user);
ZegoExpressSDK::getEngine()->loginRoom("second_room", user);
```
```swift Swift
// 必须在调用 [createEngine] 之前设置才生效，否则会失败。
// Must be set before calling [createEngine] to take effect, otherwise it will fail.
ZegoExpressEngine.setRoomMode(.multiRoom)

ZegoExpressEngine.createEngine(with: profile, eventHandler: nil)

let user = ZegoUser(userID: "user1")
ZegoExpressEngine.shared().loginRoom("first_room", user: user)
ZegoExpressEngine.shared().loginRoom("second_room", user: user)
```
</CodeGroup>
</Tab>
</Tabs>

### setPlayStreamVideoLayer

<Tabs>
<Tab title="3.0.0 版本前">
<CodeGroup>
```java Java
ZegoExpressEngine.getEngine().setPlayStreamVideoLayer("stream1", ZegoPlayerVideoLayer.AUTO);
```
```objectivec Objective-C
[[ZegoExpressEngine sharedEngine] setPlayStreamVideoLayer:ZegoPlayerVideoLayerAuto streamID:@"stream1"];
```
```cpp C++
ZegoExpressSDK::getEngine()->setPlayStreamVideoLayer("stream1", ZEGO_PLAYER_VIDEO_LAYER_AUTO);
```
```swift Swift
ZegoExpressEngine.shared().setPlayStreamVideoLayer(.auto, streamID: "stream1")
```
</CodeGroup>
</Tab>
<Tab title="3.0.0 版本及以上">

相关接口使用可参考 [设置视频编码方式](https://doc-zh.zego.im/article/4433) 文档。

<CodeGroup>
```java Java
ZegoExpressEngine.getEngine().setPlayStreamVideoType("stream1", ZegoVideoStreamType.DEFAULT);
```
```objectivec Objective-C
[[ZegoExpressEngine sharedEngine] setPlayStreamVideoType:ZegoVideoStreamTypeDefault streamID:@"stream1"];
```
```cpp C++
ZegoExpressSDK::getEngine()->setPlayStreamVideoType("stream1", ZEGO_VIDEO_STREAM_TYPE_DEFAULT);
```
```swift Swift
ZegoExpressEngine.shared().setPlayStreamVideoType(.default, streamID: "stream1")
```
</CodeGroup>
</Tab>
</Tabs>

### enableAudioDataCallback

<Tabs>
<Tab title="3.0.0 版本前">
<CodeGroup>
```java Java
int bitmask = ZegoAudioDataCallbackBitMask.CAPTURED.value() | ZegoAudioDataCallbackBitMask.PLAYER.value();
ZegoAudioFrameParam param = new ZegoAudioFrameParam();
param.sampleRate = ZegoAudioSampleRate.ZEGO_AUDIO_SAMPLE_RATE_48K;
param.channel = ZegoAudioChannel.MONO;

// Start
ZegoExpressEngine.getEngine().setAudioDataHandler(handler);
ZegoExpressEngine.getEngine().enableAudioDataCallback(true, bitmask, param);

// Stop
ZegoExpressEngine.getEngine().setAudioDataHandler(null);
ZegoExpressEngine.getEngine().enableAudioDataCallback(false, bitmask, param);
```
```objectivec Objective-C
int bitmask = ZegoAudioDataCallbackBitMaskCaptured | ZegoAudioDataCallbackBitMaskPlayer;
ZegoAudioFrameParam *param = [[ZegoAudioFrameParam alloc] init];
param.sampleRate = ZegoAudioSampleRate48K;
param.channel = ZegoAudioChannelMono;

// Start
[[ZegoExpressEngine sharedEngine] setAudioDataHandler:self];
[[ZegoExpressEngine sharedEngine] enableAudioDataCallback:YES callbackBitMask:bitmask param:param];

// Stop
[[ZegoExpressEngine sharedEngine] setAudioDataHandler:nil];
[[ZegoExpressEngine sharedEngine] enableAudioDataCallback:NO callbackBitMask:bitmask param:param];
```
```cpp C++
auto bitmask = ZEGO_AUDIO_DATA_CALLBACK_BIT_MASK_CAPTURED | ZEGO_AUDIO_DATA_CALLBACK_BIT_MASK_PLAYER;
auto param = ZegoAudioFrameParam();
param.sampleRate = ZEGO_AUDIO_SAMPLE_RATE_48K;
param.channel = ZEGO_AUDIO_CHANNEL_MONO;

// Start
ZegoExpressSDK::getEngine()->setAudioDataHandler(handler);
ZegoExpressSDK::getEngine()->enableAudioDataCallback(true, bitmask, param);

// Stop
ZegoExpressSDK::getEngine()->setAudioDataHandler(nullptr);
ZegoExpressSDK::getEngine()->enableAudioDataCallback(false, bitmask, param);
```
```swift Swift
let param = ZegoAudioFrameParam()
param.sampleRate = .rate48K
param.channel = .mono

// Start
ZegoExpressEngine.shared().setAudioDataHandler(self)
ZegoExpressEngine.shared().enableAudioDataCallback(true, callbackBitMask: [.captured, .player], param: param)

// Stop
ZegoExpressEngine.shared().setAudioDataHandler(nil)
ZegoExpressEngine.shared().enableAudioDataCallback(false, callbackBitMask: [.captured, .player], param: param)
```
</CodeGroup>
</Tab>
<Tab title="3.0.0 版本及以上">
<CodeGroup>
```java Java
int bitmask = ZegoAudioDataCallbackBitMask.CAPTURED.value() | ZegoAudioDataCallbackBitMask.PLAYER.value();
ZegoAudioFrameParam param = new ZegoAudioFrameParam();
param.sampleRate = ZegoAudioSampleRate.ZEGO_AUDIO_SAMPLE_RATE_48K;
param.channel = ZegoAudioChannel.MONO;

// Start
ZegoExpressEngine.getEngine().setAudioDataHandler(handler);
ZegoExpressEngine.getEngine().startAudioDataObserver(bitmask, param);

// Stop
ZegoExpressEngine.getEngine().setAudioDataHandler(null);
ZegoExpressEngine.getEngine().stopAudioDataObserver();
```
```objectivec Objective-C
int bitmask = ZegoAudioDataCallbackBitMaskCaptured | ZegoAudioDataCallbackBitMaskPlayer;
ZegoAudioFrameParam *param = [[ZegoAudioFrameParam alloc] init];
param.sampleRate = ZegoAudioSampleRate48K;
param.channel = ZegoAudioChannelMono;

// Start
[[ZegoExpressEngine sharedEngine] setAudioDataHandler:self];
[[ZegoExpressEngine sharedEngine] startAudioDataObserver:bitmask param:param];

// Stop
[[ZegoExpressEngine sharedEngine] setAudioDataHandler:nil];
[[ZegoExpressEngine sharedEngine] stopAudioDataObserver];
```
```cpp C++
auto bitmask = ZEGO_AUDIO_DATA_CALLBACK_BIT_MASK_CAPTURED | ZEGO_AUDIO_DATA_CALLBACK_BIT_MASK_PLAYER;
auto param = ZegoAudioFrameParam();
param.sampleRate = ZEGO_AUDIO_SAMPLE_RATE_48K;
param.channel = ZEGO_AUDIO_CHANNEL_MONO;

// Start
ZegoExpressSDK::getEngine()->setAudioDataHandler(handler);
ZegoExpressSDK::getEngine()->startAudioDataObserver(bitmask, param);

// Stop
ZegoExpressSDK::getEngine()->setAudioDataHandler(nullptr);
ZegoExpressSDK::getEngine()->stopAudioDataObserver();
```
```swift Swift
let param = ZegoAudioFrameParam()
param.sampleRate = .rate48K
param.channel = .mono

// Start
ZegoExpressEngine.shared().setAudioDataHandler(self)
ZegoExpressEngine.shared().startAudioDataObserver([.captured, .player], param: param)

// Stop
ZegoExpressEngine.shared().setAudioDataHandler(nil)
ZegoExpressEngine.shared().stopAudioDataObserver()
```
</CodeGroup>
</Tab>
</Tabs>

### setReverbParam

<Tabs>
<Tab title="3.0.0 版本前">
<CodeGroup>
```java Java
ZegoReverbParam param = new ZegoReverbParam(ZegoReverbPreset.BASEMENT);
ZegoExpressEngine.getEngine().setReverbParam(param);
```
```objectivec Objective-C
ZegoReverbParam *param = [ZegoReverbParam paramWithPreset:ZegoReverbPresetBasement];
[[ZegoExpressEngine sharedEngine] setReverbParam:param];
```
```cpp C++
auto param = ZegoReverbParam(ZEGO_REVERB_PRESET_BASEMENT);
ZegoExpressSDK::getEngine()->setReverbParam(param);
```
```swift Swift
let param = ZegoReverbParam(preset: .basement)
ZegoExpressEngine.shared().setReverbParam(param)
```
</CodeGroup>
</Tab>
<Tab title="3.0.0 版本及以上">
<CodeGroup>
```java Java
ZegoExpressEngine.getEngine().setReverbPreset(ZegoReverbPreset.BASEMENT);

ZegoReverbAdvancedParam param = new ZegoReverbAdvancedParam();
ZegoExpressEngine.getEngine().setReverbAdvancedParam(param);
```
```objectivec Objective-C
[[ZegoExpressEngine sharedEngine] setReverbPreset:ZegoReverbPresetBasement];

ZegoReverbAdvancedParam *param = [[ZegoReverbAdvancedParam alloc] init];
[[ZegoExpressEngine sharedEngine] setReverbAdvancedParam:param];
```
```cpp C++
ZegoExpressSDK::getEngine()->setReverbPreset(ZEGO_REVERB_PRESET_BASEMENT);

auto param = ZegoReverbAdvancedParam();
ZegoExpressSDK::getEngine()->setReverbAdvancedParam(param);
```
```swift Swift
ZegoExpressEngine.shared().setReverbPreset(.basement)

let param = ZegoReverbAdvancedParam()
ZegoExpressEngine.shared().setReverbAdvancedParam(param)
```
</CodeGroup>
</Tab>
</Tabs>

### setBuiltInSpeakerOn

<Tabs>
<Tab title="3.0.0 版本前">
<CodeGroup>
```java Java
ZegoExpressEngine.getEngine().setBuiltInSpeakerOn(true);
```
```objectivec Objective-C
[[ZegoExpressEngine sharedEngine] setBuiltInSpeakerOn:YES];
```
```cpp C++
ZegoExpressSDK::getEngine()->setBuiltInSpeakerOn(true);
```
```swift Swift
ZegoExpressEngine.shared().setBuiltInSpeakerOn(true)
```
</CodeGroup>
</Tab>
<Tab title="3.0.0 版本及以上">
<CodeGroup>
```java Java
ZegoExpressEngine.getEngine().setAudioRouteToSpeaker(true);
```
```objectivec Objective-C
[[ZegoExpressEngine sharedEngine] setAudioRouteToSpeaker:YES];
```
```cpp C++
ZegoExpressSDK::getEngine()->setAudioRouteToSpeaker(true);
```
```swift Swift
ZegoExpressEngine.shared().setAudioRouteToSpeaker(true)
```
</CodeGroup>
</Tab>
</Tabs>

### onRoomStreamUpdate

<Tabs>
<Tab title="3.0.0 版本前">
<CodeGroup>
```java Java
@Override
public void onRoomStreamUpdate(String roomID, ZegoUpdateType updateType, ArrayList<ZegoStream> streamList) {
    super.onRoomStreamUpdate(roomID, updateType, streamList);
    // Handle room streams
    // 处理房间内的流变更
}
```
```objectivec Objective-C
- (void)onRoomStreamUpdate:(ZegoUpdateType)updateType streamList:(NSArray<ZegoStream *> *)streamList roomID:(NSString *)roomID {
    // Handle room streams
    // 处理房间内的流变更
}
```
```cpp C++
// Handle room streams
// 处理房间内的流变更
void onRoomStreamUpdate(const std::string& roomID, ZegoUpdateType updateType, const std::vector<ZegoStream>& streamList) override;
```
```swift Swift
func onRoomStreamUpdate(_ updateType: ZegoUpdateType, streamList: [ZegoStream], roomID: String) {
    // Handle room streams
    // 处理房间内的流变更
}
```
</CodeGroup>
</Tab>
<Tab title="3.0.0 版本及以上">
<CodeGroup>
```java Java
@Override
public void onRoomStreamUpdate(String roomID, ZegoUpdateType updateType, ArrayList<ZegoStream> streamList, JSONObject extendedData) {
    super.onRoomStreamUpdate(roomID, updateType, streamList, extendedData);
    // Handle room streams
    // 处理房间内的流变更
}
```
```objectivec Objective-C
- (void)onRoomStreamUpdate:(ZegoUpdateType)updateType streamList:(NSArray<ZegoStream *> *)streamList extendedData:(NSDictionary *)extendedData roomID:(NSString *)roomID {
    // Handle room streams
    // 处理房间内的流变更
}
```
```cpp C++
// Handle room streams
// 处理房间内的流变更
void onRoomStreamUpdate(const std::string& roomID, ZegoUpdateType updateType, const std::vector<ZegoStream>& streamList, const std::string& extendData) override;
```
```swift Swift
func onRoomStreamUpdate(_ updateType: ZegoUpdateType, streamList: [ZegoStream], extendedData: [AnyHashable : Any]?, roomID: String) {
    // Handle room streams
    // 处理房间内的流变更
}
```
</CodeGroup>
</Tab>
</Tabs>

### onDeviceError

<Tabs>
<Tab title="3.0.0 版本前">
<CodeGroup>
```java Java
@Override
public void onDeviceError(int errorCode, String deviceName) {
    super.onDeviceError(errorCode, deviceName);
    // Handle device error
    // 处理设备错误
}
```
```objectivec Objective-C
- (void)onDeviceError:(int)errorCode deviceName:(NSString *)deviceName {
    // Handle device error
    // 处理设备错误
}
```
```cpp C++
// Handle device error
// 处理设备错误
void onDeviceError(int errorCode, const std::string& deviceName) override;
```
```swift Swift
func onDeviceError(_ errorCode: Int32, deviceName: String) {
    // Handle device error
    // 处理设备错误
}
```
</CodeGroup>
</Tab>
<Tab title="3.0.0 版本及以上">
<CodeGroup>
```java Java
@Override
public void onLocalDeviceExceptionOccurred(ZegoDeviceExceptionType exceptionType, ZegoDeviceType deviceType, String deviceID) {
    super.onLocalDeviceExceptionOccurred(exceptionType, deviceType, deviceID);
    // Handle device error
    // 处理设备错误
}
```
```objectivec Objective-C
- (void)onLocalDeviceExceptionOccurred:(ZegoDeviceExceptionType)exceptionType deviceType:(ZegoDeviceType)deviceType deviceID:(NSString *)deviceID {
    // Handle device error
    // 处理设备错误
}
```
```cpp C++
// Handle device error
// 处理设备错误
void onLocalDeviceExceptionOccurred(ZegoDeviceExceptionType exceptionType, ZegoDeviceType deviceType, const std::string &deviceID) override;
```
```swift Swift
func onLocalDeviceExceptionOccurred(_ exceptionType: ZegoDeviceExceptionType, deviceType: ZegoDeviceType, deviceID: String) {
    // Handle device error
    // 处理设备错误
}
```
</CodeGroup>
</Tab>
</Tabs>

### onNetworkQuality

<Tabs>
<Tab title="3.0.0 版本前">
<CodeGroup>
```java Java
@Override
public void onNetworkQuality(String streamID, int txQuality, int rxQuality) {
    super.onNetworkQuality(streamID, txQuality, rxQuality);
    // Handle network quality
    // 处理网络质量
}
```
```objectivec Objective-C
- (void)onNetworkQuality:(NSString *)streamID txQuality:(int)txQuality rxQuality:(int)rxQuality {
    // Handle network quality
    // 处理网络质量
}
```
```cpp C++
// Handle network quality
// 处理网络质量
void onNetworkQuality(const char *streamID, int txQuality, int rxQuality) override;
```
```swift Swift
func onNetworkQuality(_ streamID: String, txQuality: Int32, rxQuality: Int32) {
    // Handle network quality
    // 处理网络质量
}
```
</CodeGroup>
</Tab>
<Tab title="3.0.0 版本及以上">
<CodeGroup>
```java Java
@Override
public void onNetworkQuality(String userID, ZegoStreamQualityLevel upstreamQuality, ZegoStreamQualityLevel downstreamQuality) {
    super.onNetworkQuality(userID, upstreamQuality, downstreamQuality);
    // Handle network quality
    // 处理网络质量
}
```
```objectivec Objective-C
- (void)onNetworkQuality:(NSString *)userID upstreamQuality:(ZegoStreamQualityLevel)upstreamQuality downstreamQuality:(ZegoStreamQualityLevel)downstreamQuality {
    // Handle network quality
    // 处理网络质量
}
```
```cpp C++
// Handle network quality
// 处理网络质量
void onNetworkQuality(const std::string &userID, ZegoStreamQualityLevel upstreamQuality, ZegoStreamQualityLevel downstreamQuality) override;
```
```swift Swift
func onNetworkQuality(_ userID: String, upstreamQuality: ZegoStreamQualityLevel, downstreamQuality: ZegoStreamQualityLevel) {
    // Handle network quality
    // 处理网络质量
}
```
</CodeGroup>
</Tab>
</Tabs>

### onProcessCapturedAudioData / onProcessRemoteAudioData / onProcessPlaybackAudioData

<Tabs>
<Tab title="3.0.0 版本前">
<CodeGroup>
```java Java
ZegoExpressEngine.getEngine().setCustomAudioProcessHandler(new IZegoCustomAudioProcessHandler() {
    @Override
    public void onProcessCapturedAudioData(ByteBuffer data, int dataLength, ZegoAudioFrameParam param) {
        super.onProcessCapturedAudioData(data, dataLength, param);
        // Handle captured audio data
        // 处理本地采集音频数据
    }

    @Override
    public void onProcessRemoteAudioData(ByteBuffer data, int dataLength, ZegoAudioFrameParam param, String streamID) {
        super.onProcessRemoteAudioData(data, dataLength, param, streamID);
        // Handle remote audio data
        // 处理远端拉流音频数据
    }

    @Override
    public void onProcessPlaybackAudioData(ByteBuffer data, int dataLength, ZegoAudioFrameParam param) {
        super.onProcessPlaybackAudioData(data, dataLength, param);
        // Handle playback audio data
        // 处理播放音频数据
    }
});
```
```objectivec Objective-C
- (void)onProcessCapturedAudioData:(unsigned char *)data dataLength:(unsigned int)dataLength param:(ZegoAudioFrameParam *)param {
    // Handle captured audio data
    // 处理本地采集音频数据
}

- (void)onProcessRemoteAudioData:(unsigned char *)data dataLength:(unsigned int)dataLength param:(ZegoAudioFrameParam *)param streamID:(NSString *)streamID {
    // Handle remote audio data
    // 处理远端拉流音频数据
}

- (void)onProcessPlaybackAudioData:(unsigned char *)data dataLength:(unsigned int)dataLength param:(ZegoAudioFrameParam *)param {
    // Handle playback audio data
    // 处理播放音频数据
}
```
```cpp C++
// Handle captured audio data
// 处理本地采集音频数据
void onProcessCapturedAudioData(unsigned char *data, unsigned int dataLength, ZegoAudioFrameParam *param) override;

// Handle remote audio data
// 处理远端拉流音频数据
void onProcessRemoteAudioData(unsigned char *data, unsigned int dataLength, ZegoAudioFrameParam *param, const std::string &streamID) override;

// Handle playback audio data
// 处理播放音频数据
void onProcessPlaybackAudioData(unsigned char *data, unsigned int dataLength, ZegoAudioFrameParam *param) override;
```
```swift Swift
func onProcessCapturedAudioData(_ data: UnsafeMutablePointer<UInt8>, dataLength: UInt32, param: ZegoAudioFrameParam) {
    // Handle captured audio data
    // 处理本地采集音频数据
}

func onProcessRemoteAudioData(_ data: UnsafeMutablePointer<UInt8>, dataLength: UInt32, param: ZegoAudioFrameParam, streamID: String) {
    // Handle remote audio data
    // 处理远端拉流音频数据
}

func onProcessPlaybackAudioData(_ data: UnsafeMutablePointer<UInt8>, dataLength: UInt32, param: ZegoAudioFrameParam) {
    // Handle playback audio data
    // 处理播放音频数据
}
```
</CodeGroup>
</Tab>
<Tab title="3.0.0 版本及以上">
<CodeGroup>
```java Java
ZegoExpressEngine.getEngine().setCustomAudioProcessHandler(new IZegoCustomAudioProcessHandler() {
    @Override
    public void onProcessCapturedAudioData(ByteBuffer data, int dataLength, ZegoAudioFrameParam param, double timestamp) {
        super.onProcessCapturedAudioData(data, dataLength, param, timestamp);
        // Handle captured audio data
        // 处理本地采集音频数据
    }

    @Override
    public void onProcessRemoteAudioData(ByteBuffer data, int dataLength, ZegoAudioFrameParam param, String streamID, double timestamp) {
        super.onProcessRemoteAudioData(data, dataLength, param, streamID, timestamp);
        // Handle remote audio data
        // 处理远端拉流音频数据
    }

    @Override
    public void onProcessPlaybackAudioData(ByteBuffer data, int dataLength, ZegoAudioFrameParam param, double timestamp) {
        super.onProcessPlaybackAudioData(data, dataLength, param, timestamp);
        // Handle playback audio data
        // 处理播放音频数据
    }
});
```
```objectivec Objective-C
- (void)onProcessCapturedAudioData:(unsigned char *)data dataLength:(unsigned int)dataLength param:(ZegoAudioFrameParam *)param timestamp:(double)timestamp {
    // Handle captured audio data
    // 处理本地采集音频数据
}

- (void)onProcessRemoteAudioData:(unsigned char *)data dataLength:(unsigned int)dataLength param:(ZegoAudioFrameParam *)param streamID:(NSString *)streamID timestamp:(double)timestamp {
    // Handle remote audio data
    // 处理远端拉流音频数据
}

- (void)onProcessPlaybackAudioData:(unsigned char *)data dataLength:(unsigned int)dataLength param:(ZegoAudioFrameParam *)param timestamp:(double)timestamp {
    // Handle playback audio data
    // 处理播放音频数据
}
```
```cpp C++
// Handle captured audio data
// 处理本地采集音频数据
void onProcessCapturedAudioData(unsigned char *data, unsigned int dataLength, ZegoAudioFrameParam *param, double timestamp) override;

// Handle remote audio data
// 处理远端拉流音频数据
void onProcessRemoteAudioData(unsigned char *data, unsigned int dataLength, ZegoAudioFrameParam *param, const std::string &streamID, double timestamp) override;

// Handle playback audio data
// 处理播放音频数据
void onProcessPlaybackAudioData(unsigned char *data, unsigned int dataLength, ZegoAudioFrameParam *param, double timestamp) override;
```
```swift Swift
func onProcessCapturedAudioData(_ data: UnsafeMutablePointer<UInt8>, dataLength: UInt32, param: ZegoAudioFrameParam, timestamp: Double) {
    // Handle captured audio data
    // 处理本地采集音频数据
}

func onProcessRemoteAudioData(_ data: UnsafeMutablePointer<UInt8>, dataLength: UInt32, param: ZegoAudioFrameParam, streamID: String, timestamp: Double) {
    // Handle remote audio data
    // 处理远端拉流音频数据
}

func onProcessPlaybackAudioData(_ data: UnsafeMutablePointer<UInt8>, dataLength: UInt32, param: ZegoAudioFrameParam, timestamp: Double) {
    // Handle playback audio data
    // 处理播放音频数据
}
```
</CodeGroup>
</Tab>
</Tabs>

<Content />