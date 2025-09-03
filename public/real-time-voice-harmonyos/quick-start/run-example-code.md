# 示例源码运行指引

本文介绍如何快速跑通示例源码，体验基础的音视频通话服务。

## 准备环境

在开始集成 ZEGO Express SDK 前，请确保开发环境满足以下要求（以下说明皆以 Windows 开发电脑为例）：

- **已联系华为商务人员，签署合作计划，开通相关权限**，获取 DevEco Studio 5.0.0 Release 或以上版本。
- 获取配套 [API Version 12 Release](https://developer.huawei.com/consumer/cn/doc/harmonyos-references-V5/development-intro-api-V5?catalogVersion=V5) 的 HarmonyOS 5.0.0 Release SDK 或以上版本。
- 获取配套 [API Version 12 Release](https://developer.huawei.com/consumer/cn/doc/harmonyos-references-V5/development-intro-api-V5?catalogVersion=V5) 的 HarmonyOS 5.0.0 Release 操作系统或以上版本，支持音视频的鸿蒙设备，且已开启“允许调试”选项。
- 鸿蒙设备、Windows 开发电脑已经连接到 Internet。

<Note title="说明">


- 首次编译示例源码时，如果没有对应的依赖库或者构建工具，DevEco Studio 会自动下载示例源码，可能需要较长时间，请耐心等待。
- 建议直接使用 [鸿蒙官网](https://developer.huawei.com/consumer/cn/) 配套的 SDK 及相关工具链开发套件，并给 DevEco Studio 配置本地的 SDK 环境。

</Note>



## 前提条件

已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppID 和 AppSign，详情请参考 [控制台 - 项目管理](/console/project-info) 中的“项目信息”。

## 获取示例源码
<Card title="示例源码" href="https://artifact-demo.zego.im/express/example/video/ohos_ets/ZegoExpressDemo_ohos_ets.zip" target="_blank">
本地下载
</Card>
## 运行示例源码

1. 在开发电脑中找到 DevEco Studio 软件图标。
   <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/HarmonyOS/ExpressSDK/SampleRunningGuide/open_deveco_studio.png" /></Frame>

  <Accordion title="在开发电脑上安装 DevEco Studio 的方式" defaultOpen="false">
- 方式：登录 [DevEco Studio 官网](https://developer.harmonyos.com/deveco-developer-suite/enabling/kit?currentPage=1&pageSize=100) 下载并安装最新版本 DevEco Studio 及其相关的 SDK Tools。
</Accordion>

2. 打开 DevEco Studio，单击 “Open Project”。

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Express/HarmonyOS_ArkTS/sample_code/open_deveco_studio_win.png" /></Frame>

3. 在解压后的示例源码文件夹中，选择 `ZegoExpressOHOSDemo` 文件夹打开。

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Express/HarmonyOS_ArkTS/sample_code/open_demo_project.png" /></Frame>

4. 找到 “ZegoExpressOHOSDemo\ZegoExpressOHOSExample\src\main\ets\pages\” 目录下的 “KeyCenter.ets” 文件，填写 SDK 初始化所需的 appID 和 appSign 等信息。


<Warning title="注意">

  请使用本文 [前提条件](#前提条件) 已获取的 AppID 和 AppSign 正确填写，否则示例源码无法正常运行。

</Warning>



    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Express/HarmonyOS_ArkTS/sample_code/keycenter_enter.png" /></Frame>

5. 将鸿蒙设备连接到开发电脑，当该设备成功开启“开发者模式”和“USB 调试”功能后，可以看到 DevEco Studio 上方的 “Running Devices” 选项框由下图：

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Express/HarmonyOS_ArkTS/sample_code/deveco_no_device.png" /></Frame>

    变为下图：

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Express/HarmonyOS_ArkTS/sample_code/deveco_device_list.png" /></Frame>

    即 DevEco Studio 已成功连接到鸿蒙设备，可以将示例源码运行到该设备上了。

<Note title="说明">


    - 当开发电脑连接鸿蒙设备后，大部分设备会弹出提示，不同厂商的提示信息有所不同，可根据情况选择 USB 模式。
    - 当鸿蒙设备连接开发电脑后，需要根据情况在该设备上开启开发者模式和 USB 调试功能（不同厂商的设备开启方式不同）。具体开启方式开发者可以需要自行搜索引擎搜索，例如：目前存在一台未开启过开发者模式与 USB 调试功能的某设备，可以在搜索引擎搜索“某设备开启开发者模式”，查看具体的开启教程。

</Note>



6. 单击 “Run” 按钮，编译并运行示例源码。

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Express/HarmonyOS_ArkTS/sample_code/deveco_device_run.png" /></Frame>

## 体验实时音视频功能

在真机中运行项目，运行成功后，可以看到本端视频画面。

为方便体验，ZEGO 提供了一个 [Web 端调试示例](https://zegodev.github.io/zego-express-webrtc-sample/assistDev/index.html)，在该页面下，输入相同的 AppID、RoomID，输入不同的 UserID、以及对应的 [Token](/console/development-assistance/temporary-token)，即可加入同一房间与真机设备互通。当成功开始音视频通话时，可以听到远端的音频，看到远端的视频画面。


## 常见问题

1. **DevEco Studio 运行下载的示例源码时有如下报错，该如何处理？**

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Express/HarmonyOS_ArkTS/sample_code/deveco_no_sign_error.png" /></Frame>

    由于下载的示例源码中，AppID 和 AppSign 没有具体的值，请参考本文 “[运行示例源码](https://doc-zh.zego.im/article/19522#1_3)” 章节中的步骤 4 进行处理。

<Content />

