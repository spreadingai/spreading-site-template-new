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

export const createGroup1Map = {
  'Android': <a href="@createGroup__1" target='_blank'>createGroup</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/createGroup.html" target='_blank'>createGroup</a>,
}
export const ZIMGroupCreatedCallbackMap = {
  'Android': <a href="@-ZIMGroupCreatedCallback" target='_blank'>ZIMGroupCreatedCallback</a>,
  'window,iOS,mac': <a href="@ZIMGroupCreatedCallback" target='_blank'>ZIMGroupCreatedCallback</a>,
  'Web,UTS': <a href="@-ZIMGroupCreatedResult" target='_blank'>ZIMGroupCreatedResult</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMGroupCreatedResult-class.html" target='_blank'>ZIMGroupCreatedCallback</a>,
}
export const createGroupMap = {
  'Android': <a href="@createGroup" target='_blank'>createGroup</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/createGroup.html" target='_blank'>createGroup</a>,
}
export const joinGroupMap = {
  'Android': <a href="@joinGroup" target='_blank'>joinGroup</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/joinGroup.html" target='_blank'>joinGroup</a>,
}
export const onGroupMemberStateChangedMap = {
  'Android': <a href="@onGroupMemberStateChanged" target='_blank'>onGroupMemberStateChanged</a>,
  'Web': <a href="@groupMemberStateChanged" target='_blank'>groupMemberStateChanged</a>,
  'UTS': <a href="@groupMemberStateChanged" target='_blank'>onGroupMemberStateChanged</a>,
  'iOS': <a href="https://doc-zh.zego.im/article/api?doc=zim_API~objectivec_ios~protocol~ZIMEventHandler#zim-group-member-state-changed-event-user-list-operated-info-group-id" target='_blank'>groupMemberStateChanged</a>,
  'mac': <a href="https://doc-zh.zego.im/article/api?doc=zim_API~objectivec_macos~protocol~ZIMEventHandler#zim-group-member-state-changed-event-user-list-operated-info-group-id" target='_blank'>groupMemberStateChanged</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMEventHandler/onGroupMemberStateChanged.html" target='_blank'>onGroupMemberStateChanged</a>,
}
export const onGroupStateChangedMap = {
  'Android': <a href="@onGroupStateChanged" target='_blank'>onGroupStateChanged</a>,
  'Web': <a href="@groupStateChanged" target='_blank'>groupStateChanged</a>,
  'UTS': <a href="@groupStateChanged" target='_blank'>onGroupStateChanged</a>,
  'iOS': <a href="https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_ios~protocol~ZIMEventHandler#zim-group-state-changed-operated-info-group-id" target='_blank'>groupStateChanged</a>,
  'mac': <a href="https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_macos~protocol~ZIMEventHandler#zim-group-state-changed-operated-info-group-id" target='_blank'>groupStateChanged</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMEventHandler/onGroupStateChanged.html" target='_blank'>onGroupStateChanged</a>,
}
export const joinModeMap = {
  'Android': <a href="@joinMode" target='_blank'>joinMode</a>,
}
export const sendGroupJoinApplicationMap = {
  'Android': <a href="@sendGroupJoinApplication" target='_blank'>sendGroupJoinApplication</a>,
  'iOS,mac': <a href="@sendGroupJoinApplicationToGroupID" target='_blank'>sendGroupJoinApplicationToGroupID</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/sendGroupJoinApplication.html" target='_blank'>sendGroupJoinApplication</a>,
}
export const onGroupApplicationListChangedMap = {
  'Android': <a href="@onGroupApplicationListChanged" target='_blank'>onGroupApplicationListChanged</a>,
  'Web': <a href="@groupApplicationListChanged" target='_blank'>groupApplicationListChanged</a>,
  'UTS': <a href="@groupApplicationListChanged" target='_blank'>onGroupApplicationListChanged</a>,
  'iOS': <a href="https://doc-zh.zego.im/article/api?doc=zim_API~objectivec_ios~protocol~ZIMEventHandler#zim-group-application-list-changed" target='_blank'>groupApplicationListChanged</a>,
  'mac': <a href="https://doc-zh.zego.im/article/api?doc=zim_API~objectivec_macos~protocol~ZIMEventHandler#zim-group-application-list-changed" target='_blank'>groupApplicationListChanged</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMEventHandler/onGroupApplicationListChanged.html" target='_blank'>onGroupApplicationListChanged</a>,
}
export const acceptGroupJoinApplicationMap = {
  'Android': <a href="@acceptGroupJoinApplication" target='_blank'>acceptGroupJoinApplication</a>,
  'iOS,mac': <a href="@acceptGroupJoinApplicationFromUserID" target='_blank'>acceptGroupJoinApplicationFromUserID</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/acceptGroupJoinApplication.html" target='_blank'>acceptGroupJoinApplication</a>,
}
export const rejectGroupJoinApplicationMap = {
  'Android': <a href="@rejectGroupJoinApplication" target='_blank'>rejectGroupJoinApplication</a>,
  'iOS,mac': <a href="@rejectGroupJoinApplicationFromUserID" target='_blank'>rejectGroupJoinApplicationFromUserID</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/rejectGroupJoinApplication.html" target='_blank'>rejectGroupJoinApplication</a>,
}
export const onGroupApplicationUpdatedMap = {
  'Android': <a href="@onGroupApplicationUpdated" target='_blank'>onGroupApplicationUpdated</a>,
  'Web': <a href="@groupApplicationUpdated" target='_blank'>groupApplicationUpdated</a>,
  'UTS': <a href="@groupApplicationUpdated" target='_blank'>onGroupApplicationUpdated</a>,
  'iOS': <a href="https://doc-zh.zego.im/article/api?doc=zim_API~objectivec_ios~protocol~ZIMEventHandler#zim-group-application-updated" target='_blank'>groupApplicationUpdated</a>,
  'mac': <a href="https://doc-zh.zego.im/article/api?doc=zim_API~objectivec_macos~protocol~ZIMEventHandler#zim-group-application-updated" target='_blank'>groupApplicationUpdated</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMEventHandler/onGroupApplicationUpdated.html" target='_blank'>onGroupApplicationUpdated</a>,
}
export const loginMap = {
  'Android': <a href="@login__2" target='_blank'>login</a>,
  'iOS': <a href="https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_ios~protocol~ZIM#login-with-user-id-config-callback-2" target='_blank'>loginWithUserID</a>,
  'mac': <a href="https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_macos~protocol~ZIM#login-with-user-id-config-callback-2" target='_blank'>login</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/login.html" target='_blank'>login</a>,
}
export const inviteUsersIntoGroupMap = {
  'Android': <a href="@inviteUsersIntoGroup" target='_blank'>inviteUsersIntoGroup</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/inviteUsersIntoGroup.html" target='_blank'>inviteUsersIntoGroup</a>,
}
export const loginWithUserInfoMap = {
  'Android': <a href="@login" target='_blank'>login</a>,
  'iOS,mac': <a href="@loginWithUserInfo" target='_blank'>loginWithUserInfo</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/login.html" target='_blank'>login</a>,
}
export const sendGroupInviteApplicationsMap= {
  'Android': <a href="@sendGroupInviteApplications" target='_blank'>sendGroupInviteApplications</a>,
  'iOS,mac': <a href="@sendGroupJoinApplicationToGroupID" target='_blank'>sendGroupJoinApplicationToGroupID</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/sendGroupInviteApplications.html" target='_blank'>sendGroupInviteApplications</a>,
}
export const inviteModeMap = {
  'Android': <a href="@inviteMode" target='_blank'>inviteMode</a>,
  'Flutter': "inviteMode",
}
export const beInviteModeMap = {
  'Android': <a href="@beInviteMode" target='_blank'>beInviteMode</a>,
  'Flutter': "beInviteMode",
}
export const acceptGroupInviteApplicationMap = {
  'Android': <a href="@acceptGroupInviteApplication" target='_blank'>acceptGroupInviteApplication</a>,
  'iOS,mac': <a href="@acceptGroupJoinApplicationFromUserID" target='_blank'>acceptGroupJoinApplicationFromUserID</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/acceptGroupInviteApplication.html" target='_blank'>acceptGroupInviteApplication</a>,
}
export const rejectGroupInviteApplicationMap = {
  'Android': <a href="@rejectGroupInviteApplication" target='_blank'>rejectGroupInviteApplication</a>,
  'iOS,mac': <a href="@rejectGroupJoinApplicationFromUserID" target='_blank'>rejectGroupJoinApplicationFromUserID</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/rejectGroupInviteApplication.html" target='_blank'>rejectGroupInviteApplication</a>,
}
export const leaveGroupMap = {
  'Android': <a href="@leaveGroup" target='_blank'>leaveGroup</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/leaveGroup.html" target='_blank'>leaveGroup</a>,
}
export const kickGroupMembersMap = {
  'Android': <a href="@kickGroupMembers" target='_blank'>kickGroupMembers</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/kickGroupMembers.html" target='_blank'>kickGroupMembers</a>,
}
export const dismissGroupMap = {
  'Android': <a href="@dismissGroup" target='_blank'>dismissGroup</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/dismissGroup.html" target='_blank'>dismissGroup</a>,
}
export const queryGroupListMap = {
  'Android': <a href="@queryGroupList" target='_blank'>queryGroupList</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/queryGroupList.html" target='_blank'>queryGroupList</a>,
}
export const searchLocalGroupsMap = {
  'Android': <a href="@searchLocalGroups" target='_blank'>searchLocalGroups</a>,
  'iOS,mac': <a href="@searchLocalGroupsWithConfig" target='_blank'>searchLocalGroupsWithConfig</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/searchLocalGroups.html" target='_blank'>searchLocalGroups</a>,
}
export const ZIMGroupsSearchedCallbackMap = {
  'Android': <a href="@-ZIMGroupsSearchedCallback" target='_blank'>ZIMGroupsSearchedCallback</a>,
  'window,iOS,mac': <a href="@ZIMGroupsSearchedCallback" target='_blank'>ZIMGroupsSearchedCallback</a>,
  'Web,UTS': <a href="@-ZIMGroupsSearchedResult" target='_blank'>ZIMGroupsSearchedResult</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMGroupsSearchedResult-class.html" target='_blank'>ZIMGroupsSearchedResult</a>,
}
export const muteGroupMap = {
  'Android': <a href="@muteGroup" target='_blank'>muteGroup</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/muteGroup.html" target='_blank'>muteGroup</a>,
}
export const ZIMGroupMutedCallbackMap = {
  'Android': <a href="@-ZIMGroupMutedCallback" target='_blank'>ZIMGroupMutedCallback</a>,
  'window,iOS,mac': <a href="@ZIMGroupMutedCallback" target='_blank'>ZIMGroupMutedCallback</a>,
  'Web,UTS': <a href="@-ZIMGroupMutedResult" target='_blank'>ZIMGroupMutedResult</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMGroupMutedResult-class.html" target='_blank'>ZIMGroupMutedResult</a>,
}
export const onGroupMutedInfoUpdatedMap = {
  'Android': <a href="@onGroupMutedInfoUpdated" target='_blank'>onGroupMutedInfoUpdated</a>,
  'Web': <a href="@groupMutedInfoUpdated" target='_blank'>groupMutedInfoUpdated</a>,
  'UTS': <a href="@groupMutedInfoUpdated" target='_blank'>onGroupMutedInfoUpdated</a>,
  'iOS': <a href="https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_ios~protocol~ZIMEventHandler#zim-group-muted-info-updated-operated-info-group-id" target='_blank'>groupMutedInfoUpdated</a>,
  'mac': <a href="https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_macos~protocol~ZIMEventHandler#zim-group-muted-info-updated-operated-info-group-id" target='_blank'>groupMutedInfoUpdated</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMEventHandler/onGroupMutedInfoUpdated.html" target='_blank'>onGroupMutedInfoUpdated</a>,
}
export const isDisabledMap = {
  'Android': <a href="@isDisabled-ZIMGroupConversation" target='_blank'>isDisabled</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMGroupConversation/isDisabled.html" target='_blank'>isDisabled</a>,
}
export const ZIMGroupConversationMap = {
  'Android': <a href="@-ZIMGroupConversation" target='_blank'>ZIMGroupConversation</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMGroupConversation-class.html" target='_blank'>ZIMGroupConversation</a>,
}
export const updateGroupJoinModeMap = {
  'Android': <a href="@updateGroupJoinMode" target='_blank'>updateGroupJoinMode</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/updateGroupJoinMode.html" target='_blank'>updateGroupJoinMode</a>,
}
export const updateGroupInviteModeMap = {
  'Android': <a href="@updateGroupInviteMode" target='_blank'>updateGroupInviteMode</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/updateGroupInviteMode.html" target='_blank'>updateGroupInviteMode</a>,
}
export const onGroupVerifyInfoUpdatedMap = {
  'Android': <a href="@onGroupVerifyInfoUpdated" target='_blank'>onGroupVerifyInfoUpdated</a>,
  'Web': <a href="@groupVerifyInfoUpdated" target='_blank'>groupVerifyInfoUpdated</a>,
  'UTS': <a href="@groupVerifyInfoUpdated" target='_blank'>onGroupVerifyInfoUpdated</a>,
  'iOS': <a href="https://doc-zh.zego.im/article/api?doc=zim_API~objectivec_ios~protocol~ZIMEventHandler#zim-group-verify-info-updated-operated-info-group-id" target='_blank'>groupVerifyInfoUpdated</a>,
  'mac': <a href="https://doc-zh.zego.im/article/api?doc=zim_API~objectivec_macos~protocol~ZIMEventHandler#zim-group-verify-info-updated-operated-info-group-id" target='_blank'>groupVerifyInfoUpdated</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMEventHandler/onGroupVerifyInfoUpdated.html" target='_blank'>onGroupVerifyInfoUpdated</a>,
}
export const updateGroupBeInviteModeMap = {
  'Android': <a href="@updateGroupBeInviteMode" target='_blank'>updateGroupBeInviteMode</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/updateGroupBeInviteMode.html" target='_blank'>updateGroupBeInviteMode</a>,
}
export const queryGroupApplicationListMap = {
  'Android': <a href="@queryGroupApplicationList" target='_blank'>queryGroupApplicationList</a>,
  'iOS,mac': <a href="@queryGroupApplicationListWithConfig" target='_blank'>queryGroupApplicationListWithConfig</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/queryGroupApplicationList.html" target='_blank'>queryGroupApplicationList</a>,
}



# 群组管理

- - -

## 功能简介
:::if{props.platform="Flutter"}
<Note title="说明">
本文档适用于开发以下平台的应用：iOS、Android、macOS、Windows、Web。
</Note>
:::

ZIM SDK 提供了群组管理功能，支持用户创建/解散群组、加入/退出群组，持久化维系群组关系。

群组管理功能可应用于办公群、社交群、兴趣群以及粉丝群等场景中，群组成员数量上限请参考 [计费说明](/zim-flutter/guides/content-moderation/instruction)。


## 创建群组

客户端 A 登录 ZIM SDK 后，调用 {getPlatformData(props,createGroupMap)} 接口，设置高级配置，创建一个群组，此时 A 就是 `群主`；其他客户端可以根据 A 创建的群组 groupID 加入群组。

开发者可以通过 {getPlatformData(props,ZIMGroupCreatedCallbackMap)} ，判断群组是否创建成功。相关错误码请查看 [常见错误码](/zim-flutter/sdk-error-codes/zim)。

<Warning title="注意">

- “groupID” 支持开发者自定义规则生成，仅支持数字，英文字符和 {"'!'、'#'、'
<Content platform="Flutter" />
、'%'、'&'、'('、')'、'+'、'-'、':'、';'、'<'、'='、'.'、'>'、'?'、'@'、'['、']'、'^'、'_'、'{'、'}'、'|'、'~'"}，且不能以 ’#‘ 开头；若该字段为空，ZIM 服务器会自动生成。建议开发者将 “groupID” 设置为一个有意义的值，可将其与自己的业务账号系统进行关联。
- 调用 {getPlatformData(props,createGroupMap)} 接口创建群组后，会直接加入群组，无需再调用 {getPlatformData(props,joinGroupMap)} 接口加入群组。
- 用户创建群组时，该用户即是该群组的“群主”。如果想要转让身份，请参考 [转让群主](/zim-flutter/guides/group/group-members#转让群主)。
- 如需规定群组人数上限，以及入群模式（包括验证模式、邀请模式和被邀请人是否需要同意），请集成 2.15.0 或以上版本的 SDK。
</Warning>


:::if{props.platform=undefined}
```java
// 创建一个群组
// groupID 最大 32 字节的字符串。仅支持数字，英文字符 和 '!', '#', '
<Content platform="Flutter" />
, '%', '&', '(', ')', '+', '-', ':', ';', '<', '=', '.', '>', '?', '@', '[', ']', '^', '_', '{', '}', '|', '~'，且不能以 ’#‘ 开头。
// groupName 最大 50 字节的字符串，无特殊字符限制。
ZIMGroupInfo groupInfo = new ZIMGroupInfo();
groupInfo.groupID = "group_id";
groupInfo.groupName = "groupName";
groupInfo.groupAvatarUrl = "groupAvatarUrl";

ZIMGroupAdvancedConfig config = new ZIMGroupAdvancedConfig();
HashMap<String, String> attributes = new HashMap<>();
attributes.put("key_0", "value_0");
attributes.put("key_1", "value_1");
attributes.put("key_2", "value_2");
config.groupAttributes = attributes;
// 主动加群验证模式
config.joinMode = ZIMGroupJoinMode.ANY;
// 邀请进群验证模式
config.inviteMode = ZIMGroupInviteMode.ANY;
// 被邀请入群验证模式
config.beInviteMode = ZIMGroupBeInviteMode.NONE;
// 成员数量限制
config.maxMemberCount = 300;

ArrayList<String> userList = new ArrayList<>();
userList.add("user_1");
userList.add("user_2");

zim.createGroup(groupInfo, userList, config, new ZIMGroupCreatedCallback() {
    @Override
    public void onGroupCreated(ZIMGroupFullInfo groupInfo, ArrayList<ZIMGroupMemberInfo> userIDs, ArrayList<ZIMErrorUserInfo> errorUserList, ZIMError errorInfo) {
        // 通过 errorInfo.code 获取创建群的结果
    }
});
```
:::
:::if{props.platform="Flutter"}
```dart
// 创建一个群组
// groupID 最大 32 字节的字符串。仅支持数字，英文字符 和 '!', '#', '
<Content platform="Flutter" />
, '%', '&', '(', ')', '+', '-', ':', ';', '<', '=', '.', '>', '?', '@', '[', ']', '^', '_', '{', '}', '|', '~'，且不能以 ’#‘ 开头。
// groupName 最大 50 字节的字符串，无特殊字符限制
ZIMGroupInfo groupInfo = ZIMGroupInfo();
groupInfo.groupID = 'groupID';
groupInfo.groupName = 'groupName';
List<String> inviteUserIDs = ['userID1', 'userID2'];
ZIMGroupAdvancedConfig advancedConfig = ZIMGroupAdvancedConfig();
// 主动加群模式
// 
advancedConfig.joinMode = ZIMGroupJoinMode.any;
// 邀请进群验证模式
advancedConfig.inviteMode = ZIMGroupInviteMode.any;
// 被邀请入群验证模式
advancedConfig.beInviteMode = ZIMGroupBeInviteMode.none;
//成员数量限制
advancedConfig.maxMemberCount = 300;
try{
    await ZIM.getInstance()!.createGroup(groupInfo, inviteUserIDs,advancedConfig);
    //这里写创建群组后的业务逻辑
    } on PlatformException catch(onError){
    onError.code;
    onError.message;
}
```
:::
:::if{props.platform="window"}
```Cpp
// 创建一个群组
// groupID 最大 32 字节的字符串。仅支持数字，英文字符 和 '!', '#', '
<Content platform="Flutter" />
, '%', '&', '(', ')', '+', '-', ':', ';', '<', '=', '.', '>', '?', '@', '[', ']', '^', '_', '{', '}', '|', '~'，且不能以 ’#‘ 开头。
// groupName 最大 50 字节的字符串，无特殊字符限制。
zim::ZIMGroupInfo group_info;
group_info.groupID = "group_id";
group_info.groupName = "groupName";
group_info.groupAvatarUrl = "groupAvatarUrl";

zim::ZIMGroupAdvancedConfig config;

config.groupAttributes.emplace("key_0", "value_0");
config.groupAttributes.emplace("key_1", "value_1");
config.groupAttributes.emplace("key_2", "value_2");

/**
 * 入群验证模式，仅支持 2.15.0 及以上版本的 ZIM SDK
 * ZIM_GROUP_JOIN_MODE_ANY：0，默认值，任何人可直接加群。
 * ZIM_GROUP_JOIN_MODE_AUTH：1，需要群主或管理员审批才能入群。
 * ZIM_GROUP_JOIN_MODE_FORBID：2，禁止其他用户入群。
 */
config.joinMode = zim::ZIMGroupJoinMode::ZIM_GROUP_JOIN_MODE_AUTH;
/**
 * 邀请模式，仅支持 2.15.0 及以上版本的 ZIM SDK
 * ZIM_GROUP_INVITE_MODE_ANY：0，默认值，任何群成员都可以邀请外部成员入群。
 * ZIM_GROUP_INVITE_MODE_ADMIN：1，仅限群主或管理员可以邀请外部成员入群
 */
config.inviteMode = zim::ZIMGroupInviteMode::ZIM_GROUP_INVITE_MODE_ADMIN;
/**
 * 邀请目标用户验证模式，仅支持 2.15.0 及以上版本的 ZIM SDK
 * ZIM_GROUP_BEINVITE_MODE_NONE：0，默认值，无需被邀请人同意，该用户自动成为群成员。
 * ZIM_GROUP_BEINVITE_MODE_AUTH：1，被邀请人同意后成为群成员。
 */
config.beInviteMode = zim::ZIMGroupBeInviteMode::ZIM_GROUP_BE_INVITE_MODE_AUTH;
/**
 * 群组人数上限，仅支持 2.15.0 及以上版本的 ZIM SDK
 * 取值范围: [0, 套餐默认的最大群成员数量]。
 */ 
config.maxMemberCount = 100;


std::vector<std::string> user_list;
user_list.push_back("user_1");
user_list.push_back("user_2");

zim_->createGroup(group_info, user_list, config, 
    [=](/zim-flutter/guides/group/const-zim::zimgroupfullinfo-&groupinfo,-const-std::vector<zim::zimgroupmemberinfo>-&userlist,-const-std::vector<zim::zimerroruser>-&erroruserlist,-zim::zimerror-errorinfo-{-int-error_code-=-errorinfo.code;-});
```
:::
:::if{props.platform="Web|UTS"}
```typescript
// groupID 最大 32 字节的字符串。仅支持数字，英文字符 和 '!', '#', '
<Content platform="Flutter" />
, '%', '&', '(', ')', '+', '-', ':', ';', '<', '=', '.', '>', '?', '@', '[', ']', '^', '_', '{', '}', '|', '~'，且不能以 ’#‘ 开头。
// groupName 最大 50 字节的字符串，无特殊字符限制。
const groupInfo: ZIMGroupInfo = { groupID: '', groupName: '', groupAvatarUrl: '' };
const userIDs = [];


// 设置入群模式和群组人数上限
const config: ZIMGroupAdvancedConfig = {
    /**
     * 入群验证模式，仅支持 2.15.0 及以上版本的 ZIM SDK
     * 0：（默认）任何人可直接加群。
     * 1：需要群主或管理员审批才能入群。
     * 2：禁止其他用户入群。
     */
    joinMode: 1, 
    /**
     * 邀请模式，仅支持 2.15.0 及以上版本的 ZIM SDK
     * 0：（默认）任何群成员都可以邀请外部成员入群。
     * 1：仅限群主或管理员可以邀请外部成员入群。
     */
    inviteMode: 1,
    /**
     * 邀请目标用户验证模式，仅支持 2.15.0 及以上版本的 ZIM SDK
     * 0：（默认）无需被邀请人同意，该用户自动成为群成员。
     * 1：被邀请人同意后成为群成员。
     */
    beInviteMode: 1,
    /**
     * 群组人数上限，仅支持 2.15.0 及以上版本的 ZIM SDK
     * 取值范围: [0, 套餐默认的最大群成员数量]。
     */    
    maxMemberCount: 100 // 限制群成员总人数 100
};
zim.createGroup(groupInfo, userIDs, config)
    .then((res: ZIMGroupCreatedResult) => {
        // 操作成功
    })
    .catch((err: ZIMError) => {
        // 操作失败
    });
```

:::
:::if{props.platform="iOS"}
```objc
// 创建一个群组
// groupID 最大 32 字节的字符串。仅支持数字，英文字符 和 '!', '#', '
<Content platform="Flutter" />
, '%', '&', '(', ')', '+', '-', ':', ';', '<', '=', '.', '>', '?', '@', '[', ']', '^', '_', '{', '}', '|', '~'，且不能以 ’#‘ 开头。
// groupName 最大 50 字节的字符串，无特殊字符限制。
ZIMGroupInfo *groupInfo = [[ZIMGroupInfo alloc] init];
groupInfo.groupID = @"groupID";
groupInfo.groupName = @"groupName";
groupInfo.groupAvatarUrl = @"groupAvatarUrl";

ZIMGroupAdvancedConfig *advancedConfig = [[ZIMGroupAdvancedConfig alloc] init];
// 主动加群验证模式
advancedConfig.joinMode = ZIMGroupJoinModeAny;
// 邀请进群验证模式
advancedConfig.inviteMode = ZIMGroupInviteModeAny;
// 被邀请入群验证模式
advancedConfig.beInviteMode = ZIMGroupBeInviteModeNone;

//成员数量限制
advancedConfig.maxMemberCount = 300;

[[ZIM getInstance] createGroup:groupInfo userIDs:@[@"userID1",@"userID2"] config:advancedConfig callback:^(ZIMGroupFullInfo * _Nonnull groupInfo, NSArray<ZIMGroupMemberInfo *> * _Nonnull userList, NSArray<ZIMErrorUserInfo *> * _Nonnull errorUserList, ZIMError * _Nonnull errorInfo) {
    //这里写创建群组后的业务逻辑
}];
```
:::

## 加入群组

<Note title="说明">

如需用户加入群组后自动获取群历史消息，请联系 ZEGO 技术支持进行配置。
</Note>

其他用户登录 ZIM SDK 后，可以通过主动加入或被邀请加入由 A 创建的群组。

如果用户加入成功后，全体群成员（包括该新成员）都会收到 {getPlatformData(props,onGroupMemberStateChangedMap)} 和 {getPlatformData(props,onGroupStateChangedMap)} 的回调通知：


:::if{props.platform=undefined}
```java
// 监听 onGroupMemberStateChanged 和 onGroupStateChanged
zim.setEventHandler(new ZIMEventHandler(){
    public void onGroupMemberStateChanged(ZIM zim, ZIMGroupMemberState state, ZIMGroupMemberEvent event, ArrayList<ZIMGroupMemberInfo> userList, ZIMGroupOperatedInfo operatedInfo, String groupID) {
          // 群成员状态变化回调通知
    }

    public void onGroupStateChanged(ZIM zim, ZIMGroupState state, ZIMGroupEvent event, ZIMGroupOperatedInfo operatedInfo, ZIMGroupFullInfo groupInfo) {
          // 群状态变化回调通知
    }

});
```
:::
:::if{props.platform="Flutter"}
```dart
//群成员状态变更通知
ZIMEventHandler.onGroupMemberStateChanged = (
    ZIM zim,
    ZIMGroupMemberState state,
    ZIMGroupMemberEvent event,
    List<ZIMGroupMemberInfo> userList,
    ZIMGroupOperatedInfo operatedInfo,
    String groupID
){};

//群状态变更通知
ZIMEventHandler.onGroupStateChanged = (
    ZIM zim,
    ZIMGroupState state,
    ZIMGroupEvent event,
    ZIMGroupOperatedInfo operatedInfo,
    ZIMGroupFullInfo groupInfo
){};
```
:::
:::if{props.platform="window"}
```cpp
void onGroupMemberStateChanged(zim::ZIM *zim, zim::ZIMGroupMemberState state,
                                        zim::ZIMGroupMemberEvent event,
                                        const std::vector<zim::ZIMGroupMemberInfo> &userList,
                                        const zim::ZIMGroupOperatedInfo &operatedInfo,
                                        const std::string &groupID) override {
    ......
}

void onGroupStateChanged(zim::ZIM *zim, zim::ZIMGroupState state,
                                    zim::ZIMGroupEvent event,
                                    const zim::ZIMGroupOperatedInfo &operatedInfo,
                                    const zim::ZIMGroupFullInfo &groupInfo) override {
    ......
}
```

:::
:::if{props.platform="Web"}
```typescript

// 注册监听“群成员状态变更”的回调
zim.on('groupMemberStateChanged', (zim, data) => {
    console.log('groupMemberStateChanged', data);
});

// 注册监听“群状态变更”的回调
zim.on('groupStateChanged', (zim, data) => {
    console.log('groupStateChanged', data);
});

```
:::
:::if{props.platform="UTS"}
```typescript

// 注册监听“群成员状态变更”的回调
zim.onGroupMemberStateChanged((data) => {
    console.log('groupMemberStateChanged', data);
});

// 注册监听“群状态变更”的回调
zim.onGroupStateChanged((data) => {
    console.log('groupStateChanged', data);
});

```
:::
:::if{props.platform="iOS"}
```objc
- (void)zim:(ZIM *)zim
    groupMemberStateChanged:(ZIMGroupMemberState)state
                      event:(ZIMGroupMemberEvent)event
                   userList:(NSArray<ZIMGroupMemberInfo *> *)userList
               operatedInfo:(ZIMGroupOperatedInfo *)operatedInfo
    groupID:(NSString *)groupID{
}
- (void)zim:(ZIM *)zim
    groupStateChanged:(ZIMGroupState)state
                event:(ZIMGroupEvent)event
         operatedInfo:(ZIMGroupOperatedInfo *)operatedInfo
  groupInfo:(ZIMGroupFullInfo *)groupInfo{
}
```
:::

### 方式 1：主动加入群组

根据群组的 {getPlatformData(props,joinModeMap)} ，外部用户需要选择相应的接口加入群组。

- 当 `joinMode` 为 0（ANY），用户调用 {getPlatformData(props,joinGroupMap)} 接口，传入 groupID（groupID 必须已经存在，否则会操作失败），即可直接加入群组。

:::if{props.platform="Flutter"}
开发者可以通过 [ZIMGroupJoinedResult](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMGroupJoinedResult-class.html)，判断用户加入群组是否成功。
:::

:::if{props.platform=undefined}
```java
// 其他客户端直接加入群组
zim.joinGroup("groupID", new ZIMGroupJoinedCallback() {
    @Override
    public void onGroupJoined(ZIMGroupFullInfo groupInfo, ZIMError errorInfo) {
        // 通过 errorInfo.code 获取加入群组的结果
    }
});
```
:::
:::if{props.platform="Flutter"}
```dart
// 其他客户端直接加入群组
ZIM.getInstance()
!.joinGroup('groupID')
.then((value){
    //成功触发此处
})
.catchError((onError) {
    //失败触发此处
});
```
:::
:::if{props.platform="window"}
```cpp
// 其他客户端直接加入群组
zim_->joinGroup(group_id,
                [=](/zim-flutter/guides/group/const-zim::zimgroupfullinfo-&groupinfo,-zim::zimerror-errorinfo) {
        int error_code = errorInfo.code;
    });
```
:::
:::if{props.platform="Web|UTS"}
```typescript
const groupID = '';

// 其他客户端直接加入群组
zim.joinGroup(groupID)
    .then((res: ZIMGroupJoinedResult) => {
        // 操作成功
    })
    .catch((err: ZIMError) => {
        // 操作失败
    });

```
:::
:::if{props.platform="iOS"}
```objc
// 其他客户端直接加入群组
[zim joinGroup:GroupID callback:^(ZIMGroupFullInfo * _Nonnull groupInfo, ZIMError * _Nonnull errorInfo) {
    //这里写调用加入群组接口后的业务逻辑
}];
```
:::

- 当 `joinMode` 为 1（AUTH）时：
    1. 用户调用 {getPlatformData(props,sendGroupJoinApplicationMap)} 接口发起申请。

        
:::if{props.platform=undefined}
```java
ZIMGroupJoinApplicationSendConfig config = new ZIMGroupJoinApplicationSendConfig();
config.wording = "请让我进群";
zim.sendGroupJoinApplication("groupID", config, new ZIMGroupJoinApplicationSentCallback() {
    @Override
    public void onGroupJoinApplicationSent(String groupID, ZIMError errorInfo){
        // 发送群申请结果回调
    }
});
```
:::
:::if{props.platform="Flutter"}
```dart
ZIMGroupJoinApplicationSendConfig sendConfig = ZIMGroupJoinApplicationSendConfig();
sendConfig.wording = '请让我进群';
try{
    var result = await ZIM.getInstance()!.sendGroupJoinApplication('groupID', sendConfig);
} on PlatformException catch (onError){
    onError.code;
    onError.message;
}
``` 
:::
:::if{props.platform="window"}
```cpp
zim::ZIMGroupJoinApplicationSendConfig config;
config.wording = "wording";

zim_->sendGroupJoinApplication(
    group_id, config,
    [=](/zim-flutter/guides/group/const-std::string-&groupid,-const-zim::zimerror-&errorinfo) {
        int error_code = errorInfo.code;
    });
```
:::
:::if{props.platform="Web|UTS"}
```typescript
// 申请加入群组
const groupID = '';
const config: ZIMGroupJoinApplicationSendConfig = {
    wording: 'XXXX 申请加入群组' // 申请附言
};
zim.sendGroupJoinApplication(groupID, config)
    .then((res: ZIMGroupJoinApplicationSentResult) => {
        // 操作成功
    })
    .catch((err: ZIMError) => {
        // 操作失败
    });
```
:::
:::if{props.platform="iOS"}
```objc
ZIMGroupJoinApplicationSendConfig *config = [[ZIMGroupJoinApplicationSendConfig alloc] init];
config.wording = @"请让我进群";
[zim sendGroupJoinApplicationToGroupID:groupID config:config callback:^(NSString * _Nonnull groupID, ZIMError *errorInfo) {        
      // 发送群申请结果回调     
}];
```  
::: 

2. 群主或管理员通过监听 {getPlatformData(props,onGroupApplicationListChangedMap)} 事件，得知新增申请待处理。


:::if{props.platform=undefined}
```java
// 监听 ongGoupApplicationListChanged 事件
zim.setEventHandler(new ZIMEventHandler(){
    public void onGroupApplicationListChanged(ZIM zim, ArrayList<ZIMGroupApplicationInfo> applicationList, ZIMGroupApplicationListChangeAction action) {
    // 群申请列表更新回调通知
    }
});
```
:::
:::if{props.platform="Flutter"}
```dart
ZIMEventHandler.onGroupApplicationListChanged = (ZIM zim,
  List<ZIMGroupApplicationInfo> applicationList,
  ZIMGroupApplicationListChangeAction action){}; 
```
:::
:::if{props.platform="window"}
```cpp
void onGroupApplicationListChanged(
    zim::ZIM * /*zim*/, const std::vector<zim::ZIMGroupApplicationInfo> & /*applicationList*/,
    zim::ZIMGroupApplicationListChangeAction /*action*/) override {
        ......
}
```
:::
:::if{props.platform="Web"}
```typescript
// 监听 groupApplicationListChanged 事件
zim.on('groupApplicationListChanged', (zim, data) => {
    // 新增了入群申请，此时可更新入群申请列表 UI
});
```
:::
:::if{props.platform="UTS"}
```typescript
// 监听 onGroupApplicationListChanged 事件
zim.onGroupApplicationListChanged((data) => {
    // 新增了入群申请，此时可更新入群申请列表 UI
});
```
:::
:::if{props.platform="iOS"}
```objc
// 监听 groupApplicationListChanged 事件
- (void)zim:(ZIM *)zim
groupApplicationListChanged:(NSArray<ZIMGroupApplicationInfo * > *)applicationList
      action:(ZIMGroupApplicationListChangeAction)action{
}      
```
:::

3. 群主或管理员审批
    - 群主或管理员调用 {getPlatformData(props,acceptGroupJoinApplicationMap)} 接口，同意用户入群，用户成功入群。


:::if{props.platform=undefined}
```java
// 同意申请
ZIMGroupJoinApplicationAcceptConfig config = new ZIMGroupJoinApplicationAcceptConfig();
zim.acceptGroupJoinApplication("userID", "groupID", config, new ZIMGroupJoinApplicationAcceptedCallback(){
    public void onGroupJoinApplicationAccepted(String groupID, String userID, ZIMError errorInfo){
        // 同意申请结果回调
    };
});
```
:::

:::if{props.platform="Flutter"}
```dart
// 同意申请
try{
    ZIMGroupJoinApplicationAcceptConfig acceptConfig = ZIMGroupJoinApplicationAcceptConfig();
    var result = await ZIM.getInstance()!.acceptGroupJoinApplication('userID', 'groupID', acceptConfig);    
} on PlatformException catch (onError){
    onError.code;
    onError.message;
}
```
:::
:::if{props.platform="window"}
```cpp
// 同意申请
zim::ZIMGroupJoinApplicationAcceptConfig config;

zim_->acceptGroupJoinApplication(
    user_id, group_id, config,
    [=](/zim-flutter/guides/group/const-std::string-&groupid,-const-std::string-&userid,-const-zim::zimerror-&errorinfo) {
        int error_code = errorInfo.code;
    });
```
:::
:::if{props.platform="Web|UTS"}
```typescript
const userID = '';
const groupID = '';
const config: ZIMGroupJoinApplicationAcceptConfig = {};
zim.acceptGroupJoinApplication(userID, groupID, config)
    .then((res: ZIMGroupJoinApplicationAcceptedResult) => {
        // 操作成功
    })
    .catch((err: ZIMError) => {
        // 操作失败
    });
```
:::
:::if{props.platform="iOS"}
```objc
// 同意申请
[zim acceptGroupJoinApplicationFromUserID:userID groupID:groupID config:config callback:^(NSString * _Nonnull groupID, NSString * _Nonnull userID, ZIMError * _Nonnull errorInfo) {
        // 同意申请结果回调
}];
```
:::

- 群主或管理员调用 {getPlatformData(props,rejectGroupJoinApplicationMap)} 接口，拒绝用户入群。


:::if{props.platform=undefined}
```java
// 否决申请
ZIMGroupJoinApplicationRejectConfig config = new ZIMGroupJoinApplicationRejectConfig();
zim.rejectGroupJoinApplication("userID", "groupID", config, new ZIMGroupJoinApplicationRejectedCallback(){
    public void onGroupJoinApplicationRejected(String groupID, String userID, ZIMError errorInfo) {
        // 拒绝用户入群结果回调  
    }
});
```
:::
:::if{props.platform="Flutter"}
```dart
// 拒绝申请
try{
    ZIMGroupJoinApplicationRejectConfig rejectConfig = ZIMGroupJoinApplicationRejectConfig();
    var result = await ZIM.getInstance()!.rejectGroupJoinApplication('userID', 'groupID', rejectConfig);
} on PlatformException catch (onError){
    onError.code;
    onError.message;
}
```
:::
:::if{props.platform="window"}
```cpp
// 否决申请
zim::ZIMGroupJoinApplicationRejectConfig config;

zim_->rejectGroupJoinApplication(
    user_id, group_id, config,
    [=](/zim-flutter/guides/group/const-std::string-&groupid,-const-std::string-&userid,-const-zim::zimerror-&errorinfo) {
        int error_code = errorInfo.code;
    });
```
:::
:::if{props.platform="Web|UTS"}
```typescript
const userID = '';
const groupID = '';
const config: ZIMGroupJoinApplicationRejectConfig = {};
zim.rejectGroupJoinApplication(userID, groupID, config)
    .then((res: ZIMGroupJoinApplicationRejectedResult) => {
        // 操作成功
    })
    .catch((err: ZIMError) => {
        // 操作失败
    });
```
:::
:::if{props.platform="iOS"}
```objc
// 否决申请
[zim rejectGroupJoinApplicationFromUserID:userID groupID:groupID config:config callback:^(NSString * _Nonnull groupID, NSString * _Nonnull userID, ZIMError * _Nonnull errorInfo) {
    // 否决申请结果回调
}];
```
:::


4. 入群申请人、群主、管理员和接口调用者会收到 {getPlatformData(props,onGroupApplicationUpdatedMap)} 回调通知。
:::if{props.platform=undefined}
```java
// 监听 onGroupApplicationUpdated 事件
zim.setEventHandler(new ZIMEventHandler(){
        public void onGroupApplicationUpdated(ZIM zim, ArrayList<ZIMGroupApplicationInfo> applicationList){
        //  群申请信息更新回调
        }
});
```
:::
:::if{props.platform="Flutter"}   
```dart
// 监听 onGroupApplicationUpdated 事件
ZIMEventHandler.onGroupApplicationUpdated = (ZIM zim,
    List<ZIMGroupApplicationInfo> applicationList){

};
```
:::
:::if{props.platform="window"}
```cpp
void onGroupApplicationUpdated(
    zim::ZIM * /*zim*/,
    const std::vector<zim::ZIMGroupApplicationInfo> & /*applicationList*/) override {
    ......
}
```
:::
:::if{props.platform="Web"}
```typescript
// 监听 groupApplicationUpdated 事件
zim.on('groupApplicationUpdated', (zim, data) => {
    // 入群申请有变更，此时可更新入群申请列表 UI
});
```
:::
:::if{props.platform="UTS"}
```typescript
// 监听 onGroupApplicationUpdated 事件
zim.onGroupApplicationUpdated((data) => {
    // 入群申请有变更，此时可更新入群申请列表 UI
});
```
:::
:::if{props.platform="iOS"}
```objc
// 监听 groupApplicationUpdated 事件
- (void)zim:(ZIM *)zim groupApplicationUpdated:(NSArray<ZIMGroupApplicationInfo *> *)applicationList{

}
```
:::

### 方式 2：由群内成员添加入群组（邀请入群）

1. 群内用户可通过以下任意接口邀请用户入群：

<Warning title="注意">

请确认被邀请用户（以下称为“目标用户”）已通过 {getPlatformData(props,loginMap)} 接口登录注册过，否则会操作失败。
</Warning>

- {getPlatformData(props,inviteUsersIntoGroupMap)} ：直接邀请用户入群，无需对方同意。

:::if{props.platform="Flutter"}
开发者可以通过 [ZIMGroupUsersInvitedResult](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMGroupUsersInvitedResult-class.html)，判断用户是否被成功加入到群组中。
:::

:::if{props.platform=undefined}
```java
// 由群内成员添加入群组
ArrayList<String> userList = new ArrayList<>();
userList.add("user_1");
userList.add("user_2");
zim.inviteUsersIntoGroup(userList, "group_id", new ZIMGroupUsersInvitedCallback() {
    @Override
    public void onGroupUsersInvited(ArrayList<ZIMGroupMemberInfo> userList, ArrayList<ZIMErrorUserInfo> errorUserList, ZIMError errorInfo) {
        // 通过 errorInfo.code 获取添加入群组的结果    
    }
});
```
:::
:::if{props.platform="Flutter"}
Developers can use [ZIMGroupUsersInvitedResult](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMGroupUsersInvitedResult-class.html) to determine whether the user has been successfully added to the group.
```dart
// 由群内成员添加入群组
List<String> userIDs = ['userID1', 'userID2'];
ZIM.getInstance()
!.inviteUsersIntoGroup(userIDs, 'groupID')
.then((value) => {
    //成功调用此处
})
.catchError((onError) {
    //失败调用此处
});
```
:::
:::if{props.platform="window"}
```cpp
// 由群内成员添加入群组
std::vector<std::string> user_list;
user_list.push_back("user_1");
user_list.push_back("user_2");
zim_->inviteUsersIntoGroup(user_list, group_id, callback);
```
:::
:::if{props.platform="Web|UTS"}
```typescript
const groupID = '';

// 由群内成员添加入群组
const userIDs = [];
zim.inviteUsersIntoGroup(userIDs, groupID)
  .then((res: ZIMGroupUsersInvitedResult) => {
      // 操作成功
  })
  .catch((err: ZIMError) => {
      // 操作失败
  });
```
:::
:::if{props.platform="iOS"}
```objc
// 由群内成员添加入群组
[zim inviteUsersIntoGroup:userIDs groupID:groupID callback:^(NSArray<ZIMGroupMemberInfo *> * _Nonnull userList, NSArray<ZIMErrorUserInfo *> * _Nonnull errorUserList, ZIMError * _Nonnull errorInfo) {
    //这里写调用邀请入群接口后的业务逻辑
}];
```
:::

- {getPlatformData(props,sendGroupInviteApplicationsMap)} ：向用户发起入群邀请申请。


:::if{props.platform=undefined}
```java
// 发送邀请入群申请
ZIMGroupInviteApplicationSendConfig config = new ZIMGroupInviteApplicationSendConfig();
config.wording = "请加入我的群吧";
List<String> userIDs = new ArrList<String>();
userIDs.add("user1");
userIDs.add("user2");
zim.sendGroupInviteApplications(userIDs, "groupID", config, new ZIMGroupInviteApplicationsSentCallback(){
    public void onGroupInviteApplicationsSent(String groupID, ArrayList<ZIMErrorUserInfo> errorUserList, ZIMError errorInfo){
        // 发起群邀请结果回调
    }
});
```
:::
:::if{props.platform="Flutter"}
```dart
// 发送邀请入群申请
ZIMGroupInviteApplicationSendConfig config = ZIMGroupInviteApplicationSendConfig();
config.wording = 'xxx邀请你加入群聊';
ZIMGroupInviteApplicationSendConfig applicationSendConfig = ZIMGroupInviteApplicationSendConfig();
try{
    var result = await ZIM.getInstance()!.sendGroupInviteApplications(['userID1','userID2'], 'groupID', config);
} on PlatformException catch (onError) {
    onError.code;
    onError.message;
} 
```
:::

:::if{props.platform="window"}
```cpp
// 发送邀请入群申请
std::vector<std::string> user_list;
user_list.push_back("user_1");
user_list.push_back("user_2");

zim::ZIMGroupInviteApplicationSendConfig config;
config.wording = "wording";

zim_->sendGroupInviteApplications(
    user_list, group_id, config,
    [=](/zim-flutter/guides/group/const-std::string-&groupid,-const-std::vector<zim::zimerroruserinfo>-&erroruserlist,-const-zim::zimerror-&errorinfo) {
        int error_code = errorInfo.code;
    });
```
:::
:::if{props.platform="Web|UTS"}
```typescript
// 发送邀请入群申请
const userIDs = [];
const groupID = '';
const config: ZIMGroupInviteApplicationSendConfig = {
    wording: '邀请加入群组' // 申请附言
};
zim.sendGroupInviteApplications(userIDs, groupID, config)
    .then((res: ZIMGroupInviteApplicationsSentResult) => {
        // 操作成功，邀请失败的用户通过 errorUserList 获取 
    })
    .catch((err: ZIMError) => {
        // 操作失败
    });
```

:::
:::if{props.platform="iOS"}
```objc
// 发送邀请入群申请
ZIMGroupInviteApplicationSendConfig *config = [[ZIMGroupInviteApplicationSendConfig alloc] init];
config.wording = @"xxx邀请你加入群聊";
[zim sendGroupInviteApplicationsToUserIDs:@[@"userID1",@"userID2"] groupID:@"groupID" config:config callback:^(NSString * _Nonnull groupID, NSArray<ZIMErrorUserInfo *> * _Nonnull errorUserList, ZIMError * _Nonnull errorInfo) {

}];   
```
:::

根据群组的 {getPlatformData(props,inviteModeMap)} 和 {getPlatformData(props,beInviteModeMap)} ，以及调用用户的群组角色，接口调用效果如下表所示：

<table>
    <tbody><tr>
    <th>beInviteMode</th>
    <th>inviteMode</th>
    <th>调用接口</th>
    <th>调用角色</th>
    <th>结果</th>
    </tr>
    <tr>
    <td rowspan="6">0：NONE</td>
    <td rowspan="2">0：ANY</td>
    <td>inviteUsersIntoGroup</td>
    <td rowspan="2">所有群成员</td>
    <td>被邀请人自动成为群成员。</td>
    </tr>
    <tr>
    <td>sendGroupInviteApplications</td>
    <td>被邀请人自动成为群成员，且不产生邀请入群申请记录。</td>
    </tr>
    <tr>
    <td rowspan="4">1：ADMIN</td>
    <td rowspan="2">inviteUsersIntoGroup</td>
    <td>普通成员</td>
    <td>失败。</td>
    </tr>
    <tr>
    <td>群主或管理员</td>
    <td>被邀请人自动成为群成员。</td>
    </tr>
    <tr>
    <td rowspan="2">sendGroupInviteApplications</td>
    <td>普通成员</td>
    <td>失败。</td>
    </tr>
    <tr>
    <td>群主或管理员</td>
    <td>被邀请人自动成为群成员，且不产生邀请入群申请记录。</td>
    </tr>
    <tr>
    <td rowspan="6">1：AUTH</td>
    <td rowspan="2">0：ANY</td>
    <td>inviteUsersIntoGroup</td>
    <td rowspan="2">所有群成员</td>
    <td>产生邀请入群申请记录，等待目标用户做出反应。</td>
    </tr>
    <tr>
    <td>sendGroupInviteApplications</td>
    <td>产生邀请入群申请记录，等待目标用户做出反应。此外，如果调用者为群主或管理员时，会收到 onGroupApplicationListChanged。</td>
    </tr>
    <tr>
    <td rowspan="4">1：ADMIN</td>
    <td rowspan="2">inviteUsersIntoGroup</td>
    <td>普通成员</td>
    <td>失败。</td>
    </tr>
    <tr>
    <td>群主或管理员</td>
    <td>产生邀请入群申请记录，等待目标用户做出反应。</td>
    </tr>
    <tr>
    <td rowspan="2">sendGroupInviteApplications</td>
    <td>普通成员</td>
    <td>失败。</td>
    </tr>
    <tr>
    <td>群主或管理员</td>
    <td>产生邀请入群申请记录，等待目标用户做出反应。此外，如果调用者为群主或管理员时，会收到 onGroupApplicationListChanged。</td>
    </tr>
    </tbody></table> 

2. **beInviteMode 为 1（AUTH）时**，目标用户和邀请人（仅当接口调用人为群主和群管理员时）会通过 {getPlatformData(props,onGroupApplicationListChangedMap)} 收到回调通知。目标用户需要审批该申请。

- 目标用户调用 {getPlatformData(props,acceptGroupInviteApplicationMap)} 接口，同意入群，成为群成员。


:::if{props.platform=undefined}
```java
// 同意邀请入群申请
ZIMGroupInviteApplicationAcceptConfig config = new ZIMGroupInviteApplicationAcceptConfig();
zim.acceptGroupInviteApplication("inviterUserID", "groupID", config, new ZIMGroupInviteApplicationAcceptedCallback(){

    public void onGroupInviteApplicationAccepted(ZIMGroupFullInfo groupInfo, String inviterUserID, ZIMError errorInfo){
        // 同意群邀请结果回调
    }
});
```
:::
:::if{props.platform="Flutter"}
```dart
try{
    ZIMGroupInviteApplicationAcceptConfig acceptConfig = ZIMGroupInviteApplicationAcceptConfig();
    var result = await ZIM.getInstance()!.acceptGroupInviteApplication('inviterUserID', 'groupID', acceptConfig); 
} on PlatformException catch(onError){
    onError.code;
    onError.message;
}
```
:::
:::if{props.platform="window"}
```cpp
// 同意邀请入群申请
zim::ZIMGroupInviteApplicationAcceptConfig config;

zim_->acceptGroupInviteApplication(
    user_id, group_id, config,
    [=](/zim-flutter/guides/group/const-zim::zimgroupfullinfo-&group,-const-std::string-&inviteruserid,-const-zim::zimerror-&errorinfo) {
        int error_code = errorInfo.code;
    });
```
:::
:::if{props.platform="Web|UTS"}
```typescript
const inviterUserID = '';
const groupID = '';

// 同意邀请入群申请
const config: ZIMGroupInviteApplicationAcceptConfig = {};
zim.acceptGroupInviteApplication(inviterUserID, groupID, config)
    .then((res: ZIMGroupInviteApplicationAcceptedResult) => {
        // 操作成功
    })
    .catch((err: ZIMError) => {
        // 操作失败
    }); 
```
:::
:::if{props.platform="iOS"}
```objc
[zim acceptGroupInviteApplicationFromInviterUserID:inviterUserID groupID:groupID config:config callback:^(ZIMGroupFullInfo * _Nonnull groupInfo, NSString * _Nonnull inviterUserID, ZIMError * _Nonnull errorInfo) {

}];
```
:::


- 目标用户调用 {getPlatformData(props,rejectGroupInviteApplicationMap)} 接口，拒绝入群邀请。


:::if{props.platform=undefined}
```java
// 拒绝邀请入群申请
ZIMGroupInviteApplicationRejectConfig config = new ZIMGroupInviteApplicationRejectConfig();
zim.rejectGroupInviteApplication("inviterUserID", "groupID", config, new ZIMGroupInviteApplicationRejectedCallback(){
    public void onGroupInviteApplicationRejected(String groupID, String inviterUserID, ZIMError errorInfo) {
            //  拒绝群邀请结果回调
    }
});
```
:::
:::if{props.platform="Flutter"}
```dart
try{
    ZIMGroupInviteApplicationRejectConfig rejectConfig = ZIMGroupInviteApplicationRejectConfig();
    var result = await ZIM.getInstance()!.rejectGroupInviteApplication('inviterUserID', 'groupID', rejectConfig);
} on PlatformException catch(onError){
    onError.code;
    onError.message;
}
```
:::
:::if{props.platform="window"}
```cpp
// 拒绝邀请入群申请
zim::ZIMGroupInviteApplicationRejectConfig config;

zim_->rejectGroupInviteApplication(
      user_id, group_id, config,
    [=](/zim-flutter/guides/group/const-std::string-&groupid,-const-std::string-&inviteruserid,-const-zim::zimerror-&errorinfo) {
        int error_code = errorInfo.code;
    });
```
:::
:::if{props.platform="Web|UTS"}
```typescript
const inviterUserID = '';
const groupID = '';

// 拒绝邀请入群申请
const config: ZIMGroupInviteApplicationRejectConfig = {};
zim.rejectGroupInviteApplication(inviterUserID, groupID, config)
    .then((res: ZIMGroupInviteApplicationRejectedResult) => {
        // 操作成功
    })
    .catch((err: ZIMError) => {
        // 操作失败
    });
```
:::
:::if{props.platform="iOS"}
```objc
[zim rejectGroupInviteApplicationFromInviterUserID:inviterUserID groupID:groupID config:config callback:^(NSString * _Nonnull groupID, NSString * _Nonnull inviterUserID, ZIMError * _Nonnull errorInfo) {

}];
```
:::


3. **beInviteMode 为 1（AUTH）时**，该用户和邀请人（仅当接口调用人为群主和群管理员时）会通过 {getPlatformData(props,onGroupApplicationUpdatedMap)} 收到回调通知上述审批事件。


:::if{props.platform=undefined}
```java
zim.setEventHandler(new ZIMEventHandler(){
    public void onGroupApplicationUpdated(ZIM zim,
                                        ArrayList<ZIMGroupApplicationInfo> applicationList) {
            // 群申请更新回调通知
      }
});
```
:::
:::if{props.platform="Flutter"}
```dart
ZIMEventHandler.onGroupApplicationUpdated = (ZIM zim,
List<ZIMGroupApplicationInfo> applicationList){

};
```
:::
:::if{props.platform="window"}
```cpp
// 监听 onGroupApplicationUpdated
void onGroupApplicationUpdated(
    zim::ZIM * /*zim*/,
    const std::vector<zim::ZIMGroupApplicationInfo> & /*applicationList*/) override {
    ......
}
```
:::
:::if{props.platform="Web"}
```typescript
// 监听 groupApplicationUpdated 事件
zim.on('groupApplicationUpdated', (zim, data) => {
    // 入群申请有变更，此时可更新入群申请列表 UI
});
```
:::
:::if{props.platform="UTS"}
```typescript
// 监听 onGroupApplicationUpdated 事件
zim.onGroupApplicationUpdated((data) => {
    // 入群申请有变更，此时可更新入群申请列表 UI
});
```
:::
:::if{props.platform="iOS"}
```objc
- (void)zim:(ZIM *)zim groupApplicationUpdated:(NSArray<ZIMGroupApplicationInfo *> *)applicationList{
        
}
```
:::


## 退出群组

成员退出群组也存在两种方式（二选一），主动退出和被提出群组。
    
<Warning title="注意">
    
用户退出群组后，不会清除本地的会话列表，还可以看到退出之前的群内聊天记录。
</Warning>

### 方式 1：主动退出群组

成员登录 ZIM SDK 后，直接调用 {getPlatformData(props,leaveGroupMap)} 接口，传入 groupID（groupID 必须已经存在，否则会操作失败），主动退出群组。退出成功后，全体群成员（包括自己）都会收到 {getPlatformData(props,onGroupMemberStateChangedMap)} 的回调通知。

<Note title="说明">
群主退出群组时，群主身份将自动转让给加入本群组最早的那个成员；所有成员退出群组时，群组自动解散。
</Note>

:::if{props.platform=undefined}
```java
// 主动退出群组
zim.leaveGroup("groupID", new ZIMGroupLeftCallback() {
    @Override
    public void onGroupLeft(ZIMError errorInfo) {
        // 通过 errorInfo.code 获取主动退出群组的结果     
    }
});
```
:::

:::if{props.platform="Flutter"}
Developers can use [ZIMGroupLeftResult](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMGroupLeftResult-class.html) to determine whether the member successfully left the group.
```dart
// 主动退出群组
ZIM.getInstance()
  !.leaveGroup('groupID')
   .then((value){
       //成功触发此处
   })
   .catchError((onError) {
       //失败触发此处
   });
```
:::
:::if{props.platform="window"}
```cpp
// 主动退出群组
zim_->leaveGroup(group_id, [=](/zim-flutter/guides/group/const-std::string-&groupid,-zim::zimerror-errorinfo){

    int error_code = errorInfo.code;
    
});
```
:::
:::if{props.platform="Web|UTS"}
```typescript
const groupID = '';

// 主动退出群组
zim.leaveGroup(groupID)
    .then((res: ZIMGroupLeftResult) => {
        // 操作成功
    })
    .catch((err: ZIMError) => {
        // 操作失败
    });
```
:::
:::if{props.platform="iOS"}
```objc
// 主动退出群组
[zim leaveGroup:groupID callback:^(ZIMError * _Nonnull errorInfo) {
        //这里写调用离开群组接口后的业务逻辑
}];
```
:::

### 方式 2：群主移除群内成员    

群主调用 {getPlatformData(props,kickGroupMembersMap)} 接口，传入 groupID（groupID 必须已经存在，否则会操作失败）、userIDs（需要被移除的成员列表），移除这些成员。移除成功后，全体群成员（包括群主自己、被移除的成员）都会收到 {getPlatformData(props,onGroupMemberStateChangedMap)} 的回调通知。

:::if{props.platform="Flutter"}
开发者可以通过 [ZIMGroupMemberKickedResult](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMGroupMemberKickedResult-class.html)，判断用户是否被成功移除。

:::

<Warning title="注意">

- 只有群主和管理员可以调用 {getPlatformData(props,kickGroupMembersMap)} 接口，移除群内成员；且移除成员时，该成员无需登录在线，也无需经过该成员同意，即可直接移除。
- 被移除的用户 userID，必须是存在于本群组的成员列表内，否则会操作失败。
</Warning>


:::if{props.platform=undefined}
```java
// 群主移除群内成员
ArrayList<String> user_list = new ArrayList<>();
user_list.add("user_1");
user_list.add("user_2");
zim.kickGroupMembers(user_list, "groupID", new ZIMGroupMemberKickedCallback() {
    @Override
    public void onGroupMemberKicked(ArrayList<String> kickedUserIDList, ArrayList<ZIMErrorUserInfo> errorUserList, ZIMError errorInfo) {
        // 通过 errorInfo.code 获取移除群成员的结果     
    }
});
```
:::
:::if{props.platform="Flutter"}
```dart
// 群主移除群内成员
ZIM.getInstance()
  !.kickGroupMembers(userIDs, 'groupID')
   .then((value){
       //成功触发此处
   })
   .catchError((onError) {
       //失败触发此处
   });
```

:::
:::if{props.platform="window"}
```cpp
// 群主移除群内成员
std::vector<std::string> user_list;
user_list.push_back("user_1");
user_list.push_back("user_2");
zim_->kickGroupMembers(user_list, group_id, 
    [=](/zim-flutter/guides/group/const-std::string-&groupid,-const-std::vector<std::string>-&kickedmemberids,-const-std::vector<zimerroruser>-&erroruserlist,-zim::zimerror-errorinfo) {

        int error_code = errorInfo.code;

    });
```
:::
:::if{props.platform="Web|UTS"}
```typescript
const groupID = '';

// 群主或管理员移除群内成员
const userIDs = [];
zim.kickGroupMembers(userIDs, groupID)
    .then((res: ZIMGroupMemberKickedResult) => {
        // 操作成功
    })
    .catch((err: ZIMError) => {
        // 操作失败
    });

```
:::
:::if{props.platform="iOS"}
```objc
// 群主移除群内成员
[zim kickGroupMembers:userIDs groupID:groupID callback:^(NSArray<NSString *> * _Nonnull kickedUserIDList, NSArray<ZIMErrorUserInfo *> * _Nonnull errorUserList, ZIMError * _Nonnull errorInfo) {
        //这里写调用群主移除群内成员接口后的业务逻辑 
}];
```
:::

## 解散群组

群主登录 ZIM SDK 后，如果想要解散群组，可以通过 {getPlatformData(props,dismissGroupMap)} 接口，解散群组。解散群组成功后，全体群成员都会收到 {getPlatformData(props,onGroupStateChangedMap)} 回调通知。


:::if{props.platform="Flutter"}
开发者可以通过 [ZIMGroupDismissedResult](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMGroupDismissedResult-class.html)，判断解散群组是否成功。
:::

<Note title="说明">

- 只有群主才能调用 {getPlatformData(props,dismissGroupMap)} 接口，解散群组。
- 所有成员退出群组时，群组将自动解散。
- 群组解散后，不会清除本地的会话列表，用户还可以看到退出之前的群内聊天记录。
</Note>


:::if{props.platform=undefined}
```java
// 群主解散群组
zim.dismissGroup("groupID", new ZIMGroupDismissedCallback() {
    @Override
    public void onGroupDismissed(ZIMError errorInfo) {
        // 通过 errorInfo.code 获取群主解散群组的结果
    }
});
```
:::
:::if{props.platform="Flutter"}
```dart
// 群主解散群组
ZIM.getInstance()
  !.dismissGroup('groupID')
   .then((value){
       //成功触发此处
   })
   .catchError((onError) {
       //失败触发此处
   });
```

:::
:::if{props.platform="window"}
```cpp
// 群主解散群组
zim_->dismissGroup(group_id, [=](/zim-flutter/guides/group/const-std::string-&groupid,-zim::zimerror-errorinfo) {
    int error_code = errorInfo.code;
});
```
:::
:::if{props.platform="Web"}
```typescript
const groupID = '';
zim.dismissGroup(groupID)
    .then((res: ZIMGroupDismissedResult) => {
        // 操作成功
    })
    .catch((err: ZIMError) => {
        // 操作失败
    });

// 注册监听“群状态变更”的回调
zim.on('groupStateChanged', (zim, data) => {
    console.log('groupStateChanged', data);
});
```
:::
:::if{props.platform="UTS"}
```typescript
const groupID = '';
zim.dismissGroup(groupID)
    .then((res: ZIMGroupDismissedResult) => {
        // 操作成功
    })
    .catch((err: ZIMError) => {
        // 操作失败
    });

// 注册监听“群状态变更”的回调
zim.onGroupStateChanged((data) => {
    console.log('groupStateChanged', data);
});
```
:::
:::if{props.platform="iOS"}
```objc
// 群主解散群组
[zim dismissGroup:groupID callback:^(ZIMError * _Nonnull errorInfo) {
        // 这里写调用解散群接口后的业务代码
 }];
```
:::

## 更多功能

###  查询已加入群组列表

用户登录 ZIM SDK 后，如果想要了解自己加入了哪些群组，可以通过 {getPlatformData(props,queryGroupListMap)} 接口，获取自己已加入的群组列表。


:::if{props.platform=undefined}
```java
// 用户查询自己加入了哪些群组
zim.queryGroupList(new ZIMGroupListQueriedCallback() {
    @Override
    public void onGroupListQueried(ArrayList<ZIMGroupInfo> groupList, ZIMError errorInfo) {
        // 通过 errorInfo.code 获取用户加入的群组结果
    }
});
```
:::
:::if{props.platform="Flutter"}
开发者可以通过 [ZIMGroupListQueriedResult](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMGroupListQueriedResult-class.html)，获取查询结果。

```dart
// 用户查询自己加入了哪些群组
ZIM.getInstance()
  !.queryGroupList()
   .then((value){
       //成功触发此处
   })
   .catchError((onError) {
       //失败触发此处
   });
```
:::
:::if{props.platform="window"}
```cpp
// 用户查询自己加入了哪些群组
zim_->queryGroupList(
    [=](/zim-flutter/guides/group/const-std::vector<zimgroupinfo>-&grouplist,-zim::zimerror-errorinfo){
        int error_code = errorInfo.code;
    });
```
:::
:::if{props.platform="Web|UTS"}
```typescript
zim.queryGroupList()
    .then((res: ZIMGroupListQueriedResult) => {
        // 查询成功
    })
    .catch((err: ZIMError) => {
        // 查询失败
    });
```
:::
:::if{props.platform="iOS"}
```objc
// 用户查询自己加入了哪些群组
[zim queryGroupListByGroupID:^(NSArray<ZIMGroupInfo *> * _Nonnull groupList, ZIMError * _Nonnull errorInfo) {
    //这里写调用查询群列表接口后的业务代码
}];
```
:::


### 搜索已加入群组

用户登录 ZIM SDK 后，如果想要根据条件对已加入的群组进行搜索，可以调用 {getPlatformData(props,searchLocalGroupsMap)} 接口，传入 config、callback 搜索群组。

搜索结果将通过 {getPlatformData(props,ZIMGroupsSearchedCallbackMap)} 回调接口返回。


:::if{props.platform=undefined}
```java
// 搜索名称中包含 “zego” 的已加入群组
ZIM zim = getZIM();
ZIMGroupMemberSearchConfig config = new ZIMGroupMemberSearchConfig();
config.count = 10;
config.nextFlag = 0;
config.isAlsoMatchGroupMemberNickname = true; // 如果群成员昵称包含 “zego”，搜索结果将包含该群组
config.isAlsoMatchGroupMemberUserName = true; // 如果群成员用户名称包含 ”zego“，搜索结果将包含该群组
config.keywords.add("zego");
zim.searchLocalGroups(config, new ZIMGroupsSearchedCallback() {
    @Override
    public void onGroupsSearched(ArrayList<ZIMGroupSearchInfo> groupSearchInfoList, int nextFlag, ZIMError errorInfo) {
          // 开发者可从 groupSearchInfoList 中获取到群组信息              
    }
});
```
:::
:::if{props.platform="Flutter"}
```dart
// 搜索名称中包含 “zego” 的已加入群组
ZIMGroupSearchConfig config =  ZIMGroupSearchConfig();
config.count = 10;
config.nextFlag = 0;
config.isAlsoMatchGroupMemberNickname = true; // 如果群成员昵称包含 “zego”，搜索结果将包含该群组。
config.isAlsoMatchGroupMemberUserName = true; // 如果群成员用户名称包含 “zego”，搜索结果将包含该群组。
config.keywords.add("zego");
ZIM.getInstance()!.searchLocalGroups(config).then((result){
    // 开发者可从 groupSearchInfoList 中获取到群组信息    
}).catchError((onError){
    // 根据官网错误码表处理
});
```
:::

:::if{props.platform="window"}
```cpp
// 搜索名称中包含 “zego” 的已加入群组

auto searchConfig = zim::ZIMGroupSearchConfig();
searchConfig.count = 10;
searchConfig.nextFlag = 0;
// 如果群成员昵称包含 “zego” ，搜索结果将包含该群组
searchConfig.isAlsoMatchGroupMemberNickname = true;
// 如果群成员用户名称包含 “zego” ，搜索结果将包含该群组
searchConfig.isAlsoMatchGroupMemberUserName = true;
searchConfig.keywords.emplace_back("zego");

zim_->searchLocalGroups(searchConfig,
                        [=](/zim-flutter/guides/group/const-std::vector<zim::zimgroupsearchinfo>-&groupsearchinfolist,-unsigned-int-nextflag,-const-zim::zimerror-&errorinfo) {
                            // 开发者可从 groupSearchInfoList 中获取到群组信息
                        });
```

:::
:::if{props.platform="Web|UTS"}
```typescript
// 搜索名称中包含 “zego” 的已加入群组

const config: ZIMGroupSearchConfig = {
    count: 10, // 搜索结果数量
    nextFlag: 0,
    keywords: ['zego'], // 设置关键词为 “zego”，最多支持 5 个。当设置多个关键词后，搜索结果只展示同时包含所有关键词的本地消息
    isAlsoMatchGroupMemberUserName: true, // 如果群成员用户名称包含 “zego”，搜索结果将包含该群成员
    isAlsoMatchGroupMemberNickname: false,
};

zim.searchLocalGroups(config)
    .then((res: ZIMGroupsSearchedResult) => {
        // 操作成功
    })
    .catch((err: ZIMError) => {
        // 操作失败
    });
```
:::
:::if{props.platform="iOS"}
```objc
// 搜索名称中包含 “zego” 的已加入群组
ZIMGroupSearchConfig *config = [[ZIMGroupSearchConfig alloc] init];
config.count = 10;
config.nextFlag = 0;
config.isAlsoMatchGroupMemberNickname = true; // 如果群成员昵称包含 “zego”，搜索结果将包含该群组
config.isAlsoMatchGroupMemberUserName = true; // 如果群成员用户名称包含 “zego”，搜索结果将包含该群组
config.keywords = @[@"zego"];
[[ZIM getInstance] searchLocalGroupsWithConfig:config callback:^(NSArray<ZIMGroupSearchInfo *> * _Nonnull groupSearchInfoList, unsigned int nextFlag, ZIMError * _Nonnull errorInfo) {
    if(errorInfo.code == ZIMErrorCodeSuccess){
        // 开发者可从 groupSearchInfoList 中获取到群组信息
    }else{
        // 根据官网错误码表处理
    }
}];
```
:::

<a id="muteGroup"></a>
### 禁言或解禁群组

禁言，是指让群组会话内的用户不能发言。

在登录 ZIM SDK 后，用户可以禁言自己管理的群组。只需调用 {getPlatformData(props,muteGroupMap)} 接口，传入相应参数设置群组 ID、禁言模式、持续时长和目标角色，即可禁言或解禁群组。

ZIM 支持 3 种群组禁言模式：
- 所有群组成员不能发言；
- 所有普通群组成员（`role` 为 3）不能发言，；
- 指定角色的群成员不能发言。

<Frame width="auto" height="auto">
  <img src="https://media-resource.spreading.io/docuo/workspace564/27e54a759d23575969552654cb45bf89/303ae643b9.jpg" alt="Group_Muted_New.jpg"/>
</Frame>

禁言操作结果将通过 {getPlatformData(props,ZIMGroupMutedCallbackMap)} 回调接口返回。

<Note title="说明">

如果您希望禁止特定群组成员发言，请参考 [群成员管理 - 设置群成员禁言状态](/zim-flutter/guides/group/group-members)。
</Note>



:::if{props.platform=undefined}
```java
// 设置群组禁言配置
ZIMGroupMuteConfig config = new ZIMGroupMuteConfig();
// 群组禁言模式为指定角色的群成员不能发言
config.mode = ZIMGroupMuteMode.Custom;
// 禁言时长为 30 秒
config.duration = 30;
// 角色为 3 和 5 的群成员被禁言
config.roles.add(3);
config.roles.add(5);

// 开启禁言
boolean isMute = true;

zim.muteGroup(isMute, "group_id", config, new ZIMGroupMutedCallback() {
     @Override
     public void onGroupMuted(String groupID, boolean isMute, ZIMGroupMuteInfo info, ZIMError errorInfo) {
                
     }
});

```
:::
:::if{props.platform="Flutter"}
```dart
// 设置群组禁言配置
try {
    // 设置群组禁言配置
    ZIMGroupMuteConfig config = ZIMGroupMuteConfig();
    // 群组禁言模式为指定角色的群成员不能发言
    config.mode = ZIMGroupMuteMode.custom;
    // 禁言时长为 30 秒
    config.duration = 30;
    // 角色为 3 和 5 的群成员被禁言
    config.roles = [3,5];
    // 开启禁言
    bool isMute = true;
    ZIMGroupMutedResult result = await ZIM.getInstance()!.muteGroup(isMute, 'group_id', config);
} on PlatformException catch (onError){
    onError.code;//根据错误码表处理
    onError.message;//错误信息
}
```
:::
:::if{props.platform="window"}
```cpp
// 设置群组禁言配置
zim::ZIMGroupMuteConfig config;
// 群组禁言模式为指定角色的群成员不能发言
config.mode = zim::ZIMGroupMuteMode::ZIM_GROUP_MUTE_MODE_CUSTOM;
// 禁言时长为 30 秒
config.duration = 30;
// 角色为 2 和 3 的群成员被禁言
config.roles.push_back(2);
config.roles.push_back(3);

// 开启禁言
bool is_mute = true;

zim_->muteGroup(is_mute, group_id, config,
                    [=](/zim-flutter/guides/group/const-std::string-&groupid,-bool-is_muted,-const-zim::zimgroupmuteinfo-&info,-const-zim::zimerror-&errorinfo) {
                            // 开发者可从 info 中获取到群组禁言信息
                        });

```
:::
:::if{props.platform="Web|UTS"}
```typescript
// 设置群组禁言配置
const config: ZIMGroupMuteConfig = {
    mode: 3, //群组禁言模式为指定角色的群成员不能发言
    duration: 30, //禁言时长为 30 秒
    roles:[3, 5],//角色为 3 和 5 的群成员被禁言
};

// 开启禁言
const isMute = true;
const groupID = 'group';

zim.muteGroup(isMute, groupID, config)
    .then((res: ZIMGroupMutedResult) => {
        // 操作成功
    })
    .catch((err: ZIMError) => {
        // 操作失败
    });
```
:::
:::if{props.platform="iOS"}
```objc
// 设置群组禁言配置
ZIMGroupMuteConfig *muteConfig = [[ZIMGroupMuteConfig alloc] init];
// 群组禁言模式为指定角色的群成员不能发言
muteConfig.mode = ZIMGroupMuteModeCustom;
// 禁言时长为 30 秒
muteConfig.duration = 30;
// 角色为 3 和 5 的群成员被禁言
muteConfig.roles = @[@3,@5];

[[ZIM getInstance] muteGroup:YES groupID:@"groupID" config:muteConfig callback:^(NSString * _Nonnull groupID, BOOL isMute, ZIMGroupMuteInfo * _Nonnull info, ZIMError * _Nonnull errorInfo) {
    // 开发者可从 info 中获取到群组禁言信息
}];
```
:::


群组禁言或解禁成功后，全部群成员会收到 {getPlatformData(props,onGroupMutedInfoUpdatedMap)} ，得知哪些角色无法在该群组发言或可恢复发言。


:::if{props.platform=undefined}
```java
zim.setEventHandler(new ZIMEventHandler(){

    public void onGroupMutedInfoUpdated(ZIM zim, ZIMGroupMuteInfo muteInfo,
                                       ZIMGroupOperatedInfo operatedInfo, String groupID) {
       // 通过继承 ZIMEventHandler 的方式，在这里监听群禁言状态变更的信息，并进行相应处理
   }
});
```
:::
:::if{props.platform="Flutter"}
```dart
ZIMEventHandler.onGroupMutedInfoUpdated = (ZIM zim, ZIMGroupMuteInfo groupMuteInfo, ZIMGroupOperatedInfo operatedInfo, String groupID){
    //在这里监听群禁言状态变更的信息，并进行相应处理
};
```
:::
:::if{props.platform="window"}
```cpp
void zim_event_handler::onGroupMutedInfoUpdated(zim::ZIM *, const zim::ZIMGroupMuteInfo &info,
                                               const zim::ZIMGroupOperatedInfo &operatedInfo,
                                               const std::string &groupID) {
    // 通过继承 ZIMEventHandler 的方式，在这里监听群禁言状态变更的信息，并进行相应处理
}

```
:::
:::if{props.platform="Web"}
```typescript
zim.on('groupMutedInfoUpdated', (zim, data) => {
    console.log('groupMutedInfoUpdated', data);
});
```
:::
:::if{props.platform="UTS"}
```typescript
zim.onGroupMutedInfoUpdated((data) => {
    console.log('groupMutedInfoUpdated', data);
});
```
:::
:::if{props.platform="iOS"}
```objc
- (void)zim:(ZIM *)zim
    groupMutedInfoUpdated:(ZIMGroupMuteInfo *)muteInfo
            operatedInfo:(ZIMGroupOperatedInfo *)operatedInfo
                 groupID:(NSString *)groupID{
    // 通过继承 ZIMEventHandler 的方式，在这里监听群禁言状态变更的信息，并进行相应处理
}
```

:::



### 确认群组会话是否可用

如需确认当前用户是否仍在所加入的群组会话中，请通过以下任意方法：
- 参考 [会话管理 - 拉取会话列表](/zim-flutter/guides/conversation/manage-unread-message-counts#拉取会话列表) 主动拉取会话列表。
- 参考 [会话管理 - 更新会话列表](/zim-flutter/guides/conversation/manage-unread-message-counts#更新会话列表)，监听会话变更回调，更新会话列表。

当会话类型是群类型时，从返回结果中的 {getPlatformData(props,ZIMGroupConversationMap)} 获取 {getPlatformData(props,isDisabledMap)} ，即会话是否可用。

{getPlatformData(props,isDisabledMap)} 值说明如下：
- 为 true 时，表示当前用户不在该群组会话。当前用户主动退出、被踢或群组解散都会导致会话不可用。
- 为 false 时，表示当前用户在该群组会话。

### 更新入群验证模式

群主和管理员登录 ZIM SDK 后，可以通过 {getPlatformData(props,updateGroupJoinModeMap)} 接口更新入群验证模式。

更新成功后，全体群成员都会收到 {getPlatformData(props,onGroupVerifyInfoUpdatedMap)} 回调通知。


:::if{props.platform=undefined}
```java
// 监听 onGroupVerifyInfoUpdated 事件
zim.setEventHandler(new ZIMEventHandler(){
    public void onGroupVerifyInfoUpdated(ZIM zim, ZIMGroupVerifyInfo verifyInfo,
                                         ZIMGroupOperatedInfo operatedInfo, String groupID) {
        // 验证模式更新回调通知
     }

   });

// 更新 他人入群验证模式
zim.updateGroupJoinMode(ZIMGroupJoinMode.AUTH, "groupID", new ZIMGroupJoinModeUpdatedCallback(){
    public void onGroupJoinModeUpdated(String groupID, ZIMGroupJoinMode mode, ZIMError errorInfo){
        // 更新验证模式结果回调通知
    }
});
```
:::
:::if{props.platform="Flutter"}
```dart
// 监听 onGroupVerifyInfoUpdated 事件
ZIMEventHandler.onGroupVerifyInfoUpdated = (ZIM zim,
    ZIMGroupVerifyInfo verifyInfo,
    ZIMGroupOperatedInfo operatedInfo,
    String groupID){};

// 更新入群验证模式
try{
    var result = await ZIM.getInstance()!.updateGroupJoinMode(ZIMGroupJoinMode.auth, 'groupID');
} on PlatformException catch(onError){
    onError.code;
    onError.message;
}
```

:::
:::if{props.platform="window"}
```cpp
// 更新 邀请他人入群验证模式
zim_->updateGroupJoinMode(
    zim::ZIMGroupJoinMode::ZIM_GROUP_JOIN_MODE_AUTH, group_id,
    [=](/zim-flutter/guides/group/const-std::string-&groupid,-zim::zimgroupjoinmode-mode,-const-zim::zimerror-&errorinfo) {
        // 业务代码
    });

```
:::
:::if{props.platform="Web"}
```typescript
// 监听 groupVerifyInfoUpdated 事件
zim.on('groupVerifyInfoUpdated', (zim, data) => {
});

// 更新入群验证模式
const groupID = '';
const joinMode = 1;
zim.updateGroupJoinMode(joinMode, groupID)
    .then((res: ZIMGroupJoinModeUpdatedResult) => {
        // 操作成功
    })
    .catch((err: ZIMError) => {
        // 操作失败
    });
```
:::
:::if{props.platform="UTS"}
```typescript
// 监听 onGroupVerifyInfoUpdated 事件
zim.onGroupVerifyInfoUpdated((data) => {
});

// 更新入群验证模式
const groupID = '';
const joinMode = 1;
zim.updateGroupJoinMode(joinMode, groupID)
    .then((res: ZIMGroupJoinModeUpdatedResult) => {
        // 操作成功
    })
    .catch((err: ZIMError) => {
        // 操作失败
    });
```
:::
:::if{props.platform="iOS"}

```objc
// 监听 groupVerifyInfoUpdated 事件
- (void)zim:(ZIM *)zim
    groupVerifyInfoUpdated:(ZIMGroupVerifyInfo *)verifyInfo
            operatedInfo:(ZIMGroupOperatedInfo *)operatedInfo
    groupID:(NSString *)groupID{

}

// 更新入群验证模式
[zim updateGroupJoinMode:ZIMGroupJoinModeAuth groupID:@"groupID" callback:^(NSString * _Nonnull groupID, ZIMGroupJoinMode mode, ZIMError * _Nonnull errorInfo) {

}];
```
:::

### 更新邀请模式

群主和管理员登录 ZIM SDK 后，可以通过 {getPlatformData(props,updateGroupInviteModeMap)} 接口更新邀请模式。

更新成功后，全体群成员都会收到 {getPlatformData(props,onGroupVerifyInfoUpdatedMap)} 回调通知。


:::if{props.platform=undefined}
```java

// 监听 onGroupVerifyInfoUpdated 事件
zim.setEventHandler(new ZIMEventHandler(){
    public void onGroupVerifyInfoUpdated(ZIM zim, ZIMGroupVerifyInfo verifyInfo,
                                         ZIMGroupOperatedInfo operatedInfo, String groupID) {
        // 邀请模式更新回调通知
     }

   });

// 更新 邀请他人入群验证模式
zim.updateGroupInviteMode(ZIMGroupInviteMode.ADMIN, "groupID", new ZIMGroupInviteModeUpdatedCallback(){
    public void onGroupInviteModeUpdated(String groupID, ZIMGroupInviteMode mode, ZIMError errorInfo){
        // 更新邀请他人入群验证模式结果回调通知
    }
});
```
:::
:::if{props.platform="Flutter"}
```dart
// 监听 onGroupVerifyInfoUpdated 事件
ZIMEventHandler.onGroupVerifyInfoUpdated = (ZIM zim,
    ZIMGroupVerifyInfo verifyInfo,
    ZIMGroupOperatedInfo operatedInfo,
    String groupID){};

// 更新邀请模式
try{
    var result = await ZIM.getInstance()!.updateGroupInviteMode(ZIMGroupInviteMode.any, 'groupID');
} on PlatformException catch(onError){
    onError.code;
    onError.message;
}
```

:::
:::if{props.platform="window"}
```cpp
// 监听 onGroupVerifyInfoUpdated 事件
void onGroupVerifyInfoUpdated(zim::ZIM * /*zim*/,
                                const zim::ZIMGroupVerifyInfo & /*verifyInfo*/,
                                const zim::ZIMGroupOperatedInfo & /*operatedInfo*/,
                                const std::string & /*groupID*/) override {
    ......
}

// 更新邀请模式
zim_->updateGroupInviteMode(
    zim::ZIMGroupInviteMode::ZIM_GROUP_INVITE_MODE_ADMIN, group_id,
    [=](/zim-flutter/guides/group/const-std::string-&groupid,-zim::zimgroupinvitemode-mode,-const-zim::zimerror-&errorinfo) {
        // 业务代码
    });

```

:::
:::if{props.platform="Web"}
```typescript
// 监听 groupVerifyInfoUpdated 事件
zim.on('groupVerifyInfoUpdated', (zim, data) => {
});

// 更新 邀请他人入群验证模式
const groupID = '';
const inviteMode = 1;
zim.updateGroupInviteMode(inviteMode, groupID)
    .then((res: ZIMGroupInviteModeUpdatedResult) => {
        // 操作成功
    })
    .catch((err: ZIMError) => {
        // 操作失败
    });
```

:::
:::if{props.platform="UTS"}
```typescript
// 监听 onGroupVerifyInfoUpdated 事件
zim.onGroupVerifyInfoUpdated((data) => {
});

// 更新 邀请他人入群验证模式
const groupID = '';
const inviteMode = 1;
zim.updateGroupInviteMode(inviteMode, groupID)
    .then((res: ZIMGroupInviteModeUpdatedResult) => {
        // 操作成功
    })
    .catch((err: ZIMError) => {
        // 操作失败
    });
```

:::
:::if{props.platform="iOS"}
```objc
// 监听 onGroupVerifyInfoUpdated 事件
- (void)zim:(ZIM *)zim
    groupVerifyInfoUpdated:(ZIMGroupVerifyInfo *)verifyInfo
              operatedInfo:(ZIMGroupOperatedInfo *)operatedInfo
    groupID:(NSString *)groupID{

}

// 更新邀请模式
[zim updateGroupInviteMode:ZIMGroupInviteModeNone groupID:@"groupID" callback:^(NSString * _Nonnull groupID, ZIMGroupInviteMode mode, ZIMError * _Nonnull errorInfo) {

}];
```
:::

### 更新邀请目标用户验证模式

群主和管理员登录 ZIM SDK 后，可以通过 {getPlatformData(props,updateGroupBeInviteModeMap)} 接口更新目标用户验证模式。

更新成功后，全体群成员都会收到 {getPlatformData(props,onGroupVerifyInfoUpdatedMap)} 回调通知。


:::if{props.platform=undefined}
```java

// 监听 onGroupVerifyInfoUpdated 事件
zim.setEventHandler(new ZIMEventHandler(){
    public void onGroupVerifyInfoUpdated(ZIM zim, ZIMGroupVerifyInfo verifyInfo,
                                         ZIMGroupOperatedInfo operatedInfo, String groupID) {
        // 目标用户验证模式更新回调通知

     }

   });


// 更新邀请目标用户验证模式
zim.updateGroupBeInviteMode(ZIMGroupBeInviteMode.AUTH, "groupID", new ZIMGroupBeInviteModeUpdatedCallback(){
    public void onGroupBeInviteModeUpdated(String groupID, ZIMGroupBeInviteMode mode, ZIMError errorInfo) {
            // 更新邀请目标用户验证模式回调通知
    }  
});
```
:::
:::if{props.platform="Flutter"}
```dart
// 监听 onGroupVerifyInfoUpdated 事件
ZIMEventHandler.onGroupVerifyInfoUpdated = (ZIM zim,
    ZIMGroupVerifyInfo verifyInfo,
    ZIMGroupOperatedInfo operatedInfo,
    String groupID){};

// 更新目标用户验证模式
try{
    var result = await ZIM.getInstance()!.updateGroupBeInviteMode(ZIMGroupBeInviteMode.auth, 'groupID');
} on PlatformException catch(onError){
    onError.code;
    onError.message;
}
```
:::
:::if{props.platform="window"}
```cpp
// 监听 onGroupVerifyInfoUpdated 事件
void onGroupVerifyInfoUpdated(zim::ZIM * /*zim*/,
                                const zim::ZIMGroupVerifyInfo & /*verifyInfo*/,
                                const zim::ZIMGroupOperatedInfo & /*operatedInfo*/,
                                const std::string & /*groupID*/) override {
    ......
}

// 更新目标用户验证模式
zim_->updateGroupBeInviteMode(
    zim::ZIMGroupBeInviteMode::ZIM_GROUP_BE_INVITE_MODE_AUTH, group_id,
    [=](/zim-flutter/guides/group/const-std::string-&groupid,-zim::zimgroupbeinvitemode-mode,-const-zim::zimerror-&errorinfo) {
        // 业务代码
    });
```
:::
:::if{props.platform="Web"}
```typescript
// 监听 groupVerifyInfoUpdated 事件
zim.on('groupVerifyInfoUpdated', (zim, data) => {
});

// 更新邀请目标用户验证模式
const groupID = '';
const beInviteMode = 1;
zim.updateGroupBeInviteMode(beInviteMode, groupID)
    .then((res: ZIMGroupBeInviteModeUpdatedResult) => {
        // 操作成功
    })
    .catch((err: ZIMError) => {
        // 操作失败
    });
```
:::
:::if{props.platform="UTS"}
```typescript
// 监听 onGroupVerifyInfoUpdated 事件
zim.onGroupVerifyInfoUpdated((data) => {
});

// 更新邀请目标用户验证模式
const groupID = '';
const beInviteMode = 1;
zim.updateGroupBeInviteMode(beInviteMode, groupID)
    .then((res: ZIMGroupBeInviteModeUpdatedResult) => {
        // 操作成功
    })
    .catch((err: ZIMError) => {
        // 操作失败
    });
```
:::
:::if{props.platform="iOS"}
```objc
// 监听 onGroupVerifyInfoUpdated 事件
- (void)zim:(ZIM *)zim
    groupVerifyInfoUpdated:(ZIMGroupVerifyInfo *)verifyInfo
              operatedInfo:(ZIMGroupOperatedInfo *)operatedInfo
    groupID:(NSString *)groupID{
    
    }

// 更新目标用户验证模式
  [zim updateGroupBeInviteMode:ZIMGroupBeInviteModeAuth groupID:@"groupID" callback:^(NSString * _Nonnull groupID, ZIMGroupBeInviteMode mode, ZIMError * _Nonnull errorInfo) {

  }];
```
:::


### 查询入群申请列表

用户登录 ZIM SDK 后，调用 {getPlatformData(props,queryGroupApplicationListMap)} 接口，可以查询入群申请列表，查询结果包含自己的入群申请和自己被邀请入群的申请。当用户是群主或管理员时，查询结果还会包含他人的入群申请和自己邀请他人入群的申请。


:::if{props.platform=undefined}
```java
ZIMGroupApplicationListQueryConfig config = new ZIMGroupApplicationListQueryConfig();
config.count = 10;
// 首次查询填 0
conifg.nextFlag = 0; 
zim.queryGroupApplicationList(config,  new ZIMGroupApplicationListQueriedCallback() {
     public void onGroupApplicationListQueried(ArrayList<ZIMGroupApplicationInfo> applicationList, int nextFlag, ZIMError errorInfo) {
            // 查询群申请列表结果回调
     }
})
```
:::
:::if{props.platform="Flutter"}
```dart
try{
    ZIMGroupApplicationListQueryConfig queryConfig = ZIMGroupApplicationListQueryConfig();
    queryConfig.count = 100;
    queryConfig.nextFlag = 0;
    var result = await ZIM.getInstance()!.queryGroupApplicationList(queryConfig);
} on PlatformException catch(onError){
    onError.code;
    onError.message;
}
```
:::
:::if{props.platform="window"}
```cpp
zim::ZIMGroupApplicationListQueryConfig config;
config.count = 100;
config.nextFlag = 0;

zim_->queryGroupApplicationList(
    config, [=](/zim-flutter/guides/group/const-std::vector<zim::zimgroupapplicationinfo>-&applicationlist,-unsigned-long-long-nextflag,-const-zim::zimerror-&errorinfo) {
        // 业务代码
    });
```
:::
:::if{props.platform="Web|UTS"}
```typescript
// 查询入群申请列表
const config: ZIMGroupApplicationListQueryConfig = {
    count: 30, // 单次查询数量
    nextFlag: 0 // 锚点，首次查询填 0，下次查询使用当前查询返回 nextFlag 作为锚点
};

zim.queryGroupApplicationList(config)
    .then((res: ZIMGroupApplicationListQueriedResult) => {
        // 操作成功，下次查询使用 res.nextFlag 作为锚点
    })
    .catch((err: ZIMError) => {
        // 操作失败
    });
```
:::
:::if{props.platform="iOS"}
```objc
ZIMGroupApplicationListQueryConfig *config = [[ZIMGroupApplicationListQueryConfig alloc] init];
config.count = 20;
[zim queryGroupApplicationListWithConfig:config callback:^(NSArray<ZIMGroupApplicationInfo *> * _Nonnull applicationList, unsigned int nextFlag, ZIMError * _Nonnull errorInfo) {
    
}];
```
:::
<Content platform="Flutter" />
