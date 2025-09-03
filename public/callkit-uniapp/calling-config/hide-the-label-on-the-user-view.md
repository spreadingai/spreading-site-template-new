# 隐藏用户视图标签

- - -

## 常用配置

默认情况下，音视频通话 UIKit 会在视图上方显示 `UserNameLabel`（用户名称）、`MicrophoneStateIcon`（麦克风状态） 和`CameraStateIcon`（摄像头状态）。如果不需要这些组件，可以使用 `audioVideoViewConfig` 中的以下三个配置来隐藏它们。

| 配置                                                                                                                                                                                                                                                            | 效果                                                                                                                                                 |
| :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------- |
| <ul><li><code>showMicrophoneStateOnView</code>：是否在视图上显示麦克风状态。默认显示。</li><li><code>showCameraStateOnView</code>：是否在视图上显示摄像头状态。默认显示。</li><li><code>showUserNameOnView</code>：是否在视图上显示用户名。默认显示。</li></ul> | <Frame width="256" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/ZegoUIKit/Flutter/_normal_switch_30_label.png" /></Frame> |


## 更多配置

### 隐藏声浪

当摄像头关闭时，音视频通话 UIKit 会在用户头像周围显示声浪。如果对声浪效果不满意，可以使用 `audioVideoViewConfig` 中的 `showSoundWavesInAudioMode` 配置实现隐藏。

<Content />

以下是参考代码：

<CodeGroup>
```js title="基本通话"
// Callkit.nvue
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
    audioVideoViewConfig: {
        showMicrophoneStateOnView: true, // 显示麦克风状态
        showCameraStateOnView: true, // 显示摄像头状态
        showUserNameOnView: false, // 不要显示用户名
        showSoundWavesInAudioMode: false, // 关闭摄像头时, 头像四周不要显示声浪
    },
    onHangUp: () => {
        // 挂断后返回上一页
        uni.navigateBack()
    },
};

</script>

```
</CodeGroup>