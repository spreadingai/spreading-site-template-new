# 发布日志

- - -

## 3.22.0 版本<a id="3.22.0"></a>

**发布日期： 2025-08-26**

**新增功能**

1. 新增静态图片采集视频源 

    通过设置 [setVideoSource](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoExpressEngine#set-video-source) 视频源为 `Picture`，即可推流一张指定的图片。

    相关 API 请参考：[setVideoSource](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoExpressEngine#set-video-source)

2. 半自动混流支持混流对齐能力

    相关 API 请参考：[ZegoAutoMixerTask](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~struct~ZegoAutoMixerTask#zego-auto-mixer-task)

3. 媒体播放器实例个数限制放开至 10 个

    详细请参考 [媒体播放器](/live-streaming-windows/other/media-player)。

4. 媒体播放器边下边播支持分片文件存储，避免一次性申请内存过大

    <Warning title="注意">
    如需使用本功能，请联系 ZEGO 技术支持。
    </Warning>

5. 拉流切换功能支持强制切换模式

    启用强制切换模式，可避免在弱网环境下，从高码率档位切换至低码率档位时长时间拉不到流的情况。

    相关 API 请参考：[SwitchPlayingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoExpressEngine#switch-playing-stream)

6. 新增非主线程（ UI 线程）的音视频首帧耗时回调接口，可在主线程阻塞时更准确地统计首帧耗时

    相关 API 请参考：[onPlayerSyncRecvAudioFirstFrame](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoEventHandler#on-player-sync-recv-audio-first-frame)、[onPlayerSyncRecvVideoFirstFrame](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoEventHandler#on-player-sync-recv-video-first-frame)、[onPlayerSyncRecvRenderVideoFirstFrame](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoEventHandler#on-player-sync-recv-render-video-first-frame)


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


    相关 API 请参考：[SwitchPlayingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoExpressEngine#switch-playing-stream)

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

    相关 API  请参考：[enableAudioMixing](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoExpressEngine#enable-audio-mixing)、[setAudioMixingVolume](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoExpressEngine#set-audio-mixing-volume)、[muteLocalAudioMixing](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoExpressEngine#mute-local-audio-mixing) 

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

    在桌面端使用屏幕共享时，可以为共享窗口添加一个高亮描边，并设置描边的颜色和宽度，提升共享窗口的识别度。详情请参考 [屏幕共享 - 描边](/real-time-video-windows-cpp/video/screen-sharing#描边)。

    <Warning title="注意">
    Windows 平台部分系统窗口（例如任务管理器、以管理员权限启动的程序的窗口等）可能因权限限制无法显示描边，建议以管理员权限启动应用。
    </Warning>



    相关 API 请参考 [enableHightLight](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoScreenCaptureSource#enable-hight-light)

2. 新增屏幕共享采集源异常类型回调

    当屏幕共享的采集源（如窗口或屏幕区域）出现异常时，新增的 [onCaptureTypeExceptionOccurred](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoScreenCaptureSourceEventHandler#on-capture-type-exception-occurred) 回调将返回具体的异常采集源类型，帮助开发者快速定位问题场景。详情请参考 [屏幕共享 - 设置事件回调](https://doc-zh.zego.im/article/6518#callback)。

    相关 API 请参考 [onCaptureTypeExceptionOccurred](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoScreenCaptureSourceEventHandler#on-capture-type-exception-occurred)

3. 支持自定义 CDN 拉流超时等待时间

    <Warning title="注意">


    如需使用本功能，请联系 ZEGO 技术支持。


    </Warning>



    针对从 CDN 拉流超时等待过长，导致用户实际体验不佳的情况，SDK 对 CDN 拉流内部超时逻辑优化，降低超时等待时长。此外，SDK 支持开发者自定义拉流超时时间。

4. 支持推流时设置直播标题

    若要在直播列表等场景展示直播标题，SDK 支持开发者在主播调用 [startPublishingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoExpressEngine#start-publishing-stream) 接口开始推流前，通过 [ZegoPublisherConfig](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~struct~ZegoPublisherConfig) 中的 streamTitle 参数配置标题。

    相关 API 请参考 [startPublishingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoExpressEngine#start-publishing-stream), [ZegoPublisherConfig > streamTitle](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~struct~ZegoPublisherConfig#stream-title)

5. 媒体播放器新增有关资源文件权限的错误码

    优化媒体播放器的回调通知逻辑，针对“播放资源无权限”的错误新增错误码 1008015，帮助开发者快速定位问题。

    相关 API 请参考 [onMediaPlayerStateUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoMediaPlayerEventHandler#on-media-player-state-update)

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



---

## 3.20.2 版本 <a id="3.20.2"></a>

**发布日期： 2025-03-27**

**问题修复**

1. 修复了屏幕共享的已知问题


---

## 3.20.0 版本 <a id="3.20.0"></a>

**发布日期： 2025-03-21**


**新增功能**

1. 支持赛事解说场景的音画精准同步

    <Warning title="注意">


    如需使用该功能，请联系 ZEGO 技术支持。


    </Warning>



    为赛事解说场景新增接口，支持解说流与赛事流的音画精准同步对齐，为观众带来优质的观看体验。

2. 新增用户维度的网络质量回调

    新增 [onRtcStats](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoEventHandler#on-rtc-stats) 回调，开发者可用于衡量用户维度的 RTC 网络质量，该接口将本端用户所有推、拉流的质量数据进行聚合统计并回调，包括：<ul><li>上行 & 下行：占用带宽、RTT、丢包率。</li><li>端到端延迟。</li></ul>

    相关 API 请参考 [onRtcStats](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoEventHandler#on-rtc-stats)

**改进优化**

1. 优化直推 CDN 时因弱网导致的本地录制卡顿现象

    <Warning title="注意">


    如需使用该功能，请联系 ZEGO 技术支持。


    </Warning>



    在直推 CDN 网络不稳定的情况下，保障本地录制的画面流畅，适用于对本地录像要求较高的在线教育以及会议等场景。

**问题修复**

1. 修复已知问题，优化 SDK 性能



---

## 3.19.0 版本 <a id="3.19.0"></a>

**发布日期： 2025-01-20**


**新增功能**

1. 新增 AI 低照度增强功能

    <Warning title="注意">


    如需使用该功能，请联系 ZEGO 技术支持。


    </Warning>



    低照度增强功能新增 AI 算法，相比传统算法，画面色彩更加饱满、对比度更真实且噪点抑制效果更好，整体画质的主观效果提升明显。

    开发者可通过 [setLowlightEnhancementParams](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoExpressEngine#set-lowlight-enhancement-params) 指定使用 AI 算法，当设备性能不足以支持开启 AI 算法时，SDK 会自动使用传统算法。一般中高端机型可稳定运行低照度增强 AI 算法，详细请参考 [推流视频增强](https://doc-zh.zego.im/article/18882) 文档。

    相关 API 请参考 [setLowlightEnhancementParams](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoExpressEngine#set-lowlight-enhancement-params)

2. 独唱场景下支持动态响度均衡功能

    开启动态响度均衡后，根据媒体播放器伴奏的实时表现，SDK 动态调整人声响度，使人声与伴奏响度时刻保持恰当比例，提升人声与伴奏融合度，观众体验更佳，适用于实时 KTV 的独唱场景。

    相关 API 请参考 [enableAuxBgmBalance](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoExpressEngine#enable-aux-bgm-balance)

3. 媒体播放器播放在线资源时，支持缓存资源文件

    开发者可通过配置 [ZegoMediaPlayerResource-onlineResourceCachePath](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~struct~ZegoMediaPlayerResource#online-resource-cache-path) 参数，设置缓存资源文件路径。此外可通过 [ZegoMediaPlayerResource-maxCachePendingLength](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~struct~ZegoMediaPlayerResource#max-cache-pending-length) 参数设置从当前播放时间点，最多可预缓存的数据长度（单位 bytes）。从而使媒体播放器播放在线资源时，可以减少用户资源下载频次，提高资源复用率与用户体验。

    <Warning title="注意">


    生成缓存文件的同时，SDK 同时会生成一个 ".info "后缀的文件，用于记录缓存信息（如缓存的起始位置等）。用户使用该功能时，需要自行负责清理"缓存文件"及"缓存信息文件"。


    </Warning>



    相关 API 请参考 [ZegoMediaPlayerResource > onlineResourceCachePath](https://doc-zh.zego.im/), [ZegoMediaPlayerResource > maxCachePendingLength](https://doc-zh.zego.im/)

4. 自定义视频采集功能支持由开发者控制外部时间戳

    使用自定义视频采集时，支持由开发者自行对齐音频帧和视频帧的外部时间戳，保证音画同步以及播放器正常工作。

    相关 API 请参考 [ZegoVideoEncodedFrameParam > isExternalClock](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~struct~ZegoVideoEncodedFrameParam#is-external-clock)

**改进优化**

1. 优化 CDN 域名解析逻辑，避免阻塞线程

    CDN 推拉流的域名解析逻辑，由同步改为异步操作，避免阻塞线程。

2. 降低首帧延迟，提升用户秒开体验

    针对首次运行 ZEGO Express SDK 的设备，可降低进房耗时、推拉流耗时，提升用户秒开体验。

3. PC 端回调接口支持非主线程回调

    在 macOS 与 Windows 平台的 [createEngine](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~ZegoExpressSDK#create-engine) 接口中，新增 [callbackSwitchToMainThread] 参数，当其设置为 false 时，回调接口支持非主线程回调，适用于单元测试等无交互界面的测试场景。

    相关 API 请参考 [createEngine](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~ZegoExpressSDK#create-engine)



---


## 3.18.1 版本 <a id="3.18.1"></a>

**发布日期： 2024-12-16**


**问题修复**

1. 修复在音视频通话过程中，漏回声的问题

2. 登录耗时优化

3. 修复实验性 API 老版本兼容性的问题

4. 修复媒体播放器低概率状态异常的问题



---



## 3.18.0 版本 <a id="3.18.0"></a>

**发布日期： 2024-12-03**


**新增功能**

1. 新增 AI 回声消除（AEC）

    <Warning title="注意">


    如需使用该功能，请联系 ZEGO 技术支持。


    </Warning>



    AI AEC 支持智能识别并且消除回声。相较传统 AEC 算法，人声保真度效果提升明显，且没有额外的延迟与功耗增量。适用于实时 KTV 、高音质语聊与视频等场景。

    相关 API 请参考 [ZegoAECModeAI](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~enum~ZegoAECMode#zego-aec-mode-ai)

2. 支持将混流后的输出流加入到目标房间

    混流功能支持将混流后的输出流，加入到指定房间，即支持设置输出流的目标房间信息 [targetRoom](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~struct~ZegoMixerOutput#target-room)。每条输出流只支持加入一个房间，且一旦添加，混流过程中不支持动态更新房间。如需使用服务端接口实现该功能，可参考 [开始混流](/live-streaming-server/api-reference/stream-mixing/start-mix) 文档。

    相关 API 请参考 [targetRoom](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~struct~ZegoMixerOutput#target-room)

**改进优化**

1. 优化低照度增强功能中的降噪效果

2. AI 变声新增性能不足的回调

    部分机型由于睿频等原因引起性能不足，可能导致 AI 变声中途失效。现新增性能不足的相关回调通知，以便开发者做后续业务处理。

    相关 API 请参考 [onEvent](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoAIVoiceChangerEventHandler#on-event)

3. 减少推拉流耗时，提升 SDK 性能

**问题修复**

1. 修复媒体播放器 URL 链接带空格时，加载失败的问题

2. 修复媒体播放器开启本地缓存后，偶现播放崩溃的问题



---


## 3.17.0 版本 <a id="3.17.0"></a>

**发布日期： 2024-09-27**


**新增功能**

1. 媒体播放器播放透明特效时，支持 Alpha 数据布局在 RGB 数据右上方

    媒体播放器播放透明特效时，新增 [ZegoAlphaLayoutType > ZegoAlphaLayoutTypeRightTop](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~enum~ZegoAlphaLayoutType#zego-alpha-layout-type-right-top)  枚举，以支持 Alpha 数据拼接在 RGB 数据右上方，设置此枚举时，仅支持 0.5x 的缩放倍率，详情请参考  [播放透明礼物特效](https://doc-zh.zego.im/article/17583) 文档。

    相关 API 请参考 [loadResourceWithConfig](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoMediaPlayer#load-resource-with-config), [ZegoAlphaLayoutTypeRightTop](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~enum~ZegoAlphaLayoutType#zego-alpha-layout-type-right-top)

2. 支持自定义观众上麦前和下麦后的拉流资源类型

    支持分别设置观众在上麦前和下麦后的拉流资源类型，使拉流方式更灵活，可设置分别为：通过 RTC 拉流、超低延迟直播（L3）拉流或 CDN 拉流中任意一种拉流方式。例如，可用于实现直播连麦场景中，观众上麦前默认使用 L3 拉流，上麦互动时切换为通过 RTC 拉流，下麦后恢复为通过 L3 拉流。

    相关 API 请参考 [startPlayingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoExpressEngine#start-playing-stream), [ZegoStreamResourceModeCustom](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~enum~ZegoStreamResourceMode#zego-stream-resource-mode-custom), [ZegoPlayerConfig > customResourceConfig](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~struct~ZegoPlayerConfig#custom-resource-config)

**改进优化**

1. 登录房间时，userName 字段改为非必填字段

    调用 [loginRoom](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoExpressEngine#login-room) 接口登录房间时，`userName` 原来为必填字段，本次优化为非必填的可选字段。

    相关 API 请参考 [loginRoom](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoExpressEngine#login-room)

2. 优化双声道变声效果，并提升音乐变调的音质

    相关 API 请参考 [setVoiceChangerParam](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoExpressEngine#set-voice-changer-param)

**问题修复**

1. 修复无法解析 H.265 码流中，存在异常裁剪区域的问题

2. 修复 D3D11 渲染纹理下，采样出现白条的问题

3. 修复反初始化时，监控模块崩溃，导致主线程卡死的问题

4. 修复版权音乐在开始打分时，可能出现崩溃的问题

5. 调整生命周期，修复已知崩溃问题

6. 修复媒体播放器已知的问题



---

## 3.16.0 版本 <a id="3.16.0"></a>

**发布日期： 2024-07-26**


**新增功能**

1. AI 降噪新增低延迟模式

    注意：如需使用该功能，请联系 ZEGO 技术支持。

    在 10ms 延迟下，依然保持纯净的降噪效果以及高保真的人声音质，适用于游戏语音、游戏开黑、实时合唱等对延迟较为敏感的场景，目前 AI 降噪已支持均衡模式、低延迟模式以及轻量模式，详情请参考 [场景化 AI 降噪](https://doc-zh.zego.im/article/14830)。

    相关 API 请参考 [setANSMode](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoExpressEngine#set-ans-mode)

2. 在推流时，可以控制该流是否允许审核

    注意：若某条流设置为允许审核，如果开发者没有发起审核任务，这条流也不会被送审。

    当调用审核接口时，默认会对房间内的所有流进行审核。如果客户端要控制某条流不可以被送审，可以在调用 [startPublishingStream] 接口开始推流时，将送审标识 [streamCensorFlag] 参数设置为 1（不允许）。

    相关 API 请参考 [startPublishingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoExpressEngine#start-publishing-stream), [ZegoPublisherConfig > streamCensorFlag](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~struct~ZegoPublisherConfig#stream-censor-flag)

3. 媒体播放器播放倍速最低支持至 0.3 倍速

    媒体播放器的播放速度区间从 [0.5,4.0]，扩大为 [0.3,4.0]，更多内容请参考 [媒体播放器](https://doc-zh.zego.im/article/14781)。

    相关 API 请参考 [setPlaySpeed](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoMediaPlayer#set-play-speed)

4. 通过超低延迟直播（L3）拉流时，支持自适应码率播放

    注意：如需使用该功能，请联系 ZEGO 技术支持。

    使用 ZEGO 超低延迟直播（L3）拉流时，支持根据用户的网络带宽自适应平滑切换不同码流，保障用户的流畅播放体验。

    [ZegoPlayerConfig] 新增 `adaptiveSwitch` 和 `adaptiveTemplateIDList` 参数，用于支持 OnlyL3 拉流模式下，基于网络环境的码率自适应切换。

    相关 API 请参考 [startPlayingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoExpressEngine#start-playing-stream), [adaptiveSwitch](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~struct~ZegoPlayerConfig#adaptive-switch), [adaptiveTemplateIDList](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~struct~ZegoPlayerConfig#adaptive-template-id-list)

5. 支持使用 CDN 拉流时进行平滑切换

    注意：如需使用该功能，请联系 ZEGO 技术支持。

    新增 [switchPlayingStream] 接口，用于开发者拉 CDN 流时，平滑切换至其他 CDN 流，即成功拉到新流后，才会停止拉旧流。

    例如，当视频画面从小窗口切换为大窗口时，需将视频切换为码率和分辨率更高的流，此时将会在成功拉到新流后，才会停止拉旧流，以达到平滑切换的效果。

    相关 API 请参考 [switchPlayingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoExpressEngine#switch-playing-stream)

6. H.265 客户端编码自动兼容策略新增用户级的协商范围

    注意：如需使用该功能，请联系 ZEGO 技术支持。

    控制本端客户端编码兼容范围为房间内所有推流用户或所有用户，即当指定范围内存在用户不支持 H.265 时，本端客户端编码动态回退。

    相关 API 请参考 [loginRoom](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoExpressEngine#login-room), [startPublishingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoExpressEngine#start-publishing-stream), [ZegoPublisherConfig > codecNegotiationType](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~struct~ZegoPublisherConfig#codec-negotiation-type), [ZegoRoomConfig > capabilityNegotiationTypes](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~struct~ZegoRoomConfig#capability-negotiation-types)

**问题修复**

1. 修复偶现多 SPS 和 PPS 文件硬解导致设备发热严重的问题

**废弃删除**

1. 废弃拉流接口中关于 CDN Plus 的配置

    下架畅直播概念，废弃 CDN Plus 直播相关接口。如需实现直播功能，推荐使用 ZEGO 自研 [超低延迟直播产品](https://doc-zh.zego.im/article/13405)，实现更高质量的直播体验。

    相关 API 请参考 [ZegoStreamResourceMode > ZegoStreamResourceModeCDNPlus](https://doc-zh.zego.im/)



---

## 3.15.1 版本 <a id="3.15.1"></a>

**发布日期： 2024-06-05**


**问题修复**

1. 修复媒体播放器的已知问题



---

## 3.15.0 版本 <a id="3.15.0"></a>

**发布日期： 2024-05-29**


**新增功能**

1. 支持针对媒体播放器输出的声音内容开启变声效果

    媒体播放器新增 [enableVoiceChanger] 接口 ，支持针对媒体播放器输出的声音内容开启变声效果，同时选择需要的变调音效。

    相关 API 请参考 [ZegoMediaPlayer > enableVoiceChanger](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoMediaPlayer#enable-voice-changer)

**改进优化**

1. 优化 AI 场景化降噪中，“均衡模式”的降噪效果

    优化 AI 场景化降噪中，“均衡模式”的降噪效果，在性能不变的情况下，人声清晰度、平稳度进一步提升，且噪音抑制更干净，详情请参考 [场景化 AI 降噪](https://doc-zh.zego.im/article/14830)。

**问题修复**

1. 修复摄像头枚举访问野指针的问题

2. 修复通过辅路推流的输入源，在使用主路推流的情况下，若停止音视频引擎，会出现概率性崩溃的问题

**废弃删除**

1. 废弃媒体播放器 [setVoiceChangerParam] 接口

    为提升在变声情况下的播放体验，废弃媒体播放器 [ZegoMediaPlayer.setVoiceChangerParam] 接口，请使用 [ZegoMediaPlayer.enableVoiceChanger] 代替。

    相关 API 请参考 [ZegoMediaPlayer > enableVoiceChanger](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoMediaPlayer#enable-voice-changer)



---

## 3.14.0 版本 <a id="3.14.0"></a>

**发布日期： 2024-04-23**


**新增功能**

1. 新增“汽车人”、“没电了” 两种变声音效

    [ZegoVoiceChangerPreset](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~enum~ZegoVoiceChangerPreset) 新增 “汽车人”、“没电了” 两种变声效果的枚举值，丰富变声效果。

    相关 API 请参考 [setVoiceChangerPreset](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoExpressEngine#set-voice-changer-preset)

2. 媒体播放器支持视频画面镜像

    相关 API 请参考 [enableViewMirror](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoMediaPlayer#enable-view-mirror)

3. 支持在图片资源校验失败时，依然正常发起混流任务

    [ZegoMixerTask](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~struct~ZegoMixerTask) 新增参数 mixImageCheckMode，用于控制背景图（backgroundImageURL）、输入流占位图（inputList.imageInfo.url）、水印图片（watermark.imageURL）等图片资源校验失败时，能否正常发起混流任务。

    该功能默认不开启（mixImageCheckMode 默认取值为 0），表示严格执行图片校验，即必须满足参数原有的 “支持协议和格式”、“图片大小”、“图片资源请求成功” 等规则，才能正常发起混流任务。

    ZEGO 服务端 API 混流接口此前已支持该功能，详情请参考 [开始混流](/real-time-video-server/api-reference/stream-mixing/start-mix) 的 CheckImageMode 参数。

    相关 API 请参考 [startMixerTask](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoExpressEngine#start-mixer-task)


4. 支持提前判断设备能否运行 AI 变声功能

    AI 变声功能对运行设备的性能有一定要求，开发者可以通过 [isAIVoiceChangerSupported](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoExpressEngine#is-ai-voice-changer-supported) 接口提前判断设备能否支持运行 AI 变声功能。

    相关 API 请参考 [isAIVoiceChangerSupported](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoExpressEngine#is-ai-voice-changer-supported)

**问题修复**

1. 修复未定义全局变量的释放时机，导致进程退出异常的问题

2. 修复媒体播放器打开 M3U8 格式的文件耗时较长的问题

3. 修复使用 AI 变声功能，偶现音画不同步、启停瞬间吞字的问题


---

## 3.13.2 版本 <a id="3.13.2"></a>

**发布日期： 2024-03-29**

**问题修复**

1. 修复已知问题


---

## 3.13.0 版本 <a id="3.13.0"></a>

**发布日期： 2024-03-14**


**新增功能**

1. 使用 QUIC 协议进行 CDN 推拉流时，支持 0-RTT 建立连接

    注意：

1. 该功能的安全性与传统方式相比稍低，请酌情使用。

2. 使用该功能时，需要将 [ZegoCDNConfig > protocol](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~struct~ZegoCDNConfig#protocol) 设置为 “quic”。

    [ZegoCDNConfig](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~struct~ZegoCDNConfig) 新增 quicConnectMode 属性，开发者在使用 QUIC 协议进行 CDN 推拉流时，可以设置为 QUIC 建连模式（即 quicConnectMode 取值为 1），0-RTT 建立连接，快速启用服务。目前已适配华为、网宿、腾讯等厂商的 CDN 直播产品。

    该功能默认不开启（即 quicConnectMode 默认为 0，表示正常建立连接）。

    相关 API 请参考 [ZegoCDNConfig > quicConnectMode](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~struct~ZegoCDNConfig#quic-connect-mode)

2. 屏幕共享时，支持采集指定进程的音频

    注意：该功能需要在调用 [startcapture](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoScreenCaptureSource#start-capture) 接口之前设置；并在调用 [setAudioSource](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoExpressEngine#set-audio-source) 接口时，选择音频采集源类型为 “ZEGO_AUDIO_SOURCE_TYPE_CUSTOM”。

    新增 [enableAudioCapture](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoScreenCaptureSource#enable-audio-capture) 接口，支持在屏幕共享时采集指定进程的音频。

    相关 API 请参考 [enableAudioCapture](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoScreenCaptureSource#enable-audio-capture), [startcapture](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoScreenCaptureSource#start-capture), [setAudioSource](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoExpressEngine#set-audio-source)

3. 支持设置转推 CDN 的超时时间，用于监控流是否存在

    注意：该功能只在发起转推时生效，转推过程中如果出现断连，SDK 会保持重试逻辑，此时无该回调通知。

    发起转推任务时，支持通过 [addPublishCdnUrl](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoExpressEngine#add-publish-cdn-url) 接口，设置转推 CDN 的超时时间，用于监控流是否存在。例如，开发者已经发起转推任务，但该条流还未开始推流，在超过设置的超时时间后，SDK 会返回一个流不存在的回调通知。

    该回调只会通知给转推发起者、而不是推流发起者。如果转推发起者和推流发起者不是同一个用户，建议开发者从服务端发起转推、并接收该通知。

    相关 API 请参考 [addPublishCdnUrl](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoExpressEngine#add-publish-cdn-url)

4. 支持回调本地录制的质量数据

    [ZegoDataRecordProgress](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~struct~ZegoDataRecordProgress) 新增 quality 属性，在本地录制过程中，通过该属性回调录制文件的帧率、码率等质量数据。

    相关 API 请参考 [onCapturedDataRecordProgressUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoDataRecordEventHandler#on-captured-data-record-progress-update)

5. 自定义视频渲染支持独立通道控制

    自定义视频渲染支持独立通道控制。例如，针对指定流 ID 只进行 SDK 内部渲染、但不执行自定义渲染。

    相关 API 请参考 [enableCapturedVideoCustomVideoRender](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoExpressEngine#enable-captured-video-custom-video-render), [enableRemoteVideoCustomVideoRender](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoExpressEngine#enable-remote-video-custom-video-render)

6. 支持获取 SDK 前处理后的视频数据，向 SDK 传入不同的视频数据分别用于预览和推流

    注意：该功能会增加性能消耗，请酌情使用。

    支持在获取到 Express SDK 视频前处理过的数据后，再进行其他的视频前处理操作（例如美颜等，需要开发者自行实现）、或将处理过的视频数据直接用于预览或推流。

    相关 API 请参考 [sendCustomVideoProcessedRawData](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoExpressEngine#send-custom-video-processed-raw-data)

7. 外部采集支持低照度增强和色彩增强

    注意：外部采集功能和视频前处理功能不能同时使用，否则可能会出现拉流画面异常。

    支持在开启外部采集功能后，分别通过 [setLowlightEnhancement](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoExpressEngine#set-lowlight-enhancement) 和 [enableColorEnhancement](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoExpressEngine#enable-color-enhancement) 接口，开启低照度增强和色彩增强，对采集画面进行调整，以满足业务需要。

    相关 API 请参考 [setLowlightEnhancement](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoExpressEngine#set-lowlight-enhancement), [enableColorEnhancement](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoExpressEngine#enable-color-enhancement)

8. 支持 H.265 自动兼容策略

    注意：如需使用该功能，请联系 ZEGO 技术支持。

    房间内有用户不支持 H.265 格式时，支持推流端回退到 H.264 格式重新推流。

**改进优化**

1. 优化媒体推流器的回调通知逻辑

    优化媒体推流器的回调通知逻辑，增加对“不支持的音频采样率”（例如，不支持 24K 的采样率）的错误回调，帮助开发者快速定位问题。

    相关 API 请参考 [onMediaDataPublisherFileClose](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoMediaDataPublisherEventHandler#on-media-data-publisher-file-close)

2. 优化色彩增强算法

    优化色彩增强算法，在画面色彩饱和度较高的场景下，相较之前的版本表现更佳。

**问题修复**

1. 修复长时间使用 SDK 未反初始化，导致接口调用耗时异常的问题

2. 修复 Windows 摄像头使用 MJPEG 格式采集时，偶现失败的问题

3. 修复硬编、硬解时兼容异常，偶现崩溃的问题

4. 修复已知的兼容异常、及空指针的问题



---

## 3.12.4 版本 <a id="3.12.4"></a>

**发布日期： 2024-01-16**


**问题修复**

1. 修复切换网络时，如果网络异常，极低概率下会出现 UI 卡顿的问题



---

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

    相关 API 请参考 [getRoomStreamList](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoExpressEngine#get-room-stream-list)

3. 支持对转推到 CDN 的音视频流补静音帧

    注意：如需使用该功能，请联系 ZEGO 技术支持。

    支持对转推到 CDN 的音视频流补静音帧，可以用于避免因时间戳不同步、造成的卡顿或音画不同步等问题发生。

4. 媒体播放器支持获取文件的实时帧率

    支持获取当前播放的媒体文件的帧率统计信息，可以用于数据展示、异常监控等。

    相关 API 请参考 [getPlaybackStatistics](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoMediaPlayer#get-playback-statistics)

5. 媒体播放器支持在本地缓存网络资源

    支持在本地缓存网络资源，如果需要播放同一个网络资源时，将优先使用缓存数据，提升用户体验。

    相关 API 请参考 [enableLocalCache](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoMediaPlayer#enable-local-cache), [onMediaPlayerLocalCache](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoMediaPlayerEventHandler#on-media-player-local-cache)

**问题修复**

1. 修复系统休眠时，SDK 收不到网络状态变化通知，导致网络类型判断不准确的问题



---

## 3.11.0 版本 <a id="3.11.0"></a>

**发布日期： 2023-11-29**


**新增功能**

1. 支持云端高清低码能力

    注意：如需使用该功能，请联系 ZEGO 商务人员。

    通过在云端转码服务中应用领先的编解码算法、以及其他视频前处理能力，持续优化视频播放的清晰度与流畅度，显著提升画质。该功能适用于以下场景：

    - 观看量较大的秀场直播等场景。在保证视频流畅性和高质量的同时，节约带宽成本；同等主观画质下，能够降低 30% 左右的码率。

    - 视频内容更复杂、色彩和纹理细节更丰富的弹幕游戏直播、体育直播等场景。同等拉流码率条件下，实现更高清的观看体验。

    相关 API 请参考 [ZegoMixerOutputVideoConfig > enableLowBitrateHD](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~struct~ZegoMixerOutputVideoConfig#enable-low-bitrate-hd)

2. 推流视频支持色彩增强

    针对各种摄像头等设备采集到的画面色彩偏灰、或饱和度偏低的情况，支持在保护人体肤色的同时，增强画面色彩，使其更加鲜艳明亮，更符合人眼真实的视觉感受，详情请参考 [推流视频增强](https://doc-zh.zego.im/article/18882)。

    相关 API 请参考 [enableColorEnhancement](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoExpressEngine#enable-color-enhancement)

3. 所有网络请求支持 IPv6 协议

4. 房间实时消息支持发送透传消息

    支持向指定的客户端或客户服务器发送房间实时消息；消息类型分为 “普通消息”、“有序消息”，其中后者保证严格按照顺序接收消息。该功能适用于主播需要管理房间内的麦位等场景中，例如：

    - 通过主播客户端，向需要闭麦的用户发送消息，接到消息的客户端进行闭麦。

    - 主播希望将某用户踢出房间时，通过主播客户端，向对方的客户服务器发送消息、并踢出该用户。

    相关 API 请参考 [sendTransparentMessage](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoExpressEngine#send-transparent-message)

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

    相关 API 请参考 [ZegoAutoMixerTask > minPlayStreamBufferLength](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~struct~ZegoAutoMixerTask#min-play-stream-buffer-length)

7. 混流支持输入直播协议流

    新增支持将直播流作为输入流，进行混流处理；直播输入流的 URL 支持 RTMP 和 HTTP-FLV 两种协议。该功能适用于将主播连麦的RTC 画面流与云端体育直播流、游戏直播画面流等进行混合，实现游戏或体育直播解说的场景中。

8. 混流支持自定义音频偏移值

    在使用自定义音视频采集功能、且对应的采集源音频延迟不一致的情况下，可以在混流时自定义音频偏移值，从而实现混流输出后的音视频对齐，保证观众端的体验。

    相关 API 请参考 [ZegoMixerInput > advancedConfig](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~struct~ZegoMixerInput#advanced-config)

9. 媒体播放器支持回调视频分辨率改变事件

    媒体播放器支持在检测到视频分辨率发生变化时，抛出相关回调通知开发者。该功能适用于推流画面的分辨率存在多次变更，需要调整推流端编码分辨率、拉流端渲染视图大小进行匹配的场景中。

    相关 API 请参考 [onMediaPlayerVideoSizeChanged](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoMediaPlayerEventHandler#on-media-player-video-size-changed)

10. 音效播放器支持分别设置推流音量、本地播放音量

    音效播放器支持分别设置推流音量、本地播放音量，保证本端和远端的音量大小都处于合适的区间。

    相关 API 请参考 [ZegoAudioEffectPlayer > setPublishVolume](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoAudioEffectPlayer#set-publish-volume), [ZegoAudioEffectPlayer > setPlayVolume](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoAudioEffectPlayer#set-play-volume), [ZegoAudioEffectPlayer > setPublishVolumeAll](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoAudioEffectPlayer#set-publish-volume-all), [ZegoAudioEffectPlayer > setPlayVolumeAll](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoAudioEffectPlayer#set-play-volume-all)

**改进优化**

1. 优化服务端混流及单流转码能力

    优化服务端混流及单流转码能力，提高编码效率，同等码率下提升 5% 以上的主客观画质。

2. 优化 AEC（回声消除）算法，实现更好的 AEC 效果

3. 优化网络连接策略，提升音视频通话体验

4. 优化多端登录逻辑

    用户在 A 设备上登录成功后，A 设备断网；然后使用同一 userID 在 B 设备上登录成功。此时如果 A 设备网络恢复，重连会失败，并抛出 1002086 错误码，提示该 userID 已在其他设备登录。

**问题修复**

1. 修复某些情况下 N 卡硬解退出时产生崩溃的问题

2. 修复摄像头异常时的重启策略问题



---


## 3.10.1 版本 <a id="3.10.1"></a>

**发布日期： 2023-11-09**


**问题修复**

1. 修复开启低照度增强后出现黑屏的问题



---

## 3.10.0 版本 <a id="3.10.0"></a>

**发布日期： 2023-10-13**


**新增功能**

1. 新增实时 AI 变声功能

    注意：

1. “AI 变声”功能为付费功能，如需申请体验或咨询正式收费标准，请联系 ZEGO 商务人员。

2. 当前官网 SDK 不包含此功能，如有需要，请联系 ZEGO 技术支持特殊编包。

    新增 AI 变声功能，实时通话中的“柯南变声领结”，完美重现目标角色的音色与韵律，同时保留用户的语速、情感、语调，随心所欲切换音色，超低延迟让用户畅享社交语聊、直播、游戏语音等场景，详情请参考 [AI 变声](https://doc-zh.zego.im/article/18442)。

    相关 API 请参考 [createAIVoiceChanger](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoExpressEngine#create-ai-voice-changer), [destroyAIVoiceChanger](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoExpressEngine#destroy-ai-voice-changer)

2. 主体分割的虚拟背景支持使用视频素材

    注意：

1. 当前官网 SDK 不包含此功能，如有需要，请联系 ZEGO 技术支持特殊编包。

2. 虚拟背景的视频填充方式为居中及等比例缩放，视频过大时，超出部分会被裁减。

    使用主体分割功能时，虚拟背景支持使用视频素材，视频素材的最终帧率会与编码帧率保持一致，且循环播放。视频素材的限制说明，请参考 [主体分割](https://doc-zh.zego.im/article/16527)。

    相关 API 请参考 [enableVideoObjectSegmentation](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoExpressEngine#enable-video-object-segmentation)

3. 媒体播放器支持伴奏音质增强

    媒体播放器支持伴奏音质增强，提升伴奏的音质以及现场的氛围感，适用于语聊房、K 歌等场景中。

    相关 API 请参考 [enableLiveAudioEffect](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoMediaPlayer#enable-live-audio-effect)

4. 支持获取并上传音频的 Dump 文件

    注意：由于音频 Dump 文件属于用户的隐私敏感数据，因此开发者实现该能力时，请务必认真阅读 [《即构隐私政策》](https://www.zego.im/privacy) 中关于 “使用音频 Dump 功能” 的内容。此外，在收集音频 Dump 文件时，请在获得用户授权同意时，同步注明 Express SDK 收集目的。

    支持将处理前后的音频数据保存下来并上传，用于定位音频相关问题、提高问题排查效率、缩短接入时间，详情请参考 [如何获取、上传音频的 Dump 文件？](https://doc-zh.zego.im/faq/How_to_get_audio_dump_upload)

    相关 API 请参考 [startDumpData](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoExpressEngine#start-dump-data), [stopDumpData](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoExpressEngine#stop-dump-data), [uploadDumpdata](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoExpressEngine#upload-dump-data), [removeDumpData](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoExpressEngine#remove-dump-data), [onRequestDumpData](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoEventHandler#on-request-dump-data), [onStartDumpData](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoEventHandler#on-start-dump-data), [onStopDumpData](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoEventHandler#on-stop-dump-data), [onUploadDumpData](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoEventHandler#on-upload-dump-data)

5. 自定义视频采集支持透明通道传输

    支持提取、编码和传输开发者自定义采集的 RGBA 通道中的 Alpha 通道数据，从而在拉流端渲染出透明背景的主体，实现更加沉浸、真实的视频场景。

    相关 API 请参考 [enableAlphaChannelVideoEncoder](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoExpressEngine#enable-alpha-channel-video-encoder)

**改进优化**

1. 优化低照度增强功能，自动模式下更加平滑

    在低照度增强的自动模式下，亮度的动态调整将更加流畅平滑，提升用户视觉体验。

    相关 API 请参考 [setLowlightEnhancement](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoExpressEngine#set-lowlight-enhancement)

2. 优化网络测速的期望推、拉流码率上限

    优化网络测速的期望推、拉流码率上限，提升至 15M。开发者可以在推拉流前，检查音视频质量与当前网络的匹配程度，以保证通话质量稳定。

    相关 API 请参考 [startNetworkSpeedTest](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoExpressEngine#start-network-speed-test)

3. 优化拉流时，接收远端用户音视频数据的 [muteAll] 接口逻辑

    注意：新增接口 [muteAllPlayAudioStreams](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoExpressEngine#mute-all-play-audio-streams)、[muteAllPlayVideoStreams](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoExpressEngine#mute-all-play-video-streams) 与旧接口 [muteAllPlayStreamAudio](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoExpressEngine#mute-all-play-stream-audio)、[muteAllPlayStreamVideo](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoExpressEngine#mute-all-play-stream-video) 之间不能混用。

    新增接口 [muteAllPlayAudioStreams](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoExpressEngine#mute-all-play-audio-streams)、[muteAllPlayVideoStreams](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoExpressEngine#mute-all-play-video-streams) 接口，用于在拉流时接收所有远端用户的音视频数据；同时支持通过 [mutePlayStreamAudio](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoExpressEngine#mute-play-stream-audio)、[mutePlayStreamVideo](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoExpressEngine#mute-play-stream-video) 接口，单独控制指定的流的接收状态。

    旧接口 [muteAllPlayStreamAudio](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoExpressEngine#mute-all-play-stream-audio)、[muteAllPlayStreamVideo](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoExpressEngine#mute-all-play-stream-video) 调用后，无法单独控制指定流的接收状态。

    相关 API 请参考 [muteAllPlayAudioStreams](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoExpressEngine#mute-all-play-audio-streams), [muteAllPlayVideoStreams](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoExpressEngine#mute-all-play-video-streams), [mutePlayStreamAudio](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoExpressEngine#mute-play-stream-audio), [mutePlayStreamVideo](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoExpressEngine#mute-play-stream-video)

4. 媒体播放器支持仅播放视频或音频，不额外消耗解码性能

    注意：播放过程中，如果修改了媒体流类型，会在下一次播放时生效。

    使用媒体播放器播放音视频文件时，支持通过 [setPlayMediaStreamType](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoMediaPlayer#set-play-media-stream-type) 接口，设置为“仅播放音频” 或“仅播放视频”，不消耗音视频解码性能。

    相关 API 请参考 [setPlayMediaStreamType](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoMediaPlayer#set-play-media-stream-type)

**问题修复**

1. 修复拉流时，偶现无声音的问题

2. 修复多房间断网的异常情况下，多次调用 [logoutRoom]、[loginRoom] 接口，导致后续登录房间失败的问题

3. 修复房间重连失败的情况下，可能出现频繁重试的问题


---

## 3.9.0 版本 <a id="3.9.0"></a>

**发布日期： 2023-09-08**

**新增功能**

1. 屏幕采集支持系统 WGC 采集

    注意：该功能需要 Windows 10.18362 或以上版本。

    多源采集模块在进行屏幕采集时，支持系统 WGC（Windows Graphics Capture）采集，且默认使用该模式，采集效率更高。

2. 屏幕采集支持设置推流区域

    多源采集模块在进行屏幕采集时，支持用户设置独立的预览和推流区域。

    相关 API 请参考 [updatePublishRegion](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoScreenCaptureSource#update-publish-region)

3. 新增附带时间戳的 SEI 回调

    相关 API 请参考 [onPlayerRecvMediaSideInfo](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoEventHandler#on-player-recv-media-side-info)

4. 单流转码功能支持 RTC 拉流

    注意：

1. 如需使用该功能，请联系 ZEGO 技术支持。

2. 转码会造成额外的延迟，不建议您在使用 RTC 拉流的麦上场景中使用该功能。

    RTC 拉流时，支持通过预设的转码模板触发单流转码任务，输出不同分辨率的转码流，详情请参考 [单流转码](https://doc-zh.zego.im/article/17457)。

    该功能可用于直播等场景中，观众可以基于网络质量、终端设备等，选择不同分辨率的流进行观看，确保播放的流畅性。

    相关 API 请参考 [ZegoPlayerConfig > codecTemplateID](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~struct~ZegoPlayerConfig#codec-template-id)

5. 支持抛出 [setDummyCaptureImagePath] 异常回调

    相关 API 请参考 [onPublisherDummyCaptureImagePathError](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoEventHandler#on-publisher-dummy-capture-image-path-error)

6. 直推 CDN 支持在推流过程中更新 CDN 地址

    相关 API 请参考 [enablePublishDirectToCdn](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoExpressEngine#enable-publish-direct-to-cdn)

7. 支持均衡型 AI 降噪模式

    注意：当前官网 SDK 不包含此功能，如有需要，请联系 ZEGO 技术支持特殊编包。

    支持均衡型 AI 降噪模式，与原有模式相比，在相同的人声保真效果前提下，噪音抑制效果明显提升，可以达到干净无噪音或不扰人的程度；但性能消耗稍微增加。适用于街道、马路、市场等较为嘈杂（信噪比低）的户外环境中，详情请参考 [场景化 AI 降噪](https://doc-zh.zego.im/article/14530)。

    相关 API 请参考 [ZegoANSMode > ZegoANSModeAIBalanced](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~enum~ZegoANSMode#zego-ans-mode-ai-balanced)

**改进优化**

1. 优化 [setLogConfig] 接口

    扩大 [setLogConfig](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~ZegoExpressSDK#set-log-config) 接口的生命周期为 App 生命周期，且优先级高于 [setEngineConfig](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~ZegoExpressSDK#set-engine-config) 接口中的配置。

    相关 API 请参考 [setLogConfig](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~ZegoExpressSDK#set-log-config), [setEngineConfig](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~ZegoExpressSDK#set-engine-config)

2. 优化 App 休眠时的重试规则

    优化 App 休眠时的重试规则，登录房间和推拉流过程中，“App 休眠时间”也计入“最大允许重试时间”。

**问题修复**

1. 修复音频外部采集模块切换音源时，会导致无声的问题

2. 修复通过 [setPublishWatermark](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoExpressEngine#set-publish-watermark) 设置水印路径超过最大长度时，没有抛出错误信息的问题

3. 修复发送流新增时，极小概率出现失败的问题

4. 修复音效播放器偶现崩溃的问题

5. 修复调用 [sendAudioSideInfo](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoExpressEngine#send-audio-side-info) 接口发送音频次要消息，接收端 10s 左右才能收到消息的问题

6. 修复网宿 CDN 在直推情况下，停推 TCP 断连耗时固定为 500 ms 的问题



---

## 3.8.1 版本 <a id="3.8.1"></a>

**发布日期： 2023-08-16**


**问题修复**

1. 修复使用 Token 鉴权时，在 [createEngine] 之后、[destroyEngine] 之前变更了 userID，可能导致推拉流失败的问题



---

## 3.8.0 版本 <a id="3.8.0"></a>

**发布日期： 2023-08-09**


**新增功能**

1. 新增支持“智能云代理”模式

    注意：如需使用该功能，请联系 ZEGO 技术支持。

    开发者设置“智能云代理”模式后，在 RTC 或 L3 拉流时，会优先使用直连网络模式进行尝试。如果直连网络不可用、且当前是蜂窝网络，则继续留在直连模式重试；如果直连网络不可用、且当前是非蜂窝网络，则切到云代理模式，详情请参考 [云代理](https://doc-zh.zego.im/article/18106)。

2. 支持抛出编码和硬件解码的低帧率告警

    注意：如需使用该功能，请联系 ZEGO 技术支持。

    新增支持抛出编码和硬件解码的低帧率告警回调，在 1v1 聊天、直播等场景中，开发者可基于该回调，实现调整推流分辨率、触发转码等操作。

    相关 API 请参考 [onPlayerLowFpsWarning](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoEventHandler#on-player-low-fps-warning), [onPublisherLowFpsWarning](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoEventHandler#on-publisher-low-fps-warning)

3. 新增同步抛出视频网络首帧的回调

    新增从非 UI 线程抛出视频网络首帧的回调 [onPlayerSyncRecvVideoFirstFrame](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoEventHandler#on-player-sync-recv-video-first-frame)，该回调不受 UI 卡顿的影响，能够更准确的统计视频首帧数据。

    相关 API 请参考 [onPlayerSyncRecvVideoFirstFrame](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoEventHandler#on-player-sync-recv-video-first-frame)

4. 媒体播放器支持设置网络资源的 Http Headers

    媒体播放器支持设置网络资源的 Http Headers，开发者可基于该配置，自定义限定网络资源的访问方式，加强资源的安全防护。

    相关 API 请参考 [setHttpHeader](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoMediaPlayer#set-http-header)

5. Windows 支持指定显卡硬编，支持硬编硬解的纹理输入输出

    Windows 支持指定显卡硬编，支持硬编硬解的纹理输入输出，提升了 Windows 平台硬件编解码的效率，端到端时延降低了 15 ms ~ 100 ms（具体优化效果与使用的显卡相关），该功能可用于远程控制等低延迟场景中。

**改进优化**

1. 优化低照度增强算法的噪点表现

2. 优化媒体播放器加载资源的 URL 长度，最大支持 2048 字节

3. 优化媒体播放器 SEI 信息与相应帧数据的回调同步，保证 SEI 和画面的一致性

**废弃删除**

1. 修改了媒体推流器 IZegoMediaDataPublisher 类的 setMediaDataPublisherEventHandler 接口名称

    在 3.8.0 版本，对媒体推流器 [IZegoMediaDataPublisher] 类的一个 API 接口命名进行变更：将原来的成员函数 [setMediaDataPublisherEventHandler] 更名为 [setEventHandler]，接口名称修改后可能存在兼容性问题，详情请参考 [3.8.0 及以上版本升级指南](https://doc-zh.zego.im/article/18101)。


**问题修复**

1. 修复推流时出现水印崩溃的问题


---

## 3.7.0 版本 <a id="3.7.0"></a>

**发布日期： 2023-07-13**


**新增功能**

1. 开启视频大小流编码后，除大流的视频参数外，新增支持设置小流的视频参数

    注意：

1. 使用此功能前，需要先调用 [setVideoConfig](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoExpressEngine#set-video-config) 接口，指定视频编码格式 codecID 为 “ZegoVideoCodecIDH264DualStream（大小流编码）”。

2. 设置大流、小流的分辨率的 “比例” 需要保持一致，否则调用接口会出错。

    在指定编码格式为 “大小流编码” 的情况下，支持分别设置大流和小流的分辨率、帧率和码率，详情请参考 [视频大小流和分层编码](https://doc-zh.zego.im/article/17957)。

    相关 API 请参考 [ZegoExpressEngine > setVideoConfig](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoExpressEngine#set-video-config), [setPublishDualStreamConfig](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoExpressEngine#set-publish-dual-stream-config)

2. 万人范围音视频、游戏语音支持配置 3D 音效距离的衰减范围

    在万人范围音视频、游戏语音场景中，支持设置 3D 音效距离的衰减范围区间 [min, max]。距离小于 min 时，音量不会随着距离的增加而衰减；距离大于 max 时，将无法听到对方的声音。

    相关 API 请参考 [setReceiveRange](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoRangeSceneStream#set-receive-range), [setAudioReceiveRange](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoRangeAudio#set-audio-receive-range)

3. 新增屏幕采集区域发生变化时的回调通知

    新增屏幕采集区域发生变化时的回调通知 [onRectChanged](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoScreenCaptureSourceEventHandler#on-rect-changed)。在开始屏幕采集后，当采集区域发生变化时，SDK 会通过此回调通知开发者，开发者通过监听此回调，可以修改预览画面大小等配置。

    相关 API 请参考 [onRectChanged](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoScreenCaptureSourceEventHandler#on-rect-changed)

4. 新增错误码提示

    新增语音检测（1018xxxxx）、万人范围音视频（1019xxxxx）、屏幕采集（1020xxxxx）三个模块的错误码，详情请参考 [常见错误码](https://doc-zh.zego.im/article/13787)。

**改进优化**

1. 优化 SDK 内部逻辑，减少 400KB ~ 600KB 的内存占用

2. 优化 SDK 视频采集策略，提升画质

3. 在断网导致的推拉流重试状态中，支持回调本地网络质量

    相关 API 请参考 [onNetworkQuality](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoEventHandler#on-network-quality)

4. 支持在调用 [destroyEngine] 接口后，生成日志上传任务

    相关 API 请参考 [submitLog](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~ZegoExpressSDK#submit-log)

5. 优化 SDK 的内部逻辑，提升弱网环境下的通话体验

**问题修复**

1. 修复 MediaRecorder、AudioObserver 停止推流后，未恢复本地推流，继续采集的问题

2. 修复 NetMonitor 模块多线程死锁的问题



---


## 3.6.0 版本 <a id="3.6.0"></a>

**发布日期： 2023-06-09**


**新增功能**

1. 新增支持背景虚化、虚拟背景功能

    在实景或绿幕场景中，开发者可以通过该功能对用户的背景进行虚化模糊处理，或替换为自定义图片背景，详情请参考 [主体分割](https://doc-zh.zego.im/article/16527)。

    该功能可用于视频会议、1v1 音视频通话等场景中，帮助用户更好的保护个人隐私，以及提升通话的趣味性。

    相关 API 请参考 [enableVideoObjectSegmentation](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoExpressEngine#enable-video-object-segmentation)

2. 新增 Enhanced KTV 混响效果

    新增增强型 KTV 混响效果，实现更集中、亮度更好的 KTV 人声效果。与之前的 KTV 混响音效相比，Enhanced KTV 混响效果缩短了混响时长，提高了干湿比。

    原有的 KTV 混响音效仅适用于人声瑕疵较为明显的用户，增强型 KTV 混响效果适用于大多数专业用户和普通用户。

    相关 API 请参考 [setReverbPreset](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoExpressEngine#set-reverb-preset)

3. 游戏语音功能支持媒体播放器&音效播放器使用 3D 音效

    开发者可以通过设置媒体播放器、音效播放器的位置和朝向，实现本地音频、在线音频资源的 3D 音效。该功能可用于在虚拟场景中设置物品的音效、以及指定位置的背景音乐等。

    相关 API 请参考 [ZegoMediaPlayer > updatePosition](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoMediaPlayer#update-position), [ZegoAudioEffectPlayer > updatePosition](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoAudioEffectPlayer#update-position)

4. 媒体播放器支持获取媒体流视频信息

    针对媒体播放器正在播放的视频文件，开发者可以主动获取视频的分辨率、帧率等信息。

    相关 API 请参考 [getMediaInfo](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoMediaPlayer#get-media-info)

5. 媒体播放器倍速功能最大支持 4 倍速

    媒体播放器倍速的上限提升到 4 倍速。例如，用户在播放音视频文件时，如果已设置为 2 倍速播放，长按屏幕时可以加速至 4 倍速。

    相关 API 请参考 [ZegoMediaPlayer > setPlaySpeed](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoMediaPlayer#set-play-speed)

**改进优化**

1. 优化主体分割功能在麦克风与人体重叠时的表现

    注意： 当前官网 SDK 不包含此功能，如有需要，请联系 ZEGO 技术支持特殊编包。

    当麦克风与人体区域存在部分重叠时，可以保留重叠区域的麦克风形状，以维持完整的人体区域形状。

    相关 API 请参考 [enableVideoObjectSegmentation](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoExpressEngine#enable-video-object-segmentation)

**问题修复**

1. 修复使用媒体播放器时可能会导致内存泄露的问题

2. 修复使用 Windows SDK 预览或拉流时，画面渲染可能偶现绿屏的问题



---

## 3.5.0 版本 <a id="3.5.0"></a>

**发布日期： 2023-05-11**


**新增功能**

1. 新增音视频推流的首帧回调

    在进行音视频推流时，通过 [onPublisherSendAudioFirstFrame](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoEventHandler#on-publisher-send-audio-first-frame)、[onPublisherSendVideoFirstFrame](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoEventHandler#on-publisher-send-video-first-frame) 回调，监听“首帧音频”或“首帧视频”的发布时机。该功能可用于统计音视频推流的耗时、或更新 UI 表现等。

    相关 API 请参考 [onPublisherSendAudioFirstFrame](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoEventHandler#on-publisher-send-audio-first-frame), [onPublisherSendVideoFirstFrame](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoEventHandler#on-publisher-send-video-first-frame)

2. 媒体播放器支持音视频渲染完成后的首帧回调

    在通过媒体播放器进行音视频渲染时，通过 [onMediaPlayerFirstFrameEvent](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoMediaPlayerEventHandler#on-media-player-first-frame-event) 回调，监听渲染完成后的“首帧音频”或“首帧视频”的发布时机。该功能可用于音视频渲染的耗时、或更新 UI 表现等。

    相关 API 请参考 [onMediaPlayerFirstFrameEvent](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoMediaPlayerEventHandler#on-media-player-first-frame-event)

3. 外部采集支持主动偏移 NTP 时间戳

    注意：如需使用该功能，请联系 ZEGO 技术支持。

    使用外部采集功能时，支持通过实验性 API 接口主动偏移 NTP 时间戳。该功能可用于 KTV 的合唱、伴奏、歌词对齐等场景。

4. 媒体推流器新增支持推流配置

    注意：该接口需要在 [createEngine](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~ZegoExpressSDK#create-engine) 之后调用，重复调用该接口会返回之前已创建的实例。

    支持通过 [createMediaDataPublisher](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoExpressEngine#create-media-data-publisher) 接口，分别配置媒体推流器的推流通道、媒体内容等信息。

    相关 API 请参考 [createMediaDataPublisher](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoExpressEngine#create-media-data-publisher)

5. 多房间模式下支持快速切换房间

    多房间模式下，支持通过 [switchRoom](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoExpressEngine#switch-room) 接口，快速便捷地实现切换房间的功能。

    相关 API 请参考 [switchRoom](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoExpressEngine#switch-room)

6. 支持自主维护 AEC（回声消除）的参考信号

    注意：

1. 如需使用该功能，请联系 ZEGO 技术支持。

2. 启动拉流以后，调用该接口才会生效。

    支持开发者通过 [sendReferenceAudioPCMData](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoExpressEngine#send-reference-audio-pcm-data) 接口，输入需要消除的声音（即参考信号），直接消除。

    该功能可用于自定义采集渲染场景中。例如：用户外放背景音乐，同时上麦进行发言，其中背景音乐不是使用自定义渲染或外部渲染的声音，可通过该功能消除推流中包含的背景音乐回声。

    相关 API 请参考 [sendReferenceAudioPCMData](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoExpressEngine#send-reference-audio-pcm-data)

**问题修复**

1. 修复媒体播放器在部分 m3u8 文件格式中，不能通过 seekTo 接口使播放进度跳转到 0 的问题

2. 修复重新推流后，拉流端视频卡顿的偶现问题



---


## 3.4.0 版本 <a id="3.4.0"></a>

**发布日期： 2023-04-14**


**新增功能**

1. 新增 [setSpeakerSimpleMute] 和 [getSpeakerSimpleMute] 接口，用于设置扬声器静音及获取扬声器是否静音

    注意：如需使用该功能，请联系 ZEGO 技术支持。


2. 媒体播放器支持播放透明特效

    媒体播放器支持通过渲染 Alpha 通道，实现播放透明特效文件功能，详情请参考 [播放透明礼物特效](https://doc-zh.zego.im/article/17583)。

    相关 API 请参考 [loadResourceWithConfig](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoMediaPlayer#load-resource-with-config)


3. 媒体播放器支持边下载、边回调数据解密、边播放的功能

    针对在线播放器的版权音乐保护，媒体播放器支持边下载边回调未解密的二进制数据，由开发者解密后再传回媒体播放器播放，过程中不会产生文件或缓存文件。

    相关 API 请参考 [setBlockDataHandler](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoMediaPlayer#set-block-data-handler)

4. 支持按平台开关主体分割功能

    注意：
    - 如需使用该功能，请联系 ZEGO 技术支持。
    - 通过实验性 API 形式接入的开发者，需要迁移为通过正式 API 接口接入主体分割功能。

    相关 API 请参考 [enableVideoObjectSegmentation](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoExpressEngine#enable-video-object-segmentation)

5. 支持动态切换流控策略

    支持动态开关流量控制功能，同时支持设置流量控制属性等。

    相关 API 请参考 [enableTrafficControl](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoExpressEngine#enable-traffic-control), [setMinVideoBitrateForTrafficControl](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoExpressEngine#set-min-video-bitrate-for-traffic-control), [setMinVideoFpsForTrafficControl](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoExpressEngine#set-min-video-fps-for-traffic-control), [setMinVideoResolutionForTrafficControl](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoExpressEngine#set-min-video-resolution-for-traffic-control)

**改进优化**

1. 优化 Electron 端外接摄像头分辨率及帧率的适配功能

2. 优化 SDK 内存占用

    删除 SDK 内部一些没必要的内存申请，优化 SDK 内存使用率，相比上个版本，内存使用率减少了 10% 左右。


**废弃删除**

1. 废弃 [onPlayerRecvSEI] 接口

    为规避数据同步异常的情况，将在 3.4.0 及以上版本，废弃 [onPlayerRecvSEI] 接口，若需收取远端流的 SEI 内容，请使用 [onPlayerSyncRecvSEI] 接口替代。

    相关 API 请参考 [onPlayerSyncRecvSEI](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoEventHandler#on-player-sync-recv-sei)



---


## 3.3.0 版本 <a id="3.3.0"></a>

**发布日期： 2023-03-10**


**新增功能**

1. 支持外放场景下的人声增强效果

    在外放场景中，设备的麦克风与扬声器过近，容易导致人声模糊或沉闷。在该场景下，人声增强可以有效提升人声清晰度并改善沉闷感，因此在外放场景下，建议开启该功能。

    为实现外放场景下的人声增强效果，可开启人声增强音效并设置增强等级，增强等级推荐配置为 4，可用于 KTV 外放场景下，精细控制人声效果。

    相关 API 请参考 [enableSpeechEnhance](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoExpressEngine#enable-speech-enhance)


2. 单流转码功能支持 L3 或 CDN 拉流

    注意：通过 CDN 拉取转码流时，必须使用转推 CDN。如需使用该功能，请联系 ZEGO 技术支持。

    单流转码，指在云端把每条原始流转换为不同编码格式、不同分辨率的转码流。拉流时需传入转码模板 ID 拉取转码流。在直播等场景中，观众可以基于接入网络质量、终端设备等，自行选择不同分辨率的流进行观看，以保证播放的流畅性。

3. 同一个混流任务支持输出多个分辨率的视频流

    注意：
    - 目前 1 个混流任务最多支持输出 4 路不同分辨率的视频流，且目前仅支持服务端混流。
    - 如需使用该功能，请联系 ZEGO 技术支持。

    同一个混流任务支持输出多个分辨率的视频流，可用于实现混流场景下的转码需求。

4. 混流任务支持输入超级白板信息

    在混流功能支持将白板中的操作内容转成实时视频，且支持设置白板配置信息，例如，设置白板 ID、白板宽高比、是否支持加载动态 PPT 等。

5. 场景化音视频配置新增 [StandardVoiceCall] 标准语音通话场景

    场景化音视频配置新增 [StandardVoiceCall] 标准语音通话场景，适用于 1v1 纯语音通话场景，详情请参考 [场景化音视频配置](https://doc-zh.zego.im/article/16546)。

    相关 API 请参考 [setRoomScenario](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoExpressEngine#set-room-scenario)

**改进优化**

1. 优化 KTV 场景的回声消除（AEC）效果

    针对 KTV 场景的 AEC 优化，实现了：

    - 大幅度提高外放场景下的人声音质，使人声更保真。
    - 消除回声的同时，有效避免偶现的吞字或人声起伏的现象。



---

## 3.2.1 版本 <a id="3.2.1"></a>

**发布日期： 2023-02-23**


**问题修复**

1. 修复某些场景下，重新登录房间后，自定义音频采集及音频采集源需重新设置才能生效的问题



---

## 3.2.0 版本 <a id="3.2.0"></a>

**发布日期： 2023-01-13**


**新增功能**

1. 范围场景支持设置推拉流模式

    范围场景支持设置推拉流模式，推拉流模式包括：是否允许拉取范围内的流、是否允许推流到世界。

    相关 API 请参考 [enablePlayInRange](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~struct~ZegoSceneStreamConfig#enable-play-in-range), [enablePublishToWorld](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~struct~ZegoSceneStreamConfig#enable-publish-to-world)


2. 主体分割支持实景分割与绿幕分割，内部渲染支持 Alpha 通道

    注意：本功能为内测功能，如需接入体验，请联系 ZEGO 商务人员。
    - Android、iOS、Windows、macOS（暂只支持 Apple 芯片）四端支持实景分割与绿幕分割。
    - 内部渲染支持 Alpha 通道，开发者不需要使用自定义渲染，即可实现主体与背景的混合。

**改进优化**

1. 自定义信令配置支持扩展到 4KB

    注意：自定义信令配置默认大小为 1KB，如需扩展到 4KB，请联系 ZEGO 技术支持进行处理。

**问题修复**

1. 修复硬件编码访问空指针崩溃的问题


---

## 3.1.0 版本 <a id="3.1.0"></a>

**发布日期： 2022-12-09**


**新增功能**

1. 支持多源采集能力

    面向在线 KTV、一起看电影、看比赛等、视频会议、在线教育等音视频源丰富多样的互动场景，多源采集提供了灵活易用的音视频采集源与通道管理能力，大量减少开发者的开发及维护成本。

    多源采集能力对屏幕共享、混音等常见能力的实现路径，进行缩短优化及归一化设计，从 3.1.0 版本后，您可以不用再通过自定义采集实现上述复杂的能力，详情请参考  [多源采集文档](https://doc-zh.zego.im/article/16914) 。
    主要能力特性如下：
    - 推流通道支持设置或切换多种音视频源。
    - 支持屏幕共享、混音等常见能力。

2. SDK 支持设置云代理

    注意：如需使用该功能，请联系 ZEGO 技术支持。

    通过设置 SDK 的云代理接口，将 SDK 对应的所有流量通过云端的代理服务器进行中转，实现与 RTC 通信，详情请参考  [云代理文档](https://doc-zh.zego.im/article/18106) 。

    相关 API 请参考 [setCloudProxyConfig](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~ZegoExpressSDK#set-cloud-proxy-config)

**改进优化**

1. 大幅度提升极端弱网地区的音视频连通率，并降低连通耗时

    ZEGO 自研调度系统针对网络质量极差地区进行了深度优化。

**问题修复**

1. 修复发送房间 `Logout` 信令可能失败的问题

2. 修复视频外部采集在内存模式下，偶现的访问野指针崩溃的问题



---

## 3.0.3 版本 <a id="3.0.3"></a>

**发布日期： 2022-11-25**


**问题修复**

1. 修复 iOS、macOS、Windows 平台硬件解码可能会崩溃的问题



---

## 3.0.2 版本 <a id="3.0.2"></a>

**发布日期： 2022-11-14**

**问题修复**

1. 修复多房间模式下，停止推流时，房间内其他人收不到流删除通知的问题


---

## 3.0.0 版本 <a id="3.0.0"></a>

**发布日期：2022.10.28**

**新增功能**

1. 支持分割和传输视频画面中的主体

    注意：如需使用该功能，请联系 ZEGO 技术支持。

    新增主体分割和传输功能。通过 AI 算法，将视频画面中的主体（多数情况下主体是人）从背景中分离出来，返回带透明通道的数据给 SDK 做编码处理。实现只传输视频中的主体而非原始矩形视频的效果。

    当前仅支持通过内部采集的方式使用该能力，详情请参考 [主体分割](https://doc-zh.zego.im/article/16527) 文档。


2. 场景化 AI 降噪新增在音乐场景下降噪的能力

    注意：如需使用该功能，请联系 ZEGO 技术支持。

    场景化 AI 降噪功能，在之前针对所有非人声进行降噪的基础上，新增支持在音乐场景下的降噪能力，通过识别音乐，智能调整降噪效果还原音乐音质。SDK 会实时对麦克风输入内容进行音乐检测，在声卡、弹唱或近场音乐场景下，自动调整降噪等级，保证音乐的高保真音质，详情请参考 [场景化 AI 降噪](https://doc-zh.zego.im/article/14830) 文档。


3. 新增房间维度的场景 Scenario

    为方便开发者快速接入，降低开发者接入门槛，SDK 提供多种预设场景。开发者可根据所需场景，选择对应的房间模式 [ZegoScenario](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~enum~ZegoScenario)，SDK 将自动应用适合该场景的音视频编解码器、音视频参数、流控策略等配置，从而快速实现该场景下的最佳效果。

    当前支持场景包括秀场直播、KTV、标准 1v1 音视频通话、高画质 1v1 音视频通话、标准语聊房、高音质语聊房，详情请参考 [场景化音视频配置](https://doc-zh.zego.im/article/16546) 文档。

    相关 API 请参考 [setRoomScenario](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoExpressEngine#set-room-scenario)


4. 支持获取当前设备指定视频编解码器的编解码能力的支持情况

    SDK 支持获取当前设备指定视频编解码器的编解码模式的支持情况，从而更好的帮助开发者选择使用的编码器及编码模式并获得更好的效果。

    - 通过 [isVideoEncoderSupported](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoExpressEngine#is-video-encoder-supported) 接口，可获取当前编码器的硬件或软件编码支持情况。
    - 通过 [isVideoDecoderSupported](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoExpressEngine#is-video-decoder-supported) 接口，可获取当前解码器的硬件或软件解码支持情况。

    以上两个接口均包含三个枚举值：支持硬件或软件，支持硬件，支持软件。以 Android 端为例，isVideoEncoderSupported(ZegoVideoCodecID.H265, ZegoVideoCodecBackend.HARDWARE)，即表示检查当前设备是否支持 H265 的硬编，若支持，则返回 true。

    相关 API 请参考 [isVideoEncoderSupported](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoExpressEngine#is-video-encoder-supported)、[isVideoDecoderSupported](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoExpressEngine#is-video-decoder-supported)

5. 新增获取 GPS 信息开关接口

    注意：该功能默认开启，如需关闭该功能，请联系 ZEGO 技术支持。

    在 App 有获取地理位置权限的情况下，开发者可以选择是否允许 ZEGO SDK 获取系统缓存的 GPS 信息，默认进行获取。当开发者希望关闭该功能时，需要联系 ZEGO 技术支持进行设置。

6. 新增基于摄像头打开后的视频首帧回调

    支持每次开启远端摄像头后，SDK 拉流并渲染完第一帧远端摄像头视频数据后进行回调，开发者可利用该回调统计首帧耗时，或更新播放流的 UI 组件。

    相关 API 请参考 [onPlayerRenderCameraVideoFirstFrame](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoEventHandler#on-player-render-camera-video-first-frame)


**改进优化**

1. 针对 1v1 纯 RTC 通话场景进行优化

    注意：如需使用该功能，请联系 ZEGO 技术支持。

    针对 1v1 通话场景进行了优化，适用在纯 RTC 场景下使用。


2. 优化空间音频功能

    对空间音频能力进行了优化，用户可以区分前后音源，从而达到更好的沉浸感。


3. 优化极端弱网下的音视频体验

    SDK 优化了内部策略，在音视频的场景下，支持最小下行 50 kbps 拉流不卡顿，保障更好的极端弱网下的体验。


**问题修复**

1. 修复了 Mac M1 芯片电脑在部分系统版本下，Web 端开启硬件编码推流，并采用多 SPS（Sequence Paramater Set，又称序列参数集）、PPS（Picture Paramater Set，又称图像参数集）的输出形式，Native SDK 拉流会出现解码花屏的问题

2. 修复了网络状态从有网络切换到无网络时，当前正在上传的日志有可能出现崩溃的问题

3. 修复了 GetCallbackController 非线程安全问题​

4. 修复了 SDK 在没有 View 的情况下，没有触发 [onPlayerRenderVideoFirstFrame](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoEventHandler#on-player-render-video-first-frame) 的问题


**废弃删除**

1. 废弃了 [ZegoScenario](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~enum~ZegoScenario) 的三种旧版本场景

    废弃 [ZegoScenario](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~enum~ZegoScenario) 场景枚举中的 [General]，[Communication]， [Live] 三种场景，详情请参考 [场景化音视频配置](https://doc-zh.zego.im/article/16546) 文档。

2. 删除了 [setDebugVerbose]、[setPlayStreamVideoLayer]、[enableAudioDataCallback] 等接口，详情请参考  [3.0.0升级指南](https://doc-zh.zego.im/article/16567)。

---
## 2.23.0 版本 <a id="2.23.0"></a>

**发布日期：2022.09.09**


**问题修复**

1. 修复多房间模式下，在网络切换（Wi-Fi 或蜂窝网络）期间调用 loginRoom 可能无回调的问题



---

## 2.22.0 版本 <a id="2.22.0"></a>

**发布日期：2022.08.09**


**新增功能**

1. 支持 socks5 的本地代理

    若在内网或防火墙场景下，您可以通过代理服务器与公网交互，并通过 [setEngineConfig](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~ZegoExpressSDK#set-engine-config) 设置代理服务器地址，保证 ZEGO 音视频云服务正常，目前仅支持  socks5，详情请参考 [本地代理](https://doc-zh.zego.im/)。

    相关 API 请参考 [setEngineConfig](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~ZegoExpressSDK#set-engine-config)


2. SDK 外部采集支持 H.265 码流

    注意：
    - 推荐每 2s 一个 GOP，每个 I 帧必须携带 SPS 和 PPS，且放在最前面。调用 [enableCustomVideoCapture](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoExpressEngine#enable-custom-video-capture) 时，传递的参数类型必须为 ZegoVideoBufferTypeEncodedData。
    - 外部采集不支持输入 B 帧。

    相关 API 请参考 [enableCustomVideoCapture](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoExpressEngine#enable-custom-video-capture)

3. H.264 及 H.265 硬件编解码支持使用 AMD/NVIDIA/Intel 系列显卡

    注意：若要开启该功能，需要联系 ZEGO 技术支持。

    支持 AMD/NVIDIA 独立显卡和 Intel 核芯显卡，您可以通过 [setEngineConfig](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~ZegoExpressSDK#set-engine-config) 修改默认显卡优先级。

    相关 API 请参考 [setEngineConfig](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~ZegoExpressSDK#set-engine-config)，[enableHardwareEncoder](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoExpressEngine#enable-hardware-encoder)，[enableHardwareDecoder](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoExpressEngine#enable-hardware-decoder)

4. CDN PLUS 支持自动容灾
    CDN Plus将 ZEGO 自研高质量 L3 拉流与多个优质第三方 CDN 进行无缝融合，实现直播内容分发，当发生 CDN 质量灾害时，可以通过云端质量结合的方式快速感知，并通过秒级切换 L3 及其他优质 CDN 的方式来保障直播的流畅稳定，从而防止因 CDN 云商故障导致的长时间、大面积的运营事故及造成的业务损失。

**改进优化**

1. 优化网络质量回调，感知远端用户异常状态

    当远端用户异常时，[onNetworkQuality](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoEventHandler#on-network-quality) 每 2s 回调一次质量未知状态（ZegoStreamQualityLevelUnknown 状态），当用户该状态持续 8s 后，则认为远端用户已异常断开，此时回调质量异常状态（ZegoStreamQualityLevelDie 状态）。

    相关 API 请参考 [onNetworkQuality](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoEventHandler#on-network-quality)

2. 优化网络质量回调，网络质量反馈更灵敏

    推拉流质量回调会每隔 3s 回调一次质量最差的结果，当周期内出现严重的抖动或丢包时，能够立刻反馈出流质量差。

    相关 API 请参考 [onPlayerQualityUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoEventHandler#on-player-quality-update)，[onPublisherQualityUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoEventHandler#on-publisher-quality-update)，[onNetworkQuality](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoEventHandler#on-network-quality)

3. 优化日志上报策略

    优化日志上报策略，提高日志上传效率。

4. 优化拉流调度策略

    根据拉流质量动态调整拉流策略，提升整体拉流质量以及观众播放体验。

5. 优化 AGC 的谐波检测算法

    AGC 新改进的谐波检测算法存在崩溃问题，现回退至老版本的谐波检测算法。

**问题修复**

1. 修复网络模块极低概率崩溃的问题



---



## 2.21.1 版本 <a id="2.21.1"></a>

**发布日期：2022.07.14**


**问题修复**

1. 修复纯音频场景发送 SEI 失败的问题



---

## 2.21.0 版本 <a id="2.21.0"></a>

**发布日期：2022.07.08**

**新增功能**

1. 支持设置低照度增强

    注意：应在调用 [createEngine](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~ZegoExpressSDK#create-engine) 接口创建引擎后，再调用 [setLowlightEnhancement](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoExpressEngine#set-lowlight-enhancement) 接口。

    当推流端用户周围环境较暗、或摄像头设置的帧率较高，导致直播画面比较暗，无法正常显示或识别主体的情况下，可调用 [setLowlightEnhancement](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoExpressEngine#set-lowlight-enhancement) 接口，设置低照度增强，提升视频画面亮度。低照度增强功能包含三种模式：1：不开启低照度增强（默认）、2：开启低照度增强 、3：自动开关低照度增强。

    开发者可以根据业务场景选择不同的低照度增强模式：当希望自行判断是否需要进行低照度增强时，可以通过切模式 1 和 2 来控制；当希望 SDK 自动增强时，可以使用模式 3 ，SDK 将自动判断用户所处的光照环境，开启或关闭低照度增强。

    相关 API 请参考 [setLowlightEnhancement](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoExpressEngine#set-lowlight-enhancement)

2. 混流支持设置视频边框为圆角

    在调用 [startMixerTask](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoExpressEngine#start-mixer-task) 接口混流时，开发者可以通过 “ZegoMixerInput” 类型参数，设置 “cornerRadius”（视频画面圆角半径），将视频边框设置为圆角。“cornerRadius” 的单位为 px，取值不得超过视频画面宽高中较短者的一半。

    相关 API 请参考 [startMixerTask](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoExpressEngine#start-mixer-task)

3. 拉流接口增加 CDN Plus 拉流配置项

    注意：若希望通过地区、用户等更多维度，从云端控制拉流方式，请联系 ZEGO 技术支持进行相关配置。

    拉流接口新增 CDN_PLUS 的拉流资源模式（ZegoResourceType），开发者可按流维度自行开启使用CDN_PLUS 拉流。CDN Plus 拉流是比 CDN 拉流直播质量更高，但是价格接近 CDN 的一种性价比高的拉流方式，详情请参考 [CDN Plus 拉流](https://doc-zh.zego.im/)。

    相关 API 请参考 [startPlayingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoExpressEngine#start-playing-stream-1)

**改进优化**

1. 优化开启强制登录鉴权时，Token 异常的相关错误码

    新增 1002074、1002075、1002076、1002077、1002078、1002079、1002080 等错误码。开启强制登录鉴权后，如果 Token 错误时，会返回这些错误码，详情请参考 <a href="/real-time-video-ios-oc/client-sdk/error-code#1002xxx-房间相关的错误码" target="_blank" rel="noopener noreferrer">常见错误码</a> 中的详细解释和处理建议。

2. Windows 支持 N 卡的 H.265 硬件编解码

    注意：若要开启该功能，需要联系 ZEGO 技术支持。

**问题修复**

1. 修复在使用 CDN Plus 连通性探测时，累计失败 5 次后，继续探测一定会失败的问题

2. 修复关闭外部滤镜时，会触发多次 [onStop] 回调的问题

3. 修复一个 L3 拉流失败的问题

    修复 2.20.0 ~ 2.20.2 版本 SDK 采用 L3 拉流时，如果拉到的流是 2.15.0 及之前版本 SDK 推送的流，可能会失败的问题。

---
## 2.20.2 版本 <a id="2.20.2"></a>

**发布日期：2022.06.20**


**问题修复**

1. 修复了在初始化 SDK 前设置音频设备模式不生效的问题



---

## 2.20.1 版本 <a id="2.20.1"></a>

**发布日期：2022.06.18**


**问题修复**

1. 修复了一个概率性拉流失败的问题



---


## 2.20.0 版本 <a id="2.20.0"></a>

**发布日期：2022-06-09**


**新增功能**

1. 媒体播放器支持设置声道

    在调用 [createEngine](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~ZegoExpressSDK#create-engine) 接口初始化引擎以及 [createMediaPlayer](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoExpressEngine#create-media-player) 接口创建媒体播放器后，可以调用 [setActiveAudioChannel](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoMediaPlayer#set-active-audio-channel) 接口设置左声道、右声道或立体声。初始化时，媒体播放器默认为全部声道。

    相关 API 请参考 [setActiveAudioChannel](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoMediaPlayer#set-active-audio-channel)

2. 媒体播放器支持结束播放时清除最后一帧画面

    注意：必须等待媒体播放器结束播放后，接口调用才能生效。

    调用 [createEngine](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~ZegoExpressSDK#create-engine) 接口初始化引擎，调用 [createMediaPlayer](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoExpressEngine#create-media-player) 接口创建媒体播放器，可以调用 [clearView](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoMediaPlayer#clear-view) 清除遗留的最后一帧画面。

    相关 API 请参考 [clearView](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoMediaPlayer#clear-view)

3. 支持开启摄像头自适应帧率

    注意：当通过 [setVideoConfig](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoExpressEngine#set-video-config) 设置的帧率小于 [enableCameraAdaptiveFPS](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoExpressEngine#enable-camera-adaptive-fps) 期望帧率最小值时，将使用 [setVideoConfig](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoExpressEngine#set-video-config) 设置的帧率值。由于不同的手机厂商的硬件和算法策略不同，该接口在不同的机型或同一机型的前后摄像头上，效果存在一定差异。

    当推流端用户设置的帧率较高，而所处环境光照较低无法正常显示或识别主体的情况下，可以调用 [enableCameraAdaptiveFPS](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoExpressEngine#enable-camera-adaptive-fps) 接口，在一定范围内自动降低帧率来增加曝光时间，从而提升视频画面亮度。该功能常用于对曝光要求较高的直播场景。[enableCameraAdaptiveFPS](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoExpressEngine#enable-camera-adaptive-fps) 接口需在调用 [createEngine](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~ZegoExpressSDK#create-engine) 接口初始化引擎之后，启动摄像头前调用。

    相关 API 请参考 [enableCameraAdaptiveFPS](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoExpressEngine#enable-camera-adaptive-fps)

4. 支持设置混流中单条输入流的图片信息

    注意：图片地址长度不得超出1024 字节，否则出现错误码 1005034；图片格式应为 JPG 和 PNG 格式，否则出现错误码 1005035；图片不得超过 1M，否则出现错误码 1005036。

    支持通过 [startMixerTask] 接口的 “ZegoMixerImageInfo” 类型参数，设置图片地址，将单条输入流的内容设置为图片，用于替代视频，即当使用图片时不显示视频。该功能的使用场景为连麦时，视频用户可能需要暂时关闭摄像头而显示其头像图片，或者当视频用户和音频用户连麦，需要显示音频用户的头像图片。

    相关 API 请参考 [startMixerTask](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoExpressEngine#start-mixer-task)

5. 支持设置调用 mutePlayStreamVideo 后是否清除最后一帧

    注意：如需使用该功能，请联系 ZEGO 技术支持。

    开发者发现推流用户违规时，调用 [mutePlayStreamVideo] 接口暂停拉流用户拉取违规用户的视频流，要求违规用户整改。使用本功能，可避免因拉流用户的视频界面依然保留最后一帧导致的违规风险。

6. 支持线性增长的音量增益

    注意：如需使用该功能，请联系 ZEGO 技术支持。

    提供新的音量增益方式，开发者可以根据实际需求选择合适的音量增益方式。

7. 支持设置流级别的音视频自动审核

    注意：如需使用该功能，请联系 ZEGO 技术支持开通后台服务。

    在调用 [startPublishingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoExpressEngine#start-publishing-stream-2) 接口开始推流时，开发者可以设置 “ZegoStreamCensorshipMode” 参数，进行流级别的音视频自动审核，自动鉴别涉黄涉政内容，以此降低开发者的接入难度和业务维护成本。

    相关 API 请参考 [startPublishingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoExpressEngine#start-publishing-stream-2)

**改进优化**

1. Express v2.20.0 统一实时音视频和实时语音 SDK 的接口

    从 v2.20.0 版本起，实时音视频和实时语音之间不再有 API 的差异，即可以随时从实时音视频 SDK 切换到实时语音 SDK，反之亦然。两种 SDK 之间唯一的区别是对于实时语音 SDK 来说，部分跟视频相关的 API （比如视频编码参数设置、预览和拉流的 ZegoCanvas 参数等）设置后没有效果，但不会报错。注意此次改动可能会产生极少数不兼容问题，具体请参考 FAQ 文档 [升级 Express v2.20.0 或以上版本后编译报错？](http://doc-zh.zego.im/faq/express_2.20.0_upgrade_guide)

2. 开发者传入不存在的 AppID 时报错的错误码从 1002099 优化为 1001004

3. 优化回声消除，解决 KTV 等场景的吞音现象

4. 新增 1009013 错误码

    表示消息输入长度超出限制。出现此错误码时，请检查输入内容长度或联系 ZEGO 技术支持扩展消息内容长度。

5. 新增 1017009 错误码

    在版权音乐初始化时，由于未设置 AppSign 或 Token，导致鉴权失败，会出现此错误码。此时，如果是使用 AppSign 鉴权，请在初始化 SDK 时传入 AppSign；如果是使用 Token 鉴权，在调用 [initCopyrightedMusic](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoCopyrightedMusic#init-copyrighted-music) 接口前，请调用 [loginRoom](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoExpressEngine#login-room) 接口并传入 Token，以供鉴权。

    相关 API 请参考 [initCopyrightedMusic](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoCopyrightedMusic#init-copyrighted-music)，[loginRoom](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoExpressEngine#login-room)

**问题修复**

1. 修复了自定义采集 AAC 音频格式的报错问题


---

## 2.19.0 版本 <a id="2.19.0"></a>

**发布日期：2022-06-01**

**新增功能**

畅直播首次发布，提供超低延迟直播、CDN Plus直播、CDN直播3种差异化服务，并提供多种直播推流、直播拉流等核心功能，更多功能和详情请参考 [概述](https://doc-zh.zego.im/article/13405)。
