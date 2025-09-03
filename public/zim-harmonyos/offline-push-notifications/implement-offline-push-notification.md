# 实现离线推送

---

ZEGO 即时通讯（ZIM）支持离线推送消息的功能。例如在“单聊”或“群组聊天”时，如果您的程序在后台被冻结、或被系统或用户杀掉，与 ZEGO 服务后台的长连接超时断开后，此时如果您已接入“离线推送”功能，ZEGO 后台会为目标用户发送离线推送的消息。

开发者可以通过集成 ZPNs SDK，与 ZIM SDK 搭配使用，实现离线推送功能。

<Warning title="注意">
使用 ZPNs SDK 前，请先在 [ZEGO 控制台](https://console.zego.im) 自助配置 ZIM 离线推送证书（详情请参考 [项目管理 - 即时通讯 - 离线推送配置](https://doc-zh.zego.im/article/16233)），若无法配置，请联系 ZEGO 技术支持处理。
</Warning>

## 方案介绍

ZIM 实现离线推送的方案如下：

<Frame width="512" height="auto" caption="">
  <img src="https://doc-media.zego.im/sdk-doc/Pics/ZIM/OfflinePush/Android.png" />
</Frame>

1. 首先消息接收方（即接收离线消息的用户），开启 HarmonyOS 推送通道，向 HarmonyOS 推送服务器发送请求，获取 Token。
2. HarmonyOS 推送服务器，将 Token 返回给接收方。
3. 接收方生成 PushID，并向 ZIM 服务器发送请求，绑定用户与 PushID 的关系。
    
    开发者如果将 ZPNs SDK 与 ZIM SDK 搭配使用，SDK 内部会自动绑定用户与 PushID 的关系，无需特殊处理；如果单独使用 ZPNs SDK，则需自行对接 ZPNs 服务器、实现绑定逻辑。**请注意，同一设备切换 userID 前，请调用 zim.[logout](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_harmony~class~ZIM#logout) 接口，该接口会清除 userID 绑定的 PushID。**

4. 发送方开始发送消息，消息存储到 ZIM 服务器。
5. ZIM 服务器会确认接收方的客户端是否在线。
6. 如果接收方的客户端不在线，ZIM 服务器会将消息转发给 ZPNs 服务器。
7. ZPNs 服务器将离线消息转发给 HarmonyOS 推送服务器。
8. HarmonyOS 推送服务器将消息通过“离线推送”的方式，推送给接收方；接收方登录后（至少登录一次），即可收到离线消息。

## 前提条件

在实现“离线推送”功能之前，请确保：

- 开发环境满足以下要求：
        - DevEco Studio 版本：DevEco Studio 5.0.0 Release（5.0.3.910）或以上版本。
        - 测试设备为安装 HarmonyOS 5.0.0 Release 或以上版本的真机，或 ARM 模拟器。
        - 设备已经连接到 Internet。
- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，获取到了接入 ZIM SDK 服务所需的 AppID、AppSign。ZIM 服务权限不是默认开启的，使用前，请先在 [ZEGO 控制台](https://console.zego.im) 自助开通 ZIM 服务（详情请参考控制台的 [服务配置 - 即时通讯 - 开通服务](https://doc-zh.zego.im/article/14994)），若无法开通 ZIM 服务，请联系 ZEGO 技术支持开通。
- 已集成 ZIM SDK，详情请参考 [快速开始 - 实现基本收发消息](/zim-harmonyos/send-and-receive-messages)。


## 实现流程

### 开通 HarmonyOS 推送服务

详情请参考 [HarmonyOS 推送集成指南](/zim-harmonyos/offline-push-notifications/integrate-harmonyos)。

### 集成 ZPNs SDK

<Steps>
<Step title="获取 SDK">
请在 [下载](/zim-harmonyos/offline-push-notifications/client-sdks/sdk-downloads) 获取 ZPNs SDK 压缩包。
</Step>
<Step title="解压 SDK">
解压 SDK 至 “entry/libs” 项目目录下。

<Note title="说明">如果您的项目中没有 libs 目录，手动新建一个即可。</Note>

<Frame width="auto" height="auto">
<img src="https://media-resource.spreading.io/docuo/workspace564/27e54a759d23575969552654cb45bf89/11edb309f7.jpeg" alt="ZPNsHarmonyOS.jpeg"/>
</Frame>
</Step>
<Step title="添加 SDK 引用">
打开 `entry/oh-package.json5` 文件，在 `dependencies` 节点中引入 “libs” 下的 `ZPNs.har`。

```json5 title="entry/oh-package.json5"
"@zego/ZPNs": "file:./libs/ZPNs.har"
```
</Step>
</Steps>

#### 导入 ZPNs SDK

在需要使用 ZPNs 功能的文件中，导入 ZPNs 模块，以便访问和使用它提供的功能或接口。

```typescript
import ZPNs from '@zego/ZPNs'
```

#### 设置权限

开发者可以根据实际应用需要，设置应用所需权限。

调用 [requestEnableNotification](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-notificationmanager#notificationmanagerrequestenablenotification10-1) 接口，向用户申请通知权限。本接口仅第一次调用时生效，请开发者注意调用时机。

```typescript {3}
import { notificationManager } from '@kit.NotificationKit';

notificationManager.requestEnableNotification(this.context).then((res) => {
    hilog.info(0x0000, 'testTag', 'Permission granted');

}).catch((err:BusinessError) => {
    hilog.info(0x0000, 'testTag', 'Permission failed. err code: %{public}d, err msg: %{public}s', err.code, err.message);
    if(err.code == 1600004) {
        notificationManager.openNotificationSettings(this.context).then((res) => {

        }).catch((err:BusinessError) => {
            hilog.info(0x0000, 'testTag', 'Open settings page failed. err code: %{public}d, err msg: %{public}s', err.code, err.message);
        });
    }

});
```



### 使用 ZPNs SDK 注册离线推送功能

<Steps>
<Step title="监听注册回调">
监听 [ZPNsEventHandler.registered](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_harmony~class~ZPNsEventHandler#registered) 回调，获取 ZPNs 注册结果，并在该方法触发时打印 `pushID`（用于向指定设备推送离线消息）。
```typescript
ZPNs.getInstance().on("registered",(message:ZPNsRegisterMessage)=>{
    console.log("code:"+message.errorCode+"message:"+message.msg+" push id:"+message.pushID)
})
```
</Step>
<Step title="注册离线推送">
调用 [registerPush](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_harmony~class~ZPNs#register-push) 接口注册离线推送。
```typescript
try {
    ZPNs.getInstance().registerPush({})
} catch (e) {
    console.log("registerPush failed with exception:"+e)
}
```
</Step>
</Steps  >

### 使用 ZIM SDK 实现离线推送功能

ZIM 支持在发送单聊消息、群组消息和呼叫邀请时使用离线推送功能。

<Warning title="注意">
在实现离线推送前，请确保：
- 参考 [发送消息](/zim-harmonyos/send-and-receive-messages)，实现发送单聊或群聊消息的功能。
- 参考 [呼叫邀请](/zim-harmonyos/guides/call-invitation-signaling)，实现呼叫邀请。
</Warning>


#### 场景 1：发送单聊消息时使用离线推送功能

1. 首先开发者需要通过 [ZIMPushConfig](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_harmony~interface~ZIMPushConfig) 对象，设置离线推送标题、内容、以及其他自定义属性。

    ```typescript
    const pushConfig: ZIMPushConfig = {
        title = "离线推送标题";
        content = "离线推送内容";
        payload = "自定义透传字段,非必填"; 
        resourcesID = "资源 ID，非必填";
    }
    ```

2. 然后通过 [ZIMMessageSendConfig](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_harmony~interface~ZIMMessageSendConfig) 对象的 `pushConfig` 参数，配置离线消息的相关配置等。

   ```typescript
    const sendConfig: ZIMMessageSendConfig = {
        priority: 2,
        pushConfig: pushConfig
    };
    ```

3. 发送方调用 [sendMessage](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_harmony~class~ZIM#send-message)，传入 `sendConfig`，向接收方发送单聊消息。

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

1. 开发者通过 [ZIMPushConfig](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_harmony~interface~ZIMPushConfig) 对象，设置离线推送标题、内容、以及其他自定义属性。

    ```typescript
    const pushConfig: ZIMPushConfig = {
        title = "离线推送标题";
        content = "离线推送内容";
        payload = "自定义透传字段,非必填";  
        resourcesID = "资源 ID，非必填";
    }
    ```

2. 然后通过 [ZIMMessageSendConfig](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_harmony~interface~ZIMMessageSendConfig) 对象的 `pushConfig` 参数，配置离线消息的相关配置等。

    ```typescript
    const sendConfig: ZIMMessageSendConfig = {
        priority: 2,
        pushConfig: pushConfig
    };
    ```

3. 发送方调用 [sendMessage](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_harmony~class~ZIM#send-message)，传入 “sentConfig”，向群组内的所有用户发送消息。

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

1. 开发者通过 [ZIMPushConfig](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_harmony~interface~ZIMPushConfig) 对象，设置离线推送标题、内容、以及其他自定义属性。

    ```typescript
    const pushConfig: ZIMPushConfig = {
        title = "离线推送标题";
        content = "离线推送内容";
        payload = "自定义透传字段,非必填";  
        resourcesID = "资源 ID，非必填";
    }
    ```
2. 然后通过 [ZIMCallInviteConfig](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_harmony~interface~ZIMCallInviteConfig) 对象的 `pushConfig` 参数，配置离线消息的相关配置等。

    ```typescript
    const callInviteConfig: ZIMCallInviteConfig = {
        mode: 0,
        timeout: 90,
        extendedData: '',
        pushConfig: pushConfig
    }
    ```

3. 发送方调用 [callInvite](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_harmony~class~ZIM#call-invite)，传入 “callInviteConfig”，发起呼叫邀请。

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
4. 被邀请的用户若处于离线状态，将会收到对应的离线推送，上线后，若呼叫邀请还未结束，将会收到 [callInvitationReceived](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_harmony~interface~ZIMEventHandler#call-invitation-received) 回调。

### 注销离线推送

若开发者希望某台设备不再接收离线推送，可通过调用 [unRegisterPush](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_harmony~class~ZPNs#unregister-push) 接口注销。注销后，发送弹窗推送、静默推送也将不再生效。

```typescript
ZPNs.getInstance().unregisterPush();
```

## 在线调试

集成 ZPNs SDK 和获取 PushID 后，您可以在 [ZEGO 控制台](https://console.zego.im/) 在线调试 ZIM 离线推送功能，详情请参考控制台的 [ZIM 离线推送调试](https://doc-zh.zego.im/article/17949)。