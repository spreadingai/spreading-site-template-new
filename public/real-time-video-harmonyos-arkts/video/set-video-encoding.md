# 设置视频编码方式

- - -

## 功能简介

在开发者推拉视频流时，可对编解码进行详细设置，包括开启分层视频编码、使用硬件编解码。

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


视频大小流编码，与分层视频编码的共同作用是将码流分为 “基本层” 和 “扩展层”，为不同网络状态、不同设备性能的用户提供更好的体验。

不同的是，分层视频编码使用 1 个编码器编出基本层和扩展层的码流；视频大小流编码使用 2 个编码器分别编出基本层和扩展层的码流。

<Note title="说明">


分层视频编码使用的是 ZEGO 的私有协议，拉流端只有从 ZEGO 服务器上才能拉取到不同分层的视频流。

</Note>




### 硬件编解码

开发者可选择开启硬件编码和硬件解码。开启硬件编解码后会使用 GPU 进行编解码，降低 CPU 使用率。若某些机型在推或拉大分辨率音视频流时设备发热严重，可开启硬件编解码。

## 示例源码下载

请参考 [下载示例源码](https://doc-zh.zego.im/article/19408) 获取源码。

相关源码请查看 “/pages/Topics/QuickStart/” 目录下的文件 QuickStart.ets。

## 前提条件

在实现视频编解码功能之前，请确保：

- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppID 和 AppSign，详情请参考 [控制台 - 项目信息](/console/project-info)。
- 已在项目中集成 ZEGO Express SDK，并实现了基本的音视频推拉流功能，详情请参考 [快速开始 - 集成](https://doc-zh.zego.im/article/19409) 和 [快速开始 - 实现流程](https://doc-zh.zego.im/article/19410)。


## 实现步骤

### 分层视频编码

如果您使用分层视频编码，需要以下两个步骤。

**开启分层视频编码**

在推流（[startPublishingStream](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/ets_ohos/classes/_zegoexpressengine_.zegoexpressengine.html#startpublishingstream)）前，调用 [setVideoConfig](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/ets_ohos/classes/_zegoexpressengine_.zegoexpressengine.html#setvideoconfig) 接口，并设置 [ZegoVideoConfig](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/ets_ohos/classes/_zegoexpressdefines_.zegovideoconfig.html) 类中的参数 “codecID” 为 ZegoVideoCodecID.SVC，开启分层视频编码功能。

```ts
let videoConfig = new ZegoVideoConfig();
videoConfig.codecID = ZegoVideoCodecID.SVC;
this.ZegoExpressInstance.setVideoConfig(videoConfig, ZegoPublishChannel.Main);

let publisherConfig = new ZegoPublisherConfig();
this.ZegoExpressInstance.startPublishingStream(this.currentStreamID, publisherConfig, ZegoPublishChannel.Main);
```

**指定要拉取的分层视频**

在推流端开启了分层视频编码后，拉流端在拉流前后均可调用 [setPlayStreamVideoType](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/ets_ohos/classes/_zegoexpressengine_.zegoexpressengine.html#setplaystreamvideotype) 接口，拉取指定分层的视频。

拉流端默认会根据网络情况拉取合适的视频分层，例如弱网只拉取基本层。开发者也可以传入具体的拉流参数以拉取特定的视频分层，目前支持的视频分层如下：

|枚举值|说明|
|-|-|
|ZegoVideoStreamType.Default|（默认值）根据网络状态自动选择合适的视频分层，例如弱网只拉取基本层。|
|ZegoVideoStreamType.Small| 基本层，小分辨率类型。|
|ZegoVideoStreamType.Big| 扩展层，大分辨率类型。|

以拉取扩展层为例：

```ts
this.ZegoExpressInstance.setPlayStreamVideoType(this.currentStreamID, ZegoVideoStreamType.Big);
let view = new ZegoView();
view.view = this.playView;
let playerConfig = new ZegoPlayerConfig();
playerConfig.resourceMode = ZegoStreamResourceMode.Default;
this.ZegoExpressInstance.startPlayingStream(this.currentPlayStreamID, view, playerConfig);
```

### 视频大小流编码

`大小流视频编码` 与 `分层视频编码` 的实现步骤基本一致，不同的是 `大小视频流编码` 功能支持在推流前，分别设置大流和小流的分辨率、帧率和码率等信息。

**开启视频大小流编码**

在推流（[startPublishingStream](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/ets_ohos/classes/_zegoexpressengine_.zegoexpressengine.html#startpublishingstream)）前，调用 [setVideoConfig](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/ets_ohos/classes/_zegoexpressengine_.zegoexpressengine.html#setvideoconfig) 接口，并设置 [ZegoVideoConfig](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/ets_ohos/classes/_zegoexpressdefines_.zegovideoconfig.html) 类中的参数 “codecID” 为 ZegoVideoCodecID.H264DualStream，开启分层视频编码功能。

```ts
let videoConfig = new ZegoVideoConfig();
videoConfig.codecID = ZegoVideoCodecID.H264DualStream;
this.ZegoExpressInstance.setVideoConfig(videoConfig, ZegoPublishChannel.Main);

let publisherConfig = new ZegoPublisherConfig();
this.ZegoExpressInstance.startPublishingStream(this.currentStreamID, publisherConfig, ZegoPublishChannel.Main);
```

**设置基本层、扩展层的参数**

通过 [setPublishDualStreamConfig](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/ets_ohos/classes/_zegoexpressengine_.zegoexpressengine.html#setpublishdualstreamconfig) 接口，分别设置大流和小流的分辨率、帧率和码率等信息，并调用 [startPublishingStream](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/ets_ohos/classes/_zegoexpressengine_.zegoexpressengine.html#startpublishingstream) 接口开始推流。

<Warning title="注意">


- 必须同时指定大流、小流的参数，调用 [setPublishDualStreamConfig](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/ets_ohos/classes/_zegoexpressengine_.zegoexpressengine.html#setpublishdualstreamconfig) 接口才能生效。
- 设置大流、小流的分辨率的 “比例” 需要保持一致，否则调用 [setPublishDualStreamConfig](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/ets_ohos/classes/_zegoexpressengine_.zegoexpressengine.html#setpublishdualstreamconfig) 接口会出错。

</Warning>



```ts
// 设置大流
let bigStreamConfig = new ZegoPublishDualStreamConfig();
bigStreamConfig.streamType = ZegoVideoStreamType.Big;
bigStreamConfig.encodeWidth = this.currentCodeResolutionW;
bigStreamConfig.encodeHeight = this.currentCodeResolutionH;
bigStreamConfig.fps = this.currentVideoFps;
bigStreamConfig.bitrate = this.currentVideoBitrate;

// 设置小流
let smallStreamConfig = new ZegoPublishDualStreamConfig();
smallStreamConfig.streamType = ZegoVideoStreamType.Small;
smallStreamConfig.encodeWidth = this.currentSmallCodeResolutionW;
smallStreamConfig.encodeHeight = this.currentSmallCodeResolutionH;
smallStreamConfig.fps = this.currentSmallVideoFps;
smallStreamConfig.bitrate = this.currentSmallVideoBitrate;

let configList: ZegoPublishDualStreamConfig[] = [];
configList.push(bigStreamConfig)
configList.push(smallStreamConfig)
this.ZegoExpressInstance.setPublishDualStreamConfig(configList);

// 推流
let publisherConfig = new ZegoPublisherConfig();
this.ZegoExpressInstance.startPublishingStream(this.currentStreamID, publisherConfig, ZegoPublishChannel.Main);
```

**指定要拉取的分层视频**

在推流端开启了视频大小流编码后，拉流端在拉流前后均可调用 [setPlayStreamVideoType](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/ets_ohos/classes/_zegoexpressengine_.zegoexpressengine.html#setplaystreamvideotype) 接口，拉取指定分层的视频。

拉流端默认会根据网络情况拉取合适的视频分层，例如弱网只拉取基本层。开发者也可以传入具体的拉流参数以拉取特定的视频分层，目前支持的视频分层如下：

|枚举值|说明|
|-|-|
|ZegoVideoStreamType.Default|（默认值）根据网络状态自动选择合适的视频分层，例如弱网只拉取基本层。|
|ZegoVideoStreamType.Small| 基本层，小分辨率类型。|
|ZegoVideoStreamType.Big| 扩展层，大分辨率类型。|

以拉取扩展层为例：

```ts
this.ZegoExpressInstance.setPlayStreamVideoType(this.currentStreamID, ZegoVideoStreamType.Big);
let view = new ZegoView();
view.view = this.playView;
let playerConfig = new ZegoPlayerConfig();
playerConfig.resourceMode = ZegoStreamResourceMode.Default;
this.ZegoExpressInstance.startPlayingStream(this.currentPlayStreamID, view, playerConfig);
```

### 硬件编解码

**开启硬件编码**
在 [createEngine] 之后，在开始预览和推流之前开启硬件编码

```ts
this.ZegoExpressInstance.enableHardwareEncoder(true);
```

**开启硬件解码**
在 [createEngine] 之后，在开始拉流之前开启硬件解码

```ts
this.ZegoExpressInstance.enableHardwareDecoder(true);
```

### 设置视频编码方式

在推流（[startPublishingStream](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/ets_ohos/classes/_zegoexpressengine_.zegoexpressengine.html#startpublishingstream)）前调用 [setVideoConfig](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/ets_ohos/classes/_zegoexpressengine_.zegoexpressengine.html#setvideoconfig) 接口设置 “ZegoVideoConfig” 类下的参数 “codecID”，即可设置视频编码方式。目前支持的视频编码方式如下：

<table>

<tbody><tr>
<th>枚举值</th>
<th>编码方式（软件编码）</th>
<th>说明</th>
</tr>
<tr>
<td>ZegoVideoCodecID.Default</td>
<td>默认编码（H.264）</td>
<td>H.264 是被广泛使用的高精度视频的录制、压缩和发布格式，拥有很好的兼容性。</td>
</tr>
<tr>
<td>ZegoVideoCodecID.SVC</td>
<td>分层视频编码（H.264 SVC）</td>
<td>启动 1 个编码器分别编出不同的参数的码流，作为码流的基本层和扩展层。</td>
</tr>
<tr>
<td>ZegoVideoCodecID.VP8</td>
<td>VP8</td>
<td>常用于 Web 视频，但不能用在 CDN 录制场景中，否则会造成录制文件异常。</td>
</tr>
<tr>
<td>ZegoVideoCodecID.H265</td>
<td>H.265</td>
<td>与 H.264 相比，拥有更好的压缩率，但使用时需要考虑兼容性。</td>
</tr>
<tr>
<td>ZegoVideoCodecID.H264DualStream</td>
<td>视频大小流编码（H.264 DualStream）</td>
<td>启动 2 个编码器分别编出不同的参数的码流，作为码流的基本层和扩展层。<br />适用于 SVC 不满足业务需要的场景（例如：希望同时使用硬件编码）。</td>
</tr>
</tbody></table>

- 一般情况下使用默认编码即可。
- 在同等分辨率帧率的情况下，需要降低码率，可以采用 H.265。
- 在需要与小程序互通时，需要使用 H.264。

以设置编码方式为 H.265 为例：

```ts
let videoConfig = new ZegoVideoConfig();
videoConfig.codecID = ZegoVideoCodecID.H265;
this.ZegoExpressInstance.setVideoConfig(videoConfig, ZegoPublishChannel.Main);

let publisherConfig = new ZegoPublisherConfig();
this.ZegoExpressInstance.startPublishingStream(this.currentStreamID, publisherConfig, ZegoPublishChannel.Main);
```
