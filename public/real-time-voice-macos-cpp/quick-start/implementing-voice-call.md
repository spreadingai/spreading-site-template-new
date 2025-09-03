# 实现音频通话

---


## 前提条件

在实现基本的实时语音功能之前，请确保：

- 已在项目中集成 ZEGO Express SDK，实现基本的实时音视频功能，详情请参考 [快速开始 - 集成](https://doc-zh.zego.im/article/16878)。
- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppID 和 AppSign，详情请参考 [控制台 - 项目管理](/console/project-info) 中的“项目信息”。

<Warning title="注意">


SDK 同时也支持 Token 鉴权，若您对项目安全性有更高要求，建议您升级鉴权方式，详情请参考 [如何从 AppSign 鉴权升级为 Token 鉴权](http://doc-zh.zego.im/faq/token_upgrade?product=ExpressVideo)。

</Warning>




## 使用步骤

本节介绍如何使用 ZEGO Express SDK 实现基本的实时语音功能，API 调用时序如下图：


<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/QuickStart/quickstart_uml_audio.png" /></Frame>

<a id="CreateEngine"> </a>

### 创建引擎

**1. 创建界面（可选）**

<Accordion title="添加界面元素" defaultOpen="false">
在开始之前，推荐开发者添加以下界面元素，方便实现基本的实时语音功能。

- 音频窗口
- 结束按钮

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/QuickStart/UI_Audio_PC.jpg" /></Frame>
</Accordion>

**2. 引入头文件**

在项目中引入 ZegoExpressEngine 头文件。

```cpp
#include "ZegoExpressSDK.h"
using namespace ZEGO::EXPRESS;
```

**3. 创建引擎**

调用 [createEngine ]() 接口，将申请到到 AppID 和 AppSign 传入参数 “appID” 和 “appSign”。

根据 App 实际的音视频业务选择一个合适的场景，请参考 [场景化音视频配置](https://doc-zh.zego.im/article/16509) 文档，把选择好的场景枚举传入参数 "scenario"。

<Warning title="注意">


SDK 同时也支持 Token 鉴权，若您需要升级鉴权方式，可参考 [如何从 AppSign 鉴权升级为 Token 鉴权](http://doc-zh.zego.im/faq/token_upgrade?product=ExpressVideo)。

</Warning>




```cpp
ZegoEngineProfile profile;
// AppID 和 AppSign 由 ZEGO 分配给各 App；其中，为了安全考虑，建议将 AppSign 存储在 App 的业务后台，需要使用时从后台获取
profile.appID = appID;
profile.appSign = appSign;
profile.scenario =ZegoScenario::ZEGO_SCENARIO_BROADCAST;
// 创建引擎实例
auto engine = ZegoExpressSDK::createEngine(profile, nullptr);

```


**4. 设置回调**

您可以通过实现 [IZegoEventHandler](https://doc-zh.zego.im/zh/api?doc=Express_Audio_SDK_API~CPP_windows~class~zego-express-i-zego-event-handler) 接口的类并实现需要的回调方法，以监听并处理所关注的事件回调，然后将实例化对象作为`eventHandler`参数传递给 [createEngine ](https://doc-zh.zego.im/zh/api?doc=Express_Audio_SDK_API~CPP~class~zego-express-zego-express-sdk#includes) 方法或者传递给  [setEventHandler](https://doc-zh.zego.im/zh/api?doc=Express_Audio_SDK_API~CPP_windows~class~zego-express-i-zego-audio-effect-player#set-event-handler) 注册回调。

<Warning title="注意">


 建议在创建引擎时或创建引擎后就立即注册回调，避免延后注册错过事件通知。

</Warning>



<a id="createroom"></a>

### 登录房间

**1. 登录**

传入用户 ID 参数 “userID” 和 “userName” 创建 ZegoUser 用户对象后，调用 [loginRoom](https://doc-zh.zego.im/zh/api?doc=Express_Audio_SDK_API~CPP~class~zego-express-i-zego-express-engine#login-room)，传入房间 ID 参数 “roomID” 和用户参数 “user”，登录房间。如果房间不存在，调用该接口时会创建并登录此房间。

- 同一个 AppID 内，需保证 “roomID” 全局唯一。
- 同一个 AppID 内，需保证 “userID” 全局唯一，建议开发者将其设置成一个有意义的值，可将 “userID” 与自己业务账号系统进行关联。
- “userID” 不能为空，否则会导致登录房间失败。


```cpp
// 创建用户对象
ZegoUser user("user1", "user1");
// 只有传入 “isUserStatusNotify” 参数取值为 “true” 的 ZegoRoomConfig，才能收到 onRoomUserUpdate 回调。
ZegoRoomConfig roomConfig;
//如果您使用 appsign 的方式鉴权，token 参数不需填写；如果需要使用更加安全的 鉴权方式： token 鉴权，请参考[如何从 AppSign 鉴权升级为 Token 鉴权](https://doc-zh.zego.im/faq/token_upgrade?product=ExpressVideo&platform=all)
// roomConfig.token = "xxxx";
roomConfig.isUserStatusNotify = true;
// 登录房间
engine->loginRoom(roomID, user, roomConfig, [=](){
    // 登录房间结果，如果仅关注登录结果，关注此回调即可
});
```

**2. 监听登录房间后的事件回调**

根据实际需要，在登录房间后监听想要关注的事件通知，比如房间状态更新、用户状态更新、流状态更新等。
- [onRoomStateChanged](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cpp_macos~class~IZegoEventHandler#on-room-state-changed)：房间状态更新回调。登录房间后，当房间连接状态发生变更（如出现房间断开，登录认证失败等情况），SDK 会通过该回调通知。
- [onRoomUserUpdate](https://doc-zh.zego.im/zh/api?doc=Express_Audio_SDK_API~CPP_windows~class~zego-express-i-zego-event-handler#on-room-user-update)：用户状态更新回调。登录房间后，当房间内有用户新增或删除时，SDK 会通过该回调通知。

    只有调用 [loginRoom](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cpp_macos~class~IZegoExpressEngine#login-room) 接口登录房间时传入 [ZegoRoomConfig](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cpp_macos~struct~ZegoRoomConfig) 配置，且 “isUserStatusNotify” 参数取值为 “true” 时，用户才能收到 [onRoomUserUpdate](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cpp_macos~class~IZegoEventHandler#on-room-user-update) 回调。

- [onRoomStreamUpdate](https://doc-zh.zego.im/zh/api?doc=Express_Audio_SDK_API~CPP_windows~class~zego-express-i-zego-event-handler#on-room-stream-update)：流状态更新回调。登录房间后，当房间内有用户新推送或删除音频流时，SDK 会通过该回调通知。

<Warning title="注意">


- 只有调用 [loginRoom](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cpp_macos~class~IZegoExpressEngine#login-room) 接口登录房间时传入 [ZegoRoomConfig](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cpp_macos~struct~ZegoRoomConfig) 配置，且 “isUserStatusNotify” 参数取值为 “true” 时，用户才能收到 [onRoomUserUpdate](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cpp_macos~class~IZegoEventHandler#on-room-user-update) 回调。
- 通常情况下，如果某个用户想要播放其他用户推送的视频，可以在收到流状态更新（新增）的回调中，调用 [startPlayingStream](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cpp_macos~class~IZegoExpressEngine#start-playing-stream) 接口拉取远端推送的音视频流。

</Warning>



```cpp
// 房间状态更新回调
void onRoomStateChanged(const std::string &roomID, ZegoRoomStateChangedReason reason, int errorCode, const std::string &extendedData) {
    if(reason == ZEGO_ROOM_STATE_CHANGED_REASON_LOGINING)
    {
        // 登录中
    }
    else if(reason == ZEGO_ROOM_STATE_CHANGED_REASON_LOGINED)
    {
        // 登录成功
        //只有当房间状态是登录成功或重连成功时，推流（startPublishingStream）、拉流（startPlayingStream）才能正常收发音视频
        //将自己的音视频流推送到 ZEGO 音视频云
    }
    else if(reason == ZEGO_ROOM_STATE_CHANGED_REASON_LOGIN_FAILED)
    {
        // 登录失败
    }
    else if(reason == ZEGO_ROOM_STATE_CHANGED_REASON_RECONNECTING)
    {
        // 重连中
    }
    else if(reason == ZEGO_ROOM_STATE_CHANGED_REASON_RECONNECTED)
    {
        // 重连成功
    }
    else if(reason == ZEGO_ROOM_STATE_CHANGED_REASON_RECONNECT_FAILED)
    {
        // 重连失败
    }
    else if(reason == ZEGO_ROOM_STATE_CHANGED_REASON_KICK_OUT)
    {
        // 被踢出房间
    }
    else if(reason == ZEGO_ROOM_STATE_CHANGED_REASON_LOGOUT)
    {
        // 登出成功
    }
    else if(reason == ZEGO_ROOM_STATE_CHANGED_REASON_LOGOUT_FAILED)
    {
        // 登出失败
    }
}

// 用户状态更新回调
void onRoomUserUpdate(const std::string& roomID, ZegoUpdateType updateType, const std::vector<ZegoUser>& userList) override {
    // 根据需要实现事件回调
}

// 流状态更新回调
void onRoomStreamUpdate(const std::string& roomID, ZegoUpdateType updateType, const std::vector<ZegoStream>& streamList, const std::string& extendedData) override {
    // 根据需要实现事件回调
}
```

<a id="publishingStream"></a>

### 推流

**1. 开始推流**

调用 [startPublishingStream](https://doc-zh.zego.im/zh/api?doc=Express_Audio_SDK_API~CPP~class~zego-express-i-zego-express-engine#start-publishing-stream)，传入流 ID 参数“streamID”，向远端用户发送本端的音频流。

<Warning title="注意">


同一个 AppID 内，需保证 “streamID” 全局唯一。如果同一个 AppID 内，不同用户各推了一条 “streamID” 相同的流，会导致后推流的用户推流失败。


</Warning>



```cpp
// 开始推流
engine->startPublishingStream("streamID");
```

**2. 监听推流后的事件回调**

根据实际应用需要，在推流后监听想要关注的事件通知，比如推流状态更新等。

[onPublisherStateUpdate](https://doc-zh.zego.im/zh/api?doc=Express_Audio_SDK_API~CPP_windows~class~zego-express-i-zego-event-handler#on-publisher-state-update)：推流状态更新回调。调用推流接口成功后，当推流状态发生变更（如出现网络中断导致推流异常等情况），SDK 在重试推流的同时，会通过该回调通知。


```cpp
// 推流状态更新回调
virtual void onPublisherStateUpdate(const std::string& streamID, ZegoPublisherState state, int errorCode, const std::string& extendedData) {
    // 根据需要实现事件回调

}
```

<Note title="说明">


如果您需要了解 Express 的麦克风/音频/扬声器相关接口，请参考 [常见问题 - 如何实现开关摄像头/视频画面/麦克风/音频/扬声器？](http://doc-zh.zego.im/faq/How_to_switch_devices)。


</Note>



<a id="PlayingStream"></a>

### 拉流

**1. 开始拉流**

调用 [startPlayingStream](https://doc-zh.zego.im/zh/api?doc=Express_Audio_SDK_API~CPP~class~zego-express-i-zego-express-engine#start-playing-stream) 接口，根据传入的流 ID 参数 “streamID”，拉取远端推送的音频流。

远端用户推送的 “streamID” 可以从 [ZegoEventHandler](https://doc-zh.zego.im/zh/api?doc=Express_Audio_SDK_API~CPP_windows~class~zego-express-i-zego-event-handler) 中的 [onRoomStreamUpdate](https://doc-zh.zego.im/zh/api?doc=Express_Audio_SDK_API~CPP_windows~class~zego-express-i-zego-event-handler#on-room-stream-update) 回调中获得。


```cpp
// 开始拉流
engine->startPlayingStream("streamID");
```

**2. 监听拉流后的事件回调**

根据实际应用需要，在拉流后监听想要关注的事件通知，比如拉流状态更新等。

[onPlayerStateUpdate](https://doc-zh.zego.im/zh/api?doc=Express_Audio_SDK_API~CPP_windows~class~zego-express-i-zego-event-handler#on-player-state-update)：拉流状态更新回调。调用拉流接口成功后，当拉流状态发生变更（如出现网络中断导致推流异常等情况），SDK 在重试拉流的同时，会通过该回调通知。

```cpp
// 拉流状态变更回调
virtual void onPlayerStateUpdate(const std::string& streamID, ZegoPlayerState state, int errorCode, const std::string& extendedData) {
    // 根据需要实现事件回调
}
```

### 体验实时音视频功能

在真机中运行项目，运行成功后，可以看到本端视频画面。

为方便体验，ZEGO 提供了一个 [Web 端调试示例 ](https://zegodev.github.io/zego-express-webrtc-sample/assistDev/index.html)，在该页面下，输入相同的 AppID、RoomID，输入不同的 UserID、以及对应的 [Token](/console/development-assistance/temporary-token)，即可加入同一房间与真机设备互通。当成功开始音视频通话时，可以听到远端的音频，看到远端的视频画面。

### 停止推拉流

**1. 停止推流**

调用 [stopPublishingStream ](https://doc-zh.zego.im/zh/api?doc=Express_Audio_SDK_API~CPP~class~zego-express-i-zego-express-engine#stop-publishing-stream) 停止向远端用户发送本端的音频流。

```cpp
// 停止推流
engine->stopPublishingStream();
```

**2. 停止拉流**

调用 [stopPlayingStream ](https://doc-zh.zego.im/zh/api?doc=Express_Audio_SDK_API~CPP~class~zego-express-i-zego-express-engine#stop-playing-stream) 停止拉取远端推送的音频流。

<Warning title="注意">


如果开发者通过 [onRoomStreamUpdate](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cpp_macos~class~IZegoEventHandler#on-room-stream-update) 回调收到了音视频流 “减少” 的通知，请及时调用 [stopPlayingStream ](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cpp_macos~class~IZegoExpressEngine#stop-playing-stream) 接口停止拉流，避免拉到空流、产生额外的成本；或者，开发者可以根据自己的业务需求，选择合适的时机，主动调用 [stopPlayingStream ](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cpp_macos~class~IZegoExpressEngine#stop-playing-stream) 接口停止拉流。

</Warning>



```cpp
// 停止拉流
engine->stopPlayingStream("streamID");
```


### 退出房间

调用 [logoutRoom ](https://doc-zh.zego.im/zh/api?doc=Express_Audio_SDK_API~CPP~class~zego-express-i-zego-express-engine#logout-room) 接口退出房间。

```cpp
// 退出房间
engine->logoutRoom("roomID");
```

### 销毁引擎

调用 [destoryEngine ](https://doc-zh.zego.im/zh/api?doc=Express_Audio_SDK_API~CPP~class~zego-express-zego-express-sdk#destroy-engine) 接口销毁引擎，用于释放 SDK 使用的资源。


- 如果需要监听回调，来确保设备硬件资源释放完成，可在销毁引擎时传入 “callback”。该回调只用于发送通知，开发者不可以在回调内释放与引擎相关的资源。

- 如果不需要监听回调，可传入 “nullptr”。


```cpp
// 销毁引擎实例
ZegoExpressSDK::destroyEngine(engine, nullptr);
```

<Content />

