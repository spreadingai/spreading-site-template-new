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

export const setGroupAttributesMap = {
  'Android': <a href="@setGroupAttributes" target='_blank'>setGroupAttributes</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/setGroupAttributes.html" target='_blank'>setGroupAttributes</a>,
}
export const ZIMGroupAttributesOperatedCallbackMap = {
  'Android': <a href="@-ZIMGroupAttributesOperatedCallback" target='_blank'>ZIMGroupAttributesOperatedCallback</a>,
  'U3d,window': <a href="@ZIMGroupAttributesOperatedCallback" target='_blank'>ZIMGroupAttributesOperatedCallback</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMGroupAttributesOperatedResult-class.html" target='_blank'>ZIMGroupAttributesOperatedCallback</a>,
  'Web,UTS': <a href="@-ZIMGroupAttributesOperatedResult" target='_blank'>ZIMGroupAttributesOperatedResult</a>,
  'iOS,mac,window,U3d': <a href="@ZIMGroupAttributesOperatedCallback" target='_blank'>ZIMGroupAttributesOperatedCallback</a>,
}
export const onGroupAttributesUpdatedMap = {
  'Android': <a href="@onGroupAttributesUpdated" target='_blank'>onGroupAttributesUpdated</a>,
  'Web': <a href="@groupAttributesUpdated" target='_blank'>groupAttributesUpdated</a>,
  'UTS': <a href="@groupAttributesUpdated" target='_blank'>onGroupAttributesUpdated</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMEventHandler/onGroupAttributesUpdated.html" target='_blank'>onGroupAttributesUpdated</a>,
  'iOS': <a href="https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_ios~protocol~ZIMEventHandler#zim-group-attributes-updated-operated-info-group-id" target='_blank'>groupAttributesUpdated</a>,
  'mac': <a href="https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_macos~protocol~ZIMEventHandler#zim-group-attributes-updated-operated-info-group-id" target='_blank'>groupAttributesUpdated</a>,
}
export const deleteGroupAttributesMap = {
  'Android': <a href="@deleteGroupAttributes" target='_blank'>deleteGroupAttributes</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/deleteGroupAttributes.html" target='_blank'>deleteGroupAttributes</a>,
  'iOS,mac': <a href="@deleteGroupAttributesByKeys" target='_blank'>deleteGroupAttributesByKeys</a>,
}
export const queryGroupAttributesMap = {
  'Android': <a href="@queryGroupAttributes" target='_blank'>queryGroupAttributes</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/queryGroupAttributes.html" target='_blank'>queryGroupAttributes</a>,
  'iOS,mac': <a href="@queryGroupAttributesByKeys" target='_blank'>queryGroupAttributesByKeys</a>,
}
export const queryGroupAllAttributesMap = {
  'Android': <a href="@queryGroupAllAttributes" target='_blank'>queryGroupAllAttributes</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/queryGroupAllAttributes.html" target='_blank'>queryGroupAllAttributes</a>,
  'iOS,mac': <a href="@queryGroupAllAttributesByGroupID" target='_blank'>queryGroupAllAttributesByGroupID</a>,
}
export const ZIMGroupAttributesQueriedCallbackMap = {
  'Android': <a href="@-ZIMGroupAttributesQueriedCallback" target='_blank'>ZIMGroupAttributesQueriedCallback</a>,
  'U3d,window': <a href="@ZIMGroupAttributesQueriedCallback" target='_blank'>ZIMGroupAttributesQueriedCallback</a>,
  'Web,UTS': <a href="@-ZIMGroupAttributesQueriedResult" target='_blank'>ZIMGroupAttributesQueriedResult</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMGroupAttributesQueriedResult-class.html" target='_blank'>ZIMGroupAttributesQueriedResult</a>,
  'iOS,mac': <a href="@ZIMGroupAttributesQueriedCallback" target='_blank'>ZIMGroupAttributesQueriedCallback</a>,
}



# 群属性管理

- - -

## 功能简介
:::if{props.platform="Flutter"}
<Note title="说明">
本文档适用于开发以下平台的应用：iOS、Android、macOS、Windows、Web。
</Note>
:::
:::if{props.platform="U3d"}
<Note title="说明">
本文档适用于开发以下平台的应用：iOS、Android、macOS、Windows。
</Note>
:::

ZIM SDK 提供了群属性管理功能，支持在指定群组中，设置自定义属性的能力。开发者可以在群组自定义字段管理，比如群组简介、群组状态等。


## 实现流程

<Warning title="注意">

- 用户使用“群属性管理”功能之前，请先加入某个群组，否则无法使用相关功能，详情请参考 [加入群组](/zim-flutter/guides/group/manage-groups#加入群组)。
- 群内成员（包含群主）都可以使用“群属性管理”功能。
</Warning>

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/ZIM/Common/GroupAttributes.png" /></Frame>


### 设置群属性

用户登录、并加入某个群组后，如果想要给自己所在群组设置一些属性，可以通过调用 {getPlatformData(props,setGroupAttributesMap)} 接口，设置群属性。

每个群组中，设置的属性以 `Key-Value` 的形式存储。

- 当 Key 不存在时，设置群属性表示增加属性。
- 当 key 已经存在时，设置群属性表示更新已有属性的取值。
- 当调用接口但不传入任何 `Key-Value` 时，设置群属性操作没有任何作用。


<Warning title="注意">

- 每个群组中，最多允许设置 10 个属性，以 `Key-Value` 的方式进行存储。开发者如果需要提高属性上限，请联系 ZEGO 技术支持。
- 群组解散后，设置的自定义属性也会同时销毁。
</Warning>

设置成功后：
- 修改者：可以通过 {getPlatformData(props,ZIMGroupAttributesOperatedCallbackMap)} 回调与 {getPlatformData(props,onGroupAttributesUpdatedMap)} 事件通知获取群属性设置结果。
- 群内其他在线用户：通过 {getPlatformData(props,onGroupAttributesUpdatedMap)} 事件通知获取群属性设置结果。

:::if{props.platform=undefined}
<CodeGroup>
```java title="示例代码"
// 群内成员 设置群组的属性
HashMap<String, String> attributes = new HashMap<>();
attributes.put("2", "0");
attributes.put("3", "0");
attributes.put("4", "0");

zim.setGroupAttributes(attributes, group_id, new ZIMGroupAttributesOperatedCallback() {
    @Override
    public void onGroupAttributesOperated(ArrayList<String> errorKeys, ZIMError errorInfo) {
        // 通过 errorInfo.code 获取设置群组属性的结果   
    }
});
```
</CodeGroup>
:::
:::if{props.platform="iOS|mac"}
<CodeGroup>
```objc title="示例代码"
// 群内成员 设置群组的属性
[zim setGroupAttributes:newAttributes groupID:groupID callback:^(NSString * _Nonnull groupID, NSArray<NSString *> * _Nonnull errorKeys, ZIMError * _Nonnull errorInfo) {
    //这里写调用设置群组属性的接口后的业务代码
}];
```
</CodeGroup>
:::
:::if{props.platform="Web"}
<CodeGroup>
```typescript title="示例代码"
// 群内成员 设置群组的属性
const groupID = '';
const groupAttributes = { key1: 'value1', key2: 'value2' };

zim.setGroupAttributes(groupAttributes, groupID)
    .then((res: ZIMGroupAttributesOperatedResult) => {
        // 操作成功
    })
    .catch((err: ZIMError) => {
        // 操作失败
    });

// 设置 groupAttributesUpdated 回调
zim.on('groupAttributesUpdated', (zim, data) => {
    console.log('groupAttributesUpdated', data);
});
```
</CodeGroup>
:::
:::if{props.platform="UTS"}
<CodeGroup>
```typescript title="示例代码"
// 群内成员 设置群组的属性
const groupID = '';
const groupAttributes = { key1: 'value1', key2: 'value2' };

zim.setGroupAttributes(groupAttributes, groupID)
    .then((res: ZIMGroupAttributesOperatedResult) => {
        // 操作成功
    })
    .catch((err: ZIMError) => {
        // 操作失败
    });

// 设置 onGroupAttributesUpdated 回调
zim.onGroupAttributesUpdated((data) => {
    console.log('groupAttributesUpdated', data);
});
```
</CodeGroup>
:::
:::if{props.platform="window"}
<CodeGroup>
```Cpp title="示例代码"
// 群内成员 设置群组的属性
std::unordered_map<std::string, std::string> attributes;
attributes.emplace("2", "0");
attributes.emplace("3", "0");
attributes.emplace("4", "0");

zim_->setGroupAttributes(attributes, group_id, 
    [=] (const std::string &groupID, std::vector<std::string> &errorKeys, ZIMError errorInfo){
        int error_code = errorInfo.code;
    });
```
</CodeGroup>
:::
:::if{props.platform="Flutter"}
<CodeGroup>
```dart title="示例代码"
// 群内成员 设置群组的属性
Map<String, String> groupAttributes = {'key': 'value'};
ZIM
    .getInstance()
    .setGroupAttributes(groupAttributes, 'groupID')
    .then((value) => {
        //成功触发此处
    })
    .catchError((onError) {
        //失败触发此处
    });
```

</CodeGroup>
:::
:::if{props.platform="U3d"}
<CodeGroup>
```cs title="示例代码"
// 群内成员 设置群组的属性
Dictionary<string, string> attributes = new Dictionary<string, string>();
attributes.Add("2", "0");
attributes.Add("3", "0");
attributes.Add("4", "0");

ZIM.GetInstance().SetGroupAttributes(attributes, "group_id", (string groupID, List<string> errorKeys,
    ZIMError errorInfo) =>
    {
        // 通过 errorInfo.code 获取设置群组属性的结果   
    }
);
```
</CodeGroup>
:::

### 删除群属性

用户登录、并加入某个群组后，如果需要删除自己所在群组的某个属性，可以通过调用 {getPlatformData(props,deleteGroupAttributesMap)} 接口，删除群属性。

删除成功后，用户可以通过 {getPlatformData(props,ZIMGroupAttributesOperatedCallbackMap)} 收到通知。

:::if{props.platform=undefined}
<CodeGroup>
```java title="示例代码"
// 群内成员 删除群组的属性
ArrayList<String> keys = new ArrayList<>();
keys.add("key_0");
keys.add("key_1");
keys.add("key_2");
zim.deleteGroupAttributes(keys, group_id, new ZIMGroupAttributesOperatedCallback() {
    @Override
    public void onGroupAttributesOperated(ArrayList<String> errorKeys, ZIMError errorInfo) {
        // 通过 errorInfo.code 获取删除群组属性的结果    
    }
});
```
</CodeGroup>
:::
:::if{props.platform="iOS|mac"}
<CodeGroup>
```objc title="示例代码"
// 群内成员 删除群组的属性
[zim deleteGroupAttributesByKeys:deleteAttributesKeys groupID:groupID callback:^(NSString * _Nonnull groupID, NSArray<NSString *> * _Nonnull errorKeys, ZIMError * _Nonnull errorInfo) {
    //这里写调用删除群组属性的接口后的业务代码
}];
```
</CodeGroup>
:::
:::if{props.platform="Web"}
<CodeGroup>
```typescript title="示例代码"
// 群内成员 删除群组的属性
const groupID = '';
const keys = ['key1'];

zim.deleteGroupAttributes(keys, groupID)
    .then((res: ZIMGroupAttributesOperatedResult) => {
        // 操作成功
    })
    .catch((err: ZIMError) => {
        // 操作失败
    });

// 设置 groupAttributesUpdated 回调
zim.on('groupAttributesUpdated', (zim, data) => {
    console.log('groupAttributesUpdated', data);
});
```
</CodeGroup>
:::
:::if{props.platform="UTS"}
<CodeGroup>
```typescript title="示例代码"
// 群内成员 删除群组的属性
const groupID = '';
const keys = ['key1'];

zim.deleteGroupAttributes(keys, groupID)
    .then((res: ZIMGroupAttributesOperatedResult) => {
        // 操作成功
    })
    .catch((err: ZIMError) => {
        // 操作失败
    });

// 设置 onGroupAttributesUpdated 回调
zim.onGroupAttributesUpdated((data) => {
    console.log('groupAttributesUpdated', data);
});
```
</CodeGroup>
:::
:::if{props.platform="window"}
<CodeGroup>
```cpp title="示例代码"
// 群内成员 删除群组的属性
std::vector<std::string> keys;
keys.push_back("key_0");
keys.push_back("key_1");
keys.push_back("key_2");
zim_->deleteGroupAttributes(keys, group_id, 
    [=] (const std::string &groupID, std::vector<std::string> &errorKeys, ZIMError errorInfo){
        int error_code = errorInfo.code;
    });
```
</CodeGroup>
:::
:::if{props.platform="Flutter"}
<CodeGroup>
```dart title="示例代码"
// 群内成员 删除群组的属性
List<String> keys = ['key1', 'key2'];
ZIM
    .getInstance()
    .deleteGroupAttributes(keys, 'groupID')
    .then((value) => {
        //成功触发此处
    })
    .catchError((onError) {
        //失败触发此处
    });
```
</CodeGroup>
:::
:::if{props.platform="U3d"}
<CodeGroup>
```cs title="示例代码"
// 群内成员 删除群组的属性
List<string> keys = new List<string>();
keys.Add("key_0");
keys.Add("key_1");
keys.Add("key_2");

ZIM.GetInstance().DeleteGroupAttributes(keys, "group_id", (string groupID, List<string> errorKeys,
    ZIMError errorInfo) =>
    {
        // 通过 errorInfo.code 获取删除群组属性的结果    
    }
);
```
</CodeGroup>
:::


### 查询群属性

用户登录、并加入某个群组后，如果需要查询自己所在群组的某个属性，可以通过调用 {getPlatformData(props,queryGroupAttributesMap)} 接口，查询群属性。

查询成功后，用户可以通过 {getPlatformData(props,ZIMGroupAttributesQueriedCallbackMap)} 收到通知。

:::if{props.platform=undefined}
<CodeGroup>
```java title="示例代码"
// 群内成员 查询群组属性
ArrayList<String> keys = new ArrayList<>();
keys.add("0");
keys.add("1");
keys.add("2");
keys.add("3");
keys.add("4");
keys.add("5");
zim.queryGroupAttributes(keys, group_id, new ZIMGroupAttributesQueriedCallback() {
    @Override
    public void onGroupAttributesQueried(HashMap<String, String> groupAttributes, ZIMError errorInfo) {
        // 通过 errorInfo.code 获取查询群属性的结果
    }
});
```
</CodeGroup>
:::
:::if{props.platform="iOS|mac"}
<CodeGroup>
```objc title="示例代码"
// 群内成员 查询群组属性
[zim queryGroupAttributesByKeys:attributesKeys groupID:groupID callback:^(NSString * _Nonnull groupID, NSDictionary<NSString *,NSString *> * _Nonnull groupAttributes, ZIMError * _Nonnull errorInfo) {
    //这里写调用查询群组属性的接口后的业务代码
}];
```
</CodeGroup>
:::
:::if{props.platform="Web|UTS"}
<CodeGroup>
```typescript title="示例代码"
// 群内成员 查询群组属性
const groupID = '';
const keys = ['key1'];
zim.queryGroupAttributes(keys, groupID)
    .then((res: ZIMGroupAttributesQueriedResult) => {
        // 查询成功
    })
    .catch((err: ZIMError) => {
        // 查询失败
    });
```
</CodeGroup>
:::
:::if{props.platform="window"}
<CodeGroup>
```cpp title="示例代码"
// 群内成员 查询群组属性
std::vector<std::string> keys;
keys.push_back("0");
keys.push_back("1");
keys.push_back("2");
keys.push_back("3");
keys.push_back("4");
keys.push_back("5");
zim_->queryGroupAttributes(keys, group_id, 
    [=](/zim-flutter/guides/group/const-std::string-&groupid,-std::unordered_map<std::string,-std::string>-&groupattributes,-zim::zimerror-errorinfo){
        int error_code = errorInfo.code;
    });
```

</CodeGroup>
:::
:::if{props.platform="Flutter"}
<CodeGroup>
```dart title="示例代码"
// 群内成员 查询群组属性
ZIM
    .getInstance()
    .queryGroupAttributes(keys, 'groupID')
    .then((value) => {
        //成功触发此处
    })
    .catchError((onError) {
        //失败触发此处
    });
```
</CodeGroup>
:::
:::if{props.platform="U3d"}
<CodeGroup>
```cs title="示例代码"
// 群内成员 查询群组属性
List<string> keys = new List<string>();
keys.Add("0");
keys.Add("1");
keys.Add("2");
keys.Add("3");
keys.Add("4");
keys.Add("5");
        
ZIM.GetInstance().QueryGroupAttributes(keys, "group_id", (string groupID, Dictionary<string, string> groupAttributes,
    ZIMError errorInfo) =>
    {
        // 通过 errorInfo.code 获取查询群属性的结果
    }
);
```
</CodeGroup>
:::

### 查询群的所有属性

用户登录、并加入某个群组后，如果需要查询自己所在群组的全部属性，可以通过调用 {getPlatformData(props,queryGroupAllAttributesMap)} 接口，查询群的所有属性。

查询成功后，用户可以通过 {getPlatformData(props,ZIMGroupAttributesQueriedCallbackMap)} 收到通知。

:::if{props.platform=undefined}
<CodeGroup>
```java title="示例代码"
// 群内成员 查询群组的所有属性
zim.queryGroupAttributes(group_id, new ZIMGroupAttributesQueriedCallback() {
    @Override
    public void onGroupAttributesQueried(HashMap<String, String> groupAttributes, ZIMError errorInfo) {
        // 通过 errorInfo.code 获取查询群属性的结果
    }
});
```
</CodeGroup>
:::
:::if{props.platform="iOS|mac"}
<CodeGroup>
```objc title="示例代码"
// 群内成员 查询群组的所有属性
[zim queryGroupAllAttributes:groupID callback:^(NSString * _Nonnull groupID, NSDictionary<NSString *,NSString *> * _Nonnull groupAttributes, ZIMError * _Nonnull errorInfo) {
    //这里写调用查询所有群组属性的接口后的业务代码
}];
```
</CodeGroup>
:::
:::if{props.platform="Web|UTS"}
<CodeGroup>
```typescript title="示例代码"
// 群内成员 查询群组的所有属性
const groupID = '';
zim.queryGroupAllAttributes(groupID)
    .then((res: ZIMGroupAttributesQueriedResult) => {
        // 查询成功
    })
    .catch((err: ZIMError) => {
        // 查询失败
    });
```

</CodeGroup>
:::
:::if{props.platform="window"}
<CodeGroup>
```cpp title="示例代码"
// 群内成员 查询群组的所有属性
zim_->queryGroupAllAttributes(group_id, 
    [=](/zim-flutter/guides/group/const-std::string-&groupid,-std::unordered_map<std::string,-std::string>-&groupattributes,-zim::zimerror-errorinfo){
        int error_code = errorInfo.code;
    });
```
</CodeGroup>
:::
:::if{props.platform="Flutter"}
<CodeGroup>
```dart title="示例代码"
// 群内成员 查询群组的所有属性
ZIM
    .getInstance()
    .queryGroupAllAttributes('groupID')
    .then((value) => {
        //成功触发此处
    })
    .catchError((onError) {
        //失败触发此处
    });
```
</CodeGroup>
:::
:::if{props.platform="U3d"}
<CodeGroup>
```cs title="示例代码"
// 群内成员 查询群组的所有属性
ZIM.GetInstance().QueryGroupAllAttributes("group_id", (string groupID, Dictionary<string, string> groupAttributes,
    ZIMError errorInfo) =>
    {
        // 通过 errorInfo.code 获取查询群属性的结果
    }
);
```
</CodeGroup>
:::
<Content  platform = "Flutter" />