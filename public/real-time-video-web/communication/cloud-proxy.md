# 云代理

- - -

## 功能简介

通过设置 SDK 的云代理接口，将 SDK 对应的所有流量通过云端的代理服务器中转，实现与 RTC、L3（[超低延迟直播](https://doc-zh.zego.im/article/9538)）通信。

<Warning title="注意">


- “云代理”功能是`付费`功能，如果您需要使用此功能，请联系 ZEGO 商务人员咨询。
- 开通云代理服务后，如果企业有配置防火墙，还需要将云代理使用的 IP、域名、端口加入企业防火墙白名单。

</Warning>



<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Express/Cloud_Proxy.png" /></Frame>

当前 ZEGO Express Web SDK 支持 `普通云代理` 模式。

<table>

<tbody><tr>
<th></th>
<th>普通云代理</th>
</tr>
<tr>
<td>方案说明</td>
<td>初始化 SDK 时，直接使用云代理模式。</td>
</tr>
<tr>
<td>适用场景</td>
<td>当您处于如医院、政府、公司内部等有内网等限制性的网络环境下时，希望使用公有云 RTC 或 L3 服务。</td>
</tr>
</tbody></table>



## 前提条件

在使用云代理之前，请确保：

- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppID 和 Server 地址，详情请参考 [控制台 - 项目信息](/console/project-info)。
- 已在项目中集成 ZEGO Express SDK，并实现了基本的音视频推拉流功能，详情请参考 [快速开始 - 集成](https://doc-zh.zego.im/article/199) 和 [快速开始 - 实现流程](https://doc-zh.zego.im/article/7638)。

## 使用流程

### 1 开通云代理服务

向 ZEGO 技术支持申请开通云代理服务。开通服务后，开发者将会获取到一个云代理域名与端口信息。

### 2 配置云代理

调用 [setCloudProxyConfig](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#set-cloud-proxy-config) 配置云代理。

<Warning title="注意">


此接口必须在创建 [ZegoExpressEngine](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine) 引擎实例前，**通过类静态方法的方式调用**。

</Warning>



- 接口原型

```ts
/**
 * 设置云代理。
 *
 * 此接口需要在初始化 ZegoExpressEngine 实例之前调用。
 * 调用此接口后，Express SDK 所有的网络请求与发送将通过云代理中转。
 *
 * @param proxyList 云代理信息列表，支持设置多个云代理信息。
 * @param token 鉴权 token。
 * @param enable 是否启用云代理。
 */
 static setCloudProxyConfig(proxyList: ZegoProxyInfo[], token: string, enable: boolean): void;
```

- 调用示例

```ts
//域名与端口，开发者根据开通云代理服务时获取的填写
const proxyList = [
    {
        hostName: "xxx.xxx1.com",
        port: 443
    },
    {
        hostName: "xxx.xxx2.com",
        port: 443
    }
];
ZegoExpressEngine.setCloudProxyConfig(proxyList, "token", true);
```

## 常见问题

<Accordion title="设置云代理不生效要如何解决？" defaultOpen="false">
- 确保已开通云代理服务，获取到有效的代理端口与域名。
- 确保在创建 [ZegoExpressEngine](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine) 引擎实例前，正确设置云代理，不支持中途修改。
</Accordion>

<Accordion title="是否提供本地代理方案？" defaultOpen="false">
提供，详情请参考 [本地代理](https://doc-zh.zego.im/article/19011)。
</Accordion>