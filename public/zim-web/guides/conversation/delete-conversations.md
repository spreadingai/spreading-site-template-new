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

export const deleteConversationMap = {
  'Android': <a href="@deleteConversation" target='_blank'>deleteConversation</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/deleteConversation.html" target='_blank'>deleteConversation</a>,
}
export const deleteAllMessageMap = {
  'Android': <a href="@deleteAllMessage" target='_blank'>deleteAllMessage</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/deleteAllMessage.html" target='_blank'>deleteAllMessage</a>,
  'iOS': <a href="https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_ios~protocol~ZIM#delete-all-message-by-conversation-id-conversation-id-conversation-type-config-callback" target='_blank'>deleteAllMessageByConversationID</a>,
  'mac': <a href="https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_macos~protocol~ZIM#delete-all-message-by-conversation-id-conversation-id-conversation-type-config-callback" target='_blank'>deleteAllMessageByConversationID</a>,

}
export const onConversationTotalUnreadMessageCountUpdatedMap = {
  'Android': <a href="@onConversationTotalUnreadMessageCountUpdated" target='_blank'>onConversationTotalUnreadMessageCountUpdated</a>,
  'Web': <a href="@conversationTotalUnreadMessageCountUpdated" target='_blank'>conversationTotalUnreadMessageCountUpdated</a>,
  'UTS': <a href="@conversationTotalUnreadMessageCountUpdated" target='_blank'>onConversationTotalUnreadMessageCountUpdated</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMEventHandler/onConversationTotalUnreadMessageCountUpdated.html" target='_blank'>conversationTotalUnreadMessageCountUpdated</a>,
  'iOS': <a href="https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_ios~protocol~ZIMEventHandler#zim-conversation-total-unread-message-count-updated" target='_blank'>conversationTotalUnreadMessageCountUpdated</a>,
  'mac': <a href="https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_macos~protocol~ZIMEventHandler#zim-conversation-total-unread-message-count-updated" target='_blank'>conversationTotalUnreadMessageCountUpdated</a>,
}
export const deleteAllConversationsMap = {
  'Android': <a href="@deleteAllConversations" target='_blank'>deleteAllConversations</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/deleteAllConversations.html" target='_blank'>deleteAllConversations</a>,
  'iOS,mac': <a href="@deleteAllConversationsWithConfig" target='_blank'>deleteAllConversationsWithConfig</a>,
}
export const ZIMConversationDeletedCallbackMap = {
  'Android': <a href="@-ZIMConversationDeletedCallback" target='_blank'>ZIMConversationDeletedCallback</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/deleteConversation.htmlhttps://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/deleteConversation.html" target='_blank'>ZIMConversationDeletedResult</a>,
  'iOS,mac': <a href="@ZIMConversationDeletedCallback" target='_blank'>ZIMConversationDeletedCallback</a>,
  'Web,UTS': <a href="@-ZIMConversationDeletedResult">ZIMConversationDeletedResult</a>,
}

export const ZIMConversationsAllDeletedCallbackMap = {
  'Android': <a href="@-ZIMConversationsAllDeletedCallback" target='_blank'>ZIMConversationsAllDeletedCallback</a>,
  'iOS,mac': <a href="@ZIMConversationsAllDeletedCallback" target='_blank'>ZIMConversationsAllDeletedCallback</a>,
}

# 删除会话

- - -

## 功能简介

ZIM 支持用户删除会话列表中的某个会话和全部会话。

## 删除单个会话

用户登录后，可以删除自己的会话列表中的某个会话。开发者通过调用 {getPlatformData(props,deleteConversationMap)} 接口，传入 conversationID 指定会话，删除某个会话。

随后，开发者可通过 {getPlatformData(props, ZIMConversationDeletedCallbackMap)} 获取删除操作结果。

<Note title="说明">
- 删除某个会话时：
  - 会话内的所有消息并不会自动删除。开发者如果需要同时删除会话和会话内的所有消息，请先调用 {getPlatformData(props,deleteAllMessageMap)} 接口（详情请参考 [删除消息](/zim-web/guides/messaging/delete-messages#删除指定会话的全部消息)）删除所有消息，再调用 {getPlatformData(props,deleteConversationMap)} 接口删除该会话。
  - 如果这个会话存在未读消息，将会通过 {getPlatformData(props,onConversationTotalUnreadMessageCountUpdatedMap)} 回调接口，减少消息未读总数，详情请参考 [4 获取消息未读总数](/zim-web/guides/conversation/get-the-conversation-list)。
- 当用户多端登录时，仅发起删除操作的那一端会收到 {getPlatformData(props, ZIMConversationDeletedCallbackMap)}，如需了解该用户其他在线客户端如何获取删除事件，请参考 [多端登录 - 删除单个服务端会话](/zim-web/guides/users/multi-device-login#删除单个服务端会话)。
</Note>

:::if{props.platform=undefined}
<CodeGroup>
```java title="示例代码"
// 删除某个会话，以下为 删除单聊会话
ZIMConversationDeleteConfig config = new ZIMConversationDeleteConfig();
config.isAlsoDeleteServerConversation = true;

zim.deleteConversation("CONV_ID", ZIMConversationType.GROUP, config, new ZIMConversationDeletedCallback() {
    @Override
    public void onConversationDeleted(ZIMError errorInfo) {
        // 获取删除会话的结果
        if(errorInfo.code == ZIMErrorCodeSuccess) {
          // ......
        } else {
          // ......
        }            
    }
});
```
</CodeGroup>

:::
:::if{props.platform="iOS|mac"}
<CodeGroup>
```objc title="示例代码"
// 删除某个会话，以下为 删除单聊会话
ZIMConversationDeleteConfig *config = [[ZIMConversationDeleteConfig alloc] init];
config.isAlsoDeleteServerConversation = YES;
[self.zim deleteConversation:@"CONV_ID" conversationType: ZIMConversationTypePeer config:config callback:^(ZIMError * _Nonnull errorInfo) {
    // 获取删除会话的结果
    if(errorInfo.code == ZIMErrorCodeSuccess) {
      // ......
    } else {
      // ......
    }
}];
```
</CodeGroup>
:::
:::if{props.platform="window"}
<CodeGroup>
```cpp title = "示例代码"
// 删除某个会话，以下为 删除单聊会话
ZIMConversationDeleteConfig config;
config.isAlsoDeleteServerConversation = true;

zim->deleteConversation("CONV_ID", ZIMConversationTypePeer, config, [=](/zim-web/guides/conversation/zimerror-errorinfo) {
    // 获取删除会话的结果
    if(errorInfo.code == ZIMErrorCodeSuccess) {
      // ......
    } else {
      // ......
    }
});
```
</CodeGroup>
:::
:::if{props.platform="Web|UTS"}
<CodeGroup>
```typescript title="示例代码"
// 删除某个会话，以下为 删除单聊会话
const conversationID = '';
const conversationType = 0;
const config: ZIMConversationDeleteConfig = { isAlsoDeleteServerConversation: true };
zim.deleteConversation(conversationID, conversationType, config)
    .then((res: ZIMConversationDeletedResult) => {
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
// 删除某个会话，以下为 删除单聊会话
ZIMConversationDeleteConfig conversationDeleteConfig =
      ZIMConversationDeleteConfig();
conversationDeleteConfig.isAlsoDeleteServerConversation = true;
ZIM
    .getInstance()
    !.deleteConversation(
        'conversationID', ZIMConversationType.peer, conversationDeleteConfig)
    .then((value) => {})
    .catchError((onError) {});
```
</CodeGroup>
:::


## 删除全部会话

用户登录后，可以删除会话列表中的所有会话。开发者通过调用 {getPlatformData(props,deleteAllConversationsMap)} 接口删除全部会话。


:::if{props.platform="iOS|mac|Android"}
随后，开发者可通过 {getPlatformData(props, ZIMConversationsAllDeletedCallbackMap)} 获取删除操作结果。

<Note title="说明">
当用户多端登录时，发起删除的客户端才会收到 {getPlatformData(props, ZIMConversationsAllDeletedCallbackMap)}。其他在线客户端如需同步删除事件，请参考 [多端登录 - 删除全部服务端会话](/zim-web/guides/users/multi-device-login#删除全部服务端会话)。
</Note>
:::

:::if{props.platform="Flutter|Web|UTS"}
<Note title="说明">
当用户多端登录时，发起删除的客户端只需关注操作是否成功（或捕获异常）。其他在线客户端如需同步删除事件，请参考 [多端登录 - 删除全部服务端会话](/zim-web/guides/users/multi-device-login#删除全部服务端会话)。
</Note>
:::

:::if{props.platform=undefined}
<CodeGroup>
```java title="示例代码"
// 删除全部会话
ZIMConversationDeleteConfig config = new ZIMConversationDeleteConfig();
config.isAlsoDeleteServerConversation = true;

zim.deleteAllConversations(config, new ZIMConversationsAllDeletedCallback() {
    @Override
    public void onConversationsAllDeleted(ZIMError errorInfo) {
             // 删除全部会话后的回调。
        }
});
```
</CodeGroup>
:::
:::if{props.platform="iOS|mac"}
<CodeGroup>
```objc title="示例代码"
// 删除全部会话

ZIMConversationDeleteConfig *config = [[ZIMConversationDeleteConfig alloc] init];
config.isAlsoDeleteServerConversation = YES;

[self.zim deleteAllConversationsWithConfig:config callback:^(ZIMError * _Nonnull errorInfo) {
    // 获取删除会话的结果
    if(errorInfo.code == ZIMErrorCodeSuccess) {
      // ......
    } else {
      // ......
    }
}];
```
</CodeGroup>
:::
:::if{props.platform="window"}
<CodeGroup>
```Cpp title="示例代码"
// 删除全部会话
ZIMConversationDeleteConfig config;
config.isAlsoDeleteServerConversation = true;

zim->deleteAllConversations(config, [=](/zim-web/guides/conversation/zimerror-errorinfo) {
    // 获取删除全部会话的结果
    if(errorInfo.code == ZIMErrorCodeSuccess) {
      // ......
    } else {
      // ......
    }
});
```
</CodeGroup>
:::
:::if{props.platform="Web|UTS"}
<CodeGroup>
```typescript title="示例代码"
// 删除全部会话
const config: ZIMConversationDeleteConfig = { isAlsoDeleteServerConversation: true };
zim.deleteAllConversations(config)
    .then(() => {
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
// 删除全部会话
ZIMConversationDeleteConfig config = ZIMConversationDeleteConfig();
config.isAlsoDeleteServerConversation = true;

ZIM.getInstance()!.deleteAllConversations(config).then((value) => {})
    .catchError((onError) {});
```
</CodeGroup>
:::


<Content platform="Web" />