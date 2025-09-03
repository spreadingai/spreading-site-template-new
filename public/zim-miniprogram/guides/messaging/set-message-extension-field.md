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

export const ZIMMessageMap = {
  'Android': <a href="@-ZIMMessage" target='_blank'>ZIMMessage</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMMessage-class.html" target='_blank'>ZIMMessage</a>,
}
export const extendedDataMap = {
  'Android': <a href="@extendedData-ZIMMessage" target='_blank'>extendedData</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMMessage/extendedData.html" target='_blank'>extendedData</a>,
}
export const sendMessageMap = {
  'Android': <a href="@sendMessage" target='_blank'>sendMessage</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/sendMessage.html" target='_blank'>sendMessage</a>,
}
export const localExtendedDataMap = {
  'Android': <a href="@localExtendedData" target='_blank'>localExtendedData</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMMessage/localExtendedData.html" target='_blank'>localExtendedData</a>,
}
export const updateMessageLocalExtendedDataMap = {
  'Android': <a href="@updateMessageLocalExtendedData" target='_blank'>updateMessageLocalExtendedData</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/updateMessageLocalExtendedData.html" target='_blank'>updateMessageLocalExtendedData</a>,
}



# 设置消息拓展字段

- - -

:::if{props.platform="U3d"}

<Note title="说明">
本文档适用于开发以下平台应用：iOS、Android、macOS、Windows。
</Note>
:::

## 功能简介

ZIM SDK 支持用户在消息中添加拓展字段，作为消息的附加内容发送。根据同步效果，消息拓展字段可分为对端可见类型和仅本端可见类型。消息扩展字段可用于展示消息的翻译状态及翻译内容、展示消息携带业务逻辑等。

## 实现方法

### 设置对端可见的拓展字段

1. 创建 ZIM 实例。
2. 登录 ZIM SDK。
3. 构造 {getPlatformData(props,ZIMMessageMap)} 对象，并在 {getPlatformData(props,ZIMMessageMap)} 对象里填入 {getPlatformData(props,extendedDataMap)} 字段作为对端可见的消息拓展字段。
4. 调用 {getPlatformData(props,sendMessageMap)} 接口，传入 {getPlatformData(props,ZIMMessageMap)} 对象，发送消息和拓展字段。

:::if{props.platform=undefined}
<CodeGroup>
```java title="示例代码"
// 设置会话 ID
String toConversationID = "xxxx1";

// 构造 ZIMMessage 对象
ZIMTextMessage zimMessage = new ZIMTextMessage();
zimMessage.message = "消息内容";
// 需要发送的拓展字段
zimMessage.extendedData = "消息拓展字段";

ZIMMessageSendConfig config = new ZIMMessageSendConfig();
// 设置消息优先级
config.priority = ZIMMessagePriority.LOW;

// 设置发送的会话类型
// 发送单聊信息
ZIMConversationType type = ZIMConversationType.Peer;

// 发送消息

zim.sendMessage(zimMessage, toConversationID, type, config, new ZIMMessageSentCallback() {
    @Override
    public void onMessageAttached(ZIMMessage zimMessage) {

    }

    @Override
    public void onMessageSent(ZIMMessage zimMessage, ZIMError error) {
        // 开发者可以通过该回调监听消息是否发送成功。
    }
});
```
</CodeGroup>

:::
:::if{props.platform="Flutter"}
<CodeGroup>
```dart title="示例代码"
// 发送信息
ZIMTextMessage textMessage = ZIMTextMessage(message: "message");
textMessage.extendedData = @"拓展字段";  // 需要发送的拓展字段
ZIMMessageSendConfig sendConfig = ZIMMessageSendConfig();
// 设置消息优先级
sendConfig.priority = ZIMMessagePriority.low;

ZIMMessageSendNotification notification = ZIMMessageSendNotification(onMessageAttached: (message){
    // 发送前的回调，客户可以在这里获取一个临时对象，该对象与开发者创建的 zimMessage 对象属于同一对象，开发者可利用此特性做一些业务逻辑，如提前展示 UI 等
});

// 设置会话类型，选择其一向对应的会话类型发送消息
ZIMConversationType type = ZIMConversationType.peer;

ZIM.getInstance()!.sendMessage(textMessage, toConversationID, type, sendConfig).then((value) => {
    // 开发者可以通过该回调监听消息是否发送成功。
}).catchError((onError){
    // 开发者可以捕获发送失败的异常。
});

```
</CodeGroup>
:::
:::if{props.platform="iOS|mac"}
<CodeGroup>
```objc title ="示例代码"
NSString *toConversationID = @"xxxx1";

ZIMTextMessage *textMessage = [[ZIMTextMessage alloc] init];
textMessage.message = @"消息内容";
textMessage.extendedData = @"拓展字段";    // 需要发送的拓展字段

ZIMMessageSendConfig *config = [[ZIMMessageSendConfig alloc] init];

ZIMMessageSendNotification *notification = [[ZIMMessageSendNotification alloc] init];
notification.onMessageAttached = ^(ZIMMessage * _Nonnull message) {
    // 发送前的回调，客户可以在这里获取一个临时对象，该对象与开发者创建的 zimMessage 对象属于同一对象，开发者可利用此特性做一些业务逻辑，如提前展示 UI 等
};

// 设置会话类型，选择其一向对应的会话类型发送消息
ZIMConvesationType type = ZIMConversationTypePeer;

// 发送消息
[self.zim sendMessage:textMessage toConversationID:toConversationID conversationType:type config:config notification:notification callback:^((ZIMMessage * _Nonnull message, ZIMError * _Nonnull errorInfo)) {
    // 开发者可以通过该回调监听消息是否发送成功。
}];
```
</CodeGroup>
:::
:::if{props.platform="window"}
<CodeGroup>
```cpp title="示例代码"
zim::ZIMMessage* message = nullptr;
zim::ZIMTextMessage text_message;
text_message.message = "message";
// 需要发送的拓展字段
text_message.extendedData = "extendedData";
// 设置消息优先级
zim::ZIMMessageSendConfig config;
config.priority = zim::ZIM_MESSAGE_PRIORITY_LOW;
message = &text_message;

// 设置会话类型
zim::ZIMConversationType type = zim::ZIMConversationType::ZIM_CONVERSATION_TYPE_PEER

auto notification = std::make_shared<zim::ZIMMessageSendNotification>(
            [=](/zim-miniprogram/guides/messaging/const-std::shared_ptr<zim::zimmessage>-&message) { int i = 0; });

zim_->sendMessage(message, "toConversationID", type, config, notification,
                    [=](/zim-miniprogram/guides/messaging/const-std::shared_ptr<zim::zimmessage>-&message,-const-zim::zimerror-&errorinfo) { int i = 0; });
```
</CodeGroup>
:::
:::if{props.platform="U3d"}
<CodeGroup>
```cs title="示例代码"
// 设置消息拓展字段
string toConversationID = "xxxx1";

ZIMTextMessage zimMessage = new ZIMTextMessage();
zimMessage.message = "消息内容";
// 需要发送的拓展字段
zimMessage.extendedData = "消息拓展字段";

ZIMMessageSendConfig config = new ZIMMessageSendConfig();
// 设置消息优先级
config.priority = ZIMMessagePriority.Low;

// 设置发送的会话类型
ZIMConversationType type = ZIMConversationType.Peer;

// 发送消息
ZIMMessageSendNotification notification = new ZIMMessageSendNotification();
ZIM.GetInstance().SendMessage(zimMessage, toConversationID, type, config, notification,
    (ZIMMessage message, ZIMError errorInfo) =>
{
    //消息发送的回调结果
});
```

</CodeGroup>
:::
:::if{props.platform="Web|UTS"}
<CodeGroup>
```typescript title="示例代码"
// 发送单聊 `Text` 信息

const toConversationID = ''; // 对方 userID
const conversationType = 0; // 会话类型，取值为 单聊:0, 房间:1, 群组:2
const config: ZIMMessageSendConfig = {
    priority: 1, // 设置消息优先级，取值为 低:1 默认, 中:2, 高:3
};

const messageTextObj: ZIMMessage = { type: 1, message: '文本消息内容', extendedData: '消息的扩展信息（可选）' };
const notification: ZIMMessageSendNotification = {
    onMessageAttached: (message: ZIMMessage) => {
        // todo: Loading
    }
}

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

### 设置仅本端可见的拓展字段

以下为发送消息时的设置流程：

1. 登录 ZIM SDK 后，构造 {getPlatformData(props,ZIMMessageMap)} 对象，并在 {getPlatformData(props,ZIMMessageMap)} 对象里填入 {getPlatformData(props,localExtendedDataMap)} 字段作为仅本端可见的本地拓展字段（下文称为“本地拓展字段”）。
2. 调用 {getPlatformData(props,sendMessageMap)} 接口，传入 {getPlatformData(props,ZIMMessageMap)} 对象，发送消息和拓展字段。


:::if{props.platform=undefined}
<CodeGroup>
```java title="示例代码"
// 1. 设置消息的本地拓展字段

// 设置会话 ID
String toConversationID = "xxxx1";

// 构造 ZIMMessage 对象
ZIMTextMessage zimMessage = new ZIMTextMessage();
zimMessage.message = "消息内容";
// 设置消息的本地拓展字段
zimMessage.localExtendedData = "消息本地拓展字段";

ZIMMessageSendConfig config = new ZIMMessageSendConfig();
// 设置消息优先级
config.priority = ZIMMessagePriority.LOW;

// 设置发送的会话类型
// 发送单聊信息
ZIMConversationType type = ZIMConversationType.Peer;

// 发送群聊信息
// ZIMConversationType type = ZIMConversationType.Gourp;

// 发送房间信息
// ZIMConversationType type = ZIMConversationType.Room;

// 2. 发送消息
zim.sendMessage(zimMessage, toConversationID, type, config, new ZIMMessageSentCallback() {
    @Override
    public void onMessageAttached(ZIMMessage zimMessage) {

    }

    @Override
    public void onMessageSent(ZIMMessage zimMessage, ZIMError error) {
        // 开发者可以通过该回调监听消息是否发送成功。
    }
});

```
</CodeGroup>
:::
:::if{props.platform="Flutter"}
<CodeGroup>
```dart title="示例代码"

  // 1. 设置消息的本地拓展字段

  // 设置会话 ID
  String toConversationID = "xxx1";

  // 构造 ZIMMessage 对象
  ZIMTextMessage zimTextMessage = ZIMTextMessage(message: 'message');

  // 设置消息的本地拓展字段
  zimTextMessage.localExtendedData = "消息本地拓展字段";

  ZIMMessageSendConfig config = ZIMMessageSendConfig();

  // 设置消息优先级
  config.priority = ZIMMessagePriority.low;

  // 发送单聊信息
  ZIMConversationType type = ZIMConversationType.peer;

  // 发送群聊信息
  ZIMConversationType type = ZIMConversationType.group;

  // 发送房间信息
  ZIMConversationType type = ZIMConversationType.room;

  // 2. 发送消息
  ZIM.getInstance()!.sendMessage(zimTextMessage, 'toConversationID', type, config).then((value) {

  }).catchError((onError){

  });

```
</CodeGroup>
:::
:::if{props.platform="iOS|mac"}
<CodeGroup>
```objc title="示例代码"
// 1. 设置消息的本地拓展字段

// 设置会话 ID
NSString *toConversationID = @"xxx1";

// 构造消息对象
ZIMTextMessage *zimTextMessage = [[ZIMTextMessage alloc] initWithMessage:@"消息内容"];
// 设置消息的本地拓展字段
zimTextMessage.localExtendedData = @"消息本地拓展字段";
ZIMMessageSendConfig *config = [[ZIMMessageSendConfig alloc] init];
// 设置消息优先级
config.priority = ZIMMessagePriorityLow;

// 设置发送的会话类型
// 发送单聊信息
ZIMConversationType type = ZIMConversationTypePeer;

ZIMMessageSendNotification *notification = [[ZIMMessageSendNotification alloc] init];
notification.onMessageAttached = ^(ZIMMessage *message){

};

[[ZIM getInstance] sendMessage:zimTextMessage toConversationID:toConversationID conversationType:type config:config notification:notification callback:^(ZIMMessage * _Nonnull message, ZIMError * _Nonnull errorInfo) {
    // 开发者可以通过该回调监听消息是否发送成功。
}];
```
</CodeGroup>
:::
:::if{props.platform="window"}
<CodeGroup>
```cpp title="示例代码"
// 1. 设置消息的本地拓展字段

// 设置会话 ID
std::string conversationID = "conv";

// 构造 ZIMMessage 对象
auto zimMessage = std::make_shared<zim::ZIMTextMessage>("消息内容");
// 设置消息的本地拓展字段
zimMessage->localExtendedData = "消息本地拓展字段";

auto sendConfig = zim::ZIMMessageSendConfig();
// 设置消息优先级
sendConfig.priority = zim::ZIMMessagePriority::ZIM_MESSAGE_PRIORITY_LOW;

// 设置发送的会话类型
// 发送单聊信息
auto conversationType = zim::ZIMConversationType::ZIM_CONVERSATION_TYPE_PEER;

// 发送群聊信息
// auto conversationType = zim::ZIMConversationType::ZIM_CONVERSATION_TYPE_GROUP;

// 发送房间信息
// auto conversationType = zim::ZIMConversationType::ZIM_CONVERSATION_TYPE_ROOM;

// 2. 发送消息
zim_->sendMessage(zimMessage, conversationID, conversationType, sendConfig,
                    std::make_shared<zim::ZIMMessageSendNotification>(
                        [=](/zim-miniprogram/guides/messaging/const-std::shared_ptr<zim::zimmessage>-&message) {

                        }),
                    [=](/zim-miniprogram/guides/messaging/const-std::shared_ptr<zim::zimmessage>-&message,-const-zim::zimerror-&errorinfo) {

                        });
```
</CodeGroup>
:::
:::if{props.platform="U3d"}
<CodeGroup>
```cs title="示例代码"
// 1. 设置消息的本地拓展字段

// 设置会话 ID
string toConversationID = "xxxx1";

// 构造 ZIMMessage 对象
ZIMTextMessage zimMessage = new ZIMTextMessage();
zimMessage.message = "消息内容";
// 设置消息的本地拓展字段
zimMessage.localExtendedData = "消息本地拓展字段";

ZIMMessageSendConfig config = new ZIMMessageSendConfig();
// 设置消息优先级
config.priority = ZIMMessagePriority.Low;

// 设置发送的会话类型
// 发送单聊信息
ZIMConversationType peerType = ZIMConversationType.Peer;

// 发送群聊信息
// ZIMConversationType groupType = ZIMConversationType.Group;

// 发送房间信息
// ZIMConversationType roomType = ZIMConversationType.Room;


ZIMMessageSendNotification notification = new ZIMMessageSendNotification();

// 5、发送消息
ZIM.GetInstance().SendMessage(zimMessage, toConversationID, peerType, config, notification, (ZIMMessage message, ZIMError errorInfo) =>
{
    // 开发者可以通过该回调监听消息是否发送成功。
});


```
</CodeGroup>
:::
:::if{props.platform="Web|UTS"}
<CodeGroup>
```typescript title="示例代码"
// 发送单聊 `Text` 信息

const toConversationID = ''; // 对方 userID
const conversationType = 0; // 会话类型，取值为 单聊:0, 房间:1, 群组:2
const config: ZIMMessageSendConfig = {
    priority: 1, // 设置消息优先级，取值为 低:1 默认, 中:2, 高:3
};

// 1. 设置消息的本地拓展字段
const messageTextObj: ZIMMessage = { type: 1, message: '文本消息内容', localExtendedData: '消息的本地扩展信息' };
const notification: ZIMMessageSendNotification = {
    onMessageAttached: (message: ZIMMessage) => {
        // todo: Loading
    }
}

// 2. 发送消息
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



### 更新消息的本地拓展字段

对于已收发消息，您都可调用 {getPlatformData(props,updateMessageLocalExtendedDataMap)} 接口，更新本地拓展字段。

:::if{props.platform="Flutter"}
用户可通过 [ZIMGroupMembersSearchedResult](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMGroupMembersSearchedResult-class.html) 异步返回值获取更新操作的结果。
:::

以下示例为更新已接收消息的本地拓展字段：

:::if{props.platform=undefined}
<CodeGroup>
```java title="示例代码"
// 收到单聊消息后，更新消息的本地拓展字段
zim.setEventHandler(new ZIMEventHandler() {
    @Override
    public void onPeerMessageReceived(ZIM zim, ArrayList<ZIMMessage> messageList, ZIMMessageReceivedInfo info, String fromUserID) {

      for(ZIMMessage message: messageList){
         zim.updateMessageLocalExtendedData("更新本地拓展字段", message, new ZIMMessageLocalExtendedDataUpdatedCallback() {
         @Override
         public void onMessageExtendedDataUpdated(ZIMMessage message, ZIMError errorInfo) {
               // 开发者可根据该回调监听本地拓展字段是否更新成功
         }
      });}
    }
});
```
</CodeGroup>
:::
:::if{props.platform="Flutter"}
<CodeGroup>
```dart title="示例代码"
// 收到单聊消息后，更新消息的本地拓展字段
ZIMEventHandler.onPeerMessageReceived = (ZIM zim, List<ZIMMessage> messageList, ZIMMessageReceivedInfo info, String fromUserID){
    for(ZIMMessage message in messageList){
        ZIM.getInstance()!.updateMessageLocalExtendedData('更新本地拓展字段', message).then((value){
            // 更新成功
        }).catchError((onError){
            // 根据错误码表处理
        });
    }
};
```
</CodeGroup>
:::
:::if{props.platform="iOS|mac"}
<CodeGroup>
```objc title="示例代码"
// 收到单聊消息后，更新消息的本地拓展字段
- (void)zim:(ZIM *)zim peerMessageReceived:(NSArray<ZIMMessage *> *)messageList info:(ZIMMessageReceivedInfo *)info fromUserID:(NSString *)fromUserID {
    NSArray *messageBasicList = [ZGZIMManager cnvZIMMessageListToDicList:messageList];
    GGLog(@"[GGLog][event][peerMessageReceived],fromUserID:%@,messageList:%@",fromUserID,messageBasicList);
    for (ZIMMessage *message in messageList) {
        [[ZIM getInstance] updateMessageLocalExtendedData:@"更新本地拓展字段" message:message callback:^(ZIMMessage * _Nonnull message, ZIMError * _Nonnull errorInfo) {
            // 开发者可根据该回调监听本地拓展字段是否更新成功
        }];
    }
}
```
</CodeGroup>
:::
:::if{props.platform="window"}
<CodeGroup>
```cpp title="示例代码"
// 收到单聊消息后，更新消息的本地拓展字段
void onPeerMessageReceived(zim::ZIM *zim,
                              const std::vector<std::shared_ptr<zim::ZIMMessage>> &messageList,
                              const ZIMMessageReceivedInfo info,
                              const std::string &fromUserID) override {
    for (const auto &message : messageList) {
        zim->updateMessageLocalExtendedData("更新本地拓展字段", message,
                                            [=](/zim-miniprogram/guides/messaging/const-std::shared_ptr<zim::zimmessage>-&msg,-const-zim::zimerror-&errorinfo) {
                                                    // 开发者可根据该回调监听本地拓展字段是否更新成功
                                                });
    }
}
```
</CodeGroup>
:::
:::if{props.platform="U3d"}
<CodeGroup>
```cs title="示例代码"
ZIM.GetInstance().onReceivePeerMessage += (ZIM zim,
                                List<ZIMMessage> messageList,
                                string fromUserID) =>
    {
        foreach (ZIMMessage message in messageList)
        {
            ZIM.GetInstance().UpdateMessageLocalExtendedData("更新本地拓展字段",
                message,
                (ZIMMessage message, ZIMError errorInfo) =>
                {
                    // 开发者可根据该回调监听本地拓展字段是否更新成功
                });
        };
    };
```
</CodeGroup>
:::
:::if{props.platform="Web"}
<CodeGroup>
```typescript title="示例代码"
// 收到单聊消息后，更新消息的本地拓展字段
zim.on('peerMessageReceived', (zim, data) => {
    data.messageList.forEach((message) => {
        zim.updateMessageLocalExtendedData('本地拓展字段', message)
            .then((res: ZIMMessageLocalExtendedDataUpdatedResult) => {
                // 操作成功
            })
            .catch((err: ZIMError) => {
                // 操作失败
            });
    });
});
```
</CodeGroup>

:::
:::if{props.platform="UTS"}
<CodeGroup>
```typescript title="示例代码"
// 收到单聊消息后，更新消息的本地拓展字段
zim.onPeerMessageReceived((data) => {
    data.messageList.forEach((message) => {
        zim.updateMessageLocalExtendedData('本地拓展字段', message)
            .then((res: ZIMMessageLocalExtendedDataUpdatedResult) => {
                // 操作成功
            })
            .catch((err: ZIMError) => {
                // 操作失败
            });
    });
});
```
</CodeGroup>

:::

<Content platform="Web" />