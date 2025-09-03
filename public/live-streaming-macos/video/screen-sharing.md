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
- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppID 和 AppSign，详情请参考 [控制台 - 项目信息](/console/project-info)。
- 已在项目中集成 ZEGO Express SDK，并实现了基本的音视频推拉流功能，详情请参考 [快速开始 - 集成](https://doc-zh.zego.im/article/21225) 和 [快速开始 - 实现流程](https://doc-zh.zego.im/article/21272)。



## 实现流程


<Warning title="注意">

- 屏幕采集时，仅 iOS、Android 平台支持同时采集视频和音频；其他平台仅支持采集视频，如需采集音频，请开发者自行实现相关逻辑。
- 如果您已经通过 ZEGO 旧版 [屏幕共享](https://doc-zh.zego.im/article/3166) 产品实现屏幕共享功能，或者需要自己实现屏幕共享功能，请参考 [如何通过自定义采集实现屏幕共享？](http://doc-zh.zego.im/faq/Express_Share_Screen?product=HybridHierarchicalDeliverySystem&platform=windows)。
</Warning>


调用屏幕共享接口在 macOS 平台会获取相关权限，需要在 “安全性与隐私” 中开启录屏权限与辅助功能权限，如不生效需要将之前的权限删除再次新增。
- 录屏权限

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Express/Adobe_Captivate.png" /></Frame>

- 辅助功能权限

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Express/Auxiliary_functions.png" /></Frame>

### 获取窗口（包括屏幕）列表信息

SDK 可以通过 [getScreenCaptureSourcesWithThumbnailSize](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_macos~class~ZegoExpressEngine#get-screen-capture-sources-with-thumbnail-size-icon-size) 获取当前可共享的所有窗口信息。

```objc
NSArray<ZegoScreenCaptureSourceInfo *> *infoList = [engine getScreenCaptureSourcesWithThumbnailSize:CGSizeMake(400, 400) iconSize:CGSizeMake(100, 100)];
```

### 创建屏幕共享源

通过上述窗口信息里的窗口 ID 与窗口类型，调用 [createScreenCaptureSource](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_macos~class~ZegoExpressEngine#create-screen-capture-source-source-type) 接口创建屏幕共享源对象。

```objc
if (infoList.count > 0) {
    ZegoScreenCaptureSourceInfo *info = infoList[0];
    ZegoScreenCaptureSource *source = [engine createScreenCaptureSource:info.sourceID sourceType:info.sourceType];
}
```

### 设置采集源为屏幕共享源

SDK 推流的视频源默认为摄像头源，如果需要推屏幕共享源，需要通过 [setVideoSource](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_macos~class~ZegoExpressEngine#set-video-source) 进行切换为屏幕共享。

```objc
[engine setVideoSource:ZegoVideoSourceScreenCapture instanceID:source.getIndex.unsignedIntValue channel:ZegoPublishChannelMain];
```

### 启动共享

调用 [startCapture](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_macos~class~ZegoScreenCaptureSource#start-capture) 接口可以共享窗口画面。

```objc
[source startCapture];
```

### 更新共享源

调用 [updateCaptureSource](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_macos~class~ZegoScreenCaptureSource#update-capture-source-source-type) 接口可以更新共享窗口画面。

```objc
[source updateCaptureSource:infoList[1].sourceID sourceType:infoList[1].sourceType];
```

### 更新共享源区域

用户可以调用 [updateCaptureRegion](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_macos~class~ZegoScreenCaptureSource#update-capture-region) 接口动态更新共享窗口区域，其中设置为 (0, 0, 0, 0) 可恢复整个窗口共享。


```objc
[source updateCaptureRegion:CGRectMake(10, 10, 400, 400)];
```

### 过滤指定窗口

调用 [setExcludeWindowList](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_macos~class~ZegoScreenCaptureSource#set-exclude-window-list) 接口可以过滤掉共享的屏幕中指定窗口画面，只适用于共享整个屏幕时进行设置。

```objc
[source setExcludeWindowList:@[@(infoList[1].sourceID), @(infoList[2].sourceID)]];
```

### 是否激活窗口

用户可以调用 [enableWindowActivate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_macos~class~ZegoScreenCaptureSource#enable-window-activate) 接口来激活当前共享的窗口。

```objc
[source enableWindowActivate:true];
```

### 是否显示鼠标

调用 [enableCursorVisible](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_macos~class~ZegoScreenCaptureSource#enable-cursor-visible) 接口进行显示或隐藏鼠标。

```objc
[source enableCursorVisible:true];
```

<a id="callback"></a>

### 设置事件回调

调用 [setEventHandler](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_macos~class~ZegoScreenCaptureSource#set-event-handler) 接口设置共享源事件回调。

```objc
[source setEventHandler:self];

···
// 采集数据回调，可用于本地录制。
- (void)screenCapture:(ZegoScreenCaptureSource *)source availableFrame:(const void *)data dataLength:(unsigned int)dataLength param:(ZegoVideoFrameParam *)param {

}

// 采集异常回调，当有异常回调时，会中断采集。
- (void)screenCapture:(ZegoScreenCaptureSource *)source captureType:(ZegoScreenCaptureSourceType)sourceType exceptionOccurred:(ZegoScreenCaptureSourceExceptionType)exceptionType {

}

// 窗口采集状态回调，当窗口区域位置更改时，会通过此回调通知，当窗口不在当前屏幕区域内时，会停止采集。
- (void)screenCapture:(ZegoScreenCaptureSource *)source windowState:(ZegoScreenCaptureWindowState)state windowRect:(CGRect)rect {

}
```

### 登录房间并开始推流

调用 [loginRoom](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_macos~class~ZegoExpressEngine#login-room-user) 接口，传入房间 ID 参数 “roomID” 和用户参数 “user”，登录房间。

调用 [startPublishingStream ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_macos~class~ZegoExpressEngine#start-publishing-stream) 接口，传入流 ID 参数 “streamID”，向远端用户发送本端的音视频流。

```objc
// 创建用户
ZegoUser *user = [ZegoUser userWithUserID:self.userID];

// 使用默认配置实例化 ZegoRoomConfig 配置对象
ZegoRoomConfig *roomConfig = [ZegoRoomConfig defaultConfig];

// 开始登录房间
[[ZegoExpressEngine sharedEngine] loginRoom:self.roomID user:user config:roomConfig];

// 开始推流
[[ZegoExpressEngine sharedEngine] startPublishingStream:publishStreamID];
```

至此，我们已完成采集屏幕数据并通过 ZEGO Express SDK 分享到远端的操作。

### 观看远端屏幕共享

完成以上步骤之后，其他用户可以使用 [startPlayingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_macos~class~ZegoExpressEngine#start-playing-stream-canvas) 接口拉取屏幕共享流。

```objc
ZegoCanvas *playCanvas = [ZegoCanvas canvasWithView:self.remotePlayView];
playCanvas.viewMode = ZegoViewModeAspectFill;

NSString *playStreamID = self.playStreamIDTextField.stringValue;

[[ZegoExpressEngine sharedEngine] startPlayingStream:playStreamID canvas:playCanvas];
```

### 停止共享

用户可以调用 [stopCapture](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_macos~class~ZegoScreenCaptureSource#stop-capture) 接口停止共享。

```objc
[source stopCapture];
```

### 销毁屏幕采集源对象

不再需要使用屏幕采集功能时，可调用 [destroyScreenCaptureSource](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_macos~class~ZegoExpressEngine#destroy-screen-capture-source) 接口销毁屏幕采集源对象。

```objc
[engine destroyScreenCaptureSource:source];
```

## 更多功能

<a id="highlight"></a>

### 描边

在屏幕共享时，您可以调用 [enableHightLight](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_macos~class~ZegoScreenCaptureSource#enable-hight-light-config) 接口对屏幕区域或者窗口启用描边，设置描边的颜色和宽度。

```objc
ZegoLayerBorderConfig *config = [[ZegoLayerBorderConfig alloc] init];
// 边框颜色，格式为 0xRRGGBB，默认为绿色即 0x00FF00
config.color = 0x00FF00;
// 边框大小，默认值 4， 最大值为 100
config.width = 4;
[source enableHightLight:true config:config];
```

<Content />

