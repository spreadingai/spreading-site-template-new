<Title>ZIM SDK 中的 onConnectionStateChanged 回调与 onRoomStateChanged 回调的区别是什么？分别在什么情况下触发？</Title>



- - -

- [onConnectionStateChanged](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIMEventHandler#on-connection-state-changed) 是 `用户在线连接状态发生改变` 时触发的回调，[onRoomStateChanged](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIMEventHandler#on-room-state-changed) 是 `用户位于房间中、且房间状态改变` 时触发的回调。
- 如果用户只调用 [login](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#login-1) 接口登录 ZIM，仅返回 [onConnectionStateChanged](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIMEventHandler#on-connection-state-changed) 回调。
- 如果用户既调用 [login](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#login-1) 接口登录 ZIM，又调用 [createRoom](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#create-room-1) 或 [enterRoom](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#enter-room) 进入房间，将同时返回 [onConnectionStateChanged](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIMEventHandler#on-connection-state-changed) 和 [onRoomStateChanged](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIMEventHandler#on-room-state-changed) 回调。