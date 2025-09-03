# 快速实现超低延迟直播

---


本文将介绍如何通过超低延迟直播功能，快速实现一个简单的视频直播。


## 简介

相关概念解释:

- ZEGO Express SDK：由 ZEGO 提供的实时音视频和直播 SDK，能够为开发者提供便捷接入、高清流畅、多平台互通、低延迟、高并发的音视频服务。
- 流：指一组按指定编码格式封装，不断发送中的音视频数据。一个用户可以同时推多条流（例如一条推摄像头数据，一条推屏幕共享数据）也可以同时拉多条流。每条流都由一个流 ID（streamID）标识。
- 推流：把采集阶段封包好的音视频数据流推送到 ZEGO 实时音视频云的过程。
- 拉流：从 ZEGO MSDN 网络将已有音视频数据流拉取播放的过程。
- 房间：是 ZEGO 提供的音视频空间服务，用于组织用户群，同一房间内的用户可以互相收发实时音视频及消息。
    - 用户需要先登录某个房间，才能进行推流、拉流操作。
    - 用户只能收到自己所在房间内的相关消息（用户进出、音视频流变化等）。
    - 每个房间由一个 ApplD 内唯一的 roomlD 标识。所有使用同一个 roomID 登录房间的用户即属于同房间。


更多相关概念请参考 [术语说明](/glossary/term-explanation)。


## 前提条件

在实现基本的超低延迟直播功能之前，请确保：

- 已在项目中集成 ZEGO Express SDK，详情请参考 [快速开始 - 集成](https://doc-zh.zego.im/article/21098)。
- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppID，详情请参考 [控制台 - 项目管理](/console/project-info) 中的“项目信息”。


## 实现流程

用户通过 ZEGO Express SDK 进行视频直播的基本流程为：

用户 A、B  加入房间，用户 B 预览并将音视频流推送到 ZEGO 云服务（推流），用户 A 收到用户 B 推送音视频流的通知之后，在通知中播放用户 B 的音视频流（拉流）。


<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Common/ZegoExpressEngine/common_usage_new.png" /></Frame>

### 开通服务

超低延迟直播功能不是默认开启的，使用前请在 [ZEGO 控制台](https://console.zego.im) 自助开通（开通步骤请参考 [项目管理 - 服务配置](/console/service-configuration/l3) 中的“超低延迟直播”），或联系 ZEGO 技术支持开通。

<a id="CreateEngine"></a>

### 初始化

**1. 创建界面（可选）**

<Accordion title="添加界面元素" defaultOpen="false">
在开始之前，推荐开发者添加以下界面元素，方便实现基本的实时音视频功能。

- 本地预览窗口
- 远端视频窗口
- 结束按钮

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/QuickStart/UI_PC.jpg" /></Frame>
</Accordion>

**2. 创建引擎**

调用 [CreateEngine](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoExpressEngine#create-engine) 接口，将申请到到 AppID 和 AppSign 传入参数 “appId” 和 “appSign”，创建引擎单例对象。

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


<Accordion title="常见通知回调" defaultOpen="false">
**1. 我在房间内的连接状态变化通知**

[OnRoomStateChanged](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~IZegoEventHandler#on-room-state-changed)：本地调用 [LoginRoom](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoExpressEngine#login-room) 加入房间时，您可通过监听 [OnRoomStateChanged](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~IZegoEventHandler#on-room-state-changed) 回调实时监控自己在本房间内的连接状态。

您可以在回调中根据不同状态处理业务逻辑。

```cs
void OnRoomStateChanged(string roomID, ZegoRoomStateChangedReason reason, int errorCode, string extendedData) {
}

// 赋值给 ZegoExpressEngine 对应的事件委托
engine.onRoomStateChanged = OnRoomStateChanged;
```

ZegoRoomStateChangedReason 状态含义如下，更多信息请参考 [房间状态管理 ](/live-streaming-android/room/room-connection-status)：

<table>
  <colgroup>
    <col width="30%"/>
    <col width="20%"/>
    <col width="50%"/>
  </colgroup>
  <tbody><tr>
    <th>状态</th>
    <th>枚举值</th>
    <th>含义</th>
  </tr>
  <tr>
    <td>ZegoRoomStateChangedReason.LOGINING</td>
    <td>0</td>
    <td>正在登录房间。当调用 [loginRoom] 登录房间或 [switchRoom] 切换到目标房间时，进入该状态，表示正在请求连接服务器。通常通过该状态进行应用界面的展示。</td>
  </tr>
  <tr>
    <td>ZegoRoomStateChangedReason.LOGINED</td>
    <td>1</td>
    <td>登录房间成功。当登录房间或切换房间成功后，进入该状态，表示登录房间已经成功，用户可以正常收到房间内的其他用户和所有流信息增删的回调通知。</td>
  </tr>
  <tr>
    <td>ZegoRoomStateChangedReason.LOGIN_FAILED</td>
    <td>2</td>
    <td>登录房间失败。当登录房间或切换房间失败后，进入该状态，表示登录房间或切换房间已经失败，比如 AppID、AppSign 或 Token 不正确等。</td>
  </tr>
  <tr>
    <td>ZegoRoomStateChangedReason.RECONNECTING</td>
    <td>3</td>
    <td>房间连接临时中断。如果因为网络质量不佳产生的中断，SDK 会进行内部重试。</td>
  </tr>
  <tr>
    <td>ZegoRoomStateChangedReason.RECONNECTED</td>
    <td>4</td>
    <td>房间重新连接成功。如果因为网络质量不佳产生的中断，SDK 会进行内部重试，重连成功后进入该状态。</td>
  </tr>
  <tr>
    <td>ZegoRoomStateChangedReason.RECONNECT_FAILED</td>
    <td>5</td>
    <td>房间重新连接失败。如果因为网络质量不佳产生的中断，SDK 会进行内部重试，重连失败后进入该状态。</td>
  </tr>
  <tr>
    <td>ZegoRoomStateChangedReason.KICK_OUT</td>
    <td>6</td>
    <td>被服务器踢出房间。例如有相同用户名在其他地方登录房间导致本端被踢出房间，会进入该状态。</td>
  </tr>
  <tr>
    <td>ZegoRoomStateChangedReason.LOGOUT</td>
    <td>7</td>
    <td>登出房间成功。没有登录房间前默认为该状态，当调用 [logoutRoom] 登出房间成功或 [switchRoom] 内部登出当前房间成功后，进入该状态。</td>
  </tr>
  <tr>
    <td>ZegoRoomStateChangedReason.LOGOUT_FAILED</td>
    <td>8</td>
    <td>登出房间失败。当调用 [logoutRoom] 登出房间失败或 [switchRoom] 内部登出当前房间失败后，进入该状态。</td>
  </tr>
</tbody></table>


**2. 其他用户进出房间的通知**

[OnRoomUserUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~IZegoEventHandler#on-room-user-update)：同一房间内的其他用户进出房间时，您可通过此回调收到通知。回调中的参数 [ZegoUpdateType](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~enum~ZegoUpdateType) 为 ZegoUpdateType.ZegoUpdateTypeAdd 时，表示有用户进入了房间；[ZegoUpdateType](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~enum~ZegoUpdateType) 为 ZegoUpdateType.ZegoUpdateTypeDelete 时，表示有用户退出了房间。

<Warning title="注意">


- 只有在登录房间 [LoginRoom ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoExpressEngine#login-room) 时传的配置 [ZegoRoomConfig](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~struct~ZegoRoomConfig) 中的 [isUserStatusNotify ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~struct~ZegoRoomConfig#is-user-status-notify) 参数为 true 时，用户才能收到房间内其他用户的回调。
- 房间人数大于 500 人的情况下 [OnRoomUserUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~IZegoEventHandler#on-room-user-update) 回调不保证有效。若业务场景存在房间人数大于 500 的情况，请联系 ZEGO 技术支持。


</Warning>



```cs
void OnRoomUserUpdate(string roomID, ZegoUpdateType updateType, List<ZegoUser> userList, uint userCount)
{
    // 您可以在回调中根据用户的进出/退出情况，处理对应的业务逻辑
    if (updateType == ZegoUpdateType.Add)
    {
        userList.ForEach((user)=>{
            //string.Format("user {0} enter room {1}", user.userID, roomID);
        });
    }
    else
    {
        userList.ForEach((user)=>{
            //string.Format("user {0} exit room {1}", user.userID, roomID);
        });
    }
}

// 赋值给 ZegoExpressEngine 对应的事件委托
engine.onRoomUserUpdate = OnRoomUserUpdate;
```

**3. 用户推送音视频流的状态通知**

[OnPublisherStateUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~IZegoEventHandler#on-publisher-state-update)：根据实际应用需要，用户推送音视频流之后，当推送视频流的状态发生变更时（如出现网络中断导致推流异常等情况），您会收到该回调，同时 SDK 会进行自动进行重试。

```cs
void OnPublisherStateUpdate(string streamID, ZegoPublisherState state, int errorCode, string extendedData)
{
    // 根据需要实现事件回调
}

// 赋值给 ZegoExpressEngine 对应的事件委托
engine.onPublisherStateUpdate = OnPublisherStateUpdate;
```

**4. 用户拉取音视频流的状态通知**

[OnPlayerStateUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~IZegoEventHandler#on-player-state-update)：根据实际应用需要，用户拉取音视频流之后，当拉取视频流的状态发生变更时（如出现网络中断导致拉流异常等情况），您会收到该回调，同时 SDK 会进行自动进行重试。

```cs
void OnPlayerStateUpdate(string streamID, ZegoPlayerState state, int errorCode, string extendedData)
{
    // 根据需要实现事件回调
}

// 赋值给 ZegoExpressEngine 对应的事件委托
engine.onPlayerStateUpdate = OnPlayerStateUpdate;
```
</Accordion>

<a id="createroom"></a>

### 登录房间

创建 ZegoUser 用户对象，设置用户信息 “userID” 和 “userName” 后，调用 [LoginRoom](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoExpressEngine#login-room)，传入房间 ID 参数 “roomId” 和用户参数 “user”，登录房间。如果房间不存在，调用该接口时会创建并登录此房间。

- 同一个 AppID 内，需保证 “roomId” 全局唯一。
- 同一个 AppID 内，需保证 “userId” 全局唯一，建议开发者将其设置成一个有意义的值，可将 “userId” 与自己业务账号系统进行关联。
- “userId” 与 “userName” 不能为空，否则会导致登录房间失败。
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


<a id="publishingStream"></a>


### 主播预览自己的画面，并推送到 ZEGO 音视频云

**1. 主播预览自己的画面**

<Accordion title="设置预览视图并启动本地预览" defaultOpen="false">
开发者如果希望看到自己本端的画面，可调用 StartPreview 接口启动本地预览。

由于 Android 设备和 iOS 设备的屏幕方向存在 Portrait、PortraitUpsideDown、LandscapeLeft、LandscapeRight 四种方向，为保证推流预览和拉流的显示界面始终在正确的方向，需要先添加推流预览和拉流的显示界面自适应横竖屏代码，请参考 [快速开始 - 集成](/real-time-video-u3d-cs/quick-start/integrating-sdk) 中的 “4 界面自适应”。

Unity 支持通过 RawImage 和 Renderer 两种渲染器进行预览。

- 方式一：RawImage
    1. 创建 RawImage。
    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Unity3D/ZegoExpressEngine/QuickStart/create-raw-image.png" /></Frame>
    2. 预览显示到 RawImage 上。
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
  1. 创建带 Renderer 的 Plane。
    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Unity3D/ZegoExpressEngine/QuickStart/create-renderer.png" /></Frame>
  2. 预览到 Plane 的 Renderer 上。
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

**2. 主播将自己的音视频流推送到 ZEGO 音视频云**

在用户调用 [LoginRoom ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoExpressEngine#login-room) 接口后，可以直接调用 [StartPublishingStream ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoExpressEngine#start-publishing-stream) 接口，传入 “streamID”，将自己的音视频流推送到 ZEGO 音视频云。您可通过监听 [OnPublisherStateUpdate ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~IZegoEventHandler#on-publisher-state-update) 回调知晓推流是否成功。

“streamID” 由您本地生成，但是需要保证：

同一个 AppID 下，“streamID” 全局唯一。如果同一个 AppID 下，不同用户各推了一条 “streamID” 相同的流，后推流的用户推流失败。

此处示例在调用 [LoginRoom ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoExpressEngine#login-room) 接口后立即进行推流。在实现具体业务时，您可选择其他时机进行推流，只要保证先调用 [LoginRoom](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoExpressEngine#login-room) 即可。

```cs
// 用户调用 loginRoom 之后再调用此接口进行推流
// 在同一个 AppID 下，开发者需要保证“streamID” 全局唯一，如果不同用户各推了一条 “streamID” 相同的流，后推流的用户会推流失败。
engine.StartPublishingStream("stream1");
```

<Note title="说明">
如果您需要了解 Express 的麦克风/音频/扬声器相关接口，请参考 [常见问题 - 如何实现开关摄像头/视频画面/麦克风/音频/扬声器？](http://doc-zh.zego.im/faq/How_to_switch_devices)。
</Note>

### 拉取主播的音视频

进行直播时，我们需要拉取到主播的音视频。超低延迟直播拉流的延迟在 1s 以内，更能实现超低延迟、超强同步、抗极端弱网、超低卡顿、超清画质、首帧秒开的极致直播体验。

在同一房间内的其他用户将音视频流推送到 ZEGO 音视频云时，我们会在 [OnRoomStreamUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~IZegoEventHandler#on-room-stream-update) 回调中收到音视频流新增的通知，并可以通过 ZegoStream 获取到某条流的 “streamID”。

我们可以在该回调中，调用 [StartPlayingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoExpressEngine#start-playing-stream) 接口，传入 “streamID” 拉取播放该用户的音视频。您可通过监听 [OnPlayerStateUpdate ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~IZegoEventHandler#on-player-state-update) 回调知晓是否成功拉取音视频。您可以使用如下拉流方式。

<Warning title="注意">


- 超低延迟直播不是默认开启的，请在 ZEGO 控制台自助开通或联系 ZEGO 技术支持，详情请参考 [开通服务](https://doc-zh.zego.im/article/21035#3_1)。
- 如果用户在直播的过程中，遇到相关错误，可查询 [错误码](https://doc-zh.zego.im/article/21114)。

</Warning>



调用 [StartPlayingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoExpressEngine#start-playing-stream) 接口，并将 [resourceMode](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~struct~ZegoScenePlayerConfig#resource-mode) 参数设置为 “ZegoScenePlayerConfig.ZegoStreamResourceModeOnlyL3”，表示超低延迟直播拉流。

Unity3D 支持通过 RawImage 和 Renderer 两种渲染器进行拉流渲染。

- 方式一：RawImage
    1. 创建 RawImage。
    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Unity3D/ZegoExpressEngine/QuickStart/create-raw-image.png" /></Frame>
    2. 预览显示到 RawImage 上。
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
    ZegoPlayerConfig playerConfig = new ZegoPlayerConfig();
    playerConfig.resourceMode = ZegoStreamResourceMode.OnlyL3;
    engine.StartPlayingStream(streamID, playerConfig);
    ```

- 方式二：Renderer
    1. 创建带 Renderer 的 Plane。
    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Unity3D/ZegoExpressEngine/QuickStart/create-renderer.png" /></Frame>
    2. 预览到 Plane 的 Renderer 上。
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
    ZegoPlayerConfig playerConfig = new ZegoPlayerConfig();
    playerConfig.resourceMode = ZegoStreamResourceMode.OnlyL3;
    engine.StartPlayingStream(streamID, playerConfig);
    ```

### 调试超低延迟直播功能

在真机中运行项目，运行成功后，可以看到本端视频画面。

为方便体验，ZEGO 提供了一个 [Web 端调试示例 ](https://zegodev.github.io/zego-express-webrtc-sample/assistDev/index.html)，在该页面下，输入相同的 AppID、RoomID、Server 地址和 [Token](/console/development-assistance/temporary-token)，即可加入同一房间与真机设备互通。当成功开直播时，可以听到远端的音频，看到远端的视频画面。


<a id="StopPublishingStream"></a>

### 停止推送/拉取音视频流

**1. 停止推流，停止预览**

调用 [StopPublishingStream ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoExpressEngine#stop-publishing-stream) 接口停止向远端用户发送本端的音视频流。

```cs
// 停止推流
engine.StopPublishingStream();
```

如果启用了本地预览，调用 [StopPreview ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoExpressEngine#stop-preview) 接口停止预览。

```cs
// 停止本地预览
engine.StopPreview();
```

**2. 停止拉流**

调用 [StopPlayingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoExpressEngine#stop-playing-stream) 接口停止拉取远端推送的音视频流。

<Warning title="注意">


如果开发者通过 [OnRoomStreamUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~IZegoEventHandler#on-room-stream-update) 回调收到了音视频流 “减少” 的通知，请及时调用 [StopPlayingStream ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoExpressEngine#stop-playing-stream) 接口停止拉流，避免拉到空流、产生额外的成本；或者，开发者可以根据自己的业务需求，选择合适的时机，主动调用 [StopPlayingStream ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoExpressEngine#stop-playing-stream) 接口停止拉流。

</Warning>



```cs
// 停止拉流
engine.StopPlayingStream("stream1");
```

### 退出房间

调用 [LogoutRoom](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoExpressEngine#logout-room) 接口退出房间。

```cs
// 退出房间
engine.LogoutRoom();
```

### 销毁引擎

如果用户彻底不使用音视频功能时，可调用 [DestroyEngine](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoExpressEngine#destroy-engine) 接口销毁引擎，释放麦克风、摄像头、内存、CPU 等资源。

- 如果需要监听回调，来确保设备硬件资源释放完成，可在销毁引擎时传入 “callback”。该回调只用于发送通知，开发者不可以在回调内释放与引擎相关的资源。
- 如果不需要监听回调，可传入 “null”。


```cs
ZegoExpressEngine.DestroyEngine();
engine = null;
```




## 直播 API 调用时序

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/QuickStart/quickstart_uml_video_u3d.png" /></Frame>

## 常见问题

**1. 调用 [LogoutRoom ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoExpressEngine#logout-room) 登出房间时能否直接杀掉进程？**

调用 [LogoutRoom](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoExpressEngine#logout-room) 后直接杀掉进程，有一定概率会导致 [LogoutRoom ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoExpressEngine#logout-room) 信令没发出去，那么 ZEGO 服务端只能等心跳超时后才认为这个用户退出了房间，为了确保 [LogoutRoom](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoExpressEngine#logout-room) 信令发送出去，建议再调用 [DestroyEngine](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoExpressEngine#destroy-engine) 并收到回调后再杀进程。

## 相关文档
- [常见错误码](https://doc-zh.zego.im/article/5643)
- [如何处理房间与用户的相关问题？](https://doc-zh.zego.im/faq/express_room?product=ExpressVideo&platform=all)
- [如何设置和获取 SDK 的日志、堆栈信息？](https://doc-zh.zego.im/faq/express_sdkLog?product=ExpressVideo&platform=all)
- [SDK 是否支持断线重连？](https://doc-zh.zego.im/faq/reconnect?product=ExpressVideo&platform=all)
- [直播场景下，如何监听远端观众角色用户登录/退出房间的事件？](https://doc-zh.zego.im/faq/audience_event?product=ExpressVideo&platform=all)
- [如何调节摄像头的焦距（变焦功能）？](https://doc-zh.zego.im/faq/express_adjust_focal?product=ExpressVideo&platform=all)

- [为什么我无法打开摄像头？](https://doc-zh.zego.im/faq/camera?product=ExpressVideo&platform=all)

- [如何在较差的网络环境中保证音视频流畅（流量控制功能）？](https://doc-zh.zego.im/faq/flowcontrol?product=ExpressVideo&platform=all)
