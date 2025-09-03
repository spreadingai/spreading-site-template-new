# 屏幕共享

- - -

## 功能简介

屏幕共享，是指在视频通话或互动直播过程中将屏幕内容以视频的方式分享给其他的观众，以增强互动体验，提高沟通效率。

屏幕共享在如下场景中应用广泛：

- 视频会议场景中，屏幕共享可以将讲话者本地的文件、数据、网页、PPT 等画面分享给其他与会人；
- 在线课堂场景中，屏幕共享可以将老师的课件、笔记、讲课内容等画面展示给学生观看。

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Express/screen_share_scene_new.png" /></Frame>

## 示例源码下载

请参考 [下载示例源码](https://doc-zh.zego.im/article/21097) 获取源码。

相关源码请查看 “/Assets/ZegoExpressExample/Examples/Others/ScreenCapture.cs” 文件。

## 前提条件

在实现屏幕共享功能之前，请确保：

- Android：支持 Android 5.0 或以上版本，且支持音视频的 Android 设备或模拟器（推荐使用真机）。
- iOS：
  - 支持 iOS 12.0 或以上版本且支持音视频的 iOS 设备或模拟器（推荐使用真机）。
  - 该功能对设备性能要求较高，推荐在 iPhone X 及之后机型上使用。
- Windows：
  - Visual Studio 2013 或以上版本。
  - Windows7、Windows8、Windows10 或以上版本。

- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppID 和 AppSign，详情请参考 [控制台 - 项目信息](/console/project-info)。
- 已在项目中集成 ZEGO Express SDK，并实现了基本的音视频推拉流功能，详情请参考 [快速开始 - 集成](https://doc-zh.zego.im/article/21098) 和 [快速开始 - 实现流程](https://doc-zh.zego.im/article/21035)。


## 实现流程

<Warning title="注意">

屏幕采集时，仅 iOS、Android 平台支持同时采集视频和音频；其他平台仅支持采集视频，如需采集音频，请开发者自行实现相关逻辑。

</Warning>




### 1 开启屏幕共享

以下分别介绍各开发平台（Android、iOS、macOS、Windows）如何开启屏幕共享功能。

<Accordion title="Android" defaultOpen="false">
下图展示了 Android 平台实现屏幕共享的数据流转：

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Express/screen_capture_android_new.jpeg" /></Frame>

1. 如需使用屏幕共享功能，请务必 [获取用户录制屏幕授权](/real-time-video-android-java/video/screen-sharing#1必选获取用户录制屏幕授权)，否则将无法使用该功能。
2. 设置采集源为屏幕共享源。

    - SDK 推流的“视频源”默认为摄像头，如果需要推屏幕共享源，需要通过 [SetVideoSource](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoExpressEngine#set-video-source) 切换为屏幕共享。

    ```csharp
    engine.SetVideoSource(ZegoVideoSourceType.ScreenCapture, ZegoPublishChannel.Main);
    ```

    - SDK 推流的“音频源”默认为麦克风，如果需要推屏幕共享源，需要通过 [SetAudioSource](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoExpressEngine#set-audio-source) 切换为屏幕共享。

    ```csharp
    engine.SetAudioSource(ZegoAudioSourceType.ScreenCapture, ZegoPublishChannel.Main);
    ```

3. 调用 [StartScreenCapture](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoExpressEngine#start-screen-capture) 接口共享整个系统的画面、采集第三方应用的音频，开始屏幕共享。

    ```csharp
    engine.StartScreenCapture();
    ```

    开发者还可以使用 [ZegoScreenCaptureConfig](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~struct~ZegoScreenCaptureConfig) 参数设置是否采集视频、是否采集音频、设置音频采集时的采样率和采样通道等。

    ```csharp
    ZegoScreenCaptureConfig config = new ZegoScreenCaptureConfig();
    config.captureVideo = true;
    config.captureAudio = true;
    config.audioParam.sampleRate = ZegoAudioSampleRate.ZegoAudioSampleRate16K;
    config.audioParam.channel = ZegoAudioChannel.Stereo;

    engine.StartScreenCapture(config);
    ```

4. 调用 [UpdateScreenCaptureConfig](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoExpressEngine#update-screen-capture-config) 接口，可以更新屏幕共享的配置。

    ```csharp
    ZegoScreenCaptureConfig config = new ZegoScreenCaptureConfig();
    config.captureVideo = true;
    config.captureAudio = false;
    config.audioParam.sampleRate = ZegoAudioSampleRate.ZegoAudioSampleRate32K;
    config.audioParam.channel = ZegoAudioChannel.Stereo;

    engine.UpdateScreenCaptureConfig(config);
    ```

5. 开发者需要监听 [IZegoEventHandler](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~IZegoEventHandler) 类中的 [OnMobileScreenCaptureExceptionOccurred](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~IZegoEventHandler#on-mobile-screen-capture-exception-occurred) 回调，接收屏幕共享过程中的异常信息通知。

    ```csharp
    void OnMobileScreenCaptureExceptionOccurred(ZegoScreenCaptureExceptionType exceptionType)
    {

    }

    engine.onMobileScreenCaptureExceptionOccurred = OnMobileScreenCaptureExceptionOccurred;
    ```
</Accordion>

<Accordion title="iOS" defaultOpen="false">
iOS 平台是基于苹果的 [Replaykit](https://developer.apple.com/documentation/ReplayKit) 框架实现屏幕录制，能够分享整个系统的屏幕内容。但需要当前 App （主 App 进程）额外提供一个 Extension 扩展组件（Extension 进程），用于录制屏幕，再结合 ZEGO Express SDK 相关 API 来实现屏幕共享功能，详情请参考 [屏幕共享（iOS）](/real-time-video-ios-oc/video/screen-sharing#实现流程) 的 “实现流程” 说明。

1. 在主 App 设置采集源为屏幕共享源。

    - SDK 推流的“视频源”默认为摄像头，如果需要推屏幕共享源，需要通过 [SetVideoSource](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoExpressEngine#set-video-source) 切换为屏幕共享。

    ```csharp
    engine.SetVideoSource(ZegoVideoSourceType.ScreenCapture, ZegoPublishChannel.Main);
    ```

     - SDK 推流的“音频源”默认为麦克风，如果需要推屏幕共享源，需要通过 [SetAudioSource](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoExpressEngine#set-audio-source) 切换为屏幕共享。

    ```csharp
    engine.SetAudioSource(ZegoAudioSourceType.ScreenCapture, ZegoPublishChannel.Main);
    ```

2. 应用内屏幕共享。若用户只在应用内共享画面与声音，可以调用 [StartScreenCaptureInApp](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoExpressEngine#start-screen-capture-in-app) 接口开启屏幕共享。也可调用 [broadcastFinished](https://developer.apple.com/documentation/replaykit/rpbroadcastsamplehandler/2143169-broadcastfinished/) 接口回调屏幕共享结束通知，若屏幕采集失败可接收到失败的原因。

    ```csharp
    ZegoScreenCaptureConfig config = new ZegoScreenCaptureConfig();
    config.captureVideo = true;
    config.captureAudio = true;
    engine.StartScreenCaptureInApp(config);
    ```

3. 跨应用屏幕共享。若用户需要共享整个系统的画面与声音，可以调用 [StartScreenCapture](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoExpressEngine#start-screen-capture) 接口开启屏幕共享。

<Note title="说明">


    跨应用屏幕共享是由 iOS 系统通过 Extension 扩展进程进行录制的，所以需要再额外创建扩展进程，并启动。

</Note>



    ```csharp
    ZegoScreenCaptureConfig config = new ZegoScreenCaptureConfig();
    config.captureVideo = true;
    config.captureAudio = true;

    engine.StartScreenCapture(config);
    ```

    1. 新建 Broadcast Upload Extension，详情请参考 [屏幕共享（iOS）](/real-time-video-ios-oc/video/screen-sharing#2-开始屏幕共享) 的 “跨应用屏幕共享” 步骤 1。
    2. 设置 Extension，详情请参考 [屏幕共享（iOS）](/real-time-video-ios-oc/video/screen-sharing#2-开始屏幕共享) 的 “跨应用屏幕共享” 步骤 2。
    3. 开始屏幕共享，详情请参考 [屏幕共享（iOS）](/real-time-video-ios-oc/video/screen-sharing#2-开始屏幕共享) 的 “跨应用屏幕共享” 步骤 3。
    4. 启动 Extension 扩展进程，详情请参考 [屏幕共享（iOS）](/real-time-video-ios-oc/video/screen-sharing#2-开始屏幕共享) 的 “跨应用屏幕共享” 步骤 4。
    5. 获取屏幕数据，详情请参考 [屏幕共享（iOS）](/real-time-video-ios-oc/video/screen-sharing#2-开始屏幕共享) 的 “跨应用屏幕共享” 步骤 5。
</Accordion>

<Accordion title="macOS/Windows" defaultOpen="false">
1. 在 macOS 平台上开发 “屏幕共享” 功能，需要设置以下权限。**Windows 平台上不需要设置权限。**

    调用屏幕共享接口在 macOS 平台会获取相关权限，需要在 “安全性与隐私” 中开启录屏权限与辅助功能权限，如不生效需要将之前的权限删除再次新增。

    - 录屏权限

      <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Express/Adobe_Captivate.png" /></Frame>

    - 辅助功能权限

      <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Express/Auxiliary_functions.png" /></Frame>

2. 获取窗口（包括屏幕）列表信息，您可以通过 [GetScreenCaptureSources](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoExpressEngine#get-screen-capture-sources) 接口，获取当前可共享的所有窗口信息。

    ```csharp
    List<ZegoScreenCaptureSourceInfo> captureSources = engine.GetScreenCaptureSources(400, 400, 100, 100);
    ```

3. 通过上述窗口信息里的窗口 ID 与窗口类型，调用 [CreateScreenCaptureSource](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoExpressEngine#create-screen-capture-source) 接口创建屏幕共享源对象。

    ```csharp
    if (captureSources.Count > 0) {
        var selectSource = captureSources.ElementAt(0);
        ZegoScreenCaptureSource captureSource = engine.CreateScreenCaptureSource(selectSource.sourceID, selectSource.sourceType);
    }
    ```

4. 设置采集源为屏幕共享源。SDK 推流的视频源默认为摄像头源，如果需要推屏幕共享源，需要通过 [SetVideoSource](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoExpressEngine#set-video-source) 进行切换为屏幕共享。

    ```csharp
    engine.SetVideoSource(ZegoVideoSourceType.ScreenCapture, (uint)captureSource.GetIndex(), ZegoPublishChannel.Main);
    ```

5. 启动屏幕共享，调用 [StartCapture](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoScreenCaptureSource#start-capture) 接口可以共享窗口画面。

    ```csharp
    captureSource.StartCapture();
    ```

6. 调用 [UpdateCaptureSource](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoScreenCaptureSource#update-capture-source) 接口可以更新共享窗口画面。

    ```csharp
    var selectSource = captureSources.ElementAt(0);
    captureSource.UpdateCaptureSource(selectSource.sourceID, selectSource.sourceType);
    ```

7. 更新共享源区域。用户可以调用 [UpdateCaptureRegion](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoScreenCaptureSource#update-capture-region) 接口动态更新共享窗口区域，其中设置为 (0, 0, 0, 0) 可恢复整个窗口共享。

    ```csharp
    ZegoRect rect = new ZegoRect
    {
        x = 10,
        y = 10,
        width = 400,
        height = 400
    };
    captureSource.UpdateCaptureRegion(rect);
    ```

8. 过滤指定窗口。调用 [SetExcludeWindowList](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoScreenCaptureSource#set-exclude-window-list) 接口可以过滤掉共享的屏幕中指定窗口画面，只适用于共享整个屏幕时进行设置。

    ```csharp
    var selectSource = captureSources.ElementAt(0);
    List<long> excludeList = new List<long>();
    excludeList.Add(selectSource.sourceID);

    captureSource.SetExcludeWindowList(excludeList);
    ```

9. 用户可以调用 [EnableWindowActivate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoScreenCaptureSource#enable-window-activate) 接口来激活当前共享的窗口。

    ```csharp
    captureSource.EnableWindowActivate(true);
    ```

10. 调用 [EnableCursorVisible](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoScreenCaptureSource#enable-cursor-visible) 接口进行显示或隐藏鼠标。

    ```csharp
    captureSource.EnableCursorVisible(true);
    ```

11. 监听事件回调。

    通过 [IZegoScreenCaptureSourceEventHandler](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~IZegoScreenCaptureSourceEventHandler) 中的方法 [OnAvailableFrame](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~IZegoScreenCaptureSourceEventHandler#on-available-frame)、[OnExceptionOccurred](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~IZegoScreenCaptureSourceEventHandler#on-exception-occurred)、[OnWindowStateChanged](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~IZegoScreenCaptureSourceEventHandler#on-window-state-changed)、[OnRectChanged](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~IZegoScreenCaptureSourceEventHandler#on-rect-changed) 监听事件回调。

    ```csharp
    // 采集数据回调，可用于预览视频渲染、本地录制。
    void OnAvailableFrame(ZegoScreenCaptureSource source, System.IntPtr data,
                                            uint dataLength, ZegoVideoFrameParam param)
    {
    #if (UNITY_STANDALONE_WIN || UNITY_STANDALONE_OSX)
        localVideoSurface.LoadNativeVideoRawData(data, param.width, param.height, param.strides, param.format);
    #endif
    }

    // 采集异常回调，当有异常回调时，会中断采集。
    void OnExceptionOccurred(ZegoScreenCaptureSource source,
                                                    ZegoScreenCaptureSourceExceptionType exceptionType)
    {

    }

    // 窗口采集状态回调，当窗口区域位置更改时，会通过此回调通知，当窗口不在当前屏幕区域内时，会停止采集。
    public void OnWindowStateChanged(ZegoScreenCaptureSource source,
                                                    ZegoScreenCaptureWindowState windowState,
                                                    ZegoRect windowRect)
    {

    }

    // 采集区域发生改变，用于分辨率变化时更新编码分辨率
    public void OnRectChanged(ZegoScreenCaptureSource source, ZegoRect captureRect)
    {

    }

    captureSource.onAvailableFrame = OnAvailableFrame;
    captureSource.onExceptionOccurred = OnExceptionOccurred;
    captureSource.onWindowStateChanged = OnWindowStateChanged;
    captureSource.onRectChanged = OnRectChanged;
    ```
</Accordion>


### 2 登录房间并开始推流

调用 [LoginRoom](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoExpressEngine#login-room) 接口，传入房间 ID 参数 “roomID” 和用户参数 “user”，登录房间。

调用 [StartPublishingStream ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoExpressEngine#start-publishing-stream) 接口，传入流 ID 参数 “streamID”，向远端用户发送本端的音视频流。


```csharp
// 创建用户
ZegoUser user = new ZegoUser("user1");

// 开始登录房间
engine.LoginRoom("room1", user);
// 开始推流
engine.StartPublishingStream("stream1");
```
至此，我们已完成采集屏幕数据并通过 ZEGO Express SDK 分享到远端的操作。


### 3 观看远端屏幕共享

完成以上步骤之后，其他用户可以使用 [StartPlayingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoExpressEngine#start-playing-stream) 接口拉取屏幕共享流。

```csharp
// 拉流播放，需传入发起屏幕共享的用户推流时所用的 streamID
engine.StartPlayingStream(streamID);
```

### 4 停止屏幕共享

调用 [StopScreenCapture](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoExpressEngine#stop-screen-capture) 接口停止共享。

```csharp
engine.StopScreenCapture();
```

<Content />

