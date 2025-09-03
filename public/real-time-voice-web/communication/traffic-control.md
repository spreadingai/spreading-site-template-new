# 流量控制

---

## 功能简介

流量控制，是指 SDK 根据本端以及对端当前网络状态，动态调整视频推流的码率，自动适应当前网络环境及网络波动，从而保证音视频能流畅推送。



## 使用步骤

### 1 开启流量控制

推流调用 [startPublishingStream](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#start-publishing-stream) 接口，通过 [enableTrafficControl](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoWebPublishOption#enable-traffic-control) 参数开启流量控制，动态调整视频推流的码率，自动适应当前网络环境及网络波动，若关闭流量控制在网络带宽不足时可能出现卡顿的情况。

<Warning title="注意">

使用限制: 仅支持 RTC 推流。

</Warning>



```javascript
// 开启流量控制
zg.startPublishingStream(streamID, stream, {
    enableTrafficControl: true
};
```

### 2（可选）设置触发流量控制的关注因素

在开启流量控制时，可以通过 [trafficControlFocusOnMode](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoWebPublishOption#traffic-control-focus-on-mode) 参数，设置开启流量控制时所关注的因素。
- [TrafficControlFocusOnLocalOnly](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~enum~TrafficControlFocusOnMode#traffic-control-focus-on-local-only)：只关注本地网络，即不考虑远端网络状况，仅根据本地网络进行流量控制。
- [TrafficControlFocusOnRemote](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~enum~TrafficControlFocusOnMode#traffic-control-focus-on-remote)：关注本地网络，同时也兼顾远端网络，目前只在 1v1 场景下有效。即当只有一个 [RTC 推流](/glossary/term-explanation#rtc-推流) 的情况下，只有一个 [RTC 拉流](/glossary/term-explanation#rtc-推流) 或只有一个 [L3 拉流](/glossary/term-explanation#拉流) 时，SDK 会自动开启下行流量控制。拉流端将自己的网络情况通知给推流端，推流端估算自己的上行带宽和拉流端的下行带宽，并从上行、下行带宽的估值中取最小值来调整自己的上行码率，以保证连麦的流畅性。


```javascript
// 开启流量控制,设置触发流量控制的关注因素
zg.startPublishingStream(streamID, stream, {
    enableTrafficControl: true,
    trafficControlFocusOnMode: 0
};
```


### 3 设置流量控制视频码率最小值(纯音频场景可跳过)

开启流量控制时，可以通过 [trafficControlMinVideoBitrate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoWebPublishOption#traffic-control-min-video-bitrate) 参数设置视频码率最小值（默认值为 “0”）及发送模式，可以使 SDK 在网络未达到发送视频的最小码率时，以极低的帧率发送。


```javascript
// 开启流量控制,流量控制视频码率
zg.startPublishingStream(streamID, stream, {
    enableTrafficControl: true,
    trafficControlMinVideoBitrate: 200
};
```

<Content />

