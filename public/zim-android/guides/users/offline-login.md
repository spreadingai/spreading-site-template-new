# 离线登录


- - -

## 功能简介

离线登录，是指应用被清理后，用户再次点击应用图标启动应用时，在无网络、未登录成功的状态下直接访问用户本地 SDK 数据，常用于自动登录 App。

<Note title="说明">

用户只能使用上一次成功登录的 UserID 进行离线登录；否则，登录不会成功。
</Note>

## 技术原理

当调用接口离线登录时，ZIM SDK 会进行校验（UseID 校验；如果使用 token 方式登录，还会校验 token 有效期）。校验成功后，SDK 会先行返回登陆成功的回调，允许用户查询本地数据，而 SDK 内部会自动尝试连接后台服务。

## 实现流程

### 1 离线登录

在无网络且应用已被清理的情况下，可以调用 [login](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#login-2) 接口时，[ZIMLoginConfig](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~struct~ZIMLoginConfig) 中的 [isOfflineLogin](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~struct~ZIMLoginConfig#is-offline-login) 传入 `true`，实现使用上一次的用户信息离线登录 App。当通过 [ZIMLoggedInCallback](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~interface~ZIMLoggedInCallback) 回调确定登录成功后，即可访问本地 SDK 数据。 

<Note title="说明">

建议您缓存每次登录使用的用户信息。当 App 打开时，读取缓存，实现以下逻辑：
- 如果判断用户不是使用上一次在线登录的 UserID ，此时 [isOfflineLogin](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~struct~ZIMLoginConfig#is-offline-login) 应为 `false`，此时离线登录会失败，不允许用户访问该 UserID 的本地 SDK 数据。
- 如果用户使用上一次在线登录的 UserID，为了实现自动登录、加速进入 App 主页以及提前渲染 UI，[isOfflineLogin](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~struct~ZIMLoginConfig#is-offline-login) 应为 `true`，实现离线登录。
</Note>




<CodeGroup>
```java title="Sample code"
ZIMLoginConfig config;
config.userName = user_name;
// 使用 AppSign 鉴权时，此参数不填
config.token = token;
config.isOfflineLogin = true;

zim.login("userID", config, new ZIMLoggedInCallback() {
     @Override
     public void onLoggedIn(ZIMError errorInfo) {
         // 离线登录成功，可以查询 SDK 本地数据
     }
}); 
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
<td><ul><li><a href="https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#query-users-info" target="_blank" referer="noopener">queryUsersInfo</a></li><li><a href="https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#query-self-user-info" target="_blank" referer="noopener">querySelfUserInfo</a></li><li><a href="https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#query-group-application-list" target="_blank" referer="noopener">queryGroupApplicationList</a></li><li><a href="https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#query-blacklist" target="_blank" referer="noopener">queryBlacklist</a></li><li><a href="https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#check-user-is-in-blacklist" target="_blank" referer="noopener">checkUserIsInBlackList</a></li><li><a href="https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#search-local-friends" target="_blank" referer="noopener">searchLocalFriends</a></li><li><a href="https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#query-friends-info" target="_blank" referer="noopener">queryFriendsInfo</a></li><li><a href="https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#query-friend-list" target="_blank" referer="noopener">queryFriendList</a></li><li><a href="https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#query-friend-application-list" target="_blank" referer="noopener">queryFriendApplicationList</a></li></ul></td>
</tr>
<tr>
<td>群组相关</td>
<td><ul>
<li><a href="https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#query-group-list" target="_blank" referer="noopener">queryGroupList</a></li>
<li><a href="https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#search-local-groups" target="_blank" referer="noopener">searchLocalGroups</a></li>
<li><a href="https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#query-group-info" target="_blank" referer="noopener">queryGroupInfo</a></li>
<li><a href="https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#query-group-attributes" target="_blank" referer="noopener">queryGroupAttributes</a></li>
<li><a href="https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#query-group-all-attributes" target="_blank" referer="noopener">queryGroupAllAttributes</a></li>
<li><a href="https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#query-group-member-list" target="_blank" referer="noopener">queryGroupMemberList</a></li>
<li><a href="https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#search-local-group-members" target="_blank" referer="noopener">searchLocalGroupMembers</a></li>
<li><a href="https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#query-group-member-info" target="_blank" referer="noopener">queryGroupMemberInfo</a></li>
<li><a href="https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#query-group-member-count" target="_blank" referer="noopener">queryGroupMemberCount</a></li>
<li><a href="https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#query-group-member-muted-list" target="_blank" referer="noopener">queryGroupMemberMutedList</a></li>
</ul></td>
</tr>
<tr>
<td>消息相关</td>
<td><ul>
<li><a href="https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#query-history-message" target="_blank" referer="noopener">queryHistoryMessage</a></li>
<li><a href="https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#update-message-local-extended-data" target="_blank" referer="noopener">updateMessageLocalExtendedData</a></li>
<li><a href="https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#search-local-messages" target="_blank" referer="noopener">searchLocalMessages</a></li>
<li><a href="https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#search-global-local-messages" target="_blank" referer="noopener">searchGlobalLocalMessages</a></li>
<li><a href="https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#insert-message-to-local-db" target="_blank" referer="noopener">insertMessageToLocalDB</a></li>
<li><a href="https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#delete-all-message" target="_blank" referer="noopener">deleteAllMessage</a>：仅支持删除本地数据库中消息。</li>
<li><a href="https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#delete-messages" target="_blank" referer="noopener">deleteMessages</a>：仅支持删除本地数据库中消息。</li>
<li><a href="https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#delete-all-conversation-messages" target="_blank" referer="noopener">deleteAllConversationMessages</a>：仅支持删除本地数据库中消息。</li>
<li><a href="https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#query-message-receipts-info" target="_blank" referer="noopener">queryMessageReceiptsInfo</a></li>
<li><a href="https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#query-message-reaction-user-list" target="_blank" referer="noopener">queryMessageReactionUserList</a></li>
<li><a href="https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#query-group-message-receipt-read-member-list" target="_blank" referer="noopener">queryGroupMessageReceiptReadMemberList</a></li>
<li><a href="https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#query-group-message-receipt-unread-member-list" target="_blank" referer="noopener">queryGroupMessageReceiptUnreadMemberList</a></li>
<li><a href="https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#import-local-messages" target="_blank" referer="noopener">importLocalMessages</a></li>
<li><a href="https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#export-local-messages" target="_blank" referer="noopener">exportLocalMessages</a></li>
</ul></td>
</tr>
<tr>
<td>呼叫邀请相关</td>
<td><a href="https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#query-call-invitation-list" target="_blank" referer="noopener">queryCallInvitationList</a></td>
</tr>
<tr>
<td>会话相关</td>
<td><ul>
<li><a href="https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#query-conversation" target="_blank" referer="noopener">queryConversation</a></li>
<li><a href="https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#query-conversation-list" target="_blank" referer="noopener">queryConversationList</a></li>
<li><a href="https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#query-conversation-pinned-list" target="_blank" referer="noopener">queryConversationPinnedList</a></li>
<li><a href="https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#search-local-conversations" target="_blank" referer="noopener">searchLocalConversations</a></li>
<li><a href="https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#clear-conversation-unread-message-count" target="_blank" referer="noopener">clearConversationUnreadMessageCount</a></li>
<li><a href="https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#clear-conversation-total-unread-message-count" target="_blank" referer="noopener">clearConversationTotalUnreadMessageCount</a></li>
<li><a href="https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#delete-conversation" target="_blank" referer="noopener">deleteConversation</a>：仅支持删除本地数据库中会话。</li>
<li><a href="https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#delete-all-conversations" target="_blank" referer="noopener">deleteAllConversations</a>：仅支持删除本地数据库中会话。</li>
<li><a href="https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#set-conversation-draft" target="_blank" referer="noopener">setConversationDraft</a></li>
</ul></td>
</tr>
<tr>
<td>缓存管理</td>
<td><ul><li><a href="https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#clear-local-file-cache" target="_blank" referer="noopener">clearLocalFileCache</a></li><li><a href="https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#query-local-file-cache" target="_blank" referer="noopener">queryLocalFileCache</a></li></ul></td>
</tr>
</tbody></table>
### 3 监听事件

用户可以监听 [onConnectionStateChanged](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIMEventHandler#on-connection-state-changed) 事件通知获取 SDK 与 ZIM 后台服务的连接情况。

当离线登录成功时，[onConnectionStateChanged](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIMEventHandler#on-connection-state-changed) 返回 [ZIMConnectionState](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~enum~ZIMConnectionState) 为 Connecting（枚举值为 1）。

当用户网络恢复连接，ZIM SDK 内部自动连接 ZIM 后台服务成功后，[onConnectionStateChanged](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIMEventHandler#on-connection-state-changed) 返回 [ZIMConnectionState](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~enum~ZIMConnectionState) 为 Connected（枚举值为 2）时，ZIM SDK 才允许调用强依赖网络的接口，并同步后台数据。