# 多人视频通话

- - -

## 功能简介

本文展示了如何使用 ZEGO Express SDK 构造多人视频通话场景，即实现多对多实时音视频互动。用户可在房间内与其余用户进行实时视频通话，互相推拉流。该场景可用于多人实时视频聊天、视频会议等。

## 前提条件

在应用多人视频通话场景之前，请确保：

- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppID 和 AppSign，详情请参考 [控制台 - 项目信息](/console/project-info)。
- 已在项目中集成 ZEGO Express SDK，并实现了基本的音视频推拉流功能，详情请参考 [快速开始 - 集成](https://doc-zh.zego.im/article/7774) 和 [快速开始 - 实现流程](https://doc-zh.zego.im/article/10330)。


## 示例源码下载

请参考 [下载示例源码](https://doc-zh.zego.im/article/8787) 获取源码。

相关源码请查看 “/pages/example/other/scenes/video-multiple-user.nvue” 目录下的文件。

## 使用步骤

本节将介绍如何使用 ZEGO Express SDK 实现多人视频通话。

- 多人视频通话的流程图如下：

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Android/ExpressSDK/Scenes/VideoForMultipleUsers/Video_for_Multiple_Users_process_android.png" /></Frame>

- API 调用时序图如下：

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/uniapp/VideoForMultipleUsers/Video_for_Multiple_Users_uniapp_new.png" /></Frame>

<Note title="说明">


ZEGO Express SDK 可支持多人视频通话，如上时序图以 2 名房间成员间的实时视频通话为例，建议开发者参考上述流程设计自己的多人实时视频通话场景。

</Note>




### 1 创建引擎

定义 SDK 引擎对象，调用 [createEngineWithProfile](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/classes/_zegoexpressengine_.zegoexpressengine.html#createenginewithprofile) 接口，将申请到的 AppID 和 AppSign 传入参数 “appID” 和 “appSign”，创建引擎单例对象。

```javascript
// 定义 SDK 引擎对象
let engine = undefine;

// 创建引擎，AppID 和 AppSign 由 ZEGO 分配给各 App；为了安全考虑，建议将 AppSign 存储在 App 的业务后台，需要使用时从后台获取；采用通用场景
const profile = {
appID : xxx,
appSign : "xxx",
scenario : 0
};

engine = await ZegoExpressEngine.createEngineWithProfile(profile)
```


### 2 开启房间内用户变化通知

开发者需在每位用户登录房间时将 [ZegoRoomConfig ](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/classes/_zegoexpressdefines_.zegoroomconfig.html) 中的 “isUserStatusNotify” 设为 “true” ，用于接收其他用户进出房间的回调通知。

```javascript
// 登录房间
this.engine.loginRoom(roomID, user, {isUserStatusNotify: true});
```

### 3 设置事件通知回调

为实现多人视频通话功能，需要监听房间内用户和流的增减并做出相应处理，可通过 [on](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/classes/_zegoexpressengine_.zegoexpressengine.html#on) 设置相关回调。

#### 监听房间内的用户变化

注册 [roomUserUpdate](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/interfaces/_zegoexpresseventhandler_.zegoeventlistener.html#roomuserupdate) 回调，用于监听房间内的用户变化，已登录房间内用户的新增和删除都会触发该回调。

回调中 “updateType” 参数指明了房间内用户变化的类型，该参数取值如下：

|用户变化类型|枚举值|说明|
|-|-|-|
|用户新增| ZegoUpdateType.Add|房间内用户增加，“userList” 为新增的用户列表。|
|用户减少|ZegoUpdateType.Delete|房间内用户减少，“userList” 为减少的用户列表。|

用户首次登录房间时，若此房间内已存在其他用户，该新登录用户会通过此回调接收到新增类型的用户列表，即 “updateType” 为 “ZegoUpdateType.Add” 的回调，该用户列表为房间内已存在的用户。

<Warning title="注意">


- 只有在 [loginRoom ](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/classes/_zegoexpressengine_.zegoexpressengine.html#loginroom) 登录房间时允许了状态通知，即将 [ZegoRoomConfig](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/classes/_zegoexpressdefines_.zegoroomconfig.html) 中的 “isUserStatusNotify” 设为 "true" 时（默认为 “false” ），才能监听 [roomUserUpdate](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/interfaces/_zegoexpresseventhandler_.zegoeventlistener.html#roomuserupdate) 回调。
- 当房间内人数超过 500 人时，该回调会失效。

</Warning>



```javascript
this.engine.on("roomUserUpdate", (roomID, updateType, userList) => {
   // 在这里更新 UI 或执行其他操作
});
```

#### 监听房间内的流变化

为监听房间内的流变化，需注册 [roomStreamUpdate](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/interfaces/_zegoexpresseventhandler_.zegoeventlistener.html#roomstreamupdate) 回调，房间内其他用户新增或删除流时将触发此回调通知变更的流列表。

回调中 “updateType” 参数指明了房间内流变化的类型，该参数取值如下：

|流变化类型|枚举值|说明|
|-|-|-|
|流新增| ZegoUpdateType.Add|房间内流增加，“streamList” 为新增的流列表。|
|流减少|ZegoUpdateType.Delete|房间内流减少，“streamList” 为减少的流列表。|

用户首次登录房间时，若此房间内存在其他用户正在推流，会接收到流新增列表，即 “updateType” 为 “ZegoUpdateType.Add” 的回调。

```javascript
this.engine.on("roomStreamUpdate", (roomID, updateType, streamList) => {
    // 在这里更新 UI 或执行其他操作
});
```

### 4 开始推流/拉流

请参考 [快速开始 - 实现流程](https://doc-zh.zego.im/article/10330#publishingStream) 依次完成“推流”和“拉流”相关操作。
