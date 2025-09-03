# ZIM 升级指南

- - -

本文介绍 ZIM Android 平台 SDK 版本升级时的一些说明和注意事项。

## 2.19.0 升级指南

<Warning title="注意">

从 2.19.0 版本开始，以下接口有重大变更，因此在从旧版本升级到 2.19.0 版本时，请您阅读以下指南。
</Warning>

### downloadMediaFile 及相关回调

废弃原接口 `downloadMediaFile`，请使用同名 [downloadMediaFile](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#download-media-file) 代替。新版本的 [downloadMediaFile](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#download-media-file) 新增了 `config` 参数，新增了 `config` 参数，可用于指定下载组合消息中的单个媒体内容。

:::if{props.platform=undefined}
[ZIMMediaDownloadedCallback](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~interface~ZIMMediaDownloadedCallback) 回调做出如下变更以适应组合消息使用，开发者需要根据 IDE 的编译错误提示修正调用：
<div>
- [onMediaDownloaded](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~interface~ZIMMediaDownloadedCallback#on-media-downloaded) 的参数 `message` 类型从 `ZIMMediaMessage` 变更为 `ZIMMessage`。
- [onMediaDownloadingProgress](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~interface~ZIMMediaDownloadedCallback#on-media-downloading-progress) 的参数 `message` 类型从 `ZIMMediaMessage` 变更为 `ZIMMessage`。
</div>
:::
:::if{props.platform="window"}
[ZIMMediaDownloadingProgress](https://doc-zh.zego.im/) 以及 [ZIMMediaDownloadedCallback](https://doc-zh.zego.im/) 中，参数 `message` 的类型从 `const std::shared_ptr<ZIMMediaMessage> &` 变更为 `const std::shared_ptr<ZIMMessage> &`，以适应组合消息使用，开发者需要根据 IDE 的编译错误提示修正调用。
:::

:::if{props.platform=undefined}
<CodeGroup>
```java 2.19.0版本用法（下载组合消息指定媒体内容） {3-5,7,9,21}
// 假设 multipleMessage.messageInfoList[0] 是文本消息，multipleMessage.messageInfoList[1] 是图片消息
ZIMMultipleMessage multipleMessage = (ZIMMultipleMessage) message;
ZIMMediaDownloadConfig config = new ZIMMediaDownloadConfig();
// 指定下载图片消息
config.messageInfoIndex = 1;

zim.getInstance().downloadMediaFile(multipleMessage, ZIMMediaFileType.ORIGINAL_FILE, config, new ZIMMediaDownloadedCallback() {
    @Override
    public void onMediaDownloadingProgress(ZIMMessage message, long currentFileSize, long totalFileSize) {
        // 下载进度
        // 开发者需要判断 message 的类型并转换成对应类型的消息
        if (message instanceof ZIMMultipleMessage) {
            ZIMMultipleMessage multipleMessage = (ZIMMultipleMessage) message;
            // 处理组合消息
        }
        // 其他类型消息的处理
        ......
    }

    @Override
    public void onMediaDownloaded(ZIMMessage message, ZIMError errorInfo) {
        // 下载完成
        // 开发者需要判断 message 的类型并转换成对应类型的消息
        if (message instanceof ZIMMultipleMessage) {
            ZIMMultipleMessage multipleMessage = (ZIMMultipleMessage) message;
            // 处理组合消息
        }
        // 其他类型消息的处理
        ......
    }
});
```

```java 2.19.0用法（下载多媒体消息） {2,4,6,18}
ZIMImageMessage imageMessage = (ZIMImageMessage) message;
ZIMMediaDownloadConfig config = new ZIMMediaDownloadConfig();

zim.getInstance().downloadMediaFile(imageMessage, ZIMMediaFileType.ORIGINAL_FILE, config, new ZIMMediaDownloadedCallback() {
    @Override
    public void onMediaDownloadingProgress(ZIMMessage message, long currentFileSize, long totalFileSize) {
        // 下载进度
        // 开发者需要判断 message 的类型并转换成对应类型的消息
        if (message instanceof ZIMImageMessage) {
            ZIMImageMessage imageMessage = (ZIMImageMessage) message;
            // 处理图片消息
        }
        // 其他类型消息的处理
        ......
    }

    @Override
    public void onMediaDownloaded(ZIMMessage message, ZIMError errorInfo) {
        // 下载完成
        // 开发者需要判断 message 的类型并转换成对应类型的消息
        if (message instanceof ZIMImageMessage) {
            ZIMImageMessage imageMessage = (ZIMImageMessage) message;
            // 处理图片消息
        }
        // 其他类型消息的处理
        ......
    }
});
```

```java 旧版本用法 {5,10}
ZIMImageMessage imageMessage = (ZIMImageMessage) message;

zim.getInstance().downloadMediaFile(imageMessage, ZIMMediaFileType.ORIGINAL_FILE, new ZIMMediaDownloadedCallback() {
    @Override
    public void onMediaDownloadingProgress(ZIMMediaMessage message, long currentFileSize, long totalFileSize) {
        // 下载进度
    }

    @Override
    public void onMediaDownloaded(ZIMMediaMessage message, ZIMError errorInfo) {
        // 下载完成
    }
});
```
</CodeGroup>
:::
:::if{props.platform="window"}
<CodeGroup>
```cpp 2.19.0版本用法（下载组合消息指定媒体内容） {3-5,9-10,20}
// 假设 multipleMessage.messageInfoList[0] 是文本消息，multipleMessage.messageInfoList[1] 是图片消息
auto multipleMessage = std::static_pointer_cast<ZIMMultipleMessage>(message);
ZIMMediaDownloadConfig config;
// 指定下载图片消息
config.messageInfoIndex = 1;

ZIM::getInstance()->downloadMediaFile(multipleMessage,
                                     ZIMMediaFileType::ZIM_MEDIA_FILE_TYPE_ORIGINAL_FILE,
                                     config,
                                     [=](/zim-android/client-sdks/const-std::shared_ptr<zimmessage>-&message,-unsigned-long-long-currentfilesize,-unsigned-long-long-totalfilesize) {
                                         // 下载进度
                                         // 开发者需要判断 message 的类型并转换成对应类型的消息
                                         if (message->getType() == ZIMMessageType::ZIM_MESSAGE_TYPE_MULTIPLE) {
                                             auto multipleMessage = std::static_pointer_cast<ZIMMultipleMessage>(message);
                                             // 处理组合消息
                                         }
                                         // 其他类型消息的处理
                                         ......
                                     },
                                     [=](/zim-android/client-sdks/const-std::shared_ptr<zimmessage>-&message,-const-zimerror-&errorinfo) {
                                         // 下载完成
                                         // 开发者需要判断 message 的类型并转换成对应类型的消息
                                         if (message->getType() == ZIMMessageType::ZIM_MESSAGE_TYPE_MULTIPLE) {
                                             auto multipleMessage = std::static_pointer_cast<ZIMMultipleMessage>(message);
                                             // 处理组合消息
                                         }
                                         // 其他类型消息的处理
                                         ......
                                     });
```

```cpp 2.19.0版本用法（下载多媒体消息） {2,6-7,17}
auto imageMessage = std::static_pointer_cast<ZIMImageMessage>(message);
ZIMMediaDownloadConfig config;

ZIM::getInstance()->downloadMediaFile(imageMessage,
                                     ZIMMediaFileType::ZIM_MEDIA_FILE_TYPE_ORIGINAL_FILE,
                                     config,
                                     [=](/zim-android/client-sdks/const-std::shared_ptr<zimmessage>-&message,-unsigned-long-long-currentfilesize,-unsigned-long-long-totalfilesize) {
                                         // 下载进度
                                         // 开发者需要判断 message 的类型并转换成对应类型的消息
                                         if (message->getType() == ZIMMessageType::ZIM_MESSAGE_TYPE_IMAGE) {
                                             auto imageMessage = std::static_pointer_cast<ZIMImageMessage>(message);
                                             // 处理图片消息
                                         }
                                         // 其他类型消息的处理
                                         ......
                                     },
                                     [=](/zim-android/client-sdks/const-std::shared_ptr<zimmessage>-&message,-const-zimerror-&errorinfo) {
                                         // 下载完成
                                         // 开发者需要判断 message 的类型并转换成对应类型的消息
                                         if (message->getType() == ZIMMessageType::ZIM_MESSAGE_TYPE_IMAGE) {
                                             auto imageMessage = std::static_pointer_cast<ZIMImageMessage>(message);
                                             // 处理图片消息
                                         }
                                         // 其他类型消息的处理
                                         ......
                                     });
```

```cpp 旧版本用法 {5,8}
auto imageMessage = std::static_pointer_cast<ZIMImageMessage>(message);

ZIM::getInstance()->downloadMediaFile(imageMessage,
                                     ZIMMediaFileType::ZIM_MEDIA_FILE_TYPE_ORIGINAL_FILE,
                                     [=](/zim-android/client-sdks/const-std::shared_ptr<zimmediamessage>-&message,-unsigned-long-long-currentfilesize,-unsigned-long-long-totalfilesize) {
                                         // 下载进度
                                     },
                                     [=](/zim-android/client-sdks/const-std::shared_ptr<zimmediamessage>-&message,-const-zimerror-&errorinfo) {
                                         // 下载完成
                                     });;
```
</CodeGroup>
:::

:::if{props.platform=undefined}
### sendMessage

废弃 `sendMediaMessage` 和旧的 `sendMessage` 方法，新增支持发送任意消息类型的 [sendMessage](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#send-message) 方法。

[sendMessage](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#send-message) 的回调与旧同名接口的回调不同，从 `ZIMMediaMessageSentCallback` 变更为 [ZIMMessageSentFullCallback](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~interface~ZIMMessageSentFullCallback)。

[ZIMMessageSentFullCallback](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~interface~ZIMMessageSentFullCallback) 中的 [onMediaUploadingProgress](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~interface~ZIMMessageSentFullCallback#on-media-uploading-progress) 参数 `message` 类型由 `ZIMMessage` 变更为 `ZIMMediaMessage`，以确保仅媒体消息会被回调通知，开发者需要根据 IDE 的编译错误提示修正调用。(目前仅使用了 [replyMessage](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#reply-message) 接口的开发者会受到需要解决编译报错的影响)
:::


:::if{props.platform=undefined}
<CodeGroup>
```java 2.19.0版本用法 {3,10}
ZIMImageMessage imageMessage = (ZIMImageMessage) message;

zim.getInstance().sendMessage(imageMessage, "TO_CONVERSATION_ID", ZIMConversationType.PEER, new ZIMMessageSentFullCallback() {
    @Override
    public void onMessageSent(ZIMMessage message, ZIMError errorInfo) {
        // 消息发送结果
    }

    @Override
    public void onMediaUploadingProgress(ZIMMediaMessage message, long currentFileSize, long totalFileSize) {
        // 多媒体上传进度
    }

    @Override
    public void onMessageAttached(ZIMMessage message) {
        // 开发者可以监听这个回调执行消息发送前的业务逻辑
    }
});
```

```java 旧版本用法 {3,10}
ZIMImageMessage imageMessage = (ZIMImageMessage) message;

zim.getInstance().sendMediaMessage(imageMessage, "TO_CONVERSATION_ID", ZIMConversationType.PEER, new ZIMMediaMessageSentCallback() {
    @Override
    public void onMessageSent(ZIMMediaMessage message, ZIMError errorInfo) {
        // 消息发送结果
    }

    @Override
    public void onMediaUploadingProgress(ZIMMediaMessage message, long currentFileSize, long totalFileSize) {
        // 多媒体上传进度
    }

    @Override
    public void onMessageAttached(ZIMMediaMessage message) {
        // 开发者可以监听这个回调执行消息发送前的业务逻辑
    }

});
```
</CodeGroup>
:::
:::if{props.platform="window"}
### sendMediaMessage

自 2.19.0 版本后，发送多媒体消息需使用 [sendMessage](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#send-message) 接口。`sendMediaMessage` 接口被废弃，以实现发送消息的统一性和便于后续的通用扩展。

<CodeGroup>
```cpp 2.19.0版本用法 {5,13}
auto imageMessage = std::static_pointer_cast<ZIMImageMessage>(message);
ZIMMessageSendConfig config;
config.priority = ZIMMessagePriority::ZIM_MESSAGE_PRIORITY_MEDIUM;

auto notification = std::make_shared<ZIMMessageSendNotification>();
notification->onMessageAttached = [=](/zim-android/client-sdks/const-std::shared_ptr<zimmessage>-&message) {
    // 开发者可以监听这个回调执行消息发送前的业务逻辑
};
notification->onMediaUploadingProgress = [=](/zim-android/client-sdks/const-std::shared_ptr<zimmediamessage>-&message,-unsigned-long-long-currentfilesize,-unsigned-long-long-totalfilesize) {
    // 多媒体上传进度
};

ZIM::getInstance()->sendMessage(imageMessage, 
                               "TO_CONVERSATION_ID", 
                               ZIMConversationType::ZIM_CONVERSATION_TYPE_PEER, 
                               config, 
                               notification, 
                               [=](/zim-android/client-sdks/const-std::shared_ptr<zimmessage>-&message,-const-zimerror-&errorinfo) {
                                   // 消息发送结果
                               });
```

```cpp 旧版本用法 {5,13}
auto imageMessage = std::static_pointer_cast<ZIMImageMessage>(message);
ZIMMessageSendConfig config;
config.priority = ZIMMessagePriority::ZIM_MESSAGE_PRIORITY_MEDIUM;

auto notification = std::make_shared<ZIMMediaMessageSendNotification>();
notification->onMessageAttached = [=](/zim-android/client-sdks/const-std::shared_ptr<zimmessage>-&message) {
    // 开发者可以监听这个回调执行消息发送前的业务逻辑
};
notification->onMediaUploadingProgress = [=](/zim-android/client-sdks/const-std::shared_ptr<zimmediamessage>-&message,-unsigned-long-long-currentfilesize,-unsigned-long-long-totalfilesize) {
    // 多媒体上传进度
};

ZIM::getInstance()->sendMediaMessage(imageMessage, 
                                     "TO_CONVERSATION_ID", 
                                     ZIMConversationType::ZIM_CONVERSATION_TYPE_PEER, 
                                     config, 
                                     notification, 
                                     [=](/zim-android/client-sdks/const-std::shared_ptr<zimmessage>-&message,-const-zimerror-&errorinfo) {
                                         // 消息发送结果
                                     });
```
</CodeGroup>
:::

## 2.18.0 升级指南

<Warning title="注意">

从 2.18.0 版本开始，以下接口有重大变更，因此在从旧版本升级到 2.18.0 版本时，请您阅读以下指南。
</Warning>

### 单聊消息接收回调

原单聊消息接收回调 `onReceivePeerMessage` 已被废弃，请使用 [onPeerMessageReceived](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIMEventHandler#on-peer-message-received) 代替。

新回调支持以下功能：
- 用户在线时，可通过此回调接收在线单聊消息。
- 用户重新登录 ZIM SDK 后，可以通过此回调接收离线期间（最长7天）收到的所有单聊消息。

:::if{props.platform=undefined}
```java
//新接口
public void onPeerMessageReceived(ZIM zim, ArrayList<ZIMMessage> messageList,
                                    ZIMMessageReceivedInfo info, String fromUserID) {}

//老接口
public void onReceivePeerMessage(ZIM zim, ArrayList<ZIMMessage> messageList,
                                    String fromUserID) {}
```
:::

:::if{props.platform="window"}
```cpp
//新接口
virtual void 
onPeerMessageReceived(ZIM * /*zim*/, 
                        const std::vector<std::shared_ptr<ZIMMessage>> & /*messageList*/,
                        const ZIMMessageReceivedInfo & /*info*/, 
                        const std::string & /*fromUserID*/) {}

//老接口
virtual void
onReceivePeerMessage(ZIM * /*zim*/,
                        const std::vector<std::shared_ptr<ZIMMessage>> & /*messageList*/,
                        const std::string & /*fromUserID*/) {}
```
:::


### 房间消息接收回调

原房间消息接收回调 `onReceiveRoomMessage` 已被废弃，请使用 [onRoomMessageReceived](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIMEventHandler#on-room-message-received) 代替。

新回调支持以下功能：
- 用户在线时，可通过此回调接收在线房间消息。
- 用户从离线恢复到在线后，若仍在房间中，即可通过此回调接收离线期间内的所有房间消息。

:::if{props.platform=undefined}
```java
//新接口
public void onRoomMessageReceived(ZIM zim, ArrayList<ZIMMessage> messageList,
                                    ZIMMessageReceivedInfo info, String fromRoomID) {}

//老接口
public void onReceiveRoomMessage(ZIM zim, ArrayList<ZIMMessage> messageList,
                                    String fromRoomID) {}
```
:::
:::if{props.platform="window"}
```cpp
//新接口
virtual void 
onRoomMessageReceived(ZIM * /*zim*/, 
                        const std::vector<std::shared_ptr<ZIMMessage>> & /*messageList*/,
                        const ZIMMessageReceivedInfo & /*info*/, 
                        const std::string & /*fromRoomID*/) {}

//老接口
virtual void
onReceiveRoomMessage(ZIM * /*zim*/,
                        const std::vector<std::shared_ptr<ZIMMessage>> & /*messageList*/,
                        const std::string & /*fromRoomID*/) {}
```
:::

### 群组消息接收回调

原群组消息接收回调 `onReceiveGroupMessage` 已被废弃，请使用 [onGroupMessageReceived](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIMEventHandler#on-group-message-received) 代替。
 
新回调支持以下功能：
- 用户在线时，可通过此回调接收在线群组消息。
- 用户重新登录 ZIM SDK 后，可以通过通过此回调接收离线期间（最长7天）收到的所有群聊消息。

:::if{props.platform=undefined}
```java
//新接口
public void onGroupMessageReceived(ZIM zim, ArrayList<ZIMMessage> messageList,
                                    ZIMMessageReceivedInfo info, String fromGroupID) {}

//老接口
public void onReceiveGroupMessage(ZIM zim, ArrayList<ZIMMessage> messageList,
                                    String fromGroupID) {}
```
:::
:::if{props.platform="window"}
```cpp
//新接口
virtual void onGroupMessageReceived(ZIM * /*zim*/, 
                                        const std::vector<std::shared_ptr<ZIMMessage>> & /*messageList*/,
                                        const ZIMMessageReceivedInfo & /*info*/, 
                                        const std::string & /*fromGroupID*/) {}
    
//老接口
virtual void onReceiveGroupMessage(ZIM * /*zim*/, 
                                    const std::vector<std::shared_ptr<ZIMMessage>> & /*messageList*/, 
                                    const std::string & /*fromGroupID*/) {}
```
:::

## 2.16.0 升级指南

<Warning title="注意">

从 2.16.0 版本开始，以下接口有重大变更，因此在从旧版本升级到 2.16.0 版本时，请您阅读以下指南。
</Warning>

#### callCancel

<Note title="说明">

以下变更仅对**进阶模式**呼叫邀请而言。
</Note>

在新版本的 [callCancel](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#call-cancel) 中，如果参数 userIDs 包含一个 userID，则该接口将仅取消邀请该被叫用户。如果 userIDs 参数为空，则该接口将对所有被叫用户取消邀请。

而对于旧版本的 `callCancel` 接口，无论参数 userIDs 是否为空，均视为对所有被叫用户取消邀请。

由于旧版 ZIM SDK 不兼容单独取消逻辑，因此如果您既需要保留使用老版本 ZIM 实现的取消逻辑，又需要使用新版本的单独取消功能，请隔离新老版本 ZIM 之间的呼叫功能。

:::if{props.platform=undefined}
<CodeGroup>
```java 2.16.0版本用法
// 单独取消 userIdA 、userIdB
List<String> invitees = new ArrayList<>();
invitees.add("userIdA");
invitees.add("userIdB");
ZIMCallCancelConfig cancelConfig = new ZIMCallCancelConfig();
ZIM.getInstance().callCancel(invitees, "callID", cancelConfig, new ZIMCallCancelSentCallback() {
    @Override
    public void onCallCancelSent(String callID, ArrayList<String> errorInvitees, ZIMError errorInfo) {
        
    }
});;

// 取消整个呼叫邀请,当整个呼叫中所有被叫都未接受时可以调用成功    
List<String> invitees = new ArrayList<>();
ZIMCallCancelConfig cancelConfig = new ZIMCallCancelConfig();
ZIM.getInstance().callCancel(invitees, "callID", cancelConfig, new ZIMCallCancelSentCallback() {
    @Override
    public void onCallCancelSent(String callID, ArrayList<String> errorInvitees, ZIMError errorInfo) {

    }
});
```

```java 旧版本用法
// 无论 userIDs 中是否传递 userID,均为取消整个呼叫，当整个呼叫中所有被叫都未接受时可以调用成功
List<String> invitees = new ArrayList<>();
invitees.add("userIdA");
invitees.add("userIdB");
ZIMCallCancelConfig cancelConfig = new ZIMCallCancelConfig();
ZIM.getInstance().callCancel(invitees, "callID", cancelConfig, new ZIMCallCancelSentCallback() {
    @Override
    public void onCallCancelSent(String callID, ArrayList<String> errorInvitees, ZIMError errorInfo) {
        
    }
});;

// 取消整个呼叫邀请,当整个呼叫中所有被叫都未接受时可以调用成功    
List<String> invitees = new ArrayList<>();
ZIMCallCancelConfig cancelConfig = new ZIMCallCancelConfig();
ZIM.getInstance().callCancel(invitees, "callID", cancelConfig, new ZIMCallCancelSentCallback() {
    @Override
    public void onCallCancelSent(String callID, ArrayList<String> errorInvitees, ZIMError errorInfo) {

    }
});
```
</CodeGroup>
:::
:::if{props.platform="window"}
<CodeGroup>
```cpp 2.16.0版本用法
// 单独取消 userIdA 、userIdB
std::vector<std::string> invitees;
invitees.emplace_back("userIdA");
invitees.emplace_back("userIdB");
ZIMCallCancelConfig config;
zim->callCancel(invitees, "callID", config, [=](/zim-android/client-sdks/const-std::string&-callid,-const-std::vector<std::string>&-errorinvitees,-const-zimerror&-errorinfo) {
});

// 取消整个呼叫邀请,当整个呼叫中所有被叫都未接受时可以调用成功    
std::vector<std::string> invitees;
ZIMCallCancelConfig config;
zim->callCancel(invitees, "callID", config, [=](/zim-android/client-sdks/const-std::string&-callid,-const-std::vector<std::string>&-errorinvitees,-const-zimerror&-errorinfo) {
});
```
```cpp 旧版本用法
// 无论 userIDs 中是否传递 userID,均为取消整个呼叫，当整个呼叫中所有被叫都未接受时可以调用成功
std::vector<std::string> invitees;
invitees.emplace_back("userIdA");
invitees.emplace_back("userIdB");
ZIMCallCancelConfig config;
zim->callCancel(invitees, "callID", config, [=](/zim-android/client-sdks/const-std::string&-callid,-const-std::vector<std::string>&-errorinvitees,-const-zimerror&-errorinfo) {
});

// 取消整个呼叫邀请,当整个呼叫中所有被叫都未接受时可以调用成功    
std::vector<std::string> invitees;
ZIMCallCancelConfig config;
zim->callCancel(invitees, "callID", config, [=](/zim-android/client-sdks/const-std::string&-callid,-const-std::vector<std::string>&-errorinvitees,-const-zimerror&-errorinfo) {
});
```
</CodeGroup>
:::