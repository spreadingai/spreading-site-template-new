# 跑通示例源码

---

## 准备环境

在运行示例源码前，请确保开发环境满足以下要求（以下说明皆以 macOS 开发电脑为例)：

* Android Studio 4.0 或以上版本。
* Android SDK 30、Android SDK Platform-Tools 30.x.x 或以上版本。
* Android 6.0 或以上版本，且支持音视频的 Android 设备或模拟器（推荐使用物理设备），如果是物理设备（真机），请开启“允许调试”选项。
* Android 设备、 macOS / Windows 开发电脑已经连接到 Internet。

<Note title="说明">
- 首次编译示例源码时，如果没有对应的依赖库或者构建工具，Android Studio 会自动下载示例源码，可能需要较长时间，请耐心等待。
- 建议下载特定的 Gradle 及所需的依赖库，请参考 [Gradle Services](https://services.gradle.org) 下载。示例源码中使用的 Gradle 相关版本如下：
    - gradle：6.8.1（在 “project/gradle/wrapper/gradle-wrapper.properties” 文件中查看）。
    - gradle Android 插件：4.1.2（在 “project/build.gradle” 文件中查看）。
</Note>


## 前提条件

- 已在 [下载](/ai-effects-android-java/downloads) 页面，获取最新版本的 SDK 和示例源码。
- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，获取到了接入 ZegoEffects SDK 服务所需的 AppID 和 AppSign，详情请参考 [控制台 - 项目管理](https://doc-zh.zego.im/article/12107) 中的“项目信息”。
- 已联系 ZEGO 技术支持，开通 ZegoEffects 相关套餐服务权限。


## 运行示例源码


<Steps>
<Step title="打开 Android Studio">
在您的电脑中找到并打开 Android Studio。

<Frame width="128" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/ZegoEffects/Android/android_studio_logo.png" /></Frame>

如果您尚未安装 Android Studio，可参考以下任意方式：
- 方式 1：登录 [Android Studio 官网](https://developer.android.com/studio) 下载并安装 Android Studio 及其相关的 SDK Tools。由于国内运营商网络限制等原因，开发者需要确保本机能连接该网站，若无法访问建议选择方式 2。
- 方式 2：使用搜索引擎搜索 "Android Studio 下载"、"Android Studio 安装" 和 "Android Studio SDK Tools 安装"，查找可下载的源网站，并安装相关软件和工具。

</Step>
<Step title="打开示例项目">
1. 打开 Android Studio，单击 "Open an existing Android Studio project"。
    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/ZegoEffects/Android/android_studio_open_project.png" /></Frame>

2. 在解压后的示例源码文件夹中选择 "ZegoEffectsExample" (SDK Demo) 文件夹，并单击 "Open" 打开。
    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/ZegoEffects/Android/open_effects_android_example.png" /></Frame>
</Step>
<Step title="添加 SDK 资源">
1. 将 [下载](/ai-effects-android-java/downloads) 后的 SDK 目录下的 "arm64-v8a" 文件夹、"armeabi-v7a" 文件夹、"x86_64" 文件夹 和 "ZegoEffects.jar" 文件，拷贝到 "Example > ZegoEffectsExample > SDKManager > libs" 路径下。
<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/ZegoEffects/Android/android_studio_dependency_libs.png" /></Frame>
2. 将根目录下的 Models 及 Resources 两个文件夹拷贝或替换到 "Example > ZegoEffectsExample > EffectsOnly > src > main > assets"路径下。
</Step>
<Step title="配置鉴权信息">
1. 下载的示例源码中缺少 SDK 初始化所需的鉴权信息（AppID、AppSign），需要修改"ZegoEffectsExample/SDKManager/src/main/java/im/zego/zegoeffectsexample/sdkmanager" 目录下的 "ZegoLicense.java" 文件。请使用本文 [前提条件](#前提条件) 所获取到的信息正确填写，否则源码无法正常运行。
    <Warning>
    此处需要填写 BACKEND_API_URL 为 `https://aieffects-api.zego.im/?Action=DescribeEffectsLicense`，用于在线鉴权，详情请参考 [在线鉴权](/ai-effects-android-java/quick-starts/online-authentication)。拉取鉴权文件后，SDK 校验通过才可以正常使用 SDK 的功能。ZEGO 建议开发者定时更新、拉取鉴权数据，防止鉴权文件过期，导致 SDK 校验不通过的问题。
    </Warning>
    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/ZegoEffects/Android/enter_effects_license.png" /></Frame>
2. 找到 "app/build.gradle" 文件，修改 `applicationId` 为申请 license 时所使用的包名。
    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/android_bundleid.png" /></Frame>
</Step>
<Step title="连接设备">
1. 将 Android 设备链接到开发电脑，当该设备成功开启"开发者模式"和 "USB 调试功能"后，可以看到 Android Studio 由下图：
    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/ZegoEffects/Android/android_studio_no_device.png" /></Frame>
    变为下图：
    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/ZegoEffects/Android/android_studio_has_device.png" /></Frame>
   
   即 Android Studio 已成功连接到 Android 设备，可以将示例源码运行到该设备上了。
    
    <Note title="说明">
    - 当开发电脑连接 Android 设备后，大部分设备会弹出提示，不同 Android 厂商的提示信息有所不同，可根据情况选择 USB 模式。
    - 当 Android 设备连接开发电脑后，需要根据情况在该设备上开启开发者模式和 USB 调试功能（不同厂商的 Android 设备开启方式不同）。具体开启方式可以使用搜索引擎搜索。 例如：目前存在一台未开启过开发者模式与 USB 调试功能的某设备，可以在搜索引擎搜索"某设备开启开发者模式"，查看具体的开启教程。
    </Note>
</Step>
<Step title="运行项目">
单击 "Build and run" 按钮，编译并运行示例源码。
    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/ZegoEffects/Android/android_studio_build_and_run.png" /></Frame>
</Step>
</Steps>
