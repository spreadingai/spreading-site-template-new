- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppID 和 AppSign，详情请参考 [控制台 - 项目信息](https://doc-zh.zego.im/article/12107)。
- 联系 ZEGO 技术支持，开通 UIKit 相关服务。

- HBuilderX 3.0.0 或以上版本。
- 准备 iOS 及 Android 开发环境和设备，要求如下：
  <Tabs>
  <Tab title="iOS">
    - Xcode 15.0 或以上版本。
    - iOS 12.0 或以上版本且支持音视频的 iOS 设备。  
  </Tab>
  <Tab title="Android">
    - Android Studio 2020.3.1 或以上版本。
    - Android SDK 25、Android SDK Build-Tools 25.0.2、Android SDK Platform-Tools 25.x.x 或以上版本。
    - Android 4.4 或以上版本，且支持音视频的 Android 设备。
  </Tab>
  </Tabs>
- 设备已经连接到 Internet。

# 快速开始

这份文档将指导您如何在 uni-app 项目集成 `音视频通话 UIKit` uni-app SDK 并快速开始包含呼叫邀请的音视频通话。
## 准备环境

在开始集成音视频 UIKit 前，请确保开发环境满足以下要求：

<EnviromentRequiremenZh />

## 前提条件

<UIKitCreateAccountAndServicesZh />

## 集成 SDK

<Steps>
<Step title="创建项目">
若您已有 uni-app 项目，则跳过此步骤。若尚无 uni-app 项目，请参考 uni-app 开发者文档 [创建 uni-app](https://uniapp.dcloud.net.cn/quickstart-hx.html) 快速创建项目。
</Step>

<Step title="设置 Android SdkVersion">
单击项目目录的 “manifest.json” 文件后，单击 “App 常用其他设置”。设置 Android `minSdkVersion` 为 23，`targetSdkVersion` 为 33。

<Frame width="100%">
    <img src="https://media-resource.spreading.io/docuo/workspace743/b15828c70dcfacdbb1e91d99a16d0514/97cc39689b.png" alt=""/>
</Frame>

</Step>

<Step title="导入 ZEGO 实时音视频 SDK 和即时通讯 SDK">
在插件市场购买 [ZEGO 即构实时音视频 SDK](https://ext.dcloud.net.cn/plugin?id=3617) 和 [Zego ZIM 即时通讯 SDK](https://ext.dcloud.net.cn/plugin?id=8601)。购买时填入的 AppID 必须和后面需要运行的 AppID 一致。

<Frame width="100%">
    <img src="https://media-resource.spreading.io/docuo/workspace564/27e54a759d23575969552654cb45bf89/fc005e6051.png" alt="free_buy_for_cloud_build.png"/>
</Frame>

<Frame width="100%">
    <img src="https://media-resource.spreading.io/docuo/workspace743/b15828c70dcfacdbb1e91d99a16d0514/c30b1f1c5a.png" alt="free_buy_for_cloud_build.png"/>
</Frame>

单击项目目录的 “manifest.json” 文件后，单击 “App 原生插件配置 > 云端插件 [选择云端插件]”。

<Frame width="50%">
    <img src="https://media-resource.spreading.io/docuo/workspace743/b15828c70dcfacdbb1e91d99a16d0514/6ef174060a.png" alt="choose_native_plugins.png" />
</Frame>

在“云端插件选择”弹窗勾选上面购买的 ZEGO SDK 并确认。

</Step>

<Step title="导入 离线通知 SDK">
在 [即时通讯 - 下载](https://doc-zh.zego.im/zim-uniapp/client-sdks/sdk-downloads) 页面，获取最新版本的 ZPNs 原生插件 SDK，并解压得到的 “zego-ZPNsUniPlugin.zip” 文件。

将解压后获取的的文件夹，直接复制到您项目工程根目录下的 “nativeplugins” 文件夹，如果没有该目录，请手动创建。

    <Frame width="512" height="auto" caption="">
        <img src="https://doc-media.zego.im/sdk-doc/Pics/ZIM/ZPNS/uniapp/img1.jpeg" />
    </Frame>

    <Warning title="注意">
    由于 uni-app 原生插件的限制，ZPNs SDK 暂不支持通过插件市场下载插件，仅支持通过 ZEGO 官网下载获取。
    </Warning>
单击项目目录的 “manifest.json” 文件后，单击 “App原生插件配置” 中的 “选择本地插件” 。
  
    <Frame width="512" height="auto" caption="">
      <img src="https://doc-media.zego.im/sdk-doc/Pics/ZIM/ZPNS/uniapp/img2.jpeg" />
    </Frame>

在弹出的选择框中，选择 “Zego ZPNs 离线推送 SDK” 后，单击“确认”，即添加成功。

    <Frame width="512" height="auto" caption="">
        <img src="https://doc-media.zego.im/sdk-doc/Pics/ZIM/ZPNS/uniapp/img3.jpeg" />
    </Frame>
</Step>


<Step title="导入 Zego ZIM 即时通讯原生插件（JS 封装层）">
在插件市场下载 [Zego ZIM 即时通讯原生插件（JS 封装层）](https://ext.dcloud.net.cn/plugin?id=8648) 插件并导入 HBuilderX。
<Frame width="100%">
    <img src="https://media-resource.spreading.io/docuo/workspace743/b15828c70dcfacdbb1e91d99a16d0514/18428d374c.png" alt="choose_native_plugins.png" />
</Frame>
</Step>

<Step title="导入 离线通知 SDK（JS 封装层）">
在 [即时通讯 - 下载](https://doc-zh.zego.im/zim-uniapp/client-sdks/sdk-downloads) 页面获取最新版本的 ZPNs JS 插件 SDK ，并解压得到的 “zego-ZPNsUniPlugin-JS.zip” 文件。

将解压后内容放至工程目录中的 `js_sdk` 目录下，若不存在该目录的情况下，请先创建该目录。

<Frame width="512" height="auto" caption="">
    <img src="https://doc-media.zego.im/sdk-doc/Pics/ZIM/ZPNS/uniapp/img8.jpeg" />
</Frame>
</Step>

<Step title="导入 ZEGOUIKitPrebuiltCall">
在插件市场下载 [ZEGOUIKitPrebuiltCall](https://ext.dcloud.net.cn/plugin?id=19688) 插件并导入 HBuilderX。

<Frame width="100%">
    <img src="https://media-resource.spreading.io/docuo/workspace564/27e54a759d23575969552654cb45bf89/8fbac5726a.png" alt="download_and_import.png"/>
</Frame>

由于 zego-PrebuiltCall 中包含了 zego-UIKitCore 和 zego-ExpressUniAppzego-ExpressUniApp-JS以及zego-UIKitReport，因此，导入完成后，您的 uni_modules 会包含以下插件。

<Frame height="120px">
    <img src="https://media-resource.spreading.io/docuo/workspace743/b15828c70dcfacdbb1e91d99a16d0514/3c07b30ce4.png" alt="screenshot-20240909-101238.png"/>
</Frame>
</Step>

<Step title="创建自定义基座">
若您已创建好了基座，则跳过该步骤。若尚未创建，则创建自定义基座，填入 AppID。
<Note>

uni-app 官方自定义调试基座使用说明请参考 [什么是自定义调试基座及使用说明](https://uniapp.dcloud.net.cn/tutorial/run/run-app.html#customplayground)。
</Note>

<Frame width="50%">
    <img src="https://media-resource.spreading.io/docuo/workspace564/27e54a759d23575969552654cb45bf89/47d08e1b29.png" alt="run_with_custom.png"/>
</Frame>

<Frame width="80%">
    <img src="https://media-resource.spreading.io/docuo/workspace564/27e54a759d23575969552654cb45bf89/02f56f8dad.png" alt="config_custom.png"/>
</Frame>

<Note title="说明">
由于 iOS 项目需要 Apple 开发者证书。为方便测试，您可以暂时只勾选 Android 端。
</Note>

</Step>

<Step title="在业务页面中导入插件">

在 Vue 的 script 中使用导入 ZegoSendCallInvitationButton 组件与 ZegoUIKitPrebuiltCallService 预设服务，生成一份呼叫邀请预设配置，在 template 中使用 ZegoSendCallInvitationButton 组件，并调用ZegoUIKitPrebuiltCallService.init 将配置传入。

<Note title="说明">

除了预设配置，也可以自定义其他的配置。
</Note>

```vue title="pages/invite/index.vue" 
<template>
    <!-- 视频通话 -->
    <ZegoSendCallInvitationButton :type="ZegoInvitationType.VideoCall" :invitees="invitees" :onPressed="onPressed" />
    <!-- 语音通话 -->
    <ZegoSendCallInvitationButton :type="ZegoInvitationType.VoiceCall" :invitees="invitees" :onPressed="onPressed" />
</template>

<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount } from "vue"
import ZegoSendCallInvitationButton from "@/uni_modules/zego-PrebuiltCall/components/invitation/ZegoSendCallInvitationButton.vue"
import { ZegoInvitationType } from "@/uni_modules/zego-UIKitCore";
import ZegoUIKitPrebuiltCallService from "@/uni_modules/zego-PrebuiltCall/services/ZegoUIKitPrebuiltCallService";

const appID = '您在 ZEGO 控制台获取的 AppID';
const appSign = '您在 ZEGO 控制台获取的 AppSign';
const userID = '您的 userID';
const userName = '您的昵称';
const invitees = ref([{userID: '需要邀请的用户ID', userName: '需要邀请的用户名'}])

onMounted(() => {
    // 呼叫邀请配置
    const config = {}
    ZegoUIKitPrebuiltCallService.init(appID, appSign, userID, userName, config);
})

const onPressed = (code, message) => {
    // 邀请回调
}

onBeforeUnmount(() => {
    // 页面卸载时，需要调用 unInit 释放资源
    ZegoUIKitPrebuiltCallService.unInit();
})
</script>
```

更多邀请按钮参数请参考 [ZegoSendCallInvitationButton](/callkit-uniapp/api-reference/config#ZegoSendCallInvitationButton)

如果需要自定义通话按钮，可以通过调用 ZegoUIKitPrebuiltCallService.sendInvitation 来发起呼叫。

```vue title="pages/invite/index.vue"
<template>
    <view @click="handleSendInvitation">发起呼叫</view>
</template>

<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount } from "vue"
import ZegoSendCallInvitationButton from "@/uni_modules/zego-PrebuiltCall/components/invitation/ZegoSendCallInvitationButton.vue"
import { ZegoInvitationType } from "@/uni_modules/zego-UIKitCore";
import ZegoUIKitPrebuiltCallService from "@/uni_modules/zego-PrebuiltCall/services/ZegoUIKitPrebuiltCallService";
import { Navigation } from "@/uni_modules/zego-PrebuiltCall/utils/Navigation";

const appID = '您在 zego 控制台获取的 appID';
const appSign = '您在 zego 控制台获取的 appSign';
const userID = '您的 userID';
const userName = '您的昵称';
const invitees = ref([{userID: '需要邀请的用户ID', userName: '需要邀请的用户名'}])

onMounted(() => {
    // 呼叫邀请配置
    const config = {}
    ZegoUIKitPrebuiltCallService.init(appID, appSign, userID, userName, config);
})

const handleSendInvitation = () => {
    // 发起邀请参数
    const callInviteConfig = {
        invitees: invitees.value,
        type: ZegoInvitationType.VideoCall,
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
}

onBeforeUnmount(() => {
    // 页面卸载时，需要调用 unInit 释放资源
    ZegoUIKitPrebuiltCallService.unInit();
})
</script>
```
sendInvitation 参数请参考[CallInviteConfig](/callkit-uniapp/api-reference/config#CallInviteConfig)

</Step>
<Step title="配置入口与页面路由">
根据您的业务场景为通话页配置入口。
```vue title="pages/index/index.vue" {8-11}
<template>
    <view v-for="item in list" :key="item.name" @click="navigateTo(item.url)">
        {{ item.name }}
    </view>
</template>
<script lang="ts" setup>
const list = [
    {
        name: "呼叫邀请",
        url: "/pages/invite/index",
    },
]
const navigateTo = (url: string) => {
    uni.navigateTo({
        url
    })
}
</script>
```

打开 pages.json，添加 pages 配置
```json title="pages.json" {10-37}
{
	"pages": [
        // 首页
        {
            "path": "pages/index/index",
            "style": {
                "navigationBarTitleText": "首页"
            }
        },
        // 新增呼叫邀请页
        {
            "path": "pages/invite/index",
            "style": {
                "navigationBarTitleText": "呼叫邀请"
            }
        },
        {
            "path": "uni_modules/zego-PrebuiltCall/pages/invitation/ZegoCallInvitationWaiting",
            "style": {
                "disableSwipeBack": true,
                "navigationBarTitleText": "等待接通"
            }
        },
        {
            "path": "uni_modules/zego-PrebuiltCall/pages/invitation/ZegoCallInvitationRoom",
            "style": {
                "disableSwipeBack": true,
                "navigationBarTitleText": "通话界面"
            }
        },
        {
            "path": "uni_modules/zego-PrebuiltCall/pages/invitation/ZegoCallInvitee",
            "style": {
                "disableSwipeBack": true,
                "navigationBarTitleText": "收到呼叫"
            }
        }
	],
}
```


</Step>
</Steps>

## 运行和测试

至此，您已经完成了所有步骤！

只需在 HBuilderX 中点击**运行到手机或模拟器**，选择需要运行的端侧与基座，即可在设备上运行和测试您的应用程序。

## 相关指南

<CardGroup cols={2}>
    <Card title="呼叫邀请配置" href="/callkit-uniapp/calling-config/call-invitation-config">
    </Card>
</CardGroup>

## 资源

<CardGroup cols={2}>
    <Card title="示例代码" href="https://github.com/ZEGOCLOUD/zego_uikit_prebuilt_call_uniapp" target="_blank">
    获取完整示例代码。
    </Card>
</CardGroup>
