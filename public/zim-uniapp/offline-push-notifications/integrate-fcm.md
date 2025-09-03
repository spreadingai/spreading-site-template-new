# FCM 集成指南


<Note title="说明">
本文适用于 Android 端集成 FCM。
</Note>

## 概述

Google 推送 [FCM](https://firebase.google.com)（Firebase Cloud Messaging）是一种跨平台消息传递解决方案，支持海外用户推送离线消息，可供开发者可靠地传递消息。

开发者使用 ZIM 提供的“离线推送”功能之前，请参考本文，接入 Google FCM 厂商的离线推送通道。  

<Warning title="注意">
启用 Google 推送后，ZPNs SDK 会直接使用 Google 推送通道，其他厂商的推送通道将会失效。
</Warning>

## 前提条件

使用 `FCM` 成功推送需要以下条件：
 
1. 移动设备（如手机）支持 “谷歌移动服务 GMS”。
2. 移动设备（如手机）连接的网络属于海外网络。

在接入 `FCM` 的离线推送通道之前，请确保：

- 已集成最新版本的 ZIM SDK，详情请参考 [快速开始 - 实现基本收发消息](/zim-uniapp/send-and-receive-messages)。
- 已完成如下步骤：

    1. 前往 [Firebase 平台](https://console.firebase.google.com/)，登录自己的 [Google 账号](https://support.google.com/accounts/answer/27441?hl=zh-Hans&ref_topic=3382296)。
    
    2. 登录成功后，在页面中，选择 “添加项目”，输入项目名称及相关信息。
    
        <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/ZIM/Android/add_project.png" /></Frame>
    
    3. 添加项目完成后，点击，进入项目详情。

        <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/ZIM/Android/project_info.png" /></Frame>

    4. 在界面中点击如图的按钮，创建 Android 应用。

        <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/ZIM/Android/create_app.png" /></Frame>

    5. 填写 Android 应用的相关信息，然后点击 “注册应用”。

        <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/ZIM/Android/add_app_info.png" /></Frame>

    6. 注册完成后，点击 “下载 google-services.json” 文件。集成 SDK 时，需要将此文件配置至项目的 app 目录下。

        <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/ZIM/Android/download_google_json.png" /></Frame>

## 使用步骤

### 添加 FCM 推送服务

1. 在项目级 “build.gradle”（文件路径：项目/build.gradle）文件中，配置 Google 的 maven 仓库，拉取 Google 的依赖。

    ```java
    buildscript {
        repositories {
            // 请检查代码是否有以下内容（若无，请添加）：
            google()  // Google 的 Maven 库
            mavenCentral()
        }
        dependencies {
            ...
            // 添加此行
            classpath 'com.google.gms:google-services:4.3.5'

        }
    }

    allprojects {
        ...
        repositories {
            // 请检查代码是否有以下内容（若无，请添加）：
            google()  // Google 的 Maven 库
            mavenCentral()
            ...
        }
    }
    ```

2. 在应用级 “build.gradle”（文件路径：项目/应用模块/build.gradle）文件中，增加 Firebase 相关依赖。

    ```java
    apply plugin: 'com.android.application'

    // 添加此行
    apply plugin: 'com.google.gms.google-services'

    dependencies {
        // 引入 Firebase BoM
        implementation platform('com.google.firebase:firebase-bom:31.0.2')

        // 添加 Firebase SDK 用于 Google Analytics 和 FCM 的依赖。 
        // 使用 BoM 时，请勿在 Firebase 依赖中指明版本
        implementation 'com.google.firebase:firebase-analytics'
        implementation 'com.google.firebase:firebase-messaging:23.2.1' 
        implementation 'im.zego:zpns-fcm:2.8.0' // 用于 Google FCM 推送的 ZPNs 包

        // 为任何其他所需的 Firebase 产品添加依赖
        // https://firebase.google.com/docs/android/setup#available-libraries
    }
    ```
    
3. 以上配置完成后，请在 [ZEGO 控制台](https://console.zego.im/) 自助配置 ZIM 离线推送证书（详情请参考 [项目管理 - 即时通讯 - 离线推送配置](https://doc-zh.zego.im/article/16233)），若无法配置，请联系 ZEGO 技术支持处理。

4. 防止混淆代码

    在“proguard-rules.pro”文件中，为 FCM SDK 添加 -keep 类的配置，这样可以防止混淆 FCM SDK 公共类名称：

    ```java
    -dontwarn com.google.**
    -keep class com.google.** {*;}
    ```

### 在控制台添加 FCM 证书

<Steps>
<Step title="获取 Firebase 服务账号凭证">

Android 项目支持 Google 服务账号，但是需要使用 Google 服务账号获取的凭证文件，并允许 ZEGO 服务器调用 Firebase 服务器 API。

获取步骤如下：

1. 前往 [Firebase 控制台](https://console.firebase.google.com)，选择您的项目。

  <Frame width="auto" height="auto" >
    <img src="https://media-resource.spreading.io/docuo/workspace741/896bc39e2e65b82d5670b01b7c131c30/f30d181f90.jpeg" />
  </Frame>

2. 点击项目设置 > 服务账号。

  <Frame width="auto" height="auto" >
    <img src="https://media-resource.spreading.io/docuo/workspace741/896bc39e2e65b82d5670b01b7c131c30/58a445d151.jpeg" />
  </Frame>

3. 点击生成新的私钥，然后点击生成密钥。

  <Frame width="auto" height="auto" >
    <img src="https://media-resource.spreading.io/docuo/workspace741/896bc39e2e65b82d5670b01b7c131c30/c0e57dbfc5.jpeg" />
  </Frame>

</Step>
<Step title="上传 FCM 证书">

1. 登录 [ZEGO 控制台](https://console.zego.im/)，选择项目管理 进入自己的项目，点击服务配置 > 即时通讯。

  <Frame width="auto" height="auto" >
    <img src="https://media-resource.spreading.io/docuo/workspace741/896bc39e2e65b82d5670b01b7c131c30/a923d7b2f2.png"  />
  </Frame>

2. 在离线推送配置中，点击添加证书，上传 FCM 证书，然后点击确定。

  <Frame width="auto" height="auto" >
    <img src="https://media-resource.spreading.io/docuo/workspace741/896bc39e2e65b82d5670b01b7c131c30/97becb7459.png" />
  </Frame>

  <Frame width="auto" height="auto" >
    <img src="https://media-resource.spreading.io/docuo/workspace741/896bc39e2e65b82d5670b01b7c131c30/8e7b07846a.png" alt="20250820-164225.png"/>
  </Frame>

  至此，您已完成 FCM 离线推送通知的配置。
  
</Step>
</Steps>
<Content/>