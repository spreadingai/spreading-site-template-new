# 通过 URL 拉流

---

## 功能简介

<Warning title="注意">



本文档暂不适用于 Web 平台。

</Warning>




当推流端使用第三方推流工具（例如 OBS 软件、网络摄像头 IP Camera 等）将流推到 CDN 时，或通过 ZEGO SDK 转推 CDN 功能将音视频画面推送到第三方 CDN 上时，可直接传入 URL 地址进行拉流。

## 示例源码下载

请参考 [下载示例源码](https://doc-zh.zego.im/article/3130) 获取源码。

相关源码请查看 “lib\topics\StreamAdvanced\stream_by_cdn” 目录下的文件。

## 前提条件

在实现 URL 拉流功能之前，请确保：

- 已在项目中集成 ZEGO Express SDK，实现基本的实时音视频功能，详情请参考 [快速开始 - 集成](https://doc-zh.zego.im/article/1241) 和 [快速开始 - 实现流程](https://doc-zh.zego.im/article/7634)。
- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppID 和 AppSign，详情请参考 [控制台 - 项目信息](/console/project-info)。
- 已联系 ZEGO 技术支持开通 URL 拉流功能。
- 已将音视频流推送到 CDN，并知晓相应的 URL，详情请参考 [使用 CDN 直播](https://doc-zh.zego.im/article/10912)。

## 使用步骤

<a id="ZegoCDNConfig"></a>

### 1 配置拉流参数

直接通过 CDN 的 URL 地址拉流，需要使用 [ZegoCDNConfig](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoCDNConfig-class.html) 对象来填入 URL 参数，如果对应的 CDN 配置了拉流鉴权，还需要通过 `authParam` 字段填入鉴权参数。

<Note title="说明">
- 鉴权参数，即 URL 的 “?” 之后的字符串（不包括 “?”）。例如从 CDN 拉流的 URL 为 “rtmp://xxxx.yyy.zzz?a=qqq&b=www” 时，则鉴权参数为 “a=qqq&b=www”。
- 拉流 URL 的鉴权参数主要用于防盗链，具体鉴权规则请联系具体的 CDN 厂商或 ZEGO 技术支持咨询。若无鉴权参数，请忽略 “authParam” 字段。
- 拉流支持的协议有：RTMP、FLV、HLS 。
</Note>
<Content />



```dart
// 设置 CDN 参数
// URL 为 CDN 拉流地址
String url = "rtmp://xxxxxxxx";
// 如果需要鉴权则要设置鉴权参数，如果不需要鉴权可以不设置（鉴权参数不能带"?"字符）
String authParam = "xxx";
var config = ZegoCDNConfig(url, authParam);

var zegoPlayerConfig = ZegoPlayerConfig.defaultConfig();
zegoPlayerConfig.cdnConfig = config;
```

### 2 开始拉流

<Warning title="注意">


- 通过 URL 拉流前，需保证已登录房间。
- 通过 URL 拉流时，不能直接通过填入流 ID 进行拉流，实际拉流画面以 URL 为准。
- 虽然此时流 ID 不能用于拉流，但 SDK 内部仍以流 ID 作为唯一标识，用于后续拉流相关回调中。因此流 ID 仍需要在整个 AppID 内全局唯一。

</Warning>



通过调用 [startPlayingStream](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePlayer/startPlayingStream.html) 接口开始拉流。

拉流时，如果出现错误，请参考 [常见错误码 - 1004xxx 拉流相关的错误码](https://doc-zh.zego.im/article/5641#5)。

```dart
// 开始拉流，设置远端拉流渲染视图 canvas，视图模式采用 SDK 默认的模式，等比缩放填充整个 View

// 若使用实时音视频 SDK 或者音视频场景时，填写了 URL 参数后，SDK 会从 URL 拉取音视频流，但此时依然需要传递一个唯一的 streamID 到 SDK，SDK 内部会以该 streamID 标识这条流
ZegoExpressEngine.instance.startPlayingStream("STREAM_ID", canvas: ZegoCanvas(viewID), config: zegoPlayerConfig);

// 若使用实时语音 SDK 或者纯音频场景时，不需要传 canvas 参数
// ZegoExpressEngine.instance.startPlayingStream("STREAM_ID", config: zegoPlayerConfig);
```

### 3 停止拉流

若要停止拉流，调用 [stopPlayingStream](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePlayer/stopPlayingStream.html) 接口。

```dart
// 停止拉流
// 停止拉流时传递的是拉流时传入的 streamID
ZegoExpressEngine.instance.stopPlayingStream("STREAM_ID");
```

### 4（可选）监听拉流相关事件通知

<Accordion title="监听拉流相关事件通知" defaultOpen="false">
可以通过 [onPlayerStateUpdate](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngine/onPlayerStateUpdate.html) 来监听从 CDN 拉流的结果。

<Warning title="注意">


如果不是使用 ZEGO SDK 进行推流，而是使用第三方推流工具直接进行推流、但是使用 ZEGO SDK 进行拉流，这种场景下推流方没有使用 ZEGO SDK 加入房间，拉流方默认收不到 [onRoomStreamUpdate](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngine/onRoomStreamUpdate.html)的回调。

</Warning>



```dart
ZegoExpressEngine.onPlayerStateUpdate(String streamID, ZegoPlayerState state, int errorCode, Map<String, dynamic> extendedData) = {
    // 调用拉流接口成功后，当拉流器状态发生变更，如出现网络中断导致推流异常等情况，SDK 在重试拉流的同时，会通过该回调通知
    // 1. 当收到该回调通知且 state 为 Playing 时，表示拉流成功
    // 2. 当收到该回调通知且 state 为 PlayRequesting 时，表示可能是正在拉流或者由于网络中断等原因导致 SDK 正在重试拉流
    // 3. 当收到该回调通知且 state 为 NoPlay 时，表示拉流停止
    // 4. 通过 URL 拉流时，回调参数中的 streamID 即为调用拉流 API 时的流 ID，用于唯一标识当次拉流事件。
};
```
</Accordion>
