# 音视频通话方案

- - -

本文介绍了在线健身场景音视频通话方案中的常用功能、及 ZEGO 提供的产品方案和相关集成文档。适用于私教指导、1 对多小班健身教学、结伴运动、友人竞技、健康饮食咨询等场景。

## 训练前准备

### **网络检测**

为保证训练教学过程的稳定性，提升用户的教学体验，建议开发者在课前，对教练端、学员端的网络情况进行检测，确保网络状况满足教学要求。详情请参考 [网络和性能](/real-time-video-ios-oc/communication/testing-network) 和 [通话前检测](/real-time-video-ios-oc/communication/pre-call-detection)。


## 训练互动

### **实时音视频互动**

基于 ZEGO 实时音视频（Express-Video SDK）服务，教练与学员、结伴运动学员可随时进行双向音频、视频通话，进行在线授课或结伴训练，营造高效的健身氛围。详情请参考 [实时音视频](/real-time-video-ios-oc/introduction/overview)。

### **屏幕共享**

通过 ZEGO 实时音视频（Express-Video SDK）服务提供的 API 接口，教练可将自己的设备屏幕内容共享给学员。详情请参考 [屏幕共享](/real-time-video-ios-oc/video/screen-sharing)。

### **媒体文件播放**

通过 ZEGO 实时音视频（Express-Video SDK）服务提供的 API 接口，教练可播放音视频媒体文件，并将媒体文件的音视频数据推流给学员，实现媒体文件实时共享。详情请参考 [媒体播放器](/real-time-video-ios-oc/video/screen-sharing)。

### **实时消息互动**

通过 ZEGO 即时通讯（ZIM SDK）服务，教练和学员可在训练过程发起群聊、私聊，通过文字消息实时互动。详情请参考 [即时通讯](/zim-ios/introduction/overview)。

### **视频镜面**

通过 ZEGO 实时音视频（Express-Video SDK）服务提供的 API 接口，支持设置本地预览/拉流端画面进行镜像展示，方便学员可以设置观看教练演示动作的视频镜像效果，对照练习。详情请参考 [常用视频配置](/real-time-video-ios-oc/video/common-video-configuration)。


## 视频优化

### **高清视频**

支持设置最高 4K 超高清分辨率，可以通过 ZEGO 实时音视频（Express-Video SDK）服务提供的 API 接口，设置视频分辨率、帧率、码率，高度还原视频画面细节，确保教练、学员线上课程体验。详情请参考 [常用视频配置](/real-time-video-ios-oc/video/common-video-configuration)。

### **视频编解码**

支持对视频编解码进行详细设置，包括启用分层视频编码、使用硬件编解码等，可以根据网络状态自适应地拉取视频流、开启硬件编码、使用 GPU 编解码、降低 CPU 使用率，有效解决了部分手机在推拉大分辨率的音视频流时，设备发热等问题。详情请参考 [视频编解码](/real-time-video-ios-oc/video/set-video-encoding)。

### **变形画面处理**

在健身教学场景中，可能会出现的因拍摄画面角度导致画面变形，影响教学效果。针对此问题，ZEGO 实时音视频（Express-Video SDK）服务提供自定义视频采集和渲染能力，支持开发者对视频画面进行前处理后，再进行渲染。详情请参考 [自定义视频采集](/real-time-video-ios-oc/video/custom-video-capture)、[自定义视频渲染](/real-time-video-ios-oc/video/custom-video-rendering)。

### **摄像头变焦**

通过 ZEGO 实时音视频（Express-Video SDK）服务提供的 API 接口，可设置摄像头变焦倍数，在拍摄时，可以放大远方物体，达到“近在眼前”的效果。详情请参考 [摄像头变焦](https://doc-zh.zego.im/article/6647)。

## 音频优化

### **高清音质**

支持设置 48 kHz 全频带采样，192 Kbps 码率，高度还原声音细节。详情请参考 API 接口文档 [推流音频配置](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~ObjectiveC~class~zego-audio-config)。

### **3A 处理**

3A 即 AEC（回声消除）、ANS（自动噪声抑制）、AGC（自动增益控制）。

在不同环境中，可以设置不同参数，以获得更好的听觉体验。例如在环境噪声较多的场景（如键盘声、尖叫、啸叫声等）中，可打开瞬态降噪来消除非平稳噪声。详情请参考 [音频 3A 处理](/real-time-video-ios-oc/audio/audio-3a-processing)。

### **变声/混响/立体声**

ZEGO 实时音视频（Express-Video SDK）服务提供多种预设的变声、混响、混响回声、立体声效果，可通过变声增加健身过程趣味性，通过混响营造特殊空间氛围，通过立体声打造空间感，提升特定场景下的健身效果。详情请参考 [变声/混响/立体声](/real-time-video-ios-oc/audio/audio-effects)。

### **音频频谱与音量变化**

推流或拉流后，ZEGO 实时音视频（Express-Video SDK）服务支持让教练或学员看到音调与音量变化，根据说话声音大小变化展示音量变化的动画，增强互动与趣味性。详情请参考 [音频频谱与音量变化](/real-time-video-ios-oc/audio/sound-level-spectrum)。

### **音效播放器**

ZEGO 实时音视频（Express-Video SDK）服务提供音效播放器，对音效进行统一管理，在课堂中人声背景下，可实时播放音效，如掌声、获得礼物、计时提示等。详情请参考 [音效播放器](/real-time-video-ios-oc/other/audio-effect-player)。

### **自定义音频采集与渲染**

ZEGO 实时音视频（Express-Video SDK）服务会启动默认的音频模块进行音频采集和渲染，当开发者希望对输入源做特殊的音效处理，或通过定制的采集系统获得采集后输入，支持自定义音频采集。详情请参考 [自定义音频采集与渲染](/real-time-video-ios-oc/audio/custom-audio-capture-and-rendering)。



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

### **实时美颜**

基于 AI 美颜（ZegoEffects SDK）服务，可实现美颜、美型功能，支持美白、磨皮、红润、大眼、瘦脸、白牙等美颜、美型参数调整。详情请参考 [美颜](/ai-effects-ios-objc/guides/face-beautification)、[美型](/ai-effects-ios-objc/guides/shape-retouch)。

### **背景分割**

基于 AI 美颜（ZegoEffects SDK）服务，可实现包括人像分割、绿幕分割，以及背景虚化、背景马赛克等功能。详情请参考 [背景分割](/ai-effects-ios-objc/guides/background-segmentation)。

### **实时审核**

可对提供的音视频频内容进行识别与审核，并返回不同的风险等级结果，提醒开发者进行相关处理。该功能需要联系 ZEGO 技术支持开通。

### **投屏**

用户可以将移动端视频画面实时投屏到电视、笔记本等大屏上，实现更具沉浸式的互动效果。用户可以参考第三方 App 或者成熟的投屏 SDK 自行实现投屏效果。   

支持超低延时同步投屏互动，ZEGO 自研海量有序数据网络 MSDN，提供音视频超低延迟技术，支持原唱跳视频的投屏，也包括用户唱跳的同步入画，让用户在投屏过程中获得更优的体验。兼容众多智能硬件平台，ZEGO 在智能家居的底层适配上达到近乎 100% 的适配度，完整解决了用户的多样化投屏需求。详情请参考 [实时音视频](/real-time-video-ios-oc/introduction/overview)。
