# 示例源码运行指引



本文介绍如何快速跑通示例源码，体验基础的音视频通话服务。

## 准备环境

请确保开发环境满足以下技术要求：

* Windows 系统：Windows7、Windows8、Windows10。
* 已安装 Visual Studio 2019 及以上版本。
* Visual Studio 已安装 C# 开发环境和 Newtonsoft NuGet 程序包（详情请参考 [常见问题](/real-time-video-windows-cs/quick-start/run-example-code#常见问题)）。
* 已安装 .NET FrameWork 4.6.1 或以上版本。
* 已安装 .NET Core 2.0 或以上版本。
* 麦克风、摄像头等支持音视频功能的外部设备正常。

## 获取示例源码

<Card title="示例源码" href="https://artifact-sdk.zego.im/express/video/windows-csharp/zego-express-video-windows-csharp.zip" target="_blank">
本地下载
</Card>
## 前提条件

已在 [ZEGO 控制台](https://console.zego.im/) 创建项目，并申请有效的 AppID 和 AppSign，详情请参考 [控制台 - 项目管理](/console/project-info)。

## 示例源码目录结构

下列结构为 **Example** 子目录的文件结构，下文所涉及的文件路径均为相对于此目录的路径。

```bash
ZegoExpressCsharp
 ┣ Example
 ┃ ┣ packages    --------------------- 依赖的 Nuget 包
 ┃ ┃ ┗ Newtonsoft.Json.13.0.1
 ┃ ┣ ZegoCsharpWinformDemo    -------- 项目文件夹
 ┃ ┃ ┣ bin
 ┃ ┃ ┣ Common
 ┃ ┃ ┣ Examples
 ┃ ┃ ┣ HomePage
 ┃ ┃ ┣ obj
 ┃ ┃ ┣ Properties
 ┃ ┃ ┣ Utils
 ┃ ┃ ┣ app.config
 ┃ ┃ ┣ KeyCenter.cs    ------------------------ appid 配置文件
 ┃ ┃ ┣ packages.config
 ┃ ┃ ┣ Program.cs
 ┃ ┃ ┣ ZegoCsharpWinformDemo.csproj    -------- 项目文件
 ┃ ┣ README.md
 ┃ ┣ README.ZH.md
 ┣ libs    ------------------------------------ 依赖的 SDK C++ 版本的 .dll 库文件
 ┃ ┗ ZegoExpress
 ┃ ┃ ┗ win
 ┃ ┃ ┃ ┣ x64
 ┃ ┃ ┃ ┃ ┣ ZegoExpressEngine.dll
 ┃ ┃ ┃ ┗ x86
 ┃ ┃ ┃ ┃ ┣ ZegoExpressEngine.dll
 ┣ ZegoExpressCsharp
 ┣ .git
 ┣ .gitignore
 ┣ LICENSE    ---------------------------开源协议声明
 ┣ README.md
 ┗ ZegoExpressCsharp.sln    ------------------- 解决方案文件（包含 SDK 和示例源码工程）
```

## 运行示例源码

1. 请参考 [下载文档](/real-time-video-windows-cs/client-sdk/download-sdk)，下载最新版本的 SDK 和示例源码，并解压。

2. 修改 “/Example/ZegoCsharpWinformDemo/KeyCenter.cs” 文件，填写 SDK 初始化所需的 AppID 和 AppSign。

<Warning title="注意">


    请使用本文 [前提条件](https://doc-zh.zego.im/article/5997#1_2) 已获取的 AppID 和 AppSign 正确填写，否则示例源码无法正常运行。

</Warning>



    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/dotnet/ZegoExpressEngine/Common/RunDemo_4_2.png" /></Frame>

3. 使用 Visual Studio 打开项目。

<Note title="说明">


    开发者可以在 Windows 系统中，使用 Visual Studio 打开示例源码目录下的 “ZegoExpressCsharp.sln” 解决方案文件，该解决方案中包含了 SDK 和示例源码工程。

</Note>



4. 单击“启动”，开始编译和运行示例源码。


## 体验实时音视频功能

在真机中运行项目，运行成功后，可以看到本端视频画面。

为方便体验，ZEGO 提供了一个 [Web 端调试示例](https://zegodev.github.io/zego-express-webrtc-sample/assistDev/index.html)，在该页面下，输入相同的 AppID、RoomID，输入不同的 UserID、以及对应的 [Token](/console/development-assistance/temporary-token)，即可加入同一房间与真机设备互通。当成功开始音视频通话时，可以听到远端的音频，看到远端的视频画面。


## 常见问题

### 在 Visual Studio 中，如何下载 Newtonsoft NuGet 程序包？

1. 在菜单栏选择“工具 > NuGet 包管理器 > 管理解决方案的 NuGet 程序包”。
2. 搜索 “Newtonsoft.Json”，勾选示例源码项目 “ZegoCsharpWinformDemo”后，单击“安装”。

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/dotnet/ZegoExpressEngine/Common/RunDemo_6_1.png" /></Frame>
