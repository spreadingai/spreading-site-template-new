# 实现视频通话（原生平台）

---

## 功能简介

本文将介绍如何快速实现一个简单的实时音视频通话。

相关概念解释:

- ZEGO Express SDK：由 ZEGO 提供的实时音视频 SDK，能够为开发者提供便捷接入、高清流畅、多平台互通、低延迟、高并发的音视频服务。
- 流：指一组按指定编码格式封装，不断发送中的音视频数据。一个用户可以同时推多条流（例如一条推摄像头数据，一条推屏幕共享数据）也可以同时拉多条流。每条流都由一个流 ID（streamID）标识。
- 推流：把封包好的音视频数据流推送到 ZEGO 实时音视频云的过程。
- 拉流：从 ZEGO 实时音视频云将已有音视频数据流拉取播放的过程。
- 房间：是 ZEGO 提供的音视频空间服务，用于组织用户群，同一房间内的用户可以互相收发实时音视频及消息。
    1. 用户需要先登录某个房间，才能进行推流、拉流操作。
    2. 用户只能收到自己所在房间内的相关消息（用户进出、音视频流变化等）。
    3. 每个房间由一个 ApplD 内唯一的 roomlD 标识。所有使用同一个 roomID 登录房间的用户即属于同房间。



更多相关概念请参考 [术语说明](/glossary/term-explanation)。

<Note title="说明">


如需使用 Cocos Creator 快速实现一个简单的实时音视频通话 Web 项目，可参考 [实现视频通话（Web）文档](https://doc-zh.zego.im/article/21307)。

</Note>




## 前提条件

在实现基本的实时音视频功能之前，请确保：

- 已在项目中集成 ZEGO Express SDK，实现基本的实时音视频功能，详情请参考 [快速开始 - 集成](https://doc-zh.zego.im/article/16919)。
- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppID 和 AppSign，详情请参考 [控制台 - 项目管理](/console/project-info) 中的“项目信息”。

<Warning title="注意">

SDK 同时也支持 Token 鉴权，若您对项目安全性有更高要求，建议您升级鉴权方式，详情请参考 [如何从 AppSign 鉴权升级为 Token 鉴权](http://doc-zh.zego.im/faq/token_upgrade?product=ExpressVideo)。
</Warning>

## 实现流程

用户通过 ZEGO Express SDK 进行视频通话的基本流程为：

用户 A、B  加入房间，用户 B 预览并将音视频流推送到 ZEGO 云服务（推流），用户 A 收到用户 B 推送音视频流的通知之后，在通知中播放用户 B 的音视频流（拉流）。

<Frame width="512" height="auto" caption="">
  <img src="https://doc-media.zego.im/sdk-doc/Pics/Common/ZegoExpressEngine/common_usage_new.png" />
</Frame>

### 创建引擎

**1. 创建界面（可选）**

<Accordion title="添加界面元素" defaultOpen="false">
在开始之前，推荐开发者添加以下界面元素，方便实现基本的实时音视频功能。

- 本地预览窗口
- 远端视频窗口
- 结束按钮

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/QuickStart/UI_PC.jpg" /></Frame>
</Accordion>

**2. 创建引擎**

调用 [createEngine](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~typescript_cocos-creator~class~ZegoExpressEngine#create-engine) 接口，将申请到到 AppID 和 AppSign 传入参数 **appId** 和 **appSign**。

根据 App 实际的音视频业务选择一个合适的场景，请参考 [场景化音视频配置](https://doc-zh.zego.im/article/16923) 文档，把选择好的场景枚举传入参数 **scenario**。

<Warning title="注意">


SDK 同时也支持 Token 鉴权，若您对项目安全性有更高要求，建议您升级鉴权方式，可参考 [如何从 AppSign 鉴权升级为 Token 鉴权](http://doc-zh.zego.im/faq/token_upgrade?product=ExpressVideo)。

</Warning>




```ts
// 定义 SDK 引擎对象
public engine: ZegoExpressEngine | null = null
let profile = new ZegoEngineProfile()
profile.appID = appID // 请通过官网注册获取，格式为 123456789
profile.appSign = appSign // 请通过官网注册获取，格式为"0123456789012345678901234567890123456789012345678901234567890123"，64个字符
profile.scenario = ZegoScenario.HighQualityVideoCall // 高品质音视频通话场景接入（请根据实际情况选择合适的场景）

// 初始化 SDK
this.engine = ZegoExpressEngine.createEngine(profile, this)
```

**3. 注册 SDK 事件回调**

您可以通过实现[ZegoEventHandler](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~typescript_cocos-creator~class~ZegoEventHandler) 接口的类并实现需要的回调方法，以监听并处理所关注的事件回调。然后将实例化对象作为`eventHandler`参数传递给 [createEngine](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~typescript_cocos-creator~class~ZegoExpressEngine#create-engine) 方法或者传递给 [setEventHandler](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~typescript_cocos-creator~class~ZegoExpressEngine#set-event-handler) 注册回调。

<Warning title="注意">


建议在创建引擎后就立即注册回调，避免延后注册错过事件通知。

</Warning>




首先需要一个实现了 [ZegoEventHandler](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~typescript_cocos-creator~class~ZegoEventHandler) 接口的类。

```ts
export class NewComponent extends Component implements ZegoEventHandler {

  public engine: ZegoExpressEngine | null = null

  start() {}
}
```

此时编译器会报出警告显示 “NewComponent 尚未实现函数 [onDebugError](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~typescript_cocos-creator~class~ZegoEventHandler#on-debug-error)”

```txt
Class 'NewComponent' incorrectly implements interface 'ZegoEventHandler'.
  Property 'onDebugError' is missing in type 'NewComponent' but required in type 'ZegoEventHandler'.ts(2420)
```

因此需要实现 [onDebugError](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~typescript_cocos-creator~class~ZegoEventHandler#on-debug-error) 函数。

<Warning title="注意">



[ZegoEventHandler](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~typescript_cocos-creator~class~ZegoEventHandler) 的其他函数都是 optional 可选函数，只有 [onDebugError](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~typescript_cocos-creator~class~ZegoEventHandler#on-debug-error) 是必选函数。

</Warning>





```ts
export class NewComponent extends Component implements ZegoEventHandler {

  public engine: ZegoExpressEngine | null = null

  start() {}

  onDebugError(errorCode: number, funcName: string, info: string): void {
    console.log('[ZEGO] onDebugError:', errorCode, funcName, info)
  }

}
```

然后可以根据实际需要，实现其他 SDK 事件回调函数。



### 登录房间

**1. 登录**

创建 ZegoUser 用户对象，设置用户信息 userID 和 userName 后，调用 [loginRoom](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~typescript_cocos-creator~class~ZegoExpressEngine#login-room) 传入房间 ID 参数 roomID 和用户参数 user，登录房间。如果房间不存在，调用该接口时，会自动创建并登录此房间。

- 同一个 AppID 内，需保证 roomID 全局唯一。
- 同一个 AppID 内，需保证 userID 全局唯一，建议开发者将其设置成一个有意义的值，可将 userID 与自己业务账号系统进行关联。
- userID 不能为空，否则会导致登录房间失败。

```ts
// 创建用户对象
let user = new ZegoUser()
user.userID = 'your_user_id'
user.userName = 'your_user_name'

// 只有传入 isUserStatusNotify 参数取值为 true 的 ZegoRoomConfig，才能收到 onRoomUserUpdate 回调。
let roomConfig = new ZegoRoomConfig()
roomConfig.isUserStatusNotify = true
// 如果您使用 AppSign 的方式鉴权，token 参数不需填写；如果需要使用更加安全的 token 鉴权。
// 请参考 [如何从 AppSign 鉴权升级为 Token 鉴权](https://doc-zh.zego.im/faq/token_upgrade?product=ExpressVideo&platform=all)
// roomConfig.token = 'xxxx'

// 登录房间
this.engine.loginRoom('your_room_id', user, roomConfig)
```

**2. 监听登录房间后的事件回调**

根据实际需要，在登录房间后监听想要关注的事件通知，例如，房间状态更新、用户状态更新、流状态更新等。

- [onRoomStateChanged](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~typescript_cocos-creator~class~ZegoEventHandler#on-room-state-changed) 房间状态变化通知回调。登录房间后，当房间连接状态发生变更（如出现房间断开，登录认证失败等情况），SDK 会通过该回调通知。
- [onRoomUserUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~typescript_cocos-creator~class~ZegoEventHandler#on-room-user-update) 房间内其他用户增加或减少的回调通知。登录房间后，当房间内有用户新增或删除时，SDK 会通过该回调通知。

- [onRoomStreamUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~typescript_cocos-creator~class~ZegoEventHandler#on-room-stream-update) 流状态更新回调。登录房间后，当房间内有用户新推送或删除音视频流时，SDK 会通过该回调通知。

<Warning title="注意">


- 只有调用 [loginRoom](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~typescript_cocos-creator~class~ZegoExpressEngine#login-room) 接口登录房间时，传入 [ZegoRoomConfig](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~typescript_cocos-creator~struct~ZegoRoomConfig) 配置，且 `isUserStatusNotify` 参数取值为 `true` 时，用户才能收到 [onRoomUserUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~typescript_cocos-creator~class~ZegoEventHandler#on-room-user-update) 回调。

- 通常情况下，如果某个用户想要播放其他用户推送的视频，可以在收到流状态更新（新增）的回调中，调用 [startPlayingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~typescript_cocos-creator~class~ZegoExpressEngine#start-playing-stream) 接口拉取远端推送的音视频流。


</Warning>



```ts
// 房间状态更新回调
onRoomStateChanged(roomID: string, reason: ZegoRoomStateChangedReason, errorCode: number, extendedData: string): void {
  // 根据需要实现事件回调
}

// 用户状态更新回调
onRoomUserUpdate(roomID: string, updateType: ZegoUpdateType, userList: ZegoUser[]): void {
  // 根据需要实现事件回调
}

// 流状态更新回调
onRoomStreamUpdate(roomID: string, updateType: ZegoUpdateType, streamList: ZegoStream[], extendedData: string): void {
  // 根据需要实现事件回调
}
```

### 推流

**1. 开始推流**

调用 [startPublishingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~typescript_cocos-creator~class~ZegoExpressEngine#start-publishing-stream) 接口，传入流 ID 参数 `streamID`，向远端用户发送本端的音视频流。

<Warning title="注意">


同一个 AppID 内，需保证 streamID 全局唯一。如果同一个 AppID 内，不同用户各推了一条 streamID 相同的流，会导致后推流的用户推流失败。


</Warning>



```ts
// 开始推流
this.engine.startPublishingStream('your_stream_id')
```

**2. 启用本地预览（可选）**

<Accordion title="设置预览视图并启动本地预览" defaultOpen="false">
开发者如果希望看到自己本端的画面，可调用 [startPreview](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~typescript_cocos-creator~class~ZegoExpressEngine#start-preview) 接口启动本地预览。

<Note title="说明">


由于 Android 设备和 iOS 设备的屏幕方向存在 Portrait/PortraitUpsideDown/LandscapeLeft/LandscapeRight 四种方向，为保证推流预览和拉流的显示界面始终在正确的方向，需要先添加推流预览和拉流的显示界面自适应横竖屏代码，详情请参考 [视频采集旋转](/real-time-video-cocos-creator/video/video-capture-rotation) 文档。


</Note>



SDK 支持通过 Cocos Creator 的 [Sprite](https://docs.cocos.com/creator/manual/zh/ui-system/components/editor/sprite.html?h=sprite) 组件进行预览的渲染。

首先在脚本里定义 `Sprite` 变量，并在编辑器中给 `Canvas` 节点下添加一个 `Sprite` 组件，然后在脚本节点的属性检查器中，把定义的变量指向 `anvas` 中的 `Sprite` 组件。

```ts
@property(Sprite)
localPreviewView: Sprite
```

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/CocosCreator/Express/cocos_express_demo_sprite_component.png" /></Frame>

```ts
// 调用开始预览接口
this.engine.startPreview({ view: this.localPreviewView })
```

您也可以用脚本动态创建 `Sprite` 并添加到画布中，不用提前在编辑器里添加 `Sprite*` 组件，这在多人视频通话场景中效果很好，可以参考 [跑通示例源码](/real-time-video-cocos-creator/quick-start/run-example-code) 中的多人视频通话章节。

```ts
// 实例化一个提前做好的模版节点
let node = instantiate(this.spriteNodePrototype)
// 调用开始预览接口
this.engine.startPreview({ view: node.getComponentInChildren(Sprite) })
```
</Accordion>

**3. 监听推流后的事件回调**

根据实际应用需要，在推流后监听想要关注的事件通知，比如推流状态更新、推流质量等。

- [onPublisherStateUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~typescript_cocos-creator~class~ZegoEventHandler#on-publisher-state-update) 推流状态更新回调。调用推流接口成功后，当推流状态发生变更（如出现网络中断导致推流异常等情况），SDK 在重试推流的同时，会通过该回调通知。

- [onPublisherQualityUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~typescript_cocos-creator~class~ZegoEventHandler#on-publisher-quality-update) 推流质量回调，调用推流接口成功后，定时回调音视频流质量数据（如分辨率、帧率、码率等）。

```ts
// 推流状态更新回调
onPublisherStateUpdate(streamID: string, state: ZegoPublisherState, errorCode: number, extendedData: string): void {
  // 根据需要实现事件回调
}

// 推流质量回调
onPublisherQualityUpdate(streamID: string, quality: ZegoPublishStreamQuality): void {
  // 根据需要实现事件回调
}
```

<Note title="说明">如果您需要了解 ZEGO Express SDK 的摄像头/视频/麦克风/音频/扬声器相关接口，请参考 [常见问题 - 如何实现开关摄像头/视频画面/麦克风/音频/扬声器？](http://doc-zh.zego.im/faq/How_to_switch_devices)。</Note>

### 拉流

**1. 开始拉流**

调用 [startPlayingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~typescript_cocos-creator~class~ZegoExpressEngine#start-playing-stream) 接口，根据传入的流 ID 参数 streamID，拉取远端推送的音视频流。

```ts
this.engine.startPlayingStream('stream_id')
```

<Note title="说明">


远端用户推送的 streamID 可以从 [onRoomStreamUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~typescript_cocos-creator~class~ZegoEventHandler#on-room-stream-update) 回调中获得。


</Note>



开发者如果希望看到远端拉流的画面，可传入 `view` 参数。

<Note title="说明">


由于 Android 设备和 iOS 设备的屏幕方向存在 Portrait/PortraitUpsideDown/LandscapeLeft/LandscapeRight 四种方向，为保证推流预览和拉流的显示界面始终在正确的方向，需要先添加推流预览和拉流的显示界面自适应横竖屏代码，请参考 [视频采集旋转](/real-time-video-cocos-creator/video/video-capture-rotation) 文档。


</Note>



SDK 支持通过 Cocos Creator 的 [Sprite](https://docs.cocos.com/creator/manual/zh/ui-system/components/editor/sprite.html?h=sprite) 组件进行远端拉流画面的渲染。

首先在脚本里定义 `Sprite` 变量，并在编辑器中给 `Canvas` 节点下添加一个 `Sprite` 组件，然后在脚本节点的属性检查器中把定义的变量指向 `Canvas` 里的 `Sprite` 组件。

```ts
@property(Sprite)
remotePlayView: Sprite
```

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/CocosCreator/Express/cocos_express_demo_sprite_component.png" /></Frame>

```ts
// 调用开始拉流接口
this.engine.startPlayingStream('stream_id', { view: this.remotePlayView })
```

您也可以用脚本动态创建 `Sprite` 并添加到画布中，不用提前在编辑器里添加 `Sprite` 组件，这在多人视频通话场景中非常有用，可以参考 [跑通示例源码](/real-time-video-cocos-creator/quick-start/run-example-code) 中的多人视频通话专题。

```ts
// 实例化一个提前做好的模版节点
let node = instantiate(this.spriteNodePrototype)
// 调用开始预览接口
this.engine.startPlayingStream('stream_id', { view: node.getComponentInChildren(Sprite) })
```

**2. 监听拉流后的事件回调**

根据实际应用需要，在拉流后监听想要关注的事件通知，比如拉流状态更新、拉流质量、流媒体事件等。

- [onPlayerStateUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~typescript_cocos-creator~class~ZegoEventHandler#on-player-state-update) 拉流状态更新回调。调用拉流接口成功后，当拉流状态发生变更（如出现网络中断导致推流异常等情况），SDK 在重试拉流的同时，会通过该回调通知。

- [onPlayerQualityUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~typescript_cocos-creator~class~ZegoEventHandler#on-player-quality-update) 拉流质量回调。拉流成功后每 3 秒会收到此回调，通过该回调可以获取拉取的音视频流的帧率，码率，RTT，丢包率等质量数据，实时监控拉取流的健康情况。

- [onPlayerMediaEvent](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~typescript_cocos-creator~class~ZegoEventHandler#on-player-media-event) 流媒体事件回调。当拉流发生音视频卡顿以及恢复等事件发生时会触发此回调。

```ts
// 拉流状态更新回调
onPlayerStateUpdate(streamID: string, state: ZegoPlayerState, errorCode: number, extendedData: string): void {
  // 根据需要实现事件回调
}

// 拉流质量回调
onPlayerQualityUpdate(streamID: string, quality: ZegoPlayStreamQuality): void {
  // 根据需要实现事件回调
}

// 流媒体事件回调
onPlayerMediaEvent(streamID: string, event: ZegoPlayerMediaEvent): void {
  // 根据需要实现事件回调
}
```

### 在线测试推拉流功能

在真机中运行项目，运行成功后，可以看到本端视频画面。

为方便体验，ZEGO 提供了一个 [Web 端调试示例](https://zegodev.github.io/zego-express-webrtc-sample/assistDev/index.html)，在该页面下，输入相同的 AppID、RoomID，输入不同的 UserID、以及对应的 [Token](/console/development-assistance/temporary-token)，即可加入同一房间与真机设备互通。当成功开始音视频通话时，可以听到远端的音频，看到远端的视频画面。


### 停止推拉流

**1. 停止推流/预览**

调用 [stopPublishingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~typescript_cocos-creator~class~ZegoExpressEngine#stop-publishing-stream) 接口停止向远端用户发送本端的音视频流。

```ts
// 停止推流
this.engine.stopPublishingStream()
```

如果启用了本地预览，调用 [stopPreview](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~typescript_cocos-creator~class~ZegoExpressEngine#stop-preview) 接口停止预览。

```ts
// 停止本地预览
this.engine.stopPreview()
```

**2. 停止拉流**

调用 [stopPlayingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~typescript_cocos-creator~class~ZegoExpressEngine#stop-playing-stream) 接口停止拉取远端推送的音视频流。

<Warning title="注意">
如果开发者通过 [onRoomStreamUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~typescript_cocos-creator~class~ZegoEventHandler#on-room-stream-update) 回调收到了音视频流 “减少” 的通知，请及时调用 [stopPlayingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~typescript_cocos-creator~class~ZegoExpressEngine#stop-playing-stream) 接口停止拉流，避免拉到空流、产生额外的成本；或者，开发者可以根据自己的业务需求，选择合适的时机，主动调用 [stopPlayingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~typescript_cocos-creator~class~ZegoExpressEngine#stop-playing-stream) 接口停止拉流。
</Warning>

```ts
// 停止拉流
this.engine.stopPlayingStream('stream_id')
```

### 退出房间

调用 [logoutRoom](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~typescript_cocos-creator~class~ZegoExpressEngine#logout-room) 接口退出房间。

```ts
// 退出房间
this.engine.logoutRoom()
```

### 销毁引擎

调用 [destroyEngine](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~typescript_cocos-creator~class~ZegoExpressEngine#destroy-engine) 接口销毁引擎，用于释放 SDK 使用的资源。

```ts
// 销毁引擎实例
ZegoExpressEngine.destroyEngine()
```

您也可以传入参数 `callback` 回调，当引擎销毁完成后，会回调传入的 lambda 闭包。

```ts
ZegoExpressEngine.destroyEngine(() => {
  console.log('[ZEGO] engine destroyed')
})
```
