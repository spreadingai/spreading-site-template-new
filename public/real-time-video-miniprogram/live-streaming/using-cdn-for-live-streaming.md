# 使用 CDN 直播



## 功能简介

转推 CDN（Content Delivery Network）指的是将音视频流从 ZEGO 实时音视频云推送到 CDN 的过程。开发者基于此功能可进行更大规模的内容分发，且用户可直接通过 URL 拉流地址从网页或第三方播放器进行观看。

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Common/ZegoExpressEngine/relay_cdn.png" /></Frame>

为防止攻击者盗取或伪造您的推流 URL 地址，您可以参考 [CDN 推流鉴权](https://doc-zh.zego.im/article/15822)，提升您推流使用的安全性。

<Warning title="注意">
本功能仅支持在 `微信小程序` 上使用。
</Warning>




## 示例源码下载

请参考 [微信小程序 - 跑通示例源码](https://doc-zh.zego.im/article/18247)。

相关源码请查看 `/pages/cdn/` 目录下的文件。

## 前提条件

在转推 CDN 前，请确保已在项目中实现了基本的音视频推拉流功能，详情请参考 [微信小程序 - 集成 SDK](https://doc-zh.zego.im/article/18251) 和 [微信小程序 - 实现流程](https://doc-zh.zego.im/article/18250)。

<Warning title="注意">
CDN 直播功能不是默认开启的，使用前请在 [ZEGO 控制台](https://console.zego.im) 自助开通（开通步骤请参考 [项目管理 - 服务配置](/console/service-configuration/activate-cdn-service) 中的“CDN”），或联系 ZEGO 技术支持开通。
</Warning>



## 使用步骤

### 推流

转推 CDN 之前，需要先将音视频流推送到 ZEGO 实时音视频云上，请参考 [微信小程序 - 实现流程](https://doc-zh.zego.im/article/18250#publishingStream) 的 “推流”。

### 转推 CDN

推流成功后，调用 [addPublishCDNURL ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_wxxcx~class~ZegoExpressEngine#add-publish-cdn-url) 接口，向 CDN 推送音视频流。


```javascript
// 推流成功后，开始转推到 CDN

// 推流时使用的流 ID
const streamID = "STREAM_ID";
// 需要转推的 CDN 地址，请开发者按照实际 URL 填入，streamID 为推流的流名，可自定义
const targetURL = "rtmp://推流域名/接入点/streamID";
const result = await zg.addPublishCdnUrl(streamID, signature, targetURL);
console.warn(result);
```

<Warning title="注意">


若开发者有转推到多家 CDN 厂商的需求，可使用同一个流 ID 多次调用转推 CDN 接口（URL 需不同）。

</Warning>




### 停止转推 CDN

调用 [removePublishCDNURL ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_wxxcx~class~ZegoExpressEngine#remove-publish-cdn-url) 接口，可停止将音视频流推送到 CDN。**调用 [removePublishCdnUrl](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_wxxcx~class~ZegoExpressEngine#remove-publish-cdn-url) 接口停止转推时，请确保当前流 streamID 是存在的。**

```javascript
// 停止推流前，先停止转推CDN

// 推流时使用的流 ID
const streamID = "STREAM_ID";
// 需要停止转推的 CDN 地址，请开发者按照实际 URL 填入，streamID 为推流的流名
const targetURL = "rtmp://推流域名/接入点/streamID";
const result = await zg.removePublishCdnUrl(streamID, signature, targetURL);
console.warn(result);
```

<Warning title="注意">


- 停止推流前，请先停止转推 CDN。
- 若开发者转推到多家 CDN 后，停止转推时，也需要多次调用停止转推 CDN 接口来停止所有转推的流。

</Warning>



### 停止推流

请参考 [微信小程序 - 实现流程](https://doc-zh.zego.im/article/18250#停止推送和拉取音视频流) 的 “停止推送和拉取音视频流”。
