# 示例代码运行指引


## 准备环境

**请确保开发环境满足以下技术要求**：
* iOS 12.0 或以上版本，且支持音视频的 iOS 设备或模拟器（推荐使用真机）
* Android 版本不低于 4.4，且支持音视频的 Android 设备或模拟器（推荐使用真机），如果是真机，请开启“允许调试”选项。
* Windows: Windows 8 或以上版本。
* macOS: macOS 11.0 或以上版本。
* Web：Chrome 58 或以上版本、Firefox 56 或以上版本、Safari 11 或以上版本、Opera 45 或以上版本、QQ 浏览器 Windows 10.1 或以上版本/macOS 4.4 或以上版本、360 安全浏览器极速模式。
* Linux：Debian 10 或以上版本、Ubuntu 20.04 LTS、22.04 LTS、24.04 LTS。
* Flutter 2.0 或以上版本，请参考 [Flutter Get Started](https://flutter.dev/docs/get-started/install)。
* 设备已经连接到 Internet。


**配置开发环境**：

* Android Studio: 选择“Preferences > Plugins”，搜索 “Flutter” 插件进行下载，在插件中配置已下载好的 Flutter SDK 路径。
* VS Code: 在应用商店中搜索 “Flutter” 扩展并下载。

    以上任一开发环境配置好 Flutter 环境后，命令行（终端）执行 `flutter doctor`，根据提示内容补全相关未下载的依赖项。

## 前提条件

已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppID 和 AppSign，详情请参考 [控制台 - 项目管理](/console/project-info) 中的“项目信息”。

<Warning title="注意">
SDK 同时也支持 Token 鉴权，若您需要升级鉴权方式，可参考 [如何从 AppSign 鉴权升级为 Token 鉴权](/console/project-info)。
</Warning>

## 获取示例源码
<Card title="示例源码" href="https://artifact-demo.zego.im/express/example/video/flutter_dart/ZegoExpressDemo_flutter_dart.zip" target="_blank">
本地下载
</Card>
## 示例源码目录结构

以下目录结构为 flutter_dart 子目录的文件结构，下文所涉及的文件路径均为相对于此目录的路径。

```tree
.
├─ README.md
├─ README_zh.md
├─ VERSION.txt
├─ android
├─ ios
├─ lib
│    ├─ home
│    │    ├─ global_setting_page.dart      # 设置界面
│    │    └─ home_page.dart                # 主页面
│    ├─ main.dart
│    ├─ topics
│    │    ├─ AudioAdvanced                 # 音频进阶功能
│    │    ├─ BestPractices                 # 最佳实践
│    │    ├─ CommonFunctions               # 常用功能
│    │    ├─ OtherFunctions                # 其他功能
│    │    ├─ QuickStart                    # 快速开始
│    │    ├─ StreamAdvanced                # 推流、拉流进阶
│    │    └─ VideoAdvanced                 # 视频进阶功能
│    └─ utils
├─ pubspec.yaml                            # flutter 工程文件
├─ resources
└─ test
```


## 运行示例代码

**iOS/Android**：

* **Android Studio**

    1. 解压已下载的 “ZegoExpressDemo_flutter_dart.zip” 压缩包，解压出 “flutter_dart” 文件夹。
    2. 打开 Android Studio，选择 “Open an exitsting Android Studio project”，打开 “flutter_dart” 文件夹。
    3. 将 Android 或 iOS 设备连接到电脑。
    4. 在 Android Studio 右上角，单击 “Run” 按钮，运行示例 App。
    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Flutter/ZegoExpressEngine/flutter-run-android-studio.png" /></Frame>

* **VS Code**

    1. 解压已下载的 “ZegoExpressDemo_flutter_dart.zip” 压缩包，解压出 “flutter_dart” 文件夹。
    2. 打开 VS Code，选择 “File > Open”，打开 “flutter_dart” 目录。
    3. 在 VS Code 左侧的文件管理器中，找到 “lib/main.dart” 并双击打开。
    4. 将 Android 或 iOS 设备连接到电脑。
    5. 选择 “Run > Run without Debugging”，运行示例 App。

<Warning title="注意">


    示例源码中缺少 SDK 初始化所需的 "appID" 和 "appSign"，请将本文 [前提条件](https://doc-zh.zego.im/article/13195#1_2) 已获取的 AppID 和 AppSign 正确填写到 “lib/keycenter.dart” 文件中，否则示例源码无法正常运行。

</Warning>



    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/QuickStart/sample_code/sample_code_flutter.png" /></Frame>

**Web**：
* **VS Code**

    1. 解压已下载的 “ZegoExpressDemo_flutter_dart.zip” 压缩包，解压出 “flutter_dart” 文件夹。
    2. 打开 VS Code，选择 “File > Open”，打开 “flutter_dart” 目录。
    3. 选择 “Terminal > New Terminal” 基于当前目录启动一个新的终端。
    4. 在终端中执行 `flutter run -d chrome --web-renderer html`，运行示例 Demo。

<Warning title="注意">


        - 示例源码中缺少 SDK 初始化所需的 "appID"，请将本文 [前提条件](https://doc-zh.zego.im/article/13195#1_2) 已获取的 AppID 正确填写到 “lib/keycenter.dart” 文件中，否则示例源码无法正常运行。Web 不支持 AppSign 鉴权，线上环境的构建产物也要避免带入 AppSign，以防泄露。
        - 仅支持 SSL 的 Web 服务器（HTTPS）。本地调试工具的 Web 服务域名可使用 localhost 或 127.0.0.1。
        - Web 平台仅支持 token 鉴权。
        - **Token 临时获取方式**
        为方便开发者调试，[ZEGO 控制台](https://console.zego.im/) 提供生成临时 Token 的功能，开发者可直接获取临时 Token 来使用，详情请参考 [控制台 - 开发辅助](/console/development-assistance/temporary-token)。但是在开发者自己的线上环境中，一定要通过自己的服务端生成 Token。

</Warning>



    ```dart
    class KeyCenter {
      static final KeyCenter instance = KeyCenter._internal();
      KeyCenter._internal();

      // 开发人员可以从控制台：https://console.zego.im/account/login 获取 AppID
      // 例如 123456789
      int appID = ;

      // 仅当在非 Web 平台上运行时，才需要填写此值
      // AppSign 仅满足简单的身份验证要求
      // 如果您需要升级到更安全的身份验证方法，请参考 [Express 如何从 AppSign 鉴权升级为 Token 鉴权？](https://doc-zh.zego.im/faq/token_upgrade?product=ExpressVideo&platform=all)
      // 开发人员可以从控制台：https://console.zego.im/account/login 获取 AppSign
      // 例如 "abcdefghijklmnopqrstuvwxyz0123456789abcdegfhijklmnopqrstuvwxyz01"
      String appSign = '';

      // 只有在 Web 平台上运行时，才需要填写此值
      // 开发人员可以从控制台：https://console.zego.im/account/login 获取 Token
      // 注意：用于生成 Token 的 userID 需要与上面填写的 userID 相同
      // 例如 "04AAAAAxxxxxxxxxxxxxx"
      String token = '';

      // 对于 Web 上的内部测试（无需填写此值，忽略即可）
      String tokenServer = '';
    }
    ```

## 注意事项

### iOS 真机运行示例 App 时，需要切换为自己的 Apple 开发证书

1. 使用 Xcode 打开项目目录中的 `ios/Runner.xcworkspace`。
2. 登录 Apple ID 账号。
    1. 打开 Xcode, 在左上角选择 “Xcode > Preference”，单击 “Account” 选项卡，在左下角单击 “+” 号，选择添加 Apple ID。

        <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/iOS/ZegoExpressEngine/Common/xcode-account.png" /></Frame>

    2. 输入 Apple ID 和密码以登录。

        <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/iOS/ZegoExpressEngine/Common/xcode-login-apple-id.png" /></Frame>

3. 修改开发者证书和 Bundle Identifier。

    1. 打开 Xcode，单击左侧的项目 “Runner”。

        <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Flutter/ZegoExpressEngine/flutter-xcode-select-project.png" /></Frame>

    2. 在 “General” 选项卡中，更改 “Bundle Identifier”。

        <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Flutter/ZegoExpressEngine/flutter-xcode-bundle-identifier.png" /></Frame>

    3. 单击 “Signing & Capabilities” 选项卡，在 “Team” 中选择自己的开发者证书。

        <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Flutter/ZegoExpressEngine/flutter-xcode-team-signing.png" /></Frame>


## 体验实时音视频功能

在真机中运行项目，运行成功后，可以看到本端视频画面。

为方便体验，ZEGO 提供了一个 [Web 端调试示例](https://zegodev.github.io/zego-express-webrtc-sample/assistDev/index.html)，在该页面下，输入相同的 AppID、RoomID，输入不同的 UserID、以及对应的 [Token](/console/development-assistance/temporary-token)，即可加入同一房间与真机设备互通。当成功开始音视频通话时，可以听到远端的音频，看到远端的视频画面。


<Content />
