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

export const onPeerMessageReceivedMap = {
  'Android': <a href="@onPeerMessageReceived" target='_blank'>onPeerMessageReceived</a>,
  'Web': <a href="@peerMessageReceived" target='_blank'>peerMessageReceived</a>,
  'UTS': <a href="@peerMessageReceived" target='_blank'>onPeerMessageReceived</a>,
  'iOS': <a href="https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_ios~protocol~ZIMEventHandler#zim-peer-message-received-from-user-id" target='_blank'>peerMessageReceived</a>,
  'mac': <a href="https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_macos~protocol~ZIMEventHandler#zim-peer-message-received-from-user-id" target='_blank'>peerMessageReceived</a>,
  "Flutter": <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMEventHandler/onPeerMessageReceived.html" target='_blank'>onPeerMessageReceived</a>,
}
export const onGroupMessageReceivedMap = {
  'Android': <a href="@onGroupMessageReceived" target='_blank'>onGroupMessageReceived</a>,
  'Web': <a href="@groupMessageReceived" target='_blank'>groupMessageReceived</a>,
  'UTS': <a href="@groupMessageReceived" target='_blank'>onGroupMessageReceived</a>,
  'iOS': <a href="https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_ios~protocol~ZIMEventHandler#zim-group-message-received-from-group-id" target='_blank'>groupMessageReceived</a>,
  'mac': <a href="https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_macos~protocol~ZIMEventHandler#zim-group-message-received-from-group-id" target='_blank'>groupMessageReceived</a>,
  "Flutter": <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMEventHandler/onGroupMessageReceived.html" target='_blank'>onGroupMessageReceived</a>,
}
export const queryHistoryMessageMap = {
  'Android': <a href="@queryHistoryMessage" target='_blank'>queryHistoryMessage</a>,
  'iOS,mac': <a href="@queryHistoryMessageByConversationID" target='_blank'>queryHistoryMessageByConversationID</a>,
  "Flutter": <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/queryHistoryMessage.html" target='_blank'>queryHistoryMessage</a>,
}
export const replyMessageMap = {
  'Android': <a href="@replyMessage" target='_blank'>replyMessage</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/replyMessage.html" target='_blank'>replyMessage</a>,
}
export const ZIMMessageSentFullCallbackMap = {
  'Android': <a href="@-ZIMMessageSentFullCallback" target='_blank'>ZIMMessageSentFullCallback</a>,
  'Web,UTS': <a href="@-ZIMMessageSentResult" target='_blank'>ZIMMessageSentResult</a>,
  'iOS,mac,window': <a href="@ZIMMessageSentCallback" target='_blank'>ZIMMessageSentCallback</a>,
}
export const onMessageSentMap = {
  'Android': <a href="@onMessageSent" target='_blank'>onMessageSent</a>,
}
export const onMessageAttachedMap = {
  'Android': <a href="@onMessageAttached" target='_blank'>onMessageAttached</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMMessageSendNotification/onMessageAttached.html" target='_blank'>onMessageAttached</a>,
}
export const onMediaUploadingProgressMap = {
  'Android': <a href="@onMediaUploadingProgress" target='_blank'>onMediaUploadingProgress</a>,
  'Flutter':  <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMMessageSendNotification/onMediaUploadingProgress.html" target='_blank'>onMediaUploadingProgress</a>
}
export const repliedInfoMap = {
  'Android': <a href="@repliedInfo" target='_blank'>repliedInfo</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMMessage/repliedInfo.html" target='_blank'>repliedInfo</a>,
}
export const rootRepliedCountMap = {
  'Android': <a href="https://doc-zh.zego.im/article/api?doc=zim_API~javascript_react-native~interface~ZIMMessage#root-replied-count" target="_blank"> ZIMMessage {">"} rootRepliedCount</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMMessage/rootRepliedCount.html" target="_blank"> ZIMMessage {">"} rootRepliedCount</a>,
}
export const onMessageRepliedCountChangedMap = {
  'Android': <a href="@onMessageRepliedCountChanged" target='_blank'>onMessageRepliedCountChanged</a>,
  'Web': <a href="@messageRepliedCountChanged" target='_blank'>messageRepliedCountChanged</a>,
  'UTS': <a href="@messageRepliedCountChanged" target='_blank'>onMessageRepliedCountChanged</a>,
  'iOS': <a href="https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_ios~protocol~ZIMEventHandler#zim-message-replied-count-changed" target='_blank'>messageRepliedCountChanged</a>,
  'mac': <a href="https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_macos~protocol~ZIMEventHandler#zim-message-replied-count-changed" target='_blank'>messageRepliedCountChanged</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMEventHandler/onMessageRepliedCountChanged.html" target='_blank'>onMessageRepliedCountChanged</a>,
}
export const onMessageRepliedInfoChangedMap = {
  'Android': <a href="@onMessageRepliedInfoChanged" target='_blank'>onMessageRepliedInfoChanged</a>,
  'Web': <a href="@messageRepliedInfoChanged" target='_blank'>messageRepliedInfoChanged</a>,
  'UTS': <a href="@messageRepliedInfoChanged" target='_blank'>onMessageRepliedInfoChanged</a>,
  'iOS': <a href="https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_ios~protocol~ZIMEventHandler#zim-message-replied-info-changed" target='_blank'>messageRepliedInfoChanged</a>,
  'mac': <a href="https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_macos~protocol~ZIMEventHandler#zim-message-replied-info-changed" target='_blank'>messageRepliedInfoChanged</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMEventHandler/onMessageRepliedInfoChanged.html" target='_blank'>onMessageRepliedInfoChanged</a>,
}
export const ZIMMessageRepliedInfoMap = {
  'Android': <a href="@messageSeq-ZIMMessageRepliedInfo" target='_blank'>repliedInfo.messageSeq</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMMessageRepliedInfo/state.html" target='_blank'>repliedInfo.messageSeq</a>,
}
export const repliedInfoStateMap = {
  'Android': <a href="@state-ZIMMessageRepliedInfo" target='_blank'>repliedInfo.state</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMMessageRepliedInfo/state.html" target='_blank'>repliedInfo.state</a>,
}
export const ZIMMessageRepliedInfoStateMap = {
  'Android': <a href="@deleted-ZIMMessageRepliedInfoState" target='_blank'>ZIMMessageRepliedInfoState.DELETED</a>,
  'window': <a href="https://doc-zh.zego.im/article/api?doc=zim_API~cpp_windows~enum~ZIMMessageRepliedInfoState#zim-message-replied-info-state-deleted" target='_blank'>ZIM_MESSAGE_REPLIED_INFO_STATE_DELETED</a>,
  'iOS,mac': <a href="@ZIMMessageRepliedInfoStateDeleted" target='_blank'>ZIMMessageRepliedInfoStateDeleted</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMCallState.html#deleted" target='_blank'>ZIMMessageRepliedInfoState.deleted</a>,
}
export const repliedInfoMessageInfoMap = {
  'Android': <a href="@messageInfo-ZIMMessageRepliedInfo" target='_blank'>repliedInfo.messageInfo</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMMessageRepliedInfo/messageInfo.html" target='_blank'>repliedInfo.messageInfo</a>,
}
export const queryMessageRepliedListMap = {
  'Android': <a href="@queryMessageRepliedList" target='_blank'>queryMessageRepliedList</a>,
  'iOS,mac': <a href="@queryMessageRepliedListByMessage" target='_blank'>queryMessageRepliedListByMessage</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/queryMessageRepliedList.html" target='_blank'>queryMessageRepliedList</a>,
}
export const messageSeqZIMMessageMap = {
  'Android': <a href="@messageSeq-ZIMMessage" target='_blank'>messageSeq</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMMessage/messageSeq.html" target='_blank'>messageSeq</a>,  
}
export const queryMessagesMap = {
  'Android': <a href="@queryMessages" target='_blank'>queryMessages</a>,
  'iOS,mac': <a href="@queryMessagesByMessageSeqs" target='_blank'>queryMessagesByMessageSeqs</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/queryMessages.html" target='_blank'>queryMessages</a>,
}
export const ZIMMessageMap = {
  'Android': <a href="@-ZIMMessage" target='_blank'>ZIMMessage</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMMessage-class.html" target='_blank'>ZIMMessage</a>,
}
export const nextMessageMap = {
  'Android': <a href="@nextMessage-ZIMMessageQueryConfig" target='_blank'>nextMessage</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMMessageQueryConfig/nextMessage.html" target='_blank'>nextMessage</a>,
}
export const ZIMTextMessageMap ={
    'Android': <a href="@-ZIMTextMessage" target='_blank'>ZIMTextMessage</a>,
    'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMTextMessage-class.html" target='_blank'>ZIMTextMessage(1)</a>,
}
export const ZIMImageMessageMap ={
    'Android': <a href="@-ZIMImageMessage" target='_blank'>ZIMImageMessage</a>,
    'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMImageMessage-class.html" target='_blank'>ZIMImageMessage(11)</a>,
}
export const ZIMFileMessageMap ={
    'Android': <a href="@-ZIMFileMessage" target='_blank'>ZIMFileMessage</a>,
    'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMFileMessage-class.html" target='_blank'>ZIMFileMessage(12)</a>,
}
export const ZIMAudioMessageMap ={
    'Android': <a href="@-ZIMAudioMessage" target='_blank'>ZIMAudioMessage</a>,
    'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMAudioMessage-class.html" target='_blank'>ZIMAudioMessage(13)</a>,
}
export const ZIMVideoMessageMap ={
    'Android': <a href="@-ZIMVideoMessage" target='_blank'>ZIMVideoMessage</a>,
    'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMVideoMessage-class.html" target='_blank'>ZIMVideoMessage(14)</a>,
}
export const ZIMCombineMessageMap ={
    'Android': <a href="@-ZIMCombineMessage" target='_blank'>ZIMCombineMessage</a>,
    'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMCombineMessage-class.html" target='_blank'>ZIMCombineMessage(100)</a>,
}
export const ZIMCustomMessageMap ={
    'Android': <a href="@-ZIMCustomMessage" target='_blank'>ZIMCustomMessage</a>,
    'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMCustomMessage-class.html" target='_blank'>ZIMCustomMessage(200)</a>,
}
export const ZIMMultipleMessageMap ={
    'Android': <a href="@-ZIMMultipleMessage" target='_blank'>ZIMMultipleMessage</a>,
    'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMMultipleMessage-class.html" target='_blank'>ZIMMultipleMessage(10)</a>,
}

# 回复消息

- - -

## 功能简介

ZIM SDK 支持会话内回复消息功能，即引用接收到的某一条消息进行针对性的回复，形成起始于该消息的消息回复树状结构。通过此功能，用户可针对某一条消息进行提问、反馈或补充相关背景信息。

## 概念解释

<Frame width="auto" height="auto">
  <img src="https://media-resource.spreading.io/docuo/workspace564/27e54a759d23575969552654cb45bf89/2fe84e2d81.jpg"/>
</Frame>

本功能涉及概念如下：

- 根消息：回复树的起点，通常是某个特定讨论的起始消息。
- 子消息：是指对某条消息的直接或间接回复。
- 源消息：是指某条回复的上一级消息。
- 回复数：**根消息**收到的回复数量。

以群聊会话消息 A、B 和 C 为例：
1. 消息 B 回复了消息 A，则：
    - 消息 A 是根消息。
    - 消息 A 是消息 B 的源消息。
    - 消息 B 是消息 A 的子消息。
2. 消息 C 回复了消息 B，则：
    - 消息 B 为消息 C 的源消息，
    - 消息 C 是消息 B 的子消息。
3. 消息 B 和消息 C 都是消息 A 的子消息。
4. 消息 A 的回复数是 2。消息 B 没有回复数。



## 回复一条消息

登录 ZIM 后，用户可以监听 {getPlatformData(props,onPeerMessageReceivedMap)} 和 {getPlatformData(props,onGroupMessageReceivedMap)} 回调接收单聊会话和群聊会话的新消息，或调用 {getPlatformData(props,queryHistoryMessageMap)} 接口拉取历史消息。

此时，用户可以选择其中某条消息进行回复，即将该消息作为 `toOriginalMessage` 参数，并构造一个消息作为回复内容作为 `message` 参数，调用 {getPlatformData(props,replyMessageMap)} 接口。

<Note title="说明">

上述 `toOriginalMessage` 和 `message` 都仅支持以下类型：
- 文本消息：{getPlatformData(props,ZIMTextMessageMap)}
- 图片消息：{getPlatformData(props,ZIMImageMessageMap)}
- 文件消息：{getPlatformData(props,ZIMFileMessageMap)}
- 音频消息：{getPlatformData(props,ZIMAudioMessageMap)}
- 视频消息：{getPlatformData(props,ZIMVideoMessageMap)}
- 组合消息：{getPlatformData(props,ZIMMultipleMessageMap)}
- 合并消息：{getPlatformData(props,ZIMCombineMessageMap)}
- 自定义消息：{getPlatformData(props,ZIMCustomMessageMap)}
</Note>

:::if{props.platform=undefined}
<div>
通过 {getPlatformData(props,ZIMMessageSentFullCallbackMap)} 返回以下几个信息：
- {getPlatformData(props,onMessageSentMap)} ：消息发送结果，当发送消息失败时可以通过错误码和错误信息获取详情。
- {getPlatformData(props,onMessageAttachedMap)} ：在回复发送前，可以获得一个临时的 ZIMMessage，以便您添加一些业务处理逻辑。 
- {getPlatformData(props,onMediaUploadingProgressMap)} ：当发送包含富媒体的消息时，此回调将提供文件上传进度的更新。
</div>
:::

:::if{props.platform="iOS|mac|window|Web|UTS"}
<div>
除了上述必要参数之外，您还可以根据业务需求构造 `notification` 对象，监听如下回调：
- {getPlatformData(props,onMessageAttachedMap)}：在回复发送前，可以获得一个临时的 ZIMMessage，以便您添加一些业务处理逻辑。 
- {getPlatformData(props,onMediaUploadingProgressMap)}：当发送包含富媒体的消息时，此回调将提供文件上传进度的更新。   

发送结果将通过 {getPlatformData(props,ZIMMessageSentFullCallbackMap)} 返回。
</div>
:::

:::if{props.platform="Flutter"}
<div>
通过 [ZIMMessageSendNotification](https://pub.dev/documentation/zego_zim/latest/search.html?q=ZIMMessageSendNotification) 返回以下几个信息：
- {getPlatformData(props,onMessageAttachedMap)}：在回复发送前，可以获得一个临时的 ZIMMessage，以便您添加一些业务处理逻辑。 
- {getPlatformData(props,onMediaUploadingProgressMap)}：当发送包含富媒体的消息时，此回调将提供文件上传进度的更新。
</div>
:::

:::if{props.platform=undefined}
```java
// 回复消息内容
ZIMTextMessage textMessage = new ZIMTextMessage("消息内容");

ZIMMessageSendConfig config = new ZIMMessageSendConfig();
// 设置消息优先级
config.priority = ZIMMessagePriority.LOW;

// 回复一条消息，引用的源消息对象 toOriginalMessage 可以通过 queryHistoryMessage 或者 onPeerMessageReceived 和 onGroupMessageReceived 获取。
ZIM.getInstance().replyMessage(textMessage, toOriginalMessage, config, new ZIMMessageSentFullCallback() {
    @Override
    public void onMessageAttached(ZIMMessage message) {
        // 发送前的回调，客户可以在这里获取一个临时对象，该对象与开发者创建的 zimMessage 对象属于同一对象，开发者可利用此特性做一些业务逻辑，如提前展示 UI 等
    }

    @Override
    public void onMessageSent(ZIMMessage message, ZIMError errorInfo) {
        // 开发者可以通过该回调监听消息是否发送成功。
    } 

    @Override
    public void onMediaUploadingProgress(ZIMMessage message, long currentFileSize, long totalFileSize) {
        // 若发送的回复消息为媒体消息，则可以监听媒体附件的上传进度
    }
});
```
:::
:::if{props.platform="iOS|mac"}
```objc
// 回复消息内容
ZIMTextMessage *textMessage = [[ZIMTextMessage alloc] init];
textMessage.message = @"消息内容";

ZIMMessageSendConfig *config = [[ZIMMessageSendConfig alloc] init];
// 设置消息优先级
config.priority = ZIMMessagePriorityLow;

ZIMMessageSendNotification *notification = [[ZIMMessageSendNotification alloc] init];
notification.onMessageAttached = ^(ZIMMessage * _Nonnull message) {
    // 发送前的回调，客户可以在这里获取一个临时对象，该对象与开发者创建的 zimMessage 对象属于同一对象，开发者可利用此特性做一些业务逻辑，如提前展示 UI 等
};
notification.onMediaUploadingProgress = ^(ZIMMediaMessage * _Nonnull message, unsigned long long currentFileSize, unsigned long long totalFileSize) {
    // 若发送的回复消息为媒体消息，则可以监听媒体附件的上传进度
};

// 回复一条消息，引用的源消息对象 toOriginalMessage 可以通过 queryHistoryMessageByConversationID 或者 peerMessageReceived 和 groupMessageReceived 获取。
[[ZIM getInstance] replyMessage:textMessage toOriginalMessage:toOriginalMessage config:config notification:notification callback:^(ZIMMessage * _Nonnull message, ZIMError * _Nonnull errorInfo) {
    // 开发者可以通过该回调监听消息是否发送成功。
}];
```
:::
:::if{props.platform="window"}
```cpp
// 回复的内容
auto textMessage = std::make_shared<ZIMTextMessage>();
textMessage->message = "消息内容";

ZIMMessageSendConfig config;
// 设置消息优先级
config.priority = ZIM_MESSAGE_PRIORITY_LOW;

auto notification = std::make_shared<ZIMMessageSendNotification>();
notification->onMessageAttached = [=](/zim-rn/guides/messaging/const-std::shared_ptr<zimmessage>-&message) {
    // 发送前的回调，客户可以在这里获取一个临时对象，该对象与开发者创建的 zimMessage 对象属于同一对象，开发者可利用此特性做一些业务逻辑，如提前展示 UI 等
};
notification->onMediaUploadingProgress = [=](/zim-rn/guides/messaging/std::shared_ptr<zimmediamessage>-&message,-unsigned-long-long-currentfilesize,-unsigned-long-long-totalfilesize) {
    // 若发送的回复消息为媒体消息，则可以监听媒体附件的上传进度
};

// 回复一条消息，引用的源消息对象 toOriginalMessage 可以通过 queryHistoryMessage 或者 onPeerMessageReceived 和 onGroupMessageReceived 获取。
ZIM::getInstance()->replyMessage(textMessage, toOriginalMessage, config, notification, [=](/zim-rn/guides/messaging/const-std::shared_ptr<zimmessage>-&message,-const-zimerror-&errorinfo) {
    // 开发者可以通过该回调监听消息是否发送成功。
});
```
:::
:::if{props.platform="Web|UTS"}
```typescript
// 引用的源消息对象，通过 queryHistoryMessage 或者 peerMessageReceived 和 groupMessageReceived 获取。
const toOriginalMessage: ZIMMessage = {};

const config: ZIMMessageSendConfig = { 
    priority: 1, // 设置消息优先级，取值为 低：1（默认），中:2，高：3
};

const messageTextObj: ZIMMessage = { type: 1, message: '回复消息内容' };
const notification: ZIMMessageSendNotification = {
    onMessageAttached: (message: ZIMMessage) => {
        // todo: Loading
    },
    onMediaUploadingProgress: (message: ZIMMediaMessage, currentFileSize: number, totalFileSize: number) => {
        // 当发送的回复消息为富媒体消息时，可用于展示文件上传进度
    },
}

zim.replyMessage(messageTextObj, toOriginalMessage, config, notification)
    .then((res: ZIMMessageSentResult) => {
        // 发送成功
    })
    .catch((err: ZIMError) => {
        // 发送失败
    });
```
:::
:::if{props.platform="Flutter"}
```dart
// 回复内容
ZIMTextMessage textMessage = ZIMTextMessage(message: '消息内容');
ZIMMessageSendConfig config = ZIMMessageSendConfig();
// 设置消息优先级
config.priority = ZIMMessagePriority.low;
ZIMMessageSendNotification notification = ZIMMessageSendNotification();
notification.onMessageAttached = (ZIMMessage message){
// 发送前的回调，客户可以在这里获取一个临时对象，该对象与开发者创建的 zimMessage 对象属于同一对象，开发者可利用此特性做一些业务逻辑，如提前展示 UI 等
};
notification.onMediaUploadingProgress = (ZIMMessage message, int currentFileSize, int totalFileSize){
// 若发送的回复消息为媒体消息，则可以监听媒体附件的上传进度
};
// 引用的源消息对象 toOriginalMessage 可以通过 queryHistoryMessage 或者 onPeerMessageReceived 和 onGroupMessageReceived 获取。
ZIM.getInstance()?.replyMessage(textMessage, toOriginalMessage, config, notification).then((value) {
  //发送成功
}).catchError((onError){
  //发送失败
});
```
:::

## 判断消息是否回复其他消息

监听 {getPlatformData(props,onPeerMessageReceivedMap)} 和 {getPlatformData(props,onGroupMessageReceivedMap)} 回调在单聊会话和群聊会话中收到新消息后，需要通过判断消息是否存在 {getPlatformData(props,repliedInfoMap)} （源消息基本信息）：
- 如果存在，则表示这条消息是对其他消息的回复。
- 如果不存在，则表示这条消息是一条独立消息。

当您获取到 {getPlatformData(props,repliedInfoMap)} ，可用于展示源消息的发送用户、发送时间和消息内容等。

:::if{props.platform=undefined}
```java
//注册 ZIMEventHander 回调
ZIM.getInstance().setEventHandler(new ZIMEventHandler() {
    @Override
    public void onPeerMessageReceived(ZIM zim, ArrayList<ZIMMessage> messageList, ZIMMessageReceivedInfo info, String fromUserID) {
        for(ZIMMessage message : messageList) {
            if(message.repliedInfo) {
                // 此回复消息引用的源消息的基本信息，用于展示源消息的发送者、发送时间、消息内容等
            }
        }
    }

    @Override
    public void onGroupMessageReceived(ZIM zim, ArrayList<ZIMMessage> messageList, ZIMMessageReceivedInfo info, String fromGroupID) {
        for(ZIMMessage message : messageList) {
            if(message.repliedInfo) {
                // 此回复消息引用的源消息的基本信息，用于展示源消息的发送者、发送时间、消息内容等
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
             fromUserID:(NSString *)fromUserID {
     for(ZIMMessage *message in messageList) {
         if(message.repliedInfo) {
           // 此回复消息引用的源消息的基本信息，用于展示源消息的发送者、发送时间、消息内容等
         }
     }   
}

// 收到群组消息的回调
- (void)zim:(ZIM *)zim
    groupMessageReceived:(NSArray<ZIMMessage *> *)messageList
                    info:(ZIMMessageReceivedInfo *)info
             fromGroupID:(NSString *)fromGroupID {
    for(ZIMMessage *message in messageList) {
         if(message.repliedInfo) {
           // 此回复消息引用的源消息的基本信息，用于展示源消息的发送者、发送时间、消息内容等
         }
     }  
}
```
:::
:::if{props.platform="window"}
```cpp
//注册 ZIMEventHander 回调
ZIM::getInstance()->setEventHandler(shared_from_this());

// 收到单聊消息的回调
void MyClass::onPeerMessageReceived(ZIM * zim, const std::vector<std::shared_ptr<ZIMMessage>> & messageList, const ZIMMessageReceivedInfo &info, const std::string & fromUserID) {
    for(const auto &message : messageList) {
        if(message->repliedInfo) {
            // 此回复消息引用的源消息的基本信息，用于展示源消息的发送者、发送时间、消息内容等
        }
    }
}

void MyClass::onGroupMessageReceived(ZIM * zim, const std::vector<std::shared_ptr<ZIMMessage>> & messageList, const ZIMMessageReceivedInfo &info, const std::string & fromGroupID) {
    for(const auto &message : messageList) {
        if(message->repliedInfo) {
            // 此回复消息引用的源消息的基本信息，用于展示源消息的发送者、发送时间、消息内容等
        }
    }
}
```

:::
:::if{props.platform="Web"}
```typescript
// 在单聊会话接收消息
zim.on('peerMessageReceived', (zim, data) => {
    data.messageList.forEach((msg) => {
        if (msg.repliedInfo) {
            // 此回复消息引用的源消息的基本信息，用于展示源消息的发送者、发送时间、消息内容等
        }
    });
});

// 在群聊会话接收消息
zim.on('groupMessageReceived', (zim, data) => {
    data.messageList.forEach((msg) => {
        if (msg.repliedInfo) {
            // 此回复消息引用的源消息的基本信息，用于展示源消息的发送者、发送时间、消息内容等
        }
    });
});
```
:::
:::if{props.platform="UTS"}
```typescript
// 在单聊会话接收消息
zim.onPeerMessageReceived((data) => {
    data.messageList.forEach((msg) => {
        if (msg.repliedInfo) {
            // 此回复消息引用的源消息的基本信息，用于展示源消息的发送者、发送时间、消息内容等
        }
    });
});

// 在群聊会话接收消息
zim.onGroupMessageReceived((data) => {
    data.messageList.forEach((msg) => {
        if (msg.repliedInfo) {
            // 此回复消息引用的源消息的基本信息，用于展示源消息的发送者、发送时间、消息内容等
        }
    });
});
```
:::
:::if{props.platform="Flutter"}
```dart
//注册 ZIMEventHander 回调

ZIMEventHandler.onPeerMessageReceived = (ZIM zim, List<ZIMMessage> messageList, ZIMMessageReceivedInfo info, String fromUserID) {
for (ZIMMessage message in messageList) {
    if (message.repliedInfo != null) {
        // 此回复消息引用的源消息的基本信息，用于展示源消息的发送者、发送时间、消息内容等
    }
}
};

ZIMEventHandler.onGroupMessageReceived = (ZIM zim, List<ZIMMessage> messageList, ZIMMessageReceivedInfo info, String fromGroupID) {
for (ZIMMessage message in messageList) {
    if (message.repliedInfo != null) {
        // 此回复消息引用的源消息的基本信息，用于展示源消息的发送者、发送时间、消息内容等
    }
}
};
```
:::

## 获取根消息回复数

ZIM 支持主动或被动获取某条根消息的回复数。

### 主动获取

如需主动获取某条**根消息**的回复数，可直接通过 {getPlatformData(props,rootRepliedCountMap)} 获取。

### 被动获取

如需实时了解根消息收到了多少条回复，您可以监听 {getPlatformData(props,onMessageRepliedCountChangedMap)}。

:::if{props.platform=undefined}
```java
//注册 ZIMEventHander 回调
ZIM.getInstance().setEventHandler(new ZIMEventHandler() {
    
    // 监听根消息的回复数量变化
    // 事件触发时机：当有新的消息回复成功后，其回复树的根消息的回复数量会增加 1
    @Override
    public void onMessageRepliedCountChanged(
        ZIM zim, ArrayList<ZIMMessageRootRepliedCountInfo> infos) {
            // 更新会话的对应 messageID 的消息的 rootRepliedCount
        }
});
```
:::
:::if{props.platform="iOS|mac"}
```objc
//注册 ZIMEventHander 回调
[zim setEventHandler:self];

// 监听根消息的回复数量变化
// 事件触发时机：当有新的消息回复成功后，其回复树的根消息的回复数量会增加 1
- (void)zim:(ZIM *)zim messageRepliedCountChanged:(NSArray<ZIMMessageRootRepliedCountInfo *> *)infos {
    // 更新会话的对应 messageID 的消息的 rootRepliedCount
}
```
:::
:::if{props.platform="window"}
```cpp
//注册 ZIMEventHander 回调
ZIM::getInstance()->setEventHandler(shared_from_this());

// 监听根消息的回复数量变化
// 事件触发时机：当有新的消息回复成功后，其回复树的根消息的回复数量会增加 1
void MyClass::onMessageRepliedCountChanged(ZIM * zim, const std::vector<ZIMMessageRootRepliedCountInfo> & infos) {
    // 更新会话的对应 messageID 的消息的 rootRepliedCount
}
```
:::
:::if{props.platform="Web"}
```typescript
// 监听根消息的回复数量变化
// 事件触发时机：当有新的回复消息发送成功后，其回复树的根消息的回复数量会增加 1
zim.on('messageRepliedCountChanged', (zim, data) => {
    data.infos.forEach((item) => {
        // 更新会话的对应 messageID 的消息的 rootRepliedCount
    });
});
```
:::
:::if{props.platform="UTS"}
```typescript
// 监听根消息的回复数量变化
// 事件触发时机：当有新的回复消息发送成功后，其回复树的根消息的回复数量会增加 1
zim.onMessageRepliedCountChanged((data) => {
    data.infos.forEach((item) => {
        // 更新会话的对应 messageID 的消息的 rootRepliedCount
    });
});
```
:::
:::if{props.platform="Flutter"}
```dart
// 监听根消息的回复数量变化
// 事件触发时机：当有新的消息回复成功后，其回复树的根消息的回复数量会增加 1
ZIMEventHandler.onMessageRepliedCountChanged = (ZIM zim, List<ZIMMessageRootRepliedCountInfo> infos) {
// 更新会话的对应 messageID 的消息的 rootRepliedCount
};
```
:::

## 监听源消息被删除或撤回

监听 {getPlatformData(props,onMessageRepliedInfoChangedMap)} 回调，即可在某条消息被删除或被撤回时，获取该消息的下一级子消息列表，您可以在相关子消息 UI 上展示相关提示。

<Note title="说明">

即使用户在某设备删除源消息，导致子消息的 {getPlatformData(props,repliedInfoStateMap)} （其源消息的状态）为 {getPlatformData(props,ZIMMessageRepliedInfoStateMap)} ，依然可以在子消息的 {getPlatformData(props,repliedInfoMessageInfoMap)} 中获取到源消息的简要内容。因此，开发者可按需选择是否在该设备展示该源消息内容。
</Note>

:::if{props.platform=undefined}
```java
//注册 ZIMEventHander 回调
ZIM.getInstance().setEventHandler(new ZIMEventHandler() {
    
    // 监听回复消息的源消息变更事件
    // 事件触发时机：当源消息被 “删除” 和 “撤回” 后，引用其的回复消息的 repliedInfo 属性会发生改变
    @Override
    public void onMessageRepliedInfoChanged(ZIM zim, ArrayList<ZIMMessage> messageList) {
        for(ZIMMessage message : messageList) {
            if(message.repliedInfo.state == ZIMMessageRepliedInfoState.DELETED) {
                // 此回复消息引用的源消息被删除，此时可展示为“消息被删除”
            } else if (message.repliedInfo.messageInfo.type == ZIMMessageType.REVOKE) {
                // 此回复消息引用的源消息被撤回，此时可展示为“消息已撤回”
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

// 监听回复消息的源消息变更事件
// 事件触发时机：当源消息被 “删除” 和 “撤回” 后，引用其的回复消息的 repliedInfo 属性会发生改变
- (void)zim:(ZIM *)zim messageRepliedInfoChanged:(NSArray<ZIMMessage *> *)messageList {
    for(ZIMMessage *message in messageList) {
        if(message.repliedInfo.state == ZIMMessageRepliedInfoStateDeleted) {
            // 此回复消息引用的源消息被删除，此时可展示为“消息被删除”
        } else if (message.repliedInfo.messageInfo.type == ZIMMessageTypeRevoke) {
            // 此回复消息引用的源消息被撤回，此时可展示为“消息已撤回”
        }
    }
}
```
:::
:::if{props.platform="window"}
```cpp
//注册 ZIMEventHander 回调
ZIM::getInstance()->setEventHandler(shared_from_this());

// 监听回复消息的源消息变更事件
// 事件触发时机：当源消息被 “删除” 和 “撤回” 后，引用其的回复消息的 repliedInfo 属性会发生改变
void MyClass::onMessageRepliedInfoChanged(ZIM * zim, const std::vector<std::shared_ptr<ZIMMessage>> & messageList) {
    for(const auto &message : messageList) {
        if(message->repliedInfo->state == ZIM_MESSAGE_REPLIED_INFO_STATE_DELETED) {
            // 此回复消息引用的源消息被删除，此时可展示为“消息被删除”
        } else if (message->repliedInfo->messageInfo->type == ZIM_MESSAGE_TYPE_REVOKE) {
            // 此回复消息引用的源消息被撤回，此时可展示为“消息已撤回”
        }
    }
}

```
:::
:::if{props.platform="Web"}
```typescript
// 监听回复消息的源消息变更事件
// 事件触发时机：当源消息被 “删除” 和 “撤回” 后，引用其的回复消息的 repliedInfo 属性会发生改变
zim.on('messageRepliedInfoChanged', (zim, data) => {
    data.messageList.forEach((msg) => {
        if (msg.repliedInfo) {
            if (msg.repliedInfo.state != 0) {
                // 此回复消息引用的源消息被删除，此时可展示为“消息被删除”
            } else if (msg.repliedInfo.messageInfo.type == 31) {
                // 此回复消息引用的源消息被撤回，此时可展示为“消息已撤回”
            }
        }
    });
});
```
:::
:::if{props.platform="UTS"}
```typescript
// 监听回复消息的源消息变更事件
// 事件触发时机：当源消息被 “删除” 和 “撤回” 后，引用其的回复消息的 repliedInfo 属性会发生改变
zim.onMessageRepliedInfoChanged((data) => {
    data.messageList.forEach((msg) => {
        if (msg.repliedInfo) {
            if (msg.repliedInfo.state != 0) {
                // 此回复消息引用的源消息被删除，此时可展示为“消息被删除”
            } else if (msg.repliedInfo.messageInfo.type == 31) {
                // 此回复消息引用的源消息被撤回，此时可展示为“消息已撤回”
            }
        }
    });
});
```
:::
:::if{props.platform="Flutter"}
```dart
// 监听回复消息的源消息变更事件
// 事件触发时机：当源消息被 “删除” 和 “撤回” 后，引用其的回复消息的 repliedInfo 属性会发生改变
ZIMEventHandler.onMessageRepliedInfoChanged = (ZIM zim, List<ZIMMessage> messageList) {
for(ZIMMessage message in messageList) {
    if(message.repliedInfo == null) {
        // 此回复消息引用的源消息被删除，此时可展示为“消息被删除”
    } else if (message.repliedInfo?.messageInfo.type == ZIMMessageType.revoke) {
        // 此回复消息引用的源消息被撤回，此时可展示为“消息已撤回”
    }
}
};
```
:::

## 查询回复列表

调用 {getPlatformData(props,queryMessageRepliedListMap)} ，传入根消息或任意回复，即可查看完整的回复列表，了解回复相关的完整消息列表。

本接口返回的结果将区分根消息（`rootRepliedInfo`）和回复列表（`messageList`），回复列表会按照回复的发送时间从前往后排序。

:::if{props.platform=undefined}
```java
ZIMMessageRepliedListQueryConfig config = new ZIMMessageRepliedListQueryConfig();
config.count = 10; // 查询数量，上限请勿超过 100
config.nextFlag = 0; // 分页标志，首次查询填 0，后续查询以查询结果返回的 nextFlag 为准

// replyMessage 可为根消息或任意回复，一般通过 queryHistoryMessage 接口或者 onPeerMessageReceived 和 onGroupMessageReceived 获取
ZIM.getInstance().queryMessageRepliedList(replyMessage, config, new new ZIMMessageRepliedListQueriedCallback() {
    @Override
    public void onMessageRepliedListQueried(ArrayList<ZIMMessage> messageList, long nextFlag, ZIMMessageRootRepliedInfo rootRepliedInfo, ZIMError errorInfo) {
        if(errorInfo.code == ZIMErrorCode.SUCCESS) {
            // 查询成功
            // nextFlag 不为 0，表示还有数据，可继续分页查询
            // rootRepliedInfo 为根消息信息
            // messageList 表示对根消息的回复列表。
        } else {
            // 查询失败
        }
    }
});
```
:::
:::if{props.platform="iOS|mac"}
```objc
ZIMMessageRepliedListQueryConfig *config = [[ZIMMessageRepliedListQueryConfig alloc] init];
config.count = 10; // 查询数量，上限请勿超过 100
config.nextFlag = 0; // 分页标志，首次查询填 0，后续查询以查询结果返回的 nextFlag 为准

// replyMessage 可为根消息或任意一条回复链上的消息，一般通过 queryHistoryMessageByConversationID 接口或者 peerMessageReceived 和 groupMessageReceived 获取
[[ZIM getInstance] queryMessageRepliedListByMessage:replyMessage config:config callback:^(NSArray<ZIMMessage *> * _Nonnull messageList, long long nextFlag, ZIMMessageRootRepliedInfo * _Nonnull rootRepliedInfo, ZIMError * _Nonnull errorInfo){
        if(errorInfo.code == ZIMErrorCodeSuccess) {
            // 查询成功
            // nextFlag 不为 0，表示还有数据，可继续分页查询
            // rootRepliedInfo 为根消息信息
            // messageList 表示对根消息的回复列表。
        } else {
            // 查询失败
        }
}];
```
:::
:::if{props.platform="window"}
```cpp
ZIMMessageRepliedListQueryConfig config;
config.count = 10; // 查询数量，上限请勿超过 100
config.nextFlag = 0; // 分页标志，首次查询填 0，后续查询以查询结果返回的 nextFlag 为准

// replyMessage 可为根消息或任意回复，一般通过 queryHistoryMessage 接口或者 onPeerMessageReceived 和 onGroupMessageReceived 获取
ZIM::getInstance()->queryMessageRepliedList(replyMessage, config, [=](/zim-rn/guides/messaging/const-std::vector<std::shared_ptr<zimmessage>>-&messagelist,-long-long-nextflag,-const-zimmessagerootrepliedinfo-&rootrepliedinfo,-const-zimerror-&errorinfo){
    if(errorInfo.code == ZIM_ERROR_CODE_SUCCESS) {
        // 查询成功
        // nextFlag 不为 0，表示还有数据，可继续分页查询
        // rootRepliedInfo 为根消息信息
        // messageList 表示对根消息的回复列表。
     } else {
        // 查询失败
     }
});

```
:::
:::if{props.platform="Web|UTS"}
```typescript
const replyMessage: ZIMMessage = {}; // 可为根消息或任意回复，一般通过 queryHistoryMessage 接口或者 peerMessageReceived 和 groupMessageReceived 获取

const config: ZIMMessageRepliedListQueryConfig = {
    count: 10, // 查询数量，上限请勿超过 100
    nextFlag: 0, // 分页标志，首次查询填 0，后续查询以查询结果返回的 nextFlag 为准
};

zim.queryMessageRepliedList(replyMessage, config)
    .then((res: ZIMMessageRepliedListQueriedResult) => {
        // 查询成功
        // res.nextFlag 不为 0，表示还有数据，可继续分页查询
        // res.rootRepliedInfo 为根消息信息
        // res.messageList 表示对根消息的回复列表。
    })
    .catch((err: ZIMError) => {
        // 查询失败
    });
```
:::
:::if{props.platform="Flutter"}
```dart
ZIMMessageRepliedListQueryConfig config = ZIMMessageRepliedListQueryConfig();
config.count = 10; // 查询数量，上限请勿超过 100
config.nextFlag = 0; // 分页标志，首次查询填 0，后续查询以查询结果返回的 nextFlag 为准

// replyMessage 可为根消息或任意回复，一般通过 queryHistoryMessage 接口或者 onPeerMessageReceived 和 onGroupMessageReceived 获取
ZIM.getInstance()?.queryMessageRepliedList(replyMessage, config).then((value) {
// 查询成功
// nextFlag 不为 0，表示还有数据，可继续分页查询
// rootRepliedInfo 为根消息信息
// messageList 表示对根消息的回复列表。
}).onError((error, stackTrace) {
if(error is PlatformException){
    // 查询失败
    error.code;
    error.message;
}
});
```
:::

<Note title="说明">

- 查询消息回复列表时，只要是同一个回复树上的消息对象，无论是传其根消息对象还是任一消息对象，只要 nextFlag 填 0 就是从根消息开始按消息发送时间升序查询；
- 由于 `rootRepliedInfo` 中的 `message` 是可空的对象，当 `state` 为 `Deleted` 时，代表根消息已被删除，此时开发者应在 UI 上提示 “根消息已被删除”；当 `state` 为 `NotFound` 时，代表无法再找到该条根消息，可能原因是消息已超出服务端存储时间，或者群组用户进群后查询回复列表但根消息是其进群前发的，因此该消息可能已不能再拉取，此时开发者应在 UI 上提示 “根消息已无法定位” 等提示性语句。
</Note>

## 查看源消息的上下文

由于子消息（即作为回复的消息）的 {getPlatformData(props,repliedInfoMap)} 仅包含可用于 UI 展示的基本源消息数据，用户可能需要前往源消息的原文位置，阅读源消息附近的其他消息。

因此，如需实现此场景，需要借助子消息的 {getPlatformData(props,repliedInfoMessageInfoMap)} （源消息在会话中的序号）属性。

<Note title="说明">

子消息的 {getPlatformData(props,repliedInfoMessageInfoMap)}（源消息在会话中的序号）属性，对应源消息的 {getPlatformData(props,messageSeqZIMMessageMap)}。
</Note>

根据源消息及其附近消息是否缓存于应用内存，ZIM 提供了两种实现方案。

### 源消息及其附近均缓存于应用内存

当某条源消息及其上下文消息都保存于您应用的内存中时（比如，此前以调用 {getPlatformData(props,queryHistoryMessageMap)} 获取并缓存了会话历史消息），您可在内存检索该源消息的 {getPlatformData(props,messageSeqZIMMessageMap)} ，自行实现前往源消息原文位置查看上下文的业务逻辑。

### 源消息或其附近的消息没有缓存于应用内存

当应用内存中没有源消息或其附近的消息时，此时，会话中若有其他用户回复了该源消息，即可：
1. 从该消息的 {getPlatformData(props,repliedInfoMessageInfoMap)} 获取到源消息的 {getPlatformData(props,messageSeqZIMMessageMap)} 并作为参数，传入 {getPlatformData(props,queryMessagesMap)} 获取源消息的完整 {getPlatformData(props,ZIMMessageMap)} 对象。


:::if{props.platform=undefined}
```java
// messageSeq 为源消息的在会话中的序号
ArrayList<Long> messageSeqs = new ArrayList<>();
messageSeqs.add(messageSeq);
ZIM.getInstance().queryMessages(messageSeqs, "YOUR_CONVERSATION_ID", conversationType, new ZIMMessageQueriedCallback() {
    @Override
    public void onMessageQueried(String conversationID, ZIMConversationType conversationType, ArrayList<ZIMMessage> messageList, ZIMError errorInfo) {
        if(errorInfo.code == ZIMErrorCode.SUCCESS) {
            // 查询成功
        } else {
            // 查询失败
        }
    }
});    
```
:::
:::if{props.platform="iOS|mac"}
```objc
// messageSeq 为源消息的在会话中的序号
NSArray *messageSeqs = @[@(messageSeq)];
[[ZIM getInstance] queryMessagesByMessageSeqs:messageSeqs conversationID:@"YOUR_CONVERSATION_ID" conversationType:conversationType callback:^(NSString *conversationID, ZIMConversationType conversationType, NSArray<ZIMMessage *> *messageList, ZIMError *errorInfo) {
    if(error.code == ZIMErrorCodeSuccess) {
        // 查询成功
    } else {
        // 查询失败
    }
}];
```
:::
:::if{props.platform="window"}
```cpp
// messageSeq 为源消息的在会话中的序号
std::vector<long long> messageSeqs = {messageSeqs};
ZIM::getInstance()->queryMessages(messageSeqs, "YOUR_CONVERSATION_ID", conversationType, [=](/zim-rn/guides/messaging/const-std::string-&conversationid,-zimconversationtype-conversationtype,-const-std::vector<std::shared_ptr<zimmessage>>-&messagelist,-const-zimerror-&errorinfo) {
    if(errorInfo.code == ZIM_ERROR_CODE_SUCCESS) {
            // 查询成功
     } else {
            // 查询失败
     }
});
```
:::
:::if{props.platform="Web|UTS"}
```typescript
const messageSeqs = [1]; // messageSeq 为源消息的在会话中的序号

const conversationID = '';
const conversationType = 0; // 会话类型，取值为 单聊：0，群组：2

zim.queryMessages(messageSeqs, conversationID, conversationType)
    .then((res: ZIMMessageQueriedResult) => {
        // 查询成功
    })
    .catch((err: ZIMError) => {
        // 查询失败
    });
```
:::
:::if{props.platform="Flutter"}
```dart
// messageSeq 为源消息的在会话中的序号
List<int> messageSeqs = [123456];
ZIM.getInstance()?.queryMessages(messageSeqs, 'conversationID', ZIMConversationType.peer).then((value) {
    // 查询成功
}).catchError((onError){
    if(onError is PlatformException){
        // 查询失败
        error.code;
        error.message;
    }
}); 
```
:::

2. 将源消息对象作为 {getPlatformData(props,nextMessageMap)} 参数，传入 {getPlatformData(props,queryHistoryMessageMap)} ，即可以该源消息为锚点，从该源消息往前或往后获取其附近的消息列表，用于 UI 渲染。

:::if{props.platform=undefined}
```java
// 本示例以源消息往后查询为例
ZIMMessageQueryConfig config = new ZIMMessageQueryConfig();
// originalMessage 为通过 queryMessages 获取到的源消息对象
config.nextMessage = originalMessage;
config.count = 20;
config.reverse = false;
ZIM.getInstance().queryHistoryMessage("YOUR_CONVERSATION_ID", conversationType, config, new ZIMMessageQueriedCallback() {
    @Override
    public void onMessageQueried(String conversationID, ZIMConversationType conversationType, ArrayList<ZIMMessage> messageList, ZIMError errorInfo) {
        if(errorInfo.code == ZIMErrorCode.SUCCESS) {
            // 查询成功
        } else {
            // 查询失败
        }
    }
});
```
:::
:::if{props.platform="iOS|mac"}
```objc
// 本示例以源消息往后查询为例
ZIMMessageQueryConfig *config = [[ZIMMessageQueryConfig alloc] init];
// originalMessage 为通过 queryMessagesByMessageSeqs 获取到的源消息对象
config.nextMessage = originalMessage;
config.count = 20;
config.reverse = NO;
[[ZIM getInstance] queryHistoryMessageByConversationID:@"YOUR_CONVERSATION_ID" conversationType:conversationType config:config callback:^(NSString *conversationID, ZIMConversationType conversationType, NSArray<ZIMMessage *> *messageList, ZIMError *errorInfo) {
    if(error.code == ZIMErrorCodeSuccess) {
        // 查询成功
    } else {
        // 查询失败
    }
}];
```
:::
:::if{props.platform="window"}
```cpp
// 本示例以源消息往后查询为例
ZIMMessageQueryConfig config;
// originalMessage 为通过 queryMessagesByMessageSeqs 获取到的源消息对象
config.nextMessage = originalMessage;
config.count = 20;
config.reverse = false;
ZIM::getInstance()->queryHistoryMessage("YOUR_CONVERSATION_ID", conversationType, config, [=](/zim-rn/guides/messaging/const-std::string-&conversationid,-zimconversationtype-conversationtype,-const-std::vector<std::shared_ptr<zimmessage>>-&messagelist,-const-zimerror-&errorinfo) {
    if(errorInfo.code == ZIM_ERROR_CODE_SUCCESS) {
            // 查询成功
     } else {
            // 查询失败
     }
});
```

:::
:::if{props.platform="Web|UTS"}
```typescript
// 本示例以源消息往后查询为例
const originalMessage: ZIMMessage = {};
const config: ZIMMessageQueryConfig = {
    // originalMessage 为通过 queryMessages 获取到的源消息对象
    nextMessage: originalMessage,
    count: 20,
    reverse: false,
};

const conversationID = '';
const conversationType = 0;

zim.queryHistoryMessage(conversationID, conversationType, config)
    .then((res: ZIMMessageQueriedResult) => {
        //查询成功
    })
    .catch((err: ZIMError) => {
        // 查询失败
    });
```
:::
:::if{props.platform="Flutter"}
```dart
// 本示例以源消息往后查询为例
ZIMMessageQueryConfig config = ZIMMessageQueryConfig();
// originalMessage 为通过 queryMessages 获取到的源消息对象
config.nextMessage = originalMessage;
config.count = 20;
config.reverse = false;
ZIM.getInstance()?.queryHistoryMessage("YOUR_CONVERSATION_ID", ZIMConversationType.peer, config).then((value) {
    // 查询成功
}).catchError((onError){
    if(onError is PlatformException){
        // 查询失败
    }
});
```
:::
<Content platform="Web" />