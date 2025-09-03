# 屏幕共享

- - -

## 功能简介

屏幕共享，是指在视频通话或互动直播过程中将屏幕内容以视频的方式分享给其他的观众，以增强互动体验，提高沟通效率。

屏幕共享在如下场景中应用广泛：

- 视频会议场景中，屏幕共享可以将讲话者本地的文件、数据、网页、PPT 等画面分享给其他与会人；
- 在线课堂场景中，屏幕共享可以将老师的课件、笔记、讲课内容等画面展示给学生观看。

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Express/screen_share_scene_new.png" /></Frame>

## 前提条件

在实现屏幕共享功能之前，请确保：
- 支持 Android 5.0 或以上版本，且支持音视频的 Android 设备或模拟器（推荐使用真机）。
- 支持 iOS 12.0 或以上版本且支持音视频的 iOS 设备或模拟器（推荐使用真机）。
- 该功能对设备性能要求较高，推荐在 iPhone X 及之后机型上使用。
- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppID 和 AppSign，详情请参考 [控制台 - 项目信息](/console/project-info)。
- 已在项目中集成 ZEGO Express SDK，并实现了基本的音视频推拉流功能，详情请参考 [快速开始 - 集成](https://doc-zh.zego.im/article/4835) 和 [快速开始 - 实现流程](https://doc-zh.zego.im/article/8328)。




## 使用步骤

### 开启权限

（必选）Android 在录制屏幕前，会弹窗提示用户是否允许应用录制屏幕，请进行授权。

<Warning title="注意">


请务必声明以下权限，否则将无法使用屏幕共享功能。

</Warning>



如果目标 Android SDK 版本是 34.0.0 及以后版本，您需要进入您项目的 “app/src/main” 目录，打开 “AndroidManifest.xml” 文件，设置 `FOREGROUND_SERVICE` 及 `FOREGROUND_SERVICE_MEDIA_PROJECTION` 权限声明。

```xml
<uses-permission android:name="android.permission.FOREGROUND_SERVICE"/>
<uses-permission android:name="android.permission.FOREGROUND_SERVICE_MEDIA_PROJECTION"/>
```
### 设置采集源为屏幕共享源

#### 视频源

SDK 推流的视频源默认为摄像头源，如果需要推屏幕共享源，需要通过 [setVideoSource](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/classes/_zegoexpressengine_.zegoexpressengine.html#setvideosource) 进行切换为屏幕共享。

```javascript
ZegoExpressEngine.instance().setVideoSource(ZegoVideoSourceType.ScreenCapture, ZegoPublishChannel.Aux);
```

#### 音频源 (仅 iOS 支持)

SDK 推流的音频源默认为麦克风源，如果需要推屏幕共享源，需要通过 [setAudioSource](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/classes/_zegoexpressengine_.zegoexpressengine.html#setaudiosource) 进行切换为屏幕共享。

```javascript
ZegoExpressEngine.instance().setAudioSource(ZegoAudioSourceType.ScreenCapture, ZegoPublishChannel.Aux);
```
### 开始屏幕共享

有两种屏幕共享方式，分别为应用内屏幕共享和跨应用屏幕共享。

#### 应用内屏幕共享 (仅 iOS 支持)

若用户只在应用内共享画面与声音，可以调用 [startScreenCaptureInApp](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/classes/_zegoexpressengine_.zegoexpressengine.html#startscreencaptureinapp) 接口开启屏幕共享。也可调用 [broadcastFinished](https://developer.apple.com/documentation/replaykit/rpbroadcastsamplehandler/2143169-broadcastfinished?language=objc) 接口回调屏幕共享结束通知，若屏幕采集失败可接收到失败的原因。

```javascript
ZegoExpressEngine.instance().startScreenCaptureInApp();
```

#### 跨应用屏幕共享

跨应用屏幕共享是由 iOS 系统通过 Extension 扩展进程进行录制的，所以需要再额外创建扩展进程，并启动。具体请参考如下实现步骤：

##### 新建 Broadcast Upload Extension (仅 iOS 支持)

<Note title="说明">


Broadcast Upload Extension 的内存使用限制为 50 MB，请勿在屏幕共享的 Extension 中进行额外的内存分配。

</Note>




1. 使用 Xcode 打开项目工程文件，在菜单栏中依次点击 “File > New > Target..."。
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

##### 设置 Extension

1. 确保 Extension 的 “Info.plist” 文件中，将 “RPBroadcastProcessMode” 设置为 “RPBroadcastProcessModeSampleBuffer”。
2. 在 Extension 中导入 ZEGO Express SDK，在 xcode 中，单击工程进入工程配置页面。选择上面创建的 Extension，找到 General 下面的 Frameworks and Libraries 项，单击 + 号，选择 ZegoExpressEngine.xcframework 进行添加。
<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/iOS/ZegoExpressEngine/ShareScreen/screencapture_rn.jpg" /></Frame>

##### 开始屏幕共享

若用户需要共享整个系统，可以调用 [startScreenCapture](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/classes/_zegoexpressengine_.zegoexpressengine.html#startscreencapture) 接口开启屏幕共享。

```javascript
ZegoExpressEngine.instance().startScreenCapture();
```

##### 获取屏幕数据

<Note title="说明">


如下系统回调的实现可以在 [下载示例源码](https://doc-zh.zego.im/article/6635) 中的 “/ZegoExpressExample-iOS-OC/Topics/ScreenCapture/ZegoExpressExample-iOS-OC-Broadcast/SampleHandler.m” 文件中查看：

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

### 登录房间推流

完成上述屏幕共享源的采集过程后，将采集到的数据源 [startPublishingStream](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/classes/_zegoexpressengine_.zegoexpressengine.html#startpublishingstream) 推送到云服务器。（推送数据源的通道必须与设置采集源的通道保持一致）

```javaScript
ZegoExpressEngine.instance().startPublishingStream(streamID, ZegoPublishChannel.Aux);
```


### 观看远端屏幕共享

完成以上步骤后，其他用户可以使用 [startPlayingStream](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/classes/_zegoexpressengine_.zegoexpressengine.html#startplayingstream) 接口拉取屏幕共享流。

```javascript
// 拉流播放，需传入发起屏幕共享的用户推流时所用的 streamID
ZegoExpressEngine.instance().startPlayingStream(streamID, {"reactTag": findNodeHandle(this.refs.zego_play_view), "viewMode": 0, "backgroundColor": 0});
```


## 常见问题

1. **iOS 是否支持共享指定区域？**

    iOS 系统仅支持共享整个屏幕，不支持共享指定区域。

2. **iOS 使用屏幕共享时进入后台，为什么会停止采集？**
    - 在应用中开启音频录制的后台模式。
    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/iOS/ZegoExpressEngine/ShareScreen/share_screen_background_mode.png" /></Frame>
    - 若使用主路进行屏幕共享功能，SDK 将不会启动音频内部采集，无法进行后台保活，当应用退后台后，屏幕共享可能停止，建议对应用添加后台保活处理逻辑。

3. **iOS 使用屏幕共享时出现音频播放异常，如何处理？**

    若使用屏幕共享功能采集并推流音频，同时又在本机使用拉流功能，会导致 iOS 系统重复采集拉流音频，导致音频播放异常，建议使用 [muteAllPlayStreamAudio](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/classes/_zegoexpressengine_.zegoexpressengine.html#muteallplaystreamaudio) 禁止拉取所有音频流。
