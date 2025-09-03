# 管理会话未读数

- - -

## 功能简介

通过 ZIM，您可以获取和删除单个会话的消息未读数，计算所有会话消息未读数的总和。

## 获取单个会话消息未读数

ZIM 支持主动或被动获取某个会话的未读数。

### 主动获取

如需主动获取某个会话的未读数，请先调用 [QueryConversationList](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~class~ZIM#query-conversation-list) 或 [QueryConversation](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~class~ZIM#query-conversation) 获取到目标会话对象，即可从目标会话对象的 [unreadMessageCount](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~class~ZIMConversation#unread-message-count) 属性了解该会话的消息未读数。

### 被动获取

请监听 [OnConversationChanged](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~class~ZIMEventHandler#on-conversation-changed) 回调，获取会话的 [unreadMessageCount](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~class~ZIMConversation#unread-message-count) 属性，了解会话的最新消息未读数，详情请参考 [获取会话列表 - 监听会话变更](/zim-u3d/guides/conversation/get-the-conversation-list#监听会话变更)。


## 获取消息未读总数

用户登录后，可以查询自己当前有多少未读消息。开发者可以通过 [OnConversationTotalUnreadMessageCountUpdated](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~class~ZIMEventHandler#on-conversation-total-unread-message-count-updated) 回调接口，获取消息的未读总数。

用户登录成功后，以下情况出现时，均会通过该接口，获取消息未读总数更新的通知：

- 用户接收到新消息、且当前会话没有开启消息免打扰。
- 用户主动清理了会话未读数量，具体请参考下文 [清除单个会话消息未读数](/zim-u3d/guides/conversation/manage-unread-message-counts#清除单个会话消息未读数)。

开发者可以通过此回调通知，调整自己应用的 UI 展示，用于提醒用户当前有多少条消息未读。    


<CodeGroup>
```cs title="示例代码"
// 接收消息未读总数的回调通知
ZIM.GetInstance().onConversationTotalUnreadMessageCountUpdated = (ZIM zim,
                                             uint totalUnreadMessageCount) =>
{
    // 获取会话总未读数用于 UI 展示
};
```
</CodeGroup>


## 清除单个会话消息未读数

用户登录并成功拉取到会话列表后，可以通过调用 [ClearConversationUnreadMessageCount](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~class~ZIM#clear-conversation-unread-message-count) 接口，清除某个会话的未读消息数。

由于 SDK 并不知道用户何时应该清除会话未读数，因此开发者需要在用户与某些页面交互时触发调用该接口，以下为常见的调用时机：

- 点击会话，进入了该会话的聊天界面内，需要调用该接口。
- 用户一直处于聊天界面，每次收到消息后，都需要调用该接口。
- 在会话列表界面中，标记某条未读的会话为已读时，需要调用该接口。


<CodeGroup>
```cs title="示例代码"
ZIM.GetInstance().ClearConversationUnreadMessageCount("CONV_ID", ZIMConversationType.Peer,
    (string conversationID, ZIMConversationType conversationType,
                ZIMError errorInfo) =>
    {
        // 清除未读数的结果
    });
```
</CodeGroup>
