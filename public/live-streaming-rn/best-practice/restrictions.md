# 限制说明
---

本文介绍 ZEGO Express SDK 房间服务的使用限制说明，包括频率限制，字符串大小等。

## 房间

ZEGO 房间服务支持单房间百万用户同时在线，默认每个房间的所有用户登录 QPS 总和为 200，即每秒内最多可支持 200 个用户登录同一房间。

当房间人数超过 500 人时，用户登录/退出的回调以及用户列表的回调将会关闭，建议开发者在自己的业务服务器维护用户列表。

<Note title="说明">


如果需要提高限制，请联系 ZEGO 技术支持申请评估。   

</Note>





## 房间实时消息

| SDK 接口 | 大小限制 | 发送频率限制<br />（SDK 下的单个房间内）<br/>  | 说明 |
| :---------- | :----------- | :-------- | :-- |
| 发送广播消息 [sendBroadcastMessage](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/classes/_zegoexpressengine_.zegoexpressengine.html#sendbroadcastmessage)      | 消息长度不能超过 1 KB。    |  10 次/s  | <ul><li>消息可靠。</li><li>单个用户在客户端调用此接口的最大 QPS 为 2。</li><li>房间在线人数超过 500 时，不支持。 </li></ul> |
| 发送弹幕消息 [sendBarrageMessage](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/classes/_zegoexpressengine_.zegoexpressengine.html#sendbarragemessage)   | 消息长度不能超过 1 KB。| 20 次/s | <p>消息不保证可靠。</p> |
| 发送自定义信令消息 [sendCustomCommand](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/classes/_zegoexpressengine_.zegoexpressengine.html#sendcustomcommand)  | 消息长度不能超过 1 KB。  | <ul><li>向单人发送时：200 条/s</li><li>向多人发送时：10 条/s</li></ul> | <ul><li>消息可靠。</li><li>房间在线人数超过 500 时，不支持对多人发送。</li></ul> |

<Note title="说明">



此处的 `消息可靠性` 指网络连接正常时，对端用户是否能成功收到消息。

</Note>



<Content />