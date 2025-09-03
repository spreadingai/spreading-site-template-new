## 2.5.0 版本

**发布日期：2022-11-30**

**改进优化**

| <div style={{width:"130px"}}>功能项</div>  | 功能描述 | 相关接口 |
|-------|-------|-------|
| ZPNsMessage 属性优化  | ZPNsMessage 属性 extras 的类型由 string 改为 Record\<string, string>。  | [ZPNsMessage](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_web~interface~ZPNsMessage) |

---

## 2.3.0 版本

**发布日期：2022-08-22**

首次发布，仅支持谷歌 FCM 推送通道。若需使用，请搭配 ZIM SDK。

| <div style={{width:"130px"}}>功能项</div>  | 功能描述 | 相关接口 |
|-------|-------|-------|
| 注册离线推送 | 注册厂商通道的离线推送，使用前请先配置好需要使用的厂商信息。 | [register](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_web~class~ZPNs#register) |
