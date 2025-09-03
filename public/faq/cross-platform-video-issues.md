<Title>如何解决 Web 平台和 Native 平台互通时出现的画面异常问题（如黑屏、绿屏、花屏等）？</Title>



- - -

## 问题描述

Web 平台用户接收 Native 平台用户发送的视频，或者 Native 平台用户接收 Web 平台用户发送的视频时，接收端看到的画面为黑屏、绿屏、花屏等。

<Note title="说明">


Native 平台主要指 Android、iOS、macOS 和 Windows 平台。

</Note>




## 问题原因

由于 Native SDK 发送的视频流默认为 H.264 编码，该问题可能是由于解码 H.264 视频流时出现异常导致的。

## 解决方案

可以通过如下步骤操作：

1. 调用 [checkSystemRequirements](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#check-system-requirements) 接口检测当前浏览器是否支持 H.264 编码格式，如果不支持该编码，则无法与 Native 平台互通。
2. 建议 Native 平台与 Web 平台均使用最新版本 SDK。
3. 建议 Web 平台使用最新版本的 Chrome 浏览器，并尝试关闭硬件加速：
    1. 在浏览器地址栏输入 “chrome://flags”。
    2. 将 **Hardware-accelerated video decode** 和 **Hardware-accelerated video encode** 均设置为 “Disabled”。
    3. 单击 “Relaunch” 重启浏览器。
<Frame width="512" height="auto" caption=""><Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/FAQ/hardware_disabled.png" /></Frame></Frame>
