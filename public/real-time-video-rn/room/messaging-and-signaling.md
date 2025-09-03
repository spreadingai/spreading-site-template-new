# 实时消息与信令


- - -

## 功能简介


ZEGO 提供多种文本消息的收发功能，实现发送房间内广播消息、弹幕消息、简单 IM 文字聊天、点赞、送礼物、答题等功能。


| 消息类型 | 功能描述 | 应用场景 | 发送频率限制 |
|-------|--------|--------|--------|
| 广播消息 | 向同一房间内所有用户发送文本消息。 | 可用于简单的房间内聊天室场景。 | 请参考 [限制说明](https://doc-zh.zego.im/article/9690)。 |
| 弹幕消息 | 观众在直播过程中可以发表自己的评论，并以滑动而过的字幕显示出来，增加了观众之间的互动性。 | 一般用于房间内有大量消息收发，且不需要保证消息可靠性的场景，例如直播弹幕。 | 请参考 [限制说明](https://doc-zh.zego.im/article/9690)。|
| 自定义信令 | 向同一房间内单个或多个用户发送消息。 | 一般用于远程控制信令或简单的文字消息发送。比如在线娃娃机场景中，远程控制娃娃机夹子的移动。 | 请参考 [限制说明](https://doc-zh.zego.im/article/9690)。

另外，ZEGO 还提供完整的即时通讯 ZIM SDK，为开发者提供全平台互动、海量并发、超低延时、消息必达的通信服务，具体请参考 [即时通讯](https://doc-zh.zego.im/article/15338)。


## 前提条件

在发送实时消息前，请确保：

- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppID 和 AppSign，详情请参考 [控制台 - 项目信息](/console/project-info)。
- 已在项目中集成 ZEGO Express SDK，并实现了基本的音视频推拉流功能，详情请参考 [快速开始 - 集成](https://doc-zh.zego.im/article/4835) 和 [快速开始 - 实现流程](https://doc-zh.zego.im/article/8328)。


## 使用步骤

### 收发广播消息

1. **发送广播消息**

   调用 [sendBroadcastMessage ](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/classes/_zegoexpressengine_.zegoexpressengine.html#sendbroadcastmessage) 接口向同一房间内的其他用户发送广播消息，长度不能超过 1024 字节。

   通过 [ZegoIMSendBroadcastMessageResult ](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/interfaces/_zegoexpressdefines_.zegoimsendbroadcastmessageresult.html) 异步结果的返回获取消息发送结果。

   ```javascript
   // 发送广播消息
   ZegoExpressEngine.instance().sendBroadcastMessage("ChatRoom-1", "This is a broadcast message").then((result) => {
       // 获取消息发送结果
   })
   ```

2. **接收广播消息**

   通过调用 ZegoExpressEngine 的 [on ](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/classes/_zegoexpressengine_.zegoexpressengine.html#on) 方法，设置监听 [IMRecvBroadcastMessage ](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/interfaces/_zegoexpresseventhandler_.zegoeventlistener.html#imrecvbroadcastmessage) 的事件回调，当发送方成功发送广播消息后，同一房间内的其他用户通过此回调接收相关信息，包括消息内容、消息 ID、发送时间及发送方信息。

   ```javascript
   // 收到其他用户发送消息
   ZegoExpressEngine.instance().on('IMRecvBroadcastMessage', (roomID, messageList) => {
        console.log("received broadcast message")
       })
   ```

### 收发弹幕消息

1. **发送弹幕消息**

   调用 [sendBarrageMessage ](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/classes/_zegoexpressengine_.zegoexpressengine.html#sendbarragemessage) 接口向同一房间内的其他用户发送弹幕消息，长度不能超过 1024 字节。

   通过 [ZegoIMSendBarrageMessageResult ](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/interfaces/_zegoexpressdefines_.zegoimsendbarragemessageresult.html) 异步结果的返回获取消息发送结果。

   ```javascript
   // 发送房间弹幕消息
   ZegoExpressEngine.instance(). sendBarrageMessage("ChatRoom-1", "This is a barrage message").then((result) => {
       // 获取消息发送结果
   })
   ```

2. **接收弹幕消息**

   通过调用 ZegoExpressEngine 的 [on ](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/classes/_zegoexpressengine_.zegoexpressengine.html#on) 方法，设置监听 [IMRecvBarrageMessage ](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/interfaces/_zegoexpresseventhandler_.zegoeventlistener.html#imrecvbarragemessage) 的事件回调，当发送方成功发送弹幕消息后，同一房间内的其他用户通过此回调接收相关信息，包括消息内容、消息 ID、发送时间及发送方信息。

   ```javascript
   // 收到其他用户发送消息
   ZegoExpressEngine.instance().on('IMRecvBarrageMessage', (roomID, messageList) => {
        console.log("received barrage message")
       })
   ```

### 收发自定义信令

1. **发送自定义信令**

   调用 [sendCustomCommand ](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/classes/_zegoexpressengine_.zegoexpressengine.html#sendcustomcommand) 接口向同一房间内通过 “toUserList” 指定的用户发送自定义信令，长度不能超过 1024 字节。

   通过 [ZegoIMSendCustomCommandResult ](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/interfaces/_zegoexpressdefines_.zegoimsendcustomcommandresult.html) 异步结果的返回获取消息发送结果。

   ```javascript
   // 发送自定义信令，`toUserList` 中指定的用户才可以通过 IMRecvCustomCommand 事件收到此信令
   // 若 `toUserList` 参数传空数组， 则 SDK 将发送该信令给房间内所有用户
   ZegoExpressEngine.instance().sendCustomCommand("ChatRoom-1", "This is a custom command", toUserList)
   ```

2. **接收自定义信令**

    通过调用 ZegoExpressEngine 的 [on ](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/classes/_zegoexpressengine_.zegoexpressengine.html#on) 方法，设置监听 [IMRecvCustomCommand ](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/interfaces/_zegoexpresseventhandler_.zegoeventlistener.html#imrecvcustomcommand) 的事件回调，当发送方成功发送自定义信令后，同一房间内的指定用户通过此回调接收相关信息，包括消息内容和消息发送方信息。

   ```javascript
   // 收到其他用户发送消息
   ZegoExpressEngine.instance().on('IMRecvCustomCommand', (roomID, fromUser, command) => {
        console.log("received custom command")
       })
   ```
