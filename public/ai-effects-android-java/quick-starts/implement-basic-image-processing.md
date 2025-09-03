# 实现图像处理

---

## 前提条件

在实现基本的 AI 功能之前，请确保：

- 已在项目中集成 SDK，详情请参考 [快速开始 - 集成 SDK](/ai-effects-android-java/quick-starts/import-the-sdk)。
- 已获取到 Effects SDK 唯一的鉴权文件，详情请参考 [快速开始 - 在线鉴权](/ai-effects-android-java/quick-starts/online-authentication)。
- 登录 [ZEGO 控制台](https://console.zego.im) 创建项目，获取接入 ZegoEffects SDK 服务所需的 AppID 和 AppSign，详情请参考 [控制台 - 项目信息](https://doc-zh.zego.im/article/12107)。


## 使用步骤

本节介绍如何使用 ZegoEffects SDK 实现基本的图像处理功能，API 调用时序如下图：

<Frame width="auto" height="auto">
  <img src="https://doc-media.zego.im/sdk-doc/Pics/AI_Vision/QuickStarts/Implemention_Android_zh.png" />
</Frame>

### 1. 创建 Effects 对象

<Steps>
<Step title="传入 AI 资源或模型。  ">
使用 Effects 的 AI 相关功能前，必须调用 [setResources](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~java_android~class~ZegoEffects#set-resources) 接口导入 AI 资源或模型，详情请参考 [快速开始 - 导入资源和模型](https://doc-zh.zego.im/article/10184)。

```java
// 传入人脸识别模型的绝对路径。人脸检测、大眼、瘦脸功能均须导入
ArrayList<String> aiModeInfos = new ArrayList<>();
aiModeInfos.add("sdcard/xxx/xxxxx/FaceDetectionModel.model");
aiModeInfos.add("sdcard/xxx/xxxxx/Segmentation.model");  

// 传入模型路径列表，必须在 create 之前调用
ZegoEffects.setResources(aiModeInfos);
```
</Step>
<Step title="部署高级配置项">

调用 [setAdvancedConfig](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~java_android~class~ZegoEffects#set-advanced-config) 接口，部署高级配置项，如配置设备性能等级，详情请参考 [配置设备性能等级](/ai-effects-android-java/quick-starts/configure-device-performance-levels)。

```java
ZegoEffectsAdvancedConfig config = new ZegoEffectsAdvancedConfig();
// 可配置设备性能等级
ZegoEffects.setAdvancedConfig(config);
```
</Step>
<Step title="创建 Effects 对象">
将 [前提条件](#前提条件) 中申请到的 AppID、AppSign 直接传入 [create](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~java_android~class~ZegoEffects#create-2) 接口，由 SDK 内部鉴权之后，创建 Effects 对象并返回相关 [错误码](/ai-effects-android-java/quick-starts/error-codes)。

```java
ZegoEffects mEffects = null;
long appid = *******;
String appSign = "*******";
mEffects = ZegoEffects.create(appid, appSign, applicationContex);
```
</Step>
</Steps>

### 2. 初始化 Effects 对象

<Steps>
<Step title="初始化 Effects 对象">
传入待处理的原始图像宽、高，调用 [initEnv](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~java_android~class~ZegoEffects#init-env) 接口初始化 Effects 对象。

```java
// 初始化 Effects 对象，传入当前待处理的原始图像宽高
mEffects.initEnv(1280, 720);
```
</Step>
<Step title="开启 AI 功能">
调用 [enableWhiten](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~java_android~class~ZegoEffects#enable-whiten)/[enableBigEyes](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~java_android~class~ZegoEffects#enable-big-eyes)/[setPortraitSegmentationBackgroundPath](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~java_android~class~ZegoEffects#set-portrait-segmentation-background-path)/[enablePortraitSegmentation](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~java_android~class~ZegoEffects#enable-portrait-segmentation) 接口开启各项 AI 功能。
```java
// 1. 开启美白功能
// 2. 开启大眼功能
// 3. 开启 AI 人像分割功能，并传入分割背景图的绝对路
mEffects.enableWhiten(true)
        .enableBigEyes(true)
        .setPortraitSegmentationBackgroundPath("MY_BACKGROUND_PATH", ZegoEffectsScaleMode.ASPECT_FILL);
        .enablePortraitSegmentation(true);
```
</Step>
</Steps>

### 3. 处理图像

SDK 支持 RGB、YUV、Texture 等多种格式来处理图像，开发者可以参考如下表格：

| 视频帧类型 | 视频数据帧格式 | 处理数据接口 |
|---|---|---|
|Buff 类型| <ul><li>BGRA32</li><li>RAGB32</li></ul>|[processImageBufferRGB](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~java_android~class~ZegoEffects#process-image-buffer-rgb)|
|Buff 类型| <ul><li>NV12</li><li>NV21</li><li>I420</li><li>YV12</li></ul>|[processImageBufferYUV](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~java_android~class~ZegoEffects#process-image-buffer-yuv) |
|Texture 类型| <ul><li>BGRA32 </li><li>RAGB32</li></ul> |[processTexture](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~java_android~class~ZegoEffects#process-texture) |


#### 处理 Texture2D 纹理图像

<Warning title="注意">
调用 [processTexture](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~java_android~class~ZegoEffects#process-texture) 接口时，传入的纹理 ID 可以是 Texture2D 类型：
- 1.4.11 及以后版本，支持相机直出的 OES 纹理。
- 1.4.11 以前版本，需要开发者自行转换成 Texture2D 类型的纹理后，再提供给 [processTexture](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~java_android~class~ZegoEffects#process-texture) 接口。
</Warning>

对于 Texture2D 类型纹理，可通过 [processTexture](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~java_android~class~ZegoEffects#process-texture) 接口进行图像处理，具体实现方式，请参考如下代码：

```java
ZegoEffectsVideoFrameParam zegoEffectsVideoFrameParam = new ZegoEffectsVideoFrameParam();
zegoEffectsVideoFrameParam.setFormat(ZegoEffectsVideoFrameFormat.RGBA32);
zegoEffectsVideoFrameParam.setWidth(width);
zegoEffectsVideoFrameParam.setHeight(height);
// 传入待处理的原始视频的 textureID，返回处理后的 textureID。
zegoTextureId = mEffects.processTexture(mTextureId, zegoEffectsVideoFrameParam);
```

#### 处理 TEXTURE_OES 纹理图像

<Warning title="注意">
1.4.11 及以后版本，使用 OES 纹理时，需要获取到 SurfaceTexture 的变换矩阵，并传入到 [ZegoEffectsVideoFrameParam](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~java_android~class~ZegoEffectsVideoFrameParam) 参数的 tranMatrix 中。
</Warning>

<Steps>
<Step title="获取 OES 纹理">
通过如下方式从相机获取到的 SurfaceTexture 的 OES 纹理。
```java
float[] tranMatrix = new float[16];
surfaceTexture.getTransformMatrix(tranMatrix);
```
</Step>
<Step title="确定 OES 纹理的宽和高">
大多数 Android 手机的 Camera 输出 OES 纹理是横屏的，其角度是 90 度或者 270 度。[processTexture](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~java_android~class~ZegoEffects#process-texture) 接口内部会将其做空间旋转变换处理，因此提供给 [processTexture](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~java_android~class~ZegoEffects#process-texture) 接口的宽高，可以通过以下代码进行适配调整：
```java
//获取摄像机旋转角度
Camera.CameraInfo info = new Camera.CameraInfo();
Camera.getCameraInfo(cameraId, info);
boolean textureNeedRotation = (info.orientation % 180 == 90);

//如果已经获取到 OES 纹理的宽和高
//processTextureWidth 与 processTextureHeight，为提供给 ZegoEffectsVideoFrameParam 参数的长宽
processTextureWidth = textureNeedRotation? height:width;
processTextureHeight = textureNeedRotation? width:height;
```
</Step>
<Step title="处理 OES 纹理">
在 1.4.11 及以后版本，通过 [processTexture](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~java_android~class~ZegoEffects#process-texture) 接口对 OES 类型纹理进行图像处理：
```java
ZegoEffectsVideoFrameParam zegoEffectsVideoFrameParam = new ZegoEffectsVideoFrameParam();
//对于 OES 纹理来说 SDK 内部使用的 ZegoEffectsVideoFrameFormat 可不设置，默认为 RGBA32
zegoEffectsVideoFrameParam.setFormat(ZegoEffectsVideoFrameFormat.RGBA32);
//指定纹理格式为 OES 类型
zegoEffectsVideoFrameParam.setTextureFormat(ZegoEffectsTextureFormat.TEXTURE_OES);
zegoEffectsVideoFrameParam.setWidth(processTextureWidth);
zegoEffectsVideoFrameParam.setHeight(processTextureHeight);
//传入 OES 纹理的变换矩阵
zegoEffectsVideoFrameParam.tranMatrix = tranMatrix;
// 传入待处理的原始视频的 textureID，返回处理后的 textureID。
zegoTextureId = mEffects.processTexture(mTextureId, zegoEffectsVideoFrameParam);
```
</Step>
</Steps>