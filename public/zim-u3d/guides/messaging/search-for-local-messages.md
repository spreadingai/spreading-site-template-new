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

export const searchLocalMessagesMap = {
  'Android': <a href="@searchLocalMessages" target='_blank'>searchLocalMessages</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/searchLocalMessages.html" target='_blank'>searchLocalMessages</a>,
  'iOS': <a href="@searchLocalMessagesByConversationID" target='_blank'>searchLocalMessagesByConversationID</a>,
}
export const ZIMMessagesSearchedCallbackMap = {
  'Android': <a href="@-ZIMMessagesSearchedCallback" target='_blank'>ZIMMessagesSearchedCallback</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMMessagesSearchedResult-class.html" target='_blank'>ZIMMessagesSearchedResult</a>,
  'Web,UTS': <a href="@-ZIMMessagesSearchedResult" target='_blank'>ZIMMessagesSearchedResult</a>,
  'iOS,window,U3d': <a href="@ZIMMessagesSearchedCallback" target='_blank'>ZIMMessagesSearchedCallback</a>,
}
export const searchGlobalLocalMessagesMap = {
  'Android': <a href="@searchGlobalLocalMessages" target='_blank'>searchGlobalLocalMessages</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/searchGlobalLocalMessages.html" target='_blank'>searchGlobalLocalMessages</a>,
  'iOS': <a href="@searchGlobalLocalMessagesWithConfig" target='_blank'>searchGlobalLocalMessagesWithConfig</a>,
}
export const ZIMMessagesGlobalSearchedCallbackMap = {
  'Android': <a href="@-ZIMMessagesGlobalSearchedCallback" target='_blank'>ZIMMessagesGlobalSearchedCallback</a>,
  'Web,UTS': <a href="@-ZIMMessagesGlobalSearchedResult" target='_blank'>ZIMMessagesGlobalSearchedResult</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMMessagesGlobalSearchedResult-class.html" target='_blank'>ZIMMessagesGlobalSearchedResult</a>,
  'iOS,window,U3d': <a href="@ZIMMessagesGlobalSearchedCallback" target='_blank'>ZIMMessagesGlobalSearchedCallback</a>,
}
export const searchLocalConversationsMap = {
  'Android': <a href="@searchLocalConversations" target='_blank'>searchLocalConversations</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/searchLocalConversations.html" target='_blank'>searchLocalConversations</a>,
  'iOS': <a href="@searchLocalConversationsWithConfig" target='_blank'>searchLocalConversationsWithConfig</a>,
}
export const ZIMConversationsSearchedCallbackMap = {
  'Android': <a href="@-ZIMConversationsSearchedCallback" target='_blank'>ZIMConversationsSearchedCallback</a>,
  'Web,UTS': <a href="@-ZIMConversationsSearchedResult" target='_blank'>ZIMConversationsSearchedResult</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMConversationsSearchedResult-class.html" target='_blank'>ZIMConversationsSearchedResult</a>,
  'iOS,window,U3d': <a href="@ZIMConversationsSearchedCallback" target='_blank'>ZIMConversationsSearchedCallback</a>,
}




# 搜索本地消息

- - -

## 功能简介

凭借 ZIM SDK，您可以通过关键字、用户 ID 等条件对单个或所有 `单聊` 和 `群聊` 会话的本地消息进行搜索，获取符合条件的消息列表；也可以基于本地消息搜索会话。



## 搜索指定会话的本地消息

创建 ZIM 对象并登录后，调用 {getPlatformData(props,searchLocalMessagesMap)} 接口，传入参数 conversationID、conversationType、config，设置搜索条件（如关键词），获取某个会话中符合条件的本地消息。

符合条件的消息列表，将通过 {getPlatformData(props,ZIMMessagesSearchedCallbackMap)} 回调接口返回并。




:::if{props.platform=undefined}
<CodeGroup>
```java title="示例代码"
// 搜索单个会话 7 天内的包含 "zego" 的本地文本消息。
long startTimestamp = System.currentTimeMillis();
// 计算七天前的时间戳
startTimestamp = startTimestamp - (7 * 24 * 60 * 60 * 1000);
long endTimestamp = System.currentTimeMillis();
String conversationID = "xxxx"; // 会话 ID
                                // 单聊会话的 conversationID 为对方的 userID。
                                // 群组会话的 conversationID 为群组的 groupID。

ZIMMessageSearchConfig config = new ZIMMessageSearchConfig();
config.count = 20;  // 搜索结果数量
config.order = ZIMMessageOrder.DESCENDING;  // 指定搜索顺序为从本地存储的最后（时间）一条消息向前查询
config.keywords.add("zego");  // 设置关键词为 “zego”，最多支持 5 个。当设置多个关键词后，搜索结果只展示同时包含所有关键词的本地消息
config.messageTypes.add(ZIMMessageType.TEXT); // 指定消息类型为文本
config.startTime = startTimestamp; // 搜索的起始时间点
config.endTime = endTimestamp; // 搜索的结束时间点

ZIMMessagesSearchedCallback callback = new ZIMMessagesSearchedCallback() {
    @Override
    public void onMessagesSearched(String conversationID, ZIMConversationType conversationType, ArrayList<ZIMMessage> messageList, ZIMMessage nextMessage, ZIMError errorInfo) {
        // 开发者可以通过该回调监听获取搜索到消息列表。
    }
}
zim.searchLocalMessages(conversationID, ZIMConversationType.Peer, config, callback);
```
</CodeGroup>
:::
:::if{props.platform="iOS"}
<CodeGroup>
```objc title="示例代码"
// 搜索单个会话 7 天内的包含 "zego" 的本地文本消息。
NSDate *currentDate = [NSDate date];
NSTimeInterval currentTimestamp = [currentDate timeIntervalSince1970];

long long startTimestamp = currentTimestamp - (7 * 24 * 60 * 60 * 1000);

NSString *conversationID = @"xxxx"; // 会话 ID
                                    // 单聊会话的 conversationID 为对方的 userID。
                                    // 群组会话的 conversationID 为群组的 groupID。

ZIMMessageSearchConfig *config =  [[ZIMMessageSearchConfig alloc] init];
config.count = 20;  // 搜索结果数量
config.order = ZIMMessageOrderDescending;  // 指定搜索顺序为从本地存储的最后（时间）一条消息向前查询
config.keywords = @[@"zego"];  // 设置关键词为 “zego”，最多支持 5 个。当设置多个关键词后，搜索结果只展示同时包含所有关键词的本地消息
config.messageTypes = @[[NSNumber numberWithInt:ZIMMessageTypeText]]; // 指定消息类型为文本
config.startTime = startTimestamp; // 搜索的起始时间点
config.endTime = currentTimestamp; // 搜索的结束时间点


[[ZIM getInstance] searchLocalMessagesByConversationID:conversationID conversationType:ZIMConversationTypePeer config:config callback:^(NSString * _Nonnull conversationID, ZIMConversationType conversationType, NSArray<ZIMMessage *> * _Nonnull messageList, ZIMMessage * _Nullable nextMessage, ZIMError * _Nonnull errorInfo) {
    // 开发者可以通过该回调监听获取搜索到消息列表。
}];
```
</CodeGroup>
:::
:::if{props.platform="window"}
<CodeGroup>
```cpp title="示例代码"
// 搜索单个会话 7 天内的包含 "zego" 的本地文本消息。
auto endTimestamp = std::chrono::duration_cast<std::chrono::milliseconds>(
                        std::chrono::system_clock::now().time_since_epoch())
                        .count();
auto startTimestamp = endTimestamp - (7 * 24 * 60 * 60 * 1000);

// 会话 ID
// 单聊会话的 conversationID 为对方的 userID。
// 群组会话的 conversationID 为群组的 groupID。
std::string conversationID = "conv";
auto conversationType = zim::ZIMConversationType::ZIM_CONVERSATION_TYPE_PEER;

auto searchConfig = zim::ZIMMessageSearchConfig();
// 搜索结果数量
searchConfig.count = 20;
// 指定搜索顺序为从本地存储的最后（时间）一条消息向前查询
searchConfig.order = zim::ZIMMessageOrder::ZIM_MESSAGE_ORDER_DESCENDING;
// 设置关键词为 “zego”，最多支持 5 个。当设置多个关键词后，搜索结果只展示同时包含所有关键词的本地消息
searchConfig.keywords.emplace_back("zego");
// 指定消息类型为文本
searchConfig.messageTypes.emplace_back(zim::ZIMMessageType::ZIM_MESSAGE_TYPE_TEXT);
// 搜索的起始时间点
searchConfig.startTime = startTimestamp;
// 搜索的结束时间点
searchConfig.endTime = endTimestamp;

zim_->searchLocalMessages(
    conversationID, conversationType, searchConfig,
    [=](/zim-u3d/guides/messaging/const-std::string-&conversationid,-zim::zimconversationtype-conversationtype,-const-std::vector<std::shared_ptr<zim::zimmessage>>-&messagelist,-const-std::shared_ptr<zim::zimmessage>-&nextmessage,-const-zim::zimerror-&errorinfo) {
        // 开发者可以通过该回调监听获取搜索到消息列表。
    });
```
</CodeGroup>
:::
:::if{props.platform="U3d"}
<CodeGroup>
```cs title="示例代码"
// 搜索单个会话 7 天内的包含 "zego" 的本地文本消息。
long startTimestamp = DateTimeOffset.Now.ToUnixTimeMilliseconds();
// 计算七天前的时间戳
startTimestamp = startTimestamp - (7 * 24 * 60 * 60 * 1000);
long endTimestamp = DateTimeOffset.Now.ToUnixTimeMilliseconds();
string conversationID = "xxxx"; // 会话 ID
                                // 单聊会话的 conversationID 为对方的 userID。
                                // 群组会话的 conversationID 为群组的 groupID。

ZIMMessageSearchConfig config = new ZIMMessageSearchConfig();
config.count = 20;  // 搜索结果数量
config.order = ZIMMessageOrder.Descending;  // 指定搜索顺序为从本地存储的最后（时间）一条消息向前查询
config.keywords.Add("zego");  // 设置关键词为 “zego”，最多支持 5 个。当设置多个关键词后，搜索结果只展示同时包含所有关键词的本地消息
config.messageTypes.Add(ZIMMessageType.Text); // 指定消息类型为文本
config.startTime = startTimestamp; // 搜索的起始时间点
config.endTime = endTimestamp; // 搜索的结束时间点

ZIM.GetInstance().SearchLocalMessages(groupInfo.baseInfo.groupID, ZIMConversationType.Group, messageSearchConfig, (string conversationID, ZIMConversationType conversationType,
            List<ZIMMessage> messageList,
            ZIMMessage nextMessage, ZIMError errorInfo) =>
    {
        // 开发者可以通过该回调监听获取搜索到消息列表。
    });
```
</CodeGroup>
:::
:::if{props.platform="Web|UTS"}
<CodeGroup>
```typescript title="示例代码"
// 搜索单个会话 7 天内的包含 "zego" 的本地文本消息。

const endTime = Date.now();
// 计算七天前的时间戳
const startTime = endTime - 7 * 24 * 3600 * 1000;
// 会话 ID。
// 单聊会话的 conversationID 为对方的 userID。
// 群组会话的 conversationID 为群组的 groupID。
const conversationID = 'xxxx';
const conversationType = 0;

const config: ZIMMessageSearchConfig = {
    count: 20, // 搜索结果数量
    order: 0, // 指定搜索顺序为从本地存储的最后（时间）一条消息向前查询
    keywords: ['zego'], // 设置关键词为 “zego”，最多支持 5 个。当设置多个关键词后，搜索结果只展示同时包含所有关键词的本地消息
    messageTypes: [1], // 指定消息类型为文本
    startTime, // 搜索的起始时间点
    endTime, // 搜索的结束时间点
    senderUserIDs: [],
    subMessageTypes: [],
};

zim.searchLocalMessages(conversationID, conversationType, config)
    .then((res: ZIMMessagesSearchedResult) => {
        // 操作成功
    })
    .catch((err: ZIMError) => {
        // 操作失败
    });
```
</CodeGroup>
:::
:::if{props.platform="Flutter"}
<CodeGroup>
```dart title="示例代码"
// 搜索单个会话 7 天内的包含 "zego" 的本地文本消息。

// 计算七天前的时间戳
int startTimestamp = DateTime.now().millisecondsSinceEpoch - (7 * 24 *60 *60 *1000);
int endTimestamp = DateTime.now().millisecondsSinceEpoch;
String conversationID = "xxx";// 会话 ID
                              // 单聊会话的 conversationID 为对方的 userID。
                              // 群组会话的 conversationID 为群组的 groupID。

ZIMMessageSearchConfig config = ZIMMessageSearchConfig();
config.count = 20;
config.order = ZIMMessageOrder.descending;
config.keywords.add("zego");
config.startTime = startTimestamp;
config.endTime = endTimestamp;

ZIM.getInstance()!.searchLocalMessages("conversationID", ZIMConversationType.peer, config).then((value) {
    // 开发者可以通过该回调监听获取搜索到消息列表。
}).catchError((onError){

});
```

</CodeGroup>
:::

## 搜索全局本地消息

### 搜索结果按会话分类

创建 ZIM 对象并登录后，调用 {getPlatformData(props,searchGlobalLocalMessagesMap)} 接口，传入参数 config，设置搜索条件（如关键词），全局搜索符合条件的本地消息。

符合条件的消息列表，将通过 {getPlatformData(props,ZIMMessagesGlobalSearchedCallbackMap)} 回调接口返回并按会话分类。




:::if{props.platform=undefined}
<CodeGroup>
```java title="示例代码"
// 全局搜索 7 天内的包含 "zego" 的本地文本消息。

long startTimestamp = System.currentTimeMillis();
// 计算七天前的时间戳
startTimestamp = startTimestamp - (7 * 24 * 60 * 60 * 1000);
long endTimestamp = System.currentTimeMillis();

ZIMMessageSearchConfig config = new ZIMMessageSearchConfig();
config.count = 20;  // 搜索结果数量
config.order = ZIMMessageOrder.DESCENDING;  // 指定搜索顺序为从本地存储的最后（时间）一条消息向前查询
config.keywords.add("zego");  // 设置关键词为 “zego”，最多支持 5 个。当设置多个关键词后，搜索结果只展示同时包含所有关键词的本地消息
config.messageTypes.add(ZIMMessageType.TEXT); // 指定消息类型为文本
config.startTime = startTimestamp; // 搜索的开始时间点
config.endTime = endTimestamp; // 搜索的结束时间点
ZIMMessagesGlobalSearchedCallback callback = new ZIMMessagesGlobalSearchedCallback() {
    @Override
    public void onMessagesSearched(ArrayList<ZIMMessage> messageList, ZIMMessage nextMessage, ZIMError errorInfo) {
        // 开发者可以通过该回调监听获取搜索到消息列表。
    }
}
zim.searchGlobalLocalMessages(config, callback);
```
</CodeGroup>

:::
:::if{props.platform="iOS"}
<CodeGroup>
```objc title="示例代码"
// 全局搜索 7 天内的包含 "zego" 的本地文本消息。

NSDate *currentDate = [NSDate date];
NSTimeInterval currentTimestamp = [currentDate timeIntervalSince1970];

long long startTimestamp = currentTimestamp - (7 * 24 * 60 * 60 * 1000);

ZIMMessageSearchConfig *config = [[ZIMMessageSearchConfig alloc] init];
config.count = 20;  // 搜索结果数量
config.order = ZIMMessageOrderDescending;  // 指定搜索顺序为从本地存储的最后（时间）一条消息向前查询
config.keywords = @[@"zego"];  // 设置关键词为 “zego”，最多支持 5 个。当设置多个关键词后，搜索结果只展示同时包含所有关键词的本地消息
config.messageTypes = @[[NSNumber numberWithInt:ZIMMessageTypeText]]; // 指定消息类型为文本
config.startTime = startTimestamp; // 搜索的开始时间点
config.endTime = currentTimestamp; // 搜索的结束时间点
[[ZIM getInstance] searchGlobalLocalMessagesWithConfig:config callback:^(NSArray<ZIMMessage *> * _Nonnull messageList, ZIMMessage * _Nullable nextMessage, ZIMError * _Nonnull errorInfo) {
    // 开发者可以通过该回调监听获取搜索到消息列表。
}];
```
</CodeGroup>
:::
:::if{props.platform="window"}
<CodeGroup>
```cpp title="示例代码"
// 全局搜索 7 天内的包含 "zego" 的本地文本消息。
auto endTimestamp = std::chrono::duration_cast<std::chrono::milliseconds>(
                        std::chrono::system_clock::now().time_since_epoch())
                        .count();
auto startTimestamp = endTimestamp - (7 * 24 * 60 * 60 * 1000);

auto searchConfig = zim::ZIMMessageSearchConfig();
// 搜索结果数量
searchConfig.count = 20;
// 指定搜索顺序为从本地存储的最后（时间）一条消息向前查询
searchConfig.order = zim::ZIMMessageOrder::ZIM_MESSAGE_ORDER_DESCENDING;
// 设置关键词为 “zego”，最多支持 5 个。当设置多个关键词后，搜索结果只展示同时包含所有关键词的本地消息
searchConfig.keywords.emplace_back("zego");
// 指定消息类型为文本
searchConfig.messageTypes.emplace_back(zim::ZIMMessageType::ZIM_MESSAGE_TYPE_TEXT);
// 搜索的起始时间点
searchConfig.startTime = startTimestamp;
// 搜索的结束时间点
searchConfig.endTime = endTimestamp;

zim_->searchGlobalLocalMessages(
    searchConfig, [=](/zim-u3d/guides/messaging/const-std::vector<std::shared_ptr<zim::zimmessage>>-&messagelist,-const-std::shared_ptr<zim::zimmessage>-&nextmessage,-const-zim::zimerror-&errorinfo) {
        // 开发者可以通过该回调监听获取搜索到消息列表。
    });
```
</CodeGroup>
:::
:::if{props.platform="U3d"}
<CodeGroup>
```cs title="示例代码"
// 全局搜索 7 天内的包含 "zego" 的本地文本消息。

long startTimestamp = DateTimeOffset.Now.ToUnixTimeMilliseconds();
// 计算七天前的时间戳
startTimestamp = startTimestamp - (7 * 24 * 60 * 60 * 1000);
long endTimestamp = DateTimeOffset.Now.ToUnixTimeMilliseconds();

ZIMMessageSearchConfig config = new ZIMMessageSearchConfig();
config.count = 20;  // 搜索结果数量
config.order = ZIMMessageOrder.Descending;  // 指定搜索顺序为从本地存储的最后（时间）一条消息向前查询
config.keywords.Add("zego");  // 设置关键词为 “zego”，最多支持 5 个。当设置多个关键词后，搜索结果只展示同时包含所有关键词的本地消息
config.messageTypes.Add(ZIMMessageType.Text); // 指定消息类型为文本
config.startTime = startTimestamp; // 搜索的开始时间点
config.endTime = endTimestamp; // 搜索的结束时间点
ZIM.GetInstance().SearchLocalMessages(groupInfo.baseInfo.groupID, ZIMConversationType.Group, messageSearchConfig, (string conversationID, ZIMConversationType conversationType,
        List<ZIMMessage> messageList,
        ZIMMessage nextMessage, ZIMError errorInfo) =>
    {
        // 开发者可以通过该回调监听获取搜索到消息列表。
    });
```
</CodeGroup>
:::
:::if{props.platform="Web|UTS"}
<CodeGroup>
```typescript title="示例代码"
// 全局搜索 7 天内的包含 "zego" 的本地文本消息。

const endTime = Date.now();
// 计算七天前的时间戳
const startTime = endTime - 7 * 24 * 3600 * 1000;

const config: ZIMMessageSearchConfig = {
    count: 20, // 搜索结果数量
    order: 0, // 指定搜索顺序为从本地存储的最后（时间）一条消息向前查询
    keywords: ['zego'], // 设置关键词为 “zego”，最多支持 5 个。当设置多个关键词后，搜索结果只展示同时包含所有关键词的本地消息
    messageTypes: [1], // 指定消息类型为文本
    startTime, // 搜索的起始时间点
    endTime, // 搜索的结束时间点
    senderUserIDs: [],
    subMessageTypes: [],
};

zim.searchGlobalLocalMessages(config)
    .then((res: ZIMMessagesGlobalSearchedResult) => {
        // 操作成功
    })
    .catch((err: ZIMError) => {
        // 操作失败
    });
```
</CodeGroup>
:::
:::if{props.platform="Flutter"}
<CodeGroup>
```dart title="示例代码"
// 全局搜索 7 天内的包含 "zego" 的本地文本消息。

int startTimestamp = DateTime.now().millisecondsSinceEpoch - (7 * 24 *60 *60 *1000);
int endTimestamp = DateTime.now().millisecondsSinceEpoch;

ZIMMessageSearchConfig config = ZIMMessageSearchConfig();
config.count = 20;  // 搜索结果数量
config.order = ZIMMessageOrder.descending;  // 指定搜索顺序为从本地存储的最后（时间）一条消息向前查询
config.keywords.add('zego'); // 设置关键词为 “zego”，最多支持 5 个。当设置多个关键词后，搜索结果只展示同时包含所有关键词的本地消息
config.messageTypes.add(ZIMMessageType.text); // 指定消息类型为文本
config.startTime = startTimestamp; // 搜索的开始时间点
config.endTime = endTimestamp;  // 搜索的结束时间点

ZIM.getInstance()!.searchGlobalLocalMessages(config).then((value) {
    // 开发者可以通过该回调监听获取搜索到消息列表。
}).catchError((onError){

});
```
</CodeGroup>
:::



## 基于本地消息搜索会话

创建 ZIM 对象并登录后，调用 {getPlatformData(props,searchLocalConversationsMap)} 接口，传入参数 config，设置与本地消息相关的搜索条件，全局搜索符合条件的会话。

符合条件的会话列表，将通过 {getPlatformData(props,ZIMConversationsSearchedCallbackMap)} 回调接口返回。


:::if{props.platform=undefined}
<CodeGroup>
```java title="示例代码"
long startTimestamp = System.currentTimeMillis();
// 计算七天前的时间戳
startTimestamp = startTimestamp - (7 * 24 * 60 * 60 * 1000);
long endTimestamp = System.currentTimeMillis();

// 搜索 7 天内包含关键字 "zego" 的本地文本消息，以此获取对应的会话列表
ZIMConversationSearchConfig config = new ZIMConversationSearchConfig();
config.totalConversationCount = 10;
config.conversationMessageCount = 3;
config.nextFlag = 0;
config.keywords.add("zego");
config.messageTypes.add(ZIMMessageType.TEXT);
config.startTime = startTimestamp;
config.endTime = endTimestamp;

ZIMConversationsSearchedCallback callback = new ZIMConversationsSearchedCallback() {
    @Override
    public void onConversationsSearched(ArrayList<ZIMConversationMessageGlobalSearchInfo> globalMessageInfoList, int nextFlag,
        ZIMError errorInfo) {
        // 开发者可以通过该回调监听获取搜索到的会话信息
    }
}
zim.searchLocalConversations(config, callback);
```
</CodeGroup>
:::

:::if{props.platform="iOS"}
<CodeGroup>
```objc title="示例代码"
// 搜索 7 天内包含关键字 "zego" 的本地文本消息，以此获取对应的会话列表

NSDate *currentDate = [NSDate date];
NSTimeInterval currentTimestamp = [currentDate timeIntervalSince1970];

long long startTimestamp = currentTimestamp - (7 * 24 * 60 * 60 * 1000);
ZIMConversationSearchConfig *config = [[ZIMConversationSearchConfig alloc] init];
config.totalConversationCount = 10;
config.conversationMessageCount = 3;
config.nextFlag = 0;
config.keywords = @[@"zego"];  // 设置关键词为 “zego”，最多支持 5
config.messageTypes = @[[NSNumber numberWithInt:ZIMMessageTypeText]]; // 指定消息类型为文本
config.startTime = startTimestamp;
config.endTime = currentTimestamp;

[[ZIM getInstance] searchLocalConversationsWithConfig:config callback:^(NSArray<ZIMConversationSearchInfo *> * _Nonnull conversationSearchInfoList, unsigned int nextFlag, ZIMError * _Nonnull errorInfo) {
    // 开发者可以通过该回调监听获取搜索到的会话信息
}];
```
</CodeGroup>
:::
:::if{props.platform="window"}
<CodeGroup>
```cpp title="示例代码"
auto endTimestamp = std::chrono::duration_cast<std::chrono::milliseconds>(
                        std::chrono::system_clock::now().time_since_epoch())
                        .count();
auto startTimestamp = endTimestamp - (7 * 24 * 60 * 60 * 1000);

// 搜索 7 天内包含关键字 "zego" 的本地文本消息，以此获取对应的会话列表
auto searchConfig = zim::ZIMConversationSearchConfig();
searchConfig.totalConversationCount = 10;
searchConfig.conversationMessageCount = 3;
searchConfig.nextFlag = 0;
searchConfig.keywords.emplace_back("zego");
searchConfig.messageTypes.emplace_back(zim::ZIMMessageType::ZIM_MESSAGE_TYPE_TEXT);
searchConfig.startTime = startTimestamp;
searchConfig.endTime = endTimestamp;

zim_->searchLocalConversations(
    searchConfig,
    [=](/zim-u3d/guides/messaging/const-std::vector<zim::zimconversationsearchinfo>-&conversationsearchinfolist,-unsigned-int-nextflag,-const-zim::zimerror-&errorinfo) {
        // 开发者可以通过该回调监听获取搜索到的会话信息
    });
```
</CodeGroup>
:::
:::if{props.platform="U3d"}
<CodeGroup>
```cs title="示例代码"
long startTimestamp = DateTimeOffset.Now.ToUnixTimeMilliseconds();
// 计算七天前的时间戳
startTimestamp = startTimestamp - (7 * 24 * 60 * 60 * 1000);
long endTimestamp = DateTimeOffset.Now.ToUnixTimeMilliseconds();

// 搜索 7 天内包含关键字 "zego" 的本地文本消息，以此获取对应的会话列表
ZIMConversationSearchConfig config = new ZIMConversationSearchConfig();
config.totalConversationCount = 10;
config.conversationMessageCount = 3;
config.nextFlag = 0;
config.keywords.Add("zego");
config.messageTypes.Add(ZIMMessageType.Text);
config.startTime = startTimestamp;
config.endTime = endTimestamp;
ZIM.GetInstance().SearchLocalConversations(conversationSearchConfig, (List<ZIMConversationSearchInfo> conversationSearchInfoList,
        uint nextFlag, ZIMError errorInfo) =>
    {
        // 开发者可以通过该回调监听获取搜索到的会话信息
    });
```
</CodeGroup>
:::
:::if{props.platform="Web|UTS"}
<CodeGroup>
```typescript title="示例代码"
// 搜索 7 天内包含关键字 "zego" 的本地文本消息，并以会话列表视图返回结果。

const endTime = Date.now();
// 计算七天前的时间戳
const startTime = endTime - 7 * 24 * 3600 * 1000;

const config: ZIMConversationSearchConfig = {
    totalConversationCount: 20, // 搜索结果数量
    conversationMessageCount: 3, // 每个会话命中最新的 3 条消息
    nextFlag: 0,
    keywords: ['zego'], // 设置关键词为 “zego”，最多支持 5 个。当设置多个关键词后，搜索结果只展示同时包含所有关键词的本地消息
    messageTypes: [1], // 指定消息类型为文本
    startTime, // 搜索的起始时间点
    endTime, // 搜索的结束时间点
    senderUserIDs: [],
    subMessageTypes: [],
};

zim.searchLocalConversations(config)
    .then((res: ZIMConversationsSearchedResult) => {
        // 操作成功
    })
    .catch((err: ZIMError) => {
        // 操作失败
    });
```
</CodeGroup>
:::
:::if{props.platform="Flutter"}
<CodeGroup>
```dart title="示例代码"
// 搜索 7 天内包含关键字 "zego" 的本地文本消息，以此获取对应的会话列表

// 计算七天前的时间戳
int startTimestamp = DateTime.now().millisecondsSinceEpoch - (7 * 24 *60 *60 *1000);
int endTimestamp = DateTime.now().millisecondsSinceEpoch;

ZIMConversationSearchConfig config = ZIMConversationSearchConfig();
config.totalConversationCount = 20;
config.conversationMessageCount = 3;
config.keywords.add('zego'); // 设置关键词为 “zego”，最多支持 5 个。当设置多个关键词后，搜索结果只展示同时包含所有关键词的本地消息
config.messageTypes.add(ZIMMessageType.text); // 指定消息类型为文本
config.startTime = startTimestamp; // 搜索的开始时间点
config.endTime = endTimestamp;  // 搜索的结束时间点

ZIM.getInstance()!.searchLocalConversations(config).then((value) {

}).catchError((onError){

});
```
</CodeGroup>
:::

<Content platform="U3d" />