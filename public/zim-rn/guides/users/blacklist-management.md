# 黑名单管理

- - -

<Note title="说明">

黑名单和好友操作互不影响。   

以用户 A 和 B 互为好友为例：

1. 用户 A 可以将用户 B 列入黑名单，但两人仍是好友。
2. 如果此时用户 A 和用户 B 解除好友关系，用户 B 仍会在用户 A 的黑名单中。
3. 之后，如果用户 A 将用户 B 从黑名单中移除，用户 B 仍不会是用户 A 的好友。
</Note>

## 功能简介

用户可以查询自己的黑名单、将指定用户拉黑（不再接收该用户消息）、移出黑名单、以及检查指定用户是否在黑名单内。

## 实现流程

### 查询黑名单列表

登录 ZIM SDK 后，用户可以通过 [queryBlacklist](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_react-native~class~ZIM#query-blacklist) 接口查询黑名单列表。

查询结果通过 [ZIMBlacklistQueriedResult](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_react-native~interface~ZIMBlacklistQueriedResult) 返回。

#### 示例代码

:::if{props.platform="undefined|UTS"}
```typescript title= "示例代码"
// 查询黑名单列表
const config: ZIMBlacklistQueryConfig = { count: 10, nextFlag: 0 };
zim.queryBlacklist(config)
    .then((res: ZIMBlacklistQueriedResult) => {
        const blacklist = res.blacklist;
    })
```
:::

### 拉黑用户

登录 ZIM SDK 后，用户可以调用 [addUsersToBlacklist](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_react-native~class~ZIM#add-users-to-blacklist) 接口，可以将指定用户添加到黑名单。

拉黑用户结果通过 [ZIMBlacklistUsersAddedCallback](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_react-native~interface~ZIMBlacklistUsersAddedResult) 返回。

<Warning title="注意">

- 调用一次接口，最多拉黑 20 名用户。超过数量上限会导致接口调用失败。
- 黑名单数量上限默认为 1000，如需上调，请联系 ZEGO 技术支持。
</Warning>

```typescript title= "示例代码"
// 添加用户 “zego” 到黑名单
const userIDs = ['zego'];
zim.addUsersToBlacklist(userIDs)
    .then((res: ZIMBlacklistUsersAddedResult) => {
        // 添加成功
    });
```

### 将用户移出黑名单

登录 ZIM SDK 后，用户可调用 [removeUsersFromBlacklist](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_react-native~class~ZIM#remove-users-from-blacklist) 接口将指定用户移出黑名单。

移出操作将通过 [ZIMBlacklistUsersRemovedResult](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_react-native~interface~ZIMBlacklistUsersRemovedResult) 返回。

<Warning title="注意">
调用一次接口，最多移出 20 名用户。超过数量上限会导致接口调用失败。
</Warning>


```typescript title= "示例代码"
// 将用户 “zego” 移除出黑名单
const userIDs = ['zego'];
zim.removeUsersFromBlacklist(userIDs)
    .then((res: ZIMBlacklistUsersRemovedResult) => {
        // 移除成功
    });
```

### 检查用户是否在黑名单内

登录 ZIM SDK 后，用户可以调用 [checkUserIsInBlacklist](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_react-native~class~ZIM#check-user-is-in-blacklist) 接口，检查指定用户是否在自己的黑名单。

检查操作结果通过 [ZIMBlacklistCheckedResult](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_react-native~interface~ZIMBlacklistCheckedResult) 返回。


```typescript title= "示例代码"
// 检查 “zego” 用户是否在黑名单内 
zim.checkUserIsInBlacklist('zego')
    .then((res: ZIMBlacklistCheckedResult) => {
        const isUserInBlacklist = res.isUserInBlacklist;
    });
```

<Content />