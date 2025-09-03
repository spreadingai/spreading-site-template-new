# 自定义推送规则

多端登录场景下，如果用户希望当某些平台的账号在线时，部分其他平台上的账号不收到离线推送通知，可以通过自定义推送规则实现。

## 前提条件

在实现“自定义推送规则”功能之前，请确保：

- 已实现 [多端登录](/zim-flutter/guides/users/multi-device-login).
<Content />

## 实现流程

### 用户离线推送规则变化通知

如需用户自定义规则时收到通知，请重写 [ZIMEventHnandler](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMEventHandler-class.html) 对象中的 [onUserRuleUpdated](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMEventHandler/onUserRuleUpdated.html) 方法实现。

```dart
// 监听用户自定义规则
ZIMEventHandler.onUserRuleUpdated = (ZIM zim, ZIMUserRule userRule){
    // 离线推送规则
    userRule.offlinePushRule;
};
```

### 设置离线推送规则

如需支持用户自定义推送规则时，开发者需要构造 [ZIMUserOfflinePushRule](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMUserOfflinePushRule-class.html)，规定用户在哪些平台上在线（[onlinePlatforms](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMUserOfflinePushRule/onlinePlatforms.html)）时，哪些平台无需接收离线推送（[notToReceiveOfflinePushPlatforms](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMUserOfflinePushRule/notToReceiveOfflinePushPlatforms.html)）。

调用 [updateUserOfflinePushRule](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/updateUserOfflinePushRule.html) 接口，设置上述规则。

```dart
// 设置离线推送规则
try{

    ZIMUserOfflinePushRule rule = ZIMUserOfflinePushRule();
    // 当用户 win、MacOS、Linux 平台登录时
    rule.onlinePlatforms = [ZIMPlatformType.win,ZIMPlatformType.macOS, ZIMPlatformType.linux];
    // 用户在 iPhoneOS、iPadOS、Android 上不收到离线推送
    rule.notToReceiveOfflinePushPlatforms = [ZIMPlatformType.iPhoneOS, ZIMPlatformType.iPadOS, ZIMPlatformType.android];

    // 调用 updateUserOfflinePushRule 方法
    ZIMUserOfflinePushRuleUpdatedResult result = await ZIM.getInstance()!.updateUserOfflinePushRule(rule);

} on PlatformException catch (onError) {
    onError.code;
    onError.message;
}
```

### 查询用户定义的推送规则

通过调用 [querySelfUserInfo](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/querySelfUserInfo.html)，即可在回调中的 `selfUserInfo.userRule.offlinePushRule` 获取当前用户自定义的离线推送规则。

```dart
// 查询用户定义的推送规则 
try{
    ZIMSelfUserInfoQueriedResult result = await ZIM.getInstance()!.querySelfUserInfo();
    result.selfUserInfo.userFullInfo; // 当前用户的用户信息
    result.selfUserInfo.userRule.offlinePushRule; // 当前用户定义的离线推送规则

} on PlatformException catch (onError) {
    onError.code;
    onError.message;
}
```