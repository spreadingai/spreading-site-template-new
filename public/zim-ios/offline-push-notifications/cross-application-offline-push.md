# 实现跨应用离线推送互通

如果开发者希望使用一个 ZEGO AppID 实现两个 App 之间离线推送互通，可参考本文档。本功能常用于教师端、学生端 App 之间，教师端向学生端发送消息，学生端可收到离线推送。

## 前提条件

在实现跨应用离线推送互通之前，请确保 2 个应用均已集成 ZIM SDK 和 ZPNs SDK，并且已实现离线推送，详情请参考 [实现离线推送](/zim-ios/offline-push-notifications/implement-offline-push-notification)。


## 实现流程

1. 参考 [Apple 推送集成指南](/zim-ios/offline-push-notifications/integrate-apns)，为 2 个应用分别获取 2 份离线推送证书。
2. 参考 [控制台 - 离线推送配置](https://doc-zh.zego.im/article/16233)，在 ZEGO 控制台上配置上述获取的 2 份推送证书。

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/ZIM/Apple_offline_push_certificate.jpeg" /></Frame>

3. 调用 [setPushConfig](https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_ios~protocol~ZPNs#set-push-config)，并填入当前工程对应配置的 appType。

    <Warning title="注意">
    此步骤需在调用 [registerAPNs](https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_ios~protocol~ZPNs#register-ap-ns) 接口向 APNs 注册之前完成。
    </Warning>

    ```objc
    ZPNsConfig *zpnsConfig = [[ZPNsConfig alloc] init];
    // 如果当前工程下的离线推送证书在 ZEGO 控制台配置为“第一套配置”，则 appType 填 1。
    // 如果在 ZEGO 控制台配置为“第二套配置”，appType 填 2
    zpnsConfig.appType = 2;
    [[ZPNs shared] setPushConfig:zpnsConfig];
    ```

    完成上述配置后，即可实现跨应用离线推送互通。