# 集成 SDK

- - -

本文介绍如何集成 ZIM Audio SDK。

## 前提条件

在集成 ZIM Audio SDK 之前，请确保
- 开发环境满足以下要求：
    - Xcode 13 或以上版本。
    - iOS 11.0 或以上版本，且支持语音功能的 iOS 真机设备。
- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，获取到了接入 ZIM SDK 服务所需的 AppID、AppSign。ZIM 服务权限不是默认开启的，使用前，请先在 [ZEGO 控制台](https://console.zego.im) 自助开通 ZIM 服务（详情请参考控制台的 [服务配置 - 即时通讯 - 开通服务](https://doc-zh.zego.im/article/14994)），若无法开通 ZIM 服务，请联系 ZEGO 技术支持开通。
- 已集成 ZIM SDK，详情请参考 [快速开始 - 实现基本收发消息](/zim-ios/send-and-receive-messages) 的 “2 集成 SDK”。


##  导入 SDK

开发者可通过以下任意一种方式实现集成 SDK。

### 方式 1：使用 CocoaPods 自动集成

1. 安装 CocoaPods，安装时的常见问题请参考 [CocoaPods 常见问题 - 安装 CocoaPods](https://doc-zh.zego.im/article/13860#1)。

2. 打开终端，进入项目根目录，执行 `pod init` 命令创建 Podfile 文件。

3. 打开 Podfile 文件，在 “target” 下添加 `pod 'ZIMAudio'`，需要将 “MyProject” 替换为开发者的 Target 名称。

    <Warning title="注意">

    由于 SDK 为 XCFramework，只有 1.10.0 或以上版本的 CocoaPods 才能集成该 SDK。
    </Warning>

    ```ruby
    target 'MyProject' do
        use_frameworks!
        pod 'ZIMAudio'
    end
    ```

4. 执行 `pod repo update` 命令更新本地索引，确保能安装最新版本的 SDK，最新版本号请参考 [发布日志](https://doc-zh.zego.im/article/19324)。

5. 执行 `pod install` 命令安装 SDK。

    <Note title="说明">

    - 若出现 “CDN: trunk URL couldn't be downloaded” 问题，请参考 [CocoaPods 常见问题 - 连接不上 trunk CDN 的问题](https://doc-zh.zego.im/article/13860#2)。
    - 若出现 “Unable to find a specification for 'ZIMAudio'” 问题，请参考 [CocoaPods 常见问题 - 无法找到项目的问题](https://doc-zh.zego.im/article/13860#3)。
    - 若出现 “CocoaPods could not find compatible versions for pod "ZIMAudio"” 问题，请参考 [CocoaPods常见问题 - pod install 无法找到项目的问题](https://doc-zh.zego.im/article/13860#3)。
    
    </Note>

### 方式 2：复制 SDK 文件手动集成

1. 请参考 [下载 SDK](https://doc-zh.zego.im/article/11591)，下载最新版本的 SDK。

2. 将 SDK 包解压至项目目录下，例如 “libs” 文件夹下。
<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/ZIM/ZIMAudio/directory_audio.jpeg" /></Frame>

3. 选择 “TARGETS > General > Frameworks,Libraries,and Embedded Content” 菜单，添加 “ZIMAudio.xcframework”，将 “Embed” 设置为 “Embed & Sign”。
<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/ZIM/ZIMAudio/embed_and_Sign_audio.jpeg" /></Frame>


## 设置权限

ZIM Audio SDK 需要设置麦克风权限，以实现采集语音。

1. 在 Xcode 中，选择 “TARGETS > Info > Custom iOS Target Properties” 菜单。
<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/ZIM/ZIMAudio/add_property_audio.jpeg" /></Frame>

2. 单击 “+” 添加按钮，选择`Privacy - Microphone Usage Description`，添加麦克风权限。
<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/ZIM/ZIMAudio/addition_done.jpeg" /></Frame>