# 屏幕共享

- - -

## 功能简介

屏幕共享，是指在视频通话或互动直播过程中将屏幕内容以视频的方式分享给其他的观众，以增强互动体验，提高沟通效率。

屏幕共享在如下场景中应用广泛：

- 视频会议场景中，屏幕共享可以将讲话者本地的文件、数据、网页、PPT 等画面分享给其他与会人；
- 在线课堂场景中，屏幕共享可以将老师的课件、笔记、讲课内容等画面展示给学生观看。

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Express/screen_share_scene_new.png" /></Frame>

## 示例源码下载

请参考 [下载示例源码](https://doc-zh.zego.im/article/17152) 获取源码。

相关源码请查看 “lib\topics\OtherFunctions\screen_sharing” 目录下的文件。

## 前提条件

在实现屏幕共享功能之前，请确保：
- 平台及设备要求：
    - Android 平台：支持 Android 5.0 或以上版本，且支持音视频的 Android 设备或模拟器（推荐使用真机）。
    - iOS 平台：
        - 支持 iOS 12.0 或以上版本且支持音视频的 iOS 设备或模拟器（推荐使用真机）。
        - 该功能对设备性能要求较高，推荐在 iPhone X 及之后机型上使用。
    - Windows 平台：Windows8、Windows10 或以上版本。
    - Web 平台：
        - 屏幕共享目前仅支持桌面端（例如 Windows 和 macOS）的 Chrome 、Edge 和 Firefox 浏览器，以及 macOS 的 Safari 浏览器。
            - 有插件形式：支持在 Chrome 65 或以上版本的浏览器共享屏幕。
            - 无插件形式：支持在 Chrome 72 或以上版本的浏览器，Edge 80 或以上版本的浏览器，以及 Firefox 和 Safari 13 或以上版本浏览器共享屏幕。
        - 如果开发者使用 macOS 系统，请先打开电脑的“系统偏好设置 > 安全性与隐私 > 屏幕录制”，添加使用的浏览器，才可以进行屏幕共享。
- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppID 和 AppSign，详情请参考 [控制台 - 项目信息](/console/project-info)。
- 已在项目中集成 ZEGO Express SDK，并实现了基本的音视频推拉流功能，详情请参考 [快速开始 - 集成](https://doc-zh.zego.im/article/17151) 和 [快速开始 - 实现流程](https://doc-zh.zego.im/article/17184)。



## 使用步骤

<Warning title="注意">


 屏幕采集时，仅 iOS、Android 平台支持同时采集视频和音频；其他平台仅支持采集视频，如需采集音频，请开发者自行实现相关逻辑。

</Warning>



### 1 开启权限

- （必选）Android 在录制屏幕前，会弹窗提示用户是否允许应用录制屏幕，请进行授权。

<Warning title="注意">


    Android 在使用屏幕录制功能时，请务必 [获取用户录制屏幕授权](/real-time-video-android-java/video/screen-sharing#1必选获取用户录制屏幕授权)，否则将无法使用该功能。

</Warning>


- macOS 调用屏幕共享接口在 macOS 平台会获取相关权限，需要在 “安全性与隐私” 中开启录屏权限与辅助功能权限，如不生效需要将之前的权限删除再次新增。
    - 录屏权限
<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Express/Adobe_Captivate.png" /></Frame>

    - 辅助功能权限
<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Express/Auxiliary_functions.png" /></Frame>

- Web 平台安装屏幕共享插件（可选）

<Accordion title="安装屏幕共享插件" defaultOpen="false">
仅 Chrome 浏览器支持插件形式的屏幕共享，当开发者使用的浏览器为 Chrome 且版本在 65 ～ 72 之间时，需要执行如下操作安装插件：
1. 下载 [ZEGO 共享插件](https://artifact-sdk.zego.im/downloads/jZego-screen-extention.zip)，并解压。
2. 打开 Chrome 浏览器，单击窗口右上方的“自定义及控制 Google Chrome”按钮，选择“更多工具 > 扩展程序”。
3. 打开右上角的“开发者模式”开关，单击“加载已解压的扩展程序”，并选择已解压的“ZEGO 共享插件”文件夹，即可完成安装。
</Accordion>

### 2 Windows、macOS 需要获取窗口（包括屏幕）列表信息

<Warning title="注意">


Android、iOS、Web 平台忽略此步骤。

</Warning>



SDK 可以通过 [getScreenCaptureSources](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngineScreenCapture/getScreenCaptureSources.html) 获取当前可共享的所有窗口信息。

```dart
List<ZegoScreenCaptureSourceInfo> list = await ZegoExpressEngine.instance.getScreenCaptureSources(400, 400, 100, 100);
```

### 3 创建屏幕共享源

<Warning title="注意">


- Windows、macOS 平台必须通过上述窗口信息里的窗口 ID 与窗口类型，创建屏幕共享源对象，否则将会创建失败。
- iOS、Android、Web 平台则不必传入窗口 ID 与窗口类型，即使传入 SDK 也不见影响创建屏幕共享源对象。

</Warning>



调用 [createScreenCaptureSource](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngineScreenCapture/createScreenCaptureSource.html) 接口创建屏幕共享源对象。

```dart
// 对于 Android、iOS、Web 平台，sourceId、sourceType 不需要传入，传入也不会导致创建失败
ZegoScreenCaptureSource source = await ZegoExpressEngine.instance.createScreenCaptureSource();

// 对于 windows、macOS 平台 sourceId、sourceType 为必填参数，数据来源于 getScreenCaptureSources 接口获取的数据结果
// ZegoScreenCaptureSource source = await ZegoExpressEngine.instance.createScreenCaptureSource(sourceId: list[0].sourceID, sourceType: list[0].sourceType);
```

### 4 设置采集源为屏幕共享源

<Warning title="注意">



在 Web 平台，[setVideoSource](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePublisher/setVideoSource.html)、[setAudioSource](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePublisher/setAudioSource.html) 接口调用生效时机如下：

- 使用 [startPreview](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePublisher/startPreview.html) 前调用。
- 若所使用场景无需调用 [startPreview](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePublisher/startPreview.html)，则 [setVideoSource](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePublisher/setVideoSource.html)、[setAudioSource](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePublisher/setAudioSource.html) 需要在 [startPublishingStream](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePublisher/startPublishingStream.html) 推流前调用。


</Warning>



设置采集源为屏幕共享源，则需要对视频源和音频源进行设置。

**视频源**

SDK 推流的视频源默认为摄像头源，如果需要推屏幕共享源，需要通过 [setVideoSource](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePublisher/setVideoSource.html) 切换为屏幕共享。

```dart
ZegoExpressEngine.instance.setVideoSource(ZegoVideoSourceType.ZegoVideoSourceScreenCapture, instanceID: source.getIndex(), channel: ZegoPublishChannel.Main);
```

**音频源**

SDK 推流的音频源默认为麦克风源，如果需要推屏幕共享源，需要通过 [setAudioSource](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePublisher/setAudioSource.html) 进行切换为屏幕共享。

```dart
ZegoExpressEngine.instance.setAudioSource(ZegoAudioSourceType.ScreenCapture, channel: ZegoPublishChannel.Main);
```


### 5 开启屏幕共享

有两种屏幕共享方式，分别为应用内屏幕共享和跨应用屏幕共享。

<Accordion title="iOS 平台开启屏幕共享前需要的特殊配置" defaultOpen="false">
**应用内屏幕共享**

若用户只在应用内共享画面与声音，可以调用 [startCapture](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoScreenCaptureSource/startCapture.html) 接口开启屏幕共享，设置 `inApp` 属性为 `true`。也可调用 [broadcastFinished](https://developer.apple.com/documentation/replaykit/rpbroadcastsamplehandler/2143169-broadcastfinished?language=objc) 接口回调屏幕共享结束通知，若屏幕采集失败可接收到失败的原因。

```dart
var config = ZegoScreenCaptureConfig(true, true, 100, 100);
source.startCapture(config: config, inApp: true);
```

**跨应用屏幕共享**

跨应用屏幕共享是由 iOS 系统通过 Extension 扩展进程进行录制的，所以需要再额外创建扩展进程，并启动。具体请参考如下实现步骤：

<Steps >
<Step title="新建 Broadcast Upload Extension (iOS 平台)">


<Note title="说明">


Broadcast Upload Extension 的内存使用限制为 50 MB，请勿在屏幕共享的 Extension 中进行额外的内存分配。

</Note>




1. 使用 Xcode 打开自己 flutter 工程下面的 iOS 目录下的后缀为 xcworkspace 的 iOS 原生项目工程文件，然后在菜单栏中依次点击 “File > New > Target..."。
<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/iOS/ZegoExpressEngine/ShareScreen/share_screen_create_extension_ios1.png" /></Frame>
2. 在弹出的窗口中选择 iOS 页的 “Broadcast Upload Extension” 后，单击 “Next”。
<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/iOS/ZegoExpressEngine/ShareScreen/share_screen_create_extension_ios.png" /></Frame>
3. 在弹出的对话框中的 “Product Name” 一栏填写 “Broadcast Upload Extension” 的名字，例如 “ScreenShare”。选择 “Team”、“Language” 等信息后，单击 “Finish” 。

<Note title="说明">


    无需勾选 “Include UI Extension”。

</Note>



    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/iOS/ZegoExpressEngine/ShareScreen/share_screen_create_extension_ios3.png" /></Frame>

    创建完成后，您会在项目中看到该 Extension 的文件夹，结构类似如下，该文件夹用于存放屏幕共享功能的实现代码：
    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/iOS/ZegoExpressEngine/ShareScreen/share_screen_create_extension_project.png" /></Frame>

</Step>
<Step title="设置 Extension">

1. 确保 Extension 的 “Info.plist” 文件中，将 “RPBroadcastProcessMode” 设置为 “RPBroadcastProcessModeSampleBuffer”。
2. 在 Extension 中导入 ZEGO Express SDK，在 xcode 中点击工程进入工程配置页面。选择上面创建的 Extension，找到 General 下面的 Frameworks and Libraries 项，点击 + 号，选择 ZegoExpressEngine.xcframework 进行添加。

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Express/Screen_flutter.png" /></Frame>

</Step>
<Step title="开始屏幕共享">
若用户需要共享整个系统的画面与声音，可以调用 [startCapture](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoScreenCaptureSource/startCapture.html) 接口开启屏幕共享。

```dart
var config = ZegoScreenCaptureConfig(true, true, 100, 100);
source.startCapture(config: config, inApp: false);
```
</Step>
<Step title="获取屏幕数据">

<Note title="说明">


如下系统回调的实现可以在 SDK 的源码中的 “/ios/ScreenShare/SampleHandler.m” 文件中查看：

- [broadcastStartedWithSetupInfo](https://developer.apple.com/documentation/replaykit/rpbroadcastsamplehandler/2143170-broadcaststartedwithsetupinfo?language=objc)
- [processSampleBuffer](https://developer.apple.com/documentation/replaykit/rpbroadcastsamplehandler/2123045-processsamplebuffer?language=objc)
- [broadcastFinished](https://developer.apple.com/documentation/replaykit/rpbroadcastsamplehandler/2143169-broadcastfinished?language=objc)

</Note>

1. 系统通过 [broadcastStartedWithSetupInfo](https://developer.apple.com/documentation/replaykit/rpbroadcastsamplehandler/2143170-broadcaststartedwithsetupinfo?language=objc) 回调通知 Extension 已开始录制屏幕，您需要在该回调中，调用 `ZegoReplayKitExt` 类中的如下接口创建数据传输通道：
    ```objc
    [ZegoReplayKitExt.sharedInstance setupWithDelegate:self];
    ```


2. 在 [processSampleBuffer](https://developer.apple.com/documentation/replaykit/rpbroadcastsamplehandler/2123045-processsamplebuffer?language=objc) 系统回调中，通过 `ZegoReplayKitExt` 类中的 `sendSampleBuffer` 接口发送给 ZEGO Express SDK。

    ```objc
    [ZegoReplayKitExt.sharedInstance sendSampleBuffer:sampleBuffer withType:sampleBufferType];

    ```

3. 系统通过 [broadcastFinished](https://developer.apple.com/documentation/replaykit/rpbroadcastsamplehandler/2143169-broadcastfinished?language=objc) 回调通知 Extension 屏幕录制已结束，您可以在该回调中，调用 `ZegoReplayKitExt` 类中的如下接口停止屏幕共享并断开数据传输通道：

    ```objc
    [ZegoReplayKitExt.sharedInstance finished];
    ```

</Step>
</Steps>

</Accordion>

调用 [startCapture](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoScreenCaptureSource/startCapture.html) 接口共享整个系统的画面。

```dart
source.startCapture();
```

<Accordion title="Windows、macOS 平台特有的一些接口" defaultOpen="false">
**更新共享源**

调用 [updateCaptureSource](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoScreenCaptureSource/updateCaptureSource.html) 接口可以更新共享窗口画面。

```dart
source.updateCaptureSource(list[1].sourceID, list[1].sourceType)
```

**更新共享源区域**

调用 [updateCaptureRegion](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/file-___Users_zego_ci_workspace_workspace_rtc_utils_publish_express_api_documents_projects_flutter_lib_src_zego_express_defines/ZegoScreenCaptureSource/updateCaptureRegion.html) 接口可以动态更新共享窗口区域。其中设置为 (0, 0, 0, 0) 可恢复整个窗口共享。

```dart
source.updateCaptureRegion(Rect.fromLTWH(10, 10, 400, 400));
```

**过滤指定窗口**

调用 [setExcludeWindowList](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoScreenCaptureSource/setExcludeWindowList.html) 接口可以过滤掉共享的屏幕中指定窗口画面，只适用于共享整个屏幕的时候设置。

```dart
source.setExcludeWindowList([list[1].sourceID]);
```

**是否激活窗口**

调用 [enableWindowActivate](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoScreenCaptureSource/enableWindowActivate.html) 接口可以激活当前共享的窗口。

```dart
source.enableWindowActivate(true);
```

**是否显示鼠标**

调用 [enableCursorVisible](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoScreenCaptureSource/enableCursorVisible.html) 接口可以显示或隐藏鼠标。

```dart
source.enableCursorVisible(true);
```

**采集异常回调**

采集异常回调 [onExceptionOccurred](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngine/onExceptionOccurred.html)，当有异常回调时，会中断采集。

```dart
ZegoExpressEngine.onExceptionOccurred = (ZegoScreenCaptureSource source,
      ZegoScreenCaptureSourceExceptionType exceptionType) {
};
```
</Accordion>

<Accordion title="Android、iOS 平台特有的一些接口" defaultOpen="false">
**设置屏幕共享朝向**

屏幕共享朝向支持跟随系统朝向和固定朝向，默认跟随系统朝向。可以设置 [ZegoScreenCaptureConfig](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoScreenCaptureConfig/ZegoScreenCaptureConfig.html) 中的 `orientation` 参数来设置屏幕共享朝向。

|枚举值|说明|
|-|-|
|ZegoScreenCaptureOrientation.AUTO|跟随系统朝向，拉流端根据系统朝向展示画面|
|ZegoScreenCaptureOrientation.LANDSCAPE|固定横屏，拉流端始终横屏画面|
|ZegoScreenCaptureOrientation.PORTRAIT|固定竖屏，拉流端始终竖屏画面|

```dart
var config = ZegoScreenCaptureConfig(true, true, 100, 100);
config.orientation = ZegoScreenCaptureOrientation.Landscape; // 固定横屏
source.startCapture(config: config);
// or 更新屏幕共享配置时设置
source.updateScreenCaptureConfig(config);
```

**监听屏幕共享回调通知（仅针对 Android、iOS 平台）**

- [onMobileScreenCaptureStart](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngine/onMobileScreenCaptureStart.html) 回调，接收开始屏幕采集成功的通知，方便做后续业务处理，如 UI 提示或应用跳转等。
- [onMobileScreenCaptureExceptionOccurred](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngine/onMobileScreenCaptureExceptionOccurred.html) 回调，接收屏幕共享过程中的异常信息通知，从而可分析屏幕共享失败的原因。

```dart
ZegoExpressEngine.onMobileScreenCaptureStart = () {
};
ZegoExpressEngine.onMobileScreenCaptureExceptionOccurred = (ZegoScreenCaptureSourceExceptionType exceptionType) {
};
```
</Accordion>



### 6 登录房间并开始推流

调用 [loginRoom](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngineRoom/loginRoom.html) 接口，传入房间 ID 参数 “roomID” 和用户参数 “user”，登录房间。

调用 [startPublishingStream](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePublisher/startPublishingStream.html) 接口，传入流 ID 参数 “streamID”，向远端用户发送本端的音视频流。


```dart
// 创建用户
var user = new ZegoUser.id("user1");

// 开始登录房间
ZegoExpressEngine.instance.loginRoom("room1", user);
// 开始推流
ZegoExpressEngine.instance.startPublishingStream("stream1");

```

至此，我们已完成采集屏幕数据并通过 ZEGO Express SDK 分享到远端的操作。


### 7 观看远端屏幕共享

完成以上步骤之后，其他用户可以使用 [startPlayingStream](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePlayer/startPlayingStream.html) 接口拉取屏幕共享流。

```dart
// 拉流播放，需传入发起屏幕共享的用户推流时所用的 streamID
ZegoExpressEngine.instance.startPlayingStream(streamID, canvas: ZegoCanvas.view(playView));
```

### 8 停止屏幕共享

调用 [stopCapture](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoScreenCaptureSource/stopCapture.html) 接口停止共享。

```dart
source.stopCapture();
```

## 更多功能

<a href="/live-streaming-flutter/video/highlight"></a>

### 描边

在屏幕共享时，您可以调用 [enableHightLight]([enableHightLight](/unique-api/express-video-sdkhttps://doc-zh.zego.im/article/dart_flutter/zego_express_engine/ZegoScreenCaptureSource/enableHightLight.html)) 接口对屏幕区域或者窗口启用描边，设置描边的颜色和宽度。

<Warning title="注意">

- Android、iOS、Web 平台忽略此功能。
- Windows 平台部分系统窗口（例如任务管理器、以管理员权限启动的程序的窗口等）可能因权限限制无法显示描边，建议以管理员权限启动应用。

</Warning>



```dart
// 边框大小，默认值 4， 最大值为 100
// 边框颜色，格式为 0xRRGGBB，默认为绿色即 0x00FF00
var config = ZegoLayerBorderConfig(4, 0x00FF00);
source.enableHightLight(true, config)
```

<Content />

