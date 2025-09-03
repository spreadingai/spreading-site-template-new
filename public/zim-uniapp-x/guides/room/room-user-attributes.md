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

export const setRoomMembersAttributesMap = {
  'Android': <a href="@setRoomMembersAttributes" target='_blank'>setRoomMembersAttributes</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/setRoomMembersAttributes.html" target='_blank'>setRoomMembersAttributes</a>,
}
export const queryRoomMembersAttributesMap = {
  'Android': <a href="@queryRoomMembersAttributes" target='_blank'>queryRoomMembersAttributes</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/queryRoomMembersAttributes.html" target='_blank'>queryRoomMembersAttributes</a>,
  'iOS,mac': <a href="@queryRoomMembersAttributesByUserIDS" target='_blank'>queryRoomMembersAttributesByUserIDs</a>,
}
export const queryRoomMemberAttributesListMap = {
  'Android': <a href="@queryRoomMemberAttributesList" target='_blank'>queryRoomMemberAttributesList</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/queryRoomMemberAttributesList.html" target='_blank'>queryRoomMemberAttributesList</a>,
  'iOS,mac': <a href="@queryRoomMemberAttributesListByRoomID" target='_blank'>queryRoomMemberAttributesListByRoomID</a>,
}

export const onRoomMemberAttributesUpdatedMap = {
  'Android': <a href="@onRoomMemberAttributesUpdated" target='_blank'>onRoomMemberAttributesUpdated</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMEventHandler/onRoomMemberAttributesUpdated.html" target='_blank'>onRoomMemberAttributesUpdated</a>,
  'iOS': <a href="https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_ios~protocol~ZIMEventHandler#zim-room-member-attributes-updated-infos-operated-info-room-id" target='_blank'>onRoomMemberAttributesUpdated</a>,
  'mac': <a href="https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_macos~protocol~ZIMEventHandler#zim-room-member-attributes-updated-infos-operated-info-room-id" target='_blank'>onRoomMemberAttributesUpdated</a>,
}
export const setEventHandlerMap = {
  'Android': <a href="@setEventHandler" target='_blank'>setEventHandler</a>,
  'Web,UTS': <a href="@on" target='_blank'>on</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMEventHandler-class.html" target='_blank'>setEventHandler</a>,
}
export const queryRoomMembersMap = {
  'Android': <a href="@queryRoomMembers" target='_blank'>queryRoomMembers</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/queryRoomMembers.html" target='_blank'>queryRoomMembers</a>,
  'iOS,mac': <a href="@queryRoomMembersByUserIDs" target='_blank'>queryRoomMembersByUserIDs</a>,
}
export const ZIMRoomMembersQueriedCallbackMap = {
  'Android': <a href="@ZIMRoomMembersQueriedCallback" target='_blank'>ZIMRoomMembersQueriedCallback</a>,
  'Flutter': "callback",
  'Web,UTS':""
}

# 房间用户管理

- - -
:::if{props.platform="U3d"}
<Note title="说明">

本文档适用于开发以下平台应用：iOS、Android、macOS、Windows。
</Note>
:::

## 功能简介

ZIM SDK 支持设置房间内的用户属性，即在房间内，自定义房间内的用户属性。

可应用的场景：

- 设置成员角色，如设置房主、管理员、观众、观众等级。
- 开/关摄像头、开/关麦克风、是否能发言、是否共享白板等。


## 实现流程

<Warning title="注意">

- 每个房间中，最多允许设置 500 个用户的用户属性，以 `Key-Value` 的方式进行存储。开发者如果需要提高属性上限，请联系 ZEGO 技术支持。
- 房间内的每个用户，所拥有的用户属性 `Key-Value` 的总长度不超过 144 字节，且 `Key-Value` 的个数不超过 30 对。单个 `Key-Value` 的长度，Key 不超过 8 字节、Value 不超过 64 字节。开发者如果需要提高上限，请联系 ZEGO 技术支持。
- 房间销毁后，设置的自定义用户属性也会同时销毁。
</Warning>


### 设置用户属性

<Warning title="注意">

操作者和被设置/修改属性的用户，都必须是该房间内的用户。
</Warning>

开发者可以通过 {getPlatformData(props,setRoomMembersAttributesMap)} 接口，设置房间内用户的用户属性。设置的房间用户属性以 `Key-Value` 的形式存储：

- 当 Key 不存在时，设置用户属性表示增加属性。
- 当 key 已经存在时，设置用户属性表示更新已有属性的取值。

:::if{props.platform="Flutter"}
设置成功后，可以通过 [ZIMRoomMembersAttributesOperatedResult](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMRoomMembersAttributesOperatedResult-class.html) 的异步返回值，获取操作结果。
:::




:::if{props.platform=undefined}
<CodeGroup>
```java title="示例代码"
HashMap<String,String> attributes = new HashMap<>();
attributes.put("key1","value1");
ArrayList<String> userIDs = new ArrayList<>();
userIDs.add("userID1");
ZIMRoomMemberAttributesSetConfig setConfig = new ZIMRoomMemberAttributesSetConfig();
setConfig.isDeleteAfterOwnerLeft = true;
ZIM.getInstance().setRoomMembersAttributes(attributes, "roomID", userIDs, setConfig, new ZIMRoomMembersAttributesOperatedCallback() {
     @Override
     public void onRoomMembersAttributesOperated(String roomID, ArrayList<ZIMRoomMemberAttributesOperatedInfo> infos, ArrayList<String> errorUserList, ZIMError errorInfo) {
       //这里填写操作结果返回的逻辑
     }
});
```
</CodeGroup>
:::
:::if{props.platform="iOS|mac"}
<CodeGroup>
```objc title="示例代码"
ZIMRoomMemberAttributesSetConfig *setConfig = [[ZIMRoomMemberAttributesSetConfig alloc] init];
[[ZIM getInstance] setRoomMembersAttributes:@{@"key1":@"value1"} userIDs:@[@"user1",@"user2"] roomID:@"roomID" config:setConfig callback:^(NSString * _Nonnull roomID, NSArray<ZIMRoomMemberAttributesOperatedInfo *> * _Nonnull operatedInfos, NSArray<NSString *> * _Nonnull errorUserList, ZIMError * _Nonnull errorInfo) {
        //这里写设置结果返回后的业务逻辑
}];
```
</CodeGroup>
:::

:::if{props.platform="U3d"}
<CodeGroup>
```cs title="示例代码"
Dictionary<string, string> attributes = new Dictionary<string, string>();
attributes.Add("key1", "value1");
List<string> userIDs = new List<string>();
userIDs.Add("userID1");
ZIMRoomMemberAttributesSetConfig setConfig = new ZIMRoomMemberAttributesSetConfig();
setConfig.isDeleteAfterOwnerLeft = true;
ZIM.GetInstance().SetRoomMembersAttributes(attributes, userIDs, "roomID",
    setConfig,
    (string roomID, List<ZIMRoomMemberAttributesOperatedInfo> infos, List<string> errorUserList, ZIMError errorInfo) =>
    {
        //这里填写操作结果返回的逻辑
    }
);
```
</CodeGroup>
:::
:::if{props.platform="Flutter"}
<CodeGroup>
```dart title="示例代码"
Map<String, String> attributes = {"key1": "value1"};
List<String> userIDs = ["userID1"];
ZIM
    .getInstance()
    ?.setRoomMembersAttributes(
        attributes, userIDs, 'roomID', ZIMRoomMemberAttributesSetConfig())
    .then((value) => {
        //这里填写成功后的逻辑
    })
    .catchError((onError) {
        //这里写失败后的逻辑
});
```
</CodeGroup>
:::
:::if{props.platform="Web|UTS"}
<CodeGroup>
```typescript title="示例代码"
const config: ZIMRoomMemberAttributesSetConfig = {
    isDeleteAfterOwnerLeft: false
};

zim.setRoomMembersAttributes({'key1': 'value1'}, ['user1', 'user2'], 'roomID', config)
    .then((res: ZIMRoomMembersAttributesOperatedResult) => {
        // 这里写设置结果返回后的业务逻辑 
    });
```
</CodeGroup>
:::
:::if{props.platform="window"}
<CodeGroup>
```cpp title="示例代码"
std::unordered_map<std::string, std::string> attributes;
attributes.emplace(std::string("key1"),std::string("value1"));
std::vector<std::string> userIDs;
userIDs.push_back(std::string("userID1"));
ZIMRoomMemberAttributesSetConfig setConfig;
setConfig.isDeleteAfterOwnerLeft = true;
ZIM::getInstance()->setRoomMembersAttributes(attributes, userIDs, std::string("roomID"), setConfig, [=](/zim-uniapp-x/guides/room/const-std::string-&roomid,-const-std::vector<zimroommemberattributesoperatedinfo>-&infos,-const-std::vector<std::string>-&errorusers,-const-zimerror-&errorinfo){
        //这里填写操作结果返回的逻辑
    });
```
</CodeGroup>
:::

### 查询用户属性

房间内的用户，可以通过 {getPlatformData(props,queryRoomMembersAttributesMap)} 接口，查询房间内某些用户的用户属性。


:::if{props.platform="Flutter"}
查询成功后，可以通过 [ZIMRoomMembersAttributesQueriedResult](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMRoomMembersAttributesQueriedResult-class.html) 的异步返回值，获取查询结果。
:::


:::if{props.platform=undefined}
<CodeGroup>
```java title="示例代码"
ArrayList<String> userIDs = new ArrayList<>();
userIDs.add("userID1");
ZIM.getInstance().queryRoomMembersAttributes(userIDs, "roomID", new ZIMRoomMembersAttributesQueriedCallback() {
    @Override
    public void onRoomMembersAttributesQueried(String roomID, ArrayList<ZIMRoomMemberAttributesInfo> infos, ZIMError errorInfo) {
      //这里填写查询结果返回的逻辑
    }
});
```

</CodeGroup>
:::
:::if{props.platform="iOS|mac"}
<CodeGroup>
```objc title="示例代码"
[[ZIM getInstance] queryRoomMembersAttributesByUserIDs:@[@"userID1",@"userID2"] roomID:@"roomID" callback:^(NSString * _Nonnull roomID, NSArray<ZIMRoomMemberAttributesInfo *> * _Nonnull infos, ZIMError * _Nonnull errorInfo) {
        //这里写查询结果返回后的业务逻辑
}];
```
</CodeGroup>
:::
:::if{props.platform="U3d"}
<CodeGroup>

```cs title="示例代码"
List<string> userIDs = new List<string>();
userIDs.Add("userID1");
ZIM.GetInstance().QueryRoomMembersAttributes(userIDs, "roomID", (string roomID, List<ZIMRoomMemberAttributesInfo> infos, ZIMError errorInfo) =>
    {
        //这里填写查询结果返回的逻辑
    }
);
```
</CodeGroup>
:::
:::if{props.platform="Flutter"}
<CodeGroup>
```dart title="示例代码"
Map<String, String> attributes = {"key1": "value1"};
List<String> userIDs = ["userID1"];
ZIM
    .getInstance()
    ?.queryRoomMembersAttributes(userIDs, 'roomID')
    .then((value) => {
        //这里填写成功后的逻辑
    })
    .catchError((onError) {
        //这里写失败后的逻辑
    });
```
</CodeGroup>
:::
:::if{props.platform="Web|UTS"}
<CodeGroup>
```typescript title="示例代码"
zim.queryRoomMembersAttributes(['user1', 'user2'], 'roomID')
    .then((res: ZIMRoomMembersAttributesQueriedResult) => {
        // 这里写查询结果返回后的业务逻辑 
    });
```
</CodeGroup>
:::
:::if{props.platform="window"}
<CodeGroup>
```cpp title="示例代码"
std::vector<std::string> userIDs;
userIDs.push_back(std::string("userID1"));
ZIM::getInstance()->queryRoomMembersAttributes(userIDs,  std::string("roomID"), [=](/zim-uniapp-x/guides/room/const-std::string-&roomid,-const-std::vector<zimroommemberattributesinfo>-&infos,const-zimerror-&errorinfo){
        //这里填写查询结果返回的逻辑
});
```
</CodeGroup>

:::

### 查询所有用户属性

房间内的用户，可以通过 {getPlatformData(props,queryRoomMemberAttributesListMap)} 接口，查询该房间内的所有用户的用户属性。

:::if{props.platform="Flutter"}
查询成功后，会返回该房间内所有用户的用户属性。可以通过 [ZIMRoomMemberAttributesListQueriedResult](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMRoomMemberAttributesListQueriedResult-class.html) 的异步返回值，获取查询结果。
:::
:::if{props.platform=undefined}
<CodeGroup>
```java title="示例代码"
ZIMRoomMemberAttributesQueryConfig queryConfig = new ZIMRoomMemberAttributesQueryConfig();
queryConfig.count = 100;
queryConfig.nextFlag = "";
ZIM.getInstance().queryRoomMemberAttributesList(
"roomID", queryConfig, new ZIMRoomMemberAttributesListQueriedCallback() {
       @Override
       public void onRoomMemberAttributesListQueried(String roomID, ArrayList<ZIMRoomMemberAttributesInfo> infos, String nextFlag,ZIMError errorInfo) {
       if (nextFlag == "") {
            //所有用户的房间用户属性均已查完
       }else{
            //继续查询下一分页
        }
     }
});
```

</CodeGroup>
:::
:::if{props.platform="iOS|mac"}
<CodeGroup>

```objc title="示例代码"
ZIMRoomMemberAttributesQueryConfig *queryConfig = [[ZIMRoomMemberAttributesQueryConfig alloc] init];
queryConfig.count = 100;
[[ZIM getInstance] queryRoomMemberAttributesListByRoomID:@"roomID" config:queryConfig callback:^(NSString * _Nonnull roomID, NSArray<ZIMRoomMemberAttributesInfo *> * _Nonnull infos, NSString * _Nonnull nextFlag, ZIMError * _Nonnull errorInfo) {
      //这里写查询结果返回后的业务逻辑
 }];
```
</CodeGroup>
:::
:::if{props.platform="U3d"}
<CodeGroup>
```cs title="示例代码"
ZIMRoomMemberAttributesQueryConfig queryConfig = new ZIMRoomMemberAttributesQueryConfig();
queryConfig.count = 100;
queryConfig.nextFlag = "";
ZIM.GetInstance().QueryRoomMemberAttributesList(
    "roomID", queryConfig, (string roomID, List<ZIMRoomMemberAttributesInfo> infos, string nextFlag, ZIMError errorInfo) =>
    {
            if (nextFlag == "")
            {
                //所有用户的房间用户属性均已查完
            }
            else
            {
                //继续查询下一分页
            }
        }
);
```
</CodeGroup>
:::
:::if{props.platform="Flutter"}
<CodeGroup>
```dart title="示例代码"
ZIM
    .getInstance()
    ?.queryRoomMemberAttributesList(
        'roomID', ZIMRoomMemberAttributesQueryConfig())
    .then((value) => {
        //这里填写成功后的逻辑
    })
    .catchError((onError) {
        //这里写失败后的逻辑
    });
```
</CodeGroup>
:::
:::if{props.platform="Web|UTS"}
<CodeGroup>
```typescript
const config: ZIMRoomMemberAttributesQueryConfig = {
    nextFlag: '',
    count: 100
}

zim.queryRoomMemberAttributesList('roomID', config)
    .then((res: ZIMRoomMembersAttributesQueriedResult) => {
        // 这里写查询结果返回后的业务逻辑  
    });
```
</CodeGroup>
:::
:::if{props.platform="window"}
<CodeGroup>
```cpp title="示例代码"
ZIMRoomMemberAttributesQueryConfig queryConfig = ZIMRoomMemberAttributesQueryConfig(std::string(""), 100);
ZIM::getInstance()->queryRoomMemberAttributesList(std::string("roomID"), queryConfig, [=](/zim-uniapp-x/guides/room/const-std::string-&roomid,-const-std::vector<zimroommemberattributesinfo>-&infos,const-std::string-&nextflag,-const-zimerror-&errorinfo){
    if (nextFlag == "") {
        //所有用户的房间用户属性均已查完
    }else{
        //继续查询下一分页
    }
});
```
</CodeGroup>
:::

### 用户属性变更通知

:::if{props.platform="undefined|iOS|mac|window|Flutter|Web"}
当房间内成员的房间用户属性发生变更时，开发者可以通过注册 {getPlatformData(props,setEventHandlerMap)} 的回调接口 {getPlatformData(props,onRoomMemberAttributesUpdatedMap)} 方法，监听房间内成员的用户属性变更通知。
:::
:::if{props.platform="UTS"}
当房间内成员的房间用户属性发生变更时，开发者可以通过 {getPlatformData(props,onRoomMemberAttributesUpdatedMap)} 回调接口，监听房间内成员的用户属性变更通知。
:::

:::if{props.platform=undefined}
```java
public void onRoomMemberAttributesUpdated(ZIM zim,
ArrayList<ZIMRoomMemberAttributesUpdateInfo> infos,
ZIMRoomOperatedInfo operatedInfo, String roomID) {
    //这里写房间用户属性发生变更后的业务逻辑
}
```
:::
:::if{props.platform="iOS|mac"}
```objc
- (void)zim:(ZIM *)zim
    roomMemberAttributesUpdated:(NSArray<ZIMRoomMemberAttributesUpdateInfo * > *)updateInfo
               operatedUserInfo:(ZIMRoomOperatedInfo *)operatedInfo
                         roomID:(NSString *)roomID{
    //这里写房间用户属性发生变更后的业务逻辑
}
```
:::
:::if{props.platform="U3d"}
```cs
ZIM.GetInstance().onRoomMemberAttributesUpdated = (
    ZIM zim, List<ZIMRoomMemberAttributesUpdateInfo> infos,
    ZIMRoomOperatedInfo operatedInfo, string roomID) =>
{
    //这里写房间用户属性发生变更后的业务逻辑
};
```
:::
:::if{props.platform="Flutter"}
```dart

  ZIMEventHandler.onRoomMemberAttributesUpdated = (
      ZIM zim,List<ZIMRoomMemberAttributesUpdateInfo> infos,ZIMRoomOperatedInfo operatedInfo, String roomID){
    //这里写房间用户属性发生变更后的业务逻辑
  };
```
:::
:::if{props.platform="Web"}
```typescript
zim.on('roomMemberAttributesUpdated', (zim, data) => {
    // 这里写房间用户属性发生变更后的业务逻辑
});
```
:::
:::if{props.platform="UTS"}
```typescript
zim.onRoomMemberAttributesUpdated((data) => {
    // 这里写房间用户属性发生变更后的业务逻辑
});
```
:::
:::if{props.platform="window"}
```cpp
void onRoomMemberAttributesUpdated(ZIM * /*zim*/, const std::vector<ZIMRoomMemberAttributesUpdateInfo> & /*infos*/,ZIMRoomOperatedInfo /*operatedInfo*/, const std::string & /*roomID*/) override{
     //这里写房间用户属性发生变更后的业务逻辑
}
```
:::

<Note title="说明">
在房间内，如果有用户调用了 {getPlatformData(props,setRoomMembersAttributesMap)} 接口时：
- 当房间内人数在 500 人以内时，所有房间内的用户，均可以收到房用户属性变更的通知。
- 当房间内人数超过 500 人时，仅操作者和被设置/修改属性的用户，可以收到房用户属性变更的通知。

开发者如果需要提高上限，请联系 ZEGO 技术支持。
</Note>

### 批量查询房间用户信息

开发者可以通过调用 {getPlatformData(props,queryRoomMembersMap)} 接口，传入 roomID 、 userID 数组，批量查询房间中用户的信息。接口调用成功后， {getPlatformData(props,ZIMRoomMembersQueriedCallbackMap)} 会返回查询成功的 userList（可用于确认目标用户在房间中），以及查询失败的 errorUserList（可用于确认目标用户不在房间中）。

<Note title="说明">

批量查询用户数量的默认上限为 10 名。
</Note>

示例代码如下所示：

:::if{props.platform=undefined}
```java
String targetUserID = "targetUserIdA";
ArrayList<String> userIDs = new ArrayList<>();
userIDs.add(targetUserID);

// userID 映射 ZIMRoomMemberInfo  的 map，可以缓存起来用于后续 UI 展示，目前 ZIMRoomMemberInfo 暴露了 userID , userName。
HashMap<String,ZIMRoomMemberInfo> roomMemberMap = new HashMap<>();
ZIM.getInstance().queryRoomMembers(userIDs, "targetRoomID", new ZIMRoomMembersQueriedCallback() {
    @Override
    public void onRoomMembersQueried(String roomID, ArrayList<ZIMRoomMemberInfo> memberList, ArrayList<ZIMErrorUserInfo> errorUserList, ZIMError errorInfo) {
        if(errorInfo.code != ZIMErrorCode.SUCCESS){
            Log.d("ZIM CallBack","query room members error! error code:"+errorInfo.code+", error message:"+errorInfo.message);
        }
        HashMap<String,ZIMErrorUserInfo> targetErrorUserInfoMap = new HashMap<>();
        for (ZIMRoomMemberInfo memberInfo:
             memberList) {
            roomMemberMap.put(memberInfo.userID,memberInfo);
        }

        // 针对查询失败的部分 userID, 映射 ZIMErrorUserInfo 的 map, 如果有需要关注失败原因可以读取此数据结构
        for (ZIMErrorUserInfo errorUserInfo:
             errorUserList) {
            targetErrorUserInfoMap.put(errorUserInfo.userID,errorUserInfo);
        }

        // 判断是否目标成员是否在房间内
        boolean isTargetUserIdA = roomMemberMap.containsKey(targetUserID);
    }
});
```
:::
:::if{props.platform="iOS|mac"}
```objc
NSString *userIdA = @"targetUserIdA";
NSString *userIdB = @"targetUserIdB";
NSArray<NSString *> *targetUserIDs = @[userIdA,userIdB];

// userID 映射 ZIMRoomMemberInfo 的 map, 可以缓存起来用于后续 UI 展示，目前 ZIMRoomMemberInfo 暴露了 userID , userName。
NSMutableDictionary *targetRoomMemberMap = [[NSMutableDictionary alloc] init];

[[ZIM getInstance] queryRoomMembersByUserIDs:targetUserIDs roomID:@"targetRoomID" callback:^(NSString * _Nonnull roomID, NSArray<ZIMRoomMemberInfo *> * _Nonnull memberList, NSArray<ZIMErrorUserInfo *> * _Nonnull errorUserList, ZIMError * _Nonnull errorInfo) {
    if(errorInfo.code != ZIMErrorCodeSuccess){
        NSLog(@"query room members failed! error code:%ld, error message: %@",errorInfo.code, errorInfo.message);
        return;
    }
    // userID 映射 ZIMErrorUserInfo 的 map, 如果有需要关注失败原因可以读取此数据结构
    NSMutableDictionary *targetErrorUserInfoMap = [[NSMutableDictionary alloc] init];


    for (ZIMRoomMemberInfo *currentMemberInfo in memberList) {
        [targetRoomMemberMap setObject:currentMemberInfo forKey:currentMemberInfo.userID];
    }
    for (ZIMErrorUserInfo *currentErrorUserInfo in errorUserList){
        [targetErrorUserInfoMap setObject:currentErrorUserInfo forKey:currentErrorUserInfo.userID];
    }

    // 判断是否目标成员是否在房间内
    bool isTargetUserIdAInTheRoom = [[targetRoomMemberMap allKeys] containsObject:userIdA];

}];
```
:::
:::if{props.platform="U3d"}
```cs
string userIdA = "UserIdA";
string userIdB = "UserIdB";
List<string> userIDs = new List<string>();
userIDs.Add(userIdA);
userIDs.Add(userIdB);

ZIM.GetInstance().QueryRoomMembers(userIDs, "roomID", (string roomID, List<ZIMRoomMemberInfo> memberList, List<ZIMErrorUserInfo> errorUserList, ZIMError errorInfo)=>{
    if (errorInfo.code == ZIMErrorCode.Success){
        //调用成功
    }
});
```
:::
:::if{props.platform="Flutter"}
```dart
ZIM.getInstance().queryRoomMembers(["userA","userB"], "roomID")
.then((ZIMRoomMembersQueriedResult value) {
    // userID 映射 ZIMErrorUserInfo 的 map, 如果有需要关注失败原因可以读取此数据结构
    Map<String, ZIMErrorUserInfo> targetErrorUserInfoMap = {};

    Map<String, ZIMRoomMemberInfo> targetRoomMemberMap = {};

    for (ZIMRoomMemberInfo currentMemberInfo in value.memberList) {
        targetRoomMemberMap[currentMemberInfo.userID] = currentMemberInfo;
    }
    for (ZIMErrorUserInfo currentErrorUserInfo in value.errorUserList) {
       targetErrorUserInfoMap[currentErrorUserInfo.userID] = currentErrorUserInfo;
    }
    // 判断是否目标成员是否在房间内
    bool isTargetUserIdAInTheRoom = targetRoomMemberMap.containsKey(userIdA);
}).catchError((onError){
    // 处理失败
});
```
:::
:::if{props.platform="Web|UTS"}
```typescript

const userIDs = ['user1', 'user2'];

zim.queryRoomMembers(userIDs, 'roomID')
    .then((res: ZIMRoomMembersQueriedResult) => {
        // 这里写查询结果返回后的业务逻辑  
    });
```
:::
:::if{props.platform="window"}
```cpp
std::vector<std::string> targetUserIDs;

ZIM::getInstance().queryRoomMembers(targetUserIDs, roomID, [targetRoomMemberMap](/zim-uniapp-x/guides/room/const-std::string-&roomid,-const-std::vector<zimroommemberinfo>-&memberlist,const-std::vector<zimerroruserinfo>-&erroruserlist,-const-zimerror-&errorinfo) {
    if (errorInfo.code != ZIMErrorCodeSuccess) {
        std::cout << "Query room members failed! error code: " << errorInfo.code << ", error message: " << errorInfo.message << std::endl;
        return;
    }

// userID 映射 ZIMRoomMemberInfo 的 map, 可以缓存起来用于后续 UI 展示，目前 ZIMRoomMemberInfo 暴露了 userID , userName。
    std::map<std::string, ZIMRoomMemberInfo> targetRoomMemberMap;

 // userID 映射 ZIMErrorUserInfo 的 map, 如果有需要关注失败原因可以读取此数据结构
    std::map<std::string, ZIMErrorUserInfo> targetErrorUserInfoMap;

    for (auto const& currentMemberInfo : memberList) {
        targetRoomMemberMap[currentMemberInfo.userID] = currentMemberInfo;
    }
    for (auto const& currentErrorUserInfo : errorUserList) {
        targetErrorUserInfoMap[currentErrorUserInfo.userID] = currentErrorUserInfo;
    }

// 判断是否目标成员是否在房间内
    bool isTargetUserIdAInTheRoom = std::find(targetRoomMemberMap.begin(), targetRoomMemberMap.end(), userIdA) != targetRoomMemberMap.end();
});
```
:::

<Content platform ="UTS" />