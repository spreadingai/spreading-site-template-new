# 集成 SDK

---

## 准备环境

在开始集成 ZEGO Express SDK 前，请确保开发环境满足以下要求：

- Xcode 15.0 或以上版本。
- macOS 10.13 或以上版本的 macOS 设备。
- macOS 设备已经连接到 Internet。

## 集成 SDK

### （可选）新建项目

<Accordion title="此步骤以如何创建新项目为例，如果是集成到已有项目，可忽略此步。" defaultOpen="false">
1. 启动 Xcode，在 “Welcome to Xcode” 窗口中单击 “Create a new Xcode project” 或选择 “File > New > Project” 菜单。在出现的表单中，选择 macOS 平台，并在 “Application” 下选择 “App”。

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/QuickStart/NewProject_4.png" /></Frame>

2. 填写表单并选取各个选项来配置项目，完成后，单击 “Next”。

    必须提供 “Product Name” 和 “Organization Identifier”，用于创建 App 的唯一标识 “Bundle Identifier”。

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/QuickStart/NewProject_2.png" /></Frame>

3. 选择项目存储路径，单击 “Create” 创建项目。

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/QuickStart/NewProject_3.png" /></Frame>
</Accordion>

### 导入 SDK

开发者可通过以下任意一种方式实现集成 SDK。

#### 方式一： 使用 CocoaPods 自动集成

1. 安装 CocoaPods，安装时的常见问题请参考 [CocoaPods 常见问题 - 安装 CocoaPods](https://doc-zh.zego.im/faq/CocoaPods_question?product=ExpressVideo&platform=macos#1)。

2. 打开终端，进入项目根目录，执行 `pod init` 命令创建 Podfile 文件。

3. 打开 Podfile 文件，在 “target” 下添加 `pod 'ZegoExpressAudio-macOS'`，需要将 “MyProject” 替换为开发者的 Target 名称。

<Warning title="注意">

    - 由于 SDK 为 XCFramework，需要 CocoaPods v1.10.0 或以上版本才能集成该 SDK。
    - 从 v3.2.0 版本开始， Express 实时音视频 Video SDK 的 Pod 名称由 `ZegoExpressEngine/Video` 变更为 `ZegoExpressEngine-macOS`；Express 实时语音 Audio SDK 的 Pod 名称由 `ZegoExpressEngine/Audio` 变更为 `ZegoExpressAudio-macOS`。

</Warning>

    ```ruby
    target 'MyProject' do
        use_frameworks!
        # 请填写具体的 SDK 版本号
        # 请从发布日志查询 SDK 最新版本，并将 x.y.z 修改为具体的版本号
        pod 'ZegoExpressAudio-macOS', '~> x.y.z'
    end
    ```

4. 执行 `pod repo update` 命令更新本地索引，确保能安装最新版本的 SDK，最新版本号请参考 [下载文档 ](https://doc-zh.zego.im/article/3565) 中的发布历史。

5. 执行 `pod install` 命令安装 SDK。

<Note title="说明">


    - 若出现 “CDN: trunk URL couldn't be downloaded” 问题，请参考 [CocoaPods 常见问题 - 连接不上 trunk CDN 的问题](https://doc-zh.zego.im/faq/CocoaPods_question?product=ExpressVideo&platform=macos#2)。
    - 若出现 “Unable to find a specification for 'ZegoExpressEngine'” 问题，请参考 [CocoaPods 常见问题 - 无法找到项目的问题](https://doc-zh.zego.im/faq/CocoaPods_question?product=ExpressVideo&platform=macos#3)。
    - 若出现 “CocoaPods could not find compatible versions for pod "ZegoExpressEngine-macOS"” 问题，请参考 [CocoaPods 常见问题 - 无法找到项目的问题](https://doc-zh.zego.im/faq/CocoaPods_question?product=ExpressVideo&platform=macos#3)。

</Note>



#### 方式二： 复制 SDK 文件手动集成

1. 请参考 [下载 SDK 包](/real-time-video-macos-oc/client-sdk/download-sdk)，下载最新版本的 SDK 并解压。

2. 手动将 SDK 动态库文件 “ZegoExpressEngine.xcframework” 拷贝到开发者的项目目录下。其中：

3. 打开 Xcode，选择 “File > Add Files to "xxx"（xxx 为项目名）” 菜单，添加 SDK 库文件到项目。

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/iOS/ZegoExpressEngine/Common/add-files.png" /></Frame>

4. 选择 “TARGETS > General > Frameworks,Libraries,and Embedded Content” 菜单，添加 “ZegoExpressEngine.xcframework”，将 “Embed” 设置为 “Embed & Sign”。

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/iOS/ZegoExpressEngine/Common/embed_sign.png" /></Frame>

## 设置权限

根据实际应用需要，设置应用所需权限。

在 Xcode 中，选择 “TARGETS > Signing & Capabilities > App Sandbox” 菜单，勾选 SDK 所需的权限。

- `Network - Incoming Connections (Server)`
- `Network - Outgoing Connections (Client)`
- `Hardware - Audio Input`

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/macOS/ZegoExpressEngine/Common/privacy-description.png" /></Frame>

## 相关文档

[如何减少集成 Native SDK 的 App 体积？](https://doc-zh.zego.im/faq/express_reduce_app_size)
