# ZIM 发布日志

- - -

## 2.10.0 版本

**发布日期：2023-09-22**

<Warning title="注意">

[升级到 2.10.0 版本的编译问题，升级前必看 >>](/zim-u3d/client-sdks/zim-upgrade-guide#2100-升级指南)
</Warning>

**新增功能**

| 功能项  | 功能描述 | 相关接口 |
|-------|-------|-------|
|  呼叫邀请新增模式 | 新增进阶模式，支持用户在呼叫中邀请、退出呼叫和结束呼叫。 | <ul><li>[CallingInvite](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~class~ZIM#calling-invite)</li><li>[CallQuit](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~class~ZIM#call-quit)</li><li>[CallEnd](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~class~ZIM#call-end)</li></ul> |
| 撤回他人消息 | 群组会话中，群主可以撤回他人发送的消息。 | [RevokeMessage](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~class~ZIM#revoke-message) |
| 获取房间成员信息 | 支持调用服务端接口，根据房间 ID 获取房间成员的信息，包括房间用户数量、用户 ID 及名称。| [获取房间成员信息](/zim-server/room/obtain-information-about-users-in-a-room) |
| 服务端消息发送接口新增支持更多消息类型 | 支持通过服务端接口发送图片、文件、音频、视频、自定义和弹幕类型消息，详情请参考 [MessageBody 说明](/zim-server/messaging/messagebody-introduction)。 | <ul><li>[发送单聊消息](/zim-server/messaging/send-a-one-to-one-message)</li><li>[发送群组消息](/zim-server/messaging/send-group-messages)</li><li>[发送房间消息](/zim-server/messaging/send-room-messages)</li></ul> |
| 下载外部富媒体消息 | 支持调用 [DownloadMediaFile](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~class~ZIM#download-media-file) 接口，通过外部 URL 下载富媒体消息。 | [DownloadMediaFile](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~class~ZIM#download-media-file) |
| 设置消息拓展字段 | 新增仅本端可见的消息拓展字段，支持更新该字段，可用于展示消息翻译状态或其他内容。 | <ul><li>[localExtendedData](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~class~ZIMMessage#local-extended-data)</li><li>[UpdateMessageLocalExtendedData](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~class~ZIM#update-message-local-extended-data)</li></ul> | 
| 搜索本地消息 | 通过关键字、用户 ID 等条件对单个或所有 `单聊` 和 `群聊` 会话的本地消息进行搜索，获取符合条件的消息列表；也可以基于本地消息搜索会话。| <ul><li>[SearchLocalMessages](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~class~ZIM#search-local-messages)</li><li>[SearchGlobalLocalMessages](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~class~ZIM#search-global-local-messages)</li><li>[SearchLocalConversations](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~class~ZIM#search-local-conversations)</li></ul> |
| 搜索群组 | 支持基于关键字对群组名称进行搜索，同时支持将群成员名称和群成员昵称纳入搜索范围。 | [SearchLocalGroups](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~class~ZIM#search-local-groups) |
| 搜索群成员 | 支持基于关键字对指定群内的群成员名称进行搜索，同时支持将群成员昵称纳入搜索范围。 | [SearchLocalGroupMembers](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~class~ZIM#search-local-group-members) |
|  消息表态 | 支持对单聊和群聊消息做出反应（即表态），一般可用于表情回复消息等场景，也可用于发起群组投票、确认群组结果等操作。此外，还支持删除自己做出的表态，以及查询某个表态相关的用户信息。 | <ul><li>[AddMessageReaction](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~class~ZIM#add-message-reaction)</li><li>[DeleteMessageReaction](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~class~ZIM#delete-message-reaction)</li><li>[QueryMessageReactionUserList](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~class~ZIM#query-message-reaction-user-list)</li></ul> |
| 服务端发送单聊消息接口支持发送者无感知 | 新增 `SenderUnaware` 字段，允许通过服务端发送单聊消息后，请求参数中的 `FromUserId`（发送方用户 ID）所对应的客户端对此次发送无感知。 | [发送单聊消息](/zim-server/messaging/send-a-one-to-one-message) |
| 服务端发送房间消息接口支持发送者有感知 | 新增 `SenderUnaware` 字段，允许通过服务端发送房间消息后，请求参数中的 `FromUserId`（发送方用户 ID）所对应的客户端对此次发送有感知。 | [发送房间消息](/zim-server/messaging/send-room-messages) |
| 服务端新增全员推送接口 | 支持向所有在线用户（包括消息发送用户自己）发送特定内容的消息，如文本、图片等。本功能适用于全员活动公告、送礼跨房间飘屏等场景。 | <ul><li>[全员推送](/zim-server/messaging/push-message-to-all-users)</li><li>[onBroadcastMessageReceived](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~class~ZIMEventHandler#on-broadcast-message-received)</li></ul> |
| 服务端新增查询用户是否在房间内接口 | 支持通过此接口，查询指定用户是否在目标房间内。 | [查询用户是否在房间内](/zim-server/room/query-whether-a-user-is-in-a-room) |


**改进优化**

| 优化项  | 优化描述 | 相关接口 |
| -----  | ---- | ----- |
| 呼叫邀请接收回调 | 优化呼叫邀请普通模式，支持在呼叫邀请的超时时间内，离线用户收到呼叫邀请在上线后能够立即被通知。| [OnCallUserStateChanged](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~class~ZIMEventHandler#on-call-user-state-changed) |
| 用户昵称 UserName 长度上限调整 | 从 64 字节扩展至 256 字节，支持更长昵称，适用于 2.0.0 及以后版本的 ZIM SDK。 | [ZIMUserInfo > userName](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~struct~ZIMFriendInfo#user-name) |

**废弃删除**

| 废弃接口 | 废弃说明 | 废弃版本 |
| -----  | ---- | ----- |
| <ul><li>[OnCallInvitationAccepted](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~class~ZIMEventHandler#on-call-invitation-accepted)</li><li>[OnCallInvitationRejected](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~class~ZIMEventHandler#on-call-invitation-rejected)</li><li>[OnCallInviteesAnsweredTimeout](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~class~ZIMEventHandler#on-call-invitees-answered-timeout)</li></ul> | 为便利开发者监听呼叫邀请中用户的呼叫状态变化，新增 [OnCallUserStateChanged](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~class~ZIMEventHandler#on-call-user-state-changed)，替代原呼叫邀请回调 `OnCallInvitationAccepted`、`OnCallInvitationRejected` 和 `OnCallInviteesAnsweredTimeout`。 | 2.9.0 |

---

## 2.8.0 版本

**发布日期：2023-05-29**

**新增功能**

| 功能项  | 功能描述 | 相关接口 |
|-------|-------|-------|
| 置顶会话 | 用户可以选择想要优先查看的会话，将其固定在会话列表顶部。 | <ul><li>[UpdateConversationPinnedState](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~class~ZIM#update-conversation-pinned-state)</li><li>[QueryConversationPinnedList](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~class~ZIM#query-conversation-pinned-list)</li></ul> |
| 自定义消息类型 | 新增自定义类型消息，开发者可自定义消息的类型，如投票类型、接龙类型、视频卡片类型等，并自行完成消息的解析。ZIM SDK 不负责定义和解析自定义消息的具体内容。 | [ZIMCustomMessage](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~class~ZIMCustomMessage) |
| 查询会话信息 | 通过指定会话 ID 查询会话的详细信息。 | [queryConversation](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~class~ZIM#query-conversation) |
| 查询房间内用户状态 | 通过指定若干 userID 和 roomID，查询目标用户是否在指定房间内，从而进行业务逻辑设计，如邀请连麦。<br />说明：最多支持一次性查询 10 名用户的信息。 | [queryRoomMembers](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~class~ZIM#query-room-members) |
| 消息发送前回调 | 通过设置服务端回调，在用户发送单聊、群聊或房间聊天消息时，ZIM 向开发者服务端发送请求，开发者可实现：<ul><li>拦截违规消息。</li><li>建立用户黑白名单。</li></ul>  | [消息发送前回调](/zim-server/callbacks/message-not-sent-yet) |
| 消息发送后回调 | 通过设置服务端回调，在用户发送单聊、群聊、房间消息成功或失败后，ZIM 向开发者服务端发送请求，开发者可实现：<ul><li>实时记录用户发送的消息。</li><li>统计用户发送的消息。</li><li>直播录屏场景中，通过录制视频的时间戳，将聊天记录嵌入到录播视频中。</li></ul>  | [消息发送后回调](/zim-server/callbacks/message-sent) |
| 批量注册用户 | 支持调用服务端接口，指定用户信息（用户 ID 等），开发者可实现发起一次请求，注册多名用户。**说明**：最多支持一次性注册 100 名用户。 | [批量注册用户](/zim-server/user/batch-register-users) |
| 查询 App 下的群列表 | 支持调用服务端接口获取 App 中所有群组的 ID。 | [查询 App 下的群列表](/zim-server/group/query-group-list-in-the-app) |
| 查询群成员列表 | 支持调用服务端接口，指定群组 ID，获取对应群组的成员列表。 | [查询群成员列表](/zim-server/group/query-group-member-list) |
| 移除群成员 | 支持调用服务端接口，指定群组 ID 和用户 ID，批量群成员。<br />**注意：**最多支持一次性移除 50 名群成员。 | [移除群成员](/zim-server/group/remove-group-member) |


**废弃删除**

| 废弃项  | 废弃描述 | 相关接口 |
| -----  | ---- | ----- |
| 废弃系统消息类型 | [ZIMMessageType](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~enum~ZIMMessageType) 废弃了系统消息（值为 30），开发者请使用功能更完善的自定义消息（值为 200）替代。 | [ZIMMessageTypeCustom](/article/api?doc=zim_API~cs_unity3d~enum~ZIMMessageType#custom) |


**其他事项**

#### 1. 从 2.8.0 版本开始，ZIM 不再支持 iOS 11.0 以下版本，开发者的 iOS Deployment Target（最低支持版本）提升到 iOS 11.0

具体说明，请参考 [App Store submission requirement starts April 25](https://developer.apple.com/news/?id=jd9wcyov) 及 [Xcode 14 Release Notes](https://developer.apple.com/documentation/xcode-release-notes/xcode-14-release-notes#Build-System)。

#### 2. 从 2.8.0 版本开始，ZIM iOS SDK 不再支持 32 位 armv7 架构

具体说明，请参考 [Xcode 14 Release Notes](https://developer.apple.com/documentation/xcode-release-notes/xcode-14-release-notes#Build-System)。

#### 3. 从2.8.0 版本开始，ZIM 不再支持 macOS 10.13 以下版本，开发者的 macOS Deployment Target （最低支持版本）提升到 macOS 10.13

具体说明，请参考 [App Store submission requirement starts April 25](https://developer.apple.com/news/?id=jd9wcyov) 及 [Xcode 14 Release Notes](https://developer.apple.com/documentation/xcode-release-notes/xcode-14-release-notes#Build-System)。

---

## 2.7.1 版本

**发布日期：2023-03-15**

**问题修复**

修复已知问题。

---


## 2.7.0 版本

**发布日期：2023-03-06**

<Note title="说明">

unity 2.7.0 版本首次发布，对齐 iOS/Android/macOS/Windows 等平台的 2.7.0 版本。
</Note>

首次发布，主要功能如下：

| 功能项  | 功能描述 | 相关接口 |
|-------|-------|-------|
| 会话管理 | <ul><li>支持用户更新、查询、删除会话列表。</li><li>支持拉取会话列表，承载所有会话，实现消息列表。</li></ul>| <ul><li>[queryConversationList](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~class~ZIM#query-conversation-list)</li><li>[deleteConversation](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~class~ZIM#delete-conversation)</li></ul>|
| 房间系统 | <ul><li>支持用户登录后，创建、加入、进入、退出、房间。</li><li>进入房间时，如果房间不存在，支持自动创建房间。</li><li>支持房间属性。</li></ul>| <ul><li>[createRoom](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~class~ZIM#create-room)</li><li>[joinRoom](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~class~ZIM#join-room)</li><li>[enterRoom](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~class~ZIM#enter-room)</li><li>[leaveRoom](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~class~ZIM#leave-room)</li><li>[setRoomAttributes](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~class~ZIM#set-room-attributes)</li></ul>|
| 群组系统 | 支持用户登录后，创建、加入、退出、解散群聊；同时配备转让群主、设置群公告等常用功能。| <ul><li>[createGroup](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~class~ZIM#create-group)</li><li>[joinGroup](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~class~ZIM#join-group)</li><li>[leaveGroup](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~class~ZIM#leave-group)</li><li>[dismissGroup](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~class~ZIM#dismiss-group)</li><li>[transferGroupOwner](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~class~ZIM#transfer-group-owner)</li></ul>|
| 消息管理 | <ul><li>支持“单聊/群组/房间”的所有消息存储在本地数据库中，用户更换设备也可拉取到历史信息。</li><li>支持删除“单聊/群组”会话的指定消息或全部消息。</li></ul>| <ul><li>[queryHistoryMessage](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~class~ZIM#query-history-message)</li><li>[deleteMessages](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~class~ZIM#delete-messages)</li><li>[deleteAllMessage](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~class~ZIM#delete-all-message)</li></ul>|
| 呼叫邀请 | <ul><li>支持用户登录后，向指定“用户/群组/房间”发起呼叫邀请、取消邀请；支持其他用户同意邀请、拒绝邀请。</li><li>可应用于视频通话、抱麦申请等场景。</li></ul>| <ul><li>[callInvite](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~class~ZIM#call-invite)</li><li>[callCancel](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~class~ZIM#call-cancel)</li><li>[callAccept](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~class~ZIM#call-accept)</li><li>[callReject](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~class~ZIM#call-reject)</li></ul> |
| 安全审核 | 支持对单聊、群聊和房间内的通讯消息（文本消息）进行安全审核，审核范围包含：鉴黄、暴恐、违禁、涉政、广告等。| <ul><li>[sendMessage](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~class~ZIM#send-message)</li></ul> |
| 信息字段 | <ul><li>支持用户通过扩展字段，设置自己的个人信息，例如用户头像、个性签名、性别等个人信息。</li><li>用户信息及群组头像字段，用户可以上传自己的头像、或自定义群组头像。</li></ul>| <ul><li>[updateUserExtendedData](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~class~ZIM#update-user-extended-data)</li><li>[updateUserAvatarUrl](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~class~ZIM#update-user-avatar-url)</li><li>[ZIMUserFullInfo](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~class~ZIMUserFullInfo)</li><li>[updateGroupAvatarUrl](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~class~ZIM#update-group-avatar-url)</li><li>[ZIMGroupInfo](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~class~ZIMGroupInfo)</li><li>[ZIMConversation](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~class~ZIMConversation)</li></ul>|
