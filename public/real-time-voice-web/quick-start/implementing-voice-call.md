# 实现音频通话

---

## 前提条件

在实现基本的实时语音功能之前，请确保：

- 已在项目中集成 ZEGO Express SDK，详情请参考 [快速开始 - 集成](https://doc-zh.zego.im/article/6839)。
- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppID 和 Server 地址，详情请参考 [控制台 - 项目管理](/console/project-info) 中的“项目信息”。



## 使用步骤

本节介绍如何使用 ZEGO Express SDK 实现基本的实时音视频功能，API 调用时序如下图：

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/QuickStart/quickstart_uml_web_new1.png" /></Frame>

### （可选）创建界面

<Accordion title="添加界面元素" defaultOpen="false">
在创建引擎之前，推荐开发者添加以下界面元素，方便实现基本的实时音频通话功能。

- 本地预览窗口
- 远端视频窗口
- 结束按钮

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/QuickStart/UI_Audio_PC.jpg" /></Frame>
</Accordion>

<a id="CreateEngine"> </a>

### 创建引擎并监听回调

**1. 创建引擎**

创建 [ZegoExpressEngine ](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine) 引擎实例，将申请到的 AppID 传入参数 “appID”，将接入服务器地址传入参数 “server”。

<Note title="说明">


- “server” 为接入服务器地址，获取的方式请参考
[控制台 - 项目信息](/console/project-info#配置信息) 。
- 3.6.0 版本及以上 SDK，server 可以改成空字符、null、undefined 或者随意字符，但不能不填。

</Note>



```javascript
// 项目唯一标识 AppID，Number 类型，请从 ZEGO 控制台获取
let appID = ;
// 接入服务器地址 Server，String 类型，请从 ZEGO 控制台获取（获取方式请参考上文“前提条件”）
let server = "";
// 初始化实例
const zg = new ZegoExpressEngine(appID, server);

```

**2. 监听事件回调**

SDK 提供如房间连接状态、音视频流变化、用户进出等通知回调。创建引擎后，您可以通过引擎实例的[on](/real-time-voice-web/quick-start/article/api?doc=express_audio_sdk_api~javascript_web~class~zegoexpressengine#on)方法注册回调。

<Warning title="注意">


  为避免错过事件通知，建议在创建引擎后立即注册回调

</Warning>




<Accordion title="回调示例" defaultOpen="false">
- [roomStateChanged](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~interface~ZegoRTMEvent#room-state-changed)：房间状态更新回调。登录房间后，当房间连接状态发生变更（如出现房间断开，登录认证失败等情况），SDK 会通过该回调通知。
- [roomUserUpdate](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~interface~ZegoRTMEvent#room-user-update)：用户状态更新回调。登录房间后，当房间内有用户新增或删除时，SDK 会通过该回调通知。

    只有调用 [loginRoom](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#login-room) 接口登录房间时传入 [ZegoRoomConfig](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~interface~ZegoRoomConfig) 配置，且 “userUpdate” 参数取值为 “true” 时，用户才能收到 [roomUserUpdate](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~interface~ZegoRTMEvent#room-user-update) 回调。

- [roomStreamUpdate](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~interface~ZegoRTCEvent#room-stream-update)：流状态更新回调。登录房间后，当房间内有用户新推送或删除音视频流时，SDK 会通过该回调通知。

<Warning title="注意">


- 只有调用 [loginRoom](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#login-room) 接口登录房间时传入 [ZegoRoomConfig](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~interface~ZegoRoomConfig) 配置，且 “userUpdate” 参数取值为 “true” 时，用户才能收到 [roomUserUpdate](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~interface~ZegoRTMEvent#room-user-update) 回调。
- 通常情况下，如果某个用户想要播放其他用户推送的视频，可以在收到流状态更新（新增）的回调中，调用 [startPlayingStream](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#start-playing-stream) 接口拉取远端推送的音视频流。

</Warning>




```javascript
// 房间状态更新回调
zg.on('roomStateChanged', (roomID, reason, errorCode, extendData) => {
    if (reason == 'LOGINING') {
        // 登录中
    } else if (reason == 'LOGINED') {
        // 登录成功
        //只有当房间状态是登录成功或重连成功时，推流（startPublishingStream）、拉流（startPlayingStream）才能正常收发音视频
        //将自己的音视频流推送到 ZEGO 音视频云
    } else if (reason == 'LOGIN_FAILED') {
        // 登录失败
    } else if (reason == 'RECONNECTING') {
        // 重连中
    } else if (reason == 'RECONNECTED') {
        // 重连成功
    } else if (reason == 'RECONNECT_FAILED') {
        // 重连失败
    } else if (reason == 'KICKOUT') {
        // 被踢出房间
    } else if (reason == 'LOGOUT') {
        // 登出成功
    } else if (reason == 'LOGOUT_FAILED') {
        // 登出失败
    }
});

// 用户状态更新回调
zg.on('roomUserUpdate', (roomID, updateType, userList) => {
    console.warn(
        `roomUserUpdate: room ${roomID}, user ${updateType === 'ADD' ? 'added' : 'left'} `,
        JSON.stringify(userList),
    );
});

// 流状态更新回调
zg.on('roomStreamUpdate', async (roomID, updateType, streamList, extendedData) => {
    if (updateType == 'ADD') {
        // 流新增，开始拉流
    } else if (updateType == 'DELETE') {
        // 流删除，停止拉流
    }
});
```
</Accordion>

### （可选）检测兼容性

<Accordion title="检测兼容性" defaultOpen="false">
在实现推拉流功能之前，开发者可以调用 [checkSystemRequirements](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#check-system-requirements) 接口检测浏览器的兼容性。

SDK 支持的浏览器兼容版本，请参考 [下载示例源码](/real-time-voice-web/quick-start/run-example-code) 的“准备环境”。

```js
const result = await zg.checkSystemRequirements();
// 返回的 result 为兼容性检测结果。 webRTC 为 true 时表示支持 webRTC，其他属性含义可以参考接口 API 文档。
console.log(result);
// {
//   webRTC: true,
//   customCapture: true,
//   camera: true,
//   microphone: true,
//   videoCodec: { H264: true, H265: false, VP8: true, VP9: true },
//   screenSharing: true,
//   errInfo: {}
// }
```

返回结果的各参数含义，请参考 [ZegoCapabilityDetection](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~interface~ZegoCapabilityDetection) 接口下的参数描述。
</Accordion>

<a id="createroom"></a>

### 登录房间

**1. 生成 Token**

登录房间需要用于验证身份的 Token，开发者可直接在 [ZEGO 控制台](https://console.zego.im/dashboard)获取临时 Token（有效期为 24 小时）来使用，详情请参考 [控制台 - 开发辅助](/console/development-assistance/temporary-token)。

<Note title="说明">



临时 Token 仅供调试，正式上线前，请从开发者的业务服务器生成 Token，详情可参考 [使用 Token 鉴权](/real-time-video-web/communication/using-token-authentication)。

</Note>





**2. 登录房间**

调用 [loginRoom ](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#login-room) 接口，传入房间 ID 参数 “roomID”、“token” 和用户参数 “user”，登录房间。如果房间不存在，调用该接口时会创建并登录此房间。

<Warning title="注意">


- “roomID”、“userID” 和 “userName” 参数的取值都为自定义。
- “roomID” 和 “userID” 都必须唯一，建议开发者将 “userID” 设置为一个有意义的值，可将其与自己的业务账号系统进行关联。
- “userID” 必须与生成 token 时传入的 userID 保持一致，否则登录失败。
- 在登录房间之前请设置房间相关的回调监听，成功登录房间后，即可接收房间相关的事件通知。

</Warning>



```javascript
// 登录房间，成功则返回 true
// userUpdate 设置为 true 会开启监听 roomUserUpdate 回调，默认情况下不会开启该监听
const result = await zg.loginRoom(roomID, token, { userID: userID, userName: userName}, {userUpdate: true});
```

**3. 监听登录房间后的事件回调**

您可以监听 [roomStateChanged](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~interface~ZegoRTMEvent#room-state-changed) 回调实时监控自己与房间的连接状态。只有当房间状态是连接成功时，才能进行推流、拉流等操作。如果登录房间失败，可参考 [错误码](https://doc-zh.zego.im/article/5696) 进行操作。


<a id="publishingStream"></a>

### 推流

**1. 创建流**

a. 开始推流前需要创建本端的音视频流，调用 [createZegoStream](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#create-zego-stream) 接口，默认会采集摄像头画面和麦克风声音。

通过 localStream 的 [playAudio](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoStreamView#play-audio) 接口，创建本地媒体流播放组件，播放待推送或者已经成功推流的音频；也可以通过 video 元素 srcObject 属性赋值 `localStream.stream` 进行播放。

<Warning title="注意">


调用 [createZegoStream](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#create-zego-stream) 接口后，需要等待 ZEGO 服务器返回 [ZegoLocalStream](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoLocalStream) 实例对象 localStream 后才能执行后续操作。

</Warning>



```javascript
// 调用 createZegoStream 接口后，需要等待 ZEGO 服务器返回 ZegoLocalStream 实例对象才能执行后续操作
const localStream = await zg.createZegoStream({camera :{audio:true,video:false}});
// 调用 localStream 实例上 playAudio 方法播放推流前或者推流中音频预览
localStream.playAudio();
```

b. （可选）设置音频采集参数

<Accordion title="通过属性设置相关采集参数" defaultOpen="false">
可根据需要通过 [createZegoStream](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#create-zego-stream) 接口中的如下属性设置音频相关采集参数：

- [camera](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoStreamOptions#camera)：摄像头麦克风采集流相关配置

- [screen](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoStreamOptions#screen)：屏幕捕捉采集流相关配置

- [custom](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoStreamOptions#custom)：第三方流采集相关配置
</Accordion>

c. （可选）在页面上渲染 MediaStream（媒体流）

<Accordion title="不同框架音视频渲染" defaultOpen="false">
不同框架下渲染有所不同，请参考 [使用 Vue 实现音视频功能](/real-time-video-web/best-practice/framework/vue)、[使用 Angular 实现音视频功能](/real-time-video-web/best-practice/framework/angular)、[使用 React 实现音视频功能](/real-time-video-web/best-practice/framework/react)、[使用 uni-app 实现音视频功能](/real-time-video-web/best-practice/framework/uni-app)。
</Accordion>

**2. 开始推流**

调用 [startPublishingStream](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#start-publishing-stream) 接口，传入流 ID 参数 “streamID” 和创建流得到的流对象 “localStream”，向远端用户发送本端的音视频流。

<Warning title="注意">

- “streamID” 参数的取值为自定义，需要在整个 AppID 内全局唯一。
- 若需要推多条流，则多次调用 [startPublishingStream](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#start-publishing-stream) 接口即可，需确保每条流的 “streamID” 不相同。

</Warning>



```javascript
// localStream 为创建流获取的 MediaStream 对象
zg.startPublishingStream(streamID, localStream)
```


**3. 监听推流后的事件回调**

根据实际应用需要，在推流后监听想要关注的事件通知，比如推流状态更新、推流质量等。

- [publisherStateUpdate](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~interface~ZegoRTCEvent#publisher-state-update)：推流状态更新回调。调用推流接口成功后，当推流状态发生变更（如出现网络中断导致推流异常等情况），SDK 在重试推流的同时，会通过该回调通知。
- [publishQualityUpdate](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~interface~ZegoRTCEvent#publish-quality-update)：推流质量回调。调用推流接口成功后，定时回调音视频流质量数据（如分辨率、帧率、码率等）。

```javascript
zg.on('publisherStateUpdate', result => {
    // 推流状态更新回调
    // ...
})

zg.on('publishQualityUpdate', (streamID, stats) => {
    // 推流质量回调
    // ...
})
```

### 拉流

**1. 开始拉流**

a. 调用 [startPlayingStream](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#start-playing-stream) 接口，根据传入的流 ID 参数 “streamID”，拉取远端已推送到 ZEGO 服务器的音视频画面。

远端用户推送的 “streamID” 可以从 [roomStreamUpdate](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~interface~ZegoRTCEvent#room-stream-update) 回调中获得。

```javascript
const remoteStream = await zg.startPlayingStream(streamID);

// remoteAudio为本地<video>或<audio>对象
remoteAudio.srcObject = remoteStream;
```

b. （可选）在页面上渲染 MediaStream（媒体流）

<Accordion title="不同框架音视频渲染" defaultOpen="false">
不同框架下渲染有所不同，请参考 [使用 Vue 实现音视频功能](/real-time-video-web/best-practice/framework/vue)、[使用 Angular 实现音视频功能](/real-time-video-web/best-practice/framework/angular)、[使用 React 实现音视频功能](/real-time-video-web/best-practice/framework/react)、[使用 uni-app 实现音视频功能](/real-time-video-web/best-practice/framework/uni-app)。
</Accordion>

<Warning title="注意">



- “streamID” 需要在整个 AppID 内全局唯一。
- remoteAudio 可以是页面的 video 或 audio 对象，最终预览效果会在此体现，建议 audio 对象加上 autoplay 属性。
- 部分浏览器因策略问题，需先将  video 或 audio  静音后才允许自动播放，这种情况建议开发者引导用户手动点击来关闭静音。
- 由于 iOS 系统对  video 或 audio  的限制自动播放策略（该策略需要业务层做特殊处理），该系统下 Web 端无法自动播放视频，用户需要手动触发播放事件。


</Warning>



**2. 监听拉流后的事件回调**

根据实际应用需要，在拉流后监听想要关注的事件通知，如拉流状态变更、拉流质量等。

- [playerStateUpdate](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~interface~ZegoRTCEvent#player-state-update)：拉流状态更新回调。调用拉流接口成功后，当拉流状态发生变更（如出现网络中断导致推流异常等情况），SDK 在重试推流的同时，会通过该回调通知。
- [playQualityUpdate](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~interface~ZegoRTCEvent#player-state-update)：拉流质量回调。调用拉流接口成功后，定时回调音视频流质量数据（如分辨率、帧率、码率等）。

```javascript
zg.on('playerStateUpdate', result => {
    // 拉流状态更新回调
    // ...
})

zg.on('playQualityUpdate', (streamID,stats) => {
    // 拉流质量回调
})
```

### 体验实时音视频功能

在真机中运行项目，运行成功后，可以看到本端视频画面。

为方便体验，ZEGO 提供了一个 [Web 端调试示例 ](https://zegodev.github.io/zego-express-webrtc-sample/assistDev/index.html)，在该页面下，输入相同的 AppID、RoomID，输入不同的 UserID、以及对应的 [Token](/console/development-assistance/temporary-token)，即可加入同一房间与真机设备互通。当成功开始音视频通话时，可以听到远端的音频，看到远端的视频画面。


### 停止音视频通话


**1. 停止推流**

调用 [stopPublishingStream](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#stop-publishing-stream) 接口停止向远端用户发送本端的音视频流。

```javascript
zg.stopPublishingStream(streamID)
```

**2. 销毁流**

调用 [destroyStream](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#destroy-stream) 接口销毁创建的流数据，销毁流后开发需自行销毁 audio（停止采集）。

```javascript
// localStream 是调用 createZegoStream 接口获取的 ZegoLocalStream 实例对象
zg.destroyStream(localStream)
```

**3. 停止拉流**

调用 [stopPlayingStream](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#stop-playing-stream) 接口停止拉取远端推送的音视频流。

<Warning title="注意">


如果开发者通过 [roomStreamUpdate](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~interface~ZegoRTCEvent#room-stream-update) 回调收到了音视频流 “减少” 的通知，请及时调用 [stopPlayingStream ](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#stop-playing-stream) 接口停止拉流，避免拉到空流、产生额外的成本；或者，开发者可以根据自己的业务需求，选择合适的时机，主动调用 [stopPlayingStream ](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#stop-playing-stream) 接口停止拉流。

</Warning>



```javascript
zg.stopPlayingStream(streamID)
```

**4. 退出房间**

调用 [logoutRoom](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#logout-room) 接口退出房间。
```javascript
zg.logoutRoom(roomID)
```

**5. 销毁引擎**

如果用户彻底不使用音视频功能时，可调用 [destroyEngine ](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#destroy-engine) 接口销毁引擎，释放麦克风、摄像头、内存、CPU 等资源。
```javascript
zg.destroyEngine()
zg = null
```
