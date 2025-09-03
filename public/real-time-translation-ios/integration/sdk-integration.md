# 集成 SDK

- - -

## 准备环境

在开始集成 ZegoRealtimeTranslation SDK 前，请确保开发环境满足以下要求：

* Xcode 14.0 或以上版本。
* iOS 11.0 或以上版本且支持音视频的 iOS 设备（仅支持使用真机）。
* iOS 设备已经连接到 Internet。

## 集成 SDK

### 1（可选）新建项目

1. 启动 Xcode，在 “Welcome to Xcode” 窗口中，单击 “Create a new Xcode project” 或选择 “File > New > Project” 菜单，在出现的表单中，选择 iOS 平台，并在 “Application” 下选择 “App”。
    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/QuickStart/NewProject_1.png" /></Frame>

2. 填写表单并选取各个选项来配置项目，单击 “Next”。

    必须提供 “Product Name” 和 “Organization Identify”，用于创建在整个系统中标识 App 的 “Bundle Identify”。
    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/QuickStart/NewProject_2.png" /></Frame>


3. 选择项目存储路径，单击 “Create” 创建项目。
    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/QuickStart/NewProject_3.png" /></Frame>

### 2 下载 SDK

ZEGO 实时传译 SDK 由深圳市即构科技有限公司提供，您可以在本页面获取适用于 iOS 客户端的 ZegoRealtimeTranslation SDK，当前可下载版本为 1.1.0，发布日志请参考 [发布日志](https://doc-zh.zego.im/article/17538)，合规事宜请参考 [ZEGO 安全合规白皮书](/policies-and-agreements/zego-security-and-compliance-white-paper)。


<Card title="ZegoRealtimeTranslation SDK v1.1.0" href="https://artifact-sdk.zego.im/zegorealtimetranslation/iOS/SDK/ZegoRealtimeTranslation.xcframework.zip">
本地下载
</Card>  

<Note title="说明">


- 示例源码：请参考 [跑通示例源码](https://doc-zh.zego.im/article/16655)。
- SDK 集成指引：请参考 [集成 SDK](https://doc-zh.zego.im/article/16657)。
- SDK 版本变更：请参考 [发布日志](https://doc-zh.zego.im/article/17538)。

</Note>

### 3 导入 SDK

1. 请 [下载](https://doc-zh.zego.im/article/16834) 最新版本的 SDK，下载完成后进行解压。

2. 请从 [zreporter ](https://artifact-master.zego.cloud/generic/native_common/public/zreporter/sharedlibrary/ios/zreporter-ios-shared-objc.zip?version=1.0.2.153) 下载日志上报的 SDK, 用于将 SDK 中的事件上报至后台，用于分析问题。

3. 打开已解压文件夹，手动将以下 SDK 动态库文件，拷贝到项目目录下。
- ZegoRealtimeTranslation.xcframework
- zreporter.xcframework

4. 打开 Xcode，选择 “File > Add Files to "xxx"（xxx 为项目名）” 菜单，添加以上 SDK 动态库文件到项目。

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/iOS/RealtimeTranslation/add_framwork_lib.jpg" /></Frame>

5. 选择 “TARGETS > General > Frameworks, Libraries, and Enbedded Content” 菜单，添加 “ZegoRealtimeTranslation.xcframework”，将 “Embed” 设置为 “Embed & Sign”。
    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/iOS/RealtimeTranslation/set_framework_libs.jpg" /></Frame>

6. 选择 “TARGET > General > Deployment Target”，设置 11.0 或以上版本。

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/iOS/RealtimeTranslation/set_mini_deployments.jpg" /></Frame>

7. 请从 [google-proto](https://artifact-master.zego.cloud/generic/realtime_translation/public/ios/online/googleProto.zip?version=1.0.0) 下载 google 文件夹以及 googleapis.podspec 文件，解压缩后，将 google 文件夹和 googleapis.podspec 文件拖拽到项目根目录下，googleapis 用于安装 google 语音识别的服务的依赖库，google 文件夹里面存放的是消息发送及接收的 proto 文件。
    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/iOS/RealtimeTranslation/add_google_api.jpg" /></Frame>

    googleapis.podspec 文件内容如下：

    ```ruby
    Pod::Spec.new do |s|
      s.name     = 'googleapis'
      s.version  = '0.0.1'
      s.license  = 'Apache 2.0'
      s.authors  = { 'Google Inc.' => 'timburks@google.com'}
      s.homepage = 'http://github.com/GoogleCloudPlatform/ios-docs-samples'
      s.source   = { :git => 'https://github.com/GoogleCloudPlatform/ios-docs-samples.git',
                     :tag => '0.0.1' }
      s.summary  = 'Service definitions for Google Cloud Platform APIs'

      s.ios.deployment_target = '7.1'
      s.osx.deployment_target = '10.9'

     # Run protoc with the Objective-C and gRPC plugins to generate protocol messages and gRPC clients.
      s.dependency "!ProtoCompiler-gRPCPlugin", "~> 1.6"

      # Pods directory corresponding to this app's Podfile, relative to the location of this podspec.
      pods_root = 'Pods'

      # Path where Cocoapods downloads protoc and the gRPC plugin.
      protoc_dir = "#{pods_root}/!ProtoCompiler"
      protoc = "#{protoc_dir}/protoc"
      plugin = "#{pods_root}/!ProtoCompiler-gRPCPlugin/grpc_objective_c_plugin"

      # Run protoc with the Objective-C and gRPC plugins to generate protocol messages and gRPC clients.
      # You can run this command manually if you later change your protos and need to regenerate.

      # The --objc_out plugin generates a pair of .pbobjc.h/.pbobjc.m files for each .proto file.
      s.subspec "Messages" do |ms|
        ms.source_files = "google/**/*.pbobjc.{h,m}"
        ms.header_mappings_dir = "."
        ms.requires_arc = false
        ms.dependency "Protobuf"
      end

      # The --objcgrpc_out plugin generates a pair of .pbrpc.h/.pbrpc.m files for each .proto file with
      # a service defined.
      s.subspec "Services" do |ss|
        ss.source_files = "google/**/*.pbrpc.{h,m}"
        ss.header_mappings_dir = "."
        ss.requires_arc = true
        ss.dependency "gRPC-ProtoRPC"
        ss.dependency "#{s.name}/Messages"
      end

      s.pod_target_xcconfig = {
        'GCC_PREPROCESSOR_DEFINITIONS' => '$(inherited) GPB_USE_PROTOBUF_FRAMEWORK_IMPORTS=1',
	      'USER_HEADER_SEARCH_PATHS' => '$SRCROOT/..'
      }

    end
    ```

8. 在 Podfile 文件中，添加 ZegoRealtimeTranslation SDK 的第三方依赖。然后在终端 cd 到项目的根目录，并使用 pod install 命令，安装依赖库。由于 google 语音识别的依赖库较大，下载安装容易失败，请确保网络环境良好，最好是安装代理。

    ```ruby
    pod 'ZegoExpressEngine/Video'
    # sdk依赖库
    pod 'SocketRocket', '~> 0.6.0'
    pod 'OpenSSL-Universal', '~> 1.0.1.20'
    pod 'MicrosoftCognitiveServicesSpeech-iOS', '~> 1.20'
    pod 'MJExtension', '~> 3.4.1'
    pod 'googleapis', :path => '.'
    pod 'AFNetworking', '~> 4.0.1'
    pod 'GZIP', '~> 1.3.0'
    ```
9. 在 “Pods > TARGETS” 中，找到 gRPC-gRPCCertificates 修改成自己证书和签名。
<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/iOS/RealtimeTranslation/grpc_gRPCCertificates.jpg" /></Frame>

## 常见问题

1. **如果您的项目集成其他使用 gRPC 框架的 SDK（如 Firebase Cloud Firestore SDK）时遇到下图所示的问题，您该如何处理？**

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/realtimetranslation/Conflicts.jpg" /></Frame>

    您可以通过以下任意方式解决此问题：
    - **方法 1：**
      打开位于项目根目录的 googleapis.podspec 文件，找到 `s.dependency "!ProtoCompiler-gRPCPlugin",` 和 `ss.dependency "gRPC-ProtoRPC"`，分别指定版本号，以保证与所需 SDK 使用的 gRPC 版本保持一致。

        <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/realtimetranslation/gRPCversion.jpeg" /></Frame>

    - **方法 2：**
      若因为 `gRPC-Proto` 的版本无法匹配到您所需 SDK 使用的 gRPC 版本，请升级/降级您需要的 SDK，以便保证该 SDK 使用的 gRPC 版本与您的 `gRPC-proto` 版本保持一致。
