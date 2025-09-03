# ZPNs 发布日志

---

## 2.7.0 版本

**发布日期：2024-08-28**

ZPNs uni-app SDK 首次发布，支持接收 Apple、Google、华为、小米、OPPO、vivo 六个厂商的离线推送。若需使用，请搭配 ZIM SDK。

| <div style={{width:"130px"}}>功能项</div>  | 功能描述 | 相关接口 |
|-------|-------|-------|
| 注册离线推送  | 注册厂商通道的离线推送，使用前请先配置好需要使用的厂商信息。 | <ul><li>[setPushConfig](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_uni-app~class~ZPNs#set-push-config)</li><li>[registerPush](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_uni-app~class~ZPNs#register-push)</li></ul> |
| 接收厂商通知展示回调 | 各厂商通知展示回调，统一在此接口抛出。 | [notificationArrived](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_uni-app~class~ZPNsEventHandler#notification-clicked)|
| 接收厂商透传消息回调 | 各厂商透传消息回调，统一在此接口抛出。| [throughMessageReceived](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_uni-app~class~ZPNsEventHandler#through-message-received) |
| 发送本地通知 | 支持发送本地通知，向用户弹窗展示信息。 | [addLocalNotification](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_uni-app~class~ZPNs#add-local-notification) |
| 向 Android 设备推送私信 | 支持通过安卓设备厂商的私信通道推送消息，实现无上限推送。如何创建私信通道，请查看 [小米](/zim-uniapp/offline-push-notifications/integrate-xiaomi)、[华为](/zim-uniapp/offline-push-notifications/integrate-huawei)、[OPPO](/zim-uniapp/offline-push-notifications/integrate-oppo)、[vivo](/zim-uniapp/offline-push-notifications/integrate-vivo) 推送集成指南的相关内容。 | [ZIMPushConfig > resourcesID](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_uni-app~interface~ZIMPushConfig#resources-id) |
| 自定义通知图标 | 在离线推送默认展示 APP 的图标的基础上，您还可以凭借 ZPNs 自定义离线推送的通知图标，可用于在推送单聊、群聊消息时携带发送方头像，详情请参考 [自定义通知图标](/zim-uniapp/offline-push-notifications/best-practices/modify-a-notification-badge)。 | - |
| 通知携带图片 | 支持在离线推送通知中携带一张图片，详情请参考 [通知携带图片附件](/zim-uniapp/offline-push-notifications/best-practices/notify-with-photo-attachment)。 | <ul><li>[ZIMPushConfig > resourcesID](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_uni-app~interface~ZIMPushConfig#resources-id)</li><li>[全员推送](/zim-server/messaging/push-message-to-all-users)</li></ul> |
| 替换通知 | 支持撤回原来推送通知内容，详情请参考 [替换通知](/zim-uniapp/offline-push-notifications/best-practices/update-a-push-notification)。 | - |
| 注销推送 | 支持注销离线推送，关闭推送通知。 | [unregisterPush](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_uni-app~class~ZPNs#unregister-push) |
