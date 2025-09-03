# ZIM 升级指南

- - -

本文介绍 ZIM uni-app SDK 原生语言插件版本升级时的一些说明和注意事项。

## 2.21.1 升级指南

<Warning title="注意">

从 2.21.1 版本开始，以下接口有重大变更，因此在从旧版本升级到 2.21.1 版本时，请您阅读以下指南。
</Warning>

### downloadMediaFile 及相关回调

废弃原接口 `downloadMediaFile`，请使用同名 [downloadMediaFile](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_uni-app~class~ZIM#download-media-file) 代替。新版本的 [downloadMediaFile](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_uni-app~class~ZIM#download-media-file) 新增了 `config` 参数，新增了 `config` 参数，可用于指定下载组合消息中的单个媒体内容。

[ZIMMediaDownloadingProgress](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_uni-app~class~ZIMMediaDownloadingProgress#zim-media-downloading-progress) 以及 [ZIMMediaDownloadedResult](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_uni-app~interface~ZIMMediaDownloadedResult) 中，参数 `message` 的类型从 `ZIMMediaMessage` 变更为 `ZIMMessage`，以适应组合消息使用，TypeScript 开发者需要根据 IDE 的编译错误提示修正调用。

<CodeGroup>
```typescript 2.21.1版本用法（下载组合消息指定媒体内容） {14-17,19,29}
// 假设 multipleMessage.messageInfoList[0] 是文本消息，multipleMessage.messageInfoList[1] 是图片消息
const multipleMessage: ZIMMessage = {
    type: 10,
    messageInfoList: [
        { type: 1, message: "Hello, World!" },
        { type: 11, fileLocalPath: '' }
    ]
}

const config: ZIMMediaDownloadConfig = {
    // 指定下载图片消息
    messageInfoIndex: 1
}

zim.downloadMediaFile(multipleMessage, 1, config, (message: ZIMMessage, currentFileSize: number, totalFileSize: number) => {
    // 下载进度
    // 开发者需要判断 message 的类型并转换成对应类型的消息
    if (message.type === 10) {
        const multipleMessage: ZIMMultipleMessage = message as ZIMMultipleMessage
        // 处理组合消息
    }
    // 其他类型消息的处理
    ......

}).then((message: ZIMMessage) => {
    // 下载完成
    // 开发者需要判断 message 的类型并转换成对应类型的消息
    if (message.type === 10) {
        const multipleMessage: ZIMMultipleMessage = message as ZIMMultipleMessage
        // 处理组合消息
    }
    // 其他类型消息的处理
    ......
}).catch((errorInfo) => {
    // 下载失败
})
```

```typescript 2.21.1用法（下载多媒体消息） {6,15}
const imageMessage: ZIMMessage = {
    type: 11,
    fileLocalPath: ''
}

zim.downloadMediaFile(imageMessage, 1, (message: ZIMMessage, currentFileSize: number, totalFileSize: number) => {
    // 下载进度
    // 开发者需要判断 message 的类型并转换成对应类型的消息
    if (message.type === 11) {
        const imageMessage: ZIMImageMessage = message as ZIMImageMessage
        // 处理图片消息
    }
    // 其他类型消息的处理
    ......
}).then((message: ZIMMessage) => {
    // 下载完成
    // 开发者需要判断 message 的类型并转换成对应类型的消息
    if (message.type === 11) {
        const imageMessage: ZIMImageMessage = message as ZIMImageMessage
        // 处理图片消息
    }
    // 其他类型消息的处理
    ......
}).catch((errorInfo) => {
    // 下载失败
})
```

```typescript 旧版本用法 {6,8}
const imageMessage: ZIMMessage = {
    type: 11,
    fileLocalPath: ''
}

zim.downloadMediaFile(imageMessage, 1, (message: ZIMMediaMessage, currentFileSize: number, totalFileSize: number) => {
    // 下载进度
}).then((message: ZIMMediaMessage) => {
    // 下载完成
}).catch((errorInfo) => {
    // 下载失败
})
```
</CodeGroup>

### sendMessage 及相关回调

自 2.21.1 版本后，发送多媒体消息需使用 [sendMessage](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_uni-app~class~ZIM#send-message) 接口。`sendMediaMessage` 接口被废弃，以实现发送消息的统一性和便于后续的通用扩展。

[ZIMMessageSendNotification](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_uni-app~interface~ZIMMessageSendNotification) 中，[onMediaUploadingProgress](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_uni-app~interface~ZIMMessageSendNotification#on-media-uploading-progress) 回调方法的 `message` 参数类型从 `ZIMMessage` 变更为 `ZIMMediaMessage`，以确保仅媒体消息会被回调通知，Typescript 开发者需要根据 IDE 的编译错误提示修正调用。(目前仅使用 Typescripts 开发语言且使用了 [replyMessage](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_uni-app~class~ZIM#reply-message) 接口的开发者会受到需要解决编译报错的影响)。

<CodeGroup>
```typescript 2.21.1版本用法 {10,14,19}
const imageMessage: ZIMMessage = {
    type: 11,
    fileLocalPath: ''
}

const config: ZIMMessageSendConfig = {
    priority: 1
}

const notification: ZIMMessageSendNotification = {
    onMessageAttached: (message: ZIMMessage) => {
        // 开发者可以监听这个回调执行消息发送前的业务逻辑
    },
    onMessageUploadingProgress: (message: ZIMMediaMessage, currentFileSize: number, totalFileSize: number) => {
        // 多媒体上传进度
    }
}

zim.sendMessage(imageMessage, "TO_CONVERSATION_ID", 0, config, notification).then((message: ZIMMessage) => {
    // 消息发送结果
}).catch((errorInfo) => {
    // 消息发送失败
})
```

```typescript 旧版本用法 {10,14,19}
const imageMessage: ZIMMessage = {
    type: 11,
    fileLocalPath: ''
}

const config: ZIMMessageSendConfig = {
    priority: 1
}

const notification: ZIMMediaMessageSendNotification = {
    onMessageAttached: (message: ZIMMediaMessage) => {
        // 开发者可以监听这个回调执行消息发送前的业务逻辑
    },
    onMessageUploadingProgress: (message: ZIMMediaMessage, currentFileSize: number, totalFileSize: number) => {
        // 多媒体上传进度
    }
}

zim.sendMediaMessage(imageMessage, "TO_CONVERSATION_ID", 0, config, notification).then((message: ZIMMessage) => {
    // 消息发送结果
}).catch((errorInfo) => {
    // 消息发送失败
})
```
</CodeGroup>



## 2.18.0 升级指南

<Warning title="注意">

从 2.18.0 版本开始，以下接口有重大变更，因此在从旧版本升级到 2.18.0 版本时，请您阅读以下指南。
</Warning>

### 单聊消息接收回调

原单聊消息接收回调 `receivePeerMessage` 已被废弃，请使用 [peerMessageReceived](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_uni-app~interface~ZIMEventHandler#peer-message-received) 代替。

新回调支持以下功能：
- 用户在线时，可通过此回调接收在线单聊消息。
- 用户重新登录 ZIM SDK 后，可以通过此回调接收离线期间（最长7天）收到的所有单聊消息。

```typescript
//新接口
peerMessageReceived: (zim: ZIM, data: ZIMEventOfConversationMessageReceivedResult) => void;

//老接口
receivePeerMessage: (zim: ZIM, data: ZIMEventOfReceiveConversationMessageResult) => void;
```

### 房间消息接收回调

原房间消息接收回调 `receiveRoomMessage` 已被废弃，请使用 [roomMessageReceived](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_uni-app~interface~ZIMEventHandler#room-message-received) 代替。

新回调支持以下功能：
- 用户在线时，可通过此回调接收在线房间消息。
- 用户从离线恢复到在线后，若仍在房间中，即可通过此回调接收离线期间内的所有房间消息。

```typescript
//新接口
roomMessageReceived: (zim: ZIM, data: ZIMEventOfConversationMessageReceivedResult) => void;

//老接口
receiveRoomMessage: (zim: ZIM, data: ZIMEventOfReceiveConversationMessageResult) => void;
```

### 群组消息接收回调

原群组消息接收回调 `receiveGroupMessage` 已被废弃，请使用 [groupMessageReceived](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_uni-app~interface~ZIMEventHandler#group-message-received) 代替。
 
新回调支持以下功能：
- 用户在线时，可通过此回调接收在线群组消息。
- 用户重新登录 ZIM SDK 后，可以通过通过此回调接收离线期间（最长7天）收到的所有群聊消息。

```typescript
//新接口
groupMessageReceived: (zim: ZIM, data: ZIMEventOfConversationMessageReceivedResult) => void;

    
//老接口
receiveGroupMessage: (zim: ZIM, data: ZIMEventOfReceiveConversationMessageResult) => void;
```

#### callCancel

<Note title="说明">

以下变更仅对**进阶模式**呼叫邀请而言。
</Note>

在新版本的 [callCancel](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_uni-app~class~ZIM#call-cancel) 中，如果参数 userIDs 包含一个 userID，则该接口将仅取消邀请该被叫用户。如果 userIDs 参数为空，则该接口将对所有被叫用户取消邀请。

而对于旧版本的 `callCancel` 接口，无论参数 userIDs 是否为空，均视为对所有被叫用户取消邀请。

由于旧版 ZIM SDK 不兼容单独取消逻辑，因此如果您既需要保留使用老版本 ZIM 实现的取消逻辑，又需要使用新版本的单独取消功能，请隔离新老版本 ZIM 之间的呼叫功能。

<CodeGroup>
```typescript 新版本用法
// 单独取消 userIdA 、userIdB
const callID = 'xxxx';
const invitees = ['userIdA','userIdB'];  // 被邀请人ID列表
const config: ZIMCallCancelConfig = { extendedData: 'xxxx' }; 
zim.callCancel(invitees, callID, config)
    .then((res: ZIMCallCancelSentResult) => {
        // 操作成功
    })
    .catch((err: ZIMError) => {
        // 操作失败
    })

// 取消整个呼叫邀请,当整个呼叫中所有被叫都未接受时可以调用成功    
const callID = 'xxxx';
const invitees = [];  // 被邀请人ID列表
const config: ZIMCallCancelConfig = { extendedData: 'xxxx' }; 
zim.callCancel(invitees, callID, config)
    .then((res: ZIMCallCancelSentResult) => {
        // 操作成功
    })
    .catch((err: ZIMError) => {
        // 操作失败
    })
```
```typescript 旧版本用法
// 无论 userIDs 中是否传递 userID,均为取消整个呼叫，当整个呼叫中所有被叫都未接受时可以调用成功
const callID = 'xxxx';
const invitees = ['userIdA','userIdB'];  // 被邀请人ID列表
const config: ZIMCallCancelConfig = { extendedData: 'xxxx' }; 
zim.callCancel(invitees, callID, config)
    .then((res: ZIMCallCancelSentResult) => {
        // 操作成功
    })
    .catch((err: ZIMError) => {
        // 操作失败
    })

// 取消整个呼叫邀请,当整个呼叫中所有被叫都未接受时可以调用成功    
const callID = 'xxxx';
const invitees = [];  // 被邀请人ID列表
const config: ZIMCallCancelConfig = { extendedData: 'xxxx' }; 
zim.callCancel(invitees, callID, config)
    .then((res: ZIMCallCancelSentResult) => {
        // 操作成功
    })
    .catch((err: ZIMError) => {
        // 操作失败
    })
```
</CodeGroup>