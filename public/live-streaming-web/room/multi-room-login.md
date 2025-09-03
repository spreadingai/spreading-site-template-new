# 登录多房间

---

## 功能简介

同一个用户可以同时加入多个房间，并同时在多个房间内推流、拉流、发送实时消息和接收消息回调。

<Note title="说明">


- 本功能默认不开启，如需使用，请联系 ZEGO 技术支持开通相关权限。
- 本功能开启后，默认支持最多同时加入 5 个房间，如果您有更多需求，请联系 ZEGO 技术支持提供处理。

</Note>




### 应用场景

本功能可以隔离多个房间的消息及回调，实现更灵活的连麦业务。ZEGO 推荐用于跨房间连麦和在线教育的超级小班场景。

- 跨房间连麦

主播 A 与主播 B 进行跨房间连麦，主播 A 可以通知房间 A 中所有观众登录主播 B 的房间进行拉流，主播 B 同样可以通知房间 B 中所有观众登录主播 A 的房间进行拉流。


- 超级小班

老师进入大班房间推流，学生都登录大班房间拉流，同时登录小组房间与同组学生讨论和连麦。助教老师登录小组房间维持课堂秩序或解答学生问题。


## 前提条件

在实现多房间功能之前，请确保：

- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppID 和 Server 地址，详情请参考 [控制台 - 项目管理](/console/project-info)。
- 已在项目中集成 ZEGO Express SDK（2.9.0 版本及以上），并实现了基本的音视频推拉流功能，详情请参考 [快速开始 - 集成](https://doc-zh.zego.im/article/199) 和 [快速开始 - 实现流程](https://doc-zh.zego.im/article/7638)。
- 已联系 ZEGO 技术支持开通多房间功能。


## 使用步骤

以同一用户加入两个房间为例，整体实现流程如下：

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Common/MultiRoom/MultiRoom_Web_new.png" /></Frame>

1. 初始化 SDK，然后将房间模式设置为多房间。
2. 加入第一个房间，成功登录后，可在该房间内推流、拉流、发送和接收实时消息。
3. 加入第二个房间，成功登录后，可在该房间内推流、拉流、发送和接收实时消息。
4. 离开第一个和第二个房间，针对离开房间不做时序上的限制。

具体功能的实现如下：

### 1 初始化 SDK

请参考 [快速开始 - 实现流程](https://doc-zh.zego.im/article/16050#CreateEngine) 的 “创建引擎”  进行 SDK 的初始化。

### 2 设置多房间模式

必须在初始化 SDK 之后，登录房间前调用，调用 [enableMultiRoom](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#enable-multi-room) 设置为true开启多房间


``` javascript
// 初始化 SDK
const zg = new ZegoExpressEngine(appID, server);
// 设置房间模式为多房间模式
zg.enableMultiRoom(true);
// 登录房间
zg.loginRoom()
```

<Note title="说明">


如果在没有开通多房间功能的情况下设置多房间模式，登录房间会失败报错，返回错误码为“1100001016”。

</Note>




### 3 登录多房间

通过 [loginRoom](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#login-room) 接口成功登录第一个房间后，再次调用 [loginRoom](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#login-room) 接口登录第二个房间。

```javascript
// 先登录第一个房间
zg.loginRoom('first', token, {userID: 'zegoUser'});

// 后登录第二个房间
zg.loginRoom('second', token, {userID: 'zegoUser'});
```

登录第一个房间后，也可以通过 [switchRoom](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#switch-room) 接口切换到另一个房间。
```javascript
// 先登录第一个房间
zg.loginRoom('first', token, {userID: 'zegoUser'});

// 后登录第二个房间
zg.switchRoom('first', 'second', {token: token});
```


### 4 推流

传入房间 ID 等参数，调用 [startPublishingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#start-publishing-stream) 接口在指定房间内推流。

```javascript
const localStream = zg.createZegoStream();
zg.startPublishingStream(userID, localStream, { roomID: roomID });
```

### 5 拉流

拉流端根据流 ID 即可拉取到对应的流，多房间模式与普通单房间模式的拉流方式没有差别。

传入的流 ID，调用 [startPlayingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#start-playing-stream)  接口即可进行拉流。

```javascript
const remoteStream = await zg.startPlayingStream(streamID);

// remoteVideo 为本地<video>或<audio>对象
remoteVideo.srcObject = remoteStream;
```

### 6 发送、接收实时消息

- 广播消息

调用 [sendBroadcastMessage](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#send-broadcast-message) 接口发送广播消息，房间其他用户通过 [IMRecvBroadcastMessage](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoRTMEvent#im-recv-broadcast-message)
 回调接收消息，可通过房间 ID 来区分是哪个房间发送的。

```javascript
// 房间其他人收到消息，通过房间 ID 来区分是哪个房间发送的
zg.on(
    'IMRecvBroadcastMessage',
    (
        roomID: string,
        chatData: Array<{
            fromUser: ZegoUser;
            message: string;
            sendTime: number;
            messageID: number;
        }>,
    ) => {
        console.log('IMRecvBroadcastMessage', roomID, chatData);
    },
);

// 发送房间消息
zg.sendBroadcastMessage(
        roomID,
        JSON.stringify({
            text: 'rtc.sendBroadcastMessage test',
        }),
    );
});
```

- 弹幕消息

弹幕消息，主要用于大并发的场景，发送一些非必须到达的消息。

调用 [sendBarrageMessage](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#send-barrage-message) 接口发送弹幕消息，房间其他用户通过 [IMRecvBarrageMessage](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoRTMEvent#im-recv-barrage-message)
 回调接收消息，可通过房间 ID 来区分是哪个房间发送的。

```javascript
// 房间其他人收到消息，通过房间 ID 来区分是哪个房间发送的
zg.on(
    'IMRecvBarrageMessage',
    (
        roomID: string,
        chatData: Array<{
            fromUser: ZegoUser;
            message: string;
            sendTime: number;
            messageID: string;
        }>,
    ) => {
        console.log('IMRecvBarrageMessage', roomID, chatData);
    },
);

// 发送
zg.sendBarrageMessage(
    roomID,
    JSON.stringify({
        text: 'rtc.sendBarrageMessage test',
    }),
);
```

- 自定义信令

自定义信令，指定房间里的用户（可以指定多个），发送特定的消息。

调用 [sendCustomCommand](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#send-custom-command) 接口发送自定义信令，房间其他用户通过 [IMRecvCustomCommand](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoRTMEvent#im-recv-custom-command)
 回调接收消息，可通过房间 ID 来区分是哪个房间发送的。

```javascript
// 发送
zg.sendCustomCommand(
    roomID,
    // JSON.stringify(
    // @ts-ignore
    {
        text: 'rtc.sendCustomCommand test',
    },
    // )
    [],
);

// 接收自定义信令
zg.on('IMRecvCustomCommand', (roomID: string, fromUser: ZegoUser, command: string) => {
    console.log('IMRecvCustomCommand', roomID, fromUser, command);
});
```

- 房间附加信息

调用 [setRoomExtraInfo](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#set-room-extra-info) 接口发送房间附加信息，房间其他用户通过 [roomExtraInfoUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoRTMEvent#room-extra-info-update)
 回调接收消息，可通过房间 ID 来区分是哪个房间发送的。

```javascript
// 发送，一个房间内只允许 1 个 key
zg.setRoomExtraInfo(
    roomID,
    '2',
    JSON.stringify({
        text: 'rtc.setRoomExtraInfo test',
    }),
);

// 接收，通过 setRoomExtraInfoCallback
zg.on('roomExtraInfoUpdate', (roomID: string, data: any) =>{
    console.log('roomExtraInfoUpdate', roomID, data);
});
```

<Note title="说明">

发送实时消息的大小和频率限制可参考 [限制说明](https://doc-zh.zego.im/article/7584)。

</Note>



### 7 退出房间

传入房间 ID ，调用 [logoutRoom](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#logout-room) 接口退出房间。

- 单房间模式下，退出房间，同时会停止所有的推拉流。
- 多房间模式下，若只传入房间 ID，只会退出指定房间，并停止该房间的推拉流。若未传入参数，则会退出所有房间并停止所有房间的推拉流。

```javascript
zg.logoutRoom("roomid");
```


## 常见问题

<Accordion title="调用 enableMultiRoom 接口返回 false 失败，是什么原因？" defaultOpen="false">
- 是否在初始化 SDK 之后 登录房间前调用 enableMultiRoom 接口。
- 是否重复调用，一次完整的生命周期中仅允许该接口调用 1 次
- 是否传入正确的参数。
</Accordion>

<Accordion title="调用 loginRoom 登录失败，错误码为 “1100001016”。是什么原因？" defaultOpen="false">
在没有开通多房间功能的情况下设置了多房间模式，登录房间会失败，返回错误码 1100001016。
</Accordion>

<Accordion title="调用 loginRoom 登录失败，错误码为 “1000005022”。是什么原因？" defaultOpen="false">
同时登录的房间数超过最大房间个数后会返回错误码 1000005022。目前默认最多同时加入 5 个房间，如有更多需求，请联系 ZEGO 技术支持提供扩展能力。
</Accordion>
<Content />

