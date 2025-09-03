# 跑通示例源码

请配置开发环境如下：

- Android Studio：“Preferences > Plugins”，搜索 “Flutter” 插件进行下载，并在插件中配置已经下载好的 Flutter 的 SDK 路径。
- Visual Studio Code: 在应用商店中搜索 “Flutter” 扩展并下载。
以上任一开发环境配置好 Flutter 环境后，在终端执行 `flutter doctor`，根据提示内容补全相关未下载的依赖项。

## 前提条件

- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppID，详情请参考 [控制台 - 项目管理](https://doc-zh.zego.im/article/12107) 中的“项目信息”。
- 文件共享功能不是默认开启的，使用前请在 [ZEGO 控制台](https://console.zego.im) 自助开通（开通步骤请参考控制台文档 [服务配置 - 文件共享](https://doc-zh.zego.im/article/14338)），或联系 ZEGO 技术支持开通。

## 示例源码项目结构

下面目录结构为示例源码的文件结构，下文所涉及的文件路径均为相对于此目录的路径。

```shell
.superboard_view_flutter
├── CHANGELOG.md
├── LICENSE
├── README.md
├── README_zh.md
├── analysis_options.yaml
├── android
├── changes.txt
├── diff_script.sh
├── example
│   ├── README.md
│   ├── analysis_options.yaml
│   ├── android
│   ├── build
│   ├── images
│   ├── integration_test
│   ├── ios
│   ├── lib
│   │  ├── draw
│   │  ├── join_room_page.dart
│   │  ├── login_page.dart
│   │  ├── main.dart
│   │  ├── menu
│   │  ├── quick_join_item.dart
│   │  ├── setting_environment_page.dart
│   │  ├── setting_page.dart
│   │  ├── superboard_page.dart
│   │  ├── superboard_view_page.dart
│   │  ├── uitils
│   │  │   ├── adapt.dart
│   │  │   ├── app_navigator_observer.dart
│   │  │   ├── capture_utils.dart
│   │  │   ├── date_extension.dart
│   │  │   ├── date_util.dart
│   │  │   ├── extension.dart
│   │  │   ├── function_util.dart
│   │  │   ├── global.dart
│   │  │   ├── navigator_util.dart
│   │  │   ├── sp_constant.dart
│   │  │   ├── sp_util.dart
│   │  │   ├── toast_util.dart
│   │  │   ├── widget_utils.dart
│   │  │   ├── zego_auth_constants.dart  // 在此填写您的 AppID 和 AppSign
│   │  │   ├── zego_capture_whiteboard.dart
│   │  │   ├── zego_drawing_tool_manager.dart
│   │  │   ├── zego_env_manager.dart
│   │  │   └── zego_manager.dart
│   │  └── widget
│   ├── pubspec.lock
│   ├── pubspec.yaml
│   └── test
├── express_head
├── ios
├── lib
├── pubspec.lock
├── pubspec.yaml
├── superboard_view_flutter.iml
└── test
```

## 填写配置文件

1. 从本文开头处下载并解压示例源码压缩包，获得“superboard_view_flutter”文件夹，并使用 Android Studio/Visual Code Studio 打开。

2. 下载的示例源码中缺少 SDK 初始化所需的 AppID 和 AppSign，需要修改 “example/lib/uitils/zego_auth_constants.dart” 文件。请使用本文 [前提条件](#前提条件) 已获取的 AppID 和 AppSign 正确填写。

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/superboard/flutter/appID.png" /></Frame>

## 安装依赖

进入“superboard_view_flutter”文件夹，打开 Terminal，执行 `flutter pub get` 或 `flutter pub upgrade`。

## 在 Android 设备运行

1. 使用 Android Studio/Visual Code Studio 打开 “superboard_view_flutter”。
2. 将一台 Android 设备（真机） 连接到开发电脑。
3. 运行示例源码。

## 在 iOS 设备上运行

1. 将一台 iOS 设备（真机） 连接到电脑。
2. 使用 Xcode 打开示例源码目录中的“superboard_view_flutter/ios/Runner.xcworkspace”。
3. 登录 Apple ID。

    打开 Xcode, 点击左上角 Xcode > Settings，选择 Account 选项卡，点击左下角的 + 号，选择添加 Apple ID。
    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/superboard/flutter/login_AppleID.jpeg" /></Frame>
    输入 AppID 和密码。
    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/superboard/flutter/login.jpeg" /></Frame>
4. 修改开发者证书和 Bundle Identifier。
   1. 在 Xcode 单击左侧的“Runner”项目。
   2. 在“Runner”页面中找到“TARGETS”，选择“Runner”。
   3. 单击“Signing & Capabilities”页签。
   4. 在“Signing”中找到“Team”，选择您的开发者证书；找到“Bundle Identifier”，修改项目的“Bundle Identifier”。
   <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/superboard/flutter/Signing_and_Capabilities.jpeg" /></Frame>

5. 运行源码

    您可以使用 Visual Studio Code 或 Xcode 运行示例源码。

    - Visual Studio Code
        1. 使用 Visual Studio Code 打开示例源码。
        2. 在顶部菜单栏中点击“Run > Start Debugging“。
            <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/superboard/flutter/vscode_run.jpeg" /></Frame>
        3. 在弹窗中选择 iOS 真机设备，即可运行项目。

    - Xcode
        1. 在终端前往源码所在文件夹，输入以下指令，运行示例源码。
            ```shell
            cd ios/
            pod install
            ```
        2. 使用 Xcode 打开示例源码目录中的“superboard_demo/ios/Runner.xcworkspace”，单击顶部“运行”图标，即可运行项目。
            <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/superboard/flutter/xcode_run.jpeg" /></Frame>

## 体验超级白板

运行成功后将会自动弹出登录窗口，请在此窗口输入自定义的 room ID、userName、userID，登录应用，体验超级白板功能。

<Warning title="注意">

- room ID：最大长度为 128 字节的字符串，仅支持数字，英文字符和“~”、“!”、“@”、“#”、“$”、“%”、“^”、“&”、“*”、“(”、“)”、“_”、“+”、“=”、“-”、“`”、“;”、“’”、“,”、“.”、“\<”、“>”、“/”。如果需要与 Web SDK 互通，请不要使用 '%'。
- userName：最大长度不超过 256 字节的 utf8 编码字符串。请勿在此字段填写用户敏感信息，包括但不限于手机号、身份证号、护照编号、真实姓名等。
- userID：最大长度为 64 字节的字符串，仅支持数字，英文字符和“~”、“!”、“@”、“#”、“$”、“%”、“^”、“&”、“*”、“(”、“)”、“_”、“+”、“=”、“-”、“`”、“;”、“’”、“,”、“.”、“\<”、“>”、“/”。如果需要与 Web SDK 互通，请不要使用 '%'。
</Warning>

<Frame width="256" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/superboard/flutter/demo_run.jpeg" /></Frame>
