# 媒体补充增强信息（SEI）

- - -

## 功能简介

在音视频流媒体应用中，除了可以流媒体通道推拉音视频内容外，还可以使用流 SEI（Supplemental Enhancement Information，媒体补充增强信息）通过流媒体通道将文本信息与音视频内容打包在一起，从主播端（推流端）推出，并从观众端（拉流端）接收，以此实现文本数据与音视频内容的精准同步的目的。

一般可用于视频画面的精准布局、远端歌词同步、直播答题等应用场景。

<Note title="说明">


SEI 的相关概念及原理请参考 [如何理解和使用 SEI（媒体补充增强信息）](https://doc-zh.zego.im/faq/sei)。

</Note>

## 前提条件

在实现 SEI 功能之前，请确保：

- 已在 [ZEGO 控制台](https://console.zego.im/) 创建项目，并申请有效的 AppID 和 AppSign，详情请参考 [控制台 - 项目信息](https://doc-zh.zego.im/article/12107)。
- 已在项目中集成 ZEGO Express SDK，并实现了基本的音视频推拉流功能，详情请参考 [快速开始 - 集成](https://doc-zh.zego.im/article/3234) 和 [快速开始 - 实现流程](https://doc-zh.zego.im/article/8620)。

## 使用步骤

发送与接收 SEI 信息功能，需要在推流端发送 SEI 信息，在拉流端接收 SEI 信息，如下图所示：

<Frame width="auto" height="auto" >
  <img src="https://doc-media.zego.im/sdk-doc/Pics/Common/ZegoExpressEngine/send_and_recv_sei_Andriod_new.png" />
</Frame>

### 1 （仅适用于 Web 项目）设置 SEI 类型

由于 SDK 默认使用 ZEGO 自行定义的 SEI（nalu type = 6, payload type = 243）类型打包，且此类型是 SEI 标准未规定的类型，因此跟视频编码器或者视频文件中的 SEI 不存在冲突。但当开发者需要使用第三方解码器解码时（如 FFmpeg），会导致解不出正确的 SEI，此时需要在推流前调用 [setSEIConfig ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoExpressEngine#set-sei-config) 接口更换 SDK 发送 SEI 的类型，使用 UserUnregister 的 SEI（nalu type = 6, payload type = 5）类型打包。

<Note title="说明">

- Web 端默认是关闭 SEI 功能。必须在推拉流前调用 SetSEIConfig 设置 SEI 类型来开启 SEI 功能。
- 仅当开发者使用第三方解码器解码 SEI 时需要修改 SEI 类型为 UserUnregister。
</Note>

```csharp
ZegoSEIConfig seiConfig = new ZegoSEIConfig();
// 采用 H.264 的 SEI (nalu type = 6,payload type = 5) 类型打包，因为视频编码器自身会产生 payload type 为 5 的 SEI，或者使用视频文件推流时，视频文件中也可能存在这样的 SEI，所以使用此类型时，用户需要把 uuid + content 当作 buffer 塞给 SEI 发送接口；此时为了区别视频编码器自身产生的 SEI， App 在发送此类型 SEI 时，可以填写业务特定的 uuid（uuid 长度为 16 字节），接收方使用 SDK 解析 payload type 为 5 的 SEI 时，会根据设置的过滤字符串过滤出 uuid 相符的 SEI 抛给业务，如果没有设置过滤字符串，SDK 会把所有收到的 SEI 都抛给开发者。
seiConfig.type = ZegoSEIType.ZegoDefined;
engine.SetSEIConfig(seiConfig);

// 通过 advancedConfig 设置 uuid 过滤字段，设置之后 SDK 只会抛出前 12 个字节为开发者所设置 uuid 的 SEI。
ZegoEngineConfig engineConfig = new ZegoEngineConfig();
engineConfig.advancedConfig = new Dictionary<string, string>();
// 其他用户通过 [onPlayerRecvSEI] 收到的 SEI 信息前 12 个字节一定是 zegozegozego，其他会被过滤。
engineConfig.advancedConfig.Add("unregister_sei_filter", "zegozegozego");
ZegoExpressEngine.SetEngineConfig(engineConfig);

// 开始推流。
engine.StartPublishingStream("STREAM_ID");
```

### 2 推流方

1. 调用 [CreateEngine](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoExpressEngine#create-engine) 接口创建 engine 对象。
2. 调用 [LoginRoom](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoExpressEngine#login-room) 接口登录房间。
3. 调用 [StartPublishingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoExpressEngine#start-publishing-stream) 接口推流。
4. 在推流成功后，调用 [SendSEI](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoExpressEngine#send-sei) 接口发送 SEI 信息。

```csharp
// 定义 SDK 引擎对象。
ZegoExpressEngine engine;

ZegoEngineProfile profile = new ZegoEngineProfile();
// 请通过官网注册获取，格式为 123456789L。
profile.appID = appID;
// 请通过官网注册获取，格式为：@"0123456789012345678901234567890123456789012345678901234567890123"（共 64 个字符）。Web 不要传入 appSign，需要使用 token 鉴权。
profile.appSign = appSign;
// 通用场景接入。
profile.scenario = ZegoScenario.DEFAULT;
// 创建引擎。
engine = ZegoExpressEngine.CreateEngine(profile);

// ...... 此处省略步骤 1 设置 SEI 类型代码。

// 登录房间。
engine.LoginRoom("roomid", new ZegoUser("userid_1"));
// 推流。
engine.StartPublishingStream("streamid");
// 开发者的其他业务逻辑。
...;
// 在业务场景需要的时机发送 SEI 信息。
string str = "zegozegozego Hello, World!";
byte[] utf8Bytes = Encoding.UTF8.GetBytes(str);
engine.SendSEI(utf8Bytes);
```

### 3 拉流方

1. 调用 [CreateEngine ](/live-streaming-u3d/communication/createengine) 接口创建 engine 对象。
2. 实现 engine 对象上接收 SEI 信息的 [OnPlayerSyncRecvSEI](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~IZegoEventHandler#on-player-sync-recv-sei) 方法。
3. 调用 [LoginRoom](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoExpressEngine#login-room) 接口登录房间。
4. 调用 [StartPlayingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoExpressEngine#start-playing-stream) 接口拉流。
5. 在拉流成功后，接收到推流端发送的 SEI 信息之后触发 [OnPlayerSyncRecvSEI](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~IZegoEventHandler#on-player-sync-recv-sei) 回调。


<Note title="说明">

拉流时，如果开发者通过调用 [MutePlayStreamVideo](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoExpressEngine#mute-play-stream-video) 或 [MuteAllPlayStreamVideo](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoExpressEngine#mute-all-play-stream-video) 接口，设置了只拉音频流时，将无法接收 SEI 信息。

</Note>

```csharp
// 定义 SDK 引擎对象。
ZegoExpressEngine engine;

ZegoEngineProfile profile = new ZegoEngineProfile();
// 请通过官网注册获取，格式为 123456789L。
profile.appID = appID;
// 请通过官网注册获取，格式为：@"0123456789012345678901234567890123456789012345678901234567890123"（共 64 个字符）。Web 不要传入 appSign，需要使用 token 鉴权。
profile.appSign = appSign;
// 通用场景接入。
profile.scenario = ZegoScenario.DEFAULT;
// 创建引擎。
engine = ZegoExpressEngine.CreateEngine(profile);

// ...... 此处省略步骤 1 设置 SEI 类型代码。

// 实现 onPlayerSyncRecvSEI 的事件回调函数。
engine.onPlayerSyncRecvSEI += (string streamID, byte[] data) => {
    // 在这里实现业务场景相关的逻辑, 例如展现相关的 UI 等。
};
// 登录房间。
engine.LoginRoom(("roomid", new ZegoUser("userid_2"));
// 拉流, canvas 为 ZegoCanvas 类型的索引 UI 渲染控件的对象。
engine.StartPlayingStream("streamid");
// 开发者的其他业务逻辑。
...;
```

## 相关文档

[如何理解和使用 SEI（媒体补充增强信息）？](https://doc-zh.zego.im/faq/sei)

<Content />