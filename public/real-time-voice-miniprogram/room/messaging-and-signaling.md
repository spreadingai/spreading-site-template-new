# 实时消息与信令


- - -

## 功能简介


ZEGO 提供多种文本消息的收发功能，实现发送房间内广播消息、弹幕消息、简单 IM 文字聊天、点赞、送礼物、答题等功能。


| 消息类型 | 功能描述 | 应用场景 | 发送频率限制 |
|-------|--------|--------|--------|
| 广播消息 | 向同一房间内所有用户发送文本消息。 | 可用于简单的房间内聊天室场景。 | 请参考 [限制说明](https://doc-zh.zego.im/article/7585)。 |
| 弹幕消息 | 观众在直播过程中可以发表自己的评论，并以滑动而过的字幕显示出来，增加了观众之间的互动性。 | 一般用于房间内有大量消息收发，且不需要保证消息可靠性的场景，例如直播弹幕。 | 请参考 [限制说明](https://doc-zh.zego.im/article/7585)。|
| 自定义信令 | 向同一房间内单个或多个用户发送消息。 | 一般用于远程控制信令或简单的文字消息发送。比如在线娃娃机场景中，远程控制娃娃机夹子的移动。 | 请参考 [限制说明](https://doc-zh.zego.im/article/7585)。

另外，ZEGO 还提供完整的即时通讯 ZIM SDK，为开发者提供全平台互动、海量并发、超低延时、消息必达的通信服务，具体请参考 [即时通讯](https://doc-zh.zego.im/article/12808)。
























## 示例源码下载

- 微信小程序请参考 [微信小程序 - 跑通示例源码](https://doc-zh.zego.im/article/18274)。
- 支付宝小程序请参考 [支付宝小程序 - 跑通示例源码](https://doc-zh.zego.im/article/18277)。

相关源码请查看 “/pages/message” 目录下的文件。

## 前提条件

在发送实时消息前，请确保：

- 已在项目中集成 ZEGO Express SDK，并实现了基本的音视频推拉流功能，详情请参考：
    - [微信小程序 - 集成 SDK](https://doc-zh.zego.im/article/18273) 和 [微信小程序 - 实现流程](https://doc-zh.zego.im/article/18272)。
    - [支付宝小程序 - 集成 SDK](https://doc-zh.zego.im/article/18281) 和 [支付宝小程序 - 实现流程](https://doc-zh.zego.im/article/18280)。

- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppID 和 Server 地址，详情请参考 [控制台 - 项目信息](/console/project-info)。

## 使用步骤

### 收发广播消息

1. **发送广播消息**

    调用 [sendBroadcastMessage](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_wxxcx~class~ZegoExpressEngine#send-broadcast-message) 接口向同一房间内的其他用户发送广播消息，长度不能超过 1024 字节。

    通过 [ZegoServerResponse ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_wxxcx~interface~ZegoServerResponse#error-code) 中的 “errorCode” 获取消息发送结果，“0” 表示成功，非 “0” 表示失败。

    ```javascript
    try {
        const isSent = await zg.sendBroadcastMessage(this.data.roomID, this.data.inputMessage)
        console.log('>>> sendMsg success, ', isSent);
    } catch (error) {
        console.log('>>> sendMsg, error: ', error);
    };
    ```
2. **接收广播消息**

    房间内成员注册 [IMRecvBroadcastMessage](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_wxxcx~interface~ZegoRTMEvent#im-recv-broadcast-message) 回调，当发送方成功发送广播消息后，同一房间内的其他用户通过此回调接收相关信息，包括消息内容、消息 ID、发送时间及发送方信息。

    ```javascript
    zg.on('IMRecvBroadcastMessage', (roomID, chatData) => {
        console.log('IMRecvBroadcastMessage', roomID, chatData);
        let message = {
            ID: 'zego' + chatData[0].fromUser.userID + chatData[0].sendTime,
            name: chatData[0].fromUser.userName,
            time: format(chatData[0].sendTime),
            content: chatData[0].message + '(广播发送)'
        }
    });
    ```

### 收发弹幕消息

1. **发送弹幕消息**

    调用 [sendBarrageMessage](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_wxxcx~class~ZegoExpressEngine#send-barrage-message) 接口向同一房间内的其他用户发送弹幕消息，长度不能超过 1024 字节。

    通过 [ZegoServerResponse ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_wxxcx~interface~ZegoServerResponse#error-code) 中的 “errorCode” 获取消息发送结果，“0” 表示成功，非 “0” 表示失败。

    ```javascript
    try {
        const isSent = await zg.sendBarrageMessage(this.data.roomID, this.data.inputMessage)
        console.log('>>> barrageMessage success, ', isSent);
    } catch (error) {
        console.log('>>> barrageMessage, error: ', error);
    };
    ```

2. **接收弹幕消息**

    房间内成员注册 [IMRecvBarrageMessage](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_wxxcx~interface~ZegoRTMEvent#im-recv-barrage-message) 回调，当发送方成功发送弹幕消息后，同一房间内的其他用户通过此回调接收相关信息，包括消息内容、消息 ID、发送时间及发送方信息。

    ```javascript
    zg.on('IMRecvBarrageMessage', (roomID, chatData) => {
        console.log('IMRecvBroadcastMessage', roomID, chatData);
        let message = {
            ID: 'zego' + chatData[0].fromUser.userID + chatData[0].sendTime,
            name: chatData[0].fromUser.userName,
            // @ts-ignore
            time: format(chatData[0].sendTime),
            content: chatData[0].message + '(弹幕发送)'
        }
    });
    ```

### 收发自定义信令

1. **发送自定义信令**

    调用 [sendCustomCommand](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_wxxcx~class~ZegoExpressEngine#send-custom-command) 接口向同一房间内通过 “toUserIDList” 指定的用户发送自定义信令，长度不能超过 1024 字节。

    通过 [ZegoServerResponse ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_wxxcx~interface~ZegoServerResponse#error-code) 中的 “errorCode” 获取消息发送结果，“0” 表示成功，非 “0” 表示失败。

    ```javascript
    try {
        const res =  await zg.sendCustomCommand(this.data.roomID, this.data.inputMessage, toUserIDList);
        console.warn('send custom success ' + res)
    } catch(error) {
        console.error(JSON.stringify(error))
    }
    ```

2. **接收自定义信令**

    房间内成员注册 [IMRecvCustomCommand](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_wxxcx~interface~ZegoRTMEvent#im-recv-custom-command) 回调，当发送方成功发送自定义信令后，同一房间内的指定用户通过此回调接收相关信息，包括消息内容和发送方信息。

    ```javascript
    zg.on('IMRecvCustomCommand', (roomID, fromUser, command) => {
        console.log('IMRecvCustomCommand',roomID, fromUser, command);
        let message = {
            ID: fromUser.userID,
            name: fromUser.userName,
            time: format(new Date().getTime()),
           content: command + '(自定义发送)'
        }
    });
    ```

<Content />

