# 自定义视频前处理

- - -

## 功能简介

视频前处理是介于采集和编码之间的一个流程，开发者自行采集视频数据，获取到 SDK 采集的视频数据后，可以通过 SDK 自带的基础美颜和水印功能，进行视频前处理。如果 SDK 无法满足开发者需求（例如美颜效果无法达到预期），还可以搭配 ZEGO Effects SDK 对视频进行一些特殊处理，例如美颜、添加挂件等，该过程即为自定义视频前处理。

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Common/ZegoExpressEngine/video_pre_processing.png" /></Frame>

自定义视频前处理与自定义视频采集相比，优势在于无需开发者管理设备输入源，仅需对 ZEGO Express SDK 抛出来的原始数据进行操作，然后发回 ZEGO Express SDK 即可。

<Note title="说明">


对于比较复杂的场景，例如想通过摄像头画面做图层混合，建议开发者使用 [自定义视频采集](https://doc-zh.zego.im/article/3676) 功能实现，该方式性能优化的空间更大。
</Note>

## 示例源码下载

ZEGO 提供了一个通过 Effects SDK 实现美颜功能的示例源码，请参考 [实时音视频和 AI 美颜的搭配使用](/real-time-video-ios-oc/best-practice/integration-with-zego-effects-sdk)。

## 前提条件

在进行自定义视频前处理前，请确保：

- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppID 和 AppSign，详情请参考 [控制台 - 项目信息](/console/project-info)。
- 已在项目中集成 ZEGO Express SDK，并实现了基本的音视频推拉流功能，详情请参考 [快速开始 - 集成](https://doc-zh.zego.im/article/196) 和 [快速开始 - 实现流程](https://doc-zh.zego.im/article/7628)。


## 使用步骤

自定义视频前处理的流程与接口调用，如下所示：

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Common/ZegoExpressEngine/custom_video_process_ios_new.png" /></Frame>

1. 初始化 Express SDK，并登录房间。
2. 调用 [enableCustomVideoProcessing](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoExpressEngine#enable-custom-video-processing-config) 接口，[开启自定义视频前处理](#1-开启自定义视频前处理) 功能。
5. [获取原始视频数据，进行视频前处理](#2-获取原始视频数据进行视频前处理)。
    1. 调用 [setCustomVideoProcessHandler](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoExpressEngine#set-custom-video-process-handler) 接口，注册自定义视频前处理回调，并实现 [onCapturedUnprocessedCVPixelBuffer](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~protocol~ZegoCustomVideoProcessHandler#on-captured-unprocessed-cv-pixel-buffer-timestamp-channel) 等回调方法。
    2. 开始预览，推流。
    3. 通过 [onStart](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~protocol~ZegoCustomVideoProcessHandler#on-start) 回调，通知自定义视频前处理开始，开发者如果使用第三方美颜库或者预先申请内存，可以在此时初始化工具和分配内存。
    4. 通过 [onCapturedUnprocessedCVPixelBuffer](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~protocol~ZegoCustomVideoProcessHandler#on-captured-unprocessed-cv-pixel-buffer-timestamp-channel) 回调接口获取原始视频数据。开发者可以根据业务需要，进行相关处理：可以通过 Express SDK 自带的基础美颜、水印等功能处理；也可以与 Effects SDK 搭配实现更多处理效果。
    5. 视频数据处理完成后，在 [onCapturedUnprocessedCVPixelBuffer](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~protocol~ZegoCustomVideoProcessHandler#on-captured-unprocessed-cv-pixel-buffer-timestamp-channel) 回调中，调用 [sendCustomVideoProcessedCVPixelBuffer](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoExpressEngine#send-custom-video-processed-cv-pixel-buffer-timestamp) 接口，向 Express SDK 发送处理后的视频帧数据。
4. 其他客户端可以拉取处理后的视频流。
5. 停止预览及推流。
6. 通过 [onStop](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~protocol~ZegoCustomVideoProcessHandler#on-stop) 回调，通知自定义视频前处理结束，开发者如果使用第三方美颜库或者预先申请内存，可以在此时反初始化工具并释放内存。
7. 退出房间，销毁引擎，释放资源。


### 1 开启自定义视频前处理

创建自定义视频前处理 [ZegoCustomVideoProcessConfig](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoCustomVideoProcessConfig) 对象，设置 [bufferType](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoCustomVideoProcessConfig#buffer-type) 属性，用于提供视频帧数据类型。

目前 iOS SDK 支持如下 2 种 [bufferType ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~enum~ZegoVideoBufferType) 数据类型，设置其他枚举值将无法正常使用：

| Buffer 类型 | 枚举值|说明 |
|-----|------|-----|
| CVPixelBuffer | ZegoVideoBufferTypeCVPixelBuffer |表示 CVPixelBufferRef 类型的原始视频数据，格式为 BGRA32。|
| NV12CVPixelBuffer | ZegoVideoBufferTypeNV12CVPixelBuffer |表示 CVPixelBufferRef 类型的原始视频数据，格式为 NV12。|

在开始预览和开始推流前，调用 [enableCustomVideoProcessing](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~ObjectiveC_ios~class~zego-express-engine#enable-custom-video-processing-config) 接口，开启自定义视频前处理功能。

下文以 “ZegoVideoBufferTypeCVPixelBuffer” 为例演示自定义视频前处理的用法。

```objc
ZegoCustomVideoProcessConfig *processConfig = [[ZegoCustomVideoProcessConfig alloc] init];
// 选择 CVPixelBuffer 类型视频帧数据
processConfig.bufferType = ZegoVideoBufferTypeCVPixelBuffer;

[[ZegoExpressEngine sharedEngine] enableCustomVideoProcessing:YES config:processConfig channel:ZegoPublishChannelMain];
```

### 2 获取原始视频数据，进行视频前处理

#### 注册自定义视频前处理回调

1. 将 “ViewController” 作为自定义视频前处理回调对象，遵循 [ZegoCustomVideoProcessHandler ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~ObjectiveC_ios~protocol~zego-custom-video-process-handler) 协议。

    ```objc
    @interface ViewController () <ZegoEventHandler, ZegoCustomVideoProcessHandler>

        ......

    @end
    ```

2. 调用 [setCustomVideoProcessHandler ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~ObjectiveC_ios~class~zego-express-engine#set-custom-video-process-handler) 接口，设置自定义视频采集回调。

    ```objc
    // 将自身作为自定义视频前处理回调对象
    [[ZegoExpressEngine sharedEngine] setCustomVideoProcessHandler:self];
    ```

#### 获取原始视频，进行前处理

1. 使用 “ZegoVideoBufferTypeCVPixelBuffer” 类型的视频前处理方式，需要实现 [onCapturedUnprocessedCVPixelBuffer](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~protocol~ZegoCustomVideoProcessHandler#on-captured-unprocessed-cv-pixel-buffer-timestamp-channel) 回调方法。当 SDK 获取到原始视频数据后，会通过 [onCapturedUnprocessedCVPixelBuffer](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~protocol~ZegoCustomVideoProcessHandler#on-captured-unprocessed-cv-pixel-buffer-timestamp-channel) 方法通知开发者。

2. 开发者可以使用 Express SDK 自带的基础美颜、水印等功能处理视频数据，详情请参考 [推流视频增强](https://doc-zh.zego.im/article/18875)；也可以与 Effects SDK 搭配实现更多处理效果，详情请参考 [实时音视频和 AI 美颜的搭配使用](/real-time-video-ios-oc/best-practice/integration-with-zego-effects-sdk)。
    <Warning title="注意">


    开发者如果使用第三方美颜库或者预先申请内存，请在：
    - 自定义视频前处理开始时（[onStart](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~protocol~ZegoCustomVideoProcessHandler#on-start)），初始化工具和分配内存。
    - 自定义视频前处理结束时（[onStop](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~protocol~ZegoCustomVideoProcessHandler#on-stop)），反初始化工具并释放内存。
    </Warning>



3. 处理完成后，调用 [sendCustomVideoProcessedCVPixelBuffer](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoExpressEngine#send-custom-video-processed-cv-pixel-buffer-timestamp) 接口，将处理后的视频帧数据发送给 Express SDK，推流出去，其他客户端可以拉取到处理后的视频流。

```objc
- (void)onCapturedUnprocessedCVPixelBuffer:(CVPixelBufferRef)buffer timestamp:(CMTime)timestamp channel:(ZegoPublishChannel)channel {
    // 自定义前处理：此处使用 Effects SDK 进行视频处理
    [self.effects processImageBuffer:buffer];

    // 将处理后的 buffer 发回 Express SDK 里
    [[ZegoExpressEngine sharedEngine] sendCustomVideoProcessedCVPixelBuffer:buffer timestamp:timestamp channel:channel];
}
```
