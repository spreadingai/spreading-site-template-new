
# 示例代码运行指引

---
<Card title="示例源码" href="https://artifact-demo.zego.im/zim/example/unity/Unity3dDemo.zip" target="_blank">点击获得完整代码。</Card>
## 准备环境

请确保开发环境满足以下技术要求：

- 安装 Unity 2021.3.18f1c1 或以上版本。若未安装，可以在 [Unity 官网](https://unity.com/download) 下载 Unity Hub，然后安装您需要的 Unity 版本（若不清楚，建议您安装最新的 LTS 版本）。下载时，推荐根据自身需要运行到的平台，勾选对应的 Plaforms 模块一起下载，以在 Windows 上安装为例：

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/ZIM/Unity/unityEnv.jpeg" /></Frame>

- 根据示例代码需要运行到的平台，选择对应的开发环境或设备：

    - 运行 Android 示例源码要求：Android 4.1 或以上版本，支持 JDK 1.6 或以上版本的设备或模拟器（推荐使用真机），如果是真机，请开启“允许调试”选项。
    - 运行 iOS 示例源码要求：Xcode 13.0 或以上版本，iOS 11.0 或以上版本的设备或模拟器（推荐使用真机）。
    - 运行 macOS 示例源码要求：支持 macOS 10.13 或以上版本。
    - 运行 Windows 示例源码要求：Windows 7 或以上版本；并安装了 Visual Studio 2015 或以上版本。
    - 确保所运行设备网络连接正常。
    - 确保 Unity 已经安装了需要运行到的平台所对应的 Platfroms 模块。若已经安装 Unity，但没有安装相关 Platroms 模块，需要下载对应模块，以在 Windows 上安装为例：打开 Unity Hub，单击左侧的 “Install” 选项，选择需要安装的 Unity 版本，单击右上角图标选择 “Add modules” 选项，在弹窗中勾选对应模块后进行下载。


## 前提条件

已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppID 和 AppSign，详情请参考 [控制台 - 项目管理](https://doc-zh.zego.im/article/12107) 中的“项目信息”。

<Warning title="注意">

SDK 同时也支持 Token 鉴权，若您需要升级鉴权方式，可参考 [如何从 AppSign 鉴权升级为 Token 鉴权](http://doc-zh.zego.im/faq/token_upgrade?product=ExpressVideo)。
</Warning>

## 示例源码目录结构

下列结构为工程目录的文件结构，下文所涉及的文件路径均为相对于此目录的路径。

```tree
Unity3dDemo
└─Assets
    ├─Scenes                  // 场景
    │   Conv.unity             // 会话场景
    │   Conv.unity.meta
    │   Login.unity            // 登录场景
    │   Login.unity.meta
    │
    └─Scripts                 // Demo 脚本
        CallOptionList.cs       // 呼叫邀请选项 
        CallOptionList.cs.meta
        ConvCreateOptionList.cs  // 创建会话
        ConvCreateOptionList.cs.meta
        ConvPage.cs             // 会话页
        ConvPage.cs.meta
        ConvPageOptionList.cs    // 切换会话、房间、群组列表
        ConvPageOptionList.cs.meta
        GroupPage.cs            // 群组相关逻辑
        GroupPage.cs.meta
        KeyCenter.cs            // 填写 AppID 和 AppSign
        KeyCenter.cs.meta
        LoginClicked.cs         // 登录
        LoginClicked.cs.meta
        MemberPage.cs           // 群、房间成员列表相关逻辑
        MemberPage.cs.meta
        MessagePage.cs          // 消息相关逻辑
        MessagePage.cs.meta
        RoomPage.cs             // 房间相关逻辑
        RoomPage.cs.meta
    │
    └─ZIM                     // ZIM Unity SDK 包
        ├─Plugins             // 导入 ZIM 各端插件
        │  ├─Android
        │  ├─iOS
        │  ├─macOS
        │  └─windows
        └─Scripts              // ZIM 插件接口 C# 封装
```

## 运行示例代码

1. 由于示例源码中缺少 SDK，请集成 SDK，详情请参考”实现基本消息收发“的 [集成 SDK](/zim-u3d/send-and-receive-messages#集成 SDK)。

2. 由于示例源码中缺少 SDK 初始化所需的“appID”和“appSign”，请修改“Assets/Scripts/KeyCenter.cs”文件。请使用本文 [前提条件](#前提条件) 已获取的 AppID 和 AppSign 正确填写，否则示例源码无法正常运行。

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/ZIM/Unity/appIDSet.jpeg" /></Frame>

3. 点击 Unity Hub 的 “Projects” 选项卡，单击右上角 “Open”，打开下载好的示例源码。

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/ZIM/Unity/demoDownload.jpeg" /></Frame>

4. 打开示例源码后，可能会弹出“Editor version not installed”，提示找不到示例源码工程使用的 Unity Editor 版本。**此时，选择其他 Unity Editor 版本，并指定您正在使用的 Unity 版本即可。**

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/ZIM/Unity/changeVersion.jpg" /></Frame>

5. 打开工程后，选择左下角 “Project > Assets > Scenes” 目录下的 “Login”和“Conv”，将它们拖动到左上角“Hierarchy”窗口。

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/ZIM/Unity/buildReady.jpeg" /></Frame>

6. 在上方菜单栏，选择“File > Build Settings”。

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/ZIM/Unity/buildSetting_1.jpeg" /></Frame>

7. 确保"Scenes in Build"中，"Scenes/Login"为0， “Scenes/Conv”为1，在 "Platform" 中选择平台，切换需要运行的平台。

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/ZIM/Unity/buildReady_1.jpeg" /></Frame>

8. 开始运行。

<Accordion title="运行到 Android 设备" defaultOpen="false">

1. 参考步骤 7，将“Platform”切换到“Android”平台，单击“Player Settings”，设置包名等配置。
    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Unity3D/ZegoExpressEngine/QuickStart/demo_build_android.png" /></Frame>
2. 完成设置后，连接 Android 设备并单击“Build And Run”。

</Accordion>

<Accordion title="运行到 iOS 设备" defaultOpen="false">
1. 参考步骤 7，将 “Platform” 切换到 “iOS” 平台，单击 “Build” 将 iOS 工程保存到本地，通过 Xcode 打开build构建后的工程。
2. 在打开的 Xcode 工程中，打开 “Targets - Unity-iPhone - Signing & Capabilities - Signing” 选项卡，首先确保勾选 “Automatically manage signing”，然后切换 “Team” 为自己的 Team，再修改 “Bundle Identifier” 为自己的 Bundle ID。
    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/ZIM/Unity/iOSSet.jpeg" /></Frame>
3. 打开 “Targets - Unity-iPhone - Build Phases - Embeded Frameworks”，点击加号 “+” ，选择集成好的 ZIM SDK 下的路径：“ZIM/Plugins/IOS/ZIM.xcframework/ios-arm64_armv7/ZIM.framework”。
    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/ZIM/Unity/setIOSPackage.jpg" /></Frame>   
4. 打开 “Targets - Unity-iPhone - Build Settings“，在搜索框搜索 bitcode，确保 Enable Bitcode 是“No”状态。
    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/ZIM/Unity/bitcode_set.jpeg" /></Frame>
5. 点击 Run 按钮运行示例 Demo。
</Accordion>

<Accordion title="运行到 mac 设备" defaultOpen="false">

1. 参考步骤 7，将 “Platform” 切换到 “macOS” 平台，选择好要构建的架构，比如 Intel + Apple silicon，然后点击 “Build” 生成 App 到本地。
    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/ZIM/Unity/macBuild.jpg" /></Frame>
2. 生成应用后，双击即可运行。
</Accordion>

<Accordion title="运行到 Windows 设备" defaultOpen="false">

1. 参考步骤 7，将 “Platform” 切换到 “Windows” 平台，选择好要构建的架构，**注意此处选择的架构要与集成时保留的 SDK 架构一致**，然后点击 “Build” 生成 App 到本地。
    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/ZIM/Unity/winBuild.jpeg" /></Frame>
2. 双击生成的 .exe 文件即可运行。
    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/ZIM/Unity/exeDemo.jpg" /></Frame>

</Accordion>
