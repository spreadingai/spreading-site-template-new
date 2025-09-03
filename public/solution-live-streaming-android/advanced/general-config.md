# 通用直播配置

- - -

## 简介

在视频通话或直播时，开发者可以根据需要指定推流和拉流视频相关配置，如视频采集分辨率、视频编码输出分辨率、视频帧率、码率、视图模式和镜像模式。

- 分辨率：
    - 视频分辨率：用于度量图像内数据量多少的一个参数，通常表示成 ppi。
    - 采集分辨率：指摄像头等采集设备提供的画面分辨率。
    - 编码分辨率：指经过编码处理的画面的分辨率。
- 码率：指每秒传输的比特（bit）数，单位为 bps（bit per second）。
- 帧率：单位时间内视频显示帧数的量度单位，测量单位为“每秒显示帧数”（Frame Per Second，fps）。

设置合适的视频分辨率、帧率和码率可以在音视频场景中提供用户更好的使用体验。选择合适镜像模式与视图模式则可以让开发者提供个性化的视频显示模式。


## 前提条件

在实现通用直播配置之前，请确保：

- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppID 和 AppSign，详情请参考 [控制台 - 项目信息](/console/project-info)。
- 已在项目中集成 ZEGO Express SDK，并实现了基本的音视频推拉流功能，详情请参考 [快速开始 - 集成](https://doc-zh.zego.im/) 和 [快速开始 - 实现流程](https://doc-zh.zego.im/)。


## 设置视频配置

### 使用默认值

您可以使用 ZEGO Express SDK 提供的预设组合值进行修改视频配置，ZegoVideoConfigPreset 的预设组合值如下：

| ZegoVideoConfigPreset | 采集分辨率<br/>（宽 × 高） | 编码分辨率<br/>（宽 × 高） | 帧率（fps） | 码率（kbps） |
| ------------------- | ------------------ | --------------- | --------- | ---------- |
|      PRESET_180P      |       180 × 320        |      180 × 320      |     15      |     300      |
|      PRESET_270P      |       270 × 480        |      270 × 480      |     15      |     400      |
|      PRESET_360P      |       360 × 640        |      360 × 640      |     15      |     600      |
|      PRESET_540P      |       540 × 960        |      540 × 960      |     15      |     1200     |
|      PRESET_720P      |       720 × 1280       |      720 × 1280     |     15      |     1500     |
|     PRESET_1080P      |       1080 × 1920      |     1080 × 1920     |     15      |     3000     |  

使用默认值的示例代码如下：

```java
ZegoVideoConfig videoConfig = new ZegoVideoConfig(ZegoVideoConfigPreset.PRESET_1080P);
ZegoExpressEngine.getEngine().setVideoConfig(videoConfig);
```

### 自定义视频配置

  调用 [setVideoConfig](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~ZegoMixerTask#set-video-config) 接口修改推流视频配置，可通过该接口设置视频帧率、码率、视频采集分辨率和视频编码输出分辨率。若不进行特殊设置，则 SDK 会根据选定的场景，自动应用适合该场景的分辨率、码率、帧率，以获取最佳体验效果，详情请参考 [场景音视频配置](https://doc-zh.zego.im/article/20758)。

  <Note title="说明">


  如果拉流端需要拉取 60 帧的流，需要联系技术支持，详情可参考 FAQ [ZEGO Express SDK 是否支持拉 60 帧的流](https://doc-zh.zego.im/faq/Pull_the_stream_of_60_frames)。
</Note>

  以设置视频采集分辨率为 360p ，编码分辨率为 360p ，码率为 600 kbps，帧率为 15 fps 为例：


```java

ZegoVideoConfig videoConfig = new ZegoVideoConfig();

videoConfig.captureHeight = 640;
videoConfig.captureWidth = 360;
videoConfig.encodeHeight = 640;
videoConfig.encodeWidth = 360;
videoConfig.fps = 15
videoConfig.bitrate = 600;

// 设置视频配置
ZegoExpressEngine.getEngine().setVideoConfig(videoConfig);
```

<Note title="说明">


移动端的宽高分辨率与 PC 端的宽高分辨率是相反的，例如移动端 360p 的分辨率为 360 × 640，而 PC 端 360p 的分辨率为 640 × 360。
</Note>


## 设置视频视图模式

<Warning title="注意">


设置视频视图模式前，需先停止预览或停止拉流，否则无法生效。
</Warning>

通过修改视图对象 [ZegoCanvas](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~ZegoCanvas) 的 “viewMode” 参数可以修改视频的视图模式。目前支持三种视频渲染填充模式：

|枚举值|描述|
|-|-|
|ASPECT_FIT|等比缩放，图像可能有黑边。|
|ASPECT_FILL|等比缩放并填充整个视图，图像可能被裁剪。|
|SCALE_TO_FILL|填充整个视图，图像可能被拉伸。|

三种视频渲染和填充模式的效果如下所示：

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Android/CommonFeatures/CommonVideoConfig/viewMode_android.jpg" /></Frame>


<Note title="说明">

- 上图中展示的原视频分辨率为 300 × 300（宽 × 高），视图大小为 300 × 500（宽 × 高）。
- 上图中原视频尺寸高等于宽，视图尺寸高大于宽，故在 “ASPECT_FIT” 渲染模式下，视频上下出现黑边；若此时视图尺寸宽大于高，则在 “ASPECT_FIT” 渲染模式下，视频左右将会出现黑边。
</Note>

以设置预览视图模式为 “ASPECT_FIT” 并开始预览为例：

```java
// preview 为 UI 界面上的 “SurfaceView/TextureView/SurfaceTexture” 对象
previewCanvas = new ZegoCanvas(preview);
// 将视图模式设置为 ASPECT_FIT
previewCanvas.viewMode = ZegoViewMode.ASPECT_FIT;
// 开始预览
engine.startPreview(previewCanvas);
```

## 设置镜像模式

<Note title="说明">


该功能在推流前、后设置均可，设置后即时生效。
</Note>

你可以调用 [setVideoMirrorMode](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~ZegoExpressEngine#set-video-mirror-mode) 设置本地预览视频以及推送的视频是否开启镜像模式。目前支持如下四种镜像模式：

|枚举值|说明|
|-|-|
|NO_MIRROR|本地预览和拉流端看到的视频都不是镜像画面。|
|ONLY_PREVIEW_MIRROR|只有本地预览时才是镜像画面，默认采用此模式。|
|ONLY_PUBLISH_MIRROR|只有拉流端看到的视频才是镜像画面。|
|BOTH_MIRROR|本地预览和拉流端看到的视频都是镜像画面。|

四种镜像模式的效果如下：

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Android/CommonFeatures/CommonVideoConfig/mirror_mode_android.png" /></Frame>

以设置拉流端镜像显示，设置本地预览非镜像显示为例：

```java
// 设置镜像模式为只有拉流端看到的视频才是镜像画面
engine.setVideoMirrorMode(ZegoVideoMirrorMode.ONLY_PUBLISH_MIRROR);
```

## 设置视频方向模式

Express Video SDK 默认使用锁定的竖屏模式，即本地视频预览和播放的视频图像为竖屏方向。

如需将视频设置为横屏模式，请调用 [setAppOrientation](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Java~class~im-zego-zegoexpress-zego-express-engine#set-app-orientation) 方法。
- 如需将视频逆时针旋转 90 度，将参数设置为 `ZegoOrientation.ORIENTATION_90`。
- 如需将视频顺时针旋转 90 度，将参数设置为 `ZegoOrientation.ORIENTATION_270`。

```java
ZegoExpressEngine.getEngine().setAppOrientation(ZegoOrientation.ORIENTATION_90);
```

如需在直播或视频通话中，使用 G-Sensor（重力传感器）模式，您需要监听相关的视频图像旋转事件回调，并设置相应的视频方向。

- 如果您通过使用 SDK 进行视频数据捕获，来实现 G-Sensor 模式，您需要使用以下 2 个方法：
    - [setVideoConfig](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Java~class~im-zego-zegoexpress-zego-express-engine#set-video-config)：用于更新手机屏幕方向的回调。
    - [setAppOrientation](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Java~class~im-zego-zegoexpress-zego-express-engine#set-app-orientation)：用于设置视频图像方向的方法。

    通过监听相应 Activity 中的 `onConfigurationChanged` 事件回调，来监视手机屏幕方向的变化。在回调中修改相应的编码分辨率，并设置视频图像方向。

    ```java
    @Override
    public void onConfigurationChanged(Configuration newConfig) {
        super.onConfigurationChanged(newConfig);
    
        // 检查屏幕的方向
    
        ZegoVideoConfig videoConfig = ZegoExpressEngine.getEngine().getVideoConfig();
        ZegoOrientation orientation = ZegoOrientation.ORIENTATION_0;
    
        if(Surface.ROTATION_0 ==  this.getWindowManager().getDefaultDisplay().getRotation()){
            orientation = ZegoOrientation.ORIENTATION_0;
            videoConfig.setEncodeResolution(360, 640);
        }else if(Surface.ROTATION_180 ==  this.getWindowManager().getDefaultDisplay().getRotation()){
            orientation = ZegoOrientation.ORIENTATION_180;
            videoConfig.setEncodeResolution(360, 640);
        }else if(Surface.ROTATION_270 ==  this.getWindowManager().getDefaultDisplay().getRotation()){
            orientation = ZegoOrientation.ORIENTATION_270;
            videoConfig.setEncodeResolution(640, 360);
        }else if(Surface.ROTATION_90 ==  this.getWindowManager().getDefaultDisplay().getRotation()){
            orientation = ZegoOrientation.ORIENTATION_90;
            videoConfig.setEncodeResolution(640, 360);
        }
    
        ZegoExpressEngine.getEngine().setAppOrientation(orientation);
        ZegoExpressEngine.getEngine().setVideoConfig(videoConfig);
    }
   ```

- 如果您使用 [自定义视频采集](https://doc-zh.zego.im/article/3677) 进行视频数据捕获，在设备屏幕方向更改后，实现 G-Sensor 模式，请参考以下两种方法：
  - **方式 1**：自己处理视频帧数据。     
    在设备屏幕方向更新的回调中，旋转获取的视频帧数据，然后使用 [sendCustomVideoCaptureTextureData](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~ZegoExpressEngine#send-custom-video-capture-texture-data) 方法，将处理后的帧数据发送给 SDK。
  - **方式 2**：使用 SDK 处理视频帧数据。
    1. 在设备屏幕方向更新的回调中，根据实际设备屏幕方向设置 [ZegoVideoEncodedFrameParam](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~ZegoVideoEncodedFrameParam#rotation) 方法的 `rotation` 属性。
    2. 使用 [sendCustomVideoCaptureEncodedData](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~ZegoExpressEngine#send-custom-video-capture-encoded-data) 方法传递视频帧数据，并设置视频图像方向参数，将处理后的视频数据发送给 SDK。

## 常见问题解答

**为什么无法播放录制的视频？**
 
   因为在 G-Sensor 模式下，流的编码分辨率会发生变化，一些第三方播放器，可能无法很好地兼容已经修改分辨率的视频，导致您可能无法播放录制的视频。  
   因此，我们建议您在直播或视频通话中，不要在 G-Sensor 模式下修改分辨率。
