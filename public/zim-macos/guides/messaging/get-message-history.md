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

export const queryHistoryMessageMap = {
  'Android': <a href="@queryHistoryMessage" target='_blank'>queryHistoryMessage</a>,
  'iOS': <a href="@queryHistoryMessageByConversationID" target='_blank'>queryHistoryMessageByConversationID</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/queryHistoryMessage.html" target='_blank'>queryHistoryMessage</a>,
}
export const ZIMMessageQueriedCallbackMap = {
  'Android': <a href="@-ZIMMessageQueriedCallback" target='_blank'>ZIMMessageQueriedCallback</a>,
  'window,iOS': <a href="@ZIMMessageQueriedCallback" target='_blank'>ZIMMessageQueriedCallback</a>,
  'Web,UTS': <a href="@-ZIMMessageQueriedResult" target='_blank'>ZIMMessageQueriedResult</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMMessageQueriedResult-class.html" target='_blank'>ZIMMessageQueriedResult</a>,
}
export const queryMessagesMap = {
  'Android': <a href="@queryMessages" target='_blank'>queryMessages</a>,
  'iOS': <a href="@queryMessagesByMessageSeqs" target='_blank'>queryMessagesByMessageSeqs</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/queryMessages.html" target='_blank'>queryMessages</a>,
}
export const repliedInfoMessageSeqMap = {
  'Android': <a href="@messageSeq-ZIMMessageRepliedInfo" target='_blank'>repliedInfo.messageSeq</a>,
}


# 获取历史消息

- - -

## 功能简介


开发者可以使用 ZIM 接口查询某个单聊、群组或房间会话下的所有历史消息或指定消息。在查询过程中，ZIM SDK 会优先从本地数据库缓存中检索消息；当本地缓存不完整时，SDK 会自动向 ZIM 服务端发起查询请求。

本文档将详细介绍如何使用 ZIM SDK 的接口实现获取单聊、群组和房间历史消息的功能。

<Note title="说明">

- 本地数据库缓存的消息不受服务端历史消息存储时长限制，但向服务端查询时，仅能获取历史消息存储时长内的消息。
- **除了信令消息和弹幕消息之外**，其他类型的历史消息均可通过本功能获取。
- 开发者请根据业务需要，查看 [收发消息](/zim-macos/guides/messaging/send-and-receive-messages)、[删除消息](/zim-macos/guides/messaging/delete-messages) 等功能。
- 历史消息存储天数与套餐版本相关，详情请参考 [计费说明](/zim-macos/introduction/pricing#版本差异) 的 “版本差异”。
</Note>

## 获取全量历史消息
 
用户登录 ZIM SDK 后，即可通过 {getPlatformData(props,queryHistoryMessageMap)} 接口，传入参数 conversationID、config，获取 `单聊`、`群组` 和 `房间` 的会话历史记录。

以客户端 A 获取与客户端 B 的单聊会话历史为例：

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/ZIM/Common/queryHistoryMessage.png" /></Frame>

1. 客户端 A、B 登录 ZIM SDK，并相互发送、接收单聊消息。
2. 客户端 A 需要获取与 B 的会话记录时：
    1. 客户端 A 首先登录 ZIM SDK。
    2. 客户端 A 调用 {getPlatformData(props,queryHistoryMessageMap)} 接口，传入参数 conversationID、config，开始获取。
    3. 获取的结果，将通过 {getPlatformData(props,ZIMMessageQueriedCallbackMap)} 回调接口通知给客户端 A。

:::if{props.platform=undefined}
<CodeGroup>
```java title="示例代码"
// 获取单聊会话历史消息
ArrayList<ZIMMessage> curMessageList = new ArrayList();

String conversationID = "xxxx";

// 从后往前获取会话历史消息，每次获取 30 条
ZIMMessageQueryConfig config = new ZIMMessageQueryConfig();
// 首次获取时 nextMessage 为 null
config.nextMessage = null;
config.messageCount = 30;
config.reverse = true;

ZIMMessageQueriedCallback callback = new ZIMMessageQueriedCallback() {
    @Override
    public void onMessageQueried(ArrayList<ZIMMessage> messageList, ZIMError errorInfo) {
        // 开发者可以通过该回调监听获取获取到消息列表。

        curMessageList.addAll(0, messageList);

        // 手指往下滑动到屏幕最上方一条消息时，获取更早的消息
        if (fetchMore) {
            // 后续分页获取时，nextMessage 为当前获取到的消息列表的最后一条消息
            config.nextMessage = messageList.get(messageList.size() - 1);
            zim.queryHistoryMessage(conversationID, ZIMConversationType.Peer, config, callback);
        }
    }
}
zim.queryHistoryMessage(conversationID, ZIMConversationType.Peer, config, callback);
```
</CodeGroup>
:::
:::if{props.platform="window"}
<CodeGroup>
```cpp title="示例代码"
// 获取单聊会话历史消息
std::string conversationID = "xxxx";

// 从后往前获取会话历史消息，每次获取 20 条
zim::ZIMTextMessage *message = nullptr;
zim::ZIMMessageQueryConfig config;
config.count = 20;
config.reverse = true;

zim_->queryHistoryMessage(conversationID,zim::ZIMConversationTypePeer,config,callback);
```
</CodeGroup>
:::

:::if{props.platform="Web|UTS"}
<CodeGroup>
```typescript title="示例代码"
// 获取单聊会话历史消息
const curMessageList: ZIMMessage[] = [];

const conversationID = '';
const conversationType = 0;
// 从后往前获取会话历史消息，每次获取 30 条
const config: ZIMMessageQueryConfig = {
    nextMessage: null, // 首次获取时 nextMessage 为 null
    count: 30,
    reverse: true
}

const queryMessageCallback = (res: ZIMMessageQueriedResult) => {
    const messageList = res.messageList;
    curMessageList.push(...messageList);

    // 手指往下滑动到屏幕最上方一条消息时，获取更早的消息
    if (fetchMore && messageList.length > 0) {
        // 后续分页获取时，nextMessage 为当前获取到的消息列表的第一条消息
        config.nextMessage = messageList[0];
        zim.queryHistoryMessage(conversationID, conversationType, config).then(queryMessageCallback);
    }
}

zim.queryHistoryMessage(conversationID, conversationType, config).then(queryMessageCallback);
```
</CodeGroup>
:::
:::if{props.platform="Flutter"}
<CodeGroup>
```dart title="示例代码"
// 获取单聊会话历史消息
// 从后往前获取会话历史消息，每次获取 30 条
  ZIMMessageQueryConfig config = ZIMMessageQueryConfig();
// 首次获取时 nextMessage 为 null
  config.nextMessage = null;
  config.count = 30;
  config.reverse = true;
  await ZIM
      .getInstance()!
      .queryHistoryMessage('conversationID', ZIMConversationType.peer, config)
      .then((value) => {
            //成功触发此处
            // 开发者可以通过该回调监听获取获取到消息列表。
            // 手指往下滑动到屏幕最上方一条消息时，获取更早的消息
            //保存最前的一条消息作为消息的锚点
            if (fetchMore) {
              // 后续分页获取时，nextMessage 为当前获取到的消息列表的第一条消息
              config.nextMessage = value.messageList[0],
              //递归获取
            }
          })
      .catchError((onError) {
    //失败触发此处
  });
```
</CodeGroup>
:::
:::if{props.platform="iOS"}
<CodeGroup> 
```objc titl="示例代码"
// 获取单聊会话历史消息
NSString *conversationID = @"xxxx";

// 从后往前获取会话历史消息，每次获取 20 条

ZIMMessageQueryConfig *config = [[ZIMMessageQueryConfig alloc] init];
config.count = 20;
config.reverse = true;
// 首次获取时 nextMessage 为 null
config.nextMessage = nil

[zim queryHistoryMessageByConversationID:conversationID conversationType:conversationType config:config callback:^(NSArray<ZIMMessage *> * _Nonnull messageList, ZIMError * _Nonnull errorInfo) {
    // 开发者可以通过该回调监听获取获取到消息列表。
    // 手指往下滑动到屏幕最上方一条消息时，获取更早的消息
    //保存最前的一条消息作为消息的锚点
    if (fetchMore) {
        // 后续分页获取时，nextMessage 为当前获取到的消息列表的第一条消息
        config.nextMessage = messageList[0];
        // 递归调用获取函数
    }
}];
```
</CodeGroup>
:::

## 获取指定消息列表

ZIM 支持根据传入的 `messageSeq`（消息在会话中的序号）列表（最大为 10 个），调用 {getPlatformData(props,queryMessagesMap)} 即可查询**单聊**或**群聊**会话内对应的消息。

本接口适用于仅知道某条消息的 `messageSeq` 而不知道该消息的完整结构。例如，会话中有一条消息回复了某条历史消息，会话成员可以通过该条回复的 {getPlatformData(props,repliedInfoMessageSeqMap)} 获取该历史消息的 `messageSeq`，此时即可调用本接口获取该历史消息的完整结构。



:::if{props.platform=undefined}
```java
ArrayList<Long> messageSeqs = new ArrayList<>(); // 最大长度为 10，

String conversationID = "YOUR_CONVERSATION_ID";
ZIMConversationType conversationType = ZIMConversationType.PEER; // 会话类型，取值为 单聊：ZIMConversationType.PEER，群组：ZIMConversationType.GROUP

ZIM.getInstance().queryMessages(messageSeqs, conversationID, conversationType, new ZIMMessageQueriedCallback() {
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
:::if{props.platform="window"}
```cpp
std::vector<long long> messageSeqs; // 最大长度为 10，
std::string conversationID = "YOUR_CONVERSATION_ID";
ZIMConversationType conversationType = ZIM_CONVERSATION_TYPE_PEER; // 会话类型，取值为 单聊：ZIM_CONVERSATION_TYPE_PEER，群组：ZIM_CONVERSATION_TYPE_GROUP
ZIM::getInstance()->queryMessages(messageSeqs, conversationID, conversationType, [=](/zim-macos/guides/messaging/const-std::string-&conversationid,-zimconversationtype-conversationtype,-const-std::vector<std::shared_ptr<zimmessage>>-&messagelist,-const-zimerror-&errorinfo) {
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
const messageSeqs = [1]; // 最大长度为 10

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
List<int> messageSeqs = []; // 最大长度为 10
String conversationID = "YOUR_CONVERSATION_ID";
ZIMConversationType conversationType = ZIMConversationType.peer; // 会话类型，取值为 单聊：ZIMConversationTypePeer，群组：ZIMConversationTypeGroup

ZIM.getInstance()?.queryMessages(messageSeqs, conversationID, conversationType).then((value) {
    // 查询成功
}).catchError((onError){
    if(onError is PlatformException){
        // 查询失败
    }
});
```

:::
:::if{props.platform="iOS"}
```objc
NSArray<NSNumber *> messageSeqs = @[]; // 最大长度为 10，

NSString *conversationID = @"YOUR_CONVERSATION_ID";
ZIMConversationType conversationType = ZIMConversationTypePeer; // 会话类型，取值为 单聊：ZIMConversationTypePeer，群组：ZIMConversationTypeGroup

[[ZIM getInstance] queryMessagesByMessageSeqs:messageSeqs conversationID:conversationID conversationType:conversationType callback:^(NSString * _Nonnull conversationID, ZIMConversationType conversationType, NSArray<ZIMMessage *> * _Nonnull messageList, ZIMError * _Nonnull errorInfo) {
    if(errorInfo.code == ZIMErrorCodeSuccess) {
        // 查询成功
    } else {
        // 查询失败
    }
}];
```
:::

<Content platform="iOS" />