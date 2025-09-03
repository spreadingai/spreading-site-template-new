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

export const createRoomMap = {
  'Android': <a href="@createRoom" target='_blank'>createRoom</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/createRoom.html" target='_blank'>createRoom</a>,
}
export const onRoomAttributesUpdatedMap = {
  'Android': <a href="@onRoomAttributesUpdated" target='_blank'>onRoomAttributesUpdated</a>,
  'U3d': <a href="@OnRoomAttributesUpdated" target='_blank'>OnRoomAttributesUpdated</a>,
  'iOS': <a href="https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_ios~protocol~ZIMEventHandler#zim-room-attributes-updated-room-id" target='_blank'>roomAttributesUpdated</a>,
  'mac': <a href="https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_macos~protocol~ZIMEventHandler#zim-room-attributes-updated-room-id" target='_blank'>roomAttributesUpdated</a>,
  'Web': <a href="@roomAttributesUpdated" target='_blank'>roomAttributesUpdated</a>,
  'UTS': <a href="@roomAttributesUpdated" target='_blank'>onRoomAttributesUpdated</a>,
}
export const queryRoomAllAttributesMap = {
  'Android': <a href="@queryRoomAllAttributes" target='_blank'>queryRoomAllAttributes</a>,
  'iOS,mac': <a href="@queryRoomAllAttributesByRoomID" target='_blank'>queryRoomAllAttributesByRoomID</a>,
  'U3d': <a href="@QueryRoomAllAttributes" target='_blank'>QueryRoomAllAttributes</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/queryRoomAllAttributes.html" target='_blank'>queryRoomAllAttributes</a>,
}
export const beginRoomAttributesBatchOperationMap = {
  'Android': <a href="@beginRoomAttributesBatchOperation" target='_blank'>beginRoomAttributesBatchOperation</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/beginRoomAttributesBatchOperation.html" target='_blank'>beginRoomAttributesBatchOperation</a>,
  'iOS,mac': <a href="@beginRoomAttributesBatchOperationWithRoomID" target='_blank'>beginRoomAttributesBatchOperationWithRoomID</a>,
}
export const endRoomAttributesBatchOperationMap = {
  'Android': <a href="@endRoomAttributesBatchOperation" target='_blank'>endRoomAttributesBatchOperation</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/endRoomAttributesBatchOperation.html" target='_blank'>endRoomAttributesBatchOperation</a>,
  'iOS,mac': <a href="@endRoomAttributesBatchOperationWithRoomID" target='_blank'>endRoomAttributesBatchOperationWithRoomID</a>,
}
export const setRoomAttributesMap = {
  'Android': <a href="@setRoomAttributes" target='_blank'>setRoomAttributes</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/setRoomAttributes.html" target='_blank'>setRoomAttributes</a>,
}
export const deleteRoomAttributesMap = {
  'Android': <a href="@deleteRoomAttributes" target='_blank'>deleteRoomAttributes</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/deleteRoomAttributes.html" target='_blank'>deleteRoomAttributes</a>,
  'iOS,mac': <a href="@deleteRoomAttributesByKeys" target='_blank'>deleteRoomAttributesByKeys</a>,
}

# 房间属性管理

- - -
## 功能简介

ZIM SDK 的房间属性功能，提供了可在指定房间中，设置自定义属性的能力。

通常可以应用在语音直播、聊天室等的属性同步、语聊房的麦位管理、以及狼人杀等卡牌类游戏中，记录用户的角色和牌局状态等场景中。

## 实现流程

开发者需要在调用 {getPlatformData(props,createRoomMap)} 接口时，设置房间属性参数，创建并加入房间。

<Warning title="注意">
- 每个房间中，最多允许设置 20 个属性，以 `Key-Value` 的方式进行存储。`Key`的长度上限为 16 字节，`Value`的长度上限为 1024 字节，所有属性的总长度不得超过 5120 字节。开发者如果需要提高属性上限，请联系 ZEGO 技术支持。
- 房间销毁后，设置的自定义属性也会同时销毁。
</Warning>

:::if{props.platform=undefined}
<CodeGroup>
```java title="示例代码"
// roomID 最大 128 字节的字符串。仅支持数字，英文字符 和 '~', '!', '@', '#', '
<Content platform="RN" />, '%', '^', '&', '*', '(', ')', '_', '+', '=', '-', '`', ';', '’', ',', '.', '<', '>', '/', '\'。
// roomName 最大 64 字节的字符串，无特殊字符限制。
ZIMRoomInfo zimRoomInfo = new ZIMRoomInfo();
zimRoomInfo.roomID = roomID;
zimRoomInfo.roomName = "roomName" + roomID;
HashMap<String, String> hashMap = new HashMap<>();
hashMap.put("test1", "test2");
ZIMRoomAdvancedConfig zimRoomAdvancedInfo = new ZIMRoomAdvancedConfig();
zimRoomAdvancedInfo.roomAttributes = hashMap;
zim.createRoom(zimRoomInfo, zimRoomAdvancedInfo, new ZIMRoomCreatedCallback() {
    @Override
    public void onRoomCreated(ZIMRoomFullInfo roomInfo, ZIMError errorCode) {
          assertSame(errorCode.code, SUCCESS);
    }
});
```
</CodeGroup>

:::
:::if{props.platform="iOS|mac"}
<CodeGroup>
```objc title="示例代码"
ZIMRoomInfo *zimRoomInfo = [[ZIMRoomInfo alloc] init];
// 创建一个 ZIMRoomInfo 对象。
ZIMRoomAdvancedConfig *config = [[ZIMRoomAdvancedConfig alloc] init];
NSMutableDictionary *roomAttributes = [[NSMutableDictionary alloc] init];
NSString *myValue = @"room_info_value";
NSString *myKey = @"room_info";

[roomAttributes setObject:myValue forKey:myKey];

config.roomAttributes = roomAttributes;

[zim createRoom:zimRoomInfo config:config callback:^(ZIMRoomFullInfo * _Nonnull roomInfo, ZIMError * _Nonnull errorInfo) {}];
```
</CodeGroup>
:::
:::if{props.platform="window"}
<CodeGroup>
```cpp title="示例代码"
zim::ZIMRoomInfo room_info;

room_info.roomID = "房间ID";
room_info.roomName = "房间名称";

zim::ZIMRoomAdvancedConfig advanced_info;
advanced_info.roomAttributes.emplace("key", "value");

zim_->createRoom(
    room_info, advanced_info, [=](/zim-uniapp/guides/room/zim::zimroomfullinfo-roominfo,-zim::zimerror-errorinfo) {
});
```
</CodeGroup>
:::
:::if{props.platform="U3d"}
<CodeGroup>
```cs title="示例代码"
ZIMRoomInfo zimRoomInfo = new ZIMRoomInfo();
// roomID 是一个最大长度为32字节的字符串。它只支持数字、英文字母和以下特殊字符：'~', '!', ' '#', '
<Content platform="RN" />, '%', '^', '&', '*', '(', ')', '_', '+', '=', '-', '`', ';', '’', ',', '.', '<', '>', '/', '\'.
zimRoomInfo.roomID = "roomID";
// roomName 是一个最大长度为64字节的字符串，没有特殊字符限制。
zimRoomInfo.roomName = "roomName";
Dictionary<string, string> roomAttributes = new Dictionary<string, string>();
roomAttributes.Add("test1", "test2");
ZIMRoomAdvancedConfig zimRoomAdvancedInfo = new ZIMRoomAdvancedConfig();
zimRoomAdvancedInfo.roomAttributes = roomAttributes;
ZIM.GetInstance().CreateRoom(zimRoomInfo, zimRoomAdvancedInfo, (ZIMRoomFullInfo roomInfo, ZIMError errorCode) =>
    {
        if (errorCode.code == ZIMErrorCode.Success)
        {
            // 创建成功
        }
    }
);
```
</CodeGroup>
:::
:::if{props.platform="Flutter"}
<CodeGroup>
```dart title="示例代码"
ZIMRoomMemberQueryConfig roomMemberQueryConfig = ZIMRoomMemberQueryConfig();
roomMemberQueryConfig.count = 100;

// roomID 最大 128 字节的字符串。仅支持数字，英文字符 和 '~', '!', '@', '#', '
<Content platform="RN" />, '%', '^', '&', '*', '(', ')', '_', '+', '=', '-', '`', ';', '’', ',', '.', '<', '>', '/', '\'。
// roomName 最大 64 字节的字符串，无特殊字符限制。
ZIMRoomInfo roomInfo = ZIMRoomInfo();
roomInfo.roomID = 'roomID';
roomInfo.roomName = 'roomName';
ZIMRoomAdvancedConfig advancedConfig = ZIMRoomAdvancedConfig();
advancedConfig.roomAttributes = {'key': 'value'};

ZIM
    .getInstance()
    !.createRoom(roomInfo,advancedConfig)
    .then((value) => {
        //创建成功触发此处
    })
    .catchError((onError) {
        //创建失败触发此处
    });
```
</CodeGroup>
:::
:::if{props.platform="Web|RN|UTS"}
<CodeGroup>
```typescript title="示例代码"
// roomID 最大 128 字节的字符串。仅支持数字，英文字符和 '!'，'#'，'
<Content platform="RN" />，'%'，'&'，'('，')'，'+'，'-'，':'，';'，'<'，'='，'.'，'>'，'?'，'@'，'['，']'，'^'，'_'，' '，'{'，'}'，'|'，'~'。
// roomName 最大 64 字节的字符串，无特殊字符限制。
const roomInfo: ZIMRoomInfo = { roomID: '', roomName: '' };
const config: ZIMRoomAdvancedConfig = {
    roomAttributes: { key1: 'value1', key2: 'value2' },
    roomDestroyDelayTime: 30, // 房间没人时的延迟销毁时间，单位秒
};

zim.createRoom(roomInfo, config)
    .then((res: ZIMRoomCreatedResult) => {
        // 操作成功
    })
    .catch((err: ZIMError) => {
        // 操作失败
    });
```
</CodeGroup>
:::


### 设置房间属性

每个房间中，设置的属性以 `Key-Value` 的形式存储。您可以调用 {getPlatformData(props,setRoomAttributesMap)} 接口，设置房间属性。

- 当 Key 不存在时，设置房间属性表示增加属性。
- 当 key 已经存在时，设置房间属性表示更新已有属性的取值。

:::if{props.platform="Flutter"}
设置房间属性后，可以通过 [ZIMRoomAttributesOperatedCallResult](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMRoomAttributesOperatedCallResult-class.html) 类型的异步返回值，返回设置房间属性的操作结果。
:::
:::if{props.platform=undefined}
<CodeGroup>
```java title="示例代码"
ZIMRoomAttributesSetConfig config = new ZIMRoomAttributesSetConfig();
config.isUpdateOwner = false;
config.isForce = false;
config.isDeleteAfterOwnerLeft = false;
zim.setRoomAttributes(hashMap, roomID, config, new ZIMRoomAttributesOperatedCallback() {
            @Override
            public void onRoomAttributesOperated(String roomID, ArrayList<String> errorKeys, ZIMError errorInfo) {

            }
});
```
</CodeGroup>

:::
:::if{props.platform="iOS|mac"}
<CodeGroup>
```objc title="示例代码"
NSString *key = @"room_info";
NSString *value = @"room_info_value";
NSMutableDictionary *roomAttributes = [[NSMutableDictionary alloc] init];
[roomAttributes setObject:value forKey:key];
ZIMRoomAttributesSetConfig *setConfig = [[ZIMRoomAttributesSetConfig alloc] init];
setConfig.isDeleteAfterOwnerLeft = true;
setConfig.isForce = false;
[zim setRoomAttributes:roomAttributes roomID:roomID config:setConfig callback:^(NSString * _Nonnull roomID, NSArray<NSString *> * _Nonnull errorKeys, ZIMError * _Nonnull errorInfo) {}];
```
</CodeGroup>
:::
:::if{props.platform="window"}
<CodeGroup>
```cpp title="示例代码"
std::unordered_map<std::string, std::string> roomAttributes;
roomAttributes.emplace("key", "value");

zim->setRoomAttributes(roomAttributes, room_id, nullptr, [=](/zim-uniapp/guides/room/const-std::string-&roomid,-const-std::vector<std::string>-&errorkeylist,const-zimerror-&errorinfo){});
```
</CodeGroup>
:::
:::if{props.platform="U3d"}
<CodeGroup>
```cs title="示例代码"
ZIMRoomAttributesSetConfig config = new ZIMRoomAttributesSetConfig();
config.isUpdateOwner = false;
config.isForce = false;
config.isDeleteAfterOwnerLeft = false;
Dictionary<string, string> roomAttributes = new Dictionary<string, string>();
roomAttributes.Add("test1", "test2");

ZIM.GetInstance().SetRoomAttributes(roomAttributes, "roomID", config, (string roomID, List<string> errorKeys, ZIMError errorInfo) =>
    {
        if(errorInfo.code == ZIMErrorCode.Success)
        {
           // 设置成功。
       }
   }
);
```
</CodeGroup>
:::
:::if{props.platform="Flutter"}
<CodeGroup>
```dart title="示例代码"
Map<String, String> roomAttributes = {'key': 'value'};
ZIMRoomAttributesSetConfig roomAttributesSetConfig = ZIMRoomAttributesSetConfig();
ZIM
    .getInstance()
    !.setRoomAttributes(roomAttributes, 'roomID', roomAttributesSetConfig)
    .then((value) => {
      //成功触发此处
    })
    .catchError((onError) {
      //失败触发此处
    });
```
</CodeGroup>
:::
:::if{props.platform="Web|RN"}
<CodeGroup>
```typescript title="示例代码"
const roomID = '';
const roomAttributes = { key1: 'value1', key2: 'value2' };
const config: ZIMRoomAttributesSetConfig = {
    isForce: false,
    isUpdateOwner: false,
    isDeleteAfterOwnerLeft: false
};

zim.setRoomAttributes(roomAttributes, roomID, config)
    .then((res: ZIMRoomAttributesOperatedResult) => {
        // 操作成功
    })
    .catch((err: ZIMError) => {
        // 操作失败
    });

// 设置 roomAttributesUpdated 回调
zim.on('roomAttributesUpdated', (zim, data) => {
    console.log('roomAttributesUpdated', data.roomID, data.infos);
});
```
</CodeGroup>
:::
:::if{props.platform="UTS"}
<CodeGroup>
```typescript title="示例代码"
const roomID = '';
const roomAttributes = { key1: 'value1', key2: 'value2' };
const config: ZIMRoomAttributesSetConfig = {
    isForce: false,
    isUpdateOwner: false,
    isDeleteAfterOwnerLeft: false
};

zim.setRoomAttributes(roomAttributes, roomID, config)
    .then((res: ZIMRoomAttributesOperatedResult) => {
        // 操作成功
    })
    .catch((err: ZIMError) => {
        // 操作失败
    });

// 设置 onRroomAttributesUpdated 回调
zim.onRroomAttributesUpdated((data) => {
    console.log('roomAttributesUpdated', data.roomID, data.infos);
});
```
</CodeGroup>
:::


### 删除房间属性

您可以调用 {getPlatformData(props,deleteRoomAttributesMap)} 接口，删除房间属性。通常开发者只能删除自己拥有的属性，也可以设置 “config” 中的 “isForce” 参数取值，删除他人创建的属性。

:::if{props.platform=undefined}
<CodeGroup>
```java title="示例代码"
ArrayList<String> attributeList = new ArrayList<>();
attributeList.add("xxxx");
ZIMRoomAttributesDeleteConfig config = new ZIMRoomAttributesDeleteConfig();
config.isForce = true;
zim.deleteRoomAttributes(keys, roomID, config, new ZIMRoomAttributesOperatedCallback() {
            @Override
            public void onRoomAttributesOperated(String roomID, ArrayList<String> errorKeys, ZIMError errorInfo) {

            }
});
```
</CodeGroup>
:::
:::if{props.platform="iOS|mac"}
<CodeGroup>
```objc title="示例代码"
NSString *key = [NSString stringWithFormat:@"seat_%d",targetIndex];
NSMutableArray *keys = [[NSMutableArray alloc] init];
[keys addObject:key];
ZIMRoomAttributesDeleteConfig *config = [[ZIMRoomAttributesDeleteConfig alloc] init];
config.isForce = true;
[zim deleteRoomAttributesByKeys:keys roomID:roomID config:config callback:^(NSString * _Nonnull roomID, NSArray<NSString *> * _Nonnull errorKeys, ZIMError * _Nonnull errorInfo) {}];
```
</CodeGroup>
:::
:::if{props.platform="window"}
<CodeGroup>
```cpp title="示例代码"
std::vector<std::string> keys;
keys.push_back("key");

zim->deleteRoomAttributes(keys, room_id, nullptr, [=](/zim-uniapp/guides/room/const-std::string-&roomid,-const-std::vector<std::string>-&errorkeylist,const-zimerror-&errorinfo){});
```
</CodeGroup>
:::
:::if{props.platform="U3d"}
<CodeGroup>
```cs title="示例代码"
List<string> attributeKeyList = new List<string>();
attributeKeyList.Add("xxxx");
ZIMRoomAttributesDeleteConfig config = new ZIMRoomAttributesDeleteConfig();
config.isForce = true;
ZIM.GetInstance().DeleteRoomAttributes(attributeKeyList, "roomID", config, (string roomID, List<string> errorKeys, ZIMError errorInfo) =>
    {

    }
);
```
</CodeGroup>
:::
:::if{props.platform="Flutter"}
<CodeGroup>
```dart title="示例代码"
List<String> keys = ['key1', 'key2'];
ZIMRoomAttributesDeleteConfig roomAttributesDeleteConfig = ZIMRoomAttributesDeleteConfig();

ZIM
    .getInstance()
    !.deleteRoomAttributes(keys, 'roomID', roomAttributesDeleteConfig)
    .then((value) => {
        //成功触发此处
    })
    .catchError((onError) {
        //失败触发此处
    });
```

</CodeGroup>
:::
:::if{props.platform="Web|RN"}
<CodeGroup>
```typescript title="示例代码"
const roomID = '';
const keys = ['key1'];
const config: ZIMRoomAttributesDeleteConfig = {
    isForce: false
};

zim.deleteRoomAttributes(keys, roomID, config)
    .then((res: ZIMRoomAttributesOperatedResult) => {
        // 操作成功
    })
    .catch((err: ZIMError) => {
        // 操作失败
    });

// 设置 roomAttributesUpdated 回调
zim.on('roomAttributesUpdated', (zim, data) => {
    console.log('roomAttributesUpdated', data.roomID, data.infos);
});
```
</CodeGroup>
:::
:::if{props.platform="UTS"}
<CodeGroup>
```typescript title="示例代码"
const roomID = '';
const keys = ['key1'];
const config: ZIMRoomAttributesDeleteConfig = {
    isForce: false
};

zim.deleteRoomAttributes(keys, roomID, config)
    .then((res: ZIMRoomAttributesOperatedResult) => {
        // 操作成功
    })
    .catch((err: ZIMError) => {
        // 操作失败
    });

// 设置 onRoomAttributesUpdated 回调
zim.onRoomAttributesUpdated((data) => {
    console.log('roomAttributesUpdated', data.roomID, data.infos);
});
```
</CodeGroup>
:::

### 获取房间属性
通过调用 {getPlatformData(props,queryRoomAllAttributesMap)} 接口，可以获取房间的所有属性。

:::if{props.platform="Flutter"}
获取房间属性后，可以通过 [ZIMRoomAttributesQueriedResult](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMRoomAttributesQueriedResult-class.html) 类型的异步返回值，返回获取房间属性的操作结果。
:::

:::if{props.platform="iOS|mac|undefined|window|U3d|Web|UTS"}
<Warning title="注意">
登录房间时，房间最新属性将通过 {getPlatformData(props,onRoomAttributesUpdatedMap)} 回调返回，无需调用 {getPlatformData(props,queryRoomAllAttributesMap)} 。
</Warning>
:::

:::if{props.platform=undefined}
<CodeGroup>
```java title="示例代码"
zim.queryRoomAllAttributes(roomID, new ZIMRoomAttributesQueriedCallback() {
            @Override
            public void onRoomAttributesQueried(String roomID, HashMap<String, String> roomAttributes, ZIMError errorInfo) {

            }
});
```
</CodeGroup>

:::

:::if{props.platform="iOS|mac"}
<CodeGroup>
```objc title="示例代码"
[zim queryRoomAllAttributesByRoomID:roomID callback:^(NSString * _Nonnull roomID, NSDictionary<NSString *,NSString * > * _Nonnull roomAttributes, ZIMError * _Nonnull errorInfo) {}];
```
</CodeGroup>
:::
:::if{props.platform="window"}
<CodeGroup>
```cpp title="示例代码"
zim->queryRoomAllAttributes(room_id,[=](/zim-uniapp/guides/room/const-std::string-&roomid,-const-std::unordered_map<std::string,-std::string>-&roomattributes,const-zimerror-&errorinfo){});
```
</CodeGroup>
:::
:::if{props.platform="U3d"}
<CodeGroup>
```cs title="示例代码"
ZIM.GetInstance().QueryRoomAllAttributes("roomID", (string roomID, Dictionary<string, string> roomAttributes, ZIMError errorInfo) =>
    {
        if(errorInfo.code == ZIMErrorCode.Success)
        {
           // 操作成功。
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
    !.queryRoomAllAttributes('roomID')
    .then((value) => {
      //成功触发此处
    })
    .catchError((onError) {
      //失败触发此处
    });
```
</CodeGroup>
:::
:::if{props.platform="Web|RN|UTS"}
<CodeGroup>
```typescript title="示例代码"
const roomID = '';
zim.queryRoomAllAttributes(roomID)
    .then((res: ZIMRoomAttributesQueriedResult) => {
        // 查询成功
    })
    .catch((err: ZIMError) => {
        // 查询失败
    });
```
</CodeGroup>
:::


### 房间属性组合操作

组合操作可以使用 {getPlatformData(props,beginRoomAttributesBatchOperationMap)} 和 {getPlatformData(props,endRoomAttributesBatchOperationMap)} 方法将同一房间中，多个不同操作合并为一个原子操作进行执行，通常用于连续操作时不想被其他用户操作插入执行的情况。



:::if{props.platform=undefined}
<CodeGroup>
```java title="示例代码"
ZIMRoomAttributesBatchOperationConfig operationConfig = new ZIMRoomAttributesBatchOperationConfig();
operationConfig.isForce = false;
operationConfig.isDeleteAfterOwnerLeft = true;
zim.beginRoomAttributesBatchOperation(mRoomID, operationConfig);

zim.endRoomAttributesBatchOperation(roomID, new ZIMRoomAttributesBatchOperatedCallback() {
            @Override
            public void onRoomAttributesBatchOperated(String roomID, ZIMError errorInfo) {

            }
});
```
</CodeGroup>

:::

:::if{props.platform="U3d"}
<CodeGroup>
```cs title="示例代码"
ZIMRoomAttributesBatchOperationConfig operationConfig = new ZIMRoomAttributesBatchOperationConfig();
operationConfig.isForce = false;
operationConfig.isDeleteAfterOwnerLeft = true;
ZIM.GetInstance().BeginRoomAttributesBatchOperation("房间ID", operationConfig);

ZIM.GetInstance().EndRoomAttributesBatchOperation("房间ID", (string roomID, ZIMError errorInfo) => { } );
```
</CodeGroup>
:::
:::if{props.platform="Flutter"}
<CodeGroup>
```dart title="示例代码"
ZIM
    .getInstance()
    !.beginRoomAttributesBatchOperation('roomID', batchOperationConfig)
    .then((value) => {
        //成功触发此处
    })
    .catchError((onError) {
        //失败触发此处
    });

ZIM
    .getInstance()
    !.endRoomAttributesBatchOperation('roomID')
    .then((value) => {
        //成功触发此处
    })
    .catchError((onError) {
        //失败触发此处
    });
```
</CodeGroup>
:::

:::if{props.platform="window"}
<CodeGroup>
```cpp title="示例代码"
std::unordered_map<std::string, std::string> roomAttributes;
std::vector<std::string> keys;

auto config = zim::ZIMRoomAttributesBatchOperationConfig{true, true, true};
zim_->BeginRoomAttributesBatchOperation(utf8_room_id, &config);

zim_->BeginRoomAttributesBatchOperation(room_id, &config);
zim->setRoomAttributes(roomAttributes, room_id, nullptr, [=](/zim-uniapp/guides/room/const-std::string-&roomid,-const-std::vector<std::string>-&errorkeylist,const-zimerror-&errorinfo){});
zim->deleteRoomAttributes(keys, room_id, nullptr, [=](/zim-uniapp/guides/room/const-std::string-&roomid,-const-std::vector<std::string>-&errorkeylist,const-zimerror-&errorinfo){});
zim->endRoomAttributesBatchOperation(room_id,[=](/zim-uniapp/guides/room/const-std::string-&roomid,-const-zimerror-&errorinfo){});
```
</CodeGroup>
:::

:::if{props.platform="iOS|mac"}
<CodeGroup>
```objc title="示例代码"
//组合操作
NSMutableDictionary *roomAttributes = [[NSMutableDictionary alloc] init];
NSString *key = @"key";
NSString *value = @"value";
[roomAttributes setObject:value forKey:key];
//设置添加新房间属性的配置。
ZIMRoomAttributesSetConfig *config = [[ZIMRoomAttributesSetConfig alloc] init];
config.isForce = false;
config.isDeleteAfterOwnerLeft = true;
//删除房间属性的相关配置。
NSString *deleteKey = @"key";
NSMutableArray *keys = [[NSMutableArray alloc] init];
[keys addObject:deleteKey];
ZIMRoomAttributesDeleteConfig *deleteConfig = [[ZIMRoomAttributesDeleteConfig alloc] init];
//设置组合房间属性操作。
ZIMRoomAttributesBatchOperationConfig *setConfig = [[ZIMRoomAttributesBatchOperationConfig alloc] init];
setConfig.isDeleteAfterOwnerLeft = true;
setConfig.isForce = false;
setConfig.isUpdateOwner = true;
[zim beginRoomAttributesBatchOperationWithRoomID:roomID config:setConfig];

//修改房间属性

//首先添加一个房间属性。
[zim setRoomAttributes:roomAttributes roomID:roomID config:config callback:^(NSString * _Nonnull roomID, NSArray<NSString *> * _Nonnull errorKeys, ZIMError * _Nonnull errorInfo) {}];

//然后删除一个房间属性。
[zim deleteRoomAttributesByKeys:keys roomID:roomID config:config callback:^(NSString * _Nonnull roomID, NSArray<NSString *> * _Nonnull errorKeys, ZIMError * _Nonnull errorInfo) {}];

//组合两个操作。
[zim endRoomAttributesBatchOperationWithRoomID:roomID callback:^(NSString * _Nonnull roomID, ZIMError * _Nonnull errorInfo) {}];
```
</CodeGroup>
:::
:::if{props.platform="Web|RN"}
<CodeGroup>
```typescript title="示例代码"
const roomID = '';
const config: ZIMRoomAttributesBatchOperationConfig = {
    isForce: false,
    isUpdateOwner: false,
    isDeleteAfterOwnerLeft: false
};
const config_set: ZIMRoomAttributesSetConfig = {
    isForce: false,
    isUpdateOwner: false,
    isDeleteAfterOwnerLeft: false
};
const config_delete: ZIMRoomAttributesDeleteConfig = {
    isForce: false,
}

// 开始 批量操作
zim.beginRoomAttributesBatchOperation(roomID, config);

// 批量操作时，使用 `Promise.then` 获取操作结果。请不要使用 `async-await` 等待操作结果。
const roomAttributes = { key1: 'value1', key2: 'value2' };
zim.setRoomAttributes(roomAttributes, roomID, config_set)
   .then((res: ZIMRoomAttributesOperatedResult) => {
        // 操作成功
    })
    .catch((err: ZIMError) => {
        // 操作失败
    });

// 批量操作时，使用 `Promise.then` 获取操作结果。请不要使用 `async-await` 等待操作结果。
const keys = ['key1'];
zim.deleteRoomAttributes(keys, roomID, config_delete)
   .then((res: ZIMRoomAttributesOperatedResult) => {
        // 操作成功
    })
    .catch((err: ZIMError) => {
        // 操作失败
    });

// 结束 批量操作
zim.endRoomAttributesBatchOperation(roomID)
    .then((res: ZIMRoomAttributesBatchOperatedResult) => {
        // 操作成功
    })
    .catch((err: ZIMError) => {
        // 操作失败
    });

// 设置 roomAttributesBatchUpdated 回调
zim.on('roomAttributesBatchUpdated', (zim, data) => {
    console.log('roomAttributesBatchUpdated', data.roomID, data.infos);
});
```
</CodeGroup>
:::
:::if{props.platform="UTS"}
<CodeGroup>
```typescript title="示例代码"
const roomID = '';
const config: ZIMRoomAttributesBatchOperationConfig = {
    isForce: false,
    isUpdateOwner: false,
    isDeleteAfterOwnerLeft: false
};
const config_set: ZIMRoomAttributesSetConfig = {
    isForce: false,
    isUpdateOwner: false,
    isDeleteAfterOwnerLeft: false
};
const config_delete: ZIMRoomAttributesDeleteConfig = {
    isForce: false,
}

// 开始 批量操作
zim.beginRoomAttributesBatchOperation(roomID, config);

// 批量操作时，使用 `Promise.then` 获取操作结果。请不要使用 `async-await` 等待操作结果。
const roomAttributes = { key1: 'value1', key2: 'value2' };
zim.setRoomAttributes(roomAttributes, roomID, config_set)
   .then((res: ZIMRoomAttributesOperatedResult) => {
        // 操作成功
    })
    .catch((err: ZIMError) => {
        // 操作失败
    });

// 批量操作时，使用 `Promise.then` 获取操作结果。请不要使用 `async-await` 等待操作结果。
const keys = ['key1'];
zim.deleteRoomAttributes(keys, roomID, config_delete)
   .then((res: ZIMRoomAttributesOperatedResult) => {
        // 操作成功
    })
    .catch((err: ZIMError) => {
        // 操作失败
    });

// 结束 批量操作
zim.endRoomAttributesBatchOperation(roomID)
    .then((res: ZIMRoomAttributesBatchOperatedResult) => {
        // 操作成功
    })
    .catch((err: ZIMError) => {
        // 操作失败
    });

// 设置 onRroomAttributesBatchUpdated 回调
zim.onRroomAttributesBatchUpdated((data) => {
    console.log('roomAttributesBatchUpdated', data.roomID, data.infos);
});
```
</CodeGroup>
:::
<Content platform="RN" />