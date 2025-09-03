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

在无网络且应用已被清理的情况下，可以调用 [login](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_harmony~class~ZIM#login-2) 接口时，[ZIMLoginConfig](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_harmony~interface~ZIMLoginConfig) 中的 [isOfflineLogin](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_harmony~interface~ZIMLoginConfig#is-offline-login) 传入 `true`，实现使用上一次的用户信息离线登录 App。登录成功后，即可访问本地 SDK 数据。 

<Note title="说明">

建议您缓存每次登录使用的用户信息。当 App 打开时，读取缓存，实现以下逻辑：
- 如果判断用户不是使用上一次在线登录的 UserID ，此时 [isOfflineLogin](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_harmony~interface~ZIMLoginConfig#is-offline-login) 应为 `false`，此时离线登录会失败，不允许用户访问该 UserID 的本地 SDK 数据。
- 如果用户使用上一次在线登录的 UserID，为了实现自动登录、加速进入 App 主页以及提前渲染 UI，[isOfflineLogin](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_harmony~interface~ZIMLoginConfig#is-offline-login) 应为 `true`，实现离线登录。
</Note>

<CodeGroup>
```typescript title="示例代码"
const userID = '';
const config: ZIMLoginConfig = {
    token: '', // 有效时长不能超过 24 天，请求开发者服务端获取
               // 使用 AppSign 鉴权时，此参数不填
    userName: '',
    customStatus: '',
    isOfflineLogin: true
};

zim.login(userID, config)
    .then(() => {
        // 离线登录成功，可以查询 SDK 本地数据
    })
    .catch((err: ZIMError) => {
        // 登录失败
    });
```
</CodeGroup>


### 2 访问本地 SDK 数据

离线登录成功后，用户可以在断网时实现以下操作（截至 2.12 版本）：

<table>
<tbody><tr>
<th>分类</th>
<th>接口</th>
</tr>
<tr>
<td>用户相关</td>
<td>[queryUsersInfo](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_harmony~class~ZIM#query-users-info)</td>
</tr>
<tr>
<td>群组相关</td>
<td>
- [queryGroupList](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_harmony~class~ZIM#query-group-list)
- [searchLocalGroups](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_harmony~class~ZIM#search-local-groups)
- [queryGroupInfo](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_harmony~class~ZIM#query-group-info)
- [queryGroupAttributes](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_harmony~class~ZIM#query-group-attributes)
- [queryGroupAllAttributes](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_harmony~class~ZIM#query-group-all-attributes)
- [queryGroupMemberList](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_harmony~class~ZIM#query-group-member-list)
- [searchLocalGroupMembers](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_harmony~class~ZIM#search-local-group-members)
- [queryGroupMemberInfo](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_harmony~class~ZIM#query-group-member-info)
- [queryGroupMemberCount](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_harmony~class~ZIM#query-group-member-count)
- [queryGroupMessageReceiptReadMemberList](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_harmony~class~ZIM#query-group-message-receipt-read-member-list)
- [queryGroupMessageReceiptUnreadMemberList](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_harmony~class~ZIM#query-group-message-receipt-unread-member-list)
</td>
</tr>
<tr>
<td>消息相关</td>
<td>
- [queryHistoryMessage](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_harmony~class~ZIM#query-history-message)
- [updateMessageLocalExtendedData](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_harmony~class~ZIM#update-message-local-extended-data)
- [searchLocalMessages](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_harmony~class~ZIM#search-local-messages)
- [searchGlobalLocalMessages](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_harmony~class~ZIM#search-global-local-messages)
- [insertMessageToLocalDB](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_harmony~class~ZIM#insert-message-to-local-db)
- [deleteAllMessage](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_harmony~class~ZIM#delete-all-message)：仅支持删除本地数据库中消息。
- [deleteMessages](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_harmony~class~ZIM#delete-messages)：仅支持删除本地数据库中消息。
- [queryMessageReceiptsInfo](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_harmony~class~ZIM#query-message-receipts-info)
- [queryMessageReactionUserList](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_harmony~class~ZIM#query-message-reaction-user-list)
</td>
</tr>
<tr>
<td>呼叫邀请相关</td>
<td>[queryCallInvitationList](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_harmony~class~ZIM#query-call-invitation-list)</td>
</tr>
<tr>
<td>会话相关</td>
<td>
- [queryConversation](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_harmony~class~ZIM#query-conversation)
- [queryConversationList](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_harmony~class~ZIM#query-conversation-list)
- [queryConversationPinnedList](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_harmony~class~ZIM#query-conversation-pinned-list)
- [searchLocalConversations](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_harmony~class~ZIM#search-local-conversations)
- [clearConversationUnreadMessageCount](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_harmony~class~ZIM#clear-conversation-unread-message-count)
- [clearConversationTotalUnreadMessageCount](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_harmony~class~ZIM#clear-conversation-total-unread-message-count)
- [deleteConversation](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_harmony~class~ZIM#delete-conversation)：仅支持删除本地数据库中会话。
- [deleteAllConversations](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_harmony~class~ZIM#delete-all-conversations)：仅支持删除本地数据库中会话。
</td>
</tr>
</tbody></table>

### 3 监听事件

用户可以监听 [connectionStateChanged](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_harmony~interface~ZIMEventHandler#connection-state-changed) 事件通知获取 SDK 与 ZIM 后台服务的连接情况。

当离线登录成功时，[connectionStateChanged](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_harmony~interface~ZIMEventHandler#connection-state-changed) 返回 [ZIMConnectionState](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_harmony~enum~ZIMConnectionState) 为 Connecting（枚举值为 1）。

当用户网络恢复连接，ZIM SDK 内部自动连接 ZIM 后台服务成功后，[connectionStateChanged](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_harmony~interface~ZIMEventHandler#connection-state-changed) 返回 [ZIMConnectionState](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_harmony~enum~ZIMConnectionState) 为 Connected（枚举值为 2）时，ZIM SDK 才允许调用强依赖网络的接口，并同步后台数据。
