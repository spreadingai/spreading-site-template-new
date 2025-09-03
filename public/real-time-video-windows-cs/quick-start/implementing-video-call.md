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

- 已在项目中集成 ZEGO Express SDK，详情请参考 [快速开始 - 集成](https://doc-zh.zego.im/article/6764)。
- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppID 和 AppSign，详情请参考 [控制台 - 项目管理](/console/project-info)中的“项目信息”。


## 实现流程

用户通过 ZEGO Express SDK 进行视频通话的基本流程为：

用户 A、B  加入房间，用户 B 预览并将音视频流推送到 ZEGO 云服务（推流），用户 A 收到用户 B 推送音视频流的通知之后，在通知中播放用户 B 的音视频流（拉流）。

<Frame width="512" height="auto" caption="">
  <img src="https://doc-media.zego.im/sdk-doc/Pics/Common/ZegoExpressEngine/common_usage_new.png" />
</Frame>


### 创建引擎

**1. 创建界面**

根据场景需要，为您的项目创建视频通话的用户界面。我们推荐您在项目中添加如下元素：

- 本地预览窗口：类型为 System.Windows.Forms.PictureBox

- 远端视频窗口：类型为 System.Windows.Forms.PictureBox

- 结束按钮：类型为 System.Windows.Forms.Button

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/QuickStart/express_quickstart_video_call_pc.png" /></Frame>


**2. 引入头文件**

在项目中引入 ZegoExpressEngine 命名空间。

```csharp
// 引入 ZegoExpressEngine 命名空间
using ZEGO;
```

**3. 创建引擎并设置回调**

调用 CreateEngine 接口，将申请到的 AppID 和 AppSign 传入参数 “appID” 和 “appSign”，创建引擎单例对象。

根据 App 实际的音视频业务选择一个合适的场景，把选择好的场景枚举传入参数 "scenario"。

开发者可以根据需要选择使用匿名函数来实现回调函数，并赋值给引擎实例对应的回调委托注册回调。

<Warning title="注意">


为避免错过事件通知，建议在创建引擎后立即监听回调

</Warning>




```csharp

ZegoEngineProfile engine_profile = new ZegoEngineProfile();
// AppID 和 AppSign 由 ZEGO 分配给各 App；其中，为了安全考虑，建议将 AppSign 存储在 App 的业务后台，需要使用时从后台获取
engine_profile.appID = appID;
engine_profile.appSign = appSign;
// 指定使用直播场景 (请根据实际情况填写适合你业务的场景)
engine_profile.scenario = ZegoScenario.Broadcast;
// 获取当前线程同步上下文，SDK使用该上下文将回调同步到当前 UI 线程，注意如果需要同步到 UI 线程，则需要在 UI 线程中调用 SynchronizationContext.Current
var context = SynchronizationContext.Current;

// 创建引擎实例
var engine = ZegoExpressEngine.CreateEngine(engine_profile, context);

// 设置 SDK 回调委托
engine.OnRoomStateUpdate = (roomID, state, errorCode, extendedData) => {

};
```


<Accordion title="常见通知回调" defaultOpen="false">
**我在房间内的连接状态变化通知**

OnRoomStateUpdate: 本地调用 LoginRoom 加入房间时，您可通过设置 OnRoomStateUpdate 回调委托实时监控自己在本房间内的连接状态。

房间连接状态会互相切换，开发者需要结合 state 和 errorCode 判断各种情况并处理相应的逻辑。


```csharp
public void OnRoomStateUpdate(string roomID, ZegoRoomState state, int errorCode, string extendedData)
{

}
```

ZegoRoomState 状态含义如下：

<table>

  <tbody><tr>
    <th>状态</th>
    <th>枚举值</th>
    <th>含义</th>
  </tr>
  <tr>
    <td>Disconnected</td>
    <td>0</td>
    <td>未连接状态，在登录房间前/退出房间后进入该状态。如果登录房间的过程中出现稳态异常，比如 AppID 和 AppSign 不正确，或者有相同用户名在其他地方登录导致本端被 KickOut，都会进入该状态。</td>
  </tr>
  <tr>
    <td>Connecting</td>
    <td>1</td>
    <td>正在请求连接状态，登录房间动作执行成功后会进入该状态。通常情况下，可通过该状态进行 UI 界面的展示。如果是因为网络质量不佳产生的中断，SDK 内部会进行重试，也会进入正在请求连接状态。</td>
  </tr>
  <tr>
    <td>Connected</td>
    <td>2</td>
    <td>连接成功状态，成功登录房间后进入该状态。此时，用户可以正常收到房间内的用户和流信息增删变化的回调通知。</td>
  </tr>
</tbody></table>



**房间内其他用户进出房间的通知**

OnRoomUserUpdate: 同一房间内的其他用户进出房间时，您可通过此回调收到通知。

<Warning title="注意">



- 只有在登录房间 LoginRoom 时传的配置 ZegoRoomConfig 中的 isUserStatusNotify 参数为 true 时，用户才能收到房间内其他用户的回调。
- 回调中的参数 ZegoUpdateType 为 Add 时，表示有用户进入了房间；ZegoUpdateType 为 Delete 时，表示有用户退出了房间。

</Warning>




```csharp
public void OnRoomUserUpdate(string roomID, ZegoUpdateType updateType, List<ZegoUser> userList, uint userCount)
{
    // 您可以在回调中根据用户的进出/退出情况，处理对应的业务逻辑
    if(updateType == ZegoUpdateType.Add)
    {

    }
    else if(updateType == ZegoUpdateType.Delete)
    {

    }
}
```

**房间内音视频流变化的通知**

OnRoomStreamUpdate：在同一房间内的其他用户将音视频流推送到 ZEGO 音视频云时，我们会在此回调中收到音视频流新增的通知。通常情况下，如果某个用户想要播放其他用户推送的视频，可以在收到流状态更新（新增）的回调中，调用 StartPlayingStream 接口拉取远端推送的音视频流。

```csharp
public void OnRoomStreamUpdate(string roomID, ZegoUpdateType updateType, List<ZegoStream> streamList, string extendedData)
{
    if (updateType == ZegoUpdateType.Add)
    {
        // 房间内流新增
    }
    else if(updateType == ZegoUpdateType.Delete)
    {
        // 房间内流删除
    }
}
```


**用户推送音视频流的状态通知**

OnPublisherStateUpdate：根据实际应用需要，用户推送音视频流之后，当推送视频流的状态发生变更时（如出现网络中断导致推流异常等情况），您会收到该回调，同时 SDK 会自动进行重试。

OnPublisherQualityUpdate：推流质量回调。调用推流接口成功后，定时回调音视频流质量数据（如分辨率、帧率、码率等）。

```csharp
public void OnPublisherStateUpdate(string streamID, ZegoPublisherState state, int errorCode, string extendedData)
{
    if (errorCode != 0)
    {
        // 推流状态出错
        return;
    }

    if (state == ZegoPublisherState.PublishRequesting)
    {
        // 正在请求推流
    }
    elseif (state == ZegoPublisherState.NoPublish)
    {
        // 没有推流
    }
    else if (state == ZegoPublisherState.Publishing)
    {
        // 正在推流
    }
}
```



**用户拉取音视频流的状态通知**

OnPlayerStateUpdate：根据实际应用需要，用户拉取音视频流之后，当拉取视频流的状态发生变更时（如出现网络中断导致拉流异常等情况），您会收到该回调，同时 SDK 会自动进行重试。

OnPlayerQualityUpdate：拉取音视频流时的质量回调。调用拉流接口成功后，您会定时收到拉取音视频流时的质量数据通知（如分辨率、帧率、码率等）。

```csharp
public void OnPlayerStateUpdate(string streamID, ZegoPlayerState state, int errorCode, string extendedData)
{
    if(errorCode != 0)
    {
        //拉流状态出错
        return;
    }

    if(state == ZegoPlayerState.Playing)
    {
        // 正在拉流中
    }
    else if(state == ZegoPlayerState.PlayRequesting)
    {
        // 正在请求拉流中
    }
    else if(state == ZegoPlayerState.NoPlay)
    {
        // 未进行拉流
    }
```
</Accordion>

### 登录房间


传入用户 ID 参数 “userID” 创建 ZegoUser 用户对象后，调用 LoginRoom 接口，传入房间 ID 参数 “roomID” 和用户参数 “user”，登录房间。如果房间不存在，调用该接口时会创建并登录此房间。

“roomID” 和 “user” 的参数由您本地生成，但是需要满足以下条件：
- 同一个 AppID 内，需保证 “roomID” 全局唯一。
- 同一个 AppID 内，需保证 “userID” 全局唯一，建议开发者将其设置成一个有意义的值，可将 “userID” 与自己业务账号系统进行关联。

<Warning title="注意">


ZegoUser 不能为默认值，否则会导致登录房间失败。


</Warning>



```csharp
// 创建用户对象
ZegoUser user = new ZegoUser("user1");
// 只有传入 “isUserStatusNotify” 参数取值为 “true” 的 ZegoRoomConfig，才能收到 onRoomUserUpdate 回调。
ZegoRoomConfig config = new ZegoRoomConfig();
config.isUserStatusNotify = true;
// 登录房间
engine.LoginRoom(room_id, user, config);
```

<Warning title="注意">

为避免错过任何通知，您需要在登录房间前先监听回调。

</Warning>




调用登录房间接口之后，您可通过设置 OnRoomStateUpdate 回调委托实时监控自己在本房间内的连接状态。


```csharp
public void OnRoomStateUpdate(string roomID, ZegoRoomState state, int errorCode, string extendedData)
{
    if(errorCode != 0)
    {
        // 房间状态出错
    }

    if (state == ZegoRoomState.Connecting)
    {
        // 房间连接中
    }
    else if (state == ZegoRoomState.Connected)
    {

    }
    else if (state == ZegoRoomState.Disconnected)
    {
        // 房间连接断开
    }
}
```



### 预览自己的画面，并推送到 ZEGO 音视频云

**1. （可选）预览自己的画面**

如果希望看到本端的画面，可调用 StartPreview 接口设置预览视图，并启动本地预览。

<Note title="说明">


无论是否调用 [StartPreview ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_windows~class~ZegoExpressEngine#start-preview) 预览，都可以将自己的音视频流推送到 ZEGO 音视频云。

</Note>



```csharp
// 设置本地预览视图并启动预览，视图模式采用 SDK 默认的模式，等比缩放填充整个 View
ZegoCanvas canvas = new ZegoCanvas();
canvas.view = pictureBox.Handle;
engine.StartPreview(canvas);
```

**2. 将自己的音视频流推送到 ZEGO 音视频云**

在用户调用 LoginRoom 接口后，可以直接调用 StartPublishingStream 接口，传入 “streamID”，将自己的音视频流推送到 ZEGO 音视频云。您可通过设置 onPublisherStateUpdate 回调委托知晓推流是否成功。

“streamID” 由您本地生成，但是需要保证：
同一个 AppID 下，“streamID” 全局唯一。如果同一个 AppID 下，不同用户各推了一条 “streamID” 相同的流，会导致后推流的用户推流失败。


此处示例在调用 LoginRoom 接口后立即进行推流。在实现具体业务时，您可选择其他时机进行推流，只要保证先调用 LoginRoom 即可。

```csharp
// 用户调用 LoginRoom 之后再调用此接口进行推流
// 在同一个 AppID 下，开发者需要保证“streamID” 全局唯一，如果不同用户各推了一条 “streamID” 相同的流，后推流的用户会推流失败。
engine.StartPublishingStream("stream1");
```

### 拉取其他用户的音视频

进行视频通话时，我们需要拉取到其他用户的音视频。

OnRoomStreamUpdate：在同一房间内的其他用户将音视频流推送到 ZEGO 音视频云时，我们会在此回调中收到音视频流新增的通知，基于此可获取其他用户的 “streamID”。

此时，我们可以在该回调中，调用 StartPlayingStream，传入其他用户的 “streamID” ，拉取播放推送到 ZEGO 服务器的音视频画面。

<Warning title="注意">



如果用户在音视频通话的过程中，遇到相关错误，可查询 [错误码](https://doc-zh.zego.im/article/5639)。

</Warning>




```csharp
// 房间内其他用户推流/停止推流时，我们会在这里收到相应流增减的通知
public void OnRoomStreamUpdate(string roomID, ZegoUpdateType updateType, List<ZegoStream> streamList, string extendedData)
{
    //当 updateType 为 ZegoUpdateType.Add 时，代表有音视频流新增，此时我们可以调用 StartPlayingStream 接口拉取播放该音视频流
    if(updateType == ZegoUpdateType.Add && streamList.Count > 0)
    {
        // 开始拉流，设置远端拉流渲染视图，视图模式采用 SDK 默认的模式，等比缩放填充整个             View
        var current_play_stream = streamList.ElementAt(streamList.Count - 1);

        // 如下 pictureBox_Remote.Handle 为 UI 窗口句柄
        ZegoCanvas canvas = new ZegoCanvas();
        canvas.view = pictureBox_Remote.Handle;
        engine.StartPlayingStream(current_play_stream.streamID, canvas);
    }
}
```
### 在线测试推拉流功能

在真机中运行项目，运行成功后，可以看到本端视频画面。

为方便体验，ZEGO 提供了一个 [Web 端调试示例](https://zegodev.github.io/zego-express-webrtc-sample/assistDev/index.html)，在该页面下，输入相同的 AppID、RoomID，输入不同的 UserID、以及对应的 [Token](/console/development-assistance/temporary-token)，即可加入同一房间与真机设备互通。当成功开始音视频通话时，可以听到远端的音频，看到远端的视频画面。


### 停止音视频通话

#### 停止推送和拉取音视频流

**1. 停止推流，停止预览**

调用 StopPublishingStream 接口停止向远端用户发送本端的音视频流。

```csharp
// 停止推流
engine.StopPublishingStream();
```

如果启用了本地预览，调用 StopPreview 接口停止预览。

```csharp
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
engine.StopPlayingStream("stream1");
```

#### 退出房间

调用 LogoutRoom 接口退出房间。

```csharp
// 退出房间
engine.LogoutRoom();
```



#### 销毁引擎

如果用户彻底不使用音视频功能时，可调用 DestroyEngine 接口销毁引擎，释放麦克风、摄像头、内存、CPU 等资源。


- 如果需要监听回调，来确保设备硬件资源释放完成，可在销毁引擎时传入 “callback”。该回调只用于发送通知，开发者不可以在回调内释放与引擎相关的资源。

- 如果不需要监听回调，可传入 “nullptr”。


```csharp
ZegoExpressEngine.DestroyEngine();
```



## 视频通话 API 调用时序


<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/QuickStart/quickstart_uml_winC.png" /></Frame>

## 常见问题

##### 调用 LogoutRoom 登出房间时能否直接杀掉进程？
调用 LogoutRoom 后直接杀掉进程，有一定概率会导致 LogoutRoom 信令没发出去，那么 ZEGO 服务端只能等心跳超时后才认为这个用户退出了房间，为了确保 LogoutRoom 信令发送出去，建议再调用 DestroyEngine 并收到回调后再杀进程。


## 相关文档

- [如何设置和获取 SDK 的日志、堆栈信息？](https://doc-zh.zego.im/faq/express_sdkLog?product=ExpressVideo&platform=windows)
- [SDK 是否支持断线重连？](https://doc-zh.zego.im/faq/reconnect?product=ExpressVideo&platform=windows)
- [如何处理房间相关问题？](https://doc-zh.zego.im/faq/express_room?product=ExpressVideo&platform=windows)
- [直播场景下，如何监听远端观众角色用户登录/退出房间的事件？](https://doc-zh.zego.im/faq/audience_event?product=ExpressVideo&platform=windows)
- [如何调节摄像头的焦距（变焦功能）？](https://doc-zh.zego.im/faq/express_adjust_focal?product=ExpressVideo&platform=windows)
- [如何在较差的网络环境中保证音视频流畅？](https://doc-zh.zego.im/faq/flowcontrol?product=ExpressVideo&platform=all)
