# 获取 payload 字段

<Note title="说明">
本文档适用于 iOS 和 Android 端应用。
</Note>
<Content1 />

## 功能简介

离线推送发送端通过配置 [ZIMPushConfig](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_react-native~interface~ZIMPushConfig) 的 payload 参数（2.5.0 之前版本为 extendedData 参数）向接收端发送额外信息，接收端需使用 ZPNs SDK 时，通过厂商通道的 extras 里面的 payload 字段获取该信息。

本文档介绍了如何使用 ZPNs SDK 的接口，获取 payload 透传字段。

<Warning title="注意">
- ZPNs SDK 需要搭配 ZIM SDK 2.0.0 或以上版本使用。
- 使用 ZPNs SDK 前，请先在 [ZEGO 控制台](https://console.zego.im) 自助配置 ZIM 离线推送证书（详情请参考 [项目管理 - 即时通讯 - 离线推送配置](https://doc-zh.zego.im/article/16233)），若无法配置，请联系 ZEGO 技术支持处理。
</Warning>

<Content />


## 前提条件

- 已集成 ZPNs SDK，详情请参考[实现离线推送](/zim-rn/offline-push-notifications/implement-offline-push-notification)。

## 实现流程

根据离线推送接收端的厂商，开发者应选择不同的 payload 透传字段获取方式，分别为监听 ZPNsEventHandler 的通知，和通过原生方式从 Activity 获取。

###  通过 ZPNsEventHandler 回调方法中的 ZPNsMessage 对象获取（支持除 vivo 外的所有厂商）

<Note title="说明">
本方法适用于除 vivo 以外厂商的手机。如您需要了解如何在 vivo 手机上的实现方法，请参考“从 Activity 获取”。
</Note>

通过 ZPNs 的 [on](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_react-native~class~ZIM#on) 方法，监听 [ZPNsEventHandler](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_react-native~class~ZPNsEventHandler) 的回调通知：

```typescript
/**
  * 接口定义
  */
interface ZPNsEventHandler {
    registered: (message: ZPNsRegisterMessage) => void;
    notificationArrived: (message: ZPNsMessage) => void;
    notificationClicked: (message: ZPNsMessage) => void;
    throughMessageReceived: (message: ZPNsMessage) => void;
}

/* 注册监听-示例 */

ZPNs.getInstance().on('registered', (message) => {
    console.log('[ZPNs] registered. pushID: ' + message.pushID + ", error: " + message.errorCode)
});

/* 按需实现如下方法，获取 payload 字段 */
ZPNs.getInstance().on('throughMessageReceived', (message) => {
    console.log('[ZPNs] throughMessageReceived', message.extras.payload)
});
ZPNs.getInstance().on('notificationClicked', (message) => {
    console.log('[ZPNs] notificationClicked', message.extras.payload)
});
ZPNs.getInstance().on('notificationArrived', (message) => {
    console.log('[ZPNs] notificationArrived', message.extras.payload)
});
```

### 从 Activity 获取（仅支持 Android 厂商）

1. 在 AndroidManifest.xml 文件设置主 Activity 的 exported 属性为 true，并配置 intent-filter。
  
```xml
<activity
    android:name="您的项目的主 Activity 路径"
    android:exported="true">
    <intent-filter>
        <action android:name="android.intent.action.MAIN" />
        <category android:name="android.intent.category.LAUNCHER" />
    </intent-filter>
</activity>
```

2. 开发者在主 Activity 的 `onCreate` 或者 `onNewIntent` 中，通过如下方式获取数据。

```JAVA
@Override
protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    String payload = getIntent().getExtras().getString("payload");
}
```
