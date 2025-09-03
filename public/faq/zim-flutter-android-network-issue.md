<Title>使用 ZIM SDK，在 Flutter 框架下打包 release 版本的 Android apk 包，在真机设备上安装后，无法请求网络，该怎么处理？</Title>



- - -

## 问题原因

在 Android 平台上开发 Flutter应用时，没有申请网络权限，SDK 基本功能都需要在联网的情况下才可以使用。

## 解决方案

请参考以下步骤处理：

1. 进入 “app/src/main” 目录，打开 “AndroidManifest.xml” 文件，在 `<manifest></manifest>` 标签下，添加如下权限。

    **请注意，不要放到 `<application></application>` 标签中。**

    ```java
    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
    <uses-permission android:name="android.permission.ACCESS_WIFI_STATE" />
    ```

    <Frame width="512" height="auto" caption=""><Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/ZIM/flutter/Flutter_Android_apk.png" /></Frame></Frame>

2. 重新运行打包，真机安装，即可正常请求网络。
