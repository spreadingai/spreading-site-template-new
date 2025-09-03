# 实现挂断确认对话框


在默认情况下，当用户点击“结束通话”按钮时，音视频通话 UIKit 会直接结束通话。但是您也可以设置**确认对话框**来双重确认用户是否要挂断通话。

<Frame width="128" height="auto" caption="">
  <img src="https://media-resource.spreading.io/docuo/workspace733/92cf2c578a7f03194465a905bb923c76/d76f37b751.jpeg" alt="hang-up-confirm.jpeg"/>
</Frame>

## 实现流程

使用 `hangUpConfirmInfo` 配置：在配置了 `hangUpConfirmInfo` 参数之后，音视频通话 UIKit 将在结束通话之前弹出一个带有默认样式的确认对话框，显示您设置的确认信息。

以下是参考代码：

<CodeGroup>
```js title="基本通话"
<template>
    <ZegoUIKitPrebuiltCall :appID="appID" :callID="callID" :appSign="appSign" :userID="userID" :userName="userName"
        :config="config">
    </ZegoUIKitPrebuiltCall>
</template>
<script lang="ts" setup>
import { ref } from "vue"
import keyCenter from "@/pages/KeyCenter";
import ZegoUIKitPrebuiltCall from "@/uni_modules/zego-PrebuiltCall/components/ZegoUIKitPrebuiltCall.nvue"
import { ZegoUIKitPrebuiltCallConfig } from "@/uni_modules/zego-PrebuiltCall"

const appID = ref(keyCenter.getAppID());
const appSign = ref(keyCenter.getAppSign());
const userID = ref(keyCenter.getUserID());
const userName = ref(keyCenter.getUserID() + '_Nick');
const callID = ref(keyCenter.getCallID());

const config: ZegoUIKitPrebuiltCallConfig = {
    ...ZegoUIKitPrebuiltCallConfig.oneOnOneVideoCall(), // 预设配置
    hangUpConfirmInfo: {
        title: "离开房间",
        message: "你确定要离开房间吗?",
        cancelButtonName: "取消",
        confirmButtonName: "确定"
    },
    onHangUp: () => {
        // 挂断后返回上一页
        uni.navigateBack()
    },
};

</script>
```
</CodeGroup>

## 监听挂断事件

您可以通过监听 `onHangUp` 事件，在用户挂断通话时返回到上一页面或者首页。

另外，如果默认的对话框样式不能满足您的需求，或者您想要弹出一个更复杂的对话框，那么您可以使用 `onHangUpConfirmation` 参数。这个参数需要一个函数类型的值，并且要求该函数返回一个 `Promise`。您可以在 `Promise` 中设置您想要弹出的确认对话框。

当然，您也可以在这个回调中实现决定是否结束通话的逻辑，或者根据需要实现任何其他业务逻辑。



以下是参考代码：

<CodeGroup>
```js title="基本通话"
<template>
    <ZegoUIKitPrebuiltCall :appID="appID" :callID="callID" :appSign="appSign" :userID="userID" :userName="userName"
        :config="config">
    </ZegoUIKitPrebuiltCall>
</template>
<script lang="ts" setup>
import { ref } from "vue"
import keyCenter from "@/pages/KeyCenter";
import ZegoUIKitPrebuiltCall from "@/uni_modules/zego-PrebuiltCall/components/ZegoUIKitPrebuiltCall.nvue"
import { ZegoUIKitPrebuiltCallConfig } from "@/uni_modules/zego-PrebuiltCall"

const appID = ref(keyCenter.getAppID());
const appSign = ref(keyCenter.getAppSign());
const userID = ref(keyCenter.getUserID());
const userName = ref(keyCenter.getUserID() + '_Nick');
const callID = ref(keyCenter.getCallID());

const config: ZegoUIKitPrebuiltCallConfig = {
    ...ZegoUIKitPrebuiltCallConfig.oneOnOneVideoCall(), // 预设配置
    onHangUpConfirmation: () => {
        return new Promise((resolve, reject) => {
            uni.showModal({
                title: "离开房间",
                content: "你确定要离开房间吗?",
                showCancel: true,
                confirmText: "确定",
                cancelText: "取消",
                success: function (res) {
                    if (res.confirm) {
                        resolve(true)
                    } else if (res.cancel) {
                        resolve(false)
                    }
                }
            });
        });
    },
    onHangUp: () => {
        // 挂断后返回上一页
        uni.navigateBack()
    },
};

</script>
```
</CodeGroup>
