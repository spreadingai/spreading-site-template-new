# 集成 vivo 推送


## 概述

`统一推送联盟` 成立之后，各大厂商都推出了自己的推送服务通道，主要目的是为了建立 Android 推送生态。目前小米，华为，魅族，OPPO，vivo 等厂商都推出了系统级别的推送通道，避免了各家 APP 都使用各自的长链接来维持推送通道、需要应用进程处于存活状态，而造成手机耗电、耗内存等问题。


## 前提条件

在接入 `vivo` 的离线推送通道之前，请确保：

- 已集成最新版本的音视频通话 UIKit（Call Kit），并且完成在线邀请功能，详情请参考 [快速开始（包含呼叫邀请）](/callkit-android/quick-start-(with-call-invitation).mdx)。
- 已完成如下步骤：

    1. 前往 [vivo 开放平台](https://dev.vivo.com.cn/openAbility/pushNews) 注册开发者账号，并进行认证，详情请参考 [企业开发者注册。](https://dev.vivo.com.cn/documentCenter/doc/2)
    2. 开发者身份认证成功后，使用 vivo 开发者账号，登录 <a href="https://dev.vivo.com.cn/openAbility/pushNews" target="_blank" rel="noreferrer noopener">vivo 开放平台</a>，在首页选择 “消息推送”。
        <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/ZIM/OfflinePush/vivo1.png" /></Frame>
    3. 点击 “推送申请”，申请一个新的应用，并获取该应用的 AppID、AppKey、AppSecret 等信息。
        <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/ZIM/OfflinePush/vivo2.png" /></Frame>
        <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/ZIM/OfflinePush/vivo3.png" /></Frame>
    4. 创建应用后，无论应用审核通过与否，您都可以申请 vivo 推送服务，等待审核通过。

## 使用步骤

1. 在您项目根目录的主“gradle”文件中配置 mavenCentral 支持。

    ```groovy {3,9}
    buildscript {  
        repositories {  
            mavenCentral()  
        }  
    }  

    allprojects {
        repositories {  
            mavenCentral()  
        }     
    }
    ```

2. 下载 [vivo 推送 SDK](https://artifact-sdk.zego.im/zpns/sdk/vivo/vivo_pushSDK_v4.0.4.0_504.aar)，并将其拷贝到您项目的的“app/libs”目录下。

3. 在应用级的“build.gradle”文件中添加 aar 依赖，参考如下：
    ```groovy
    implementation files('libs/vivo_pushSDK_v4.0.4.0_504.aar')  // // 版本为 4.0.4 的 vivo 推送 SDK
    implementation 'im.zego:zpns-vivo:2.7.0' // 获取用于 vivo 推送的 ZPNs 包
    ```

4. 请在当前工程“AndroidManifest.xml”中的 Application 节点下添加以下代码，开发者需要在当前应用程序中，配置前提条件中获取到的 vivo 应用的 AppID、AppKey 等信息。

    ```xml
    <!--Push开放平台中应用的appid 和api key-->
    <meta-data
        android:name="api_key"
        android:value="xxxxxxxx"/>

    <meta-data
        android:name="app_id"
        android:value="xxxx"/>
    ```

5. 以上配置完成后，请在 [ZEGO 控制台](https://console.zego.im/) 自助配置 ZIM 离线推送证书（详情请参考 [项目管理 - 即时通讯 - 离线推送配置](https://doc-zh.zego.im/article/16233)），若无法配置，请联系 ZEGO 技术支持处理。

6. 防止混淆代码
    
    在“proguard-rules.pro”文件中，为 vivo 推送 SDK 添加 -keep 类的配置，这样可以防止混淆 vivo 推送 SDK 公共类名称：

    ```java
    -dontwarn com.vivo.push.** 
    -keep class com.vivo.push.**{*; } 
    -keep class com.vivo.vms.**{*; }
    ```

## vivo 推送消息限制

vivo 推送将消息分为“系统消息”和“运营消息”两大类别。未接入消息分类，将默认为运营消息，受运营消息规则管控。详情请参见 vivo 官网文档 <a href="https://dev.vivo.com.cn/documentCenter/doc/695#w2-36381313" target="_blank" rel="noreferrer noopener">推送消息限额</a>。

| 消息分类 | 应用类别                                                                                                                                                                                                                                                                                | 用户接收数量限制 |
| :------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :--------------- |
| 系统消息 | \/                                                                                                                                                                                                                                                                                      | 无限制。         |
| 运营消息 | 新闻资讯类（具备《互联网新闻信息服务许可证》，且应用分类为“新闻资讯”）。                                                                                                                                                                                                                | 5条。            |
| 其他类。 | 2条。                                                                                                                                                                                                                                                                                   |                  |
| 测试消息 | 审核中的应用，推送权限为“受限”，只能通过 API，向在 Web 页面中添加的测试设备发送测试消息，测试设备数量上限为 20 个，测试消息不受量级和频控限制。<br/>发送测试消息时注意填写 `pushMode=1`（0：正式推送；1：测试推送；不填默认为 0）。若未填写，则文案相同时，将被当做重复运营消息被去重。 |                  |


<Note title="说明">
- 通知开启的有效用户：应用集成的 push-sdk 订阅成功，且设备近 14 天内有联网的通知权限开启用户。​
- 通知开启有效用户数＜10000，则运营消息量级默认为 10000。
</Note>


## 基于系统消息配置不限量推送

1. 完成上述申请后，请登录[ZEGO 控制台](https://console.zego.im/)，添加 resourcesID，步骤如下：
    1. 选择项目管理，查看对应的项目。
        <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/ZIM/OfflinePush/Enter_project_1.jpeg" /></Frame>
    2. 选择 服务配置- 即时通讯 页面，下滑到“自定义推送策略（resourcesID）配置，点击“添加 resourcesID”。
        <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/ZIM/OfflinePush/Add_1.jpeg" /></Frame>
        <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/ZIM/OfflinePush/resouceID.jpeg" /></Frame>
    3. 提供 `resourcesID`（由您自定义，不超过 32 个字符）、 `category`（推送类别）、`classification`（分类）、`push_mode`（推送模式），配置 resourcesID。

       <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/ZegoUIKit/Android/add_resourceID_vivo.jpeg" /></Frame>

        <table>
        <tbody><tr>
        <th>字段</th>
        <th>说明</th>
        </tr>
        <tr>
        <td>resourcesID</td>
        <td>由您自定义，不超过 32 个字符。<Note title="说明">建议 resourcesID 能够直接反映推送目的。例如，目的是打电话，就可以命名为 `call_resource`。</Note></td>
        </tr>
        <tr>
        <td>category</td>
        <td>推送类别。<Warning title="注意"><ul><li>填写 category 后，可以不填写 classification。</li><li>但若填写 classification，请保证 category 与 classification 是正确对应关系，否则无法推送。</li></ul></Warning></td>
        </tr>
        <tr>
        <td>classification</td>
        <td>消息类型。<ul><li>运营类消息。</li><li>系统类消息。</li></ul></td>
        </tr>
        <tr>
        <td>push_mode</td>
        <td>推送模式。
        <ul><li>正式环境。</li><li>测试环境。</li></ul></td>
        </tr>
        </tbody></table>

3. 在发起邀请时，可以指定使用该 resourcesID 对应的通道进行推送。您需要将配置的 resourcesID 填写到对应的呼叫邀请按钮中或者设置给呼叫邀请接口，即可在呼叫邀请的时候使用离线推送功能。
