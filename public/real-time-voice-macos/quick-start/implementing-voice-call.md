# 实现音频通话

---


## 前提条件

在实现基本的实时音频通话之前，请确保：

- 已在项目中集成 ZEGO Express SDK，实现基本的实时音视频功能，详情请参考 [快速开始 - 集成](https://doc-zh.zego.im/article/3576)。
- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppID 和 AppSign，详情请参考 [控制台 - 项目管理](/console/project-info) 中的“项目信息”。

<Warning title="注意">


SDK 同时也支持 Token 鉴权，若您对项目安全性有更高要求，建议您升级鉴权方式，详情请参考 [如何从 AppSign 鉴权升级为 Token 鉴权](http://doc-zh.zego.im/faq/token_upgrade?product=ExpressVideo)。

</Warning>





## 使用步骤

本节介绍如何使用 ZEGO Express SDK 实现基本的实时语音功能，API 调用时序如下图：

<h1 id="CreateEngine"> </h1>
<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/QuickStart/quickstart_uml_audio_createEngineWithProfile.png" /></Frame>


### 创建引擎

**1. （可选）创建界面**

<Accordion title="添加界面元素" defaultOpen="false">
在创建引擎之前，推荐开发者添加以下界面元素，方便实现基本的实时语音功能。

- 音频窗口
- 结束按钮

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/QuickStart/UI_Audio.jpg" /></Frame>
</Accordion>

**2. 引入头文件**

在项目中引入 ZegoExpressEngine 头文件。

```objc
// 引入 ZegoExpressEngine.h 头文件
#import <ZegoExpressEngine/ZegoExpressEngine.h>
```

**3. 创建引擎**

调用 [createEngineWithProfile ](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~objective-c_macos~class~ZegoExpressEngine#create-engine-with-profile-event-handler) 接口，将申请到的 AppID 和 AppSign 传入参数 “appID” 和 “appSign”，创建引擎单例对象。

根据 App 实际的音视频业务选择一个合适的场景，请参考 [场景化音视频配置](https://doc-zh.zego.im/article/16508) 文档，把选择好的场景枚举传入参数 "scenario"。

如果需要注册回调，可将实现了 [ZegoEventHandler ]() 的对象（例如 “self”）传入参数 “eventHandler”。如果不需要注册回调，可将 “nil” 传入参数 “eventHandler”，创建引擎后仍需要注册回调时可通过调用 [setEventHandler ]() 接口设置回调。

<Warning title="注意">


SDK 同时也支持 Token 鉴权，若您需要升级鉴权方式，可参考 [如何从 AppSign 鉴权升级为 Token 鉴权](http://doc-zh.zego.im/faq/token_upgrade?product=ExpressVideo)。


</Warning>



```obj

ZegoEngineProfile *profile = [ZegoEngineProfile new];
// 请通过官网注册获取，格式为：1234567890
profile.appID = appID;
//请通过官网注册获取，格式为：@"0123456789012345678901234567890123456789012345678901234567890123"（共64个字符）
profile.appSign = appSign;
//指定使用直播场景 (请根据实际情况填写适合您业务的场景)
profile.scenario = ZegoScenarioBroadcast;
// 创建引擎，并注册 self 为 eventHandler 回调。不需要注册回调的话，eventHandler 参数可以传 nil，后续可调用 "-setEventHandler:" 方法设置回调
[ZegoExpressEngine createEngineWithProfile:profile eventHandler:self];
```


**4. 设置回调**

您可以通过实现 [ZegoEventHandler](https://doc-zh.zego.im/zh/api?doc=Express_Audio_SDK_API~ObjectiveC_ios~protocol~zego-event-handler) 接口的类并实现需要的回调方法，以监听并处理所关注的事件回调。然后将实例化对象（例如 self）作为eventHandler参数传递给 [createEngineWithProfile ](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~objective-c_macos~class~ZegoExpressEngine#create-engine-with-profile-event-handler) 或者传递给 [setEventHandler](https://doc-zh.zego.im/zh/api?doc=Express_Audio_SDK_API~ObjectiveC_ios~class~zego-express-engine#set-event-handler) 注册回调

<Warning title="注意">


 建议在创建引擎时或创建引擎后就立即注册回调，避免延后注册错过事件通知。

</Warning>




<a id="createroom"></a>

### 登录房间

**1. 登录**

传入用户 ID 参数 “userID” 创建 [ZegoUser](https://doc-zh.zego.im/zh/api?doc=Express_Audio_SDK_API~ObjectiveC_ios~class~zego-user#includes) 用户对象后，调用 [loginRoom ](https://doc-zh.zego.im/zh/api?doc=Express_Audio_SDK_API~ObjectiveC_ios~class~zego-express-engine#login-room-user) 接口，传入房间 ID 参数 “roomID” 和用户参数 “user”，登录房间。如果房间不存在，调用该接口时会创建并登录此房间。


- 同一个 AppID 内，需保证 “roomID” 全局唯一。
- 同一个 AppID 内，需保证 “userID” 全局唯一，建议开发者将其设置成一个有意义的值，可将 “userID” 与自己业务账号系统进行关联。
- ZegoUser 的构造方法 [userWithUserID ](https://doc-zh.zego.im/zh/api?doc=Express_Audio_SDK_API~ObjectiveC_ios~class~zego-user#user-with-user-id) 会将 “userName” 设为与传的参数 “userID” 一样。“userID” 不能为 “nil”，否则会导致登录房间失败。


```objc
// 创建用户对象，ZegoUser 的构造方法 [userWithUserID ](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~objective-c_macos~class~ZegoUser#user-with-user-id) 会将 “userName” 设为与传的参数 “userID” 一样。“userID” 不能为 “nil”，否则会导致登录房间失败。
ZegoUser *user = [ZegoUser userWithUserID:@"user1"];
// 只有传入 “isUserStatusNotify” 参数取值为 “true” 的 ZegoRoomConfig，才能收到 onRoomUserUpdate 回调。
ZegoRoomConfig *roomConfig = [[ZegoRoomConfig alloc] init];
// 如果您使用 appsign 的方式鉴权，token 参数不需填写；如果需要使用更加安全的 鉴权方式： token 鉴权，请参考[如何从 AppSign 鉴权升级为 Token 鉴权](https://doc-zh.zego.im/faq/token_upgrade?product=ExpressVideo&platform=all)
// roomConfig.token = @"xxxxx";
roomConfig.isUserStatusNotify = YES;
// 登录房间
[[ZegoExpressEngine sharedEngine] loginRoom:roomID user:user config:roomConfig callback:^(int errorCode, NSDictionary * _Nullable extendedData) {
    // 登录房间结果，如果仅关注登录结果，关注此回调即可
}];
```

**2. 监听登录房间后的事件回调**

根据实际应用需要，在登录房间后监听想要关注的事件通知，比如房间状态更新、用户状态更新、流状态更新等。

- [onRoomStateChanged](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~objective-c_macos~protocol~ZegoEventHandler#on-room-state-changed-error-code-extended-data-room-id)：房间状态更新回调。登录房间后，当房间连接状态发生变更（如出现房间断开，登录认证失败等情况），SDK 会通过该回调通知。
- [onRoomUserUpdate](https://doc-zh.zego.im/zh/api?doc=Express_Audio_SDK_API~ObjectiveC_ios~protocol~zego-event-handler#on-room-user-update-user-list-room-id)：用户状态更新回调。登录房间后，当房间内有用户新增或删除时，SDK 会通过该回调通知。

    只有调用 [loginRoom](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~objective-c_macos~class~ZegoExpressEngine#login-room-user) 接口登录房间时传入 [ZegoRoomConfig](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~objective-c_macos~class~ZegoRoomConfig) 配置，且 “isUserStatusNotify” 参数取值为 “true” 时，用户才能收到 [onRoomUserUpdate](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~objective-c_macos~protocol~ZegoEventHandler#on-room-user-update-user-list-room-id) 回调。

- [onRoomStreamUpdate](https://doc-zh.zego.im/zh/api?doc=Express_Audio_SDK_API~ObjectiveC_ios~protocol~zego-event-handler#on-room-stream-update-stream-list-extended-data-room-id)：流状态更新回调。登录房间后，当房间内有用户新推送或删除音视频流时，SDK 会通过该回调通知。

<Warning title="注意">


- 只有调用 [loginRoom](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~objective-c_macos~class~ZegoExpressEngine#login-room-user) 接口登录房间时传入 [ZegoRoomConfig](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~objective-c_macos~class~ZegoRoomConfig) 配置，且 “isUserStatusNotify” 参数取值为 “true” 时，用户才能收到 [onRoomUserUpdate](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~objective-c_macos~protocol~ZegoEventHandler#on-room-user-update-user-list-room-id) 回调。
- 通常情况下，如果某个用户想要播放其他用户推送的视频，可以在收到流状态更新（新增）的回调中，调用 [startPlayingStream](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~objective-c_macos~class~ZegoExpressEngine#start-playing-stream-canvas) 接口拉取远端推送的音视频流。

</Warning>



```objc
// 遵循 ZegoEventHandler 协议处理相关的事件回调
@interface ViewController () <ZegoEventHandler>
// ······
@end

@implementation ViewController

// 常用的房间相关回调

// 房间状态更新回调
-(void)onRoomStateChanged:(ZegoRoomStateChangedReason)reason errorCode:(int)errorCode extendedData:(NSDictionary *)extendedData roomID:(NSString *)roomID {
    if(reason == ZegoRoomStateChangedReasonLogining)
    {
        // 登录中
    }
    else if(reason == ZegoRoomStateChangedReasonLogined)
    {
        // 登录成功
        //只有当房间状态是登录成功或重连成功时，推流（startPublishingStream）、拉流（startPlayingStream）才能正常收发音视频
        //将自己的音视频流推送到 ZEGO 音视频云
    }
    else if(reason == ZegoRoomStateChangedReasonLoginFailed)
    {
        // 登录失败
    }
    else if(reason == ZegoRoomStateChangedReasonReconnecting)
    {
        // 重连中
    }
    else if(reason == ZegoRoomStateChangedReasonReconnected)
    {
        // 重连成功
    }
    else if(reason == ZegoRoomStateChangedReasonReconnectFailed)
    {
        // 重连失败
    }
    else if(reason == ZegoRoomStateChangedReasonKickOut)
    {
        // 被踢出房间
    }
    else if(reason == ZegoRoomStateChangedReasonLogout)
    {
        // 登出成功
    }
    else if(reason == ZegoRoomStateChangedReasonLogoutFailed)
    {
        // 登出失败
    }
}

// 用户状态更新回调
- (void)onRoomUserUpdate:(ZegoUpdateType)updateType userList:(NSArray<ZegoUser *> *)userList roomID:(NSString *)roomID {
    // 根据需要实现事件回调
}

// 流状态更新回调
- (void)onRoomStreamUpdate:(ZegoUpdateType)updateType streamList:(NSArray<ZegoStream *> *)streamList extendedData:(nullable NSDictionary *)extendedData roomID:(NSString *)roomID {
    // 根据需要实现事件回调
}

@end
```

<a id="publishingStream"></a>

### 推流


**1. 开始推流**

调用 [startPublishingStream ](https://doc-zh.zego.im/zh/api?doc=Express_Audio_SDK_API~ObjectiveC_ios~class~zego-express-engine#start-publishing-stream) 接口，传入流 ID 参数 “streamID”，向远端用户发送本端的音频流。

<Warning title="注意">


同一个 AppID 内，需保证 “streamID” 全局唯一。如果同一个 AppID 内，不同用户各推了一条 “streamID” 相同的流，会导致后推流的用户推流失败。

</Warning>



```objc
// 开始推流
[[ZegoExpressEngine sharedEngine] startPublishingStream:@"stream1"];
```

**2. 监听推流后的事件回调**

根据实际应用需要，在推流后监听想要关注的事件通知，比如推流状态更新等。

[onPublisherStateUpdate](https://doc-zh.zego.im/zh/api?doc=Express_Audio_SDK_API~ObjectiveC_ios~protocol~zego-event-handler#on-publisher-state-update-error-code-extended-data-stream-id)：推流状态更新回调。调用推流接口成功后，当推流状态发生变更（如出现网络中断导致推流异常等情况），SDK 在重试推流的同时，会通过该回调通知。


```objc
// 遵循 ZegoEventHandler 协议处理相关的事件回调
@interface ViewController () <ZegoEventHandler>
// ······
@end

@implementation ViewController

// 常用的推流相关回调

// 推流状态更新回调
- (void)onPublisherStateUpdate:(ZegoPublisherState)state errorCode:(int)errorCode extendedData:(nullable NSDictionary *)extendedData streamID:(NSString *)streamID {
    // 根据需要实现事件回调
}

@end
```

<Note title="说明">


如果您需要了解 Express 的麦克风/音频/扬声器相关接口，请参考 [常见问题 - 如何实现开关摄像头/视频画面/麦克风/音频/扬声器？](http://doc-zh.zego.im/faq/How_to_switch_devices)。


</Note>



<a id="PlayingStream"></a>

### 拉流

**1. 开始拉流**

调用 [startPlayingStream ](https://doc-zh.zego.im/zh/api?doc=Express_Audio_SDK_API~ObjectiveC_ios~class~zego-express-engine#start-playing-stream) 接口，根据传入的流 ID 参数 “streamID”，拉取远端推送的音频流。

远端用户推送的 “streamID” 可以从 [ZegoEventHandler](https://doc-zh.zego.im/zh/api?doc=Express_Audio_SDK_API~ObjectiveC~protocol~zego-event-handler) 中的 [onRoomStreamUpdate](https://doc-zh.zego.im/zh/api?doc=Express_Audio_SDK_API~ObjectiveC_ios~protocol~zego-event-handler#on-room-stream-update-stream-list-extended-data-room-id) 回调中获得。


```objc
// 开始拉流
[[ZegoExpressEngine sharedEngine] startPlayingStream:@"stream1"];
```


**2. 监听拉流后的事件回调**

根据实际应用需要，在拉流后监听想要关注的事件通知，比如拉流状态更新等。

[onPlayerStateUpdate](https://doc-zh.zego.im/zh/api?doc=Express_Audio_SDK_API~ObjectiveC_ios~protocol~zego-event-handler#on-player-state-update-error-code-extended-data-stream-id)：拉流状态更新回调。调用拉流接口成功后，当拉流状态发生变更（如出现网络中断导致推流异常等情况），SDK 在重试拉流的同时，会通过该回调通知。


```objc
// 遵循 ZegoEventHandler 协议处理相关的事件回调
@interface ViewController () <ZegoEventHandler>
// ······
@end

@implementation ViewController

// 常用的推流相关回调

// 拉流状态更新回调
- (void)onPlayerStateUpdate:(ZegoPlayerState)state errorCode:(int)errorCode extendedData:(NSDictionary *)extendedData streamID:(NSString *)streamID {
    // 根据需要实现事件回调
}

@end
```

### 体验实时音视频功能

在真机中运行项目，运行成功后，可以看到本端视频画面。

为方便体验，ZEGO 提供了一个 [Web 端调试示例 ](https://zegodev.github.io/zego-express-webrtc-sample/assistDev/index.html)，在该页面下，输入相同的 AppID、RoomID，输入不同的 UserID、以及对应的 [Token](/console/development-assistance/temporary-token)，即可加入同一房间与真机设备互通。当成功开始音视频通话时，可以听到远端的音频，看到远端的视频画面。



### 停止推拉流

**1. 停止推流**

调用 [stopPublishingStream ](https://doc-zh.zego.im/zh/api?doc=Express_Audio_SDK_API~ObjectiveC_ios~class~zego-express-engine#stop-publishing-stream) 接口停止向远端用户发送本端的音频流。

```objc
// 停止推流
[[ZegoExpressEngine sharedEngine] stopPublishingStream];
```

**2. 停止拉流**

调用 [stopPlayingStream ](https://doc-zh.zego.im/zh/api?doc=Express_Audio_SDK_API~ObjectiveC_ios~class~zego-express-engine#stop-playing-stream) 接口停止拉取远端推送的音频流。

<Warning title="注意">
如果开发者通过 [onRoomStreamUpdate](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~objective-c_macos~protocol~ZegoEventHandler#on-room-stream-update-stream-list-extended-data-room-id) 回调收到了音视频流 “减少” 的通知，请及时调用 [stopPlayingStream ](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~objective-c_macos~class~ZegoExpressEngine#stop-playing-stream) 接口停止拉流，避免拉到空流、产生额外的成本；或者，开发者可以根据自己的业务需求，选择合适的时机，主动调用 [stopPlayingStream ](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~objective-c_macos~class~ZegoExpressEngine#stop-playing-stream) 接口停止拉流。
</Warning>


```objc
// 停止拉流
[[ZegoExpressEngine sharedEngine] stopPlayingStream:@"stream1"];
```

### 退出房间

调用 [logoutRoom ](https://doc-zh.zego.im/zh/api?doc=Express_Audio_SDK_API~ObjectiveC_ios~class~zego-express-engine#logout-room) 接口退出房间。

```objc
// 退出房间
[[ZegoExpressEngine sharedEngine] logoutRoom:@"room1"];
```

### 销毁引擎

调用 [destroyEngine ](https://doc-zh.zego.im/zh/api?doc=Express_Audio_SDK_API~ObjectiveC_ios~class~zego-express-engine#destroy-engine) 接口销毁引擎，用于释放 SDK 使用的资源。


- 如果需要监听回调，来确保设备硬件资源释放完成，可在销毁引擎时传入 “callback”。该回调只用于发送通知，开发者不可以在回调内释放与引擎相关的资源。

- 如果不需要监听回调，可传入 “nil”。

```objc
[ZegoExpressEngine destroyEngine:nil];
```




<Content />
