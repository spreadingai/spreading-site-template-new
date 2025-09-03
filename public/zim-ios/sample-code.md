- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，获取到了接入 ZIM SDK 服务所需的 AppID、AppSign。ZIM 服务权限不是默认开启的，使用前，请先在 [ZEGO 控制台](https://console.zego.im) 自助开通 ZIM 服务（详情请参考控制台文档 [项目管理 - 即时通讯](https://doc-zh.zego.im/article/14994)），若无法开通 ZIM 服务，请联系 ZEGO 技术支持开通。
<Warning title="注意">

`2.3.0 及以上`版本的 SDK，开始支持 “AppSign 鉴权”，同时仍支持 “Token 鉴权”，若您需要升级鉴权方式，可参考 [ZIM 如何从 AppSign 鉴权升级为 Token 鉴权](http://doc-zh.zego.im/faq/token_upgrade_zim)。
</Warning>
本文介绍如何快速跑通示例源码，体验即时通讯服务。
# 跑通示例源码

---

<Card title="示例源码" href="https://artifact-demo.zego.im/zim/example/ios/ZIMExampleLegacy.zip" target="_blank">点击获得完整代码。</Card>

## 概览

本文介绍如何快速跑通示例源码，体验即时通讯服务。

## 准备环境

在运行示例源码前，请确保开发环境满足以下要求：

* Xcode 7.0 或以上版本。
* CocoaPods 1.9.0 或以上版本。
* iOS 11.0 或以上版本且支持音视频的 iOS 设备或模拟器（推荐使用真机）。
* iOS 设备已经连接到 Internet。

## 前提条件

<Content />
* 已拥有 Apple 开发者账号。
<Content1 />


## 示例源码目录结构

下列结构为 IM 源码文件的子目录结构，下文所涉及的文件路径均为相对于此目录的路径。

```bash
...
├── ZIMExampleDemo
│   ├── AppDelegate.h
│   ├── AppDelegate.mm
│   ├── Assets.xcassets
│   ├── Base.lproj
│   ├── CallInvite          # 呼叫邀请模块相关代码
│   ├── ConversationList     # 会话列表模块相关代码
│   ├── Group               # 群组模块相关代码
│   ├── GroupList           # 群组列表模块相关代码
│   ├── Info.plist
│   ├── Login                # 登录相关代码
│   ├── Peer                 # 单聊模块相关代码
│   ├── Room                 # 房间模块相关代码
│   ├── StartViewController.h
│   ├── StartViewController.m
│   ├── User                 # 用户模块相关代码
│   ├── VideoPlayer.xib
│   ├── ZIMExampleDemo.entitlements
│   ├── ZIMManager           # ZIM 单例
│   │   ├── KeyCenter
│   │   │   ├── KeyCenter.h
│   │   │   └── KeyCenter.m  # 填写 AppID 和 AppSign
│   │   ├── ...
│   ├── en.lproj
│   ├── main.m
│   └── zh-Hans.lproj
├── ZIMExampleDemo.xcodeproj
│   ├── project.pbxproj
│   ├── project.xcworkspace
│   ├── xcshareddata
│   └── xcuserdata
├── ZIMExampleDemo.xcworkspace
│   ├── contents.xcworkspacedata
│   ├── xcshareddata
│   └── xcuserdata
├── callSound.caf           # 用于自定义通知铃声的音频资源
└── libs
    ├── ZIM.xcframework     # ZIM SDK，可替换为最新版本
    └── ZPNs.xcframework    # ZPNs SDK，可替换为最新版本
```

## 运行示例源码

<Steps>
<Step>
打开 “AppStore”，搜索 “Xcode” 并下载安装。
<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/iOS/ZegoExpressEngine/Common/appstore-xcode.png" /></Frame>
</Step>
<Step>
使用 Xcode 打开 “ZIMExampleDemo.xcworkspace” 文件。
  <Steps>
    <Step >
      打开 Xcode，选择左上角的菜单 “File > Open...”。
      <Frame width="512" height="auto" caption="">
        <img src="https://doc-media.zego.im/sdk-doc/Pics/iOS/ZegoExpressEngine/Common/xcode-open-file.png" />
      </Frame>
    </Step>
    <Step >
      在解压后的示例源码文件夹中，找到 “ZIMExampleDemo.xcworkspace” 文件打开。
    </Step>
  </Steps>
</Step>
<Step>
登录 Apple 开发者账号。

  <Steps>
    <Step >
      打开 Xcode，选择左上角的菜单 “Xcode > Preferences...”。
      <Frame width="512" height="auto" caption="">
        <img src="https://doc-media.zego.im/sdk-doc/Pics/ZIM/iOS/xcode_preferences.png" />
      </Frame>
    </Step>
    <Step >
      单击 “Accounts” 选项卡，单击左下角的 “+”，选择添加 “Apple ID”，单击 “Continue”。
      <Frame width="512" height="auto" caption="">
        <img src="https://doc-media.zego.im/sdk-doc/Pics/iOS/ZegoExpressEngine/Common/xcode-account.png" />
      </Frame>
    </Step>
    <Step >
      输入 Apple ID 和 Password 登录。
      <Frame width="512" height="auto" caption="">
        <img src="https://doc-media.zego.im/sdk-doc/Pics/iOS/ZegoExpressEngine/Common/xcode-login-apple-id.png" />
      </Frame>
    </Step>
  </Steps>
</Step>
<Step>
修改 Bundle Identifier 和开发者证书。
  <Steps>
    <Step >
      打开 Xcode，单击左侧的 “ZIMExampleDemo” 项目。
      <Frame width="512" height="auto" caption="">
        <img src="https://doc-media.zego.im/sdk-doc/Pics/ZIM/iOS/xcode_select_project_new.png" />
      </Frame>
    </Step>
    <Step >
      打开 TARGETS 选项，单击 “Signing & Capabilities” 选项卡，修改项目的 Bundle Identifier，选择自己的开发者证书。
      <Frame width="512" height="auto" caption="">
        <img src="https://doc-media.zego.im/sdk-doc/Pics/ZIM/iOS/team_signing_new.png" />
      </Frame>
    </Step>
  </Steps>
</Step>
<Step>
下载的示例源码中缺少 SDK 初始化所需的 AppID 和 AppSign，需要修改 “/ZIMExampleDemo/ZIMExampleDemo/ZIMManager/KeyCenter/KeyCenter.m” 文件，请使用本文 [前提条件](/zim-ios/sample-code#前提条件) 已获取的 AppID 和 AppSign 正确填写，否则示例源码无法正常运行。

<Frame width="512" height="auto" caption="">
  <img src="https://doc-media.zego.im/sdk-doc/Pics/ZIM/iOS/iOS_KeyCenter.jpg" />
</Frame>

<Note title="说明">
  若您希望体验 “Token 鉴权”，步骤如下：
  1. 在 [ZEGO 控制台](https://console.zego.im) 上申请临时 Token。
  2. 完成本文所有步骤后编译项目，获得 App（ZIMExampleDemo）。
  3. 在 Setting 中启用 Using Token 并点击 OK 保存设置。
  4. 登录房间，输入此 Token。
</Note>
</Step>
<Step>
将 iOS 设备连接到开发电脑，并在 Xcode 选择该设备。

<Frame width="512" height="auto" caption="">
  <img src="https://doc-media.zego.im/sdk-doc/Pics/ZIM/iOS/xcode_select_device.png" />
</Frame>
</Step>
<Step>
单击 Xcode 左上角的 “Build” 按钮编译和运行示例源码。
  
<Frame width="512" height="auto" caption="">
  <img src="https://doc-media.zego.im/sdk-doc/Pics/ZIM/iOS/build_and_run.png" />
</Frame>
</Step>
</Steps>
