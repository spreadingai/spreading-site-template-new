# 发布日志

- - -


## 3.21.0 版本 <a id="3.21.0"></a>

**发布日期： 2025-06-30**

**新增功能**

1. 媒体播放器支持结束播放时清除最后一帧画面

    在使用 [ZegoMediaPlayer](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/classes/_zegoexpressdefines_.zegomediaplayer.html) 播放视频结束后，可调用 [clearView](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/classes/_zegoexpressdefines_.zegomediaplayer.html#clearview) 清除遗留的最后一帧画面。

**改进优化**

1. 更新集成 Express Native SDK 至 3.21.0 版本

2. iOS 端屏幕共享添加跨应用启动代码，调用 [startScreenCapture](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/classes/_zegoexpressengineapp_.zegoexpressengine.html#startscreencapture) 会自动启用 iOS 系统弹框。

---

## 3.17.3 版本 <a id="3.17.3"></a>

**发布日期： 2024-11-26**

**新增功能**

1. 新增屏幕共享功能

    - iOS 屏幕共享分为应用内共享与跨应用共享，分别用于当前应用分享与系统级别的应用分享。如使用跨应用共享，需要在 iOS 原生工程新建 Broadcast Upload Extension 进程用于录制屏幕。
    - Android 为更符合隐私规范，需开发者主动声明屏幕共享权限：
      - 如果目标 Android SDK 版本低于 34.0.0 版本，需设置 `FOREGROUND_SERVICE`` 权限声明。
      - 如果目标 Android SDK 版本是 34.0.0 及以后版本，需要设置 FOREGROUND_SERVICE 及 FOREGROUND_SERVICE_MEDIA_PROJECTION 权限声明。

    详情请参考 [屏幕共享](https://doc-zh.zego.im/) 文档。

    相关 API 请参考 [startScreenCapture](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/classes/_zegoexpressengineapp_.zegoexpressengine.html#startscreencapture)、[stopScreenCapture](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/classes/_zegoexpressengineapp_.zegoexpressengine.html#stopscreencapture)、[updateScreenCaptureConfig](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/classes/_zegoexpressengineapp_.zegoexpressengine.html#updatescreencaptureconfig)、[mobileScreenCaptureExceptionOccurred](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/interfaces/_zegoexpresseventhandler_.zegoeventlistener.html#mobilescreencaptureexceptionoccurred)，[mobileScreenCaptureStart](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/interfaces/_zegoexpresseventhandler_.zegoeventlistener.html#mobilescreencapturestart)

2. 媒体播放器新增设置视图模式

    新增 [ZegoViewMode](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/enums/_zegoexpressdefines_.zegoviewmode.html) 参数，用于设置媒体播放器的视图模式，详情请参考 [媒体播放器](https://doc-zh.zego.im/article/21059) 文档。


**改进优化**

1. 更新集成 Express Native SDK 至 3.17.3 版本


---


## 3.16.2 版本 <a id="3.16.2"></a>

**发布日期： 2024-08-16**

**问题修复**


1. 修复 Android 特定场景摄像头无法打开的问题

2. 修复 Android 某些机型屏幕录制时，应用杀死后不会自动停止录屏权限的问题

3. 修复 iOS 频繁推流/停止推流偶现崩溃问题



---


## 3.16.0 版本 <a id="3.16.0"></a>

**发布日期： 2024-07-31**

**改进优化**


1. 更新集成 Express Native SDK 至 3.16.0 版本

2. `loginRoom` 与 `logoutRoom` 接口完善 Promise 能力，登录房间和退出房间会异步返回相应的结果

    相关 API 请参考 [loginRoom](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/classes/_zegoexpressengineapp_.zegoexpressengine.html#loginroom)，[logoutRoom](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/classes/_zegoexpressengineapp_.zegoexpressengine.html#logoutroom)



---


## 3.15.1 版本 <a id="3.15.1"></a>

**发布日期： 2024-06-14**

**新增功能**

1. Express uni-app SDK 适配 vue3 框架

2. 新增房间状态变化通知

    当房间的连接状态发生变化时会触发 [roomStateChanged](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/interfaces/_zegoexpresseventhandler_.zegoeventlistener.html#roomstateupdate) 回调，通过 [ZegoRoomState](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/enums/_zegoexpressdefines_.zegoroomstate.html) 参数提供更加详细的连接状态及状态变化原因。

    相关 API 请参考 [roomStateChanged](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/interfaces/_zegoexpresseventhandler_.zegoeventlistener.html#roomstatechanged)

3. 支持设置流附加消息

    新增 [setStreamExtraInfo](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/classes/_zegoexpressengineapp_.zegoexpressengine.html#setstreamextrainfo) 接口，支持设置一个以流为单位的附加消息，该附加消息是流 ID 的附加信息标识，跟随整个流的生命周期，流附加信息可以在推流中途修改。开发者可根据流附加信息，实现跟该流 ID 相关的可变内容的同步。

    相关 API 请参考 [setStreamExtraInfo](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/classes/_zegoexpressengineapp_.zegoexpressengine.html#setstreamextrainfo)，[roomStreamExtraInfoUpdate](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/interfaces/_zegoexpresseventhandler_.zegoeventlistener.html#roomstreamextrainfoupdate)


---



## 3.14.5 版本 <a id="3.14.5"></a>

**发布日期： 2024-05-07**

**新增功能**

1. 移动端开发支持 iOS 17.0 版本

    注意：从该版本起，不再支持 iOS 11.0 及之前的版本。

    从 2024-04-29 开始，所有上架 App Store 的应用必须支持 iOS 17.0 版本，详情请参考 [Apple 开发者网站官方说明](https://developer.apple.com/news/upcoming-requirements/?id=04292024a)。


**改进优化**

1. 更新 iOS SDK 内的隐私清单文件`PrivacyInfo.xcprivacy`

    注意：如客户集成的是 3.13.2 版本之前的 SDK，如想发布到 App Store，需下载最新版本的 SDK，并拷贝 PrivacyInfo.xcprivacy 文件到旧版 SDK 相应位置。

    请将 iOS SDK 内的隐私清单文件 `PrivacyInfo.xcprivacy` 升级到新版本，详情请参考 SDK 包内的 “ZegoExpressEngine.framework” 文件夹下的“PrivacyInfo.xcprivacy”。


---

## 3.10.2 版本 <a id="3.10.2"></a>

**发布日期： 2023-11-20**

**问题修复**

1. 修复移动端休眠检测模块误报，影响到房间重登录、推拉流重试逻辑的问题



---


## 3.10.1 版本 <a id="3.10.1"></a>

**发布日期： 2023-11-10**

**问题修复**

1. 修复开启低照度增强后出现黑屏的问题


---

## 3.9.0 版本 <a id="3.9.0"></a>

**发布日期：2023-09-19**

**新增功能**

1. 新增本地媒体录制功能

    开发者可将音视频流录制成本地文件，便于日后作回放等用途，详情请参考 [音视频录制](https://doc-zh.zego.im/article/21060)。

    相关 API 请参考 [startRecordingCapturedData](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/classes/_zegoexpressengine_.zegoexpressengine.html#startrecordingcaptureddata), [stopRecordingCapturedData](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/classes/_zegoexpressengine_.zegoexpressengine.html#stoprecordingcaptureddata), [capturedDataRecordStateUpdate](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/interfaces/_zegoexpresseventhandler_.zegoeventlistener.html#captureddatarecordstateupdate), [capturedDataRecordProgressUpdate](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/interfaces/_zegoexpresseventhandler_.zegoeventlistener.html#captureddatarecordprogressupdate)


---

## 3.6.0 版本 <a id="3.6.0"></a>

**发布日期：2023-06-28**

**新增功能**

1. 支持在使用后置摄像头时，设置是否开启或关闭手电筒

    相关 API 请参考 [enableTorch](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/classes/_zegoexpressengine_.zegoexpressengine.html#enabletorch)


---

## 1.8.0 版本 <a id="1.8.0"></a>

**发布日期：2023-04-25**

**新增功能**

1. 媒体播放器支持播放透明特效

    媒体播放器支持通过渲染 Alpha 通道，实现播放透明特效文件功能，详情请参考 [播放透明礼物特效](https://doc-zh.zego.im/article/17812)。

    相关 API 请参考 [loadResourceWithConfig](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/classes/_zegoexpressdefines_.zegomediaplayer.html#loadresourcewithconfig)

**废弃删除**


1. 从 1.8.0 版本开始，iOS SDK 不再支持 32 位 armv7 架构

    具体说明，请参考 [Xcode 14 Release Notes](https://developer.apple.com/documentation/xcode-release-notes/xcode-14-release-notes#Build-System)。



---

## 1.7.1 版本 <a id="1.7.1"></a>

**发布日期：2022-11-08**

**新增功能**

1. 媒体播放器功能支持 Web 平台使用


    新增支持在 Web 平台使用 [createMediaPlayer](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/classes/_zegoexpressengine_.zegoexpressengine.html#createmediaplayer)、[destroyMediaPlayer](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/classes/_zegoexpressengine_.zegoexpressengine.html#destroymediaplayer) 以及 [createMediaPlayer](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/classes/_zegoexpressengine_.zegoexpressengine.html#createmediaplayer) 创建的实例对象的 [setPlayerView](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/classes/_zegoexpressdefines_.zegomediaplayer.html#setplayerview)、[start](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/classes/_zegoexpressdefines_.zegomediaplayer.html#start)、[pause](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/classes/_zegoexpressdefines_.zegomediaplayer.html#pause)、[resume](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/classes/_zegoexpressdefines_.zegomediaplayer.html#resume)、[stop](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/classes/_zegoexpressdefines_.zegomediaplayer.html#stop)、[setPlaySpeed](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/classes/_zegoexpressdefines_.zegomediaplayer.html#setplayspeed)、[enableRepeat](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/classes/_zegoexpressdefines_.zegomediaplayer.html#enablerepeat)、[getTotalDuration](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/classes/_zegoexpressdefines_.zegomediaplayer.html#gettotalduration)、[enableAux](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/classes/_zegoexpressdefines_.zegomediaplayer.html#enableaux)、[setVolume](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/classes/_zegoexpressdefines_.zegomediaplayer.html#setvolume) 等接口，详情请参考 [功能总览](https://doc-zh.zego.im/article/10363)。

    相关 API 请参考 [createMediaPlayer](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/classes/_zegoexpressengine_.zegoexpressengine.html#createmediaplayer)、[destroyMediaPlayer](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/classes/_zegoexpressengine_.zegoexpressengine.html#destroymediaplayer)


---

## 1.7.0 版本 <a id="1.7.0"></a>

**发布日期：2022-10-17**

**新增功能**

1. 部分接口支持 Web 平台使用


    v1.7.0 版本之前的 SDK 仅支持 App 平台使用。v1.7.0 版本开始，部分接口支持在 Web 平台上使用，详情请参考 [功能总览](https://doc-zh.zego.im/article/10363)。


---
