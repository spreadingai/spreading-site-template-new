# 获取 payload 字段

## 功能简介

离线推送发送端通过配置 [ZIMPushConfig](https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_ios~class~ZIMPushConfig) 的 payload 参数（2.5.0 之前版本为 extendedData 参数）向接收端发送额外信息，接收端需使用 ZPNs SDK 时，通过厂商通道的 extras 里面的 payload 字段获取该信息。

本文档介绍了如何使用 ZPNs SDK 的接口，获取 payload 透传字段。

<Warning title="注意">
- ZPNs SDK 需要搭配 ZIM SDK 2.0.0 或以上版本使用。
- 使用 ZPNs SDK 前，请先在 [ZEGO 控制台](https://console.zego.im) 自助配置 ZIM 离线推送证书（详情请参考 [项目管理 - 即时通讯 - 离线推送配置](https://doc-zh.zego.im/article/16233)），若无法配置，请联系 ZEGO 技术支持处理。
</Warning>

<Content />


## 前提条件

- 已集成 ZPNs SDK，详情请参考[实现离线推送](/zim-ios/offline-push-notifications/implement-offline-push-notification)。

## 实现流程


1. 实现 ZPNsNotificationCenterDelegate 协议中的以下方法：

```objc
// 应用在前台时收到离线推送,触发该方法
-(void)ZPNsNotificationCenter:(UNUserNotificationCenter *)center
      willPresentNotification:(UNNotification *)notification
                     userInfo:(NSDictionary *)userInfo
        withCompletionHandler:(void (^)(UNNotificationPresentationOptions))completionHandler API_AVAILABLE(ios(10.0)){
    [userInfo objectForKey:@"payload"];
}

// 用户点击离线推送通知时,触发该方法
-(void)ZPNsNotificationCenter:(UNUserNotificationCenter *)center
    didReceiveNotificationResponse:(UNNotificationResponse *)response
                     userInfo:(NSDictionary *)userInfo
             withCompletionHandler:(void(^)(void))completionHandler API_AVAILABLE(ios(10.0)){
    [userInfo objectForKey:@"payload"];
}
```

2. 将实现该协议的对象通过 [setZPNsNotificationCenterDelegate](https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_ios~protocol~ZPNs#set-zp-ns-notification-center-delegate-delegate) 方法传入 ZPNs，从上述方法取出的 "payload" 字段获得额外信息，进而实现您的业务逻辑即可。

```objc
[[ZPNs shared] setZPNsNotificationCenterDelegate:(id)yourObject];
```