# 发布日志

- - -


## 3.20.2 版本 <a id="3.20.2"></a>

**发布日期： 2025-04-07**

**新增功能**

1. 新增实时有序数据功能

    开发者在需要做远程控制、云游戏等指令分发时，通过实时信令，可以低延迟获取发布端消息。

    相关 API 请参考 [createRealTimeSequentialDataManager](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/classes/_zegoexpressengine_.zegoexpressengine.html#createrealtimesequentialdatamanager)，[destroyRealTimeSequentialDataManager](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/classes/_zegoexpressengine_.zegoexpressengine.html#destroyRealTimeSequentialDataManager)，[startBroadcasting](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/classes/_zegoexpressdefines_.zegorealtimesequentialdatamanager.html#startbroadcasting)，[stopBroadcasting](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/classes/_zegoexpressdefines_.zegorealtimesequentialdatamanager.html#stopbroadcasting)，[sendRealTimeSequentialData](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/classes/_zegoexpressdefines_.zegorealtimesequentialdatamanager.html#sendrealtimesequentialdata)，[startSubscribing](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/classes/_zegoexpressdefines_.zegorealtimesequentialdatamanager.html#startsubscribing)，[stopSubscribing](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/classes/_zegoexpressdefines_.zegorealtimesequentialdatamanager.html#stopsubscribing)，[receiveRealTimeSequentialData](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/interfaces/_zegoexpresseventhandler_.zegorealtimesequentialdataeventhandler.html#receiverealtimesequentialdata)

**改进优化**

1. 更新集成 Express Native SDK 至 3.20.2 版本。


---

## 3.19.0 版本 <a id="3.19.0"></a>

**发布日期： 2025-02-10**

**改进优化**

1. 更新集成 Express Native SDK 至 3.19.0 版本。


---

## 3.17.1 版本 <a id="3.17.1"></a>

**发布日期： 2024-10-15**

**新增功能**

1. 新增网络模式变更回调接口

    当设备的网络模式改变时，例如从 Wi-Fi 切换到 5G，或断网等情况下，将会触发本回调。

    相关 API 请参考 [networkModeChanged](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/interfaces/_zegoexpresseventhandler_.zegoeventlistener.html#networkmodechanged)

**改进优化**

1. 删除 AndroidManifest.xml 文件中声明的屏幕共享默认权限

    <Warning title="注意">


    - 若开发者在 3.17.0 版本之后，实现屏幕共享能力时没有声明权限，本次更新后必需主动声明权限，否则会出现兼容性问题。

    - 如线上遇到兼容性问题，请联系 ZEGO 技术支持。


    </Warning>



    为更符合隐私规范，删除 AndroidManifest.xml 文件中声明的屏幕共享默认权限，需开发者主动声明：

    - 如果目标 Android SDK 版本低于 34.0.0 版本，需设置 `FOREGROUND_SERVICE`` 权限声明。

    - 如果目标 Android SDK 版本是 34.0.0 及以后版本，需要设置 `FOREGROUND_SERVICE` 及 `FOREGROUND_SERVICE_MEDIA_PROJECTION` 权限声明。

    详情请参考 [屏幕共享](https://doc-zh.zego.im/article/21020) 文档。



---


## 3.16.2 版本 <a id="3.16.2"></a>

**发布日期： 2024-08-16**

**新增功能**

1. 新增 Android 端屏幕共享权限允许与取消回调

    相关 API 请参考 [mobileScreenCaptureExceptionOccurred](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/interfaces/_zegoexpresseventhandler_.zegoeventlistener.html#mobilescreencaptureexceptionoccurred)，[mobileScreenCaptureStart](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/interfaces/_zegoexpresseventhandler_.zegoeventlistener.html#mobilescreencapturestart)

**问题修复**


1. 修复 Android 特定场景摄像头无法打开的问题

2. 修复 Android 某些机型屏幕录制时，应用杀死后不会自动停止录屏权限的问题

3. 修复 iOS 频繁推流/停止推流偶现崩溃问题



---

## 3.16.0 版本 <a id="3.16.0"></a>

**发布日期： 2024-07-30**

**改进优化**


1. 更新集成 Express Native SDK 至 3.16.0 版本

2. Android 平台在 build.gradle 文件中增加命名空间配置，用于支持 Gradle 8.0 及以上版本

3. 关于 Android 平台屏幕共享能力权限声明

    为灵活适配，如需在 Android SDK 34.0.0 及以后版本，使用屏幕共享能力，需要在业务工程设置 `FOREGROUND_SERVICE` 及 `FOREGROUND_SERVICE_MEDIA_PROJECTION` 权限声明。

**废弃删除**

1. 废弃拉流接口中关于 CDN Plus 的配置

    下架畅直播概念，废弃 CDN Plus 直播相关接口。如需实现直播功能，推荐使用 ZEGO 自研 [超低延迟直播产品](https://doc-zh.zego.im/article/20994)，实现更高质量的直播体验。

    相关 API 请参考 [CDNPlus](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/enums/_zegoexpressdefines_.zegostreamresourcemode.html#cdnplus)


---


## 3.15.1 版本 <a id="3.15.1"></a>

**发布日期： 2024-06-18**

**新增功能**


1. 新增自定义视频采集功能


    新增自定义视频采集功能，支持开发者自行采集视频，向 ZEGO Express SDK 提供视频数据，并由 ZEGO Express SDK 进行编码推流的功能。当用户开启自定义视频采集的功能后，默认情况下，ZEGO Express SDK 在推流端内部将对本端预览画面进行渲染，用户无需自行进行渲染，详情请参考 [自定义视频采集](/real-time-video-rn/video/custom-video-capture)。


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

**问题修复**

1. 修复 Android 平台使用屏幕共享功能时，参数为空的问题


---


## 3.12.5 版本 <a id="3.12.5"></a>

**发布日期： 2024-03-13**

**问题修复**

1. 修复在 iOS 平台上多次调用 [createEngineWithProfile] 接口后，会收不到回调的问题


---


## 3.12.4 版本 <a id="3.12.4"></a>

**发布日期： 2024-01-18**

**问题修复**

1. 修复 iOS 平台初始化 SDK 时，如果出现网络异常，会偶现 UI 卡顿的问题

2. 修复切换网络时，如果网络异常，极低概率下会出现 UI 卡顿的问题


---

## 3.12.3 版本 <a id="3.12.3"></a>

**发布日期： 2024-01-08**

**改进优化**

1. 更新集成 Express Native SDK 至 3.12.3 版本。


---

## 3.11.0 版本 <a id="3.11.0"></a>

**发布日期： 2023-12-18**

**新增功能**

1. 媒体播放器支持播放透明特效

    媒体播放器支持通过渲染 Alpha 通道，实现播放透明特效文件功能，详情请参考 [播放透明礼物特效](/real-time-video-rn/other/play-transparent-gift-effects)。

    相关 API 请参考 [loadResourceWithConfig](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/classes/_zegoexpressdefines_.zegomediaplayer.html#loadresourcewithconfig)


---


## 3.10.3 版本 <a id="3.10.3"></a>

**发布日期： 2023-11-20**


**问题修复**

1. 修复移动端休眠检测模块误报，影响到房间重登录、推拉流重试逻辑的问题



---

## 3.10.2 版本 <a id="3.10.2"></a>

**发布日期：2023-11-17**

**新增功能**

1. 新增本地媒体录制功能

    开发者可将音视频流录制成本地文件，便于日后作回放等用途，详情请参考 [音视频录制](https://doc-zh.zego.im/article/21026)。

    相关 API 请参考 [startRecordingCapturedData](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/classes/_zegoexpressengine_.zegoexpressengine.html#startrecordingcaptureddata), [stopRecordingCapturedData](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/classes/_zegoexpressengine_.zegoexpressengine.html#stoprecordingcaptureddata), [capturedDataRecordStateUpdate](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/interfaces/_zegoexpresseventhandler_.zegoeventlistener.html#captureddatarecordstateupdate), [capturedDataRecordProgressUpdate](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/interfaces/_zegoexpresseventhandler_.zegoeventlistener.html#captureddatarecordprogressupdate)


---

## 3.10.1 版本 <a id="3.10.1"></a>

**发布日期： 2023-11-09**


**问题修复**

1. 修复开启低照度增强后出现黑屏的问题



---

## 3.8.1 版本 <a id="3.8.1"></a>

**发布日期： 2023-08-21**

**改进优化**

1. 更新集成 Express Native SDK 至 3.8.1 版本。


---

## 3.2.0 版本 <a id="3.2.0"></a>

**发布日期： 2023-02-01**


**改进优化**

1. 自定义信令配置支持扩展到 4KB

    注意：自定义信令配置默认大小为 1KB，如需扩展到 4KB，请联系 ZEGO 技术支持进行处理。


**问题修复**

1. 修复当硬件解码故障后重启时，访问空指针崩溃的问题

2. 修复由于读取图片宽高不正确，导致调用 `setDummyCapturelmagePath` 设置关闭摄像头推静态图片无效的问题

3. 修复当 iOS 14 启动引擎后，访问不存在的 API 时，导致崩溃的问题

4. 修复网络时间模块重试失败的问题



---

## 3.1.0 版本 <a id="3.1.0"></a>

**发布日期：2022-12-14**

**新增功能**

1. 新增屏幕共享功能

    iOS 屏幕共享分为应用内共享与跨应用共享，分别用于当前应用分享与系统级别的应用分享。如使用跨应用共享，需要在 iOS 原生工程新建 Broadcast Upload Extension 进程用于录制屏幕，详情请参考 [屏幕共享](/real-time-video-ios-oc/video/screen-sharing)。

    相关 API 请参考 [startScreenCaptureInApp](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/classes/_zegoexpressengine_.zegoexpressengine.html#startscreencapture)、[startScreenCapture](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/classes/_zegoexpressengine_.zegoexpressengine.html#startscreencapture)、[stopScreenCapture](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/classes/_zegoexpressengine_.zegoexpressengine.html#stopscreencapture)、[updateScreenCaptureConfig](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/classes/_zegoexpressengine_.zegoexpressengine.html#updatescreencaptureconfig)

2. 新增网络质量回调

    新增本地和远端用户的上下行网络质量回调 [onNetworkQuality](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/interfaces/_zegoexpresseventhandler_.zegoeventlistener.html#networkquality)，默认每两秒回调一次本地和每个拉取的远端用户的网络状况（包括未知、优秀、良好、中等、较差、网络断线）。当开发者希望分析链路上的网络情况，或想要了解本地和远端用户的网络状况时可以使用该功能。

    相关 API 请参考 [onNetworkQuality](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/interfaces/_zegoexpresseventhandler_.zegoeventlistener.html#networkquality)


3. 优化 NTP 时间误差

    调用 [getNetworkTimeInfo](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/classes/_zegoexpressengine_.zegoexpressengine.html#getnetworktimeinfo) 接口获取同步网络时间信息时，SDK 会定时更新 NTP 时间，减少获取到的 NTP 时间误差。

    相关 API 请参考 [getNetworkTimeInfo](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/classes/_zegoexpressengine_.zegoexpressengine.html#getnetworktimeinfo)

4. 直推 CDN 时，在不改变推流方式的情况下，SDK 从客户的 CDN 源站拉流，通过 L3 将音视频内容分发给观众，通过 [ZegoStreamResourceMode](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/modules/_index_.html#zegostreamresourcemode) 控制源站资源。该功能常用于直播场景

    相关 API 请参考 [startPlayingStream](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/classes/_zegoexpressengine_.zegoexpressengine.html#startplayingstream)


**改进优化**

1. 优化代码规范

    将 [ZegoOrientation](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/enums/_zegoexpressdefines_.zegoorientation.html) 枚举里的值的首字母改为大写。


---

## 3.0.3 版本 <a id="3.0.3"></a>

**发布日期：2022-11-28**

**问题修复**


1. 修复多房间模式下，停止推流时，房间内其他人收不到流删除通知的问题

2. 修复 Android 系统下，硬件解码切换分辨率后，可能会崩溃的问题

3. 修复 iOS 平台硬件解码可能会崩溃的问题



---

## 3.0.1 版本 <a id="3.0.1"></a>

**发布日期：2022-11-09**

**问题修复**

1. 修复了在热更新之后 SDK 回调不能被触发的问题

**废弃删除**

1. 删除了 deviceError 事件回调

    设备异常通知功能已于 0.22.0 版本废弃，且于 3.0.1 版本删除，请使用 [localDeviceExceptionOccurred](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/interfaces/_zegoexpresseventhandler_.zegoeventlistener.html#localdeviceexceptionoccurred) 替代。

    相关 API 请参考 [localDeviceExceptionOccurred](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/interfaces/_zegoexpresseventhandler_.zegoeventlistener.html#localdeviceexceptionoccurred)
