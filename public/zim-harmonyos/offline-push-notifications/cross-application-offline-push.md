# 实现跨应用离线推送互通

---

如果开发者希望使用一个 ZEGO AppID 实现两个 App 之间离线推送互通，可参考本文档。本功能常用于教师端、学生端 App 之间，教师端向学生端发送消息，学生端可收到离线推送。

## 前提条件

在实现跨应用离线推送互通之前，请确保 2 个应用均已集成 ZIM SDK 和 ZPNs SDK，并且已实现离线推送，详情请参考 [实现离线推送](/zim-harmonyos/offline-push-notifications/implement-offline-push-notification)。


## 实现流程

根据**应用是否处于同一项目下**，请选择你需要的实现流程。完成以下配置后，即可实现跨应用离线推送互通。

<Tabs>
<Tab title="相同项目">
如果两个应用处于同一项目下，只需参考 [HarmonyOS 推送集成指南](/zim-harmonyos/offline-push-notifications/integrate-harmonyos) 开通项目的离线推送服务即可，无需额外操作。
</Tab>
<Tab title="不同项目">

1. 参考 [HarmonyOS 推送集成指南](/zim-harmonyos/offline-push-notifications/integrate-harmonyos) 开为 2 个应用对应的项目分别开通各项目的离线推送服务，并获取适用于各自项目的服务账号。
2. 参考 [控制台 - 离线推送配置](https://doc-zh.zego.im/article/16233)，在 [ZEGO 控制台](https://console.zego.im)上配置上述获取的 2 份服务账号。
    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/ZIM/Offline_Push_certificates.jpeg" /></Frame>
3. 调用 [setPushConfig](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_harmony~class~ZPNs#set-push-config)，并填入当前工程对应配置的 appType。

    <Warning title="注意">
    此步骤需在调用 [registerPush](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_harmony~class~ZPNs#register-push) 接口注册厂商离线推送之前完成。
    </Warning>

    ```typescript
    const zpnsConfig = {
        // 如果当前工程下的离线推送证书在 ZEGO 控制台配置为“第一套配置”，则 appType 为 1。
        // 如果在 ZEGO 控制台配置为“第二套配置”，appType 为 2
        appType: 2
    }
    ZPNs.getInstance().registerPush(zpnsConfig)
    ```
</Tab>
</Tabs>


