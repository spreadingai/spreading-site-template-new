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

export const deleteMessagesMap = {
  'Android': <a href="@deleteMessages" target='_blank'>deleteMessages</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/deleteMessages.html" target='_blank'>deleteMessages</a>,
}
export const ZIMMessageDeletedCallbackMap = {
  'Android': <a href="@-ZIMMessageDeletedCallback" target='_blank'>ZIMMessageDeletedCallback</a>,
  'Web,UTS': <a href="@-ZIMMessageDeletedResult" target='_blank'>ZIMMessageDeletedResult</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMMessageDeletedResult-class.html" target='_blank'>ZIMMessageDeletedResult</a>,
  'iOS,mac,window': <a href="@ZIMMessageDeletedCallback" target='_blank'>ZIMMessageDeletedCallback</a>,
}
export const deleteAllMessageMap = {
  'Android': <a href="@deleteAllMessage" target='_blank'>deleteAllMessage</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/deleteAllMessage.html" target='_blank'>deleteAllMessage</a>,
  'iOS,mac': <a href="@deleteAllMessageByConversationID" target='_blank'>deleteAllMessageByConversationID</a>,
}
export const deleteAllConversationMessagesWithConfigMap = {
  'Android': <a href="@deleteAllConversationMessages" target='_blank'>deleteAllConversationMessages</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/deleteAllConversationMessages.html" target='_blank'>deleteAllConversationMessages</a>,
  'iOS,mac': <a href="@deleteAllConversationMessagesWithConfig" target='_blank'>deleteAllConversationMessagesWithConfig</a>,
}
export const ZIMMessageDeleteConfigMap = {
  'Android': <a href="@-ZIMMessageDeleteConfig" target='_blank'>ZIMMessageDeleteConfig</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMMessageDeleteConfig-class.html" target='_blank'>ZIMMessageDeleteConfig</a>,
}
export const ZIMConversationMessagesAllDeletedCallbackMap = {
  'Android': <a href="@-ZIMConversationMessagesAllDeletedCallback" target='_blank'>ZIMConversationMessagesAllDeletedCallback</a>,
  'Web,UTS': <a href="@-ZIMConversationMessagesAllDeletedResult" target='_blank'>ZIMConversationMessagesAllDeletedResult</a>,
  'iOS,mac,window': <a href="@ZIMConversationMessagesAllDeletedCallback" target='_blank'>ZIMConversationMessagesAllDeletedCallback</a>,
}
export const messageDeletedMap = {
  'Android': <a href="@onMessageDeleted" target='_blank'>onMessageDeleted</a>,
  'Web': <a href="@messageDeleted" target='_blank'>messageDeleted</a>,
  'UTS': <a href="@messageDeleted" target='_blank'>onMessageDeleted</a>,
  'iOS': <a href="https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_ios~protocol~ZIMEventHandler#zim-message-deleted" target='_blank'>messageDeleted</a>,
  'mac': <a href="https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_macos~protocol~ZIMEventHandler#zim-message-deleted" target='_blank'>messageDeleted</a>,
}


# 删除消息

- - -

## 功能简介

ZIM SDK 支持单聊消息、群组消息、房间消息等的收发，以及查询历史消息、删除消息等功能。可广泛应用于娱乐社交、电商购物、在线教育、互动直播等多种场景下。

本文档介绍了如何使用 ZIM SDK 的接口，实现删除某个会话中指定的消息，或者删除某个会话的全部消息的功能。

<Warning title="注意">

ZIM SDK 目前支持删除“单聊/群组”会话消息，暂不支持删除“房间”会话消息。

</Warning>

## 实现流程

ZIM SDK 支持删除某个会话中指定的消息，或者删除某个会话的全部消息。删除消息分为“删除本地消息记录”和“删除服务端消息记录”，开发者可以通过 {getPlatformData(props,ZIMMessageDeleteConfigMap)} 对象，设置删除消息相关的高级属性配置。

以客户端 A 删除与客户端 B 的某些消息、或全部消息为例：

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/ZIM/Common/deleteMessage.png" /></Frame>

### 删除会话的指定消息

如果客户端 A 想要删除与客户端 B 的指定消息记录：

1. 客户端 A、B 登录 ZIM SDK，并相互发送、接收单聊消息。
2. 客户端 A 需要删除与 B 的会话记录时：
    1. 客户端 A 首先登录 ZIM SDK。
    2. 客户端 A 调用 {getPlatformData(props,deleteMessagesMap)} 接口，传入参数 messageList、config，删除指定的消息。
    3. 删除操作的结果，将通过 {getPlatformData(props,ZIMMessageDeletedCallbackMap)} 回调接口通知给客户端 A。

:::if{props.platform=undefined}
<CodeGroup>
```java title="示例代码"
// 删除会话的指定消息
String conversationID = "xxxx";
ArrayList<ZIMMessage> deleteMessageList = new ArrayList();

ZIMMessageDeleteConfig config = new ZIMMessageDeleteConfig();
config.isAlsoDeleteServerMessage = false;

zim.deleteMessages(deleteMessageList, conversationID, ZIMConversationType.Peer, config, new ZIMMessageDeletedCallback() {
    @Override
    public void onMessageDeleted(ZIMError error) {
        // 开发者可以通过该回调监听消息是否删除成功。
    }
});
```
</CodeGroup>
:::
:::if{props.platform="iOS|mac"}
<CodeGroup>
```objc title="示例代码"
// 删除会话的指定消息
NSMutableArray *deleteMessageList = [[NSMutableArray alloc] init];
ZIMMessageDeleteConfig *config = [[ZIMMessageDeleteConfig alloc] init];
//用于确定是否删除服务器消息
config.isAlsoDeleteServerMessage = true;
[self.zim deleteMessages:messageList conversationID:conversationID conversationType:conversationType config:config callback:^(NSString * _Nonnull conversationID, ZIMConversationType conversationType, ZIMError * _Nonnull errorInfo) {
    // 开发者可以通过该回调监听消息是否删除成功。
}];
```
</CodeGroup>
:::
:::if{props.platform="window"}
<CodeGroup>
```cpp title="示例代码"
// 删除会话的指定消息
std::vector<std::shared_ptr<ZIMMessage>> messageList;
zim::ZIMMessageDeleteConfig config;
//用于确定是否删除服务器消息
config.isAlsoDeleteServerMessage = true;
zim_->deleteMessages(messageList,"conversationID",zim::ZIMConversationTypePeer,config,callback);

```
</CodeGroup>
:::
:::if{props.platform="Flutter"}
<CodeGroup>
```dart title="示例代码"
// 删除会话的指定消息
String conversationID = 'xxxx';
List<ZIMMessage> messageList = [];
ZIMMessageDeleteConfig config = ZIMMessageDeleteConfig();
config.isAlsoDeleteServerMessage = false;
await ZIM
    .getInstance()
    !.deleteMessages(
        messageList, conversationID, ZIMConversationType.peer, config)
    .then((value) => {})
    .catchError((onError) {});
```

</CodeGroup>
:::
:::if{props.platform="Web|UTS"}
<CodeGroup>
```typescript title="示例代码"
// 删除会话的指定消息
const deleteMessageList: ZIMMessage[] = [];
const conversationID = '';
const conversationType = 0;
const config: ZIMMessageDeleteConfig = { isAlsoDeleteServerMessage: false };

zim.deleteMessages(deleteMessageList, conversationID, conversationType, config)
    .then((res: ZIMMessageDeletedResult) => {
        // 操作成功
    })
    .catch((err: ZIMError) => {
        // 操作失败
    });
```
</CodeGroup>
:::

### 删除指定会话的全部消息

如果客户端 A 想要删除与客户端 B 的指定会话的全部消息记录：

1. 客户端 A、B 登录 ZIM SDK，并相互发送、接收单聊消息。
2. 客户端 A 需要删除与 B 的会话记录时：
    1. 客户端 A 首先登录 ZIM SDK。
    2. 客户端 A 调用 {getPlatformData(props,deleteAllMessageMap)} 接口，传入参数 conversationID、conversationType、config，配置删除指定会话的全部消息。
    3. 删除操作的结果，将通过 {getPlatformData(props,ZIMMessageDeletedCallbackMap)} 回调接口通知给客户端 A。

:::if{props.platform=undefined}
<CodeGroup>
```java title="示例代码"
// 删除指定会话的全部消息
String conversationID = "xxxx";

ZIMMessageDeleteConfig config = new ZIMMessageDeleteConfig();
config.isAlsoDeleteServerMessage = false;

zim.deleteAllMessage(conversationID, ZIMConversationType.Peer, config, new ZIMMessageDeletedCallback() {
    @Override
    public void onMessageDeleted(ZIMError error) {
        // 开发者可以通过该回调监听消息是否删除成功。
    }
});
```
</CodeGroup>

:::
:::if{props.platform="iOS|mac"}
<CodeGroup>
```objc title="示例代码"
// 删除指定会话的全部消息
NSMutableArray *deleteMessageList = [[NSMutableArray alloc] init];
ZIMMessageDeleteConfig *config = [[ZIMMessageDeleteConfig alloc] init];
//用于确定是否删除服务器消息
config.isAlsoDeleteServerMessage = true;

[self.zim deleteAllMessageByConversationID:conversationID conversationType:conversationType config:config callback:^(NSString * _Nonnull conversationID, ZIMConversationType conversationType, ZIMError * _Nonnull errorInfo) {
     // 开发者可以通过该回调监听消息是否删除成功。   
    }];
```
</CodeGroup>
:::
:::if{props.platform="window"}
<CodeGroup>
```cpp title="示例代码"
// 用于确定是否删除服务器消息
ZIMMessageDeleteConfig config;
config.isAlsoDeleteServerMessage = true;

zim_->deleteAllMessage("converastionID",zim::ZIMConversationTypePeer,config,callback);
```

</CodeGroup>
:::
:::if{props.platform="Flutter"}
<CodeGroup>
```dart title="示例代码"
// 删除指定会话的全部消息
String conversationID = "xxxx";

ZIMMessageDeleteConfig config = ZIMMessageDeleteConfig();
config.isAlsoDeleteServerMessage = false;

await ZIM
    .getInstance()
    !.deleteAllMessage(conversationID, ZIMConversationType.peer, config)
    .then((value) => {})
    .catchError((onError) {});
```

</CodeGroup>
:::
:::if{props.platform="Web|UTS"}
<CodeGroup>
```typescript title="示例代码"

// 删除指定会话的全部消息
const conversationID = '';
const conversationType = 0;
const config: ZIMMessageDeleteConfig = { isAlsoDeleteServerMessage: true };

zim.deleteAllMessage(conversationID, conversationType, config)
    .then((res: ZIMMessageDeletedResult) => {
        // 操作成功
    })
    .catch((err: ZIMError) => {
        // 操作失败
    });
```
</CodeGroup>
:::

### 删除所有消息

登录 ZIM SDK 后，调用 {getPlatformData(props,deleteAllConversationMessagesWithConfigMap)} 接口，传入参数 {getPlatformData(props,ZIMMessageDeleteConfigMap)} ，配置是否删除存放在服务端的消息，即可删除所有单聊和群聊会话的全部消息。

:::if{props.platform="undefined|iOS|mac|window"}
删除操作的结果，将通过 {getPlatformData(props,ZIMConversationMessagesAllDeletedCallbackMap)} 回调接口返回。此外，客户端也将收到 {getPlatformData(props,messageDeletedMap)} 的通知。
:::

清空所有会话的全部消息后：
- 如果您希望保留原有会话列表，仅更新会话列中展示的 `lastMessage` 为空，请重新 [拉取会话列表](/zim-win/guides/conversation/get-the-conversation-list##获取会话列表)。
- 如果您希望清空原有会话列表，请 [删除全部会话](/zim-win/guides/conversation/get-the-conversation-list)。


:::if{props.platform=undefined}
```java
// 删除所有会话的全部消息

// 设置是否删除存放于服务端的消息
ZIMMessageDeleteConfig config = new ZIMMessageDeleteConfig();
config.isAlsoDeleteServerMessage = true;

zim.deleteAllConversationMessages(config, new ZIMConversationMessagesAllDeletedCallback() {
    @Override
    public void onConversationMessagesAllDeleted(ZIMError error) {
        // 开发者可以通过该回调监听消息是否删除成功。
    }
});

```
:::
:::if{props.platform="iOS|mac"}
<CodeGroup>
```objc
// 删除所有会话的全部消息

// 设置是否删除存放于服务端的消息
ZIMMessageDeleteConfig *config = [[ZIMMessageDeleteConfig alloc] init];
// 是否删除服务器消息
config.isAlsoDeleteServerMessage = true;

[self.zim deleteAllConversationMessagesWithConfig:config callback:^(ZIMError * _Nonnull errorInfo) {
     // 开发者可以通过该回调监听消息是否删除成功。   
    }];
```
</CodeGroup>
:::
:::if{props.platform="window"}
<CodeGroup>
```cpp
// 删除所有会话的全部消息

// 设置是否删除存放于服务端的消息
zim::ZIMMessageDeleteConfig config;
config.isAlsoDeleteServerMessage = true;

zim::ZIM::getInstance()->deleteAllConversationMessages(config, [=](/zim-win/guides/messaging/const-zim::zimerror&-errorinfo) {
    // 删除消息的结果
    if (errorInfo.code == zim::ZIM_ERROR_CODE_SUCCESS) {
        // 删除后的业务逻辑
    }
    else {
        // 请查看错误码文档寻找解决建议
    }
    });
```

</CodeGroup>
:::
:::if{props.platform="Flutter"}
<CodeGroup>
```dart
// 删除所有会话的全部消息

// 设置是否删除存放于服务端的消息
ZIMMessageDeleteConfig config = ZIMMessageDeleteConfig();
config.isAlsoDeleteServerMessage = false;

await ZIM
    .getInstance()
    !.deleteAllConversationMessages(config)
    .then((value) => {})
    .catchError((onError) {});
```
</CodeGroup>
:::
:::if{props.platform="Web|UTS"}
```typescript
// 删除所有会话的全部消息

// 设置是否删除存放于服务端的消息
const config: ZIMMessageDeleteConfig = {
    isAlsoDeleteServerMessage: true
}

zim.deleteAllConversationMessages(config)
    .then(() => {
        // 操作成功
    })
    .catch((err: ZIMError) => {
        // 操作失败
    });
```
:::

<Content platform="window" />
