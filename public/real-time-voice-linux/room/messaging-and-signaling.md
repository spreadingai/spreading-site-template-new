# 实时消息与信令


- - -

## 功能简介

ZEGO 提供多种文本消息的收发功能，实现发送房间内广播消息、弹幕消息、简单 IM 文字聊天、点赞、送礼物、答题等功能。

| 消息类型 | 功能描述 | 应用场景 | 发送频率限制 |
|-------|--------|--------|--------|
| 广播消息 | 向同一房间内所有用户发送文本消息。 | 可用于简单的房间内聊天室场景。 | 请参考 [限制说明](https://doc-zh.zego.im/article/8338)。 |
| 弹幕消息 | 观众在直播过程中可以发表自己的评论，并以滑动而过的字幕显示出来，增加了观众之间的互动性。 | 一般用于房间内有大量消息收发，且不需要保证消息可靠性的场景，例如直播弹幕。 | 请参考 [限制说明](https://doc-zh.zego.im/article/8338)。|
| 自定义信令 | 向同一房间内单个或多个用户发送消息。 | 一般用于远程控制信令或简单的文字消息发送。比如在线娃娃机场景中，远程控制娃娃机夹子的移动。 | 请参考 [限制说明](https://doc-zh.zego.im/article/8338)。 

## 前提条件

在发送实时消息前，请确保：

- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppID 和 AppSign，详情请参考 [控制台 - 项目信息](/console/project-info)。
- 已在项目中集成 ZEGO Express SDK，并实现了基本的音视频推拉流功能，详情请参考 [快速开始 - 集成](https://doc-zh.zego.im/article/8331) 和 [快速开始 - 实现流程](https://doc-zh.zego.im/article/8228)。


## 使用步骤

### 收发广播消息

1. **发送广播消息**

    调用 [sendBroadcastMessage](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~CPP_linux~class~zego-express-i-zego-express-engine#send-broadcast-message) 接口向同一房间内的其他用户发送广播消息，长度不能超过 1024 字节。

    通过 [ZegoIMSendBroadcastMessageCallback](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cpp_linux~interface~ZegoExpressDefines#zego-im-send-broadcast-message-callback) 回调获取消息发送结果。

    ```cpp
    // 发送广播消息
    engine->sendBroadcastMessage("ChatRoom-1", "This is a broadcast message", [=](/real-time-voice-linux/room/int-errorcode,-unsigned-long-long-messageid){
        printf("send broadcast message: errorCode=%d", errorCode);
    })
    ```

2. **接收广播消息**

    实现 IZegoEventHandler 代理中的 [onIMRecvBroadcastMessage](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~CPP_linux~class~zego-express-i-zego-event-handler#on-im-recv-broadcast-message) 回调，当发送方成功发送广播消息后，同一房间内的其他用户通过此回调接收相关信息，包括消息内容、消息 ID、发送时间及发送方信息。

    ```cpp
    class MyEventHandler: public IZegoEventHandler{
       /**
        * 接收房间广播消息通知
        *
        * @param roomID 房间 ID
        * @param messageList 收到的消息列表
        */
        void onIMRecvBroadcastMessage(const std::string& roomID, std::vector<ZegoBroadcastMessageInfo> messageList) override {
            printf("received broadcast message");
            // 请注意，请勿在 SDK 回调线程中调用任何 SDK 接口，需要手动切换为其他线程，否则会产生死锁
        }
    }    
    ```

### 收发弹幕消息

1. 发送弹幕消息

   调用 [sendBarrageMessage](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~CPP_linux~class~zego-express-i-zego-express-engine#send-barrage-message) 接口向同一房间内的其他用户发送弹幕消息，长度不能超过 1024 字节。

   通过 [ZegoIMSendBarrageMessageCallback](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cpp_linux~interface~ZegoExpressDefines#zego-im-send-barrage-message-callback) 回调获取消息发送结果。

   ```cpp
   // 发送弹幕消息
   engine->sendBarrageMassage("ChatRoom-1", "This is a barrage message", [=](/real-time-voice-linux/room/int-errorcode,-std::string-messageid){
       printf("send barrage message: errorCode=%d", errorCode);
   })
   ```

2. **接收弹幕消息**

    实现 IZegoEventHandler 代理中的 [onIMRecvBarrageMessage ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~CPP_linux~class~zego-express-i-zego-event-handler#on-im-recv-barrage-message) 回调，当发送方成功发送弹幕消息后，同一房间内的其他用户通过此回调接收相关信息，包括消息内容、消息 ID、发送时间及发送方信息。

    ```cpp
    class MyEventHandler: public IZegoEventHandler{
       /**
        * 接收房间弹幕消息通知
        *
        * @param roomID 房间 ID
        * @param messageList 收到的消息列表
        */
        void onIMRecvBarrageMessage(const std::string& roomID, std::vector<ZegoBarrageMessageInfo> messageList) override {
            printf("received barrage message");
            // 请注意，请勿在 SDK 回调线程中调用任何 SDK 接口，需要手动切换为其他线程，否则会产生死锁
        }
     }    
    ``` 

### 收发自定义信令

1. **发送自定义信令**

   调用 [sendCustomCommand ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~CPP_linux~class~zego-express-i-zego-express-engine#send-custom-command) 接口向同一房间内通过 `toUserList` 指定的用户发送自定义信令，长度不能超过 1024 字节。

   通过 [ZegoIMSendCustomCommandCallback](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cpp_linux~interface~ZegoExpressDefines#zego-im-send-custom-command-callback) 回调获取消息发送结果。

   ```cpp
   // 发送自定义信令，toUserList 中指定的用户才可以通过 onIMRecvCustomCommand 收到此信令
   auto user1 = ZegoUser("userID1", "userName1");
   auto user2 = ZegoUser("userID2", "userName2");
   std::vector<ZegoUser> toUserList = {user1, user2};
   engine->sendCustomCommand("ChatRoom-1", "This is a custom command", toUserList, [=](/real-time-voice-linux/room/int-errorcode){
       printf("send custom command: errorCode=%d", errorCode);
   })
   ```

2. **接收自定义信令**

   实现 IZegoEventHandler 代理中的 [onIMRecvCustomCommand ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~CPP_linux~class~zego-express-i-zego-event-handler#on-im-recv-custom-command) 回调，当发送方成功发送自定义信令后，同一房间内的指定用户通过此回调接收相关信息，包括消息内容和消息发送方信息。

   ```cpp
   class MyEventHandler: public IZegoEventHandler{
      /**
       * 接收自定义信令通知
       *
       * @param roomID 房间 ID
       * @param fromUser 信令的发送人
       * @param command 信令内容
       */
       void onIMRecvCustomCommand(const std::string& roomID, ZegoUser fromUser, const std::string& command) override {
            printf("received custom command");
            // 请注意，请勿在 SDK 回调线程中调用任何 SDK 接口，需要手动切换为其他线程，否则会产生死锁  
     }
   }
   ```

<Content />
