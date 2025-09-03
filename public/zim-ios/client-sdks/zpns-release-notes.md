# ZPNs 发布日志

---
## 2.7.0 版本

**发布日期：2024-07-01**

**新增功能**


| <div style={{width:"130px"}}>功能项</div>  | 功能描述 | 相关接口 |
|-------|-------|-------|
| 支持 iOS 17.0 | 注意：从此版本起，ZPNs 不再支持 iOS 11.0 及此前版本。<br />从 2024-04-29 开始，所有上架 App Store 的应用必须支持 iOS 17.0 版本，详情请参考 [Apple 开发者网站官方说明](https://developer.apple.com/news/upcoming-requirements/?id=04292024a)。 | - |

---

## 2.6.0 版本

**发布日期：2023-11-22**

**新增功能**

| <div style={{width:"130px"}}>功能项</div>  | 功能描述 | 相关接口 |
|-------|-------|-------|
| 自定义通知图标 | 在离线推送默认展示 APP 的图标的基础上，您还可以凭借 ZPNs 自定义离线推送的通知图标，可用于在推送单聊、群聊消息时携带发送方头像，详情请参考 [自定义通知图标](/zim-ios/offline-push-notifications/best-practices/modify-a-notification-badge)。 | - |
| 通知携带图片 | 支持在离线推送通知中携带一张图片，详情请参考 [通知携带图片附件](/zim-ios/offline-push-notifications/best-practices/notify-with-photo-attachment)。 | <ul><li>[ZIMPushConfig > resourcesID](https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_ios~class~ZIMPushConfig#resources-id)</li><li>[全员推送](/zim-server/messaging/push-message-to-all-users)</li></ul> |
| 更新图标角标 | 支持用户离线情况下，更新 App 图标角标，提醒用户消息未读数，详情请参考 [更新图标角标](/zim-ios/offline-push-notifications/best-practices/modify-a-notification-badge)。 | <ul><li>[setBadge](https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_ios~protocol~ZPNs#set-badge-badge)</li><li>[ZIMPushConfig > enableBadge](https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_ios~class~ZIMPushConfig#enable-badge)</li><li>[ZIMPushConfig > badgeIncrement](https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_ios~class~ZIMPushConfig#badge-increment)</li></ul> |
| 替换通知 | 支持撤回原来推送通知内容，详情请参考 [替换通知](/zim-ios/offline-push-notifications/best-practices/update-a-push-notification)。 | - |

---


## 2.5.0 版本

**发布日期：2023-09-14**

**新增功能**

| <div style={{width:"130px"}}>功能项</div>  | 功能描述 | 相关接口 |
|-------|-------|-------|
| 本地日志 | 增加 ZPNs 本地日志组件，调用 ZIM SDK 的 [uploadLog](https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_ios~protocol~ZIM#upload-log)，即可同时上传 ZIM 和 ZPNs 的日志。 | [uploadLog](https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_ios~protocol~ZIM#upload-log) |
| 注销推送 | 支持注销离线推送，关闭推送通知。 | [unregisterAPNs](https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_ios~class~ZPNsManager#unregister-ap-ns) |

---

## 2.1.0 版本

**发布日期：2023-03-07**

**新增功能**

| <div style={{width:"130px"}}>功能项</div>  | 功能描述 | 相关接口 |
|-------|-------|-------|
| 增加包管理方式 | 增加 Swift Package Manager 包管理方式。 | - |
| 支持静默推送 | 支持通过静默推送，同步处于后台运行的 App 和服务端的数据。 | - |
| 支持 VoIP 推送类型 | 支持通过 iOS Callkit 实现 VoIP 通知功能。 | - |

---

## 2.0.1 版本

**发布日期：2022-04-29**

**问题修复**

修复已知问题。

---

## 2.0.0 版本

**发布日期：2022-03-21**

ZPNs SDK 首次发布，支持接收 Apple APNs 离线推送。若需使用，请同时搭配 ZIM SDK 接入。
| <div style={{width:"130px"}}>功能项</div>  | 功能描述 | 相关接口 |
|-------|-------|-------|
| 注册 APNs 推送 | 在开发者正确配置证书和工程信息后，调用注册 APNs 推送的接口，使系统生成 deviceToken，并将 deviceToken 传入 SDK 绑定即可使用。 | <ul><li>[registerAPNs](https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_ios~protocol~ZPNs#register-ap-ns)</li><li>[setDeviceToken](https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_ios~protocol~ZPNs#set-device-token-is-product)</li><li>[onRegistered](https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_ios~protocol~ZPNs#on-registered-pushid)</li></ul> |
| App 前台接收推送消息 | 当 App 位于前台时，收到离线推送信息的时候将会触发此通知 | [willPresentNotification](https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_ios~protocol~ZPNs#zp-ns-notification-center-will-present-notification-user-info-with-completion-handler) |
| 点击弹窗回调通知 | 当 App 位于后台或已被杀进程的时候，收到离线推送将会弹出系统弹窗。点击弹窗进入 App 之后将会触发此回调。 | [didReceiveNotificationResponse](https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_ios~protocol~ZPNs#zp-ns-notification-center-did-receive-notification-response-with-completion-handler) |
| 添加一条本地推送 | 调用该接口本地触发一次推送弹窗。可用于 App 还在线或刚推入后台未冻结时，本地补一条推送通知等用途。 | [addLocalNotificationWithContent](https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_ios~protocol~ZPNs#add-local-notification-with-content-content-trigger-completion-handler) |
