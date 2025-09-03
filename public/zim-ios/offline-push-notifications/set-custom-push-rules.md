# 自定义推送规则

多端登录场景下，如果用户希望当某些平台的账号在线时，部分其他平台上的账号不收到离线推送通知，可以通过自定义推送规则实现。

## 前提条件

在实现“自定义推送规则”功能之前，请确保：

- 已实现 [多端登录](/zim-ios/guides/users/multi-device-login).
<Content />

## 实现流程

### 用户离线推送规则变化通知

如需用户自定义规则后收到通知，请注册 [ZIMEventHandler](https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_ios~protocol~ZIMEventHandler) 回调代理，并监听 [userRuleUpdated](/article/api?doc=zim_API~objective-c_ios~protocol~ZIMEventHandler#zim-user-rule-updated)。

```objc
// 监听用户自定义规则
- (void)zim:(ZIM *)zim userRuleUpdated:(ZIMUserRule *)userRule{
    // 离线推送规则
    userRule.offlinePushRule;
}
```

### 设置离线推送规则

如需支持用户自定义推送规则时，开发者需要构造 [ZIMUserOfflinePushRule](https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_ios~class~ZIMUserOfflinePushRule)，规定用户在哪些平台上在线（[onlinePlatforms](https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_ios~class~ZIMUserStatus#online-platforms)）时，哪些平台无需接收离线推送（[notToReceiveOfflinePushPlatforms](https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_ios~class~ZIMUserOfflinePushRule#not-to-receive-offline-push-platforms)）。

调用 [updateUserOfflinePushRule](https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_ios~protocol~ZIM#update-user-offline-push-rule-offline-push-rule-callback) 接口，设置上述规则。

```objc
// 设置离线推送规则

// 构造 ZIMUserOfflinePushRule
ZIMUserOfflinePushRule *offlineRule = [[ZIMUserOfflinePushRule alloc] init];
// 当用户 win、MacOS、Linux 平台登录时
offlineRule.onlinePlatforms = @[@(ZIMPlatformTypeWin),@(ZIMPlatformTypeMacOS),@(ZIMPlatformTypeLinux)];
// 用户在 iPhoneOS、iPadOS、Android 上不收到离线推送
offlineRule.notToReceiveOfflinePushPlatforms = @[@(ZIMPlatformTypeIPhoneOS),@(ZIMPlatformTypeIPadOS),@(ZIMPlatformTypeAndroid)];

[[ZIM getInstance] updateUserOfflinePushRule:offlineRule callback:^(ZIMUserOfflinePushRule * _Nonnull offlinePushRule, ZIMError * _Nonnull errorInfo) {
}];
```

### 查询用户定义的推送规则

通过调用 [querySelfUserInfo](https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_ios~protocol~ZIM#query-self-user-info-callback)，即可在回调中的 `selfUserInfo.userRule.offlinePushRule` 获取当前用户自定义的离线推送规则。

```objc
[[ZIM getInstance] querySelfUserInfo:^(ZIMSelfUserInfo * _Nonnull selfUserInfo, ZIMError * _Nonnull errorInfo) {
    selfUserInfo.userRule.offlinePushRule; // 当前用户定义的离线推送规则
}];
```