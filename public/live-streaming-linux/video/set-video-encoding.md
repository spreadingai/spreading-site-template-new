# 设置视频编码方式

- - -

## 功能简介

在开发者推拉视频流时，可对编解码进行详细设置，包括开启分层视频编码、开启视频大小流编码、使用硬件编解码和设置编码方式。

### 分层视频编码

分层视频编码，将码流分为基本层和扩展层，此编码方式可以为不同网络状态的用户提供更好的体验。基本层保证了最基本的视频质量，而扩展层则是对基本层的补充。对于网络较好的用户，可只拉取扩展层获得更好的体验，对于网络状态较差的用户，只拉取基本层可以保证基本的视频质量。

当开发者在连麦或混流业务中出现以下情况时，推荐使用分层视频编码功能：

- 需要不同终端显示不同质量的视频流。
- 需要在较差的网络环境中保持连麦的流畅。
- 需要根据网络状态自适应拉取视频流的质量。


<Note title="说明">
分层视频编码使用的是 ZEGO 的私有协议，拉流端只有从 ZEGO 服务器上才能拉取到不同分层的视频流。
</Note>

### 视频大小流编码

视频大小流编码与分层视频编码的共同作用是将码流分为大分辨率类型和小分辨率类型。

最显著的差异是分层视频编码使用一个编码器编出基本层和扩展层的码流，视频大小流编码使用两个编码器编出基本层和扩展层的码流。

二者的具体差异、优缺点请查看 [视频大小流和分层编码](https://doc-zh.zego.im/article/17951)，开发者可以结合二者差异和业务具体诉求，选择分层视频编码还是视频大小流编码。

<Note title="说明">
视频大小流编码使用的是 ZEGO 的私有协议，拉流端只有从 ZEGO 服务器上才能拉取到不同分层的视频流。
</Note>

### 硬件编解码

开发者可选择开启硬件编码和硬件解码。开启硬件编解码后会使用 GPU 进行编解码，降低 CPU 使用率。若某些机型在推或拉大分辨率音视频流时设备发热严重，可开启硬件编解码。

### 视频编码方式

开发者可进行视频编码配置，使不同端之间进行编码对齐，进而实现多端互通。

使用场景：
- 一般情况下使用默认编码即可。
- 在同等分辨率帧率的情况下，需要降低码率，可以采用 H.265。
- 在需要与小程序互通时，需要使用 H.264。

## 示例源码下载

请参考 [下载示例源码](https://doc-zh.zego.im/article/21140) 获取源码。

相关源码请查看 “/ZegoExpressExample/Examples/AdvancedVideoProcessing/EncodingAndDecoding” 目录下的文件。

## 前提条件

在实现视频编解码功能之前，请确保：

- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppID 和 AppSign，详情请参考 [控制台 - 项目信息](/console/project-info)。
- 已在项目中集成 ZEGO Express SDK，并实现了基本的音视频推拉流功能，详情请参考 [快速开始 - 集成](https://doc-zh.zego.im/article/21141) 和 [快速开始 - 实现流程](https://doc-zh.zego.im/article/21031)。



## 实现步骤

<a id="LayeredVideoCoding"></a>

### 分层视频编码（H.264 SVC）

使用分层视频编码需要以下两个步骤：

- 推流前通过指定特定的编码器来开启分层视频编码。
- 拉流时指定要拉取的分层视频。

**开启分层视频编码**

在推流（[startPublishingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_linux~class~IZegoExpressEngine#start-publishing-stream)）前调用 [setVideoConfig](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_linux~class~IZegoExpressEngine#set-video-config) 接口设置 [ZegoVideoConfig](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_linux~struct~ZegoVideoConfig) 类中的参数 “codecID”，即可开启/关闭分层视频编码功能。

- “codecID” 设置为 “ZEGO_VIDEO_CODEC_ID_SVC”，可以开启该功能。
- “codecID” 设置为 “ZEGO_VIDEO_CODEC_ID_DEFAULT”、“ZEGO_VIDEO_CODEC_ID_VP8” 或 “ZEGO_VIDEO_CODEC_ID_H265” 可关闭该功能。

```cpp
ZegoVideoConfig videoConfig;
videoConfig.codecID = ZEGO_VIDEO_CODEC_ID_SVC;
engine->setVideoConfig(videoConfig);

std::string streamID = "MultiLayer-1";
engine->startPublishingStream(streamID);
```

**指定要拉取的分层视频**

在推流端开启了分层视频编码后，拉流端在拉流前后均可调用 [setPlayStreamVideoType](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_linux~class~IZegoExpressEngine#set-play-stream-video-type) 接口，此时拉流端默认会根据网络情况拉取合适的视频分层，例如弱网只拉取基本层。开发者也可以传入具体的拉流参数以拉取特定的视频分层，目前支持的视频分层如下：

|枚举值|说明|
|-|-|
|ZEGO_VIDEO_STREAM_TYPE_DEFAULT|根据网络状态选择图层|
|ZEGO_VIDEO_STREAM_TYPE_SMALL|指定拉基本层（小分辨率）|
|ZEGO_VIDEO_STREAM_TYPE_BIG|指定拉扩展层（大分辨率)|

以拉取扩展层为例：

```cpp
engine->setPlayStreamVideoType(playStreamID,ZEGO_VIDEO_STREAM_TYPE_BIG);
```

### 视频大小流编码（H.264 DualStream）

视频大小流编码（H.264 DualStream）的实现方式与分层视频编码（H.264 SVC）类似，需要以下两个步骤：

- 推流前，通过指定特定的编码器来开启视频大小流编码。
- 拉流时，指定要拉取的视频码流。

**开启分层视频编码**

在推流（[startPublishingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_linux~class~IZegoExpressEngine#start-publishing-stream)）前，调用 [setVideoConfig](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_linux~class~IZegoExpressEngine#set-video-config) 接口设置 [ZegoVideoConfig](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_linux~struct~ZegoVideoConfig) 类中的参数 `codecID` 为 `ZegoVideoCodecID.H264DualStream`，即可开启视频大小流编码功能。

```cpp
ZegoVideoConfig videoConfig;
videoConfig.codecID = ZEGO_VIDEO_CODEC_ID_H264_DUAL_STREAM;
engine->setVideoConfig(videoConfig);

std::string streamID = "MultiLayer-1";
engine->startPublishingStream(streamID);
```

**指定要拉取的分层视频**

在推流端开启了视频大小流编码后，拉流端在拉流前后均可调用 [setPlayStreamVideoType](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_linux~class~IZegoExpressEngine#set-play-stream-video-type) 接口，此时拉流端默认会根据网络情况拉取合适的视频流分层，例如，弱网只拉取基本层。开发者也可以传入具体的拉流参数以拉取特定的视频分层，目前支持的视频分层如下：

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

**开启硬件编码**

<Warning title="注意">
该功能需在推流前设置才能生效，如果在推流后设置，停止推流后重新推流才可以生效。
</Warning>

若开发者需要开启硬件编码，可调用 [enableHardwareEncoder](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_linux~class~IZegoExpressEngine#enable-hardware-encoder) 接口。

```cpp
// 开启硬件编码
engine->enableHardwareEncoder(true);
```

**开启硬件解码**

<Warning title="注意">
该功能需在拉流前设置才能生效，如果在拉流后设置，停止拉流后重新拉流才可以生效。
</Warning>

若开发者需要开启硬件解码，可调用 [enableHardwareDecoder](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_linux~class~IZegoExpressEngine#enable-hardware-decoder) 接口。


```cpp
// 开启硬件解码
engine->enableHardwareDecoder(true);
```

### 设置视频编码方式

在推流（[startPublishingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_linux~class~IZegoExpressEngine#start-publishing-stream)）前调用 [setVideoConfig](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_linux~class~IZegoExpressEngine#set-video-config) 接口设置 “ZegoVideoConfig” 类下的参数 “codecID”，即可设置视频编码方式。目前，支持的视频编码方式如下：

|枚举值|编码方式|使用场景|
|-|-|-|
|ZEGO_VIDEO_CODEC_ID_DEFAULT|默认编码（H.264）|H.264 是被广泛使用的高精度视频的录制、压缩和发布格式，拥有很好的兼容性。|
|ZEGO_VIDEO_CODEC_ID_SVC|分层编码 （H.264 SVC）|需要使用分层编码的场景。|
|ZegoVideoCodecIDH264DualStream|视频大小流编码（H.264 DualStream）|希望将码流分为基本层和扩展层，但是 SVC 不满足业务需要的场景（例如：希望同时使用硬件编码）。|
|ZEGO_VIDEO_CODEC_ID_VP8|VP8|常用于 Web 视频，但不能用在 CDN 录制场景中，否则会造成录制文件异常。|
|ZEGO_VIDEO_CODEC_ID_H265|H.265|拥有更好的压缩率，但需考虑兼容性。|

以设置编码方式为 H.265 为例：

```cpp
ZegoVideoConfig videoConfig;
videoConfig.codecID = ZEGO_VIDEO_CODEC_ID_H265;
engine->setVideoConfig(videoConfig);

std::string streamID = "MultiLayer-1";
engine->startPublishingStream(streamID);
```

## 常见问题


1. **转推或直推 CDN，观众从 CDN 上拉流，分层视频编码和大小流是否有效？从 CDN 拉取的流码率、分辨率是多少？**

    - `视频分层编码`和 `视频大小流编码` 使用的是 ZEGO 的私有协议，拉流端只有从 ZEGO 服务器上拉取 RTC 流或 L3 流时，才能拉取到不同分层的视频流。

    - 直推 CDN 场景下，由于不经过 ZEGO 服务器，所以码流的分层无效，SDK 会回退至 H.264 编码。从 CDN 拉取的流的分辨率和码率与推流用户设置的分辨率和码率一致。

    - 转推 CDN 场景下，由于 CDN 拉流未使用 ZEGO 的私有协议，ZEGO 服务器转推到 CDN 服务器后的流不支持分层视频编码、视频大小流编码，只能从转推基本层或者转推扩展层中选择一个，CDN 拉流时的分辨率、码率和帧率取决于转推的是基本层还是扩展层。

        <Warning title="注意">
        转推到 CDN 时，默认转推扩展层。如果业务需要将基本层转推至 CDN，请联系 ZEGO 技术支持配置。
        </Warning>

2. **分层视频编码和大小流视频编码的区别是什么？**

    详情请参考 [视频大小流和分层编码](https://doc-zh.zego.im/article/17951)。


## 相关文档

[如何解决 Web 平台和 Native 平台互通时出现的画面异常问题（如黑屏、绿屏、花屏等）？](https://doc-zh.zego.im/faq/web_native_video)

<Content />
