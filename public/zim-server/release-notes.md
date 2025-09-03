
# 发布日志

## 2025 年 07 月

**发布日期：2025-07-24**

**新增功能**

| 功能项 |功能描述| 相关接口 |
| ---------------------------------------- | ------------------------------------------ | ------------------------------------------- |
| 查询房间属性                             |  支持查询房间属性。 | [查询房间属性](/zim-server/room/query-room-attributes)                                             |

---

**发布日期：2025-07-15**

**新增功能**

| <div style={{width:"80px"}}>功能项</div> | <div style={{width:"80px"}}>功能描述</div> | <div style={{width:"120px"}}>相关接口</div> |
| ---------------------------------------- | ------------------------------------------ | ------------------------------------------- |
| 创建房间                                 |  支持创建房间。创建房间时可以设置房间名称，属性，以及销毁延迟时间。 | [创建房间](/zim-server/room/create-a-room)                                             |
| 更新房间属性                             |  支持更新房间属性。 | [更新房间属性](/zim-server/room/update-room-attributes)                                             |

---


## 2025 年 06 月

**发布日期：2025-06-30**

**新增功能**

| <div style={{width:"80px"}}>功能项</div>  | <div style={{width:"80px"}}>功能描述</div> | <div style={{width:"120px"}}>相关接口</div> |
| ------------------------------  | ---- | ----- |
| 群组资料 | <ul><li>支持查询群组资料，包含群组名称、群组公告、群组头像、群组禁言信息、群组规格限制、群组创建时间和群组属性。</li><li>支持修改群组资料，包括群组头像、群组名称、群组公告等。</li></ul> | <ul><li>[查询群组资料](/zim-server/group/query-group-info)</li><li>[修改群组资料](/zim-server/group/update-group-data)</li></ul> |
| 查询 App 下的禁言群组列表 | 支持查询 App 中的所有禁言群组的 ID，包含处于全员禁言、按群组角色禁言或按用户 ID 禁言状态的群组。 | [查询 App 下的禁言群组列表](/zim-server/group/fetch-forbid-group-list) |
| 群定向消息 | 发送群组消息接口新增 `TargetOption` 字段，支持构建用户列表并指定消息是否对列表中的用户可见。 | [发送群消息](/zim-server/messaging/send-group-messages) |
| 发送消息携带角标 | `MessageBody.OfflinePush` 新增 `EnableBadge` 字段，支持指定推送消息时是否携带角标信息。 | [MessageBody 说明](/zim-server/messaging/messagebody-introduction#offlinepush-说明房间消息不支持此字段) |
| 图片消息支持大图和缩略图 | 图片消息的 `Message` 接口新增 `LargeImage` 和 `Thumbnail` 字段，支持开发者设置图片大图和缩略图。 | [MessageBody 说明](/zim-server/messaging/messagebody-introduction#图片消息) |
| 新增回调 | 新增创建群组、解散群组、加入群组、离开群组、创建房间、销毁房间、加入房间、退出房间的服务端事件回调。 | <ul><li>[创建群组回调](/zim-server/callbacks/group/group-created)</li><li>[解散群组回调](/zim-server/callbacks/group/group-destroyed)</li><li>[加入群组回调](/zim-server/callbacks/group/group-joined)</li><li>[离开群组回调](/zim-server/callbacks/group/group-left)</li><li>[创建房间回调](/zim-server/callbacks/room/room-created)</li><li>[销毁房间回调](/zim-server/callbacks/room/room-destroyed)</li><li>[加入房间回调](/zim-server/callbacks/room/room-entered)</li><li>[退出房间回调](/zim-server/callbacks/room/room-left)</li></ul> |
| 消息发送前回调应答拒绝理由 | 消息发送前回调应答参数新增 `reason` 字段，支持开发者设置拒绝发送消息的理由。<Note title="说明">如需使用此字段，请联系 ZEGO 技术支持配置相应开关。</Note> | [消息发送前回调](/zim-server/callbacks/message-not-sent-yet#应答参数) |

**改进优化**

| <div style={{width:"100px"}}>优化项</div>  | 优化描述 | 相关接口 |
| -----  | ---- | ----- |
| 禁言相关接口优化| 支持非群组成员调用服务端接口设置群禁言和群成员禁言。<Note title="说明">如果因为非群组成员进行上述操作触发群 tips 消息时，开发者需要隐藏该消息或实现其他处理，避免群内用户产生困惑。</Note> | <ul><li>[设置群禁言](/zim-server/group/mute-a-group)</li><li>[设置群成员禁言](/zim-server/group/mute-group-members)</li></ul> |

---

## 2025 年 04 月

**发布日期：2025-04-30**

**新增功能**

| <div style={{width:"80px"}}>功能项</div>  | <div style={{width:"80px"}}>功能描述</div> | <div style={{width:"120px"}}>相关接口</div> |
| ------------------------------  | ---- | ----- |
| 编辑消息 | 支持编辑 24 小时内发送的单聊或群聊消息。| [编辑消息](/zim-server/messaging/edit-a-message) |
| 删除会话 | 支持删除一个会话。 | [删除会话](/zim-server/conversation/delete-a-conversation) |
| 删除指定群聊用户全部消息 | 删除群聊会话中某一用户的全部消息。| [删除指定群聊用户全部消息](/zim-server/messaging/delete-all-messages-from-a-group-member) |
| 删除指定单聊用户全部消息 | 删除单聊会话中某一用户的全部消息。| [删除指定单聊用户全部消息](/zim-server/messaging/delete-all-messages-from-a-one-to-one-conversaiton-user) |
| 注册单聊机器人| 支持注册多个单聊机器人。| [注册机器人](/zim-server/bot/register-bots) |
| 单聊机器人发送消息后回调 | 机器人发送单聊消息成功或失败后，业务后台可以接收 ZIM 服务端的发送消息回调，将机器人发送的消息实时同步至业务服务器，并存储于业务服务器。 | [单聊机器人发送消息后回调](/zim-server/callbacks/one-to-one-conversation-bot-message-sent) |

---


## 2025 年 03 月

**发布日期：2025-03-21**

**新增功能**

| <div style={{width:"80px"}}>功能项</div>  | <div style={{width:"80px"}}>功能描述</div> | <div style={{width:"120px"}}>相关接口</div> |
| ------------------------------  | ---- | ----- |
| 清除单个会话消息未读数  | 支持为指定用户清除指定会话的消息未读数。 | [清除单个会话消息未读数](/zim-server/conversation/clear-the-unread-message-count-of-a-conversation) |
| 发送消息接口新参数 | 消息发送接口新增参数 `NoUnread` ，使得通过服务端发送的消息不会增加接收方的未读数。 | <ul><li>[发送单聊消息](/zim-server/messaging/send-a-one-to-one-message#请求参数)</li><li>[发送群聊消息](/zim-server/messaging/send-group-messages#请求参数)</li></ul> |

---

## 2025 年 01 月

**发布日期：2025-01-06**

**新增功能**

| <div style={{width:"80px"}}>功能项</div>  | <div style={{width:"80px"}}>功能描述</div> | <div style={{width:"120px"}}>相关接口</div> |
| ------------------------------  | ---- | ----- |
| 组合消息  | 新增组合消息类型，支持在一条消息中包含多种内容项，包括文本、图片、音频、视频、文件以及自定义消息。可实现如文本+图片、文本+视频、文本+音频等多种组合方式，灵活满足不同场景需求。 | [MessageBody 说明](/zim-server/messaging/messagebody-introduction) |
| 查询消息 | 支持在服务端通过传入 MsgSeq 列表查询单个指定会话（群聊、单聊）中的多条消息。| [查询消息](/zim-server/messaging/query-messages) |
| 消息发送前后回调支持获取媒体消息详细内容 | 当消息类型为媒体消息时，开发者可以通过这两个回调获取如原图宽高、大图宽高、缩略图宽高、视频首帧宽高等详细信息。 | <ul><li>[消息发送前回调 - msg_body JSON 字符串解析结果参数说明 - 多媒体消息](/zim-server/callbacks/message-not-sent-yet#多媒体消息)</li><li>[消息发送后回调 - msg_body JSON 字符串解析结果参数说明 - 多媒体消息](/zim-server/callbacks/message-sent#多媒体消息)</li></ul>|
| 宽高字段纠正 | 当调用服务端接口发送图片消息和视频消息时，ZIM 服务端会检查消息体中有关图片宽高、视频首帧宽高的字段。若相关字段不正确，ZIM 服务端会纠正相关字段。 | <ul><li>[MessageBody 说明 - 图片消息 - Message 结构](/zim-server/messaging/messagebody-introduction#message-结构-2)</li><li>[MessageBody 说明 - 视频消息 - Message 结构](/zim-server/messaging/messagebody-introduction#message-结构-5)</li></ul> |
| 审核失败原因 | 发送消息接口的响应参数中新增了 `AuditInfos` 字段。当消息因审核未通过而导致发送失败时，该字段提供审核失败的详细原因。 | <ul><li>[发送单聊消息 - 响应参数](/zim-server/messaging/send-a-one-to-one-message#响应参数)</li><li>[发送群聊消息 - 响应参数](/zim-server/messaging/send-group-messages#响应参数)</li><li>[发送房间消息 - 响应参数](/zim-server/messaging/send-room-messages#响应参数)</li></ul> |

**改进优化**

| <div style={{width:"100px"}}>优化项</div>  | 优化描述 | 相关接口 |
| -----  | ---- | ----- |
| 单个会话的标记数量限制上调 | 每个会话可拥有的标记数量上限从 20 上调至 30。 | [设置会话标记](/zim-server/conversation/set-conversation-marks) |

---

## 2024 年 10 月

**发布日期：2024-10-15**

**新增功能**

| <div style={{width:"80px"}}>功能项</div>  | <div style={{width:"80px"}}>功能描述</div> | <div style={{width:"120px"}}>相关接口</div> |
| ------------------------------  | ---- | ----- |
| 查询用户信息 | 支持在服务端通过用户 ID 查询用户的信息，包含用户名称、用户头像和扩展字段。| [查询用户信息](/zim-server/user/query-user-information) |
| 撤回房间消息 | 支持从服务端调用接口撤回房间消息。| [撤回房间消息](/zim-server/messaging/recall-a-room-message) |

**改进优化**

| <div style={{width:"80px"}}>功能项</div>  | <div style={{width:"80px"}}>功能描述</div> | <div style={{width:"120px"}}>相关接口</div> |
| -----  | ---- | ----- |
| 发送群聊消息响应参数优化 | 服务端 API `SendGroupMessage` 的响应参数新增 `MsgId`，可用于定位消息。 | [发送群组消息](/zim-server/messaging/send-group-messages) |
| 消息发送后回调参数优化 | 当消息发送失败，消息发送后回调中的 `msg_id` 参数将不再为空。 | [消息发送后回调](/zim-server/callbacks/message-sent) |
| 获取消息拓展字段 | 支持通过消息发送前回调中的 `payload` 参数获取用户发送消息时传入的拓展字段。 | [消息发送前回调](/zim-server/callbacks/message-not-sent-yet) |
| `MessageBody` 扩展字段长度可上调 | `MessageBody` 结构中的 `ExtendedData` 长度上限默认为 1 KB。如需上调，请联系 ZEGO 技术支持。| [MessageBody 说明](/zim-server/messaging/messagebody-introduction) |

---

## 2024 年 08 月

**发布日期：2024-08-02**

**新增功能**

| <div style={{width:"80px"}}>功能项</div>  | <div style={{width:"80px"}}>功能描述</div> | <div style={{width:"120px"}}>相关接口</div> |
| -----  | ---- | ----- |
| 会话标记 | 支持用户对会话设置标记，适用于需要关注某会话或无法处理某条会话的场景。可使用本功能实现会话分组，即对多个会话设置相同的标记。  | [设置会话标记](/zim-server/conversation/set-conversation-marks) |
| 离线消息推送无限频 | 支持开发者在调用服务端接口 [发送单聊消息](/zim-server/messaging/send-a-one-to-one-message) 和 [发送群组消息](/zim-server/messaging/send-group-messages) 向国内 Android 厂商进行无限频离线推送。 | [MessageBody 说明 - OfflinePush - PushStrategyId](/zim-server/messaging/messagebody-introduction#offlinepush-说明房间消息不支持此字段) |
| 服务端发送房间消息接口支持发送者有感知 | 新增 `SenderUnaware` 字段，允许通过服务端发送房间消息后，请求参数中的 `FromUserId`（发送方用户 ID）所对应的客户端对此次发送有感知。 | [发送房间消息](/zim-server/messaging/send-room-messages) |

---

## 2024 年 05 月

**发布日期：2024-05-31**

**新增功能**

| <div style={{width:"80px"}}>功能项</div>  | <div style={{width:"80px"}}>功能描述</div> | <div style={{width:"120px"}}>相关接口</div> |
| -----  | ---- | ----- |
| 管理呼叫邀请 | 支持在服务端发起、接受和拒绝呼叫邀请。 | <ul><li>[发起呼叫邀请](/zim-server/call-invitation/send-a-call-invitation)</li><li>[接受呼叫邀请](/zim-server/call-invitation/accept-a-call-invitation)</li><li>[拒绝呼叫邀请](/zim-server/call-invitation/reject-a-call-invitation)</li></ul> |
| 管理禁言 | 支持在服务端禁言群组和特定群成员。 | <ul><li>[设置群禁言](/zim-server/group/mute-a-group)</li><li>[设置群成员禁言](/zim-server/group/mute-group-members)</li></ul> |
| 设置群成员角色 | 支持在服务端修改群成员的角色。 | [设置群成员角色](/zim-server/group/set-group-member-roles) |

---

## 2024 年 03 月

**发布日期：2024-03-29**

**新增功能**

| <div style={{width:"80px"}}>功能项</div>  | <div style={{width:"80px"}}>功能描述</div> | <div style={{width:"120px"}}>相关接口</div> |
|-------|-------|-------|
| 查询会话列表 | 支持在服务端分页查询用户最新的 1000 个会话（单聊与群聊）。| [查询会话列表](/zim-server/conversation/query-conversation-list) |
| 查询历史消息 | 支持在服务端分页查询用户指定单聊或群聊会话的历史消息列表。| <ul><li>[查询单聊会话消息列表](/zim-server/conversation/query-the-message-list-of-one-on-one-chats)</li><li>[查询群聊会话消息列表](/zim-server/conversation/query-the-message-list-of-group-chats)</li></ul> |
| 修改群组规格 | 支持在服务端修改群组的入群验证模式、邀请模式、邀请目标验证模式和群成员人数上限。| [修改群组规格限制](/zim-server/group/modify-group-specification-limits) |

**改进优化**

| <div style={{width:"80px"}}>功能项</div>  | <div style={{width:"80px"}}>功能描述</div> | <div style={{width:"120px"}}>相关接口</div> |
| -----  | ---- | ----- |
| 服务端创建群组接口新增参数 | 新增 `CreateGroupTime` 参数，支持设置创建群组的事件。 | [创建群组](/zim-server/group/create-a-group) |
| 服务端添加群成员接口新增参数 | 新增 `GroupMemberInfos` 参数，支持定义入群用户的入群时间和入群模式。 | [添加群成员](/zim-server/group/add-group-members) |

---

## 2024 年 02 月

**发布日期：2024-02-02**

**新增功能**

| <div style={{width:"80px"}}>功能项</div>  | <div style={{width:"80px"}}>功能描述</div> | <div style={{width:"120px"}}>相关接口</div> |
|-------|-------|-------|
| 设置会话免打扰 | 支持在服务端对群聊会话和单聊会话设置免打扰状态。 | [设置会话消息免打扰](/zim-server/conversation/mute-notifications-for-conversations) |
| 置顶会话 | 支持在服务端为用户设置会话的置顶状态。 | [置顶会话](/zim-server/conversation/pin-conversations-to-the-top) |
| 修改群资料 | 支持在服务端修改群组的头像、名称和公告。<Note title="说明">如需使用此功能，请联系 ZEGO 技术支持了解详情。</Note> | - |
| 管理好友 | 支持在服务端为用户添加和删除好友，查询好友列表，检查好友关系，更新好友备注和属性。 | <ul><li>[批量添加好友](/zim-server/user/batch-add-friends)</li><li>[批量发送好友申请](/zim-server/user/batch-send-friend-requests)</li><li>[批量删除好友](/zim-server/user/batch-delete-friends)</li><li>[查询好友列表](/zim-server/user/query-the-friend-list)</li><li>[检查好友关系](/zim-server/user/check-friendships)</li><li>[更新好友备注](/zim-server/user/change-the-alias-of-a-friend)</li><li>[更新好友属性](/zim-server/user/modify-the-attributes-of-a-friend)</li></ul> |
| 管理黑名单 | 支持在服务端为用户批量拉黑、解除黑名单、查询黑名单、检查黑名单关系。 | <ul><li>[批量拉黑用户](/zim-server/user/batch-block-users)</li><li>[批量移除黑名单](/zim-server/user/batch-unblock-users)</li><li>[查询黑名单](/zim-server/user/query-the-blocklist)</li><li>[检查黑名单关系](/zim-server/user/check-blockships)</li></ul> |

---

## 2024 年 01 月

**发布日期：2024-01-05**

**新增功能**

| <div style={{width:"80px"}}>功能项</div>  | <div style={{width:"80px"}}>功能描述</div> | <div style={{width:"120px"}}>相关接口</div> |
|-------|-------|-------|
| 撤回消息 | 支持从服务端调用接口撤回单聊消息和群聊消息。 | <ul><li>[撤回单聊消息](/zim-server/messaging/recall-a-one-to-one-message)</li><li>[撤回群聊消息](/zim-server/messaging/recall-a-group-message)</li></ul> |
| 修改用户资料 | 支持从服务端调用接口修改用户资料信息，包括用户昵称、头像等。 | [修改用户资料](/zim-server/user/modify-user-information) |


**改进优化**

| <div style={{width:"80px"}}>功能项</div>  | <div style={{width:"80px"}}>功能描述</div> | <div style={{width:"120px"}}>相关接口</div> |
| -----  | ---- | ----- |
| 发送单聊消息接口新增响应参数 | 新增 `SuccessList` 参数，成员参数包含 `UserId`、`MsgId` 和 `MsgSeq`，说明消息接受成功用户的相关信息。`MsgSeq` 可用于 [撤回单聊消息](/zim-server/messaging/recall-a-one-to-one-message)。 | [发送单聊消息](/zim-server/messaging/send-a-one-to-one-message) |
| 发送群聊消息接口新增响应参数 | 新增 `MsgSeq`，可用于 [撤回群聊消息](/zim-server/messaging/recall-a-group-message)。 | [发送群聊消息](/zim-server/messaging/send-group-messages) |
| 消息发送后回调新增字段 | 新增 `user_list` 字段，用于批量返回消息接收用户信息。**说明**：仅当开发者调用服务端接口 [发送单聊消息](/zim-server/messaging/send-a-one-to-one-message) 时，此字段有值。| [消息发送后回调](/zim-server/callbacks/message-sent) |

---

## 2023 年 11 月

**发布日期：2023-11-20**

**新增功能**

| <div style={{width:"80px"}}>功能项</div>  | <div style={{width:"80px"}}>功能描述</div> | <div style={{width:"120px"}}>相关接口</div> |
|-------|-------|-------|
| 添加群成员 | 支持将指定用户拉进至群组中。 | [添加群成员](/zim-server/group/add-group-members) |
| 解散群组 | 支持解散指定群组。 | [解散群组](/zim-server/group/disband-a-group-chat) |
| 转让群主 | 支持将群主转让给指定的群成员。 | [转让群主](/zim-server/group/transfer-the-group-ownership) |
| 设置群成员昵称 | 支持为指定群成员设置其群昵称。 | [设置群成员昵称](/zim-server/group/set-nicknames-of-group-members) |
| 消息支持附带回执 | 通过服务端发送单聊消息、群聊消息时，可以附带回执功能，以便得知消息是否已读。支持的消息类型包含文本、图片、文件、音频、视频、自定义消息，详情请参考 [MessageBody 说明](/zim-server/messaging/messagebody-introduction)。 | <ul><li>[发送单聊消息](/zim-server/messaging/send-a-one-to-one-message)</li><li>[发送群组消息](/zim-server/messaging/send-group-messages)</li></ul> |
| 登录登出回调 | 在用户登录、退出时，ZIM 服务端会主动回调通知给开发者服务端。 | [登录登出回调](/zim-server/callbacks/login-and-logout) |
| 全员离线推送 | 在调用服务端接口进行全员推送时，支持选择推送类型，实现离线推送。 | [全员推送](/zim-server/messaging/push-message-to-all-users) |

**改进优化**

| <div style={{width:"130px"}}>优化项</div>  | 优化描述 | 相关接口 |
| -----  | ---- | ----- |
| 呼叫创建服务端回调 | 呼叫创建服务端回调新增 `caller` 字段说明发起呼叫的用户，详情请参考 [呼叫创建回调](/zim-server/callbacks/call-invitation-sent)。 | - |

---

## 2023 年 10 月

**发布日期：2023-10-26**

**新增功能**

| <div style={{width:"80px"}}>功能项</div>  | <div style={{width:"80px"}}>功能描述</div> | <div style={{width:"120px"}}>相关接口</div> |
| -----  | ---- | ----- |
| 新增信令消息支持类型 | 支持通过服务端发送经 base64 编码后的二进制信令消息，详情请参考 [MessageBody 说明](/zim-server/messaging/messagebody-introduction)。 | - |

---

## 2023 年 08 月

**发布日期：2023-08-31**

**新增功能**

| <div style={{width:"80px"}}>功能项</div>  | <div style={{width:"80px"}}>功能描述</div> | <div style={{width:"120px"}}>相关接口</div> |
|-------|-------|-------|
| 发送单聊消息接口支持发送者无感知 | 新增 `SenderUnaware` 字段，允许通过服务端发送单聊消息后，请求参数中的 `FromUserId`（发送方用户 ID）所对应的客户端对此次发送无感知。 | [发送单聊消息](/zim-server/messaging/send-a-one-to-one-message) |
| 发送房间消息接口支持发送者有感知 | 新增 `SenderUnaware` 字段，允许通过服务端发送房间消息后，请求参数中的 `FromUserId`（发送方用户 ID）所对应的客户端对此次发送有感知。 | [发送房间消息](/zim-server/messaging/send-room-messages) |
| 全员推送 | 支持向所有在线用户（包括消息发送用户自己）发送特定内容的消息，如文本、图片等。本功能适用于全员活动公告、送礼跨房间飘屏等场景。 | [全员推送](/zim-server/messaging/push-message-to-all-users) |
| 查询用户是否在房间内 | 支持通过此接口，查询指定用户是否在目标房间内。 | [查询用户是否在房间内](/zim-server/room/query-whether-a-user-is-in-a-room) |

---

## 2023 年 07 月

**发布日期：2023-07-18**

**新增功能**

| <div style={{width:"80px"}}>功能项</div>  | <div style={{width:"80px"}}>功能描述</div> | <div style={{width:"120px"}}>相关接口</div> |
|-------|-------|-------|
| 获取房间成员信息 | 支持调用服务端接口，根据房间 ID 获取房间成员的信息，包括房间用户数量、用户 ID 及名称。| [获取房间成员信息](/zim-server/room/obtain-information-about-users-in-a-room) |
| 消息发送接口新增支持更多消息类型 | 支持通过服务端接口发送图片、文件、音频、视频、自定义和弹幕类型消息，详情请参考 [MessageBody 说明](/zim-server/messaging/messagebody-introduction)。 | <ul><li>[发送单聊消息](/zim-server/messaging/send-a-one-to-one-message)</li><li>[发送群组消息](/zim-server/messaging/send-group-messages)</li><li>[发送房间消息](/zim-server/messaging/send-room-messages)</li></ul> |

---

## 2023 年 05 月

**发布日期：2023-05-23**

**新增功能**

| <div style={{width:"80px"}}>功能项</div>  | <div style={{width:"80px"}}>功能描述</div> | <div style={{width:"120px"}}>相关接口</div> |
|-------|-------|-------|
| 消息发送前回调 | 通过设置服务端回调，在用户发送单聊、群聊或房间聊天消息时，ZIM 向开发者服务端发送请求，开发者可实现：<ul><li>拦截违规消息。</li><li>建立用户黑白名单。</li></ul>  | [消息发送前回调](/zim-server/callbacks/message-not-sent-yet) |
| 消息发送后回调 | 通过设置服务端回调，在用户发送单聊、群聊、房间消息成功或失败后，ZIM 向开发者服务端发送请求，开发者可实现：<ul><li>实时记录用户发送的消息。</li><li>统计用户发送的消息。</li><li>直播录屏场景中，通过录制视频的时间戳，将聊天记录嵌入到录播视频中。</li></ul>  | [消息发送后回调](/zim-server/callbacks/message-sent) |
| 批量注册用户 | 支持调用服务端接口，指定用户信息（用户 ID 等），开发者可实现发起一次请求，注册多名用户。**说明**：最多支持一次性注册 100 名用户。 | [批量注册用户](/zim-server/user/batch-register-users) |
| 查询 App 下的群列表 | 支持调用服务端接口获取 App 中所有群组的 ID。 | [查询 App 下的群列表](/zim-server/group/query-group-list-in-the-app) |
| 查询群成员列表 | 支持调用服务端接口，指定群组 ID，获取对应群组的成员列表。 | [查询群成员列表](/zim-server/group/query-group-member-list) |
| 移除群成员 | 支持调用服务端接口，指定群组 ID 和用户 ID，批量群成员。<br /><Note title="说明">最多支持一次性移除 50 名群成员。</Note> | [移除群成员](/zim-server/group/remove-group-member) |

---

## 2023 年 01 月

**发布日期：2023-01-11**

**新增功能**

| <div style={{width:"80px"}}>功能项</div>  | <div style={{width:"80px"}}>功能描述</div> | <div style={{width:"120px"}}>相关接口</div> |
|-------|-------|-------|
| 服务端新增呼叫邀请相关回调 | 用户可以通过 ZIM 服务端的回调，明确呼叫邀请的结果，适用于网络环境不好时，SDK 反馈的结果不稳定。 | <ul><li>[呼叫创建回调](/zim-server/callbacks/call-invitation-sent)</li><li>[呼叫取消回调](/zim-server/callbacks/call-invitation-canceled)</li><li>[呼叫接受回调](/zim-server/callbacks/call-invitation-accepted)</li><li>[呼叫拒绝回调](/zim-server/callbacks/call-invitation-rejected)</li><li>[呼叫超时回调](/zim-server/callbacks/call-invitation-timed-out)</li></ul> |