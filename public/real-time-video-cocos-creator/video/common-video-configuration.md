# 常用视频配置

- - -

## 功能简介

在视频通话或直播时，开发者可以根据需要指定推流和拉流视频相关配置，如视频采集分辨率、视频编码输出分辨率、视频帧率、码率、视图模式和镜像模式。

- 分辨率：
    - 视频分辨率：用于度量图像内数据量多少的一个参数，通常表示成 ppi。
    - 采集分辨率：指摄像头等采集设备提供的画面分辨率。
    - 编码分辨率：指经过编码处理的画面的分辨率。
- 码率：指每秒传输的比特（bit）数，单位为 bps（bit per second）。
- 帧率：单位时间内视频显示帧数的量度单位，测量单位为“每秒显示帧数”（Frame Per Second，fps）。

设置合适的视频分辨率、帧率和码率可以在音视频场景中提供用户更好的使用体验。选择合适镜像模式与视图模式则可以让开发者提供个性化的视频显示模式。

## 示例源码下载

请参考 [下载示例源码](https://doc-zh.zego.im/article/16918) 获取源码。

相关源码请查看 **assets/topics/publish_stream/** 目录下的文件。

## 前提条件

在设置视频配置之前，请确保：

- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppID 和 AppSign，详情请参考 [控制台 - 项目信息](/console/project-info)。
- 已在项目中集成 ZEGO Express SDK，并实现了基本的音视频推拉流功能，详情请参考 [快速开始 - 集成](https://doc-zh.zego.im/article/16919) 和 [快速开始 - 实现流程](https://doc-zh.zego.im/article/16920)。


## 使用步骤

### 1 修改视频配置

通过调用 [setVideoConfig](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~typescript_cocos-creator~class~ZegoExpressEngine#set-video-config) 接口修改视频配置，用户既可自定义参数，也可以使用预设值进行设置。

<Warning title="注意">


需要在推流（[startPublishingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~typescript_cocos-creator~class~ZegoExpressEngine#start-publishing-stream)）前或预览（[startPreview](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~typescript_cocos-creator~class~ZegoExpressEngine#start-preview)）前设置好相关视频配置，在推流后仅支持编码分辨率和码率的修改。


</Warning>



#### 自定义参数设置

调用 [setVideoConfig](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~typescript_cocos-creator~class~ZegoExpressEngine#set-video-config) 接口修改推流视频配置，可通过该接口设置视频帧率、码率、视频采集分辨率和视频编码输出分辨率。若不进行特殊设置，则 SDK 会根据选定的场景，自动应用适合该场景的分辨率、码率、帧率，以获取最佳体验效果，详情请参考 [场景化音视频配置](https://doc-zh.zego.im/article/16923)。

<Note title="说明">


如果拉流端需要拉取 60 帧的流，需要联系技术支持，详情可参考 [ZEGO Express SDK 是否支持拉 60 帧的流？](https://doc-zh.zego.im/faq/Pull_the_stream_of_60_frames)

</Note>



以设置视频采集分辨率为 360p，编码分辨率为 360p，码率为 600 kbps，帧率为 15 fps 为例：

```ts
let videoConfig = new ZegoVideoConfig()
videoConfig.captureWidth = 640
videoConfig.captureHeight = 360
videoConfig.encodeWidth = 640
videoConfig.encodeHeight = 360
videoConfig.bitrate = 600
videoConfig.fps = 15

// 设置视频配置
this.engine.setVideoConfig(videoConfig)
```

#### 使用预设值设置

除自定义参数设置之外，也可以使用 ZEGO Express SDK 提供的预设组合值，[ZegoVideoConfigPreset](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~typescript_cocos-creator~enum~ZegoVideoConfigPreset) 的预设组合值如下：

| ZegoVideoConfigPreset | 采集分辨率<br/>（宽 × 高） | 编码分辨率<br/>（宽 × 高） | 帧率（fps） | 码率（kbps） |
| ------------------- | ------------------ | --------------- | --------- | ---------- |
|      Preset180P      |       320 × 180        |      320 × 180      |     15      |     300      |
|      Preset270P      |       480 × 270       |      480 × 270      |     15      |     400      |
|      Preset360P      |       640 × 360        |      640 × 360      |     15      |     600      |
|      Preset540P      |       960 × 540        |      960 × 540      |     15      |     1200     |
|      Preset720P      |       1280 × 720       |      1280 × 720     |     15      |     1500     |
|     Preset1080P      |       1920 × 1080      |     1920 × 1080     |     15      |     3000     |

调用 [setVideoConfig](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~typescript_cocos-creator~class~ZegoExpressEngine#set-video-config) 接口使用预设值时示例代码如下：

```ts
// 使用预设置进行视频设置
let videoConfig = new ZegoVideoConfig(ZegoVideoConfigPreset.Preset1080P)
this.engine.setVideoConfig(videoConfig)
```

## 相关文档

- [如何选择视频分辨率、帧率、码率？](https://doc-zh.zego.im/faq/video_info)
- [怎么处理视频模糊问题？](https://doc-zh.zego.im/faq/video_blur)
