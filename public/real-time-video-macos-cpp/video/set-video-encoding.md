# 视频编解码

- - -

## 功能简介

在开发者推拉视频流的时候，可对编解码进行详细设置，包括启用分层编码、使用硬件编解码和设置编码方式。

### 分层视频编码

分层视频编码将码流分为基本层和扩展层，这种编码方式可以为不同网络状态的用户提供更好的体验。基本层保证了最基本的视频质量，而扩展层则是对基本层的补充。对于网络较好的用户，可同时拉取基本层和扩展层获得更好的体验，对于网络状态较差的用户，只拉取基本层可以保证基本的视频质量。

当开发者在连麦或混流业务中出现以下情况时，推荐使用 SDK 的分层视频编码功能：

- 需要不同终端显示不同质量的视频流。
- 需要在较差的网络环境中保持连麦的流畅。
- 需要根据网络状态自适应拉取视频流的质量。

分层视频编码的优点和缺点可参考：[分层视频编码的优缺点](https://doc-zh.zego.im/article/10186#6)

### 硬件编解码
开发者可选择开启硬件编码和硬件解码。开启硬件编解码后会使用 GPU 进行编解码，降低 CPU 使用率。若某些机型在推或拉大分辨率音视频流时设备发热严重，可开启硬件编解码。

### 视频编码方式
开发者可进行视频编码配置，使不同端之间进行编码对齐，进而实现多端互通。

使用场景：
- 一般情况下使用默认编码即可。
- 在同等分辨率帧率的情况下，需要降低码率，可以采用 H.265。
- 在需要与小程序互通时，需要使用 H.264。

## 示例源码下载

请参考 [下载示例源码](/real-time-video-macos-cpp/quick-start/run-example-code) 获取源码。

相关源码请查看 “/ZegoExpressExample/Examples/AdvancedVideoProcessing/EncodingAndDecoding” 目录下的文件。

## 前提条件

在实现视频编解码功能之前，请确保：

- 已在项目中集成 ZEGO Express SDK，实现基本的实时音视频功能，详情请参考  [快速开始 - 集成](/real-time-video-macos-cpp/quick-start/integrating-sdk) 和  [快速开始 - 实现流程](/real-time-video-macos-cpp/quick-start/implementing-video-call)。
- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppID 和 AppSign，详情请参考 [控制台 - 项目管理](/console-old/project-management)。

## 实现步骤

### 分层视频编码

使用分层视频编码需要以下两个步骤：

- 推流前通过指定特定的编码器来开启分层视频编码。
- 拉流时指定要拉取的分层视频。

#### 开启分层视频编码

在调用 [startPublishingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#start-publishing-stream) 之前调用 [setVideoConfig](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#set-video-config) 设置 [zegoVideoConfig](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~struct~ZegoVideoConfig#zego-video-config) 类中的参数 “codecID”，即可开启/关闭分层视频编码功能。

- “codecID” 设置为 “ZEGO_VIDEO_CODEC_ID_SVC”，可以开启该功能。
- “codecID” 设置为 “ZEGO_VIDEO_CODEC_ID_DEFAULT”、“ZEGO_VIDEO_CODEC_ID_VP8” 或 “ZEGO_VIDEO_CODEC_ID_H265” 可关闭该功能。

```cpp
ZegoVideoConfig videoConfig;
videoConfig.codecID = ZEGO_VIDEO_CODEC_ID_SVC;
engine->setVideoConfig(videoConfig);

std::string streamID = "MultiLayer-1";
engine->startPublishingStream(streamID);
```

#### 指定要拉取的分层视频

在推流端开启了分层视频编码后，拉流端调用 [setPlayStreamVideoType](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#set-play-stream-video-type)，拉流端默认会根据网络情况拉取合适的视频分层，例如弱网只拉取基本层。开发者也可以传入具体的拉流参数以拉取特定的视频分层。该接口在拉流前后皆可调用。

一共支持以下三种视频分层：

|枚举值|说明|
|-|-|
|ZEGO_VIDEO_STREAM_TYPE_DEFAULT|根据网络状态选择图层|
|ZEGO_VIDEO_STREAM_TYPE_SMALL|指定拉基本层（小分辨率）|
|ZEGO_VIDEO_STREAM_TYPE_BIG|指定拉扩展层（大分辨率)|

以拉取扩展层为例：

```cpp
engine->setPlayStreamVideoType(playStreamID,ZEGO_VIDEO_STREAM_TYPE_BIG);
```

### 硬件编解码
由于少部分机型设备对硬件编码/解码的支持不佳，SDK 默认使用软件编码与软件解码的方式，若开发者有使用硬件编码的需求，可参照本节自行设置。
#### 开启硬件编码
若开发者需要开启硬件编码，可调用 [enableHardwareEncoder](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#enable-hardware-encoder)。

<Warning title="注意">

该功能需在推流前设置才能生效，如果在推流后设置，停止推流后重新推流可以生效。

</Warning>



```cpp
// 开启硬件编码
engine->enableHardwareEncoder(true);
```

#### 开启硬件解码
若开发者需要开启硬件解码，可调用 [enableHardwareDecoder](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#enable-hardware-decoder)。

<Warning title="注意">

该功能需在拉流前设置才能生效，如果在拉流后设置，停止拉流后重新拉流可以生效。

</Warning>



```cpp
// 开启硬件解码
engine->enableHardwareDecoder(true);
```

### 设置视频编码方式
在调用 [startPublishingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#start-publishing-stream) 之前调用 [setVideoConfig](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#set-video-config) 设置 “VideoConfig” 类下的参数 “codecID”，即可设置视频编码方式。目前，支持的视频编码方式如下：

|枚举值|编码方式|使用场景|
|-|-|-|
|ZEGO_VIDEO_CODEC_ID_DEFAULT|默认编码（H.264）|H.264 是被广泛使用的高精度视频的录制、压缩和发布格式，拥有很好的兼容性。|
|ZEGO_VIDEO_CODEC_ID_SVC|分层编码 （H.264 SVC）|需要使用分层编码的场景。|
|ZEGO_VIDEO_CODEC_ID_VP8|VP8|常用于 Web 视频。|
|ZEGO_VIDEO_CODEC_ID_H265|H.265|拥有更好的压缩率，但需考虑兼容性。|

以设置编码方式为 H.265 为例：

```cpp
ZegoVideoConfig videoConfig;
videoConfig.codecID = ZEGO_VIDEO_CODEC_ID_H265;
engine->setVideoConfig(videoConfig);

std::string streamID = "MultiLayer-1";
engine->startPublishingStream(streamID);
```

## API 参考列表

|方法 | 描述  |
| ---- | ---- |
| [setVideoConfig ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#set-video-config) | 设置视频参数 |
|[enableHardwareEncoder](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#enable-hardware-encoder)|开/关硬件编码|
|[enableHardwareDecoder](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#enable-hardware-decoder)|开/关硬件解码|

## 常见问题

1. **分层视频编码拉取基本层和扩展层码率、分辨率等参数有区别吗？**

    分层视频编码基本层的分辨率宽高分别是扩展层的 50%，拉取基本层的码率大约为拉取扩展层码率的 25%，其他参数一致。

    例如：用户设置编码分辨率为 “800 × 600”，则扩展层分辨率为 “800 × 600”，基本层分辨率为 “400 × 300”。

2. **转推或直推 CDN，观众从 CDN 上拉流，分层编码是否有效？从 CDN 拉取的流码率、分辨率是多少？**

- 分层视频编码使用的是 ZEGO 的私有协议，拉流端只有从 ZegoServer 上才能拉取到不同分层的视频流。

- 转推 CDN 情境下，推流端推送到 ZEGO 服务器的流可以使用分层编码，从 ZEGO 服务器也可以拉取到分层编码的流。然而，ZEGO 服务器转推到 CDN 服务器的流无法使用分层编码，而会是高质量的流。从 CDN 拉取的流与分层编码中扩展层的码率、分辨率一致。

- 直推 CDN 情境下，由于不经过 ZEGO 服务器，所以分层编码无效。从 CDN 拉取的流的分辨率和码率与推流用户设置的分辨率和码率一致。

3. **分层视频编码的优缺点?**

**优点：**

- 分层视频编码可以根据需要产生不同的码流或者提取出不同的码流，使用分层视频编码实现一次编码比用普通编码方式编码多次更高效。
- 分层视频编码应用更灵活。
- 分层视频编码网络适应性更强。

**缺点：**

- 压缩效率稍低：在同样的条件下，分层视频编码比普通编码方式的压缩效率要低 20% 左右，也就是说要达到和普通编码方式相同的视频质量，分层视频编码的码率要比普通编码方式多 20%，分层数越多，效率下降越多。（目前 SDK 只支持 1 路基本层和 1 路扩展层）
- 编码效率低：分层视频编码的在同样的条件下，比普通编码方式的编码计算复杂度高，所以编码效率相比普通编码方式约低 10%。
- 不支持硬件编码：分层视频编码不支持硬件编码，对 CPU 的性能负担较大，支持硬件解码。
