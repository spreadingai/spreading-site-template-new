# ZPNs 升级指南

- - -

本文介绍 ZPNs Android 平台 SDK 版本升级时的一些说明和注意事项。

## 2.7.0 升级指南

请注意，2.7.0 版本开始，ZPNs 将各个厂商包的实现逻辑打包到了不同的厂商库中。若您从低版本升级，需要根据您的厂商接入情况，依赖对应的 ZPNs 厂商包并更新厂商推送库，详情请查阅最新的接入文档（[小米](/zim-android/offline-push-notifications/integrate-xiaomi)/[华为](/zim-android/offline-push-notifications/integrate-huawei)/[OPPO](/zim-android/offline-push-notifications/integrate-oppo)/[vivo](/zim-android/offline-push-notifications/integrate-vivo)/[Google](/zim-android/offline-push-notifications/integrate-fcm)）。

## 2.2.0 升级指南

<Warning title="注意">

请注意，从 2.2.0 版本开始，API 接口有重大变更，因此在从旧版本升级到 2.2.0 版本时，请您阅读以下指南。
</Warning>

### ZPNsMessageReceiver 回调方法变更

#### 厂商透传消息回调

```java
// 新方法
protected abstract void onThroughMessageReceived(Context context, ZPNsMessage message);

// 旧方法
protected abstract void onThroughMessage(Context context, ZPNsMessage message);
```


### ZPNsConfig 配置类的属性变更

#### 启用小米推送

```java 
// 新属性
public boolean enableMiPush;

// 旧属性
public boolean xiaomi_push;
```

#### 启用华为推送

```java
// 新属性
public boolean enableHWPush;

// 旧属性
public boolean hw_push;
```

#### 启用 OPPO 推送

```java
// 新属性
public boolean enableOppoPush;

// 旧属性
public boolean oppo_push;
```


#### 启用 vivo 推送

```java
// 新属性
public boolean enableVivoPush;

// 旧属性
public boolean vivo_push;
```

#### 启用 Google FCM 推送


```java
// 新属性
public boolean enableFCMPush;

// 旧属性
public boolean fcm_push;
```

### ZPNsConfig 配置类的方法变更

#### 启用小米推送

```java
// 新方法
public ZPNsConfig enableMiPush(String miAppID, String miAppKey);

// 旧方法
public ZPNsConfig enableMiPush(boolean enable);
```

#### 启用华为推送

```java
// 新方法
public ZPNsConfig enableHWPush(String hwAppID);


// 旧方法
public ZPNsConfig enableHWPush(boolean enable);
```

#### 启用 OPPO 推送

```java
// 新方法
public ZPNsConfig enableOppoPush(String oppoAppID, String oppoAppKey, String oppoAppSecret);

// 旧方法
public ZPNsConfig enableOppoPush(boolean enable);
```

#### 启用 vivo 推送

旧方法

```java
// 新方法
public ZPNsConfig enableVivoPush(String vivoAppID, String vivoAppKey);

// 旧方法
public ZPNsConfig enableVivoPush(boolean enable);
```

#### 启用 Google FCM 推送

```java
// 新方法
public ZPNsConfig enableFCMPush();

// 旧方法
public ZPNsConfig enableFCMPush(boolean enable);
```

### ZPNsConfig 配置类的方法新增

#### 关闭小米推送

```java
public ZPNsConfig disableMiPush();
```

#### 关闭华为推送

```java
public ZPNsConfig disableHWPush();
```

#### 关闭 OPPO 推送

```java
public ZPNsConfig disableOppoPush();
```

#### 关闭 vivo 推送

```java
public ZPNsConfig disableVivoPush();
```

#### 关闭 Google FCM 推送

```java
public ZPNsConfig disableFCMPush();
```

### ZPNsConfig 配置类的方法移除

#### 设置小米相关的配置信息

```java
public ZPNsConfig setMiAppID(String miAppID, String miAppKEY);
```

#### 设置华为相关的配置信息

```java
public ZPNsConfig setHwAppID(String hwAppID);
```

#### 设置 OPPO 相关的配置信息

```java
public ZPNsConfig setOppoAppID(String oppoAppID, String oppoAppKey, String oppoAppSecret);
```

#### 设置 vivo 相关的配置信息

```java
public ZPNsConfig setVivoAppID(String vivoAppID, String vivoAppKey);
```
