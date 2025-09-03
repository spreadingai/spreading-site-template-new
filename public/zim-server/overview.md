
# API 概览

---

ZIM 服务端提供以下相关 API 接口及回调，可参考 [调用方式](/zim-server/accessing-server-apis) 调用以下接口。

## 用户相关

|接口名称|接口功能| 默认调用频率限制|
|-|-|-|
|[查询用户在线状态](/zim-server/user/query-users-online-status)| 查询单个用户、或批量查询多个用户的在线状态。| 20 次/秒 |
|[批量注册用户](/zim-server/user/batch-register-users)| 批量帮用户注册 IM 账号。| 20 次/秒 |
|[修改用户资料](/zim-server/user/modify-user-information)| 修改用户资料信息，包括用户昵称、头像等。| 20 次/秒 |
|[批量添加好友](/zim-server/user/batch-add-friends)| 为用户直接批量添加至多 20 名好友，无需对方同意。| 20 次/秒 |
|[批量发送好友申请](/zim-server/user/batch-send-friend-requests)| 为一名用户批量向至多 20 名其他用户发送好友申请。| 20 次/秒 |
|[批量删除好友](/zim-server/user/batch-delete-friends)| 为用户批量单向或双向删除至多 20 名好友。| 20 次/秒 |
|[删除所有好友](/zim-server/user/delete-all-friends)| 为用户单向或双向删除全部好友数据。| 20 次/秒 |
|[查询好友列表](/zim-server/user/query-the-friend-list)| 根据用户 ID 分页拉取其好友列表，获取备注、好友关系建立时间等信息。| 20 次/秒 |
|[检查好友关系](/zim-server/user/check-friendships)| 批量检查一名用户与至多 20 名其他用户的好友关系。| 20 次/秒 |
|[更新好友备注](/zim-server/user/change-the-alias-of-a-friend)| 为一名用户批量修改至多 20 名好友的备注。| 20 次/秒 |
|[更新好友属性](/zim-server/user/modify-the-attributes-of-a-friend)| 为用户修改其好友的好友属性。| 20 次/秒 |
|[批量拉黑用户](/zim-server/user/batch-block-users)| 为用户批量拉黑至多 20 名用户，不再接收相关用户消息。| 20 次/秒 |
|[批量移除黑名单](/zim-server/user/batch-unblock-users)| 为用户批量将 20 名用户从黑名单移除。| 20 次/秒 |
|[查询黑名单](/zim-server/user/query-the-blocklist)| 根据用户 ID 分页拉取其全量黑名单数据。| 20 次/秒 |
|[检查黑名单关系](/zim-server/user/check-blockships)| 为一名用户批量检查其与至多 20 名其他用户的黑名单关系（是否已拉黑这些用户）。| 20 次/秒 |

## 房间相关

|接口名称|接口功能| 默认调用频率限制|
|-|-|-|
| [创建房间](/zim-server/room/create-a-room) | 创建房间。 | 20 次/秒 |
| [查询房间属性](/zim-server/room/query-room-attributes) | 查询房间属性。 | 20 次/秒 |
| [更新房间属性](/zim-server/room/update-room-attributes) | 更新房间属性。 | 20 次/秒 |
| [获取房间成员信息](/zim-server/room/obtain-information-about-users-in-a-room) |获取房间成员的信息，包括房间用户数量、用户 ID 及名称。|20 次/秒|
| [移除房间成员](/zim-server/room/remove-user-from-the-room) | 移除房间内的指定用户。 |20 次/秒|
| [销毁房间](/zim-server/room/destroy-the-room) | 销毁房间。 | 20 次/秒 |
| [查询用户是否在房间内](/zim-server/room/query-whether-a-user-is-in-a-room) | 查询用户是否在指定房间内。 | 20 次/秒 |

## 群组相关

|接口名称|接口功能| 默认调用频率限制|
|-|-|-|
| [创建群组](/zim-server/group/create-a-group) | 创建群组 | 20 次/秒 |
| [修改群组资料](/zim-server/group/update-group-data) | 修改群组资料信息，包括群组头像、群组名称、群组公告等。 | 20 次/秒 |
| [查询群组资料](/zim-server/group/query-group-info) | 查询群资料，包含群组名称、群组公告、群组头像、群组禁言信息、群组规格限制、群组创建时间和群组属性。
 | 20 次/秒 |
| [修改群规格限制](/zim-server/group/modify-group-specification-limits) | 修改群组的进群模式、邀请模式、受邀请模式和群成员上线 | 20 次/秒 |
| [查询 App 下的群列表](/zim-server/group/query-group-list-in-the-app) | 获取 App 中所有群组消息。 | 20 次/秒 |
| [查询群成员列表](/zim-server/group/query-group-member-list) | 根据群组 ID 获取群组中的用户列表。 | 20 次/秒 |
| [移除群成员](/zim-server/group/remove-group-member) | 通过指定用户 ID 移除群内用户。 | 20 次/秒 |
| [转让群主](/zim-server/group/transfer-the-group-ownership) | 将群主身份转移给群内其他成员。 | 1 次/秒，群级别限制 |
| [添加群成员](/zim-server/group/add-group-members) | 向指定的群中批量添加新成员。 | 1 次/秒，群级别限制 |
| [设置群成员昵称](/zim-server/group/set-nicknames-of-group-members) | 批量修改群内成员在该群中的昵称。 | 1 次/秒，群级别限制 |
| [设置群成员角色](/zim-server/group/set-group-member-roles) | 为群成员设置在群内的角色。 | 20 次/秒 |
| [设置群禁言](/zim-server/group/mute-a-group) | 禁言或解禁群组全员或某些群角色。 | 20 次/秒 |
| [设置群成员禁言](/zim-server/group/mute-group-members) | 禁言或解禁群组内的特定成员。 | 20 次/秒 |
| [查询 App 下的禁言群组列表](/zim-server/group/fetch-forbid-group-list) | 查询 App 中的所有禁言群组的 ID，包含处于全员禁言、按群组角色禁言或按用户 ID 禁言状态的群组。 | 20 次/秒 |
| [解散群组](/zim-server/group/disband-a-group-chat) | 解散群组。 | 1 次/秒，群级别限制 |

## 消息相关

|接口名称|接口功能| 默认调用频率限制|
|-|-|-|
| [发送单聊消息](/zim-server/messaging/send-a-one-to-one-message) | 发送 1v1 单聊消息，支持向单个用户、或批量向多个用户发送消息。 | 20 次/秒 |
| [发送群组消息](/zim-server/messaging/send-group-messages) | 发送群组消息，并推送给群组内的所有在线用户。 | 10 次/秒 |
| [发送房间消息](/zim-server/messaging/send-room-messages) | 发送房间消息，推送给房间内的所有在线用户。 | 10 次/秒 |
| [全员推送](/zim-server/messaging/push-message-to-all-users) | 向所有在线用户（包括消息发送用户自己）发送特定内容的消息，如文本、图片等。 | 1 次/秒，每 24 小时内仅限 100 次 |
| [撤回单聊消息](/zim-server/messaging/recall-a-one-to-one-message) | 撤回 2 分钟内的单聊会话消息。 | 20 次/秒 |
| [撤回群聊消息](/zim-server/messaging/recall-a-group-message) | 撤回 2 分钟内的群聊会话消息。 | 20 次/秒 |
| [导入单聊消息](/zim-server/messaging/import-one-to-one-messages) | 向 ZIM 导入用户的历史单聊消息。 | 20 次/秒 |
| [导入群聊消息](/zim-server/messaging/import-group-messages) | 向 ZIM 导入群组的历史消息。 | 20 次/秒 |
| [查询消息](/zim-server/messaging/query-messages) |查询单个指定会话（群聊、单聊）中的多条消息。 | 20 条消息/秒 |
| [编辑消息](/zim-server/messaging/edit-a-message) | 编辑 24 小时内已发送的单聊或群聊消息。 | 20 次/秒 |
| [删除指定单聊用户全部消息](/zim-server/messaging/delete-all-messages-from-a-one-to-one-conversaiton-user) | 删除单聊会话中某一用户的全部消息。 | 20 次/秒 |
| [删除指定群聊用户全部消息](/zim-server/messaging/delete-all-messages-from-a-group-member) | 端删除群聊会话中某一用户的全部消息。 | 20 次/秒 |

## 呼叫邀请

|接口名称|接口功能| 默认调用频率限制|
|-|-|-|
| [发起呼叫邀请](/zim-server/call-invitation/send-a-call-invitation) | 创建 **普通模式** 的呼叫邀请。 | 20 次/秒 |
| [接受呼叫邀请](/zim-server/call-invitation/accept-a-call-invitation) | 为用户接受呼叫邀请。 | 20 次/秒 |
| [拒绝呼叫邀请](/zim-server/call-invitation/reject-a-call-invitation) | 为用户拒绝呼叫邀请。 | 20 次/秒 |

## 会话相关

| 接口名称                                                                                          | 接口功能                                   | 默认调用频率限制 |
| ------------------------------------------------------------------------------------------------- | ------------------------------------------ | ---------------- |
| [设置会话消息免打扰](/zim-server/conversation/mute-notifications-for-conversations)               | 设置单聊或群聊会话的消息免打扰状态。              | 20 次/秒         |
| [置顶会话](/zim-server/conversation/pin-conversations-to-the-top)                               | 为用户批量置顶或取消置顶至多 20 个会话。   | 20 次/秒         |
| [查询会话列表](/zim-server/conversation/query-conversation-list)                                    | 拉取指定用户的全量会话列表。               | 20 次/秒         |
| [查询单聊会话消息列表](/zim-server/conversation/query-the-message-list-of-one-on-one-chats) | 分页拉取指定用户的某个单聊会话的消息列表。 | 20 次/秒         |
| [查询群聊会话消息列表](/zim-server/conversation/query-the-message-list-of-group-chats)      | 分页拉取某个群聊会话的消息列表。           | 20 次/秒         |
| [设置会话标记](/zim-server/conversation/set-conversation-marks)                                     | 为用户对多个会话设置或取消标记。           | 20 次/秒         |
| [删除会话](/zim-server/conversation/delete-a-conversation)                                             | 删除一个会话。                             | 20 次/秒         |

## 机器人

|接口名称|接口功能| 默认调用频率限制|
|-|-|-|
| [注册机器人](/zim-server/bot/register-bots) | 创建多个机器人。 | 20 次/秒 |

## 语音组件

|接口名称|接口功能| 默认调用频率限制|
|-|-|-|
| [获取鉴权信息](/zim-server/zim-audio/obtain-a-license) | 获取用于 ZIM 语音组件鉴权的 License。 | 20 次/秒 |

## 回调

### 用户相关

| 回调名称 | 回调说明 |
|---------|---------|
| [登录登出回调](/zim-server/callbacks/login-and-logout) | 开发者可以监听用户上下线行为，实现如统计在线用户等业务逻辑。 |

### 房间相关

| 回调名称 | 回调说明 |
| -------- | -------- |
| [创建房间回调](/zim-server/callbacks/room/room-created) | 实时监听用户创建房间的行为，查看用户创建的房间的信息。 |
| [加入房间回调](/zim-server/callbacks/room/room-entered)| 实时监听用户加入特定房间的信息，可用于通知后台有成员进入房间。 |
| [离开房间回调](/zim-server/callbacks/room/room-left)| 实时监听用户退出特定房间的信息，可用于通知后台有成员退出房间。 |
| [销毁房间回调](/zim-server/callbacks/room/room-destroyed) | 实时监听用户销毁房间的行为，可用于记录用户销毁房间的日志。 |

### 群组相关

| 回调名称 | 回调说明 |
| -------- | -------- |
| [创建群组回调](/zim-server/callbacks/group/group-created) | 实时监听用户创建群组的行为，获取该群组的信息。 |
| [加入群组回调](/zim-server/callbacks/group/group-joined) | 实时查看用户加入特定群组的信息，可用于通知后台有成员入加群组。 |
| [离开群组回调](/zim-server/callbacks/group/group-left) | 实时监听用户退出特定群组的信息，可用于通知后台有成员退出群组。 |
| [解散群组回调](/zim-server/callbacks/group/group-destroyed) | 实时监听用户解散群组的行为，可用于记录用户解散群组的日志。 |

### 呼叫相关

| 回调名称 | 回调说明 |
|---------|---------|
| [呼叫创建回调](/zim-server/callbacks/call-invitation-sent) | 用户在客户端成功创建呼叫后，业务后台可以接收 ZIM 服务端的呼叫创建回调，用于确定呼叫创建成功请求。 |
| [呼叫取消回调](/zim-server/callbacks/call-invitation-canceled) | 当出现以下情况时，业务后台可以接收 ZIM 服务端的呼叫取消回调，用于确定呼叫状态：<ul><li>呼叫发起用户成功取消呼叫</li><li>呼叫发起用户在成功创建呼叫后主动登出或心跳超时后为登出态</li></ul> |
| [呼叫接受回调](/zim-server/callbacks/call-invitation-accepted) | 当呼叫对象接受呼叫后，业务后台可以接收 ZIM 服务端的呼叫接受回调，用于确定呼叫接受成功请求。 |
| [呼叫拒绝回调](/zim-server/callbacks/call-invitation-rejected) | 当呼叫对象拒绝呼叫后，业务后台可以接收 ZIM 服务端的呼叫拒绝回调，用于确定呼叫拒绝成功请求。 |
| [呼叫超时回调](/zim-server/callbacks/call-invitation-timed-out) | 呼叫创建成功后，当出现以下情况时，业务后台可以接收 ZIM 服务端的呼叫超时回调，用于确定呼叫超时用户：<ul><li>呼叫对象一直未应答，直到满足后台配置的超时时间</li><li>呼叫对象一直未应答，直到满足创建呼叫时设置的超时时间</li></ul> |

### 消息相关

| 回调名称 | 回调说明 |
|---------|---------|
| [消息发送前回调](/zim-server/callbacks/message-not-sent-yet) | 设置此回调后，当用户发送单聊、群聊或房间聊天消息时，ZIM 会向您的业务后台发起请求，您可以通过应答，对消息进行实时操作。 |
| [消息发送后回调](/zim-server/callbacks/message-sent) | 用户发送单聊、群聊、房间消息成功或失败后，业务后台可以接收 ZIM 服务端的发送消息回调，将用户发送的消息实时同步至业务服务器，并存储于业务服务器。 |
| [单聊机器人发送消息后回调](/zim-server/callbacks/one-to-one-conversation-bot-message-sent) | 机器人发送单聊消息成功或失败后，业务后台可以接收 ZIM 服务端的发送消息回调，将机器人发送的消息实时同步至业务服务器，并存储于业务服务器。 |