# 流量控制

---

## 功能简介

流量控制，是指 SDK 根据本端以及对端当前网络状态，动态调整视频推流的码率、帧率和分辨率，以及音频码率，自动适应当前网络环境及网络波动，从而保证音视频能流畅推送。

流量控制的原理是基于当前网络情况，对用户的网络环境建模并估算它的上行带宽。如果当前上行带宽小于设置的推流码率，则会通过配置的选项分别从视频码率、分辨率、帧率、音频码率几处循序渐进地降低，以减少最终推流的上行码率，保证直播的流畅性。在网络环境恢复正常以后，上行码率也会重新恢复到初始设置值。

当只有一个 [RTC 推流](/glossary/term-explanation#rtc-推流) 的情况下，只有一个 [RTC 拉流](/glossary/term-explanation#rtc-推流) 或只有一个 [L3 拉流](/glossary/term-explanation#拉流) 时，SDK 会自动开启下行流量控制。拉流端将自己的网络情况通知给推流端，推流端估算自己的上行带宽和拉流端的下行带宽，并从上行、下行带宽的估值中取最小值来调整自己的上行码率，以保证连麦的流畅性。

## 示例源码下载

请参考 [跑通示例源码](https://doc-zh.zego.im/article/19522) 获取源码。

相关源码请查看 “/page/Topics/FlowControl/” 目录下的文件 FlowControl.ets。


## 使用步骤

### 1 开启流量控制

推流前调用 [enableTrafficControl](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/ets_ohos/classes/_zegoexpressengine_.zegoexpressengine.html#enabletrafficcontrol) 接口，通过 “enable” 参数开启流量控制，并通过 “property” 参数设置可调节的流量控制属性（码率、帧率、分辨率）。支持选择多项，默认值为 “AdaptiveFPS”，即动态调整帧率。当上行带宽不足时，SDK 会根据当前网络环境，根据设置的`property`参数减少最终推流的上行码率，以适应上行带宽。

<Warning title="注意">


- 当关闭流量控制开关后，已设置的流量控制属性 “property” 也将失效。
- 在不同场景下，流量控制的属性设置不同。例如秀场直播场景需要保证视频流畅性，推荐选择分辨率自适应；教育场景需要保证清晰度，推荐选择帧率自适应。

</Warning>



```ts
// 开启流量控制，且同时开启分辨率和帧率自适应
this.ZegoExpressInstance.enableTrafficControl(true, AdaptiveFPS | AdaptiveResolution);
```

### 2 设置流量控制视频码率最小值

<Note title="说明">
本节操作仅适用于音视频场景，纯音频场景下无需设置。
</Note>

开启流量控制后，调用 [setMinVideoBitrateForTrafficControl](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/ets_ohos/classes/_zegoexpressengine_.zegoexpressengine.html#setminvideobitratefortrafficcontrol) 方法设置视频码率最小值（默认值为 “0”）及视频发送模式，可以使 SDK 在网络未达到发送视频的最小码率时，采用该方法设置视频发送模式（不发送视频或以极低的帧率发送）。

<Warning title="注意">
可以在初始化 SDK 后的任意时间调用，但需要开启流量控制后该设置才生效。
</Warning>



```ts
// 开启流控后，当码率低于 200 kbps 时，以极低的帧率继续发送视频数据
this.ZegoExpressInstance.setMinVideoBitrateForTrafficControl(200, ZegoTrafficControlMinVideoBitrateMode.UltraLowFPS);
```

<Content />

