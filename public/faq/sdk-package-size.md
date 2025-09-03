<Title>什么是 SDK 的安装包增量？</Title>


---
SDK 的安装包增量，指一个 App 集成了 SDK 后的安装包大小，减去未集成 SDK 前的安装包大小，且不同平台的计算方式不一。

<Note title="说明">


- 官网提供的 SDK 安装包增量数据与真实情况存在些许差异，同一份 SDK 在不同的 App 中集成后的安装包增量不同。例如，Android APK、Windows Installer 的压缩方式和压缩等级可以自定义。
- 官网提供的数据以各个平台新建工程的默认打包方式计算，尽量贴近大部分开发者的实际情况。


</Note>



## Android

1. 使用 Android Studio 新建一个 Android App 工程，并直接构建打包一个 **Release** 模式的 `.apk` 包，得到此 `.apk` 的包大小为 `P1`。
2. 在此 App 工程中集成 SDK，然后构建打包出一个 `.apk` 包，得到此 `.apk` 的包大小为 `P2`。

<Note title="说明">


    - 一般情况下，一次只集成 SDK 的一个架构（例如 arm64-v8a 架构）。若需要构建包含多架构的 Universal APK，则 SDK 的安装包大小增量是多个架构的数值之和（例如 armeabi-v7a 数值+ arm64-v8a 数值）。
    - 谷歌建议构建多个不同架构的单架构 apk 来减少 App 的包大小，详情请参考 [官方文档](https://developer.android.com/studio/build/configure-apk-splits)。
    - 当工程的 **minSdkVersion >= 23**，打包出来的 apk 包体积会较大，建议您修改 [`android:extractNativeLibs`](https://developer.android.google.cn/guide/topics/manifest/application-element?hl=zh-cn#extractNativeLibs) 或 [`useLegacyPackaging`](https://developer.android.google.cn/reference/tools/gradle-api/7.1/com/android/build/api/dsl/JniLibsPackagingOptions#useLegacyPackaging:kotlin.Boolean) 配置以压缩 Native 动态库，详情请参考 [官方文档](https://developer.android.google.cn/guide/topics/manifest/application-element?hl=zh-cn#extractNativeLibs)。
    
</Note>



3. 因此 SDK 一个架构的安装包增量为 `ΔP = P2 - P1`。

## iOS

1. 使用 Xcode 新建一个 iOS App 工程，并直接构建打包一个 **Release** 模式的 `.ipa` 包，此 `.ipa` 的包大小为 `P1`。
2. 在此 App 工程中集成 SDK，然后构建打包 `.ipa` 包，此 `.ipa` 包大小为 `P2`。

<Note title="说明">


    一般情况下，一次只集成 SDK 的一个架构（例如 arm64 架构）。由于目前 Apple 已经废弃了 armv7 架构，所有发布到 App Store 的 iOS App 都是 arm64 单架构 App。

    
</Note>



3. 因此 SDK 一个架构的安装包大小增量 `ΔP = P2 - P1`。

## macOS

1. 使用 Xcode 新建一个 macOS App 工程，并构建打包一个 **Release** 模式的 `.app` 包，然后使用 DMG 映像制作工具（例如开源的 create-dmg）制作出 `.dmg` 包（以 UDZO 即 zip 方式压缩），得到此 `.dmg` 包大小为 `P1`。
2. 在此 App 工程中集成 SDK ，然后构建打包 `.app` 包，并制作出一个 `.dmg` 包，得到此 `.dmg` 的包大小为 `P2`。

<Note title="说明">


    一般情况下，一次只集成 SDK 的一个架构（例如 x86_64 架构）。若需要构建同时支持 x86_64 和 arm64 架构的 Universal 包，则 SDK 的安装包大小增量是两个架构的数值之和。您可以分别构建 x86_64 和 arm64 架构的单架构 App 包，并让用户根据自己的机型来选择下载，以便减少 App 的包大小。
    
</Note>



3. 因此 SDK 一个架构的安装包大小增量 `ΔP = P2 - P1`。

## Windows

1. 新建一个 Windows App 工程，并构建打包一个包含 App 本体，且可执行二进制以及其他资源的产物文件夹，然后使用 Windows Installer 制作工具（例如 Inno Setup）制作出一个包含 App 所有资源的 `.exe` 安装包（以 zip/6 方式压缩），得到此 `.exe` 的包大小为 `P1`。
2. 在此 App 工程中，集成 SDK，然后构建打包出一个包含 App 本体，且可执行二进制和 SDK 的 `.dll` 动态库以及其他资源的产物文件夹，然后制作出一个包含 App 所有资源的 `.exe` 安装包，得到此 `.exe` 的包大小为 `P2`。

3. 因此 SDK 一个架构的安装包大小增量 `ΔP = P2 - P1`。

## Linux

1. 新建一个 Linux App 工程，并构建打包出一个包含 App 本体，且可执行二进制以及其他资源的产物文件夹，然后使用安装包制作工具（例如 dpkg-deb）制作出一个包含 App 所有资源的 `.deb` 安装包（以 gzip 方式压缩），得到此 `.deb` 的包大小为 `P1`。
2. 在此 App 工程中集成 SDK，然后构建打包出一个包含 App 本体，且可执行二进制和 SDK 的 `.so` 动态库以及其他资源的产物文件夹，然后制作出一个包含 App 所有资源的 `.deb` 安装包，得到此 `.deb` 的包大小为 `P2`。
3. 因此 SDK 一个架构的安装包大小增量为 `ΔP = P2 - P1`。
