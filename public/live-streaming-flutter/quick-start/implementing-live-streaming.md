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

在实现基本的超低延迟直播直播功能之前，请确保：

- 已在项目中集成 ZEGO Express SDK，详情请参考 [快速开始 - 集成](https://doc-zh.zego.im/article/17151)。
- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppID，详情请参考 [控制台 - 项目管理](/console/project-info) 中的“项目信息”。


## 实现流程

用户通过 ZEGO Express SDK 进行视频直播的基本流程为：

用户 A、B  加入房间，用户 B 预览并将音视频流推送到 ZEGO 云服务（推流），用户 A 收到用户 B 推送音视频流的通知之后，在通知中播放用户 B 的音视频流（拉流）。


<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Common/ZegoExpressEngine/common_usage_new.png" /></Frame>

### 开通服务

超低延迟直播功能不是默认开启的，使用前请在 [ZEGO 控制台](https://console.zego.im) 自助开通（开通步骤请参考 [项目管理 - 服务配置](/console/service-configuration/l3) 中的“超低延迟直播”），或联系 ZEGO 技术支持开通。

### 初始化

**1. 创建界面**
<Accordion title="添加界面元素" defaultOpen="false">
在开始之前，推荐开发者添加以下界面元素，方便实现基本的实时音视频功能。

- 本地预览窗口
- 远端视频窗口
- 结束按钮

<Note title="说明">


- 当本地用户为主播时，才会显示本地视频窗口，即若本地用户为观众，仅显示远端视频窗口。
- 当远端用户为主播时，才会显示远端视频窗口。

</Note>




<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/QuickStart/UI.jpg" /></Frame>
</Accordion>

**2. 引入 SDK**

在项目中引入 SDK。

```dart
import 'package:zego_express_engine/zego_express_engine.dart';
```

<a id="CreateEngine"> </a>

**3. 创建引擎**

调用 [createEngineWithProfile](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngine/createEngineWithProfile.html) 接口，将申请到的 AppID 和 AppSign 传入参数 “appID” 和 “appSign”。 Web 平台无需使用 “appsign”，为以免暴露，Web 平台请勿传入 “appsign”。

<Warning title="注意">


SDK 同时也支持 Token 鉴权，若您需要升级鉴权方式，可参考 [如何从 AppSign 鉴权升级为 Token 鉴权](http://doc-zh.zego.im/faq/token_upgrade?product=ExpressVideo)。

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



<Accordion title="常见通知回调" defaultOpen="false">
**1. 我在房间内的连接状态变化通知**

[onRoomStateChanged](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngine/onRoomStateChanged.html)：本地调用 [loginRoom](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngineRoom/loginRoom.html) 加入房间时，您可通过监听 [onRoomStateChanged](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngine/onRoomStateChanged.html) 回调实时监控自己在本房间内的连接状态。

您可以在回调中根据不同状态处理业务逻辑。

```
ZegoExpressEngine.onRoomStateChanged = (String roomID, ZegoRoomStateChangedReason reason, int errorCode, Map<String, dynamic> extendedData) {
        if(reason == ZegoRoomStateChangedReason.Logining)
        {
            // 登录中
            // 代表开发者主动调用 loginRoom 触发的连接中的回调
        }
        else if(reason == ZegoRoomStateChangedReason.Logined)
        {
            // 登录成功
            // 当前是开发者主动调用 loginRoom 登录成功触发的回调，这里可以处理首次登录房间成功的业务逻辑，比如拉取聊天室、直播间基础信息。
        }
        else if(reason == ZegoRoomStateChangedReason.LoginFailed)
        {
            // 登录失败
            if (errorCode == 1002033) {
                //当使用登录房间鉴权的功能时，传入的 token 出错导
            }
        }
        else if(reason == ZegoRoomStateChangedReason.Reconnecting)
        {
             // 重连中
             // 当前是 SDK 断线重连成功触发的回调，这里建议展示一些重连的 UI
        }
        else if(reason == ZegoRoomStateChangedReason.Reconnected)
        {
             // 重连成功
        }
        else if(reason == ZegoRoomStateChangedReason.ReconnectFailed)
        {
             // 重连失败
             // 当房间连接彻底断开时，SDK 不会再进行重连，开发者如果需要再次登录房间，可以主动调用 loginRoom 接口
             // 此时可以在业务中退出房间/直播间/课堂，或者手动调用接口再次登录
        }
        else if(reason == ZegoRoomStateChangedReason.KickOut)
        {
             // 被踢出房间
             if (errorCode == 1002050) {
                 // 用户被踢出房间（由于 userID 相同的用户在其他地方登录）
             }
             else if (errorCode == 1002055) {
                 // 用户被踢出房间（开发者主动调用后台的踢人接口）
             }
         }
         else if(reason == ZegoRoomStateChangedReason.Logout)
         {
              // 登出成功
              // 开发者主动调用 logoutRoom 登出房间
              // 开发者可以在这里处理主动登出房间回调的逻辑
         }
         else if(reason == ZegoRoomStateChangedReason.LogoutFailed)
         {
              // 登出失败
              // 登出房间 ID 错误
         }
    };
```

ZegoRoomStateChangedReason 状态含义如下，更多信息请参考 [房间状态管理](/real-time-video-flutter/room/room-connection-status)：

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

[onRoomUserUpdate ](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngine/onRoomUserUpdate.html)：同一房间内的其他用户进出房间时，您可通过此回调收到通知。回调中的参数 “ZegoUpdateType” 为 ZegoUpdateType.ADD 时，表示有用户进入了房间；“ZegoUpdateType” 为 ZegoUpdateType.DELETE 时，表示有用户退出了房间。

<Warning title="注意">


- 只有在登录房间 [loginRoom ](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngineRoom/loginRoom.html) 时传的配置 “ZegoRoomConfig” 中的 “isUserStatusNotify” 参数为 true 时，用户才能收到房间内其他用户的回调。
- 房间人数大于 500 人的情况下 [onRoomUserUpdate ](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngine/onRoomUserUpdate.html) 回调不保证有效。若业务场景存在房间人数大于 500 的情况，请联系 ZEGO 技术支持。


</Warning>



```
ZegoExpressEngine.onRoomUserUpdate = (String roomID, ZegoUpdateType updateType, List<ZegoUser> userList) {
     //房间用户变化回调，实际业务流程需开发者按需设计
     if(updateType == ZegoUpdateType.Add){
         // 当 “updateType” 为 “Add” 时，用户可以拉取 userList 里的用户进行处理
         for(ZegoUser user : userList){
             // user 加入房间
         }
     }else{
         // 当 “updateType” 为 “Delete” 时，用户可以拉取 userList 里的用户进行处理
         for(ZegoUser user : userList){
             // user 离开房间
         }
     }
};
```

**3. 用户推送音视频流的状态通知**

[onPublisherStateUpdate](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngine/onPublisherStateUpdate.html)：根据实际应用需要，用户推送音视频流之后，当推送视频流的状态发生变更时（如出现网络中断导致推流异常等情况），您会收到该回调，同时 SDK 会进行自动进行重试。

```dart
// 常用的推流相关回调
// 推流状态更新回调
ZegoExpressEngine.onPublisherStateUpdate = (String streamID, ZegoPublisherState state, int errorCode, Map<String, dynamic> extendedData) {
    // 根据需要实现事件回调
};
```

**4. 用户拉取音视频流的状态通知**

[onPlayerStateUpdate](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngine/onPlayerStateUpdate.html)：根据实际应用需要，用户拉取音视频流之后，当拉取视频流的状态发生变更时（如出现网络中断导致拉流异常等情况），您会收到该回调，同时 SDK 会进行自动进行重试。

```dart
// 常用的拉流相关回调
// 拉流状态相关回调
ZegoExpressEngine.onPlayerStateUpdate = (String streamID, ZegoPlayerState state, int errorCode, Map<String, dynamic> extendedData) {
    // 根据需要实现事件回调
};
```
</Accordion>


<a id="createroom"></a>

### 登录房间

- 生成 Token

开发者可在 [ZEGO 控制台](https://console.zego.im/dashboard) 获取临时 Token（有效期为 24 小时），详情请参考 [控制台 - 开发辅助](/console/development-assistance/temporary-token)。

<Warning title="注意">



临时 Token 仅供调试，正式上线时，请从开发者的业务服务器生成 token，详情可参考 [使用 Token 鉴权](https://doc-zh.zego.im/article/17157)。如果 Token 错误，请参考 [错误码](https://doc-zh.zego.im/article/17182) 文档中的 1002067 和 1003072 排查问题。

</Warning>




传入用户 ID 参数 “userID” 创建 ZegoUser 用户对象后，调用 [loginRoom ](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngineRoom/loginRoom.html) 接口，传入房间 ID 参数 “roomID” 和用户参数 “user”，登录房间。如果房间不存在，调用该接口时会创建并登录此房间。

- 同一个 AppID 内，需保证 “roomID” 信息的全局唯一。
- 同一个 AppID 内，需保证 “userID” 全局唯一，建议开发者将其设置成一个有意义的值，可将 “userID” 与自己业务账号系统进行关联。
- “ZegoUser” 的构造方法 [ZegoUser.id](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoUser/ZegoUser.id.html) 会将 “userName” 设为与传的参数 “userID” 一样。“userID” 与 “userName” 不能为 “null”，否则会导致登录房间失败。


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
#### 登录状态（房间连接状态）回调

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

### 主播预览自己的画面，并推送到 ZEGO 音视频云

<a id="publishingStream"></a>

**1. （可选）主播预览自己的画面**

<Accordion title="将画面渲染后启动本地预览" defaultOpen="false">
<Note title="说明">


无论是否调用 [startPreview ](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePublisher/startPreview.html) 预览，都可以将自己的音视频流推送到 ZEGO 音视频云。

</Note>



如果希望看到本端的画面，需要使用 `createCanvasView` 创建 widget，添加到视图后，从 `onViewCreated` 回调返回一个 `viewID`，调用 [startPreview](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePublisher/startPreview.html) 接口传入 viewID 启动本地预览。

Flutter 的渲染方式有两种：PlatformView 与 TextureRenderer。
- Android 和 iOS 可以通过创建引擎时设置 “enablePlatformView” 参数，选择使用 TextureRenderer 还是 PlatformView。
- Web 平台仅支持 PlatformView 的方式，且不存在资源和稳定性问题。
- Windows、MacOS 目前仅支持 TextureRenderer 的方式。

<Note title="说明">



与 TextureRenderer 相比，PlatformView 占用资源稍高，且稳定性偏低，但随着 Flutter 版本迭代，鲁棒性不断提高。

</Note>




**createCanvasView 接口使用展示**

- 接口内部会根据创建引擎时设置的 “enablePlatformView” 参数及平台支持的方式，自动选择使用 TextureRenderer 或者 PlatformView 。
- Android 和 iOS 平台会根据创建引擎时设置 “enablePlatformView” 参数，选择使用 TextureRenderer 还是 PlatformView。
- Web、Windows 和 MacOS 不会受创建引擎时设置 “enablePlatformView” 参数影响，只使用支持的方式。

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


**2. 主播将自己的音视频流推送到 ZEGO 音视频云**

调用 [startPublishingStream](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePublisher/startPublishingStream.html) 接口，传入流 ID 参数 “streamID”，向远端用户发送本端的音视频流。

<Warning title="注意">


同一个 AppID 内，需保证 “streamID” 全局唯一。如果同一个 AppID 内，不同用户各推了一条 “streamID” 相同的流，会导致后推流的用户推流失败。

</Warning>



```dart
// 开始推流
ZegoExpressEngine.instance.startPublishingStream("streamID");
```

### 拉取主播的音视频

进行直播时，我们需要拉取到主播的音视频。使用超低延迟直播拉流的延迟，可以控制在 1s 以内，更能实现超低延迟、超强同步、抗极端弱网、超低卡顿、超清画质、首帧秒开的极致直播体验。

在同一房间内的其他用户将音视频流推送到 ZEGO 音视频云时，会在 [onRoomStreamUpdate](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngine/onRoomStreamUpdate.html) 回调中收到音视频流新增的通知，并可以获取到某条流的 “streamID”。

开发者可以在该回调中，调用 [startPlayingStream](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePlayer/startPlayingStream.html) 接口。您可通过监听 [onPlayerStateUpdate](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngine/onPlayerStateUpdate.html) 回调知晓是否成功拉取音视频。

<Warning title="注意">


- 超低延迟直播不是默认开启的，请在 ZEGO 控制台自助开通或联系 ZEGO 技术支持，详情请参考 [开通服务](https://doc-zh.zego.im/article/17184#3_1)。

</Warning>




调用 [startPlayingStream](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePlayer/startPlayingStream.html) 接口，并将 “resourceMode” 参数设置为 “ZegoStreamResourceMode.ONLY_L3”，表示超低延迟直播拉流。


```
// 将此 Widget 加入到页面的渲染树中以显示预览画面
_playViewWidget = await ZegoExpressEngine.instance.createCanvasView((viewID) {
    _playViewID = viewID;

    // Set the playing canvas
    ZegoCanvas canvas = ZegoCanvas.view(viewID);

    // Start playing
    ZegoExpressEngine.instance.startPlayingStream(streamID,
        canvas: canvas,
        config: ZegoPlayerConfig(ZegoStreamResourceMode.ONLY_L3,videoCodecID: ZegoVideoCodecID.Default, roomID: roomID));
});
```


### 调试超低延迟直播功能

在真机中运行项目，运行成功后，可以看到本端视频画面。

为方便体验，ZEGO 提供了一个 [Web 端调试示例 ](https://zegodev.github.io/zego-express-webrtc-sample/assistDev/index.html)，在该页面下，输入相同的 AppID、RoomID、Server 地址和 [Token](/console/development-assistance/temporary-token)，即可加入同一房间与真机设备互通。当成功开直播时，可以听到远端的音频，看到远端的视频画面。



<a id="stopPublishingStream"></a>

### 停止推送/拉取音视频流

**1. 停止推流，停止预览**

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

**2. 停止拉流**

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

### 退出房间

调用 [logoutRoom](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngineRoom/logoutRoom.html) 接口退出房间。

```dart
// 退出房间
ZegoExpressEngine.instance.logoutRoom('room1');
```

### 销毁引擎

如果用户彻底不使用音视频功能时，可调用 [destroyEngine](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngine/destroyEngine.html) 接口销毁引擎，用于释放 SDK 使用的资源。

```dart
// 销毁引擎
ZegoExpressEngine.destroyEngine();
```
