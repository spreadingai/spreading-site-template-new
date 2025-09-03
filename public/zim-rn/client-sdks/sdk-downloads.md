# 下载 SDK

- - -

ZEGO 即时通讯（ZIM）SDK 由深圳市即构科技有限公司提供，您可以在本页面获取适用于 React Native 客户端的 ZIM SDK，当前可下载版本为 2.21.1，发布日志请参考 [发布日志 - ZIM](/zim-rn/client-sdks/zim-release-notes)，合规事宜请参考 [ZEGO 安全合规白皮书](https://doc-zh.zego.im/article/16142)。

| SDK | 说明 | 下载地址 | 相关文档 |
| --- | --- | --- | --- |
| ZIM | ZEGO 即时通讯 SDK | [ZIM SDK v2.21.1](https://www.npmjs.com/package/zego-zim-react-native) | <ul><li>[快速开始](/zim-rn/send-and-receive-messages)</li><li>[跑通示例源码](/zim-rn/sample-code)</li><li>[发布日志 - ZIM](/zim-rn/client-sdks/zim-release-notes)</li></ul> |
| ZPNs | 用于接收离线推送的 SDK | [ZPNs SDK v2.8.1](https://www.npmjs.com/package/zego-zpns-react-native) | <ul><li>[实现离线推送](/zim-rn/offline-push-notifications/implement-offline-push-notification)</li><li>[发布日志 - ZPNs](/zim-rn/client-sdks/zpns-release-notes)</li></ul> |
| zego_callkit | ZEGO 对 iOS CallKit 、PushKit 库的部分功能的独立封装，用于在 iOS 设备上实现 VoIP | [zego_callkit v1.0.0](https://www.npmjs.com/package/zego-callkit-react-native) | [CallKit 使用指南](/zim-rn/offline-push-notifications/best-practices/callkit-user-guide) |
| ZIM Audio | 支持完整的语音处理功能（包含采集、播放、噪声抑制（ANS）和自动增益控制（AGC）等功能） | [ZIM Audio SDK v1.0.0](https://www.npmjs.com/package/zego-zim-audio-react-native) | <ul><li>[语音组件 - 集成 SDK](/zim-rn/zim-audio/integrate-the-zim-audio-sdk)</li><li>[发送与接收语音消息](/zim-rn/zim-audio/send-and-receive-audio-messages)</li><li>[发布日志 - ZIM Audio](/zim-rn/client-sdks/zim-audio-release-notes)</li></ul> |

<Note title="说明">
- ZPNs SDK 封装了主流手机厂商的离线推送功能，支持华为、小米、OPPO、vivo、苹果和 Google 的推送，开发者请根据业务需要，选择是否集成 ZPNs SDK。
- ZPNs SDK 目前支持 Android、iOS、Flutter、Web、React Native 平台，请参考 [实现离线推送](/zim-rn/offline-push-notifications/implement-offline-push-notification)。
</Note>
