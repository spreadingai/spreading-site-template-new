# 设置视频属性

- - -

## 功能简介

当视频通话或直播时，开发者可以根据需要设置视频属性，调整视频画面的清晰度、流畅度以及镜像，从而获得较好的用户体验。

## 使用步骤

### 设置视频属性

推流前调用 [setVideoConfig](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~CPP_linux~class~zego-express-i-zego-express-engine#set-video-config) 接口设置视频分辨率、帧率和码率，可以使用 ZEGO Express SDK 提供的预设组合值，也可以自行设置 ZegoVideoConfig 对应字段。

ZegoVideoConfigPreset 的预设组合值如下：

| ZegoVideoConfigPreset | 采集分辨率<br/>（宽 × 高） | 编码分辨率<br/>（宽 × 高） | 帧率（fps） | 码率（kbps） |
| ------------------- | ------------------ | ---------------| --------- | ---------- |
|      PRESET_180P      |       320 × 180        |      320 × 180      |     15      |     300      |
|      PRESET_270P      |       480 × 270        |      480 × 270      |     15      |     400      |
|      PRESET_360P      |       640 × 360        |      640 × 360      |     15      |     600      |
|      PRESET_540P      |       960 × 540        |      960 × 540      |     15      |     1200     |
|      PRESET_720P      |       1280 × 720       |     1280 × 720      |     15      |     1500     |
|     PRESET_1080P      |      1920 × 1080       |     1920 × 1080     |     15      |     3000     |

使用预设值时示例代码如下：

```cpp
ZegoExpressSDK::getEngine()->setVideoConfig(ZegoVideoConfig(ZEGO_VIDEO_CONFIG_PRESET_1080P));
```

自行设置时示例代码如下：

```cpp
ZegoVideoConfig videoConfig;
videoConfig.captureHeight = 360;
videoConfig.captureWidth = 640;
videoConfig.encodeHeight = 360;
videoConfig.encodeWidth = 640;
videoConfig.fps = 15;
videoConfig.bitrate = 600;
ZegoExpressSDK::getEngine()->setVideoConfig(videoConfig);
```

<Warning title="注意">


为了避免渲染的图像出现裁剪或拉伸效果，建议采集分辨率和编码分辨率的宽高比保持一致。  

</Warning>




### 设置视频镜像

推流前调用 [setVideoMirrorMode](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~CPP_linux~class~zego-express-i-zego-express-engine#set-video-mirror-mode) 接口设置本地预览视频和推送的视频是否开启镜像模式。若开启则渲染出来的画面，物体运动时方向和照镜子时一致，若关闭镜像则相反。

ZegoVideoMirrorMode 的预设组合值如下：

| ZegoVideoMirrorMode | 预览画面 | 推流画面（对方拉流画面） |
| ----------------- | ------ | ---------------------- |
| ONLY_PREVIEW_MIRROR |   镜像   |          非镜像          |
| BOTH_MIRROR     |   镜像   |           镜像           |
| NO_MIRROR      |  非镜像  |          非镜像          |
| ONLY_PUBLISH_MIRROR |  非镜像  |           镜像           |

使用预设值时示例代码如下：

```cpp
ZegoExpressSDK::getEngine()->setVideoMirrorMode(ZEGO_VIDEO_MIRROR_MODE_BOTH_MIRROR);
```
