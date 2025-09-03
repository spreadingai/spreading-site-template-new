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

在实现基本的音频通话功能之前，请确保：

- 已在项目中集成 ZEGO Express SDK，实现基本的实时音视频功能，详情请参考 [快速开始 - 集成](https://doc-zh.zego.im/article/19523)。
- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppID 和 AppSign，详情请参考 [控制台 - 项目管理](/console/project-info) 中的“项目信息”。

<Warning title="注意">


SDK 同时也支持 Token 鉴权，若您对项目安全性有更高要求，建议您升级鉴权方式，详情请参考 [如何从 AppSign 鉴权升级为 Token 鉴权](http://doc-zh.zego.im/faq/token_upgrade?product=ExpressVideo)。

</Warning>




## 实现流程

以用户 A 拉取用户 B 的流为例，流程如下图：

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Common/ZegoExpressEngine/common_usage_new.png" /></Frame>

### 创建引擎

**1. 引入 ZegoExpressEngine 包**

在项目中引入 ZegoExpressEngine 包。

```ts
// 引入 ZegoExpressEngine 包
import ZegoExpressEngine, {
  ZegoBarrageMessageInfo,
  ZegoBroadcastMessageInfo,
  ZegoLogConfig,
  ZegoPlayerConfig,
  ZegoPublishChannel,
  ZegoPublisherConfig,
  ZegoRoomConfig,
  ZegoRoomExtraInfo,
  ZegoRoomState,
  ZegoScenario,
  ZegoStreamResourceMode,
  ZegoView
} from '@ohos/ZegoExpressEngine/Index'
import { ZegoEngineProfile } from '@ohos/ZegoExpressEngine/Index';
```

**2. 创建引擎**

调用 [createEngine ](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/ets_ohos/classes/_zegoexpressengine_.zegoexpressengine.html#createengine) 接口，将 [前提条件](https://doc-zh.zego.im/article/19524#2) 中申请到的 AppID 传入参数 “appID”，创建引擎单例对象。

<Note title="说明">


如果需要将日志信息输出到 DevEco Studio 的 HiLog 窗口，可参考 [常见问题](https://doc-zh.zego.im/article/19524#6) 中的“鸿蒙系统如何打印调试日志？”实现。

</Note>



```ts
// 定义 SDK 引擎对象
ZegoExpressInstance: ZegoExpressEngine| null = null

// 填写 appID 和 appSign
let appID = xxx;  // 请通过官网注册获取，格式为：1234567890
let appSign = '';  //请通过官网注册获取，格式为：@"0123456789012345678901234567890123456789012345678901234567890123"（共64个字符）

// 在 ability 中获取 Context，然后导出，并且具体的 entry page 中引入该 Context 对象
// 全局定义 Context 和 LogPath
export let Context: object
export let logPath: string

// 在 ability 的 onWindowStageCreate 方法中获取 Context
let applicationContext: common.Context;
applicationContext = this.context.getApplicationContext();
logPath = applicationContext.filesDir.toString();

// 创建引擎，通用场景接入，传入 Context 对象，并根据业务需求注册相关回调
// set log config
let logConfig = new ZegoLogConfig();
logConfig.logPath = logPath;
ZegoExpressEngine.setLogConfig(logConfig)

// create engine
let profile = new ZegoEngineProfile(KeyCenter.appID, KeyCenter.appSign, ZegoScenario.General, Context);
ZegoExpressEngine.createEngine(profile).then((engineInst) => {
    // 得到 engine 实例
    this.ZegoExpressInstance = engineInst;
})
```


**3. 设置回调**


创建引擎后，您可以通过引擎实例的[on](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/ets_ohos/classes/_zegoexpressengine_.zegoexpressengine.html#on)方法注册回调。

<Warning title="注意">


为避免错过事件通知，建议在创建引擎后立即注册回调

</Warning>



### 登录房间

**1. 登录**

传入用户 ID 参数 “userID” 创建 [ZegoUser ](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/ets_ohos/classes/_zegoexpressdefines_.zegouser.html) 用户对象后，调用 [loginRoom ](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/ets_ohos/classes/_zegoexpressengine_.zegoexpressengine.html#loginroom) 接口，传入房间 ID 参数 “roomID” 和用户参数 “user”，登录房间。

“roomID” 和 “user” 的参数由您本地生成，但是需要满足以下条件：

- 同一个 AppID 内，需保证 “roomID” 全局唯一。
- 同一个 AppID 内，需保证 “userID” 全局唯一，建议开发者将其设置成一个有意义的值，可将 “userID” 与自己业务账号系统进行关联。

<Warning title="注意">


ZegoUser 的构造方法 [public ZegoUser(String userID) ](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/ets_ohos/classes/_zegoexpressdefines_.zegouser.html) 会将 “userName” 设为与传的参数 “userID” 一样。“userID” 不能为 “null”，否则会导致登录房间失败。

</Warning>



```ts
// 创建用户
let user = new ZegoUser();
user.userID = this.currentUserID;
user.userName = this.currentUserName;

// 登录房间
let roomConfig = new ZegoRoomConfig();
roomConfig.isUserStatusNotify = true;
this.ZegoExpressInstance.loginRoom('room_id', user, roomConfig);
```

调用登录房间接口之后，您可通过监听 [onRoomStateUpdate ](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/ets_ohos/interfaces/_zegoexpresseventhandler_.zegoeventlistener.html#onroomstateupdate) 回调实时监控自己在本房间内的连接状态，详情请参考 [房间内的连接状态变化通知](https://doc-zh.zego.im/article/19524#4_1)。

只有当房间状态是连接成功时，才能进行推流（[startPublishingStream ](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/ets_ohos/classes/_zegoexpressengine_.zegoexpressengine.html#startpublishingstream)）、拉流（[startPlayingStream ](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/ets_ohos/classes/_zegoexpressengine_.zegoexpressengine.html#startplayingstream)）等操作。

```ts
this.ZegoExpressInstance.on('onRoomStateUpdate', (roomID: string, state: ZegoRoomState, errorCode: number, extendedData: string) => {
    this.logInfo('onRoomStateUpdate. roomID: ' + roomID + ", state: " + state + ", code: "+ errorCode)
    // 更新本地登录状态
    this.currentLoginState = state;

    // 已登录房间
    if(state == ZegoRoomState.Connected)
    {
        // todo 业务逻辑，只有当房间状态是连接成功时，才能进行推流（startPublishingStream）、拉流（startPlayingStream）等操作
    }
    // 房间连接中
    else if(state == ZegoRoomState.Connecting)
    {
        // todo 业务逻辑
    }
    // 房间连接断开
    else
    {
        // todo 业务逻辑，这里可以关注回调参数 errorCode 分析具体失败的原因
    }

})
```

### 推送到 ZEGO 实时音视频云

在用户登录房间成功之后，调用 [startPublishingStream ](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/ets_ohos/classes/_zegoexpressengine_.zegoexpressengine.html#startpublishingstream) 接口，传入 “streamID”，将自己的音视频流推送到 ZEGO 实时音视频云。

“streamID” 由您本地生成，但是需要保证：
同一个 AppID 下，“streamID” 全局唯一。如果同一个 AppID 下，不同用户各推了一条 “streamID” 相同的流，会导致后推流的用户推流失败。

<Note title="说明">


此处在登录房间成功后（即 [onRoomStateUpdate ](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/ets_ohos/interfaces/_zegoexpresseventhandler_.zegoeventlistener.html#onroomstateupdate) 回调通知开发者当前用户的连接状态为 “Connected”），立即进行推流。在实现具体业务时，您可选择其他时机进行推流，只要保证当前房间连接状态是连接成功的即可。

</Note>




```ts
this.ZegoExpressInstance.on('onRoomStateUpdate', (roomID: string, state: ZegoRoomState, errorCode: number, extendedData: string) => {
    this.logInfo('onRoomStateUpdate. roomID: ' + roomID + ", state: " + state + ", code: "+ errorCode)
    // 更新本地登录状态
    this.currentLoginState = state;

    // 已登录房间
    if(state == ZegoRoomState.Connected)
    {
        // todo 业务逻辑， 推流
        let publisherConfig = new ZegoPublisherConfig();
        publisherConfig.roomID = this.currentRoomID;
        this.ZegoExpressInstance.startPublishingStream(this.currentStreamID, publisherConfig, ZegoPublishChannel.Main);
    }
})
```

### 拉取其他用户的音视频流

进行视频通话时，我们需要拉取到其他用户的音视频流。

[onRoomStreamUpdate](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/ets_ohos/interfaces/_zegoexpresseventhandler_.zegoeventlistener.html#onroomstreamupdate)：在同一房间内的其他用户将音视频流推送到 ZEGO 实时音视频云时，我们会在此回调中收到音视频流新增的通知。

我们可以在该回调中，调用 [startPlayingStream](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/ets_ohos/classes/_zegoexpressengine_.zegoexpressengine.html#startplayingstream) 接口，传入 “streamID” 拉取播放该用户的音视频流。

拉取播放用户的音视频流后，如果无法正常看到远端画面，可以检查设置的远端拉流渲染视图类型是否正确。

```ts
this.ZegoExpressInstance.on('onRoomStreamUpdate', (roomID: string, updateType: ZegoUpdateType, streamList: ZegoStream[], extendedData: string) => {
    this.logInfo('onRoomStreamUpdate. roomID: ' + roomID + ", updateType: " + updateType + ", extendedData: "+ extendedData)
    if(updateType == ZegoUpdateType.Add)
    {
        // 这里示例拉流默认的第一条流，具体取决于业务逻辑
        // 开始拉流，设置远端拉流渲染视图，视图模式采用 SDK 默认的模式，等比缩放填充整个 View
        let stream = streamList[0];
        let view = new ZegoView();
        view.view = this.playerViewID;
        let playerConfig = new ZegoPlayerConfig();
        playerConfig.resourceMode = ZegoStreamResourceMode.Default;
        this.ZegoExpressInstance.startPlayingStream(stream.streamID, view, playerConfig);
    }
})
```

#### 注意事项

如果您在音视频通话的过程中，遇到相关错误，可查询 [错误码](https://doc-zh.zego.im/article/19535)。

## 常用功能

### 常见通知回调

#### 用户自己在房间内的连接状态变化通知

[onRoomStateUpdate](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/ets_ohos/interfaces/_zegoexpresseventhandler_.zegoeventlistener.html#onroomstateupdate)：本地调用 [loginRoom](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/ets_ohos/classes/_zegoexpressengine_.zegoexpressengine.html#loginroom) 接口加入房间时，您可通过监听 [onRoomStateUpdate](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/ets_ohos/interfaces/_zegoexpresseventhandler_.zegoeventlistener.html#onroomstateupdate) 回调实时监控自己在本房间内的连接状态。

您可以在回调中根据不同状态处理业务逻辑。

```ts
this.ZegoExpressInstance.on('onRoomStateUpdate', (roomID: string, state: ZegoRoomState, errorCode: number, extendedData: string) => {
})
```

[ZegoRoomState](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/ets_ohos/enums/_zegoexpressdefines_.zegoroomstate.html) 状态含义如下：

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


详情可参考 [房间连接状态说明 ](https://doc-zh.zego.im/article/19527)。

#### 其他用户进出房间的通知

<Warning title="注意">


只有在调用 [loginRoom ](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/ets_ohos/classes/_zegoexpressengine_.zegoexpressengine.html#loginroom) 接口登录房间时传的 [ZegoRoomConfig ](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/ets_ohos/classes/_zegoexpressdefines_.zegoroomconfig.html) 中的 “isUserStatusNotify” 参数为 “true” 时，用户才能收到 [onRoomUserUpdate ](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/ets_ohos/interfaces/_zegoexpresseventhandler_.zegoeventlistener.html#onroomuserupdate) 回调。

用户自己加入房间时，不会触发此回调。


</Warning>



[onRoomUserUpdate ](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/ets_ohos/interfaces/_zegoexpresseventhandler_.zegoeventlistener.html#onroomuserupdate)：同一房间内的其他用户进出房间时，您可通过此回调收到通知。

回调中的 [ZegoUpdateType ](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/ets_ohos/enums/_zegoexpressdefines_.zegoupdatetype.html) 参数为 “Add” 时，表示有用户进入了房间；为 “Delete” 时，表示有用户退出了房间。

```ts
this.ZegoExpressInstance.on('onRoomUserUpdate', (roomID: string, updateType: ZegoUpdateType, userList: ZegoUser[]) =>{
    // 您可以在回调中根据用户的进出/退出情况，处理对应的业务逻辑
    if(updateType == ZegoUpdateType.Add)
    {
        // 用户进入了房间
    }
    else
    {
        // 用户退出了房间
    }
});
```

#### 用户推送音视频流的状态通知

[onPublisherStateUpdate](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/ets_ohos/interfaces/_zegoexpresseventhandler_.zegoeventlistener.html#onpublisherstateupdate)：根据实际应用需要，用户推送音视频流之后，当推送视频流的状态发生变更时（例如出现网络中断导致推流异常等情况），您会收到此回调，同时 SDK 会进行自动进行重试。

```ts
this.ZegoExpressInstance.on('onPublisherStateUpdate', (streamID: string, state: ZegoPublisherState, errorCode: number, extendedData: string) => {
    if (errorCode != 0) {
        // 推流状态出错
    } else {
        if(state ==ZegoPublisherState.Publishing)
        {
            // 正在推流
        }
        else if(state ==ZegoPublisherState.NoPublish)
        {
            // 没有推流
        }
        else if(state ==ZegoPublisherState.PublishRequesting)
        {
            // 正在请求推流
        }
    }
 })
```


#### 用户拉取音视频流的状态通知

[onPlayerStateUpdate](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/ets_ohos/interfaces/_zegoexpresseventhandler_.zegoeventlistener.html#onplayerstateupdate)：根据实际应用需要，用户拉取音视频流之后，当拉取的音视频流的状态发生变更时（例如出现网络中断导致拉流异常等情况），您会收到该回调，同时 SDK 会进行自动进行重试。

```ts
this.ZegoExpressInstance.on('onPlayerStateUpdate', (streamID: string, state: ZegoPlayerState, errorCode: number, extendedData: string) => {
    if (errorCode != 0) {
        // 拉流状态出错
    } else {
        if(state ==ZegoPlayerState.Playing)
        {
             // 正在拉流中
        }
        else if(state ==ZegoPlayerState.PlayRequesting)
        {
            // 正在请求拉流中
        }
        else if(state ==ZegoPlayerState.NoPlay)
        {
            // 未进行拉流
        }
    }
})
```

### 停止音视频通话

#### 停止推送/拉取音视频流

**1. 停止推流**

调用 [stopPublishingStream ](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/ets_ohos/classes/_zegoexpressengine_.zegoexpressengine.html#stoppublishingstream) 接口停止向远端用户发送本端的音视频流。

```ts
// 停止推流
this.ZegoExpressInstance.stopPublishingStream();
```

**2. 停止拉流**

调用 [stopPlayingStream ](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/ets_ohos/classes/_zegoexpressengine_.zegoexpressengine.html#stopplayingstream) 接口停止拉取远端推送的音视频流。

```ts
// 停止拉流
this.ZegoExpressInstance.stopPlayingStream(this.currentPlayStreamID);
```

#### 退出房间

调用 [logoutRoom ](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/ets_ohos/classes/_zegoexpressengine_.zegoexpressengine.html#logoutroom) 接口退出房间。

```ts
// 退出房间
this.ZegoExpressInstance.logoutRoom(this.currentRoomID);
```

#### 销毁引擎

如果用户彻底不使用音视频功能时，可调用 [destroyEngine ](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/ets_ohos/classes/_zegoexpressengine_.zegoexpressengine.html#destroyengine) 接口销毁引擎，释放麦克风、内存、CPU 等资源。

```ts
ZegoExpressEngine.destroyEngine();
// reset local engine
this.ZegoExpressInstance = null;
```

## 调试视频通话功能

在真机中运行项目，运行成功后，可以看到本端视频画面。

为方便体验，ZEGO 提供了一个 [Web 端调试示例 ](https://zegodev.github.io/zego-express-webrtc-sample/assistDev/index.html)，在该页面下，输入相同的 AppID、RoomID，输入不同的 UserID、以及对应的 [Token](/console/development-assistance/temporary-token)，即可加入同一房间与真机设备互通。当成功开始音视频通话时，可以听到远端的音频，看到远端的视频画面。

## 常见问题

1. **调用 [logoutRoom ](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/ets_ohos/classes/_zegoexpressengine_.zegoexpressengine.html#logoutroom) 接口退出房间时，能否直接杀掉进程？**

    调用 [logoutRoom ](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/ets_ohos/classes/_zegoexpressengine_.zegoexpressengine.html#logoutroom) 接口后直接杀掉进程，有一定概率会导致 [logoutRoom ](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/ets_ohos/classes/_zegoexpressengine_.zegoexpressengine.html#logoutroom) 信令没发出去，ZEGO 服务端只能等心跳超时后才认为该用户退出了房间，为了确保 [logoutRoom ](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/ets_ohos/classes/_zegoexpressengine_.zegoexpressengine.html#logoutroom) 信令发送出去，建议再调用 [destroyEngine ](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/ets_ohos/classes/_zegoexpressengine_.zegoexpressengine.html#destroyengine) 接口并收到回调后再杀进程。

2. **鸿蒙系统如何打印调试日志？**

    鸿蒙系统提供了与 Android Log 类似的日志打印工具类 HiLog，具体用法可参考 [HiLog 日志打印 ](https://developer.harmonyos.com/cn/docs/documentation/doc-guides/ide-debug-hilog-0000001172459337)。

## API 时序图

整个推拉流过程的 API 调用时序如下图：

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/QuickStart/quickstart_uml.png" /></Frame>
