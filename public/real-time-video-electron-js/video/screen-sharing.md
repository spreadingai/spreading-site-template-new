# 屏幕共享

- - -

## 功能简介

屏幕共享，是指在视频通话或互动直播过程中将屏幕内容以视频的方式分享给其他的观众，以增强互动体验，提高沟通效率。

屏幕共享在如下场景中应用广泛：

- 视频会议场景中，屏幕共享可以将讲话者本地的文件、数据、网页、PPT 等画面分享给其他与会人；
- 在线课堂场景中，屏幕共享可以将老师的课件、笔记、讲课内容等画面展示给学生观看。

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Express/screen_share_scene_new.png" /></Frame>

## 示例源码下载

请参考 [下载示例源码](https://doc-zh.zego.im/article/3129) 获取源码。

## 前提条件

在实现屏幕共享功能之前，请确保：

- Windows7、Windows8、Windows10 或以上版本。
- macOS 10.13 或以上版本，以及 Apple Xcode 14.0 或以上版本。
- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppID 和 AppSign，详情请参考 [控制台 - 项目信息](/console/project-info)。
- 已在项目中集成 ZEGO Express Electron SDK，并实现了基本的音视频推拉流功能，详情请参考 [快速开始 - 集成](https://doc-zh.zego.im/article/1240) 和 [快速开始 - 实现视频通话](https://doc-zh.zego.im/article/7635)。


## 实现流程

<Warning title="注意">
屏幕采集时，仅 iOS、Android 平台支持同时采集视频和音频；其他平台仅支持采集视频，如需采集音频，请开发者自行实现相关逻辑。
</Warning>

### 1 获取窗口（包括屏幕）列表信息

SDK 可以通过 [getScreenCaptureSources](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_electron~class~ZegoExpressEngine#get-screen-capture-sources) 获取当前可共享的所有窗口信息。

```js
var screenCaptureSourceList = []
zgEngine.getScreenCaptureSources(400, 400, 100, 100).then(solve = function(res)
    {
        console.log('getScreenCaptureSources successful: ' + res)
        screenCaptureSourceList = res
    }, reject = function(res)
    {
        console.log("getScreenCaptureSources failed: " + res)
    })
```

### 2 创建屏幕共享源

通过上述窗口信息里的窗口 ID 与窗口类型，调用 [createScreenCaptureSource](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_electron~class~ZegoExpressEngine#create-screen-capture-source) 接口创建屏幕共享源对象。

```js
var screencapturesource = zgEngine.createScreenCaptureSource(parseInt(currentSelectSourceID), getScreenCaptureType(currentSelectSourceID))
    if(screencapturesource)
    {
        console.log("create screencapture successful!");
        screencapturesource.on('onExceptionOccurred', (res) =>{
            console.log('onExceptionOccurred')
        })
    }
    else
    {
        console.log("create screencapture failed!")
        return
    }
```

### 3 设置采集源为屏幕共享源

SDK 推流的视频源默认为摄像头源，如果需要推屏幕共享源，需要通过 [setVideoSource](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_electron~class~ZegoExpressEngine#set-video-source) 进行切换为屏幕共享。

```js
zgEngine.setVideoSource(zgDefines.ZegoVideoSourceType.ScreenCapture, screencapturesource.getIndex(), zgDefines.ZegoPublishChannel.Main)
```

### 4 启动共享

调用 [startCapture](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_electron~class~ZegoScreenCaptureSource#start-capture) 接口可以共享窗口画面。

```js
screencapturesource.startCapture()
```

### 5 更新共享源

调用 [updateCaptureSource](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_electron~class~ZegoScreenCaptureSource#update-capture-source) 接口可以更新共享窗口画面。

```js
screencapturesource.updateCaptureSource(parseInt(currentSelectSourceID), zgDefines.ZegoScreenCaptureSourceType.Window)
```

### 6 更新共享源区域

调用 [updateCaptureRegion](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_electron~class~ZegoScreenCaptureSource#update-capture-region) 接口可以动态更新共享窗口区域。其中设置为 (0, 0, 0, 0) 可恢复整个窗口共享。


```js
screencapturesource.updateCaptureRegion({x: 10, y: 10, width: 400, height: 400})
```

### 7 过滤指定窗口

调用 [setExcludeWindowList](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_electron~class~ZegoScreenCaptureSource#set-exclude-window-list) 接口可以过滤掉共享的屏幕中指定窗口画面，只适用于共享整个屏幕时设置。

```js
let sourceIDList = []
sourceIDList.push(screenCaptureSourceMap[0].sourceID)
sourceIDList.push(screenCaptureSourceMap[1].sourceID)
screencapturesource.setExcludeWindowList(sourceIDList)
```

### 8 是否激活窗口

调用 [enableWindowActivate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_electron~class~ZegoScreenCaptureSource#enable-window-activate) 接口可以激活当前共享的窗口。

```js
screencapturesource.enableWindowActivate(true)
```

### 9 是否显示鼠标

调用 [enableCursorVisible](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_electron~class~ZegoScreenCaptureSource#enable-cursor-visible) 接口可以显示或隐藏鼠标。

```js
screencapturesource.enableCursorVisible(true)
```

### 10 监听事件回调

通过监听 [onExceptionOccurred](https://doc-zh.zego.im/article/21395#onExceptionOccurred) 回调，接收采集异常相关通知。

```js
// 采集异常回调，当有异常回调时，会中断采集。
screencapturesource.on('onExceptionOccurred', (res) =>{
            console.log('onExceptionOccurred')
})
```

### 11 登录房间并开始推流

调用 [loginRoom ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_electron~class~ZegoExpressEngine#login-room) 接口，传入房间 ID 参数 “roomID” 和用户参数 “user”，登录房间。

调用 [startPublishingStream ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_electron~class~ZegoExpressEngine#start-publishing-stream) 接口，传入流 ID 参数 “streamID”，向远端用户发送本端的音视频流。


```js
// 开始登录房间
var TheRoomID = document.getElementById("roomIDInput").value
var TheUserID = document.getElementById("userIDInput").value
var TheUserName = document.getElementById("userNameInput").value
zgEngine.loginRoom(TheRoomID, { userID: TheUserID, userName: TheUserName});

// 开始推流
var ThePublishStreamID = document.getElementById("publishStreamIDInput").value
zgEngine.startPublishingStream(ThePublishStreamID, config= {roomID: TheRoomID}, zgDefines.ZegoPublishChannel.Main);

```

至此，我们已完成采集屏幕数据并通过 ZEGO Express Electron SDK 分享到远端的操作。

### 12 观看远端屏幕共享

完成以上步骤之后，其他用户可以使用 [startPlayingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_electron~class~ZegoExpressEngine#start-playing-stream) 接口拉取屏幕共享流。

```js
var ThePlayStreamID = document.getElementById("playStreamIDInput").value
zgEngine.startPlayingStream(ThePlayStreamID, { canvas: remoteCanvas});
```
### 13 停止共享

用户可以调用 [stopCapture](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_electron~class~ZegoScreenCaptureSource#stop-capture) 接口停止共享。

```js
screencapturesource.stopCapture()
```
