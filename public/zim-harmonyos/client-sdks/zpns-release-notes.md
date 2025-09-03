# ZPNs 发布日志

---

## 2.8.0 版本

**发布日期：2025-04-30**

ZPNs HarmonyOS SDK 首次发布，支持接收 HarmonyOS 离线推送功能。若需使用，请搭配 ZIM SDK。

| <div style={{width:"130px"}}>功能项</div>  | 功能描述 | 相关接口 |
|-------|-------|-------|
| 注册离线推送  | 注册厂商通道的离线推送，使用前请先配置好需要使用的厂商信息。 | <ul><li>[setPushConfig](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_harmony~class~ZPNs#set-push-config)</li><li>[registerPush](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_harmony~class~ZPNs#register-push)</li></ul> |
| 注销推送 | 支持注销离线推送，关闭推送通知。 | [unregisterPush](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_harmony~class~ZPNs#unregister-push) |

