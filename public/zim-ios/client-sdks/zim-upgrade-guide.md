export const getPlatformData = (props, data)=> {
    const platform = props.platform ?? "iOS";
    for (const [key, value] of Object.entries(data)) {
        const pList = key.split(",");
        if (pList.includes(platform)) {
            return value
        }
    }
    return data["iOS"]
}

export const platformMap = {
  'iOS': "iOS",
  'mac': "macOS",
}


export const peerMessageReceivedMap = {
  'iOS': <a href="https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_ios~protocol~ZIMEventHandler#zim-peer-message-received-info-from-user-id" target='_blank'>peerMessageReceived</a>,
  'mac': <a href="https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_macos~protocol~ZIMEventHandler#zim-peer-message-received-info-from-user-id" target='_blank'>peerMessageReceived</a>,
}

export const roomMessageReceivedMap = {
  'iOS': <a href="https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_ios~protocol~ZIMEventHandler#zim-room-message-received-info-from-room-id" target='_blank'>roomMessageReceived</a>,
  'mac': <a href="https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_macos~protocol~ZIMEventHandler#zim-room-message-received-info-from-room-id" target='_blank'>roomMessageReceived</a>,
}

export const groupMessageReceivedMap = {
  'iOS': <a href="https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_ios~protocol~ZIMEventHandler#zim-group-message-received-info-from-group-id" target='_blank'>groupMessageReceived</a>,
  'mac': <a href="https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_ios~protocol~ZIMEventHandler#zim-group-message-received-info-from-group-id" target='_blank'>groupMessageReceived</a>,
}

# ZIM 升级指南

- - -

本文介绍 ZIM SDK for {getPlatformData(props,platformMap)} 版本升级时的一些说明和注意事项。

## 2.19.0 升级指南

<Warning title="注意">

从 2.19.0 版本开始，以下接口有重大变更，因此在从旧版本升级到 2.19.0 版本时，请您阅读以下指南。
</Warning>

### downloadMediaFileWithMessage 及相关回调

废弃原接口 `downloadMediaFileWithMessage`，请使用同名 [downloadMediaFileWithMessage](https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_ios~protocol~ZIM#download-media-file-with-message-message-file-type-config-progress-callback) 代替。新版本的 [downloadMediaFileWithMessage](https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_ios~protocol~ZIM#download-media-file-with-message-message-file-type-config-progress-callback) 新增了 `config` 参数，新增了 `config` 参数，可用于指定下载组合消息中的单个媒体内容。

[ZIMMediaDownloadingProgress](https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_ios~class~ZIMDefines#zim-media-downloading-progress-message-current-file-size-total-file-size) 和 [ZIMMediaDownloadedCallback](https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_ios~class~ZIMDefines#zim-media-downloaded-callback) 中 `message` 的参数类型由 `ZIMMediaMessage *` 变更为 `ZIMMessage *`，以适配组合消息，您需要根据 IDE 的编译错误提示修正调用。

<CodeGroup>
```objc 2.19.0版本用法（下载组合消息指定媒体内容） {3-5,9,10,20}
// 假设 multipleMessage.messageInfoList[0] 是文本消息，multipleMessage.messageInfoList[1] 是图片消息
ZIMMultipleMessage *multipleMessage = (ZIMMultipleMessage *)message;
ZIMMediaDownloadConfig *config = [[ZIMMediaDownloadConfig alloc] init];
// 指定下载图片消息
config.messageInfoIndex = 1;

[[ZIM getInstance] downloadMediaFileWithMessage:multipleMessage 
                                       fileType:ZIMMediaFileTypeOriginalFile
                                       config:config
                                       progress:^(ZIMMessage * _Nonnull message, unsigned long long currentFileSize, unsigned long long totalFileSize) {
                                            // 下载进度
                                            // 开发者需要判断 message 的类型并转换成对应类型的消息
                                            if ([message isKindOfClass:[ZIMMultipleMessage class]]) {
                                                ZIMMultipleMessage *multipleMessage = (ZIMMultipleMessage *)message;
                                                // 处理组合消息
                                            }
                                            // 其他类型消息的处理
                                            ......
                                       } 
                                       callback:^(ZIMMessage * _Nonnull message, ZIMError * _Nonnull errorInfo) {
                                            // 下载完成
                                            // 开发者需要判断 message 的类型并转换成对应类型的消息
                                            if ([message isKindOfClass:[ZIMMultipleMessage class]]) {
                                                ZIMMultipleMessage *multipleMessage = (ZIMMultipleMessage *)message;
                                                // 处理组合消息
                                            }
                                            // 其他类型消息的处理
                                            ......
                                       }];
```

```objc 2.19.0用法（下载多媒体消息） {2,6-7,17}
ZIMImageMessage *imageMessage = (ZIMImageMessage *)message;
ZIMMediaDownloadConfig *config = [[ZIMMediaDownloadConfig alloc] init];

[[ZIM getInstance] downloadMediaFileWithMessage:imageMessage 
                                       fileType:ZIMMediaFileTypeOriginalFile
                                       config:config
                                       progress:^(ZIMMessage * _Nonnull message, unsigned long long currentFileSize, unsigned long long totalFileSize) {
                                            // 下载进度
                                            // 开发者需要判断 message 的类型并转换成对应类型的消息
                                            if ([message isKindOfClass:[ZIMImageMessage class]]) {
                                                ZIMImageMessage *imageMessage = (ZIMImageMessage *)message;
                                                // 处理图片消息
                                            }
                                            // 其他类型消息的处理
                                            ......
                                       } 
                                       callback:^(ZIMMessage * _Nonnull message, ZIMError * _Nonnull errorInfo) {
                                            // 下载完成
                                            // 开发者需要判断 message 的类型并转换成对应类型的消息
                                            if ([message isKindOfClass:[ZIMImageMessage class]]) {
                                                ZIMImageMessage *imageMessage = (ZIMImageMessage *)message;
                                                // 处理图片消息
                                            }
                                            // 其他类型消息的处理
                                            ......
                                       }];
```

```objc 旧版本用法 {4,7}
ZIMImageMessage *imageMessage = (ZIMImageMessage *)message;
[[ZIM getInstance] downloadMediaFileWithMessage:imageMessage 
                                       fileType:ZIMMediaFileTypeOriginalFile
                                       progress:^(ZIMMediaMessage * _Nonnull message, unsigned long long currentFileSize, unsigned long long totalFileSize) {
                                            // 下载进度
                                       } 
                                       callback:^(ZIMMediaMessage * _Nonnull message, ZIMError * _Nonnull errorInfo) {
                                            // 下载完成
                                       }];
```
</CodeGroup>


### sendMediaMessage

自 2.19.0 版本后，发送多媒体消息需使用 [sendMessage](https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_ios~protocol~ZIM#send-message-message-to-conversation-id-conversation-type-config-notification-callback) 接口。`sendMediaMessage` 接口被废弃，以实现发送消息的统一性和便于后续的通用扩展。

<CodeGroup>
```objc 2.19.0版本用法 {6,16}
ZIMImageMessage *imageMessage = (ZIMImageMessage *)message;

ZIMMessageSendConfig *config = [[ZIMMessageSendConfig alloc] init];
config.priority = ZIMMessagePriorityMedium;

ZIMMessageSendNotification *notification = [[ZIMMessageSendNotification alloc] init];
notification.onMessageAttached = ^(ZIMMessage * _Nonnull message) {
    // 开发者可以监听这个回调执行消息发送前的业务逻辑
};

notification.onMediaUploadingProgress = ^(ZIMMediaMessage * _Nonnull message, unsigned long long currentFileSize, unsigned long long totalFileSize) {
    // 开发者可以监听这个回调获取多媒体上传的进度
};


[[ZIM getInstance] sendMessage:imageMessage 
                       toConversationID:@"TO_CONVERSATION_ID" 
                       conversationType:ZIMConversationTypePeer
                                 config:config 
                           notification:notification 
                               callback:^(ZIMMessage * _Nonnull message, ZIMError * _Nonnull errorInfo){
                                        // 发送结果
                                    }];
```

```objc 旧版本用法 {6,16}
ZIMImageMessage *imageMessage = (ZIMImageMessage *)message;

ZIMMessageSendConfig *config = [[ZIMMessageSendConfig alloc] init];
config.priority = ZIMMessagePriorityMedium;

ZIMMediaMessageSendNotification *notification = [[ZIMMediaMessageSendNotification alloc] init];
notification.onMessageAttached = ^(ZIMMessage * _Nonnull message) {
    // 开发者可以监听这个回调执行消息发送前的业务逻辑
};
        
notification.onMediaUploadingProgress = ^(ZIMMediaMessage * _Nonnull message, unsigned long long currentFileSize, unsigned long long totalFileSize) {
    // 开发者可以监听这个回调获取多媒体上传的进度
};


[[ZIM getInstance] sendMediaMessage:imageMessage 
                            toConversationID:@"TO_CONVERSATION_ID" 
                            conversationType:ZIMConversationTypePeer
                                      config:config 
                                notification:notification 
                                    callback:^(ZIMMessage * _Nonnull message, ZIMError * _Nonnull errorInfo){
                                        // 发送结果
                                    }];
```
</CodeGroup>


## 2.18.0 升级指南

<Warning title="注意">

从 2.18.0 版本开始，以下接口有重大变更，因此在从旧版本升级到 2.18.0 版本时，请您阅读以下指南。
</Warning>

### 单聊消息接收回调

原单聊消息接收回调 `receivePeerMessage` 已被废弃，请使用 {getPlatformData(props,peerMessageReceivedMap)} 代替。

新回调支持以下功能：
- 用户在线时，可通过此回调接收在线单聊消息。
- 用户重新登录 ZIM SDK 后，可以通过此回调接收离线期间（最长7天）收到的所有单聊消息。

```objc
// 新接口
- (void)zim:(ZIM *)zim
    peerMessageReceived:(NSArray<ZIMMessage * > *)messageList
                   info:(ZIMMessageReceivedInfo *)info
             fromUserID:(NSString *)fromUserID;

// 老接口
- (void)zim:(ZIM *)zim
    receivePeerMessage:(NSArray<ZIMMessage * > *)messageList
            fromUserID:(NSString *)fromUserID;
```

### 房间消息接收回调

原房间消息接收回调 `receiveRoomMessage` 已被废弃，请使用 {getPlatformData(props,roomMessageReceivedMap)} 代替。

新回调支持以下功能：
- 用户在线时，可通过此回调接收在线房间消息。
- 用户从离线恢复到在线后，若仍在房间中，即可通过此回调接收离线期间内的所有房间消息。

```objc
//新接口
- (void)zim:(ZIM *)zim
    roomMessageReceived:(NSArray<ZIMMessage *> *)messageList
                   info:(ZIMMessageReceivedInfo *)info
             fromRoomID:(NSString *)fromRoomID;

//老接口
- (void)zim:(ZIM *)zim
    receiveRoomMessage:(NSArray<ZIMMessage *> *)messageList
            fromRoomID:(NSString *)fromRoomID;
```

### 群组消息接收回调

原群组消息接收回调 `receiveGroupMessage` 已被废弃，请使用 {getPlatformData(props,groupMessageReceivedMap)} 代替。
 
新回调支持以下功能：
- 用户在线时，可通过此回调接收在线群组消息。
- 用户重新登录 ZIM SDK 后，可以通过通过此回调接收离线期间（最长7天）收到的所有群聊消息。

```objc
//新接口
- (void)zim:(ZIM *)zim
    groupMessageReceived:(NSArray<ZIMMessage *> *)messageList
                    info:(ZIMMessageReceivedInfo *)info
             fromGroupID:(NSString *)fromGroupID;

//老接口
- (void)zim:(ZIM *)zim
    receiveGroupMessage:(NSArray<ZIMMessage *> *)messageList
            fromGroupID:(NSString *)fromGroupID;
```


## 2.16.0 升级指南

<Warning title="注意">

从 2.16.0 版本开始，以下接口有重大变更，因此在从旧版本升级到 2.16.0 版本时，请您阅读以下指南。
</Warning>

#### callCancel

<Note title="说明">

以下变更仅对**进阶模式**呼叫邀请而言。
</Note>

在新版本的 [callCancelWithInvitees](https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_ios~protocol~ZIM#call-cancel-with-invitees-config-callback) 中，如果参数 userIDs 包含一个 userID，则该接口将仅取消邀请该被叫用户。如果 userIDs 参数为空，则该接口将对所有被叫用户取消邀请。

而对于旧版本的 `callCancelWithInvitees` 接口，无论参数 userIDs 是否为空，均视为对所有被叫用户取消邀请。

由于旧版 ZIM SDK 不兼容单独取消逻辑，因此如果您既需要保留使用老版本 ZIM 实现的取消逻辑，又需要使用新版本的单独取消功能，请隔离新老版本 ZIM 之间的呼叫功能。

<CodeGroup>
```objc 2.16.0版本用法
ZIMCallCancelConfig *cancelConfig = [[ZIMCallCancelConfig alloc] init];
// 单独取消 userIdA 、userIdB
[[ZIM getInstance] callCancelWithInvitees:@[@"userIdA",@"userIdB"] callID:@"callId" config:cancelConfig callback:^(NSString * _Nonnull callID, NSArray<NSString *> * _Nonnull errorInvitees, ZIMError * _Nonnull errorInfo) {
    
}];

// 取消整个呼叫邀请,当整个呼叫中所有被叫都未接受时可以调用成功    
[[ZIM getInstance] callCancelWithInvitees:@[] callID:@"callId" config:cancelConfig callback:^(NSString * _Nonnull callID, NSArray<NSString *> * _Nonnull errorInvitees, ZIMError * _Nonnull errorInfo) {
    
}];
```
```objc 旧版本用法
ZIMCallCancelConfig *cancelConfig = [[ZIMCallCancelConfig alloc] init];
// 无论 userIDs 中是否传递 userID,均为取消整个呼叫，当整个呼叫中所有被叫都未接受时可以调用成功
[[ZIM getInstance] callCancelWithInvitees:@[@"userIdA",@"userIdB"] callID:@"callId" config:cancelConfig callback:^(NSString * _Nonnull callID, NSArray<NSString *> * _Nonnull errorInvitees, ZIMError * _Nonnull errorInfo) {
    
}];

// 取消整个呼叫邀请,当整个呼叫中所有被叫都未接受时可以调用成功    
[[ZIM getInstance] callCancelWithInvitees:@[] callID:@"callId" config:cancelConfig callback:^(NSString * _Nonnull callID, NSArray<NSString *> * _Nonnull errorInvitees, ZIMError * _Nonnull errorInfo) {
    
}];
```
</CodeGroup>


## 2.5.0 升级指南

<Warning title="注意">

ZIM SDK 在 2.5.0 版本对 Swift 语言接口做了命名优化，因此在从旧版本升级到 2.5.0 版本时，请您阅读以下所列的新旧接口名称变更情况。
</Warning>

### getInstance

```swift
//老接口
open class func getInstance() -> ZIM

//新接口
open class func shared() -> ZIM?
```

### create

```swift
//老接口
open class func create(with config: ZIMAppConfig) -> ZIM

//新接口
open class func create(with config: ZIMAppConfig) -> ZIM?
``` 

### setAdvancedConfigWithKey

```swift
//老接口
open class func setAdvancedConfigWithKey(_ key: String, value: String)

//新接口
open class func setAdvancedConfig(key: String, value: String)
```

### uploadLog

```swift
//老接口
open func uploadLog(_ callback: @escaping ZIMLogUploadedCallback)

//新接口
open func uploadLog(with callback: @escaping ZIMLogUploadedCallback)
```

### queryUsersInfo

```swift
//老接口
open func queryUsersInfo(_ userIDs: [String], config: ZIMUsersInfoQueryConfig, callback: @escaping ZIMUsersInfoQueriedCallback)

//新接口
open func queryUsersInfo(by userIDs: [String], config: ZIMUsersInfoQueryConfig, callback: @escaping ZIMUsersInfoQueriedCallback)
```

### deleteConversation

```swift
//老接口
open func deleteConversation(_ conversationID: String, conversationType: ZIMConversationType, config: ZIMConversationDeleteConfig, callback: @escaping ZIMConversationDeletedCallback)

//新接口
open func deleteConversation(by conversationID: String, conversationType: ZIMConversationType, config: ZIMConversationDeleteConfig, callback: @escaping ZIMConversationDeletedCallback)
```

### clearConversationUnreadMessageCount

```swift
//老接口
open func clearConversationUnreadMessageCount(_ conversationID: String, conversationType: ZIMConversationType, callback: @escaping ZIMConversationUnreadMessageCountClearedCallback)

//新接口
open func clearConversationUnreadMessageCount(for conversationID: String, conversationType: ZIMConversationType, callback: @escaping ZIMConversationUnreadMessageCountClearedCallback)
```

### send（发送普通消息）

```swift
//老接口
open func send(_ message: ZIMMessage, toConversationID: String, conversationType: ZIMConversationType, config: ZIMMessageSendConfig, notification: ZIMMessageSendNotification?, callback: @escaping ZIMMessageSentCallback)

//新接口
open func sendMessage(_ message: ZIMMessage, toConversationID: String, conversationType: ZIMConversationType, config: ZIMMessageSendConfig, notification: ZIMMessageSendNotification?, callback: @escaping ZIMMessageSentCallback)
```

### send（旧版发送富媒体消息接口，自 2.4.0 版本后已弃用）

```swift
//老接口
@available(*, deprecated, message: "Deprecated since ZIM 2.4.0, please use another [sendMediaMessage] instead")
open func send(_ message: ZIMMediaMessage, toConversationID: String, conversationType: ZIMConversationType, config: ZIMMessageSendConfig, progress: @escaping ZIMMediaUploadingProgress, callback: @escaping ZIMMessageSentCallback)

//新接口
@available(*, deprecated, message: "Deprecated since ZIM 2.4.0, please use another [sendMediaMessage] instead")
open func sendMediaMessage(_ message: ZIMMediaMessage, toConversationID: String, conversationType: ZIMConversationType, config: ZIMMessageSendConfig, progress: @escaping ZIMMediaUploadingProgress, callback: @escaping ZIMMessageSentCallback)
```

### send（新版发送富媒体消息接口，2.4.0 版本或以上版本可用）

```swift
//老接口
open func send(_ message: ZIMMediaMessage, toConversationID: String, conversationType: ZIMConversationType, config: ZIMMessageSendConfig, notification: ZIMMediaMessageSendNotification?, callback: @escaping ZIMMessageSentCallback)

//新接口
open func sendMediaMessage(_ message: ZIMMediaMessage, toConversationID: String, conversationType: ZIMConversationType, config: ZIMMessageSendConfig, notification: ZIMMediaMessageSendNotification?, callback: @escaping ZIMMessageSentCallback)
```

### queryHistoryMessage

```swift
//老接口
open func queryHistoryMessage(byConversationID conversationID: String, conversationType: ZIMConversationType, config: ZIMMessageQueryConfig, callback: @escaping ZIMMessageQueriedCallback)

//新接口
open func queryHistoryMessage(by conversationID: String, conversationType: ZIMConversationType, config: ZIMMessageQueryConfig, callback: @escaping ZIMMessageQueriedCallback)
```

### deleteAllMessage

```swift
//老接口
open func deleteAllMessage(byConversationID conversationID: String, conversationType: ZIMConversationType, config: ZIMMessageDeleteConfig, callback: @escaping ZIMMessageDeletedCallback)

//新接口
open func deleteAllMessage(by conversationID: String, conversationType: ZIMConversationType, config: ZIMMessageDeleteConfig, callback: @escaping ZIMMessageDeletedCallback)
```

### delete

```swift
//老接口
open func delete(_ messageList: [ZIMMessage], conversationID: String, conversationType: ZIMConversationType, config: ZIMMessageDeleteConfig, callback: @escaping ZIMMessageDeletedCallback)

//新接口
open func deleteMessages(_ messageList: [ZIMMessage], conversationID: String, conversationType: ZIMConversationType, config: ZIMMessageDeleteConfig, callback: @escaping ZIMMessageDeletedCallback)
```

### insertMessage

```swift
//老接口
open func insertMessage(toLocalDB message: ZIMMessage, conversationID: String, conversationType: ZIMConversationType, senderUserID: String, callback: @escaping ZIMMessageInsertedCallback)

//新接口
open func insertMessageToLocalDB(_ message: ZIMMessage, conversationID: String, conversationType: ZIMConversationType, senderUserID: String, callback: @escaping ZIMMessageInsertedCallback)
```

### createRoom（创建并加入一个房间）

```swift
//老接口
open func createRoom(_ roomInfo: ZIMRoomInfo, callback: @escaping ZIMRoomCreatedCallback)

//新接口
open func createRoom(with roomInfo: ZIMRoomInfo, callback: @escaping ZIMRoomCreatedCallback)
```

### createRoom（创建带高级设置的房间）

```swift
//老接口
open func createRoom(_ roomInfo: ZIMRoomInfo, config: ZIMRoomAdvancedConfig, callback: @escaping ZIMRoomCreatedCallback)

//新接口
open func createRoom(with roomInfo: ZIMRoomInfo, config: ZIMRoomAdvancedConfig, callback: @escaping ZIMRoomCreatedCallback)
```

### joinRoom

```swift
//老接口
open func joinRoom(_ roomID: String, callback: @escaping ZIMRoomJoinedCallback)

//新接口
open func joinRoom(by roomID: String, callback: @escaping ZIMRoomJoinedCallback)
```

### enterRoom

```swift
//老接口
open func enterRoom(_ roomInfo: ZIMRoomInfo, config: ZIMRoomAdvancedConfig?, callback: @escaping ZIMRoomEnteredCallback)

//新接口
open func enterRoom(with roomInfo: ZIMRoomInfo, config: ZIMRoomAdvancedConfig?, callback: @escaping ZIMRoomEnteredCallback)
```

### leaveRoom

```swift
//老接口
open func leaveRoom(_ roomID: String, callback: @escaping ZIMRoomLeftCallback)

//新接口
open func leaveRoom(by roomID: String, callback: @escaping ZIMRoomLeftCallback)
```

### queryRoomMemberList

```swift
//老接口
open func queryRoomMemberList(byRoomID roomID: String, config: ZIMRoomMemberQueryConfig, callback: @escaping ZIMRoomMemberQueriedCallback)

//新接口
open func queryRoomMemberList(by roomID: String, config: ZIMRoomMemberQueryConfig, callback: @escaping ZIMRoomMemberQueriedCallback)
```

### queryRoomOnlineMemberCount

```swift
//老接口
open func queryRoomOnlineMemberCount(byRoomID roomID: String, callback: @escaping ZIMRoomOnlineMemberCountQueriedCallback)

//新接口
open func queryRoomOnlineMemberCount(by roomID: String, callback: @escaping ZIMRoomOnlineMemberCountQueriedCallback)
```

### beginRoomAttributesBatchOperation

```swift
//老接口
open func beginRoomAttributesBatchOperation(withRoomID roomID: String, config: ZIMRoomAttributesBatchOperationConfig?)

//新接口
open func beginRoomAttributesBatchOperation(with roomID: String, config: ZIMRoomAttributesBatchOperationConfig?)
```

### endRoomAttributesBatchOperation

```swift
//老接口
open func endRoomAttributesBatchOperation(withRoomID roomID: String, callback: @escaping ZIMRoomAttributesBatchOperatedCallback)

//新接口
open func endRoomAttributesBatchOperation(with roomID: String, callback: @escaping ZIMRoomAttributesBatchOperatedCallback)
```

### queryRoomAllAttributes

```swift
//老接口
open func queryRoomAllAttributes(byRoomID roomID: String, callback: @escaping ZIMRoomAttributesQueriedCallback)

//新接口
open func queryRoomAllAttributes(by roomID: String, callback: @escaping ZIMRoomAttributesQueriedCallback)
```

### queryRoomMembersAttributes

```swift
//老接口
open func queryRoomMembersAttributes(byUserIDs userIDs: [String], roomID: String, callback: @escaping ZIMRoomMembersAttributesQueriedCallback)

//新接口
open func queryRoomMembersAttributes(by userIDs: [String], roomID: String, callback: @escaping ZIMRoomMembersAttributesQueriedCallback)
```

### queryRoomMemberAttributesList

```swift
//老接口
open func queryRoomMemberAttributesList(byRoomID roomID: String, config: ZIMRoomMemberAttributesQueryConfig, callback: @escaping ZIMRoomMemberAttributesListQueriedCallback)

//新接口
open func queryRoomMemberAttributesList(by roomID: String, config: ZIMRoomMemberAttributesQueryConfig, callback: @escaping ZIMRoomMemberAttributesListQueriedCallback)
```

### createGroup（创建并加入一个群组）

```swift
//老接口
open func createGroup(_ groupInfo: ZIMGroupInfo, userIDs: [String], callback: @escaping ZIMGroupCreatedCallback)

//新接口
open func createGroup(with groupInfo: ZIMGroupInfo, userIDs: [String], callback: @escaping ZIMGroupCreatedCallback)
```

### createGroup（创建并加入一个带群属性的群组）

```swift
//老接口
open func createGroup(_ groupInfo: ZIMGroupInfo, userIDs: [String], config: ZIMGroupAdvancedConfig, callback: @escaping ZIMGroupCreatedCallback)

//新接口
open func createGroup(with groupInfo: ZIMGroupInfo, userIDs: [String], config: ZIMGroupAdvancedConfig, callback: @escaping ZIMGroupCreatedCallback)
```

### dismissGroup

```swift
//老接口
open func dismissGroup(_ groupID: String, callback: @escaping ZIMGroupDismissedCallback)

//新接口
open func dismissGroup(by groupID: String, callback: @escaping ZIMGroupDismissedCallback)
```

### joinGroup

```swift
//老接口
open func joinGroup(_ groupID: String, callback: @escaping ZIMGroupJoinedCallback)

//新接口
open func joinGroup(by groupID: String, callback: @escaping ZIMGroupJoinedCallback)
```

### leaveGroup

```swift
//老接口
 open func leaveGroup(_ groupID: String, callback: @escaping ZIMGroupLeftCallback)

//新接口
open func leaveGroup(by groupID: String, callback: @escaping ZIMGroupLeftCallback)
```

### inviteUsers 

```swift
//老接口
open func inviteUsers(intoGroup userIDs: [String], groupID: String, callback: @escaping ZIMGroupUsersInvitedCallback)

//新接口
open func inviteUsersIntoGroup(with userIDs: [String], groupID: String, callback: @escaping ZIMGroupUsersInvitedCallback)
```

### kickGroupMembers

```swift
//老接口
open func kickGroupMembers(_ userIDs: [String], groupID: String, callback: @escaping ZIMGroupMemberKickedCallback)

//新接口
open func kickGroupMembers(by userIDs: [String], groupID: String, callback: @escaping ZIMGroupMemberKickedCallback)
```

### transferGroupOwner

```swift
//老接口
open func transferGroupOwner(toUserID: String, groupID: String, callback: @escaping ZIMGroupOwnerTransferredCallback)
//新接口
open func transferGroupOwner(to toUserID: String, groupID: String, callback: @escaping ZIMGroupOwnerTransferredCallback)
```

### queryGroupInfo

```swift
//老接口
open func queryGroupInfo(byGroupID groupID: String, callback: @escaping ZIMGroupInfoQueriedCallback)
//新接口
open func queryGroupInfo(by groupID: String, callback: @escaping ZIMGroupInfoQueriedCallback)
```

### deleteGroupAttributes

```swift
//老接口
open func deleteGroupAttributes(byKeys keys: [String], groupID: String, callback: @escaping ZIMGroupAttributesOperatedCallback)
//新接口
open func deleteGroupAttributes(by keys: [String], groupID: String, callback: @escaping ZIMGroupAttributesOperatedCallback)
```

### queryGroupAttributes

```swift
//老接口
open func queryGroupAttributes(byKeys keys: [String], groupID: String, callback: @escaping ZIMGroupAttributesQueriedCallback)
//新接口
open func queryGroupAttributes(by keys: [String], groupID: String, callback: @escaping ZIMGroupAttributesQueriedCallback)
```

### queryGroupAllAttributes

```swift
//老接口
open func queryGroupAllAttributes(byGroupID groupID: String, callback: @escaping ZIMGroupAttributesQueriedCallback)
//新接口
open func queryGroupAllAttributes(by groupID: String, callback: @escaping ZIMGroupAttributesQueriedCallback)
```

### queryGroupMemberInfo

```swift
//老接口
open func queryGroupMemberInfo(byUserID userID: String, groupID: String, callback: @escaping ZIMGroupMemberInfoQueriedCallback)
//新接口
open func queryGroupMemberInfo(by userID: String, groupID: String, callback: @escaping ZIMGroupMemberInfoQueriedCallback)
```

### queryGroupMemberList

```swift
//老接口
open func queryGroupMemberList(byGroupID groupID: String, config: ZIMGroupMemberQueryConfig, callback: @escaping ZIMGroupMemberListQueriedCallback)
//新接口
open func queryGroupMemberList(by groupID: String, config: ZIMGroupMemberQueryConfig, callback: @escaping ZIMGroupMemberListQueriedCallback)
```

### queryGroupMemberCount

```swift
//老接口
open func queryGroupMemberCount(byGroupID groupID: String, callback: @escaping ZIMGroupMemberCountQueriedCallback)
//新接口
open func queryGroupMemberCount(by groupID: String, callback: @escaping ZIMGroupMemberCountQueriedCallback)
```

### callInvite

```swift
//老接口
open func callInvite(withInvitees invitees: [String], config: ZIMCallInviteConfig, callback: @escaping ZIMCallInvitationSentCallback)
//新接口
open func callInvite(with invitees: [String], config: ZIMCallInviteConfig, callback: @escaping ZIMCallInvitationSentCallback)
```

### callCancel

```swift
//老接口
open func callCancel(withInvitees invitees: [String], callID: String, config: ZIMCallCancelConfig, callback: @escaping ZIMCallCancelSentCallback)
//新接口
open func callCancel(with invitees: [String], callID: String, config: ZIMCallCancelConfig, callback: @escaping ZIMCallCancelSentCallback)
```

### callAccept

```swift
//老接口
open func callAccept(withCallID callID: String, config: ZIMCallAcceptConfig, callback: @escaping ZIMCallAcceptanceSentCallback)
//新接口
open func callAccept(with callID: String, config: ZIMCallAcceptConfig, callback: @escaping ZIMCallAcceptanceSentCallback)
```

### callReject

```swift
//老接口
open func callReject(withCallID callID: String, config: ZIMCallRejectConfig, callback: @escaping ZIMCallRejectionSentCallback)
//新接口
open func callReject(with callID: String, config: ZIMCallRejectConfig, callback: @escaping ZIMCallRejectionSentCallback)
```
