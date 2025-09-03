# 获取 payload 字段

## 功能简介

离线推送发送端通过配置 [ZIMPushConfig](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~struct~ZIMPushConfig) 的 payload 参数（2.5.0 之前版本为 extendedData 参数）向接收端发送额外信息，接收端需使用 ZPNs SDK 时，通过厂商通道的 extras 里面的 payload 字段获取该信息。

本文档介绍了如何使用 ZPNs SDK 的接口，获取 payload 透传字段。

<Warning title="注意">
- ZPNs SDK 需要搭配 ZIM SDK 2.0.0 或以上版本使用。
- 使用 ZPNs SDK 前，请先在 [ZEGO 控制台](https://console.zego.im) 自助配置 ZIM 离线推送证书（详情请参考 [项目管理 - 即时通讯 - 离线推送配置](https://doc-zh.zego.im/article/16233)），若无法配置，请联系 ZEGO 技术支持处理。
</Warning>

<Content />


## 前提条件

- 已集成 ZPNs SDK，详情请参考[实现离线推送](/zim-android/offline-push-notifications/implement-offline-push-notification)。

## 实现流程

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

2. 开发者在主 Activity 的 `onCreate` 或者 `onNewIntent` 中，通过如下方式，调用 [getZPNsMessage](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZPNsManager#get-zp-ns-message) 获取数据。

```JAVA
@Override
protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    ZPNsMessage zpNsInfo = ZPNsManager.getInstance().getZPNsMessage(this.getApplication(), getIntent());
}
```
