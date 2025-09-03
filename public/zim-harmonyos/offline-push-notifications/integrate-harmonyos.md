华为推送服务将通知消息分为**资讯营销**、**服务与通讯**两种。**资讯营销**类消息的每日推送数量有上限，**服务与通讯**类消息每日推送数量无上限，详情请参考华为官网文档 <a href="https://developer.huawei.com/consumer/cn/doc/development/HMSCore-Guides/message-restriction-description-0000001361648361?ha_source=hms5" target="_blank" rel="noreferrer noopener">推送数量管理细则</a>。

<table>
<tbody><tr>
<th>消息分类</th>
<th>类型说明</th>
<th>推送数量限制</th>
</tr>
<tr>
<td>资讯营销类消息</td>
<td><ul><li>内容资讯：内容推荐，新闻，财经动态，生活资讯，社交动态，调研，其他。</li><li>营销活动：产品促销，功能推荐，运营活动。</li></ul></td>
<td><ul><li>新闻阅读类：5条/日。</li><li>其他应用类型：2条/日。</li></ul></td>
</tr>
<tr>
<td>服务与通讯类消息</td>
<td><ul><li>社交通讯：即时聊天，音频、视频通话。</li><li>服务提醒：订阅，出行，健康，工作事项提醒等。</li></ul></td>
<td>无限制。</td>
</tr>
</tbody></table>

# HarmonyOS 推送集成指南

---

## 概述

开发者使用 ZIM 提供的“离线推送”功能之前，请参考本文，接入 HarmonyOS 的原生离线推送功能。  

## 前提条件

在接入 `HarmonyOS` 的离线推送通道之前，请确保：

- 已集成最新版本的 ZIM SDK，详情请参考 [快速开始 - 实现基本收发消息](/zim-harmonyos/send-and-receive-messages)。
- 已完成如下步骤：

    - 前往 <a href="https://developer.huawei.com/consumer/cn/" target="_blank" rel="noreferrer noopener">华为开发者后台</a> 注册开发者账号，并进行认证，详情请参考华为开发者文档 <a href="https://developer.huawei.com/consumer/cn/doc/start/registration-and-verification-0000001053628148" target="_blank" rel="noreferrer noopener">注册帐号</a>、<a href="https://developer.huawei.com/consumer/cn/doc/start/itrna-0000001076878172" target="_blank" rel="noreferrer noopener">实名认证</a>。
    - 前往 <a href="https://developer.huawei.com/consumer/cn/service/josp/agc/index.html#/">AppGallery Connect</a> 开通 HarmonyOS 推送服务，详情请参考华为开发者文档 <a href="https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/push-config-setting" target="_blank" rel="noreferrer noopener">HarmonyOS - 开通推送服务</a>。
    - 申请服务账号密钥，保存生成的 JSON 文件，详情请参考华为开发者文档 <a href="https://developer.huawei.com/consumer/cn/doc/start/api-0000001062522591#section14931730144919" target="_blank" rel="noreferrer noopener">HarmonyOS - API 服务操作指南 - 服务账号密钥</a>。

## 使用步骤

请在 [ZEGO 控制台](https://console.zego.im/) 自助配置 ZIM 离线推送（详情请参考 [项目管理 - 即时通讯 - 离线推送配置](https://doc-zh.zego.im/article/16233)），提供 **服务账号密钥 JSON 文件**。若无法配置，请联系 ZEGO 技术支持处理。

## 华为推送消息限制

<Content />

## 基于消息分类实现无限制推送

1. 华为可通过自分类权益来实现不限量推送，开发者需要在华为控制台申请自分类权益，请参考华为官方文档 <a href="https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/push-apply-right#section16708911111611" target="_blank" rel="noreferrer noopener">消息分类标准 - 自分类权益申请</a>，申请消息自分类 为 `IM` 的权益。

2. 通过 ZIM 发起离线推送时，将会按照 `IM` 类型的自分类类型来进行推送。