<Title>WebRTC 浏览器的一些已知问题及规避方案？</Title>



- - -

本文介绍 WebRTC 浏览器的一些已知问题、及规避方案，开发者可在使用过程中参考本文处理，或联系 ZEGO 技术支持。

## Chrome

**开启硬件加速后，当出现丢包时，偶现视频花屏的问题。**

请升级至 Chrome 86 或以上版本，以及将 SDK 升级至最新版本，点击 [下载 SDK](/real-time-video-web/client-sdk/download-sdk)。


**Chrome 88 开启硬件加速时，使用 HTMLMediaElement.captureStream 推 MP4 文件，远端拉流观看黑屏问题。[Chrome 88 bug](https://bugs.chromium.org/p/chromium/issues/detail?id=1156408)**

- 请升级至 Chrome 96 或以上版本。
- 请关闭硬件加速，可规避此问题。


**Mac Chrome 88(88.0.4324.96) 推摄像头采集的视频流，远端拉流观看黑屏问题。[Chrome 88 bug](https://bugs.chromium.org/p/chromium/issues/detail?id=1168948#c34)**

请升级至 Chrome 88.0.4324.146 或以上版本。

**Chrome 使用 deviceId 为 “default” 或 “communications” (Windows 设备下会有该 deviceId) 时，若插入新的麦克风，再拔出，可能会导致麦克风采集中断。**

请避免使用 deviceId 为 “default” 或 “communications” 的麦克风设备即可。

**Mac Chrome 开启硬件加速时，调用 mutePublishStreamVideo 接口，关闭视频再恢复后，可能会导致推流帧率掉至 2 fps 无法恢复。[Chrome bug](https://bugs.chromium.org/p/webrtc/issues/detail?id=12704#c3)**

- 请将 SDK 升级至最新版本，点击 [下载 SDK](/real-time-video-web/client-sdk/download-sdk)。
- 请升级至 Chrome 91 或以上版本。

**Windows Chrome 91 版本，开启硬件加速时，编码分辨率宽高只有目标分辨率宽高一半的问题。[Chrome bug](https://bugs.chromium.org/p/webrtc/issues/detail?id=12942)**

请将 SDK 升级至最新版本，点击 [下载 SDK](/real-time-video-web/client-sdk/download-sdk)。

**Window Chrome 开硬件加速时，编 15fps 的画面的编码码率只有目标码率一半的问题。[Chrome bug](https://bugs.chromium.org/p/webrtc/issues/detail?id=12932)**

请将 SDK 升级至最新版本，点击 [下载 SDK](/real-time-video-web/client-sdk/download-sdk)。

**Windows Chrome 被静音的问题。**

Windows Chrome 中会有一个 deviceId 为 “communications” 的麦克风设备，这个麦克风是 Chrome 基于真实麦克风做的一次封装，该麦克风会受 Windows 的声音通信配置受限。若用户将 Windows 的声音通信配置设置为 “将其他所有应用设置为静音”，同时使用了 “communications” 麦克风采集，则可能出现 Chrome 被静音的问题。

若业务侧指定了麦克风进行采集，应避免使用 deviceId 为 “communication” 的麦克风。

**Chrome 采集无声的问题。**

Chrome 会有一个 deviceId 为 “default” 的麦克风设备，该麦克风指向 Chrome 认为的默认麦克风。当使用 deviceId 为 “default” 的麦克风进行通话时，若插入一个新的麦克风后，再将其拔出，可能会出现采集中断，导致采集无声问题。

请将 SDK 升级至最新版本，点击 [下载 SDK](/real-time-video-web/client-sdk/download-sdk)。当出现采集异常时，SDK 会自动恢复采集。

**部分 Windows 电脑，音频设备选择“立体声混音”，没有声音。**

请避免使用“立体声混音”设备。

## Firefox

**Firefox 不支持设置采集帧率，只能采集 30fps 的视频。**

**Firefox 选择 obs 作为推流源时，浏览器不支持获取流信息，推流时也没有流质量的相关回调。**

## iOS Safari

**iOS Safari 不支持多个 tab getUserMedia，否则前一个 tab 会停止采集，远端流也有可能出现黑屏无声。[webkit bug](https://bugs.webkit.org/show_bug.cgi?id=179363)**

多个 tab getUserMedia 的业务场景一般有：在视频通话过程中，切换新 tab 进行人脸识别。

iOS Safari 尚无计划支持多 tab getUserMedia 特性，若业务侧需要在 iOS Safari 使用多个 tab getUserMedia，建议在切换新 tab 之前，停止设备采集；在切换回来后，再恢复设备采集。


**iOS Safari 和 Mac Big Sur

请升级 Mac BigSur 至最新版本。

**iOS 14.2 部分设备及 Mac Big Sur Safari，音频播放会有杂音。[webkit bug](https://bugs.webkit.org/show_bug.cgi?id=218762)**

请升级 iOS 设备至 14.3 或以上版本、Mac Big Sur 升级至最新版本。

**iOS 15 Safari 音视频通话时，扬声器外放声音可能会比 iOS 14 低。[webkit bug](https://bugs.webkit.org/show_bug.cgi?id=230902)**

请升级 iOS 设备至 15.4 或以上版本。

**iOS 15.0 Safari 音视频通话时，播放视频时可能出现黑屏的问题。[webkit bug](https://bugs.webkit.org/show_bug.cgi?id=230532)**

请升级 SDK 至 2.14.0 或以上版本，点击 [下载 SDK](/real-time-video-web/client-sdk/download-sdk)。

**iOS 15.1 Safari 和 Chrome 进行推流时，浏览器页面会 crash。[webkit bug](https://bugs.webkit.org/show_bug.cgi?id=232006)**

- 请升级 SDK 至 2.14.0 或以上版本，点击 [下载 SDK](/real-time-video-web/client-sdk/download-sdk)。SDK 使用 canvas 采集的方案规避了该问题，该规避方案性能开销相对会更大些。

    出于性能的考虑，建议在 iOS 15.1 采集 Profile 不高于 720p，15fps。<b>请注意，该方案需要本地视频流处于播放状态，请升级到最新的SDK。</b>从根本上来说，该问题需要 iOS 发布新版本解决。

- 苹果计划于 iOS 15.2 修复该问题，可升级 iOS 15.2 或以上版本。


**A 用户外放 B 用户的声音，同时手机也在采集 A 的声音，此时 B 用户听到的声音会伴随有电流声，这是 iOS 14 回声消除功能带来的副作用。**

- 请使用耳麦进行通话。
- 请升级 iOS 设备至 15.4 或以上版本。

**iOS 15 以下版本，canvas.captureStream 采集出的视频流，无法使用 video 标签播放。[webkit bug](https://bugs.webkit.org/show_bug.cgi?id=181663)**


## Webview

**Android System Webview M79 以下的版本，无法使用 H264 解码。[Webview bug](https://bugs.chromium.org/p/chromium/issues/detail?id=801501)**

请升级 Android System Webview 版本至 M79 或以上版本，需要安装对应版本的 Webview apk 安装包。


## 华为设备

**华为浏览器、华为设备中的 Chrome 浏览器无法推流。**

由于华为设备的限制，部分版本的华为浏览器及华为 Chrome 浏览器不支持 H264 编码，因此无法推流。

开发者可以使用 VP8 编码进行推流。

## 小米设备

**在部分小米手机的微信中，会出现拉流无声问题。**

已知的机型有：小米 9、小米 10s、小米 11、K30 5G 等机型。

该问题为 MIUI 已知问题，小米工程师正着手修复。微信也找到了规避方案，目前正在灰度中。

## 微信

**微信 TBS/045811 及其以下版本的内核，在授权窗口弹出后，若超过 5s 才点击授权按钮，会出现自动播放失败错误。**

当出现自动播放错误时，引导客户点击页面后，调用 video.play() 接口恢复播放。

## 屏幕分享

**Windows & Mac Chrome 浏览器屏幕分享某个 app 后，最小化会导致采集停止，fps = 0。**

**Windows 端使用 Chrome 屏幕分享，选择应用窗口分享至【微信】【QQ】【钉钉】【WPS】等应用时，可能会出现采集黑屏；或者拖动应用窗口时出现采集黑屏。**

建议分享整个屏幕。

**Windows Chrome 使用 H264 编码，开启硬件加速时，屏幕分享码率可能无法达到目标码率，导致画质不及预期。**

请升级 SDK 至 2.14.0 或以上版本，点击 [下载 SDK](/real-time-video-web/client-sdk/download-sdk)。

**Mac Firefox 屏幕分享可能会出现视频部分区域错位，[Firefox bug](https://bugzilla.mozilla.org/show_bug.cgi?id=1536777)。**

建议使用 Chrome or Safari 浏览器进行屏幕分享。

**Mac Chrome 在已授权屏幕录制的情况下屏幕分享失败，出现 "NotAllowedError: Permission denied by system" 或者 "NotReadableError: Could not start video source" 错误信息，[Chrome bug](https://bugs.chromium.org/p/chromium/issues/detail?id=1306876)。**

打开【设置】> 点击【安全性与隐私】> 点击【隐私】> 点击【屏幕录制】> 关闭 Chrome 屏幕录制授权 > 重新打开 Chrome 屏幕录制授权 > 关闭 Chrome 浏览器 > 重新打开 Chrome 浏览器。

**在 Windows7 操作系统上，使用 Firefox 浏览器进行屏幕分享，选择分享当前窗口页面时，出现采集黑屏。**

建议分享整个屏幕，或使用 Chrome 浏览器进行屏幕分享。

## 其他厂商

**网易 WebRTC SDK 会改写 RTCPeerConnection.prototype.getStats 方法，返回的数据格式与标准 WebRTC 协议不一致。**

若同时引入 Express-Video SDK 和网易的 WebRTC SDK，Express 会拿不到音视频数据，导致无法向正常向仪表盘上报音视频通话数据。