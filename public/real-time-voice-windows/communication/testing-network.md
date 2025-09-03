# 网络测速

- - -

## 功能简介

ZEGO 提供网络测速功能，可用于检测网络环境是否适合推/拉指定码率的流。

当上行测速结果显示丢包率较高时，推荐使用降低分辨率或降低帧率等方法降低推流码率，以保证正常推流；当下行测速结果显示丢包率较高时，推荐使用 SDK 提供的 [视频进阶 - 分层视频编码](/real-time-video-windows-cpp/video/set-video-encoding) 功能拉取低码率的流，以保证正常拉流。

开发者业务中出现以下情况时，ZEGO 推荐使用 SDK 的网络测速功能：

- 通话场景下，需要进行网络质量评估。
- 教育场景下，需要进行课前网络检测。
- 直播场景下，需要进行网络连接速度测试。

## 前提条件

在实现网络测速功能之前，请确保：

- 已在项目中集成 ZEGO Express SDK，实现基本的实时语音功能，详情请参考 [快速开始 - 集成](https://doc-zh.zego.im/article/3577) 和 [快速开始 - 实现流程](https://doc-zh.zego.im/article/7637)。
- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppID 和 AppSign，详情请参考 [控制台 - 项目管理](/console/project-info) 中的“项目信息”。


## 使用步骤

### 监听测速回调

开始测速前，可先设置测速相关的回调。

测速过程中发生错误时，会触发 [onNetworkSpeedTestError](https://doc-zh.zego.im/zh/api?doc=Express_Video_SDK_API~CPP_windows~class~zego-express-i-zego-event-handler#on-network-speed-test-error) 回调。正常测速情况下，网速质量更新时会触发 [onNetworkSpeedTestQualityUpdate](https://doc-zh.zego.im/zh/api?doc=Express_Video_SDK_API~CPP_windows~class~zego-express-i-zego-event-handler#on-network-speed-test-quality-update) 回调。

```cpp
virtual void onNetworkSpeedTestError(int errorCode, ZegoNetworkSpeedTestType type)
{
    printf("onNetworkSpeedTestError errorCode=%d type=%d", errorCode, type);
}

virtual void onNetworkSpeedTestQualityUpdate(const ZegoNetworkSpeedTestQuality& quality, ZegoNetworkSpeedTestType type)
{
    printf("onNetworkSpeedTestQualityUpdate rtt=%d packetLostRate=%f connectCost=%d type=%d", quality.rtt, quality.packetLostRate, quality.connectCost, type);
}
```

### 开始测速

创建 [ZegoNetworkSpeedTestConfig](https://doc-zh.zego.im/zh/api?doc=Express_Video_SDK_API~CPP_windows~struct~zego-express-zego-network-speed-test-config) 网络测速配置的实例，根据实际情况设置是否进行上下行测速及期望码率，调用 [startNetworkSpeedTest](https://doc-zh.zego.im/zh/api?doc=Express_Video_SDK_API~CPP_windows~class~zego-express-i-zego-express-engine#start-network-speed-test) 接口开启网络测速。

```cpp
ZegoNetworkSpeedTestConfig config;

// 进行上行测速 指定期望推流码率
config.testUplink = true;
config.expectedUplinkBitrate = videoConfig.bitrate;

// 进行下行测速 指定期望拉流码率
config.testDownlink = true;
config.expectedDownlinkBitrate = videoConfig.bitrate;

// 开始测速，默认回调间隔为3秒
engine->startNetworkSpeedTest(config);
// 若需设置回调间隔，可参考如下调用(以1.5秒为例)
engine->startNetworkSpeedTest(config, 1500);
```

### 停止测速

调用 [stopNetworkSpeedTest](https://doc-zh.zego.im/zh/api?doc=Express_Video_SDK_API~CPP~class~zego-express-i-zego-express-engine#stop-network-speed-test) 接口停止网络测速。

停止测速后，将不会再收到 [onNetworkSpeedTestError](https://doc-zh.zego.im/zh/api?doc=Express_Video_SDK_API~CPP_windows~class~zego-express-i-zego-event-handler#on-network-speed-test-error) 或 [onNetworkSpeedTestQualityUpdate](https://doc-zh.zego.im/zh/api?doc=Express_Video_SDK_API~CPP_windows~class~zego-express-i-zego-event-handler#on-network-speed-test-quality-update) 回调。

```cpp
engine->stopNetworkSpeedTest();
```

## API 参考列表

| 方法         | 描述     |
| ----------- | ------- |
| [startNetworkSpeedTest ](https://doc-zh.zego.im/zh/api?doc=Express_Video_SDK_API~CPP~class~zego-express-i-zego-express-engine#start-network-speed-test) | 开始网络测速 |
| [stopNetworkSpeedTest ](https://doc-zh.zego.im/zh/api?doc=Express_Video_SDK_API~CPP~class~zego-express-i-zego-express-engine#stop-network-speed-test) | 停止网路测速 |
