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

export const ZIMCombineMessageMap = {
  'Android': <a href="@-ZIMCombineMessage" target='_blank'>ZIMCombineMessage</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMCombineMessage-class.html" target='_blank'>ZIMCombineMessage</a>,
}
export const sendMessageMap = {
  'Android': <a href="@sendMessage" target='_blank'>sendMessage</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/sendMessage.html" target='_blank'>sendMessage</a>,
}
export const queryCombineMessageDetailMap = {
  'Android': <a href="@queryCombineMessageDetail" target='_blank'>queryCombineMessageDetail</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/queryCombineMessageDetail.html" target='_blank'>queryCombineMessageDetail</a>,
  'iOS': <a href="@queryCombineMessageDetailByMessage" target='_blank'>queryCombineMessageDetail</a>,
}
export const ZIMCombineMessageDetailQueriedCallbackMap = {//错误链接
  'Android': <a href="@-ZIMCombineMessageDetailQueriedCallback" target='_blank'>ZIMCombineMessageDetailQueriedCallback</a>,
  'Web,UTS': <a href="@-ZIMCombineMessageDetailQueriedResult" target='_blank'>ZIMCombineMessageDetailQueriedResult</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMCombineMessageDetailQueriedResult-class.html" target='_blank'>ZIMCombineMessageDetailQueriedResult</a>,
  'iOS': <a href="@ZIMCombineMessageDetailQueriedCallback" target='_blank'>ZIMCombineMessageDetailQueriedCallback</a>,
}


# 转发消息

- - -

## 功能简介

ZIM SDK 支持实现以下两种形式的消息转发：
- 合并消息后转发。
- 逐条消息转发。

## 收发合并消息

<Note title="说明">

- 仅 2.14.0 及以上版本的 ZIM SDK 支持发送合并类型消息，接收并查看合并类型消息的内容。
- 如果接收端的 SDK 版本介乎 [2.0.0, 2.14.0) 区间，可以收到合并消息时，但会显示此消息类型为未知，且无法获取信息内容。如需获取此条消息，请将 SDK 升级为 2.14.0 或以上版本。
- 如果接收端的 SDK 版本为 1.x.x 版本，则无法收到合并消息，也不会收到合并消息。
</Note>

<Frame width="60%" height="auto" >
  <img src="https://media-resource.spreading.io/docuo/workspace564/27e54a759d23575969552654cb45bf89/b6034e2b18.png" alt="ZIMCombineMessage_zh.png"/>
</Frame>

### 发送合并消息

发送合并消息步骤如下：

1. 通过 {getPlatformData(props,ZIMCombineMessageMap)} 对象构造合并消息体。
    <Note title="说明">

    ZIM SDK 支持在合并消息内包含其他合并消息。
    </Note>

2. 调用 {getPlatformData(props,sendMessageMap)} 接口发送合并消息。开发者可参考 [收发普通消息 - 发送消息](/zim-miniprogram/guides/messaging/send-and-receive-messages#发送消息) 了解此接口参数详情。

以下为用户在单聊会话中发送合并消息的示例代码：


:::if{props.platform=undefined}
```java
// 在单聊会话发送合并信息

ZIMConversationType type = PEER; // 会话类型，取值为 单聊：0，房间：1，群组：2
ZIMMessageSendConfig config = new ZIMMessageSendConfig();

// 需要合并转发的原始消息列表，可从历史消息中获取
ArrayList<ZIMMessage> messageList = new ArrayList<>();
messageList.add(message1);
messageList.add(message2);

ZIMCombineMessage combineMessage = new ZIMCombineMessage("标题", "概要", messageList);

zim.sendMessage(combineMessage,"conv_id", type, config, new ZIMMessageSentCallback() {
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

:::if{props.platform="iOS"}
```objc
// 在单聊会话发送合并信息
ZIMConversationType type = ZIMConversationTypePeer; // 会话类型，取值为 单聊：0，房间：1，群组：2
ZIMMessageSendConfig *config = [[ZIMMessageSendConfig alloc] init];

// 需要合并转发的原始消息列表，可从历史消息中获取
NSMutableArray<ZIMMessage *> *messageList = [NSMutableArray array];
[messageList addObject:message1];
[messageList addObject:message2];

ZIMCombineMessage *combineMessage = [[ZIMCombineMessage alloc] initWithTitle:@"标题" summary:@"概要" messages:messageList];

[zim sendMessage:combineMessage conversationId:@"conv_id" type:type config:config callback:^(ZIMMessage *zimMessage, ZIMError *error) {
    if (error) {
        // 开发者可以通过该回调监听消息是否发送成功。
    }
}];
```

:::
:::if{props.platform="window"}
```cpp
// 在单聊会话发送合并信息
ZIMConversationType type = ZIM_CONVERSATION_TYPE_PEER; // 会话类型，取值为 单聊：0，房间：1，群组：2
ZIMMessageSendConfig config;

// 需要合并转发的原始消息列表，可从历史消息中获取
std::vector<std::shared_ptr<ZIMMessage>> messageList;
messageList.push_back(message1);
messageList.push_back(message2);

std::shared_ptr<ZIMCombineMessage> combineMessage = std::make_shared<ZIMCombineMessage>("标题", "概要", messageList);

zim_->sendMessage(
    combineMessage, "conv_id", type, config,
    std::make_shared<zim::ZIMMessageSendNotification>(
        [=](/zim-miniprogram/guides/messaging/const-std::shared_ptr<zim::zimmessage>-&message) {
            if (message) {
                // 开发者可以通过该回调，监听消息是否开始准备发送。只有当通过本地基础参数检验的消息才会抛出该回调，否则通过 onMessageSent 回调抛出错误。
            }
        }),
    [=](/zim-miniprogram/guides/messaging/std::shared_ptr<zim::zimmessage>-message,-zim::zimerror-errorinfo) {
        // 开发者可以通过该回调监听消息是否发送成功。
        if (errorInfo.code == zim::ZIMErrorCode::ZIM_ERROR_CODE_SUCCESS) {

        }
    });
```
:::
:::if{props.platform="Flutter"}
```dart
// 在单聊会话发送合并信息

try {
    // 会话类型，取值为 单聊：peer，房间：room，群组：group
    ZIMConversationType type = ZIMConversationType.peer;
    ZIMMessageSendConfig config = ZIMMessageSendConfig();
    // 需要合并转发的原始消息列表，可从历史消息中获取
    List<ZIMMessage> messageList = [message1,message2];
    ZIMCombineMessage combineMessage = ZIMCombineMessage(title: '标题', summary: '概要', messageList: messageList);
    ZIMMessageSentResult result = await ZIM.getInstance()!.sendMessage(combineMessage, 'conv_id', type, config);
    //  消息发送成功
} on PlatformException catch (onError){
    onError.code;//根据错误码表处理
    onError.message;//错误信息
}
```

:::
:::if{props.platform="Web|UTS"}
```typescript
// 在单聊会话发送合并信息

const toConversationID = ''; // 对方 userID
const conversationType = 0; // 会话类型，取值为 单聊：0，房间：1，群组：2
const config: ZIMMessageSendConfig = { 
    priority: 1, // 设置消息优先级，取值为 低：1（默认），中:2，高：3
};

const messageCombineObj: ZIMMessage = {
    type: 100, 
    title: '标题', // 合并消息标题
    summary: '概要' , // 合并消息概要
    messageList: [message1, message2], // 需要合并转发的原始消息列表，可从历史消息中获取
};

const notification: ZIMMessageSendNotification = {
    onMessageAttached: (message: ZIMMessage) => {
        // todo: Loading
    }
}

zim.sendMessage(messageCombineObj, toConversationID, conversationType, config, notification)
    .then((res: ZIMMessageSentResult) => {
        // 发送成功
    })
    .catch((err: ZIMError) => {
        // 发送失败
    });
```
:::

### 接收合并消息

接收合并消息的回调接口与接收普通消息的回调接口一致，请参考 [收发普通消息 - 接收消息](/zim-miniprogram/guides/messaging/send-and-receive-messages#接收消息) 了解具体接口。

<Warning title="注意">

接收消息回调仅返回合并消息的标题、概要、合并 ID 的信息，如需了解合并消息内容，请参考 <a href="#查看合并消息详情">查看合并消息详情。</a> 
</Warning>

以下为用户在单聊会话中接收合并消息的示例代码：


:::if{props.platform=undefined}
```java
// 用户在单聊会话中接收合并消息
@Override
    public void onPeerMessageReceived(ZIM zim, ArrayList<ZIMMessage> messageList,
                                        ZIMMessageReceivedInfo info, String fromUserID) {
        for (ZIMMessage message : messageList) {
            if (message.getType() == ZIMMessageType.COMBINE){
                // 合并消息
            }
        }
    }
```

:::

:::if{props.platform="iOS"}
```objc
// 用户在单聊会话中接收合并消息
- (void)zim:(ZIM *)zim
    peerMessageReceived:(NSArray<ZIMMessage *> *)messageList
            info:(ZIMMessageReceivedInfo *)info
            fromUserID:(NSString *)fromUserID {
    for (ZIMMessage *message in messageList) {
        if ([message type] == ZIMMessageTypeCombine) {
            // 合并消息
        }
    }
}

```

:::
:::if{props.platform="window"}
```cpp
// 用户在单聊会话中接收合并消息
void onPeerMessageReceived(ZIM& zim, std::vector<ZIMMessage>& messageList, 
                              ZIMMessageReceivedInfo info,
                              std::string fromUserID) {
    for (ZIMMessage& message : messageList) {
        if (message.type == ZIMMessageType::ZIM_MESSAGE_TYPE_COMBINE) {
            // 合并消息
        }
    }
}
```
:::
:::if{props.platform="Flutter"}
```dart
// 用户在单聊会话中接收合并消息
ZIMEventHandler.onPeerMessageReceived = (ZIM zim, List<ZIMMessage> messageList, ZIMMessageReceivedInfo info, String fromUserID){
    for(ZIMMessage message in messageList){
    if(message.type == ZIMMessageType.combine){
        // 合并消息
    }
    }
};
```

:::
:::if{props.platform="Web"}
```typescript
// 用户在单聊会话中接收合并消息
zim.on('peerMessageReceived', (zim, data) => {
    data.messageList.forEach((msg) => {
        // 收到 `Combine` 消息时
        if (msg.type == 100) {
        }
    })
});
```
:::
:::if{props.platform="UTS"}
```typescript
// 用户在单聊会话中接收合并消息
zim.onPeerMessageReceived((data) => {
    data.messageList.forEach((msg) => {
        // 收到 `Combine` 消息时
        if (msg.type == 100) {
        }
    })
});
```
:::


### 查看合并消息详情

消息操作（监听、增加以及拉取历史消息）只会返回合并消息的标题、概要、合并 ID 的信息。因此，当需要了解合并消息包含的子消息时，可以通过调用 {getPlatformData(props,queryCombineMessageDetailMap)} 接口查询。

操作的结果将通过 {getPlatformData(props,ZIMCombineMessageDetailQueriedCallbackMap)} 返回，可知合并消息下具体的子消息内容。


:::if{props.platform=undefined}

```java
zim.queryCombineMessageDetail(combineMessage, new ZIMCombineMessageDetailQueriedCallback() {
            @Override
            public void onCombineMessageDetailQueried(ZIMCombineMessage message, ZIMError error) {
                // 查看合并消息，具体的子消息在回调中的 message 的 messageList 里。
            }
        });
```
:::
:::if{props.platform="iOS"}

```objc
[zim queryCombineMessageDetailByMessage:combineMessage callback:^(ZIMCombineMessage * _Nonnull message, ZIMError * _Nonnull errorInfo) {
        // 查看合并消息，具体的子消息在回调中的 message 的 messageList 里。
    }];
```
:::
:::if{props.platform="window"}
```cpp
zim_->queryCombineMessageDetail(combineMessage, [=](/zim-miniprogram/guides/messaging/const-std::shared_ptr<zimcombinemessage>-&message,-zimerror-&errorinfo) {
    // 查看合并消息，具体的子消息在回调 message 里的 messageList 中。
});
```
:::
:::if{props.platform="Flutter"}
```dart
try {
    // 会话类型，取值为 单聊：peer，房间：room，群组：group
    ZIMCombineMessageDetailQueriedResult result = await ZIM.getInstance()!.queryCombineMessageDetail(combineMessage);
    // 查看合并消息，具体的子消息在回调中的 message 的 messageList 里。
    result.message.messageList;
    //  消息发送成功
} on PlatformException catch (onError){
    onError.code;//根据错误码表处理
    onError.message;//错误信息
}
```
:::
:::if{props.platform="Web|UTS"}
```typescript
zim.queryCombineMessageDetail(message)
    .then((res: ZIMCombineMessageDetailQueriedResult) => {
        // 操作成功，在 UI 上更新该消息的子消息列表
        // 具体的子消息在回调中的 message 的 messageList 里。
        console.log(res.message.messageList)
    })
    .catch((err: ZIMError) => {
        // 操作失败
    });
```
:::

若子消息列表中存在合并消息，要想获取该合并消息下的具体子消息，需再次调用 {getPlatformData(props,queryCombineMessageDetailMap)} 接口，将通过接口获取到的合并消息作为参数，以此类推，对于嵌套多层的合并消息会存在多次调用的情况。

## 逐条转发消息

逐条转发消息本质上就是将已发送成功的消息作为参数发送到其他会话，与发送普通消息所用接口相同，开发者可参考 [收发普通消息 - 发送消息](/zim-miniprogram/guides/messaging/send-and-receive-messages#发送消息) 了解此接口参数详情。


<Content platform="Web" />