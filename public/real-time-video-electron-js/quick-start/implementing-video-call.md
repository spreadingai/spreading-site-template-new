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

- 已在项目中集成 ZEGO Express SDK，实现基本的实时音视频功能，详情请参考 [快速开始 - 集成](https://doc-zh.zego.im/article/1240)。
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

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/QuickStart/quickstart_uml.png" /></Frame>


<a id="createEngine"></a>

### 创建引擎

**1. 创建界面（可选）**

<Accordion title="添加界面元素" defaultOpen="false">
在开始之前，推荐开发者添加以下界面元素，方便实现基本的实时音视频功能。

- 本地预览窗口
- 远端视频窗口
- 结束按钮

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/QuickStart/UI_PC.jpg" /></Frame>
</Accordion>

**2. 初始化引擎**

使用 [createEngine](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_electron~class~ZegoExpressEngine#create-engine) 方法，将申请到的 AppID 和 AppSign 传入参数 “appID” 和 “appSign”。

<Warning title="注意">


SDK 同时也支持 Token 鉴权，若您对项目安全性有更高要求，建议您升级鉴权方式，可参考 [如何从 AppSign 鉴权升级为 Token 鉴权](http://doc-zh.zego.im/faq/token_upgrade?product=ExpressVideo)。

</Warning>



```js
// 引入 ZegoExpressEngine
const zgEngine = window.require('zego-express-engine-electron/ZegoExpressEngine');
const zgDefines = window.require('zego-express-engine-electron/ZegoExpressDefines');

// 采用通用场景
const profile = {
appID : xxx,
appSign : "xxx",
scenario : zgDefines.ZegoScenario.Default
};

zgEngine.createEngine(profile)
.then(() => {
    console.log("init succeed")
}).catch((e) => {
    console.log("init failed", e)
});
```

**3. 设置回调**


关于回调的注册和取消，请参考 [设置回调](https://doc-zh.zego.im/article/21395)

<Warning title="注意">


为避免错过事件通知，建议在创建引擎后立即注册回调

</Warning>








<a id="loginRoom"></a>

### 登录房间

**1. 登录**

调用 [loginRoom ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_electron~class~ZegoExpressEngine#login-room) 接口，传入房间 ID 参数 “roomID” 和用户参数 “user”，登录房间。如果房间不存在，调用该接口时会创建并登录此房间。

- 同一个 AppID 内，需保证 “roomID” 信息的全局唯一。
- 同一个 AppID 内，需保证 “userID” 全局唯一，建议开发者将其设置成一个有意义的值，可将 “userID” 与自己业务账号系统进行关联。
- “userID” 不能为 “null”，否则会导致登录房间失败。


```js
zgEngine.loginRoom("TheRoomID",  { userID: "TheUserID", userName: "TheUserName"});
```


**2. 监听登录房间后的事件回调**

根据实际应用需要，在登录房间后监听想要关注的事件通知，比如房间状态更新、用户状态更新、流状态更新等。

- [onRoomStateUpdate](https://doc-zh.zego.im/article/21395#onRoomStateUpdate)：房间状态更新回调。登录房间后，当房间连接状态发生变更（如出现房间断开，登录认证失败等情况），SDK 会通过该回调通知。
- [onRoomUserUpdate](https://doc-zh.zego.im/article/21395#onRoomUserUpdate)：用户状态更新回调。登录房间后，当房间内有用户新增或删除时，SDK 会通过该回调通知。

    只有调用 [loginRoom](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_electron~class~ZegoExpressEngine#login-room) 接口登录房间时传入 [ZegoRoomConfig](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_electron~struct~ZegoRoomConfig) 配置，且 “isUserStatusNotify” 参数取值为 “true” 时，用户才能收到 [onRoomUserUpdate](https://doc-zh.zego.im/article/21395#onRoomUserUpdate) 回调。


- [onRoomStreamUpdate](https://doc-zh.zego.im/article/21395#onRoomStreamUpdate)：流状态更新回调。登录房间后，当房间内有用户新推送或删除音视频流时，SDK 会通过该回调通知。

<Warning title="注意">


- 只有调用 [loginRoom](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_electron~class~ZegoExpressEngine#login-room) 接口登录房间时传入 [ZegoRoomConfig](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_electron~struct~ZegoRoomConfig) 配置，且 “isUserStatusNotify” 参数取值为 “true” 时，用户才能收到 [onRoomUserUpdate](https://doc-zh.zego.im/article/21395#onRoomUserUpdate) 回调。
- 通常情况下，如果某个用户想要播放其他用户推送的视频，可以在收到流状态更新（新增）的回调中，调用 [startPlayingStream](https://doc-zh.zego.im/article/api?doc=express-video-sdk_API~javascript_electron~class~ZegoExpressEngine#start-playing-stream) 接口拉取远端推送的音视频流。

</Warning>





```js
// 以下为常用的房间相关回调
// 房间状态更新回调
zgEngine.on("onRoomStateUpdate", (param)=>{
    // 根据需要实现事件回调
});

// 用户状态更新回调
zgEngine.on("onRoomUserUpdate", (param)=>{
    // 根据需要实现事件回调
});

// 流状态更新回调
zgEngine.on("onRoomStreamUpdate", (param)=>{
    // 根据需要实现事件回调
});
```

<a id="startPublishingStream"></a>

### 推流

**1. 开始推流**

调用 [startPublishingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_electron~class~ZegoExpressEngine#start-publishing-stream) 接口，传入流 ID 参数 “streamID”，向远端用户发送本端的音视频流。

<Warning title="注意">


同一个 AppID 内，需保证 “streamID” 全局唯一。如果同一个 AppID 内，不同用户各推了一条 “streamID” 相同的流，会导致后推流的用户推流失败。
</Warning>



```js
// 开始推流
zgEngine.startPublishingStream("streamID");
```

**2. 启用本地预览（可选）**

<Accordion title="设置预览视图并启动本地预览" defaultOpen="false">
如果希望看到本端的画面，可调用 [startPreview](https://doc-zh.zego.im/article/api?doc=express-video-sdk_API~javascript_electron~class~ZegoExpressEngine#start-preview) 接口设置预览视图，并启动本地预览。

```js
// 取一个canvas元素
let localCanvas = document.getElementById("localCanvas");

// 启动本地预览
zgEngine.startPreview({
    canvas: localCanvas,
});
```
</Accordion>

**3. 监听推流后的事件回调**

根据实际应用需要，在推流后监听想要关注的事件通知，比如推流状态更新等。

[onPublisherStateUpdate](https://doc-zh.zego.im/article/21395#onPublisherStateUpdate)：推流状态更新回调。调用推流接口成功后，当推流状态发生变更（如出现网络中断导致推流异常等情况），SDK 在重试推流的同时，会通过该回调通知。

```js
// 常用的推流相关回调
// 推流状态更新回调
zgEngine.on("onPublisherStateUpdate", (param)=>{
    // 根据需要实现事件回调
});
```

<Note title="说明">如果您需要了解 ZEGO Express SDK 的摄像头/视频/麦克风/音频/扬声器相关接口，请参考 [常见问题 - 如何实现开关摄像头/视频画面/麦克风/音频/扬声器？](http://doc-zh.zego.im/faq/How_to_switch_devices)。</Note>

### 拉流

**1. 开始拉流**

调用 [startPlayingStream](https://doc-zh.zego.im/article/api?doc=express-video-sdk_API~javascript_electron~class~ZegoExpressEngine#start-playing-stream) 接口，根据传入的流 ID 参数 “streamID”，拉取远端推送的音视频流。

```js
// 取一个canvas元素
let remoteCanvas = document.getElementById("remoteCanvas");
// 开始拉流
zgEngine.startPlayingStream("streamID", {
    canvas: remoteCanvas,
});
```

**2. 监听拉流后的事件回调**


根据实际应用需要，在拉流后监听想要关注的事件通知，比如拉流状态更新等。

[onPlayerStateUpdate](https://doc-zh.zego.im/article/21395#onPlayerStateUpdate)：拉流状态更新回调。调用拉流接口成功后，当拉流状态发生变更（如出现网络中断导致推流异常等情况），SDK 在重试拉流的同时，会通过该回调通知。

```js
// 常用的拉流相关回调
// 拉流状态相关回调
zgEngine.on("onPlayerStateUpdate", (param)=>{
    // 根据需要实现事件回调
});
```

### 在线测试推拉流功能

在真机中运行项目，运行成功后，可以看到本端视频画面。

为方便体验，ZEGO 提供了一个 [Web 端调试示例](https://zegodev.github.io/zego-express-webrtc-sample/assistDev/index.html)，在该页面下，输入相同的 AppID、RoomID，输入不同的 UserID、以及对应的 [Token](/console/development-assistance/temporary-token)，即可加入同一房间与真机设备互通。当成功开始音视频通话时，可以听到远端的音频，看到远端的视频画面。


<a id="stopPublishingStream"></a>

### 停止推拉流

**1. 停止推流/预览**

调用 [stopPublishingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_electron~class~ZegoExpressEngine#stop-publishing-stream) 接口停止向远端用户发送本端的音视频流。

```js
// 停止推流
zgEngine.stopPublishingStream();
```

如果启用了本地预览，调用 `stopPreview` 接口停止预览。

```js
// 停止本地预览
zgEngine.stopPreview();
```

**2. 停止拉流**

调用 [stopPlayingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_electron~class~ZegoExpressEngine#stop-playing-stream) 接口停止拉取远端推送的音视频流。

<Warning title="注意">
如果开发者通过 [onRoomStreamUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_electron~class~ZegoExpressEngine#on-room-stream-update) 回调收到了音视频流 “减少” 的通知，请及时调用 [stopPlayingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_electron~class~ZegoExpressEngine#stop-playing-stream) 接口停止拉流，避免拉到空流、产生额外的成本；或者，开发者可以根据自己的业务需求，选择合适的时机，主动调用 [stopPlayingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_electron~class~ZegoExpressEngine#stop-playing-stream) 接口停止拉流。
</Warning>

```js
// 停止拉流
zgEngine.stopPlayingStream("streamID");
```

### 退出房间

调用 [logoutRoom](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_electron~class~ZegoExpressEngine#logout-room) 接口退出房间。

```js
// 退出房间
zgEngine.logoutRoom("TheRoomID");
```

### 销毁引擎
调用 [destroyEngine](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_electron~class~ZegoExpressEngine#destroy-engine) 接口销毁引擎，用于释放 SDK 使用的资源。

```js
// 销毁引擎
zgEngine.destroyEngine();
```

## 常见问题

1. **Electron 集成的最新版本谷歌内核显卡渲染加速，导致看不到本地预览和拉流画面，但是 CDN 拉流画面是正常的，该如何解决？**

    目前解决该问题的方案主要有两个：

    - 禁用显卡加速：通过禁用显卡加速，不使用谷歌内核显卡渲染加速功能，可以正常观看到本地预览和拉流画面。
    - 更换旧版本 Electron：升级 Electron 版本，以适配最新版本谷歌内核显卡渲染加速功能。

2. **当集成 SDK 并使用 Electron9-13 系列版本打包应用后，出现使用 DevTools 的 reload 导致界面 crash、或者出现收不到 SDK 回调的问题，该如何解决？**

    由于高版本的 Electron（Electron9 或以上版本），允许页面多次加载 Node modules，进而可能会导致 Node Addon module 的底层上下文被多次应用、而产生无法预知的问题。所以在 Electron9 ~ Electron14 之间的版本，可以通过以下方式处理：

    在主进程 js 中，设置如下页面属性：`app.allowRendererProcessReuse = false`。（注意：这个属性在 Electron14 或以上版本被废弃，所以 Electron14 或以上版本仍然存在这个问题，暂时无法解决。）

3. **macOS Monterey(12.2.1) 及以上版本运行 electron 应用导致摄像头、麦克风等设备不能使用或者 crash？**

    如何解决此问题，详情请参考 [FAQ](http://doc-zh.zego.im/faq/macOS_Monterey_v12.2.1_access_solution?product=ExpressVideo&platform=electron)。

4. **在 Linux 操作系统上集成 SDK，且使用 electron-builder 或其它打包工具打包后的应用，出现报错`sand-box`，该如何解决？**

    <Warning title="注意">
    如需使用 Linux 平台，请联系 ZEGO 技术支持。
    </Warning>

    由于 Linux 系统下，Google Chrome 浏览器的安全性限制问题，需要通过以下方式处理该问题：

    - **方式 1**: 在项目根目录下执行：`sudo chown root ./node_modules/electron/dist/chrome-sandbox && sudo chmod 4755 ./node_modules/electron/dist/chrome-sandbox`。
    - **方式 2**：在 Linux 命令行启动 Electron 程序时，添加命令行参数`--no-sandbox`。
    - **方式 3**：如果是在 Debian 系统下，通过以下方式处理 `sudo sysctl -w kernel.unprivileged_userns_clone=1`。

5. **为什么 canvas 已经设置了宽、高，但最终的拉流画面却被放大了？**

    由于不同的机型差异，设置 canvas 的宽、高后，拉流画面效果有一定的差异。此时，还需要设置 style 中的宽、高，即可保证拉流画面正常。
