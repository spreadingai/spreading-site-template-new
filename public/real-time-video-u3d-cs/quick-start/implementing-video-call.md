# 实现视频通话

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

在实现基本的实时音视频功能之前，请确保：

- 已在项目中集成 ZEGO Express SDK，实现基本的实时音视频功能，详情请参考 [快速开始 - 集成](https://doc-zh.zego.im/article/3234)。
- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppID 和 AppSign，详情请参考 [控制台 - 项目管理](/console/project-info) 中的“项目信息”。

<Warning title="注意">

SDK 同时也支持 Token 鉴权，若您对项目安全性有更高要求，建议您升级鉴权方式，详情请参考 [如何从 AppSign 鉴权升级为 Token 鉴权](http://doc-zh.zego.im/faq/token_upgrade?product=ExpressVideo)。
</Warning>

## 使用步骤

用户通过 ZEGO Express SDK 进行视频通话的基本流程为：

用户 A、B  加入房间，用户 B 预览并将音视频流推送到 ZEGO 云服务（推流），用户 A 收到用户 B 推送音视频流的通知之后，在通知中播放用户 B 的音视频流（拉流）。

<Frame width="512" height="auto" caption="">
  <img src="https://doc-media.zego.im/sdk-doc/Pics/Common/ZegoExpressEngine/common_usage_new.png" />
</Frame>

整个推拉流过程的 API 调用时序如下图：

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/QuickStart/quickstart_uml_video_u3d.png" /></Frame>

<a id="CreateEngine"> </a>

### 创建引擎

**1. 创建界面（可选）**

<Accordion title="添加界面元素" defaultOpen="false">
在开始之前，推荐开发者添加以下界面元素，方便实现基本的实时音视频功能。

- 本地预览窗口
- 远端视频窗口
- 结束按钮

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/QuickStart/UI_PC.jpg" /></Frame>
</Accordion>

**2. 创建引擎并监听回调**

调用 CreateEngine 接口，将申请到到 AppID 和 AppSign 传入参数 “appId” 和 “appSign”，创建引擎单例对象。


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

<a id="createroom"></a>

### 登录房间

**1. 登录**

创建 ZegoUser 用户对象，设置用户信息 “userID” 和 “userName” 后，调用 LoginRoom，传入房间 ID 参数 “roomId” 和用户参数 “user”，登录房间。如果房间不存在，调用该接口时会创建并登录此房间。

- 同一个 AppID 内，需保证 “roomId” 全局唯一。
- 同一个 AppID 内，需保证 “userId” 全局唯一，建议开发者将其设置成一个有意义的值，可将 “userId” 与自己业务账号系统进行关联。
- “userId” 不能为空，否则会导致登录房间失败。
- 在 WebGL 环境中运行时，仅支持 Token 鉴权，Token 不能为空，请参考 [使用 Token 鉴权](/real-time-video-u3d-cs/communication/using-token-authentication)。

```cs
// 创建用户
ZegoUser user = new ZegoUser();
user.userId="xxx";
user.userName="xxxx";
// 只有传入 “isUserStatusNotify” 参数取值为 “true” 的 ZegoRoomConfig，才能收到 onRoomUserUpdate 回调。
ZegoRoomConfig roomConfig = new ZegoRoomConfig();
// 如果您使用 AppSign 的方式鉴权，Token 参数不需填写（除 WebGL 平台外）；如果需要使用更加安全的 鉴权方式：Token 鉴权，请参考[如何从 AppSign 鉴权升级为 Token 鉴权](https://doc-zh.zego.im/faq/token_upgrade?product=ExpressVideo&platform=all)
// 在WebGL平台上，“token” 不能为空
roomConfig.token = "xxxx";
roomConfig.isUserStatusNotify = true;
// 登录房间
engine.LoginRoom("123666", user, roomConfig);
```

**2. 监听登录房间后的事件回调**


根据实际需要，在登录房间后监听想要关注的事件通知，比如房间状态更新、用户状态更新、流状态更新等。

- OnRoomStateUpdate：房间状态更新回调。登录房间后，当房间连接状态发生变更（如出现房间断开，登录认证失败等情况），SDK 会通过该回调通知。
- OnRoomUserUpdate：用户状态更新回调。登录房间后，当房间内有用户新增或删除时，SDK 会通过该回调通知。

    只有调用 loginRoom 接口登录房间时传入 ZegoRoomConfig 配置，且 “isUserStatusNotify” 参数取值为 “true” 时，用户才能收到 onRoomUserUpdate 回调。

- OnRoomStreamUpdate：流状态更新回调。登录房间后，当房间内有用户新推送或删除音视频流时，SDK 会通过该回调通知。

事件回调皆为 ZegoExpressEngine 的委托，开发者直接将自己实现的回调处理函数赋值给 ZegoExpressEngine 对应的委托，即可收到回调并进行处理。

<Warning title="注意">


- 只有调用 loginRoom 接口登录房间时传入 ZegoRoomConfig 配置，且 “isUserStatusNotify” 参数取值为 “true” 时，用户才能收到 onRoomUserUpdate 回调。
- 通常情况下，如果某个用户想要播放其他用户推送的视频，可以在收到流状态更新（新增）的回调中，调用 startPlayingStream 接口拉取远端推送的音视频流。

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

调用 StartPublishingStream 接口，传入流 ID 参数 “streamId”，向远端用户发送本端的音视频流。

<Warning title="注意">


同一个 AppID 内，需保证 “streamId” 全局唯一。如果同一个 AppID 内，不同用户各推了一条 “streamId” 相同的流，会导致后推流的用户推流失败。


</Warning>




```cs
// 开始推流
engine.StartPublishingStream("stream1");
```


**2. 启用本地预览（可选）**

<Accordion title="设置预览视图并启动本地预览" defaultOpen="false">
开发者如果希望看到自己本端的画面，可调用 StartPreview 接口启动本地预览。

由于 Android 设备和 iOS 设备的屏幕方向存在 Portrait、PortraitUpsideDown、LandscapeLeft、LandscapeRight 四种方向，为保证推流预览和拉流的显示界面始终在正确的方向，需要先添加推流预览和拉流的显示界面自适应横竖屏代码，请参考 [快速开始 - 集成](/real-time-video-u3d-cs/quick-start/integrating-sdk) 中的 “4 界面自适应”。

Unity 支持通过 RawImage 和 Renderer 两种渲染器进行预览。

- 方式一：RawImage

创建 RawImage。

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Unity3D/ZegoExpressEngine/QuickStart/create-raw-image.png" /></Frame>


预览显示到 RawImage 上。

```cs
RawImageVideoSurface localVideoSurface = null;
GameObject mainLocalVideoPlane = null;

mainLocalVideoPlane = GameObject.Find("MainPreViewRawImage");

if (mainLocalVideoPlane != null && localVideoSurface == null)
{
    // 添加一个 RawImageVideoSurface 组件，渲染器为 RawImage
    localVideoSurface = mainLocalVideoPlane.AddComponent<RawImageVideoSurface>();
    // 设置为本地预览画面
    localVideoSurface.SetCaptureVideoInfo();
    // 设置视频源为engine
    localVideoSurface.SetVideoSource(engine);
}

// 调用开始预览接口
engine.StartPreview();
```

- 方式二：Renderer

创建带 Renderer 的 Plane。

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Unity3D/ZegoExpressEngine/QuickStart/create-renderer.png" /></Frame>


预览到 Plane 的 Renderer 上。

```cs
GameObject go = GameObject.CreatePrimitive(PrimitiveType.Plane);//代码创建的Plane

if (go == null)
{
    return;
}
go.name = "preview-render";
// 保证画面能够在屏幕显示
go.transform.Rotate(90.0f, -180.0f, 0.0f);
go.transform.position = new Vector3(0.0f, 0.0f, 0.0f);
go.transform.localScale = new Vector3(0.36f, 1f, 0.64f);

// 添加一个 RendererVideoSurface 组件，渲染器为 Renderer
RendererVideoSurface renderer = go.AddComponent<RendererVideoSurface>();
// 设置为本地预览画面
renderer.SetCaptureVideoInfo();
// 设置视频源为engine
renderer.SetVideoSource(engine);

// 调用开始预览接口
engine.StartPreview();
```
</Accordion>


**3. 监听推流后的事件回调**


根据实际应用需要，在推流后监听想要关注的事件通知，比如推流状态更新、推流质量等。

- OnPublisherStateUpdate：推流状态更新回调。调用推流接口成功后，当推流状态发生变更（如出现网络中断导致推流异常等情况），SDK 在重试推流的同时，会通过该回调通知。
- OnPublisherQualityUpdate：推流质量回调。调用推流接口成功后，定时回调音视频流质量数据（如分辨率、帧率、码率等）。

事件回调皆为 ZegoExpressEngine 的委托，开发者直接将自己实现的回调处理函数赋值给 ZegoExpressEngine 对应的委托，即可收到回调并进行处理。

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

<Note title="说明">如果您需要了解 ZEGO Express SDK 的摄像头/视频/麦克风/音频/扬声器相关接口，请参考 [常见问题 - 如何实现开关摄像头/视频画面/麦克风/音频/扬声器？](http://doc-zh.zego.im/faq/How_to_switch_devices)。</Note>


<a id="PlayingStream"></a>

### 拉流

**1. 开始拉流**

调用 StartPlayingStream 接口，根据传入的流 ID 参数 “streamID”，拉取远端推送的音视频流。

<Note title="说明">



远端用户推送的 “streamID” 可以从 ZegoExpressEngine 委托中的 OnRoomStreamUpdate 回调中获得。

</Note>





由于 Android 设备和 iOS 设备的屏幕方向存在 Portrait、PortraitUpsideDown、LandscapeLeft、LandscapeRight 四种方向，为保证推流预览和拉流的显示界面始终在正确的方向，需要先添加推流预览和拉流的显示界面自适应横竖屏代码，请参考 [快速开始 - 集成](/real-time-video-u3d-cs/quick-start/integrating-sdk) 中的 “4 界面自适应”。

Unity3D 支持通过 RawImage 和 Renderer 两种渲染器进行拉流渲染。

- 方式一：RawImage

创建 RawImage。

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Unity3D/ZegoExpressEngine/QuickStart/create-raw-image.png" /></Frame>


预览显示到 RawImage 上。

```cs
private const float Offset = 100;

GameObject go = new GameObject();

if (go == null)
{
    return;
}

go.name = "play-rawimage";
// 动态创建RawImage
go.AddComponent<RawImage>();
GameObject canvas = GameObject.Find("Canvas");
if (canvas != null)
{
    go.transform.parent = canvas.transform;
}
float xPos = UnityEngine.Random.Range(Offset - Screen.width / 2f, Screen.width / 2f - Offset);
float yPos = UnityEngine.Random.Range(Offset, Screen.height / 2f - Offset);
go.transform.localPosition = new Vector3(xPos, yPos, 0f);
go.transform.localScale = new Vector3(3f, 4f, 1f);

// 添加一个 RawImageVideoSurface 组件，渲染器为 RawImage
RawImageVideoSurface videoSurface = go.AddComponent<RawImageVideoSurface>();
// 设置想要显示的视频流id
videoSurface.SetPlayVideoInfo("123");
// 设置视频源为engine
videoSurface.SetVideoSource(engine);

// 调用拉流接口
engine.StartPlayingStream("123");
```

- 方式二：Renderer

创建带 Renderer 的 Plane。

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Unity3D/ZegoExpressEngine/QuickStart/create-renderer.png" /></Frame>


预览到 Plane 的 Renderer 上。

```cs
remoteVideoPlane = GameObject.Find("PlayRender");
if (remoteVideoPlane != null)
{
    if (remoteVideoSurface == null)
    {
        // 添加一个 RendererVideoSurface 组件，渲染器为 Renderer
        remoteVideoSurface = remoteVideoPlane.AddComponent<RendererVideoSurface>();
        // 保证画面能够在屏幕显示
        remoteVideoSurface.transform.Rotate(90.0f, -180.0f, 0.0f);
        remoteVideoSurface.transform.position = new Vector3(0.0f, 0.0f, 0.0f);
        remoteVideoSurface.transform.localScale = new Vector3(0.36f, 1f, 0.64f);
    }
    if (remoteVideoSurface != null)
    {
        // 设置想要显示的视频流id
        remoteVideoSurface.SetPlayVideoInfo("123");
        // 设置视频源为 engine
        remoteVideoSurface.SetVideoSource(engine);
    }
}

// 调用拉流接口
engine.StartPlayingStream(“123”);
```



**2. 监听拉流后的事件回调**


根据实际应用需要，在拉流后监听想要关注的事件通知，比如拉流状态更新、拉流质量、流媒体事件等。

- OnPlayerStateUpdate：拉流状态更新回调。调用拉流接口成功后，当拉流状态发生变更（如出现网络中断导致推流异常等情况），SDK 在重试拉流的同时，会通过该回调通知。
- OnPlayerQualityUpdate：拉流质量回调。拉流成功后每 3 秒会收到此回调，通过该回调可以获取拉取的音视频流的帧率，码率，RTT，丢包率等质量数据，实时监控拉取流的健康情况。
- OnPlayerMediaEvent：流媒体事件回调。当拉流发生音视频卡顿以及恢复等事件发生时会触发此回调。

事件回调皆为 ZegoExpressEngine 的委托，开发者直接将自己实现的回调处理函数赋值给 ZegoExpressEngine 对应的委托，即可收到回调并进行处理。

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

// 流媒体事件回调；请注意，该回调在 WebGL 平台不支持
private void OnPlayerMediaEvent(string streamId, ZegoPlayerMediaEvent mediaEvent)
{
    // 根据需要实现事件回调
}

// 赋值给 ZegoExpressEngine 对应的事件委托
engine.onPlayerStateUpdate = OnPlayerStateUpdate;

// 请注意，onPlayerMediaEvent 事件回调在 WebGL 平台不支持
engine.onPlayerMediaEvent = OnPlayerMediaEvent;
engine.onPlayerQualityUpdate = OnPlayerQualityUpdate;
engine.StartPlayingStream("123");
```

### 在线测试推拉流功能

在真机中运行项目，运行成功后，可以看到本端视频画面。

为方便体验，ZEGO 提供了一个 [Web 端调试示例](https://zegodev.github.io/zego-express-webrtc-sample/assistDev/index.html)，在该页面下，输入相同的 AppID、RoomID，输入不同的 UserID、以及对应的 [Token](/console/development-assistance/temporary-token)，即可加入同一房间与真机设备互通。当成功开始音视频通话时，可以听到远端的音频，看到远端的视频画面。


<a id="StopPublishingStream"> </a>

### 停止推拉流

**1. 停止推流/预览**

调用 StopPublishingStream 接口停止向远端用户发送本端的音视频流。

```cs
// 停止推流
engine.StopPublishingStream();
```

如果启用了本地预览，调用 StopPreview 接口停止预览。

```cs
// 停止本地预览
engine.StopPreview();
```

**2. 停止拉流**

调用 StopPlayingStream 接口停止拉取远端推送的音视频流。

<Warning title="注意">


如果开发者通过 OnRoomStreamUpdate 回调收到了音视频流 “减少” 的通知，请及时调用 StopPlayingStream 接口停止拉流，避免拉到空流、产生额外的成本；或者，开发者可以根据自己的业务需求，选择合适的时机，主动调用 StopPlayingStream 接口停止拉流。

</Warning>



```csharp
// 停止拉流
engine.StopPlayingStream("123");
```


### 退出房间

调用 LogoutRoom 接口退出房间。

```cs
// 退出房间
engine.LogoutRoom("123666");
```

### 销毁引擎

调用 DestroyEngine 接口销毁引擎，用于释放 SDK 使用的资源。

```cs
// 销毁引擎实例
ZegoExpressEngine.DestroyEngine();
```
