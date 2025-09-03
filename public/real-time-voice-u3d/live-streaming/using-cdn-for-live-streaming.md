# 使用 CDN 直播

---

## 功能简介

ZEGO Express SDK 支持推流到 CDN（Content Delivery Network，内容分发网络），包括转推 CDN 和直推 CDN 两种功能。开发者基于该功能可打通 RTC 产品和 CDN 直播产品，方便用户从网页或第三方播放器直接观看和收听直播内容。为了保证安全，推流到 CDN 时默认开启 CDN 鉴权。

为防止攻击者盗取或伪造您的推流 URL 地址，您可以参考 [CDN 推流鉴权](https://doc-zh.zego.im/article/15834)，提升您推流使用的安全性。

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

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Android/streamByCdn/direct_to_cdn.png" /></Frame>

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

在使用 CDN 直播之前，请确保：

- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppID 和 AppSign，详情请参考 [控制台 - 项目信息](/console/project-info)。
- 已在项目中集成 ZEGO Express SDK，并实现了基本的音视频推拉流功能，详情请参考 [快速开始 - 集成](https://doc-zh.zego.im/article/13242) 和 [快速开始 - 实现流程](https://doc-zh.zego.im/article/13243)。

<Warning title="注意">


CDN 直播功能不是默认开启的，使用前请在 [ZEGO 控制台](https://console.zego.im) 自助开通（开通步骤请参考 [项目管理 - 服务配置](/console/service-configuration/activate-cdn-service) 中的“CDN”），或联系 ZEGO 技术支持开通。

</Warning>



## 示例源码下载

请参考 [下载示例源码](https://doc-zh.zego.im/article/13241) 获取源码。

相关源码请查看 “Assets/ZegoExpressExample/Examples/AdvancedStreaming/StreamByCDN” 目录下的文件。

## 转推 CDN

<Note title="说明">


若选择使用直推 CDN 功能，则无需执行本节所有步骤，请参考 [直推 CDN](https://doc-zh.zego.im/article/16347#5)。


</Note>



### 初始化和登录房间

请参考 [快速开始 - 实现流程](https://doc-zh.zego.im/article/13243#CreateEngine) 的 “创建引擎”、“登录房间”。

### 开始推流

请参考 [快速开始 - 实现流程](https://doc-zh.zego.im/article/13243#publishingStream) 的 “推流”。

### 开始转推

当推流成功后，调用 [AddPublishCdnUrl](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~ZegoExpressEngine#add-publish-cdn-url) 接口增加动态转推至 CDN 的 URL，即可将已经成功推向 ZEGO 实时云的音视频流动态向第三方 CDN 进行转推。支持的转推地址格式为 “rtmp”。

<Note title="说明">


- 若开发者有转推到多家第三方 CDN 厂商的需求，可使用同一个流 ID 多次调用 [AddPublishCdnUrl](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~ZegoExpressEngine#add-publish-cdn-url) 接口（URL 需要不同）。
- 开发者转推到多家第三方 CDN 后，停止转推时也同样需要调用多次来停止所有转推的流。
- 开发者转推到多家第三方 CDN 后，可从 CDN 回调状态通知 [OnPublisherRelayCDNStateUpdate](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~IZegoEventHandler#on-publisher-relay-cdn-state-update) 的列表参数中获取到每条转推流的状态变更通知。**在 WebGL 平台上运行时，不支持该回调状态通知。**

</Note>





```csharp
// 推流成功后，开始转推到 CDN

// 推流时使用的流 ID
string streamID = "STREAM_ID";
// 需要转推的 CDN 地址，请开发者按照实际 URL 填入，streamID 为推流的流名，可自定义
string URL = "rtmp://推流域名/接入点/streamID";
engine.AddPublishCdnUrl(streamID, URL, (int errorCode)=>{
    if(errorCode == 0)
    {
        // 转推成功
    } else
    {
        // 转推失败，可能由于网络原因转推请求发送失败
    }
});
```


### （可选）监听 CDN 回调的状态通知


#### 添加/删除转推 CDN 地址状态回调

开发者可通过设置 [OnPublisherRelayCDNStateUpdate](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~IZegoEventHandler#on-publisher-relay-cdn-state-update) 委托获取添加/删除转推 CDN 地址状态回调。在 ZEGO RTC 服务器将音视频流转推到 CDN 后，如果 CDN 转推状态发生变化，例如出现转推停止或转推重试，将会收到此回调。

<Warning title="注意">


在 WebGL 平台上运行时，不支持该回调状态通知。

</Warning>



<Note title="说明">


开发者可根据该回调判断转推 CDN 的音视频流是否正常：
- 若不正常根据异常原因进一步定位转推 CDN 的音视频流异常的原因，以及做对应的容灾策略。
- 若对异常的原因不了解，可联系 ZEGO 技术人员分析具体异常的原因。

</Note>




```cs
public delegate void OnPublisherRelayCDNStateUpdate(string streamID, List<ZegoStreamRelayCDNInfo> infoList);

engine.OnPublisherRelayCDNStateUpdate = (string streamID, List<ZegoStreamRelayCDNInfo> infoList)=>{

};
```

#### 转推 CDN 信息详解

转推 CDN 信息 [ZegoStreamRelayCDNInfo](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~struct~ZegoStreamRelayCDNInfo) 包含了 CDN 推流的 URL，转推状态，转推状态变更的原因状态发生的时间。[ZegoStreamRelayCDNInfo](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~struct~ZegoStreamRelayCDNInfo)内所有参数如下：

<Warning title="注意">


在 WebGL 平台上运行时，没有转推 CDN 信息 [ZegoStreamRelayCDNInfo](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~struct~ZegoStreamRelayCDNInfo)。

</Warning>



|参数名|说明|
|-|-|
|url|CDN 推流的 URL。|
|state|转推状态。|
|updateReason|转推状态变更的原因。|
|stateTime|状态发生的时间。|

其中，state 取值如下：

|枚举值|说明|
|-|-|
| ZegoStreamRelayCDNState.NoRelay |未转推状态，在转推前处于该状态。如果转推过程出现持续的异常，例如转推地址不正确，都会进入未转推状态。|
| ZegoStreamRelayCDNState.RelayRequesting |正在请求转推状态，转推操作执行成功后会进入正在请求转推状态，通常通过该状态进行应用界面的展示。如果因为网络质量不佳产生的中断，SDK 会进行内部重试，也会回到正在转推状态。|
| ZegoStreamRelayCDNState.Relaying |正在转推状态，进入该状态表明转推已成功。|

updateReason 取值如下：

|枚举值|说明|
|-|-|
| ZegoStreamRelayCDNUpdateReason.None |无。|
| ZegoStreamRelayCDNUpdateReason.ServerError |服务器错误。|
| ZegoStreamRelayCDNUpdateReason.HandshakeFailed |握手失败|。
| ZegoStreamRelayCDNUpdateReason.AccessPointError |接入点错误。|
| ZegoStreamRelayCDNUpdateReason.CreateStreamFailed |创建流失败。|
| ZegoStreamRelayCDNUpdateReason.BadName |流 ID 不合法。|
| ZegoStreamRelayCDNUpdateReason.CDNServerDisconnected |CDN 服务器主动断开。|
| ZegoStreamRelayCDNUpdateReason.Disconnected |主动断开。|
| ZegoStreamRelayCDNUpdateReason.MixStreamAllInputStreamClosed |混流的全部输入流会话关闭。|
| ZegoStreamRelayCDNUpdateReason.MixStreamAllInputStreamNoData |混流的全部输入流没有数据。|
| ZegoStreamRelayCDNUpdateReason.MixStreamServerInternalError |混流服务器内部错误。|


### 停止转推

调用 [RemovePublishCdnUrl](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~ZegoExpressEngine#remove-publish-cdn-url) 即可删除动态转推至 CDN 的 URL。**调用 [removePublishCdnUrl](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~ZegoExpressEngine#remove-publish-cdn-url) 接口停止转推时，请确保当前流 streamID 是存在的。**

<Warning title="注意">


该接口并不会停止推往 ZEGO 实时音视频云的音视频流。


</Warning>




```csharp
// 推流时使用的流 ID
string streamID = "STREAM_ID";
// 需要停止转推的 CDN 地址，请开发者按照实际 URL 填入，streamID 为推流的流名
string URL = "rtmp://推流域名/接入点/streamID";
engine.RemovePublishCdnUrl(streamID, URL, (int errorCode)=>{
    if(errorCode == 0)
    {
        // 停止转推成功
    } else
    {
        // 停止转推失败，可能由于网络原因停止转推请求发送失败
    }
});
```


## 直推 CDN

<Warning title="注意">


- 在 WebGL 平台上运行时，不支持直推 CDN。
- 若选择使用转推 CDN 功能，则无需执行本节所有步骤，请参考 [转推 CDN](https://doc-zh.zego.im/article/16347#4)。

</Warning>



### 开始直推 CDN

在推流前调用 [EnablePublishDirectToCDN](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~ZegoExpressEngine#enable-publish-direct-to-cdn) 接口将音视频流直接推往 CDN。

<Warning title="注意">


- 调用 [EnablePublishDirectToCDN](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~ZegoExpressEngine#enable-publish-direct-to-cdn) 接口后再调用 [AddPublishCdnUrl](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~ZegoExpressEngine#add-publish-cdn-url) 与 [RemovePublishCdnUrl](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~ZegoExpressEngine#remove-publish-cdn-url) 动态转推至 CDN 则不再生效，因为这两个接口是从 ZEGO 实时音视频云将音视频流转推或停止转推到 CDN，若将音视频流直接推往 CDN 则无法通过 ZEGO 实时音视频云将音视频流再动态转推至 CDN。
- 若调用 [EnablePublishDirectToCDN](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~ZegoExpressEngine#enable-publish-direct-to-cdn) 接口出现 1000038 错误码，可能存在的问题有：域名配置错误、媒体网络异常或媒体网络链接为空，请联系 ZEGO 技术支持。

</Warning>





```csharp
ZegoCDNConfig config = new ZegoCDNConfig();
// URL 需要开发者根据实际情况填写，streamID 为推流的流名，可自定义
config.url = "rtmp://推流域名/接入点/streamID";
engine.EnablePublishDirectToCDN(true, config);
engine.StartPublishingStream("STREAM_ID");
```

### 停止直推 CDN

若需停止直推 CDN，调用 [StopPublishingStream](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~ZegoExpressEngine#stop-publishing-stream) 接口停止推流即可。

停止推流后，若下一次推流无需直推 CDN，则可以调用 [EnablePublishDirectToCDN](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~ZegoExpressEngine#enable-publish-direct-to-cdn) 接口并传值为 “false” 关闭直推 CDN 功能。在推流途中调用此接口不会影响此次推流。

```csharp
engine.StopPublishingStream();
ZegoCDNConfig cdnConfig = new ZegoCDNConfig();
engine.EnablePublishDirectToCDN(false, cdnConfig);
```

## 观众拉流

- 当推流方直推 CDN 时，拉流方可以直接通过 streamID 进行拉流，请参考 [快速开始 - 实现流程](https://doc-zh.zego.im/article/13243#PlayingStream) 的 “拉流”。

- 当音视频流转推 CDN 成功后，开发者希望用户从 CDN 进行拉流时，需要使用传入 URL 的自定义拉流方式进行拉流，而不能通过流 ID 进行拉流。URL 拉流的操作步骤可参考 [通过 URL 拉流](https://doc-zh.zego.im/article/15173#ZegoCDNConfig) 中的 “1 配置拉流参数” 和 “2 开始拉流”。

<Content />

