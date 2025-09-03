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
      2. 仅对开启屏幕采集的 [startCapture] 接口生效，对更新屏幕采集的 [updateScreenCapture](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoScreenCaptureSource/updateScreenCaptureConfig.html) 接口没有作用。
      3. 采集过程中音频设备模式发生变化导致屏幕采集音频输出异常，可以通过 [onMobileScreenCaptureExceptionOccurred] 回调监听 AudioDeviceException，如有必要，需要重启采集。
      4. 停止采集后会恢复采集之前的音频设备模式。
    </Warning>

    相关 API 请参考：[startCapture](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoScreenCaptureSource/startCapture.html)、[updateScreenCaptureConfig](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoScreenCaptureSource/updateScreenCaptureConfig.html)



7. 半自动混流支持混流对齐能力

    相关 API 请参考：[ZegoAutoMixerTask](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoAutoMixerTask-class.html)

8. 媒体播放器实例个数限制放开至 10 个

    详细请参考 [媒体播放器](/real-time-voice-flutter/other/media-player)。

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


**问题修复**

1. 修复了同时异步调用 startPreview 和  startPublish 时重复采集摄像头导致结束推流时摄像头没有正常被释放的问题。


2. 修复 eventChannel 重复注册 zego_express_event_handler 数据在回调处理时出现错误提示的问题。


3. 修复远端设备状态回调报错没有触发 onRemoteCameraStateUpdate、onRemoteMicStateUpdate 事件。


4. 修复纯音频场景的摄像头权限弹框问题。


5. 修复 startPlayingStream 接口不传入视图容器参数无法拉流的问题。

---


## 3.21.0 版本 <a id="3.21.0"></a>

**发布日期： 2025-06-12**


**新增功能**

1. 支持自定义 CDN 拉流超时等待时间

    <Warning title="注意">

    如需使用本功能，请联系 ZEGO 技术支持。

    </Warning>



    针对从 CDN 拉流超时等待过长，导致用户实际体验不佳的情况，SDK 对 CDN 拉流内部超时逻辑优化，降低超时等待时长。此外，SDK 支持开发者自定义拉流超时时间。

2. 支持推流时设置直播标题

    若要在直播列表等场景展示直播标题，SDK 支持开发者在主播调用 [startPublishingStream](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePublisher/startPublishingStream.html) 接口开始推流前，通过 [ZegoPublisherConfig](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoPublisherConfig-class.html) 中的 streamTitle 参数配置标题。

    相关 API 请参考 [startPublishingStream](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePublisher/startPublishingStream.html), [ZegoPublisherConfig > streamTitle](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoPublisherConfig/streamTitle.html)

3. 媒体播放器新增有关资源文件权限的错误码

    优化媒体播放器的回调通知逻辑，针对“播放资源无权限”的错误新增错误码 1008015，帮助开发者快速定位问题。

    相关 API 请参考 [onMediaPlayerStateUpdate](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngine/onMediaPlayerStateUpdate.html)

**改进优化**

1. 更新 libvpx 版本

    为提升 SDK 安全质量，第三方库 libvpx 已升级至 1.13.1 版本。

2. 降低登录和推拉流等操作的耗时

    优化 SDK 调度逻辑，降低登录、推拉流耗时，提升用户秒开体验。

3. 优化双声道音频编码

    <Warning title="注意">
    如需使用本功能，请联系 ZEGO 技术支持。
    </Warning>



    优化特定场景下双声道音频编码效率：在保证相同音质的前提下，降低音频码率，减轻用户带宽消耗，提升播放流畅度与体验。

4. 优化房间流补充增强信息发送表现

    当房间流补充增强信息发送失败时，SDK 会在流的生命周期内重试直至发送成功，提升房间流补充增强信息可靠性。



---

## 3.20.5 版本 <a id="3.20.5"></a>

**发布日期： 2025-05-13**

**新增功能**

1. Web 平台补齐更多功能

    | 功能 | API |
    | --- | --- |
    | 获取与设置音频参数 | <ul><li>[getAudioConfig](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePublisher/getAudioConfig.html)</li><li>[setAudioConfig](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePublisher/setAudioConfig.html)</li></ul> |
    | 地理围栏 | [setGeoFence](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngine/setGeoFence.html) |
    | 云代理 | [setCloudProxyConfig ](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngine/setCloudProxyConfig.html) |
    | 设置推流端采集音量 | [setCaptureVolume](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePublisher/setCaptureVolume.html) |
    | 转推至 CDN | <ul><li>[addPublishCdnUrl](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePublisher/addPublishCdnUrl.html)</li><li>[removePublishCdnUrl](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePublisher/removePublishCdnUrl.html)</li></ul> |
    | 动态切换流控策略 | <ul><li>[enableTrafficControl](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePublisher/enableTrafficControl.html)</li><li>[setMinVideoBitrateForTrafficControl](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePublisher/setMinVideoBitrateForTrafficControl.html)</li><li>[setTrafficControlFocusOn](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePublisher/setTrafficControlFocusOn.html)</li></ul> |
    | 设置拉流音量 | <ul><li>[setPlayVolume](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePlayer/setPlayVolume.html)</li><li>[setAllPlayStreamVolume](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePlayer/setAllPlayStreamVolume.html)</li></ul><Note title="说明">不支持设置超过 100，超过按 100 处理。</Note>|
    | 拉流是否接收所有音频数据 | [muteAllPlayAudioStreams](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePlayer/muteAllPlayAudioStreams.html) |
    | 实时有序数据 | <ul><li>[createRealTimeSequentialDataManager](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngineIM/createRealTimeSequentialDataManager.html)</li><li>[destroyRealTimeSequentialDataManager](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngineIM/destroyRealTimeSequentialDataManager.html)</li><li>[startBroadcasting](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoRealTimeSequentialDataManager/startBroadcasting.html)</li><li>[stopBroadcasting](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoRealTimeSequentialDataManager/stopBroadcasting.html)</li><li>[sendRealTimeSequentialData](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoRealTimeSequentialDataManager/sendRealTimeSequentialData.html)</li><li>[startSubscribing](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoRealTimeSequentialDataManager/startSubscribing.html)</li><li>[stopSubscribing](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoRealTimeSequentialDataManager/stopSubscribing.html)</li><li>[onReceiveRealTimeSequentialData](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngine/onReceiveRealTimeSequentialData.html)</li></ul> |
    | 开启与关闭声浪监控 | <ul><li>[startSoundLevelMonitor](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngineDevice/startSoundLevelMonitor.html)</li><li>[stopSoundLevelMonitor](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngineDevice/stopSoundLevelMonitor.html)</li></ul> |
    | 自动混流 | <ul><li>[startAutoMixerTask](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngineMixer/startAutoMixerTask.html)</li><li>[stopAutoMixerTask](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngineMixer/stopAutoMixerTask.html)</li></ul> |
    | 本地设备异常事件回调 | [onLocalDeviceExceptionOccurred](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngine/onLocalDeviceExceptionOccurred.html) |
    | 本地音频设备状态变更事件回调 | [onAudioDeviceStateChanged](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngine/onAudioDeviceStateChanged.html) |
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



1. 修复登录房间时设置房间最大人数限制（maxMemberCount）参数不生效问题

2. 修复推流前调用 [setStreamExtraInfo](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePublisher/setStreamExtraInfo.html)、[mutePublishStreamAudio](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePublisher/mutePublishStreamAudio.html) 未生效的问题

3. 修复 [onRoomTokenWillExpire](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngine/onRoomTokenWillExpire.html) 中 remainTimeInSecond 字段单位错误的问题（由毫秒改为秒）

4. 修复初始化引擎后仍能调用 [setRoomMode](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngine/setRoomMode.html) 接口修改多房间模式的问题


---

## 3.20.0 版本 <a id="3.20.0"></a>

**发布日期： 2025-03-24**

**新增功能**

1. 新增用户维度的网络质量回调

    新增 [onRtcStats](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngine/onRtcStats.html) 回调，开发者可用于衡量用户维度的 RTC 网络质量，该接口将本端用户所有推、拉流的质量数据进行聚合统计并回调，包括：<ul><li>上行 & 下行：占用带宽、RTT、丢包率。</li><li>端到端延迟。</li></ul>

    相关 API 请参考 [onRtcStats](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngine/onRtcStats.html)

**问题修复**

1. 修复在 iOS 端使用蓝牙耳机时偶现的路由异常问题

2. 修复已知问题，优化 SDK 性能


---

## 3.19.1 版本 <a id="3.19.1"></a>

**发布日期： 2025-02-26**

**新增功能**

1. 适配 Flutter 最新版本

    ZEGO Express Engine SDK 现已支持 Flutter 3.29.0 版本。


---

## 3.19.0 版本 <a id="3.19.0"></a>

**发布日期： 2025-01-21**


**新增功能**


1. 独唱场景下支持动态响度均衡功能

    开启动态响度均衡后，根据媒体播放器伴奏的实时表现，SDK 动态调整人声响度，使人声与伴奏响度时刻保持恰当比例，提升人声与伴奏融合度，观众体验更佳，适用于实时 KTV 的独唱场景。

    相关 API 请参考 [enableAuxBgmBalance](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePublisher/enableAuxBgmBalance.html)



**改进优化**

1. 优化 CDN 域名解析逻辑，避免阻塞线程

    CDN 推拉流的域名解析逻辑，由同步改为异步操作，避免阻塞线程。

2. 降低首帧延迟，提升用户秒开体验

    针对首次运行 ZEGO Express SDK 的设备，可降低进房耗时、推拉流耗时，提升用户秒开体验。



---


## 3.18.1 版本 <a id="3.18.1"></a>

**发布日期： 2024-12-17**


**问题修复**

1. 登录耗时优化

2. 修复实验性 API 老版本兼容性的问题

3. 修复媒体播放器低概率状态异常的问题



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

2. Web 端支持在初始化引擎之前设置日志等级

    Web 端支持在初始化引擎之前设置日志等级，以减少浏览器控制台打印的日志。

    相关 API 请参考 [setLogConfig](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/file-___Users_zego_ci_workspace_workspace_rtc_utils_publish_express_api_documents_projects_flutter_lib_src_zego_express_api/ZegoExpressEngine/setLogConfig.html)

3. Web 端新增房间状态变化通知回调

    当房间的连接状态改变时，触发 [onRoomStateChanged](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngine/onRoomStateChanged.html) 回调，开发者可以通过该回调来判断房间内当前用户状态。

    相关 API 请参考 [onRoomStateChanged](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngine/onRoomStateChanged.html)

**改进优化**

1. 减少推拉流耗时，提升 SDK 性能

**问题修复**

1. 修复 iPad 无法连接蓝牙耳机的问题

2. 修复媒体播放器开启本地缓存后，偶现播放崩溃的问题

3. 修复 Web 端切换前后摄像头后，本地预览黑屏的问题



---


## 3.17.0 版本 <a id="3.17.0"></a>

**发布日期： 2024-10-09**


**新增功能**

1. Flutter 框架支持 Linux 平台

    支持 Debian 10 或以上版本、Ubuntu 20.04 LTS、22.04 LTS、24.04 LTS。


2. 支持自定义观众上麦前和下麦后的拉流资源类型

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

    详情请参考 [屏幕共享](https://doc-zh.zego.im/) 文档。

2. 登录房间时，userName 字段改为非必填字段

    调用 [loginRoom](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngineRoom/loginRoom.html) 接口登录房间时，`userName` 原来为必填字段，本次优化为非必填的可选字段。

    相关 API 请参考 [loginRoom](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngineRoom/loginRoom.html)

3. 优化双声道变声效果，并提升音乐变调的音质

    相关 API 请参考 [setVoiceChangerParam](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePreprocess/setVoiceChangerParam.html)

**问题修复**


1. 修复反初始化时，监控模块崩溃，导致主线程卡死的问题

2. 修复版权音乐在开始打分时，可能出现崩溃的问题

3. 调整生命周期，修复已知崩溃问题

4. 修复媒体播放器已知的问题


---

## 3.16.0 版本 <a id="3.16.0"></a>

**发布日期： 2024-07-29**


**新增功能**


1. AI 降噪新增低延迟模式

    注意：如需使用该功能，请联系 ZEGO 技术支持。

    在 10ms 延迟下，依然保持纯净的降噪效果以及高保真的人声音质，适用于游戏语音、游戏开黑、实时合唱等对延迟较为敏感的场景，目前 AI 降噪已支持均衡模式、低延迟模式以及轻量模式，详情请参考 [场景化 AI 降噪](https://doc-zh.zego.im/article/16881)。

    相关 API 请参考 [setANSMode](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePreprocess/setANSMode.html)

2. 在推流时，可以控制该流是否允许审核

    注意：若某条流设置为允许审核，如果开发者没有发起审核任务，这条流也不会被送审。

    当调用审核接口时，默认会对房间内的所有流进行审核。如果客户端要控制某条流不可以被送审，可以在调用 [startPublishingStream] 接口开始推流时，将送审标识 [streamCensorFlag] 参数设置为 1（不允许）。

    相关 API 请参考 [startPublishingStream](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePublisher/startPublishingStream.html), [ZegoPublisherConfig > streamCensorFlag](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoPublisherConfig/streamCensorFlag.html)

3. 媒体播放器播放倍速最低支持至 0.3 倍速

    媒体播放器的播放速度区间从 [0.5,4.0]，扩大为 [0.3,4.0]，更多内容请参考 [媒体播放器](https://doc-zh.zego.im/)。

    相关 API 请参考 [setPlaySpeed](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoMediaPlayer/setPlaySpeed.html)

4. H.265 客户端编码自动兼容策略新增用户级的协商范围

    注意：如需使用该功能，请联系 ZEGO 技术支持。

    控制本端客户端编码兼容范围为房间内所有推流用户或所有用户，即当指定范围内存在用户不支持 H.265 时，本端客户端编码动态回退。

    相关 API 请参考 [loginRoom](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngineRoom/loginRoom.html), [startPublishingStream](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePublisher/startPublishingStream.html), [ZegoPublisherConfig > codecNegotiationType](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoPublisherConfig/codecNegotiationType.html), [ZegoRoomConfig > capabilityNegotiationTypes](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoRoomConfig/capabilityNegotiationTypes.html)

**问题修复**

1. 修复偶现插入耳机后设备音频依然外放的问题

2. 修复蓝牙相关权限导致崩溃的问题



**废弃删除**

1. 废弃拉流接口中关于 CDN Plus 的配置

    下架畅直播概念，废弃 CDN Plus 直播相关接口。如需实现直播功能，推荐使用 ZEGO 自研 [超低延迟直播产品](https://doc-zh.zego.im/article/17185)，实现更高质量的直播体验。

    相关 API 请参考 [ZegoStreamResourceMode > CDNPlus](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoStreamResourceMode.html#CDNPlus)



---

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

    优化 AI 场景化降噪中，“均衡模式”的降噪效果，在性能不变的情况下，人声清晰度、平稳度进一步提升，且噪音抑制更干净，详情请参考 [场景化 AI 降噪](https://doc-zh.zego.im/article/16881)。


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



---

## 3.14.5 版本 <a id="3.14.5"></a>

**发布日期： 2024-05-07**

**新增功能**

1. 移动端开发支持 iOS 17.0 版本

    注意：从该版本起，不再支持 iOS 11.0 及之前的版本。

    从 2024-04-29 开始，所有上架 App Store 的应用必须支持 iOS 17.0 版本，详情请参考 [Apple 开发者网站官方说明](https://developer.apple.com/news/upcoming-requirements/?id=04292024a)。

2. 新增“汽车人”、“没电了” 两种变声音效

    [ZegoVoiceChangerPreset](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoVoiceChangerPreset.html) 新增 “汽车人”、“没电了” 两种变声效果的枚举值，丰富变声效果。

    相关 API 请参考 [setVoiceChangerPreset](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePreprocess/setVoiceChangerPreset.html)

3. 支持提前判断设备能否运行 AI 变声功能

    AI 变声功能对运行设备的性能有一定要求，开发者可以通过 [isAIVoiceChangerSupported] 接口提前判断设备能否支持运行 AI 变声功能。

    相关 API 请参考 [isAIVoiceChangerSupported](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngineAIVoiceChanger/isAIVoiceChangerSupported.html)

**问题修复**

1. 修复未定义全局变量的释放时机，导致进程退出异常的问题

2. 修复部分机型使用 AudioTrack 播放音频，出现异响的问题

3. 修复使用 AI 变声功能，偶现音画不同步、启停瞬间吞字的问题

4. 修复 iPad 通过麦克风采集音频，偶现没声音的问题


---

## 3.13.3 版本 <a id="3.13.3"></a>

**发布日期： 2024-04-09**

**问题修复**

1. 修复已知问题


---

## 3.13.2 版本 <a id="3.13.2"></a>

**发布日期： 2024-04-01**

**改进优化**

1. 更新 iOS SDK 内的隐私清单文件`PrivacyInfo.xcprivacy`

    注意：如客户集成的是 3.13.2 版本之前的 SDK，如想发布到 App Store，需下载最新版本的 SDK，并拷贝 PrivacyInfo.xcprivacy 文件到旧版 SDK 相应位置。

    请将 iOS SDK 内的隐私清单文件 `PrivacyInfo.xcprivacy` 升级到新版本，详情请参考 SDK 包内的 “ZegoExpressEngine.framework” 文件夹下的“PrivacyInfo.xcprivacy”。


**问题修复**

1. 修复已知问题


---

## 3.13.0 版本 <a id="3.13.0"></a>

**发布日期： 2024-03-21**

**新增功能**

1. 使用 QUIC 协议进行 CDN 推拉流时，支持 0-RTT 建立连接

    注意：

1. 该功能的安全性与传统方式相比稍低，请酌情使用。

2. 使用该功能时，需要将 ZegoCDNConfig.protocol 设置为 “quic”。

    [ZegoCDNConfig](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoCDNConfig-class.html) 新增 quicConnectMode 属性，开发者在使用 QUIC 协议进行 CDN 推拉流时，可以设置为 QUIC 建连模式（即 quicConnectMode 取值为 1），0-RTT 建立连接，快速启用服务。目前已适配华为、网宿、腾讯等厂商的 CDN 直播产品。

    该功能默认不开启（即 quicConnectMode 默认为 0，表示正常建立连接）。

    相关 API 请参考 [ZegoCDNConfig > quicConnectMode](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoCDNConfig/quicConnectMode.html)

2. 支持设置转推 CDN 的超时时间，用于监控流是否存在

    注意：该功能只在发起转推时生效，转推过程中如果出现断连，SDK 会保持重试逻辑，此时无该回调通知。

    发起转推任务时，支持通过 [addPublishCdnUrl](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePublisher/addPublishCdnUrl.html) 接口，设置转推 CDN 的超时时间，用于监控流是否存在。例如，开发者已经发起转推任务，但该条流还未开始推流，在超过设置的超时时间后，SDK 会返回一个流不存在的回调通知。

    该回调只会通知给转推发起者、而不是推流发起者。如果转推发起者和推流发起者不是同一个用户，建议开发者从服务端发起转推、并接收该通知。

    相关 API 请参考 [addPublishCdnUrl](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePublisher/addPublishCdnUrl.html)

3. 支持回调本地录制的质量数据

    [ZegoDataRecordProgress](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoDataRecordProgress-class.html) 新增 quality 属性，在本地录制过程中，通过该属性回调录制文件的帧率、码率等质量数据。

    相关 API 请参考 [onCapturedDataRecordProgressUpdate](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngine/onCapturedDataRecordProgressUpdate.html)

**改进优化**

1. 优化媒体推流器的回调通知逻辑

    优化媒体推流器的回调通知逻辑，增加对“不支持的音频采样率”（例如，不支持 24K 的采样率）的错误回调，帮助开发者快速定位问题。

    相关 API 请参考 [onMediaDataPublisherFileClose](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngine/onMediaDataPublisherFileClose.html)

2. 针对性能较低的 Android 设备，优化应用处于后台时的语音流畅性、及回声消除效果

    注意：如需使用该功能，请联系 ZEGO 技术支持。

3. 针对 KTV 场景，优化 iOS、Android 平台上的蓝牙耳机的人声、伴奏对齐效果，提升 K 歌体验

**问题修复**

1. 修复长时间使用 SDK 未反初始化，导致接口调用耗时异常的问题

2. 修复硬编、硬解时兼容异常，偶现崩溃的问题

3. 修复已知的兼容异常、及空指针的问题


---

## 3.12.4 版本 <a id="3.12.4"></a>

**发布日期： 2024-01-18**

**问题修复**

1. 修复 iOS 平台初始化 SDK 时，如果出现网络异常，会偶现 UI 卡顿的问题

2. 修复切换网络时，如果网络异常，极低概率下会出现 UI 卡顿的问题


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

1. 修复个别 Android 设备播放采样率超过 48K 的音视频时，必现崩溃的问题

2. 修复 iOS 平台调用 [enableAudioCaptureDevice] 接口时偶现崩溃的问题


---

## 3.11.0 版本 <a id="3.11.0"></a>

**发布日期： 2023-12-15**

**新增功能**

1. 所有网络请求支持 IPv6 协议

2. 房间实时消息支持发送透传消息

    支持向指定的客户端或客户服务器发送房间实时消息；消息类型分为 “普通消息”、“有序消息”，其中后者保证严格按照顺序接收消息。该功能适用于主播需要管理房间内的麦位等场景中，例如：

    - 通过主播客户端，向需要闭麦的用户发送消息，接到消息的客户端进行闭麦。

    - 主播希望将某用户踢出房间时，通过主播客户端，向对方的客户服务器发送消息、并踢出该用户。

    相关 API 请参考 [sendTransparentMessage](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngineIM/sendTransparentMessage.html)

3. 自动混流支持设置水位

    注意：

1. 该功能默认不开启，即服务端使用默认的配置值。

2. 该功能会增大延迟，请酌情使用。

    自动混流接口支持设置水位，控制混流服务器拉流缓存的自适应调整的区间范围下限，以便在“混流耗时”和“推流端不稳定导致的画面卡顿”之间保持平衡。该功能设置后，仅对新的输入流生效，对于已经开始混流的输入流不生效。

    例如实时合唱 KTV 场景中，推流端网络轻微波动可能会导致混流卡顿，此时观众观看时也会有较高概率出现卡顿。通过调节水位下限，可以优化观众端卡顿问题，但会增大延迟。

    相关 API 请参考 [ZegoAutoMixerTask > minPlayStreamBufferLength](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoAutoMixerTask/minPlayStreamBufferLength.html)

4. 混流支持输入直播协议流

    新增支持将直播流作为输入流，进行混流处理；直播输入流的 URL 支持 RTMP 和 HTTP-FLV 两种协议。该功能适用于将主播连麦的RTC 画面流与云端体育直播流、游戏直播画面流等进行混合，实现游戏或体育直播解说的场景中。

5. 混流支持自定义音频偏移值

    在使用自定义音视频采集功能、且对应的采集源音频延迟不一致的情况下，可以在混流时自定义音频偏移值，从而实现混流输出后的音视频对齐，保证观众端的体验。

    相关 API 请参考 [ZegoMixerInput > advancedConfig](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoMixerInput/advancedConfig.html)

6. 音效播放器支持分别设置推流音量、本地播放音量

    音效播放器支持分别设置推流音量、本地播放音量，保证本端和远端的音量大小都处于合适的区间。

    相关 API 请参考 [ZegoAudioEffectPlayer > setPublishVolume](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoAudioEffectPlayer/setPublishVolume.html), [ZegoAudioEffectPlayer > setPlayVolume](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoAudioEffectPlayer/setPlayVolume.html), [ZegoAudioEffectPlayer > setPublishVolumeAll](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoAudioEffectPlayer/setPublishVolumeAll.html), [ZegoAudioEffectPlayer > setPlayVolumeAll](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoAudioEffectPlayer/setPlayVolumeAll.html)

**改进优化**

1. 优化 AEC（回声消除）算法，实现更好的 AEC 效果

2. 优化网络连接策略，提升音视频通话体验

3. 优化前后台切换策略，解决某些特定场景或机型采集静音的问题

4. 优化多端登录逻辑

    用户在 A 设备上登录成功后，A 设备断网；然后使用同一 userID 在 B 设备上登录成功。此时如果 A 设备网络恢复，重连会失败，并抛出 1002086 错误码，提示该 userID 已在其他设备登录。


---

## 3.10.3 版本 <a id="3.10.3"></a>

**发布日期： 2023-11-20**


**问题修复**

1. 修复移动端休眠检测模块误报，影响到房间重登录、推拉流重试逻辑的问题



---


## 3.10.0 版本 <a id="3.10.0"></a>

**发布日期： 2023-10-27**

**新增功能**

1. 新增实时 AI 变声功能

    注意：

1. “AI 变声”功能为付费功能，如需申请体验或咨询正式收费标准，请联系 ZEGO 商务人员。

2. 当前官网 SDK 不包含此功能，如有需要，请联系 ZEGO 技术支持特殊编包。

    新增 AI 变声功能，实时通话中的“柯南变声领结”，完美重现目标角色的音色与韵律，同时保留用户的语速、情感、语调，随心所欲切换音色，超低延迟让用户畅享社交语聊、直播、游戏语音等场景，详情请参考 [AI 变声](https://doc-zh.zego.im/article/18594)。

    相关 API 请参考 [createAIVoiceChanger](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngineAIVoiceChanger/createAIVoiceChanger.html), [destroyAIVoiceChanger](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngineAIVoiceChanger/destroyAIVoiceChanger.html)

2. 媒体播放器支持伴奏音质增强

    媒体播放器支持伴奏音质增强，提升伴奏的音质以及现场的氛围感，适用于语聊房、K 歌等场景中。

    相关 API 请参考 [enableLiveAudioEffect](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoMediaPlayer/enableLiveAudioEffect.html)

3. 支持获取并上传音频的 Dump 文件

    注意：由于音频 Dump 文件属于用户的隐私敏感数据，因此开发者实现该能力时，请务必认真阅读 [《即构隐私政策》](https://www.zego.im/privacy) 中关于 “使用音频 Dump 功能” 的内容。此外，在收集音频 Dump 文件时，请在获得用户授权同意时，同步注明 Express SDK 收集目的。

    支持将处理前后的音频数据保存下来并上传，用于定位音频相关问题、提高问题排查效率、缩短接入时间，详情请参考 [如何获取、上传音频的 Dump 文件？](https://doc-zh.zego.im/faq/How_to_get_audio_dump_upload)

    相关 API 请参考 [startDumpData](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngineUtilities/startDumpData.html), [stopDumpData](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngineUtilities/stopDumpData.html), [uploadDumpData](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngineUtilities/uploadDumpData.html), [removeDumpData](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngineUtilities/removeDumpData.html), [onRequestDumpData](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngine/onRequestDumpData.html), [onStartDumpData](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngine/onStartDumpData.html), [onStopDumpData](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngine/onStopDumpData.html), [onUploadDumpData](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngine/onUploadDumpData.html)

**改进优化**

1. 优化网络测速的期望推、拉流码率上限

    优化网络测速的期望推、拉流码率上限，提升至 15M。开发者可以在推拉流前，检查音视频质量与当前网络的匹配程度，以保证通话质量稳定。

    相关 API 请参考 [startNetworkSpeedTest](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngineUtilities/startNetworkSpeedTest.html)

2. 优化拉流时，接收远端用户音视频数据的 [muteAll] 接口逻辑

    注意：新增接口 [muteAllPlayAudioStreams](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePlayer/muteAllPlayAudioStreams.html)、[muteAllPlayVideoStreams](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePlayer/muteAllPlayVideoStreams.html) 与旧接口 [muteAllPlayStreamAudio](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePlayer/muteAllPlayStreamAudio.html)、[muteAllPlayStreamVideo](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePlayer/muteAllPlayStreamVideo.html) 之间不能混用。

    新增接口 [muteAllPlayAudioStreams](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePlayer/muteAllPlayAudioStreams.html)、[muteAllPlayVideoStreams](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePlayer/muteAllPlayVideoStreams.html) 接口，用于在拉流时接收所有远端用户的音视频数据；同时支持通过 [mutePlayStreamAudio](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePlayer/mutePlayStreamAudio.html)、[mutePlayStreamVideo](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePlayer/mutePlayStreamVideo.html) 接口，单独控制指定的流的接收状态。

    旧接口 [muteAllPlayStreamAudio](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePlayer/muteAllPlayStreamAudio.html)、[muteAllPlayStreamVideo](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePlayer/muteAllPlayStreamVideo.html) 调用后，无法单独控制指定流的接收状态。

    相关 API 请参考 [muteAllPlayAudioStreams](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePlayer/muteAllPlayAudioStreams.html), [muteAllPlayVideoStreams](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePlayer/muteAllPlayVideoStreams.html), [mutePlayStreamAudio](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePlayer/mutePlayStreamAudio.html), [mutePlayStreamVideo](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePlayer/mutePlayStreamVideo.html)

3. 媒体播放器支持仅播放视频或音频，不额外消耗解码性能

    注意：播放过程中，如果修改了媒体流类型，会在下一次播放时生效。

    使用媒体播放器播放音视频文件时，支持通过 [setPlayMediaStreamType](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoMediaPlayer/setPlayMediaStreamType.html) 接口，设置为“仅播放音频” 或“仅播放视频”，不消耗音视频解码性能。

    相关 API 请参考 [setPlayMediaStreamType](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoMediaPlayer/setPlayMediaStreamType.html)

**问题修复**

1. 修复拉流时，偶现无声音的问题

2. 修复多房间断网的异常情况下，多次调用 [logoutRoom]、[loginRoom] 接口，导致后续登录房间失败的问题

3. 修复房间重连失败的情况下，可能出现频繁重试的问题


---

## 3.9.0 版本 <a id="3.9.0"></a>

**发布日期： 2023-09-18**

**新增功能**

1. 新增附带时间戳的 SEI 回调

    相关 API 请参考 [onPlayerRecvMediaSideInfo](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngine/onPlayerRecvMediaSideInfo.html)


2. 直推 CDN 支持在推流过程中更新 CDN 地址

    相关 API 请参考 [enablePublishDirectToCdn](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngine/onPublisherDummyCaptureImagePathError.html)

3. 支持均衡型 AI 降噪模式

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

2. 修复发送流新增时，极小概率出现失败的问题

3. 修复音效播放器偶现崩溃的问题

4. 修复调用 [sendAudioSideInfo](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePublisher/sendAudioSideInfo.html) 接口发送音频次要消息，接收端 10s 左右才能收到消息的问题

5. 修复网宿 CDN 在直推情况下，停推 TCP 断连耗时固定为 500 ms 的问题


---

## 3.8.1 版本 <a id="3.8.1"></a>

**发布日期： 2023-08-18**

**新增功能**

1. 新增支持“智能云代理”模式

    注意：如需使用该功能，请联系 ZEGO 技术支持。

    开发者设置“智能云代理”模式后，在 RTC 或 L3 拉流时，会优先使用直连网络模式进行尝试。如果直连网络不可用、且当前是蜂窝网络，则继续留在直连模式重试；如果直连网络不可用、且当前是非蜂窝网络，则切到云代理模式，详情请参考 [云代理](https://doc-zh.zego.im/article/17138)。

2. 媒体播放器支持设置网络资源的 Http Headers

    媒体播放器支持设置网络资源的 Http Headers，开发者可基于该配置，自定义限定网络资源的访问方式，加强资源的安全防护。

    相关 API 请参考 [setHttpHeader](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoMediaPlayer/setHttpHeader.html)

3. 游戏语音支持配置 3D 音效距离的衰减范围、以及单条流的发声范围

    在游戏语音场景中：

    - 支持通过 [setAudioReceiveRange](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoRangeAudio/setAudioReceiveRange.html) 接口，设置 3D 音效距离的衰减范围区间 [min, max]。距离小于 min 时，音量不会随着距离的增加而衰减；距离大于 max 时，将无法听到对方的声音。
    - 支持通过 [setStreamVocalRange](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoRangeAudio/setStreamVocalRange.html) 接口，设置单条流的发声范围区间 [min, max]。

4. 支持按推流通道回调相关的事件活动

    [onPublisherSendAudioFirstFrame](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngine/onPublisherSendAudioFirstFrame.html) 回调函数，新增通道 channel 参数，支持多通道监听推流发送首帧信息。

    相关 API 请参考 [onPublisherSendAudioFirstFrame](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngine/onPublisherSendAudioFirstFrame.html)

**改进优化**

1. 优化媒体播放器加载资源的 URL 长度，最大支持 2048 字节

2. 优化媒体播放器 SEI 信息与相应帧数据的回调同步，保证 SEI 和画面的一致性

**问题修复**

1. 修复使用 Token 鉴权时，在 [createEngine] 之后、[destroyEngine] 之前变更了 userID，可能导致推拉流失败的问题

**废弃删除**

1. 废弃了一些 API 接口

    在 3.8.1 版本，对以下 API 接口进行废弃变更。

    - 废弃了原有的 [onPublisherSendAudioFirstFrame] 回调接口，替换为同名的 [onPublisherSendAudioFirstFrame](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngine/onPublisherSendAudioFirstFrame.html) 回调，并新增通道 channel 参数，支持按推流通道回调相关的事件活动。
    - [ZegoRangeAudio](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoRangeAudio-class.html) 类的成员函数：
        - 废弃了原有的 [setAudioReceiveRange] 接口，替换为同名的 [setAudioReceiveRange](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoRangeAudio/setAudioReceiveRange.html) 接口，并扩展参数 [ZegoReceiveRangeParam](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoReceiveRangeParam-class.html) 类型，支持设置范围语音的音频接收范围。
        - 废弃了原有的 [setStreamVocalRange] 接口，替换为同名的 [setStreamVocalRange](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoRangeAudio/setStreamVocalRange.html) 接口，并扩展参数 [ZegoVocalRangeParam](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoVocalRangeParam-class.html) 类型，支持设置范围语音的单条流发声范围。

    API 接口变更后可能存在兼容性问题，详情请参考 [3.8.1 及以上版本升级指南](https://doc-zh.zego.im/article/18182)。


---

## 3.7.0 版本 <a id="3.7.0"></a>

**发布日期： 2023-07-28**

**改进优化**

1. 优化 SDK 内部逻辑，减少 400KB ~ 600KB 的内存占用

2. 在断网导致的推拉流重试状态中，支持回调本地网络质量

    相关 API 请参考 [onNetworkQuality](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngine/onNetworkQuality.html)

3. 支持在调用 [destroyEngine](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngine/destroyEngine.html) 接口后，生成日志上传任务

    相关 API 请参考 [submitLog](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngine/submitLog.html)

4. 优化 SDK 的内部逻辑，提升弱网环境下的通话体验

**问题修复**

1. 修复 MediaRecorder、AudioObserver 停止推流后，未恢复本地推流，继续采集的问题

2. 修复 NetMonitor 模块多线程死锁的问题



---


## 3.6.1 版本 <a id="3.6.1"></a>

**发布日期： 2023-07-03**

**问题修复**

1. 修复调用 [setRoomExtraInfo](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngineRoom/setRoomExtraInfo.html) 接口直接报错的问题


---

## 3.6.0 版本 <a id="3.6.0"></a>

**发布日期： 2023-06-21**

**新增功能**

1. 新增 Enhanced KTV 混响效果

    新增增强型 KTV 混响效果，实现更集中、亮度更好的 KTV 人声效果。与之前的 KTV 混响音效相比，Enhanced KTV 混响效果缩短了混响时长，提高了干湿比。

    原有的 KTV 混响音效仅适用于人声瑕疵较为明显的用户，增强型 KTV 混响效果适用于大多数专业用户和普通用户。

    相关 API 请参考 [setReverbPreset](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePreprocess/setReverbPreset.html)

2. 游戏语音功能支持媒体播放器&音效播放器使用 3D 音效

    开发者可以通过设置媒体播放器、音效播放器的位置和朝向，实现本地音频、在线音频资源的 3D 音效。该功能可用于在虚拟场景中设置物品的音效、以及指定位置的背景音乐等。

    相关 API 请参考 [ZegoMediaPlayer > updatePosition](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoMediaPlayer/updatePosition.html), [ZegoAudioEffectPlayer > updatePosition](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoAudioEffectPlayer/updatePosition.html)

3. 媒体播放器倍速功能最大支持 4 倍速

    媒体播放器倍速的上限提升到 4 倍速。例如，用户在播放音视频文件时，如果已设置为 2 倍速播放，长按屏幕时可以加速至 4 倍速。

    相关 API 请参考 [ZegoMediaPlayer > setPlaySpeed](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoMediaPlayer/setPlaySpeed.html)

4. 媒体播放器支持边下载、边回调数据解密、边播放的功能

    针对在线播放器的版权音乐保护，媒体播放器支持边下载边回调未解密的二进制数据，由开发者解密后再传回媒体播放器播放，过程中不会产生文件或缓存文件。

    相关 API 请参考 [ZegoMediaPlayer > enableBlockData](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoMediaPlayer/enableBlockData.html)

**改进优化**

1. 调整 [ZegoScreenCaptureConfig](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoScreenCaptureConfig-class.html) 类中的 applicationVolume 和 microphoneVolume 字段变成可选字段，扩大 SDK 的多端兼容性

**问题修复**

1. 修复使用媒体播放器时可能会导致内存泄露的问题


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

1. 大幅度减少 SDK 的 iOS 设备内存消耗

    该优化从 3.5.0 版本开始生效，不需要额外接口。

**问题修复**

1. 修复媒体播放器在部分 m3u8 文件格式中，不能通过 seekTo 接口使播放进度跳转到 0 的问题

2. 修复 Android 内存用量信息不更新的问题




---

## 3.4.2 版本 <a id="3.4.2"></a>

**发布日期： 2023-04-26**


**新增功能**

1. 新增地理围栏功能

    注意：

    - 如需使用该功能，请联系 ZEGO 技术支持。
    - 请在创建引擎之前，配置地理围栏信息。

    将音视频及信令数据访问限定在某一区域，用以满足地区数据隐私安全相关法规，即限定用户访问某一特定区域的音视频服务，详情请参考 [地理围栏](https://doc-zh.zego.im/article/17817)。

    相关 API 请参考 [setGeoFence](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngine/setGeoFence.html)


2. 支持动态切换流控策略

    支持动态开关流量控制功能，同时支持设置流量控制属性等。

    相关 API 请参考 [enableTrafficControl](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePublisher/enableTrafficControl.html), [setMinVideoBitrateForTrafficControl](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePublisher/setMinVideoBitrateForTrafficControl.html), [setMinVideoFpsForTrafficControl](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePublisher/setMinVideoFpsForTrafficControl.html), [setMinVideoResolutionForTrafficControl](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePublisher/setMinVideoResolutionForTrafficControl.html)

**改进优化**

1. 优化 SDK 内存占用

    删除 SDK 内部一些没必要的内存申请，优化 SDK 内存使用率，相比上个版本，内存使用率减少了 10% 左右。


**问题修复**

1. 修复游戏语音在某些情况下收听异常的问题



**废弃删除**

1. 从 3.4.2 版本开始，废弃了对 iOS 11.0 以下版本的支持，iOS Deployment Target（最低支持版本）提升到 iOS 11.0

    具体说明，请参考 [App Store submission requirement starts April 25](https://developer.apple.com/news/?id=jd9wcyov) 及 [Xcode 14 Release Notes](https://developer.apple.com/documentation/xcode-release-notes/xcode-14-release-notes#Build-System)。

2. 从 3.4.2 版本开始，iOS SDK 不再支持 32 位 armv7 架构

    具体说明，请参考 [Xcode 14 Release Notes](https://developer.apple.com/documentation/xcode-release-notes/xcode-14-release-notes#Build-System)。



---


## 3.3.1 版本 <a id="3.3.1"></a>

**发布日期： 2023-03-24**


**问题修复**

1. 修复在部分场景下，Android 硬件耳返失效的问题




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

    游戏语音支持自定义设置发声模式和收听模式，可用于实现加入小队后，需屏蔽非范围内的同一小队玩家的场景，详情请参考 [游戏语音](https://doc-zh.zego.im/article/15717)。

    相关 API 请参考 [setRangeAudioCustomMode](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoRangeAudio/setRangeAudioCustomMode.html)

4. 场景化音视频配置新增 [StandardVoiceCall] 标准语音通话场景

    场景化音视频配置新增 [StandardVoiceCall] 标准语音通话场景，适用于 1v1 纯语音通话场景，详情请参考 [场景化音视频配置](https://doc-zh.zego.im/article/16879)。

    相关 API 请参考 [setRoomScenario](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngine/setRoomScenario.html)

**改进优化**

1. 优化 KTV 场景的回声消除（AEC）效果

    针对 KTV 场景的 AEC 优化，实现了：

    - 大幅度提高外放场景下的人声音质，使人声更保真。
    - 消除回声的同时，有效避免偶现的吞字或人声起伏的现象。



**问题修复**

1. 修复 Android 插拔耳机后，播放器没有声音的问题


---

## 3.2.1 版本 <a id="3.2.1"></a>

**发布日期： 2023-02-24**

**新增功能**

1. Flutter Web 支持使用多房间功能

    Flutter Web 支持使用多房间功能，详情请参考 [登录多房间](https://doc-zh.zego.im/article/15710) 文档。

    相关 API 请参考 [setRoomMode](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngine/setRoomMode.html)

**问题修复**

1. 修复 [onRemoteSoundLevelUpdate](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngine/onRemoteSoundLevelUpdate.html) 回调会导致异常的问题

2. 修复 iOS 平台通过 [setSEIConfig](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePublisher/setSEIConfig.html) 接口设置 `SEIType` 没有效果的问题


---


## 3.2.0 版本 <a id="3.2.0"></a>

**发布日期： 2023-01-31**


**改进优化**

1. 自定义信令配置支持扩展到 4KB

    注意：自定义信令配置默认大小为 1KB，如需扩展到 4KB，请联系 ZEGO 技术支持进行处理。

**问题修复**

1. 修复网络时间模块重试失败的问题



---

## 3.1.0 版本 <a id="3.1.0"></a>

**发布日期： 2022-12-27**

**新增功能**

1. SDK 支持设置云代理

    注意：如需使用该功能，请联系 ZEGO 技术支持。

    通过设置 SDK 的云代理接口，将 SDK 对应的所有流量通过云端的代理服务器进行中转，实现与 RTC 通信，详情请参考 [云代理文档](https://doc-zh.zego.im/article/17138)。

    相关 API 请参考 [setCloudProxyConfig](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngine/setCloudProxyConfig.html)

**改进优化**

1. 大幅度提升极端弱网地区的音频连通率，并降低连通耗时

    ZEGO 自研调度系统针对网络质量极差地区进行了深度优化。

**问题修复**

1. 修复发送房间 `Logout` 信令可能失败的问题

2. 修复 Android 音效播放器偶现崩溃的问题

3. 修复 Android 低延迟模式下设备重启的问题



---

## 3.0.3 版本 <a id="3.0.3"></a>

**发布日期： 2022-12-06**

<Warning title="注意">



本次更新包含不兼容改动，详情请参考 [3.0.0 及以上版本升级指南](https://doc-zh.zego.im/article/16882)。

</Warning>



**新增功能**

1. 场景化 AI 降噪新增在音乐场景下降噪的能力

    注意：如需使用该功能，请联系 ZEGO 技术支持，此功能目前只支持 Android 平台、iOS 平台、 macOS 平台和 Windows 平台。

    场景化 AI 降噪功能，在之前针对所有非人声进行降噪的基础上，新增支持在音乐场景下的降噪能力，通过识别音乐，智能调整降噪效果还原音乐音质。SDK 会实时对麦克风输入内容进行音乐检测，在声卡、弹唱或近场音乐场景下，自动调整降噪等级，保证音乐的高保真音质，详情请参考 [场景化 AI 降噪](https://doc-zh.zego.im/article/16881) 文档。

2. 新增房间维度的场景 Scenario

    为方便开发者快速接入，降低开发者接入门槛，SDK 提供多种预设场景。开发者可根据所需场景，选择对应的房间模式 [ZegoScenario](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoScenario.html)，SDK 将自动应用适合该场景的音视频编解码器、音视频参数、流控策略等配置，从而快速实现该场景下的最佳效果。

    当前支持场景包括秀场直播、KTV、标准 1v1 音视频通话、高画质 1v1 音视频通话、标准语聊房、高音质语聊房（Web 端暂不支持高品质语聊房场景及 KTV 场景），详情请参考 [场景化音视频配置](https://doc-zh.zego.im/article/16879) 文档。

    相关 API 请参考 [setRoomScenario](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngine/setRoomScenario.html)


3. 新增获取 GPS 信息开关接口

    注意：该功能默认开启，如需关闭该功能，请联系 ZEGO 技术支持，此功能目前只支持 Android 平台、iOS 平台、 macOS 平台和 Windows 平台。

    在 App 有获取地理位置权限的情况下，开发者可以选择是否允许 ZEGO SDK 获取系统缓存的 GPS 信息，默认进行获取。当开发者希望关闭该功能时，需要联系 ZEGO 技术支持进行设置。


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

1. 修复了网络状态从有网络切换到无网络时，当前正在上传的日志有可能出现崩溃的问题

2. 修复了 GetCallbackController 非线程安全的问题​

3. 修复多房间模式下，停止推流时，房间内其他人收不到流删除通知的问题

4. 修复 Android 平台 [onNetworkQuality](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngine/onNetworkQuality.html) 接口不回调的问题


**废弃删除**

1. 废弃了 [ZegoScenario] 的三种旧版本场景
    废弃 [ZegoScenario](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoScenario.html) 场景枚举中的 `General`，`Communication`， `Live` 三种场景，详情请参考 [场景化音视频配置](https://doc-zh.zego.im/article/16879) 文档。

2. 删除了 `setDebugVerbose`、`setPlayStreamVideoLayer`、`enableAudioDataCallback` 等接口，详情请参考 [3.0.0及以上版本升级指南](https://doc-zh.zego.im/article/16882)。






---


## 2.23.0 版本 <a id="2.23.0"></a>

**发布日期： 2022-10-25**


**新增功能**


1. 支持使用 Flutter 框架开发 macOS 程序

    Flutter 框架增加对 macOS 的支持。 macOS 目前只支持 TextureRenderer，推荐通过 [createCanvasView](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressCanvasViewUtils/createCanvasView.html) 获取 [ZegoCanvas](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoCanvas-class.html) 的 view。

    相关 API 请参考 [setPlayerCanvas](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoMediaPlayer/setPlayerCanvas.html)

2. 华为手机的系统耳返支持混响效果

    注意：如需使用该功能，请联系 ZEGO 技术支持。

    华为手机使用系统耳返的情况下，增加混响效果。由于系统的限制，只支持如下三种混响效果：KTV、Theatre（剧院）、Concert（音乐会），默认为 KTV。若选择三种效果之外的混响效果，依然默认为 KTV 效果。

3. Flutter 框架增加支持开发 Web 程序的接口

    Flutter 框架增加部分接口，用于开发 Web 程序。

    相关 API 请参考 [enableCamera](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngineDevice/enableCamera.html)、[mutePlayStreamAudio](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePlayer/mutePlayStreamAudio.html)、[mutePlayStreamVideo](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePlayer/mutePlayStreamVideo.html)、[sendBroadcastMessage](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngineIM/sendBroadcastMessage.html)、[sendBarrageMessage](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngineIM/sendBarrageMessage.html) 等。


**问题修复**

1. 修复多房间模式下，在网络切换（Wi-Fi 或蜂窝网络）期间调用 [loginRoom](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngineRoom/loginRoom.html) 可能无回调的问题。

2. 修复范围语音功能在退出小队后，在范围距离外还能听到原小队内的人的声音的问题。

3. 修复 Android 5.1 及以下版本可能出现的崩溃问题。

4. 修复其他已知问题。



---


## 2.22.0 版本 <a id="2.22.0"></a>

**发布日期： 2022-08-24**


**新增功能**

1. 新增支持 SOCKS5 本地代理

    若在内网或防火墙场景下，您可以通过代理服务器与公网交互，并通过 [setEngineConfig](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngine/setEngineConfig.html) 设置代理服务器地址，保证 ZEGO 音视频云服务正常，目前仅支持 SOCKS5 协议，详情请参考 <a href="/real-time-video-ios-oc/communication/local-proxy" target="_blank" rel="noopener noreferrer">本地代理</a>。

    相关 API 请参考 [setEngineConfig](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngine/setEngineConfig.html)

2. iOS 及 Android 平台支持动态修改 AudioDeviceMode

    新增 [setAudioDeviceMode](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngineDevice/setAudioDeviceMode.html) 接口进行动态修改设备的音频模式，该配置决定设备的音量模式、前处理模式以及 Mic 占用逻辑，您可以根据具体场景进行选择，详情请参考 <a href="http://doc-zh.zego.im/faq/AudioDeviceMod?product=ExpressVideo&platform=ios" target="_blank" rel="noopener noreferrer">如何设置音频设备模式 ZegoAudioDeviceMode？</a>

    相关 API 请参考 [setAudioDeviceMode](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngineDevice/setAudioDeviceMode.html)

3. 支持回调已对齐人声的媒体播放器的 PCM 数据

    注意：
    - 在使用媒体播放器播放伴奏时，需要同时使用 [enableAux](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoMediaPlayer/enableAux.html) 接口。
    - 启动 [enableAlignedAudioAuxData](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngineCustomAudioIO/enableAlignedAudioAuxData.html) 接口后，媒体播放器的数据不会被推出去。如果在录唱场景下，您需要对伴奏进行调音并对齐人声时，可先通过 [enableAux](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoMediaPlayer/enableAux.html)  接口将伴奏混入主路，再通过 [enableAlignedAudioAuxData](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngineCustomAudioIO/enableAlignedAudioAuxData.html) 接口开启开关，最后通过 [onAlignedAudioAuxData](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngine/onAlignedAudioAuxData.html), [enableAux](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoMediaPlayer/enableAux.html) 回调获取媒体播放器的 PCM 数据，此时媒体播放器及 Mic 采集数据已对齐，且数据帧一一对应。

    相关 API 请参考 [enableAlignedAudioAuxData](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngineCustomAudioIO/enableAlignedAudioAuxData.html), [onAlignedAudioAuxData](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngine/onAlignedAudioAuxData.html), [enableAux](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoMediaPlayer/enableAux.html)

4. 支持使用 Flutter 框架开发 Windows 程序


**改进优化**

1. 优化网络质量回调，感知远端用户异常状态

    当远端用户异常时，[onNetworkQuality](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngine/onNetworkQuality.html) 每 2s 回调一次质量未知状态（ZegoStreamQualityLevel.Unknown 状态），当用户该状态持续 8s 后，则认为远端用户已异常断开，此时回调质量异常状态（ZegoStreamQualityLevel.Die 状态）。

    相关 API 请参考 [onNetworkQuality](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngine/onNetworkQuality.html)

2. 优化网络质量回调，网络质量反馈更灵敏

    推拉流质量回调会每隔 3s 回调一次质量最差的结果，当周期内出现严重的抖动或丢包时，能够立刻反馈出流质量差。

    相关 API 请参考 [onPlayerQualityUpdate](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngine/onPlayerQualityUpdate.html), [onPublisherQualityUpdate](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngine/onPublisherQualityUpdate.html), [onNetworkQuality](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngine/onNetworkQuality.html)

3. 优化日志上报策略

    优化日志上报策略，提高日志上传效率。

4. 优化了 AGC 的谐波检测算法

    AGC 新改进的谐波检测算法存在崩溃问题，现回退至老版本的谐波检测算法。

**问题修复**

1. 修复网络模块极低概率崩溃的问题



---

## 2.21.1 版本 <a id="2.21.1"></a>

**发布日期：2022.07.15**


**问题修复**

1. 修复纯音频场景发送 SEI 失败的问题



---


## 2.21.0 版本 <a id="2.21.0"></a>

**发布日期：2022.07.12**


**新增功能**

1. 范围语音支持自定义距离更新频率

    SDK 默认的距离更新频率由 1s 改为 100ms，能够基本满足大部分开发者使用范围语音时的平滑衰减效果，优化了使用范围语音时声音衰减的体验，可以实现更平滑、自然的衰减效果。

    若希望与实际的业务效果进行更优的匹配，可调用 [setPositionUpdateFrequency](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoRangeAudio/setPositionUpdateFrequency.html) 接口自行进行修改频率。

    相关 API 请参考 [setPositionUpdateFrequency](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoRangeAudio/setPositionUpdateFrequency.html)

2. 拉流接口增加 CDN Plus 拉流配置项

    注意：若希望通过地区、用户等更多维度，从云端控制拉流方式，请联系 ZEGO 技术支持进行相关配置。

    拉流接口新增 CDNPlus 的拉流资源模式（ZegoStreamResourceMode），开发者可按流维度自行开启使用 CDNPlus 拉流。CDN Plus 拉流是比 CDN 拉流直播质量更高，但是价格接近 CDN 的一种性价比高的拉流方式，详情请参考 <a href="/live-streaming-android/introduction/overview" target="_blank" rel="noopener noreferrer">CDN Plus 拉流</a>。

    相关 API 请参考 [startPlayingStream](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePlayer/startPlayingStream.html)

**改进优化**

1. 优化开启强制登录鉴权时，Token 异常的相关错误码

    新增 1002074、1002075、1002076、1002077、1002078、1002079、1002080 等错误码。开启强制登录鉴权后，如果 Token 错误时，会返回这些错误码，详情请参考 [常见错误码](https://doc-zh.zego.im/article/5641) 中的详细解释和处理建议。

2. 实时合唱人声伴奏对齐优化

    优化了 KTV 实时合唱场景中，人声和伴奏对齐能力。避免当客户端同时推人声和伴奏两条流时，因为设备播放的延迟，导致人声和伴奏不对齐，造成的体验下降。

**问题修复**

1. 修复一个 L3 拉流失败的问题

    修复 2.20.0 ~ 2.20.2 版本 SDK 采用 L3 拉流时，如果拉到的流是 2.15.0 及之前版本 SDK 推送的流，可能会失败的问题。

2. 修复一些自定义音频采集相关的错误


---


## 2.21.0-prerelease.1 版本

**发布日期：2022.07.04**

**新增功能**

1. 支持使用 Flutter 框架开发 Web 程序



---


## 2.20.2 版本 <a id="2.20.2"></a>

**发布日期：2022.06.20**

**问题修复**

1. 修复了一个概率性拉流失败的问题

2. 修复了在初始化 SDK 前，设置音频设备模式不生效的问题



---


## 2.20.0 版本 <a id="2.20.0"></a>

**发布日期：2022.06.16**


**新增功能**

1. 媒体播放器支持设置声道

    在调用 [createEngine](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngine/createEngine.html) 接口初始化引擎以及 [createMediaPlayer](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngineMediaPlayer/createMediaPlayer.html) 接口创建媒体播放器后，可以调用 [setActiveAudioChannel](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoMediaPlayer/setActiveAudioChannel.html) 接口设置左声道、右声道或全部声道。初始化时，媒体播放器默认为全部声道。

    相关 API 请参考 [setActiveAudioChannel](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoMediaPlayer/setActiveAudioChannel.html)

2. 支持线性调整的音量增益

    注意：如需使用该功能，请联系 ZEGO 技术支持。

    提供新的音量增益方式，开发者可以根据实际需求选择合适的音量增益方式。

3. 支持设置流级别的音视频自动审核

    注意：如需使用该功能，请联系 ZEGO 技术支持开通后台服务。

    在调用 [startPublishingStream](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePublisher/startPublishingStream.html) 接口开始推流时，开发者可以设置 “ZegoStreamCensorshipMode” 参数，进行流级别的音视频自动审核，包含如涉黄、涉政等审核类型，以此降低开发者的接入难度和业务维护成本。

    相关 API 请参考 [startPublishingStream](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePublisher/startPublishingStream.html)

**改进优化**

1. 开发者传入不存在的 AppID 时报错的错误码从 1002099 优化为 1001004

2. 优化回声消除，解决 KTV 等场景的吞音现象

3. 新增 1009013 错误码

    表示消息输入长度超出限制。出现此错误码时，请检查输入内容长度或联系 ZEGO 技术支持扩展消息内容长度。

4. 新增 1017009 错误码

    在版权音乐初始化时，由于未设置 AppSign 或 Token，导致鉴权失败，会出现此错误码。此时，如果是使用 AppSign 鉴权，请在初始化 SDK 时传入 AppSign；如果是使用 Token 鉴权，在调用 [initCopyrightedMusic](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoCopyrightedMusic/initCopyrightedMusic.html) 接口前，请调用 [loginRoom](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngineRoom/loginRoom.html) 接口并传入 Token，以供鉴权。

    相关 API 请参考 [initCopyrightedMusic](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoCopyrightedMusic/initCopyrightedMusic.html), [loginRoom](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngineRoom/loginRoom.html)

**问题修复**

1. 修复了自定义采集 AAC 音频格式的报错问题



---



## 2.19.0 版本 <a id="2.19.0"></a>

**发布日期：2022.05.23**


**新增功能**

1. 直推 CDN 的流支持通过 L3 拉流

    直推 CDN 时，在不改变推流方式的情况下，SDK 从客户的 CDN 源站拉流，通过 L3 将音视频内容分发给观众，通过 [ZegoResourceType] 控制源站资源。该功能常用于直播场景。

    相关 API 请参考 [startPlayingStream](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePlayer/startPlayingStream.html)

2. 音视频场景下支持 SEI 数据随音频帧同步

    注意：目前只支持 RTC 场景，直推 CDN 和转推 CDN 场景下无效。

    从 2.19.0 版本开始，支持在音视频场景下将 SEI（媒体补充增强信息）与音频帧同步发送。该功能常用于 SEI 与音频强相关的视频场景，例如实时 KTV。

    在 2.19.0 之前版本中，SEI 数据是跟随视频帧数据一起发送，一般情况下视频帧率远低于音频帧率，导致混流对齐、伴奏对齐场景下等 SEI 精度/频率不足。

    相关 API 请参考 [onPlayerRecvAudioSideInfo](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngine/onPlayerRecvAudioSideInfo.html), [sendAudioSideInfo](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePublisher/sendAudioSideInfo.html)

**改进优化**

1. 为了提高安全性，此版本将 curl 升级到 7.82.0

**问题修复**

1. 修复了调用网络测速接口后立刻调用开始推流接口时，收不到网络测速回调的问题

2. 修复了特定安卓机型和特定蓝牙耳机搭配使用的情况下，开启采集时导致通话音量由蓝牙变成扬声器外放的问题

3. 修复了 iOS 无法在模拟器上运行的问题



---


## 2.18.0 版本 <a id="2.18.0"></a>

**发布日期：2022-04-28**


**新增功能**

1. 新增 AI 降噪功能

    <Warning title="注意">


    AI 降噪目前会对麦克风采集的音乐有较大损伤，包括人通过麦克风唱歌的声音。如需使用该功能，请联系 ZEGO 技术支持。

    </Warning>




    AI 降噪指的是 SDK 会对麦克风采集的声音进行降噪处理，在原有的稳态噪声正常处理的情况下，还会处理非稳态噪声，主要包括鼠标、键盘声、敲击、空调、厨房碗碟、嘈杂餐厅、环境风声、咳嗽、吹气 等非人声噪声。通过 [setANSMode] 接口中的 “ZegoANSMode” 参数设置 AI 降噪模式，并且可以实时调整降噪模式。

    该功能常用于通话、会议等没有背景音乐的场景，例如普通音质语聊房、语音会议、语音开黑、一对一视频通话。

    相关 API 请参考 [setANSMode](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePreprocess/setANSMode.html)

2. 支持设置音效的播放速度

    开始播放音效后， 调用 [SetPlaySpeed] 接口可以对音效设置四种播放速度（会同时设置本地播放速度和推流速度），分别为 0.5 倍速、原始速度、1.5 倍速和 2 倍速，默认为原始速度。

    相关 API 请参考 [SetPlaySpeed](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoAudioEffectPlayer/setPlaySpeed.html)

3. CDN 直播时支持使用 QUIC 协议推拉流

    QUIC 协议推拉流主要用于改善弱网环境下 CDN 直播质量不稳定的情况，但是改善有限，推荐使用低延时直播，享受高质量且低延时的直播服务。当前支持使用腾讯、网宿两家 CDN 直播产品的 QUIC 协议推流及拉流。

    通过 [enablePublishDirectToCDN] 接口中的 “ZegoCDNConfig” 参数配置推流协议和 QUIC 版本，若想进行 QUIC 协议的自定义 CDN 拉流，需要通过 [startPlayingStream] 中的 “ZegoPlayerConfig“ 参数配置拉流协议和 QUIC 版本。

    相关 API 请参考 [enablePublishDirectToCDN](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePublisher/enablePublishDirectToCDN.html)

4. 支持监听推拉流的地址和协议相关信息

    发起推流后，可以通过 [onPublisherStreamEvent] 回调实时监听推流状态，该回调会返回当前使用的推流地址、资源类型和协议相关信息。

    发起拉流后，可以通过 [onPlayerStreamEvent] 回调实时监听拉流状态，该回调会返回当前使用的拉流地址、资源类型和协议相关信息。

    相关 API 请参考 [onPublisherStreamEvent](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngine/onPublisherStreamEvent.html), [onPlayerStreamEvent](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngine/onPlayerStreamEvent.html)

5. 支持通过 URL 设置混流水印和混流的输入音量

    调用 startMixerTask 开启或更新混流任务，支持通过 “inputVolume” 分别设置混流输入音量。

    相关 API 请参考 [startMixerTask](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngineMixer/startMixerTask.html)

6. 新增房间状态变化通知 [onRoomStateChanged]

    当房间的连接状态发生变化时会触发 [onRoomStateChanged] 回调，通过“ZegoRoomStateChangedReason” 参数提供更加详细的连接状态及状态变化原因。

    相关 API 请参考 [onRoomStateChanged](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngine/onRoomStateChanged.html)

**改进优化**

1. 完善开始混流接口 [startMixerTask] 返回的错误码

    新增 1005000 错误码，表示未开通混流服务。出现此错误码时，请在 [ZEGO 控制台](https://console.zego.im) 自助开通混流服务（开通步骤请参考 [项目管理 - 服务配置](/console/service-configuration/enable-stream-mixing-service) 中的“混流”），或联系 ZEGO 技术支持开通。

    相关 API 请参考 [startMixerTask](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngineMixer/startMixerTask.html)

**问题修复**

1. 修复了某些平台使用 boringssl 加解密异常的问题

2. 修复了硬编失败后未快速回滚软编的问题

3. 修复了在使用 Android v2 embedded 时，android plugin binding 没有释放导致的内存泄漏问题

4. 修复了 iOS texture renderer 的临时 pixel buffer 引用未在销毁时释放导致的内存泄漏问题



---

## 2.17.2 版本 <a id="2.17.2"></a>

**发布日期：2022-04-15**

**问题修复**

1. 修复了日志上报时，日志文件收集异常的问题

2. 修复了部分手机的回声消除问题

---
## 2.17.1 版本 <a id="2.17.1"></a>

**发布日期：2022-03-18**

**新增功能**

1. 支持稳态语音设置检测周期参数

    稳态语音默认检测周期为 3 秒，用户如需修改默认检测周期，可通过 [startAudioVADStableStateMonitor] 接口自定义检测周期参数。

    相关 API 请参考 [startAudioVADStableStateMonitor](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngineDevice/startAudioVADStableStateMonitor.html)


2. 范围语音新增隐秘小队模式

    新增枚举 [ZegoRangeAudioModeSecretTeam] 隐秘小队模式。在该模式下，同一房间下的用户，收听者既能与同一小队的人交流，也能听到所有在音频接收范围内且为全世界模式发声者的声音，如太空狼人杀游戏场景。

    相关 API 请参考 [setRangeAudioMode](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoRangeAudio/setRangeAudioMode.html)


3. 新增调试助手功能

    注意：该功能仅在开发阶段使用，请勿在线上版本开启此功能。

    新增 [enableDebugAssistant] 接口，开发者调用该接口开启调试助手功能，SDK 将会打印日志到控制台，并且在 SDK 其他接口的调用出现异常时，UI 会弹窗提示错误。

    相关 API 请参考 [enableDebugAssistant](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngine/enableDebugAssistant.html)


**改进优化**

1. 优化了鉴权方式

    2.17.1 及以上版本，在创建引擎时将 AppSign 传空或不传，并且在登录房间时必须传入 Token，鉴权通过后即可使用实时音视频功能，具体请参考 [使用 Token 鉴权](/real-time-video-flutter/communication/using-token-authentication)。

    2.17.1 以下版本，在创建引擎时传入 AppSign，鉴权通过后即可使用实时音视频功能。

    相关 API 请参考 [createEngineWithProfile](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngine/createEngineWithProfile.html), [loginRoom](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngineRoom/loginRoom.html)

**问题修复**

1. 修复了字符串类型的参数命名长度超长时可能导致崩溃的问题

2. 修复了当推流端 App 从后台返回前端时，拉流端收不到卡顿结束事件 BreakResume 的问题

3. 修复了其他已知问题

4. 修复了在 32 位机器下推实时音频流失败的问题



---


## 2.16.0 版本 <a id="2.16.0"></a>

**发布日期：2022-02-17**

**新增功能**


1. 游戏语音支持设置是否接收指定用户的音频数据

    游戏语音模块新增 [muteUser] 接口，本地用户可以根据需要，在初始化游戏语音 [createRangeAudio] 之后，通过 [muteUser] 接口设置是否接收指定远端用户的音频数据。

    该功能常用于游戏场景，例如发声者被墙壁阻挡，则听众不需要接收该声音。

    相关 API 请参考 [muteUser](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoRangeAudio/muteUser.html)

2. 拉流质量回调 [onPlayerQualityUpdate] 中新增 MOS 音质评分

    [onPlayerQualityUpdate] 回调新增 “mos” 参数，表示对拉流音质的评分。开发者对音频质量比较关注时，可通过该参数了解当前音频的质量情况。

    <Frame width="auto" height="auto" >
      <img src="https://doc-media.zego.im/sdk-doc/Pics/Common/mos.png" />
    </Frame>
    相关 API 请参考 [onPlayerQualityUpdate](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngine/onPlayerQualityUpdate.html)

3. 支持基于 rtmp over quic 协议推流

    注意：如需使用该功能，请联系 ZEGO 技术支持。

    为了在弱网环境下让推流端可以推更优质的音频流，SDK 支持基于 rtmp over quic 协议来推流。

    该功能常用于单主播直推 CDN、直播 PK 场景。



**改进优化**


1. Android SDK 最低支持的操作系统版本从 Android 4.1 变更为 Android 4.4

    从此版本开始 Android SDK 支持的 API 级别要求不低于 19，最低支持的操作系统版本从 Android 4.1 变更为 Android 4.4，如需支持 Android 4.1，请联系 ZEGO 技术支持。

2. 8.0 以上版本的 Android 系统支持获取 CPU 的使用率

3. 优化 NTP 时间误差

    调用 [getNetworkTimeInfo] 接口获取同步网络时间信息时，SDK 会定时更新 NTP 时间，减少获取到的 NTP 时间误差。

    相关 API 请参考 [getNetworkTimeInfo](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngineUtilities/getNetworkTimeInfo.html)


    ** 问题修复**


4. 修复了同时调用 [loginRoom] 和 [startPublishingStream] 接口时，对端有概率出现收不到流新增通知的问题

5. 修复了用户无法接收到登录房间前该房间内其他用户发送的房间附加消息的问题

6. 修复已知问题



---


## 2.15.0 版本 <a id="2.15.0"></a>

**发布日期：2021-12-15**

**新增功能**


1. 媒体播放器支持播放音乐时获取声浪和频谱

    媒体播放器新增声浪频谱回调和开关接口，可以控制是否开启回调以及回调的频率，从而获取媒体播放器当前的声浪和频谱。在通过媒体播放器播放资源，如一起看电影、游戏语聊房场景时，通过该功能可以做频谱动画的功能，增加趣味性。

    创建媒体播放器后，调用 [enableSoundLevelMonitor] 接口可以开启声浪监听，开启后可以通过 [onMediaPlayerSoundLevelUpdate] 回调监听声浪的变化。

    创建媒体播放器后，调用 [enableFrequencySpectrumMonitor] 接口可以开启频谱监听，开启后可以通过 [onMediaPlayerSoundLevelUpdate] 回调监听频谱的变化。

    相关 API 请参考 [enableSoundLevelMonitor](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoMediaPlayer/enableSoundLevelMonitor.html), [onMediaPlayerSoundLevelUpdate](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngine/onMediaPlayerSoundLevelUpdate.html), [enableFrequencySpectrumMonitor](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoMediaPlayer/enableFrequencySpectrumMonitor.html), [onMediaPlayerFrequencySpectrumUpdate](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngine/onMediaPlayerFrequencySpectrumUpdate.html)


2. 支持全方位虚拟立体声

    新增支持全方位虚拟立体声，将单声道的声音，通过算法处理，模拟成立体感的声音。该功能常用于 KTV 场景中，可以使唱歌的声音更加有立体感。

    当调用 [enableVirtualStereo] 接口，将 angle 参数设置为 -1 时，表示立体声效果为全方位立体声。

    相关 API 请参考 [enableVirtualStereo](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePreprocess/enableVirtualStereo.html)


3. 新增本地设备异常回调 [onLocalDeviceExceptionOccurred]

    通过 [onLocalDeviceExceptionOccurred] 回调可以设置要检测的设备类型，如摄像头、扬声器、麦克风等，开发者可以根据不同设备类型的错误回调进行相应的处理。

    相关 API 请参考 [onLocalDeviceExceptionOccurred](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngine/onLocalDeviceExceptionOccurred.html)


**改进优化**

1. 新增 1015032 错误码

    登录房间导致网络测试停止，由于网络测试会占用带宽，请在登录房间之前进行。


2. 新增 1002066 错误码

    用户登录房间时如果在服务器黑名单中，则会返回此错误码，表示禁止登录房间。


3. 新增 1004072 错误码

    当使用 SDK 拉低延迟直播流时，若您未开通低延迟直播服务，则会返回此错误码。


**问题修复**

1. 修复了调用 [startMixerTask] 可能出现崩溃的问题


**废弃删除**

1. 废弃 [onDeviceError] 回调

    为了让开发者直观的了解出现异常的设备类型以及具体的异常情况，在 2.15.0 及以上版本废弃了 [onDeviceError] 回调，请使用 [onLocalDeviceExceptionOccurred] 回调代替。

    相关 API 请参考 [onLocalDeviceExceptionOccurred](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngine/onLocalDeviceExceptionOccurred.html)


---


## 2.14.0 版本 <a id="2.14.0"></a>

**发布日期：2021-11-30**

**新增功能**


1. 新增实时有序数据功能

    开发者在需要做远程控制、云游戏等指令分发时，通过实时信令，可以低延迟获取发布端消息。

    相关 API 请参考 [createRealTimeSequentialDataManager](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngineIM/createRealTimeSequentialDataManager.html)


2. 新增 H.265 编解码异常通知

    新增 H.265 解码性能不足的告警回调，在通过 CDN 拉流的场景下，用于提示用户是否做降级处理。如果开发者在拉 H.265 流的过程中收到低帧率回调 [onPlayerLowFpsWarning]，建议开发者停止拉 H.265 流，转拉 H.264 流。

    推流状态回调 [onPublisherStateUpdate] 和拉流状态回调 [onPlayerStateUpdate] 中新增了 H.265 编解码错误提示。

    相关 API 请参考 [onPlayerLowFpsWarning](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngine/onPlayerLowFpsWarning.html), [onPublisherStateUpdate](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngine/onPublisherStateUpdate.html), [onPlayerStateUpdate](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngine/onPlayerStateUpdate.html)

3. 媒体播放器支持在加载媒体资源时指定开始播放进度

    媒体播放器新增 [loadResourceWithPosition] 接口，支持加载媒体资源时指定开始播放进度，单位为毫秒。

    相关 API 请参考 [loadResourceWithPosition](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoMediaPlayer/loadResourceWithPosition.html)


4. 新增开启或关闭拉流对齐功能

    该功能常用于 KTV 等需要混流对齐的场景，当拉流端播放时，通过 [setPlayStreamsAlignmentProperty] 接口控制播放的实时音视频流是否需要精准对齐。若需要，则拉取的所有流中包含精准对齐参数的会进行对齐；若不需要，则所有流都不对齐。

    相关 API 请参考 [setPlayStreamsAlignmentProperty](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePlayer/setPlayStreamsAlignmentProperty.html)


5. 新增稳态语音检测功能

    通过该功能可以判断一定时间内是否有人对着麦克风说话，用于检测采集后或音频前处理后的音频数据是人声还是噪声。

    相关 API 请参考 [startAudioVADStableStateMonitor](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngineDevice/startAudioVADStableStateMonitor.html), [stopAudioVADStableStateMonitor](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngineDevice/stopAudioVADStableStateMonitor.html), [onAudioVADStateUpdate](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngine/onAudioVADStateUpdate.html)


**改进优化**

1. 可空参数改为可选参数

    - 2.14.0 之前版本：如下接口的可空参数，即使为空，调用时也仍需传入 null。
    - 2.14.0 及以上版本：如下接口的可空参数改为可选参数，值为空时可不传入，值非空时参入需要带上参数名。

    相关 API 请参考 [ZegoEngineConfig](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoEngineConfig/ZegoEngineConfig.html), [ZegoEngineProfile](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoEngineProfile/ZegoEngineProfile.html), [ZegoPublisherConfig](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoPublisherConfig/ZegoPublisherConfig.html), [ZegoCanvas](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoCanvas/ZegoCanvas.html), [ZegoVideoConfig](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoVideoConfig/ZegoVideoConfig.html), [ZegoPlayerConfig](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoPlayerConfig/ZegoPlayerConfig.html), [ZegoMixerInput](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoMixerInput/ZegoMixerInput.html)

2. 优化了 [ZegoMixerOutput]

    [ZegoMixerOutput] 的 videoConfig 改为可选参数，不需要单独配置 videoConfig 时可不传。

    相关 API 请参考 [ZegoMixerOutput](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoMixerOutput/ZegoMixerOutput.html)


---


## 2.13.0 版本 <a id="2.13.0"></a>

**发布日期：2021-11-17**

**新增功能**

1. Flutter 的功能已对齐 Native SDK [2.13.0](/real-time-video-android-java/client-sdk/release-notes) 版本

    支持基础推拉流、登录多房间、房间实时消息、音视频直播、3A 处理、CDN 直推转推、混流、媒体播放器、音效播放器、游戏语音、流量控制、用户控制权限等功能，详情请参考 [概述](/real-time-video-flutter/introduction/overview)。

    暂不支持定义视频采集、自定义视频渲染、自定义视频前处理、混音功能。

    相关 API 请参考 [客户端 API](https://doc-zh.zego.im/article/3550)


**改进优化**

1. 去测试环境

    为了降低开发者对环境的理解成本，ZEGO 已统一环境概念，从该版本开始，废弃了测试环境，统一使用正式环境。在 2.13.0 版本之前已接入过 SDK 的开发者，可以参考 [测试环境废弃说明](https://doc-zh.zego.im/article/12997) 进行 SDK 升级及代码调整。

    相关 API 请参考 [createEngineWithProfile](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngine/createEngineWithProfile.html)


**废弃删除**

1. 废弃旧的 [createEngine] 接口

    为了降低开发者对环境的理解，废弃了掉测试环境，统一使用环境。在 2.13.0 及以上版本废弃了原有的 [createEngine] 接口，请使用 [createEngineWithProfile] 接口代替。

    相关 API 请参考 [createEngine](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngine/createEngine.html)
