# 实现离线推送


<Note title="说明">
本文档适用于开发 iOS 和 Android 端应用。
</Note>

ZEGO 即时通讯（ZIM）支持离线推送消息的功能。例如在“单聊”或“群组聊天”时，如果您的程序在后台被冻结、或被系统或用户杀掉，与 ZEGO 服务后台的长连接超时断开后，此时如果您已接入“离线推送”功能，ZEGO 后台会为目标用户发送离线推送的消息。

开发者可以通过集成 ZPNs SDK，与 ZIM SDK 搭配使用，实现离线推送功能。

<Warning title="注意">
- React Native 平台的 ZPNs SDK 需要搭配 ZIM ReactNative SDK 2.2.0 或以上版本使用。
- 使用 ZPNs SDK 前，请先在 [ZEGO 控制台](https://console.zego.im) 自助配置 ZIM 离线推送证书（详情请参考 [项目管理 - 即时通讯 - 离线推送配置](https://doc-zh.zego.im/article/16233)），若无法配置，请联系 ZEGO 技术支持处理。
</Warning>

## 方案介绍

ZIM 实现离线推送的方案如下：

<Frame width="512" height="auto" caption="">
  <img src="https://doc-media.zego.im/sdk-doc/Pics/ZIM/OfflinePush/Android.png" />
</Frame>

1. 首先消息接收方（即接收离线消息的用户），开启各厂商的推送通道，向各厂商的推送服务器发送请求，获取 Token。
2. 各厂商的推送服务器，将 Token 返回给接收方。
3. 接收方生成 PushID，并向 ZIM 服务器发送请求，绑定用户与 PushID 的关系。
    
    开发者如果将 ZPNs SDK 与 ZIM SDK 搭配使用，SDK 内部会自动绑定用户与 PushID 的关系，无需特殊处理；如果单独使用 ZPNs SDK，则需自行对接 ZPNs 服务器、实现绑定逻辑。**请注意，同一设备切换 userID 前，请调用 zim.[logout](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_react-native~class~ZIM#logout) 接口，该接口会清除 userID 绑定的 PushID。**

4. 发送方开始发送消息，消息存储到 ZIM 服务器。
5. ZIM 服务器会确认接收方的客户端是否在线。
6. 如果接收方的客户端不在线，ZIM 服务器会将消息转发给 ZPNs 服务器。
7. ZPNs 服务器将离线消息转发给各厂商的推送服务器。
8. 各厂商的服务器将消息通过“离线推送”的方式，推送给接收方；接收方登录后（至少登录一次），即可收到离线消息。

## 前提条件

在实现“离线推送”功能之前，请确保：

- 开发环境满足以下要求：
    - React Native 0.60.0 或以上版本。
    - **Android**
        - Android Studio 2.1 或以上版本。
        - Android SDK 25、Android SDK Build-Tools 25.0.2、Android SDK Platform-Tools 25.x.x 或以上版本。
        - Android 9.0 或以上版本 Android 设备或模拟器（推荐使用真机）。
    - **iOS**
        - Xcode 7.0 或以上版本。
        - iOS 11.0 或以上版本且的 iOS 真机设备。
        - iOS 设备已经连接到 Internet。
- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，获取到了接入 ZIM SDK 服务所需的 AppID、AppSign。ZIM 服务权限不是默认开启的，使用前，请先在 [ZEGO 控制台](https://console.zego.im) 自助开通 ZIM 服务（详情请参考控制台的 [服务配置 - 即时通讯 - 开通服务](https://doc-zh.zego.im/article/14994)），若无法开通 ZIM 服务，请联系 ZEGO 技术支持开通。
- 已集成 ZIM SDK 2.1.5 或以上版本，详情请参考 [快速开始 - 实现基本收发消息](/zim-rn/send-and-receive-messages)。


## 实现流程

### 接入第三方厂商离线推送通道

请参考下列推送集成指南，集成需要使用到的第三方厂商离线推送 SDK，接入各厂商的离线推送通道。

目前支持 Apple、小米、华为、OPPO、vivo 和 Google 的推送：

- [Apple 推送集成指南](/zim-rn/offline-push-notifications/integrate-apns)
- [小米推送集成指南](/zim-rn/offline-push-notifications/integrate-xiaomi)
- [华为推送集成指南](/zim-rn/offline-push-notifications/integrate-huawei)
- [OPPO 推送集成指南](/zim-rn/offline-push-notifications/integrate-oppo)
- [vivo 推送集成指南](/zim-rn/offline-push-notifications/integrate-vivo)
- [FCM 推送集成指南](/zim-rn/offline-push-notifications/integrate-fcm)

### 集成 ZPNs SDK

#### 导入 ZPNs SDK
 
开发者可以使用 npm 获取 SDK。

1. 进入您的项目的根目录，执行以下命令安装依赖。

<CodeGroup>
```bash title="npm"
npm i zego-zpns-react-native
```
```bash title="yarn"
yarn add zego-zpns-react-native
```
</CodeGroup>

2. 导入 SDK。

    ```typescript
    // 当SDK版本小于 2.3.0 时，您可以使用默认方法导入`zego-zpns-react-native` SDK。
    // import ZPNs from 'zego-zpns-react-native';

    // 然而，所有版本的SDK都支持使用命名方法导出`zego-zpns-react-native` SDK。
    import { ZPNs } from 'zego-zpns-react-native';
    ```

完成如上操作即可在项目中通过 javascript 或 typescript (推荐) 来使用 zego-zpns-react-native。

#### 设置权限

开发者可以根据实际应用需要，设置应用所需权限。

- **iOS：**

    调用 [applyNotificationPermission](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_react-native~class~ZPNs#apply-notification-permission) 接口，向用户申请通知权限。本接口仅第一次调用时生效，请开发者注意调用时机。

    ```typescript
    ZPNs.getInstance().applyNotificationPermission();
    ```

- **Android：**

    进入 “app/src/main” 目录，打开 “AndroidManifest.xml” 文件，添加权限。 
 
    ```xml
    <!-- ZPNs SDK 必须使用的权限 -->
    <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
    <uses-permission android:name="android.permission.READ_PHONE_STATE" />
    ```

### 使用 ZPNs SDK 注册离线推送功能

1.  使用 [ZPNsEventHandler](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_react-native~class~ZPNsEventHandler) 获取回调。

    [ZPNsEventHandler](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_react-native~class~ZPNsEventHandler) 类包含了 ZPNs 中各种事件回调的 Function，开发者可通过传入 Function 来接收 ZPNs 中的事件回调，处理 SDK 异常、消息通知回调。

    <a id="HowToGetPushID"></a>

    各移动设备厂商对 ZPNsEventHandler 类的回调支持情况如下表所示：

    <table>
    <tbody><tr>
    <th>接口名称</th>
    <th>接口说明</th>
    <th>厂商支持情况</th>
    </tr>
    <tr>
    <td>[registered](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_react-native~class~ZPNsEventHandler#registered)</td>
    <td>厂商注册“离线推送”的结果回调。厂商注册“离线推送”的结果，会统一在此接口抛出，可通过该回调获取到 PushID。</td>
    <td>所有厂商都支持该回调。</td>
    </tr>
    <tr>
    <td>[notificationArrived](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_react-native~class~ZPNsEventHandler#notification-arrived)</td>
    <td>厂商通知展示回调。厂商通知展示回调，统一在此接口抛出。</td>
    <td><ul><li>苹果: 支持该回调。</li><li>小米：App 处于前后台状态下才能收到此回调。</li><li>华为：不支持该回调。</li><li>OPPO：不支持该回调。</li><li>vivo：不支持该回调。</li><li>Google: 不支持该回调。</li></ul></td>
    </tr>
    <tr>
    <td>[throughMessageReceived](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_react-native~class~ZPNsEventHandler#through-message-received)</td>
    <td>厂商透传消息回调。各厂商返回的透传消息都会触发该接口，并在此接口抛出通知。</td>
    <td><ul><li>苹果: 暂不支持该回调</li><li>小米：不支持该回调。</li><li>vivo：不支持该回调。</li><li>华为：支持该回调，但请先参考华为官方文档 <a href="https://developer.huawei.com/consumer/cn/doc/HMSCore-Guides/faq-0000001050042183#section037425218509" target="_blank">推送服务 - FAQ - 申请特殊权限</a> 申请 <strong>高优先级透传消息权限</strong>。</li><li>OPPO：不支持该回调。</li><li>Google：APP 处于前后台状态下才能收到此回调。</li></ul></td>
    </tr>
    </tbody></table>
    
    <Accordion title="使用 ZPNsEventHandler 注册回调示例" defaultOpen="false">
    开发者可以通过监听 [registered](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_react-native~class~ZPNsEventHandler#registered) 回调获取 ZPNs 注册结果，并在该方法触发时打印 PushID。

    ```typescript
    ZPNs.getInstance().on('registered', (message) => {
          console.log('[ZPNs] registered. pushID: ' + message.pushID + ', error: ' + message.errorCode)
    });

    ZPNs.getInstance().on('notificationArrived', (message) => {
          console.log('[ZPNs] notificationArrived', message)
    });

    ZPNs.getInstance().on('throughMessageReceived', (message) => {
          console.log('[ZPNs] throughMessageReceived', message)
    });
    ```
    </Accordion>

2. 配置安卓第三方推送通道。

    根据前提条件集成的第三方厂商离线推送 SDK，启用各厂商的推送功能，然后调用 [setPushConfig](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_react-native~class~ZPNs#set-push-config) 接口，配置第三方推送通道。

    ```typescript
    ZPNs.setPushConfig({"enableFCMPush": true, "enableHWPush": true, "enableMiPush": true, "enableOppoPush": true, "enableVivoPush": true});
    ```

3. 调用 [enableDebug](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_react-native~class~ZPNs#enable-debug) 设置当前项目的编译环境是否为 Debug，默认为 false。此操作是为了通知 ZPNs SDK 是否为 Debug 环境，PushID 的生成规则受此影响，请在调用 [registerPush](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_react-native~class~ZPNs#register-push) 接口前正确设置。

    <Warning title="注意">
    如果设置为 true，release 环境下无法收到推送。
    </Warning>

    ```typescript
    ZPNs.enableDebug(true);
    ```

4. 调用 [registerPush](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_react-native~class~ZPNs#register-push) 接口注册离线推送。

    <Note title="说明">
    - 在 iOS 端调用 [registerPush](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_react-native~class~ZPNs#register-push) 接口时，您需要根据打包时选择的证书为 development 还是 description 而提前填写 `ZPNsIOSEnvironment`。切换证书时，请更改此枚举。
    - 证书为 development 时，`ZPNsIOSEnvironment` 为 `Development`。
    - 证书为 distribution 时，`ZPNsIOSEnvironment` 为 `Production`。
    - 如果您尚不清楚当前所处的 `ZPNsIOSEnvironment`，请填 `ZPNsIOSEnvironment.Automatic`。`Automaic` 可能受 iOS 系统版本影响，若 iOS 系统进行大版本更新后，请留意 [ZPNs 发布日志](/zim-rn/client-sdks/zpns-release-notes)是否存在相关更新说明。
    </Note>

    ```typescript
    // 在 iOS 调用 registerPush 接口时，iOSNotificationArrivedConfig 参数可以用来设置普通弹窗推送在前台到达时，是否展示弹窗、角标、声音，若希望不展示可不填。
    // enableIOSVoIP 接口用于标记是否使用 iOS VoIP 推送类型。
    ZPNs.getInstance().registerPush({enableIOSVoIP:true, iOSEnvironment:ZPNsIOSEnvironment.Automatic,iOSNotificationArrivedConfig:{isPresentAlert:true,isPresentSound:true,isPresentBadge:true}});    
    ```

    注册离线推送功能后，可以通过 [ZPNsEventHandler](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_react-native~class~ZPNsEventHandler) 类中的 [registered](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_react-native~class~ZPNsEventHandler#registered) 回调，获取到离线推送的 `pushID`，向指定设备推送离线消息。


### 使用 ZIM SDK 实现离线推送功能

ZIM 支持在发送单聊消息、群组消息和呼叫邀请时使用离线推送功能。

<Warning title="注意">
在实现离线推送前，请确保：
- 参考 [发送消息](/zim-rn/send-and-receive-messages)，实现发送单聊/群聊消息的功能。
- 参考 [呼叫邀请](/zim-rn/guides/call-invitation-signaling)，实现呼叫邀请。
</Warning>


#### 场景 1：发送单聊消息时使用离线推送功能

1. 首先开发者需要通过 [ZIMPushConfig](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_react-native~interface~ZIMPushConfig) 对象，设置离线推送标题、内容、以及其他自定义属性。

    ```typescript
    const pushConfig: ZIMPushConfig = {
        title = "离线推送标题";
        content = "离线推送内容";
        // extendedData = "自定义透传字段,非必填"; // ZIM 版本 < 2.5.0 时使用该字段
        // payload = "自定义透传字段,非必填";  // ZIM 版本 >= 2.5.0 时使用该字段
        resourcesID = "资源 ID，非必填";
    }
    ```

2. 然后通过 [ZIMMessageSendConfig](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_react-native~interface~ZIMMessageSendConfig) 对象的 `pushConfig` 参数，配置离线消息的相关配置等。

   ```typescript
    const sendConfig: ZIMMessageSendConfig = {
        priority: 2,
        pushConfig: pushConfig
    };
    ```

3. 发送方调用 [sendMessage](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_react-native~class~ZIM#send-message)，传入 `sendConfig`，向接收方发送单聊消息。

    ```typescript
    const toUserID = '';
    const messageTextObj: ZIMMessage = { type: 1, message: '文本消息内容' };
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

1. 开发者通过 [ZIMPushConfig](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_react-native~interface~ZIMPushConfig) 对象，设置离线推送标题、内容、以及其他自定义属性。

    ```typescript
    const pushConfig: ZIMPushConfig = {
        title = "离线推送标题";
        content = "离线推送内容";
        // extendedData = "自定义透传字段,非必填"; // ZIM 版本 < 2.5.0 时使用该字段
        // payload = "自定义透传字段,非必填";  // ZIM 版本 >= 2.5.0 时使用该字段
        resourcesID = "资源 ID，非必填";
    }
    ```

2. 然后通过 [ZIMMessageSendConfig](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_react-native~interface~ZIMMessageSendConfig) 对象的 `pushConfig` 参数，配置离线消息的相关配置等。

    ```typescript
    const sendConfig: ZIMMessageSendConfig = {
        priority: 2,
        pushConfig: pushConfig
    };
    ```

3. 发送方调用 [sendMessage](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_react-native~class~ZIM#send-message)，传入 “sentConfig”，向群组内的所有用户发送消息。

    ```typescript
    const toGroupID = '';
    const messageTextObj: ZIMMessage = { type: 1, message: '文本消息内容' };
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

1. 开发者通过 [ZIMPushConfig](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_react-native~interface~ZIMPushConfig) 对象，设置离线推送标题、内容、以及其他自定义属性。

    ```typescript
    const pushConfig: ZIMPushConfig = {
        title = "离线推送标题";
        content = "离线推送内容";
        // extendedData = "自定义透传字段,非必填"; // ZIM 版本 < 2.5.0 时使用该字段
        // payload = "自定义透传字段,非必填";  // ZIM 版本 >= 2.5.0 时使用该字段
        resourcesID = "资源 ID，非必填";
    }
    ```
2. 然后通过 [ZIMCallInviteConfig](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_react-native~interface~ZIMCallInviteConfig) 对象的 `pushConfig` 参数，配置离线消息的相关配置等。

    ```typescript
    const callInviteConfig: ZIMCallInviteConfig = {
        mode: 0,
        timeout: 90,
        extendedData: '',
        pushConfig: pushConfig
    }
    ```

3. 发送方调用 [callInvite](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_react-native~class~ZIM#call-invite)，传入 “callInviteConfig”，发起呼叫邀请。

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
        })
    ```
4. 被邀请的用户若处于离线状态，将会收到对应的离线推送，上线后，若呼叫邀请还未结束，将会收到 [callInvitationReceived](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_react-native~interface~ZIMEventHandler#call-invitation-received) 回调。

### 注销离线推送

若开发者希望某台设备不再接收离线推送，可通过调用 [unRegisterPush](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_react-native~class~ZPNs#unregister-push) 接口注销。注销后，发送弹窗推送、静默推送也将不再生效。

```typescript
ZPNs.getInstance().unregisterPush();
```

## 在线调试

集成 ZPNs SDK 和获取 Push ID 后，您可以在 [ZEGO 控制台](https://console.zego.im/) 在线调试 ZIM 离线推送功能，详情请参考控制台的 [ZIM 离线推送调试](https://doc-zh.zego.im/article/17949)。