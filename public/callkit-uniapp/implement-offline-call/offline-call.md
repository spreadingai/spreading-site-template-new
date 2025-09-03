# 实现离线推送


## 功能简介

音视频通话 UIKit（Call Kit）支持向离线应用（即在后台被冻结或遭系统或用户杀掉的应用）发送呼叫邀请。

## 前提条件

在实现“离线推送”功能之前，请确保已集成最新版本的音视频通话 UIKit（Call Kit），并且完成在线邀请功能。详情请参考 [快速开始（包含呼叫邀请）](/callkit-uniapp/quick-start-(with-call-invitation).mdx)。

## 实现流程

### 接入第三方厂商离线推送通道

请参考下列推送集成指南，集成**您需要的**第三方厂商离线推送 SDK，接入各厂商的离线推送通道。集成方式会因为您的工程打包方式而有所差异。

<Tabs>
<Tab title="离线打包">
如果您根据 uni-app 提供的 [APP 离线打包](https://nativesupport.dcloud.net.cn/AppDocs/) 方式打包（即 APP 工程在开发者本地），请参考下列推送集成指南**全文**，向厂商申请离线推送证书，在 [ZEGO 控制台](https://console.zego.im) 配置离线推送证书，集成厂商的推送 SDK 等步骤。

- [Apple 推送集成指南](/callkit-uniapp/implement-offline-call/integrate-apns)
- [小米推送集成指南](/callkit-uniapp/implement-offline-call/integrate-xiaomi)
- [华为推送集成指南](/callkit-uniapp/implement-offline-call/integrate-huawei)
- [OPPO 推送集成指南](/callkit-uniapp/implement-offline-call/integrate-oppo)
- [vivo 推送集成指南](/callkit-uniapp/implement-offline-call/integrate-vivo)
</Tab>
<Tab title="云端打包">
如果您使用 uni-app HBuilder 提供的云端打包方式，请参考下列推送集成指南的**前提条件**，向厂商申请离线推送证书，在 [ZEGO 控制台](https://console.zego.im) 配置离线推送证书。

- [Apple 推送集成指南](/callkit-uniapp/implement-offline-call/integrate-apns)
- [小米推送集成指南](/callkit-uniapp/implement-offline-call/integrate-xiaomi)
- [华为推送集成指南](/callkit-uniapp/implement-offline-call/integrate-huawei)
- [OPPO 推送集成指南](/callkit-uniapp/implement-offline-call/integrate-oppo)
- [vivo 推送集成指南](/callkit-uniapp/implement-offline-call/integrate-vivo)
</Tab>
</Tabs>

完成上述步骤，即可在集成 ZPNs uni-app SDK 时，自动集成上述厂商的推送 SDK。

### （仅适用于云端打包项目）配置离线推送

#### 配置 vivo 推送

针对 vivo 推送，在 “App原生插件配置” 中，传入 vivo api_key 和 app_id，如图额外信息：

<Note title="说明">
如何获取 vivo api_key 和 app_id，请参考 [vivo 推送集成指南](/callkit-uniapp/implement-offline-call/integrate-vivo)。
</Note>

<Frame width="512" height="auto" caption="">
<img src="https://doc-media.zego.im/sdk-doc/Pics/ZIM/ZPNS/uniapp/img11.jpeg" />
</Frame>

#### 配置华为推送
由于接入华为推送需要在 App 的工程目录下增加 `agconnect-services.json` 文件，而云端打包的运行基座在 uni-app 厂商云端，那么这里就需要开发者在云端打包构建 apk 时上该文件。

具体方法：打开 HBuilder，在 `nativeplugins` 目录下把刚集成进去的 `zego-ZPNsUniPlugin` 目录里的 `android` 子目录下，创建一个名为 `assets` 的目录，然后把从华为开发中心里下载好的 `agconnect-services.json` 拷贝进去即可。

<Frame width="512" height="auto" caption="">
    <img src="https://doc-media.zego.im/sdk-doc/Pics/ZIM/ZPNS/uniapp/img9.jpeg" />
</Frame>

#### 配置 Push 推送模块
在 HBuilder > App 模块配置中勾选使用 “Push” 推送模块。

<Warning title="注意">
不要勾选 `uniPush`。
</Warning>

<Frame width="512" height="auto" caption="">
    <img src="https://doc-media.zego.im/sdk-doc/Pics/ZIM/ZPNS/uniapp/img5.jpeg" />
</Frame>

### 开启离线推送并配置安卓第三方推送通道

根据前提条件集成的第三方厂商离线推送 SDK，启用各厂商的推送功能，然后调用 ZegoUIKitPrebuiltCallService.init 接口，配置第三方推送通道。

```javascript
ZegoUIKitPrebuiltCallService.init(appID, appSign, userID, userName, {
  // 开启离线推送
  enableNotifyWhenAppRunningInBackgroundOrQuit: true,
  // 安卓各家厂商的离线推送设置项
  offlinePushConfig: OfflinePushConfig,
});
```
离线推送配置项请参考 [OfflinePushConfig](/callkit-uniapp/api-reference/config#Offlinepushconfig)。

### 发送呼叫邀请时使用离线推送功能

您可以根据所需效果，从以下方式中选择最适合的实现呼叫邀请离线推送。

<Tabs>
<Tab title="最便捷">
使用 `ZegoSendCallInvitationButton` 来发送呼叫邀请，并设置 [notificationConfig](/callkit-uniapp/api-reference/config#NotificationConfig) 属性中您在控制台配置的 `resourcesID` 字段的值。

```vue title="pages/invite/index.vue" 
<template>
    <ZegoSendCallInvitationButton :type="ZegoInvitationType.VideoCall" :invitees="invitees" :notificationConfig="notificationConfig" :onPressed="onPressed" />
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import ZegoSendCallInvitationButton from "@/uni_modules/zego-PrebuiltCall/components/invitation/ZegoSendCallInvitationButton.vue"
import { ZegoInvitationType } from "@/uni_modules/zego-UIKitCore";

const notificationConfig = ref({
  title: "离线推送标题",
  message: "离线推送内容",
  resourceID: '在 ZEGO 控制台配置的资源ID',
})

onMounted(() => {
    // 离线推送配置
    const config = {}
    ZegoUIKitPrebuiltCallService.init(appID, appSign, userID, userName, config);
})
```
</Tab>
<Tab title="如需自定义邀请按钮">
使用 `ZegoUIKitPrebuiltCallService.sendInvitation()`来发送呼叫邀请。

```javascript
import { ZegoInvitationType } from "@/uni_modules/zego-UIKitCore";
import { Navigation } from "@/uni_modules/zego-PrebuiltCall/utils/Navigation";

const invitees = [{userID: '需要邀请的用户ID', userName: '需要邀请的用户名'}]
const notificationConfig = {
  title: "离线推送标题",
  message: "离线推送内容",
  resourceID: '资源ID',
}
// 发起邀请参数
const callInviteConfig = {
    invitees: invitees.value,
    type: ZegoInvitationType.VideoCall,
    notificationConfig,
}

ZegoUIKitPrebuiltCallService.sendInvitation(callInviteConfig)
    .then(({ invitationID, callID, successUsers, errorUsers }) => {
            Navigation.navigateTo('/uni_modules/zego-PrebuiltCall/pages/invitation/ZegoCallInvitationWaiting', {
                invitees: successUsers,
                isVideoCall: callInviteConfig.type === ZegoInvitationType.VideoCall,
                invitationID,
                roomID: callID
            })
        })
```

发起呼叫邀请配置请参考[CallInviteConfig](/callkit-uniapp/api-reference/config#CallInviteConfig)。
</Tab>
</Tabs>
