
# 跑通示例源码

---

## 准备环境

在运行示例源码前，请确保开发环境满足以下要求：

* Xcode 7.0 或以上版本。
* iOS 13.0 或以上版本且支持音视频的 iOS 设备或模拟器（推荐使用真机）。
* iOS 设备已经连接到 Internet。

## 前提条件

- 已在 [下载](/ai-effects-ios-objc/downloads) 页面，获取最新版本的 SDK 和示例源码。
- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，获取到了接入 ZegoEffects SDK 服务所需的 AppID 和 AppSign，详情请参考 [控制台 - 项目管理](https://doc-zh.zego.im/article/12107) 中的“项目信息”。
- 已联系 ZEGO 技术支持，开通 ZegoEffects 相关套餐服务权限。

## 运行示例源码

<Steps>
<Step title="安装 Xcode">
打开 "AppStore"，搜索 "Xcode" 并下载安装。
<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/iOS/ZegoExpressEngine/Common/appstore-xcode.png" /></Frame>
</Step>
<Step title="打开示例项目">
1. 打开 Xcode，选择左上角的菜单 "File > Open..."。
<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/iOS/ZegoExpressEngine/Common/xcode-open-file.png" /></Frame>
2. 在解压后的示例源码文件夹中选择 "ZegoEffectsExample.xcworkspace" 文件，并单击 "Open" 打开。
<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/ZegoEffects/Apple/effects_xcode_select_file.png" /></Frame>
</Step>
<Step title="登录开发者账号">
1. 打开 Xcode，选择左上角的菜单 "Xcode > Preferences..."。
2. 单击 "Accounts" 选项卡，单击左下角的 "+"，选择添加 "Apple ID" ，单击 "Continue"。
<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/iOS/ZegoExpressEngine/Common/xcode-account.png" /></Frame>
3. 输入 Apple ID 和 Password 登录。
<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/iOS/ZegoExpressEngine/Common/xcode-login-apple-id.png" /></Frame>
</Step>
<Step title="配置项目设置">
1. 打开 Xcode，单击左侧的 "ZegoEffectsExample" 项目。
<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/ZegoEffects/Apple/effects_xcode_select_project.png" /></Frame>
2. 选择 "TARGETS" 为 `ZegoEffectsExampleLegacy`，单击 "Signing & Capabilities" 选项卡，在 "Team" 中选择自己的开发者证书。
<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/ZegoEffects/Apple/effects_team_signing.png" /></Frame>
3. 在上图中找到 Bundle Identifier 选项，填入与自己开发者证书对应的包名。
</Step>
<Step title="添加 SDK 资源">
1. 将 [下载](/ai-effects-ios-objc/downloads) 后的 SDK 目录下的 "ZegoEffects.xcframework" 文件夹，拷贝或替换到 "Example > Libs" 路径下。
2. 将根目录下的 "Models"，"Resources" 两个文件夹，拷贝或替换到 "Example > Resources" 路径下。
</Step>
<Step title="配置鉴权信息">
下载的示例源码中缺少 SDK 初始化所需的鉴权信息（AppID、AppSign），需要修改 "ZegoEffectsExampleLegacy" 目录下的 "ZegoLicense.m" 文件。请使用本文 [2 前提条件](/ai-effects-ios-objc/quick-starts/9566#2) 所获取到的信息正确填写，否则源码无法正常运行。
<Warning>
此处需要填写鉴权文件，SDK 校验通过才可以正常使用 SDK 的功能。ZEGO 建议开发者定时更新、拉取鉴权数据，防止鉴权文件过期，导致 SDK 校验不通过的问题。
</Warning>
<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/ZegoEffects/Apple/effects_enter_license_objc.png" /></Frame>
</Step>
<Step title="选择运行设备">
将 iOS 设备连接到开发电脑，单击 Xcode 左上角的 "Generic iOS Device" 选择该 iOS 设备（或者模拟器）。
<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/ZegoEffects/Apple/effects_select_device.png" /></Frame>
</Step>
<Step title="运行项目">
单击 Xcode 左上角的 "Build" 按钮编译和运行示例源码。
<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/ZegoEffects/Apple/effects_build_and_run.png" /></Frame>
</Step>
</Steps>
