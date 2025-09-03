# 更新图标角标


## 概述

ZPNs 支持向 Android 端设备发送离线推送后，接受端在离线状态更新 App 图标数字角标，提醒用户消息未读数。

## 前提条件

- 已集成 2.6.0 或以上版本的 ZPNs SDK，并且实现离线推送，详情请参考 [实现离线推送](/zim-android/offline-push-notifications/implement-offline-push-notification)。
- Android 9.0 或以上版本 Android 设备或模拟器（推荐使用真机）。 

## 手机厂商说明

<table>
<tbody><tr>
<th>厂商</th>
<th>是否支持角标/角标数显示</th>
<th>适配说明</th>
</tr>
<tr>
<td>谷歌 FCM</td>
<td>支持角标</td>
<td>默认遵从系统逻辑，也可改变单条。</td>
</tr>
<tr>
<td>华为/荣耀</td>
<td>支持角标/角标数</td>
<td>支持角标数随推送增加。</td>
</tr>
<tr>
<td>小米</td>
<td>支持角标/角标数</td>
<td>遵从系统默认逻辑，感应通知栏数目，按 1 自动增减。</td>
</tr>
<tr>
<td>OPPO</td>
<td>仅支持角标</td>
<td>角标展示需由用户在通知设置中手动开启，遵从系统默认逻辑，有通知则展示，无则不展示；角标数只对指定应用开启，例如 QQ、微信，需向官方进行权限申请。</td>
</tr>
<tr>
<td>VIVO</td>
<td>不支持。</td>
<td>-</td>
</tr>
</tbody></table>

## 实现流程

### 发送端发送携带角标的离线推送

当发送消息、呼叫邀请时，发送方可以通过修改 [ZIMPushConfig](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~struct~ZIMPushConfig) 中有关角标的参数，来决定接受端 App 图标角标的变化情况。

 ```java
ZIMPushConfig pushConfig = new ZIMPushConfig();
// 推送是否携带角标信息开关，默认为 false
pushConfig.enableBadge = true;
// 本条推送对目标设备的角标增量，此处设置为 1，这将使接收端设备 app 的角标数 + 1。（仅限支持角标增量的接收端：FCM、华为）
pushConfig.badgeIncrement = 1;
```

### 接收端更新角标

根据手机厂商不同，实际的更新效果有所不同。

#### Google 设备更新角标

从 [Android 8.0(API 26)](https://developer.android.com/training/notify-user/badges?hl=zh-cn) 开始，系统收到 FCM 推送后会默认展示角标（圆点）。

<Frame width="128" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/ZIM/icon.png" /></Frame>

清除通知栏相应的通知后，角标也会自动清除。

#### 华为设备更新角标

##### 前提条件

1. 版本要求

    EMUI 8.0  及以上或 Magic UI 5.0+

2. 声明权限

    在 “AndroidManifest.xml” 里配置指定的权限

    ```xml
    < uses - permission android: name = "android.permission.INTERNET" / >
    < uses - permission android: name = "com.huawei.android.launcher.permission.CHANGE_BADGE " / >
    ```

3. 配置您 app 的入口 Activity 

    请联系技术支持，配置您 app 的入口 activity。例如 `com.huawei.codelabpush.MainActivity`.

4. 开启华为角标

    在调用 [registerPush](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZPNsManager#register-push) 注册离线推送之前，调用 [setPushConfig](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZPNsManager#set-push-config) 接口，开启华为角标功能。

    ```java
    ZPNsConfig config = new ZPNsConfig();
    config.enableHwBadge(true);
    ZPNsManager.setPushConfig(config);
    ```

#### 小米设备更新角标

MIUI 6 及以上设备支持数字角标，系统自动处理角标相关逻辑。

收到通知后 + 1，打开 APP 清零。不受 ZPNs 影响。

#### vivo 设备更新角标

vivo 不支持离线推送携带角标。仅支持客户端 <a href="#修改本地角标数">本地设置角标</a>。

## 更多功能

### 修改本地角标数

ZPNs 封装了支持修改本地角标数的厂商（华为、vivo、OPPO）的相关 API。当您需要修改本地角标时。请调用 [setApplicationIconBadgeNumber](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZPNsManager#set-application-icon-badge-number) 接口。

```java
//修改本地角标为 1
int badge = 1;
ZPNsManager.getInstance().setApplicationIconBadgeNumber(context,badge);
```