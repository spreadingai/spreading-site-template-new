# 发布日志

- - -


## 3.19.0 版本 <a id="3.19.0"></a>

**发布日期： 2025-02-14**

**新增功能**

1. 支持针对媒体播放器输出的声音内容，开启变声效果

    媒体播放器新增 [EnableVoiceChanger] 接口 ，支持针对媒体播放器输出的声音内容开启变声效果，同时选择需要的变调音效。

    相关 API 请参考 [ZegoMediaPlayer > EnableVoiceChanger](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~ZegoMediaPlayer#enable-voice-changer)

2. 支持将混流后的输出流加入到目标房间

    混流功能支持将混流后的输出流，加入到指定房间，即支持设置输出流的目标房间信息（[targetRoom](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~struct~ZegoMixerOutput#target-room)）。每条输出流只支持加入一个房间，且一旦添加，混流过程中不支持动态更新房间。如需使用服务端接口实现该功能，可参考 [开始混流](/real-time-voice-server/api-reference/stream-mixing/start-mix) 文档。

**改进优化**

1. 更新集成 Express Native SDK 至 3.19.0 版本。


---

## 3.16.2 版本 <a id="3.16.2"></a>

**发布日期： 2024-08-19**

**新增功能**

1. 新增电音音效

    电音音效指的是可以让人说话、唱歌的声音，经过处理后带有电音的效果。该功能常用于KTV、语聊房场景。

    在 [CreateEngine] 初始化 SDK 之前，调用 [SetElectronicEffects] 接口可以开启电音音效，并可根据需要设置不同模式的电音调式以及对应调式的起始音高。未调用此接口时，默认关闭电音音效。

    开发者也可以通过 [SetVoiceChangerPreset] 接口预设常见的电音音效，目前支持预设 C 大调电音音效、A 小调电音音效、和声小调电音音效。

    相关 API 请参考 [SetElectronicEffects](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~ZegoExpressEngine#set-electronic-effects)

2. 新增音效均衡器（EQ）

    支持调整 10 个频带的增益值，从而达到调整音色的目的。

    相关 API 请参考 [SetAudioEqualizerGain](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~ZegoExpressEngine#set-audio-equalizer-gain)

3. 新增支持设置和获取音频设备音量

    注意：仅 Windows、macOS 及 Linux 支持该功能。

    支持通过 [SetAudioDeviceVolume] 接口设置音频设备（扬声器或麦克风）的采集音量后再推拉流，但由于系统限制可能导致此接口调用失败，推荐直接使用 [SetCaptureVolume] 和 [SetPlayVolume] 接口来调节推拉流音量。

    相关 API 请参考 [SetAudioDeviceVolume](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~ZegoExpressEngine#set-audio-device-volume), [GetAudioDeviceVolume](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~ZegoExpressEngine#get-audio-device-volume), [SetCaptureVolume](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~ZegoExpressEngine#set-capture-volume), [SetPlayVolume](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~ZegoExpressEngine#set-play-volume)

4. 支持对音频设备音量进行监控

    注意：仅 Windows 及 macOS 平台支持该功能。

    可以监控音频输入或输出设备的音量。

    相关 API 请参考 [StartAudioDeviceVolumeMonitor](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~ZegoExpressEngine#start-audio-device-volume-monitor), [StopAudioDeviceVolumeMonitor](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~ZegoExpressEngine#stop-audio-device-volume-monitor)

5. 支持对音频设备静音或取消静音

    注意：仅 Windows、macOS 及 Linux 平台支持该功能。

    可根据需要对音频输入或输出设备静音或取消静音。

    相关 API 请参考 [MuteAudioDevice](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~ZegoExpressEngine#mute-audio-device), [IsAudioDeviceMuted](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~ZegoExpressEngine#is-audio-device-muted)

6. 支持获取当前使用的音频设备信息

    注意：仅 Windows 和 macOS 平台支持该功能。

    调用 [GetCurrentAudioDevice] 接口，可以获取当前使用的音频设备信息，包括设备 ID 和设备名称，减少开发者的开发量。

    相关 API 请参考 [GetCurrentAudioDevice](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~ZegoExpressEngine#get-current-audio-device)

7. 支持摄像头关闭时推送静态图片

    关闭摄像头时，支持持续推送 JPEG/JPG、BMP 和 HEIF 格式的静态图片。例如，主播退后台的时候，会主动关闭摄像头，此时观众侧需要展示主播暂时离开的图片。

    初始化 SDK 后，关闭摄像头之前通过 [SetDummyCaptureImagePath] 接口设置所推静态图片的路径，开始正常推流后，调用 [EnableCamera] 接口关闭摄像头时会开始推静态图片，调用 [EnableCamera] 接口打开摄像头时会结束推静态图片。

    相关 API 请参考 [SetDummyCaptureImagePath](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~ZegoExpressEngine#set-dummy-capture-image-path)

8. 支持抛出 [SetDummyCaptureImagePath] 异常回调

    相关 API 请参考 [OnPublisherDummyCaptureImagePathError](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~IZegoEventHandler#on-publisher-dummy-capture-image-path-error)


9. 媒体播放器支持在本地缓存网络资源

    支持在本地缓存网络资源，如果需要播放同一个网络资源时，将优先使用缓存数据，提升用户体验。

    相关 API 请参考 [EnableLocalCache](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~ZegoMediaPlayer#enable-local-cache)

10. 在推流时，可以控制该流是否允许审核

    注意：若某条流设置为允许审核，如果开发者没有发起审核任务，这条流也不会被送审。

    当调用审核接口时，默认会对房间内的所有流进行审核。如果客户端要控制某条流不可以被送审，可以在调用 [StartPublishingStream] 接口开始推流时，将送审标识 [streamCensorFlag] 参数设置为 1（不允许）。

    相关 API 请参考 [StartPublishingStream](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~ZegoExpressEngine#start-publishing-stream), [ZegoPublisherConfig > StreamCensorFlag](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~struct~ZegoPublisherConfig#stream-censor-flag)



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

## 3.12.4 版本 <a id="3.12.4"></a>

**发布日期： 2024-01-18**

**新增功能**

1. 支持版权音乐插件

    注意：

1. 如需使用该功能，请联系 ZEGO 技术支持。

2. 版权音乐插件包无法单独使用，必须与 Express SDK 搭配使用。

    支持版权音乐功能插件化，当开发者的业务场景仅需更新版权音乐相关的代码时，可以单独集成插件包，无需更新 Express SDK，即可平滑迁移。

**问题修复**

1. 修复切换网络时，如果网络异常，极低概率下会出现 UI 卡顿的问题


---

## 3.12.3 版本 <a id="3.12.3"></a>

**发布日期： 2024-01-08**

**问题修复**

1. 修复 iOS 平台上调用 [EnableAudioCaptureDevice] 接口时偶现崩溃的问题


---

## 3.12.2 版本 <a id="3.12.2"></a>

**发布日期： 2024-01-04**

**问题修复**

1. 修复潜在问题


---

## 3.11.0 版本 <a id="3.11.0"></a>

**发布日期： 2023-12-13**

**新增功能**

1. 新增开启或关闭拉流对齐功能

    该功能常用于 KTV 等需要混流对齐的场景，当拉流端播放时，通过 [SetPlayStreamsAlignmentProperty](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~ZegoExpressEngine#set-play-streams-alignment-property) 接口控制播放的实时音视频流是否需要精准对齐。若需要，则拉取的所有流中包含精准对齐参数的会进行对齐；若不需要，则所有流都不对齐。

    相关 API 请参考 [SetPlayStreamsAlignmentProperty](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~ZegoExpressEngine#set-play-streams-alignment-property)

2. 所有网络请求支持 IPv6 协议

3. 混流支持输入直播协议流

    新增支持将直播流作为输入流，进行混流处理；直播输入流的 URL 支持 RTMP 和 HTTP-FLV 两种协议。该功能适用于将主播连麦的RTC 画面流与云端体育直播流、游戏直播画面流等进行混合，实现游戏或体育直播解说的场景中。

**改进优化**

1. 优化 AEC（回声消除）算法，实现更好的 AEC 效果

2. 优化网络连接策略，提升音视频通话体验

3. 优化 Android 平台前后台切换策略，解决某些特定场景或机型采集静音的问题

4. 优化多端登录逻辑

    用户在 A 设备上登录成功后，A 设备断网；然后使用同一 userID 在 B 设备上登录成功。此时如果 A 设备网络恢复，重连会失败，并抛出 1002086 错误码，提示该 userID 已在其他设备登录。


---

## 3.10.2 版本 <a id="3.10.2"></a>

**发布日期： 2023-11-20**


**问题修复**

1. 修复移动端休眠检测模块误报，影响到房间重登录、推拉流重试逻辑的问题



---

## 3.8.1 版本 <a id="3.8.1"></a>

**发布日期： 2023-08-17**

**新增功能**

1. 新增支持“智能云代理”模式

    注意：如需使用该功能，请联系 ZEGO 技术支持。

    开发者设置“智能云代理”模式后，在 RTC 或 L3 拉流时，会优先使用直连网络模式进行尝试。如果直连网络不可用、且当前是蜂窝网络，则继续留在直连模式重试；如果直连网络不可用、且当前是非蜂窝网络，则切到云代理模式，详情请参考 [云代理](https://doc-zh.zego.im/article/16996)。

2. 媒体播放器支持设置网络资源的 Http Headers

    媒体播放器支持设置网络资源的 Http Headers，开发者可基于该配置，自定义限定网络资源的访问方式，加强资源的安全防护。

    相关 API 请参考 [SetHttpHeader](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~ZegoMediaPlayer#set-http-header)


---

## 3.7.0 版本 <a id="3.7.0"></a>

**发布日期： 2023-07-18**

**新增功能**

1. 支持动态修改 AudioDeviceMode

    新增 [SetAudioDeviceMode](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~ZegoExpressEngine#set-audio-device-mode) 接口进行动态修改设备的音频模式，该配置决定设备的音量模式、前处理模式以及 Mic 占用逻辑，您可以根据具体场景进行选择，详情请参考 [如何设置音频设备模式 ZegoAudioDeviceMode？](http://doc-zh.zego.im/faq/AudioDeviceMod?product=ExpressVideo&platform=unity3d)

    相关 API 请参考 [SetAudioDeviceMode](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~ZegoExpressEngine#set-audio-device-mode)

2. 万人范围音视频、游戏语音支持配置 3D 音效距离的衰减范围

    在万人范围音视频、游戏语音场景中，支持设置 3D 音效距离的衰减范围区间 [min, max]。距离小于 min 时，音量不会随着距离的增加而衰减；距离大于 max 时，将无法听到对方的声音。

    相关 API 请参考 [SetReceiveRange](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~ZegoRangeSceneStream#set-receive-range), [SetAudioReceiveRange](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~ZegoRangeAudio#set-audio-receive-range)

**改进优化**

1. 支持在调用 [DestroyEngine] 接口后，生成日志上传任务

    相关 API 请参考 [SubmitLog](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~ZegoExpressEngine#submit-log)


---


## 3.4.2 版本 <a id="3.4.2"></a>

**发布日期： 2023-04-25**

**新增功能**

1. 支持开启系统声卡采集

    开启声卡采集后，可以将系统播放的声音混入推流中，如浏览器播放的声音、第三方播放器软件播放的声音等，并支持通过 [SetMixSystemPlayoutVolume](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~ZegoExpressEngine#set-mix-system-playout-volume) 设置采集音量。

    相关 API 请参考 [EnableMixSystemPlayout](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~struct~ZegoAudioSourceMixConfig#enable-mix-system-playout)、[SetMixSystemPlayoutVolume](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~ZegoExpressEngine#set-mix-system-playout-volume)

**问题修复**

1. 修复应用退出时，有可能崩溃的问题

**废弃删除**

1. 从 3.4.2 版本开始，废弃了对 iOS 11.0 以下版本的支持，iOS Deployment Target（最低支持版本）提升到 iOS 11.0

    具体说明，请参考 [App Store submission requirement starts April 25](https://developer.apple.com/news/?id=jd9wcyov) 及 [Xcode 14 Release Notes](https://developer.apple.com/documentation/xcode-release-notes/xcode-14-release-notes#Build-System)。

2. 从 3.4.2 版本开始，iOS SDK 不再支持 32 位 armv7 架构

    具体说明，请参考 [Xcode 14 Release Notes](https://developer.apple.com/documentation/xcode-release-notes/xcode-14-release-notes#Build-System)。



---

## 3.3.0 版本 <a id="3.3.0"></a>

**发布日期： 2023-03-24**


**新增功能**

1. 场景化音视频配置新增 `StandardVoiceCall` 标准语音通话场景
    场景化音视频配置新增 `StandardVoiceCall` 标准语音通话场景，适用于 1v1 纯语音通话场景，详情请参考 [场景化音视频配置](https://doc-zh.zego.im/article/16633)。

    相关 API 请参考 [SetRoomScenario](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~ZegoExpressEngine#set-room-scenario)


---

## 3.2.0 版本 <a id="3.2.0"></a>

**发布日期： 2023-02-01**


**改进优化**

1. 自定义信令配置支持扩展到 4KB

    注意：自定义信令配置默认大小为 1KB，如需扩展到 4KB，请联系 ZEGO 技术支持进行处理。


**问题修复**

1. 修复当硬件解码故障后重启时，访问空指针崩溃的问题


2. 修复当 iOS 14 启动引擎后，访问不存在的 API 时，导致崩溃的问题

3. 修复网络时间模块重试失败的问题



---

## 3.1.0 版本 <a id="3.1.0"></a>

**发布日期： 2022-12-13**


**新增功能**

1. “万人范围音视频”及“多人实时状态同步”功能支持使用场景模板

    注意：如需使用该功能，请联系 ZEGO 技术支持。

    虚拟场景中，由于每个场景的地图大小、音视频互动玩法及规模不同，需要针对每个场景进行自定义配置。3.1.0 版本后，“万人范围音视频”及“多人实时状态同步”支持通过 SDK 接口，并使用模板 ID 指定场景。模板 ID 对应的配置项只能通过服务器 API 进行配置，详情请参考 [服务端 API - 场景模版配置](/real-time-voice-server/api-reference/scene/set-scene-template)。

    相关 API 请参考 [templateID](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~struct~ZegoSceneParam#template-id)

2. “万人范围音视频”及“多人实时状态同步”功能支持使用 Token 基础鉴权

    注意：如需使用该功能，请联系 ZEGO 技术支持。

    用户在登录场景时，可以带上 Token 参数，以验证合法性。

    相关 API 请参考 [ZegoSceneParam > token](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~struct~ZegoSceneParam#token), [ZegoRangeScene > RenewToken](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~ZegoRangeScene#renew-token)



3. SDK 支持设置云代理

    注意：如需使用该功能，请联系 ZEGO 技术支持。

    通过设置 SDK 的云代理接口，将 SDK 对应的所有流量通过云端的代理服务器进行中转，实现与 RTC 通信，详情请参考  [云代理](https://doc-zh.zego.im/article/16996) 。

    相关 API 请参考 [SetCloudProxyConfig](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~ZegoExpressEngine#set-cloud-proxy-config)




---

## 3.0.3 版本 <a id="3.0.3"></a>

**发布日期：2022-11-29**

**新增功能**

1. 支持 Linux 平台

    Express Unity3D SDK 现已支持 Linux x86_64 架构，开发环境要求，请参考 [集成 SDK](/real-time-video-u3d-cs/quick-start/integrating-sdk)。

**问题修复**


1. 修复 iOS、macOS、Windows 平台硬件解码可能会崩溃的问题

2. 修复多房间模式下，停止推流时，房间内其他人收不到流删除通知的问题



---

## 3.0.0 版本 <a id="3.0.0"></a>

**发布日期：2022.11.01**

<Warning title="注意">


本次更新包含不兼容改动，详情请参考 [v3.0.0 升级指南](https://doc-zh.zego.im/article/16629)。

</Warning>



**新增功能**

1. 支持查询当前 SDK 具备的功能特性

    由于 SDK 支持特性裁包，部分特性可能已被裁剪；可以使用此函数快速判断当前 SDK 是否支持指定的功能特性。

    相关 API 请参考 [IsFeatureSupported](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~ZegoExpressEngine#is-feature-supported)

2. 新增房间维度的场景 Scenario

    为方便开发者快速接入，降低开发者接入门槛，SDK 提供多种预设场景。开发者可根据所需场景，选择对应的房间模式 [ZegoScenario](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~enum~ZegoScenario)，SDK 将自动应用适合该场景的音视频编解码器、音视频参数、流控策略等配置，从而快速实现该场景下的最佳效果。

    当前支持场景包括秀场直播、KTV、标准 1v1 音视频通话、高画质 1v1 音视频通话、标准语聊房、高音质语聊房，详情请参考 [场景化音视频配置](https://doc-zh.zego.im/article/16633)。

    相关 API 请参考 [SetRoomScenario](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~ZegoExpressEngine#set-room-scenario)

3. 新增调试助手功能

    注意：该功能仅在开发阶段使用，请勿在线上版本开启此功能。

    新增 [EnableDebugAssistant](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~ZegoExpressEngine#enable-debug-assistant) 接口，开发者调用该接口开启调试助手功能，SDK 将会打印日志到控制台，并且在 SDK 其他接口的调用出现异常时，UI 会弹窗提示错误。

    相关 API 请参考 [EnableDebugAssistant](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~ZegoExpressEngine#enable-debug-assistant)


    ** 问题修复**

4. 修复退出 App 时小概率崩溃的问题；

**废弃删除**

1. 废弃了 [ZegoScenario](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~enum~ZegoScenario) 的三种旧版本场景

    废弃 [ZegoScenario](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~enum~ZegoScenario) 场景枚举中的 [General]，[Communication]， [Live] 三种场景，详情请参考 [场景化音视频配置](https://doc-zh.zego.im/article/16633)。

2. 删除了 [SetDebugVerbose]、[SetPlayStreamVideoLayer]、[EnableAudioDataCallback] 等接口，详情请参考 [3.0.0 版本升级指南](https://doc-zh.zego.im/article/16629)。



---

## 2.23.0 版本 <a id="2.23.0"></a>

**发布日期：2022.09.13**



**问题修复**


1. 修复范围语音功能在退出小队后，在范围距离外还能听到原小队内的人的声音的问题


---



## 2.21.2 版本 <a id="2.21.2"></a>

**发布日期：2022.08.02**

---
## 2.21.1 版本 <a id="2.21.1"></a>

**发布日期：2022.07.15**

**新增功能**

1. 拉流接口增加 CDN Plus 拉流配置项

    注意：若希望通过地区、用户等更多维度，从云端控制拉流方式，请联系 ZEGO 技术支持进行相关配置。

    拉流接口新增 CDN_PLUS 的拉流资源模式（[ZegoStreamResourceMode](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~enum~ZegoStreamResourceMode)），开发者可按流维度自行开启使用CDN_PLUS 拉流。CDN Plus 拉流是比 CDN 拉流直播质量更高，但是价格接近 CDN 的一种性价比高的拉流方式，详情请参考 [CDN Plus 拉流](/live-streaming-android/introduction/overview)。

    相关 API 请参考 [StartPlayingStream](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~ZegoExpressEngine#start-playing-stream)

**问题修复**

1. 修复了 [DestroyEngine](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~ZegoExpressEngine#destroy-engine) 可能导致 Unity Editor 闪退的问题

2. 修复了应用退出过程中触发 SDK 回调可能导致崩溃的问题


---

## 2.20.3 版本 <a id="2.20.3"></a>

**发布日期：2022.07.01**

**新增功能**

1. 新增音频数据监测功能

    当开发者需要获取远端用户的音频数据或者需要获取本地麦克风采集到的数据另做他用（例如纯音频录制、纯音频第三方监控、纯音频实时分析）时，可调用 [StartAudioDataObserver](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~ZegoExpressEngine#start-audio-data-observer) 接口开启实时音频数据监测。

    相关 API 请参考 [StartAudioDataObserver](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~ZegoExpressEngine#start-audio-data-observer)，[StopAudioDataObserver](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~ZegoExpressEngine#stop-audio-data-observer)，[OnCapturedAudioData](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~IZegoEventHandler#on-captured-audio-data)，[OnPlayerAudioData](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~IZegoEventHandler#on-player-audio-data)，[OnPlaybackAudioData](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~IZegoEventHandler#on-playback-audio-data)，[OnMixedAudioData](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~IZegoEventHandler#on-mixed-audio-data)


---

## 2.20.2 版本 <a id="2.20.2"></a>

**发布日期：2022.06.20**

**问题修复**

1. 修复了一个概率性拉流失败的问题

2. 修复了在初始化 SDK 前，设置音频设备模式不生效的问题


---

## 2.20.0 版本 <a id="2.20.0"></a>

**发布日期：2022-06-13**

**新增功能**

1. 支持设置流级别的音视频自动审核

    注意：如需使用该功能，请联系 ZEGO 技术支持开通后台服务。

    在调用 [StartPublishingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoExpressEngine#start-publishing-stream-2) 接口开始推流时，开发者可以设置 [ZegoStreamCensorshipMode](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~enum~ZegoStreamCensorshipMode) 参数，进行流级别的音视频自动审核，包含如涉黄、涉政等审核类型，以此降低开发者的接入难度和业务维护成本。

    相关 API 请参考 [StartPublishingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoExpressEngine#start-publishing-stream-2)

**改进优化**

1. 优化了混流精准对齐的接口调用逻辑

    调用 [StartPublishingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoExpressEngine#start-publishing-stream-2) 接口且将 [ZegoPublisherConfig](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~struct~ZegoPublisherConfig) 中的 [forceSynchronousNetworkTime](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~struct~ZegoPublisherConfig#force-synchronous-network-time) 值设置为 1，则 SDK 内部会等到 [OnNetworkTimeSynchronized](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~IZegoEventHandler#on-network-time-synchronized) 回调通知 NTP 网络时间同步完成后再推流，此时再调用 [SetStreamAlignmentProperty](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~ZegoExpressEngine#set-stream-alignment-property) 接口开启混流精准对齐功能。

    相关 API 请参考 [StartPublishingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoExpressEngine#start-publishing-stream-2), [SetStreamAlignmentProperty](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~ZegoExpressEngine#set-stream-alignment-property), [OnNetworkTimeSynchronized](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~IZegoEventHandler#on-network-time-synchronized)

**问题修复**

1. 修复了在 32 位 Android 手机上少量接口报错的问题

    相关接口如下：[LoadResourceFromMediaData](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~ZegoMediaPlayer#load-resource-from-media-data)，[LoadResourceWithPosition](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~ZegoMediaPlayer#load-resource-with-position)，[LoadCopyrightedMusicResourceWithPosition](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~ZegoMediaPlayer#load-copyrighted-music-resource-with-position)


---


## 2.19.0 版本 <a id="2.19.0"></a>

**发布日期：2022-05-18**

**新增功能**

1. 支持返回登录房间和退出房间结果

    [loginRoom] 接口新增 “callback” 参数，支持从 “callback“ 返回登录房间结果。

    [logoutRoom] 接口新增 “callback” 参数，支持从 “callback“ 返回退出房间结果。

    相关 API 请参考 [LoginRoom](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~ZegoExpressEngine#login-room), [LogoutRoom](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~ZegoExpressEngine#logout-room)

2. 新增房间状态变化通知 [onRoomStateChanged]

    当房间的连接状态发生变化时会触发 [onRoomStateChanged] 回调，通过 “ZegoRoomStateChangedReason” 参数提供更加详细的连接状态及状态变化原因。

    相关 API 请参考 [OnRoomStateChanged](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~IZegoEventHandler#on-room-state-changed)


3. 新增开启人声检测功能以及人声部分的声浪回调

    开发者在监听声浪回调时，往往只关注人声部分，可调用 [StartSoundLevelMonitor](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~ZegoExpressEngine#start-sound-level-monitor) 接口，传入 “ZegoSoundLevelConfig”，开启 VAD 人声检测。

    SDK 在本地采集声浪回调 [OnCapturedSoundLevelInfoUpdate](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~IZegoEventHandler#on-captured-sound-level-info-update)、远端音频声浪回调 [OnRemoteSoundLevelInfoUpdate](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~IZegoEventHandler#on-remote-sound-level-info-update) 中也新增是否包含人声检测的参数。

    相关 API 请参考 [StartSoundLevelMonitor](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~ZegoExpressEngine#start-sound-level-monitor), [OnCapturedSoundLevelInfoUpdate](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~IZegoEventHandler#on-captured-sound-level-info-update), [OnRemoteSoundLevelInfoUpdate](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~IZegoEventHandler#on-remote-sound-level-info-update)

4. 支持获取本端和远端的上下行网络质量

    新增本地和远端用户的上下行网络质量回调 [OnNetworkQuality](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~IZegoEventHandler#on-network-quality)，默认每两秒回调一次本地和每个拉取的远端用户的网络状况（包括未知、优秀、良好、中等、较差、网络断线）。当开发者希望分析链路上的网络情况，或想要了解本地和远端用户的网络状况时可以使用该功能。

    相关 API 请参考 [OnNetworkQuality](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~IZegoEventHandler#on-network-quality)


5. 支持设置触发流量控制的关注因素

    当通过 [EnableTrafficControl](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~ZegoExpressEngine#enable-traffic-control) 接口开启了指定推流通道的流量控制后，可通过 [SetTrafficControlFocusOn](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~ZegoExpressEngine#set-traffic-control-focus-on) 接口控制是否因为远端网络状况差而启动流量控制。

    相关 API 请参考 [SetTrafficControlFocusOn](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~ZegoExpressEngine#set-traffic-control-focus-on)

6. 直推 CDN 的流支持通过 L3 拉流

    直推 CDN 时，在不改变推流方式的情况下，SDK 从客户的 CDN 源站拉流，通过 L3 将音视频内容分发给观众，通过 [ZegoResourceType](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~enum~ZegoResourceType) 控制源站资源。该功能常用于直播场景。

    相关 API 请参考 [StartPlayingStream](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~ZegoExpressEngine#start-playing-stream)

**问题修复**

1. 修复了从 CDN 拉流失败的问题


---


## 2.18.0 版本 <a id="2.18.0"></a>

**发布日期：2022-04-19**

**新增功能**

1. 新增媒体播放器功能

    媒体播放器组件提供播放音视频媒体文件的能力，并且支持将播放的媒体文件的音画数据推流出去。

    相关 API 请参考 [CreateMediaPlayer](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~ZegoExpressEngine#create-media-player), [DestroyMediaPlayer](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~ZegoExpressEngine#destroy-media-player)


2. 新增自动混流功能

    SDK 可以指定房间，由 ZEGO 实时音视频服务器自动将房间内的所有音频流进行混流（目前只支持混音频流），常用于纯语聊场景。

    可以调用 [StartAutoMixerTask|\_blank](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~ZegoExpressEngine#start-auto-mixer-task) 接口开启自动混流，调用 [StopAutoMixerTask|\_blank](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~ZegoExpressEngine#stop-auto-mixer-task) 接口关闭自动混流。

    相关 API 请参考 [StartAutoMixerTask|\_blank](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~ZegoExpressEngine#start-auto-mixer-task), [StopAutoMixerTask|\_blank](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~ZegoExpressEngine#stop-auto-mixer-task)

3. 支持获取同步网络时间信息

    调用 [GetNetworkTimeInfo|\_blank](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~ZegoExpressEngine#get-network-time-info) 接口可以获取当前网络时间（NTP），包括当前网络时间的时间戳和最大误差。在进行多端行为同步时，需要获取同步网络时间对当前时间进行校准。

    相关 API 请参考 [GetNetworkTimeInfo|\_blank](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~ZegoExpressEngine#get-network-time-info)

4. 支持混流精准对齐功能

    调用 [SetStreamAlignmentProperty|\_blank](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~ZegoExpressEngine#set-stream-alignment-property) 接口可以开启或关闭混流精准对齐功能，常用于 KTV 等需要混流对齐的场景。

    相关 API 请参考 [SetStreamAlignmentProperty|\_blank](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~ZegoExpressEngine#set-stream-alignment-property)

**问题修复**

1. 修复了日志上报时，日志文件收集异常的问题

2. 修复了部分 Android 手机的回声消除问题


---

## 2.17.1 版本 <a id="2.17.1"></a>

**发布日期：2022-03-30**
**问题修复**

1. 修复了 iOS 平台 SDK 库打包格式不兼容 Plugins，导致导出 XCode 工程错误的问题

    已将 iOS 平台 SDK 库格式改为 Plugins 兼容的 framework 格式。


---

## 2.17.0 版本 <a id="2.17.0"></a>

**发布日期：2022-03-18**

**改进优化**

1. 优化了鉴权方式

    2.17.0 及以上版本，在创建引擎时将 AppSign 传空或不传，并且在登录房间时必须传入 Token，鉴权通过后即可使用实时音视频功能，具体请参考 [使用 Token 鉴权](/real-time-video-u3d-cs/communication/using-token-authentication)。

    2.17.0 之前版本，在创建引擎时传入 AppSign，鉴权通过后即可使用实时音视频功能。

    相关 API 请参考 [CreateEngine](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~ZegoExpressEngine#create-engine), [LoginRoom](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~ZegoExpressEngine#login-room)

**问题修复**

1. 修复了游戏语音中切换房间导致崩溃的问题

    修复了开启游戏语音后调用 [SwitchRoom](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~ZegoExpressEngine#switch-room) 接口导致崩溃的问题。


---

## 2.16.0 版本 <a id="2.16.0"></a>

**发布日期：2022-02-25**

**新增功能**

1. 新增登录房间和用户房间内推流鉴权功能

    用户权限控制指的是用户登录房间，或是在房间内进行推/拉流等操作时，ZEGO 服务端根据用户登录时携带的 Token 参数，判断用户是否有对应的权限，避免因权限控制缺失或操作不当引发的风险问题。 目前仅支持用户登录房间和用户房间内推流两个权限的校验。

    相关 API 请参考 [LoginRoom](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~ZegoExpressEngine#login-room), [RenewToken](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~ZegoExpressEngine#renew-token), [onRoomTokenWillExpire](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~IZegoEventHandler#on-room-token-will-expire)

2. 新增混响高级参数和混响/变声的预设值

    通过混响高级参数可以根据需要调节更精细的混响效果，并在原有预设混响中新增了录音室、KTV、摇滚、演唱会等效果，在预设变声中新增了磁性男和清新女音效，增加实时语音趣味性，能够适应更多的场景。

    相关 API 请参考 [SetVoiceChangerParam](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~ZegoExpressEngine#set-voice-changer-param), [SetReverbPreset](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~ZegoExpressEngine#set-reverb-preset), [SetVoiceChangerPreset](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~ZegoExpressEngine#set-voice-changer-preset), [SetVoiceChangerParam](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~ZegoExpressEngine#set-voice-changer-param)

3. 支持设置混响回声参数

    用户可以根据需要设置混响回声参数，最多允许设置 7 次回声 (delay)，并支持单独设置每个回声的延迟、衰减，以及整体的输入输出增益值。也可以搭配变声、混响以实现自定义各式各样的声音效果。

    相关 API 请参考 [SetReverbEchoParam](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~ZegoExpressEngine#set-reverb-echo-param)

4. 新增空间音频能力

    空间音频能够感知空间内 360° 的声音位置。开发者可以通过空间音频功能在音视频房间内营造更逼真的“座位”效果，用户可以通过空间音频感知声音的来源方向，还原线下场景。适用于语聊房、剧本杀和线上会议等场景。

    相关 API 请参考 [EnablePlayStreamVirtualStereo](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~ZegoExpressEngine#enable-play-stream-virtual-stereo)

5. 支持全方位虚拟立体声

    新增支持全方位虚拟立体声，将单声道的声音，通过算法处理，模拟成立体感的声音。该功能常用于 KTV 场景中，可以使唱歌的声音更加有立体感。

    当调用 [EnableVirtualStereo] 接口，将 angle 参数设置为 -1 时，表示立体声效果为全方位立体声。

    相关 API 请参考 [EnableVirtualStereo](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~ZegoExpressEngine#enable-virtual-stereo)

6. 设置拉流优先级的权重

    当开发者需要对某流优先保证质量时，可使用 [SetPlayStreamFocusOn] 接口。例如：上课场景，学生拉多路流，则可设置老师流高优先级。

    相关 API 请参考 [SetPlayStreamFocusOn](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~ZegoExpressEngine#set-play-stream-focus-on)

7. 支持获取当前音频路由

    音频路由是指 App 在播放音频时使用的音频输出设备，常见的音频路由有：扬声器、听筒、耳机、蓝牙设备等。开发者可以调用 [GetAudioRouteType] 接口获取当前音频路由。

    相关 API 请参考 [GetAudioRouteType](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~ZegoExpressEngine#get-audio-route-type)

8. 音效播放器新增支持设置变声效果

    通过改变用户的音调，使输出的声音在感官上与原始声音不同，实现男声变女生等多种效果。

    相关 API 请参考 [SetVoiceChangerParam](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~ZegoExpressEngine#set-voice-changer-param)

9. 支持回调远端扬声器设备状态

    与远端用户连麦成功后，当远端扬声器设备状态发生变更时，例如开/关扬声器，可以通过 [OnRemoteSpeakerStateUpdate] 回调监听。

    相关 API 请参考 [OnRemoteSpeakerStateUpdate](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~IZegoEventHandler#on-remote-speaker-state-update)

10. 新增音频设备路由变更通知回调 [OnLocalDeviceExceptionOccurred]

    当有耳机插拔、扬声器和听筒切换等音频路由发生变化时会抛出此回调。

    相关 API 请参考 [OnAudioRouteChange](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~IZegoEventHandler#on-audio-route-change)

11. 新增本地设备异常回调 [OnLocalDeviceExceptionOccurred]

    通过 [OnLocalDeviceExceptionOccurred] 回调可以设置要检测的设备类型，如摄像头、扬声器、麦克风等，开发者可以根据不同设备类型的错误回调进行相应的处理。

    相关 API 请参考 [OnLocalDeviceExceptionOccurred](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~IZegoEventHandler#on-local-device-exception-occurred)

12. 支持设置音频路由到扬声器

    通过 [SetAudioRouteToSpeaker] 可以设置音频路由到扬声器，当选择不使用内置扬声器播放声音时，即设为 “false” 时，SDK 会根据系统调度选择当前优先级最高的音频输出设备播放声音。

    相关 API 请参考 [SetAudioRouteToSpeaker](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~ZegoExpressEngine#set-audio-route-to-speaker)

13. 支持设置拉流缓存区间值

    该功能用于指定播放缓存自适应调整的区间范围，开发者可根据场景进行设置。

    相关 API 请参考 [SetPlayStreamBufferIntervalRange](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~ZegoExpressEngine#set-play-stream-buffer-interval-range)

14. 拉流端提供关闭所有音频或视频的功能

    当拉流时需要一次性关闭所有远端用户的音频或视频流时，可通过该功能实现。

    相关 API 请参考 [MuteAllPlayStreamAudio](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~ZegoExpressEngine#mute-all-play-stream-audio), MuteAllPlayStreamVideo


15. 新增本地预览首帧渲染回调

    第一帧视频数据被渲染完之后会收到 [OnPublisherRenderVideoFirstFrame] 回调。

    相关 API 请参考 OnPublisherRenderVideoFirstFrame

16. 支持设置所有拉流声音大小

    本端用户可以通过 [SetAllPlayStreamVolume] 接口控制所有音频流的播放音量。

    相关 API 请参考 [SetAllPlayStreamVolume](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~ZegoExpressEngine#set-all-play-stream-volume)

17. 支持通过 [OnApiCalledResult] 委托函数获取到 ZEGO SDK 方法执行结果的详细信息

    相关 API 请参考 [OnApiCalledResult](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~IZegoEventHandler#on-api-called-result)


**废弃删除**

1. 废弃 [SetBuiltInSpeakerOn] 接口

    因为命名规范问题，在 2.16.0 及以上版本废弃 [SetBuiltInSpeakerOn] 接口，请使用 [SetAudioRouteToSpeaker] 来实现原来的功能。

    相关 API 请参考 [SetAudioRouteToSpeaker](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~ZegoExpressEngine#set-audio-route-to-speaker)

2. 废弃 [OnDeviceError] 回调

    为了让开发者直观的了解出现异常的设备类型以及具体的异常情况，在 2.16.0 及以上版本废弃了 [OnDeviceError] 回调，请使用 [OnLocalDeviceExceptionOccurred] 回调代替。

    相关 API 请参考 OnDeviceError,[OnLocalDeviceExceptionOccurred](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~IZegoEventHandler#on-local-device-exception-occurred)


---



## 2.15.3 版本 <a id="2.15.3"></a>

**发布日期：2022-02-18**

**新增功能**

1. 游戏语音支持设置隐秘小队模式

    [ZegoRangeAudioMode] 枚举新增隐秘小队 SecretTeam，本地用户可以根据需要，在初始化游戏语音 [CreateRangeAudio] 之后，通过 [SetRangeAudioMode] 接口设置隐秘小队模式。该小队模式下，小队成员可以接收到世界模式用户的语音。

    相关 API 请参考[CreateRangeAudio](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~ZegoExpressEngine#create-range-audio), [SetRangeAudioMode](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~ZegoRangeAudio#set-range-audio-mode)


---


## 2.15.2 版本 <a id="2.15.2"></a>

**发布日期：2022-01-05**

**新增功能**

1. 新增试验性 API

    新增 [CallExperimentalAPI] 接口，ZEGO 通过此 API 提供 RTC 业务中的部分技术预览或特别定制功能，需要获取功能的使用或详情其详情可咨询 ZEGO 技术支持。
    新增 [onRecvExperimentalAPI] 回调委托，用于接收试验性 API JSON 内容。

    相关 API 请参考 [CallExperimentalAPI](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~ZegoExpressEngine#call-experimental-api), [onRecvExperimentalAPI](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~IZegoEventHandler#on-recv-experimental-api)

---
## 2.15.1 版本 <a id="2.15.1"></a>

**发布日期：2021-12-24**

**新增功能**

1. 游戏语音支持设置是否接收指定用户的音频数据


    游戏语音模块新增 [MuteUser] 接口，本地用户可以根据需要，在初始化游戏语音 [CreateRangeAudio] 之后，通过 [MuteUser] 接口设置是否接收指定远端用户的音频数据。不接收时，可降低硬件和网络的开销。

    当开发者需要快速关闭或恢复远端音频时可以使用该功能。

    相关 API 请参考 [MuteUser](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~ZegoRangeAudio#mute-user)

**问题修复**

1. 修复了设置引擎进阶配置失败的问题

    修复了 [SetEngineConfig] 接口中 “advancedConfig” 配置不生效的问题。


---


## 2.15.0 版本 <a id="2.15.0"></a>

**发布日期：2021-12-17**

**新增功能**

1. 支持游戏语音功能

    新增游戏语音功能模块，可提供范围语音、3D音效、小队语音等功能。适用于吃鸡类游戏、元宇宙类场景。

    范围语音：房间内的收听者对音频的接收距离有范围限制，若发声者与自己的距离超过该范围，则无法听到声音。为保证语音清晰，附近超过 20 人发声时，只能听到离自己最近的 20 个发声者的声音。

    3D音效：声音有 3D 空间感且按距离衰减。

    小队语音：玩家可以选择加入小队，并支持在房间内自由切换“全世界”模式和“仅小队”模式。

    相关 API 请参考 [CreateRangeAudio](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~ZegoExpressEngine#create-range-audio), [DestroyRangeAudio](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~ZegoExpressEngine#destroy-range-audio), [SetAudioReceiveRange](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~ZegoRangeAudio#set-audio-receive-range), [UpdateSelfPosition](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~ZegoRangeAudio#update-self-position), [UpdateAudioSource](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~ZegoRangeAudio#update-audio-source), [EnableSpatializer](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~ZegoRangeAudio#enable-spatializer), [EnableMicrophone](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~ZegoRangeAudio#enable-microphone), [EnableSpeaker](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~ZegoRangeAudio#enable-speaker), [SetRangeAudioMode](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~ZegoRangeAudio#set-range-audio-mode), [SetTeamID](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~ZegoRangeAudio#set-team-id)

**改进优化**

1. 支持设置特定通道的音频配置

    优化了 [SetAudioConfig] 接口，新增可选参数 “ZegoPublishChannel”，可指定通道号进行音频配置。

    相关 API 请参考 [SetAudioConfig](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~ZegoExpressEngine#set-audio-config)

2. 拉流质量回调增加音频质量参数

    [onPlayerQualityUpdate] 回调增加 mos 参数，表示当前音频质量情况。

    相关 API 请参考 [onPlayerQualityUpdate](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~IZegoEventHandler#on-player-quality-update)

**问题修复**

1. 修复了部分接口字符串拷贝错误的问题


---


## 1.2.0 版本 <a id="1.2.0"></a>

**发布日期：2021-11-29**

**问题修复**

1. 同步最新 Native 层的 SDK 接口定义，修复了混流参数错误的问题


