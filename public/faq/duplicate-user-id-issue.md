<Title>使用 Express SDK 时，如果不同的客户端使用同一个userID 登录房间，会出现什么问题？</Title>



- - -

<Warning title="注意">


业务侧必须保证 userID 全局唯一，避免在多个客户端同时登录。

</Warning>



如果不同的客户端使用同一个 userID、登录任何一个房间：

- 前面使用该 userID 登录的客户端用户会被踢下线，并通过 [onRoomStateChanged](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~IZegoEventHandler#on-room-state-changed)/[onRoomStateUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~IZegoEventHandler#on-room-state-update) 回调收到 `房间状态变化` 的通知；之前登录过的房间内的推流、拉流都会被停止。
- 房间内的其他用户，通过 [onRoomUserUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~IZegoEventHandler#on-room-user-update) 回调收到 `房间内用户变化` 的通知。



