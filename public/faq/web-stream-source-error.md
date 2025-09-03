<Title>Web 平台 SDK 推流报错 “stream not from zego”，该如何处理？</Title>



- - -

请按照以下步骤处理：

1. 首先调用 [createStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#create-stream) 或 [createZegoStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#create-zeg) 接口，获取媒体流对象或 [ZegoLocalStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoLocalStream) 实例对象。
2. 由于 [createStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#create-stream)/[createZegoStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#create-zeg) 接口是异步操作，请确保在 `then` 或者 `await` 之后，再去调用 [startPublishingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#start-publishing-stream) 推流。

<Note title="说明">


[createStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#create-stream) 接口在 Express Web SDK 3.0.0 之前版本支持，3.0.0 及以上版本废弃，并使用 [createZegoStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#create-zeg) 替代，详情请参考 [3.0.0 及以上版本升级指南](/real-time-video-web/client-sdk/upgrade-guide/upgrade-to-v3)。

</Note>



