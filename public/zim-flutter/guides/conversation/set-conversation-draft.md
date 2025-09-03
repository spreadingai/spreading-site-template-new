# 保存会话草稿

- - -

## 功能简介

会话草稿，指用户正在编辑但尚未发送的文本消息。ZIM 支持用户退出会话后仍在本地保存会话草稿，以便继续编辑。

## 实现流程

调用 [setConversationDraft](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/setConversationDraft.html) 接口，传入 conversationID 与conversationType 指定某个会话，即可将草稿保存到会话。

<Note title="说明">

如需清除会话草稿，`draft` 字段请传空字符串。
</Note>


保存草稿成功后，操作结果通过 [ZIMConversationDraftSetResult](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMConversationDraftSetResult-class.html) 异步返回。

操作用户可以通过[onConversationChanged](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMEventHandler/onConversationChanged.html) 回调接口获取草稿变更后的会话信息。

<CodeGroup>
```dart title="示例代码"
// 为某个会话设置草稿
// 以群聊消息为例
ZIM.getInstance().setConversationDraft("draft", "Group_ID", ZIMConversationType.group).then((value){
    // 保存会话草稿的操作结果
}).catchError((onError){
    // 可以打印错误码和错误信息，参考 ZIM 官网错误码文档排查错误原因
});
```
</CodeGroup>
