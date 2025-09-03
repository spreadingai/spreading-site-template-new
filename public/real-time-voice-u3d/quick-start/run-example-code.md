# 示例代码运行指引


## 准备环境

请确保开发环境满足以下技术要求：

安装 Unity 2018.4.21f1 或以上版本。若未安装，可以在 [Unity 官网](https://unity.com/download) 下载 Unity Hub，然后安装您需要的 Unity 版本（若不清楚，建议您安装最新的 LTS 版本）。下载时，推荐根据自身需要运行到的平台，勾选对应的 Plaforms 模块一起下载，以在 macOS 上安装为例：

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Unity3D/ZegoExpressEngine/install_unity_modules.png" /></Frame>

根据示例代码需要运行到的平台，选择对应的开发环境或设备：

* 运行 Android 示例源码要求：Android 版本不低于 4.4，且支持音视频的 Android 设备或模拟器（推荐使用真机），如果是真机，请开启“允许调试”选项。
* 运行 iOS 示例源码要求：Xcode 15.0 或以上版本，iOS 12.0 或以上版本且支持音视频的 iOS 设备或模拟器（推荐使用真机）。
* 运行 macOS 示例源码要求：macOS 10.13 或以上版本，且支持音视频的 macOS 设备。
* 运行 Windows 示例源码要求：Windows 7 或以上版本，且支持音视频的 Windows 设备，并安装了 Visual Studio 2015 或以上版本。
* 运行 Linux 示例源码要求：任意具有 GLIBC 2.16 或以上版本的 Linux 发行版系统（目前仅支持 x86_64 架构），libasound（ALSA），libv4l2（v4l utils），CMake 3.7 或以上版本。
* 运行 WebGL 示例源码要求：浏览器需要支持 WebGL 以及 WebAssembly（推荐使用 WebGL 2.0），Chrome 57 或以上版本、Firefox 56 或以上版本，Safari 11 或以上版本，**不支持移动设备上使用**。推荐使用最新版的浏览器，以达到最佳的性能和兼容性。
* 确保所运行设备网络连接正常。
* 确保 Unity 已安装运行平台所对应的 Platfroms 模块。若已经安装 Unity，但没有安装相关 Platroms 模块，需要下载对应模块，以在 macOS 上安装为例：打开 Unity Hub，单击左侧的“安装”选项，选择需要安装的 Unity 版本，单击右上角图标选择 “添加模块” 选项，根据自己的开发要求，勾选并下载对应模块。

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Unity3D/ZegoExpressEngine/setup_unity_modules.png" /></Frame>

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Unity3D/ZegoExpressEngine/add_unity_modules.png" /></Frame>

## 前提条件

已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppID 和 AppSign，详情请参考 [控制台 - 项目管理](/console/project-info) 中的“项目信息”。

<Warning title="注意">
SDK 同时也支持 Token 鉴权，若您需要升级鉴权方式，可参考 [如何从 AppSign 鉴权升级为 Token 鉴权](/console/project-info)。
</Warning>

## 获取示例源码
<Card title="示例源码" href="https://artifact-demo.zego.im/express/example/video/unity3d/ZegoExpressDemo_unity3d.zip" target="_blank">
本地下载
</Card>

## 示例源码目录结构

下列结构为工程目录的文件结构，下文所涉及的文件路径均为相对于此目录的路径。
```tree
unity3d
 ├── Assets
 │ ├── Resources # prefab 资源文件
 │ ├── Scenes # 示例场景
 │ ├── Scripts # SDK 脚本
 │ │ ├── native # C 接口导入层
 │ │ ├── videoRender # 自定义视频渲染模块
 │ │ ├── ... # 接口封装
 │ ├── StreamingAssets # 资源文件
 │ ├── ZegoExpressExample # 示例脚本
 │ │ ├── Examples # 示例脚本
 │ │ ├── Utils # 工具类
 │ │ ├── KeyCenter.cs # 填写申请的 AppID、AppSign，登录房间的用户 ID 和 Token
 │ │ ├── ZegoExpressExample.cs
 │ ├── WebGLTemplates # WebGL 模板
 │ │ ├── zegoTemplates # ZEGO 模板
 ├── Packages # Unity 依赖库
 ├── ProjectSettings
```

## 运行示例代码

1. 下载的示例源码中缺少 SDK，需要先 [下载 SDK 包](https://doc-zh.zego.im/article/13240)，并解压。

    参考 [集成 SDK](https://doc-zh.zego.im/article/13242) 文档，将解压后的 SDK 包拷贝到工程的 “Assets” 目录下，并根据要运行的平台做额外的处理，否则 App 会构建失败。如下图所示：

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Web/ExpressSDK/Unity_WebGL/Unity_WebGL_1.jpeg" /></Frame>

2. 修改 “Assets/ZegoExpressExample/KeyCenter.cs” 文件，填写 SDK 初始化所需的 “appID” 和 “appSign”。

<Warning title="注意">


    - 请使用本文 [前提条件](https://doc-zh.zego.im/article/13241#1_2) 已获取的 AppID 和 AppSign 正确填写。
    - userID 由您自定义填写即可。
    - 如果您使用 WebGL 运行源码，需要根据填写的 userID 获取对应 Token 正确填写，否则示例源码无法正常运行。

</Warning>



    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Web/ExpressSDK/Unity_WebGL/Unity_WebGL_2.jpeg" /></Frame>

3. 在 Unity Hub 中，单击 “Projects” 选项卡，并在单击右上角 “Open”，选择示例源码所在目录。

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Unity3D/ZegoExpressEngine/unity_open_project.png" /></Frame>

4. 打开后，可能会弹出提示：“Editor version not installed”，找不到示例源码工程使用的 Unity Editor 版本。**此时，选择其它 Unity Editor 版本，并指定您正在使用的 Unity 版本即可。**

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Unity3D/ZegoExpressEngine/unity_open_project_warning.png" /></Frame>

5. 打开工程后，选择左下角 “Project > Assets > Scenes” 目录下的 “HomePage”并双击，然后单击 "Game" 选项卡，即可以看到示例源码主页的场景。

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Unity3D/ZegoExpressEngine/unity_select_home_scene.png" /></Frame>

6. 在上方菜单栏，选择 "File > Build Settings"。

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Unity3D/ZegoExpressEngine/QuickStart/demo_build_setting.png" /></Frame>

7. 在 "Platform" 中选择平台，并在右下角单击 "Switch Platform"，切换需要运行的平台。

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Unity3D/ZegoExpressEngine/unity_switch_platform.png" /></Frame>

8. 开始运行。

<Accordion title="运行到 Android 平台" defaultOpen="false">
1. 参考步骤 7，将 “Platform” 切换到 “Android” 平台，单击 “Player Settings”，设置包名等配置。
<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Unity3D/ZegoExpressEngine/QuickStart/demo_build_android.png" /></Frame>
2. 完成设置后，连接 Android 设备并单击 “Build And Run”。
</Accordion>



<Accordion title="运行到 iOS 平台" defaultOpen="false">
1. 参考步骤 7，将 “Platform” 切换到 “iOS” 平台，单击 “Build” 将 iOS 工程保存到本地，通过 Xcode 打开本地工程。
2. 在打开的 Xcode 工程中，打开 “Unity-iPhone” Target 的 “Signing & Capabilities” 选项卡，首先确保勾选 “Automatically manage signing”，然后切换 “Team” 为自己的 Team，再修改 “Bundle Identifier” 为自定义的 Bundle ID。
<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Unity3D/ZegoExpressEngine/unity_set_ios_team.png" /></Frame>
3. 选择 “Info.plist” 文件，添加摄像头和麦克风权限。
<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Unity3D/ZegoExpressEngine/unity_set_ios_privacy.png" /></Frame>
4. 如果您需要在真机运行，请在 “Unity-iPhone” Target 的 “General” 选项卡找到 “Frameworks, Libraries, and Embedded Content”，点击“+” -> “add other” -> “add files”，添加 ZegoExpressEngine.xcframework 下的 ios-arm64/ZegoExpressEngine.framework。
<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Unity3D/ZegoExpressEngine/QuickStart/add_files.jpg" /></Frame>
5. 单击 Run 按钮，运行示例 Demo。
请注意，在运行到 iOS 设备时，如果出现如下报错，可参考 [集成 SDK ](https://doc-zh.zego.im/article/13242#5) 中关于导出 iOS Xcode 工程集成 ZegoExpressEngine.framework 的问题处理该报错。
    ```cs
    no suitable image found.  Did find:
    /private/var/containers/Bundle/Application/3CC0EE65-89C9-45F5-8E22-A4AC194DF260/hello.app/Frameworks/UnityFramework.framework/Frameworks/ZegoExpressEngine.framework/ZegoExpressEngine: code signature in (/private/var/containers/Bundle/Application/3CC0EE65-89C9-45F5-8E22-A4AC194DF260/hello.app/Frameworks/UnityFramework.framework/Frameworks/ZegoExpressEngine.framework/ZegoExpressEngine) not valid for use in process using Library Validation: mapped file has no cdhash, completely unsigned? Code has to be at least ad-hoc signed.
    ```
</Accordion>

<Accordion title="运行到 macOS 平台" defaultOpen="false">
1. 参考步骤 7，将 “Platform” 切换到 “macOS” 平台，选择好要构建的架构，例如 Intel + Apple silicon，然后点击 “Build” 生成 App 到本地。
<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Unity3D/ZegoExpressEngine/build_unity_macos.png" /></Frame>
2. 生成 macOS 上的一个应用后，双击即可运行。
</Accordion>

<Accordion title="运行到 Windows 平台" defaultOpen="false">
1. 参考步骤 7，将 “Platform” 切换到 “Windows” 平台，选择好要构建的架构，**注意此处选择的架构要与步骤 1 中保留的 SDK 架构一致**，然后点击 “Build” 生成 App 到本地。
<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Unity3D/ZegoExpressEngine/build_unity_windows.png" /></Frame>
2. 在 Windows 设备上，单击工程中的 .exe 文件，即可运行。
<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Unity3D/ZegoExpressEngine/run_unity_windows_app.png" /></Frame>
</Accordion>

<Accordion title="运行到 Linux 平台" defaultOpen="false">

1. 参考步骤 7，将 “Platform” 切换到 “Linux” 平台，然后单击 “Build” 生成 App 到本地。

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Unity3D/ZegoExpressEngine/QuickStart/linux_player_settings.png" /></Frame>

2. 在 Linux 设备上的 App 目录打开终端，输入 `./<App 名称>`，即可运行。例如 Build 生成 App 名称为 “zegoExpressExample”，则输入以下命令运行：
```sh
    $ ./zegoExpressExample
```
</Accordion>

<Accordion title="运行到 WebGL 平台" defaultOpen="false">
1. 场景绑定事件组件，组件名必须为："ZegoWebGLEventHandler"，并添加名为 "ZegoWebGLEventHandler.cs" 脚本。

<Warning title="注意">


    使用的 Api 若含有回调函数，必须要绑定事件组件 "ZegoWebGLEventHandler" 。

</Warning>



    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Web/ExpressSDK/Unity_WebGL/Unity_WebGL_5.jpeg" /></Frame>

2. 参考步骤 7，将 “Platform” 切换到 “WebGL” 平台，选择好要构建的架构，**注意此处选择的架构要与步骤 1 中保留的 SDK 架构一致**。然后点击 “Switch Platform” 切换为 WebGL 配置，再点击 “Player Setting”，选择 “WebGL Template” 为 “zegoTemplates”。

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Web/ExpressSDK/Unity_WebGL/Unity_WebGL_3.jpeg" /></Frame>
    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Web/ExpressSDK/Unity_WebGL/Unity_WebGL_4.jpeg" /></Frame>

3. 点击 “Build And Run” 生成本地文件。
</Accordion>


## 体验实时音视频功能

在真机中运行项目，运行成功后，可以看到本端视频画面。

为方便体验，ZEGO 提供了一个 [Web 端调试示例](https://zegodev.github.io/zego-express-webrtc-sample/assistDev/index.html)，在该页面下，输入相同的 AppID、RoomID，输入不同的 UserID、以及对应的 [Token](/console/development-assistance/temporary-token)，即可加入同一房间与真机设备互通。当成功开始音视频通话时，可以听到远端的音频，看到远端的视频画面。


## 常见问题

1. **示例源码运行到 Android 设备上，构建时报错 `Gradle build failed.` 该如何解决？**

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Unity3D/ZegoExpressEngine/unity_android_build_gradle_failed.jpeg" /></Frame>

    一般是由于网络问题，导致 Gradle 下载依赖失败。请检查您的本地网络是否能正常访问谷歌资源；如果不能，可能需要开启代理。

<Content />

