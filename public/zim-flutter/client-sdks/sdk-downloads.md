# 下载 SDK

- - -

ZEGO 即时通讯（ZIM）SDK 由深圳市即构科技有限公司提供，您可以在本页面获取适用于 Flutter 的 ZIM SDK，当前可下载版本为 2.21.1，发布日志请参考 [发布日志 - ZIM](/zim-flutter/client-sdks/zim-release-notes)，合规事宜请参考 [ZEGO 安全合规白皮书](https://doc-zh.zego.im/article/16142)。

| SDK | 说明 | 下载地址 | 相关文档 |
| --- | --- | --- | --- |
| ZIM | ZEGO 即时通讯 SDK | <ul><li>[ZIM SDK v2.21.1<br />（不适用于 HarmonyOS）](https://pub.dev/packages/zego_zim/install)</li><li>[ZIM SDK v2.19.0<br />（适用于 HarmonyOS）](https://artifact-sdk.zego.im/zim/sdk/flutter/ohos/zego_zim_2.19.0.zip)</li></ul> | <ul><li>[实现基本消息收发](/zim-flutter/send-and-receive-messages)</li><li>[跑通示例源码](/zim-flutter/sample-code)</li><li>[发布日志 - ZIM](/zim-flutter/client-sdks/zim-release-notes)</li></ul> |
| ZPNs | 用于接收离线推送的 SDK | [ZPNs SDK v2.8.0](https://pub.dev/packages/zego_zpns/install) | <ul><li>[实现离线推送](/zim-flutter/offline-push-notifications/implement-offline-push-notification)</li><li>[发布日志 - ZPNs](/zim-flutter/client-sdks/zpns-release-notes)</li></ul> |
| zego_callkit | ZEGO 对 iOS CallKit 、PushKit 库的部分功能的独立封装，用于在 iOS 设备上实现 VoIP | [zego_callkit v1.0.0](https://pub.dev/packages/zego_callkit/install) | [CallKit 使用指南](/zim-flutter/offline-push-notifications/best-practices/callkit-user-guide) |
| ZIM Audio | 支持完整的语音处理功能（包含采集、播放、噪声抑制（ANS）和自动增益控制（AGC）等功能） | [ZIM Audio SDK v1.0.0](https://pub.dev/packages/zego_zim_audio/install) | <ul><li>[语音组件 - 集成 SDK](/zim-flutter/zim-audio/integrate-the-zim-audio-sdk)</li><li>[发送与接收语音消息](/zim-flutter/zim-audio/send-and-receive-audio-messages)</li><li>[发布日志 - ZIM Audio](/zim-flutter/client-sdks/zim-audio-release-notes)</li></ul> |

<Note title="说明">
- 适用于 Flutter 框架的 ZIM SDK 包含以下两种：
  - 不适用 HarmonyOS：支持 iOS、Android、macOS、Windows 和 Web 端应用开发。
  - 适用 HarmonyOS：支持 iOS、Android、HarmonyOS、macOS、Windows 和 Web 端应用开发。此 SDK 要求依赖 [适配 OpenHarmony 的 Flutter](https://gitee.com/openharmony-sig/flutter_flutter)。
- ZPNs SDK 封装了主流手机厂商的离线推送功能，支持华为、小米、OPPO、vivo、苹果和 Google 的推送，开发者请根据业务需要，选择是否集成 ZPNs SDK。
- ZPNs SDK 目前支持 Android、iOS、Flutter、Web、React Native 平台，请参考 [实现离线推送](/zim-flutter/offline-push-notifications/implement-offline-push-notification)。
</Note>
