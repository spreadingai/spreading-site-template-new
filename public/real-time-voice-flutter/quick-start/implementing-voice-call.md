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

在实现基本的音频通话之前，请确保：

- 已在项目中集成 ZEGO Express SDK，实现基本的实时音视频功能，详情请参考 [快速开始 - 集成](https://doc-zh.zego.im/article/13196)。
- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppID 和 AppSign，详情请参考 [控制台 - 项目管理](/console/project-info) 中的“项目信息”。

<Warning title="注意">


SDK 同时也支持 Token 鉴权，若您对项目安全性有更高要求，建议您升级鉴权方式，详情请参考 [如何从 AppSign 鉴权升级为 Token 鉴权](http://doc-zh.zego.im/faq/token_upgrade?product=ExpressVideo)。

</Warning>





## 使用步骤

以用户 A 拉取用户 B 的流为例，流程如下图：

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Common/ZegoExpressEngine/common_usage_new.png" /></Frame>

整个推拉流过程的 API 调用时序如下图：

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/QuickStart/quickstart_uml_audio_flutter.png" /></Frame>

<a id="CreateEngine"> </a>

### 创建引擎

**1. 引入 SDK**

在项目中引入 SDK。

```dart
import 'package:zego_express_engine/zego_express_engine.dart';
```

**2. 创建引擎**

调用 [createEngineWithProfile](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngine/createEngineWithProfile.html) 接口，将申请到的 AppID 和 AppSign 传入参数 “appID” 和 “appSign”。 Web 平台无需使用 “appsign”，为以免暴露，Web 平台请勿传入 “appsign”。

<Warning title="注意">


SDK 同时也支持 Token 鉴权，若您需要升级鉴权方式，可参考 [如何从 AppSign 鉴权升级为 Token 鉴权](http://doc-zh.zego.im/faq/token_upgrade?product=ExpressVideo)。

</Warning>




```dart
ZegoEngineProfile profile = ZegoEngineProfile(
    appID, // 请通过官网注册获取，格式为：1234567890
    ZegoScenario.General, // 通用场景接入
    appSign: appSign，// 请通过官网注册获取，格式为：'0123456789012345678901234567890123456789012345678901234567890123'（共64个字符），Web 平台无需传入
    );
// 创建引擎
ZegoExpressEngine.createEngineWithProfile(profile);
```

**3. 关闭摄像头**

<Warning title="注意">


Express Flutter SDK 不提供裁剪了视频模块的纯音频包，因此 Flutter “实时语音” SDK 实际上是 “实时音视频” SDK。

</Warning>



若要实现纯音频场景，请在创建引擎后调用 [enableCamera](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngineDevice/enableCamera.html) 关闭摄像头，以避免启动引擎的视频模块。摄像头关闭后，将不需要再申请摄像头权限，并且不会推视频流。

```dart
ZegoExpressEngine.instance.enableCamera(false); // 关闭摄像头
```

更多信息请参考文档 [实时音视频 SDK 与实时语音 SDK 的差异](https://doc-zh.zego.im/article/15807)。

若您对 Express Flutter SDK 包体大小有较高要求，可联系技术支持进行定制裁包，关于 SDK 包大小数据请参考 [概述](https://doc-zh.zego.im/article/13192) 文档。



**4. 设置回调**

创建引擎后，开发者可以根据需要选择使用匿名函数实现回调函数，并将其赋值给引擎实例对应的回调函数属性以注册回调

<Warning title="注意">


为避免错过事件通知，建议在创建引擎后立即注册回调

</Warning>




### 登录房间

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

- [onRoomStreamUpdate](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngine/onRoomStreamUpdate.html)：流状态更新回调。登录房间后，当房间内有用户新推送或删除音频流时，SDK 会通过该回调通知。

<Warning title="注意">


- 只有调用 [loginRoom](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngineRoom/loginRoom.html) 接口登录房间时传入 [ZegoRoomConfig](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoRoomConfig-class.html) 配置，且 “isUserStatusNotify” 参数取值为 “true” 时，用户才能收到 [onRoomUserUpdate](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngine/onRoomUserUpdate.html) 回调。
- 通常情况下，如果某个用户想要播放其他用户推送的音频，可以在收到流状态更新（新增）的回调中，调用 [startPlayingStream](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePlayer/startPlayingStream.html) 接口拉取远端推送的音频流。

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


### 推流

**1. 开始推流**

调用 [startPublishingStream](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePublisher/startPublishingStream.html) 接口，传入流 ID 参数 “streamID”，向远端用户发送本端的音频流。

<Warning title="注意">


同一个 AppID 内，需保证 “streamID” 全局唯一。如果同一个 AppID 内，不同用户各推了一条 “streamID” 相同的流，会导致后推流的用户推流失败。

</Warning>



```dart
// 开始推流
ZegoExpressEngine.instance.startPublishingStream("streamID");
```


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

<Note title="说明">


如果您需要了解 Express 的麦克风/音频/扬声器相关接口，请参考 [常见问题 - 如何实现开关摄像头/视频画面/麦克风/音频/扬声器？](http://doc-zh.zego.im/faq/How_to_switch_devices)。


</Note>



### 拉流

调用 [startPlayingStream](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePlayer/startPlayingStream.html) 接口，根据传入的流 ID 参数 “streamID”，拉取远端推送的音频流。

```dart
ZegoExpressEngine.instance.startPlayingStream(streamID);
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

### 体验实时音视频功能

在真机中运行项目，运行成功后，可以看到本端视频画面。

为方便体验，ZEGO 提供了一个 [Web 端调试示例 ](https://zegodev.github.io/zego-express-webrtc-sample/assistDev/index.html)，在该页面下，输入相同的 AppID、RoomID，输入不同的 UserID、以及对应的 [Token](/console/development-assistance/temporary-token)，即可加入同一房间与真机设备互通。当成功开始音视频通话时，可以听到远端的音频，看到远端的视频画面。


### 停止推拉流

**1. 停止推流**

调用 [stopPublishingStream](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePublisher/stopPublishingStream.html) 接口停止向远端用户发送本端的音频流。

```dart
// 停止推流
ZegoExpressEngine.instance.stopPublishingStream();
```

**2. 停止拉流**

调用 [stopPlayingStream](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePlayer/stopPlayingStream.html) 接口停止拉取远端推送的音频流。

<Warning title="注意">


如果开发者通过 [onRoomStreamUpdate](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngine/onRoomStreamUpdate.html) 回调收到了音视频流 “减少” 的通知，请及时调用 [stopPlayingStream ](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePlayer/stopPlayingStream.html) 接口停止拉流，避免拉到空流、产生额外的成本；或者，开发者可以根据自己的业务需求，选择合适的时机，主动调用 [stopPlayingStream ](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePlayer/stopPlayingStream.html) 接口停止拉流。

</Warning>



```dart
// 停止拉流
ZegoExpressEngine.instance.stopPlayingStream(streamID);
```

### 退出房间

调用 [logoutRoom](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngineRoom/logoutRoom.html) 接口退出房间。

```dart
// 退出房间
ZegoExpressEngine.instance.logoutRoom('room1');
```

### 销毁引擎

调用 [destroyEngine](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngine/destroyEngine.html) 接口销毁引擎，用于释放 SDK 使用的资源。

```dart
// 销毁引擎
ZegoExpressEngine.destroyEngine();
```
