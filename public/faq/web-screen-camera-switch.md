<Title>如何切换屏幕共享流和摄像头视频流？</Title>



- - - -

在使用 ZEGO Express Web SDK 实现屏幕共享的场景中，开发者可参考本文，在推送的屏幕共享流和摄像头采集的视频流之间进行切换。

ZEGO 推荐以下三个方法，皆以从屏幕共享流切换到摄像头视频流为例。

1. 创建两路流
2. 销毁当前流再创建流推送
3. 替换当前视频轨道

<Note title="说明">


屏幕共享流和摄像头采集的视频流互相切换的方法是一样的。

</Note>




## 创建两路流

如果开发者的实际应用场景允许同时创建两路流并推送两路流，ZEGO 推荐使用此方法：

1. 推流端创建两个 MediaStream 或者 [ZegoLocalStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoLocalStream) 实例对象，对应两路流——— `屏幕共享流` 和 `摄像头视频流`。创建流的具体实现方法请参考 [createStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#create-stream) 或者 [createZegoStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#create-zego-stream) 接口。

<Note title="说明">


    [createStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#create-stream) 接口在 Express Web SDK 3.0.0 之前版本支持，3.0.0 及以上版本废弃，并使用 [createZegoStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#create-zeg) 替代，详情请参考 [3.0.0 及以上版本升级指南](/real-time-video-web/client-sdk/upgrade-guide/upgrade-to-v3)。
    
</Note>



2. 需要从屏幕共享流切换到摄像头视频流时，根据摄像头视频流的流 ID，拉流端选择拉摄像头视频流即可成功切换。

## 销毁当前流再创建流推送

1. 调用 [stopPubliushStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#stop-publishing-stream) 取消推流，再调用 [destroyStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#destroy-stream) 接口销毁当前屏幕共享流。

2. 调用 [createStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#create-stream) 或者 [createZegoStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#create-zego-stream) 创建摄像头视频流。

3. 调用 [startPublishingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#start-publishing-stream) 接口推送摄像头视频流。

此方法的兼容性和稳定性较好，但是无法动态切换，并且切换时间较长（一到两秒左右）。

## 替换当前视频轨道

### 3.0.0 及以上版本

1. 通过调用 [createZegoStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#create-zego-stream) 接口，创建一个 [ZegoLocalStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoLocalStream) 实例对象 localStream，默认采集摄像头麦克风流。

    调用 [startPublishingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#start-publishing-stream) 接口，传入 “streamID” 和创建流得到的流对象 “localStream”，向远端用户发送本端的音视频流。

    ```js
    try {
        const localStream = await zg.createZegoStream()
        zg.startPublishingStream(streamID, localStream)
    } catch (err) {
        console.error(err)
    }
    ```

2. 推流成功后，需要将推流中的 `摄像头视频` 替换为 `共享屏幕视频`，可以通过调用 [startCaptureScreen](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoLocalStream#start-capture-screen) 接口，采集屏幕共享，再调用 [updatePublishingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#update-publishing-stream) 接口，更新推流中的视频。

    ```js
    try {
        await localStream.startCaptureScreen()
        zg.updatePublishingStream(localStream, 0)
    } catch (err) {
        console.error(err)
    }
    ```

### 3.0.0 版本前

调用 [replaceTrack](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#replace-track) 接口将音视频流中的视频轨道替换为摄像头视频流。

<Warning title="注意">


如果是从摄像头视频流切换成屏幕共享流，替换为屏幕共享流后，编码帧率会下降为 5 fps。

</Warning>




此方法可以实现动态切换，并且切换速度快，但是 [replaceTrack](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#replace-track) 接口限制较多：

- 仅支持 Chrome 65+，Safari 以及最新版 Firefox 浏览器。
- 部分移动设备上可能不生效。
- 使用前需先通过 [createStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#create-stream) 创建屏幕共享流和摄像头视频流。


## 相关参考

- [实时音视频 - 屏幕共享](/real-time-video-web/video/screen-sharing)
- [实时音视频 - 实现流程](/real-time-video-web/quick-start/implementing-video-call)
