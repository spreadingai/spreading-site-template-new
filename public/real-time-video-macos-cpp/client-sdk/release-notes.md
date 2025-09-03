# 发布日志

- - -


## 3.22.0 版本<a id="3.22.0"></a>

**发布日期： 2025-08-26**

**新增功能**

1. 新增静态图片采集视频源 

    通过设置 [setVideoSource](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#set-video-source) 视频源为 `Picture`，即可推流一张指定的图片。

    相关 API 请参考：[setVideoSource](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#set-video-source)

2. 半自动混流支持混流对齐能力

    相关 API 请参考：[ZegoAutoMixerTask](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~struct~ZegoAutoMixerTask#zego-auto-mixer-task)

3. 媒体播放器实例个数限制放开至 10 个

    详细请参考 [媒体播放器](/real-time-video-macos-cpp/other/media-player)。

4. 媒体播放器边下边播支持分片文件存储，避免一次性申请内存过大

    <Warning title="注意">
    如需使用本功能，请联系 ZEGO 技术支持。
    </Warning>

5. 拉流切换功能支持强制切换模式

    启用强制切换模式，可避免在弱网环境下，从高码率档位切换至低码率档位时长时间拉不到流的情况。

    相关 API 请参考：[SwitchPlayingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#switch-playing-stream)

6. 新增非主线程（ UI 线程）的音视频首帧耗时回调接口，可在主线程阻塞时更准确地统计首帧耗时

    相关 API 请参考：[onPlayerSyncRecvAudioFirstFrame](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoEventHandler#on-player-sync-recv-audio-first-frame)、[onPlayerSyncRecvVideoFirstFrame](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoEventHandler#on-player-sync-recv-video-first-frame)、[onPlayerSyncRecvRenderVideoFirstFrame](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoEventHandler#on-player-sync-recv-render-video-first-frame)


7. 支持接入微帧264编码器

    <Warning title="注意">
    如需使用本功能，请联系 ZEGO 技术支持。
    </Warning>

8. 新增拉流链路上各环节数据指标的回调

    <Warning title="注意">
    如需使用本功能，请联系 ZEGO 技术支持。
    </Warning>

9. SDK 播放器支持 HLS 协议 拉流且支持分辨率自适应

    <Warning title="注意">
    如需使用本功能，请联系 ZEGO 技术支持。
    </Warning>


    相关 API 请参考：[SwitchPlayingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#switch-playing-stream)

10. 支持通过云端控制的方式下发云代理配置

    支持通过云端控制的方式下发云代理配置。当云端控制配置完成且SDK 拉取到最新的云端控制信息，新的云代理配置能够立即生效。

    <Warning title="注意">
    如需使用本功能，请联系 ZEGO 技术支持。
    </Warning>

11. 推拉流功能新增国密算法加密

    <Warning title="注意">
    如需使用本功能，请联系 ZEGO 技术支持。
    </Warning>

12. 支持第三方音频数据的混音功能

    相关 API  请参考：[enableAudioMixing](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#enable-audio-mixing)、[setAudioMixingVolume](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#set-audio-mixing-volume)、[muteLocalAudioMixing](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#mute-local-audio-mixing) 

13. 支持 WMA 编码器

    媒体播放器，音效播放器支持播放 wma 格式的音频文件

**改进优化**

1. SDK 内的 curl 库升级为 8.14.1 版本 

2. 优化开启主体分割切换背景类型为视频时占用内存过大的问题

3. 优化自然背景分割效果

4. 优化 AI 超分锯齿

5. 优化低照度增强效果

---


## 3.21.0 版本 <a id="3.21.0"></a>

**发布日期： 2025-06-12**


**新增功能**

1. 屏幕共享功能支持描边效果

    在桌面端使用屏幕共享时，可以为共享窗口添加一个高亮描边，并设置描边的颜色和宽度，提升共享窗口的识别度。详情请参考 [屏幕共享 - 描边](https://doc-zh.zego.im/article/16915#highlight)。

    相关 API 请参考 [enableHightLight](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoScreenCaptureSource#enable-hight-light)

2. 新增屏幕共享采集源异常类型回调

    当屏幕共享的采集源（如窗口或屏幕区域）出现异常时，新增回调（Objetive-C 接口：[screenCapture:captureType:exceptionOccurred](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objectivec_macos~class~ZegoScreenCaptureSourceEventHandler#screen-capture-capture-type-exception-occurred)；C++ 接口：[onCaptureTypeExceptionOccurred](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoScreenCaptureSourceEventHandler#on-capture-type-exception-occurred)） 将返回具体的异常采集源类型，帮助开发者快速定位问题场景。详情请参考 [屏幕共享 - 设置事件回调](https://doc-zh.zego.im/article/16915#callback)。

3. 支持自定义 CDN 拉流超时等待时间

    <Warning title="注意">
    如需使用本功能，请联系 ZEGO 技术支持。

    </Warning>

    针对从 CDN 拉流超时等待过长，导致用户实际体验不佳的情况，SDK 对 CDN 拉流内部超时逻辑优化，降低超时等待时长。此外，SDK 支持开发者自定义拉流超时时间。

4. 支持推流时设置直播标题

    若要在直播列表等场景展示直播标题，SDK 支持开发者在主播调用 [startPublishingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#start-publishing-stream) 接口开始推流前，通过 [ZegoPublisherConfig](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~struct~ZegoPublisherConfig) 中的 streamTitle 参数配置标题。

    相关 API 请参考 [startPublishingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#start-publishing-stream), [ZegoPublisherConfig > streamTitle](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~struct~ZegoPublisherConfig#stream-title)

5. 媒体播放器新增有关资源文件权限的错误码

    优化媒体播放器的回调通知逻辑，针对“播放资源无权限”的错误新增错误码 1008015，帮助开发者快速定位问题。

    相关 API 请参考 [onMediaPlayerStateUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoMediaPlayerEventHandler#on-media-player-state-update)

**改进优化**

1. 更新 libvpx 版本

    为提升 SDK 安全质量，第三方库 libvpx 已升级至 1.13.1 版本。

2. 降低登录和推拉流等操作的耗时

    优化 SDK 调度逻辑，降低登录、推拉流耗时，提升用户秒开体验。

3. 优化低照度增强算法

    优化低照度增强算法，使得明暗切换更平滑，并且规避过曝问题。

4. 优化双声道音频编码

    <Warning title="注意">
    如需使用本功能，请联系 ZEGO 技术支持。
    </Warning>

    优化特定场景下双声道音频编码效率：在保证相同音质的前提下，降低音频码率，减轻用户带宽消耗，提升播放流畅度与体验。

5. 优化房间流补充增强信息发送表现

    当房间流补充增强信息发送失败时，SDK 会在流的生命周期内重试直至发送成功，提升房间流补充增强信息可靠性。

**问题修复**

1. 修复用户在推流中，调用拉流接口传入转码模板无效的问题




## 3.20.2 版本 <a id="3.20.2"></a>

**发布日期： 2025-03-27**


**问题修复**

1. 修复了媒体播放器在播放特定网络文件时因进入缓冲状态而导致卡顿的问题




## 3.20.0 版本 <a id="3.20.0"></a>

**发布日期： 2025-03-21**


**新增功能**

1. 支持赛事解说场景的音画精准同步

    <Warning title="注意">


    如需使用该功能，请联系 ZEGO 技术支持。


    </Warning>



    为赛事解说场景新增接口，支持解说流与赛事流的音画精准同步对齐，为观众带来优质的观看体验。

2. 新增用户维度的网络质量回调

    新增 [onRtcStats](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoEventHandler#on-rtc-stats) 回调，开发者可用于衡量用户维度的 RTC 网络质量，该接口将本端用户所有推、拉流的质量数据进行聚合统计并回调，包括：<ul><li>上行 & 下行：占用带宽、RTT、丢包率。</li><li>端到端延迟。</li></ul>

    相关 API 请参考 [onRtcStats](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoEventHandler#on-rtc-stats)

3. 自定义渲染支持输出 RGBA 数据

    <Warning title="注意">


    如需使用该功能，请联系 ZEGO 技术支持。


    </Warning>



    在 macOS 自定义渲染场景中，现支持输出 RGBA 格式的视频数据。

**改进优化**

1. 优化直推 CDN 时因弱网导致的本地录制卡顿现象

    <Warning title="注意">


    如需使用该功能，请联系 ZEGO 技术支持。


    </Warning>



    在直推 CDN 网络不稳定的情况下，保障本地录制的画面流畅，适用于对本地录像要求较高的在线教育以及会议等场景。

**问题修复**

1. 修复已知问题，优化 SDK 性能




## 3.19.0 版本 <a id="3.19.0"></a>

**发布日期： 2025-01-20**


**新增功能**

1. 新增 AI 低照度增强功能

    <Warning title="注意">


    如需使用该功能，请联系 ZEGO 技术支持。
    </Warning>



    低照度增强功能新增 AI 算法，相比传统算法，画面色彩更加饱满、对比度更真实且噪点抑制效果更好，整体画质的主观效果提升明显。

    开发者可通过 [setLowlightEnhancementParams](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#set-lowlight-enhancement-params) 指定使用 AI 算法，当设备性能不足以支持开启 AI 算法时，SDK 会自动使用传统算法。一般中高端机型可稳定运行低照度增强 AI 算法，详细请参考 [推流视频增强](https://doc-zh.zego.im/article/18884) 文档。

    相关 API 请参考 [setLowlightEnhancementParams](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#set-lowlight-enhancement-params)

2. 独唱场景下支持动态响度均衡功能

    开启动态响度均衡后，根据媒体播放器伴奏的实时表现，SDK 动态调整人声响度，使人声与伴奏响度时刻保持恰当比例，提升人声与伴奏融合度，观众体验更佳，适用于实时 KTV 的独唱场景。

    相关 API 请参考 [enableAuxBgmBalance](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#enable-aux-bgm-balance)

3. 媒体播放器播放在线资源时，支持缓存资源文件

    开发者可通过配置 [ZegoMediaPlayerResource-onlineResourceCachePath](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~struct~ZegoMediaPlayerResource#online-resource-cache-path) 参数，设置缓存资源文件路径。此外可通过 [ZegoMediaPlayerResource-maxCachePendingLength](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~struct~ZegoMediaPlayerResource#max-cache-pending-length) 参数设置从当前播放时间点，最多可预缓存的数据长度（单位 bytes）。从而使媒体播放器播放在线资源时，可以减少用户资源下载频次，提高资源复用率与用户体验。

    <Warning title="注意">
    生成缓存文件的同时，SDK 同时会生成一个 ".info "后缀的文件，用于记录缓存信息（如缓存的起始位置等）。用户使用该功能时，需要自行负责清理"缓存文件"及"缓存信息文件"。
    </Warning>



    相关 API 请参考 [ZegoMediaPlayerResource > onlineResourceCachePath](https://doc-zh.zego.im/), [ZegoMediaPlayerResource > maxCachePendingLength](https://doc-zh.zego.im/)

4. 摄像头停止采集时，支持自动推送静态图片

    当用户主动操作或系统前后台等限制，导致摄像头无法继续采集时，支持自动推送开发者配置的静态图片。

    相关 API 请参考 [setDummyCaptureImageParams](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#set-dummy-capture-image-params)

5. 自定义视频采集功能支持由开发者控制外部时间戳

    使用自定义视频采集时，支持由开发者自行对齐音频帧和视频帧的外部时间戳，保证音画同步以及播放器正常工作。

    相关 API 请参考 [ZegoVideoEncodedFrameParam > isExternalClock](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~struct~ZegoVideoEncodedFrameParam#is-external-clock)

**改进优化**

1. 优化 CDN 域名解析逻辑，避免阻塞线程

    CDN 推拉流的域名解析逻辑，由同步改为异步操作，避免阻塞线程。

2. 降低首帧延迟，提升用户秒开体验

    针对首次运行 ZEGO Express SDK 的设备，可降低进房耗时、推拉流耗时，提升用户秒开体验。

3. PC 端回调接口支持非主线程回调

    在 macOS 与 Windows 平台的 [createEngine](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~ZegoExpressSDK#create-engine) 接口中，新增 [callbackSwitchToMainThread] 参数，当其设置为 false 时，回调接口支持非主线程回调，适用于单元测试等无交互界面的测试场景。

    相关 API 请参考 [createEngine](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~ZegoExpressSDK#create-engine)

**问题修复**

1. 修复 macOS 平台销毁引擎时偶现卡死问题




## 3.18.1 版本 <a id="3.18.1"></a>

**发布日期： 2024-12-16**


**问题修复**

1. 登录耗时优化

2. 修复实验性 API 老版本兼容性的问题

3. 修复媒体播放器低概率状态异常的问题




## 3.18.0 版本 <a id="3.18.0"></a>

**发布日期： 2024-12-03**


**新增功能**

1. 新增 AI 回声消除（AEC）

    <Warning title="注意">


    如需使用该功能，请联系 ZEGO 技术支持。


    </Warning>



    AI AEC 支持智能识别并且消除回声。相较传统 AEC 算法，人声保真度效果提升明显，且没有额外的延迟与功耗增量。适用于实时 KTV 、高音质语聊与视频等场景。

    相关 API 请参考 [ZegoAECModeAI](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~enum~ZegoAECMode#zego-aec-mode-ai)

2. 支持将混流后的输出流加入到目标房间

    混流功能支持将混流后的输出流，加入到指定房间，即支持设置输出流的目标房间信息 [targetRoom](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~struct~ZegoMixerOutput#target-room)。每条输出流只支持加入一个房间，且一旦添加，混流过程中不支持动态更新房间。如需使用服务端接口实现该功能，可参考 [开始混流](/real-time-video-server/api-reference/stream-mixing/start-mix) 文档。

    相关 API 请参考 [targetRoom](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~struct~ZegoMixerOutput#target-room)

**改进优化**

1. 优化低照度增强功能中的降噪效果

2. AI 变声新增性能不足的回调

    部分机型由于睿频等原因引起性能不足，可能导致 AI 变声中途失效。现新增性能不足的相关回调通知，以便开发者做后续业务处理。

    相关 API 请参考 [onEvent](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoAIVoiceChangerEventHandler#on-event)

3. 视频自定义采集和前处理时，支持适配 OpenGL 3.0 版本

    视频自定义前处理和自定义采集场景下，支持适配 OpenGL 3.0 版本，可用于适配部分厂商的美颜特效。

    相关 API 请参考 [setLowlightEnhancement](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#set-lowlight-enhancement)

4. 减少推拉流耗时，提升 SDK 性能

**问题修复**

1. 修复媒体播放器 URL 链接带空格时，加载失败的问题

2. 修复 MacOS 拔掉当前使用的媒体设备后，抛出状态错误的问题

3. 修复媒体播放器开启本地缓存后，偶现播放崩溃的问题




## 3.17.0 版本 <a id="3.17.0"></a>

**发布日期： 2024-09-27**


**新增功能**

1. 媒体播放器播放透明特效时，支持 Alpha 数据布局在 RGB 数据右上方

    媒体播放器播放透明特效时，新增 [ZegoAlphaLayoutType > ZegoAlphaLayoutTypeRightTop](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~enum~ZegoAlphaLayoutType#zego-alpha-layout-type-right-top)  枚举，以支持 Alpha 数据拼接在 RGB 数据右上方，设置此枚举时，仅支持 0.5x 的缩放倍率，详情请参考  [播放透明礼物特效](https://doc-zh.zego.im/article/17574) 文档。

    相关 API 请参考 [loadResourceWithConfig](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoMediaPlayer#load-resource-with-config), [ZegoAlphaLayoutTypeRightTop](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~enum~ZegoAlphaLayoutType#zego-alpha-layout-type-right-top)

2. 支持自定义观众上麦前和下麦后的拉流资源类型

    支持分别设置观众在上麦前和下麦后的拉流资源类型，使拉流方式更灵活，可设置分别为：通过 RTC 拉流、超低延迟直播（L3）拉流或 CDN 拉流中任意一种拉流方式。例如，可用于实现直播连麦场景中，观众上麦前默认使用 L3 拉流，上麦互动时切换为通过 RTC 拉流，下麦后恢复为通过 L3 拉流。

    相关 API 请参考 [startPlayingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#start-playing-stream), [ZegoStreamResourceModeCustom](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~enum~ZegoStreamResourceMode#zego-stream-resource-mode-custom), [ZegoPlayerConfig > customResourceConfig](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~struct~ZegoPlayerConfig#custom-resource-config)

**改进优化**

1. 登录房间时，userName 字段改为非必填字段

    调用 [loginRoom](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#login-room) 接口登录房间时，`userName` 原来为必填字段，本次优化为非必填的可选字段。

    相关 API 请参考 [loginRoom](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#login-room)

2. 优化双声道变声效果，并提升音乐变调的音质

    相关 API 请参考 [setVoiceChangerParam](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#set-voice-changer-param)

**问题修复**

1. 修复无法解析 H.265 码流中，存在异常裁剪区域的问题

2. 修复反初始化时，监控模块崩溃，导致主线程卡死的问题

3. 修复版权音乐在开始打分时，可能出现崩溃的问题

4. 调整生命周期，修复已知崩溃问题

5. 修复媒体播放器已知的问题




## 3.16.0 版本 <a id="3.16.0"></a>

**发布日期： 2024-07-26**


**新增功能**

1. AI 降噪新增低延迟模式

    注意：如需使用该功能，请联系 ZEGO 技术支持。

    在 10ms 延迟下，依然保持纯净的降噪效果以及高保真的人声音质，适用于游戏语音、游戏开黑、实时合唱等对延迟较为敏感的场景，目前 AI 降噪已支持均衡模式、低延迟模式以及轻量模式，详情请参考 [场景化 AI 降噪](https://doc-zh.zego.im/article/14977)。

    相关 API 请参考 [setANSMode](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#set-ans-mode)

2. 在推流时，可以控制该流是否允许审核

    注意：若某条流设置为允许审核，如果开发者没有发起审核任务，这条流也不会被送审。

    当调用审核接口时，默认会对房间内的所有流进行审核。如果客户端要控制某条流不可以被送审，可以在调用 [startPublishingStream] 接口开始推流时，将送审标识 [streamCensorFlag] 参数设置为 1（不允许）。

    相关 API 请参考 [startPublishingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#start-publishing-stream), [ZegoPublisherConfig > streamCensorFlag](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~struct~ZegoPublisherConfig#stream-censor-flag)

3. 媒体播放器播放倍速最低支持至 0.3 倍速

    媒体播放器的播放速度区间从 [0.5,4.0]，扩大为 [0.3,4.0]，更多内容请参考 [媒体播放器](https://doc-zh.zego.im/article/11818)。

    相关 API 请参考 [setPlaySpeed](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoMediaPlayer#set-play-speed)

4. 通过超低延迟直播（L3）拉流时，支持自适应码率播放

    注意：如需使用该功能，请联系 ZEGO 技术支持。

    使用 ZEGO 超低延迟直播（L3）拉流时，支持根据用户的网络带宽自适应平滑切换不同码流，保障用户的流畅播放体验。

    [ZegoPlayerConfig] 新增 `adaptiveSwitch` 和 `adaptiveTemplateIDList` 参数，用于支持 OnlyL3 拉流模式下，基于网络环境的码率自适应切换。

    相关 API 请参考 [startPlayingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#start-playing-stream), [adaptiveSwitch](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~struct~ZegoPlayerConfig#adaptive-switch), [adaptiveTemplateIDList](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~struct~ZegoPlayerConfig#adaptive-template-id-list)

5. 支持使用 CDN 拉流时进行平滑切换

    注意：如需使用该功能，请联系 ZEGO 技术支持。

    新增 [switchPlayingStream] 接口，用于开发者拉 CDN 流时，平滑切换至其他 CDN 流，即成功拉到新流后，才会停止拉旧流。

    例如，当视频画面从小窗口切换为大窗口时，需将视频切换为码率和分辨率更高的流，此时将会在成功拉到新流后，才会停止拉旧流，以达到平滑切换的效果。

    相关 API 请参考 [switchPlayingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#switch-playing-stream)

6. H.265 客户端编码自动兼容策略新增用户级的协商范围

    注意：如需使用该功能，请联系 ZEGO 技术支持。

    控制本端客户端编码兼容范围为房间内所有推流用户或所有用户，即当指定范围内存在用户不支持 H.265 时，本端客户端编码动态回退。

    相关 API 请参考 [loginRoom](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#login-room), [startPublishingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#start-publishing-stream), [ZegoPublisherConfig > codecNegotiationType](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~struct~ZegoPublisherConfig#codec-negotiation-type), [ZegoRoomConfig > capabilityNegotiationTypes](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~struct~ZegoRoomConfig#capability-negotiation-types)

**问题修复**

1. 修复偶现多 SPS 和 PPS 文件硬解导致设备发热严重的问题

**废弃删除**

1. 废弃拉流接口中关于 CDN Plus 的配置

    下架畅直播概念，废弃 CDN Plus 直播相关接口。如需实现直播功能，推荐使用 ZEGO 自研 [超低延迟直播产品](https://doc-zh.zego.im/article/13420)，实现更高质量的直播体验。

    相关 API 请参考 [ZegoStreamResourceModeCDNPlus](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~enum~ZegoStreamResourceMode#zego-stream-resource-mode-cdn-plus)




## 3.15.1 版本 <a id="3.15.1"></a>

**发布日期： 2024-06-05**


**问题修复**

1. 修复媒体播放器的已知问题




## 3.15.0 版本 <a id="3.15.0"></a>

**发布日期： 2024-05-29**


**新增功能**

1. 支持针对媒体播放器输出的声音内容，开启变声效果

    媒体播放器新增 [enableVoiceChanger] 接口 ，支持针对媒体播放器输出的声音内容开启变声效果，同时选择需要的变调音效。

    相关 API 请参考 [ZegoMediaPlayer > enableVoiceChanger](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoMediaPlayer#enable-voice-changer)

**改进优化**

1. 优化 AI 场景化降噪中，“均衡模式”的降噪效果

    优化 AI 场景化降噪中，“均衡模式”的降噪效果，在性能不变的情况下，人声清晰度、平稳度进一步提升，且噪音抑制更干净，详情请参考 [场景化 AI 降噪](https://doc-zh.zego.im/article/14977)。

**问题修复**

1. 修复硬件解码包含 B 帧的 CDN 直播视频流时，出现回放的问题

2. 修复通过辅路推流的输入源，在使用主路推流的情况下，若停止音视频引擎，会出现概率性崩溃的问题

3. 修复使用媒体播放器播放网络素材时，偶现播放失败的问题

**废弃删除**

1. 废弃媒体播放器 [setVoiceChangerParam] 接口

    为提升在变声情况下的播放体验，废弃媒体播放器 [ZegoMediaPlayer.setVoiceChangerParam] 接口，请使用 [ZegoMediaPlayer.enableVoiceChanger] 代替。

    相关 API 请参考 [ZegoMediaPlayer > enableVoiceChanger](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoMediaPlayer#enable-voice-changer)




## 3.14.0 版本 <a id="3.14.0"></a>

**发布日期： 2024-04-23**


**新增功能**

1. 新增“汽车人”、“没电了” 两种变声音效

    ZegoVoiceChangerPreset 新增 “汽车人”、“没电了” 两种变声效果的枚举值，丰富变声效果。

    相关 API 请参考 [setVoiceChangerPreset](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#set-voice-changer-preset)

2. 媒体播放器支持视频画面镜像

    相关 API 请参考 [enableViewMirror](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoMediaPlayer#enable-view-mirror)

3. 支持在图片资源校验失败时，依然正常发起混流任务

    ZegoMixerTask 新增参数 mixImageCheckMode，用于控制背景图（backgroundImageURL）、输入流占位图（inputList.imageInfo.url）、水印图片（watermark.imageURL）等图片资源校验失败时，能否正常发起混流任务。

    该功能默认不开启（mixImageCheckMode 默认取值为 0），表示严格执行图片校验，即必须满足参数原有的 “支持协议和格式”、“图片大小”、“图片资源请求成功” 等规则，才能正常发起混流任务。

    ZEGO 服务端 API 混流接口此前已支持该功能，详情请参考 [开始混流](/real-time-video-server/api-reference/stream-mixing/start-mix) 的 CheckImageMode 参数。

    相关 API 请参考 [startMixerTask](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#start-mixer-task)

**问题修复**

1. 修复未定义全局变量的释放时机，导致进程退出异常的问题




## 3.13.2 版本 <a id="3.13.2"></a>

**发布日期： 2024-03-29**


**问题修复**

1. 修复已知问题




## 3.13.0 版本 <a id="3.13.0"></a>

**发布日期： 2024-03-14**


**新增功能**

1. 使用 QUIC 协议进行 CDN 推拉流时，支持 0-RTT 建立连接

    注意：

1. 该功能的安全性与传统方式相比稍低，请酌情使用。

2. 使用该功能时，需要将 ZegoCDNConfig.protocol 设置为 “quic”。

    [ZegoCDNConfig] 新增 quicConnectMode 属性，开发者在使用 QUIC 协议进行 CDN 推拉流时，可以设置为 QUIC 建连模式（即 quicConnectMode 取值为 1），0-RTT 建立连接，快速启用服务。目前已适配华为、网宿、腾讯等厂商的 CDN 直播产品。

    该功能默认不开启（即 quicConnectMode 默认为 0，表示正常建立连接）。

    相关 API 请参考 [ZegoCDNConfig > quicConnectMode](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~struct~ZegoCDNConfig#quic-connect-mode)

2. 支持设置转推 CDN 的超时时间，用于监控流是否存在

    注意：该功能只在发起转推时生效，转推过程中如果出现断连，SDK 会保持重试逻辑，此时无该回调通知。

    发起转推任务时，支持通过 [addPublishCdnUrl] 接口，设置转推 CDN 的超时时间，用于监控流是否存在。例如，开发者已经发起转推任务，但该条流还未开始推流，在超过设置的超时时间后，SDK 会返回一个流不存在的回调通知。

    该回调只会通知给转推发起者、而不是推流发起者。如果转推发起者和推流发起者不是同一个用户，建议开发者从服务端发起转推、并接收该通知。

    相关 API 请参考 [addPublishCdnUrl](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#add-publish-cdn-url)

3. 支持回调本地录制的质量数据

    ZegoDataRecordProgress 新增 quality 属性，在本地录制过程中，通过该属性回调录制文件的帧率、码率等质量数据。

    相关 API 请参考 [onCapturedDataRecordProgressUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoDataRecordEventHandler#on-captured-data-record-progress-update)

4. 自定义视频渲染支持独立通道控制

    自定义视频渲染支持独立通道控制。例如，针对指定流 ID 只进行 SDK 内部渲染、但不执行自定义渲染。

    相关 API 请参考 [enableCapturedVideoCustomVideoRender](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#enable-captured-video-custom-video-render), [enableRemoteVideoCustomVideoRender](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#enable-remote-video-custom-video-render)

5. 支持获取 SDK 前处理后的视频数据，向 SDK 传入不同的视频数据分别用于预览和推流

    注意：该功能会增加性能消耗，请酌情使用。

    支持在获取到 Express SDK 视频前处理过的数据后，再进行其他的视频前处理操作（例如美颜等，需要开发者自行实现）、或将处理过的视频数据直接用于预览或推流。

    相关 API 请参考 [sendCustomVideoProcessedRawData](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#send-custom-video-processed-raw-data)

6. 支持 H.265 自动兼容策略

    注意：如需使用该功能，请联系 ZEGO 技术支持。

    房间内有用户不支持 H.265 格式时，支持推流端回退到 H.264 格式重新推流。

**改进优化**

1. 优化媒体推流器的回调通知逻辑

    优化媒体推流器的回调通知逻辑，增加对“不支持的音频采样率”（例如，不支持 24K 的采样率）的错误回调，帮助开发者快速定位问题。

    相关 API 请参考 [onMediaDataPublisherFileClose](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoMediaDataPublisherEventHandler#on-media-data-publisher-file-close)

2. 优化色彩增强算法

    优化色彩增强算法，在画面色彩饱和度较高的场景下，相较之前的版本表现更佳。

**问题修复**

1. 修复长时间使用 SDK 未反初始化，导致接口调用耗时异常的问题

2. 修复已知的兼容异常、及空指针的问题




## 3.12.4 版本 <a id="3.12.4"></a>

**发布日期： 2024-01-16**


**问题修复**

1. 修复切换网络时，如果网络异常，极低概率下会出现 UI 卡顿的问题




## 3.12.2 版本 <a id="3.12.2"></a>

**发布日期： 2024-01-03**


**问题修复**

1. 修复潜在问题




## 3.12.0 版本 <a id="3.12.0"></a>

**发布日期： 2023-12-27**


**新增功能**

1. 支持版权音乐插件

    注意：

1. 如需使用该功能，请联系 ZEGO 技术支持。

2. 版权音乐插件包无法单独使用，必须与 Express SDK 搭配使用。

    支持版权音乐功能插件化，当开发者的业务场景仅需更新版权音乐相关的代码时，可以单独集成插件包，无需更新 Express SDK，即可平滑迁移。

2. 支持从客户端获取房间内流列表

    注意：该功能获取的结果为房间内实时流列表；如果房间服务断开连接，获取的结果可能不准确。

    支持开发者从客户端获取房间内的流列表，可以用于处理业务侧的相关逻辑。

    相关 API 请参考 [getRoomStreamList](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#get-room-stream-list)

3. 支持对转推到 CDN 的音视频流补静音帧

    注意：如需使用该功能，请联系 ZEGO 技术支持。

    支持对转推到 CDN 的音视频流补静音帧，可以用于避免因时间戳不同步、造成的卡顿或音画不同步等问题发生。

4. 媒体播放器支持获取文件的实时帧率

    支持获取当前播放的媒体文件的帧率统计信息，可以用于数据展示、异常监控等。

    相关 API 请参考 [getPlaybackStatistics](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoMediaPlayer#get-playback-statistics)

5. 媒体播放器支持在本地缓存网络资源

    支持在本地缓存网络资源，如果需要播放同一个网络资源时，将优先使用缓存数据，提升用户体验。

    相关 API 请参考 [enableLocalCache](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoMediaPlayer#enable-local-cache), [onMediaPlayerLocalCache](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoMediaPlayerEventHandler#on-media-player-local-cache)

**问题修复**

1. 修复系统休眠时，SDK 收不到网络状态变化通知，导致网络类型判断不准确的问题




## 3.11.0 版本 <a id="3.11.0"></a>

**发布日期： 2023-11-29**


**新增功能**

1. 支持云端高清低码能力

    注意：如需使用该功能，请联系 ZEGO 商务人员。

    通过在云端转码服务中应用领先的编解码算法、以及其他视频前处理能力，持续优化视频播放的清晰度与流畅度，显著提升画质。该功能适用于以下场景：

    - 观看量较大的秀场直播等场景。在保证视频流畅性和高质量的同时，节约带宽成本；同等主观画质下，能够降低 30% 左右的码率。

    - 视频内容更复杂、色彩和纹理细节更丰富的弹幕游戏直播、体育直播等场景。同等拉流码率条件下，实现更高清的观看体验。

    相关 API 请参考 [ZegoMixerOutputVideoConfig > enableLowBitrateHD](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~struct~ZegoMixerOutputVideoConfig#enable-low-bitrate-hd)

2. 推流视频支持色彩增强

    针对各种摄像头等设备采集到的画面色彩偏灰、或饱和度偏低的情况，支持在保护人体肤色的同时，增强画面色彩，使其更加鲜艳明亮，更符合人眼真实的视觉感受，详情请参考 [推流视频增强](https://doc-zh.zego.im/article/18884)。

    相关 API 请参考 [enableColorEnhancement](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#enable-color-enhancement)

3. 所有网络请求支持 IPv6 协议

4. 房间实时消息支持发送透传消息

    支持向指定的客户端或客户服务器发送房间实时消息；消息类型分为 “普通消息”、“有序消息”，其中后者保证严格按照顺序接收消息。该功能适用于主播需要管理房间内的麦位等场景中，例如：

    - 通过主播客户端，向需要闭麦的用户发送消息，接到消息的客户端进行闭麦。

    - 主播希望将某用户踢出房间时，通过主播客户端，向对方的客户服务器发送消息、并踢出该用户。

    相关 API 请参考 [sendTransparentMessage](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#send-transparent-message)

5. 支持 MJPEG 格式的硬件解码加速

    注意：该功能仅支持截图的前处理，不支持其他处理（如旋转、水印等）。

    当采集设备输出的视频格式为 MJPEG 时，默认开启硬件解码加速能力，防止出现因设备性能不足而导致的帧率不足等问题。

    该功能主要适用于在 4K 分辨率的采集设备上使用。

6. 自动混流支持设置水位

    注意：

1. 该功能默认不开启，即服务端使用默认的配置值。

2. 该功能会增大延迟，请酌情使用。

    自动混流接口支持设置水位，控制混流服务器拉流缓存的自适应调整的区间范围下限，以便在“混流耗时”和“推流端不稳定导致的画面卡顿”之间保持平衡。该功能设置后，仅对新的输入流生效，对于已经开始混流的输入流不生效。

    例如实时合唱 KTV 场景中，推流端网络轻微波动可能会导致混流卡顿，此时观众观看时也会有较高概率出现卡顿。通过调节水位下限，可以优化观众端卡顿问题，但会增大延迟。

    相关 API 请参考 [ZegoAutoMixerTask > minPlayStreamBufferLength](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~struct~ZegoAutoMixerTask#min-play-stream-buffer-length)

7. 混流支持输入直播协议流

    新增支持将直播流作为输入流，进行混流处理；直播输入流的 URL 支持 RTMP 和 HTTP-FLV 两种协议。该功能适用于将主播连麦的RTC 画面流与云端体育直播流、游戏直播画面流等进行混合，实现游戏或体育直播解说的场景中。

8. 混流支持自定义音频偏移值

    在使用自定义音视频采集功能、且对应的采集源音频延迟不一致的情况下，可以在混流时自定义音频偏移值，从而实现混流输出后的音视频对齐，保证观众端的体验。

    相关 API 请参考 [ZegoMixerInput > advancedConfig](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~struct~ZegoMixerInput#advanced-config)

9. 媒体播放器支持回调视频分辨率改变事件

    媒体播放器支持在检测到视频分辨率发生变化时，抛出相关回调通知开发者。该功能适用于推流画面的分辨率存在多次变更，需要调整推流端编码分辨率、拉流端渲染视图大小进行匹配的场景中。

    相关 API 请参考 [onMediaPlayerVideoSizeChanged](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoMediaPlayerEventHandler#on-media-player-video-size-changed)

10. 音效播放器支持分别设置推流音量、本地播放音量

    音效播放器支持分别设置推流音量、本地播放音量，保证本端和远端的音量大小都处于合适的区间。

    相关 API 请参考 [ZegoAudioEffectPlayer > setPublishVolume](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoAudioEffectPlayer#set-publish-volume), [ZegoAudioEffectPlayer > setPlayVolume](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoAudioEffectPlayer#set-play-volume), [ZegoAudioEffectPlayer > setPublishVolumeAll](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoAudioEffectPlayer#set-publish-volume-all), [ZegoAudioEffectPlayer > setPlayVolumeAll](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoAudioEffectPlayer#set-play-volume-all)

**改进优化**

1. 优化服务端混流及单流转码能力

    优化服务端混流及单流转码能力，提高编码效率，同等码率下提升 5% 以上的主客观画质。

2. 优化 AEC（回声消除）算法，实现更好的 AEC 效果

3. 优化网络连接策略，提升音视频通话体验

4. 优化多端登录逻辑

    用户在 A 设备上登录成功后，A 设备断网；然后使用同一 userID 在 B 设备上登录成功。此时如果 A 设备网络恢复，重连会失败，并抛出 1002086 错误码，提示该 userID 已在其他设备登录。




## 3.10.0 版本 <a id="3.10.0"></a>

**发布日期： 2023-10-13**


**新增功能**

1. 媒体播放器支持伴奏音质增强

    媒体播放器支持伴奏音质增强，提升伴奏的音质以及现场的氛围感，适用于语聊房、K 歌等场景中。

    相关 API 请参考 [enableLiveAudioEffect](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoMediaPlayer#enable-live-audio-effect)

2. 支持获取并上传音频的 Dump 文件

    注意：由于音频 Dump 文件属于用户的隐私敏感数据，因此开发者实现该能力时，请务必认真阅读 [《即构隐私政策》](https://www.zego.im/privacy) 中关于 “使用音频 Dump 功能” 的内容。此外，在收集音频 Dump 文件时，请在获得用户授权同意时，同步注明 Express SDK 收集目的。

    支持将处理前后的音频数据保存下来并上传，用于定位音频相关问题、提高问题排查效率、缩短接入时间，详情请参考 [如何获取、上传音频的 Dump 文件？](https://doc-zh.zego.im/faq/How_to_get_audio_dump_upload)

    相关 API 请参考 [startDumpData](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#start-dump-data), [stopDumpData](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#stop-dump-data), [uploadDumpData](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#upload-dump-data), [removeDumpData](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#remove-dump-data), [onRequestDumpData](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoEventHandler#on-request-dump-data), [onStartDumpData](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoEventHandler#on-start-dump-data), [onStopDumpData](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoEventHandler#on-stop-dump-data), [onUploadDumpData](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoEventHandler#on-upload-dump-data)

3. 自定义视频采集支持透明通道传输

    支持提取、编码和传输开发者自定义采集的 RGBA 通道中的 Alpha 通道数据，从而在拉流端渲染出透明背景的主体，实现更加沉浸、真实的视频场景。

    相关 API 请参考 [enableAlphaChannelVideoEncoder](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#enable-alpha-channel-video-encoder)

**改进优化**

1. 优化网络测速的期望推、拉流码率上限

    优化网络测速的期望推、拉流码率上限，提升至 15M。开发者可以在推拉流前，检查音视频质量与当前网络的匹配程度，以保证通话质量稳定。

    相关 API 请参考 [startNetworkSpeedTest](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#start-network-speed-test)

2. 优化拉流时，接收远端用户音视频数据的 [muteAll] 接口逻辑

    注意：新增接口 [muteAllPlayAudioStreams]、[muteAllPlayVideoStreams] 与旧接口 [muteAllPlayStreamAudio]、[muteAllPlayStreamVideo] 之间不能混用。

    新增接口 [muteAllPlayAudioStreams]、[muteAllPlayVideoStreams] 接口，用于在拉流时控制是否接收所有远端用户的音视频数据；同时支持通过 [mutePlayStreamAudio]、[mutePlayStreamVideo] 接口，单独控制指定的流的接收状态。

    旧接口 [muteAllPlayStreamAudio]、[muteAllPlayStreamVideo] 调用后，无法单独控制指定流的接收状态。

    相关 API 请参考 [muteAllPlayAudioStreams](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#mute-all-play-audio-streams), [muteAllPlayVideoStreams](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#mute-all-play-video-streams), [mutePlayStreamAudio](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#mute-play-stream-audio), [mutePlayStreamVideo](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#mute-play-stream-video)

3. 媒体播放器支持仅播放视频或音频，不额外消耗解码性能

    注意：播放过程中，如果修改了媒体流类型，会在下一次播放时生效。

    使用媒体播放器播放音视频文件时，支持通过 [setPlayMediaStreamType] 接口，设置为“仅播放音频” 或“仅播放视频”，不消耗音视频解码性能。

    相关 API 请参考 [setPlayMediaStreamType](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoMediaPlayer#set-play-media-stream-type)

**问题修复**

1. 修复拉流时，偶现无声音的问题

2. 修复多房间断网的异常情况下，多次调用 [logoutRoom]、[loginRoom] 接口，导致后续登录房间失败的问题

3. 修复房间重连失败的情况下，可能出现频繁重试的问题




## 3.9.0 版本 <a id="3.9.0"></a>

**发布日期： 2023-09-08**


**新增功能**

1. 屏幕采集支持设置推流区域

    多源采集模块在进行屏幕采集时，支持用户设置独立的预览和推流区域。

    相关 API 请参考 [updatePublishRegion](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoScreenCaptureSource#update-publish-region)

2. 新增附带时间戳的 SEI 回调

    相关 API 请参考 [onPlayerRecvMediaSideInfo](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoEventHandler#on-player-recv-media-side-info)

3. 单流转码功能支持 RTC 拉流

    注意：

1. 如需使用该功能，请联系 ZEGO 技术支持。

2. 转码会造成额外的延迟，不建议您在使用 RTC 拉流的麦上场景中使用该功能。

    RTC 拉流时，支持通过预设的转码模板触发单流转码任务，输出不同分辨率的转码流，详情请参考 [单流转码](https://doc-zh.zego.im/article/18230)。

    该功能可用于直播等场景中，观众可以基于网络质量、终端设备等，选择不同分辨率的流进行观看，确保播放的流畅性。

    相关 API 请参考 [ZegoPlayerConfig > codecTemplateID](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~struct~ZegoPlayerConfig#codec-template-id)

4. 支持抛出 [setDummyCaptureImagePath] 异常回调

    相关 API 请参考 [onPublisherDummyCaptureImagePathError](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoEventHandler#on-publisher-dummy-capture-image-path-error)

5. 直推 CDN 支持在推流过程中更新 CDN 地址

    相关 API 请参考 [enablePublishDirectToCdn](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#enable-publish-direct-to-cdn)

6. 支持均衡型 AI 降噪模式

    注意：当前官网 SDK 不包含此功能，如有需要，请联系 ZEGO 技术支持特殊编包。

    支持均衡型 AI 降噪模式，与原有模式相比，在相同的人声保真效果前提下，噪音抑制效果明显提升，可以达到干净无噪音或不扰人的程度；但性能消耗稍微增加。适用于街道、马路、市场等较为嘈杂（信噪比低）的户外环境中，详情请参考 [场景化 AI 降噪](https://doc-zh.zego.im/article/14977)。

    相关 API 请参考 [ZegoANSModeAIBalanced](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~enum~ZegoANSMode#zego-ans-mode-ai-balanced)

7. 主体分割支持 Intel 设备，扩大设备覆盖能力

**改进优化**

1. 优化 [setLogConfig] 接口

    扩大 [setLogConfig] 接口的生命周期为 App 生命周期，且优先级高于 [setEngineConfig] 接口中的配置。

    相关 API 请参考 [setLogConfig](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~ZegoExpressSDK#set-log-config), [setEngineConfig](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~ZegoExpressSDK#set-engine-config)

2. 优化 App 休眠时的重试规则

    优化 App 休眠时的重试规则，登录房间和推拉流过程中，“App 休眠时间”也计入“最大允许重试时间”。

**问题修复**

1. 修复音频外部采集模块切换音源时，会导致无声的问题

2. 修复通过 [setPublishWatermark] 设置水印路径超过最大长度时，没有抛出错误信息的问题

3. 修复发送流新增时，极小概率出现失败的问题

4. 修复音效播放器偶现崩溃的问题

5. 修复调用 [sendAudioSideInfo] 接口发送音频次要消息，接收端 10s 左右才能收到消息的问题

6. 修复网宿 CDN 在直推情况下，停推 TCP 断连耗时固定为 500 ms 的问题




## 3.8.1 版本 <a id="3.8.1"></a>

**发布日期： 2023-08-16**


**问题修复**

1. 修复使用 Token 鉴权时，在 [createEngine] 之后、[destroyEngine] 之前变更了 userID，可能导致推拉流失败的问题




## 3.8.0 版本 <a id="3.8.0"></a>

**发布日期： 2023-08-09**


**新增功能**

1. 新增支持“智能云代理”模式

    注意：如需使用该功能，请联系 ZEGO 技术支持。

    开发者设置“智能云代理”模式后，在 RTC 或 L3 拉流时，会优先使用直连网络模式进行尝试。如果直连网络不可用、且当前是蜂窝网络，则继续留在直连模式重试；如果直连网络不可用、且当前是非蜂窝网络，则切到云代理模式，详情请参考 [云代理](https://doc-zh.zego.im/article/16875)。

2. 支持抛出编码和硬件解码的低帧率告警

    注意：如需使用该功能，请联系 ZEGO 技术支持。

    新增支持抛出编码和硬件解码的低帧率告警回调，在 1v1 聊天、直播等场景中，开发者可基于该回调，实现调整推流分辨率、触发转码等操作。

    相关 API 请参考 [onPlayerLowFpsWarning](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoEventHandler#on-player-low-fps-warning), [onPublisherLowFpsWarning](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoEventHandler#on-publisher-low-fps-warning)

3. 新增同步抛出视频网络首帧的回调

    新增从非 UI 线程抛出视频网络首帧的回调 [onPlayerSyncRecvVideoFirstFrame]，该回调不受 UI 卡顿的影响，能够更准确的统计视频首帧数据。

    相关 API 请参考 [onPlayerSyncRecvVideoFirstFrame](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoEventHandler#on-player-sync-recv-video-first-frame)

4. 媒体播放器支持设置网络资源的 Http Headers

    媒体播放器支持设置网络资源的 Http Headers，开发者可基于该配置，自定义限定网络资源的访问方式，加强资源的安全防护。

    相关 API 请参考 [setHttpHeader](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoMediaPlayer#set-http-header)

**改进优化**

1. 优化媒体播放器加载资源的 URL 长度，最大支持 2048 字节

2. 优化媒体播放器 SEI 信息与相应帧数据的回调同步，保证 SEI 和画面的一致性

**废弃删除**

1. 修改了媒体推流器 IZegoMediaDataPublisher 类的 setMediaDataPublisherEventHandler 接口名称

    在 3.8.0 版本，对媒体推流器 [IZegoMediaDataPublisher] 类的一个 API 接口命名进行变更：将原来的成员函数 [setMediaDataPublisherEventHandler] 更名为 [setEventHandler]，接口名称修改后可能存在兼容性问题，详情请参考 [3.8.0 及以上版本升级指南](https://doc-zh.zego.im/article/17979)。




## 3.7.0 版本 <a id="3.7.0"></a>

**发布日期： 2023-07-13**


**新增功能**

1. 开启视频大小流编码后，除大流的视频参数外，新增支持设置小流的视频参数

    注意：

1. 使用此功能前，需要先调用 [setVideoConfig] 接口，指定视频编码格式 codecID 为 “ZegoVideoCodecIDH264DualStream（大小流编码）”。

2. 设置大流、小流的分辨率的 “比例” 需要保持一致，否则调用接口会出错。

    在指定编码格式为 “大小流编码” 的情况下，支持分别设置大流和小流的分辨率、帧率和码率，详情请参考 [视频大小流和分层编码](https://doc-zh.zego.im/article/17950)。

    相关 API 请参考 [ZegoExpressEngine > setVideoConfig](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#set-video-config), [setPublishDualStreamConfig](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#set-publish-dual-stream-config)

2. 万人范围音视频、游戏语音支持配置 3D 音效距离的衰减范围

    在万人范围音视频、游戏语音场景中，支持设置 3D 音效距离的衰减范围区间 [min, max]。距离小于 min 时，音量不会随着距离的增加而衰减；距离大于 max 时，将无法听到对方的声音。

    相关 API 请参考 [setReceiveRange](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoRangeSceneStream#set-receive-range), [setAudioReceiveRange](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoRangeAudio#set-audio-receive-range)

3. 新增屏幕采集区域发生变化时的回调通知

    新增屏幕采集区域发生变化时的回调通知 [onRectChanged]。在开始屏幕采集后，当采集区域发生变化时，SDK 会通过此回调通知开发者，开发者通过监听此回调，可以修改预览画面大小等配置。

    相关 API 请参考 [onRectChanged](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoScreenCaptureSourceEventHandler#on-rect-changed)

4. 新增错误码提示

    新增语音检测（1018xxxxx）、万人范围音视频（1019xxxxx）、屏幕采集（1020xxxxx）三个模块的错误码，详情请参考 [常见错误码](https://doc-zh.zego.im/article/5638)。

**改进优化**

1. 优化 SDK 内部逻辑，减少 400KB ~ 600KB 的内存占用

2. 优化 SDK 视频采集策略，提升画质

3. 在断网导致的推拉流重试状态中，支持回调本地网络质量

    相关 API 请参考 [onNetworkQuality](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoEventHandler#on-network-quality)

4. 支持在调用 [destroyEngine] 接口后，生成日志上传任务

    相关 API 请参考 [submitLog](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~ZegoExpressSDK#submit-log)

5. 优化 SDK 的内部逻辑，提升弱网环境下的通话体验

**问题修复**

1. 修复 MediaRecorder、AudioObserver 停止推流后，未恢复本地推流，继续采集的问题

2. 修复 NetMonitor 模块多线程死锁的问题




## 3.6.0 版本 <a id="3.6.0"></a>

**发布日期： 2023-06-09**


**新增功能**

1. 新增 Enhanced KTV 混响效果

    新增增强型 KTV 混响效果，实现更集中、亮度更好的 KTV 人声效果。与之前的 KTV 混响音效相比，Enhanced KTV 混响效果缩短了混响时长，提高了干湿比。

    原有的 KTV 混响音效仅适用于人声瑕疵较为明显的用户，增强型 KTV 混响效果适用于大多数专业用户和普通用户。

    相关 API 请参考 [setReverbPreset](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#set-reverb-preset)

2. 游戏语音功能支持媒体播放器&音效播放器使用 3D 音效

    开发者可以通过设置媒体播放器、音效播放器的位置和朝向，实现本地音频、在线音频资源的 3D 音效。该功能可用于在虚拟场景中设置物品的音效、以及指定位置的背景音乐等。

    相关 API 请参考 [ZegoMediaPlayer > updatePosition](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoMediaPlayer#update-position), [ZegoAudioEffectPlayer > updatePosition](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoAudioEffectPlayer#update-position)

3. 媒体播放器支持获取媒体流视频信息

    针对媒体播放器正在播放的视频文件，开发者可以主动获取视频的分辨率、帧率等信息。

    相关 API 请参考 [getMediaInfo](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoMediaPlayer#get-media-info)

4. 媒体播放器倍速功能最大支持 4 倍速

    媒体播放器倍速的上限提升到 4 倍速。例如，用户在播放音视频文件时，如果已设置为 2 倍速播放，长按屏幕时可以加速至 4 倍速。

    相关 API 请参考 [ZegoMediaPlayer > setPlaySpeed](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoMediaPlayer#set-play-speed)

**问题修复**

1. 修复使用媒体播放器时可能会导致内存泄露的问题




## 3.5.0 版本 <a id="3.5.0"></a>

**发布日期： 2023-05-11**


**新增功能**

1. 新增音视频推流的首帧回调

    在进行音视频推流时，通过 [onPublisherSendAudioFirstFrame]、[onPublisherSendVideoFirstFrame] 回调，监听“首帧音频”或“首帧视频”的发布时机。该功能可用于统计音视频推流的耗时、或更新 UI 表现等。

    相关 API 请参考 [onPublisherSendAudioFirstFrame](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoEventHandler#on-publisher-send-audio-first-frame), [onPublisherSendVideoFirstFrame](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoEventHandler#on-publisher-send-video-first-frame)

2. 媒体播放器支持音视频渲染完成后的首帧回调

    在通过媒体播放器进行音视频渲染时，通过 [onMediaPlayerFirstFrameEvent] 回调，监听渲染完成后的“首帧音频”或“首帧视频”的发布时机。该功能可用于音视频渲染的耗时、或更新 UI 表现等。

    相关 API 请参考 [onMediaPlayerFirstFrameEvent](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoMediaPlayerEventHandler#on-media-player-first-frame-event)

3. 外部采集支持主动偏移 NTP 时间戳

    注意：如需使用该功能，请联系 ZEGO 技术支持。

    使用外部采集功能时，支持通过实验性 API 接口主动偏移 NTP 时间戳。该功能可用于 KTV 的合唱、伴奏、歌词对齐等场景。

4. 媒体推流器新增支持推流配置

    注意：该接口需要在 [createEngine] 之后调用，重复调用该接口会返回之前已创建的实例。

    支持通过 [createMediaDataPublisher] 接口，分别配置媒体推流器的推流通道、媒体内容等信息。

    相关 API 请参考 [createMediaDataPublisher](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#create-media-data-publisher)

5. 多房间模式下支持快速切换房间

    多房间模式下，支持通过 [switchRoom] 接口，快速便捷地实现切换房间的功能。

    相关 API 请参考 [switchRoom](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#switch-room)

6. 支持自主维护 AEC（回声消除）的参考信号

    注意：

1. 如需使用该功能，请联系 ZEGO 技术支持。

2. 启动拉流以后，调用该接口才会生效。

    支持开发者通过 [sendReferenceAudioPCMData] 接口，输入需要消除的声音（即参考信号），直接消除。

    该功能可用于自定义采集渲染场景中。例如：用户外放背景音乐，同时上麦进行发言，其中背景音乐不是使用自定义渲染或外部渲染的声音，可通过该功能消除推流中包含的背景音乐回声。

    相关 API 请参考 [sendReferenceAudioPCMData](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#send-reference-audio-pcm-data)

**问题修复**

1. 修复媒体播放器在部分 m3u8 文件格式中，不能通过 seekTo 接口使播放进度跳转到 0 的问题

2. 修复重新推流后，拉流端视频卡顿的偶现问题

**废弃删除**

1. 从 3.5.0 版本开始，废弃了对 macOS 10.13 以下版本的支持，macOS Deployment Target（最低支持版本）提升到 macOS 10.13

    具体说明，请参考 [App Store submission requirement starts April 25](https://developer.apple.com/news/?id=jd9wcyov) 及 [Xcode 14 Release Notes](https://developer.apple.com/documentation/xcode-release-notes/xcode-14-release-notes#Build-System)。




## 3.4.0 版本 <a id="3.4.0"></a>

**发布日期： 2023-04-14**


**新增功能**

1. 新增地理围栏功能

    注意：

1. 如需使用该功能，请联系 ZEGO 技术支持。

2. 请在创建引擎之前，配置地理围栏信息。

    将音视频及信令数据访问限定在某一区域，用以满足地区数据隐私安全相关法规，即限定用户访问某一特定区域的音视频服务，详情请参考 [地理围栏](https://doc-zh.zego.im/article/17762)。

    相关 API 请参考 [setGeoFence](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~ZegoExpressSDK#set-geo-fence)

2. 媒体播放器支持播放透明特效

    媒体播放器支持通过渲染 Alpha 通道，实现播放透明特效文件功能，详情请参考 [播放透明礼物特效](https://doc-zh.zego.im/article/17574)。

    相关 API 请参考 [loadResourceWithConfig](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoMediaPlayer#load-resource-with-config)

3. 状态同步及万人范围音视频支持主动拉流

    状态同步及万人范围音视频功能支持通过流 ID 主动拉流或自定义拉流。该功能可实现无论距离多远都保持拉流的玩法，适用于虚拟世界中存在大屏或主播时，虚拟世界中任何一个地方的观众都可以通过拉流得到大屏或者主播声音的场景。

4. 媒体播放器支持边下载、边回调数据解密、边播放的功能

    针对在线播放器的版权音乐保护，媒体播放器支持边下载边回调未解密的二进制数据，由开发者解密后再传回媒体播放器播放，过程中不会产生文件或缓存文件。

    相关 API 请参考 [setBlockDataHandler](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoMediaPlayer#set-block-data-handler)

5. 支持动态切换流控策略

    支持动态开关流量控制功能，同时支持设置流量控制属性等。

    相关 API 请参考 [enableTrafficControl](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#enable-traffic-control), [setMinVideoBitrateForTrafficControl](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#set-min-video-bitrate-for-traffic-control), [setMinVideoFpsForTrafficControl](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#set-min-video-fps-for-traffic-control), [setMinVideoResolutionForTrafficControl](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#set-min-video-resolution-for-traffic-control)

**改进优化**

1. 优化 SDK 内存占用

    删除 SDK 内部一些没必要的内存申请，优化 SDK 内存使用率，相比上个版本，内存使用率减少了 10% 左右。

**问题修复**

1. 修复 macOS 平台屏幕共享实际采集帧率小于设置的帧率的问题

**废弃删除**

1. 废弃 [onPlayerRecvSEI] 回调

    注意：接口替换可能存在兼容性问题，请您注意查看 [onPlayerRecvSEI] 回调的废弃说明。

    为规避数据同步异常的情况，将在 3.4.0 及以上版本，废弃 [onPlayerRecvSEI] 回调，若需收取远端流的 SEI 内容，请使用 [onPlayerSyncRecvSEI] 回调替代。

    相关 API 请参考 [onPlayerSyncRecvSEI](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoEventHandler#on-player-sync-recv-sei), [onPlayerRecvSEI](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoEventHandler#on-player-recv-sei)




## 3.3.0 版本 <a id="3.3.0"></a>

**发布日期： 2023-03-10**


**新增功能**

1. 支持外放场景下的人声增强效果

    在外放场景中，设备的麦克风与扬声器过近，容易导致人声模糊或沉闷。在该场景下，人声增强可以有效提升人声清晰度并改善沉闷感，因此在外放场景下，建议开启该功能。

    为实现外放场景下的人声增强效果，可开启人声增强音效并设置增强等级，增强等级推荐配置为 4，可用于 KTV 外放场景下，精细控制人声效果。

    相关 API 请参考 [enableSpeechEnhance](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#enable-speech-enhance)

2. 游戏语音支持自定义设置发声模式和收听模式

    游戏语音支持自定义设置发声模式和收听模式，可用于实现加入小队后，需屏蔽非范围内的同一小队玩家的场景。

    相关 API 请参考 [setRangeAudioCustomMode](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoRangeAudio#set-range-audio-custom-mode)

3. 单流转码功能支持 L3 或 CDN 拉流

    注意：通过 CDN 拉取转码流时，必须使用转推 CDN。如需使用该功能，请联系 ZEGO 技术支持。

    单流转码，指在云端把每条原始流转换为不同编码格式、不同分辨率的转码流。拉流时需传入转码模板 ID 拉取转码流。在直播等场景中，观众可以基于接入网络质量、终端设备等，自行选择不同分辨率的流进行观看，以保证播放的流畅性。

4. 同一个混流任务支持输出多个分辨率的视频流

    注意：

1. 目前 1 个混流任务最多支持输出 4 路不同分辨率的视频流，且目前仅支持服务端混流。

2. 如需使用该功能，请联系 ZEGO 技术支持。

    同一个混流任务支持输出多个分辨率的视频流，可用于实现混流场景下的转码需求。

5. 混流任务支持输入超级白板信息

    混流功能支持将白板中的操作内容转成实时视频，且支持设置白板配置信息，例如，设置白板 ID、白板宽高比、是否支持加载动态 PPT 等。

6. 场景化音视频配置新增 [StandardVoiceCall] 标准语音通话场景

    场景化音视频配置新增 [StandardVoiceCall] 标准语音通话场景，适用于 1v1 纯语音通话场景，详情请参考 [场景化音视频配置](https://doc-zh.zego.im/article/16319)。

    相关 API 请参考 [setRoomScenario](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#set-room-scenario)

**改进优化**

1. 优化 KTV 场景的回声消除（AEC）效果

    针对 KTV 场景的 AEC 优化，实现了：

1. 大幅度提高外放场景下的人声音质，使人声更保真。

    2.消除回声的同时，有效避免偶现的吞字或人声起伏的现象。




## 3.2.1 版本 <a id="3.2.1"></a>

**发布日期： 2023-02-23**


**问题修复**

1. 修复某些场景下，重新登录房间后，自定义音频采集及音频采集源需重新设置才能生效的问题




## 3.2.0 版本 <a id="3.2.0"></a>

**发布日期： 2023-01-13**


**新增功能**

1. 范围场景支持设置推拉流模式

    范围场景支持设置推拉流模式，推拉流模式包括：是否允许拉取范围内的流、是否允许推流到世界。

    相关 API 请参考 [enablePlayInRange](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~struct~ZegoSceneStreamConfig#enable-play-in-range), [enablePublishToWorld](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~struct~ZegoSceneStreamConfig#enable-publish-to-world)

2. 支持视频大小流功能

    通过视频大小流编码（H.264 DualStream）对视频进行码流分层时，相比较于分层视频编码（H.264 SVC），视频大小流编码（H.264 DualStream）支持使用硬件编码，即 [ZegoVideoCodecID] 新增 [ZegoVideoCodecIDH264DualStream] 字段，详情请参考 [设置视频编码方式](https://doc-zh.zego.im/article/10186)。

    相关 API 请参考 [ZegoVideoCodecIDH264DualStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~enum~ZegoVideoCodecID#zego-video-codec-idh264dual-stream)

3. 主体分割支持实景分割与绿幕分割，内部渲染支持 Alpha 通道

    注意：本功能为内测功能，如需接入体验，请联系 ZEGO 商务人员。

1. Android、iOS、Windows、macOS（暂只支持 Apple 芯片）四端支持实景分割与绿幕分割。

2. 内部渲染支持 Alpha 通道，开发者不需要使用自定义渲染，即可实现主体与背景的混合。

**改进优化**

1. 自定义信令配置支持扩展到 4KB

    注意：自定义信令配置默认大小为 1KB，如需扩展到 4KB，请联系 ZEGO 技术支持进行处理。

**问题修复**

1. 修复网络时间模块重试失败的问题




## 3.1.0 版本 <a id="3.1.0"></a>

**发布日期： 2022-12-09**


**新增功能**

1. “多人实时状态同步”功能支持物品状态同步与物品锁能力

    注意：如需使用该功能，请联系 ZEGO 技术支持。

    通过该能力可快速实现移动及放置物品、抢占物品等互动玩法。以“抢椅子”玩法为例：

1. 首先您需要提前通过 [createItem] 接口创建您视野范围内的“椅子”。

2. 当您靠近“椅子”时，通过 [bindItem] 抢占“椅子”，获得其使用权。

3. 假设您只允许 1 个用户抢占”椅子“，在您通过 [unbindItem] 释放权限前，其他用户都将无法抢占。

4. 当您“坐在椅子上”时，可以通过 [updateItemStatus] 及 [updateItemCommand] 更新“椅子”的状态/指令，通知其他用户“您正坐在椅子上”。

    相关 API 请参考 [createItem](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoRangeSceneItem#create-item), [bindItem](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoRangeSceneItem#bind-item), [unbindItem](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoRangeSceneItem#unbind-item), [updateItemStatus](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoRangeSceneItem#update-item-status), [updateItemCommand](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoRangeSceneItem#update-item-command)

2. “万人范围音视频”及“多人实时状态同步”功能支持使用场景模板

    注意：如需使用该功能，请联系 ZEGO 技术支持。

    虚拟场景中，由于每个场景的地图大小、音视频互动玩法及规模不同，需要针对每个场景进行自定义配置。3.1.0 版本后，“万人范围音视频”及“多人实时状态同步”支持通过 SDK 接口，并使用模板 ID 指定场景。模板 ID 对应的配置项只能通过服务器 API 进行配置，详情请参考 [服务端 API - 场景模版配置](/real-time-video-server/api-reference/scene/set-scene-template)。

    相关 API 请参考 [templateID](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~struct~ZegoSceneParam#template-id)

3. “万人范围音视频”及“多人实时状态同步”功能支持使用 Token 基础鉴权

    注意：如需使用该功能，请联系 ZEGO 技术支持。

    用户在登录场景时，可以带上 Token 参数，以验证合法性。

    相关 API 请参考 [ZegoSceneParam > token](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~struct~ZegoSceneParam#token), [ZegoRangeScene > renewToken](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoRangeScene#renew-token)

4. 支持多源采集能力

    面向在线 KTV、一起看电影、看比赛等、视频会议、在线教育等音视频源丰富多样的互动场景，多源采集提供了灵活易用的音视频采集源与通道管理能力，大量减少开发者的开发及维护成本。

    多源采集能力对屏幕共享、混音等常见能力的实现路径，进行缩短优化及归一化设计，从 3.1.0 版本后，您可以不用再通过自定义采集实现上述复杂的能力，详情请参考 [多源采集](https://doc-zh.zego.im/article/16890) 。

    主要能力特性如下：

1. 推流通道支持设置或切换多种音视频源。

2. 支持屏幕共享、混音等常见能力。

5. SDK 支持设置云代理

    注意：如需使用该功能，请联系 ZEGO 技术支持。

    通过设置 SDK 的云代理接口，将 SDK 对应的所有流量通过云端的代理服务器进行中转，实现与 RTC 通信，详情请参考  [云代理](https://doc-zh.zego.im/article/16875) 。

    相关 API 请参考 [setCloudProxyConfig](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~ZegoExpressSDK#set-cloud-proxy-config)

**改进优化**

1. 大幅度提升极端弱网地区的音视频连通率，并降低连通耗时

    ZEGO 自研调度系统针对网络质量极差地区进行了深度优化。

**问题修复**

1. 修复发送房间 [Logout] 信令可能失败的问题




## 3.0.3 版本 <a id="3.0.3"></a>

**发布日期： 2022-11-25**


**问题修复**

1. 修复 iOS、macOS、Windows 平台硬件解码可能会崩溃的问题




## 3.0.2 版本 <a id="3.0.2"></a>

**发布日期： 2022-11-15**


**问题修复**

1. 修复多房间模式下，停止推流时，房间内其他人收不到流删除通知的问题




## 3.0.0 版本 <a id="3.0.0"></a>

**发布日期： 2022-10-28**

<Warning title="注意">


本次更新包含不兼容改动，详情请参考 [v3.0.0 升级指南](https://doc-zh.zego.im/article/16408)。

</Warning>



**新增功能**

1. 场景化 AI 降噪新增在音乐场景下降噪的能力

    注意：如需使用该功能，请联系 ZEGO 技术支持。

    场景化 AI 降噪功能，在之前针对所有非人声进行降噪的基础上，新增支持在音乐场景下的降噪能力，通过识别音乐，智能调整降噪效果还原音乐音质。SDK 会实时对麦克风输入内容进行音乐检测，在声卡、弹唱或近场音乐场景下，自动调整降噪等级，保证音乐的高保真音质，详情请参考 [场景化 AI 降噪](https://doc-zh.zego.im/article/14977)。

2. 新增房间维度的场景 Scenario

    为方便开发者快速接入，降低开发者接入门槛，SDK 提供多种预设场景。开发者可根据所需场景，选择对应的房间模式 [ZegoScenario]，SDK 将自动应用适合该场景的音视频编解码器、音视频参数、流控策略等配置，从而快速实现该场景下的最佳效果。

    当前支持场景包括秀场直播、KTV、标准 1v1 音视频通话、高画质 1v1 音视频通话、标准语聊房、高音质语聊房，详情请参考 [场景化音视频配置](https://doc-zh.zego.im/article/16319)。

    相关 API 请参考 [setRoomScenario](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#set-room-scenario)

3. 支持获取当前设备指定视频编解码器的编解码能力支持情况

    SDK 支持获取当前设备指定视频编解码器的编解码模式的支持情况，从而更好的帮助开发者选择使用的编码器及编码模式并获得更好的效果。

    通过 [isVideoEncoderSupported] 接口，可获取当前编码器的硬件或软件编码支持情况。

    通过 [isVideoDecoderSupported] 接口。可获取当前解码器的硬件或软件解码支持情况。以上两个接口均包含三个枚举值：支持硬件或软件，支持硬件，支持软件。

    以 Android 端为例，isVideoEncoderSupported(ZegoVideoCodecID.H265, ZegoVideoCodecBackend.HARDWARE)，即表示检查当前设备是否支持 H265 的硬编，若支持，则返回 true。

    相关 API 请参考 [isVideoEncoderSupported](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#is-video-encoder-supported), [isVideoDecoderSupported](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#is-video-decoder-supported)

4. 新增获取 GPS 信息开关接口

    注意：该功能默认开启，如需关闭该功能，请联系 ZEGO 技术支持。

    在 App 有获取地理位置权限的情况下，开发者可以选择是否允许 ZEGO SDK 获取系统缓存的 GPS 信息，默认进行获取。当开发者希望关闭该功能时，需要联系 ZEGO 技术支持进行设置。

5. 新增基于摄像头打开后的视频首帧回调

    支持每次开启远端摄像头后，SDK 拉流并渲染完第一帧远端摄像头视频数据后进行回调，开发者可利用该回调统计首帧耗时，或更新播放流的 UI 组件。

    相关 API 请参考 [onPlayerRenderCameraVideoFirstFrame](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoEventHandler#on-player-render-camera-video-first-frame)

**改进优化**

1. 针对 1v1 纯 RTC 通话场景进行优化

    注意：如需使用该功能，请联系  ZEGO 技术支持。

    针对 1v1 通话场景进行了优化，适用在纯 RTC 场景下使用。

2. 优化空间音频功能

    对空间音频能力进行了优化，用户可以区分前后音源，从而达到更好的沉浸感。

3. 优化极端弱网下的音视频体验

    SDK 优化了内部策略，在音视频的场景下，支持最小下行 50 kbps 拉流不卡顿，保障更好的极端弱网下的体验。

**问题修复**

1. 修复了 Mac M1 芯片电脑在部分系统版本下，Web 端开启硬件编码推流，并采用多 SPS（Sequence Paramater Set，又称序列参数集）、PPS（Picture Paramater Set，又称图像参数集）的输出形式 ，Native SDK  拉流会出现解码花屏的问题

2. 修复了网络状态从有网络切换到无网络时，当前正在上传的日志有可能出现崩溃的问题

3. 修复了 GetCallbackController 非线程安全问题​

4. 修复了 SDK 在没有 View 的情况下，没有触发 [onPlayerRenderVideoFirstFrame] 的问题

**废弃删除**

1. 废弃了 [ZegoScenario] 的三种旧版本场景

    废弃 [ZegoScenario] 场景枚举中的 [General]，[Communication]， [Live] 三种场景，详情请参考 [场景化音视频配置](https://doc-zh.zego.im/article/16319)。

2. 删除了 [setDebugVerbose]、[setPlayStreamVideoLayer]、[enableAudioDataCallback] 等接口，详情请参考 [v3.0.0升级指南](https://doc-zh.zego.im/article/16408)。




## 2.23.0 版本 <a id="2.23.0"></a>

发布日期： 2022-09-09**


**问题修复**

1. 修复多房间模式下，在网络切换（Wi-Fi 或蜂窝网络）期间调用 [loginRoom] 可能无回调的问题

2. 修复范围语音功能在退出小队后，在范围距离外还能听到原小队内的人的声音的问题




## 2.22.0 版本 <a id="2.22.0"></a>

**发布日期： 2022-08-09**


**新增功能**

1. 新增支持 SOCKS5 本地代理

    若在内网或防火墙场景下，您可以通过代理服务器与公网交互，并通过 [setEngineConfig] 设置代理服务器地址，保证 ZEGO 音视频云服务正常，目前仅支持 SOCKS5 协议，详情请参考 <a href="/real-time-video-ios-oc/communication/local-proxy" target="_blank" rel="noopener noreferrer">本地代理</a>。

    相关 API 请参考 [setEngineConfig](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~ZegoExpressSDK#set-engine-config)

2. 自定义视频采集功能支持 H.265 码流

    注意：1. 推荐每 2s 一个 GOP，每个 I 帧必须携带 SPS 和 PPS，且放在最前面。调用 [enableCustomVideoCapture] 时，传递的参数类型必须为 [ZegoVideoBufferTypeEncodedData]。2. 不支持输入 B 帧。

    相关 API 请参考 [enableCustomVideoCapture](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#enable-custom-video-capture)

3. 支持查询当前 SDK 具备的功能特性

    由于 SDK 支持特性裁包，部分特性可能已被裁剪；可以使用此函数快速判断当前 SDK 是否支持指定的功能特性。

    相关 API 请参考 [isFeatureSupported](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~ZegoExpressSDK#is-feature-supported)

**改进优化**

1. 优化网络质量回调，感知远端用户异常状态

    当远端用户异常时，[onNetworkQuality] 每 2s 回调一次质量未知状态（ZegoStreamQualityLevelUnknown 状态），当用户该状态持续 8s 后，则认为远端用户已异常断开，此时回调质量异常状态（ZegoStreamQualityLevelDie 状态）。

    相关 API 请参考 [onNetworkQuality](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoEventHandler#on-network-quality)

2. 优化网络质量回调，网络质量反馈更灵敏

    推拉流质量回调会每隔 3s 回调一次质量最差的结果，当周期内出现严重的抖动或丢包时，能够立刻反馈出流质量差。

    相关 API 请参考 [onPlayerQualityUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoEventHandler#on-player-quality-update), [onPublisherQualityUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoEventHandler#on-publisher-quality-update), [onNetworkQuality](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoEventHandler#on-network-quality)

3. 优化日志上报策略

    优化日志上报策略，提高日志上传效率。

4. 优化 AGC 的谐波检测算法

    AGC 新改进的谐波检测算法存在崩溃问题，现回退至老版本的谐波检测算法。

**问题修复**

1. 修复网络模块极低概率崩溃的问题




## 2.21.1 版本 <a id="2.21.1"></a>

**发布日期： 2022-07-14**


**问题修复**

1. 修复纯音频场景发送 SEI 失败的问题




## 2.21.0 版本 <a id="2.21.0"></a>

**发布日期： 2022-07-08**


**新增功能**

1. 范围语音支持自定义距离更新频率

    SDK 默认的距离更新频率由 1s 改为 100ms，能够基本满足大部分开发者使用范围语音时的平滑衰减效果，优化了使用范围语音时声音衰减的体验，可以实现更平滑、自然的衰减效果。

    若希望与实际的业务效果进行更优的匹配，可调用 [setPositionUpdateFrequency] 接口自行进行修改频率。

    相关 API 请参考 [ZegoRangeAudio > setPositionUpdateFrequency](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoRangeAudio#set-position-update-frequency)

1. 支持设置低照度增强

    注意：应在调用 [createEngine] 接口创建引擎后，再调用 [setLowlightEnhancement] 接口。

    当推流端用户周围环境较暗、或摄像头设置的帧率较高，导致直播画面比较暗，无法正常显示或识别主体的情况下，可调用 [setLowlightEnhancement] 接口，设置低照度增强，提升视频画面亮度。低照度增强功能包含三种模式：1：不开启低照度增强（默认）、2：开启低照度增强 、3：自动开关低照度增强。

    开发者可以根据业务场景选择不同的低照度增强模式：当希望自行判断是否需要进行低照度增强时，可以通过切模式 1 和 2 来控制；当希望 SDK 自动增强时，可以使用模式 3 ，SDK 将自动判断用户所处的光照环境，开启或关闭低照度增强。

    相关 API 请参考 [setLowlightEnhancement](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#set-lowlight-enhancement)

2. 混流支持设置视频边框为圆角

    在调用 [startMixerTask] 接口混流时，开发者可以通过 [ZegoMixerInput] 类型参数，设置 [cornerRadius]（视频画面圆角半径），将视频边框设置为圆角。[cornerRadius] 的单位为 px，取值不得超过视频画面宽高中较短者的一半。

    相关 API 请参考 [startMixerTask](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#start-mixer-task)

3. 拉流接口增加 CDN Plus 拉流配置项

    注意：若希望通过地区、用户等更多维度，从云端控制拉流方式，请联系 ZEGO 技术支持进行相关配置。

    拉流接口新增 CDN_PLUS 的拉流资源模式（ZegoStreamResourceMode），开发者可按流维度自行开启使用CDN_PLUS 拉流。CDN Plus 拉流是比 CDN 拉流直播质量更高，但是价格接近 CDN 的一种性价比高的拉流方式，详情请参考 <a href="/live-streaming-android/introduction/overview" target="_blank" rel="noopener noreferrer">CDN Plus 拉流</a>。

    相关 API 请参考 [startPlayingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#start-playing-stream)

**改进优化**

1. 优化开启强制登录鉴权时，Token 异常的相关错误码

    新增 1002074、1002075、1002076、1002077、1002078、1002079、1002080 等错误码。开启强制登录鉴权后，如果 Token 错误时，会返回这些错误码，详情请参考 <a href="/real-time-video-ios-oc/client-sdk/error-code#1002xxx-房间相关的错误码" target="_blank" rel="noopener noreferrer">常见错误码</a> 中的详细解释和处理建议。

**问题修复**

1. 修复当关闭自定义视频前处理功能时，会触发多次 [onStop] 回调的问题

    相关 API 请参考 [enableCustomVideoProcessing](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#enable-custom-video-processing)

2. 修复一个 L3 拉流失败的问题

    修复 2.20.0 ~ 2.20.2 版本 SDK 采用 L3 拉流时，如果拉到的流是 2.15.0 及之前版本 SDK 推送的流，可能会失败的问题。




## 2.20.2 版本 <a id="2.20.2"></a>

**发布日期： 2022-06-20**


**问题修复**

1. 修复了在初始化 SDK 前设置音频设备模式不生效的问题


## 2.20.1 版本 <a id="2.20.1"></a>

**发布日期： 2022-06-18**


**问题修复**

1. 修复了一个概率性拉流失败的问题




## 2.20.0 版本 <a id="2.20.0"></a>

**发布日期： 2022-06-09**


**新增功能**

1. 媒体播放器支持设置声道

    在调用 [createEngine] 接口初始化引擎以及 [createMediaPlayer] 接口创建媒体播放器后，可以调用 [setActiveAudioChannel] 接口设置左声道、右声道或全部声道。初始化时，媒体播放器默认为全部声道。

    相关 API 请参考 [setActiveAudioChannel](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoMediaPlayer#set-active-audio-channel)

2. 媒体播放器支持结束播放时清除最后一帧画面

    注意：必须等待媒体播放器结束播放后，接口调用才能生效。

    调用 [createEngine] 接口初始化引擎，调用 [createMediaPlayer] 接口创建媒体播放器，可以调用 [clearView] 清除遗留的最后一帧画面。

    相关 API 请参考 [ZegoMediaPlayer > clearView](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoMediaPlayer#clear-view)

3. 支持开启摄像头自适应帧率

    注意：当通过 [setVideoConfig] 设置的帧率小于 [enableCameraAdaptiveFPS] 期望帧率最小值时，将使用 [setVideoConfig] 设置的帧率值。由于不同的手机厂商的硬件和算法策略不同，该接口在不同的机型或同一机型的前后摄像头上，效果存在一定差异。

    当推流端用户设置的帧率较高，而所处环境光照较低无法正常显示或识别主体的情况下，可以调用 [enableCameraAdaptiveFPS] 接口，在一定范围内自动降低帧率来增加曝光时间，从而提升视频画面亮度。该功能常用于对曝光要求较高的直播场景。[enableCameraAdaptiveFPS] 接口需在调用 [createEngine] 接口初始化引擎之后，启动摄像头前调用。

    相关 API 请参考 [enableCameraAdaptiveFPS](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#enable-camera-adaptive-fps)

4. 支持设置混流中单条输入流的图片信息

    注意：图片地址长度不得超出1024 字节，否则出现错误码 1005034；图片格式应为 JPG 和 PNG 格式，否则出现错误码 1005035；图片不得超过 1M，否则出现错误码 1005036。

    支持通过 [startMixerTask] 接口的 [ZegoMixerImageInfo] 类型参数，设置图片地址，将单条输入流的内容设置为图片，用于替代视频，即当使用图片时不显示视频。该功能的使用场景为连麦时，视频用户可能需要暂时关闭摄像头而显示其图片，或者当视频用户和音频用户连麦，需要显示音频用户的图片。

    相关 API 请参考 [startMixerTask](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#start-mixer-task)

5. 支持设置调用 mutePlayStreamVideo 后是否清除最后一帧

    注意：如需使用该功能，请联系 ZEGO 技术支持。

    开发者发现推流用户违规时，调用 [mutePlayStreamVideo] 接口暂停拉流用户拉取违规用户的视频流，要求违规用户整改。同时使用本功能，可避免因拉流用户的视频界面依然保留最后一帧导致的违规风险。

6. 支持线性增长的音量增益

    注意：如需使用该功能，请联系 ZEGO 技术支持。

    提供新的音量增益方式，开发者可以根据实际需求选择合适的音量增益方式。

7. 支持设置流级别的音视频自动审核

    注意：如需使用该功能，请联系 ZEGO 技术支持开通后台服务。

    在调用 [startPublishingStream] 接口开始推流时，开发者可以设置 [ZegoStreamCensorshipMode] 参数，进行流级别的音视频自动审核，包含如涉黄、涉政等审核类型，以此降低开发者的接入难度和业务维护成本。

    相关 API 请参考 [startPublishingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#start-publishing-stream)

**改进优化**

1. 统一 Express 实时音视频和实时语音 SDK 的接口

    从 v2.20.0 版本起，实时音视频和实时语音之间不再有 API 的差异，即可以随时从实时音视频 SDK 切换到实时语音 SDK，反之亦然。两种 SDK 之间唯一的区别是对于实时语音 SDK 来说，部分跟视频相关的 API （比如视频编码参数设置、预览和拉流的 ZegoCanvas 参数等）设置后没有效果，但不会报错。注意此次改动可能会产生极少数不兼容问题，具体请参考 FAQ 文档 <a href="https://doc-zh.zego.im/faq/express_2.20.0_upgrade_guide?product=ExpressVideo&platform=all" target="_blank" rel="noopener noreferrer">升级 Express v2.20.0 或以上版本后编译报错？</a>。

2. 开发者传入不存在的 AppID 时报错的错误码从 1002099 优化为 1001004

3. 优化回声消除，解决 KTV 等场景的吞音现象

4. 新增 1009013 错误码

    表示消息输入长度超出限制。出现此错误码时，请检查输入内容长度或联系 ZEGO 技术支持扩展消息内容长度。

5. 新增 1017009 错误码

    在版权音乐初始化时，由于未设置 AppSign 或 Token，导致鉴权失败，会出现此错误码。此时，如果是使用 AppSign 鉴权，请在初始化 SDK 时传入 AppSign；如果是使用 Token 鉴权，在调用 [initCopyrightedMusic] 接口前，请调用 [loginRoom] 接口并传入 Token，以供鉴权。

    相关 API 请参考 [initCopyrightedMusic](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoCopyrightedMusic#init-copyrighted-music), [loginRoom](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#login-room)

**问题修复**

1. 修复了自定义采集 AAC 音频格式的报错问题




## 2.19.0 版本 <a id="2.19.0"></a>

**发布日期： 2022-05-11**


**新增功能**

1. 直推 CDN 的流支持通过 L3 拉流

    直推 CDN 时，在不改变推流方式的情况下，SDK 从客户的 CDN 源站拉流，通过 L3 将音视频内容分发给观众，通过 [ZegoResourceType] 控制源站资源。该功能常用于直播场景。

    相关 API 请参考 [startPlayingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#start-playing-stream)

2. 音视频场景下支持 SEI 数据随音频帧同步

    注意：目前只支持 RTC 场景，直推 CDN 和转推 CDN 场景下无效。

    从 2.19.0 版本开始，支持在音视频场景下将 SEI（媒体补充增强信息）与音频帧同步发送。该功能常用于 SEI 与音频强相关的视频场景，例如实时 KTV。

    在 2.19.0 之前版本中，SEI 数据是跟随视频帧数据一起发送，一般情况下视频帧率远低于音频帧率，导致混流对齐、伴奏对齐场景下等 SEI 精度/频率不足。

    相关 API 请参考 [onPlayerRecvAudioSideInfo](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoEventHandler#on-player-recv-audio-side-info), [sendAudioSideInfo](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#send-audio-side-info)

**改进优化**

1. 为了提高安全性，此版本将 curl 升级到 7.82.0

**问题修复**

1. 修复了调用网络测速接口后立刻调用开始推流接口时，收不到网络测速回调的问题

2. 修复了 H.265 在只进行本地媒体录制时（未推流）不生效的问题

3. 修复了当开启自定义视频采集功能时 [onEncodedDataTrafficControl] 不回调的问题




## 2.18.1 版本 <a id="2.18.1"></a>

**发布日期： 2022-04-13**


**问题修复**

1. 修复了日志上报时，日志文件收集异常的问题




## 2.18.0 版本 <a id="2.18.0"></a>

**发布日期： 2022-04-09**


**新增功能**

1. 新增 AI 降噪功能

    注意：AI 降噪目前会对麦克风采集的音乐有较大损伤，包括人通过麦克风唱歌的声音。如需使用该功能，请联系 ZEGO 技术支持。

    AI 降噪指的是 SDK 会对麦克风采集的声音进行降噪处理，在原有的稳态噪声正常处理的情况下，还会处理非稳态噪声，主要包括鼠标、键盘声、敲击、空调、厨房碗碟、嘈杂餐厅、环境风声、咳嗽、吹气 等非人声噪声。通过 [setANSMode] 接口中的 [ZegoANSMode] 参数设置 AI 降噪模式，并且可以实时调整降噪模式，详情请参考 <a href="/real-time-video-android-java/audio/scenario-based-ai-noise-reduction" target="_blank" rel="noopener noreferrer">AI 降噪</a>。

    该功能常用于通话、会议等没有背景音乐的场景，例如普通音质语聊房、语音会议、语音开黑、一对一视频通话。

    相关 API 请参考 [setANSMode](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#set-ans-mode)

2. 支持设置音效播放器的播放速度

    当音效播放器开始播放音效后， 调用 [ZegoAudioEffectPlayer] 的 [setPlaySpeed] 接口可以对音效设置四种播放速度（会同时设置本地播放速度和推流速度），分别为 0.5 倍速、原始速度、1.5 倍速和 2 倍速，默认为原始速度。

    相关 API 请参考 [ZegoAudioEffectPlayer > setPlaySpeed](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoAudioEffectPlayer#set-play-speed)

3. CDN 直播时支持使用 QUIC 协议推拉流

    QUIC 协议推拉流主要用于改善弱网环境下 CDN 直播质量不稳定的情况，但是改善有限，推荐使用低延时直播，享受高质量且低延时的直播服务。当前支持使用腾讯、网宿两家 CDN 直播产品的 QUIC 协议推流及拉流。

    通过 [enablePublishDirectToCDN] 接口中的 [ZegoCDNConfig] 参数配置推流协议和 QUIC 版本，若想进行 QUIC 协议的自定义 CDN 拉流，需要通过 [startPlayingStream] 中的 [ZegoPlayerConfig] 参数配置拉流协议和 QUIC 版本。

    相关 API 请参考 [enablePublishDirectToCDN](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#enable-publish-direct-to-cdn)

4. 支持监听推拉流的地址和协议相关信息

    发起推流后，可以通过 [onPublisherStreamEvent] 回调实时监听推流状态，该回调会返回当前使用的推流地址、资源类型和协议相关信息。

    发起拉流后，可以通过 [onPlayerStreamEvent] 回调实时监听拉流状态，该回调会返回当前使用的拉流地址、资源类型和协议相关信息。

    相关 API 请参考 [onPublisherStreamEvent](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoEventHandler#on-publisher-stream-event), [onPlayerStreamEvent](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoEventHandler#on-player-stream-event)

5. 支持通过 URL 设置混流水印和混流的输入音量

    调用 startMixerTask 开启或更新混流任务，支持通过 [backgroundUrl] 和 [inputVolume] 分别设置混流水印和混流的输入音量。

    相关 API 请参考 [startMixerTask](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#start-mixer-task)

6. 支持返回登录房间和退出房间结果

    \[loginRoom] 接口新增 [callback] 参数，支持从 [callback] 返回登录房间结果。

    [logoutRoom] 接口新增 [callback] 参数，支持从 [callback] 返回退出房间结果。

    相关 API 请参考 [loginRoom](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#login-room), [logoutRoom](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#logout-room)

7. 新增房间状态变化通知 [onRoomStateChanged]

    当房间的连接状态发生变化时会触发 [onRoomStateChanged] 回调，通过 [ZegoRoomStateChangedReason] 参数提供更加详细的连接状态及状态变化原因。

    相关 API 请参考 [onRoomStateChanged](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoEventHandler#on-room-state-changed)

**改进优化**

1. 混流文字水印支持设置字体边框及颜色

    调用 startMixerTask 接口，通过 [ZegoFontStyle] 中的 [border] 属性可以设置字体是否有边框，通过 [borderColor] 属性可以设置字体边框颜色。

    相关 API 请参考 [startMixerTask](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#start-mixer-task)

2. 完善开始混流接口 [startMixerTask] 返回的错误码

    新增 1005000 错误码，表示未开通混流服务。出现此错误码时，请在 <a href="https://console.zego.im/" target="_blank" rel="noopener noreferrer">ZEGO 控制台</a> 自助开通混流服务（开通步骤请参考 <a href="/console/service-configuration/enable-stream-mixing-service" target="_blank" rel="noopener noreferrer">项目管理 - 服务配置</a> 中的“混流”），或联系 ZEGO 技术支持开通。

    相关 API 请参考 [startMixerTask](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#start-mixer-task)

**问题修复**

1. 修复了某些平台使用 boringssl 加解密异常的问题

2. 修复了硬编失败后未快速回滚软编的问题




## 2.17.2 版本 <a id="2.17.2"></a>

**发布日期： 2022-03-22**


**问题修复**

1. 修复了在使用 [ZegoScenarioCommunication] 场景时，反复启动推拉流可能会发生崩溃的问题。




## 2.17.1 版本 <a id="2.17.1"></a>

**发布日期： 2022-03-11**


**问题修复**

1. 修复了在 32 位机器下推实时音视频流失败的问题




## 2.17.0 版本 <a id="2.17.0"></a>

**发布日期： 2022-03-09**


**新增功能**

1. 支持设置视频帧率和视频分辨率的最小值

    新增 [setMinVideoFpsForTrafficControl] 和 [setMinVideoResolutionForTrafficControl] 接口，可以用于用户网络不佳且开启了流量控制时，通过调用接口设置最低视频帧率及分辨率，帮助用户综合控制视频的显示效果。

    相关 API 请参考 [setMinVideoFpsForTrafficControl](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#set-min-video-fps-for-traffic-control), [setMinVideoResolutionForTrafficControl](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#set-min-video-resolution-for-traffic-control)

2. 支持稳态语音设置检测周期参数

    稳态语音默认检测周期为 3 秒，用户如需修改默认检测周期，可通过 [startAudioVADStableStateMonitor] 接口自定义检测周期参数。

    相关 API 请参考 [startAudioVADStableStateMonitor](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#start-audio-vad-stable-state-monitor)

3. 范围语音新增隐秘小队模式

    新增枚举 [ZegoRangeAudioModeSecretTeam] 隐秘小队模式。在该模式下，同一房间下的用户，收听者既能与同一小队的人交流，也能听到所有在音频接收范围内且为全世界模式发声者的声音，如太空狼人杀游戏场景。

    相关 API 请参考 [setRangeAudioMode](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoRangeAudio#set-range-audio-mode)

4. 新增调试助手功能

    注意：该功能仅在开发阶段使用，请勿在线上版本开启此功能。

    新增 [enableDebugAssistant] 接口，开发者调用该接口开启调试助手功能，SDK 将会打印日志到控制台，并且在 SDK 其他接口的调用出现异常时，UI 会弹窗提示错误。

    相关 API 请参考 [enableDebugAssistant](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#enable-debug-assistant)

**改进优化**

1. 优化了鉴权方式

    2.17.0 及以上版本，在创建引擎时将 AppSign 传空或不传，并且在登录房间时必须传入 Token，鉴权通过后即可使用实时音视频功能，具体请参考 <a href="/real-time-video-android-java/communication/using-token-authentication" target="_blank" rel="noopener noreferrer">使用 Token 鉴权</a>。

    2.17.0 以下版本，在创建引擎时传入 AppSign，鉴权通过后即可使用实时音视频功能。

**问题修复**

1. 修复了字符串类型的参数命名长度超长时可能导致崩溃的问题

2. 修复了当推流端 App 从后台返回前端时，拉流端收不到卡顿结束事件 BreakResume 的问题

3. 修复了其他已知问题




## 2.16.3 版本 <a id="2.16.3"></a>

**发布日期： 2022-02-10**


**问题修复**

1. 修复了同时调用 [loginRoom] 和 [startPublishingStream] 接口时，对端有概率出现收不到流新增通知的问题




## 2.16.2 版本 <a id="2.16.2"></a>

**发布日期： 2022-01-26**


**问题修复**

1. 修复了用户无法接收到登录房间前该房间内其他用户发送的房间附加消息的问题




## 2.16.1 版本 <a id="2.16.1"></a>

**发布日期： 2022-01-20**


**问题修复**

1. 修复已知问题




## 2.16.0 版本 <a id="2.16.0"></a>

**发布日期： 2022-01-14**


**新增功能**

1. 游戏语音支持设置是否接收指定用户的音频数据

    游戏语音模块新增 [muteUser] 接口，本地用户可以根据需要，在初始化游戏语音 [CreateRangeAudio] 之后，通过 [MuteUser] 接口设置是否接收指定远端用户的音频数据。

    该功能常用于游戏场景，例如发声者被墙壁阻挡，则听众不需要接收该声音。

    相关 API 请参考 [muteUser](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoRangeAudio#mute-user)

2. 支持双声道采集

    支持外接音频设备的双声道内部采集，通过 [setAudioCaptureStereoMode] 接口可以设置音频采集声道模式，当开发者开启双声道采集后，使用支持双声道的音频设备，可以采集到双声道的音频数据并进行推流。

    该功能常用于用户对声音的效果比较敏感的场景，例如语音电台、乐器演奏。

    相关 API 请参考 [setAudioCaptureStereoMode](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#set-audio-capture-stereo-mode)

3. 拉流质量回调 [onPlayerQualityUpdate] 中新增 MOS 音质评分

    \[onPlayerQualityUpdate] 回调新增 [mos] 参数，表示对拉流音质的评分。开发者对音频质量比较关注时，可通过该参数了解当前音频的质量情况。

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Common/mos.png" /></Frame>

    相关 API 请参考 [onPlayerQualityUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoEventHandler#on-player-quality-update)

4. 支持 ROI（region of interest）智能视频编码，提升指定区域画质

    注意：目前只有特定的视频编码器支持此功能，如需使用，请联系 ZEGO 技术支持。

    开发者可以调用 [setCustomVideoCaptureRegionOfInterest] 接口设置指定推流通道自定义视频采集编码器的感兴趣区域（ROI），同样码率情况下，ROI 区域内的画质更加清晰。

    该功能常用于远程控制、<a href="/ai-effects-ios-objc/guides/face-detection" target="_blank" rel="noopener noreferrer">人脸检测</a> 等场景。

    相关 API 请参考 [setCustomVideoCaptureRegionOfInterest](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#set-custom-video-capture-region-of-interest)

5. 支持基于 rtmp over quic 协议推流

    注意：如需使用该功能，请联系 ZEGO 技术支持。

    为了在弱网环境下让推流端可以推更高画质的视频流，SDK 支持基于 rtmp over quic 协议来推流。

    该功能常用于单主播直推 CDN、直播 PK 场景。

6. H.265 拉流支持自动降级

    注意：如需使用该功能，请联系 ZEGO 技术支持。

    2.15.0 及之前版本：SDK 在使用 [startPlayingStream] 拉 H.265 编码的流时，如果拉流端出现因硬件性能较差导致解码帧率不足时，SDK 无法主动降级，需要用户先停止拉 H.265 编码的流，再转拉 H.264 编码的流。

    2.16.0 及以上版本：新增 H.265 拉流自动降级策略，在使用 [startPlayingStream] 拉 H.265 编码的流时，SDK 可以根据拉流质量情况，在拉流端硬件性能较差导致解码帧率不足的情况下，会自动降级拉 H.264 编码的流。

    相关 API 请参考 [startPlayingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#start-playing-stream)

**改进优化**

1. 优化了基础美颜功能

    ZEGO 提供了全新的基础美颜功能，为用户呈现出良好的肌肤状态，打造自然的美颜效果。开发者需要在推流前先调用 [startEffectsEnv] 接口初始化美颜环境，然后调用 [enableEffectsBeauty] 接口开启美颜功能。通过 [setEffectsBeautyParam] 接口可以按需调整美白、磨皮、锐化以及红润的程度，实现基础美颜能力。

    该功能常用于视频通话、直播等场景。

    相关 API 请参考 [startEffectsEnv](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#start-effects-env), [stopEffectsEnv](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#stop-effects-env), [enableEffectsBeauty](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#enable-effects-beauty), [setEffectsBeautyParam](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#set-effects-beauty-param)

2. 媒体播放器回调支持返回视频帧时间戳

    媒体播放器的 [onVideoFrame] 和 [onVideoFramePixelBuffer] 回调支持返回视频帧对应的时间戳。

3. 优化 NTP 时间误差

    调用 [getNetworkTimeInfo] 接口获取同步网络时间信息时，SDK 会定时更新 NTP 时间，减少获取到的 NTP 时间误差。

    相关 API 请参考 [getNetworkTimeInfo](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#get-network-time-info)




## 2.15.0 版本 <a id="2.15.0"></a>

**发布日期： 2021-12-09**


**新增功能**

1. 支持设置自定义视频采集的设备状态

    新增 [setCustomVideoCaptureDeviceState] 接口，在使用自定义视频采集时，开发者可以设置指定通道自定义视频采集的采集设备状态，远端可以通过 [onRemoteCameraStateUpdate] 回调获取推流端的状态变更。该功能常用于秀场直播场景。

    相关 API 请参考 [setCustomVideoCaptureDeviceState](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#set-custom-video-capture-device-state)

2. 媒体播放器支持播放音乐时获取声浪和频谱

    媒体播放器新增声浪频谱回调和开关接口，可以控制是否开启回调以及回调的频率，从而获取媒体播放器当前的声浪和频谱。在通过媒体播放器播放资源，如一起看电影、游戏语聊房场景时，通过该功能可以做频谱动画的功能，增加趣味性。

    创建媒体播放器后，调用 [enableSoundLevelMonitor] 接口可以开启声浪监听，开启后可以通过 [onMediaPlayerSoundLevelUpdate] 回调监听声浪的变化。

    创建媒体播放器后，调用 [enableFrequencySpectrumMonitor] 接口可以开启频谱监听，开启后可以通过 [onMediaPlayerFrequencySpectrumUpdate] 回调监听频谱的变化。

    相关 API 请参考 [enableSoundLevelMonitor](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoMediaPlayer#enable-sound-level-monitor), [enableFrequencySpectrumMonitor](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoMediaPlayer#enable-frequency-spectrum-monitor)

3. 支持自定义视频采集时发送与当前视频帧同步的媒体增强补充信息（SEI）

    在使用自定义视频采集功能时，调用 [sendSEISyncWithCustomVideo] 接口可以实现在推流传输视频流数据的同时，发送流媒体增强补充信息来同步一些其他附加信息，该信息与当前视频帧同步。该功能常用于需要播放内容与视频帧强同步的场景，比如视频 K 歌，视频跟歌词强同步。

    相关 API 请参考 [sendSEISyncWithCustomVideo](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#send-sei-sync-with-custom-video)

4. 支持全方位虚拟立体声

    新增支持全方位虚拟立体声，将单声道的声音，通过算法处理，模拟成立体感的声音。该功能常用于 KTV 场景中，可以使唱歌的声音更加有立体感。

    当调用 [enableVirtualStereo] 接口，将 angle 参数设置为 -1 时，表示立体声效果为全方位立体声。

    相关 API 请参考 [enableVirtualStereo](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#enable-virtual-stereo)

5. 新增本地设备异常回调 [onLocalDeviceExceptionOccurred]

    通过 [onLocalDeviceExceptionOccurred] 回调可以设置要检测的设备类型，如摄像头、扬声器、麦克风等，开发者可以根据不同设备类型的错误回调进行相应的处理。

    相关 API 请参考 [onLocalDeviceExceptionOccurred](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoEventHandler#on-local-device-exception-occurred)

6. iOS 支持 Mac Catalyst 架构 (arm64 + x86_64)

    开发者可以通过 Mac Catalyst 框架将 iOS 应用移植到 macOS 上。

**改进优化**

1. 混流输出支持进阶的编码参数配置

    混流输出视频配置 [ZegoMixerOutputVideoConfig] 新增 encodeProfile 和 encodeLatency 参数、分别用于设置混流输出视频编码规格和混流输出视频编码延时。

2. 新增 1015032 错误码

    登录房间导致网络测试停止，由于网络测试会占用带宽，请在登录房间之前进行。

3. 新增 1002066 错误码

    用户登录房间时如果在服务器黑名单中，则会返回此错误码，表示禁止登录房间。

4. 新增 1004072 错误码

    当使用 SDK 拉低延迟直播流时，若您未开通低延迟直播服务，则会返回此错误码。

**问题修复**

1. 修复了 iPad App 在 M1 (Apple Silicon) 芯片机型上启停摄像头 crash 的问题

2. 修复了 [onDeviceError] 可能重复回调的问题

**废弃删除**

1. 废弃 [onDeviceError] 回调

    为了让开发者直观的了解出现异常的设备类型以及具体的异常情况，在 2.15.0 及以上版本废弃了 [onDeviceError] 回调，请使用 [onLocalDeviceExceptionOccurred] 回调代替。

    相关 API 请参考 [onLocalDeviceExceptionOccurred](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoEventHandler#on-local-device-exception-occurred)




## 2.14.0 版本 <a id="2.14.0"></a>

**发布日期： 2021-11-16**


**新增功能**

1. 新增实时有序数据功能

    开发者在需要做远程控制、云游戏等指令分发时，通过实时信令，可以低延迟获取发布端消息。

    相关 API 请参考 [createRealTimeSequentialDataManager](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#create-real-time-sequential-data-manager)

2. 新增版权音乐功能

    注意：如需使用该功能，请联系 ZEGO 技术支持。

    支持通过版权音乐功能，获取版权歌曲或伴奏资源，并结合媒体播放器进行本地播放控制。可以用于在线 KTV、语聊房等合唱或使用背景音乐的场景。

3. 新增 H.265 编解码异常通知

    新增 H.265 解码性能不足的告警回调，在通过 CDN 拉流的场景下，用于提示用户是否做降级处理。如果开发者在拉 H.265 流的过程中收到低帧率回调 [onPlayerLowFpsWarning]，建议开发者停止拉 H.265 流，转拉 H.264 流。

    推流状态回调 [onPublisherStateUpdate] 和拉流状态回调 [onPlayerStateUpdate] 中新增了 H.265 编解码错误提示。

    相关 API 请参考 [onPlayerLowFpsWarning](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoEventHandler#on-player-low-fps-warning), [onPublisherStateUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoEventHandler#on-publisher-state-update), [onPlayerStateUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoEventHandler#on-player-state-update)

4. 支持实时监听音频和视频的首帧回调

    注意：如需使用该功能，请联系 ZEGO 技术支持。

    允许开发者自定义监听音频和视频帧到达的回调通知，包括音频首帧到达回调、视频首帧到达回调、视频首帧渲染回调。

    相关 API 请参考 [callExperimentalAPI](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#call-experimental-api)

5. 媒体播放器支持在加载媒体资源时指定开始播放进度

    媒体播放器新增 [loadResourceWithPosition] 接口，支持加载媒体资源时指定开始播放进度，单位为毫秒。

    相关 API 请参考 [ZegoMediaPlayer > loadResourceWithPosition](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoMediaPlayer#load-resource-with-position)

6. 新增开启或关闭拉流对齐功能

    该功能常用于 KTV 等需要混流对齐的场景，当拉流端播放时，通过 [setPlayStreamsAlignmentProperty] 接口控制播放的实时音视频流是否需要精准对齐。若需要，则拉取的所有流中包含精准对齐参数的会进行对齐；若不需要，则所有流都不对齐。

    相关 API 请参考 [setPlayStreamsAlignmentProperty](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#set-play-streams-alignment-property)

7. 新增稳态语音检测功能

    通过该功能可以判断一定时间内是否有人对着麦克风说话，用于检测采集后或音频前处理后的音频数据是人声还是噪声。

    相关 API 请参考 [startAudioVADStableStateMonitor](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#start-audio-vad-stable-state-monitor), [stopAudioVADStableStateMonitor](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#stop-audio-vad-stable-state-monitor), [onAudioVADStateUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoEventHandler#on-audio-vad-state-update)

8. 服务端支持 ServerSecret 平滑迁移能力

    注意：如需使用该功能，请联系 ZEGO 技术支持。

    支持生成 Token 的密钥，实现 ServerSecret 平滑迁移能力。通过后台配置同时启用两个 ServerSecret，当其中一个 ServerSecret 暴露的情况下，可以平滑迁移到另一个 ServerSecret。

9. 服务端 Token 能力升级

    注意：如需使用Token 加入黑名单的功能，请联系 ZEGO 技术支持。

    Token 支持加入黑名单：为防止旧 Token 释放后攻击新 Token，新增支持将 Token 加入黑名单。Token 黑名单，是指该 Token 在有效期内的 AppID 下无法使用。

    Token 支持通过流 ID 鉴权：为防止通过鉴权后，使用相同 Token 推其他的流，新增支持生成绑定流 ID 的 Token。

10. 服务端 API 新增支持批量禁止 / 恢复 RTC 推流

    为确保客户端下麦成功，服务端新增批量禁止 RTC 推流和批量恢复 RTC 推流能力的 API。

    调用批量禁止 RTC 推流接口，可以批量禁止指定流 ID 推送到 RTC 服务，禁止推流操作会向正在推流的客户端和正在拉流的客户端发送推流被禁止的通知。调用批量恢复 RTC 推流接口，可批量恢复被禁止推往 RTC 媒体服务的流 ID。

    相关 API 请参考 [批量禁止 RTC 推流](/real-time-video-server/api-reference/media-service/forbid-rtc-streams) / [批量恢复 RTC 推流](/real-time-video-server/api-reference/media-service/resume-rtc-streams)

**改进优化**

1. 优化了本地和远端用户的上下行网络回调 [onNetworkQuality] 的处理逻辑

    2.10.0 至 2.13.1 版本的处理逻辑为：1. 自身必须既推流又拉流，才会收到自身的网络质量回调。2. 当拉一条流时，推流端有拉流且推流端在自己所在房间内，才会收到该用户的网络质量。

    2.14.0 及以上版本的处理逻辑为：1. 自身只要推流或拉流，就会收到自身的网络质量回调。2. 当拉一条流时，推流端在自己所在房间内，就会收到该用户的网络质量。

    相关 API 请参考 [onNetworkQuality](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoEventHandler#on-network-quality)

2. 默认最大推流通道数量由 2 路新增到 4 路

    2.14.0 之前版本默认最大推流通道数量为 2 路，如需支持更多则需要 ZEGO 技术支持特殊编包。为了配合实时信令功能，该版本默认最大推流数新增至 4 路。

    相关 API 请参考 [startPublishingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#start-publishing-stream)

3. 优化了 API 接口和错误码注释

    完成了对全量 API 接口与错误码的注释优化， API 注释中新增了“支持版本”、“详情描述”、“业务场景”、“调用时机”、“使用限制”、“注意事项”等信息，便于开发者更清晰的了解 API 的功能。错误码新增了“可能原因”和“处理建议”，帮助开发者更好的定位和解决问题。

4. 去测试环境

    为了降低开发者对环境的理解成本，ZEGO 已统一环境概念，从该版本开始，废弃了测试环境，统一使用正式环境。在 2.14.0 版本之前已接入过 SDK 的开发者，可以参考 [测试环境废弃说明](https://doc-zh.zego.im/article/12997) 进行 SDK 升级及代码调整。

5. 转推地址长度限制扩容

    混流转推地址长度限制由 512 字节扩展到 1024 字节。

6. 官网的 SDK 包默认支持 VP8、MP3 编解码，从该版本开始，不再需要特殊编包

**废弃删除**

1. 废弃旧的 [createEngine] 接口

    为了降低开发者对环境的理解，废弃了测试环境，统一使用环境。在 2.14.0 及以上版本废弃了原有的 [createEngine] 接口，请使用不带 [isTestEnv] 参数的同名接口代替。




## 2.13.1 版本 <a id="2.13.1"></a>

**发布日期： 2021-10-15**


**问题修复**

1. 修复了调用 [enablePublishDirectToCDN] 接口时传入 null 参数导致的崩溃问题




## 2.13.0 版本 <a id="2.13.0"></a>

**发布日期： 2021-10-15**


**新增功能**

1. 新增电音音效

    电音音效指的是可以让人说话、唱歌的声音，经过处理后带有电音的效果。该功能常用于KTV、语聊房场景。

    在 [createEngine] 初始化 SDK 之前，调用 [setElectronicEffects] 接口可以开启电音音效，并可根据需要设置不同模式的电音调式以及对应调式的起始音高。未调用此接口时，默认关闭电音音效。

    开发者也可以通过 [setVoiceChangerPreset] 接口预设常见的电音音效，目前支持预设 C 大调电音音效、A 小调电音音效、和声小调电音音效。

    相关 API 请参考 [setElectronicEffects](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#set-electronic-effects)

2. 新增 Token 过期管理机制

    注意：使用此功能需要升级 SDK 并联系 ZEGO 技术支持配置。

    不同的业务场景，对用户登录房间、推流等权限有时效限制，可以通过 Token 来实现。

    当 Token 过期后，服务端会主动将用户的权限进行回收，客户端的用户会被踢出房间并停止推流。该机制可以使用户权限管理更安全，常用于 KTV、语聊房场景。

    相关 API 请参考 [renewToken](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#renew-token), [onRoomTokenWillExpire](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoEventHandler#on-room-token-will-expire)

3. 支持实时更新混流文字水印

    直播使用混流时，可以在混流输出画面上实时更新水印，以达到实时更新混流的时候同步刷新水印。该功能常用于在线教育场景，例如上课时在混流画面上标注每条输入流对应的老师名字或者班级名字。

    [ZegoMixerTask] 的混流输入列表 [ZegoMixerInput] 中新增 [label] 字段，可设置混流输入视频画面上的相关文字水印信息，进行混流的每一条流，只支持一个水印。

    相关 API 请参考 [startMixerTask](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#start-mixer-task)

3. 混流支持设置视频渲染模式

    在进行混流时，可以对每一条流进行渲染模式的设置。当混流输入流的分辨率比例与对应输入流在混流输出画面上的布局比例不一致时，可以按照不同的业务场景，选择不同的渲染模式。

    [ZegoMixerTask] 的混流输入列表 [ZegoMixerInput] 中新增 [renderMode] 字段，可设置混流输入视频画面的渲染模式，支持“填充模式”和“适应模式”。

    相关 API 请参考 [startMixerTask](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#start-mixer-task)

**改进优化**

1. 优化了混流精准对齐功能

    推流端，配置混流时可以指定某些流进行精准对齐。

    相关 API 请参考 [setStreamAlignmentProperty](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#set-stream-alignment-property)

2. 优化了混流精准对齐的接口调用逻辑

    调用 [startPublishingStream] 接口且将 [ZegoPublisherConfig] 中的 [forceSynchronousNetworkTime] 值设置为 1，则 SDK 内部会等到 NTP 网络时间同步完成后再推流，此时再调用 [setStreamAlignmentProperty] 接口开启混流精准对齐功能。

    相关 API 请参考 [startPublishingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#start-publishing-stream), [setStreamAlignmentProperty](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#set-stream-alignment-property), [onNetworkTimeSynchronized](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoEventHandler#on-network-time-synchronized)

3. 优化了录音棚、KTV、留声机的音效效果

**问题修复**

1. 修复了 SDK 获取网络状态时触发的 Crash

**废弃删除**

1. 废弃旧的 [onProcessCapturedAudioData] 回调

    因为在回调里增加了 timestamp 采集时间戳，在 2.13.0 及以上版本废弃 [onProcessCapturedAudioData] 回调，使用带 `timestamp` 参数的同名回调代替。

    相关 API 请参考 [onProcessCapturedAudioData](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoCustomAudioProcessHandler#on-process-captured-audio-data)

2. 废弃旧的 [onProcessRemoteAudioData] 回调

    因为在回调里增加了 timestamp 采集时间戳，在 2.13.0 及以上版本废弃 [onProcessRemoteAudioData] 回调，使用带 `timestamp` 参数的同名回调代替。

    相关 API 请参考 [onProcessRemoteAudioData](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoCustomAudioProcessHandler#on-process-remote-audio-data)

3. 废弃旧的 [onProcessPlaybackAudioData] 回调

    因为在回调里增加了 timestamp 采集时间戳，在 2.13.0 及以上版本废弃 [onProcessPlaybackAudioData] 回调，使用带 `timestamp` 参数的同名回调代替。

    相关 API 请参考 [onProcessPlaybackAudioData](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoCustomAudioProcessHandler#on-process-playback-audio-data)




## 2.12.0 版本 <a id="2.12.0"></a>

**发布日期： 2021-09-09**


**新增功能**

1. 支持 H.265 编解码

    H.265 编解码完整方案上线，适用于单主播直播和多人互动直播场景。开发者可以在编码或混流时输出 H.265 格式的视频码流，H.265 在同等画质下相对于 H.264 节约了 30% 的流量。使用该功能前，需要联系 ZEGO 技术支持开通。

    相关 API 请参考 [isVideoEncoderSupported](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#is-video-encoder-supported), [isVideoDecoderSupported](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#is-video-decoder-supported), [enableH265EncodeFallback](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#enable-h265encode-fallback), [onPublisherVideoEncoderChanged](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoEventHandler#on-publisher-video-encoder-changed)

2. 新增自定义混音后处理功能

    支持获取和修改混音后将要播放的音频数据。在初始化 SDK 之后，[startPublishingStream]、 [startPlayingStream]、 [startPreview]、 [createMediaPlayer] 和 [createAudioEffectPlayer] 之前，调用 [enableCustomAudioPlaybackProcessing] 接口可以开启自定义混音后处理功能，通过 [setCustomAudioProcessHandler] 可以设置自定义音频处理回调。

    相关 API 请参考 [enableCustomAudioPlaybackProcessing](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#enable-custom-audio-playback-processing), [setCustomAudioProcessHandler](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#set-custom-audio-process-handler), [onProcessPlaybackAudioData](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoCustomAudioProcessHandler#on-process-playback-audio-data)

3. 支持回调远端扬声器设备状态

    与远端用户连麦成功后，当远端扬声器设备状态发生变更时，例如开/关扬声器，可以通过 [onRemoteSpeakerStateUpdate] 回调监听。

    相关 API 请参考 [onRemoteSpeakerStateUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoEventHandler#on-remote-speaker-state-update)

4. 媒体播放器支持倍速播放

    在加载资源完成后，调用 [setPlaySpeed] 接口可以设置媒体播放器的视频播放倍速，支持 0.5 ~ 2.0 倍，默认为 1.0，即正常速度。

    相关 API 请参考 [ZegoMediaPlayer > setPlaySpeed](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoMediaPlayer#set-play-speed)

5. 支持获取当前使用的音频设备信息

    调用 [getCurrentAudioDevice] 接口，可以获取当前使用的音频设备信息，包括设备 ID 和设备名称，减少开发者的开发量。

    相关 API 请参考 [getCurrentAudioDevice](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#get-current-audio-device)

6. 混流支持空间音频能力

    使用混流功能时，支持通过 [ZegoMixerInput] 中的 [audioDirection] 参数设置每路音频流的空间音频效果。

    相关 API 请参考 [startMixerTask](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#start-mixer-task)

**改进优化**

1. 优化了耳返功能

    优化了耳返逻辑，使耳返的延迟缩短至 50+ ms。

2. 扩大了广播消息和弹幕消息的容量

    广播消息和弹幕消息从此版本开始，支持发送长度更大的消息（默认限制为 1 KB），如有需要请联系 ZEGO 技术支持配置。

3. 官网的 SDK 包默认媒体播放器支持播放 m3u8 格式的文件

    从该版本开始，不再需要特殊编包。

    相关 API 请参考 [ZegoMediaPlayer > loadResource](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoMediaPlayer#load-resource)




## 2.11.0 版本 <a id="2.11.0"></a>

**发布日期： 2021-08-27**


**新增功能**

1. 新增范围语音功能模块

    新增范围语音功能模块，可提供范围语音、3D音效、小队语音等功能。适用于吃鸡类游戏、元宇宙类场景。

    范围语音：房间内的收听者对音频的接收距离有范围限制，若发声者与自己的距离超过该范围，则无法听到声音。为保证语音清晰，附近超过 20 人发声时，只能听到离自己最近的 20 个发声者的声音。

    3D音效：声音有 3D 空间感且按距离衰减。

    小队语音：玩家可以选择加入小队，并支持在房间内自由切换“全世界”模式和“仅小队”模式。

    相关 API 请参考 [createRangeAudio](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#create-range-audio), [destroyRangeAudio](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#destroy-range-audio), [setEventHandler](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#set-event-handler), [setAudioReceiveRange](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoRangeAudio#set-audio-receive-range), [updateSelfPosition](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoRangeAudio#update-self-position), [updateAudioSource](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoRangeAudio#update-audio-source), [enableSpatializer](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoRangeAudio#enable-spatializer), [enableMicrophone](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoRangeAudio#enable-microphone), [enableSpeaker](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoRangeAudio#enable-speaker), [setRangeAudioMode](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoRangeAudio#set-range-audio-mode), [setTeamID](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoRangeAudio#set-team-id)

**改进优化**

1. 优化核心 API 注释文档及错误码




## 2.10.1 版本 <a id="2.10.1"></a>

**发布日期： 2021-08-20**


**问题修复**

1. 修复登录房间耗时可能较长的问题

    相关 API 请参考 [loginRoom](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#login-room)




## 2.10.0 版本 <a id="2.10.0"></a>

**发布日期： 2021-08-10**


**新增功能**

1. 新增自动混流功能

    SDK 可以指定房间，由 ZEGO 实时音视频服务器自动将房间内的所有音频流进行混流（目前只支持混音频流），常用于纯语聊场景。该功能相对手动混流降低了开发者接入的复杂程度，不需要管理指定房间音频流的生命周期。

    相关 API 请参考 [startAutoMixerTask](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#start-auto-mixer-task), [stopAutoMixerTask](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#stop-auto-mixer-task)

2. 支持设置混流背景色

    在混流任务对象 [ZegoMixerTask] 中新增 [setBackgroundColor] 用于设置混流背景色。

    相关 API 请参考 [startMixerTask](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#start-mixer-task)

3. 新增开启人声检测功能以及人声部分的声浪回调

    开发者在监听声浪回调时，往往只关注人声部分，可调用 [startSoundLevelMonitor] 接口，传入 [ZegoSoundLevelConfig]，开启 VAD 人声检测。SDK 在本地采集声浪回调 [onCapturedSoundLevelInfoUpdate]、远端音频声浪回调 [onRemoteSoundLevelInfoUpdate] 中也新增是否包含人声检测的参数。

    相关 API 请参考 [startSoundLevelMonitor](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#start-sound-level-monitor), [onCapturedSoundLevelInfoUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoEventHandler#on-captured-sound-level-info-update), [onRemoteSoundLevelInfoUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoEventHandler#on-remote-sound-level-info-update)

4. 媒体播放器支持播放二进制文件

    当开发者已经将播放数据写入内存后，可直接使用媒体播放器进行播放，无需再写成文件进行播放。

    相关 API 请参考 [ZegoMediaPlayer > loadResourceFromMediaData](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoMediaPlayer#load-resource-from-media-data)

5. 媒体播放器新增支持重复播放次数

    开发者在使用媒体播放器时，可能需要统一文件预置播放多次，SDK 提供此功能进行循环播放，可以调用 [setPlayLoopCount] 接口设置重复播放次数。

    相关 API 请参考 [setPlayLoopCount](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoMediaPlayer#set-play-loop-count)

**改进优化**

1. 设备异常通知 [onDeviceError] 中新增 [deviceID] 参数，保证设备唯一性

    在使用多个视频或音频设备时，可以通过 [deviceID] 参数精确分辨出报错的设备，更高效地排查问题。

2. 拉流路数配置优化，此 版本 SDK 默认支持 50 路拉流，运行期会默认设定为 12 路拉流

    在开发者需要支持超过 12 路拉流时，需要联系 ZEGO 技术支持设置。

3. 屏幕采集时对编码进行优化，降低码率波动

**问题修复**

1. 修复了特定条件下的崩溃问题

2. 修复了可能存在的内容泄漏问题

3. 修复了上传日志耗时久的问题

**废弃删除**

1. 废弃旧的 [onNetworkQuality] 回调

    参数定义不准确，在 2.10.0 及以上版本废弃 [onNetworkQuality] 回调，使用带 `ZegoStreamQualityLevel` 枚举的同名回调代替。

    相关 API 请参考 [onNetworkQuality](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoEventHandler#on-network-quality)




## 2.9.3 版本 <a id="2.9.3"></a>

**发布日期： 2021-07-13**


**问题修复**

1. 修复了调用 [LogoutRoom] 接口时部分资源未及时释放的问题

2. 修正了其他已知问题




## 2.9.0 版本 <a id="2.9.0"></a>

**发布日期： 2021-07-09**


**新增功能**

1. 支持摄像头关闭时推送静态图片

    关闭摄像头时，支持持续推送 JPEG/JPG、BMP 和 HEIF 格式的静态图片。例如，主播退后台的时候，会主动关闭摄像头，此时观众侧需要展示主播暂时离开的图片。

    初始化 SDK 后，关闭摄像头之前通过 [setDummyCaptureImagePath] 接口设置所推静态图片的路径，开始正常推流后，调用 [enableCamera] 接口关闭摄像头时会开始推静态图片，调用 [enableCamera] 接口打开摄像头时会结束推静态图片。

    相关 API 请参考 [setDummyCaptureImagePath](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#set-dummy-capture-image-path)

2. 支持获取本端和远端的上下行网络质量

    新增本地和远端用户的上下行网络质量回调 [onNetworkQuality]，默认每两秒回调一次本地和每个拉取的远端用户的网络状况（包括未知、优秀、良好、中等、较差、网络断线）。当开发者希望分析链路上的网络情况，或想要了解本地和远端用户的网络状况时可以使用该功能。

    相关 API 请参考 [onNetworkQuality](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoEventHandler#on-network-quality)

3. 支持获取 NTP 时间

    在进行多端同步行为或耗时统计时，需要网络时间同步。SDK 新增获取 NTP 时间功能，可通过 [getNetworkTimeInfo] 接口获取 NTP 时间戳。使用该功能前请先联系 ZEGO 技术支持。

    相关 API 请参考 [getNetworkTimeInfo](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#get-network-time-info)

4. 新增混流自动精准对齐功能

    基于 ZEGO 服务器的 NTP 时间，在混流时自动对齐各路流的播放时间。使用该功能前请先联系 ZEGO 技术支持。

**改进优化**

1. 优化了多房间功能

    同一个用户可以同时加入多个房间，并同时在多个房间内（目前默认最多同时加入 5 个房间）推流、拉流、发送实时消息和接收消息回调。本功能可以隔离多个房间的消息及回调，实现更灵活的连麦业务。ZEGO 推荐用于跨房间连麦和在线教育的超级小班场景。

    需要在初始化 SDK 之前，调用 [ZegoRoomMode] 设置多房间模式，然后调用 [loginRoom] 接口登录多房间。

    相关 API 请参考 [setRoomMode](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~ZegoExpressSDK#set-room-mode), [loginRoom](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#login-room)

2. 优化了退出房间逻辑

    开发者不需要填写 roomID 就可以调用 [logoutRoom] 接口退出当前所在的房间。若使用了多房间功能，则调用该接口会退出所有房间。

    相关 API 请参考 [logoutRoom](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#logout-room)

3. 拉流质量回调新增卡顿相关数据

    拉流质量回调中新增 audioCumulativeBreakCount、audioCumulativeBreakTime、audioCumulativeBreakRate 等参数，提供了更多拉流卡顿的细化数据。

    相关 API 请参考 [onPlayerQualityUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoEventHandler#on-player-quality-update)

4. 优化了网络测试功能

    调用 [startNetworkSpeedTest] 接口开启网络测速时，支持设置回调周期（默认 3000 ms）。

    相关 API 请参考 [startNetworkSpeedTest](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#start-network-speed-test)

5. 优化了混流功能，支持混入只有视频没有音频（纯视频）的流

6. 优化了媒体播放器，调用 [seekTo] 接口指定播放进度的误差缩短到 10 ms

7. 优化了音频内部渲染，支持单通道音频

8. 媒体播放器支持播放 mkv 文件

**问题修复**

1. 修复了媒体播放器先最小化再最大化后画面异常的问题

2. 修复了打开文件时报错的问题

3. 修复了只推音频流且发送 SEI 时录制发生异常的问题

4. 修复了停止拉流后，最后一帧画面显示异常的问题

5. 修复了推流过程中插入耳机出现耳返异常的问题

**废弃删除**

1. 废弃 [loginMultiRoom] 接口

    为了更完善多房间功能，去除旧有主从房间概念，在 2.9.0 及以上版本废弃了 [loginMultiRoom] 接口。若需实现新的多房间功能，请先在引擎初始化之前调用 [setRoomMode] 函数设置多房间模式，再使用 [loginRoom] 登录多房间，如果调用 [loginRoom] 函数登录多房间，请确保传入相同的用户信息。

    相关 API 请参考 [setRoomMode](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~ZegoExpressSDK#set-room-mode), [loginRoom](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#login-room)




## 2.8.0 版本 <a id="2.8.0"></a>

**发布日期： 2021-06-11**


**新增功能**

1. 支持登录房间和用户房间内推流鉴权

    用户权限控制指的是用户登录房间，或是在房间内进行推/拉流等操作时，ZEGO 服务端根据用户登录时携带的 Token 参数，判断用户是否有对应的权限，避免因权限控制缺失或操作不当引发的风险问题。 目前仅支持用户登录房间和用户房间内推流两个权限的校验。

    相关 API 请参考 [loginRoom](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#login-room), [renewToken](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#renew-token), [onRoomTokenWillExpire](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoEventHandler#on-room-token-will-expire)

2. 新增辅路流共享主路流的视频数据能力

    开放辅路流复制主路流的视频数据能力，通过此能力开发者可以在主路、辅路流用不同协议推相同数据。开发者若需要此能力请联系 ZEGO 技术支持提供试验性 API。

    相关 API 请参考 [callExperimentalAPI](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#call-experimental-api)

3. 新增空间音频能力

    空间音频能够感知空间内 360° 的声音位置。开发者可以通过空间音频功能在音视频房间内营造更逼真的“座位”效果，用户可以通过空间音频感知声音的来源方向，还原线下场景。适用于语聊房、剧本杀和线上会议等场景。

    相关 API 请参考 [enablePlayStreamVirtualStereo](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#enable-play-stream-virtual-stereo)

**问题修复**

1. 修复了在 [createEngine] 之后，[startPublishingStream] 或 [startPreview] 之前，调用 [enableHeadphoneAEC] 可能会无效的问题

2. 修复了在使用自定义视频渲染过程中，[destroyEngine] 后可能会出现的 crash 问题




## 2.7.0 版本 <a id="2.7.0"></a>

**发布日期： 2021-04-29**


**新增功能**

1. C++ 增加自定义视频前处理类型 CVPixelBuffer，便于开发者在 macOS 平台上使用

    当 SDK 自带的美颜无法满足需求，例如需要做挂件、贴纸，或者美颜效果无法达到预期时，推荐开发者使用自定义视频前处理功能。在 macOS 平台下，视频帧数据类型 [BufferType] 仅传入 [CVPixelBuffer] 类型时该功能才会生效。

    相关 API 请参考 [enableCustomVideoProcessing](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#enable-custom-video-processing)

2. 增加试验性 API 功能

    ZEGO 通过此 API 提供 RTC 业务中的部分技术预览或特别定制功能，需要获取该功能的使用方法或其详情可咨询 ZEGO 技术支持。

    相关 API 请参考 [callExperimentalAPI](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#call-experimental-api)

**废弃删除**

1. 废弃 [enableAudioDataCallback] 接口

    在 2.7.0 及以上版本废弃 [enableAudioDataCallback] 接口，请使用 [startAudioDataObserver] 接口代替。

    相关 API 请参考 [startAudioDataObserver](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#start-audio-data-observer)




## 2.6.0 版本 <a id="2.6.0"></a>

**发布日期： 2021-04-15**


**新增功能**

1. 新增混流场景下的焦点语音功能

    在混流时，开发者通过设定拉流端需要突出的目标流，实现在多人同时说话的嘈杂环境下，突出特定用户的语音。例如在会议场景下，可以保障重点人物发言的声音。在调用 [startMixerTask] 接口开启混流时，首先将传入的 [ZegoMixerAudioConfig] 混流音频配置参数中的 [mixMode] 设置为 [focused]，同时在需要突出发言的流中，配置 [ZegoMixerInput] 的 [isAudioFocus] 为 [true]，即可指定该流为焦点语音流。

    相关 API 请参考 [startMixerTask](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#start-mixer-task)

**问题修复**

1. 修复已知的问题




## 2.5.0 版本 <a id="2.5.0"></a>

**发布日期： 2021-04-01**


**新增功能**

1. 媒体播放器支持设置网络资源最大的缓存配置并获取实时网络资源缓存情况

    开发者可根据实际需要在加载资源前，通过 [setNetWorkResourceMaxCache] 接口设置媒体播放器网络资源的最大缓存时长和最大缓存数据大小（两者不能同时为 0），可通过 [getNetWorkResourceCache] 接口获取当前网络资源缓存队列中缓存数据可播放的时长和大小。

    相关 API 请参考 [ZegoMediaPlayer > setNetWorkResourceMaxCache](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoMediaPlayer#set-net-work-resource-max-cache), [ZegoMediaPlayer > getNetWorkResourceCache](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoMediaPlayer#get-net-work-resource-cache)

2. 支持设置媒体播放器重新恢复播放需要达到的缓存阈值

    当网络状态较差且媒体播放器将缓存的网络资源都播放完时，就会停止播放。只有当缓存的网络资源大于 SDK 设置的阈值时（默认值为 5000 ms，有效值为大于等于 1000 ms），媒体播放器才会在原来暂停的位置自动恢复播放。

    相关 API 请参考 [ZegoMediaPlayer > setNetWorkBufferThreshold](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoMediaPlayer#set-net-work-buffer-threshold)




## 2.4.0 版本 <a id="2.4.0"></a>

**发布日期： 2021-03-18**


**新增功能**

1. 媒体播放器新增截图功能

    对媒体播放器当前播放的画面进行截图。

    相关 API 请参考 [ZegoMediaPlayer > takeSnapshot](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoMediaPlayer#take-snapshot)

2. 支持对音频设备静音或取消静音

    可根据需要对音频输入/输出设备静音或取消静音。

    相关 API 请参考 [muteAudioDevice](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#mute-audio-device), [isAudioDeviceMuted](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#is-audio-device-muted)

3. 支持对音频设备音量进行监控

    可以监控音频输入/输出设备的音量。

    相关 API 请参考 [startAudioDeviceVolumeMonitor](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#start-audio-device-volume-monitor), [stopAudioDeviceVolumeMonitor](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#stop-audio-device-volume-monitor)

4. 支持设置系统声卡的采集音量

    可根据需要设置系统声卡音量，有效范围为 [0, 200], 默认为 100。

    相关 API 请参考 [setMixSystemPlayoutVolume](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#set-mix-system-playout-volume)

5. 支持设置和获取音频质量配置

    可根据需要设置和获取音频编码类型、码率，音频声道的组合值。

    相关 API 请参考 [setAudioConfig](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#set-audio-config), [getAudioConfig](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#get-audio-config)

6. 支持设置触发流量控制的关注因素

    当通过 [enableTrafficControl] 接口开启了指定推流通道的流量控制后，可通过 [setTrafficControlFocusOn] 接口控制是否因为远端网络状况差而启动流量控制。

    相关 API 请参考 [setTrafficControlFocusOn](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#set-traffic-control-focus-on)

7. 新增本地预览首帧渲染回调

    第一帧视频数据被渲染完之后会收到此回调。

    相关 API 请参考 [onPublisherRenderVideoFirstFrame](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoEventHandler#on-publisher-render-video-first-frame)

8. 媒体播放器新增精确 seek 功能

    普通 seek 指定的时间戳可能是非 I 帧，进而返回指定时间戳前后的 I 帧，不是很精确。而精准 seek 当指定的时间戳不是 I 帧时，会通过指定时间戳前后的 I 帧去解指定时间戳的那帧数据。

    相关 API 请参考 [ZegoMediaPlayer > enableAccurateSeek](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoMediaPlayer#enable-accurate-seek)

9. 支持停止或恢复所有正在拉流的音频数据

    当需要同时停止拉流中所有流的音频数据时，可以使用此功能。

    相关 API 请参考 [muteAllPlayStreamAudio](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#mute-all-play-stream-audio)

10. 支持停止或恢复所有正在拉流的视频数据

    当需要同时停止拉流中所有流的视频数据时，可以使用此功能。

    相关 API 请参考 [muteAllPlayStreamVideo](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#mute-all-play-stream-video)

**改进优化**

1. 优化了因房间登录失败时，推拉流状态回调的错误码描述

**问题修复**

1. 修复了登录房间失败时，有概率出现内部线程卡住的问题

2. 修复了特定情况下拉流失败并且出现 1004099 错误码的问题




## 2.3.1 版本 <a id="2.3.1"></a>

**发布日期： 2021-03-05**


**问题修复**

1. 修复已知的问题




## 2.3.0 版本 <a id="2.3.0"></a>

**发布日期： 2021-03-04**


**新增功能**

1. 新增 [setLogConfig] 接口，用于设置日志属性

    当开发者需要自定义日志文件大小和路径时，可调用 [setLogConfig] 接口来完成配置，且必须在调用 [createEngine] 之前设置才能生效。若在 [createEngine] 之后设置，则在 [destroyEngine] 后的下一次 [createEngine] 时生效。一旦调用了 [setLogConfig] 接口，在 [destroyEngine] 之前，即 engine 的整个生命周期里，旧的通过 [setEngineConfig] 设置日志大小和路径的方式将无效。建议一旦使用该接口，就始终只通过其完成设置日志路径和大小的需求。

    相关 API 请参考 [setLogConfig](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~ZegoExpressSDK#set-log-config)

2. 新增 [setApiCalledCallback] 接口，用于设置调用方法执行结果的回调

    设置 [setApiCalledCallback] 后，可以通过 [onApiCalledResult] 回调获取到 ZEGO SDK 方法执行结果的详细信息。

    相关 API 请参考 [setApiCalledCallback](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~ZegoExpressSDK#set-api-called-callback)

3. 新增 [setPlayStreamVideoType] 接口，用于设置播放视频流类型

    当推流方通过 [setVideoConfig] 设置了 [codecID] 为 [SVC] 时（在拉流前后均可设置），拉流方可以动态设置选用不同的流类型（小分辨率为标准图层的二分之一）。 在网络较弱或者渲染的 UI 窗体较小的情况下，可以选择使用拉取小分辨率的视频来达到节省带宽的目的。

    相关 API 请参考 [setPlayStreamVideoType](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#set-play-stream-video-type)

4. 新增 [setAllPlayStreamVolume] 接口，用于设置所有拉流声音大小

    本端用户可控制所有音频流的播放音量。

    相关 API 请参考 [setAllPlayStreamVolume](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#set-all-play-stream-volume)

5. 新增 [startNetworkProbe] 接口，用于开始网络探测。新增 [stopNetworkProbe] 接口，用于结束网络探测

    在推拉流之前通过网络探测定位一些可能存在的网络问题。

    相关 API 请参考 [startNetworkProbe](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#start-network-probe), [stopNetworkProbe](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#stop-network-probe)

**改进优化**

1. 增加明文日志打印，方便开发者自行排查接口调用异常问题

**问题修复**

1. 修复了 audio device mode 切换异常的问题

**废弃删除**

1. 废弃 [setPlayStreamVideoLayer] 接口

    因为定义了更通用更利于理解的视图类型参数，新接口本身能够明确描述拉流切换大小流的概念，避免对开发者造成误解，因此在 2.3.0 及以上版本废弃 [setPlayStreamVideoLayer] 接口, 使用 [setPlayStreamVideoType] 接口代替

    相关 API 请参考 [setPlayStreamVideoType](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#set-play-stream-video-type)

2. 为了体现设置 Log 属性在 SDK 中的时序要求和功能的独立性，避免开发者造成误用，因此废弃 [ZegoEngineConfig] 类的 [logConfig] 属性，增加 [setLogConfig] 接口用于实现原来的功能

    相关 API 请参考 [setLogConfig](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~ZegoExpressSDK#set-log-config)

2. 废弃 [setDebugVerbose] 接口，请使用 [setEngineConfig] 函数设置高级属性 [advancedConfig] 来实现原来的功能

    通过设置 [key] 为 [set_verbose]，[value] 为 [true] 或 [false] 来开关控制台打印功能。

    相关 API 请参考 [setEngineConfig](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~ZegoExpressSDK#set-engine-config)




## 2.2.1 版本 <a id="2.2.1"></a>

**发布日期： 2021-02-04**


**问题修复**

1. 修复了在极端情况下发送自定义视频采集数据时，可能导致崩溃的问题

2. 修复了音频自定义采集向 SDK 塞数据时开发者音频通道不合理传参导致的崩溃问题

    相关 API 请参考 [sendCustomAudioCaptureAACData](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#send-custom-audio-capture-aac-data), [sendCustomAudioCapturePCMData](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#send-custom-audio-capture-pcm-data)

3. 修复了抛解码的码流时在某些设备可能会出现渲染画面任意旋转的问题

    相关 API 请参考 [onRemoteVideoFrameEncodedData](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoCustomVideoRenderHandler#on-remote-video-frame-encoded-data)




## 2.2.0 版本 <a id="2.2.0"></a>

**发布日期： 2021-01-28**


**新增功能**

1. 新增音视频通话的房间会话 ID 信息

    多个用户在房间内进行音视频通信，每一次音视频通信都会有唯一的 RoomSessionID (当用户收到 [onRoomStateUpdate] 回调时，可通过回调中的 [extendedData] 参数获取 RoomSessionID)，标识房间内首个用户发起音视频通信到最后一个用户结束通信的持续通信。可用于通话质量评分、通话问题诊断等场景中。

    相关 API 请参考 [onRoomStateUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoEventHandler#on-room-state-update)

2. 媒体播放器新增 SEI 回调

    使用媒体播放器播放媒体文件，当媒体播放器解析到媒体文件中含有 SEI 时，将触发 [onMediaPlayerRecvSEI] 回调。

3. 发起混流任务时支持设定高级配置

    在 [ZegoMixerTask] 中添加 [advancedConfig] 参数以支持混流高级配置。如需使用，请联系 ZEGO 技术支持。

    相关 API 请参考 [startMixerTask](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#start-mixer-task)

4. 新增棱镜相关质量上报

    新增棱镜相关质量上报，方便开发者及时发现问题、定位问题、解决问题，更好、更全面地提升用户体验。

**改进优化**

1. 当登录房间、推流、拉流出现未知错误码 100XX99 时，[extendedData] 字段会抛出原始服务器码，便于开发者反馈详细问题




## 2.1.1 版本 <a id="2.1.1"></a>

**发布日期： 2021-01-21**


**问题修复**

1. 修复音效播放器加载音效资源，回调加载时机可能不准的问题

2. 修复高频反复调用 [startPlayingStream], [stopPlayingStream] 时可能出现的崩溃问题




## 2.1.0 版本 <a id="2.1.0"></a>

**发布日期： 2021-01-14**


**新增功能**

1. 新增设置拉流缓存区间值功能

    该功能用于指定播放缓存自适应调整的区间范围，开发者可根据场景进行设置。

    相关 API 请参考 [setPlayStreamBufferIntervalRange](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#set-play-stream-buffer-interval-range)

**问题修复**

1. 修复已知问题




## 2.0.1 版本 <a id="2.0.1"></a>

**发布日期： 2021-01-07**


**问题修复**

1. 修复已知问题




## 2.0.0 版本 <a id="2.0.0"></a>

**发布日期： 2020-12-31**


**新增功能**

1. 新增低延迟直播功能

    低延迟直播专注于提供稳定可靠的直播服务，相比于标准视频直播产品，音画延迟更低，同步性更强，弱网抗性更好，能为用户带来毫秒级的直播体验。通常用于教育大班课、秀场直播、电商直播、一起看、在线拍卖等场景。详情请参考：[低延迟直播](/real-time-video-android-java/live-streaming/low-latency-live-streaming)。

    相关 API 请参考 [startPlayingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#start-playing-stream)

2. 新增对 H.265 (HEVC) 编码的支持

    新增对 H.265 编码的支持，在同等分辨率、帧率的情况下可以降低码率。

    相关 API 请参考 [setVideoConfig](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#set-video-config)

**改进优化**

1. 优化监听系统的麦克风和摄像头等硬件设备权限改变的状态

**问题修复**

1. 修复了媒体播放器 [seekTo] 回调触发时，内部对象已被重置引发的崩溃问题。

**废弃删除**

1. 删除 [ZegoEngineConfig] 中的 [customVideoCaptureMainConfig] 和 [customVideoCaptureAuxConfig]，请使用 [ZegoExpressEngine] 的 [enableCustomVideoCapture] 接口代替

    旧接口跟随了 [setEngineConfig] 接口的生命周期，不够灵活。在允许了引擎启动前设置 [自定义视频采集] 之后，Express SDK 新增了独立的 [enableCustomVideoCapture] 接口用于设置自定义视频采集，详情请参考 [接口变更说明](/real-time-voice-android/client-sdk/api-changes-notes)。

    相关 API 请参考 [enableCustomVideoCapture](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#enable-custom-video-capture)

2. 删除 [ZegoEngineConfig] 中的 [customVideoRenderConfig]，请使用 [ZegoExpressEngine] 的 [enableCustomVideoRender] 接口代替

    旧接口跟随了 [setEngineConfig] 接口的生命周期，不够灵活。在允许了引擎启动前设置 [自定义视频渲染] 之后，Express SDK 新增了独立的 [enableCustomVideoRender] 接口用于设置自定义视频渲染，详情请参考 [接口变更说明](/real-time-voice-android/client-sdk/api-changes-notes)。

    相关 API 请参考 [enableCustomVideoRender](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#enable-custom-video-render)

3. 删除 [destroyEngine()] 接口，请使用 [destroyEngine(callback)] 代替

    新增了一个带 [callback] 参数的销毁引擎接口，若开发者有切换多个音视频 SDK 的需求，则可以通过收到回调时认为 ZEGO SDK 对设备硬件资源的占用已释放完成。若无监听必要，对 [callback] 参数传 null 即可，详情请参考 [接口变更说明](/real-time-voice-android/client-sdk/api-changes-notes)。

    相关 API 请参考 [destroyEngine](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~ZegoExpressSDK#destroy-engine)

4. 删除 [onRemoteAudioData] 回调，请使用 [onPlaybackAudioData] 代替

    旧回调命名与实际功能不符，因此删除改名，详情请参考 [接口变更说明](/real-time-voice-android/client-sdk/api-changes-notes)。

    相关 API 请参考 [onPlaybackAudioData](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoAudioDataHandler#on-playback-audio-data)

5. 删除 [muteAudioOutput] 接口，请使用 [muteSpeaker] 代替

    旧接口命名风格和语义不清晰，[muteSpeaker] 使用 Speaker 的定义与 Microphone 对应，详情请参考 [接口变更说明](/real-time-voice-android/client-sdk/api-changes-notes)。

    相关 API 请参考 [muteSpeaker](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#mute-speaker)

6. 删除 [ZegoMediaPlayer] 类中的 [createMediaPlayer] 接口，请使用 [ZegoExpressEngine] 类中的 [createMediaPlayer] 代替

    媒体播放器的生命周期跟随引擎，故变更为 ZegoExpressEngine 类的同名实例方法，详情请参考 [接口变更说明](/real-time-voice-android/client-sdk/api-changes-notes)。

    相关 API 请参考 [createMediaPlayer](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#create-media-player)

7. 删除 [ZegoMediaPlayer] 中的 [volume] 和 [getVolume]，请使用 [setPublishVolume]、[getPublishVolume]、[setPlayVolume]、[getPlayVolume] 代替

    引擎提供了分别获取播放器推流音量和本地播放音量的功能，更加精准的获取音量，故废弃原来的统一获取接口，详情请参考 [接口变更说明](/real-time-voice-android/client-sdk/api-changes-notes)。

    相关 API 请参考 [ZegoMediaPlayer > setPublishVolume](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoMediaPlayer#set-publish-volume), [ZegoMediaPlayer > setPlayVolume](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoMediaPlayer#set-play-volume)




## 1.20.1 版本 <a id="1.20.1"></a>

**发布日期： 2020-12-24**


**问题修复**

1. 修复了媒体播放器可能存在的开始播放失败的问题

2. 修复了媒体播放器可能存在的跳帧问题




## 1.20.0 版本 <a id="1.20.0"></a>

**发布日期： 2020-12-17**


**新增功能**

1. 新增网络测速功能

    该功能支持上行/下行网络测速，可用于检测网络环境是否适合推/拉指定码率的流。调用 [startNetworkSpeedTest] 接口开启该功能，配置 [ZegoNetworkSpeedTestConfig] 参数以控制测速过程，测速结果将通过 [onNetworkSpeedTestQualityUpdate] 回调通知。

    相关 API 请参考 [startNetworkSpeedTest](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#start-network-speed-test), [stopNetworkSpeedTest](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#stop-network-speed-test), [onNetworkSpeedTestQualityUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoEventHandler#on-network-speed-test-quality-update)

2. 新增网络模式变更通知回调

    当设备的网络模式改变时，例如从 WiFi 切换到 5G，或断网等情况时，将会抛出此回调。

    相关 API 请参考 [onNetworkModeChanged](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoEventHandler#on-network-mode-changed)

**问题修复**

1. 修复了本地录制功能在异常情况下偶现崩溃的问题

    相关 API 请参考 [startRecordingCapturedData](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#start-recording-captured-data), [stopRecordingCapturedData](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#stop-recording-captured-data)




## 1.19.1 版本 <a id="1.19.1"></a>

**发布日期： 2020-12-10**


**改进优化**

1. 新增 1002002 错误码，表示 RoomID 有误，请检查当前是否登录了此房间

    登录房间后，如果退出或切换房间，且传入的 RoomID 为空或者 RoomID 不存在，则抛出 1002002 错误码。

    相关 API 请参考 [loginRoom](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#login-room), [logoutRoom](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#logout-room), [switchRoom](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#switch-room)

**问题修复**

1. 修复了音效播放器设置指定的播放进度时偶现爆音的问题

    相关 API 请参考 [ZegoAudioEffectPlayer > seekTo](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoAudioEffectPlayer#seek-to)

2. 修复了 FEC 模块在弱网情况下崩溃的问题




## 1.19.0 版本 <a id="1.19.0"></a>

**发布日期： 2020-12-03**


**新增功能**

1. 新增系统性能监控功能，支持监控 CPU 使用率和运存使用率/使用量

    调用 [createEngine] 接口创建引擎后可以启动性能监控，并支持设置监控回调间隔（默认为 2s），一般可用于对比推拉流前后的内存增长情况。

    相关 API 请参考 [startPerformanceMonitor](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#start-performance-monitor), [stopPerformanceMonitor](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#stop-performance-monitor)

2. 新增流媒体加密功能

    支持使用 AES-128/192/256 对流媒体数据加密。

    相关 API 请参考 [setPublishStreamEncryptionKey](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#set-publish-stream-encryption-key), [setPlayStreamDecryptionKey](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#set-play-stream-decryption-key)

3. 新增抛出视频时间戳相对于音频时间戳的差值，位于 [ZegoPlayStreamQuality] 中，用于反映拉流中的音画同步情况

    该时间戳差值小于 0 表示视频超前音频的毫秒数, 大于 0 表示视频滞后音频的毫秒数, 等于 0 表示无差别。当绝对值小于 200，可基本认为音画同步，当绝对值连续 10 秒大于 200 可以认为异常。

    相关 API 请参考 [onPlayerQualityUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoEventHandler#on-player-quality-update)

4. 新增设置选用拉流的视频图层功能

    当推流方调用 [setVideoConfig] 接口设置视频编码器（codecID）为 SVC 时，拉流方可以调用 [setPlayStreamVideoLayer] 接口来自行选择拉取标准图层或者基础图层（基础图层的分辨率为标准图层的二分之一），以达到节省带宽的目的。

**改进优化**

1. 新增登录房间失败错误码 1002035，表示测试环境下最大并发房间数超过上限

    相关 API 请参考 [loginRoom](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#login-room)

2. 新增房间广播消息发送失败错误码 1009015，表示广播消息 QPS 超限，最大 QPS 为 2

    相关 API 请参考 [sendBroadcastMessage](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#send-broadcast-message)

3. 本地媒体录制新增支持 AAC 文件格式

    相关 API 请参考 [startRecordingCapturedData](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#start-recording-captured-data)

4. 媒体播放器新增支持 m3u8 格式

    如需使用，请联系 ZEGO 技术支持。

    相关 API 请参考 [ZegoMediaPlayer > loadResource](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoMediaPlayer#load-resource)

**废弃删除**

1. 废弃 [ZegoPlayerConfig] 中的 videoLayer 属性，请使用 [setPlayStreamVideoLayer] 代替，该接口支持在拉流前后动态设置图层。




## 1.18.1 版本 <a id="1.18.1"></a>

**发布日期： 2020-11-24**


**问题修复**

1. 修复使用辅路自定义音频采集时可能出现异常的问题




## 1.18.0 版本 <a id="1.18.0"></a>

**发布日期： 2020-11-19**


**新增功能**

1. 新增混响高级参数和混响/变声的预设值

    通过混响高级参数可以根据需要调节更精细的混响效果，并在原有预设混响中新增了录音室、KTV、摇滚、演唱会等效果，在预设变声中新增了磁性男和清新女音效，增加实时语音趣味性，能够适应更多的场景。

    相关 API 请参考 [setReverbAdvancedParam](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#set-reverb-advanced-param), [setReverbPreset](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#set-reverb-preset), [setVoiceChangerPreset](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#set-voice-changer-preset)

2. 新增 SEI 设置类型功能

    通过设置 SEI 类型，使开发者使用其他解码器解码时能够正确解析出 SEI。

    相关 API 请参考 [setSEIConfig](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#set-sei-config)

3. 新增流更新时附带扩展信息的回调，如当流被删除时能够抛出相关原因信息

    相关 API 请参考 [onRoomStreamUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoEventHandler#on-room-stream-update)

4. 新增按流 ID 形式获取拉流端的音频原始数据

    相关 API 请参考 [onPlayerAudioData](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoAudioDataHandler#on-player-audio-data)

**问题修复**

1. 修复调用 [startPlayingStream] 接口设置了视频图层时，再调用 [mutePlayStreamVideo] 接口则会导致图层选用错误的问题

    相关 API 请参考 [startPlayingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#start-playing-stream)

2. 优化 [mutePlayStreamAudio] 调用时机，在拉流前和拉流后设置均能生效

    相关 API 请参考 [mutePlayStreamAudio](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#mute-play-stream-audio)

3. 优化 [mutePlayStreamVideo] 调用时机，在拉流前和拉流后设置均能生效

    相关 API 请参考 [mutePlayStreamVideo](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#mute-play-stream-video)

**废弃删除**

1. 废弃旧的 [setReverbParam] 接口

    为了支持更多混响参数，设置更加丰富的混响效果，在 1.18.0 及以上版本废弃 [setReverbParam] 接口，请使用带 `ZegoReverbAdvancedParam` 类型参数的 [setReverbAdvancedParam] 接口代替，详情请参考 [接口变更说明](/real-time-voice-android/client-sdk/api-changes-notes)。

    相关 API 请参考 [setReverbAdvancedParam](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#set-reverb-advanced-param)

2. 废弃旧的 [onRoomStreamUpdate] 回调

    在 1.18.0 及以上版本废弃 [onRoomStreamUpdate] 回调，请使用带 `extendedData` 扩展信息参数的同名回调代替，`extendedData` 用于标识流更新附带的消息，如流删除原因等，故对旧接口进行废弃。

    相关 API 请参考 [onRoomStreamUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoEventHandler#on-room-stream-update)




## 1.17.5 版本 <a id="1.17.5"></a>

**发布日期： 2020-11-05**


**改进优化**

1. 当登录房间与发送实时消息传入的房间 ID 不一致时，抛出一个精确的错误码 (1009005)

    相关 API 请参考 [loginRoom](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#login-room), [sendBroadcastMessage](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#send-broadcast-message), [sendBarrageMessage](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#send-barrage-message), [sendCustomCommand](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#send-custom-command)

2. 支持 [setPlayVolume] 方法传入的 streamID 参数为空字符串时，对所有拉流音量进行设置

    相关 API 请参考 [setPlayVolume](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#set-play-volume)

**问题修复**

1. 修复辅流发送 SEI 时，对端接收不到的问题

    相关 API 请参考 [sendSEI](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#send-sei)




## 1.17.0 版本 <a id="1.17.0"></a>

**发布日期： 2020-10-22**


**新增功能**

1. 新增支持更多变声特效

    新增外国人、擎天柱、机器人、空灵 4 种变声效果，轻松创建特色音效，使用户的声音更加妙趣横生。在语音场景中，营造好友语音之间的搞怪气氛，增强娱乐性。

    相关 API 请参考 [setVoiceChangerPreset](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#set-voice-changer-preset)

2. 新增支持设置混响回声参数

    用户可以根据需要设置混响回声参数，最多允许设置 7 次回声 (delay)，并支持单独设置每个回声的延迟、衰减，以及整体的输入输出增益值。也可以搭配变声、混响以实现自定义各式各样的声音效果。

    相关 API 请参考 [setReverbEchoParam](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#set-reverb-echo-param)

3. 媒体播放器新增支持设置变声效果

    通过改变用户的音调，使输出的声音在感官上与原始声音不同，实现男声变女生等多种效果。

    相关 API 请参考 [ZegoMediaPlayer > setVoiceChangerParam](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoMediaPlayer#set-voice-changer-param)

4. 新增对推流或拉流画面截图的功能

    支持在推拉流过程中对画面进行截图，可用于鉴黄等场景。

    相关 API 请参考 [takePublishStreamSnapshot](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#take-publish-stream-snapshot), [takePlayStreamSnapshot](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#take-play-stream-snapshot)

5. 新增支持瞬态噪声抑制

    该功能可用于抑制敲击键盘、桌子等瞬态噪声。

    相关 API 请参考 [enableTransientANS](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#enable-transient-ans)

6. 媒体播放器新增支持切换音轨

    当媒体文件中包含多个音轨时（例如原声和伴奏），支持切换音轨进行播放。

    相关 API 请参考 [ZegoMediaPlayer > setAudioTrackIndex](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoMediaPlayer#set-audio-track-index)

**改进优化**

1. 拉流质量回调新增 [videoBreakRate], [audioBreakRate] 等参数，可用于统计拉流卡顿率。

    相关 API 请参考 [onPlayerQualityUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoEventHandler#on-player-quality-update)

**问题修复**

1. 修复媒体播放器在收到 [loadResource] 回调前调用 [enableRepeat] 不生效的问题。

**废弃删除**

1. 废弃设置变声参数函数 [setVoiceChangerParam] 的 `param` 参数的预设枚举构造函数，该函数仅用于微调设置 `pitch` 值，如需使用预设枚举来设置变声，请使用新增的 [setVoiceChangerPreset] 函数。

    相关 API 请参考 [setVoiceChangerPreset](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#set-voice-changer-preset), [setVoiceChangerParam](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#set-voice-changer-param)

2. 废弃设置混响参数函数 [setReverbParam] 的 `param` 参数的预设枚举构造函数，该函数仅用于微调设置具体的混响参数值，如需使用预设枚举来设置混响，请使用新增的 [setReverbPreset] 函数。

    相关 API 请参考 [setReverbPreset](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#set-reverb-preset), [setReverbAdvancedParam](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#set-reverb-advanced-param)




## 1.16.1 版本 <a id="1.16.1"></a>

**发布日期： 2020-10-15**


**改进优化**

1. 媒体播放器内部启用快速 seek 配置，优化媒体播放器加载 MP3 文件缓慢的现象。

2. 升级第三方库，保障 SDK 安全质量水平，FFmpeg 升级到 4.2.2 版本。

**问题修复**

1. 修复少部分用户出现视频编码码率骤降的问题。




## 1.16.0 版本 <a id="1.16.0"></a>

**发布日期： 2020-09-24**


**新增功能**

1. 新增音效播放器功能

    音效是指为了增强真实感或者烘托场景氛围播放的简短效果音，例如：在直播期间播放掌声、礼物音效、提示音等；在游戏中，播放子弹声、碰撞打击声。

    音效播放器支持音效播放（可以多音效重叠播放）、播放控制（如暂停播放、音量调节、设置播放进度）、预加载音效等功能。

    相关 API 请参考 [createAudioEffectPlayer](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#create-audio-effect-player), [destroyAudioEffectPlayer](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#destroy-audio-effect-player)

2. 新增支持设置和获取音频设备音量

    支持通过 setAudioDeviceVolume 接口设置音频设备（扬声器或麦克风）的采集音量后再推拉流，但由于系统限制可能导致此接口调用失败，推荐直接使用 setCaptureVolume 和 setPlayVolume 接口来调节推拉流音量。

    相关 API 请参考 [setAudioDeviceVolume](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#set-audio-device-volume), [getAudioDeviceVolume](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#get-audio-device-volume), [setCaptureVolume](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#set-capture-volume), [setPlayVolume](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#set-play-volume)

**问题修复**

1. 修复 [onRoomStreamExtraInfoUpdate] 可能会在预期外回调空列表的问题

    相关 API 请参考 [onRoomStreamExtraInfoUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoEventHandler#on-room-stream-extra-info-update)




## 1.15.2 版本 <a id="1.15.2"></a>

**发布日期： 2020-09-17**


**问题修复**

1. 修复用户进出房间回调接口 (onRoomUserUpdate) 有概率误触发全量回调的问题

    相关 API 请参考 [onRoomUserUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoEventHandler#on-room-user-update)




## 1.15.0 版本 <a id="1.15.0"></a>

**发布日期： 2020-09-10**


**新增功能**

1. 增加媒体播放器音量控制功能

    允许单独设置和获取媒体播放器的本地播放音量和推流音量。

    相关 API 请参考 [ZegoMediaPlayer > setPublishVolume](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoMediaPlayer#set-publish-volume), [ZegoMediaPlayer > setPlayVolume](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoMediaPlayer#set-play-volume)

2. 新增设置音频采集双声道模式功能

    双声道即两个声音通道，听到声音时可以根据左耳和右耳对声音相位差来判断声源的具体位置。当开发者开启双声道采集后，使用专门的双声道采集设备，可以采集到双声道的音频数据并进行推流（推流需同时通过 `setAudioConfig` 接口开启双声道音频编码功能）。

    相关 API 请参考 [setAudioCaptureStereoMode](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#set-audio-capture-stereo-mode), [setAudioConfig](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#set-audio-config)

3. 开启声浪/音频频谱监控的接口支持设置回调间隔时间

    开发者可自行控制声浪/音频频谱监控的回调间隔，默认为 100 ms，取值范围为 [100, 3000]。

    相关 API 请参考 [startSoundLevelMonitor](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#start-sound-level-monitor), [startAudioSpectrumMonitor](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#start-audio-spectrum-monitor)

4. 新增切换房间时配置进阶属性功能

    切换房间时允许对新房间的属性进行配置，如登录鉴权等。

    相关 API 请参考 [switchRoom](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#switch-room)

**问题修复**

1. 修复自定义采集 [onStop] 事件在用户被踢出房间后不触发的问题

**废弃删除**

1. 废弃媒体播放器中的 [getVolume] 接口，请使用 [getPlayVolume] 和 [getPublishVolume] 代替

2. 废弃 `onRemoteAudioData`, 请使用 `onPlaybackAudioData` 代替

3. 废弃 `ZegoAudioDataCallbackBitMaskRemote`, 请使用 `ZegoAudioDataCallbackBitMaskPlayback` 代替




## 1.14.0 版本 <a id="1.14.0"></a>

**发布日期： 2020-08-27**


**新增功能**

1. 新增切换房间功能

    该功能支持用户切换房间，调用 switchRoom 接口后停止上一个房间的推拉流并进入新房间，切换房间成功会收到新房间登录成功的回调。与之前通过调用登出原房间和加入新房间两个接口实现的方法相比，更易用也更高效。

    相关 API 请参考 [switchRoom](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#switch-room)

2. 新增自定义采集流控通知

    自定义采集使用码流推流时，当网络环境发生变化后，SDK 会向开发者抛出需要进行流控的通知。

    相关 API 请参考 [onEncodedDataTrafficControl](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoCustomVideoCaptureHandler#on-encoded-data-traffic-control)

**改进优化**

1. 增加 onRoomStreamExtraInfoUpdate 的触发时机

    当用户进入房间，房间内有流且带有附加信息时，onRoomStreamExtraInfoUpdate 将会回调，因此开发者只需要关心此回调即可处理流附加信息的逻辑。

    相关 API 请参考 [onRoomStreamExtraInfoUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoEventHandler#on-room-stream-extra-info-update)

**问题修复**

1. 修复在推拉流过程中直接调用 destroyEngine 后，下一次调用开启自定义视频采集渲染、自定义音频采集渲染接口会失败的问题。

    相关 API 请参考 [enableCustomVideoCapture](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#enable-custom-video-capture), [enableCustomVideoRender](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#enable-custom-video-render), [enableCustomAudioIO](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#enable-custom-audio-io)

2. 修复 onPlayerRecvSEI 会接收到编码器或者视频文件本身附带的 SEI 的问题。

    相关 API 请参考 [onPlayerRecvSEI](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoEventHandler#on-player-recv-sei)




## 1.13.0 版本 <a id="1.13.0"></a>

**发布日期： 2020-08-13**


**新增功能**

1. 新增多房间功能

    该功能支持同一用户可以同时加入多个房间，目前可进入的总房间数最多为两个。用户加入房间后，只能在主房间中推流，但可以在所有房间中拉流，并且可以正常接收每个房间的信令和回调。该功能通常用于“超级小班”等场景，若需要开启，请联系 ZEGO 技术支持。

    相关 API 请参考 [loginMultiRoom]

2. 新增房间附加消息功能

    该功能可以设置一个以房间为单位的附加消息，该消息跟随整个房间的生命周期，每个登录到房间的用户都能够同步消息。开发者可用于实现各种业务逻辑，如房间公告等等。目前房间附加消息只允许设置一个键值对，且 key 最大长度为 10 字节，value 最大长度为 100 字节。

    相关 API 请参考 [setRoomExtraInfo](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#set-room-extra-info)

3. 新增音频前/后处理功能

    允许开发者在采集音频数据后，或者拉取远端音频数据渲染前，对音频数据进行自定义处理。该功能通常用于 “变声”、“美声” 等场景。

    相关 API 请参考 [enableCustomAudioCaptureProcessing](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#enable-custom-audio-capture-processing), [enableCustomAudioRemoteProcessing](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#enable-custom-audio-remote-processing)

**改进优化**

1. 扩大推拉流采集音量范围

    推流采集音量与拉流播放音量范围由 0 ~ 100 扩大至 0 ~ 200，默认值为 100。

    相关 API 请参考 [setCaptureVolume](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#set-capture-volume), [setPlayVolume](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#set-play-volume)




## 1.12.3 版本 <a id="1.12.3"></a>

**发布日期： 2020-08-06**


**问题修复**

1. 修复当登录房间失败后立即重新登录房间时，可能会抛出预期外的 `超过最大房间登录数量` 错误码的问题。




## 1.12.0 版本 <a id="1.12.0"></a>

**发布日期： 2020-07-30**


**新增功能**

1. 新增音效均衡器（EQ）

    支持调整 10 个频带的增益值，从而达到调整音色的目的。

    相关 API 请参考 [setAudioEqualizerGain](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#set-audio-equalizer-gain)




## 1.11.4 版本 <a id="1.11.4"></a>

**发布日期： 2020-07-23**


**问题修复**

1. 修复 `AudioDataCallback` 可能不回调的问题。

2. 修复 ZegoAudioConfig 的 codecID 当设为 Low3 时无效的问题。

3. 修复 `destroyEngine` 时个别功能组件销毁失败的问题。

4. 修复当快速 destroy/create engine 时 MediaRecord 可能不回调的问题。




## 1.11.0 版本 <a id="1.11.0"></a>

**发布日期： 2020-07-15**


**改进优化**

1. IM 消息内容传输长度增加至 1024 个字节，包括房间广播消息 `broadcast message` 和房间弹幕消息 `barrage message`。

2. 使用自定义视频采集时，`setVideoMirrorMode` 和 `setPublishWatermark` 均可生效。




## 1.10.0 版本 <a id="1.10.0"></a>

**发布日期： 2020-06-30**


**新增功能**

1. 新增虚拟立体声、变声、混响功能。

    开发者基于此可实现一些音频前处理效果。

    相关 API 请参考 [enableVirtualStereo](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#enable-virtual-stereo), [setVoiceChangerParam](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#set-voice-changer-param), [setReverbAdvancedParam](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#set-reverb-advanced-param)

2. 新增本地媒体录制功能。

    开发者可将音视频流录制成本地文件，便于日后作回放等用途。

    相关 API 请参考 [startRecordingCapturedData](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#start-recording-captured-data), [stopRecordingCapturedData](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#stop-recording-captured-data)

3. 新增获取音频 PCM 数据功能。

    开发者通过监听音频数据回调获取 PCM 数据后可作进一步用途，如对接第三方音频鉴黄、字幕生成等功能。

    相关 API 请参考 [enableAudioDataCallback]

4. 新增自定义渲染新增获取拉流端未解码数据回调。

    开发者可通过此回调获取未解码数据之后自行解码渲染：`ZegoCustomVideoRenderConfig` 中允许将 `bufferype` 的类型设置为 `EncodedData`

5. 新增音频降噪模式，默认为 `Medium` 中等模式。

    相关 API 请参考 [setANSMode](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#set-ans-mode)

6. 新增自定义音频采集与渲染功能。

    开发者可通过此功能自行采集音频数据发送给 SDK，并且自行获取远端拉流的音频数据来处理或播放。

    相关 API 请参考 [enableCustomAudioIO](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#enable-custom-audio-io)

**改进优化**

1. 增加新错误码 `1001011`

    当开发者使用了未支持的 bufferType 传入自定义视频渲染配置时，会报错此错误，提醒开发者设置有误。




## 1.9.3 版本 <a id="1.9.3"></a>

**发布日期： 2020-06-28**


**问题修复**

1. 修复自定义视频采集推辅流时会可能出现异常的问题




## 1.9.1 版本 <a id="1.9.1"></a>

**发布日期： 2020-06-17**


**问题修复**

1. 修复正式环境下预期之外可能弹窗的问题




## 1.9.0 版本 <a id="1.9.0"></a>

**发布日期： 2020-06-15**


**新增功能**

1. 增加 `enableCustomVideoCapture`, `enableCustomVideoRender` 接口，允许在`createEngine` 之后，预览/推拉流之前，选择是否使用自定义视频采集/渲染功能。

2. 增加混音模块功能：开启混音、对本地混音静音、设置混音音量、向 SDK 拷贝混音数据的回调。

3. 添加桌面端声卡采集功能 `enableMixSystemPlayout`（仅支持 macOS/Windows）。

4. 增加 `enableHeadphoneMonitor` 接口，支持耳返功能。

5. 增加自定义视频采集模块里的 `sendCustomVideoCaptureEncodedData`，支持发送已编码好的码流数据。

**改进优化**

1. C++ 11 接口优化成全开源 API，与 C 接口共用一套符号，开发者拿到 C++ SDK 后可自行选择使用 C 或 C++ 接口。

2. C++ API 合并 19 个有关推流 channel 的重载接口，改为带默认参数的形式。

**问题修复**

1. 修复媒体播放器视频帧回调的 `rotation` 参数有误的问题。

2. 修复使用辅流推流时可能会出现异常的问题。

3. 修复 `setEventHandler` 无法设置为空的问题。

4. 修复部分回调在 `destroyEngine` 之后将不再回调的问题。

**废弃删除**

1. 废弃 `ZegoEngineConfig` 类里的 `customVideoCaptureMainConfig`, `customVideoCaptureAuxConfig`, `customVideoRenderConfig` 成员，请使用上述新增的 `enableCustomVideoCapture`, `enableCustomVideoRender` 接口。




## 1.8.2 版本 <a id="1.8.2"></a>

**发布日期： 2020-06-11**


**问题修复**

1. 修复 `advancedConfig` 含有特殊字符时设置失败的问题。




## 1.8.0 版本 <a id="1.8.0"></a>

**发布日期： 2020-05-31**


**新增功能**

1. 增加获取当前音频质量参数（音频码率、推流声道数等）和视频参数（分辨率、码率、帧率等），接口分别为：`getAudioConfig` 和 `getVideoConfig`，方便开发者随时获取和管理当前音视频质量参数。

2. 增加获取音频设备的状态，对应接口为：`isMuteMicrophone` 和 `isMuteSpeaker`，方便开发者管理音频设备的状态。

**问题修复**

1. 修复部分内部状态生命周期过长或过短的问题。




## 1.7.5 版本 <a id="1.7.5"></a>

**发布日期： 2020-05-15**


**新增功能**

1. 新增错误码 `1000008`。

    再次调用 `setEventHandler` 更改 Event Handler 前需要显式置空。




## 1.7.0 版本 <a id="1.7.0"></a>

**发布日期： 2020-04-30**


**新增功能**

1. 新增房间在线人数更新回调 `onRoomOnlineUserCountUpdate`；开发者基于此回调可以实时监听当前房间人数的变更情况，并以 UI 形式向用户展示。

2. 新增媒体播放器实例 index 的可读属性。

3. 新增错误码枚举描述头文件，开发者可直接通过头文件查看所有 Express 的错误码。

4. 新增 C++ SDK 对 Android/iOS 平台的支持，可用于 Cocos2d-x 等跨平台框架。

**问题修复**

1. 修复混流时带鉴权转推 CDN 的情况下，会因为 URL 非法被过滤的问题。




## 1.6.0 版本 <a id="1.6.0"></a>

**发布日期： 2020-04-15**


**新增功能**

1. 为 `onPublisherQualityUpdate` 回调新增几个质量属性，包括 `totalSendBytes`（已发送的总字节数）、`audioSendBytes`（已发送的音频字节数）、`videoSendBytes`（已发送的视频字节数）。开发者可以根据这些属性进行推流数据的统计。

2. 为 `onPlayerQualityUpdate` 回调新增几个质量属性，包括 `totalRecvBytes`（已接收的总字节数）、`audioRecvBytes`（已接收的音频字节数）、`videoRecvBytes`（已接收的视频字节数）、`peerToPeerDelay`（端到端延迟）、`peerToPeePacketLostRate`（端到端丢包率）。开发者可以根据这些属性进行拉流数据和拉流延迟的统计。

**改进优化**

1. 重构 API 上报模块，优化逻辑。




## 1.5.5 版本 <a id="1.5.5"></a>

**发布日期： 2020-03-31**


**改进优化**

1. 优化 API 注释。




## 1.5.1 版本 <a id="1.5.1"></a>

**发布日期： 2020-03-19**


**问题修复**

1. 修复正确填写混流配置后发起混流时，仍有几率被 SDK 检测为混流失败的问题。

2. 修复混流转推 CDN 时，RTMP 格式 URL 检测有误的问题。

3. 修复一些极端场景下未抛出正确错误码的问题。




## 1.5.0 版本 <a id="1.5.0"></a>

**发布日期： 2020-03-14**


**新增功能**

1. 增加场景预配置属性。

    开发者在调用 `createEngine` 时，可选择应用场景，SDK 会针对实时通讯场景和直播场景进行最优预配置。

2. 增加推辅流功能。

    当开发者需要实现一路流推摄像头，另一路流推如屏幕采集等输入源时，可使用推辅流功能。该功能可用于实现教学、会议等场景。

3. 增加设置视频编码 ID。

    开发者通过在 `setVideoConfig` 中设置 codecID 为 multi layer，可使用分层编码的功能。

4. 增加推流流控功能。

    开发者可通过调用 `enableTrafficControl` 选择流控的自适应属性，包括：自适应分辨率、自适应码率、自适应帧率。

5. 增加直接推流到 CDN 功能。

    开发者可通过指定具体 CDN 的 URL（或使用Zego后台配置），直接将音视频流推送到 CDN，需在推流前设置。

    相关 API 请参考 [enablePublishDirectToCDN](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#enable-publish-direct-to-cdn)

6. 增加拉流进阶配置。

    `startPlayingStream` 增加一个重载 API ，实现进阶拉流功能。开发者可通过设置拉流CDN配置，直接通过 URL 进行拉流。当推流方使用了直推或转推 CDN 功能的情况下，拉流方需要使用 URL 进行拉流。当推流方开启了分层编码功能后，拉流方可通过设置 videoLayer 为 base 以拉取低分辨率图层。

7. 混流支持标识每条输入流的声浪。

    当开发者需要让拉混流的观众知道当前每条流的声浪状态时，可在发起混流时调用 `enableSoundLevel` 开启 sound level，且在每条输入流配置中标记一个唯一的音浪ID，则拉流方可以通过监听 `onMixerSoundLevelUpdate` 获取每条流的音浪通知。

8. 增加房间弹幕消息功能。

    当开发者需要在超过 500 人的房间中发送一些业务不可靠的消息时（如弹幕消息，房间每位观众不一定都必须收到每一条信息），可使用房间弹幕消息功能。

    相关 API 请参考 [sendBarrageMessage](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#send-barrage-message)

9. 自定义视频采集时支持 SDK 内部渲染预览画面。

    当开发者使用自定义采集功能时，无需再自行进行渲染，方便使用。

**改进优化**

1. 废弃原本无参数的 `destroyEngine` 接口，增加同名但带一个 callback 参数的 `destroyEngine` 接口。

    当开发者销毁 SDK 且收到回调时，则可认为 SDK 内部占用资源已释放，此时开发者可进行多家 SDK 的切换。




## 1.4.0 版本 <a id="1.4.0"></a>

**发布日期： 2020-02-13**


**新增功能**

1. 新增支持自定义视频采集、自定义视频渲染。




## 1.3.5 版本 <a id="1.3.5"></a>

**发布日期： 2020-01-17**


**问题修复**

1. 修复媒体播放器的一些问题。




## 1.3.4 版本 <a id="1.3.4"></a>

**发布日期： 2019-12-27**


**新增功能**

1. 新增媒体播放器 (MediaPlayer) 模块。

2. 新增 SEI (媒体增强补充信息) 模块。

3. 新增 `setAudioConfig` 接口，可选择配置推流前音频参数（音频编码类型/音频码率/声道数）




## 1.3.3 版本 <a id="1.3.3"></a>

**发布日期： 2019-12-13**


**新增功能**

1. 新增流附加信息更新接口。

2. 新增监听音频声浪与频域功率谱接口。

3. 新增改变采集缩放时机接口。

4. 新增帧顺序检测开关接口。

5. 新增预览/拉流 Canvas 背景色设置。

6. 新增推流/拉流水印设置接口。

**改进优化**

1. 日志功能优化。




## 1.2.1 版本 <a id="1.2.1"></a>

**发布日期： 2019-11-27**


**新增功能**

1. 新增混流模块。

2. 新增 IM 模块。




## 1.1.1 版本 <a id="1.1.1"></a>

**发布日期： 2019-11-11**


**新增功能**

1. 新增日志压缩上报功能，支持测试环境上报全量接口调用日志，用于接口使用情况分析。

**问题修复**

1. 对齐各端接口，接口命名、参数命名、取值等统一。




## 1.1.0 版本 <a id="1.1.0"></a>

**发布日期： 2019-11-01**


**新增功能**

1. 首次发布，包含系统、房间、推流、拉流、前处理、设备模块。





