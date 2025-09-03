# 集成指引

- - -

本文介绍了远程会议的场景方案中的常用功能、及 ZEGO 提供的产品方案和相关集成文档。

## 检查网络和设备

为保证通话过程的稳定性，提升与会人员的使用体验，建议开发者在通话开始之前，对设备和网络进行检测，确保能够稳定地进行远程会议。详情请参考 [网络和性能](/real-time-video-ios-oc/communication/testing-network) 和 [通话前检测](/real-time-video-ios-oc/communication/pre-call-detection)。

## 实时互动

### 音视频通话

在确保网络和设备满足要求后，用户可使用 Express-Video SDK 加入房间，并开始音视频通话。详情请参考 [实现视频通话](/real-time-video-ios-oc/quick-start/implementing-video-call)。

### 文字消息互动

在通话过程中，用户可使用 ZIM SDK 进行文字聊天。详情请参考 [实现基本消息收发](/zim-ios/send-and-receive-messages)。


### 文件共享

支持文件上传、转码、展示等功能。教师在教学过程中，可随时共享乐谱、课件等，支持共享静态演示文件、动态演示文件、文字文件、表格文件、图片文件、H5 文件等多种格式类型文件。详情请参考 [超级白板](/super-board-ios/product-desc/overview)。

### 白板涂鸦

支持白板涂鸦、互动功能。教师可以在授课过程中，使用涂鸦功能在演示的文件上进行涂写或标记，为学生提炼教学重点，帮助学生更好地理解；同时，学生也可使用白板与老师进行互动。详情请参考 [超级白板](/super-board-ios/product-desc/overview)。

## 音/视频优化

### 高清视频

支持设置最高 4K 超高清分辨率，可以通过 ZEGO 实时音视频（Express-Video SDK）服务提供的 API 接口，设置视频分辨率、帧率、码率，还可以设置本地预览/拉流端画面进行镜像展示，高度还原视频画面细节，确保会议体验。详情请参考 [常用视频配置](/real-time-video-ios-oc/video/common-video-configuration)。

### 视频编解码

支持对视频编解码进行详细设置，包括启用分层视频编码、使用硬件编解码等，可以根据网络状态自适应地拉取视频流、开启硬件编码、使用 GPU 编解码、降低 CPU 使用率，有效解决了部分手机在推拉大分辨率的音视频流时，设备发热等问题。详情请参考 [视频编解码](/real-time-video-ios-oc/video/set-video-encoding)。

### 变形画面处理

在视频通话中，可能会出现的因拍摄画面角度导致画面变形，影响诊断效果。针对此类问题，ZEGO 实时音视频（Express-Video SDK）服务提供自定义视频采集和渲染能力，支持开发者对视频画面进行前处理后，再进行渲染。详情请参考 [自定义视频采集](/real-time-video-ios-oc/video/custom-video-capture)、[自定义视频渲染](/real-time-video-ios-oc/video/custom-video-rendering)。


## 录制回顾

ZEGO 提供了以下录制服务，可以完整录制视频会议的过程，主持人和参会者都可以观看录制后的视频获取相应的信息。详情请参考：

- [云端录制（推荐）](/cloud-recording/introduction/overview)
- [数据流录制](https://doc-zh.zego.im/faq/Data_Stream_Recording_offline?product=CloudRecording&platform=all)
- [CDN 录制](/real-time-voice-server/api-reference/cdn/start-cdn-recrod)
- [本地服务端录制](/local-recording-linux-cpp/overview)


## 通话质量回溯

基于 ZEGO 为开发者提供的星图平台，可对视频会议进行全链路的质量监控及故障定位，过程中的问题及时发现、解决，提升终端用户体验。详情请参考 [星图](/analytics-dashboard/introduction/overview)。


## 更多功能

### 实时美颜

基于 AI 美颜（ZegoEffects SDK）服务，可实现美颜、美型功能，支持美白、磨皮、红润、大眼、瘦脸、白牙等美颜、美型参数调整。详情请参考 [美颜](/ai-effects-ios-objc/guides/face-beautification)、[美型](/ai-effects-ios-objc/guides/shape-retouch)。

### 背景分割

基于 AI 美颜（ZegoEffects SDK）服务，可实现包括人像分割、绿幕分割，以及背景虚化、背景马赛克等功能，为枯燥的会议增添趣味。详情请参考 [背景分割](/ai-effects-ios-objc/guides/background-segmentation)。

### 实时审核

可对提供的音视频频内容进行识别与审核，并返回不同的风险等级结果，提醒开发者进行相关处理。该功能需要联系 ZEGO 技术支持开通。
