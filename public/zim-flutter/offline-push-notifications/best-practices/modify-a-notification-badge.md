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

export const ZIMPushConfig={
    "default": <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMPushConfig-class.html" target="_blank">ZIMPushConfig</a>,
    "RN": <a href="https://doc-zh.zego.im/article/api?doc=zim_API~javascript_react-native~interface~ZIMPushConfig" target="_blank">ZIMPushConfig</a>
}

export const setServerBadge={
    "default": <a href="https://pub.dev/documentation/zego_zpns/latest/zego_zpns/ZPNs/setServerBadge.html" target="_blank">setServerBadge</a>,
    "RN": <a href="@setServerBadge" target="_blank">setServerBadge</a>
}
export const registerPush={
    "default": <a href="https://pub.dev/documentation/zego_zpns/latest/zego_zpns/ZPNs/registerPush.html" target="_blank">registerPush</a>,
    "RN": <a href="@registerPush" target="_blank">registerPush</a>
}
export const setPushConfig={
    "default": <a href="https://pub.dev/documentation/zego_zpns/latest/zego_zpns/ZPNs/setPushConfig.html" target="_blank">setPushConfig</a>,
    "RN": <a href="@setPushConfig" target="_blank">setPushConfig</a>
}
export const setLocalBadge={
    "default": <a href="https://pub.dev/documentation/zego_zpns/latest/zego_zpns/ZPNs/setLocalBadge.html" target="_blank">setLocalBadge</a>,
    "RN": <a href="@setLocalBadge" target="_blank">setLocalBadge</a>
}

# 更新图标角标


## 概述

ZPNs 支持向 Android 端设备发送离线推送后，接受端在离线状态更新 App 图标数字角标，提醒用户消息未读数。

## 前提条件

- 已集成 2.6.0 或以上版本的 ZPNs SDK，并且实现离线推送，详情请参考 [实现离线推送](/zim-flutter/offline-push-notifications/implement-offline-push-notification)。
- Android 9.0 或以上版本 Android 设备或模拟器（推荐使用真机）。 
- iOS 11.0 或以上版本的 iOS 真机设备。


<Tabs>
<Tab title="iOS">

### 接受端上报角标数字

当接收端为在线状态时，需要调用 {getPlatformData2(props, setServerBadge)} 接口向 ZPNs 服务器上报 App 当前的角标数值，后续当接收端收到离线推送后，ZPNs 将基于此数值，自动修改接收端的角标数值。

<Note title="说明">
badge 值不得小于 0。
</Note>

:::if{props.platform=undefined}
```dart
// 此处向 ZPNs 服务端上报当前 app 的角标为 1.
ZPNs.getInstance().setServerBadge(1);
```
:::
:::if{props.platform="RN"}
```typescript
// 此处向 ZPNs 服务端上报当前 app 的角标为 1.
ZPNs.getInstance().setServerBadge(1);
```
:::

### 发送端发送携带角标的离线推送

当发送消息、呼叫邀请时，发送方可以通过修改 {getPlatformData2(props, ZIMPushConfig)} 中有关角标的参数，来决定接受端 App 图标角标的变化情况。

:::if{props.platform=undefined}
```dart
ZIMPushConfig pushConfig = ZIMPushConfig();
// 推送是否携带角标信息开关，默认为 false
pushConfig.enableBadge = true;
// 本条推送对目标设备的角标增量，此处设置为 1，这将使接收端设备 app 的角标数 + 1。（仅限支持角标增量的接收端：fcm,华为）
pushConfig.badgeIncrement = 1;
```
:::
:::if{props.platform="RN"}
```typescript
const pushConfig: ZIMPushConfig = {
    ...
    // 推送是否携带角标信息开关，默认为 false
    enableBadge: true,
    // 本条推送对目标设备的角标增量，此处设置为 1，这将使接收端设备 app 的角标数 + 1。（仅限支持角标增量的接收端：fcm,华为,apple）
    badgeIncrement: 1,
}
```
:::

### 接收端自动更新角标

接收到离线推送后，ZPNs SDK 会自动根据离线推送中的角标信息，从而调整 App 的图标角标。

</Tab>
<Tab title="Android">


| 厂商      | 是否支持角标/角标数显示 | 适配说明                                                                                                                                        |
| :-------- | :---------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------- |
| 谷歌 FCM  | 支持角标。              | 默认遵从系统逻辑，也可改变单条。                                                                                                                |
| 华为/荣耀 | 支持角标/角标数。       | 支持角标数随推送增加。                                                                                                                          |
| 小米      | 支持角标/角标数。       | 遵从系统默认逻辑，感应通知栏数目，按 1 自动增减。                                                                                               |
| OPPO      | 仅支持角标。            | 角标展示需由用户在通知设置中手动开启，遵从系统默认逻辑，有通知则展示，无则不展示；角标数只对指定应用开启，例如 QQ、微信，需向官方进行权限申请。 |
| VIVO      | 不支持。                | -                                                                                                                                               |


### 发送端发送携带角标的离线推送

当发送消息、呼叫邀请时，发送方可以通过修改 {getPlatformData2(props, ZIMPushConfig)} 中有关角标的参数，来决定接受端 App 图标角标的变化情况。

:::if{props.platform=undefined}
```dart
ZIMPushConfig pushConfig = ZIMPushConfig();
// 推送是否携带角标信息开关，默认为 false
pushConfig.enableBadge = true;
// 本条推送对目标设备的角标增量，此处设置为 1，这将使接收端设备 app 的角标数 + 1。（仅限支持角标增量的接收端：fcm,华为）
pushConfig.badgeIncrement = 1;
```
:::
:::if{props.platform="RN"}
```typescript
const pushConfig: ZIMPushConfig = {
    ...
    // 推送是否携带角标信息开关，默认为 false
    enableBadge: true,
    // 本条推送对目标设备的角标增量，此处设置为 1，这将使接收端设备 app 的角标数 + 1。（仅限支持角标增量的接收端：fcm,华为,apple）
    badgeIncrement: 1,
}
```
:::


### 接收端更新角标

根据手机厂商不同，实际的更新效果有所不同。

<Accordion title="Google 设备更新角标" defaultOpen="false">
从 [Android 8.0(API 26)](https://developer.android.com/training/notify-user/badges?hl=zh-cn) 开始，系统收到 FCM 推送后会默认展示角标（圆点）。

<Frame width="64" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/ZIM/icon.png" /></Frame>

清除通知栏相应的通知后，角标也会自动清除。
</Accordion>
<Accordion title="华为设备更新角标" defaultOpen="false">
1. 版本要求：EMUI 8.0  及以上或 Magic UI 5.0+。

2. 在 “AndroidManifest.xml” 里配置指定的权限。

    ```xml
    < uses - permission android: name = "android.permission.INTERNET" / >
    < uses - permission android: name = "com.huawei.android.launcher.permission.CHANGE_BADGE " / >
    ```

3. 请联系 ZEGO 技术支持，配置您 App 的入口 Activity。例如 `com.huawei.codelabpush.MainActivity`。

4. 开启华为角标。在调用 {getPlatformData2(props, registerPush)} 注册离线推送之前，调用 {getPlatformData2(props, setPushConfig)} 接口，开启华为角标功能。

:::if{props.platform=undefined}
    ```dart
    ZPNsConfig config = ZPNsConfig();
    config.enableHwBadge(true);
    ZPNsManager.setPushConfig(config);
    ```
:::
:::if{props.platform="RN"}
    ```typescript
    ZPNs.setPushConfig({enableHwBadge:true});
    ```
:::
</Accordion>
<Accordion title="小米设备更新角标" defaultOpen="false">
MIUI 6 及以上设备支持数字角标，系统自动处理角标相关逻辑。

收到通知后 + 1，打开 APP 清零，不受 ZPNs 影响。
</Accordion>
<Accordion title="vivo 设备更新角标" defaultOpen="false">
vivo 不支持离线推送携带角标，仅支持客户端 <a href="#修改本地角标数">修改本地角标数</a>。
</Accordion>

</Tab>
</Tabs>

## 更多功能

### 修改本地角标数
ZPNs 封装了支持修改本地角标数的厂商（Apple、华为、vivo、OPPO)的相关 API。当您需要修改本地角标时，请调用 {getPlatformData2(props, setLocalBadge)} 接口。

:::if{props.platform=undefined}
```dart
//修改本地角标为 1
int badge = 1;
ZPNs.getInstance().setLocalBadge(1);  
```
:::
:::if{props.platform="RN"}
```typescript
//修改本地角标为 1
ZPNs.getInstance().setLocalBadge(1);  
```
:::
