- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，获取到了接入 ZIM SDK 服务所需的 AppID、AppSign。ZIM 服务权限不是默认开启的，使用前，请先在 [ZEGO 控制台](https://console.zego.im) 自助开通 ZIM 服务（详情请参考控制台文档 [项目管理 - 即时通讯](https://doc-zh.zego.im/article/14994)），若无法开通 ZIM 服务，请联系 ZEGO 技术支持开通。
<Warning title="注意">

`2.3.0 及以上`版本的 SDK，开始支持 “AppSign 鉴权”，同时仍支持 “Token 鉴权”，若您需要升级鉴权方式，可参考 [ZIM 如何从 AppSign 鉴权升级为 Token 鉴权](http://doc-zh.zego.im/faq/token_upgrade_zim)。
</Warning>
本文介绍如何快速跑通示例源码，体验即时通讯服务。
# 跑通示例源码

---

## 概览

<Content2 />

## 准备环境

在开始跑通之前，请确保开发环境满足以下要求（以下说明皆以 macOS 开发电脑为例）：

* Android Studio 2.1 或以上版本。
* Android SDK 28、Android SDK Platform-Tools 28.x.x 或以上版本。
* Android 4.1 或以上版本，且支持音视频的 Android 设备或模拟器（推荐使用真机），如果是真机，请开启“允许调试”选项。
* Android 设备、macOS 开发电脑已经连接到 Internet。

<Note title="说明">
- 首次编译示例源码时，如果没有对应的依赖库或者构建工具，Android Studio 会自动下载需要的依赖文件，可能需要较长时间，请耐心等待。
- 建议下载特定的 gradle 及所需的依赖库，请参考 <a href="https://services.gradle.org" target="_blank">Gradle Services</a> 下载。示例源码中使用的 gradle 相关版本如下：
  - gradle：4.6（在 “project/gradle/wrapper/gradle-wrapper.properties” 文件中查看）。
  - gradle Android 插件：3.2.1（在 “project/build.gradle” 文件中查看）。
</Note>

## 前提条件
<Content />
<Content1 />

## 获取示例源码

<Card title="示例源码" href="https://artifact-demo.zego.im/zim/example/android/ZIMExampleJava.zip" target="_blank">点击获得完整代码。</Card>

下列结构为 IM 源码文件的子目录结构，下文所涉及的文件路径均为相对于此目录的路径。

```bash
.
├── app
│   ├── agconnect-services.json
│   ├── build
│   │   ├── generated
│   │   ├── intermediates
│   │   ├── outputs
│   │   └── tmp
│   ├── build.gradle
│   ├── libs
│   │   ├── MiPush_SDK_Client_4_9_1.jar
│   │   ├── VERSION.txt
│   │   ├── ZIM.jar
│   │   ├── arm64-v8a
│   │   ├── armeabi-v7a
│   │   ├── pushOpenClient_v3.0.0.4_484_81c1f83_release.jar
│   │   ├── x86
│   │   ├── x86_64
│   │   └── zpns-release.aar
│   ├── proguard-rules.pro
│   ├── src
│   │   └── main
│   └── zim_example_key.jks
├── build.gradle
├── gradle
│   └── wrapper
│       ├── gradle-wrapper.jar
│       └── gradle-wrapper.properties
├── gradle.properties
├── gradlew
├── gradlew.bat
├── local.properties
└── settings.gradle
```

## 运行示例源码

1. 在开发电脑中找到 Android Studio 软件图标。
   <Frame width="200" height="auto">
     <img src="https://doc-media.zego.im/sdk-doc/Pics/Android/ExpressSDK/SampleRunningGuide/open_as.png" />
   </Frame>

   <Accordion title="在开发电脑上安装 Android Studio 的方式" defaultOpen="false">
    - 方式 1：登录 [Android Studio 官网](https://developer.android.com/studio) 下载并安装 Android Studio 及其相关的 SDK Tools。由于国内运营商网络限制等原因，开发者需要确保本机能连接该网站，若无法访问建议选择方式 2。
    - 方式 2：使用搜索引擎搜索 “Android Studio 下载”、“Android Studio 安装” 和 “Android Studio SDK Tools 安装”，查找可下载的源网站，并安装相关软件和工具。
   </Accordion>

2. 打开 Android Studio，单击 “Open an Existing Project”。

    <Frame width="80%" height="auto">
      <img src="https://doc-media.zego.im/sdk-doc/Pics/Android/ExpressSDK/SampleRunningGuide/as_pre_ui.png" />
    </Frame>

3. 在解压后的示例源码文件夹中，选择 “ZIMExampleJava” 文件夹，并单击 “Open” 打开。

    <Frame width="80%" height="auto">
      <img src="https://doc-media.zego.im/sdk-doc/Pics/ZIM/Android/demo.png" />
    </Frame>

4. 请参考 [下载 SDK](/zim-android/client-sdks/sdk-downloads)，下载最新版本的 SDK 包，解压后将文件拷贝到示例源码的 “app/jniLibs/release/” 目录下。


5. 下载的示例源码中缺少 SDK 初始化所需的 appID 和 appSign，需要修改 “ZIMExample/app/src/main/java/im/zego/zimexample” 目录下的 “KeyCenter.java” 文件。请使用本文 [前提条件](#前提条件) 已获取的 AppID 和 AppSign 正确填写（**注意：需要在 AppID 后加 L**），否则示例源码无法正常运行。 

    <Frame width="80%" height="auto">
      <img src="https://doc-media.zego.im/sdk-doc/Pics/ZIM/Android/fill_appid_appSign_in_android_demo_new2_appsign.png" />
    </Frame>

    **若您的项目已切换为 “Token 鉴权”，请在 [ZEGO 控制台](https://console.zego.im) 上，申请临时 Token 用于调试。**


6. 将 Android 设备链接到开发电脑，当该设备成功开启“开发者模式”和“USB 调试”功能后，可以看到 Android Studio 上方的 “Running Devices” 选项框由下图：

    <Frame width="80%" height="auto">
      <img src="https://doc-media.zego.im/sdk-doc/Pics/ZIM/Android/as_no_device_new.png" />
    </Frame>

    变为下图：

    <Frame width="80%" height="auto">
      <img src="https://doc-media.zego.im/sdk-doc/Pics/ZIM/Android/as_connected_device_new.png" />
    </Frame>

  即 Android Studio 已成功连接到 Android 设备，可以将示例源码运行到该设备上了。

  <Note title="说明">
    
    - 当开发电脑连接 Android 设备后，大部分设备会弹出提示，不同 Android 厂商的提示信息有所不同，可根据情况选择 USB 模式。
    - 当 Android 设备连接开发电脑后，需要根据情况在该设备上开启开发者模式和 USB 调试功能（不同厂商的 Android 设备开启方式不同）。具体开启方式开发者可以需要自行搜索引擎搜索，例如：目前存在一台未开启过开发者模式与 USB 调试功能的某设备，可以在搜索引擎搜索“某设备开启开发者模式”，查看具体的开启教程。
  </Note>

7. 单击 “Run” 按钮，编译并运行示例源码。

    <Frame width="80%" height="auto">
      <img src="https://doc-media.zego.im/sdk-doc/Pics/ZIM/Android/run_android_demo_new.png" />
    </Frame>
