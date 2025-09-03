# ZIM 发布日志

- - -

## 2.21.0 版本

**发布日期：2025-07-01**

<Note title="说明">
uni-app x 2.21.0 版本首次发布，对齐 iOS/Android/Web/小程序 等平台的 2.21.0 版本。
</Note>

首次发布，支持功能如下：

| <div style={{width:"130px"}}>功能项</div>  | 功能描述 | 相关接口 |
|-------|-------|-------|
| 会话管理 | <ul><li>支持用户更新、查询、删除会话列表。</li><li>支持拉取会话列表，承载所有会话，实现消息列表。</li></ul>| <ul><li>[queryConversationList](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_uni-app~class~ZIM#query-conversation-list)</li><li>[deleteConversation](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_uni-app~class~ZIM#delete-conversation)</li></ul>|
| 房间系统 | <ul><li>支持用户登录后，创建、加入、进入、退出、房间。</li><li>进入房间时，如果房间不存在，支持自动创建房间。</li><li>支持房间属性。</li></ul>| <ul><li>[createRoom](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_uni-app~class~ZIM#create-room)</li><li>[joinRoom](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_uni-app~class~ZIM#join-room)</li><li>[enterRoom](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_uni-app~class~ZIM#enter-room)</li><li>[leaveRoom](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_uni-app~class~ZIM#leave-room)</li><li>[setRoomAttributes](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_uni-app~class~ZIM#set-room-attributes)</li></ul>|
| 群组系统 | 支持用户登录后，创建、加入、退出、解散群聊；同时配备转让群主、设置群公告等常用功能。| <ul><li>[createGroup](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_uni-app~class~ZIM#create-group)</li><li>[joinGroup](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_uni-app~class~ZIM#join-group)</li><li>[leaveGroup](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_uni-app~class~ZIM#leave-group)</li><li>[dismissGroup](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_uni-app~class~ZIM#dismiss-group)</li><li>[transferGroupOwner](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_uni-app~class~ZIM#transfer-group-owner)</li></ul>|
| 消息管理 | <ul><li>支持“单聊/群组/房间”的所有消息存储在本地数据库中，用户更换设备也可拉取到历史信息。</li><li>支持删除“单聊/群组”会话的指定消息或全部消息。</li></ul>| <ul><li>[queryHistoryMessage](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_uni-app~class~ZIM#query-history-message)</li><li>[deleteMessages](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_uni-app~class~ZIM#delete-messages)</li><li>[deleteAllMessage](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_uni-app~class~ZIM#delete-all-message)</li></ul>|
| 呼叫邀请 | <ul><li>支持用户登录后，向指定“用户/群组/房间”发起呼叫邀请、取消邀请；支持其他用户同意邀请、拒绝邀请。</li><li>可应用于视频通话、抱麦申请等场景。</li></ul>| <ul><li>[callInvite](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_uni-app~class~ZIM#call-invite)</li><li>[callCancel](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_uni-app~class~ZIM#call-cancel)</li><li>[callAccept](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_uni-app~class~ZIM#call-accept)</li><li>[callReject](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_uni-app~class~ZIM#call-reject)</li></ul> |
| 安全审核 | 支持对单聊、群聊和房间内的通讯消息（文本消息）进行安全审核，审核范围包含：鉴黄、暴恐、违禁、涉政、广告等。| <ul><li>[sendMessage](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_uni-app~class~ZIM#send-message)</li><li>[replyMessage](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_uni-app~class~ZIM#reply-message)</li></ul> |
