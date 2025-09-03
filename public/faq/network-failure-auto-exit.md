<Title>网络环境差时，Express SDK 会强行让用户自动退出房间吗？</Title>



- - -

当用户网络环境差时，SDK 会有内部重试的流程。若需关注房间连接情况，请监听 [onRoomStateChanged](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Java_android~class~im-zego-zegoexpress-callback-i-zego-event-handler&jumpType=route#on-room-state-changed) 回调。

- 用户登录房间过程中，其房间状态为 LOGINING。
- 用户正常连接房间时（即登录房间成功），其房间状态为 LOGINED，表示连接成功。
- 当网络断开或无法访问时，用户的房间状态会从 LOGINED 变为 RECONNECTING，即正在请求连接，表示房间连接暂时中断，正在重新连接中。
    - 重连成功后，用户房间状态会重新变为 RECONNECTED。
    - 如果达到最大重试时间（20 分钟）还没有连上，用户房间状态会变成 RECONNECT_FAILED，表示客户端与房间彻底断开，当前推拉流会被停止，用户会自动退出房间，且此时 SDK 内部不会再进行重连（建议您提示用户已掉线，可以尝试检查网络情况）。
