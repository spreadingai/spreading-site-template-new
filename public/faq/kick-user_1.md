<Title>如何将指定用户移出房间？</Title>



- - -

在实时音视频互动场景中，通常会有将指定用户移出房间的需求。

比如，在直播间，如果遇到连麦用户发表不良言论等情况，房主需要让该用户离开直播间。

目前可使用 ZEGO 服务端 API 将指定用户移出房间。

#### 接口调用说明

具体调用方式可参考 [房间用户踢出接口](/real-time-video-server/api-reference/room/kick-out-user)。

#### 移出状态回调

被移出的用户会在 [onRoomStateChanged](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Java_android~class~im-zego-zegoexpress-callback-i-zego-event-handler#on-room-state-changed) 中收到被踢出状态的回调，若由于 userID 相同的用户在其他地方登录导致被服务器踢出，此时 errorCode 为 1002050。若用户是被人为移出（开发者主动调用后台的 [踢出房间用户](/real-time-video-server/api-reference/room/kick-out-user) 接口），则会在 “extendeData” 中收到被移出的信息，此时 errorCode 为 1002055。
