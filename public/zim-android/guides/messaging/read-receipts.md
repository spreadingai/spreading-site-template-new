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

export const ZIMMessageSendConfigMap = {
  'Android': <a href="@-ZIMMessageSendConfig" target='_blank'>ZIMMessageSendConfig</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMMessageSendConfig-class.html" target='_blank'>ZIMMessageSendConfig</a>,
}
export const sendMessageMap = {
  'Android': <a href="@sendMessage" target='_blank'>sendMessage</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/sendMessage.html" target='_blank'>sendMessage</a>,
}
export const sendMediaMessageMap = {
  'Android': <a href="@sendMediaMessage" target='_blank'>sendMediaMessage</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/sendMediaMessage.html" target='_blank'>sendMediaMessage</a>,
}
export const onPeerMessageReceivedMap = {
  'Android': <a href="@onPeerMessageReceived" target='_blank'>onPeerMessageReceived</a>,
  'Web': <a href="@peerMessageReceived" target='_blank'>peerMessageReceived</a>,
  'UTS': <a href="@peerMessageReceived" target='_blank'>onPeerMessageReceived</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMEventHandler/onPeerMessageReceived.html" target='_blank'>onPeerMessageReceived</a>,
  'iOS': <a href="https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_ios~protocol~ZIMEventHandler#zim-peer-message-received-from-user-id" target='_blank'>peerMessageReceived</a>,
  'mac': <a href="https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_macos~protocol~ZIMEventHandler#zim-peer-message-received-from-user-id" target='_blank'>peerMessageReceived</a>,
}
export const onGroupMessageReceivedMap = {
  'Android': <a href="@onGroupMessageReceived" target='_blank'>onGroupMessageReceived</a>,
  'Web': <a href="@groupMessageReceived" target='_blank'>groupMessageReceived</a>,
  'UTS': <a href="@groupMessageReceived" target='_blank'>onGroupMessageReceived</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMEventHandler/onGroupMessageReceived.html" target='_blank'>onGroupMessageReceived</a>,
  'iOS': <a href="https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_ios~protocol~ZIMEventHandler#zim-group-message-received-from-group-id" target='_blank'>groupMessageReceived</a>,
  'mac': <a href="https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_macos~protocol~ZIMEventHandler#zim-group-message-received-from-group-id" target='_blank'>groupMessageReceived</a>,
}
export const sendMessageReceiptsReadMap = {
  'Android': <a href="@sendMessageReceiptsRead" target='_blank'>sendMessageReceiptsRead</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/sendMessageReceiptsRead.html" target='_blank'>sendMessageReceiptsRead</a>,
}
export const ZIMMessageReceiptsReadSentCallbackMap = {
  'Android': <a href="@-ZIMMessageReceiptsReadSentCallback" target='_blank'>ZIMMessageReceiptsReadSentCallback</a>,
  'Web,UTS': <a href="@-ZIMMessageReceiptsReadSentResult" target='_blank'>ZIMMessageReceiptsReadSentResult</a>,
  'U3d': <a href="https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~interface~ZIMDefines#zim-message-receipts-read-sent-callback" target='_blank'>ZIMMessageReceiptsReadSentCallback</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMMessageReceiptsReadSentResult-class.html" target='_blank'>ZIMMessageReceiptsReadSentCallback</a>,
  'iOS,mac,window': <a href="@ZIMMessageReceiptsReadSentCallback" target='_blank'>ZIMMessageReceiptsReadSentCallback</a>,
}
export const onMessageReceiptChangedMap = {
  'Android': <a href="@onMessageReceiptChanged" target='_blank'>onMessageReceiptChanged</a>,
  'Web': <a href="@messageReceiptChanged" target='_blank'>messageReceiptChanged</a>,
  'UTS': <a href="@messageReceiptChanged" target='_blank'>onMessageReceiptChanged</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMEventHandler/onMessageReceiptChanged.html" target='_blank'>onMessageReceiptChanged</a>,
  'iOS': <a href="https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_ios~protocol~ZIMEventHandler#zim-message-receipt-changed" target='_blank'>messageReceiptChanged</a>,
  'mac': <a href="https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_macos~protocol~ZIMEventHandler#zim-message-receipt-changed" target='_blank'>messageReceiptChanged</a>,
}
export const ZIMEventHandlerMap = {
  'Android': <a href="@-ZIMEventHandler" target='_blank'>ZIMEventHandler</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMEventHandler-class.html" target='_blank'>ZIMEventHandler</a>,
}
export const sendConversationMessageReceiptReadMap = {
  'Android': <a href="@sendConversationMessageReceiptRead" target='_blank'>sendConversationMessageReceiptRead</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/sendConversationMessageReceiptRead.html" target='_blank'>sendConversationMessageReceiptRead</a>,
}
export const ZIMConversationMessageReceiptReadSentCallbackMap = {
  'Android': <a href="@-ZIMConversationMessageReceiptReadSentCallback" target='_blank'>ZIMConversationMessageReceiptReadSentCallback</a>,
  'Web,UTS': <a href="@-ZIMConversationMessageReceiptReadSentResult" target='_blank'>ZIMConversationMessageReceiptReadSentResult</a>,
  'U3d': <a href="https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~interface~ZIMDefines#zim-conversation-message-receipt-read-sent-callback" target='_blank'>ZIMConversationMessageReceiptReadSentCallback</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMConversationMessageReceiptReadSentResult-class.html" target='_blank'>ZIMConversationMessageReceiptReadSentResult</a>,
  'iOS,mac,window': <a href="@ZIMConversationMessageReceiptReadSentCallback" target='_blank'>ZIMConversationMessageReceiptReadSentCallback</a>,
}
export const onConversationMessageReceiptChangedMap = {
  'Android': <a href="@onConversationMessageReceiptChanged" target='_blank'>onConversationMessageReceiptChanged</a>,
  'Web': <a href="@conversationMessageReceiptChanged" target='_blank'>conversationMessageReceiptChanged</a>,
  'UTS': <a href="@conversationMessageReceiptChanged" target='_blank'>onConversationMessageReceiptChanged</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMEventHandler/onConversationMessageReceiptChanged.html" target='_blank'>onConversationMessageReceiptChanged</a>,
  'iOS': <a href="https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_ios~protocol~ZIMEventHandler#zim-conversation-message-receipt-changed" target='_blank'>conversationMessageReceiptChanged</a>,
  'mac': <a href="https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_macos~protocol~ZIMEventHandler#zim-conversation-message-receipt-changed" target='_blank'>conversationMessageReceiptChanged</a>,
}
export const queryMessageReceiptsInfoMap = {
  'Android': <a href="@queryMessageReceiptsInfo" target='_blank'>queryMessageReceiptsInfo</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/queryMessageReceiptsInfo.html" target='_blank'>queryMessageReceiptsInfo</a>,
  'iOS,mac': <a href="@queryMessageReceiptsInfoByMessageList" target='_blank'>queryMessageReceiptsInfoByMessageList</a>,
}
export const ZIMMessageReceiptsInfoQueriedCallbackMap = {
  'Android': <a href="@-ZIMMessageReceiptsInfoQueriedCallback" target='_blank'>ZIMMessageReceiptsInfoQueriedCallback</a>,
  'Web,UTS': <a href="@-ZIMMessageReceiptsInfoQueriedResult" target='_blank'>ZIMMessageReceiptsInfoQueriedResult</a>,
  'U3d': <a href="https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~interface~ZIMDefines#zim-message-receipts-info-queried-callback" target='_blank'>ZIMMessageReceiptsInfoQueriedCallback</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMMessageReceiptsInfoQueriedResult-class.html" target='_blank'>ZIMMessageReceiptsInfoQueriedResult</a>,
  'iOS,mac,window': <a href="@ZIMMessageReceiptsInfoQueriedCallback" target='_blank'>ZIMMessageReceiptsInfoQueriedCallback</a>,
}
export const queryGroupMessageReceiptReadMemberListMap = {
  'Android': <a href="@queryGroupMessageReceiptReadMemberList" target='_blank'>queryGroupMessageReceiptReadMemberList</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/queryGroupMessageReceiptUnreadMemberList.html" target='_blank'>queryGroupMessageReceiptReadMemberList</a>,
  'iOS,mac': <a href="@queryGroupMessageReceiptReadMemberListByMessage" target='_blank'>queryGroupMessageReceiptReadMemberListByMessage</a>,
}
export const queryGroupMessageReceiptUnreadMemberListMap = {
  'Android': <a href="@queryGroupMessageReceiptUnreadMemberList" target='_blank'>queryGroupMessageReceiptUnreadMemberList</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/queryGroupMessageReceiptReadMemberList.html" target='_blank'>queryGroupMessageReceiptUnreadMemberList</a>,
  'iOS,mac': <a href="@queryGroupMessageReceiptUnreadMemberListByMessage" target='_blank'>queryGroupMessageReceiptUnreadMemberListByMessage</a>,
}
export const ZIMTextMessageMap = {
  'Android': <a href="@-ZIMTextMessage" target='_blank'>ZIMTextMessage</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMTextMessage-class.html" target='_blank'>ZIMTextMessage</a>,
}
export const ZIMMultipleMessageMap = {
  'Android': <a href="@-ZIMMultipleMessage" target='_blank'>ZIMMultipleMessage</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMMultipleMessage-class.html" target='_blank'>ZIMMultipleMessage</a>,
}
export const ZIMImageMessageMap = {
  'Android': <a href="@-ZIMImageMessage" target='_blank'>ZIMImageMessage</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMImageMessage-class.html" target='_blank'>ZIMImageMessage</a>,
}
export const ZIMFileMessageMap = {
  'Android': <a href="@-ZIMFileMessage" target='_blank'>ZIMFileMessage</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMFileMessage-class.html" target='_blank'>ZIMFileMessage</a>,
}
export const ZIMAudioMessageMap = {
  'Android': <a href="@-ZIMAudioMessage" target='_blank'>ZIMAudioMessage</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMAudioMessage-class.html" target='_blank'>ZIMAudioMessage</a>,
}
export const ZIMVideoMessageMap = {
  'Android': <a href="@-ZIMVideoMessage" target='_blank'>ZIMVideoMessage</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMVideoMessage-class.html" target='_blank'>ZIMVideoMessage</a>,
}
export const ZIMCombineMessageMap = {
  'Android': <a href="@-ZIMCombineMessage" target='_blank'>ZIMCombineMessage</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMCombineMessage-class.html" target='_blank'>ZIMCombineMessage</a>,
}

# 消息回执

- - -

:::if{props.platform="U3d"}
<Note title="说明">

本文档适用于开发以下平台应用：iOS、Android、macOS、Windows。
</Note>
:::

## 功能简介

消息已读回执，是指用户在会话中发送一条消息后，得知其他用户已读或未读此消息。本功能可用于在企业办公等需要实时知晓消息是否已经被阅读的场景。


<Frame width="auto" height="auto" >
  <img src="https://media-resource.spreading.io/docuo/workspace740/af061ebc6eaf0f12ae9e7f72235bd04e/7c17419de1.png" alt="3_消息回执_中文.png"/>
</Frame>

本文档介绍了如何使用 ZIM SDK 的接口，实现发送一条附带回执的消息，以及查看和应答回执详情等功能。

<Warning title="注意">

ZIM SDK 目前支持发送“单聊”会话和“群组”会话的消息回执（仅支持普通消息和富媒体消息），暂不支持发送“房间”会话的消息回执。

</Warning>


## 实现流程

消息发送端通过 ZIM SDK 发送一条消息，并通过设置 {getPlatformData(props,ZIMMessageSendConfigMap)} 的 `hasReceipt` 字段标记该消息是否需要带回执，接收端可根据消息的回执状态 `receiptStatus` 判断该消息当前是否带回执，或者回执处于正在进行中还是已完成，从而渲染不同的 UI 效果，而接收端可根据不同的场景进行不同的已读方式。

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/ZIM/receipt_2.png" /></Frame>

### 发送一条附带回执的消息

如果客户端 A 想要向客户端 B 发送一条附带回执的消息：

1. 客户端 A 和 客户端 B 登录 ZIM SDK；
:::if{props.platform="undefined|Flutter|iOS|mac|window|Web|UTS"}
<div>
2. 客户端 A 调用 {getPlatformData(props,sendMessageMap)} 或 {getPlatformData(props,sendMediaMessageMap)} 接口，向客户端 B 发送一条消息（仅支持“单聊”会话和“群组”会话的 {getPlatformData(props,ZIMTextMessageMap)}、 {getPlatformData(props,ZIMImageMessageMap)}、 {getPlatformData(props,ZIMFileMessageMap)}、 {getPlatformData(props,ZIMAudioMessageMap)}、 {getPlatformData(props,ZIMVideoMessageMap)}、 {getPlatformData(props,ZIMCombineMessageMap)} 和 {getPlatformData(props,ZIMMultipleMessageMap)}），并设置 {getPlatformData(props,ZIMMessageSendConfigMap)} 的 `hasReceipt` 字段为 true；
</div>
:::
:::if{props.platform="U3d"}
<div>
2. 客户端 A 调用 {getPlatformData(props,sendMessageMap)} 或 {getPlatformData(props,sendMediaMessageMap)} 接口，向客户端 B 发送一条消息（仅支持“单聊”会话和“群组”会话的 {getPlatformData(props,ZIMTextMessageMap)}、 {getPlatformData(props,ZIMImageMessageMap)}、 {getPlatformData(props,ZIMFileMessageMap)}、 {getPlatformData(props,ZIMAudioMessageMap)} 和 {getPlatformData(props,ZIMVideoMessageMap)}），并设置 {getPlatformData(props,ZIMMessageSendConfigMap)} 的 `hasReceipt` 字段为 true；
</div>
:::
3. 客户端 B 通过监听相关回调（ {getPlatformData(props,onPeerMessageReceivedMap)} 或 {getPlatformData(props,onGroupMessageReceivedMap)} ）会收到一条 `receiptStatus` 为 `PROCESSING` 的消息。

### 接收端对消息回执进行已读操作

已读操作分为`消息已读`和`会话已读`。

#### 消息已读

消息已读，是指接收端收到对方发送的附带回执的消息，可对该消息设置已读，已读成功，发送方将会收到该消息已被读的通知。

<Warning title="注意">

- 消息可为单条消息或批量消息，但是消息发送端与接收端必须在同一会话内，不允许跨会话。
- 如需对会话的历史消息进行相关操作，需先完成查询历史消息，对历史消息的回执状态进行判断，详情请参考 [查询历史消息](/zim-android/guides/messaging/get-message-history)。

</Warning>

1. 客户端 B 通过相关回调（ {getPlatformData(props,onPeerMessageReceivedMap)} 或 {getPlatformData(props,onGroupMessageReceivedMap)} ）收到客户端 A 发送的一条附带回执的消息；
2. 客户端 B 根据回调的 `receiptStatus` 字段判断该消息的回执状态。如果是该字段为 `PROCESSING`，表示该消息处于“回执中”，开发者可根据自己的业务逻辑，调用 {getPlatformData(props,sendMessageReceiptsReadMap)} 接口将该消息设置为已读。
3. 客户端 B 通过 {getPlatformData(props,ZIMMessageReceiptsReadSentCallbackMap)} 得知设置是否成功。
4. 客户端 A 通过 {getPlatformData(props,ZIMEventHandlerMap)} 的 {getPlatformData(props,onMessageReceiptChangedMap)} 收到该消息被设置为消息已读的回调通知。开发者可根据这个回调，在客户端 A 实现将此消息设置为已读的业务逻辑。


#### 会话已读

会话已读，是指接收端将指定会话内所有**已接收**的对方消息都设置为已读。

<Warning title="注意">

- 目前 ZIM SDK 只允许在**单聊**会话实现此功能；
- 此功能只作用于设置已读之前获取的消息，不对设置之后的消息生效。
- 此功能建议在用户从会话列表页进入到会话时使用，不推荐在同一会话中与 {getPlatformData(props,sendMessageReceiptsReadMap)} 接口混用。
- 如需对会话的历史消息进行相关操作，需先完成查询历史消息，对历史消息的回执状态进行判断，详情请参考 [查询历史消息](/zim-android/guides/messaging/get-message-history)。
</Warning>

1. 客户端 B 根据回调 {getPlatformData(props,onPeerMessageReceivedMap)} 的 `receiptStatus` 字段判断该消息的回执状态。如果是该字段为 `PROCESSING`，则表示该消息处于回执中，开发者可根据自己的业务逻辑，调用 {getPlatformData(props,sendConversationMessageReceiptReadMap)} 接口将会话内客户端 A 已发送的所有消息都设置为已读。
2. 客户端 B 通过 {getPlatformData(props,ZIMConversationMessageReceiptReadSentCallbackMap)} 得知设置是否成功。
3. 客户端 A 通过 {getPlatformData(props,ZIMEventHandlerMap)} 的 {getPlatformData(props,onConversationMessageReceiptChangedMap)} 收到该消息被设置为会话已读的回调通知，开发者可根据这个回调，实现该会话所有对方发的消息都设置为已读的逻辑。开发者可根据这个回调，在客户端 A 实现自己发的所有消息都被客户端 B 设置为已读的业务逻辑。

## 更多功能

### 批量查询消息的回执状态、已读用户数和未读用户数

当需要查询一条或一批消息的回执状态、已读用户数和未读未读用户数时，可以调用 {getPlatformData(props,queryMessageReceiptsInfoMap)} 接口查询，通过 {getPlatformData(props,ZIMMessageReceiptsInfoQueriedCallbackMap)} 获取相关信息。

<Warning title="注意">

- 如果是查询其他用户发送的信息，得到的已读用户数和未读用户数都是 0。
- 如需对会话的历史消息进行相关操作，需先完成查询历史消息，对历史消息的回执状态进行判断，详情请参考 [查询历史消息](/zim-android/guides/messaging/get-message-history)。
</Warning>

### 查询群组里自己发送的消息的已读和未读成员列表

ZIM SDK 支持查询群组里自己发送的消息的已读成员列表和未读成员列表。

#### 查询已读成员列表

当需要查询有哪些成员读了自己发送的消息，可调用 {getPlatformData(props,queryGroupMessageReceiptReadMemberListMap)} 接口查询具体成员列表。

<Warning title="注意">

如需对会话的历史消息进行相关操作，需先完成查询历史消息，对历史消息的回执状态进行判断，详情请参考 [查询历史消息](/zim-android/guides/messaging/get-message-history)。
</Warning>

#### 查询未读成员列表

当需要查询还有哪些成员未读自己发送的消息，可调用 {getPlatformData(props,queryGroupMessageReceiptUnreadMemberListMap)} 接口查询具体成员列表。

<Warning title="注意">

- 若 SDK 版本低于 2.16.0，当群成员人数大于 100 时，此接口不会返回具体未读成员列表。如需使用此功能，可联系 ZEGO 技术支持。
- 如需对会话的历史消息进行相关操作，需先完成查询历史消息，对历史消息的回执状态进行判断，详情请参考 [查询历史消息](/zim-android/guides/messaging/get-message-history)。
</Warning>

:::if{props.platform=undefined}
```java
zim.setEventHandler(new ZIMEventHandler() {
    @Override
    public void onMessageReceiptChanged(ZIM zim, ArrayList<ZIMMessageReceiptInfo> infos) {
        // 对方设置了消息的已读回执
    }

    @Override
    public void onConversationMessageReceiptChanged(ZIM zim, ArrayList<ZIMMessageReceiptInfo> infos) {
        // 对方设置会话的已读回执
    }
})

// 用户 A 发送一条消息，并带上回执，以单聊文本消息为例

String conversationID = "xxx" ; // 会话 ID

ZIMTextMessage message = new ZIMTextMessage("test");
ZIMMessageSendConfig sendConfig = new ZIMMessageSendConfig();
sendConfig.hasReceipt = true;    // 设置消息带回执
zim.sendMessage(message, conversationID, ZIMConversationType.PEER,sendConfig, new ZIMMessageSentCallback() {
            @Override
            public void onMessageAttached(ZIMMessage message) {}

            @Override
            public void onMessageSent(ZIMMessage message, ZIMError errorInfo) {
                if (errorInfo.code == ZIMErrorCode.SUCCESS) {
                    // 这里表示发送消息成功，message 的 receiptStatus 会为 PROCESSING，业务层可根据这个标志实现展示回执中（消息未读）的逻辑。
                }
            }
        });


// 用户 B 接收到回执，并做已读操作，选择以下任一接口即可

// 消息已读
List<ZIMMessage> messages = new ArrayList<>();
messages.add(message);
zim.sendMessageReceiptsRead(messages, conversationID, ZIMConversationType.PEER, 
        new ZIMMessageReceiptsReadSentCallback() {
            @Override
            public void onMessageReceiptsReadSent(String conversationID, ZIMConversationType conversationType, 
ArrayList<Long> errorMessageIDs, ZIMError errorInfo) {
             if (errorInfo.code == ZIMErrorCode.SUCCESS) {
                // 消息已读的回调
             }
            }
        });

// 会话已读
zim.sendConversationMessageReceiptRead(conversationID, ZIMConversationType.PEER, 
            new ZIMConversationMessageReceiptReadSentCallback() {
            @Override
            public void onConversationMessageReceiptReadSent(String conversationID, 
                ZIMConversationType conversationType, ZIMError errorInfo) {
                if (errorInfo.code == ZIMErrorCode.SUCCESS) {
                    // 会话已读成功，开发者可通过监听这个回调，把这个会话内对方发的消息都设置为已读的标志。
                }
            }
        });


// （可选）查询一批消息的回执状态、未读用户数和已读用户数

List<ZIMMessage> messages = new ArrayList<>();
messages.add(message);
zim.queryMessageReceiptsInfo(messages, conversationID, ZIMConversationType.PEER, new ZIMMessageReceiptsInfoQueriedCallback() {
            @Override
            public void onMessageReceiptsInfoQueried(ArrayList<ZIMMessageReceiptInfo> infos, 
                ArrayList<Long> errorMessageIDs, ZIMError errorInfo) {
                if (errorInfo.code == ZIMErrorCode.SUCCESS) {
                    // 查询到这一批消息的状态和数量，遍历 infos 获取对应的消息 ID 和 count
                }
            }
        });


// （可选）查询某一条群消息的已读群成员列表和未读群成员列表

// 已读用户列表
ZIMGroupMessageReceiptMemberQueryConfig config = new ZIMGroupMessageReceiptMemberQueryConfig();
config.nextFlag = 0;    // 查询的 flag ，初始时填 0，后续填从 callback 里返回的 flag。
config.count = 10;    // 需要查询的用户数量。

zim.queryGroupMessageReceiptReadMemberList(message, groupID, config, 
    new ZIMGroupMessageReceiptMemberListQueriedCallback() {
            @Override
            public void onGroupMessageReceiptMemberListQueried(String groupID, ArrayList<ZIMGroupMemberInfo> userList,
             int nextFlag, ZIMError errorInfo) {
                if (errorInfo.code == ZIMErrorCode.SUCCESS) {
                   // 查询到对应的成员列表
                }
            }
        });

// 未读用户列表
ZIMGroupMessageReceiptMemberQueryConfig config = new ZIMGroupMessageReceiptMemberQueryConfig();
config.nextFlag = 0;    // 查询的 flag ，初始时填 0，后续填从 callback 里返回的 flag。
config.count = 10;    // 需要查询的用户数量。

zim.queryGroupMessageReceiptUnreadMemberList(message, groupID, config, 
    new ZIMGroupMessageReceiptMemberListQueriedCallback() {
            @Override
            public void onGroupMessageReceiptMemberListQueried(String groupID, ArrayList<ZIMGroupMemberInfo> userList,
             int nextFlag, ZIMError errorInfo) {
                if (errorInfo.code == ZIMErrorCode.SUCCESS) {
                   // 查询到对应的成员列表
                }
            }
        });
```
:::

:::if{props.platform="iOS|mac"}
```objc
- (void)zim:(ZIM *)zim messageReceiptChanged:(NSArray<ZIMMessageReceiptInfo *> *)infos{
     // 对方设置了消息的已读回执
}

- (void)zim:(ZIM *)zim conversationMessageReceiptChanged:(NSArray<ZIMMessageReceiptInfo *> *)infos{
    // 对方设置会话的已读回执
}



NSString *conversationID = @"xxx" ; // 会话 ID

// 用户 A 发送一条消息，并带上回执，以单聊文本消息为例

ZIMTextMessage *message = [[ZIMTextMessage alloc] init];
ZIMMessageSendConfig *sendConfig = [[ZIMMessageSendConfig alloc]init];
sendConfig.hasReceipt = true;    // 设置消息带回执
[self.zim sendMessage:cmdMsg toUserID:toUserID conversationType:type config:config notification:notification callback:^((ZIMMessage * _Nonnull message, ZIMError * _Nonnull errorInfo)) {
    // 开发者可以通过该回调监听消息是否发送成功。
    if (errorInfo.code == 0) {
        // 这里表示发送消息成功，message 的 receiptStatus 会为 PROCESSING，业务层可根据这个标志实现展示回执中（消息未读）的逻辑。
    }
}];


// 用户 B 接收到回执，并做已读操作，选择以下任一接口即可

// 消息已读
NSMutableArray<ZIMMessage *> *messageList = [[NSMutableArray alloc] init];

[[ZIM getInstance] sendMessageReceiptsRead:messageList conversationID:@"conversationID" conversationType:conversationType callback:^(NSString * _Nonnull conversationID, ZIMConversationType conversationType, NSArray<NSNumber *> * _Nonnull errorMessageIDs, ZIMError * _Nonnull errorInfo) {
     // 设置消息已读的回调
}];

// 会话已读

[[ZIM getInstance] sendConversationMessageReceiptRead:@"conversationID" conversationType:conversationType callback:^(NSString * _Nonnull conversationID, ZIMConversationType conversationType, ZIMError * _Nonnull errorInfo) {
    // 设置会话已读的回调
}];

// （可选）查询一批消息的回执状态、未读用户数和已读用户数

NSMutableArray<ZIMMessage *> *messageList = [[NSMutableArray alloc] init];
[[ZIM getInstance] queryMessageReceiptsInfoByMessageList:messageList conversationID:conversationID conversationType:conversationType callback:^(NSArray<ZIMMessageReceiptInfo *> * _Nonnull infos, NSArray<NSNumber *> * _Nonnull errorMessageIDs, ZIMError * _Nonnull errorInfo) {
     // 查询到这一批消息的状态和数量，遍历 infos 获取对应    的消息 ID 和 count
}];


// （可选）查询某一条群消息的已读群成员列表和未读群成员列表

// 已读用户列表
ZIMGroupMessageReceiptMemberQueryConfig *config =  [[ZIMGroupMessageReceiptMemberQueryConfig alloc]init];
config.nextFlag = 0;    // 查询的 flag ，初始时填 0，后续填从 callback 里返回的 flag。
config.count = 10;    // 需要查询的用户数量。

[[ZIM getInstance] queryGroupMessageReceiptReadMemberListByMessage:message groupID:groupID config:config callback:^(NSString * _Nonnull groupID, NSArray<ZIMGroupMemberInfo *> * _Nonnull userList, unsigned int nextFlag, ZIMError * _Nonnull errorInfo)    {
    // 查询到对应的成员列表
}];


// 未读用户列表
ZIMGroupMessageReceiptMemberQueryConfig config = new ZIMGroupMessageReceiptMemberQueryConfig();
config.nextFlag = 0;    // 查询的 flag ，初始时填 0，后续填从 callback 里返回的 flag。
config.count = 10;    // 需要查询的用户数量。

[[ZIM getInstance] queryGroupMessageReceiptUnreadMemberListByMessage:message groupID:groupID config:config callback:^(NSString * _Nonnull groupID, NSArray<ZIMGroupMemberInfo *> * _Nonnull userList, unsigned int nextFlag, ZIMError * _Nonnull errorInfo) {
    // 查询到对应的成员列表
}];
```
:::

:::if{props.platform="window"}
```cpp
// 用户 A 发送一条消息，并带上回执，以单聊文本消息为例
zim::ZIMMessageSendConfig sendConfig;
zim::ZIMPushConfig pushConfig;

pushConfig.content = "win_push_content";
pushConfig.payload = "win_push_extended_data";
pushConfig.title = "win_push_title";

sendConfig.priority = zim::ZIM_MESSAGE_PRIORITY_MEDIUM;
sendConfig.pushConfig = &pushConfig;
sendConfig.hasReceipt = true; // 设置消息带回执

auto smessage = std::make_shared<zim::ZIMTextMessage>("test message");

auto notification = std::make_shared<zim::ZIMMessageSendNotification>(
    [=](/zim-android/guides/messaging/const-std::shared_ptr<zim::zimmessage>-&message) { 

        // 消息已入库的通知
    });

zim_->sendMessage(
    std::static_pointer_cast<zim::ZIMMessage>(smessage), userID,
    zim::ZIMConversationType::ZIM_CONVERSATION_TYPE_PEER, sendConfig, notification,
    [=](/zim-android/guides/messaging/const-std::shared_ptr<zim::zimmessage>-&cb_message,-const-zim::zimerror-&errorinfo) {
        if (errorInfo.code == zim::ZIMErrorCode::ZIM_ERROR_CODE_SUCCESS) {
            // 这里表示发送消息成功，message 的 receiptStatus 会为 PROCESSING，业务层可根据这个标志实现展示回执中（消息未读）的逻辑。
        }
    });

// 用户 B 接收到回执，并做已读操作，选择以下任一接口即可

// 消息已读

std::vector<std::shared_ptr<zim::ZIMMessage>> messages;
messages.emplace_back(message);

zim_->sendMessageReceiptsRead(
    messages, conversationID, zim::ZIMConversationType::ZIM_CONVERSATION_TYPE_PEER,
    [=](/zim-android/guides/messaging/const-std::string-&conversationid,-zim::zimconversationtype-conversationtype,-const-std::vector<long-long>-&errormessageids,-const-zim::zimerror-&errorinfo) { 
        // 消息已读的回调
    });

// 会话已读

zim_->sendConversationMessageReceiptRead(
    conversationID, zim::ZIMConversationType::ZIM_CONVERSATION_TYPE_PEER,
    [=](/zim-android/guides/messaging/const-std::string-&conversationid,-zim::zimconversationtype-conversationtype,-const-zim::zimerror-&errorinfo) { 
            // 会话已读的回调，开发者可通过监听这个回调返回的错误码，把这个会话内对方发的消息都设置为已读的标志。
    });

// （可选）查询一批消息的回执状态、未读用户数和已读用户数

std::vector<std::shared_ptr<zim::ZIMMessage>> messages;
messages.emplace_back(message);
zim_->queryMessageReceiptsInfo(
    messages, conversationID, zim::ZIMConversationType::ZIM_CONVERSATION_TYPE_PEER,
    [=](/zim-android/guides/messaging/const-std::vector<zim::zimmessagereceiptinfo>-&infos,-std::vector<long-long>-errormessageids,-const-zim::zimerror-&errorinfo) {});

// （可选）查询某一条群消息的已读群成员列表和未读群成员列表

// 已读用户列表
zim::ZIMGroupMessageReceiptMemberQueryConfig readMemberQueryConfig;
readMemberQueryConfig.count = 10;    // 需要查询的用户数量。
readMemberQueryConfig.nextFlag = 0;    // 查询的 flag ，初始时填 0，后续填从 callback 里返回的 flag。

zim_->queryGroupMessageReceiptReadMemberList(
    message, "group_id", readMemberQueryConfig,
    [=](/zim-android/guides/messaging/const-std::string-&groupid,-const-std::vector<zim::zimgroupmemberinfo>-&userlist,-unsigned-int-nextflag,-const-zim::zimerror-&errorinfo) {
                if (errorInfo.code == zim::ZIMErrorCode::ZIM_ERROR_CODE_SUCCESS) {
                   // 查询到对应的成员列表
                }
        });

// 未读用户列表
zim::ZIMGroupMessageReceiptMemberQueryConfig unreadMemberQueryConfig;
unreadMemberQueryConfig.count = 10;    // 需要查询的用户数量。
unreadMemberQueryConfig.nextFlag = 0;    // 查询的 flag ，初始时填 0，后续填从 callback 里返回的 flag。

zim_->queryGroupMessageReceiptUnreadMemberList(
    message, "group_id", unreadMemberQueryConfig,
    [=](/zim-android/guides/messaging/const-std::string-&groupid,-const-std::vector<zim::zimgroupmemberinfo>-&userlist,-unsigned-int-nextflag,-const-zim::zimerror-&errorinfo) {
                if (errorInfo.code == zim::ZIMErrorCode::ZIM_ERROR_CODE_SUCCESS) {
                   // 查询到对应的成员列表
                }
        });
```
:::

:::if{props.platform="Flutter"}
```dart
ZIMEventHandler.onMessageReceiptChanged = (zim, infos) {
    // 对方设置了消息的已读回执
};

ZIMEventHandler.onConversationMessageReceiptChanged = (zim, infos) {
    // 对方设置会话的已读回执
};

//用户 A 发送一条消息，并带上回执，以单聊文本消息为例

String conversationID = "xxx" ; // 会话 ID

ZIMTextMessage message = ZIMTextMessage(message: "test");
ZIMMessageSendConfig sendConfig = ZIMMessageSendConfig();
sendConfig.hasReceipt = true; //设置消息带回执
ZIM
    .getInstance()!
    .sendMessage(
        message, conversationID, ZIMConversationType.peer, sendConfig)
    .then((result) {
    // 这里表示发送消息成功，message 的 receiptStatus 会为 PROCESSING，业务层可根据这个标志实现展示回执中（消息未读）的逻辑。
    })
    .catchError((onError) {

    });


// 用户 B 接收到回执，并做已读操作，选择以下任一接口即可

// 消息已读

  List<ZIMMessage> messages = [];
  ZIM
      .getInstance()!
      .sendMessageReceiptsRead(
          messages, conversationID, ZIMConversationType.peer)
      .then((result) {
        // 消息已读的回调
      })
      .catchError((onError) {

      });

// 会话已读

  ZIM
      .getInstance()!
      .sendConversationMessageReceiptRead(
          conversationID, ZIMConversationType.peer)
      .then((value) {
        // 会话已读成功，开发者可通过监听这个回调，把这个会话内对方发的消息都设置为已读的标志。
      })
      .catchError((onError) {

      });

// （可选）查询一批消息的回执状态、未读用户数和已读用户数

List<ZIMMessage> messages = [];
  ZIM
      .getInstance()!
      .queryMessageReceiptsInfo(
          messages, conversationID, ZIMConversationType.peer)
      .then((value) {
        // 查询到这一批消息的状态和数量，遍历 infos 获取对应的消息 ID 和 count
      })
      .catchError((onError) {});
// （可选）查询某一条群消息的已读群成员列表和未读群成员列表

// 已读用户列表
ZIMGroupMessageReceiptMemberQueryConfig config =
      ZIMGroupMessageReceiptMemberQueryConfig();
config.nextFlag = 0;    // 查询的 flag ，初始时填 0，后续填从 callback 里返回的 flag。
config.count = 10;    // 需要查询的用户数量。

  ZIM
      .getInstance()!
      .queryGroupMessageReceiptReadMemberList(message, groupID, config)
      .then((result) {
          // 查询到对应的成员列表
      })
      .catchError((onError) {

      });

// 未读用户列表
ZIMGroupMessageReceiptMemberQueryConfig config = ZIMGroupMessageReceiptMemberQueryConfig();
config.nextFlag = 0;    // 查询的 flag ，初始时填 0，后续填从 callback 里返回的 flag。
config.count = 10;    // 需要查询的用户数量。

  ZIM
      .getInstance()!
      .queryGroupMessageReceiptUnreadMemberList(message, groupID, config)
      .then((result) {
          // 查询到对应的成员列表
      })
      .catchError((onError) {

      });
```
:::

:::if{props.platform="U3d"}
```cs
ZIM.GetInstance().onMessageReceiptChanged = (ZIM zim,
                                         List<ZIMMessageReceiptInfo> infos) =>
{
    // 消息的回执状态变化
};

ZIM.GetInstance().onConversationMessageReceiptChanged = (ZIM zim, List<ZIMMessageReceiptInfo> infos) =>
{
    // 单聊会话的回执状态变化
};

// 用户 A 发送一条消息，并带上回执，以单聊文本消息为例

string conversationID = "xxx" ; // 会话 ID

ZIMTextMessage message = new ZIMTextMessage("test");
ZIMMessageSendConfig sendConfig = new ZIMMessageSendConfig();
sendConfig.hasReceipt = true;    // 设置消息带回执
ZIMMessageSendNotification notification = new ZIMMessageSendNotification();
ZIM.GetInstance().SendMessage(message, "conversationID", ZIMConversationType.Peer, sendConfig, notification,
    (ZIMMessage message, ZIMError errorInfo) => { });

// 用户 B 接收到回执，并做已读操作，选择以下任一接口即可

// 消息已读

List<ZIMMessage> messages = new List<ZIMMessage>();
messages.Add(message);
ZIM.GetInstance().SendMessageReceiptsRead(messages, "conversationID", ZIMConversationType.Peer, (string conversationID, ZIMConversationType conversationType,
                   List<long> errorMessageIDs, ZIMError errorInfo) =>
{
    //发送消息已读的回调
});

// 会话已读

ZIM.GetInstance().SendConversationMessageReceiptRead("conversationID", ZIMConversationType.Peer, (string conversationID, ZIMConversationType conversationType,
                           ZIMError errorInfo) =>
{
    //发送会话消息已读的回调
});

// （可选）查询一批消息的回执状态、未读用户数和已读用户数

List<ZIMMessage> queryMessages = new List<ZIMMessage>();
queryMessages.Add(message);
ZIM.GetInstance().QueryMessageReceiptsInfo(queryMessages, "conversationID", ZIMConversationType.Peer, (List<ZIMMessageReceiptInfo> infos, List<long> errorMessageIDs,
                           ZIMError errorInfo) =>
{ });

// （可选）查询某一条群消息的已读群成员列表和未读群成员列表

// 已读用户列表
ZIMGroupMessageReceiptMemberQueryConfig config = new ZIMGroupMessageReceiptMemberQueryConfig();
config.nextFlag = 0;    // 查询的 flag ，初始时填 0，后续填从 callback 里返回的 flag。
config.count = 10;    // 需要查询的用户数量。

ZIM.GetInstance().QueryGroupMessageReceiptReadMemberList(message, "groupID", config, (string groupID, List<ZIMGroupMemberInfo> userList,
                           uint nextFlag, ZIMError errorInfo) =>
{ });

// 未读用户列表
ZIMGroupMessageReceiptMemberQueryConfig groupMessageReceiptMemberQueryConfig = new ZIMGroupMessageReceiptMemberQueryConfig();
groupMessageReceiptMemberQueryConfig.nextFlag = 0;    // 查询的 flag ，初始时填 0，后续填从 callback 里返回的 flag。
groupMessageReceiptMemberQueryConfig.count = 10;    // 需要查询的用户数量。

ZIM.GetInstance().QueryGroupMessageReceiptUnreadMemberList(message, "groupID", groupMessageReceiptMemberQueryConfig, (string groupID, List<ZIMGroupMemberInfo> userList,
                           uint nextFlag, ZIMError errorInfo) => { });
```

:::

:::if{props.platform="Web"}
```typescript
// 1、注册回调

// 对方设置了消息的已读回执
zim.on('messageReceiptChanged', (zim, data) => {
    console.log('messageReceiptChanged', data);
});
// 对方设置了会话的已读回执
zim.on('conversationMessageReceiptChanged', (zim, data) => {
    console.log('conversationMessageReceiptChanged', data);
});
```
:::
:::if{props.platform="UTS"}
```typescript
// 1、注册回调

// 对方设置了消息的已读回执
zim.onMessageReceiptChanged((data) => {
    console.log('messageReceiptChanged', data);
});
// 对方设置了会话的已读回执
zim.onConversationMessageReceiptChanged((data) => {
    console.log('conversationMessageReceiptChanged', data);
});
```
:::
:::if{props.platform="Web|UTS"}
```typescript
// 2、用户 A 发送一条消息给用户 B，并带上回执，以单聊文本消息为例

const userID_A = "xxxx" ;    // 用户 A 的 ID
const userID_B = "xxxx" ;    // 用户 B 的 ID

const messageObj: ZIMMessage = { type: 1, message: '文本回执消息' }
const config: ZIMMessageSendConfig = {
    priority: 1,    // 消息优先级，取值为 低:1 默认, 中:2, 高:3
    hasReceipt: true    // 设置消息带回执
}
const notification: ZIMMessageSendNotification = {
    onMessageAttached: (message: ZIMMessage) => {
        // todo: Loading
    }
}

zim.sendMessage(messageObj, userID_B, 0, config, notification)
    .then((res: ZIMMessageSentResult) => {
        // 发送成功
    })
    .catch((err: ZIMError) => {
        // 发送失败
    });

// 3、用户 B 接收到带回执的消息，并做已读操作，选择以下任一接口即可

// 3.1 消息已读
const messages: ZIMMessage[] = [];    // 从 queryHistoryMessage 查询，或者从 peerMessageReceived 接收
zim.sendMessageReceiptsRead(messages, userID_A, 0)    
    .then((res: ZIMMessageReceiptsReadSentResult) => {
        // 操作成功，设置已读失败的消息通过 res.errorMessageIDs 返回
    })
    .catch((err: ZIMError) => {
        // 操作失败
    });

// 3.2、会话已读
zim.sendConversationMessageReceiptRead(userID_A, 0)
    .then((res: ZIMConversationMessageReceiptReadSentResult) => {
        // 操作成功，用户 B 可把这个会话内用户 A 发的消息都标志为已读
    })
    .catch((err: ZIMError) => {
        // 操作失败
    });

// 4、（可选）用户 A 查询一批消息的回执状态、未读用户数和已读用户数

const messages: ZIMMessage[] = []; // 从 queryHistoryMessage 查询
zim.queryMessageReceiptsInfo(messages, userID_B, 0)    
    .then((res: ZIMMessageReceiptsInfoQueriedResult) => {
        // 操作成功，查询失败的消息通过 res.errorMessageIDs 返回
    })
    .catch((err: ZIMError) => {
        // 操作失败
    });

// 5、（可选）查询某一条群消息的已读群成员列表和未读群成员列表

const groupMsgObj: ZIMMessage = {}    // 从 queryHistoryMessage 查询
const queryConfig: ZIMGroupMessageReceiptMemberQueryConfig = {
    count: 10,    // 需要查询的用户数量
    nextFlag: 0    // 查询的 flag，初始时填 0，后续填从 Promise 里返回的 nextFlag
}

// 5.1 群已读用户列表
zim.queryGroupMessageReceiptReadMemberList(groupMsgObj, groupMsgObj.conversationID, queryConfig)
    .then((res: ZIMGroupMessageReceiptMemberListQueriedResult) => {
        // 操作成功
    })
    .catch((err: ZIMError) => {
        // 操作失败
    });

// 5.2 群未读用户列表
zim.queryGroupMessageReceiptUnreadMemberList(groupMsgObj, groupMsgObj.conversationID, queryConfig)
    .then((res: ZIMGroupMessageReceiptMemberListQueriedResult) => {
        // 操作成功
    })
    .catch((err: ZIMError) => {
        // 操作失败
    });
```
:::