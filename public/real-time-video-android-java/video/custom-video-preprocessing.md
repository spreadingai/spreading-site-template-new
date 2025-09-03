# 自定义视频前处理

- - -

## 功能简介

视频前处理是介于采集和编码之间的一个流程，开发者自行采集视频数据，获取到 SDK 采集的视频数据后，可以通过 SDK 自带的基础美颜和水印功能，进行视频前处理。如果 SDK 无法满足开发者需求（例如美颜效果无法达到预期），还可以搭配 ZEGO Effects SDK 对视频进行一些特殊处理，例如美颜、添加挂件等，该过程即为自定义视频前处理。

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Common/ZegoExpressEngine/video_pre_processing.png" /></Frame>

自定义视频前处理与自定义视频采集相比，优势在于无需开发者管理设备输入源，仅需对 ZEGO Express SDK 抛出来的原始数据进行操作，然后发回 ZEGO Express SDK 即可。

<Note title="说明">
对于比较复杂的场景，例如想通过摄像头画面做图层混合，建议开发者使用 [自定义视频采集](https://doc-zh.zego.im/article/3677) 功能实现，该方式性能优化的空间更大。
</Note>

## 示例源码下载

ZEGO 提供了一个通过 Effects SDK 实现美颜功能的示例源码，请参考 [实时音视频和 AI 美颜的搭配使用](/real-time-video-android-java/best-practice/integration-with-zego-effects-sdk)。


## 前提条件

在进行自定义视频前处理前，请确保：

- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppID 和 AppSign，详情请参考 [控制台 - 项目信息](/console/project-info)。
- 已在项目中集成 ZEGO Express SDK，并实现了基本的音视频推拉流功能，详情请参考 [快速开始 - 集成](https://doc-zh.zego.im/article/195) 和 [快速开始 - 实现流程](https://doc-zh.zego.im/article/7627)。


## 使用步骤

自定义视频前处理的流程与接口调用，如下所示：

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Express/custom_video_process_Android_2025.png" /></Frame>

<Steps>
<Step>
初始化 Express SDK，登录房间。
</Step>
<Step>
调用 [enableCustomVideoProcessing](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~ZegoExpressEngine#enable-custom-video-processing) 接口，[开启自定义视频前处理](#1-开启自定义视频前处理) 功能。
</Step>
<Step>
[获取原始视频数据，进行视频前处理](#2-获取原始视频数据进行视频前处理)。
<Steps>
<Step >
调用 [setCustomVideoProcessHandler](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~ZegoExpressEngine#set-custom-video-process-handler) 接口，注册自定义视频前处理回调，并实现 [onCapturedUnprocessedTextureData](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~IZegoCustomVideoProcessHandler#on-captured-unprocessed-texture-data) 等回调方法。
</Step>
<Step >
开始预览，推流。
</Step>
<Step>
通过 [onStart](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~IZegoCustomVideoProcessHandler#on-start) 回调，通知自定义视频前处理开始，开发者如果使用第三方美颜库或者预先申请内存，可以在此时初始化工具和分配内存。
</Step>
<Step>
通过 [onCapturedUnprocessedTextureData](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~IZegoCustomVideoProcessHandler#on-captured-unprocessed-texture-data) 回调接口获取原始视频数据。开发者可以根据业务需要，进行相关处理：可以通过 Express SDK 自带的基础美颜、水印等功能处理；也可以与 Effects SDK 搭配实现更多处理效果。
</Step>
<Step>
视频数据处理完成后，在 [onCapturedUnprocessedTextureData](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~IZegoCustomVideoProcessHandler#on-captured-unprocessed-texture-data) 回调中，调用 [sendCustomVideoProcessedTextureData](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~ZegoExpressEngine#send-custom-video-processed-texture-data) 接口，向 Express SDK 发送处理后的视频帧数据。
</Step>
</Steps>
</Step>
<Step>
其他客户端可以拉取处理后的视频流。
</Step>
<Step>
停止预览及推流。
</Step>
<Step>
退出房间。
</Step>
<Step>
通过 [onStop](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~IZegoCustomVideoProcessHandler#on-stop) 回调，通知自定义视频前处理结束，开发者如果使用第三方美颜库或者预先申请内存，可以在此时反初始化工具并释放内存。
</Step>
<Step>
销毁引擎，释放资源。
</Step>
</Steps>
### 1 开启自定义视频前处理

创建自定义视频前处理 [ZegoCustomVideoProcessConfig](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~ZegoCustomVideoProcessConfig) 对象，设置 [bufferType ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Java_android~class~im-zego-zegoexpress-entity-zego-custom-video-process-config#buffer-type) 属性，用于向 Express SDK 提供视频帧数据类型。

目前 Android SDK 支持如下 3 种 [bufferType ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Java_android~class~im-zego-zegoexpress-entity-zego-custom-video-process-config#buffer-type) 数据类型，设置其他枚举值将无法正常使用：

| Buffer 类型 | 枚举值 |说明 |
|-----|------|------|
| GLTexture2D | ZegoVideoBufferType.GL_TEXTURE_2D  |表示 Texture 纹理类型的原始视频数据。|
| SurfaceTexture | ZegoVideoBufferType.SURFACE_TEXTURE |表示 SurfaceTexture 类型的原始视频数据。|
| GLTexture2DAndRawData | ZegoVideoBufferType.GL_TEXTURE_2D_AND_RAW_DATA |表示 OpenGL Texture 2D 类型视频帧和裸数据类型视频帧。|

在开始预览和开始推流前，调用 [enableCustomVideoProcessing ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Java_android~class~im-zego-zegoexpress-zego-express-engine#enable-custom-video-processing) 接口，开启自定义视频前处理功能。

下文以 “ZegoVideoBufferType.GL_TEXTURE_2D” 为例演示自定义视频前处理的用法。

```java
ZegoCustomVideoProcessConfig config = new ZegoCustomVideoProcessConfig();
// 选择 GL_TEXTURE_2D 类型视频帧数据
config.bufferType = ZegoVideoBufferType.GL_TEXTURE_2D;

// 开启自定义前处理
express.enableCustomVideoProcessing(true, config, ZegoPublishChannel.MAIN);
```

### 2 获取原始视频数据，进行视频前处理

1. 调用 [setCustomVideoProcessHandler](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~ZegoExpressEngine#set-custom-video-process-handler) 接口，注册自定义视频前处理回调，并实现 [onCapturedUnprocessedTextureData](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~IZegoCustomVideoProcessHandler#on-captured-unprocessed-texture-data) 等回调方法。

2. 当 SDK 获取到原始视频数据后，会通过 [onCapturedUnprocessedTextureData](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~IZegoCustomVideoProcessHandler#on-captured-unprocessed-texture-data) 方法通知开发者。

3. 开发者可以使用 Express SDK 自带的基础美颜、水印等功能处理视频数据，详情请参考 [推流视频增强](https://doc-zh.zego.im/article/18876)；也可以与 Effects SDK 搭配实现更多处理效果，详情请参考 [实时音视频和 AI 美颜的搭配使用](/real-time-video-android-java/best-practice/integration-with-zego-effects-sdk)。
    <Warning title="注意">


    开发者如果使用第三方美颜库或者预先申请内存，请在：
    - 自定义视频前处理开始时（[onStart](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~IZegoCustomVideoProcessHandler#on-start)），初始化工具和分配内存。
    - 自定义视频前处理结束时（[onStop](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~IZegoCustomVideoProcessHandler#on-stop)），反初始化工具并释放内存。
    </Warning>


4. 处理完成后，调用 [sendCustomVideoProcessedTextureData](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~ZegoExpressEngine#send-custom-video-processed-texture-data) 接口，将处理后的视频帧数据发送给 Express SDK，推流出去，其他客户端可以拉取到处理后的视频流。

```java
// 回调方法获取原始数据
// 回调处理
express.setCustomVideoProcessHandler(new IZegoCustomVideoProcessHandler() {
    ...

    // 从 ZegoExpressEngine 引擎接收 Texture
    @Override
    public void onCapturedUnprocessedTextureData(int textureID, int width, int height, long referenceTimeMillisecond, ZegoPublishChannel channel) {


        ZegoEffectsVideoFrameParam param = new ZegoEffectsVideoFrameParam();
        param.format = ZegoEffectsVideoFrameFormat.BGRA32;
        param.width = width;
        param.height = height;

        // 自定义前处理：此处使用 Effects SDK 进行视频处理
        int processedTextureID = effects.processTexture(textureID, param);

        // 将处理后的 buffer 发回 Express SDK 里
        express.sendCustomVideoProcessedTextureData(processedTextureID, width, height, referenceTimeMillisecond);
    }
}
```
