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

export const updateUserExtendedData={
    "Android": <a href="https://doc-zh.zego.im/article/api?doc=zim_API~javascript_web~class~ZIM#update-user-extended-data" target="_blank">updateUserExtendedData</a>,
    "u3d": <a href="https://doc-zh.zego.im/article/api?doc=zim_API~javascript_web~class~ZIM#update-user-extended-data" target="_blank">UpdateUserExtendedData</a>,
    "Flutter": <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/updateUserExtendedData.html" target="_blank">updateUserExtendedData</a>
}
export const extendedDataUpdatedCallback={
    "Android": <a href="https://doc-zh.zego.im/" target="_blank">ZIMUserExtendedDataUpdatedCallback</a>,
    "iOS,Windows,u3d": <a href="https://doc-zh.zego.im/" target="_blank">ZIMUserExtendedDataUpdatedCallback</a>,
    "Web,RN,UTS": <a href="https://doc-zh.zego.im/article/api?doc=zim_API~javascript_web~interface~ZIMUserExtendedDataUpdatedResult" target="_blank">ZIMUserExtendedDataUpdatedResult</a>,
    "Flutter": <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMUserExtendedDataUpdatedResult-class.html" target="_blank">ZIMUserExtendedDataUpdatedResult</a>,
}
export const ZIMUserInfo={
    "Android": <a href="https://doc-zh.zego.im/article/api?doc=zim_API~javascript_web~interface~ZIMUserInfo" target="_blank">ZIMUserInfo</a>,
    "Flutter": <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMUserInfo-class.html" target="_blank">ZIMUserInfo</a>,
}
export const updateUserName={
    "Android": <a href="https://doc-zh.zego.im/article/api?doc=zim_API~javascript_web~class~ZIM#update-user-name" target="_blank">updateUserName</a>,
    "u3d": <a href="https://doc-zh.zego.im/article/api?doc=zim_API~javascript_web~class~ZIM#update-user-name" target="_blank">UpdateUserName</a>,
    "Flutter": <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/updateUserName.html" target="_blank">updateUserName</a>,
}
export const ZIMUserNameUpdatedCallback={
    "Android": <a href="https://doc-zh.zego.im/" target="_blank">ZIMUserNameUpdatedCallback</a>,
    "iOS,Windows,u3d": <a href="https://doc-zh.zego.im/" target="_blank">ZIMUserNameUpdatedCallback</a>,
    "Web,RN,UTS": <a href="https://doc-zh.zego.im/article/api?doc=zim_API~javascript_web~interface~ZIMUserNameUpdatedResult" target="_blank">ZIMUserNameUpdatedResult</a>,
    "Flutter": <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMUserNameUpdatedResult-class.html" target="_blank">ZIMUserNameUpdatedResult</a>,
}
export const updateUserAvatarUrl={
    "Android": <a href="https://doc-zh.zego.im/article/api?doc=zim_API~javascript_web~class~ZIM#update-user-avatar-url" target="_blank">updateUserAvatarUrl</a>,
    "u3d": <a href="https://doc-zh.zego.im/article/api?doc=zim_API~javascript_web~class~ZIM#update-user-avatar-url" target="_blank">UpdateUserAvatarUrl</a>,
    "Flutter": <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/updateUserAvatarUrl.html" target="_blank">updateUserAvatarUrl</a>,
}
export const ZIMUserAvatarUrlUpdatedCallback={
    "Android": <a href="https://doc-zh.zego.im/" target="_blank">ZIMUserAvatarUrlUpdatedCallback</a>,
    "iOS,Windows,u3d": <a href="https://doc-zh.zego.im/" target="_blank">ZIMUserAvatarUrlUpdatedCallback</a>,
    "Web,RN,UTS": <a href="https://doc-zh.zego.im/article/api?doc=zim_API~javascript_web~interface~ZIMUserAvatarUrlUpdatedResult" target="_blank">ZIMUserAvatarUrlUpdatedResult</a>,
    "Flutter": <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMUserAvatarUrlUpdatedResult-class.html" target="_blank">ZIMUserAvatarUrlUpdatedResult</a>,
}
export const queryUsersInfo={
    "Android": <a href="https://doc-zh.zego.im/article/api?doc=zim_API~javascript_web~class~ZIM#query-users-info" target="_blank">queryUsersInfo</a>,
    "u3d": <a href="https://doc-zh.zego.im/article/api?doc=zim_API~javascript_web~class~ZIM#query-users-info" target="_blank">QueryUsersInfo</a>,
    "Flutter": <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/queryUsersInfo.html" target="_blank">queryUsersInfo</a>,
}
export const ZIMUsersInfoQueriedCallback={
    "Android": <a href="https://doc-zh.zego.im/" target="_blank">ZIMUsersInfoQueriedCallback</a>,
    "iOS,Windows,u3d": <a href="https://doc-zh.zego.im/" target="_blank">ZIMUsersInfoQueriedCallback</a>,
    "Web,RN,UTS": <a href="https://doc-zh.zego.im/article/api?doc=zim_API~javascript_web~interface~ZIMUsersInfoQueriedResult" target="_blank">ZIMUsersInfoQueriedResult</a>,
    "Flutter": <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMUsersInfoQueriedResult-class.html" target="_blank">ZIMUsersInfoQueriedResult</a>
}
export const isQueryFromServer={
    "Android": <a href="https://doc-zh.zego.im/article/api?doc=zim_API~javascript_web~interface~ZIMUsersInfoQueryConfig#is-query-from-server" target="_blank">isQueryFromServer</a>,
    "Flutter": <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMUserInfoQueryConfig/isQueryFromServer.html" target="_blank">isQueryFromServer</a>,
}
export const ZIMUsersInfoQueryConfig={
    "Android": <a href="https://doc-zh.zego.im/article/api?doc=zim_API~javascript_web~interface~ZIMUsersInfoQueryConfig" target="_blank">ZIMUsersInfoQueryConfig</a>,
    "Flutter": <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMUserInfoQueryConfig-class.html" target="_blank">ZIMUsersInfoQueryConfig</a>,
}

# 用户管理
- - -
## 功能简介

:::if{props.platform="Flutter"}
<Note title="说明">
本文档适用于开发以下平台的应用：iOS、Android、macOS、Windows、Web。
</Note>
:::

ZIM SDK 提供了用户管理功能，支持用户上传自己的个人信息，更新自己的用户名称、头像，以及查询自己的个人信息等。

## 实现流程

### 用户扩展字段管理

ZIM SDK 提供了用户信息的扩展字段，用于描述用户的其他相关属性。开发者可以使用扩展字段，通过 {getPlatformData(props,updateUserExtendedData)} 接口，自定义用户的扩展字段。**扩展字段可由开发者自行定义其使用方式，SDK 只会将该字段透传，不会做其他处理。**

修改扩展字段属性后，用户可以通过 {getPlatformData(props,extendedDataUpdatedCallback)} 收到修改结果。

:::if{props.platform=undefined}
```java Example
// 修改用户信息扩展字段
String newUserExtendedData = "{\"user_avatar\":\"https://url\",\"user_name\":\"new_name\",\"user_sex\":\"male\",\"user_birth\":\"1970-01-01\",\"user_phone\":\"12345678901\"}";

zim.updateUserExtendedData(newUserExtendedData, new ZIMUserExtendedDataUpdatedCallback() {
        @Override
        public void onUserExtendedDataUpdated(String extendedData, ZIMError errorInfo) {
            if(errorInfo.code == ZIMErrorCode.SUCCESS) {
                // 修改成功
            }
        }
});
```
:::
:::if{props.platform="iOS"}
```objc Example
// 更新用户信息的扩展字段。
NSString *extendedData = @"";

[zim updateUserExtendedData:extendedData callback:^(NSString * _Nonnull extendedData, ZIMError * _Nonnull errorInfo) {
        
    }];
```
:::
:::if{props.platform="Flutter"}
```dart Example
// 修改用户信息的扩展字段
String newUserExtendedData = "{\"user_avatar\":\"https://url\",\"user_name\":\"new_name\",\"user_sex\":\"male\",\"user_birth\":\"1970-01-01\",\"user_phone\":\"12345678901\"}";

try {
    ZIMUserExtendedDataUpdatedResult result =
        await ZIM.getInstance()!.updateUserExtendedData(newUserExtendedData);
    
    } on PlatformException catch (onError) {
        // 根据 onError 的返回值处理写操作失败的逻辑
    }
```
:::
:::if{props.platform="Windows"}
```cpp Example
std::string new_user_extended_data = "{\"user_avatar\":\"https://url\",\"user_name\":\"new_name\",\"user_sex\":\"male\",\"user_birth\":\"1970-01-01\",\"user_phone\":\"12345678901\"}";

zim_->updateUserExtendedData(new_user_extended_data, [=](/zim-web/guides/users/const-std::string-&extended_data,-zim::zimerror-error_info){
    if (errorInfo.code == ZIM_ERROR_CODE_SUCCESS) {
        // 修改成功
    }
});
```
:::
:::if{props.platform="Web|RN|UTS"}
```typescript Example
const extendedData = JSON.stringify({ age: 18, birthdy: '2000-01-01' });

zim.updateUserExtendedData(extendedData)
    .then((res: ZIMUserExtendedDataUpdatedResult) => {
        // 操作成功
    })
    .catch((err: ZIMError) => {
        // 操作失败
    });
```
:::
:::if{props.platform="u3d"}
```cs Example
string newUserExtendedData = "{\"user_avatar\":\"https://url\",\"user_name\":\"new_name\",\"user_sex\":\"male\",\"user_birth\":\"1970-01-01\",\"user_phone\":\"12345678901\"}";

ZIM.GetInstance().UpdateUserExtendedData(newUserExtendedData, 
(string extendedData, ZIMError errorInfo) => {
    if(errorInfo.code == ZIMErrorCode.Success) {
        // 操作成功
    }
});
```
:::

### 修改用户名称

用户名称 `userName`，是指用来描述用户昵称的字符串，开发者可以通过 {getPlatformData(props,ZIMUserInfo)} 对象进行配置。ZIM SDK 支持用户在登录后，通过 {getPlatformData(props,updateUserName)} 接口修改自己的用户名称。

修改用户名称后，用户可以通过 {getPlatformData(props,ZIMUserNameUpdatedCallback)} 收到修改结果。

:::if{props.platform=undefined}
```java Example
// 修改用户名称
// userName 最大 256 字节的字符串，无特殊字符限制。
String newUserName = "new_name";
zim.updateUserName(newUserName, new ZIMUserNameUpdatedCallback() {
        @Override
        public void onUserNameUpdated(String userName, ZIMError errorInfo) {
            if(errorInfo.code == ZIMErrorCode.SUCCESS) {
                // 修改成功
            }
        }
});
```
:::
:::if{props.platform="iOS"}
```objc Example
// 修改用户名。
// `userName` 参数的长度可以达到256字节，字符数没有限制。
NSString *userName = @"";

[zim updateUserName:userName callback:^(NSString * _Nonnull userName, ZIMError * _Nonnull errorInfo) {
        
}];
:::
:::if{props.platform="Flutter"}
```dart Example
// 修改用户名
// userName 是一个最多256字节的字符串，没有特殊字符限制。
try {
    ZIMUserNameUpdatedResult result =
        await ZIM.getInstance()!.updateUserName('userName');
        // 成功修改的逻辑写在这里
    } on PlatformException catch (onError) {
        // 根据 onError 编写和修改失败的逻辑
    }
```
:::
:::if{props.platform="Windows"}
```cpp Example
// 修改用户名称
// userName 是一个最大长度为256字节的字符串，没有特殊字符限制。
std::string new_user_name = "新名称";

zim_->updateUserName(new_user_name, [=](/zim-web/guides/users/const-std::string-&username,-const-zim::zimerror-&errorinfo){
    if (errorInfo.code == ZIM_ERROR_CODE_SUCCESS) {
        // 修改成功
    }
});
:::
:::if{props.platform="Web|RN|UTS"}
```typescript Example
// 修改用户名
// userName 是一个最多256字节的字符串，没有特殊字符限制。
const userName = '新名称';

zim.updateUserName(userName)
    .then((res: ZIMUserNameUpdatedResult) => {
        // 操作成功
    })
    .catch((err: ZIMError) => {
        // 操作失败
    });
```
:::
:::if{props.platform="u3d"}
```cs Example
// 修改用户名
// userName 是一个最大长度为256字节的字符串，没有特殊字符限制。
string newUserName = "新用户名";
ZIM.GetInstance().UpdateUserName(newUserName, (string userName, ZIMError errorInfo) => {
    if(errorInfo.code == ZIMErrorCode.Success) {
        // 操作成功
    }
});
```
:::


### 设置用户头像

ZIM SDK 支持用户在登录后，通过 {getPlatformData(props,updateUserAvatarUrl)} 接口设置或修改自己的用户头像。

设置用户头像后，用户可以通过 {getPlatformData(props,ZIMUserAvatarUrlUpdatedCallback)} 收到设置结果。

<Warning title="注意">

当一名用户修改头像后，其他用户需调用 {getPlatformData(props,queryUsersInfo)} 接口，并将 {getPlatformData(props,ZIMUsersInfoQueryConfig)} 中 {getPlatformData(props,isQueryFromServer)} 参数赋值为 `true` 重新 <a href="#查询用户信息">查询用户信息</a>，才会获取最新头像。
</Warning>


:::if{props.platform=undefined}
```java Example
// 设置用户头像
// URL 最大 500 字节，无特殊字符限制
String userAvatarUrl = "xxx";
zim.updateUserAvatarUrl(userAvatarUrl, new ZIMUserAvatarUrlUpdatedCallback() {
    @Override
    public void onUserAvatarUrlUpdated(String userAvatarUrl, ZIMError errorInfo) {
        if(errorInfo.code == ZIMErrorCode.SUCCESS) {
            // 设置成功
        }
    }
});
```
:::
:::if{props.platform="iOS"}
```objc Example
// 设置用户头像。
// URL的长度可以达到500字节，字符数没有限制。
NSString *userAvatarUrl = @"";

[zim updateUserAvatarUrl callback:^(NSString * _Nonnull userAvatarUrl, ZIMError * _Nonnull errorInfo) {
        
}];
:::
:::if{props.platform="Flutter"}
```dart Example
// 修改用户名
// userAvatarUrl 是一个最多500字节的字符串，没有特殊字符限制。
try {
    ZIMUserAvatarUrlUpdatedResult result =
        await ZIM.getInstance()!.updateUserAvatarUrl('userAvatarUrl');
        // 在这里编写成功修改的逻辑
    } on PlatformException catch (onError) {
        // 根据 onError 编写并修改失败的逻辑
    }
```
:::
:::if{props.platform="Windows"}
```cpp Example
// URL最大长度为500字节，没有特殊字符限制
std::string user_avatar_url = "";

zim_->updateUserAvatarUrl(user_avatar_url, [=](/zim-web/guides/users/const-std::string-&useravatarurl,-zim::zimerror-error_info){
    if (errorInfo.code == ZIM_ERROR_CODE_SUCCESS) {
         // 操作成功
    }
});
:::
:::if{props.platform="Web|RN|UTS"}
```typescript Example
// URL最大长度为500字节，没有特殊字符限制
const userAvatarUrl = 'https://xxxx';

zim.updateUserAvatarUrl(userAvatarUrl)
    .then((res: ZIMUserAvatarUrlUpdatedResult) => {
        // 操作成功
    })
    .catch((err: ZIMError) => {
        // 操作失败
    });
```
:::
:::if{props.platform="u3d"}
```cs Example
// URL最大为500字节，没有特殊字符限制
string userAvatarUrl = "xxx";
ZIM.GetInstance().UpdateUserAvatarUrl(userAvatarUrl, (string userAvatarUrl, ZIMError errorInfo) => {
    if(errorInfo.code == ZIMErrorCode.Success) {
        // 操作成功
    }
});
```
:::

### 查询用户信息

用户可以通过 {getPlatformData(props,queryUsersInfo)} 接口，查询指定用户的全量信息，包括用户名称、用户扩展字段。**用户头像 URL、用户扩展字段信息，仅在该接口中可以获取到。**

查询信息后，用户可以通过 {getPlatformData(props,ZIMUsersInfoQueriedCallback)} 收到查询结果。

:::if{props.platform=undefined}
```java Example
// 查询用户信息

// 使用限制：单次调用接口，查询 UserID 不能超过 10 个；在 10 秒内，多次调用接口查询的 UserID 累计总数不能超过 10 个。
ArrayList<String> userIDList = new ArrayList<>();
userIDList.add("user_id_1");

ZIMUsersInfoQueryConfig config = new ZIMUsersInfoQueryConfig();
config.isQueryFromServer = false;

zim.queryUsersInfo(userIDList, config, new ZIMUsersInfoQueriedCallback() {
        @Override
        public void onUsersInfoQueried(ArrayList<ZIMUserFullInfo> userList, ArrayList<ZIMErrorUserInfo> errorUserList, ZIMError errorInfo) {
            if(errorInfo.code == ZIMErrorCode.SUCCESS) {
                 // 查询成功
            }
        }
});
```
:::
:::if{props.platform="iOS"}
```objc Example
// 查询用户信息。
// 限制：每次调用最多可以查询10个用户ID，或者在10秒内多次调用。
[self.zim queryUsersInfo:@[@"userID_1",@"userID_2"] callback:^(NSArray<ZIMUserFullInfo *> * _Nonnull userList, NSArray<ZIMErrorUserInfo *> * _Nonnull errorUserList, ZIMError * _Nonnull errorInfo) {
        
}];
:::
:::if{props.platform="Flutter"}
```dart Example
// 查询用户信息
// 使用限制：单个 API 调用中的 UserID 查询数量不能超过 10；在 10 秒内，多个 API 调用中的 UserID 查询累计总数不能超过 10。
try {
    ZIMUserInfoQueryConfig config = ZIMUserInfoQueryConfig();
    config.isQueryFromServer = false; // 如果从服务器查询，请设置为 true；如果从本地数据查询，请设置为 false
    ZIMUsersInfoQueriedResult result =
        await ZIM.getInstance()!.queryUsersInfo(['userID_1', 'userID_2'], config);
        // 在此处编写成功查询的逻辑
    } on PlatformException catch (onError) {
        // 根据 onError 编写查询失败的逻辑
    }
```
:::
:::if{props.platform="Windows"}
```cpp Example
// 查询用户信息
// 使用限制：单次调用接口查询的UserID数量不能超过10个；
// 在10秒内，多次调用接口查询的UserID累计总数不能超过10个。
std::string target_user_id = "user_id_1";

std::vector<std::string> user_id_list;
user_id_list.push_back(target_user_id);

zim::ZIMUsersInfoQueryConfig config;
// false表示本地查询，优先返回本地数据库中的数据。
// 如果本地数据库中没有相应的用户信息，并且未达到查询频率限制，则自动升级为从服务器查询。
// true表示服务器查询，优先从服务器获取用户信息。
// 当达到查询频率限制时，尚未从服务器查询的用户信息将尝试从本地数据库返回数据。
config.isQueryFromServer = false;

zim_->queryUsersInfo(user_id_list, config, [=](/zim-web/guides/users/const-std::vector<zim::zimuserfullinfo>-&userlist,-const-std::vector<zim::zimerroruserinfo>-&erroruserlist,-const-zim::zimerror-&errorinfo) {
    if (errorInfo.code == ZIM_ERROR_CODE_SUCCESS) {
        // 查询成功
    }
});
:::
:::if{props.platform="Web|RN|UTS"}
```typescript Example
// 限制：单个 API 调用中的 UserID 查询数量不能超过 10；在 10 秒内，所有 UserID 查询的累计总数不能超过 10。
const userIDs = ['id1', 'id2'];
const config: ZIMUsersInfoQueryConfig = { isQueryFromServer: false };

zim.queryUsersInfo(userIDs, config)
    .then((res: ZIMUsersInfoQueriedResult) => {
        // 操作成功
    })
    .catch((err: ZIMError) => {
        // 操作失败
    });
```
:::
:::if{props.platform="u3d"}
```cs Example
// 限制：单个 API 调用中的 UserID 查询数量不能超过 10；在 10 秒内，所有 UserID 查询的累计总数不能超过 10。
List<string> userIDList = new List<string>();
userIDList.Add("user_id_1");
ZIMUsersInfoQueryConfig config = new ZIMUsersInfoQueryConfig();
ZIM.GetInstance().QueryUsersInfo(userIDList, config, (ZIMUserFullInfo[] userList, ZIMErrorUserInfo[] errorUserList, ZIMError errorInfo) => {
    if (errorInfo.code == ZIMErrorCode.Success)
    {
        // 操作成功
    }
});
```
:::

<Content platform="Web"/>