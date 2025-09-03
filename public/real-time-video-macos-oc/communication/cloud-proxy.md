# 云代理

- - -

## 功能简介

通过设置 SDK 的云代理接口，将 SDK 对应的所有流量通过云端的代理服务器中转，实现与 RTC、L3（[超低延迟直播](https://doc-zh.zego.im/article/6778)）通信。

<Warning title="注意">

- “云代理”功能是`付费`功能，如果您需要使用此功能，请联系 ZEGO 商务人员咨询。
- 开通云代理服务后，如果企业有配置防火墙，还需要将云代理使用的 IP、域名、端口加入企业防火墙白名单。
</Warning>

<Frame width="512" height="auto" caption="">
  <img src="https://doc-media.zego.im/sdk-doc/Pics/Express/Cloud_Proxy.png" />
</Frame>

当前 ZEGO 提供了 `普通云代理` 和 `智能云代理` 两种模式，开发者可以根据您的业务需要，选择合适的云代理模式。

<table>

<tbody><tr>
<th></th>
<th>普通云代理</th>
<th>智能云代理</th>
</tr>
<tr>
<td>方案说明</td>
<td>初始化 SDK 时，直接使用云代理模式。</td>
<td><p>初始化 SDK 时，优先使用直连网络模式进行尝试。</p><ol><li>如果在 1 秒内有网络连通，则继续使用直连模式。</li><li><p>如果在 1 秒内，没有网络连通：</p><ul><li>如果当前是蜂窝网络，则继续留在直连模式重试。</li><li><b>如果当前是非蜂窝网络，则切到云代理模式。</b></li></ul></li></ol><p>当网络切换时，如果检测到有网络连通、且当前处于直连模式，则会直接按照 SDK 初始化的逻辑进行尝试。</p></td>
</tr>
<tr>
<td>适用场景</td>
<td>当您处于如医院、政府、公司内部等有内网等限制性的网络环境下时，希望使用公有云 RTC 或 L3 服务。</td>
<td>当您的用户处于既有公网、又有限制性网络的场景中，且您无法判断用户的网络使用情况，希望可以优先使用公有云 RTC 或 L3 服务，公有云 RTC 或 L3 服务不可用时，再使用云代理服务。</td>
</tr>
</tbody></table>

## 前提条件

在使用云代理之前，请确保：

- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppID 和 AppSign，详情请参考 [控制台 - 项目信息](/console/project-info)。
- 已在项目中集成 ZEGO Express SDK，并实现了基本的音视频推拉流功能，详情请参考 [快速开始 - 集成](https://doc-zh.zego.im/article/1400) 和 [快速开始 - 实现流程](https://doc-zh.zego.im/article/7629)。


## 使用流程

### 1 开通云代理服务

向 ZEGO 技术支持申请开通云代理服务。开通服务后，开发者将会获取到一个云代理域名与端口信息。

### 2 配置云代理

调用 [setCloudProxyConfig](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_macos~class~ZegoExpressEngine#set-cloud-proxy-config-token-enable) 配置云代理。

<Warning title="注意">


此接口必须在调用 [createEngineWithProfile](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_macos~class~ZegoExpressEngine#create-engine-with-profile-event-handler) 接口创建引擎前调用。
</Warning>

- 接口原型

```objc
/**
 * 设置云代理。
 *
 * 此接口需要在 createEngineWithProfile 之前调用。
 * 调用此接口后，Express SDK 所有的网络请求与发送将通过云代理中转。
 *
 * @param proxyList 云代理信息列表，支持设置多个云代理信息。
 * @param token 鉴权 token，如果客户使用的鉴权方式是 appsign，这里可为空。否则必须填 token。
 * @param enable 是否启用云代理
 */
(void)setCloudProxyConfig:(NSArray<ZegoProxyInfo *> *)proxyList
                    token:(NSString *)token
                   enable:(BOOL)enable;
```

- 调用示例

```objc
 ZegoProxyInfo* proxy = [ZegoProxyInfo alloc];
// 域名与端口，开发者根据开通云代理服务时获取的相关信息填写
 proxy.hostName = @"xxxxxxxxxxxxx.zego.im";
 proxy.port = 10826;
 NSArray<ZegoProxyInfo *> *inputArray = @[proxy];
 [ZegoExpressEngine setCloudProxyConfig:inputArray token:@"" enable:TRUE];
```

## 常见问题

**设置云代理不生效要如何解决？**
- 确保已联系 ZEGO 技术支持开通云代理服务，获取到有效的云代理端口与域名。
- 确保在 [createEngineWithProfile](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_macos~class~ZegoExpressEngine#create-engine-with-profile-event-handler) 前正确设置云代理，不支持中途修改。

**是否提供本地代理方案？**

提供，详情请参考 [本地代理](/real-time-video-ios-oc/communication/local-proxy)。

<Content />