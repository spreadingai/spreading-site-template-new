# 集成 OPPO 推送

## 概述

`统一推送联盟` 成立之后，各大厂商都推出了自己的推送服务通道，主要目的是为了建立 Android 推送生态。目前小米，华为，魅族，OPPO，vivo 等厂商都推出了系统级别的推送通道，避免了各家 APP 都使用各自的长链接来维持推送通道、需要应用进程处于存活状态，而造成手机耗电、耗内存等问题。


## 前提条件

在接入 `OPPO` 的离线推送通道之前，请确保：

- 已集成最新版本的音视频通话 UIKit（Call Kit），并且完成在线邀请功能，详情请参考 [快速开始（包含呼叫邀请）](/callkit-android/quick-start-(with-call-invitation).mdx)。
- 已完成如下步骤：
    1. 前往 [OPPO 开放平台](https://open.oppomobile.com/#id=1) 注册企业开发者账号，并进行认证，详情请参考 [开发者帐号注册流程](https://open.oppomobile.com/wiki/doc#id=10446)。
    2. 开发者身份认证成功后，使用 OPPO 企业开发者账号，登录 [OPPO 开放平台](https://open.oppomobile.com/#id=1)，选择 “管理中心 > 应用服务平台 > 开发服务 > 消息推送 > 创建新的应用”，创建一个新的应用。
    3. 开通推送权限，流程请参考 OPPO 官方文档 [推送服务开启指南](https://open.oppomobile.com/new/developmentDoc/info?id=10195)。
    4. 申请通过后，可在 OPPO 推送平台 > 配置管理 > 应用配置页面查看 AppKey、AppSecret 和 MasterSecret（仅开发者账号（主账号）可查看）。
    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/ZIM/OPPO_MasterSecret.jpeg" /></Frame>    

## 使用步骤

1. 在您项目根目录的主 gradle 中配置 mavenCentral 支持。

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

2. 下载 [OPPO 推送 SDK](https://artifact-sdk.zego.im/zpns/sdk/oppo/com.heytap.msp_3.5.2-release-20240516-416001043.aar)，并将其拷贝到您项目的的 “app/libs” 目录下。

3. 在项目的应用级 “build.gradle” 文件中添加 aar 依赖。
:::if{props.platform=undefined}
    ```groovy
    dependencies {
     implementation files('libs/com.heytap.msp_3.5.2-release-20240516-416001043.aar') // 版本为 3.5.2 的 OPPO 推送 SDK
     implementation 'im.zego:zpns-oppo:2.7.0' // 获取用于 OPPO 推送服务的 ZPNs 库

     //以下为 OPPO 推送 SDK 依赖的三方库
     implementation 'com.google.code.gson:gson:2.10.1'
     implementation 'commons-codec:commons-codec:1.6'
     implementation 'androidx.annotation:annotation:1.1.0'
    }
    ```
:::
:::if{props.platform="Flutter|RN"}
    ```groovy
    dependencies {
     implementation files('libs/com.heytap.msp_3.5.2-release-20240516-416001043.aar') // 版本为 3.5.2 的 OPPO 推送 SDK

     //以下为 OPPO 推送 SDK 依赖的三方库
     implementation 'com.google.code.gson:gson:2.10.1'
     implementation 'commons-codec:commons-codec:1.6'
     implementation 'androidx.annotation:annotation:1.1.0'
    }
    ```
:::

4. 防止混淆代码
    
    在 “proguard-rules.pro” 文件中，为 OPPO 推送 SDK 添加 -keep 类的配置，这样可以防止混淆 OPPO 推送 SDK 公共类名称：

    ```java
    -keep public class * extends android.app.Service
    -keep class com.heytap.msp.** { *;}
    ```

5. 以上配置完成后，请在 [ZEGO 控制台](https://console.zego.im/) 自助配置 ZIM 离线推送证书（详情请参考 [项目管理 - 即时通讯 - 离线推送配置](https://doc-zh.zego.im/article/16233)），若无法配置，请联系 ZEGO 技术支持处理。


## OPPO 推送消息限制

OPPO 推送服务将消息推送通道分为两种，公信和私信，具体限制数量规则如下，详情请参见 OPPO 官网文档 [推送服务受限说明](https://open.oppomobile.com/new/developmentDoc/info?id=11210)。

### 应用推送总量限制

<table>
<tbody><tr>
<th rowspan="2">通知栏推送权限</th>
<th rowspan="2">应用要求</th>
<th colspan="3">消息推送量（条/日）</th>
</tr>
<tr>
<th>消息推送通道</th>
<th>累计用户数</th>
<th>可推送总量</th>
</tr>
<tr>
<td rowspan="3">正式权限</td>
<td rowspan="3">应用已上架 OPPO 软件商店</td>
<td rowspan="2">公信</td>
<td>&lt;50000</td>
<td>100000</td>
</tr>
<tr>
<td>≥50000</td>
<td>累计用户×2</td>
</tr>
<tr>
<td>私信</td>
<td colspan="2">不限量。</td>
</tr>
<tr>
<td rowspan="3">测试权限</td>
<td rowspan="3">应用未上架 OPPO 软件商店</td>
<th>消息推送通道</th>
<th colspan="2">可推送总量</th>
</tr>
<tr>
<td>公信</td>
<td colspan="2">1000</td>
</tr>
<tr>
<td>私信</td>
<td colspan="2">不支持申请。</td>
</tr>
</tbody></table>

### 单设备推送条数限制

<table>
<tbody><tr>
<th rowspan="2">应用类别</th>
<th colspan="2">单用户推送限制（条/日）</th>
</tr>
<tr>
<th>公信消息</th>
<th>私信消息</th>
</tr>
<tr>
<td>新闻类（三级分类为新闻类）</td>
<td>5条</td>
<td>不限量。</td>
</tr>
<tr>
<td>其他应用类型</td>
<td>2条</td>
<td>不限量。</td>
</tr>
</tbody></table>


## 使用私信通道不限量推送

1. 您需要通过创建私信通道，才能无限制地向 OPPO 设备推送消息，详情请参考 OPPO 官网文档 <a href="https://open.oppomobile.com/new/developmentDoc/info?id=12391" target="_blank" rel="noreferrer noopener">创建私信通道（需要 OPPO 审核）</a>。     
2. 请登录 [ZEGO 控制台](https://console.zego.im/)，添加 resourcesID，步骤如下：
    1. 选择项目管理，查看对应的项目。
        <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/ZIM/OfflinePush/Enter_project_1.jpeg" /></Frame>
    2. 选择 服务配置- 即时通讯 页面，下滑到“自定义推送策略（resourcesID）配置，点击“添加 resourcesID”。    
        <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/ZIM/OfflinePush/Add_1.jpeg" /></Frame>  
        <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/ZIM/OfflinePush/resouceID.jpeg" /></Frame>  
    3. 提供 `resourcesID`（由您自定义，不超过 32 个字符）、`channel_id`（渠道 ID）。     

        <Note title="说明">
        建议 resourcesID 能够直接反映推送目的。例如，目的是打电话，就可以命名为 `call_resource`。
        </Note>

       <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/ZegoUIKit/Android/add_resourceID_oppo.png" /></Frame>

3. 在发起呼叫时，可以指定使用该 resourcesID 对应的通道进行推送。您需要将配置的 resourcesID 填写到对应的呼叫邀请按钮中或者设置给呼叫邀请接口，即可在呼叫邀请的时候使用离线推送功能。
