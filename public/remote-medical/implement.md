# 集成指引

- - -

本文介绍了远程医疗的场景方案中的常用功能、及 ZEGO 提供的产品方案和相关集成文档。

本方案适用于远程会诊、视频急救、心理咨询、医疗培训等场景中。

## 检查网络和设备

为保证诊疗通话过程的稳定性，提升医生和患者的使用体验，建议开发者在通话开始之前，对设备和网络进行检测，确保能够稳定地进行远程医疗服务。详情请参考 [网络和性能](/real-time-video-ios-oc/communication/testing-network) 和 [通话前检测](/real-time-video-ios-oc/communication/pre-call-detection)。


## 实时互动

### 音视频通话

在确保网络和设备满足要求后，用户可使用 Express-Video SDK 加入房间，并开始音视频通话。详情请参考 [实现视频通话](/real-time-video-ios-oc/quick-start/implementing-video-call)。

### 消息互动

在诊疗过程中，用户可使用 ZIM SDK 进行文字聊天、图片收发等 IM 消息的同步。详情请参考 [实现基本消息收发](/zim-ios/send-and-receive-messages)。

## 音/视频优化

### 高清视频

支持设置最高 4K 超高清分辨率，可以通过 ZEGO 实时音视频（Express-Video SDK）服务提供的 API 接口，设置视频分辨率、帧率、码率，还可以设置本地预览/拉流端画面进行镜像展示，高度还原视频画面细节，确保医生和患者远程诊疗时的体验。详情请参考 [常用视频配置](/real-time-video-ios-oc/video/common-video-configuration)。

### 视频编解码

支持对视频编解码进行详细设置，包括启用分层视频编码、使用硬件编解码等，可以根据网络状态自适应地拉取视频流、开启硬件编码、使用 GPU 编解码、降低 CPU 使用率，有效解决了部分手机在推拉大分辨率的音视频流时，设备发热等问题。详情请参考 [视频编解码](/real-time-video-ios-oc/video/set-video-encoding)。

### 变形画面处理

诊疗时，可能会出现的因拍摄画面角度导致画面变形，影响诊断效果。针对此类问题，ZEGO 实时音视频（Express-Video SDK）服务提供自定义视频采集和渲染能力，支持开发者对视频画面进行前处理后，再进行渲染。详情请参考 [自定义视频采集](/real-time-video-ios-oc/video/custom-video-capture)、[自定义视频渲染](/real-time-video-ios-oc/video/custom-video-rendering)。

### 摄像头变焦

通过 ZEGO 实时音视频（Express-Video SDK）服务提供的 API 接口，可设置摄像头变焦倍数，在拍摄时，可以放大物体，达到“近在眼前”的效果。详情请参考 [如何调节摄像头的焦距（变焦功能）](https://doc-zh.zego.im/faq/express_adjust_focal?product=ExpressVideo)。


## 录制回顾

ZEGO 提供了以下录制服务，可以完整录制远程医疗的过程，医生、患者、普通用户都可以观看录制后的视频获取相应的信息。详情请参考：

- [云端录制（推荐）](/cloud-recording/introduction/overview)
- [数据流录制](https://doc-zh.zego.im/faq/Data_Stream_Recording_offline?product=CloudRecording&platform=all)
- [CDN 录制](/real-time-voice-server/api-reference/cdn/start-cdn-recrod)
- [本地服务端录制](/local-recording-linux-cpp/overview)


## 通话质量回溯

基于 ZEGO 为开发者提供的星图平台，可对诊疗过程进行全链路的质量监控及故障定位，过程中的问题及时发现、解决，提升终端用户体验。


## 更多功能

### 实时美颜

基于 AI 美颜（ZegoEffects SDK）服务，可实现美颜、美型功能，支持美白、磨皮、红润、大眼、瘦脸、白牙等美颜、美型参数调整。详情请参考 [美颜](/ai-effects-ios-objc/guides/face-beautification)、[美型](/ai-effects-ios-objc/guides/shape-retouch)。

### 背景分割

基于 AI 美颜（ZegoEffects SDK）服务，可实现包括人像分割、绿幕分割，以及背景虚化、背景马赛克等功能。详情请参考 [背景分割](/ai-effects-ios-objc/guides/background-segmentation)。

### 实时审核

可对提供的音视频频内容进行识别与审核，并返回不同的风险等级结果，提醒开发者进行相关处理。该功能需要联系 ZEGO 技术支持开通。
