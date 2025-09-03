# 流量控制

---

## 功能简介

流量控制可以使 SDK 根据自己以及对端当前网络环境状态来动态调整视频推流的码率、帧率、分辨率，以及音频码率，自动适应当前网络环境及网络波动，从而保证视频能流畅发布。

流量控制的原理是基于当前网络情况，对用户的网络环境建模并估算它的上行带宽，如果当前上行带宽小于设置的推流码率，则会通过配置的选项分别从视频码率、分辨率、帧率、音频码率几处循序渐进地降低，以减少最终推流的上行码率，保证直播的流畅性。在网络环境恢复正常以后，上行码率也会重新恢复到初始设置值。

仅当 1v1 连麦场景中，SDK 会自动开启下行流量控制。拉流端将自己的网络情况通知给推流端，推流端估算自己的上行带宽和拉流端的下行带宽，并从上行、下行带宽的估值中取最小值来调整自己的上行码率，以保证连麦的流畅性。



## 前提条件

在实现流量控制功能之前，请确保：

- 已在项目中集成 ZEGO Express SDK，实现基本的实时语音功能，详情请参考 [快速开始 - 集成](https://doc-zh.zego.im/article/17991) 和 [快速开始 - 实现流程](https://doc-zh.zego.im/article/17992)。
- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppID 和 AppSign，详情请参考 [控制台 - 项目管理](/console/project-info) 中的“项目信息”。

## 使用步骤

### 开启流量控制

推流前调用 [enableTrafficControl](https://doc-zh.zego.im/zh/api?doc=Express_Video_SDK_API~CPP~class~zego-express-i-zego-express-engine#enable-traffic-control) 接口，通过 “enable” 参数开启流量控制，并通过 “property” 参数设置可调节的流量控制属性（码率、帧率、分辨率），支持选择多项，默认值为 “ADAPTIVE_FPS”，即动态调整帧率。当上行带宽不足时，SDK 会根据当前网络环境，自动调整设置的属性以适应上行带宽。

<Warning title="注意">


* 当关闭流量控制开关后，已设置的流量控制属性 “property” 也将失效。
* 当流量控制属性中含有自适应分辨率 “ADAPTIVE_RESOLUTION” 时，只支持 “16:9” 或 “4:3” 比例的初始分辨率，若初始分辨率为其他值，则自适应分辨率无法生效，SDK 会降级到直接降低编码码率。若使用流量控制功能过程中需要录制本地媒体，则自适应分辨率会影响 “MP4” 格式的文件录制，此时需要将格式修改为 “FLV”，详细操作请参考 [音视频录制](/real-time-video-ue-cpp/other/local-media-recording)。

</Warning>



在不同场景下，流量控制的属性设置不同，SDK 会根据开发者选择的场景，自动设置适合该场景的流量控制属性。例如，秀场直播场景需要保证视频流畅性，推荐选择分辨率自适应；教育场景需要保证清晰度，推荐选择帧率自适应，详情请参考 [场景化音视频配置](https://doc-zh.zego.im/article/20675) 文档。

```cpp
// 开启流量控制，且同时开启分辨率和帧率自适应
ZegoExpressSDK::getEngine()->enableTrafficControl(true, ZEGO_TRAFFIC_CONTROL_PROPERTY_ADAPTIVE_FPS | ZEGO_TRAFFIC_CONTROL_PROPERTY_ADAPTIVE_RESOLUTION);
```

### 设置流量控制视频码率最小值

开启流量控制后，调用 [setMinVideoBitrateForTrafficControl](https://doc-zh.zego.im/zh/api?doc=Express_Video_SDK_API~CPP~class~zego-express-i-zego-express-engine&jumpType=route#set-min-video-bitrate-for-traffic-control) 方法设置视频码率最小值（默认值为 “0”），可以使 SDK 在网络未达到发送视频的最小码率时采用该方法设置视频发送模式（不发送视频或以极低的帧率发送）。

<Warning title="注意">


可以在初始化 SDK 后的任意时间调用，但需要开启流量控制后该设置才生效。

</Warning>



```cpp
// 开启流控后，当上下行带宽低于200kbps时，以极低的帧率继续发送视频数据
ZegoExpressSDK::getEngine()->setMinVideoBitrateForTrafficControl(200, ZEGO_TRAFFIC_CONTROL_MIN_VIDEO_BITRATE_MODE_ULTRA_LOW_FPS);
```

<Content />

