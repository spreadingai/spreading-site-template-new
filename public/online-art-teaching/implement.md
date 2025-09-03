# 集成指引

- - -

本文介绍了在线音乐教学场景方案中的常用功能、及 ZEGO 提供的产品方案和相关集成文档。

## 课前准备

### **网络检测**

为保证教学过程的稳定性，提升用户的教学体验，建议开发者在课前，对教师端、学生端的网络情况进行检测，确保网络状况满足教学要求。详情请参考 [网络和性能](/real-time-video-ios-oc/communication/testing-network) 和 [通话前检测](/real-time-video-ios-oc/communication/pre-call-detection)。

## 课堂互动

### **实时音视频互动**

基于 ZEGO 实时音视频（Express-Video SDK）服务，教师可随时发起音视频通话、对学生进行在线授课指导，学生也可以举手提问、与教师连麦互动，营造高效的课堂氛围。详情请参考 [实时音视频](/real-time-video-ios-oc/introduction/overview)。


### **文件共享**

支持文件上传、转码、展示等功能。教师在教学过程中，可随时共享乐谱、课件等，支持共享静态演示文件、动态演示文件、文字文件、表格文件、图片文件、H5 文件等多种格式类型文件。详情请参考 [超级白板](/super-board-ios/product-desc/overview)。

### **白板涂鸦**

支持白板涂鸦、互动功能。教师可以在授课过程中，使用涂鸦功能在演示的文件上进行涂写或标记，为学生提炼教学重点，帮助学生更好地理解；同时，学生也可使用白板与老师进行互动。详情请参考 [超级白板](/super-board-ios/product-desc/overview)。

### **屏幕共享**

通过 ZEGO 实时音视频（Express-Video SDK）服务提供的 API 接口，教师可将自己的设备屏幕内容共享给学生。详情请参考 [屏幕共享](/real-time-video-ios-oc/video/screen-sharing)。

### **媒体文件播放**

通过 ZEGO 实时音视频（Express-Video SDK）服务提供的 API 接口，教师可播放音视频媒体文件，并将媒体文件的音视频数据推流给学生，实现媒体文件实时共享。详情请参考 [媒体播放器](/real-time-video-ios-oc/video/screen-sharing)。

### **实时消息互动**

通过 ZEGO 实时音视频（Express-Video SDK）服务提供的 API 接口，教师和学生可在课堂中发起群聊、私聊，通过文字消息实时互动。详情请参考 [房间实时消息](/real-time-video-ios-oc/room/messaging-and-signaling)。


## 视频优化

### **高清视频**

支持设置最高 4K 超高清分辨率，可以通过 ZEGO 实时音视频（Express-Video SDK）服务提供的 API 接口，设置视频分辨率、帧率、码率，还可以设置本地预览/拉流端画面进行镜像展示，针对绘画、书法等场景，高度还原视频画面细节，确保教师、学生线上课程体验。详情请参考 [常用视频配置](/real-time-video-ios-oc/video/common-video-configuration)。

### **视频编解码**

支持对视频编解码进行详细设置，包括启用分层视频编码、使用硬件编解码等，可以根据网络状态自适应地拉取视频流、开启硬件编码、使用 GPU 编解码、降低 CPU 使用率，有效解决了部分手机在推拉大分辨率的音视频流时，设备发热等问题。详情请参考 [视频编解码](/real-time-video-ios-oc/video/set-video-encoding)。

### **变形画面处理**

在美术教学场景中，可能会出现的因拍摄画面角度导致画面变形，影响教学效果。针对自问题，ZEGO 实时音视频（Express-Video SDK）服务提供自定义视频采集和渲染能力，支持开发者对视频画面进行前处理后，再进行渲染。详情请参考 [自定义视频采集](/real-time-video-ios-oc/video/custom-video-capture)、[自定义视频渲染](/real-time-video-ios-oc/video/custom-video-rendering)。

### **摄像头变焦**

通过 ZEGO 实时音视频（Express-Video SDK）服务提供的 API 接口，可设置摄像头变焦倍数，在拍摄时，可以放大远方物体，达到“近在眼前”的效果。详情请参考 [摄像头变焦](https://doc-zh.zego.im/article/6647)。


## 课后回顾

### **录制**

ZEGO 提供了以下录制服务，可以完整录制授课过程，学生通过回放视频进行课后回顾、复习。教研团队也可通过回放内容对教师工作进行管理。详情请参考：

- [云端录制（推荐）](/cloud-recording/introduction/overview)
- [CDN 录制](/real-time-voice-server/api-reference/cdn/start-cdn-recrod)
- [本地服务端录制](/local-recording-linux-cpp/overview)


## 课堂质量回溯

### **星图**

基于 ZEGO 为开发者提供的星图平台，可对课程进行全链路的质量监控及故障定位，授课过程中的问题及时发现、解决，提升终端用户体验。详情请参考 [星图](/analytics-dashboard/introduction/overview)。


## 更多功能

### **多种角色支持**

除教师、学生外，还可以通过 ZEGO 实时音视频（Express-Video SDK）服务提供的 API 接口，实现助教端、监课端等能力。

助教端：在课堂内进行课堂、学生管理操作，确保课程有序进行。  
监课端：只拉流、不推流，老师、学生无法感知监课角色的存在。

### **实时美颜**

基于AI视觉（ZegoEffects SDK）服务，可实现美颜、美型功能，支持美白、磨皮、红润、大眼、瘦脸、白牙等美颜、美型参数调整。详情请参考 [美颜](/ai-effects-ios-objc/guides/face-beautification)、[美型](/ai-effects-ios-objc/guides/shape-retouch)。

### **背景分割**

基于AI视觉（ZegoEffects SDK）服务，可实现包括人像分割、绿幕分割，以及背景虚化、背景马赛克等功能。详情请参考 [背景分割](/ai-effects-ios-objc/guides/background-segmentation)。

### **实时审核**

可对提供的音视频频内容进行识别与审核，并返回不同的风险等级结果，提醒开发者进行相关处理。该功能需要联系 ZEGO 技术支持开通。
