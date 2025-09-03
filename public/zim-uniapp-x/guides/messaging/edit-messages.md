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
export const ZIMMessageEditedCallbackMap = {
  'Web,UTS': <a href="@-ZIMMessageEditedResult" target='_blank'>ZIMMessageEditedResult</a>,
  'window,iOS,mac': <a href="@ZIMMessageEditedCallback" target='_blank'>ZIMMessageEditedCallback</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMMessageEditedResult-class.html" target='_blank'>ZIMMessageEditedResult</a>,
}

# 编辑消息

- - -

## 功能简介

<Note title="说明">

如需使用本功能，请开通旗舰版套餐。
</Note>

ZIM SDK 支持用户在单聊或群聊中修改已发送的消息，更新内容将实时同步至会话所有成员，确保沟通信息即时一致。

<Frame width="60%" height="auto">
  <img src="https://media-resource.spreading.io/docuo/workspace564/27e54a759d23575969552654cb45bf89/27f9807483.png" alt="Edit_a_message_zh.png"/>
</Frame>

## 设置监听

:::if{props.platform="undefined|Web|window|iOS|mac"}
会话参与者注册 {getPlatformData(props,setEventHandlerMap)} 监听 {getPlatformData(props,messageEditedMap)} 回调监听消息编辑的相关通知。当其他用户编辑消息后，可以直接获取编辑后的消息的相关信息，包括编辑时间和编辑者等。
:::
:::if{props.platform="UTS|Flutter"}
会话参与者监听 {getPlatformData(props,messageEditedMap)} 回调监听消息编辑的相关通知。当其他用户编辑消息后，可以直接获取编辑后的消息的相关信息，包括编辑时间和编辑者等。
:::

:::if{props.platform=undefined}
```java title="示例代码"
// 注册事件
zim.setEventHandler(new ZIMEventHandler() {
    @Override
    public void onMessageEdited(ZIM zim, ArrayList<ZIMMessage> messageList) {
        // 收到编辑后的消息列表时，可按照业务需求更新  UI
    }
});
:::
:::if{props.platform="iOS|mac"}
```objc title="示例代码"
// 注册事件
- (void)zim:(ZIM *)zim messageEdited:(NSArray<ZIMMessage *> *)messageList {
    if (zim != self.zim) {
        return;
    }
    // 收到编辑后的消息列表时，可按照业务需求更新  UI
};
```
:::
:::if{props.platform="window"}
```cpp title="示例代码"
// 注册事件
void onMessageEdited(
    ZIM *zim, const std::vector<std::shared_ptr<ZIMMessage>> &messageList) {
    // 收到编辑后的消息列表时，可按照业务需求更新  UI
}
```
:::
:::if{props.platform="Flutter"}
```dart title="示例代码"
// 注册事件
ZIMEventHandler.onMessageEdited = (zim, messageList) {
    // 收到编辑后的消息列表时，可按照业务需求更新  UI
};
```
:::
:::if{props.platform="Web"}
```typescript title="示例代码"
// 注册事件
zim.on('messageEdited', (zim, data) => {
    // 收到编辑后的消息列表时，可按照业务需求更新  UI
})
```
:::
:::if{props.platform="UTS"}
```typescript title="示例代码"
// 注册事件
zim.onMessageEdited((data) => {
    // 收到编辑后的消息列表时，可按照业务需求更新  UI
})
```
:::

## 编辑消息

**成功登录 ZIM SDK 后**，会话参与者可以调用 {getPlatformData(props,editMessageMap)} 接口编辑自身已发送的消息（仅支持以下类型的消息：{getPlatformData(props,ZIMTextMessageMap)}、{getPlatformData(props,ZIMCustomMessageMap)}、{getPlatformData(props,ZIMMultipleMessageMap)}），支持编辑的属性如下：
- extendedData：消息拓展字段。
- isMentionAll：是否需要提醒所有人（@所有人）。
- mentionedUserIDs：被提醒的用户列表（@某用户）。
- message: {getPlatformData(props,ZIMTextMessageMap)} 或 {getPlatformData(props,ZIMCustomMessageMap)} 的消息内容。
- subType: {getPlatformData(props,ZIMCustomMessageMap)} 的子类型。
- messageInfoList: {getPlatformData(props,ZIMMultipleMessageMap)} 的 item 列表。
- searchedContent： {getPlatformData(props,ZIMCustomMessageMap)} 的检索字段。

:::if{props.platform=undefined}
随后通过 [ZIMMessageSentFullCallback](https://doc-zh.zego.im/) 得知编辑操作结果。
:::
:::if{props.platform="iOS|mac|window|flutter|Web|UTS"}
随后通过  {getPlatformData(props,ZIMMessageEditedCallbackMap)}  得知编辑操作结果。
:::

<Note title="说明">
- 仅支持编辑 24 小时内的消息，以消息发送的 `timestamp` 为准。消息的 `timestamp` 不会因消息编辑而更新。
- 消息类型不可变更，例如：{getPlatformData(props,ZIMTextMessageMap)} 无法转换为{getPlatformData(props,ZIMCustomMessageMap)} 或 {getPlatformData(props,ZIMMultipleMessageMap)}。
- 编辑消息接口对各属性的限制与发送消息接口相关限制一致。
- 编辑消息会触发服务端 [消息发送前回调](https://doc-zh.zego.im/zim-server/callbacks/message-not-sent-yet) 和 [消息发送后回调](https://doc-zh.zego.im/zim-server/callbacks/message-sent) 。      
- 如果您开通了 ZIM 内容审核，消息内容编辑后也会被审核，审核流程和限制等和发送消息时一致。
    - 当消息为文本（先审后发），未通过审核会导致编辑失败，消息内容不会更新。
    - 当消息为图片、语音或视频（先发后审），未通过审核会导致消息撤回，不会恢复为编辑前内容。
</Note>


:::if{props.platform=undefined}
```java title="示例代码"
// 编辑文本消息内容
ZIMTextMessage messageObj; // 从 queryHistoryMessage 接口获取
messageObj.message = "编辑后的消息内容";

ZIMMessageEditConfig config = new ZIMMessageEditConfig();

zim.editMessage(messageObj, config, new ZIMMessageSentFullCallback() {
    @Override
    public void onMessageAttached(ZIMMessage zimMessage) {}

    // 当编辑的是 ZIMMultipleMessage 并且有本地文件上传时会触发该回调
    @Override
    public void onMultipleMediaUploadingProgress(
        ZIMMultipleMessage message,
        long currentFileSize,      
        long totalFileSize,        
        int messageInfoIndex,      
        long currentIndexFileSize, 
        long totalIndexFileSize,   
    ) {}

    @Override
    public void onMessageSent(ZIMMessage zimMessage, ZIMError errorInfo) {
        // 根据 errorInfo 判断是否操作成功
    }
});
```
:::
:::if{props.platform="iOS|mac"}
```objc title="示例代码"
// 编辑文本消息内容
ZIMTextMessage *messageObj; // 从 queryHistoryMessage 接口获取
messageObj.message = "编辑后的消息内容";

ZIMMessageEditConfig *config = [[ZIMMessageEditConfig alloc] init];

ZIMMessageSendNotification *notification = [[ZIMMessageSendNotification alloc] init];
notification.onMessageAttached = ^(ZIMMessage * _Nonnull message) {};
// 当编辑的是 ZIMMultipleMessage 并且有本地文件上传时会触发该回调        
notification.onMultipleMediaUploadingProgress = ^(
    ZIMMultipleMessage * _Nonnull message,
    unsigned long long currentFileSize,      
    unsigned long long totalFileSize,        
    unsigned int messageInfoIndex,          
    unsigned long long currentIndexFileSize,    
    unsigned long long totalIndexFileSize   
) {};

[[ZIM getInstance] editMessage:messageObj 
                        config:config 
                notification:notification 
                    callback:^(ZIMMessage * _Nonnull message, ZIMError * _Nonnull errorInfo) {
    // 根据 errorInfo 判断是否操作成功
}];
```
:::
:::if{props.platform="window"}
```cpp title="示例代码"
// 编辑文本消息内容
std::shared_ptr<zim::ZIMTextMessage> message_obj; // 从 queryHistoryMessage 接口获取
message_obj->message = "编辑后的消息内容";

zim::ZIMMessageEditConfig config;

auto notification = std::make_shared<zim::ZIMMessageSendNotification>(
    [=](/zim-uniapp-x/guides/messaging/const-std::shared_ptr<zim::zimmessage>-&message) {},
    [=](/zim-uniapp-x/guides/messaging/const-std::shared_ptr<zimmediamessage>-&message,-unsigned-long-long-currentfilesize,-unsigned-long-long-totalfilesize) {
    },
    // 当编辑的是 ZIMMultipleMessage 并且有本地文件上传时会触发该回调 
    [=](/zim-uniapp-x/guides/messaging/const-std::shared_ptr<zim::zimmultiplemessage>-&message,-unsigned-long-long-currentfilesize,-unsigned-long-long-totalfilesize,-unsigned-int-messageinfoindex,-unsigned-long-long-currentindexfilesize,-unsigned-long-long-totalindexfilesize) {}
);

zim_->editMessage(
    message_obj, config, notification,
    [=](/zim-uniapp-x/guides/messaging/const-std::shared_ptr<zim::zimmessage>-&message,-const-zim::zimerror-&errorinfo) {
        // 根据 errorInfo 判断是否操作成功
    });
```
:::
:::if{props.platform="Flutter"}
```dart title="示例代码"
// 编辑文本消息内容
ZIMTextMessage messageObj; // 从 queryHistoryMessage 接口获取
messageObj.message = "编辑后的消息内容";

ZIMMessageEditConfig config = ZIMMessageEditConfig();
ZIMMessageSendNotification notification = ZIMMessageSendNotification();
notification.onMultipleMediaUploadingProgress = (message,
    currentFileSize, totalFileSize, messageInfoIndex,
    currentIndexFileSize, totalIndexFileSize) async {

    };

ZIM.getInstance().editMessage(messageObj, config, notification)
    .then((result){
    // 操作成功
    })
    .catchError((onError) {
    // 操作失败
    }); 
```
:::
:::if{props.platform="Web|UTS"}
```typescript title="示例代码"
// 编辑文本消息内容
const messageObj: ZIMMessage = {}; // 从 queryHistoryMessage 接口获取
messageObj.message = "编辑后的消息内容";

const config: ZIMMessageEditConfig = {};
const notification: ZIMMessageSendNotification = {
    onMessageAttached: (message: ZIMMessage) => {},

    // 当编辑的是 ZIMMultipleMessage 并且有本地文件上传时会触发该回调
    onMultipleMediaUploadingProgress: (
        message: ZIMMultipleMessage,
        currentFileSize: number,
        totalFileSize: number,
        messageInfoIndex: number,
        currentIndexFileSize: number,
        totalIndexFileSize: number,
    ) => {},
};

zim.editMessage(messageObj, config, notification)
    .then((res: ZIMMessageEditedResult) {
        // 操作成功
    })
    .catch((err: ZIMError) => {
        // 操作失败 
    });
```
:::

<Content platform="UTS" />
