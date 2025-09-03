# 项目管理
- - -

<Warning title="注意">



**2021-11-16** 之后注册 [ZEGO 控制台](https://console.zego.im) 的用户，请参考控制台的 [项目管理 - 项目信息](/console-old/console/guide-doc2) 获取 AppID 等信息。


</Warning>



## 产品简介

在 [ZEGO 控制台](https://console.zego.im) 中，每一个独立的业务都需要有一个项目（AppID）与之对应。基于项目，可为其提供独立的运行环境和相关配置。

## 创建项目

1. 注册账号后，登录 [ZEGO 控制台](https://console.zego.im)，即可创建项目。

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Consle/consle_overview.png" /></Frame>

2. 弹出“创建项目”窗口后，您可以根据需要设置“项目名称”，并选择“业务地区”及“模式”。
> “业务地区”中的“海外+港澳台”也可支持国内服务。<br />
> “实时网络模式”只支持流媒体数据经过连麦服务器，可满足超低的连麦延迟体验。<br />
> “实时网络+CDN模式”支持超多人观看，具有更低的拉流成本。可在连麦服务器和 CDN 之间新增混流，进一步降低音视频成本。

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Consle/create_project.png" /></Frame>

3. 完成项目创建，查看相关配置信息。
> AppID：是每个项目的唯一标识。<br />
> AppSign：是每个项目的鉴权密钥，在进行 SDK 集成初始化时需要用到。<br />
> 当集成的 SDK 是 Web 或小程序时，还需要用到 “Server” 地址和 “LogUrl”。其中 “Server” 地址用于与 Web 服务器通讯。“LogUrl” 用于 SDK 日志上报，定位排查问题。

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Consle/create_project_success.png" /></Frame>

备注：最多可创建 20 个项目，若需创建更多项目，请联系即构的技术支持调整上限额度

## 查看项目基本信息

1. 查看项目列表
> 每个项目都有测试环境和正式环境两套相互隔离独立的环境，完成项目创建后会分配一个测试环境，供用户调试，每月有10000分钟免费，有效期2个月。<br />
> 正式环境可在集成调试完成后，申请上线，即可分配，无时间期限。

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Consle/consle_overview_project.png" /></Frame>

2. 点击项目列表的“配置”，查看单个项目基本信息
> 可在项目详情页查看 AppID、AppSign、环境配置（测试环境和正式环境在初始化 SDK 时，配置会有所差别）、后台相关密钥（使用后台服务接口时，进行鉴权）。

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Consle/config_page.png" /></Frame>

3. 可在项目详情页，“延长测试期限”和“申请上线”

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Consle/apply_online_overview.png" /></Frame>

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Consle/apply_online.png" /></Frame>

## 高级配置
每个项目可针对实际需要，配置相关的回调地址：包括流事件、房间事件、CDN事件、混流事件、呼叫邀请配置等等。更多回调配置需要，可联系我们：`400-166-8807`。

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Consle/194.png" /></Frame>


<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Consle/10241.png" /></Frame>

## 其它说明
完成项目创建后，即可选择符合自己业务场景的 SDK，进行集成调试。
详见相关 [开发者文档](https://doc-zh.zego.im/)
