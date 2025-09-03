# 常用视频配置

- - -

## 功能简介

在视频通话或直播时，开发者可以根据需要指定推流和拉流视频相关配置，如视频采集分辨率、视频编码输出分辨率、视频帧率、码率、视图模式和镜像模式。

- 分辨率：
    - 视频分辨率：用于度量图像内数据量多少的一个参数，通常表示成 ppi。
    - 采集分辨率：指摄像头等采集设备提供的画面分辨率。
    - 编码分辨率：指经过编码处理的画面的分辨率。
- 码率：指每秒传输的比特（bit）数，单位为 kbps（kilobits per second）。
- 帧率：单位时间内视频显示帧数的量度单位，测量单位为“每秒显示帧数”（Frame Per Second，fps）。

设置合适的视频分辨率、帧率和码率可以在音视频场景中提供用户更好的使用体验。选择合适镜像模式与视图模式则可以让开发者提供个性化的视频显示模式。

## 示例源码下载

请参考 [下载示例源码](https://doc-zh.zego.im/article/3126) 获取源码。

相关源码请查看 “/ZegoExpressExample/Examples/CommonFeatures/CommonVideoConfig” 目录下的文件。

## 前提条件

在进行视频配置之前，请确保：

- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppID 和 AppSign，详情请参考 [控制台 - 项目信息](/console/project-info)。
- 已在项目中集成 ZEGO Express SDK，并实现了基本的音视频推拉流功能，详情请参考 [快速开始 - 集成](https://doc-zh.zego.im/article/196) 和 [快速开始 - 实现流程](https://doc-zh.zego.im/article/7628)。


## 使用步骤

### 1 修改视频配置

通过调用 [setVideoConfig](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoExpressEngine#set-video-config) 接口修改视频配置，用户既可自定义参数，也可以使用预设值进行设置。

<Warning title="注意">


需要在推流（[startPublishingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoExpressEngine#start-publishing-stream)）前或预览（[startPreview](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoExpressEngine#start-preview)）前设置好相关视频配置，在推流后仅支持编码分辨率和码率的修改。
</Warning>

#### 自定义参数设置

调用 [setVideoConfig](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoExpressEngine#set-video-config) 接口修改推流视频配置，可通过该接口设置视频帧率、码率、视频采集分辨率和视频编码输出分辨率。若不进行特殊设置，则 SDK 会根据选定的场景，自动应用适合该场景的分辨率、码率、帧率，以获取最佳体验效果，详情请参考 [场景音视频配置](https://doc-zh.zego.im/article/16316)。

<Note title="说明">


如果拉流端需要拉取 60 帧的流，需要联系技术支持，详情可参考 [ZEGO Express SDK 是否支持拉 60 帧的流？](https://doc-zh.zego.im/faq/Pull_the_stream_of_60_frames)
</Note>

以设置视频采集分辨率为 360p，编码分辨率为 360p，码率为 600 kbps，帧率为 15 fps 为例：

```objc
// 需要在预览（startPreview）和推流（startPublishingStream）前设置好相关视频配置
ZegoVideoConfig *videoConfig = [[ZegoVideoConfig alloc] init];
videoConfig.captureResolution = CGSizeMake(360, 640);
videoConfig.encodeResolution = CGSizeMake(360, 640);
videoConfig.fps = 15;
videoConfig.bitrate = 600;
[[ZegoExpressEngine sharedEngine] setVideoConfig:videoConfig];
```

<Note title="说明">


移动端的宽高分辨率与 PC 端的宽高分辨率是相反的，例如移动端 360p 的分辨率为 360 × 640，而 PC 端 360p 的分辨率为 640 × 360。
</Note>

#### 使用预设值设置

您也可以使用 ZEGO Express SDK 提供的预设组合值进行修改视频配置，[ZegoVideoConfigPreset](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~enum~ZegoVideoConfigPreset) 的预设组合值如下：

| ZegoVideoConfigPreset | 采集分辨率<br/>（宽 × 高） | 编码分辨率<br/>（宽 × 高） | 帧率（fps） | 码率（kbps） |
| ------------------- | ------------------ | --------------- | --------- | ---------- |
|      PRESET_180P      |       180 × 320        |      180 × 320      |     15      |     300      |
|      PRESET_270P      |       270 × 480        |      270 × 480      |     15      |     400      |
|      PRESET_360P      |       360 × 640        |      360 × 640      |     15      |     600      |
|      PRESET_540P      |       540 × 960        |      540 × 960      |     15      |     1200     |
|      PRESET_720P      |       720 × 1280       |      720 × 1280     |     15      |     1500     |
|     PRESET_1080P      |       1080 × 1920      |     1080 × 1920     |     15      |     3000     |

调用 [setVideoConfig](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoExpressEngine#set-video-config) 接口使用预设值时示例代码如下：

```objc
// 使用预设置进行视频设置
ZegoVideoConfig *config = [ZegoVideoConfig configWithPreset:ZegoVideoConfigPreet1080P];
[[ZegoExpressEngine sharedEngine] setVideoConfig:config];
```

### 2 修改视频视图模式

<Warning title="注意">


设置视频视图模式前，需要先停止预览或停止拉流，否则无法生效。
</Warning>

通过修改视图对象 [ZegoCanvas](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoCanvas) 的 “viewMode” 参数可以修改视频的视图模式。目前支持如下三种视频渲染填充模式：

|枚举值|说明|
|-|-|
|ZegoViewModeAspectFit|等比缩放，可能有黑边。|
|ZegoViewModeAspectFill|等比缩放填充整个 View，可能有部分被裁减。|
|ZegoViewModeScaleToFill|填充整个 View，图像可能被拉伸。|

三种视频渲染填充模式效果如图所示：

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/iOS/ZegoExpressEngine/CommonUsage/viewMode_ios.jpg" /></Frame>

- 上图中原视频分辨率为 300 × 300（宽 × 高），视图大小为 300 × 500（宽 × 高）。
- 上图中原视频尺寸高等于宽，视图尺寸高大于宽，故在 “ZegoViewModeAspectFit” 渲染模式下，视频上下出现黑边；若此时视图尺寸宽大于高，则在 “ZegoViewModeAspectFit” 渲染模式下，视频左右将会出现黑边。

以设置预览视图模式为 “ZegoViewModeAspectFit” 为例：

```objc
// remotePlayView 为 UI 界面上的 view 对象
ZegoCanvas *previewCanvas = [ZegoCanvas canvasWithView:self.remotePlayView];
// 将视图模式设置为 ZegoViewModeAspectFit
previewCanvas.viewMode = ZegoViewModeAspectFit;
// 开始预览
[[ZegoExpressEngine sharedEngine] startPreview:previewCanvas];
```

### 3 设置镜像模式

<Note title="说明">


该功能在推流前、后设置均可，设置后即时生效。
</Note>

你可以调用 [setVideoMirrorMode](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoExpressEngine#set-video-mirror-mode) 设置本地预览视频以及推送的视频是否开启镜像模式。目前支持如下四种镜像模式：

|枚举值|说明|
|-|-|
|ZegoVideoMirrorModeNoMirror|本地预览和拉流端看到的视频都不是镜像画面。|
|ZegoVideoMirrorModeOnlyPreviewMirror|只有本地预览时才是镜像画面，默认采用此模式。|
|ZegoVideoMirrorModeOnlyPublishMirror|只有拉流端看到的视频才是镜像画面。|
|ZegoVideoMirrorModeBothMirror|本地预览和拉流端看到的视频都是镜像画面。|

四种镜像模式的效果如下：

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/iOS/ZegoExpressEngine/CommonUsage/mirror_mode_ios.jpg" /></Frame>

以设置拉流端镜像显示，设置本地预览非镜像显示为例：

```objc
// 设置镜像模式为只有拉流端看到的视频才是镜像画面
[[ZegoExpressEngine sharedEngine] setVideoMirrorMode:ZegoVideoMirrorModeOnlyPublishMirror];
```


## 相关文档

- [如何选择视频分辨率、帧率、码率？](https://doc-zh.zego.im/faq/video_info)
- [怎么处理视频放大或黑边问题？](https://doc-zh.zego.im/faq/video_big)
- [怎么处理视频模糊问题？](https://doc-zh.zego.im/faq/video_blur)
