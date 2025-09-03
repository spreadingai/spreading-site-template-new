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

export const loginMap = {
  'Android': <a href="@login__2" target='_blank'>login</a>,
  'iOS': <a href="@loginWithUserID" target='_blank'>loginWithUserID</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/login.html" target='_blank'>login</a>,
}
export const onConnectionStateChangedMap = {
  'Android': <a href="@onConnectionStateChanged" target='_blank'>onConnectionStateChanged</a>,
  'iOS': <a href="https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_ios~protocol~ZIMEventHandler#zim-connection-state-changed-event-extended-data" target='_blank'>connectionStateChanged</a>,
  'mac': <a href="https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_macos~protocol~ZIMEventHandler#zim-connection-state-changed-event-extended-data" target='_blank'>connectionStateChanged</a>,
  'Web': <a href="@connectionStateChanged" target='_blank'>connectionStateChanged</a>,
  'UTS': <a href="@connectionStateChanged" target='_blank'>onConnectionStateChanged</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMEventHandler/onConnectionStateChanged.html" target='_blank'>onConnectionStateChanged</a>,
}
export const logoutMap = {
  'Android': <a href="@logout" target='_blank'>logout</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/logout.html" target='_blank'>logout</a>,
}
export const updateUserNameMap = {
  'Android': <a href="@updateUserName" target='_blank'>updateUserName</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/updateUserName.html" target='_blank'>updateUserName</a>,
}
export const updateUserAvatarUrlMap = {
  'Android': <a href="@updateUserAvatarUrl" target='_blank'>updateUserAvatarUrl</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/updateUserName.html" target='_blank'>updateUserAvatarUrl</a>,
}
export const updateUserExtendedDataMap = {
  'Android': <a href="@updateUserExtendedData" target='_blank'>updateUserExtendedData</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/updateUserExtendedData.html" target='_blank'>updateUserExtendedData</a>,
}
export const onUserInfoUpdatedMap = {
  'Android': <a href="@onUserInfoUpdated" target='_blank'>onUserInfoUpdated</a>,
  'iOS': <a href="https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_ios~protocol~ZIMEventHandler#zim-user-info-updated" target='_blank'>userInfoUpdated</a>,
  'mac': <a href="https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_macos~protocol~ZIMEventHandler#zim-user-info-updated" target='_blank'>userInfoUpdated</a>,
  'Web': <a href="@userInfoUpdated" target='_blank'>userInfoUpdated</a>,
  'UTS': <a href="@userInfoUpdated" target='_blank'>onUserInfoUpdated</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMEventHandler/onUserInfoUpdated.html" target='_blank'>onUserInfoUpdated</a>,
}
export const deleteConversationMap = {
  'Android': <a href="@deleteConversation" target='_blank'>deleteConversation</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/deleteConversation.html" target='_blank'>deleteConversation</a>,
}
export const isAlsoDeleteServerConversationMap = {
  'Android': <a href="@isAlsoDeleteServerConversation" target='_blank'>isAlsoDeleteServerConversation</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMConversationDeleteConfig/isAlsoDeleteServerConversation.html" target='_blank'>isAlsoDeleteServerConversation</a>,
}
export const onConversationChangedMap = {
  'Android': <a href="@onConversationChanged" target='_blank'>onConversationChanged</a>,
  'iOS': <a href="https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_ios~protocol~ZIMEventHandler#zim-conversation-changed" target='_blank'>conversationChanged</a>,
  'mac': <a href="https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_macos~protocol~ZIMEventHandler#zim-conversation-changed" target='_blank'>conversationChanged</a>,
  'Web': <a href="@conversationChanged" target='_blank'>conversationChanged</a>,
  'UTS': <a href="@conversationChanged" target='_blank'>onConversationChanged</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMEventHandler/onConversationChanged.html" target='_blank'>onConversationChanged</a>,
}
export const deleteAllConversationsMap = {
  'Android': <a href="@deleteAllConversations" target='_blank'>deleteAllConversations</a>,
  'iOS': <a href="@deleteAllConversationsWithConfig" target='_blank'>deleteAllConversationsWithConfig</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/deleteAllConversations.html" target='_blank'>deleteAllConversations</a>,
}
export const onConversationsAllDeletedMap = {
  'Android': <a href="@onConversationsAllDeleted" target='_blank'>onConversationsAllDeleted</a>,
  'iOS': <a href="https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_ios~protocol~ZIMEventHandler#zim-conversations-all-deleted" target='_blank'>conversationsAllDeleted</a>,
  'mac': <a href="https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_macos~protocol~ZIMEventHandler#zim-conversations-all-deleted" target='_blank'>conversationsAllDeleted</a>,
  'Web': <a href="@conversationsAllDeleted" target='_blank'>conversationsAllDeleted</a>,
  'UTS': <a href="@conversationsAllDeleted" target='_blank'>onConversationsAllDeleted</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMEventHandler/onConversationsAllDeleted.html" target='_blank'>onConversationsAllDeleted</a>,
}
export const clearConversationTotalUnreadMessageCountMap = {
  'Android': <a href="@clearConversationTotalUnreadMessageCount" target='_blank'>clearConversationTotalUnreadMessageCount</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/clearConversationTotalUnreadMessageCount.html" target='_blank'>clearConversationTotalUnreadMessageCount</a>,
}
export const onConversationTotalUnreadMessageCountUpdatedMap = {
  'Android': <a href="@onConversationTotalUnreadMessageCountUpdated" target='_blank'>onConversationTotalUnreadMessageCountUpdated</a>,
  'iOS': <a href="https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_ios~protocol~ZIMEventHandler#zim-conversation-total-unread-message-count-updated" target='_blank'>conversationTotalUnreadMessageCountUpdated</a>,
  'mac': <a href="https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_macos~protocol~ZIMEventHandler#zim-conversation-total-unread-message-count-updated" target='_blank'>conversationTotalUnreadMessageCountUpdated</a>,
  'Web': <a href="@conversationTotalUnreadMessageCountUpdated" target='_blank'>conversationTotalUnreadMessageCountUpdated</a>,
  'UTS': <a href="@conversationTotalUnreadMessageCountUpdated" target='_blank'>onConversationTotalUnreadMessageCountUpdated</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMEventHandler/onConversationTotalUnreadMessageCountUpdated.html" target='_blank'>onConversationTotalUnreadMessageCountUpdated</a>,
}
export const queryHistoryMessageMap = {
  'Android': <a href="@queryHistoryMessage" target='_blank'>queryHistoryMessage</a>,
  'iOS': <a href="@queryHistoryMessageByConversationID" target='_blank'>queryHistoryMessageByConversationID</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/queryHistoryMessage.html" target='_blank'>queryHistoryMessage</a>,
}
export const deleteMessagesMap = {
  'Android': <a href="@deleteMessages" target='_blank'>deleteMessages</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/deleteMessages.html" target='_blank'>deleteMessages</a>,
}
export const deleteAllMessageMap = {
  'Android': <a href="@deleteAllMessage" target='_blank'>deleteAllMessage</a>,
  'iOS': <a href="@deleteAllMessageByConversationID" target='_blank'>deleteAllMessageByConversationID</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/deleteAllMessage.html" target='_blank'>deleteAllMessage</a>,
}
export const isAlsoDeleteServerMessageMap = {
  'Android': <a href="@isAlsoDeleteServerMessage" target='_blank'>isAlsoDeleteServerMessage</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMMessageDeleteConfig/isAlsoDeleteServerMessage.html" target='_blank'>isAlsoDeleteServerMessage</a>,
}
export const onMessageDeletedMap = {
  'Android': <a href="@onMessageDeleted" target='_blank'>onMessageDeleted</a>,
  'iOS': <a href="https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_ios~protocol~ZIMEventHandler#zim-message-deleted" target='_blank'>messageDeleted</a>,
  'mac': <a href="https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_macos~protocol~ZIMEventHandler#zim-message-deleted" target='_blank'>messageDeleted</a>,
  'Web': <a href="@messageDeleted" target='_blank'>messageDeleted</a>,
  'UTS': <a href="@messageDeleted" target='_blank'>onMessageDeleted</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMEventHandler/onMessageDeleted.html" target='_blank'>onMessageDeleted</a>,
}
export const sendMessageReceiptsReadMap = {
  'Android': <a href="@sendMessageReceiptsRead" target='_blank'>sendMessageReceiptsRead</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/sendMessageReceiptsRead.html" target='_blank'>sendMessageReceiptsRead</a>,
}
export const sendConversationMessageReceiptReadMap = {
  'Android': <a href="@sendConversationMessageReceiptRead" target='_blank'>sendConversationMessageReceiptRead</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/sendConversationMessageReceiptRead.html" target='_blank'>sendConversationMessageReceiptRead</a>,
}
export const onMessageReceiptChangedMap = {
  'Android': <a href="@onMessageReceiptChanged" target='_blank'>onMessageReceiptChanged</a>,
  'iOS': <a href="https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_ios~protocol~ZIMEventHandler#zim-message-receipt-changed" target='_blank'>messageReceiptChanged</a>,
  'mac': <a href="https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_macos~protocol~ZIMEventHandler#zim-message-receipt-changed" target='_blank'>messageReceiptChanged</a>,
  'Web': <a href="@messageReceiptChanged" target='_blank'>messageReceiptChanged</a>,
  'UTS': <a href="@messageReceiptChanged" target='_blank'>onMessageReceiptChanged</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMEventHandler/onMessageReceiptChanged.html" target='_blank'>messageReceiptChanged</a>,
}
export const onConversationMessageReceiptChangedMap = {
  'Android': <a href="@onConversationMessageReceiptChanged" target='_blank'>onConversationMessageReceiptChanged</a>,
  'iOS': <a href="https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_ios~protocol~ZIMEventHandler#zim-conversation-message-receipt-changed" target='_blank'>conversationMessageReceiptChanged</a>,
  'mac': <a href="https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_macos~protocol~ZIMEventHandler#zim-conversation-message-receipt-changed" target='_blank'>conversationMessageReceiptChanged</a>,
  'Web': <a href="@conversationMessageReceiptChanged" target='_blank'>conversationMessageReceiptChanged</a>,
  'UTS': <a href="@conversationMessageReceiptChanged" target='_blank'>onConversationMessageReceiptChanged</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMEventHandler/onConversationMessageReceiptChanged.html" target='_blank'>onConversationMessageReceiptChanged</a>,
}
export const onRoomStateChangedMap = {
  'Android': <a href="@onRoomStateChanged" target='_blank'>onRoomStateChanged</a>,
  'iOS': <a href="https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_ios~protocol~ZIMEventHandler#zim-room-state-changed-event-extended-data" target='_blank'>roomStateChanged</a>,
  'mac': <a href="https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_macos~protocol~ZIMEventHandler#zim-room-state-changed-event-extended-data" target='_blank'>roomStateChanged</a>,
  'Web': <a href="@roomStateChanged" target='_blank'>roomStateChanged</a>,
  'UTS': <a href="@roomStateChanged" target='_blank'>onRoomStateChanged</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMEventHandler/onRoomStateChanged.html" target='_blank'>onRoomStateChanged</a>,
}
export const callAcceptMap = {
  'Android': <a href="@callAccept" target='_blank'>callAccept</a>,
  'iOS': <a href="@callAcceptWithCallID" target='_blank'>callAcceptWithCallID</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/callAccept.html" target='_blank'>callAccept</a>,
}
export const callRejectMap = {
  'Android': <a href="@callReject" target='_blank'>callReject</a>,
  'iOS': <a href="@callRejectWithCallID" target='_blank'>callRejectWithCallID</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/callReject.html" target='_blank'>callReject</a>,
}
export const ZIMCallAcceptanceSentCallbackMap = {
  'Android': <a href="@-ZIMCallAcceptanceSentCallback" target='_blank'>ZIMCallAcceptanceSentCallback</a>,
  'window,iOS,mac': <a href="@ZIMCallAcceptanceSentCallback" target='_blank'>ZIMCallAcceptanceSentCallback</a>,
  'Web,UTS': <a href="@-ZIMCallAcceptanceSentResult" target='_blank'>ZIMCallAcceptanceSentResult</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMCallAcceptanceSentResult-class.html" target='_blank'>ZIMCallAcceptanceSentResult</a>,
}
export const ZIMCallRejectionSentCallbackMap = {
  'Android': <a href="@-ZIMCallRejectionSentCallback" target='_blank'>ZIMCallRejectionSentCallback</a>,
  'window,iOS,mac': <a href="@ZIMCallRejectionSentCallback" target='_blank'>ZIMCallRejectionSentCallback</a>,
  'Web,UTS': <a href="@-ZIMCallRejectionSentResult" target='_blank'>ZIMCallRejectionSentResult</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMCallRejectionSentResult-class.html" target='_blank'>ZIMCallRejectionSentResult</a>,
}
export const ZIMCallUserStateMap = {
  'Android': <a href="@-ZIMCallUserState" target='_blank'>ZIMCallUserState</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMCallUserState.html" target='_blank'>ZIMCallUserState</a>,
}
export const onCallUserStateChangedMap = {
  'Android': <a href="@onCallUserStateChanged" target='_blank'>onCallUserStateChanged</a>,
  'iOS': <a href="https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_ios~protocol~ZIMEventHandler#zim-call-user-state-changed-call-id" target='_blank'>callUserStateChanged</a>,
  'mac': <a href="https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_macos~protocol~ZIMEventHandler#zim-call-user-state-changed-call-id" target='_blank'>callUserStateChanged</a>,
  'Web': <a href="@callUserStateChanged" target='_blank'>callUserStateChanged</a>,
  'UTS': <a href="@callUserStateChanged" target='_blank'>onCallUserStateChanged</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMEventHandler/onCallUserStateChanged.html" target='_blank'>onCallUserStateChanged</a>,
}
export const deleteAllConversationMessagesMap = {// Flutter特有的api
  'Android': "",
  "Flutter": <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/deleteAllConversationMessages.html" target="_blank">deleteAllConversationMessages</a>
}


# 多端登录

- - -

## 功能简介

ZIM SDK 支持配置自定义多端登录，即用户同一个账号可在多个平台上同时登录，满足用户的会话、消息、群组、房间等数据互通。

<Note title="说明">
- 如需使用此功能，请开通专业版或旗舰版套餐。
- 本功能仅支持 2.11.0 及以上版本的 SDK 使用。
</Note>

## 常见的登录策略

多端登录可支持在 Android、iOS、HarmonyOS、Windows、macOS、Linux、iPadOS、Web、小程序等 9 个平台上配置，其中:

- 支持在 Windows、macOS、Linux、Android、HarmonyOS、iOS、iPadOS 平台配置多设备登录，一个账号在同一时间只能在最多 10 台设备上进行登录。
- 在 Web 平台配置多实例登录，最多不超过 10 个登录实例。

以下为 ZIM SDK 支持的三种登录策略，即单平台登录、双平台登录以及多平台登录：

|登录策略 |	具体说明 |
| :-- | :-- | 
| 单平台登录（默认） | 仅支持用户同时在 1 个平台上登录帐号。如果在其他平台上登录帐号，原平台上的账号会被退出。 |
| 双平台登录 | 支持用户在 Windows、Mac、Linux、Android、HarmonyOS、iOS 和 iPad 的其中 1 个平台上登录帐号，并同时保持帐号在 Web 平台在线。 |
| 多平台登录 | 是指支持用户同时在 Windows、Mac、Linux、Android、HarmonyOS、iOS、iPad、Web、小程序多平台登录帐号，支持以下配置：<br/><ul><li>同一平台同时多设备、实例登录。</li><li>配置互踢逻辑，当前仅支持 Android、HarmonyOS、iOS 设备互踢，Windows、Mac 设备互踢。</li></ul> |


## 实现流程

前往 ZEGO 控制台开通多端登录服务，详情请参考控制台文档 [服务配置 - 即时通讯 - 多端登录配置](https://doc-zh.zego.im/article/21499)。开通后，即可在多端调用 {getPlatformData(props,loginMap)} 登录 ZIM SDK，实现流程与单端登录无异。如何登录，详情请参考 [实现基本消息收发](/zim-android/send-and-receive-messages) 的“登录 ZIM“。 

当登录设备已达到策略规定的上限时，如果在新设备登录帐号，原设备中最早登录的帐号会被踢下线，并通过 {getPlatformData(props,onConnectionStateChangedMap)} 回调得知 event 为 `KickedOut` 。例如：登录策略规定最多只能在 3 台设备上登录，已在设备 A、B、C（按登录时间排序）登录，如果在设备 D 上登录帐号，则设备 A 上的帐号会被踢下线。

当帐号被踢下线后，建议调用 {getPlatformData(props,logoutMap)} 接口登出 ZIM 服务，用户界面切换为登录界面。

## 多端登录对其他功能的影响

配置多端登录后，以下功能的代码也需要做相应调整。

### 用户信息管理

ZIM SDK 为多端登录用户提供了用户信息同步的功能。当用户在一端通过 {getPlatformData(props,updateUserNameMap)} 、 {getPlatformData(props,updateUserAvatarUrlMap)} 、 {getPlatformData(props,updateUserExtendedDataMap)} 接口更新了自己的信息后，其他在线客户端可通过注册 {getPlatformData(props,onUserInfoUpdatedMap)} 事件监听用户信息被修改。

#### onUserInfoUpdated 示例

:::if{props.platform=undefined}
```java
public class ZIMEventHandler {
    public void onUserInfoUpdated(ZIM zim, ZIMUserFullInfo info) {
        // 可以在 info 中获取：用户 ID，用户名，用户头像，用户额外字段
        String userID = info.baseInfo.userID;
        String userName = info.baseInfo.userName;
        String userAvatarUrl = info.userAvatarUrl;
        String extendedData = info.extendedData;
    }
}
```

:::

:::if{props.platform="Flutter"}
```dart
ZIMEventHandler.onUserInfoUpdated = (ZIM zim, ZIMUserFullInfo info){
    // 您可以从info中获取以下信息：用户ID、用户名、用户头像、用户附加字段
    String userID = info.baseInfo.userID;
    String userName = info.baseInfo.userName;
    String userAvatarUrl = info.userAvatarUrl;
    String extendedData = info.extendedData;
};
```
:::

:::if{props.platform="iOS|mac"}
```objc
- (void)zim:(ZIM *)zim userInfoUpdated:(ZIMUserFullInfo *)info{
         // 可以从info中获取到用户ID、用户名、用户头像、用户附加字段
         NSString *userID = info.baseInfo.userID;
         NSString *userName = info.baseInfo.userName;
         NSString *userAvatarUrl = info.userAvatarUrl;
         NSString *userExtendedData = info.extendedData;
}
```
:::

:::if{props.platform="window"}

```Cpp
class zim_event_handler : public zim::ZIMEventHandler {
...
virtual void onUserInfoUpdated(zim::ZIM * zim, const zim::ZIMUserFullInfo & info) override {
    // 可以在info中获取：用户ID、用户名、用户头像、用户附加字段
    auto user_id = info.baseInfo.userID;
    auto user_name = info.baseInfo.userName;
    auto user_avatar_url = info.userAvatarUrl;
    auto user_extended_data = info.extendedData;
}

...
}
```
:::
:::if{props.platform="Web"}
```typescript
zim.on('userInfoUpdated', (zim, data) => {
});
```
:::
:::if{props.platform="UTS"}
```typescript
zim.onUserInfoUpdated((data) => {
});
```
:::

### 会话管理

#### 删除单个服务端会话

当用户在一端通过 {getPlatformData(props,deleteConversationMap)} 接口删除服务端会话后（即 {getPlatformData(props,isAlsoDeleteServerConversationMap)} 为 true），其他在线客户端可通过注册 {getPlatformData(props,onConversationChangedMap)} 事件监听会话被删除。

#### onConversationChanged 示例

:::if{props.platform=undefined}
```java
public class ZIMEventHandler{
...
    public void onConversationChanged(ZIM zim, ArrayList<ZIMConversationChangeInfo> conversationChangeInfoList){
        for (ZIMConversationChangeInfo convInfo : conversationChangeInfoList) {
            if (convInfo.event == ZIMConversationEvent.DELETED) {
                // 会话被删除
            }
        }
    }

...
}
```
:::
:::if{props.platform="Flutter"}
```dart
ZIMEventHandler.onConversationChanged = (ZIM zim, List<ZIMConversationChangeInfo> conversationChangeInfoList){
    for (ZIMConversationChangeInfo convInfo : conversationChangeInfoList) {
        if (convInfo.event == ZIMConversationEvent.delete) {
       // 该对话已被删除
        }
    }
};
```
:::
:::if{props.platform="iOS|mac"}
```objc
- (void)zim:(ZIM *)zim
    conversationChanged:(NSArray<ZIMConversationChangeInfo * > *)conversationChangeInfoList{
        for(ZIMConversationChangeInfo *convInfo in conversationChangeInfoList){
            if(convInfo.event == ZIMConversationEventDeleted){
                // 该对话已被删除
            }
        }
}
```
:::
:::if{props.platform="window"}
```Cpp
class zim_event_handler : public zim::ZIMEventHandler {
...

    virtual void onConversationChanged(zim::ZIM *zim, 
                                       const std::vector<zim::ZIMConversationChangeInfo> &conversationChangeInfoList) override {
        for (const auto &conv_info : conversationChangeInfoList) {
            if (conv_info.event == zim::ZIMConversationEvent::ZIM_CONVERSATION_EVENT_DELETED) {
                // 该对话已被删除
            }
        }
    }

...
}
```
:::
:::if{props.platform="Web"}
```typescript
zim.on('conversationChanged', (zim, data) => {
    data.infoList.forEach((info) => {
        if (info.event == 3) {
            //对话已被删除
        }
    });
});
```
:::
:::if{props.platform="UTS"}
```typescript
zim.onConversationChanged((data) => {
    data.infoList.forEach((info) => {
        if (info.event == 3) {
            //对话已被删除
        }
    });
});
```
:::


#### 删除全部服务端会话

当用户在一端通过 {getPlatformData(props,deleteAllConversationsMap)} 接口删除全部服务端会话后（即 {getPlatformData(props,isAlsoDeleteServerConversationMap)} 为 true），其他客户端可通过 {getPlatformData(props,onConversationsAllDeletedMap)} 事件监听全部会话被删除。

#### onConversationsAllDeleted 处理示例

:::if{props.platform=undefined}
```java
@Override
public void onConversationsAllDeleted(ZIM zim, ZIMConversationsAllDeletedInfo info) {
        // 其他端删除了全部会话
}
```

:::
:::if{props.platform="Flutter"}
```dart
ZIMEventHandler.onConversationChanged = (ZIM zim, List<ZIMConversationChangeInfo> conversationChangeInfoList){
    for (ZIMConversationChangeInfo convInfo : conversationChangeInfoList) {
        if (convInfo.event == ZIMConversationEvent.delete) {
        // 该对话已被删除
        }
    }
};
```
:::
:::if{props.platform="iOS|mac"}
```objc
- (void)zim:(ZIM *)zim
    conversationsAllDeleted:(ZIMConversationsAllDeletedInfo *)info{
        //另一方删除了所有会话。
}
```
:::
:::if{props.platform="window"}
```Cpp
class zim_event_handler : public zim::ZIMEventHandler {
...

    virtual void onConversationsAllDeleted(zim::ZIM *zim, 
                                       const ZIMConversationsAllDeletedInfo &info) override {
        另一方删除了所有会话。
   }
...
}
```
:::
:::if{props.platform="Web"}
```typescript
zim.on('conversationsAllDeleted', (zim, data) => {
    console.log('已删除的对话数量', data.count);
});
```
:::
:::if{props.platform="UTS"}
```typescript
zim.onConversationsAllDeleted((data) => {
    console.log('已删除的对话数量', data.count);
});
```
:::

#### 清楚全部会话未读

当用户在一端通过 {getPlatformData(props,clearConversationTotalUnreadMessageCountMap)} 清除全部会话未读时，其他客户端可通过 {getPlatformData(props,onConversationTotalUnreadMessageCountUpdatedMap)} 事件监听所有会话的未读都被清零的通知。

#### onConversationTotalUnreadMessageCountUpdated 处理示例

:::if{props.platform=undefined}
```java
@Override
public void onConversationTotalUnreadMessageCountUpdated(ZIM zim, int totalUnreadMessageCount) {
        // 其他端清除全部会话未读后，本端该通知 totalUnreadMessageCount 的值将为 0
}
```

:::
:::if{props.platform="Flutter"}
```dart
ZIMEventHandler.onConversationsAllDeleted = (
      ZIM zim, ZIMConversationsAllDeletedInfo info){
        // 所有对话已被另一个客户删除
}
```
:::
:::if{props.platform="iOS|mac"}
```objc
- (void)zim:(ZIM *)zim
conversationTotalUnreadMessageCountUpdated:(unsigned int)totalUnreadMessageCount{
    //在其他设备上清除所有对话中的未读消息后，当前设备上的totalUnreadMessageCount值将为0。
}
```
:::
:::if{props.platform="window"}
```Cpp
class zim_event_handler : public zim::ZIMEventHandler {
...

    virtual void onConversationTotalUnreadMessageCountUpdated(zim::ZIM *zim, 
                                       unsigned int totalUnreadMessageCount) override {
        //在其他设备上清除所有对话中的未读消息后，当前设备上的totalUnreadMessageCount值将为0。
   }
...
}
```
:::
:::if{props.platform="Web"}
```typescript
zim.on('conversationTotalUnreadMessageCountUpdated', (zim, data) => {
    //在其他设备上清除所有对话中的未读消息后，当前设备上的`data.totalUnreadMessageCount`值将为0。
});
```
:::
:::if{props.platform="UTS"}
```typescript
zim.onConversationTotalUnreadMessageCountUpdated((data) => {
    //在其他设备上清除所有对话中的未读消息后，当前设备上的`data.totalUnreadMessageCount`值将为0。
});
```
:::

### 消息管理

#### 消息同步

当用户登录新设备后，SDK 不会自动将旧设备中的已有消息同步到新设备上，用户需要主动调用 {getPlatformData(props,queryHistoryMessageMap)} 接口，才能获取存储于 ZIM 服务端的消息，详情请参考 [获取历史消息](/zim-android/guides/messaging/get-message-history)。对于存储于旧设备的本地消息，则无法获取。

#### 删除服务端消息

当用户在一端通过 {getPlatformData(props,deleteMessagesMap)} 、 {getPlatformData(props,deleteAllMessageMap)} 、 {getPlatformData(props,deleteAllConversationMessagesMap)} 接口删除会话的服务端消息后（即 {getPlatformData(props,isAlsoDeleteServerMessageMap)} 为 true），其他在线客户端可通过注册 {getPlatformData(props,onMessageDeletedMap)} 事件监听消息被删除。

##### 调用接口示例


:::if{props.platform=undefined}
```java
public class ZIMEventHandler{
...
    public void onMessageDeleted(ZIM zim, ZIMMessageDeletedInfo deletedInfo){

      if (deletedInfo.messageDeleteType == ZIMMessageDeleteType.MESSAGE_LIST_DELETED)
          {
              // 某个会话中的多条消息被删除
              for (ZIMMessage message : messageList) {
                  // 遍历每一条被删除的消息
              }
          } else if (deletedInfo.messageDeleteType ==
                    ZIMMessageDeleteType.CONVERSATION_ALL_MESSAGES_DELETED)
          {
              // 某个会话当前所有消息被删除
          } else if (deletedInfo.messageDeleteType ==
                    ZIMMessageDeleteType.ALL_CONVERSATION_MESSAGES_DELETED)
          {
              // 所有会话的所有消息被删除
          }
      }
...
}
```

:::
:::if{props.platform="Flutter"}
```dart
ZIMEventHandler.onMessageDeleted = (ZIM zim, ZIMMessageDeletedInfo deletedInfo){
    if (deletedInfo.messageDeleteType == ZIMMessageDeleteType.messageListDeleted)
        {
            // 会话中的多条消息已被删除
            for (var message in messageList) {
                // 遍历每条已删除的消息
            }
        } else if (deletedInfo.messageDeleteType ==
                   ZIMMessageDeleteType.conversationAllMessagesDeleted)
        {
            // 会话中的所有消息已被删除
        } else if (deletedInfo.messageDeleteType ==
                   ZIMMessageDeleteType.allConversationMessagesDeleted)
        {
            // 所有会话中的消息都已被删除
        }
}
```
:::
:::if{props.platform="iOS|mac"}

```objc
- (void)zim:(ZIM *)zim messageDeleted:(ZIMMessageDeletedInfo *)deletedInfo{
        if (deletedInfo.messageDeleteType == ZIMMessageDeleteTypeMessageListDeleted)
        {
            // 会话中删除了多条消息
            for (ZIMMessage *message in messageList) {
             // 遍历每条被删除的消息
            }

        } else if (deletedInfo.messageDeleteType ==
                   ZIMMessageDeleteTypeConversationAllMessagesDeleted)
        {
            // 删除了会话中的所有当前消息
        } else if (deletedInfo.messageDeleteType ==
                   ZIMMessageDeleteTypeAllConversationMessagesDeleted)
        {
            // 删除了所有会话的所有消息
        }
}
```
:::
:::if{props.platform="window"}
```Cpp
class zim_event_handler : public zim::ZIMEventHandler {
...
virtual void onMessageDeleted(zim::ZIM * /*zim*/, const zim::ZIMMessageDeletedInfo &deletedInfo) override {
    if (deletedInfo.messageDeleteType == zim::ZIM_MESSAGE_DELETE_TYPE_MESSAGE_LIST_DELETED)
    {
        // 多条消息被删除
        for (const auto& message : deletedInfo.messageList)
        {
            // 遍历每条被删除的消息
        }
    } else if (deletedInfo.messageDeleteType ==
               zim::ZIM_MESSAGE_DELETE_TYPE_CONVERSATION_ALL_MESSAGES_DELETED)
    {
        // 会话中的所有当前消息被删除
    } else if (deletedInfo.messageDeleteType ==
               zim::ZIM_MESSAGE_DELETE_TYPE_ALL_CONVERSATION_MESSAGES_DELETED)
    {
        // 所有会话的所有消息被删除
    }
...
}
```
:::
:::if{props.platform="Web"}
```typescript
zim.on('messageDeleted', (zim, data) => {
    const messageDeleteType = data.messageDeleteType;
    if (messageDeleteType == 2 ) {
        // 会话中的所有消息都被删除
     } else if (messageDeleteType == 1 ) {
        // 会话中的所有当前消息都被删除
    } else if (messageDeleteType == 0) {
        // 会话中指定的消息被删除
    }
});
```
:::
:::if{props.platform="UTS"}
```typescript
zim.onMessageDeleted((data) => {
    const messageDeleteType = data.messageDeleteType;
    if (messageDeleteType == 2 ) {
        // 会话中的所有消息都被删除
     } else if (messageDeleteType == 1 ) {
        // 会话中的所有当前消息都被删除
    } else if (messageDeleteType == 0) {
        // 会话中指定的消息被删除
    }
});
```
:::

#### 设置消息回执已读

当用户在一端通过 {getPlatformData(props,sendMessageReceiptsReadMap)} 、 {getPlatformData(props,sendConversationMessageReceiptReadMap)} 接口设置消息回执已读后，其他在线客户端可通过注册 {getPlatformData(props,onMessageReceiptChangedMap)} 、 {getPlatformData(props,onConversationMessageReceiptChangedMap)} 事件监听本帐号已设置消息回执为已读。

##### 调用接口示例

:::if{props.platform=undefined}
```java
public class ZIMEventHandler {
...

    public void onMessageReceiptChanged(ZIM zim, ArrayList<ZIMMessageReceiptInfo> infos) {
        for (ZIMMessageReceiptInfo info : infos) {
            if (info.isSelfOperated) {
                // 用户自己设置的消息回执已读
            }
        }
    }

    public void onConversationMessageReceiptChanged(ZIM zim, ArrayList<ZIMMessageReceiptInfo> infos) {
        for (ZIMMessageReceiptInfo info : infos) {
            if (info.isSelfOperated) {
                // 用户自己设置的消息回执已读
            }
        }
    }
...
}
```
:::
:::if{props.platform="Flutter"}
```dart
ZIMEventHandler.onMessageReceiptChanged = (ZIM zim, List<ZIMMessageReceiptInfo> infos){
    for (ZIMMessageReceiptInfo info : infos) {
        if (info.isSelfOperated) {
            // 用户已将消息回执设置为已读
        }
    }
};

ZIMEventHandler.onConversationMessageReceiptChanged = (ZIM zim, List<ZIMMessageReceiptInfo> infos){
    for (ZIMMessageReceiptInfo info : infos) {
        if (info.isSelfOperated) {
            // 用户已将消息回执设置为已读
        }
    }
};
```
:::
:::if{props.platform="iOS|mac"}
```objc
- (void)zim:(ZIM *)zim messageReceiptChanged:(NSArray<ZIMMessageReceiptInfo *> *)infos{
        for(ZIMMessageReceiptInfo *info in infos){
            if (info.isSelfOperated) {
                // 用户将消息回执设置为已读
            }
        }

}

- (void)zim:(ZIM *)zim conversationMessageReceiptChanged:(NSArray<ZIMMessageReceiptInfo *> *)infos{
        for (ZIMMessageReceiptInfo *info in infos) {
            if (info.isSelfOperated) {
                // 用户将会话回执设置为已读
            }
        }
}
```
:::
:::if{props.platform="window"}
```Cpp
class zim_event_handler : public zim::ZIMEventHandler {
...

   virtual void onMessageReceiptChanged(zim::ZIM * /*zim*/,
                const std::vector<zim::ZIMMessageReceiptInfo> & infos) override {
        for (const auto &info : infos) {
            if (info.isSelfOperated) {
                // 用户将消息回执设置为已读
            }
        }
    }

    virtual void onConversationMessageReceiptChanged(zim::ZIM *zim, 
                const std::vector<zim::ZIMMessageReceiptInfo> &infos) override {
        for (const auto &info : infos) {
            if (info.isSelfOperated) {
                // 用户将会话回执设置为已读
            }
        }
    }

...
}
```
:::
:::if{props.platform="Web"}
```typescript
zim.on('messageReceiptChanged', (zim, data) => {
    data.infos.forEach((info) => {
        if (info.isSelfOperated) {
            // 用户将消息回执设置为已读
        }
    });
});

zim.on('conversationMessageReceiptChanged', (zim, data) => {
    data.infos.forEach((info) => {
        if (info.isSelfOperated) {
            // 用户将会话回执设置为已读
        }
    });
});
```
:::
:::if{props.platform="UTS"}
```typescript
zim.onMessageReceiptChanged((data) => {
    data.infos.forEach((info) => {
        if (info.isSelfOperated) {
            // 用户将消息回执设置为已读
        }
    });
});

zim.onConversationMessageReceiptChanged((data) => {
    data.infos.forEach((info) => {
        if (info.isSelfOperated) {
            // 用户将会话回执设置为已读
        }
    });
});
```
:::

### 房间管理

房间模块相关接口和事件默认不支持多端登录。用户在 A 设备加入房间后，然后在 B 设备再加入相同的房间后，会把 A 设备踢出房间，A 设备会通过 {getPlatformData(props,onRoomStateChangedMap)} 回调收到 `event` 为 `KickedOutByMultiDevice`。

:::if{props.platform=undefined}
```java
public class ZIMEventHandler {
...
    public void onRoomStateChanged(ZIM zim, ZIMRoomState state, ZIMRoomEvent event, JSONObject extendedData, String roomID) {
        if (state == ZIMRoomState.DISCONNECTED &&
            event == ZIMRoomEvent.KICKED_OUT) {
            // 多端登录加入房间，被踢出房间
        }
    }
...
}
```

:::
:::if{props.platform="Flutter"}
```dart
ZIMEventHandler.onRoomStateChanged = (ZIM zim, ZIMRoomState state, ZIMRoomEvent event,
    Map extendedData, String roomID){
        if (state == ZIMRoomState.disconnected &&
            event == ZIMRoomEvent.kickedOut) {
        // 由于多设备登录而被踢出房间
        }
    };
```
:::
:::if{props.platform="iOS|mac"}
```objc
- (void)zim:(ZIM *)zim
    roomStateChanged:(ZIMRoomState)state
               event:(ZIMRoomEvent)event
        extendedData:(NSDictionary *)extendedData
              roomID:(NSString *)roomID{
        if (state == ZIMConnectionStateDisconnected &&
            event == ZIMRoomEventKickedOutByOtherDevice) {
           // 由于多设备登录而被踢出房间
        }
}

```
:::

:::if{props.platform="window"}
```Cpp
class zim_event_handler : public zim::ZIMEventHandler {
...

    virtual void onRoomStateChanged(zim::ZIM *zim, zim::ZIMRoomState state, zim::ZIMRoomEvent event,
                                    const std::string &extendedData,
                                    const std::string &roomID) override {
        if (state == zim::ZIMRoomState::ZIM_ROOM_STATE_DISCONNECTED &&
            event == zim::ZIMRoomEvent::ZIM_ROOM_EVENT_KICKED_OUT_BY_OTHER_DEVICE) {
           // 由于多设备登录被踢出房间
        }
    }
...
}
```
:::
:::if{props.platform="Web"}
```typescript
// When a user joins a room on device A, and then joins the same room on device B, device A will be kicked out of the room
zim.on('roomStateChanged', (zim, data) => {
    if (data.state == 0 && data.event == 10) {
       // 由于多设备登录被踢出房间
    }
});
```
:::
:::if{props.platform="UTS"}
```typescript
// When a user joins a room on device A, and then joins the same room on device B, device A will be kicked out of the room
zim.onRoomStateChanged((data) => {
    if (data.state == 0 && data.event == 10) {
       // 由于多设备登录被踢出房间
    }
});
```
:::

如需支持同一用户在多个设备上同时登录房间，可在控制台自行开启该功能，详见控制台文档：[多端登录配置](https://doc-zh.zego.im/article/21499)。开启后，多个设备以相同 UserID 加入同一房间时将不会互相踢出。此时，你需维护房间成员列表，对 UserID 进行去重。  

### 群组管理

在开通多端登录服务后，ZIM SDK 会自动在多端设备之间同步群组相关数据。

### 呼叫邀请管理

当用户同时登录设备 A 和 B，用户收到呼叫邀请，在设备 A 上接受邀请（调用 {getPlatformData(props,callAcceptMap)} ）或者拒绝邀请（调用 {getPlatformData(props,callRejectMap)} ) 后：
1. 设备 A 可以通过相关操作的回调（ {getPlatformData(props,ZIMCallAcceptanceSentCallbackMap)} 或  {getPlatformData(props,ZIMCallRejectionSentCallbackMap)} )得知操作结果，关闭邀请弹窗，实现其他业务操作；
2. 设备 B 应当通过 {getPlatformData(props,onCallUserStateChangedMap)} 回调，得知本用户的呼叫用户状态（ {getPlatformData(props,ZIMCallUserStateMap)} ）是 `Accepted` 还是 `Rejected`，关闭邀请弹窗，实现其他业务操作

各个设备能收到该呼叫内的用户状态变更事件 {getPlatformData(props,onCallUserStateChangedMap)} 如下表所示：

| callUserState | 设备 A | 设备 B |
|-|-|-|
| Inviting | ✔️ | ✔️ |
| Received | ✔️ | ✔️ |
| Accepted | ✔️ | ✔️ |
| Rejected | ✔️ | ✔️ |
| Timeout | ✖ | ✖ |
| Cancelled | ✖ | ✖ |
| Quit | ✔️ | ✖ |

##### 调用接口示例

:::if{props.platform=undefined}
```java
String selfUserID = "user_id";
String currentCallID = "call_id";

ZIMCallAcceptConfig acceptConfig;
acceptConfig.extendedData = "extra_1";

ZIMCallRejectConfig rejectConfig;
rejectConfig.extendedData = "extra_1";

// 设备 A 接受邀请
zim.callAccept(currentCallID, acceptConfig, new ZIMCallAcceptanceSentCallback() {
     @Override
     public void onCallAcceptanceSent(String callID, ZIMError errorInfo) {
         // 关闭呼叫等待操作的弹框。
     }
});

// 设备 A 拒绝邀请
zim.callReject(currentCallID, rejectConfig, new ZIMCallRejectionSentCallback() {
     @Override
     public void onCallRejectionSent(String callID, ZIMError errorInfo) {
         // 关闭呼叫等待操作的弹框。
     }
});

// 设备 B 监听 onCallUserStateChanged

public class ZIMEventHandler {
...
    public void onCallUserStateChanged(ZIM zim, ZIMCallUserStateChangeInfo info, String callID) {
         if (currentCallID == callID) {
                // 设备 A 已经接受或者拒绝时，关闭呼叫等待操作的弹框
            }
        });
    }

```
:::
:::if{props.platform="Flutter"}
```dart
String selfUserID = "user_id";
String currentCallID = "call_id";

ZIMCallAcceptConfig acceptConfig;
acceptConfig.extendedData = "extra_1";

ZIMCallRejectConfig rejectConfig;
rejectConfig.extendedData = "extra_1";

// 设备A接受邀请
ZIM.getInstance()!.callAccept(currentCallID, acceptConfig).then((value) {
    // 关闭呼叫等待操作的弹窗。
}).catchError((onError){
    // 处理异常
});

// 设备A拒绝邀请
ZIM.getInstance()!.callReject(currentCallID, rejectConfig).then((value) {
    // 关闭呼叫等待操作的弹窗。
}).catchError((onError){
    // 处理异常
});

// 设备B监听onCallUserStateChanged事件
ZIMEventHandler.onCallUserStateChanged = (ZIM zim, ZIMCallUserStateChangeInfo callUserStateChangeInfo, String callID){
    if (currentCallID == callID) {
         // 当设备A接受或拒绝时，关闭呼叫等待操作的弹窗。
    }
};
```
:::
:::if{props.platform="iOS|mac"}
```objc
NSString *selfUserId = @"user_id";
NSString *currentCallId = @"call_id";

ZIMCallAcceptConfig *acceptConfig = [[ZIMCallAcceptConfig alloc] init];
acceptConfig.extendedData = @"extra_1";

ZIMCallRejectConfig *rejectConfig = [[ZIMCallRejectConfig alloc] init];
rejectConfig.extendedData = @"extra_1";

// 设备A接受邀请
[[ZIM getInstance] callAcceptWithCallID:currentCallId config:acceptConfig callback:^(NSString * _Nonnull callID, ZIMError * _Nonnull errorInfo) {
        // 关闭呼叫等待操作的弹出框，呼叫结束。
 }];
// 设备A拒绝邀请
[[ZIM getInstance] callRejectWithCallID:currentCallId config:rejectConfig callback:^(NSString * _Nonnull callID, ZIMError * _Nonnull errorInfo) {
        // 关闭呼叫等待操作的弹出框，呼叫结束。
 }];

// 设备B监听callUserStateChanged
- (void)zim:(ZIM *)zim
    callUserStateChanged:(ZIMCallUserStateChangeInfo *)info
                  callID:(NSString *)callID{
        for(ZIMCallUserInfo *userInfo in info.callUserList){
            if(userInfo.userID == selfUserId && (userInfo.state == ZIMCallUserStateAccepted ||  userInfo.state == ZIMCallUserStateRejected)){
                 // 当设备A接受或拒绝时，关闭呼叫等待操作的弹出框。
            }
            }
        }
}
```
:::
:::if{props.platform="window"}
```Cpp
const std::string self_user_id = "user_id";
const std::string current_call_id = "call_id";

zim::ZIMCallAcceptConfig accept_config;
accept_config.extendedData = "extra_1";

zim::ZIMCallRejectConfig reject_config;
reject_config.extendedData = "extra_1";

// 设备A接受邀请
zim_->callAccept(current_call_id, accept_config, [=] (const std::string &callID, const ZIMError &errorInfo) {
        // 关闭呼叫等待操作的弹出框。呼叫结束。
});
// 设备A拒绝邀请
zim_->callReject(current_call_id, reject_config, [=] (const std::string &callID, const ZIMError &errorInfo) {
        // 关闭呼叫等待操作的弹出框。呼叫结束。
 }];

// 设备B监听callUserStateChanged事件

class zim_event_handler : public zim::ZIMEventHandler {
...

    virtual void onCallUserStateChanged(zim::ZIM * /*zim*/,
                                               const zim::ZIMCallUserStateChangeInfo &info,
                                               const std::string &callID) override {
        for (const auto &user_info : callUserList) {
            if (user_info.userID == self_user_id &&
                (user_info.state == zim::ZIMCallUserState::ZIM_CALL_USER_STATE_ACCEPTED ||
                 user_info.state == zim::ZIMCallUserState::ZIM_CALL_USER_STATE_REJECTED)) {
                 // 当设备A接受或拒绝时，关闭呼叫等待操作的弹出框。
            }
        });
    }
...
}
```
:::
:::if{props.platform="Web"}

```typescript
const selfUserID = '';
const curCallID = '';

// 设备A接受邀请
zim.callAccept(curCallID, { extendedData: '设备A接受邀请' } as ZIMCallAcceptConfig)
    .then((res: ZIMCallAcceptanceSentResult) => {
        // 关闭呼叫等待操作的弹出框。开始流发布和播放，进行音视频通话。
    });
// 设备A拒绝邀请
zim.callReject(curCallID, { extendedData: '设备A拒绝邀请' } as ZIMCallRejectConfig)
    .then((res: ZIMCallRejectionSentResult) => {
        // 关闭呼叫等待操作的弹出框。通话结束。
    });

// 设备B监听callUserStateChanged事件
zim.on('callUserStateChanged', (zim, data) => {
    if (curCallID == data.callID) {
        data.callUserList.forEach((item) => {
            if (item.userID == selfUserID && (item.state == 1 || item.state == 2)) {
                // 当设备A接受或拒绝时，关闭呼叫等待操作的弹出框。
            }
        });
    }
});
```
:::
:::if{props.platform="UTS"}

```typescript
const selfUserID = '';
const curCallID = '';

// 设备A接受邀请
zim.callAccept(curCallID, { extendedData: '设备A接受邀请' } as ZIMCallAcceptConfig)
    .then((res: ZIMCallAcceptanceSentResult) => {
        // 关闭呼叫等待操作的弹出框。开始流发布和播放，进行音视频通话。
    });
// 设备A拒绝邀请
zim.callReject(curCallID, { extendedData: '设备A拒绝邀请' } as ZIMCallRejectConfig)
    .then((res: ZIMCallRejectionSentResult) => {
        // 关闭呼叫等待操作的弹出框。通话结束。
    });

// 设备B监听callUserStateChanged事件
zim.onCallUserStateChanged((data) => {
    if (curCallID == data.callID) {
        data.callUserList.forEach((item) => {
            if (item.userID == selfUserID && (item.state == 1 || item.state == 2)) {
                // 当设备A接受或拒绝时，关闭呼叫等待操作的弹出框。
            }
        });
    }
});
```
:::
