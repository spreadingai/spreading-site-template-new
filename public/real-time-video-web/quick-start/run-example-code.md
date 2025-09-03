# 示例源码运行指引

---

本文介绍如何快速跑通示例源码，体验基础的音视频通话服务。

## 准备环境

在开始集成 ZEGO Express SDK 前，请按照以下兼容性要求，安装浏览器：

|浏览器|Windows|Mac| Android |iOS |Harmony OS
| --- | --- | --- | --- | --- | --- |
| Chrome 58 或以上| ✔️ | ✔️ | ✔️ | <ul><li>iOS 14.3 或以上版本支持推拉流</li><li>iOS 14.3 以下版本仅支持拉流</li></ul> | ✖ |
| FireFox 56 或以上 | ✔️ | ✔️| ✔️  | ✖ | ✖ |
| Safari 11 或以上 |  -  |✔️|  -  | ✔️ | ✖ |
| Opera 45 或以上 | ✔️ |✔️| 部分支持 |  ✖ | ✖ |
| QQ 浏览器最新版 | ✔️ | ✔️ | 部分支持 |  ✖ | ✖ |
| 360 安全浏览器极速模式|✔️  | ✔️ | ✖ |  ✖ | ✖ |
| 微信浏览器|-| - |✔️| <ul><li>iOS 14.3 或以上版本，并且当微信版本为 6.5 或以上时，支持推拉流</li><li>iOS 14.3 以下版本仅支持拉流</li></ul> | ✖ |
| WebView| -| -| ✔️| <ul><li>iOS 14.3 或以上版本支持推拉流</li><li>iOS 14.3 以下版本仅支持拉流</li></ul> | ✖ |
| 华为浏览器 | ✖ | ✖ | ✖ | ✖ | Mate 60 Pro 机型、HarmonyOS NEXT beta 2 版本的操作系统的华为浏览器 |

<Warning title="注意">

仅支持 SSL 的 Web 服务器（HTTPS）。本地调试工具的 Web 服务域名可使用 localhost 或 127.0.0.1。

</Warning>

## 前提条件

已在 [ZEGO 控制台](https://console.zego.im/) 创建项目，申请有效的 AppID，以及获取到接入服务器的 “Server 地址”，详情请参考 [控制台 - 项目管理](/console/project-info) 中的“项目信息”。

<Warning title="注意">

Server 地址并非 ServerSecret，您可以参考下图在 ZEGO 控制台获取 Server 地址。

<Frame width="512" height="auto" caption=""><img src="https://media-resource.spreading.io/docuo/workspace564/27e54a759d23575969552654cb45bf89/e06d33eeae.jpeg" /></Frame>

</Warning>

## 获取示例源码

<CardGroup cols={2}>
<Card title="示例源码" href="https://github.com/zegoim/express-demo-web" >
GitHub下载<br/>
该示例源码展示了如何使用 API 来实现音视频业务。
</Card>
<Card title="示例源码"  href="https://gitee.com/zegodev/express-demo-web" target="_blank">
Gitee下载<br/>
该示例源码展示了如何使用 API 来实现音视频业务。
</Card>
</CardGroup>
<Card title="功能体验" href="https://zegoim.github.io/express-demo-web/src/Examples/QuickStart/CommonUsage/index.html?lang=zh">
GitHub地址
</Card>

## 示例源码目录结构

以下目录结构为 express-demo-web 子目录的文件结构，下文所涉及的文件路径均为相对于此目录的路径。
```tree
.
├── README.md
...
└── src  # 源码文件夹
    ├── Examples  # 示例代码
    │   ├── AdvancedAudioProcessing   # 音频进阶功能
    │   ├── AdvancedStreaming         # 推拉流进阶
    │   ├── AdvancedVideoProcessing   # 视频进阶功能
    │   ├── CommonFeatures            # 常用功能
    │   ├── DebugAndConfig            # 调试与配置
    │   ├── Framework                 # 最佳实践/框架相关
    │   ├── Others                    # 其他功能
    │   ├── QuickStart                # 快速开始
    │   └── Scenes                    # 最佳实践/场景相关
    ├── assets    # 资源文件夹，存放项目共用的资源文件，包括sdk、各类依赖库、翻译相关的配置文件等
    └── KeyCenter.js  # 配置相关文件，可以填写申请的appID、server地址等
```

## 运行示例源码

1. 在下载的示例源码中，使用支持的浏览器，打开 “./src/Examples/DebugAndConfig/InitSettings/index.html” 文件，输入[前提条件](#前提条件)中获取的 AppID 和 Server 地址（不是 ServerSecret）后，单击“设置”。

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Web/ExpressSDK/SampleRunningGuide/epxress_demo_new.png" /></Frame>

2. 设置完成后，可以开始体验 Demo 功能，即可使用支持的浏览器，打开 “./src/Examples” 文件夹下各场景功能的 HTML 文件。例如打开 “QuickStart/CommonUsage” 文件夹下的 “index.html”。

<Warning title="注意">


    - 如果页面存放的本地路径中带有中文字符，打开页面时，部分浏览器加载 CSS 等样式文件可能会失败，页面将显示异常。建议开发者将源码文件的路径名称全部设置为“英文字符”。
    - 为方便开发者调试，[ZEGO 控制台](https://console.zego.im/) 提供生成**临时 Token** 的功能，开发者可直接获取临时 Token 来使用，详情请参考 [控制台 - 开发辅助](/console/development-assistance/temporary-token)。但是在开发者自己的线上环境中，一定要通过自己的服务端生成 Token。

</Warning>



    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Web/ExpressSDK/SampleRunningGuide/UI_interface_new.png" /></Frame>



## 体验实时音视频功能

在真机中运行项目，运行成功后，可以看到本端视频画面。

为方便体验，ZEGO 提供了一个 [Web 端调试示例](https://zegodev.github.io/zego-express-webrtc-sample/assistDev/index.html)，在该页面下，输入相同的 AppID、RoomID，输入不同的 UserID、以及对应的 [Token](/console/development-assistance/temporary-token)，即可加入同一房间与真机设备互通。当成功开始音视频通话时，可以听到远端的音频，看到远端的视频画面。

