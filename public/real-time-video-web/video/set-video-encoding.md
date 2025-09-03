# 设置视频编码方式

- - -

## 功能简介

在开发者推拉视频流时，可对编解码进行详细设置，可启用视频大小流编码方式。

### 视频大小流编码

视频大小流编码将码流分为基本层和扩展层，这种编码方式可以为不同网络状态的用户提供更好的体验，也称大小流。

基本层保证了最基本的视频质量，而扩展层则是对基本层的补充。对于网络较好的用户，可同时拉取基本层和扩展层获得更好的体验，对于网络状态较差的用户，只拉取基本层可以保证基本的视频质量。

当开发者在连麦或混流业务中出现以下情况时，推荐使用视频大小流编码功能：

- 需要不同终端显示不同质量的视频流。
- 需要在较差的网络环境中保持连麦的流畅。
- 需要根据网络状态自适应拉取视频流的质量。

<Note title="说明">

视频大小流编码使用的是 ZEGO 的私有协议，拉流端只有从 ZEGO 服务器上才能拉取到不同分层的视频流。

</Note>




## 实现步骤

如需使用视频大小流编码，需要先在推流前，开启视频大小流编码，然后在拉流时，指定要拉取的分层视频，详细步骤如下。

<Note title="说明">
最初创建的流，默认为大流。
</Note>




### 开启小流编码

在推流（[startPublishingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#start-publishing-stream)）前，调用 [enableDualStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#enable-dual-stream) 接口，开启或关闭视频小流编码功能。

```javascript
// 开启小流
zg.enableDualStream(localStream);
```

### 设置小流视频参数

可根据需要，在推流（[startPublishingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#start-publishing-stream)）和 调用 [enableDualStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#enable-dual-stream)开启小流前，调用 [setLowStreamParameter](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#set-low-stream-parameter) 接口设置小流分辨率、帧率及宽高。

<Warning title="注意">


- 小流各项参数不能大于大流。 
- 部分浏览器不支持大小流模式，如：macOS Safari 16 版本使用 H264 编码格式时，不支持推送小流，此时您可以切换 VP8 编码或更新浏览器版本，也可尝试切换其他浏览器。

</Warning>





```javascript

zg.setLowStreamParameter(localStream, {width: 320, height: 240, frameRate: 15, bitRate: 400});

```

### 拉流端指定要拉取的分层视频

在推流端开启了视频大小流编码后，拉流端在拉流调用 [startPlayingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#start-playing-stream) 接口时，可在可选拉流参数 `streamType` 中，选择指定的视频分层类型，此时拉流端默认会根据网络情况，拉取合适的视频分层，例如，弱网只拉取基本层。

开发者也可以传入具体的拉流参数，以拉取特定的视频分层，目前支持的视频分层如下：

|枚举值|说明|
|-|-|
|0|小流类型|
|1|大流类型|
|2|根据网络状态自动切换大小流|

以拉取基础层为例：

```javascript
// 拉取小流
zg.startPlayingStream("streamID", {streamType: 0});
```


## 常见问题


<Accordion title="什么是大小流？" defaultOpen="false">

大小流即分层视频编码，用户在接收端拉流前，根据自己的网络状况，可以调用 startPlayingStream 时设置 streamType 选择大小流，也可以设置为传入默认或则不传参，让 ZEGO 帮您自动选择。

</Accordion>


<Accordion title="视频大小流编码拉取基本层和扩展层码率、分辨率等参数有区别吗？" defaultOpen="false">

视频大小流编码基本层的分辨率宽高默认为 160 x 120，帧率为 15，码率 50kbps，可根据需要通过 setLowStreamParameter 修改小流参数，小流参数均不能大于大流参数。

</Accordion>


<Accordion title="转推或直推 CDN，观众从 CDN 上拉流，视频大小流编码是否有效？从 CDN 拉取的流码率、分辨率是多少？" defaultOpen="false">

视频大小流编码使用的是 ZEGO 的私有协议，拉流端只有从 ZEGO 服务器上才能拉取到不同分层的视频流。

- 转推 CDN 场景下，推流端推送到 ZEGO 服务器的流可以使用视频大小流编码，从 ZEGO 服务器也可以拉取到视频大小流编码的流。但是 ZEGO 服务器转推到 CDN 服务器的流无法使用视频大小流编码，而会是高质量的流。从 CDN 拉取的流与视频大小流编码中扩展层的码率、分辨率一致。
- 直推 CDN 场景下，由于不经过 ZEGO 服务器，所以视频大小流编码无效。从 CDN 拉取的流的分辨率和码率与推流用户设置的分辨率和码率一致。

</Accordion>


## 相关文档

[如何解决 Web 平台和 Native 平台互通时出现的画面异常问题（如黑屏、绿屏、花屏等）？](https://doc-zh.zego.im/faq/web_native_video)
