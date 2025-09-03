# 实现与 AI 进行 IM 聊天并发起语音通话

本文档旨在指导开发者如何利用 [ZIM (ZEGO Instant Messaging)](https://doc-zh.zego.im/zim-server/overview) 的实时通讯能力与 LLM 的自然语言处理能力，实现与 AI 进行 IM 聊天并结合 AI Agent 的功能发起语音通话。

## 核心概念

在深入实现细节之前，我们先明确几个核心概念：

- **ZIM (ZEGO Instant Messaging)**: ZEGO 提供的应用内即时通讯服务。它支持文本、图片、文件等多种消息类型，并具备房间管理、用户状态通知等功能，为应用内互动提供坚实基础。
- **大语言模型 (LLM)**: 经过海量文本数据训练的深度学习模型。LLM 能够理解和生成自然语言文本，广泛应用于问答系统、智能对话、文本创作等多种场景。
- **IM 聊天**: 指用户通过 ZIM 服务，输入文字与 LLM 进行交互。
- **语音通话**: 指用户通过 AI Agent 服务进入 RTC 房间，与 AI 进行语音通话。

## IM 聊天与语音通话的实现架构

这是在一个 APP 里同时实现与 AI 进行 IM 聊天和语音通话的架构。

<Frame width="auto" height="512" caption="">
  <img src="https://media-resource.spreading.io/docuo/workspace741/896bc39e2e65b82d5670b01b7c131c30/de20e70f45.png" alt="im_with_agent.png"/>
</Frame>

### IM 聊天
    - **客户端 APP**: 集成 ZIM SDK 实现文本收发与聊天记录持久化存储。
    - **ZIM 后台**: 接收并处理来自客户端的消息。通过消息回调的方式，将用户消息安全、可靠地传递给业务后台。
    - **业务后台**: 作为核心处理中枢，负责：
        * 调用 ZIM 后台接口注册机器人。该机器人的 `UserId` 会用作语音通话时加载历史消息用的 `RobotId`。
        * 接收 ZIM 收到的用户消息，对消息进行必要的预处理，如敏感词过滤、意图初步识别等。
        * 调用 LLM 服务，将处理后的用户消息发送给 LLM 进行深度分析和内容生成。
        * 收到 LLM 返回的回复内容后，对回复内容进行必要的后处理，如格式化输出、内容安全二次校验等。
        * 调用 ZIM 后台接口以机器人身份，将回复通过 ZIM 发送回客户端。
### 语音通话
    - **客户端 APP**: 集成 ZEGO Express SDK 实现语音通话功能。
    - **业务后台**：调用创建智能体实例接口，并将机器人的 `UserId` 作为 `RobotId` 参数传入 AI Agent 服务中。
    - **AI Agent 后台**: 根据业务后台传入的 `RobotId`，从 ZIM 后台加载历史消息，作为智能体的输入上下文。智能体配置的 LLM 会以这些上下文作为聊天记录与用户进行语音通话交互，回答用户问题。

## 示例代码

以下是集成 ZIM SDK 实现 IM 聊天的客户端示例代码以及接入 ZIM 和实时互动 AI Agent API 的业务后台示例代码，您可以参考示例代码来实现自己的业务逻辑。

<Note title="说明">以下示例请使用 im_and_voice 分支代码。</Note>

<CardGroup cols={2}>
<Card title="Android 客户端示例代码" href="https://github.com/ZEGOCLOUD/ai_agent_quick_start/tree/im_and_voice/android" target="_blank">
包含最基本的登录、收发文本消息、推流、拉流、退出房间等能力。
</Card>
<Card title="iOS 客户端示例代码" href="https://github.com/ZEGOCLOUD/ai_agent_quick_start/tree/im_and_voice/ios" target="_blank">
包含最基本的登录、收发文本消息、推流、拉流、退出房间等能力。
</Card>
<Card title="Web 客户端示例代码" href="https://github.com/ZEGOCLOUD/ai_agent_quick_start/tree/im_and_voice/web" target="_blank">
包含最基本的登录、收发文本消息、推流、拉流、退出房间等能力。
</Card>
<Card title="Flutter 客户端示例代码" href="https://github.com/ZEGOCLOUD/ai_agent_quick_start/tree/im_and_voice/flutter" target="_blank">
包含最基本的登录、收发文本消息、推流、拉流、退出房间等能力。
</Card>
<Card title="业务后台示例代码"  href="https://github.com/ZEGOCLOUD/ai_agent_quick_start_server/tree/im_and_voice" target="_blank">
包含最基本的获取 ZEGO Token、注册 ZIM 机器人、注册智能体、创建智能体实例、删除智能体实例等能力。
</Card>
</CardGroup>

以下是实现后的效果：
<Video src="https://media-resource.spreading.io/docuo/workspace741/896bc39e2e65b82d5670b01b7c131c30/4282e79adb.mp4" />

## 快速实现与 AI 进行 IM 聊天

### 1. 搭建业务后台

业务后台是连接 ZIM 和 LLM 的桥梁。您可以使用 Node.js, Python, Java, Go 等任何您熟悉的后端技术栈进行搭建。

#### 1.1 注册 ZIM 机器人

IM 聊天和 AI Agent 服务需要通过 ZIM 机器人来接收和发送消息。因此，您需要指定机器人`UserId`（即RobotId）调用 ZIM 后台接口注册一个机器人。

详细注册方法请参考 [ZIM 机器人注册说明](https://doc-zh.zego.im/zim-server/bot/register-bots)。

<Note title="说明">通常在创建新的机器人时注册一次即可，后续聊天和通话无需重复注册。</Note>

#### 1.2 设置 ZIM 回调接收用户消息

配置 ZIM 后台，使其能够将消息事件通过回调机制通知到您的业务后台。详细配置方法请参考 [ZIM 回调配置说明](https://doc-zh.zego.im/zim-server/callbacks/callback-configuration-instructions)。

您的业务后台需要实现一个 HTTP 接口来监听[消息发送后回调](https://doc-zh.zego.im/zim-server/callbacks/message-sent)。以下是该回调的示例数据：

```json title="ZIM 消息回调示例 (单聊文本消息)"
{
    "appid": "1",
    "event": "send_msg",
    "nonce": "350176",
    "signature": "signature",
    "timestamp": 1679553625,
    "from_user_id": "user_id_1",
    "conv_type": 0,
    "conv_id": "@RBT#AIAgentExample1",
    "msg_type": 1,
    "msg_body": "msg_body",
    "msg_id": "857639062792568832",
    "payload": "payload",
    "msg_time": 1679554146000,
    "send_result": 0,
    "sub_msg_type": 0,
    "user_list":[
    ]
}
```

#### 1.3 调用 LLM 服务生成 AI 回复

从回调收到用户消息后，业务后台需调用 LLM 服务以生成 AI 回复。您可以使用如 DeepSeek、火山方舟（豆包）、MiniMax、火山引擎、阿里云、阶跃星辰、 OpenAI (GPT 系列)等第三方服务商提供的 LLM 服务，或自己部署的 LLM 服务。

请自行查阅相关服务商的 API 文档进行接入。以下是使用 Node.js 调用 DeepSeek 模型的示例代码：

```javascript title="Node.js 调用 DeepSeek 示例" {26-36}
async function generateLLMResponse(messages: MessageItem[]): Promise<string> {
    try {
        console.log('准备生成LLM回复，消息上下文:', messages);
        // 从环境变量获取LLM配置
        const apiKey = process.env.LLM_API_KEY;
        const baseURL = process.env.LLM_BASE_URL;
        const model = process.env.LLM_MODEL || 'deepseek-v3-250324';
        if (!apiKey || !baseURL) {
            console.error('缺少LLM配置，请检查环境变量');
            return "抱歉，我暂时无法回复您的消息，请稍后再试。";
        }

        // 转换消息格式
        const formattedMessages = messages.map(msg => ({
            role: msg.role as "user" | "assistant" | "system",
            content: msg.content
        }));

        // 添加系统提示
        formattedMessages.unshift({
            role: "system",
            content: "你是一个有帮助的助手，请简洁明了地回答用户问题。"
        });

        // 使用fetch API调用LLM服务。注意使用非流式响应。
        const response = await fetch(baseURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                messages: formattedMessages,
                model: model
            })
        });

        if (!response.ok) {
            throw new Error(`LLM API请求失败: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();

        // 获取回复内容
        const reply = data.choices?.[0]?.message?.content || "抱歉，我无法生成回复。";
        return reply;
    } catch (error) {
        console.error('生成LLM回复时出错:', error);
        return "抱歉，处理您的请求时出现了问题，请稍后再试。";
    }
}
```

#### 1.4 将 AI 回复通过 ZIM 发送回客户端

获取到 LLM 的回复后，业务后台需使用 ZIM 后台接口将此回复内容以 AI 身份发送给真实用户。

具体接口使用请参考 ZIM 后台接口文档中的 [发送单聊消息](https://doc-zh.zego.im/zim-server/messaging/send-a-one-to-one-message)接口。

以下是使用 Node.js 通过 ZIM 后台接口发送消息的示例：

```javascript title="Node.js" {13,14}
async function sendReplyMessage(fromUserId: string, toUserId: string, message: string) {
    try {
        // 构建消息体
        const messageBody = {
            Message: message, // LLM 回复内容
            ExtendedData: ''
        };

        // 发送消息
        // ZegoZIM.getInstance().sendPeerMessage为demo封装方法，完整实现可参考：https://github.com/ZEGOCLOUD/ai_agent_quick_start_server/blob/im_and_voice/src/lib/zego/zim.ts#L162
        // 请参考发送单聊消息详细接口说明：https://doc-zh.zego.im/zim-server/messaging/send-a-one-to-one-message
        const result = await ZegoZIM.getInstance().sendPeerMessage(
            fromUserId,                  // 发送者ID，即注册机器人时的 UserInfo.UserId（机器人ID）
            [toUserId],                  // 接收者ID数组（真实用户ID）
            ZegoMessageType.Text,        // 消息类型：文本
            messageBody,                 // 消息内容
            ZegoMessagePriority.Medium   // 消息优先级：中
        );

        console.log('发送回复消息结果:', result);
        return result;
    } catch (error) {
        console.error('发送回复消息时出错:', error);
        throw error;
    }
}
```

### 2. 客户端处理逻辑

客户端的 ZIM SDK 会监听并接收来自业务后台（经由 ZIM 后台转发）的 AI 回复消息。您需要在客户端实现消息接收逻辑，并将内容展示在用户界面上。

#### 前提条件

请在您的客户端 APP 中集成 ZIM SDK。可参考各平台的集成说明：

- [ZIM Android SDK 集成](https://doc-zh.zego.im/zim-android/send-and-receive-messages)
- [ZIM iOS SDK 集成](https://doc-zh.zego.im/zim-ios/send-and-receive-messages)
- [ZIM Web SDK 集成](https://doc-zh.zego.im/zim-web/send-and-receive-messages)

#### 2.1 获取与 AI 对话的历史消息

在进入 AI 聊天页面时，需要从 ZIM 服务获取历史消息。以下是各平台实现获取历史消息的示例代码：

<CodeGroup>
```java title="Android" {5-6}
ZIMMessageQueryConfig queryConfig = new ZIMMessageQueryConfig();
queryConfig.count = 100;     // 查询条数
queryConfig.reverse = true;  // 查最新的 count 条数的消息

String conversationId ; // 查询历史消息的会话ID。即机器人`UserId`（即RobotId）
ZIM.getInstance().queryHistoryMessage(conversationId, ZIMConversationType.PEER, queryConfig,new ZIMMessageQueriedCallback() {
    @Override
    public void onMessageQueried(String conversationID, ZIMConversationType conversationType,ArrayList<ZIMMessage> messageList, ZIMError errorInfo) {
        if (errorInfo.code == ZIMErrorCode.SUCCESS) {
            //  成功
        } else {
           // 失败
        }
    }
});
```
```javascript title="Web" {1,7}
const conversationID = ""; // 查询历史消息的会话ID。即机器人`UserId`（即RobotId）
const conversationType = 0; // 查询单聊会话
const config = {
    count: 100, // 查询消息的条数。
    reverse: true, // 是否反序查询。
};
zim.queryHistoryMessage(conversationID, conversationType, config)
    .then(({ messageList }) => {
        // 处理消息并更新 UI界面
        console.log("查询历史消息成功:", messageList);
    })
    .catch((error) => {
        console.error("查询历史消息失败:", error);
    });
```
```objctive-c title="iOS" {20}
@interface ZegoAIAgentIMChatViewController () <ZIMEventHandler>

// zim对象
@property (nonatomic, strong) ZIM *zim;

@end

@implementation ZegoAIAgentIMChatViewController

- (void)fetchHistoryMessagesIfNeeded {
    if (!self.zim) {
        return;
    }

    ZIMMessageQueryConfig *config = [[ZIMMessageQueryConfig alloc] init];
    config.count = 50; // 拉取50条
    config.nextMessage = nil; // 从最新消息开始
    config.reverse = YES; // 从最后一页开始拉取

    [self.zim queryHistoryMessageByConversationID:@"your rotbot id"
                                 conversationType:ZIMConversationTypePeer
                                           config:config
                                         callback:^(NSString * _Nonnull conversationID, ZIMConversationType conversationType, NSArray<ZIMMessage *> * _Nonnull messageList, ZIMError * _Nonnull errorInfo) {
        if (errorInfo.code == 0) {
            dispatch_async(dispatch_get_main_queue(), ^{
             // 更新数据
             // 根据orderKey对所有消息进行排序
             // 刷新界面
            });
        } else {
            NSLog(@"拉取历史消息失败: %@", errorInfo.message);
        }
    }];
}

@end
```
```dart title="flutter"

  Future<void> fetchHistoryMessages() async {
    String conversationID = '';

    try {
      ZIMMessageQueryConfig config = ZIMMessageQueryConfig()
        ..count = 50
        ..reverse = true;

      final result = await _zim!.queryHistoryMessage(
        conversationID,
        ZIMConversationType.peer,
        config,
      );

      for (var message in result.messageList) {
        if (message is ZIMTextMessage) {
          final flutterMessage = ZegoIMMessage(
            content: message.message,
            isFromUser:
                message.senderUserID == ZegoAIAgentService().getUserId(),
            timestamp: DateTime.fromMillisecondsSinceEpoch(message.timestamp),
            orderKey: message.orderKey,
          );

          /// 更新数据

          /// 根据orderKey对所有消息进行排序

          /// 刷新界面
        }
      }
    } catch (e) {
      debugPrint('获取历史消息失败：$e');
    }
  }
```
</CodeGroup>


#### 2.2 给 AI 发送消息

用户在客户端输入消息后，可以使用 ZIM SDK 将消息发送给 AI。以下是各平台实现发送消息的示例代码：

<CodeGroup>
```java title="Android" {2,6}
String text ; // 聊天文本
String conversationId ; // 发送消息的会话ID。即机器人`UserId`（即RobotId）
ZIMTextMessage zimMessage = new ZIMTextMessage();
zimMessage.message = text;
// 在单聊场景中，ZIMConversationType 设置为 PEER
ZIM.getInstance().sendMessage(zimMessage, conversationId, ZIMConversationType.PEER, new ZIMMessageSendConfig(),
    new ZIMMessageSentFullCallback() {
        @Override
        public void onMessageAttached(ZIMMessage message) {
            //开始发送的时候就插入消息到列表
        }

        @Override
        public void onMessageSent(ZIMMessage message, ZIMError errorInfo) {
            // 发送成功
        }

        @Override
        public void onMediaUploadingProgress(ZIMMediaMessage message, long currentFileSize,
            long totalFileSize) {

        }

        @Override
        public void onMultipleMediaUploadingProgress(ZIMMultipleMessage message, long currentFileSize,
            long totalFileSize, int messageInfoIndex, long currentIndexFileSize, long totalIndexFileSize) {

        }
    });
```
```javascript title="Web" {1,9}
const toConversationID = ''; // 对方 userID。即机器人`UserId`（即RobotId）
const conversationType = 0; // 发送单聊消息
const config = {
    priority: 3, // 设置消息优先级，取值为 低：1（默认），中：2，高：3
};

const messageTextObj = { type: 1, message: 'xxxx' };

zim.sendMessage(messageTextObj, toConversationID, conversationType, config)
    .then(function ({ message }) {
        // 发送成功
    })
    .catch(function (err) {
        // 发送失败
    });
```
```objctive-c title="iOS" {34-35}
@interface ZegoAIAgentIMChatViewController () <ZIMEventHandler>

// zim对象
@property (nonatomic, strong) ZIM *zim;

@end

@implementation ZegoAIAgentIMChatViewController

- (void)sendMessage {
    if (!self.zim) {
      return;
    }

    // 创建文本消息
    ZIMTextMessage *zimMessage = [[ZIMTextMessage alloc] init];
    zimMessage.message = @"your message text";

    // 消息发送配置
    ZIMMessageSendConfig *config = [[ZIMMessageSendConfig alloc] init];
    config.priority = ZIMMessagePriorityMedium;

    // 消息发送通知
    ZIMMessageSendNotification *notification = [[ZIMMessageSendNotification alloc] init];
    notification.onMessageAttached = ^(ZIMMessage * _Nonnull message) {
        // 发送前的回调，可以在这里提前展示UI
        dispatch_async(dispatch_get_main_queue(), ^{
            // 更新数据，刷新界面
        });
    };


    // 发送消息
    [self.zim sendMessage:zimMessage
        toConversationID:@"your rotbot id"
        conversationType:ZIMConversationTypePeer
                  config:config
            notification:notification
               callback:^(ZIMMessage * _Nonnull message, ZIMError * _Nonnull errorInfo) {
        if (errorInfo.code == 0) {
            NSLog(@"消息发送成功");
        } else {
            NSLog(@"消息发送失败：%@", errorInfo.message);
        }
    }];
}

@end
```
```dart title="flutter"

  Future<bool> sendMessage(String content) async {
    try {
      /// 创建ZIM文本消息
      ZIMTextMessage zimMessage = ZIMTextMessage(message: content);

      /// 消息发送配置
      ZIMMessageSendConfig config = ZIMMessageSendConfig()
        ..priority = ZIMMessagePriority.medium;

      /// 发送消息
      final result = await _zim!.sendMessage(
        zimMessage,
        ZegoAIAgentService().getAgentRobotId(),
        ZIMConversationType.peer,
        config,
      );

      /// 更新数据

      /// 根据orderKey对所有消息进行排序

      /// 刷新界面

      return true;
    } catch (e) {
      debugPrint('消息发送失败：$e');
      return false;
    }
  }
```
</CodeGroup>

#### 2.3 接收 AI 回复的消息

AI 回复的消息会在业务后台通过 ZIM 服务发送到客户端。您需要在客户端实现消息接收逻辑，并将内容展示在用户界面上。以下是各平台实现接收消息的示例代码：

<CodeGroup>
```java title="Android" {3}
ZIM.getInstance().setEventHandler(new ZIMEventHandler() {
    @Override
    public void onPeerMessageReceived(ZIM zim, ArrayList<ZIMMessage> messageList, ZIMMessageReceivedInfo info,String fromUserID) {
        // 只添加本会话的消息到本页面
        List<ZIMMessage> collect = messageList.stream()
            .filter(zimMessage -> Objects.equals(Constant.agent_zim_robotid, zimMessage.getConversationID()))
            .collect(Collectors.toList());
    }
});
```
```javascript title="Web" {1}
zim.on("peerMessageReceived", (zim, { messageList }) => {
    console.log("收到新消息:", messageList);
    // 处理消息并更新 UI界面
});
```
```objctive-c title="iOS" {10}
// 实现ZIMEventHandler
@interface ZegoAIAgentIMChatViewController () <ZIMEventHandler>

@end

@implementation ZegoAIAgentIMChatViewController

#pragma mark - ZIMEventHandler

- (void)zim:(ZIM *)zim peerMessageReceived:(NSArray<ZIMMessage *> *)messageList info:(ZIMMessageReceivedInfo *)info fromUserID:(NSString *)fromUserID {
    NSLog(@"收到单聊消息 - 发送者ID: %@, 消息数量: %lu, 消息详情:", fromUserID, (unsigned long)messageList.count);
    for (ZIMMessage *message in messageList) {
        if ([message isKindOfClass:[ZIMTextMessage class]]) {
            ZIMTextMessage *textMessage = (ZIMTextMessage *)message;
            NSLog(@"消息ID: %lld, 发送时间: %llu, 消息内容: %@", textMessage.messageID, textMessage.timestamp, textMessage.message);
        }
    }

    dispatch_async(dispatch_get_main_queue(), ^{
         // 更新数据

        // 根据orderKey对所有消息进行排序

        // 刷新界面
    });
}

@end
```
```dart title="flutter"
  ZIMEventHandler.onPeerMessageReceived = _handlePeerMessageReceived;

  void _handlePeerMessageReceived(
    ZIM zim,
    List<ZIMMessage> messageList,
    ZIMMessageReceivedInfo info,
    String fromUserID,
  ) {
    for (var message in messageList) {
      if (message is ZIMTextMessage) {
        final flutterMessage = ZegoIMMessage(
          content: message.message,
          isFromUser: message.senderUserID == localUserId,
          timestamp: DateTime.fromMillisecondsSinceEpoch(message.timestamp),
          orderKey: message.orderKey,
        );
        /// 更新数据

        /// 根据orderKey对所有消息进行排序

        /// 刷新界面
      }
    }
  }
```
</CodeGroup>

#### 异步处理与用户反馈

为了避免因 LLM 处理耗时较长导致的用户界面卡顿或无响应，您可以采用以下方法优化交互：
- 客户端发送消息后，可立即在界面上显示“AI 正在思考中…”或类似的等待提示。
- 业务后台接收到用户消息后，先快速响应客户端已收到，然后异步调用 LLM 服务。待 LLM 返回结果后，再通过 ZIM 将实际回复推送给客户端更新界面。


## 快速实现与 AI 进行语音通话

在实际应用场景中，用户可能会在文字互动和语音互动之间切换。为了保持对话的连贯性和上下文的完整性，请参考以下说明实现 IM 聊天的历史消息和语音通话消息的关联。

### 将 IM 聊天的历史消息关联到语音通话中


<Warning title="注意">请先参考[快速开始](/aiagent-server/quick-start)文档实现与 AI 进行语音通话功能。</Warning>

在开始通话前，您可以通过以下方式将 IM 聊天的历史消息关联到语音通话中：

在[创建智能体实例](https://doc-zh.zego.im/aiagent-server/api-reference/agent-instance-management/create-agent-instance)时，配置 MessageHistory 参数：
   - 将 `MessageHistory.SyncMode`（消息同步模式）设置为 `0`，表示从 ZIM 同步历史消息
   - 在 `MessageHistory.ZIM` 中补充完整的 ZIM 相关信息，包括：
     - `RobotId`：即调用 ZIM 注册机器人接口对应的UserInfo.UserId
     - `LoadMessageCount`：创建智能体实例时，从 ZIM 服务获取多少条消息作为上下文。默认为 WindowSize 的值（取值上限）。

完成以上配置后，创建的智能体实例在语音互动中将自动获取 IM 聊天的历史消息作为 LLM 的历史消息输入。

### 将语音通话的上下文关联到 IM 聊天中

在通话结束后，所有的语音通话消息都会被同步到 ZIM 服务。您可以在通话结束后，将这些消息同步到 IM 聊天中，以保持对话的连贯性和上下文的完整性。

详细步骤可参考[获取与 AI 对话的历史消息](#21-获取与-ai-对话的历史消息)小节说明。



