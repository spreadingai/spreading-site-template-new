# 删除消息

- - -

<Note title="说明">

本文档适用于开发以下平台应用：iOS、Android、macOS、Windows。
</Note>

## 功能简介

ZIM SDK 支持单聊消息、群组消息、房间消息等的收发，以及查询历史消息、删除消息等功能。可广泛应用于娱乐社交、电商购物、在线教育、互动直播等多种场景下。

本文档介绍了如何使用 ZIM SDK 的接口，实现删除某个会话中指定的消息，或者删除某个会话的全部消息的功能。

<Warning title="注意">

ZIM SDK 目前支持删除“单聊/群组”会话消息，暂不支持删除“房间”会话消息。

</Warning>



## 实现流程

ZIM SDK 支持删除某个会话中指定的消息，或者删除某个会话的全部消息。删除消息分为“删除本地消息记录”和“删除服务端消息记录”，开发者可以通过 [ZIMMessageDeleteConfig](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~class~ZIMMessageDeleteConfig) 对象，设置删除消息相关的高级属性配置。

以客户端 A 删除与客户端 B 的某些消息、或全部消息为例：

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/ZIM/Common/deleteMessage.png" /></Frame>

### 删除会话的指定消息

如果客户端 A 想要删除与客户端 B 的指定消息记录：

1. 客户端 A、B 登录 ZIM SDK，并相互发送、接收单聊消息。
2. 客户端 A 需要删除与 B 的会话记录时：
    1. 客户端 A 首先登录 ZIM SDK。
    2. 客户端 A 调用 [DeleteMessages](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~class~ZIM#delete-messages) 接口，传入参数 messageList、config，删除指定的消息。
    3. 删除操作的结果，将通过 [ZIMMessageDeletedCallback](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~interface~ZIMDefines#zim-message-deleted-callback) 回调接口通知给客户端 A。

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


// 3、删除会话的指定消息
string conversationID = "xxxx";
List<ZIMMessage> deleteMessageList = new List<ZIMMessage>();

ZIMMessageDeleteConfig config = new ZIMMessageDeleteConfig();
config.isAlsoDeleteServerMessage = false;

ZIM.GetInstance().DeleteMessages(deleteMessageList, conversationID, ZIMConversationType.Peer, config, (string conversationID, ZIMConversationType conversationType,
    ZIMError errorInfo) => {
    //删除回调
    });
```
</CodeGroup>

### 删除指定会话的全部消息

如果客户端 A 想要删除与客户端 B 的指定会话的全部消息记录：

1. 客户端 A、B 登录 ZIM SDK，并相互发送、接收单聊消息。
2. 客户端 A 需要删除与 B 的会话记录时：
    1. 客户端 A 首先登录 ZIM SDK。
    2. 客户端 A 调用 [DeleteAllMessage](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~class~ZIM#delete-all-message) 接口，传入参数 conversationID、conversationType、config，配置删除指定会话的全部消息。
    3. 删除操作的结果，将通过 [ZIMMessageDeletedCallback](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~interface~ZIMDefines#zim-message-deleted-callback) 回调接口通知给客户端 A。

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

// 3、删除指定会话的全部消息
string conversationID = "xxxx";

ZIMMessageDeleteConfig config = new ZIMMessageDeleteConfig();
config.isAlsoDeleteServerMessage = false;

ZIM.GetInstance().DeleteAllMessage(conversationID, ZIMConversationType.Peer, config, (string conversationID, ZIMConversationType conversationType,
    ZIMError errorInfo) =>
    {
        // 开发者可以通过该回调监听消息是否删除成功。
    });
```
</CodeGroup>