<Title>直播场景下，如何监听远端观众角色用户登录/退出房间的事件？</Title>



- - -

## 概述

在直播时，开发者经常需要监听远端观众登录/退出房间的信息，以进行相应的业务操作，比如展示 UI、展示 VIP 观众的进入等。

在不同规模用户的场景下，需要采用不同的方案进行实现。

- 当房间内同时在线的用户小于 500 时：使用 [onRoomUserUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Java_android~class~im-zego-zegoexpress-callback-i-zego-event-handler#on-room-user-update) 监听用户的登录/退出。

- 当房间内同时在线的用户大于 500 时：建议开发者自己维护用户列表信息，或咨询 ZEGO 技术支持进一步了解。

以下介绍使用 [onRoomUserUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Java_android~class~im-zego-zegoexpress-callback-i-zego-event-handler&jumpType=route#on-room-user-update) 实现的解决方案。


## 解决方案


在用户登录房间时，将登录接口中的 [ZegoRoomConfig](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Java~class~im-zego-zegoexpress-entity-zego-room-config) 设置中的 [isUserStatusNotify ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Java~class~im-zego-zegoexpress-entity-zego-room-config#is-user-status-notify) 设置为 “true”（默认值为 “false”）。设置后，房间内所有用户会接受到该用户登录/退出房间的消息。

<Warning title="注意">



每一位用户在登录时都需要将 [isUserStatusNotify ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Java~class~im-zego-zegoexpress-entity-zego-room-config#is-user-status-notify) 设置为 “true”。  

</Warning>



使用本解决方案时，存在一定的使用限制，具体限制如下：
	
- 默认每个房间的所有用户登录 QPS 总和为 200，即每秒内最多可支持 200 个用户登录同一房间。

- 当房间人数超过 500 人时，部分用户加入/退出房间的通知（[onRoomUserUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Java_android~class~im-zego-zegoexpress-callback-i-zego-event-handler#on-room-user-update)）无法正常接收，建议开发者在自己的业务服务器维护房间用户的列表：

    - 前 500 人将无法收到 500 人以外的用户加入/退出房间的通知；
    - 500 人以外的用户无法收到房间内任何用户加入/退出房间的通知（前 500 人可正常收到彼此的通知）。

<Note title="说明">


如果需要提高限制，请联系 ZEGO 技术支持申请评估。

</Note>


