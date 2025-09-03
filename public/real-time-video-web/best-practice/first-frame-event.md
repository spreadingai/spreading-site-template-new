# 监听视频流的首帧事件

- - -

## 功能介绍

本文展示了如何在播放视频时，监听视频流的首帧事件。


## 前提条件

在获取视频流的首帧之前，请确保：

- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppID 和 Server 地址，详情请参考 [控制台 - 项目信息](https://doc-zh.zego.im/article/12107)。
- 已在项目中集成 ZEGO Express SDK，并实现了基本的音视频推拉流功能，详情请参考 [快速开始 - 集成](/real-time-video-web/quick-start/integrating-sdk#集成-sdk-1) 和 [快速开始 - 实现流程](/real-time-video-web/quick-start/implementing-video-call#实现流程)。

## 示例源码下载

请参考 [下载示例源码](/real-time-video-web/quick-start/run-example-code#获取示例源码) 获取源码。

相关源码请查看ZEGO Express SDK “src/Examples/Scenes/VideoForMultipleUsers” 目录下的文件。

## 监听 RTC 视频流的首帧事件

### 使用 ZegoStreamView 播放视频流

1. 创建 ZegoExpressEngine 引擎实例

创建 [ZegoExpressEngine](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine) 引擎实例，将申请到的 AppID 传入参数 “appID”，将接入服务器地址传入参数 “server”。


<Note title="说明">

- “server” 为接入服务器地址，获取的方式请参考 [控制台 - 项目信息](https://doc-zh.zego.im/article/12107#2_2) 。
- 3.6.0 版本及以上 SDK，server 可以改成空字符、null、undefined 或者随意字符，但不能不填。
</Note>


```javascript
const zg = new ZegoExpressEngine(appID, server);
```

2. 监听本地流首帧事件

通过 [createZegoStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#create-zego-stream) 接口创建本地视频流，再注册本地视频流的 [canPlayVideo](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoLocalStreamEvent#can-play-video) 事件，即可监听到视频流的首帧加载完成。

```javascript
// 本地流 监听首帧 
const localZegoStream = await zg.createZegoStream();
localZegoStream.on('canPlayVideo', ()=> {
    // 首帧TODO ...
});
```

3. 监听远端流首帧事件

通过 [startPlayingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#start-playing-stream) 接口获取远端视频流和 [createRemoteStreamView](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#create-remote-stream-view) 接口得到媒体流播放组件实例，再注册媒体流播放组件的 [canPlayVideo](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~StreamViewEvent) 事件，即可监听到视频流的首帧加载完成。

```javascript
// 远端流 监听首帧 streamID 指远端流ID
const remoteStream = await zg.startPlayingStream(streamID);
const remoteView = zg.createRemoteStreamView(remoteStream);
remoteView.on('canPlayVideo', ()=> {
    // 首帧TODO ...
});
```
### 使用浏览器原生的 video 标签播放视频流

通过 `video` 元素的 [canplay](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLMediaElement/canplay_event) 事件，可以监听到视频流的首帧加载完成。

```javascript
const video = document.querySelector("video");

video.addEventListener("canplay", ()=> {
    // 首帧TODO ...
});
```

## 监听 CDN 视频流的首帧事件

### 使用 ZegoExpressPlayer 播放视频流

通过 [ZegoExpressPlayer](https://doc-zh.zego.im/article/18429) 的 [onCanPlay](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressPlayer#on-can-play) 事件，可以监听到视频流的首帧加载完成。

```javascript
// zg 是ZegoExpressEngine实例
const player = new ZegoExpressPlayer(zg, {
    container: document.getElementById("player-container"), // 播放器容器ID
    mode: "live"
});
player.onCanPlay = ()=> {
    // 首帧 TODO...
}
```

### 使用第三方 CDN 播放器播放视频流

使用第三方 CDN 播放器播放视频流，需要自行去对应的官网查找相关的视频流首帧事件。
