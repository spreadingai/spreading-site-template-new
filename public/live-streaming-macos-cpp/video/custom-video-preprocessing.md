# 自定义视频前处理

- - -

## 功能简介

视频前处理是介于采集和编码之间的一个流程，开发者自行采集视频数据，获取到 SDK 采集的视频数据后，可以通过 SDK 自带的基础美颜和水印功能，进行视频前处理。如果 SDK 无法满足开发者需求（例如美颜效果无法达到预期），还可以搭配 ZEGO Effects SDK 对视频进行一些特殊处理，例如美颜、添加挂件等，该过程即为自定义视频前处理。

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Common/ZegoExpressEngine/video_pre_processing.png" /></Frame>

自定义视频前处理与自定义视频采集相比，优势在于无需开发者管理设备输入源，仅需对 ZEGO Express SDK 抛出来的原始数据进行操作，然后发回 ZEGO Express SDK 即可。

<Note title="说明">


对于比较复杂的场景，例如想通过摄像头画面做图层混合，建议开发者使用 [自定义视频采集](https://doc-zh.zego.im/article/14928) 功能实现，该方式性能优化的空间更大。
</Note>


## 示例源码下载

ZEGO 提供了一个通过 Effects SDK 实现美颜功能的示例源码，请参考 [实时音视频和 AI 美颜的搭配使用](/real-time-video-windows-cpp/best-practice/integration-with-zego-effects-sdk)。

## 前提条件

在进行自定义视频前处理前，请确保：

- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppID 和 AppSign，详情请参考 [控制台 - 项目信息](/console/project-info)。
- 已在项目中集成 ZEGO Express SDK，并实现了基本的音视频推拉流功能，详情请参考 [快速开始 - 集成](https://doc-zh.zego.im/article/14902) 和 [快速开始 - 实现流程](https://doc-zh.zego.im/article/14903)。


## 使用步骤

自定义视频前处理的流程与接口调用，如下所示：

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Common/ZegoExpressEngine/custom_video_process_win_new.png" /></Frame>

1. 初始化 Express SDK，登录房间。

2. 调用 [enableCustomVideoProcessing](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#enable-custom-video-processing) 接口，[开启自定义视频前处理](#1-开启自定义视频前处理) 功能。

3. [获取原始视频数据，进行视频前处理](#2-获取原始视频数据进行视频前处理)。

    1. 调用 [setCustomVideoProcessHandler](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#set-custom-video-process-handler) 接口，注册自定义视频前处理回调，并实现 [onCapturedUnprocessedRawData](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoCustomVideoProcessHandler#on-captured-unprocessed-raw-data) 等回调方法。
    2. 开始预览，推流。
    3. 通过 [onCapturedUnprocessedRawData](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoCustomVideoProcessHandler#on-captured-unprocessed-raw-data) 回调接口获取原始视频数据。开发者可以根据业务需要，进行相关处理：可以通过 Express SDK 自带的基础美颜、水印等功能处理；也可以与 Effects SDK 搭配实现更多处理效果。
    4. 视频数据处理完成后，在 [onCapturedUnprocessedRawData](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoCustomVideoProcessHandler#on-captured-unprocessed-raw-data) 回调中，调用 [sendCustomVideoProcessedRawData](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#send-custom-video-processed-raw-data) 接口，向 Express SDK 发送处理后的视频帧数据。

4. 其他客户端可以拉取处理后的视频流。
5. 结束后，停止预览、推流，退出房间，销毁引擎，释放资源。

### 1 开启自定义视频前处理

创建自定义视频前处理 [ZegoCustomVideoProcessConfig](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~struct~ZegoCustomVideoProcessConfig) 对象，设置 [bufferType](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~struct~ZegoCustomVideoCaptureConfig#buffer-type) 属性，用于提供视频帧数据类型。

目前 Windows SDK 支持如下 1 种 [bufferType ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~enum~ZegoVideoBufferType) 数据类型，设置其他枚举值将无法正常使用：

| Buffer 类型 |枚举值|说明 |
|-----|------|------|
| RAWDATA | ZEGO_VIDEO_BUFFER_TYPE_RAW_DATA|表示 RAWDATA 类型的原始视频数据。|

在开始预览和开始推流前，调用 [enableCustomVideoProcessing](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#enable-custom-video-processing) 接口，开启自定义视频前处理功能。

```cpp
ZegoCustomVideoProcessConfig config;
// 选择 RAWDATA 类型视频帧数据
config.bufferType = ZEGO_VIDEO_BUFFER_TYPE_RAW_DATA;

engine->enableCustomVideoProcessing(true,&config);
```

### 2 获取原始视频数据，进行视频前处理

**注册自定义视频前处理回调**

1. 将 “CustomVideoProcessHandler” 作为自定义视频前处理回调对象，遵循 [IZegoCustomVideoProcessHandler ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoCustomVideoProcessHandler) 协议。

    ```cpp
    class CustomVideoProcessHandler : public IZegoCustomVideoProcessHandler
    {

        ......

    };
    ```

2. 调用 [setCustomVideoProcessHandler ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#set-custom-video-process-handler) 接口，设置自定义视频采集回调。

    ```cpp
    engine->setCustomVideoProcessHandler(customVideoProcessHandler);
    ```

**获取原始视频，进行前处理**

1. 使用 “ZEGO_VIDEO_BUFFER_TYPE_RAW_DATA” 类型的视频前处理方式，需要实现 [onCapturedUnprocessedRawData](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoCustomVideoProcessHandler#on-captured-unprocessed-raw-data) 回调方法。当 SDK 获取到原始视频数据后，会通过 [onCapturedUnprocessedRawData](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoCustomVideoProcessHandler#on-captured-unprocessed-raw-data) 方法通知开发者。

2. 然后，开发者可以使用 Express SDK 自带的基础美颜、水印等功能处理视频数据，详情请参考 [推流视频增强](https://doc-zh.zego.im/article/18883)；也可以与 Effects SDK 搭配实现更多处理效果，详情请参考 [实时音视频和 AI 美颜的搭配使用](/real-time-video-windows-cpp/best-practice/integration-with-zego-effects-sdk)。

3. 处理完成后，调用 [sendCustomVideoProcessedRawData](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#send-custom-video-processed-raw-data) 接口，将处理后的视频帧数据发送给 Express SDK，推流出去，其他客户端可以拉取到处理后的视频流。

```cpp
void onCapturedUnprocessedRawData(const unsigned char** data, unsigned int* dataLength, ZegoVideoFrameParam param, unsigned long long referenceTimeMillisecond, ZegoPublishChannel channel) {
    int width  = param.width;
    int height = param.height;
    int stride = param.strides[0];
    QImage image(const_cast<unsigned char*>(data[0]),width,height,stride,QImage::Format_ARGB32);
    zego_effects_video_frame_param frameParam;
    frameParam.format = zego_effects_video_frame_format_bgra32;
    frameParam.width  = image.width();
    frameParam.height = image.height();
    // 自定义前处理：此处使用 ZegoEffects SDK 进行视频处理
    zego_effects_process_image_buffer_rgb(m_handle,image.bits(), image.bytesPerLine() * image.height(),frameParam);
    // 将处理后的 buffer 发回 ZegoExpress-Video SDK 里
    engine->sendCustomVideoProcessedRawData((const unsigned char**)data,dataLength,param,referenceTimeMillisecond);
}
```

<Content />

