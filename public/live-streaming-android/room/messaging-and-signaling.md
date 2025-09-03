# 实时消息与信令

- - -

## 功能简介


ZEGO 提供多种文本消息的收发功能，实现发送房间内广播消息、弹幕消息、简单 IM 文字聊天、点赞、送礼物、答题等功能。


| 消息类型 | 功能描述 | 应用场景 | 发送频率限制 |
|-------|--------|--------|--------|
| 广播消息 | 向同一房间内所有用户发送文本消息。 | 可用于简单的房间内聊天室场景。 | 请参考 [限制说明](https://doc-zh.zego.im/article/7581)。 |
| 弹幕消息 | 观众在直播过程中可以发表自己的评论，并以滑动而过的字幕显示出来，增加了观众之间的互动性。 | 一般用于房间内有大量消息收发，且不需要保证消息可靠性的场景，例如直播弹幕。 | 请参考 [限制说明](https://doc-zh.zego.im/article/7581)。|
| 自定义信令 | 向同一房间内单个或多个用户发送消息。 | 一般用于远程控制信令或简单的文字消息发送。比如在线娃娃机场景中，远程控制娃娃机夹子的移动。 | 请参考 [限制说明](https://doc-zh.zego.im/article/7581)。

另外，ZEGO 还提供完整的即时通讯 ZIM SDK，为开发者提供全平台互动、海量并发、超低延时、消息必达的通信服务，具体请参考 [即时通讯](https://doc-zh.zego.im/article/11588)。

## 示例源码下载

请参考 [下载示例源码](https://doc-zh.zego.im/article/13396) 获取源码。

相关源码请查看 “/ZegoExpressExample/CommonFeatures/src/main/java/im/zego/roommessage” 目录下的文件。

## 前提条件

在发送实时消息前，请确保：

- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppID 和 AppSign，详情请参考 [控制台 - 项目信息](/console/project-info)。
- 已在项目中集成 ZEGO Express SDK，并实现了基本的音视频推拉流功能，详情请参考 [快速开始 - 集成](https://doc-zh.zego.im/article/13394) 和 [快速开始 - 实现流程](https://doc-zh.zego.im/article/13395)。


## 使用步骤

### 收发广播消息

1. **发送广播消息**

  调用 [sendBroadcastMessage ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Java_android~class~im-zego-zegoexpress-zego-express-engine#send-broadcast-message) 接口向同一房间内的其他用户发送广播消息，长度不能超过 1024 字节。

  通过 [onIMSendBroadcastMessageResult ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Java_android~interface~im-zego-zegoexpress-callback-i-zego-im-send-broadcast-message-callback#on-im-send-broadcast-message-result) 回调获取消息发送结果。

  ```java
  // 发送广播消息
  engine.sendBroadcastMessage(roomID, msg, new IZegoIMSendBroadcastMessageCallback() {
      // 发送广播消息结果回调处理
      @Override
      public void onIMSendBroadcastMessageResult(int errorCode, long messageID) {
          // 发送消息结果成功或失败的处理
      }
  });
  ```
2. **接收广播消息**

  实现 [IZegoEventHandler](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~IZegoEventHandler) 代理中的 [onIMRecvBroadcastMessage](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Java_android~class~im-zego-zegoexpress-callback-i-zego-event-handler#on-im-recv-broadcast-message) 回调，当发送方成功发送广播消息后，同一房间内的其他用户通过此回调接收相关信息，包括消息内容、消息 ID、发送时间及发送方信息。

  ```java
  public abstract class IZegoEventHandler {

      /**
       * 接收房间广播消息通知
       *
       * @param roomID 房间 ID
       * @param messageList 收到的消息列表
       */
      @Override
      public void onIMRecvBroadcastMessage(String roomID, ArrayList<ZegoBroadcastMessageInfo> messageList){
          // 收到其他用户发送消息的处理
      }

  }
  ```

### 收发弹幕消息


1. **发送弹幕消息**

  调用 [sendBarrageMessage ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Java_android~class~im-zego-zegoexpress-zego-express-engine#send-barrage-message) 接口向同一房间内的其他用户发送弹幕消息，长度不能超过 1024 字节。

  通过 [onIMSendBarrageMessageResult ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Java_android~interface~im-zego-zegoexpress-callback-i-zego-im-send-barrage-message-callback#on-im-send-barrage-message-result) 回调获取消息发送结果。

  ```java
  // 发送房间弹幕消息
  engine.sendBarrageMessage("ChatRoom-1", "This is a barrage message", new IZegoIMSendBarrageMessageCallback(){
      // 发送弹幕消息结果回调处理
      @Override
      public void onIMSendBarrageMessageResult(int errorCode, String messageID) {
           // 发送消息结果成功或失败的处理
      }
  });
  ```
2. **接收弹幕消息**

  实现 [IZegoEventHandler](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~IZegoEventHandler) 代理中的 [onIMRecvBarrageMessage ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Java_android~class~im-zego-zegoexpress-callback-i-zego-event-handler#on-im-recv-barrage-message) 回调，当发送方成功发送弹幕消息后，同一房间内的其他用户通过此回调接收相关信息，包括消息内容、消息 ID、发送时间及发送方信息。

  ```java
  public abstract class IZegoEventHandler {

      /**
       * 接收房间弹幕消息通知
       *
       * @param roomID 房间 ID
       * @param messageList 收到的消息列表
       */
      @Override
      public void onIMRecvBarrageMessage(String roomID, ArrayList<ZegoBarrageMessageInfo> messageList){
           // 收到其他用户发送消息的处理
      }

  }
  ```

### 收发自定义信令

1. **发送自定义信令**

  调用 [sendCustomCommand ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Java_android~class~im-zego-zegoexpress-zego-express-engine#send-custom-command) 接口向同一房间内通过 “toUserList” 指定的用户发送自定义信令，长度不能超过 1024 字节。

  通过 [onIMSendCustomCommandResult ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Java_android~interface~im-zego-zegoexpress-callback-i-zego-im-send-custom-command-callback#on-im-send-custom-command-result) 回调获取消息发送结果。

  ```java
  // 发送自定义信令，`toUserList` 中指定的用户才可以通过 onIMSendCustomCommandResult 收到此信令
  // 若 `toUserList` 参数传 `null`，则 SDK 将发送该信令给房间内所有用户
  engine.sendCustomCommand(roomID, command, toUserList, new IZegoIMSendCustomCommandCallback() {
      // 发送用户自定义消息结果回调处理
      @Override
      public void onIMSendCustomCommandResult(int errorCode) {
          // 发送消息结果成功或失败的处理
      }
  });
  ```
2. **接收自定义信令**

  实现 [IZegoEventHandler](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~IZegoEventHandler) 代理中的 [onIMRecvCustomCommand ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Java_android~class~im-zego-zegoexpress-callback-i-zego-event-handler#on-im-recv-custom-command) 回调，当发送方成功发送自定义消息后，同一房间内的指定用户通过此回调接收相关信息，包括消息内容和消息发送方信息。

  ```java
  public abstract class IZegoEventHandler {

      /**
       * 接收自定义信令通知
       *
       * @param roomID 房间 ID
       * @param fromUser 信令的发送人
       * @param command 信令内容
       */
      @Override
      public void onIMRecvCustomCommand(String roomID, ZegoUser fromUser, String command){
          // 收到其他用户发送消息的处理
      }

  }
  ```

<Content />
