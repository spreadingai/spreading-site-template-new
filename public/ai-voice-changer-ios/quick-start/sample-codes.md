# 跑通示例源码

- - -

<Note title="说明">请联系 ZEGO 商务人员，获取最新的 `大饼 AI 变声` 示例源码包，并开通相关权限，然后参考本文档跑通源码，体验 AI 变声效果。 </Note>

## 准备环境

在运行示例源码前，请确保开发环境满足以下要求：

* Xcode 15.0 或以上版本。
* iOS 12.0 或以上版本且支持音视频的 iOS 真机设备。
* iOS 设备已经连接到 Internet。

## 前提条件

- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppID 和 AppSign，详情请参考 [控制台 - 项目管理](/console/project-info) 中的“项目信息”。
- 已参考 [控制台 - 云市场 - 大饼 AI 变声](/console/cloud-market/dabing-ai-voice-changer)，按照页面指引，自助开通 `大饼 AI 变声` 相关权限。

## 示例源码目录结构

下面目录结构为 ios_objc 子目录的文件结构，下文所涉及的文件路径均为相对于此目录的路径。

```bash
.
├─ DownloadSDK.sh
├─ Libs # ZegoExpressVideo iOS SDK 存放目录
├─ README.md
├─ README_zh.md
├─ VERSION.txt
├─ ZegoExpressExample
|    ...
│    ├─ Examples
│    │    ├─ AdvancedAudioProcessing   # 音频进阶功能
│    │    ├─ AdvancedStreaming         # 推流、拉流进阶功能
│    │    ├─ AdvancedVideoProcessing   # 视频进阶功能
│    │    ├─ CommonFeatures            # 常用功能
│    │    ├─ Debug&Config              # 测试与配置
│    │    ├─ Others                    # 其他功能
│    │    ├─ QuickStart                # 快速开始
│    │    └─ Scenes                    # 最佳实践
|    ...
│    ├─ Info.plist
│    ├─ KeyCenter.h
│    ├─ KeyCenter.m # 填写申请的 AppID 和 AppSign
│    ...
└─ ZegoExpressExample.xcodeproj  # demo 的工程文件
```

## 运行示例源码

1. 打开 “AppStore”，搜索 “Xcode” 并下载安装。
   <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/iOS/ZegoExpressEngine/Common/appstore-xcode.png" /></Frame>

2. 使用 Xcode 打开 “ZegoExpressExample.xcodeproj” 文件。

    1. 打开 Xcode，选择左上角的菜单 “File > Open...”。
   <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/iOS/ZegoExpressEngine/Common/xcode-open-file.png" /></Frame>

    2. 在解压后的示例源码文件夹中，找到 “ZegoExpressExample.xcodeproj” 文件打开。

3. 登录 Apple 开发者账号。

    1. 打开 Xcode，选择左上角的菜单 “Xcode > Preferences...”。
    <Frame width="512" height="auto" caption="">
    <img src="https://doc-media.zego.im/sdk-doc/Pics/iOS/ZegoExpressEngine/Common/xcode_preferences.png" />
    </Frame>

    2. 单击 “Accounts” 选项卡，单击左下角的 “+”，选择添加 “Apple ID”，单击 “Continue”。
   <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/iOS/ZegoExpressEngine/Common/xcode-account.png" /></Frame>

    3. 输入 Apple ID 和 Password 登录。
   <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/iOS/ZegoExpressEngine/Common/xcode-login-apple-id.png" /></Frame>

4. 修改 Bundle Identifier 和开发者证书。

    1. 打开 Xcode，单击左侧的 “ZegoExpressExample” 项目。
   <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/iOS/ZegoExpressEngine/Common/xcode_select_project_new.png" /></Frame>

    2. 打开 TARGETS 选项，开发者可以根据需求，单击 “General” 选项卡，修改项目的 Bundle Identifier。
    <Frame width="512" height="auto" caption="">
    <img src="https://doc-media.zego.im/sdk-doc/Pics/iOS/ZegoExpressEngine/Common/bundle_id.png" />
    </Frame>
    单击 “Signing & Capabilities” 选项卡，选择自己的开发者证书。
    <Frame width="512" height="auto" caption="">
    <img src="https://doc-media.zego.im/sdk-doc/Pics/iOS/ZegoExpressEngine/Common/team_signing_new.png" />
    </Frame>

5. 修改 “/ZegoExpressExample/KeyCenter.m” 文件，填写 SDK 初始化所需的 “AppID” 和 “AppSign”。

    <Warning title="注意">请使用本文 [前提条件](#前提条件) 已获取的 AppID 和 AppSign 正确填写，否则示例源码无法正常运行。 </Warning>

    <Frame width="512" height="auto" caption="">
    <img src="https://doc-media.zego.im/sdk-doc/Pics/QuickStart/sample_code/sample_code_ios.png" />
    </Frame>

6. 将 iOS 设备连接到开发电脑，单击 Xcode 上方的的 “Any iOS Device”。
    <Frame width="512" height="auto" caption="">
    <img src="https://doc-media.zego.im/sdk-doc/Pics/iOS/ZegoExpressEngine/Common/xcode_select_device_new.png" />
    </Frame>
    在弹出的选项框选择该 iOS 设备（或者模拟器）。
    <Frame width="512" height="auto" caption="">
    <img src="https://doc-media.zego.im/sdk-doc/Pics/iOS/ZegoExpressEngine/Common/xcode_select_real_device_new.png" />
    </Frame>

7. 单击 Xcode 左上角的 “Build” 按钮编译和运行示例源码。
    <Frame width="512" height="auto" caption="">
    <img src="https://doc-media.zego.im/sdk-doc/Pics/iOS/ZegoExpressEngine/Common/build_and_run_new.png" />
    </Frame>
