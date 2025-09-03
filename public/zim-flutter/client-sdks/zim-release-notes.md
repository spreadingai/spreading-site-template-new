# ZIM 发布日志

- - -

## 2.21.1 版本

**发布日期：2025-07-15**

<Warning title="注意">

ZIM Flutter SDK 2.21.1 版本对以往部分命名定义进行了订正和甄误，并修改了部分接口的用法。详细请参考 [ZIM 升级指南](/zim-flutter/client-sdks/zim-upgrade-guide#2211-升级指南)。
</Warning>


**新增功能**

| <div style={{width:"130px"}}>功能项</div>  | 功能描述 | 相关接口 |
| ------------------------------  | ---- | ----- | 
| 多端登录支持房间模块 | 支持多个设备使用相同 UserID 加入同一房间，且不会相互踢出。详情请参考 [多端登录 - 房间管理](/zim-flutter/guides/users/multi-device-login#房间管理)。 | - |
| 群组定向消息 | ZIM 支持用户在调用 [ZIM 服务端接口](/zim-server/messaging/send-group-messages#targetoption) 发送群组消息时，指定对某些群用户是否可见。详情请参考 [群组定向消息](/zim-flutter/guides/messaging/group-targeted-message)。 | [onGroupMessageReceived](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMEventHandler/onGroupMessageReceived.html) |
| 会话列表同步状态回调 | 当用户登录 ZIM 服务时或断线重连后，可通过 [onConversationSyncStateChanged](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMEventHandler/onConversationSyncStateChanged.html) 回调，得知其从 ZIM 服务端同步最新会话列表的状态。详情请参考 [获取会话列表 - 监听会话列表同步状态变更](/zim-flutter/guides/conversation/get-the-conversation-list#监听会话列表同步状态变更)。 | [onConversationSyncStateChanged](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMEventHandler/onConversationSyncStateChanged.html) |
| 消息编辑 | 支持编辑自定义消息的检索字段（[ZIMCustomMessage > searchedContent](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMCustomMessage/searchedContent.html)），详情请参考 [编辑消息](/zim-flutter/guides/messaging/edit-messages)。 | [editMessage](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/editMessage.html) |

**改进优化**

| <div style={{width:"100px"}}>优化项</div>  | 优化描述 | 相关接口 |
| -----  | ---- | ----- |
| OPPO 推送优化 | 为适配 OPPO 消息分类新规（[OPUSH 消息分类细则](https://open.oppomobile.com/documentation/page/info?id=13189)），支持开发者设置 `category` 和 `notify_level` 字段。详情请参考 [OPPO 推送集成指南](/zim-flutter/offline-push-notifications/integrate-oppo#根据-oppo-消息分类新规申请消息分类) | - |
| 群组列表和会话列表拉取性能优化 | 优化了加载群组列表和会话列表的速度。 | - |


**问题修复**

1. 修复在同一个 ZIM 实例的生命周期内，[onConversationSyncStateChanged](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMEventHandler/onConversationSyncStateChanged.html) 事件通知在 “登录登出再登录” 后失效的问题。
2. 修复 “收到不计入未读数消息” 以及 “多端登录时其他设备所发送的消息” 的情况下，未读数出现异常的问题

---

## 2.20.0 版本

**发布日期：2025-03-21**

**新增功能**

| <div style={{width:"130px"}}>功能项</div>  | 功能描述 | 相关接口 |
| ------------------------------  | ---- | ----- |
| 消息编辑 | 支持编辑单聊消息和群聊消息的内容和其他属性，详情请参考 [编辑消息](/zim-flutter/guides/messaging/edit-messages)。<Note>此接口默认仅适用于过去 24 小时内的消息。</Note> | [editMessage](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/editMessage.html) |
| 消息重发 | 当用户发送消息时遭遇断网，如果网络在 30 秒内恢复，ZIM SDK 会自动重发该消息。如果网络在 30 秒后恢复，用户可以手动重发该消息，详情请参考 [收发消息 - 消息重发](/zim-flutter/guides/messaging/send-and-receive-messages#重发消息)。 | [ZIMMessageSendConfig > isRetrySend](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMMessageSendConfig/isRetrySend.html) |


**改进优化**

| <div style={{width:"100px"}}>优化项</div>  | 优化描述 | 相关接口 |
| -----  | ---- | ----- |
| 房间断链状态优化 | 针对短暂掉线重连状态的房间，保留其房间状态不再直接销毁。 | - |


---
## 2.19.0 版本

**发布日期：2025-01-07**

**新增功能**

| <div style={{width:"130px"}}>功能项</div>  | 功能描述 | 相关接口 |
| ------------------------------  | ---- | ----- |
| 组合消息  | 新增组合消息类型，支持在一条消息中包含多种内容项，包括文本、图片、音频、视频、文件以及自定义消息。可实现如文本+图片、文本+视频、文本+音频等多种组合方式，灵活满足不同场景需求。详情请参考 [收发消息 - 收发组合消息](/zim-flutter/guides/messaging/send-and-receive-messages#收发组合消息)。 | [ZIMMultipleMessage](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMMultipleMessage-class.html) |
| 图片格式  | 图片消息新增支持 HEIC 和 HEIF 格式，进一步扩展了兼容的图片类型，满足更多场景需求。 | [ZIMImageMessage](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMImageMessage-class.html) |
| 图片宽高信息  | ZIMImageMessage 支持开发者在发送图片消息时传入原图、大图、缩略图等图片宽高信息。ZIMVideoMessage 支持开发者在发送视频消息时传入视频首帧图宽高信息。 | <ul><li>[ZIMImageMessage - originalImageWidth](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMImageMessage/originalImageWidth.html)</li><li>[ZIMImageMessage - originalImageHeight](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMImageMessage/originalImageHeight.html)</li><li>[ZIMImageMessage - largeImageWidth](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMImageMessage/largeImageWidth.html)</li><li>[ZIMImageMessage - largeImageHeight](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMImageMessage/largeImageHeight.html)</li><li>[ZIMImageMessage - thumbnailWidth](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMImageMessage/thumbnailWidth.html)</li><li>[ZIMImageMessage - thumbnailHeight](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMImageMessage/thumbnailHeight.html)</li><li>[ZIMVideoMessage - videoFirstFrameWidth](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMVideoMessage/videoFirstFrameWidth.html)</li><li>[ZIMVideoMessage - videoFirstFrameHeight](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMVideoMessage/videoFirstFrameHeight.html)</li></ul> |

**改进优化**

| <div style={{width:"100px"}}>优化项</div>  | 优化描述 | 相关接口 |
| -----  | ---- | ----- |
| 会话标记列表超限处理逻辑改进 | 当用户标记的会话数量达到上限（默认为 1000）时，ZIM 的处理逻辑从原先的报错优化为自动取消最早标记的会话，确保用户能够继续添加新的标记会话而不受限制。 | [setConversationMark](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/setConversationMark.html) |
| 单个会话的标记数量限制上调 | 每个会话可拥有的标记数量上限从 20 上调至 30。 | [setConversationMark](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/setConversationMark.html) |
| 群成员信息查询逻辑优化 | 群成员列表信息与用户数据库关联，保障获取本地最新的用户信息。| <ul><li>[queryGroupMemberList](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/queryGroupMemberList.html)</li><li>[queryGroupMemberInfo](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/queryGroupMemberInfo.html)</li></ul> |

**接口变更**

<Note title="说明">接口变更详情请参考 [升级指南 - ZIM](/zim-flutter/client-sdks/zim-upgrade-guide#2190-升级指南)。</Note>

| 变更接口 | 变更描述 | 
| -----  | ---- | 
| [downloadMediaFile](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/downloadMediaFile.html) | [downloadMediaFile](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/downloadMediaFile.html) 新增了 `config` 参数，可用于指定下载组合消息中的单个媒体内容。 |
| `sendMediaMessage` | 废弃 `sendMediaMessage` 接口。自 2.19.0 版本后，发送多媒体消息也使用 [sendMessage](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/sendMessage.html) 接口，减少开发者的维护成本。 |

---

## 2.18.2 版本

**发布日期：2024-11-07**

**新增功能**

| <div style={{width:"130px"}}>功能项</div>  | 功能描述 | 相关接口 |
| -----  | ---- | ----- |
| 群备注  | 支持用户对某个群组设置仅自己可见的群备注。详情请参考 [群资料管理 - 修改群备注](/zim-flutter/guides/group/group-info)。| <ul><li>[updateGroupAlias](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/updateGroupAlias.html)</li><li>[onGroupAliasUpdated](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMEventHandler/onGroupAliasUpdated.html)</li></ul> |
| 用户在线状态 | 不仅支持用户通过订阅以持续关注其他用户的在线状态变化，还支持一次性查询其他用户的当下的在线状态，也支持用户查询自己的订阅列表。此外，在多端登录场景下，用户可以监听自己的在线平台变化。详情请参考 [用户状态订阅](/zim-flutter/guides/users/online-status-subscription)。| <ul><li>[subscribeUsersStatus](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/subscribeUsersStatus.html)</li><li>[onUserStatusUpdated]()</li><li>[unsubscribeUsersStatus](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/unsubscribeUsersStatus.html)</li><li>[queryUsersStatus](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/queryUsersStatus.html)</li><li>[querySubscribedUserStatusList](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/querySubscribedUserStatusList.html)</li></ul> |
| 获取房间用户头像 | 用户现在可以通过 `ZIMRoomMemberInfo` 类的 `userAvatarUrl` 属性，查询房间内其他用户的头像信息。| [ZIMRoomMemberInfo > userAvatarUrl](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMUserInfo/userAvatarUrl.html) |
| 切换房间  | 新增 `switchRoom` 接口以切换房间，适用于秒开等需要平滑切换房间的业务场景。详情请参考 [房间管理 - 切换房间](/zim-flutter/guides/room/manage-rooms) | [switchRoom](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMUserInfo/switchRoom.html) |
| 服务端查询用户信息 | 支持在服务端通过用户 ID 查询用户的信息，包含用户名称、用户头像和扩展字段。| [查询用户信息](/zim-server/user/query-user-information) |
| 服务端撤回房间消息 | 支持从服务端调用接口撤回房间消息。| [撤回房间消息](/zim-server/messaging/recall-a-room-message) |

**改进优化**

| <div style={{width:"130px"}}>优化项</div>  | 优化描述 | 相关接口 |
| -----  | ---- | ----- |
| 首次拉取会话列表耗时优化 | 优化用户登录后首次拉取会话列表的时效，提升用户体验。 | [queryConversationList]() |
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

**发布日期：2024-08-05**

**新增功能**

| <div style={{width:"130px"}}>功能项</div>  | 功能描述 | 相关接口 |
| -----  | ---- | ----- |
| 内容审核 | 无需额外开发，即可实现对消息的安全审核。<ul><li>支持消息类型多样，涵盖文本消息、图片消息、语音消息和视频消息。</li><li>支持先审后发和先发后审两种审核方式。</li><li>支持根据不同会话类型的消息定制审核标签和尺度</li><li>支持针对审核结果配置不同的审核强度。</li><li>除了默认的敏感词汇外，您可以自行定义需要处理的词汇。</li></ul>详情请参考 [内容审核 - 能力概述](/zim-flutter/guides/content-moderation/overview)。 | - |
| 会话标记 | 支持用户对会话设置标记，适用于需要关注某会话或无法处理某条会话的场景。可使用本功能实现会话分组，即对多个会话设置相同的标记。客户端实现流程请参考 [标记会话](/zim-flutter/guides/conversation/mark-conversations)，服务端实现流程请参考 [设置会话标记](/zim-server/conversation/set-conversation-marks)。  | <ul><li>[setConversationMark](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/setConversationMark.html)</li><li>[设置会话标记](/zim-server/conversation/set-conversation-marks)</li></ul> |
|  会话列表查询 | 支持将标记、会话类型和是否包含未读消息作为过滤项获取会话列表。详情请参考 [标记会话](/zim-flutter/guides/conversation/mark-conversations)。 | [queryConversationTotalUnreadMessageCount](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/queryConversationTotalUnreadMessageCount.html) |
| 回复消息 | 支持用户在会话内针对某条消息进行回复，当前支持回复文本、图片、文件、音频、视频、合并和自定义消息。此外，还支持用户查询回复树，获取回复的完整消息列表。详情请参考 [回复消息](/zim-flutter/guides/messaging/reply-to-a-message)。 | <ul><li>[replyMessage](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/replyMessage.html)</li><li>[queryMessageRepliedList](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/queryMessageRepliedList.html)</li></ul> |
| 获取特定历史消息列表 | 支持查询指定的历史消息列表，适用于需要了解某条消息的上下文的场景。详情请参考 [获取历史消息](/zim-flutter/guides/messaging/get-message-history)。 | [queryMessages](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/queryMessages.html) |
| 服务端离线消息推送无限频 | 支持开发者在调用服务端接口 [发送单聊消息](/zim-server/messaging/send-a-one-to-one-message) 和 [发送群组消息](/zim-server/messaging/send-group-messages) 向国内 Android 厂商进行无限频离线推送。 | [MessageBody 说明 - OfflinePush - PushStrategyId](/zim-server/messaging/messagebody-introduction#offlinepush-说明房间消息不支持此字段) |
| 服务端发送房间消息接口支持发送者有感知 | 新增 `SenderUnaware` 字段，允许通过服务端发送房间消息后，请求参数中的 `FromUserId`（发送方用户 ID）所对应的客户端对此次发送有感知。 | [发送房间消息](/zim-server/messaging/send-room-messages) |

**改进优化**

| <div style={{width:"130px"}}>优化项</div>  | 优化描述 | 相关接口 |
| -----  | ---- | ----- |
| 计费优化 | 优化 ZIM 各个版本间的计费梯度和规格，新增内容审核的费用说明，详情请参考 [计费说明](/zim-flutter/introduction/pricing)。 | - |

---

## 2.16.0 版本

**发布日期：2024-06-03**

**新增功能**

| <div style={{width:"130px"}}>功能项</div>  | 功能描述 | 相关接口 |
| -----  | ---- | ----- |
| 服务端管理呼叫邀请 | 支持在服务端发起、接受和拒绝呼叫邀请。 | <ul><li>[发起呼叫邀请](/zim-server/call-invitation/send-a-call-invitation)</li><li>[接受呼叫邀请](/zim-server/call-invitation/accept-a-call-invitation)</li><li>[拒绝呼叫邀请](/zim-server/call-invitation/reject-a-call-invitation)</li></ul> |
| 服务端管理禁言 | 支持在服务端禁言群组和特定群成员。 | <ul><li>[设置群禁言](/zim-server/group/mute-a-group)</li><li>[设置群成员禁言](/zim-server/group/mute-group-members)</li></ul> |
| 服务端设置群成员角色 | 支持在服务端修改群成员的角色。 | [设置群成员角色](/zim-server/group/set-group-member-roles) |
| 支持 iOS 17.0 版本 | 注意：从该版本起，不再支持 iOS 11.0 及之前的版本。<br />>从 2024-04-29 开始，所有上架 App Store 的应用必须支持 iOS 17.0 版本，详情请参考 [Apple 开发者网站官方说明](https://developer.apple.com/news/upcoming-requirements/?id=04292024a)。 | - |

**改进优化**

| <div style={{width:"130px"}}>优化项</div>  | 优化描述 | 相关接口 |
| -----  | ---- | ----- |
| 优化回执 | 包含回执过期状态实时感知，支持离线查询回执详情，支持查询群人数超过 100 人的群回执详情； | <ul><li>[queryGroupMessageReceiptReadMemberList](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/queryGroupMessageReceiptReadMemberList.html)</li><li>[queryGroupMessageReceiptUnreadMemberList](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/queryGroupMessageReceiptUnreadMemberList.html)</li></ul> |
| 呼叫邀请 | 支持用户进行进阶模式呼叫邀请时，通过 [callCancel](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/callCancel.html) 接口单独传入某个指定的 userID，仅对该用户取消呼叫，不影响全局呼叫状态。 |   [callCancel](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/callCancel.html)|
| 隐私文件 | 本次迭代 ZIM iOS SDK 内添加了隐私清单文件 PrivacyInfo.xcprivacy。<br />注意：如果开发者已集成 2.16.0 版本之前的 SDK，为了防止上架 App Store 没有隐私清单文件出现审核风险，请更新最新版本的 SDK。 | - |

---


## 2.15.0 版本

**发布日期：2024-04-24**

**新增功能**

| <div style={{width:"130px"}}>功能项</div>  | 功能描述 | 相关接口 |
|-------|-------|-------|
| 群组角色 | 新增群组角色 “管理员”，拥有大部分群主上限，可以对修改普通群成员昵称、撤回普通群成员消息、踢人、禁言单独群成员和特定群角色。<br />如需了解群组角色与对应权限，请参考 [群成员管理 - 设置群成员角色](/zim-flutter/guides/group/group-members)。 | [setGroupMemberRole](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/setGroupMemberRole.html) |
| 入群验证 | <ul><li>[ZIMGroupAdvancedConfig](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMGroupAdvancedConfig-class.html) 新增属性 [joinMode](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMGroupAdvancedConfig/joinMode.html)、[inviteMode](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMGroupAdvancedConfig/inviteMode.html) 和 [beInviteMode](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMGroupAdvancedConfig/beInviteMode.html)，支持在创建群组时设置入群验证模式、邀请模式、和邀请目标用户验证模式，从而方便群主和管理员限制外部用户入群。</li><li>当群组的入群验证模式修改为需要目标用户审批后，群内用户需要向外部用户发起入群邀请申请，等待目标用户审批。</li><li>当群组的邀请目标用户验证模式修改为需要群主和管理员审批后，外部用户发起入群申请，经由群主或管理员审批。</li><li>支持用户查询入群申请相关的列表。</li><li>支持在群组创建后调用客户端 API 和服务端 API 更新上述模式。</li></ul>如需了解接口调用细节，请参考 [群组管理](/zim-flutter/guides/group/manage-groups) | <ul><li>[createGroup](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/createGroup.html)</li><li>[ZIMGroupAdvancedConfig > joinMode](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMGroupAdvancedConfig/joinMode.html)</li><li>[ZIMGroupAdvancedConfig > inviteMode](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMGroupAdvancedConfig/inviteMode.html)</li><li>[ZIMGroupAdvancedConfig > beInviteMode](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMGroupAdvancedConfig/beInviteMode.html)</li><li>[sendGroupJoinApplication](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/sendGroupJoinApplication.html)</li><li>[acceptGroupJoinApplication](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/acceptGroupJoinApplication.html)</li><li>[rejectGroupJoinApplication](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/rejectGroupJoinApplication.html)</li><li>[sendGroupInviteApplications](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/sendGroupInviteApplications.html)</li><li>[acceptGroupInviteApplication](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/acceptGroupInviteApplication.html)</li><li>[rejectGroupInviteApplication](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/rejectGroupInviteApplication.html)</li><li>[queryGroupApplicationList](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/queryGroupApplicationList.html)</li><li>[updateGroupJoinMode](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/updateGroupJoinMode.html)</li><li>[updateGroupInviteMode](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/updateGroupInviteMode.html)</li><li>[updateGroupBeInviteMode](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/updateGroupBeInviteMode.html)</li><li>[修改群规格限制](/zim-server/group/modify-group-specification-limits)</li></ul>|
| Tips 消息 | 支持将群内用户的某些群组操作（如创建群组、解散群组等） 转换为特殊类型消息（Tips）。凭借群组消息回调获得操作信息后，开发者可以自行构造并在 UI 上展示相关事件的描述文本。<br />如需了解 Tips 消息种类和扩展信息，以及调接收后的处理操作，请参考 [接收 Tips 消息](/zim-flutter/guides/messaging/receive-tip-messages) | <ul><li>[ZIMMessageType > tips](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMMessageType.html#tips)</li><li>[onReceiveGroupMessage](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMEventHandler/onReceiveGroupMessage.html)</li></ul> |
| 自定义推送规则 | 支持用户在多端登录场景下，自行决定需要接收离线推送的平台，以及查询当前的离线推送规则。<br />如需了解接口调用细节，请参考 [自定义推送规则](/zim-flutter/offline-push-notifications/set-custom-push-rules) | <ul><li>[updateUserOfflinePushRule](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/updateUserOfflinePushRule.html)</li><li>[querySelfUserInfo](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/querySelfUserInfo.html)</li></ul> |
| 消息导出导入 | 支持将用户本地终端的历史消息导出作为备份，可用于更换设备时迁移聊天记录，或恢复被删除的消息。<br />如需了解接口调用细节，请参考 [导出导入消息](/zim-flutter/guides/messaging/export-and-import-messages) | <ul><li>[exportLocalMessages](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/exportLocalMessages.html)</li><li>[importLocalMessages](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/importLocalMessages.html)</li></ul> |
| 缓存管理 | 支持查询当前登录用户的本地缓存文件大小，并清理本地缓存。<br />如需了解接口调用细节，请参考 [缓存管理](/zim-flutter/guides/cache-management) | <ul><li>[queryLocalFileCache](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/queryLocalFileCache.html)</li><li>[clearLocalFileCache](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/clearLocalFileCache.html)</li></ul> |
| 退出所有房间 | 支持用户在多房间场景下一次性退出所有房间；也可用于开发者退出单一房间而不提前传入 roomID 的场景。| [leaveAllRoom](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/leaveAllRoom.html) |
| 数据迁移 | 支持用户通过 ZIM 服务端接口将用户数据迁移至 ZIM 服务。实现方案请参考 [迁移方案](/zim-flutter/migration-solution)。| - |
| 服务端查询会话列表 | 支持在服务端分页查询用户最新的 1000 个会话（单聊与群聊）。| [查询会话列表](/zim-server/conversation/query-conversation-list) |
| 服务端查询历史消息 | 支持在服务端分页查询用户指定单聊或群聊会话的历史消息列表。| <ul><li>[查询单聊会话消息列表](/zim-server/conversation/query-the-message-list-of-one-on-one-chats)</li><li>[查询群聊会话消息列表](/zim-server/conversation/query-the-message-list-of-group-chats)</li></ul> |
| 服务端修改群组规格 | 支持在服务端修改群组的入群验证模式、邀请模式、邀请目标验证模式和群成员人数上限。| [修改群组规格限制](/zim-server/group/modify-group-specification-limits) |


**改进优化**

| <div style={{width:"130px"}}>优化项</div>  | 优化描述 | 相关接口 |
| -----  | ---- | ----- |
| 检测邀请是否送达 | 支持在发起呼叫邀请时配置参数 [enableNotReceivedCheck](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMCallInviteConfig/enableNotReceivedCheck.html)，检测呼叫是否触达被叫，以便主叫更快感知被叫网络状态并实现提示。 | [ZIMCallInviteConfig > enableNotReceivedCheck](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMCallInviteConfig/enableNotReceivedCheck.html) |
| 服务端创建群组接口新增参数 | 新增 `CreateGroupTime` 参数，支持设置创建群组的事件。 | [创建群组](/zim-server/group/create-a-group) |
| 服务端添加群成员接口新增参数 | 新增 `GroupMemberInfos` 参数，支持定义入群用户的入群时间和入群模式。 | [添加群成员](/zim-server/group/add-group-members) |

---

## 2.14.1 版本

**发布日期：2024-03-05**

**问题修复**

修复已知问题。

---

## 2.14.0 版本

**发布日期：2024-02-04**

**新增功能**

| <div style={{width:"130px"}}>功能项</div>  | 功能描述 | 相关接口 |
|-------|-------|-------|
| 合并转发 | <ul><li>支持用户在收发消息后，通过构造合并消息体，传入发送消息接口即可实现转发合并消息；<br />注意：如需实现逐条转发，只需将已有消息作为参数传入发送消息接口即可。</li><li>支持查询合并消息包含的子消息具体内容。</li></ul> | <ul><li>[ZIMCombineMessage](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMCombineMessage-class.html)</li><li>[sendMessage](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/sendMessage.html)</li><li>[queryCombineMessageDetail](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/queryCombineMessageDetail.html)</li></ul> |
| 收发 @ 消息 | 支持用户在某个会话发送消息时，为消息设置提及指定用户（可以不在当前会话）或提及全部会话内成员。 | <ul><li>[ZIMMessage > mentionedUserIDs](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMMessage/mentionedUserIds.html)</li><li>[ZIMMessage > isMentionAll](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMMessage/isMentionAll.html)</li></ul> |
| 删除消息 | 支持用户一次性删除全部会话的所有消息。 | [deleteAllConversationMessages](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/deleteAllConversationMessages.html) |
| 保存会话草稿 | ZIM 支持用户退出单聊和群聊会话后仍在本地保存会话草稿，以便后续编辑。 | [setConversationDraft](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/setConversationDraft.html) |
| 单聊会话免打扰 | 在原有“群聊会话免打扰”的基础上，新增支持对单聊会话设置免打扰。单聊会话接收新消息后，不推送通知。 | [setConversationNotificationStatus](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/setConversationNotificationStatus.html) |
| 禁止发言 | 支持群主对群组实现群组禁言和指定群成员禁言。群组禁言支持全体禁言、普通成员禁言、指定角色成员禁言。 | <ul><li>[muteGroup](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/muteGroup.html)</li><li>[muteGroupMembers](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/muteGroupMembers.html)</li></ul> |
| 好友管理 | 用户可以直接添加和删除好友、查看看好友列表、向用户发起好友申请、同意或拒绝好友申请、查看好友申请列表、检查其他用户与自己的好友关系、查询或修改好友信息，以及搜索好友。 | <ul><li>[addFriend](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/addFriend.html)</li><li>[deleteFriends](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/deleteFriends.html)</li><li>[sendFriendApplication](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/sendFriendApplication.html)</li><li>[acceptFriendApplication](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/acceptFriendApplication.html)</li><li>[rejectFriendApplication](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/rejectFriendApplication.html)</li><li>[checkFriendsRelation](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/checkFriendsRelation.html)</li><li>[queryFriendList](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/queryFriendList.html)</li><li>[queryFriendApplicationList](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/queryFriendApplicationList.html)</li><li>[updateFriendAlias](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/updateFriendAlias.html)</li><li>[updateFriendAttributes](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/updateFriendAttributes.html)</li><li>[queryFriendsInfo](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/queryFriendsInfo.html)</li><li>[searchLocalFriends](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/searchLocalFriends.html)</li></ul> |
| 设置安全审核敏感词 | 开通安全审核后，支持开发者添加额外敏感词。当用户发送消息包含敏感词时，对该消息进行审核、替换内容或拦截。<br />注意：如需使用此功能，请联系 ZEGO 技术支持。 | - |
| 服务端设置会话免打扰 | 支持在服务端对群聊会话和单聊会话设置免打扰状态。 | [设置会话消息免打扰](/zim-server/conversation/mute-notifications-for-conversations) |
| 服务端置顶会话 | 支持在服务端为用户设置会话的置顶状态。 | [置顶会话](/zim-server/conversation/pin-conversations-to-the-top) |
| 服务端修改群资料 | 支持在服务端修改群组的头像、名称和公告。**说明**：如需使用此功能，请联系 ZEGO 技术支持了解详情。 | - |
| 服务端管理好友 | 支持在服务端为用户添加和删除好友，查询好友列表，检查好友关系，更新好友备注和属性。 | <ul><li>[批量添加好友](/zim-server/user/batch-add-friends)</li><li>[批量发送好友申请](/zim-server/user/batch-send-friend-requests)</li><li>[批量删除好友](/zim-server/user/batch-delete-friends)</li><li>[查询好友列表](/zim-server/user/query-the-friend-list)</li><li>[检查好友关系](/zim-server/user/check-friendships)</li><li>[更新好友备注](/zim-server/user/change-the-alias-of-a-friend)</li><li>[更新好友属性](/zim-server/user/modify-the-attributes-of-a-friend)</li></ul> |
| 服务端管理黑名单 | 支持在服务端为用户批量拉黑、解除黑名单、查询黑名单、检查黑名单关系。 | <ul><li>[批量拉黑用户](/zim-server/user/batch-block-users)</li><li>[批量移除黑名单](/zim-server/user/batch-unblock-users)</li><li>[查询黑名单](/zim-server/user/query-the-blocklist)</li><li>[检查黑名单关系](/zim-server/user/check-blockships)</li></ul> |

---

## 2.13.1 版本

**发布日期：2024-01-12**

**问题修复**

修复已知问题。

---

## 2.13.0 版本

**发布日期：2024-01-08**

<Warning title="注意">

[升级到 2.13.0 版本的编译问题，升级前必看 >>](/zim-flutter/client-sdks/zim-upgrade-guide#2130-升级指南)
</Warning>

**新增功能**

| <div style={{width:"130px"}}>功能项</div>  | 功能描述 | 相关接口 |
|-------|-------|-------|
| 多端登录 | “多平台登录”策略支持配置互踢逻辑，当前仅支持 android、iOS 设备互踢，Windows、Mac 设备互踢。 | [login](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/login.html) |
| 离线登录 | 支持用户在离线状态登录 IM 服务，访问本地 SDK 数据。 | [login](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/login.html) |
| 黑名单管理 | 用户可以查询自己的黑名单、将指定用户拉黑（不再接收该用户消息）、移出黑名单、以及检查指定用户是否在黑名单内。 | <ul><li>[queryBlackList](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/queryBlacklist.html)</li><li>[addUsersToBlacklist](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/addUsersToBlacklist.html)</li><li>[removeUsersFromBlacklist](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/removeUsersFromBlacklist.html)</li><li>[checkUserIsInBlacklist](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/checkUserIsInBlacklist.html)</li></ul> |
| 插入本地消息 | 支持向房间会话插入本地消息。 | [insertMessageToLocalDB](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/insertMessageToLocalDB.html) |
| 呼叫邀请 | 新增回调 [onCallInvitationCreated](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMEventHandler/onCallInvitationCreated.html)，呼叫邀请发起者可通过监听此回调，得知呼叫邀请已创建。 | [onCallInvitationCreated](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMEventHandler/onCallInvitationCreated.html) |
| 服务端撤回消息 | 支持从服务端调用接口撤回单聊消息和群聊消息。 | <ul><li>[撤回单聊消息](/zim-server/messaging/recall-a-one-to-one-message)</li><li>[撤回群聊消息](/zim-server/messaging/recall-a-group-message)</li></ul> |
| 服务端修改用户资料 | 支持从服务端调用接口修改用户资料信息，包括用户昵称、头像等。 | [修改用户资料](/zim-server/user/modify-user-information) |


**改进优化**

| <div style={{width:"130px"}}>优化项</div>  | 优化描述 | 相关接口 |
| -----  | ---- | ----- |
| 优化 roomID 长度限制 | 支持最长 128 字节的 [roomID](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMRoomInfo/roomID.html)。| [ZIMRoomInfo > roomID](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMRoomInfo/roomID.html) |
| 用户信息相关类新增用户头像字段 | [ZIMUserInfo](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMUserInfo-class.html) 和 [ZIMGroupMemberInfo](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMGroupMemberInfo-class.html) 新增 `userAvatarUrl` 字段，用于设置或说明用户头像地址。<br />注意：暂不支持获取房间成员的用户头像字段，即通过 [queryRoomMemberList](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/queryRoomMemberList.html) 和 [queryRoomMembers](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/queryRoomMembers.html) 拿到的 `ZIMUserInfo` 的 `userAvatarUrl` 为空。 | <ul><li>[ZIMUserInfo](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMUserInfo-class.html)</li><li>[ZIMGroupMemberInfo](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMGroupMemberInfo-class.html)</li></ul> |
| 优化 [onRoomStateChanged](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMEventHandler/onRoomStateChanged.html) 回调逻辑  | 当开发者调用 ZIM 服务端接口在后台销毁房间后，[roomStateChanged](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMEventHandler/onRoomStateChanged.html) 回调描述房间状态变化的原因修改为 `roomNotExist`。 | [onRoomStateChanged](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMEventHandler/onRoomStateChanged.html) |
| 发送单聊消息服务端接口新增响应参数 | 新增 `SuccessList` 参数，成员参数包含 `UserId`、`MsgId` 和 `MsgSeq`，说明消息接受成功用户的相关信息。`MsgSeq` 可用于 [撤回单聊消息](/zim-server/messaging/recall-a-one-to-one-message)。 | [发送单聊消息](/zim-server/messaging/send-a-one-to-one-message) |
| 发送群聊消息服务端接口新增响应参数 | 新增 `MsgSeq`，可用于 [撤回群聊消息](/zim-server/messaging/send-a-one-to-one-message)。 | [发送群聊消息](/zim-server/messaging/send-group-messages) |
| 消息发送后服务端回调新增字段 | 新增 `user_list` 字段，用于批量返回消息接收用户信息。**说明**：仅当开发者调用服务端接口 [发送单聊消息](/zim-server/messaging/send-a-one-to-one-message) 时，此字段有值。| [消息发送后回调](/zim-server/callbacks/message-sent) |

**废弃删除**

| <div style={{width:"130px"}}>废弃项</div>  | 废弃描述 | 相关接口 |
| -----  | ---- | ----- |
| 废弃 `login` 接口 | 废弃旧版登录接口，新增新版登录接口 [login](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/login.html)。新版登录接口支持通过 [ZIMLoginConfig](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMLoginConfig-class.html) 进行更多配置，如是否使用 Token 鉴权、是否离线登录。 | [login](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/login.html) |
| 部分用户信息相关类废弃旧版头像字段  | <ul><li>[ZIMGroupMemberInfo](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMGroupMemberInfo-class.html) 废弃 `memberAvatarUrl`，请使用新字段 `userAvatarUrl`。</li><li>[ZIMUserFullInfo](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMUserFullInfo-class.html) 废弃 `userAvatarUrl`，请从 `baseInfo` 获取 `userAvatarUrl`。</li></ul> | <ul><li>[ZIMGroupMemberInfo](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMGroupMemberInfo-class.html)</li><li>[ZIMUserFullInfo](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMUserFullInfo-class.html)</li></ul> |


---



## 2.12.1 版本

**发布日期：2023-11-29**

**问题修复**

修复已知问题。

---

## 2.12.0 版本

**发布日期：2023-11-21**

**新增功能**

| <div style={{width:"130px"}}>功能项</div>  | 功能描述 | 相关接口 |
|-------|-------|-------|
| 地理围栏 | 提供地理围栏服务，保证 IM 数据存储在运营本地，适用于海外高安全场景。 | [setGeofencingConfig](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/setGeofencingConfig.html) |
| 群消息管理 | 支持新进入群组成员自动获取群历史消息。<br />注意：如需使用此功能，请联系 ZEGO 技术支持配置。 | <ul><li>[joinGroup](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/joinGroup.html)</li><li>[inviteUsersIntoGroup](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/inviteUsersIntoGroup.html)</li></ul> |
| 一键已读 | 支持清除所有会话的消息未读数和总消息未读数。 | [clearConversationTotalUnreadMessageCount](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/clearConversationTotalUnreadMessageCount.html) |
| 呼叫邀请 | 支持呼叫外用户主动加入进阶模式呼叫，或呼叫内用户切换设备。 | [callJoin](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/callJoin.html) |
| 删除所有会话列表 | 支持清空当前会话列表 | [deleteAllConversations](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/deleteAllConversations.html) |
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

**发布日期：2023-10-27**

**新增功能**

| <div style={{width:"130px"}}>功能项</div>  | 功能描述 | 相关接口 |
|-------|-------|-------|
| 多端登录 | 支持配置双平台或多平台登录策略，用户可在多平台、多设备上同时登录同一账户，实现会话、消息、群组等数据多端互通。如需了解多端登录对其他功能的影响，请参考 [多端登录](/zim-flutter/guides/users/multi-device-login)。<br />**注意**：仅支持专业版或旗舰版套餐用户使用此功能，且需联系 ZEGO 技术支持进行配置登录策略。 | [login](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/login.html) |


**改进优化**

| <div style={{width:"130px"}}>优化项</div>  | 优化描述 | 相关接口 |
| -----  | ---- | ----- |
| 新增服务端信令消息支持类型 | 支持通过服务端发送经 base64 编码后的二进制信令消息，详情请参考 [MessageBody 说明](/zim-server/messaging/messagebody-introduction)。 | - |
| 优化删除会话后的置顶逻辑 | 删除某置顶会话后，不会自动更改该会话的置顶状态（[ZIMConversation > isPinned](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMConversation/isPinned.html)）为 `No`。当该会话有新消息，再次出现在会话列表时，仍为置顶会话。 | - |

---

## 2.10.0 版本

**发布日期：2023-09-01**

**新增功能**

| <div style={{width:"130px"}}>功能项</div>  | 功能描述 | 相关接口 |
|-------|-------|-------|
|  消息表态 | 支持对单聊和群聊消息做出反应（即表态），一般可用于表情回复消息等场景，也可用于发起群组投票、确认群组结果等操作。此外，还支持删除自己做出的表态，以及查询某个表态相关的用户信息。 | <ul><li>[addMessageReaction](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/addMessageReaction.html)</li><li>[deleteMessageReaction](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/deleteMessageReaction.html)</li><li>[queryMessageReactionUserList](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/queryMessageReactionUserList.html)</li></ul> |
| 服务端发送房间消息接口支持发送者有感知 | 新增 `SenderUnaware` 字段，允许通过服务端发送房间消息后，请求参数中的 `FromUserId`（发送方用户 ID）所对应的客户端对此次发送有感知。 | [发送房间消息](/zim-server/messaging/send-room-messages) |
| 服务端新增全员推送接口 | 支持向所有在线用户（包括消息发送用户自己）发送特定内容的消息，如文本、图片等。本功能适用于全员活动公告、送礼跨房间飘屏等场景。 | <ul><li>[全员推送](/zim-server/messaging/push-message-to-all-users)</li><li>[onBroadcastMessageReceived](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMEventHandler/onBroadcastMessageReceived.html)</li></ul> |
| 服务端新增查询用户是否在房间内接口 | 支持通过此接口，查询指定用户是否在目标房间内。 | [查询用户是否在房间内](/zim-server/room/query-whether-a-user-is-in-a-room) |

**改进优化**

| <div style={{width:"130px"}}>优化项</div>  | 优化描述 | 相关接口 |
| -----  | ---- | ----- |
| 用户昵称 UserName 长度上限调整 | 从 64 字节扩展至 256 字节，支持更长昵称，适用于 2.0.0 及以后版本的 ZIM SDK。 | [ZIMUserInfo > userName](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMUserInfo/userName.html) |

---

## 2.9.0 版本

**发布日期：2023-07-19**

<Warning title="注意">

[升级到 2.9.0 版本的编译问题，升级前必看 >>](/zim-flutter/client-sdks/zim-upgrade-guide##290-升级指南)
</Warning>

**新增功能**

| <div style={{width:"130px"}}>功能项</div>  | 功能描述 | 相关接口 |
|-------|-------|-------|
|  呼叫邀请新增模式 | 新增进阶模式，支持用户在呼叫中邀请、退出呼叫和结束呼叫。 | <ul><li>[callingInvite](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/callingInvite.html)</li><li>[callQuit](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/callQuit.html)</li><li>[callEnd](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/callEnd.html)</li></ul> |
| 撤回他人消息 | 群组会话中，群主可以撤回他人发送的消息。 | [revokeMessage](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/revokeMessage.html) |
| 获取房间成员信息 | 支持调用服务端接口，根据房间 ID 获取房间成员的信息，包括房间用户数量、用户 ID 及名称。| [获取房间成员信息](/zim-server/room/obtain-information-about-users-in-a-room) |
| 服务端消息发送接口新增支持更多消息类型 | 支持通过服务端接口发送图片、文件、音频、视频、自定义和弹幕类型消息，详情请参考 [MessageBody 说明](/zim-server/messaging/messagebody-introduction)。 | <ul><li>[发送单聊消息](/zim-server/messaging/send-a-one-to-one-message)</li><li>[发送群组消息](/zim-server/messaging/send-group-messages)</li><li>[发送房间消息](/zim-server/messaging/send-room-messages)</li></ul> |
| 下载外部富媒体消息 | 支持调用 [downloadMediaFile](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/downloadMediaFile.html) 接口，通过外部 URL 下载富媒体消息。 | [downloadMediaFile](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/downloadMediaFile.html) |
| 设置消息拓展字段 | 新增仅本端可见的消息拓展字段，支持更新该字段，可用于展示消息翻译状态或其他内容。 | <ul><li>[localExtendedData](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMMessage/localExtendedData.html)</li><li>[updateMessageLocalExtendedData](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/updateMessageLocalExtendedData.html)</li></ul> | 
| 搜索本地消息 | 通过关键字、用户 ID 等条件对单个或所有 `单聊` 和 `群聊` 会话的本地消息进行搜索，获取符合条件的消息列表；也可以基于本地消息搜索会话。| <ul><li>[searchLocalMessages](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/searchLocalMessages.html)</li><li>[searchGlobalLocalMessages](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/searchGlobalLocalMessages.html)</li><li>[searchLocalConversations](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/searchLocalConversations.html)</li></ul> |
| 搜索群组 | 支持基于关键字对群组名称进行搜索，同时支持将群成员名称和群成员昵称纳入搜索范围。 | [searchLocalGroups](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/searchLocalGroups.html) |
| 搜索群成员 | 支持基于关键字对指定群内的群成员名称进行搜索，同时支持将群成员昵称纳入搜索范围。 | [searchLocalGroupMembers](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/searchLocalGroupMembers.html) |

**改进优化**

| <div style={{width:"130px"}}>优化项</div>  | 优化描述 | 相关接口 |
| -----  | ---- | ----- |
| 呼叫邀请接收回调 | 优化呼叫邀请普通模式，支持在呼叫邀请的超时时间内，离线用户收到呼叫邀请在上线后能够立即被通知。| [onCallUserStateChanged](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMEventHandler/onCallUserStateChanged.html) |

**废弃删除**

| <div style={{width:"130px"}}>废弃接口</div> | 废弃说明 | 废弃版本 |
| -----  | ---- | ----- |
| <ul><li>[onCallInvitationAccepted](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMEventHandler/onCallInvitationAccepted.html)</li><li>[onCallInvitationRejected](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMEventHandler/onCallInvitationRejected.html)</li><li>[onCallInviteesAnsweredTimeout](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMEventHandler/onCallInviteesAnsweredTimeout.html)</li></ul> | 为便利开发者监听呼叫邀请中用户的呼叫状态变化，新增 [onCallUserStateChanged](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMEventHandler/onCallUserStateChanged.html)，替代原呼叫邀请回调 `onCallInvitationAccepted`、`onCallInvitationRejected` 和 `onCallInviteesAnsweredTimeout`。 | 2.9.0 |

---

## 2.8.0 版本

**发布日期：2023-05-23**

**新增功能**

| <div style={{width:"130px"}}>功能项</div>  | 功能描述 | 相关接口 |
|-------|-------|-------|
| 置顶会话 | 用户可以选择想要优先查看的会话，将其固定在会话列表顶部。 | <ul><li>[updateConversationPinnedState](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/updateConversationPinnedState.html)</li><li>[queryConversationPinnedList](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/queryConversationPinnedList.html)</li></ul> |
| 自定义消息类型 | 新增自定义类型消息，开发者可自定义消息的类型，如投票类型、接龙类型、视频卡片类型等，并自行完成消息的解析。ZIM SDK 不负责定义和解析自定义消息的具体内容。 | [ZIMCustomMessage](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMCustomMessage-class.html) |
| 查询会话信息 | 通过指定会话 ID 查询会话的详细信息。 | [queryConversation](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/queryConversation.html) |
| 查询房间内用户状态 | 通过指定若干 userID 和 roomID，查询目标用户是否在指定房间内，从而进行业务逻辑设计，如邀请连麦。<br />注意：最多支持一次性查询 10 名用户的信息。 | [queryRoomMember](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/queryRoomMembers.html) |
| 消息发送前回调 | 通过设置服务端回调，在用户发送单聊、群聊或房间聊天消息时，ZIM 向开发者服务端发送请求，开发者可实现：<ul><li>拦截违规消息。</li><li>建立用户黑白名单。</li></ul>  | [消息发送前回调](/zim-server/callbacks/message-not-sent-yet) |
| 消息发送后回调 | 通过设置服务端回调，在用户发送单聊、群聊、房间消息成功或失败后，ZIM 向开发者服务端发送请求，开发者可实现：<ul><li>实时记录用户发送的消息。</li><li>统计用户发送的消息。</li><li>直播录屏场景中，通过录制视频的时间戳，将聊天记录嵌入到录播视频中。</li></ul>  | [消息发送后回调](/zim-server/callbacks/message-sent) |
| 批量注册用户 | 支持调用服务端接口，指定用户信息（用户 ID 等），开发者可实现发起一次请求，注册多名用户。**说明**：最多支持一次性注册 100 名用户。 | [批量注册用户](/zim-server/user/batch-register-users) |
| 查询 App 下的群列表 | 支持调用服务端接口获取 App 中所有群组的 ID。 | [查询 App 下的群列表](/zim-server/group/query-group-list-in-the-app) |
| 查询群成员列表 | 支持调用服务端接口，指定群组 ID，获取对应群组的成员列表。 | [查询群成员列表](/zim-server/group/query-group-member-list) |
| 移除群成员 | 支持调用服务端接口，指定群组 ID 和用户 ID，批量群成员。<br />**注意：**最多支持一次性移除 50 名群成员。 | [移除群成员](/zim-server/group/remove-group-member) |
**废弃删除**

| <div style={{width:"130px"}}>废弃项</div>  | 废弃描述 | 相关接口 |
| -----  | ---- | ----- |
| 废弃系统消息类型 | [ZIMMessageType](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMMessageType.html) 废弃了系统消息（值为 30），开发者请使用功能更完善的自定义消息（值为 200）替代。 | [ZIMMessageTypeCustom](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMMessageType.html#custom) |


**其他事项**

<h6>1. 从 2.8.0 版本开始，ZIM 不再支持 iOS 11.0 以下版本，开发者的 iOS Deployment Target（最低支持版本）提升到 iOS 11.0</h6>

具体说明，请参考 [App Store submission requirement starts April 25](https://developer.apple.com/news/?id=jd9wcyov) 及 [Xcode 14 Release Notes](https://developer.apple.com/documentation/xcode-release-notes/xcode-14-release-notes#Build-System)。

<h6>2. 从 2.8.0 版本开始，ZIM iOS SDK 不再支持 32 位 armv7 架构</h6>

具体说明，请参考 [Xcode 14 Release Notes](https://developer.apple.com/documentation/xcode-release-notes/xcode-14-release-notes#Build-System)。

<h6>3. 从2.8.0 版本开始，ZIM 不再支持 macOS 10.13 以下版本，开发者的 macOS Deployment Target （最低支持版本）提升到 macOS 10.13</h6>

具体说明，请参考 [App Store submission requirement starts April 25](https://developer.apple.com/news/?id=jd9wcyov) 及 [Xcode 14 Release Notes](https://developer.apple.com/documentation/xcode-release-notes/xcode-14-release-notes#Build-System)。

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
| 优化用户登录时 userName 置空逻辑 | 区分了用户名修改接口和登录接口。用户登录时，若将 userName 置空，不再会因此修改 userName，优化用户登录体验。 | [userName](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMUserInfo/userName.html) |
| 优化会话消息拉取时机 | SDK 会智能检测当前用户的会话活跃情况，优化数据同步的时机，提升用户查询速度与体验。 | - |
| 优化断网重连时机 | 当 APP 断网后，SDK 会实时检测网络状态变化以及 APP 前后台变化，加快用户重连速度。 | - |

---

## 2.6.0 版本

**发布日期：2023-01-11**

**新增功能**

| <div style={{width:"130px"}}>功能项</div>  | 功能描述 | 相关接口 |
|-------|-------|-------|
| 服务端新增呼叫邀请相关回调 | 用户可以通过 ZIM 服务端的回调，明确呼叫邀请的结果，适用于网络环境不好时，SDK 反馈的结果不稳定。 | <ul><li>[呼叫创建回调](/zim-server/callbacks/call-invitation-sent)</li><li>[呼叫取消回调](/zim-server/callbacks/call-invitation-canceled)</li><li>[呼叫接受回调](/zim-server/callbacks/call-invitation-accepted)</li><li>[呼叫拒绝回调](/zim-server/callbacks/call-invitation-rejected)</li><li>[呼叫超时回调](/zim-server/callbacks/call-invitation-timed-out)</li></ul> |
| 消息体增加扩展字段 | [ZIMMessage](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMMessage-class.html) 增加 [extendedData](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMMessage/extendedData.html) 字段，用户可以将用户头像和昵称等信息传入该字段，在聊天对话发送消息时实时展示。	| [extendedData](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMMessage/extendedData.html) |
| 新增发送消息状态回调 | 开发者可以通过监听此回调来完善消息发送状态的逻辑。根据消息状态的变更，开发者可以在 UI 上做相应提醒等。 | [onMessageSentStatusChanged](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMEventHandler/onMessageSentStatusChanged.html) |

**改进优化**

| <div style={{width:"130px"}}>优化项</div>  | 优化描述 | 相关接口 |
| -----  | ---- | ----- |
| 优化弱网情况下消息发送的逻辑 | 用户在弱网环境下发送消息时，SDK 会通过策略逻辑尽可能保证消息发送状态的正确性。 | - |

---

## 2.5.0 版本

**发布日期：2022-12-06**

**新增功能**

| <div style={{width:"130px"}}>功能项</div>  | 功能描述 | 相关接口 |
|-------|-------|-------|
|消息撤回|  撤回发送成功的消息，默认撤回 2 分钟内的消息。撤回操作仅支持撤回单聊和群聊的消息，不支持撤回房间内消息。<br />说明：如需配置撤回时间，请联系 ZEGO 技术支持。| <ul><li>[revokeMessage](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/revokeMessage.html)</li><li>[ZIMMessageRevokedResult](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMMessageRevokedResult-class.html)</li></ul>|
|消息回执| [ZIMMessageSendConfig](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMMessageSendConfig-class.html) 新增 hasReceipt 参数，支持在单聊和群聊会话中发送附带回执的消息。<br />ZIM SDK 支持在单聊和群聊会话查看其他用户是否阅读本端发送的信息，以及支持查看群聊中已读消息和未读消息的数量，以及对应的用户信息，**但是不支持信令消息、弹幕消息、以及房间内消息使用回执。**| <ul><li>[ZIMMessageSendConfig](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMMessageSendConfig-class.html)</li><li>[sendMessageReceiptsRead](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/sendMessageReceiptsRead.html)</li><li>[sendConversationMessageReceiptRead](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/sendConversationMessageReceiptRead.html)</li><li>[queryGroupMessageReceiptReadMemberList](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/queryGroupMessageReceiptReadMemberList.html)</li><li>[queryGroupMessageReceiptUnreadMemberList](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/queryGroupMessageReceiptUnreadMemberList.html)</li><li>[queryMessageReceiptsInfo](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/queryMessageReceiptsInfo.html)</li></ul> |
| 呼叫邀请支持离线推送 | [ZIMCallInviteConfig](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMCallInviteConfig-class.html) 新增 pushConfig 参数，支持向离线用户推送呼叫邀请。离线用户接受呼叫邀请需要搭配 ZPNs SDK 一起使用。 | [ZIMCallInviteConfig](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMCallInviteConfig-class.html) |

**改进优化**

| <div style={{width:"130px"}}>优化项</div>  | 优化描述 | 相关接口 |
| -----  | ---- | ----- |
| [ZIMPushConfig](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMPushConfig-class.html) 的额外字段命名变更| 为避免开发者接入概念混淆，[ZIMPushConfig](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMPushConfig-class.html) 的 extendedData 参数修改为 payload 参数，功能不变。开发者在使用 ZPNs SDK 时，通过厂商通道的 extras 里面的 payload 字段即可获取到发送端传入的额外字段。<br />说明：若集成 ZIM SDK 2.5.0 版本后，开发者使用了离线推送功能后出现了接口编译失败的问题，请将 extendedData 改为 payload。 | - |

**废弃删除**

<h6>1. 废弃了对 bitcode 的支持</h6>

从 2.5.0 版本开始，flutter plugin 所依赖的 iOS ZIM SDK 不再支持 bitcode，请参考 [Xcode 14 Release Notes](https://developer.apple.com/documentation/xcode-release-notes/xcode-14-release-notes#Deprecations) 中关于废弃 bitcode 的说明。

---

## 2.4.0 版本

**发布日期：2022-10-17**

**新增功能**

| <div style={{width:"130px"}}>功能项</div>  | 功能描述 | 相关接口 |
|-------|-------|-------|
|管理房间用户属性| 支持房间内的用户自定义用户属性。例如：用户等级、勋章、状态等信息。| <ul><li>[setRoomMembersAttributes](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/setRoomMembersAttributes.html)</li><li>[queryRoomMembersAttributes](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/queryRoomMembersAttributes.html)</li><li>[queryRoomMemberAttributesList](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/queryRoomMemberAttributesList.html)</li></ul>|
|新增系统消息| 新增系统消息类型，支持 SDK 触发进群通知、群主替换等系统性消息。可以通过 [插入本地消息](/zim-flutter/guides/messaging/insert-local-messages) 功能实现。|- |
|插入本地消息| 支持直接向本地插入一条任意消息类型的消息。开发者可结合系统消息类型，在客户端将回调通知（例如：邀请某人进群、把某人移出群等），转为系统消息类型，插入本地 DB，以达到系统提示的效果。| [insertMessageToLocalDB](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/insertMessageToLocalDB.html)|

**改进优化**

| <div style={{width:"130px"}}>优化项</div>  | 优化描述 | 相关接口 |
| -----  | ---- | ----- |
| 优化消息发送接口 | 优化消息对象，在发送前和发送后是同一个对象。开发者在发送“视频”等内容较大的消息时，可以在消息上传完成前，缓存该消息对象，直到收到 SDK 发送成功通知时，通过比较对象相同来实现发送前 Loading 的效果。 |  [sendMessage](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/sendMessage.html) |
| 优化断网重连逻辑 | 优化在无网状态下、以及断网重连后的逻辑。 | -|
| 优化性能 | 优化数据库性能。 | -|


**接口变更**

- **新增接口**

| 新增接口 | 接口描述 | 上线版本 |
| :-------- | :------- | :----- |
| [sendMessage](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/sendMessage.html) |  新增发送消息接口，支持发送单聊、房间、群组消息。  | 2.4.0 |


- **废弃接口**

| <div style={{width:"130px"}}>废弃接口</div> | 变更说明 | 废弃版本 |
| :-------- | :------- | :----- |
| <ul><li>[sendPeerMessage](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/sendPeerMessage.html)</li><li>[sendRoomMessage](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/sendRoomMessage.html)</li><li>[sendGroupMessage](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/sendGroupMessage.html)</li></ul> | 废弃单聊消息 [sendPeerMessage](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/sendPeerMessage.html)、房间消息 [sendRoomMessage](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/sendRoomMessage.html)、群组消息 [sendGroupMessage](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/sendGroupMessage.html) 3 个消息发送接口，统一使用 [sendMessage](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/sendMessage.html) 接口替代，发送消息方式更加规范。    | 2.4.0 |

---

## 2.3.3 版本

**发布日期：2022-09-16**

**新增功能**

| <div style={{width:"130px"}}>功能项</div>  | 功能描述 | 相关接口 |
|-------|-------|-------|
| 支持 Web 平台| 支持使用 Flutter 框架开发 Web 应用。|-|

**改进优化**

| <div style={{width:"130px"}}>优化项</div>  | 优化描述 | 相关接口 |
| -----  | ---- | ----- |
| 鉴权方式优化 | 从当前版本开始，开发者可以自主进行 “AppSign 鉴权” 和 “Token 鉴权” 的切换。| <ul><li>[create](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/create.html)</li><li>[login](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/login.html)</li></ul> |

**问题修复**

修复已知问题。

---

## 2.3.0 版本

**发布日期：2022-09-02**

<Warning title="注意">

[升级到 2.3.0 版本的编译问题，升级前必看 >>](/zim-flutter/client-sdks/zim-upgrade-guide##230-升级指南)
</Warning>

**新增功能**

| <div style={{width:"130px"}}>功能项</div>  | 功能描述 | 相关接口 |
|-------|-------|-------|
| 新增扩展字段 | 支持用户通过扩展字段，设置自己的个人信息，例如用户头像、个性签名、性别等个人信息。| [updateUserExtendedData](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/updateUserExtendedData.html)|
| 新增头像字段 | 用户信息及群组新增头像字段，用户可以上传自己的头像、或自定义群组头像。| <ul><li>[updateUserAvatarUrl](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/updateUserAvatarUrl.html)</li><li>[ZIMUserFullInfo](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMUserFullInfo-class.html)</li><li>[updateGroupAvatarUrl](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/updateGroupAvatarUrl.html)</li><li>[ZIMGroupInfo](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMGroupInfo-class.html)</li><li>[ZIMConversation](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMConversation-class.html)</li></ul>|
| 支持 AppSign 鉴权 | <p>Flutter 平台支持 AppSign 鉴权，降低开发者接入门槛。</p><p>开发者在调用 [create](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/create.html) 接口，传入 AppSign，进行鉴权，鉴权通过即可使用 ZIM 相关功能。</p>| [create](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/create.html)|
| 图片/视频消息支持宽、高设置 | <p>方便开发者设计图片展示效果：</p><ul><li>图片消息支持设置“原图”宽、高，“大图”宽、高，“缩略图”宽、高。</li><li>视频消息支持设置“首帧图“宽、高。</li></ul> | <ul><li>[ZIMImageMessage](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMImageMessage-class.html)</li><li>[ZIMVideoMessage](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMVideoMessage-class.html)</li></ul>|
| 增加单例对象接口 | 便于开发者获取 ZIM 单例对象。 | [getInstance](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/getInstance.html)|

**改进优化**

| <div style={{width:"130px"}}>优化项</div>  | 优化描述 | 相关接口 |
| -----  | ---- | ----- |
| 逻辑优化 | <ul><li>优化网络断开时、API 的逻辑表现。</li><li>优化获取房间成员列表的逻辑。</li></ul> | - |
| 性能优化 | 优化线程切换性能。 | - |

**接口变更**

- **废弃接口**

| <div style={{width:"130px"}}>废弃接口</div> | 变更说明 | 废弃版本 |
| :-------- | :------- | :----- |
| [create](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/create.html) | 原有的 `create` 接口废弃，替换为同名的 [create](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/create.html) 接口，开发者可以通过传入 AppSign 进行鉴权，接入更加便捷。   | 2.3.0 |

---

## 2.1.5 版本

**发布日期：2022-06-06**

<Note title="说明">

Flutter 2.1.5 版本首次发布，对齐 iOS/Android/macOS/Windows 等平台的 2.1.5 版本。
</Note>

首次发布，支持功能如下：

| <div style={{width:"130px"}}>功能项</div>  | 功能描述 | 相关接口 |
|-------|-------|-------|
| 会话管理 | <ul><li>支持用户更新、查询、删除会话列表。</li><li>支持拉取会话列表，承载所有会话，实现消息列表。</li></ul>| <ul><li>[queryConversationList](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/queryConversationList.html)</li><li>[deleteConversation](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/deleteConversation.html)</li></ul>|
| 房间系统 | <ul><li>支持用户登录后，创建、加入、进入、退出、房间。</li><li>进入房间时，如果房间不存在，支持自动创建房间。</li><li>支持房间属性</li></ul>| <ul><li>[createRoom](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/createRoom.html)</li><li>[joinRoom](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/joinRoom.html)</li><li>[enterRoom](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/enterRoom.html)</li><li>[leaveRoom](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/leaveRoom.html)</li><li>[setRoomAttributes](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/setRoomAttributes.html)</li></ul>|
| 群组系统 | 支持用户登录后，创建、加入、退出、解散群聊；同时配备转让群主、设置群公告等常用功能。| <ul><li>[createGroup](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/createGroup.html)</li><li>[joinGroup](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/joinGroup.html)</li><li>[leaveGroup](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/leaveGroup.html)</li><li>[dismissGroup](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/dismissGroup.html)</li><li>[transferGroupOwner](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/transferGroupOwner.html)</li></ul>|
| 消息管理 | <ul><li>支持“单聊/群组/房间”的所有消息存储在本地数据库中，用户更换设备也可拉取到历史信息。</li><li>支持删除“单聊/群组”会话的指定消息或全部消息。</li><li>支持收发富媒体消息。</li></ul>| <ul><li>[queryHistoryMessage](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/queryHistoryMessage.html)</li><li>[deleteMessages](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/deleteMessages.html)</li><li>[deleteMessage](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/deleteMessages.html)</li><li>[sendMediaMessage](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/sendMediaMessage.html)</li><li>[downloadMediaFile](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/downloadMediaFile.html)</li></ul>|
| 呼叫邀请 | <ul><li>支持用户登录后，向指定“用户/群组/房间”发起呼叫邀请、取消邀请；支持其他用户同意邀请、拒绝邀请。</li><li>可应用于视频通话、抱麦申请等场景。</li></ul>| <ul><li>[callInvite](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/callInvite.html)</li><li>[callCancel](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/callCancel.html)</li><li>[callAccept](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/callAccept.html)</li><li>[callReject](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/callReject.html)</li></ul> |
| 安全审核 | 支持对单聊、群聊和房间内的通讯消息（文本消息、图片消息）进行安全审核，审核范围包含：鉴黄、暴恐、违禁、涉政、广告等。| <ul><li>[sendPeerMessage](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/sendPeerMessage.html)</li><li>[sendGroupMessage](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/sendGroupMessage.html)</li><li>[sendRoomMessage](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/sendRoomMessage.html)</li><li>[sendMediaMessage](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/sendMediaMessage.html)</li></ul> |
