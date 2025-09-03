# 和 AI 美颜的搭配使用

---

## 使用导读

### 简介

实时音视频是 ZEGO 的一款实时音视频互动服务产品，开发者可通过其灵活易用的 API，构建音视频应用。同时，ZEGO 的另一款产品——AI 美颜，基于领先的 AI 算法，提供美颜、美体、美妆、贴纸等功能。将二者进行搭配使用，能够轻松实现音视频互动和美颜的结合，打造实时美颜应用。

两者搭配使用，可广泛应用于娱乐直播、游戏直播、视频会议等直播场景中。

<video poster="https://doc-media.zego.im/sdk-doc/Pics/ZegoEffects/AI_cover.png" src="https://doc-media.zego.im/sdk-doc/doc/video/AI/AI.mp4" width="65%" muted="true" loop="true" autoplay="autoplay" preload="auto" nocontrols></video>

### 概念解释

- ZEGO Express SDK：ZEGO 实时音视频 SDK，提供基础的实时音视频功能，包括直播推拉流、直播连麦等，以下使用 ZEGO Express SDK 简写表示。
- ZEGO Effects SDK：ZEGO AI 美颜 SDK，提供多项智能图像渲染和算法能力，包括智能美颜、AR 特效、图像分割等，以下使用 ZEGO Effects SDK 简写表示。


## 示例源码

为方便开发者实现二者的搭配使用，ZEGO 提供了示例代码，请参考 [AI 美颜 - 跑通示例源码](/ai-effects-windows-c/quick-starts/run-sample-codes)。


## 前提条件

- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppID 和 AppSign，详情请参考 [控制台 - 项目管理](/console/project-info) 中的“项目信息”；并联系 ZEGO 技术支持，开通 ZEGO Effects 相关套餐服务权限。
- 已在项目中集成 ZEGO Express SDK，并实现了基本的音视频推拉流功能，详情请参考 [快速开始 - 集成](https://doc-zh.zego.im/article/197) 和 [快速开始 - 实现视频通话](https://doc-zh.zego.im/article/7633)。
- 已在项目中集成 ZEGO Effects SDK，详情请参考“AI 美颜”的 [快速开始 - 集成](/ai-effects-windows-c/quick-starts/import-the-sdk)。
- 已获取到 ZEGO Effects SDK 唯一的鉴权文件，详情请参考“AI 美颜”的 [快速开始 - 在线鉴权](/ai-effects-windows-c/quick-starts/online-authentication)。



## 使用步骤

ZEGO Effects SDK 和 ZEGO Express SDK 搭配使用，对视频数据进行实时 AI 美颜处理的原理，如下图：
<Frame width="512" height="auto" caption="">
  <img src="https://doc-media.zego.im/sdk-doc/Pics/Common/ZegoExpressEngine/video_pre_processing.png" />
</Frame>

通过以上流程，具体的实现步骤，如下图：
<Frame width="512" height="auto" caption="">
  <img src="https://doc-media.zego.im/sdk-doc/Pics/ZegoEffects/Apple/RTC_AI_bestPractise3.png" />
</Frame>

1. 初始化 ZEGO Effects SDK 和 ZEGO Express SDK，初始化在时序上没有限制。
2. 获取视频原始数据，可通过 ZEGO Express SDK 的 [自定义视频采集](/real-time-video-windows-cpp/video/custom-video-capture) 或 [自定义视频前处理](/real-time-video-windows-cpp/video/custom-video-preprocessing) 两种方式获取。
3. 将采集到的视频原始数据，传递给 ZEGO ZEGO Effects SDK，进行 AI 美颜处理。
4. 将处理完的数据传递给 ZEGO Express SDK，进行推流。如果在推拉流过程中需要调整 AI 美颜效果，可使用 ZEGO Effects SDK 的相关功能进行实时更改。
5. 远端用户通过 ZEGO Express SDK 拉取处理后的数据进行播放。


### 初始化 ZEGO Effects/Express SDK

对于两个 SDK 的初始化，不做时序上的限制，以下步骤中以“先初始化 ZEGO Effects SDK，再初始化 ZEGO Express SDK”为例。

**初始化 ZEGO Effects SDK**

1. 导入 Effects 模型和资源。

    在使用 ZEGO Effects SDK 的 AI 相关功能时，必须先导入 AI 模型和资源。

    ```cpp
    // 传入人脸识别模型的绝对路径。人脸检测、大眼、瘦脸功能均须导入
    // 传入人像分割模型的绝对路径。AI 人像分割功能须导入
    // 传入资源的绝对路径。
    char* resouce_path_list[] = {"D:\\YOUR_APP\\FaceDetectionModel.model",
                                 "D:\\YOUR_APP\\SegmentationModel.model",
                                 "D:\\YOUR_APP\\FaceWhiteningResources.bundle",
                                 "D:\\YOUR_APP\\PendantResources.bundle",
                                 "D:\\YOUR_APP\\RosyResources.bundle",
                                 "D:\\YOUR_APP\\TeethWhiteningResources.bundle",
                                 "D:\\YOUR_APP\\CommonResources.bundle"};

    // 传入资源或模型的路径列表，必须在 create 之前调用
    zego_effects_set_resources(resouce_path_list, 7);
    ```

    ZEGO Effects SDK 支持的所有资源和模型请参考“AI 美颜”的 [快速开始 - 导入资源和模型](/ai-effects-windows-c/quick-starts/import-resources-and-models)。


2. 创建 Effects 对象。传入在 [前提条件](#前提条件) 中获取到的鉴权文件，创建 Effects 对象。

    ```cpp
    // 鉴权内容请以实际获取的文件为准
    zego_effects_create(&m_handle,"ABCDEFG");
    ```

3. 初始化 Effects 对象。

    调用 [zego_effects_init_env](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~c_windows~class~ZegoEffects#zego-effects-init-env) 接口初始化 Effects 对象，需要传入待处理视频图像数据的宽高。

    以处理 1280 × 720 的视频图像为例：

    ```cpp
    // 初始化 Effects 对象，传入当前待处理的原始图像宽高。 自行管理生命周期，在停止图像采集的时候调用 zego_effects_uninit_env 接口反初始化，否则会造成内存泄露。
    zego_effects_init_env(m_handle,1280,720);
    ```


**初始化 ZEGO Express SDK**

调用 [createEngine](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~CPP_windows~class~zego-express-zego-express-sdk#create-engine) 接口，初始化 ZEGO Express SDK。

```cpp
ZegoEngineProfile profile;
// AppID 和 AppSign 由 ZEGO 分配给各 App；其中，为了安全考虑，建议将 AppSign 存储在 App 的业务后台，需要使用时从后台获取
profile.appID = appID;
profile.appSign = appSign;
profile.scenario = ZegoScenario::ZEGO_SCENARIO_DEFAULT;
// 创建引擎实例
auto engine = ZegoExpressSDK::createEngine(profile, nullptr);
```

### 获取视频原始数据

ZEGO Express SDK 可通过 [自定义视频前处理](https://doc-zh.zego.im/article/14849#Customvideopreprocessing) 和 [自定义视频采集](https://doc-zh.zego.im/article/14849#CustomCollection) 两种方式获取视频原始数据。

两种获取方式的区别如下，开发者可根据实际情况按需选择。

<table>

  <tbody><tr>
    <th>获取数据方式</th>
    <th>视频数据采集方式</th>
    <th>优势</th>
  </tr>
  <tr>
    <td>自定义视频前处理</td>
    <td>是由 ZEGO Express SDK 内部采集视频数据，原始视频数据通过回调获取。</td>
    <td>极简搭配使用 ZEGO Express SDK 和 ZEGO Effects SDK，开发者无需管理设备输入源，仅需对 ZEGO Express SDK 抛出来的原始数据进行操作，然后传回 ZEGO Express SDK 即可。</td>
  </tr>
  <tr>
    <td>自定义视频采集</td>
    <td>是由开发者自行采集视频数据，并提供给 ZEGO Express SDK。</td>
    <td>在进行多厂家对接时，业务实现更加灵活，同时性能优化的空间更大。</td>
  </tr>
</tbody></table>

<a id="Customvideopreprocessing"></a>

- **方式一：自定义视频前处理**

    以获取 ZEGO_VIDEO_BUFFER_TYPE_RAW_DATA 类型的原始视频数据为例。

    开发者通过调用 [enableCustomVideoProcessing](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~CPP_windows~class~zego-express-i-zego-express-engine#enable-custom-video-processing) 接口，开启自定义视频前处理；开启后，ZEGO Express SDK 内部会采集视频数据；采集完成后，可以通过 [onCapturedUnprocessedRawData](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~CPP_windows~class~zego-express-i-zego-custom-video-process-handler#on-captured-unprocessed-raw-data) 回调接口，获取采集到的视频原始数据。

    ```cpp
    ZegoCustomVideoProcessConfig config;
    config.bufferType = ZEGO_VIDEO_BUFFER_TYPE_RAW_DATA;
    // 开启自定义前处理
    engine->enableCustomVideoProcessing(true,&config);
    ```

    具体的原理可参考“实时音视频”的 [自定义视频前处理](/real-time-video-windows-cpp/video/custom-video-preprocessing)。

<a id="CustomCollection"></a>

- **方式二：自定义视频采集**

    自定义视频采集，主要依赖开发者自行采集视频数据，具体方式请参考“实时音视频”的 [自定义视频采集](/real-time-video-windows-cpp/video/custom-video-capture)。


### 进行 AI 美颜处理

获取到视频原始数据后，把数据传递给 ZEGO Effects SDK，开始对视频进行 AI 美颜（例如：美颜、美妆、背景分割等）处理。

- **方式一：自定义视频前处理**

    在 [onCapturedUnprocessedRawData](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~CPP_windows~class~zego-express-i-zego-custom-video-process-handler#on-captured-unprocessed-raw-data) 回调中，获取到视频原始数据后，调用 ZEGO Effects SDK 的相关接口，进行 AI 美颜处理（请参考 [美颜](/ai-effects-macos-c/guides/face-beautification)、[美型](/ai-effects-macos-c/guides/shape-retouch)、[背景分割](/ai-effects-macos-c/guides/background-segmentation)、[人脸检测](/ai-effects-macos-c/guides/face-detection)、[挂件](https://doc-zh.zego.im/faq/AIEffect_Stickers?product=Effects&platform=android)、[滤镜](/ai-effects-macos-c/guides/filters)），并将处理后的数据，返回给 ZEGO Express SDK。

    ```cpp
    // 自定义前处理为示例
    // 回调方法获取原始数据
    // 回调处理
    class MyHandler : public IZegoCustomVideoProcessHandler {
        // ......
    protected:
        void onCapturedUnprocessedRawData(const unsigned char** data, unsigned int* dataLength, ZegoVideoFrameParam param, unsigned long long referenceTimeMillisecond, ZegoPublishChannel channel) override;
    };

    void MyHandler::onCapturedUnprocessedRawData(const unsigned char** data, unsigned int* dataLength, ZegoVideoFrameParam param, unsigned long long referenceTimeMillisecond, ZegoPublishChannel channel) {
        // 回调方法获取原始数据
        int width  = param.width;
        int height = param.height;
        int stride = param.strides[0];
        // Format_RGBA8888 是 RGBA32 格式的，只支持 RGBA32 格式的输入
        QImage image(const_cast<unsigned char*>(data[0]),width,height,stride,QImage::Format_RGBA8888);
        zego_effects_video_frame_param frameParam;
        // RGBA32 格式
        frameParam.format = zego_effects_video_frame_format_rgba32;
        frameParam.width  = image.width();
        frameParam.height = image.height();
        // 自定义前处理：此处使用 ZEGO Effects SDK
        zego_effects_process_image_buffer_rgb(m_handle,image.bits(), image.bytesPerLine() * image.height(),frameParam);
        // 将处理后的 buffer 发回 ZEGO Express SDK 里
        engine->sendCustomVideoProcessedRawData((const unsigned char**)data,dataLength,param,referenceTimeMillisecond);
    }

    auto myHandler = std::make_shared<MyHandler>();
    engine->setCustomVideoProcessHandler(myHandler);
    ```

- **方式二：自定义视频采集**

    在接收到自定义采集的 [onStart](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoCustomVideoCaptureHandler#on-start) 回调后，开发者通过自定义采集获取视频数据，再调用 ZEGO Effects SDK 的相关接口，进行 AI 美颜处理（请参考 [美颜](/ai-effects-macos-c/guides/face-beautification)、[美型](/ai-effects-macos-c/guides/shape-retouch)、[背景分割](/ai-effects-macos-c/guides/background-segmentation)、[人脸检测](/ai-effects-macos-c/guides/face-detection)、[挂件](https://doc-zh.zego.im/faq/AIEffect_Stickers?product=Effects&platform=android)、[滤镜](/ai-effects-macos-c/guides/filters)），并将处理后的数据，返回给 ZEGO Express SDK（可参考 [自定义视频采集](/real-time-video-macos-cpp/video/custom-video-capture#3-向-sdk-发送视频帧数据) 中的 “3 向 SDK 发送视频帧数据”）。

### 推流处理后的数据

经由 ZEGO Effects SDK 处理完成后，将处理后的数据，返回给 ZEGO Express SDK。

ZEGO Express SDK 调用 [startPublishingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~CPP_windows~class~zego-express-i-zego-express-engine#start-publishing-stream) 接口，传入处理后的数据流 streamID，开始推流，发送给云服务器。

```cpp
// 用户调用 loginRoom 之后再调用此接口进行推流
// 在同一个 AppID 下，开发者需要保证“streamID” 全局唯一，如果不同用户各推了一条 “streamID” 相同的流，后推流的用户会推流失败。
engine->startPublishingStream("streamID");
```

### 拉取处理后的数据播放

ZEGO Express SDK 开始推流后，远端用户可以调用 [startPlayingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~CPP_windows~class~zego-express-i-zego-express-engine#start-playing-stream) 接口，传入处理后的数据流 streamID，拉取视频数据，进行播放。

```cpp
// 开始拉流，设置远端拉流渲染视图，视图模式采用 SDK 默认的模式，等比缩放填充整个 View
// 如下 playView 为 UI 窗口句柄
std::string streamID = "streamID";
ZegoCanvas canvas((void*)playView);
engine->startPlayingStream(streamID, &canvas);
```

至此，开发者就可以完整地实现在推拉流音视频的同时，实时调整 AI 美颜效果。

<Content />

