# 更新图标角标


## 概述

ZPNs 支持向 iOS 端设备发送离线推送后，接受端在离线状态更新 App 图标数字角标，提醒用户消息未读数。

## 前提条件

- 已集成 2.6.0 或以上版本的 ZPNs SDK，并且实现离线推送，详情请参考 [实现离线推送](/zim-ios/offline-push-notifications/implement-offline-push-notification)。 
- iOS 11.0 或以上版本的 iOS 真机设备。

## 实现流程

### 1 接受端上报角标数字

当接收端为在线状态时，需要调用 [setBadge](https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_ios~protocol~ZPNs#set-badge-badge) 接口向 ZPNs 服务器上报 App 当前的角标数值，后续当接收端收到离线推送后，ZPNs 将基于此数值，自动修改接收端的角标数值。

<Note title="说明">
badge 值不得小于 0。
</Note>

```objc
// 此处向 ZPNs 服务端上报当前 app 的角标为 1.
[[ZPNs shared] setBadge:1];
```

### 2 发送端发送携带角标的离线推送

当发送消息、呼叫邀请时，发送方可以通过修改 [ZIMPushConfig](https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_ios~class~ZIMPushConfig) 中有关角标的参数，来决定接受端 App 图标角标的变化情况。

```objc
ZIMPushConfig *pushConfig = [[ZIMPushConfig alloc] init];
// 推送是否携带角标信息，默认为 NO
pushConfig.enableBadge = YES;
// 本条推送对目标设备的角标增量，此处设置为 1，这将使接收端设备 app 的角标数值 + 1。
pushConfig.badgeIncrement = 1;
```

### 3 接收端自动更新角标

接收到离线推送后，ZPNs SDK 会自动根据离线推送中的角标信息，从而调整 App 的图标角标。

## 更多信息
 
### 修改本地角标

如需在用户在线时修改本地角标，可调用 iOS 系统接口 `setApplicationIconBadgeNumber`。随后，需要及时调用 [setBadge](https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_ios~protocol~ZPNs#set-badge-badge) 进行上报，如 [上文所述](#3-接收端自动更新角标)。

```objc
// 此处修改 app 本地 角标数为 1.
[[UIApplication sharedApplication] setApplicationIconBadgeNumber:1]];
```