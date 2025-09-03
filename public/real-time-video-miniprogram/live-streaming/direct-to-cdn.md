# 直推 CDN

---

## 功能简介

直推 CDN（Content Delivery Network）指的是将音视频流直接从本地客户端推送到 CDN 的过程，用户可直接通过拉流 URL 地址从网页或第三方播放器进行观看。但由于直推 CDN 功能在网络传输过程中不经过 ZEGO 实时音视频云，因此开发者无法使用 ZEGO 的超低延迟音视频服务。  
  
该功能一般由与第三方 CDN 有音视频分发服务合作的开发者使用。

<Warning title="注意">


本功能仅支持在 `微信小程序` 上使用。

</Warning>




## 示例源码下载

请参考 [微信小程序 - 跑通示例源码](https://doc-zh.zego.im/article/18247)。

相关源码请查看 `/pages/cdn` 目录下的文件。

## 前提条件

在直推 CDN 前，请确保已在项目中实现了基本的音视频推拉流功能，详情请参考 [微信小程序 - 集成 SDK](https://doc-zh.zego.im/article/18251) 和 [微信小程序 - 实现流程](https://doc-zh.zego.im/article/18250)。

## 使用步骤

### 直推 CDN

调用 [startPublishingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_wxxcx~class~ZegoExpressEngine#start-publishing-stream) 接口，设置 `publishOption` 属性的 `sourceType` 为 CDN，推流到 CDN。
 

```javascript
const { url } = await zg.startPublishingStream(context.data.pushStreamID, { sourceType: 'CDN' });
```

将小程序 `<live-pusher>` 组件的 `url` 属性设置为获取到的推流地址，开始推流。

```html
<live-pusher
	wx:if="{{pushUrl}}"
	id="video-livePusher"
	mode="RTC"
	url="{{pushUrl}}" //设置获取到的推流地址
	min-bitrate="{{pushConfig.minBitrate}}"
	max-bitrate="{{pushConfig.maxBitrate}}"
	aspect="{{pushConfig.aspect}}"
	beauty="{{pushConfig.isBeauty}}"
	muted="{{pushConfig.isMute}}"
	background-mute="true"
	debug="{{pushConfig.showLog}}"
	bindstatechange="onPushStateChange"
	bindnetstatus="onPushNetStateChange">
	<cover-view class='character' style='padding: 0 5px;'>{{isPublishing ? "我(" + publishStreamId + ")": ""}}</cover-view>
</live-pusher>    
```

```javascript
const livePusher = wx.createLivePusherContext();
livePusher.start();
```

<Warning title="注意">


纯音频场景下需在 `<live-pusher>` 组件上添加 `enable-camera="false"`。  

</Warning>


