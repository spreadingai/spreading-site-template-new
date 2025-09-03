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

- 已在项目中集成 ZEGO Express SDK，详情请参考 [快速开始 - 集成](https://doc-zh.zego.im/article/21125)。
- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppID，详情请参考 [控制台 - 项目管理](/console/project-info) 中的“项目信息”。


## 实现流程

用户通过 ZEGO Express SDK 进行视频直播的基本流程为：

用户 A、B  加入房间，用户 B 预览并将音视频流推送到 ZEGO 云服务（推流），用户 A 收到用户 B 推送音视频流的通知之后，在通知中播放用户 B 的音视频流（拉流）。


<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Common/ZegoExpressEngine/common_usage_new.png" /></Frame>

### 开通服务

超低延迟直播功能不是默认开启的，使用前请在 [ZEGO 控制台](https://console.zego.im) 自助开通（开通步骤请参考 [项目管理 - 服务配置](/console/service-configuration/l3) 中的“超低延迟直播”），或联系 ZEGO 技术支持开通。




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


<a id="createEngine"></a>

**2. 创建引擎**

调用 [createEngine ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_electron~class~ZegoExpressEngine#create-engine) 接口，将申请到的 AppID 传入参数 “appID” ，创建引擎单例对象。


```js
// 创建引擎，通用场景接入
zgEngine.createEngine({
        appID: appid,
        appSign: appsign,
        scenario: 0}
    ).then(() => {
        zgEngine.enableDebugAssistant(false);
    }).catch((e) => {
        console.log(e)
    });

initRtcEvent();

function initRtcEvent()
{
    zgEngine.on('onRoomStateUpdate',(res) =>
    {
        console.log('room state: ' + res.state)
    })

    zgEngine.on('onPublisherStateUpdate',(res) =>
    {
        console.log('publish state: ' + res.state)
    })

    zgEngine.on('onPlayerStateUpdate',(res) =>
    {
        console.log('play state: ' + res.state)
    })

    zgEngine.on('onRoomExtraInfoUpdate',(res) =>
    {
        console.log('onRoomExtraInfoUpdate: ' + res)
    })

    zgEngine.on('onPlayerVideoSizeChanged', (res) =>{
        console.log('onPlayerVideoSizeChange');
        console.log('width' + res.width);
        console.log('height' + res.height);
    })
}
```

**3. 设置回调**


关于回调的注册和取消，请参考 [设置回调](https://doc-zh.zego.im/article/21397)

<Warning title="注意">


为避免错过事件通知，建议在创建引擎后立即注册回调

</Warning>




<a id="loginRoom"></a>

### 登录房间

- 生成 Token

开发者可在 [ZEGO 控制台](https://console.zego.im/dashboard) 获取临时 Token（有效期为 24 小时），详情请参考 [控制台 - 开发辅助](/console/development-assistance/temporary-token)。

<Warning title="注意">



临时 Token 仅供调试，正式上线时，请从开发者的业务服务器生成 token，详情可参考 [使用 Token 鉴权](https://doc-zh.zego.im/article/21127)。如果 Token 错误，请参考 [错误码](https://doc-zh.zego.im/article/21132) 文档中的 1002067 和 1003072 排查问题。

</Warning>




你可以调用 [loginRoom ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_electron~class~ZegoExpressEngine#login-room) 接口登录房间。如果房间不存在，调用该接口时会创建并登录此房间。roomID 和 user 的参数由您本地生成，但是需要满足以下条件：

- 同一个 AppID 内，需保证 “roomID” 全局唯一。
- 同一个 AppID 内，需保证 “userID” 全局唯一，建议开发者将 “userID” 与自己业务的账号系统进行关联。

```js
var roomID = "roomid"
var userID = "userid"
var userName = "username"
zgEngine.loginRoom(roomID, { userID: userID, userName: userName});
```

#### 登录状态（房间连接状态）回调

调用登录房间接口之后，您可通过监听 [onRoomStateChanged](https://doc-zh.zego.im/article/21397#onRoomStateChanged) 回调实时监控自己在本房间内的连接状态。

```js
zgEngine.on('onRoomStateChanged',(res) =>
{
    console.log('publish state: ' + res.reason)
    // 查看 res.reason 获得登录状态，参考 [ZegoRoomStateChangedReason]
})
```

<a id="publishingStream"></a>


### 主播预览自己的画面，并推送到 ZEGO 音视频云

**1. 主播预览自己的画面**

<Note title="说明">


无论是否调用 [startPreview ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_electron~class~ZegoExpressEngine#start-preview) 预览，都可以将自己的音视频流推送到 ZEGO 音视频云。

</Note>



如果希望看到本端的画面，可调用 [startPreview ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_electron~class~ZegoExpressEngine#start-preview) 接口设置预览视图，并启动本地预览。

```js
let localCanvas = document.getElementById("localCanvas");
zgEngine.startPreview({
    canvas: localCanvas,
    viewMode: currentViewMode
}, zgDefines.ZegoPublishChannel.Main);
```

**2. 主播将自己的音视频流推送到 ZEGO 音视频云**

在用户调用 [loginRoom ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_electron~class~ZegoExpressEngine#login-room) 接口后，可以直接调用 [startPublishingStream ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_electron~class~ZegoExpressEngine#start-publishing-stream) 接口，传入 “streamID”，将自己的音视频流推送到 ZEGO 音视频云。您可通过监听 [onPublisherStateUpdate ](https://doc-zh.zego.im/article/21397#onPublisherStateUpdate) 回调知晓推流是否成功。

“streamID” 由您本地生成，但是需要保证：

同一个 AppID 下，“streamID” 全局唯一。如果同一个 AppID 下，不同用户各推了一条 “streamID” 相同的流，后推流的用户推流失败。

此处示例在调用 [loginRoom ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_electron~class~ZegoExpressEngine#login-room) 接口后立即进行推流。在实现具体业务时，您可选择其他时机进行推流，只要保证先调用 [loginRoom ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_electron~class~ZegoExpressEngine#login-room) 即可。

```js
// 用户调用 loginRoom 之后再调用此接口进行推流
// 在同一个 AppID 下，开发者需要保证“streamID” 全局唯一，如果不同用户各推了一条 “streamID” 相同的流，后推流的用户会推流失败。
zgEngine.startPublishingStream("streamID", config= {roomID: TheRoomID}, zgDefines.ZegoPublishChannel.Main);
```

<Note title="说明">
如果您需要了解 Express 的麦克风/音频/扬声器相关接口，请参考 [常见问题 - 如何实现开关摄像头/视频画面/麦克风/音频/扬声器？](http://doc-zh.zego.im/faq/How_to_switch_devices)。
</Note>

### 拉取主播的音视频

进行直播时，我们需要拉取到主播的音视频。超低延迟直播拉流的延迟在 1s 以内，更能实现超低延迟、超强同步、抗极端弱网、超低卡顿、超清画质、首帧秒开的极致直播体验。

在同一房间内的其他用户将音视频流推送到 ZEGO 音视频云时，我们会在 [onRoomStreamUpdate](https://doc-zh.zego.im/article/21397#onRoomStreamUpdate) 回调中收到音视频流新增的通知，并可以通过 ZegoStream 获取到某条流的 “streamID”。

我们可以在该回调中，调用 [startPlayingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_electron~class~ZegoExpressEngine#start-playing-stream) 接口，传入 “streamID” 拉取播放该用户的音视频。您可通过监听 [onPlayerStateUpdate ](https://doc-zh.zego.im/article/21397#onPlayerStateUpdate) 回调知晓是否成功拉取音视频。您可以使用如下拉流方式。

<Warning title="注意">


- 超低延迟直播不是默认开启的，请在 ZEGO 控制台自助开通或联系 ZEGO 技术支持，详情请参考 [开通服务](https://doc-zh.zego.im/article/13395#3_1)。
- 如果用户在直播的过程中，遇到相关错误，可查询 [错误码](https://doc-zh.zego.im/article/21132)。

</Warning>



调用 [startPlayingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_electron~class~ZegoExpressEngine#start-playing-stream) 接口，并将 [resourceMode](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_electron~struct~ZegoPlayerConfig#resource-mode) 参数设置为 “ZegoStreamResourceMode.ONLY_L3”，表示超低延迟直播拉流。


```js
// 房间内其他用户推流/停止推流时，我们会在这里收到相应流增减的通知
zgEngine.on('onRoomStreamUpdate',(res) =>
{
    if (res.updateType == ZegoUpdateType.Add)
    {
        // play stream
         let playStreamID = res.streamList[0].streamID
         let remoteCanvas = document.getElementById("remoteCanvas");
         zgEngine.startPlayingStream(playStreamID, {canvas: remoteCanvas});
    }
})

```


### 调试超低延迟直播功能

在真机中运行项目，运行成功后，可以看到本端视频画面。

为方便体验，ZEGO 提供了一个 [Web 端调试示例 ](https://zegodev.github.io/zego-express-webrtc-sample/assistDev/index.html)，在该页面下，输入相同的 AppID、RoomID、Server 地址和 [Token](/console/development-assistance/temporary-token)，即可加入同一房间与真机设备互通。当成功开直播时，可以听到远端的音频，看到远端的视频画面。




<a id="stopPublishingStream"></a>

### 停止推送/拉取音视频流

**1. 停止推流，停止预览**

调用 [stopPublishingStream ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_electron~class~ZegoExpressEngine#stop-publishing-stream) 接口停止向远端用户发送本端的音视频流。

```js
// 停止推流
zgEngine.stopPublishingStream(zgDefines.ZegoPublishChannel.Main);
```

如果启用了本地预览，调用 [stopPreview ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_electron~class~ZegoExpressEngine#stop-preview) 接口停止预览。

```js
// 停止本地预览
zgEngine.stopPreview();
```

**2. 停止拉流**

调用 [stopPlayingStream ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_electron~class~ZegoExpressEngine#stop-playing-stream) 接口停止拉取远端推送的音视频流。

<Warning title="注意">


如果开发者通过 [onRoomStreamUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_electron~class~ZegoExpressEngine#on-room-stream-update) 回调收到了音视频流 “减少” 的通知，请及时调用 [stopPlayingStream ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_electron~class~ZegoExpressEngine#stop-playing-stream) 接口停止拉流，避免拉到空流、产生额外的成本；或者，开发者可以根据自己的业务需求，选择合适的时机，主动调用 [stopPlayingStream ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_electron~class~ZegoExpressEngine#stop-playing-stream) 接口停止拉流。

</Warning>



```js
// 停止拉流
zgEngine.stopPlayingStream("stream1");
```

### 退出房间

调用 [logoutRoom ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_electron~class~ZegoExpressEngine#logout-room) 接口退出房间。

```js
// 退出房间
zgEngine.logoutRoom();
```

### 销毁引擎

如果用户彻底不使用音视频功能时，可调用 [destroyEngine ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_electron~class~ZegoExpressEngine#destroy-engine) 接口销毁引擎，释放麦克风、摄像头、内存、CPU 等资源。

```js
zgEngine.destroyEngine();
```


## 直播 API 调用时序

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/QuickStart/quickstart_uml.png" /></Frame>

## 常见问题

**1. 调用 logoutRoom 登出房间时能否直接杀掉进程？**

调用 [logoutRoom ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_electron~class~ZegoExpressEngine#logout-room) 后直接杀掉进程，有一定概率会导致 [logoutRoom ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_electron~class~ZegoExpressEngine#logout-room) 信令没发出去，那么 ZEGO 服务端只能等心跳超时后才认为这个用户退出了房间，为了确保 [logoutRoom ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_electron~class~ZegoExpressEngine#logout-room) 信令发送出去，建议再调用 [destroyEngine ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_electron~class~ZegoExpressEngine#destroy-engine) 并收到回调后再杀进程。
