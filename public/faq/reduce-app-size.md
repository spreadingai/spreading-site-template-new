<Title>如何减少集成 Native SDK 的 App 体积？</Title>



- - -

本文介绍如何减少集成 Express Native SDK 后的 App 体积（即包大小）。

<Note title="说明">



- Native 平台主要指 Android、iOS、macOS 和 Windows 平台。
- 集成最新版本的 Native SDK 相对于未集成 SDK 的 App 体积增量数据请参考 [实时音视频 - 概述](/real-time-video-android-java/introduction/overview)。

</Note>





## 方案一：使用实时语音版本 Express-Audio SDK

当您的业务中不涉及视频模块相关功能时，可直接使用 Express-Audio SDK，能够减少包大小。同时，由于 Express-Video SDK 和 Express-Audio SDK 接口上是兼容的，因此后续您可以很方便地通过替换 SDK 做到从纯音频场景切换到音视频场景。

<Note title="说明">



Native 各平台 Express-Audio SDK 的下载地址如下：
- iOS：[Express-Audio SDK](/real-time-voice-ios/client-sdk/download-sdk)
- Android：[Express-Audio SDK](/real-time-voice-android/client-sdk/download-sdk)
- macOS：[Express-Audio SDK](/real-time-voice-macos/client-sdk/download-sdk)
- Windows：[Express-Audio SDK](/real-time-voice-windows/client-sdk/download-sdk)

</Note>





## 方案二：联系 ZEGO 技术支持提供裁剪包

ZEGO 支持 iOS、Android、Windows 和 macOS SDK 功能级别的裁剪，当前可裁剪功能如下，详情请联系 ZEGO 技术支持。

- 媒体播放器与音效播放器。
- 本地媒体录制功能。
- 流加解密功能；HTTPS 和 RTMPS 推拉流功能。
- 美颜功能。
- 不常用的音视频编解码器：详情可向 ZEGO 技术支持咨询。
