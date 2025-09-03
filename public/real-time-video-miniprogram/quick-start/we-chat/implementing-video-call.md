# 实现视频通话

---


## 功能简介

本文将介绍如何快速实现一个简单的实时音视频通话。

<Note title="说明">


- ZEGO 提供了 \<zego-pusher> 和 \<zego-player>，可以帮助开发者更快地实现实时音视频。用户也可以选择使用微信原生小程序推拉流组件 \<live-pusher> 和 \<live-player> 进行推拉流，参考 [使用微信原生组件实现通话](https://doc-zh.zego.im/article/14945)。
- 微信开发者工具只支持本地预览，不支持推拉流，推荐使用真机调试。

</Note>



相关概念解释:

- ZEGO Express SDK：由 ZEGO 提供的实时音视频 SDK，能够为开发者提供便捷接入、高清流畅、多平台互通、低延迟、高并发的音视频服务。
- 推流：把采集阶段封包好的音视频数据流推送到 ZEGO 实时音视频云的过程。
- 拉流：从 ZEGO 实时音视频云将已有音视频数据流拉取播放的过程。
- 房间：是 ZEGO 提供的音视频空间服务，用于组织用户群，同一房间内的用户可以互相收发实时音视频及消息。
    1. 用户需要先登录某个房间，才能进行推流、拉流操作。
    2. 用户只能收到自己所在房间内的相关消息（用户进出、音视频流变化等）。


更多相关概念请参考 [术语说明](/glossary/term-explanation)。

<Warning title="注意">

如下实现流程支持的是 SDK 需为 2.10.0 及以上版本，如使用 2.10.0 以下版本的 SDK 请参考旧版方案 [实现视频通话](https://doc-zh.zego.im/article/14192)。

</Warning>




## 前提条件

在实现基本的实时音视频功能之前，请确保：
- 已在项目中集成 ZEGO Express SDK，详情请参考 [微信小程序 - 集成 SDK](https://doc-zh.zego.im/article/18251)。
- 已在 [ZEGO 控制台](https://console.zego.im/) 创建项目，申请有效的 AppID 和 Server 地址，详情请参考 [控制台 - 项目信息](/console/project-info)。

## 示例代码

请参考 [基础推拉流_即构组件]( https://gitee.com/zegodev/zego-express-wxmini-sample/tree/master/pages/base_zego)。

## 实现流程

用户通过 ZEGO Express SDK 进行视频通话的基本流程为：

用户 A、B 加入房间，用户 B 预览并将音视频流推送到 ZEGO 云服务（推流），用户 A 收到用户 B 推送音视频流的通知之后，在通知中播放用户 B 的音视频流（拉流）。


<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Common/ZegoExpressEngine/common_usage_flowchart_new.png" /></Frame>


### 配置微信小程序后台

在初始化 SDK 前，需要在 [微信公众平台](https://mp.weixin.qq.com/?token=&lang=zh_CN) 中进行如下配置：

- [服务器域名配置](https://developers.weixin.qq.com/miniprogram/dev/framework/ability/network.html)：在“小程序后台 > 开发管理 > 开发设置 > 服务器域名”中，按照协议分类，将即构 Server 地址、LogUrl、以及用户业务需要用到的地址填到指定的“socket合法域名”或“request合法域名”中，详情请参考 [控制台 - 项目信息](/console/project-info)。

<Warning title="注意">


    - 控制台提供的 Server 地址格式为：wss://xxxxxxxxxx.com/ws。在 [微信公众平台](https://mp.weixin.qq.com/?token=&lang=zh_CN) 填写时，不能直接复制原地址，需要删除原地址的 “/ws”，应填入地址的格式为：wss://xxxxxxxxxx.com。
    - 控制台提供的 LogUrl 地址格式为：`https://xxxxxxxxxx.com/httplog`。在 [微信公众平台](https://mp.weixin.qq.com/?token=&lang=zh_CN) 填写时，不能直接复制原地址，需要删除原地址的 “/httplog”，应填入地址的格式为：https://xxxxxxxxxx.com。
    - 如果您使用 3.0.0 或以上版本（包括 3.6.0 及以上版本）的 SDK，还需要添加一些 socket 域名，详情请参考 [3.0.0 及以上版本升级指南](/real-time-video-miniprogram/client-sdk/upgrade-guide/upgrade-to-v3)。
    - 如果您使用 3.6.0 或以上版本的 SDK，还需要添加一些 request 域名，详情请参考 [3.6.0 及以上版本升级指南](/real-time-video-miniprogram/client-sdk/upgrade-guide/upgrade-to-v3-6)。

</Warning>



    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/MiniProgram/Configure_server_domain_name.png" /></Frame>


- 相关功能开启：在“小程序后台 > 开发管理 > 接口设置 > 接口权限”中，打开 **实时播放音视频流** 和 **实时录制音视频流** 功能开关。

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/MiniProgram/apiconfig_2.png" /></Frame>

- 由于使用摄像头或者麦克风涉及到用户隐私，请参考微信官方文档 [配置小程序用户隐私保护指引](https://developers.weixin.qq.com/doc/oplatform/Third-party_Platforms/2.0/product/privacy_setting.html) 补充相应用户隐私保护指引。否则，当您的项目部署到正式环境时，将无法推流。

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
<view wx:if="{{canShow== 1}}" class="">
  <view class="containerBase">
  	<zego-pusher id="zegoPusher" pusher="{{pusher}}" />
	<zego-player wx:for="{{zegoPlayerList}}" wx:key="id" id="{{item.componentID}}" playerId="{{item.playerId}}"
			playerList="{{playerList}}" />
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


**2.创建引擎**

创建 [ZegoExpressEngine ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_wxxcx~class~ZegoExpressEngine) 引擎实例，将申请到的 AppID 传入参数 “appID”，将获取到的 Server 地址传入参数 “server”。

```javascript
// 初始化实例
zg = new ZegoExpressEngine(appID, server);
```

<Warning title="注意">


若使用 3.6.0 及以上版本 SDK，server 可填空字符串。

</Warning>




**3.设置回调**

创建引擎后，开发者可根据实际需要，通过引擎实例的 [on](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_wxxcx~class~ZegoExpressEngine#on) 方法设置回调。

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


<Accordion title="常见通知回调" defaultOpen="false">
**我在房间内的连接状态变化通知**

[roomStateUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_wxxcx~interface~ZegoRTMEvent#room-state-update)：本地调用 [loginRoom](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_wxxcx~class~ZegoExpressEngine#login-room) 加入房间时，您可通过监听该回调实时监控自己在本房间内的连接状态。

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

- 推流状态事件

    ```javascript
    // 推流后，服务器主动推过来的，流状态更新
    // NO_PUBLISH：未推流状态，PUBLISH_REQUESTING：正在请求推流状态，PUBLISHING：正在推流状态
    // state: "PUBLISHING" | "NO_PUBLISH" | "PUBLISH_REQUESTING";
    zg.on("publisherStateUpdate", (result) => {
    console.log("publishStateUpdate", result.state);
    });
    ```

- 推流网络事件

    ```javascript
    // SDK 推流网络质量回调
    zg.on("publishQualityUpdate", (streamID, publishStats) => {
        console.log("publishQualityUpdate", streamID, publishStats);
    });
    ```

**用户拉取音视频流的状态通知**

- 拉流状态事件

    ```javascript
    // 服务器主动推过来的流的播放状态
    // 视频播放状态通知；state: "NO_PLAY" | "PLAY_REQUESTING" | "PLAYING";
    zg.on("playerStateUpdate", (result) => {
        console.log("playStateUpdate", result.state);
    });
    ```


- 拉流网络事件

    ```javascript
    // SDK 拉流网络质量回调
    zg.on("playQualityUpdate", (playStreamID, playStats) => {
        console.log("playQualityUpdate", playStreamID, playStats);
    });
    ```
</Accordion>

### 登录房间

**1. 获取登录 Token**

登录房间需要用于验证身份的 Token，获取方式请参考 [用户权限控制](/real-time-video-miniprogram/communication/using-token-authentication)。如需快速调试，建议使用控制台生成的临时 Token，生成临时 Token 的具体操作请参考 [控制台 - 项目管理](/console/project-info)。

**2. 登录房间**

您可以调用 SDK 的 [loginRoom ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_wxxcx~class~ZegoExpressEngine#login-room) 接口，传入房间 ID 参数 “roomID”、“token” 和用户参数 “user”，登录房间。如果房间不存在，调用该接口时会创建并登录此房间。

您可通过监听 [roomStateUpdate ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_wxxcx~interface~ZegoRTMEvent#room-state-update) 回调实时监控自己在本房间内的连接状态，具体请参考 [常见通知回调 ](https://doc-zh.zego.im/article/18250#3_2) 中的“我在房间内的连接状态变化通知”。

roomID 和 user 的参数由您本地生成，但是需要满足以下条件：

- 同一个 AppID 内，需保证 “roomID” 全局唯一。
- 同一个 AppID 内，需保证 “userID” 全局唯一，建议开发者将 “userID” 与自己业务的账号系统进行关联。
- “userID” 必须与生成 token 时传入的 userID 保持一致，否则登录失败。

<Warning title="注意">



为避免错过任何通知，您需要在登录房间前先设置所有的监听回调（如房间状态、用户状态、流状态、推拉流状态等），具体请参考 [常见通知回调 ](https://doc-zh.zego.im/article/18250#3_2)。

</Warning>




```javascript
// 登录房间，成功则返回 true
const result = await zg.loginRoom(roomID, token, {
    userID: "user1", // userID，需用户自己定义，保证全局唯一，建议设置为业务系统中的用户唯一标识
    userName: "user1_name" // userName 用户名
}, {
    userUpdate: true // 是否接收用户进出房间的回调，设置为 true 才能接收到房间内其他用户进出房间的回调
});

```

<a id="publishingStream"></a>

### 将自己的音视频流推送到 ZEGO 音视频云

**初始化小程序组件实例**

调用 [initContext ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_wxxcx~class~ZegoExpressEngine#init-context) 接口初始化小程序组件。

组件中用于存储推流属性 pusher 和拉流属性列表 playerList 的两个字段需要传给 SDK，SDK 后续将通过传入的两个字段对相应的推拉流作状态及视图更新处理。

- pusher 字段中的属性值请参考 [ZegoWxPusherAttributes](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_wxxcx~interface~ZegoWxPusherAttributes)。
- playerlist 字段中的属性值请参考 [ZegoWxPlayerAttributes](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_wxxcx~interface~ZegoWxPlayerAttributes)。

```javascript
zg.initContext({
     wxContext: this,
     pushAtr: "pusher", // pushAtr 的值必须与下文 <zego-pusher> 中的 pusher 属性值一致
     playAtr: "playerList" // playAtr 的值必须与下文 <zego-player> 中的 playerList 属性值一致
})
```


**创建对应业务场景的 WXML**

1. 复制组件代码到项目工程中

将示例代码 [components](https://gitee.com/zegodev/zego-express-wxmini-sample/tree/master/components) 文件夹下的 zego-player 和 zego-pusher 两个文件夹，复制到您的业务代码 components 文件夹中。


2. 在项目 JSON 文件中引入组件

根据您的项目结构，在对应的 JSON 文件中引入 \<zego-pusher> 和 \<zego-player> 组件。

``` javascript
// 在 JSON 文件中引入组件
{
  "usingComponents": {
    "zego-pusher": "../../components/zego-pusher/zego-pusher",
    "zego-player": "../../components/zego-player/zego-player"
  }
}
```


3. 在 WXML 文件中引入组件

在 WXML 文件中引入 \<zego-pusher> 和 \<zego-player> 组件。

``` javascript
// 在 WXML 文件中引入组件
// zego-pusher 的 pusher 属性值必须与 initContext 中传入的 pushAtr 参数值一致
  <zego-pusher id="zegoPusher" pusher="{{pusher}}" />
// zego-player 的 playerList 的属性值必须与 initContext 中传入的 playAtr 参数值一致。 zegoPlayerList 见 3.5 拉取其他用户的音视频
  <zego-player wx:for="{{zegoPlayerList}}" wx:key="id" id="{{item.componentID}}" playerId="{{item.playerId}}" playerList="{{playerList}}" />
```


**推送音视频流到 ZEGO 音视频云**

必须完成初始化小程序组件实例和创建业务场景的 WXML 之后，才能调用 SDK 接口创建推流和拉流实例。

用户调用 SDK 的 [createPusher](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_wxxcx~class~ZegoExpressEngine#create-pusher) 接口创建推流实例，并通过调用实例对象上的 [start](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_wxxcx~class~ZegoWxLivePusher#start) 接口，传入流 ID 参数 “streamID”。您可通过监听 [publisherStateUpdate ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_wxxcx~interface~ZegoWechatMiniEvent#publisher-state-update) 回调知晓推流是否成功，具体请参考 [常见通知回调 ](https://doc-zh.zego.im/article/18250#3_2) 中的“用户推送音视频流的状态通知”。

“streamID” 由您本地生成，但是需要保证：
- 同一个 AppID 下，“streamID” 全局唯一。如果同一个 AppID 下，不同用户各推了一条 “streamID” 相同的流，后推流的用户推流失败。
- “streamID” 长度不超过 256 字节的字符串。仅支持数字、英文字符和 "-"、"_"。

```javascript
// 推流方登录房间成功后触发推流
 const pusher = zg.createPusher();
 pusher.start("streamID_xxx");
```

### 拉取其他用户的音视频

进行视频通话时，我们需要拉取到其他用户的音视频。

用户先调用 [getPlayerInstance](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_wxxcx~class~ZegoExpressEngine#get-player-instance) 接口，根据传入的流 ID 参数 “streamID”，获取 streamID 对应的拉流实例，然后通过调用拉流实例对象的 [play](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_wxxcx~class~ZegoWxLivePlayer#play) 接口开始拉流。您可通过监听 [playerStateUpdate ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_wxxcx~interface~ZegoWechatMiniEvent#player-state-update) 回调知晓是否成功拉取音视频，具体请参考 [常见通知回调 ](https://doc-zh.zego.im/article/18250#3_2) 中的“用户拉取音视频流的状态通知”。

远端用户推送的 “streamID” 可以从 [roomStreamUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_wxxcx~interface~ZegoWechatMiniEvent#room-stream-update) 回调中获得，具体回调设置请参考 [常见通知回调 ](https://doc-zh.zego.im/article/18250#3_2) 中的“房间内流状态变更的通知”。


```javascript
// 在 SDK 的回调 roomStreamUpdate 中获取拉流 streamID
// 当房间内其他用户推的流增加或减少时触发
zg.on("roomStreamUpdate", (roomID, updateType, streamList) => {
    console.log("roomStreamUpdate", roomID, updateType, streamList);
    if (updateType === "ADD") {
      // ----- 使用 zego-player 组件的 startPlay 接口播放 -----
      for (let i = 0; i < streamList.length; i++) {
        try {
          // 设置 zego-player 组件属性
          const zegoPlayerAttr = {
            componentID: `zego-${streamList[i].streamID}`,
            playerId: streamList[i].streamID
          }
          // 添加到组件列表中
         this.data.zegoPlayerList.push(zegoPlayerAttr)
          // 更新，并渲染组件列表
         this.setData({
            zegoPlayerList:this.data.zegoPlayerList
          })

          // 在zegoPlayerList更新后， 将zg实例传入对应的流id的组件内
          const zegoPlayer = this.selectComponent(`#${zegoPlayerAttr.componentID}`)
          if (!zegoPlayer) return console.warn("未能获取到组件节点", streamList[i].streamID)
          // 开始播放
          console.warn("开始拉流", roomID, streamList[i].streamID);
          await zegoPlayer.startPlay(zg, streamList[i].streamID)
        } catch (error) {
          console.error("拉流出错，等待房间重连恢复", error)
        }
      }
      // ------- 或者使用拉流实例对象的 play 接口播放------
       //streamList.forEach(i => {
          // zg.getPlayerInstance(i.streamID).play();
       //})
    } else {
      streamList.forEach((streamItem) => {
        zg.getPlayerInstance(streamItem.streamID).stop()
        // 流停止，并且移除对应的组件
       this.data.zegoPlayerList = this.data.zegoPlayerList.filter(
          (comItem) => streamItem.streamID !== comItem.playerId
        )
      })
      this.setData({
        zegoPlayerList: this.data.zegoPlayerList
      })
    }

});
```

**注意事项**

如果用户在音视频通话的过程中，遇到相关错误，可查询 [错误码](https://doc-zh.zego.im/article/9731)。

### 在线测试推拉流功能

在真机中运行项目，运行成功后，可以看到本端视频画面。

为方便体验，ZEGO 提供了一个 [Web 端调试示例](https://zegodev.github.io/zego-express-webrtc-sample/assistDev/index.html)，在该页面下，输入相同的 AppID、RoomID，输入不同的 UserID、以及对应的 [Token](/console/development-assistance/temporary-token)，即可加入同一房间与真机设备互通。当成功开始音视频通话时，可以听到远端的音频，看到远端的视频画面。



### 停止音视频通话

<a id="Stoppublishplay"></a>

**停止推送和拉取音视频流**

**1. 停止推流**

调用 SDK 的 [getPusherInstance](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_wxxcx~class~ZegoExpressEngine#get-pusher-instance) 接口获取推流实例，并调用推流实例的 [stop](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_wxxcx~class~ZegoWxLivePusher#stop) 方法停止推流。

```javascript
// 停止推流
zg.getPusherInstance().stop();
```

**2. 停止拉流**

调用 SDK 的 [getPlayerInstance](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_wxxcx~class~ZegoExpressEngine#get-player-instance) 接口获取拉流实例，并调用推流实例的 [stop](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_wxxcx~class~ZegoWxLivePlayer#stop) 方法停止拉流。

<Warning title="注意">
如果开发者通过 [roomStreamUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_wxxcx~interface~ZegoWechatMiniEvent#room-stream-update) 回调收到了音视频流 “减少” 的通知，请及时调用 [stop ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_wxxcx~class~ZegoWxLivePlayer#stop) 接口停止拉流，避免拉到空流、产生额外的成本；或者，开发者可以根据自己的业务需求，选择合适的时机，主动调用 [stop](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_wxxcx~class~ZegoWxLivePlayer#stop) 接口停止拉流。

</Warning>



```javascript
// 停止拉流
zg.getPlayerInstance(streamID).stop();
```

**退出房间**

调用 SDK 的 [logoutRoom](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_wxxcx~class~ZegoExpressEngine#logout-room) 接口退出房间。

```javascript
zg.logoutRoom(roomID);
```
### 销毁引擎

如果用户彻底不使用音视频功能时，可调用 [destroyEngine ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_wxxcx~class~ZegoExpressEngine#destroy-engine) 接口销毁引擎，释放麦克风、摄像头、内存、CPU 等资源。

```javascript
zg.destroyEngine();
zg = null;
```



## 视频通话 API 调用时序


整个推拉流过程的 API 调用时序可参考下图：

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/QuickStart/quickstart_uml_mini_new.png" /></Frame>

## 相关文档

- 如果需要了解 API 返回的错误码，请参考 [错误码文档](https://doc-zh.zego.im/article/9731)。
- 如果需要修改视频清晰度，请参考 [设置视频属性](/real-time-video-miniprogram/video/video-attributes) 文档。
