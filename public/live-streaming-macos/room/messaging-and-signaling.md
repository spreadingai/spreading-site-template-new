# 实时消息与信令
- - -

## 功能简介


ZEGO 提供多种文本消息的收发功能，实现发送房间内广播消息、弹幕消息、简单 IM 文字聊天、点赞、送礼物、答题等功能。


| 消息类型 | 功能描述 | 应用场景 | 发送频率限制 |
|-------|--------|--------|--------|
| 广播消息 | 向同一房间内所有用户发送文本消息。 | 可用于简单的房间内聊天室场景。 | 请参考 [限制说明](https://doc-zh.zego.im/article/7583)。 |
| 弹幕消息 | 观众在直播过程中可以发表自己的评论，并以滑动而过的字幕显示出来，增加了观众之间的互动性。 | 一般用于房间内有大量消息收发，且不需要保证消息可靠性的场景，例如直播弹幕。 | 请参考 [限制说明](https://doc-zh.zego.im/article/7583)。|
| 自定义信令 | 向同一房间内单个或多个用户发送消息。 | 一般用于远程控制信令或简单的文字消息发送。比如在线娃娃机场景中，远程控制娃娃机夹子的移动。 | 请参考 [限制说明](https://doc-zh.zego.im/article/7583)。

另外，ZEGO 还提供完整的即时通讯 ZIM SDK，为开发者提供全平台互动、海量并发、超低延时、消息必达的通信服务，具体请参考 [即时通讯](https://doc-zh.zego.im/article/11912)。


## 示例源码下载

请参考 [下载示例源码](https://doc-zh.zego.im/article/21224) 获取源码。

相关源码请查看 “/ZegoExpressExample/Examples/CommonFeatures/RoomMessage” 目录下的文件。

## 前提条件

在发送实时消息前，请确保：

- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppID 和 AppSign，详情请参考 [控制台 - 项目信息](/console/project-info)。
- 已在项目中集成 ZEGO Express SDK，并实现了基本的音视频推拉流功能，详情请参考 [快速开始 - 集成](https://doc-zh.zego.im/article/21225) 和 [快速开始 - 实现流程](https://doc-zh.zego.im/article/21272)。


## 使用步骤

### 收发广播消息

1. **发送广播消息**

    调用 [sendBroadcastMessage ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~ObjectiveC_ios~class~zego-express-engine#send-broadcast-message-room-id-callback) 接口向同一房间内的其他用户发送广播消息，长度不能超过 1024 字节。

    通过 [ZegoIMSendBroadcastMessageCallback ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_macos~class~ZegoExpressDefines#zego-im-send-broadcast-message-callback) 回调获取消息发送结果。

    ```objc
    // 发送广播消息
    [self.engine sendBroadcastMessage:@"This is a broadcast message" roomID:@"ChatRoom-1" callback:^(int errorCode, unsigned long long messageID) {
        NSLog(@"send broadcast message result block");
    }];
    ```

2. **接收广播消息**

    实现 [ZegoEventHandler](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_macos~protocol~ZegoEventHandler) 代理中的 [onIMRecvBroadcastMessage](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_macos~protocol~ZegoEventHandler#on-im-recv-broadcast-message-room-id) 回调，当发送方成功发送广播消息后，同一房间内的其他用户通过此回调接收相关信息，包括消息内容、消息 ID、发送时间及发送方信息。

    ```objc
    // 收到其他用户发送消息
    - (void)onIMRecvBroadcastMessage:(NSArray<ZegoBroadcastMessageInfo *> *)messageList roomID:(NSString *)roomID {
        NSLog(@"received broadcast message");
    }
    ```

### 收发弹幕消息

1. **发送弹幕消息**

    调用 [sendBarrageMessage ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~ObjectiveC_ios~class~zego-express-engine#send-barrage-message-room-id-callback) 接口向同一房间内的其他用户发送弹幕消息，长度不能超过 1024 字节。

    通过 [ZegoIMSendBarrageMessageCallback ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_macos~class~ZegoExpressDefines#zego-im-send-barrage-message-callback) 回调获取消息发送结果。

    ```objc
    // 发送房间弹幕消息
    [self.engine sendBarrageMessage:@"This is a barrage message" roomID:@"ChatRoom-1" callback:^(int errorCode, NSString *messageID) {
        NSLog(@"send barrage message result block");
    }];
    ```

2. **接收弹幕消息**

    实现 [ZegoEventHandler](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_macos~protocol~ZegoEventHandler) 代理中的 [onIMRecvBarrageMessage ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_macos~protocol~ZegoEventHandler#on-im-recv-barrage-message-room-id) 回调，当发送方成功发送弹幕消息后，同一房间内的其他用户通过此回调接收相关信息，包括消息内容、消息 ID、发送时间及发送方信息。

    ```objc
    // 收到其他用户发送消息
    - (void)onIMRecvBarrageMessage:(NSArray<ZegoBarrageMessageInfo *> *)messageList roomID:(NSString *)roomID {
        NSLog(@"received barrage message");
    }
    ```

### 收发自定义信令

1. **发送自定义信令**

    调用 [sendCustomCommand ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_macos~class~ZegoExpressEngine#send-custom-command-callback) 接口向同一房间内通过 “toUserList” 指定的用户发送自定义信令，长度不能超过 1024 字节。

    通过 [ZegoIMSendCustomCommandCallback ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_macos~class~ZegoExpressDefines#zego-im-send-custom-command-callback) 回调获取消息发送结果。

    ```objc
    // 发送自定义信令，`toUserList` 中指定的用户才可以通过 onIMRecvCustomCommand:fromUser:roomID: 收到此信令
    // 若 `toUserList` 参数传 `nil` 则 SDK 将发送该信令给房间内所有用户
    NSArray<ZegoUser *> *toUserList = @[[ZegoUser userWithUserID:@"user1"], [ZegoUser userWithUserID:@"user2"]];
    [self.engine sendCustomCommand:@"This is a custom command" toUserList:toUserList roomID:@"ChatRoom-1" callback:^(int errorCode) {
       NSLog(@"send custom command result block");
    }];
    ```

2. **接收自定义信令**

    实现 [ZegoEventHandler](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_macos~protocol~ZegoEventHandler) 代理中的 [onIMRecvCustomCommand ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~ObjectiveC_ios~protocol~zego-event-handler#on-im-recv-custom-command-from-user-room-id) 回调，当发送方成功发送自定义信令后，同一房间内的指定用户通过此回调接收相关信息，包括消息内容和消息发送方信息。

    ```objc
    // 收到其他用户发送消息
    - (void)onIMRecvCustomCommand:(NSString *)command fromUser:(ZegoUser *)fromUser roomID:(NSString *)roomID {
        NSLog(@"received custom command");
    }
    ```

<Content />