# ZPNs 发布日志

---

## 2.8.0 版本
**发布日期：2025-03-07**

**新增功能**

| <div style={{width:"130px"}}>功能项</div>  | 功能描述 | 相关接口 |
|-------|-------|-------|
| 自定义点击跳转 | 支持自定义用户点击消息推送通知后的跳转目标页面。用户点击行为会触发 [onNotificationClicked](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZPNsMessageReceiver#on-notification-clicked) 回调，开发者即可获取透传信息并执行页面跳转逻辑，无需关注推送通道的差异。实现流程请参考 [自定义点击跳转](/zim-android/offline-push-notifications/custom-notification-click-redirection)。<Note title="说明">本功能仅适用于除 FCM 以外的 Android 推送通道。</Note> | [onNotificationClicked](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZPNsMessageReceiver#on-notification-clicked) |

## 2.7.0 版本

**发布日期：2024-07-01**

**新增功能**

| <div style={{width:"130px"}}>功能项</div>  | 功能描述 | 相关接口 |
|-------|-------|-------|
| 厂商包分离 | 将 ZPNs 各个厂商的实现分别打包到对应的 ZPNs 厂商包中，您可以根据自身接入厂商的情况选择接入不同的 ZPNs 厂商包，从而避免依赖到不需要的厂商包，降低上架时不必要的审核风险。 | - |

## 2.6.0 版本

**发布日期：2023-11-22**

**新增功能**

| <div style={{width:"130px"}}>功能项</div>  | 功能描述 | 相关接口 |
|-------|-------|-------|
| 通知携带图片 | 支持在离线推送通知中携带一张图片，详情请参考 [通知携带图片附件](/zim-android/offline-push-notifications/best-practices/notify-with-photo-attachment)。 | [全员推送](/zim-server/messaging/push-message-to-all-users) |
| 更新图标角标 | 支持用户离线情况下，更新 App 图标角标，提醒用户消息未读数，详情请参考 [更新图标角标](/zim-android/offline-push-notifications/best-practices/modify-a-notification-badge)。 | <ul><li>[ZIMPushConfig > enableBadge](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~struct~ZIMPushConfig#enable-badge)</li><li>[ZIMPushConfig > enableBadge](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~struct~ZIMPushConfig#badge-increment)</li><li>[ZPNsConfig > enableHwBadge](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~struct~ZPNsConfig#enable-hw-badge)</li></ul> |

---

## 2.5.0 版本

**发布日期：2023-09-14**

**新增功能**

| <div style={{width:"130px"}}>功能项</div>  | 功能描述 | 相关接口 |
|-------|-------|-------|
| 本地日志 | 增加 ZPNs 本地日志组件，调用 ZIM SDK 的 [uploadLog](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#upload-log)，即可同时上传 ZIM 和 ZPNs 的日志。 | [uploadLog](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#upload-log) |
| 推送私信 | 支持通过安卓设备厂商的私信通道推送消息，实现无上限推送。如何创建私信通道，请查看 [小米](/zim-android/offline-push-notifications/integrate-xiaomi)、[华为](/zim-android/offline-push-notifications/integrate-huawei)、[OPPO](/zim-android/offline-push-notifications/integrate-oppo)、[vivo](/zim-android/offline-push-notifications/integrate-vivo) 推送集成指南的相关内容。 | [ZIMPushConfig > resourcesID](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~struct~ZIMPushConfig#resources-id) |

<p class="hthree">改进优化</p>

| <div style={{width:"130px"}}>功能项</div>  | 功能描述 | 相关接口 |
|-------|-------|-------|
| 获取 payload 透传字段  | 新增 payload 透传字段获取接口，简化获取流程。 | [getZPNsMessage](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZPNsManager#get-zp-ns-message) |

---

## 2.3.0 版本

**发布日期：2023-03-07**

**新增功能**

| <div style={{width:"130px"}}>功能项</div>  | 功能描述 | 相关接口 |
|-------|-------|-------|
| 支持静默推送 | 支持通过静默推送，同步处于后台运行的 App 和服务端的数据。 | - |

---

## 2.2.0 版本

**发布日期：2022-12-01**

<p class="hthree">改进优化</p>

| <div style={{width:"130px"}}>功能项</div>  | 功能描述 | 相关接口 |
|-------|-------|-------|
| ZPNs 接口优化  | 对 ZPNs 接口进行重构优化。<Warning title="注意"><p>若升级到 2.2.0 后出现编译问题，请查看 [升级指南 - ZPNs](/zim-android/client-sdks/zpns-upgrade-guide)。</p></Warning> | - |

---

## 2.1.0 版本

**发布日期：2022-08-15**

**新增功能**

| <div style={{width:"130px"}}>功能项</div>  | 功能描述 | 相关接口 |
|-------|-------|-------|
| 支持谷歌 FCM 推送通道  | 增加对谷歌 FCM 推送通道的支持，详情请参考 [Google 推送集成指南](/zim-android/offline-push-notifications/integrate-fcm)。 | 无 |

---

## 2.0.0 版本

**发布日期：2022-03-21**

ZPNs SDK 首次发布，支持接收华为、小米、OPPO、vivo 四个厂商的离线推送。若需使用，请搭配 ZIM SDK。

| <div style={{width:"130px"}}>功能项</div>  | 功能描述 | 相关接口 |
|-------|-------|-------|
| 注册离线推送  | 注册厂商通道的离线推送，使用前请先配置好需要使用的厂商信息。 | <ul><li>[setPushConfig](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZPNsManager#set-push-config)</li><li>[registerPush](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZPNsManager#register-push)</li></ul> |
| 接收厂商透传消息回调 | 各厂商返回的透传消息都会触发相关回调，并在此接口抛出通知。 | [onThroughMessageReceived](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZPNsMessageReceiver#on-through-message-received) |
| 接收厂商通知点击回调 | 各厂商的通知点击回调，统一在相关接口抛出。 | [onNotificationClicked](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZPNsMessageReceiver#on-notification-clicked)|
| 接收厂商通知展示回调 | 厂商通知展示回调，统一在此接口抛出。 | [onNotificationArrived](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZPNsMessageReceiver#on-notification-arrived)|
