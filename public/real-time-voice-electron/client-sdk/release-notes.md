# 发布日志

- - -


## 3.21.0 版本 <a id="3.21.0"></a>

**发布日期： 2025-07-29**


**新增功能**

1. Windows 新增在窗口采集时选择是否采集音频

    在窗口采集时，可以设置是否采集音频以满足不同场景下的需求。

    相关 API 请参考 [enableAudioCapture](https://doc-zh.zego.im/article/api?doc=express-video-sdk_API~cpp_windows~class~IZegoScreenCaptureSource#enable-audio-capture)


**改进优化**

1. 更新集成 Express Native SDK 至 3.21.0 版本

**问题修复**

1. 修复媒体播放器 [loadResource](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_electron~class~ZegoMediaPlayer#load-resource) 时展示首页的问题
2. 修复拉流时可能出现花屏的问题

## 3.20.2 版本 <a id="3.20.2"></a>

**发布日期： 2025-04-08**

**改进优化**

更新集成 Express Native SDK 至 3.20.2 版本。


---


## 3.18.1 版本 <a id="3.18.1"></a>

**发布日期： 2024-12-17**

**改进优化**

更新集成 Express Native SDK 至 3.18.1 版本。


---

## 3.18.0 版本 <a id="3.18.0"></a>

**发布日期： 2024-12-05**

**改进优化**

更新集成 Express Native SDK 至 3.18.0 版本。


---

## 3.12.4 版本 <a id="3.12.4"></a>

**发布日期： 2024-01-18**

**改进优化**

1. 更新 iOS SDK 内的隐私清单文件`PrivacyInfo.xcprivacy`

    注意：如客户集成的是 3.13.2 版本之前的 SDK，如想发布到 App Store，需下载最新版本的 SDK，并拷贝 PrivacyInfo.xcprivacy 文件到旧版 SDK 相应位置。

    请将 iOS SDK 内的隐私清单文件 `PrivacyInfo.xcprivacy` 升级到新版本，详情请参考 SDK 包内的 “ZegoExpressEngine.framework” 文件夹下的“PrivacyInfo.xcprivacy”。

**问题修复**

1. 修复切换网络时，如果网络异常，极低概率下会出现 UI 卡顿的问题


---


## 3.12.3 版本 <a id="3.12.3"></a>

**发布日期： 2024-01-08**

**新增功能**

1. 支持版权音乐插件

    注意：

1. 如需使用该功能，请联系 ZEGO 技术支持。

2. 版权音乐插件包无法单独使用，必须与 Express SDK 搭配使用。

    支持版权音乐功能插件化，当开发者的业务场景仅需更新版权音乐相关的代码时，可以单独集成插件包，无需更新 Express SDK，即可平滑迁移。

2. 支持对转推到 CDN 的音视频流补静音帧

    注意：如需使用该功能，请联系 ZEGO 技术支持。

    支持对转推到 CDN 的音视频流补静音帧，可以用于避免因时间戳不同步、造成的卡顿或音画不同步等问题发生。

3. 媒体播放器支持在本地缓存网络资源

    支持在本地缓存网络资源，如果需要播放同一个网络资源时，将优先使用缓存数据，提升用户体验。

    相关 API 请参考 [enableLocalCache](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_electron~class~ZegoMediaPlayer#enable-local-cache)、[onMediaPlayerLocalCache](https://doc-zh.zego.im/article/21399#onMediaPlayerLocalCache)

4. 所有网络请求支持 IPv6 协议

5. 支持 MJPEG 格式的硬件解码加速

    注意：该功能仅支持截图的前处理，不支持其他处理（如旋转、水印等）。

    当采集设备输出的视频格式为 MJPEG 时，默认开启硬件解码加速能力，防止出现因设备性能不足而导致的帧率不足等问题。

    该功能主要适用于在 4K 分辨率的采集设备上使用。

6. 媒体播放器支持回调视频分辨率改变事件

    媒体播放器支持在检测到视频分辨率发生变化时，抛出相关回调通知开发者。该功能适用于推流画面的分辨率存在多次变更，需要调整推流端编码分辨率、拉流端渲染视图大小进行匹配的场景中。

    相关 API 请参考 [onMediaPlayerVideoSizeChanged](https://doc-zh.zego.im/article/21399#onMediaPlayerVideoSizeChanged)

**改进优化**

1. 优化服务端混流及单流转码能力

    优化服务端混流及单流转码能力，提高编码效率，同等码率下提升 5% 以上的主客观画质。

2. 优化 AEC（回声消除）算法，实现更好的 AEC 效果

3. 优化网络连接策略，提升音视频通话体验

4. 优化多端登录逻辑

    用户在 A 设备上登录成功后，A 设备断网；然后使用同一 userID 在 B 设备上登录成功。此时如果 A 设备网络恢复，重连会失败，并抛出 1002086 错误码，提示该 userID 已在其他设备登录。

**问题修复**

1. 修复 Windows 平台上某些情况下 N 卡硬解退出时产生崩溃的问题

2. 修复 Windows 平台上摄像头异常时的重启策略问题

3. 修复 Windows 或 macOS 系统休眠时，SDK 收不到网络状态变化通知，导致网络类型判断不准确的问题


---

## 3.10.1 版本 <a id="3.10.1"></a>

**发布日期： 2023-11-10**

**新增功能**

1. 媒体播放器支持伴奏音质增强

    媒体播放器支持伴奏音质增强，提升伴奏的音质以及现场的氛围感，适用于语聊房、K 歌等场景中。

    相关 API 请参考 [enableLiveAudioEffect](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_electron~class~ZegoMediaPlayer#enable-live-audio-effect)

**问题修复**

1. 修复开启低照度增强后出现黑屏的问题



---

## 3.9.0 版本 <a id="3.9.0"></a>

**发布日期： 2023-09-22**

**新增功能**

1. 支持分割和传输视频画面中的主体

    注意：如需使用该功能，请联系 ZEGO 技术支持。

    新增主体分割功能。通过 AI 算法，将视频画面中的主体（多数情况下主体是人）从背景中分离出来，返回带透明通道的数据给 SDK 做编码处理。实现只传输视频中的主体而非原始矩形视频的效果。

    当前仅支持通过内部采集的方式使用该能力，详情请参考 [主体分割](/real-time-video-electron-js/video/object-segmentation)。

2. 媒体播放器支持获取媒体流视频信息

    针对媒体播放器正在播放的视频文件，开发者可以主动获取视频的分辨率、帧率等信息。

    相关 API 请参考 [getMediaInfo](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_electron~class~ZegoMediaPlayer#get-media-info)

**改进优化**

1. 优化 SDK 兼容性，支持 Electron 13 及以上版本的热更新

    注意：该优化不能和**非 Context-Aware 类型**的插件一起使用，例如 zego-express-engine-electron-plugin-screen-capture。

**问题修复**

1. 修复 macOS 应用上架异常的问题



---

## 3.8.1 版本 <a id="3.8.1"></a>

**发布日期： 2023-08-17**


**新增功能**

1. Windows 支持指定显卡硬编，支持硬编硬解的纹理输入输出

    Windows 支持指定显卡硬编，支持硬编硬解的纹理输入输出，提升了 Windows 平台硬件编解码的效率，端到端时延降低了 15 ms ~ 100 ms（具体优化效果与使用的显卡相关），该功能可用于远程控制等低延迟场景中。


2. 屏幕采集功能支持获取采集源为“窗口”时的矩形区域

    屏幕采集功能新增接口 [getCaptureSourceRect](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_electron~class~ZegoScreenCaptureSource#get-capture-source-rect)，用于获取采集源为“窗口”时的矩形区域。

    相关 API 请参考 [getCaptureSourceRect](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_electron~class~ZegoScreenCaptureSource#get-capture-source-rect)

**改进优化**

1. 优化低照度增强算法的噪点表现

2. 优化媒体播放器加载资源的 URL 长度，最大支持 2048 字节

3. 优化媒体播放器 SEI 信息与相应帧数据的回调同步，保证 SEI 和画面的一致性

**问题修复**

1. 修复推流时出现水印崩溃的问题

2. 修复使用 Token 鉴权时，在 [createEngine] 之后、[destroyEngine] 之前变更了 userID，可能导致推拉流失败的问题


---

## 3.7.0 版本 <a id="3.7.0"></a>

**发布日期：2023-07-17**

**改进优化**

1. 优化 SDK 内部逻辑，减少 400KB ~ 600KB 的内存占用

2. 优化 SDK 视频采集策略，提升画质

3. 在断网导致的推拉流重试状态中，支持回调本地网络质量

    相关 API 请参考 [onNetworkQuality](https://doc-zh.zego.im/article/21399#onNetworkQuality)

4. 优化 SDK 的内部逻辑，提升弱网环境下的通话体验

**问题修复**

1. 修复 MediaRecorder、AudioObserver 停止推流后，未恢复本地推流，继续采集的问题

2. 修复 NetMonitor 模块多线程死锁的问题

3. 修复 [isVideoDecoderSupported](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_electron~class~ZegoExpressEngine#is-video-decoder-supported) 接口返回值类型错误的问题

4. 修复 [onNetworkSpeedTestQualityUpdate](https://doc-zh.zego.im/article/21399#onNetworkSpeedTestQualityUpdate) 回调中网络测速质量参数 quality 接收不到数据的问题

5. 修复影响 Electron 应用上架 AppStore 的问题


---

## 3.6.0 版本 <a id="3.6.0"></a>

**发布日期：2023-06-20**

**新增功能**

1. 新增地理围栏功能

    注意：

1. 如需使用该功能，请联系 ZEGO 技术支持。

2. 请在创建引擎之前，配置地理围栏信息。

    将音视频及信令数据访问限定在某一区域，用以满足地区数据隐私安全相关法规，即限定用户访问某一特定区域的音视频服务，详情请参考 [地理围栏](https://doc-zh.zego.im/article/17915)。

    相关 API 请参考 [setGeoFence](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_electron~class~ZegoExpressEngine#set-geo-fence)

2. 外部采集支持主动偏移 NTP 时间戳

    注意：如需使用该功能，请联系 ZEGO 技术支持。

    使用外部采集功能时，支持通过实验性 API 接口主动偏移 NTP 时间戳。该功能可用于 KTV 的合唱、伴奏、歌词对齐等场景。

3. 新增音视频推流的首帧回调

    在进行音视频推流时，通过 [onPublisherSendAudioFirstFrame](https://doc-zh.zego.im/article/21399#onPublisherSendAudioFirstFrame)、[onPublisherSendVideoFirstFrame](https://doc-zh.zego.im/article/21399#onPublisherSendVideoFirstFrame) 回调，监听“首帧音频”或“首帧视频”的发布时机。该功能可用于统计音视频推流的耗时、或更新 UI 表现等。

4. 多房间模式下支持快速切换房间

    多房间模式下，支持通过 [switchRoom](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_electron~class~ZegoExpressEngine#switch-room) 接口，快速便捷地实现切换房间的功能。

5. 支持同时停止或恢复所有拉取的音频流

    新增 [muteAllPlayStreamAudio](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_electron~class~ZegoExpressEngine#mute-all-play-stream-audio) 接口，当开发者需要快速关闭、或恢复远端音频时，可调用此接口，同时停止或恢复所有正在拉取的音频流。相比于重新拉流，通过该功能可以极大降低耗时，提升互动体验。

6. 媒体播放器支持播放音乐时获取声浪和频谱

    媒体播放器新增声浪频谱回调和开关接口，可以控制是否开启回调以及回调的频率，从而获取媒体播放器当前的声浪和频谱。在通过媒体播放器播放资源，如一起看电影、游戏语聊房场景时，通过该功能可以做频谱动画的功能，增加趣味性。

    创建媒体播放器后，调用 [enableSoundLevelMonitor](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_electron~class~ZegoMediaPlayer#enable-sound-level-monitor) 接口可以开启声浪监听，开启后可以通过 [onMediaPlayerSoundLevelUpdate](https://doc-zh.zego.im/article/21399#onMediaPlayerSoundLevelUpdate)  回调监听声浪的变化。

    创建媒体播放器后，调用 [enableFrequencySpectrumMonitor](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_electron~class~ZegoMediaPlayer#enable-frequency-spectrum-monitor) 接口可以开启频谱监听，开启后可以通过 [onMediaPlayerFrequencySpectrumUpdate](https://doc-zh.zego.im/article/21399#onMediaPlayerFrequencySpectrumUpdate) 回调监听频谱的变化。

**问题修复**

1. 修复媒体播放器在部分 m3u8 文件格式中，不能通过 seekTo 接口使播放进度跳转到 0 的问题

2. 修复重新推流后，拉流端视频卡顿的偶现问题

3. 修复使用媒体播放器时可能会导致内存泄露的问题


---


## 3.4.2 版本 <a id="3.4.2"></a>

**发布日期：2023.04.26**

**新增功能**

1. 支持多源采集能力

    面向在线 KTV、一起看电影、看比赛等、视频会议、在线教育等音视频源丰富多样的互动场景，多源采集提供了灵活易用的音视频采集源与通道管理能力，大量减少开发者的开发及维护成本。

    多源采集能力对屏幕共享、混音等常见能力的实现路径，进行缩短优化及归一化设计，从 3.4.2 版本后，您可以不用再通过自定义采集实现上述复杂的能力，详情请参考 [多源采集文档](https://doc-zh.zego.im/article/17816)。

    主要能力特性如下：
    - 推流通道支持设置或切换多种音视频源。
    - 支持屏幕共享、混音等常见能力。

2. Express Electron SDK 支持 Linux 平台

    注意：如需使用该功能，请联系 ZEGO 技术支持。

**问题修复**

1. 修复游戏语音在某些情况下收听异常的问题

2. 修复 macOS 平台屏幕共享实际采集帧率小于设置的帧率的问题


---

## 3.3.0 版本 <a id="3.3.0"></a>

**发布日期：2023.03.17**

**改进优化**

1. 优化 SDK 采集渲染逻辑，提升了渲染性能。

2. SDK 支持适配到 Electron 23.0.0 版本，同时解决了 Electron 12.x.x 版本渲染相关的问题。



**问题修复**

1. 修复少数情况下出现的连麦崩溃的问题



---

## 3.2.0 版本 <a id="3.2.0"></a>

**发布日期：2023.02.02**

**改进优化**

1. 摄像头数据插件功能扩展

    摄像头数据插件功能，支持获取前处理后的数据。

    相关 API 请参考 [getCameraVideoDataCapturePlugin](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_electron~class~ZegoExpressEngine#get-camera-video-data-capture-plugin)，[enableCustomVideoProcessing](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_electron~class~ZegoExpressEngine#enable-custom-video-processing)，[registerCustomVideoProcessPlugin](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_electron~class~ZegoExpressEngine#register-custom-video-process-plugin)

2. 流控开启接口支持设置指定通道

    相关 API 请参考 [enableTrafficControl](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_electron~class~ZegoExpressEngine#enable-traffic-control)

3. 自定义信令配置支持扩展到 4KB

    注意：自定义信令配置默认大小为 1KB，如需扩展到 4KB，请联系 ZEGO 技术支持进行处理。

**问题修复**

1. 修复网络时间模块重试失败的问题

2. 修复特定场景下可能导致崩溃的问题



---

## 3.1.1 版本 <a id="3.1.1"></a>

**发布日期：2022.12.22**

**新增功能**

1. 新增流媒体加密功能

    支持使用 AES-128/192/256 对流媒体数据加密。

    相关 API 请参考 [setPublishStreamEncryptionKey](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_electron~class~ZegoExpressEngine#set-publish-stream-encryption-key), [setPlayStreamDecryptionKey](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_electron~class~ZegoExpressEngine#set-play-stream-decryption-key)

2. 新增设置拉流优先级权重的功能

    支持设置拉流优先级的权重。当开发者业务上，需要对某流优先保证质量时，可使用此接口。

    当开发者业务上，需要对某流优先保证质量时，可使用此接口。例如：上课场景，学生拉多路流，则可设置老师流高优先级。

    相关 API 请参考 [setPlayStreamFocusOn](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_electron~class~ZegoExpressEngine#set-play-stream-focus-on)

3. 支持设置视频帧率和视频分辨率的最小值

    新增 [setMinVideoFpsForTrafficControl](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_electron~class~ZegoExpressEngine#set-min-video-fps-for-traffic-control) 和 [setMinVideoResolutionForTrafficControl](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_electron~class~ZegoExpressEngine#set-min-video-resolution-for-traffic-control) 接口，可以用于用户网络不佳且开启了流量控制时，通过调用接口设置最低视频帧率及分辨率，帮助用户综合控制视频的显示效果。

4. 支持设置 H.265 编码自动降级

    使用 H.265 编码方式推流时，支持在异常情况下 H.265 编码自动降级到 H.264 编码：

    - 开启自动降级后，当不支持 H.265 编码或编码 H.265 失败时，SDK 内部会尝试降级使用 H.264 编码进行推流。
    - 关闭自动降级后，当不支持 H.265 编码或编码 H.265 失败时，直接推流失败。

    例如：在多人连麦直播、秀场直播场景下，使用 H.265 编码推流，达到不降低画质的情况下节省 CDN 流量的目的。

    相关 API 请参考 [enableH265EncodeFallback](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_electron~class~ZegoExpressEngine#enable-h265encode-fallback)


5. 支持获取当前设备指定视频编解码器的编解码能力支持情况

    SDK 支持获取当前设备指定视频编解码器的编解码模式的支持情况，从而更好的帮助开发者选择使用的编码器及编码模式并获得更好的效果。

    - 通过 [isVideoEncoderSupported](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_electron~class~ZegoExpressEngine#is-video-encoder-supported) 接口，可获取当前编码器的硬件或软件编码支持情况。
    - 通过 [isVideoDecoderSupported](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_electron~class~ZegoExpressEngine#is-video-decoder-supported) 接口，可获取当前解码器的硬件或软件解码支持情况。

    以上两个接口均包含三个枚举值：支持硬件或软件，支持硬件，支持软件。


6. 支持设置低照度增强

    注意：应在调用 [createEngine](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_electron~class~ZegoExpressEngine#create-engine) 接口创建引擎后，再调用 [setLowlightEnhancement](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_electron~class~ZegoExpressEngine#set-lowlight-enhancement) 接口。

    当推流端用户周围环境较暗、或摄像头设置的帧率较高，导致直播画面比较暗，无法正常显示或识别主体的情况下，可调用 [setLowlightEnhancement](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_electron~class~ZegoExpressEngine#set-lowlight-enhancement) 接口，设置低照度增强，提升视频画面亮度。低照度增强功能包含三种模式：1：不开启低照度增强（默认）、2：开启低照度增强 、3：自动开关低照度增强。

    开发者可以根据业务场景选择不同的低照度增强模式：当希望自行判断是否需要进行低照度增强时，可以通过切模式 1 和 2 来控制；当希望 SDK 自动增强时，可以使用模式 3 ，SDK 将自动判断用户所处的光照环境，开启或关闭低照度增强。


7. 支持对音频设备音量进行监控

    可以监控音频输入/输出设备的音量。

    相关 API 请参考 [startAudioDeviceVolumeMonitor](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_electron~class~ZegoExpressEngine#start-audio-device-volume-monitor), [stopAudioDeviceVolumeMonitor](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_electron~class~ZegoExpressEngine#stop-audio-device-volume-monitor)


8. 支持对音频设备静音

    可根据需要对音频输入/输出设备静音。

    相关 API 请参考 [muteAudioDevice](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_electron~class~ZegoExpressEngine#mute-audio-device)

9. 支持把引擎播放的声音混到推流中

    该功能支持用户将 SDK 播放的声音混入推流中。例如：在直播上课时，老师与学生连麦，老师可以将拉流声音混入推流中。

    相关 API 请参考 [enableMixEnginePlayout](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_electron~struct~ZegoAudioSourceMixConfig#enable-mix-engine-playout)


10. 支持稳态语音检测

    支持检测语音的稳态状况。例如：指定采集后类型而且使用麦克风采集时，可以通过此接口检测主播是否有持续稳定的语音输入。

    相关 API 请参考 [startAudioVADStableStateMonitor](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_electron~class~ZegoExpressEngine#start-audio-vad-stable-state-monitor), [stopAudioVADStableStateMonitor](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_electron~class~ZegoExpressEngine#stop-audio-vad-stable-state-monitor)


11. 新增混流输入参数

    新增混流输入参数，支持设置输入流的音量 volume、文本水印 label 等参数。

    相关 API 请参考 [ZegoMixerInput](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_electron~struct~ZegoMixerInput)

12. 新增设备音量变更、语音状态变化事件的回调接口

    新增回调接口：

    - [onAudioDeviceVolumeChanged](https://doc-zh.zego.im/article/21399#onAudioDeviceVolumeChanged)：接收音频设备音量变更事件的回调。调用 [startAudioDeviceVolumeMonitor](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_electron~class~ZegoExpressEngine#start-audio-device-volume-monitor) 开启音频设备的音量监控后，如果音量发生变化，会触发此回调。

    - [onAudioVADStateUpdate](https://doc-zh.zego.im/article/21399#onAudioVADStateUpdate)：检测音频数据的稳态语音状态的回调。调用 [startAudioVADStableStateMonitor](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_electron~class~ZegoExpressEngine#start-audio-vad-stable-state-monitor) 启动语音状态检测，且处于正在推流的状态或预览预览状态，会触发此回调。



---



## 3.1.0 版本 <a id="3.1.0"></a>

**发布日期：2022.12.12**

**改进优化**

1. 对渲染逻辑上进行了内部优化，一定程度上提升了渲染性能

2. 大幅度提升极端弱网地区的音视频连通率，并降低连通耗时

    ZEGO 自研调度系统针对网络质量极差地区进行了深度优化。


**问题修复**

1. 修复特定场景下 SDK 出现 UI 线程卡住的问题

2. 修复发送房间 [Logout] 信令可能失败的问题

3. 修复视频外部采集在内存模式下，偶现的访问野指针崩溃的问题



---

## 3.0.3 版本 <a id="3.0.3"></a>

**发布日期：2022.11.28**


**问题修复**

1. 修复多房间模式下，停止推流时，房间内其他人收不到流删除通知的问题

2. 修复使用自定义视频前处理时，调用 [destroyEngine](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_electron~class~ZegoExpressEngine#destroy-engine) 接口可能导致 UI 卡住的问题



---

## 3.0.1 版本 <a id="3.0.1"></a>

**发布日期：2022.11.04**

<Warning title="注意">


本次更新包含不兼容改动，详情请参考 [3.0.0 及以上版本升级指南](https://doc-zh.zego.im/article/16791)。

</Warning>




**新增功能**

1. 新增浑厚、低沉等十种音效预设值。

    [setVoiceChangerPreset](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_electron~class~ZegoExpressEngine#set-voice-changer-preset) 接口的 `preset` 参数新增浑厚、低层等十种音效预设值。

2. 新增自定义视频采集推流的图像填充模式

    新增 [setCustomVideoCaptureFillMode](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_electron~class~ZegoExpressEngine#set-custom-video-capture-fill-mode) 接口支持设置自定义视频采集推流的图像填充模式

3. 新增 [registerCustomAudioProcessPlugin](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_electron~class~ZegoExpressEngine#register-custom-audio-process-plugin) 、[unregisterCustomAudioProcessPlugin](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_electron~class~ZegoExpressEngine#unregister-custom-audio-process-plugin) 接口用于设置音频数据插件

    媒体播放器新增 [registerCustomAudioProcessPlugin](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_electron~class~ZegoExpressEngine#register-custom-audio-process-plugin) 、[unregisterCustomAudioProcessPlugin](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_electron~class~ZegoExpressEngine#unregister-custom-audio-process-plugin) 接口用于设置音频数据插件，主要用于获取媒体播放器音频数据。

4. 支持设置 SDK 数据缓存目录

    支持通过 [setEngineConfig](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_electron~class~ZegoExpressEngine#set-engine-config) 接口的 `advancedConfig` 参数中的 data_cache_dir 字段，设置 SDK 数据缓存目录。


**改进优化**

注意：升级到 3.0.1 版本 SDK 时，同时若有使用到屏幕采集插件 SDK [zego-express-engine-electron-plugin-screen-capture](https://www.npmjs.com/package/zego-express-engine-electron-plugin-screen-capture) ，请务必更新到最新版本 0.3.0-114，进行搭配使用。

1. 优化了自定义视频采集的流畅度。

**问题修复**

1. 修复媒体播放器在某些特殊场景下崩溃的问题

2. 修复某些特殊 macOS 系统上，收不到音频首帧回调的问题

3. 修复自定义视频采集在某些异常场景下崩溃的问题

**废弃删除**

1. 废弃了 [ZegoScenario] 的三种旧版本场景
    废弃 [ZegoScenario] 场景枚举中的 [General]，[Communication]， [Live] 三种场景，详情请参考 [场景化音视频配置](https://doc-zh.zego.im/article/16632) 文档。

2. 删除了 [setDebugVerbose]、[setPlayStreamVideoLayer]、[loginMultiRoom] 等接口，详情请参考 [3.0.0 及以上版本升级指南](https://doc-zh.zego.im/article/16791)。

3. 删除 [onDeviceError] 回调接口。


---


## 2.23.0 版本 <a id="2.23.0"></a>

**发布日期：2022.09.13**


**新增功能**

1. 新增获取摄像头数据插件功能

    支持获取摄像头数据插件，主要用于通过 Node.js 插件获取摄像头数据的场景。

    相关 API 请参考 [getCameraVideoDataCapturePlugin](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_electron~class~ZegoExpressEngine#get-camera-video-data-capture-plugin)

2. 混流视频新增部分输出参数

    支持配置混流视频输出的相关参数，开发者可设置视频混流相关配置。

    相关 API 请参考 [startMixerTask](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_electron~class~ZegoExpressEngine#start-mixer-task)


3. 支持推流指定 NTP 校准

    用于开发者在指定推流过程中进行 NTP 校准，主要用于混流场景下的流对齐。

    相关 API 请参考 [startPublishingStream](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_electron~class~ZegoExpressEngine#start-publishing-stream)


---


## 2.22.0 版本 <a id="2.22.0"></a>

**发布日期：2022.08.10**


**新增功能**

1. 新增音效播放器功能

    音效是指为了增强真实感或者烘托场景氛围播放的简短效果音，例如，在直播期间播放掌声、礼物音效、提示音等；在游戏中，播放子弹声、碰撞打击声。

    音效播放器支持音效播放（可以多音效重叠播放）、播放控制（如暂停播放、音量调节、设置播放进度）、预加载音效等功能。

    相关 API 请参考 [createAudioEffectPlayer](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_electron~class~ZegoExpressEngine#create-audio-effect-player), [destroyAudioEffectPlayer](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_electron~class~ZegoExpressEngine#destroy-audio-effect-player)

2. 新增接口 isFeatureSupported 接口，支持查询 SDK 支持的功能特性

    由于 SDK 支持特性裁包功能，部分特性可能已被裁剪，现提供 [isFeatureSupported](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_electron~class~ZegoExpressEngine#is-feature-supported) 接口，用于查询 SDK 是否支持指定的功能特性，例如，查询是否支持媒体播放器功能。

    相关 API 请参考 [isFeatureSupported](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_electron~class~ZegoExpressEngine#is-feature-supported)


3. 支持使用 logoutRoom 接口退出所有房间

    在用户使用多房间的场景下，可以调用一次 logoutRoom 接口，退出所有已登录的房间。

    相关 API 请参考 [logoutRoom](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_electron~class~ZegoExpressEngine#logout-room)


---

## 2.21.2 版本 <a id="2.21.2"></a>

**发布日期：2022.07.26**


**改进优化**

1. 版权音乐相关接口回调方式优化

    优化版权音乐相关接口的回调方式，可降低开发者调用接口的复杂度，SDK 通过 Promise 将回调结果返回给调用者。

    相关 API 请参考 [initCopyrightedMusic](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_electron~class~ZegoCopyrightedMusic#init-copyrighted-music)，[sendExtendedRequest](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_electron~class~ZegoCopyrightedMusic#send-extended-request)，[getLrcLyric](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_electron~class~ZegoCopyrightedMusic#get-lrc-lyric)，[getKrcLyricByToken](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_electron~class~ZegoCopyrightedMusic#get-krc-lyric-by-token)，[requestSong](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_electron~class~ZegoCopyrightedMusic#request-song)，[requestAccompaniment](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_electron~class~ZegoCopyrightedMusic#request-accompaniment)，[requestAccompanimentClip](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_electron~class~ZegoCopyrightedMusic#request-accompaniment-clip)，[download](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_electron~class~ZegoCopyrightedMusic#download)，[getStandardPitch](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_electron~class~ZegoCopyrightedMusic#get-standard-pitch)，[loadCopyrightedMusicResourceWithPosition](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_electron~class~ZegoMediaPlayer#load-copyrighted-music-resource-with-position)，[loadResourceWithPosition](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_electron~class~ZegoMediaPlayer#load-resource-with-position)


---

## 2.21.1 版本 <a id="2.21.1"></a>

**发布日期：2022.07.15**


**问题修复**

1. 修复纯音频场景发送 SEI 失败的问题



---


## 2.21.0 版本 <a id="2.21.0"></a>

**发布日期：2022-07-12**

**新增功能**

1. 新增版权音乐功能

    注意：如需使用该功能，请联系 ZEGO 技术支持。

    支持通过版权音乐功能，获取版权歌曲或伴奏资源，并结合媒体播放器进行本地播放控制。可以用于在线 KTV 、语聊房等合唱或使用背景音乐的场景。

2. 新增自定义音频功能

    注意：如需使用自定义音频采集功能，需要根据 SDK 提供的插件模板进行采集插件开发，再将采集插件通过 [registerCustomAudioCapturePlugin](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_electron~class~ZegoExpressEngine#register-custom-audio-capture-plugin) 注册到 SDK。

    - 客户需要从现有音频流、音频文件、或者定制的采集系统中获得采集后输入，交给 SDK 传输。
    - 客户有自己对 PCM 输入源做特殊的音效处理的需求，在音效处理后输入，交给 SDK 传输。


    相关 API 请参考 [enableCustomAudioIO](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_electron~class~ZegoExpressEngine#enable-custom-audio-io)，[registerCustomAudioCapturePlugin](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_electron~class~ZegoExpressEngine#register-custom-audio-capture-plugin)，[unregisterCustomAudioCapturePlugin](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_electron~class~ZegoExpressEngine#unregister-custom-audio-capture-plugin)

3. 支持设置声卡采集的音量

    用户可通过 [SetMixSystemPlayoutVolume](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_electron~class~ZegoExpressEngine#set-mix-system-playout-volume) 调整系统声卡采集的音量大小。

    相关 API 请参考 [SetMixSystemPlayoutVolume](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_electron~class~ZegoExpressEngine#set-mix-system-playout-volume)

4. 支持获取同步网络时间信息

    在进行多端行为同步时，可通过 [getNetworkTimeInfo](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_electron~class~ZegoExpressEngine#get-network-time-info) 获取同步网络时间，对当前时间进行校准。

    相关 API 请参考 [getNetworkTimeInfo](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_electron~class~ZegoExpressEngine#get-network-time-info)

5. 支持开启混流精准对齐功能

    常用于 KTV 等需要混流对齐的场景。

    相关 API 请参考 [setStreamAlignmentProperty](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_electron~class~ZegoExpressEngine#set-stream-alignment-property)


**问题修复**

1. 修复了自定义视频采集内存泄露的问题。
2. 修复了媒体播放器 crash 的问题。
3. 修复了当视频源宽高比例发生变化时，使用 canvas2d 渲染出现上一帧残留的问题。

---
## 2.19.0 版本 <a id="2.19.0"></a>

**发布日期：2022-05-13**

**新增功能**

1. 支持设置所有拉流音量

    Express-Video SDK 新增 [setAllPlayStreamVolume] 接口，用于设置所有拉流的音量大小。即本端用户可以控制所有音频流的播放音量。

    相关 API 请参考 [setAllPlayStreamVolume](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_electron~class~ZegoExpressEngine#set-all-play-stream-volume)

**问题修复**

1. Express-Video SDK 修复了 [onAudioDeviceStateChanged](https://doc-zh.zego.im/article/21399#onAudioDeviceStateChanged) 回调接口参数错误的问题。

---
## 2.17.3 版本 <a id="2.17.3"></a>

**发布日期：2022-03-28**

**升级必读**

此次大版本升级包含了三处 Breaking Change，请参考下文的 “废弃删除” 进行代码适配。

**新增功能**

1. 新增调试助手功能

    <Warning title="注意">


    该功能仅在开发阶段使用，请勿在线上版本开启此功能，需确保在发布版本上禁用本接口。

    </Warning>



    新增 [enableDebugAssistant] 接口，开发者调用该接口开启调试助手功能，SDK 将会打印日志到控制台，并且在 SDK 其他接口的调用出现异常时，UI 会弹窗提示错误。


    相关 API 请参考 [enableDebugAssistant](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_electron~class~ZegoExpressEngine#enable-debug-assistant)


2. 新增 [setLogConfig] 接口，用于设置日志属性

    当开发者需要自定义日志文件大小和路径时，可调用 [setLogConfig] 接口来完成配置，且必须在调用 [createEngine] 之前设置才能生效。若在 [createEngine] 之后设置，则在 [destroyEngine] 后的下一次 [createEngine] 时生效。一旦调用了 [setLogConfig] 接口，在 [destroyEngine] 之前，即 engine 的整个生命周期里，旧的通过 [setEngineConfig] 设置日志大小和路径的方式将无效。建议一旦使用该接口，就始终只通过其完成设置日志路径和大小的需求。

    相关 API 请参考 [setLogConfig](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_electron~class~ZegoExpressEngine#set-log-config)

3. 新增设置房间模式功能

    同一个用户可以同时加入多个房间，并同时在多个房间内（目前默认最多同时加入 5 个房间）推流、拉流、发送实时消息和接收消息回调。本功能可以隔离多个房间的消息及回调，实现更灵活的连麦业务。ZEGO 推荐用于跨房间连麦和在线教育的超级小班场景。

    需要在初始化 SDK 之前，调用 [ZegoRoomMode] 设置多房间模式，然后调用 [loginRoom] 接口登录多房间。

    相关 API 请参考 [setRoomMode](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_electron~class~ZegoExpressEngine#set-room-mode), [loginRoom](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_electron~class~ZegoExpressEngine#login-room)

4. 支持摄像头关闭时推送静态图片

    关闭摄像头时，支持持续推送 JPEG/JPG、BMP 和 HEIF 格式的静态图片。例如，主播退后台的时候，会主动关闭摄像头，此时观众侧需要展示主播暂时离开的图片。

    初始化 SDK 后，关闭摄像头之前通过 [setDummyCaptureImagePath] 接口设置所推静态图片的路径，开始正常推流后，调用 [enableCamera] 接口关闭摄像头时会开始推静态图片，调用 [enableCamera] 接口打开摄像头时会结束推静态图片。

    相关 API 请参考 [setDummyCaptureImagePath](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_electron~class~ZegoExpressEngine#set-dummy-capture-image-path)

5. 新增开启人声检测功能以及人声部分的声浪回调

    开发者在监听声浪回调时，往往只关注人声部分，可调用 [startSoundLevelMonitorWithConfig] 接口，传入 “ZegoSoundLevelConfig”，开启 VAD 人声检测。

    开发者在监听声浪回调时，往往只关注人声部分，可调用 [startSoundLevelMonitorWithConfig] 接口，传入 “ZegoSoundLevelConfig”，开启 VAD 人声检测。SDK 在本地采集声浪回调 [onCapturedSoundLevelInfoUpdate]、远端音频声浪回调 [onRemoteSoundLevelInfoUpdate] 中也新增是否包含人声检测的参数。

    相关 API 请参考 [startSoundLevelMonitorWithConfig](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_electron~class~ZegoExpressEngine#start-sound-level-monitor-with-config), [onCapturedSoundLevelInfoUpdate](https://doc-zh.zego.im/article/21399#onCapturedSoundLevelInfoUpdate), [onRemoteSoundLevelInfoUpdate](https://doc-zh.zego.im/article/21399#onRemoteSoundLevelInfoUpdate)


6. 新增自定义音频处理功能

    允许开发者在采集音频数据后，或者拉取远端音频数据渲染前，对音频数据进行自定义处理。该功能通常用于 “变声”、“美声” 等场景。

    新增 [enableCustomAudioCaptureProcessing]、[enableCustomAudioCaptureProcessingAfterHeadphoneMonitor]、[registerCustomAudioProcessPlugin] 接口，开发者可以调用 [enableCustomAudioCaptureProcessing] 或 [enableCustomAudioCaptureProcessingAfterHeadphoneMonitor] 接口开启自定义音频处理功能，再通过 [registerCustomAudioProcessPlugin] 接口注册 SDK 提供给您的音频处理插件。

    相关 API 请参考 [enableCustomAudioCaptureProcessing](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_electron~class~ZegoExpressEngine#enable-custom-audio-capture-processing), [registerCustomAudioProcessPlugin](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_electron~class~ZegoExpressEngine#register-custom-audio-process-plugin), [enableCustomAudioCaptureProcessingAfterHeadphoneMonitor](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_electron~class~ZegoExpressEngine#enable-custom-audio-capture-processing-after-headphone-monitor)

7. 新增 Token 过期管理机制

    <Warning title="注意">


    使用此功能需要升级 SDK 并联系 ZEGO 技术支持配置。

    </Warning>




    不同的业务场景，对用户登录房间、推流等权限有时效限制，可以通过 Token 来实现。该机制可以使用户权限管理更安全，常用于 KTV、语聊房场景。

    在 Token 过期前 30 秒，SDK 会通过 [onRoomTokenWillExpire] 回调发出通知。收到该回调后，开发者需要从自己的服务端获取新的有效 Token，并调用 SDK 提供的 [renewToken] 接口更新 Token。

    相关 API 请参考 [renewToken](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_electron~class~ZegoExpressEngine#renew-token), [onRoomTokenWillExpire](https://doc-zh.zego.im/article/21399#onRoomTokenWillExpire)

8. 新增本地设备异常回调

    通过 [onLocalDeviceExceptionOccurred] 回调可以设置要检测的设备类型，如摄像头、扬声器、麦克风等，开发者可以根据不同设备类型的错误回调进行相应的处理。

    相关 API 请参考 [onLocalDeviceExceptionOccurred](https://doc-zh.zego.im/article/21399#onLocalDeviceExceptionOccurred)

9. 新增设置拉流缓存区间值功能

    通过 [setPlayStreamBufferIntervalRange] 接口设置拉流播放缓存自适应调整的区间范围。一般在网络环境较差的情况下，调整增大拉流的播放缓存，会显著减少音视频卡顿，但会增大延迟。

    相关 API 请参考 [setPlayStreamBufferIntervalRange](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_electron~class~ZegoExpressEngine#set-play-stream-buffer-interval-range)


10. 支持 ROI（region of interest）智能视频编码，提升指定区域画质

    <Warning title="注意">


    目前只有特定的视频编码器支持此功能，如需使用，请联系 ZEGO 技术支持。

    </Warning>



    开发者可以调用 [setCustomVideoCaptureRegionOfInterest](https://doc-zh.zego.im/article/api?doc=express-video-sdk_API~javascript_electron~class~ZegoExpressEngine#set-custom-video-capture-region-of-interest) 接口设置指定推流通道自定义视频采集编码器的感兴趣区域（ROI），同样码率情况下，ROI 区域内的画质更加清晰。

    该功能常用于远程控制、人脸检测 等场景。

    相关 API 请参考 [setCustomVideoCaptureRegionOfInterest](https://doc-zh.zego.im/article/api?doc=express-video-sdk_API~javascript_electron~class~ZegoExpressEngine#set-custom-video-capture-region-of-interest)

11. Electron 支持 macOS arm64 架构

**改进优化**

1. 版本号调整

    从此版本开始，ZEGO Express Electron SDK 的版本号将与依赖的 ZEGO Express Native SDK 版本号保持一致。

    <Note title="说明">


    Native 主要指 Android、iOS、macOS 和 Windows 平台。

    </Note>



2. 发布仓库调整

    从此版本开始，ZEGO Express Electron SDK 在 npm 上将分为两个仓库，分别提供 [标准视频功能包](https://www.npmjs.com/package/zego-express-engine-electron) 和 [带白板能力的视频功能包](https://www.npmjs.com/package/zego-express-engine-electron-whiteboard)。

3. 优化了鉴权方式

    2.17.3 及以上版本，在创建引擎时将 AppSign 传空或不传，并且在登录房间时必须传入 Token，鉴权通过后即可使用实时音视频功能，具体请参考 [使用 Token 鉴权](/real-time-video-electron-js/communication/using-token-authentication)。

    2.17.3 以下版本，在创建引擎时传入 AppSign，鉴权通过后即可使用实时音视频功能。

    相关 API 请参考 [createEngine](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_electron~class~ZegoExpressEngine#create-engine), [loginRoom](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_electron~class~ZegoExpressEngine#login-room)

4. 接口优化

    - [startPlayingStream] 接口新增 "roomID" 参数，[startPublishingStream] 接口新增 “config” 参数，主要用于多房间功能。
    - [startNetworkSpeedTest] 接口新增 “interval” 参数，可以用于指定接口回调的时间间隔，方便用户自定义。

**问题修复**

1. 修复了在某些 Windows 设备上使用 webgl 渲染时出现内存泄漏的问题。


**废弃删除**

1. 删除旧的 [initWithProfile] 接口

    为了与 ZEGO Express Native SDK 同步，在 2.17.3 及以上版本删除了 [initWithProfile] 接口，请使用 [createEngine] 来实现原来的功能。

    相关 API 请参考 [createEngine](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_electron~class~ZegoExpressEngine#create-engine)

2. 删除旧的 [uninit] 接口

    为了与 ZEGO Express Native SDK 同步，在 2.17.3 及以上版本删除了 [uninit] 接口，请使用 [destroyEngine] 来实现原来的功能。

    相关 API 请参考 [destroyEngine](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_electron~class~ZegoExpressEngine#destroy-engine)

3. 删除旧的 [enableConsolePrintDebugInfo] 接口

    为了与 ZEGO Express Native SDK 同步，在 2.17.3 及以上版本删除了 [enableConsolePrintDebugInfo] 接口，请使用 [enableDebugAssistant] 来实现原来的功能。

    相关 API 请参考 [enableDebugAssistant](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_electron~class~ZegoExpressEngine#enable-debug-assistant)


---


## 0.26.0 版本 <a id="0.26.0"></a>

**发布日期：2022-01-17**

**改进优化**

1. 优化了 API 接口注释

    完成了对 API 接口的注释优化，对一些 API 注释新增了“详情描述”、“业务场景”、“调用时机”等信息，便于开发者更清晰的了解 API 的功能。


2. 默认最大推流通道数量由 2 路新增到 4 路

    0.26.0 之前版本默认最大推流通道数量为 2 路，如需支持更多则需要 ZEGO 技术支持特殊编包。该版本默认最大推流数新增至 4 路。

    相关 API 请参考 [startPublishingStream](https://doc-zh-api.zego.im/Electron/ZegoExpressEngine.html#startPublishingStream)

---
## 0.25.4 版本 <a id="0.25.4"></a>

**发布日期：2021-12-30**

**问题修复**

1. 修复了 Electron 无法在某些 Mac 机器上签名的问题。


---

## 0.25.3 版本 <a id="0.25.3"></a>

**发布日期：2021-11-17**

**新增功能**

1. 支持打印调试功能

    新增 [enableConsolePrintDebugInfo] 接口，用于在控制台上打印调试信息。

    <Warning title="注意">

    请确保在发布版本上禁用本接口。

    </Warning>



    相关 API 请参考 [enableConsolePrintDebugInfo](https://doc-zh-api.zego.im/Electron/ZegoExpressEngine.html#enableConsolePrintDebugInfo)


**改进优化**

1. 去测试环境

    为了降低开发者对环境的理解成本，ZEGO 已统一环境概念，从该版本开始，废弃了测试环境，统一使用正式环境。在 0.25.3 版本之前已接入过 SDK 的开发者，可以参考 [测试环境废弃说明](https://doc-zh.zego.im/article/12997) 进行 SDK 升级及代码调整。

    相关 API 请参考 [initWithProfile](https://doc-zh-api.zego.im/Electron/ZegoExpressEngine.html#initWithProfile)


**废弃删除**

1. 废弃旧的 [init] 接口

    为了降低开发者对环境的理解，废弃了掉测试环境，统一使用环境。在 0.25.3 及以上版本废弃了原有的 [init] 接口，请使用 [initWithProfile] 接口代替。

    相关 API 请参考 [init](https://doc-zh-api.zego.im/Electron/ZegoExpressEngine.html#init)

---


## 0.25.2 版本 <a id="0.25.2"></a>

**发布日期：2021-11-01**

**问题修复**

1. 修复了 WebGL 的一些已知问题。


---



## 0.25.1 版本 <a id="0.25.1"></a>

**发布日期：2021-11-01**

**问题修复**

1. 修复了当设置预览模式为 1/2 时出现 canvas 尺寸不会改变的渲染问题。


---



## 0.25.0 版本 <a id="0.25.0"></a>

**发布日期：2021-10-18**

**新增功能**

1. 新增 [setPlayStreamVideoType](https://doc-zh-api.zego.im/Electron/ZegoExpressEngine.html#setPlayStreamVideoType) 接口，用于设置播放视频流类型，代替原有接口 [setPlayStreamVideoLayer](https://doc-zh-api.zego.im/Electron/ZegoExpressEngine.html#setPlayStreamVideoLayer)。

2. 新增 [setTrafficControlFocusOn](https://doc-zh-api.zego.im/Electron/ZegoExpressEngine.html#setTrafficControlFocusOn) 接口，用于控制是否因远端网络条件差而启动流量控制，使用前必须先通过接口 [enableTrafficControl](https://doc-zh-api.zego.im/Electron/ZegoExpressEngine.html#enableTrafficControl) 启用流量控制。


---


## 0.24.3 版本 <a id="0.24.3"></a>

**发布日期：2021-09-29**

**新增功能**

1. 新增 canvas 渲染模式

    新增一种渲染模式——canvas渲染，支持在 Mac M1上 渲染画面。


---



## 0.24.2 版本 <a id="0.24.2"></a>

**发布日期：2021-09-13**

**新增功能**

1. 支持回调远端扬声器设备状态

    新增回调 [onRemoteSpeakerStateUpdate] 用于获取远端扬声器设备的状态，当远程扬声器设备的状态发生变化时，通过收听回调用，可以获取与远程扬声器相关的事件，该事件可用于提示用户音频可能异常。该回调常用于 1v1 教育场景或教育小类场景，开发者可以使用此回调通知来确定远端推流设备的扬声器设备是否正常工作，并根据相应的状态初步了解设备问题的原因。

    相关 API 请参考 [onRemoteSpeakerStateUpdate ](https://doc-zh-api.zego.im/Electron/ZegoExpressEngine.html#event:onRemoteSpeakerStateUpdate)


2. 支持获取当前使用的音频设备信息

    调用 [getCurrentAudioDevice] 接口，可以获取当前使用的音频设备信息，包括设备 ID 和设备名称，减少开发者的开发量。

    相关 API 请参考 [getCurrentAudioDevice ](https://doc-zh-api.zego.im/Electron/ZegoExpressEngine.html#getCurrentAudioDevice)

---


## 0.24.1 版本 <a id="0.24.1"></a>

**发布日期：2021-08-20**

**问题修复**

1. 修复了回调 [onAudioDeviceStateChanged](https://doc-zh-api.zego.im/Electron/ZegoExpressEngine.html#event:onAudioDeviceStateChanged) 返回值错误的问题。


---


## 0.23.2 版本 <a id="0.23.2"></a>

**发布日期：2021-06-24**

**问题修复**

1. 修复了设置背景色 RGB 值错误的问题。


---


## 0.23.1 版本 <a id="0.23.1"></a>

**发布日期：2021-06-24**

**问题修复**

1. 修复了存在多个渲染对象时 WebGL 的渲染尺寸问题。


---


## 0.23.0 版本 <a id="0.23.0"></a>

**发布日期：2021-06-18**

**新增功能**


1. 新增试验性 API 功能

        ZEGO 通过 [callExperimentalAPI ](https://doc-zh-api.zego.im/Electron/ZegoExpressEngine.html#event:onRecvExperimentalAPI) 提供 RTC 业务中的部分技术预览或特别定制功能，通过 [onRecvExperimentalAPI ](https://doc-zh-api.zego.im/Electron/ZegoExpressEngine.html#event:onRecvExperimentalAPI) 可用于接收某些具有回调的实验性接口所返回的信息，需要获取该功能的使用方法或其详情可咨询 ZEGO 技术支持。

        相关 API 请参考 [callExperimentalAPI ](https://doc-zh-api.zego.im/Electron/ZegoExpressEngine.html#event:onRecvExperimentalAPI)、[onRecvExperimentalAPI ](https://doc-zh-api.zego.im/Electron/ZegoExpressEngine.html#event:onRecvExperimentalAPI)

2. 新增推拉流画面截图功能

        开发者可调用 [takePublishStreamSnapshot ](https://doc-zh-api.zego.im/Electron/ZegoExpressEngine.html#takePublishStreamSnapshot) 接口对预览/推流画面截图，调用 [takePlayStreamSnapshot ](https://doc-zh-api.zego.im/Electron/ZegoExpressEngine.html#takePlayStreamSnapshot) 接口对指定的拉流画面截图，截图的分辨率为 [setVideoConfig ](https://doc-zh-api.zego.im/Electron/ZegoExpressEngine.html#setVideoConfig) 里设置的编码分辨率。

        该功能常用于教育类场景，例如老师在课堂上会根据学生的表现以及专注程度，让学生端进行预览截图，后续作为报告输出给家长。

        相关 API 请参考 [takePublishStreamSnapshot ](https://doc-zh-api.zego.im/Electron/ZegoExpressEngine.html#takePublishStreamSnapshot)、[takePlayStreamSnapshot ](https://doc-zh-api.zego.im/Electron/ZegoExpressEngine.html#takePlayStreamSnapshot)

3. 媒体播放器新增截图功能

        开发者可调用 [takeSnapshot ](https://doc-zh-api.zego.im/Electron/ZegoMediaPlayer.html#takeSnapshot) 接口对媒体播放器当前播放的画面进行截图。只有在调用 [setPlayerCanvas] 接口设置了显示控件以及播放状态时，才能正常截图。

        相关 API 请参考 [takeSnapshot ](https://doc-zh-api.zego.im/Electron/ZegoMediaPlayer.html#takeSnapshot)


4. 新增自定义视频前处理功能

        视频前处理是介于采集和编码之间的一个流程，开发者自行采集视频数据或获取到 SDK 采集的视频数据后，若 ZEGO Express SDK 自带的基础美颜和水印功能无法满足开发者需求时（例如美颜效果无法达到预期），可以通过其他视频处理类型的 SDK（例如 ZegoEffects SDK）对视频进行一些特殊处理，例如美颜、添加水印或挂件等，该过程即为自定义视频前处理。开发者可调用 [enableCustomVideoProcess ](https://doc-zh-api.zego.im/Electron/ZegoExpressEngine.html#enableCustomVideoProcess) 接口开启该功能。

        相关 API 请参考 [enableCustomVideoProcess ](https://doc-zh-api.zego.im/Electron/ZegoExpressEngine.html#enableCustomVideoProcess)

5. 新增注册视频前处理对象的机制

        调用 [registerCustomVideoProcessPlugin ](https://doc-zh-api.zego.im/Electron/ZegoExpressEngine.html#registerCustomVideoProcessPlugin)  接口将插件对象注册到 RTC 中，用于通知 RTC 需要使用此插件来做自定义视频前处理（例如美颜）。

        相关 API 请参考 [registerCustomVideoProcessPlugin ](https://doc-zh-api.zego.im/Electron/ZegoExpressEngine.html#registerCustomVideoProcessPlugin)

**问题修复**

1. 修复了视网膜屏的 Mac 电脑中出现的视频大小异常的问题。


---


## 0.22.0 版本 <a id="0.22.0"></a>

**发布日期：2021-01-18**

**改进优化**

1. ZegoMixerTask 中新增 advancedConfig

**问题修复**

1. 修复了解析 startMixerTask和stopMixerTask 参数的问题。
2. 修复了使用 enablePublishDirectToCDN 进行参数分析的问题。


---


## 0.21.0 版本 <a id="0.21.0"></a>

**发布日期：2021-01-01**

**改进优化**

1. 删除 setReverbParam，请使用 setReverbParamAdvance 替代
2. 删除 ZegoMediaPlayer 中的 getVolume，请使用 getPlayVolume 和 getPublishVolume 替代

**问题修复**

1. 修复了使用 setEngineConfig 时 logConfig 异常的问题。


---


## 0.20.0 版本 <a id="0.20.0"></a>

**发布日期：2020-12-18**

**新增功能**

1. 新增 startNetworkSpeedTest
2. 新增 stopNetworkSpeedTest
3. 新增 onNetworkModeChanged 回调
4. 新增 onNetworkSpeedTestError 回调
5. 新增 onNetworkSpeedTestQualityUpdate 回调


---


## 0.19.0 版本 <a id="0.19.0"></a>

**发布日期：2020-12-01**

**新增功能**

1. 新增 setPlayStreamVideoLayer
2. 新增 startMixerTask
3. 新增 stopMixerTask

**改进优化**

1. ZegoView 中新增 preserveDrawingBuffer


---



## 0.18.0 版本 <a id="0.18.0"></a>

**发布日期：2020-11-18**

**新增功能**

1. 新增 enableCustomVideoCapture
2. 新增 registerCustomVideoCapturePlugin 和 unregisterCustomVideoCapturePlugin
3. ZegoMediaPlayer 中新增 enablePublishVideo

**改进优化**

1. 为用户的回调实现添加异常捕获机制

**问题修复**

1. 修复了 switchRoom 参数错误的问题。
2. 修复了 setPlayVolume 参数类型检查的问题。


---


## 0.17.0 版本 <a id="0.17.0"></a>

**发布日期：2020-11-01**

**新增功能**

1. 新增 getDefaultAudioDeviceID
2. 新增 getAudioDeviceVolume
3. 新增 setAudioDeviceVolume
4. 新增 switchRoom
5. 新增 setReverbPreset
6. 新增 setVoiceChangerPreset
7. 新增 setReverbEchoParam
8. 新增 setAudioCaptureSereMode
9. 新增 enableTransientANS
10. ZegoMediaPlayer 中新增 getPlayVolume 和 setPlayVolume
11. ZegoMediaPlayer 中新增 getPublishVolume 和 setPublishVolume
12. ZegoMediaPlayer 中新增 getAudioTrackCount 和 setAudioTrackIndex
13. ZegoMediaPlayer 中新增 setVoiceChangerParam


**改进优化**

1. startSoundLevelMonitor 新增 millisecond 参数
2. startSoundSpectrumMonitor 新增 millisecond 参数


---



## 0.10.0 版本 <a id="0.10.0"></a>

**发布日期：2020-08-18**

**新增功能**

1. 新增 createMediaPlayer 和 destroyMediaPlayer
2. 新增 loginMultiRoom
3. 新增 setRoomExtraInfo
4. 新增 setAnsMode
5. 新增 setAudioEqualizerGain
6. 新增 setVoiceChangerParam
7. 新增 setReverbParam
8. 新增 enableVirtualStereo
9. 新增 startRecordingCaptureData 和 stopRecordingCaptureData
10. 新增 onCapturedDataRecordStateUpdate 回调
11. 新增 onCapturedDataRecordProgressUpdate 回调



---


## 0.9.0 版本 <a id="0.9.0"></a>

**发布日期：2020-06-18**

**新增功能**

1. 新增 isMicrophoneMuted 和 isSpeakerMuted
2. 新增 getVideoConfig getAudioConfig
3. 新增 enableHeadphoneMonitor 和 setHeadphoneMonitorVolume
4. 新增 enableMixSystemPlayout
5. 新增 onEngineStateUpdate


---


## 0.7.0 版本 <a id="0.7.0"></a>

**发布日期：2020-05-18**

**新增功能**

1. 新增 ZegoExpressErrorCode.js 文件
2. 新增 onRoomOnlineUserCountUpdate 回调


---


## 0.6.0 版本 <a id="0.6.0"></a>

**发布日期：2020-04-18**

**改进优化**

1. onPublisherQualityUpdate 回调新增 totalSendBytes、audioSendBytes 和 videoSendBytes 参数
2. onPlayerQualityUpdate 回调新增 peerToPeerDelay、peerToPeerPacketLostRate、totalRecvBytes、audioRecvBytes 和 videoRecvBytes 参数

**问题修复**

1. 修复了 setVideoMirrorMode 参数检查的问题。
2. 修复了 webgl 中的视频帧翻转模式。

<Content />

