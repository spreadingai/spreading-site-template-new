# 同时推多路流

- - -

## 功能简介

Express SDK 提供了同时推多路流的能力，一般应用于游戏直播场景，游戏主播主路流推摄像头画面，第二路流推屏幕采集画面。

## 示例源码下载

请参考 [下载示例源码](https://doc-zh.zego.im/article/16051) 获取源码。

相关源码请查看 “src/Examples/AdvancedStreaming/PublishingMultipleStreams” 目录下的文件。

## 前提条件

在实现推多路流功能之前，请确保：

- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppID 和 Server 地址，详情请参考 [控制台 - 项目信息](/console/project-info)。
- 已在项目中集成 ZEGO Express SDK，并实现了基本的音视频推拉流功能，详情请参考 [快速开始 - 集成](https://doc-zh.zego.im/article/199) 和 [快速开始 - 实现流程](https://doc-zh.zego.im/article/7638)。

## 使用步骤

### 推摄像头画面

调用 [createZegoStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#create-zego-stream) 接口，设置 “camera” 属性，创建推流数据源，调用 [startPublishingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#start-publishing-stream) 接口将本地流推送到远端（ZEGO 服务器）。

```javascript
// 创建流是一个异步的过程，等待 Promise 完成返回媒体流对象。
const stream = await zg.createZegoStream({camera: {video: true, audio: true}});

// 预览推流前或者推流中的流，将播放组件挂载到页面组件容器 DOM 元素上。
stream.playVideo(document.querySelector("#local-video"));

const result = zg.startPublishingStream(publishStreamId, stream, publishOption);
```

### 推屏幕采集画面

调用 [createZegoStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#create-zego-stream) 接口，设置 “screen” 属性，创建推流数据源，调用 [startPublishingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#start-publishing-stream) 接口将本地流推送到远端（ZEGO 服务器）。

```javascript
// 创建流是一个异步的过程，等待 Promise 完成返回媒体流对象。
const screenStream = await zg.createZegoStream({
    screen: {
        audio: $('#isScreenAudio').val() == 'yes' ? true : false,
        video: {
            quality: 1
        }
    },
});

// 预览推流前或者推流中的流，将播放组件挂载到页面组件容器 DOM 元素上
screenStream.playVideo(document.querySelector("#local-video"));

const publisRes= zg.startPublishingStream(screenStreamId, screenStream);
```

<Content />

