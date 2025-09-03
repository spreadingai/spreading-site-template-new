# 网络测速

- - -

## 功能简介

<Warning title="注意">


本文档暂不适用于 Web 平台。

</Warning>



ZEGO 提供网络测速功能，可在用户进行推/拉流前，检测上行和下行网络速度，判断当前网络环境下适合推/拉多大码率的音视频流。


当上行测速结果显示丢包率较高时，推荐使用降低分辨率或降低帧率等方法降低推流码率，以保证正常推流；当下行测速结果显示丢包率较高时，推荐使用 SDK 提供的 [进阶功能 - 设置视频编码方式](https://doc-zh.zego.im/article/10915) 功能拉取低码率的流，以保证正常拉流。

开发者业务中出现以下情况时，ZEGO 推荐使用 SDK 的网络测速功能：

- 通话场景下，需要进行网络质量评估。

- 教育场景下，需要进行课前网络检测。

- 直播场景下，需要进行网络连接速度测试。



网络测速基本原理如下图所示：

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Common/ZegoExpressEngine/Network_speed_test.png" /></Frame>

## 前提条件

在实现网络测速功能之前，请确保：

- 已在项目中集成 ZEGO Express SDK，实现基本的实时音视频功能，详情请参考 [快速开始 - 集成](https://doc-zh.zego.im/article/1241) 和 [快速开始 - 实现流程](https://doc-zh.zego.im/article/7634)。
- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppID 和 AppSign，详情请参考 [控制台 - 项目信息](/console/project-info)。

## 使用步骤

### 1 监听测速回调

开始测速前，可先设置测速相关的回调。

- 正常测速情况下，网速质量更新时会触发 [onNetworkSpeedTestQualityUpdate](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngine/onNetworkSpeedTestQualityUpdate.html) 回调。

- 当测速过程中发生错误时，则会触发 [onNetworkSpeedTestError](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngine/onNetworkSpeedTestError.html) 回调。


```dart
// 网络测速质量回调
ZegoExpressEngine.onNetworkSpeedTestQualityUpdate = (ZegoNetworkSpeedTestQuality quality, ZegoNetworkSpeedTestType type) {

};

// 网络测速异常回调
ZegoExpressEngine.onNetworkSpeedTestError = (int errorCode, ZegoNetworkSpeedTestType type) {

};
```

### 2 开始测速

创建 [ZegoNetworkSpeedTestConfig](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoNetworkSpeedTestConfig-class.html) 网络测速配置的实例，根据实际情况设置是否进行上下行测速及期望码率，调用 [startNetworkSpeedTest](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngineUtilities/startNetworkSpeedTest.html) 接口开启网络测速。

<Note title="说明">



调用 [startNetworkSpeedTest](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngineUtilities/startNetworkSpeedTest.html) 接口开启测速后，默认支持测速 30 秒（如需调整时长，请联系 ZEGO 技术支持修改动态配置），超时后会强制结束测速。如需继续测速，请再次调用该接口。

</Note>





```dart
var videoConfig = await ZegoExpressEngine.instance.getVideoConfig();
// 进行上行测速，指定期望推流码率
bool testUplink = true;
int expectedUplinkBitrate = videoConfig.bitrate;

// 进行下行测速，指定期望拉流码率
bool testDownlink = true;
int expectedDownlinkBitrate = videoConfig.bitrate;

var config =ZegoNetworkSpeedTestConfig(testUplink, expectedUplinkBitrate, testDownlink, expectedDownlinkBitrate);

// 开始测速，默认回调间隔为 3 秒
ZegoExpressEngine.instance.startNetworkSpeedTest(config);

// 若需设置回调间隔，可参考如下调用（以 1.5 秒为例）
ZegoExpressEngine.instance.startNetworkSpeedTest(config, interval: 1500);
```

测速结果将在 [onNetworkSpeedTestQualityUpdate](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngine/onNetworkSpeedTestQualityUpdate.html) 中的 [ZegoNetworkSpeedTestQuality](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoNetworkSpeedTestQuality-class.html)（网络测速质量） 返回，通过分析各参数值，可得知当前网络质量是否良好。

[ZegoNetworkSpeedTestQuality](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoNetworkSpeedTestQuality-class.html) 中各参数如下：

<table>

<tbody><tr>
<th>参数</th>
<th>描述</th>
<th>说明</th>
</tr>
<tr>
<td>connectCost</td>
<td>连接服务器耗时，单位为毫秒。</td>
<td>测速过程中如果网络连接断开会自动发起重连，此变量会相应更新，数值越小越好。</td>
</tr>
<tr>
<td>rtt</td>
<td>网络延时，单位为毫秒。</td>
<td>代表 SDK 与服务器往返之间所消耗的时间，数值越小越好。</td>
</tr>
<tr>
<td>packetLostRate</td>
<td>丢包率，单位为百分比。</td>
<td>取值范围在 0.0 - 1.0，例如 0.5 代表每向服务器发送的 10 个数据包中，可能有其中 5 个会在中途丢失。</td>
</tr>
<tr>
<td>quality</td>
<td>网络质量</td>
<td>代表当前网络质量水平，具体可参见 [ZegoStreamQualityLevel](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoStreamQualityLevel.html)： <ul><li>Excellent：质量极好。</li><li>Good：质量好。</li><li>Medium：质量正常。</li><li>Bad：质量差。</li><li>Die：质量异常。</li><li>Unknown：质量未知。</li></ul> </td>
</tr>
</tbody></table>

### 3 停止测速

调用 [stopNetworkSpeedTest](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngineUtilities/stopNetworkSpeedTest.html) 接口停止网络测速。

停止测速后，将不会再收到 [onNetworkSpeedTestQualityUpdate](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngine/onNetworkSpeedTestQualityUpdate.html) 或 [onNetworkSpeedTestError](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngine/onNetworkSpeedTestError.html) 回调。

```dart
ZegoExpressEngine.instance.stopNetworkSpeedTest();
```
