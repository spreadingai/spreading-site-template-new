# 群组管理

- - -

<Note title="说明">

本文档适用于开发以下平台应用：iOS、Android、macOS、Windows。
</Note>

## 功能简介

ZIM SDK 提供了群组管理功能，支持用户创建/解散群组、加入/退出群组，持久化维系群组关系。

群组管理功能可应用于办公群、社交群、兴趣群以及粉丝群等场景中，群组成员数量上限请参考 [计费说明](/zim-u3d/guides/content-moderation/instruction)。



## 实现流程

以下流程中，我们以客户端 A 创建/解散群组，其他客户端加入/退出群组为例。

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/ZIM/Common/GroupManagement.png" /></Frame>

### 1 创建群组

客户端 A 登录 ZIM SDK 后，调用 [CreateGroup](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~class~ZIM#create-group) 接口，创建一个群组，此时 A 就是 `群主`；其他客户端可以根据 A 创建的群组 groupID 加入群组。

开发者可以通过 [ZIMGroupCreatedCallback](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~interface~ZIMDefines#zim-group-created-callback)，判断群组是否创建成功。相关错误码请查看 [常见错误码](/zim-u3d/sdk-error-codes/zim)。

<Warning title="注意">

- “groupID” 支持开发者自定义规则生成，仅支持数字，英文字符和 {"'!'、'#'、'$'、'%'、'&'、'('、')'、'+'、'-'、':'、';'、'<'、'='、'.'、'>'、'?'、'@'、'['、']'、'^'、'_'、'{'、'}'、'|'、'~'"}，且不能以 ’#‘ 开头；若该字段为空，ZIM 服务器会自动生成。建议开发者将 “groupID” 设置为一个有意义的值，可将其与自己的业务账号系统进行关联。
- 调用 [CreateGroup](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~class~ZIM#create-group) 接口创建群组后，会直接加入群组，无需再调用 [JoinGroup](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~class~ZIM#join-group) 接口加入群组。
- 用户创建群组时，该用户即是该群组的“群主”。如果想要转让身份，请参考 [转让群主](/zim-u3d/guides/group/group-members#转让群主)。
- 创建群组后，群主可以通过 [SendMessage](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~class~ZIM#send-message) 接口，向群内发送消息，详情请参考 [收发群组消息](/zim-u3d/guides/messaging/send-and-receive-messages)。
</Warning>



<CodeGroup>
```cs title="示例代码"
// 创建一个群组

ZIMGroupInfo groupInfo = new ZIMGroupInfo();
// groupID 最大 32 字节的字符串。仅支持数字，英文字符 和 '!', '#', '$', '%', '&', '(', ')', '+', '-', ':', ';', '<', '=', '.', '>', '?', '@', '[', ']', '^', '_', '{', '}', '|', '~'，且不能以 ’#‘ 开头。
groupInfo.groupID = "group_id";
// groupName 最大 50 字节的字符串，无特殊字符限制。
groupInfo.groupName = "groupName";
groupInfo.groupAvatarUrl = "groupAvatarUrl";

ZIMGroupAdvancedConfig config = new ZIMGroupAdvancedConfig();
Dictionary<string, string> attributes = new Dictionary<string, string>();
attributes.Add("key_0", "value_0");
attributes.Add("key_1", "value_1");
attributes.Add("key_2", "value_2");
config.groupAttributes = attributes;

List<string> userList = new List<string>();
userList.Add("user_1");
userList.Add("user_2");

ZIM.GetInstance().CreateGroup(groupInfo, userList, config, (ZIMGroupFullInfo groupInfo, List<ZIMGroupMemberInfo> userIDs,
    List<ZIMErrorUserInfo> errorUserList, ZIMError errorInfo) =>
        {
            // 通过 errorInfo.code 获取创建群的结果
        }
);
```
</CodeGroup>

### 2 加入群组

<Note title="说明">

如需用户加入群组后自动获取群历史消息，请联系 ZEGO 技术支持进行配置。
</Note>



其他用户登录后，加入由 A 创建的群组，有两种方式（二选一）：

- 直接加入群组，即主动加入群组：

    用户直接调用 [JoinGroup](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~class~ZIM#join-group) 接口，传入 groupID（groupID 必须已经存在，否则会操作失败），直接加入群组。加入成功后，全体群成员（包括自己）都会收到 [OnGroupMemberStateChanged](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~class~ZIMEventHandler#on-group-member-state-changed) 的回调通知。

- 由群内成员添加入群组，即被动加入群组。

    该群组内的成员，调用 [InviteUsersIntoGroup](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~class~ZIM#invite-users-into-group) 接口，传入 groupID（groupID 必须已经存在，否则会操作失败）、userIDs（需要被添加的用户列表），添加其他用户加入群组。加入成功后，全体群成员（包括自己、被添加的用户）都会收到 [OnGroupMemberStateChanged](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~class~ZIMEventHandler#on-group-member-state-changed) 的回调通知。

<Warning title="注意">

- 群内成员调用 [InviteUsersIntoGroup](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~class~ZIM#invite-users-into-group) 接口，邀请其他用户加入群组时：
    - 被添加的用户将直接进入群组，无需同意。
    - 被添加的用户 userID，必须是真实存在的（即已经通过 [login](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~class~ZIM#login) 接口登录注册过），否则会操作失败。
- 加入群组后，成员可以通过 [SendMessage](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~class~ZIM#send-message) 接口，向群内发送消息，详情请参考 [收发群组消息](/zim-u3d/guides/messaging/send-and-receive-messages)。
</Warning>



<CodeGroup>
```cs title="示例代码"
// 其他客户端直接加入群组
ZIM.GetInstance().JoinGroup("groupID", (ZIMGroupFullInfo groupInfo, ZIMError errorInfo) =>
{
    // 通过 errorInfo.code 获取加入群组的结果
}
);

// 由群内成员添加入群组
List<string> userList = new List<string>();
userList.Add("user_1");
userList.Add("user_2");
ZIM.GetInstance().InviteUsersIntoGroup(userList, "groupID", (string groupID, List<ZIMGroupMemberInfo> userList,
List<ZIMErrorUserInfo> errorUserList, ZIMError errorInfo) =>
    {
        // 通过 errorInfo.code 获取添加入群组的结果
    }
);
```
</CodeGroup>

### 3 退出群组

成员退出群组也存在两种方式（二选一）：

- 直接退出群组，即主动退出群组。

    成员登录后，直接调用 [LeaveGroup](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~class~ZIM#leave-group) 接口，传入 groupID（groupID 必须已经存在，否则会操作失败），主动退出群组。退出成功后，全体群成员（包括自己）都会收到 [OnGroupMemberStateChanged](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~class~ZIMEventHandler#on-group-member-state-changed) 的回调通知。

- 群主移除群内成员，即被动退出群组。

    群主调用 [KickGroupMembers](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~class~ZIM#kick-group-members) 接口，传入 groupID（groupID 必须已经存在，否则会操作失败）、userIDs（需要被移除的成员列表），移除这些成员。移除成功后，全体群成员（包括群主自己、被移除的成员）都会收到 [OnGroupMemberStateChanged](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~class~ZIMEventHandler#on-group-member-state-changed) 的回调通知。

<Warning title="注意">

- 只有群主可以调用 [KickGroupMembers](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~class~ZIM#kick-group-members) 接口，移除群内成员；且移除成员时，该成员无需登录在线，也无需经过该成员同意，即可直接移除。
- 被移除的用户 userID，必须是存在于本群组的成员列表内，否则会操作失败。
- 群主退出群组时，群主身份将自动转让给加入本群组最早的那个成员；所有成员退出群组时，群组自动解散。
- 用户退出群组后，不会清除本地的会话列表，还可以看到退出之前的群内聊天记录。
</Warning>




<CodeGroup>
```cs title="示例代码"
// 主动退出群组
ZIM.GetInstance().LeaveGroup("groupID", (string groupID, ZIMError errorInfo) =>
{
    // 通过 errorInfo.code 获取主动退出群组的结果
}
);

// 群主移除群内成员
List<string> user_list = new List<string>();
user_list.Add("user_1");
user_list.Add("user_2");
ZIM.GetInstance().KickGroupMembers(user_list, "group_id", (string groupID, List<string> kickedUserIDList,
   List<ZIMErrorUserInfo> errorUserList, ZIMError errorInfo) =>
    {
        // 通过 errorInfo.code 获取移除群成员的结果
    }
);
```
</CodeGroup>

### 4 解散群组

群主登录后，如果想要解散群组，可以通过 [DismissGroup](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~class~ZIM#dismiss-group) 接口，解散群组。解散群组成功后，全体群成员都会收到 [OnGroupStateChanged](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~class~ZIMEventHandler#on-group-state-changed) 回调通知。

<Note title="说明">

- 只有群主才能调用 [DismissGroup](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~class~ZIM#dismiss-group) 接口，解散群组。
- 所有成员退出群组时，群组将自动解散。
- 群组解散后，不会清除本地的会话列表，用户还可以看到退出之前的群内聊天记录。
</Note>



<CodeGroup>
```cs title="示例代码"
// 群主解散群组
ZIM.GetInstance().DismissGroup("groupID", (string groupID, ZIMError errorInfo) =>
    {
        // 通过 errorInfo.code 获取群主解散群组的结果
    }
);
```
</CodeGroup>

## 更多功能

### 查询已加入群组列表

用户登录后，如果想要了解自己加入了哪些群组，可以通过 [QueryGroupList](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~class~ZIM#query-group-list) 接口，获取自己已加入的群组列表。




<CodeGroup>
```cs title="示例代码"
// 用户查询自己加入了哪些群组
ZIM.GetInstance().QueryGroupList((List<ZIMGroup> groupList, ZIMError errorInfo) =>
    {
        // 通过 errorInfo.code 获取用户加入的群组结果
    }
);
```
</CodeGroup>

### 搜索已加入群组

用户登录 ZIM SDK 后，如果想要根据条件对已加入的群组进行搜索，可以调用 [SearchLocalGroups](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~class~ZIM#search-local-groups) 接口，传入 config、callback 搜索群组。

搜索结果将通过 [ZIMGroupsSearchedCallback](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~interface~ZIMDefines#zim-groups-searched-callback) 回调接口返回。




<CodeGroup>
```cs title="示例代码"
// 搜索名称中包含 “zego” 的已加入群组
ZIMGroupMemberSearchConfig config = new ZIMGroupMemberSearchConfig();
config.count = 10;
config.nextFlag = 0;
config.isAlsoMatchGroupMemberNickname = true; // 如果群成员昵称包含 “zego”，搜索结果将包含该群组
config.isAlsoMatchGroupMemberUserName = true; // 如果群成员用户名称包含 ”zego“，搜索结果将包含该群组
config.keywords.Add("zego");
ZIM.GetInstance().SearchLocalGroups(groupSearchConfig, (List<ZIMGroupSearchInfo> groupSearchInfoList,
        uint nextFlag, ZIMError errorInfo) =>
    {
        // 开发者可从 groupSearchInfoList 中获取到群组信息
    });
```
</CodeGroup>
