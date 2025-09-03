# 示例源码运行指引


## 准备环境

在运行示例源码前，请确保开发环境满足以下要求：

- HBuilderX 3.0.0 或以上版本。
- App:
    - 准备 iOS / Android 设备，版本要求如下：
        - iOS 12.0 或以上版本且支持音视频的 iOS 设备。
        - Android 4.4 或以上版本且支持音视频的 Android 设备。
    - iOS / Android 设备已经连接到 Internet。
- Web:
    - 准备一台可以连接到互联网的 Windows 或 macOS 计算机。
    - 使用最新版本的 Chrome 浏览器。

## 前提条件

已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppID、AppSign 或 Token，详情请参考 [控制台 - 项目管理](/console/project-info) 中的“项目信息”。

<Warning title="注意">
- 如果您是基于 iOS、Android 原生平台开发，可以通过 AppSign 或 Token 鉴权。建议您使用 AppSign 鉴权，接入方式更简单。
- 如果您是基于 Web 平台开发，则必须使用 Token 鉴权。
- 如果您选择使用 Token 鉴权，Token 的获取方式请参考 [使用 Token 鉴权](https://doc-zh.zego.im/article/13117)。
</Warning>

## 获取示例源码

<Card title="示例源码" href="https://artifact-demo.zego.im/express/example/uniapp/ZegoExpressExample-UniApp.zip">
本地下载
</Card>

## 示例源码目录结构

下列结构为工程目录的文件结构，下文所涉及的文件路径均为相对于此目录的路径。

```tree
.
├── App.vue
├── common
│   ├── uni-nvue.css          # uni 定义的 css样式
│   └── zego-nvue.css         # zego 定义的 css 样式
├── components
│   ├── uni-list
│   │   └── uni-list.vue
│   ├── uni-list-item
│   │   └── uni-list-item.vue
│   ├── uni-section
│   │   └── uni-section.vue
│   ├── uni-segmented-control
│   │   └── uni-segmented-control.vue
│   └── zego-ZegoExpressUniApp-JS        # zego uniapp sdk js 封装层
│       ├── lib                          # js 库文件
│       └── zego-view                    # 原生渲染 view
├── main.js
├── manifest.json
├── nativeplugins
│   └── zego-ZegoExpressUniAppSDK        # 本地依赖的 zego 原生插件
│       ├── android
│       ├── ios
│       └── package.json
├── package.json
├── pages                                # demo 源码
│   ├── KeyCenter.js                     # 在里面的 KeyCenter.java 文件中填写申请的 AppID、AppSign、Token
│   ├── example
│   │   ├── advance-stream               # 推拉流进阶
│   │   ├── advance-video                # 视频进阶
│   │   ├── common-feature               # 通用功能
│   │   ├── other                        # 其他功能
│   │   ├── quick-start                  # 快速开始
│   │   ├── scenes                       # 场景方案
│   │   └── setting                      # 设置与调试
│   ├── index
│   │   └── index.vue
│   └── permission.js
├── pages.json                           # 显示的所有页面
├── static                               # 资源文件
│   ├── SampleVideo_1280x720_5mb.mp4
│   └── logo.png
├── uni.scss
└── unpackage                            # uniapp 打包生成的文件
```

## 运行示例代码

1. 使用 HBuilder X 工具打开示例工程。

2. 示例源码中缺少 SDK 初始化所需的 AppID、AppSign 或 Token，需要修改 “pages/KeyCenter.js” 文件，请使用本文 [前提条件](https://doc-zh.zego.im/article/8787#1_2) 已获取的 AppID、AppSign 或 Token 正确填写，否则示例源码无法正常运行。

    - 如果您是基于 iOS、Android 原生平台开发，选择了 AppSign 鉴权，将 Token 传空即可。
    - 如果您选择使用 Token 鉴权，将 AppSign 传空即可。

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/QuickStart/sample_code/sample_code_uniapp_new.jpeg" /></Frame>

3. 找到项目目录下的 manifest.json 文件，修改 “uni-app” 应用标识。

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Express/uniapp_manifest.png" /></Frame>

4. 在项目中导入插件，具体操作请参考 [在 uni-app 项目中导入插件](https://doc-zh.zego.im/article/7774#2_3)。

5. 运行代码。

<Accordion title="运行到 Web 浏览器" defaultOpen="false">
<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/run_uniapp_1.png" /></Frame>
</Accordion>


<Accordion title="运行到手机或模拟器" defaultOpen="false">
### 制作 App 自定义调试基座

<Note title="说明">
uni-app 官方使用教程请参考 [什么是自定义调试基座及使用说明](https://ask.dcloud.net.cn/article/35115)。
</Note>



1. 选择 “运行 > 运行到手机或模拟器 > 制作自定义调试基座” 菜单。

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/QuickStart/Customize_uniapp.png" /></Frame>

2. 在弹出的界面中，按照 uni-app 教程，填写相关信息，并点击 “打包” 进行云打包。

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/QuickStart/Unpack_uniapp.png" /></Frame>

打包成功后，控制台会收到 uni-app 的相关提示。

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/QuickStart/Packaged_successfully_uniapp.png" /></Frame>

### 切换运行基座为自定义调试基座

在自定义调试基座选择 “运行 > 运行到手机或模拟器 > 运行基座选择 > 自定义调试基座” 菜单。

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/QuickStart/run_uniapp.png" /></Frame>

### 运行

选择 “运行 > 运行到手机或模拟器” 菜单，并选择自己的设备，并运行。
</Accordion>

## 体验实时音视频功能

在真机中运行项目，运行成功后，可以看到本端视频画面。

为方便体验，ZEGO 提供了一个 [Web 端调试示例](https://zegodev.github.io/zego-express-webrtc-sample/assistDev/index.html)，在该页面下，输入相同的 AppID、RoomID，输入不同的 UserID、以及对应的 [Token](/console/development-assistance/temporary-token)，即可加入同一房间与真机设备互通。当成功开始音视频通话时，可以听到远端的音频，看到远端的视频画面。



## 常见问题

[在 Windows 平台上集成 Express uni-app SDK 后，使用 dev 证书云打包运行 iOS 应用时出错，该如何处理？](https://doc-zh.zego.im/faq/RTC_uniapp_packing_within_Windows?product=ExpressVideo&platform=uni-app)
