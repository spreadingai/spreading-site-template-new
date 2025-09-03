# 发布日志

- - -

## 3.22.0 版本<a id="3.22.0"></a>

**发布日期： 2025-08-26**

**新增功能**

1. 支持主路设置麦克风音频源混入屏幕采集音频源

    `ZegoAudioSourceMixConfig` 新增 `enableMixScreenCapture` 参数，用于在主路设置麦克风音频源时，支持混入屏幕共享音频数据一起推流。调用 [setAudioSource] 可以动态开启或关闭此功能。

    相关 API 请参考：[setAudioSource](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePublisher/setAudioSource.html)、[startCapture](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoScreenCaptureSource/startCapture.html)、[updateScreenCaptureConfig](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoScreenCaptureSource/updateScreenCaptureConfig.html)

2. 屏幕共享提供启动回调和异常中断回调 

    启动屏幕共享时，可通过  `onMobileScreenCaptureStart`  监听屏幕共享是否启动成功和 `onMobileScreenCaptureExceptionOccurred` 监听屏幕共享启动失败或中途断开异常。

    相关 API 请参考：[onMobileScreenCaptureStart](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngine/onMobileScreenCaptureStart.html)、[onMobileScreenCaptureExceptionOccurred](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngine/onMobileScreenCaptureExceptionOccurred.html)

3. 屏幕共享支持设置画面固定横竖屏朝向 

    `ZegoScreenCaptureConfig` 新增了 `ZegoScreenCaptureOrientation` 参数，用于设置屏幕共享画面固定横竖屏朝向。

    相关 API 请参考：[startCapture](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoScreenCaptureSource/startCapture.html)、[updateScreenCaptureConfig](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoScreenCaptureSource/updateScreenCaptureConfig.html)

4. 屏幕共享支持音频包共享系统声音

    <Warning title="注意">
    如需使用本功能，请联系 ZEGO 技术支持。
    </Warning>

5. 支持使用指定音量模式启动屏幕共享 

    `ZegoScreenCaptureConfig` 新增了 `ZegoScreenCaptureAudioDeviceMode` 参数，用于指定音频设备模式(通话音量或媒体音量)启动屏幕采集。

    <Warning title="注意">
      1. 只有当主路设置麦克风音频源时，音频设备模式才生效。
      2. 仅对开启屏幕采集的 [startCapture] 接口生效，对更新屏幕采集的 [updateScreenCapture] 接口没有作用。
      3. 采集过程中音频设备模式发生变化导致屏幕采集音频输出异常，可以通过 [onMobileScreenCaptureExceptionOccurred] 回调监听 AudioDeviceException，如有必要，需要重启采集。
      4. 停止采集后会恢复采集之前的音频设备模式。
    </Warning>

    相关 API 请参考：[startCapture](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoScreenCaptureSource/startCapture.html)、[updateScreenCaptureConfig](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoScreenCaptureSource/updateScreenCaptureConfig.html)


6. 新增静态图片采集视频源 

    通过设置 [setVideoSource](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePublisher/setVideoSource.html) 视频源为 `Picture`，即可推流一张指定的图片。

    相关 API 请参考：[setVideoSource](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePublisher/setVideoSource.html)

7. 半自动混流支持混流对齐能力

    相关 API 请参考：[ZegoAutoMixerTask](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoAutoMixerTask-class.html)

8. 媒体播放器实例个数限制放开至 10 个

    详细请参考 [媒体播放器](/live-streaming-flutter/other/media-player)。

9. 媒体播放器边下边播支持分片文件存储，避免一次性申请内存过大

    <Warning title="注意">
    如需使用本功能，请联系 ZEGO 技术支持。
    </Warning>

10. 拉流切换功能支持强制切换模式

    启用强制切换模式，可避免在弱网环境下，从高码率档位切换至低码率档位时长时间拉不到流的情况。

    相关 API 请参考：[SwitchPlayingStream](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePlayer/switchPlayingStream.html)


11. 场景化配置新增 KTV 场景参数

    相关 API 请参考： [setRoomScenario](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngine/setRoomScenario.html)

12. 新增非主线程（ UI 线程）的音视频首帧耗时回调接口，可在主线程阻塞时更准确地统计首帧耗时

13. 支持接入微帧264编码器

    <Warning title="注意">
    如需使用本功能，请联系 ZEGO 技术支持。
    </Warning>


14. 新增拉流链路上各环节数据指标的回调

    <Warning title="注意">
    如需使用本功能，请联系 ZEGO 技术支持。
    </Warning>



15. SDK 播放器支持 HLS 协议 拉流且支持分辨率自适应

    <Warning title="注意">
    如需使用本功能，请联系 ZEGO 技术支持。
    </Warning>

    相关 API 请参考：[SwitchPlayingStream](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePlayer/switchPlayingStream.html)


17. 支持通过云端控制的方式下发云代理配置，并且动态生效

    支持通过云端控制的方式下发云代理配置。当云端控制配置完成且SDK 拉取到最新的云端控制信息，新的云代理配置能够立即生效。

    <Warning title="注意">
    如需使用本功能，请联系 ZEGO 技术支持。
    </Warning>
    
    相关 API 请参考：[setCloudProxyConfig](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngine/setCloudProxyConfig.html)


18. 推拉流功能新增国密算法加密

    <Warning title="注意">
    如需使用本功能，请联系 ZEGO 技术支持。
    </Warning>

    相关 API 请参考：[startPublishingStream](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePublisher/startPublishingStream.html)、[addPublishCdnUrl](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePublisher/addPublishCdnUrl.html)、[removePublishCdnUrl](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePublisher/removePublishCdnUrl.html)

19. 支持 WMA 编码器
    
    媒体播放器，音效播放器支持播放 wma 格式的音频文件


**改进优化**

1. SDK 内的 curl 库升级为 8.14.1 版本 

2. 优化开启主体分割切换背景类型为视频时占用内存过大的问题

3. 优化自然背景分割效果

4. 优化 AI 超分锯齿

5. 优化低照度增强效果

**问题修复**

1. 修复了同时异步调用 startPreview 和  startPublish 时重复采集摄像头导致结束推流时摄像头没有正常被释放的问题。


2. 修复 eventChannel 重复注册 zego_express_event_handler 数据在回调处理时出现错误提示的问题。


3. 修复远端设备状态回调报错没有触发 onRemoteCameraStateUpdate、onRemoteMicStateUpdate 事件。


4. 修复纯音频场景的摄像头权限弹框问题。


5. 修复 startPlayingStream 接口不传入视图容器参数无法拉流的问题。

---

## 3.21.0 版本 <a id="3.21.0"></a>

**发布日期： 2025-06-11**

**新增功能**

1. 屏幕共享功能在 macOS 和 Windows 端支持描边效果

    在桌面端使用屏幕共享时，可以为共享窗口添加一个高亮描边，并设置描边的颜色和宽度，提升共享窗口的识别度。详情请参考 [屏幕共享 - 描边](/real-time-video-flutter/video/screen-sharing#描边)。

    <Warning title="注意">


    Windows 平台部分系统窗口（例如任务管理器、以管理员权限启动的程序的窗口等）可能因权限限制无法显示描边，建议以管理员权限启动应用。
    </Warning>



    相关 API 请参考 [enableHightLight](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoScreenCaptureSource/enableHightLight.html)

2. 支持自定义 CDN 拉流超时等待时间

    <Warning title="注意">


    如需使用本功能，请联系 ZEGO 技术支持。

    </Warning>



    针对从 CDN 拉流超时等待过长，导致用户实际体验不佳的情况，SDK 对 CDN 拉流内部超时逻辑优化，降低超时等待时长。此外，SDK 支持开发者自定义拉流超时时间。

3. 支持推流时设置直播标题

    若要在直播列表等场景展示直播标题，SDK 支持开发者在主播调用 [startPublishingStream](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePublisher/startPublishingStream.html) 接口开始推流前，通过 [ZegoPublisherConfig](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoPublisherConfig-class.html) 中的 streamTitle 参数配置标题。

    相关 API 请参考 [startPublishingStream](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePublisher/startPublishingStream.html), [ZegoPublisherConfig > streamTitle](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoPublisherConfig/streamTitle.html)

4. 媒体播放器新增有关资源文件权限的错误码

    优化媒体播放器的回调通知逻辑，针对“播放资源无权限”的错误新增错误码 1008015，帮助开发者快速定位问题。

    相关 API 请参考 [onMediaPlayerStateUpdate](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngine/onMediaPlayerStateUpdate.html)

**改进优化**

1. 更新 libvpx 版本

    为提升 SDK 安全质量，第三方库 libvpx 已升级至 1.13.1 版本。

2. 降低登录和推拉流等操作的耗时

    优化 SDK 调度逻辑，降低登录、推拉流耗时，提升用户秒开体验。

3. 优化低照度增强算法

    优化低照度增强算法，使得明暗切换更平滑，并且规避过曝问题。

4. 优化耳返延迟表现

    优化安卓设备在超低延迟模式下的耳返延迟表现。

5. 优化双声道音频编码

    <Warning title="注意">


    如需使用本功能，请联系 ZEGO 技术支持。


    </Warning>



    优化特定场景下双声道音频编码效率：在保证相同音质的前提下，降低音频码率，减轻用户带宽消耗，提升播放流畅度与体验。

6. 优化房间流补充增强信息发送表现

    当房间流补充增强信息发送失败时，SDK 会在流的生命周期内重试直至发送成功，提升房间流补充增强信息可靠性。

**问题修复**

1. 修复用户在推流中，调用拉流接口传入转码模板无效的问题

2. 修复在通话音量模式下使用蓝牙耳机时，在 iOS 设备通过 AVRoutePickerView 切换扬声器和听筒时，未触发 onAudioRouteChange 回调的问题

3. 修复使用 iOS 设备在媒体模式下无法正确使用无线麦克风设备采集声音的问题

    <br />
---

<a name="3.20.5"></a>

## 3.20.5 版本 <a id="3.20.5"></a>

**发布日期： 2025-05-13**

**新增功能**

1. Web 平台补齐更多功能

    | 功能 | API |
    | --- | --- |
    | 获取与设置音频参数 | <ul><li>[getAudioConfig](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePublisher/getAudioConfig.html)</li><li>[setAudioConfig](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePublisher/setAudioConfig.html)</li></ul> |
    | 地理围栏 | [setGeoFence](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngine/setGeoFence.html) |
    | 云代理 | [setCloudProxyConfig ](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngine/setCloudProxyConfig.html) |
    | 设置镜像模式 | [setVideoMirrorMode](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePublisher/setVideoMirrorMode.html)<Note title="说明">不支持设置推流镜像。</Note>|
    | 设置推流端采集音量 | [setCaptureVolume](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePublisher/setCaptureVolume.html) |
    | 转推至 CDN | <ul><li>[addPublishCdnUrl](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePublisher/addPublishCdnUrl.html)</li><li>[removePublishCdnUrl](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePublisher/removePublishCdnUrl.html)</li></ul> |
    | 动态切换流控策略 | <ul><li>[enableTrafficControl](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePublisher/enableTrafficControl.html)</li><li>[setMinVideoBitrateForTrafficControl](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePublisher/setMinVideoBitrateForTrafficControl.html)</li><li>[setTrafficControlFocusOn](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePublisher/setTrafficControlFocusOn.html)</li></ul> |
    | 设置拉流音量 | <ul><li>[setPlayVolume](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePlayer/setPlayVolume.html)</li><li>[setAllPlayStreamVolume](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePlayer/setAllPlayStreamVolume.html)</li></ul><Note title="说明">不支持设置超过 100，超过按 100 处理。</Note>|
    | 拉流是否接收所有音频数据 | [muteAllPlayAudioStreams](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePlayer/muteAllPlayAudioStreams.html) |
    | 拉流是否接收所有视频数据 | [muteAllPlayVideoStreams](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePlayer/muteAllPlayVideoStreams.html) |
    | 更新拉流视图 | [updatePlayingCanvas](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePlayer/updatePlayingCanvas.html) |
    | 是否开启硬件解码 | [enableHardwareEncoder ](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePublisher/enableHardwareEncoder.html) |
    | 实时有序数据 | <ul><li>[createRealTimeSequentialDataManager](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngineIM/createRealTimeSequentialDataManager.html)</li><li>[destroyRealTimeSequentialDataManager](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngineIM/destroyRealTimeSequentialDataManager.html)</li><li>[startBroadcasting](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoRealTimeSequentialDataManager/startBroadcasting.html)</li><li>[stopBroadcasting](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoRealTimeSequentialDataManager/stopBroadcasting.html)</li><li>[sendRealTimeSequentialData](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoRealTimeSequentialDataManager/sendRealTimeSequentialData.html)</li><li>[startSubscribing](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoRealTimeSequentialDataManager/startSubscribing.html)</li><li>[stopSubscribing](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoRealTimeSequentialDataManager/stopSubscribing.html)</li><li>[onReceiveRealTimeSequentialData](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngine/onReceiveRealTimeSequentialData.html)</li></ul> |
    | 开启与关闭声浪监控 | <ul><li>[startSoundLevelMonitor](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngineDevice/startSoundLevelMonitor.html)</li><li>[stopSoundLevelMonitor](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngineDevice/stopSoundLevelMonitor.html)</li></ul> |
    | 基础美颜 | <ul><li>[startEffectsEnv](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePreprocess/startEffectsEnv.html)</li><li>[stopEffectsEnv](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePreprocess/stopEffectsEnv.html)</li><li>[enableEffectsBeauty](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePreprocess/enableEffectsBeauty.html)</li><li>[setEffectsBeautyParam](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePreprocess/setEffectsBeautyParam.html)</li></ul> |
    | 媒体播放器 | [loadCopyrightedMusicResourceWithPosition](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoMediaPlayer/loadCopyrightedMusicResourceWithPosition.html) |
    | 低照度增强 | [setLowlightEnhancement](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePublisher/setLowlightEnhancement.html) |
    | 自动混流 | <ul><li>[startAutoMixerTask](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngineMixer/startAutoMixerTask.html)</li><li>[stopAutoMixerTask](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngineMixer/stopAutoMixerTask.html)</li></ul> |
    | 拉流画面截图 | [takePlayStreamSnapshot](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePlayer/takePlayStreamSnapshot.html) |
    | 本地设备异常事件回调 | [onLocalDeviceExceptionOccurred](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngine/onLocalDeviceExceptionOccurred.html) |
    | 本地视频和音频设备状态变更事件回调 | <ul><li>[onVideoDeviceStateChanged](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngine/onVideoDeviceStateChanged.html)</li><li>[onAudioDeviceStateChanged](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngine/onAudioDeviceStateChanged.html)</li></ul> |
    | 获取音频原始数据 | <ul><li>[startAudioDataObserver](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngineCustomAudioIO/startAudioDataObserver.html)</li><li>[stopAudioDataObserver](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngineCustomAudioIO/stopAudioDataObserver.html)</li><li>[onMixedAudioData](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngine/onMixedAudioData.html)</li><li>[onPlayerAudioData](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngine/onPlayerAudioData.html)</li></ul> |
    | 混流音浪回调 | [onMixerSoundLevelUpdate](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngine/onMixerSoundLevelUpdate.html)<Note title="说明">Web 端仅支持通过 SEI 获取混流音浪，请联系 ZEGO 技术支持开启配置，并调用接口时作防竞争码处理</Note>|
    | 自动混流音浪回调 | [onAutoMixerSoundLevelUpdate](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngine/onAutoMixerSoundLevelUpdate.html)<Note title="说明">请联系 ZEGO 技术支持开启配置。</Note>|

**改进优化**

1. 更新集成 Express Native SDK 至 3.20.5 版本。

2. 更新集成 Express Web SDK 至 3.9.0 版本。

**问题修复**

<Note title="说明">


以下问题修复仅适用于 Web 平台接口。

</Note>



1. 修复初始化引擎后调用 [getVideoConfig](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePublisher/getVideoConfig.html) 接口获取默认场景配置失败的问题

2. 修复推流前调用 [setVideoConfig](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePublisher/setVideoConfig.html) 设置视频参数未生效的问题

3. 修复登录房间时设置房间最大人数限制（maxMemberCount）参数不生效问题

4. 修复推流前调用 [setStreamExtraInfo](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePublisher/setStreamExtraInfo.html)、[mutePublishStreamVideo](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePublisher/mutePublishStreamVideo.html)、[mutePublishStreamAudio](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePublisher/mutePublishStreamAudio.html)、[enableCamera](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngineDevice/enableCamera.html) 未生效的问题

5. 修复 [onRoomTokenWillExpire](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngine/onRoomTokenWillExpire.html) 中 remainTimeInSecond 字段单位错误的问题（由毫秒改为秒）

6. 修复初始化引擎后仍能调用 [setRoomMode](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngine/setRoomMode.html) 接口修改多房间模式的问题

    <br />
---

<a name="3.20.0"></a>

## 3.20.0 版本 <a id="3.20.0"></a>

**发布日期： 2025-03-24**

**新增功能**

1. 支持赛事解说场景的音画精准同步

    <Warning title="注意">


    如需使用该功能，请联系 ZEGO 技术支持。


    </Warning>



    为赛事解说场景新增接口，支持解说流与赛事流的音画精准同步对齐，为观众带来优质的观看体验。

2. 新增用户维度的网络质量回调

    新增 [onRtcStats](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngine/onRtcStats.html) 回调，开发者可用于衡量用户维度的 RTC 网络质量，该接口将本端用户所有推、拉流的质量数据进行聚合统计并回调，包括：<ul><li>上行 & 下行：占用带宽、RTT、丢包率。</li><li>端到端延迟。</li></ul>

    相关 API 请参考 [onRtcStats](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngine/onRtcStats.html)

3. 人脸识别功能支持后置摄像头以及回调人脸个数和坐标信息

    人脸识别功能支持后置摄像头，且新增回调 [onPublisherFaceDetectInfo](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngine/onPublisherFaceDetectInfo.html) 支持获取人脸个数和坐标信息。

    <div class="mk-note">

    该回调仅当摄像头启动和人脸个数变化时触发，无法与自定义视频前处理配合使用。
    </div>

    相关 API 请参考 [enableFaceDetection](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePublisher/enableFaceDetection.html), [onPublisherFaceDetectInfo](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngine/onPublisherFaceDetectInfo.html)

4. mac 端自定义渲染支持输出 RGBA 数据

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

2. 优化在 iOS 端切换视频流时的闪烁问题，实现平滑过渡

    <Warning title="注意">


    如需使用该功能，请联系 ZEGO 技术支持。

    </Warning>



    在 iOS 端使用相同 View 切换视频流时，可以选择保留旧视频的最后一帧直至新视频渲染完成，实现视频画面平滑过渡。

3. 优化在移动端频繁调用 enableCamera 时摄像头状态回调次数过多的问题

    ZEGO 为 [enableCamera](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngineDevice/enableCamera.html) 接口新增 `notifyMode` 参数，用于控制在移动端关闭摄像头时是否通知本端以及远端。在切换前后置摄像头场景下，该参数可减少设备开关状态的回调次数，避免触发不必要的业务逻辑。

**问题修复**

1. 修复在 iOS 端使用蓝牙耳机时偶现的路由异常问题

2. 修复了媒体播放器在播放部分网络素材时，因 seekTo 接口调用失败导致播放报错的偶现问题

3. 修复已知问题，优化 SDK 性能

    <br />
---

<a name="3.19.1"></a>

## 3.19.1 版本 <a id="3.19.1"></a>

**发布日期： 2025-02-26**

**新增功能**

1. 适配 Flutter 最新版本

    ZEGO Express Engine SDK 现已支持 Flutter 3.29.0 版本。

    <br />
---

<a name="3.19.0"></a>

## 3.19.0 版本 <a id="3.19.0"></a>

**发布日期： 2025-01-21**

**新增功能**

1. 新增 AI 低照度增强功能

    <Warning title="注意">


    如需使用该功能，请联系 ZEGO 技术支持。


    </Warning>



    低照度增强功能新增 AI 算法，相比传统算法，画面色彩更加饱满、对比度更真实且噪点抑制效果更好，整体画质的主观效果提升明显。

    开发者可通过 [setLowlightEnhancementParams](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePublisher/setLowlightEnhancementParams.html) 指定使用 AI 算法，当设备性能不足以支持开启 AI 算法时，SDK 会自动使用传统算法。一般中高端机型可稳定运行低照度增强 AI 算法，详细请参考 [推流视频增强](https://doc-zh.zego.im/article/18929) 文档。

    相关 API 请参考 [setLowlightEnhancementParams](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePublisher/setLowlightEnhancementParams.html)

2. 独唱场景下支持动态响度均衡功能

    开启动态响度均衡后，根据媒体播放器伴奏的实时表现，SDK 动态调整人声响度，使人声与伴奏响度时刻保持恰当比例，提升人声与伴奏融合度，观众体验更佳，适用于实时 KTV 的独唱场景。

    相关 API 请参考 [enableAuxBgmBalance](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePublisher/enableAuxBgmBalance.html)

3. 媒体播放器播放在线资源时，支持缓存资源文件

    开发者可通过配置 [ZegoMediaPlayerResource-onlineResourceCachePath](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoMediaPlayerResource/onlineResourceCachePath.html) 参数，设置缓存资源文件路径。此外可通过 [ZegoMediaPlayerResource-maxCachePendingLength](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoMediaPlayerResource/maxCachePendingLength.html) 参数设置从当前播放时间点，最多可预缓存的数据长度（单位 bytes）。从而使媒体播放器播放在线资源时，可以减少用户资源下载频次，提高资源复用率与用户体验。

    <Warning title="注意">


    生成缓存文件的同时，SDK 同时会生成一个 ".info "后缀的文件，用于记录缓存信息（如缓存的起始位置等）。用户使用该功能时，需要自行负责清理"缓存文件"及"缓存信息文件"。


    </Warning>



    相关 API 请参考 [ZegoMediaPlayerResource > onlineResourceCachePath](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoMediaPlayerResource/onlineResourceCachePath.html), [ZegoMediaPlayerResource > maxCachePendingLength](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoMediaPlayerResource/maxCachePendingLength.html)

4. 摄像头停止采集时，支持自动推送静态图片

    当用户主动操作或系统前后台等限制，导致摄像头无法继续采集时，支持自动推送开发者配置的静态图片。

    相关 API 请参考 [ZegoExpLowlightEnhancementType](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpLowlightEnhancementType.html)



**改进优化**

1. 优化 CDN 域名解析逻辑，避免阻塞线程

    CDN 推拉流的域名解析逻辑，由同步改为异步操作，避免阻塞线程。

2. 降低首帧延迟，提升用户秒开体验

    针对首次运行 ZEGO Express SDK 的设备，可降低进房耗时、推拉流耗时，提升用户秒开体验。


    <br />
---

<a name="3.18.1"></a>

## 3.18.1 版本 <a id="3.18.1"></a>

**发布日期： 2024-12-17**


**问题修复**

1. 登录耗时优化

2. 修复实验性 API 老版本兼容性的问题

3. 修复媒体播放器低概率状态异常的问题


    <br />
---

## 3.18.0 版本 <a id="3.18.0"></a>

**发布日期： 2024-12-04**


**新增功能**

1. 新增 AI 回声消除（AEC）

    <Warning title="注意">


    如需使用该功能，请联系 ZEGO 技术支持。


    </Warning>



    AI AEC 支持智能识别并且消除回声。相较传统 AEC 算法，人声保真度效果提升明显，且没有额外的延迟与功耗增量。适用于实时 KTV 、高音质语聊与视频等场景。

    相关 API 请参考 [ZegoAECMode > AI](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/file-___Users_zego_ci_workspace_workspace_rtc_utils_publish_express_api_documents_projects_flutter_lib_src_zego_express_defines/ZegoAECMode.html#AI)

2. 支持设置视频降噪功能

    新增视频降噪接口`setVideoDenoiseParams`，适用于摄像头的采集效果不佳，画面出现明显的噪点时，需要单独视频降噪等场景。开发者可以根据业务场景，选择不同的视频降噪模式 [ZegoVideoDenoiseMode](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/file-___Users_zego_ci_workspace_workspace_rtc_utils_publish_express_api_documents_projects_flutter_lib_src_zego_express_defines/ZegoVideoDenoiseMode.html) 及视频降噪强度 [ZegoVideoDenoiseStrength](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/file-___Users_zego_ci_workspace_workspace_rtc_utils_publish_express_api_documents_projects_flutter_lib_src_zego_express_defines/ZegoVideoDenoiseStrength.html)，详情可参考 [推流视频增强](https://doc-zh.zego.im/article/18929) 文档。

    相关 API 请参考 [setVideoDenoiseParams](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/file-___Users_zego_ci_workspace_workspace_rtc_utils_publish_express_api_documents_projects_flutter_lib_src_zego_express_api_publisher/ZegoExpressEnginePublisher/setVideoDenoiseParams.html)


3. 支持将混流后的输出流加入到目标房间

    混流功能支持将混流后的输出流，加入到指定房间，即支持设置输出流的目标房间信息 [targetRoom](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/file-___Users_zego_ci_workspace_workspace_rtc_utils_publish_express_api_documents_projects_flutter_lib_src_zego_express_defines/ZegoMixerOutput/targetRoom.html)。每条输出流只支持加入一个房间，且一旦添加，混流过程中不支持动态更新房间。如需使用服务端接口实现该功能，可参考 [开始混流](/live-streaming-server/api-reference/stream-mixing/start-mix) 文档。

    相关 API 请参考 [targetRoom](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/file-___Users_zego_ci_workspace_workspace_rtc_utils_publish_express_api_documents_projects_flutter_lib_src_zego_express_defines/ZegoMixerOutput/targetRoom.html)

4. Web 端支持在初始化引擎之前设置日志等级

    Web 端支持在初始化引擎之前设置日志等级，以减少浏览器控制台打印的日志。

    相关 API 请参考 [setLogConfig](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/file-___Users_zego_ci_workspace_workspace_rtc_utils_publish_express_api_documents_projects_flutter_lib_src_zego_express_api/ZegoExpressEngine/setLogConfig.html)

5. Web 端新增房间状态变化通知回调

    当房间的连接状态改变时，触发 [onRoomStateChanged](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngine/onRoomStateChanged.html) 回调，开发者可以通过该回调来判断房间内当前用户状态。

    相关 API 请参考 [onRoomStateChanged](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngine/onRoomStateChanged.html)

**改进优化**

1. 优化低照度增强功能中的降噪效果

2. 视频自定义采集和前处理时，支持适配 OpenGL 3.0 版本

    视频自定义前处理和自定义采集场景下，支持适配 OpenGL 3.0 版本，可用于适配部分厂商的美颜特效。

    相关 API 请参考 [setLowlightEnhancement](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/file-___Users_zego_ci_workspace_workspace_rtc_utils_publish_express_api_documents_projects_flutter_lib_src_zego_express_api_publisher/ZegoExpressEnginePublisher/setLowlightEnhancement.html)

3. 减少推拉流耗时，提升 SDK 性能

**问题修复**

1. 修复媒体播放器 URL 链接带空格时，加载失败的问题

2. 修复 iPad 无法连接蓝牙耳机的问题

3. 修复媒体播放器开启本地缓存后，偶现播放崩溃的问题

4. 修复 Web 端切换前后摄像头后，本地预览黑屏的问题


    <br />
---

<a name="3.17.1"></a>

## 3.17.1 版本 <a id="3.17.1"></a>

**发布日期： 2024-10-10**


**问题修复**

1. 修复 Android 平台在自定义视频前处理使用 `SurfaceTexture` 数据类型时，出现崩溃的问题


    <br />
---



<a name="3.17.0"></a>

---
## 3.17.0 版本 <a id="3.17.0"></a>

**发布日期： 2024-10-09**


**新增功能**

1. Flutter 框架支持 Linux 平台

    支持 Debian 10 或以上版本、Ubuntu 20.04 LTS、22.04 LTS、24.04 LTS。


2. 媒体播放器播放透明特效时，支持 Alpha 数据布局在 RGB 数据右上方

    媒体播放器播放透明特效时，新增 [ZegoAlphaLayoutType > RightTop](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoAlphaLayoutType.html) 枚举，以支持 Alpha 数据拼接在 RGB 数据右上方，设置此枚举时，仅支持 0.5x 的缩放倍率。

    相关 API 请参考 [loadResourceWithConfig](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoMediaPlayer/loadResourceWithConfig.html), [ZegoAlphaLayoutType > RightTop](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoAlphaLayoutType.html)

3. 支持自定义观众上麦前和下麦后的拉流资源类型

    支持分别设置观众在上麦前和下麦后的拉流资源类型，使拉流方式更灵活，可设置分别为：通过 RTC 拉流、超低延迟直播（L3）拉流或 CDN 拉流中任意一种拉流方式。例如，可用于实现直播连麦场景中，观众上麦前默认使用 L3 拉流，上麦互动时切换为通过 RTC 拉流，下麦后恢复为通过 L3 拉流。

    相关 API 请参考 [startPlayingStream](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePlayer/startPlayingStream.html)，[ZegoStreamResourceMode > Custom](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoStreamResourceMode.html#Custom)，[ZegoPlayerConfig > customResourceConfig](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoPlayerConfig/customResourceConfig.html)

**改进优化**

1. 删除 AndroidManifest.xml 文件中声明的屏幕共享默认权限

    注意：

    - 若开发者在 3.17.0 版本之后，实现屏幕共享能力时没有声明权限，本次更新后必需主动声明权限，否则会出现兼容性问题。
    - 如线上遇到兼容性问题，请联系 ZEGO 技术支持。

    为更符合隐私规范，删除 AndroidManifest.xml 文件中声明的屏幕共享默认权限，需开发者主动声明：

    - 如果目标 Android SDK 版本低于 34.0.0 版本，需设置 `FOREGROUND_SERVICE`` 权限声明。
    - 如果目标 Android SDK 版本是 34.0.0 及以后版本，需要设置 `FOREGROUND_SERVICE` 及 `FOREGROUND_SERVICE_MEDIA_PROJECTION` 权限声明。

    详情请参考 [屏幕共享](https://doc-zh.zego.im/article/17195) 文档。

2. 登录房间时，userName 字段改为非必填字段

    调用 [loginRoom](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngineRoom/loginRoom.html) 接口登录房间时，`userName` 原来为必填字段，本次优化为非必填的可选字段。

    相关 API 请参考 [loginRoom](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngineRoom/loginRoom.html)

3. 优化双声道变声效果，并提升音乐变调的音质

    相关 API 请参考 [setVoiceChangerParam](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePreprocess/setVoiceChangerParam.html)

**问题修复**

1. 修复无法解析 H.265 码流中，存在异常裁剪区域的问题

2. 修复反初始化时，监控模块崩溃，导致主线程卡死的问题

3. 修复版权音乐在开始打分时，可能出现崩溃的问题

4. 调整生命周期，修复已知崩溃问题

5. 修复媒体播放器已知的问题

    <br />
---


<a name="3.16.2"></a>

## 3.16.2 版本 <a id="3.16.2"></a>

**发布日期： 2024-08-16**

**问题修复**


1. 修复 Android 特定场景摄像头无法打开的问题

2. 修复 Android 某些机型屏幕录制时，应用杀死后不会自动停止录屏权限的问题

3. 修复 iOS 频繁推流/停止推流偶现崩溃问题


    <br />
---

<a name="3.16.0"></a>

## 3.16.0 版本 <a id="3.16.0"></a>

**发布日期： 2024-07-29**


**新增功能**

1. iOS 平台支持前后摄像头同时采集视频

    注意：

    - 该功能仅适用于 iOS 13 及以上版本，如需使用该功能，请联系 ZEGO 技术支持。

    - 该功能对手机性能消耗比较大，请谨慎使用。

    - 开发者可通过读取 [AVCaptureMultiCamSession.multiCamSupported] 系统库的接口，判断是否支持同时使用前后摄像头能力。

    新增枚举值 `ZegoVideoSourceTypeSecondaryCamera` 用于标识第二个摄像头的视频，支持通过 [setVideoSource] 接口同时将前后摄像头设置为视频采集源并分别推流。开发者可以通过 [useFrontCamera] 将 `ZegoVideoSourceTypeCamera` 及 `ZegoVideoSourceTypeSecondaryCamera` 对应的前后画面进行置换。该能力可应用于使用双摄像头直播等场景，更多内容请参考 [多源采集](https://doc-zh.zego.im/article/17209)。

    相关 API 请参考 [setVideoSource](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePublisher/setVideoSource.html), [useFrontCamera](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngineDevice/useFrontCamera.html), [ZegoVideoSourceType > SecondaryCamera](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoVideoSourceType.html#SecondaryCamera), [ZegoVideoSourceType > Camera](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoVideoSourceType.html#Camera)

2. iOS 平台针对有 3 个后置摄像头的手机，自动选择最清晰的摄像头采集视频

    注意：

    - 该功能仅适用于 iOS 14 及以上版本，如需使用该功能，请联系 ZEGO 技术支持。
    - 您可以通过系统接口 [AVCaptureDeviceDiscoverySession] 提前判断设备是否支持后置 3 摄像头。

    当设备存在 3 个后置摄像头（超广角、主摄与长焦摄像头）时，开启相关配置后，若通过 [setCameraZoomFactor] 更新变焦倍数，SDK 将根据变焦倍数，自动选择最清晰的摄像头采集视频。

    相关 API 请参考 [setCameraZoomFactor](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngineDevice/setCameraZoomFactor.html)

3. Android 平台新增屏幕采集权限的申请结果回调通知

    开发者可根据回调结果做后续业务处理，包括 UI 提示或应用跳转等，更多内容请参考 [屏幕共享](https://doc-zh.zego.im/article/17195)。

    相关 API 请参考 [onMobileScreenCaptureStart](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngine/onMobileScreenCaptureStart.html)

4. iOS 和 Android 平台的视频超分辨率功能支持 1.33 倍和 1.5 倍放大倍数

    注意：

    - 如需使用该功能，请联系 ZEGO 技术支持。
    - 初始化视频超分辨率前进行配置。

    视频分辨率高于设备支持上限会引入额外损伤，导致视频质量下降。因此视频超分辨率能力新增 1.33 倍和 1.5 倍的放大倍数，以适配不同设备的最佳效果，更多内容请参考 [超分辨率](https://doc-zh.zego.im/article/17179)。

5. AI 降噪新增低延迟模式

    注意：如需使用该功能，请联系 ZEGO 技术支持。

    在 10ms 延迟下，依然保持纯净的降噪效果以及高保真的人声音质，适用于游戏语音、游戏开黑、实时合唱等对延迟较为敏感的场景，目前 AI 降噪已支持均衡模式、低延迟模式以及轻量模式，详情请参考 [场景化 AI 降噪](https://doc-zh.zego.im/article/17176)。

    相关 API 请参考 [setANSMode](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePreprocess/setANSMode.html)

6. 在推流时，可以控制该流是否允许审核

    注意：若某条流设置为允许审核，如果开发者没有发起审核任务，这条流也不会被送审。

    当调用审核接口时，默认会对房间内的所有流进行审核。如果客户端要控制某条流不可以被送审，可以在调用 [startPublishingStream] 接口开始推流时，将送审标识 [streamCensorFlag] 参数设置为 1（不允许）。

    相关 API 请参考 [startPublishingStream](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePublisher/startPublishingStream.html), [ZegoPublisherConfig > streamCensorFlag](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoPublisherConfig/streamCensorFlag.html)

7. 媒体播放器播放倍速最低支持至 0.3 倍速

    媒体播放器的播放速度区间从 [0.5,4.0]，扩大为 [0.3,4.0]，更多内容请参考 [媒体播放器](https://doc-zh.zego.im/article/17215)。

    相关 API 请参考 [setPlaySpeed](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoMediaPlayer/setPlaySpeed.html)

8. H.265 客户端编码自动兼容策略新增用户级的协商范围

    注意：如需使用该功能，请联系 ZEGO 技术支持。

    控制本端客户端编码兼容范围为房间内所有推流用户或所有用户，即当指定范围内存在用户不支持 H.265 时，本端客户端编码动态回退。

    相关 API 请参考 [loginRoom](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngineRoom/loginRoom.html), [startPublishingStream](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePublisher/startPublishingStream.html), [ZegoPublisherConfig > codecNegotiationType](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoPublisherConfig/codecNegotiationType.html), [ZegoRoomConfig > capabilityNegotiationTypes](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoRoomConfig/capabilityNegotiationTypes.html)

**问题修复**

1. 修复偶现多 SPS 和 PPS 文件硬解导致设备发热严重的问题

2. 修复偶现插入耳机后设备音频依然外放的问题

3. 修复蓝牙相关权限导致崩溃的问题

4. 修复偶现的渲染器 JNI 异常的问题

5. 修复部分手机 dlopen libnativewindow 被拦截崩溃的问题

6. 修复切换前后台时，自定义滤镜死锁导致崩溃的问题

**废弃删除**

1. 废弃拉流接口中关于 CDN Plus 的配置

    下架畅直播概念，废弃 CDN Plus 直播相关接口。如需实现直播功能，推荐使用 ZEGO 自研 [超低延迟直播产品](https://doc-zh.zego.im/article/17185)，实现更高质量的直播体验。

    相关 API 请参考 [ZegoStreamResourceMode > CDNPlus](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoStreamResourceMode.html#CDNPlus)


    <br />
---

<a name="3.15.0"></a>

## 3.15.0 版本 <a id="3.15.0"></a>

**发布日期： 2024-06-05**


**新增功能**

1. 支持耳返声音数据从扬声器播出

    注意：如需使用该功能，请联系 ZEGO 技术支持。

    支持耳返的声音数据，可以从扬声器中播放。

2. 支持针对媒体播放器输出的声音内容，开启变声效果

    媒体播放器新增 [enableVoiceChanger] 接口 ，支持针对媒体播放器输出的声音内容开启变声效果，同时选择需要的变调音效。

    相关 API 请参考 [ZegoMediaPlayer > enableVoiceChanger](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoMediaPlayer/enableVoiceChanger.html)

**改进优化**

1. 优化 AI 场景化降噪中，“均衡模式”的降噪效果

    优化 AI 场景化降噪中，“均衡模式”的降噪效果，在性能不变的情况下，人声清晰度、平稳度进一步提升，且噪音抑制更干净，详情请参考 [场景化 AI 降噪](https://doc-zh.zego.im/article/17176)。

2. 扩充视频硬编解码的支持范围
    优化视频硬编解码，增加更多机型兼容适配的范围，同时优化高分辨率、高帧率下的编解码表现。

**问题修复**

1. 修复通过辅路推流的输入源，在使用主路推流的情况下，若停止音视频引擎，会出现概率性崩溃的问题

2. 修复使用媒体播放器播放网络素材时，偶现播放失败的问题

3. 修复硬编初始化概率性崩溃的问题

4. 修复硬件解码包含 B 帧的 CDN 直播视频流时，出现回放的问题

5. 修复摄像头枚举访问野指针的问题

6. Web 去除 innerHTML 接口的使用，以减少安全风险


**废弃删除**

1. 废弃媒体播放器 [setVoiceChangerParam] 接口

    为提升在变声情况下的播放体验，废弃媒体播放器 [ZegoMediaPlayer.setVoiceChangerParam] 接口，请使用 [ZegoMediaPlayer.enableVoiceChanger] 代替。

    相关 API 请参考 [ZegoMediaPlayer > enableVoiceChanger](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoMediaPlayer/enableVoiceChanger.html)


    <br />
---

## 3.14.5 版本 <a id="3.14.5"></a>

**发布日期： 2024-05-07**

**新增功能**

1. 移动端开发支持 iOS 17.0 版本

    注意：从该版本起，不再支持 iOS 11.0 及之前的版本。

    从 2024-04-29 开始，所有上架 App Store 的应用必须支持 iOS 17.0 版本，详情请参考 [Apple 开发者网站官方说明](https://developer.apple.com/news/upcoming-requirements/?id=04292024a)。

2. 支持使用 60 fps 高帧率采集视频

    注意：如需使用该功能，请联系 ZEGO 技术支持。

3. 新增“汽车人”、“没电了” 两种变声音效

    [ZegoVoiceChangerPreset](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoVoiceChangerPreset.html) 新增 “汽车人”、“没电了” 两种变声效果的枚举值，丰富变声效果。

    相关 API 请参考 [setVoiceChangerPreset](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePreprocess/setVoiceChangerPreset.html)

4. 媒体播放器支持视频画面镜像

    相关 API 请参考 [enableViewMirror](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoMediaPlayer/enableViewMirror.html)

5. 支持在图片资源校验失败时，依然正常发起混流任务

    [ZegoMixerTask](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoMixerTask-class.html) 新增参数 mixImageCheckMode，用于控制背景图（backgroundImageURL）、输入流占位图（inputList.imageInfo.url）、水印图片（watermark.imageURL）等图片资源校验失败时，能否正常发起混流任务。

    该功能默认不开启（mixImageCheckMode 默认取值为 0），表示严格执行图片校验，即必须满足参数原有的 “支持协议和格式”、“图片大小”、“图片资源请求成功” 等规则，才能正常发起混流任务。

    ZEGO 服务端 API 混流接口此前已支持该功能，详情请参考 [开始混流](/live-streaming-server/api-reference/stream-mixing/start-mix) 的 CheckImageMode 参数。

    相关 API 请参考 [startMixerTask](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngineMixer/startMixerTask.html)

6. 支持提前判断设备能否运行 AI 变声功能

    AI 变声功能对运行设备的性能有一定要求，开发者可以通过 [isAIVoiceChangerSupported] 接口提前判断设备能否支持运行 AI 变声功能。

    相关 API 请参考 [isAIVoiceChangerSupported](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngineAIVoiceChanger/isAIVoiceChangerSupported.html)

**改进优化**

1. 优化超分功能

    - 优化超分效果，降低了算法的锐度，从而提升了在原始画面有噪点、画面中有人脸等情况下的主观质量。例如，主播脸上的瑕疵不会被突出、主播的发缝不会变得更明显。
    - 优化超分算法在高通芯片上的帧率表现。

**问题修复**

1. 修复未定义全局变量的释放时机，导致进程退出异常的问题

2. 修复部分机型使用 AudioTrack 播放音频，出现异响的问题

3. 修复使用 AI 变声功能，偶现音画不同步、启停瞬间吞字的问题

4. 修复 iPad 通过麦克风采集音频，偶现没声音的问题

5. 修复销毁摄像头时多线程并发，导致访问空指针崩溃的问题

6. 修复媒体播放器打开 M3U8 格式的文件耗时较长的问题

    <br />
---

## 3.13.3 版本 <a id="3.13.3"></a>

**发布日期： 2024-04-09**

**问题修复**

1. 修复在 iOS 平台使用 TextureView 渲染画面时，设置 viewMode 视图模式异常的问题

    <br />
---

## 3.13.2 版本 <a id="3.13.2"></a>

**发布日期： 2024-04-01**

**问题修复**

1. 修复已知问题

**改进优化**

1. 更新 iOS SDK 内的隐私清单文件`PrivacyInfo.xcprivacy`

    注意：如客户集成的是 3.13.2 版本之前的 SDK，如想发布到 App Store，需下载最新版本的 SDK，并拷贝 PrivacyInfo.xcprivacy 文件到旧版 SDK 相应位置。

    请将 iOS SDK 内的隐私清单文件 `PrivacyInfo.xcprivacy` 升级到新版本，详情请参考 SDK 包内的 “ZegoExpressEngine.framework” 文件夹下的“PrivacyInfo.xcprivacy”。


    <br />
---

## 3.13.1 版本 <a id="3.13.1"></a>

**发布日期： 2024-03-27**

**问题修复**

1. 修复在 Web 平台上使用屏幕共享流推流功能偶现失败的问题

    <br />
---

## 3.13.0 版本 <a id="3.13.0"></a>

**发布日期： 2024-03-21**

**新增功能**

1. 新增视频防抖功能

    注意：

    - 该功能仅支持在视频内部采集时使用、仅支持在 iOS 平台开发使用。

    - 开启本功能后，画面可能会出现延迟、或被裁切的情况，请酌情使用。

    新增视频防抖功能，在进行视频内部采集时，设置相机的稳定模式，降低拍摄抖动造成的影响，提高视频采集质量。

    相关 API 请参考 [setCameraStabilizationMode](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePublisher/setCameraStabilizationMode.html)

2. 使用 QUIC 协议进行 CDN 推拉流时，支持 0-RTT 建立连接

    注意：

1. 该功能的安全性与传统方式相比稍低，请酌情使用。

2. 使用该功能时，需要将 ZegoCDNConfig.protocol 设置为 “quic”。

    [ZegoCDNConfig](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoCDNConfig-class.html) 新增 quicConnectMode 属性，开发者在使用 QUIC 协议进行 CDN 推拉流时，可以设置为 QUIC 建连模式（即 quicConnectMode 取值为 1），0-RTT 建立连接，快速启用服务。目前已适配华为、网宿、腾讯等厂商的 CDN 直播产品。

    该功能默认不开启（即 quicConnectMode 默认为 0，表示正常建立连接）。

    相关 API 请参考 [ZegoCDNConfig > quicConnectMode](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoCDNConfig/quicConnectMode.html)

3. 支持设置转推 CDN 的超时时间，用于监控流是否存在

    注意：该功能只在发起转推时生效，转推过程中如果出现断连，SDK 会保持重试逻辑，此时无该回调通知。

    发起转推任务时，支持通过 [addPublishCdnUrl](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePublisher/addPublishCdnUrl.html) 接口，设置转推 CDN 的超时时间，用于监控流是否存在。例如，开发者已经发起转推任务，但该条流还未开始推流，在超过设置的超时时间后，SDK 会返回一个流不存在的回调通知。

    该回调只会通知给转推发起者、而不是推流发起者。如果转推发起者和推流发起者不是同一个用户，建议开发者从服务端发起转推、并接收该通知。

    相关 API 请参考 [addPublishCdnUrl](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePublisher/addPublishCdnUrl.html)

4. 支持回调本地录制的质量数据

    [ZegoDataRecordProgress](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoDataRecordProgress-class.html) 新增 quality 属性，在本地录制过程中，通过该属性回调录制文件的帧率、码率等质量数据。

    相关 API 请参考 [onCapturedDataRecordProgressUpdate](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngine/onCapturedDataRecordProgressUpdate.html)

5. 外部采集支持低照度增强和色彩增强

    注意：外部采集功能和视频前处理功能不能同时使用，否则可能会出现拉流画面异常。

    支持在开启外部采集功能后，分别通过 [setLowlightEnhancement](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePublisher/setLowlightEnhancement.html) 和 [enableColorEnhancement](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePreprocess/enableColorEnhancement.html) 接口，开启低照度增强和色彩增强，对采集画面进行调整，以满足业务需要。

    相关 API 请参考 [setLowlightEnhancement](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePublisher/setLowlightEnhancement.html), [enableColorEnhancement](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePreprocess/enableColorEnhancement.html)

6. 支持 H.265 自动兼容策略

    注意：如需使用该功能，请联系 ZEGO 技术支持。

    房间内有用户不支持 H.265 格式时，支持推流端回退到 H.264 格式重新推流。

**改进优化**

1. 优化媒体推流器的回调通知逻辑

    优化媒体推流器的回调通知逻辑，增加对“不支持的音频采样率”（例如，不支持 24K 的采样率）的错误回调，帮助开发者快速定位问题。

    相关 API 请参考 [onMediaDataPublisherFileClose](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngine/onMediaDataPublisherFileClose.html)

2. 优化色彩增强算法

    优化色彩增强算法，在画面色彩饱和度较高的场景下，相较之前的版本表现更佳。

3. 针对性能较低的 Android 设备，优化应用处于后台时的语音流畅性、及回声消除效果

    注意：如需使用该功能，请联系 ZEGO 技术支持。

4. 针对 KTV 场景，优化 iOS、Android 平台上的蓝牙耳机的人声、伴奏对齐效果，提升 K 歌体验

**问题修复**

1. 修复长时间使用 SDK 未反初始化，导致接口调用耗时异常的问题

2. 修复硬编、硬解时兼容异常，偶现崩溃的问题

3. 修复已知的兼容异常、及空指针的问题

4. 修复 iOS 平台上引擎进行渲染初始化时，偶现状态不正确的问题

    <br />
---

## 3.12.5 版本 <a id="3.12.5"></a>

**发布日期： 2024-02-28**

**问题修复**

1. 修复在 macOS 10.15 的 Safari 13.0.2 版本的浏览器上渲染视频时，出现黑屏的问题

    <br />
---

## 3.12.4 版本 <a id="3.12.4"></a>

**发布日期： 2024-01-18**

**问题修复**

1. 修复 iOS 平台初始化 SDK 时，如果出现网络异常，会偶现 UI 卡顿的问题

2. 修复切换网络时，如果网络异常，极低概率下会出现 UI 卡顿的问题

    <br />
---

## 3.12.3 版本 <a id="3.12.3"></a>

**发布日期： 2024-01-08**

**新增功能**

1. 支持版权音乐插件

    注意：

1. 如需使用该功能，请联系 ZEGO 技术支持。

2. 版权音乐插件包无法单独使用，必须与 Express SDK 搭配使用。

    支持版权音乐功能插件化，当开发者的业务场景仅需更新版权音乐相关的代码时，可以单独集成插件包，无需更新 Express SDK，即可平滑迁移。

2. 支持从客户端获取房间内流列表

    注意：该功能获取的结果为房间内实时流列表；如果房间服务断开连接，获取的结果可能不准确。

    支持开发者从客户端获取房间内的流列表，可以用于处理业务侧的相关逻辑。

    相关 API 请参考 [getRoomStreamList](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngineRoom/getRoomStreamList.html)

3. 支持对转推到 CDN 的音视频流补静音帧

    注意：如需使用该功能，请联系 ZEGO 技术支持。

    支持对转推到 CDN 的音视频流补静音帧，可以用于避免因时间戳不同步、造成的卡顿或音画不同步等问题发生。

4. 媒体播放器支持获取文件的实时帧率

    支持获取当前播放的媒体文件的帧率统计信息，可以用于数据展示、异常监控等。

    相关 API 请参考 [getPlaybackStatistics](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoMediaPlayer/getPlaybackStatistics.html)

5. 媒体播放器支持在本地缓存网络资源

    支持在本地缓存网络资源，如果需要播放同一个网络资源时，将优先使用缓存数据，提升用户体验。

    相关 API 请参考 [enableLocalCache](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoMediaPlayer/enableLocalCache.html), [onMediaPlayerLocalCache](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngine/onMediaPlayerLocalCache.html)

**问题修复**

1. 修复部分 Android 机型在开启超分能力后，在运动时画面出现条纹的问题

2. 修复部分 Android 机型在外部滤镜混合模式下，销毁 GPU 资源时产生内存泄漏的问题

3. 修复部分 Android 机型拉流渲染会出现卡死的问题

4. 修复个别 Android 设备播放采样率超过 48K 的音视频时，必现崩溃的问题

5. 修复 iOS 平台调用 [enableAudioCaptureDevice] 接口时偶现崩溃的问题

    <br />
---


## 3.11.0 版本 <a id="3.11.0"></a>

**发布日期： 2023-12-15**

**新增功能**

1. 支持云端高清低码能力

    注意：如需使用该功能，请联系 ZEGO 商务人员。

    通过在云端转码服务中应用领先的编解码算法、以及其他视频前处理能力，持续优化视频播放的清晰度与流畅度，显著提升画质。该功能适用于以下场景：

    - 观看量较大的秀场直播等场景。在保证视频流畅性和高质量的同时，节约带宽成本；同等主观画质下，能够降低 30% 左右的码率。

    - 视频内容更复杂、色彩和纹理细节更丰富的弹幕游戏直播、体育直播等场景。同等拉流码率条件下，实现更高清的观看体验。

    相关 API 请参考 [ZegoMixerOutputVideoConfig > enableLowBitrateHD](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoMixerOutputVideoConfig/enableLowBitrateHD.html)

2. 推流视频支持色彩增强

    针对各种摄像头等设备采集到的画面色彩偏灰、或饱和度偏低的情况，支持在保护人体肤色的同时，增强画面色彩，使其更加鲜艳明亮，更符合人眼真实的视觉感受，详情请参考 [推流视频增强](https://doc-zh.zego.im/article/18929)。

    相关 API 请参考 [enableColorEnhancement](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePreprocess/enableColorEnhancement.html)

3. 所有网络请求支持 IPv6 协议

4. 房间实时消息支持发送透传消息

    支持向指定的客户端或客户服务器发送房间实时消息；消息类型分为 “普通消息”、“有序消息”，其中后者保证严格按照顺序接收消息。该功能适用于主播需要管理房间内的麦位等场景中，例如：

    - 通过主播客户端，向需要闭麦的用户发送消息，接到消息的客户端进行闭麦。

    - 主播希望将某用户踢出房间时，通过主播客户端，向对方的客户服务器发送消息、并踢出该用户。

    相关 API 请参考 [sendTransparentMessage](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngineIM/sendTransparentMessage.html)

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

    相关 API 请参考 [ZegoAutoMixerTask > minPlayStreamBufferLength](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoAutoMixerTask/minPlayStreamBufferLength.html)

7. 混流支持输入直播协议流

    新增支持将直播流作为输入流，进行混流处理；直播输入流的 URL 支持 RTMP 和 HTTP-FLV 两种协议。该功能适用于将主播连麦的RTC 画面流与云端体育直播流、游戏直播画面流等进行混合，实现游戏或体育直播解说的场景中。

8. 混流支持自定义音频偏移值

    在使用自定义音视频采集功能、且对应的采集源音频延迟不一致的情况下，可以在混流时自定义音频偏移值，从而实现混流输出后的音视频对齐，保证观众端的体验。

    相关 API 请参考 [ZegoMixerInput > advancedConfig](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoMixerInput/advancedConfig.html)

9. 媒体播放器支持回调视频分辨率改变事件

    媒体播放器支持在检测到视频分辨率发生变化时，抛出相关回调通知开发者。该功能适用于推流画面的分辨率存在多次变更，需要调整推流端编码分辨率、拉流端渲染视图大小进行匹配的场景中。

    相关 API 请参考 [onMediaPlayerVideoSizeChanged](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngine/onMediaPlayerVideoSizeChanged.html)

10. 音效播放器支持分别设置推流音量、本地播放音量

    音效播放器支持分别设置推流音量、本地播放音量，保证本端和远端的音量大小都处于合适的区间。

    相关 API 请参考 [ZegoAudioEffectPlayer > setPublishVolume](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoAudioEffectPlayer/setPublishVolume.html), [ZegoAudioEffectPlayer > setPlayVolume](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoAudioEffectPlayer/setPlayVolume.html), [ZegoAudioEffectPlayer > setPublishVolumeAll](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoAudioEffectPlayer/setPublishVolumeAll.html), [ZegoAudioEffectPlayer > setPlayVolumeAll](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoAudioEffectPlayer/setPlayVolumeAll.html)

**改进优化**

1. 优化服务端混流及单流转码能力

    优化服务端混流及单流转码能力，提高编码效率，同等码率下提升 5% 以上的主客观画质。

2. 优化 AEC（回声消除）算法，实现更好的 AEC 效果

3. 优化网络连接策略，提升音视频通话体验

4. 优化前后台切换策略，解决某些特定场景或机型采集静音的问题

5. 优化多端登录逻辑

    用户在 A 设备上登录成功后，A 设备断网；然后使用同一 userID 在 B 设备上登录成功。此时如果 A 设备网络恢复，重连会失败，并抛出 1002086 错误码，提示该 userID 已在其他设备登录。

**问题修复**

1. 修复某些情况下解码导致崩溃的问题


    <br />
---

## 3.10.3 版本 <a id="3.10.3"></a>

**发布日期： 2023-11-20**


**问题修复**

1. 修复移动端休眠检测模块误报，影响到房间重登录、推拉流重试逻辑的问题


    <br />
---


## 3.10.2 版本 <a id="3.10.2"></a>

**发布日期： 2023-11-09**

**问题修复**

1. 修复开启低照度增强后出现黑屏的问题

    <br />
---

## 3.10.0 版本 <a id="3.10.0"></a>

**发布日期： 2023-10-27**

**新增功能**

1. 新增实时 AI 变声功能

    注意：

1. “AI 变声”功能为付费功能，如需申请体验或咨询正式收费标准，请联系 ZEGO 商务人员。

2. 当前官网 SDK 不包含此功能，如有需要，请联系 ZEGO 技术支持特殊编包。

    新增 AI 变声功能，实时通话中的“柯南变声领结”，完美重现目标角色的音色与韵律，同时保留用户的语速、情感、语调，随心所欲切换音色，超低延迟让用户畅享社交语聊、直播、游戏语音等场景，详情请参考 [AI 变声](https://doc-zh.zego.im/article/18595)。

    相关 API 请参考 [createAIVoiceChanger](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngineAIVoiceChanger/createAIVoiceChanger.html), [destroyAIVoiceChanger](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngineAIVoiceChanger/destroyAIVoiceChanger.html)

2. 主体分割的虚拟背景支持使用视频素材

    注意：

1. 当前官网 SDK 不包含此功能，如有需要，请联系 ZEGO 技术支持特殊编包。

2. 虚拟背景的视频填充方式为居中及等比例缩放，视频过大时，超出部分会被裁减。

    使用主体分割功能时，虚拟背景支持使用视频素材，视频素材的最终帧率会与编码帧率保持一致，且循环播放。视频素材的限制说明，请参考 [主体分割](https://doc-zh.zego.im/article/17918)。

    相关 API 请参考 [enableVideoObjectSegmentation](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePublisher/enableVideoObjectSegmentation.html)

3. 媒体播放器支持伴奏音质增强

    媒体播放器支持伴奏音质增强，提升伴奏的音质以及现场的氛围感，适用于语聊房、K 歌等场景中。

    相关 API 请参考 [enableLiveAudioEffect](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoMediaPlayer/enableLiveAudioEffect.html)

4. 支持获取并上传音频的 Dump 文件

    注意：由于音频 Dump 文件属于用户的隐私敏感数据，因此开发者实现该能力时，请务必认真阅读 [《即构隐私政策》](https://www.zego.im/privacy) 中关于 “使用音频 Dump 功能” 的内容。此外，在收集音频 Dump 文件时，请在获得用户授权同意时，同步注明 Express SDK 收集目的。

    支持将处理前后的音频数据保存下来并上传，用于定位音频相关问题、提高问题排查效率、缩短接入时间，详情请参考 [如何获取、上传音频的 Dump 文件？](https://doc-zh.zego.im/faq/How_to_get_audio_dump_upload)

    相关 API 请参考 [startDumpData](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngineUtilities/startDumpData.html), [stopDumpData](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngineUtilities/stopDumpData.html), [uploadDumpData](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngineUtilities/uploadDumpData.html), [removeDumpData](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngineUtilities/removeDumpData.html), [onRequestDumpData](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngine/onRequestDumpData.html), [onStartDumpData](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngine/onStartDumpData.html), [onStopDumpData](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngine/onStopDumpData.html), [onUploadDumpData](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngine/onUploadDumpData.html)

5. 自定义视频采集支持透明通道传输

    支持提取、编码和传输开发者自定义采集的 RGBA 通道中的 Alpha 通道数据，从而在拉流端渲染出透明背景的主体，实现更加沉浸、真实的视频场景。

    相关 API 请参考 [enableAlphaChannelVideoEncoder](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePublisher/enableAlphaChannelVideoEncoder.html)

**改进优化**

1. 优化低照度增强功能，自动模式下更加平滑

    在低照度增强的自动模式下，亮度的动态调整将更加流畅平滑，提升用户视觉体验。

    相关 API 请参考 [setLowlightEnhancement](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePublisher/setLowlightEnhancement.html)

2. 优化网络测速的期望推、拉流码率上限

    优化网络测速的期望推、拉流码率上限，提升至 15M。开发者可以在推拉流前，检查音视频质量与当前网络的匹配程度，以保证通话质量稳定。

    相关 API 请参考 [startNetworkSpeedTest](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngineUtilities/startNetworkSpeedTest.html)

3. 优化拉流时，接收远端用户音视频数据的 [muteAll] 接口逻辑

    注意：新增接口 [muteAllPlayAudioStreams](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePlayer/muteAllPlayAudioStreams.html)、[muteAllPlayVideoStreams](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePlayer/muteAllPlayVideoStreams.html) 与旧接口 [muteAllPlayStreamAudio](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePlayer/muteAllPlayStreamAudio.html)、[muteAllPlayStreamVideo](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePlayer/muteAllPlayStreamVideo.html) 之间不能混用。

    新增接口 [muteAllPlayAudioStreams](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePlayer/muteAllPlayAudioStreams.html)、[muteAllPlayVideoStreams](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePlayer/muteAllPlayVideoStreams.html) 接口，用于在拉流时接收所有远端用户的音视频数据；同时支持通过 [mutePlayStreamAudio](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePlayer/mutePlayStreamAudio.html)、[mutePlayStreamVideo](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePlayer/mutePlayStreamVideo.html) 接口，单独控制指定的流的接收状态。

    旧接口 [muteAllPlayStreamAudio](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePlayer/muteAllPlayStreamAudio.html)、[muteAllPlayStreamVideo](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePlayer/muteAllPlayStreamVideo.html) 调用后，无法单独控制指定流的接收状态。

    相关 API 请参考 [muteAllPlayAudioStreams](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePlayer/muteAllPlayAudioStreams.html), [muteAllPlayVideoStreams](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePlayer/muteAllPlayVideoStreams.html), [mutePlayStreamAudio](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePlayer/mutePlayStreamAudio.html), [mutePlayStreamVideo](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePlayer/mutePlayStreamVideo.html)

4. 媒体播放器支持仅播放视频或音频，不额外消耗解码性能

    注意：播放过程中，如果修改了媒体流类型，会在下一次播放时生效。

    使用媒体播放器播放音视频文件时，支持通过 [setPlayMediaStreamType](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoMediaPlayer/setPlayMediaStreamType.html) 接口，设置为“仅播放音频” 或“仅播放视频”，不消耗音视频解码性能。

    相关 API 请参考 [setPlayMediaStreamType](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoMediaPlayer/setPlayMediaStreamType.html)

**问题修复**

1. 修复拉流时，偶现无声音的问题

2. 修复多房间断网的异常情况下，多次调用 [logoutRoom]、[loginRoom] 接口，导致后续登录房间失败的问题

3. 修复房间重连失败的情况下，可能出现频繁重试的问题

    <br />
---

## 3.9.0 版本 <a id="3.9.0"></a>

**发布日期： 2023-09-18**

**新增功能**

1. 屏幕采集支持系统 WGC 采集

    注意：该功能需要 Windows 10.18362 或以上版本。

    多源采集模块在进行屏幕采集时，支持系统 WGC（Windows Graphics Capture）采集，且默认使用该模式，采集效率更高。

2. 屏幕采集支持设置推流区域

    多源采集模块在进行屏幕采集时，支持用户设置独立的预览和推流区域。

    相关 API 请参考 [updatePublishRegion](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoScreenCaptureSource/updatePublishRegion.html)

3. 新增附带时间戳的 SEI 回调

    相关 API 请参考 [onPlayerRecvMediaSideInfo](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngine/onPlayerRecvMediaSideInfo.html)

4. 单流转码功能支持 RTC 拉流

    注意：

1. 如需使用该功能，请联系 ZEGO 技术支持。
2. 转码会造成额外的延迟，不建议您在使用 RTC 拉流的麦上场景中使用该功能。

    RTC 拉流时，支持通过预设的转码模板触发单流转码任务，输出不同分辨率的转码流，详情请参考 [单流转码](https://doc-zh.zego.im/article/18303)。

    该功能可用于直播等场景中，观众可以基于网络质量、终端设备等，选择不同分辨率的流进行观看，确保播放的流畅性。

    相关 API 请参考 [ZegoPlayerConfig > codecTemplateId](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoPlayerConfig/codecTemplateID.html)

5. 支持抛出 [setDummyCaptureImagePath] 异常回调

    相关 API 请参考 [onPublisherDummyCaptureImagePathError](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngine/onPublisherDummyCaptureImagePathError.html)

6. 直推 CDN 支持在推流过程中更新 CDN 地址

    相关 API 请参考 [enablePublishDirectToCdn](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngine/onPublisherDummyCaptureImagePathError.html)

7. 支持均衡型 AI 降噪模式

    注意：当前官网 SDK 不包含此功能，如有需要，请联系 ZEGO 技术支持特殊编包。

    支持均衡型 AI 降噪模式，与原有模式相比，在相同的人声保真效果前提下，噪音抑制效果明显提升，可以达到干净无噪音或不扰人的程度；但性能消耗稍微增加。适用于街道、马路、市场等较为嘈杂（信噪比低）的户外环境中，详情请参考 [场景化 AI 降噪](https://doc-zh.zego.im/article/16877)。

    相关 API 请参考 [ZegoANSMode > ZegoANSModeAIBalanced](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoANSMode.html)

**改进优化**

1. 优化 [setLogConfig] 接口

    扩大 [setLogConfig](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngine/setLogConfig.html) 接口的生命周期为 App 生命周期，且优先级高于 [setEngineConfig](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngine/setEngineConfig.html) 接口中的配置。

    相关 API 请参考  [setLogConfig](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngine/setLogConfig.html)、[setEngineConfig](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngine/setEngineConfig.html)

2. 优化 App 休眠时的重试规则

    优化 App 休眠时的重试规则，登录房间和推拉流过程中，“App 休眠时间”也计入“最大允许重试时间”。

**问题修复**

1. 修复音频外部采集模块切换音源时，会导致无声的问题

2. 修复通过 [setPublishWatermark](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePublisher/setPublishWatermark.html) 设置水印路径超过最大长度时，没有抛出错误信息的问题

3. 修复发送流新增时，极小概率出现失败的问题

4. 修复音效播放器偶现崩溃的问题

5. 修复调用 [sendAudioSideInfo](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePublisher/sendAudioSideInfo.html) 接口发送音频次要消息，接收端 10s 左右才能收到消息的问题

6. 修复网宿 CDN 在直推情况下，停推 TCP 断连耗时固定为 500 ms 的问题

    <br />
---

## 3.8.1 版本 <a id="3.8.1"></a>

**发布日期： 2023-08-18**

**新增功能**

1. 新增支持“智能云代理”模式

    注意：如需使用该功能，请联系 ZEGO 技术支持。

    开发者设置“智能云代理”模式后，在 RTC 或 L3 拉流时，会优先使用直连网络模式进行尝试。如果直连网络不可用、且当前是蜂窝网络，则继续留在直连模式重试；如果直连网络不可用、且当前是非蜂窝网络，则切到云代理模式，详情请参考 [云代理](https://doc-zh.zego.im/article/18185)。

2. 支持抛出编码和硬件解码的低帧率告警

    注意：如需使用该功能，请联系 ZEGO 技术支持。

    新增支持抛出编码和硬件解码的低帧率告警回调，在 1v1 聊天、直播等场景中，开发者可基于该回调，实现调整推流分辨率、触发转码等操作。

    相关 API 请参考 [onPlayerLowFpsWarning](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngine/onPlayerLowFpsWarning.html), [onPublisherLowFpsWarning](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngine/onPublisherLowFpsWarning.html)

3. 媒体播放器支持设置网络资源的 Http Headers

    媒体播放器支持设置网络资源的 Http Headers，开发者可基于该配置，自定义限定网络资源的访问方式，加强资源的安全防护。

    相关 API 请参考 [setHttpHeader](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoMediaPlayer/setHttpHeader.html)

4. 游戏语音支持配置 3D 音效距离的衰减范围、以及单条流的发声范围

    在游戏语音场景中：

    - 支持通过 [setAudioReceiveRange](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoRangeAudio/setAudioReceiveRange.html) 接口，设置 3D 音效距离的衰减范围区间 [min, max]。距离小于 min 时，音量不会随着距离的增加而衰减；距离大于 max 时，将无法听到对方的声音。
    - 支持通过 [setStreamVocalRange](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoRangeAudio/setStreamVocalRange.html) 接口，设置单条流的发声范围区间 [min, max]。

5. 支持按推流通道回调相关的事件活动

    [onPublisherSendAudioFirstFrame](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngine/onPublisherSendAudioFirstFrame.html) 回调函数，新增通道 channel 参数，支持多通道监听推流发送首帧信息。

    相关 API 请参考 [onPublisherSendAudioFirstFrame](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngine/onPublisherSendAudioFirstFrame.html)

**改进优化**

1. 优化低照度增强算法的噪点表现

2. 优化媒体播放器加载资源的 URL 长度，最大支持 2048 字节

3. 优化媒体播放器 SEI 信息与相应帧数据的回调同步，保证 SEI 和画面的一致性

**问题修复**

1. 修复带 B 帧的 H.265 RTMP 流出现硬解卡顿的问题

2. 修复使用 Token 鉴权时，在 [createEngine] 之后、[destroyEngine] 之前变更了 userID，可能导致推拉流失败的问题

**废弃删除**

1. 废弃了一些 API 接口

    在 3.8.1 版本，对以下 API 接口进行废弃变更。

    - 废弃了原有的 [onPublisherSendAudioFirstFrame] 回调接口，替换为同名的 [onPublisherSendAudioFirstFrame](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngine/onPublisherSendAudioFirstFrame.html) 回调，并新增通道 channel 参数，支持按推流通道回调相关的事件活动。
    - [ZegoRangeAudio](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoRangeAudio-class.html) 类的成员函数：
        - 废弃了原有的 [setAudioReceiveRange] 接口，替换为同名的 [setAudioReceiveRange](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoRangeAudio/setAudioReceiveRange.html) 接口，并扩展参数 [ZegoReceiveRangeParam](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoReceiveRangeParam-class.html) 类型，支持设置范围语音的音频接收范围。
        - 废弃了原有的 [setStreamVocalRange] 接口，替换为同名的 [setStreamVocalRange](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoRangeAudio/setStreamVocalRange.html) 接口，并扩展参数 [ZegoVocalRangeParam](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoVocalRangeParam-class.html) 类型，支持设置范围语音的单条流发声范围。

    API 接口变更后可能存在兼容性问题，详情请参考 [3.8.1 及以上版本升级指南](https://doc-zh.zego.im/article/18184)。

    <br />
---

## 3.7.0 版本 <a id="3.7.0"></a>

**发布日期： 2023-07-28**


**新增功能**

1. 开启视频大小流编码后，除大流的视频参数外，新增支持设置小流的视频参数

    注意：

1. 使用此功能前，需要先调用 [setVideoConfig](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePublisher/setVideoConfig.html) 接口，指定视频编码格式 codecID 为 “ZegoVideoCodecIDH264DualStream（大小流编码）”。

2. 设置大流、小流的分辨率的 “比例” 需要保持一致，否则调用接口会出错。

    在指定编码格式为 “大小流编码” 的情况下，支持分别设置大流和小流的分辨率、帧率和码率，详情请参考 [视频大小流和分层编码](https://doc-zh.zego.im/article/18031)。

    相关 API 请参考 [ZegoExpressEngine > setVideoConfig](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePublisher/setVideoConfig.html), [setPublishDualStreamConfig](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePublisher/setPublishDualStreamConfig.html)

2. 新增屏幕采集区域发生变化时的回调通知

    新增屏幕采集区域发生变化时的回调通知 [onRectChanged](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngine/onRectChanged.html)。在开始屏幕采集后，当采集区域发生变化时，SDK 会通过此回调通知开发者，开发者通过监听此回调，可以修改预览画面大小等配置。

    相关 API 请参考 [onRectChanged](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngine/onRectChanged.html)


**改进优化**

1. 优化 SDK 内部逻辑，减少 400KB ~ 600KB 的内存占用

2. 优化 SDK 视频采集策略，提升画质

3. 在断网导致的推拉流重试状态中，支持回调本地网络质量

    相关 API 请参考 [onNetworkQuality](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngine/onNetworkQuality.html)

4. 支持在调用 [destroyEngine](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngine/destroyEngine.html) 接口后，生成日志上传任务

    相关 API 请参考 [submitLog](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngine/submitLog.html)

5. 优化 SDK 的内部逻辑，提升弱网环境下的通话体验

**问题修复**

1. 修复 metal 上屏渲染时会偶现卡死的问题

2. 修复 MediaRecorder、AudioObserver 停止推流后，未恢复本地推流，继续采集的问题

3. 修复 NetMonitor 模块多线程死锁的问题


    <br />
---

## 3.6.1 版本 <a id="3.6.1"></a>

**发布日期： 2023-07-03**

**问题修复**

1. 修复调用 [setRoomExtraInfo](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngineRoom/setRoomExtraInfo.html) 接口直接报错的问题

    <br />
---

## 3.6.0 版本 <a id="3.6.0"></a>

**发布日期： 2023-06-21**

**新增功能**

1. 新增支持背景虚化、虚拟背景功能

    注意：当前官网 SDK 不包含此功能，如有需要，请联系 ZEGO 技术支持特殊编包。

    在实景或绿幕场景中，开发者可以通过该功能对用户的背景进行虚化模糊处理，或替换为自定义图片背景，详情请参考 [主体分割](https://doc-zh.zego.im/article/17918)。

    该功能可用于视频会议、1v1 音视频通话等场景中，帮助用户更好的保护个人隐私，以及提升通话的趣味性。

    相关 API 请参考 [enableVideoObjectSegmentation](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePublisher/enableVideoObjectSegmentation.html)

2. 屏幕采集功能支持采集系统音频

    屏幕采集功能在仅支持采集图像的基础上，增加了采集系统音频的能力，从而实现共享演示课件画面的同时，共享正在播放的音乐。该功能可用于在线教学、游戏直播等场景中。

    相关 API 请参考 [startCapture](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoScreenCaptureSource/startCapture.html)


3. 新增 Enhanced KTV 混响效果

    新增增强型 KTV 混响效果，实现更集中、亮度更好的 KTV 人声效果。与之前的 KTV 混响音效相比，Enhanced KTV 混响效果缩短了混响时长，提高了干湿比。

    原有的 KTV 混响音效仅适用于人声瑕疵较为明显的用户，增强型 KTV 混响效果适用于大多数专业用户和普通用户。

    相关 API 请参考 [setReverbPreset](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePreprocess/setReverbPreset.html)

4. 游戏语音功能支持媒体播放器&音效播放器使用 3D 音效

    开发者可以通过设置媒体播放器、音效播放器的位置和朝向，实现本地音频、在线音频资源的 3D 音效。该功能可用于在虚拟场景中设置物品的音效、以及指定位置的背景音乐等。

    相关 API 请参考 [ZegoMediaPlayer > updatePosition](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoMediaPlayer/updatePosition.html), [ZegoAudioEffectPlayer > updatePosition](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoAudioEffectPlayer/updatePosition.html)

5. 媒体播放器支持获取媒体流视频信息

    针对媒体播放器正在播放的视频文件，开发者可以主动获取视频的分辨率、帧率等信息。

    相关 API 请参考 [getMediaInfo](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoMediaPlayer/getMediaInfo.html)

6. 媒体播放器倍速功能最大支持 4 倍速

    媒体播放器倍速的上限提升到 4 倍速。例如，用户在播放音视频文件时，如果已设置为 2 倍速播放，长按屏幕时可以加速至 4 倍速。

    相关 API 请参考 [ZegoMediaPlayer > setPlaySpeed](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoMediaPlayer/setPlaySpeed.html)

7. 媒体播放器支持边下载、边回调数据解密、边播放的功能

    针对在线播放器的版权音乐保护，媒体播放器支持边下载边回调未解密的二进制数据，由开发者解密后再传回媒体播放器播放，过程中不会产生文件或缓存文件。

    相关 API 请参考 [ZegoMediaPlayer > enableBlockData](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoMediaPlayer/enableBlockData.html)

**改进优化**

1. 调整 [ZegoScreenCaptureConfig](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoScreenCaptureConfig-class.html) 类中的 applicationVolume 和 microphoneVolume 字段变成可选字段，扩大 SDK 的多端兼容性

**问题修复**

1. 修复使用媒体播放器时可能会导致内存泄露的问题

2. 修复开启自定义视频前处理时，自定义视频采集、自定义视频渲染函数无法结束的问题

    <br />
---

## 3.5.0 版本 <a id="3.5.0"></a>

**发布日期： 2023-05-19**

**新增功能**

1. 新增音视频推流的首帧回调

    在进行音视频推流时，通过 [onPublisherSendAudioFirstFrame](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngine/onPublisherSendAudioFirstFrame.html)、[onPublisherSendVideoFirstFrame](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngine/onPublisherSendVideoFirstFrame.html) 回调，监听“首帧音频”或“首帧视频”的发布时机。该功能可用于统计音视频推流的耗时、或更新 UI 表现等。

    相关 API 请参考 [onPublisherSendAudioFirstFrame](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngine/onPublisherSendAudioFirstFrame.html), [onPublisherSendVideoFirstFrame](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngine/onPublisherSendVideoFirstFrame.html)

2. 媒体播放器支持音视频渲染完成后的首帧回调

    在通过媒体播放器进行音视频渲染时，通过 [onMediaPlayerFirstFrameEvent](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngine/onMediaPlayerFirstFrameEvent.html) 回调，监听渲染完成后的“首帧音频”或“首帧视频”的发布时机。该功能可用于音视频渲染的耗时、或更新 UI 表现等。

    相关 API 请参考 [onMediaPlayerFirstFrameEvent](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngine/onMediaPlayerFirstFrameEvent.html)

3. 外部采集支持主动偏移 NTP 时间戳

    注意：如需使用该功能，请联系 ZEGO 技术支持。

    使用外部采集功能时，支持通过实验性 API 接口主动偏移 NTP 时间戳。该功能可用于 KTV 的合唱、伴奏、歌词对齐等场景。

4. 多房间模式下支持快速切换房间

    多房间模式下，支持通过 [switchRoom](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngineRoom/switchRoom.html) 接口，快速便捷地实现切换房间的功能。

    相关 API 请参考 [switchRoom](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngineRoom/switchRoom.html)

**改进优化**

1. 大幅度降低华为机型设备的视频硬解耗时时长

    注意：如需使用该功能，请联系 ZEGO 技术支持。

    针对华为机型设备，SDK 支持通过相关配置，降低 80% 的视频硬解耗时时长。

2. 大幅度减少 SDK 的 iOS 设备内存消耗

    该优化从 3.5.0 版本开始生效，不需要额外接口。

**问题修复**

1. 修复媒体播放器在部分 m3u8 文件格式中，不能通过 seekTo 接口使播放进度跳转到 0 的问题

2. 修复重新推流后，拉流端视频卡顿的偶现问题

3. 修复 Android 内存用量信息不更新的问题

4. 修复 iOS 媒体播放器首次加载文件、前几秒没有画面的偶现问题


    <br />
---

## 3.4.2 版本 <a id="3.4.2"></a>

**发布日期： 2023-04-26**


**新增功能**



1. 支持动态切换流控策略

    支持动态开关流量控制功能，同时支持设置流量控制属性等。

    相关 API 请参考 [enableTrafficControl](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePublisher/enableTrafficControl.html), [setMinVideoBitrateForTrafficControl](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePublisher/setMinVideoBitrateForTrafficControl.html), [setMinVideoFpsForTrafficControl](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePublisher/setMinVideoFpsForTrafficControl.html), [setMinVideoResolutionForTrafficControl](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePublisher/setMinVideoResolutionForTrafficControl.html)

**改进优化**

1. 优化 SDK 内存占用

    删除 SDK 内部一些没必要的内存申请，优化 SDK 内存使用率，相比上个版本，内存使用率减少了 10% 左右。

2. 优化 iOS 屏幕共享的旋转逻辑

    优化屏幕共享的旋转逻辑，规避录屏进程下，旋转引发的内存占用超 50MB 限制导致的崩溃。

**问题修复**

1. 修复游戏语音在某些情况下收听异常的问题

2. 修复 iOS 16.4.1 版本的设备在硬编码推流时，由于视频硬编码率不受控，导致的视频画面模糊的问题


**废弃删除**

1. 从 3.4.2 版本开始，废弃了对 iOS 11.0 以下版本的支持，iOS Deployment Target（最低支持版本）提升到 iOS 11.0

    具体说明，请参考 [App Store submission requirement starts April 25](https://developer.apple.com/news/?id=jd9wcyov) 及 [Xcode 14 Release Notes](https://developer.apple.com/documentation/xcode-release-notes/xcode-14-release-notes#Build-System)。

2. 从 3.4.2 版本开始，iOS SDK 不再支持 32 位 armv7 架构

    具体说明，请参考 [Xcode 14 Release Notes](https://developer.apple.com/documentation/xcode-release-notes/xcode-14-release-notes#Build-System)。


    <br />
---

## 3.3.1 版本 <a id="3.3.1"></a>

**发布日期：2023-03-24**

**问题修复**

1. 修复在部分场景下，Android 硬件耳返失效的问题

2. 修复在部分场景下，Android H265 解码失效的问题


    <br />
---

## 3.3.0 版本 <a id="3.3.0"></a>

**发布日期： 2023-03-20**


**新增功能**

1. 支持外放场景下的人声增强效果

    在外放场景中，设备的麦克风与扬声器过近，容易导致人声模糊或沉闷。在该场景下，人声增强可以有效提升人声清晰度并改善沉闷感，因此在外放场景下，建议开启该功能。

    为实现外放场景下的人声增强效果，可开启人声增强音效并设置增强等级，增强等级推荐配置为 4，可用于 KTV 外放场景下，精细控制人声效果。

    相关 API 请参考 [enableSpeechEnhance](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePreprocess/enableSpeechEnhance.html)

2. 在自定义音频采集和  SDK 内部渲染模式下，支持自适应设备采集渲染延迟和回声消除（AEC）功能

    注意：如需使用该功能，请联系 ZEGO 技术支持。

    在自定义音频采集和 SDK 内部渲染模式下，支持混音自适应对齐和 AEC 功能，可使在实现  KTV 场景下的合唱时，达到更好的效果。

3. 游戏语音支持自定义设置发声模式和收听模式

    游戏语音支持自定义设置发声模式和收听模式，可用于实现加入小队后，需屏蔽非范围内的同一小队玩家的场景，详情请参考 [游戏语音](https://doc-zh.zego.im/article/17180)。

    相关 API 请参考 [setRangeAudioCustomMode](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoRangeAudio/setRangeAudioCustomMode.html)

4. Express SDK iOS 端拉流功能支持画中画能力

    注意：如需使用该功能，请联系 ZEGO 技术支持。

5. 单流转码功能支持 L3 或 CDN 拉流

    注意：通过 CDN 拉取转码流时，必须使用转推 CDN。如需使用该功能，请联系 ZEGO 技术支持。

    单流转码，指在云端把每条原始流转换为不同编码格式、不同分辨率的转码流。拉流时需传入转码模板 ID 拉取转码流。在直播等场景中，观众可以基于接入网络质量、终端设备等，自行选择不同分辨率的流进行观看，以保证播放的流畅性。

6. 同一个混流任务支持输出多个分辨率的视频流

    注意：

    - 目前 1 个混流任务最多支持输出 4 路不同分辨率的视频流，且目前仅支持服务端混流。
    - 如需使用该功能，请联系 ZEGO 技术支持。

    同一个混流任务支持输出多个分辨率的视频流，可用于实现混流场景下的转码需求。

7. 场景化音视频配置新增 [StandardVoiceCall] 标准语音通话场景

    场景化音视频配置新增 [StandardVoiceCall] 标准语音通话场景，适用于 1v1 纯语音通话场景，详情请参考 [场景化音视频配置](https://doc-zh.zego.im/article/17153)。

    相关 API 请参考 [setRoomScenario](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngine/setRoomScenario.html)

**改进优化**

1. 优化超分算法，大幅提升机型覆盖率

    注意：[enableVideoSuperResolution](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePlayer/enableVideoSuperResolution.html) 修改了调用时机，需要在 [initVideoSuperResolution](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePlayer/initVideoSuperResolution.html) 后才能调用，详情请参考 [超分辨率](https://doc-zh.zego.im/article/17179)。

    相关 API 请参考 [enableVideoSuperResolution](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePlayer/enableVideoSuperResolution.html), [initVideoSuperResolution](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePlayer/initVideoSuperResolution.html)

2. 优化超分逻辑，新增初始化、反初始化接口

    注意：[enableVideoSuperResolution](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePlayer/enableVideoSuperResolution.html) 修改了调用时机，需要在 [initVideoSuperResolution](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePlayer/initVideoSuperResolution.html) 后才能调用，详情请参考 [超分辨率](https://doc-zh.zego.im/article/17179)。

    相关 API 请参考 [initVideoSuperResolution](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePlayer/initVideoSuperResolution.html), [uninitVideoSuperResolution](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePlayer/uninitVideoSuperResolution.html)

3. 优化 KTV 场景的回声消除（AEC）效果

    针对 KTV 场景的 AEC 优化，实现了：

    - 大幅度提高外放场景下的人声音质，使人声更保真。
    - 消除回声的同时，有效避免偶现的吞字或人声起伏的现象。

4. 优化 Express SDK iOS 端屏幕共享进程间通信性能

    开发者在应用工程中，通过新增的 `ZegoExpressEngine > setAppGroupID` 及原生层的 `ZegoReplayKitExt > setupWithDelegate:appGroup` 接口，启动 AppGroup 配置，可以获取更好的性能与稳定性。

    相关 API 请参考 [setAppGroupID](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoScreenCaptureSource/setAppGroupID.html)


**问题修复**

1. 修复 Android 插拔耳机后，播放器没有声音的问题

2. 修复不在主进程启动屏幕分享服务时，Android 端屏幕采集失败的问题

3. 修复 Windows 屏幕采集 [getScreenCaptureSources](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngineScreenCapture/getScreenCaptureSources.html) 获取到的数据中 icon 无效，且某些窗口获取不到缩略图的问题

    <br />
---

## 3.2.1 版本 <a id="3.2.1"></a>

**发布日期： 2023-02-24**

**新增功能**

1. Flutter Web 支持使用屏幕共享功能

    Flutter Web 支持使用屏幕共享功能，详情请参考 [屏幕共享](https://doc-zh.zego.im/article/17195)。

    相关 API 请参考 [createScreenCaptureSource](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngineScreenCapture/createScreenCaptureSource.html)、[setAudioSource](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePublisher/setAudioSource.html)、[setVideoSource](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePublisher/setVideoSource.html)

2. Flutter Web 支持使用美颜功能

    Flutter Web 支持使用美颜功能，详情请参考 [推流视频增强 - 基础美颜](https://doc-zh.zego.im/article/18929)。

    相关 API 请参考 [enableEffectsBeauty](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePreprocess/enableEffectsBeauty.html)、[setEffectsBeautyParam](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePreprocess/setEffectsBeautyParam.html)


3. Flutter Web 支持使用多房间功能

    Flutter Web 支持使用多房间功能，详情请参考 [登录多房间](https://doc-zh.zego.im/article/17177)。

    相关 API 请参考 [setRoomMode](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngine/setRoomMode.html)

**问题修复**

1. 修复 [onRemoteSoundLevelUpdate](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngine/onRemoteSoundLevelUpdate.html) 回调会导致异常的问题

2. 修复 iOS 平台 [setSEIConfig](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePublisher/setSEIConfig.html) 接口设置 `SEIType` 没有效果的问题

    <br />
---

## 3.2.0 版本 <a id="3.2.0"></a>

**发布日期： 2023-01-31**


**新增功能**


1. 支持视频大小流功能

    通过视频大小流编码（H.264 DualStream）对视频进行码流分层时，相比较于分层视频编码（H.264 SVC），视频大小流编码（H.264 DualStream）支持使用硬件编码，即 [ZegoVideoCodecID](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoVideoCodecID.html) 新增 `ZegoVideoCodecID.H264DualStream` 字段，详情请参考 [设置视频编码方式](https://doc-zh.zego.im/article/17168)。

    相关 API 请参考 [ZegoVideoCodecID](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoVideoCodecID.html)


**改进优化**

1. 自定义信令配置支持扩展到 4KB

    注意：自定义信令配置默认大小为 1KB，如需扩展到 4KB，请联系 ZEGO 技术支持进行处理。

**问题修复**

1. 修复网络时间模块重试失败的问题

2. 修复 iOS 平台当硬件解码故障后重启时，访问空指针崩溃的问题

3. 修复 Windows 平台硬件编码访问空指针崩溃的问题


    <br />
---


## 3.1.0 版本 <a id="3.1.0"></a>

**发布日期： 2022-12-27**

**新增功能**

1. 支持多源采集能力

    面向在线 KTV、一起看电影、看比赛等、视频会议、在线教育等音视频源丰富多样的互动场景，多源采集提供了灵活易用的音视频采集源与通道管理能力，大量减少开发者的开发及维护成本。

    多源采集能力对屏幕共享、混音等常见能力的实现路径，进行缩短优化及归一化设计，从 3.1.0 版本后，您可以不用再通过自定义采集实现上述复杂的能力，详情请参考 [多源采集文档](https://doc-zh.zego.im/article/17209)。主要能力特性如下：
    - 推流通道支持设置或切换多种音视频源。
    - 支持屏幕共享、混音等常见能力。

2. SDK 支持设置云代理

    注意：如需使用该功能，请联系 ZEGO 技术支持。

    通过设置 SDK 的云代理接口，将 SDK 对应的所有流量通过云端的代理服务器进行中转，实现与 RTC 通信，详情请参考  [云代理文档](https://doc-zh.zego.im/article/18185) 。

    相关 API 请参考 [setCloudProxyConfig](https://doc-zh.zego.im)

**改进优化**

1. 大幅度提升极端弱网地区的音视频连通率，并降低连通耗时

    ZEGO 自研调度系统针对网络质量极差地区进行了深度优化。

**问题修复**

1. 修复发送房间 `Logout` 信令可能失败的问题

2. 修复 iOS 视频硬解故障后，偶现的重启访问空指针崩溃的问题

3. 修复了 Android 因摄像头权限占用问题导致的偶现黑屏问题

4. 修复 Android 音效播放器偶现崩溃的问题

5. 修复 Android 低延迟模式下设备重启的问题


    <br />
---


## 3.0.3 版本 <a id="3.0.3"></a>

**发布日期： 2022-12-06**

<Warning title="注意">



本次更新包含不兼容改动，详情请参考 [3.0.0 及以上版本升级指南](https://doc-zh.zego.im/article/17210)。

</Warning>



**新增功能**

1. 新增视频超分辨率能力

    注意：如需使用该功能，请联系 ZEGO 技术支持。此功能目前只支持 Android 平台和 iOS 平台。

    新增 [enableVideoSuperResolution](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePlayer/enableVideoSuperResolution.html) 接口支持对某一条视频流进行超分辨率处理，从而得到更好的画质。超分辨率，简称超分，是客户端对拉取的视频流的宽和高进行实时倍增处理的技术，例如，从 640x360 超分为 1280x720，详情请参考 [超分辨率](https://doc-zh.zego.im/article/17179) 文档。

    相关 API 请参考 [enableVideoSuperResolution](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePlayer/enableVideoSuperResolution.html), [onPlayerVideoSuperResolutionUpdate](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngine/onPlayerVideoSuperResolutionUpdate.html)

2. 场景化 AI 降噪新增在音乐场景下降噪的能力

    注意：如需使用该功能，请联系 ZEGO 技术支持，此功能目前只支持 Android 平台、iOS 平台、 macOS 平台和 Windows 平台。

    场景化 AI 降噪功能，在之前针对所有非人声进行降噪的基础上，新增支持在音乐场景下的降噪能力，通过识别音乐，智能调整降噪效果还原音乐音质。SDK 会实时对麦克风输入内容进行音乐检测，在声卡、弹唱或近场音乐场景下，自动调整降噪等级，保证音乐的高保真音质，详情请参考 [场景化 AI 降噪](https://doc-zh.zego.im/article/17176) 文档。

3. 新增房间维度的场景 Scenario

    为方便开发者快速接入，降低开发者接入门槛，SDK 提供多种预设场景。开发者可根据所需场景，选择对应的房间模式 [ZegoScenario](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoScenario.html)，SDK 将自动应用适合该场景的音视频编解码器、音视频参数、流控策略等配置，从而快速实现该场景下的最佳效果。

    当前支持场景包括秀场直播、KTV、标准 1v1 音视频通话、高画质 1v1 音视频通话、标准语聊房、高音质语聊房（Web 端暂不支持高品质语聊房场景及 KTV 场景），详情请参考 [场景化音视频配置](https://doc-zh.zego.im/article/17153) 文档。

    相关 API 请参考 [setRoomScenario](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngine/setRoomScenario.html)


4. 支持获取当前设备指定视频编解码器的编解码能力支持情况

    注意：接口增加可选参数 `codecBackend`。返回值更改为 int 类型；0 表示不支持，不可以使用该编码格式进行推流；1 表示支持，可以使用该编码格式进行推流；2 表示未确认，建议稍后再调用本接口，此功能目前只支持 Android 平台、iOS 平台、 macOS 平台和 Windows 平台。

    SDK 支持获取当前设备指定视频编解码器的编解码模式的支持情况，从而更好的帮助开发者选择使用的编码器及编码模式并获得更好的效果。

    - 通过 [isVideoEncoderSupported](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePublisher/isVideoEncoderSupported.html) 接口，可获取当前编码器的硬件或软件编码支持情况。
    - 通过 [isVideoDecoderSupported](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePlayer/isVideoDecoderSupported.html) 接口，可获取当前解码器的硬件或软件解码支持情况，以上两个接口均包含三个枚举值：支持硬件或软件，支持硬件，支持软件。

    例如，ZegoExpressEngine.instance.isVideoEncoderSupported(ZegoVideoCodecID.H265, codecBackend: ZegoVideoCodecBackend.Hardware)，即表示检查当前设备是否支持 H265 的硬编，若支持，则返回 1。

    相关 API 请参考 [isVideoEncoderSupported](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePublisher/isVideoEncoderSupported.html), [isVideoDecoderSupported](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePlayer/isVideoDecoderSupported.html)

5. 新增获取 GPS 信息开关接口

    注意：该功能默认开启，如需关闭该功能，请联系 ZEGO 技术支持，此功能目前只支持 Android 平台、iOS 平台、 macOS 平台和 Windows 平台。

    在 App 有获取地理位置权限的情况下，开发者可以选择是否允许 ZEGO SDK 获取系统缓存的 GPS 信息，默认进行获取。当开发者希望关闭该功能时，需要联系 ZEGO 技术支持进行设置。

6. 新增基于摄像头打开后的视频首帧回调

    注意：此功能目前只支持 Android 平台、iOS 平台、 macOS 平台和 Windows 平台。

    支持每次开启远端摄像头后，SDK 拉流并渲染完第一帧远端摄像头视频数据后进行回调，开发者可利用该回调统计首帧耗时，或更新播放流的 UI 组件。

    相关 API 请参考 [onPlayerRenderCameraVideoFirstFrame](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngine/onPlayerRenderCameraVideoFirstFrame.html)

7. Web 平台拉流接口增加 CDN、 CDN Plus 拉流配置项

    注意：若希望通过地区、用户等更多维度，从云端控制拉流方式，请联系 ZEGO 技术支持进行相关配置。

    Web 平台拉流接口新增 CDN、 CDN Plus 的拉流资源模式（ZegoStreamResourceMode），开发者可按流维度自行开启使用 CDN、 CDN Plus 拉流。

    CDN Plus 流是比 CDN 拉流直播质量更高，但是价格接近 CDN 的一种性价比高的拉流方式。

    相关 API 请参考 [startPlayingStream](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePlayer/startPlayingStream.html)


**改进优化**

1. 针对 1v1 纯 RTC 通话场景进行优化

    注意：如需使用该功能，请联系 ZEGO 技术支持。

    针对 1v1 通话场景进行了优化，适用在纯 RTC 场景下使用。

2. 优化空间音频功能

    对空间音频能力进行了优化，用户可以区分前后音源，从而达到更好的沉浸感。

3. 优化采集音量过大会造成破音的情况

    优化 AGC 自动增益控制算法，当采集音量过大时，不会造成破音情况。

4. 优化极端弱网下的音视频体验

    SDK 优化了内部策略，在音视频的场景下，支持最小下行 50 kbps 拉流不卡顿，保障更好的极端弱网下的体验。



**问题修复**

1. 修复了 Mac M1 芯片电脑在部分系统版本下，Web 端开启硬件编码推流，并采用多 SPS（Sequence Paramater Set，又称序列参数集）、PPS（Picture Paramater Set，又称图像参数集）的输出形式 ，Native SDK 拉流会出现解码花屏的问题

2. 修复了网络状态从有网络切换到无网络时，当前正在上传的日志有可能出现崩溃的问题

3. 修复了 GetCallbackController 非线程安全的问题​

4. 修复 Android 系统下，反复启停摄像头造成的 SDK 崩溃的问题

5. 修复了 SDK 在没有 View 的情况下，没有触发 [onPlayerRenderVideoFirstFrame](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngine/onPlayerRenderVideoFirstFrame.html) 的问题

6. 修复了iOS、windows、macOS 使用 texture 模式渲染时画面缩放异常问题

7. 修复 iOS 硬件解码失效的问题

8. 修复多房间模式下，停止推流时，房间内其他人收不到流删除通知的问题

9. 修复 iOS、macOS、Windows 平台硬件解码可能会崩溃的问题

10. 修复 Android 平台 [onNetworkQuality](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngine/onNetworkQuality.html) 接口不回调的问题


**废弃删除**

1. 废弃了 [ZegoScenario] 的三种旧版本场景
    废弃 [ZegoScenario](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoScenario.html) 场景枚举中的 `General`，`Communication`， `Live` 三种场景，详情请参考 [场景化音视频配置](https://doc-zh.zego.im/article/17153) 文档。

2. 删除了 `setDebugVerbose`、`setPlayStreamVideoLayer`、`enableAudioDataCallback` 等接口，详情请参考 [3.0.0及以上版本升级指南](https://doc-zh.zego.im/article/17210)。





    <br />
---
