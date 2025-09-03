# 示例源码运行指引

本文介绍如何快速跑通示例源码，体验基础的音视频通话服务。

## 准备环境

在运行示例源码前，请确保开发环境满足以下要求：（以下说明皆以 macOS 开发电脑为例)：

* Android Studio 2020.3.1 或以上版本。

* Android SDK 30、Android SDK Platform-Tools 30.x.x 或以上版本。
* Android 4.4 或以上版本，且支持音视频的 Android 设备或模拟器（推荐使用真机），如果是真机，请开启“允许调试”选项。
* Android 设备、macOS 开发电脑已经连接到 Internet。

<Note title="说明">

- 首次编译示例源码时，如果没有对应的依赖库或者构建工具，Android Studio 会自动下载示例源码，可能需要较长时间，请耐心等待。
- 建议下载特定的 Gradle 及所需的依赖库，请参考 [Gradle Services](https://services.gradle.org) 下载。示例源码中使用的 Gradle 相关版本如下：
  - Gradle：6.7.1（在 “project/gradle/wrapper/gradle-wrapper.properties” 文件中查看）。
  - Android Gradle 插件：4.2.0（在 “project/build.gradle” 文件中查看）。
关于 Android Gradle 插件、Gradle、SDK Tool 之间的版本依赖关系，请查看：[Android Gradle 插件版本说明](https://developer.android.com/studio/releases/gradle-plugin)

</Note>


## 前提条件

已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppID 和 AppSign，详情请参考 [控制台 - 项目管理](/console/project-info) 中的“项目信息”。

<Warning title="注意">
SDK 同时也支持 Token 鉴权，若您需要升级鉴权方式，可参考 [如何从 AppSign 鉴权升级为 Token 鉴权](/console/project-info)。
</Warning>

## 获取示例源码

<Card title="示例源码" href="https://artifact-demo.zego.im/express/example/video/android_java/ZegoExpressDemo_android_java.zip" >
本地下载
</Card>


## 示例源码目录结构

下面目录结构为 android_java 子目录的文件结构，下文所涉及的文件路径均为相对于此目录的路径。

```tree
.
├─ README.md
├─ README_zh.md
├─ VERSION.txt
└─ ZegoExpressExample
       ...
       ├─ AdvancedAudioProcessing    # 音频进阶功能
       ├─ AdvancedStreaming          # 推流、拉流进阶
       ├─ AdvancedVideoProcessing    # 视频进阶
       ├─ CommonFeatures             # 常用功能
       ├─ CommonTools
       ├─ DebugAndConfig             # 调试与配置
       ├─ KeyCenter                  # 在里面的 KeyCenter.java 文件中填写申请的 AppID 和 AppSign
       ├─ Others                     # 其他功能
       ├─ Quickstart                 # 开速开始
       ├─ Scenes                     # 最佳实践
       ├─ build.gradle
       ├─ gradle
       ├─ gradle.properties
       ├─ gradlew
       ├─ gradlew.bat
       ├─ local.properties
       ├─ log
       ├─ main
       │    ├─ .gitignore
       │    ├─ build
       │    ├─ build.gradle
       │    ├─ libs                # ZegoExpressVideo Android SDK 存放目录
       │    ├─ proguard-rules.pro
       │    ├─ src
       │    └─ wrap
       └─ settings.gradle
```


## 运行示例源码

1. 在开发电脑中找到 Android Studio 软件图标。
   <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Android/ExpressSDK/SampleRunningGuide/open_as.png" /></Frame>

  <Accordion title="在开发电脑上安装 Android Studio 的方式" defaultOpen="false">
- 方式 1：登录 [Android Studio 官网](https://developer.android.com/studio) 下载并安装 Android Studio 及其相关的 SDK Tools。由于国内运营商网络限制等原因，开发者需要确保本机能连接该网站，若无法访问建议选择方式 2。
- 方式 2：使用搜索引擎搜索 “Android Studio 下载”、“Android Studio 安装” 和 “Android Studio SDK Tools 安装”，查找可下载的源网站，并安装相关软件和工具。
</Accordion>


2. 打开 Android Studio，单击 “Open an Existing Project”。
   <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Android/ExpressSDK/SampleRunningGuide/as_pre_ui.png" /></Frame>

3. 在解压后的示例源码文件夹中，选择 ZegoExpressExample 文件夹，并单击 “Open” 打开。
<Frame width="512" height="auto" caption="">
  <img src="https://doc-media.zego.im/sdk-doc/Pics/Android/ExpressSDK/SampleRunningGuide/open_express_android_demo_new.png" />
</Frame>

4. 修改 “./KeyCenter/src/main/java/im/zego/keycenter” 目录下的 “KeyCenter.java” 文件，填写 SDK 初始化所需的 “appID” 和 “appSign”。

    <Warning title="注意">


    请使用本文 [前提条件](!DownloadDemo/DownloadDemo#1_2) 已获取的 AppID 和 AppSign 正确填写（需要在 AppID 后加 L），否则示例源码无法正常运行。
    </Warning>

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/QuickStart/sample_code/sample_code_android.png" /></Frame>

5. 将 Android 设备链接到开发电脑，当该设备成功开启“开发者模式”和“USB 调试”功能后，可以看到 Android Studio 上方的 “Running Devices” 选项框由下图：
    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Android/ExpressSDK/SampleRunningGuide/as_no_device_new.png" /></Frame>
   变为下图：
    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Android/ExpressSDK/SampleRunningGuide/as_connected_device_new.png" /></Frame>
   即 Android Studio 已成功连接到 Android 设备，可以将示例源码运行到该设备上了。

    <Note title="说明">

    - 当开发电脑连接 Android 设备后，大部分设备会弹出提示，不同 Android 厂商的提示信息有所不同，可根据情况选择 USB 模式。
    - 当 Android 设备连接开发电脑后，需要根据情况在该设备上开启开发者模式和 USB 调试功能（不同厂商的 Android 设备开启方式不同）。具体开启方式开发者可以需要自行搜索引擎搜索，例如：目前存在一台未开启过开发者模式与 USB 调试功能的某设备，可以在搜索引擎搜索“某设备开启开发者模式”，查看具体的开启教程。
    </Note>

6. 单击 “Run” 按钮，编译并运行示例源码。
   <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Android/ExpressSDK/SampleRunningGuide/run_android_demo_new.png" /></Frame>


## 体验音视频通话/直播功能

在真机中运行项目，运行成功后，可以看到本端视频画面。

为方便体验，ZEGO 提供了一个 [Web 端调试示例](https://zegodev.github.io/zego-express-webrtc-sample/assistDev/index.html)，在该页面下，输入相同的 AppID、RoomID，输入不同的 UserID、以及对应的 [Token](/console/development-assistance/temporary-token)，即可加入同一房间与真机设备互通。当成功开始音视频通话时，可以听到远端的音频，看到远端的视频画面。


## 常见问题

**Android Studio 运行下载的示例源码时报错“错误：非法的表达式开始 :9”，如何处理？**

由于下载的示例源码中，AppID ，AppSign 没有具体的值，请参考本文 “[运行示例源码](#运行示例源码)” 章节中的步骤 4 进行处理。

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Android/ExpressSDK/SampleRunningGuide/as_run_android_demo_error_3.png" /></Frame>

<Content />