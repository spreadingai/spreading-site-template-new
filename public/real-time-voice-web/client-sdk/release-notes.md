# 发布日志

- - -


## 3.9.0 版本 <a id="3.9.0"></a>

**发布日期：2025-04-11**

**新增功能**

1. 所有网络请求支持 IPv6 协议

    <Warning title="注意">

    如需使用该功能，请联系 ZEGO 技术支持。

    </Warning>



    SDK 新增对 IPv6 协议的支持。开发者可以定网络请求优先采用 IPv6 协议还是 IPv4 协议。默认情况下，SDK 优先采用 IPv4 协议。

**改进优化**

1. 优化均衡型 AI 降噪模式的性能

    针对单声道场景，均衡模式 AI 降噪功耗减少 50%

    相关 API 请参考 [setAiDenoiseMode](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#set-ai-denoise-mode)、[enableAiDenoise](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#enable-ai-denoise)

2. 优化错误码

    对异常错误码进行了更精细的分类，修改了部分现有错误码的逻辑，调整如下：

    | 新错误码 | 原错误码 | 错误描述 |
    | --- | --- | --- |
    | 1002014 | 1100001 | <ul><li>说明：[setRoomExtraInfo](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#set-room-extra-info) 函数输入的 roomID 校验错误。</li><li>处理建议：请检查相关参数。</li></ul> |
    | 1002015 | 1100001 | <ul><li>说明：[setRoomExtraInfo](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#set-room-extra-info) 函数输入的房间附加信息 key 长度大于或等于 128 字节。</li><li>处理建议：请检查相关参数长度。</li></ul> |
    | 1002016 | 1100001 | <ul><li>[setRoomExtraInfo](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#set-room-extra-info) 函数输入的房间附加信息 value 长度大于或等于 128 字节。</li><li>处理建议：请检查相关参数长度。</li></ul> |
    | 1002037 | 1002001 | <ul><li>同时登录的房间总数量超过限制。</li><li>可能原因：同时登陆过多房间。</li><li>处理建议：联系 ZEGO 技术支持人员。</li></ul> |
    | 1003028 | 1103027 | <ul><li>房内已有相同的流导致推流失败。</li><li>可能原因：房间内已有相同的流。</li><li>处理建议：更换新的流 ID。调整流名生成策略，保证唯一性。</li></ul> |
    | 1003040 | 1000055 | <ul><li>更新转推 CDN 状态失败。</li><li>可能原因：转推地址 URL 不正确。</li><li>处理建议：检查输入的 URL 是否有效。</li></ul> |
    | 1004025 | 1104039 | <ul><li>说明：拉流失败。</li><li>可能原因：该流被后台系统配置为禁止推送。</li><li>处理建议：请联系技术支持解决。</li></ul> |
    | 1009005 | 1000002 | <ul><li>发送消息的目标房间与当前登录的房间不一致。</li><li>可能原因：发消息时使用错误的房间 ID 。</li><li>处理建议：请传入当前登录的房间 ID。</li></ul> |
    | 1009015 | 1109001 | <ul><li>发送房间广播消息失败。</li><li>可能原因：QPS 超过限制。</li><li>处理建议：控制最大 QPS 为 2。</li></ul> |

**问题修复**

1. 修复偶现的登录房间耗时过长问题

2. 修复偶现的自定义音频采集没有声音的问题

3. 修复了用户退出未登录的房间时没有接收到 roomStateChanged 回调的问题

---

## 3.8.0 版本 <a id="3.8.0"></a>

**发布日期：2025-02-12**

**新增功能**

1. 流控策略支持弱网时优先保障音频体验

    推流时新增 [ZegoWebPublishOption > trafficControlMinVideoMode](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoWebPublishOption#traffic-control-min-video-bitrate) 配置项，当用户网络质量较差无法流畅推送音视频时（默认 [ZegoWebPublishOption > trafficControlMinVideoBitrate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoWebPublishOption#traffic-control-min-video-bitrate) 小于 50kbps，也可自行设置阈值），SDK 将自动切换至纯音频推流模式，优先保障音频流畅性。当用户网络质量改善后，SDK 将自动恢复音视频推流。该功能适用于教育以及会议场景，确保通话清晰流畅。

    相关 API 请参考 [ZegoWebPublishOption > trafficControlMinVideoMode](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoWebPublishOption#traffic-control-min-video-bitrate)

2. 支持获取麦克风采集到的音频原始数据（PCM）

    支持通过 [setCaptureAudioFrameCallback](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#set-capture-audio-frame-callback) 回调接口获取麦克风采集到的原始音频数据，数据格式为 PCM。

    相关 API 请参考 [setCaptureAudioFrameCallback](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#set-capture-audio-frame-callback)

3. 新增音视频轨道更新回调

    当业务需要自定义渲染本地音视频时，可监听本地音视频轨道变化，及时获取最新音视频轨道对象，适用于监听音视频采集与前处理阶段。

    相关 API 请参考 [videoTrackChanged](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~interface~ZegoLocalStreamEvent#video-track-changed)、[audioTrackChanged](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~interface~ZegoLocalStreamEvent#audio-track-changed)、[captureVideoTrackChanged](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~interface~ZegoLocalStreamEvent#capture-video-track-changed)、[captureAudioTrackChanged](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~interface~ZegoLocalStreamEvent#capture-audio-track-changed)

4. 支持初始化 SDK 前，获取 SDK 版本号

    支持初始化 SDK 前，获取 SDK 版本号，以匹配前置的业务数据上报时机。

    相关 API 请参考 [ZegoExpressEngine > version](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#version)

5. 新增编码兼容策略，设备异常时自动切换编码格式

    <Warning title="注意">


    - 如需使用该功能，请联系 ZEGO 技术支持设置。
    - 使用该功能时，业务需要注意拉流端对 H.264、VP8 的编码兼容，例如微信小程序仅支持 H.264。 

    </Warning>



    若识别到当前设备不支持当前编码格式，或编码过程中出现编码异常时，支持自动切换编码。目前默认支持 H.264 编码，当设备不支持 H.264 编码时，切换为 VP8。

    相关 API 请参考 [ZegoWebPublishOption > enableAutoSwitchVideoCodec](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoWebPublishOption#traffic-control-min-video-bitrate)、[publisherVideoEncoderChanged](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoRTCEvent#publisher-video-encoder-changed)


**改进优化**

1. 优化音视频采集接口逻辑

    使用 [startCaptureCamera](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoLocalStream#start-capture-camera)、[startCaptureMicrophone](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoLocalStream#start-capture-microphone) 等采集接口，但未传入音视频相关参数时，SDK 将使用 [ZegoLocalStream](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoLocalStream) 中，已配置的音视频配置参数（以最后一次配置值的为准），若未配置相关参数，将会使用 SDK 默认配置。


**问题修复**

1. 修复在获取版权音乐抢唱片段歌曲信息的开始和结束时间点时，可能出现错误的问题。

2. 修复在 nuxt3 、uni-app Vue3、vite5、Nextjs15 turbopack 中引入 SDK 后，由于框架兼容问题，可能出现编译报错的问题。

3. 修复不登录房间的情况下，调用 [ZegoExpressPlayer > verify](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressPlayer#verify) 会出现鉴权失败的问题。

---
## 3.7.4 版本 <a id="3.7.4"></a>

**发布日期：2024-11-15**

**新增功能**

1. 新增拉流音轨更新回调

    新增拉流音轨（[playerAudioTrackUpdate](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~interface~ZegoRTCEvent#player-audio-track-update)）更新回调。通过该回调获取拉流的音轨，然后根据需求进行音频的渲染处理。

    <Note title="说明">


    如果没有对音频渲染特殊处理的需求，不建议使用该回调，大部分场景推荐用 [ZegoStreamView](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoStreamView) 进行渲染。

    </Note>






**问题修复**

1. 修复其他已知问题

---


## 3.7.1 版本 <a id="3.7.1"></a>

**发布日期：2024-10-29**

**新增功能**

1. 支持快速切换房间

    支持通过 [switchRoom](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#switch-room) 接口，快速便捷地实现切换房间的功能。
    - 切换房间默认会停止当前房间的所有推流和拉流， 但不会停止预览。如果要停止预览，可调用 [destroyStream](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#destroy-stream) 停止预览。如需不停止拉流，可联系 ZEGO 技术支持进行设置。
    - 如果设置了 CDN 手动转推，切换房间时不会自动停止，需要用户调用 [removePublishCdnUrl](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#remove-publish-cdn-url) 手动停止 CDN 转推。


    相关 API 请参考 [switchRoom](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#switch-room)


2. 推流端支持流量控制功能


    推流前支持通过  [enableTrafficControl](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoWebPublishOption#enable-traffic-control)  开启流量控制，适应当前网络环境及网络波动，以实现自适应码率 ，从而保证音视频能流畅推送。同时支持通过[trafficControlMinVideoBitrate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoWebPublishOption#traffic-control-min-video-bitrate) 参数，设置视频最小码率，详情请参考 [流量控制文档](https://doc-zh.zego.im/article/21305)。

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

    支持分别设置观众在上麦前和下麦后的拉流资源类型，使拉流方式更灵活。例如，在某直播连麦场景中，观众可在拉流时通过设置 [ZegoCustomPlayerResourceConfig](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~interface~ZegoCustomPlayerResourceConfig)  的 `beforePublish` 为 L3 拉流、 `publishing`为 RTC 拉流、 `afterPublish` 为 L3 拉流，则此观众在上麦时拉 RTC 流，下麦后自动拉 L3 流。

    相关 API 请参考：[startPlayingStream](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#start-playing-stream)、[ZegoWebPlayOption > customResourceConfig](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~interface~ZegoWebPlayOption#custom-resource-config)



6. 支持在初始化引擎之前设置日志等级

    支持在初始化引擎之前设置日志等级，以减少浏览器控制台打印的日志。

    相关 API 请参考：[presetLogConfig](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#preset-log-config) 

7. 新增推拉流鉴权失败错误码

    新增拉流鉴权错误码（1104046）及 推流鉴权错误码（1103019 ）。开启推流或拉流鉴权时，设置的 [ZegoWebPublishOption > streamParams](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~interface~ZegoWebPublishOption#stream-params) 参数不正确会导致鉴权失败，详情请参考 [错误码文档](https://doc-zh.zego.im/article/5696)。


**问题修复**


1. 修复 [roomStateChanged](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~interface~ZegoRTMEvent#room-state-changed) 首次回调状态错误的问题

---

## 3.6.0 版本 <a id="3.6.0"></a>

**发布日期：2024-08-23**

**改进优化**

1. 优化 SDK 包体积大小

    优化内部代码结构，减小 SDK 包体积

**废弃删除**

1. 废弃拉流接口中关于 CDN Plus 的配置

    下架畅直播概念，废弃 CDN Plus 直播相关接口。如需实现直播功能，推荐使用 ZEGO 自研 [超低延迟直播产品](https://doc-zh.zego.im/article/16015)，实现更高质量的直播体验。

    相关 API 请参考 [ZegoWebPlayOption > resourceMode](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~interface~ZegoWebPlayOption#resource-mode)

---


## 3.5.0 版本 <a id="3.5.0"></a>

**发布日期：2024-06-17**

**新增功能**


1. 新增自动混流功能

    注意：
    - 目前仅支持房间内全部为音频流时，开启自动混流。
    - 在同一个房间内开启下一个自动混流任务前，请先调用  [stopAutoMixerTask](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#stop-auto-mixer-task)  接口结束上一次自动混流任务，以免造成当一个主播已经开启下一个自动混流任务与其他主播混流时，观众依然在拉上一个自动混流任务的输出流的情况。
    - 若用户未主动结束当前自动混流任务，该任务将在房间不存在后，或者输入流持续 90 秒不存在后，自动结束。

    SDK 可以指定房间开启自动混流任务，由 ZEGO 实时音视频服务器自动将房间内的所有音频流进行混流（目前只支持混音频流），常用于语聊房、合唱场景下。该功能可以将麦上主播的流混合之后给麦下观众，从而提升观众的观看体验，并且节省流量，详情请参考 [混流](https://doc-zh.zego.im/article/4967)。

    相关 API 请参考 [startAutoMixerTask](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#start-auto-mixer-task)、[stopAutoMixerTask](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#stop-auto-mixer-task)

2. 混流功能新增功能配置及状态回调

    注意：新版本 SDK 输入流如果为纯音频，必须设置 layout 参数，SDK 不再自动设置，否则会出现报错提示。

    混流功能增加输出视频配置、焦点语音等能力，同时增加混流的状态回调，用于获取混流转发的状态。

    相关 API 请参考 [startMixerTask](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#start-mixer-task)


**改进优化**

1. 优化弱网抗性
    优化 SDK 在网络抖动和低网速场景下的可用性。


2. 优化 SDK 策略，减少安全风险隐患
    优化针对浏览器的调用方式，减少账号、Cookie 等泄漏的安全隐患。


**问题修复**

1. 修复单独使用 [实时有序数据管理器功能](https://doc-zh.zego.im/article/19738#13) 时，会占用摄像头麦克风采集设备的问题


---


## 3.4.0 版本 <a id="3.4.0"></a>

**发布日期：2024-05-06**

**新增功能**

1. 支持按需引入 SDK 各个模块的功能

    注意：仅支持通过 npm 方式单独集成某个功能模块，其余方式不支持。

    - 在 3.4.0 版本之前，开发者集成 ZEGO Web SDK 时，默认同时集成了混音、混流等功能。如果开发者的业务仅需其中的某个功能模块，无法单独集成。
    - 从 3.4.0 版本开始：
        - 开发者依然可以通过主路径引入 SDK，同时集成混音、混流等功能。
        - 同时，开发者也可以按照业务需要，从 `混音`、`混流`、`CDN`、`范围语音`、`美颜` 功能模块中进行选择，并通过 npm 方式单独集成。对于未引入的功能，在构建过程中会自动移除，减少 SDK 包的体积。
  
    详情请参考 [集成 SDK](https://doc-zh.zego.im/article/6839)。

---


## 3.3.0 版本 <a id="3.3.0"></a>

**发布日期：2024-03-21**

**新增功能**

1. 支持均衡型 AI 降噪模式

    注意：当前官网 SDK 不包含此功能，如有需要，请联系 ZEGO 技术支持特殊编包。

    支持均衡型 AI 降噪模式，与原有模式相比，在相同的人声保真效果前提下，噪音抑制效果明显提升，可以达到干净无噪音或不扰人的程度；但性能消耗稍微增加。适用于街道、马路、市场等较为嘈杂（信噪比低）的户外环境中，详情请参考 [AI 降噪](https://doc-zh.zego.im/article/16492)。

    相关 API 请参考 [setAiDenoiseMode](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#set-ai-denoise-mode)、[enableAiDenoise](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#enable-ai-denoise)

2. 支持在拉流时 mute 所有音视频数据

    新增  [muteAllPlayAudioStreams](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#mute-all-play-audio-streams)、[muteAllPlayVideoStreams](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#mute-all-play-video-streams) 接口，本地用户在拉流时，可以控制是否接收所有远端用户的音视频数据。

    开发者可以通过 [mutePlayStreamAudio](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#mute-play-stream-audio)、[mutePlayStreamVideo](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#mute-play-stream-video) 接口，单独控制是否接收指定的音视频流。

    相关 API 请参考 [muteAllPlayAudioStreams](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#mute-all-play-audio-streams)、[muteAllPlayVideoStreams](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#mute-all-play-video-streams)

**改进优化**

1. 优化单房间模式下的房间切换逻辑

    用户成功登录某个房间后，如果没有退出该房间、重复登录该房间或直接登录其他房间，将会操作无效或登录失败，并返回 1002001 错误码。

    相关 API 请参考 [loginRoom](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#login-room)

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

    相关 API 请参考 [setCloudProxyConfig](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#set-cloud-proxy-config)、[setTurnServer](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#set-turn-server)

2. 支持获取音频 PCM 数据

    注意：本功能接口需要在调用 [startPlayingStream](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#start-playing-stream) 接口成功之后调用，停止拉流后会自动停止获取 PCM 数据。每次重新拉流时，需要重新调用本接口获取音频 PCM 数据。

    支持通过监听音频数据回调，获取音频的 PCM 数据。开发者可基于 PCM 数据进行业务处理，例如对接第三方音频鉴黄、生成字幕等。

    相关 API 请参考 [setAudioFrameCallback](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#set-audio-frame-callback)

3. 在混音前，支持对媒体标签的音频数据进行变调处理

    注意：

    - 同一时间内，一个 \<video> 或 \<audio> 标签的数据仅能进行一种音效处理，不可同时进行多种处理，即变声、混响、立体声、变调只能选择一种使用。
    - 针对同一个 \<audio> 标签的音频数据，如果开发者调用了 [setAudioChangerParam](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#set-audio-changer-param)、[enableLiveAudioEffect](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#enable-live-audio-effect)（两个接口都包含 mode 参数，用于设置音效生效模式），则音效生效模式以最后调用的接口设置为准。

    在混音前，支持通过 [setAudioChangerParam](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#set-audio-changer-param) 接口，对媒体标签（\<video> 或 \<audio> 标签）的音频数据进行变调处理。例如，KTV 独唱场景中，使用本功能对伴奏进行升、降调，同时保持人声不变，详情请参考 [混音](https://doc-zh.zego.im/article/5724)。

    相关 API 请参考 [setAudioChangerParam](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#set-audio-changer-param)

**改进优化**

1. 优化 ZegoStreamView 流渲染组件

    在之前的 SDK 版本中，当媒体文件播放失败、触发 autoplayFailed 失败事件回调时，用户需要调用 [ZegoStreamView.resume](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoStreamView#resume) 方法恢复播放，一般是通过网页弹窗提示用户点击。

    从该版本开始，优化了 [ZegoStreamView](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoStreamView) 流渲染组件，当媒体文件播放失败、触发 autoplayFailed 失败事件回调后，用户点击网页上的任意位置，都可自动恢复播放。

    相关 API 请参考 [ZegoStreamView.play](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoStreamView#play)

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

1. 修复通过 [createZegoStream](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#create-zego-stream) 接口创建“只采集音频”或“只采集视频”的媒体流时，设置的 audioBitrate 和 videoBitrate 参数不生效，导致没有使用指定的码率、而使用默认码率进行推流的问题。
2. 修复其他已知问题。

---

## 3.1.0 版本 <a id="3.1.0"></a>

**发布日期：2023-12-01**

**新增功能**

1. SDK 支持设置云代理

    注意：如需使用该功能，请联系 ZEGO 技术支持。

    通过设置 SDK 的云代理接口，将 SDK 对应的所有流量通过云端的代理服务器进行中转，实现与 RTC 通信，详情请参考 [云代理](https://doc-zh.zego.im/article/18899)。

    相关 API 请参考 [setCloudProxyConfig](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#set-cloud-proxy-config)

2. 支持非连续地传输 DTX 音频

    注意：该功能默认关闭，开启后可能会影响音质，请酌情使用。

    支持非连续地传输 DTX 音频，即在推流时不发送静音数据（EnableMic、EnableMicDevice），以此减少不发声时的推流音频码率，在一定程度上节省带宽。

    相关 API 请参考 [startPublishingStream](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#start-publishing-stream)

**改进优化**

1. 优化设备拔插异常、采集异常的相关错误码

    新增如下错误码，通过 [deviceError](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~interface~ZegoRTCEvent#device-error) 回调抛出。

    - 1106007，麦克风松动或者是快速拔插导致采集异常。
    - 1106008，摄像头松动或者是快速拔插导致采集异常。
    - 1106009，检测到音频轨道采集异常停止。
    - 1106010，检测到视频轨道采集异常停止。

    其中，音频采集异常 1106009、麦克风松动或快速拔插导致采集异常 1106007 可能会先后被触发；同理 1106010、1106008 也可能会先后被触发。

    详情请参考 [常见错误码](https://doc-zh.zego.im/article/5696)。

2. 精简压缩 SDK 包，包体缩小至 1.7 MB

3. 优化场景化音视频配置 [ZegoScenario](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~enum~ZegoScenario)，提升用户观看体验

4. 优化 WebRTC 推拉流策略，提升稳定性；同时，优化协商流程，降低推拉流耗时

5. 优化 SDK 在不同设备上的拉流兼容性

    在某些设备不支持 “视频编码” 或 “音频编码” 时，旧版本 SDK 会直接拉流失败。从该版本开始，优化 SDK 在不同设备上的拉流兼容性：

    - 在不支持 “视频编码” 的设备上，只拉音频流。
    - 在不支持 “音频编码” 的设备上，只拉视频流。

    相关 API 请参考 [startPlayingStream](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#start-playing-stream)

6. 优化多端登录逻辑

    用户在 A 设备上登录成功后，A 设备断网；然后使用同一 userID 在 B 设备上登录成功。此时如果 A 设备网络恢复，重连会失败，并抛出 1002050 错误码，提示该 userID 已在其他设备登录。

---

## 3.0.1 版本 <a id="3.0.1"></a>

**发布日期：2023-10-27**

**问题修复**

1. 修复在 iOS 15.1 系统的 Safari 浏览器上，调用 [createZegoStream](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#create-zego-stream) 接口后再推流，页面会 crash 的问题
2. 修复在 Windows 系统的 Chrome 浏览器上，调用 [createRemoteStreamView](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#create-remote-stream-view) 接口创建播放器组件，切换后台会有卡顿的问题

---

## 3.0.0 版本 <a id="3.0.0"></a>

**发布日期：2023-10-19**

**新增功能**

1. 新增创建媒体流、更新媒体流等接口，优化音视频通话逻辑

    <Warning title="注意">


    - Express SDK 3.0.0 版本优化了 SDK 的内部逻辑，提高了 SDK 稳定性、音视频通话质量、以及 API 接口的易用性，ZEGO 强烈推荐您使用 3.0.0 或以上版本的 SDK。
    - 旧版本的 [createStream](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#create-stream) 等一系列接口，将于 3.0.0 版本正式废弃，请您及时更新您的代码逻辑，避免影响您的业务正常使用，详情请参考 [3.0.0 及以上版本升级指南](https://doc-zh.zego.im/article/18531)。  

    </Warning>



    新增创建媒体流 [createZegoStream](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#create-zego-stream)、更新媒体流 [updatePublishingStream](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#update-publishing-stream) 等接口，开发者可以通过该接口生成 zego 流对象，该流对象具有替换或增加音视轨、预览流、停止采集等功能，优化推流过程，缩短接入时间，提升接入体验。

    与之前版本的 [createStream](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#create-stream) 接口相比，3.0.0 及以上版本的 SDK 将直接管理 localStream（MediaStream），降低推拉流失败的风险。

    相关 API 请参考 [createZegoStream](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#create-zego-stream)、[updatePublishingStream](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#update-publishing-stream)、[ZegoLocalStream](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoLocalStream)

2. 新增播放器插件

    新增 ZEGO 自研 Web 播放器插件，集成插件后，支持拉取 H.265 和 H.264 格式的 CDN 直播流，同时支持常用的播放器控制功能，详情请参考 [播放器插件](https://doc-zh.zego.im/article/18459)。

    相关 API 请参考 [ZegoExpressPlayer](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressPlayer)

3. 新增本地导播插件

    新增本地导播插件，开发者可以使用此插件，在本地对画面和声音进行混合，将多路音视频流或页面元素、合并为一路音视频流后推流，详情请参考 [使用本地导播](https://doc-zh.zego.im/article/18456)。

    适用于在线教育、在线会议、直播带货、秀场直播、游戏直播等场景。

    相关 API 请参考 [ZegoStreamCompositor](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoStreamCompositor)、[createStreamCompositor](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#create-stream-compositor)

4. 新增混流音浪回调

    注意：如需使用该功能，请联系 ZEGO 技术支持。

    在混流时，支持针对指定的流开启声浪回调；开启后，拉混流时可监听指定的流的声浪信息。

    相关 API 请参考 [startMixerTask](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#start-mixer-task)、[autoMixerSoundLevelUpdate](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~interface~ZegoRTCEvent#auto-mixer-sound-level-update)、[mixerSoundLevelUpdate](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~interface~ZegoRTCEvent#mixer-sound-level-update)

5. 新增混响、虚拟立体声、耳返混响功能

    新增预设混响、虚拟立体声、以及配置耳返混响效果的功能，开发者基于此可实现一些音频前处理效果，详情请参考 [变声/混响/立体声](https://doc-zh.zego.im/article/18147)。

    相关 API 请参考 [setReverbPreset](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#set-reverb-preset)、[enableVirtualStereo](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#enable-virtual-stereo)

6. 支持设置音调参数，控制变声效果

    注意：混响、虚拟立体声、变声等功能，不支持同时开启使用，否则效果可能出现异常。

    支持通过传入音调参数来控制变声效果，可用于提升互动的趣味性、或保护用户隐私。

    音调的取值范围为 [-12.0, 12.0]，数值越大声音越尖锐；设置为 0.0 时，表示关闭变声效果。

    相关 API 请参考 [setVoiceChangerParam](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#set-voice-changer-param)

7. 支持获取本地 NTP 时间戳

    支持获取本地的 NTP 时间戳，可用于对齐多端的本地时间。例如，可以在 KTV 合唱场景中，用来对齐歌曲进度。

    相关 API 请参考 [getNetworkTimeInfo](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#get-network-time-info)

**改进优化**

1. 优化推拉流质量数据回调接口，提高支持的调用频率

    推拉流质量数据回调接口的最快调用频率从 “3 秒/次” 提升为 “1 秒/次”，提高支持的调用频率。

    相关 API 请参考  [getPublishingStreamQuality](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#get-publishing-stream-quality)、[getPlayingStreamQuality](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#get-playing-stream-quality)

**问题修复**

1. 修复先调用 [mutePublishStreamAudio]、[mutePublishStreamVideo] 接口，再调用 [replaceTrack] 接口更换音视频轨道后，渲染画面、声音异常的问题
2. 修复初始化引擎后，立即调用 [destroyEngine] 接口销毁引擎会报错的问题

---

## 2.26.0 版本 <a id="2.26.0"></a>

**发布日期：2023-08-18**

**新增功能**

1. 新增地理围栏功能

    注意：

1. 如需使用该功能，请联系 ZEGO 技术支持。
2. 请在创建引擎之前，配置地理围栏信息。

    将音视频及信令数据访问限定在某一区域，用以满足地区数据隐私安全相关法规，即限定用户访问某一特定区域的音视频服务，详情请参考 [地理围栏](https://doc-zh.zego.im/article/18149)。

    相关 API 请参考 [setGeoFence](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#set-geo-fence)

**改进优化**

1. 优化音浪算法，基于音浪监听能够得到更准确的音量大小

    相关 API 请参考 [soundLevelUpdate](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~interface~ZegoRTCEvent#sound-level-update)、[capturedSoundLevelUpdate](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~interface~ZegoRTCEvent#captured-sound-level-update)

2. 优化场景化音视频配置，增加“高音质语聊房”场景

    优化场景化音视频配置，支持“高音质语聊房”场景 HighQualityChatroom，适用于音乐教学等对音质要求高的语聊房场景，详情请参考 [场景化音视频配置](https://doc-zh.zego.im/article/16810)。

    相关 API 请参考 [setRoomScenario](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#set-room-scenario)

3. 优化 SDK 的内部逻辑，提升弱网环境下的通话体验
    
---


## 2.25.6 版本 <a id="2.25.6"></a>

**发布日期：2023-07-17**

**问题修复**

1. 修复在部分 Android 手机的微信浏览器上，偶现用 [ZegoStreamView](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoStreamView) 播放不出声音的问题。
2. 修复其他已知问题。
---

## 2.25.5 版本 <a id="2.25.5"></a>

**发布日期：2023-07-03**

**新增功能**

1. 新增音轨、视轨检测接口

    新增音轨检测接口 [checkAudioTrackIsActive](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#check-audio-track-is-active)、视轨检测接口 [checkVideoTrackIsActive](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#check-video-track-is-active)，开发者可以检测当前音频、视频采集是否正常。

    相关 API 请参考 [checkAudioTrackIsActive](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#check-audio-track-is-active)、[checkVideoTrackIsActive](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#check-video-track-is-active)

**问题修复**

1. 修复其他已知问题。

---

## 2.25.2 版本 <a id="2.25.2"></a>

**发布日期：2023-06-15**

**问题修复**

1. 修复在使用云端录制功能时，SDK 的房间用户更新回调 [roomUserUpdate](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~interface~ZegoRTMEvent#room-user-update) 会抛出预期之外的云端录制机器人用户信息的问题。
2. 修复其他已知问题。

---

## 2.25.1 版本 <a id="2.25.1"></a>

**发布日期：2023-06-08**

**新增功能**

1. 新增销毁引擎实例接口

    注意：该接口调用后，不能再调用同一个引擎实例的其他接口，请开发者及时将该引擎实例置空，避免发生错误。

    新增销毁引擎实例接口 [destroyEngine](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#destroy-engine)，在 SDK 生命周期终点调用该接口，用于回收引擎内部剩余资源，关闭多余的网络连接。

    相关 API 请参考 [destroyEngine](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#destroy-engine)

**改进优化**

1. 优化基础推拉流的质量

    - 降低 20% ～ 30% 的基础推拉流连接耗时，实现更快的推拉流和更低的首帧耗时。
    - 与旧版本相比，优化了弱网条件下的音视频质量。相同的弱网条件下，2.25.0 及以上版本提供了更高质量的音质和画质。

2. 兼容 Chrome 浏览器弃用的 RTCMediaStreamTrackStats

    从 Chrome 112 版本开始，弃用了 RTCMediaStreamTrackStats，从而导致 SDK 中的 [publishQualityUpdate](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~interface~ZegoRTCEvent#publish-quality-update)、[playQualityUpdate](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~interface~ZegoRTCEvent#play-quality-update) 回调中返回的信息受到影响。受影响的字段包括：videoTransferFPS，frameHeight、frameWidth、audioLevel、audioSendLevel、audioSamplingRate 等本地和远端的媒体信息字段。

    2.25.0 及以上版本的 SDK 兼容了 RTCMediaStreamTrackStats，保证回调返回信息的正确和完整。

    相关 API 请参考 [publishQualityUpdate](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~interface~ZegoRTCEvent#publish-quality-update)、[playQualityUpdate](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~interface~ZegoRTCEvent#play-quality-update)

**问题修复**

1. 修复部分弱网场景中无法新增房间流的问题。

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


1. 混流接口支持为输入流添加图片、文字水印、视频圆角，支持为输出流添加水印

    相关 API 请参考 [startMixerTask](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#start-mixer-task)


2. 范围语音支持自定义设置发声模式和收听模式

    注意：
    - 自定义设置发声收听模式和旧版本的范围语音模式只能二选一，即不能跟  [setRangeAudioMode](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressRangeAudio#set-range-audio-mode) 接口一起调用。
    -  Web 自定义发声模式及收听模式仅支持与 iOS、Android 、Windows、macOS、Linux 平台的 Express SDK  3.3.0 及以上版本互通。

    范围语音支持自定义设置发声模式和收听模式，用户可通过选择发声模式来决定，哪些人可以收听到他的声音，也可通过选择收听模式来决定，收听哪些人的声音，详情请参考 [游戏语音](https://doc-zh.zego.im/article/12289)。

    相关 API 请参考 [setRangeAudioCustomMode](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressRangeAudio#set-range-audio-custom-mode)


3. 范围语音新增隐秘小队模式

    [ZegoRangeAudioMode](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~enum~ZegoRangeAudioMode) 新增隐秘小队模式 `SecretTeam`，在该模式下，同一房间下的用户，收听者既能与同一小队的人交流，也能听到所有在音频接收范围内，且为全世界模式的发声者的声音，如太空狼人杀游戏场景，详情请参考 [游戏语音](https://doc-zh.zego.im/article/12289)。

    相关 API 请参考 [setRangeAudioMode](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressRangeAudio#set-range-audio-mode)

4. Web 端支持触发 [networkQuality](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~interface~ZegoRTCEvent#network-quality) 事件，用于获取本地用户和远端用户的推拉流质量情况。

    相关 API 请参考 [networkQuality](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~interface~ZegoRTCEvent#network-quality)

**改进优化**

1. 优化混音接口

    调用 [startMixingAudio](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#start-mixing-audio) 接口时，已混音的 audio 标签播放器的 src 更换资源后，SDK 自动重新混音，无需额外调用接口。

    相关 API 请参考 [startMixingAudio](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#start-mixing-audio)，[stopMixingAudio](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#stop-mixing-audio)


2. 优化变声功能兼容性，支持移动端使用

    如需使用变声功能，请参考 [变声](https://doc-zh.zego.im/)。

    相关 API 请参考 [setVoiceChangerPreset](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#set-voice-changer-preset)

3. 优化 AI 降噪功能兼容性，支持移动端使用

    如需使用 AI 降噪功能，请参考 [AI 降噪](https://doc-zh.zego.im/article/16492)。

    相关 API 请参考 [enableAiDenoise](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#enable-ai-denoise)

4. SEI 功能优化，支持不设置 `unregisterSEIFilter` 属性进行条件过滤

    对于 payloadType 为 5 的 SEI 内容，当 [ZegoSEIConfig](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~interface~ZegoSEIConfig) 的 `SEIPass`参数值设为 true，且没有设置 `unregisterSEIFilter` 时，则放开所有 SEI 的发送和接收。当 [ZegoSEIConfig](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~interface~ZegoSEIConfig) 的 `SEIPass` 参数值设为 false 时（默认值），则只发送和接收符合 `unregisterSEIFilter` 的 SEI 内容。

    相关 API 请参考 [setSEIConfig](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#set-sei-config)

5. 优化 SEI 开关防竞争码处理

    在发送 SEI 二进制数据时，可能与 H264 中 NALU 的分片开头标识符相同，导致 NALU 切片出现错误。因此 [ZegoSEIConfig](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~interface~ZegoSEIConfig) 新增 `emulationPreventionByte` 属性，优化 SEI 开关防竞争码处理，即将 SEI 数据中与标识符相同的内容进行编码后，再发送出去，由拉流端接收时进行解码，可有效避免该情况的出现。

    相关 API 请参考  [setSEIConfig](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#set-sei-config)

**问题修复**

1. 修复 [ZegoStreamView](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoStreamView) 的 [canPlayAudio](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~interface~ZegoLocalStreamEvent#can-play-audio) 和 [canPlayVideo](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~interface~ZegoLocalStreamEvent#can-play-video) 事件在 iOS 微信浏览器没有触发的问题。
2. 修复在一个页面拉 25 条流时，偶现的没有触发音浪回调且播放没有声音的问题。
3. 修复 [startPlayingStream](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#start-playing-stream) 接口从 RTC 换成 L3 拉流时，会出现拉流重试耗时较长的问题。 
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

    相关 API 请参考 [setVoiceChangerPreset](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#set-voice-changer-preset)

2. 新增 [exceptionUpdate](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~interface~ZegoRTCEvent#exception-update) 回调，用于监听采集、编码、渲染异常等问题

    相关 API 请参考 [exceptionUpdate](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~interface~ZegoRTCEvent#exception-update)

**改进优化**


1. Web 的播放组件添加首帧播放事件

    Web 的媒体流播放组件  [ZegoStreamView](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoStreamView) 的  [on](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoStreamView#on) 接口新增  [canPlayVideo](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~interface~StreamViewEvent#can-play-video) 及 [canPlayAudio](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~interface~StreamViewEvent#can-play-audio) 事件 ，分别用于监听播放器视频和音频的首帧播放。

    相关 API 请参考 [canPlayVideo](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~interface~StreamViewEvent#can-play-video)，[canPlayAudio](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~interface~StreamViewEvent#can-play-audio)

2. 优化了 SDK 内部策略，提升了弱网和首帧表现

**问题修复**


1. 修复在使用 [setAudioMuted](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoStreamView#set-audio-muted) 和 [play](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoStreamView#play) 接口关闭音频，并播放纯视频时，仍然受到浏览器自动播放限制，导致无法播放的问题。
2. 修复 [checkSystemRequirements](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#check-system-requirements)  接口无法校验到 SDK 是否使用 HTTPS 或 localhost 的问题。
3. 修复重复登录大房间（房间人数超过一定规模，例如超过 500 人）时，偶现拉流端 [roomStreamUpdate](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~interface~ZegoRTCEvent#room-stream-update) 回调没监听到房间流新增的问题。


---


## 2.22.0 版本 <a id="2.22.0"></a>

**发布日期：2023-01-06**

**新增功能**

1. 范围语音支持获取回调范围内的用户列表

    范围语音支持通过  [enableAudioSourceUpdateChecker](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressRangeAudio#enable-audio-source-update-checker) 接口获取回调范围内的用户列表，当更新收听者或音源位置时，可触发 [audioSourceWithinRangeUpdate](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~interface~ZegoRangeAudioEvent#audio-source-within-range-update) 回调。

    相关 API 请参考  [enableAudioSourceUpdateChecker](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressRangeAudio#enable-audio-source-update-checker)，[audioSourceWithinRangeUpdate](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~interface~ZegoRangeAudioEvent#audio-source-within-range-update)


**改进优化**

1. 推流端停止推视频数据时，拉流端画面支持设置停留在最后一帧

    推流端停止推送视频数据时，拉流端视频画面支持设置停留在最后一帧。开发者可以根据业务需要，灵活选择是否停留在最后一帧，或显示黑屏。

    相关 API 请参考 [play](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoStreamView#play)


**问题修复**

1. 修复 Safari 浏览器由于权限问题导致设备状态异常的问题。
2. 修复范围语音切换扬声器设备接口失效的问题。
3. 修复 [startPlayingStream](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#start-playing-stream) 接口的 `resourceMode` 参数配置为 CDN 时，播放非房间内的流，CDN URL 为空的问题。

---

## 2.21.0 版本 <a id="2.21.0"></a>

**发布日期：2022-11-25**

**新增功能**

1. 新增设置房间场景功能

    ​注意：
    - [setRoomScenario](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#set-room-scenario)  需要在登录房间前调用才生效。
    - 调用 [setRoomScenario](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#set-room-scenario)  接口修改后的场景，不影响已生成的流，只对调用 [setRoomScenario](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#set-room-scenario) 接口后，再调用 [createStream](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#create-stream) 生成的流生效。

    为方便开发者快速接入，降低开发者接入门槛，SDK 提供多种预设场景。开发者可根据所需场景，选择对应的房间模式，SDK 将自动应用适合该场景的音视频编解码器、音视频参数、流控策略等配置，从而快速实现该场景下的最佳效果。

    ​当前支持场景包括标准 1v1 音视频通话、高画质 1v1 音视频通话、标准语聊房，详情请参考 [场景化音视频配置](https://doc-zh.zego.im/article/16810) 文档。

    相关 API 请参考 [setRoomScenario](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#set-room-scenario)，​[createStream](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#create-stream) ​​
    ​

2. 范围语音流新增 AI 降噪功能

    ​注意：
    - 如需使用该功能，请联系 ZEGO 技术支持进行特殊编包。
    - AI 降噪需特殊编包，并通过 [ZegoExpressRangeAudio.enableAiDenoise](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressRangeAudio#enable-ai-denoise) 接口进行设置，不跟 3A 等音频相关参数一起设置，相互独立。

    范围语音流支持开启 AI 降噪功能。通话场景下将除人声外的所有声音识别为噪音并进行消除。 在消除稳态噪声的基础上，有效消除非稳态噪声且实现人声高保真，主要噪声包括鼠标、键盘声、敲击、空调、厨房碗碟、嘈杂餐厅、环境风声、咳嗽、吹气等非人声噪声。

    ​相关 API 请参考 [ZegoExpressRangeAudio.enableAiDenoise](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressRangeAudio#enable-ai-denoise)
    ​
    ​
    ​

3. 范围语音支持自定义拉流，且支持将音频文件作为发声源，并支持设置发声范围和发声源位置

    注意：移动端 Web 平台由于兼容性问题不支持开启空间音效，但仍有范围控制效果。
    ​
    ​相关 API 请参考 [setStreamVocalRange](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressRangeAudio#set-stream-vocal-range)， [updateStreamPosition](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressRangeAudio#update-stream-position)，[setCustomSourceVocalRange](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressRangeAudio#set-custom-source-vocal-range)，
    [updateCustomSourcePosition](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressRangeAudio#update-custom-source-position)​


**问题修复**

1. 修复调用  [mutePublishStreamVideo](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#mute-publish-stream-video) 和  [mutePublishStreamAudio](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#mute-publish-stream-audio) 接口后，使用 Safari 浏览器拉流时，必定出现的拉流端页面会闪一下的问题 ​

2. 修复用户使用 Chrome58 浏览器时，Express SDK 调用   [startPublishingStream](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#start-publishing-stream) 方法有兼容性问题出现报错后，导致推流没有继续进行的问题

3. 修复范围语音和 [ZegoStreamView](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoStreamView) 媒体流播放组件，在 iOS Safari 浏览器上被其他软件音频抢占中断播放，在结束抢占后，没有恢复播放的问题。


---

## 2.20.2 版本 <a id="2.20.2"></a>

**发布日期：2022-11-04**

**改进优化**

1. 优化推拉流的节点重试逻辑及多集群保底策略。

**问题修复**

1. 修复 SDK 在网络检测时，需依赖浏览器的网络状态标识，导致登录失败的问题。

---

## 2.20.1 版本 <a id="2.20.1"></a>

**发布日期：2022-10-27**

**新增功能**

1. 使用设备被移除时，支持自动切换可用设备

    新增开启自动化切换设备接口 [enableAutoSwitchDevice](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#enable-auto-switch-device)，可以通过调用该接口开启自动化切换设备开关，在当前设备被移除时，SDK 会根据浏览器中的设备列表自动切换为第一个设备。由于版本兼容性，该开关默认关闭，建议用户可打开该开关。

    相关 API 请参考  [enableAutoSwitchDevice](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#enable-auto-switch-device) 

**改进优化**

1. 优化音浪回调功能

    优化了原有的音浪回调实现方式，提高音浪回调功能的兼容性和性能。

**问题修复**

1. 修复在发送方发送房间附加消息后，发送方退出并立刻重新进入房间的情况下，收不到房间附加消息的问题。
2. 修复推拉流失败重试时，重复报错的问题。
3. 修复 SDK 在实现 [游戏语音](https://doc-zh.zego.im/article/12289) 功能时，在部分设备或浏览器拉流并切后台，没有声音或出现杂音的问题。
4. 修复  [roomStreamUpdate](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~interface~ZegoRTCEvent#room-stream-update)  部分情况下，会回调出本端推出的流的删除信息。
5. 修复由于浏览器的 `navigator.onLine` 误标为 false，导致 SDK 认为网络断开，阻止登录房间的问题。

---

## 2.19.0 版本 <a id="2.19.0"></a>

**发布日期：2022-09-09**

**新增功能**

1. 新增 AI 降噪功能

    注意：
    - 如需使用该功能，请联系技术支持进行特殊编包。
    - 在调用 [enableAiDenoise](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#enable-ai-denoise) 接口之前，请先调用 [createStream](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#create-stream) 接口创建媒体流。
    - AI 降噪功能仅支持在 PC 端 Web 平台上使用，移动端 Web 平台暂不支持。理论上 AI 降噪功能支持在 Google Chrome 66.0、Edge 79.0、FireFox 76.0 和 Safari 14.1 及以上版本使用，但为了确保 AI 降噪功能的稳定性，推荐您使用最新版的 Google Chrome 浏览器和 Edge 浏览器。
    - 当前 AI 降噪功能仅支持对单条流进行降噪处理，无法对多条流同时进行降噪。

    ZEGO Express Web SDK 提供 AI 降噪功能，开发者可以在使用麦克风采集声音时，对声音进行降噪处理。在传统降噪消除稳态噪声的基础上，同步处理非稳态噪声（包括鼠标点击声、键盘声、敲击声、空调声、厨房碗碟碰撞声、餐厅嘈杂声、环境风声、咳嗽声、吹气声等非人声噪声），保留纯净语音，提升用户的通话体验。

    相关 API 请参考 [enableAiDenoise](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#enable-ai-denoise)
    ​

2. 支持设备拔出后，自动切换成其他设备
    ​​
    支持在使用推拉流的过程中，采集设备被拔出后，自动切换到当前采集设备列表中的第一个设备。​
    ​

3. 范围语音支持切换扬声器

    注意：当前仅支持 PC 端 Google Chrome 浏览器进行使用。

    新增 [ZegoExpressRangeAudio.selectSpeaker](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressRangeAudio#select-speaker) 接口，用于指定范围语音播放的扬声器设备。

    ​相关 API 请参考 [selectSpeaker](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressRangeAudio#select-speaker)
    ​

4. 范围语音新增设置播放音量大小接口

    新增 [ZegoExpressRangeAudio.setRangeAudioVolume](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressRangeAudio#set-range-audio-volume) 接口，用于设置范围语音播放音量，可设置范围为 [0,200]，默认值为 100。

    相关 API 请参考 [ZegoExpressRangeAudio.setRangeAudioVolume](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressRangeAudio#set-range-audio-volume)   


**改进优化**

1. 优化 setCaptureVolume 接口的采集音量功能

    [setCaptureVolume](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#set-capture-volume) 接口支持在原有的采集音量基础上再做音量增益，增益区间由 [0,100] 调整为 [0,200]。

    相关 API 请参考  [setCaptureVolume](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#set-capture-volume) 
    ​

2. 推拉流质量数据增加音视频卡顿率的卡顿时长
    ​​
    在 [playerStateUpdate](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~interface~ZegoRTCEvent#player-state-update) 回调接口中，补充卡顿相关的指标信息，字段定义如下：
    - audioCumulativeDecodeTime：累计音频解码时长，单位：ms。
    - audioCumulativeBreakTime：累计音频卡顿时长，单位：ms。
    - audioCumulativeBreakRate：累计音频卡顿率，取值范围为 0.0 ~ 1.0。


    ​相关 API 请参考 [playerStateUpdate](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~interface~ZegoRTCEvent#player-state-update) 

3. 优化范围语音位置更新功能

    范围语音支持设置 SDK 内部实时更新位置的频率。

    ​相关 API 请参考 [ZegoExpressRangeAudio.setPositionUpdateFrequency](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressRangeAudio#set-position-update-frequency) 


**问题修复**

1. 修复 v2.17.0 版本后， [setVideoConfig](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#set-video-config) 接口部分入参必选的问题。
2. 修复屏幕共享设置起始码率不生效的问题。
3. 修复范围语音切换房间时，未停止拉原房间的流的问题。



---


## 2.18.0 版本 <a id="2.18.0"></a>

**发布日期：2022-08-05**

**改进优化**

1. 优化登录成功率

    优化域名连接策略，当默认域名连接失败时，重试备用域名。

**问题修复**

1. 修复偶现流删除事件丢失的问题。
2. 修复不同平台使用相同 SteamID 推流异常的问题。
3. 修复断网情况下，推拉流质量仍为优的问题。
4. 修复范围语音偶现没有声音的问题。


---


## 2.17.1 版本 <a id="2.17.1"></a>

**发布日期：2022-07-12**

**问题修复**

1. 修复 npm 引入时，缺少相关依赖问题。

---

## 2.17.0 版本 <a id="2.17.0"></a>

**发布日期：2022-07-08**

**新增功能**

1. 新增 MediaStream 媒体流播放组件

    新增 MediaStream 媒体流播放组件，具备播放媒体、管理播放等能力，简化用户接入流程和管理流程。

    相关 API 请参考 [createLocalStreamView](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#create-local-stream-view)，[createRemoteStreamView](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#create-remote-stream-view)，[ZegoStreamView](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoStreamView)

2. 范围语音功能支持自定义选择麦克风

    在使用范围语音能力时，可以指定麦克风。通过 [getMicrophones](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#get-microphones) 获取麦克风设备，再调用 [ZegoExpressRangeAudio.selectMicrophone](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressRangeAudio#select-microphone) 来通过 deviceID 指定使用麦克风设备。

    相关 API 请参考 [selectMicrophone](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressRangeAudio#select-microphone)

3. 范围语音功能支持回声消除

    范围语音支持回声消除功能，在用户开启设备外放进行说话时，麦克风可能会采集到远端的声音，回声消除功能将消除可能出现的回声噪音。

    相关 API 请参考 [enableSpeaker](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressRangeAudio#enable-speaker)

4. 支持创建摄像头媒体流相关参数约束

    注意: 对获取媒体流的分辨率进行约束参数的设置时，不建议使用过低的参数进行约束（分辨率设置小于 100x100），否则可能会出现推流失败或者拉不到流的情况。

    当选择 videoQuality 为 4，设置 width、height、frameRate 时，可以设置可选的约束对象，包含 exact、ideal、max 和 min 四个配置项，从而分别设置媒体流的 width、height、frameRate 的配置：

    - exact：严格指定采集设备最终输出的值，如果设备不支持指定的值，采集会失败。
    - ideal：期望采集设备最终输出的值，如果设备不支持指定的值，会尽量输出一个最靠近的值。
    - max：采集设备最终输出的值上限。
    - min：采集设备最终输出的值下限。

    相关 API 请参考 [createStream](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#create-stream)，[setVideoConfig](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#set-video-config)，[ZegoPublishStreamConfig](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~interface~ZegoPublishStreamConfig)，[ZegoCamera](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~interface~ZegoCamera)，[ZegoScreen](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~interface~ZegoScreen)

**改进优化**

1. 美颜功能新增异常事件回调

    新增美颜功能异常的事件回调，涉及如下错误码：

    - 1103072：浏览器不支持 WebGL, 可能在启动或运行时出现，此时 SDK 会关闭美颜。
    - 1103074：当前视轨不支持开启美颜，在启动时报错，SDK 会关闭美颜。
    -  1103075：美颜性能过载，此时画面会卡顿，SDK 不会关闭美颜，开发者可自行判断是否关闭美颜能力。

    相关 API 请参考 [beautyEffectError](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~interface~ZegoRTCEvent#beauty-effect-error)

2. 范围语音收听范围判断优化

    提高范围语音功能判断是否超出了收听范围的频次（当前为1秒），从而在开发者调用接口更新位置后能更灵敏的判断声音有无。

**问题修复**

1. 修复了当美颜离屏后再回到页面时，帧渲染任务异常，导致帧率会有一段时间异常上升的问题。
2. 修复了范围语音功能在开启 3D 音效的情况下，移动自身位置到音源范围后，可能接收不到音源声音的问题。
3. 修复了音效播放器功能 resumeEffect 接口返回值错误、setEffectVolume 设置音量大小接口参数错误、stopEffect 接口可能误停止其他音效的问题。

---

## 2.16.1 版本 <a id="2.16.1"></a>

**发布日期：2022-06-10**

**问题修复**

1. 修复了因声明文件缺失，导致使用 TypeScript 引入 SDK 可能出现类型校验报错的问题。

---
## 2.16.0 版本 <a id="2.16.0"></a>

**发布日期：2022-05-11**

**新增功能**

1. 新增发送 SEI 功能

    SEI（媒体补充增强信息） 是 H.264 编码视频中的补充增强信息（例如文本信息），用于视频通话时在视频流中附带一些信息传递给对端，可以做到画面和附加信息精准对齐。常用于直播答题、歌词同步等场景。

    开发者推流成功后可以调用 [sendSEI](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#send-sei) 接口发送 SEI 信息，对端在拉流时接收到推流端发送的 SEI 信息之后会触发 [playerRecvSEI](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~interface~ZegoRTCEvent#player-recv-sei) 回调。

    相关 API 请参考 [sendSEI](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#send-sei)、[setSEIConfig](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#set-sei-config)、[playerRecvSEI](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~interface~ZegoRTCEvent#player-recv-sei)、[startPublishingStream](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#start-publishing-stream)、[startPlayingStream](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#start-playing-stream)

2. 新增房间状态变化通知 [roomStateChanged](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~interface~ZegoRTMEvent#room-state-changed)

    当房间的连接状态发生变化时会触发 [roomStateChanged](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~interface~ZegoRTMEvent#room-state-changed) 回调，通过“ZegoRoomStateChangedReason” 参数提供更加详细的连接状态及状态变化原因。

    2.16.0 及以上版本推荐使用 [roomStateChanged](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~interface~ZegoRTMEvent#room-state-changed) 回调来替代 [roomStateUpdate](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~interface~ZegoRTMEvent#room-state-update) 回调监听房间状态变化。


    相关 API 请参考 [loginRoom](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#login-room)、[logoutRoom](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#logout-room)、[roomStateChanged](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~interface~ZegoRTMEvent#room-state-changed)


**改进优化**

1. 设置音视频配置接口、混音功能相关接口以及音效播放器 [ZegoAudioEffectPlayer](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoAudioEffectPlayer) 实例的方法都支持在推流成功前的预览阶段调用

    设置音视频配置接口 [setVideoConfig](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#set-video-config) 和 [setAudioConfig](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#set-audio-config) 从版本开始支持在预览阶段调用，可以在推流成功前修改视频的分辨率、帧率、码率、音频 3A 等参数。

    混音功能相关接口 [startMixingAudio](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#start-mixing-audio)、[stopMixingAudio](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#stop-mixing-audio) 和 [setMixingAudioVolume](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#set-mixing-audio-volume) 从版本开始支持在预览阶段调用。

    音效播放器 [ZegoAudioEffectPlayer](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoAudioEffectPlayer) 实例的方法，例如 [start](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoAudioEffectPlayer#start)、[stop](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoAudioEffectPlayer#stop)、[pause](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoAudioEffectPlayer#pause) 等，从此版本开始，支持在预览阶段调用。

    以上接口在 2.15.0 及之前版本都只支持推流成功后调用。

    相关 API 请参考 [setVideoConfig](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#set-video-config)、[setAudioConfig](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#set-audio-config)、[startMixingAudio](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#start-mixing-audio)、[stopMixingAudio](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#stop-mixing-audio)、[setMixingAudioVolume](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#set-mixing-audio-volume)、[ZegoAudioEffectPlayer](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoAudioEffectPlayer)


**问题修复**

1. 修复了调用 [setAudioConfig](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#set-audio-config) 接口会导致 [setCaptureVolume](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#set-capture-volume) 接口设置音量失效的问题。
2. 修复了调用 [loginRoom](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#login-room) 接口传入的 Token 错误时，没有触发 [roomStateUpdate](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~interface~ZegoRTMEvent#room-state-update) 状态回调（此时状态应该为 “DISCONNECT” ）的问题。
3. 修复了火狐浏览器推流调用 [mutePublishStreamVideo](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#mute-publish-stream-video) 关闭视轨时，拉流端画面会卡最后一帧，持续 1s ～ 3s 之后才关闭画面的问题。
4. 修复了使用剩余有效期超过 2147483647ms 的 Token 进行登录会立即触发 [tokenWillExpire](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~interface~ZegoRTMEvent#token-will-expire) 事件回调的问题。


---



## 2.15.1 版本 <a id="2.15.1"></a>

**发布日期：2022-04-14**

**问题修复**

1. 修复已知问题

---


## 2.15.0 版本 <a id="2.15.0"></a>

**发布日期：2022-04-08**

**新增功能**

1. 新增音效文件播放器功能

    音效是指为了增强真实感或者烘托场景氛围播放的简短效果音，例如：在直播期间播放掌声、礼物音效、提示音等；在游戏中，播放子弹声、碰撞打击声。
    ZegoExpress SDK 提供音效文件播放器，通过 ZegoAudioEffectPlayer 统一管理媒体流上的音效，支持音效播放（可以多音效重叠播放）、播放控制（如暂停播放、音量调节、设置播放进度）、预加载音效等功能。详情请参考 [音效文件播放器](/real-time-video-web/other/audio-effect-player)。

    相关 API 请参考 [createAudioEffectPlayer](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#create-audio-effect-player)、[loadAudioEffect](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#load-audio-effect)、[unloadAudioEffect](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#unload-audio-effect)

2. 支持开启或关闭摄像头采集功能

    创建摄像头媒体流后，调用 [enableVideoCaptureDevice](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#enable-video-capture-device) 接口，通过设置 “enable” 参数来开启或关闭摄像头采集功能。例如主播在某一时段不希望被拉流端看到摄像头画面，也不希望摄像头设备一直被占用时，可以设置为关闭。

    相关 API 请参考 [enableVideoCaptureDevice](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#enable-video-capture-device)

3. 支持主动获取推流质量和拉流质量

    开发者可以主动获取推流和拉流质量（包括分辨率、帧率、码率等），用于了解当前流的质量状态，从而进行 UI 展示等相关的业务操作。
    推流成功后，调用 [getPublishingStreamQuality](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#get-publishing-stream-quality) 接口可以主动获取正在推流的流质量。拉流成功后，调用 [getPlayingStreamQuality](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#get-playing-stream-quality) 接口可以主动获取正在拉流的流质量。

    相关 API 请参考 [getPublishingStreamQuality](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#get-publishing-stream-quality)、[getPlayingStreamQuality](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#get-playing-stream-quality)

4. 支持设置指定的扬声器播放声音

    通过 [getSpeakers](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#get-speakers) 接口获取音频输出设备列表后，调用 [useAudioOutputDevice](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoStreamView#use-audio-output-device) 接口，设置媒体标签元素（\<audio> 或 \<video>），并传入deviceID （通过 [getSpeakers](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#get-speakers) 接口获取），使用相应的扬声器设备进行播放。

    相关 API 请参考 [useAudioOutputDevice](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoStreamView#use-audio-output-device) 

5. 支持摄像头关闭时推送静态图片

    关闭摄像头时，支持持续推送 JPEG/JPG、PNG 等格式的静态图片。例如，主播退后台时，会主动关闭摄像头，此时观众侧需要展示主播暂时离开的图片。
    初始化 SDK 后，关闭摄像头之前通过 [setDummyCaptureImagePath](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#set-dummy-capture-image-path) 接口设置所推静态图片的路径，开始正常推流后，调用 [mutePublishStreamVideo](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#mute-publish-stream-video) 接口关闭摄像头时会开始推静态图片，调用 [mutePublishStreamVideo](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#mute-publish-stream-video) 接口打开摄像头时会结束推静态图片。

    相关 API 请参考 [setDummyCaptureImagePath](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#set-dummy-capture-image-path)、[mutePublishStreamVideo](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#mute-publish-stream-video)


**改进优化**

1. 支持登录和拉流并行操作

    支持登录和拉流并行操作，即调用 [loginRoom](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#login-room) 接口后可以立即调用 [startPlayingStream](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#start-playing-stream) 接口（需指定流 ID），用于实现更快的拉流播放效果。

2. 新增 1001004 错误码

    当 AppID 不正确时，会抛出 1001004 错误码，表示认证失败。此时需要检查传入的 AppID 是否与 ZEGO 控制台中的 AppID 是否一致。

3. 新增 1002036 错误码

    多房间功能未开通时，调用 [loginRoom](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#login-room) 接口会抛出 1002036 错误码，表示登录失败，请联系 ZEGO 技术支持开该功能。

4. 新增 1101002 错误码

    当获取流媒体配置失败时，会抛出 1101002 错误码，请联系 ZEGO 技术支持。

5. 新增 1104039 错误码

    调用 [startPlayingStream](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#start-playing-stream) 时传入的 “streamID” 不存在时，会抛出 1104039 错误码，请确认 “streamID” 是否正确。

6. 开启音浪回调接口支持隐藏页面时停止获取音浪

    调用 [setSoundLevelDelegate](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#set-sound-level-delegate) 接口时，通过 “options.enableInBackground” 参数可以设置页面隐藏时是否保持开启获取音浪和回调音浪，默认保持开启，当关闭时（即 “options.enableInBackground” 设置为 “false”),  SDK 在页面隐藏时会关闭获取音浪以减少性能消耗。

    相关 API 请参考 [setSoundLevelDelegate](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#set-sound-level-delegate)

7. 支持修改推流的视频质量等级

    调用 [setVideoConfig](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#set-video-config) 接口可以动态修改推流的视频质量等级 “videoQuality”。

    相关 API 请参考 [setVideoConfig](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#set-video-config)


**问题修复**

1. 修复了创建纯摄像头视频流但没有采集麦克风时，也会触发采集音浪回调的问题。
2. 修复了使用火狐浏览器推流时，推流质量报文中 “audio.AudioFPS“ 的值显示为 NaN 的问题。

---


## 2.14.0 版本 <a id="2.14.0"></a>

**发布日期：2022-03-09**

**新增功能**

1. 支持获取所需媒体设备列表

    新增 [getCameras] 接口用于获取视频输入设备列表、[getMicrophones] 用于获取音频输入设备列表、[getSpeakers] 用于获取音频输出设备列表。与 [enumDevices] 接口不同点为：以上 3 个新增获取媒体设备列表会在页面没有授予设备权限时，调用接口会弹出对应设备权限获取的提示框，不需要提前调用 [createStream] 或 [checkSystemRequirement]。

    相关 API 请参考 [getCameras](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#get-cameras)、[getMicrophones](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#get-microphones)、[getSpeakers](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#get-speakers)、[enumDevices](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#enum-devices)

    <Warning title="注意">



    - 由于浏览器对安全和隐私的保护，页面需要在安全环境下（https,localhost,127.0.0.1）调用 [getCameras]、[getMicrophones]、[getSpeakers] 接口，隐私保护协议请参考 [Privacy and security](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia#privacy_and_security)。

    - 在没有授予页面设备权限的情况下，调用 [getCameras] 接口会暂时打开摄像头/[getMicrophones] 接口会暂时打开麦克风，以触发浏览器的摄像头和麦克风设备权限申请。在 Chrome 81+、Firefox、 Safari 等浏览器上，没有媒体设备权限时无法获取到准确的设备信息。

    </Warning>




**改进优化**

1. [loginRoom](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#login-room) 和 [renewToken](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#renew-token) 接口支持使用 “token04” 版本的 Token


**问题修复**

1. 修复了拉流设置只拉视频不拉音频时，浏览器获取不到音频相关的质量参数 totalSamplesReceived 导致 SDK 报错的问题。

2. 修复了开启美颜还未生效的情况下，开始推流会被阻止并抛出错误码 1103073 提示开发者在美颜启动过程中不能推流。

3. 修复了在 setCaptureVolume 后推纯视频流，麦克风状态变为 true 的问题。

4. 修复了通过用户服务器调用 RTC 服务端 API 下发房间附加消息，发送端触发了用户发送的房间附加消息回调的问题。

5. 修复了在 2.13.0 版本上，美颜开启完成前，调用 startPublishingStream 推流接口概率出现意义不明的报错问题。在 2.14.0 版本上，美颜开启完成前，就调用 startPublishingStream 会抛出错误码 1103073 提示推流调用时机错误。

6. 修复了 SDK 停止推拉流后，会出现 websocket 相关的日志报错信息。


---


## 2.13.0 版本 <a id="2.13.0"></a>

**发布日期：2022-01-11**

**新增功能**

1. 新增基础美颜功能

    ZEGO 提供基础美颜功能，为用户呈现出良好的肌肤状态，打造自然的美颜效果。开发者可以在 createStream 获取到媒体流后，调用 setEffectsBeauty 接口调整美白、磨皮、锐化以及红润的程度，实现基础美颜能力。

    该功能常用于视频通话、直播等场景。

    相关 API 请参考 [setEffectsBeauty](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#set-effects-beauty)

**问题修复**

1. 修复了在开始推流到推流成功后去调用 [mutePublishStreamAudio](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#mute-publish-stream-audio)、[mutePublishStreamVideo](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#mute-publish-stream-video)、[useVideoDevice](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#use-video-device) 或 [useAudioDevice](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#use-audio-device) 接口时，会抛出错误信息的问题。

2. 修复了在 iOS 15.1 版本的 Safari 浏览器上推流时页面自动刷新导致无法正常使用的问题。

        SDK 使用 canvas 采集的方案规避了该问题，该规避方案性能开销相对会更大些。出于性能的考虑，建议在 iOS 15.1 采集推流质量不宜过高。iOS 已在 15.2 版本修复该问题。

3. 修复了推流过程中调用 [mutePublishStreamAudio](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#mute-publish-stream-audio) 接口关闭音频后，再调用 [setAudioConfig](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#set-audio-config) 接口修改推流音频参数时，音频会自动恢复为打开的问题。

4. 修复了在没有配置 Token 过期管理机制的情况下，调用 [renewToken](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#renew-token) 接口无法更新 Token 的问题。


---


## 2.12.3 版本 <a id="2.12.3"></a>

**发布日期：2021-12-06**

**改进优化**

1. 为了避免由于低版本浏览器的兼容性问题导致推拉流失败，此版本开始默认不开启实时有序数据传送功能

**问题修复**

1. 修复了弱网场景下用户列表可能不更新的问题
2. 修复了火狐浏览器其它已知问题


---


## 2.12.2 版本 <a id="2.12.2"></a>

**发布日期：2021-11-23**

**新增功能**

1. 新增实时有序数据功能

    开发者在需要做远程控制、云游戏等指令分发时，通过实时有序数据，可以低延迟获取发布端消息。

    新增 [createRealTimeSequentialDataManager] 接口，调用该接口后返回实时有序数据实例对象，该实例支持提供开始广播（startBroadcasting）、停止广播（stopBroadcasting）、发送实时数据（sendRealTimeSequentialData）、开始订阅（startSubscribing）、停止订阅（stopSubscribing）功能。

    相关 API 请参考 [createRealTimeSequentialDataManager](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#create-real-time-sequential-data-manager), [startBroadcasting](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoRealTimeSequentialDataManager#start-broadcasting), [stopBroadcasting](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoRealTimeSequentialDataManager#stop-broadcasting), [sendRealTimeSequentialData](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoRealTimeSequentialDataManager#send-real-time-sequential-data), [startSubscribing](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoRealTimeSequentialDataManager#start-subscribing), [stopSubscribing](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoRealTimeSequentialDataManager#stop-subscribing)


**问题修复**

1. 2.11.0 版本在一个浏览器页面使用多个 ZegoExpressEngine 实例的场景下，会出现异常。该版本修复了此问题。
2. 由于浏览器自动播放策略的限制，在无页面交互的情况下进行拉流后，通过手动点击播放后有声音但获取流的音浪回调仍一直为 0 的问题。该版本修复了此问题，在页面进行点击操作后能正常获取拉流的音浪回调。



---


## 2.12.1 版本 <a id="2.12.1"></a>

**发布日期：2021-11-18**


**问题修复**

1. 修复已知问题



---


## 2.11.3 版本 <a id="2.11.3"></a>

**发布日期：2021-11-04**

**问题修复**

1. 修复了 2.11.0 版本声明文件缺失，导致使用 TypeScript 引入 SDK 出现类型校验报错


---


## 2.11.2 版本 <a id="2.11.2"></a>

**发布日期：2021-11-02**

**问题修复**

1. 修复了 2.11.0 版本中使用了 ES6 语法的代码导致部分打包工具压缩代码有兼容性问题的情况
2. 修复了当流的视频和音频都是开启状态时，拉流成功后没有触发 [remoteCameraStatusUpdate](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~interface~ZegoRTCEvent#remote-camera-status-update) 和 [remoteMicStatusUpdate](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~interface~ZegoRTCEvent#remote-mic-status-update) 回调的问题


---


## 2.11.1 版本 <a id="2.11.1"></a>

**发布日期：2021-10-28**

**问题修复**

1. 修复了调用 [muteMicrophone](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#mute-microphone) 接口时，会向对端发送错误的摄像头状态的问题


---



## 2.11.0 版本 <a id="2.11.0"></a>

**发布日期：2021-10-15**

**新增功能**


1. 支持按场景设置清晰优先和流畅优先

    不同场景下对视频体验有不同的需求时，可以根据需要在推流端设置不同的推流模式。

    [createStream](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#create-stream) 接口中新增 camera.videoOptimizationMode 、screen.videoOptimizationMode 和 custom.videoOptimizationMode 参数，分别用于设置摄像头、屏幕共享、自定义采集视频的推流模式。三者均可传 default、detail 、motion ，分别表示默认（即同时兼顾清晰度和流畅性）、清晰优先、流畅优先，默认值为 default。

    - 选择清晰优先，在大多数情况下，SDK 不会降低发送分辨率，但可能会降低帧率。

    - 选择流畅优先，在大多数情况下，SDK 不会降低帧率，但可能会降低发送分辨率。

    - 选择两者同时兼顾可能会同时降低帧率和分辨率。 

    相关 API 请参考 [createStream](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#create-stream)


2. 新增 Token 过期管理机制

    <Warning title="注意">


    使用此功能需要升级 SDK 并联系 ZEGO 技术支持配置。 

    </Warning>



    不同的业务场景，对用户登录房间、推流等权限有时效限制，可以通过 Token 来实现。

    当 Token 过期后，服务端会主动将用户的权限进行回收，客户端的用户会被踢出房间并停止推流。该机制可以使用户权限管理更安全，常用于 KTV、语聊房场景。

    相关 API 请参考 [renewToken](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#renew-token), [tokenWillExpire](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~interface~ZegoRTMEvent#token-will-expire)


3. 混流支持设置视频渲染模式

    在进行混流时，可以对每一条流进行渲染模式的设置。当混流输入流的分辨率比例与对应输入流在混流输出画面上的布局比例不一致时，可以按照不同的业务场景，选择不同的渲染模式。

    可通过 [startMixerTask](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#start-mixer-task) 接口的 mixStreamConfig.inputList[].renderMode 参数设置混流输入视频画面的渲染模式，值为 0 表示填充模式，1 表示适应模式，默认为填充模式。

    相关 API 请参考 [startMixerTask](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#start-mixer-task)


**改进优化**

1. 新增 1103064、1103065 和 1103066 错误码

    通过 [createStream](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#create-stream) 采集不到设备的音视频，当创建流出现错误时，新增错误码 1103064、1103065 和 1103066，分别标识“没有设备权限” 、“设备不用于采集”、“设备参数错误”。

    相关 API 请参考 [createStream](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#create-stream)

2. 拉流质量回调新增端到端延迟和端到端丢包率的数据

    拉流质量回调接口 [playQualityUpdate](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~interface~ZegoRTCEvent#play-quality-update) 中的 stats 参数新增 peerToPeerPacketLostRate 和 peerToPeerDelay，分别标识 “端到端丢包率”、“端到端延迟”。

    相关 API 请参考 [playQualityUpdate](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~interface~ZegoRTCEvent#play-quality-update)

**问题修复**

1. 修复了多房间模式下，一个房间被服务端 kickout 时触发所有房间都退出的问题
2. 修复了重试拉流时会出现卡顿的问题

---


## 2.10.1 版本 <a id="2.10.1"></a>

**发布日期：2021-09-03**

**问题修复**

1. 修复已知问题


---


## 2.10.0 版本 <a id="2.10.0"></a>

**发布日期：2021-08-27**

**新增功能**

1. 新增范围语音功能模块

    新增范围语音功能模块，可提供范围语音、3D音效、小队语音等功能。适用于吃鸡类游戏、元宇宙类场景。

    范围语音：是指房间内的收听者对音频的接收距离有范围限制，若发声者与自己的距离超过该范围，则无法听到声音。为保证语音清晰，附近超过 发布日期：20 人发声时，只能听到离自己最近的 20 个发声者的声音。 

    3D音效：声音有 3D 空间感且按距离衰减。

    小队语音：玩家可以选择加入小队，并支持在房间内自由切换“全世界”模式和“仅小队”模式。

    相关 API 请参考 [createRangeAudioInstance](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#create-range-audio-instance), [ZegoExpressRangeAudio](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressRangeAudio), [setAudioReceiveRange](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressRangeAudio#set-audio-receive-range), [updateSelfPosition](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressRangeAudio#update-self-position), [updateAudioSource](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressRangeAudio#update-audio-source), [enableSpatializer](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressRangeAudio#enable-spatializer), [enableMicrophone](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressRangeAudio#enable-microphone), [enableSpeaker](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressRangeAudio#enable-speaker), [setRangeAudioMode](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressRangeAudio#set-range-audio-mode), [setTeamID](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressRangeAudio#set-team-id)

**改进优化**

1. 提高 SDK 在网络切换时的抗弱网能力

    SDK 内部重试逻辑优化，在网络切换时提高用户体验。

**问题修复**

1. 修复了推流端移除正在推流的外接摄像头时，调用 [useVideoDevice](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#use-video-device) 接口切换其他摄像头设备后拉流端 [remoteCameraStatusUpdate](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~interface~ZegoRTCEvent#remote-camera-status-update) 事件中设备状态最终为 “CLOSE”，没有恢复为 “OPEN” 的问题


---


## 2.9.1 版本 <a id="2.9.1"></a>

**发布日期：2021-08-12**

**问题修复**

1. 修复了小部分不支持同时打开两个摄像头的设备在切换麦克风失败重试时，会导致视频画面黑屏的问题


---



## 2.9.0 版本 <a id="2.9.0"></a>

**发布日期：2021-08-09**

**改进优化**

1. 新增对混流接口中的 inputList[].streamID 参数取值进行校验

    调用 [startMixerTask](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#start-mixer-task) 接口时，如果 inputList[].streamID 参数取值为 null 或 undefined，则会报错提示输入参数错误。

    相关 API 请参考 [startMixerTask](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#start-mixer-task)

2. 支持推流成功前调用 [replaceTrack](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#replace-track) 接口替换媒体流的音视频轨道

    2.9.0 之前的 SDK 版本中，只能在推流前或者推流成功后调用 [replaceTrack](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#replace-track) 接口，在推流未完成之前调用则会报错并提示不支持调用该接口。

    2.9.0 SDK 版本优化为可以在推流成功前调用 [replaceTrack](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#replace-track) 接口替换音视频轨道。

    相关 API 请参考 [replaceTrack](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#replace-track)

3. 推流端关闭视频画面后再开启时，拉流端不再依赖媒体信令来恢复画面

    2.9.0 之前的 SDK 版本中，推流端的推流画面关闭时，流状态信令可能因为网络断开而丢失，导致无法通过信令及时通知到拉流端恢复画面。

    2.9.0 SDK 版本优化为通过流数据而不再依赖媒体信令来恢复视频画面，避免弱网情况出现无法恢复视频画面的问题。


**问题修复**

1. 修复了推流后通过 [useAudioDevice](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#use-audio-device) 或 [useVideoDevice](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#use-video-device) 接口切换外接摄像头或麦克风设备，硬件层面断开与外接设备的连接时没有触发 [deviceError](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~interface~ZegoRTCEvent#device-error) 回调的问题

2. 修复了通过 [createStream](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#create-stream) 创建第三方流时 custom.source 参数传 MediaStream 后设置开始码率快速上升没有生效的问题

3. 修复了当使用外接麦克风和摄像头进行推流时拔出设备，上报的摄像头状态没有变为关闭状态的问题


---



## 2.8.0 版本 <a id="2.8.0"></a>

**发布日期：2021-07-09**


**新增功能**

1. 支持开启/关闭麦克风声音，并获取麦克风开启/关闭状态

    当开发者不希望被拉流端听到麦克风声音时，可以通过 [muteMicrophone](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#mute-microphone) 接口的 “enable” 参数来设置是否开启麦克风声音，“true” 表示关闭麦克风（即静音），“false” 表示打开麦克风。该接口可以开启或关闭当前引擎实例创建的所有麦克风的媒体流的声音，不会影响其他声音（例如背景音乐的播放）。

    调用 [isMicrophoneMuted](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#is-microphone-muted) 接口可以获取当前引擎实例的麦克风开启/关闭状态。

    相关 API 请参考 [muteMicrophone](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#mute-microphone)、[isMicrophoneMuted](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#is-microphone-muted)

2. 新增多房间功能

    <Warning title="注意">


    需要联系 ZEGO 技术支持开通该功能。

    </Warning>



    同一个用户可以同时加入多个房间，并同时在多个房间内（目前默认最多同时加入 5 个房间）推流、拉流、发送实时消息和接收消息回调。本功能可以隔离多个房间的消息及回调，实现更灵活的连麦业务。ZEGO 推荐用于跨房间连麦和在线教育的超级小班场景。

    需要在初始化 SDK 之后，登录房间前调用 [enableMultiRoom](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#enable-multi-room) 接口开启多房间，再调用 [loginRoom](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#login-room) 接口登录多房间，详情请参考 [常用功能 - 多房间](/real-time-video-web/room/multi-room-login)。

    相关 API 请参考 [enableMultiRoom](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#enable-multi-room)、[loginRoom](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#login-room)

**改进优化**

1. 关闭正在推流画面时可选择保留预览画面

    [mutePublishStreamVideo](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#mute-publish-stream-video) 接口新增了 “retain” 参数，用于设置关闭推流画面时是否保留预览画面，“retain” 参数取值为 “true” 时表示保留，默认值为 “false”。

    相关 API 请参考 [mutePublishStreamVideo](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#mute-publish-stream-video)

2. 当 App 未配置低延迟直播功能却使用低延迟模式拉流时，新增报错提示

    当 App 未配置低延迟直播功能时却使用低延迟模式拉流，则 SDK 会抛出 1104038 错误码，标识当前 AppID 不支持低延迟直播。

    相关 API 请参考 [startPlayingStream](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#start-playing-stream)

**问题修复**

1. 修复了断网时使用 Web 端推流会报错，但没有正常返回断网推流失败错误信息的问题
2. 修复了推流时码率快速上升策略只对 H.264 编码方式生效，对 VP8 编码方式却不生效的问题


---


## 2.7.1 版本 <a id="2.7.1"></a>

**发布日期：2021-06-10**

**新增功能**

1. 新增获取本地音浪功能

    [on](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#on) 接口新增 [capturedSoundLevelUpdate](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~interface~ZegoRTCEvent#captured-sound-level-update) 回调事件，该回调与推拉流音浪回调 [soundLevelUpdate](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~interface~ZegoRTCEvent#sound-level-update) 的区别在于，[capturedSoundLevelUpdate\|_blan](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~interface~ZegoRTCEvent#captured-sound-level-update) 可以在创建媒体流之后立即获取本地采集的音频音浪，即本地麦克风采集的音量大小，可用于检测麦克风声音是否正常。

    相关 API 请参考 [capturedSoundLevelUpdate](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~interface~ZegoRTCEvent#captured-sound-level-update)

2. 支持设置推流的开始码率上升策略（仅 Chrome 有效）

    [createStream](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#create-stream) 接口中的 “source.camera” 、“source.screen” 和 “source.custom” 属性新增 “startBitrate” 参数，用于设置推流的开始码率上升策略。

    由于浏览器的默认策略，推流的开始码率默认由 300 kbps 缓慢上升到目标码率，导致拉流端最初接收到的画面较模糊。开发者通过设置 “startBitrate” 参数的取值为 “target”，可以使推流的开始码率快速上升到已设置的目标码率。（当设置的目标码率过高而且网络状态差的情况下，推流视频可能会出现卡顿或花屏）

    <Warning title="注意">


    该功能只在未开启硬件加速的 Chrome 内核浏览器中有效。 

    </Warning>



    相关 API 请参考 [createStream](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#create-stream)

**改进优化**

1. 优化了推流过程中切换摄像头的逻辑

    小部分手机设备不支持同时开启两个摄像头，导致摄像头切换过程中开启第二个摄像头时无法正常切换。SDK 新增了切换摄像头失败重试的逻辑，避免同时打开两个摄像头时出现错误。

2. 优化了混流服务接口 [startMixerTask](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#start-mixer-task) 的错误信息提示

    调用混流接口 [startMixerTask](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#start-mixer-task) 后，混流服务端出错时抛出的错误携带提示信息 “extendedData”。

    相关 API 请参考 [startMixerTask](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#start-mixer-task)

3. 新增 1003025 错误码，表示推流被禁止

    当推流操作被 ZEGO 后台禁止时，在推流状态回调中会抛出 1003025 错误码，开发者可以通过该错误码做相应的业务提示。

    相关 API 请参考 [publisherStateUpdate](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~interface~ZegoRTCEvent#publisher-state-update)

4. 优化了拉流端丢包时会出现花屏的问题

    推流端开启硬件加速进行推流后，拉流端在丢包率较高时会出现花屏。SDK 对该问题进行了优化处理，仅在 Chrome 内核浏览器生效。

**问题修复**

1. 修复了切换音频设备后，音浪回调返回的一直是 0 而不是新设备音浪的问题

    由于 SDK 内部在切换音频设备后没有重新获取设备音浪，导致音浪一直为 0，当前版本已修复该问题。

2. 修复了推流端关闭麦克风时，拉流质量报文中的 “audioMuteState” 没有变化的问题


---


## 2.6.0 版本 <a id="2.6.0"></a>

**发布日期：2021-04-29**

**新增功能**

1. 新增低延迟直播功能

    低延迟直播专注于提供稳定可靠的直播服务，相比于标准视频直播产品，音画延迟更低，同步性更强，弱网抗性更好，能为用户带来毫秒级的直播体验。通常用于教育大班课、秀场直播、电商直播、一起看、在线拍卖等场景。

    当开发者需要拉取低延迟直播流时，可通过设置拉流参数 “resourceMode” 为 “2”，选择拉取低延迟直播流，详情请参考 [低延迟直播](/real-time-video-web/live-streaming/low-latency-live-streaming)。

    相关 API 请参考 [startPlayingStream](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#start-playing-stream)

2. 新增 token 过期回调 [tokenWillExpire](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~interface~ZegoRTMEvent#token-will-expire) 和 token 更新接口 [renewToken](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#renew-token)

    <Warning title="注意">


    SDK 当前版本已支持该回调和接口，预计 2021-06-10 才可正式使用。

    </Warning>



    当 token 快要过期前的 30s SDK 会主动触发 [tokenWillExpire](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~interface~ZegoRTMEvent#token-will-expire) 回调，开发者需要在收到该回调时，重新生成 token 并调用 [renewToken](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#renew-token) 接口更新。

    [renewToken](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#renew-token) 接口常用于如下场景：

    a. 当 token 过期时，通过该接口来更新 token。
    b. 当开发者需要从登录权限切换到推流（含登录）权限，或者从推流（含登录）权限切换到只有登录权限时，可以通过该接口来实现。

    相关 API 请参考 [tokenWillExpire](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~interface~ZegoRTMEvent#token-will-expire)、[renewToken](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#renew-token)

3. token 版本升级，支持 token 分功能鉴权

    <Warning title="注意">


    SDK 当前版本已支持该鉴权功能，但预计 2021-06-10 才可正式使用。

    </Warning>



    通过新版本 token 控制是否可登录，是否能推流，若想使用新版本 token 鉴权功能，请先联系 ZEGO 技术支持开启对应配置。

    相关 API 请参考 [tokenWillExpire](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~interface~ZegoRTMEvent#token-will-expire)、[renewToken](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#renew-token)

**改进优化**

1. 优化了推拉流协商模式，减少推拉流首帧耗时

    推拉流首帧耗时能在原有基础上缩短 150 ms 以上。

2. 优化了推拉流网络质量算法

    进一步优化了推拉流网络质量的算法，提高推拉流质量回调中对 [videoQuality] 与 [audioQuality] 监听的准确性。

3. 增加节点质量探测

    若检测到当前网络质量差则触发节点探测，SDK 会寻找质量更佳的推拉流节点进行切换，进一步提高抗弱网能力。

**问题修复**

1. 修复已知问题


---


## 2.5.0 版本 <a id="2.5.0"></a>

**发布日期：2021-04-15**


**问题修复**

1. 修复了切换摄像头时，原来的摄像头未被释放的问题

    相关 API 请参考 [useVideoDevice](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#use-video-device)

2. 修复其他已知问题


---


## 2.4.0 版本 <a id="2.4.0"></a>

**发布日期：2021-04-01**


**改进优化**

1. 优化检测接口，提高视频编码检测准确率，并支持单项检测

    相关 API 请参考 [checkSystemRequirements ](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#check-system-requirements)

2. 修改了设置日志时上传地址的优先级，使其优先级高于后台下发的地址

    相关 API 请参考 [setLogConfig ](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#set-log-config)

3. 优化了视频码率设置策略，解决了屏幕共享码率初始值较低的问题

    相关 API 请参考 [createStream ](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#create-stream)

**问题修复**

1. 修复了 Safari 使用部分蓝牙耳机播放音效时出现音质怪异的问题


---



## 2.3.0 版本 <a id="2.3.0"></a>

**发布日期：2021-03-18**


**改进优化**

1. 优化了推拉流网络质量评级逻辑，提高评估准确率

2. 支持纯视频流混音功能

    相关 API 请参考 [startMixingAudio ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#start-mixing-audio)


**问题修复**

1. 修复了拉流后马上停止拉流时，出现报错的问题
2. 修复了关闭摄像头后再开启时，推流卡顿的问题



---



## 2.2.1 版本 <a id="2.2.1"></a>

**发布日期：2021-03-04**


**新增功能**

1. 新增采集音量修改功能

    调用麦克风采集音量接口，可以调节推流端的音量，让观众感受到音量变化。

    相关 API 请参考 [setCaptureVolume ](https://doc-zh.zego.im/zh/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#set-capture-volume)

2. 用户被踢出房间时，新增详细的踢出原因

    房间成员被踢下线时，SDK 需要根据附加信息提示具体被踢下线的原因。

**问题修复**

1. 修复了重复登录房间时无法感知房间重置，导致收不到流更新的问题



---



## 2.1.0 版本 <a id="2.1.0"></a>

**发布日期：2021-01-28**

**问题修复**

1. 修复了 Windows 设备在 Chrome 浏览器开启硬件加速时，视频码率无法达到预期值的问题
2. 修复了 PC 上的微信内置浏览器拉流一段时间后报错的问题


---



## 2.0.0 版本 <a id="2.0.0"></a>

**发布日期：2021-01-14**

**改进优化**

1. 代码重构，减少不同模块之间耦合性

2. 日志系统重构，优化了日志结构，提高问题定位效率

3. 重试逻辑重构，进一步提高 SDK 抗弱网能力


---



## 1.19.0 版本 <a id="1.19.0"></a>

**发布日期：2020-12-31**


**新增功能**

1. 新增动态设置是否拉取远端音频流和视频流的功能

    开发者可以在拉流成功后，根据需要动态调整是否拉取音频流或视频流。

    相关 API 请参考 [mutePlayStreamVideo ](https://doc-zh.zego.im/zh/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#mute-play-stream-video)、[mutePlayStreamAudio ](https://doc-zh.zego.im/zh/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#mute-play-stream-audio)

**问题修复**

1. 修复了第三方流的音视频文件播放完成后，销毁流失败的问题 

    相关 API 请参考 [destroyStream ](https://doc-zh.zego.im/zh/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#destroy-stream) 


---




## 1.18.0 版本 <a id="1.18.0"></a>

**发布日期：2020-12-17**


**新增功能**

1. 流更新回调新增扩展信息参数，例如：当流被删除时能够抛出相关原因信息

    相关 API 请参考 [roomStreamUpdate ](https://doc-zh.zego.im/zh/api?doc=Express_Video_SDK_API~javascript_web_web~interface~ZegoEvent#room-stream-update)

2. 新增调节混音音量功能

    支持动态调节推流时混入的背景音乐或音效的音量大小。

    相关 API 请参考 [setMixingAudioVolume ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#set-mixing-audio-volume)

**改进优化**

1. 优化了 SDK 流媒体 websocket 连接等待时间

    延长了推拉流重试过程中，websocket 连接超时的等待时间，提升连接成功率及抗弱网能力。

**问题修复**

1. 修复了推流为纯音频的场景下，Safari 浏览器选择自动拉取模式时拉到的音频没有声音的问题

    相关 API 请参考 [setMixingAudioVolume ](https://doc-zh.zego.im/zh/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#set-mixing-audio-volume) 


---



## 1.17.1 版本 <a id="1.17.1"></a>

**发布日期：2020-12-03**


**问题修复**

1. 修复了静音后混音时，再次打开麦克风不能恢复麦克风声音的问题

    相关 API 请参考 [mutePublishStreamAudio ](https://doc-zh.zego.im/zh/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#mute-publish-stream-audio)

2. 修复了推流重试过程中调用停止推流接口时，对端未能及时收到流删除通知的问题

    相关 API 请参考 [stopPublishingStream ](https://doc-zh.zego.im/zh/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#stop-publishing-stream), [roomStreamUpdate ](https://doc-zh.zego.im/zh/api?doc=Express_Video_SDK_API~javascript_web_web~interface~ZegoEvent#room-stream-update)

3. 修复了退出房间后快速重登房间时，对端可能收不到房间用户进出回调的问题

    相关 API 请参考 [loginRoom ](https://doc-zh.zego.im/zh/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#login-room), [roomUserUpdate ](https://doc-zh.zego.im/zh/api?doc=Express_Video_SDK_API~javascript_web_web~interface~ZegoEvent#room-user-update)



---



## 1.16.5 版本 <a id="1.16.5"></a>

**发布日期：2020-11-26**

**问题修复**

1. 修复了网络重连成功后存在部分推拉流无法恢复正常使用的问题
2. 修复了拉流端短时间内收到摄像头状态变更时可能状态不同步的问题


---



## 1.16.1 版本 <a id="1.16.1"></a>

**发布日期：2020-11-23**

**问题修复**

1. 修复了弱网环境下推拉流可能调度失败的问题


---



## 1.16.0 版本 <a id="1.16.0"></a>

**发布日期：2020-11-19**

**新增功能**

1. 第三方流支持设置推流的音频声道数和码率

    创建第三方流时根据视频文件中的音频声道数和码率设置当前推流音频的声道数和码率，避免可能出现的音质损耗问题。

    相关 API 请参考 [createStream ](https://doc-zh.zego.im/zh/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#create-stream)

2. 新增支持动态修改推流音频参数

    创建流并推流成功后，可以根据需要修改推流音频参数，包括降噪、自动增益控制和回声消除。

    相关 API 请参考 [setAudioConfig ](https://doc-zh.zego.im/zh/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#set-audio-config)

3. 新增设备插拔回调

    当监测到系统中有音视频设备添加或移除时，会触发 [audioDeviceStateChanged ](https://doc-zh.zego.im/zh/api?doc=Express_Video_SDK_API~javascript_web_web~interface~ZegoEvent#audio-device-state-changed) 或 [videoDeviceStateChanged ](https://doc-zh.zego.im/zh/api?doc=Express_Video_SDK_API~javascript_web_web~interface~ZegoEvent#video-device-state-changed) 回调。通过监听此回调，用户可以根据需要使用特定音视频设备进行数据采集。

    相关 API 请参考 [audioDeviceStateChanged ](https://doc-zh.zego.im/zh/api?doc=Express_Video_SDK_API~javascript_web_web~interface~ZegoEvent#audio-device-state-changed), [videoDeviceStateChanged ](https://doc-zh.zego.im/zh/api?doc=Express_Video_SDK_API~javascript_web_web~interface~ZegoEvent#video-device-state-changed)

**改进优化**

1. 优化弱网情况下停止推流后，拉流端收不到流删除回调的问题

    发送流新增及删除失败时进行重试，增加弱网等情况下的推流成功率。 

2. 优化推流端关闭摄像头后重新打开时，拉流端可能拉不到视频画面的问题


**问题修复**

1. 修复了在火狐浏览器上推流成功后刷新页面，再次输入相同房间号推流时拉不到流的问题


---


## 1.15.0 版本 <a id="1.15.0"></a>

**发布日期：2020-11-05**


**改进优化**

1. 优化 safari 浏览器使用混音功能时，麦克风采集声音质量差的问题

    相关 API 请参考 [startMixingAudio ](https://doc-zh.zego.im/zh/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#start-mixing-audio)

2. 优化日志连接断开时报错信息

    退出房间一分钟左右后日志 websocket 连接断开，不再显示 error 级别报错信息。

3. 优化 SDK 上报设备状态的日志，增加相应流 ID

**问题修复**

1. 修复 sendCustomCommand 回调结果，删除了返回值中的 messageID
2. 修复同一用户在其他平台登录导致从 web 平台下线时不触发 roomStateUpdate 的问题
3. 修复相同用户 ID 登录房间时，房间内其他用户收到 roomUserUpdate 回调的问题


---



## 1.14.0 版本 <a id="1.14.0"></a>

**发布日期：2020-10-15**


**新增功能**

1. 推拉流质量回调中增加音频发送帧率

    推拉流质量回调中增加音频发送帧率（audioFPS），用于展示当前音频流畅度。

    相关 API 请参考 [publishQualityUpdate ](https://doc-zh.zego.im/zh/api?doc=Express_Video_SDK_API~javascript_web_web~interface~ZegoEvent#publish-quality-update), [playQualityUpdate ](https://doc-zh.zego.im/zh/api?doc=Express_Video_SDK_API~javascript_web_web~interface~ZegoEvent#play-quality-update) 

2. 增加屏幕分享流的推流分辨率设置

    创建屏幕共享流时若传入的 videoQuality 参数取值为 4，则开发者需要将帧率、码率和分辨率传给 SDK。

    相关 API 请参考 [createStream ](https://doc-zh.zego.im/zh/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#create-stream)

3. 增加推流参数动态修改功能

    支持在创建流并推流成功后通过 [setVideoConfig ](https://doc-zh.zego.im/zh/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#set-video-config) 接口动态修改音视频流的分辨率（宽和高）、帧率和码率。

    相关 API 请参考 [setVideoConfig ](https://doc-zh.zego.im/zh/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#set-video-config)

**改进优化**

1. 重试逻辑优化及重构

    优化及重构了音视频通话过程中出现异常时的重试逻辑，提高 SDK 抗弱网能力，减少业务侧重试。

2. 转推 CDN 时无需鉴权

    优化增加转推 CDN 和删除转推 CDN 接口，去除鉴权，提高易用性。

    相关 API 请参考 [addPublishCdnUrl ](https://doc-zh.zego.im/zh/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#add-publish-cdn-url), [removePublishCdnUrl ](https://doc-zh.zego.im/zh/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#remove-publish-cdn-url)

**问题修复**

1. 修复错误码信息重复问题
2. 修复其它已知问题


---



## 1.13.0 版本 <a id="1.13.0"></a>

**发布日期：2020-09-24**


**新增功能**

1. 新增替换音视频轨道

    支持替换本地音视频流中的音视频轨道，例如可以在摄像头、屏幕共享或视频之间切换视频轨道，在麦克风和 mp3 之间切换音频轨道。

    相关 API 请参考 [replaceTrack ](https://doc-zh.zego.im/zh/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#replace-track)

2. 新增可用性检测错误信息返回

    当 SDK 检测到设备不可用时，支持返回对应的错误提示信息，展现具体的错误原因。

    相关 API 请参考 [checkSystemRequirements ](https://doc-zh.zego.im/zh/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#check-system-requirements)

**改进优化**

1. 优化推流状态回调错误码

    优化了推流时因网络问题导致请求响应超时的时候返回的错误码值。

2. 增加接口数值参数的类型判断

    对接口中是数值类型的参数作严格判断，只允许传入整数，避免出现错误。

    相关 API 请参考 [loginRoom ](https://doc-zh.zego.im/zh/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#login-room), [createStream ](https://doc-zh.zego.im/zh/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#create-stream), [setSoundLevelDelegate ](https://doc-zh.zego.im/zh/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#set-sound-level-delegate), [startMixerTask ](https://doc-zh.zego.im/zh/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#start-mixer-task)

**问题修复**

1. 修复登录房间后更改日志配置导致日志事件上报缺失 roomid 的问题
2. 修复其它已知问题


---



## 1.12.0 版本 <a id="1.12.0"></a>

**发布日期：2020-09-10**


**新增功能**

1. 新增房间附加消息功能

    该功能可以设置一个以房间为单位的附加消息，该消息跟随整个房间的生命周期，每个登录到房间的用户都能够同步消息。开发者可用于实现各种业务逻辑，如房间公告等等。目前房间附加消息只允许设置一个键值对，且 key 最大长度为 10 字节，value 最大长度为 100 字节。

    相关 API 请参考 [setRoomExtraInfo ](https://doc-zh.zego.im/zh/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#set-room-extra-info)

**改进优化**

1. 优化退出房间参数

    简化了退出房间的参数设置，将 roomID 修改为可选参数，开发者退出房间时可以不设置 roomID。

    相关 API 请参考 [logoutRoom ](https://doc-zh.zego.im/zh/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#logout-room)

2. 增加切换设备的时机

    创建流并预览后，支持在推流前切换摄像头和麦克风设备。

    相关 API 请参考 [useVideoDevice ](https://doc-zh.zego.im/zh/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#use-video-device), [useAudioDevice ](https://doc-zh.zego.im/zh/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#use-audio-device)

3. 增加创建流属性参数的类型判断

    增加了创建流时设置的分辨率、码率、帧率等参数的类型判断，只允许传入正整数，避免出现不明报错信息。

    相关 API 请参考 [createStream ](https://doc-zh.zego.im/zh/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#create-stream)

4. 优化回调注册事件处理

    开发者在回调事件中若出现业务逻辑的错误未处理，SDK 会捕获该错误，避免影响 SDK 内部逻辑的运行。

    相关 API 请参考 [on ](https://doc-zh.zego.im/zh/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#on)

5. 推拉流相关日志增加服务连接节点，便于查询日志定位问题

6. 日志事件上报相关字段区分正式环境和测试环境，方便统计信息

**问题修复**

1. 修复混流停止回调中调用退出房间可能报错的问题
2. 修复其它已知问题


---


## 1.11.0 版本 <a id="1.11.0"></a>

**发布日期：2020-08-27**


**新增功能**

1. 新增房间当前人数回调

    用户进入房间后，会定时（30秒）触发 roomOnlineUserCountUpdate 回调，通知当前房间人数，开发者可直接获取到人数值。

    相关 API 请参考 [roomOnlineUserCountUpdate ](https://doc-zh.zego.im/zh/api?doc=Express_Video_SDK_API~javascript_web_web~interface~ZegoEvent&jumpType=route#room-online-user-count-update)

**改进优化**

1. 混流为纯音频时，优化参数设置

    简化了混流的参数设置，当混流为纯音频时，布局等相关参数会设置成默认值，开发者无需关注参数如何设置。

    相关 API 请参考 [startMixerTask ](https://doc-zh.zego.im/zh/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#start-mixer-task)

2. 增加 streamExtraInfoUpdate 的触发时机

    当用户进入房间，房间内有流且带有附加信息时，streamExtraInfoUpdate 将会回调，因此开发者只需关注此回调即可处理流附加信息的逻辑。

    相关 API 请参考 [streamExtraInfoUpdate ](https://doc-zh.zego.im/zh/api?doc=Express_Video_SDK_API~javascript_web_web~interface~ZegoEvent&jumpType=route#stream-extra-info-update)

**问题修复**

1. 修复其它已知问题


---


## 1.10.0 版本 <a id="1.10.0"></a>

**发布日期：2020-08-13**


**新增功能**

1. 新增支持双声道

    提供双声道功能，该接口存在兼容问题，仅在 chrome 浏览器下支持。

    相关 API 请参考 [createStream ](https://doc-zh.zego.im/zh/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#create-stream)

**改进优化**

1. 增加推流属性参数的类型判断

    该优化增加了推流编码、流附加信息、备选参数的类型判断，避免出现不明报错信息。

    相关 API 请参考 [startPublishingStream ](https://doc-zh.zego.im/zh/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#start-publishing-stream3)

2. 优化媒体服务心跳

    该优化旨在提升连接的稳定性，会根据媒体服务的心跳给出的参数，动态调节 SDK 向媒体服务发送心跳的间隔。

3. 推拉流相关日志增加流 ID , 便于查询日志定位问题

4. 推拉流上报可用带宽等信息，方便定位分辨率下降问题

5. 推流质量回调中增加丢包信息，便于定位网络问题

6. 推拉流质量回调增加对标签属性相关参数的监听

7. 日志信息添加 muted 、paused、voilume 参数值，以便于定位推拉流无声问题。

**问题修复**

1. 修复推拉流状态在重复收到重试错误信息后可能不回调问题
2. 修复其它已知问题


---


## 1.9.0 版本 <a id="1.9.0"></a>

**发布日期：2020-07-30**


**问题修复**

1. 修复订阅拉流更新回调信息中 CDN 地址为空的问题
2. 修复其它已知问题

**改进优化**

1. 创建屏幕共享流时优先使用插件进行屏幕共享，插件形式的屏幕共享兼容性更佳

2. 优化停止推拉流接口的调用，推拉流后的任何时间都可以成功调用对应的停止接口

3. 推拉流调度逻辑优化，减少不必要的代码执行

4. 优化切换摄像头麦克风设备接口错误信息处理逻辑，相应的错误信息都会通过reject抛出

5. 若调用停止推流前使用了混音功能，则调用停止推流接口时 SDK 内部将对应流的混音一并停止

6. 优化 SDK 针对浏览器异常关闭的处理逻辑，兼容对浏览器beforeunload事件的监听



---



## 1.8.1 版本 <a id="1.8.1"></a>

**发布日期：2020-07-20**


**问题修复**

1. startMixerTask 参数检查修正

---


## 1.8.0 版本 <a id="1.8.0"></a>

**发布日期：2020-07-15**


**新增功能**

1. server 支持备用域名，提升在网络环境不好时的连通率

**改进优化**

1. 统一对外错误码，对齐native 端

2. 修复推拉流首次质量上报为空的问题，优化上报数据信息

3. 开始、停止推拉流增加状态回调

4. 修复切换设备内部部分错误没回调的问题

5. 优化内部心跳发送逻辑

6. 修复外接摄像头松动，web端拉流无法拉继续拉音频流问题

7. 修复推流过程关闭摄像头，safari 拉音频流失败问题

8. 修复其它已知问题

---



## 1.7.0 版本 <a id="1.7.0"></a>

**发布日期：2020-06-30**


**新增功能**

1. 增加startMixingAudio 开始混音接口，并追加支持多路混音

2. 增加stopMixingAudio 停止混音接口

3. 新增音浪回调设置接口 setSoundLevelDelegate 用户可根据需要设置音浪回调频率，通过 soundLevelUpdate 回调

**改进优化**

1. 拉流是否拉音视频若有设置以用户设置的为准

2. 屏幕共享接口现支持多次调用

3. 优化音频处理逻辑，避免性能浪费

4. 推拉流视频编解码参数兼容大小写，提高容错率

5. 修复推流前调用接口关闭摄像头麦克风，再进行推流，此时拉流端收到摄像头或麦克风状态不符合预期问题

6. 修复在使用插件进行屏幕共享点击取消后多次弹窗问题，优化错误信息

7. 修复其它已知问题

---



## 1.6.0 版本 <a id="1.6.0"></a>

**发布日期：2020-06-15**


**问题修复**

1. 增加创建流createStream的接口对视频及音频码率的监测，解决参数越界导致推流失败问题

2. 质量上报优化，解决部分浏览器存在质量上报缺失部分参数的问题

3. 检测接口优化，修改部分监测时机，提高检测准确性

4. publiserState及playerState状态回调优化，解决回到状态不够准确问题

5. 流更新接口优化，解决房间流列表为空仍触发回调问题

6. 修复其它已知问题

---



## 1.5.2 版本 <a id="1.5.2"></a>

**发布日期：2020-06-08**

**问题修复**

1. startMixerTask 参数修正
2. 修复日志信息过长上传报错

---


## 1.5.1 版本 <a id="1.5.1"></a>

**发布日期：2020-06-02**


**问题修复**

1. mutePublishStreamAudio 参数修正

---



## 1.5.0 版本 <a id="1.5.0"></a>

**发布日期：2020-05-15**


**改进优化**

1. useVideoDevice useAudioDevice 切换设备接口改为Promise

2. 优化部分错误码信息

3. 优化拉流设备状态逻辑

4. 优化部分关键日志

**问题修复**

1. 修复已知问题

---



## 1.4.0 版本 <a id="1.4.0"></a>

**发布日期：2020-04-30**


1. 摄像头麦克风设备状态优化
2. 优化房间用户列表拉取策略
3. 修复已知问题

---



## 1.3.0 版本 <a id="1.3.0"></a>

**发布日期：2020-04-15**


1. 客户端控制房间最大人数
2. webrtc增加对https的检测
3. 优化节点重试逻辑
4. 修复已知问题



---



## 1.2.1 版本 <a id="1.2.1"></a>

**发布日期：2020-03-30**


1. 新增remoteCameraStatusUpdate remoteMicStatusUpdate，监听回调推流端摄像头及麦克风设备状态
2. 新增节点重试逻辑，提高连接稳定性及成功率
3. 检测接口新增对屏幕共享功能检测，优化检测逻辑。相关接口: checkSystemRequirements
4. 新增推流设备状态信息上报，优化日志信息
5. 增加房间弹幕消息功能

---



## 1.1.0 版本 <a id="1.1.0"></a>

**发布日期：2019-11-28**


1. 增加混流接口
2. 增加IM接口
3. 对齐各端接口，接口命名、参数命名、取值等统一

---


## 1.0.0 版本 <a id="1.0.0"></a>

**发布日期：2019-10-31**

Zego Webrtc Express SDK 初版发布。包含系统、房间、推流、拉流功能
