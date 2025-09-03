华为推送服务将通知消息分为**资讯营销**、**服务与通讯**两种。**资讯营销**类消息的每日推送数量有上限，**服务与通讯**类消息每日推送数量无上限，详情请参考华为官网文档 <a href="https://developer.huawei.com/consumer/cn/doc/development/HMSCore-Guides/message-restriction-description-0000001361648361?ha_source=hms5" target="_blank" rel="noreferrer noopener">推送数量管理细则</a>。

<table>
<tbody><tr>
<th>消息分类</th>
<th>类型说明</th>
<th>推送数量限制</th>
</tr>
<tr>
<td>资讯营销类消息</td>
<td><ul><li>内容资讯：内容推荐，新闻，财经动态，生活资讯，社交动态，调研，其他。</li><li>营销活动：产品促销，功能推荐，运营活动。</li></ul></td>
<td><ul><li>新闻阅读类：5条/日。</li><li>其他应用类型：2条/日。</li></ul></td>
</tr>
<tr>
<td>服务与通讯类消息</td>
<td><ul><li>社交通讯：即时聊天，音频、视频通话。</li><li>服务提醒：订阅，出行，健康，工作事项提醒等。</li></ul></td>
<td>无限制。</td>
</tr>
</tbody></table>

# 华为推送集成指南

## 概述

`统一推送联盟` 成立之后，各大厂商都推出了自己的推送服务通道，主要目的是为了建立 Android 推送生态。目前小米，华为，魅族，OPPO，vivo 等厂商都推出了系统级别的推送通道，避免了各家 APP 都使用各自的长链接来维持推送通道、需要应用进程处于存活状态，而造成手机耗电、耗内存等问题。

开发者使用 ZIM 提供的“离线推送”功能之前，请参考本文，接入华为厂商的离线推送通道。  

## 前提条件

在接入 `华为` 的离线推送通道之前，请确保：

- 已集成最新版本的 ZIM SDK，详情请参考 [快速开始 - 实现基本收发消息](/zim-android/send-and-receive-messages)。
- 已完成如下步骤：

    1. 前往 <a href="https://developer.huawei.com/consumer/cn/" target="_blank" rel="noreferrer noopener">华为开发者后台</a> 注册开发者账号，并进行认证，详情请参考华为开发者文档 <a href="https://developer.huawei.com/consumer/cn/doc/start/registration-and-verification-0000001053628148" target="_blank" rel="noreferrer noopener">注册帐号</a>、<a href="https://developer.huawei.com/consumer/cn/doc/start/itrna-0000001076878172" target="_blank" rel="noreferrer noopener">实名认证</a>。
    2. 开发者身份认证成功后，使用华为开发者账号，登录 <a href="https://developer.huawei.com/consumer/cn/" target="_blank" rel="noreferrer noopener">华为开发者后台</a>，选择 “我的项目 > 添加项目 > 创建项目”，创建一个新项目。
    3. 在创建的新项目中，选择 “项目设置> 推送服务”，点击“立即开通”，开通推送服务。
    4. 开通推送服务后，还需要创建自己的应用，选择 “我的项目 > 我的应用 > 新建”，勾选“添加到项目”后，选择刚创建的项目，创建一个应用，并获取应用的 AppID 等信息。
    5. 在 ApplGarllery Connect 中配置相关信息，详情请参考华为开发者文档 [配置AppGallery Connect](https://developer.huawei.com/consumer/cn/doc/HMSCore-Guides/android-config-agc-0000001050170137)。 

## 使用步骤

1. 下载华为服务配置文件。

    登录 <a href="https://developer.huawei.com/consumer/cn/" target="_blank" rel="noreferrer noopener">华为开发者后台</a> ，在 “管理中心 > PUSH > 选择您的应用 > 项目设置 > 常规”，找到 “agconnect-servics.json” 文件，点击下载，如下图：
    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/ZIM/OfflinePush/offline_push_huawei_1.jpeg" /></Frame>

2. 配置工程。 

    将下载好的 “agconnect-servics.json” 文件，放到自己项目的 “app” 目录下，如下图：

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/ZIM/offline_push_huawei_json.png" /></Frame>

3. 配置 HMS Core SDK 与 mavenCentral 的 Maven 仓地址。

    打开项目根目录下的 ”build.gradle“ 文件。

    <Frame width="256" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/ZIM/offline_push_huawei_hms_sdk.png" /></Frame>

    - 在 “buildscript > repositories” 中，配置 HMS Core SDK 和 mavenCentral 的 Maven 仓地址。
    - 在 “allprojects > repositories” 中，配置 HMS Core SDK 和 mavenCentral 的 Maven 仓地址。
    - 如果 App 中添加了 “agconnect-services.json” 文件，则需要在 “buildscript > dependencies” 中增加 agcp 插件配置。

    ```java
    buildscript {
        repositories {
            google()
            jcenter()
            // 配置 HMS Core SDK 的 Maven 仓地址。
            maven {url 'https://developer.huawei.com/repo/'}
            // 配置 mavenCentral
            mavenCentral()
        }
        dependencies {
            ...
            // 增加 agcp 插件配置。
            classpath 'com.huawei.agconnect:agcp:1.7.1.300'
        }
    }

    allprojects {
        repositories {
            google()
            jcenter()
            // 配置 HMS Core SDK 的 Maven 仓地址。
            maven {url 'https://developer.huawei.com/repo/'}
            mavenCentral()
        }
    } 
    ```

4. 在应用级别的 “build.gradle” 文件中添加 agcp 插件配置。

    <Tabs>
    <Tab title="方式1">
    
    在文件头部声明的下一行添加如下代码。

    ```java
    apply plugin: 'com.huawei.agconnect'
    ```
    </Tab>
    <Tab title="方式2">
    在 `plugins` 节点中添加如下配置。

    ```java
    plugins {
        id 'com.android.application'
        // 添加如下配置
        id 'com.huawei.agconnect'
    }
    ```
    </Tab>
    </Tabs>

5. 集成 SDK。

    打开应用级的 “build.gradle” 文件，在 “dependencies” 节点中添加如下编译依赖。

    ```groovy
    dependencies {
        implementation 'com.huawei.hms:push:6.12.0.300' // 华为推送 SDK
        implementation 'im.zego:zpns-huawei:2.8.0' // 获取用于华为推送服务的 ZPNs 库
    }
    ```

6. 防止混淆代码

    在 “proguard-rules.pro” 文件中，为 HMS Core SDK  添加 -keep 类的配置，这样可以防止混淆 HMS Core SDK 公共类名称：

    ```java
    -ignorewarnings
    -keepattributes *Annotation*
    -keepattributes Exceptions
    -keepattributes InnerClasses
    -keepattributes Signature
    -keepattributes SourceFile,LineNumberTable
    -keep class com.huawei.hianalytics.**{*;}
    -keep class com.huawei.updatesdk.**{*;}
    -keep class com.huawei.hms.**{*;}
    ```
    
    添加完上述代码后，如果您需要了解更多混淆相关的内容，请查看华为官方文档 <a href="https://developer.huawei.com/consumer/cn/doc/development/HMSCore-Guides/android-config-obfuscation-scripts-0000001050176973" target="_blank" rel="noreferrer noopener">配置混淆脚本</a>。

7. 以上配置完成后，请在 [ZEGO 控制台](https://console.zego.im/) 自助配置 ZIM 离线推送证书（详情请参考 [项目管理 - 即时通讯 - 离线推送配置](https://doc-zh.zego.im/article/16233)），若无法配置，请联系 ZEGO 技术支持处理。

## 华为推送消息限制

<Content />

## 基于消息分类实现无限制推送

1. 华为可通过自分类权益来实现不限量推送，开发者需要在华为控制台申请自分类权益，请参考华为官方文档 <a href="https://developer.huawei.com/consumer/cn/doc/development/HMSCore-Guides/message-classification-0000001149358835#section3410731125514" target="_blank" rel="noreferrer noopener">消息分类标准 - 自分类权益申请</a>。
2. 完成上述申请后，请参考 [resourcesID 说明 - 配置](/zim-android/offline-push-notifications/resourcesid-introduction#配置)，在 ZEGO 控制台上使用如下信息配置 resourcesID：
    - `resourcesID`：由您自定义，不超过 32 个字符）。
    - `category`：推送类别。
    - `target_user_type`：用户类型：
        - 0：正式推送。
        - 1 表示测试推送

    <Note title="说明">
    建议 `resourcesID` 能够直接反映推送目的。例如，目的是打电话，就可以命名为 `call_resource`。
    </Note>

3. 在发起推送时，可以指定使用该 resourcesID 对应的通道进行推送。您需要将配置的 Resource ID 填写到 ZIMPushConfig 中，实现代码请参考 [实现离线推送 - 发送单聊消息时使用离线推送功能](/zim-android/offline-push-notifications/implement-offline-push-notification#场景-1发送单聊消息时使用离线推送功能)。
