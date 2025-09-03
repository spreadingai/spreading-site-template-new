# 概述

---

## 产品简介

ZEGO 即时通讯（ZEGO Instant Messaging，ZIM）是一款实时的通信互动产品，为开发者提供全平台互动、海量并发、超低延时、消息必达的通信服务，助力打造大型直播、语聊房、客服系统等场景。

ZEGO 提供 ZIM + RTC 服务联动的场景解决方案，公开 [语聊房](https://doc-zh.zego.im/article/15942)、[秀场直播](https://doc-zh.zego.im/article/15942) 等业务场景搭建的示例源码，帮助开发者能在极短的时间内搭建完美的业务场景。


## 产品优势

### 全球通信
使用优秀的全球网络调度策略，满足 200 多个国家和地区的超低延迟通信需求。

### 海量并发
在线人数无上限，支持亿量级消息并发，满足任何消息通信需求。

### 超低延时
服务器分布式部署，实现延时在 200 ms 以内的消息传输。

### 消息必达
设立消息的优先级，保证重要消息最优先推送，保证所有消息必达。

### 弱网高可用
建立久经用户考验的网络策略，在 90% 丢包率情况下仍可做到登录、消息通信等功能。

## 功能简介

| 主要功能 | 功能描述 |
|-----|-----|
| 登录状态监控 | 支持在登录状态下，定时心跳机制监控在线情况，并实时更新登录状态。 |
| 会话模块 | 支持获取会话列表，向指定用户 ID、房间 ID 、群组 ID 发送消息。 |
| [房间](/zim-macos/introduction/basic-concepts#房间)模块 | 支持创建房间、销毁房间，适用于直播、语聊房等临时性活动。 |
| [群组](/zim-macos/introduction/basic-concepts#群组)模块 | 支持创建群组、解散群组，持久化存储群组关系链。 |
| 消息模块 | 支持向用户和房间发送文本等类型的消息。 |
| 消息优先级 | 支持设置消息优先级，优先保证高优先级消息传输。 |
| 历史消息存储 | 支持存储历史消息内容。 |
| 系统消息推送 | 支持通过服务端下发系统消息。 |
| 呼叫邀请 | 支持主叫向被叫发送呼叫邀请，被叫接受或拒绝邀请。 |


## 适用场景

| 行业 | 适用场景 |
|-----|-----|
| 电商购物 | 买家和卖家、客服之间需要通信，发送文本、图片、订单等消息。 |
| 娱乐社交 | 用户之间消息通信，通过呼叫邀请建立音视频连接。 |
| 互动直播 | 直播内的弹幕消息、礼物消息，语聊房内的麦位控制。 |
| 在线教育 | 老师和学生在课堂上、课后有文本、图片等内容沟通。 |
| 在线咨询 | 用户之间进行 1v1 沟通，发送文本、图片、语音、呼叫邀请等消息。 |
| 办公工具 | 用户之间的文本、语音、视频、文件沟通。 |
| 在线游戏 | 游戏内多人语音、文字沟通。 |
| 智能硬件 | 实现对智能家居、智能手表等硬件远程控制。 |


## 平台兼容

| 平台 | 支持版本 |
|-----|-----|
| [Android](https://doc-zh.zego.im/zim-android/introduction/overview) | 支持 Android 4.1 或以上版本，支持 JDK 1.6 或以上版本。 |
| [HarmonyOS](https://doc-zh.zego.im/zim-harmonyos/introduction/overview) | <ul><li>系统版本：HarmonyOS 5.0.0 Release 或以上版本</li><li>SDK 版本：HarmonyOS 5.0.0 Release SDK。（OpenHarmony SDK Ohos_sdk_public 5.0.0.71 (API Version 12 Release)）或以上版本。</li><li>DevEco Studio 版本：DevEco Studio 5.0.0 Release（5.0.3.910）或以上版本。</li></ul> |
| [iOS](https://doc-zh.zego.im/zim-ios/introduction/overview) | 支持 iOS 11.0 或以上版本。 |
| [Windows](https://doc-zh.zego.im/zim-win/introduction/overview) | 支持 Windows 7 或以上版本，支持 32 位与 64 位。 |
| [macOS](https://doc-zh.zego.im/zim-macos/introduction/overview) | 支持 macOS 10.13 或以上版本，支持 x64 和 ARM64 的架构。 |
| [Web](https://doc-zh.zego.im/zim-web/introduction/overview) | <ul><li>Chrome 58 或以上版本。</li><li>Firefox 56 或以上版本。</li><li>Safari 11 或以上版本。</li><li>Opera 45 或以上版本。</li><li>QQ 浏览器 Windows 10.1 或以上版本、macOS 4.4 或以上版本。</li><li>360 安全浏览器极速模式。</li></ul>  |
| [小程序](https://doc-zh.zego.im/zim-miniprogram/introduction/overview) | 微信：<ul><li>小程序基础库：2.1.0 或以上版本。</li><li>iOS 微信：6.7.0  或以上版本。</li><li>Android 微信：6.7.2 或以上版本。</li></ul>字节跳动：<ul><li>小程序基础库：2.60.0 或以上版本。</li></ul>百度：<ul><li>智能小程序基础库：3.310.11 或以上版本。</li></ul>支付宝：<ul><li>小程序基础库：1.24.9 或以上版本。</li></ul> |
| [Flutter](https://doc-zh.zego.im/zim-flutter/introduction/overview) | <ul><li>Flutter 任意版本。</li><li>Dart 版本为 [2.12.0, 3.0.0)。</li><li>iOS 11.0 或以上版本。</li><li>Android 4.1 或以上版本，支持 JDK 1.6 或以上版本。</li><li>Web：<ul><li>Chrome 58 或以上版本。</li><li>Firefox 56 或以上版本。</li><li>Safari 11 或以上版本。</li><li>Opera 45 或以上版本。</li><li>QQ 浏览器 Windows 10.1 或以上版本、macOS 4.4 或以上版本。</li><li>360 安全浏览器极速模式。</li></ul></li></ul>  |
| [uni-app x](https://doc-zh.zego.im/zim-uniapp-x/introduction/overview) | <ul><li>HBuilderX 4.27 或以上版本。</li><li>iOS 12.0 或以上版本。</li><li>Android 5.0 或以上版本。</li></ul>  |
| [uni-app](https://doc-zh.zego.im/zim-uniapp/introduction/overview) | <ul><li>HBuilderX 3.0.0 或以上版本。</li><li>iOS 11.0 或以上版本。</li><li>Android 4.4 或以上版本。</li></ul>  |
| [React Native](https://doc-zh.zego.im/zim-rn/introduction/overview) | <ul><li>React Native 0.60.0 或以上版本。</li><li>iOS 11.0 或以上版本。</li><li>Android 4.0.3 或以上版本。</li></ul>  |
| [Unity](https://doc-zh.zego.im/zim-u3d/introduction/overview) | <ul><li>2021.3.18f1c1 或以上 LTS 稳定版本（建议通过 [Unity Hub](https://unity.cn/releases/lts/2021) 下载最新的 LTS 版本）。</li><li>iOS 11.0 或以上版本。</li><li>Android 4.1 或以上版本，支持 JDK 1.6 或以上版本。</li><li>支持 macOS 10.13 或以上版本，支持 x64 和 ARM64 的架构。</li><li>支持 Windows 7 或以上版本，支持 32 位与 64 位。并安装 Visual Studio 2015 或以上版本。</li></ul>  |

## 增量大小

ZIM SDK 集成到 App 后，App 的增量大小如下：

| 平台 | 增量 |
| -- | -- |
| Android | <ul><li>arm：4.28 MB</li><li>arm64：4.99 MB</li><li>x64：5.39 MB</li><li>x86：5.42 MB</li></ul> |
| iOS | <ul><li>arm64：4.6 MB</li><li>arm64-catalyst：4.68 MB</li><li>arm64-simulator：4.68 MB</li><li>x64-catalyst: 4.96 MB</li><li>x64-simulator: 5.15 MB</li></ul> |
| macOS | <ul><li>arm64：5.75 MB</li><li>x64：6.39 MB</li></ul> |
| Windows | <ul><li>x64：6.06 MB</li><li>x86：4.99 MB</li></ul> |

如需了解更多，请参考 [什么是 SDK 的安装包大小增量？](https://doc-zh.zego.im/faq/common_faq_sdk_package_size?product=ZegoAvatar&platform=flutter)
<Content />