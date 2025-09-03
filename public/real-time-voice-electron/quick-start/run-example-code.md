# 示例代码运行指引


## 准备环境

请确保开发环境满足以下技术要求：

* Windows: Windows 7 或以上版本。
* macOS: macOS 11.0 或以上版本。
* Linux: 支持 x86_64、aarch64、armhf 架构的 Linux 操作系统，如需使用 Linux 平台，请联系 ZEGO 技术支持。
* 麦克风、摄像头等支持音视频外设，保证电脑联网正常。
* 已安装 [Node.js](https://nodejs.org/en/), 推荐使用其官网首页展示的长期支持版。

## 前提条件

已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppID 和 AppSign，详情请参考 [控制台 - 项目管理](/console/project-info) 中的“项目信息”。

<Warning title="注意">
SDK 同时也支持 Token 鉴权，若您需要升级鉴权方式，可参考 [如何从 AppSign 鉴权升级为 Token 鉴权](/console/project-info)。
</Warning>

## 获取示例源码
<Card title="示例源码" href="https://artifact-demo.zego.im/express/example/video/electron_js/ZegoExpressDemo_electron_js.zip" target="_blank">
本地下载
</Card>

## 运行示例代码

1. 使用 Visual Studio Code 打开示例源码。

2. 在 “/keycenter.js” 文件中，填写 SDK 初始化所需的 “AppID” 和 “AppSign”。

<Warning title="注意">


    请使用本文 [前提条件](https://doc-zh.zego.im/article/13203#1_2) 已获取的 AppID 和 AppSign 正确填写，否则示例源码无法正常运行。

</Warning>



    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/QuickStart/sample_code/sample_code_electron.png" /></Frame>

3. 安装依赖并启动

<Warning title="注意">


    在执行 `npm install` 安装 SDK 时，如果出现了 npm 官网镜像下载慢的情况，可将其切换至国内镜像:`npm set registry http://registry.npmmirror.com`。

</Warning>



    ```bash
    $ npm install
    $ npm run start
    ```


## 体验实时音视频功能

在真机中运行项目，运行成功后，可以看到本端视频画面。

为方便体验，ZEGO 提供了一个 [Web 端调试示例](https://zegodev.github.io/zego-express-webrtc-sample/assistDev/index.html)，在该页面下，输入相同的 AppID、RoomID，输入不同的 UserID、以及对应的 [Token](/console/development-assistance/temporary-token)，即可加入同一房间与真机设备互通。当成功开始音视频通话时，可以听到远端的音频，看到远端的视频画面。


<Content />
