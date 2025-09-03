# 通知携带图片附件

## 概述

ZPNs 支持在发送离线推送时携带一张图片。

<Frame width="256" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/ZIM/ZPNS/push_with_photo.jpeg" /></Frame>

## 前提条件

- 已实现离线推送，详情请参考 [实现离线推送](/zim-android/offline-push-notifications/implement-offline-push-notification)。 
- Android 9.0 或以上版本 Android 设备或模拟器（推荐使用真机）。


## 通过全员推送服务端 API 发送

ZPNs 支持通过全员推送服务端 API 携带图片附件。该接口仅适用于全员推送场景，且仅支持 iOS、 Google FCM 和华为设备。

相关接口文档请参考 [全员推送](/zim-server/messaging/push-message-to-all-users)。

## 接收端处理

Android 端无需额外实现。
