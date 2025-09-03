<Title>摄像头支持的情况下，预览设置 1920 * 1080，但实际推流只有 640 * 480，该如何处理？</Title>



- - -


## 问题原因

在调用 [createStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#create-stream)  接口创建并推一条流之前，并未销毁之前的预览视频流。因此用户通过 `getusermedia` 接口检测当前推流的分辨率会降低。

## 解决方案

在调用 SDK 接口 [createStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#create-stream) 创建流之前，请先调用 [destroyStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#destroy-stream) 接口销毁之前的预览视频流。