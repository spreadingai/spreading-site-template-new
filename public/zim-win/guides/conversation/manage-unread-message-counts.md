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

export const queryConversationListMap = {
  'Android': <a href="@queryConversationList" target='_blank'>queryConversationList</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/queryConversationList.html" target='_blank'>queryConversationList</a>,
  'iOS,mac': <a href="@queryConversationListWithConfig" target='_blank'>queryConversationListWithConfig</a>,
}
export const queryConversationMap = {
  'Android': <a href="@queryConversation" target='_blank'>queryConversation</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/queryConversation.html" target='_blank'>queryConversation</a>,
}
export const unreadMessageCountMap = {
  'Android': <a href="@unreadMessageCount-ZIMConversation" target='_blank'>unreadMessageCount</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMConversation/unreadMessageCount.html" target='_blank'>unreadMessageCount</a>,
}
export const onConversationChangedMap = {
  'Android': <a href="@onConversationChanged" target='_blank'>onConversationChanged</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMEventHandler/onConversationChanged.html" target='_blank'>onConversationChanged</a>,
  'Web': <a href="@conversationChanged" target='_blank'>conversationChanged</a>,
  'UTS': <a href="@conversationChanged" target='_blank'>onConversationChanged</a>,
  'iOS': <a href="https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_ios~protocol~ZIMEventHandler#zim-conversation-changed" target='_blank'>conversationChanged</a>,
  'mac': <a href="https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_macos~protocol~ZIMEventHandler#zim-conversation-changed" target='_blank'>conversationChanged</a>,
}
export const onConversationTotalUnreadMessageCountUpdatedMap = {
  'Android': <a href="@onConversationTotalUnreadMessageCountUpdated" target='_blank'>onConversationTotalUnreadMessageCountUpdated</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMEventHandler/onConversationTotalUnreadMessageCountUpdated.html" target='_blank'>onConversationTotalUnreadMessageCountUpdated</a>,
  'Web': <a href="@conversationTotalUnreadMessageCountUpdated" target='_blank'>conversationTotalUnreadMessageCountUpdated</a>,
  'UTS': <a href="@conversationTotalUnreadMessageCountUpdated" target='_blank'>onConversationTotalUnreadMessageCountUpdated</a>,
  'iOS': <a href="https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_ios~protocol~ZIMEventHandler#zim-conversation-total-unread-message-count-updated" target='_blank'>conversationTotalUnreadMessageCountUpdated</a>,
  'mac': <a href="https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_macos~protocol~ZIMEventHandler#zim-conversation-total-unread-message-count-updated" target='_blank'>conversationTotalUnreadMessageCountUpdated</a>,
}
export const setEventHandlerMap = {
  'Android': <a href="@setEventHandler" target='_blank'>setEventHandler</a>,
  'Web,UTS': <a href="@on" target='_blank'>on</a>,
  "Flutter":" ",
}
export const clearConversationUnreadMessageCountMap = {
  'Android': <a href="@clearConversationUnreadMessageCount" target='_blank'>clearConversationUnreadMessageCount</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/clearConversationUnreadMessageCount.html" target='_blank'>clearConversationUnreadMessageCount</a>,
}
export const clearConversationTotalUnreadMessageCountMap = {
  'Android': <a href="@clearConversationTotalUnreadMessageCount" target='_blank'>clearConversationTotalUnreadMessageCount</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/clearConversationTotalUnreadMessageCount.html" target='_blank'>clearConversationTotalUnreadMessageCount</a>,
}


# 管理会话未读数

- - -

## 功能简介

通过 ZIM，您可以获取单个会话的消息未读数，计算所有会话消息未读数的总和，并支持清除上述数值。

<Frame width="auto" height="auto">
  <img src="https://media-resource.spreading.io/docuo/workspace740/af061ebc6eaf0f12ae9e7f72235bd04e/c5246a7349.png" alt="5_消息未读数_中文.png"/>
</Frame>

## 获取单个会话消息未读数

ZIM 支持主动或被动获取某个会话的未读数。

### 主动获取

如需主动获取某个会话的未读数，请先调用 {getPlatformData(props,queryConversationListMap)} 或 {getPlatformData(props,queryConversationMap)} 获取到目标会话对象，即可从目标会话对象的 {getPlatformData(props,unreadMessageCountMap)} 属性了解该会话的消息未读数。

### 被动获取

请监听 {getPlatformData(props,onConversationChangedMap)} 回调，获取会话的 {getPlatformData(props,unreadMessageCountMap)} 属性，了解会话的最新消息未读数，详情请参考 [获取会话列表 - 监听会话变更](/zim-win/guides/conversation/get-the-conversation-list#监听会话变更)。


## 获取消息未读总数

:::if{props.platform="undefined|Web|iOS|mac|Flutter|window"}
用户登录后，可以查询自己当前有多少未读消息。开发者可以通过 {getPlatformData(props,setEventHandlerMap)} 监听的 {getPlatformData(props,onConversationTotalUnreadMessageCountUpdatedMap)} 回调接口，获取消息的未读总数。
:::
:::if{props.platform="UTS"}
用户登录后，可以查询自己当前有多少未读消息。开发者可以通过 {getPlatformData(props,onConversationTotalUnreadMessageCountUpdatedMap)} 回调接口，获取消息的未读总数。
:::

用户登录成功后，以下情况出现时，均会通过该接口，获取消息未读总数更新的通知：

- 立即收到一次存储于本地数据库中的未读总数。
- 用户接收到新消息、且当前会话没有开启消息免打扰。
- 用户主动清理了会话未读数量，具体请参考下文 [清除单个会话消息未读数](/zim-win/guides/conversation/manage-unread-message-counts#清除单个会话消息未读数) 和 [清除全部会话消息未读数](/zim-win/guides/conversation/manage-unread-message-counts#清除全部会话消息未读数)。

开发者可以通过此回调通知，调整自己应用的 UI 展示，用于提醒用户当前有多少条消息未读。    

:::if{props.platform=undefined}
<CodeGroup>
```java title="示例代码"
// 注册 SDK 事件通知监听
zim.setEventHandler(this);

...

// 接收消息未读总数的回调通知
public void onConversationTotalUnreadMessageCountUpdated(ZIM zim, int totalUnreadMessageCount) {
    // 获取会话总未读数用于 UI 展示
    // ......
}
```

</CodeGroup>
:::
:::if{props.platform="iOS|mac"}
<CodeGroup>
```objc title="示例代码"
// 注册 SDK 事件通知监听
[self.zim setEventHandler:self];

...

// 接收消息未读总数的回调通知
- (void)zim:(ZIM *)zim conversationTotalUnreadMessageCountUpdated:(unsigned int)totalUnreadMessageCount {
    // 获取会话总未读数用于 UI 展示
    // ......
}
```
</CodeGroup>
:::
:::if{props.platform="window"}
<CodeGroup>
```Cpp title="示例代码"
// 注册 SDK 事件通知监听
zim->setEventHandler(shared_from_this());

...

// 接收消息未读总数的回调通知
virtual void onConversationTotalUnreadMessageCountUpdated(ZIM * zim, unsigned int totalUnreadMessageCount) {
    // 获取会话总未读数用于 UI 展示
    // ......
}
```
</CodeGroup>
:::
:::if{props.platform="Web"}
<CodeGroup>
```typescript title="示例代码"
zim.on('conversationTotalUnreadMessageCountUpdated', (zim, data) => {
    // 获取会话总未读数用于 UI 展示
});
```
</CodeGroup>
:::
:::if{props.platform="UTS"}
<CodeGroup>
```typescript title="示例代码"
zim.onConversationTotalUnreadMessageCountUpdated((data) => {
    // 获取会话总未读数用于 UI 展示
});
```
</CodeGroup>
:::
:::if{props.platform="Flutter"}
<CodeGroup>

```dart title="示例代码"
// 接收消息未读总数的回调通知
ZIMEventHandler.onConversationTotalUnreadMessageCountUpdated =
      (zim, totalUnreadMessageCount) {
     // 获取会话总未读数用于 UI 展示
    // ......        
};
```
</CodeGroup>
:::



## 清除单个会话消息未读数

用户登录并成功拉取到会话列表后，可以通过调用 {getPlatformData(props,clearConversationUnreadMessageCountMap)} 接口，清除某个会话的未读消息数。

由于 SDK 并不知道用户何时应该清除会话未读数，因此开发者需要在用户与某些页面交互时触发调用该接口，以下为常见的调用时机：

- 点击会话，进入了该会话的聊天界面内，需要调用该接口。
- 用户一直处于聊天界面，每次收到消息后，都需要调用该接口。
- 在会话列表界面中，标记某条未读的会话为已读时，需要调用该接口。




:::if{props.platform=undefined}
<CodeGroup>
```java title="示例代码"
zim.clearConversationUnreadMessageCount("CONV_ID", ZIMConversationType.PEER, new ZIMConversationUnreadMessageCountClearedCallback() {
    @Override
    public void onConversationUnreadMessageCountCleared(ZIMError errorInfo) {
        // 获取清除未读数的结果
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
// 清除指定会话的未读消息数量
[self.zim clearConversationUnreadMessageCount:@"CONV_ID" conversationType: ZIMConversationTypePeer callback:^(ZIMError * _Nonnull errorInfo) {
    // 获取清除未读数的结果
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
// 清除指定会话的未读消息数量
zim->clearConversationUnreadMessageCount("CONV_ID", ZIMConversationTypePeer, [=](/zim-win/guides/conversation/zimerror-errorinfo) {
    // 获取清除未读数的结果
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
const conversationID = '';
const conversationType = 0;
zim.clearConversationUnreadMessageCount(conversationID, conversationType)
    .then((res: ZIMConversationUnreadMessageCountClearedResult) => {
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
ZIM
    .getInstance()
    !.clearConversationUnreadMessageCount(
        'conversationID', ZIMConversationType.peer)
    .then((value) => {})
    .catchError((onError) {});
```
</CodeGroup>
:::

<a id="clearConversationTotalUnreadMessageCount"></a>
## 清除全部会话消息未读数

用户登录并成功拉取到会话列表后，可以通过调用 {getPlatformData(props,clearConversationTotalUnreadMessageCountMap)} 接口，清除全部会话的未读消息数。

当开发者想实现清除**全部会话消息未读数**和**消息未读总数**时，可使用该接口。




:::if{props.platform=undefined}
<CodeGroup>
```java title="示例代码"
// 清除全部会话的未读消息数量
zim.clearConversationTotalUnreadMessageCount(new ZIMConversationTotalUnreadMessageCountClearedCallback() {
    @Override
    public void onConversationTotalUnreadMessageCountCleared(ZIMError errorInfo) {
        // 获取清除未读数的结果
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
```objc title="示例代码"
// 清除全部会话的未读消息数量
[self.zim clearConversationTotalUnreadMessageCount:callback:^(ZIMError * _Nonnull errorInfo) {
    // 获取清除未读数的结果
    if(errorInfo.code == ZIMErrorCodeSuccess) {
      // ......
    } else {
      // ......
    }
}];
```
:::
:::if{props.platform="window"}
```Cpp
// 清除全部会话的未读消息数量
zim->clearConversationTotalUnreadMessageCount([=](/zim-win/guides/conversation/zimerror-errorinfo) {
    // 获取清除操作结果
    if(errorInfo.code == ZIMErrorCodeSuccess) {
      // ......
    } else {
      // ......
    }
});
```
:::
:::if{props.platform="Web|UTS"}
<CodeGroup>
```typescript title="示例代码"
// 清除全部会话的未读消息数量
zim.clearConversationTotalUnreadMessageCount()
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
// 清除全部会话的未读消息数量
ZIM.getInstance()!.clearConversationTotalUnreadMessageCount().
then((value) => {})
    .catchError((onError) {});
```
</CodeGroup>
:::

<Content platform="window" />