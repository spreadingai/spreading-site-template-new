# 离线推送配置

- - -

您可以使用 ZEGO 即时通讯（ZIM）实现离线推送消息。例如在“单聊”或“群组聊天”时，如果因为您的程序在后台被冻结、或被系统或用户强制关闭，导致与 ZEGO 服务后台的长连接超时断开，此时如果您已配置“离线推送”，ZEGO 后台会为目标用户发送离线推送的消息。

本文介绍如何控制台配置离线推送证书，开通相关服务。有关在客户端实现离线推送的相关内容，请参考 [实现离线推送](/zim-android/offline-push-notifications/implement-offline-push-notification)。

## 配置流程

1. 前往各手机厂商平台创建应用，获取离线推送相关证书，相关文档请查看：
    1. [小米推送集成指南](/zim-android/offline-push-notifications/integrate-xiaomi)
    2. [华为推送集成指南](/zim-android/offline-push-notifications/integrate-huawei)
    3. [鸿蒙推送集成指南](/zim-harmonyos/offline-push-notifications/integrate-harmony)
    4. [OPPO 推送集成指南](/zim-android/offline-push-notifications/integrate-oppo)
    5. [VIVO 推送集成指南](/zim-android/offline-push-notifications/integrate-vivo)
    6. [Google 推送集成指南](/zim-android/offline-push-notifications/integrate-fcm)
    7. [Apple 推送集成指南](/offline-push-notifications/integrate-apns)

2. 前往 [ZEGO 控制台](https://console.zego.im/)，点击“项目管理”，选择需要配置的项目，查看“项目配置”。在“服务配置 - 即时通讯 - 离线推送证书配置” 中 “点击添加证书”，如下图所示。

<Warning title="注意">


    - 针对每个 Android 厂商，您至多可以添加两个证书。
    - 针对 Apple 的开发环境和生产环境，您可以分别添加一个证书。
    - 您在 ZEGO 控制台上自助配置的 Google FCM 信息仅能用于实现 Android 端离线推送。**如需实现 Web 离线推送，请联系 ZEGO 技术支持。**

</Warning>



    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Consle/09161.png" /></Frame>
    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Consle/push_certificate.jpeg" /></Frame>

<Note title="说明">


    图中字段“Project ID” 为您在各厂商申请的参数。

</Note>



    添加完成后，您可以在“离线推送证书配置”模块看到该证书，还可以再次编辑或删除该证书。
    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Consle/09163.png" /></Frame>


ZEGO 控制台对应华为官网控制台字段
图片1
