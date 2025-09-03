export const getPlatformData = (props, data) => {
  const platform = props.platform ?? "Android";
  return platform in data ? data[platform] : data["Android"]
}

export const queryBlacklistMap = {
  
  'Android': <a href="https://doc-zh.zego.im/article/api?doc=zim_API~cpp_windows~class~ZIM#query-blacklist" target="_blank">queryBlacklist</a>,
  'iOS': <a href="https://doc-zh.zego.im/" target="_blank">queryBlacklistWithConfig</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/queryBlacklist.html" target="_blank">queryBlacklist</a>
}
export const ZIMBlacklistQueriedCallbackMap = {
  'Android': <a href="https://doc-zh.zego.im/" target="_blank">ZIMBlacklistQueriedCallback</a>,
  'iOS': <a href="https://doc-zh.zego.im/article/api?doc=zim_API~cpp_windows~interface~ZIMDefines#zim-blacklist-queried-callback" target="_blank">ZIMBlacklistQueriedCallback</a>,
  'windows': <a href="https://doc-zh.zego.im/article/api?doc=zim_API~cpp_windows~interface~ZIMDefines#zim-blacklist-queried-callback" target="_blank">ZIMBlacklistQueriedCallback</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMBlacklistQueriedResult-class.html" target="_blank">ZIMBlacklistQueriedCallback</a>,
}
export const addUsersToBlacklistMap = {
  'Android' : <a href="https://doc-zh.zego.im/article/api?doc=zim_API~cpp_windows~class~ZIM#add-users-to-blacklist" target="_blank">addUsersToBlacklist</a>,
  'iOS' : <a href="https://doc-zh.zego.im/" target="_blank">addUsersToBlacklistWithUserIDs</a>,
  'Flutter' : <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/addUsersToBlacklist.html" target="_blank">addUsersToBlacklist</a>,
}
export const ZIMBlacklistUsersAddedCallbackMap = {
  'Android': <a href="https://doc-zh.zego.im/" target="_blank">ZIMBlacklistUsersAddedCallback</a>,
  'iOS': <a href="https://doc-zh.zego.im/article/api?doc=zim_API~cpp_windows~interface~ZIMDefines#zim-blacklist-users-added-callback" target="_blank">ZIMBlacklistUsersAddedCallback</a>,
  'windows': <a href="https://doc-zh.zego.im/article/api?doc=zim_API~cpp_windows~interface~ZIMDefines#zim-blacklist-users-added-callback" target="_blank">ZIMBlacklistUsersAddedCallback</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMBlacklistUsersAddedResult-class.html" target="_blank">ZIMBlacklistUsersAddedResult</a>,
}
export const removeUsersFromBlacklistMap = {
  'Android': <a href="@removeUsersFromBlacklist" target='_blank'>removeUsersFromBlacklist</a>,
  'iOS': <a href="@removeUsersFromBlacklistWithUserIDs" target='_blank'>removeUsersFromBlacklistWithUserIDs</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/removeUsersFromBlacklist.html" target='_blank'>removeUsersFromBlacklist</a>,
}
export const ZIMBlacklistUsersRemovedCallbackMap = {
  'Android': <a href="https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#remove-users-from-blacklist" target='_blank'>ZIMBlacklistUsersRemovedCallback</a>,
  'iOS': <a href="@ZIMBlacklistUsersRemovedCallback" target='_blank'>ZIMBlacklistUsersRemovedCallback</a>,
  'windows': <a href="@ZIMBlacklistUsersRemovedCallback" target='_blank'>ZIMBlacklistUsersRemovedCallback</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMBlacklistUsersRemovedResult-class.html" target='_blank'>ZIMBlacklistUsersRemovedResult</a>,

}
export const checkUserIsInBlacklistMap = {
  'Android': <a href="@checkUserIsInBlacklist" target='_blank'>checkUserIsInBlacklist</a>,
  'iOS': <a href="@checkUserIsInBlackListByUserID" target='_blank'>checkUserIsInBlackListByUserID</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/checkUserIsInBlacklist.html" target='_blank'>checkUserIsInBlacklist</a>,
}
export const ZIMBlacklistCheckedCallbackMap = {
  'Android': <a href="@-ZIMBlacklistCheckedCallback" target='_blank'>ZIMBlacklistCheckedCallback</a>,
  'iOS': <a href="@ZIMBlacklistCheckedCallback" target='_blank'>ZIMBlacklistCheckedCallback</a>,
  'windows': <a href="@ZIMBlacklistCheckedCallback" target='_blank'>ZIMBlacklistCheckedCallback</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMBlacklistCheckedResult-class.html" target='_blank'>ZIMBlacklistCheckedResult</a>,
}


# 黑名单管理

- - -

<Note title="说明">

黑名单和好友操作互不影响。   

以用户​​A和B互为好友为例：

1. 用户A可以将用户B列入黑名单，但两人仍是好友。
2. 如果此时用户A和用户B解除好友关系，用户B仍会在用户A的黑名单中。
3. 之后，如果用户A将用户B从黑名单中移除，用户B仍不会是用户A的好友。
</Note>

## 功能简介

用户可以查询自己的黑名单、将指定用户拉黑（不再接收该用户消息）、移出黑名单、以及检查指定用户是否在黑名单内。


## 实现流程

### 查询黑名单列表

登录 ZIM SDK 后，用户可以通过 {getPlatformData(props,queryBlacklistMap)} 接口查询黑名单列表。

查询结果通过 {getPlatformData(props,ZIMBlacklistQueriedCallbackMap)} 返回。


:::if{props.platform=undefined}
<CodeGroup>
```java title="示例代码"
// 查询黑名单列表
ZIMBlacklistQueryConfig config = new ZIMBlacklistQueryConfig();
// 填写一次获取的黑名单用户信息数量
config.count = 100; 
// 填写分页拉取标志
config.nextFlag = 0;
zim.queryBlacklist(config, new ZIMBlacklistQueriedCallback() {
    @Override
        public void onBlacklistQueried(ArrayList<ZIMUserInfo> blacklist, int nextFlag,
                                    ZIMError zimError) {
        if(errorInfo.code == ZIMErrorCode.SUCCESS) {
            // 开发者可以从 blacklist 获取到黑名单列表。
        }
    }
});
```
</CodeGroup>

:::

:::if{props.platform="Flutter"}
<CodeGroup>
```dart title="示例代码"
// 查询黑名单
ZIMBlacklistQueryConfig config = ZIMBlacklistQueryConfig();
// 填写一次获取的用户信息数量
config.count = 100;
// 填写分页拉取标志
config.nextFlag = 0;
ZIM zim = ZIM.getInstance()!;
zim.queryBlacklist(config).then((ZIMBlacklistQueriedResult result) => {
    // 开发者可以从 result.blacklist 中获取黑名单信息。
}).catchError((onError){
    // 根据 SDK 错误码文档进行处理
});
```
</CodeGroup>
:::

:::if{props.platform="iOS"}
<CodeGroup>
```objc title="示例代码"
// 查询黑名单
ZIMBlacklistQueryConfig *config = [[ZIMBlacklistQueryConfig alloc] init];
// 每次查询的被屏蔽用户数量
config.count = 100;
// 分页拉取的标志
config.nextFlag = 0;
[[ZIM getInstance] queryBlacklistWithConfig:config callback:^(NSArray<ZIMUserInfo *> * _Nonnull blacklist, unsigned int nextFlag, ZIMError * _Nonnull errorInfo) {
    if(errorInfo.code == ZIMErrorCodeSuccess){
        // 从 `blacklist` 字段获取黑名单列表
    }
}];
```
</CodeGroup>
:::

:::if{props.platform="windows"}
<CodeGroup>
```cpp title="示例代码"
// 查询黑名单列表
zim::ZIMBlacklistQueryConfig config;
// 填写一次获取的黑名单用户信息数量
config.count = 100;
// 填写分页拉取标志
config.nextFlag = 0;

zim_sdk_->queryBlacklist(
    config, [=](/zim-win/guides/users/const-std::vector<zim::zimuserinfo>-&blacklist,-unsigned-int-nextflag,-const-zim::zimerror-&errorinfo) {
        if (errorInfo.code == zim::ZIMErrorCode::ZIM_ERROR_CODE_SUCCESS) {
            // 开发者可以从blacklist中获取黑名单列表。
        }
    });
```
</CodeGroup>
:::

### 拉黑用户

登录 ZIM SDK 后，用户可以调用 {getPlatformData(props,addUsersToBlacklistMap)} 接口，可以将指定用户添加到黑名单。

拉黑用户结果通过 {getPlatformData(props,ZIMBlacklistUsersAddedCallbackMap)} 返回。

<Warning title="注意">

- 调用一次接口，最多拉黑 20 名用户。超过数量上限会导致接口调用失败。
- 黑名单数量上限默认为 1000，如需上调，请联系 ZEGO 技术支持。
</Warning>


:::if{props.platform=undefined}
<CodeGroup>
```java title="示例代码"
// 添加用户 “zego” 到黑名单
ArrayList<String> userIDs = new ArrayList();
userIDs.add("zego");
zim.addUsersToBlacklist(userIDs, new ZIMBlacklistUsersAddedCallback() {
    @Override
    public void  onBlacklistUsersAdded(ArrayList<ZIMErrorUserInfo> errorUserList, ZIMError error) {
        if(errorInfo.code == ZIMErrorCode.SUCCESS) {
            // errorUserList 返回添加失败的用户信息。
        }
    }
});
```
</CodeGroup>

:::

:::if{props.platform="Flutter"}
<CodeGroup>
```dart title="示例代码" 
// 将用户 "zego" 添加到黑名单
try{
    ZIMBlacklistUsersAddedResult result = await ZIM.getInstance()!.addUsersToBlacklist(['zego']);
    // result.errorUserList 返回添加失败的用户信息。
} on PlatformException catch (onError){
    // 根据 SDK 错误码文档进行处理
}
```
</CodeGroup>
:::

:::if{props.platform="iOS"}
<CodeGroup>
```objc title="示例代码"
// 阻止用户 "zegocloud"。
NSArray *userIDs = @[@"zegocloud"];
[[ZIM getInstance] addUsersToBlacklistWithUserIDs:userIDs callback:^(NSArray<ZIMErrorUserInfo *> * _Nonnull errorUserList, ZIMError * _Nonnull errorInfo) {
    if(errorInfo.code == ZIMErrorCodeSuccess){
        // 无法被阻止的用户信息将返回在 `errorUserList` 字段中。
    }
}];
```
</CodeGroup>
:::

:::if{props.platform="windows"}
<CodeGroup>
```cpp title="示例代码"
// 将用户 "zegocloud" 添加到黑名单
std::vector<std::string> user_id_list;
user_id_list.push_back("zegocloud");

zim_sdk_->addUsersToBlacklist(
    user_id_list,
    [=](/zim-win/guides/users/const-std::vector<zim::zimerroruserinfo>-&erroruserlist,-const-zim::zimerror-&errorinfo) {
        if (errorInfo.code == zim::ZIMErrorCode::ZIM_ERROR_CODE_SUCCESS) {
            // 开发者可以从 "blacklist" 变量中获取黑名单列表。
        }
    });
```
</CodeGroup>
:::

### 将用户移出黑名单

登录 ZIM SDK 后，用户可调用 {getPlatformData(props,removeUsersFromBlacklistMap)} 接口将指定用户移出黑名单。

移出操作将通过 {getPlatformData(props,ZIMBlacklistUsersRemovedCallbackMap)} 返回。

<Warning title="注意">

调用一次接口，最多移出 20 名用户。超过数量上限会导致接口调用失败。
</Warning>

:::if{props.platform=undefined}
<CodeGroup>
```java  title="示例代码"
// 将用户 “zego” 移除出黑名单
ArrayList<String> userIDs = new ArrayList();
userIDs.add("zego");
zim.removeUsersFromBlacklist(userIDs, new ZIMBlacklistUsersRemovedCallback() {
    @Override
    public void  onBlacklistUsersRemoved(ArrayList<ZIMErrorUserInfo> errorUserList, ZIMError error) {
        if(errorInfo.code == ZIMErrorCode.SUCCESS) {
            // errorUserList 返回移除失败的用户信息。
        }
    }
});
```
</CodeGroup>

:::

:::if{props.platform="Flutter"}
<CodeGroup>
```dart title="示例代码"
// 从黑名单中移除用户 "zego"
try{
    ZIMBlacklistUsersRemovedResult result = await ZIM.getInstance()!.removeUsersFromBlacklist(["zego"]);
    // result.errorUserList 返回添加失败的用户信息。
} on PlatformException catch (onError){
    // 根据 SDK 错误代码文档进行处理
}
```
</CodeGroup>
:::

:::if{props.platform="iOS"}
<CodeGroup>
```objc title="示例代码"
// 解除封禁用户 "zegocloud"。
NSArray *userIDs = @[@"zegocloud"];
[[ZIM getInstance] removeUsersFromBlacklistWithUserIDs:userIDs callback:^(NSArray<ZIMErrorUserInfo *> * _Nonnull errorUserList, ZIMError * _Nonnull errorInfo)     {
    if(errorInfo.code == ZIMErrorCodeSuccess){
        // 无法解除封禁的用户信息将返回在 `errorUserList` 字段中。
    }
}];
```
</CodeGroup>
:::

:::if{props.platform="windows"}
<CodeGroup>
```cpp title="示例代码"
// 从黑名单中移除用户"zegocloud"
std::vector<std::string> user_id_list;
user_id_list.push_back("zegocloud");

zim_sdk_->removeUsersFromBlacklist(
    user_id_list,
    [=](/zim-win/guides/users/const-std::vector<zim::zimerroruserinfo>-&erroruserlist,-const-zim::zimerror-&errorinfo) {
        if (errorInfo.code == zim::ZIMErrorCode::ZIM_ERROR_CODE_SUCCESS) {
            // 开发者可以从"blacklist"变量中获取黑名单。
        }
    });
```
</CodeGroup>
:::

### 检查用户是否在黑名单内

登录 ZIM SDK 后，用户可以调用 {getPlatformData(props,checkUserIsInBlacklistMap)} 接口，检查指定用户是否在自己的黑名单。

检查操作结果通过 {getPlatformData(props,ZIMBlacklistCheckedCallbackMap)} 返回。


:::if{props.platform=undefined}
<CodeGroup>
```java title="示例代码"
// 检查 “zego” 用户是否在黑名单内 
zim.checkUserIsInBlackList("zego", new ZIMBlacklistCheckedCallback(){
    @Override
    public void  onBlacklistChecked(boolean isUserInBlacklist, ZIMError zimError) {
        if(errorInfo.code == ZIMErrorCode.SUCCESS) {
                // isUserInBlacklist 说明该用户是否在黑名单内，true 表示在黑名单内，false 表示不在黑名单内
        }
    }
})
```
</CodeGroup>

:::

:::if{props.platform="Flutter"}
<CodeGroup>
```dart title="示例代码"
// 检查用户 "zego" 是否在黑名单中
try{
    ZIMBlacklistCheckedResult result = await ZIM.getInstance()!.checkUserIsInBlacklist("zego");
    // result.isUserInBlacklist 表示用户是否在黑名单中。true 表示在黑名单中，false 表示不在黑名单中
} on PlatformException catch (onError){
    // 根据 SDK 错误代码文档进行处理
}
```
</CodeGroup>
:::

:::if{props.platform="iOS"}
<CodeGroup>
```objc title="示例代码"
// 检查用户 "zegocloud" 是否在黑名单中
[[ZIM getInstance] checkUserIsInBlackListByUserID:@"zegocloud" callback:^(BOOL isUserInBlacklist, ZIMError * _Nonnull errorInfo) {
    if(errorInfo.code == ZIMErrorCodeSuccess) {
            // `isUserInBlacklist` 参数表示用户是否在黑名单中。有效值：`true`：是；`false`：否。
    }
}];
```
</CodeGroup>
:::

:::if{props.platform="windows"}
<CodeGroup>
```cpp title="示例代码"
zim_sdk_->checkUserIsInBlacklist(
    "zegocloud", [=](/zim-win/guides/users/bool-isuserinblacklist,-const-zim::zimerror-&errorinfo) {
        if (errorInfo.code == zim::ZIMErrorCode::ZIM_ERROR_CODE_SUCCESS) {
            // `isUserInBlacklist` 参数表示用户是否在黑名单中。有效值：`true`：是；`false`：否。
        }
    }
);
```
</CodeGroup>
:::

<Content platform="windows" />