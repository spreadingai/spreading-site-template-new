# ZIM 升级指南

- - -

本文介绍 ZIM Flutter 平台 SDK 版本升级时的一些说明和注意事项。

## 2.21.1 升级指南

<Warning title="注意">

ZIM Flutter SDK 2.21.1 版本对以往部分命名定义进行了订正和甄误，并修改了部分接口的用法。从旧版本升级到 2.21.1 版本时，请您阅读以下指南。
</Warning>


### 接口用法变更

<Steps>
<Step title="setAdvancedConfig">
[setAdvancedConfig](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/setAdvancedConfig.html) 变更为同步接口。
<CodeGroup>
```dart 新版本用法 
static void setAdvancedConfig(String key, String value);
```

```dart 旧版本用法
static setAdvancedConfig(String key, String value) async;
```
</CodeGroup>

</Step>
<Step title="exportLocalMessages">
[exportLocalMessages](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/exportLocalMessages.html) 的 [ZIMMessageExportingProgress](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMMessageExportingProgress.html) 参数变更为必选参数。
<CodeGroup>
```dart 新版本用法 {4}
Future<void> exportLocalMessages(
    String folderPath,
    ZIMMessageExportConfig config,
    ZIMMessageExportingProgress progress
);
```

```dart 旧版本用法 {4}
Future<void> exportLocalMessages(
    String folderPath,
    ZIMMessageExportConfig config, 
    ZIMMessageExportingProgress? progress
);
```
</CodeGroup>
</Step>
<Step title="importLocalMessages">
[importLocalMessages](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/importLocalMessages.html) 的 [ZIMMessageImportingProgress](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMMessageImportingProgress.html) 参数变更为必选参数。
<CodeGroup>
```dart 新版本用法 {4}
Future<void> importLocalMessages(
    String folderPath,
    ZIMMessageImportConfig config,
    ZIMMessageImportingProgress progress
);
```

```dart 旧版本用法 {4}
Future<void> importLocalMessages(
    String folderPath,
    ZIMMessageImportConfig config,
    ZIMMessageImportingProgress? progress
);
```
</CodeGroup>
</Step>
<Step title="ZIMCustomMessage">
[ZIMCustomMessage](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMCustomMessage-class.html) 构造方法的 [searchedContent](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMCustomMessage/searchedContent.html) 参数变更为必选参数。
<CodeGroup>
```dart 新版本用法 {4,6}
ZIMCustomMessage customMessage = ZIMCustomMessage(
    message: "message", 
    // 无需对自定义消息进行关键字搜索时，searchedContent 设置为空字符串即可
    searchedContent: "searchedContent" 
);
customMessage.subType = 100;
```

```dart 旧版本用法 {3,5}
ZIMCustomMessage customMessage = ZIMCustomMessage(
    message: "message",
    subType: 100
);
customMessage.searchedContent = "searchContent";
```
</CodeGroup>
</Step>
</Steps>

### 类名变更
1. ~~ZIMReactionUserInfo~~ -> [ZIMMessageReactionUserInfo](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMMessageReactionUserInfo-class.html)
2. ~~ZIMMessageReactionUsersQueryConfig~~ -> [ZIMMessageReactionUserQueryConfig](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMMessageReactionUserQueryConfig-class.html)


### 类成员属性命名变更

1. [ZIMMessage](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMMessage-class.html):  ~~mentionedUserIds~~ -> [mentionedUserIDs](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMMessage/mentionedUserIDs.html)
2. [ZIMBlacklistUsersRemovedResult](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMBlacklistUsersRemovedResult-class.html):  ~~errorUserInfoArrayList~~ -> [errorUserList](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMBlacklistUsersRemovedResult/errorUserList.html)
3. [ZIMGroupMutedResult](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMGroupMutedResult-class.html): ~~info~~ -> [mutedInfo](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMGroupMutedResult/mutedInfo.html)

### 枚举命名变更

1. [ZIMTipsMessageChangeInfoType](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMTipsMessageChangeInfoType.html):  ~~groupMemberMutedChanged~~ -> `groupMemberMuteChanged`
2. [ZIMCallUserState](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMCallUserState.html):  ~~beCanceled~~ -> `beCancelled`



### 错误码常量命名变更

<Warning title="注意">
为了保证您的项目在升级后能够正常运行，请检查项目中是否存在以下旧的错误码常量，并使用新错误码常量进行替换。
</Warning>

| 错误码  | 错误码常量名（旧）                               | 错误码常量名（新）                                                                                                                                                                                             |
| ------- | ------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 6000009 | ~~commonModuleImServerDisconnect~~               | **[commonModuleIMServerDisconnect](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMErrorCode/commonModuleIMServerDisconnect-constant.html)**                                                         |
| 6000012 | ~~commonModuleUserIsOperationLimit~~             | **[commonModuleUserInfoQueriedLimit](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMErrorCode/commonModuleUserInfoQueriedLimit-constant.html)**                                                     |
| 6000013 | ~~commonModuleUnsupportedRequestOfCurrentMenu~~  | **[commonModuleUnsupportedRequest](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMErrorCode/commonModuleUnsupportedRequest-constant.html)**                                                         |
| 6000204 | ~~messageModuleTargetDoseNotExist~~              | **[messageModuleTargetDoesNotExist](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMErrorCode/messageModuleTargetDoesNotExist-constant.html)**                                                       |
| 6000276 | ~~messageModuleCallDoseNotExist~~                | **[messageModuleCallDoesNotExist](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMErrorCode/messageModuleCallDoesNotExist-constant.html)**                                                           |
| 6000277 | ~~receiptReadError~~                             | **[messageModuleReceiptReadError](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMErrorCode/messageModuleReceiptReadError-constant.html)**                                                           |
| 6000278 | ~~messageExceedsRevokeTime~~                     | **[messageModuleMessageExceedsRevokeTime](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMErrorCode/messageModuleMessageExceedsRevokeTime-constant.html)**                                           |
| 6000279 | ~~messageHasBeenRevoked~~                        | **[messageModuleMessageHasBeenRevoked](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMErrorCode/messageModuleMessageHasBeenRevoked-constant.html)**                                                 |
| 6000280 | ~~messageReactionTypeExisted~~                   | **[messageModuleMessageReactionTypeExisted](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMErrorCode/messageModuleMessageReactionTypeExisted-constant.html)**                                       |
| 6000281 | ~~messageModeCallInviteUserDoesNotExist~~        | **[messageModuleCallInviteUserDoesNotExist](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMErrorCode/messageModuleCallInviteUserDoesNotExist-constant.html)**                                       |
| 6000322 | ~~roomModuleTheRoomDoseNotExist~~                | **[roomModuleTheRoomDoesNotExist](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMErrorCode/roomModuleTheRoomDoesNotExist-constant.html)**                                                           |
| 6000351 | ~~roomModuleRoomMemberAttributesKVExceedsLimit~~ | **[roomModuleTheTotalLengthOfRoomMemberAttributesExceedsLimit](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMErrorCode/roomModuleTheTotalLengthOfRoomMemberAttributesExceedsLimit-constant.html)** |
| 6000507 | ~~groupModuleKickoutGroupMemberError~~           | **[groupModuleKickOutGroupMemberError](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMErrorCode/groupModuleKickOutGroupMemberError-constant.html)**                                                 |
| 6000523 | ~~groupModuleGroupDoseNotExist~~                 | **[groupModuleGroupDoesNotExist](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMErrorCode/groupModuleGroupDoesNotExist-constant.html)**                                                             |
| 6000526 | ~~groupModuleGroupAttributeDoseNotExist~~        | **[groupModuleGroupAttributeDoesNotExist](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMErrorCode/groupModuleGroupAttributeDoesNotExist-constant.html)**                                           |
| 6000542 | ~~groupModuleGroupDataBaseError~~                | **[groupModuleForbidJoinGroupError](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMErrorCode/groupModuleForbidJoinGroupError-constant.html)**                                                       |
| 6000603 | ~~conversationModuleConversationDoseNotExist~~   | **[conversationModuleConversationDoesNotExist](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMErrorCode/conversationModuleConversationDoesNotExist-constant.html)**                                 |
| 6000809 | ~~friendOperationLimitExceeded~~                 | **[friendModuleFriendOperationLimitExceeded](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMErrorCode/friendModuleFriendOperationLimitExceeded-constant.html)**                                     |


## 2.19.0 升级指南

<Warning title="注意">

从 2.19.0 版本开始，以下接口有重大变更，因此在从旧版本升级到 2.19.0 版本时，请您阅读以下指南。
</Warning>

### downloadMediaFile 及相关回调

[downloadMediaFile](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/downloadMediaFile.html) 新增了 `config` 参数，可用于指定下载组合消息中的单个媒体内容。此参数为非可选，会导致编译报错，请参考本文档更新代码。


<CodeGroup>
```dart 2.19.0版本用法（下载组合消息指定媒体内容） {3-5,6}
// 假设 multipleMessage.messageInfoList[0] 是文本消息，multipleMessage.messageInfoList[1] 是图片消息
ZIMMultipleMessage multipleMessage = message as ZIMMultipleMessage;
ZIMMediaDownloadConfig config = ZIMMediaDownloadConfig();
// 指定下载图片消息
config.messageInfoIndex = 1;

zim.downloadMediaFile(multipleMessage, ZIMMediaFileType.originalFile, config, (ZIMMessage message, int currentFileSize, int totalFileSize) {
    // 下载进度
}).then((ZIMMessage message) {
    // 下载完成
}).catch((ZIMError errorInfo) {
    // 下载失败
});
```

```dart 2.19.0用法（下载多媒体消息） {3}
ZIMImageMessage imageMessage = message as ZIMImageMessage;

zim.downloadMediaFile(message, ZIMMediaFileType.originalFile, ZIMMediaDownloadConfig(), (ZIMMessage message, int currentFileSize, int totalFileSize) {
    // 下载进度
}).then((ZIMMessage message) {
    // 下载完成
}).catch((ZIMError errorInfo) {
    // 下载失败
});
```

```dart 旧版本用法 {3}
ZIMImageMessage imageMessage = message as ZIMImageMessage;

zim.downloadMediaFile(message, ZIMMediaFileType.originalFile, (ZIMMessage message, int currentFileSize, int totalFileSize) {
    // 下载进度
}).then((ZIMMessage message) {
    // 下载完成
}).catch((ZIMError errorInfo) {
    // 下载失败
});
```
</CodeGroup>

### sendMediaMessage

废弃 `sendMediaMessage` 接口。自 2.19.0 版本后，发送多媒体消息也使用 [sendMessage](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/sendMessage.html) 接口，减少开发者的维护成本。

[ZIMMessageSendNotification](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMMessageSendNotification-class.html) 中，[onMediaUploadingProgress](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMMessageSendNotification/onMediaUploadingProgress.html) 回调方法的 `message` 参数类型从 `ZIMMessage` 变更为 `ZIMMediaMessage`，以确保仅媒体消息会被回调通知，开发者需要根据 IDE 的编译错误提示修正调用。(目前仅使用了 [replyMessage](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/replyMessage.html) 接口的开发者会受到需要解决编译报错的影响)

<CodeGroup>
```dart 2.19.0版本用法 {6,10,14}
ZIMImageMessage imageMessage = ZIMImageMessage(fileLocalPath);

ZIMMessageSendConfig config = ZIMMessageSendConfig();
config.priority = ZIMMessagePriority.medium;

ZIMMessageSendNotification notification = ZIMMessageSendNotification();
notification.onMessageAttached = (ZIMMessage message) {
    // 开发者可以监听这个回调执行消息发送前的业务逻辑
};
notification.onMessageUploadingProgress = (ZIMMediaMessage message, int currentFileSize, int totalFileSize) {
    // 多媒体上传进度
};

zim.sendMessage(imageMessage, "TO_CONVERSATION_ID", ZIMConversationType.peer, config, notification).then((ZIMMessage message) {
    // 消息发送结果
}).catch((ZIMError errorInfo) {
    // 消息发送失败
});
```

```dart 旧版本用法 {6,10,14}
ZIMImageMessage imageMessage = ZIMImageMessage(fileLocalPath);

ZIMMessageSendConfig config = ZIMMessageSendConfig();
config.priority = ZIMMessagePriority.medium;

ZIMMediaMessageSendNotification notification = ZIMMediaMessageSendNotification();
notification.onMessageAttached = (ZIMMessage message) {
    // 开发者可以监听这个回调执行消息发送前的业务逻辑
};
notification.onMessageUploadingProgress = (ZIMMessage message, int currentFileSize, int totalFileSize) {
    // 多媒体上传进度
};

zim.sendMediaMessage(imageMessage, "TO_CONVERSATION_ID", ZIMConversationType.peer, config, notification).then((ZIMMessage message) {
    // 消息发送结果
}).catch((ZIMError errorInfo) {
    // 消息发送失败
});
```
</CodeGroup>

## 2.18.0 升级指南

<Warning title="注意">

从 2.18.0 版本开始，以下接口有重大变更，因此在从旧版本升级到 2.18.0 版本时，请您阅读以下指南。
</Warning>

### 单聊消息接收回调

原单聊消息接收回调 `onReceivePeerMessage` 已被废弃，请使用 [onPeerMessageReceived](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMEventHandler/onPeerMessageReceived.html) 代替。

新回调支持以下功能：
- 用户在线时，可通过此回调接收在线单聊消息。
- 用户重新登录 ZIM SDK 后，可以通过此回调接收离线期间（最长7天）收到的所有单聊消息。

```dart
//新接口
static void Function(ZIM zim, List<ZIMMessage> messageList,
      ZIMMessageReceivedInfo info, String fromUserID)? onPeerMessageReceived;

//老接口
static void Function(
          ZIM zim, List<ZIMMessage> messageList, String fromUserID)?
      onReceivePeerMessage;
```

### 房间消息接收回调

原房间消息接收回调 `onReceiveRoomMessage` 已被废弃，请使用 [onRoomMessageReceived](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMEventHandler/onPeerMessageReceived.html) 代替。

新回调支持以下功能：
- 用户在线时，可通过此回调接收在线房间消息。
- 用户从离线恢复到在线后，若仍在房间中，即可通过此回调接收离线期间内的所有房间消息。

```dart
//新接口
static void Function(ZIM zim, List<ZIMMessage> messageList,
      ZIMMessageReceivedInfo info, String fromRoomID)? onRoomMessageReceived;
//老接口
static void Function(
          ZIM zim, List<ZIMMessage> messageList, String fromRoomID)?
      onReceiveRoomMessage;
```

### 群组消息接收回调

原群组消息接收回调 `onReceiveGroupMessage` 已被废弃，请使用 [onGroupMessageReceived](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMEventHandler/onPeerMessageReceived.html) 代替。
 
新回调支持以下功能：
- 用户在线时，可通过此回调接收在线群组消息。
- 用户重新登录 ZIM SDK 后，可以通过通过此回调接收离线期间（最长7天）收到的所有群聊消息。

```dart
//新接口
static void Function(ZIM zim, List<ZIMMessage> messageList,
      ZIMMessageReceivedInfo info, String fromGroupID)? onGroupMessageReceived;

//老接口
static void Function(
          ZIM zim, List<ZIMMessage> messageList, String fromGroupID)?
      onReceiveGroupMessage;
```


## 2.16.0 升级指南

<Warning title="注意">

请注意，从 2.16.0 版本开始，以下接口有重大变更，因此在从旧版本升级到 2.16.0 版本时，请您阅读以下指南。
</Warning>

#### 1. callCancel 效果变更

<Note title="说明">
以下变更仅对**进阶模式**呼叫邀请而言。
</Note>


在新版本的 [callCancel](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/callCancel.html) 中，如果参数 userIDs 包含一个 userID，则该接口将仅取消邀请该被叫用户。如果 userIDs 参数为空，则该接口将对所有被叫用户取消邀请。

而对于旧版本的 `callCancel` 接口，无论参数 userIDs 是否为空，均视为对所有被叫用户取消邀请。

由于旧版 ZIM SDK 不兼容单独取消逻辑，因此如果您既需要保留使用老版本 ZIM 实现的取消逻辑，又需要使用新版本的单独取消功能，请隔离新老版本 ZIM 之间的呼叫功能。

<CodeGroup>
```dart 2.16.0版本用法
// 单独取消 userIdA 、userIdB
List<String> invitees;  // 被邀请人列表
invitees.add("userIdA","userIdB");  // 被邀请人 ID,
String callid = "12352435";  // 呼叫 ID
ZIMCallCancelConfig config = new ZIMCallCancelConfig();

ZIM
    .getInstance()
    !.callCancel(invitees, callID, callCancelConfig)
    .then((value) => {
})
    .catchError((onError) {});


// invitees 传空数组取消整个呼叫邀请,当整个呼叫中所有被叫都未接受时可以调用成功  
List<String> invitees;  // 被邀请人列表
String callid = "12352435";  // 呼叫 ID
ZIMCallCancelConfig config = new ZIMCallCancelConfig();

ZIM
    .getInstance()
    !.callCancel(invitees, callID, callCancelConfig)
    .then((value) => {
})
    .catchError((onError) {});
```

```dart 旧版本用法
// 无论 userIDs 中是否传递 userID,均为取消整个呼叫，当整个呼叫中所有被叫都未接受时可以调用成功
List<String> invitees;  // 被邀请人列表
invitees.add("userIdA","userIdB");  // 被邀请人 ID,
String callid = "12352435";  // 呼叫 ID
ZIMCallCancelConfig config = new ZIMCallCancelConfig();

ZIM
    .getInstance()
    !.callCancel(invitees, callID, callCancelConfig)
    .then((value) => {
})
    .catchError((onError) {});


// invitees 传空数组取消整个呼叫邀请,当整个呼叫中所有被叫都未接受时可以调用成功  
List<String> invitees;  // 被邀请人列表
String callid = "12352435";  // 呼叫 ID
ZIMCallCancelConfig config = new ZIMCallCancelConfig();

ZIM
    .getInstance()
    !.callCancel(invitees, callID, callCancelConfig)
    .then((value) => {
})
    .catchError((onError) {});
```

</CodeGroup>

## 2.13.0 升级指南

<Warning title="注意">

请注意，从 2.13.0 版本开始，以下接口有重大变更，因此在从旧版本升级到 2.13.0 版本时，请您阅读以下指南。
</Warning>

#### 1. login 方法变更

旧版 `login` 接口被废弃，新版 [login](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/login.html) 接口支持通过 [ZIMLoginConfig](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMLoginConfig-class.html) 进行更多配置，如是否使用 Token 鉴权、是否离线登录。

<CodeGroup>
```dart 2.13.0版本用法
try{
    // 登录时，需要开发者 按照 "使用 Token 鉴权" 文档生成 token 即可
    // userID 最大 32 字节的字符串。仅支持数字，英文字符 和 '!', '#', '$', '%', '&', '(', ')', '+', '-', ':', ';', '<', '=', '.', '>', '?', '@', '[', ']', '^', '_', '{', '}', '|', '~'。
    // userName 最大 256 字节的字符串，无特殊字符限制。
    ZIMLoginConfig loginConfig = ZIMLoginConfig();
    //该用户的用户昵称，不填写代表不修改用户昵称
    loginConfig.userName = 'userName';
    //若使用 token 作为登录鉴权的方式，请填写该参数，否则无需填写
    loginConfig.token = '';
    // 本次登录是否为离线登录，详情请参考离线登录相关文档
    loginConfig.isOfflineLogin = false;
    await ZIM.getInstance()?.login('zego', loginConfig);
    // 登录成功，编写登录成功的业务逻辑
} on PlatformException catch(onError){
    // 登录失败
    //登录失败的错误码，请参考错误码文档进行处理
    onError.code;
    //登录失败的错误信息
    onError.message;
}
```

```dart 旧版本用法
// 登录时，需要开发者 按照 "使用 Token 鉴权" 文档生成 token 即可
// userID 最大 32 字节的字符串。仅支持数字，英文字符 和 '!', '#', '$', '%', '&', '(', ')', '+', '-', ':', ';', '<', '=', '.', '>', '?', '@', '[', ']', '^', '_', '{', '}', '|', '~'。
// userName 最大 256 字节的字符串，无特殊字符限制。
var userInfo = { userID: 'xxxx', userName: 'xxxx' };
var token = '';

zim.login(userInfo, token)
.then(function () {
    // 登录成功
})
.catch(function (err) {
    // 登录失败
});
```
</CodeGroup>


## 2.9.0 升级指南

<Warning title="注意">

请注意，从 2.9.0 版本开始，以下接口有重大变更，因此在从旧版本升级到 2.9.0 版本时，请您阅读以下指南。
</Warning>

#### 1. onCallInvitationTimeout 方法变更

[onCallInvitationTimeout](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMEventHandler/onCallInvitationTimeout.html) 新增参数 `ZIMCallInvitationTimeoutInfo`，开发者需要在调用回调时补充此参数，否则代码无法编译通过。

<CodeGroup>
```dart 2.9.0版本用法
ZIMEventHandler.onCallInvitationTimeout = (ZIM zim, ZIMCallInvitationTimeoutInfo info, String callID){

};
```

```dart 旧版本用法
ZIMEventHandler.onCallInvitationTimeout = (ZIM zim, String callID){

};
```
</CodeGroup>


## 2.3.0 升级指南

<Warning title="注意">
请注意，从 2.3.0 版本开始，API 接口有重大变更，因此在从旧版本升级到 2.3.0 版本时，请您阅读以下指南。
</Warning>

#### 1. [create](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/create.html) 方法变更

将 [create](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/create.html) 方法从成员函数变为静态函数，并将返回值从 `Future<ZIM>` 更改为 `ZIM?`。

当您使用 ZIM 时，请先调用此 API 接口。**此外，您应该删除关键字 `await`。**

<CodeGroup>
```dart 2.3.0版本用法
ZIMAppConfig appConfig = ZIMAppConfig();
appConfig.appID = 12345678;
appConfig.appSign = 'abcdefg...';

ZIM.create(appConfig);
```

```dart 旧版本用法
await ZIM.getInstance().create(12345678);
```
</CodeGroup>

#### 2. [getInstance](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/getInstance.html) 方法变更

将 [getInstance](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/getInstance.html) 方法的返回值从 `ZIM` 改为 `ZIM?`，因此，请您注意处理空安全问题。

每一个 API 接口都需要调整，下面展示其中一个 API 用法调整。

<CodeGroup>
```dart 2.3.0版本用法
await ZIM.getInstance()!.login(userInfo, token);
```

```dart 旧版本用法
await ZIM.getInstance().login(userInfo, token);
```
</CodeGroup>




#### 3. 添加 ZIM 实例参数

我们添加了 ZIM 实例参数作为回调参数。每一个回调都需要调整，下面只展示其中的一个回调。

<CodeGroup>
```dart 2.3.0版本用法
ZIMEventHandler.onConnectionStateChanged = (zim, state, event, extendedData) {
    // to do something...
};
```

```dart 旧版本用法
ZIMEventHandler.onConnectionStateChanged = (state, event, extendedData) {
    // to do something...
};
```
</CodeGroup>


#### 4. 删除不必要的 Future 返回值

我们删除了一些 API 接口中不必要的 Future 返回值，这样就不需要 `await` 返回值了。

涉及到的接口有：[destroy](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/destroy.html)、[logout](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/logout.html)、[setLogConfig](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/setLogConfig.html)、[setCacheConfig](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/setCacheConfig.html)、[beginRoomAttributesBatchOperation](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/beginRoomAttributesBatchOperation.html)。

<CodeGroup>
```dart 2.3.0版本用法
ZIM.setLogConfig(config);
......

ZIM.setCacheConfig(config);
......

ZIM.getInstance()!.beginRoomAttributesBatchOperation(roomID, config);
......

ZIM.getInstance()!.logout();
......

ZIM.getInstance()!.destroy();
......
```

```dart 旧版本用法
await ZIM.getInstance().setLogConfig(config);
......

await ZIM.getInstance().setCacheConfig(config);
......

await ZIM.getInstance().beginRoomAttributesBatchOperation(roomID, config);
......

await ZIM.getInstance().logout();
......

await ZIM.getInstance().destroy();
......
```
</CodeGroup>
  