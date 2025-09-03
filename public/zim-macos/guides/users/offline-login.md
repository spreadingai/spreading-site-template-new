# 离线登录

## 功能简介

离线登录，是指应用被清理后，用户再次点击应用图标启动应用时，在无网络、未登录成功的状态下直接访问用户本地 SDK 数据，常用于自动登录 App。

<Note title="说明">

用户只能使用上一次成功登录的 UserID 进行离线登录；否则，登录不会成功。
</Note>

## 技术原理

当调用接口离线登录时，ZIM SDK 会进行校验（UseID 校验；如果使用 token 方式登录，还会校验 token 有效期）。校验成功后，SDK 会先行返回登陆成功的回调，允许用户查询本地数据，而 SDK 内部会自动尝试连接后台服务。



## 实现流程

### 1 离线登录

在无网络且应用已被清理的情况下，可以调用 [loginWithUserID](https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_macos~protocol~ZIM#login-with-user-id-config-callback-2) 接口时，[ZIMLoginConfig](https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_macos~class~ZIMLoginConfig) 中的 [isOfflineLogin](https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_macos~class~ZIMLoginConfig#is-offline-login) 传入 `YES`，实现使用上一次的用户信息离线登录 App。当通过 [ZIMLoggedInCallback](https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_macos~class~ZIMDefines#zim-logged-in-callback) 回调确定登录成功后，即可访问本地 SDK 数据。 

<Note title="说明">
建议您缓存每次登录使用的用户信息。当 App 打开时，读取缓存，实现以下逻辑：
- 如果判断用户不是使用上一次在线登录的 UserID ，此时 [isOfflineLogin](https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_macos~class~ZIMLoginConfig#is-offline-login) 应为 `NO`，此时离线登录会失败，不允许用户访问该 UserID 的本地 SDK 数据。
- 如果用户使用上一次在线登录的 UserID，为了实现自动登录、加速进入 App 主页以及提前渲染 UI，[isOfflineLogin](https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_macos~class~ZIMLoginConfig#is-offline-login) 应为 `YES`，实现离线登录。
</Note>



<CodeGroup>
```objc title="示例代码"
ZIMLoginConfig *config = [[ZIMLoginConfig alloc] init];
config.userName = @"usserName";
// 使用 AppSign 鉴权时，此参数不填
config.token = @"token";
config.isOfflineLogin = YES;
[[ZIM getInstance] loginWithUserID:@"userID" config:config callback:^(ZIMError * _Nonnull errorInfo) {
    if(errorInfo.code == ZIMErrorCodeSuccess){
        // 离线登录成功，可以查询 SDK 本地数据
    }
}];
```
</CodeGroup>



### 2 访问本地 SDK 数据

离线登录成功后，用户可以在断网时实现以下操作（截至 2.15.0 版本）：

<table>
<tbody><tr>
<th>分类</th>
<th>接口</th>
</tr>
<tr>
<td>用户相关</td>
<td><ul>
<li><a href="https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_macos~protocol~ZIM#query-users-info-user-i-ds-config-callback" target="_blank" referer="noopener">queryUsersInfo</a></li>
<li><a href="https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_macos~protocol~ZIM#query-self-user-info-callback" target="_blank" referer="noopener">querySelfUserInfo</a></li>
<li><a href="https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_macos~protocol~ZIM#query-group-application-list-with-config-callback" target="_blank" referer="noopener">queryGroupApplicationListWithConfig</a></li>
<li><a href="https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_macos~protocol~ZIM#query-blacklist-with-config-config-callback">queryBlacklistWithConfig</a></li>
<li><a href="https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_macos~protocol~ZIM#check-user-is-in-black-list-by-user-id-user-id-callback">checkUserIsInBlackListByUserID</a></li>
<li><a href="https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_macos~protocol~ZIM#search-local-friends-with-config-config-callback">searchLocalFriendsWithConfig</a></li>
<li><a href="https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_macos~protocol~ZIM#query-friends-info-by-user-i-ds-user-i-ds-callback">queryFriendsInfoByUserIDs</a></li>
<li><a href="https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_macos~protocol~ZIM#query-friend-list-with-config-config-callback">queryFriendListWithConfig</a></li>
<li><a href="https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_macos~protocol~ZIM#query-friend-application-list-with-config-config-callback">queryFriendApplicationListWithConfig</a></li>
</ul></td>
</tr>
<tr>
<td>群组相关</td>
<td><ul>
<li><a href="https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_macos~protocol~ZIM#query-group-list" target="_blank" referer="noopener">queryGroupList</a></li>
<li><a href="https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_macos~protocol~ZIM#search-local-group-members-by-group-id-group-id-config-callback" target="_blank" referer="noopener">searchLocalGroupsWithConfig</a></li>
<li><a href="https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_macos~protocol~ZIM#query-group-info-by-group-id-callback" target="_blank" referer="noopener">queryGroupInfoByGroupID</a></li>
<li><a href="https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_macos~protocol~ZIM#query-group-attributes-by-keys-group-id-callback" target="_blank" referer="noopener">queryGroupAttributesByKeys</a></li>
<li><a href="https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_macos~protocol~ZIM#query-group-all-attributes-by-group-id-callback" target="_blank" referer="noopener">queryGroupAllAttributesByGroupID</a></li>
<li><a href="https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_macos~protocol~ZIM#query-group-member-list-by-group-id-config-callback" target="_blank" referer="noopener">queryGroupMemberListByGroupID</a></li>
<li><a href="https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_macos~protocol~ZIM#search-local-group-members-by-group-id-group-id-config-callback" target="_blank" referer="noopener">searchLocalGroupMembersByGroupID</a></li>
<li><a href="https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_macos~protocol~ZIM#query-group-member-info-by-user-id-group-id-callback" target="_blank" referer="noopener">queryGroupMemberInfoByUserID</a></li>
<li><a href="https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_macos~protocol~ZIM#query-group-member-count-by-group-id-group-id-callback" target="_blank" referer="noopener">queryGroupMemberCountByGroupID</a></li>
<li><a href="https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_macos~protocol~ZIM#query-group-member-muted-list-by-group-id-config-callback" target="_blank" referer="noopener">queryGroupMemberMutedListByGroupID</a></li>
</ul></td>
</tr>
<tr>
<td>消息相关</td>
<td><ul>
<li><a href="https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_macos~protocol~ZIM#query-history-message-by-conversation-id-conversation-type-config-callback" target="_blank" referer="noopener">queryHistoryMessageByConversationID</a></li>
<li><a href="https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_macos~protocol~ZIM#update-message-local-extended-data-local-extended-data-message-callback" target="_blank" referer="noopener">updateMessageLocalExtendedData</a></li>
<li><a href="https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_macos~protocol~ZIM#search-local-messages-by-conversation-id-conversation-id-conversation-type-config-callback" target="_blank" referer="noopener">searchLocalMessagesByConversationID</a></li>
<li><a href="https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_macos~protocol~ZIM#search-global-local-messages-with-config-config-callback" target="_blank" referer="noopener">searchGlobalLocalMessagesWithConfig</a></li>
<li><a href="https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_macos~protocol~ZIM#insert-message-to-local-db-message-conversation-id-conversation-type-sender-user-id-callback" target="_blank" referer="noopener">insertMessageToLocalDB</a></li>
<li><a href="https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_macos~protocol~ZIM#delete-all-message-by-conversation-id-conversation-id-conversation-type-config-callback" target="_blank" referer="noopener">deleteAllMessageByConversationID</a>：仅支持删除本地数据库中消息。</li>
<li><a href="https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_macos~protocol~ZIM#delete-messages-message-list-conversation-id-conversation-type-config-callback" target="_blank" referer="noopener">deleteMessages</a>：仅支持删除本地数据库中消息。</li><li><a href="https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_macos~protocol~ZIM#delete-all-conversation-messages-with-config-config-callback" target="_blank" referer="noopener">deleteAllConversationMessages</a>：仅支持删除本地数据库中消息。</li>
<li><a href="https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_macos~protocol~ZIM#query-message-receipts-info-by-message-list-message-list-conversation-id-conversation-type-callback" target="_blank" referer="noopener">queryMessageReceiptsInfoByMessageList</a></li>
<li><a href="https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_macos~protocol~ZIM#query-message-reaction-user-list-by-message-message-config-callback" target="_blank" referer="noopener">queryMessageReactionUserListByMessage</a></li>
<li><a href="https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_macos~protocol~ZIM#query-group-message-receipt-read-member-list-by-message-message-group-id-config-callback" target="_blank" referer="noopener">queryGroupMessageReceiptReadMemberListByMessage</a></li><li><a href="https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_macos~protocol~ZIM#query-group-message-receipt-unread-member-list-by-message-message-group-id-config-callback" target="_blank" referer="noopener">queryGroupMessageReceiptUnreadMemberListByMessage</a></li>
<li><a href="https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_macos~protocol~ZIM#import-local-messages-to-folder-path-folder-path-config-progress-callback" target="_blank" referer="noopener">importLocalMessagesToFolderPath</a></li>
<li><a href="https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_macos~protocol~ZIM#export-local-messages-to-folder-path-folder-path-config-progress-callback" target="_blank" referer="noopener">exportLocalMessagesToFolderPath</a></li>
</ul></td>
</tr>
<tr>
<td>呼叫邀请相关</td>
<td><a href="https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_macos~protocol~ZIM#query-call-invitation-list-with-config-callback" target="_blank" referer="noopener">queryCallInvitationListWithConfig</a></td>
</tr>
<tr>
<td>会话相关</td>
<td><ul>
<li><a href="https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_macos~protocol~ZIM#query-conversation-conversation-id-conversation-type-callback" target="_blank" referer="noopener">queryConversation</a></li>
<li><a href="https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_macos~protocol~ZIM#query-conversation-list-with-config-callback" target="_blank" referer="noopener">queryConversationListWithConfig</a></li>
<li><a href="https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_macos~protocol~ZIM#query-conversation-list-with-config-callback" target="_blank" referer="noopener">queryConversationPinnedListWithConfig</a></li>
<li><a href="https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_macos~protocol~ZIM#search-local-conversations-with-config-config-callback" target="_blank" referer="noopener">searchLocalConversationsWithConfig</a></li>
<li><a href="https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_macos~protocol~ZIM#clear-conversation-unread-message-count-conversation-type-config-callback" target="_blank" referer="noopener">clearConversationUnreadMessageCount</a></li>
<li><a href="https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_macos~protocol~ZIM#clear-conversation-total-unread-message-count-callback" target="_blank" referer="noopener">clearConversationTotalUnreadMessageCount</a></li>
<li><a href="https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_macos~protocol~ZIM#delete-conversation-conversation-type-config-callback" target="_blank" referer="noopener">deleteConversation</a>：仅支持删除本地数据库中会话。</li>
<li><a href="https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_macos~protocol~ZIM#delete-all-conversations-with-config-config-callback" target="_blank" referer="noopener">deleteAllConversationsWithConfig</a>：仅支持删除本地数据库中会话。</li>
<li><a href="https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_macos~protocol~ZIM#set-conversation-draft-draft-conversation-id-conversation-type-callback" target="_blank" referer="noopener">setConversationDraft</a></li>
</ul></td>
</tr>
<tr>
<td>缓存管理</td>
<td><ul>
<li><a href="https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_macos~protocol~ZIM#clear-local-file-cache-with-config-config-callback" target="_blank" referer="noopener">clearLocalFileCacheWithConfig</a></li>
<li><a href="https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_macos~protocol~ZIM#query-local-file-cache-with-config-config-callback" target="_blank" referer="noopener">queryLocalFileCacheWithConfig</a></li><li><a href="https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#query-combine-message-detail">queryCombineMessageDetail</a></li>
</ul></td>
</tr>
</tbody>
</table>

### 3 监听事件

用户可以监听 [connectionStateChanged](https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_macos~protocol~ZIMEventHandler#zim-connection-state-changed-event-extended-data) 事件通知获取 SDK 与 ZIM 后台服务的连接情况。

当离线登录成功时，[connectionStateChanged](https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_macos~protocol~ZIMEventHandler#zim-connection-state-changed-event-extended-data) 返回 [ZIMConnectionState](https://doc-zh.zego.im/article/api?doc=zim_API~objectivec_ios~enum~ZIMConnectionState) 为 Connecting（枚举值为 1）。

当用户网络恢复连接，ZIM SDK 内部自动连接 ZIM 后台服务成功后，[connectionStateChanged](https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_macos~protocol~ZIMEventHandler#zim-connection-state-changed-event-extended-data) 返回 [ZIMConnectionState](https://doc-zh.zego.im/article/api?doc=zim_API~objectivec_ios~enum~ZIMConnectionState) 为 Connected（枚举值为 2）时，ZIM SDK 才允许调用强依赖网络的接口，并同步后台数据。