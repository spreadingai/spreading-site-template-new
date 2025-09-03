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

export const queryGroupInfoMap = {
  'Android': <a href="@queryGroupInfo" target='_blank'>queryGroupInfo</a>,
  'U3d': <a href="@QueryGroupInfo" target='_blank'>QueryGroupInfo</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/queryGroupInfo.html" target='_blank'>queryGroupInfo</a>,
  'iOS,mac': <a href="@queryGroupInfoByGroupID" target='_blank'>queryGroupInfoByGroupID</a>,
}
export const ZIMGroupInfoQueriedCallbackMap = {
  'Android': <a href="@-ZIMGroupInfoQueriedCallback" target='_blank'>ZIMGroupInfoQueriedCallback</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMGroupInfoQueriedResult-class.html" target='_blank'>ZIMGroupInfoQueriedResult</a>,
  'Web,RN,UTS': <a href="@-ZIMGroupInfoQueriedResult" target='_blank'>ZIMGroupInfoQueriedResult</a>,
  'iOS,mac,window,U3d': <a href="@ZIMGroupInfoQueriedCallback" target='_blank'>ZIMGroupInfoQueriedCallback</a>,
}
export const updateGroupNameMap = {
  'Android': <a href="@updateGroupName" target='_blank'>updateGroupName</a>,
  'U3d': <a href="@UpdateGroupName" target='_blank'>UpdateGroupName</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/updateGroupName.html" target='_blank'>updateGroupName</a>,
}
export const onGroupNameUpdatedMap = {
  'Android': <a href="@onGroupNameUpdated" target='_blank'>onGroupNameUpdated</a>,
  'U3d': <a href="@OnGroupNameUpdated" target='_blank'>OnGroupNameUpdated</a>,
  'Web,RN': <a href="@groupNameUpdated" target='_blank'>groupNameUpdated</a>,
  'UTS': <a href="@groupNameUpdated" target='_blank'>onGroupNameUpdated</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMEventHandler/onGroupNameUpdated.html" target='_blank'>onGroupNameUpdated</a>,
  'iOS': <a href="https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_ios~protocol~ZIMEventHandler#zim-group-name-updated-operated-info-group-id" target='_blank'>groupNameUpdated</a>,
  'mac': <a href="https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_macos~protocol~ZIMEventHandler#zim-group-name-updated-operated-info-group-id" target='_blank'>groupNameUpdated</a>,
}
export const updateGroupAvatarUrlMap = {
  'Android': <a href="@updateGroupAvatarUrl" target='_blank'>updateGroupAvatarUrl</a>,
  'U3d': <a href="@UpdateGroupAvatarUrl" target='_blank'>UpdateGroupAvatarUrl</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/updateGroupAvatarUrl.html" target='_blank'>updateGroupAvatarUrl</a>,
}
export const onGroupAvatarUrlUpdatedMap = {
  'Android': <a href="@onGroupAvatarUrlUpdated" target='_blank'>onGroupAvatarUrlUpdated</a>,
  'U3d': <a href="@OnGroupAvatarUrlUpdated" target='_blank'>OnGroupAvatarUrlUpdated</a>,
  'Web,RN': <a href="@groupAvatarUrlUpdated" target='_blank'>groupAvatarUrlUpdated</a>,
  'UTS': <a href="@groupAvatarUrlUpdated" target='_blank'>onGroupAvatarUrlUpdated</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMGroupAvatarUrlUpdatedResult-class.html" target='_blank'>onGroupAvatarUrlUpdatedResult</a>,
  'iOS': <a href="https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_ios~protocol~ZIMEventHandler#zim-group-avatar-url-updated-operated-info-group-id" target='_blank'>groupAvatarUrlUpdated</a>,
  'mac': <a href="https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_macos~protocol~ZIMEventHandler#zim-group-avatar-url-updated-operated-info-group-id" target='_blank'>groupAvatarUrlUpdated</a>,
}
export const updateGroupNoticeMap = {
  'Android': <a href="@updateGroupNotice" target='_blank'>updateGroupNotice</a>,
  'U3d': <a href="@UpdateGroupNotice" target='_blank'>UpdateGroupNotice</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/updateGroupNotice.html" target='_blank'>updateGroupNotice</a>,
}
export const onGroupNoticeUpdatedMap = {
  'Android': <a href="@onGroupNoticeUpdated" target='_blank'>onGroupNoticeUpdated</a>,
  'U3d': <a href="@OnGroupNoticeUpdated" target='_blank'>OnGroupNoticeUpdated</a>,
  'Web,RN': <a href="@groupNoticeUpdated" target='_blank'>groupNoticeUpdated</a>,
  'UTS': <a href="@groupNoticeUpdated" target='_blank'>onGroupNoticeUpdated</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMEventHandler/onGroupNoticeUpdated.html" target='_blank'>onGroupNoticeUpdated</a>,
  'iOS': <a href="https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_ios~protocol~ZIMEventHandler#zim-group-notice-updated-operated-info-group-id" target='_blank'>groupNoticeUpdated</a>,
  'mac': <a href="https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_macos~protocol~ZIMEventHandler#zim-group-notice-updated-operated-info-group-id" target='_blank'>groupNoticeUpdated</a>,
}
export const updateGroupAliasMap = {
  'Android': <a href="@updateGroupAlias" target='_blank'>updateGroupAlias</a>,
  'Web,RN,UTS': <a href="@updateGroupAlias" target='_blank'>updateGroupAlias</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/updateGroupAlias.html" target='_blank'>updateGroupAlias</a>,
  'iOS': <a href="@updateGroupAlias" target='_blank'>updateGroupAlias</a>,
  'mac': <a href="@updateGroupAlias" target='_blank'>updateGroupAlias</a>,
}

export const onGroupAliasUpdatedMap = {
  'Android': <a href="@onGroupAliasUpdated" target='_blank'>onGroupAliasUpdated</a>,
  'Web,RN': <a href="@groupAliasUpdated" target='_blank'>groupAliasUpdated</a>,
  'UTS': <a href="@groupAliasUpdated" target='_blank'>onGroupAliasUpdated</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMEventHandler/onGroupAliasUpdated.html" target='_blank'>onGroupAliasUpdated</a>,
  'iOS': <a href="https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_ios~protocol~ZIMEventHandler#zim-group-alias-updated-operated-user-id-group-id" target='_blank'>groupAliasUpdated</a>,
  'mac': <a href="https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_macos~protocol~ZIMEventHandler#zim-group-alias-updated-operated-user-id-group-id" target='_blank'>groupAliasUpdated</a>,
}

export const onConversationChangedMap = {
  'Android': <a href="@onConversationChanged" target='_blank'>onConversationChanged</a>,
  'Web,RN': <a href="@conversationChanged" target='_blank'>conversationChanged</a>,
  'UTS': <a href="@conversationChanged" target='_blank'>onConversationChanged</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMEventHandler/onConversationChanged.html" target='_blank'>conversationChanged</a>,
  'iOS': <a href="https://doc-zh.zego.im/article/api?doc=zim~objective-c_ios~protocol~ZIMEventHandler#zim-conversation-changed" target='_blank'>conversationChanged</a>,
  'mac': <a href="https://doc-zh.zego.im/article/api?doc=zim~objective-c_macos~protocol~ZIMEventHandler#zim-conversation-changed" target='_blank'>conversationChanged</a>,
}



# 群资料管理

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

ZIM SDK 提供了群资料管理功能，支持用户查询/修改群资料，比如群名、群昵称、群头像、群公告等基本群信息，也支持用户对某个群组设置仅自己可见的群备注。


## 实现流程

<Warning title="注意">

- 用户使用“群资料管理”功能之前，请先加入某个群组，否则无法使用相关功能，详情请参考 [加入群组](/zim-uniapp-x/guides/group/manage-groups#加入群组)。
- 群内成员（包含群主）都可以使用“群资料管理”功能。
</Warning>

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/ZIM/Common/GruopDocumentation.png" /></Frame>

### 查询群资料

用户登录、并加入某个群组后，如果想要了解自己加入群组的相关资料，可以通过调用 {getPlatformData(props,queryGroupInfoMap)} 接口，查询群资料。

查询成功后，用户可以通过 {getPlatformData(props,ZIMGroupInfoQueriedCallbackMap)} 收到查询结果。




:::if{props.platform=undefined}
<CodeGroup>
```java title="示例代码"
// 群内成员 查询群资料，例如，群名、群昵称、群公告等
zim.queryGroupInfo(group_id, new ZIMGroupInfoQueriedCallback() {
    @Override
    public void onGroupInfoQueried(ZIMGroupFullInfo groupInfo, ZIMError errorInfo) {
        // 通过 errorInfo 获取查询群资料的结果
    }
});
```
</CodeGroup>
:::

:::if{props.platform="iOS|mac"}
<CodeGroup>
```objc title="示例代码"
// 群内成员 查询群资料，例如，群名、群昵称、群公告等
[zim queryGroupInfoByGroupID:groupID callback:^(ZIMGroupFullInfo * _Nonnull groupInfo, ZIMError * _Nonnull errorInfo) {
        //这里写调用查询群资料，例如，群名、群昵称、群公告接口后的业务代码
}];
```
</CodeGroup>
:::
:::if{props.platform="window"}
<CodeGroup>
```Cpp title="示例代码"
// 群内成员 查询群资料，例如，群名、群昵称、群公告等
zim_->queryGroupInfo(group_id, 
    [=](/zim-uniapp-x/guides/group/const-zimgroupfullinfo-&groupinfo,-zim::zimerror-errorinfo) {
        int code = errorInfo.code;
    });
```
</CodeGroup>
:::

:::if{props.platform="Flutter"}
<CodeGroup>
```dart title="示例代码"
// 群内成员 查询群资料，例如，群名、群昵称、群公告等
ZIM.getInstance()
  !.queryGroupInfo('groupID')
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
// 群内成员 查询群资料，例如，群名、群昵称、群公告、群头像 URL 等
const groupID = '';
zim.queryGroupInfo(groupID)
    .then((res: ZIMGroupInfoQueriedResult) => {
        // 查询成功
    })
    .catch((err: ZIMError) => {
        // 查询失败
    });
```
</CodeGroup>
:::

:::if{props.platform="U3d"}
<CodeGroup>
```cs title="示例代码"
// 群内成员 查询群资料，例如，群名、群昵称、群公告等
ZIM.GetInstance().QueryGroupInfo("groupID", (ZIMGroupFullInfo groupInfo, ZIMError errorInfo) =>
    {
        // 通过 errorInfo 获取查询群资料的结果
    }
);
```
</CodeGroup>
:::


### 修改群名

用户登录、并加入某个群组后，如果想要修改自己加入群组的群名，可以通过调用 {getPlatformData(props,updateGroupNameMap)} 接口，修改群组名称。

修改成功后，全体群成员都可以通过 {getPlatformData(props,onGroupNameUpdatedMap)} 收到通知。




:::if{props.platform=undefined}
<CodeGroup>
```java title="示例代码"
// 群内成员 修改群名
// groupName 最大 64 字节的字符串，无特殊字符限制。
zim.updateGroupName("new_group_name", "group_id", new ZIMGroupNameUpdatedCallback() {
    @Override
    public void onGroupNameUpdated(ZIMError errorInfo) {
    }
});
```
</CodeGroup>
:::
:::if{props.platform="iOS|mac"}
<CodeGroup>
```objc title="示例代码"
// 群内成员 修改群名
// groupName 最大 64 字节的字符串，无特殊字符限制。
[zim updateGroupName:groupName groupID:groupID callback:^(ZIMError * _Nonnull errorInfo) {
        //这里写调用修改群名称接口后的业务代码
}];
```
</CodeGroup>
:::
:::if{props.platform="window"}
<CodeGroup>
```Cpp title="示例代码"
// 群内成员 修改群名
// groupName 最大 64 字节的字符串，无特殊字符限制。
zim_->updateGroupName("new_group_name", group_id, 
    [=](/zim-uniapp-x/guides/group/const-std::string-&groupid,-const-std::string-&groupname,-zim::zimerror-errorinfo){
        int error_code = errorInfo.code;    
    });
```
</CodeGroup>
:::
:::if{props.platform="Flutter"}
<CodeGroup>
```dart title="示例代码"
// 群内成员 修改群名
// groupName 最大 64 字节的字符串，无特殊字符限制。
ZIM.getInstance()
  !.updateGroupName('groupName', 'groupID')
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
// 群内成员 修改群名
// groupName 最大 64 字节的字符串，无特殊字符限制。
const groupID = '';
const groupName = '';
zim.updateGroupName(groupName, groupID)
    .then((res: ZIMGroupNameUpdatedResult) => {
        // 操作成功
    })
    .catch((err: ZIMError) => {
        // 操作失败
    });

// 注册监听“群名更新”的回调
zim.on('groupNameUpdated', (zim, data) => {
    console.log('groupNameUpdated', data);
});
```
</CodeGroup>
:::
:::if{props.platform="UTS"}
<CodeGroup>
```typescript title="示例代码"
// 群内成员 修改群名
// groupName 最大 64 字节的字符串，无特殊字符限制。
const groupID = '';
const groupName = '';
zim.updateGroupName(groupName, groupID)
    .then((res: ZIMGroupNameUpdatedResult) => {
        // 操作成功
    })
    .catch((err: ZIMError) => {
        // 操作失败
    });

// 注册监听“群名更新”的回调
zim.onGroupNameUpdated((data) => {
    console.log('groupNameUpdated', data);
});
```
</CodeGroup>
:::
:::if{props.platform="U3d"}
<CodeGroup>
```cs title="示例代码"
// 群内成员 修改群名
// groupName 最大 64 字节的字符串，无特殊字符限制。
ZIM.GetInstance().UpdateGroupName("newGroupName", "groupID", (string groupID, string groupName, ZIMError errorInfo) => { });
```
</CodeGroup>
:::


### 修改群头像

用户登录、并加入某个群组后，如果想要修改自己加入群组的群头像，可以通过调用 {getPlatformData(props,updateGroupAvatarUrlMap)} 接口，修改群组头像。

修改成功后，全体群成员都可以通过 {getPlatformData(props,onGroupAvatarUrlUpdatedMap)} 收到通知。



:::if{props.platform=undefined}
<CodeGroup>
```java title="示例代码"
// 群内成员 修改群头像
// URL 最大 500 字节，无特殊字符限制
String groupAvatarUrl = "";
String groupId = "";
zim.updateGroupAvatarUrl(groupAvatarUrl, groupId, new ZIMGroupAvatarUrlUpdatedCallback() {
            @Override
            public void onGroupAvatarUrlUpdated(String groupID, String groupAvatarUrl, ZIMError errorInfo) {
                
            }
        });
```
</CodeGroup>

:::
:::if{props.platform="iOS|mac"}
<CodeGroup>
```objc title="示例代码"
// 群内成员 修改群头像
// URL 最大 500 字节，无特殊字符限制
[zim updateGroupAvatarUrl:groupAvatarUrl groupID:groupID callback:^(ZIMError * _Nonnull errorInfo) {
        //这里写调用修改群头像称接口后的业务代码
}];
```
</CodeGroup>
:::

:::if{props.platform="window"}
<CodeGroup>
```cpp title="示例代码"
// 群内成员 修改群头像
// URL 最大 500 字节，无特殊字符限制
zim_->updateGroupAvatarUrl("new_group_avatar_url", group_id, 
    [=](/zim-uniapp-x/guides/group/const-std::string-&groupid,-const-std::string-&groupname,-zim::zimerror-errorinfo){
        int error_code = errorInfo.code;    
    });
```
</CodeGroup>
:::
:::if{props.platform="Flutter"}
<CodeGroup>
```dart title="示例代码"
// 群内成员 修改群头像
// groupAvatarUrl 最大 500 字节的字符串，无特殊字符限制。
ZIM.getInstance()
  !.updateGroupAvatarUrl('groupAvatarUrl', 'groupID')
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
// 群内成员 修改群头像
// URL 最大 500 字节，无特殊字符限制
const groupID = '';
const groupAvatarUrl = '';
zim.updateGroupAvatarUrl(groupAvatarUrl, groupID)
    .then((res: ZIMGroupAvatarUrlUpdatedResult) => {
        // 操作成功
    })
    .catch((err: ZIMError) => {
        // 操作失败
    });

// 注册监听“群头像 URL 更新”的回调
zim.on('groupAvatarUrlUpdated', (zim, data) => {
    console.log('groupAvatarUrlUpdated', data);
});
```
</CodeGroup>
:::
:::if{props.platform="UTS"}
<CodeGroup>
```typescript title="示例代码"
// 群内成员 修改群头像
// URL 最大 500 字节，无特殊字符限制
const groupID = '';
const groupAvatarUrl = '';
zim.updateGroupAvatarUrl(groupAvatarUrl, groupID)
    .then((res: ZIMGroupAvatarUrlUpdatedResult) => {
        // 操作成功
    })
    .catch((err: ZIMError) => {
        // 操作失败
    });

// 注册监听“群头像 URL 更新”的回调
zim.onGroupAvatarUrlUpdated((data) => {
    console.log('groupAvatarUrlUpdated', data);
});
```
</CodeGroup>
:::
:::if{props.platform="U3d"}
<CodeGroup>
```cs title="示例代码"
// 群内成员 修改群头像
// URL 最大 500 字节，无特殊字符限制
ZIM.GetInstance().UpdateGroupAvatarUrl("groupAvatarUrl", "groupID", (string groupID, string groupAvatarUrl, ZIMError errorInfo) => { });
```
</CodeGroup>
:::



### 修改群公告


用户登录、并加入某个群组后，如果想要修改自己加入群组的群公告，可以通过调用 {getPlatformData(props,updateGroupNoticeMap)} 接口，修改群组公告。

修改成功后，全体群成员都可以通过 {getPlatformData(props,onGroupNoticeUpdatedMap)} 收到通知。




:::if{props.platform=undefined}
<CodeGroup>
```java title="示例代码"
// 群内成员 修改群公告
zim.updateGroupNotice("new_group_notice", group_id, new ZIMGroupNameUpdatedCallback() {
    @Override
    public void onGroupNoticeUpdated(ZIMError errorInfo) {
        // 通过 errorInfo.code 获取修改群名的结果     
    }
});
```
</CodeGroup>
:::
:::if{props.platform="iOS|mac"}
<CodeGroup>
```objc title="示例代码"
// 群内成员 修改群公告
[zim updateGroupNotice:groupNotice groupID:groupID callback:^(ZIMError * _Nonnull errorInfo) {
        //这里写调用修改群公告接口后的业务代码
}];
```
</CodeGroup>
:::
:::if{props.platform="window"}
<CodeGroup>
```Cpp title="示例代码"
// 群内成员 修改群公告
zim_->updateGroupNotice("new_group_notice", group_id, 
    [=](/zim-uniapp-x/guides/group/const-std::string-&groupid,-const-std::string-&groupnotice,-zimerror-errorinfo){
        int error_code = errorInfo.code;
    });
```
</CodeGroup>
:::
:::if{props.platform="Flutter"}
<CodeGroup>
```dart title="示例代码"
// 群内成员 修改群公告
ZIM.getInstance()
  !.updateGroupNotice('groupNotice', 'groupID')
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
// 群内成员 修改群公告
const groupID = '';
const groupNotice = '';
zim.updateGroupNotice(groupNotice, groupID)
    .then((res: ZIMGroupNoticeUpdatedResult) => {
        // 操作成功
    })
    .catch((err: ZIMError) => {
        // 操作失败
    });

// 注册监听“群公告更新”的回调
zim.on('groupNoticeUpdated', (zim, data) => {
    console.log('groupNoticeUpdated', data);
});
```
</CodeGroup>
:::
:::if{props.platform="UTS"}
<CodeGroup>
```typescript title="示例代码"
// 群内成员 修改群公告
const groupID = '';
const groupNotice = '';
zim.updateGroupNotice(groupNotice, groupID)
    .then((res: ZIMGroupNoticeUpdatedResult) => {
        // 操作成功
    })
    .catch((err: ZIMError) => {
        // 操作失败
    });

// 注册监听“群公告更新”的回调
zim.onGroupNoticeUpdated((data) => {
    console.log('groupNoticeUpdated', data);
});
```
</CodeGroup>
:::
:::if{props.platform="U3d"}
<CodeGroup>
```cs title="示例代码"
// 群内成员 修改群公告
ZIM.GetInstance().UpdateGroupNotice("new_group_notice", "group_id", (string groupID, string groupNotice, ZIMError errorInfo) =>
    {
        // 通过 errorInfo.code 获取修改群名的结果     
    }
);
```
</CodeGroup>
:::




:::if{props.platform="undefined|iOS|mac|window|Flutter|Web|RN|UTS"}

### 修改群备注

群备注，是用户为群聊设置个性化的备注名称，以便于区分不同的群聊。例如，可以将工作群备注为“工作群”，家庭群备注为“家庭群”，这样在识别群聊时会更加方便。

<Note title="说明">

群备注仅用户自己可见，不会影响其他群聊成员的群名称显示。
</Note>

用户登录、并加入某个群组后，如果想要修改群组的群备注，可以通过调用 {getPlatformData(props,updateGroupAliasMap)} 接口，修改群组备注，群备注仅该用户自身可见，且对应会话的备注也会自动同步。

:::

:::if{props.platform=undefined}
```java
// 修改备注
// groupAlias 最大 256 字节的字符串，无特殊字符限制。
String group_alias = "NewAlias";
String group_id = "GroupID";
zim.updateGroupAlias(group_alias, group_id, new ZIMGroupAliasUpdatedCallback() {
    @Override
    public void onGroupAliasUpdated(String groupID, String groupAlias, ZIMError errorInfo) {
        // 通过 errorInfo.code 获取修改群备注的结果     
    }
});
```
:::
:::if{props.platform="iOS|mac"}
```objc
// 修改备注
// groupAlias 最大 256 字节的字符串，无特殊字符限制。
NSString *groupAlias = @"NewAlias";
NSString *groupID = @"GroupID";
[zim updateGroupAlias:groupAlias groupID:groupID callback:^(NSString *groupID, NSString *groupAlias, ZIMError *errorInfo) {
        //这里写调用修改群备注接口后的业务代码
}];
```
:::
:::if{props.platform="window"}
```Cpp
// 修改备注
// groupAlias 最大 256 字节的字符串，无特殊字符限制。
std::string group_alias = "NewAlias";
std::string group_id = "GroupID";
zim_->updateGroupAlias(group_alias, group_id, 
    [=](/zim-uniapp-x/guides/group/const-std::string-&groupid,-const-std::string-&groupalias,-zim::zimerror-errorinfo){
        int error_code = errorInfo.code;    
    });
```
:::
:::if{props.platform="Flutter"}
```dart
// 修改备注
// groupAlias 最大 256 字节的字符串，无特殊字符限制。
String groupAlias = 'newAlias';
String groupId = 'groupID';
try{
    ZIMGroupAliasUpdatedResult? result = await ZIM.getInstance()?.updateGroupAlias(groupAlias, groupId);
} on PlatformException catch (onError){
    onError.code; // 修改群备注失败，失败错误码
    onError.message; // 修改群备注的错误信息
}
```
:::
:::if{props.platform="Web|RN|UTS"}
```typescript
// 修改备注
// groupAlias 最大 256 字节的字符串，无特殊字符限制。
try {
    const groupAlias = "new_group_alias_example"; // 最大 256 字节，无特殊字符限制
    const groupID = "example_group_id"; // 群组 ID 示例

    // 调用 updateGroupAlias 方法
    const result = await zim.updateGroupAlias(groupAlias, groupID);
    console.log("群别名更新成功:", result);
} catch (error) {
    console.error("群别名更新失败:", error);
}
```
:::

:::if{props.platform="undefined|iOS|mac|window|Flutter|Web|RN|UTS"}

修改成功后，该用户的所有端都可以通过 {getPlatformData(props,onGroupAliasUpdatedMap)} 收到通知。

:::

:::if{props.platform=undefined}
```java
// 监听群备注修改通知
public class SelfEventHandler extends ZIMEventHandler {
    @Override
    public void onGroupAliasUpdated(ZIM zim, String groupAlias, String operatedUserID, String groupID) {
        // 业务逻辑
    }
}
```
:::
:::if{props.platform="iOS|mac"}
```objc
@interface ZIMEventHandlerImpl : NSObject<ZIMEventHandler>

+(ZIMEventHandlerImpl *)getInstance();

@end

@implementation ZIMEventHandlerImpl

// 监听群备注修改通知
- (void)zim:(ZIM *)zim
    groupAliasUpdated:(NSString *)groupAlias
       operatedUserID:(NSString *)operatedUserID
              groupID:(NSString *)groupID {
    // 业务逻辑
}

// 其余回调事件..

@end

ZIMEventHandlerImpl *eventHandlerImpl = [ZIMEventHandlerImpl getInstance];

[zim setEventHandler: eventHandlerImpl];
```
:::
:::if{props.platform="window"}
```Cpp
// 监听群备注修改通知
class zim_event_handler : public zim::ZIMEventHandler {
    void onGroupAliasUpdated(ZIM * /*zim*/, const std::string & /*groupAlias*/,
                                     const std::string & /*operatedUserID*/,
                                     const std::string & /*groupID*/) override {
        // 业务逻辑
    }
}
```
:::
:::if{props.platform="Flutter"}
```dart
// 监听群备注修改通知
ZIMEventHandler.onGroupAliasUpdated = (ZIM zim, String groupAlias, String operatedUserID, String groupID){
    // 业务逻辑
};
```
:::
:::if{props.platform="Web|RN"}
```typescript
// 监听群备注修改通知
zim.on('groupAliasUpdated', (zim, data) => {
    // 在这里可以处理群别名更新后的逻辑，例如更新 UI 或提示用户
});
```
:::
:::if{props.platform="UTS"}
```typescript
// 监听群备注修改通知
zim.onGroupAliasUpdated((data) => {
    // 在这里可以处理群别名更新后的逻辑，例如更新 UI 或提示用户
});
```
:::

:::if{props.platform="undefined|iOS|mac|window|Flutter|Web|RN|UTS"}

此外，该用户还会收到 {getPlatformData(props,onConversationChangedMap)} 回调，得知 `conversationAlias`（会话别名）更新，详情请参考 [获取会话列表 - 监听会话变更](/zim-uniapp-x/guides/conversation/get-the-conversation-list)。

:::
<Content  platform="UTS" />