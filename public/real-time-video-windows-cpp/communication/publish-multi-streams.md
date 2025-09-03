# 同时推多路流

- - -

## 功能简介

Express SDK 提供了同时推多路流的能力。当开发者的业务中出现以下情况时，推荐使用 SDK 的推多路流的功能：

- 游戏主播主路流推摄像头画面，第二路流推屏幕采集画面。
- 户外主播主路流推前置摄像头，第二路流推后置摄像头。

<Note title="说明">

目前 SDK 支持最大推流通道数量为 4 路流，2.14.0 之前版本默认最大推流通道数量为 2 路。如需支持更多推流通道，请联系 ZEGO 技术支持进行特殊编包。
</Note>

## 示例源码下载

请参考 [下载示例源码](https://doc-zh.zego.im/article/3128) 获取源码。

相关源码请查看 “/ZegoExpressExample/Examples/AdvancedStreaming/PublishingMultipleStreams” 目录下的文件。


## 前提条件

在实现推多路流功能之前，请确保：

- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppID 和 AppSign，详情请参考 [控制台 - 项目信息](/console/project-info)。
- 已在项目中集成 ZEGO Express SDK，并实现了基本的音视频推拉流功能，详情请参考 [快速开始 - 集成](https://doc-zh.zego.im/article/197) 和 [快速开始 - 实现流程](https://doc-zh.zego.im/article/7633)。


## 使用步骤

1. 调用 [getVideoDeviceList](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~CPP_windows~class~zego-express-i-zego-express-engine#get-video-device-list) 获取可用的视频设备列表。
2. 调用 [useVideoDevice](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~CPP_windows~class~zego-express-i-zego-express-engine#use-video-device) 接口指定主路流的视频设备，调用 [startPublishingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~CPP_windows~class~zego-express-i-zego-express-engine#start-publishing-stream) 接口推主路流。
3. 调用 [useVideoDevice](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~CPP_windows~class~zego-express-i-zego-express-engine#use-video-device) 接口指定第二路流的视频设备，调用 [startPublishingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~CPP_windows~class~zego-express-i-zego-express-engine#start-publishing-stream) 接口推第二路流。

```cpp
// 获取可用的视频设备
auto videoDeviceList = engine->getVideoDeviceList();

// 为主路流指定视频设备 然后开始推主路流
engine->useVideoDevice(videoDeviceList[0].deviceID, ZEGO_PUBLISH_CHANNEL_MAIN);
engine->startPublishingStream("stream1", ZEGO_PUBLISH_CHANNEL_MAIN);

// 为第二路流指定视频设备 然后开始推第二路流
// 辅路默认不采集，得设置下视频源 (利用实验性 api)

std::string params = "
{
   \"method\":\"express.video.set_video_source\",
    \"params\":{
        \"source\":2,
        \"channel\":1
    }
}";
engine->callExperimentalAPI(params);

engine->useVideoDevice(videoDeviceList[1].deviceID, ZEGO_PUBLISH_CHANNEL_AUX);
engine->startPublishingStream("stream2", ZEGO_PUBLISH_CHANNEL_AUX);
```


## 常见问题

**是否支持同时推 4 路以上的流？**

为了配合实时信令功能，目前 SDK 默认最大推流通道数量为 4 路，但 2.14.0 之前版本默认最大推流通道数量为 2 路。如需支持更多推流通道，请联系 ZEGO 技术支持进行特殊编包。
