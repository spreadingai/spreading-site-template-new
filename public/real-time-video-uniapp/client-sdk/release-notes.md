# 发布日志

- - -

## 3.21.0 版本 <a id="3.21.0"></a>

**发布日期： 2025-07-02**

**新增功能**


1. 媒体播放器支持结束播放时清除最后一帧画面

    在使用 [ZegoMediaPlayer](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/classes/_zegoexpressdefines_.zegomediaplayer.html) 播放视频结束后，可调用 [clearView](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/classes/_zegoexpressdefines_.zegomediaplayer.html#clearview) 清除遗留的最后一帧画面。

**改进优化**

1. 更新集成 Express Native SDK 至 3.21.0 版本

2. iOS 端屏幕共享添加跨应用启动代码，调用 [startScreenCapture](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/classes/_zegoexpressengineapp_.zegoexpressengine.html#startscreencapture) 会自动启用 iOS 系统弹框。


## 3.17.3 版本 <a id="3.17.3"></a>

**发布日期： 2024-11-26**

**新增功能**

1. 新增屏幕共享功能

    - iOS 屏幕共享分为应用内共享与跨应用共享，分别用于当前应用分享与系统级别的应用分享。如使用跨应用共享，需要在 iOS 原生工程新建 Broadcast Upload Extension 进程用于录制屏幕。
    - Android 为更符合隐私规范，需开发者主动声明屏幕共享权限：
      - 如果目标 Android SDK 版本低于 34.0.0 版本，需设置 `FOREGROUND_SERVICE`` 权限声明。
      - 如果目标 Android SDK 版本是 34.0.0 及以后版本，需要设置 FOREGROUND_SERVICE 及 FOREGROUND_SERVICE_MEDIA_PROJECTION 权限声明。

    详情请参考 [屏幕共享](https://doc-zh.zego.im/article/15751) 文档。

    相关 API 请参考 [startScreenCapture](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/classes/_zegoexpressengineapp_.zegoexpressengine.html#startscreencapture)、[stopScreenCapture](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/classes/_zegoexpressengineapp_.zegoexpressengine.html#stopscreencapture)、[updateScreenCaptureConfig](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/classes/_zegoexpressengineapp_.zegoexpressengine.html#updatescreencaptureconfig)、[mobileScreenCaptureExceptionOccurred](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/interfaces/_zegoexpresseventhandler_.zegoeventlistener.html#mobilescreencaptureexceptionoccurred)，[mobileScreenCaptureStart](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/interfaces/_zegoexpresseventhandler_.zegoeventlistener.html#mobilescreencapturestart)

2. 媒体播放器新增设置视图模式

    新增 [ZegoViewMode](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/enums/_zegoexpressdefines_.zegoviewmode.html) 参数，用于设置媒体播放器的视图模式，详情请参考 [媒体播放器](https://doc-zh.zego.im/article/11533) 文档。


**改进优化**

1. 更新集成 Express Native SDK 至 3.17.3 版本

    <br />
---


## 3.16.2 版本 <a id="3.16.2"></a>

**发布日期： 2024-08-16**

**问题修复**


1. 修复 Android 特定场景摄像头无法打开的问题

2. 修复 Android 某些机型屏幕录制时，应用杀死后不会自动停止录屏权限的问题

3. 修复 iOS 频繁推流/停止推流偶现崩溃问题


    <br />
---


## 3.16.0 版本 <a id="3.16.0"></a>

**发布日期： 2024-07-31**

**改进优化**


1. 更新集成 Express Native SDK 至 3.16.0 版本

2. `loginRoom` 与 `logoutRoom` 接口完善 Promise 能力，登录房间和退出房间会异步返回相应的结果

    相关 API 请参考 [loginRoom](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/classes/_zegoexpressengineapp_.zegoexpressengine.html#loginroom)，[logoutRoom](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/classes/_zegoexpressengineapp_.zegoexpressengine.html#logoutroom)


    <br />
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

    <br />
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

    <br />
---

## 3.10.2 版本 <a id="3.10.2"></a>

**发布日期： 2023-11-20**

**问题修复**

1. 修复移动端休眠检测模块误报，影响到房间重登录、推拉流重试逻辑的问题


    <br />
---


## 3.10.1 版本 <a id="3.10.1"></a>

**发布日期： 2023-11-10**

**问题修复**

1. 修复开启低照度增强后出现黑屏的问题

    <br />
---

## 3.9.0 版本 <a id="3.9.0"></a>

**发布日期：2023-09-19**

**新增功能**

1. 新增本地媒体录制功能

    开发者可将音视频流录制成本地文件，便于日后作回放等用途，详情请参考 [音视频录制](https://doc-zh.zego.im/article/18318)。

    相关 API 请参考 [startRecordingCapturedData](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/classes/_zegoexpressengine_.zegoexpressengine.html#startrecordingcaptureddata), [stopRecordingCapturedData](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/classes/_zegoexpressengine_.zegoexpressengine.html#stoprecordingcaptureddata), [capturedDataRecordStateUpdate](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/interfaces/_zegoexpresseventhandler_.zegoeventlistener.html#captureddatarecordstateupdate), [capturedDataRecordProgressUpdate](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/interfaces/_zegoexpresseventhandler_.zegoeventlistener.html#captureddatarecordprogressupdate)

    <br />
---

## 3.6.0 版本 <a id="3.6.0"></a>

**发布日期：2023-06-28**

**新增功能**

1. 支持在使用后置摄像头时，设置是否开启或关闭手电筒

    相关 API 请参考 [enableTorch](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/classes/_zegoexpressengine_.zegoexpressengine.html#enabletorch)

    <br />
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


    <br />
---

## 1.7.1 版本 <a id="1.7.1"></a>

**发布日期：2022-11-08**

**新增功能**

1. 媒体播放器功能支持 Web 平台使用


    新增支持在 Web 平台使用 [createMediaPlayer](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/classes/_zegoexpressengine_.zegoexpressengine.html#createmediaplayer)、[destroyMediaPlayer](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/classes/_zegoexpressengine_.zegoexpressengine.html#destroymediaplayer) 以及 [createMediaPlayer](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/classes/_zegoexpressengine_.zegoexpressengine.html#createmediaplayer) 创建的实例对象的 [setPlayerView](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/classes/_zegoexpressdefines_.zegomediaplayer.html#setplayerview)、[start](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/classes/_zegoexpressdefines_.zegomediaplayer.html#start)、[pause](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/classes/_zegoexpressdefines_.zegomediaplayer.html#pause)、[resume](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/classes/_zegoexpressdefines_.zegomediaplayer.html#resume)、[stop](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/classes/_zegoexpressdefines_.zegomediaplayer.html#stop)、[setPlaySpeed](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/classes/_zegoexpressdefines_.zegomediaplayer.html#setplayspeed)、[enableRepeat](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/classes/_zegoexpressdefines_.zegomediaplayer.html#enablerepeat)、[getTotalDuration](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/classes/_zegoexpressdefines_.zegomediaplayer.html#gettotalduration)、[enableAux](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/classes/_zegoexpressdefines_.zegomediaplayer.html#enableaux)、[setVolume](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/classes/_zegoexpressdefines_.zegomediaplayer.html#setvolume) 等接口，详情请参考 [功能总览](https://doc-zh.zego.im/article/10363)。

    相关 API 请参考 [createMediaPlayer](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/classes/_zegoexpressengine_.zegoexpressengine.html#createmediaplayer)、[destroyMediaPlayer](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/classes/_zegoexpressengine_.zegoexpressengine.html#destroymediaplayer)

    <br />
---

## 1.7.0 版本 <a id="1.7.0"></a>

**发布日期：2022-10-17**

**新增功能**

1. 部分接口支持 Web 平台使用


    v1.7.0 版本之前的 SDK 仅支持 App 平台使用。v1.7.0 版本开始，部分接口支持在 Web 平台上使用，详情请参考 [功能总览](https://doc-zh.zego.im/article/10363)。

    <br />
---

## 1.6.3 版本 <a id="1.6.3"></a>

**发布日期：2022-05-17**

**问题修复**

1. 修复 Android jitpack 访问失败导致打包失败的问题，改为本地依赖

    <br />
---

## 1.6.2 版本 <a id="1.6.2"></a>

**发布日期：2022-04-15**

**问题修复**

1. 修复了日志上报时，日志文件收集异常的问题

2. 修复了部分手机的回声消除问题


    <br />
---

## 1.6.1 版本 <a id="1.6.1"></a>

**发布日期：2022-03-29**

**问题修复**

1. 修复推拉流过程中，因视图被频繁创建销毁导致预览异常的问题



    <br />
---


## 1.6.0 版本 <a id="1.6.0"></a>

**发布日期：2022-03-25**

**新增功能**

1. 媒体播放器支持倍速播放

    在加载资源完成后，调用 [setPlaySpeed] 接口可以设置媒体播放器的视频播放倍速，支持 0.5 ~ 2.0 倍，默认为 1.0，即正常速度。

    相关 API 请参考 [setPlaySpeed](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/classes/_zegoexpressdefines_.zegomediaplayer.html#setplayspeed)

2. 支持设置和获取音频质量配置

    在预览推流前，调用 [setAudioConfig] 接口可以配置推流的音频码率、声道数、音频编码。调用 [getAudioConfig] 接口可以获取当前的音频质量配置。

    相关 API 请参考 [setAudioConfig](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/classes/_zegoexpressengine_.zegoexpressengine.html#setaudioconfig), [getAudioConfig](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/classes/_zegoexpressengine_.zegoexpressengine.html#getaudioconfig)

    <br />
---

## 1.5.0 版本 <a id="1.5.0"></a>

**发布日期：2022-03-18**

**改进优化**

1. 优化了鉴权方式

    1.5.0 及以上版本，在创建引擎时将 AppSign 传空或不传，并且在登录房间时必须传入 Token，鉴权通过后即可使用实时音视频功能，具体请参考 [使用 Token 鉴权](/real-time-video-uniapp/communication/using-token-authentication)。

    1.5.0 之前版本，在创建引擎时传入 AppSign，鉴权通过后即可使用实时音视频功能。

    相关 API 请参考 [createEngineWithProfile](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/classes/_zegoexpressengine_.zegoexpressengine.html#createenginewithprofile), [loginRoom](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/classes/_zegoexpressengine_.zegoexpressengine.html#loginroom)

**问题修复**

1. 修复了 Android 平台下， \<zego-xxx-view> 标签被隐藏销毁会主动停止推拉流导致黑屏的问题

    <br />
---


## 1.4.0 版本 <a id="1.4.0"></a>

**发布日期：2022-01-21**

**新增功能**

1. 新增 Token 鉴权功能

    Token 鉴权功能指的是用户登录房间，或是在房间内进行推/拉流等操作时，ZEGO 服务端根据用户登录时携带的 Token 参数，判断用户是否有对应的权限，避免因权限控制缺失或操作不当引发的风险问题。目前仅支持用户登录房间和用户房间内推流两个权限的校验。


    相关 API 请参考 [loginRoom](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/classes/_zegoexpressengine_.zegoexpressengine.html#loginroom), [renewToken](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/classes/_zegoexpressengine_.zegoexpressengine.html#renewtoken), [roomTokenWillExpire](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/interfaces/_zegoexpresseventhandler_.zegoeventlistener.html#roomtokenwillexpire)

2. 新增混流功能

    混流功能包括手动混流、自动混流和全自动混流。
    - 手动混流：自定义控制混流任务和混流内容，包括输入流、混流布局等，支持手动混视频流和音频流，常用于跨房间连麦场景。
    - 自动混流：指定房间，自动将房间内的所有音频流进行混流，只支持自动混音频流，常用于纯语聊场景。
    - 全自动混流：每个房间都自动混音频流，只支持全自动混音频流，常用于纯语聊场景。


    相关 API 请参考 [startMixerTask](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/classes/_zegoexpressengine_.zegoexpressengine.html#startmixertask), [stopMixerTask](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/classes/_zegoexpressengine_.zegoexpressengine.html#stopmixertask), [startAutoMixerTask](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/classes/_zegoexpressengine_.zegoexpressengine.html#startautomixertask), [stopAutoMixerTask](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/classes/_zegoexpressengine_.zegoexpressengine.html#stopautomixertask)

3. 新增转推 CDN 功能

    支持将音视频流从 ZEGO 音视频云推送到 ZEGO 自有 CDN 或第三方 CDN 的过程，常用于单主播直播场景，例如电商直播、游戏直播、大班课等。

    相关 API 请参考 [addPublishCdnUrl](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/classes/_zegoexpressengine_.zegoexpressengine.html#addpublishcdnurl), [removePublishCdnUrl](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/classes/_zegoexpressengine_.zegoexpressengine.html#removepublishcdnurl)

4. 新增基础美颜功能

    ZEGO 提供了全新的基础美颜功能，为用户呈现出良好的肌肤状态，打造自然的美颜效果。开发者需要在推流前先调用 [startEffectsEnv] 接口初始化美颜环境，然后调用 [enableEffectsBeauty] 接口开启美颜功能。通过 [setEffectsBeautyParam] 接口可以按需调整美白、磨皮、锐化以及红润的程度，实现基础美颜能力。

    该功能常用于视频通话、直播等场景。

    相关 API 请参考 [startEffectsEnv](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/classes/_zegoexpressengine_.zegoexpressengine.html#starteffectsenv), [stopEffectsEnv](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/classes/_zegoexpressengine_.zegoexpressengine.html#stopeffectsenv), [enableEffectsBeauty](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/classes/_zegoexpressengine_.zegoexpressengine.html#enableeffectsbeauty), [setEffectsBeautyParam](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/classes/_zegoexpressengine_.zegoexpressengine.html#seteffectsbeautyparam)


5. 新增水印和截图功能

    支持在推拉流过程中对画面进行截图，并可以为视频流设置水印，可用于鉴黄等场景。

    相关 API 请参考 [takePublishStreamSnapshot](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/classes/_zegoexpressengine_.zegoexpressengine.html#takepublishstreamsnapshot), [takePlayStreamSnapshot](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/classes/_zegoexpressengine_.zegoexpressengine.html#takeplaystreamsnapshot), [setPublishWatermark](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/classes/_zegoexpressengine_.zegoexpressengine.html#setpublishwatermark)


**问题修复**

1. 修复了 `<zego-remote-view>` 远端视图中 “streamID” 为空导致的崩溃问题。

    <br />
---


## 1.3.0 版本 <a id="1.3.0"></a>

**发布日期：2021-12-31**

**新增功能**

1. 新增多房间功能

    同一个用户可以同时加入多个房间，并同时在多个房间内（目前默认最多同时加入 5 个房间）推流、拉流、发送实时消息和接收消息回调。本功能可以隔离多个房间的消息及回调，实现更灵活的连麦业务。ZEGO 推荐用于跨房间连麦和在线教育的超级小班场景。

    需要在初始化 SDK 之前，调用 [setRoomMode] 接口，通过 [ZegoRoomMode] 类设置多房间模式，然后调用 [loginRoom] 接口登录多房间。

    相关 API 请参考 [setRoomMode](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/classes/_zegoexpressengine_.zegoexpressengine.html#setroommode), [loginRoom](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/classes/_zegoexpressengine_.zegoexpressengine.html#loginroom)


**问题修复**

1. 修复了 iOS 平台上，移除 zego-view 标签时，原生视图状态没有被重置的问题



---


## 1.2.0 版本 <a id="1.2.0"></a>

**发布日期：2021-11-18**

**改进优化**

1. 去测试环境

    为了降低开发者对环境的理解成本，ZEGO 已统一环境概念，从该版本开始，废弃了测试环境，统一使用正式环境。在 1.2.0 版本之前已接入过 SDK 的开发者，可以参考 [测试环境废弃说明](https://doc-zh.zego.im/article/12997) 进行 SDK 升级及代码调整。

    相关 API 请参考 [createEngineWithProfile](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/classes/_zegoexpressengine_.zegoexpressengine.html#createenginewithprofile)


**废弃删除**

1. 废弃旧的 [createEngine] 接口

    为了降低开发者对环境的理解，废弃了掉测试环境，统一使用环境。在 1.2.0 及以上版本废弃了原有的 [createEngine] 接口，请使用 [createEngineWithProfile] 接口代替。

    相关 API 请参考 [createEngine](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/classes/_zegoexpressengine_.zegoexpressengine.html#createengine)

---


## 1.1.0 版本 <a id="1.1.0"></a>

**发布日期：2021-09-24**

**新增功能**

1. 支持摄像头关闭时推送静态图片

    关闭摄像头时，支持持续推送 JPEG/JPG、BMP 和 HEIF 格式的静态图片。例如，主播退后台的时候，会主动关闭摄像头，此时观众侧需要展示主播暂时离开的图片。

    初始化 SDK 后，关闭摄像头之前通过 [setDummyCaptureImagePath] 接口设置所推静态图片的路径，开始正常推流后，调用 [enableCamera] 接口关闭摄像头时会开始推静态图片，调用 [enableCamera] 接口打开摄像头时会结束推静态图片。

    相关 API 请参考 [setDummyCaptureImagePath](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/classes/_zegoexpressengine_.zegoexpressengine.html#setdummycaptureimagepath)

2. 新增手动混流功能

    新增手动混流功能，可以自定义控制混流任务和混流内容，包括输入流、混流布局等，支持手动混视频流和音频流，常用于多人互动直播和跨房间连麦场景。调用 [startMixerTask] 接口可以启动手动混流，调用 [stopMixerTask] 可以停止手动混流。

    相关 API 请参考 [startMixerTask](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/classes/_zegoexpressengine_.zegoexpressengine.html#startmixertask), [stopMixerTask](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/classes/_zegoexpressengine_.zegoexpressengine.html#stopmixertask)

3. 新增摄像头变焦功能

    通过 SDK 设置摄像头的变焦倍数，可实现拍摄时放大远方物体的效果。启动摄像头后，调用 [getCameraMaxZoomFactor] 接口可以获取摄像头的最大变焦倍数。调用 [setCameraZoomFactor] 接口可以设置摄像头的变焦倍数，最小值为 “1.0”。

    相关 API 请参考 [getCameraMaxZoomFactor](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/classes/_zegoexpressengine_.zegoexpressengine.html#getcameramaxzoomfactor), [setCameraZoomFactor](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/classes/_zegoexpressengine_.zegoexpressengine.html#setcamerazoomfactor)

4. 增加试验性 API 功能

    ZEGO 通过此 API 提供实时音视频业务中的部分技术预览或特别定制功能，例如手电筒打开功能，方便客户灯光暗的时候提升亮度。

    需要获取该功能的使用方法或其详情可咨询 ZEGO 技术支持。

    相关 API 请参考 [callExperimentalAPI](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/classes/_zegoexpressengine_.zegoexpressengine.html#callexperimentalapi)

---


## 1.0.0 版本 <a id="1.0.0"></a>

**发布日期：2021-06-11**

首次发布，包含基础的实时音视频功能、常用视频配置、房间实时消息、推拉流信息监测、编解码与分层编码、视频播放器、流量控制等进阶功能。
