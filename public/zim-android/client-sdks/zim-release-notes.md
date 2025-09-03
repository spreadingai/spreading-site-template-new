# ZIM 发布日志

---

## 2.21.1 版本

**发布日期：2025-07-08**

**问题修复**

1. 修复在同一个 ZIM 实例的生命周期内，[onConversationSyncStateChanged](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIMEventHandler#on-conversation-sync-state-changed) 事件通知在 “登录登出再登录” 后失效的问题。
2. 修复 “收到不计入未读数消息” 以及 “多端登录时其他设备所发送的消息” 的情况下，未读数出现异常的问题

---

## 2.21.0 版本

**发布日期：2025-06-30**

**新增功能**

| <div style={{width:"130px"}}>功能项</div>  | 功能描述 | 相关接口 |
| ------------------------------  | ---- | ----- |
| 多端登录支持房间模块 | 支持多个设备使用相同 UserID 加入同一房间，且不会相互踢出。详情请参考 [多端登录 - 房间管理](/zim-android/guides/users/multi-device-login#房间管理)。 | - |
| 群组定向消息 | ZIM 支持用户在调用 [ZIM 服务端接口](/zim-server/messaging/send-group-messages#targetoption) 发送群组消息时，指定对某些群用户是否可见。详情请参考 [群组定向消息](/zim-android/guides/messaging/group-targeted-message)。 | [onGroupMessageReceived](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIMEventHandler#on-group-message-received) |
| 会话列表同步状态回调 | 当用户登录 ZIM 服务时或断线重连后，可通过 [onConversationSyncStateChanged](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIMEventHandler#on-conversation-sync-state-changed) 回调，得知其从 ZIM 服务端同步最新会话列表的状态。详情请参考 [获取会话列表 - 监听会话列表同步状态变更](/zim-android/guides/conversation/get-the-conversation-list#监听会话列表同步状态变更)。 | [onConversationSyncStateChanged](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIMEventHandler#on-conversation-sync-state-changed) |
| 消息编辑 | 支持编辑自定义消息的检索字段（[ZIMCustomMessage > searchedContent](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~struct~ZIMCustomMessage#searched-content)），详情请参考 [编辑消息](/zim-android/guides/messaging/edit-messages)。 | [editMessage](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#edit-message) |

**改进优化**

| <div style={{width:"100px"}}>优化项</div>  | 优化描述 | 相关接口 |
| -----  | ---- | ----- |
| OPPO 推送优化 | 为适配 OPPO 消息分类新规（[OPUSH 消息分类细则](https://open.oppomobile.com/documentation/page/info?id=13189)），支持开发者设置 `category` 和 `notify_level` 字段。详情请参考 [OPPO 推送集成指南](/zim-android/offline-push-notifications/integrate-oppo#根据-oppo-消息分类新规申请消息分类) | - |
| 群组列表和会话列表拉取性能优化 | 优化了加载群组列表和会话列表的速度。 | - |

---

## 2.20.0 版本

**发布日期：2025-03-21**

**新增功能**

| <div style={{width:"130px"}}>功能项</div>  | 功能描述 | 相关接口 |
| ------------------------------  | ---- | ----- |
| 消息编辑 | 支持编辑单聊消息和群聊消息的内容和其他属性，详情请参考 [编辑消息](/zim-android/guides/messaging/edit-messages)。<Note>此接口默认仅适用于过去 24 小时内的消息。</Note> | [editMessage](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#edit-message) |
| 自定义用户状态 | 支持开发者自定义用户状态，适用于登录或其他需要在线状态以外状态的等场景（如隐身、听歌中、通话中），详情请参考 [用户状态订阅 - 设置自定义状态](/zim-android/guides/users/online-status-subscription#设置自定义状态)。 | <ul><li>[ZIMLoginConfig > customStatus](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~struct~ZIMLoginConfig#custom-status)</li><li>[updateUserCustomStatus](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#update-user-custom-status)</li></ul> |
| 消息重发 | 当用户发送消息时遭遇断网，如果网络在 30 秒内恢复，ZIM SDK 会自动重发该消息。如果网络在 30 秒后恢复，用户可以手动重发该消息，详情请参考 [收发消息 - 消息重发](/zim-android/guides/messaging/send-and-receive-messages#重发消息)。 | [ZIMMessageSendConfig > isRetrySend](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~struct~ZIMMessageSendConfig#is-retry-send) |

---

## 2.19.0 版本

**发布日期：2025-01-06**

**新增功能**

| <div style={{width:"130px"}}>功能项</div>  | 功能描述 | 相关接口 |
| ------------------------------  | ---- | ----- |
| 组合消息  | 新增组合消息类型，支持在一条消息中包含多种内容项，包括文本、图片、音频、视频、文件以及自定义消息。可实现如文本+图片、文本+视频、文本+音频等多种组合方式，灵活满足不同场景需求。详情请参考 [收发消息 - 收发组合消息](/zim-android/guides/messaging/send-and-receive-messages#收发组合消息)。| [ZIMMultipleMessage](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~struct~ZIMMultipleMessage) |
| 图片格式  | 图片消息新增支持 HEIC 和 HEIF 格式，进一步扩展了兼容的图片类型，满足更多场景需求。 | [ZIMImageMessage](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~struct~ZIMImageMessage) |
| 图片宽高信息  | ZIMImageMessage 支持开发者在发送图片消息时传入原图、大图、缩略图等图片宽高信息。ZIMVideoMessage 支持开发者在发送视频消息时传入视频首帧图宽高信息。 | <ul><li>[ZIMImageMessage - originalImageWidth](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~struct~ZIMImageMessage#original-image-width)</li><li>[ZIMImageMessage - originalImageHeight](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~struct~ZIMImageMessage#original-image-height)</li><li>[ZIMImageMessage - largeImageWidth](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~struct~ZIMImageMessage#large-image-width)</li><li>[ZIMImageMessage - largeImageHeight](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~struct~ZIMImageMessage#large-image-height)</li><li>[ZIMImageMessage - thumbnailWidth](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~struct~ZIMImageMessage#thumbnail-width)</li><li>[ZIMImageMessage - thumbnailHeight](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~struct~ZIMImageMessage#thumbnail-height)</li><li>[ZIMVideoMessage - videoFirstFrameWidth](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~struct~ZIMVideoMessage#video-first-frame-width)</li><li>[ZIMVideoMessage - videoFirstFrameHeight](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~struct~ZIMVideoMessage#video-first-frame-height)</li></ul> |


**改进优化**

| <div style={{width:"100px"}}>优化项</div>  | 优化描述 | 相关接口 |
| -----  | ---- | ----- |
| 会话标记列表超限处理逻辑改进 | 当用户标记的会话数量达到上限（默认为 1000）时，ZIM 的处理逻辑从原先的报错优化为自动取消最早标记的会话，确保用户能够继续添加新的标记会话而不受限制。 | [setConversationMark](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#set-conversation-mark) |
| 单个会话的标记数量限制上调 | 每个会话可拥有的标记数量上限从 20 上调至 30。 | [setConversationMark](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#set-conversation-mark) |
| 群成员信息查询逻辑优化 | 群成员列表信息与用户数据库关联，保障获取本地最新的用户信息。| <ul><li>[queryGroupMemberList](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#query-group-member-list)</li><li>[queryGroupMemberInfo](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#query-group-member-info)</li></ul> |

**接口变更**

<Note title="说明">接口变更详情请参考 [升级指南 - ZIM](/zim-android/client-sdks/zim-upgrade-guide#2190-升级指南)。</Note>

| 变更接口 | 变更描述 | 
| -----  | ---- | 
| downloadMediaFile 及相关回调| <ul><li>废弃原接口 `downloadMediaFile`，请使用同名 [downloadMediaFile](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#download-media-file) 代替。新版本的 [downloadMediaFile](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#download-media-file) 新增了 `config` 参数，新增了 `config` 参数，可用于指定下载组合消息中的单个媒体内容。</li><li>[ZIMMediaDownloadedCallback](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~interface~ZIMMediaDownloadedCallback) 回调中 [onMediaDownloaded](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~interface~ZIMMediaDownloadedCallback#on-media-downloaded) 和 [onMediaDownloadingProgress](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~interface~ZIMMediaDownloadedCallback#on-media-downloading-progress) 的参数 `message` 类型从 `ZIMMediaMessage` 变更为 `ZIMMessage`。</li></ul> |
| [sendMessage](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#send-message) | 废弃 `sendMediaMessage` 和旧的 `sendMessage` 方法，新增支持发送任意消息类型的 [sendMessage](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#send-message) 方法。 |
| [ZIMMessageSentFullCallback](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~interface~ZIMMessageSentFullCallback) |[ZIMMessageSentFullCallback](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~interface~ZIMMessageSentFullCallback) 中的 [onMediaUploadingProgress](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~interface~ZIMMessageSentFullCallback#on-media-uploading-progress) 参数 `message` 类型由 `ZIMMessage` 变更为 `ZIMMediaMessage`，以确保仅媒体消息会被回调通知。|

---


## 2.18.2 版本

**发布日期：2024-11-06**

**问题修复**

修复已知问题。

---

## 2.18.0 版本

**发布日期：2024-10-15**

**新增功能**

| <div style={{width:"130px"}}>功能项</div>  | 功能描述 | 相关接口 |
| ------------------------------  | ---- | ----- |
| 群备注  | 支持用户对某个群组设置仅自己可见的群备注。详情请参考 [群资料管理 - 修改群备注](/zim-android/guides/group/group-info)。| <ul><li>[updateGroupAlias](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#update-group-alias)</li><li>[onGroupAliasUpdated](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIMEventHandler#on-group-alias-updated)</li></ul> |
| 用户在线状态 | 不仅支持用户通过订阅以持续关注其他用户的在线状态变化，还支持一次性查询其他用户的当下的在线状态，也支持用户查询自己的订阅列表。此外，在多端登录场景下，用户可以监听自己的在线平台变化。详情请参考 [用户状态订阅](/zim-android/guides/users/online-status-subscription)。| <ul><li>[subscribeUsersStatus](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#subscribe-users-status)</li><li>[onUserStatusUpdated](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIMEventHandler#on-user-status-updated)</li><li>[unsubscribeUsersStatus](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#unsubscribe-users-status)</li><li>[queryUsersStatus](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#query-users-status)</li><li>[querySubscribedUserStatusList](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#query-subscribed-user-status-list)</li></ul> |
| 获取房间用户头像 | 用户现在可以通过 `ZIMRoomMemberInfo` 类的 `userAvatarUrl` 属性，查询房间内其他用户的头像信息。| [ZIMRoomMemberInfo > userAvatarUrl](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~struct~ZIMRoomMemberInfo#user-avatar-url) |
| 切换房间  | 新增 `switchRoom` 接口以切换房间，适用于秒开等需要平滑切换房间的业务场景。详情请参考 [房间管理 - 切换房间](/zim-android/guides/room/manage-rooms)。 | [switchRoom](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#switch-room) |
| 服务端查询用户信息 | 支持在服务端通过用户 ID 查询用户的信息，包含用户名称、用户头像和扩展字段。| [查询用户信息](/zim-server/user/query-user-information) |
| 服务端撤回房间消息 | 支持从服务端调用接口撤回房间消息。| [撤回房间消息](/zim-server/messaging/recall-a-room-message) |

**改进优化**

| <div style={{width:"100px"}}>优化项</div>  | 优化描述 | 相关接口 |
| -----  | ---- | ----- |
| 首次拉取会话列表耗时优化 | 优化用户登录后首次拉取会话列表的时效，提升用户体验。 | [queryConversationList](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#query-conversation-list) |
| 服务端发送群聊消息响应参数优化 | 服务端 API `SendGroupMessage` 的响应参数新增 `MsgId`，可用于定位消息。 | [发送群组消息](/zim-server/messaging/send-group-messages) |
| 消息发送后回调参数优化 | 当消息发送失败，消息发送后回调中的 `msg_id` 参数将不再为空。 | [消息发送后回调](/zim-server/callbacks/message-sent) |
| 从服务端获取消息拓展字段 | 支持通过消息发送前回调中的 `payload` 参数获取用户发送消息时传入的拓展字段。 | [消息发送前回调](/zim-server/callbacks/message-not-sent-yet) |
| `MessageBody` 扩展字段长度可上调 | `MessageBody` 结构中的 `ExtendedData` 长度上限默认为 1 KB。如需上调，请联系 ZEGO 技术支持。| [MessageBody 说明](/zim-server/messaging/messagebody-introduction) |

---

## 2.17.1 版本

**发布日期：2024-08-15**

**问题修复**

修复已知问题。

---

## 2.17.0 版本

**发布日期：2024-08-02**

**新增功能**

| <div style={{width:"130px"}}>功能项</div>  | 功能描述 | 相关接口 |
| -----  | ---- | ----- |
| 内容审核 | 无需额外开发，即可实现对消息的安全审核。<ul><li>支持消息类型多样，涵盖文本消息、图片消息、语音消息和视频消息。</li><li>支持先审后发和先发后审两种审核方式。</li><li>支持根据不同会话类型的消息定制审核标签和尺度</li><li>支持针对审核结果配置不同的审核强度。</li><li>除了默认的敏感词汇外，您可以自行定义需要处理的词汇。</li></ul>详情请参考 [内容审核 - 能力概述](/zim-android/guides/content-moderation/overview)。 | - |
| 会话标记 | 支持用户对会话设置标记，适用于需要关注某会话或无法处理某条会话的场景。可使用本功能实现会话分组，即对多个会话设置相同的标记。客户端实现流程请参考 [标记会话](/zim-android/guides/conversation/mark-conversations)，服务端实现流程请参考 [设置会话标记](/zim-server/conversation/set-conversation-marks)。  | <ul><li>[setConversationMark](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#set-conversation-mark)</li><li>[设置会话标记](/zim-server/conversation/set-conversation-marks)</li></ul> |
| 会话列表查询 | 支持将标记、会话类型和是否包含未读消息作为过滤项获取会话列表。详情请参考 [标记会话](/zim-android/guides/conversation/mark-conversations)。 | [queryConversationList](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#query-conversation-list-1) |
| 特定会话未读消息总数查询 | 支持按标记作为过滤项获取未读消息总数。详情请参考 [标记会话](/zim-android/guides/conversation/mark-conversations)。  | [queryConversationTotalUnreadMessageCount](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#query-conversation-total-unread-message-count) |
| 回复消息 | 支持用户在会话内针对某条消息进行回复，当前支持回复文本、图片、文件、音频、视频、合并和自定义消息。此外，还支持用户查询回复树，获取回复的完整消息列表。详情请参考 [回复消息](/zim-android/guides/messaging/reply-to-a-message)。 | <ul><li>[replyMessage](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#reply-message)</li><li>[queryMessageRepliedList](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#query-message-replied-list)</li></ul> |
| 获取特定历史消息列表 | 支持查询指定的历史消息列表，适用于需要了解某条消息的上下文的场景。详情请参考 [获取历史消息](/zim-android/guides/messaging/get-message-history)。 | [queryMessages](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#query-messages) |
| 服务端离线消息推送无限频 | 支持开发者在调用服务端接口 [发送单聊消息](/zim-server/messaging/send-a-one-to-one-message) 和 [发送群组消息](/zim-server/messaging/send-group-messages) 向国内 Android 厂商进行无限频离线推送。 | [MessageBody 说明 - OfflinePush - PushStrategyId](/zim-server/messaging/messagebody-introduction#offlinepush-说明房间消息不支持此字段) |
| 服务端发送房间消息接口支持发送者有感知 | 新增 `SenderUnaware` 字段，允许通过服务端发送房间消息后，请求参数中的 `FromUserId`（发送方用户 ID）所对应的客户端对此次发送有感知。 | [发送房间消息](/zim-server/messaging/send-room-messages) |

**改进优化**

| <div style={{width:"130px"}}>优化项</div>  | 优化描述 | 相关接口 |
| -----  | ---- | ----- |
| 计费优化 | 优化 ZIM 各个版本间的计费梯度和规格，新增内容审核的费用说明，详情请参考 [计费说明](/zim-android/introduction/pricing)。 | - |

---

## 2.16.0 版本

**发布日期：2024-05-31**

**新增功能**

| 功能项  | 功能描述 | 相关接口 |
| -----  | ---- | ----- |
| 服务端管理呼叫邀请 | 支持在服务端发起、接受和拒绝呼叫邀请。 | <ul><li>[发起呼叫邀请](/zim-server/call-invitation/send-a-call-invitation)</li><li>[接受呼叫邀请](/zim-server/call-invitation/accept-a-call-invitation)</li><li>[拒绝呼叫邀请](/zim-server/call-invitation/reject-a-call-invitation)</li></ul> |
| 服务端管理禁言 | 支持在服务端禁言群组和特定群成员。 | <ul><li>[设置群禁言](/zim-server/group/mute-a-group)</li><li>[设置群成员禁言](/zim-server/group/mute-group-members)</li></ul> |
| 服务端设置群成员角色 | 支持在服务端修改群成员的角色。 | [设置群成员角色](/zim-server/group/set-group-member-roles) |

**改进优化**

| <div style={{width:"130px"}}>优化项</div>  | 优化描述 | 相关接口 |
| -----  | ---- | ----- |
| 优化回执 | 包含回执过期状态实时感知，支持离线查询回执详情，支持查询群人数超过 100 人的群回执详情； | <ul><li>[queryGroupMessageReceiptReadMemberList](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#query-group-message-receipt-read-member-list)</li><li>[queryGroupMessageReceiptUnreadMemberList](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#query-group-message-receipt-unread-member-list)</li></ul> |
| 呼叫邀请 | 支持用户进行进阶模式呼叫邀请时，通过 [callCancel](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#call-cancel) 接口单独传入某个指定的 userID，仅对该用户取消呼叫，不影响全局呼叫状态。 |   [callCancel](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#call-cancel)|

---


## 2.15.0 版本

**发布日期：2024-03-29**

**新增功能**

| <div style={{width:"130px"}}>功能项</div>  | 功能描述 | 相关接口 |
|-------|-------|-------|
| 群组角色 | 新增群组角色 “管理员”，拥有大部分群主上限，可以对修改普通群成员昵称、撤回普通群成员消息、踢人、禁言单独群成员和特定群角色。<br />如需了解群组角色与对应权限，请参考 [群成员管理 - 设置群成员角色](/zim-android/guides/group/group-members)。 | [setGroupMemberRole](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#set-group-member-role) |
| 入群验证 | <ul><li>[ZIMGroupAdvancedConfig](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~struct~ZIMGroupAdvancedConfig) 新增属性 [joinMode](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~struct~ZIMGroupAdvancedConfig#join-mode)、[inviteMode](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~struct~ZIMGroupAdvancedConfig#invite-mode) 和 [beInviteMode](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~struct~ZIMGroupAdvancedConfig#be-invite-mode)，支持在创建群组时设置入群验证模式、邀请模式、和邀请目标用户验证模式，从而方便群主和管理员限制外部用户入群。</li><li>当群组的入群验证模式修改为需要目标用户审批后，群内用户需要向外部用户发起入群邀请申请，等待目标用户审批。</li><li>当群组的邀请目标用户验证模式修改为需要群主和管理员审批后，外部用户发起入群申请，经由群主或管理员审批。</li><li>支持用户查询入群申请相关的列表。</li><li>支持在群组创建后调用客户端 API 和服务端 API 更新上述模式。</li></ul>如需了解接口调用细节，请参考 [群组管理](/zim-android/guides/group/manage-groups)。 | <ul><li>[createGroup](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#create-group-1)</li><li>[ZIMGroupAdvancedConfig > joinMode](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~struct~ZIMGroupAdvancedConfig#join-mode)</li><li>[ZIMGroupAdvancedConfig > inviteMode](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~struct~ZIMGroupAdvancedConfig#invite-mode)</li><li>[ZIMGroupAdvancedConfig > beInviteMode](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~struct~ZIMGroupAdvancedConfig#be-invite-mode)</li><li>[sendGroupJoinApplication](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#send-group-join-application)</li><li>[acceptGroupJoinApplication](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#accept-group-join-application)</li><li>[rejectGroupJoinApplication](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#reject-group-join-application)</li><li>[sendGroupInviteApplications](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#send-group-invite-applications)</li><li>[acceptGroupInviteApplication](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#accept-group-invite-application)</li><li>[rejectGroupInviteApplication](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#reject-group-invite-application)</li><li>[queryGroupApplicationList](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#query-group-application-list)</li><li>[updateGroupJoinMode](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#update-group-join-mode)</li><li>[updateGroupInviteMode](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#update-group-invite-mode)</li><li>[updateGroupBeInviteMode](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#update-group-be-invite-mode)</li><li>[修改群规格限制](/zim-server/group/modify-group-specification-limits)</li></ul>|
| Tips 消息 | 支持将群内用户的某些群组操作（如创建群组、解散群组等） 转换为特殊类型消息（Tips）。凭借群组消息回调获得操作信息后，开发者可以自行构造并在 UI 上展示相关事件的描述文本。<br />如需了解 Tips 消息种类和扩展信息，以及调接收后的处理操作，请参考 [接收 Tips 消息](/zim-android/guides/messaging/receive-tip-messages)。 | <ul><li>[ZIMMessageType > TIPS](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~enum~ZIMMessageType#tips)</li><li>[onReceiveGroupMessage](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIMEventHandler#on-receive-group-message)</li></ul> |
| 自定义推送规则 | 支持用户在多端登录场景下，自行决定需要接收离线推送的平台，以及查询当前的离线推送规则。<br />如需了解接口调用细节，请参考 [自定义推送规则](/zim-android/offline-push-notifications/set-custom-push-rules)。 | <ul><li>[updateUserOfflinePushRule](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#update-user-offline-push-rule)</li><li>[querySelfUserInfo](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#query-self-user-info)</li></ul> |
| 消息导出导入 | 支持将用户本地终端的历史消息导出作为备份，可用于更换设备时迁移聊天记录，或恢复被删除的消息。<br />如需了解接口调用细节，请参考 [导出导入消息](/zim-android/guides/messaging/export-and-import-messages)。 | <ul><li>[exportLocalMessages](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#export-local-messages)</li><li>[importLocalMessages](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#import-local-messages)</li></ul> |
| 缓存管理 | 支持查询当前登录用户的本地缓存文件大小，并清理本地缓存。<br />如需了解接口调用细节，请参考 [缓存管理](/zim-android/guides/cache-management)。 | <ul><li>[queryLocalFileCache](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#query-local-file-cache)</li><li>[clearLocalFileCache](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#clear-local-file-cache)</li></ul> |
| 退出所有房间 | 支持用户在多房间场景下一次性退出所有房间；也可用于开发者退出单一房间而不提前传入 roomID 的场景。| [leaveAllRoom](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#leave-all-room) |
| 数据迁移 | 支持用户通过 ZIM 服务端接口将用户数据迁移至 ZIM 服务。实现方案请参考 [迁移方案](/zim-android/migration-solution)。| - |
| 服务端查询会话列表 | 支持在服务端分页查询用户最新的 1000 个会话（单聊与群聊）。| [查询会话列表](/zim-server/conversation/query-conversation-list) |
| 服务端查询历史消息 | 支持在服务端分页查询用户指定单聊或群聊会话的历史消息列表。| <ul><li>[查询单聊会话消息列表](/zim-server/conversation/query-the-message-list-of-one-on-one-chats)</li><li>[查询群聊会话消息列表](/zim-server/conversation/query-the-message-list-of-group-chats)</li></ul> |
| 服务端修改群组规格 | 支持在服务端修改群组的入群验证模式、邀请模式、邀请目标验证模式和群成员人数上限。| [修改群组规格限制](/zim-server/group/modify-group-specification-limits) |

**改进优化**

| <div style={{width:"130px"}}>优化项</div>  | 优化描述 | 相关接口 |
| -----  | ---- | ----- |
| 检测邀请是否送达 | 支持在发起呼叫邀请时配置参数 [enableNotReceivedCheck](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~struct~ZIMCallInviteConfig#enable-not-received-check)，检测呼叫是否触达被叫，以便主叫更快感知被叫网络状态并实现提示。 | [ZIMCallInviteConfig > enableNotReceivedCheck](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~struct~ZIMCallInviteConfig#enable-not-received-check) |
| 服务端创建群组接口新增参数 | 新增 `CreateGroupTime` 参数，支持设置创建群组的事件。 | [创建群组](/zim-server/group/create-a-group) |
| 服务端添加群成员接口新增参数 | 新增 `GroupMemberInfos` 参数，支持定义入群用户的入群时间和入群模式。 | [添加群成员](/zim-server/group/add-group-members) |

---

## 2.14.1 版本

**发布日期：2024-03-05**

**问题修复**

修复已知问题。

---


## 2.14.0 版本

**发布日期：2024-02-02**

**新增功能**

| <div style={{width:"130px"}}>功能项</div>  | 功能描述 | 相关接口 |
|-------|-------|-------|
| 合并转发 | <ul><li>支持用户在收发消息后，通过构造合并消息体，传入发送消息接口即可实现转发合并消息；**注意：**如需实现逐条转发，只需将已有消息作为参数传入发送消息接口即可。</li><li>支持查询合并消息包含的子消息具体内容。</li></ul> | <ul><li>[ZIMCombineMessage](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~struct~ZIMCombineMessage)</li><li>[sendMessage](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#send-message)</li><li>[queryCombineMessageDetail](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#query-combine-message-detail)</li></ul> |
| 收发 @ 消息 | 支持用户在某个会话发送消息时，为消息设置提及指定用户（可以不在当前会话）或提及全部会话内成员。 | <ul><li>[ZIMMessage > mentionedUserIDs](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~struct~ZIMMessage#mentioned-user-i-ds)</li><li>[ZIMMessage > isMentionAll](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~struct~ZIMMessage#is-mention-all)</li></ul> |
| 删除消息 | 支持用户一次性删除全部会话的所有消息。 | [deleteAllConversationMessages](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#delete-all-conversation-messages) |
| 保存会话草稿 | ZIM 支持用户退出单聊和群聊会话后仍在本地保存会话草稿，以便后续编辑。 | [setConversationDraft](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#set-conversation-draft) |
| 单聊会话免打扰 | 在原有“群聊会话免打扰”的基础上，新增支持对单聊会话设置免打扰。单聊会话接收新消息后，不推送通知。 | [setConversationNotificationStatus](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#set-conversation-notification-status) |
| 禁止发言 | 支持群主对群组实现群组禁言和指定群成员禁言。群组禁言支持全体禁言、普通成员禁言、指定角色成员禁言。 | <ul><li>[muteGroup](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#mute-group)</li><li>[muteGroupMembers](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#mute-group-members)</li></ul> |
| 好友管理 | 用户可以直接添加和删除好友、查看看好友列表、向用户发起好友申请、同意或拒绝好友申请、查看好友申请列表、检查其他用户与自己的好友关系、查询或修改好友信息，以及搜索好友。 | <ul><li>[addFriend](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#add-friend)</li><li>[deleteFriends](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#delete-friends)</li><li>[sendFriendApplication](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#send-friend-application)</li><li>[acceptFriendApplication](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#accept-friend-application)</li><li>[rejectFriendApplication](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#reject-friend-application)</li><li>[checkFriendsRelation](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#check-friends-relation)</li><li>[queryFriendList](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#query-friend-list)</li><li>[queryFriendApplicationList](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#query-friend-application-list)</li><li>[updateFriendAlias](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#update-friend-alias)</li><li>[updateFriendAttributes](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#update-friend-attributes)</li><li>[queryFriendsInfo](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#query-friends-info)</li><li>[searchLocalFriends](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#search-local-friends)</li></ul> |
| 设置安全审核敏感词 | 开通安全审核后，支持开发者添加额外敏感词。当用户发送消息包含敏感词时，对该消息进行审核、替换内容或拦截。**说明**：如需使用此功能，请联系 ZEGO 技术支持。 | - |
| 服务端设置会话免打扰 | 支持在服务端对群聊会话和单聊会话设置免打扰状态。 | [设置会话消息免打扰](/zim-server/conversation/mute-notifications-for-conversations) |
| 服务端置顶会话 | 支持在服务端为用户设置会话的置顶状态。 | [置顶会话](/zim-server/conversation/pin-conversations-to-the-top) |
| 服务端修改群资料 | 支持在服务端修改群组的头像、名称和公告。**说明**：如需使用此功能，请联系 ZEGO 技术支持了解详情。 | - |
| 服务端管理好友 | 支持在服务端为用户添加和删除好友，查询好友列表，检查好友关系，更新好友备注和属性。 | <ul><li>[批量添加好友](/zim-server/user/batch-add-friends)</li><li>[批量发送好友申请](/zim-server/user/batch-send-friend-requests)</li><li>[批量删除好友](/zim-server/user/batch-delete-friends)</li><li>[查询好友列表](/zim-server/user/query-the-friend-list)</li><li>[检查好友关系](/zim-server/user/check-friendships)</li><li>[更新好友备注](/zim-server/user/change-the-alias-of-a-friend)</li><li>[更新好友属性](/zim-server/user/modify-the-attributes-of-a-friend)</li></ul> |
| 服务端管理黑名单 | 支持在服务端为用户批量拉黑、解除黑名单、查询黑名单、检查黑名单关系。 | <ul><li>[批量拉黑用户](/zim-server/user/batch-block-users)</li><li>[批量移除黑名单](/zim-server/user/batch-unblock-users)</li><li>[查询黑名单](/zim-server/user/query-the-blocklist)</li><li>[检查黑名单关系](/zim-server/user/check-blockships)</li></ul> |

**改进优化**

| 优化项  | 优化描述 | 相关接口 |
| -----  | ---- | ----- |
| 优化 ZIMMessage 和 ZIMConversation 数据结构 | ZIM 对 ZIMMessage 和 ZIMConversation做了可序列化实现，不同 Activity 之间传值更方便。 | <ul><li>[ZIMMessage](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~struct~ZIMMessage)</li><li>[ZIMConversation](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~struct~ZIMConversation)</li></ul> |

---

## 2.13.1 版本

**发布日期：2024-01-12**

**问题修复**

修复已知问题。

---


## 2.13.0 版本

**发布日期：2024-01-05**

**新增功能**

| <div style={{width:"130px"}}>功能项</div>  | 功能描述 | 相关接口 |
|-------|-------|-------|
| 多端登录 | “多平台登录”策略支持配置互踢逻辑，当前仅支持 android、iOS 设备互踢，Windows、Mac 设备互踢。 | [login](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#login-2) |
| 离线登录 | 支持用户在离线状态登录 IM 服务，访问本地 SDK 数据。 | [login](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#login-2) |
| 黑名单管理 | 用户可以查询自己的黑名单、将指定用户拉黑（不再接收该用户消息）、移出黑名单、以及检查指定用户是否在黑名单内。 | <ul><li>[queryBlackList](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#query-blacklist)</li><li>[addUsersToBlacklist](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#add-users-to-blacklist)</li><li>[removeUsersFromBlacklist](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#remove-users-from-blacklist)</li><li>[checkUserIsInBlacklist](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#check-user-is-in-blacklist)</li></ul> |
| 插入本地消息 | 支持向房间会话插入本地消息。 | [insertMessageToLocalDB](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#insert-message-to-local-db) |
| 呼叫邀请 | 新增回调 [onCallInvitationCreated](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIMEventHandler#on-call-invitation-created)，呼叫邀请发起者可通过监听此回调，得知呼叫邀请已创建。 | [onCallInvitationCreated](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIMEventHandler#on-call-invitation-created) |
| 服务端撤回消息 | 支持从服务端调用接口撤回单聊消息和群聊消息。 | <ul><li>[撤回单聊消息](/zim-server/messaging/recall-a-one-to-one-message)</li><li>[撤回群聊消息](/zim-server/messaging/recall-a-group-message)</li></ul> |
| 服务端修改用户资料 | 支持从服务端调用接口修改用户资料信息，包括用户昵称、头像等。 | [修改用户资料](/zim-server/user/modify-user-information) |


**改进优化**

| <div style={{width:"130px"}}>优化项</div>  | 优化描述 | 相关接口 |
| -----  | ---- | ----- |
| 优化 roomID 长度限制 | 支持最长 128 字节的 [roomID](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~struct~ZIMRoomInfo#room-id)。| [ZIMRoomInfo > roomID](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~struct~ZIMRoomInfo#room-id) |
| 用户信息相关类新增用户头像字段 | [ZIMUserInfo](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~struct~ZIMUserInfo) 和 [ZIMGroupMemberInfo](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~struct~ZIMGroupMemberInfo) 新增 `userAvatarUrl` 字段，用于设置或说明用户头像地址。**说明**：暂不支持获取房间成员的用户头像字段，即通过 [queryRoomMemberList](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#query-room-member-list) 和 [queryRoomMembers](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#query-room-members) 拿到的 `ZIMUserInfo` 的 `userAvatarUrl` 为空。 | <ul><li>[ZIMUserInfo](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~struct~ZIMUserInfo)</li><li>[ZIMGroupMemberInfo](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~struct~ZIMGroupMemberInfo)</li></ul> |
| 优化 [onRoomStateChanged](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIMEventHandler#on-room-state-changed) 回调逻辑  | 当开发者调用 ZIM 服务端接口在后台销毁房间后，[onRoomStateChanged](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIMEventHandler#on-room-state-changed) 回调描述房间状态变化的原因修改为 `ROOM_NOT_EXIST`。 | [onRoomStateChanged](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIMEventHandler#on-room-state-changed) |
| 发送单聊消息服务端接口新增响应参数 | 新增 `SuccessList` 参数，成员参数包含 `UserId`、`MsgId` 和 `MsgSeq`，说明消息接受成功用户的相关信息。`MsgSeq` 可用于 [撤回单聊消息](/zim-server/messaging/recall-a-one-to-one-message)。 | [发送单聊消息](/zim-server/messaging/send-a-one-to-one-message) |
| 发送群聊消息服务端接口新增响应参数 | 新增 `MsgSeq`，可用于 [撤回群聊消息](/zim-server/messaging/send-a-one-to-one-message)。 | [发送群聊消息](/zim-server/messaging/send-group-messages) |
| 消息发送后服务端回调新增字段 | 新增 `user_list` 字段，用于批量返回消息接收用户信息。**说明**：仅当开发者调用服务端接口 [发送单聊消息](/zim-server/messaging/send-a-one-to-one-message) 时，此字段有值。| [消息发送后回调](/zim-server/callbacks/message-sent) |

**废弃删除**

| <div style={{width:"130px"}}>废弃项</div>  | 废弃描述 | 相关接口 |
| -----  | ---- | ----- |
| 废弃 `login` 接口 | 废弃旧版登录接口，新增新版登录接口 [login](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#login-2)。新版登录接口支持通过 [ZIMLoginConfig](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~struct~ZIMLoginConfig) 进行更多配置，如是否使用 Token 鉴权、是否离线登录。 | [login](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#login-2) |
| 部分用户信息相关类废弃旧版头像字段  | <ul><li>[ZIMGroupMemberInfo](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~struct~ZIMGroupMemberInfo) 废弃 `memberAvatarUrl`，请使用新字段 `userAvatarUrl`。</li><li>[ZIMUserFullInfo](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~struct~ZIMGroupMemberInfo) 废弃 `userAvatarUrl`，请从 `baseInfo` 获取 `userAvatarUrl`。</li></ul> | <ul><li>[ZIMGroupMemberInfo](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~struct~ZIMGroupMemberInfo)</li><li>[ZIMUserFullInfo](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~struct~ZIMUserFullInfo)</li></ul> |


---

## 2.12.1 版本

**发布日期：2023-11-29**

**问题修复**

修复已知问题。

---

## 2.12.0 版本

**发布日期：2023-11-20**

**新增功能**

| <div style={{width:"130px"}}>功能项</div>  | 功能描述 | 相关接口 |
|-------|-------|-------|
| 地理围栏 | 提供地理围栏服务，保证 IM 数据存储在运营本地，适用于海外高安全场景。 | [setGeofencingConfig](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#set-geofencing-config) |
| 群消息管理 | 支持新进入群组成员自动获取群历史消息。**说明**：如需使用此功能，请联系 ZEGO 技术支持配置。 | <ul><li>[joinGroup](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#join-group)</li><li>[inviteUsersIntoGroup](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#invite-users-into-group)</li></ul> |
| 一键已读 | 支持清除所有会话的消息未读数和总消息未读数。 | [clearConversationTotalUnreadMessageCount](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#clear-conversation-total-unread-message-count) |
| 呼叫邀请 | 支持呼叫外用户主动加入进阶模式呼叫，或呼叫内用户切换设备。 | [callJoin](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#call-join) |
| 删除所有会话列表 | 支持清空当前会话列表 | [deleteAllConversations](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#delete-all-conversations) |
| 服务端新增添加群成员接口 | 支持将指定用户拉进至群组中。 | [添加群成员](/zim-server/group/disband-a-group-chat) |
| 服务端新增解散群组接口 | 支持解散指定群组。 | [解散群组](/zim-server/group/disband-a-group-chat) |
| 服务端新增转让群主接口 | 支持将群主转让给指定的群成员。 | [转让群主](/zim-server/group/set-nicknames-of-group-members) |
| 服务端新增设置群成员昵称接口 | 支持为指定群成员设置其群昵称。 | [设置群成员昵称](/zim-server/group/set-nicknames-of-group-members) |
| 服务端消息支持附带回执 | 通过服务端发送单聊消息、群聊消息时，可以附带回执功能，以便得知消息是否已读。支持的消息类型包含文本、图片、文件、音频、视频、自定义消息，详情请参考 [MessageBody 说明](/zim-server/messaging/messagebody-introduction)。 | <ul><li>[发送单聊消息](/zim-server/messaging/send-a-one-to-one-message)</li><li>[发送群组消息](/zim-server/messaging/send-group-messages)</li></ul> |
| 服务端新增登录登出回调 | 在用户登录、退出时，ZIM 服务端会主动回调通知给开发者服务端。 | [登录登出回调](/zim-server/callbacks/login-and-logout) |
| 全员离线推送 | 在调用服务端接口进行全员推送时，支持选择推送类型，实现离线推送。 | [全员推送](/zim-server/messaging/push-message-to-all-users) |

**改进优化**

| <div style={{width:"130px"}}>优化项</div>  | 优化描述 | 相关接口 |
| -----  | ---- | ----- |
| 登录逻辑优化 | 优化登录逻辑，避免了弱网环境下多设备异常互踢的情况。 | - |
| 呼叫创建服务端回调 | 呼叫创建服务端回调新增 `caller` 字段说明发起呼叫的用户，详情请参考 [呼叫创建回调](/zim-server/callbacks/call-invitation-sent)。 | - |


---

## 2.11.0 版本

**发布日期：2023-10-26**

**新增功能**

| <div style={{width:"130px"}}>功能项</div>  | 功能描述 | 相关接口 |
|-------|-------|-------|
| 多端登录 | 支持配置双平台或多平台登录策略，用户可在多平台、多设备上同时登录同一账户，实现会话、消息、群组等数据多端互通。如需了解多端登录对其他功能的影响，请参考 [多端登录](/zim-android/guides/users/multi-device-login)。<br />**注意**：仅支持专业版或旗舰版套餐用户使用此功能，且需联系 ZEGO 技术支持进行配置登录策略。 | [login](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#login) |


**改进优化**

| <div style={{width:"130px"}}>优化项</div>  | 优化描述 | 相关接口 |
| -----  | ---- | ----- |
| 新增服务端信令消息支持类型 | 支持通过服务端发送经 base64 编码后的二进制信令消息，详情请参考 [MessageBody 说明](/zim-server/messaging/messagebody-introduction)。 | - |
| 优化删除会话后的置顶逻辑 | 删除某置顶会话后，不会自动更改该会话的置顶状态（[ZIMConversation > isPinned](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~struct~ZIMConversation#is-pinned)）为 `No`。当该会话有新消息，再次出现在会话列表时，仍为置顶会话。 | - |

---


## 2.10.0 版本

**发布日期：2023-08-31**

**新增功能**

| <div style={{width:"130px"}}>功能项</div>  | 功能描述 | 相关接口 |
|-------|-------|-------|
|  消息表态 | 支持对单聊和群聊消息做出反应（即表态），一般可用于表情回复消息等场景，也可用于发起群组投票、确认群组结果等操作。此外，还支持删除自己做出的表态，以及查询某个表态相关的用户信息。 | <ul><li>[addMessageReaction](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#add-message-reaction)</li><li>[deleteMessageReaction](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#delete-message-reaction)</li><li>[queryMessageReactionUserList](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#query-message-reaction-user-list)</li></ul> |
| 服务端发送单聊消息接口支持发送者无感知 | 新增 `SenderUnaware` 字段，允许通过服务端发送单聊消息后，请求参数中的 `FromUserId`（发送方用户 ID）所对应的客户端对此次发送无感知。 | [发送单聊消息](/zim-server/messaging/send-a-one-to-one-message) |
| 服务端发送房间消息接口支持发送者有感知 | 新增 `SenderUnaware` 字段，允许通过服务端发送房间消息后，请求参数中的 `FromUserId`（发送方用户 ID）所对应的客户端对此次发送有感知。 | [发送房间消息](/zim-server/messaging/send-room-messages) |
| 服务端新增全员推送接口 | 支持向所有在线用户（包括消息发送用户自己）发送特定内容的消息，如文本、图片等。本功能适用于全员活动公告、送礼跨房间飘屏等场景。 | <ul><li>[全员推送](/zim-server/messaging/push-message-to-all-users)</li><li>[onBroadcastMessageReceived](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIMEventHandler#on-broadcast-message-received)</li></ul> |
| 服务端新增查询用户是否在房间内接口 | 支持通过此接口，查询指定用户是否在目标房间内。 | [查询用户是否在房间内](/zim-server/room/query-whether-a-user-is-in-a-room) |

**改进优化**

| <div style={{width:"130px"}}>优化项</div>  | 优化描述 | 相关接口 |
| -----  | ---- | ----- |
| 用户昵称 UserName 长度上限调整 | 从 64 字节扩展至 256 字节，支持更长昵称，适用于 2.0.0 及以后版本的 ZIM SDK。 | [ZIMUserInfo > userName](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~struct~ZIMFriendInfo#user-name) |

---


## 2.9.0 版本

**发布日期：2023-07-18**

**新增功能**

| <div style={{width:"130px"}}>功能项</div>  | 功能描述 | 相关接口 |
|-------|-------|-------|
|  呼叫邀请新增模式 | 新增进阶模式，支持用户在呼叫中邀请、退出呼叫和结束呼叫。 | <ul><li>[callingInvite](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#calling-invite)</li><li>[callQuit](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#call-quit)</li><li>[callEnd](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#call-end)</li></ul> |
| 撤回他人消息 | 群组会话中，群主可以撤回他人发送的消息。 | [revokeMessage](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#revoke-message) |
| 获取房间成员信息 | 支持调用服务端接口，根据房间 ID 获取房间成员的信息，包括房间用户数量、用户 ID 及名称。| [获取房间成员信息](/zim-server/room/obtain-information-about-users-in-a-room) |
| 服务端消息发送接口新增支持更多消息类型 | 支持通过服务端接口发送图片、文件、音频、视频、自定义和弹幕类型消息，详情请参考 [MessageBody 说明](/zim-server/messaging/messagebody-introduction)。 | <ul><li>[发送单聊消息](/zim-server/messaging/send-a-one-to-one-message)</li><li>[发送群组消息](/zim-server/messaging/send-group-messages)</li><li>[发送房间消息](/zim-server/messaging/send-room-messages)</li></ul> |
| 下载外部富媒体消息 | 支持调用 [downloadMediaFile](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#download-media-file) 接口，通过外部 URL 下载富媒体消息。 | [downloadMediaFile](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#download-media-file) |
| 设置消息拓展字段 | 新增仅本端可见的消息拓展字段，支持更新该字段，可用于展示消息翻译状态或其他内容。 | <ul><li>[localExtendedData](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~struct~ZIMMessage#local-extended-data)</li><li>[updateMessageLocalExtendedData](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#update-message-local-extended-data)</li></ul> | 
| 搜索本地消息 | 通过关键字、用户 ID 等条件对单个或所有 `单聊` 和 `群聊` 会话的本地消息进行搜索，获取符合条件的消息列表；也可以基于本地消息搜索会话。| <ul><li>[searchLocalMessages](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#search-local-messages)</li><li>[searchGlobalLocalMessages](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#search-global-local-messages)</li><li>[searchLocalConversations](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#search-local-conversations)</li></ul> |
| 搜索群组 | 支持基于关键字对群组名称进行搜索，同时支持将群成员名称和群成员昵称纳入搜索范围。 | [searchLocalGroups](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#search-local-groups) |
| 搜索群成员 | 支持基于关键字对指定群内的群成员名称进行搜索，同时支持将群成员昵称纳入搜索范围。 | [searchLocalGroupMembers](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#search-local-group-members) |

**改进优化**

| <div style={{width:"130px"}}>优化项</div>  | 优化描述 | 相关接口 |
| -----  | ---- | ----- |
| 呼叫邀请接收回调 | 优化呼叫邀请普通模式，支持在呼叫邀请的超时时间内，离线用户收到呼叫邀请在上线后能够立即被通知。| [onCallUserStateChanged](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIMEventHandler#on-call-user-state-changed) |

**废弃删除**

| <div style={{width:"130px"}}>废弃接口</div> | 废弃说明 | 废弃版本 |
| -----  | ---- | ----- |
| <ul><li>[onCallInvitationAccepted](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIMEventHandler#on-call-invitation-accepted)</li><li>[onCallInvitationRejected](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIMEventHandler#on-call-invitation-rejected)</li><li>[onCallInviteesAnsweredTimeout](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIMEventHandler#on-call-invitees-answered-timeout)</li></ul> | 为便利开发者监听呼叫邀请中用户的呼叫状态变化，新增 [onCallUserStateChanged](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIMEventHandler#on-call-user-state-changed)，替代原呼叫邀请回调 `onCallInvitationAccepted`、`onCallInvitationRejected` 和 `onCallInviteesAnsweredTimeout`。 | 2.9.0 |

---

## 2.8.2 版本

**发布日期：2023-06-01**

**问题修复**

修复已知问题。

---

## 2.8.0 版本

**发布日期：2023-05-23**

**新增功能**

| <div style={{width:"130px"}}>功能项</div>  | 功能描述 | 相关接口 |
|-------|-------|-------|
| 置顶会话 | 用户可以选择想要优先查看的会话，将其固定在会话列表顶部。 | <ul><li>[updateConversationPinnedState](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#update-conversation-pinned-state)</li><li>[queryConversationPinnedList](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#query-conversation-pinned-list)</li></ul> |
| 自定义消息类型 | 新增自定义类型消息，开发者可自定义消息的类型，如投票类型、接龙类型、视频卡片类型等，并自行完成消息的解析。ZIM SDK 不负责定义和解析自定义消息的具体内容。 | [ZIMCustomMessage](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~struct~ZIMCustomMessage) |
| 查询会话信息 | 通过指定会话 ID 查询会话的详细信息。 | [queryConversation](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#query-conversation) |
| 查询房间内用户状态 | 通过指定若干 userID 和 roomID，查询目标用户是否在指定房间内，从而进行业务逻辑设计，如邀请连麦。**说明**：最多支持一次性查询 10 名用户的信息。 | [queryRoomMembers](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#query-room-members) |
| 消息发送前回调 | 通过设置服务端回调，在用户发送单聊、群聊或房间聊天消息时，ZIM 向开发者服务端发送请求，开发者可实现：<ul><li>拦截违规消息。</li><li>建立用户黑白名单。</li></ul>  | [消息发送前回调](/zim-server/callbacks/message-not-sent-yet) |
| 消息发送后回调 | 通过设置服务端回调，在用户发送单聊、群聊、房间消息成功或失败后，ZIM 向开发者服务端发送请求，开发者可实现：<ul><li>实时记录用户发送的消息。</li><li>统计用户发送的消息。</li><li>直播录屏场景中，通过录制视频的时间戳，将聊天记录嵌入到录播视频中。</li></ul>  | [消息发送后回调](/zim-server/callbacks/message-sent) |
| 批量注册用户 | 支持调用服务端接口，指定用户信息（用户 ID 等），开发者可实现发起一次请求，注册多名用户。**说明**：最多支持一次性注册 100 名用户。 | [批量注册用户](/zim-server/user/batch-register-users) |
| 查询 App 下的群列表 | 支持调用服务端接口获取 App 中所有群组的 ID。 | [查询 App 下的群列表](/zim-server/group/query-group-list-in-the-app) |
| 查询群成员列表 | 支持调用服务端接口，指定群组 ID，获取对应群组的成员列表。 | [查询群成员列表](/zim-server/group/query-group-member-list) |
| 移除群成员 | 支持调用服务端接口，指定群组 ID 和用户 ID，批量群成员。<br />**注意：**最多支持一次性移除 50 名群成员。 | [移除群成员](/zim-server/group/remove-group-member) |

**废弃删除**

| <div style={{width:"130px"}}>废弃项</div>  | 废弃描述 | 相关接口 |
| -----  | ---- | ----- |
| 废弃系统消息类型 | [ZIMMessageType](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~enum~ZIMMessageType) 废弃了系统消息（值为 30），开发者请使用功能更完善的自定义消息（值为 200）替代。 | [ZIMMessageTypeCustom](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~enum~ZIMMessageType#custom) |

---

## 2.7.1 版本

**发布日期：2023-03-15**

**问题修复**

修复已知问题。

---

## 2.7.0 版本

**发布日期：2023-03-07**

**改进优化**

| <div style={{width:"130px"}}>优化项</div>  | 优化描述 | 相关接口 |
| -----  | ---- | ----- |
| 优化用户登录时 userName 置空逻辑 | 区分了用户名修改接口和登录接口。用户登录时，若将 userName 置空，不再会因此修改 userName，优化用户登录体验。 | [userName](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~struct~ZIMUserInfo#user-name) |
| 优化会话消息拉取时机 | SDK 会智能检测当前用户的会话活跃情况，优化数据同步的时机，提升用户查询速度与体验。 | - |
| 优化断网重连时机 | 当 APP 断网后，SDK 会实时检测网络状态变化以及 APP 前后台变化，加快用户重连速度。 | - |

---

## 2.6.0 版本

**发布日期：2023-01-11**

**新增功能**

| <div style={{width:"130px"}}>功能项</div>  | 功能描述 | 相关接口 |
|-------|-------|-------|
| 服务端新增呼叫邀请相关回调 | 用户可以通过 ZIM 服务端的回调，明确呼叫邀请的结果，适用于网络环境不好时，SDK 反馈的结果不稳定。 | <ul><li>[呼叫创建回调](/zim-server/callbacks/call-invitation-sent)</li><li>[呼叫取消回调](/zim-server/callbacks/call-invitation-canceled)</li><li>[呼叫接受回调](/zim-server/callbacks/call-invitation-accepted)</li><li>[呼叫拒绝回调](/zim-server/callbacks/call-invitation-rejected)</li><li>[呼叫超时回调](/zim-server/callbacks/call-invitation-timed-out)</li></ul> |
| 消息体增加扩展字段 | [ZIMMessage](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~struct~ZIMMessage) 增加 [extendedData](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~struct~ZIMMessage#extended-data) 字段，用户可以将用户头像和昵称等信息传入该字段，在聊天对话发送消息时实时展示。	| [extendedData](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~struct~ZIMMessage#extended-data) |
| 新增发送消息状态回调 | 开发者可以通过监听此回调来完善消息发送状态的逻辑。根据消息状态的变更，开发者可以在 UI 上做相应提醒等。 | [onMessageSentStatusChanged](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIMEventHandler#on-message-sent-status-changed) |

**改进优化**

| <div style={{width:"130px"}}>优化项</div>  | 优化描述 | 相关接口 |
| -----  | ---- | ----- |
| 优化弱网情况下消息发送的逻辑 | 用户在弱网环境下发送消息时，SDK 会通过策略逻辑尽可能保证消息发送状态的正确性。 | - |

---

## 2.5.0 版本

**发布日期：2022-11-30**

**新增功能**

| <div style={{width:"130px"}}>功能项</div>  | 功能描述 | 相关接口 |
|-------|-------|-------|
|消息撤回|  撤回发送成功的消息，默认撤回 2 分钟内的消息。撤回操作仅支持撤回单聊和群聊的消息，不支持撤回房间内消息。**说明**：如需配置撤回时间，请联系 ZEGO 技术支持。| <ul><li>[revokeMessage](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#revoke-message)</li><li>[onMessageRevoked](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~interface~ZIMMessageRevokedCallback#on-message-revoked)</li></ul>|
|消息回执| [ZIMMessageSendConfig](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~struct~ZIMMessageSendConfig) 新增 hasReceipt 参数，支持在单聊和群聊会话中发送附带回执的消息。<br />ZIM SDK 支持在单聊和群聊会话查看其他用户是否阅读本端发送的信息，以及支持查看群聊中已读消息和未读消息的数量，以及对应的用户信息，**但是不支持信令消息、弹幕消息、以及房间内消息使用回执。**| <ul><li>[ZIMMessageSendConfig](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~struct~ZIMMessageSendConfig)</li><li>[sendMessageReceiptsRead](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#send-message-receipts-read)</li><li>[sendConversationMessageReceiptRead](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#send-conversation-message-receipt-read)</li><li>[queryGroupMessageReceiptReadMemberList](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#query-group-message-receipt-read-member-list)</li><li>[queryGroupMessageReceiptUnreadMemberList](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#query-group-message-receipt-unread-member-list)</li><li>[queryMessageReceiptsInfo](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#query-message-receipts-info)</li></ul> |
| 呼叫邀请支持离线推送 | [ZIMCallInviteConfig](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~struct~ZIMCallInviteConfig) 新增 pushConfig 参数，支持向离线用户推送呼叫邀请。离线用户接受呼叫邀请需要搭配 ZPNs SDK 一起使用。 | [ZIMCallInviteConfig](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~struct~ZIMCallInviteConfig) |

**改进优化**

| <div style={{width:"130px"}}>优化项</div>  | 优化描述 | 相关接口 |
| -----  | ---- | ----- |
| [ZIMPushConfig](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~struct~ZIMPushConfig) 的额外字段命名变更| 为避免开发者接入概念混淆，[ZIMPushConfig](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~struct~ZIMPushConfig) 的 extendedData 参数修改为 payload 参数，功能不变。开发者在使用 ZPNs SDK 时，通过厂商通道的 extras 里面的 payload 字段即可获取到发送端传入的额外字段，详情请参考 [自定义点击通知获取 payload 字段](/zim-android/offline-push-notifications/get-payload-field)。<p>说明：若集成 ZIM SDK 2.5.0 版本后，开发者使用了离线推送功能后出现了接口编译失败的问题，请将 extendedData 改为 payload。</p> | - |
| 优化富媒体消息传输协议	 | 减少网络传输过程中的协议包大小。 | -|
| 优化 API 调用时的线程安全	 | - | -|

---

## 2.4.2 版本

**发布日期：2022-11-01**

**问题修复**

修复已知问题。

---

## 2.4.0 版本

**发布日期：2022-10-10**

**新增功能**

| <div style={{width:"130px"}}>功能项</div>  | 功能描述 | 相关接口 |
|-------|-------|-------|
|管理房间用户属性| 支持房间内的用户自定义用户属性。例如：用户等级、勋章、状态等信息。| <ul><li>[setRoomMembersAttributes](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#set-room-members-attributes)</li><li>[queryRoomMembersAttributes](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#query-room-members-attributes)</li><li>[queryRoomMemberAttributesList](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#query-room-member-attributes-list)</li></ul>|
|新增系统消息| 新增系统消息类型，支持 SDK 触发进群通知、群主替换等系统性消息。可以通过 [插入本地消息](/zim-android/guides/messaging/insert-local-messages) 功能实现。|- |
|插入本地消息| 支持直接向本地插入一条任意消息类型的消息。开发者可结合系统消息类型，在客户端将回调通知（例如：邀请某人进群、把某人移出群等），转为系统消息类型，插入本地 DB，以达到系统提示的效果。| [insertMessageToLocalDB](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#insert-message-to-local-db)|

**改进优化**

| <div style={{width:"130px"}}>优化项</div>  | 优化描述 | 相关接口 |
| -----  | ---- | ----- |
| 优化消息发送接口 | 优化消息对象，在发送前和发送后是同一个对象。开发者在发送“视频”等内容较大的消息时，可以在消息上传完成前，缓存该消息对象，直到收到 SDK 发送成功通知时，通过比较对象相同来实现发送前 Loading 的效果。 |  [sendMessage](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#send-message) |
| 优化断网重连逻辑 | 优化在无网状态下、以及断网重连后的逻辑。 | -|
| 优化性能 | 优化数据库性能。 | -|


**接口变更**

- **新增接口**

| <div style={{width:"130px"}}>新增接口</div> | 接口描述 | 上线版本 |
| :-------- | :------- | :----- |
| [login](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#login) | 新增不带 Token 参数的 [login](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#login) 接口。开发者使用 “AppSign 鉴权” 时，可直接使用该接口登录 ZIM，接入更加便捷。   | 2.4.0 |
| [sendMessage](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#send-message) |  新增发送消息接口，支持发送单聊、房间、群组消息。  | 2.4.0 |
| [onMessageAttached](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~interface~ZIMMediaMessageSentCallback#on-message-attached) | 在 [ZIMMediaMessageSentCallback](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~interface~ZIMMediaMessageSentCallback) 中新增 [onMessageAttached](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~interface~ZIMMediaMessageSentCallback#on-message-attached) 回调方法，用于监听消息对象发送前的相关信息，否则编译无法通过。  | 2.4.0 |


- **废弃接口**

| <div style={{width:"130px"}}>废弃接口</div> | 变更说明 | 废弃版本 |
| :-------- | :------- | :----- |
| <ul><li>[sendPeerMessage](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#send-peer-message)</li><li>[sendRoomMessage](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#send-room-message)</li><li>[sendGroupMessage](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#send-group-message)</li></ul> | 废弃单聊消息 [sendPeerMessage](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#send-peer-message)、房间消息 [sendRoomMessage](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#send-room-message)、群组消息 [sendGroupMessage](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#send-group-message) 3 个消息发送接口，统一使用 [sendMessage](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#send-message) 接口替代，发送消息方式更加规范。    | 2.4.0 |

---

## 2.3.3 版本

**发布日期：2022-09-09**

**<div style={{width:"130px"}}>改进优化</div>**

| 优化项  | 优化描述 | 相关接口 |
| -----  | ---- | ----- |
| 鉴权方式优化 | 从当前版本开始，开发者可以自主进行 “AppSign 鉴权” 和 “Token 鉴权” 的切换。| <ul><li>[create](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#create)</li><li>[login](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#login-1)</li></ul> |

**问题修复**

修复已知问题。

---

## 2.3.1 版本

**发布日期：2022-08-22**

**问题修复**

修复已知问题。

---

## 2.3.0 版本

**发布日期：2022-08-12**

**<div style={{width:"130px"}}>新增功能</div>**

| 功能项  | 功能描述 | 相关接口 |
|-------|-------|-------|
| 新增扩展字段 | 支持用户通过扩展字段，设置自己的个人信息，例如用户头像、个性签名、性别等个人信息。| [updateUserExtendedData](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#update-user-extended-data)|
| 新增头像字段 | 用户信息及群组新增头像字段，用户可以上传自己的头像、或自定义群组头像。| <ul><li>[updateUserAvatarUrl](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#update-user-avatar-url)</li><li>[ZIMUserFullInfo](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~struct~ZIMUserFullInfo)</li><li>[updateGroupAvatarUrl](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#update-group-avatar-url)</li><li>[ZIMGroupInfo](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~struct~ZIMGroupInfo)</li><li>[ZIMConversation](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~struct~ZIMConversation)</li></ul>|
| 支持 AppSign 鉴权 | <p>iOS、Android、macOS、Windows 平台支持 AppSign 鉴权，降低开发者接入门槛。</p><p>开发者在调用 [create](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#create) 接口，传入 AppSign，进行鉴权，鉴权通过即可使用 ZIM 相关功能。</p>| [create](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#create)|
| 图片/视频消息支持宽、高设置 | <p>方便开发者设计图片展示效果：</p><ul><li>图片消息支持设置“原图”宽、高，“大图”宽、高，“缩略图”宽、高。</li><li>视频消息支持设置“首帧图“宽、高。</li></ul> | <ul><li>[ZIMImageMessage](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~struct~ZIMImageMessage)</li><li>[ZIMVideoMessage](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~struct~ZIMVideoMessage)</li></ul>|
| 增加单例对象接口 | 便于开发者获取 ZIM 单例对象。 | [getInstance](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#get-instance)|

**改进优化**

| <div style={{width:"130px"}}>优化项</div>  | 优化描述 | 相关接口 |
| -----  | ---- | ----- |
| 逻辑优化 | <ul><li>优化网络断开时、API 的逻辑表现。</li><li>优化获取房间成员列表的逻辑。</li></ul> | - |
| 性能优化 | 优化线程切换性能。 | - |
| ZPNs SDK 适配优化 | ZPNs SDK 适配 Android 12.0 版本。 | - |

**接口变更**

- **废弃接口**

| <div style={{width:"130px"}}>废弃接口</div> | 变更说明 | 废弃版本 |
| :-------- | :------- | :----- |
| [create](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#create) | 原有的 `create` 接口废弃，替换为同名的 [create](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#create) 接口，开发者可以通过传入 AppSign 进行鉴权，接入更加便捷。   | 2.3.0 |

---

## 2.2.4 版本

**发布日期：2022-08-02**

**问题修复**

修复已知问题。

---

## 2.2.3 版本

**发布日期：2022-07-22**

**问题修复**

修复已知问题。

---

## 2.2.1 版本

**发布日期：2022-07-18**

**问题修复**

修复已知问题。

---

## 2.2.0 版本

**发布日期：2022-06-30**

**新增功能**

| <div style={{width:"130px"}}>功能项</div>  | 功能描述 | 相关接口 |
|-------|-------|-------|
| 更新用户名称 | 支持用户更新自己的名称 userName。| <ul><li>[updateUserName](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#update-user-name)</li><li>[ZIMUserInfo](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~struct~ZIMUserInfo)</li></ul>|
| 查询用户个人信息 | 支持用户查询个人信息，例如用户名称、签名等信息。| <ul><li>[queryUsersInfo](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#query-users-info)</li><li>[ZIMUserFullInfo](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~struct~ZIMUserFullInfo)</li></ul>|
| 获取群组人数 | 支持获取群组里的成员人数。| [queryGroupMemberCount](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#query-group-member-count)|

---

## 2.1.6 版本

**发布日期：2022-06-17**

**问题修复**

修复已知问题。

---

## 2.1.5 版本

**发布日期：2022-06-06**

**新增功能**

| <div style={{width:"130px"}}>功能项</div>  | 功能描述 | 相关接口 |
|-------|-------|-------|
| 安全审核 | 支持对单聊、群聊和房间内的通讯消息（文本消息、图片消息）进行安全审核，审核范围包含：鉴黄、暴恐、违禁、涉政、广告等。| <ul><li>[sendPeerMessage](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#send-peer-message)</li><li>[sendGroupMessage](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#send-group-message)</li><li>[sendRoomMessage](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#send-room-message)</li><li>[sendMediaMessage](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#send-media-message)</li></ul> |

**问题修复**

修复已知问题。

---

## 2.1.1 版本

**发布日期：2022-05-09**

**问题修复**

修复已知问题。

---

## 2.1.0 版本

**发布日期：2022-04-29**

**新增功能**

| <div style={{width:"130px"}}>功能项</div>  | 功能描述 | 相关接口 |
|-------|-------|-------|
| 收发富媒体消息 | 支持用户发送和接收图片、语音、视频和文件等类型的富媒体消息。| <ul><li>[sendMediaMessage](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#send-media-message)</li><li>[downloadMediaFile](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#download-media-file)</li></ul>|
| 自动创建房间 | 进入房间时，如果房间不存在，支持自动创建房间。| [enterRoom](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#enter-room)|

**改进优化**

| <div style={{width:"130px"}}>优化项</div>  | 优化描述 | 相关接口 |
| -----  | ---- | ----- |
| [ZIMMessage](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~struct~ZIMMessage) 成员属性优化 | ZIMMessage 对象的成员属性改为“只读”属性，开发者发送消息时无需关注和修改其属性。 | [ZIMMessage](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~struct~ZIMMessage) |

---

## 2.0.0 版本

**发布日期：2022-03-21**

**新增功能**

| <div style={{width:"130px"}}>功能项</div>  | 功能描述 | 相关接口 |
|-------|-------|-------|
| 会话管理 | <ul><li>支持用户更新、查询、删除会话列表。</li><li>支持拉取会话列表，承载所有会话，实现消息列表。</li></ul>| <ul><li>[queryConversationList](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#query-conversation-list)</li><li>[deleteConversation](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#delete-conversation)</li></ul>|
| 群组系统 | 支持用户登录后，创建、加入、退出、解散群聊；同时配备转让群主、设置群公告等常用功能。| <ul><li>[createGroup](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#create-group)</li><li>[joinGroup](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#join-group)</li><li>[leaveGroup](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#leave-group)</li><li>[dismissGroup](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#dismiss-group)</li><li>[transferGroupOwner](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#transfer-group-owner)</li></ul>|
| 离线消息推送 | <ul><li>支持“单聊/群组”消息发送给离线用户，离线用户上线后自动拉取。</li><li>支持通过手机厂商，将离线消息通知推送到手机设备上，支持主流厂商（华为、小米、OPPO、vivo、Apple）多数机型。</li></ul>| <ul><li>[setPushConfig](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZPNsManager#set-push-config)</li><li>[sendPeerMessage](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#send-peer-message)</li><li>[sendGroupMessage](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#send-group-message)</li></ul>|
| 消息管理 | <ul><li>支持“单聊/群组/房间”的所有消息存储在本地数据库中，用户更换设备也可拉取到历史信息。</li><li>支持删除“单聊/群组”会话的指定消息或全部消息。</li></ul>| <ul><li>[queryHistoryMessage](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#query-history-message)</li><li>[deleteMessages](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#delete-messages)</li><li>[deleteAllMessage](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#delete-all-message)</li></ul>|
| 呼叫邀请 | <ul><li>支持用户登录后，向指定“用户/群组/房间”发起呼叫邀请、取消邀请；支持其他用户同意邀请、拒绝邀请。</li><li>可应用于视频通话、抱麦申请等场景。</li></ul>| <ul><li>[callInvite](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#call-invite)</li><li>[callCancel](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#call-cancel)</li><li>[callAccept](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#call-accept)</li><li>[callReject](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#call-reject)</li></ul> |


**改进优化**

<Warning title="注意">

本次迭代，我们对产品的所有已有接口和新增接口，做了统一的风格优化，开发者从 `1.x.x` 升级至 `2.0.0` API 时，需要在代码里做以下适配。
</Warning>

<table>
  <colgroup>
    <col width="16%" />
    <col width="44%" />
    <col width="40%" />
  </colgroup>
  <tbody><tr>
    <th>优化项</th>
    <th>优化描述</th>
    <th>相关接口</th>
  </tr>
  <tr>
    <td>API 接口命名优化</td>
    <td><b>查询房间成员</b> 接口命名优化：queryRoomMember 重命名为 <a target="_blank" href="https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#query-room-member-list">queryRoomMemberList</a>。</td>
    <td><a target="_blank" href="https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#query-room-member-list">queryRoomMemberList</a></td>
  </tr>
  <tr>
    <td rowspan="3">API 或回调接口新增参数</td>
    <td>发送单聊/房间消息接口，增加 config 参数，用于设置是否配置离线推送、以及消息优先级等。</td>
    <td><ul><li><a target="_blank" href="https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#send-peer-message">sendPeerMessage</a></li><li><a target="_blank" href="https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#send-room-message">sendRoomMessage</a></li></ul></td>
  </tr>
  <tr>
    <td>部分回调接口，增加 roomID 参数，便于开发者在调用相关接口时，获取当前操作结果来源的房间 roomID。</td>
    <td><ul><li><a target="_blank" href="https://doc-zh.zego.im/article/api?doc=zim_API~java_android~interface~ZIMRoomLeftCallback">ZIMRoomLeftCallback</a></li><li><a target="_blank" href="https://doc-zh.zego.im/article/api?doc=zim_API~java_android~interface~ZIMRoomMemberQueriedCallback">ZIMRoomMemberQueriedCallback</a></li><li><a target="_blank" href="https://doc-zh.zego.im/article/api?doc=zim_API~java_android~interface~ZIMRoomOnlineMemberCountQueriedCallback">ZIMRoomOnlineMemberCountQueriedCallback</a></li><li><a target="_blank" href="https://doc-zh.zego.im/article/api?doc=zim_API~java_android~interface~ZIMRoomAttributesBatchOperatedCallback">ZIMRoomAttributesBatchOperatedCallback</a></li><li><a target="_blank" href="https://doc-zh.zego.im/article/api?doc=zim_API~java_android~interface~ZIMRoomAttributesQueriedCallback">ZIMRoomAttributesQueriedCallback</a></li></ul></td>
  </tr>
  <tr>
    <td><a target="_blank" href="https://doc-zh.zego.im/article/api?doc=zim_API~java_android~interface~ZIMRoomAttributesOperatedCallback">ZIMRoomAttributesOperatedCallback</a> 增加了 roomID 和 errorKeys 参数，便于开发者获取房间属性时，获取当前操作结果来源的房间 roomID，同时操作失败的 key 会返回给开发者。</td>
    <td><a target="_blank" href="https://doc-zh.zego.im/article/api?doc=zim_API~java_android~interface~ZIMRoomAttributesOperatedCallback">ZIMRoomAttributesOperatedCallback</a></td>
  </tr>
</tbody></table>

---

## 1.3.7 版本

**发布日期：2022-02-18**

**问题修复**

修复已知问题。

---

## 1.3.1 版本

**发布日期：2021-12-27**

此版本新增了后台服务端 API 接口，提升后台的消息发送能力。适用的场景更广泛，开发者可应用于在线剧本杀、在线直播、语聊房等场景中，下发场景所需音乐链接、图片链接、大批量文字等信息将更加便捷。

**接口变更**

- **新增接口**

| <div style={{width:"130px"}}>新增服务端 API 接口</div> | 接口描述 | 
|---------|---------|
| [发送单聊消息（POST 方式）](/zim-server/messaging/send-a-one-to-one-message) | 采用 POST 方式，向指定用户发送消息，消息大小限制为 32 KB。 |
| [发送房间消息（POST 方式）](/zim-server/messaging/send-room-messages) | 采用 POST 方式，向房间内发送消息，并推送给房间内所有在线用户，消息大小限制为 32 KB。 |

- **废弃接口**

| <div style={{width:"130px"}}>废弃接口</div> | 变更说明 | 废弃版本 |
| :-------- | :------- | :----- |
| 发送单聊消息（GET 方式）| 原有的 GET 请求方法（消息大小限制为 2 KB）废弃，变更为 [发送单聊消息（POST 方式）](/zim-server/messaging/send-a-one-to-one-message)，消息大小限制扩大为 32 KB，适用场景更广泛。   | 1.3.1 |
| 发送房间消息（GET 方式） | 原有的 GET 请求方法（消息大小限制为 2 KB）废弃，变更为 [发送房间消息（POST 方式）](/zim-server/messaging/send-room-messages)，消息大小限制扩大为 32 KB，适用场景更广泛。 | 1.3.1 |

**改进优化**

| <div style={{width:"130px"}}>优化项</div>  | 优化描述 | 相关接口 |
| -----  | ---- | ----- |
| 优化断网重连逻辑 | 优化断网重连逻辑。 | - |

**问题修复**

修复了请求超时逻辑在特殊场景下的异常问题。

---

## 1.3.0 版本
**发布日期：2021-11-09**

**新增功能**

| <div style={{width:"130px"}}>功能项</div>  | 功能描述 | 相关接口 |
|-------|-------|-------|
| 新增“房间属性”功能 | <p>房间属性指房间内保存的 `Key-Value` 属性对，开发者可以使用此功能为房间设置自定义信息。</p><p>此功能可用于语聊房、直播等场景，用来记录房间背景图地址、各用户的角色身份、设备状态等自定义信息。</p> | <ul><li>[createRoom](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#create-room)</li><li>[setRoomAttributes](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#set-room-attributes)</li><li>[deleteRoomAttributes](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#delete-room-attributes)</li><li>[queryRoomAllAttributes](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#query-room-all-attributes)</li><li>[beginRoomAttributesBatchOperation](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#begin-room-attributes-batch-operation)</li><li>[endRoomAttributesBatchOperation](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#end-room-attributes-batch-operation)</li><li>[onRoomAttributesUpdated](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIMEventHandler#on-room-attributes-updated)</li><li>[onRoomAttributesBatchUpdated](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIMEventHandler#on-room-attributes-batch-updated)</li></ul> |

**接口变更**

- **新增接口**

| <div style={{width:"130px"}}>新增接口</div> | 接口描述 | 
|---------|---------|
| [createRoom](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#create-room) | 创建带高级设置的房间。 |
| [setRoomAttributes](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#set-room-attributes) | <p>设置房间属性。</p><ul><li>当 Key 不存在时，调用此接口，将自动添加此 Key-Value 属性对。</li><li>当 Key 存在时，调用此接口，将更新 Value 值。</li></ul><p>此接口支持同时设置多个 Key-Value，后台默认最多可设置 10 个 Key-Value 属性对。</p>|
| [deleteRoomAttributes](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#delete-room-attributes) | 删除房间属性。调用此接口，传入 Key 即可删除，支持同时删除多个 Key-Value 属性对。 |
| [queryRoomAllAttributes](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#query-room-all-attributes) | 查询房间内设置的属性信息。 |
| [beginRoomAttributesBatchOperation](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#begin-room-attributes-batch-operation) | <p>开始进行房间属性的组合式操作，支持组合调用设置和删除房间属性。组合操作可将同一房间中，多个不同操作合并为一个原子操作进行执行，通常用于连续操作时不想被其他用户操作插入执行的场景中。</p><p>在此接口之后调用的 [setRoomAttributes](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#set-room-attributes) 和 [deleteRoomAttributes](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#delete-room-attributes) 将会被同时发送到后台执行。</p> |
| [endRoomAttributesBatchOperation](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#end-room-attributes-batch-operation) | <p>结束进行房间属性的组合式操作。</p><p>调用此接口之后将请求后台执行组合式操作。</p> |
| [onRoomAttributesUpdated](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIMEventHandler#on-room-attributes-updated) | 房间内有属性对更新时，相关信息的回调。 |
|[onRoomAttributesBatchUpdated](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIMEventHandler#on-room-attributes-batch-updated) | 房间内有使用组合式操作来更新房间属性时，相关信息的回调。|

**问题修复**

1. 修复部分房间生命周期问题。
2. 修复其他已知问题。

---

## 1.2.1 版本
**发布日期：2021-10-13**

**改进优化**

|  <div style={{width:"130px"}}>优化项</div>  | 优化描述 | 相关接口 |
| -----  | ---- | ----- |
| SDK 接口优化 | [onRoomStateChanged](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIMEventHandler#on-room-state-changed) 回调新增 roomID 参数。 | [onRoomStateChanged](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIMEventHandler#on-room-state-changed) |

**问题修复**

修复在集成 ExpressSDK 与 ZIM SDK 时，会产生相同类冲突等问题。

---

## 1.2.0 版本

**发布日期：2021-09-07**

**新增功能**

|  <div style={{width:"130px"}}>功能项</div>  | 功能描述 | 相关接口 |
|-------|-------|-------|
| 支持 SDK 线上依赖 | 支持开发者使用 JitPack 自动集成 SDK，提升集成效率。 | [实现基本消息收发 - 集成](/zim-android/send-and-receive-messages) |

**改进优化**

| 优化项  | 优化描述 | 相关接口 |
| -----  | ---- | ----- |
| SDK 错误码优化 | 优化错误码，便于开发者排查问题，提升接入体验。 | [服务端 API - 全局返回码](/zim-server/return-codes) |
| SDK 内部重连逻辑优化 | 优化内部断网重连逻辑，提高系统稳定性。 | - |

---

## 1.1.0 版本

**发布日期：2021-08-13**

首次发布，支持 1v1 通信、多人房间聊天等功能。
