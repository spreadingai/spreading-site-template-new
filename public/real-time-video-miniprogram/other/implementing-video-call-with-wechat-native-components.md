# 使用微信原生组件实现通话

---


## 功能简介

本文将介绍使用微信小程序原生推拉流组件 \<live-pusher> 和 \<live-player> 进行推拉流。

<Note title="说明">


由于微信小程序原生推拉流组件使用起来比较复杂，推荐开发者使用 ZEGO 封装的 \<zego-push> 和 \<zego-player> 组件实现视频通话，可参考 [微信小程序 - 实现视频通话](https://doc-zh.zego.im/article/18250)。

</Note>



## 前提条件

在实现基本的实时音视频功能之前，请确保：

- 已在 [ZEGO 控制台](https://console.zego.im/) 创建项目，申请有效的 AppID 和 ServerSecret，详情请参考 [控制台 - 项目管理](/console/project-info) 中的“项目信息”。
- 已在项目中集成 ZEGO Express SDK，详情请参考 [微信小程序 - 集成 SDK](https://doc-zh.zego.im/article/18251)。


## 实现流程

用户通过 ZEGO Express SDK 进行视频通话的基本流程为：

用户 A、B 加入房间，用户 B 预览并将音视频流推送到 ZEGO 云服务（推流），用户 A 收到用户 B 推送音视频流的通知之后，在通知中播放用户 B 的音视频流（拉流）。


<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Common/ZegoExpressEngine/common_usage_flowchart_new.png" /></Frame>


### 1 配置微信小程序后台

在初始化 SDK 前，需要在 [微信公众平台](https://mp.weixin.qq.com/?token=&lang=zh_CN) 中进行如下配置：

- [服务器域名配置](https://developers.weixin.qq.com/miniprogram/dev/framework/ability/network.html)：在“小程序后台 > 开发管理 > 开发设置 > 服务器域名”中，按照协议分类，将即构 Server 地址、LogUrl、以及用户业务需要用到的地址填到指定的“request合法域名”或“socket合法域名”中。

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/MiniProgram/Configure_server_domain_name.png" /></Frame>

- 相关功能开启：在“小程序后台 > 开发管理 > 接口设置 > 接口权限”中，打开 **实时播放音视频流** 和 **实时录制音视频流** 功能开关。

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/MiniProgram/apiconfig_2.png" /></Frame>


### 2 初始化

**1. 创建界面**

根据场景需要，为您的项目创建视频通话的用户界面。我们推荐您在项目中添加如下元素：

- 本地预览窗口
- 远端视频窗口
- 结束按钮

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/QuickStart/express_quickstart_video_call.png" /></Frame>

<Warning title="注意">

小程序推流组件 \<live-pusher> 中的 "video-width" 和 "video-height" 存在兼容性问题，可能会出现设置不生效的情况。

</Warning>



**参考界面代码：**

```xml
<view wx:if="{{canShow== 1}}" class="">
  <view class="containerBase">
    <live-pusher class="testpusher" wx:if="{{livePusherUrl}}" url="{{livePusherUrl}}" aspect="3:4" bindstatechange="onPushStateChange" autopush mode="SD" min-bitrate="800" max-bitrate="1500"
    bindaudiovolumenotify="bindaudiovolumenotify"  bindnetstatus="onPushNetStateChange" waiting-image="https://doc-media.zego.im/downloads/pause_publish.png"   ></live-pusher>
    <live-player  wx:for="{{livePlayerList}}" wx:key="streamID" id="{{item.streamID}}" src="{{item.url}}" mode="RTC" autoplay enable-metadata="true" bindmetadatachange="binddatachange"  bindstatechange="onPlayStateChange" bindnetstatus="onPlayNetStateChange"></live-player>
  </view>
  <view class="index-container">
    <view class='input-container'>
      <input value="{{roomID}}" bindinput="bindKeyInput" placeholder="请输入房间 ID" placeholder-style='color: #b3b3b3; font-size: 14px;' class="room-input" />
      <text class="tip"></text>
    </view>
    <view class="button-container">
      <button bindtap="openRoom" data-role="1" data-option="videoAndAudio" hover-class="none" class="openRoom">
        加入房间(推流)
      </button>


      <button bindtap="logout" hover-class="none">退出房间</button>
    </view>
  </view>
</view>
<view class="settings">
  <button wx:if="{{canShow==0}}" open-type="openSetting" bindopensetting="settingCallback">
    授权使用摄像头和麦克风
  </button>
</view>
```


**2. 创建引擎**

创建 [ZegoExpressEngine ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_wxxcx~class~ZegoExpressEngine) 引擎实例，将申请到的 AppID 传入参数 “appID”，将获取到的 Server 地址传入参数 “server”。

```javascript
// 初始化实例
zg = new ZegoExpressEngine(appID, server);
```

如果需要注册回调，开发者可根据实际需要，实现 ZegoEvent 中的某些方法，创建引擎后可通过调用 [on](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_wxxcx~class~ZegoExpressEngine#on) 接口设置回调。

```javascript
zg.on('roomStateUpdate', (roomID, state, errorCode, extendedData) => {
    if (state == 'DISCONNECTED') {
        // 与房间断开了连接
	// ...
    }

    if (state == 'CONNECTING') {
        // 与房间尝试连接中
	// ...
    }

    if (state == 'CONNECTED') {
        // 与房间连接成功
	// ...
    }
})
```

### 3 登录房间

**1. 获取登录 Token**

登录房间需要用于验证身份的 Token，获取方式请参考 [用户权限控制](/real-time-video-miniprogram/communication/using-token-authentication)。如需快速调试，建议使用控制台生成的临时 Token，生成临时 Token 的具体操作请参考 [控制台 - 项目管理](/console/project-info)。

**2. 登录房间**

您可以调用 SDK 的 [loginRoom ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_wxxcx~class~ZegoExpressEngine#login-room) 接口，传入房间 ID 参数 “roomID”、“token” 和用户参数 “user”，登录房间。您可通过监听 [roomStateUpdate ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_wxxcx~interface~ZegoRTMEvent#room-state-update) 回调实时监控自己在本房间内的连接状态，具体请参考 [常见通知回调](#常见通知回调) 中的“我在房间内的连接状态变化通知”。

roomID 和 user 的参数由您本地生成，但是需要满足以下条件：

- 同一个 AppID 内，需保证 “roomID” 全局唯一。
- 同一个 AppID 内，需保证 “userID” 全局唯一，建议开发者将 “userID” 与自己业务的账号系统进行关联。

<Warning title="注意">

为避免错过任何通知，您需要在登录房间前先设置所有的监听回调（如房间状态、用户状态、流状态、推拉流状态等），具体请参考 [常见通知回调](#常见通知回调)。

</Warning>




```javascript
// 登录房间，成功则返回 true
const result = await zg.loginRoom(roomID, token, {userID, userName});
```


### 4 将自己的音视频流推送到 ZEGO 音视频云

<Steps titleSite="h4">
<Step title="创建对应业务场景的 WXML">


根据您的业务场景需求，编写 WXML 文件，创建推拉流组件 \<live-pusher> 和 \<live-player>。

- [\<live-pusher>](https://developers.weixin.qq.com/miniprogram/dev/component/live-pusher.html) 组件用于小程序的实时推送音视频流功能。
- [\<live-player>](https://developers.weixin.qq.com/miniprogram/dev/component/live-player.html) 组件用户小程序的实时播放音视频流功能。

<Note title="说明">
- WXML 的具体含义与用法请参考微信官网文档中的介绍 [WXML](https://developers.weixin.qq.com/miniprogram/dev/framework/view/wxml/)。
- 通过 [wx.createLivePusherContext](https://developers.weixin.qq.com/miniprogram/dev/api/media/live/wx.createLivePusherContext.html)，可以创建 [\<live-pusher>](https://developers.weixin.qq.com/miniprogram/dev/component/live-pusher.html) 上下文 [LivePusherContext](https://developers.weixin.qq.com/miniprogram/dev/api/media/live/LivePusherContext.html) 对象。
- 通过 [wx.createLivePlayerContext](https://developers.weixin.qq.com/miniprogram/dev/api/media/live/wx.createLivePlayerContext.html) 传入 [\<live-player>](https://developers.weixin.qq.com/miniprogram/dev/component/live-player.html) 组件 ID，可以创建 [\<live-player>](https://developers.weixin.qq.com/miniprogram/dev/component/live-player.html) 上下文 [LivePlayerContext](https://developers.weixin.qq.com/miniprogram/dev/api/media/live/LivePlayerContext.html) 对象。

</Note>



``` javascript
<live-pusher class="testpusher" wx:if="{{livePusherUrl}}" url="{{livePusherUrl}}" aspect="3:4" bindstatechange="onPushStateChange" autopush mode="SD" min-bitrate="800" max-bitrate="1500"
    bindaudiovolumenotify="bindaudiovolumenotify"  bindnetstatus="onPushNetStateChange" waiting-image="https://doc-media.zego.im/downloads/pause_publish.png"   ></live-pusher>
<live-player  wx:for="{{livePlayerList}}" wx:key="streamID" id="{{item.streamID}}" src="{{item.url}}" mode="RTC" autoplay enable-metadata="true" bindmetadatachange="binddatachange"  bindstatechange="onPlayStateChange" bindnetstatus="onPlayNetStateChange"></live-player>
```

- bindstatechange 表示播放状态变化事件。
- bindaudiovolumenotify 表示播放音量大小通知。
- bindnetstatus 表示网络状态通知。

</Step>

<Step title="推送音视频流到 ZEGO 音视频云">

调用 [startPublishingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_wxxcx~class~ZegoExpressEngine#start-publishing-stream) 获取推流地址，并将推流地址赋值给 [\<live-pusher>](https://developers.weixin.qq.com/miniprogram/dev/component/live-pusher.html) 组件的 url 属性。

推送音视频流到 ZEGO 音视频云：

- `autopush` 为 true，自动推送音视频。
- `autopush` 为 false，通过 [wx.createLivePusherContext](https://developers.weixin.qq.com/miniprogram/dev/api/media/live/wx.createLivePusherContext.html)，可以创建 [\<live-pusher>](https://developers.weixin.qq.com/miniprogram/dev/component/live-pusher.html) 上下文 [LivePusherContext](https://developers.weixin.qq.com/miniprogram/dev/api/media/live/LivePusherContext.html) 对象，调用 [LivePusherContext.start](https://developers.weixin.qq.com/miniprogram/dev/api/media/live/LivePusherContext.start.html) 推送音视频。

您可通过监听 [publisherStateUpdate ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_wxxcx~interface~ZegoWechatMiniEvent#publisher-state-update) 回调知晓是否成功推送音视频，具体回调设置请参考 [常见通知回调](#常见通知回调) 中的“房间内流状态变更的通知”。

```javascript
// 推流方登录房间成功后触发推流
 let {
      url
    } = await zg.startPublishingStream(this.data.pushStreamID, publishOption);
    this.setData({
        livePusherUrl: url,
        livePusher: wx.createLivePusherContext(),
      },
      () => {
        //开始推流，若组件 live-pusher 设置autopush为true，也可以不执行这一行代码
        this.data.livePusher.start();
      }
    );
```

</Step>
</Steps>

### 5 拉取其他用户的音视频

进行视频通话时，我们需要拉取到其他用户的音视频。

通过调用[startPlayingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_wxxcx~class~ZegoExpressEngine#start-playing-stream) 获取拉流地址，并将拉流地址赋值给 [\<live-player>](https://developers.weixin.qq.com/miniprogram/dev/component/live-player.html) 组件的 url 属性。

播放拉流音视频：

- `autoplay` 为 true，自动播放拉流音视频。
- `autoplay` 为 false，通过 [wx.createLivePlayerContext](https://developers.weixin.qq.com/miniprogram/dev/api/media/live/wx.createLivePlayerContext.html) 传入 [\<live-player>](https://developers.weixin.qq.com/miniprogram/dev/component/live-player.html) 组件 ID，可以创建 [\<live-player>](https://developers.weixin.qq.com/miniprogram/dev/component/live-player.html) 上下文 [LivePlayerContext](https://developers.weixin.qq.com/miniprogram/dev/api/media/live/LivePlayerContext.html) 对象，调用 [LivePlayerContext.play](https://developers.weixin.qq.com/miniprogram/dev/api/media/live/LivePlayerContext.play.html) 播放拉流音视频。

您可通过监听 [playerStateUpdate ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_wxxcx~interface~ZegoWechatMiniEvent#player-state-update) 回调知晓是否成功拉取音视频，具体请参考 [常见通知回调](#常见通知回调) 中的“用户拉取音视频流的状态通知”。

远端用户推送的 “streamID” 可以从 [roomStreamUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_wxxcx~interface~ZegoWechatMiniEvent#room-stream-update) 回调中获得，具体回调设置请参考 [常见通知回调](#常见通知回调) 中的“房间内流状态变更的通知”。


```javascript
const setPlayUrl = (streamID, url, context) => {
  if (!url) {
    console.log(">>>[liveroom-room] setPlayUrl, url is null");
    return;
  }
  console.log("setPlayUrl", streamID, url);
  for (let i = 0; i < context.data.livePlayerList.length; i++) {
    if (
      context.data.livePlayerList[i]["streamID"] === streamID &&
      context.data.livePlayerList[i]["url"] === url
    ) {
      console.log(
        ">>>[liveroom-room] setPlayUrl, streamID and url are repeated"
      );
      return;
    }
  }

  let streamInfo = {
    streamID: "",
    url: ""
  };
  let isStreamRepeated = false;

  // 相同 streamID 的源已存在，更新 Url
  for (let i = 0; i < context.data.livePlayerList.length; i++) {
    if (context.data.livePlayerList[i]["streamID"] === streamID) {
      isStreamRepeated = true;
      context.data.livePlayerList[i]["url"] = url;
      break;
    }
  }

  // 相同 streamID 的源不存在，创建新 player
  if (!isStreamRepeated) {
    streamInfo["streamID"] = streamID;
    streamInfo["url"] = url;
    streamInfo["playerContext"] = wx.createLivePlayerContext(streamID);
    context.data.livePlayerList.push(streamInfo);
  }
  app.globalData.livePlayerList = context.data.livePlayerList
  context.setData({
    livePlayerList: context.data.livePlayerList,
  });
};
const playAll = async (streamList, context) => {
  console.log("streamList", streamList);
  if (streamList.length === 0) {
    console.log("startPlayingStream, streamList is null");
    return;
  }

  // 获取每个 streamId 对应的拉流 url
  for (let i = 0; i < streamList.length; i++) {
    /** 开始拉流，返回拉流地址 */
    try {
      console.error('type', context.data.playSource)
      let {
        streamID,
        url
      } = await zg.startPlayingStream(
        streamList[i].streamID, {
          sourceType: context.data.playSource || "BGP"
        }
      );
      console.log("streamID", streamID, url);
      setPlayUrl(streamID, url, context);
    } catch (error) {
      console.error("error", error);
    }
  }
};
const stopPlayAll = (streamList, context) => {
  if (streamList.length === 0) {
    console.log("stopPlayAll, streamList is empty");
    return;
  }
  let playStreamList = context.data.livePlayerList;
  for (let i = 0; i < streamList.length; i++) {
    let streamID = streamList[i].streamID;
    zg.stopPlayingStream(streamID);
    // 把远程被删除的流从播放的流列表中删除
    for (let j = 0; j < playStreamList.length; j++) {
      if (playStreamList[j]["streamID"] === streamID) {
        playStreamList.splice(j, 1);
        break;
      }
    }
  }
  context.setData({
    livePlayerList: playStreamList
  });
};
// 在 SDK 的回调 roomStreamUpdate 中获取拉流 streamID
// 当用户加入或离开房间时，该事件被触发
zg.on("roomStreamUpdate", (roomID, updateType, streamList) => {
  console.warn("roomStreamUpdate", roomID, updateType, streamList);
  if (updateType === "ADD") {
    this.setData({
      streamList: streamList
    })
    playAll(streamList, this);
  } else {
    stopPlayAll(streamList, this);
  }
});
```

### 注意事项

如果用户在音视频通话的过程中，遇到相关错误，可查询 [错误码](https://doc-zh.zego.im/article/9731)。


## 常用功能

### 常见通知回调

<Steps titleSite="h4">
<Step title="我在房间内的连接状态变化通知">
[roomStateUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_wxxcx~interface~ZegoRTMEvent#room-state-update)：本地调用 [loginRoom](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_wxxcx~class~ZegoExpressEngine#login-room) 加入房间时，您可通过监听该回调实时监控自己在该房间内的连接状态。

用户可以在回调中根据不同状态处理业务逻辑。

```javascript
zg.on('roomStateUpdate', (roomID, state, errorCode, extendedData) => {
    if (state == 'DISCONNECTED') {
        // 与房间断开了连接
	// ...
    }

    if (state == 'CONNECTING') {
        // 与房间尝试连接中
	// ...
    }

    if (state == 'CONNECTED') {
        // 与房间连接成功
	// ...
    }
})
```

<table>

  <tbody><tr>
    <th>状态</th>
    <th>含义</th>
  </tr>
  <tr>
    <td>DISCONNECTED</td>
    <td>未连接状态，在登录房间前/退出房间后进入该状态。如果登录房间的过程中出现稳态异常，比如 AppID 不正确，或者有相同用户名在其他地方登录导致本端被 KickOut，都会进入该状态。</td>
  </tr>
  <tr>
    <td>CONNECTING</td>
    <td>正在请求连接状态，登录房间动作执行成功后会进入该状态。通常情况下，可通过该状态进行 UI 界面的展示。如果是因为网络质量不佳产生的中断，SDK 内部会进行重试，也会进入正在请求连接状态。</td>
  </tr>
  <tr>
    <td>CONNECTED</td>
    <td>连接成功状态，成功登录房间后进入该状态。此时，用户可以正常收到房间内的用户和流信息增删变化的回调通知。</td>
  </tr>
</tbody></table>

</Step>
<Step title="其他用户进出房间的通知">
[roomUserUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_wxxcx~interface~ZegoRTMEvent#room-user-update)：同一房间内的其他用户进出房间时，您可通过此回调收到通知。登录房间后，当房间内有用户新增或删除时，SDK 会通过该回调通知。

<Warning title="注意">


只有调用 [loginRoom](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_wxxcx~class~ZegoExpressEngine#login-room) 接口登录房间时传入 [ZegoRoomConfig](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_wxxcx~interface~ZegoRoomConfig) 配置，且 “userUpdate” 参数取值为 “true” 时，用户才能收到 [roomUserUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_wxxcx~interface~ZegoRTMEvent#room-user-update) 回调。

</Warning>




```javascript
// 用户状态更新回调
zg.on('roomUserUpdate', (roomID, updateType, userList) => {
    console.warn(
        `roomUserUpdate: room ${roomID}, user ${updateType === 'ADD' ? 'added' : 'left'} `,
        JSON.stringify(userList),
    );
});
```

</Step>
<Step title="房间内流状态变更的通知">
[roomStreamUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_wxxcx~interface~ZegoWechatMiniEvent#room-stream-update)：流状态更新回调。登录房间后，当房间内有用户新推送或删除音视频流时，SDK 会通过该回调通知。

```javascript
// 流状态更新回调
zg.on('roomStreamUpdate', async (roomID, updateType, streamList, extendedData) => {
    if (updateType == 'ADD') {
        // 流新增，开始拉流
    } else if (updateType == 'DELETE') {
        // 流删除，停止拉流
    }
});
```

</Step>
<Step title="用户推送音视频流的状态通知">
<Tabs>
<Tab title="推流状态事件">
微信小程序会在 \<live-pusher> 的 [bindstatechange](https://developers.weixin.qq.com/miniprogram/dev/component/live-pusher.html) 绑定的方法中通知出推流状态事件，开发者需要：

1. 在 [bindstatechange](https://developers.weixin.qq.com/miniprogram/dev/component/live-pusher.html) 绑定的回调函数中，调用 SDK 的 [updatePlayerState](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_wxxcx~class~ZegoExpressEngine#update-player-state) 接口将推流状态事件透传给 SDK。

2. 在 SDK 的 [publisherStateUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_wxxcx~interface~ZegoWechatMiniEvent#publisher-state-update) 回调中处理推流的开始、失败状态。

```javascript
// live-pusher 绑定推流事件
onPushStateChange(e) {
    // 透传推流事件给 SDK
    zg.updatePlayerState(this.data.publishStreamID, e);
},

// 推流后，服务器主动推过来的，流状态更新
// NO_PUBLISH：未推流状态，PUBLISH_REQUESTING：正在请求推流状态，PUBLISHING：正在推流状态
// state: "PUBLISHING" | "NO_PUBLISH" | "PUBLISH_REQUESTING";
zg.on("publisherStateUpdate", (result) => {
    console.log("publishStateUpdate", result.state);
});
```
</Tab>
<Tab title="推流网络事件">
微信小程序会在 \<live-pusher> 的 [bindnetstatus](https://developers.weixin.qq.com/miniprogram/dev/component/live-pusher.html) 绑定的方法中通知出推流网络事件，开发者需要在对应的小程序回调中，调用 SDK 的 [updatePlayerNetStatus](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_wxxcx~class~ZegoExpressEngine#update-player-net-status) 接口将推流网络事件透传给 SDK。


```javascript
// live-pusher 绑定网络状态事件
onPushNetStateChange(e) {
    //透传网络状态事件给 SDK
    zg.updatePlayerNetStatus(this.data.publishStreamID, e);
},


// SDK 推流网络质量回调
zg.on("publishQualityUpdate", (streamID, publishStats) => {
    console.log("publishQualityUpdate", streamID, publishStats);
});
```

</Tab>
</Tabs>

</Step>
<Step title="用户拉取音视频流的状态通知">
<Tabs>
<Tab title="拉流状态事件">
微信小程序会在 \<live-player> 的 [bindstatechange](https://developers.weixin.qq.com/miniprogram/dev/component/live-player.html) 绑定的方法中通知出拉流状态事件，开发者需要：

1. 在 [bindstatechange](https://developers.weixin.qq.com/miniprogram/dev/component/live-player.html) 绑定的回调函数中，调用 SDK 的 [updatePlayerState](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_wxxcx~class~ZegoExpressEngine#update-player-state) 接口将拉流状态事件透传给 SDK。

2. 在 SDK 提供的 [playerStateUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_wxxcx~class~ZegoExpressEngine#update-player-state) 回调中处理拉流的开始或失败状态。

```javascript
// live-player 绑定的拉流事件
onPlayStateChange(e) {
    // 透传拉流事件给 SDK
    zg.updatePlayerState(e.currentTarget.id, e);
},

// 服务器主动推过来的流的播放状态
// 视频播放状态通知；state: "NO_PLAY" | "PLAY_REQUESTING" | "PLAYING";
zg.on("playerStateUpdate", (result) => {
    console.log("playStateUpdate", result.state);
});
```
</Tab>
<Tab title="拉流网络事件">
微信小程序会在 \<live-player> 的 [bindnetstatus](https://developers.weixin.qq.com/miniprogram/dev/component/live-player.html) 绑定的方法中通知出拉流网络事件，开发者需要在对应的小程序回调中，调用 SDK 的 [updatePlayerNetStatus](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_wxxcx~class~ZegoExpressEngine#update-player-net-status) 接口将推流网络事件透传给 SDK。

```javascript
// live-player 绑定网络状态事件
onPlayNetStateChange(e) {
    // 透传网络状态事件给 SDK
    zg.updatePlayerNetStatus(playStreamID, e);
},

// SDK 拉流网络质量回调
zg.on("playQualityUpdate", (playStreamID, playStats) => {
    console.log("playQualityUpdate", playStreamID, playStats);
});
```
</Tab>
</Tabs>

</Step>
</Steps>

### 停止音视频通话

<Steps titleSite="h4">
<Step title="停止推送/拉取音视频流">
1. **停止推流**

调用 SDK 的 [stopPublishingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_wxxcx~class~ZegoExpressEngine#stop-publishing-stream) 方法通知 SDK 停止推对应 streamID 的流。

调用微信推流组件上下文的 [LivePusherContext.stop](https://developers.weixin.qq.com/miniprogram/dev/api/media/live/LivePusherContext.stop.html) 方法停止推流。
```javascript
// 停止推流
this.data.livePusher.stop();
```


2. **停止拉流**

调用 SDK 的 [stopPlayingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_wxxcx~class~ZegoExpressEngine#stop-playing-stream)方法通知 SDK 停止拉对应 streamID 的流。

调用微信拉流组件上下文的 [LivePlayerContext.stop](https://developers.weixin.qq.com/miniprogram/dev/api/media/live/LivePlayerContext.stop.html) 方法停止拉流。

```javascript
// 停止拉流
let playStreamList = this.data.livePlayerList;
for (let i = 0; i < playStreamList.length; i++) {
  let streamID = playStreamList[i].streamID;
  zg.stopPlayingStream(streamID);
  // 把远程被删除的流从播放的流列表中删除
  playStreamList.splice(i, 1);
}
this.setData({
  livePlayerList: playStreamList
});
```

</Step>
<Step title="退出房间">
调用 SDK 的 [logoutRoom](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_wxxcx~class~ZegoExpressEngine#logout-room) 接口退出房间。

```javascript
zg.logoutRoom(roomID);
```

</Step>
</Steps>

## 调试视频通话功能

在真机中运行项目，运行成功后，可以看到本端视频画面。

为方便体验，ZEGO 提供了一个 [Web 端调试示例](https://zegodev.github.io/zego-express-webrtc-sample/assistDev/index.html)，在该页面下，输入相同的 AppID、RoomID，输入不同的 UserID、以及对应的 [Token](/console/development-assistance/temporary-token)，即可加入同一房间与真机设备互通。当成功开始音视频通话时，可以听到远端的音频，看到远端的视频画面。



## 视频通话 API 调用时序

整个推拉流过程的 API 调用时序可参考下图：

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/QuickStart/quickstart_uml_mini_new.png" /></Frame>
