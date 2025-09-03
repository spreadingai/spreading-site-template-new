# 推流至 CDN

- - -

## 简介

ZEGO Express SDK 支持推流到 CDN（Content Delivery Network，内容分发网络），包括转推 CDN 和直推 CDN 两种功能。开发者基于该功能可打通 RTC 产品和 CDN 直播产品，方便用户从网页或第三方播放器直接观看和收听直播内容。为了保证安全，推流到 CDN 时默认开启 CDN 鉴权。

为防止攻击者盗取或伪造您的推流 URL 地址，您可以参考 [CDN 推流鉴权](https://doc-zh.zego.im/article/15814)，提升您推流使用的安全性。

<Warning title="注意">  

在发起转推或直推 CDN 时需注意，CDN 对音视频格式有所要求，推流端音频支持 AAC 与 MP3，视频支持 H.264 与 H.265（需要 CDN 配置）。
</Warning>

### 转推 CDN

转推 CDN 指的是将音视频流从 ZEGO 音视频云推送到 ZEGO 自有 CDN 或第三方 CDN 的过程。

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Common/ZegoExpressEngine/relay_cdn.png" /></Frame>  

转推 CDN 包括以下三种方式：
 
<table>
  
<tbody><tr>
<th>转推方式</th>
<th>说明</th>
</tr>
<tr>
<td>默认转推 CDN</td>
<td>用户使用 ZEGO Express SDK 推到 ZEGO 音视频云的直播流均会转推到 CDN，目前仅支持 ZEGO 自有 CDN。</td>
</tr>
<tr>
<td>旁路转推 CDN</td>
<td>开发者自定义指定 ZEGO 实时音视频云上的流转推至 CDN，支持 ZEGO 自有 CDN 和第三方 CDN。</td>
</tr>
<tr>
<td>混流转推 CDN</td>
<td>混流场景也可以将输出流转推至 CDN，支持 ZEGO 自有 CDN 和第三方 CDN。</td>
</tr>
</tbody></table>

### 直推 CDN

直推 CDN 指的是将音视频流直接从本地客户端推送到
CDN 的过程，用户可直接通过拉流 URL 地址从网页或第三方播放器进行观看。但由于直推 CDN 功能在网络传输过程中不经过 ZEGO 实时音视频云，因此开发者无法使用 ZEGO 的实时音视频服务。

![](https://doc-media.zego.im/sdk-doc/Pics/Android/streamByCdn/direct_to_cdn.png)

### 功能对比

两种功能的说明与使用场景如下：

<table>
  
<tbody><tr>
<th>功能</th>
<th>说明</th>
<th>使用场景</th>
</tr>
<tr>
<td>转推 CDN （推荐）</td>
<td>推流先经过 ZEGO 实时音视频云，再由 ZEGO 实时音视频云转推向 CDN。可使用 ZEGO 提供的实时音视频服务，可用于需要连麦互动的场景。</td>
<td>开发者与第三方 CDN 有业务合作，想要使用原有的第三方 CDN 流媒体网络的分发服务的同时又想使用 ZEGO Express SDK 进行实时连麦互动。适用于有连麦互动要求的业务场景，例如秀场直播、语聊房等。</td>
</tr>
<tr>
<td>直推 CDN</td>
<td>推流不经过 ZEGO 实时音视频云，直接推向 CDN。无法使用 ZEGO 提供的实时音视频服务，适用于单直播场景（无需互动）。</td>
<td>适用于开发者无需使用实时连麦互动等服务的情况，例如电商直播、游戏直播、大班课等。</td>
</tr>
</tbody></table>

## 前提条件

在开始之前，请确保您已完成以下步骤：

- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppID 和 AppSign，详情请参考 [控制台 - 项目信息](/console/project-info)。
- 已在项目中集成 ZEGO Express SDK，并实现了基本的音视频推拉流功能，详情请参考 [快速开始 - 集成](https://doc-zh.zego.im/article/196) 和 [快速开始 - 实现流程](https://doc-zh.zego.im/article/7628)。



## 转推 CDN

<Note title="说明">

如果您直接将流推送到 CDN，请跳过此步骤。

</Note>


当推流成功后，可调用 [addPublishCdnUrl](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoExpressEngine#add-publish-cdn-url-stream-id-callback) 接口增加动态转推至 CDN 的 URL，即可将流转推到 ZEGO 的自有 CDN 或第三方 CDN，支持转推地址格式为 RTMP 流。

<Note title="说明">

如果您需要将流转推到多个第三方 CDN：

- 使用相应的 CDN URL 和相同的流 ID 多次调用 [addPublishCdnUrl](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoExpressEngine#add-publish-cdn-url-stream-id-callback)。（需要不同的 URL）
- 相应地，您需要多次调用 [removePublishCdnUrl](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoExpressEngine#remove-publish-cdn-url-stream-id-callback)，停止不同 CDN URL 的流转推。
- 您可以从 [onPublisherRelayCDNStateUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~protocol~ZegoEventHandler#on-publisher-relay-cdn-state-update-stream-id) 回调的`infoList`参数中，获取到每条转推流的状态变更通知。
</Note>


```objc
// 推流成功后，开始转推到 CDN

// 推流时使用的流 ID
NSString *streamID = @"STREAM_ID";
// 需要转推的 CDN 地址，请开发者按照实际 URL 填入，streamID 为推流的流名，可自定义
NSString *URL = @"rtmp://推流域名/接入点/streamID";
[self.engine addPublishCDNURL:URL stream:streamID callback:^(int errorCode) {
    // 获取转推 CDN 是否成功的通知
    if(errorCode == 0) {
        // 转推成功
    } else {
        // 转推失败，可能由于网络原因转推请求发送失败
    }
}];
```

## （可选）监听 CDN 转推状态通知

### 添加/删除转推 CDN 地址状态回调

开发者可通过注册 [onPublisherRelayCDNStateUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~protocol~ZegoEventHandler#on-publisher-relay-cdn-state-update-stream-id) 获取添加/删除转推 CDN 地址状态回调。在 ZEGO RTC 服务器将音视频流转推到 CDN 后，如果 CDN 转推状态发生变化，例如出现转推停止或转推重试，将会收到此回调。

<Note title="说明">

开发者可根据该回调判断转推 CDN 的音视频流是否正常：
- 若不正常根据异常原因进一步定位转推 CDN 的音视频流异常的原因，以及做对应的容灾策略。
- 若对异常的原因不了解，可联系 ZEGO 技术支持分析具体异常的原因。
</Note>


```objc
- (void)onPublisherRelayCDNStateUpdate:(NSArray<ZegoStreamRelayCDNInfo *> *)infoList streamID:(NSString *)streamID {
}
```

### 转推 CDN 信息详解

转推 CDN 信息 [ZegoStreamRelayCDNInfo](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoStreamRelayCDNInfo) 包含了 CDN 推流的 URL，转推状态，转推状态变更的原因状态发生的时间。[ZegoStreamRelayCDNInfo](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoStreamRelayCDNInfo) 内所有参数如下：

|参数名|说明|
|-|-|
|url|CDN 推流的 URL。|
|state|转推状态。|
|updateReason|转推状态变更的原因。|
|stateTime|状态发生的时间。|

其中，state 取值如下：

|枚举值|说明|
|-|-|
|ZegoStreamRelayCDNStateNoRelay|未转推状态，在转推前处于该状态。如果转推过程出现持续的异常，例如转推地址不正确，都会进入未转推状态。|
|ZegoStreamRelayCDNStateRelayRequesting|正在请求转推状态，转推操作执行成功后会进入正在请求转推状态，通常通过该状态进行应用界面的展示。如果因为网络质量不佳产生的中断，SDK 会进行内部重试，也会回到正在转推状态。|
|ZegoStreamRelayCDNStateRelaying |正在转推状态，进入该状态表明转推已成功。|

updateReason 取值如下：

|枚举值|说明|
|-|-|
|ZegoStreamRelayCDNUpdateReasonNone|无。|
|ZegoStreamRelayCDNUpdateReasonServerError|服务器错误。|
|ZegoStreamRelayCDNUpdateReasonHandshakeFailed|握手失败。|
|ZegoStreamRelayCDNUpdateReasonAccessPointError|接入点错误。|
|ZegoStreamRelayCDNUpdateReasonCreateStreamFailed|创建流失败。|
|ZegoStreamRelayCDNUpdateReasonBadName|流 ID 不合法。|
|ZegoStreamRelayCDNUpdateReasonCDNServerDisconnected|CDN 服务器主动断开。|
|ZegoStreamRelayCDNUpdateReasonDisconnected|主动断开。|
|ZegoStreamRelayCDNUpdateReasonMixStreamAllInputStreamClosed|混流的全部输入流会话关闭。|
|ZegoStreamRelayCDNUpdateReasonMixStreamAllInputStreamNoData|混流的全部输入流没有数据。|
|ZegoStreamRelayCDNUpdateReasonMixStreamServerInternalError|混流服务器内部错误。|


## 停止将流转推到 CDN

如需停止将流转推到指定的 CDN URL，请调用 [removePublishCdnUrl](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoExpressEngine#remove-publish-cdn-url-stream-id-callback) 方法。

<Warning title="注意">

该接口并不会停止正在推往 ZEGO 实时音视频云的音视频流。
</Warning>

```objc
// 用于推流的流 ID。
NSString *streamID = @"STREAM_ID";
// 停止将流转推到指定的 CDN URL，根据实际情况填写 URL。
NSString *URL = @"rtmp://xxxxxxxx";
[self.engine removePublishCDNURL:URL stream:streamID callback:^(int errorCode) {
    // 获取停止转推操作是否成功的通知。
    if(errorCode == 0) {
        // 停止流转推成功。
    } else {
        // 停止将流转推到 CDN 失败，可能是由于网络错误导致请求未发送。
    }
}];
```


## 直推 CDN

<Note title="说明">

如果您正在将流转推到 CDN，请跳过此步骤。
</Note>

在推流前调用 [enablePublishDirectToCDN](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoExpressEngine#enable-publish-direct-to-cdn-config) 接口将音视频流直接推往 CDN。

<Warning title="注意">

调用 [enablePublishDirectToCDN](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoExpressEngine#enable-publish-direct-to-cdn-config-channel) 接口后再调用 [addPublishCdnUrl](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoExpressEngine#add-publish-cdn-url-stream-id-callback) 与 [removePublishCdnUrl](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoExpressEngine#remove-publish-cdn-url-stream-id-callback) 动态转推至 CDN 则不再生效。因为这两个接口是从 ZEGO 实时音视频云，将音视频流转推或停止转推到 CDN，若将音视频流直接推往 CDN，则无法通过 ZEGO 实时音视频云，将音视频流再动态转推至 CDN。
</Warning>


```objc
ZegoCDNConfig *config = [[ZegoCDNConfig alloc] init];
// URL 需要开发者根据实际情况填写，streamID 为推流的流名，可自定义
config.URL = @"rtmp://推流域名/接入点/streamID";
[self.engine enablePublishDirectToCDN:YES config:config];
[self.engine startPublishing:@"STREAM_ID"];
```

## 停止将流直推 CDN

若需停止直推 CDN，调用 [stopPublishingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoExpressEngine#stop-publishing-stream) 接口停止推流即可。

停止推流后，若下一次推流无需直推 CDN，则可以调用 [enablePublishDirectToCDN](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoExpressEngine#enable-publish-direct-to-cdn-config) 并传值为 “false” 关闭直推 CDN 功能。在推流途中调用此接口不会影响此次推流。

```objc
[[ZegoExpressEngine sharedEngine] stopPublishingStream];
ZegoCDNConfig *config = [[ZegoCDNConfig alloc] init];
[[ZegoExpressEngine sharedEngine] enablePublishDirectToCDN:NO config:config];
```
