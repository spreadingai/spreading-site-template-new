
- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，获取到了接入 ZIM SDK 服务所需的 AppID、AppSign。ZIM 服务权限不是默认开启的，使用前，请先在 [ZEGO 控制台](https://console.zego.im) 自助开通 ZIM 服务（详情请参考控制台文档 [项目管理 - 即时通讯](https://doc-zh.zego.im/article/14994)），若无法开通 ZIM 服务，请联系 ZEGO 技术支持开通。
<Warning title="注意">

`2.3.0 及以上`版本的 SDK，开始支持 “AppSign 鉴权”，同时仍支持 “Token 鉴权”，若您需要升级鉴权方式，可参考 [ZIM 如何从 AppSign 鉴权升级为 Token 鉴权](http://doc-zh.zego.im/faq/token_upgrade_zim)。
</Warning>
本文介绍如何快速跑通示例源码，体验即时通讯服务。
# 跑通示例源码

---

<Card title="示例源码" href="https://github.com/zegoim/zim_flutter_sdk" target="_blank">点击获得完整代码。</Card>

本文介绍如何快速跑通示例源码，体验即时通讯服务。

<Warning title="注意">
暂不支持在 HarmonyOS 设备上运行本示例源码。
</Warning>

## 准备环境

在运行示例源码前，请确保：
- Dart 版本为 [2.12.0 4.0.0)。
- 开发环境满足以下要求（二选一）：
    - Android Studio：“Preferences > Plugins”，搜索 “Flutter” 插件进行下载，在插件中配置第一步下载好的 Flutter SDK 路径。
    - Visual Studio Code：在应用商店中搜索 “Flutter” 扩展并下载。
         
    **以上任一开发环境配置好 Flutter 环境之后，命令行（终端）执行 `flutter doctor`，根据提示内容补全相关未下载的依赖项即可。**
  
- 测试设备满足以下要求：
    - iOS 11.0 或以上版本的 iOS 设备或模拟器（推荐使用真机）。
    - Android 4.1 或以上的 Android 设备或模拟器（推荐使用真机），如果是真机，请开启“允许调试”选项。
    - Windows: Windows 10 或更高的版本（基于 x86-64 的 64 位操作系统）。
    - macOS: macOS 10.13 或以上版本。
    - Web 浏览器：
        - Chrome 58 或以上版本
        - Firefox 56 或以上版本
        - Safari 11 或以上版本
        - Opera 45 或以上版本
        - QQ 浏览器 Windows 10.1 或以上版本/macOS 4.4 或以上版本
        - 360 安全浏览器极速模式
     - 设备已经连接到 Internet。

## 前提条件


<Content />
<Content1 />


## 示例源码目录结构

您可以在 ZIM Flutter SDK 中找到示例源码。以下展示了示例源码相关的 SDK 目录结构，下文所涉及的文件路径均为相对于此目录的路径。

```bash
├── CHANGELOG.md                            # plugin 迭代日志
├── LICENSE                                 # MIT 开源协议
├── README.md                               # plugin 使用说明
├── android                                 # Android 端 plugin
├── example                                 # 示例工程目录
│   ├── ...                           
│   ├── android                             # Android 端示例工程
│   ├── ios                                 # iOS 端示例工程
│   ├── lib                                 # 示例工程主要逻辑目录
│   │   ├── ...
│   │   ├── main.dart                       # 示例工程的启动入口
│   │   └── topics                          # 示例工程的主题
│   │       ├── chat                        # 聊天相关逻辑
│   │       ├── items                       # 示例工程使用的组件
│   │       │   ├── ...
│   │       │   ├── key_center
│   │       │   │   ├── ...
│   │       │   │   └── key_center.dart     # 请在此文件输入您的 AppID
│   │       │   └── msg_items               # 消息相关逻辑
│   │       ├── login                       # 登录相关逻辑
│   │       ├── menu                        # 目录相关逻辑
│   │       └── splash                      # 启动页相关逻辑
│   ├── macos
│   ├── pubspec.lock
│   ├── pubspec.yaml                        # example 依赖描述文件
│   ├── web                                 # Web 端示例工程
│   ├── windows                             # Windows 端示例工程
│   └── ...
├── ios                                     # iOS 端 plugin      
├── lib                                     # flutter 插件 dart 层的实现以及头文件
├── macos                                   # macOS 端 plugin
├── pubspec.yaml                            # plugin 依赖描述文件
├── windows                                 # windows 端 plugin
└── ...
```

## 配置 Apple 开发者证书

<Accordion title="（可选）如果您需要在 iOS 真机上运行示例 App，请参考本步骤配置你的 Apple 开发证书" defaultOpen="false">
1. 使用 Xcode，打开下载到的源码项目目录中的 `example/ios/Runner.xcworkspace` 文件。

2. 登录 Apple 开发者账号。

    1. 打开 Xcode，选择左上角的菜单 “Xcode > Preferences...”，单击 “Accounts” 选项卡，单击左下角的 “+”，选择添加 “Apple ID”，单击 “Continue”。

        <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/iOS/ZegoExpressEngine/Common/xcode-account.png" /></Frame>

    2. 输入 Apple ID 和 Password 登录。

        <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/iOS/ZegoExpressEngine/Common/xcode-login-apple-id.png" /></Frame>

3. 修改 Bundle Identifier 和开发者证书。

    1. 打开 Xcode，点击左侧的 “Runner” 项目目录。

        <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Flutter/ZegoExpressEngine/flutter-xcode-select-project.png" /></Frame>

    2. 打开 TARGETS 选项，单击 “General” 选项卡，修改项目的 Bundle Identifier。

      <Frame width="512" height="auto" caption="">
        <img src="https://doc-media.zego.im/sdk-doc/Pics/ZIM/flutter/run_example_demo_2.png" />
      </Frame>

    3. 单击 “Signing & Capabilities” 选项卡，选择自己的开发者证书。

      <Frame width="512" height="auto" caption="">
        <img src="https://doc-media.zego.im/sdk-doc/Pics/ZIM/flutter/run_example_demo_3.png" />
      </Frame>

</Accordion>


## 运行示例源码

以下介绍如果使用 Android Studio 和 Visual Studio Code 编译示例工程。

### 使用 Android Studio 编译

1. 从 [本文档开始处](#跑通示例源码) 下载 ZIM Flutter SDK 压缩包并解压，获得 “zim_flutter_sdk” 文件夹。

2. 打开 Android Studio，选择 “Open” 打开 “zim_flutter_sdk” 文件夹。

3. 示例源码中缺少 SDK 初始化所需的 "appID"、"appSign"，需要修改 “example/lib/topics/items/key_center/key_center.dart” 文件，请使用本文 [前提条件](#前提条件) 已获取的 AppID 和 AppSign 正确填写，否则示例源码无法正常运行。

4. 选择对应的运行设备，单击 “Android Studio” 右上角的 “Run” 按钮，运行示例 App，即可体验 ZIM。

    <Note title="说明">

    如果是移动端真机，请将其连接到电脑。
    </Note>

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/ZIM/flutter/run_example_demo_0.png" /></Frame>

5. （可选）如果您要在 Web 浏览器运行示例源码，还需要在登录页需输入 Token 进行鉴权，才能体验 ZIM。您可以参考控制台的 [临时 Token 生成和 Token 校验](https://doc-zh.zego.im/article/16309) 获取临时 Token。

### 使用 Visual Studio Code 编译

1. 从 [本文档开始处](#跑通示例源码) 下载 ZIM Flutter SDK 压缩包并解压，获得 “zim_flutter_sdk” 文件夹。

2. 打开 Visual Studio Code，选择 “File > Open...”，打开下载源码时得到的 “zim_flutter_sdk” 目录文件。

3. 示例源码中缺少 SDK 初始化所需的 "appID"、"appSign"，需要修改 “example/lib/topics/items/key_center/key_center.dart” 文件，请使用本文 [前提条件](#前提条件) 已获取的 AppID 和 AppSign 正确填写，否则示例源码无法正常运行。

4. 选择 “Run > Run without Debugging”，运行示例 App，即可体验 ZIM。

    <Note title="说明">

    如果希望在移动端真机上运行，请将其连接到电脑。
    </Note>

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/ZIM/flutter/run_example_demo_1.png" /></Frame>

5. （可选）如果您要在 Web 浏览器运行示例源码，还需要在登录页需输入 Token 进行鉴权，才能体验 ZIM。您可以参考控制台的 [临时 Token 生成和 Token 校验](https://doc-zh.zego.im/article/16309) 获取临时 Token。
