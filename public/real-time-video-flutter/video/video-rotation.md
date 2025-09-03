# 视频画面旋转

- - -

## 功能简介

<Warning title="注意">


本文档适用于以下平台： Android、iOS。

</Warning>



用户使用移动设备进行直播或视频通话时，通常有以下几种旋转方式：

- 固定竖屏
- 固定横屏
- 横竖屏自动切换

<Note title="说明">


以下示例中“拉流端”渲染画面的模式以默认的 “ZegoViewMode.AspectFit”（等比缩放，可能有黑边）方式，具体请参考 [ZegoViewMode](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoViewMode.html)。

</Note>



**固定竖屏**

表示推流端固定采集以竖屏方式展示的视频，此时当对端设备方向为竖屏时，观看到的画面为充满设备屏幕的竖屏效果。当对端设备方向为横屏时，观看到的画面为相对推流端图像有一定旋转角度的效果（下图以逆时针旋转 90 度为例）。

- 如果设备的旋转方向锁定：

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Android/Video-rotation/Fixed_portrait_screen.png" /></Frame>

- 如果设备的旋转方向不锁定：

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Android/Video-rotation/Fixed_portrait_screen_noUI.png" /></Frame>

**固定横屏**

表示推流端固定采集以横屏方式展示的视频，此时当对端设备方向为横屏时，观看到的画面为充满设备屏幕的横屏效果。当对端设备方向为竖屏时，观看到的画面为相对推流端图像有一定旋转角度的效果（下图以逆时针旋转 90 度为例）。

- 如果设备的旋转方向锁定：

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Android/Video-rotation/Fixed_horizontal_screen.png" /></Frame>

- 如果设备的旋转方向不锁定：

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Android/Video-rotation/Fixed_horizontal_screen_noUI.png" /></Frame>

**横竖屏自动切换**

提供视频旋转功能，用户可以根据需要将视频相比于手机正立的方向逆时针旋转 90，180 或 270 度。便于用户结合视频场景需要，获取想要的视频渲染效果。视频旋转后会自动进行调整，以适配编码后的图像分辨率。

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Android/Video-rotation/Switch_between_horizontal_and_portrait_01.png" /></Frame>

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Android/Video-rotation/Switch_between_horizontal_and_portrait_02.png" /></Frame>

以上三种方式调用的接口存在差异，详细描述请参考本文的 [使用步骤](https://doc-zh.zego.im/article/11783#4)。


## 示例源码下载

请参考 [下载示例源码](https://doc-zh.zego.im/article/3130) 获取源码。

相关源码请查看 “lib/topics/CommonFunctions/video_rotation” 目录下的文件。

## 前提条件

在实现视频采集旋转之前，请确保：

- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppID 和 AppSign，详情请参考 [控制台 - 项目信息](/console/project-info)。
- 已在项目中集成 ZEGO Express SDK，并实现了基本的音视频推拉流功能，详情请参考 [快速开始 - 集成](https://doc-zh.zego.im/article/1241) 和 [快速开始 - 实现流程](https://doc-zh.zego.im/article/7634)。



## 使用步骤

### 固定竖屏

使用竖屏直播或视频通话时，宽的分辨率应比高的分辨率小，假设为 “360 × 640”，则需要通过如下步骤实现功能。

1. 调用 [createEngineWithProfile](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngine/createEngineWithProfile.html) 接口创建 SDK 引擎实例，详情请参考 [快速开始 - 实现流程](https://doc-zh.zego.im/article/7634#创建引擎) 的 “创建引擎”。


```dart
// 创建引擎，通用场景接入
// appID 请通过官网注册获取，格式为：1234567890
// ZegoScenario.GENERAL 通用场景接入
// appSign 请通过官网注册获取，格式为："1234567890"
// enablePlatformView 是否使用 platformView，使用 createPlatformView 时需要设置为 true
var profile = new ZegoEngineProfile(appID, ZegoScenario.GENERAL, appSign: appSign, enablePlatformView: enablePlatformView);
ZegoExpressEngine.createEngineWithProfile(profile);
```

2. 调用 [setVideoConfig ](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePublisher/setVideoConfig.html) 接口设置编码分辨率，默认值为 “360 × 640”, 可以根据需要调整，可以通过 `ZegoVideoConfig.preset` 使用预设值，例如 `ZegoVideoConfigPreset.Preset360P`。

```dart
// ZegoVideoConfigPreset.Preset360P 预设采集分辨率 360 × 640，编码分辨率 360 × 640，码率 600，帧率 15
var config = ZegoVideoConfig.preset(ZegoVideoConfigPreset.Preset360P);
```

竖屏直播的分辨率设置如下：

```dart
ZegoExpressEngine.instance.setVideoConfig(config);
```

3. 调用 [loginRoom](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngineRoom/loginRoom.html) 接口登录房间，详情请参考 [快速开始 - 实现流程](https://doc-zh.zego.im/article/7634#登录房间) 的 “登录房间”。

```dart
ZegoExpressEngine.instance.loginRoom("test_roomid", ZegoUser.id("test_userid"));
```

4. 调用 [startPreview ](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePublisher/startPreview.html) 接口启动本地预览，用于显示本地画面。viewID 通过调用 [ZegoExpressEngine.instance.createCanvasView](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressCanvasViewUtils/createCanvasView.html) 获取。

```dart
// viewID 通过调用 ZEGO Express SDK 的 ZegoExpressEngine.instance.createCanvasView 获取
ZegoExpressEngine.instance.startPreview(canvas: ZegoCanvas(viewID));
```

5. 调用 [startPublishingStream ](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePublisher/startPublishingStream.html) 接口开始推流，将本地的音视频流推送到实时音视频云，详情请参考 [快速开始 - 实现流程](https://doc-zh.zego.im/article/7634#推流) 的 “推流”。

```dart
ZegoExpressEngine.instance.startPublishingStream("test_streamid");
```

6. 使用固定的竖屏方式进行直播或视频通话。


### 固定横屏

使用横屏直播或视频通话时，宽的分辨率应比高的分辨率大，假设为 “640 × 360”，则需要通过如下步骤实现功能。

1. 调用 [createEngineWithProfile ](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngine/createEngineWithProfile.html) 接口创建 SDK 引擎实例，详情请参考 [快速开始 - 实现流程](https://doc-zh.zego.im/article/7634#创建引擎) 的 “创建引擎”。


```dart
// 创建引擎，通用场景接入
// appID 请通过官网注册获取，格式为：1234567890
// ZegoScenario.GENERAL 通用场景接入
// appSign 请通过官网注册获取，格式为："1234567890"
// enablePlatformView 是否使用 platformView，使用 createPlatformView 时需要设置为 true
var profile = new ZegoEngineProfile(appID, ZegoScenario.GENERAL, appSign: appSign, enablePlatformView: enablePlatformView);
ZegoExpressEngine.createEngineWithProfile(profile);
```

2. 调用 [setVideoConfig ](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePublisher/setVideoConfig.html) 接口设置编码分辨率为 “640 × 360”。

```dart
var config = ZegoVideoConfig.preset(ZegoVideoConfigPreset.Preset360P);
config.captureWidth = 640;
config.captureHeight = 360;
```

横屏直播的分辨率设置如下：

```dart
config.encodeWidth = 640;
config.encodeHeight = 360;
ZegoExpressEngine.instance.setVideoConfig(config);
```

3. 调用 [setAppOrientation ](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePublisher/setAppOrientation.html) 接口设置视频的朝向，若逆时针旋转 90 度，则如下接口传参为 DeviceOrientation.landscapeRight。若顺时针旋转 90 度，则传参为 DeviceOrientation.landscapeLeft。

```dart
ZegoExpressEngine.instance.setAppOrientation(DeviceOrientation.landscapeRight);
```

4. 调用 [loginRoom](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngineRoom/loginRoom.html) 接口登录房间，详情请参考 [快速开始 - 实现流程](https://doc-zh.zego.im/article/7634#登录房间) 的 “登录房间”。

```dart
ZegoExpressEngine.instance.loginRoom("test_roomid", ZegoUser.id("test_userid"));
```

5. 调用 [startPreview ](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePublisher/startPreview.html) 接口启动本地预览，用于显示本地画面。viewID 通过调用 [ZegoExpressEngine.instance.createCanvasView](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressCanvasViewUtils/createCanvasView.html) 获取。


```dart
// viewID 通过调用 ZEGO Express SDK 的 ZegoExpressEngine.instance.createCanvasView 获取
ZegoExpressEngine.instance.startPreview(canvas: ZegoCanvas(viewID));
```

6. 调用 [startPublishingStream ](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePublisher/startPublishingStream.html) 接口开始推流，将本地的音视频流推送到实时音视频云，详情请参考 [快速开始 - 实现流程](https://doc-zh.zego.im/article/7634#推流) 的 “推流”。

```dart
ZegoExpressEngine.instance.startPublishingStream("test_streamid");
```

7. 使用固定的横屏方式进行直播或视频通话。


### 横竖屏自动切换

若在直播或视频通话过程中，App 的设置为视频画面根据重力感应的变化而旋转，则需要监听对应平台的屏幕旋转事件，并依此做视频方向的旋转。

当开发者使用 SDK 采集时，横竖屏切换主要通过 [setVideoConfig ](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePublisher/setVideoConfig.html) 接口设置编码分辨率，并通过 [setAppOrientation ](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePublisher/setAppOrientation.html) 接口设置视频朝向。

可以通过 WidgetsBinding 添加 addPostFrameCallback 的回调来监听屏幕旋转事件，在事件处理的回调中修改对应编码分辨率并向 SDK 告知 App 的方向。

```dart
// 初始化 WidgetsBinding
WidgetsFlutterBinding.ensureInitialized();
// WidgetsBinding 添加本窗口为观察者
WidgetsBinding.instance.addObserver(this);
WidgetsBinding.instance.addPostFrameCallback((_) {
    if(MediaQuery.of(context).orientation == Orientation.portrait){
      _videoConfig.encodeWidth = 360;
      _videoConfig.encodeHeight = 640;
      ZegoExpressEngine.instance.setAppOrientation(DeviceOrientation.portraitUp);
    } else if (MediaQuery.of(context).orientation == Orientation.landscape){
      _videoConfig.encodeWidth = 640;
      _videoConfig.encodeHeight = 360;
      ZegoExpressEngine.instance.setAppOrientation(DeviceOrientation.landscapeLeft);
    }

    ZegoExpressEngine.instance.setVideoConfig(_videoConfig);

});

// 销毁窗口或者不使用时需要移除观察者
WidgetsBinding.instance.removeObserver(this);
```

## 常见问题

1. **为什么录制出来的直播流好像看不了？**

    由于横竖屏切换时，流的编码分辨率被修改，部分第三方播放器对分辨率修改的视频兼容性不好，可能会出现播放失败的问题，因此一般不推荐在直播或视频过程中进行横竖屏切换时修改分辨率。
