# 示例源码运行指引


本文介绍如何快速跑通示例源码，体验基础的音视频通话服务。

## 准备环境

请确保开发环境满足以下技术要求：

* React Native 0.60 或以上版本。
* iOS 12.0 或以上版本且支持音视频的 iOS 设备或模拟器（推荐使用真机）。
* Android 版本不低于 4.4 且支持音视频的 Android 设备或模拟器（推荐使用真机），如果为真机，请开启“允许调试”选项。
* iOS/Android 设备已经连接到 Internet。
* 安装 [Node.js](https://nodejs.org/en/)，推荐使用其官网首页展示的长期支持版。

## 前提条件

已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppID 和 AppSign，详情请参考 [控制台 - 项目管理](/console/project-info) 中的“项目信息”。

<Warning title="注意">
SDK 同时也支持 Token 鉴权，若您需要升级鉴权方式，可参考 [如何从 AppSign 鉴权升级为 Token 鉴权](/console/project-info)。
</Warning>

## 获取示例源码

<Card title="示例源码" href="https://github.com/zegoim/zego-express-example-topics-reactnative" target="_blank">
GitHub下载
</Card>
## 运行示例代码

1. 使用 VS Code 工具打开工程。
2. 修改 “/App.js” 文件，填写 SDK 初始化所需的 "appID" 和 "appSign"。

<Warning title="注意">


    请使用本文 [前提条件](https://doc-zh.zego.im/article/6635#1_2) 已获取的 AppID 和 AppSign 正确填写，否则示例源码无法正常运行。

</Warning>



    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/QuickStart/sample_code/sample_code_rn.png" /></Frame>

3. 执行如下命令安装依赖，并启动。

<Warning title="注意">
    执行 `npm install` 命令安装 SDK 时，如果 npm 官网镜像下载缓慢，可执行 `npm set https://registry.npmmirror.com/` 命令将其切换至国内镜像。
</Warning>



    ```javascript
    npm install
    npx react-native run-android/npx react-native run-ios
    ```

## 体验实时音视频功能

在真机中运行项目，运行成功后，可以看到本端视频画面。

为方便体验，ZEGO 提供了一个 [Web 端调试示例](https://zegodev.github.io/zego-express-webrtc-sample/assistDev/index.html)，在该页面下，输入相同的 AppID、RoomID，输入不同的 UserID、以及对应的 [Token](/console/development-assistance/temporary-token)，即可加入同一房间与真机设备互通。当成功开始音视频通话时，可以听到远端的音频，看到远端的视频画面。

