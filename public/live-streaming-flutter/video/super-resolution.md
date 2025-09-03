# 超分辨率

- - -

## 功能简介

超分辨率（简称超分）功能可以在拉流端，对拉取到的视频流画面的宽和高的像素进行倍增。例如：拉流端拉取到的原始画面分辨率为 640p x 360p，对画面进行超分处理后分辨率将提升为 1280p x 720p。


### 效果展示

- 人像

|超分前|超分后|
|-|-|
|<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/VideoSuperResolution/portrait_360.jpg" /></Frame>| <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/VideoSuperResolution/portrait_720.jpg" /></Frame>|




- **文字**

|超分前|超分后|
|-|-|
|<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/VideoSuperResolution/text_360.jpg" /></Frame>| <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/VideoSuperResolution/text_720.jpg" /></Frame>|



### 应用场景

<Warning title="注意">
由于同一台设备同时只能对 1 条流开启超分功能，因此超分功能仅适用于在只有单流或者有 1 路焦点流的场景。
</Warning>

- 1V1 视频通话场景
- 直播场景：直播场景大多数情况下，只拉取 1 条流，可对拉取的单流直播画面开启超分。当拉取多条流时，可对重点关注的主播开启超分功能。
- 在线教育：在线教育场景可能存在多流，但是会有 1 路焦点流（如教师），可以选择对教师的板书画面或正在发言的学生画面开启超分功能，实现增强效果。

### 功能优势

- **低功耗**：开启 360p 超分后，以 OPPO R11 为例，电流增量小于 60mA，额外耗电极小。
- **低发热**：开启 360p 超分半小时后，以 OPPO R11（骁龙 660）为例，温度上升小于 1.5°C。
- **高性能**：能开启超分功能的设备，超过 95% 的 CPU 增量小于 2%，内存增量小于 100MB。



## 前提条件

<Warning title="注意">


开启超分功能会额外消耗系统资源，为了保证用户体验，目前仅支持对一路拉流画面开启超分，且该条流的原始分辨率不建议超过 640p × 360p。


</Warning>



在使用超分功能之前，请确保：

- 已联系 ZEGO 技术支持进行特殊编包。
- 已在项目中集成 ZEGO Express SDK，实现基本的实时音视频功能，详情请参考 [快速开始](/real-time-video-android-java/quick-start/integrating-sdk)。
- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppID 和 AppSign，详情请参考 [控制台 - 项目管理](/console-old/project-management)。


## 实现流程

### 初始化和登录房间

初始化和登录房间的具体流程，请参考实现视频通话文档中的 “[创建引擎](https://doc-zh.zego.im/article/17184#创建引擎)”及“[登录房间](https://doc-zh.zego.im/article/17184#登录房间)”。

### 监听超分状态回调

开启超分功能后，可通过 [onPlayerVideoSuperResolutionUpdate](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngine/onPlayerVideoSuperResolutionUpdate.html) 确认超分功能是否成功开启。

超分功能状态定义如下：

|枚举值|说明|
|-|-|
|ZegoSuperResolutionState.Off| 超分功能关闭。|
|ZegoSuperResolutionState.On|超分功能开启。|

通过 [onPlayerVideoSizeChanged](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngine/onPlayerVideoSizeChanged.html) 可获取超分功能开启后的拉流视频分辨率。

```dart
// 拉流视频分辨率发生变化的通知
ZegoExpressEngine.onPlayerVideoSizeChanged(String streamID, int width, int height) {

}
// 超分状态发生变化的通知
ZegoExpressEngine.onPlayerVideoSuperResolutionUpdate(String streamID, ZegoSuperResolutionState state, int errorCode) {
    if(state == ZegoSuperResolutionState.On)
    {
        // 超分已开启
    }
    else
    {
        // 超分已关闭
        if(errorCode == 0){
            // 正常关闭
        }
        else if(errorCode == 1004004){
            // 该设备不支持超分
        }
        else if(errorCode == 1004005){
            // 超分流数量超过限制，仅支持一条流超分
        }
        else if(errorCode == 1004006){
            // 超分原始分辨率超过限制
        }
        else if(errorCode == 1004007){
            // 超分设备性能不足
        }
        else if(errorCode == 1004008){
            // 超分正在初始化，请勿频繁操作
        }
    }
}
```

### 初始化视频超分

在使用超分功能前，需要调用 [initVideoSuperResolution](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePlayer/initVideoSuperResolution.html) 接口初始化超分。

<Warning title="注意">

初始化视频超分为耗时操作，在 SDK 生命周期执行一次即可，不建议频繁初始化、反初始化超分。

</Warning>



```dart
ZegoExpressEngine.instance.initVideoSuperResolution();
```

### 开启视频超分

开发者可以选择在拉流前或者拉流中开启视频超分功能，以在拉流前对流 “STREAM_ID” 开启超分功能为例：

```dart
ZegoExpressEngine.instance.enableVideoSuperResolution("STREAM_ID", true);
```

开启超分功能后，需要监听回调 [onPlayerVideoSuperResolutionUpdate](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngine/onPlayerVideoSuperResolutionUpdate.html) ，以确认此次超分功能是否开启成功。

<Warning title="注意">

为了便于管理超分状态，建议在收到超分状态回调后，再开启下一次超分功能。

</Warning>



### 开始拉流

调用 [startPlayingStream](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePlayer/startPlayingStream.html)，传入 “STREAM_ID” 拉取远端用户的音视频流。

```dart
var playCanvas = ZegoCanvas.view(playView);
ZegoExpressEngine.instance.startPlayingStream("STREAM_ID", canvas:playCanvas);
```

### 关闭视频超分功能

当不需要超分功能或者开启超分功能过程中发生错误（性能不足或原始视频分辨率超过限制）时，可关闭超分功能以释放系统资源。

```dart
ZegoExpressEngine.instance.enableVideoSuperResolution("STREAM_ID", false);
```

### 停止拉流

停止拉流后，SDK 会自动关闭超分功能并释放占用的系统资源。

```dart
ZegoExpressEngine.instance.stopPlayingStream("STREAM_ID");
```

### 反初始化视频超分

当不需要视频超分功能时，可以调用 [uninitVideoSuperResolution](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePlayer/uninitVideoSuperResolution.html) 接口反初始化视频超分，以节省内存。

```dart
ZegoExpressEngine.instance.uninitVideoSuperResolution();
```

<Content />

