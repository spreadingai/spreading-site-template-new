# 实时消息与信令


- - -

## 功能简介

ZEGO 实时消息主要提供纯文本消息的收发功能，开发者可调用相关 API 向同一房间内的其他用户发送广播消息和弹幕消息，或者对某些指定用户发送自定义消息，并可以根据需要自行实现点赞、送礼物、答题等互动功能。

三种消息的区别如下：

| 消息类型 | 功能描述 | 应用场景 | 发送频率限制 |
|-------|--------|--------|--------|
| 广播消息 | 向同一房间内所有用户发送文本消息。 | 可用于简单的房间内聊天室场景。 | 请参考 [限制说明](/live-streaming-uniapp/introduction/restrictions)。 |
| 弹幕消息 | 观众在直播过程中可以发表自己的评论，并以滑动而过的字幕显示出来，增加了观众之间的互动性。 | 一般用于房间内有大量消息收发，且不需要保证消息可靠的场景，例如直播弹幕。 | 请参考 [限制说明](/live-streaming-uniapp/introduction/restrictions)。 |
| 自定义信令 | 向同一房间内指定的单个或多个用户发送信令消息。 | 一般用于远程控制信令或向特定的用户发送消息，例如在线娃娃机场景中，远程控制娃娃机夹子的移动。 | 请参考 [限制说明](/live-streaming-uniapp/introduction/restrictions)。 |


## 示例源码下载

请参考 [下载示例源码](/real-time-video-windows-cpp/quick-start/run-example-code) 获取源码。

相关源码请查看 “/ZegoExpressExample/src/RoomMessage/ZegoRoomMessageDemo.cpp” 文件。

## 前提条件

在发送实时消息前，请确保：

- 已在项目中集成 ZEGO Express SDK，实现基本的实时语音功能，详情请参考 [快速开始 - 集成](https://doc-zh.zego.im/article/3577) 和 [快速开始 - 实现流程](https://doc-zh.zego.im/article/7637)。
- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppID 和 AppSign，详情请参考 [控制台 - 项目管理](/console/project-info) 中的“项目信息”。


## 使用步骤

### 发送消息

- **发送广播消息**

    调用 [sendBroadcastMessage](https://doc-zh.zego.im/zh/api?doc=Express_Video_SDK_API~CPP_windows~class~zego-express-i-zego-express-engine#send-broadcast-message) 接口向同一房间内的其他用户发送广播消息，长度不能超过 1024 字节。

    通过 [ZegoIMSendBroadcastMessageCallback](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cpp_windows~interface~ZegoExpressDefines#zego-im-send-broadcast-message-callback) 回调获取消息发送结果。

    ```cpp
    // 发送广播消息，每个登录房间的用户都会通过 onIMRecvBroadcastMessage 收到此消息
    engine->sendBroadcastMessage("ChatRoom-1", "This is a broadcast message", [=](/real-time-voice-windows/room/int-errorcode,-unsigned-long-long-messageid){
        printf("send broadcast message: errorCode=%d", errorCode);
    })
    ```

- **发送弹幕消息**

    调用 [sendBarrageMessage ](https://doc-zh.zego.im/zh/api?doc=Express_Video_SDK_API~CPP_windows~class~zego-express-i-zego-express-engine#send-barrage-message) 接口向同一房间内的其他用户发送弹幕消息，长度不能超过 1024 字节。

    通过 [ZegoIMSendBarrageMessageCallback](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cpp_windows~interface~ZegoExpressDefines#zego-im-send-barrage-message-callback) 回调获取消息发送结果。

    ```cpp
    // 发送弹幕消息，每个登录房间的用户都会通过 onIMRecvBarrageMessage 收到此消息
    engine->sendBarrageMassage("ChatRoom-1", "This is a barrage message", [=](/real-time-voice-windows/room/int-errorcode,-std::string-messageid){
        printf("send barrage message: errorCode=%d", errorCode);
    })
    ```

- **发送自定义信令**

    调用 [sendCustomCommand ](https://doc-zh.zego.im/zh/api?doc=Express_Video_SDK_API~CPP_windows~class~zego-express-i-zego-express-engine#send-custom-command) 接口向同一房间内通过 “toUserList” 指定的用户发送自定义信令，长度不能超过 1024 字节。

    通过 [ZegoIMSendCustomCommandCallback](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cpp_windows~interface~ZegoExpressDefines#zego-im-send-custom-command-callback) 回调获取消息发送结果。

    ```cpp
    // 发送自定义信令，toUserList中指定的用户才可以通过 onIMRecvCustomCommand 收到此信令
    auto user1 = ZegoUser("userID1", "userName1");
    auto user2 = ZegoUser("userID2", "userName2");
    std::vector<ZegoUser> toUserList = {user1, user2};
    engine->sendCustomCommand("ChatRoom-1", toUserList, "This is a custom command", [=](/real-time-voice-windows/room/int-errorcode){
        printf("send custom command: errorCode=%d", errorCode);
    })
    ```

### 接收消息

- **接收广播消息**

    实现 [IZegoEventHandler](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cpp_windows~class~IZegoEventHandler) 代理中的 [onIMRecvBroadcastMessage ](https://doc-zh.zego.im/zh/api?doc=Express_Video_SDK_API~CPP_windows~class~zego-express-i-zego-event-handler#on-im-recv-broadcast-message) 回调，当发送方成功发送广播消息后，同一房间内的其他用户通过此回调接收相关信息，包括消息内容、消息 ID、发送时间及发送方信息。

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
        }
    }
    ```

- **接收弹幕消息**

    实现 [IZegoEventHandler](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cpp_windows~class~IZegoEventHandler) 代理中的 [onIMRecvBarrageMessage ](https://doc-zh.zego.im/zh/api?doc=Express_Video_SDK_API~CPP_windows~class~zego-express-i-zego-event-handler#on-im-recv-barrage-message) 回调，当发送方成功发送弹幕消息后，同一房间内的其他用户通过此回调接收相关信息，包括消息内容、消息 ID、发送时间及发送方信息。

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
        }
    }
    ```

- **接收自定义信令**

    实现 [IZegoEventHandler](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cpp_windows~class~IZegoEventHandler) 代理中的 [onIMRecvCustomCommand ](https://doc-zh.zego.im/zh/api?doc=Express_Video_SDK_API~CPP_windows~class~zego-express-i-zego-event-handler#on-im-recv-custom-command) 回调，当发送方成功发送自定义信令后，同一房间内的指定用户通过此回调接收相关信息，包括消息内容和消息发送方信息。

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
        }
    }
    ```

## API 参考列表

| 方法 | 描述 |
|-------|--------|
| [sendBroadcastMessage ](https://doc-zh.zego.im/zh/api?doc=Express_Video_SDK_API~CPP_windows~class~zego-express-i-zego-express-engine#send-broadcast-message) | 发送房间广播消息 |
| [onIMRecvBroadcastMessage ](https://doc-zh.zego.im/zh/api?doc=Express_Video_SDK_API~CPP_windows~class~zego-express-i-zego-event-handler#on-im-recv-broadcast-message) | 接收房间广播消息通知 |
| [sendBarrageMessage ](https://doc-zh.zego.im/zh/api?doc=Express_Video_SDK_API~CPP_windows~class~zego-express-i-zego-express-engine#send-barrage-message) | 发送房间弹幕消息 |
| [onIMRecvBarrageMessage ](https://doc-zh.zego.im/zh/api?doc=Express_Video_SDK_API~CPP_windows~class~zego-express-i-zego-event-handler#on-im-recv-barrage-message) | 接收房间弹幕消息通知 |
| [sendCustomCommand ](https://doc-zh.zego.im/zh/api?doc=Express_Video_SDK_API~CPP_windows~class~zego-express-i-zego-express-engine#send-custom-command) | 发送自定义信令 |
| [onIMRecvCustomCommand ](https://doc-zh.zego.im/zh/api?doc=Express_Video_SDK_API~CPP_windows~class~zego-express-i-zego-event-handler#on-im-recv-custom-command) | 接收自定义信令通知 |
