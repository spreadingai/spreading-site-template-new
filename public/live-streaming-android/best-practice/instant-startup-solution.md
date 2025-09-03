# 秀场直播秒开方案

- - -

## 功能简介

在秀场直播场景中，通过优化观众拉流速度实现秒开。秒开拉流与普通拉流过程对比，秒开拉流的优势在于不依赖于登录房间成功的状态，发起登录房间的同时发起拉流，以加快拉流速度，以下是普通拉流与秒开拉流过程对比。

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Common/ZegoExpressEngine/Second_opening_scheme.png" /></Frame>


## 前提条件

在实现秀场直播秒开方案之前，请确保：

- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppID 和 AppSign，详情请参考 [控制台 - 项目信息](/console/project-info)。
- 已在项目中集成 ZEGO Express SDK，并实现了基本的音视频推拉流功能，详情请参考 [快速开始 - 集成](https://doc-zh.zego.im/article/13394) 和 [快速开始 - 实现流程](https://doc-zh.zego.im/article/13395)。

- 拉流前，已获取流 ID，且需保证主播为开播状态，开播状态由业务侧进行管理。
  <Note title="说明">
  拉流端需提前知道流 ID，通常按照固定规则拼接流 ID（比如按照 roomId_userId 方式拼接）、或者业务侧提前获得的房间信息增加流 ID 参数。
  </Note>



## 实现流程

### 初始化

详情请参考 [快速开始 - 实现流程](https://doc-zh.zego.im/article/13395#CreateEngine) 的“初始化”章节。

```java
// 创建 ZegoExpress 实例，监听常用事件
void createEngine() {
    // 创建引擎，通用场景接入，并注册 self 为 eventHandler 回调
    // 不需要注册回调的话，eventHandler 参数可以传 null，后续可调用 "setEventHandler:" 方法设置回调
    ZegoEngineProfile profile = new ZegoEngineProfile();
    profile.appID = appID;  // 请通过官网注册获取，格式为：1234567890L
    profile.appSign = appSign; //请通过官网注册获取，格式为：@"0123456789012345678901234567890123456789012345678901234567890123"（共64个字符）
    profile.scenario = ZegoScenario.BROADCAST;  // 指定使用直播场景 (请根据实际情况填写适合你业务的场景)
    profile.application = getApplication();
    engine = ZegoExpressEngine.createEngine(profile, null);
}
```

### 登录房间

详情请参考 [快速开始 - 实现流程](https://doc-zh.zego.im/article/13395#createroom) 的“登录房间”章节。

```java
ZegoUser userInfo = new ZegoUser(userID, userName);
ZegoRoomConfig roomConfig = new ZegoRoomConfig();
roomConfig.isUserStatusNotify = true; //房间实时通知人数变化.
engine.loginRoom(roomID, userInfo, roomConfig);
```

### 观众拉流

登录房间后，无需依赖于登录房间成功的状态，发起登录房间的同时，可以同时发起拉流，以加快拉流速度，实现秒开效果。

<Note title="说明">
- 推荐开发者使用超低延迟直播（Low-Latency Live Streaming，L3）进行拉流，实现更高质量的直播体验，具体请参考 [超低延迟直播](https://doc-zh.zego.im/) 。
- 当开发者使用 ZEGO 配置的 CDN 进行直推时，则可以直接通过 streamID 进行拉流，请参考 [快速开始 - 实现视频通话](https://doc-zh.zego.im/article/13395#拉流) 的 “拉流”。
- 当开发者使用第三方 CDN 进行直推时，则可以通过 URL 进行拉流，请参考 [通过 URL 拉流 ](https://doc-zh.zego.im/)。
</Note>


```java
ZegoCanvas zegoCanvas = new ZegoCanvas(view);
zegoCanvas.viewMode = ZegoViewMode.ASPECT_FILL;
//具体拉流方式，请参考 L3 拉流、RTC 拉流、CDN 拉流
engine.startPlayingStream(streamID, zegoCanvas);
```

<Content />

