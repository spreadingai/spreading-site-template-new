# 设置视频编码方式

- - -

## 功能简介

在开发者推拉视频流时，可对编解码进行详细设置，包括启用分层视频编码（大小流）、使用硬件编解码和设置编码方式。

### 分层视频编码（大小流）

分层视频编码将码流分为基本层和扩展层，这种编码方式可以为不同网络状态的用户提供更好的体验，也称大小流。基本层保证了最基本的视频质量，而扩展层则是对基本层的补充。对于网络较好的用户，可只拉取扩展层获得更好的体验，对于网络状态较差的用户，只拉取基本层可以保证基本的视频质量。

当开发者在连麦或混流业务中出现以下情况时，推荐使用分层视频编码功能：

- 需要不同终端显示不同质量的视频流。
- 需要在较差的网络环境中保持连麦的流畅。
- 需要根据网络状态自适应拉取视频流的质量。

<Note title="说明">
分层视频编码使用的是 ZEGO 的私有协议，拉流端只有从 ZEGO 服务器上才能拉取到不同分层的视频流。
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

请参考 [下载示例源码](https://doc-zh.zego.im/article/21044) 获取源码。

相关源码请查看 “/pages/example/advance-video/video-codec.nvue” 目录下的文件。

## 前提条件

在实现视频编解码功能之前，请确保：

- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppID 和 AppSign，详情请参考 [控制台 - 项目信息](/console/project-info)。
- 已在项目中集成 ZEGO Express SDK，并实现了基本的音视频推拉流功能，详情请参考 [快速开始 - 集成](https://doc-zh.zego.im/article/21045) 和 [快速开始 - 实现流程](https://doc-zh.zego.im/article/21030)。


## 实现步骤

### 1 分层视频编码

使用分层视频编码需要以下两个步骤：

- 推流前通过指定特定的编码器来开启分层视频编码。
- 拉流时指定要拉取的分层视频。

#### 开启分层视频编码

在推流（[startPublishingStream](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/classes/_zegoexpressengine_.zegoexpressengine.html#startpublishingstream)）前调用 [setVideoConfig](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/classes/_zegoexpressengine_.zegoexpressengine.html#setvideoconfig) 设置 [ZegoVideoConfig](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/classes/_zegoexpressdefines_.zegovideoconfig.html) 类中的参数 “codecID”，即可开启/关闭分层视频编码功能。

<Warning title="注意">

目前 Web 只支持设置 `ZegoVideoCodecID.Default` 及 `ZegoVideoCodecID.VP8`。

</Warning>




- “codecID” 设置为 “ZegoVideoCodecID.SVC”，可以开启该功能。
- “codecID” 设置为 “ZegoVideoCodecID.Default”、“ZegoVideoCodecID.VP8” 或 “ZegoVideoCodecID.H265” 可关闭该功能。

```javascript
let videoConfig = {};
videoConfig.codecID = ZegoVideoCodecID.SVC;
ZegoExpressEngine.instance().setVideoConfig(videoConfig);

let streamID = "MultiLayer-1";
ZegoExpressEngine.instance().startPublishingStream(streamID);
```

#### 指定要拉取的分层视频

在推流端开启了分层视频编码后，拉流端在拉流前后均可调用 [setPlayStreamVideoType](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/classes/_zegoexpressengine_.zegoexpressengine.html#setplaystreamvideotype) 接口，拉流端默认会根据网络情况拉取合适的视频分层，例如弱网只拉取基本层。开发者也可以传入具体的拉流参数以拉取特定的视频分层，目前支持的视频分层如下：

<Warning title="注意">

Web 目前不支持指定要拉取的分层视频。

</Warning>

|枚举值|说明|
|-|-|
|ZegoVideoStreamType.Default|根据网络状态选择图层|
|ZegoVideoStreamType.Small|小分辨率类型|
|ZegoVideoStreamType.Big|大分辨率类型|

以拉取扩展层为例：

```javascript
ZegoExpressEngine.instance().setPlayStreamVideoType(playStreamID,ZegoVideoStreamType.Big);
ZegoExpressEngine.instance().startPlayingStream(playStreamID);
```

### 2 硬件编解码

由于少部分机型设备对硬件编码/解码的支持不佳，SDK 默认使用软件编码与软件解码的方式，若开发者有使用硬件编码的需求，可参照本节自行设置。

<Warning title="注意">

Web 目前不支持硬件编解码。

</Warning>



#### 开启硬件编码

<Warning title="注意">

该功能需在推流前设置才能生效，如果在推流后设置，停止推流后重新推流才可以生效。

</Warning>



若开发者需要开启硬件编码，可调用 [enableHardwareEncoder](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/classes/_zegoexpressengine_.zegoexpressengine.html#enablehardwareencoder) 接口。

```javascript
// 开启硬件编码
ZegoExpressEngine.instance().enableHardwareEncoder(true);
```

#### 开启硬件解码

<Warning title="注意">


该功能需在拉流前设置才能生效，如果在拉流后设置，停止拉流后重新拉流才可以生效。

</Warning>



若开发者需要开启硬件解码，可调用 [enableHardwareDecoder](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/classes/_zegoexpressengine_.zegoexpressengine.html#enablehardwaredecoder) 接口。

```javascript
// 开启硬件解码
ZegoExpressEngine.instance().enableHardwareDecoder(true);
```

### 3 设置视频编码方式

在推流（[startPublishingStream](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/classes/_zegoexpressengine_.zegoexpressengine.html#startpublishingstream)）前调用 [setVideoConfig](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/classes/_zegoexpressengine_.zegoexpressengine.html#setvideoconfig) 接口设置 “ZegoVideoConfig” 类下的参数 “codecID”，即可设置视频编码方式。目前支持的视频编码方式如下：

<Warning title="注意">


目前 Web 仅支持 H.264、VP8，其他编码方式暂不支持。

</Warning>



|枚举值|编码方式|使用场景|
|-|-|-|
|ZegoVideoCodecID.Default|默认编码（H.264）|H.264 是被广泛使用的高精度视频的录制、压缩和发布格式，拥有很好的兼容性。|
|ZegoVideoCodecID.SVC|分层编码 （H.264 SVC）|需要使用分层编码的场景。|
|ZegoVideoCodecID.VP8|VP8|常用于 Web 视频，但不能用在 CDN 录制场景中，否则会造成录制文件异常。|
|ZegoVideoCodecID.H265|H.265|拥有更好的压缩率，但需考虑兼容性。|

以设置编码方式为 H.265 为例：

```javascript
let videoConfig = {};
videoConfig.codecID = ZegoVideoCodecID.H265;
ZegoExpressEngine.instance().setVideoConfig(videoConfig);

let streamID = "MultiLayer-1";
ZegoExpressEngine.instance().startPublishingStream(streamID);
```

## API 参考列表

|方法 | 描述  |
| ---- | ---- |
| [setVideoConfig ](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/classes/_zegoexpressengine_.zegoexpressengine.html#setvideoconfig) | 设置视频参数 |
|[enableHardwareEncoder](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/classes/_zegoexpressengine_.zegoexpressengine.html#enablehardwareencoder)|开/关硬件编码|
|[enableHardwareDecoder](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/classes/_zegoexpressengine_.zegoexpressengine.html#enablehardwaredecoder)|开/关硬件解码|

## 常见问题

1. **什么是大小流？**

大小流即分层视频编码，用户在接收端拉流前，根据自己的网络状况，可以调用 setPlayStreamVideoType 设置为 ZegoVideoStreamTypeSMALL（小流）或者 ZegoVideoStreamTypeBIG（大流），也可以设置为 ZegoVideoStreamTypeDEFAULT，让 ZEGO 帮您自动选择。


2. **分层视频编码拉取基本层和扩展层码率、分辨率等参数有区别吗？**

分层视频编码基本层的分辨率宽高分别是扩展层的 50%，拉取基本层的码率大约为拉取扩展层码率的 25%，其他参数一致。

<Warning title="注意">
分层视频编码只会拉取一层，网络情况良好时，只拉扩展层，网络情况不好时，只拉取基础层。
</Warning>
```
例如，用户设置编码分辨率为 “800 × 600”，则扩展层分辨率为 “800 × 600”，基本层分辨率为 “400 × 300”。
```

3. **转推或直推 CDN，观众从 CDN 上拉流，分层视频编码是否有效？从 CDN 拉取的流码率、分辨率是多少？**

- 分层视频编码使用的是 ZEGO 的私有协议，拉流端只有从 ZEGO 服务器上才能拉取到不同分层的视频流。

- 转推 CDN 场景下，推流端推送到 ZEGO 服务器的流可以使用分层视频编码，从 ZEGO 服务器也可以拉取到分层视频编码的流。但是 ZEGO 服务器转推到 CDN 服务器的流无法使用分层视频编码，而会是高质量的流。从 CDN 拉取的流与分层视频编码中扩展层的码率、分辨率一致。

- 直推 CDN 场景下，由于不经过 ZEGO 服务器，所以分层视频编码无效。从 CDN 拉取的流的分辨率和码率与推流用户设置的分辨率和码率一致。

4. **分层视频编码的优缺点?**

| 优点| 缺点 |
| -- | -- |
| <ul><li>分层视频编码可以根据需要产生不同的码流或者提取出不同的码流，使用分层视频编码实现一次编码比用普通编码方式编码多次更高效。</li><li>分层视频编码应用更灵活。</li><li>分层视频编码网络适应性更强。</li></ul> | <ul><li>压缩效率稍低：在同样的条件下，分层视频编码比普通编码方式的压缩效率要低 20% 左右，也就是说要达到和普通编码方式相同的视频质量，分层视频编码的码率要比普通编码方式多 20%，分层数越多，效率下降越多。（目前 SDK 只支持 1 路基本层和 1 路扩展层）</li><li>编码效率低：分层视频编码在同样的条件下，比普通编码方式的编码计算复杂度高，所以编码效率相比普通编码方式约低 10%。</li><li>不支持硬件编码：分层视频编码不支持硬件编码，对 CPU 的性能负担较大，支持硬件解码。</li></ul> |

<Content />

