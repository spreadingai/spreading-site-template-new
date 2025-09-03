# 实现离线推送

ZEGO 即时通讯（ZIM）支持离线推送消息的功能。例如在“单聊”或“群组聊天”时，如果您的网页被关闭，与 ZEGO 服务后台的长连接超时断开后，此时如果您已接入“离线推送”功能，ZEGO 后台会为目标用户发送离线推送的消息。

开发者可以通过集成 ZPNs SDK，与 ZIM SDK 搭配使用，实现离线推送功能。


<Warning title="注意">
- Web 平台离线推送，仅支持 Chrome 和 Edge 浏览器。由于是基于 Google FCM 功能实现，国内访问可能受限，建议开发者搭建 VPN 使用。 
- Web 平台的 ZPNs SDK 需要搭配 ZIM SDK 2.3.0 或以上版本使用。
</Warning>


## 方案介绍

ZIM 实现离线推送的方案如下：

<Frame width="512" height="auto" caption="">
  <img src="https://doc-media.zego.im/sdk-doc/Pics/ZIM/OfflinePush/Android.png" />
</Frame>

1. 首先消息接收方（即接收离线消息的用户），开启 Google 推送通道，向 Google 推送服务器发送请求，获取 Token。
2. Google 推送服务器，将 Token 返回给接收方。
3. 接收方生成 PushID，并向 ZIM 服务器发送请求，绑定用户与 PushID 的关系。

    开发者需要将 ZPNs SDK 与 ZIM SDK 搭配使用，SDK 内部会自动绑定用户与 PushID 的关系，无需特殊处理。**请注意，同一设备切换 userID 前，请调用 zim.[logout](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_web~class~ZIM#logout) 接口，该接口会清除 userID 绑定的 PushID。**

4. 发送方开始发送消息，消息存储到 ZIM 服务器。
5. ZIM 服务器会确认接收方的客户端是否在线。
6. 如果接收方的客户端不在线，ZIM 服务器会将消息转发给 ZPNs 服务器。
7. ZPNs 服务器将离线消息转发给 Google 的推送服务器。
8. Google 的服务器将消息通过“离线推送”的方式，推送给接收方；接收方登录后（至少登录一次），即可收到离线消息。


## 实现流程

### 接入 Google 离线推送通道

请参考 [Web 推送集成指南](/zim-web/offline-push-notifications/integrate-fcm)，接入 Google 离线推送通道。

### 集成 ZPNs SDK
 
1. 请参考 [ZPNs SDK](/zim-web/client-sdks/sdk-downloads)，下载最新版本的 ZPNs SDK。
2. 将 SDK 包解压至项目目录下，例如 “zego-zpns-web”。 
3. 添加 SDK 引用。

    1. 编辑项目的 “index.html” 文件，添加如下代码。
    
    ```typescript
    <script src="./zego-zpns-web/index.js"></script>
    ```

    2. 将 “zego-zpns-web/firebase-messaging-sw.js” 文件，拷贝到项目根目录。 

### 使用 ZPNs SDK 注册离线推送功能

1. 注册离线推送功能。

    ```typescript
    const appID = 0; // Your Application ID of ZEGO ZIM
    ZIM.create({ appID: appID });
    const zim = ZIM.getInstance();

    const config = {
        // From firebaseConfig
        apiKey: '',
        authDomain: '',
        projectId: '',
        storageBucket: '',
        messagingSenderId: '',
        appId: '',
        measurementId: '',

        // From Web Push certificates
        vapidKey: '',
    }
    ZPNs.getInstance().register(config, zim);
    ```

2. 如果不再需要离线推送功能，开发者可以调用 [unregister](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_web~class~ZPNs#unregister) 接口，注销该功能，注销后用户将不再能收到推送消息。

    ```typescript
    ZPNs.getInstance().unregister();
    ```


### 使用 ZIM SDK 实现离线推送功能

ZIM 支持在发送单聊消息、发送群组消息、以及发送呼叫邀请时，使用离线推送消息的功能。

<Warning title="注意">
实现离线推送之前：
- 请参考 [发送消息](/zim-web/send-and-receive-messages)，实现发送单聊/群聊消息的功能。
- 请参考 [呼叫邀请](/zim-web/guides/call-invitation-signaling)，实现呼叫邀请。
</Warning>

#### 场景 1：发送单聊消息时使用离线推送功能

1. 首先开发者需要通过 [ZIMPushConfig](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_web~interface~ZIMPushConfig) 对象，设置离线推送标题、内容、以及其他自定义属性。

    ```typescript
    const pushConfig: ZIMPushConfig = {
        title = "离线推送标题";
        content = "离线推送内容";
        // extendedData = "自定义透传字段,非必填"; // ZIM 版本 < 2.5.0 时使用该字段
        // payload = "自定义透传字段,非必填"; // ZIM 版本 >= 2.5.0 时使用该字段
    }
    ```

2. 然后通过 [ZIMMessageSendConfig](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_web~interface~ZIMMessageSendConfig) 对象的 `pushConfig` 参数，配置离线消息的相关配置等。

    ```typescript
    const sendConfig: ZIMMessageSendConfig = {
        priority: 2,
        pushConfig: pushConfig
    };
    ```

3. 发送方调用 [sendPeerMessage](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_web~class~ZIM#send-peer-message)，传入 “sendConfig”，向接收方发送单聊消息。

    ```typescript
    const toUserID = '';
    const messageTextObj: ZIMTextMessage = { type: 1, message: '文本消息内容' };
    zim.sendMessage(messageTextObj, toUserID, 0, sendConfig)
        .then((res: ZIMMessageSentResult) => {
            // 发送成功
        })
        .catch((err: ZIMError) => {
            // 发送失败
        });
    ```

4. 接收方如果处于离线状态，将会在上线后，接收到发送方之前发送的离线消息。

#### 场景 2：发送群组消息时使用离线推送功能

1. 开发者通过 [ZIMPushConfig](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_web~interface~ZIMPushConfig) 对象，设置离线推送标题、内容、以及其他自定义属性。

    ```typescript
    const pushConfig: ZIMPushConfig = {
        title = "离线推送标题";
        content = "离线推送内容";
        // extendedData = "自定义透传字段,非必填"; // ZIM 版本 < 2.5.0 时使用该字段
        // payload = "自定义透传字段,非必填"; // ZIM 版本 >= 2.5.0 时使用该字段
    }
    ```

2. 然后通过 [ZIMMessageSendConfig](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_web~interface~ZIMMessageSendConfig) 对象的 `pushConfig` 参数，配置离线消息的相关配置等。

    ```typescript
    const sendConfig: ZIMMessageSendConfig = {
        priority: 2,
        pushConfig: pushConfig
    };
    ```

3. 发送方调用 [sendGroupMessage](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_web~class~ZIM#send-group-message)，传入 “sendConfig”，向群组内的所有用户发送消息。

    ```typescript
    const toGroupID = '';
    const messageTextObj: ZIMTextMessage = { type: 1, message: '文本消息内容' };
    zim.sendMessage(messageTextObj, toGroupID, 2, sendConfig)
        .then((res: ZIMMessageSentResult) => {
            // 发送成功
        })
        .catch((err: ZIMError) => {
            // 发送失败
        });
    ```

4. 群组内的用户，如果有人处于离线状态，将会在上线后，接收到发送方之前发送的群组离线消息。

#### 场景 3：发送呼叫邀请时使用离线推送功能

1. 开发者通过 [ZIMPushConfig](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_web~interface~ZIMPushConfig) 对象，设置离线推送标题、内容、以及其他自定义属性。

    ```typescript
    const pushConfig: ZIMPushConfig = {
        title = "离线推送标题";
        content = "离线推送内容";
        // extendedData = "自定义透传字段,非必填"; // ZIM 版本 < 2.5.0 时使用该字段
        // payload = "自定义透传字段,非必填";  // ZIM 版本 >= 2.5.0 时使用该字段
        resourcesID = "资源 ID，非必填";
    }
    ```
2. 然后通过 [ZIMCallInviteConfig](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_web~interface~ZIMCallInviteConfig) 对象的 `pushConfig` 参数，配置离线消息的相关配置等。

    ```typescript
    const callInviteConfig: ZIMCallInviteConfig = {
        mode: 0,
        timeout: 90,
        extendedData: '',
        pushConfig: pushConfig
    }
    ```

3. 发送方调用 [callInvite](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_web~class~ZIM#call-invite)，传入 “callInviteConfig”，发起呼叫邀请。

    ```typescript
    const invitees = ['xxxx'];  // 被邀请人ID列表
    zim.callInvite(invitees, callInviteConfig)
        .then((res: ZIMCallInvitationSentResult) => {
            const callID = res.callID;
            // 操作成功
            // 此处的 callID 是用户发起呼叫后，SDK 内部生成的 ID，用于唯一标识一次呼叫邀请；之后发起人取消呼叫、被邀请人接受/拒绝呼叫，都会使用此 callID
        })
        .catch((err: ZIMError) => {
            // 操作失败
        });
    ```
4. 被邀请的用户若处于离线状态，将会收到对应的离线推送，上线后，若呼叫邀请还未结束，将会收到 [callInvitationReceived](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_web~interface~ZIMEventHandler#call-invitation-received) 回调。


### 注销离线推送

若开发者希望某台设备不再接收离线推送，可通过调用 [unRegisterPush](https://doc-zh.zego.im/) 接口注销。注销后，发送弹窗推送、静默推送也将不再生效。

```typescript
ZPNs.getInstance().unregisterPush();
```

## 更多功能

### 获取 payload 透传字段

离线推送发送端通过配置 [ZIMPushConfig](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_web~interface~ZIMPushConfig)的 payload 参数（2.5.0 之前版本为 extendedData 参数）向接收端发送额外信息，接收端需使用 ZPNs SDK 时，通过厂商通道的 extras 里面的 payload 字段获取该信息。

1. 从 [下载](/zim-web/client-sdks/sdk-downloads) 获取 2.5.0 或以上版本的 ZPNs SDK，将其中的 `firebase-messaging-sw.js` 文件，拷贝到您的项目的根目录。

2. 打开 `firebase-messaging-sw.js` 文件，按需重写以下方法后保存。

```typescript
self.onNotificationArrived = (message) => {
    // 获取 payload 字段
    console.log(message.extra ? message.extra.payload : message.extra);
}
self.onNotificationClicked = (message) => {
    // 获取 payload 字段
    console.log(message.extra ? message.extra.payload : message.extra);
}
```