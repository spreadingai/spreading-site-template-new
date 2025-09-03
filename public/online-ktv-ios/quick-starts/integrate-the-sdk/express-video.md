# 实时音视频

---

## 准备环境

在开始集成 ZEGO Express SDK 前，请确保开发环境满足以下要求：

- Xcode 15.0 或以上版本。
- iOS 12.0 或以上版本且支持音视频的 iOS 设备。
- iOS 设备已经连接到 Internet。

## 集成 SDK

### （可选）新建项目

<Accordion title="此步骤以如何创建新项目为例，如果是集成到已有项目，可忽略此步" defaultOpen="false">
1. 启动 Xcode，在 “Welcome to Xcode” 窗口中单击 “Create a new Xcode project” 或选择 “File > New > Project” 菜单。在出现的表单中，选择 iOS 平台，并在 “Application” 下选择 “App”。

    <Frame width="512" height="auto" ><img src="https://doc-media.zego.im/sdk-doc/Pics/QuickStart/NewProject_1.png" /></Frame>

2. 填写表单并选取各个选项来配置项目，完成后，单击 “Next”。

    必须提供 “Product Name” 和 “Organization Identifier”，用于创建 App 的唯一标识 “Bundle Identifier”。

    <Frame width="512" height="auto" ><img src="https://doc-media.zego.im/sdk-doc/Pics/QuickStart/NewProject_2.png" /></Frame>

3. 选择项目存储路径，单击 “Create” 创建项目。

    <Frame width="512" height="auto" ><img src="https://doc-media.zego.im/sdk-doc/Pics/QuickStart/NewProject_3.png" /></Frame>
</Accordion>

### 导入 SDK

开发者可通过以下任意一种方式实现集成 SDK。

<Tabs>
<Tab title="使用 CocoaPods 自动集成">
1. 安装 CocoaPods，安装时的常见问题请参考 [CocoaPods 常见问题 - 安装 CocoaPods](https://doc-zh.zego.im/faq/CocoaPods_question?product=HybridHierarchicalDeliverySystem&platform=macos)。

2. 打开终端，进入项目根目录，执行 `pod init` 命令创建 Podfile 文件。

3. 打开 Podfile 文件，在 “target” 下添加 `pod 'ZegoExpressPrivate', '3.22.0.46151'`，需要将 “MyProject” 替换为开发者的 Target 名称。

    ```ruby
    target 'MyProject' do
        use_frameworks!
        # 请填写具体的 SDK 版本号
        pod 'ZegoExpressPrivate', '3.22.0.46151'
    end
    ```

4. 执行 `pod install` 命令安装 SDK。

    <Note title="说明">
    - 若出现 “CDN: trunk URL couldn't be downloaded” 问题，请参考 [CocoaPods 常见问题 - 连接不上 trunk CDN 的问题](https://doc-zh.zego.im/faq/CocoaPods_question?product=HybridHierarchicalDeliverySystem&platform=macos#2)。
    - 若出现 “Unable to find a specification for 'ZegoExpressEngine'” 问题，请参考 [CocoaPods 常见问题 - 无法找到项目的问题](https://doc-zh.zego.im/faq/CocoaPods_question?product=HybridHierarchicalDeliverySystem&platform=macos#3)。
    - 若出现 “CocoaPods could not find compatible versions for pod "ZegoExpressEngine"” 问题，请参考 [CocoaPods 常见问题 - 无法找到项目的问题](https://doc-zh.zego.im/faq/CocoaPods_question?product=HybridHierarchicalDeliverySystem&platform=macos#3)。
    </Note>
</Tab>
<Tab title="复制 SDK 文件手动集成">

1. 请参考 [下载](/online-ktv-ios/downloads)，下载最新版本的 SDK 并解压。
2. 手动将 SDK 动态库文件 “ZegoExpressEngine.xcframework” 和 “ZegoExpressVideoCopyrightedMusicPlugin.xcframework” 拷贝到开发者的项目目录下。其中：
    - ios-arm64：适用于 iOS 真机。
    - ios-arm64_x86_64-maccatalyst：适用于 macOS 的 Mac Catalyst 包。Mac Catalyst 是 Apple 在 2019 年推出的新框架，即 UIKit for Mac，旨在让 iPad App 运行在 macOS 上。
    - ios-arm64_x86_64-simulator：适用于 iOS 模拟器。
3. 打开 Xcode，选择 “File > Add Files to "xxx"（xxx 为项目名）” 菜单，添加 SDK 库文件到项目。
    <Frame width="512" height="auto" ><img src="https://doc-media.zego.im/sdk-doc/Pics/iOS/ZegoExpressEngine/Common/add-files.png" /></Frame>
4. 选择 “TARGETS > General > Frameworks,Libraries,and Embedded Content” 菜单，添加 “ZegoExpressEngine.xcframework” 和 “ZegoExpressVideoCopyrightedMusicPlugin.xcframework”，将 “Embed” 设置为 “Embed & Sign”。
    <Frame width="512" height="auto" ><img src="https://doc-media.zego.im/sdk-doc/Pics/ktv/plugin/ios_video.png" /></Frame>
</Tab>
</Tabs>

## 设置权限

根据实际应用需要，设置应用所需权限。

1. 在 Xcode 中，选择 “TARGETS > Info > Custom iOS Target Properties” 菜单。

    <Frame width="512" height="auto" >
    <img src="https://doc-media.zego.im/sdk-doc/Pics/iOS/ZegoExpressEngine/Common/privacy-description.png" />
    </Frame>

2. 单击 “+” 添加按钮，添加摄像头和麦克风权限。

    - `Privacy - Camera Usage Description`

    - `Privacy - Microphone Usage Description`

    <Frame width="512" height="auto" >
    <img src="https://doc-media.zego.im/sdk-doc/Pics/iOS/ZegoExpressEngine/Common/privacy-description-done.png" />
    </Frame>

## 常见问题

1. **打包时报错：“Failed to verify bitcode in ZegoExpressEngine.framework/ZegoExpressEngine” 如何处理？**

    请检查 Xcode 版本是否过低，建议更新为最新的 Xcode 版本。

    若一定要使用旧版 Xcode 打包，请先在工程的 “Build Setting” 中找到 “Enable Bitcode” 选项并设为 “NO”，然后打开终端，`cd DIRECTORY` 到 “ZegoExpressEngine.framework” 所在目录 DIRECTORY，执行以下命令以去除 SDK 内的 bitcode。

    ```sh
    xcrun bitcode_strip ZegoExpressEngine.framework/ZegoExpressEngine -r -o ZegoExpressEngine.framework/ZegoExpressEngine
    ```

## 相关文档

- [如何减少集成 Native SDK 的 App 体积？](https://doc-zh.zego.im/faq/express_reduce_app_size)
- [在 Xcode 12.3 及之后版本中使用 iOS 模拟器构建项目为什么会失败？](https://doc-zh.zego.im/faq/ios_simulator_problem)
- [从 2.8.0 之前的版本升级以后，Xcode 编译报错如何处理？](https://doc-zh.zego.im/faq/Express_xcframework?product=ExpressVideo&platform=ios)
- [打包 iOS 时 Xcode 报错提示 Bitcode 版本不兼容？](https://doc-zh.zego.im/faq/ios_bitcode?product=ExpressVideo&platform=ios)
