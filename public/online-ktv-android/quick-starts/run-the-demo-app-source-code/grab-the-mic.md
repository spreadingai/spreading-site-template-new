# 抢唱体验 App

- - -

<Warning title="注意">
- 该源码仅供开发者接入时参考，ZEGO 不负责源码的后续维护。若开发者计划将该源码用于生产环境，请确保发布前进行充分测试，避免发生潜在问题造成损失。
- 该源码中提供的业务后台地址仅用于跑通示例源码，如果您需要上线正式产品，请自行编写、搭建自己的业务后台。
- 开发者的 AppID 在使用 GoEnjoy 和 GoClass 中的任一功能时，有效期均为 30 天。如需继续使用相关服务，请自行搭建您的业务后台，或更换 AppID 使用。
- 更多相关源码，请参考 [CodeStore](https://codestore.zego.im/)。
</Warning>

源码为 Android 客户端体验 App 源码。下文介绍如何运行体验 App 源码。

## 准备环境

在运行体验 App 源码前，请确保开发环境满足以下要求（以下说明以 macOS 开发电脑为例）：

- Android Studio Arctic Fox (2020.3.1) 或以上版本。
- 已经下载 Android SDK 30 和 Android SDK Platform-Tools 30。
- 建议使用 Android 9.0 或以上版本，且支持音视频的 Android 设备（仅支持真机），并开启“允许调试”选项。
- Android 设备、macOS 开发电脑已经连接到 Internet。


## 前提条件

- 已在 [ZEGO 控制台](https://console.zego.im/) 创建项目，并申请有效的 AppID，详情请参考 [控制台 - 项目管理 - 项目信息](/console/project-info)。
- 已在 [ZEGO 控制台](https://console.zego.im) 开通即时通讯服务，详情请参考控制台的 [服务配置 - 即时通讯 - 开通服务](/console/service-configuration/im/activate-service)。
- 已联系 ZEGO 技术支持开通版权音乐服务。

## 获取源码

<Card title="示例源码" href="https://codestore.zego.im/project/18">点击获得完整代码。</Card>

通过以上卡片获取源码压缩包后，将其解压获取源码文件夹。

## 运行体验 App 源码

1. 从本文档开头下载源码，在本地解压缩后，得到 “GoKTVGrab_Android_Sourcecode” 文件夹。

2. 在开发电脑中找到 Android Studio 软件图标。

    <Frame width="128" height="auto">
      <img src="https://doc-media.zego.im/sdk-doc/Pics/GoEnjoy/online_KTV/SampleCodes/AS_icon.png" alt="AS_icon.png"/>
    </Frame>

3. 打开 Android Studio，单击 “Open”。   

    <Frame width="512" height="auto" ><img src="https://doc-media.zego.im/sdk-doc/Pics/GoEnjoy/online_KTV/SampleCodes/AS_Welcome_Interface.png" alt="AS_Welcome_Interface.png"/></Frame>

4. 选择并打开 “GoKTVGrab_Android_Sourcecode”。

    <Frame width="512" height="auto" ><img src="https://doc-media.zego.im/sdk-doc/Pics/GoEnjoy/KTVGrab/Android/Android_SourceCode.png" alt="Android_SourceCode.png"/></Frame>

5. 下载的源码中缺少 SDK 初始化所需的 APP_ID 和 APP_SIGN。   

    按照路径 `grab/src/main/java/im/zego/ktv/grab`，找到 `KeyCenter.java` 文件。   
    请使用本文 [前提条件](/online-ktv-android/quick-starts/run-the-demo-app-source-code/grab-the-mic#前提条件) 已获取的 AppID 和 AppSign 正确填写，否则体验 App 源码无法正常运行。

    ```java
    /**
     * 请注意，本 demo 代码采用 APP_SIGN 鉴权，如果您需要更安全的鉴权方式，可以自行切换为 Token 鉴权
     */
    public class KeyCenter {
        // 请将您从 ZEGO 控制台（https://console.zego.im/）申请到的 APP_ID 填写在下方
        // 建议在 AppID 数字后面添加大写的 L，避免编译错误
        public static final long APP_ID = YOUR_APP_ID;

        // 请参考 /console/project-info 文档，获取您项目 APP_ID 对应的 APP_SIGN（长度为 64 位的字符串）
        // 并正确填写在下方，否则 demo 无法正常运行
        public static final String APP_SIGN = YOUR_APP_SIGN;

        // BACKEND_API_URL: 后台地址，如果访问错误请联系技术支持
        // 体验 App 源码提供的业务后台地址仅用于跑通示例源码，
        // 若您需要上线正式产品，请自行编写后台代码，同时搭建自己的业务后台
        public static final String BACKEND_API_URL = "https://demo-server-sh.imzego.com";
    }
    ```

<Warning title="注意">
- 由于体验 App 源码提供的业务后台地址对房间数量有所限制，同一个 AppID 同时创建的房间数量上限为 10。所以此后台地址仅限用于跑通体验 App 源码，请勿用于正式产品上线。
- 若您需要上线正式产品，请自行搭建业务后台。
</Warning>

6. 选择一台 Android 真机设备连接到开发电脑，当该设备成功开启“开发者模式”和“USB 调试功能”后，可以看到 Android Studio 界面已检测到该设备，如下图所示：  

    <Frame width="512" height="auto"><img src="https://doc-media.zego.im/sdk-doc/Pics/GoEnjoy/LiveShow/android_device_detected.png" /></Frame>     

    说明 Android Studio 软件已成功连接到 Android 设备，可以将源码运行到该设备上了。

7. 单击 Android Studio 软件上的 “build and run” 按钮，编译并运行源码。  

    <Frame width="512" height="auto"><img src="https://doc-media.zego.im/sdk-doc/Pics/GoEnjoy/LiveShow/android_build_and_run.png" /></Frame>


## 常见问题

**Android 示例源码运行时，如果报错 “Unrecognized option: --add-opens=java.base/java.io=ALL-UNNAMED”，该如何处理？**

<Frame width="512" height="auto">
<img src="https://doc-media.zego.im/sdk-doc/Pics/GoEnjoy/AS_ALL_UNNAMED.png" />
</Frame>

有两种解决方案：

- 升级 Android Studio 至最新版本，重新运行即可。

- 找到项目的 gradle.properties 文件，删除 `--add-opens=java.base/java.io=ALL-UNNAMED` 并保存，重新运行即可。

    <Frame width="512" height="auto">
    <img src="https://doc-media.zego.im/sdk-doc/Pics/GoEnjoy/AS_ALL_UNNAMED_delete.png" />
    </Frame>

