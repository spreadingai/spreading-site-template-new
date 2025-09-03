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

export const queryGroupMemberListMap = {
  'Android': <a href="@queryGroupMemberList" target='_blank'>queryGroupMemberList</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/queryGroupMemberList.html" target='_blank'>queryGroupMemberList</a>,
  'iOS,mac': <a href="@queryGroupMemberListByGroupID" target='_blank'>queryGroupMemberListByGroupID</a>,
}
export const ZIMGroupMemberListQueriedCallbackMap = {
  'Android': <a href="@-ZIMGroupMemberListQueriedCallback" target='_blank'>ZIMGroupMemberListQueriedCallback</a>,
  'U3d': <a href="@ZIMGroupMemberListQueriedCallback" target='_blank'>ZIMGroupMemberListQueriedCallback</a>,
  'Web,UTS': <a href="@-ZIMGroupMemberListQueriedResult" target='_blank'>ZIMGroupMemberListQueriedResult</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMGroupMemberListQueriedResult-class.html" target='_blank'>ZIMGroupMemberListQueriedResult</a>,
  'iOS,mac,window': <a href="@ZIMGroupMemberListQueriedCallback" target='_blank'>ZIMGroupMemberListQueriedCallback</a>,
}
export const queryGroupMemberInfoMap = {
  'Android': <a href="@queryGroupMemberInfo" target='_blank'>queryGroupMemberInfo</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/queryGroupMemberInfo.html" target='_blank'>queryGroupMemberInfo</a>,
  'iOS': <a href="https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_ios~protocol~ZIM#query-group-member-info-by-user-id-group-id-callback" target='_blank'>queryGroupMemberInfoByGroupID</a>,
  'mac': <a href="https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_macos~protocol~ZIM#query-group-member-info-by-user-id-group-id-callback" target='_blank'>queryGroupMemberInfoByGroupID</a>,
}
export const ZIMGroupMemberInfoQueriedCallbackMap = {
  'Android': <a href="@-ZIMGroupMemberInfoQueriedCallback" target='_blank'>ZIMGroupMemberInfoQueriedCallback</a>,
  'U3d': <a href="@ZIMGroupMemberInfoQueriedCallback" target='_blank'>ZIMGroupMemberInfoQueriedCallback</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMGroupMemberInfoQueriedResult-class.html" target='_blank'>ZIMGroupMemberInfoQueriedResult</a>,
  'Web,UTS': <a href="@-ZIMGroupMemberInfoQueriedResult" target='_blank'>ZIMGroupMemberInfoQueriedResult</a>,
  'iOS,mac,window': <a href="@ZIMGroupMemberInfoQueriedCallback" target='_blank'>ZIMGroupMemberInfoQueriedCallback</a>,
}
export const setGroupMemberNicknameMap = {
  'Android': <a href="@setGroupMemberNickname" target='_blank'>setGroupMemberNickname</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/setGroupMemberNickname.html" target='_blank'>setGroupMemberNickname</a>,
}
export const ZIMGroupMemberNicknameUpdatedCallbackMap = {
  'Android': <a href="@-ZIMGroupMemberNicknameUpdatedCallback" target='_blank'>ZIMGroupMemberNicknameUpdatedCallback</a>,
  'U3d': <a href="@ZIMGroupMemberNicknameUpdatedCallback" target='_blank'>ZIMGroupMemberNicknameUpdatedCallback</a>,
  'Web,UTS': <a href="@-ZIMGroupMemberNicknameUpdatedResult" target='_blank'>ZIMGroupMemberNicknameUpdatedResult</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMGroupMemberNicknameUpdatedResult-class.html" target='_blank'>ZIMGroupMemberNicknameUpdatedResult</a>,
  'iOS,mac,window': <a href="@ZIMGroupMemberNicknameUpdatedCallback" target='_blank'>ZIMGroupMemberNicknameUpdatedCallback</a>,
}
export const setGroupMemberRoleMap = {
  'Android': <a href="@setGroupMemberRole" target='_blank'>setGroupMemberRole</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/setGroupMemberRole.html" target='_blank'>setGroupMemberRole</a>,
}
export const ZIMGroupMemberRoleUpdatedCallbackMap = {
  'Android': <a href="@-ZIMGroupMemberRoleUpdatedCallback" target='_blank'>ZIMGroupMemberRoleUpdatedCallback</a>,
  'U3d': <a href="@ZIMGroupMemberRoleUpdatedCallback" target='_blank'>ZIMGroupMemberRoleUpdatedCallback</a>,
  'Web,UTS': <a href="@-ZIMGroupMemberRoleUpdatedResult" target='_blank'>ZIMGroupMemberRoleUpdatedResult</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMGroupMemberRoleUpdatedResult-class.html" target='_blank'>ZIMGroupMemberRoleUpdatedResult</a>,
  'iOS,mac,window': <a href="@ZIMGroupMemberRoleUpdatedCallback" target='_blank'>ZIMGroupMemberRoleUpdatedCallback</a>,
}
export const onGroupMemberInfoUpdatedMap = {
  'Android': <a href="@onGroupMemberInfoUpdated" target='_blank'>onGroupMemberInfoUpdated</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMEventHandler/onGroupMemberInfoUpdated.html" target='_blank'>onGroupMemberInfoUpdated</a>,
  'Web': <a href="@groupMemberInfoUpdated" target='_blank'>groupMemberInfoUpdated</a>,
  'UTS': <a href="@groupMemberInfoUpdated" target='_blank'>onGroupMemberInfoUpdated</a>,
  'iOS': <a href="https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_ios~protocol~ZIMEventHandler#zim-group-member-info-updated-operated-info-group-id" target='_blank'>groupMemberInfoUpdated</a>,
  'mac': <a href="https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_macos~protocol~ZIMEventHandler#zim-group-member-info-updated-operated-info-group-id" target='_blank'>groupMemberInfoUpdated</a>,
}
export const transferGroupOwnerMap = {
  'Android': <a href="@transferGroupOwner" target='_blank'>transferGroupOwner</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/transferGroupOwner.html" target='_blank'>transferGroupOwner</a>,
  'iOS,mac': <a href="@transferGroupOwnerToUserID" target='_blank'>transferGroupOwnerToUserID</a>,
}
export const queryGroupMemberCountMap = {
  'Android': <a href="@queryGroupMemberCount" target='_blank'>queryGroupMemberCount</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/queryGroupMemberCount.html" target='_blank'>queryGroupMemberCount</a>,
  'iOS,mac': <a href="@queryGroupMemberCountByGroupID" target='_blank'>queryGroupMemberCountByGroupID</a>,
}
export const ZIMGroupMemberCountQueriedCallbackMap = {
  'Android': <a href="@-ZIMGroupMemberCountQueriedCallback" target='_blank'>ZIMGroupMemberCountQueriedCallback</a>,
  'U3d': <a href="@ZIMGroupMemberCountQueriedCallback" target='_blank'>ZIMGroupMemberCountQueriedCallback</a>,
  'Web,UTS': <a href="@-ZIMGroupMemberCountQueriedResult" target='_blank'>ZIMGroupMemberCountQueriedResult</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMGroupMemberCountQueriedResult-class.html" target='_blank'>ZIMGroupMemberCountQueriedResult</a>,
  'iOS,mac,window': <a href="@ZIMGroupMemberCountQueriedCallback" target='_blank'>ZIMGroupMemberCountQueriedCallback</a>,
}
export const searchLocalGroupMembersMap = {
  'Android': <a href="@searchLocalGroupMembers" target='_blank'>searchLocalGroupMembers</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/searchLocalGroupMembers.html" target='_blank'>searchLocalGroupMembers</a>,
  'iOS,mac': <a href="@searchLocalGroupMembersByGroupID" target='_blank'>searchLocalGroupMembersByGroupID</a>,
}
export const ZIMGroupMembersSearchedCallbackMap = {
  'Android': <a href="@-ZIMGroupMembersSearchedCallback" target='_blank'>ZIMGroupMembersSearchedCallback</a>,
  'U3d': <a href="@ZIMGroupMembersSearchedCallback" target='_blank'>ZIMGroupMembersSearchedCallback</a>,
  'Web,UTS': <a href="@-ZIMGroupMembersSearchedResult" target='_blank'>ZIMGroupMembersSearchedResult</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMGroupMembersSearchedResult-class.html" target='_blank'>ZIMGroupMembersSearchedResult</a>,
  'iOS,mac,window': <a href="@ZIMGroupMembersSearchedCallback" target='_blank'>ZIMGroupMembersSearchedCallback</a>,
}
export const muteGroupMembersMap = {
  'Android': <a href="@muteGroupMembers" target='_blank'>muteGroupMembers</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/muteGroupMembers.html" target='_blank'>muteGroupMembers</a>,
}
export const ZIMGroupMembersMutedCallbackMap = {
  'Android': <a href="@-ZIMGroupMembersMutedCallback" target='_blank'>ZIMGroupMembersMutedCallback</a>,
  'U3d': <a href="@ZIMGroupMembersMutedCallback" target='_blank'>ZIMGroupMembersMutedCallback</a>,
  'Web,UTS': <a href="@-ZIMGroupMembersMutedResult" target='_blank'>ZIMGroupMembersMutedResult</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMGroupMembersMutedResult-class.html" target='_blank'>ZIMGroupMembersMutedResult</a>,
  'iOS,mac,window': <a href="@ZIMGroupMembersMutedCallback" target='_blank'>ZIMGroupMembersMutedCallback</a>,
}
export const queryGroupMemberMutedListMap = {
  'Android': <a href="@queryGroupMemberMutedList" target='_blank'>queryGroupMemberMutedList</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/queryGroupMemberMutedList.html" target='_blank'>queryGroupMemberMutedList</a>,
  'iOS,mac': <a href="@queryGroupMemberMutedListByGroupID" target='_blank'>queryGroupMemberMutedListByGroupID</a>,
}
export const ZIMGroupMemberMutedListQueriedCallbackMap = {
  'Android': <a href="@-ZIMGroupMemberMutedListQueriedCallback" target='_blank'>ZIMGroupMemberMutedListQueriedCallback</a>,
  'U3d': <a href="@ZIMGroupMemberMutedListQueriedCallback" target='_blank'>ZIMGroupMemberMutedListQueriedCallback</a>,
  'Web,UTS': <a href="@-ZIMGroupMemberMutedListQueriedResult" target='_blank'>ZIMGroupMemberMutedListQueriedResult</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMGroupMemberMutedListQueriedResult-class.html" target='_blank'>ZIMGroupMemberMutedListQueriedResult</a>,
  'iOS,mac,window': <a href="@ZIMGroupMemberMutedListQueriedCallback" target='_blank'>ZIMGroupMemberMutedListQueriedCallback</a>,
}
export const mutedExpiredTimeMap = {
  'Android': <a href="/zim-web/guides/group/mutedexpiredtime-zimgroupconversation" target='_blank'>mutedExpiredTime</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMGroupConversation/mutedExpiredTime.html" target='_blank'>mutedExpiredTime</a>,
}
export const ZIMGroupConversationMap = {
  'Android': <a href="@-ZIMGroupConversation" target='_blank'>ZIMGroupConversation</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMGroupConversation-class.html " target='_blank'>ZIMGroupConversation</a>,
}



# 群成员管理

- - -

## 功能简介

:::if{props.platform="Flutter"}
<Note title="说明">

本文档适用于开发以下平台的应用：iOS、Android、macOS、Windows、Web。
</Note>

:::
:::if{props.platform="U3d"}
<Note title="说明">

本文档适用于开发以下平台应用：iOS、Android、macOS、Windows。
</Note>
:::

ZIM SDK 提供了群成员管理功能，支持查询群组成员列表、查询群组成员基本信息以及转让群主等功能。


## 实现流程

<Warning title="注意">

用户使用“群成员管理”功能之前，请先加入某个群组，否则无法使用相关功能，详情请参考 [加入群组](/zim-web/guides/group/manage-groups#加入群组)。
</Warning>

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/ZIM/Common/GroupMembers.png" /></Frame>

### 查询群成员列表

用户登录 ZIM SDK、并加入某个群组后，如果想要了解自己所在群组都有哪些成员，可以通过调用 {getPlatformData(props,queryGroupMemberListMap)} 接口，分页查询该群组的成员列表。单次调用接口最多可获取 100 名成员，传入 `count` 超过 100 按照 100 处理。

查询成功后，用户可以通过 {getPlatformData(props,ZIMGroupMemberListQueriedCallbackMap)} 收到查询结果。

<Note title="说明">

假设群组内有两名用户 A 和 B，用户 A 已获取了群成员列表。此时，用户 B 修改了用户名和头像，若再次调用 {getPlatformData(props,queryGroupMemberListMap)} 接口后，是否可以获取最新的用户 B 的群成员信息呢？

您需要根据 ZIM SDK 版本实现不同的操作：
- **SDK 版本 ≥ 2.19.0**：
    - 若 A 和 B 是好友，则直接调用该接口即可。
    - 若 A 和 B 非好友，则可以通过以下任意方式获取用户 B 的最新信息：
        - 先调用服务端接口 [查询用户 B 的用户信息](/zim-server/user/query-user-information) ，再调用该接口。
        - 先调用 SDK 接口 [查询用户 B 的群成员信息](#查询群成员信息)，再调用该接口。
- **SDK < 2.19.0**：
    - 再次调用此接口只能获取群内新成员的信息，不能获取旧成员的新信息。
    - 您需要调用接口 {getPlatformData(props,queryGroupMemberInfoMap)} [查询用户 B 的群成员信息](#查询群成员信息)。
</Note>

:::if{props.platform=undefined}
<CodeGroup>
```java title="示例代码"
// 群内成员查询群组的成员列表
ZIMGroupMemberQueryConfig config = new ZIMGroupMemberQueryConfig();
// count 超过 100 按照 100 处理
config.count = 100;
config.nextFlag = 0;
zim.queryGroupMemberList(group_id, config, new ZIMGroupMemberListQueriedCallback() {
    @Override
    public void onGroupMemberListQueried(ArrayList<ZIMGroupMemberInfo> userList, int nextFlag, ZIMError errorInfo) {
        // 通过 errorInfo.code 获取查询群组成员列表的结果
    }
});
```
</CodeGroup>
:::
:::if{props.platform="iOS|mac"}
<CodeGroup>
```objc title="示例代码"
// 群内成员查询群组的成员列表
int myNextFlag = 0;
ZIMGroupMemberQueryConfig *config = [[ZIMGroupMemberQueryConfig alloc] init];
// count 超过 100 按照 100 处理
config.count = 20;
config.nextFlag = myNextFlag;
[zim queryGroupMemberListByGroupID:groupID config:config callback:^(NSArray<ZIMGroupMemberInfo *> * _Nonnull userList, unsigned int nextFlag, ZIMError * _Nonnull errorInfo) {
    //保存群成员的锚点，用于下次分页查询
    myNextFlag = nextFlag;
    //这里写调用查询群成员接口后的业务代码
}];
```
</CodeGroup>
:::
:::if{props.platform="Flutter"}
<CodeGroup>
```dart title="示例代码"
// 群内成员查询群组的成员列表
ZIMGroupMemberQueryConfig groupMemberQueryConfig =
      ZIMGroupMemberQueryConfig();
// count 超过 100 按照 100 处理
groupMemberQueryConfig.count = 100;

ZIM.getInstance()
  !.queryGroupMemberList('groupID', groupMemberQueryConfig)
   .then((value) {
       //成功触发此处
   })
   .catchError((onError) {
       //失败触发此处
   });
```
</CodeGroup>
:::
:::if{props.platform="Web|UTS"}
<CodeGroup>
```typescript title="示例代码"
// 群内成员查询群组的成员列表
const groupID = '';
// count 超过 100 按 100 处理
const config: ZIMGroupMemberQueryConfig = { count: 10, nextFlag: 0 };

zim.queryGroupMemberList(groupID, config)
    .then((res: ZIMGroupMemberListQueriedResult) => {
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
```Cpp title="示例代码"
// 群内成员查询群组的成员列表
zim::ZIMGroupMemberQueryConfig config;
config.count = 100;
config.nextFlag = 0;

zim_->queryGroupMemberList(group_id, config,
    [=](/zim-web/guides/group/const-std::string-&groupid,-const-std::vector<zim::zimgroupmemberinfo>-userlist,-unsigned-int-nextflag,-zim::zimerror-errorinfo){
        int error_code = errorInfo.code;
    });
```

</CodeGroup>
:::
:::if{props.platform="U3d"}
<CodeGroup>
```cs title="示例代码"
// 群内成员查询群组的成员列表
ZIMGroupMemberQueryConfig config = new ZIMGroupMemberQueryConfig();
// count 超过 100 按照 100 处理
config.count = 100;
config.nextFlag = 0;
ZIM.GetInstance().QueryGroupMemberList("group_id", config, (string groupID, List<ZIMGroupMemberInfo> userList,
    uint nextFlag, ZIMError errorInfo) =>
    {
        // 通过 errorInfo.code 获取查询群组成员列表的结果
    }
);
```
</CodeGroup>
:::

### 查询群成员信息

用户登录 ZIM SDK、并加入某个群组后，如果想要了解自己所在群组的某个成员的信息，可以通过调用 {getPlatformData(props,queryGroupMemberInfoMap)} 接口，查询该成员的个人信息。

查询成功后，用户可以通过 {getPlatformData(props,ZIMGroupMemberInfoQueriedCallbackMap)} 收到查询结果。

:::if{props.platform=undefined}
<CodeGroup>
```java title="示例代码"
// 群内成员 查询群组内某个成员的信息
zim.queryGroupMemberInfo(user_id, group_id, new ZIMGroupMemberListQueriedCallback() {
    @Override
    public void onGroupMemberListQueried(ArrayList<ZIMGroupMemberInfo> userList, int nextFlag, ZIMError errorInfo) {
        // 通过 errorInfo.code 获取查询群组成员信息的结果
    }
});
```
</CodeGroup>
:::
:::if{props.platform="iOS|mac"}
<CodeGroup>
```objc title="示例代码"
// 群内成员 查询群组内某个成员的信息
[zim queryGroupMemberInfo:userID groupID:groupID callback:^(NSString * _Nonnull groupID, ZIMGroupMemberInfo * _Nonnull userInfo, ZIMError * _Nonnull errorInfo) {
    //这里写调用查询群组内某个成员的信息接口后的业务代码
}];
```
</CodeGroup>
:::
:::if{props.platform="Flutter"}
<CodeGroup>
```dart title="示例代码"
// 群内成员 查询群组内某个成员的信息
ZIM.getInstance()
  !.queryGroupMemberInfo('userID', 'groupID')
   .then((value) {
     //成功触发此处
   })
   .catchError((onError) {
     //失败触发此处
   });
```
</CodeGroup>
:::
:::if{props.platform="Web|UTS"}
<CodeGroup>
```typescript title="示例代码"
// 群内成员 查询群组内某个成员的信息
const groupID = '';
const userID = '';
zim.queryGroupMemberInfo(userID, groupID)
    .then((res: ZIMGroupMemberInfoQueriedResult) => {
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
```Cpp title="示例代码"
// 群内成员查询群组内某个成员的信息
zim_->queryGroupMemberInfo(user_id, group_id,
    [=](/zim-web/guides/group/const-std::string-&groupid,-const-zim::zimgroupmemberinfo-&userlist,-zim::zimerror-errorinfo){
        int error_code = errorInfo.code;
    });
```

</CodeGroup>
:::
:::if{props.platform="U3d"}
<CodeGroup>
```cs title="示例代码"
// 群内成员 查询群组内某个成员的信息
ZIM.GetInstance().QueryGroupMemberInfo("user_id", "group_id", (string groupID, ZIMGroupMemberInfo userInfo, ZIMError errorInfo) =>
    {
        // 通过 errorInfo.code 获取查询群组成员信息的结果
    }
);
```
</CodeGroup>
:::

### 设置群成员昵称

用户登录 ZIM SDK、并加入某个群组后，如果想要设置自己在群组中的昵称，可以通过调用 {getPlatformData(props,setGroupMemberNicknameMap)} 接口，设置昵称。

<Warning title="注意">

在群组中，群主可以设置自己和其他群内成员在该群中的昵称；其他群内成员仅可以设置自己在该群的昵称。
</Warning>

设置成功后，用户可以通过 {getPlatformData(props,ZIMGroupMemberNicknameUpdatedCallbackMap)} 收到通知。





:::if{props.platform=undefined}
<CodeGroup>
```java title="示例代码"
// 群内成员设置昵称。
// 注意：群主可以设置自己和其他群内成员在该群的昵称；其他群内成员仅可以设置自己在该群的昵称。
zim.setGroupMemberNickname(member_new_nick_name, user_id, group_id, new ZIMGroupMemberNicknameUpdatedCallback() {
    @Override
    public void onGroupMemberNicknameUpdated(ZIMError errorInfo) {
        // 通过 errorInfo.code 获取设置昵称的结果
    }
});
```
</CodeGroup>
:::
:::if{props.platform="iOS|mac"}
<CodeGroup>
```objc title="示例代码"
// 群内成员设置昵称。
// 注意：群主可以设置自己和其他群内成员在该群中的昵称；其他群内成员仅可以设置自己在该群中的昵称。
[zim setGroupMemberNickname:nickName forUserID:userID groupID:groupID callback:^(ZIMError * _Nonnull errorInfo) {
        //此处写调用设置群成员的别名接口后的业务代码
}];
```
</CodeGroup>
:::
:::if{props.platform="Flutter"}
<CodeGroup>
```dart title="示例代码"
// 群内成员设置在群内的昵称。
// 注意：群主可以设置自己和其他群内成员的昵称；其他群内成员仅可以设置自己在群内的群昵称。
ZIM.getInstance()
  !.setGroupMemberNickname('nickname', 'forUserID', 'groupID')
   .then((value) {
       //成功触发此处
   })
   .catchError((onError) {
       //失败触发此处
   });
```
</CodeGroup>
:::
:::if{props.platform="Web"}
<CodeGroup>
```typescript title="示例代码"
// 群内成员设置昵称。
// 注意：群主可以设置自己和其他群内成员在该群中的昵称；其他群内成员仅可以设置自己在该群中的昵称。
const groupID = '';
const forUserID = '';
const nickname = '';
zim.setGroupMemberNickname(nickname, forUserID, groupID)
    .then((res: ZIMGroupMemberNicknameUpdatedResult) => {
        // 操作成功
    })
    .catch((err: ZIMError) => {
        // 操作失败
    });

// 注册监听“群成员信息变更”的回调
zim.on('groupMemberInfoUpdated', (zim, data) => {
    console.log('groupMemberInfoUpdated', data);
});
```
</CodeGroup>
:::
:::if{props.platform="UTS"}
<CodeGroup>
```typescript title="示例代码"
// 群内成员设置昵称。
// 注意：群主可以设置自己和其他群内成员在该群中的昵称；其他群内成员仅可以设置自己在该群中的昵称。
const groupID = '';
const forUserID = '';
const nickname = '';
zim.setGroupMemberNickname(nickname, forUserID, groupID)
    .then((res: ZIMGroupMemberNicknameUpdatedResult) => {
        // 操作成功
    })
    .catch((err: ZIMError) => {
        // 操作失败
    });

// 注册监听“群成员信息变更”的回调
zim.onGroupMemberInfoUpdated((data) => {
    console.log('groupMemberInfoUpdated', data);
});
```
</CodeGroup>
:::
:::if{props.platform="window"}
<CodeGroup>
```Cpp title="示例代码"
// 群内成员设置昵称。
// 注意：群主可以设置自己和其他群内成员在该群中的昵称；其他群内成员仅可以设置自己在该群中的昵称。
zim_->setGroupMemberNickname(member_new_nick_name, user_id, group_id,
    [=](/zim-web/guides/group/const-std::string-&groupid,-const-std::string-&userid,-const-std::string-&usernickame,-zim::zimerror-errorinfo){
        int error_code = errorInfo.code;
    });
```
</CodeGroup>
:::
:::if{props.platform="U3d"}
<CodeGroup>
```cs title="示例代码"
// 群内成员设置昵称。注意：群主可以设置自己和其他群内成员在该群的昵称；其他群内成员仅可以设置自己在该群的昵称。
ZIM.GetInstance().SetGroupMemberNickname("member_new_nick_name", "user_id", "group_id", (string groupID, string forUserID,
    string nickname, ZIMError errorInfo) =>
    {
        // 通过 errorInfo.code 获取设置昵称的结果
    }
);
```
</CodeGroup>
:::



### 设置群成员角色

群主登录 ZIM SDK 后，可以通过调用 {getPlatformData(props,setGroupMemberRoleMap)} 接口，设置其他群内成员的角色，比如设置某个群成员为普通成员或者为管理员。

设置成功后，群主可以通过 {getPlatformData(props,ZIMGroupMemberRoleUpdatedCallbackMap)} 类型收到设置结果。

群内成员可以通过 {getPlatformData(props,onGroupMemberInfoUpdatedMap)} 收到用户角色变更的通知。

#### 群成员角色与权限说明

ZIM SDK 默认支持将用户设置为群主、管理员、普通成员。在群组中，群主拥有所有**客户端**权限，可以实现所有群组功能。管理员拥有大部分**客户端**权限。普通成员拥有的**客户端**权限最少，具体如下表所示：

<table>
<tbody><tr>
<th>客户端权限</th>
<th>群主（对应枚举值为 1）</th>
<th>管理员（对应枚举值为 2）</th>
<th>普通成员（对应枚举值为 3）</th>
</tr>
<tr>
<th>修改群头像、群名称、群公告</th>
<td rowspan="2">支持</td>
<td rowspan="2">支持</td>
<td rowspan="2">支持</td>
</tr>
<tr>
<th>修改群属性</th>
</tr>
<tr>
<th>修改群成员昵称</th>
<td rowspan="9">支持，可对所有群角色用户使用此功能</td>
<td rowspan="5">支持，可对所有普通成员使用此功能</td>
<td rowspan="2">支持，仅可对自己使用此功能</td>
</tr>
<tr>
<th>撤回群成员消息</th>
</tr>
<tr>
<th>踢人</th>
<td rowspan="7">不支持。</td>
</tr>
<tr>
<th>对单独群成员禁言</th>
</tr>
<tr>
<th>对特定群角色禁言</th>
</tr>
<tr>
<th>设置群成员角色</th>
<td rowspan="4">不支持</td>
</tr>
<tr>
<th>转让群主</th>
</tr>
<tr>
<th>解散群组</th>
</tr>
<tr>
<th>全员禁言</th>
</tr>
</tbody></table>



:::if{props.platform=undefined}
<CodeGroup>
```java title="示例代码"
// 群主将普通成员用户设置为管理员
zim.setGroupMemberRole(2, user_id, group_id, new ZIMGroupMemberRoleUpdatedCallback() {
    @Override
    public void onGroupMemberRoleUpdated(ZIMError errorInfo) {
        // 通过 errorInfo.code 获取设置群内成员的角色的结果
    }
});
```
</CodeGroup>

:::
:::if{props.platform="iOS|mac"}
<CodeGroup>
```objc title="示例代码"
// 群主设置普通成员为管理员
[zim setGroupMemberRole:2 forUserID:userID groupID:groupID callback:^(ZIMError * _Nonnull errorInfo) {
        //此处写设置角色后的业务代码
}];
```
</CodeGroup>
:::
:::if{props.platform="Flutter"}
<CodeGroup>
```dart title="示例代码"
// 群主将普通用户设置为管理员
ZIM.getInstance()
  !.setGroupMemberRole(2, 'forUserID', 'groupID')
   .then((value) {
      //成功触发此处
   })
   .catchError((onError) {
       //失败触发此处
   });
```
</CodeGroup>
:::
:::if{props.platform="Web"}
<CodeGroup>
```typescript title="示例代码"
//  群主设置普通成员用户为管理员
const groupID = '';
const forUserID = '';
const role = 2;
zim.setGroupMemberRole(role, forUserID, groupID)
    .then((res: ZIMGroupMemberRoleUpdatedResult) => {
        // 操作成功
    })
    .catch((err: ZIMError) => {
        // 操作失败
    });

// 注册监听“群成员信息变更”的回调
zim.on('groupMemberInfoUpdated', (zim, data) => {
    console.log('groupMemberInfoUpdated', data);
});
```
</CodeGroup>
:::
:::if{props.platform="UTS"}
<CodeGroup>
```typescript title="示例代码"
//  群主设置普通成员用户为管理员
const groupID = '';
const forUserID = '';
const role = 2;
zim.setGroupMemberRole(role, forUserID, groupID)
    .then((res: ZIMGroupMemberRoleUpdatedResult) => {
        // 操作成功
    })
    .catch((err: ZIMError) => {
        // 操作失败
    });

// 注册监听“群成员信息变更”的回调
zim.onGroupMemberInfoUpdated((data) => {
    console.log('groupMemberInfoUpdated', data);
});
```
</CodeGroup>
:::
:::if{props.platform="window"}
<CodeGroup>
```Cpp title="示例代码"
// 群主将普通成员用户设置为管理员
int role = 2;
zim_->setGroupMemberRole(role, for_user_id, group_id,
    [=](/zim-web/guides/group/int-role,-const-std::string-&foruserid,-const-std::string-&groupid,-zim::zimerror-errorinfo) {
        int error_code = errorInfo.code;
    });
```
</CodeGroup>
:::
:::if{props.platform="U3d"}
<CodeGroup>
```cs title="示例代码"
// 群主将普通成员用户设置为管理员
int role = 2;
ZIM.GetInstance().SetGroupMemberRole(role, "user_id", "group_id", (string groupID, string forUserID,
    int role, ZIMError errorInfo) =>
    {
        // 通过 errorInfo.code 获取设置群内成员的角色的结果
    }
);
```
</CodeGroup>
:::

### 转让群主

用户登录 ZIM SDK、并加入某个群组后，如果自己是某个群组中的群主，可以通过调用 {getPlatformData(props,transferGroupOwnerMap)} 接口，传入 toUserID（被转让群主的群成员 ID），将自己的群主角色，转让给其他群内成员。

<Warning title="注意">

- 群组中，只有群主向其他群内成员转让群主的角色。
- 群主转让时，toUserID（被转让群主的用户 ID） 必须是本群组内的成员，否则会操作失败。
</Warning>

转让成功后，群内成员可以通过 {getPlatformData(props,onGroupMemberInfoUpdatedMap)} 收到群主变更的通知。





:::if{props.platform=undefined}
<CodeGroup>
```java title="示例代码"
// 转让群主身份给其他群内成员
zim.transferGroupOwner(new_group_owner_id, group_id, new ZIMGroupOwnerTransferredCallback() {
    @Override
    public void onGroupOwnerTransferred(ZIMError errorInfo) {
        // 通过 errorInfo.code 获取转让群主身份的结果
    }
});
```
</CodeGroup>


:::
:::if{props.platform="iOS|mac"}
<CodeGroup>
```objc title="示例代码"
// 转让群主身份给其他群内成员
[zim transferGroupOwnerToUserID:userID groupID:groupID callback:^(ZIMError * _Nonnull errorInfo) {
        //此处写调用转让群主身份给其他群内成员的接口后的业务代码
}];
```
</CodeGroup>
:::
:::if{props.platform="Flutter"}
<CodeGroup>
```dart title="示例代码"
// 转让群主身份给其他群内成员
ZIM.getInstance()
  !.transferGroupOwner('toUserID', 'groupID')
   .then((value) {
       //成功触发此处
   })
   .catchError((onError) {
       //失败触发此处
   });
```
</CodeGroup>
:::
:::if{props.platform="Web"}
<CodeGroup>

```typescript title="示例代码"
// 转让群主身份给其他群内成员
const groupID = '';
const toUserID = '';
zim.transferGroupOwner(toUserID, groupID)
    .then((res: ZIMGroupOwnerTransferredResult) => {
        // 操作成功
    })
    .catch((err: ZIMError) => {
        // 操作失败
    });

// 注册监听“群成员状态变更”的回调
zim.on('groupMemberStateChanged', (zim, data) => {
    console.log('groupMemberStateChanged', data);
});

// 注册监听“群成员信息变更”的回调
zim.on('groupMemberInfoUpdated', (zim, data) => {
    console.log('groupMemberInfoUpdated', data);
});
```
</CodeGroup>
:::
:::if{props.platform="UTS"}
<CodeGroup>

```typescript title="示例代码"
// 转让群主身份给其他群内成员
const groupID = '';
const toUserID = '';
zim.transferGroupOwner(toUserID, groupID)
    .then((res: ZIMGroupOwnerTransferredResult) => {
        // 操作成功
    })
    .catch((err: ZIMError) => {
        // 操作失败
    });

// 注册监听“群成员状态变更”的回调
zim.onGroupMemberStateChanged((data) => {
    console.log('groupMemberStateChanged', data);
});

// 注册监听“群成员信息变更”的回调
zim.onGroupMemberInfoUpdated((data) => {
    console.log('groupMemberInfoUpdated', data);
});
```
</CodeGroup>
:::
:::if{props.platform="window"}
<CodeGroup>
```Cpp title="示例代码"
// 转让群主身份给其他群内成员
zim_->transferGroupOwner(new_group_owner_id, group_id,
    [=](/zim-web/guides/group/const-std::string-&groupid,-const-std::string-&touserid,-zim::zimerror-errorinfo){
        int error_code = errorInfo.code;
    });
```
</CodeGroup>
:::
:::if{props.platform="U3d"}
<CodeGroup>
```cs title="示例代码"
// 转让群主身份给其他群内成员
ZIM.GetInstance().TransferGroupOwner("new_group_owner_id", "group_id", (string groupID, string toUserID, ZIMError errorInfo) =>
    {
        // 通过 errorInfo.code 获取转让群主身份的结果
    }
);
```
</CodeGroup>
:::

### 查询群内成员数量

用户登录 ZIM SDK、并加入某个群组后，如果想要了解自己所在群组的成员数量，可以通过调用 {getPlatformData(props,queryGroupMemberCountMap)} 接口，查询该群成员的数量。

查询成功后，用户可以通过 {getPlatformData(props,ZIMGroupMemberCountQueriedCallbackMap)} 收到查询结果。




:::if{props.platform=undefined}
<CodeGroup>
```java title="示例代码"
// 群内成员 查询群组内成员的数量
zim.queryGroupMemberCount("GROUP_ID", new ZIMGroupMemberCountQueriedCallback() {
            @Override
            public void onGroupMemberCountQueried(String groupID, int count, ZIMError errorInfo) {
                // 获取群人数
            }
        });
```
</CodeGroup>

:::
:::if{props.platform="iOS|mac"}
<CodeGroup>
```objc title="示例代码"
// 群内成员 查询群组内成员的数量
[zim queryGroupMemberCountByGroupID:self.toGroupID callback:^(NSString * _Nonnull groupID, unsigned int count, ZIMError * _Nonnull errorInfo) {

}];
```
</CodeGroup>
:::
:::if{props.platform="Flutter"}
<CodeGroup>
```dart title="示例代码"
// 群内成员 查询群组内成员的数量
try {
    ZIMGroupMemberCountQueriedResult result =
        await ZIM.getInstance().queryGroupMemberCount('groupID');
        //这里写查询成功后的逻辑
    } on PlatformException catch (onError) {
        //根据 onError 写对应的失败逻辑
    }
```
</CodeGroup>
:::
:::if{props.platform="Web|UTS"}
<CodeGroup>
```typescript title="示例代码"
// 查询群内成员数量
const groupID = '';
zim.queryGroupMemberCount(groupID)
    .then((res: ZIMGroupMemberCountQueriedResult) => {
        // 操作成功
    })
    .catch((err: ZIMError) => {
        // 操作失败
    });
```
</CodeGroup>
:::
:::if{props.platform="window"}
<CodeGroup>
```Cpp title="示例代码"
// 群内成员 查询群组内成员的数量
zim_->queryGroupMemberCount(
        group_id, [=](/zim-web/guides/group/const-std::string-&groupid,-unsigned-int-count,-const-zim::zimerror-&errorinfo) {
                int code = errorInfo.code;
    });
```

</CodeGroup>
:::
:::if{props.platform="U3d"}
<CodeGroup>
```cs title="示例代码"
// 群内成员 查询群组内成员的数量
ZIM.GetInstance().QueryGroupMemberCount("GROUP_ID", (string groupID, uint count, ZIMError errorInfo) =>
    {
        // 获取群人数
    }
);
```
</CodeGroup>
:::

### 搜索群成员

用户登录 ZIM SDK、并加入群组后，如果想要根据条件在群成员中搜索用户，可以通过调用 {getPlatformData(props,searchLocalGroupMembersMap)} 接口，传入 groupID、config、callback 搜索符合条件的群成员。

搜索结果将通过 {getPlatformData(props,ZIMGroupMembersSearchedCallbackMap)} 回调接口返回。




:::if{props.platform=undefined}
<CodeGroup>
```java title="示例代码"
// 在某个群组中搜索名称中包含 “zego” 的群成员
ZIM zim = getZIM();
ZIMGroupMemberSearchConfig config = new ZIMGroupMemberSearchConfig();
config.count = 10;
config.nextFlag = nextFlag;
config.isAlsoMatchGroupMemberNickname = true; // 如果群成员昵称包含 zego，搜索结果将包含该成员
config.keywords.add("zego");
zim.searchLocalGroupMembers(conversationID, config, new ZIMGroupMembersSearchedCallback() {
    @Override
    public void onGroupMembersSearched(String groupID, ArrayList<ZIMGroupMemberInfo> userList, int nextFlag, ZIMError errorInfo) {
        // 开发者可从 userList 中获取到群成员信息
}});
```
</CodeGroup>
:::
:::if{props.platform="iOS|mac"}
<CodeGroup>
```objc title="示例代码"
// 在某个群组中搜索名称中包含 “zego” 的群成员
ZIMGroupMemberSearchConfig *config = [[ZIMGroupMemberSearchConfig alloc] init];
config.count = 10;
config.isAlsoMatchGroupMemberNickname = true; // 如果群成员昵称包含 zego，搜索结果将包含该成员
config.keywords = @[@"zego"];
[[ZIM getInstance] searchLocalGroupMembersByGroupID:@"groupID" config:config callback:^(NSString * _Nonnull groupID, NSArray<ZIMGroupMemberInfo *> * _Nonnull userList, unsigned int nextFlag, ZIMError * _Nonnull errorInfo) {
    // 开发者可从 userList 中获取到群成员信息
}];
```
</CodeGroup>
:::
:::if{props.platform="Flutter"}
<CodeGroup>
```dart title="示例代码"
// 在某个群组中搜索名称中包含 “zego” 的群成员
ZIMGroupMemberSearchConfig config = ZIMGroupMemberSearchConfig();
config.count = 10;
config.isAlsoMatchGroupMemberNickname = true; // 如果群成员昵称包含 zego，搜索结果将包含该成员
config.keywords.add("zego");

ZIM.getInstance()!.searchLocalGroupMembers("groupID", config).then((value){
    // 开发者可从 userList 中获取到群成员信息
    }).catchError((onError){

});
```
</CodeGroup>
:::
:::if{props.platform="Web|UTS"}
<CodeGroup>
```typescript title="示例代码"
// 在某个群组中搜索名称中包含 “zego” 的群成员

const config: ZIMGroupMemberSearchConfig = {
    count: 10, // 搜索结果数量
    nextFlag: 0,
    keywords: ['zego'], // 设置关键词为 “zego”，最多支持 5 个。当设置多个关键词后，搜索结果只展示同时包含所有关键词的本地消息
    isAlsoMatchGroupMemberNickname: true, // 如果群成员用户昵称包含 zego，搜索结果将包含该群成员
};

zim.searchLocalGroupMembers('groupID', config)
    .then((res: ZIMGroupMembersSearchedResult) => {
        // 操作成功
    })
    .catch((err: ZIMError) => {
        // 操作失败
    });
```
</CodeGroup>
:::
:::if{props.platform="window"}
<CodeGroup>
```cpp title="示例代码"
// 在某个群组中搜索名称中包含 “zego” 的群成员
auto searchConfig = zim::ZIMGroupMemberSearchConfig();
searchConfig.count = 10;
searchConfig.nextFlag = 0;
// 如果群成员昵称包含 zego ，搜索结果将包含该成员
searchConfig.isAlsoMatchGroupMemberNickname = true;
searchConfig.keywords.emplace_back("zego");

zim_->searchLocalGroupMembers(groupID, searchConfig,
                              [=](/zim-web/guides/group/const-std::string-&groupid,-const-std::vector<zim::zimgroupmemberinfo>-&userlist,-unsigned-int-nextflag,-const-zim::zimerror-&errorinfo) {
                                    // 开发者可从 userList 中获取到群成员信息
                                });
```
</CodeGroup>
:::
:::if{props.platform="U3d"}
<CodeGroup>
```cs title="示例代码"
// 在某个群组中搜索名称中包含 “zego” 的群成员
ZIMGroupMemberSearchConfig config = new ZIMGroupMemberSearchConfig();
config.count = 10;
config.nextFlag = nextFlag;
config.isAlsoMatchGroupMemberNickname = true; // 如果群成员昵称包含 zego，搜索结果将包含该成员
config.keywords.Add("zego");
ZIM.GetInstance().SearchLocalGroupMembers(groupInfo.baseInfo.groupID, groupMemberSearchConfig, (string groupID, List<ZIMGroupMemberInfo> userList,
        uint nextFlag, ZIMError errorInfo) =>
    {
        // 开发者可从 userList 中获取到群成员信息
    });
```
</CodeGroup>
:::



:::if{props.platform="undefined|iOS|mac|window|Flutter|Web|UTS"}

### 设置群成员禁言状态

登录 ZIM SDK 后，用户可以禁言或解禁自己管理的群组内的特定成员。调用 {getPlatformData(props,muteGroupMembersMap)} 接口，批量修改 100 名群成员的禁言状态。禁言期限可为永久（`ZIMGroupMemberMuteConfig > duration` 为 -1）或最长为 7 天（`ZIMGroupMemberMuteConfig > duration` 为 604800）。当 `ZIMGroupMemberMuteConfig > duration` 为 0 时，表示取消禁言。

<Note title="说明">
- 群主可以禁止所有群成员发言，包括自己。
- 如需上调单次操作数量或最长禁言期限，请联系 ZEGO 技术支持。
</Note>

<Frame width="auto" height="auto">
  <img src="https://media-resource.spreading.io/docuo/workspace564/27e54a759d23575969552654cb45bf89/7155b076f7.jpg"/>
</Frame>

设置成功后，操作用户可以通过 {getPlatformData(props,ZIMGroupMembersMutedCallbackMap)} 收到通知。

禁言或解禁成功后，全体群成员会收到 {getPlatformData(props,onGroupMemberInfoUpdatedMap)} ，得知哪些群成员无法在该群组发言或解除禁言状态。

<Note title="说明">

如果您希望禁止特定群成员角色发言，请参考 [群组管理 - 禁言或解禁群组](/zim-web/guides/group/manage-groups#禁言或解禁群组)。
</Note>
:::


:::if{props.platform=undefined}
```java title="示例代码"
boolean isMute = true;

ArrayList<String> userIDList;
userIDList.add("user_1");
userIDList.add("user_3");
userIDList.add("user_2");

String groupID = "group_id";

ZIMGroupMemberMuteConfig config = new ZIMGroupMemberMuteConfig();
// 禁言时长 30 秒
config.duration = 30;

zim.muteGroupMembers(isMute, userIDList, groupID, config,new ZIMGroupMembersMutedCallback() {
    @Override
    public void onGroupMembersMuted(String groupID, boolean isMute, int duration, ArrayList<String> mutedMemberIDs, ArrayList<ZIMErrorUserInfo> errorUserList, ZIMError errorInfo) {
        // 开发者可从回调各参数中获取到禁言结果相关信息
});
```
:::
:::if{props.platform="iOS|mac"}
```objc
ZIMGroupMemberMuteConfig *muteConfig = [[ZIMGroupMemberMuteConfig alloc] init];
// 禁言时长 30 秒
muteConfig.duration = 30;
[[ZIM getInstance] muteGroupMembers:YES userIDs:@[@"user_1",@"user_2",@"user_3"] groupID:@"group_id" config:muteConfig callback:^(NSString * _Nonnull groupID, BOOL isMute, int duration, NSArray<NSString *> * _Nonnull mutedMemberIDs, NSArray<ZIMErrorUserInfo *> * _Nonnull errorUserList, ZIMError * _Nonnull errorInfo) {
    // 开发者可从回调各参数中获取到禁言结果相关信息
}];
```
:::
:::if{props.platform="Flutter"}
```dart
try {
    bool isMute = true;
    List<String> userIDs = ['user_1','user_2','user_3'];
    String groupID = 'group_id';
    ZIMGroupMemberMuteConfig config = ZIMGroupMemberMuteConfig();
    // 禁言时长 30 秒
    config.duration = 30;
    ZIMGroupMembersMutedResult result = await ZIM.getInstance()!.muteGroupMembers(isMute, userIDs, groupID, config);
    // 开发者可从 result 各参数中获取到禁言结果相关信息
} on PlatformException catch (onError){
    onError.code;//根据错误码表处理
    onError.message;//错误信息
}
```

:::
:::if{props.platform="Web|UTS"}
```typescript
const isMute = true;
const userIDs = ["user_1", "user_2", "user_3"];
const groupID = "group_id";
const config:  ZIMGroupMemberMuteConfig = {
    duration: 30,  // 设置禁言时间为 30 秒
};

zim.muteGroupMembers(isMute, userIDs, groupID, config)
    .then((res: ZIMGroupMembersMutedResult) => {
        // 操作成功
    })
    .catch((err: ZIMError) => {
        // 操作失败
    });
```

:::
:::if{props.platform="window"}
```Cpp
bool is_mute = true;

std::vector<std::string> user_id_list;
user_id_list.push_back("user_1");
user_id_list.push_back("user_3");
user_id_list.push_back("user_2");

std::string group_id = "group_id";

zim::ZIMGroupMemberMuteConfig config;
config.duration = 30;

zim_->muteGroupMembers(is_mute, user_id_list, group_id, config,
    [=](/zim-web/guides/group/const-std::string-&groupid,-bool-is_muted,-unsigned-int-duration,-const-std::vector<std::string>-&mutedmemberids,-const-std::vector<zim::zimerroruserinfo>-&erroruserlist,-const-zim::zimerror-&errorinfo) {
        // 开发者可从回调各参数中获取到禁言结果相关信息
    });
```
:::

:::if{props.platform="undefined|iOS|mac|window|Flutter|Web|UTS"}
### 查询群内禁言成员列表

登录 ZIM SDK 后，群成员如需了解所在群组的被禁言成员列表，可调用 {getPlatformData(props,queryGroupMemberMutedListMap)} 接口进行查询。

查询成功后，操作用户可通过 {getPlatformData(props,ZIMGroupMemberMutedListQueriedCallbackMap)} 获取具体信息。
:::

:::if{props.platform=undefined}
```java
// 群内成员查询群组的成员列表
ZIMGroupMemberMutedListQueryConfig config = new ZIMGroupMemberMutedListQueryConfig();
// 单次获取成员数量为 100
config.count = 100;
config.nextFlag = 0;
zim.queryGroupMemberMutedList(
    group_id, config, new ZIMGroupMemberMutedListQueriedCallback() {
    @Override
    public void onGroupMemberListQueried(String groupID, long nextFlag, ArrayList<ZIMGroupMemberInfo> userList, ZIMError errorInfo) {

    }
});
```
:::
:::if{props.platform="iOS|mac"}
```objc
// 群内成员查询群组的成员列表
ZIMGroupMemberMutedListQueryConfig *config = [[ZIMGroupMemberMutedListQueryConfig alloc] init];
// 单次获取成员数量为 100
config.count = 100;
config.nextFlag = 0;

[[ZIM getInstance] queryGroupMemberMutedListByGroupID:@"groupID" config:config callback:^(NSString * _Nonnull groupID, unsigned long long nextFlag, NSArray<ZIMGroupMemberInfo *> * _Nonnull userList, ZIMError * _Nonnull errorInfo) {
    // 开发者可以从 info 中拿到被禁言群成员信息
}];
```
:::
:::if{props.platform="Flutter"}
```dart
try {
    // 群内成员查询群组的被禁言成员列表
    ZIMGroupMemberMutedListQueryConfig config = ZIMGroupMemberMutedListQueryConfig();
    //单次获取成员数量为 100
    config.count = 100;
    config.nextFlag = 0;
    ZIMGroupMemberMutedListQueriedResult result = await ZIM.getInstance()!.queryGroupMemberMutedList('gorupID', config);
} on PlatformException catch (onError){
    onError.code; // 根据错误码表处理
    onError.message; // 错误信息
}
```
:::
:::if{props.platform="Web|UTS"}
```typescript
// 群内成员查询群组的成员列表
const groupID = "group_id";
const config: ZIMGroupMemberQueryConfig = {
    count: 100,
    nextFlag: 0,
}

zim.queryGroupMemberMutedList(groupID, config)
    .then((res: ZIMGroupMemberMutedListQueriedResult) => {
        // 操作成功
    })
    .catch((err: ZIMError) => {
        // 操作失败
    });
```

:::
:::if{props.platform="window"}
```Cpp
// 群内成员查询群组的成员列表
zim::ZIMGroupMemberMutedListQueryConfig config;
// 单次获取成员数量为 100
config.count = 100;
config.nextFlag = 0;

zim_->queryGroupMemberMutedList(
    group_id, config,
    [=](/zim-web/guides/group/const-std::string-&groupid,-unsigned-long-long-nextflag,-const-std::vector<zim::zimgroupmemberinfo>-&info,-const-zim::zimerror-&errorinfo) {
    // 开发者可以从 info 中拿到被禁言群成员信息
    });
```

:::

:::if{props.platform="undefined|iOS|mac|window|Flutter|Web|UTS"}
### 获取当前群成员禁言状态

如需主动获取当前用户在群组的禁言状态，请通过以下任意方法：
<div>
- 参考 [会话管理 - 拉取会话列表](/zim-web/guides/conversation/get-the-conversation-list#拉取会话列表) 主动拉取会话列表。
- 参考 [会话管理 - 更新会话列表](/zim-web/guides/conversation/get-the-conversation-list#更新会话列表)，监听会话变更回调，更新会话列表。
</div>

当会话类型是群类型时，从返回结果中的 {getPlatformData(props,ZIMGroupConversationMap)} 获取 {getPlatformData(props,mutedExpiredTimeMap)} ，即群禁言时间，单位为秒。

{getPlatformData(props,mutedExpiredTimeMap)} 值说明如下：
<div>
- 为 -1 时，表示当前用户永久无法在该群组发言。
- 为 0 时，表示当前用户可以在该群组发言。
- 为其他值时，表示当前用户于该数值时间内无法在该群组发言。
</div>

<Note title="说明">
如果当前用户既因群角色被禁言（详见 [群组管理 - 禁言或解禁群组](/zim-web/guides/group/manage-groups#禁言或解禁群组)，又被单独禁言（详见本文 <a href="#设置群成员禁言状态">设置群成员禁言状态</a>），则 {getPlatformData(props,mutedExpiredTimeMap)} 值以“群禁言时间”与“单独被禁言时间”中的最大值为准。
</Note>
:::
<Content  platform = "Web" />