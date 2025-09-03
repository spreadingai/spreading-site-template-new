# 秀场直播秒开方案

- - -

## 功能简介

在秀场直播场景中，通过优化观众拉流速度实现秒开。秒开拉流与普通拉流过程对比，秒开拉流的优势在于不依赖于登录房间成功的状态，发起登录房间的同时发起拉流，以加快拉流速度。以下是普通拉流与秒开拉流过程对比：

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Common/ZegoExpressEngine/Second_opening_scheme.png" /></Frame>


## 前提条件

在实现秀场直播秒开方案之前，请确保：

- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppID 和 AppSign，详情请参考 [控制台 - 项目信息](/console/project-info)。
- 已在项目中集成 ZEGO Express SDK，并实现了基本的音视频推拉流功能，详情请参考 [快速开始 - 集成](https://doc-zh.zego.im/article/7351) 和 [快速开始 - 实现流程](https://doc-zh.zego.im/article/8184)。

- 拉流前，已获取流 ID，且需保证主播为开播状态，开播状态由业务侧进行管理。
  <Note title="说明">
  拉流端需提前知道流 ID，通常按照固定规则拼接流 ID（比如按照 roomId_userId 方式拼接）、或者业务侧提前获得的房间信息增加流 ID 参数。
  </Note>



## 实现流程

### 初始化

详情请参考 [快速开始 - 实现流程](https://doc-zh.zego.im/article/8184#CreateEngine) 的“初始化”章节。

```cpp
ZegoEngineProfile profile;
// AppID 和 AppSign 由 ZEGO 分配给各 App；其中，为了安全考虑，建议将 AppSign 存储在 App 的业务后台，需要使用时从后台获取
profile.appID = appID;
profile.appSign = appSign;
// 指定使用直播场景 (请根据实际情况填写适合你业务的场景)
profile.scenario = ZegoScenario::ZEGO_SCENARIO_BROADCAST;
// 创建引擎实例
auto engine = ZegoExpressSDK::createEngine(profile, nullptr);
```

### 登录房间

详情请参考 [快速开始 - 实现流程](https://doc-zh.zego.im/article/8184#createroom) 的“登录房间”房间章节。

```cpp
// 创建用户对象
ZegoUser user("user1", "user1");
// 只有传入 “isUserStatusNotify” 参数取值为 “true” 的 ZegoRoomConfig，才能收到 onRoomUserUpdate 回调。
ZegoRoomConfig roomConfig;
//如果您使用 appsign 的方式鉴权，token 参数不需填写；如果需要使用更加安全的 鉴权方式： token 鉴权，请参考[如何从 AppSign 鉴权升级为 Token 鉴权](https://doc-zh.zego.im/faq/token_upgrade?product=ExpressVideo&platform=all)
// roomConfig.token = "xxxx";
roomConfig.isUserStatusNotify = true;
// 登录房间
engine->loginRoom(roomID, user, roomConfig, [=](){
    // (可选回调) 登录房间结果，如果仅关注登录结果，关注此回调即可
});
```

### 观众拉流

登录房间后，无需依赖于登录房间成功的状态，发起登录房间的同时，可以同时发起拉流，以加快拉流速度，实现秒开效果。

<Note title="说明">
- 推荐开发者使用超低延迟直播（Low-Latency Live Streaming，L3）进行拉流，实现更高质量的直播体验，具体请参考 [超低延迟直播](https://doc-zh.zego.im/article/6869#3) 。
- 当开发者使用 ZEGO 配置的 CDN 进行直推时，则可以直接通过 streamID 进行拉流，请参考 [快速开始 - 实现视频通话](https://doc-zh.zego.im/article/8184#3_4) 的 “拉流”。
- 当开发者使用第三方 CDN 进行直推时，则可以通过 URL 进行拉流，请参考 [通过 URL 拉流 ](https://doc-zh.zego.im/article/6862)。
</Note>


```cpp
// 开始拉流，设置远端拉流渲染视图 canvas，视图模式采用 SDK 默认的模式，等比缩放填充整个 View
ZegoCanvas canvas((void*)view);
// 填写了 url 参数后，sdk 会从 url 拉取音视频流，但此时依然需要传递一个唯一的 streamID 到 SDK，SDK 内部会以该 streamID 标识这条流
// 具体拉流方式，请参考 L3 拉流、RTC 拉流、CDN 拉流
engine->startPlayingStream(streamID, &canvas, config);
```

<Content />

