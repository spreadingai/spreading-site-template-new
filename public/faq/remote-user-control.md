<Title>如何对远端用户进行上下麦/禁言/禁摄像头操作？</Title>



- - -

## 简介
在实时音视频互动中，经常会有本地对远端用户进行操作的需求。比如语聊房中主播会邀请观众上麦进行互动，可以让麦上的用户下麦变回普通观众。在视频会议里主持人可以对与会人进行禁言、禁摄像头操作。

## 实现方法
> 在实现本地对远端用户操作之前，请确保实现基本的实时音视频功能。

在 ZEGO Express SDK 中，本地对远端用户的操作，一般都是通过发送和接收自定义信令 `sendCustomCommand/onIMRecvCustomCommand` 并结合开发者设计的业务系统来实现。

#### 上下麦
主播邀请观众上麦基本 API 时序图
<Frame width="512" height="auto" caption=""><Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/FAQ/remote_custom_command_1.png" /></Frame></Frame>

具体步骤：
1. 实现基本的音视频功能
2. 主播发送上麦信令给到指定观众 [sendCustomCommand](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Java~class~im-zego-zegoexpress-zego-express-engine#send-custom-command) 
3. 观众接收到信令 [onIMRecvCustomCommand](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Java~class~im-zego-zegoexpress-callback-i-zego-event-handler#on-im-recv-custom-command)
4. 观众发起推流上麦 [startPublishingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Java~class~im-zego-zegoexpress-zego-express-engine#start-publishing-stream)
5. 主播接收到房间流更新 [onRoomStreamUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Java~class~im-zego-zegoexpress-callback-i-zego-event-handler#on-room-stream-update)
6. 主播拉取指定观众的流 [startPlayingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Java~class~im-zego-zegoexpress-zego-express-engine#start-playing-stream)

同理，如果想要实现下麦功能，观众端在接收到下麦信令的时候，调用 [stopPublishingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Java~class~im-zego-zegoexpress-zego-express-engine#stop-publishing-stream) 停止推流。 


#### 禁言/禁摄像头
本地要求远端禁言/禁摄像头 API 时序图
<Frame width="512" height="auto" caption=""><Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/FAQ/remote_custom_command_2.png" /></Frame></Frame>

与上下麦操作类似，主持人和与会者通过发送和接收自定义信令来进行禁言或禁摄像头操作。
- 禁言 [mutePublishStreamAudio](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Java~class~im-zego-zegoexpress-zego-express-engine#mute-publish-stream-audio)
- 禁摄像头 [mutePublishStreamVideo](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Java~class~im-zego-zegoexpress-zego-express-engine#mute-publish-stream-video)

远端麦克风和摄像头变更后，本地会接收到对应的消息回调，可在其中进行逻辑处理。
- 麦克风 [onRemoteMicStateUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Java~class~im-zego-zegoexpress-callback-i-zego-event-handler#on-remote-mic-state-update)
- 摄像头 [onRemoteCameraStateUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Java~class~im-zego-zegoexpress-callback-i-zego-event-handler#on-remote-camera-state-update)

## 注意事项

若开发者需要使用 ZEGO 房间用户广播通知 `onRoomUserUpdate`，请确保每个用户在登录房间时传的 `ZegoRoomConfig` 都将 `isUserStatusNotify` 属性设置为 `true`，否则将收不到该回调通知。
