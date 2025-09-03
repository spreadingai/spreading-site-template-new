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

    详情请参考 [屏幕共享](https://doc-zh.zego.im/article/17369) 文档。


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

    开发者可将音视频流录制成本地文件，便于日后作回放等用途，详情请参考 [音视频录制](https://doc-zh.zego.im/article/18829)。

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

---
## 0.22.0 版本 <a id="0.22.0"></a>

**发布日期：2022-10-13**

**新增功能**

1. 新增流附加信息

    通过 [setStreamExtraInfo](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/classes/_zegoexpressengine_.zegoexpressengine.html#setstreamextrainfo) 接口可设置当前推流的流附加信息。流附加信息是流 ID 的附加信息标识，可以在对应流 ID 的推流过程中修改。开发者可根据流附加信息来实现流 ID 相关可变内容的同步。

    相关 API 请参考 [setStreamExtraInfo](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/classes/_zegoexpressengine_.zegoexpressengine.html#setstreamextrainfo)

2. 新增对推流或拉流画面截图的功能

    支持在推拉流过程中对画面进行截图，可用于鉴黄等场景。

    相关 API 请参考 [takePublishStreamSnapshot](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/classes/_zegoexpressengine_.zegoexpressengine.html#takepublishstreamsnapshot), [takePlayStreamSnapshot](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/classes/_zegoexpressengine_.zegoexpressengine.html#takeplaystreamsnapshot)

---

## 0.21.0 版本 <a id="0.21.0"></a>

**发布日期：2022-09-27**

**新增功能**

1. 新增更多变声特效

    新增外国人、擎天柱、机器人、空灵等多种变声效果，轻松创建特色音效，使用户的声音更加妙趣横生。在语音场景中，营造好友语音之间的搞怪气氛，增强娱乐性。

    相关 API 请参考 [setVoiceChangerPreset](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/classes/_zegoexpressengine_.zegoexpressengine.html#setvoicechangerpreset)

2. 新增虚拟变声和混响功能。

    开发者基于新增的虚拟变声和混响功能，实现一些音频前处理效果。

    相关 API 请参考 [setVoiceChangerParam](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/classes/_zegoexpressengine_.zegoexpressengine.html#setvoicechangerparam), [setReverbAdvancedParam](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/classes/_zegoexpressengine_.zegoexpressengine.html#setreverbadvancedparam)

3. 新增音效均衡器（EQ）

    新增音效均衡器，支持调整 10 个频带的增益值，从而达到调整音色的目的。

    相关 API 请参考 [setAudioEqualizerGain](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/classes/_zegoexpressengine_.zegoexpressengine.html#setaudioequalizergain)

4. 新增混响高级参数及混响和变声的预设值

    通过混响高级参数可以根据需要调节更精细的混响效果，并在原有预设混响中新增了录音室、KTV、摇滚、演唱会等效果，在预设变声中新增了磁性男和清新女音效，增加实时语音趣味性，能够适应更多的场景。

    相关 API 请参考 [setReverbAdvancedParam](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/classes/_zegoexpressengine_.zegoexpressengine.html#setreverbadvancedparam), [setReverbPreset](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/classes/_zegoexpressengine_.zegoexpressengine.html#setreverbpreset), [setVoiceChangerPreset](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/classes/_zegoexpressengine_.zegoexpressengine.html#setvoicechangerpreset)

5. 新增电音音效

    电音音效指可以让人说话、唱歌的声音，经过处理后带有电音的效果，该功能常用于 KTV、语聊房场景。

    在 [createEngine](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/classes/_zegoexpressengine_.zegoexpressengine.html#createengine) 初始化 SDK 之前，调用 [setElectronicEffects](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/classes/_zegoexpressengine_.zegoexpressengine.html#setelectroniceffects) 接口可以开启电音音效，并可根据需要设置不同模式的电音调式以及对应调式的起始音高。未调用此接口时，默认关闭电音音效。

    开发者也可以通过 [setVoiceChangerPreset](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/classes/_zegoexpressengine_.zegoexpressengine.html#setvoicechangerpreset) 接口预设常见的电音音效，目前支持预设 C 大调电音音效、A 小调电音音效、和声小调电音音效。

    相关 API 请参考 [setElectronicEffects](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/classes/_zegoexpressengine_.zegoexpressengine.html#setelectroniceffects)


**改进优化**

1. 优化了基础美颜功能

    ZEGO 提供了全新的基础美颜功能，为用户呈现出良好的肌肤状态，打造自然的美颜效果。

    开发者需要在推流前先调用 [startEffectsEnv ](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/classes/_zegoexpressengine_.zegoexpressengine.html#starteffectsenv) 接口初始化美颜环境，然后调用 [enableEffectsBeauty ](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/classes/_zegoexpressengine_.zegoexpressengine.html#enableeffectsbeauty) 接口开启美颜功能。通过 [setEffectsBeautyParam ](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/classes/_zegoexpressengine_.zegoexpressengine.html#seteffectsbeautyparam) 接口可以按需调整美白、磨皮、锐化以及红润的程度，实现基础美颜能力。

    该功能常用于视频通话、直播等场景。

    相关 API 请参考 [startEffectsEnv ](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/classes/_zegoexpressengine_.zegoexpressengine.html#starteffectsenv), [stopEffectsEnv ](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/classes/_zegoexpressengine_.zegoexpressengine.html#stopeffectsenv), [enableEffectsBeauty ](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/classes/_zegoexpressengine_.zegoexpressengine.html#enableeffectsbeauty), [setEffectsBeautyParam ](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/classes/_zegoexpressengine_.zegoexpressengine.html#seteffectsbeautyparam)

---

## 0.20.0 版本 <a id="0.20.0"></a>

**发布日期：2022-08-02**

**新增功能**

1. 新增 setAudioRouteToSpeaker 接口，用于设置音频路由至扬声器

    通过 [setAudioRouteToSpeaker](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/classes/_zegoexpressengine_.zegoexpressengine.html#setaudioroutetospeaker) 可以设置音频路由至扬声器，当选择不使用内置扬声器播放声音，即设为 false 时，SDK 会根据系统调度，选择当前优先级最高的音频，输出设备播放声音。

    相关 API 请参考 [setAudioRouteToSpeaker](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/classes/_zegoexpressengine_.zegoexpressengine.html#setaudioroutetospeaker)

2. 增加获取当前音频路由类型

    通过 [getAudioRouteType](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/classes/_zegoexpressengine_.zegoexpressengine.html#getaudioroutetype) 可以获取当前音频的路由类型。

    相关 API 请参考 [getAudioRouteType](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/classes/_zegoexpressengine_.zegoexpressengine.html#getaudioroutetype)

3. 新增音频设备路由变更通知回调

    当有耳机插拔、扬声器和听筒切换等操作，使音频路由发生变化时，会抛出此回调。

    相关 API 请参考 [audioRouteChange](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/interfaces/_zegoexpresseventhandler_.zegoeventlistener.html#audioroutechange)

---

## 0.19.0 版本 <a id="0.19.0"></a>

**发布日期：2022-06-29**

**新增功能**

1. 支持 H.265 编解码

    H.265 编解码完整方案上线，适用于单主播直播和多人互动直播场景。开发者可以在编码或混流时输出 H.265 格式的视频码流，H.265 在同等画质下相对于 H.264 节约了 30% 的流量。使用该功能前，需要联系 ZEGO 技术支持开通。

    相关 API 请参考 [isVideoEncoderSupported](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/classes/_zegoexpressengine_.zegoexpressengine.html#isvideoencodersupported)，[isVideoDecoderSupported](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/classes/_zegoexpressengine_.zegoexpressengine.html#isvideodecodersupported)，[enableH265EncodeFallback](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/classes/_zegoexpressengine_.zegoexpressengine.html#enableh265encodefallback)，[publisherVideoEncoderChanged](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/interfaces/_zegoexpresseventhandler_.zegoeventlistener.html#publishervideoencoderchanged)

---

## 0.18.1 版本 <a id="0.18.1"></a>

**发布日期：2022-06-23**

**问题修复**

1. 修复 startPreview 及 startPlayingStream 函数的 view 参数不可选问题，将 view 参数调整为可选参数。

    相关 API 请参考 [startPreview](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/classes/_zegoexpressengine_.zegoexpressengine.html#startpreview)，[startPlayingStream](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/classes/_zegoexpressengine_.zegoexpressengine.html#startplayingstream)

---

## 0.18.0 版本 <a id="0.18.0"></a>

**发布日期：2022-05-18**

**新增功能**

1. 新增房间附加消息功能

    该功能可以设置一个以房间为单位的附加消息，该消息跟随整个房间的生命周期，每个登录到房间的用户都能够同步消息。开发者可用于实现各种业务逻辑，如房间公告等等。目前房间附加消息只允许设置一个键值对，且 key 最大长度为 10 字节，value 最大长度为 100 字节。

    相关 API 请参考 [setRoomExtraInfo](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/classes/_zegoexpressengine_.zegoexpressengine.html#setroomextrainfo), [roomExtraInfoUpdate](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/interfaces/_zegoexpresseventhandler_.zegoeventlistener.html#roomextrainfoupdate)

2. 新增 [setAllPlayStreamVolume] 接口，用于设置所有拉流声音大小

    本端用户可控制所有音频流的播放音量。

    相关 API 请参考 [setAllPlayStreamVolume](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/classes/_zegoexpressengine_.zegoexpressengine.html#setallplaystreamvolume)

3. 拉流端提供关闭所有音频或视频的功能

    当拉流时需要一次性关闭所有远端用户的音频或视频流时，可通过该功能实现。

    相关 API 请参考 [muteAllPlayStreamAudio](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/classes/_zegoexpressengine_.zegoexpressengine.html#muteallplaystreamaudio), [muteAllPlayStreamVideo](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/classes/_zegoexpressengine_.zegoexpressengine.html#muteallplaystreamvideo)

4. 新增网络测速功能

    该功能支持上行/下行网络测速，可用于检测网络环境是否适合推/拉指定码率的流。调用 [startNetworkSpeedTest] 接口开启该功能，配置 “ZegoNetworkSpeedTestConfig” 参数以控制测速过程，测速结果将通过 [onNetworkSpeedTestQualityUpdate] 回调通知。

    相关 API 请参考 [startNetworkSpeedTest](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/classes/_zegoexpressengine_.zegoexpressengine.html#startnetworkspeedtest), [stopNetworkSpeedTest](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/classes/_zegoexpressengine_.zegoexpressengine.html#stopnetworkspeedtest), [networkSpeedTestQualityUpdate](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/interfaces/_zegoexpresseventhandler_.zegoeventlistener.html#networkspeedtestqualityupdate), [networkSpeedTestError](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/interfaces/_zegoexpresseventhandler_.zegoeventlistener.html#networkspeedtestqualityupdate)

5. 新增房间状态变化通知 [roomStateChanged]

    当房间的连接状态发生变化时会触发 [roomStateChanged] 回调，通过 “ZegoRoomStateChangedReason” 参数提供更加详细的连接状态及状态变化原因。

    相关 API 请参考 [roomStateChanged](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/interfaces/_zegoexpresseventhandler_.zegoeventlistener.html#roomstatechanged)

6. 新增本地预览首帧渲染回调

    第一帧视频数据被渲染完之后会收到此回调。

    相关 API 请参考 [publisherRenderVideoFirstFrame](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/interfaces/_zegoexpresseventhandler_.zegoeventlistener.html#publisherrendervideofirstframe)

7. 支持监听推流的地址和协议相关信息

    发起推流后，可以通过 [publisherStreamEvent] 回调实时监听推流状态，该回调会返回当前使用的推流地址、资源类型和协议相关信息。

    相关 API 请参考 [publisherStreamEvent](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/interfaces/_zegoexpresseventhandler_.zegoeventlistener.html#publisherstreamevent)

8. 新增 [apiCalledResult] 回调通知，用于接收执行结果的回调

    通过 [apiCalledResult] 回调获取到 ZEGO SDK 方法执行结果的详细信息。

    相关 API 请参考 [apiCalledResult](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/interfaces/_zegoexpresseventhandler_.zegoeventlistener.html#apicalledresult)

9. 增加 CDN 直播功能，并且该功能支持使用 QUIC 协议推拉流

    **转推 CDN**：转推 CDN 指的是将音视频流从 ZEGO 音视频云推送到 ZEGO 自有 CDN 或第三方 CDN 的过程。

    **直推 CDN**：开发者可通过指定具体 CDN 的 URL（或使用 ZEGO 后台配置），直接将音视频流推送到 CDN，需在推流前设置。

    **QUIC 协议推拉流**：主要用于改善弱网环境下 CDN 直播质量不稳定的情况，但是改善有限，推荐使用低延时直播，享受高质量且低延时的直播服务。当前支持使用腾讯、网宿两家 CDN 直播产品的 QUIC 协议推流及拉流。

    通过 [enablePublishDirectToCDN] 接口中的 “ZegoCDNConfig” 参数配置推流协议和 QUIC 版本，若想进行 QUIC 协议的自定义 CDN 拉流，需要通过 [startPlayingStream] 中的 “ZegoPlayerConfig” 参数配置拉流协议和 QUIC 版本。

    相关 API 请参考 [addPublishCdnUrl](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/classes/_zegoexpressengine_.zegoexpressengine.html#addpublishcdnurl), [removePublishCdnUrl](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/classes/_zegoexpressengine_.zegoexpressengine.html#removepublishcdnurl), [enablePublishDirectToCDN](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/classes/_zegoexpressengine_.zegoexpressengine.html#enablepublishdirecttocdn)

10. 新增 [setPlayStreamVideoType] 接口，用于设置播放视频流类型

    当推流方通过 [setVideoConfig] 设置了 “codecID” 为 “SVC” 时（在拉流前后均可设置），拉流方可以动态设置选用不同的流类型（小分辨率为标准图层的二分之一）。 在网络较弱或者渲染的 UI 窗体较小的情况下，可以选择使用拉取小分辨率的视频来达到节省带宽的目的。

    相关 API 请参考 [setPlayStreamVideoType](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/classes/_zegoexpressengine_.zegoexpressengine.html#setplaystreamvideotype)

**问题修复**

1. 修复了 Express React Native SDK 生命周期与 Native SDK 不一致的问题

---


## 0.17.1 版本 <a id="0.17.1"></a>

**发布日期：2022-04-14**

**问题修复**

1. 修复了日志上报时，日志文件收集异常的问题

2. 修复了部分手机的回声消除问题


---

## 0.17.0 版本 <a id="0.17.0"></a>

**发布日期：2022-03-18**

**改进优化**

1. 优化了鉴权方式

    0.17.0 及以上版本，在创建引擎时将 AppSign 传空或不传，并且在登录房间时必须传入 Token，鉴权通过后即可使用实时音视频功能，具体请参考 [使用 Token 鉴权](/real-time-video-rn/communication/using-token-authentication)。

    0.17.0 之前版本，在创建引擎时传入 AppSign，鉴权通过后即可使用实时音视频功能。

    相关 API 请参考 [createEngineWithProfile](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/classes/_zegoexpressengine_.zegoexpressengine.html#createengine), [loginRoom](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/classes/_zegoexpressengine_.zegoexpressengine.html#loginroom)

2. 去测试环境

    为了降低开发者对环境的理解成本，ZEGO 已统一环境概念，从该版本开始，废弃了测试环境，统一使用正式环境。在 1.5.0 版本之前已接入过 SDK 的开发者，可以参考 [测试环境废弃说明](https://doc-zh.zego.im/article/12997) 进行 SDK 升级及代码调整。

    相关 API 请参考 [createEngineWithProfile](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/classes/_zegoexpressengine_.zegoexpressengine.html#createengine)
