# 实现视频通话

---


## 功能简介

本文将介绍如何快速实现一个简单的实时音视频通话。

相关概念解释:

- ZEGO Express SDK：由 ZEGO 提供的实时音视频 SDK，能够为开发者提供便捷接入、高清流畅、多平台互通、低延迟、高并发的音视频服务。
- 推流：把采集阶段封包好的音视频数据流推送到 ZEGO 实时音视频云的过程。
- 拉流：从 ZEGO 实时音视频云将已有音视频数据流拉取播放的过程。
- 房间：是 ZEGO 提供的音视频空间服务，用于组织用户群，同一房间内的用户可以互相收发实时音视频及消息。
    1. 用户需要先登录某个房间，才能进行推流、拉流操作。
    2. 用户只能收到自己所在房间内的相关消息（用户进出、音视频流变化等）。


更多相关概念请参考 [术语说明](/glossary/term-explanation)。

<Warning title="注意">
目前支付宝小程序仅支持 1v1 音视频通话。
</Warning>




## 前提条件

在实现基本的实时音视频功能之前，请确保：

- 已在项目中集成 ZEGO Express SDK，详情请参考 [支付宝小程序 - 集成 SDK](https://doc-zh.zego.im/article/18244)。
- 已在 [ZEGO 控制台](https://console.zego.im/) 创建项目，申请有效的 AppID 和 Server 地址，详情请参考 [控制台 - 项目信息](/console/project-info)。
* **已联系 ZEGO 技术支持，提供您的 [支付宝 APPID](https://opendocs.alipay.com/common/02nebp)，开通了相关权限，并获取到了接入 MRTC 的相应参数，以及完成了挂包（Android 设备需要下载挂包）后，才可以正常使用 [RTC room 组件](https://opendocs.alipay.com/pre-open/08757t?pathHash=d1fc6c9f)。**
* 确保您的支付宝小程序符合以下类目，并开通实时音视频权限（获取到对应的小程序 AppID），详情请参考 [申请开通](https://opendocs.alipay.com/pre-open/08757t?pathHash=d1fc6c9f)。

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Express/wx_program/AliPay_miniprogram_item.png" /></Frame>

## 示例代码

请参考 [基础推拉流 1v1](https://github.com/zegoim/zego-express-alimini-sample/tree/master/pages/base)。

## 实现流程

用户通过 ZEGO Express SDK 进行视频通话的基本流程为：

用户 A、B 加入房间，用户 B 预览并将音视频流推送到 ZEGO 云服务（推流），用户 A 收到用户 B 推送音视频流的通知之后，在通知中播放用户 B 的音视频流（拉流）。

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Common/ZegoExpressEngine/common_usage_zh_Web.png" /></Frame>

### 配置支付宝小程序后台

1. 在初始化 SDK 前，需要在 [支付宝平台](https://openhome.alipay.com/develop/manage) 中进行如下配置：

    [服务器 IP 白名单](https://opendocs.alipay.com/common/02kg65)：在 “开放平台控制台 > 对应应用概览页 > 开发设置 > 开发信息 > 服务器IP白名单”，点击 “设置/查看”，进入 IP 白名单管理页面，按照协议分类，将 ZEGO 的 LogUrl、以及用户业务需要用到的地址填到指定的“服务器 IP 白名单”中，详情请参考 [控制台 - 项目信息](/console/project-info)。

<Warning title="注意">


    [ZEGO 控制台](https://console.zego.im/) 提供的 LogUrl 地址格式为：`https://xxxxxxxxxx.com/httplog`。在 [支付宝平台](https://openhome.alipay.com/develop/manage) 填写时，不能直接复制原地址，需要删除原地址的 “/httplog”，应填入地址的格式为：xxxxxxxxxx.com。

</Warning>



2. 输入 [RTC room 组件](https://opendocs.alipay.com/pre-open/08757t?pathHash=d1fc6c9f) 所必须的 MRTC 参数、以及身份验证签名 signature，支付宝服务器会直接和 ZEGO 的 RTMP 网关进行推拉流对接。

    - MRTC 参数，包含 bizName、subBiz、以及 serverUrl。
    - [RTC room 组件](https://opendocs.alipay.com/pre-open/08757t?pathHash=d1fc6c9f) 的参数 signature，是由 bizName、subBiz、秘钥 key 等加密生成，具体生成规则请参考 [流媒体签名使用说明](https://opendocs.alipay.com/pre-open/0876cs?pathHash=f6441b0b)。

<a id="initialization"> </a>

### 初始化

**1.创建界面**

根据场景需要，为您的项目创建视频通话的用户界面。我们推荐您在项目中添加如下元素：

- 本地预览窗口
- 远端视频窗口
- 结束按钮

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/QuickStart/express_quickstart_video_call.png" /></Frame>

**参考界面代码：**

```xml
<view class="body">
  <view class="containerBase">
    <rtc-room
      a:if="{{showRtcroom}}"
      class="rtcContent"
      id="{{rtcroomID}}"
      roomId="{{rtcroom.roomId}}"
      token="{{rtcroom.token}}"
      userId="{{rtcroom.userId}}"
      signature="{{rtcroom.signature}}"
      autoplay="{{rtcroom.autoplay}}"
      enable-camera="{{rtcroom.enableCamera}}"
      mute="{{rtcroom.mute}}"
      fps="{{rtcroom.fps}}"
      resolution="{{rtcroom.resolution}}"
      record="{{rtcroom.record}}"
      min-bitrate="{{rtcroom.minBitrate}}"
      max-bitrate="{{rtcroom.maxBitrate}}"
      extraInfo="{{rtcroom.extraInfo}}"
      onError="onError"
      onRoomInfo="onRoomInfo"
      onParticipantEnter="onParticipantEnter"
      onParticipantLeave="onParticipantLeave"
      onAudioPlayoutMode="onAudioPlayoutMode"
      onReceiveRecordId="onReceiveRecordId"
      onRtmpEvent="onRtmpEvent"
    />
  </view>
  <view class="index-container">
    <view class='input-container'>
      <input
        value="{{roomID}}"
        onInput="keyInput"
        placeholder="请输入房间 ID"
        placeholder-style='color: #b3b3b3; font-size: 14px;'
        class="room-input"
      />
      <text class="tip"></text>
    </view>
    <view class="button-container">
      <button type="primary" onTap="openRoom" data-role="1" class="btn">
        加入房间(推流)
      </button>
      <button type="primary" onTap="openRoom2" data-role="0" class="btn">
        加入房间(不推流)
      </button>
      <button type="primary" onTap="publishStream" data-role="1" class="btn">
        推流
      </button>

      <button type="primary" onTap="stopPushStream" data-role="1" class="btn">
        停止推流
      </button>
      <button type="primary" onTap="stopPullStream" data-role="0" class="btn">
        停止拉流
      </button>
      <button type="primary" onTap="enableCamera" data-role="0" class="btn">
        {{ rtcroom.enableCamera ? "关闭摄像头" : "开启摄像头"}}
      </button>
      <button type="primary" onTap="enableMicrophone" data-role="0" class="btn">
        {{ rtcroom.mute ? "开启麦克风" : "关闭麦克风"}}
      </button>
      <button type="primary" onTap="logout" class="logoutBtn">退出房间</button>
    </view>
  </view>
</view>
```


**2.创建引擎**

创建 [ZegoExpressEngine ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_wxxcx~class~ZegoExpressEngine) 引擎实例，将申请到的 AppID 传入参数 “appID”，将获取到的 Server 地址传入参数 “server”。

```javascript
// 初始化实例
zg = new ZegoExpressEngine(appID, server);
```

**3.设置回调**

创建引擎后，开发者可根据实际需要，通过引擎实例的 [on](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_wxxcx~class~ZegoExpressEngine#on)  方法设置回调。

<Warning title="注意">


为避免错过事件通知，建议在创建引擎后立即监听回调

</Warning>



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


<Accordion title="常见通知回调" defaultOpen="true">
**我在房间内的连接状态变化通知**

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


**其他用户进出房间的通知**

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

**房间内流状态变更的通知**

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

**用户推送音视频流的状态通知**

支付宝小程序会在 [\<rtc-room> 组件](https://opendocs.alipay.com/pre-open/08757t?pathHash=d1fc6c9f) 的 “onRtmpEvent” 属性绑定的方法中，通知出推流状态事件，开发者需要：

- 在 “onRtmpEvent” 绑定的回调函数中，调用 SDK 的 [updatePlayerState](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_wxxcx~class~ZegoExpressEngine#update-player-state) 接口，将推流状态事件透传给 SDK。

- 在 SDK 的 [publisherStateUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_wxxcx~interface~ZegoWechatMiniEvent#publisher-state-update) 回调中，处理推流的开始、失败状态。

```javascript
// rtc-room 绑定的 onRtmpEvent 事件，更新推拉流状态
onRtmpEvent(e) {
    console.warn("onRtmpEvent, e=" + JSON.stringify(e));
    if ([3800, 3801].includes(e.detail.code)) {
        // 推流
        zg.updatePlayerState(this.data.pushStreamID, e);
    }
},

// 推流后，服务器主动推过来的，流状态更新
// NO_PUBLISH：未推流状态，PUBLISH_REQUESTING：正在请求推流状态，PUBLISHING：正在推流状态
// state: "PUBLISHING" | "NO_PUBLISH" | "PUBLISH_REQUESTING";
zg.on("publisherStateUpdate", (result) => {
    console.log("publishStateUpdate", result.state);
});
```

**用户拉取音视频流的状态通知**

支付宝小程序会在 [\<rtc-room> 组件](https://opendocs.alipay.com/pre-open/08757t?pathHash=d1fc6c9f) 的 “onRtmpEvent” 属性绑定的方法中，通知出拉流状态事件，开发者需要：

- 在 “onRtmpEvent” 绑定的回调函数中，调用 SDK 的 [updatePlayerState](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_wxxcx~class~ZegoExpressEngine#update-player-state) 接口，将拉流状态事件透传给 SDK。

- 在 SDK 提供的 [playerStateUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_wxxcx~class~ZegoExpressEngine#update-player-state) 回调中，处理拉流的开始、失败状态。

```javascript
// rtc-room 绑定的onRtmpEvent事件，更新推拉流状态
onRtmpEvent(e) {
    console.warn("onRtmpEvent, e=" + JSON.stringify(e));
    if ([3800, 3801].includes(e.detail.code)) {
        // 推流
        zg.updatePlayerState(this.data.pushStreamID, e);
    } else if ([3802, 3803].includes(e.detail.code)) {
        // 拉流
        zg.updatePlayerState(this.data.pullStreamID, e);
    }
},

// 服务器主动推过来的流的播放状态
// 视频播放状态通知；state: "NO_PLAY" | "PLAY_REQUESTING" | "PLAYING";
zg.on("playerStateUpdate", (result) => {
    console.log("playStateUpdate", result.state);
});
```
</Accordion>

### 登录房间

**1. 获取登录 Token**

登录房间需要用于验证身份的 Token，获取方式请参考 [用户权限控制](/real-time-video-miniprogram/communication/using-token-authentication)。如需快速调试，建议使用控制台生成的临时 Token，生成临时 Token 的具体操作请参考 [控制台 - 项目管理](/console/project-info)。

**2. 登录房间**

您可以调用 SDK 的 [loginRoom ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_wxxcx~class~ZegoExpressEngine#login-room) 接口，传入房间 ID 参数 “roomID”、“token” 和用户参数 “user”，登录房间。如果房间不存在，调用该接口时会创建并登录此房间。

您可通过监听 [roomStateUpdate ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_wxxcx~interface~ZegoRTMEvent#room-state-update) 回调实时监控自己在本房间内的连接状态，具体请参考 [常见通知回调 ](https://doc-zh.zego.im/article/18243#3_2) 中的“我在房间内的连接状态变化通知”。

roomID 和 user 的参数由您本地生成，但是需要满足以下条件：

- 同一个 AppID 内，需保证 “roomID” 全局唯一。
- 同一个 AppID 内，需保证 “userID” 全局唯一，建议开发者将 “userID” 与自己业务的账号系统进行关联。
- “userID” 必须与生成 token 时传入的 userID 保持一致，否则登录失败。

<Warning title="注意">


为避免错过任何通知，您需要在登录房间前先设置所有的监听回调（如房间状态、用户状态、流状态、推拉流状态等），具体请参考 [ 常见通知回调 ](https://doc-zh.zego.im/article/18243#3_2)。

</Warning>



<a id="publishingStream"></a>

```javascript
// 登录房间，成功则返回 true
const result = await zg.loginRoom(roomID, token, {
    userID: "user1", // userID，需用户自己定义，保证全局唯一，建议设置为业务系统中的用户唯一标识
    userName: "user1_name" // userName 用户名
}, {
    userUpdate: true // 是否接收用户进出房间的回调，设置为 true 才能接收到房间内其他用户进出房间的回调
});
```


### 将自己的音视频流推送到 ZEGO 音视频云

必须完成创建业务场景的 AXML 之后，才能调用 SDK 接口创建推流和拉流实例。

调用 [startPublishingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_wxxcx~class~ZegoExpressEngine#start-publishing-stream) 获取推流地址，并将推流地址赋值给 [\<rtc-room> 组件](https://opendocs.alipay.com/pre-open/08757t?pathHash=d1fc6c9f) 的 extraInfo 扩展参数的 `rtmpPushUrl` 属性。**请注意，必须在创建组件时传入，直接通过 setData 更新无效。**

“streamID” 由您本地生成，但是需要保证：

- 同一个 AppID 下，“streamID” 全局唯一。如果同一个 AppID 下，不同用户各推了一条 “streamID” 相同的流，后推流的用户推流失败。
- “streamID” 长度不超过 256 字节的字符串。仅支持数字、英文字符和 "-"、"_"。

```javascript
// 控制 <rtc-room> 组件的显示隐藏
handleShowRtcroom() {
    const extraInfo = this.data.rtcroom.extraInfo
    const isShow = Boolean(extraInfo.rtmpPullUrl || extraInfo.rtmpPushUrl);
    this.setData({
        showRtcroom: false,
    }, () => {
        this.data.rtcroomContext && this.data.rtcroomContext.stop();
        const id = "rtcroom-" + Date.now()
        this.setData({
            rtcroomID: id,
            showRtcroom: isShow,
            rtcroomContext: my.createRtcRoomContext(id)
        })
    })
}

// 推流方登录房间成功后触发推流
/** 开始推流，返回推流地址 */
const pushStreamID = this.data.pushStreamID;
const {
    url
} = await zg.startPublishingStream(pushStreamID, publishOption);
const rtcroom = this.data.rtcroom;
console.warn(`startPush 推流地址${url}，推流类型：${publishOption && publishOption.sourceType}`);
rtcroom.extraInfo.rtmpPushUrl = url;
rtcroom.enableCamera = true;
this.setData({
    rtcroom: rtcroom,
    needRepublish: false
}, () => {
    this.handleShowRtcroom()
});
```


### 拉取其他用户的音视频

进行视频通话时，我们需要拉取到其他用户的音视频。

通过调用[startPlayingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_wxxcx~class~ZegoExpressEngine#start-playing-stream) 获取拉流地址，并将拉流地址赋值给 [\<rtc-room> 组件](https://opendocs.alipay.com/pre-open/08757t?pathHash=d1fc6c9f) 的 extraInfo 扩展参数的 `rtmpPullUrl` 属性。**请注意，必须在创建组件时传入，直接通过 setData 更新无效。**

您可通过监听 [playerStateUpdate ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_wxxcx~interface~ZegoWechatMiniEvent#player-state-update) 回调知晓是否成功拉取音视频，具体请参考 [常见通知回调](https://doc-zh.zego.im/article/18243#3_2) 中的“用户拉取音视频流的状态通知”。

远端用户推送的 “streamID” 可以从 [roomStreamUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_wxxcx~interface~ZegoWechatMiniEvent#room-stream-update) 回调中获得，具体回调设置请参考 [常见通知回调](https://doc-zh.zego.im/article/18243#3_2) 中的“房间内流状态变更的通知”。

<Warning title="注意">


如果您的业务场景中需要拉空流，请联系 ZEGO 技术支持进行特殊配制。

</Warning>



```javascript
zg.on("roomStreamUpdate", async (roomID, updateType, streamList) => {
    console.warn("roomStreamUpdate", roomID, updateType, streamList);
    const rtcroom = this.data.rtcroom;
    //拉流列表，一次只拉一条
    const pullList = this.data.pullList;
    if (updateType === "ADD") {
        pullList.push(...streamList);
    } else {
        streamList.forEach(i => {
            if (this.data.pullStreamID === i.streamID) {
                // 停止拉流
                zg.stopPlayingStream(i.streamID);
                rtcroom.extraInfo.rtmpPullUrl = ""
                this.setData({
                    rtcroom: rtcroom
                }, () => {
                    this.handleShowRtcroom();
                })
            }
            const index = pullList.findIndex(item => item.streamID === i.streamID);
            if (index !== -1) {
                pullList.splice(index, 1);
            }
        })
    }

    if (!rtcroom.extraInfo.rtmpPullUrl && pullList.length) {
        const pullStreamID = pullList[0].streamID;
        try {
            // 开始拉流
            const {
                url
            } = await zg.startPlayingStream(this.data.pullList[0].streamID)
            rtcroom.extraInfo.rtmpPullUrl = url
            this.setData({
                pullStreamID: pullStreamID,
                rtcroom: rtcroom
            }, () => {
                this.handleShowRtcroom();
            })
        } catch (error) {
            console.error(error)
        }
    }
    this.setData({
        pullList: pullList
    })
});
```

**注意事项**

如果用户在音视频通话的过程中，遇到相关错误，可查询 [错误码](https://doc-zh.zego.im/article/9731)。




### 在线测试推拉流功能

在真机中运行项目，运行成功后，可以看到本端视频画面。

为方便体验，ZEGO 提供了一个 [Web 端调试示例](https://zegodev.github.io/zego-express-webrtc-sample/assistDev/index.html)，在该页面下，输入相同的 AppID、RoomID，输入不同的 UserID、以及对应的 [Token](/console/development-assistance/temporary-token)，即可加入同一房间与真机设备互通。当成功开始音视频通话时，可以听到远端的音频，看到远端的视频画面。



### 停止音视频通话

**停止推送/拉取音视频流**

**1. 停止推流**

调用 [stopPublishingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_wxxcx~class~ZegoExpressEngine#stop-publishing-stream) 方法停止推流，并重新渲染 [\<rtc-room> 组件](https://opendocs.alipay.com/pre-open/08757t?pathHash=d1fc6c9f)。

```javascript
// 停止推流
  stopPushStream() {
    zg.stopPublishingStream(this.data.pushStreamID);
    this.data.rtcroom.extraInfo.rtmpPushUrl = ""
    this.setData({
      rtcroom: this.data.rtcroom,
    });
    this.handleShowrtcRoom()
  },
```

**2. 停止拉流**

调用 [stopPlayingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_wxxcx~class~ZegoExpressEngine#stop-playing-stream) 方法停止拉流，并重新渲染 [\<rtc-room> 组件](https://opendocs.alipay.com/pre-open/08757t?pathHash=d1fc6c9f)。

<Warning title="注意">


如果开发者通过 [roomStreamUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_wxxcx~interface~ZegoWechatMiniEvent#room-stream-update) 回调收到了音视频流 “减少” 的通知，请及时调用 [stopPlayingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_wxxcx~class~ZegoExpressEngine#stop-playing-stream) 接口停止拉流，避免拉到空流、产生额外的成本；或者，开发者可以根据自己的业务需求，选择合适的时机，主动调用 [stopPlayingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_wxxcx~class~ZegoExpressEngine#stop-playing-stream) 接口停止拉流。

</Warning>



```javascript
// 停止拉流
zg.stopPlayingStream(this.data.pullStreamID);
this.data.rtcroom.extraInfo.rtmpPullUrl = ""
this.setData({
    rtcroom: rtcroom
}, () => {
    this.handleShowRtcroom();
})
```

**退出房间**

调用 SDK 的 [logoutRoom](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_wxxcx~class~ZegoExpressEngine#logout-room) 接口退出房间。

```javascript
zg.logoutRoom(roomID);
```


## 视频通话 API 调用时序


整个推拉流过程的 API 调用时序可参考下图：

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/QuickStart/quickstart_uml_mini_new_alipay.png" /></Frame>
