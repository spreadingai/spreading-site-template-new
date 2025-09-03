# 跑通示例源码

---

## 准备环境

请确保开发环境满足以下技术要求：

* Flutter 2.0 或以上版本。
* iOS 13.0 或以上版本且支持音视频的 iOS 设备或模拟器（推荐使用真机）。
* Android 版本不低于 8.0 且支持音视频的 Android 设备或模拟器（推荐使用真机），如果为真机，请开启“允许调试”选项。
* 设备已经连接到 Internet。


## 前提条件

- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，获取到了接入 ZegoEffects SDK 服务所需的 AppID 和 AppSign，详情请参考 [控制台 - 项目管理](https://doc-zh.zego.im/article/12107) 中的“项目信息”。
- 已联系 ZEGO 技术支持，开通 ZegoEffects 相关套餐服务权限。

## 下载示例源码

<CardGroup cols={1}>
<Card title="示例源码" href="https://artifact-demo.zego.im/AIEffect/ZegoEffects/Sourcecode/Flutter/example.zip">
点击下载并解压示例源码
</Card>
</CardGroup>

## 运行示例代码

<Steps>
<Step title="导入资源和模型">
下载 [iOS ZegoEffects SDK](/ai-effects-ios-objc/downloads) 或 [Android ZegoEffects SDK](/ai-effects-android-java/downloads) 最新版本，并解压后，将 `Resources` 和 `Models` 文件夹导入到您此前解压的示例源码文件夹 中，需要保留原来的“Backgrounds.bundle”文件。
<Tabs>
<Tab title="iOS">
将 `Resources` 和 `Models` 文件夹放入Resources文件夹下，导入后，您的项目目录结构应该如下所示：
```bash
Runner
├── Resources
│   ├── Models
│   │   ├── FaceDetectionModel.model
│   │   └── SegmentationModel.model
│   └── Resources
│       ├── Backgrounds.bundle
│       ├── ClarityResources.bundle
│       ├── ColorfulStyleResources
│       ├── CommonResources.bundle
│       ├── FaceWhiteningResources.bundle
│       ├── MakeupResources
│       ├── PendantResources.bundle
│       ├── RosyResources.bundle
│       ├── SkinColorResources
│       └── TeethWhiteningResources.bundle
│
```
</Tab>
<Tab title="Android">
将 `Resources` 和 `Models` 文件夹添加到您示例源码的 `assets` 目录下。通常，资源应该放置在 `android/app/src/main/assets` 目录中，所以导入后，您的示例源码的项目目录结构应该如下所示：
```bash
android/app/src/main
├── AndroidManifest.xml
├── assets
│   ├── Models
│   │   ├── FaceDetectionModel.model
│   │   └── SegmentationModel.model
│   └── Resources
│       ├── Backgrounds.bundle
│       ├── ClarityResources.bundle
│       ├── ColorfulStyleResources
│       ├── CommonResources.bundle
│       ├── FaceWhiteningResources.bundle
│       ├── MakeupResources
│       ├── PendantResources.bundle
│       ├── RosyResources.bundle
│       ├── SkinColorResources
│       └── TeethWhiteningResources.bundle
├── java
└── res
```
</Tab>
</Tabs>
</Step>
<Step title="配置鉴权信息">
在示例源码的根目录下，找到 `zego_config.dart.template` 文件，删掉“template”后缀，并填写对应的`appID`和`appSign`，获取方式请参考 [前提条件](#前提条件)。
```dart
// 登录控制台 https://console.zego.im/dashboard 获取 appID，例如 const appID = 123456789;
int appID = 0;  
// 登录控制台 https://console.zego.im/dashboard 获取 appSign，例如 "39011cbxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
String appSign = "";
```
</Step>
<Step title="拉取依赖">
请在根目录执行如下命令，以拉取 Flutter 依赖。
```bash
flutter pub get
```
</Step>
<Step title="（对于 iOS 平台）执行 pod 命令">
iOS 平台需在 iOS 目录下执行如下代码。
```bash
pod install
```
</Step>
<Step title="运行示例代码">
以 Android Studio 为例，在右上角，单击 `Run` 按钮，运行示例 App。
<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/ZegoEffects/flutter_run.jpeg" /></Frame>
</Step>
</Steps>
