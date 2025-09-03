# 删除会话

- - -

## 功能简介

ZIM 支持用户删除会话列表中的某个会话。

## 实现流程

用户登录后，可以删除自己的会话列表中的某个会话。开发者通过调用 [DeleteConversation](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~class~ZIM#delete-conversation) 接口，传入 conversationID 指定会话，删除某个会话。

<Note title="说明">

删除某个会话时：

- 会话内的所有消息并不会自动删除。开发者如果需要同时删除会话和会话内的所有消息，请先调用 [DeleteAllMessage](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~class~ZIM#delete-all-message) 接口（详情请参考 [删除消息](/zim-u3d/guides/messaging/delete-messages)）删除所有消息，再调用 [DeleteConversation](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~class~ZIM#delete-conversation) 接口删除该会话。
- 如果这个会话存在未读消息，将会通过 [OnConversationTotalUnreadMessageCountUpdated](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~class~ZIMEventHandler#on-conversation-total-unread-message-count-updated) 回调接口，减少消息未读总数，详情请参考 [4 获取消息未读总数](/zim-u3d/guides/conversation/get-the-conversation-list)。
</Note>

<CodeGroup>
```cs title="示例代码"
// 删除某个会话，以下为 删除单聊会话
ZIMConversationDeleteConfig config = new ZIMConversationDeleteConfig();
config.isAlsoDeleteServerConversation = true;

ZIM.GetInstance().DeleteConversation("CONV_ID", ZIMConversationType.Group, config,
    (string conversationID, ZIMConversationType conversationType,
                    ZIMError errorInfo) =>
    {
        // 获取删除会话的结果
    });
```
</CodeGroup>

