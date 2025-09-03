# 集成 SDK

---

## 准备环境

在开始集成 ZEGO Express SDK 前，请确保开发环境满足以下要求：

- Xcode 15.0 或以上版本。
- iOS 12.0 或以上版本且支持音视频的 iOS 设备。
- iOS 设备已经连接到 Internet。

## 集成 SDK

### （可选）新建项目

<Accordion title="此步骤以如何创建新项目为例，如果是集成到已有项目，可忽略此步。" defaultOpen="false">
1. 启动 Xcode，在 “Welcome to Xcode” 窗口中单击 “Create a new Xcode project” 或选择 “File > New > Project” 菜单。

2. 在出现的表单中，选择 iOS 平台，并在 “Application” 下选择 “App”。

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/QuickStart/NewProject_1.png" /></Frame>

3. 填写表单并选取各个选项来配置项目，完成后，单击 “Next”。

    必须提供 “Product Name” 和 “Organization Identifier”，用于创建 App 的唯一标识 “Bundle Identifier”。

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/QuickStart/NewProject_2.png" /></Frame>

4. 选择项目存储路径，单击 “Create” 创建项目。

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/QuickStart/NewProject_3.png" /></Frame>
</Accordion>

### 导入 SDK

开发者可通过以下任意一种方式实现集成 SDK。

#### 方式 1：使用 Swift Package Manager 自动集成（推荐）

1. 打开 Xcode ，在菜单栏选择 “File > Add Packages...”，在 “Apple Swift Packages” 弹窗的 “Search or Enter Package URL” 输入框中，填写如下 URL 并敲击回车键确认：

    ```markdown
    https://github.com/zegolibrary/express-video-ios
    ```

2. 在 “Dependency Rule” 中，指定您想要集成的 SDK 版本（建议使用默认的 “Up to Next Major Version”），然后单击 “Add Package“ 导入 SDK，您也可以参考 [Apple 官方文档](https://developer.apple.com/documentation/xcode/adding-package-dependencies-to-your-app) 进行设置。

#### 方式 2：使用 CocoaPods 自动集成

<Accordion title="使用 CocoaPods 自动集成" defaultOpen="false">
1. 安装 CocoaPods，安装时的常见问题请参考 [CocoaPods 常见问题 - 安装 CocoaPods](https://doc-zh.zego.im/faq/CocoaPods_question?product=ExpressVideo&platform=macos#1)。

2. 打开终端，进入项目根目录，执行 `pod init` 命令创建 Podfile 文件。

3. 打开 Podfile 文件，在 “target” 下添加 `pod 'ZegoExpressEngine'`，需要将 “MyProject” 替换为开发者的 Target 名称。

    <Warning title="注意">
    - 由于 SDK 为 XCFramework，需要 CocoaPods v1.10.0 或以上版本才能集成该 SDK。
    - 从 v3.2.0 版本开始， Express 实时音视频 Video SDK 的 Pod 名称由 `ZegoExpressEngine/Video` 变更为 `ZegoExpressEngine`；Express 实时语音 Audio SDK 的 Pod 名称由 `ZegoExpressEngine/Audio` 变更为 `ZegoExpressAudio`。
    </Warning>

    ```ruby
    target 'MyProject' do
        use_frameworks!
        # 请填写具体的 SDK 版本号
        # 请从发布日志查询 SDK 最新版本，并将 x.y.z 修改为具体的版本号
        pod 'ZegoExpressEngine', '~> x.y.z'
    end
    ```

4. 执行 `pod repo update` 命令更新本地索引，确保能安装最新版本的 SDK，最新版本号请参考 [下载 SDK 包 ](/real-time-video-rn/client-sdk/download-sdk) 中的发布历史。

5. 执行 `pod install` 命令安装 SDK。

    <Note title="说明">


    - 若出现 “CDN: trunk URL couldn't be downloaded” 问题，请参考 [CocoaPods 常见问题 - 连接不上 trunk CDN 的问题](https://doc-zh.zego.im/faq/CocoaPods_question?product=ExpressVideo&platform=macos#2)。
    - 若出现 “Unable to find a specification for 'ZegoExpressEngine'” 问题，请参考 [CocoaPods 常见问题 - 无法找到项目的问题](https://doc-zh.zego.im/faq/CocoaPods_question?product=ExpressVideo&platform=macos#3)。
    - 若出现 “CocoaPods could not find compatible versions for pod "ZegoExpressEngine"” 问题，请参考 [CocoaPods 常见问题 - 无法找到项目的问题](https://doc-zh.zego.im/faq/CocoaPods_question?product=ExpressVideo&platform=macos#3)。
    </Note>
</Accordion>

#### 方式 3：复制 SDK 文件手动集成

<Accordion title="复制 SDK 文件手动集成" defaultOpen="false">
1. 请参考 [下载](/real-time-video-rn/client-sdk/download-sdk) 文档，下载最新版本的 SDK 并解压。

2. 手动将 SDK 动态库文件 “ZegoExpressEngine.xcframework” 拷贝到开发者的项目目录下。


    <Accordion title="XCFramework 文件说明" defaultOpen="false">
    **XCFramework** 是一个同时包含真机、模拟器等多平台架构的全新封装形式，请将其作为一个**整体**集成到工程内，不建议拆开使用。但如果您确实**仅需要**单独集成真机架构、或单独集成模拟器架构，也可以将 **XCFramework** 内的 **.framework** 单独取出使用。

    - ios-arm64：适用于 iOS 真机。
    - ios-arm64_x86_64-maccatalyst：适用于 macOS 的 **Mac Catalyst** 包。**Mac Catalyst** 是 Apple 在 2019 年推出的新框架，即 **UIKit for Mac**，旨在让 iPad App 运行在 macOS 上。详情请参考 [Apple 开发者 - Mac Catalyst](https://developer.apple.com/mac-catalyst)
    - ios-arm64_x86_64-simulator：适用于 iOS 模拟器。
    </Accordion>

3. 打开 Xcode，选择 “File > Add Files to "xxx"（xxx 为项目名）” 菜单，添加 SDK 库文件到项目。

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/iOS/ZegoExpressEngine/Common/add-files.png" /></Frame>

4. 选择 “TARGETS > General > Frameworks,Libraries,and Embedded Content” 菜单，添加 “ZegoExpressEngine.xcframework”，将 “Embed” 设置为 “Embed & Sign”。

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/iOS/ZegoExpressEngine/Common/embed_sign.png" /></Frame>

 </Accordion>

## 设置权限

根据实际应用需要，设置应用所需权限。

1. 在 Xcode 中，选择 “TARGETS > Info > Custom iOS Target Properties” 菜单。

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/iOS/ZegoExpressEngine/Common/privacy-description.png" /></Frame>

2. 单击 “+” 添加按钮，添加摄像头和麦克风权限。

    - `Privacy - Camera Usage Description`

    - `Privacy - Microphone Usage Description`

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/iOS/ZegoExpressEngine/Common/privacy-description-done.png" /></Frame>

## 相关文档

- [如何减少集成 Native SDK 的 App 体积？](https://doc-zh.zego.im/faq/express_reduce_app_size)
- [在 Xcode 12.3 及之后版本中使用 iOS 模拟器构建项目为什么会失败？](https://doc-zh.zego.im/faq/ios_simulator_problem)

<Content />