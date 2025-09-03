# 3.0.0 及以上版本升级指南

- - -

<Warning title="注意">
- 如果您当前的 SDK 低于 3.0.0 版本，需要升级到任一 3.0.0 或以上的 SDK 版本时，都请务必阅读本文。
- 此外，建议您根据**当前版本号**与**升级目标版本号**，参考 [发布日志](https://doc-zh.zego.im/article/12550) 中两个版本区间的变更说明，检查您的业务相关接口。
</Warning>

Express SDK 3.0.0 版本优化了 SDK 的内部逻辑，提高了 SDK 稳定性、音视频通话质量、以及 API 接口的易用性，ZEGO 强烈推荐您使用 3.0.0 或以上版本的 SDK。

本文将介绍 Express SDK 版本升级至 3.0.0 及以上版本时的说明和注意事项。

## 废弃说明

以下接口将于 3.0.0 版本正式废弃，请您及时更新您的代码逻辑，避免影响您的业务正常使用。

|废弃接口| 废弃说明|
|--|--|
|[createStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#create-stream) |创建推流数据源，包括摄像头麦克风采集源数据，屏幕共享数据，第三方源数据等。此函数在 3.0.0 版本废弃，请使用 [createZegoStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#create-zego-stream) 来实现原来的功能。|
|[createLocalStreamView](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#create-local-stream-view) |<p>创建本地媒体流播放器组件实例对象。此函数在 3.0.0 版本废弃，您可以：</p><ol><li>通过 [createZegoStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#create-zego-stream) 接口，创建实例对象 zegoLocalStream。</li><li>调用 zegoLocalStream 实例的 [playVideo](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoStreamView#play-video)、[playAudio](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoStreamView#play-audio) 接口，播放待推送或者已经成功推流的音视频。</li><li>调用 [playCaptureVideo](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoLocalStream#play-capture-video)、[playCaptureAudio](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoLocalStream#play-capture-audio) 接口，播放最新采集的音视频。</li></ol>|
|<ul><li>[addTrack](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#add-track)</li><li>[replaceTrack](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#replace-track)</li><li>[removeTrack](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#remove-track)</li></ul>|<p>添加、替换、移除音视频轨道。此类函数在 3.0.0 版本废弃，您可以：</p><ol><li>通过 [createZegoStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#create-zego-stream) 接口，创建实例对象 zegoLocalStream。</li><li>调用 zegoLocalStream 实例的 [startCaptureCamera](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoLocalStream#start-capture-camera)、[startCaptureCustomVideo](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoLocalStream#start-capture-custom-video)、[startCaptureMicrophone](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoLocalStream#start-capture-microphone) 等接口，更新 zegoLocalStream 采集预览的音视频。</li><li>调用 [updatePublishingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#update-publishing-stream) 接口，同步推流中的 zegoLocalStream 的音视频。</li></ol>|


## 变更示例代码

您可以参考以下示例代码，更新您的代码逻辑。

### 3.0.0 版本前

```js
// 默认创建摄像头麦克风流
const stream = zg.createStream()

// 创建媒体流播放组件
const viewer = zg.createLocalStreamView(stream);
// 播放媒体流
viewer.play(divElem);

// 推流
zg.startPublishingStream(publishID, stream);

// 创建第三方音视频流
const customStream = await zg.createStream({
        custom: {
            source: $('#customVideo')[0]
        }
    })
// 替换 stream 的预览视轨，且同步更新推流
const videoTrack = customStream.getVideoTracks()[0]
await zg.replaceTrack(stream, videoTrack)

// 替换 stream 的预览音轨，且同步更新推流
const audioTrack1 = customStream.getAudioTracks()[0]
await zg.replaceTrack(stream, audioTrack1)

// 移除 stream 的预览音轨，且同步更新推流
const audioTrack2 = stream.getAudioTracks()[0]
await zg.removeTrack(stream, audioTrack2)

// 增加 stream 的预览音轨，且同步更新推流
const stream2 = await zg.createStream({camera: {video: false, audio: true}});
const audioTrack3 = stream2.getAudioTracks()[0]
await zg.addTrack(stream2, audioTrack3)
```

### 3.0.0 及以上版本

```js
// 默认创建摄像头麦克风流
const zegoLocalStream = await zg.createZegoStream()

// 播放当前最新采集的视频、音频
zegoLocalStream.playCaptureVideo(divElem);
zegoLocalStream.playCaptureAudio();

// 播放待推送或者已经处于推流中的视频、音频，推流成功后，zegoLocalStream后续的采集不会同步更新到推流，更新需要调用updatePublishingStream
zegoLocalStream.playVideo(divElem);
zegoLocalStream.playAudio();

// 推流
zg.startPublishingStream(publishID, zegoLocalStream);

// 采集第三方音视频流
const result1 = await zegoLocalStream.startCaptureCustomVideo({
    source: $('#customVideo')[0]
})
// 更新推流为最新采集到第三方视频流, 0为更新视频流
await zg.updatePublishingStream(zegoLocalStream, 0)

// 采集第三方音频流
const result2 = await zegoLocalStream.startCaptureCustomAudio({
    source: $('#externerAudio')[0]
})

// 更新推流为最新采集到第三方音频流, 1为更新音频流
await zg.updatePublishingStream(zegoLocalStream, 1)


// 采集麦克风音频流
const result3 = await zegoLocalStream.startCaptureMicrophone()

// 更新推流为最新采集到麦克风音频流, 1为更新音频流
await zg.updatePublishingStream(zegoLocalStream, 1)

// 停止采集视频，同步更新推流
zegoLocalStream.stopCaptureVideo();

//停止采集音频，同步更新推流
zegoLocalStream.stopCaptureAudio();
```
