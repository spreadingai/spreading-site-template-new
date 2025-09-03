# 使用 Angular 实现音视频功能（Web）

---
## 功能简介

本文将介绍如何快速使用 Angular 实现一个简单的实时音视频通话。

相关概念解释:
- ZEGO Express SDK：由 ZEGO 提供的实时音视频 SDK，能够为开发者提供便捷接入、高清流畅、多平台互通、低延迟、高并发的音视频服务。
- 推流：把采集阶段封包好的音视频数据流传输到 ZEGO 实时音视频云的过程。
- 拉流：从 ZEGO 实时音视频云将已有音视频数据流进行拉取的过程。

## 前提条件

在实现基本的实时音视频功能之前，请确保：

- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppID 和 Server 地址，详情请参考 [控制台 - 项目信息](/console/project-info)。
- 已在项目中集成 ZEGO Express SDK，并实现了基本的音视频推拉流功能，详情请参考 [快速开始 - 集成](https://doc-zh.zego.im/article/199) 和 [快速开始 - 实现流程](https://doc-zh.zego.im/article/7638)。

## 示例源码下载

请参考 [下载示例源码](/real-time-video-web/quick-start/run-example-code) 获取源码。

相关源码请查看 “/express-demo-web/src/Examples/Framework/Angular/angular” 目录下的文件。


## 使用步骤

<Note title="说明">


当前项目使用的 Node 版本为 14.17.3，Angular/cli 版本为 12.1.4。

</Note>



以用户 A 拉取用户 B 的流为例，流程如下图：

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Common/ZegoExpressEngine/common_usage_zh_Web.png" /></Frame>

整个推拉流过程的 API 调用时序如下图：

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/QuickStart/quickstart_uml_web_new1.png" /></Frame>

### 创建引擎

#### （可选）创建界面

<Accordion title="添加界面元素" defaultOpen="false">
在创建引擎之前，推荐开发者添加以下界面元素，方便实现基本的实时音视频功能。

- 本地预览窗口
- 远端视频窗口
- 结束按钮

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/QuickStart/UI_PC.jpg" /></Frame>
</Accordion>

#### 创建引擎

创建 [ZegoExpressEngine ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine) 引擎实例，将申请到的 AppID 传入参数 “appID”，将接入服务器地址传入参数 “server”。

<Note title="说明">
- “server” 为接入服务器地址，获取的方式请参考
[控制台 - 项目信息](/console/project-info#配置信息) 。
- 3.6.0 版本及以上 SDK，server 可以改成空字符、null、undefined 或者随意字符，但不能不填。
</Note>

```javascript
// 初始化实例
export class AppComponent {
    zg:any = null;

    createZegoExpressEngine() {
        this.zg = new ZegoExpressEngine(appID, server);
    }
}
```

#### （可选）监听事件回调

<Accordion title="注册回调" defaultOpen="false">
如果需要注册回调，开发者可根据实际需要，实现 ZegoEvent（包含 [ZegoRTCEvent](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoRTCEvent) 和 [ZegoRTMEvent](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoRTMEvent)）中的某些方法，创建引擎后可通过调用 [on](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#on) 接口设置回调。


```javascript
this.zg.on('roomStateChanged', (roomID, reason, errorCode, extendData) => {
        if (reason == ZegoRoomStateChangedReason.Logining) {
            // 登录中
        } else if (reason == ZegoRoomStateChangedReason.Logined) {
            // 登录成功
            //只有当房间状态是登录成功或重连成功时，推流（startPublishingStream）、拉流（startPlayingStream）才能正常收发音视频
            //将自己的音视频流推送到 ZEGO 音视频云
        } else if (reason == ZegoRoomStateChangedReason.LoginFailed) {
            // 登录失败
        } else if (reason == ZegoRoomStateChangedReason.Reconnecting) {
            // 重连中
        } else if (reason == ZegoRoomStateChangedReason.Reconnected) {
            // 重连成功
        } else if (reason == ZegoRoomStateChangedReason.ReconnectFailed) {
            // 重连失败
        } else if (reason == ZegoRoomStateChangedReason.Kickout) {
            // 被踢出房间
        } else if (reason == ZegoRoomStateChangedReason.Logout) {
            // 登出成功
        } else if (reason == ZegoRoomStateChangedReason.LogoutFailed) {
            // 登出失败
        }
});
```
</Accordion>

### （可选）检测兼容性

<Accordion title="检测兼容性" defaultOpen="false">
在实现推拉流功能之前，开发者可以调用 [checkSystemRequirements](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#check-system-requirements) 接口检测浏览器的兼容性。

SDK 支持的浏览器兼容版本，请参考 [下载示例源码](/real-time-video-web/quick-start/run-example-code#准备环境) 的 “准备环境”。

```js
const result = await this.zg.checkSystemRequirements();
// 返回的 result 为兼容性检测结果。 webRTC 为 true 时表示支持 webRTC，其他属性含义可以参考接口 API 文档
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

返回结果的各参数含义，请参考 [ZegoCapabilityDetection](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoCapabilityDetection) 接口下的参数描述。
</Accordion>


### 登录房间

#### 生成 Token

登录房间需要用于验证身份的 Token，获取方式请参考 [使用 Token 鉴权](/real-time-video-web/communication/using-token-authentication)。如需快速调试，可使用控制台生成临时 Token。


#### 登录房间

调用 [loginRoom ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#login-room) 接口，传入房间 ID 参数 “roomID”、“token” 和用户参数 “user”，根据实际情况传入参数 “config”，登录房间。

<Warning title="注意">


- 在登录房间之前，请先注册登录房间后需要监听的所有回调。成功登录房间后，即可接收相关的回调。
- “roomID”、“userID” 和 “userName” 参数的取值都为自定义。
- “roomID” 和 “userID” 都必须唯一，建议开发者将 “userID” 设置为一个有意义的值，可将其与业务账号系统进行关联。

</Warning>



```javascript
// 登录房间，成功则返回 true
// userUpdate 设置为 true 会开启监听 roomUserUpdate 回调，默认情况下不会开启该监听
const result = await this.zg.loginRoom(roomID, token, {userID, userName}, {userUpdate: true});
```

#### 监听登录房间后的事件回调

根据实际应用需要，在登录房间前监听想要关注的事件通知，比如房间状态更新、用户状态更新、流状态更新等。

- [roomStateChanged](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoRTMEvent#room-state-changed)：房间状态更新回调。登录房间后，当房间连接状态发生变更（如出现房间断开，登录认证失败等情况），SDK 会通过该回调通知。
- [roomUserUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoRTMEvent#room-user-update)：用户状态更新回调。登录房间后，当房间内有用户新增或删除时，SDK 会通过该回调通知。

    只有调用 [loginRoom](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#login-room) 接口登录房间时传入 [ZegoRoomConfig](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoRoomConfig) 配置，且 “userUpdate” 参数取值为 “true” 时，用户才能收到 [roomUserUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoRTMEvent#room-user-update) 回调。

- [roomStreamUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoRTCEvent#room-stream-update)：流状态更新回调。登录房间后，当房间内有用户新推送或删除音视频流时，SDK 会通过该回调通知。

<Warning title="注意">



通常情况下，如果某个用户想要播放其他用户推送的视频，可以在收到流状态更新（新增）的回调中，调用 [startPlayingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#start-playing-stream) 接口拉取远端推送的音视频流。

</Warning>



```javascript
// 房间状态更新回调
this.zg.on('roomStateChanged', (roomID, reason, errorCode, extendData) => {
        if (reason == ZegoRoomStateChangedReason.Logining) {
            // 登录中
        } else if (reason == ZegoRoomStateChangedReason.Logined) {
            // 登录成功
            //只有当房间状态是登录成功或重连成功时，推流（startPublishingStream）、拉流（startPlayingStream）才能正常收发音视频
            //将自己的音视频流推送到 ZEGO 音视频云
        } else if (reason == ZegoRoomStateChangedReason.LoginFailed) {
            // 登录失败
        } else if (reason == ZegoRoomStateChangedReason.Reconnecting) {
            // 重连中
        } else if (reason == ZegoRoomStateChangedReason.Reconnected) {
            // 重连成功
        } else if (reason == ZegoRoomStateChangedReason.ReconnectFailed) {
            // 重连失败
        } else if (reason == ZegoRoomStateChangedReason.Kickout) {
            // 被踢出房间
        } else if (reason == ZegoRoomStateChangedReason.Logout) {
            // 登出成功
        } else if (reason == ZegoRoomStateChangedReason.LogoutFailed) {
            // 登出失败
        }
});

// 用户状态更新回调
this.zg.on('roomUserUpdate', (roomID, updateType, userList) => {
    console.warn(
        `roomUserUpdate: room ${roomID}, user ${updateType === 'ADD' ? 'added' : 'left'} `,
        JSON.stringify(userList),
    );
});

// 流状态更新回调
// 回调方法具体实现可以参考“视频通话”示例源码文件 /src/Examples/QuickStart/VideoTalk/index.js
this.zg.on('roomStreamUpdate', async (roomID, updateType, streamList, extendedData) => {
    if (updateType == 'ADD') {
        // 流新增，开始拉流
    } else if (updateType == 'DELETE') {
        // 流删除，停止拉流
    }
});
```


### 推流

#### 创建流

1. 开始推流前需要创建本端的音视频流，调用 [createZegoStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#create-zego-stream) 接口，默认会采集摄像头画面和麦克风声音。

<Warning title="注意">


调用 [createZegoStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#create-zego-stream) 接口后，需要等待 ZEGO 服务器返回流媒体对象才能执行后续操作。

</Warning>



HTML 上创建媒体流播放组件的容器 `<div>`。

```html
<div id="local-video" style="width: 320px;height: 240px;"></div>
```

创建流后播放媒体流。

```typescript
// 调用 createZegoStream 接口后，需要等待 ZEGO 服务器返回流媒体对象才能执行后续操作
this.localStream = await this.zg.createZegoStream({
    camera: {
        video: {
          input: videoDeviceID
        },
        audio: {
          input: audioDeviceID
        },
    }
});

```

2. （可选）设置音视频采集参数

<Accordion title="通过属性设置相关采集参数" defaultOpen="false">
可根据需要通过 [createZegoStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#create-zego-stream) 接口中的如下属性设置音视频相关采集参数，详情可参考 [自定义视频采集](/real-time-video-web/video/custom-video-capture)：

- [camera](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoStreamOptions#camera)：摄像头麦克风采集流相关配置。

- [screen](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoStreamOptions#screen)：屏幕捕捉采集流相关配置。

- [custom](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoStreamOptions#custom)：第三方流采集相关配置。
</Accordion>


#### 开始推流

调用 [startPublishingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#start-publishing-stream) 接口，传入流 ID 参数 “streamID” 和创建流得到的流对象 “localStream”，向远端用户发送本端的音视频流。

<Warning title="注意">


- “streamID” 参数的取值为自定义，需要在整个 AppID 内全局唯一。
- 若需要推多条流，则多次调用 [startPublishingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#start-publishing-stream) 接口即可，需确保每条流的 “streamID” 不相同。

</Warning>



```javascript
// localStream 为创建流获取的 MediaStream 对象
this.zg.startPublishingStream(streamID, localStream)
```


#### 监听推流后的事件回调

根据实际应用需要，在推流后监听想要关注的事件通知，比如推流状态更新、推流质量等。

- [publisherStateUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoRTCEvent#publisher-state-update)：推流状态更新回调。调用推流接口成功后，当推流状态发生变更（如出现网络中断导致推流异常等情况），SDK 在重试推流的同时，会通过该回调通知。
- [publishQualityUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoRTCEvent#publish-quality-update)：推流质量回调。调用推流接口成功后，定时回调音视频流质量数据（如分辨率、帧率、码率等）。

```javascript
// 注册 publisherStateUpdate 推流状态更新事件回调。
this.zg.on('publisherStateUpdate',({streamID, state}) => {
    // streamID 为推流的流 ID，state 为推流状态。 可以根据这些状态做一些逻辑处理。
})
// 注册 publishQualityUpdate 推流质量更新事件回调。
this.zg.on('publishQualityUpdate', (streamID, stats) => {
    // stats 对象中可以拿到分辨率、帧率、码率等流质量相关信息做数据展示。
})
```


### 拉流

#### 开始拉流

调用 [startPlayingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#start-playing-stream) 接口，根据传入的流 ID 参数 “streamID”，拉取远端已推送到 ZEGO 服务器的音视频画面。

<Note title="说明">


远端用户推送的 “streamID” 可以从 [roomStreamUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoRTCEvent#room-stream-update) 回调中获得。

</Note>




HTML 上创建媒体流播放组件的容器 `<div>`。

```html
<div id="remote-video" style="width: 320px;height: 240px;"></div>
```
拉取远端流后渲染到标签上。

```javascript
this.remoteStream = await this.zg.startPlayingStream(streamID,options);

// 创建媒体流播放组件
const remoteView = this.zg.createRemoteStreamView(this.remoteStream);
remoteView.play("remote-video", {enableAutoplayDialog:true});
```

<Warning title="注意">


“streamID” 需要在整个 AppID 内全局唯一。

</Warning>



#### 监听拉流后的事件回调

根据实际应用需要，在拉流后监听想要关注的事件通知，如拉流状态变更、拉流质量等。

- [playerStateUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoRTCEvent#player-state-update)：拉流状态更新回调。调用拉流接口成功后，当拉流状态发生变更（如出现网络中断导致推流异常等情况），SDK 在重试推流的同时，会通过该回调通知。
- [playQualityUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoRTCEvent#play-quality-update)：拉流质量回调。调用拉流接口成功后，定时回调音视频流质量数据（如分辨率、帧率、码率等）。

```javascript
// 注册 playerStateUpdate 拉流状态更新事件回调。
this.zg.on('playerStateUpdate',({streamID, state}) => {
    // streamID 为拉流的流 ID，state 为拉流状态。 可以根据这些状态做一些逻辑处理。
})
// 注册 playQualityUpdate 拉流质量更新事件回调。
this.zg.on('playQualityUpdate', (streamID, stats) => {
    // stats 对象中可以拿到分辨率、帧率、码率等流质量相关信息做数据展示。
})
```

### 体验实时音视频功能

在真机中运行项目，运行成功后，可以看到本端视频画面。

为方便体验，ZEGO 提供了一个 [Web 端调试示例 ](https://zegodev.github.io/zego-express-webrtc-sample/assistDev/index.html)，在该页面下，输入相同的 AppID、RoomID，输入不同的 UserID、以及对应的 [Token](/console/development-assistance/temporary-token)，即可加入同一房间与真机设备互通。当成功开始音视频通话时，可以听到远端的音频，看到远端的视频画面。


### 停止推拉流

#### 停止推流

调用 [stopPublishingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#stop-publishing-stream) 接口停止向远端用户发送本端的音视频流。

```javascript
this.zg.stopPublishingStream(streamID)
```

#### 销毁流

调用 [destroyStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#destroy-stream) 接口销毁创建的流数据，销毁流后开发需自行销毁 video（停止采集）。

```javascript
// localStream 是调用 createZegoStream 接口获取的 MediaStream 对象
this.zg.destroyStream(localStream)
```

#### 停止拉流

调用 [stopPlayingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#stop-playing-stream) 接口停止拉取远端推送的音视频流。

```javascript
this.zg.stopPlayingStream(streamID)
```

### 退出房间

调用 [logoutRoom](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#logout-room) 接口退出房间。

```javascript
this.zg.logoutRoom(roomID)
```


<Content />

