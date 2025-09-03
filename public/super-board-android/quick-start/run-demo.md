# 跑通示例源码
---

<Card title="示例源码" href="https://artifact-demo.zego.im/SuperBoardSDK/Android/DemoSourceCode/superboard_demo_android.zip" target="_blank">
本地下载
</Card>


<Warning title="注意">

本示例源码仅用于演示超级白板产品功能，供开发者接入时参考，ZEGO 不负责源码的后续维护。若开发者计划将该源码用于生产环境，请确保发布前进行充分测试，避免发生潜在问题造成损失。
</Warning>

## 示例源码运行指引

### 准备环境

在运行示例源码前，请确保开发环境满足以下要求：

- Android Studio 4.0 或以上版本。
- 已经下载 Android SDK 30 和 Android SDK Platform-Tools 30。
- Android 版本不低于 5.0 且支持音视频的 Android 设备或模拟器(推荐使用真机)，如果是真机，请在开发者选项中开启”允许调试”选项。
- Android 设备已经连接到 Internet。


### 前提条件

已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppID 和 AppSign，详情请参考 [控制台 - 项目管理](http://doc-zh.zego.im/article/12107) 中的“项目信息”。

<Warning title="注意">

- 使用超级白板前，请参考 [控制台 - 服务配置 - 文件共享](http://doc-zh.zego.im/article/14338) 在 [ZEGO 控制台](https://console.zego.im) 自助开通文件共享功能（或联系 ZEGO 技术支持开通相关功能权限），否则超级白板服务无法正常使用。
- `2.3.0 或以上` 版本的 SDK 支持 Token 鉴权，若您需要升级鉴权方式，可参考 [如何从 AppSign 鉴权升级为 Token 鉴权](http://doc-zh.zego.im/faq/token_upgrade?product=ExpressVideo)。

</Warning>


### 运行示例源码

1. 在开发电脑中找到 Android Studio 软件图标。

  <Frame width="512" height="auto" caption="">
    <img src="https://doc-media.zego.im/sdk-doc/Pics/Android/ZegoWhiteboardExample/image_20201203142600097.png" />
  </Frame>

2. 打开 Android Studio 软件，并单击 “Open an Existing Project”。

  <Frame width="512" height="auto" caption="">
    <img src="https://doc-media.zego.im/sdk-doc/Pics/Android/ZegoWhiteboardExample/image_20201127105738483.png" />
  </Frame>

3. 选择在本文档开头位置已下载好的示例源码并打开。

  <Frame width="512" height="auto" caption="">
    <img src="https://doc-media.zego.im/sdk-doc/Pics/Android/ZegoSuperBoard/20210823_120204.png" />
  </Frame>

4. 下载的示例源码中缺少 SDK 初始化所需的 APP_ID 和 APP_SIGN，需要修改 “KeyCenter.java” 文件。位置如下图：

  <Frame width="512" height="auto" caption="">
    <img src="https://doc-media.zego.im/sdk-doc/Pics/superboard/04.png" />
  </Frame>

    请使用本文 “[前提条件](/super-board-android/quick-start/11316#1_2)” 已获取的 AppID 和 AppSign 正确填写（**需要在 AppID 后加 L**），否则示例源码无法正常运行。

  <Frame width="512" height="auto" caption="">
    <img src="https://doc-media.zego.im/sdk-doc/Pics/superboard/05.png" />
  </Frame>


5. 选择一台已连接到 Internet 的 Android 真机设备（推荐）或模拟器，当该设备成功开启开发者模式和 USB 调试功能后，可以看到 Android Studio 变为下图，说明 Android Studio 软件已成功连接到 Android 设备，可以将示例源码运行到该设备上了。

  <Frame width="512" height="auto" caption="">
    <img src="https://doc-media.zego.im/sdk-doc/Pics/Android/ZegoWhiteboardExample/image_20210302564451783.png" />
  </Frame>


6. 单击 Android Studio 软件上的 “build and run” 按钮，编译并运行示例源码。若运行过程中出现问题，请联系 ZEGO 技术支持。

  <Frame width="512" height="auto" caption="">
    <img src="https://doc-media.zego.im/sdk-doc/Pics/Android/ZegoWhiteboardExample/image_20210302173148802.png" />
  </Frame>
