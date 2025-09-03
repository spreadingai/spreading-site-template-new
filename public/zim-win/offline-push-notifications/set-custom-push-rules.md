# 自定义推送规则

多端登录场景下，如果用户希望当某些平台的账号在线时，部分其他平台上的账号不收到离线推送通知，可以通过自定义推送规则实现。

## 前提条件

在实现“自定义推送规则”功能之前，请确保：

- 已实现 [多端登录](/zim-win/guides/users/multi-device-login).
<Content />

## 实现流程

### 用户离线推送规则变化通知

如需用户自定义规则时收到通知，请重写 [ZIMEventHandler](https://doc-zh.zego.im/article/api?doc=zim_API~cpp_windows~class~ZIMEventHandler) 对象中的 [onUserRuleUpdated](https://doc-zh.zego.im/article/api?doc=zim_API~cpp_windows~class~ZIMEventHandler#on-user-rule-updated) 方法实现。

```cpp
// 监听用户自定义规则
@Override
void onUserRuleUpdated(ZIM * /*zim*/, const ZIMUserRule & userRule) {
    // 离线推送规则
    userRule.offlinePushRule;
}
```

### 设置离线推送规则

如需支持用户自定义推送规则时，开发者需要构造 [ZIMUserOfflinePushRule](https://doc-zh.zego.im/article/api?doc=zim_API~cpp_windows~struct~ZIMUserOfflinePushRule)，规定用户在哪些平台上在线（[onlinePlatforms](https://doc-zh.zego.im/article/api?doc=zim_API~cpp_windows~struct~ZIMUserStatus#online-platforms)）时，哪些平台无需接收离线推送（[notToReceiveOfflinePushPlatforms](https://doc-zh.zego.im/article/api?doc=zim_API~cpp_windows~struct~ZIMUserOfflinePushRule#not-to-receive-offline-push-platforms)）。

调用 [updateUserOfflinePushRule](https://doc-zh.zego.im/article/api?doc=zim_API~cpp_windows~class~ZIM#update-user-offline-push-rule) 接口，设置上述规则。


```cpp
// 设置离线推送规则

// 构造 ZIMUserOfflinePushRule
zim::ZIM::ZIMUserOfflinePushRule offlineRule;

// 当用户 win、MacOS、Linux 平台登录时
offlineRule.onlinePlatforms = {ZIM_PLATFORM_TYPE_WIN, ZIM_PLATFORM_TYPE_MACOS, ZIM_PLATFORM_TYPE_LINUX};

// 用户在 iPhoneOS、iPadOS、Android 上不收到离线推送
offlineRule.notToReceiveOfflinePushPlatforms = {ZIM_PLATFORM_TYPE_IPHONEOS, ZIM_PLATFORM_TYPE_IPADOS, ZIM_PLATFORM_TYPE_ANDROID};


// 调用 updateUserOfflinePushRule 方法
zim::ZIM::ZIM.getInstance()->updateUserOfflinePushRule(offlineRule, [](const zim::ZIM::ZIMUserOfflinePushRule& updatedOfflinePushRule, const zim::ZIM::ZIMError& errorInfo) {});
```

### 查询用户定义的推送规则

通过调用 [querySelfUserInfo](https://doc-zh.zego.im/article/api?doc=zim_API~cpp_windows~class~ZIM#query-self-user-info)，即可在回调中的 `selfUserInfo.userRule.offlinePushRule` 获取当前用户自定义的离线推送规则。

```cpp
zim::ZIM::ZIM.getInstance()->querySelfUserInfo([](const zim::ZIM::ZIMSelfUserInfo& selfUserInfo, const zim::ZIM::ZIMError& errorInfo) {

    selfUserInfo.userRule.offlinePushRule; // 当前用户定义的离线推送规则
});
```