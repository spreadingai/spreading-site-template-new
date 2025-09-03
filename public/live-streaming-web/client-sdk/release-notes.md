# 发布日志

- - -

## 3.10.0 版本 <a id="3.10.0"></a>

**发布日期：2025-07-09**

**新增功能**

1. 场景化音视频配置新增卡拉 OK (KTV) 场景

    场景化音视频配置新增卡拉 OK (KTV) 场景，适用于实时合唱、在线 K 歌场景，保障了多人合唱时精准对齐和超低时延，详情请参考 [场景化音视频配置](/live-streaming-web/quick-start/scenario-based-audio-video-configuration)。

    相关 API 请参考 [setRoomScenario](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#set-room-scenario)

**改进优化**

1. 优化卡顿率计算

    优化卡顿率计算规则，推流端生成 B 帧情况下导致的拉流卡顿将不会被算入拉流卡顿时长，避免与网络导致的卡顿混淆。

**问题修复**

1. 修复拉流端拉空流被误判为卡顿的问题。
2. 修复在 iOS 16.0 - 16.7 系统的微信浏览器中，设备接听微信电话后返回页面时，拉流声音可能无法自动恢复播放的问题。
3. 修复火狐浏览器在 140 版本以上 WebRTC 生成的 SDP 异常导致推流失败的问题。
4. 修复 SDK 其他已知问题。

---

## 3.9.0 版本 <a id="3.9.0"></a>

**发布日期：2025-04-11**

**新增功能**

1. 所有网络请求支持 IPv6 协议

    <Warning title="注意">


    如需使用该功能，请联系 ZEGO 技术支持。

    </Warning>



    SDK 新增对 IPv6 协议的支持。开发者可以定网络请求优先采用 IPv6 协议还是 IPv4 协议。默认情况下，SDK 优先采用 IPv4 协议。

2. 支持单流转码功能

    <Warning title="注意">


    如需使用该功能，请联系 ZEGO 技术支持。

    </Warning>



    单流转码，指在云端将单条原始流转换为不同编码格式、不同分辨率的转码流。在直播等场景中，观众可以基于接入网络质量、终端设备等，自行选择不同分辨率的流进行观看，以保证播放的流畅性。详情请参考 [单流转码](https://doc-zh.zego.im/article/21539)。

    相关 API 请参考 [ZegoWebPlayOption > codecTemplateID](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoWebPlayOption#custom-resource-config)

**改进优化**

1. 优化均衡型 AI 降噪模式的性能

    针对单声道场景，均衡模式 AI 降噪功耗减少 50%

    相关 API 请参考 [setAiDenoiseMode](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#set-ai-denoise-mode)、[enableAiDenoise](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#enable-ai-denoise)

2. 优化错误码

    对异常错误码进行了更精细的分类，修改了部分现有错误码的逻辑，调整如下：

    | 新错误码 | 原错误码 | 错误描述 |
    | --- | --- | --- |
    | 1002014 | 1100001 | <ul><li>说明：[setRoomExtraInfo](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#set-room-extra-info) 函数输入的 roomID 校验错误。</li><li>处理建议：请检查相关参数。</li></ul> |
    | 1002015 | 1100001 | <ul><li>说明：[setRoomExtraInfo](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#set-room-extra-info) 函数输入的房间附加信息 key 长度大于或等于 128 字节。</li><li>处理建议：请检查相关参数长度。</li></ul> |
    | 1002016 | 1100001 | <ul><li>[setRoomExtraInfo](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#set-room-extra-info) 函数输入的房间附加信息 value 长度大于或等于 128 字节。</li><li>处理建议：请检查相关参数长度。</li></ul> |
    | 1002037 | 1002001 | <ul><li>同时登录的房间总数量超过限制。</li><li>可能原因：同时登陆过多房间。</li><li>处理建议：联系 ZEGO 技术支持人员。</li></ul> |
    | 1003028 | 1103027 | <ul><li>房内已有相同的流导致推流失败。</li><li>可能原因：房间内已有相同的流。</li><li>处理建议：更换新的流 ID。调整流名生成策略，保证唯一性。</li></ul> |
    | 1003040 | 1000055 | <ul><li>更新转推 CDN 状态失败。</li><li>可能原因：转推地址 URL 不正确。</li><li>处理建议：检查输入的 URL 是否有效。</li></ul> |
    | 1004025 | 1104039 | <ul><li>说明：拉流失败。</li><li>可能原因：该流被后台系统配置为禁止推送。</li><li>处理建议：请联系技术支持解决。</li></ul> |
    | 1009005 | 1000002 | <ul><li>发送消息的目标房间与当前登录的房间不一致。</li><li>可能原因：发消息时使用错误的房间 ID 。</li><li>处理建议：请传入当前登录的房间 ID。</li></ul> |
    | 1009015 | 1109001 | <ul><li>发送房间广播消息失败。</li><li>可能原因：QPS 超过限制。</li><li>处理建议：控制最大 QPS 为 2。</li></ul> |

**问题修复**

1. 修复偶现的登录房间耗时过长问题

2. 修复偶现的自定义音频采集没有声音的问题

3. 修复偶现的编码帧率配置不生效问题

4. 修复了用户退出未登录的房间时没有接收到 roomStateChanged 回调的问题

---

## 3.8.0 版本 <a id="3.8.0"></a>

**发布日期：2025-02-12**

**新增功能**

1. 流控策略支持弱网时优先保障音频体验

    推流时新增 [ZegoWebPublishOption > trafficControlMinVideoMode](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoWebPublishOption#traffic-control-min-video-bitrate) 配置项，当用户网络质量较差无法流畅推送音视频时（默认 [ZegoWebPublishOption > trafficControlMinVideoBitrate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoWebPublishOption#traffic-control-min-video-bitrate) 小于 50kbps，也可自行设置阈值），SDK 将自动切换至纯音频推流模式，优先保障音频流畅性。当用户网络质量改善后，SDK 将自动恢复音视频推流。该功能适用于教育以及会议场景，确保通话清晰流畅。

    相关 API 请参考 [ZegoWebPublishOption > trafficControlMinVideoMode](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoWebPublishOption#traffic-control-min-video-bitrate)

2. 支持获取麦克风采集到的音频原始数据（PCM）

    支持通过 [setCaptureAudioFrameCallback](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#set-capture-audio-frame-callback) 回调接口获取麦克风采集到的原始音频数据，数据格式为 PCM。

    相关 API 请参考 [setCaptureAudioFrameCallback](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#set-capture-audio-frame-callback)

3. 新增音视频轨道更新回调

    当业务需要自定义渲染本地音视频时，可监听本地音视频轨道变化，及时获取最新音视频轨道对象，适用于监听音视频采集与前处理阶段。

    相关 API 请参考 [videoTrackChanged](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoLocalStreamEvent#video-track-changed)、[audioTrackChanged](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoLocalStreamEvent#audio-track-changed)、[captureVideoTrackChanged](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoLocalStreamEvent#capture-video-track-changed)、[captureAudioTrackChanged](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoLocalStreamEvent#capture-audio-track-changed)

4. 支持初始化 SDK 前，获取 SDK 版本号

    支持初始化 SDK 前，获取 SDK 版本号，以匹配前置的业务数据上报时机。

    相关 API 请参考 [ZegoExpressEngine > version](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#version)

5. 新增编码兼容策略，设备异常时自动切换编码格式

    <Warning title="注意">


    - 如需使用该功能，请联系 ZEGO 技术支持设置。
    - 使用该功能时，业务需要注意拉流端对 H.264、VP8 的编码兼容，例如微信小程序仅支持 H.264。

    </Warning>



    若识别到当前设备不支持当前编码格式，或编码过程中出现编码异常时，支持自动切换编码。目前默认支持 H.264 编码，当设备不支持 H.264 编码时，切换为 VP8。

    相关 API 请参考 [ZegoWebPublishOption > enableAutoSwitchVideoCodec](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoWebPublishOption#traffic-control-min-video-bitrate)、[publisherVideoEncoderChanged](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoRTCEvent#publisher-video-encoder-changed)


**改进优化**

1. 优化音视频采集接口逻辑

    使用 [startCaptureCamera](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoLocalStream#start-capture-camera)、[startCaptureMicrophone](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoLocalStream#start-capture-microphone) 等采集接口，但未传入音视频相关参数时，SDK 将使用 [ZegoLocalStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoLocalStream) 中，已配置的音视频配置参数（以最后一次配置值的为准），若未配置相关参数，将会使用 SDK 默认配置。


**问题修复**

1. 修复在获取版权音乐抢唱片段歌曲信息的开始和结束时间点时，可能出现错误的问题。

2. 修复在 nuxt3 、uni-app Vue3、vite5、Nextjs15 turbopack 中引入 SDK 后，由于框架兼容问题，可能出现编译报错的问题。

3. 修复不登录房间的情况下，调用 [ZegoExpressPlayer > verify](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressPlayer#verify) 会出现鉴权失败的问题。

---
## 3.7.4 版本 <a id="3.7.4"></a>

**发布日期：2024-11-15**

**新增功能**

1. 新增拉流音轨和视轨更新回调

    新增拉流音轨（[playerAudioTrackUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoRTCEvent#player-audio-track-update)）和视轨（[playerVideoTrackUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoRTCEvent#player-video-track-update)）更新回调。通过该回调获取拉流的音轨和视轨，然后根据需求进行音频和视频的渲染处理。

    <Note title="说明">


    如果没有对音视频渲染特殊处理的需求，不建议使用该回调，大部分场景推荐用 [ZegoStreamView](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoStreamView) 进行渲染。

    </Note>






**问题修复**

1. 修复拉流端使用 `video` 标签渲染媒体流时，在推流端开关摄像头（[enableVideoCaptureDevice](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#enable-video-capture-device)）或开关视频（[mutePublishStreamVideo](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#mute-publish-stream-video)）操作后，拉流端视频画面会出现黑屏无法恢复的问题

2. 修复调用 [setEffectsBeauty](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#set-effects-beauty) 开启美颜成功后，美颜视轨还没有输出就触发回调的问题

3. 修复其他已知问题

---



## 3.7.1 版本 <a id="3.7.1"></a>

**发布日期：2024-10-29**

**新增功能**

1. 支持快速切换房间

    支持通过 [switchRoom](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#switch-room) 接口，快速便捷地实现切换房间的功能。
    - 切换房间默认会停止当前房间的所有推流和拉流， 但不会停止预览。如果要停止预览，可调用  [destroyStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#destroy-stream)  停止预览。如需不停止拉流，可联系 ZEGO 技术支持进行设置。
    - 如果设置了 CDN 手动转推，切换房间时不会自动停止，需要用户调用 [removePublishCdnUrl](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#remove-publish-cdn-url) 手动停止 CDN 转推。


    相关 API 请参考 [switchRoom](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#switch-room)


2. 推流端支持流量控制功能


    推流前支持通过  [enableTrafficControl](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoWebPublishOption#enable-traffic-control)  开启流量控制，适应当前网络环境及网络波动，以实现自适应码率 ，从而保证音视频能流畅推送。同时支持通过[trafficControlMinVideoBitrate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoWebPublishOption#traffic-control-min-video-bitrate) 参数，设置视频最小码率，详情请参考 [流量控制文档](https://doc-zh.zego.im/article/21303)。

    相关 API 请参考：[enableTrafficControl](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoWebPublishOption#enable-traffic-control)、[trafficControlMinVideoBitrate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoWebPublishOption#traffic-control-min-video-bitrate)

3. 新增超低延迟播放功能

    在 RTC 拉流时，支持设置通过  [ZegoWebPlayOption  > enableLowLatency](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoWebPlayOption#enable-low-latency) 参数，开启超低延迟播放 ，当开启超低延迟播放后，此时优先保障低延迟，但弱网时可能产生卡顿。

    相关 API 请参考：[ZegoWebPlayOption  > enableLowLatency](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoWebPlayOption#enable-low-latency)

4. 支持设置拉流缓冲时间

    在网络状况不佳等场景，支持设置 [ZegoWebPlayOption > jitterBufferTarget](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoWebPlayOption#jitter-buffer-target)  参数，用于设置拉流音视频播放延迟缓冲时间，以减少卡顿。

    - 当  [ZegoWebPlayOption > enableLowLatency](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoWebPlayOption#enable-low-latency) 为 `true` 时，此参数无效。
    - 该功能会增大延迟，请结合业务场景谨慎使用。

    相关 API 请参考： [ZegoWebPlayOption > jitterBufferTarget](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoWebPlayOption#jitter-buffer-target)

5. 支持自定义观众上麦前和下麦后的拉流资源类型

    支持分别设置观众在上麦前和下麦后的拉流资源类型，使拉流方式更灵活。例如，在某直播连麦场景中，观众可在拉流时通过设置 [ZegoCustomPlayerResourceConfig](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoCustomPlayerResourceConfig)  的 `beforePublish` 为 L3 拉流、 `publishing`为 RTC 拉流、 `afterPublish` 为 L3 拉流，则此观众在上麦时拉 RTC 流，下麦后自动拉 L3 流。

    相关 API 请参考：[startPlayingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#start-playing-stream)、[ZegoWebPlayOption > customResourceConfig](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoWebPlayOption#custom-resource-config)



6. 支持在初始化引擎之前设置日志等级

    支持在初始化引擎之前设置日志等级，以减少浏览器控制台打印的日志。

    相关 API 请参考：[presetLogConfig](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#preset-log-config)

7. 新增推拉流鉴权失败错误码

    新增拉流鉴权错误码（1104046）及 推流鉴权错误码（1103019 ）。开启推流或拉流鉴权时，设置的 [ZegoWebPublishOption > streamParams](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoWebPublishOption#stream-params) 参数不正确会导致鉴权失败，详情请参考 [错误码文档](https://doc-zh.zego.im/article/16049)。



**问题修复**


1. 修复 [roomStateChanged](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoRTMEvent#room-state-changed) 首次回调状态错误的问题

---


## 3.6.0 版本 <a id="3.6.0"></a>

**发布日期：2024-08-23**

**新增功能**

1. 混流中输入流的图片资源，支持设置显示时机

    注意：如需显示图片资源，需保证 [ZegoMixerImageInfo > url](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoMixerImageInfo#url) 传入有效的图片地址。

    为混流设置图片内容时，支持通过 [ZegoMixerImageInfo > displayMode](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoMixerImageInfo#display-mode) 设置图片的显示时机，`displayMode` 具体配置如下：
    - 取值为 0：默认值。当 [ZegoMixerImageInfo > url](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoMixerImageInfo#url) 不为空时，显示图片。
    - 取值为 1：参考摄像头的开关状态，摄像头关闭则显示图片，反之则显示视频。
    - 取值为 2：参考输入流的视频数据有无，连续 3 秒无视频数据时显示图片，反之则显示视频。视频数据判断为空时长默认为 3 秒，若需额外配置，请联系 ZEGO 技术支持。

    相关 API 请参考 [ZegoMixerImageInfo > displayMode](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoMixerImageInfo#display-mode)


**改进优化**

1. 优化 SDK 包体积大小

    优化内部代码结构，减小 SDK 包体积

**废弃删除**

1. 废弃拉流接口中关于 CDN Plus 的配置

    下架畅直播概念，废弃 CDN Plus 直播相关接口。如需实现直播功能，推荐使用 ZEGO 自研 [超低延迟直播产品](https://doc-zh.zego.im/article/16015)，实现更高质量的直播体验。

    相关 API 请参考 [ZegoWebPlayOption > resourceMode](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoWebPlayOption#resource-mode)

---

## 3.5.0 版本 <a id="3.5.0"></a>

**发布日期：2024-06-17**

**新增功能**


1. 新增自动混流功能

    注意：
    - 目前仅支持房间内全部为音频流时，开启自动混流。
    - 在同一个房间内开启下一个自动混流任务前，请先调用  [stopAutoMixerTask](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#stop-auto-mixer-task)  接口结束上一次自动混流任务，以免造成当一个主播已经开启下一个自动混流任务与其他主播混流时，观众依然在拉上一个自动混流任务的输出流的情况。
    - 若用户未主动结束当前自动混流任务，该任务将在房间不存在后，或者输入流持续 90 秒不存在后，自动结束。

    SDK 可以指定房间开启自动混流任务，由 ZEGO 实时音视频服务器自动将房间内的所有音频流进行混流（目前只支持混音频流），常用于语聊房、合唱场景下。该功能可以将麦上主播的流混合之后给麦下观众，从而提升观众的观看体验，并且节省流量，详情请参考 [混流](https://doc-zh.zego.im/article/16061)。

    相关 API 请参考 [startAutoMixerTask](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#start-auto-mixer-task)、[stopAutoMixerTask](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#stop-auto-mixer-task)

2. 混流功能新增功能配置及状态回调

    注意：新版本 SDK 输入流如果为纯音频，必须设置 layout 参数，SDK 不再自动设置，否则会出现报错提示。

    混流功能增加输出视频配置、焦点语音等能力，同时增加混流的状态回调，用于获取混流转发的状态。

    相关 API 请参考 [startMixerTask](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#start-mixer-task)


**改进优化**

1. 优化弱网抗性
    优化 SDK 在网络抖动和低网速场景下的可用性。


2. 优化 SDK 策略，减少安全风险隐患
    优化针对浏览器的调用方式，减少账号、Cookie 等泄漏的安全隐患。


**问题修复**

1. 修复  [checkSystemRequirements](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#check-system-requirements) 接口，对视频编码的能力检查结果不准确的问题

---

## 3.4.0 版本 <a id="3.4.0"></a>

**发布日期：2024-05-06**

**新增功能**

1. 屏幕共享支持视频画面仅共享标签页中的某个 DOM 元素

    - 仅支持 Chrome 104 或以上版本的浏览器；如果共享的 DOM 元素中包含多媒体元素（img、video 等），需使用 Chrome 116 或以上版本的浏览器。为达到更好的体验，建议您直接使用 Chrome 最新版本。
    - 建议您使用 CSS 固定 DOM 元素的位置，避免浏览器页面滚动时、DOM 出现在视口的大小发生变化，导致采集到的视频分辨率频繁变化，造成部分 Android 设备拉流解码失败。

    相关 API 请参考 [createZegoStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#create-zego-stream)、[startCaptureScreen](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoLocalStream#start-capture-screen)、[startCaptureScreenWithAudio](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoLocalStream#start-capture-screen-with-audio)

2. 支持按需引入 SDK 各个模块的功能

    注意：仅支持通过 npm 方式单独集成某个功能模块，其余方式不支持。

    - 在 3.4.0 版本之前，开发者集成 ZEGO Web SDK 时，默认同时集成了混音、混流等功能。如果开发者的业务仅需其中的某个功能模块，无法单独集成。
    - 从 3.4.0 版本开始：
        - 开发者依然可以通过主路径引入 SDK，同时集成混音、混流等功能。
        - 同时，开发者也可以按照业务需要，从 `混音`、`混流`、`CDN`、`范围语音`、`美颜` 功能模块中进行选择，并通过 npm 方式单独集成。对于未引入的功能，在构建过程中会自动移除，减少 SDK 包的体积。

    详情请参考 [集成 SDK](https://doc-zh.zego.im/article/16029)。

---

## 3.3.0 版本 <a id="3.3.0"></a>

**发布日期：2024-03-21**

**新增功能**

1. 支持均衡型 AI 降噪模式

    注意：当前官网 SDK 不包含此功能，如有需要，请联系 ZEGO 技术支持特殊编包。

    支持均衡型 AI 降噪模式，与原有模式相比，在相同的人声保真效果前提下，噪音抑制效果明显提升，可以达到干净无噪音或不扰人的程度；但性能消耗稍微增加。适用于街道、马路、市场等较为嘈杂（信噪比低）的户外环境中，详情请参考 [AI 降噪](https://doc-zh.zego.im/article/16571)。

    相关 API 请参考 [setAiDenoiseMode](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#set-ai-denoise-mode)、[enableAiDenoise](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#enable-ai-denoise)

2. 支持在拉流时 mute 所有音视频数据

    新增  [muteAllPlayAudioStreams](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#mute-all-play-audio-streams)、[muteAllPlayVideoStreams](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#mute-all-play-video-streams) 接口，本地用户在拉流时，可以控制是否接收所有远端用户的音视频数据。

    开发者可以通过 [mutePlayStreamAudio](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#mute-play-stream-audio)、[mutePlayStreamVideo](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#mute-play-stream-video) 接口，单独控制是否接收指定的音视频流。

    相关 API 请参考 [muteAllPlayAudioStreams](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#mute-all-play-audio-streams)、[muteAllPlayVideoStreams](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#mute-all-play-video-streams)

**改进优化**

1. 优化单房间模式下的房间切换逻辑

    用户成功登录某个房间后，如果没有退出该房间、重复登录该房间或直接登录其他房间，将会操作无效或登录失败，并返回 1002001 错误码。

    相关 API 请参考 [loginRoom](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#login-room)

2. 优化 iOS 或 macOS 设备电量过低时 Safari 浏览器的 UI 效果，不再出现暂停按钮

**问题修复**

1. 修复动态转推 CDN 偶现失败的问题。
2. 修复拉流成功后的短时间内， 偶现接收到重复 SEI 内容、或丢失 SEI 内容的问题。

---

## 3.2.0 版本 <a id="3.2.0"></a>

**发布日期：2024-01-30**

**新增功能**

1. 新增本地代理功能

    注意：使用本功能前，请联系 ZEGO 技术支持，获取代理服务器所需的统一接入服务域名、logger 域名等信息。

    支持开发者使用自己部署的 Nginx 和 coturn 服务器作为 SDK 数据的中转站，代理访问 ZEGO 后台服务。

    启用本地代理功能后：

    - SDK 的 HTTP 和 WebSocket 请求数据包将通过 Nginx 服务器进行代理转发。
    - SDK 的音视频数据包将通过 coturn 服务器进行代理转发。

    详情请参考 [本地代理](https://doc-zh.zego.im/article/19011)。

    相关 API 请参考 [setCloudProxyConfig](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#set-cloud-proxy-config)、[setTurnServer](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#set-turn-server)

2. 支持获取音频 PCM 数据

    注意：本功能接口需要在调用 [startPlayingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#start-playing-stream) 接口成功之后调用，停止拉流后会自动停止获取 PCM 数据。每次重新拉流时，需要重新调用本接口获取音频 PCM 数据。

    支持通过监听音频数据回调，获取音频的 PCM 数据。开发者可基于 PCM 数据进行业务处理，例如对接第三方音频鉴黄、生成字幕等。

    相关 API 请参考 [setAudioFrameCallback](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#set-audio-frame-callback)

3. 在混音前，支持对媒体标签的音频数据进行变调处理

    注意：

    - 同一时间内，一个 \<video> 或 \<audio> 标签的数据仅能进行一种音效处理，不可同时进行多种处理，即变声、混响、立体声、变调只能选择一种使用。
    - 针对同一个 \<audio> 标签的音频数据，如果开发者调用了 [setAudioChangerParam](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#set-audio-changer-param)、[enableLiveAudioEffect](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#enable-live-audio-effect)（两个接口都包含 mode 参数，用于设置音效生效模式），则音效生效模式以最后调用的接口设置为准。

    在混音前，支持通过 [setAudioChangerParam](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#set-audio-changer-param) 接口，对媒体标签（\<video> 或 \<audio> 标签）的音频数据进行变调处理。例如，KTV 独唱场景中，使用本功能对伴奏进行升、降调，同时保持人声不变，详情请参考 [混音](https://doc-zh.zego.im/article/16073)。

    相关 API 请参考 [setAudioChangerParam](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#set-audio-changer-param)

4. 混流任务支持输入白板信息

    混流功能支持将白板中的操作内容转成实时视频，且支持设置白板配置信息，例如，设置白板 ID、白板宽高比、是否支持加载动态 PPT 等，详情请参考 [将白板内容推送到第三方平台](/real-time-video-web/other/push-the-whiteboard)。

    相关 API 请参考 [startMixerTask](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#start-mixer-task)、[ZegoMixStreamConfig](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoMixStreamConfig)

5. 移动端支持快捷切换前后摄像头

    新增 [useFrontCamera](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#use-front-camera) 接口，用于切换移动端的前置和后置摄像头。与之前版本使用 facingMode 切换摄像头的模式相比，接口调用更加简单，详情请参考 [移动端前后摄像头切换](/real-time-video-web/best-practice/mobile-front-and-rear-camera-switching)。

    相关 API 请参考 [useFrontCamera](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#use-front-camera)

**改进优化**

1. 优化 ZegoStreamView 流渲染组件

    在之前的 SDK 版本中，当媒体文件播放失败、触发 autoplayFailed 失败事件回调时，用户需要调用 [ZegoStreamView.resume](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoStreamView#resume) 方法恢复播放，一般是通过网页弹窗提示用户点击。

    从该版本开始，优化了 [ZegoStreamView](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoStreamView) 流渲染组件，当媒体文件播放失败、触发 autoplayFailed 失败事件回调后，用户点击网页上的任意位置，都可自动恢复播放。

    相关 API 请参考 [ZegoStreamView.play](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoStreamView#play)

2. 优化同时使用美颜、背景虚化功能时的性能表现

---


## 3.1.3 版本 <a id="3.1.3"></a>

**发布日期：2023-12-20**

**问题修复**

1. 修复纯音频发送 SEI 失败的问题。
2. 修复纯音频开启 SEI 推流后增加视轨，推流无视频的问题。

---

## 3.1.2 版本 <a id="3.1.2"></a>

**发布日期：2023-12-13**

**问题修复**

1. 修复通过 [createZegoStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#create-zego-stream) 接口创建“只采集音频”或“只采集视频”的媒体流时，设置的 audioBitrate 和 videoBitrate 参数不生效，导致没有使用指定的码率、而使用默认码率进行推流的问题。
2. 修复其他已知问题。

---

## 3.1.0 版本 <a id="3.1.0"></a>

**发布日期：2023-12-01**

**新增功能**

1. SDK 支持设置云代理

    注意：如需使用该功能，请联系 ZEGO 技术支持。

    通过设置 SDK 的云代理接口，将 SDK 对应的所有流量通过云端的代理服务器进行中转，实现与 RTC 通信，详情请参考 [云代理](https://doc-zh.zego.im/article/18900)。

    相关 API 请参考 [setCloudProxyConfig](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#set-cloud-proxy-config)

2. 支持非连续地传输 DTX 音频

    注意：该功能默认关闭，开启后可能会影响音质，请酌情使用。

    支持非连续地传输 DTX 音频，即在推流时不发送静音数据（EnableMic、EnableMicDevice），以此减少不发声时的推流音频码率，在一定程度上节省带宽。

    相关 API 请参考 [startPublishingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#start-publishing-stream)

**改进优化**

1. 优化设备拔插异常、采集异常的相关错误码

    新增如下错误码，通过 [deviceError](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoRTCEvent#device-error) 回调抛出。

    - 1106007，麦克风松动或者是快速拔插导致采集异常。
    - 1106008，摄像头松动或者是快速拔插导致采集异常。
    - 1106009，检测到音频轨道采集异常停止。
    - 1106010，检测到视频轨道采集异常停止。

    其中，音频采集异常 1106009、麦克风松动或快速拔插导致采集异常 1106007 可能会先后被触发；同理 1106010、1106008 也可能会先后被触发。

    详情请参考 [常见错误码](https://doc-zh.zego.im/article/16049)。

2. 精简压缩 SDK 包，包体缩小至 1.7 MB

3. 优化推拉流增/删视轨方式，降低增/删视轨的延迟和失败率

4. 优化场景化音视频配置 [ZegoScenario](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~enum~ZegoScenario)，提升用户观看体验

5. 优化 WebRTC 推拉流策略，提升稳定性；同时，优化协商流程，降低推拉流耗时

6. 优化视频 SEI

    - 优化 SEI 性能，避免某些情况下推拉流音视频时，画面会出现停顿的问题。
    - 优化 SEI 兼容性，支持在以下浏览器中使用：
      - 火狐 117 或以上版本
      - Safari 15.4 或以上版本
      - Android 微信浏览器

    相关 API 请参考 [sendSEI](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#send-sei)、[playerRecvSEI](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoRTCEvent#player-recv-sei)

7. 优化 SDK 在不同设备上的拉流兼容性

    在某些设备不支持 “视频编码” 或 “音频编码” 时，旧版本 SDK 会直接拉流失败。从该版本开始，优化 SDK 在不同设备上的拉流兼容性：

    - 在不支持 “视频编码” 的设备上，只拉音频流。
    - 在不支持 “音频编码” 的设备上，只拉视频流。

    相关 API 请参考 [startPlayingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#start-playing-stream)

8. 优化多端登录逻辑

    用户在 A 设备上登录成功后，A 设备断网；然后使用同一 userID 在 B 设备上登录成功。此时如果 A 设备网络恢复，重连会失败，并抛出 1002050 错误码，提示该 userID 已在其他设备登录。

9. 优化服务端混流及单流转码能力

    优化服务端混流及单流转码能力，提高编码效率，同等码率下提升 5% 以上的主客观画质。

---

## 3.0.1 版本 <a id="3.0.1"></a>

**发布日期：2023-10-27**

**问题修复**

1. 修复在 iOS 15.1 系统的 Safari 浏览器上，调用 [createZegoStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#create-zego-stream) 接口后再推流，页面会 crash 的问题
2. 修复在 Windows 系统的 Chrome 浏览器上，调用 [createRemoteStreamView](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#create-remote-stream-view) 接口创建播放器组件，切换后台会有卡顿的问题

---

## 3.0.0 版本 <a id="3.0.0"></a>

**发布日期：2023-10-19**

**新增功能**

1. 新增创建媒体流、更新媒体流等接口，优化音视频通话逻辑

    <Warning title="注意">


    - Express SDK 3.0.0 版本优化了 SDK 的内部逻辑，提高了 SDK 稳定性、音视频通话质量、以及 API 接口的易用性，ZEGO 强烈推荐您使用 3.0.0 或以上版本的 SDK。
    - 旧版本的 [createStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#create-stream) 等一系列接口，将于 3.0.0 版本正式废弃，请您及时更新您的代码逻辑，避免影响您的业务正常使用，详情请参考 [3.0.0 及以上版本升级指南](https://doc-zh.zego.im/article/18530)。

    </Warning>



    新增创建媒体流 [createZegoStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#create-zego-stream)、更新媒体流 [updatePublishingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#update-publishing-stream) 等接口，开发者可以通过该接口生成 zego 流对象，该流对象具有替换或增加音视轨、预览流、停止采集等功能，优化推流过程，缩短接入时间，提升接入体验。

    与之前版本的 [createStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#create-stream) 接口相比，3.0.0 及以上版本的 SDK 将直接管理 localStream（MediaStream），降低推拉流失败的风险。

    相关 API 请参考 [createZegoStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#create-zego-stream)、[updatePublishingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#update-publishing-stream)、[ZegoLocalStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoLocalStream)

2. 新增播放器插件

    新增 ZEGO 自研 Web 播放器插件，集成插件后，支持拉取 H.265 和 H.264 格式的 CDN 直播流，同时支持常用的播放器控制功能，详情请参考 [播放器插件](https://doc-zh.zego.im/)。

    相关 API 请参考 [ZegoExpressPlayer](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressPlayer)

3. 新增本地导播插件

    新增本地导播插件，开发者可以使用此插件，在本地对画面和声音进行混合，将多路音视频流或页面元素、合并为一路音视频流后推流，详情请参考 [使用本地导播](https://doc-zh.zego.im/article/18454)。

    适用于在线教育、在线会议、直播带货、秀场直播、游戏直播等场景。

    相关 API 请参考 [ZegoStreamCompositor](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoStreamCompositor)、[createStreamCompositor](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#create-stream-compositor)

4. 支持在推流端去除画面中人物外的背景

    注意：

1. 如需使用该功能，请联系 ZEGO 技术支持。
2. 该功能建议配合本地导播插件使用。

    支持在推流端去除人物外的背景，配合本地导播插件，实现人像画中画、演讲者模式、以及沉浸式直播带货，详情请参考 [使用本地导播](https://doc-zh.zego.im/article/18454)。

    相关 API 请参考 [setTransparentBackgroundOptions](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#set-transparent-background-options)

5. 新增混流音浪回调

    注意：如需使用该功能，请联系 ZEGO 技术支持。

    在混流时，支持针对指定的流开启声浪回调；开启后，拉混流时可监听指定的流的声浪信息。

    相关 API 请参考 [startMixerTask](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#start-mixer-task)、[autoMixerSoundLevelUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoRTCEvent#auto-mixer-sound-level-update)、[mixerSoundLevelUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoRTCEvent#mixer-sound-level-update)

6. 新增混响、虚拟立体声、耳返混响功能

    新增预设混响、虚拟立体声、以及配置耳返混响效果的功能，开发者基于此可实现一些音频前处理效果，详情请参考 [变声/混响/立体声](https://doc-zh.zego.im/article/18148)。

    相关 API 请参考 [setReverbPreset](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#set-reverb-preset)、[enableVirtualStereo](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#enable-virtual-stereo)

7. 支持设置音调参数，控制变声效果

    注意：混响、虚拟立体声、变声等功能，不支持同时开启使用，否则效果可能出现异常。

    支持通过传入音调参数来控制变声效果，可用于提升互动的趣味性、或保护用户隐私。

    音调的取值范围为 [-12.0, 12.0]，数值越大声音越尖锐；设置为 0.0 时，表示关闭变声效果。

    相关 API 请参考 [setVoiceChangerParam](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#set-voice-changer-param)

8. 支持获取本地 NTP 时间戳

    支持获取本地的 NTP 时间戳，可用于对齐多端的本地时间。例如，可以在 KTV 合唱场景中，用来对齐歌曲进度。

    相关 API 请参考 [getNetworkTimeInfo](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#get-network-time-info)

**改进优化**

1. 优化推拉流质量数据回调接口，提高支持的调用频率

    推拉流质量数据回调接口的最快调用频率从 “3 秒/次” 提升为 “1 秒/次”，提高支持的调用频率。

    相关 API 请参考  [getPublishingStreamQuality](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#get-publishing-stream-quality)、[getPlayingStreamQuality](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#get-playing-stream-quality)

**问题修复**

1. 修复先调用 [mutePublishStreamAudio]、[mutePublishStreamVideo] 接口，再调用 [replaceTrack] 接口更换音视频轨道后，渲染画面、声音异常的问题
2. 修复初始化引擎后，立即调用 [destroyEngine] 接口销毁引擎会报错的问题

---


## 2.26.0 版本 <a id="2.26.0"></a>

**发布日期：2023-08-18**

**改进优化**

1. 优化音浪算法，基于音浪监听能够得到更准确的音量大小

    相关 API 请参考 [soundLevelUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoRTCEvent#sound-level-update)、[capturedSoundLevelUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoRTCEvent#captured-sound-level-update)

2. 优化场景化音视频配置，增加“高音质语聊房”场景

    优化场景化音视频配置，支持“高音质语聊房”场景 HighQualityChatroom，适用于音乐教学等对音质要求高的语聊房场景，详情请参考 [场景化音视频配置](https://doc-zh.zego.im/article/16836)。

    相关 API 请参考 [setRoomScenario](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#set-room-scenario)

3. 优化 SDK 的内部逻辑，提升弱网环境下的通话体验

**问题修复**

1. 修复屏幕共享没有保存视轨，导致销毁流时、视轨未被销毁的问题
2. 修复关闭视频、保留预览画面时，获取流质量报错的问题

---


## 2.25.6 版本 <a id="2.25.6"></a>

**发布日期：2023-07-17**

**问题修复**

1. 修复在部分 Android 手机的微信浏览器上，偶现用 [ZegoStreamView](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoStreamView) 播放不出声音的问题。
2. 修复其他已知问题。
---

## 2.25.5 版本 <a id="2.25.5"></a>

**发布日期：2023-07-03**

**新增功能**

1. 新增音轨、视轨检测接口

    新增音轨检测接口 [checkAudioTrackIsActive](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#check-audio-track-is-active)、视轨检测接口 [checkVideoTrackIsActive](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#check-video-track-is-active)，开发者可以检测当前音频、视频采集是否正常。

    相关 API 请参考 [checkAudioTrackIsActive](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#check-audio-track-is-active)、[checkVideoTrackIsActive](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#check-video-track-is-active)

**问题修复**

1. 修复其他已知问题。

---

## 2.25.2 版本 <a id="2.25.2"></a>

**发布日期：2023-06-15**

**问题修复**

1. 修复在使用云端录制功能时，SDK 的房间用户更新回调 [roomUserUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoRTMEvent#room-user-update) 会抛出预期之外的云端录制机器人用户信息的问题。
2. 修复其他已知问题。

---

## 2.25.1 版本 <a id="2.25.1"></a>

**发布日期：2023-06-08**

**新增功能**

1. 新增销毁引擎实例接口

    注意：该接口调用后，不能再调用同一个引擎实例的其他接口，请开发者及时将该引擎实例置空，避免发生错误。

    新增销毁引擎实例接口 [destroyEngine](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#destroy-engine)，在 SDK 生命周期终点调用该接口，用于回收引擎内部剩余资源，关闭多余的网络连接。

    相关 API 请参考 [destroyEngine](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#destroy-engine)

**改进优化**

1. 优化基础推拉流的质量

    - 降低 20% ～ 30% 的基础推拉流连接耗时，实现更快的推拉流和更低的首帧耗时。
    - 与旧版本相比，优化了弱网条件下的音视频质量。相同的弱网条件下，2.25.0 及以上版本提供了更高质量的音质和画质。

2. 兼容 Chrome 浏览器弃用的 RTCMediaStreamTrackStats

    从 Chrome 112 版本开始，弃用了 RTCMediaStreamTrackStats，从而导致 SDK 中的 [publishQualityUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoRTCEvent#publish-quality-update)、[playQualityUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoRTCEvent#play-quality-update) 回调中返回的信息受到影响。受影响的字段包括：videoTransferFPS，frameHeight、frameWidth、audioLevel、audioSendLevel、audioSamplingRate 等本地和远端的媒体信息字段。

    2.25.0 及以上版本的 SDK 兼容了 RTCMediaStreamTrackStats，保证回调返回信息的正确和完整。

    相关 API 请参考 [publishQualityUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoRTCEvent#publish-quality-update)、[playQualityUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoRTCEvent#play-quality-update)

**问题修复**

1. 修复部分弱网场景中无法新增房间流的问题。
2. 修复由于系统时间错误，导致 SDK 计算 Token 有效期错误，从而触发 [tokenWillExpire](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoRTMEvent#token-will-expire) 回调的问题。

---


## 2.24.5 版本 <a id="2.24.5"></a>

**发布日期：2023-04-28**

**新增功能**

1. 新增版权音乐功能

    注意：如需使用该功能，请联系 ZEGO 技术支持。

    支持通过版权音乐功能，获取版权歌曲或伴奏资源，可以用于在线 KTV 、语聊房等合唱或使用背景音乐的场景，详情请参考 [在线 KTV](/online-ktv-web/introduction/overview) 相关文档。

---

## 2.24.0 版本 <a id="2.24.0"></a>

**发布日期：2023-04-23**

**新增功能**

1. 新增背景虚化及虚拟背景功能

    注意：
    - 如需使用该功能，请联系 ZEGO 技术支持。
    - 该功能为限时免费功能，限免期至 2023.06.30，如需申请延长免费期或咨询正式收费标准，请联系 ZEGO 商务人员。

    Express Web SDK 2.24.0 及以上的版本提供背景虚化及虚拟背景功能，该功能可以将视频画面中的主体从原始画面中分离出来，并对主体外的区域进行虚化或替换为自定义图片，详情请参考 [背景虚化及虚拟背景](https://doc-zh.zego.im/article/17811)。

    相关 API 请参考 [initBackgroundModule](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#init-background-module)，[setBackgroundBlurOptions](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#set-background-blur-options)，[setVirtualBackgroundOptions](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#set-virtual-background-options)，[enableBackgroundProcess](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#enable-background-process)


2. 混流接口支持为输入流添加图片、文字水印、视频圆角，支持为输出流添加水印

    相关 API 请参考 [startMixerTask](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#start-mixer-task)


3. 范围语音支持自定义设置发声模式和收听模式

    注意：
    - 自定义设置发声收听模式和旧版本的范围语音模式只能二选一，即不能跟 [setRangeAudioMode](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressRangeAudio#set-range-audio-mode) 接口一起调用。
    -  Web 自定义发声模式及收听模式仅支持与 iOS、Android 、Windows、macOS、Linux 平台的 Express SDK 3.3.0 及以上版本互通。

    范围语音支持自定义设置发声模式和收听模式，用户可通过选择发声模式来决定，哪些人可以收听到他的声音，也可通过选择收听模式来决定，收听哪些人的声音，详情请参考 [游戏语音](https://doc-zh.zego.im/article/16838)。

    相关 API 请参考 [setRangeAudioCustomMode](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressRangeAudio#set-range-audio-custom-mode)


4. 范围语音新增隐秘小队模式

    [ZegoRangeAudioMode](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~enum~ZegoRangeAudioMode) 新增隐秘小队模式 `SecretTeam`，在该模式下，同一房间下的用户，收听者既能与同一小队的人交流，也能听到所有在音频接收范围内，且为全世界模式的发声者的声音，如太空狼人杀游戏场景，详情请参考 [游戏语音](https://doc-zh.zego.im/article/16838)。

    相关 API 请参考 [setRangeAudioMode](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressRangeAudio#set-range-audio-mode)

5. Web 端支持触发 [networkQuality](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoRTCEvent#network-quality) 事件，用于获取本地用户和远端用户的推拉流质量情况。

    相关 API 请参考 [networkQuality](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoRTCEvent#network-quality)

**改进优化**

1. 优化混音接口

    调用 [startMixingAudio](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#start-mixing-audio) 接口时，已混音的 audio 标签播放器的 src 更换资源后，SDK 自动重新混音，无需额外调用接口。

    相关 API 请参考 [startMixingAudio](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#start-mixing-audio)，[stopMixingAudio](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#stop-mixing-audio)


2. 优化变声功能兼容性，支持移动端使用

    如需使用变声功能，请参考 [变声](https://doc-zh.zego.im/)。

    相关 API 请参考 [setVoiceChangerPreset](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#set-voice-changer-preset)

3. 优化 AI 降噪功能兼容性，支持移动端使用

    如需使用 AI 降噪功能，请参考 [AI 降噪](https://doc-zh.zego.im/article/16571)。

    相关 API 请参考 [enableAiDenoise](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#enable-ai-denoise)

4. SEI 功能优化，支持不设置 `unregisterSEIFilter` 属性进行条件过滤

    对于 payloadType 为 5 的 SEI 内容，当 [ZegoSEIConfig](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoSEIConfig) 的 `SEIPass`参数值设为 true，且没有设置 `unregisterSEIFilter` 时，则放开所有 SEI 的发送和接收。当 [ZegoSEIConfig](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoSEIConfig) 的 `SEIPass` 参数值设为 false 时（默认值），则只发送和接收符合 `unregisterSEIFilter` 的 SEI 内容。

    相关 API 请参考 [setSEIConfig](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#set-sei-config)

5. 优化 SEI 开关防竞争码处理

    在发送 SEI 二进制数据时，可能与 H264 中 NALU 的分片开头标识符相同，导致 NALU 切片出现错误。因此[ZegoSEIConfig](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoSEIConfig) 新增 `emulationPreventionByte` 属性，优化 SEI 开关防竞争码处理，即将 SEI 数据中与标识符相同的内容进行编码后，再发送出去，由拉流端接收时进行解码，可有效避免该情况的出现。

    相关 API 请参考 [setSEIConfig](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#set-sei-config)

**问题修复**

1. 修复 [ZegoStreamView](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoStreamView) 的 [canPlayAudio](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoLocalStreamEvent#can-play-audio) 和 [canPlayVideo](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoLocalStreamEvent#can-play-video) 事件在 iOS 微信浏览器没有触发的问题。
2. 修复在一个页面拉 25 条流时，偶现的没有触发音浪回调且播放没有声音的问题。
3. 修复 [startPlayingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#start-playing-stream) 接口从 RTC 换成 L3 拉流时，会出现拉流重试耗时较长的问题。
4. 修复部分设备插入外接麦克风后，切换设备不生效的问题。
5. 修复部分设备刷新页面重新创建流失败的问题。

---

## 2.23.0 版本 <a id="2.23.0"></a>

**发布日期：2023-03-17**

**新增功能**

1. 新增实时变声功能

    注意：
    - 变声功能仅支持 PC 端 Web 网页使用，暂不支持在移动端 Web 网页使用。
    - 如需使用该功能，请联系 ZEGO 技术支持。

    当用户有隐私保护需求，或者想提高语音玩法的趣味性，希望能够实时改变声音时，可使用实时变声功能，详情请参考 [变声](https://doc-zh.zego.im/)。

    相关 API 请参考 [setVoiceChangerPreset](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#set-voice-changer-preset)

2. 新增 [exceptionUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoRTCEvent#exception-update) 回调，用于监听采集、编码、渲染异常等问题

    相关 API 请参考 [exceptionUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoRTCEvent#exception-update)

**改进优化**


1. Web 的播放组件添加首帧播放事件

    Web 的媒体流播放组件  [ZegoStreamView](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoStreamView) 的  [on](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoStreamView#on) 接口新增  [canPlayVideo](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~StreamViewEvent#can-play-video) 及 [canPlayAudio](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~StreamViewEvent#can-play-audio) 事件 ，分别用于监听播放器视频和音频的首帧播放。

    相关 API 请参考 [canPlayVideo](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~StreamViewEvent#can-play-video)，[canPlayAudio](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~StreamViewEvent#can-play-audio)

2. 优化了 SDK 内部策略，提升了弱网和首帧表现。

**问题修复**


1. 修复在使用 [setAudioMuted](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoStreamView#set-audio-muted) 和 [play](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoStreamView#play) 接口关闭音频，并播放纯视频时，仍然受到浏览器自动播放限制，导致无法播放的问题。
2. 修复 [checkSystemRequirements](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#check-system-requirements)  接口无法校验到 SDK 是否使用 HTTPS 或 localhost 的问题。
3. 修复重复登录大房间（房间人数超过一定规模，例如超过 500 人）时，偶现拉流端 [roomStreamUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoRTCEvent#room-stream-update) 回调没监听到房间流新增的问题。
4. 修复在屏幕共享时，部分 Safari 因设置 width、height 参数，导致采集报错的问题。

---


## 2.22.0 版本 <a id="2.22.0"></a>

**发布日期：2023-01-06**

**新增功能**

1. 支持在创建流后，增加或删除音视频轨道功能

    注意：音视频轨道不能都移除，且增加或删除音视频轨道功能不支持在开启大小流的情况下使用。

    音频、视频支持单独管理，在音视频权限受限（未授权）的情况下，创建了只有音轨或视轨的流后，可以根据后续的权限情况新增或移除流中的音视频轨道。

    例如，最初只有麦克风权限，因此创建了纯音频流。但在使用过程中，用户授权了摄像头权限，因此用户可以在已有的流中添加摄像头视轨，并且拉流端对此无感知，可以顺利的从音频渲染向音视频渲染切换。

    相关 API 请参考 [addTrack](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#add-track)，[removeTrack](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#remove-track)

2. 范围语音支持获取回调范围内的用户列表

    范围语音支持通过  [enableAudioSourceUpdateChecker](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressRangeAudio#enable-audio-source-update-checker) 接口获取回调范围内的用户列表，当更新收听者或音源位置时，可触发 [audioSourceWithinRangeUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoRangeAudioEvent#audio-source-within-range-update) 回调。

    相关 API 请参考  [enableAudioSourceUpdateChecker](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressRangeAudio#enable-audio-source-update-checker)，[audioSourceWithinRangeUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoRangeAudioEvent#audio-source-within-range-update)


**改进优化**

1. 推流端停止推视频数据时，拉流端画面支持设置停留在最后一帧

    推流端停止推送视频数据时，拉流端视频画面支持设置停留在最后一帧。开发者可以根据业务需要，灵活选择是否停留在最后一帧，或显示黑屏。

    相关 API 请参考 [play](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoStreamView#play)

2. 创建屏幕共享流时，可以通过参数开启 3A 配置

    创建屏幕共享流时，可以通过  [createStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#create-stream) 接口的 `ANS`、`AGC` 及 `AEC` 参数开启 3A 配置。创建屏幕共享流的音频时，默认 3A 配置只开启回声消除，关闭自动增益和噪声消除处理。

    相关 API 请参考 [createStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#create-stream)

**问题修复**

1. 修复 Safari 浏览器由于权限问题导致设备状态异常的问题。
2. 修复范围语音切换扬声器设备接口失效的问题。
3. 修复 [startPlayingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#start-playing-stream) 接口的 `resourceMode` 参数配置为 CDN 时，播放非房间内的流，CDN URL 为空的问题。

---

## 2.21.0 版本 <a id="2.21.0"></a>

**发布日期：2022-11-25**

**新增功能**

1. 新增设置房间场景功能

    ​注意：
    - [setRoomScenario](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#set-room-scenario) 需要在登录房间前调用才生效。
    - 调用 [setRoomScenario](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#set-room-scenario)  接口修改后的场景，不影响已生成的流，只对调用 [setRoomScenario](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#set-room-scenario) 接口后，再调用 [createStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#create-stream) 生成的流生效。

    为方便开发者快速接入，降低开发者接入门槛，SDK 提供多种预设场景。开发者可根据所需场景，选择对应的房间模式，SDK 将自动应用适合该场景的音视频编解码器、音视频参数、流控策略等配置，从而快速实现该场景下的最佳效果。

    ​当前支持场景包括标准 1v1 音视频通话、高画质 1v1 音视频通话、标准语聊房，详情请参考  [场景化音视频配置](https://doc-zh.zego.im/article/16836)  文档。

    相关 API 请参考 [setRoomScenario](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#set-room-scenario)，​[createStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#create-stream) ​​
    ​

2. 范围语音流新增 AI 降噪功能

    ​注意：
    - 如需使用该功能，请联系 ZEGO 技术支持进行特殊编包。
    - AI 降噪需特殊编包，并通过 [ZegoExpressRangeAudio.enableAiDenoise](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressRangeAudio#enable-ai-denoise) 接口进行设置，不跟 3A 等音频相关参数一起设置，相互独立。

    范围语音流支持开启 AI 降噪功能。通话场景下将除人声外的所有声音识别为噪音并进行消除。 在消除稳态噪声的基础上，有效消除非稳态噪声且实现人声高保真，主要噪声包括鼠标、键盘声、敲击、空调、厨房碗碟、嘈杂餐厅、环境风声、咳嗽、吹气等非人声噪声。

    ​相关 API 请参考 [ZegoExpressRangeAudio.enableAiDenoise](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressRangeAudio#enable-ai-denoise)
    ​
    ​
    ​

3. 范围语音支持自定义拉流，且支持将音频文件作为发声源，并支持设置发声范围和发声源位置

    注意：移动端 Web 平台由于兼容性问题不支持开启空间音效，但仍有范围控制效果。
    ​
    ​相关 API 请参考 [setStreamVocalRange](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressRangeAudio#set-stream-vocal-range)， [updateStreamPosition](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressRangeAudio#update-stream-position)，[setCustomSourceVocalRange](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressRangeAudio#set-custom-source-vocal-range)，
    [updateCustomSourcePosition](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressRangeAudio#update-custom-source-position)​


**问题修复**

1. 修复调用  [mutePublishStreamVideo](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#mute-publish-stream-video) 和  [mutePublishStreamAudio](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#mute-publish-stream-audio) 接口后，使用 Safari 浏览器拉流时，必定出现的拉流端页面会闪一下的问题 ​

2. 修复用户使用 Chrome58 浏览器时，Express SDK 调用   [startPublishingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#start-publishing-stream) 方法有兼容性问题出现报错后，导致推流没有继续进行的问题

3. 修复范围语音和 [ZegoStreamView](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoStreamView) 媒体流播放组件，在 iOS Safari 浏览器上被其他软件音频抢占中断播放，在结束抢占后，没有恢复播放的问题。


---

## 2.20.2 版本 <a id="2.20.2"></a>

**发布日期：2022-11-04**

**改进优化**

1. 优化推拉流的节点重试逻辑及多集群保底策略。

**问题修复**

1. 修复 SDK 在网络检测时，依赖浏览器的网络状态标识，导致登录失败的问题。

---

## 2.20.1 版本 <a id="2.20.1"></a>

**发布日期：2022-10-27**

**新增功能**

1. 支持使用 CDN Plus 直播拉流

    注意：如需使用该功能，请联系 ZEGO 技术支持。

    将超低延迟 L3 直播和 CDN 进行无缝融合，实时诊断观众的视频流质量问题并智能调节，提升观众直播观看体验，弱网抗性明显优于 CDN，可以通过 SDK 控制方式开启该功能，同时 [startPlayingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#start-playing-stream) 接口增加 ZegoWebPlayOption.resourceMode 为 3 的枚举值。

    相关 API 请参考 [startPlayingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#start-playing-stream)

2. 支持开启视频硬件编码功能

    注意：由于少部分机型设备硬件编码会有一些异常问题，因此 SDK 默认使用软件编码的方式。

    新增开启视频硬件编码接口 [enableHardwareEncoder](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#enable-hardware-encoder)，开发者可以通过开启该配置，从而提高编码效率。

    开发者可根据机型的支持情况,选择是否开启该开关，同时可以通过推流质量接口  [publishQualityUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoRTCEvent#publish-quality-update) 查看 [ZegoPublishVideoStats.isHardwareEncode](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoPublishVideoStats#is-hardware-encode) 标识，确认当前硬件编码的开启或关闭状态。

    若调用开启视频硬件编码接口推流后，没有开启硬件编码，则表示该机型设备不支持硬件编码功能。

    相关 API 请参考 [enableHardwareEncoder](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#enable-hardware-encoder)，[ZegoPublishVideoStats.isHardwareEncode](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoPublishVideoStats#is-hardware-encode)

3. 屏幕共享在创建媒体流时，支持自定义设置最小码率 minBitrate 和关键帧间隔时长 keyFrameInterval

    创建屏幕共享的媒体流时，SDK 会根据实际分辨率、帧率等视频配置，自动选择对应的最优码率范围及关键帧间隔等，可以满足绝大多数场景。若开发者的场景较为特殊，希望自行设置，可以调用 [createStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#create-stream) 接口设置最小码率 minBitrate 和关键帧间隔时长 keyFrameInterval：
    - 最小码率 minBitrate，单位 kbps，当网络情况较差时，可接受的视频质量下降码率的最小值。若网络情况较差：
        - 开发者要求保证视频高画质而不要求流畅性，则可把 minBitrate 设置为接近目标码率的值。
        - 开发者对视频画质要求不高时，则可以把 minBitrate 设置得较低。
    - 关键帧间隔时长 keyFrameInterval，单位秒。屏幕共享可以通过调大关键帧的间隔时长以减少视频编码性能压力，但是会对流畅度产生影响，因此不建议随意调整该参数。当前默认值: 2 秒，取值范围: [2, 6]，要求取值为整数。

    相关 API 请参考 [createStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#create-stream)，[ZegoScreen.keyFrameInterval](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoScreen#key-frame-interval)，[ZegoScreen.minBitrate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoScreen#min-bitrate)，[ZegoCamera.keyFrameInterval](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoCamera#min-bitrate)，[ZegoCamera.minBitrate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoCamera#min-bitrate)


4. 使用设备被移除时，支持自动切换可用设备

    新增开启自动化切换设备接口 [enableAutoSwitchDevice](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#enable-auto-switch-device)，可以通过调用该接口开启自动化切换设备开关，在当前设备被移除时，SDK 会根据浏览器中的设备列表自动切换为第一个设备。由于版本兼容性，该开关默认关闭，建议用户可打开该开关。

    相关 API 请参考  [enableAutoSwitchDevice](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#enable-auto-switch-device)

**改进优化**

1. 优化音浪回调功能

    优化了原有的音浪回调实现方式，提高音浪回调功能的兼容性和性能。

**问题修复**

1. 修复在发送方发送房间附加消息后，发送方退出并立刻重新进入房间的情况下，收不到房间附加消息的问题。
2. 修复推拉流失败重试时，重复报错的问题。
3. 修复 SDK 在实现 [游戏语音](https://doc-zh.zego.im/article/16838) 功能时，在部分设备或浏览器拉流并切后台，没有声音或出现杂音的问题。
4. 修复  [roomStreamUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoRTCEvent#room-stream-update)  部分情况下，会回调出本端推出的流的删除信息。
5. 修复由于浏览器的 `navigator.onLine` 误标为 false，导致 SDK 认为网络断开，阻止登录房间的问题。

---
