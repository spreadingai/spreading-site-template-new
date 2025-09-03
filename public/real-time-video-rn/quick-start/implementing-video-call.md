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

- 已在项目中集成 ZEGO Express SDK，实现基本的实时音视频功能，详情请参考 [快速开始 - 集成](https://doc-zh.zego.im/article/4835)。
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

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/QuickStart/quickstart_uml_RN.png" /></Frame>

<a id="CreateEngine"> </a>

### 创建引擎

**1. 创建界面（可选）**

<Accordion title="添加界面元素" defaultOpen="false">
在创建引擎之前，ZEGO 推荐开发者添加以下界面元素，方便实现基本的实时音视频功能。

- 本地预览窗口
- 远端视频窗口
- 结束按钮

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/QuickStart/UI.jpg" /></Frame>
</Accordion>

**2. 创建引擎**

使用 [createEngineWithProfile ](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/classes/_zegoexpressengine_.zegoexpressengine.html#createenginewithprofile) 方法，将申请到的 AppID 和 AppSign 传入参数 “appID” 和 “appSign”，创建引擎单例对象。

<Warning title="注意">


SDK 同时也支持 Token 鉴权，若您对项目安全性有更高要求，建议您升级鉴权方式，可参考 [如何从 AppSign 鉴权升级为 Token 鉴权](http://doc-zh.zego.im/faq/token_upgrade?product=ExpressVideo)。

</Warning>



```javascript
// 导入 ZEGO Express SDK
import ZegoExpressEngine from 'zego-express-engine-reactnative';

// 采用通用场景
const profile = {
appID : xxx,
// AppSign 仅满足简单的鉴权需求，如果需要升级为更加安全的鉴权方式，请参考[如何从 AppSign 鉴权升级为 Token 鉴权](https://doc-zh.zego.im/faq/token_upgrade?product=ExpressVideo&platform=all)
// AppSign 可通过[控制台](https://console.zego.im/dashboard)获取，格式为 @"39011cbxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
appSign: '39011cbxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
scenario : 0
};

ZegoExpressEngine.createEngineWithProfile(profile)
```

**3.设置回调**

创建引擎后，您可以通过引擎实例的[on](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/classes/_zegoexpressengine_.zegoexpressengine.html#on)方法注册回调。

<Warning title="注意">


为避免错过事件通知，建议在创建引擎后立即注册回调

</Warning>




<a id="loginRoom"> </a>

### 登录房间

**1. 登录**

您可以调用 [loginRoom ](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/classes/_zegoexpressengine_.zegoexpressengine.html#loginroom) 接口登录房间。如果房间不存在，调用该接口时会创建并登录此房间。

roomID 和 user 的参数由您本地生成，但是需要满足以下条件：

- 同一个 AppID 内，需保证 “roomID” 全局唯一。
- 同一个 AppID 内，需保证 “userID” 全局唯一，建议开发者将 “userID” 与自己业务的账号系统进行关联。

```javascript
let roomConfig = new ZegoRoomConfig();
// 如果您使用 appsign 的方式鉴权，token 参数不需填写；如果需要使用更加安全的 鉴权方式： token 鉴权，请参考[如何从 AppSign 鉴权升级为 Token 鉴权](https://doc-zh.zego.im/faq/token_upgrade?product=ExpressVideo&platform=all)
// roomConfig.token = "xxxx";
// 只有传入 “isUserStatusNotify” 参数取值为 “true” 的 ZegoRoomConfig，才能收到 onRoomUserUpdate 回调。
roomConfig.isUserStatusNotify = true;
// 登录房间
// 开始登录房间
ZegoExpressEngine.instance().loginRoom('room1', {'userID': 'id1', 'userName': 'user1'}, roomConfig);
```

**2. 监听登录房间后的事件回调**

可根据实际应用需要，在登录房间后监听想要关注的事件通知，比如房间状态更新、用户状态更新、流状态更新等。
- [roomStateUpdate](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/interfaces/_zegoexpresseventhandler_.zegoeventlistener.html#roomstateupdate)：房间状态更新回调，登录房间后，当房间连接状态发生变更（如出现房间断开，登录认证失败等情况），SDK 会通过该回调通知。
- [roomUserUpdate](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/interfaces/_zegoexpresseventhandler_.zegoeventlistener.html#roomuserupdate)：用户状态更新回调，登录房间后，当房间内有用户新增或删除时，SDK 会通过该回调通知。

    只有调用 [loginRoom](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/classes/_zegoexpressengine_.zegoexpressengine.html#loginroom) 接口登录房间时传入 [ZegoRoomConfig](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/classes/_zegoexpressdefines_.zegoroomconfig.html) 配置，且 “isUserStatusNotify” 参数取值为 “true” 时，用户才能收到 [roomUserUpdate](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/interfaces/_zegoexpresseventhandler_.zegoeventlistener.html#roomuserupdate) 回调。

- [roomStreamUpdate](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/interfaces/_zegoexpresseventhandler_.zegoeventlistener.html#roomstreamupdate)：流状态更新回调，登录房间后，当房间内有用户新推送或删除音视频流时，SDK 会通过该回调通知。

<Warning title="注意">


- 只有调用 [loginRoom](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/classes/_zegoexpressengine_.zegoexpressengine.html#loginroom) 接口登录房间时传入 [ZegoRoomConfig](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/classes/_zegoexpressdefines_.zegoroomconfig.html) 配置，且 “isUserStatusNotify” 参数取值为 “true” 时，用户才能收到 [roomUserUpdate](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/interfaces/_zegoexpresseventhandler_.zegoeventlistener.html#roomuserupdate) 回调。
- 通常情况下，如果某个用户想要播放其他用户推送的视频，可以在收到流状态更新（新增）的回调中，调用 [startPlayingStream](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/classes/_zegoexpressengine_.zegoexpressengine.html#startplayingstream) 接口拉取远端推送的音视频流。

</Warning>



```javascript
// 以下为常用的房间相关回调

ZegoExpressEngine.instance().on('roomStateUpdate', (roomID, state, errorCode, extendedData) => {
  // 房间状态更新回调，登录房间后，当房间连接状态发生变更（如出现房间断开，登录认证失败等情况），SDK会通过该回调通知
}); ;


ZegoExpressEngine.instance().on('roomUserUpdate', (roomID, updateType, userList) => {
  // 用户状态更新，登录房间后，当房间内有用户新增或删除时，SDK会通过该回调通知
});

ZegoExpressEngine.instance().on('roomStreamUpdate', (roomID, updateType, streamList) => {
  // 流状态更新，登录房间后，当房间内有用户新推送或删除音视频流时，SDK会通过该回调通知
});
```

<a id="publishingStream"></a>

### 推流

**1. 开始推流**

调用 [startPublishingStream ](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/classes/_zegoexpressengine_.zegoexpressengine.html#startpublishingstream) 接口，传入流 ID 参数 “streamID”，向远端用户发送本端的音视频流。

<Warning title="注意">


同一个 AppID 内，需保证 “streamID” 全局唯一。如果同一个 AppID 内，不同用户各推了一条 “streamID” 相同的流，会导致后推流的用户推流失败。

</Warning>



```javascript
/** 开始推流 */
ZegoExpressEngine.instance().startPublishingStream("streamID");
```

**2. 启动本地预览（可选）**

<Accordion title="设置预览视图并启动本地预览" defaultOpen="false">
如果希望看到本端画面，可调用 [startPreview ](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/classes/_zegoexpressengine_.zegoexpressengine.html#startpreview) 接口设置预览视图，并启动本地预览。

```javascript
import { findNodeHandle } from 'react-native';

// 取一个react 的 ref
let localViewRef = findNodeHandle(this.refs.zego_preview_view);

// 启动本地预览
ZegoExpressEngine.instance().startPreview({
    'reactTag': localViewRef,
    'viewMode': 0,
    'backgroundColor': 0
});

// react render
render() {
    return (
        <View>
            <ZegoTextureView ref='zego_preview_view'/>
        </view>
    )
}
```
</Accordion>

**3. 监听推流后的事件回调**

根据实际应用需要，在推流后监听想要关注的事件通知，比如推流状态更新等。

[publisherStateUpdate](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/interfaces/_zegoexpresseventhandler_.zegoeventlistener.html#publisherstateupdate)：推流状态更新回调，调用推流接口成功后，当推流状态发生变更，如出现网络中断导致推流异常等情况，SDK 在重试推流的同时，会通过该回调通知。

```javascript
    ZegoExpressEngine.instance().on("publisherStateUpdate", (streamID, state, errorCode, extendedData) => {
    // 调用推流接口成功后，当推流器状态发生变更，如出现网络中断导致推流异常等情况，SDK在重试推流的同时，会通过该回调通知
    //....
});
```

<a id="PlayingStream"></a>

### 拉流

**1. 开始拉流**

调用 [startPlayingStream ](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/classes/_zegoexpressengine_.zegoexpressengine.html#startplayingstream) 接口，根据传入的流 ID 参数 “streamID”，拉取远端推送的音视频流。

<Note title="说明">



- 远端用户推送的 “streamID” 可以从 [roomStreamUpdate](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/interfaces/_zegoexpresseventhandler_.zegoeventlistener.html#roomstreamupdate) 回调中获取。
- 需保证 “streamID” 全局唯一。

</Note>





```javascript
import { findNodeHandle } from 'react-native';

// 取一个react 的 ref
let remoteViewRef = findNodeHandle(this.refs.zego_play_view);

// 开始拉流
ZegoExpressEngine.instance().startPlayingStream("streamID", {
    'reactTag': remoteViewRef,
    'viewMode': 0,
    'backgroundColor': 0
});

// react render
render() {
    return (
        <View>
            <ZegoTextureView ref='zego_play_view'/>
        </view>
    )
}
```

**2. 监听拉流后的事件回调**

根据实际应用需要，在拉流后监听想要关注的事件通知，比如拉流状态更新等。

[playerStateUpdate](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/interfaces/_zegoexpresseventhandler_.zegoeventlistener.html#playerstateupdate)：拉流状态更新回调，调用拉流接口成功后，当拉流状态发生变更，如出现网络中断导致推流异常等情况，SDK 在重试拉流的同时，会通过该回调通知。

```javascript
ZegoExpressEngine.instance().on("playerStateUpdate", (streamID, state, errorCode, extendedData) => {
    /** 调用拉流接口成功后，当拉流器状态发生变更，如出现网络中断导致推流异常等情况，SDK在重试拉流的同时，会通过该回调通知 */
    //....
});
```

### 在线测试推拉流功能

在真机中运行项目，运行成功后，可以看到本端视频画面。

为方便体验，ZEGO 提供了一个 [Web 端调试示例](https://zegodev.github.io/zego-express-webrtc-sample/assistDev/index.html)，在该页面下，输入相同的 AppID、RoomID，输入不同的 UserID、以及对应的 [Token](/console/development-assistance/temporary-token)，即可加入同一房间与真机设备互通。当成功开始音视频通话时，可以听到远端的音频，看到远端的视频画面。



<a id="stopPublishingStream"></a>

### 停止推拉流

**1. 停止推流/预览**

调用 [stopPublishingStream ](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/classes/_zegoexpressengine_.zegoexpressengine.html#stoppublishingstream) 接口停止发送本地的音视频流，结束通话。

```javascript
/** 停止推流 */
ZegoExpressEngine.instance().stopPublishingStream();
```

如果启用了本地预览，开发者可以在停止推流后根据业务需要调用 [stopPreview ](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/classes/_zegoexpressengine_.zegoexpressengine.html#stoppreview) 接口停止预览。

```javascript
// 停止本地预览
ZegoExpressEngine.instance().stopPreview();
```

**2. 停止拉流**

调用 [stopPlayingStream ](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/classes/_zegoexpressengine_.zegoexpressengine.html#stopplayingstream) 接口，停止拉取远端的音视频流。

<Warning title="注意">


如果开发者通过 [roomStreamUpdate](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/interfaces/_zegoexpresseventhandler_.zegoeventlistener.html#roomstreamupdate) 回调收到了音视频流 “减少” 的通知，请及时调用 [stopPlayingStream ](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/classes/_zegoexpressengine_.zegoexpressengine.html#stopplayingstream) 接口停止拉流，避免拉到空流、产生额外的成本；或者，开发者可以根据自己的业务需求，选择合适的时机，主动调用 [stopPlayingStream ](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/classes/_zegoexpressengine_.zegoexpressengine.html#stopplayingstream) 接口停止拉流。

</Warning>



```javascript
// 停止拉流
ZegoExpressEngine.instance().stopPlayingStream("streamID");
```


**3. 退出房间**

调用 [logoutRoom ](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/classes/_zegoexpressengine_.zegoexpressengine.html#logoutroom) 接口退出房间，本端会收到 [roomStateUpdate ](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/interfaces/_zegoexpresseventhandler_.zegoeventlistener.html#roomstateupdate) 回调通知调用结果，并停止其所有推拉流以及本地预览。


```javascript
// 退出房间
ZegoExpressEngine.instance().logoutRoom('room1');
```

### 销毁引擎

调用 [destroyEngine ](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/classes/_zegoexpressengine_.zegoexpressengine.html#destroyengine) 接口销毁引擎，用于释放 SDK 使用的资源。


```javascript
ZegoExpressEngine.destroyEngine();
```

<Note title="说明">


根据实际需要，可在销毁引擎时通过 “await” 关键字，进行异步等待以确保设备硬件资源被释放完成。

</Note>


