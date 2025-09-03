# 跑通示例源码

- - -

<Note title="说明">请联系 ZEGO 商务人员，获取最新的 `大饼 AI 变声` 示例源码包，并开通相关权限，然后参考本文档跑通源码，体验 AI 变声效果。</Note>

## 准备环境

**请确保开发环境满足以下技术要求**：
* iOS 11.0 或以上版本，且支持音视频的 iOS 设备或模拟器（推荐使用真机）
* Android 版本不低于 4.4，且支持音视频的 Android 设备或模拟器（推荐使用真机），如果是真机，请开启“允许调试”选项。
* Windows: Windows 8 或以上版本。
* Flutter 2.0 或以上版本，请参考 [Flutter Get Started](https://flutter.dev/docs/get-started/install)。
* 设备已经连接到 Internet。


**配置开发环境**：

* Android Studio: 选择“Preferences > Plugins”，搜索 “Flutter” 插件进行下载，在插件中配置已下载好的 Flutter SDK 路径。
* VS Code: 在应用商店中搜索 “Flutter” 扩展并下载。

    以上任一开发环境配置好 Flutter 环境后，命令行（终端）执行 `flutter doctor`，根据提示内容补全相关未下载的依赖项。

## 前提条件

- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppID 和 AppSign，详情请参考 [控制台 - 项目管理](/console/project-info) 中的“项目信息”。
- 已参考 [控制台 - 云市场 - 大饼 AI 变声](/console/cloud-market/dabing-ai-voice-changer)，按照页面指引，自助开通 `大饼 AI 变声` 相关权限。

## 示例源码目录结构

以下目录结构为 flutter_dart 子目录的文件结构，下文所涉及的文件路径均为相对于此目录的路径。

```bash
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

### Android Studio

1. 解压已下载的 “ZegoExpressDemo_flutter_dart.zip” 压缩包，解压出 “flutter_dart” 文件夹。
2. 打开 Android Studio，选择 “Open an exitsting Android Studio project”，打开 “flutter_dart” 文件夹。
3. 将 Android 或 iOS 设备连接到电脑。
4. 在 Android Studio 右上角，单击 “Run” 按钮，运行示例 App。
<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Flutter/ZegoExpressEngine/flutter-run-android-studio.png" /></Frame>

### VS Code

1. 解压已下载的 “ZegoExpressDemo_flutter_dart.zip” 压缩包，解压出 “flutter_dart” 文件夹。
2. 打开 VS Code，选择 “File > Open”，打开 “flutter_dart” 目录。
3. 在 VS Code 左侧的文件管理器中，找到 “lib/main.dart” 并双击打开。
4. 将 Android 或 iOS 设备连接到电脑。
5. 选择 “Run > Run without Debugging”，运行示例 App。

<Warning title="注意">示例源码中缺少 SDK 初始化所需的 "appID" 和 "appSign"，请将本文 [前提条件](#前提条件) 已获取的 AppID 和 AppSign 正确填写到 “lib/keycenter.dart” 文件中，否则示例源码无法正常运行。  </Warning>

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/QuickStart/sample_code/sample_code_flutter.png" /></Frame>

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
