# 快速实现超低延迟直播

- - -


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

在实现基本的超低延迟直播功能之前，请确保：

- 已在项目中集成 ZEGO Express SDK，详情请参考 [快速开始 - 集成](https://doc-zh.zego.im/article/21045)。
- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppID，详情请参考 [控制台 - 项目管理](/console/project-info) 中的“项目信息”。


## 实现流程

用户通过 ZEGO Express SDK 进行视频直播的基本流程为：

用户 A、B  加入房间，用户 B 预览并将音视频流推送到 ZEGO 云服务（推流），用户 A 收到用户 B 推送音视频流的通知之后，在通知中播放用户 B 的音视频流（拉流）。


<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Common/ZegoExpressEngine/common_usage_new.png" /></Frame>

### 开通服务

超低延迟直播功能不是默认开启的，使用前请在 [ZEGO 控制台](https://console.zego.im) 自助开通（开通步骤请参考 [项目管理 - 服务配置](/console/service-configuration/l3) 中的“超低延迟直播”），或联系 ZEGO 技术支持开通。

<a id="CreateEngine"> </a>

### 初始化

**1. （可选）创建界面**

<Accordion title="添加界面元素" defaultOpen="false">
在创建引擎之前，ZEGO 推荐开发者添加以下界面元素，方便实现基本的实时音视频功能。

- 本地预览窗口
- 远端视频窗口
- 结束按钮

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/QuickStart/UI.jpg" /></Frame>
</Accordion>

**2. 创建引擎**

调用 [createEngineWithProfile](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/classes/_zegoexpressengine_.zegoexpressengine.html#createenginewithprofile) 接口，将申请到的 AppID 和 AppSign 传入参数 “appID” 和 “appSign”，创建引擎单例对象。

<Warning title="注意">


SDK 同时也支持 Token 鉴权，若您对项目安全性有更高要求，建议您升级鉴权方式，可参考 [如何从 AppSign 鉴权升级为 Token 鉴权](http://doc-zh.zego.im/faq/token_upgrade?product=ExpressVideo)。

</Warning>



```javascript
// 导入
import ZegoExpressEngine from '@/components/zego-ZegoExpressUniApp-JS/lib/ZegoExpressEngine';

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

创建引擎后开发者可根据实际需要，调用引擎实例的 [on ](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/classes/_zegoexpressengine_.zegoexpressengine.html#on) 方法设置回调。

<Warning title="注意">


为避免错过事件通知，建议在创建引擎后立即注册回调

</Warning>



<Accordion title="常见通知回调" defaultOpen="false">
**1. 我在房间内的连接状态变化通知**

[roomStateUpdate](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/interfaces/_zegoexpresseventhandler_.zegoeventlistener.html#roomstateupdate)：本地调用 [loginRoom](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/classes/_zegoexpressengine_.zegoexpressengine.html#loginroom) 加入房间时，您可通过监听 [roomStateUpdate](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/interfaces/_zegoexpresseventhandler_.zegoeventlistener.html#roomstateupdate) 回调实时监控自己在本房间内的连接状态。

您可以在回调中根据不同状态处理业务逻辑。

```javascript
ZegoExpressEngine.instance().on('roomStateChanged', (roomID, reason, errorCode, extendedData) => {

});
```
ZegoRoomStateChangedReason 状态含义如下，更多信息请参考 [房间状态管理 ](/live-streaming-android/room/room-connection-status)：

<table>

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

[roomUserUpdate](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/interfaces/_zegoexpresseventhandler_.zegoeventlistener.html#roomuserupdate)：同一房间内的其他用户进出房间时，您可通过此回调收到通知。回调中的参数 [ZegoUpdateType](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/enums/_zegoexpressdefines_.zegoupdatetype.html) 为 ZegoUpdateType.ADD 时，表示有用户进入了房间；[ZegoUpdateType ](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/enums/_zegoexpressdefines_.zegoupdatetype.html) 为 ZegoUpdateType.Delete 时，表示有用户退出了房间。

<Warning title="注意">


- 只有调用 [loginRoom](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/classes/_zegoexpressengine_.zegoexpressengine.html#loginroom) 接口登录房间时传入 [ZegoRoomConfig](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/classes/_zegoexpressdefines_.zegoroomconfig.html) 配置，且 “isUserStatusNotify” 参数取值为 “true” 时，用户才能收到 [roomUserUpdate](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/interfaces/_zegoexpresseventhandler_.zegoeventlistener.html#roomuserupdate) 回调。
- 房间人数大于 500 人的情况下 [roomUserUpdate](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/interfaces/_zegoexpresseventhandler_.zegoeventlistener.html#roomuserupdate) 回调不保证有效。若业务场景存在房间人数大于 500 的情况，请联系 ZEGO 技术支持。


</Warning>



```javascript
ZegoExpressEngine.instance().on('roomUserUpdate', (roomID, updateType, userList) => {
    // 您可以在回调中根据用户的进出/退出情况，处理对应的业务逻辑
    if (updateType == ZegoUpdateType.Add) {
        for (user in userList) {
            //("用户 %s 进入了房间 %s", user.userName, roomID);
        }
    } else if (updateType == ZegoUpdateType.Delete) {
        for (user in userList) {
            //("用户 %s 退出了房间 %s", user.userName, roomID);
        }
    }
});
```

**3. 用户推送音视频流的状态通知**

[publisherStateUpdate](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/interfaces/_zegoexpresseventhandler_.zegoeventlistener.html#publisherstateupdate)：根据实际应用需要，用户推送音视频流之后，当推送视频流的状态发生变更时（如出现网络中断导致推流异常等情况），您会收到该回调，同时 SDK 会进行自动进行重试。

```javascript
ZegoExpressEngine.instance().on('publisherStateUpdate', (streamID, state, errorCode, extendedData) => {
    if (errorCode != 0) {
        //("推流状态出错 errorCode: %d", errorCode);
    } else {
        switch (state) {
            case ZegoPublisherState.Publishing:
                //("正在推流");
                break;
            case ZegoPublisherState.PublishRequesting:
                //("正在请求推流");
                break;
            case ZegoPublisherState.NoPublish:
                //("没有推流");
                break;
        }
    }
});
```

**4. 用户拉取音视频流的状态通知**

[playerStateUpdate](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/interfaces/_zegoexpresseventhandler_.zegoeventlistener.html#playerstateupdate)：根据实际应用需要，用户拉取音视频流之后，当拉取视频流的状态发生变更时（如出现网络中断导致拉流异常等情况），您会收到该回调，同时 SDK 会进行自动进行重试。

```javascript
ZegoExpressEngine.instance().on('playerStateUpdate', (streamID, state, errorCode, extendedData) => {
    if (errorCode != 0) {
        //("拉流状态出错 errorCode: %d", errorCode);
    } else {
        switch (state) {
            case ZegoPlayerState.Playing:
                //("正在拉流中");
                break;
            case ZegoPlayerState.PlayRequesting:
                //("正在请求拉流中");
                break;
            case ZegoPlayerState.NoPlay:
                //("未进行拉流");
                break;
        }
    }
});
```
</Accordion>

<a id="createroom"></a>

### 登录房间

- 生成 Token

开发者可在 [ZEGO 控制台](https://console.zego.im/dashboard) 获取临时 Token（有效期为 24 小时），详情请参考 [控制台 - 开发辅助](/console/development-assistance/temporary-token)。

<Warning title="注意">



临时 Token 仅供调试，正式上线时，请从开发者的业务服务器生成 token，详情可参考 [使用 Token 鉴权](https://doc-zh.zego.im/article/21047)。如果 Token 错误，请参考 [错误码](https://doc-zh.zego.im/article/21063) 文档中的 1002067 和 1003072 排查问题。

</Warning>




您可以调用 [loginRoom ](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/classes/_zegoexpressengine_.zegoexpressengine.html#loginroom) 接口登录房间。如果房间不存在，调用该接口时会创建并登录此房间。
- roomID 和 user 的参数由您本地生成，但是需要满足以下条件:
    - 同一个 AppID 内，需保证 “roomID” 全局唯一。
    - 同一个 AppID 内，需保证 “userID” 全局唯一，建议开发者将 “userID” 与自己业务的账号系统进行关联。

```javascript
let roomConfig = {};
// 只有传入 “isUserStatusNotify” 参数取值为 “true” 的 ZegoRoomConfig，才能收到 onRoomUserUpdate 回调。
roomConfig.isUserStatusNotify = true;
// 获取token传入
roomConfig.token = "********";
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


### 主播预览自己的画面，并推送到 ZEGO 音视频云

**1. （可选）主播预览自己的画面**

如果希望看到本端的画面，可调用 [startPreview ](https://doc-zh.zego.im) 接口设置预览视图，并启动本地预览。
如果希望看到本端画面，在 uni-app 项目中调用 [startPreview ](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/classes/_zegoexpressengine_.zegoexpressengine.html#startpreview) 接口启动本地预览。利用 uni-app 所提供的 [条件编译](https://uniapp.dcloud.io/tutorial/platform.html#preprocessor)，在 uni-app 项目的**App 环境**中，开发者可使用 `<zego-local-view>` 标签设置预览视图；在 **Web 环境**中，开发者在调用 `startPreview` 时，需要传入一个用于播放视图的 `video` 元素。

HTML 部分:

```HTML
<template>
    <!-- #ifdef APP-PLUS -->
    <zego-local-view style="height: 403.84rpx;flex: 1;"></zego-local-view>
    <!-- #endif -->
    <!-- #ifdef H5 -->
    <video id="local_video" style="height: 403.84rpx;flex: 1;"  autoplay playsinline :muted="true"></video>
    <!-- #endif -->
</template>
```
JavaScript 部分:

```JS
/** 开始预览 */
let channel = 0 // 可传可不传
// #ifdef H5
let localVideoElem = document.querySelector("#local_video video")
ZegoExpressEngine.instance().startPreview(localVideoElem, channel);
// #endif
// #ifdef APP-PLUS
ZegoExpressEngine.instance().startPreview(channel)
// #endif
```


**2. 主播将自己的音视频流推送到 ZEGO 音视频云**

在用户调用 [loginRoom ](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/classes/_zegoexpressengine_.zegoexpressengine.html#loginroom) 接口后，可以直接调用 [startPublishingStream ](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/classes/_zegoexpressengine_.zegoexpressengine.html#startpublishingstream) 接口，传入 “streamID”，将自己的音视频流推送到 ZEGO 音视频云。您可通过监听 [publisherStateUpdate](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/interfaces/_zegoexpresseventhandler_.zegoeventlistener.html#publisherstateupdate) 回调知晓推流是否成功。

“streamID” 由您本地生成，但是需要保证：

同一个 AppID 下，“streamID” 全局唯一。如果同一个 AppID 下，不同用户各推了一条 “streamID” 相同的流，后推流的用户推流失败。

此处示例在调用 [loginRoom ](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/classes/_zegoexpressengine_.zegoexpressengine.html#loginroom) 接口后立即进行推流。在实现具体业务时，您可选择其他时机进行推流，只要保证先调用 [loginRoom ](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/classes/_zegoexpressengine_.zegoexpressengine.html#loginroom) 即可。

```javascript
/** 开始推流  APP-PULL stream无值， Web有值，为MediaStream*/
const stream = await ZegoExpressEngine.instance().startPublishingStream("streamID");
```

<Note title="说明">
如果您需要了解 Express 的麦克风/音频/扬声器相关接口，请参考 [常见问题 - 如何实现开关摄像头/视频画面/麦克风/音频/扬声器？](http://doc-zh.zego.im/faq/How_to_switch_devices)。
</Note>

### 拉取主播的音视频

进行直播时，我们需要拉取到主播的音视频。超低延迟直播拉流的延迟在 1s 以内，更能实现超低延迟、超强同步、抗极端弱网、超低卡顿、超清画质、首帧秒开的极致直播体验。

在同一房间内的其他用户将音视频流推送到 ZEGO 音视频云时，我们会在 [roomStreamUpdate](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/interfaces/_zegoexpresseventhandler_.zegoeventlistener.html#roomstreamupdate) 回调中收到音视频流新增的通知，并可以通过 ZegoStream 获取到某条流的 “streamID”。

我们可以在该回调中，调用 [startPlayingStream](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/classes/_zegoexpressengine_.zegoexpressengine.html#startplayingstream) 接口，传入 “streamID” 拉取播放该用户的音视频。您可通过监听 [playerStateUpdate](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/interfaces/_zegoexpresseventhandler_.zegoeventlistener.html#playerstateupdate) 回调知晓是否成功拉取音视频。您可以使用如下拉流方式。

<Warning title="注意">


- 超低延迟直播不是默认开启的，请在 ZEGO 控制台自助开通或联系 ZEGO 技术支持，详情请参考 [开通服务](https://doc-zh.zego.im/article/21030#3_1)。
- 如果用户在直播的过程中，遇到相关错误，可查询 [错误码](https://doc-zh.zego.im/article/21063)。

</Warning>



调用 [startPlayingStream](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/classes/_zegoexpressengine_.zegoexpressengine.html#startplayingstream) 接口，并将 [resourceMode](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/classes/_zegoexpressdefines_.zegoplayerconfig.html#resourcemode) 参数设置为 “ZegoStreamResourceMode.OnlyL3”，表示超低延迟直播拉流。

HTML 部分:

```HTML
<template>
    <!-- #ifdef APP-PLUS -->
    <zego-remote-view :streamID="playStreamID" style="height: 403.84rpx;flex: 1"></zego-remote-view>
    <!-- #endif -->
    <!-- #ifdef H5 -->
    <video id="remote_video" style="height: 403.84rpx;flex: 1;"  autoplay playsinline :muted="true"></video>
    <!-- #endif -->
</template>
```

JavaScript 部分:
```JS
// 房间内其他用户推流/停止推流时，我们会在这里收到相应流增减的通知
ZegoExpressEngine.instance().on('roomStreamUpdate', (roomID, updateType, streamList) => {
    if (updateType == ZegoUpdateType.Add) {
        // 这里为了使示例代码更加简洁，我们只拉取新增的音视频流列表中第的第一条流，在实际的业务中，建议开发者循环遍历 streamList ，拉取每一条音视频流
        var stream = streamList[0];
        var config = {'resourceMode': ZegoStreamResourceMode.OnlyL3};
        /** 开始拉流 */
        this.playStreamID = stream.streamID
        const stream = await ZegoExpressEngine.instance().startPlayingStream(this.playStreamID, config)
        // #ifdef H5
        document.querySelector("#remote_video video").srcObject = stream
        // #endif
    }
});
```


### 调试超低延迟直播功能

在真机中运行项目，运行成功后，可以看到本端视频画面。

为方便体验，ZEGO 提供了一个 [Web 端调试示例 ](https://zegodev.github.io/zego-express-webrtc-sample/assistDev/index.html)，在该页面下，输入相同的 AppID、RoomID、Server 地址和 [Token](/console/development-assistance/temporary-token)，即可加入同一房间与真机设备互通。当成功开直播时，可以听到远端的音频，看到远端的视频画面。




### 停止推送/拉取音视频流

**1. 停止推流，停止预览**

调用 [stopPublishingStream](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/classes/_zegoexpressengine_.zegoexpressengine.html#stoppublishingstream) 接口停止向远端用户发送本端的音视频流。

```javascript
// 停止推流
ZegoExpressEngine.instance().stopPublishingStream();
```

如果启用了本地预览，调用 [stopPreview](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/classes/_zegoexpressengine_.zegoexpressengine.html#stoppreview) 接口停止预览。

```javascript
// 停止本地预览
ZegoExpressEngine.instance().stopPreview();
```

**2. 停止拉流**

调用 [stopPlayingStream ](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/classes/_zegoexpressengine_.zegoexpressengine.html#stopplayingstream) 接口停止拉取远端推送的音视频流。

<Warning title="注意">


如果开发者通过 [roomStreamUpdate](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/interfaces/_zegoexpresseventhandler_.zegoeventlistener.html#roomstreamupdate) 回调收到了音视频流 “减少” 的通知，请及时调用 [stopPlayingStream ](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/classes/_zegoexpressengine_.zegoexpressengine.html#stopplayingstream) 接口停止拉流，避免拉到空流、产生额外的成本；或者，开发者可以根据自己的业务需求，选择合适的时机，主动调用 [stopPlayingStream ](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/classes/_zegoexpressengine_.zegoexpressengine.html#stopplayingstream) 接口停止拉流。

</Warning>



```javascript
// 停止拉流
ZegoExpressEngine.instance().stopPlayingStream("streamID");
```

### 退出房间

调用 [logoutRoom ](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/classes/_zegoexpressengine_.zegoexpressengine.html#logoutroom) 接口退出房间，本端会收到 [roomStateUpdate ](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/interfaces/_zegoexpresseventhandler_.zegoeventlistener.html#roomstateupdate) 回调通知调用结果，并停止其所有推拉流以及本地预览。

```javascript
// 退出房间
ZegoExpressEngine.instance().logoutRoom('room1');
```

### 销毁引擎

如果用户彻底不使用音视频功能时，可调用 [destroyEngine ](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/classes/_zegoexpressengine_.zegoexpressengine.html#destroyengine) 接口销毁引擎，释放麦克风、摄像头、内存、CPU 等资源。

- 如果需要监听回调，来确保设备硬件资源释放完成，可在销毁引擎时传入 “callback”。该回调只用于发送通知，开发者不可以在回调内释放与引擎相关的资源。
- 根据实际需要，可在销毁引擎时通过 “await” 关键字，进行异步等待以确保设备硬件资源被释放完成。
    ```javascript
    ZegoExpressEngine.destroyEngine();
    ```

## 直播 API 调用时序

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/QuickStart/quickstart_uml_RN.png" /></Frame>

## 常见问题

**1. 调用 logoutRoom 登出房间时能否直接杀掉进程？**

调用 [logoutRoom ](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/classes/_zegoexpressengine_.zegoexpressengine.html#logoutroom) 后直接杀掉进程，有一定概率会导致 [logoutRoom ](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/classes/_zegoexpressengine_.zegoexpressengine.html#logoutroom) 信令没发出去，那么 ZEGO 服务端只能等心跳超时后才认为这个用户退出了房间，为了确保 [logoutRoom ](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/classes/_zegoexpressengine_.zegoexpressengine.html#logoutroom) 信令发送出去，建议再调用 [destroyEngine ](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/classes/_zegoexpressengine_.zegoexpressengine.html#destroyengine) 并收到回调后再杀进程。

## 相关文档
- [常见错误码](https://doc-zh.zego.im/article/10429)
- [如何处理房间与用户的相关问题？](https://doc-zh.zego.im/faq/express_room?product=ExpressVideo&platform=all)
- [如何设置和获取 SDK 的日志、堆栈信息？](https://doc-zh.zego.im/faq/express_sdkLog?product=ExpressVideo&platform=all)
- [SDK 是否支持断线重连？](https://doc-zh.zego.im/faq/reconnect?product=ExpressVideo&platform=all)
- [直播场景下，如何监听远端观众角色用户登录/退出房间的事件？](https://doc-zh.zego.im/faq/audience_event?product=ExpressVideo&platform=all)
- [如何调节摄像头的焦距（变焦功能）？](https://doc-zh.zego.im/faq/express_adjust_focal?product=ExpressVideo&platform=all)

- [为什么我无法打开摄像头？](https://doc-zh.zego.im/faq/camera?product=ExpressVideo&platform=all)

- [如何在较差的网络环境中保证音视频流畅（流量控制功能）？](https://doc-zh.zego.im/faq/flowcontrol?product=ExpressVideo&platform=all)
