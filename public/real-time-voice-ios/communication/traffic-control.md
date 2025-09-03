# 流量控制

---

## 功能简介

流量控制，是指 SDK 根据本端以及对端当前网络状态，动态调整视频推流的码率、帧率和分辨率，以及音频码率，自动适应当前网络环境及网络波动，从而保证音视频能流畅推送。

流量控制的原理是基于当前网络情况，对用户的网络环境建模并估算它的上行带宽。如果当前上行带宽小于设置的推流码率，则会通过配置的选项分别从视频码率、分辨率、帧率、音频码率几处循序渐进地降低，以减少最终推流的上行码率，保证直播的流畅性。在网络环境恢复正常以后，上行码率也会重新恢复到初始设置值。

当只有一个 [RTC 推流](/glossary/term-explanation#rtc-推流) 的情况下，只有一个 [RTC 拉流](/glossary/term-explanation#rtc-推流) 或只有一个 [L3 拉流](/glossary/term-explanation#拉流) 时，SDK 会自动开启下行流量控制。拉流端将自己的网络情况通知给推流端，推流端估算自己的上行带宽和拉流端的下行带宽，并从上行、下行带宽的估值中取最小值来调整自己的上行码率，以保证连麦的流畅性。


## 使用步骤

### 1 开启流量控制

推流前调用 [enableTrafficControl](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~ObjectiveC~class~zego-express-engine#enable-traffic-control-property) 接口将 `enable` 参数设置为 true 以开启流量控制，并通过 `property` 参数设置可调节的流量控制属性（码率、帧率、分辨率）。支持选择多项，默认值为 `ADAPTIVE_FPS`，即自适应（降低）视频帧率。当上行带宽不足时，SDK 会根据当前网络环境，根据设置的`property`参数减少最终推流的上行码率，以适应上行带宽。

<Warning title="注意">

* 使用限制: 仅支持 RTC 推流。
* 当关闭流量控制后，已设置的流量控制属性 `property` 也将失效。
* 当流量控制属性中含有自适应（降低）视频分辨率 `AdaptiveResolution` 时，只支持 “16:9” 或 “4:3” 比例的初始分辨率。若初始分辨率为其他值，则自适应（降低）视频分辨率无法生效，SDK 会直接降低编码码率。
- 若使用流量控制功能过程中需要录制本地媒体，则自适应（降低）视频分辨率会影响 “MP4” 格式的文件录制，此时需要将格式修改为 “FLV”，详细操作请参考 [音视频录制](/real-time-video-ios-oc/other/local-media-recording)。
</Warning>

```objc
// 开启流量控制，且同时开启自适应（降低）视频帧率和自适应（降低）视频分辨率
[ZegoExpressEngine sharedEngine] enableTrafficControl:YES property:ZegoTrafficControlPropertyAdaptiveFPS | ZegoTrafficControlPropertyAdaptiveResolution];
```
### 2（可选）自动调整流量控制属性

SDK 会根据 [创建引擎](https://doc-zh.zego.im/article/7631#CreateEngine) 时，开发者选择的场景 [`scenario`](https://doc-zh.zego.im/article/16504)，自动设置适合该场景的流量控制属性。例如，秀场直播场景需要保证视频流畅性，推荐选择自适应（降低）视频分辨率；教育场景需要保证清晰度，推荐选择自适应（降低）视频帧率。

<Warning title="注意">


SDK 会根据接口调用顺序，决定当前流量控制属性，后调用的生效。即如果先通过 `enableTrafficControl` 设置了流量控制属性，再调用 `setRoomScenario` 设置 `scenario`，流量控制属性就会根据 `scenario` 变化。
</Warning>




### 3 设置流量控制视频码率最小值（纯音频场景可跳过）

开启流量控制后，调用 [setMinVideoBitrateForTrafficControl](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~ObjectiveC~class~zego-express-engine#set-min-video-bitrate-for-traffic-control-mode) 方法设置视频码率最小值（默认值为 “0”）及视频发送模式，可以使 SDK 在网络未达到发送视频的最小码率时，采用该方法不发送视频或以极低的帧率发送视频。

<Warning title="注意">

可以在初始化 SDK 后且推流 [startPublishingStream](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~objective-c_ios~class~ZegoExpressEngine#start-publishing-stream) 前的任意时间调用 [setMinVideoBitrateForTrafficControl](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~ObjectiveC~class~zego-express-engine#set-min-video-bitrate-for-traffic-control-mode)，但需要开启流量控制后该设置才生效。
</Warning>

```objc
// 开启流控后，当上下行带宽低于 200 kbps 时，以极低的帧率继续发送视频数据
[[ZegoExpressEngine sharedEngine] setMinVideoBitrateForTrafficControl:200 mode:ZegoTrafficControlMinVideoBitrateModeUltraLowFPS];
```

<Content />