# 流量控制

---

## 功能简介

<Warning title="注意">
本文档适用于以下平台： Android、iOS。
</Warning>



流量控制可以使 SDK 根据自己以及对端当前网络环境状态来动态调整视频推流的码率、帧率、分辨率，以及音频码率，自动适应当前网络环境及网络波动，从而保证视频能流畅发布。

流量控制的原理是基于当前网络情况，对用户的网络环境建模并估算它的上行带宽，如果当前上行带宽小于设置的推流码率，则会通过配置的选项分别从视频码率、分辨率、帧率、音频码率几处循序渐进地降低，以减少最终推流的上行码率，保证直播的流畅性。在网络环境恢复正常以后，上行码率也会重新恢复到初始设置值。

仅当 1v1 连麦场景中，SDK 会自动开启下行流量控制。拉流端将自己的网络情况通知给推流端，推流端估算自己的上行带宽和拉流端的下行带宽，并从上行、下行带宽的估值中取最小值来调整自己的上行码率，以保证连麦的流畅性。

<Note title="说明">
流量控制与分层视频编码的区别：

* 流量控制：面向推流方，推流方网络环境差时为了保证正常推流主动降低推流的上行码率。
* 分层视频编码：面向拉流方，推流方推一路多层不同质量的流时，拉流方根据自身网络环境可以自主选择拉流的视频质量，以适应下行带宽。
分层编码的使用请参考 [视频进阶 - 视频编解码](/real-time-video-uniapp/video/set-video-encoding)。
</Note>



## 示例源码下载

请参考 [下载示例源码](/real-time-video-uniapp/quick-start/run-example-code) 获取源码。

相关源码请查看 “/page/example/other/traffic-control.nvue” 目录下的文件。

## 前提条件

在实现流量控制功能之前，请确保：
- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，申请有效的 AppID 和 AppSign，详情请参考 [控制台 - 项目管理](https://doc-zh.zego.im/article/12107)。
- 已在项目中集成 ZEGO Express SDK，详情请参考 [快速开始-集成](/real-time-video-uniapp/quick-start/integrating-sdk) 和 [快速开始-实现流程](/real-time-video-uniapp/quick-start/implementing-video-call)。

## 使用步骤

### 1 开启流量控制

推流前调用 [enableTrafficControl](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/classes/_zegoexpressengine_.zegoexpressengine.html#enabletrafficcontrol) 接口，通过 “enable” 参数开启流量控制，并通过 “property” 参数设置可调节的流量控制属性（码率、帧率、分辨率），支持选择多项，默认值为 “AdaptiveFPS”，即动态调整帧率。当上行带宽不足时，SDK 会根据当前网络环境，自动调整设置的属性以适应上行带宽。

<Warning title="注意">
当关闭流量控制开关后，已设置的流量控制属性 “property” 也将失效。
</Warning>



在不同场景下，流量控制的属性设置不同。例如秀场直播场景需要保证视频流畅性，推荐选择分辨率自适应；教育场景需要保证清晰度，推荐选择帧率自适应。

```java
// 开启流量控制，且同时开启分辨率和帧率自适应
ZegoExpressEngine.instance().enableTrafficControl(true, AdaptiveResolution | AdaptiveAudioBitrate);
```

### 2 设置流量控制视频码率最小值

<Note title="说明">
本节操作仅适用于音视频场景，纯音频场景下无需设置。
</Note>



开启流量控制后，调用 [setMinVideoBitrateForTrafficControl](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/classes/_zegoexpressengine_.zegoexpressengine.html#setminvideobitratefortrafficcontrol) 方法设置视频码率最小值（默认值为 “0”），可以使 SDK 在网络未达到发送视频的最小码率时采用该方法设置视频发送模式（不发送视频或以极低的帧率发送）。

<Warning title="注意">
可以在初始化 SDK 后的任意时间调用，但需要开启流量控制后该设置才生效。
</Warning>



```java
// 开启流控后，当码率低于 200 kbps 时，以极低的帧率继续发送视频数据
ZegoExpressEngine.instance().setMinVideoBitrateForTrafficControl(200, ZegoTrafficControlMinVideoBitrateMode.UltraLowFPS);
```

## API 参考列表

| 方法 | 描述  |
| ------- | ----- |
| [enableTrafficControl](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/classes/_zegoexpressengine_.zegoexpressengine.html#enabletrafficcontrol) | 开始或停止流量控制         |
| [setMinVideoBitrateForTrafficControl](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/classes/_zegoexpressengine_.zegoexpressengine.html#setminvideobitratefortrafficcontrol) | 设置流量控制视频码率最小值 |

