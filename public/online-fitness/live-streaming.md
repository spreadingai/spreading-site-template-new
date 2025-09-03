# 在线直播方案

- - -

本文介绍了在线健身直播方案中的常用功能、及 ZEGO 提供的产品方案和相关集成文档。适用于直播带练等场景。

## 训练前准备

### **网络检测**

为保证训练教学过程的稳定性，提升用户的教学体验，建议开发者在课前，对教练端、学员端的网络情况进行检测，确保网络状况满足教学要求。详情请参考 [网络和性能](/real-time-video-ios-oc/communication/testing-network) 和 [通话前检测](/real-time-video-ios-oc/communication/pre-call-detection)。


## 训练互动

### **实时音视频互动**

基于 ZEGO 实时音视频（Express-Video SDK）服务，教练可随时开播对学员进行在线授课指导，学员也可以与教练连麦互动，营造高效的课堂氛围。详情请参考 [实时音视频](/real-time-video-ios-oc/introduction/overview)。

### **屏幕共享**

通过 ZEGO 实时音视频（Express-Video SDK）服务提供的 API 接口，教练可将自己的设备屏幕内容共享给学员。详情请参考 [屏幕共享](/real-time-video-ios-oc/video/screen-sharing)。

### **媒体文件播放**

通过 ZEGO 实时音视频（Express-Video SDK）服务提供的 API 接口，教练可播放音视频媒体文件，并将媒体文件的音视频数据推流给学员，实现媒体文件实时共享。详情请参考 [媒体播放器](/real-time-video-ios-oc/video/screen-sharing)。

### **实时消息互动**

通过 ZEGO 即时通讯（ZIM SDK）服务，教练和学员可在训练过程发起群聊、私聊，通过文字消息实时互动。详情请参考 [即时通讯](/zim-ios/introduction/overview)。

### **视频镜面**

通过 ZEGO 实时音视频（Express-Video SDK）服务提供的 API 接口，学员可以设置观看教练演示动作的视频镜像效果，方便对照练习。详情请参考 [常用视频配置](/real-time-video-ios-oc/video/common-video-configuration)。


## 训练回顾

### **录制**

ZEGO 提供了以下录制服务，可以完整录制授课过程，学员通过回放视频进行训练内容回顾、复习。监课团队也可通过回放内容对教练工作进行管理。详情请参考：

- [云端录制（推荐）](/cloud-recording/introduction/overview)
- [数据流录制](https://doc-zh.zego.im/faq/Data_Stream_Recording_offline?product=CloudRecording&platform=all)
- [CDN 录制](/real-time-voice-server/api-reference/cdn/start-cdn-recrod)
- [本地服务端录制](/local-recording-linux-cpp/overview)


## 训练教学质量回溯

### **星图**

基于 ZEGO 为开发者提供的星图平台，可对课程进行全链路的质量监控及故障定位，授课过程中的问题及时发现、解决，提升终端用户体验。详情请参考 [星图](/analytics-dashboard/introduction/overview)。


## 更多功能

### **多种角色支持**

除主讲教练、学员外，还可以通过 ZEGO 实时音视频（Express-Video SDK）服务提供的 API 接口，实现助教端、监课端等能力。

助教端：主讲教练对课件内容进行讲解，助教端的演示教练在课堂内进行动作演示，方便学员同步跟练。  
监课端：只拉流、不推流，教练、学员无法感知监课角色的存在。

### **实时美颜**

基于 AI 美颜（ZegoEffects SDK）服务，可实现美颜、美型功能，支持美白、磨皮、红润、大眼、瘦脸、白牙等美颜、美型参数调整。详情请参考 [美颜](/ai-effects-ios-objc/guides/face-beautification)、[美型](/ai-effects-ios-objc/guides/shape-retouch)。

### **背景分割**

基于 AI 美颜（ZegoEffects SDK）服务，可实现包括人像分割、绿幕分割，以及背景虚化、背景马赛克等功能。详情请参考 [背景分割](/ai-effects-ios-objc/guides/background-segmentation)。

### **实时审核**

可对提供的音视频频内容进行识别与审核，并返回不同的风险等级结果，提醒开发者进行相关处理。该功能需要联系 ZEGO 技术支持开通。

### **投屏**

用户可以将移动端视频画面实时投屏到电视、笔记本等大屏上，实现更具沉浸式的互动效果。用户可以参考第三方 App 或者成熟的投屏 SDK 自行实现投屏效果。   

支持超低延时同步投屏互动，ZEGO 自研海量有序数据网络 MSDN，提供音视频超低延迟技术，支持原唱跳视频的投屏，也包括用户唱跳的同步入画，让用户在投屏过程中获得更优的体验。兼容众多智能硬件平台，ZEGO 在智能家居的底层适配上达到近乎 100% 的适配度，完整解决了用户的多样化投屏需求。详情请参考 [实时音视频](/real-time-video-ios-oc/introduction/overview)。
