# 发布日志

- - -

## 3.21.1 版本 <a id="3.21.1"></a>

**发布日期：2025-08-06**

**改进优化**

1. 更新 SDK 命名并同步上线至 OpenHarmony 仓库

      更新了 SDK 命名，新版本集成 SDK 的流程有所变化，详细请参考 [集成 SDK](/real-time-voice-harmonyos/quick-start/integrating-sdk)。

---

## 3.21.0 版本 <a id="3.21.0"></a>

**发布日期：2025-08-01**

**新增功能** 


1. 新增 license 鉴权功能 

    相关 API 请参考：[setLicense](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/ets_ohos/classes/_zegoexpressengine_.zegoexpressengine.html#setlicense)

2. 新增地理围栏功能 

    相关 API 请参考：[setGeoFence](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/ets_ohos/classes/_zegoexpressengine_.zegoexpressengine.html#setgeofence)

3. 新增自定义预览截图功能 

    相关 API 请参考：[takePublishStreamSnapshotByConfig](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/ets_ohos/classes/_zegoexpressengine_.zegoexpressengine.html#takepublishstreamsnapshotbyconfig)


4. 新增 3 种混响音效，分别为：HipHop、Misty、ThreeDimensionalVoice

    相关 API 请参考：[HipHop](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/ets_ohos/enums/_zegoexpressdefines_.zegoreverbpreset.html#hiphop)、 [Misty](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/ets_ohos/enums/_zegoexpressdefines_.zegoreverbpreset.html#misty)、 [ThreeDimensionalVoice](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/ets_ohos/enums/_zegoexpressdefines_.zegoreverbpreset.html#threedimensionalvoice)

5. 支持在 Native 层处理自定义音视频数据

6. 支持设置推流视频源 

    相关 API 请参考：[setVideoSource](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/ets_ohos/classes/_zegoexpressengine_.zegoexpressengine.html#setvideosource)

7. 支持设置或切换不同的回声消除模式

    相关 API 请参考：[SetAECMode](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/ets_ohos/classes/_zegoexpressengine_.zegoexpressengine.html#setaecmode)

8. 支持设置或切换不同的噪声抑制模式

    相关 API 请参考：[SetANSMode](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/ets_ohos/classes/_zegoexpressengine_.zegoexpressengine.html#setansmode)


**问题修复**

1. 修复若干已知问题

---

## 1.2.0 版本 <a id="1.2.0"></a>

**发布日期：2024-11-07**

**新增功能**

1. 适配 HarmonyOS 发布版本

    该版本适配了 [HarmonyOS 5.0.0 Release](https://developer.huawei.com/consumer/cn/doc/harmonyos-releases-V5/overview-V5)，对应 API 版本为 API 12 Release。接入过程可能会遇到系统特性导致的问题，详情请参考 [已知问题及解决方案](https://doc-zh.zego.im/article/20445)。


2. 新增 KTV 模块

    支持 KTV 点歌、版权内容中心曲库等能力。支持的版权音乐厂商包括音速达、音集协、网易。

3. 新增游戏语音模块

    主要包括：
    - 范围语音：房间内的收听者对音频的接收距离有范围限制，若发声者与自己的距离超过该范围，则无法听到声音。
    - 3D 音效：声音有 3D 空间感，且按距离衰减。
    - 小队语音：玩家可以选择加入小队，并支持在房间内自由切换“全世界”、“仅小队”、“隐秘小队”语音模式，不同模式下所能通话的范围不同。

    相关 API 请参考：[createRangeAudio](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/ets_ohos/classes/_zegoexpressengine_.zegoexpressengine.html#createrangeaudio)、[ZegoRangeAudio](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/ets_ohos/classes/_zegoexpressdefines_.zegorangeaudio.html)


4. 使用 HarmonyOS 系统的折叠屏手机，支持多摄像头自动选择功能

5. 视频编码格式支持使用 VP8 编码

**问题修复**

1. 修复已知问题

---
## 1.1.1 版本 <a id="1.1.1"></a>

**发布日期：2024-08-27**

**问题修复**

1. 修复已知问题

---
## 1.1.0 版本 <a id="1.1.0"></a>

**发布日期：2024-08-15**

**新增功能**

补齐主要能力，包括：
- 通信能力：使用 Token 鉴权、通话质量监测。
- 音频能力：自定义音频处理、自定义音频采集与渲染、变声/混响/立体声。
- 视频能力：视频采集旋转、硬件编解码。
- 其他能力：音视频录制、音效文件播放器。

---
## 1.0.0 版本 <a id="1.0.0"></a>

**发布日期：2024-04-29**

**新增功能**

首次发布，支持登录房间、推流、拉流等实时音视频基础功能。




<Content />

