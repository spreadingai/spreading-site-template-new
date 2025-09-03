# 功能实现流程
- - - 

## 功能说明
实时语音场景的典型之一是，同一房间中的成员进行实时语音对话。

## 流程说明
以 2 人间的实时语音为例，主要流程如下：

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/iOS/Applications-InstantAudio/5-InstantAudio-Implementation/flow.png" /></Frame>

> 请注意：
> 
> 上面流程中以 2 名房间成员间的实时语音为例，实际上 **Zego SDK 支持多人实时语音**。建议开发者按需设计。

详细步骤如下：

1. 初始化 SDK：SDK 在初始化后才可以进行登录和推拉流操作。
2. 设置回调：包括房间状态回调、推流回调、拉流回调。
3. 登录房间。
4. 推音频流：把本地的音频实时推送出去。
5. 拉音频流：播放房间内其它用户的音频。
6. 退出房间：退出房间需要停止推流、停止拉流，然后再登出房间

## 代码说明
### 初始化 SDK

```objc
// 引入 ZegoExpressEngine.h 头文件
#import <ZegoExpressEngine/ZegoExpressEngine.h>

// 遵循 ZegoEventHandler 协议以处理您关心的事件回调
@interface ViewController () <ZegoEventHandler>
// ······
@end

ZegoEngineProfile *profile = [ZegoEngineProfile new];
// 请通过官网注册获取，格式为：1234567890
profile.appID = appID; 
//请通过官网注册获取，格式为：@"0123456789012345678901234567890123456789012345678901234567890123"（共64个字符）
profile.appSign = appSign; 
//通用场景接入
profile.scenario = ZegoScenarioGeneral; 
// 创建引擎，并注册 self 为 eventHandler 回调。不需要注册回调的话，eventHandler 参数可以传 nil，后续可调用 "-setEventHandler:" 方法设置回调
[ZegoExpressEngine createEngineWithProfile:profile eventHandler:self];
```

具体可参考 [快速开始 - 实现流程](/real-time-voice-ios/quick-start/implementing-voice-call#创建引擎) 的 “创建引擎”。

### 设置回调
设置回调接口，需要监听处理房间状态回调接口、推流回调接口、拉流回调接口。

```objc
// 遵循 ZegoEventHandler 协议以处理您关心的事件回调
@interface ViewController () <ZegoEventHandler>
// ······
@end


@implementation ViewController

// ······

// 以下为常用的房间相关回调

- (void)onRoomStateUpdate:(ZegoRoomState)state errorCode:(int)errorCode extendedData:(NSDictionary *)extendedData roomID:(NSString *)roomID {
    // 房间状态更新回调，登录房间后，当房间连接状态发生变更（如出现房间断开，登录认证失败等情况），SDK 会通过该回调通知
}

- (void)onRoomUserUpdate:(ZegoUpdateType)updateType userList:(NSArray<ZegoUser *> *)userList roomID:(NSString *)roomID {
    // 用户状态更新，登录房间后，当房间内有用户新增或删除时，SDK会通过该回调通知
}

- (void)onRoomStreamUpdate:(ZegoUpdateType)updateType streamList:(NSArray<ZegoStream *> *)streamList roomID:(NSString *)roomID {
    // 流状态更新，登录房间后，当房间内有用户新推送或删除音视频流时，SDK 会通过该回调通知
}

// 以下为常用的推流相关回调 

- (void)onPublisherStateUpdate:(ZegoPublisherState)state errorCode:(int)errorCode extendedData:(NSDictionary *)extendedData streamID:(NSString *)streamID {
    // 调用推流接口成功后，当推流器状态发生变更，如出现网络中断导致推流异常等情况，SDK 在重试推流的同时，会通过该回调通知
}

// 以下为常用的拉流相关回调

- (void)onPlayerStateUpdate:(ZegoPlayerState)state errorCode:(int)errorCode extendedData:(NSDictionary *)extendedData streamID:(NSString *)streamID {
    // 调用拉流接口成功后，当拉流器状态发生变更，如出现网络中断导致推流异常等情况，SDK 在重试拉流的同时，会通过该回调通知
}

// 根据需要实现其他的事件回调
@end
```

### 登录房间
用户间进行实时语音对话前，必须先登录到同一个房间。

**注意：房间 ID 只支持最大长度为 128 字节的字符串，格式仅支持数字，英文字符 和 '~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', '=', '-', '`', ';', '’', ',', '.', '\<', '>', '/', '\' 特殊字符。**

```objc
// 创建用户对象
ZegoUser *user = [ZegoUser userWithUserID:@"user1"];

// 开始登录房间
[[ZegoExpressEngine sharedEngine] loginRoom:@"room1" user:user];
```

具体可参考 [快速开始 - 实现流程](/real-time-voice-ios/quick-start/implementing-voice-call#登录房间) 的 “登录房间”。

### 开始推音频流
登录房间成功后可推音频流。开发者可调用 `startPublishingStream` 进行推流，如果不需要继续推流，请调用 `stopPublishingStream` 停止推流。

**注意：streamID 只支持长度不超过 256 的字符串，需要在整个 AppID 内全局唯一，若出现在同一个 AppID 内，不同的用户各推了一条流且流名相同，将会导致后推流的用户推流失败。不可以包含 URL 关键字，否则推拉流失败。格式仅支持数字、英文字符和 "-"、"_"。**

```objc
// 开始推流
[[ZegoExpressEngine sharedEngine] startPublishingStream:@"stream1"];
```

具体可参考 [快速开始 - 实现流程](/real-time-voice-ios/quick-start/implementing-voice-call#推流) 的 “推流”。

### 播放音频流
登录房间成功后可播放直播音频流。开发者可调用 `startPlayingStream` 进行拉流，如果不需要继续拉流，请调用 `stopPlayingStream` 停止拉流。

**注意：streamID 只支持长度不超过 256 的字符串。不可以包含 URL 关键字，否则推拉流失败。格式仅支持数字、英文字符和 "-"、"_"。**

```objc
// 开始拉流，流名从登录房间后的 onRoomStreamUpdate:(ZegoUpdateType)updateType streamList:(NSArray<ZegoStream *> *)streamList roomID:(NSString *)roomID 回调中获取，有新增/删除流时都会收到此回调
[[ZegoExpressEngine sharedEngine] startPlayingStream:@"stream1"];
```

具体可参考 [快速开始 - 实现流程](/real-time-voice-ios/quick-start/implementing-voice-call#拉流) 的 “2.4 拉流”。

### 结束音频直播
音频通话结束后的操作主要是登出房间、停止推流、停止拉流、清理视图或数据等，视业务需求情况来判断是否需要释放 SDK。

```objc
// 停止推流
[[ZegoExpressEngine sharedEngine] stopPublishingStream];
// 停止拉流
[[ZegoExpressEngine sharedEngine] stopPlayingStream:@"stream1"];
// 登出房间
[[ZegoExpressEngine sharedEngine] logoutRoom:@"room1"];

// 如果不需要再继续使用 SDK 可以调用如下函数释放 SDK。 
// 注意：释放 SDK 后需要再使用 SDK 时，必须重新初始化 SDK。
[ZegoExpressEngine destroyEngine:nil];
```
