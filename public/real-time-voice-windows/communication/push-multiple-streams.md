# 同时推多路流

- - -

## 功能简介

推多路流即 SDK 提供了同时推多路流的能力（目前 SDK 支持推第二路流）。

当开发者业务中出现以下情况时，推荐使用 SDK 的推多路流的功能：

- 游戏主播主路流推摄像头画面，第二路流推屏幕采集画面。
- 户外主播主路流推前置摄像头，第二路流推后置摄像头。

## 示例源码下载

请参考 [下载示例源码](/real-time-video-windows-cpp/quick-start/run-example-code) 获取源码。

相关源码请查看 “/ZegoExpressExample/src/AuxStream” 目录下的文件。


## 前提条件

在实现推多路流功能之前，请确保：

- 已在项目中集成 ZEGO Express SDK，实现基本的实时语音功能，详情请参考 [快速开始 - 集成](https://doc-zh.zego.im/article/3577) 和 [快速开始 - 实现流程](https://doc-zh.zego.im/article/7637)。
- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppID 和 AppSign，详情请参考 [控制台 - 项目管理](/console/project-info) 中的“项目信息”。

## 使用步骤

1. 调用 [getVideoDeviceList](https://doc-zh.zego.im/zh/api?doc=Express_Video_SDK_API~CPP_windows~class~zego-express-i-zego-express-engine#get-video-device-list) 获取可用的视频设备列表。
2. 调用 [useVideoDevice](https://doc-zh.zego.im/zh/api?doc=Express_Video_SDK_API~CPP_windows~class~zego-express-i-zego-express-engine#use-video-device) 接口指定主路流的视频设备，调用 [startPublishingStream](https://doc-zh.zego.im/zh/api?doc=Express_Video_SDK_API~CPP_windows~class~zego-express-i-zego-express-engine#start-publishing-stream) 接口推主路流。
3. 调用 [useVideoDevice](https://doc-zh.zego.im/zh/api?doc=Express_Video_SDK_API~CPP_windows~class~zego-express-i-zego-express-engine#use-video-device) 接口指定第二路流的视频设备，调用 [startPublishingStream](https://doc-zh.zego.im/zh/api?doc=Express_Video_SDK_API~CPP_windows~class~zego-express-i-zego-express-engine#start-publishing-stream) 接口推第二路流。

```cpp
// 获取可用的视频设备
auto videoDeviceList = engine->getVideoDeviceList();

// 为主路流指定视频设备 然后开始推主路流
engine->useVideoDevice(videoDeviceList[0].deviceID, ZEGO_PUBLISH_CHANNEL_MAIN);
engine->startPublishingStream("stream1", ZEGO_PUBLISH_CHANNEL_MAIN);

// 为第二路流指定视频设备 然后开始推第二路流
engine->useVideoDevice(videoDeviceList[1].deviceID, ZEGO_PUBLISH_CHANNEL_AUX);
engine->startPublishingStream("stream2", ZEGO_PUBLISH_CHANNEL_AUX);
```

## API 参考列表

| 方法 | 描述 |
|-------|--------|
| [startPublishingStream](https://doc-zh.zego.im/zh/api?doc=Express_Video_SDK_API~CPP_windows~class~zego-express-i-zego-express-engine#start-publishing-stream) | 开始推流 |
| [stopPublishingStream](https://doc-zh.zego.im/zh/api?doc=Express_Video_SDK_API~CPP_windows~class~zego-express-i-zego-express-engine#stop-publishing-stream) | 停止推流 |
| [getVideoDeviceList](https://doc-zh.zego.im/zh/api?doc=Express_Video_SDK_API~CPP_windows~class~zego-express-i-zego-express-engine#get-video-device-list) | 获取视频设备列表 |
| [useVideoDevice](https://doc-zh.zego.im/zh/api?doc=Express_Video_SDK_API~CPP_windows~class~zego-express-i-zego-express-engine#use-video-device) | 指定视频设备 |
