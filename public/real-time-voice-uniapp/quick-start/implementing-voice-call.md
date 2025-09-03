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

在实现基本的音频通话功能之前，请确保：

- 已在项目中集成 ZEGO Express SDK，实现基本的实时音视频功能，详情请参考 [快速开始 - 集成](https://doc-zh.zego.im/article/13230)。
- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppID 和 AppSign，详情请参考 [控制台 - 项目管理](/console/project-info) 中的“项目信息”。

<Warning title="注意">


SDK 同时也支持 Token 鉴权，若您对项目安全性有更高要求，建议您升级鉴权方式，详情请参考 [如何从 AppSign 鉴权升级为 Token 鉴权](http://doc-zh.zego.im/faq/token_upgrade?product=ExpressVideo)。

</Warning>





## 使用步骤

以用户 A 拉取用户 B 的流为例，流程如下图：

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Common/ZegoExpressEngine/common_usage_new.png" /></Frame>
整个推拉流过程的 API 调用时序如下图：

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/QuickStart/quickstart_uml_Audio_RN.png" /></Frame>

<a id="CreateEngine"> </a>

### 创建引擎

**1. 创建引擎**

调用 [createEngineWithProfile](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/classes/_zegoexpressengine_.zegoexpressengine.html#createenginewithprofile) 接口，将申请到的 AppID 和 AppSign 传入参数 “appID” 和 “appSign”，创建引擎单例对象。

<Warning title="注意">


SDK 同时也支持 Token 鉴权，若您需要升级鉴权方式，可参考 [如何从 AppSign 鉴权升级为 Token 鉴权](http://doc-zh.zego.im/faq/token_upgrade?product=ExpressVideo)。

</Warning>



```javascript
// 导入
import ZegoExpressEngine from '@/components/zego-ZegoExpressUniApp-JS/lib/ZegoExpressEngine';
import { ZegoScenario } from '@/components/zego-ZegoExpressUniApp-JS/lib/ZegoExpressDefines';

// 采用通用场景
const profile = {
appID : xxx,
// AppSign 仅满足简单的鉴权需求，如果需要升级为更加安全的鉴权方式，请参考[如何从 AppSign 鉴权升级为 Token 鉴权](https://doc-zh.zego.im/faq/token_upgrade?product=ExpressVideo&platform=all)
// AppSign 可通过[控制台](https://console.zego.im/dashboard)获取，格式为 @"39011cbxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
appSign: '39011cbxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
scenario : ZegoScenario.General
};

ZegoExpressEngine.createEngineWithProfile(profile)
```


**2. 关闭摄像头**

<Warning title="注意">


Express uni-app SDK 不提供裁剪了视频模块的纯音频包，因此 uni-app “实时语音” SDK 实际上是 “实时音视频” SDK。

在 Web 平台，若需要在推流前实现纯音频：需要先调用 [startPreview](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/classes/_zegoexpressengine_.zegoexpressengine.html#startpreview)， 后调用 [enableCamera](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/classes/_zegoexpressengine_.zegoexpressengine.html#enablecamera) 关闭摄像头。


</Warning>



因此若要实现纯音频场景，请在创建引擎后调用 [enableCamera](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/classes/_zegoexpressengine_.zegoexpressengine.html#enablecamera) 关闭摄像头，以避免启动引擎的视频模块。摄像头关闭后，将不需要再申请摄像头权限，并且不会推视频流。


```js
ZegoExpressEngine.instance().enableCamera(false); // 关闭摄像头
```

更多信息请参考文档 [实时音视频 SDK 与实时语音 SDK 的差异](https://doc-zh.zego.im/article/15811)。

若您对 Express uni-app SDK 包体大小有较高要求，可联系技术支持进行定制裁包，关于 SDK 包大小数据请参考 [概述](https://doc-zh.zego.im/article/13224) 文档。

**3.设置回调**

创建引擎后开发者可根据实际需要，调用引擎实例的 [on ](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/classes/_zegoexpressengine_.zegoexpressengine.html#on) 方法设置回调。

<Warning title="注意">


为避免错过事件通知，建议在创建引擎后立即注册回调

</Warning>




<a id="loginRoom"></a>
### 登录房间

**1. 登录**

您可以调用 [loginRoom ](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/classes/_zegoexpressengine_.zegoexpressengine.html#loginroom) 接口登录房间。如果房间不存在，调用该接口时会创建并登录此房间。
- roomID 和 user 的参数由您本地生成，但是需要满足以下条件:
    - 同一个 AppID 内，需保证 “roomID” 全局唯一。
    - 同一个 AppID 内，需保证 “userID” 全局唯一，建议开发者将 “userID” 与自己业务的账号系统进行关联。

```javascript
let roomConfig = {};
// 只有传入 “isUserStatusNotify” 参数取值为 “true” 的 ZegoRoomConfig，才能收到 onRoomUserUpdate 回调。
roomConfig.isUserStatusNotify = true;
// 登录房间
// 开始登录房间
ZegoExpressEngine.instance().loginRoom('room1', {'userID': 'id1', 'userName': 'user1'}, roomConfig);
```

**2. 监听登录房间后的事件回调**

可根据实际应用需要，在登录房间后监听想要关注的事件通知，比如房间状态更新、用户状态更新、流状态更新等。
- [roomStateUpdate](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/interfaces/_zegoexpresseventhandler_.zegoeventlistener.html#roomstateupdate)：房间状态更新回调，登录房间后，当房间连接状态发生变更（如出现房间断开，登录认证失败等情况），SDK 会通过该回调通知。
- [roomUserUpdate](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/interfaces/_zegoexpresseventhandler_.zegoeventlistener.html#roomuserupdate)：用户状态更新回调，登录房间后，当房间内有用户新增或删除时，SDK 会通过该回调通知。

    只有调用 [loginRoom](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/classes/_zegoexpressengine_.zegoexpressengine.html#loginroom) 接口登录房间时传入 [ZegoRoomConfig](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/classes/_zegoexpressdefines_.zegoroomconfig.html) 配置，且 “isUserStatusNotify” 参数取值为 “true” 时，用户才能收到 [roomUserUpdate](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/interfaces/_zegoexpresseventhandler_.zegoeventlistener.html#roomuserupdate) 回调。

- [roomStreamUpdate](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/interfaces/_zegoexpresseventhandler_.zegoeventlistener.html#roomstreamupdate)：流状态更新回调，登录房间后，当房间内有用户新推送或删除音视频流时，SDK 会通过该回调通知。

<Warning title="注意">


- 只有调用 [loginRoom](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/classes/_zegoexpressengine_.zegoexpressengine.html#loginroom) 接口登录房间时传入 [ZegoRoomConfig](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/classes/_zegoexpressdefines_.zegoroomconfig.html) 配置，且 “isUserStatusNotify” 参数取值为 “true” 时，用户才能收到 [roomUserUpdate](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/interfaces/_zegoexpresseventhandler_.zegoeventlistener.html#roomuserupdate) 回调。
- 通常情况下，如果某个用户想要播放其他用户推送的视频，可以在收到流状态更新（新增）的回调中，调用 [startPlayingStream](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/classes/_zegoexpressengine_.zegoexpressengine.html#startplayingstream) 接口拉取远端推送的音视频流。

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

调用 [startPublishingStream ](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/classes/_zegoexpressengine_.zegoexpressengine.html#startpublishingstream) 接口，传入流 ID 参数 “streamID”，向远端用户发送本端的音视频流。

<Warning title="注意">


同一个 AppID 内，需保证 “streamID” 全局唯一。如果同一个 AppID 内，不同用户各推了一条 “streamID” 相同的流，会导致后推流的用户推流失败。

</Warning>



可在 **uni-app 项目的 Web 环境中**调用 [startPublishingStream ](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/classes/_zegoexpressengine_.zegoexpressengine.html#startpublishingstream) 接口，调用成功会返回一个 MediaStream 本地流对象，开发者可以用返回的 MediaStream 赋值给 video 元素的 srcObject 属性播放所推的流。

```javascript
/** 开始推流  APP-PULL stream无值， Web有值，为MediaStream*/
const stream = await ZegoExpressEngine.instance().startPublishingStream("streamID");
```

**2. 监听推流后的事件回调**

根据实际应用需要，在推流后监听想要关注的事件通知，比如推流状态更新等。

[publisherStateUpdate](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/interfaces/_zegoexpresseventhandler_.zegoeventlistener.html#publisherstateupdate)：推流状态更新回调，调用推流接口成功后，当推流状态发生变更，如出现网络中断导致推流异常等情况，SDK 在重试推流的同时，会通过该回调通知。

```javascript
ZegoExpressEngine.instance().on("publisherStateUpdate", (streamID, state, errorCode, extendedData) => {
    // 调用推流接口成功后，当推流器状态发生变更，如出现网络中断导致推流异常等情况，SDK在重试推流的同时，会通过该回调通知
    //....
});
```

<Note title="说明">
如果您需要了解 Express 的麦克风/音频/扬声器相关接口，请参考 [常见问题 - 如何实现开关摄像头/视频画面/麦克风/音频/扬声器？](http://doc-zh.zego.im/faq/How_to_switch_devices)。
</Note>

### 拉流

**1. 开始拉流**

调用 [startPlayingStream ](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/classes/_zegoexpressengine_.zegoexpressengine.html#startplayingstream) 接口，根据传入的流 ID 参数 “streamID”，拉取远端推送的音视频流。

<Note title="说明">


- 远端用户推送的 “streamID” 可以从 [roomStreamUpdate ](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/interfaces/_zegoexpresseventhandler_.zegoeventlistener.html#roomstreamupdate) 回调中获取。
- 需保证 “streamID” 全局唯一。


</Note>



```js
/** 开始拉流 */
this.playStreamID = "StreamID_1"
await ZegoExpressEngine.instance().startPlayingStream(this.playStreamID)
```

**2. 监听拉流后的事件回调**

根据实际应用需要，在拉流后监听想要关注的事件通知，比如拉流状态更新等。

[playerStateUpdate](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/interfaces/_zegoexpresseventhandler_.zegoeventlistener.html#playerstateupdate)：拉流状态更新回调，调用拉流接口成功后，当拉流状态发生变更，如出现网络中断导致推流异常等情况，SDK 在重试拉流的同时，会通过该回调通知。

```javascript
ZegoExpressEngine.instance().on("playerStateUpdate", (streamID, state, errorCode, extendedData) => {
    /** 调用拉流接口成功后，当拉流器状态发生变更，如出现网络中断导致推流异常等情况，SDK在重试拉流的同时，会通过该回调通知 */
    //....
});
```

### 体验实时音视频功能

在真机中运行项目，运行成功后，可以看到本端视频画面。

为方便体验，ZEGO 提供了一个 [Web 端调试示例 ](https://zegodev.github.io/zego-express-webrtc-sample/assistDev/index.html)，在该页面下，输入相同的 AppID、RoomID，输入不同的 UserID、以及对应的 [Token](/console/development-assistance/temporary-token)，即可加入同一房间与真机设备互通。当成功开始音视频通话时，可以听到远端的音频，看到远端的视频画面。

<a id="stopPublishingStream"></a>
### 停止推拉流

**1. 停止推流**

调用 [stopPublishingStream ](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/classes/_zegoexpressengine_.zegoexpressengine.html#stoppublishingstream) 接口停止发送本地的音视频流，结束通话。

```javascript
/** 停止推流 */
ZegoExpressEngine.instance().stopPublishingStream();
```

**2. 停止拉流**

调用 [stopPlayingStream ](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/classes/_zegoexpressengine_.zegoexpressengine.html#stopplayingstream) 接口，停止拉取远端的音视频流。

<Warning title="注意">


如果开发者通过 [roomStreamUpdate](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/interfaces/_zegoexpresseventhandler_.zegoeventlistener.html#roomstreamupdate) 回调收到了音视频流 “减少” 的通知，请及时调用 [stopPlayingStream ](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/classes/_zegoexpressengine_.zegoexpressengine.html#stopplayingstream) 接口停止拉流，避免拉到空流、产生额外的成本；或者，开发者可以根据自己的业务需求，选择合适的时机，主动调用 [stopPlayingStream ](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/classes/_zegoexpressengine_.zegoexpressengine.html#stopplayingstream) 接口停止拉流。

</Warning>




```javascript
/** 停止拉流 */
ZegoExpressEngine.instance().stopPlayingStream("streamID");
```

**3. 退出房间**

调用 [logoutRoom ](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/classes/_zegoexpressengine_.zegoexpressengine.html#logoutroom) 接口退出房间，本端会收到 [roomStateUpdate ](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/interfaces/_zegoexpresseventhandler_.zegoeventlistener.html#roomstateupdate) 回调通知调用结果，并停止其所有推拉流以及本地预览。


```javascript
/** 退出房间 */
ZegoExpressEngine.instance().logoutRoom('room1');
```

### 销毁引擎

调用 [destroyEngine ](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/classes/_zegoexpressengine_.zegoexpressengine.html#destroyengine) 接口销毁引擎，用于释放 SDK 使用的资源。


```javascript
/** 销毁引擎 */
ZegoExpressEngine.destroyEngine();
```

<Note title="说明">


根据实际需要，可在销毁引擎时通过 “await” 关键字，进行异步等待以确保设备硬件资源被释放完成。

</Note>


## 相关文档
- [常见错误码](https://doc-zh.zego.im/article/10429)
- [如何处理房间与用户的相关问题？](https://doc-zh.zego.im/faq/express_room?product=ExpressVideo&platform=all)
- [如何设置和获取 SDK 的日志、堆栈信息？](https://doc-zh.zego.im/faq/express_sdkLog?product=ExpressVideo&platform=all)
- [SDK 是否支持断线重连？](https://doc-zh.zego.im/faq/reconnect?product=ExpressVideo&platform=all)
- [直播场景下，如何监听远端观众角色用户登录/退出房间的事件？](https://doc-zh.zego.im/faq/audience_event?product=ExpressVideo&platform=all)
- [如何调节摄像头的焦距（变焦功能）？](https://doc-zh.zego.im/faq/express_adjust_focal?product=ExpressVideo&platform=all)

- [为什么我无法打开摄像头？](https://doc-zh.zego.im/faq/camera?product=ExpressVideo&platform=all)

- [如何在较差的网络环境中保证音视频流畅（流量控制功能）？](https://doc-zh.zego.im/faq/flowcontrol?product=ExpressVideo&platform=all)
