# 概述

## 什么是 IMKit

IMKit 是基于 ZIM SDK 的 UI 组件库。它提供了一些通用的 UI 组件，例如聊天列表、一对一聊天和群组聊天。您可以使用 IMKit 根据实际业务需求快速构建自定义的即时通讯应用程序，省去复杂的 UI 开发过程。

<div style={{width:"100%",display:"flex",gap:"10px"}}>
    <div style={{width:"30%"}}>
        <Frame width="auto" height="auto" caption="">
        <img src="https://media-resource.spreading.io/docuo/workspace735/535aa5d0e4329361d2ee094d9a68f56d/4a90d268a1.PNG" alt="IMG_0161.PNG"/>
        </Frame>
    </div>
    <div style={{width:"30%"}}>
        <Frame width="auto" height="auto" caption="">
        <img src="https://media-resource.spreading.io/docuo/workspace735/535aa5d0e4329361d2ee094d9a68f56d/9e3ef4639d.PNG" alt="IMG_0162.PNG"/>
        </Frame>
    </div>
    <div style={{width:"30%"}}>
        <Frame width="auto" height="auto" caption="">
        <img src="https://media-resource.spreading.io/docuo/workspace735/535aa5d0e4329361d2ee094d9a68f56d/8d39fa324b.PNG" alt="IMG_0163.PNG"/>
        </Frame>
    </div>
</div>

<ZIMKitOverviewIntro />

## 何时使用 IMKit

- 更快、更容易地构建应用程序

    - 当您想要尽快实现应用内聊天时

    - 当您以速度或效率为先时

- 根据需要自定义用户界面和功能

    - 当您想根据实际业务需求自定义用户界面时

    - 当您不想浪费时间开发基本功能

export function InAppChatSDKLink (props) {
    return <a href={props.inAppChatSDKHref} target="_blank">ZIM SDK</a>
}

如果要实现高度定制化的 UI 或者构建一个最细粒度的应用内聊天应用程序，您可以尝试使用我们的 <InAppChatSDKLink inAppChatSDKHref={props.inAppChatSDKHref} /> 进行完全定制。

<ZIMKitOverviewWhenToUse inAppChatSDKHref="https://doc-zh.zego.im/article/11587"/>

## 功能列表

- 一对一聊天和群聊
- 会话列表
- 消息列表
- 发送文本消息
- 发送和接收富媒体消息（图片、语音、视频和文件）
- 选择和删除多个消息
- 自定义用户界面


<ZIMKitOverviewEmbeddedFeatures />

## 示例 App

<CardGroup cols={2}>
<Card title="TestFlight" href="https://testflight.apple.com/join/KRhLLq7V"  target="_blank">
  从 TestFlight 下载 ZIMKit iOS 示例 App（无离线消息功能）。
</Card>
</CardGroup>

## 推荐资源

<CardGroup cols={2}>
  
  <Card title="快速开始" href="/in-app-chat-kit-ios/quick-start">
    按照步骤快速集成。
  </Card>

  <Card title="组件概述" href="/in-app-chat-kit-ios/ui-components/overview">
    在这里探索更多UI组件。
  </Card>

  <Card title="运行示例代码" href="https://github.com/ZEGOCLOUD/zego_inapp_chat_uikit_example_ios" target="_blank">
    一个快速指南，帮助您运行示例代码。
  </Card>

</CardGroup>


## 平台支持

IMKit 支持以下平台：

- [Android](https://doc-zh.zego.im/in-app-chat-kit-android/overview)
- [iOS](https://doc-zh.zego.im/in-app-chat-kit-ios/overview) 

## 发布日志

<Accordion title="点击这里了解更多" defaultOpen="false">

### 版本 2.0.0

发布日期：2023.03.24

**新功能：**

- 支持[与 音视频通话 UIKit 一起使用](/in-app-chat-kit-ios/advanced-features/use-in-conjunction-with-call-kit)

</Accordion>
