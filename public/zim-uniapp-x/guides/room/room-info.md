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

export const queryRoomMemberListMap = {
  'Android': <a href="@queryRoomMemberList" target='_blank'>queryRoomMemberList</a>,
  'iOS': <a href="@queryRoomMemberListByRoomID" target='_blank'>queryRoomMemberListByRoomID</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/queryRoomMemberList.html" target='_blank'>queryRoomMemberList</a>,
}
export const onRoomMemberQueriedMap = {
  'Android': <a href="@onRoomMemberQueried" target='_blank'>onRoomMemberQueried</a>,
}
export const ZIMRoomMemberQueriedCallbackMap = {
  'Android': <a href="@-ZIMRoomMemberQueriedCallback" target='_blank'>ZIMRoomMemberQueriedCallback</a>,
}
export const ZIMRoomMemberQueryConfigMap = {
  'Android': <a href="@-ZIMRoomMemberQueryConfig" target='_blank'>ZIMRoomMemberQueryConfig</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMRoomMemberQueryConfig-class.html" target='_blank'>ZIMRoomMemberQueryConfig</a>,
}
export const queryRoomOnlineMemberCountMap = {
  'Android': <a href="@queryRoomOnlineMemberCount" target='_blank'>queryRoomOnlineMemberCount</a>,
  'iOS': <a href="@queryRoomOnlineMemberCountByRoomID" target='_blank'>queryRoomOnlineMemberCountByRoomID</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/queryRoomOnlineMemberCount.html" target='_blank'>queryRoomOnlineMemberCount</a>,
}
export const logoutMap = {
  'Android': <a href="@logout" target='_blank'>logout</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/logout.html" target='_blank'>logout</a>,
}
export const typeMap = {
  'Android': "int",
  'Web,UTS': "number",
}

# 房间资料管理

- - -

## 功能简介

ZIM SDK 提供了房间信息查询功能，比如获取房间成员列表、查询在线人数等。


## 实现流程

<Note title="说明">

用户只有在所查询的房间内，才可以使用以下房间功能。  
</Note>

### 查询房间成员列表

:::if{props.platform=undefined}
如果用户加入房间后，想要了解此房间的成员构成，可以调用 {getPlatformData(props,queryRoomMemberListMap)} 接口，传入参数 roomID，config，然后通过 [ZIMRoomMemberQueriedCallback](https://doc-zh.zego.im/) 中的 [onRoomMemberQueried](https://doc-zh.zego.im/) 回调接口，返回房间内成员列表。
:::
:::if{props.platform="U3d"}
如果用户加入房间后，想要了解此房间的成员构成，可以调用 [QueryRoomMemberList](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_uni-app~class~ZIM#query-room-member-list) 接口，传入参数 roomID，config，然后通过 [ZIMRoomMemberQueriedCallback](https://doc-zh.zego.im/) 回调接口，返回房间内成员列表。
:::
:::if{props.platform="Web|UTS"}
如果用户加入房间后，想要了解此房间的成员构成，可以调用 {getPlatformData(props,queryRoomMemberListMap)} 接口，传入参数 roomID，config，然后通过 [ZIMRoomMemberQueriedResult](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_uni-app~interface~ZIMRoomMemberQueriedResult) 回调接口，返回房间内成员列表。
:::
:::if{props.platform="iOS|Flutter|window"}
如果用户加入房间后，想要了解此房间的成员构成，可以调用 {getPlatformData(props,queryRoomMemberListMap)} 接口，传入参数 roomID，config，即可获取到房间内成员列表。
:::

其中，参数 config 表示查询房间成员操作的配置，需要通过 {getPlatformData(props,ZIMRoomMemberQueryConfigMap)} 类的以下参数进行配置：

| 参数 | 参数类型 | 是否必填 | 描述 |
| ------- | ---- | ---- | ---- |
| nextFlag |  string | 是 |<p>分页查询的标识位。首次查询时，请将此字段设为空字符串。</p><p>若回调的 "nextFlag" 字段不是空字符串，说明还未查询完所有用户，此时需要将其设置为当前位置，以继续下一页的查询。</p>|
| count | {getPlatformData(props,typeMap)} | 是 | <p>查询一次，可获取的成员数量。</p><p>注意事项：分页获取消息以降低开销，建议单次获取 100 个成员以内。</p>|

<Note title="说明">

当房间成员超过 500 人时，查询房间成员列表的结果最多只能包含 500 名成员的信息。如需提高查询结果上限，请联系 ZEGO 技术支持进行配置。 
</Note>

:::if{props.platform=undefined}
```java  
ZIMRoomMemberQueryConfig zimQueryMemberConfig = new ZIMRoomMemberQueryConfig();
zimQueryMemberConfig.count = 100;
zim.queryRoomMemberList(roomID, zimQueryMemberConfig, new ZIMRoomMemberQueriedCallback() {
    @Override
    public void onRoomMemberQueried(String roomID, ArrayList<ZIMUserInfo> memberList, String nextFlag, ZIMError errorInfo) {

    }
});
```
:::
:::if{props.platform="Flutter"}
```dart  
ZIMRoomMemberQueryConfig roomMemberQueryConfig = ZIMRoomMemberQueryConfig();
roomMemberQueryConfig.count = 100;
ZIM
    .getInstance()
    .queryRoomMemberList('roomID', roomMemberQueryConfig)
    .then((value) {
      //value 是 ZIMRoomMemberQueriedResult 对象。
      //当操作成功时，将触发此操作。
    })
    .catchError((onError) {
      //当操作失败时，将触发此操作。
    });
```
:::
:::if{props.platform="iOS"}
```objc  
ZIMRoomMemberQueryConfig *config = [[ZIMRoomMemberQueryConfig alloc] init];
config.nextFlag = @"";
config.count = 1;//1 表示每次获取一个成员。
[zim queryRoomMemberListByRoomID:RoomID config:config callback:^(NSArray<ZIMUserInfo * > * _Nonnull memberList, NSString * _Nonnull nextFlag, ZIMError * _Nonnull errorInfo) {
    //在这里实现获取房间成员列表的事件回调。
}];
```
:::
:::if{props.platform="window"}
```cpp 
ZIMRoomMemberQueryConfig config;
config.count = count;
config.nextFlag = string_flag;

zim_->queryRoomMemberList(string_room_id, config, [=](/zim-uniapp-x/guides/room/const-std::vector<zimuserinfo>&-member_list,-const-std::string&-next_flag,-zim::zimerror-error_info) {
    if (error_info.code != 0)
    {
        ShowMsg(L"获取房间成员列表失败，房间ID：%s", string_room_id);
    }
    else
    {
        CString string_user_list;
        for (auto& member : member_list)
        {
            CString string_user;
            string_user.Format(L"(%s,%s)，", member.userID, member.userName);
            string_user_list += string_user;
        }

        ShowMsg(L"获取房间成员列表成功，房间ID：%s，数量：%d，用户：%s，下一页标志：%s", string_room_id, member_list.size(), string_user_list, next_flag);
    }
});
```
:::
:::if{props.platform="U3d"}
```cs  
ZIMRoomMemberQueryConfig zimQueryMemberConfig = new ZIMRoomMemberQueryConfig();
zimQueryMemberConfig.count = 100;
ZIM.GetInstance().QueryRoomMemberList("roomID", zimQueryMemberConfig, (string roomID, List<ZIMUserInfo> memberList, string nextFlag, ZIMError errorInfo) =>
    {
                    
    }
);
```
:::
:::if{props.platform="Web|UTS"}
```typescript  
const roomID = '';
const config: ZIMRoomMemberQueryConfig = { count: 10, nextFlag: '' };

zim.queryRoomMemberList(roomID, config)
    .then((res: ZIMRoomMemberQueriedResult) => {
        // 查询成功。
    })
    .catch((err: ZIMError) => {
        // 查询失败。
    });
```
:::


### 查询房间在线人数

用户还可以获取到房间内的在线人数，调用 {getPlatformData(props,queryRoomOnlineMemberCountMap)} 接口，输入 roomID，即可查询到房间内的在线人数。

:::if{props.platform=undefined}
```java  
// 查询房间在线人数
zim.queryRoomOnlineMemberCount(roomID, new ZIMRoomOnlineMemberCountQueriedCallback() {
    @Override
    public void onRoomOnlineMemberCountQueried(String roomID, int count, ZIMError errorInfo) {

    }
});
```
:::
:::if{props.platform="Flutter"}
```dart  
// 获取在线房间成员数量
ZIM
    .getInstance()
    .queryRoomOnlineMemberCount('roomID')
    .then((value) {
        // 当操作成功时触发此处代码
    })
    .catchError((onError) {
        // 当操作失败时触发此处代码
    });
```
:::
:::if{props.platform="iOS"}
```objc
[zim queryRoomOnlineMemberCountByRoomID:< #(nonnull NSString *) #> callback:^(NSString * _Nonnull roomID, unsigned int count, ZIMError * _Nonnull errorInfo) {
        //实现查询在线房间成员的事件回调。
}];
```
:::
:::if{props.platform="window"}
```cpp
zim_->queryRoomOnlineMemberCount(string_room_id, [=](/zim-uniapp-x/guides/room/unsigned-int-count,-zim::zimerror-error_info) {
    if (error_info.code != 0)
    {
        ShowMsg(L"查询在线房间成员数量失败，房间ID：%s", string_room_id);
    }
    else
    {
        ShowMsg(L"查询在线房间成员数量成功，房间ID：%s", string_room_id);
    }
});
```
:::
:::if{props.platform="U3d"}
```cs
// 获取在线房间成员数量
ZIM.GetInstance().QueryRoomOnlineMemberCount("房间ID", (string roomID, uint count, ZIMError errorInfo) =>
    {

    }
);
```
:::
:::if{props.platform="Web|UTS"}
```typescript  
const roomID = '';

zim.queryRoomOnlineMemberCount(roomID)
    .then((res: ZIMRoomOnlineMemberCountQueriedResult) => {
        // 查询成功。
    })
    .catch((err: ZIMError) => {
        // 查询失败。
    });
```
:::

<Note title="说明">
加入到房间后，如果调用了 {getPlatformData(props,logoutMap)} 接口退出登录，该客户端即处于离线状态。
</Note>
<Content platform="UTS" />