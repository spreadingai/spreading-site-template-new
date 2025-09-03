# 小米推送集成指南


## 概述

`统一推送联盟` 成立之后，各大厂商都推出了自己的推送服务通道，主要目的是为了建立 Android 推送生态。目前小米，华为，魅族，OPPO，vivo 等厂商都推出了系统级别的推送通道，避免了各家 APP 都使用各自的长链接来维持推送通道、需要应用进程处于存活状态，而造成手机耗电、耗内存等问题。

开发者使用 ZIM 提供的“离线推送”功能之前，请参考本文，接入小米厂商的离线推送通道。  

## 前提条件

在接入 `小米` 的离线推送通道之前，请确保：

- 已集成最新版本的音视频通话 UIKit（Call Kit），并且完成在线邀请功能。详情请参考 [快速开始（包含呼叫邀请）](/callkit-uniapp/quick-start-(with-call-invitation).mdx)。
- 已完成如下步骤：
    1. 前往 <a href="https://dev.mi.com/console/appservice/push.html" target="_blank" rel="noreferrer noopener">小米开放平台</a> 注册开发者账号，并进行认证，详情请参考 <a href="https://dev.mi.com/console/doc/detail?pId=848" target="_blank" rel="noreferrer noopener">企业开发者账号注册流程</a>。
    2. 开发者身份认证成功后，使用小米开发者账号，登录 <a href="https://dev.mi.com/console/man/" target="_blank" rel="noreferrer noopener">小米开发者后台</a>，在“应用服务”中选择“消息推送”。
    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/ZIM/OfflinePush/xiaomi2.png" /></Frame>
    3. 点击“创建应用”，按照流程输入相关信息，创建自己的应用，并获取该应用的 AppID、AppKey、AppSecret 等信息。
    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/ZIM/OfflinePush/xiaomi3.png" /></Frame>
    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/ZIM/OfflinePush/xiaomi4.png" /></Frame>

## 实现流程

<Steps>
<Step title="配置 mavenCentral">
在您项目根目录的主 gradle 文件中配置 mavenCentral 支持。

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
</Step>
<Step title="获取小米推送 SDK">
下载 [小米推送 SDK](https://artifact-sdk.zego.im/zpns/sdk/xiaomi/MiPush_SDK_Client_6_0_1-C_3rd.aar)，并将其拷贝到您项目的的 “app/libs” 目录下。
</Step>
<Step title="添加依赖">
在项目的应用级 “build.gradle” 文件中添加 aar 依赖。

```groovy
dependencies {
    implementation files('libs/MiPush_SDK_Client_6_0_1-C_3rd.aar') // 版本为 6.0.1 的小米推送 SDK
    implementation 'im.zego:zpns-xiaomi:2.7.0' // 获取用于小米推送服务的 ZPNs 库
}
```

<Warning title="注意">
由于 Android 12 通知 trampoline 限制（详情请参考 Google 官方文档 <a href="https://developer.android.google.cn/about/versions/12/behavior-changes-12?hl=zh-cn#notification-trampolines" target="_blank" rel="noreferrer noopener">行为变更：以 Android 12 为目标平台的应用 - 通知 trampoline 限制</a>），targetSdkVersion >= 31 的应用需要接入小米推送 SDK 4.9.1 或以上版本，否则会出现点击通知无法正常跳转的情况。
</Warning>
</Step>
<Step title="防止混淆">
在 “proguard-rules.pro” 文件中，为 小米推送 SDK  添加 -keep 类的配置，这样可以防止混淆公共类名称：

```java
-dontwarn com.xiaomi.push.**
-keep class com.xiaomi.push.** { *; }
```
</Step>
<Step title="配置证书">
以上配置完成后，请在 [ZEGO 控制台](https://console.zego.im/) 自助配置 ZIM 离线推送证书（详情请参考 [项目管理 - 即时通讯 - 离线推送配置](https://doc-zh.zego.im/article/16233)），若无法配置，请联系 ZEGO 技术支持处理。
</Step>
</Steps>

## 小米推送消息限制

小米推送将消息分为“私信消息”和“公信消息”两个类别，若应用选择不接入私信或公信，则会接入默认通道，详情请参考小米官网文档 <a href="https://dev.mi.com/console/doc/detail?pId=2086" target="_blank" rel="noreferrer noopener">小米推送消息限制说明</a>。

<table>
<tbody><tr>
<th>消息类型</th>
<th>用户接收数量限制</th>
<th>申请方式</th>
</tr>
<tr>
<td>默认</td>
<td>单个应用单个设备单日 1 条。</td>
<td>无需申请。</td>
</tr>
<tr>
<td>公信消息</td>
<td>单个应用单个设备单日 5-8 条。</td>
<td rowspan="2">需在推送运营平台申请。</td>
</tr>
<tr>
<td>私信消息</td>
<td>不限量。</td>
</tr>
</tbody></table>


## 使用私信通道无限制推送

<Steps>
<Step title="创建 Channel">
请参考小米官方文档 <a href="https://dev.mi.com/console/doc/detail?pId=2422#_2" target="_blank" rel="noreferrer noopener">小米推送消息分类新规 - channel申请及接入方法</a>，创建 Channel，创建 Channel 时选择私信通道。

    <Warning title="注意">
    一旦创建 Channel 并发送了带有 Channel 的消息，设备上即会生成这个 Channel，不能删除也不能修改，所以请谨慎创建 Channel。 
    </Warning>
</Step>
<Step title="配置 resourcesID">
创建 Channel 后，请参考 [resourcesID 说明 - 配置](https://doc-zh.zego.im/zim-uniapp/offline-push-notifications/resourcesid-introduction#%E9%85%8D%E7%BD%AE)，在 ZEGO 控制台上使用如下信息配置 resourcesID：
- `resourcesID`：由您自定义，不超过 32 个字符。
- `channel_id`：渠道 ID，必需。
- `channel_name`：渠道名称，可选。
- `channel_description`：渠道描述，可选。

<Note title="说明">
建议 `resourcesID` 能够直接反映推送目的。例如，目的是打电话，就可以命名为 `call_resource`。
</Note>
</Step>
<Step title="后续操作">
完成上述配置后，请参考 [实现离线推送](/callkit-uniapp/implement-offline-call/offline-call) 集成 ZPNs SDK 等其他步骤。
</Step>
</Steps>