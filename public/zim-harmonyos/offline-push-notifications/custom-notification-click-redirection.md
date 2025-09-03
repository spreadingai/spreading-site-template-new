# 自定义点击跳转


## 描述

通常，用户点击离线推送通知时，会跳转到应用首页。基于本功能，开发者可以自定义离线推送通知的点击跳转逻辑，比如用户在点击推送消息时，能够跳转到指定页面，从而提升用户体验和交互效率。

## 前提条件

在实现自定义点击跳转之前，请确保：
- 已集成 2.8.0 或以上版本的 ZPNs SDK，详情请参考 [实现离线推送](/zim-harmonyos/offline-push-notifications/implement-offline-push-notification)。
- 已在控制台配置离线推送证书，详情请参考控制台文档 [服务配置 - 即时通讯 - 离线推送配置](https://doc-zh.zego.im/article/16233)。

## 实现流程

1. 参考 HarmonyOS Push Kit [发送通知消息 - 点击消息进入应用内页](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/push-send-alert#section8794131614597)，在工程内配置 `uris` 参数，用于点击消息进入应用内页。

2. 在 [ZEGO 控制台](https://console.zego.im) 配置 `resourceID`。这个 `resourceID` 的 `click_type` 为 1（打开应用自定义页面），`url` 为上一步在工程内配置的 `uris` 参数其中的一个地址。

3. 发送消息时，在 `ZIMPushConfig` 中携带该 `resourceID` 即可。