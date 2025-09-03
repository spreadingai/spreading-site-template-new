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
<table>
<tbody>
<tr data-row-level="1">
<th>消息类型</th>
<th>说明</th>
<th>特性及适用场景</th>
</tr>

<tr data-row-level="2">
<td>ZIMCommandMessage(2)</td>
<td>开发者可自定义数据内容的信令消息。消息大小不超过 5 KB，单个客户端发送频率限制为 10 次/秒。</td>
<td>
<p>不可存储，一般适用于“语聊房”、“在线课堂”等房间内的信令传输，比如上下麦操作、送礼物，发送在线课堂课件等。</p>
<p>支持更高的并发，但不可靠，不保证消息送达和消息顺序。</p>

相关接口：{getPlatformData2(props, sendMessageMap)}
</td>
</tr>
<tr data-row-level="3">
<td>ZIMBarrageMessage(20)</td>
<td>房间内弹幕文本消息。消息大小不超过 5 KB，单个客户端发送频率无限制。</td>
<td>
<p>不可存储，专门用于房间内的高频、不可靠、允许丢掉的消息，一般适用于发送“弹幕消息”的场景中。</p><p>支持高并发，但不可靠，不保证消息送达。</p>

相关接口：{getPlatformData2(props, sendMessageMap)}

</td>
</tr>

<tr data-row-level="4">
<td>ZIMTextMessage(1)</td>
<td>文本消息。消息大小上限默认为 2 KB。如有需要，请联系 ZEGO 技术支持配置，最大可达 32 KB。单个客户端发送频率限制为 10 次/秒。</td>
<td rowspan="8">
消息可靠有序，可存储为历史消息（保存时间请参考 [计费说明 - 版本差异](/zim-web/guides/messaging/introduction/pricing) 中“历史消息存储天数”）。<br />
可用于单聊、房间、群聊等即时聊天场景。房间解散后，“房间聊天”的消息不存储。

- 图片、文件、语音、视频：通常用于发送富媒体文件类型的消息。
- 自定义消息：通常用于发送投票类型、接龙类型、视频卡片类型等消息。
- 组合消息：常用于发送图文消息。

相关接口：{getPlatformData2(props, sendMessageMap)}、{getPlatformData2(props, replyMessageMap)}
</td>
</tr>
<tr data-row-level="5">
<td>ZIMMultipleMessage(10)</td>
<td>组合消息，即包含多个 item 的消息，可包括多条文本、至多 10 张图片、1 个文件、1 个音频、1 个视频和 1 条自定义消息。<Note title="说明"><ul><li>Item 总量不得超过 20。</li><li>图片、音频、文件和视频的大小和格式限制与对应的富媒体消息类型相同。</li></ul></Note></td>
</tr>
<tr data-row-level="6">
<td>ZIMImageMessage(11)</td>
<td>图片消息。支持主流图片格式，包括 JPG、PNG、BMP、TIFF、GIF、WebP，大小不超过 10 MB，单个客户端发送频率限制为 10 次/秒。</td>
</tr>
<tr data-row-level="7">
<td>ZIMFileMessage(12)</td>
<td>文件消息。消息内容为文件，格式不限，大小不超过 100 MB，单个客户端发送频率限制为 10 次/秒。</td>
</tr>
<tr data-row-level="8">
<td>ZIMAudioMessage(13)</td>
<td>语音消息。支持 MP3、M4A 格式的语音文件，时长不超过 300 秒，大小不超过 6 MB，单个客户端发送频率限制为 10 次/秒。</td>
</tr>
<tr data-row-level="9">
<td>ZIMVideoMessage(14)</td>
<td>视频消息。支持 MP4、MOV 格式的视频文件，大小不超过 100 MB，单个客户端发送频率限制为 10 次/秒。<Note title="说明">若要在消息发送成功后获取视频首帧的宽高信息，视频必须使用 H.264 或 H.265 编码格式。</Note></td>
</tr>
<tr data-row-level="10">
<td>ZIMCombineMessage(100)</td>
<td>合并消息，消息大小无限制，单个客户端发送频率限制为 10 次/秒。</td>
</tr>
<tr data-row-level="11">
<td>ZIMCustomMessage(200)</td>
<td>自定义消息。消息大小上限默认为 2 KB。如有需要，请联系 ZEGO 技术支持配置，最大可达 32 KB。开发者可自定义消息的类型，并自行完成消息的解析，ZIM SDK 不负责定义和解析自定义消息的具体内容。</td>
</tr>
</tbody>
</table>

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
<Note title="说明">
- 发送消息时，统一使用 {getPlatformData2(props, sendMessageMap)} 接口，并根据会话类型传入对应的 conversationType 取值。
- 接收消息时：
  + 单聊消息（Peer 类型），通过 {getPlatformData2(props, peerMessageReceivedMap)} 回调接收。
  + 房间消息（Room 类型），通过 {getPlatformData2(props, roomMessageReceivedMap)} 回调接收。
  + 群组消息（Group 类型），通过 {getPlatformData2(props, groupMessageReceivedMap)} 回调接收。
</Note>

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

import {
    ZIMCommandMessageMap,
    ZIMConversationMap,
    ZIMCustomMessageMap,
    ZIMMessageMap,
    ZIMMessageMentionedTypeMap,
    ZIMMessageTypeMap,
    ZIMMultipleMessageMap,
    ZIMTextMessageMap,
    broadcastMessageReceivedMap,
    clearConversationTotalUnreadMessageCountMap,
    clearConversationUnreadMessageCountMap,
    conversationChangedMap,
    downloadMediaFileMap,
    groupMessageReceivedMap,
    isMentionAllMap,
    mentionedInfoListMap,
    mentionedUserIDsMap,
    messageSentStatusChangedMap,
    multipleMediaUploadingProgressMap,
    onMediaDownloadingProgressMap,
    onMediaUploadingProgressMap,
    peerMessageReceivedMap,
    queryConversationListMap,
    queryConversationMap,
    roomMessageReceivedMap,
    sendMessageMap,
    setEventHandlerMap,
} from "/snippets/zim/const-link.mdx"

# 收发消息

- - -

## 功能简介

:::if{props.platform="flutter"}
<Note title="说明">

本文档适用于开发以下平台的应用：iOS、Android、macOS、Windows、Web。
</Note>
:::

ZIM SDK 支持单聊消息、群组消息、房间消息等的收发，以及查询历史消息、删除消息等功能。可广泛应用于娱乐社交、电商购物、在线教育、互动直播等多种场景下。

本文档介绍了如何使用 ZIM SDK 的接口，实现各类消息的收发功能与监听消息的状态。

<Note title="说明">

开发者请根据业务需要，查看 [查询历史消息](/zim-web/guides/messaging/get-message-history)、[删除消息](/zim-web/guides/messaging/delete-messages) 等功能。
</Note>

## 消息类型

目前 ZIM 支持的消息类型如下：

<MarkMessageType />

## 收发普通消息

普通消息，包含 ZIMTextMessage、ZIMBarrageMessage 等消息类型。

<Warning title="注意">
:::if{props.platform="undefined|iOS|mac|win|flutter|Web|miniprogram|rn|uniapp"}
<div>
- 开发者可以通过注册 {getPlatformData(props,setEventHandlerMap)} 监听，用于接收相关通知（接收房间消息、连接状态、token 即将过期等通知）。
</div>
:::
:::if{props.platform="UTS"}
<div>
- 开发者可以通过各类回调接收相关通知（接收房间消息、连接状态、token 即将过期等通知）。
</div>
:::
- 接收消息时，收到的消息类型是基类 {getPlatformData(props,ZIMMessageMap)} 。开发者需要根据其中的 `type`（具体请参考 {getPlatformData(props,ZIMMessageTypeMap)} ）字段，判断消息类型是 Text 还是 Command，然后强转基类为具体的子类（ {getPlatformData(props,ZIMTextMessageMap)} 或 {getPlatformData(props,ZIMCommandMessageMap)} ），然后从 “message” 字段获取消息内容。
- 接收消息时，可以使用消息的 orderkey 来实现排序；即 orderkey 越大，消息的时间越新。接收到消息后，会自动更新消息未读数量。
</Warning>


### 发送消息

以客户端 A 向客户端 B 发送消息为例： 

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/ZIM/Common/send_receive_peerMessage.png" /></Frame>

:::if{props.platform="undefined|iOS|mac|win|flutter|Web|miniprogram|rn|uniapp"}
1. 客户端 A、B 分别创建自己的 ZIM 实例，并注册 {getPlatformData(props,setEventHandlerMap)} 监听的 {getPlatformData(props,peerMessageReceivedMap)} 回调接口，用于接收单聊消息通知。
:::
:::if{props.platform="UTS"}
1. 客户端 A、B 分别创建自己的 ZIM 实例，并监听 {getPlatformData(props,peerMessageReceivedMap)} 回调接口，用于接收单聊消息通知。
:::
2. 客户端 A、B 分别登录 ZIM SDK。
3. 客户端 A 调用 {getPlatformData(props,sendMessageMap)} 接口，设置 `conversationType` 为 `ZIMConversationType.Peer` 发送一条单聊消息到客户端 B。
4. 客户端 B 将通过 {getPlatformData(props,peerMessageReceivedMap)} 回调接口，收到客户端 A 的消息。

<Warning title="注意">
目前，ZIM SDK 对于 {getPlatformData(props,sendMessageMap)} 接口有以下限制：
- 不支持向自己发送消息：即 `toConversationID` 不能设置为调用者自己的用户 ID。
- 不支持发送空白消息：消息内容不能为空或空白。
当出现上述两种情况时，ZIM SDK 会返回错误 6000001，并提示传入参数错误。
</Warning>

:::if{props.platform=undefined}
<CodeGroup>
```java title="示例代码"
// 发送单聊 `Text` 信息
String toConversationID = "xxxx1";

ZIMTextMessage zimMessage = new ZIMTextMessage();
zimMessage.message = "消息内容";

ZIMMessageSendConfig config = new ZIMMessageSendConfig();
// 设置消息优先级
config.priority = ZIMMessagePriority.LOW;
// 设置消息的离线推送配置
ZIMPushConfig pushConfig = new ZIMPushConfig();
pushConfig.title = "离线推送的标题";
pushConfig.content= "离线推送的内容";
pushConfig.extendedData = "离线推送的扩展信息";
config.pushConfig = pushConfig;

ZIMConversationType type = ZIMConversationType.Peer;

zim.sendMessage(zimMessage, toConversationID, type, config, new ZIMMessageSentFullCallback() {
    @Override
    public void onMessageAttached(ZIMMessage zimMessage) {
        // 开发者可以通过该回调，监听消息是否开始准备发送。只有当通过本地基础参数检验的消息才会抛出该回调，否则通过 onMessageSent 回调抛出错误。
    }

    @Override
    public void onMessageSent(ZIMMessage zimMessage, ZIMError error) {
        // 开发者可以通过该回调监听消息是否发送成功。
    }
});
```
</CodeGroup>
:::
:::if{props.platform="iOS|mac"}
<CodeGroup>
```objc title="示例代码"
// 发送单聊 `Text` 信息
NSString *toConversationID = @"xxxx1";

ZIMTextMessage *textMessage = [[ZIMTextMessage alloc] init];
textMessage.message = @"消息内容";

ZIMMessageSendConfig *config = [[ZIMMessageSendConfig alloc] init];
// 设置消息优先级
config.priority = ZIMMessagePriorityLow;
// 设置消息的离线推送配置。若使用该功能，需要先开通离线推送服务
ZIMPushConfig *pushConfig = [[ZIMPushConfig alloc] init];
pushConfig.title = @"离线推送的标题";
pushConfig.content= @"离线推送的内容";
pushConfig.extendedData = @"离线推送的扩展信息";
config.pushConfig = pushConfig

ZIMMessageSendNotification *notification = [[ZIMMessageSendNotification alloc] init];
notification.onMessageAttached = ^(ZIMMessage * _Nonnull message) {
    // 发送前的回调，客户可以在这里获取一个临时对象，该对象与开发者创建的 zimMessage 对象属于同一对象，开发者可利用此特性做一些业务逻辑，如提前展示 UI 等
};

ZIMConversationType type = ZIMConversationTypePeer;

[self.zim sendMessage:textMessage toConversationID:toConversationID conversationType:type config:config notification:notification callback:^((ZIMMessage * _Nonnull message, ZIMError * _Nonnull errorInfo)) {
    // 开发者可以通过该回调监听消息是否发送成功。
}];
```
</CodeGroup>
:::
:::if{props.platform="win"}
<CodeGroup>
```cpp title="示例代码"
// 发送单聊 `Text` 信息

zim::ZIMMessage* message = nullptr;
zim::ZIMTextMessage text_message;
text_message.message = "message";
// 设置消息优先级
zim::ZIMMessageSendConfig config;
config.priority = zim::ZIM_MESSAGE_PRIORITY_LOW;
message = &text_message;

zim::ZIMConversationType type = zim::ZIMConversationType::ZIM_CONVERSATION_TYPE_PEER

auto notification = std::make_shared<zim::ZIMMessageSendNotification>(
            [=](/zim-web/guides/messaging/const-std::shared_ptr<zim::zimmessage>-&message) { int i = 0; });

zim_->sendMessage(message, "toConversationID", type, config, notification,
                    [=](/zim-web/guides/messaging/const-std::shared_ptr<zim::zimmessage>-&message,-const-zim::zimerror-&errorinfo) { int i = 0; });
```
</CodeGroup>
:::

:::if{props.platform="Web|miniprogram|rn|uniapp|UTS|harmonyos"}
<CodeGroup>
```typescript title="示例代码"
// 发送单聊 `Text` 信息

const toConversationID = ''; // 对方 userID
const conversationType = 0; // 会话类型，取值为 单聊：0，房间：1，群组：2
const config: ZIMMessageSendConfig = { 
    priority: 1, // 设置消息优先级，取值为 低：1（默认），中:2，高：3
};

const notification: ZIMMessageSendNotification = {
    onMessageAttached: (message: ZIMMessage) => {}
}

const messageTextObj: ZIMMessage = {
    type: 1,
    message: 'xxxx'
};

zim.sendMessage(messageTextObj, toConversationID, conversationType, config, notification)
    .then((res: ZIMMessageSentResult) => {
        // 发送成功
    })
    .catch((err: ZIMError) => {
        // 发送失败
    });
```
</CodeGroup>
:::
:::if{props.platform="flutter"}
<CodeGroup>
```dart title="示例代码"
// 发送单聊 `Text` 信息

ZIMTextMessage textMessage = ZIMTextMessage(message: "message");
ZIMMessageSendConfig sendConfig = ZIMMessageSendConfig();
// 设置消息优先级
sendConfig.priority = ZIMMessagePriority.low;

ZIMPushConfig pushConfig = ZIMPushConfig();
pushConfig.title = "离线推送的标题";
pushConfig.content = "离线推送的内容";
pushConfig.extendedData = "离线推送的扩展信息";
sendConfig.pushConfig = pushConfig;
ZIMMessageSendNotification notification = ZIMMessageSendNotification(onMessageAttached: (message){
    // 发送前的回调，开发者可以在这里获取一个临时对象，该对象与开发者创建的 zimMessage 对象属于同一对象，开发者可利用此特性做一些业务逻辑，如提前展示 UI 等
});

ZIMConversationType type = ZIMConversationType.peer;

ZIM.getInstance()!.sendMessage(textMessage, toConversationID, type, sendConfig).then((value) => {
    // 开发者可以通过该回调监听消息是否发送成功。
}).catchError((onError){
    // 开发者可以捕获发送失败的异常。
});
```
</CodeGroup>
:::

### 接收消息

<MarkSendMessageEvent platform={props.platform || "android"} />

:::if{props.platform=undefined}
```java
zim.setEventHandler(new ZIMEventHandler() {
    @Override
    public void onPeerMessageReceived(ZIM zim, ArrayList<ZIMMessage> messageList, ZIMMessageReceivedInfo info, String fromUserID) {
        // 收到“单聊”通信的消息回调
        for (ZIMMessage zimMessage : messageList) {
           if (zimMessage instanceof ZIMTextMessage) {
                ZIMTextMessage zimTextMessage = (ZIMTextMessage) zimMessage;
                Log.e(TAG, "收到的文本消息:"+ zimTextMessage.message);
           } else if (zimMessage instanceof ZIMCommandMessage) {
                ZIMCommandMessage zimCommandMessage = (ZIMCommandMessage) zimMessage;
                Log.e(TAG, "收到的信令消息:"+ zimCommandMessage.message);
           }    
        }
    }

    @Override
    public void onGroupMessageReceived(ZIM zim, ArrayList<ZIMMessage> messageList, ZIMMessageReceivedInfo info, String fromGroupID) {
        // 收到群组消息的回调
        for (ZIMMessage zimMessage : messageList) {
           if (zimMessage instanceof ZIMTextMessage) {
                ZIMTextMessage zimTextMessage = (ZIMTextMessage) zimMessage;
                Log.e(TAG, "收到的文本消息:"+ zimTextMessage.message);
           } else if (zimMessage instanceof ZIMCommandMessage) {
                ZIMCommandMessage zimCommandMessage = (ZIMCommandMessage) zimMessage;
                Log.e(TAG, "收到的信令消息:"+ zimCommandMessage.message);
           }    
        }
    }

    @Override
    public void onRoomMessageReceived(ZIM zim, ArrayList<ZIMMessage> messageList, ZIMMessageReceivedInfo info, String fromRoomID) {
        // 收到房间消息的回调
        for (ZIMMessage zimMessage : messageList) {
           if (zimMessage instanceof ZIMTextMessage) {
                ZIMTextMessage zimTextMessage = (ZIMTextMessage) zimMessage;
                Log.e(TAG, "收到的文本消息:"+ zimTextMessage.message);
           } else if (zimMessage instanceof ZIMCommandMessage) {
                ZIMCommandMessage zimCommandMessage = (ZIMCommandMessage) zimMessage;
                Log.e(TAG, "收到的信令消息:"+ zimCommandMessage.message);
           }    
        }
    }
});
```
:::
:::if{props.platform="iOS|mac"}
```objc
//注册 ZIMEventHander 回调
[zim setEventHandler:self];

// 收到单聊消息的回调
- (void)zim:(ZIM *)zim
    peerMessageReceived:(NSArray<ZIMMessage *> *)messageList
            info:(ZIMMessageReceivedInfo *)info
            fromUserID:(NSString *)fromUserID{
     // 在此编写收到消息后的业务逻辑    
}

// 收到群组消息的回调
- (void)zim:(ZIM *)zim
    groupMessageReceived:(NSArray<ZIMMessage *> *)messageList
            info:(ZIMMessageReceivedInfo *)info
            fromGroupID:(NSString *)fromGroupID{
    // 在此编写收到消息后的业务逻辑
}

// 收到房间消息的回调
- (void)zim:(ZIM *)zim
    roomMessageReceived:(NSArray<ZIMMessage *> *)messageList
            info:(ZIMMessageReceivedInfo *)info
            fromRoomID:(NSString *)fromRoomID{
    // 在此编写收到消息后的业务逻辑
}
```
:::
:::if{props.platform="win"}
```cpp
// 收到单聊消息的回调
void onPeerMessagedReceived(ZIM *zim*,
                         const std::vector<std::shared_ptr<ZIMMessage>> & messageList,
                         const ZIMMessageReceivedInfo & info,
                         const std::string &fromUserID) {
    //在此编写收到消息后的业务逻辑
}

// 收到群组消息的回调
void onGroupMessagedReceived(ZIM *zim*,
                         const std::vector<std::shared_ptr<ZIMMessage>> & messageList,
                         const ZIMMessageReceivedInfo & info,
                         const std::string &fromGroupID) {
    //在此编写收到消息后的业务逻辑
}

// 收到房间消息的回调
void onRoomMessagedReceived(ZIM *zim*,
                         const std::vector<std::shared_ptr<ZIMMessage>> & messageList,
                         const ZIMMessageReceivedInfo & info,
                         const std::string &fromRoomID) {
    //在此编写收到消息后的业务逻辑
}
```
:::

:::if{props.platform="Web|miniprogram|rn|uniapp|harmonyos"}
```typescript
// 收到单聊通信的消息回调
zim.on('peerMessageReceived', (zim, data) => {
});

// 收到群组消息的回调
zim.on('groupMessageReceived', (zim, data) => {
});

// 收到房间消息的回调
zim.on('roomMessageReceived', (zim, data) => {
});
```
:::
:::if{props.platform="UTS"}
```typescript
// 收到单聊通信的消息回调
zim.onPeerMessageReceived((data) => {
});

// 收到群组消息的回调
zim.onGroupMessageReceived((data) => {
});

// 收到房间消息的回调
zim.onRoomMessageReceived((data) => {
});
```
:::
:::if{props.platform="flutter"}
```dart
ZIMEventHandler.onPeerMessageReceived = (zim, messageList, info, fromUserID) {
    //收到单聊消息触发此处
};

ZIMEventHandler.onGroupMessageReceived = (zim, messageList, info, fromGroupID) {
    //收到群聊消息触发此处
};

ZIMEventHandler.onRoomMessageReceived = (zim, messageList, info, fromGroupID) {
  //收到房间消息触发此处
};
```
:::
:::if{props.platform="undefined|iOS|mac|win|rn|flutter|Web|miniprogram|UTS"}
## 重发消息

<Note title="说明">如需使用本功能，请集成 2.20.0 及以上版本的 ZIM SDK。</Note>

当用户发送**单聊**和**群聊**消息时，网络断开：

<div>
- 若在 30 秒内网络恢复，则 ZIM SDK 会自动重发该消息。
- 若在 30 秒内网络未恢复，则消息发送失败。
- 如需配置网络恢复等待时间，请联系 ZEGO 技术支持。
</div>

当自动重发失败时，用户可以在网络恢复后，手动重发该消息。此时，再次调用 {getPlatformData(props,sendMessageMap)} 接口，将发送失败的消息对象重新填入，并且参数 `config.isRetrySend` 设置为 true。

手动重发成功后，该消息会排序到当前最后位置。例如：当前消息排序为：A（成功）、B（失败）、C（成功），当重发消息 B 成功后，排序为 A、C、B。

<Note title="说明">当 ZIM SDK 自动重发消息时，若用户同时进行手动重发，接口将调用失败，ZIM SDK 提示参数错误。</Note>
:::
:::if{props.platform=undefined}
<CodeGroup>
```java title="示例代码" {10,14}
// 重发单聊 `Text` 信息
String toConversationID = "xxxx1";

ZIMTextMessage zimMessage; // 从 queryHistoryMessage 接口获取发送失败的消息

ZIMMessageSendConfig config = new ZIMMessageSendConfig();
// 设置消息优先级
config.priority = ZIMMessagePriority.LOW;
// 需要设置为 true，表示重发此消息
config.isRetrySend = true;

ZIMConversationType type = ZIMConversationType.Peer;

zim.sendMessage(zimMessage, toConversationID, type, config, new ZIMMessageSentFullCallback() {
    @Override
    public void onMessageAttached(ZIMMessage zimMessage) {
        // 开发者可以通过该回调，监听消息是否开始准备发送。只有当通过本地基础参数检验的消息才会抛出该回调，否则通过 onMessageSent 回调抛出错误。
    }

    @Override
    public void onMessageSent(ZIMMessage zimMessage, ZIMError error) {
        // 开发者可以通过该回调监听消息是否发送成功。
    }
});
```
</CodeGroup>
:::
:::if{props.platform="iOS|mac"}
<CodeGroup>
```objc title="示例代码" {10,19}
// 重发单聊 `Text` 信息
NSString *toConversationID = @"xxxx1";

ZIMTextMessage *textMessage; // 从 queryHistoryMessage 接口获取发送失败的消息

ZIMMessageSendConfig *config = [[ZIMMessageSendConfig alloc] init];
// 设置消息优先级
config.priority = ZIMMessagePriorityLow;
// 需要设置为 true，表示重发此消息
config.isRetrySend = true;

ZIMMessageSendNotification *notification = [[ZIMMessageSendNotification alloc] init];
notification.onMessageAttached = ^(ZIMMessage * _Nonnull message) {
    // 发送前的回调，客户可以在这里获取一个临时对象，该对象与开发者创建的 zimMessage 对象属于同一对象，开发者可利用此特性做一些业务逻辑，如提前展示 UI 等
};

ZIMConversationType type = ZIMConversationTypePeer;

[self.zim sendMessage:textMessage toConversationID:toConversationID conversationType:type config:config notification:notification callback:^((ZIMMessage * _Nonnull message, ZIMError * _Nonnull errorInfo)) {
    // 开发者可以通过该回调监听消息是否发送成功。
}];
```
</CodeGroup>
:::
:::if{props.platform="win"}
<CodeGroup>
```cpp title="示例代码" {9,16}
// 重发单聊 `Text` 信息

std::shared_ptr<zim::ZIMTextMessage> message; // 从 queryHistoryMessage 接口获取发送失败的消息

// 设置消息优先级
zim::ZIMMessageSendConfig config;
config.priority = zim::ZIM_MESSAGE_PRIORITY_LOW;
// 需要设置为 true，表示重发此消息
config.isRetrySend = true;

zim::ZIMConversationType type = zim::ZIMConversationType::ZIM_CONVERSATION_TYPE_PEER

auto notification = std::make_shared<zim::ZIMMessageSendNotification>(
            [=](/zim-web/guides/messaging/const-std::shared_ptr<zim::zimmessage>-&message) { int i = 0; });

zim_->sendMessage(message, "toConversationID", type, config, notification,
                    [=](/zim-web/guides/messaging/const-std::shared_ptr<zim::zimmessage>-&message,-const-zim::zimerror-&errorinfo) { int i = 0; });
```
</CodeGroup>
:::
:::if{props.platform="Web|miniprogram|rn|UTS|uniapp"}
<CodeGroup>
```typescript title="示例代码" {7,17}
// 重发单聊 `Text` 信息

const toConversationID = ''; // 对方 userID
const conversationType = 0; // 会话类型，取值为 单聊：0，房间：1，群组：2
const config: ZIMMessageSendConfig = { 
    priority: 1, // 设置消息优先级，取值为 低：1（默认），中:2，高：3
    isRetrySend: true, // 需要设置为 true，表示重发此消息
};

const notification: ZIMMessageSendNotification = {
    onMessageAttached: (message: ZIMMessage) => {}
}

const messageTextObj: ZIMMessage = {}; // 从 queryHistoryMessage 接口获取发送失败的消息

zim.sendMessage(messageTextObj, toConversationID, conversationType, config, notification)
    .then((res: ZIMMessageSentResult) => {
        // 发送成功
    })
    .catch((err: ZIMError) => {
        // 发送失败
    });
```
</CodeGroup>
:::
:::if{props.platform="flutter"}
<CodeGroup>
```dart title="示例代码" {8,16}
// 重发单聊 `Text` 信息

ZIMTextMessage textMessage; // 从 queryHistoryMessage 接口获取发送失败的消息
ZIMMessageSendConfig sendConfig = ZIMMessageSendConfig();
// 设置消息优先级
sendConfig.priority = ZIMMessagePriority.low;
// 需要设置为 true，表示重发此消息
sendConfig.isRetrySend = true;

ZIMMessageSendNotification notification = ZIMMessageSendNotification(onMessageAttached: (message){
    // 发送前的回调，开发者可以在这里获取一个临时对象，该对象与开发者创建的 zimMessage 对象属于同一对象，开发者可利用此特性做一些业务逻辑，如提前展示 UI 等
});

ZIMConversationType type = ZIMConversationType.peer;

ZIM.getInstance()!.sendMessage(textMessage, toConversationID, type, sendConfig).then((value) => {
    // 开发者可以通过该回调监听消息是否发送成功。
}).catchError((onError){
    // 开发者可以捕获发送失败的异常。
});
```
</CodeGroup>
:::


## 收发富媒体消息

ZIM SDK 支持发送多种类型的富媒体消息，包含图片、文件、音频、视频等消息类型，开发者可以通过以下步骤实现富媒体文件消息的收发。

:::if{props.platform="undefined|iOS|mac|win|rn|uniapp|UTS|flutter|harmonyos"}
<div>
1. 用户登录成功后，指定消息类型（图片、文件、音频、视频）、会话类型（单聊、房间、群组）等，向指定会话发送富媒体消息。
2. 接收方用户登录成功后，根据会话类型（单聊、房间、群组）的相关回调监听，接收富媒体消息的相关通知，以及下载富媒体消息文件到本地。
</div>
:::
:::if{props.platform="Web|miniprogram"}
<div>
1. 用户登录成功后，指定消息类型（图片、文件、音频、视频）、会话类型（单聊、房间、群组）等，向指定会话发送富媒体消息。
2. 接收方用户登录成功后，根据会话类型（单聊、房间、群组）的相关回调监听，接收富媒体消息的相关通知。
</div>
:::

### 发送富媒体消息

用户登录成功后，调用 {getPlatformData(props,sendMessageMap)} 接口，指定会话、消息类型（图片、文件、音频、视频）、会话类型（单聊、房间、群组）、以及相关消息配置，向指定会话发送富媒体消息。


<Warning title="注意">

:::if{props.platform="undefined|iOS|mac|win|rn|uniapp|UTS|flutter|harmonyos"}
- 发送富媒体消息时，填写的待发送文件路径，必须使用 `UTF-8` 编码格式和本地文件的绝对路径。
:::
- 如果需要向房间/群组内发送富媒体消息，消息发送者必须要在这个房间/群组内。


</Warning>


:::if{props.platform=undefined}
<CodeGroup>
```java title="图片消息"
// 发送富媒体消息消息示例 - 单聊 发送图片消息
ZIMImageMessage message = new ZIMImageMessage("/storage/emulated/0/Android/data/packagename/picture/xxx.jpg");
// 如果此处填了网络 URL，SDK 则会透传该路径，而不会经过 ZIM 后台服务处理，同时填入网络 URL 与本地路径，SDK 会优先认为用户想要使用网络 URL
message.setLargeImageDownloadUrl("url");
message.setFileDownloadUrl("url");
message.setThumbnailDownloadUrl("url");
ZIMMessageSendConfig config = new ZIMMessageSendConfig();
// 设置消息优先级
config.priority = ZIMMessagePriority.LOW;
// 设置消息的离线推送配置
// 不支持设置房间消息的离线推送配置，如果需要发送房间离线消息，请联系 ZEGO 技术支持开通相关权限
ZIMPushConfig pushConfig = new ZIMPushConfig();
pushConfig.title = "离线推送的标题";
pushConfig.content= "离线推送的内容";
pushConfig.extendedData = "离线推送的扩展信息";
config.pushConfig = pushConfig;

zim.sendMessage(message, toConversationID, ZIMConversationType.PEER, config, new ZIMMessageSentFullCallback() {
    @Override
    public void onMessageSent(ZIMMessage message, ZIMError errorInfo) {
        // 开发者可以通过该回调，监听消息是否开始准备发送。只有当通过本地基础参数检验的消息才会抛出该回调，否则通过 onMessageSent 回调抛出错误。               
    }

    @Override
    public void onMessageAttached(ZIMMessage message){
    
    }

    @Override
    public void onMediaUploadingProgress(ZIMMediaMessage message, long currentFileSize, long totalFileSize, ) {
        // 开发者可以通过该回调监听消息是否发送成功。               
    }
});
```
```java title="文件消息"
// 发送富媒体消息消息示例 - 单聊 发送文件消息
ZIMFileMessage message = new ZIMFileMessage("/storage/emulated/0/Android/data/packagename/picture/xxx.zip");
// 如果此处填了网络 URL，SDK 则会透传该路径，而不会经过 ZIM 后台服务处理，同时填入网络 URL 与本地路径，SDK 会优先认为用户想要使用网络 URL
message.setFileDownloadUrl("url");
ZIMMessageSendConfig config = new ZIMMessageSendConfig();
config.priority = ZIMMessagePriority.HIGH;
zim.sendMessage(message, conversationID, ZIMConversationType.PEER, config, new ZIMMessageSentFullCallback() {
    @Override
    public void onMessageSent(ZIMMessage message, ZIMError errorInfo) {
               
    }

    @Override
    public void onMessageAttached(ZIMMessage message){
    
    }

    @Override
    public void onMediaUploadingProgress(ZIMMediaMessage message, long currentFileSize, long totalFileSize) {
               
    }
});
```
```java title="音频消息"
// 发送富媒体消息消息示例 - 单聊 发送音频消息
ZIMAudioMessage message = new ZIMAudioMessage("/storage/emulated/0/Android/data/packagename/picture/xxx.mp3", 300); // 这里的300只是举例，单位是秒。

// 如果此处填了网络 URL，SDK 则会透传该路径，而不会经过 ZIM 后台服务处理，同时填入网络 URL 与本地路径，SDK 会优先认为用户想要使用网络 URL
message.setFileDownloadUrl("url");
ZIMMessageSendConfig config = new ZIMMessageSendConfig();

ZIMMessageSendConfig config = new ZIMMessageSendConfig();
config.priority = ZIMMessagePriority.HIGH;
zim.sendMessage(message, conversationID, ZIMConversationType.PEER, config, new ZIMMessageSentFullCallback() {
    @Override
    public void onMessageSent(ZIMMessage message, ZIMError errorInfo) {
               
    }
    
    @Override
    public void onMessageAttached(ZIMMessage message){
    
    }

    @Override
    public void onMediaUploadingProgress(ZIMMediaMessage message, long currentFileSize, long totalFileSize) {
               
    }
});
```
```java title="视频消息"
// 发送富媒体消息消息示例 - 单聊 发送视频消息
ZIMVideoMessage message = new ZIMVideoMessage("/storage/emulated/0/Android/data/packagename/picture/xxx.mp4", 300);//这里单位是秒

// 如果此处填了网络 URL，SDK 则会透传该路径，而不会经过 ZIM 后台服务处理，同时填入网络 URL 与本地路径，SDK 会优先认为用户想要使用网络 URL
message.setFileDownloadUrl("url");
message.videoFirstFrameDownloadUrl("url");
ZIMMessageSendConfig config = new ZIMMessageSendConfig();
config.priority = ZIMMessagePriority.HIGH;
zim.sendMessage(message, conversationID, ZIMConversationType.PEER, config, new ZIMMessageSentFullCallback() {
    @Override
    public void onMessageSent(ZIMMessage message, ZIMError errorInfo) {
               
    }
   
    @Override
    public void onMessageAttached(ZIMMessage message){
    
    }

    @Override
    public void onMediaUploadingProgress(ZIMMediaMessage message, long currentFileSize, long totalFileSize) {
               
    }
});
```
</CodeGroup>
:::
:::if{props.platform="iOS|mac"}
<CodeGroup>
```objc title="图片"
// 发送多媒体消息示例 - 单聊 发送图片消息
ZIMImageMessage *imgMsg = [[ZIMImageMessage alloc] init];

//需填入 UTF-8 格式的本地路径（建议填写 app 本地图片的路径）
//此处以一个相册图片临时路径为例
imgMsg.fileLocalPath = @"/private/var/mobile/Containers/Data/Application/C142EFE6-9DEC-449D-89B7-BF99F2578F98/tmp/D1513E30-2641-440B-B897-48CD43BE1D04.jpeg";

//如果此处填入了网络 URL, SDK 会透传该路径，而不会经过 ZIM 后台服务处理， 同时填入网络 URL 与本地路径，SDK 会优先认为用户想要使用网路 URL
imgMsg.fileDownloadUrl = @"";

ZIMMessageSendConfig *sendConfig = [[ZIMMessageSendConfig alloc] init];
sendConfig.priority = 1;
        
ZIMMessageSendNotification *notification = [[ZIMMessageSendNotification alloc] init];
notification.onMessageAttached = ^(ZIMMessage * _Nonnull message) {
    // 开发者可以监听这个回调执行消息发送前的业务逻辑
};
        
notification.onMediaUploadingProgress = ^(ZIMMediaMessage * _Nonnull message, unsigned long long currentFileSize, unsigned long long totalFileSize) {
    // 开发者可以监听这个回调获取多媒体上传的进度
};

[[ZIM getInstance] sendMessage:imgMsg toConversationID:@"conversationID" conversationType:ZIMConversationTypePeer config:sendConfig notification:notification callback:^(ZIMMessage * _Nonnull message, ZIMError * _Nonnull errorInfo) {
        
}];
```
```objc title="音频"
// 发送多媒体消息示例 - 单聊 发送音频消息
//需填入 UTF-8 格式的本地路径（建议填写 app 本地音频的路径）,音频时间（单位秒）
//此处以一个本地音频文件路径为例
 ZIMAudioMessage audioMessage = [[ZIMAudioMessage alloc] initWithFileLocalPath:@"/private/var/mobile/Containers/Shared/AppGroup/D5144D14-3FE8-4C6C-8527-01F368B8E49E/File Provider Storage/IMG_0131.mp3" audioDuration:10];

//如果此处填入了网络 URL, SDK 会透传该路径，而不会经过 ZIM 后台服务处理， 同时填入网络 URL 与本地路径，SDK 会优先任务用户想要使用网路 URL
audioMessage.fileDownloadUrl = @"";

ZIMMessageSendConfig *sendConfig = [[ZIMMessageSendConfig alloc] init];
sendConfig.priority = ZIMMessagePriorityHigh;

ZIMMessageSendNotification *notification = [[ZIMMessageSendNotification alloc] init];
notification.onMessageAttached = ^(ZIMMessage * _Nonnull message) {
    // 开发者可以监听这个回调执行消息发送前的业务逻辑
};
        
notification.onMediaUploadingProgress = ^(ZIMMediaMessage * _Nonnull message, unsigned long long currentFileSize, unsigned long long totalFileSize) {
    // 开发者可以监听这个回调获取多媒体上传的进度
};

[[ZIM getInstance] sendMessage:audioMessage toConversationID:@"conversationID" conversationType:ZIMConversationTypePeer config:sendConfig notification:notification callback:^(ZIMMessage * _Nonnull message, ZIMError * _Nonnull errorInfo) {
        
}];
```
```objc title="视频"
// 发送多媒体消息示例 - 单聊 发送视频消息
ZIMVideoMessage *videoMessage = [[ZIMVideoMessage alloc] init];

//需填入 UTF-8 格式的本地路径
//此处以一个本地视频路径为例
videoMessage.fileLocalPath = @"/var/mobile/Containers/Data/Application/C142EFE6-9DEC-449D-89B7-BF99F2578F98/Documents/22-08-31-10:23:49.mp4";

//如果此处填入了网络 URL, SDK 会透传该路径，而不会经过 ZIM 后台服务处理， 同时填入网络 URL 与本地路径，SDK 会优先认为用户想要使用网路 URL
videoMessage.fileDownloadUrl = @"";

ZIMMessageSendConfig *sendConfig = [[ZIMMessageSendConfig alloc] init];
sendConfig.priority = ZIMMessagePriorityHigh;

ZIMMessageSendNotification *notification = [[ZIMMessageSendNotification alloc] init];
notification.onMessageAttached = ^(ZIMMessage * _Nonnull message) {
    // 开发者可以监听这个回调执行消息发送前的业务逻辑
};
        
notification.onMediaUploadingProgress = ^(ZIMMediaMessage * _Nonnull message, unsigned long long currentFileSize, unsigned long long totalFileSize) {
    // 开发者可以监听这个回调获取多媒体上传的进度
};

[[ZIM getInstance] sendMessage:videoMessage toConversationID:@"conversationID" conversationType:ZIMConversationTypePeer config:sendConfig notification:notification callback:^(ZIMMessage * _Nonnull message, ZIMError * _Nonnull errorInfo) {
        
}];
```
```objc title="文件"
// 发送多媒体消息示例 - 单聊 发送文件消息
ZIMFileMessage *fileMsg = [[ZIMFileMessage alloc] init];

//需填入 UTF-8 格式的本地路径
//此处以文件选择器选中的某个文件地址为例
fileMsg.fileLocalPath = @"/private/var/mobile/Containers/Shared/AppGroup/D5144D14-3FE8-4C6C-8527-01F368B8E49E/File Provider Storage/IMG_0131.HEIC";

//如果此处填入了网络 URL, SDK 会透传该路径，而不会经过 ZIM 后台服务处理， 同时填入网络 URL 与本地路径，SDK 会优先认为用户想要使用网路 URL
fileMsg.fileDownloadUrl = @"";


ZIMMessageSendConfig *sendConfig = [[ZIMMessageSendConfig alloc] init];
sendConfig.priority = ZIMMessagePriorityHigh;

ZIMMessageSendNotification *notification = [[ZIMMessageSendNotification alloc] init];
notification.onMessageAttached = ^(ZIMMessage * _Nonnull message) {
    // 开发者可以监听这个回调执行消息发送前的业务逻辑
};
        
notification.onMediaUploadingProgress = ^(ZIMMediaMessage * _Nonnull message, unsigned long long currentFileSize, unsigned long long totalFileSize) {
    // 开发者可以监听这个回调获取多媒体上传的进度
};

[[ZIM getInstance] sendMessage:fileMsg toConversationID:@"conversationID" conversationType:ZIMConversationTypePeer config:sendConfig notification:notification callback:^(ZIMMessage * _Nonnull message, ZIMError * _Nonnull errorInfo) {
        
}];
```
</CodeGroup>
:::

:::if{props.platform="win"}
<CodeGroup>
```cpp title="图片"
// 发送多媒体消息示例 - 单聊 发送图片消息
zim::ZIMMediaMessage *message = nullptr;
auto imageMessage = zim::ZIMImageMessage();

zim::ZIMMessageSendConfig sendConfig;
zim::ZIMPushConfig pushConfig;

// 离线推送标题，需要离线推送时，请填入该字段
pushConfig.title = "win_push_title";
// 离线推送内容，需要离线推送时，请填入该字段
pushConfig.content = "win_push_content";
// 离线推送附加字段，需要离线推送带上额外信息时，可酌情填入该字段
pushConfig.extendedData = "win_push_extended_data";

sendConfig.priority = zim::ZIM_MESSAGE_PRIORITY_MEDIUM;
// 需要离线推送时赋值；如不需要，可赋值为 nullptr
sendConfig.pushConfig = &pushConfig;

// 需填入 UTF-8 格式的本地路径
imageMessage.fileLocalPath = "D:\\image\\img.jpg";
// 如果此处填入了网络 URL，SDK 则会透传该路径，而不会经过 ZIM 后台服务处理。同时填入网络 URL 与本地路径，SDK 会优先认为用户想要使用网络 URL
imageMessage.fileDownloadUrl = "";
imageMessage.largeImageDownloadUrl = "";
imageMessage.thumbnailDownloadUrl = "";

message = &imageMessage;

auto notification = std::make_shared<zim::ZIMMessageSendNotification>(
            [=](/zim-web/guides/messaging/const-std::shared_ptr<zim::zimmessage>-&message) { 
                // 开发者可监听此回调，执行消息发送前的逻辑
            },
            [=](/zim-web/guides/messaging/const-std::shared_ptr<zim::zimmediamessage>-&message,-unsigned-long-long-currentfilesize,-unsigned-long-long-totalfilesize) { 
                // 开发者可监听此回调，获取资源上传的进度
            });

zim_->sendMessage(message, receiver_id, zim::ZIMConversationType::ZIM_CONVERSATION_TYPE_PEER,
    sendConfig,notification,
    [=](/zim-web/guides/messaging/const-std::shared_ptr<zim::zimmessage>-&message,-const-zim::zimerror-&errorinfo) {
        
    });
```
```cpp title="文件"
// 发送多媒体消息示例 - 单聊 发送文件消息
zim::ZIMMediaMessage *message = nullptr;
auto fileMessage = zim::ZIMFileMessage();

zim::ZIMMessageSendConfig sendConfig;
zim::ZIMPushConfig pushConfig;

// 离线推送标题，需要离线推送时，请填入该字段
pushConfig.title = "win_push_title";
// 离线推送内容，需要离线推送时，请填入该字段
pushConfig.content = "win_push_content";
// 离线推送附加字段，需要离线推送带上额外信息时，可酌情填入该字段
pushConfig.extendedData = "win_push_extended_data";

sendConfig.priority = zim::ZIM_MESSAGE_PRIORITY_MEDIUM;
// 需要离线推送时赋值；如不需要，可赋值为 nullptr
sendConfig.pushConfig = &pushConfig;

// 需填入 UTF-8 格式的本地路径
fileMessage.fileLocalPath = "D:\\file\\files.zip";
// 如果此处填入了网络 URL，SDK 则会透传该路径，而不会经过 ZIM 后台服务处理。同时填入网络 URL 与本地路径，SDK 会优先认为用户想要使用网络 URL
fileMessage.fileDownloadUrl = "";

message = &fileMessage;

auto notification = std::make_shared<zim::ZIMMessageSendNotification>(
            [=](/zim-web/guides/messaging/const-std::shared_ptr<zim::zimmessage>-&message) { 
                // 开发者可监听此回调，执行消息发送前的逻辑
            },
            [=](/zim-web/guides/messaging/const-std::shared_ptr<zim::zimmediamessage>-&message,-unsigned-long-long-currentfilesize,-unsigned-long-long-totalfilesize) { 
                // 开发者可监听此回调，获取资源上传的进度
            });

zim_->sendMessage(message, receiver_id, zim::ZIMConversationType::ZIM_CONVERSATION_TYPE_PEER,
    sendConfig,,notification,
    [=](/zim-web/guides/messaging/const-std::shared_ptr<zim::zimmessage>-&message,-const-zim::zimerror-&errorinfo) {
        auto media_message = std::static_pointer_cast<zim::ZIMFileMessage>(message);

        int code = errorInfo.code;
    });
```
```cpp title="音频"
// 发送多媒体消息示例 - 单聊 发送音频消息
zim::ZIMMediaMessage *message = nullptr;
auto audioMessage = zim::ZIMAudioMessage();

zim::ZIMMessageSendConfig sendConfig;
zim::ZIMPushConfig pushConfig;

// 离线推送标题，需要离线推送时，请填入该字段
pushConfig.title = "win_push_title";
// 离线推送内容，需要离线推送时，请填入该字段
pushConfig.content = "win_push_content";
// 离线推送附加字段，需要离线推送带上额外信息时，可酌情填入该字段
pushConfig.extendedData = "win_push_extended_data";

sendConfig.priority = zim::ZIM_MESSAGE_PRIORITY_MEDIUM;
// 需要离线推送时赋值；如不需要，可赋值为 nullptr
sendConfig.pushConfig = &pushConfig;

// 需填入 UTF-8 格式的本地路径
audioMessage.fileLocalPath = "D:\\audio\\audio.mp3";
// 如果此处填入了网络 URL，SDK 则会透传该路径，而不会经过 ZIM 后台服务处理。同时填入网络 URL 与本地路径，SDK 会优先认为用户想要使用网络 URL
audioMessage.fileDownloadUrl = "";
// 音频时长的单位为 秒
audioMessage.audioDuration = 15;

message = &audioMessage;

auto notification = std::make_shared<zim::ZIMMessageSendNotification>(
            [=](/zim-web/guides/messaging/const-std::shared_ptr<zim::zimmessage>-&message) { 
                // 开发者可监听此回调，执行消息发送前的逻辑
            },
            [=](/zim-web/guides/messaging/const-std::shared_ptr<zim::zimmediamessage>-&message,-unsigned-long-long-currentfilesize,-unsigned-long-long-totalfilesize) { 
                // 开发者可监听此回调，获取资源上传的进度
            });

zim_->sendMessage(message, receiver_id, zim::ZIMConversationType::ZIM_CONVERSATION_TYPE_PEER,
    sendConfig,notification ,
    [=](/zim-web/guides/messaging/const-std::shared_ptr<zim::zimmessage>-&message,-const-zim::zimerror-&errorinfo) {
        auto media_message = std::static_pointer_cast<zim::ZIMAudioMessage>(message);

        int code = errorInfo.code;
    });
```
```cpp title="视频"
// 发送多媒体消息示例 - 单聊 发送视频消息
zim::ZIMMediaMessage *message = nullptr;
auto videoMessage = zim::ZIMVideoMessage();

zim::ZIMMessageSendConfig sendConfig;
zim::ZIMPushConfig pushConfig;

// 离线推送标题，需要离线推送时，请填入该字段
pushConfig.title = "win_push_title";
// 离线推送内容，需要离线推送时，请填入该字段
pushConfig.content = "win_push_content";
// 离线推送附加字段，需要离线推送带上额外信息时，可酌情填入该字段
pushConfig.extendedData = "win_push_extended_data";

sendConfig.priority = zim::ZIM_MESSAGE_PRIORITY_MEDIUM;
// 需要离线推送时赋值；如不需要，可赋值为 nullptr
sendConfig.pushConfig = &pushConfig;

// 需填入 UTF-8 格式的本地路径
videoMessage.fileLocalPath = "D:\\file\\video.mp4";
// 如果此处填入了网络 URL，SDK 则会透传该路径，而不会经过 ZIM 后台服务处理。同时填入网络 URL 与本地路径，SDK 会优先认为用户想要使用网络 URL
videoMessage.fileDownloadUrl = "";
videoMessage.videoFirstFrameDownloadUrl = "";
// 视频时长的单位为 秒
videoMessage.videoDuration = 100;

message = &videoMessage;
auto notification = std::make_shared<zim::ZIMMessageSendNotification>(
            [=](/zim-web/guides/messaging/const-std::shared_ptr<zim::zimmessage>-&message) { 
                // 开发者可监听此回调，执行消息发送前的逻辑
            },
            [=](/zim-web/guides/messaging/const-std::shared_ptr<zim::zimmediamessage>-&message,-unsigned-long-long-currentfilesize,-unsigned-long-long-totalfilesize) { 
                // 开发者可监听此回调，获取资源上传的进度
            });

zim_->sendMessage(message, receiver_id, zim::ZIMConversationType::ZIM_CONVERSATION_TYPE_PEER,
    sendConfig,notification,
    [=](/zim-web/guides/messaging/const-std::shared_ptr<zim::zimmessage>-&message,-const-zim::zimerror-&errorinfo) {
        auto media_message = std::static_pointer_cast<zim::ZIMVideoMessage>(message);

        int code = errorInfo.code;
    });
```
</CodeGroup>
:::
:::if{props.platform="Web"}
<Accordion title="发送“本地文件”消息示例" defaultOpen="false">
```typescript
// 发送“本地文件”富媒体消息示例 - 单聊

const conversationID = 'xxxx';
const config: ZIMMessageSendConfig = { priority: 1 };
const notification: ZIMMessageSendNotification = {
    onMessageAttached: (message: ZIMMessage) => {
    
    },
    onMediaUploadingProgress: (message: ZIMMediaMessage, currentFileSize: number, totalFileSize: number) {
        // 开发者可以在这里展示上传进度
    }
};

function sendMessage(file: File) {
    /* 以下代码仅为示例：实际开发时请结合需求和文件类型，创建对应的 `媒体消息对象` */

    // 如果是 `图片` 消息
    let mediaMessageObj: ZIMMediaMessage = {
        fileLocalPath: file,
        type: 11,
    };
    // 如果是 `文件` 消息
    mediaMessageObj = {
        fileLocalPath: file,
        type: 12,
    };
    // 如果是 `音频` 消息
    mediaMessageObj = {
        fileLocalPath: file,
        type: 13,
        audioDuration: 100, // 请填写音频文件播放时长，单位秒（必填）
    };
    // 如果是 `视频` 消息
    mediaMessageObj = {
        fileLocalPath: file,
        type: 14,
        videoDuration: 100, // 请填写视频文件播放时长，单位秒（必填）
    };
  
    zim.sendMessage(mediaMessageObj, conversationID, 0, config, notification);  
}

const input = document.createElement('input');
input.type = 'file';
input.onchange = (ev) {
    sendMessage(ev.files[0]);
}
```
</Accordion>
:::
:::if{props.platform="miniprogram"}
<Accordion title="发送“本地文件”消息示例" defaultOpen="false">
```typescript
// 发送“本地文件”富媒体消息示例 - 单聊

const conversationID = 'xxxx';
const config: ZIMMessageSendConfig = { priority: 1 };
const notification: ZIMMessageSendNotification = {
    onMessageAttached: (message: ZIMMessage) => {

    },
    onMediaUploadingProgress: (message: ZIMMediaMessage, currentFileSize: number, totalFileSize: number) {
        // 您可以在这里展示上传进度
    }
};

function sendMessage(file: string) {
    /* 以下代码仅为示例：实际开发时请结合需求和文件类型，创建对应的 `媒体消息对象` */

    // 如果是 `图片` 消息
    let mediaMessageObj: ZIMMediaMessage = {
        fileLocalPath: file,
        type: 11,
    };
    // 如果是 `文件` 消息
    mediaMessageObj = {
        fileLocalPath: file,
        type: 12,
    };
    // 如果是 `音频` 消息
    mediaMessageObj = {
        fileLocalPath: file,
        type: 13,
        audioDuration: 100, // 请填写音频文件播放时长，单位秒（必填）
    };
    // 如果是 `视频` 消息
    mediaMessageObj = {
        fileLocalPath: file,
        type: 14,
        videoDuration: 100, // 请填写视频文件播放时长，单位秒（必填）
    };
  
    zim.sendMessage(mediaMessageObj, conversationID, 0, config, notification);  
}

// 拍摄或从手机相册中选择图片或视频
// 请参考小程序官方文档：https://developers.weixin.qq.com/miniprogram/dev/api/media/video/wx.chooseMedia.html
wx.chooseMedia({
    count: 1,
    success(res) {
        sendMessage(res.tempFiles[0].tempFilePath);
    }
})

// 从微信客户端会话选择文件
// 请参考小程序官方文档：https://developers.weixin.qq.com/miniprogram/dev/api/media/image/wx.chooseMessageFile.html
wx.chooseMessageFile({
    count: 1,
    success(res) {
        sendMessage(res.tempFiles[0].path);
    }
})
```
</Accordion>
:::
:::if{props.platform="rn|uniapp|UTS|harmonyos"}
<Accordion title="发送“本地文件”消息示例" defaultOpen="false">
```typescript
// 发送“本地文件”富媒体消息示例 - 单聊

const conversationID = 'xxxx';
const config: ZIMMessageSendConfig = { priority: 1 };
const notification: ZIMMessageSendNotification = {
    onMessageAttached: (message: ZIMMessage) => {
        
    },
    onMediaUploadingProgress: (message: ZIMMediaMessage, currentFileSize: number, totalFileSize: number) {
        // 您可以在这里展示上传进度
    }
};

function sendMessage(file: string) {
    /* 以下代码仅为示例：实际开发时请结合需求和文件类型，创建对应的 `媒体消息对象` */

    // 如果是 `图片` 消息
    let mediaMessageObj: ZIMMessage = {
        fileLocalPath: file,
        type: 11,
    };
    // 如果是 `文件` 消息
    mediaMessageObj = {
        fileLocalPath: file,
        type: 12,
    };
    // 如果是 `音频` 消息
    mediaMessageObj = {
        fileLocalPath: file,
        type: 13,
        audioDuration: 100, // 请填写音频文件播放时长，单位秒（必填）
    };
    // 如果是 `视频` 消息
    mediaMessageObj = {
        fileLocalPath: file,
        type: 14,
        videoDuration: 100, // 请填写视频文件播放时长，单位秒（必填）
    };
  
    zim.sendMessage(mediaMessageObj, conversationID, 0, config, notification);  
}

// Android 文件绝对路径 示例
const file = '/storage/emulated/0/Android/data/packagename/picture/xxx.jpg';
// iOS 文件绝对路径 示例  
const file = '/var/mobile/Containers/Data/Application/C142EFE6-9DEC-449D-89B7-BF99F2578F98/tmp/D1513E30-2641-440B-B897-48CD43BE1D04.jpeg';

// 注意：必须是文件的绝对路径，不能是 file://xxxx 等形式的字符串（某些跨平台框架提供的获取本地文件返回的文件路径）
sendMessage(file);
```
</Accordion>
:::
:::if{props.platform="Web|miniprogram|rn|uniapp|UTS|harmonyos"}
<Accordion title="发送“网络文件”消息示例" defaultOpen="false">
```typescript
// 发送“网络文件”富媒体消息示例 - 单聊
/* 发送网络文件消息时，ZIM SDK 仅透传相关字段到后台，ZIM 后台不会保存网络文件 */

const conversationID = 'xxxx';
const config: ZIMMessageSendConfig = { priority: 1 };
const notification: ZIMMessageSendNotification = {
    onMessageAttached: (message: ZIMMessage) => {}
};

/* 以下代码仅为示例：实际开发时请结合需求和文件类型，创建对应的 `媒体消息对象` */

// 如果是 `图片` 消息
let mediaMessageObj: ZIMMessage = {
    fileDownloadUrl: 'https://xxxx.jpeg', // 原图
    thumbnailDownloadUrl: 'https://xxxx-thumbnail.jpeg', // 缩略图
    largeImageDownloadUrl: 'https://xxxx-large.jpeg', // 大图
    type: 11,
};
// 如果是 `文件` 消息
mediaMessageObj = {
    fileDownloadUrl: 'https://xxxx.pdf',
    type: 12,
};
// 如果是 `音频` 消息
mediaMessageObj = {
    fileDownloadUrl: 'https://xxxx.mp3',
    type: 13,
    audioDuration: 100, // 请填写音频文件播放时长，单位秒（必填）
};
// 如果是 `视频` 消息
mediaMessageObj = {
    fileDownloadUrl: 'https://xxxx.mp4',
    videoFirstFrameDownloadUrl: 'https://xxxx-firstframe.jpeg', // 视频首帧图片
    type: 14,
    videoDuration: 100, // 请填写视频文件播放时长，单位秒（必填）
};
  
zim.sendMessage(mediaMessageObj, conversationID, 0, config, notification);
```
</Accordion>
:::
:::if{props.platform="Web"}
<Accordion title="发送“录制的音频文件”消息示例" defaultOpen="false">
```typescript
// 需要使用 HTTPS 协议
if (navigator.mediaDevices) {
    const chunks = [];

    navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then((stream) => {
            const duration = 10; // 录制时长，单位秒
            const mediaRecorder = new MediaRecorder(stream);

            mediaRecorder.onstop = (ev) => {
                // 录制结束后，发送音频消息
                const conversationID = 'xxxx';
                const config: ZIMMessageSendConfig = { priority: 1 };
                const notification: ZIMMessageSendNotification = {
                    onMessageAttached: (message: ZIMMessage) => {
                        
                    },
                    onMediaUploadingProgress: (message: ZIMMediaMessage, currentFileSize: number, totalFileSize: number) {
                        // 您可以在这里展示上传进度
                    }
                };

                const mediaMessageObj: ZIMAudioMessage = {
                    fileLocalPath: new File(chunks, '文件名xxxx.mp3'),
                    type: 13,
                    audioDuration: duration
                };
    
                zim.sendMessage(mediaMessageObj, conversationID, 0, config, notification)
                    .then((res: ZIMMessageSentResult) => {
                        // 发送成功
                    })
                    .catch((err: ZIMError) => {
                        // 发送失败
                    });

                // 重置 chunks  
                chunks = [];
            };

            mediaRecorder.ondataavailable = (ev) => {
                chunks.push(ev.data);
            };

            // 开始录制
            mediaRecorder.start();
            // 停止录制 
            setTimeout(() => mediaRecorder.stop(), duration * 1000);
        })
        .catch((err) => {
            console.log('The following error occured: ' + err);
        });
}
```
</Accordion>
:::

:::if{props.platform="flutter"}
<CodeGroup>
```dart title="图片"
// 发送多媒体消息示例 - 单聊 发送图片消息
ZIMImageMessage imageMessage = ZIMImageMessage('xxx/xxx.jpeg');
ZIMMessageSendConfig sendConfig = ZIMMessageSendConfig();
ZIMMessageSendNotification notification = ZIMMessageSendNotification(onMessageAttached: (message){
    // 开发者可以监听这个回调执行消息发送前的业务逻辑
},onMediaUploadingProgress: (message,currentFileSize,totalFileSize){
    // 开发者可以监听这个回调获取多媒体上传的进度
});
ZIM.getInstance()!.sendMessage(
    imageMessage,
    'toConversationID',
    ZIMConversationType.peer,
    sendConfig, notification).then((value) => {
        //成功触发此处
    }).catchError((onError){
        //失败触发此处
    });
```
```dart title="视频"
// 发送多媒体消息示例 - 单聊 发送视频消息
ZIMVideoMessage videoMessage = ZIMVideoMessage('xxx/xxx.mov');
ZIMMessageSendConfig sendConfig = ZIMMessageSendConfig();
ZIMMessageSendNotification notification = ZIMMessageSendNotification(onMessageAttached: (message){
    // 开发者可以监听这个回调执行消息发送前的业务逻辑
},onMediaUploadingProgress: (message,currentFileSize,totalFileSize){
    // 开发者可以监听这个回调获取多媒体上传的进度
});
ZIM
    .getInstance()
    !.sendMessage(
        videoMessage,
        'toConversationID',
        ZIMConversationType.peer,
        sendConfig, notification)
    .then((value) => {
        //成功触发此处
    })
    .catchError((onError) {
        //失败触发此处
    });
```
```dart title="音频"
// 发送多媒体消息示例 - 单聊 发送音频消息
ZIMAudioMessage audioMessage  = ZIMAudioMessage('xxx/xxx.mp3');
ZIMMessageSendConfig sendConfig = ZIMMessageSendConfig();
ZIMMessageSendNotification notification = ZIMMessageSendNotification(onMessageAttached: (message){
    // 开发者可以监听这个回调执行消息发送前的业务逻辑
},onMediaUploadingProgress: (message,currentFileSize,totalFileSize){
    // 开发者可以监听这个回调获取多媒体上传的进度
});
ZIM
    .getInstance()
    !.sendMessage(
        audioMessage,
        'toConversationID',
        ZIMConversationType.peer,
        ZIMMessageSendConfig(), notification)
    .then((value) => {
      //成功触发此处
  })
    .catchError((onError) {
      //失败触发此处
  });
```
```dart title="文件"
// 发送多媒体消息示例 - 单聊 发送文件消息
ZIMFileMessage fileMessage = ZIMFileMessage('xxx/xxx.txt');
ZIMMessageSendConfig sendConfig = ZIMMessageSendConfig();
ZIMMessageSendNotification notification = ZIMMessageSendNotification(onMessageAttached: (message){
    // 开发者可以监听这个回调执行消息发送前的业务逻辑
},onMediaUploadingProgress: (message,currentFileSize,totalFileSize){
    // 开发者可以监听这个回调获取多媒体上传的进度
});
ZIM
    .getInstance()
    !.sendMessage(
        fileMessage,
        'toConversationID',
        ZIMConversationType.peer,
        ZIMMessageSendConfig(), notification)
    .then((value) => {
        //成功触发此处
    })
    .catchError((onError) {
        //失败触发此处
    });
```
</CodeGroup>
:::

#### 富媒体文件消息的发送进度回调

开发者可以通过 {getPlatformData(props,onMediaUploadingProgressMap)} 回调，接收富媒体消息的上传发送进度的相关通知。

:::if{props.platform=undefined}
``` java
void onMediaUploadingProgress(ZIMMediaMessage message, long currentFileSize, long totalFileSize);
```
:::
:::if{props.platform="iOS|mac"}
``` objc
typedef void (^ZIMMediaUploadingProgress)(ZIMMediaMessage *message, unsigned long long currentFileSize, unsigned long long totalFileSize);
```
:::
:::if{props.platform="win"}
``` cpp
using ZIMMediaUploadingProgress = std::function<void(const std::shared_ptr<ZIMMediaMessage> &message, long long currentSize, long long totalSize)>;
```
:::
:::if{props.platform="Web|miniprogram|rn|uniapp|harmonyos"}
```typescript
type onMediaUploadingProgress = (message: ZIMMediaMessage, currentFileSize: number, totalFileSize: number) => void;
```
:::
:::if{props.platform="UTS"}
```typescript
type onMediaUploadingProgress = (message: ZIMMessage, currentFileSize: number, totalFileSize: number) => void;
```
:::
:::if{props.platform="flutter"}
``` dart
typedef ZIMMediaUploadingProgress = void Function(ZIMMediaMessage message, int currentFileSize, int totalFileSize);
```
:::

其中：
- message：正在发送消息的内容。
- currentFileSize：当前已被发送的消息大小。
- totalFileSize：发送消息的总体大小。

### 接收富媒体消息

接收方用户登录成功后，根据会话类型（单聊、房间、群组）的相关回调监听（ {getPlatformData(props,peerMessageReceivedMap)} 、 {getPlatformData(props,roomMessageReceivedMap)} 、 {getPlatformData(props,groupMessageReceivedMap)} ），接收富媒体消息的相关通知，然后可以直接获取富媒体消息的相关 URL 属性。

:::if{props.platform="undefined|iOS|mac|win|rn|uniapp|UTS|flutter|harmonyos"}
如需下载富媒体消息到本地，可调用 {getPlatformData(props,downloadMediaFileMap)} 接口。

下载富媒体消息时，需要指定对应的媒体消息的文件类型。

<div>
- 图片消息：可以选择下载原始文件、大图、缩略图。
- 文件/音频消息：仅能选择下载文件/音频的原始文件。
- 视频消息：可以选择下载视频原始文件、视频首帧的缩略图。
</div>
:::

:::if{props.platform=undefined}
``` java
// 接收富媒体消息示例 - 单聊 接收富媒体消息
@Override
public void onPeerMessageReceived(ZIM zim, ArrayList<ZIMMessage> messageList, ZIMMessageReceivedInfo info, String fromUserID) {
    super.onPeerMessageReceived(zim, messageList, info, fromUserID);
    
    ZIMMediaDownloadConfig config = new ZIMMediaDownloadConfig();

    for (ZIMMessage message : messageList) {
        // 收到消息时，可通过消息的 Type 进行判断接收到何种类型的消息
        if (message.getType() == ZIMMessageType.IMAGE) {
            // 获取图片消息
            ZIMImageMessage imageMessage = (ZIMImageMessage) message;
            zim.downloadMediaFile(imageMessage, ZIMMediaFileType.ORIGINAL_FILE, config, new ZIMMediaDownloadedCallback() {

                @Override
                public void onMediaDownloaded(ZIMMessage message, ZIMError errorInfo) {
                    // 下载完成回调
                }

                @Override
                public void onMediaDownloadingProgress(ZIMMessage message, long currentFileSize, long totalFileSize) {
                    // 下载进度回调
                }
            });
        } else if (message.getType() == ZIMMessageType.VIDEO) {
            // 获取视频消息
            ZIMVideoMessage videoMessage = (ZIMVideoMessage) message;
        } else if (message.getType() == ZIMMessageType.AUDIO) {
            // 获取音频消息
            ZIMAudioMessage audioMessage = (ZIMAudioMessage) message;
        } else if (message.getType() == ZIMMessageType.FILE) {
            // 获取文件消息
            ZIMFileMessage fileMessage = (ZIMFileMessage) message;
        }
    }
}
```
:::
:::if{props.platform="iOS|mac"}
```objc
// 接收多媒体消息示例 - 单聊 接收图片消息
- (void)peerMessageReceived:(NSArray<ZIMMessage *> *)messageList
                info:(ZIMMessageReceivedInfo *)info
                fromUserID:(NSString *)fromUserID{
    
    ZIMMediaDownloadConfig *config = [[ZIMMediaDownloadConfig alloc] init];

    for (ZIMMessage *msg in reverseMsgList) {

        // 收到消息时，可通过消息的 Type 进行判断接收到何种类型的消息
        switch (msg.type) {
            case ZIMMessageTypeImage:{
                ZIMImageMessage *imageMsg = (ZIMImageMessage *)msg;
                [[ZIM getInstance] downloadMediaFileWithMessage:imageMsg fileType:ZIMMediaFileTypeOriginalFile config:config
                    progress:^(ZIMMessage * _Nonnull message, unsigned long long currentFileSize, unsigned long long totalFileSize) {
                            
                            } callback:^(ZIMMessage * _Nonnull message, ZIMError * _Nonnull errorInfo) {
                                
                }];
                break;
            }
            case ZIMMessageTypeVideo:{
                ZIMVideoMessage *videoMsg = (ZIMVideoMessage *)msg;
                break;
            }
            case ZIMMessageTypeAudio:{
                ZIMAudioMessage *audioMsg = (ZIMAudioMessage *)msg;
                break;
            }
            case ZIMMessageTypeFile:{
                ZIMFileMessage *fileMsg = (ZIMFileMessage *)msg;
                break;
            }
            default:
                break;
        }
        
    }
}
```
:::
:::if{props.platform="win"}
``` cpp
// 接收富媒体消息示例 - 单聊
void onPeerMessageReceived(
    zim::ZIM *zim, const std::vector<std::shared_ptr<zim::ZIMMessage>> &messageList,
    const ZIMMessageReceivedInfo &info,
    const std::string &fromUserID) {
    
    zim::ZIMMediaDownloadConfig download_config;

    for (auto &it : messageList) {
        // 收到消息时，可通过消息的 Type 进行判断接收到何种类型的消息
        if (it->getType() == zim::ZIMMessageType::ZIM_MESSAGE_TYPE_IMAGE) {
            // Image message type
            auto image_message = std::dynamic_pointer_cast<zim::ZIMImageMessage>(it);

            // 下载原图示例如下，如果想下载其他类型，可以换用其他 ZIMMediaFileType
            zim_->downloadMediaFile(
                image_message.get(),
                zim::ZIMMediaFileType::ZIM_MEDIA_FILE_TYPE_ORIGINAL_FILE,
                download_config,
                [=](/zim-web/guides/messaging/const-std::shared_ptr<zim::zimmessage>-&message,-unsigned-int-currentsize,-unsigned-int-totalsize) {

                },
                [=](/zim-web/guides/messaging/const-std::shared_ptr<zim::zimmessage>-&message,-const-zim::zimerror-&errorinfo) {

                });
            ...
        } else if (it->getType() == zim::ZIMMessageType::ZIM_MESSAGE_TYPE_FILE) {
            //  文件消息
            auto media_message = std::dynamic_pointer_cast<zim::ZIMFileMessage>(it);
            ...
        } else if (it->getType() == zim::ZIMMessageType::ZIM_MESSAGE_TYPE_AUDIO) {
            // 音频消息
            auto media_message = std::dynamic_pointer_cast<zim::ZIMAudioMessage>(it);
            ...
        } else if (it->getType() == zim::ZIMMessageType::ZIM_MESSAGE_TYPE_VIDEO) {
            // 视频消息
            auto media_message = std::dynamic_pointer_cast<zim::ZIMVideoMessage>(it);
            ...
        }
    }

}
```
:::

:::if{props.platform="rn|uniapp|harmonyos"}
```typescript
const config: ZIMMediaDownloadConfig = {messageInfoIndex: 0};
zim.on('peerMessageReceived', (zim, data) => {
    data.messageList.forEach((msg) => {
        if (msg.type == 11) {
            zim.downloadMediaFile(msg, 1, config, (_msg, currentFileSize, totalFileSize) => {});
        }
    });
});
``` 
:::
:::if{props.platform="UTS"}
```typescript
const config: ZIMMediaDownloadConfig = {messageInfoIndex: 0};
zim.onPeerMessageReceived((data) => {
    data.messageList.forEach((msg) => {
        if (msg.type == 11) {
            zim.downloadMediaFile(msg, 1, config, (_msg, currentFileSize, totalFileSize) => {});
        }
    });
});
``` 
:::
:::if{props.platform="flutter"}
``` dart
// 接收多媒体消息示例 - 单聊 接收图片消息
ZIMEventHandler.onPeerMessageReceived = (zim, messageList, info, fromUserID) {
    //收到单聊消息触发此处
    for (ZIMMessage message in messageList) {
        // 收到消息时，可通过消息的 Type 进行判断接收到何种类型的消息
        switch (message.type) {
            case ZIMMessageType.image:
                message as ZIMImageMessage;
                break;
            case ZIMMessageType.video:
                message as ZIMVideoMessage;
                break;
            case ZIMMessageType.audio:
                message as ZIMAudioMessage;
                break;
            case ZIMMessageType.File:
                message as ZIMFileMessage;
                break;
            default:
        }
    }
};
```
:::

:::if{props.platform="undefined|iOS|mac|win|rn|uniapp|UTS|harmonyos|flutter"}
#### 富媒体文件消息的下载进度回调

开发者可以通过 {getPlatformData2(props,onMediaDownloadingProgressMap)} 回调，接收富媒体消息的下载进度的相关通知。

:::

:::if{props.platform=undefined}
``` java
void onMediaDownloadingProgress(ZIMMessage message, long currentFileSize, long totalFileSize);
```
:::
:::if{props.platform="iOS|mac"}
``` objc
typedef void (^ZIMMediaDownloadingProgress)(ZIMMessage *message, unsigned long long currentFileSize, unsigned long long totalFileSize);
```
:::
:::if{props.platform="win"}
``` cpp
using ZIMMediaDownloadingProgress = std::function<void(const std::shared_ptr<ZIMMessage> &message, unsigned int currentSize, unsigned int totalSize)>;
```
:::

  :::if{props.platform="rn|uniapp|UTS|harmonyos"}
```typescript
type ZIMMediaDownloadingProgress = (message: ZIMMessage, currentFileSize: number, totalFileSize: number) => void;
```
:::
:::if{props.platform="flutter"}
``` dart
typedef ZIMMediaDownloadingProgress = void Function(ZIMMessage message, int currentFileSize, int totalFileSize);
```
:::

:::if{props.platform="undefined|iOS|mac|win|rn|uniapp|UTS|harmonyos|flutter"}

其中：
<div>
- message：正在下载的消息内容。
- currentFileSize：当前已被下载的消息大小。
- totalFileSize：下载消息的总体大小。
</div>
:::


## 收发信令消息

ZIM SDK 支持开发者实现信令类型的消息收发，开发者可以通过 {getPlatformData(props,ZIMCommandMessageMap)} 对象定义自己的消息类型，例如位置消息等。

<Note title="说明">

信令消息不支持离线推送和本地存储。
</Note>


以下以**向指定用户发送信令消息**为例。

### 发送信令消息
:::if{props.platform=undefined}
```java
//向指定用户发送信令消息

String userID = "xxxx";

ZIMCommandMessage zimCustomMessage = new ZIMCommandMessage();
zimCustomMessage.message = new byte[]{0x1,0x2,0x1,0x2};

ZIMMessageSendConfig config = new ZIMMessageSendConfig();
// 设置消息优先级
config.priority = ZIMMessagePriority.LOW;
// 设置消息的离线推送配置
// 不支持设置房间消息的离线推送配置，如果需要发送房间离线消息，请联系 ZEGO 技术支持开通相关权限
ZIMPushConfig pushConfig = new ZIMPushConfig();
pushConfig.title = "离线推送的标题";
pushConfig.content= "离线推送的内容";
pushConfig.extendedData = "离线推送的扩展信息";
config.pushConfig = pushConfig;

// 发送单聊信息
ZIMConversationType type = ZIMConversationType.Peer;

// 发送群聊信息
// ZIMConversationType type = ZIMConversationType.Gourp;

// 发送房间信息
// ZIMConversationType type = ZIMConversationType.Room;

zim.sendMessage(zimCustomMessage, toConversationID, type, config, new ZIMMessageSentFullCallback() {
    @Override
    public void onMessageAttached(ZIMMessage zimMessage) {
        // 开发者可以通过该回调，监听消息是否开始准备发送。只有当通过本地基础参数检验的消息才会抛出该回调，否则通过 onMessageSent 回调抛出错误。               
    }

    @Override
    public void onMessageSent(ZIMMessage zimMessage, ZIMError error) {
        // 开发者可以通过该回调监听消息是否发送成功。
    }
});

```
:::
:::if{props.platform="iOS|mac"}
```objc
//向指定用户发送信令消息
NSData *anyData = [[NSData alloc] init];
NSString *toUserID = @"toUserID";
ZIMCommandMessage * cmdMsg = [[ZIMCommandMessage alloc] initWithMessage:anyData];
ZIMMessageSendConfig *sendConfig = [[ZIMMessageSendConfig alloc] init];
sendConfig.priority = ZIMMessagePriorityMedium;

[self.zim sendMessage:cmdMsg toUserID:toUserID conversationType:type config:config notification:notification callback:^((ZIMMessage * _Nonnull message, ZIMError * _Nonnull errorInfo)) {
    // 开发者可以通过该回调监听消息是否发送成功。
}];
```
:::
:::if{props.platform="win"}
```cpp
// 向指定用户发送信令消息
zim::ZIMMessage *message = nullptr;
zim::ZIMCommandMessage commandMessage;

zim::ZIMMessageSendConfig sendConfig;
zim::ZIMPushConfig pushConfig;

pushConfig.content = "win_push_content";
pushConfig.extendedData = "win_push_extended_data";
pushConfig.title = "win_push_title";

sendConfig.priority = zim::ZIM_MESSAGE_PRIORITY_MEDIUM;
sendConfig.pushConfig = &pushConfig;

std::vector<uint8_t> uint8Message;
uint8Message.assign(strMessage.begin(), strMessage.end());
commandMessage.message = uint8Message;

message = &commandMessage;

// 发送单聊信息 
zim::ZIMConversationType type = zim::ZIMConversationType::ZIM_CONVERSATION_TYPE_PEER

// 发送群聊信息
// zim::ZIMConversationType type = zim::ZIMConversationType::ZIM_CONVERSATION_TYPE_GROUP

// 发送房间信息
// zim::ZIMConversationType type = zim::ZIMConversationType::ZIM_CONVERSATION_TYPE_ROOM

auto notification = std::make_shared<zim::ZIMMessageSendNotification>(
            [=](/zim-web/guides/messaging/const-std::shared_ptr<zim::zimmessage>-&message) { int i = 0; });

// 发送消息
zim_->sendMessage(message, "toConversationID", type, config, notification,
                    [=](/zim-web/guides/messaging/const-std::shared_ptr<zim::zimmessage>-&message,-const-zim::zimerror-&errorinfo) { int i = 0; });
```
:::

:::if{props.platform="Web|miniprogram|rn|uniapp|harmonyos"}
```typescript
// 发送单聊 `Command` 信息

const toConversationID = ''; // 对方 userID
const conversationType = 0; // 会话类型，取值为 单聊：0，房间：1，群组：2
const config: ZIMMessageSendConfig = { 
    priority: 1, // 设置消息优先级，取值为 低：1（默认），中：2，高：3
};

const notification: ZIMMessageSendNotification = {
    onMessageAttached: (message: ZIMMessage) => {}
}

// 这里以 JSON 字符串 为例，需要将字符串转换为 Uint8Array
// peerMessageReceived 收到 type 为 2 的 Command 消息时，需要将 Uint8Array 转换为 JSON 字符串
const jsonText = JSON.stringify({ id: '111', name: '张三' });
const uint8Array = new Uint8Array(Array.from(unescape(encodeURIComponent(jsonText))).map((val) => val.charCodeAt(0)));

const messageCommandObj: ZIMMessage = { type: 2, message: uint8Array };

zim.sendMessage(messageCommandObj, toConversationID, conversationType, config, notification)
    .then((res: ZIMMessageSentResult) => {
        // 发送成功
    })
    .catch((err: ZIMError) => {
        // 发送失败
    });
```
:::
:::if{props.platform="UTS"}
```typescript
// 发送单聊 `Command` 信息

const toConversationID = ''; // 对方 userID
const conversationType = 0; // 会话类型，取值为 单聊：0，房间：1，群组：2
const config: ZIMMessageSendConfig = { 
    priority: 1, // 设置消息优先级，取值为 低：1（默认），中：2，高：3
};

const notification: ZIMMessageSendNotification = {
    onMessageAttached: (message: ZIMMessage) => {}
}

const messageCommandObj: ZIMMessage = { type: 2, message: [1, 2, 128, 255] };

zim.sendMessage(messageCommandObj, toConversationID, conversationType, config, notification)
    .then((res: ZIMMessageSentResult) => {
        // 发送成功
    })
    .catch((err: ZIMError) => {
        // 发送失败
    });
```
:::
:::if{props.platform="flutter"}
```dart
// 向指定用户发送信令消息
Uint8List cmdMessage = Uint8List.fromList([1, 2, 3]);
ZIMCommandMessage commandMessage = ZIMCommandMessage(message: cmdMessage);
ZIMMessageSendConfig sendConfig = ZIMMessageSendConfig();
ZIM.getInstance()!.sendMessage(cmdMsg, 'toUserID', ZIMConversationType.peer, sendConfig)
    .then((value) => {
        //成功触发此处
    })
    .catchError((onError) {
        //失败触发此处
    });
```
:::


### 接收信令消息

:::if{props.platform=undefined}
```java
//用户接收信令消息
zim.setEventHandler(new ZIMEventHandler() {
    @Override
    public void onPeerMessageReceived(ZIM zim, ArrayList<ZIMMessage> messageList, ZIMMessageReceivedInfo info, String fromUserID) {
        // 收到“单聊”通信的消息回调
        for (ZIMMessage zimMessage : messageList) {
            if (zimMessage instanceof ZIMCommandMessage) {
                ZIMCommandMessage zimCommandMessage = (ZIMCommandMessage) zimMessage;
                
           }    
        }
    }
});
```
:::
:::if{props.platform="iOS|mac"}
```objc
//用户接收信令消息
- (void)zim:(ZIM *)zim peerMessageReceived:(NSArray<ZIMMessage *> *)messageList info:(ZIMMessageReceivedInfo *)info fromUserID:(NSString *)fromUserID {
    if (zim != self.zim) {
        return;
    }
    for (ZIMMessage *msg in messageList) {
        if(msg.type == ZIMMessageTypeCommand){
            ZIMCommandMessage *cmdMsg = (ZIMCommandMessage *)msg;
            NSData *receivedData = cmdMsg.message;
        }
    }
}
```
:::
:::if{props.platform="win"}
```cpp
//用户接收信令消息
void onPeerMessageReceived(zim::ZIM *zim, const std::vector<std::shared_ptr<zim::ZIMMessage>> &messageList,
    const ZIMMessageReceivedInfo &info, const std::string &fromUserID) {
    for (auto &it : message_list) {
        if (it->getType() == zim::ZIM_MESSAGE_TYPE_COMMAND) {
            auto commandMessage = std::dynamic_pointer_cast<zim::ZIMCommandMessage>(it);
            
        }
    }
}
```
:::
:::if{props.platform="Web|miniprogram|rn|uniapp|harmonyos"}
```typescript
// 用户接收信令消息
zim.on('peerMessageReceived', (zim, data) => {
    data.messageList.forEach((msg) => {
        // 收到 `Command` 消息时，这里以 JSON 字符串 为例，将 Uint8Array 消息内容转为 JSON 字符串
        if (msg.type == 2) {
            const uint8Array = msg.message;
            const jsonText = decodeURIComponent(escape(String.fromCharCode(...Array.from(uint8Array))));
            const jsonObj = JSON.parse(jsonText);
            console.log('peerMessageReceived', jsonObj);
        }
    })
});
```
:::
:::if{props.platform="UTS"}
```typescript
// 用户接收信令消息
zim.onPeerMessageReceived((data) => {
    data.messageList.forEach((msg) => {
        // 收到 `Command` 消息时
        if (msg.type == 2) {
            const byteArray = msg.message;
            console.log('peerMessageReceived', byteArray);
        }
    })
});
```
:::
:::if{props.platform="flutter"}
```dart
// 用户接收信令消息
ZIMEventHandler.onPeerMessageReceived = (zim, messageList, info, fromUserID) {
    //收到单聊消息触发此处
    for (ZIMMessage message in messageList) {
        switch (message.type) {
            case ZIMMessageType.command:
                message as ZIMCommandMessage;
                break;
            default:
        }
    }
};
```
:::

## 收发自定义消息

ZIM SDK 支持开发者实现自定义类型的消息收发，开发者可以通过 {getPlatformData(props,ZIMCustomMessageMap)} 对象自行定义消息类型，例如投票类型、接龙类型、视频卡片类型等。开发者可以通过以下步骤实现自定义消息的收发。

<Note title="说明">

- 仅 2.8.0 及以上版本的 ZIM SDK 支持发送自定义类型消息，接收并查看自定义类型消息的内容。
- 如果接收端的 SDK 版本介乎 [2.0.0, 2.8.0) 区间，可以收到自定义消息时，但会显示此消息类型为未知，且无法获取信息内容。如需获取此条消息，请将 SDK 升级为 2.8.0 或以上版本。
- 如果接收端的 SDK 版本为 1.x.x 版本，则无法收到自定义消息，也不会收到未知消息。
</Note>

### 发送自定义消息

发送自定义消息使用的接口为 {getPlatformData(props,sendMessageMap)} ，与发送普通消息所用接口相同，开发者可参考 [收发普通消息 - 发送消息](#发送消息) 了解此接口参数详情。

开发者需要通过 {getPlatformData(props,ZIMCustomMessageMap)} 对象定义自定义类型消息，包括以下参数：

以下为用户在单聊会话中发送自定义消息的示例代码：

:::if{props.platform=undefined}
```java
// 在单聊会话中向指定用户发送自定义消息

String userID = "xxxx";

// 自定义消息的文本内容
String message = "";

// 具体的自定义类型
int subType = 100; 

// 自定义消息的检索字段。
String searchedContent = "";

ZIMCustomMessage zimCustomMessage = new ZIMCustomMessage(message,subType);

// 发送消息的高级属性配置
ZIMMessageSendConfig config = new ZIMMessageSendConfig();
// 设置消息优先级
config.priority = ZIMMessagePriority.LOW;

ZIMConversationType type = ZIMConversationType.Peer;

zim.sendMessage(zimCustomMessage, userID, type, config, new ZIMMessageSentFullCallback() {
    @Override
    public void onMessageAttached(ZIMMessage zimMessage) {
        // 开发者可以通过该回调，监听消息是否开始准备发送。只有当通过本地基础参数检验的消息才会抛出该回调，否则通过 onMessageSent 回调抛出错误。               
    }

    @Override
    public void onMessageSent(ZIMMessage zimMessage, ZIMError error) {
        // 开发者可以通过该回调监听消息是否发送成功。
    }
});
```
:::

:::if{props.platform="iOS|mac"}
```objc
// 向指定用户发送自定义消息
NSString *message = @"message";
NSString *toUserID = @"toUserID";
ZIMCustomMessage * customMessage = [[ZIMCustomMessage alloc] init];
customMessage.message = message;
customMessage.subType = 1; // 开发者自定义的类型
customMessage.searchContent="";
ZIMMessageSendConfig *sendConfig = [[ZIMMessageSendConfig alloc] init];
sendConfig.priority = ZIMMessagePriorityMedium;

[self.zim sendMessage:customMessage toUserID:toUserID conversationType: ZIMConversationTypePeer config:config notification:notification callback:^((ZIMMessage * _Nonnull message, ZIMError * _Nonnull errorInfo)) {
    // 开发者可以通过该回调监听消息是否发送成功。
}];
```
:::
:::if{props.platform="win"}
```cpp
// 向指定用户发送自定义消息
zim::ZIMMessage *message = nullptr;
zim::ZIMCustomMessage customMessage;

zim::ZIMMessageSendConfig sendConfig;
zim::ZIMPushConfig pushConfig;

pushConfig.content = "win_push_content";
pushConfig.extendedData = "win_push_extended_data";
pushConfig.title = "win_push_title";

sendConfig.priority = zim::ZIM_MESSAGE_PRIORITY_MEDIUM;
sendConfig.pushConfig = &pushConfig;

std::string message = "message";
unsigned int subType = 1;
std::string searchedContent = "searchedContent";

customMessage.message = message;
customMessage.subType = subType;
customMessage.searchedContent = searchedContent;

message = &customMessage;

zim::ZIMConversationType type = zim::ZIMConversationType::ZIM_CONVERSATION_TYPE_PEER

auto notification = std::make_shared<zim::ZIMMessageSendNotification>(
            [=](/zim-web/guides/messaging/const-std::shared_ptr<zim::zimmessage>-&message) { int i = 0; });

zim_->sendMessage(message, "toConversationID", type, config, notification,
                    [=](/zim-web/guides/messaging/const-std::shared_ptr<zim::zimmessage>-&message,-const-zim::zimerror-&errorinfo) { int i = 0; });
```
:::

:::if{props.platform="Web|miniprogram|rn|uniapp|UTS|harmonyos"}
```typescript
// 发送自定义信息

// 指定用户的 ID
const toConversationID = "xxxx";
const conversationType = 0; // 会话类型，取值为 单聊：0，房间：1，群组：2
// 发送消息的高级属性配置
const config: ZIMMessageSendConfig = { 
    priority: 1, // 设置消息优先级，取值为 低：1（默认），中：2，高：3
};

const notification: ZIMMessageSendNotification = {
    onMessageAttached: (message: ZIMMessage) => {}
}

const zimCustomMessage: ZIMMessage = {
    type: 200,
    message: 'xxxx', // 自定义消息的文本内容
    subType: 100, // 具体的自定义类型
    searchedContent: 'xxxx' // 自定义消息的检索字段
};

zim.sendMessage(zimCustomMessage, toConversationID, conversationType, config, notification)
    .then((res: ZIMMessageSentResult) => {
        // 发送成功
    })
    .catch((err: ZIMError) => {
        // 发送失败
    });
```
:::
:::if{props.platform="flutter"}
```dart
// 在单聊会话中向指定用户发送自定义消息

// 指定用户的 ID
String userID = "xxxx";

// 自定义消息的文本内容
String message = "";

// 具体的自定义类型
int subType = 100; 

// 自定义消息的检索字段。
String searchedContent = "";

ZIMCustomMessage zimCustomMessage = ZIMCustomMessage(message, subType);

// 发送消息的高级属性配置
ZIMMessageSendConfig config = ZIMMessageSendConfig();
// 设置消息优先级
config.priority = ZIMMessagePriority.low;

ZIMConversationType type = ZIMConversationType.Peer;

ZIM.getInstance().sendMessage(zimCustomMessage, userID, type, config, ZIMMessageSendNotification(onMessageAttached: (ZIMMessage message){
    // 开发者可以通过该回调，监听消息是否开始准备发送。只有当通过本地基础参数检验的消息才会抛出该回调，否则通过 onMessageSent 回调抛出错误。
  })).then((value) {
    // 发送成功回调
  }).catchError((onError){
    // 处理失败
  });
```
:::

### 接收自定义消息

接收自定义消息的回调接口与接收普通消息的回调接口一致，请参考 [收发普通消息 - 接收消息](#接收消息) 了解具体接口。

以下为用户在单聊会话中接收自定义消息的示例代码：

:::if{props.platform=undefined}
```java
// 用户在单聊会话中接收自定义消息
zim.setEventHandler(new ZIMEventHandler() {
    @Override
    public void onPeerMessageReceived(ZIM zim, ArrayList<ZIMMessage> messageList, ZIMMessageReceivedInfo info, String fromUserID) {
        // 收到“单聊”消息的回调
        for (ZIMMessage zimMessage : messageList) {
            if (zimMessage instanceof ZIMCustomMessage) {
                ZIMCustomMessage zimCustomMessage = (ZIMCustomMessage) zimMessage;
                
           }    
        }
    }
});
```

:::
:::if{props.platform="iOS|mac"}
```objc
// 用户在单聊会话中接收自定义消息
- (void)zim:(ZIM *)zim peerMessageReceived:(NSArray<ZIMMessage *> *)messageList info:(ZIMMessageReceivedInfo *)info fromUserID:(NSString *)fromUserID {
    if (zim != self.zim) {
        return;
    }
    for (ZIMMessage *msg in messageList) {
        if(msg.type == ZIMMessageTypeCustom){
            // 这里表示接收到自定义消息
        }
    }
}
```
:::
:::if{props.platform="win"}
```cpp
//用户接收自定义消息
void onPeerMessageReceived(zim::ZIM *zim, const std::vector<std::shared_ptr<zim::ZIMMessage>> &messageList,
    const ZIMMessageReceivedInfo &info, const std::string &fromUserID) {
    for (auto &it : message_list) {
        if (it->getType() == zim::ZIM_MESSAGE_TYPE_CUSTOM) {
            auto customMessage = std::dynamic_pointer_cast<zim::ZIMCustomMessage>(it);
        }
    }
}
```
:::

:::if{props.platform="Web|miniprogram|rn|uniapp|harmonyos"}
```typescript
// 用户在单聊会话中接收自定义消息
zim.on('peerMessageReceived', (zim, data) => {
    data.messageList.forEach((msg) => {
        // 收到 `Custom` 消息时
        if (msg.type == 200) {
        }
    })
});
```
:::
:::if{props.platform="UTS"}
```typescript
// 用户在单聊会话中接收自定义消息
zim.onPeerMessageReceived((data) => {
    data.messageList.forEach((msg) => {
        // 收到 `Custom` 消息时
        if (msg.type == 200) {
        }
    })
});
```
:::
:::if{props.platform="flutter"}
```dart
// 用户在单聊会话中接收自定义消息
ZIMEventHandler.onPeerMessageReceived = (zim, messageList, info, fromUserID) {
    for (ZIMMessage message in messageList) {
        if(message is ZIMCustomMessage){
        
        }
    }
};
```
:::
:::if{props.platform="undefined|iOS|mac|win|flutter|Web|miniprogram|rn|UTS|harmonyos"}
## 收发组合消息

ZIM SDK 支持开发者实现组合类型的消息收发，开发者可以通过 {getPlatformData(props,ZIMMultipleMessageMap)} 对象组合多种消息类型，例如图文类型等。
<Note title="说明">
- 仅 2.19.0 及以上版本的 ZIM SDK 支持发送组合类型消息，接收并查看组合类型消息的内容。
- 如果接收端的 SDK 版本介乎 [2.0.0, 2.19.0) 区间，可以收到组合消息时，但会显示此消息类型为未知，且无法获取信息内容。如需获取此条消息，请将 SDK 升级为 2.19.0 或以上版本。
- 如果接收端的 SDK 版本为 1.x.x 版本，则无法收到组合消息，也不会收到未知消息。
</Note>

<Frame width="60%" height="auto" >
  <img src="https://media-resource.spreading.io/docuo/workspace564/27e54a759d23575969552654cb45bf89/22bdff3b4b.png" alt="ZIMMultipleMessage_zh.png"/>
</Frame>
:::
:::if{props.platform="undefined|iOS|mac|win|flutter|Web|miniprogram|rn|UTS|harmonyos"}
### 发送组合消息

用户登录成功后，通过 {getPlatformData(props,ZIMMultipleMessageMap)} 对象组合多种消息类型（文本、图片、音频、视频、文件和自定义文本等），调用 {getPlatformData(props,sendMessageMap)} 接口向单聊、房间或群聊会话发送该消息。

您可以通过 {getPlatformData(props,multipleMediaUploadingProgressMap)} 回调，接收组合消息中富媒体文件的上传进度的相关通知。在此回调中，您可以了解到以下字段：
<div>
- currentFileSize：已上传文件总大小，单位为 Byte。
- totalFileSize：组合消息中多媒体文件的总大小，，单位为 Byte。
- messageInfoIndex：接收到此回调时，当前正在上传的文件在 {getPlatformData(props,ZIMMultipleMessageMap)} 数组的索引。
- currentIndexFileSize： 接收到此回调时，当前正在上传的文件的已上传大小，单位为 Byte。
- totalIndexFileSize：接收到此回调时，当前正在上传的文件的实际大小，单位为 Byte。
</div>

上述字段可用于计算多媒体文件的总上传进度、以及当前文档的上传进度：
<div>
- 总上传进度 = currentFileSize / totalFileSize。
- 当前文件上传进度 = currentIndexFileSize / totalIndexFileSize。
</div>

以下为用户在单聊会话中发送组合消息的示例代码：
:::
:::if{props.platform=undefined}
```java
// 在单聊会话中向指定用户发送组合消息

String userID = "xxxx";

// 组合消息 Item 列表，最多只可以包含 20 个 Item
ArrayList<ZIMMessageLiteInfo> messageInfoList = new ArrayList();

// 文本
ZIMTextMessageLiteInfo textMsgInfo= new ZIMTextMessageLiteInfo();
textMsgInfo.message = "消息内容";
messageInfoList.add(textMsgInfo);

// 自定义消息：最多支持 1 个
ZIMCustomMessageLiteInfo customMsgInfo= new ZIMCustomMessageLiteInfo();
customMsgInfo.message = "消息内容";
customMsgInfo.searchedContent = "搜索内容";
customMsgInfo.subType = 100;
messageInfoList.add(customMsgInfo);

// 图片：最多支持 10 个
// 网络图片示例
ZIMImageMessageLiteInfo imageMsgInfo= new ZIMImageMessageLiteInfo();
imageMsgInfo.fileDownloadUrl = "https://xxxx.jpeg"; // 原图
imageMsgInfo.thumbnailDownloadUrl = "https://xxxx-thumbnail.jpeg"; // 缩略图
imageMsgInfo.largeImageDownloadUrl = "https://xxxx-large.jpeg"; // 大图
messageInfoList.add(imageMsgInfo);

// 本地图片示例
ZIMImageMessageLiteInfo localImageMsgInfo= new ZIMImageMessageLiteInfo();
localImageMsgInfo.fileLocalPath = "/storage/emulated/0/Android/data/packagename/xxx.jpg"; // 图片的绝对路径
messageInfoList.add(localImageMsgInfo);

// 文件：最多支持 1 个
ZIMFileMessageLiteInfo localFileMsgInfo= new ZIMFileMessageLiteInfo();
localFileMsgInfo.fileLocalPath = "/storage/emulated/0/Android/data/packagename/xxx.zip"; // 文件的绝对路径
messageInfoList.add(localFileMsgInfo);

// 音频：最多支持 1 个
ZIMAudioMessageLiteInfo localAudioMsgInfo= new ZIMAudioMessageLiteInfo();
localAudioMsgInfo.fileLocalPath = "/storage/emulated/0/Android/data/packagename/xxx.mp3"; // 音频的绝对路径
localAudioMsgInfo.audioDuration = 100; // 必填，音频时长，单位秒
messageInfoList.add(localAudioMsgInfo);

// 视频：最多支持 1 个
ZIMVideoMessageLiteInfo localVideoMsgInfo= new ZIMVideoMessageLiteInfo();
localVideoMsgInfo.fileLocalPath = "/storage/emulated/0/Android/data/packagename/xxx.mp4"; // 视频的绝对路径
localVideoMsgInfo.videoDuration = 100; // 必填，视频时长，单位秒
messageInfoList.add(localVideoMsgInfo);


ZIMMultipleMessage zimMultipleMessage = new ZIMMultipleMessage();
zimMultipleMessage.setMessageInfoList(messageInfoList);

// 发送消息的高级属性配置
ZIMMessageSendConfig config = new ZIMMessageSendConfig();
// 设置消息优先级
config.priority = ZIMMessagePriority.LOW;

ZIMConversationType type = ZIMConversationType.Peer;

zim.sendMessage(zimMultipleMessage, userID, type, config, new ZIMMessageSentFullCallback() {
    @Override
    public void onMessageAttached(ZIMMessage zimMessage) {
        // 开发者可以通过该回调，监听消息是否开始准备发送。只有当通过本地基础参数检验的消息才会抛出该回调，否则通过 onMessageSent 回调抛出错误。               
    }

    @Override
    public void onMessageSent(ZIMMessage zimMessage, ZIMError error) {
        // 开发者可以通过该回调监听消息是否发送成功。
    }

    @Override
    public void onMultipleMediaUploadingProgress(
        ZIMMultipleMessage message,
        long currentFileSize,      // 已上传文件总大小，单位为 Byte。比如已上传了 20,971,520 Byte，则此处为 20,971,520。
        long totalFileSize,        // 总文件大小，单位为 Byte。比如总文件大小 104,857,600 Byte，则此处为 104,857,600
        int messageInfoIndex,      // 接收到此回调时，当前正在上传的文件在 messageInfoList 数组的索引
        long currentIndexFileSize, // 接收到此回调时，当前正在上传的文件的已上传大小，单位为 Byte。
        long totalIndexFileSize,   // 接收到此回调时，当前正在上传的文件的实际大小，单位为 Byte。
    ) {
        // 您可以在这里展示上传进度
        // 开发者可以监听这个回调获取多媒体上传的进度
        // 总文件上传进度： currentFileSize / totalFileSize
        // 上述例子中，总文件上传进度为：20,971,520 / 104,857,600 = 20% 
        // 接收此回调时，当前正在上传的文件的上传进度：currentIndexFileSize / totalIndexFileSize
    }
});
```
:::

:::if{props.platform="iOS|mac"}
```objc
// 在单聊会话中向指定用户发送组合消息
NSString *toUserID = @"toUserID";

// 组合消息 Item 列表，最多只可以包含 20 个 Item
NSMutableArray<ZIMMessageLiteInfo *> *messageInfoList = [NSMutableArray array];

// 文本
ZIMTextMessageLiteInfo *textMsgInfo = [[ZIMTextMessageLiteInfo alloc] init];
textMsgInfo.message = @"消息内容";
[messageInfoList addObject:textMsgInfo];

// 自定义消息：最多支持 1 个
ZIMCustomMessageLiteInfo *customMsgInfo = [[ZIMCustomMessageLiteInfo alloc] init];
customMsgInfo.message = @"消息内容";
customMsgInfo.searchedContent = @"搜索内容";
customMsgInfo.subType = 100;
[messageInfoList addObject:customMsgInfo];

// 图片：最多支持 10 个
// 网络图片示例
ZIMImageMessageLiteInfo *imageMsgInfo = [[ZIMImageMessageLiteInfo alloc] init];
imageMsgInfo.fileDownloadUrl = @"https://xxxx.jpeg"; // 原图
imageMsgInfo.thumbnailDownloadUrl = @"https://xxxx-thumbnail.jpeg"; // 缩略图
imageMsgInfo.largeImageDownloadUrl = @"https://xxxx-large.jpeg"; // 大图
[messageInfoList addObject:imageMsgInfo];

// 本地图片示例
ZIMImageMessageLiteInfo *localImageMsgInfo = [[ZIMImageMessageLiteInfo alloc] init];
localImageMsgInfo.fileLocalPath = @"/private/var/mobile/Containers/Data/Application/xxx.jpg"; // 图片的绝对路径
[messageInfoList addObject:localImageMsgInfo];

// 文件：最多支持 1 个
ZIMFileMessageLiteInfo *localFileMsgInfo = [[ZIMFileMessageLiteInfo alloc] init];
localFileMsgInfo.fileLocalPath = @"/private/var/mobile/Containers/Data/Application/xxx.zip"; // 文件的绝对路径
[messageInfoList addObject:localFileMsgInfo];

// 音频：最多支持 1 个
ZIMAudioMessageLiteInfo *localAudioMsgInfo = [[ZIMAudioMessageLiteInfo alloc] init];
localAudioMsgInfo.fileLocalPath = @"/private/var/mobile/Containers/Data/Application/xxx.mp3"; // 音频的绝对路径
localAudioMsgInfo.audioDuration = 100; // 必填，音频时长，单位秒
[messageInfoList addObject:localAudioMsgInfo];

// 视频：最多支持 1 个
ZIMVideoMessageLiteInfo *localVideoMsgInfo = [[ZIMVideoMessageLiteInfo alloc] init];
localVideoMsgInfo.fileLocalPath = @"/private/var/mobile/Containers/Data/Application/xxx.mp4"; // 视频的绝对路径
localVideoMsgInfo.videoDuration = 100; // 必填，视频时长，单位秒
[messageInfoList addObject:localVideoMsgInfo];


ZIMMultipleMessage * multipleMessage = [[ZIMMultipleMessage alloc] init];
multipleMessage.messageInfoList = messageInfoList;

ZIMMessageSendNotification *notification = [[ZIMMessageSendNotification alloc] init];

notification.onMessageAttached = ^(ZIMMessage * _Nonnull message) {
    // 开发者可以监听这个回调执行消息发送前的业务逻辑
};
        
notification.onMultipleMediaUploadingProgress = ^(
    ZIMMultipleMessage * _Nonnull message,
    unsigned long long currentFileSize,      // 已上传文件总大小，单位为 Byte。比如已上传了 20,971,520 Byte，则此处为 20,971,520。
    unsigned long long totalFileSize,        // 总文件大小，单位为 Byte。比如总文件大小 104,857,600B，则此处为 104,857,600
    unsigned int messageInfoIndex,           // 接收到此回调时，当前正在上传的文件在 messageInfoList 数组的索引
    unsigned long long currentIndexFileSize, // 接收到此回调时，当前正在上传的文件的已上传大小，单位为 Byte。
    unsigned long long totalIndexFileSize    // 接收到此回调时，当前正在上传的文件的实际大小，单位为 Byte。
) {
    // 开发者可以监听这个回调获取多媒体上传的进度
    // 总文件上传进度： currentFileSize / totalFileSize
    // 上述例子中，总文件上传进度为：20,971,520 / 104,857,600 = 20% 
    // 接收此回调时，当前正在上传的文件的上传进度：currentIndexFileSize / totalIndexFileSize
};

ZIMMessageSendConfig *sendConfig = [[ZIMMessageSendConfig alloc] init];
sendConfig.priority = ZIMMessagePriorityMedium;

[self.zim sendMessage:multipleMessage toUserID:toUserID conversationType: ZIMConversationTypePeer config:config notification:notification callback:^((ZIMMessage * _Nonnull message, ZIMError * _Nonnull errorInfo)) {
    // 开发者可以通过该回调监听消息是否发送成功。
}];
```
:::
:::if{props.platform="win"}
```cpp
// 在单聊会话中向指定用户发送组合消息

auto multiMsg = std::make_shared<ZIMMultipleMessage>();

// 文本
auto textMsgInfo = std::make_shared<ZIMTextMessageLiteInfo>();
textMsgInfo->message = "消息内容";
multiMsg->messageInfoList.push_back(textMsgInfo);

// 自定义消息：最多支持 1 个
auto customMsgInfo = std::make_shared<ZIMCustomMessageLiteInfo>();
customMsgInfo->message = "消息内容";
customMsgInfo->searchedContent = "搜索内容";
customMsgInfo->subType = 100;
multiMsg->messageInfoList.push_back(customMsgInfo);

// 图片：最多支持 10 个
// 网络图片示例
auto imageMsgInfo = std::make_shared<ZIMImageMessageLiteInfo>();
imageMsgInfo->fileDownloadUrl = "https://xxxx.jpeg";                // 原图
imageMsgInfo->thumbnailDownloadUrl = "https://xxxx-thumbnail.jpeg"; // 缩略图
imageMsgInfo->largeImageDownloadUrl = "https://xxxx-large.jpeg";    // 大图
multiMsg->messageInfoList.push_back(imageMsgInfo);

// 本地图片示例
auto localImageMsgInfo = std::make_shared<ZIMImageMessageLiteInfo>();
localImageMsgInfo->fileLocalPath = "D:\\files\\xxx.jpg"; // 图片的绝对路径
multiMsg->messageInfoList.push_back(localImageMsgInfo);

// 文件：最多支持 1 个
auto localFileMsgInfo = std::make_shared<ZIMFileMessageLiteInfo>();
localFileMsgInfo->fileLocalPath = "D:\\files\\xxx.zip"; // 文件的绝对路径
multiMsg->messageInfoList.push_back(localFileMsgInfo);

// 音频：最多支持 1 个
auto localAudioMsgInfo = std::make_shared<ZIMAudioMessageLiteInfo>();
localAudioMsgInfo->fileLocalPath = "D:\\files\\xxx.mp3"; // 音频的绝对路径
localAudioMsgInfo->audioDuration = 100; // 必填，音频时长，单位秒
multiMsg->messageInfoList.push_back(localAudioMsgInfo);

// 视频：最多支持 1 个
auto localVideoMsgInfo = std::make_shared<ZIMVideoMessageLiteInfo>();
localVideoMsgInfo->fileLocalPath = "D:\\files\\xxx.mp4"; // 文件绝对路径
localVideoMsgInfo->videoDuration = 100; // 必填，视频时长，单位秒
multiMsg->messageInfoList.push_back(localVideoMsgInfo);

zim::ZIMMessageSendConfig sendConfig;
zim::ZIMPushConfig pushConfig;

pushConfig.content = "win_push_content";
pushConfig.payload = "win_push_payload";
pushConfig.title = "win_push_title";

sendConfig.priority = zim::ZIM_MESSAGE_PRIORITY_MEDIUM;
sendConfig.pushConfig = &pushConfig;

auto type = zim::ZIMConversationType::ZIM_CONVERSATION_TYPE_PEER;

auto notification = std::make_shared<zim::ZIMMessageSendNotification>(
    [=](/zim-web/guides/messaging/const-std::shared_ptr<zim::zimmessage>-&message) {
        // 开发者可监听此回调，执行消息发送前的逻辑
    },
    [=](/zim-web/guides/messaging/const-std::shared_ptr<zimmediamessage>-&message,-unsigned-long-long-currentfilesize,-unsigned-long-long-totalfilesize) {
        // 发送组合消息时，该通知不会触发
    },
    [=](/zim-web/guides/messaging/const-std::shared_ptr<zim::zimmultiplemessage>-&message,-unsigned-long-long-currentfilesize,-/-已上传文件总大小，单位为-byte。比如已上传了-20,971,520-byte，则此处为-20,971,520。-unsigned-long-long-totalfilesize,-/-总文件大小，单位为-byte。比如总文件大小-104,857,600-byte，则此处为-104,857,600-unsigned-int-messageinfoindex,-/-接收到此回调时，当前正在上传的文件在-messageinfolist-数组的索引-unsigned-long-long-currentindexfilesize,-/-接收到此回调时，当前正在上传的文件的已上传大小，单位为-byte。-unsigned-long-long-totalindexfilesize-/-触发该回调对应的文件的大小) {
        // 发送组合消息的上传回调，如果组合消息中没有媒体类型，则该回调不会触发
    });

zim_->sendMessage(multiMsg, "toConversationID", type, sendConfig, notification,
                    [=](/zim-web/guides/messaging/const-std::shared_ptr<zim::zimmessage>-&message,-const-zim::zimerror-&errorinfo) {
                        // 发送结果的回调
                    });
```
:::

:::if{props.platform="Web|miniprogram|rn|uniapp|UTS|harmonyos"}
```typescript
// 在单聊会话中向指定用户发送组合消息

// 指定用户的 ID
const toConversationID = "xxxx";
// 发送消息的高级属性配置
const conversationType = 0; // 会话类型，取值为 单聊：0，房间：1，群组：2
const config: ZIMMessageSendConfig = { 
    priority: 1, // 设置消息优先级，取值为 低：1（默认），中：2，高：3
};

const notification: ZIMMessageSendNotification = {
    onMessageAttached: (message: ZIMMessage) => {
        
    },
    onMultipleMediaUploadingProgress: (
        message: ZIMMultipleMessage,
        currentFileSize: number,      // 已上传文件总大小，单位为 Byte。比如已上传了 20,971,520 Byte，则此处为 20,971,520。
        totalFileSize: number,        // 总文件大小，单位为 Byte。比如总文件大小 104,857,600 Byte，则此处为 104,857,600
        messageInfoIndex: number,     // 接收到此回调时，当前正在上传的文件在 messageInfoList 数组的索引
        currentIndexFileSize: number, // 接收到此回调时，当前正在上传的文件的已上传大小，单位为 Byte。
        totalIndexFileSize: number    // 接收到此回调时，当前正在上传的文件的实际大小，单位为 Byte。
    ) => {
        // 开发者可以监听这个回调获取多媒体上传的进度
        // 总文件上传进度： currentFileSize / totalFileSize
        // 上述例子中，总文件上传进度为：20,971,520 / 104,857,600 = 20% 
        // 接收此回调时，当前正在上传的文件的上传进度：currentIndexFileSize / totalIndexFileSize
    }
};

const zimMultipleMessage: ZIMMessage = {
    type: 10,
    // 组合消息 Item 列表，最多只可以包含 20 个 Item
    messageInfoList: [
        // 文本
        {
            type: 1,
            message: 'xxxx',
        },
        // 自定义消息：最多支持 1 个
        {
            type: 200,
            message: 'xxxx',
            subType: 100,
            searchedContent: 'xxxx'
        },
        // 图片：最多支持 10 个
        // 网络图片示例
        {
            type: 11,
            fileDownloadUrl: 'https://xxxx.jpeg', // 原图
            thumbnailDownloadUrl: 'https://xxxx-thumbnail.jpeg', // 缩略图
            largeImageDownloadUrl: 'https://xxxx-large.jpeg', // 大图
        },
        // 本地图片示例
        {
            type: 11,
            fileLocalPath: file, // 上传的文件
        },
        // 文件：最多支持 1 个
        {
            type: 12,
            fileLocalPath: file, // 上传的文件
        },
        // 音频：最多支持 1 个
        {
            type: 13,
            fileLocalPath: file, // 上传的文件
            audioDuration: 100, // 请填写音频时长，单位秒（必填）
        },
        // 视频：最多支持 1 个
        {
            type: 14,
            fileLocalPath: file, // 上传的文件
            videoDuration: 100, // 请填写视频时长，单位秒（必填）
        }
    ]
};

zim.sendMessage(zimMultipleMessage, toConversationID, conversationType, config, notification)
    .then((res: ZIMMessageSentResult) => {
        // 发送成功
    })
    .catch((err: ZIMError) => {
        // 发送失败
    });
```
:::
:::if{props.platform="flutter"}
```dart
// 在单聊会话中向指定用户发送组合消息

// 指定用户的 ID
String userID = "xxxx";

// 组合消息 Item 列表，最多只可以包含 20 个 Item
List<ZIMMessageLiteInfo> messageInfoList = [];

// 文本消息
ZIMTextMessageLiteInfo textMsgInfo = ZIMTextMessageLiteInfo();
textMsgInfo.message = "消息内容";
messageInfoList.add(textMsgInfo);

// 自定义消息：最多支持 1 个
ZIMCustomMessageLiteInfo customMsgInfo = ZIMCustomMessageLiteInfo();
customMsgInfo.message = "消息内容";
customMsgInfo.searchedContent = "搜索内容";
customMsgInfo.subType = 100;
messageInfoList.add(customMsgInfo);

// 图片：最多支持 10 个
// 网络图片
ZIMImageMessageLiteInfo imageMsgInfo = ZIMImageMessageLiteInfo();
imageMsgInfo.fileDownloadUrl = "https://xxxx.jpeg"; // 原图
imageMsgInfo.thumbnailDownloadUrl = "https://xxxx-thumbnail.jpeg"; // 缩略图
imageMsgInfo.largeImageDownloadUrl = "https://xxxx-large.jpeg"; // 大图
messageInfoList.add(imageMsgInfo);

// 本地图片
ZIMImageMessageLiteInfo localImageMsgInfo = ZIMImageMessageLiteInfo();
localImageMsgInfo.fileLocalPath = "/path/xxx.jpg"; // 图片绝对路径
messageInfoList.add(localImageMsgInfo);

// 文件：最多支持 1 个
ZIMImageMessageLiteInfo localFileMsgInfo = ZIMFileMessageLiteInfo();
localFileMsgInfo.fileLocalPath = "/path/xxx.zip"; // 文件绝对路径
messageInfoList.add(localFileMsgInfo);

// 音频：最多支持 1 个
ZIMAudioMessageLiteInfo localAudioMsgInfo = ZIMAudioMessageLiteInfo();
localAudioMsgInfo.fileLocalPath = "/path/xxx.mp3"; // 音频绝对路径
localAudioMsgInfo.audioDuration = 100; // 必填，播放时长，单位秒
messageInfoList.add(localAudioMsgInfo);

// 视频：最多支持 1 个
ZIMVideoMessageLiteInfo localVideoMsgInfo = ZIMVideoMessageLiteInfo();
localVideoMsgInfo.fileLocalPath = "/path/xxx.mp4"; // 视频绝对路径
localVideoMsgInfo.videoDuration = 100; // 必填，播放时长，单位秒
messageInfoList.add(localVideoMsgInfo);

ZIMMultipleMessage zimMultipleMessage = ZIMMultipleMessage(messageInfos);
zimMultipleMessage.messageInfoList = messageInfoList;

ZIMMessageSendNotification notification = ZIMMessageSendNotification(
    onMessageAttached: (message){
        // 开发者可以监听这个回调执行消息发送前的业务逻辑
    },
    onMultipleMediaUploadingProgress: (
        message,
        currentFileSize,      // 已上传文件总大小，单位为 Byte。比如已上传了 20,971,520 Byte，则此处为 20,971,520。
        totalFileSize,        // 总文件大小，单位为 Byte。比如总文件大小 104,857,600 Byte，则此处为 104,857,600
        messageInfoIndex,     // 接收到此回调时，当前正在上传的文件在 messageInfoList 数组的索引
        currentIndexFileSize, // 接收到此回调时，当前正在上传的文件的已上传大小，单位为 Byte。
        totalIndexFileSize    // 接收到此回调时，当前正在上传的文件的实际大小，单位为 Byte。
    ){
        // 开发者可以监听这个回调获取多媒体上传的进度
        // 总文件上传进度： currentFileSize / totalFileSize
        // 上述例子中，总文件上传进度为：20,971,520 / 104,857,600 = 20% 
        // 接收此回调时，当前正在上传的文件的上传进度：currentIndexFileSize / totalIndexFileSize
    }
);

// 发送消息的高级属性配置
ZIMMessageSendConfig config = ZIMMessageSendConfig();
// 设置消息优先级
config.priority = ZIMMessagePriority.low;

ZIMConversationType type = ZIMConversationType.Peer;


ZIM.getInstance().sendMessage(zimMultipleMessage, userID, type, config, notification).then((value) {
    // 发送成功回调
  }).catchError((onError){
    // 处理失败
  });
```
:::
:::if{props.platform="undefined|iOS|mac|win|flutter|Web|miniprogram|rn|UTS|harmonyos"}
### 接收组合消息

接收组合消息的回调接口与接收普通消息的回调接口一致，请参考 [收发普通消息 - 接收消息](#接收消息) 了解具体接口。

以下为用户在单聊会话中接收组合消息的示例代码：
:::
:::if{props.platform=undefined}
```java
// 用户在单聊会话中接收组合消息
zim.setEventHandler(new ZIMEventHandler() {
    @Override
    public void onPeerMessageReceived(ZIM zim, ArrayList<ZIMMessage> messageList, ZIMMessageReceivedInfo info, String fromUserID) {
        // 收到“单聊”消息的回调
        for (ZIMMessage zimMessage : messageList) {
            if (zimMessage instanceof ZIMMultipleMessage) {
                ZIMMultipleMessage zimMultipleMessage = (ZIMMultipleMessage) zimMessage;
                
           }    
        }
    }
});
```
:::
:::if{props.platform="iOS|mac"}
```objc
// 用户在单聊会话中接收组合消息
- (void)zim:(ZIM *)zim peerMessageReceived:(NSArray<ZIMMessage *> *)messageList info:(ZIMMessageReceivedInfo *)info fromUserID:(NSString *)fromUserID {
    if (zim != self.zim) {
        return;
    }
    for (ZIMMessage *msg in messageList) {
        if(msg.type == ZIMMessageTypeMultiple){
            // 这里表示接收到组合消息
        }
    }
}
```
:::
:::if{props.platform="win"}
```cpp
// 用户接收组合消息
void onPeerMessageReceived(zim::ZIM *zim, const std::vector<std::shared_ptr<zim::ZIMMessage>> &messageList,
    const ZIMMessageReceivedInfo &info, const std::string &fromUserID) {
    for (auto &it : message_list) {
        if (it->getType() == zim::ZIM_MESSAGE_TYPE_MULTIPLE ) {
            auto multipleMessage = std::dynamic_pointer_cast<zim::ZIMMultipleMessage>(it);
        }
    }
}
```
:::
:::if{props.platform="Web|miniprogram|rn|uniapp|harmonyos"}
```typescript
// 用户在单聊会话中接收组合消息
zim.on('peerMessageReceived', (zim, data) => {
    data.messageList.forEach((msg) => {
        // 收到 `Multiple` 消息时
        if (msg.type == 10) {
            msg.messageInfoList.forEach((info) => {
                // 根据消息类型展示 UI
                console.log('组合消息 item 类型：' + info.type);
            }
        }
    })
});
```
:::
:::if{props.platform="UTS"}
```typescript
// 用户在单聊会话中接收组合消息
zim.onPeerMessageReceived((data) => {
    data.messageList.forEach((msg) => {
        // 收到 `Multiple` 消息时
        if (msg.type == 10) {
            msg.messageInfoList.forEach((info) => {
                // 根据消息类型展示 UI
                console.log('组合消息 item 类型：' + info.type);
            }
        }
    })
});
```
:::
:::if{props.platform="flutter"}
```dart
// 用户在单聊会话中接收组合消息
ZIMEventHandler.onPeerMessageReceived = (zim, messageList, info, fromUserID) {
    for (ZIMMessage message in messageList) {
        if(message is ZIMMultipleMessage){
        
        }
    }
};
```
:::


## 收发 @ 消息

@ 消息，是指包含“@ + 用户”内容的消息。被 @ 的用户在收到消息时会强提醒。

<Frame width="auto" height="auto">
  <img src="https://media-resource.spreading.io/docuo/workspace564/27e54a759d23575969552654cb45bf89/e130538572.jpg"/>
</Frame>

<Note title="说明">

@ 消息不属于消息类型。一条消息既可以是文本消息或其他类型消息，同时也是 @ 消息。
</Note>

### 发送 @ 消息

在调用 {getPlatformData(props,sendMessageMap)} 发送消息时，可以通过以下方法（可同时使用）将一条消息设置为 @ 信息：
- {getPlatformData2(props,mentionedUserIDsMap)}：提醒指定用户（可以是会话外用户）查看消息。传入的 userID 列表长度最多为 50，如需上调，请联系 ZEGO 技术支持。
- {getPlatformData2(props,isMentionAllMap)}：提醒会话内所有其他用户查看消息。

<Note title="说明">

仅 2.14.0 及以上版本的 ZIM SDK 支持发送消息中带 @ 信息。
</Note>

:::if{props.platform=undefined}
```java
// 以下为用户在单聊会话中发送 @ 消息的示例代码：

// 创建提醒用户列表
ArrayList<String> mentionArrayList = new ArrayList<>();

// 添加提醒用户（用户可以不在当前会话）
mentionArrayList.add("userId1");
mentionArrayList.add("userId2");

// message 可以为任何类型消息
// 调用接口提醒列表中用户查看消息
message.setMentionedUserIDs(mentionArrayList);

// 提醒会话内所有其他用户查看消息
boolean isMentionAll = true;
message.setIsMentionAll(isMentionAll);

ZIMMessageSendConfig config = new ZIMMessageSendConfig();
// 设置消息优先级
config.priority = ZIMMessagePriority.LOW;

// 是否强推送给被提醒用户（不管对方是否开启了会话免打扰），默认为true;
config.isNotifyMentionedUsers = true;

// 以发送单聊信息为例子
ZIMConversationType type = ZIMConversationType.Peer;

zim.sendMessage(message, "conv_id", type, config, new ZIMMessageSentFullCallback() {
    @Override
    public void onMessageAttached(ZIMMessage zimMessage) {
        // 开发者可以通过该回调，监听消息是否开始准备发送。只有当通过本地基础参数检验的消息才会抛出该回调，否则通过 onMessageSent 回调抛出错误。               
    }

    @Override
    public void onMessageSent(ZIMMessage zimMessage, ZIMError error) {
        // 开发者可以通过该回调监听消息是否发送成功。
    }
});
```

:::
:::if{props.platform="iOS|mac"}

```objc
// 以下为用户在单聊会话中发送 @ 消息的示例代码：
// 创建提醒用户列表
NSMutableArray<NSString *> *mentionArrayList = [[NSMutableArray alloc] init];

// 添加提醒用户（用户可以不在当前会话）
[mentionArrayList addObject:@"userId1"];
[mentionArrayList addObject:@"userId2"];

// message 可以为任何类型消息
// 调用接口提醒列表中用户查看消息
[message mentionedUserIDs:mentionArrayList];

// 提醒会话内所有其他用户查看消息
BOOL isMentionAll = YES;
[message isMentionAll:isMentionAll];

ZIMMessageSendConfig *config = [[ZIMMessageSendConfig alloc] init];
// 是否强推送给被提醒用户（不管对方是否开启了会话免打扰），默认为 YES;
config.isNotifyMentionedUsers = YES;

// 以发送单聊信息为例
ZIMConversationType type = ZIMConversationTypePeer;

[zim sendMessage:message convId:@"conv_id" type:type config:config callback:^(ZIMMessage *zimMessage, ZIMError *error) {
    if (error) {
        // 开发者可以通过该回调监听消息是否发送成功。
    }
}];

```
:::
:::if{props.platform="win"}
```cpp
// 创建提醒用户列表
std::vector<std::string> mentionArrayList;

// 添加提醒用户（用户可以不在当前会话）
mentionArrayList.push_back("userId1");
mentionArrayList.push_back("userId2");

// message 可以为任何类型消息
message->mentionedUserIDs = mentionArrayList;

// 提醒会话内所有其他用户查看消息
bool isMentionAll = true;
message->isMentionAll = true;

ZIMMessageSendConfig config;
// 设置消息优先级
config.priority = ZIMMessagePriority::LOW;

// 是否强推送给被提醒用户（不管对方是否开启了会话免打扰），默认为 true；
config.isNotifyMentionedUsers = true;

// 以发送单聊信息为例子
ZIMConversationType type = ZIMConversationType::Peer;

zim_->sendMessage(
    message, "conv_id", type, config,
    std::make_shared<zim::ZIMMessageSendNotification>(
        [=](/zim-web/guides/messaging/const-std::shared_ptr<zim::zimmessage>-&message) {
            if (message) {
                // 开发者可以通过该回调，监听消息是否开始准备发送。只有当通过本地基础参数检验的消息才会抛出该回调，否则通过 onMessageSent 回调抛出错误。
            }
        }),
    [=](/zim-web/guides/messaging/std::shared_ptr<zim::zimmessage>-message,-zim::zimerror-errorinfo) {
        // 开发者可以通过该回调监听消息是否发送成功。
        if (errorInfo.code == zim::ZIMErrorCode::ZIM_ERROR_CODE_SUCCESS) {
            
        }
    });
```
:::
:::if{props.platform="Web|miniprogram|rn|uniapp|UTS|harmonyos"}
```typescript
// 以下为用户在单聊会话中发送 @ 消息（文本消息）的示例代码：
const toConversationID = ''; // 对方 userID
const conversationType = 0; // 会话类型，取值为 单聊：0，房间：1，群组：2
const config: ZIMMessageSendConfig = { 
    priority: 1, // 设置消息优先级，取值为 低：1（默认），中:2，高：3
};

const notification: ZIMMessageSendNotification = {
    onMessageAttached: (message: ZIMMessage) => {}
}

const messageTextObj: ZIMMessage = {
    type: 1,
    message: 'xxxx',
    isMentionAll: true, // 提醒会话内所有其他用户查看消息
    mentionedUserIDs: ["userId1", "userId2"], // 提醒列表中用户查看消息
};

zim.sendMessage(messageTextObj, toConversationID, conversationType, config, notification)
    .then((res: ZIMMessageSentResult) => {
        // 发送成功
    })
    .catch((err: ZIMError) => {
        // 发送失败
    });


```
:::
:::if{props.platform="flutter"}
```dart
// 以下为用户在单聊会话中发送 @ 消息的示例代码：

try {
    // 待提醒的用户列表
    List<String> memtionList = ['userID1', 'userID2'];

    // message 可以为任何类型消息
    // 调用接口提醒列表中用户查看消息
    message.mentionedUserIDs(memtionList);

    // 提醒会话内所有其他用户查看消息
    bool isMentionAll = true;
    message.isMentionAll(isMentionAll);

    ZIMMessageSendConfig config = ZIMMessageSendConfig();
    //设置消息优先级
    config.priority = ZIMMessagePriority.low;
    // 是否强推送给被提醒用户（不管对方是否开启了会话免打扰），默认为 true;
    config.isNotifyMentionedUsers = true;

    // 以发送单聊消息为例子
    ZIMConversationType type = ZIMConversationType.peer;

    ZIMMessageSentResult result = await ZIM.getInstance()!.sendMessage(message, 'conv_id', type, config);
    
} on PlatformException catch (onError){
    onError.code;//根据错误码表处理
    onError.message;//错误信息
}
```
:::

### 接收 @ 消息

接收 @ 消息的回调接口与接收普通消息的回调接口一致，请参考 [收发普通消息 - 接收消息](#接收消息) 了解具体接口。

收到消息后，开发者可根据业务逻辑实现对应的功能，如高亮等。

<Note title="说明">

- 仅 2.14.0 及以上版本的 ZIM SDK 支持接收并查看 @ 信息中的内容。
- 如果接收端的 SDK 版本介乎 [2.0.0, 2.14.0) 区间，则收到的消息和会话中不会带 @ 信息。
- 如果接收端的 SDK 版本为 1.x.x 版本，则无法收到 @ 信息。
</Note>

### 获取 mentionedInfoList

当会话内用户被提醒后，可以被动或主动获取 {getPlatformData(props,mentionedInfoListMap)} 。

{getPlatformData(props,mentionedInfoListMap)}，包含 @ 消息的对应消息 ID，发送者 userID，以及 @ 消息的类型 {getPlatformData(props,ZIMMessageMentionedTypeMap)} ，开发者可用于实现标记会话等多样业务逻辑。

#### 被动获取

在用户被提醒时，会收到 {getPlatformData(props,conversationChangedMap)} 回调，即可获取当前 {getPlatformData(props,ZIMConversationMap)} 的最新 {getPlatformData(props,mentionedInfoListMap)} 。

:::if{props.platform=undefined}
```java
@Override
    public void onConversationChanged(
        ZIM zim, ArrayList<ZIMConversationChangeInfo> conversationChangeInfoList) {
        // conversationChangeInfoList 可拿到收到提醒的会话里面的 mentionInfoList 
    }
```

:::
:::if{props.platform="iOS|mac"}
```objc
- (void)zim:(ZIM *)zim
    conversationChanged:(NSArray<ZIMConversationChangeInfo *> *)conversationChangeInfoList {
        // conversationChangeInfoList 可拿到收到提醒的会话里面的 mentionInfoList 
    }
```
:::
:::if{props.platform="win"}
```cpp
void onConversationChanged(
        ZIM * /*zim*/,
        const std::vector<ZIMConversationChangeInfo> & /*conversationChangeInfoList*/) {
    // conversationChangeInfoList 可拿到收到提醒的会话里面的 mentionInfoList 
}
```
:::
:::if{props.platform="Web|miniprogram|rn|uniapp|harmonyos"}
```typescript
zim.on('conversationChanged', (zim, data) => {
    console.log(data.info.mentionInfoList);
});
```
:::
:::if{props.platform="UTS"}
```typescript
zim.onConversationChanged((data) => {
    console.log(data.info.mentionInfoList);
});
```
:::
:::if{props.platform="flutter"}
```dart
ZIMEventHandler.onConversationChanged = (ZIM zim, List<ZIMConversationChangeInfo> conversationChangeInfoList){
    // conversationChangeInfoList 可拿到收到提醒的会话里面的 mentionInfoList 
};
```
:::

#### 主动获取

如用 {getPlatformData(props,queryConversationListMap)} 或者 {getPlatformData(props,queryConversationMap)} 主动拉取会话，也可获取会话里面的 {getPlatformData(props,mentionedInfoListMap)} ，可参考以下示例代码：

:::if{props.platform=undefined}

```java
ArrayList<ZIMMessageMentionedInfo> mentionedInfoList = conversation.mentionedInfoList;
```
:::
:::if{props.platform="iOS|mac"}
```objc
NSArray<ZIMMessageMentionedInfo *> * mentionedInfoList = conversation.mentionedInfoList;
```
:::
:::if{props.platform="win"}
```cpp
std::vector<ZIMMessageMentionedInfo> mentionedInfoList = conversation.mentionedInfoList;
```
:::

:::if{props.platform="Web|miniprogram|rn|uniapp|UTS|harmonyos"}
```typescript
const mentionedInfoList = conversaion.mentionedInfoList;
```
:::
:::if{props.platform="flutter"}
```dart
List<ZIMMessageMentionedInfo> mentionedInfoList = conversation.mentionedInfoList;
```
:::

### 清除会话的 mentionedInfoList

接收 @ 消息后，用户需要清除会话的 {getPlatformData(props,mentionedInfoListMap)} ，才能不再被提醒。

清除会话的 mentionedInfoList 接口与清除会话消息未读数接口相同：
- {getPlatformData(props,clearConversationUnreadMessageCountMap)} ：清除单个会话消息未读数，调用示例请参考 [会话管理 - 清除单个会话消息未读数](/zim-web/guides/conversation/manage-unread-message-counts#清除单个会话消息未读数)。
- {getPlatformData(props,clearConversationTotalUnreadMessageCountMap)} ：清除全部会话消息未读数，调用示例请参考 [会话管理 - 清除全部会话消息未读数](/zim-web/guides/conversation/manage-unread-message-counts#清除全部会话消息未读数)。

### 获取被提醒用户列表

会话内所有用户都可以调用 {getPlatformData2(props,mentionedUserIDsMap)} 参数获取具体的被提醒用户列表。

:::if{props.platform=undefined}
```java
ArrayList<String> userIds = message.getMentionedUserIDs();
```
:::
:::if{props.platform="iOS|mac"}
```objc
NSArray<NSString *> *userIds = message.mentionedUserIDs;
```
:::
:::if{props.platform="win"}
```cpp
std::vector<std::string> userIds = message.mentionedUserIDs;
```
:::
:::if{props.platform="Web|miniprogram|rn|uniapp|UTS|harmonyos"}
```typescript
const userIds = message.mentionedUserIDs;
```
:::
:::if{props.platform="flutter"}
```dart
List<String> userIds = message.mentionedUserIDs;
```
:::

### 确认是否为全员提醒

会话内所有用户都可以调用 {getPlatformData(props,isMentionAllMap)} 参数，确认消息是否为全员提醒消息。
:::if{props.platform=undefined}
```java
boolean isMentionAll = message.isMentionAll();
```
:::

:::if{props.platform="iOS|mac"}
```objc
BOOL isMentionAll = message.isMentionAll;
```
:::
:::if{props.platform="win"}
```cpp
boolean isMentionAll = message.isMentionAll;
```
:::
:::if{props.platform="Web|miniprogram|rn|uniapp|UTS|harmonyos"}
```typescript
const isMentionAll = message.isMentionAll;
```
:::
:::if{props.platform="flutter"}
```dart
bool isMentionAll = message.isMentionAll;
```
:::

## 收发全员推送消息

ZIM 支持您通过服务端向 App 所有在线用户发送消息，目标用户通过客户端接收相关消息。

### 从服务端向所有用户发送消息

请查看服务端 API 文档 [全员推送](https://doc-zh.zego.im/zim-server/messaging/push-message-to-all-users) 文档，实现从服务端向所有用户发送消息。

### 接收服务端发送的全员推送消息

<Note title="说明">

- 仅 2.10.0 及以上版本的 ZIM SDK 支持接收并查看全员推送消息的内容。
- 如果接收端的 SDK 版本介乎 [2.0.0, 2.10.0) 区间，不可以收到服务端发送的全员推送消息，如需获取此条消息，请将 SDK 升级为 2.10.0 或以上版本。
</Note>

通过 {getPlatformData(props,broadcastMessageReceivedMap)} 回调，即可接收全员推送消息。

示例代码：
:::if{props.platform=undefined}

```java
// 用户接收全员推送消息
public void onBroadcastMessageReceived(ZIM zim, ZIMMessage message) {
    super.onBroadcastMessageReceived(zim, message);
    // 接收到全员推送消息
}
```
:::
:::if{props.platform="iOS|mac"}
```objc
// 用户接收全员推送消息
- (void)zim:(ZIM *)zim broadcastMessageReceived:(ZIMMessage *)message {
    // 接收到全员推送消息
}
```
:::
:::if{props.platform="win"}
```cpp
// 用户接收全员推送消息
virtual void onBroadcastMessageReceived(ZIM * /*zim*/, const std::shared_ptr<ZIMMessage> & /*message*/) {}
```
:::
:::if{props.platform="Web|miniprogram|rn|uniapp|harmonyos"}
```typescript
// 用户接收全员推送消息
zim.on('broadcastMessageReceived', (zim, data) => {
    console.log(data.message);
});
```
:::
:::if{props.platform="UTS"}
```typescript
// 用户接收全员推送消息
zim.onBroadcastMessageReceived((data) => {
    console.log(data.message);
});
```
:::
:::if{props.platform="flutter"}
```dart
// 用户接收全员推送消息
ZIMEventHandler.onBroadcastMessageReceived(zim, message){}
```
:::

## 转发消息

ZIM SDK 支持实现以下两种形式的消息转发：
- 合并消息后转发。
- 逐条消息转发。

具体实现流程，请参考 [转发消息](/zim-web/guides/messaging/forward-messages)。


## 接收 Tips 消息

ZIM SDK 支持用户在会话内的操作转换为 Tips 消息。当相关操作出现后，ZIM SDK 会向会话发送一条 Tips 消息进行通知，详情请参考 [接收 Tips 消息](/zim-web/guides/messaging/receive-tip-messages)。


## 监听消息状态

在一些弱网场景中，可能存在以下场景，即消息发送成功，但由于某些因素（如网络丢包），导致 ZIM SDK 未收到服务端应答。此时，ZIM SDK 会因应答超时而认为消息发送失败，但实际上消息发送成功，导致消息状态混乱。为解决该问题，明确消息最终状态， 2.6.0 或以上版本 SDK 支持开发者监听 {getPlatformData(props,messageSentStatusChangedMap)} 回调，接收消息的状态变化。消息的状态有三种，即 Sending、Success 和 Failed。根据消息状态的变化，开发者可判断消息发送是否成功，并在业务上做相应处理。

:::if{props.platform=undefined}
```java
// 监听消息状态
zim.setEventHandler(new ZIMEventHandler() {
    @Override
    public void onMessageSentStatusChanged(
        ZIM zim, ArrayList<ZIMMessageSentStatusChangeInfo> messageSentStatusChangeInfoList) {
    // 开发者可在这里监听消息状态改变时的回调。
}
});
```
:::
:::if{props.platform="iOS|mac"}
```objc
// 监听消息状态
- (void)zim:(ZIM *)zim messageSentStatusChanged:
        (NSArray<ZIMMessageSentStatusChangeInfo *> *)messageSentStatusChangeInfoList {
            // 开发者可在这里监听消息状态的改变
}
```
:::
:::if{props.platform="win"}
```cpp
// 监听消息状态
void onMessageSentStatusChanged(zim::ZIM *zim, const std::vector<ZIMMessageSentStatusChangeInfo> &messageSentStatusChangeInfoList{
    // 开发者可以在这里监听消息状态变更的回调。
}
```
:::
:::if{props.platform="Web|miniprogram|rn|uniapp|harmonyos"}
```typescript
// 监听消息状态
zim.on('messageSentStatusChanged', (zim, data) => {
    data.infos.forEach((info) => {
        console.warn(info.message, info.status);
    });  
});
```
:::
:::if{props.platform="UTS"}
```typescript
// 监听消息状态
zim.onMessageSentStatusChanged((data) => {
    data.infos.forEach((info) => {
        console.warn(info.message, info.status);
    });  
});
```
:::
:::if{props.platform="flutter"}
```dart
//监听消息状态
ZIMEventHandler.onMessageSentStatusChanged = (
    ZIM zim, List<ZIMMessageSentStatusChangeInfo> messageSentStatusChangedInfoList){
        for(ZIMMessageSentStatusChangeInfo info in messageSentStatusChangedInfoList){
            log(info.status.toString());
            log(info.message!.messageID.toString());
        }
    };
```
:::

<Content platform="Web" />