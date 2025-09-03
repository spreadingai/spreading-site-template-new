# ZPNs 发布日志

---
## 2.8.1 版本

**发布日期：2025-03-19**

**问题修复**

修复已知问题。

---

## 2.8.0 版本
**发布日期：2025-03-07**

**新增功能**

| <div style={{width:"130px"}}>功能项</div>  | 功能描述 | 相关接口 |
|-------|-------|-------|
| 厂商包分离 | 将 ZPNs 各个厂商的实现分别打包到对应的 ZPNs 厂商包中，您可以根据自身接入厂商的情况选择接入不同的 ZPNs 厂商包，从而避免依赖到不需要的厂商包，降低上架时不必要的审核风险。 | - |
| 自定义点击跳转 | 支持自定义用户点击消息推送通知后的跳转目标页面。用户点击行为会触发 [notificationClicked](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_react-native~class~ZPNsEventHandler#notification-clicked) 回调，开发者即可获取透传信息并执行页面跳转逻辑，无需关注推送通道的差异。实现流程请参考 [自定义点击跳转](/zim-rn/offline-push-notifications/custom-notification-click-redirection)。<Note title="说明">本功能仅适用于除 FCM 以外的 Android 推送通道和 Apple APNs 推送。</Note> | [notificationClicked](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_react-native~class~ZPNsEventHandler#notification-clicked) |

## 2.6.5 版本

**发布日期：2024-08-06**

**问题修复**

修复已知问题。

---

## 2.6.0 版本

**发布日期：2023-11-28**

<Warning title="注意">

[升级到 2.6.0 版本的编译问题，升级前必看 >>](/zim-rn/client-sdks/zpns-upgrade-guide#260-升级指南)
</Warning>

**新增功能**

|  <div style={{width:"130px"}}>功能项</div>  | 功能描述 | 相关接口 |
|-------|-------|-------|
| 自定义通知图标 | 在离线推送默认展示 APP 的图标的基础上，您还可以凭借 ZPNs 自定义离线推送的通知图标，可用于在推送单聊、群聊消息时携带发送方头像，详情请参考 [自定义通知图标](/zim-rn/offline-push-notifications/best-practices/custom-notification-icon)。 | - |
| 通知携带图片 | 支持在离线推送通知中携带一张图片，详情请参考 [通知携带图片附件](/zim-rn/offline-push-notifications/best-practices/notify-with-photo-attachment)。 | <ul><li>[ZIMPushConfig > resourcesID](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_react-native~interface~ZIMPushConfig#resources-id)</li><li>[全员推送](/zim-server/messaging/push-message-to-all-users)</li></ul> |
| 更新图标角标 | 支持用户离线情况下，更新 App 图标角标，提醒用户消息未读数，详情请参考 [更新图标角标](/zim-rn/offline-push-notifications/best-practices/modify-a-notification-badge)。 | <ul><li>[setServerBadge](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_react-native~class~ZPNs#set-server-badge)</li><li>[ZIMPushConfig > enableBadge](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_react-native~interface~ZIMPushConfig#enable-badge)</li><li>[ZIMPushConfig > badgeIncrement](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_react-native~interface~ZIMPushConfig#badge-increment)</li></ul> |
| 替换通知 | 支持撤回原来推送通知内容，详情请参考 [替换通知](/zim-rn/offline-push-notifications/best-practices/update-a-push-notification)。 | - |
| 优化 iOS VoIP 开发体验 | 为方便 React Native 开发者实现 VoIP 功能，ZEGO 将 iOS CallKit 、PushKit 库的部分功能封装到独立插件 zego_callkit，详情请参考 [CallKit 使用指南](/zim-rn/offline-push-notifications/best-practices/callkit-user-guide)。 | - |

---

## 2.5.0 版本

**发布日期：2023-09-22**

**新增功能**

|  <div style={{width:"130px"}}>功能项</div>  | 功能描述 | 相关接口 |
|-------|-------|-------|
| 本地日志 | 增加 ZPNs 本地日志组件，调用 ZIM SDK 的 [uploadLog](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_react-native~class~ZIM#upload-log)，即可同时上传 ZIM 和 ZPNs 的日志。 | [uploadLog](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_react-native~class~ZIM#upload-log) |
| 注销推送 | 支持注销离线推送，关闭推送通知。 | [unregisterPush](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_react-native~class~ZPNs#unregister-push) |
| iOS 推送展示设置 | [registerPush](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_react-native~class~ZPNs#register-push) 新增参数 [ZPNsIOSNotificationArrivedConfig](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_react-native~interface~ZPNsIOSNotificationArrivedConfig)，可在注册离线推送时指定是否展示 iOS 推送的弹窗、声音和角标。 | [ZPNsIOSNotificationArrivedConfig](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_react-native~interface~ZPNsIOSNotificationArrivedConfig) |
| 向 Android 设备推送私信 | 支持通过安卓设备厂商的私信通道推送消息，实现无上限推送。如何创建私信通道，请查看 [小米](/zim-rn/offline-push-notifications/integrate-xiaomi)、[华为](/zim-rn/offline-push-notifications/integrate-huawei)、[OPPO](/zim-rn/offline-push-notifications/integrate-oppo)、[vivo](/zim-rn/offline-push-notifications/integrate-vivo) 推送集成指南的相关内容。 | [ZIMPushConfig > resourcesID](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_react-native~interface~ZIMPushConfig#resources-id) |

**改进优化**

|  <div style={{width:"130px"}}>功能项</div> | 功能描述 | 相关接口 |
| -- | -- | -- |
| 自动检测 iOS 环境 | [ZPNsIOSEnvironment](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_react-native~enum~ZPNsIOSEnvironment) 枚举类新增 `Automatic`。开发者在调用 [registerPush](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_react-native~class~ZPNs#register-push) 注册离线推送时，如果不了解 iOS 环境，可传入此枚举，ZPNs 将自动识别环境。 | [ZPNsIOSEnvironment > Automatic](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_react-native~enum~ZPNsIOSEnvironment#automatic) |
| 主动拉起 iOS Callkit 通话界面 | 新增 `reportIncomingCall` 接口，支持主动拉起 iOS Callkit 通话界面，详情请参考 [实现 VoIP 通知 - 主动拉起 iOS CallKit 来电界面](/zim-rn/offline-push-notifications/implement-voip-notification#reportIncomingCall)。 | `reportIncomingCall` |

---

## 2.3.3 版本

**发布日期：2023-04-03**

**新增功能**

|  <div style={{width:"130px"}}>功能项</div>  | 功能描述 | 相关接口 |
|-------|-------|-------|
| 支持静默推送 | 支持通过静默推送，同步处于后台运行的 App 和服务端的数据。 | <ul><li>[setBackgroundMessageHandler](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_react-native~class~ZPNs#set-background-message-handler)</li><li>[throughMessageReceived](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_react-native~class~ZPNsEventHandler#through-message-received)</li></ul>|
| 支持 iOS VoIP | 支持通过 iOS CallKit 实现 VoIP 通知功能。 | - |
| 封装 Android 创建 channel 功能 | 针对 Android 8.0 以上自定义铃声需要创建 channel 通道，ZPNs React Native SDK 简单封装了此 API，方便客户使用。 | [createNotificationChannel](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_react-native~class~ZPNs#create-notification-channel) |
| 发送本地通知 | 支持发送本地通知，向用户弹窗展示信息。 | [addLocalNotification](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_react-native~class~ZPNs#add-local-notification) |

---

## 2.2.0 版本

**发布日期：2022-12-07**

ZPNs SDK 首次发布，支持接收 Apple、Google、华为、小米、OPPO、vivo 六个厂商的离线推送。若需使用，请搭配 ZIM SDK。

| <div style={{width:"130px"}}>功能项</div>  | 功能描述 | 相关接口 |
|-------|-------|-------|
| 注册离线推送  | 注册厂商通道的离线推送，使用前请先配置好需要使用的厂商信息。 | <ul><li>[setPushConfig](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_react-native~class~ZPNs#set-push-config)</li><li>[registerPush](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_react-native~class~ZPNs#register-push)</li></ul> |
| 接收厂商通知点击回调 | 各厂商的通知点击回调，统一在相关接口抛出。 | [notificationClicked](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_react-native~class~ZPNsEventHandler#notification-clicked)|
| 接收厂商通知展示回调 | 各厂商通知展示回调，统一在此接口抛出。 | [notificationArrived](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_react-native~class~ZPNsEventHandler#notification-clicked)|
| 接收厂商透传消息回调 | 各厂商透传消息回调，统一在此接口抛出。| [throughMessageReceived](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_react-native~class~ZPNsEventHandler#through-message-received) |
