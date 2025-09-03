<Title>Web 平台将流转推到 CDN 过程中，连接断开后如何处理？</Title>



- - -

转推 CDN 指的是将音视频流从 ZEGO 实时音视频云推送到第三方或自研的 CDN 的过程。开发者基于此功能可进行更大规模的内容分发，且用户可直接通过 URL 拉流地址从网页或第三方播放器进行观看。

<Frame width="512" height="auto" caption=""><Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Common/ZegoExpressEngine/relay_cdn.png" /></Frame></Frame>


推流时，SDK 会连接到专门用于推流服务的 ZEGO 服务器。当 SDK 与推流服务器的连接断开时会尝试自动重连。如果重连失败，SDK 会触发推流状态的回调 [publisherStateUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoRTCEvent&jumpType=route#publisher-state-update)，给出未推流状态 “NO_PUBLISH”。


```javascript
on('publisherStateUpdate',(result: ZegoPublisherState)=>{
    if(result.state === 'NO_PUBLISH'){
       // todo  something
    }
})
```

当监听到以上事件的对应状态时，开发者可以先调用 [stopPublishingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#start-publishing-stream) 停止所有的推流，再依次调用 [startPublishingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#stop-publishing-stream) 重新开始推流。




将流转推到 CDN 的详细的功能介绍和实现流程请参考 [转推 CDN](/real-time-video-web/live-streaming/using-cdn-for-live-streaming)。
