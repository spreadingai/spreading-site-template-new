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

为方便开发者实现二者的搭配使用，ZEGO 提供了示例代码，请参考 [AI 美颜 - 跑通示例源码](/ai-effects-android-java/quick-starts/run-sample-codes)。


## 前提条件

- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppID 和 AppSign，详情请参考 [控制台 - 项目管理](/console/project-info) 中的“项目信息”；并联系 ZEGO 技术支持，开通 ZEGO Effects 相关套餐服务权限。
- 已在项目中集成 ZEGO Express SDK，并实现了基本的音视频推拉流功能，详情请参考 [快速开始 - 集成](https://doc-zh.zego.im/article/195) 和 [快速开始 - 实现视频通话](https://doc-zh.zego.im/article/7627)。

- 已在项目中集成 ZEGO Effects SDK，详情请参考“AI 美颜”的 [快速开始 - 集成](/ai-effects-android-java/quick-starts/import-the-sdk)。
- 已获取到 ZEGO Effects SDK 唯一的鉴权文件，详情请参考“AI 美颜”的 [快速开始 - 在线鉴权](/ai-effects-android-java/quick-starts/online-authentication)。



## 使用步骤

ZEGO Effects SDK 和 ZEGO Express SDK 搭配使用，对视频数据进行实时 AI 美颜处理的原理，如下图：
<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Common/ZegoExpressEngine/video_pre_processing.png" /></Frame>

通过以上流程，具体的实现步骤，如下图：
<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/ZegoEffects/Apple/RTC_AI_bestPractise3.png" /></Frame>

1. 初始化 ZEGO Effects SDK 和 ZEGO Express SDK，初始化在时序上没有限制。
2. 获取视频原始数据，可通过 ZEGO Express SDK 的 [自定义视频采集](/real-time-video-android-java/video/custom-video-capture) 或 [自定义视频前处理](/real-time-video-android-java/video/custom-video-preprocessing) 两种方式获取。
3. 将采集到的视频原始数据，传递给 ZEGO Effects SDK，进行 AI 美颜处理。
4. 将处理完的数据传递给 ZEGO Express SDK，进行推流。如果在推拉流过程中需要调整 AI 美颜效果，可使用 ZEGO Effects SDK 的相关功能进行实时更改。
5. 远端用户通过 ZEGO Express SDK 拉取处理后的数据进行播放。


### 初始化 ZEGO Effects/Express SDK

对于两个 SDK 的初始化，不做时序上的限制，以下步骤中以“先初始化 ZEGO Effects SDK，再初始化 ZEGO Express SDK”为例。

#### 初始化 ZEGO Effects SDK

1. 导入 Effects 模型和资源。

    在使用 ZEGO Effects SDK 的 AI 相关功能时，必须先导入 AI 模型和资源。

    ```java
    // 传入人脸识别模型的绝对路径。人脸检测、大眼、瘦脸功能均须导入
    ArrayList<String> aiResources = new ArrayList<>();
    aiResources.add("sdcard/xxx/xxxxx/FaceDetectionModel.model");
    aiResources.add("sdcard/xxx/xxxxx/SegmentationModel.model");

    // 传入资源的绝对路径
    aiResources.add("sdcard/xxx/xxxxx/CommonResources.bundle");
    aiResources.add("sdcard/xxx/xxxxx/PendantResources.bundle");
    aiResources.add("sdcard/xxx/xxxxx/FaceWhiteningResources.bundle");
    ...

    // 传入资源或模型的路径列表，必须在 create 之前调用
    ZegoEffects.setResources(aiResources);
    ```

    ZEGO Effects SDK 支持的所有资源和模型请参考“AI 美颜”的 [快速开始 - 导入资源和模型](/ai-effects-android-java/quick-starts/import-resources-and-models)。


2. 创建 Effects 对象。

<Tabs>
<Tab title=" ZegoEffects SDK 2.1.0 及以上版本">
将 [前提条件](#前提条件) 中申请到的 AppID、AppSign 直接传入 [create](https://doc-zh.zego.im/article/api?doc=effects-sdk_API~java_android~class~ZegoEffects#create-1) 接口，由 SDK 内部鉴权之后，创建 Effects 对象并返回相关 [错误码](https://doc-zh.zego.im/article/9588)。
```java
ZegoEffects mEffects;
long appid = *******;
String appSign = "*******";
ZegoEffects.create(appid, appSign, applicationContext, (effects, errorCode) -> {
    mEffects = effects;
    //执行自定义逻辑
});
```
</Tab>
<Tab title="ZegoEffects SDK 2.1.0 以下版本">
调用 [create](https://doc-zh.zego.im/article/api?doc=effects-sdk_API~java_android~class~ZegoEffects#create) 接口，传入 [前提条件](#前提条件) 获取到的鉴权文件，创建 Effects 对象。

```java
// 鉴权内容请以实际获取的文件为准
ZegoEffects effects = ZegoEffects.create("ABCDEFG", getApplication());
```
</Tab>
</Tabs>


3. 初始化 Effects 对象。

    调用 [initEnv](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~java_android~class~ZegoEffects#init-env) 接口初始化 Effects 对象，需要传入待处理视频图像数据的宽高。

    以处理 1280 × 720 的视频图像为例：

    ```java
    // 初始化 Effects 对象，传入当前待处理的原始图像宽高，需要在自定义视频前处理回调的onStar里初始化，express 为后面创造的Express引擎对象
    express.setCustomVideoProcessHandler(new IZegoCustomVideoProcessHandler() {
        public void onStart(ZegoPublishChannel channel) {
            effects.initEnv(1280,720);  // SDK1.4.7 后可以不调用此接口，若要调用，请先打开预览再打开摄像头
        }
    }
    ```


#### 初始化 ZEGO Express SDK

调用 [createEngine](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Java_android~class~im-zego-zegoexpress-zego-express-engine#create-engine) 接口，初始化 ZEGO Express SDK。

```java
// 定义 SDK 引擎对象
ZegoExpressEngine express;

ZegoEngineProfile profile = new ZegoEngineProfile();
// 请通过官网注册获取，格式为 123456789L
profile.appID = appID;
// 请通过官网注册获取，格式为："0123456789012345678901234567890123456789012345678901234567890123"（共64个字符）
profile.appSign = appSign;
// 通用场景接入
profile.scenario = ZegoScenario.DEFAULT;
// 设置app的application 对象
profile.application = getApplication();
// 创建引擎
express = ZegoExpressEngine.createEngine(profile, null);
```

### 获取视频原始数据

ZEGO Express SDK 可通过 [自定义视频前处理](https://doc-zh.zego.im/article/11257#Customvideopreprocessing) 和 [自定义视频采集](https://doc-zh.zego.im/article/11257#CustomCollection) 两种方式获取视频原始数据。

两种获取方式的区别如下，开发者可根据实际情况按需选择：

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

    以获取 [GL_TEXTURE_2D](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~enum~ZegoVideoBufferType#zego-video-buffer-type-gl-texture2-d) 类型的原始视频数据为例。

    开发者通过调用 [enableCustomVideoProcessing](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Java_android~class~im-zego-zegoexpress-zego-express-engine#enable-custom-video-processing) 接口，开启自定义视频前处理；开启后，ZEGO Express SDK 内部会采集视频数据；采集完成后，可以通过 [onCapturedUnprocessedTextureData](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Java_android~class~im-zego-zegoexpress-callback-i-zego-custom-video-process-handler#on-captured-unprocessed-texture-data) 回调接口，获取采集到的视频原始数据。

    ```java
    ZegoCustomVideoProcessConfig config = new ZegoCustomVideoProcessConfig();
    // 选择 GL_TEXTURE_2D 类型视频帧数据
    config.bufferType = ZegoVideoBufferType.GL_TEXTURE_2D;

    // 开启自定义前处理
    express.enableCustomVideoProcessing(true, config, ZegoPublishChannel.MAIN);
    ```

    具体的原理可参考“实时音视频”的 [自定义视频前处理](/real-time-video-android-java/video/custom-video-preprocessing)。

<a id="CustomCollection"></a>

- **方式二：自定义视频采集**

    自定义视频采集，主要依赖开发者自行采集视频数据，具体方式请参考“实时音视频”的 [自定义视频采集](/real-time-video-android-java/video/custom-video-capture)。

### 进行 AI 美颜处理

获取到视频原始数据后，把数据传递给 ZEGO Effects SDK，开始对视频进行 AI 美颜（例如：美颜、美妆、背景分割等）处理。

- **方式一：自定义视频前处理**

    在 [onCapturedUnprocessedTextureData](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Java_android~class~im-zego-zegoexpress-callback-i-zego-custom-video-process-handler#on-captured-unprocessed-texture-data) 回调中，获取到视频原始数据后，调用 ZEGO Effects SDK 的相关接口，进行 AI 美颜处理（请参考 [美颜](/ai-effects-android-java/guides/face-beautification)、[美型](/ai-effects-android-java/guides/shape-retouch)、[背景分割](/ai-effects-android-java/guides/background-segmentation)、[人脸检测](/ai-effects-android-java/guides/face-detection)、[挂件](https://doc-zh.zego.im/faq/AIEffect_Stickers?product=Effects&platform=android)、[滤镜](/ai-effects-android-java/guides/filters)），并将处理后的数据，返回给 ZEGO Express SDK。

    ```java
    // 自定义前处理为示例
    // 回调方法获取原始数据
    // 回调处理
    // Effect 初始化反初始化在 Express 视频前处理开始停止回调里
    express.setCustomVideoProcessHandler(new IZegoCustomVideoProcessHandler() {
        @Override
        public void onStart(ZegoPublishChannel channel) {
            effects.initEnv(720, 1280);
        }

        // 一定要反初始化，否则会造成内存泄露
        @Override
        public void onStop(ZegoPublishChannel channel) {
            effects.uninitEnv();
        }

        // 回调方法获取原始数据 texture
        @Override
        public void onCapturedUnprocessedTextureData(int textureID, int width, int height, long referenceTimeMillisecond, ZegoPublishChannel channel) {

            ZegoEffectsVideoFrameParam param = new ZegoEffectsVideoFrameParam();
            param.format = ZegoEffectsVideoFrameFormat.RGBA32;
            param.width = width;
            param.height = height;

            // 自定义前处理：此处使用 ZEGO Effects SDK
            int processedTextureID = effects.processTexture(textureID, param);

            // 将处理后的 buffer 发回 ZEGO Express SDK 里
            express.sendCustomVideoProcessedTextureData(processedTextureID, width, height, referenceTimeMillisecond);
        }
    }
    ```

- **方式二：自定义视频采集**

    在接收到自定义采集的 [onStart](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~IZegoCustomVideoCaptureHandler#on-start) 回调后，开发者通过自定义采集获取视频数据，再调用 ZEGO Effects SDK 的相关接口，进行 AI 美颜处理（请参考 [美颜](/ai-effects-android-java/guides/face-beautification)、[美型](/ai-effects-android-java/guides/shape-retouch)、[背景分割](/ai-effects-android-java/guides/background-segmentation)、[人脸检测](/ai-effects-android-java/guides/face-detection)、[挂件](https://doc-zh.zego.im/faq/AIEffect_Stickers?product=Effects&platform=android)、[滤镜](/ai-effects-android-java/guides/filters)），并将处理后的数据，返回给 ZEGO Express SDK（可参考 [自定义视频采集](/real-time-video-android-java/video/custom-video-capture#3-向-sdk-发送视频帧数据) 中的 “向 SDK 发送视频帧数据”）。

### 推流处理后的数据

经由 ZEGO Effects SDK 处理完成后，将处理后的数据，返回给 ZEGO Express SDK。

ZEGO Express SDK 调用 [startPublishingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Java_android~class~im-zego-zegoexpress-zego-express-engine#start-publishing-stream) 接口，传入处理后的数据流 streamID，开始推流，发送给云服务器。

```java
// 开始推流
express.startPublishingStream("streamID");
```

### 拉取处理后的数据播放

ZEGO Express SDK 开始推流后，远端用户可以调用 [startPlayingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Java_android~class~im-zego-zegoexpress-zego-express-engine#start-playing-stream) 接口，传入处理后的数据流 streamID，拉取视频数据，进行播放。

```java
/**
 *  开始拉流，设置远端拉流渲染视图，视图模式采用 SDK 默认的模式，等比缩放填充整个 View
 *  如下 play_view 为 UI 界面上的 SurfaceView/TextureView/SurfaceTexture 对象
 */
express.startPlayingStream("streamID", new ZegoCanvas(play_view));
```

至此，开发者就可以完整地实现在推拉流音视频的同时，实时调整 AI 美颜效果。
