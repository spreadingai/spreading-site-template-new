## 示例源码运行指引


此示例源码支持 iOS 和 macOS 平台。

<Note title="说明">


由于此示例源码使用 SwiftUI 来构建界面，对开发环境的要求比较高，实际上 ZegoExpress SDK 的环境要求请参考 [快速开始-集成](https://doc-zh.zego.im/article/20948)。
</Note>

### 准备环境

请确保运行示例源码时的开发环境满足以下要求：

* Xcode 15.0 或以上版本。
* iOS 14.0 或以上版本且支持音视频的 iOS 设备或模拟器（推荐使用真机）。
* macOS 11.0 或以上版本。
* iOS 设备已经连接到 Internet。

### 前提条件

已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppID 和 AppSign，详情请参考 [控制台 - 项目管理](/console/project-info) 中的“项目信息”。

<Warning title="注意">
SDK 同时也支持 Token 鉴权，若您需要升级鉴权方式，可参考 [如何从 AppSign 鉴权升级为 Token 鉴权](/console/project-info)。
</Warning>

### 获取示例源码

<Card title="示例源码" href="https://artifact-demo.zego.im/express/example/video/apple_swift/ZegoExpressDemo_apple_swift.zip">
本地下载
</Card>

### 示例源码目录结构

下列结构为 apple_swift 子目录的文件结构，下文所涉及的文件路径均为相对于此目录的路径。

```tree
.
├─ .gitignore
├─ DownloadSDK.sh
├─ README.md
├─ README_zh.md
├─ Shared
│    ├─ Assets.xcassets
│    ├─ Deps
│    ├─ Helper
│    ├─ HomePage  # 主页
│    ├─ KeyCenter.swift # 填写申请的 AppID 和 AppSign
│    ├─ SampleCode.xcconfig
│    ├─ SupportingViews
│    ├─ Topics # 界面上对应的各个功能模块页面
│    │    ├─ PlayStream
│    │    ├─ PublishStream
│    │    ├─ QuickStart
│    │    ├─ SoundLevel
│    │    └─ VideoTalk
│    └─ ZegoExpressExampleApp.swift
├─ Tests Shared
│    ├─ TestEngineModule.swift
│    └─ TestRoomModule.swift
├─ Tests iOS
│    ├─ Info.plist
│    └─ Tests_iOS.swift
├─ Tests macOS
│    ├─ Info.plist
│    └─ Tests_macOS.swift
├─ VERSION.txt
├─ ZegoExpressExample.xcodeproj # swift 工程文件
├─ iOS
│    ├─ Info.plist
│    ├─ Libs # ZegoExpressVideo iOS SDK 存放目录
│    ├─ README.md
│    └─ iOS.entitlements
└─ macOS
       ├─ Info.plist
       ├─ Libs # ZegoExpressVideo Mac SDK 存放目录
       ├─ README.md
       └─ macOS.entitlements
```

### 运行示例源码

1. 打开 App Store，搜索 Xcode 并下载安装。

   <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/iOS/ZegoExpressEngine/Common/appstore-xcode.png" /></Frame>

2. 使用 Xcode 打开 “ZegoExpressExample.xcodeproj” 文件。

   a. 打开 Xcode，选择左上角的 “File > Open...”。

   <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/iOS/ZegoExpressEngine/Common/xcode-open-file.png" /></Frame>

   b. 在解压后的示例源码文件夹中选择 “ZegoExpressExample.xcodeproj” 文件，并单击 “Open”。

   <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/iOS/ZegoExpressEngine/Common/xcode-select-file-swift.png" /></Frame>

3. 登录 Apple ID 账号。

   a. 在 Xcode 左上角选择 “Xcode > Preference”。

   b. 单击 “Account” 选项卡后，单击左下角的 “+” 号，选择添加 “Apple ID” 并单击 “Continue”。

   <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/iOS/ZegoExpressEngine/Common/xcode-account.png" /></Frame>

   c. 输入 Apple ID 和密码以登录。

   <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/iOS/ZegoExpressEngine/Common/xcode-login-apple-id.png" /></Frame>

4. 修改开发者证书。

   a. 在 Xcode 中单击左侧的 “ZegoExpressExample” 项目。

   <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/iOS/ZegoExpressEngine/Common/xcode-select-project-swift.png" /></Frame>

   b. 单击 “Signing & Capabilities” 选项卡，在 “Team” 中选择自己的开发者证书。

    <Note title="说明">


    此示例源码自适应获取 TeamID 作为 Bundle Identifier 的后缀，开发者无需手动修改。
    </Note>

   <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/iOS/ZegoExpressEngine/Common/team-signing-swift.png" /></Frame>


5. 下载的示例源码中缺少 SDK 初始化所需的 AppID 和 AppSign，需要修改 “Shared” 目录下的 “KeyCenter.swift” 文件。请使用本文 [前提条件](https://doc-zh.zego.im/article/5633#1_2) 已获取的 AppID 和 AppSign 正确填写，否则示例源码无法正常运行。

6. 将 iOS 设备连接到开发电脑，单击 Xcode 左上角的 "Generic iOS Device" ，选择该 iOS 设备（或者模拟器）。

    <Note title="说明">


    您也可以切换到 macOS 的 “Target”，选择 “MyMac” 以运行 macOS 示例源码。
    </Note>

   <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/iOS/ZegoExpressEngine/Common/xcode-select-device.png" /></Frame>

   <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/iOS/ZegoExpressEngine/Common/xcode-select-real-device.png" /></Frame>


7. 单击 Xcode 左上角的 “Build” 编译和运行示例源码。

   <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/iOS/ZegoExpressEngine/Common/build-and-run.png" /></Frame>

### 体验实时音视频功能

在真机中运行项目，运行成功后，可以看到本端视频画面。

为方便体验，ZEGO 提供了一个 [Web 端调试示例](https://zegodev.github.io/zego-express-webrtc-sample/assistDev/index.html)，在该页面下，输入相同的 AppID、RoomID，输入不同的 UserID、以及对应的 [Token](/console/development-assistance/temporary-token)，即可加入同一房间与真机设备互通。当成功开始音视频通话时，可以听到远端的音频，看到远端的视频画面。

