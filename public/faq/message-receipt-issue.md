<Title>使用消息回执功能把消息设置为已读，为什么会话列表中消息未读数没有减少呢？</Title>


-----

[消息回执功能](/zim-ios/guides/messaging/read-receipts)，是指用户在会话中发送一条消息后，发送方可通过该功能，得知其他用户已读或未读此消息，消息回执功能不具备改变未读数量的功能，您可以通过以下接口，改变会话列表中的消息未读数。

- 如果需要清除单个会话消息未读数，可以通过调用 `clearConversationUnreadMessageCount` 接口。
- 如果需要清除全部会话的消息未读数，可以通过调用 `clearConversationTotalUnreadMessageCount` 接口，然后再结合业务 UI 展示。