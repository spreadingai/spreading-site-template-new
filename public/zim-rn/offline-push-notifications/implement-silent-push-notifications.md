# 实现静默推送


## 功能简介

静默推送属于特殊的远程通知，主要用于后台运行的 App 和服务器进行数据同步，例如：App 不在活跃时，App 内数据已经过时，服务器会发送静默推送，此时 App 则进行数据更新，用户全程无感知。

<Warning title="注意">
- 静默推送主要用于更新和同步数据，用户对其无感知，因此静默推送一般不设置内容、声音和角标通知。
- 静默推送唤醒后台 App 并执行下载任务时，最多有 30 秒时间执行。
- App 处于前/后台运行时、后台进程被挂起（保留 App 内存资源）时均可触发对应通知回调，App 关闭后不能触发回调。
- 静默推送请求在 APNs 属于低优先级任务，苹果不保证静默推送的到达率。
- 不要利用静默推送对 App 进行保活，APNs 若检测到较高频率的静默推送的发送请求，可能会终止其发送。
</Warning>


<Content />

<Note title="说明">
本文档适用于以下平台：iOS 和 Android（仅限支持 Google 服务的智能设备）。
</Note>

## 前提条件

在实现静默推送之前，请确保：
- 已集成 ZPNs SDK **2.3.3 或以上版本** 并实现离线推送，详情请参考 [实现离线推送](/zim-rn/offline-push-notifications/implement-offline-push-notification)。

## 实现流程

### 发送静默推送

1. 联系 ZEGO 技术支持配置携带静默推送策略的 `resourceID`。静默推送策略有 iOS 和 FCM 两种。根据实际需求，您可以选择只携带一种静默推送策略的 `resourceID`。

2. 在需要发送离线推送的场景（如 [呼叫邀请](/zim-rn/guides/call-invitation-signaling)、[离线推送](/zim-rn/offline-push-notifications/implement-offline-push-notification) 等），向 [ZIMPushConfig](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_react-native~interface~ZIMPushConfig) 的 resourceID 字段填入预先配置好的值，并根据具体业务场景的需要填入 payload 字段。

    ```typescript
    const pushConfig: ZIMPushConfig = {
        resourcesID: "your resourcesID", // 联系 ZEGO 技术支持配置的 resourcesID
        title: "your title",
        content: "your content",
        payload: "your payload",
    };
    ```

3. 完成上述步骤，即可向别人发送静默推送

### 接收静默推送

#### iOS 或 Android App 在前台，或者在后台而未终止时

通过注册 [throughMessageReceived](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_react-native~class~ZPNsEventHandler#through-message-received) 事件来接收在线静默推送通知。

```typescript
ZPNs.getInstance().on('throughMessageReceived', message => {
    console.log('ZPNs throughMessageReceived', message);
    // 处理在线静默推送通知
})
```

#### Android App 在后台被终止时

需要在**您的项目的入口文件**导入 ZPNs ，并调用 [setBackgroundMessageHandler](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_react-native~class~ZPNs#set-background-message-handler) 设置回调来接收离线静默推送通知。

```typescript
import ZPNs from 'zego-zpns-react-native';

/** 项目入口的代码，开发者无需处理 **/ 
// import { AppRegistry, Platform } from 'react-native';
// import App from './App';
// import { name as appName } from './app.json';

// AppRegistry.registerComponent(appName, () => App);
/** 项目入口的代码，开发者无需处理 **/

// 注意：以下代码不能在 UI 组件里调用！
ZPNs.setBackgroundMessageHandler(message => {
    console.log('ZPNs backgroundMessageHandler', message);
    // 处理 Android 离线静默推送通知
})
```

完成上述步骤，即可向别人发送静默推送以及接收来自别人的静默推送。
