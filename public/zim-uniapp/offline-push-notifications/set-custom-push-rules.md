# 自定义推送规则

多端登录场景下，如果用户希望当某些平台的账号在线时，部分其他平台上的账号不收到离线推送通知，可以通过自定义推送规则实现。

## 前提条件

在实现“自定义推送规则”功能之前，请确保：

- 已实现 [多端登录](/zim-uniapp/guides/users/multi-device-login).
<Content />

## 实现流程

### 用户离线推送规则变化通知

如需在用户自定义规则时收到通知，请注册 [userRuleUpdated](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_uni-app~interface~ZIMEventHandler#user-rule-updated) 事件实现。

```typescript
// 监听用户自定义规则
zim.on('userRuleUpdated', (zim, data) => {
    // 离线推送规则
    const offlinePushRule = data.userRule.offlinePushRule;
});
```

### 设置离线推送规则

如需支持用户自定义推送规则时，开发者需要构造 [ZIMUserOfflinePushRule](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_uni-app~interface~ZIMUserOfflinePushRule) 类型参数，规定用户在哪些平台上在线（[onlinePlatforms](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_uni-app~interface~ZIMUserStatus#online-platforms)）时，哪些平台无需接收离线推送（[notToReceiveOfflinePushPlatforms](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_uni-app~interface~ZIMUserOfflinePushRule#not-to-receive-offline-push-platforms)）。

调用 [updateUserOfflinePushRule](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_uni-app~class~ZIM#update-user-offline-push-rule) 接口，设置上述规则。

```typescript
// 设置离线推送规则

const offlinePushRule: ZIMUserOfflinePushRule = {
    // 当用户 Win、MacOS、Linux 平台登录时
    onlinePlatforms: [1, 4, 5],
    // 用户在 iPhoneOS、iPadOS、Android 上不收到离线推送
    notToReceiveOfflinePushPlatforms: [2, 3, 9],
};

zim.updateUserOfflinePushRule(offlinePushRule)
    .then((res: ZIMUserOfflinePushRuleUpdatedResult) => {
        // success
    })
    .catch((err: ZIMError) => {
        // error
    });
```

### 查询用户定义的推送规则

通过调用 [querySelfUserInfo](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_uni-app~class~ZIM#query-self-user-info) 即可获取当前用户自定义的离线推送规则。

```typescript 
zim.querySelfUserInfo()
    .then((res: ZIMSelfUserInfoQueriedResult) => {
        
    });
```
