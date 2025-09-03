# 实时合唱体验 App

- - -


<Warning title="注意">
- 该源码仅供开发者接入时参考，ZEGO 不负责源码的后续维护。若开发者计划将该源码用于生产环境，请确保发布前进行充分测试，避免发生潜在问题造成损失。
- 该源码中提供的业务后台地址仅用于跑通示例源码，如果您需要上线正式产品，请自行编写、搭建自己的业务后台。
- 开发者的 AppID 在使用 GoEnjoy 和 GoClass 中的任一功能时，有效期均为 30 天。如需继续使用相关服务，请自行搭建您的业务后台，或更换 AppID 使用。
- 更多相关源码，请参考 [CodeStore](https://codestore.zego.im/)。
</Warning>

源码为实时合唱体验 App iOS 客户端源码。下文介绍如何运行源码：

## 准备环境

在运行源码前，请确保开发环境满足以下要求（以下说明以 macOS 开发电脑为例）：

- Xcode 15.0 或以上版本。
- iOS 13.0 或以上版本且支持音视频的 iOS 设备（仅支持真机）。

## 前提条件

- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppID 和 AppSign，详情请参考控制台的 [- 项目信息](/console/project-info)。
- 已在 [ZEGO 控制台](https://console.zego.im) 开通即时通讯服务，详情请参考控制台的 [服务配置 - 即时通讯 - 开通服务](/console/service-configuration/im/activate-service)。
- 已联系 ZEGO 技术支持开通版权音乐服务。

## 获取示例源码

<Card title="示例源码" href="https://codestore.zego.im/project/16" target="_blank">点击获得完整代码。</Card>

通过以上卡片获取示例源码压缩包后，将其解压获取示例源码文件夹。

## 运行源码

1. 从本文档开头下载源码，在本地解压后，得到 “GoSingTogether_iOS_Sourcecode” 文件夹。
   
2. 打开 “GoSingTogether_iOS_Sourcecode” 文件夹，找到 “GoEnjoy.xcworkspace” 文件，双击运行。  

    <Frame width="512" height="auto" ><img src="https://doc-media.zego.im/sdk-doc/Pics/GoEnjoy/online_KTV/SampleCodes/GoChat_xcworkspace_iOS.jpg" /></Frame>

3. 下载的源码中缺少 SDK 初始化所需的 APP_ID 和 APP_SIGN。

    按照文件路径 “GoSingTogether_iOS_Sourcecode/GoEnjoy/Config/KeyCenter.h”，找到 “KeyCenter.h” 文件。

    使用本文 [前提条件](/online-ktv-ios/quick-starts/run-the-demo-app-source-code/real-time-chorus#前提条件) 已获取的 AppID 和 AppSign 正确填入（注意：需要在 AppID 后加 “L”），否则源码将无法正常运行。

    <Frame width="512" height="auto" ><img src="https://doc-media.zego.im/sdk-doc/Pics/GoEnjoy/online_KTV/SampleCodes/keycenter.jpg" /></Frame>

    <Warning title="注意">
     - 由于体验 App 源码提供的业务后台地址对房间数量有所限制，同一个 AppID 同时创建的房间数量上限为 10。所以此后台地址仅限用于跑通体验 App 源码，请勿用于正式产品上线。
     - 若您需要上线正式产品，请自行搭建业务后台。
    </Warning>

4. 打开 Xcode，点击左侧的项目名称，单击 “Signing & Capabilities” 选项卡，在 “Team” 中选择自己的开发者证书。  
    <Frame width="512" height="auto" ><img src="https://doc-media.zego.im/sdk-doc/Pics/GoEnjoy/online_KTV/SampleCodes/Signing_Capabilities_iOS.jpg" /></Frame>

5. 选择一台已连接的 iOS 真机设备。单击 Xcode 左上角的 “Build” 按钮编译和运行源码。  
    <Frame width="512" height="auto" ><img src="https://doc-media.zego.im/sdk-doc/Pics/GoEnjoy/online_KTV/SampleCodes/demo_build_iOS.jpg" /></Frame>

## 常见问题

### Xcode14 处理 **pod 签名问题** 时报错，应该如何处理？
    
   问题如图所示：

    <Frame width="auto" height="auto" ><img src="https://doc-media.zego.im/sdk-doc/Pics/GoEnjoy/online_KTV/SampleCodes/error.jpg" /></Frame>

    请如下图所示，分别选中所有蓝色的资源 bundle 图标（GoSingTogether-ZSTResource、GoKit-GoKit、GoPersonalCenter-GoPCResource、GoSDKDetection-GoSDKDetectionResource），然后在 "Team" 中选中并设置您的开发者账户。

    <Frame width="auto
" height="auto" ><img src="https://doc-media.zego.im/sdk-doc/Pics/GoEnjoy/online_KTV/SampleCodes/code_sign.jpg" /></Frame>
