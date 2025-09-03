# 获取历史消息

- - -

<Note title="说明">

本文档适用于开发以下平台应用：iOS、Android、macOS、Windows。
</Note>

## 功能简介

ZIM SDK 支持按照会话维度，获取某个会话下的所有历史消息。本文档介绍了如何使用 ZIM SDK 的接口，实现获取 `单聊` 历史消息、`群组` 历史消息和 `房间` 历史消息的功能。

<Note title="说明">

- **除了信令消息和弹幕消息之外**，其他类型的历史消息均可通过本功能获取。
- 开发者请根据业务需要，查看 [收发消息](/zim-u3d/guides/messaging/send-and-receive-messages)、[删除消息](/zim-u3d/guides/messaging/delete-messages) 等功能。
- 历史消息存储天数与套餐版本相关，详情请参考 [计费说明](/zim-u3d/introduction/pricing) 的 “版本差异”。
</Note>




## 使用步骤

ZIM SDK 支持获取 `单聊`、`群组` 和 `房间` 的会话历史记录，通过 [QueryHistoryMessage](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~class~ZIM#query-history-message) 接口，传入参数 conversationID、config，进行获取。

以客户端 A 获取与客户端 B 的单聊会话历史为例：

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/ZIM/Common/queryHistoryMessage.png" /></Frame>

1. 客户端 A、B 登录 ZIM SDK，并相互发送、接收单聊消息。
2. 客户端 A 需要获取与 B 的会话记录时：
    1. 客户端 A 首先登录 ZIM SDK。
    2. 客户端 A 调用 [QueryHistoryMessage](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~class~ZIM#query-history-message) 接口，传入参数 conversationID、config，开始获取。
    3. 获取的结果，将通过 [ZIMMessageQueriedCallback](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~interface~ZIMDefines#zim-message-queried-callback) 回调接口通知给客户端 A。



<CodeGroup>
```cs title="示例代码"
// 1、创建 ZIM 对象，传入 appID、appSign
ZIMAppConfig appConfig = new ZIMAppConfig();
appConfig.appID = 12345;  //替换为您申请到的 AppID
appConfig.appSign = "appSign";   //替换为您申请到的 AppSign
ZIM.Create(appConfig);


// 2、登录
ZIMUserInfo zimUserInfo = new ZIMUserInfo();
zimUserInfo.userID = "xxxx";
zimUserInfo.userName = "xxxx";
ZIM.GetInstance().Login(zimUserInfo, (ZIMError errorInfo) =>
{
    // 开发者可根据 ZIMError 来判断是否登录成功。          
}
);


// 3、获取单聊会话历史消息
List<ZIMMessage> curMessageList = new List<ZIMMessage>();

string conversationID = "xxxx";

// 从后往前获取会话历史消息，每次获取 30 条
ZIMMessageQueryConfig config = new ZIMMessageQueryConfig();
// 首次获取时 nextMessage 为 null
config.nextMessage = null;
config.count = 30;
config.reverse = true;

ZIM.GetInstance().QueryHistoryMessage(conversationID, ZIMConversationType.Peer, config, (string conversationID, ZIMConversationType conversationType,
List<ZIMMessage> messageList, ZIMError errorInfo) =>
{
//获取结果
});
```
</CodeGroup>