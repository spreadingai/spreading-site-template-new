# 发布日志

- - -


## 3.21.0 版本 <a id="3.21.0"></a>

**发布日期： 2025-06-23**

**新增功能**

1. 支持 Web 项目设置 SEI 类型、能力检测、设置日志等级功能

    相关 API 请参考 [SetSEIConfig](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoExpressEngine#set-sei-config)、[CheckSystemRequirements](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoExpressEngine#check-system-requirements)、[SetLogConfig](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoExpressEngine#set-log-config)

2. 支持 Web 项目监听本地设备异常通知、设备状态变更事件回调

    相关 API 请参考 [OnLocalDeviceExceptionOccurred](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~IZegoEventHandler#on-local-device-exception-occurred)、[OnVideoDeviceStateChanged](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~IZegoEventHandler#on-video-device-state-changed)、[OnAudioDeviceStateChanged](/live-streaming-u3d/client-sdk/onaudiodevicestatechanged)。

3. 支持 Web 项目配置卡拉 OK 场景

    支持在 Web 项目使用适用于卡拉 OK 场景 [Karaoke](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~enum~ZegoScenario#zego-scenario-karaoke) 的音视频配置，适用于实时合唱、在线 K 歌场景，对延迟、音质、耳返、回声消除等进行了优化，同时还保障了多人合唱时的精准对齐和超低时延。详情请参考 [场景化音视频配置](/live-streaming-u3d/quick-start/scenario-based-audio-video-configuration)。

    相关 API 请参考 [SetRoomScenario](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoExpressEngine#set-room-scenario)

**改进优化**

1. 更新集成 Express Native SDK 至 3.21.0 版本。
2. 更新集成 Express Web SDK 至 3.9.0 版本。

**问题修复**

<Note title="说明">

以下问题修复仅适用于 Web 平台接口。
</Note>

1. 修复集成 SDK 后编译报错的问题
2. 修复 Unity WebGL 其他已知问题。

---

## 3.19.0 版本 <a id="3.19.0"></a>

**发布日期： 2025-02-14**

**新增功能**

1. 支持针对媒体播放器输出的声音内容，开启变声效果

    媒体播放器新增 [EnableVoiceChanger] 接口 ，支持针对媒体播放器输出的声音内容开启变声效果，同时选择需要的变调音效。

    相关 API 请参考 [ZegoMediaPlayer > EnableVoiceChanger](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoMediaPlayer#enable-voice-changer)

2. 支持将混流后的输出流加入到目标房间

    混流功能支持将混流后的输出流，加入到指定房间，即支持设置输出流的目标房间信息（[targetRoom](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~struct~ZegoMixerOutput#target-room)）。每条输出流只支持加入一个房间，且一旦添加，混流过程中不支持动态更新房间。如需使用服务端接口实现该功能，可参考 [开始混流](/live-streaming-server/api-reference/stream-mixing/start-mix) 文档。

**改进优化**

1. 更新集成 Express Native SDK 至 3.19.0 版本。


---

## 3.16.2 版本 <a id="3.16.2"></a>

**发布日期： 2024-08-19**

**新增功能**

1. 支持在图片资源校验失败时，依然正常发起混流任务

    ZegoMixerTask 新增参数 mixImageCheckMode，用于控制背景图（backgroundImageURL）、输入流占位图（inputList.imageInfo.url）、水印图片（watermark.imageURL）等图片资源校验失败时，能否正常发起混流任务。

    该功能默认不开启（mixImageCheckMode 默认取值为 0），表示严格执行图片校验，即必须满足参数原有的 “支持协议和格式”、“图片大小”、“图片资源请求成功” 等规则，才能正常发起混流任务。

    ZEGO 服务端 API 混流接口此前已支持该功能，详情请参考 [开始混流](/live-streaming-server/api-reference/stream-mixing/start-mix) 的 CheckImageMode 参数。

    相关 API 请参考 [StartMixerTask](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoExpressEngine#start-mixer-task)

2. 新增电音音效

    电音音效指的是可以让人说话、唱歌的声音，经过处理后带有电音的效果。该功能常用于KTV、语聊房场景。

    在 [CreateEngine] 初始化 SDK 之前，调用 [SetElectronicEffects] 接口可以开启电音音效，并可根据需要设置不同模式的电音调式以及对应调式的起始音高。未调用此接口时，默认关闭电音音效。

    开发者也可以通过 [SetVoiceChangerPreset] 接口预设常见的电音音效，目前支持预设 C 大调电音音效、A 小调电音音效、和声小调电音音效。

    相关 API 请参考 [SetElectronicEffects](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoExpressEngine#set-electronic-effects)

3. 新增音效均衡器（EQ）

    支持调整 10 个频带的增益值，从而达到调整音色的目的。

    相关 API 请参考 [SetAudioEqualizerGain](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoExpressEngine#set-audio-equalizer-gain)

4. 新增支持设置和获取音频设备音量

    注意：仅 Windows、macOS 及 Linux 支持该功能。

    支持通过 [SetAudioDeviceVolume] 接口设置音频设备（扬声器或麦克风）的采集音量后再推拉流，但由于系统限制可能导致此接口调用失败，推荐直接使用 [SetCaptureVolume] 和 [SetPlayVolume] 接口来调节推拉流音量。

    相关 API 请参考 [SetAudioDeviceVolume](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoExpressEngine#set-audio-device-volume), [GetAudioDeviceVolume](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoExpressEngine#get-audio-device-volume), [SetCaptureVolume](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoExpressEngine#set-capture-volume), [SetPlayVolume](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoExpressEngine#set-play-volume)

5. 支持对音频设备音量进行监控

    注意：仅 Windows 及 macOS 平台支持该功能。

    可以监控音频输入或输出设备的音量。

    相关 API 请参考 [StartAudioDeviceVolumeMonitor](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoExpressEngine#start-audio-device-volume-monitor), [StopAudioDeviceVolumeMonitor](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoExpressEngine#stop-audio-device-volume-monitor)

6. 支持对音频设备静音或取消静音

    注意：仅 Windows、macOS 及 Linux 平台支持该功能。

    可根据需要对音频输入或输出设备静音或取消静音。

    相关 API 请参考 [MuteAudioDevice](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoExpressEngine#mute-audio-device), [IsAudioDeviceMuted](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoExpressEngine#is-audio-device-muted)

7. 支持获取当前使用的音频设备信息

    注意：仅 Windows 和 macOS 平台支持该功能。

    调用 [GetCurrentAudioDevice] 接口，可以获取当前使用的音频设备信息，包括设备 ID 和设备名称，减少开发者的开发量。

    相关 API 请参考 [GetCurrentAudioDevice](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoExpressEngine#get-current-audio-device)

8. 支持摄像头关闭时推送静态图片

    关闭摄像头时，支持持续推送 JPEG/JPG、BMP 和 HEIF 格式的静态图片。例如，主播退后台的时候，会主动关闭摄像头，此时观众侧需要展示主播暂时离开的图片。

    初始化 SDK 后，关闭摄像头之前通过 [SetDummyCaptureImagePath] 接口设置所推静态图片的路径，开始正常推流后，调用 [EnableCamera] 接口关闭摄像头时会开始推静态图片，调用 [EnableCamera] 接口打开摄像头时会结束推静态图片。

    相关 API 请参考 [SetDummyCaptureImagePath](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoExpressEngine#set-dummy-capture-image-path)

9. 支持抛出 [SetDummyCaptureImagePath] 异常回调

    相关 API 请参考 [OnPublisherDummyCaptureImagePathError](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~IZegoEventHandler#on-publisher-dummy-capture-image-path-error)


10. 媒体播放器支持在本地缓存网络资源

    支持在本地缓存网络资源，如果需要播放同一个网络资源时，将优先使用缓存数据，提升用户体验。

    相关 API 请参考 [EnableLocalCache](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoMediaPlayer#enable-local-cache)

11. 在推流时，可以控制该流是否允许审核

    注意：若某条流设置为允许审核，如果开发者没有发起审核任务，这条流也不会被送审。

    当调用审核接口时，默认会对房间内的所有流进行审核。如果客户端要控制某条流不可以被送审，可以在调用 [StartPublishingStream] 接口开始推流时，将送审标识 [streamCensorFlag] 参数设置为 1（不允许）。

    相关 API 请参考 [StartPublishingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoExpressEngine#start-publishing-stream), [ZegoPublisherConfig > StreamCensorFlag](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~struct~ZegoPublisherConfig#stream-censor-flag)


12. H.265 客户端编码自动兼容策略新增用户级的协商范围

    注意：如需使用该功能，请联系 ZEGO 技术支持。

    控制本端客户端编码兼容范围为房间内所有推流用户或所有用户，即当指定范围内存在用户不支持 H.265 时，本端客户端编码动态回退。

    相关 API 请参考 [LoginRoom](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoExpressEngine#login-room), [StartPublishingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoExpressEngine#start-publishing-stream), [ZegoPublisherConfig > codecNegotiationType](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~struct~ZegoPublisherConfig#codec-negotiation-type), [ZegoRoomConfig > capabilityNegotiationTypes](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~struct~ZegoRoomConfig#capability-negotiation-types)



**改进优化**

1. 优化了基础美颜功能

    ZEGO 提供了全新的基础美颜功能，为用户呈现出良好的肌肤状态，打造自然的美颜效果。开发者需要在推流前先调用 [StartEffectsEnv] 接口初始化美颜环境，然后调用 [EnableEffectsBeauty] 接口开启美颜功能。通过 [SetEffectsBeautyParam] 接口可以按需调整美白、磨皮、锐化以及红润的程度，实现基础美颜能力。

    该功能常用于视频通话、直播等场景。

    相关 API 请参考 [StartEffectsEnv](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoExpressEngine#start-effects-env), [StopEffectsEnv](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoExpressEngine#stop-effects-env), [EnableEffectsBeauty](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoExpressEngine#enable-effects-beauty), [SetEffectsBeautyParam](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoExpressEngine#set-effects-beauty-param)

2. 优化 Android 平台视频渲染功能

    Android 平台视频渲染优先使用 SurfaceTexure 渲染。


**废弃删除**

1. 废弃拉流接口中关于 CDN Plus 的配置

    下架畅直播概念，废弃 CDN Plus 直播相关接口。如需实现直播功能，推荐使用 ZEGO 自研 [超低延迟直播产品](/live-streaming-android/introduction/overview)，实现更高质量的直播体验。

    相关 API 请参考 [ZegoStreamResourceModeCDNPlus](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~enum~ZegoStreamResourceMode#zego-stream-resource-mode-cdn-plus)


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

    该功能常用于 KTV 等需要混流对齐的场景，当拉流端播放时，通过 [SetPlayStreamsAlignmentProperty](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoExpressEngine#set-play-streams-alignment-property) 接口控制播放的实时音视频流是否需要精准对齐。若需要，则拉取的所有流中包含精准对齐参数的会进行对齐；若不需要，则所有流都不对齐。

    相关 API 请参考 [SetPlayStreamsAlignmentProperty](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoExpressEngine#set-play-streams-alignment-property)

2. 推流视频支持色彩增强

    针对各种摄像头等设备采集到的画面色彩偏灰、或饱和度偏低的情况，支持在保护人体肤色的同时，增强画面色彩，使其更加鲜艳明亮，更符合人眼真实的视觉感受，详情请参考 [推流视频增强](https://doc-zh.zego.im/article/21186)。

    相关 API 请参考 [EnableColorEnhancement](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoExpressEngine#enable-color-enhancement)

3. 所有网络请求支持 IPv6 协议

4. 支持 MJPEG 格式的硬件解码加速

    注意：该功能仅支持截图的前处理，不支持其他处理（如旋转、水印等）。

    当采集设备输出的视频格式为 MJPEG 时，默认开启硬件解码加速能力，防止出现因设备性能不足而导致的帧率不足等问题。

    该功能主要适用于在 4K 分辨率的采集设备上使用。

5. 混流支持输入直播协议流

    新增支持将直播流作为输入流，进行混流处理；直播输入流的 URL 支持 RTMP 和 HTTP-FLV 两种协议。该功能适用于将主播连麦的RTC 画面流与云端体育直播流、游戏直播画面流等进行混合，实现游戏或体育直播解说的场景中。


**改进优化**

1. 优化服务端混流及单流转码能力

    优化服务端混流及单流转码能力，提高编码效率，同等码率下提升 5% 以上的主客观画质。

2. 优化 AEC（回声消除）算法，实现更好的 AEC 效果

3. 优化网络连接策略，提升音视频通话体验

4. 优化 Android 平台前后台切换策略，解决某些特定场景或机型采集静音的问题

5. 优化多端登录逻辑

    用户在 A 设备上登录成功后，A 设备断网；然后使用同一 userID 在 B 设备上登录成功。此时如果 A 设备网络恢复，重连会失败，并抛出 1002086 错误码，提示该 userID 已在其他设备登录。

**问题修复**

1. 修复 iOS 平台某些情况下硬编硬解导致崩溃的问题

2. 修复 iOS 平台摄像头恢复采集后，没有通知状态的问题

3. 修复 Android 平台某些情况下解码导致崩溃的问题

4. 修复 Windows 平台某些情况下 N 卡硬解退出时产生崩溃的问题

5. 修复 Windows 平台摄像头异常时的重启策略问题


---

## 3.10.2 版本 <a id="3.10.2"></a>

**发布日期： 2023-11-20**

**问题修复**

1. 修复移动端休眠检测模块误报，影响到房间重登录、推拉流重试逻辑的问题


---

## 3.10.1 版本 <a id="3.10.1"></a>

**发布日期： 2023-11-09**

**问题修复**

1. 修复开启低照度增强后出现黑屏的问题



---

## 3.8.1 版本 <a id="3.8.1"></a>

**发布日期： 2023-08-17**

**新增功能**

1. 新增支持“智能云代理”模式

    注意：如需使用该功能，请联系 ZEGO 技术支持。

    开发者设置“智能云代理”模式后，在 RTC 或 L3 拉流时，会优先使用直连网络模式进行尝试。如果直连网络不可用、且当前是蜂窝网络，则继续留在直连模式重试；如果直连网络不可用、且当前是非蜂窝网络，则切到云代理模式，详情请参考 [云代理](https://doc-zh.zego.im/article/21184)。

2. 自定义视频前处理功能支持双输出

    自定视频前处理功能支持“双输出”，即支持输出“内存数据”和 “2D 纹理数据”。开发者可以通过这些数据，实现第三方美颜功能，更高性能地进行人脸检测和美颜。

    相关 API 请参考 [OnCapturedUnprocessedRawData](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~IZegoCustomVideoProcessHandler#on-captured-unprocessed-raw-data), [ZegoVideoBufferTypeGLTexture2DAndRawData](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~enum~ZegoVideoBufferType#zego-video-buffer-type-gl-texture2d-and-raw-data)

3. 媒体播放器支持设置网络资源的 Http Headers

    媒体播放器支持设置网络资源的 Http Headers，开发者可基于该配置，自定义限定网络资源的访问方式，加强资源的安全防护。

    相关 API 请参考 [SetHttpHeader](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoMediaPlayer#set-http-header)

4. 支持多源采集能力

    面向在线 KTV、一起看电影、看比赛等、视频会议、在线教育等音视频源丰富多样的互动场景，多源采集提供了灵活易用的音视频采集源与通道管理能力，大量减少开发者的开发及维护成本。

    多源采集能力对屏幕共享、混音等常见能力的实现路径，进行缩短优化及归一化设计，从 3.8.0 版本后，您可以不用再通过自定义采集实现上述复杂的能力，详情请参考 [多源采集](https://doc-zh.zego.im/article/21102) 。

    主要能力特性如下：

1. 推流通道支持设置或切换多种音视频源。

2. 支持屏幕共享、混音等常见能力。

**改进优化**

1. 优化 iOS 平台的视频渲染效果


---

## 3.7.0 版本 <a id="3.7.0"></a>

**发布日期： 2023-07-18**

**新增功能**

1. 开启视频大小流编码后，除大流的视频参数外，新增支持设置小流的视频参数

    注意：

1. 使用此功能前，需要先调用 [SetVideoConfig](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoExpressEngine#set-video-config) 接口，指定视频编码格式 codecID 为 “ZegoVideoCodecIDH264DualStream（大小流编码）”。

2. 设置大流、小流的分辨率的 “比例” 需要保持一致，否则调用接口会出错。

    在指定编码格式为 “大小流编码” 的情况下，支持分别设置大流和小流的分辨率、帧率和码率，详情请参考 [视频大小流和分层编码](https://doc-zh.zego.im/article/21110)。

    相关 API 请参考 [SetVideoConfig](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoExpressEngine#set-video-config), [SetPublishDualStreamConfig](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoExpressEngine#set-publish-dual-stream-config)

2. 支持动态修改 AudioDeviceMode

    新增 [SetAudioDeviceMode](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoExpressEngine#set-audio-device-mode) 接口进行动态修改设备的音频模式，该配置决定设备的音量模式、前处理模式以及 Mic 占用逻辑，您可以根据具体场景进行选择，详情请参考 [如何设置音频设备模式 ZegoAudioDeviceMode？](http://doc-zh.zego.im/faq/AudioDeviceMod?product=ExpressVideo&platform=unity3d)

    相关 API 请参考 [SetAudioDeviceMode](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoExpressEngine#set-audio-device-mode)

3. 万人范围音视频、游戏语音支持配置 3D 音效距离的衰减范围

    在万人范围音视频、游戏语音场景中，支持设置 3D 音效距离的衰减范围区间 [min, max]。距离小于 min 时，音量不会随着距离的增加而衰减；距离大于 max 时，将无法听到对方的声音。

    相关 API 请参考 [SetReceiveRange](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoRangeSceneStream#set-receive-range), [SetAudioReceiveRange](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoRangeAudio#set-audio-receive-range)

4. Express Unity3D SDK 新增支持在 WebGL 环境中运行

    在 WebGL 环境中运行的 Unity 工程，新增支持使用 ZEGO RTC 服务的部分功能和接口，包括音视频通话、设备管理等能力。

    请参考 [功能总览](https://doc-zh.zego.im/article/14271) 查看具体的功能和接口支持情况，并参考 [跑通示例源码](/real-time-video-u3d-cs/quick-start/run-example-code) 和 [集成 SDK](/real-time-video-u3d-cs/quick-start/integrating-sdk) 进行接入。

**改进优化**

1. 支持在调用 [DestroyEngine] 接口后，生成日志上传任务

    相关 API 请参考 [SubmitLog](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoExpressEngine#submit-log)


---


## 3.4.2 版本 <a id="3.4.2"></a>

**发布日期： 2023-04-25**

**新增功能**

1. 支持开启摄像头自适应帧率

    注意：当通过 [SetVideoConfig](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoExpressEngine#set-video-config) 设置的帧率小于 [EnableCameraAdaptiveFPS](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoExpressEngine#enable-camera-adaptive-fps) 期望帧率最小值时，将使用 [SetVideoConfig](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoExpressEngine#set-video-config) 设置的帧率值。由于不同的手机厂商的硬件和算法策略不同，该接口在不同的机型或同一机型的前后摄像头上，效果存在一定差异。

    当推流端用户设置的帧率较高，而所处环境光照较低无法正常显示或识别主体的情况下，可以调用 [EnableCameraAdaptiveFPS](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoExpressEngine#enable-camera-adaptive-fps) 接口，在一定范围内自动降低帧率来增加曝光时间，从而提升视频画面亮度，该功能常用于对曝光要求较高的直播场景。[EnableCameraAdaptiveFPS](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoExpressEngine#enable-camera-adaptive-fps) 接口需在调用 [CreateEngine](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoExpressEngine#create-engine) 接口初始化引擎之后，启动摄像头前调用。

    相关 API 请参考 [EnableCameraAdaptiveFPS](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoExpressEngine#enable-camera-adaptive-fps)

2. 支持设置低照度增强

    注意：需在调用 [CreateEngine](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoExpressEngine#create-engine) 接口创建引擎后，再调用 [SetLowlightEnhancement](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoExpressEngine#set-lowlight-enhancement) 接口。

    当推流端用户周围环境较暗、或摄像头设置的帧率较高，导致直播画面比较暗，无法正常显示或识别主体的情况下，可调用 [SetLowlightEnhancement](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoExpressEngine#set-lowlight-enhancement) 接口，设置低照度增强，提升视频画面亮度。低照度增强功能包含三种模式：1：不开启低照度增强（默认）、2：开启低照度增强 、3：自动开关低照度增强。

    开发者可以根据业务场景选择不同的低照度增强模式：当希望自行判断是否需要进行低照度增强时，可以通过切换模式 1 和模式 2 进行控制；当希望 SDK 自动增强时，可以使用模式 3 ，SDK 将自动判断用户所处的光照环境，开启或关闭低照度增强，详情请参考 [低照度增强](https://doc-zh.zego.im/article/18923)。

    相关 API 请参考 [SetLowlightEnhancement](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoExpressEngine#set-lowlight-enhancement)

3. 支持开启系统声卡采集

    开启声卡采集后，可以将系统播放的声音混入推流中，如浏览器播放的声音、第三方播放器软件播放的声音等，并支持通过 [SetMixSystemPlayoutVolume](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoExpressEngine#set-mix-system-playout-volume) 设置采集音量。

    相关 API 请参考 [EnableMixSystemPlayout](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~struct~ZegoAudioSourceMixConfig#enable-mix-system-playout)、[SetMixSystemPlayoutVolume](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoExpressEngine#set-mix-system-playout-volume)

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
    场景化音视频配置新增 `StandardVoiceCall` 标准语音通话场景，适用于 1v1 纯语音通话场景，详情请参考 [场景化音视频配置](https://doc-zh.zego.im/article/21188)。

    相关 API 请参考 [SetRoomScenario](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoExpressEngine#set-room-scenario)

2. 支持设置视频帧率和视频分辨率的最小值

    新增 [SetMinVideoFpsForTrafficControl](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoExpressEngine#set-min-video-fps-for-traffic-control) 和 [SetMinVideoResolutionForTrafficControl](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoExpressEngine#set-min-video-resolution-for-traffic-control) 接口，当用户网络不佳且开启了流量控制时，可以通过调用接口设置最低视频帧率及分辨率，帮助用户综合控制视频的显示效果。


    相关 API 请参考 [SetMinVideoFpsForTrafficControl](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoExpressEngine#set-min-video-fps-for-traffic-control)，[SetMinVideoResolutionForTrafficControl](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoExpressEngine#set-min-video-resolution-for-traffic-control)


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

    虚拟场景中，由于每个场景的地图大小、音视频互动玩法及规模不同，需要针对每个场景进行自定义配置。3.1.0 版本后，“万人范围音视频”及“多人实时状态同步”支持通过 SDK 接口，并使用模板 ID 指定场景。模板 ID 对应的配置项只能通过服务器 API 进行配置，详情请参考 [服务端 API - 场景模版配置](/live-streaming-u3d/client-sdk/live-streaming-server/scenario-service/scenario-template-configure)。

    相关 API 请参考 [templateID](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~struct~ZegoSceneParam#template-id)

2. “万人范围音视频”及“多人实时状态同步”功能支持使用 Token 基础鉴权

    注意：如需使用该功能，请联系 ZEGO 技术支持。

    用户在登录场景时，可以带上 Token 参数，以验证合法性。

    相关 API 请参考 [ZegoSceneParam > token](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~struct~ZegoSceneParam#token), [ZegoRangeScene > RenewToken](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoRangeScene#renew-token)



3. SDK 支持设置云代理

    注意：如需使用该功能，请联系 ZEGO 技术支持。

    通过设置 SDK 的云代理接口，将 SDK 对应的所有流量通过云端的代理服务器进行中转，实现与 RTC 通信，详情请参考  [云代理](https://doc-zh.zego.im/article/21184) 。

    相关 API 请参考 [SetCloudProxyConfig](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoExpressEngine#set-cloud-proxy-config)




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


本次更新包含不兼容改动，详情请参考 [v3.0.0 升级指南](https://doc-zh.zego.im/)。

</Warning>



**新增功能**

1. 新增基于摄像头打开后的视频首帧回调

    支持每次开启远端摄像头后，SDK 拉流并渲染完第一帧远端摄像头视频数据后进行回调，开发者可利用该回调统计首帧耗时，或更新播放流的 UI 组件。

    相关 API 请参考 [OnPlayerRenderCameraVideoFirstFrame](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~IZegoEventHandler#on-player-render-camera-video-first-frame)

2. 支持查询当前 SDK 具备的功能特性

    由于 SDK 支持特性裁包，部分特性可能已被裁剪；可以使用此函数快速判断当前 SDK 是否支持指定的功能特性。

    相关 API 请参考 [IsFeatureSupported](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoExpressEngine#is-feature-supported)

3. 新增房间维度的场景 Scenario

    为方便开发者快速接入，降低开发者接入门槛，SDK 提供多种预设场景。开发者可根据所需场景，选择对应的房间模式 [ZegoScenario](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~enum~ZegoScenario)，SDK 将自动应用适合该场景的音视频编解码器、音视频参数、流控策略等配置，从而快速实现该场景下的最佳效果。

    当前支持场景包括秀场直播、KTV、标准 1v1 音视频通话、高画质 1v1 音视频通话、标准语聊房、高音质语聊房，详情请参考 [场景化音视频配置](https://doc-zh.zego.im/article/21188)。

    相关 API 请参考 [SetRoomScenario](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoExpressEngine#set-room-scenario)

4. 新增调试助手功能

    注意：该功能仅在开发阶段使用，请勿在线上版本开启此功能。

    新增 [EnableDebugAssistant](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoExpressEngine#enable-debug-assistant) 接口，开发者调用该接口开启调试助手功能，SDK 将会打印日志到控制台，并且在 SDK 其他接口的调用出现异常时，UI 会弹窗提示错误。

    相关 API 请参考 [EnableDebugAssistant](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoExpressEngine#enable-debug-assistant)

**问题修复**

1. 修复退出 App 时小概率崩溃的问题

**废弃删除**

1. 废弃了 [ZegoScenario](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~enum~ZegoScenario) 的三种旧版本场景

    废弃 [ZegoScenario](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~enum~ZegoScenario) 场景枚举中的 [General]，[Communication]， [Live] 三种场景，详情请参考 [场景化音视频配置](https://doc-zh.zego.im/article/21188)。

2. 删除了 [SetDebugVerbose]、[SetPlayStreamVideoLayer]、[EnableAudioDataCallback] 等接口，详情请参考 [3.0.0 版本及以上升级指南](https://doc-zh.zego.im/)。



---

## 2.23.0 版本 <a id="2.23.0"></a>

**发布日期：2022.09.13**



**问题修复**


1. 修复范围语音功能在退出小队后，在范围距离外还能听到原小队内的人的声音的问题


---



## 2.21.2 版本 <a id="2.21.2"></a>

**发布日期：2022.08.02**

**新增功能**

1. 新增获取视频渲染 Texture2D 的功能

    注意：在 Unity 中，texture2D 坐标是从左下角开始，而图片坐标是从左上角开始，因此看到 Texture2D 默认渲染的画面 Y 轴是翻转的。

    在 [ZegoExpressEngine](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoExpressEngine) 的父类 IVideoSurface 中，新增接口 GetNativeTexture2D，用于拷贝一份 SDK 当前渲染画面的 Texture2D，供外部使用。


---

## 2.21.1 版本 <a id="2.21.1"></a>

**发布日期：2022.07.15**

**新增功能**

1. 混流支持设置视频边框为圆角

    在调用 [StartMixerTask](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoExpressEngine#start-mixer-task) 接口混流时，开发者可以通过 “ZegoMixerInput” 类型参数，设置 “cornerRadius”（视频画面圆角半径），将视频边框设置为圆角。“cornerRadius” 的单位为 px，取值不得超过视频画面宽高中较短者的一半。

    相关 API 请参考 [StartMixerTask](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoExpressEngine#start-mixer-task)

2. 拉流接口增加 CDN Plus 拉流配置项

    注意：若希望通过地区、用户等更多维度，从云端控制拉流方式，请联系 ZEGO 技术支持进行相关配置。

    拉流接口新增 CDN_PLUS 的拉流资源模式（[ZegoStreamResourceMode](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~enum~ZegoStreamResourceMode)），开发者可按流维度自行开启使用CDN_PLUS 拉流。CDN Plus 拉流是比 CDN 拉流直播质量更高，但是价格接近 CDN 的一种性价比高的拉流方式，详情请参考 [CDN Plus 拉流](/live-streaming-android/introduction/overview)。

    相关 API 请参考 [StartPlayingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoExpressEngine#start-playing-stream)

**问题修复**

1. 修复了 [DestroyEngine](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoExpressEngine#destroy-engine) 可能导致 Unity Editor 闪退的问题

2. 修复了应用退出过程中触发 SDK 回调可能导致崩溃的问题


---

## 2.20.3 版本 <a id="2.20.3"></a>

**发布日期：2022.07.01**

**新增功能**

1. 新增音频数据监测功能

    当开发者需要获取远端用户的音频数据或者需要获取本地麦克风采集到的数据另做他用（例如纯音频录制、纯音频第三方监控、纯音频实时分析）时，可调用 [StartAudioDataObserver](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoExpressEngine#start-audio-data-observer) 接口开启实时音频数据监测。

    相关 API 请参考 [StartAudioDataObserver](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoExpressEngine#start-audio-data-observer)，[StopAudioDataObserver](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoExpressEngine#stop-audio-data-observer)，[OnCapturedAudioData](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~IZegoEventHandler#on-captured-audio-data)，[OnPlayerAudioData](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~IZegoEventHandler#on-player-audio-data)，[OnPlaybackAudioData](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~IZegoEventHandler#on-playback-audio-data)，[OnMixedAudioData](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~IZegoEventHandler#on-mixed-audio-data)


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

    在调用 [StartPublishingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoExpressEngine#start-publishing-stream-2) 接口开始推流时，开发者可以设置 [ZegoStreamCensorshipMode](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~enum~ZegoStreamCensorshipMode) 参数，进行流级别的音视频自动审核，包含如涉黄、涉政等审核类型，以此降低开发者的接入难度和业务维护成本。

    相关 API 请参考 [StartPublishingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoExpressEngine#start-publishing-stream-2)

**改进优化**

1. 优化了混流精准对齐的接口调用逻辑

    调用 [StartPublishingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoExpressEngine#start-publishing-stream-2) 接口且将 [ZegoPublisherConfig](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~struct~ZegoPublisherConfig) 中的 [forceSynchronousNetworkTime](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~struct~ZegoPublisherConfig#force-synchronous-network-time) 值设置为 1，则 SDK 内部会等到 [OnNetworkTimeSynchronized](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~IZegoEventHandler#on-network-time-synchronized) 回调通知 NTP 网络时间同步完成后再推流，此时再调用 [SetStreamAlignmentProperty](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoExpressEngine#set-stream-alignment-property) 接口开启混流精准对齐功能。

    相关 API 请参考 [StartPublishingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoExpressEngine#start-publishing-stream-2), [SetStreamAlignmentProperty](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoExpressEngine#set-stream-alignment-property), [OnNetworkTimeSynchronized](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~IZegoEventHandler#on-network-time-synchronized)

**问题修复**

1. 修复了在 32 位 Android 手机上少量接口报错的问题

    相关接口如下：[LoadResourceFromMediaData](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoMediaPlayer#load-resource-from-media-data)，[LoadResourceWithPosition](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoMediaPlayer#load-resource-with-position)，[LoadCopyrightedMusicResourceWithPosition](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoMediaPlayer#load-copyrighted-music-resource-with-position)


---


## 2.19.0 版本 <a id="2.19.0"></a>

**发布日期：2022-05-18**

**新增功能**

1. 支持返回登录房间和退出房间结果

    [loginRoom] 接口新增 “callback” 参数，支持从 “callback“ 返回登录房间结果。

    [logoutRoom] 接口新增 “callback” 参数，支持从 “callback“ 返回退出房间结果。

    相关 API 请参考 [LoginRoom](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoExpressEngine#login-room), [LogoutRoom](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoExpressEngine#logout-room)

2. 新增房间状态变化通知 [onRoomStateChanged]

    当房间的连接状态发生变化时会触发 [onRoomStateChanged] 回调，通过 “ZegoRoomStateChangedReason” 参数提供更加详细的连接状态及状态变化原因。

    相关 API 请参考 [OnRoomStateChanged](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~IZegoEventHandler#on-room-state-changed)


3. 新增开启人声检测功能以及人声部分的声浪回调

    开发者在监听声浪回调时，往往只关注人声部分，可调用 [StartSoundLevelMonitor](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoExpressEngine#start-sound-level-monitor) 接口，传入 “ZegoSoundLevelConfig”，开启 VAD 人声检测。

    SDK 在本地采集声浪回调 [OnCapturedSoundLevelInfoUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~IZegoEventHandler#on-captured-sound-level-info-update)、远端音频声浪回调 [OnRemoteSoundLevelInfoUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~IZegoEventHandler#on-remote-sound-level-info-update) 中也新增是否包含人声检测的参数。

    相关 API 请参考 [StartSoundLevelMonitor](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoExpressEngine#start-sound-level-monitor), [OnCapturedSoundLevelInfoUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~IZegoEventHandler#on-captured-sound-level-info-update), [OnRemoteSoundLevelInfoUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~IZegoEventHandler#on-remote-sound-level-info-update)

4. 支持获取本端和远端的上下行网络质量

    新增本地和远端用户的上下行网络质量回调 [OnNetworkQuality](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~IZegoEventHandler#on-network-quality)，默认每两秒回调一次本地和每个拉取的远端用户的网络状况（包括未知、优秀、良好、中等、较差、网络断线）。当开发者希望分析链路上的网络情况，或想要了解本地和远端用户的网络状况时可以使用该功能。

    相关 API 请参考 [OnNetworkQuality](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~IZegoEventHandler#on-network-quality)


5. 支持设置触发流量控制的关注因素

    当通过 [EnableTrafficControl](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoExpressEngine#enable-traffic-control) 接口开启了指定推流通道的流量控制后，可通过 [SetTrafficControlFocusOn](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoExpressEngine#set-traffic-control-focus-on) 接口控制是否因为远端网络状况差而启动流量控制。

    相关 API 请参考 [SetTrafficControlFocusOn](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoExpressEngine#set-traffic-control-focus-on)

6. 直推 CDN 的流支持通过 L3 拉流

    直推 CDN 时，在不改变推流方式的情况下，SDK 从客户的 CDN 源站拉流，通过 L3 将音视频内容分发给观众，通过 [ZegoResourceType](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~enum~ZegoResourceType) 控制源站资源。该功能常用于直播场景。

    相关 API 请参考 [StartPlayingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoExpressEngine#start-playing-stream)

**问题修复**

1. 修复了从 CDN 拉流失败的问题


---
