export const getPlatformData = (props, data) => {
    const platform = (props.platform ?? "Android").toLowerCase();
    for (const [key, value] of Object.entries(data)) {
        const pList = key.split(",").map((v) => v.toLowerCase());
        if (pList.includes(platform)) {
            return value;
        }
    }
    return data["Android"] || data["android"] || data["default"];
};

export const getPlatformData2 = (props, data) => {
    const platform = (props.platform ?? "default").toLowerCase();
    for (const [key, value] of Object.entries(data)) {
        const pList = key.split(",").map((v) => v.toLowerCase());
        if (pList.includes(platform)) {
            return value;
        }
    }
    return data["default"];
};

export const ZIMMessageTypeMap = {
  'default': <a href="@-ZIMMessageType" target='_blank'>ZIMMessageType</a>,
  'flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMMessageType.html" target='_blank'>ZIMMessageType</a>,
}
export const ZIMMessageMentionedTypeMap = {
  'default': <a href="@-ZIMMessageMentionedType" target='_blank'>ZIMMessageMentionedType</a>,
  'flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMMessageMentionedType.html" target='_blank'>ZIMMessageMentionedType</a>,
}

export const ZIMConversationMap = {
  'default': <a href="@-ZIMConversation" target='_blank'>ZIMConversation</a>,
  'flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMConversation-class.html" target='_blank'>ZIMConversation</a>,
}
export const ZIMMessageMap = {
  'default': <a href="@-ZIMMessage" target='_blank'>ZIMMessage</a>,
  'flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMMessage-class.html" target='_blank'>ZIMMessage</a>,
}
export const ZIMTextMessageMap = {
  'default': <a href="@-ZIMTextMessage" target='_blank'>ZIMTextMessage</a>,
  'flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMTextMessage-class.html" target='_blank'>ZIMTextMessage</a>,
}
export const ZIMCommandMessageMap = {
  'default': <a href="@-ZIMCommandMessage" target='_blank'>ZIMCommandMessage</a>,
  'flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMCommandMessage-class.html" target='_blank'>ZIMCommandMessage</a>,
}
export const ZIMCustomMessageMap = {
  'default': <a href="@-ZIMCustomMessage" target='_blank'>ZIMCustomMessage</a>,
  'flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMCustomMessage-class.html" target='_blank'>ZIMCustomMessage</a>,
}
export const ZIMMultipleMessageMap = {
  'default': <a href="@-ZIMMultipleMessage" target='_blank'>ZIMMultipleMessage</a>,
  'flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMMultipleMessage-class.html" target='_blank'>ZIMMultipleMessage</a>,
}
export const isMentionAllMap = {
  'default': <a href="@isMentionAll-ZIMMessage" target='_blank'>isMentionAll</a>,
  'flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMMessage/isMentionAll.html"target='_blank'>isMentionAll</a>,
}
export const mentionedUserIDsMap = {
  'default': <a href="@mentionedUserIDs-ZIMMessage" target='_blank'>mentionedUserIDs</a>,
  'android': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMMessage/mentionedUserIds.html" target='_blank'>mentionedUserIds</a>,
}
export const mentionedInfoListMap = {
  'default': <a href="@mentionedInfoList-ZIMConversation" target='_blank'>mentionedInfoList</a>,
  'flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMConversation/mentionedInfoList.html" target='_blank'>mentionedInfoList</a>,
}


export const onMediaUploadingProgressMap = {
  'default': <a href="@onMediaUploadingProgress" target='_blank'>onMediaUploadingProgress</a>,
  // 'android': <a href="@ZIMMediaUploadingProgress" target='_blank'>ZIMMediaUploadingProgress</a>,
  'flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMMediaUploadingProgress.html" target='_blank'>ZIMMediaUploadingProgress</a>,
}
export const onMediaDownloadingProgressMap = {
  'default': <a href="@ZIMMediaDownloadingProgress" target='_blank'>ZIMMediaDownloadingProgress</a>,
  'android': <a href="@onMediaDownloadingProgress" target='_blank'>onMediaDownloadingProgress</a>,
  'flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMMediaDownloadingProgress.html" target='_blank'>ZIMMediaDownloadingProgress</a>,
}
export const multipleMediaUploadingProgressMap = {
  'default': <a href="@multipleMediaUploadingProgress" target='_blank'>multipleMediaUploadingProgress</a>,
  'android,win,window,windows,ios,mac': <a href="@onMultipleMediaUploadingProgress" target='_blank'>onMultipleMediaUploadingProgress</a>,
  'flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMMessageSendNotification/onMultipleMediaUploadingProgress.html" target='_blank'>onMultipleMediaUploadingProgress</a>,
}


export const setEventHandlerMap = {
  'default': <a href="@setEventHandler" target='_blank'>setEventHandler</a>,
  'Web,miniprogram,rn,uniapp,uni-app,harmonyos,UTS': <a href="@on" target='_blank'>on</a>,
}
export const conversationChangedMap = {
  'default': <a href="@conversationChanged" target='_blank'>conversationChanged</a>,
  'UTS': <a href="@conversationChanged" target='_blank'>onConversationChanged</a>,
  'android,win,window,windows': <a href="@onConversationChanged" target='_blank'>onConversationChanged</a>,
  'ios': <a href="https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_ios~protocol~ZIMEventHandler#zim-conversation-changed" target='_blank'>conversationChanged</a>,
  'mac': <a href="https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_macos~protocol~ZIMEventHandler#zim-conversation-changed" target='_blank'>conversationChanged</a>,
  'flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMEventHandler/onConversationChanged.html" target='_blank'>onConversationChanged</a>,
}
export const peerMessageReceivedMap = {
  'default': <a href="@peerMessageReceived" target='_blank'>peerMessageReceived</a>,
  'UTS': <a href="@peerMessageReceived" target='_blank'>onPeerMessageReceived</a>,
  'android,win,window,windows': <a href="@onPeerMessageReceived" target='_blank'>onPeerMessageReceived</a>,
  'ios': <a href="https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_ios~protocol~ZIMEventHandler#zim-peer-message-received-info-from-user-id" target='_blank'>peerMessageReceived</a>,
  'mac': <a href="https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_macos~protocol~ZIMEventHandler#zim-peer-message-received-info-from-user-id" target='_blank'>peerMessageReceived</a>,
  'flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMEventHandler/onPeerMessageReceived.html" target='_blank'>onPeerMessageReceived</a>,
  'u3d': <a href="@OnPeerMessageReceived" target='_blank'>OnPeerMessageReceived</a>,
}
export const roomMessageReceivedMap = {
  'default': <a href="@roomMessageReceived" target='_blank'>roomMessageReceived</a>,
  'UTS': <a href="@roomMessageReceived" target='_blank'>onRoomMessageReceived</a>,
  'android,win,window,windows': <a href="@onRoomMessageReceived" target='_blank'>onRoomMessageReceived</a>,
  'ios': <a href="https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_ios~protocol~ZIMEventHandler#zim-room-message-received-info-from-room-id" target='_blank'>roomMessageReceived</a>,
  'mac': <a href="https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_macos~protocol~ZIMEventHandler#zim-room-message-received-info-from-room-id" target='_blank'>roomMessageReceived</a>,
  'flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMEventHandler/onRoomMessageReceived.html" target='_blank'>onRoomMessageReceived</a>,
  'u3d': <a href="@OnRoomMessageReceived" target='_blank'>OnRoomMessageReceived</a>,
}
export const groupMessageReceivedMap = {
  'default': <a href="@groupMessageReceived" target='_blank'>groupMessageReceived</a>,
  'UTS': <a href="@groupMessageReceived" target='_blank'>onGroupMessageReceived</a>,
  'android,win,window,windows': <a href="@onGroupMessageReceived" target='_blank'>onGroupMessageReceived</a>,
  'ios': <a href="https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_ios~protocol~ZIMEventHandler#zim-group-message-received-info-from-group-id" target='_blank'>groupMessageReceived</a>,
  'mac': <a href="https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_macos~protocol~ZIMEventHandler#zim-group-message-received-info-from-group-id" target='_blank'>groupMessageReceived</a>,
  'flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMEventHandler/onGroupMessageReceived.html" target='_blank'>onGroupMessageReceived</a>,
  'u3d': <a href="@OnGroupMessageReceived" target='_blank'>OnGroupMessageReceived</a>,
}
export const broadcastMessageReceivedMap = {
  'default': <a href="@broadcastMessageReceived" target='_blank'>broadcastMessageReceived</a>,
  'UTS': <a href="@broadcastMessageReceived" target='_blank'>onBroadcastMessageReceived</a>,
  'android,win,window,windows': <a href="@onBroadcastMessageReceived" target='_blank'>onBroadcastMessageReceived</a>,
  'ios': <a href="https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_ios~protocol~ZIMEventHandler#zim-broadcast-message-received" target='_blank'>broadcastMessageReceived</a>,
  'mac': <a href="https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_macos~protocol~ZIMEventHandler#zim-broadcast-message-received" target='_blank'>broadcastMessageReceived</a>,
  'flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMEventHandler/onBroadcastMessageReceived.html" target='_blank'>onBroadcastMessageReceived</a>,
}
export const messageSentStatusChangedMap = {
  'default': <a href="@messageSentStatusChanged" target='_blank'>messageSentStatusChanged</a>,
  'UTS': <a href="@messageSentStatusChanged" target='_blank'>onMessageSentStatusChanged</a>,
  'android,win,window,windows': <a href="@onMessageSentStatusChanged" target='_blank'>onMessageSentStatusChanged</a>,
  'ios': <a href="https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_ios~protocol~ZIMEventHandler#zim-message-sent-status-changed" target='_blank'>messageSentStatusChanged</a>,
  'mac': <a href="https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_macos~protocol~ZIMEventHandler#zim-message-sent-status-changed" target='_blank'>messageSentStatusChanged</a>,
  'flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMEventHandler/onMessageSentStatusChanged.html" target='_blank'>onMessageSentStatusChanged</a>,
}
export const messageEditedMap = {
  'default': <a href="@messageEdited" target='_blank'>messageEdited</a>,
  'UTS': <a href="@messageEdited" target='_blank'>onMessageEdited</a>,
  'android,win,window,windows': <a href="@onMessageEdited" target='_blank'>onMessageEdited</a>,
  'ios': <a href="https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_ios~protocol~ZIMEventHandler#zim-message-edited" target='_blank'>messageEdited</a>,
  'mac': <a href="https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_macos~protocol~ZIMEventHandler#zim-message-edited" target='_blank'>messageEdited</a>,
  'flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMEventHandler/onMessageEdited.html" target='_blank'>onMessageEdited</a>,
}
export const sendMessageMap = {
  'default': <a href="@sendMessage" target='_blank'>sendMessage</a>,
  'flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/sendMessage.html" target='_blank'>sendMessage</a>,
  'u3d': <a href="@SendMessage" target='_blank'>SendMessage</a>,
}
export const replyMessageMap = {
  'default': <a href="@replyMessage" target='_blank'>replyMessage</a>,
  'flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/replyMessage.html" target='_blank'>replyMessage</a>,
  'u3d': <a href="@ReplyMessage" target='_blank'>ReplyMessage</a>,
}
export const downloadMediaFileMap = {
  'default': <a href="@downloadMediaFile" target='_blank'>downloadMediaFile</a>,
  'ios,mac': <a href="@downloadMediaFileWithMessage" target='_blank'>downloadMediaFileWithMessage</a>,
  'flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/downloadMediaFile.html" target='_blank'>downloadMediaFile</a>,
}
export const queryConversationListMap = {
  'default': <a href="@queryConversationList" target='_blank'>queryConversationList</a>,
  'ios,mac': <a href="@queryConversationListWithConfig" target='_blank'>queryConversationListWithConfig</a>,
  'flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/queryConversationList.html" target='_blank'>queryConversationList</a>,
}
export const queryConversationMap = {
  'default': <a href="@queryConversation" target='_blank'>queryConversation</a>,
  'flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/queryConversation.html" target='_blank'>queryConversation</a>,
}
export const clearConversationUnreadMessageCountMap = {
  'default': <a href="@clearConversationUnreadMessageCount" target='_blank'>clearConversationUnreadMessageCount</a>,
  'ios,mac': <a href="@clearConversationUnreadMessageCountWithConversationID" target='_blank'>clearConversationUnreadMessageCountWithConversationID</a>,
  'flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/clearConversationUnreadMessageCount.html" target='_blank'>clearConversationUnreadMessageCount</a>,
}
export const clearConversationTotalUnreadMessageCountMap = {
  'default': <a href="@clearConversationTotalUnreadMessageCount" target='_blank'>clearConversationTotalUnreadMessageCount</a>,
  'flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/clearConversationTotalUnreadMessageCount.html" target='_blank'>clearConversationTotalUnreadMessageCount</a>,
}
export const editMessageMap = {
  'default': <a href="@editMessage" target='_blank'>editMessage</a>,
  'flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/editMessage.html" target='_blank'>editMessage</a>,
}
export const tokenWillExpireMap = {
  'default': <a href="@tokenWillExpire" target='_blank'>tokenWillExpire</a>,
  'UTS': <a href="@tokenWillExpire" target='_blank'>onTokenWillExpire</a>,
  'android,win,window,windows': <a href="@onTokenWillExpire" target='_blank'>onTokenWillExpire</a>,
  'ios': <a href="https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_ios~protocol~ZIMEventHandler#zim-token-will-expire" target='_blank'>tokenWillExpire</a>,
  'mac': <a href="https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_macos~protocol~ZIMEventHandler#zim-token-will-expire" target='_blank'>tokenWillExpire</a>,
  'flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMEventHandler/onTokenWillExpire.html" target='_blank'>onTokenWillExpire</a>,
}
export const connectionStateChangedMap = {
  'default': <a href="@connectionStateChanged" target='_blank'>connectionStateChanged</a>,
  'UTS': <a href="@connectionStateChanged" target='_blank'>onConnectionStateChanged</a>,
  'android,win,window,windows': <a href="@onConnectionStateChanged" target='_blank'>onConnectionStateChanged</a>,
  'ios': <a href="https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_ios~protocol~ZIMEventHandler#zim-connection-state-changed-event-extended-data" target='_blank'>connectionStateChanged</a>,
  'mac': <a href="https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_macos~protocol~ZIMEventHandler#zim-connection-state-changed-event-extended-data" target='_blank'>connectionStateChanged</a>,
  'flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMEventHandler/onConnectionStateChanged.html" target='_blank'>onConnectionStateChanged</a>,
}
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

在无网络且应用已被清理的情况下，可以调用 [login](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_react-native~class~ZIM#login-2) 接口时，[ZIMLoginConfig](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_react-native~interface~ZIMLoginConfig) 中的 [isOfflineLogin](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_react-native~interface~ZIMLoginConfig#is-offline-login) 传入 `true`，实现使用上一次的用户信息离线登录 App。登录成功后，即可访问本地 SDK 数据。 

<Note title="说明">

建议您缓存每次登录使用的用户信息。当 App 打开时，读取缓存，实现以下逻辑：
- 如果判断用户不是使用上一次在线登录的 UserID ，此时 [isOfflineLogin](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_react-native~interface~ZIMLoginConfig#is-offline-login) 应为 `false`，此时离线登录会失败，不允许用户访问该 UserID 的本地 SDK 数据。
- 如果用户使用上一次在线登录的 UserID，为了实现自动登录、加速进入 App 主页以及提前渲染 UI，[isOfflineLogin](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_react-native~interface~ZIMLoginConfig#is-offline-login) 应为 `true`，实现离线登录。
</Note>



:::if{props.platform="undefined|UTS"}
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
:::

### 2 访问本地 SDK 数据

离线登录成功后，用户可以在断网时实现以下操作（截至 2.15.0 版本）：

| 分类 | 接口 |
| :-- | :-- |
| 用户相关 | <ul><li>[queryUsersInfo](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_react-native~class~ZIM#query-users-info)</li><li>[querySelfUserInfo](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_react-native~class~ZIM#query-self-user-info)</li><li>[queryBlacklist](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_react-native~class~ZIM#query-blacklist)</li><li>[checkUserIsInBlackList](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_react-native~class~ZIM#check-user-is-in-blacklist)</li><li>[queryFriendsInfo](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_react-native~class~ZIM#query-friends-info)</li><li>[queryFriendList](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_react-native~class~ZIM#query-friend-list)</li><li>[queryFriendApplicationList](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_react-native~class~ZIM#query-friend-application-list)</li><li>[queryGroupApplicationList](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_react-native~class~ZIM#query-group-application-list)</li><li>[searchLocalFriends](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_react-native~class~ZIM#search-local-friends)</li></ul> |
| 群组相关 | <ul><li>[queryGroupList](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_react-native~class~ZIM#query-group-list)</li><li>[queryGroupInfo](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_react-native~class~ZIM#query-group-info)</li><li>[queryGroupAttributes](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_react-native~class~ZIM#query-group-attributes)</li><li>[queryGroupAllAttributes](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_react-native~class~ZIM#query-group-all-attributes)</li><li>[queryGroupMemberList](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_react-native~class~ZIM#query-group-member-list)</li><li>[queryGroupMemberInfo](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_react-native~class~ZIM#query-group-member-info)</li><li>[queryGroupMemberCount](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_react-native~class~ZIM#query-group-member-count)</li><li>[searchLocalGroups](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_react-native~class~ZIM#search-local-groups)</li><li>[searchLocalGroupMembers](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_react-native~class~ZIM#search-local-group-members)</li></ul> |
| 消息相关 | <ul><li>[queryHistoryMessage](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_react-native~class~ZIM#query-history-message)</li><li>[updateMessageLocalExtendedData](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_react-native~class~ZIM#update-message-local-extended-data)</li><li>[insertMessageToLocalDB](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_react-native~class~ZIM#insert-message-to-local-db)</li><li>[deleteAllMessage](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_react-native~class~ZIM#delete-all-message)：仅支持删除本地数据库中消息。</li><li>[deleteMessages](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_react-native~class~ZIM#delete-messages)：仅支持删除本地数据库中消息。</li><li>[deleteAllConversationMessages](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_react-native~class~ZIM#delete-all-conversation-messages)：仅支持删除本地数据库中消息。</li><li>[queryMessageReceiptsInfo](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_react-native~class~ZIM#query-message-receipts-info)</li><li>[queryMessageReactionUserList](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_react-native~class~ZIM#query-message-reaction-user-list)</li><li>[queryGroupMessageReceiptReadMemberList](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_react-native~class~ZIM#query-group-message-receipt-read-member-list)</li><li>[queryGroupMessageReceiptUnreadMemberList](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_react-native~class~ZIM#query-group-message-receipt-unread-member-list)</li><li>[searchLocalMessages](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_react-native~class~ZIM#search-local-messages)</li><li>[searchGlobalLocalMessages](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_react-native~class~ZIM#search-global-local-messages)</li></ul> |
| 呼叫邀请相关 | [queryCallInvitationList](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_react-native~class~ZIM#query-call-invitation-list) |
| 会话相关 | <ul><li>[queryConversation](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_react-native~class~ZIM#query-conversation)</li><li>[queryConversationList](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_react-native~class~ZIM#query-conversation-list)</li><li>[queryConversationPinnedList](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_react-native~class~ZIM#query-conversation-pinned-list)</li><li>[clearConversationUnreadMessageCount](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_react-native~class~ZIM#clear-conversation-unread-message-count)</li><li>[clearConversationTotalUnreadMessageCount](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_react-native~class~ZIM#clear-conversation-total-unread-message-count)</li><li>[deleteConversation](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_react-native~class~ZIM#delete-conversation)：仅支持删除本地数据库中会话。</li><li>[deleteAllConversations](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_react-native~class~ZIM#delete-all-conversations)：仅支持删除本地数据库中会话。</li><li>[setConversationDraft](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_react-native~class~ZIM#set-conversation-draft)</li><li>[searchLocalConversations](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_react-native~class~ZIM#search-local-conversations)</li></ul> |

### 3 监听事件

用户可以监听 {getPlatformData2(props,connectionStateChangedMap)} 回调获取 SDK 与 ZIM 后台服务的连接情况。

当离线登录成功时，{getPlatformData2(props,connectionStateChangedMap)} 返回 [ZIMConnectionState](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_react-native~enum~ZIMConnectionState) 为 Connecting（枚举值为 1）。

当用户网络恢复连接，ZIM SDK 内部自动连接 ZIM 后台服务成功后，{getPlatformData2(props,connectionStateChangedMap)} 返回 [ZIMConnectionState](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_react-native~enum~ZIMConnectionState) 为 Connected（枚举值为 2）时，ZIM SDK 才允许调用强依赖网络的接口，并同步后台数据。

<Content />