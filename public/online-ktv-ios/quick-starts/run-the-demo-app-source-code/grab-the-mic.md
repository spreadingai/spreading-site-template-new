# 抢唱体验 App

- - -

<Warning title="注意">
- 该源码仅供开发者接入时参考，ZEGO 不负责源码的后续维护。若开发者计划将该源码用于生产环境，请确保发布前进行充分测试，避免发生潜在问题造成损失。
- 该源码中提供的业务后台地址仅用于跑通示例源码，如果您需要上线正式产品，请自行编写、搭建自己的业务后台。
- 开发者的 AppID 在使用 GoEnjoy 和 GoClass 中的任一功能时，有效期均为 30 天。如需继续使用相关服务，请自行搭建您的业务后台，或更换 AppID 使用。
- 更多相关源码，请参考 [CodeStore](https://codestore.zego.im/)。
</Warning>

体验 App 源码为 iOS 客户端体验 App 源码。下文介绍如何运行体验 App 源码


## 准备环境

在运行体验 App 源码前，请确保开发环境满足以下要求：

- Xcode 15.0 及以上版本。
- iOS 13.0 或以上版本且支持音视频的 iOS 设备（仅支持真机）。
- iOS 设备、macOS 开发电脑已经连接到 Internet。

## 前提条件

- 已在 [ZEGO 控制台](https://console.zego.im/) 创建项目，并申请有效的 AppID，详情请参考 [控制台 - 项目管理 - 项目信息](/console/project-info)。
- 已在 [ZEGO 控制台](https://console.zego.im) 开通即时通讯服务，详情请参考控制台的 [服务配置 - 即时通讯 - 开通服务](/console/service-configuration/im/activate-service)。
- 已联系 ZEGO 技术支持开通版权音乐服务。

## 获取示例源码

<Card title="示例源码" href="https://codestore.zego.im/project/18" target="_blank">点击获得完整代码。</Card>

通过以上卡片获取示例源码压缩包后，将其解压获取示例源码文件夹。

## 运行体验 App 源码

1. 下载并解压体验 App 源码，得到 "GoKTVGrab_iOS_Sourcecode" 文件夹。

2. 打开 “GoKTVGrab_iOS_Sourcecode” 文件夹，找到 “GoEnjoy.xcworkspace” 文件，双击运行。

    <Frame width="512" height="auto" ><img src="https://doc-media.zego.im/sdk-doc/Pics/GoEnjoy/Grab/iOS/run_example/grab_ios_proj_path.jpg" /></Frame>

3. 下载的源码中缺少 SDK 初始化所需的 APP_ID 和 APP_SIGN。
    
    按照文件路径 “ GoKTVGrab_iOS_Sourcecode/GoEnjoy/Config/KeyCenter.h”，找到 “KeyCenter.h” 文件。
    使用本文 [前提条件](/online-ktv-ios/quick-starts/run-the-demo-app-source-code/grab-the-mic#前提条件) 已获取的 AppID 和 AppSign 正确填入（建议在 AppID 后加 “L” 避免编译错误），否则源码将无法正常运行。

    <Frame width="512" height="auto" ><img src="https://doc-media.zego.im/sdk-doc/Pics/GoEnjoy/Grab/iOS/run_example/grab_ios_keycenter.jpg" /></Frame>

    <Warning title="注意">
    - 由于体验 App 源码提供的业务后台地址对房间数量有所限制，同一个 AppID 同时创建的房间数量上限为 10。所以此后台地址仅限用于跑通体验 App 源码，请勿用于正式产品上线。
    - 若您需要上线正式产品，请自行搭建业务后台。
    </Warning>

4. 在 Xcode 中点击左侧项目名称，在 "TARGETS" 里选中 “GoEnjoy”，然后选中一个 iOS 真机设备。

    <Frame width="512" height="auto" ><img src="https://doc-media.zego.im/sdk-doc/Pics/GoEnjoy/Grab/iOS/run_example/grab_ios_run_sim.jpg" /></Frame>

5. 若要在真机运行，点击左侧的项目名称，单击 “Signing & Capabilities” 选项卡，在 “Team” 中选择自己的开发者证书和 Bundle Identifier。

    <Frame width="512" height="auto" ><img src="https://doc-media.zego.im/sdk-doc/Pics/GoEnjoy/Grab/iOS/run_example/grab_ios_signing.jpg" /></Frame>

6. 单击 Xcode 左上角的 “Build” 按钮编译和运行源码。

    <Frame width="512" height="auto" ><img src="https://doc-media.zego.im/sdk-doc/Pics/GoEnjoy/Grab/iOS/run_example/grab_ios_run.png" /></Frame>

## 常见问题

### Xcode14 处理 pod 签名问题时报错，应该如何处理？

问题如图所示：

<Frame width="auto" height="auto" ><img src="https://doc-media.zego.im/sdk-doc/Pics/GoEnjoy/Grab/iOS/run_example/xcode14.jpg" /></Frame>

请如下图所示，分别选中所有蓝色的资源 bundle 图标（GoIMChat-GoIMChatRosource、GoKit-GoKit、KTVGrab-KTVGrabResource），然后在 "Team" 中选中并设置您的开发者账户。
<Frame width="auto" height="auto" ><img src="https://doc-media.zego.im/sdk-doc/Pics/GoEnjoy/Grab/iOS/run_example/faq_xcode14.jpg" /></Frame>
