# ZPNs 发布日志

---

## 2.8.0 版本
**发布日期：2025-03-07**

**新增功能**

| <div style={{width:"130px"}}>功能项</div>  | 功能描述 | 相关接口 |
|-------|-------|-------|
| 厂商包分离 | 将 ZPNs 各个厂商的实现分别打包到对应的 ZPNs 厂商包中，您可以根据自身接入厂商的情况选择接入不同的 ZPNs 厂商包，从而避免依赖到不需要的厂商包，降低上架时不必要的审核风险。 | - |
| 自定义点击跳转 | 支持自定义用户点击消息推送通知后的跳转目标页面。用户点击行为会触发 [onNotificationClicked](https://pub.dev/documentation/zego_zpns/latest/zego_zpns/ZPNsEventHandler/onNotificationClicked.html) 回调，开发者即可获取透传信息并执行页面跳转逻辑，无需关注推送通道的差异。实现流程请参考 [自定义点击跳转](/zim-flutter/offline-push-notifications/custom-notification-click-redirection)。<Note title="说明">本功能仅适用于除 FCM 以外的 Android 推送通道和 Apple APNs 推送。</Note> | [onNotificationClicked](https://pub.dev/documentation/zego_zpns/latest/zego_zpns/ZPNsEventHandler/onNotificationClicked.html) |

## 2.6.0 版本

**发布日期：2023-11-23**

<Warning title="注意">

[升级到 2.6.0 版本的编译问题，升级前必看 >>](/zim-flutter/client-sdks/zpns-upgrade-guide#260-升级指南)
</Warning>

**新增功能**

| <div style={{width:"130px"}}>功能项</div>  | 功能描述 | 相关接口 |
|-------|-------|-------|
| 自定义通知图标 | 在离线推送默认展示 APP 的图标的基础上，您还可以凭借 ZPNs 自定义离线推送的通知图标，可用于在推送单聊、群聊消息时携带发送方头像，详情请参考 [自定义通知图标](/zim-flutter/offline-push-notifications/best-practices/custom-notification-icon)。 | - |
| 通知携带图片 | 支持在离线推送通知中携带一张图片，详情请参考 [通知携带图片附件](/zim-flutter/offline-push-notifications/best-practices/notify-with-photo-attachment)。 | <ul><li>[ZIMPushConfig > resourceID](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMPushConfig/resourcesID.html)</li><li>[全员推送](/zim-server/messaging/push-message-to-all-users)</li></ul> |
| 更新图标角标 | 支持用户离线情况下，更新 App 图标角标，提醒用户消息未读数，详情请参考 [更新图标角标](/zim-flutter/offline-push-notifications/best-practices/modify-a-notification-badge)。 | <ul><li>[setServerBadge](https://pub.dev/documentation/zego_zpns/latest/zego_zpns/ZPNs/setServerBadge.html)</li><li>[ZIMPushConfig > enableBadge](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMPushConfig/enableBadge.html)</li><li>[ZIMPushConfig > badgeIncrement](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMPushConfig/badgeIncrement.html)</li></ul> |
| 替换通知 | 支持撤回原来推送通知内容，详情请参考 [替换通知](/zim-flutter/offline-push-notifications/best-practices/update-a-push-notification)。 | - |


**新增功能**

| <div style={{width:"130px"}}>功能项</div>  | 功能描述 | 相关接口 |
|-------|-------|-------|
| 优化 iOS VoIP 开发体验 | 为方便 Flutter 开发者实现 VoIP 功能，ZEGO 将 iOS CallKit 、PushKit 库的部分功能封装到独立插件 zego_callkit，详情请参考 [CallKit 使用指南](/zim-flutter/offline-push-notifications/best-practices/callkit-user-guide)。 | - |

---

## 2.5.0 版本

**发布日期：2023-09-15**

**新增功能**

| <div style={{width:"130px"}}>功能项</div>  | 功能描述 | 相关接口 |
|-------|-------|-------|
| Web 开发 | 支持使用 Flutter 框架开发 Web 应用，实现离线推送，详情请参考 [离线推送 - Web 推送集成指南](/zim-flutter/offline-push-notifications/integrate-fcm-(for-web).mdx)。 | - |
| 本地日志 | 增加 ZPNs 本地日志组件，调用 ZIM SDK 的 [uploadLog](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/uploadLog.html)，即可同时上传 ZIM 和 ZPNs 的日志。 | [uploadLog](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/uploadLog.html) |
| 注销推送 | 支持注销离线推送，关闭推送通知。 | [unregisterPush](https://pub.dev/documentation/zego_zpns/2.5.0/zego_zpns/ZPNs/unregisterPush.html) |
| iOS 推送展示设置 | [registerPush](https://pub.dev/documentation/zego_zpns/latest/zego_zpns/ZPNs/registerPush.html) 新增参数 [ZPNsIOSNotificationArrivedConfig](https://pub.dev/documentation/zego_zpns/2.5.0/zego_zpns/ZPNsIOSNotificationArrivedConfig-class.html)，可在注册离线推送时指定是否展示 iOS 推送的弹窗、声音和角标。 | [ZPNsIOSNotificationArrivedConfig](https://pub.dev/documentation/zego_zpns/2.5.0/zego_zpns/ZPNsIOSNotificationArrivedConfig-class.html) |
| 向 Android 设备推送私信 | 支持通过安卓设备厂商的私信通道推送消息，实现无上限推送。如何创建私信通道，请查看 [小米](/zim-flutter/offline-push-notifications/integrate-xiaomi)、[华为](/zim-flutter/offline-push-notifications/integrate-huawei)、[OPPO](/zim-flutter/offline-push-notifications/integrate-oppo)、[vivo](/zim-flutter/offline-push-notifications/integrate-vivo) 推送集成指南的相关内容。 | [ZIMPushConfig > resourcesID](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMPushConfig/resourcesID.html) |

**改进优化**

| <div style={{width:"130px"}}>功能项</div> | 功能描述 | 相关接口 |
| -- | -- | -- |
| 自动检测 iOS 环境 | [ZPNsIOSEnvironment](https://pub.dev/documentation/zego_zpns/latest/zego_zpns/ZPNsIOSEnvironment.html) 枚举类新增 `Automatic`。开发者在调用 [registerPush](https://pub.dev/documentation/zego_zpns/latest/zego_zpns/ZPNs/registerPush.html) 注册离线推送时，如果不了解 iOS 环境，可传入此枚举，ZPNs 将自动识别环境。 | [ZPNsIOSEnvironment > Automatic](https://pub.dev/documentation/zego_zpns/latest/zego_zpns/ZPNsIOSEnvironment.html#Automatic) |
| 主动拉起 iOS Callkit 通话界面 | 新增 `reportIncomingCall` 接口，支持主动拉起 iOS Callkit 通话界面。 | `reportIncomingCall` |

**接口改动**

| <div style={{width:"130px"}}>功能项</div> | 功能描述 | 相关接口 |
| -- | -- | -- |
| 数据类成员变量类型变更 | [ZPNsMessage](https://pub.dev/documentation/zego_zpns/latest/zego_zpns/ZPNsMessage-class.html) 中的 extras 的类型由 Map 字段的 value 类型由 Map\<String, Object> 修改为 Map\<String, Object?> 类型，以兼容 Json 转 map 时，value 可能为 null 的情况。详情请参考 [ZPNs 升级指南 - 2.5.0 升级指南 ](https://doc-zh.zego.im/article/17218#2_5_0)。 | [ZPNsMessage > extras](https://pub.dev/documentation/zego_zpns/latest/zego_zpns/ZPNsMessage/extras.html) |

---

## 2.3.2 版本

**发布日期：2023-04-21**

**接口改动**

| <div style={{width:"130px"}}>功能项</div> | 功能描述 | 相关接口 |
| -- | -- | -- |
| 接口改动 | `CallKitEventHandler` 中 `performSetMutedCallAction` 回调方法变更为 `performSetMutedCallAction` | `performSetMutedCallAction` |

**问题修复**

修复已知问题。

---

## 2.3.1 版本

**发布日期：2023-03-29**

**接口改动**

| <div style={{width:"130px"}}>功能项</div> | 功能描述 | 相关接口 |
| -- | -- | -- |
| 接口改动 | <ul><li>新增 setBackgroundMessageHandler 接口用于设置安卓静默推送所触发的回调。</li><li>didReceiveIncomingPushWithPayload 方法更名为 didReceiveIncomingPush，参数由 payload 和 completion 变更为 extras 和 uuid。</li></ul> | <ul><li>[setBackgroundMessageHandler](https://pub.dev/documentation/zego_zpns/latest/zego_zpns/ZPNs/setBackgroundMessageHandler.html)</li><li>`didReceiveIncomingPush`</li></ul> |

**问题修复**

修复已知问题。

---

## 2.3.0 版本

**发布日期：2023-03-14**

**新增功能**

| <div style={{width:"130px"}}>功能项</div> | 功能描述 | 相关接口 |
| -- | -- | -- |
| 支持 iOS VoIP 推送类型 | 支持通过 iOS CallKit 实现 VoIP 通知功能。 | - |
| 封装 iOS CallKit 系统 API | 封装了 iOS CallKit，方便跨平台用户使用。 | - |
| 支持静默推送 | 支持通过静默推送，同步处于后台运行的 App 和服务端的数据。 | - |
| 封装 Android 发送本地通知 API | Flutter 发送本地通知接口现在支持 Android 平台。 | [addLocalNotification](https://pub.dev/documentation/zego_zpns/latest/zego_zpns/ZPNs/addLocalNotification.html) |

**接口改动**

| <div style={{width:"130px"}}>功能项</div> | 功能描述 | 相关接口 |
| -- | -- | -- |
| 接口改动 | 基于 iOS 对于实现静默推送的要求，[onThroughMessageReceived](https://pub.dev/documentation/zego_zpns/latest/zego_zpns/ZPNsEventHandler/onThroughMessageReceived.html) 回调方法新增了参数 `iOSOnThroughMessageReceiveCompletion`，以便当 [onThroughMessageReceived](https://pub.dev/documentation/zego_zpns/latest/zego_zpns/ZPNsEventHandler/onThroughMessageReceived.html) 触发的操作结束后，调用 `iOSOnThroughMessageReceiveCompletion()` 向 iOS 系统通知相关操作已完成。 | [onThroughMessageReceived](https://pub.dev/documentation/zego_zpns/latest/zego_zpns/ZPNsEventHandler/onThroughMessageReceived.html) |

---

## 2.2.0 版本

**发布日期：2023-01-11**

**新增功能**

| <div style={{width:"130px"}}>功能项</div> | 功能描述 | 相关接口 |
| -- | -- | -- |
| 封装 Android 创建 channel 功能 | 针对 Android 8.0 以上自定义铃声需要创建 channel 通道，flutter 简单封装了此 API，方便客户使用。 | [createNotificationChannel](https://pub.dev/documentation/zego_zpns/latest/zego_zpns/ZPNs/createNotificationChannel.html) |
| 封装 iOS 发送本地通知功能 | 简单封装 iOS 发送本地通知功能，方便开发者使用。 | [addLocalNotification](https://pub.dev/documentation/zego_zpns/latest/zego_zpns/ZPNs/addLocalNotification.html) |

**改进优化**

| <div style={{width:"130px"}}>功能项</div> | 功能描述 | 相关接口 |
| -- | -- | -- |
| 接口改动 | <ul><li>区分了静态函数和成员函数。</li><li>删除了无意义的异步返回值。</li><li>[enableDebug](https://pub.dev/documentation/zego_zpns/latest/zego_zpns/ZPNs/enableDebug.html) 不再对齐iOS/Andorid 两个平台，仅限在 Android 使用。</li><li>[registerPush](https://pub.dev/documentation/zego_zpns/latest/zego_zpns/ZPNs/registerPush.html) 增加可选具名参数 [ZPNsIOSEnvironment](https://pub.dev/documentation/zego_zpns/latest/zego_zpns/ZPNsIOSEnvironment.html)。如果在 iOS 环境运行且没有填写此参数，ZPNs SDK 会抛异常提醒。</li><li>[ZPNsEventHandler](https://pub.dev/documentation/zego_zpns/latest/zego_zpns/ZPNsEventHandler-class.html) 各接口的 ZPNsMessage 中，extendedData 字符串改为了 extra 字典，以解决上架谷歌商店潜在的审核问题。</li></ul> | - |

---

## 2.1.3 版本

**发布日期：2022-09-01**

**改进优化**

| <div style={{width:"130px"}}>功能项</div> | 功能描述 | 相关接口 |
| -- | -- | -- |
| Android 版本兼容 | 兼容 Android 12 版本。 | - |

---

## 2.1.2 版本

**发布日期：2022-08-31**

**问题修复**

修复了一个有关 Android 依赖的错误。

---

## 2.1.1 版本

**发布日期：2022-08-28**

**问题修复**

修复已知问题。

---

## 2.1.0 版本

**发布日期：2022-07-28**

ZPNs SDK 首次发布，支持接收 Apple、华为、小米、OPPO、vivo 五个厂商的离线推送。若需使用，请搭配 ZIM SDK。

| <div style={{width:"130px"}}>功能项</div>  | 功能描述 | 相关接口 |
|-------|-------|-------|
| 注册离线推送  | 注册厂商通道的离线推送，使用前请先配置好需要使用的厂商信息。 | <ul><li>[setPushConfig](https://pub.dev/documentation/zego_zpns/latest/zego_zpns/ZPNs/setPushConfig.html)</li><li>[registerPush](https://pub.dev/documentation/zego_zpns/latest/zego_zpns/ZPNs/registerPush.html)</li></ul> |
| 接收厂商通知点击回调 | 各厂商的通知点击回调，统一在相关接口抛出。 | [onNotificationClicked](https://pub.dev/documentation/zego_zpns/latest/zego_zpns/ZPNsEventHandler/onNotificationClicked.html)|
| 接收厂商通知展示回调 | 厂商通知展示回调，统一在此接口抛出。 | [onNotificationArrived](https://pub.dev/documentation/zego_zpns/latest/zego_zpns/ZPNsEventHandler/onNotificationArrived.html)|
