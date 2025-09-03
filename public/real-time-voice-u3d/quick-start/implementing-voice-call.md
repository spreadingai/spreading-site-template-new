# 实现音频通话

---


## 功能简介

本文将介绍如何快速实现一个简单的实时音视频通话。

相关概念解释:

- ZEGO Express SDK：由 ZEGO 提供的实时音视频 SDK，能够为开发者提供便捷接入、高清流畅、多平台互通、低延迟、高并发的音视频服务。
- 流：指一组按指定编码格式封装，不断发送中的音视频数据。一个用户可以同时推多条流（例如一条推摄像头数据，一条推屏幕共享数据）也可以同时拉多条流。每条流都由一个流 ID（streamID）标识。
- 推流：把封包好的音视频数据流推送到 ZEGO 实时音视频云的过程。
- 拉流：从 ZEGO 实时音视频云将已有音视频数据流拉取播放的过程。
- 房间：是 ZEGO 提供的音视频空间服务，用于组织用户群，同一房间内的用户可以互相收发实时音视频及消息。
    1. 用户需要先登录某个房间，才能进行推流、拉流操作。
    2. 用户只能收到自己所在房间内的相关消息（用户进出、音视频流变化等）。
    3. 每个房间由一个 ApplD 内唯一的 roomlD 标识。所有使用同一个 roomID 登录房间的用户即属于同房间。



更多相关概念请参考 [术语说明](/glossary/term-explanation)。

## 前提条件

在实现基本的音频通话之前，请确保：

- 已在项目中集成 ZEGO Express SDK，实现基本的实时音视频功能，详情请参考 [快速开始 - 集成](https://doc-zh.zego.im/article/13242)。
- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppID 和 AppSign，详情请参考 [控制台 - 项目管理](/console/project-info) 中的“项目信息”。

<Warning title="注意">


SDK 同时也支持 Token 鉴权，若您对项目安全性有更高要求，建议您升级鉴权方式，详情请参考 [如何从 AppSign 鉴权升级为 Token 鉴权](http://doc-zh.zego.im/faq/token_upgrade?product=ExpressVideo)。

</Warning>




## 使用步骤

以用户 A 拉取用户 B 的流为例，流程如下图：

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Common/ZegoExpressEngine/common_usage_new.png" /></Frame>

整个推拉流过程的 API 调用时序如下图：

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/QuickStart/quickstart_uml_audio_u3d.png" /></Frame>

<a id="CreateEngine"></a>

### 创建引擎

**1. 创建引擎并监听回调**

调用 [CreateEngine](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~ZegoExpressEngine#create-engine) 接口，将申请到到 AppID 和 AppSign 传入参数 “appId” 和 “appSign”，创建引擎单例对象。

开发者可以根据需要选择使用匿名函数来实现回调函数，并赋值给引擎实例对应的回调委托注册回调。

<Warning title="注意">


为避免错过任何通知，建议在创建引擎后立即监听回调

</Warning>



```cs
// 定义 SDK 引擎对象
ZegoExpressEngine engine;

ZegoEngineProfile profile = new ZegoEngineProfile();
profile.appID = appID; // 请通过官网注册获取，格式为 123456789
profile.appSign = appSign; // 请通过官网注册获取，格式为"0123456789012345678901234567890123456789012345678901234567890123"，64个字符
profile.scenario = ZegoScenario.HighQualityVideoCall; // 高品质音视频通话场景接入（请根据实际情况选择合适的场景）
// 初始化SDK
engine = ZegoExpressEngine.CreateEngine(profile);

// 设置 SDK 回调委托
engine.OnRoomStateUpdate = (roomID, state, errorCode, extendedData) => {

};
```

**2. 关闭摄像头**

<Warning title="注意">


Express Unity SDK 不提供裁剪了视频模块的纯音频包，因此 Unity “实时语音” SDK 实际上是 “实时音视频” SDK。


</Warning>



若要实现纯音频场景，请在创建引擎后调用 [EnableCamera](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~ZegoExpressEngine#enable-camera) 关闭摄像头，以避免启动引擎的视频模块。摄像头关闭后，将不需要再申请摄像头权限，并且不会推视频流。

```cs
engine.EnableCamera(false); // 关闭摄像头
```

更多信息请参考文档 [实时音视频 SDK 与实时语音 SDK 的差异](https://doc-zh.zego.im/article/15809)。

若您对 Express Unity SDK 包体大小有较高要求，可联系技术支持进行定制裁包，关于 SDK 包大小数据请参考 [概述](https://doc-zh.zego.im/article/5625) 文档。





<a id="LoginRoom"></a>
### 登录房间

**1. 登录**

创建 ZegoUser 用户对象，设置用户信息 “userID” 和 “userName” 后，调用 [LoginRoom](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~ZegoExpressEngine#login-room)，传入房间 ID 参数 “roomId” 和用户参数 “user”，登录房间。如果房间不存在，调用该接口时会创建并登录此房间。

- 同一个 AppID 内，需保证 “roomId” 全局唯一。
- 同一个 AppID 内，需保证 “userId” 全局唯一，建议开发者将其设置成一个有意义的值，可将 “userId” 与自己业务账号系统进行关联。
- “userId” 不能为空，否则会导致登录房间失败。

```cs
// 创建用户
ZegoUser user = new ZegoUser();
user.userId="xxx";
user.userName="xxxx";
// 只有传入 “isUserStatusNotify” 参数取值为 “true” 的 ZegoRoomConfig，才能收到 onRoomUserUpdate 回调。
ZegoRoomConfig roomConfig = new ZegoRoomConfig();
// 如果您使用 appsign 的方式鉴权，token 参数不需填写；如果需要使用更加安全的 鉴权方式： token 鉴权，请参考[如何从 AppSign 鉴权升级为 Token 鉴权](https://doc-zh.zego.im/faq/token_upgrade?product=ExpressVideo&platform=all)
// roomConfig.token = "xxxx";
roomConfig.isUserStatusNotify = true;
// 登录房间
engine.LoginRoom("123666", user, roomConfig);
```

**2. 监听登录房间后的事件回调**


根据实际需要，在登录房间后监听想要关注的事件通知，比如房间状态更新、用户状态更新、流状态更新等。

- [OnRoomStateUpdate](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~IZegoEventHandler#on-room-state-update)：房间状态更新回调。登录房间后，当房间连接状态发生变更（如出现房间断开，登录认证失败等情况），SDK 会通过该回调通知。
- [OnRoomUserUpdate](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~IZegoEventHandler#on-room-user-update)：用户状态更新回调。登录房间后，当房间内有用户新增或删除时，SDK 会通过该回调通知。

    只有调用 [LoginRoom](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~ZegoExpressEngine#login-room) 接口登录房间时传入 [ZegoRoomConfig](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~struct~ZegoRoomConfig) 配置，且 “isUserStatusNotify” 参数取值为 “true” 时，用户才能收到 [onRoomUserUpdate](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~IZegoEventHandler#on-room-user-update) 回调。

- [OnRoomStreamUpdate](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~IZegoEventHandler#on-room-stream-update)：流状态更新回调。登录房间后，当房间内有用户新推送或删除音视频流时，SDK 会通过该回调通知。

事件回调皆为 [ZegoExpressEngine](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~ZegoExpressEngine) 的委托，开发者直接将自己实现的回调处理函数赋值给 [ZegoExpressEngine](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~ZegoExpressEngine) 对应的委托，即可收到回调并进行处理。

<Warning title="注意">


- 只有调用 [LoginRoom](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~ZegoExpressEngine#login-room) 接口登录房间时传入 [ZegoRoomConfig](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~struct~ZegoRoomConfig) 配置，且 “isUserStatusNotify” 参数取值为 “true” 时，用户才能收到 [OnRoomUserUpdate](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~IZegoEventHandler#on-room-user-update) 回调。

- 通常情况下，如果某个用户想要播放其他用户推送的视频，可以在收到流状态更新（新增）的回调中，调用 [StartPlayingStream](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~ZegoExpressEngine#start-playing-stream) 接口拉取远端推送的音视频流。


</Warning>



```cs
// 房间状态更新回调
public void OnRoomStateUpdate(string roomId, ZegoRoomState state, int errorCode, string extendedData) {
    // 根据需要实现事件回调
}

// 用户状态更新回调
private void OnRoomUserUpdate(string roomId, ZegoUpdateType updateType, List<ZegoUser> userList, uint userCount) {
    // 根据需要实现事件回调
}

// 流状态更新回调
private void OnRoomStreamUpdate(string roomId, ZegoUpdateType updateType, List<ZegoStream> streamInfoList, uint streamInfoCount) {
    // 根据需要实现事件回调
}

// 赋值给 ZegoExpressEngine 对应的事件委托
engine.onRoomStateUpdate = OnRoomStateUpdate;
engine.onRoomUserUpdate = OnRoomUserUpdate;
engine.onRoomStreamUpdate = OnRoomStreamUpdate;
```

<a id="publishingStream"></a>

### 推流

**1. 开始推流**

调用 [StartPublishingStream](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~ZegoExpressEngine#start-publishing-stream) 接口，传入流 ID 参数 “streamId”，向远端用户发送本端的音视频流。

<Warning title="注意">


同一个 AppID 内，需保证 “streamId” 全局唯一。如果同一个 AppID 内，不同用户各推了一条 “streamId” 相同的流，会导致后推流的用户推流失败。


</Warning>



```cs
// 开始推流
engine.StartPublishingStream("stream1");
```

**3. 监听推流后的事件回调**

根据实际应用需要，在推流后监听想要关注的事件通知，比如推流状态更新、推流质量等。

- [OnPublisherStateUpdate](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~IZegoEventHandler#on-publisher-state-update)：推流状态更新回调。调用推流接口成功后，当推流状态发生变更（如出现网络中断导致推流异常等情况），SDK 在重试推流的同时，会通过该回调通知。
- [OnPublisherQualityUpdate](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~IZegoEventHandler#on-publisher-quality-update)：推流质量回调。调用推流接口成功后，定时回调音视频流质量数据（如分辨率、帧率、码率等）。

事件回调皆为 [ZegoExpressEngine](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~ZegoExpressEngine) 的委托，开发者直接将自己实现的回调处理函数赋值给 [ZegoExpressEngine](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~ZegoExpressEngine) 对应的委托，即可收到回调并进行处理。

```cs
// 推流状态更新回调
public void OnPublisherStateUpdate(string streamId, ZegoPublisherState state, int errorCode, string extendedData)
{
    // 根据需要实现事件回调
}

// 推流质量回调
private void OnPublisherQualityUpdate(string streamId, ZegoPublishStreamQuality quality)
{
    // 根据需要实现事件回调
}


// 赋值给 ZegoExpressEngine 对应的事件委托
engine.onPublisherStateUpdate = OnPublisherStateUpdate;
engine.onPublisherQualityUpdate = OnPublisherQualityUpdate;
engine.StartPublishingStream("stream1");
```

<Note title="说明">
如果您需要了解 Express 的麦克风/音频/扬声器相关接口，请参考 [常见问题 - 如何实现开关摄像头/视频画面/麦克风/音频/扬声器？](http://doc-zh.zego.im/faq/How_to_switch_devices)。
</Note>

### 拉流

**1. 开始拉流**

调用 [StartPlayingStream](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~ZegoExpressEngine#start-playing-stream) 接口，根据传入的流 ID 参数 “streamID”，拉取远端推送的音视频流。

<Note title="说明">


远端用户推送的 “streamID” 可以从 [ZegoExpressEngine](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~ZegoExpressEngine) 委托中的 [OnRoomStreamUpdate](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~IZegoEventHandler#on-room-stream-update) 回调中获得。

</Note>



```cs
// 调用拉流接口
engine.StartPlayingStream(“123”);
```


**2. 监听拉流后的事件回调**

根据实际应用需要，在拉流后监听想要关注的事件通知，比如拉流状态更新、拉流质量、流媒体事件等。

- [OnPlayerStateUpdate](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~IZegoEventHandler#on-player-state-update)：拉流状态更新回调。调用拉流接口成功后，当拉流状态发生变更（如出现网络中断导致推流异常等情况），SDK 在重试拉流的同时，会通过该回调通知。
- [OnPlayerQualityUpdate](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~IZegoEventHandler#on-player-quality-update)：拉流质量回调。拉流成功后每 3 秒会收到此回调，通过该回调可以获取拉取的音视频流的帧率，码率，RTT，丢包率等质量数据，实时监控拉取流的健康情况。
- [OnPlayerMediaEvent](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~IZegoEventHandler#on-player-media-event)：流媒体事件回调。当拉流发生音视频卡顿以及恢复等事件发生时会触发此回调。

事件回调皆为 [ZegoExpressEngine](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~ZegoExpressEngine) 的委托，开发者直接将自己实现的回调处理函数赋值给 [ZegoExpressEngine](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~ZegoExpressEngine) 对应的委托，即可收到回调并进行处理。

```cs
// 拉流状态更新回调
public void OnPlayerStateUpdate(string streamId, ZegoPlayerState state, int errorCode, string extendedData)
{
    // 根据需要实现事件回调
}

// 拉流质量回调
private void OnPlayerQualityUpdate(string streamId, ZegoPlayStreamQuality quality)
{
    // 根据需要实现事件回调
}

// 流媒体事件回调
private void OnPlayerMediaEvent(string streamId, ZegoPlayerMediaEvent mediaEvent)
{
    // 根据需要实现事件回调
}


// 赋值给 ZegoExpressEngine 对应的事件委托
engine.onPlayerStateUpdate = OnPlayerStateUpdate;
engine.onPlayerMediaEvent = OnPlayerMediaEvent;
engine.onPlayerQualityUpdate = OnPlayerQualityUpdate;
engine.StartPlayingStream("123");
```

### 体验实时音视频功能

在真机中运行项目，运行成功后，可以看到本端视频画面。

为方便体验，ZEGO 提供了一个 [Web 端调试示例 ](https://zegodev.github.io/zego-express-webrtc-sample/assistDev/index.html)，在该页面下，输入相同的 AppID、RoomID，输入不同的 UserID、以及对应的 [Token](/console/development-assistance/temporary-token)，即可加入同一房间与真机设备互通。当成功开始音视频通话时，可以听到远端的音频，看到远端的视频画面。


<a id="StopPublishingStream"></a>

### 停止推拉流

**1. 停止推流**

调用 [StopPublishingStream](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~ZegoExpressEngine#stop-publishing-stream) 接口停止向远端用户发送本端的音视频流。

```cs
// 停止推流
engine.StopPublishingStream();
```

**2. 停止拉流**

调用 [StopPlayingStream](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~ZegoExpressEngine#stop-playing-stream) 接口停止拉取远端推送的音视频流。

<Warning title="注意">


如果开发者通过 [OnRoomStreamUpdate](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~IZegoEventHandler#on-room-stream-update) 回调收到了音视频流 “减少” 的通知，请及时调用 [StopPlayingStream ](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~ZegoExpressEngine#stop-playing-stream) 接口停止拉流，避免拉到空流、产生额外的成本；或者，开发者可以根据自己的业务需求，选择合适的时机，主动调用 [StopPlayingStream ](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~ZegoExpressEngine#stop-playing-stream) 接口停止拉流。

</Warning>



```Cs
// 停止拉流
engine.StopPlayingStream("123");
```

### 退出房间

调用 [LogoutRoom](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~ZegoExpressEngine#logout-room) 接口退出房间。

```cs
// 退出房间
engine.LogoutRoom("123666");
```

### 销毁引擎

调用 [DestroyEngine](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~ZegoExpressEngine#destroy-engine) 接口销毁引擎，用于释放 SDK 使用的资源。

```cs
// 销毁引擎实例
ZegoExpressEngine.DestroyEngine();
```
