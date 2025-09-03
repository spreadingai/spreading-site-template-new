# 实现视频通话

---


## 功能简介

<Warning title="注意">


本文档适用于以下平台： Android、iOS、Windows、Web、Linux。

</Warning>


本文将介绍如何快速实现一个简单的实时音视频通话。

相关概念解释:

- ZEGO Express SDK：由 ZEGO 提供的实时音视频 SDK，能够为开发者提供便捷接入、高清流畅、多平台互通、低延迟、高并发的音视频服务。
- 流：指一组按指定编码格式封装，不断发送中的音视频数据。一个用户可以同时推多条流（例如，一条推摄像头数据一条推屏幕共享数据）也可以同时拉多条流。每条流都由一个流 ID（streamID）标识。
- 推流：把采集阶段封包好的音视频数据流推送到 ZEGO 实时音视频云的过程。
- 拉流：从 ZEGO 实时音视频云将已有音视频数据流拉取播放的过程。
- 房间：是 ZEGO 提供的音视频空间服务，用于组织用户群，同一房间内的用户可以互相收发实时音视频及消息。
    1. 用户需要先登录某个房间，才能进行推流、拉流操作。
    2. 用户只能收到自己所在房间内的相关消息（用户进出、音视频流变化等）。
    3. 每个房间由一个 AppID 内唯一的 AppID 标识。所所有使用同一个 AppID 登录房间的用户即属于同一个房间。



更多相关概念请参考 [术语说明](/glossary/term-explanation)。


## 前提条件

在实现基本的实时音视频功能之前，请确保：

- 已在项目中集成 ZEGO Express SDK，实现基本的实时音视频功能，详情请参考 [快速开始 - 集成](https://doc-zh.zego.im/article/1241)。
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

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/QuickStart/quickstart_uml_createEngineWithProfile_2.png" /></Frame>

<a id="CreateEngine"> </a>

### 1 创建引擎

**1. 创建界面（可选）**

<Accordion title="添加界面元素" defaultOpen="false">
在开始之前，推荐开发者添加以下界面元素，方便实现基本的实时音视频功能。

- 本地预览窗口
- 远端视频窗口
- 结束按钮

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/QuickStart/UI.jpg" /></Frame>
</Accordion>

**2. 引入 SDK**

在项目中引入 SDK。

```dart
import 'package:zego_express_engine/zego_express_engine.dart';
```

**3. 创建引擎**

调用 [createEngineWithProfile](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngine/createEngineWithProfile.html) 接口，将申请到的 AppID 和 AppSign 传入参数 “appID” 和 “appSign”。 为防止 “appsign” 暴露，Web 平台请勿传入 “appsign”。

<Warning title="注意">


SDK 同时也支持 Token 鉴权，若您对项目安全性有更高要求，建议您升级鉴权方式，可参考 [如何从 AppSign 鉴权升级为 Token 鉴权](http://doc-zh.zego.im/faq/token_upgrade?product=ExpressVideo)。

</Warning>




```dart
ZegoEngineProfile profile = ZegoEngineProfile(
    appID, // 请通过官网注册获取，格式为：1234567890
    ZegoScenario.General, // 通用场景接入
    appSign: appSign，// 请通过官网注册获取，格式为：'0123456789012345678901234567890123456789012345678901234567890123'（共64个字符），Web 平台无需传入
    enablePlatformView: true); //Web 平台需为true
// 创建引擎
ZegoExpressEngine.createEngineWithProfile(profile);
```

**4. 设置回调**

创建引擎后，开发者可以根据需要选择使用匿名函数实现回调函数，并将其赋值给引擎实例对应的回调函数属性以注册回调

<Warning title="注意">


为避免错过事件通知，建议在创建引擎后立即注册回调

</Warning>




<a id="createroom"></a>

### 2 登录房间

**1. 登录**

传入用户 ID 参数 “userID” 创建 ZegoUser 用户对象后，调用 [loginRoom ](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngineRoom/loginRoom.html) 接口，传入房间 ID 参数 “roomID” 和用户参数 “user”，登录房间。如果房间不存在，调用该接口时会创建并登录此房间。

- 同一个 AppID 内，需保证 “roomID” 信息的全局唯一。
- 同一个 AppID 内，需保证 “userID” 全局唯一，建议开发者将其设置成一个有意义的值，可将 “userID” 与自己业务账号系统进行关联。
- “ZegoUser” 的构造方法 [ZegoUser.id](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoUser/ZegoUser.id.html) 会将 “userName” 设为与传的参数 “userID” 一样。“userID” 不能为 “null”，否则会导致登录房间失败。


```dart
// 创建用户对象
ZegoUser user = ZegoUser.id('user1');
// 只有传入 “isUserStatusNotify” 参数取值为 “true” 的 ZegoRoomConfig，才能收到 onRoomUserUpdate 回调。
ZegoRoomConfig config = ZegoRoomConfig.defaultConfig();
config.isUserStatusNotify = true;
// 如果您使用 appsign 的方式鉴权，token 参数不需填写；如果需要使用更加安全的 鉴权方式： token 鉴权，Web 平台仅支持 token 鉴权，请参考[如何从 AppSign 鉴权升级为 Token 鉴权](https://doc-zh.zego.im/faq/token_upgrade?product=ExpressVideo&platform=all)
// config.token = "xxxx";
// 开始登录房间
ZegoExpressEngine.instance.loginRoom('room1', user, config: config);
```

**2. 监听登录房间后的事件回调**


根据实际应用需要，在登录房间后监听想要关注的事件通知，比如房间状态更新、用户状态更新、流状态更新等。

- [onRoomStateUpdate](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngine/onRoomStateUpdate.html)：房间状态更新回调。登录房间后，当房间连接状态发生变更（如出现房间断开，登录认证失败等情况），SDK 会通过该回调通知。
- [onRoomUserUpdate](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngine/onRoomUserUpdate.html)：用户状态更新回调。登录房间后，当房间内有用户新增或删除时，SDK 会通过该回调通知。

    只有调用 [loginRoom](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngineRoom/loginRoom.html) 接口登录房间时传入 [ZegoRoomConfig](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoRoomConfig-class.html) 配置，且 “isUserStatusNotify” 参数取值为 “true” 时，用户才能收到 [onRoomUserUpdate](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngine/onRoomUserUpdate.html) 回调。

- [onRoomStreamUpdate](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngine/onRoomStreamUpdate.html)：流状态更新回调。登录房间后，当房间内有用户新推送或删除音视频流时，SDK 会通过该回调通知。

<Warning title="注意">


- 只有调用 [loginRoom](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngineRoom/loginRoom.html) 接口登录房间时传入 [ZegoRoomConfig](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoRoomConfig-class.html) 配置，且 “isUserStatusNotify” 参数取值为 “true” 时，用户才能收到 [onRoomUserUpdate](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngine/onRoomUserUpdate.html) 回调。
- 通常情况下，如果某个用户想要播放其他用户推送的视频，可以在收到流状态更新（新增）的回调中，调用 [startPlayingStream](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePlayer/startPlayingStream.html) 接口拉取远端推送的音视频流。

</Warning>




```dart

// 以下为常用的房间相关回调
// 房间状态更新回调
ZegoExpressEngine.onRoomStateUpdate = (String roomID, ZegoRoomState state, int errorCode, Map<String, dynamic> extendedData) {
    // 根据需要实现事件回调
};

// 用户状态更新
ZegoExpressEngine.onRoomUserUpdate = (String roomID, ZegoUpdateType updateType, List<ZegoUser> userList) {
    // 根据需要实现事件回调
};

// 流状态更新
ZegoExpressEngine.onRoomStreamUpdate = (String roomID, ZegoUpdateType updateType, List<ZegoStream> streamList) {
    // 根据需要实现事件回调
};

```

<a id="publishingStream"></a>

### 3 推流

**1. 开始推流**

调用 [startPublishingStream](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePublisher/startPublishingStream.html) 接口，传入流 ID 参数 “streamID”，向远端用户发送本端的音视频流。

<Warning title="注意">


同一个 AppID 内，需保证 “streamID” 全局唯一。如果同一个 AppID 内，不同用户各推了一条 “streamID” 相同的流，会导致后推流的用户推流失败。

</Warning>



```dart
// 开始推流
ZegoExpressEngine.instance.startPublishingStream("streamID");
```

**2. 启用本地渲染和预览（可选）**

<Accordion title="将画面渲染后启动本地预览" defaultOpen="false">
使用 `createCanvasView` 创建 `widget`，添加到视图后，从 `onViewCreated` 回调返回一个 `viewID`，调用 [startPreview](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePublisher/startPreview.html) 接口传入 `viewID` 启动本地预览

Flutter 的渲染方式有两种：PlatformView 与 TextureRenderer。
- Android、iOS 及 MacOS 可以通过创建引擎时设置 “enablePlatformView” 参数，选择使用 TextureRenderer 还是 PlatformView。
- Web 平台仅支持 PlatformView 的方式，且不存在资源和稳定性问题。
- Windows、Linux 目前仅支持 TextureRenderer 的方式。

<Note title="说明">

与 TextureRenderer 相比，PlatformView 占用资源稍高，且稳定性偏低，但随着 Flutter 版本迭代，鲁棒性不断提高。

</Note>




**createCanvasView接口使用展示**

- 接口内部会根据创建引擎时设置的 “enablePlatformView” 参数及平台支持的方式，自动选择使用 TextureRenderer 或者 PlatformView 。
- Android、iOS 及 MacOS 平台会根据创建引擎时设置 “enablePlatformView” 参数，选择使用 TextureRenderer 还是 PlatformView。
- Web、Windows 和 Linux 不会受创建引擎时设置 “enablePlatformView” 参数影响，只使用支持的方式。

获取预览用的 Widget，然后使用 viewID 创建一个 ZegoCanvas 对象，开始预览。

```dart
// 将此 Widget 加入到页面的渲染树中以显示预览画面
_previewViewWidget = await ZegoExpressEngine.instance.createCanvasView((viewID) {
    _previewViewID = viewID;

    // Set the preview canvas
    ZegoCanvas previewCanvas = ZegoCanvas.view(viewID);

    // Start preview
    ZegoExpressEngine.instance.startPreview(canvas: previewCanvas);
});
```
</Accordion>

**3. 监听推流后的事件回调**


根据实际应用需要，在推流后监听想要关注的事件通知，比如推流状态更新等。

[onPublisherStateUpdate](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngine/onPublisherStateUpdate.html)：推流状态更新回调。调用推流接口成功后，当推流状态发生变更（如出现网络中断导致推流异常等情况），SDK 在重试推流的同时，会通过该回调通知。

```dart
// 常用的推流相关回调
// 推流状态更新回调
ZegoExpressEngine.onPublisherStateUpdate = (String streamID, ZegoPublisherState state, int errorCode, Map<String, dynamic> extendedData) {
    // 根据需要实现事件回调
};
```

<Note title="说明">如果您需要了解 ZEGO Express SDK 的摄像头/视频/麦克风/音频/扬声器相关接口，请参考 [常见问题 - 如何实现开关摄像头/视频画面/麦克风/音频/扬声器？](http://doc-zh.zego.im/faq/How_to_switch_devices)。</Note>

<a id="PlayingStream"></a>

### 4 拉流

调用 [startPlayingStream](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePlayer/startPlayingStream.html) 接口，根据传入的流 ID 参数 “streamID”，拉取远端推送的音视频流，并根据需要渲染拉流画面。

- 若仅需拉音频流，不需要显示拉流画面，可直接调用 [startPlayingStream](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePlayer/startPlayingStream.html) 接口。

```dart
ZegoExpressEngine.instance.startPlayingStream(streamID);
```

- 若需要在拉流的同时，渲染拉流画面，Flutter 的渲染方式有两种：PlatformView 与 TextureRenderer。
    - Android 和 iOS 可以通过创建引擎时设置 “enablePlatformView” 参数，选择使用 TextureRenderer 还是 PlatformView。
    - Web 平台仅支持 PlatformView 的方式，且不存在资源和稳定性问题。
    - Windows、MacOS 目前仅支持 TextureRenderer 的方式。

<Note title="说明">

与 TextureRenderer 相比，PlatformView 占用资源稍高，且稳定性偏低，但随着 Flutter 版本迭代，鲁棒性不断提高。

</Note>


**createCanvasView接口使用展示**

- 接口内部会根据创建引擎时设置的 “enablePlatformView” 参数及平台支持的方式，自动选择使用 TextureRenderer 或者 PlatformView 。
- Android、iOS 及 MacOS 平台会根据创建引擎时设置 “enablePlatformView” 参数，选择使用 TextureRenderer 还是 PlatformView。
- Web、Windows 和 Linux 不会受创建引擎时设置 “enablePlatformView” 参数影响，只使用支持的方式。

获取预览用的 Widget，然后使用 viewID 创建一个 ZegoCanvas 对象，开始预览。

```dart
// 将此 Widget 加入到页面的渲染树中以显示预览画面
_playViewWidget = await ZegoExpressEngine.instance.createCanvasView((viewID) {
    _playViewID = viewID;

    // Set the playing canvas
    ZegoCanvas canvas = ZegoCanvas.view(viewID);

    // Start playing
    ZegoExpressEngine.instance.startPlayingStream(streamID, canvas: canvas);
});
```

**2. 监听拉流后的事件回调**

根据实际应用需要，在拉流后监听想要关注的事件通知，比如拉流状态更新等。

[onPlayerStateUpdate](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngine/onPlayerStateUpdate.html)：拉流状态更新回调。调用拉流接口成功后，当拉流状态发生变更（如出现网络中断导致推流异常等情况），SDK 在重试拉流的同时，会通过该回调通知。

```dart
// 常用的拉流相关回调
// 拉流状态相关回调
ZegoExpressEngine.onPlayerStateUpdate = (String streamID, ZegoPlayerState state, int errorCode, Map<String, dynamic> extendedData) {
    // 根据需要实现事件回调
};
```

### 5 在线测试推拉流功能

在真机中运行项目，运行成功后，可以看到本端视频画面。

为方便体验，ZEGO 提供了一个 [Web 端调试示例](https://zegodev.github.io/zego-express-webrtc-sample/assistDev/index.html)，在该页面下，输入相同的 AppID、RoomID，输入不同的 UserID、以及对应的 [Token](/console/development-assistance/temporary-token)，即可加入同一房间与真机设备互通。当成功开始音视频通话时，可以听到远端的音频，看到远端的视频画面。



### 6 停止推拉流

<a id="stopPublishingStream"></a>

**1. 停止推流/预览/渲染**

调用 [stopPublishingStream](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePublisher/stopPublishingStream.html) 接口停止向远端用户发送本端的音视频流。

```dart
// 停止推流
ZegoExpressEngine.instance.stopPublishingStream();
```

如果启用了本地预览，调用 [stopPreview](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePublisher/stopPreview.html) 接口停止预览。

```dart
// 停止预览
ZegoExpressEngine.instance.stopPreview();
```

如果预览时使用了 createCanvasView，需要调用 [destroyCanvasView](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressCanvasViewUtils/destroyCanvasView.html) 接口销毁。

```dart
// _previewViewID 为调用 [createCanvasView] 时得到的 viewID
ZegoExpressEngine.instance.destroyCanvasView(_previewViewID);
```

**2. 停止拉流/渲染**

调用 [stopPlayingStream](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePlayer/stopPlayingStream.html) 接口停止拉取远端推送的音视频流。

<Warning title="注意">


如果开发者通过 [onRoomStreamUpdate](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngine/onRoomStreamUpdate.html) 回调收到了音视频流 “减少” 的通知，请及时调用 [stopPlayingStream ](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePlayer/stopPlayingStream.html) 接口停止拉流，避免拉到空流、产生额外的成本；或者，开发者可以根据自己的业务需求，选择合适的时机，主动调用 [stopPlayingStream ](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePlayer/stopPlayingStream.html) 接口停止拉流。

</Warning>




```dart
// 停止拉流
ZegoExpressEngine.instance.stopPlayingStream(streamID);
```

如果拉流时使用了 createCanvasView，需要调用 [destroyCanvasView](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressCanvasViewUtils/destroyCanvasView.html) 接口销毁。

```dart
// _playViewID 为调用 [createCanvasView] 时得到的 viewID
ZegoExpressEngine.instance.destroyCanvasView(_playViewID);
```

### 7 退出房间

调用 [logoutRoom](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngineRoom/logoutRoom.html) 接口退出房间。

```dart
// 退出房间
ZegoExpressEngine.instance.logoutRoom('room1');
```

### 8 销毁引擎

调用 [destroyEngine](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngine/destroyEngine.html) 接口销毁引擎，用于释放 SDK 使用的资源。

```dart
// 销毁引擎
ZegoExpressEngine.destroyEngine();
```
