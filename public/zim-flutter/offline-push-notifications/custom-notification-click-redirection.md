export const getPlatformData = (props, data) => {
    const platform = (props.platform ?? "Android").toLowerCase();
    for (const [key, value] of Object.entries(data)) {
        const pList = key.split(",").map((v) => v.toLowerCase());
        if (pList.includes(platform)) {
            return value;
        }
    }
    return data["Android"] || data["android"] || data["default"];
};

export const getPlatformData2 = (props, data) => {
    const platform = (props.platform ?? "default").toLowerCase();
    for (const [key, value] of Object.entries(data)) {
        const pList = key.split(",").map((v) => v.toLowerCase());
        if (pList.includes(platform)) {
            return value;
        }
    }
    return data["default"];
};

export const registerPushMap = {
  'Android,RN': <a href="@registerPush" target='_blank'>registerPush</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zpns/latest/zego_zpns/ZPNs/registerPush.html" target='_blank'>registerPush</a>,
}

export const ZPNsEventHandlerMap = {
  'Android,RN': <a href="@-ZPNsEventHandler" target='_blank'>ZPNsEventHandler</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zpns/latest/zego_zpns/ZPNsEventHandler-class.html" target='_blank'>ZPNsEventHandler</a>,
}

export const onNotificationClickedMap = {
  'Android': <a href="@onNotificationClicked" target='_blank'>onNotificationClicked</a>,
  'RN': <a href="@notificationClicked" target='_blank'>notificationClicked</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zpns/latest/zego_zpns/ZPNsEventHandler/onNotificationClicked.html" target='_blank'>onNotificationClicked</a>,
}

# 自定义点击跳转

:::if{props.platform=undefined}
<Note title="说明">本文档仅适用于 FCM 以外的 Android 推送通道。</Note>
:::
:::if{props.platform="Flutter|RN"}
<Note title="说明">本文档仅适用于 FCM 以外的 Android 推送通道以及 Apple 推送服务（APNs）。</Note>
:::

---

## 描述

通常，用户点击离线推送通知时，会跳转到应用首页。基于本功能，开发者可以自定义离线推送通知的点击跳转逻辑，比如用户在点击推送消息时，能够跳转到指定页面，从而提升用户体验和交互效率。

:::if{props.platform="undefined|Flutter|RN"}
- 自定义前：
    <Video src="https://media-resource.spreading.io/docuo/workspace564/27e54a759d23575969552654cb45bf89/7a952bc33f.mp4" />
- 自定义后：
    <Video src="https://media-resource.spreading.io/docuo/workspace564/27e54a759d23575969552654cb45bf89/7b35ed7b40.mp4" />
:::

## 前提条件

在实现自定义点击跳转之前，请确保：
- 已集成 2.8.0 或以上版本的 ZPNs SDK，详情请参考 [实现离线推送](/zim-flutter/offline-push-notifications/implement-offline-push-notification)。
- 已在控制台配置离线推送证书，详情请参考控制台文档 [服务配置 - 即时通讯 - 离线推送配置](https://doc-zh.zego.im/article/16233)。

## 实现流程

<Steps>
<Step title="开通功能">
请联系 ZEGO 技术支持配置开启自定义点击跳转功能。
</Step>
:::if{props.platform=undefined}
<Step title="重写回调">
请在自定义的 [ZPNsMessageReceiver](https://doc-zh.zego.im) 广播类派生类中（请参考 [实现离线推送->使用 ZPNs SDK 注册离线推送功能](/zim-flutter/offline-push-notifications/implement-offline-push-notification#使用-zpns-sdk-注册离线推送功能) 的类似内容），重写 {getPlatformData(props,onNotificationClickedMap)} 方法，以便获取跳转目标页面的路径。
```java
protected void onNotificationClicked(Context context, ZPNsMessage message) {
    Log.e("MyZPNsReceiver", "onNotificationClicked message:" + message.toString());
    // 获取透传消息（即跳转目标页面的路径）
    // 与发送消息时传入的 ZIMPushConfig > payload 字段内容一致, 请参考 [实现离线推送 - 使用 ZIM SDK 实现离线推送功能](https://doc-zh.zego.im/zim-android/offline-push-notifications/implement-offline-push-notification#%E4%BD%BF%E7%94%A8-zim-sdk-%E5%AE%9E%E7%8E%B0%E7%A6%BB%E7%BA%BF%E6%8E%A8%E9%80%81%E5%8A%9F%E8%83%BD)。
    String payload = message.getPayload();
    // 您可以根据上述信息编写代码实现跳转
}
```
</Step>
:::
:::if{props.platform="Flutter"}
<Step title="监听回调">
在调用 {getPlatformData(props,registerPushMap)} 方法之前，监听 {getPlatformData(props,ZPNsEventHandlerMap)} 中的 {getPlatformData(props,onNotificationClickedMap)} 方法，以便获取跳转目标页面的路径。
```dart
ZPNsEventHandler.onNotificationClicked = (ZPNsMessage message){
    if(zpnsMessage.pushSourceType == ZPNsPushSourceType.FCM){
        // FCM 不支持此接口，请在 Android Activity 中使用 Intent 获取 payload。
    }else{
        // 获取透传消息（即跳转目标页面的路径）
        // 请参考 [实现离线推送 - 使用 ZIM SDK 实现离线推送功能](https://doc-zh.zego.im/zim-flutter/offline-push-notifications/implement-offline-push-notification#%E4%BD%BF%E7%94%A8-zim-sdk-%E5%AE%9E%E7%8E%B0%E7%A6%BB%E7%BA%BF%E6%8E%A8%E9%80%81%E5%8A%9F%E8%83%BD)。
        String payload = message.payload; 
        // 您可以根据上述信息编写代码实现跳转
    }
};
```
</Step>
:::
:::if{props.platform="RN"}
<Step title="监听回调">
在调用 {getPlatformData(props,registerPushMap)} 方法之前，监听 {getPlatformData(props,ZPNsEventHandlerMap)} 中的 {getPlatformData(props,onNotificationClickedMap)} 方法，以便获取跳转目标页面的路径。
```typescript
ZPNs.getInstance().on('notificationClicked', message => {
    if (message.pushSourceType == ZPNsPushSourceType.FCM){
        // FCM 不支持此接口，请在 Android Activity 中使用 Intent 获取 payload。
    }else{
        // 获取透传消息（即跳转目标页面的路径）
        // 与发送消息时传入的 ZIMPushConfig > payload 字段内容一致, 请参考 [实现离线推送 - 使用 ZIM SDK 实现离线推送功能](https://doc-zh.zego.im/zim-rn/offline-push-notifications/implement-offline-push-notification#%E4%BD%BF%E7%94%A8-zim-sdk-%E5%AE%9E%E7%8E%B0%E7%A6%BB%E7%BA%BF%E6%8E%A8%E9%80%81%E5%8A%9F%E8%83%BD)。
        const payload = message.payload; 
        // 您可以根据上述信息编写代码实现跳转
    }
});
```
</Step>
:::
<Step title="配置透传字段">
消息发送者在发送消息时，需要通过 `ZIMPushConfig > payload` 参数设置透传字段（例如需要跳转到的目标页面路径）。相关代码请参考 [实现离线推送 - 使用 ZIM SDK 实现离线推送功能](/zim-flutter/offline-push-notifications/implement-offline-push-notification#使用-zim-sdk-实现离线推送功能) 章节。
</Step>
<Step title="触发回调">
:::if{props.platform=undefined}
收到推送后，当用户点击该推送，ZPNs 将会回调 {getPlatformData(props,onNotificationClickedMap)} 事件，随即用户界面跳转至指定页面。
:::
:::if{props.platform="Flutter|RN"}
收到推送后，当用户点击该推送，ZPNs 将会回调 {getPlatformData(props,onNotificationClickedMap)} 事件。

如果点击时，您还未调用过 ZPNs 的 {getPlatformData(props,registerPushMap)} 方法，那么，此事件会被暂存，直到您调用 {getPlatformData(props,registerPushMap)} 方法后才会回调。
:::
</Step>
</Steps>

<Content platform="Flutter"/>