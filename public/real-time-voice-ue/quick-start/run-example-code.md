# 跑通示例源码

## 示例源码运行指引

本文介绍如何快速跑通示例源码，体验基础的音频/音视频通话服务。


### 准备环境


请确保开发环境满足以下技术要求：

- 安装 Unreal Engine 4.25 或以上版本。您可以在 [下载启动程序](https://www.unrealengine.com/download) 下载 Epic Games Launcher，然后参考 [安装虚幻引擎](https://docs.unrealengine.com/Basics/InstallingUnrealEngine/) 安装您需要的 Unreal Engine 版本：

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Express/UE/ue_install_1.PNG" /></Frame>

    安装完成后，可根据需要配置选项：

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Express/UE/ue_install_2.PNG" /></Frame>

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Express/UE/ue_install_3.PNG" /></Frame>

- 根据示例代码需要运行到的平台，选择对应的开发环境或设备：

    - 运行 Android 示例源码要求：Android 5.0 或以上版本，且支持音视频的 Android 设备或模拟器（推荐使用真机），如果是真机，请开启“允许调试”选项，详情请参考 [Android 开发要求](https://docs.unrealengine.com/android-development-requirements-for-unreal-engine/)。
    - 运行 iOS 示例源码要求：Xcode 15.0 或以上版本，iOS 12.0 或以上版本且支持音视频的 iOS 设备或模拟器（推荐使用真机），详情请参考 [iOS 和 TVOS 开发要求](https://docs.unrealengine.com/SharingAndReleasing/Mobile/iOS/SDKRequirements/)。
    - 运行 macOS 示例源码要求：macOS 11 或以上版本，且支持音视频的 macOS 设备，详情请参考 [硬件和软件规格](https://docs.unrealengine.com/Basics/InstallingUnrealEngine/RecommendedSpecifications/)。
    - 运行 Windows 示例源码要求：Windows 7 或以上版本，且支持音视频的 Windows 设备，并安装了 Visual Studio 2019 或以上版本，详情请参考 [硬件和软件规格](https://docs.unrealengine.com/Basics/InstallingUnrealEngine/RecommendedSpecifications/)。
    - 确保所运行设备网络连接正常。

<Warning title="注意">
Unreal Engine 4.25 版本，与 M1 或以上系列处理器的 macOS 系统不兼容。
</Warning>



### 前提条件

已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppID 和 AppSign，详情请参考 [控制台 - 项目管理](/console/project-info) 中的“项目信息”。

<Warning title="注意">


SDK 同时也支持 Token 鉴权，若您需要升级鉴权方式，可参考 [如何从 AppSign 鉴权升级为 Token 鉴权](http://doc-zh.zego.im/faq/token_upgrade?product=ExpressVideo)。

</Warning>

### 获取示例源码

<Card title="示例源码" href="https://artifact-demo.zego.im/express/example/video/unreal_engine/ZegoExpressDemo_unreal_engine.zip">
本地下载
</Card>

### 示例源码目录结构

下列结构为工程目录的文件结构，下文所涉及的文件路径均为相对于此目录的路径。

```bash
.
├─ Config               # Unreal 配置文件夹
│  ├─ DefaultEditor.ini # Unreal Engine Editor 默认配置
│  ├─ DefaultEngine.ini # Unreal Engine 默认配置
│  └─ DefaultGame.ini   # Unreal Engine 游戏默认配置
├─ Content
│  └─ ZegoExpressExample # 关卡、蓝图文件
│     ├─ AdvancedAudioProcessing
│     │  └─ RangeAudio
│     │     ├─ BP_RangeAudio.uasset
│     │     └─ RangeAudioMap.umap
│     ├─ Blueprints
│     │  ├─ BP_MainWidget.uasset
│     │  ├─ BP_ZegoActor.uasset
│     │  ├─ BP_ZegoExpressExampleGameModeBase.uasset
│     │  ├─ BP_ZegoTileViewEntry.uasset
│     │  └─ ZegoUserWidgetEntry.uasset
│     ├─ MainMap.umap
│     └─ QuickStart
│        └─ CommonUsage
│           ├─ BP_CommonUsageWidget.uasset
│           └─ CommonUsageMap.umap
├─ Plugins  # SDK 插件
|
├─ README.md
├─ README_zh.md
├─ Source   # 源文件
│  ├─ ZegoExpressExample
│  │  ├─ AdvancedAudioProcessing
│  │  ├─ android_permission.xml
│  │  ├─ Config
│  │  ├─ EventHandler
│  │  ├─ KeyCenter.cpp  # 填写申请的 AppID 和 AppSign
│  │  ├─ KeyCenter.h
│  │  ├─ LevelSwitchItem.cpp
│  │  ├─ LevelSwitchItem.h
│  │  ├─ QuickStart
│  │  ├─ Utils
│  │  ├─ ZegoActor.cpp
│  │  ├─ ZegoActor.h
│  │  ├─ ZegoExpressExample.Build.cs    # build 文件
│  │  ├─ ZegoExpressExample.cpp
│  │  ├─ ZegoExpressExample.h
│  │  ├─ ZegoExpressExampleGameModeBase.cpp
│  │  ├─ ZegoExpressExampleGameModeBase.h
│  │  ├─ ZegoLevelScriptActor.cpp
│  │  ├─ ZegoLevelScriptActor.h
│  │  ├─ ZegoMainUserWidget.cpp
│  │  ├─ ZegoMainUserWidget.h
│  │  ├─ ZegoUserWidget.cpp
│  │  └─ ZegoUserWidget.h
│  ├─ ZegoExpressExample.Target.cs  # target 文件
│  └─ ZegoExpressExampleEditor.Target.cs    # editor target 文件
└─ ZegoExpressExample.uproject  # Unreal 工程文件
```

### 运行示例源码

1. 下载的示例源码中缺少 SDK，需要先 [下载 SDK](https://doc-zh.zego.im/article/17989)，并解压。

    请参考 [集成 SDK](https://doc-zh.zego.im/article/17991#2_2) 的 “导入 SDK”，将解压后的 SDK 包拷贝到工程的 “Plugins” 目录下，如下图所示：

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Express/UE/ue_copy_plugin.png" /></Frame>

2.  修改 “/Source/KeyCenter.cpp” 文件，填写 SDK 初始化所需的 “AppID” 和 “AppSign”。请使用本文 [前提条件](https://doc-zh.zego.im/article/17990#1_2) 已获取的 AppID 和 AppSign 正确填写，否则示例源码无法正常运行。

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/QuickStart/sample_code/sample_code_win.png" /></Frame>

3. 打开工程。打开 Epic Games Laucher，选择编辑器版本，启动编辑器：

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Express/UE/ue_open_proj.png" /></Frame>

    使用 Unreal Engine Editor 打开 “./ZegoExpressExample.uproject” 文件，首次打开会自动编译工程源码：

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Express/UE/ue_open_proj_1.png" /></Frame>
    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Express/UE/ue_open_proj_2.png" /></Frame>
    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Express/UE/ue_open_proj_3.png" /></Frame>

    自动编译完成后，选择菜单 “编辑 > 插件”，确认勾选了 “ZegoExpressSDKPlugin” 文件：

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Express/UE/ue_plugin_import.png" /></Frame>
    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Express/UE/ue_plugin_import_2.png" /></Frame>

4. 开始运行。

<Accordion title="运行到 Android 平台" defaultOpen="false">
1. 请参考 [设置 Android SDK 和 NDK](https://docs.unrealengine.com/how-to-set-up-android-sdk-and-ndk-for-your-unreal-engine-development-environment)，设置 Android 开发环境。

2. 完成设置后，连接 Android 设备，打开 USB 调试功能，选择菜单 “平台 > 设备管理器”，确保设备已连接：

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Express/UE/ue_run_android_1.png" /></Frame>
    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Express/UE/ue_run_android_2.png" /></Frame>

3. 选择菜单 “平台 > 项目启动程序”，启动设备描述文件，开始运行。

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Express/UE/ue_run_android_3.png" /></Frame>
    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Express/UE/ue_run_android_4.png" /></Frame>
    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Express/UE/ue_run_android_5.png" /></Frame>
</Accordion>

<Accordion title="运行到 iOS 平台" defaultOpen="false">
1. 选择菜单 “平台 > 打包设置”。

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Express/UE/ue_run_ios.jpeg" /></Frame>

2. 在左侧导航栏中选择 “iOS”，在 “Build” 选项中，勾选 “Automatic Signing”，并输入您的 “IOS团队ID”。

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Express/UE/ue_run_ios_1.jpeg" /></Frame>

3. 选择菜单 “平台 > iOS > 打包项目”。

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Express/UE/ue_run_ios_2.jpeg" /></Frame>

4. 在弹出的对话框中，双击打开 “Intermediate/ProjectFilesIOS” 目录下的 “ZegoExpressExample.xcodeproj” 工程。

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Express/UE/ue_run_ios_3.jpeg" /></Frame>

5. 连接 iOS 设备，使用 XCode 编译运行到设备。
</Accordion>

<Accordion title="运行到 Windows 平台" defaultOpen="false">
1. 选择菜单 “平台 > 项目启动程序”，启动设备描述文件。

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Express/UE/ue_run_windows_1.png" /></Frame>
</Accordion>

<Accordion title="运行到 macOS 平台" defaultOpen="false">
1. 选择菜单 “平台 > Mac > 打包项目”。

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Express/UE/ue_run_macos.jpeg" /></Frame>

2. 打包完成后，手动将插件中的 “libZegoExpressEngine.dylib” 库，拷贝到“Contents/MacOS”目录下：

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Express/UE/ue_run_macos_1.jpeg" /></Frame>
    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Express/UE/ue_run_macos_2.jpeg" /></Frame>

3. 双击打开 “Contents” 目录下的 “info.plist” 文件，使用 XCode 编辑，添加摄像头、麦克风权限：

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Express/UE/ue_run_macos_3.jpeg" /></Frame>
    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Express/UE/ue_run_macos_4.jpeg" /></Frame>

4. 双击运行打包好的 “ZegoExpressExample” 程序。


#### 注意事项

在 macOS 平台上，如果在 Unreal Engine Editor 中直接运行源码崩溃，需要给 Unreal Engine Editor 添加摄像头麦克风权限。

- 如果您使用的是 Unreal Engine 4.25 ～ 4.27 版本，请编辑 “/UE_4.27/Engine/Mac/UEEditor/info.plist” 文件。
- 如果您使用的是 Unreal Engine 5.0 或以上版本，请编辑 “/UE_5.2/Engine/Source/Runtime/Launch/Resources/Mac/Info.plist”、“/UE_5.2/Engine/Source/Runtime/Launch/Resources/Mac/Info-Editor.plist” 文件。

在上述文件中，添加摄像头麦克风权限：

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Express/UE/ue_run_macos_4.jpeg" /></Frame>
</Accordion>

### 体验音视频通话/直播功能

在真机中运行项目，运行成功后，可以看到本端视频画面。

为方便体验，ZEGO 提供了一个 [Web 端调试示例 ](https://zegodev.github.io/zego-express-webrtc-sample/assistDev/index.html)，在该页面下，输入相同的 AppID、RoomID，输入不同的 UserID、以及对应的 [Token](/console/development-assistance/temporary-token)，即可加入同一房间与真机设备互通。当成功开始音视频通话时，可以听到远端的音频，看到远端的视频画面。
