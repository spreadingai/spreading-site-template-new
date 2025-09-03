# 集成 SDK

----

## 准备环境

在开始集成 ZegoRealtimeTranslation SDK 前，请确保开发环境满足以下要求：

- Android Studio 2021.2.1 或以上版本。
- Android SDK 29、Android SDK Build-Tools 29.0.2、Android SDK Platform-Tools 29.x.x 或以上版本。
- Android 8.0 或以上版本且支持音视频的 Android 设备。
- Android 设备已经连接到 Internet。

## 集成 SDK

### 1（可选）新建项目


1. 打开 Android Studio，选择菜单 “File > New > New Project”。

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/RoomKit/Android/newproject.png" /></Frame>

2. 选一个 Empty Activity 项目。

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/RoomKit/Android/selecttemplate.png" /></Frame>

3. 填写项目的存储路径和项目名称，“Minimum SDK” 选择 “API 26”。

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/copyrightedvideo/savepath.png" /></Frame>

4. 单击 “finish”，完成。

### 2 下载 SDK

ZEGO 实时传译 SDK 由深圳市即构科技有限公司提供，您可以在本页面获取适用于 Android 客户端的 ZegoRealtimeTranslation SDK，当前可下载版本为 1.1.0，发布日志请参考 [发布日志](https://doc-zh.zego.im/article/17539)，合规事宜请参考 [ZEGO 安全合规白皮书](/policies-and-agreements/zego-security-and-compliance-white-paper)。

<Card title="ZegoRealtimeTranslation SDK v1.1.0" href="https://artifact-sdk.zego.im/zegorealtimetranslation/Android/SDK/ZegoRealtimeTranslationSDK.zip">
本地下载
</Card>  

<Note title="说明">

- 示例源码：请参考 [跑通示例源码](https://doc-zh.zego.im/article/16656)。
- SDK 集成指引：请参考 [集成 SDK](https://doc-zh.zego.im/article/16658)。
- SDK 版本变更：请参考 [发布日志](https://doc-zh.zego.im/article/17539)。

</Note>

### 3 导入 SDK

1. 请 [下载](https://doc-zh.zego.im/article/16833) 最新版本的 SDK，下载完成后进行解压。

2. 打开已解压文件夹，将 `zegoarealtimetranslation.aar` 文件，拷贝到项目的 “libs” 目录下。

3. 添加 SDK 引用，进入到 “app” 目录，打开 “build.gradle” 文件，添加以下依赖项。

    ```java
    plugins {
        id 'com.android.application'
        id 'kotlin-android'
    }

    android {
        ...
        // 使用google库需加上配置
        packagingOptions {
            exclude 'META-INF/LICENSE'
            exclude 'META-INF/INDEX.LIST'
            exclude 'META-INF/DEPENDENCIES'
        }
        ...
    }
    ...
    dependencies {
        ...
        implementation fileTree(dir:'libs', include: ['*.jar', '*.aar'])
        ...
        // google library
        implementation platform('com.google.cloud:libraries-bom:26.1.1')
        implementation 'com.google.cloud:google-cloud-speech:2.5.4'
        implementation 'com.google.cloud:google-cloud-translate:2.3.4'
        implementation 'com.google.auth:google-auth-library-oauth2-http:1.0.0'
        implementation "io.grpc:grpc-okhttp:1.33.0"

        ...
        implementation "com.squareup.okhttp3:okhttp:4.10.0"
        implementation "com.google.code.gson:gson:2.8.8"
        ...
    }
    ```

<Note title="说明">


    谷歌的服务要求用到 Android 的 API 26 的功能，如果不使用谷歌的服务，可以注释掉 google library 的依赖，同时最低支持 Android 系统可以到 API 21。

    以上操作可以减小最终 APK 包的大小，可以根据实际使用服务商来做出选择。<br />

</Note>



### 设置权限

根据实际应用需要，设置应用所需权限。

进入 “app/src/main” 目录，打开 “AndroidManifest.xml” 文件，添加权限。

```xml
<!-- SDK 必须使用的权限 -->
<uses-permission android:name="android.permission.ACCESS_WIFI_STATE" />
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />

<!-- App 需要使用的部分权限 -->
<uses-permission android:name="android.permission.READ_PHONE_STATE" />

```

具体的权限说明如下：

<table>

<tbody><tr>
<td>**必要性**</td>
<td>**权限**</td>
<td>**权限说明**</td>
<td>**申请原因**</td>
</tr>
<tr>
<td rowspan="3">必要权限</td>
<td>INTERNET</td>
<td>访问网络权限。</td>
<td>SDK 基本功能都需要在联网的情况下才可以使用。</td>
</tr>
<tr>
<td>ACCESS_WIFI_STATE</td>
<td>获取当前 Wi-Fi 状态权限。</td>
<td rowspan="2">SDK 会根据网络状态的改变执行不同的操作。例如，当网络重连时，SDK 内部会将网络断开时的状态都恢复，用户不需做额外的操作。</td>
</tr>
<tr>
<td>ACCESS_NETWORK_STATE</td>
<td>获取当前网络状态权限。</td>
</tr>
<tr>
<td>非必要权限</td>
<td>READ_PHONE_STATE</td>
<td>允许以只读方式访问电话状态，包括当前的呼叫状态。</td>
<td>SDK 会根据当前的呼叫状态，启停音频设备。如监听到当前为呼叫状态，则 SDK 会自动停止使用音频设备，直到通话结束。</td>
</tr>
</tbody></table>

<Note title="说明">


其中非必要权限 “android.permission.READ_PHONE_STATE” 仅用于实现 SDK 的打断事件处理，因此只需在 AndroidMainfest.xml 文件中进行声明即可，不需要动态申请（业务方有需求则另外处理）。

</Note>



### 防止混淆代码

ZegoRealtimeTranslation SDK 内部已经做了混淆处理，外部应用无需再针对集成 ZegoRealtimeTranslation SDK 增加混淆规则。
