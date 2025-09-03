# 媒体补充增强信息（SEI）

- - -

## 功能简介

在音视频流媒体应用中，除了可以通过流媒体通道推拉音视频内容外，还可以使用流 SEI（Supplemental Enhancement Information，媒体补充增强信息）通过流媒体通道将文本信息与音视频内容打包在一起，从主播端（推流端）推出，并从观众端（拉流端）接收，以此实现文本数据与音视频内容的精准同步的目的。

一般可用于视频画面的精准布局、远端歌词同步、直播答题等应用场景。

<Note title="说明">


SEI 的相关概念及原理请参考 [如何理解和使用 SEI（媒体补充增强信息）](https://doc-zh.zego.im/faq/sei?product=ExpressVideo&platform=web)。

</Note>



## 前提条件

在实现 SEI 功能之前，请确保：

- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppID 和 AppSign，详情请参考 [控制台 - 项目信息](/console/project-info)。
- 已在项目中集成 ZEGO Express SDK，并实现了基本的音视频推拉流功能，详情请参考 [快速开始 - 集成](https://doc-zh.zego.im/article/19523) 和 [快速开始 - 实现流程](https://doc-zh.zego.im/article/19524)。


## 使用步骤

发送与接收 SEI 信息功能，需要在推流端发送 SEI 信息，在拉流端接收 SEI 信息，如下图所示：

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Common/ZegoExpressEngine/send_and_recv_sei_Andriod_new.png" /></Frame>

推流端：

1. 调用 [loginRoom](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/ets_ohos/classes/_zegoexpressengine_.zegoexpressengine.html#loginroom) 接口登录房间。
2. 调用 [startPublishingStream](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/ets_ohos/classes/_zegoexpressengine_.zegoexpressengine.html#startpublishingstream) 接口推流。
3. 在推流成功后，调用 [sendSEI](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/ets_ohos/classes/_zegoexpressengine_.zegoexpressengine.html#sendsei) 接口发送 SEI 信息。

拉流端：

1. 创建 [ZegoEventListener](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/ets_ohos/interfaces/_zegoexpresseventhandler_.zegoeventlistener.html) 对象，并重写接收 SEI 信息的 [onPlayerRecvSEI](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/ets_ohos/interfaces/_zegoexpresseventhandler_.zegoeventlistener.html#onplayerrecvsei) 方法。
2. 调用 [loginRoom](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/ets_ohos/classes/_zegoexpressengine_.zegoexpressengine.html#loginroom) 接口登录房间。
3. 调用 [startPlayingStream](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/ets_ohos/classes/_zegoexpressengine_.zegoexpressengine.html#startplayingstream) 接口拉流。
4. 在拉流成功后，接收到推流端发送的 SEI 信息之后触发 [onPlayerRecvSEI](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/ets_ohos/interfaces/_zegoexpresseventhandler_.zegoeventlistener.html#onplayerrecvsei) 回调。

<Warning title="注意">


- SDK 目前支持在 H.264 编码的视频中进行传输 SEI 信息。
- 推流时，若调用 [enableCamera](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/ets_ohos/classes/_zegoexpressengine_.zegoexpressengine.html#enablecamera) 接口关闭摄像头采集，将不会发送 SEI 数据。
- 拉流时，如果只拉纯音频或调用 [mutePlayStreamVideo](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/ets_ohos/classes/_zegoexpressengine_.zegoexpressengine.html#muteplaystreamvideo) 接口停止拉取视频流时，将无法接收 SEI 信息。

</Warning>



### 1 推流方

推流成功之后，调用 [sendSEI](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/ets_ohos/classes/_zegoexpressengine_.zegoexpressengine.html#sendsei) 发送 SEI 信息。

```ts
// utf8 编码格式
let arrayBuffer:ArrayBuffer = Utils.utf8DecoderToBuf(this.seiMessage);
this.ZegoExpressInstance.sendSEI(arrayBuffer, ZegoPublishChannel.Main);
```

### 2 拉流方

在拉流成功之后，通过 [onPlayerRecvSEI](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/ets_ohos/interfaces/_zegoexpresseventhandler_.zegoeventlistener.html#onplayerrecvsei) 回调接收 SEI 信息。

```ts
this.ZegoExpressInstance.on('onPlayerRecvSEI', (streamID: string, data: ArrayBuffer) => {
    let utf8Data = Utils.utf8Decode(data)
    this.logInfo('onPlayerRecvSEI. streamID: ' + streamID + ', data: '  + utf8Data)
})
```

<Content />

