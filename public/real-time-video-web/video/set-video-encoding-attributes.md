# 设置视频编码属性

- - -

## 功能简介

ZEGO Express Web SDK 支持 H.264 和 VP8 两种视频编码格式，VP8 的浏览器兼容性优于 H.264，但 H.264 互通性上胜过 VP8。开发者在视频通话时可以根据业务场景需要选择适合的视频编码格式，使不同端之间进行编码对齐，实现多端互通。

## 示例源码下载

请参考 [下载示例源码](https://doc-zh.zego.im/article/3211) 获取源码。

相关源码请查看 “/Examples/AdvancedVideoProcessing/EncodingAndDecoding” 目录下的文件。

## 前提条件

在设置视频编码属性之前，请确保：

- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppID 和 Server 地址，详情请参考 [控制台 - 项目信息](/console/project-info)。
- 已在项目中集成 ZEGO Express SDK，并实现了基本的音视频推拉流功能，详情请参考 [快速开始 - 集成](https://doc-zh.zego.im/article/199) 和 [快速开始 - 实现流程](https://doc-zh.zego.im/article/7638)。

## 使用步骤

### 推摄像头画面

调用 [createZegoStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#create-zego-stream) 接口，设置 “camera” 属性，创建摄像头麦克风采集源数据。


```javascript
// 创建流是一个异步的过程，等待 Promise 完成返回 zego 流对象。
const localStream = await zg.createZegoStream({camera: {video: true, audio: true}});
// 预览推流前或者推流中的流，将播放组件挂载到页面，"local-video" 为组件容器 DOM 元素的 ID 。
localStream.playVideo(document.querySelector("#local-video"));
```

### 开始推流并选择合适视频编码格式

调用 [startPublishingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#start-publishing-stream) 接口将本地流推送到远端（ZEGO 服务器），通过 “videoCodec” 参数设置推流视频属性，只能传入 “VP8” 或 “H264”，默认值为 “H264”。

<Warning title="注意">


- 如需在浏览器使用 “VP8”，请确认当前使用的浏览器是否支持此编码格式。
- 在以下场景不能将推流视频属性设置为 “VP8”：
    - 需要和小程序互通。
    - 需要转推到CDN（含 CDN 录制，会导致录制文件异常）。

</Warning>



```javascript
// publishStreamId 自定义，需保证唯一
// videoCodec:  推流视频编码，只能传入 'VP8' (string) 或 'H264' (string)，默认值为 'H264' 。
const result = zg.startPublishingStream(publishStreamId, localStream, {videoCodec: 'VP8'});
```
