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

在实现基本的超低延迟直播功能之前，请确保：

- 已在项目中集成 ZEGO Express SDK，详情请参考 [快速开始 - 集成](https://doc-zh.zego.im/article/13394)。
- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppID，详情请参考 [控制台 - 项目管理](/console/project-info) 中的“项目信息”。

<a id="process"></a>

## 实现流程

用户通过 ZEGO Express SDK 进行视频直播的基本流程为：

用户 A、B  加入房间，用户 B 预览并将音视频流推送到 ZEGO 云服务（推流），用户 A 收到用户 B 推送音视频流的通知之后，在通知中播放用户 B 的音视频流（拉流）。


<Frame width="512" height="auto" caption="">
  <img src="https://doc-media.zego.im/sdk-doc/Pics/Common/ZegoExpressEngine/common_usage_new.png" />
</Frame>


### 开通服务

超低延迟直播功能不是默认开启的，使用前请在 [ZEGO 控制台](https://console.zego.im) 自助开通（开通步骤请参考 [项目管理 - 服务配置](/console/service-configuration/l3) 中的“超低延迟直播”），或联系 ZEGO 技术支持开通。

<a id="initialization"> </a>

### 初始化

**1. 创建界面**

根据场景需要，为你的项目创建视频直播的用户界面。我们推荐你在项目中添加如下元素：

- 本地视频窗口
- 远端视频窗口
- 退出直播按钮

<Note title="说明">


- 当本地用户为主播时，才会显示本地视频窗口，即若本地用户为观众，仅显示远端视频窗口。
- 当远端用户为主播时，才会显示远端视频窗口。

</Note>



<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/QuickStart/express_quickstart_video_call_new.png" /></Frame>

<Accordion title="界面代码示例" defaultOpen="false">
```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".Playing">

    <TextureView
        android:id="@+id/logView"
        android:layout_width="match_parent"
        android:layout_height="50dp"
        android:layout_alignParentTop="true"/>

    <TextureView
        android:id="@+id/previewView"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:layout_below="@id/logView"
        android:layout_alignParentBottom="true"
        android:layout_alignParentLeft="true"/>

    <TextView
        android:id="@+id/roomIDTextView"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text=""
        android:layout_margin="10dp"
        android:textColor="@color/black"
        android:textSize="12sp"
        android:layout_below="@+id/logView"/>

    <TextView
        android:id="@+id/userIDTextView"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text=""
        android:layout_margin="5dp"
        android:textColor="@color/black"
        android:textSize="12sp"
        android:layout_below="@+id/roomIDTextView"/>

    <TextView
        android:id="@+id/publishStreamIDTextView"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text=""
        android:layout_margin="5dp"
        android:textColor="@color/black"
        android:textSize="12sp"
        android:layout_below="@+id/userIDTextView"/>

    <Button
        android:id="@+id/stopButton"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Stop"
        android:textSize="15sp"
        android:layout_alignParentBottom="true"
        android:layout_marginBottom="30dp"
        android:layout_centerHorizontal="true"/>


    <TextureView
        android:id="@+id/playView"
        android:layout_width="108dp"
        android:layout_height="192dp"
        android:layout_below="@id/logView"
        android:layout_alignParentRight="true"
        android:layout_margin="10dp"/>

</RelativeLayout>
```
</Accordion>


<h1 id="CreateEngine"> </h1>

**2. 创建引擎**

调用 [createEngine ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~ZegoExpressEngine#create-engine) 接口，将申请到的 AppID 传入参数 “appID” ，创建引擎单例对象。



```java
// 创建 ZegoExpress 实例，监听常用事件
ZegoEngineProfile profile = new ZegoEngineProfile();
profile.appID = ;  // 请通过官网注册获取，格式为：1234567890L
profile.scenario = ZegoScenario.DEFAULT;  // 通用场景接入
profile.application = getApplication();
engine = ZegoExpressEngine.createEngine(profile, null);
```

**3. 设置回调**

您可以通过实现 [IZegoEventHandler](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~IZegoEventHandler) 接口中的特定方法（或者通过匿名内部类），以监听并处理所关注的事件回调。然后将接口实现类（或者匿名内部类）的对象作为`eventHandler`参数传递给 [createEngine ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~ZegoExpressEngine#create-engine) 方法或者传递给 [setEventHandler](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~ZegoExpressEngine#set-event-handler) 注册回调。

<Warning title="注意">


建议在创建引擎时或创建引擎后就立即注册回调，以避免延后注册错过事件通知。

</Warning>




<Accordion title="常见通知回调" defaultOpen="false">
**1. 我在房间内的连接状态变化通知**

[onRoomStateChanged](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~IZegoEventHandler#on-room-state-changed)：本地调用 [loginRoom](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~ZegoExpressEngine#login-room) 加入房间时，您可通过监听 [onRoomStateChanged](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~IZegoEventHandler#on-room-state-changed) 回调实时监控自己在本房间内的连接状态。

您可以在回调中根据不同状态处理业务逻辑。

```java
@Override
public void onRoomStateChanged(String roomID, ZegoRoomStateChangedReason reason, int errorCode, JSONObject extendedData)
{
    super.onRoomStateChanged(roomID, reason, errorCode, extendedData);
}
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

[onRoomUserUpdate ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~IZegoEventHandler#on-room-user-update)：同一房间内的其他用户进出房间时，您可通过此回调收到通知。回调中的参数 [ZegoUpdateType ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~enum~ZegoUpdateType) 为 ZegoUpdateType.ADD 时，表示有用户进入了房间；[ZegoUpdateType ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~enum~ZegoUpdateType) 为 ZegoUpdateType.DELETE 时，表示有用户退出了房间。

<Warning title="注意">


- 只有在登录房间 [loginRoom ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~ZegoExpressEngine#login-room) 时传的配置 [ZegoRoomConfig ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~ZegoRoomConfig) 中的 [isUserStatusNotify ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~ZegoRoomConfig#is-user-status-notify) 参数为 true 时，用户才能收到房间内其他用户的回调。
- 房间人数大于 500 人的情况下 onRoomUserUpdate 回调不保证有效。若业务场景存在房间人数大于 500 的情况，请联系 ZEGO 技术支持。


</Warning>



```java
@Override
public void onRoomUserUpdate(String roomID, ZegoUpdateType updateType, ArrayList<ZegoUser> userList) {
    super.onRoomUserUpdate(roomID, updateType, userList);
    // 您可以在回调中根据用户的进出/退出情况，处理对应的业务逻辑
    if (updateType == ZegoUpdateType.ADD) {
        for (ZegoUser user : userList) {
            //("用户 %s 进入了房间 %s", user.userName, roomID);
        }
    } else if (updateType == ZegoUpdateType.DELETE) {
        for (ZegoUser user : userList) {
            //("用户 %s 退出了房间 %s", user.userName, roomID);
        }
    }
}
```

**3. 用户推送音视频流的状态通知**

[onPublisherStateUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~IZegoEventHandler#on-publisher-state-update)：根据实际应用需要，用户推送音视频流之后，当推送视频流的状态发生变更时（如出现网络中断导致推流异常等情况），您会收到该回调，同时 SDK 会进行自动进行重试。

```java
@Override
public void onPublisherStateUpdate(String streamID, ZegoPublisherState state, int errorCode, JSONObject extendedData) {
    super.onPublisherStateUpdate(streamID, state, errorCode, extendedData);
    if (errorCode != 0) {
        Log.e("推流状态出错 errorCode: %d", errorCode);
    } else {
        switch (state) {
            case PUBLISHING:
                //("正在推流");
                break;
            case PUBLISH_REQUESTING:
                //("正在请求推流");
                break;
            case NO_PUBLISH:
                //("没有推流");
                break;
        }
    }
}
```

**4. 用户拉取音视频流的状态通知**

[onPlayerStateUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~IZegoEventHandler#on-player-state-update)：根据实际应用需要，用户拉取音视频流之后，当拉取视频流的状态发生变更时（如出现网络中断导致拉流异常等情况），您会收到该回调，同时 SDK 会进行自动进行重试。

```java
@Override
public void onPlayerStateUpdate(String streamID, ZegoPlayerState state, int errorCode, JSONObject extendedData) {
    super.onPlayerStateUpdate(streamID, state, errorCode, extendedData);
    if (errorCode != 0) {
        Log.e("拉流状态出错 streamID: %s, errorCode:%d", streamID, errorCode);
    } else {
        switch (state) {
            case PLAYING:
                //("正在拉流中");
                break;
            case PLAY_REQUESTING:
                //("正在请求拉流中");
                break;
            case NO_PLAY:
                //("未进行拉流");
                break;
        }
    }
}
```
</Accordion>


<a id="createroom"></a>

### 登录房间

- 生成 Token

开发者可在 [ZEGO 控制台](https://console.zego.im/dashboard) 获取临时 Token（有效期为 24 小时），详情请参考 [控制台 - 开发辅助](https://doc-zh.zego.im/article/16309)。

<Warning title="注意">

- 临时 Token 仅供调试，正式上线时，请从开发者的业务服务器生成 token，详情可参考 [使用 Token 鉴权](https://doc-zh.zego.im/article/14756)。
- 如果 Token 错误，请参考 [错误码](https://doc-zh.zego.im/article/13783) 文档中的 1002067 和 1003072 排查问题。

</Warning>


你可以调用 [loginRoom ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~ZegoExpressEngine#login-room) 接口登录房间。如果房间不存在，调用该接口时会创建并登录此房间。roomID 和 user 的参数由您本地生成，但是需要满足以下条件：

- 同一个 AppID 内，需保证 “roomID” 全局唯一。
- 同一个 AppID 内，需保证 “userID” 全局唯一，建议开发者将 “userID” 与自己业务的账号系统进行关联。

```java
// ZegoUser 的构造方法 public ZegoUser(String userID) 会将 “userName” 设为与传的参数 “userID” 一样。“userID” 与 “userName” 不能为 “null” 否则会导致登录房间失败。
ZegoUser user = new ZegoUser("user1");
// 只有传入 “isUserStatusNotify” 参数取值为 “true” 的 ZegoRoomConfig，才能收到 onRoomUserUpdate 回调。
ZegoRoomConfig roomConfig = new ZegoRoomConfig();
//token 由用户自己的服务端生成，为了更快跑通流程，也可以通过 ZEGO 控制台获取临时的音视频 token
roomConfig.token = "xxxx";
roomConfig.isUserStatusNotify = true;
// 登录房间
engine.loginRoom("room1", user, roomConfig, (int error, JSONObject extendedData)->{
    // (可选回调) 登录房间结果，如果仅关注登录结果，关注此回调即可
});
```

#### 登录状态（房间连接状态）回调

调用登录房间接口之后，您可通过监听 [onRoomStateChanged](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~IZegoEventHandler#on-room-state-changed) 回调实时监控自己在本房间内的连接状态。

```java
@Override
public void onRoomStateChanged(String roomID, ZegoRoomStateChangedReason reason, int errorCode, JSONObject extendedData) {
    if(reason == ZegoRoomStateChangedReason.LOGINING)
    {
        // 登录中
    }
    else if(reason == ZegoRoomStateChangedReason.LOGINED)
    {
        // 登录成功
        //只有当房间状态是登录成功或重连成功时，推流（startPublishingStream）、拉流（startPlayingStream）才能正常收发音视频
        //将自己的音视频流推送到 ZEGO 音视频云
    }
    else if(reason == ZegoRoomStateChangedReason.LOGIN_FAILED)
    {
        // 登录失败
    }
    else if(reason == ZegoRoomStateChangedReason.RECONNECTING)
    {
        // 重连中
    }
    else if(reason == ZegoRoomStateChangedReason.RECONNECTED)
    {
        // 重连成功
    }
    else if(reason == ZegoRoomStateChangedReason.RECONNECT_FAILED)
    {
        // 重连失败
    }
    else if(reason == ZegoRoomStateChangedReason.KICK_OUT)
    {
        // 被踢出房间
    }
    else if(reason == ZegoRoomStateChangedReason.LOGOUT)
    {
        // 登出成功
    }
    else if(reason == ZegoRoomStateChangedReason.LOGOUT_FAILED)
    {
        // 登出失败
    }
}
```

<a id="publishingStream"></a>


### 主播预览自己的画面，并推送到 ZEGO 音视频云

**1. （可选）主播预览自己的画面**


如果希望看到本端的画面，可调用 [startPreview ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~ZegoExpressEngine#start-preview) 接口设置预览视图，并启动本地预览。

```java
// 设置本地预览视图并启动预览，视图模式采用 SDK 默认的模式，等比缩放填充整个 View
ZegoCanvas previewCanvas = new ZegoCanvas(previewView);
engine.startPreview(previewCanvas);
```

**2. 主播将自己的音视频流推送到 ZEGO 音视频云**

在用户调用 [loginRoom ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~ZegoExpressEngine#login-room) 接口后，可以直接调用 [startPublishingStream ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~ZegoExpressEngine#start-publishing-stream) 接口，传入 “streamID”，将自己的音视频流推送到 ZEGO 音视频云。您可通过监听 [onPublisherStateUpdate ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~IZegoEventHandler#on-publisher-state-update) 回调知晓推流是否成功。

“streamID” 由您本地生成，但是需要保证：

同一个 AppID 下，“streamID” 全局唯一。如果同一个 AppID 下，不同用户各推了一条 “streamID” 相同的流，后推流的用户推流失败。

此处示例在调用 [loginRoom ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~ZegoExpressEngine#login-room) 接口后立即进行推流。在实现具体业务时，您可选择其他时机进行推流，只要保证先调用 [loginRoom ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~ZegoExpressEngine#login-room) 即可。

```java
// 用户调用 loginRoom 之后再调用此接口进行推流
// 在同一个 AppID 下，开发者需要保证“streamID” 全局唯一，如果不同用户各推了一条 “streamID” 相同的流，后推流的用户会推流失败。
engine.startPublishingStream("stream1");
```

<Note title="说明">
如果您需要了解 Express 的麦克风/音频/扬声器相关接口，请参考 [常见问题 - 如何实现开关摄像头/视频画面/麦克风/音频/扬声器？](http://doc-zh.zego.im/faq/How_to_switch_devices)。
</Note>

### 拉取主播的音视频

进行直播时，我们需要拉取到主播的音视频。超低延迟直播拉流的延迟在 1s 以内，更能实现超低延迟、超强同步、抗极端弱网、超低卡顿、超清画质、首帧秒开的极致直播体验。

在同一房间内的其他用户将音视频流推送到 ZEGO 音视频云时，我们会在 [onRoomStreamUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~IZegoEventHandler#on-room-stream-update) 回调中收到音视频流新增的通知，并可以通过 ZegoStream 获取到某条流的 “streamID”。

我们可以在该回调中，调用 [startPlayingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~ZegoExpressEngine#start-playing-stream) 接口，传入 “streamID” 拉取播放该用户的音视频。您可通过监听 [onPlayerStateUpdate ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~IZegoEventHandler#on-player-state-update) 回调知晓是否成功拉取音视频。您可以使用如下拉流方式。

<Warning title="注意">


- 超低延迟直播不是默认开启的，请在 ZEGO 控制台自助开通或联系 ZEGO 技术支持，详情请参考 [开通服务](https://doc-zh.zego.im/article/13395#3_1)。
- 如果用户在直播的过程中，遇到相关错误，可查询 [错误码](https://doc-zh.zego.im/article/13783)。

</Warning>



调用 [startPlayingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~ZegoExpressEngine#start-playing-stream) 接口，并将 [resourceMode](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~ZegoPlayerConfig#resource-mode) 参数设置为 “ZegoStreamResourceMode.ONLY_L3”，表示超低延迟直播拉流。


```java
// 房间内其他用户推流/停止推流时，我们会在这里收到相应流增减的通知
public void onRoomStreamUpdate(String roomID, ZegoUpdateType updateType, ArrayList<ZegoStream> streamList, JSONObject extendedData) {
    super.onRoomStreamUpdate(roomID, updateType, streamList, extendedData);
    //当 updateType 为 ZegoUpdateType.ADD 时，代表有音视频流新增，此时我们可以调用 startPlayingStream 接口拉取播放该音视频流
    if (updateType == ZegoUpdateType.ADD) {
         // 开始拉流，设置远端拉流渲染视图，视图模式采用 SDK 默认的模式，等比缩放填充整个 View
        // 如下 playView 为 UI 界面上 View.这里为了使示例代码更加简洁，我们只拉取新增的音视频流列表中第的第一条流，在实际的业务中，建议开发者循环遍历 streamList ，拉取每一条音视频流
        ZegoStream stream = streamList.get(0);
        playStreamID = stream.streamID;
        ZegoCanvas playCanvas = new ZegoCanvas(playView);
        ZegoPlayerConfig playerConfig = new ZegoPlayerConfig();
        playerConfig.resourceMode = ZegoStreamResourceMode.ONLY_L3;
        engine.startPlayingStream(playStreamID, playCanvas, playerConfig);
    }
}
```

### 调试超低延迟直播功能

在真机中运行项目，运行成功后，可以看到本端视频画面。

为方便体验，ZEGO 提供了一个 [Web 端调试示例 ](https://zegodev.github.io/zego-express-webrtc-sample/assistDev/index.html)，在该页面下，输入相同的 AppID、RoomID、Server 地址和 [Token](/console/development-assistance/temporary-token)，即可加入同一房间与真机设备互通。当成功开直播时，可以听到远端的音频，看到远端的视频画面。


<a id="stopPublishingStream"></a>

### 停止推送/拉取音视频流

**1. 停止推流，停止预览**

调用 [stopPublishingStream ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~ZegoExpressEngine#stop-publishing-stream) 接口停止向远端用户发送本端的音视频流。

```java
// 停止推流
engine.stopPublishingStream();
```

如果启用了本地预览，调用 [stopPreview ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~ZegoExpressEngine#stop-preview) 接口停止预览。

```java
// 停止本地预览
engine.stopPreview();
```

**2. 停止拉流**

调用 [stopPlayingStream ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~ZegoExpressEngine#stop-playing-stream) 接口停止拉取远端推送的音视频流。

<Warning title="注意">


如果开发者通过 [onRoomStreamUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~IZegoEventHandler#on-room-stream-update) 回调收到了音视频流 “减少” 的通知，请及时调用 [stopPlayingStream ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~ZegoExpressEngine#stop-playing-stream) 接口停止拉流，避免拉到空流、产生额外的成本；或者，开发者可以根据自己的业务需求，选择合适的时机，主动调用 [stopPlayingStream ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~ZegoExpressEngine#stop-playing-stream) 接口停止拉流。

</Warning>



```java
// 停止拉流
engine.stopPlayingStream("stream1");
```

### 退出房间

调用 [logoutRoom ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~ZegoExpressEngine#logout-room) 接口退出房间。

```java
// 退出房间
engine.logoutRoom();
```

### 销毁引擎

如果用户彻底不使用音视频功能时，可调用 [destroyEngine ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~ZegoExpressEngine#destroy-engine) 接口销毁引擎，释放麦克风、摄像头、内存、CPU 等资源。

- 如果需要监听回调，来确保设备硬件资源释放完成，可在销毁引擎时传入 “callback”。该回调只用于发送通知，开发者不可以在回调内释放与引擎相关的资源。
- 如果不需要监听回调，可传入 “null”。
    ```java
    ZegoExpressEngine.destroyEngine(null);
    ```



## 直播 API 调用时序

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/QuickStart/quickstart_uml.png" /></Frame>

## 常见问题

1. **调用 logoutRoom 登出房间时能否直接杀掉进程？**

调用 [logoutRoom ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~ZegoExpressEngine#logout-room) 后直接杀掉进程，有一定概率会导致 [logoutRoom ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~ZegoExpressEngine#logout-room) 信令没发出去，那么 ZEGO 服务端只能等心跳超时后才认为这个用户退出了房间，为了确保 [logoutRoom ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~ZegoExpressEngine#logout-room) 信令发送出去，建议再调用 [destroyEngine ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~ZegoExpressEngine#destroy-engine) 并收到回调后再杀进程。

## 相关文档
- [常见错误码](https://doc-zh.zego.im/article/4378)
- [如何处理房间与用户的相关问题？](https://doc-zh.zego.im/faq/express_room?product=ExpressVideo&platform=all)
- [如何设置和获取 SDK 的日志、堆栈信息？](https://doc-zh.zego.im/faq/express_sdkLog?product=ExpressVideo&platform=all)
- [SDK 是否支持断线重连？](https://doc-zh.zego.im/faq/reconnect?product=ExpressVideo&platform=all)
- [直播场景下，如何监听远端观众角色用户登录/退出房间的事件？](https://doc-zh.zego.im/faq/audience_event?product=ExpressVideo&platform=all)
- [如何调节摄像头的焦距（变焦功能）？](https://doc-zh.zego.im/faq/express_adjust_focal?product=ExpressVideo&platform=all)

- [为什么我无法打开摄像头？](https://doc-zh.zego.im/faq/camera?product=ExpressVideo&platform=all)

- [如何在较差的网络环境中保证音视频流畅（流量控制功能）？](https://doc-zh.zego.im/faq/flowcontrol?product=ExpressVideo&platform=all)



- [为什么 Android 9 应用锁屏或切后台后采集音视频无效](https://doc-zh.zego.im/faq/android_background)
