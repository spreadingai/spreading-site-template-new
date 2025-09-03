# 视频大小流和分层编码

- - -

## 功能简介

当开发者的连麦或混流业务场景中，出现以下要求时，推荐使用 SDK 提供的 `视频分层编码` 或 `视频大小流编码` 功能：

- 需要不同终端显示不同质量的视频流。
- 需要在较差的网络环境中，保持连麦的通畅。
- 需要根据网络状态，自适应拉取视频流的质量。


`视频分层编码（H.264 SVC）`，是 H.264 AVC 的扩展，支持具有分层特性的码流。`视频大小流编码（H.264 DualStream）` 参考了 H.264 SVC 的理念，通过对视频码流分层，保障不同网络和设备性能的终端流畅的体验。

两种编码方式，都是将码流分为 “基本层” 和 “扩展层”，可以为不同网络状态、不同设备性能的用户提供更好的体验。基本层保证了最基本的视频质量，而扩展层则是对基本层的补充。对于网络较好的用户，可拉取扩展层获得更好的体验，对于网络状态较差的用户，只拉取基本层可以保证基本的视频质量。以下是两种功能的详细对比：

<table>

<tbody><tr>
<th>-</th>
<th><b>视频分层编码（H.264 SVC）</b></th>
<th><b>视频大小流编码（H.264 DualStream）</b></th>
</tr>
<tr>
<td>实现逻辑</td>
<td>启动 1 个编码器分别编出不同的参数的码流，作为码流的基本层和扩展层。</td>
<td>启动 2 个编码器分别编出不同的参数的码流，作为码流的基本层和扩展层。</td>
</tr>
<tr>
<td>使用协议</td>
<td colspan="2">使用 ZEGO 的私有协议，拉流端只有从 ZEGO 服务器上，才能拉取到不同分层的视频流。</td>
</tr>
<tr>
<td>编码/解码</td>
<td>基本层和扩展层的编码过程不独立，可以独立解码。</td>
<td>基本层和扩展层的编码、解码过程都相互独立。</td>
</tr>
<tr>
<td>推流</td>
<td>选择编码格式为 “ZegoVideoCodecIDSvc”。</td>
<td><ol><li>选择编码格式为 “ZegoVideoCodecIDH264DualStream”。</li><li>（可选）通过 [setPublishDualStreamConfig] 接口分别配置基本层和扩展层的视频参数。</li></ol></td>
</tr>
<tr>
<td rowspan="2">拉流</td>
<td colspan="2">接口调用无差异，同一用户同一时间只能拉取视频流的一层。默认网络情况良好时，只拉扩展层；网络情况不好时，只拉取基础层。</td>
</tr>
<tr>
<td>拉取的基本层的分辨率为扩展层的 50%、码率为扩展层的 25%、帧率保持一致，无法自定义配置。</td>
<td>取决于推流端设置的基本层和扩展层的视频参数。</td>
</tr>
<tr>
<td>优点</td>
<td><ul><li>可以根据需要产生不同的码流或者提取出不同的码流，使用分层视频编码实现一次编码比用普通编码方式编码多次更高效。</li><li>应用更灵活。</li><li>网络适应性更强。</li></ul></td>
<td><ul><li>可以对扩展层和基本层的视频参数进行单独配置。</li><li>可以使用硬件编码，减少 CPU 性能负担。</li><li>可扩展性更好，未来可以支持多种编码标准。</li><li>通用性更好，主流软硬件编码器都支持。</li></ul></td>
</tr>
<tr>
<td>缺点</td>
<td><ul><li>压缩效率稍低：在同样的条件下，分层视频编码比普通编码方式的压缩效率低 20% 左右，即要达到和普通编码方式相同的视频质量，分层视频编码的码率比普通编码方式多 20%，分层数越多，效率下降越多。（目前 SDK 只支持 1 路基本层和 1 路扩展层）</li><li>编码效率低：分层视频编码在同样的条件下，比普通编码方式的编码计算复杂度高，所以编码效率相比普通编码方式约低 10%。</li><li>不支持硬件编码（支持硬件解码）：分层视频编码不支持硬件编码，对 CPU 的性能负担较大。</li><li>支持的编码器较少，目前只有 openH264 编码器支持。</li></ul></td>
<td>使用软件编码时，性能消耗略大于分层视频编码。</td>
</tr>
</tbody></table>

## 示例源码下载

请参考 [下载示例源码](https://doc-zh.zego.im/article/3128) 获取源码。

相关源码请查看 “/ZegoExpressExample/Examples/AdvancedVideoProcessing/EncodingAndDecoding” 目录下的文件。

## 前提条件

在实现两种视频编码功能之前，请确保：

- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppID 和 AppSign，详情请参考 [控制台 - 项目信息](/console/project-info)。
- 已在项目中集成 ZEGO Express SDK，并实现了基本的音视频推拉流功能，详情请参考 [快速开始 - 集成](https://doc-zh.zego.im/article/197) 和 [快速开始 - 实现流程](https://doc-zh.zego.im/article/7633)。



## 实现步骤

### 分层视频编码

**开启分层视频编码**

在调用 [startPublishingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoExpressEngine#start-publishing-stream) 之前，调用 [setVideoConfig](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoExpressEngine#set-video-config) 接口，设置 [ZegoVideoConfig](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~struct~ZegoVideoConfig) 类中的参数 `codecID` 为 `ZegoVideoCodecIDSVC`，开启分层视频编码；并调用 [startPublishingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoExpressEngine#start-publishing-stream) 接口开始推流。

```cpp
ZegoVideoConfig videoConfig;
videoConfig.codecID = ZEGO_VIDEO_CODEC_ID_SVC;
engine->setVideoConfig(videoConfig);

std::string streamID = "MultiLayer-1";
engine->startPublishingStream(streamID);
```

<Note title="说明">
“codecID” 设置为 “ZegoVideoCodecIDDefault”、“ZegoVideoCodecIDVP8” 或 “ZegoVideoCodecIDH265” 可关闭该功能。
</Note>

**指定拉取的分层视频**

在推流端开启了分层视频编码后，拉流端用户在拉流前后均可调用 [setPlayStreamVideoType](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoExpressEngine#set-play-stream-video-type) 接口，传入具体的拉流参数以拉取特定的视频分层。目前支持的视频分层如下：

|枚举值|说明|
|-|-|
|ZegoVideoStreamTypeDefault|（默认值）根据网络状态自动选择合适的视频分层，例如弱网只拉取基本层。|
|ZegoVideoStreamTypeSmall| 基本层，小分辨率类型。|
|ZegoVideoStreamTypeBig| 扩展层，大分辨率类型。|

```cpp
ZegoExpressSDK::getEngine()->setPlayStreamVideoType(ZegoVideoStreamTypeBig,streamID);
ZegoExpressSDK::getEngine()->startPlayingStream(streamID, canvas:playCanvas);
```

### 大小流视频编码

`大小流视频编码` 与 `分层视频编码` 的实现步骤基本一致，不同的是 `大小视频流编码` 功能支持在推流前，分别设置大流和小流的分辨率、帧率和码率等信息。

**开启大小流视频编码**

在调用 [startPublishingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoExpressEngine#start-publishing-stream) 之前，调用 [setVideoConfig](https://doc-zh.zego.im/) 接口，设置 [ZegoVideoConfig](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~struct~ZegoVideoConfig) 类中的参数 `codecID` 为 `ZEGO_VIDEO_CODEC_ID_H264_DUAL_STREAM`，开启大小流视频编码；并调用 [startPublishingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoExpressEngine#start-publishing-stream) 接口开始推流。


```cpp
ZegoVideoConfig videoConfig;
videoConfig.codecID = ZEGO_VIDEO_CODEC_ID_H264_DUAL_STREAM;
ZegoExpressSDK::getEngine()->setVideoConfig(video_config);
```

<Note title="说明">
“codecID” 设置为 “ZegoVideoCodecIDDefault”、“ZegoVideoCodecIDVP8” 或 “ZegoVideoCodecIDH265” 可关闭该功能。
</Note>

**设置基本层、扩展层的参数**

通过 [setPublishDualStreamConfig](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoExpressEngine#set-publish-dual-stream-config) 接口，分别设置大流和小流的分辨率、帧率和码率等信息，并调用 [startPublishingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoExpressEngine#start-publishing-stream) 接口开始推流。

<Warning title="注意">
- 必须同时指定大流、小流的参数，调用 [setPublishDualStreamConfig](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoExpressEngine#set-publish-dual-stream-config) 接口才能生效。
- 设置大流、小流的分辨率的 “比例” 需要保持一致，否则调用 [setPublishDualStreamConfig](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoExpressEngine#set-publish-dual-stream-config) 接口会出错。
</Warning>

```cpp
std::vector<ZegoPublishDualStreamConfig> dual_stream_config;
ZegoPublishDualStreamConfig stream_config_big;
stream_config_big.streamType = ZEGO_VIDEO_STREAM_TYPE_BIG;
stream_config_big.encodeWidth = 960;
stream_config_big.encodeHeight = 540;
stream_config_big.fps = 15;
stream_config_big.bitrate = 1200;
dual_stream_config.push_back(stream_config_big);

ZegoPublishDualStreamConfig stream_config_small;
stream_config_small.streamType = ZEGO_VIDEO_STREAM_TYPE_SMALL;
stream_config_small.encodeWidth = 320;
stream_config_small.encodeHeight = 180;
stream_config_small.fps = 15;
stream_config_small.bitrate = 300;
dual_stream_config.push_back(stream_config_small);
ZegoExpressSDK::getEngine()->setPublishDualStreamConfig(dual_stream_config, ZegoPublishChannel::ZEGO_PUBLISH_CHANNEL_MAIN);

std::string streamid = "dual_stream";
ZegoExpressSDK::getEngine()->startPublishingStream(streamid);
```

**指定拉取的视频码流**

在推流端开启了视频大小流编码后，拉流端用户在拉流前后均可调用 [setPlayStreamVideoType](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoExpressEngine#set-play-stream-video-type) 接口，传入具体的拉流参数以拉取特定的视频分层。目前支持的视频分层如下：

|枚举值|说明|
|-|-|
|ZegoVideoStreamTypeDefault|（默认值）根据网络状态自动选择合适的视频分层，例如弱网只拉取基本层。|
|ZegoVideoStreamTypeSmall| 基本层，小分辨率类型。|
|ZegoVideoStreamTypeBig| 扩展层，大分辨率类型。|

```cpp
ZegoExpressSDK::getEngine()->setPlayStreamVideoType(ZegoVideoStreamTypeBig,streamID);
ZegoExpressSDK::getEngine()->startPlayingStream(streamID, canvas:playCanvas);
```


## 常见问题

1. **转推或直推 CDN，观众从 CDN 上拉流，分层视频编码和大小流是否有效？从 CDN 拉取的流码率、分辨率是多少？**

    - `视频分层编码`和 `视频大小流编码` 使用的是 ZEGO 的私有协议，拉流端只有从 ZEGO 服务器上拉取 RTC 流或 L3 流时，才能拉取到不同分层的视频流。

    - 直推 CDN 场景下，由于不经过 ZEGO 服务器，所以码流的分层无效，SDK 会回退至 H.264 编码。从 CDN 拉取的流的分辨率和码率与推流用户设置的分辨率和码率一致。

    - 转推 CDN 场景下，由于 CDN 拉流未使用 ZEGO 的私有协议，ZEGO 服务器转推到 CDN 服务器后的流不支持分层视频编码、视频大小流编码，只能从转推基本层或者转推扩展层中选择一个，CDN 拉流时的分辨率、码率和帧率取决于转推的是基本层还是扩展层。

        <Warning title="注意">
        转推到 CDN 时，默认转推扩展层。如果业务需要将基本层转推至 CDN，请联系 ZEGO 技术支持配置。
        </Warning>
