# 跑通示例源码
---

<Card title="示例源码" href="https://artifact-demo.zego.im/SuperBoardSDK/iOS/DemoSourceCode/ZegoSuperBoardDemo_express_src.zip" target="_blank">
**本地下载**
</Card>

<Warning title="注意">

本示例源码仅用于演示超级白板产品功能，供开发者接入时参考，ZEGO 不负责源码的后续维护。若开发者计划将该源码用于生产环境，请确保发布前进行充分测试，避免发生潜在问题造成损失。
</Warning>

## 示例源码运行指引

### 准备环境

在运行示例源码前，请确保开发环境满足以下要求：

- Xcode 15.0 或以上版本。
- iOS 12.0 或以上版本的 iPhone 真机。
- iOS 设备已经连接到 Internet。

### 前提条件

已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppID 和 AppSign，详情请参考 [控制台 - 项目管理](https://doc-zh.zego.im/article/12107) 中的“项目信息”。

<Warning title="注意">

- 使用超级白板前，请参考 [控制台 - 服务配置 - 文件共享](https://doc-zh.zego.im/article/14338) 在 [ZEGO 控制台](https://console.zego.im) 自助开通文件共享功能（或联系 ZEGO 技术支持开通相关功能权限），否则超级白板服务无法正常使用。
- `2.3.0 或以上` 版本的 SDK 支持 Token 鉴权，若您需要升级鉴权方式，可参考 [如何从 AppSign 鉴权升级为 Token 鉴权](http://doc-zh.zego.im/faq/token_upgrade?product=ExpressVideo)。
</Warning>

### 运行示例源码

1. 打开 “AppStore”，搜索 “Xcode” 并下载安装。

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/iOS/GoClass/appstore-xcode.png" /></Frame>

2. 安装 CocoaPods，安装时的常见问题请参考 [CocoaPods 常见问题 - 安装 CocoaPods](https://doc-zh.zego.im/faq/CocoaPods_question?product=ExpressVideo&platform=macos#1)。
3. 从本文档顶部获取示例源码压缩包并解压，使用终端进入 ZegoSuperBoardDemo。
4. 执行 `pod repo update` 命令更新本地索引，确保能安装最新版本的 SDK。
5. 执行 `pod install` 命令安装 SDK。
6. 使用 Xcode 打开 “ZegoSuperBoardDemo.xcworkspace” 文件。

    a. 打开 Xcode，选择左上角的菜单 “File > Open...”。

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/iOS/GoClass/xcode-open-file.png" /></Frame>

    b. 在解压后的示例源码文件夹中，选择 “ZegoSuperBoardDemo.xcworkspace”，并单击 “Open” 打开。

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/iOS/WhiteboardExample/whiteboard_demo_dir_workspace.png" /></Frame>

7. 登录 Apple 开发者账号。

    a. 打开 Xcode，选择左上角的菜单 “Xcode > Preference”。

    b. 单击 “Account” 选项卡，单击左下角的 “+” 号，选择添加 “Apple ID”，单击 “Continue”。

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/iOS/GoClass/xcode-account.png" /></Frame>

    c. 输入 Apple ID 和 Password 登录。

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/iOS/GoClass/xcode-login-apple-id.png" /></Frame>

8. 修改 Bundle Identifier 和开发者证书。

    a. 打开 Xcode，单击左侧的 “ZegoSuperBoardDemo” 项目。

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/iOS/SuperBoard/Xcode_select.png" /></Frame>

    b. 单击 “Signing & Capabilities” 选项卡，在 Team 中选择自己的开发者证书。

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/iOS/SuperBoard/Xcode_signing1.png" /></Frame>

9. 下载的示例源码中缺少 SDK 初始化所需的 AppID 和 AppSign，需要修改 “KeyCenter.m” 文件。请使用本文 “[前提条件](#前提条件)” 已获取的 AppID 和 AppSign 正确填写，否则示例源码无法正常运行。
10. 将 iOS 设备连接到开发电脑，单击 Xcode 上方的的 “Any iOS Device”，选择该 iOS 设备（或模拟器）。

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/iOS/SuperBoard/Xcode_select_device.png" /></Frame>

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/iOS/SuperBoard/Xcode_select_phone.png" /></Frame>

11. 切换到 Podfile 文件所在的文件夹，在终端运行 `pod install` 命令，然后等待 pod 加载完毕。

12. 单击 Xcode 左上角的 “Build” 按钮编译和运行示例源码。

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/iOS/SuperBoard/Xcode_run.png" /></Frame>


## 示例源码工程简介

### 界面简介

示例源码主要包含两个页面：

- 登录页面

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/iOS/SuperBoard/iPhone_login.png" /></Frame>

- 白板文件展示和操作页面（登录成功展示）

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/iOS/SuperBoard/iPhone_Home.png" /></Frame>

### 功能区说明

白板文件展示和操作页面的功能区，主要集成了白板的绘制功能：

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/iOS/SuperBoard/Code_Main.png" /></Frame>