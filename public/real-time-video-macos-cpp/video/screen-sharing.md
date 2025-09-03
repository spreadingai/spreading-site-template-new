# 屏幕共享

- - -

## 功能简介

屏幕共享，是指在视频通话或互动直播过程中将屏幕内容以视频的方式分享给其他的观众，以增强互动体验，提高沟通效率。

屏幕共享在如下场景中应用广泛：

- 视频会议场景中，屏幕共享可以将讲话者本地的文件、数据、网页、PPT 等画面分享给其他与会人；
- 在线课堂场景中，屏幕共享可以将老师的课件、笔记、讲课内容等画面展示给学生观看。

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Express/screen_share_scene_new.png" /></Frame>

## 示例源码下载

请参考 [下载示例源码](/real-time-video-macos-cpp/quick-start/run-example-code) 获取源码。

相关源码请查看 “/ZegoExpressExample/Example/Others/ScreenSharing/” 目录下的文件。

```
others
...
├── ScreenSharing
│   ├── ScreenCaptureSourceDialog.cpp // 展示可共享的窗口略缩图
│   ├── ScreenCaptureSourceDialog.h
│   ├── ScreenCaptureSourceDialog.ui
│   ├── ScreenSharing.cpp // 屏幕共享主流程功能
│   ├── ScreenSharing.h
│   └── ScreenSharing.ui
...
```

## 前提条件

在实现屏幕共享功能之前，请确保：
- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppID 和 AppSign，详情请参考 [控制台 - 项目信息](/console/project-info)。
- 已在项目中集成 ZEGO Express SDK，并实现了基本的音视频推拉流功能，详情请参考 [快速开始 - 集成](https://doc-zh.zego.im/article/9975) 和 [快速开始 - 实现流程](https://doc-zh.zego.im/article/9976)。



## 实现流程

<Warning title="注意">
- 屏幕采集时，仅 iOS、Android 平台支持同时采集视频和音频；其他平台仅支持采集视频，如需采集音频，请开发者自行实现相关逻辑。
- 需要自己实现屏幕共享功能，请参考 [如何通过自定义采集实现屏幕共享？](http://doc-zh.zego.im/faq/Express_Share_Screen?product=HybridHierarchicalDeliverySystem&platform=windows)。
</Warning>




调用屏幕共享接口在 mac 平台会获取相关权限，需要在 “安全性与隐私” 中开启录屏权限与辅助功能权限，如不生效需要将之前的权限删除再次新增。
- 录屏权限
<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Express/Adobe_Captivate.png" /></Frame>

- 辅助功能权限
<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Express/Auxiliary_functions.png" /></Frame>

### 获取窗口（包括屏幕）列表信息

SDK 可以通过 [getScreenCaptureSources](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#get-screen-capture-sources) 获取当前可共享的所有窗口信息。

```cpp
IZegoExpressEngine *engine = ZegoExpressSDK::getEngine();
std::vector<ZegoScreenCaptureSourceInfo> infoList = engine->getScreenCaptureSources(400, 400, 100, 100);
```

### 创建屏幕共享源

通过上述窗口信息里的窗口 ID 与窗口类型，调用 [createScreenCaptureSource](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#create-screen-capture-source) 接口创建屏幕共享源对象。

```cpp
if (infoList.size() > 0) {
    ZegoScreenCaptureSourceInfo info = infoList[0];
    IZegoScreenCaptureSource *source = engine->createScreenCaptureSource(info.sourceID, info.sourceType);
}
```

### 设置采集源为屏幕共享源

SDK 推流的视频源默认为摄像头源，如果需要推屏幕共享源，需要通过 [setVideoSource](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#set-video-source) 进行切换为屏幕共享。

```cpp
engine->setVideoSource(ZEGO_VIDEO_SOURCE_SCREEN_CAPTURE, source->getIndex(), ZEGO_PUBLISH_CHANNEL_MAIN);

```

### 启动共享

调用 [startCapture](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoScreenCaptureSource#start-capture) 接口可以共享窗口画面。

```cpp
source->startCapture();
```

### 更新共享源

调用 [updateCaptureSource](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoScreenCaptureSource#update-capture-source) 接口可以更新共享窗口画面。

```cpp
ZegoScreenCaptureSourceInfo info = infoList[1];
source->updateCaptureSource(info.sourceID, info.sourceType);
```

### 更新共享源区域

用户可以调用 [updateCaptureRegion](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoScreenCaptureSource#update-capture-region) 接口动态更新共享窗口区域，其中设置为 (0, 0, 0, 0) 可恢复整个窗口共享。


```cpp
source->updateCaptureRegion(10, 10, 400, 400);
```

### 过滤指定窗口

调用 [setExcludeWindowList](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoScreenCaptureSource#set-exclude-window-list) 接口可以过滤掉共享的屏幕中指定窗口画面，只适用于共享整个屏幕时进行设置。

```cpp
void* list[2];
list[0] = infoList[1].sourceID
list[1] = infoList[2].sourceID
source->setExcludeWindowList(list, 2);
```

### 是否激活窗口

用户可以调用 [enableWindowActivate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoScreenCaptureSource#enable-window-activate) 接口来激活当前共享的窗口。

```cpp
source->enableWindowActivate(true);
```

### 是否显示鼠标

调用 [enableCursorVisible](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoScreenCaptureSource#enable-cursor-visible) 接口进行显示或隐藏鼠标。

```cpp
source->enableCursorVisible(true);
```

<a id="callback"></a>

### 设置事件回调

调用 [setEventHandler](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoScreenCaptureSource#set-event-handler) 接口设置共享源事件回调。

```cpp
std::shared_ptr<ScreenCaptureSourceEventHandler> handler = std::make_shared<ScreenCaptureSourceEventHandler>(this);
source->setEventHandler(handler);

···
// 采集数据回调，可用于本地录制。
void onAvailableFrame(IZegoScreenCaptureSource * /*source*/, const void * /*data*/,unsigned int /*dataLength*/, ZegoVideoFrameParam /*param*/) override;

// 采集异常回调，当有异常回调时，会中断采集。
void onExceptionOccurred(IZegoScreenCaptureSource * /*source*/,ZegoScreenCaptureSourceExceptionType /*exceptionType*/) override;

// 窗口采集状态回调，当窗口区域位置更改时，会通过此回调通知，当窗口不在当前屏幕区域内时，会停止采集。
void onWindowStateChanged(IZegoScreenCaptureSource * /*source*/,ZegoScreenCaptureWindowState /*windowState*/,ZegoRect /*windowRect*/) override;
```

### 登录房间并开始推流

调用 [loginRoom](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#login-room) 接口，传入房间 ID 参数 “roomID” 和用户参数 “user”，登录房间。

调用 [startPublishingStream ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#start-publishing-stream) 接口，传入流 ID 参数 “streamID”，向远端用户发送本端的音视频流。


```cpp
// 开始登录房间
ZegoUser user(m_currentUserId, m_currentUserId);
engine->loginRoom(m_currentRoomId, user);

// 开始推流
engine->startPublishingStream(m_currentPublishStreamId, ZEGO_PUBLISH_CHANNEL_MAIN);

```

至此，我们已完成采集屏幕数据并通过 ZEGO Express SDK 分享到远端的操作。

### 观看远端屏幕共享

完成以上步骤之后，其他用户可以使用 [startPlayingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#start-playing-stream) 接口拉取屏幕共享流。

```cpp
ZegoCanvas canvas(ZegoUtilHelper::GetView(ui->frame_Play));
canvas.viewMode = ZEGO_VIEW_MODE_ASPECT_FIT;
engine->startPlayingStream(m_currentPlayStreamId, &canvas);
```

### 停止共享

用户可以调用 [stopCapture](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoScreenCaptureSource#stop-capture) 接口停止共享。

```cpp
source->stopCapture();
```

### 销毁屏幕采集源对象

不再需要使用屏幕采集功能时，可调用 [destroyScreenCaptureSource](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#destroy-screen-capture-source) 接口销毁屏幕采集源对象。

```cpp
engine->createScreenCaptureSource(source);
```

## 更多功能

<a id="highlight"></a>

### 描边

在屏幕共享时，您可以调用 [enableHightLight](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoScreenCaptureSource#enable-hight-light) 接口对屏幕区域或者窗口启用描边，设置描边的颜色和宽度。

```cpp
ZegoLayerBorderConfig config;
// 边框颜色，格式为 0xRRGGBB，默认为绿色即 0x00FF00
config.color = 0x00FF00;
// 边框大小，默认值 4， 最大值为 100
config.width = 4;
source->enableHightLight(enable, config);
```
