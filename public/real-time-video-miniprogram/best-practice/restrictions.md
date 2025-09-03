# 限制说明
---

本文介绍 ZEGO Express SDK 房间服务的使用限制说明，包括频率限制，字符串大小等。

## 房间

ZEGO 房间服务支持单房间百万用户同时在线，默认每个房间的所有用户登录 QPS 总和为 200，即每秒内最多可支持 200 个用户登录同一房间。

<Note title="说明">
如果需要提高限制，请联系 ZEGO 技术支持申请评估。   
</Note>


## 房间实时消息

| SDK 接口 | 大小限制 | 发送频率限制（SDK 下的单个房间内）  | 说明 |
| :---------- | :----------- | :-------- | :-- |
| 发送广播消息 [sendBroadcastMessage](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_wxxcx~class~ZegoExpressEngine#send-broadcast-message)  | 消息长度默认限制为 1 KB。如需发送 1 KB 以上的消息，请联系 ZEGO 技术支持配置。  |  10 次/s  | <ul><li> 消息可靠。</li><li>单个用户在客户端调用此接口的最大 QPS 为 2。</li><li>向同一房间内所有用户发送广播消息，房间内所有用户都能收到消息。</li></ul> |
| 发送弹幕消息 [sendBarrageMessage](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_wxxcx~class~ZegoExpressEngine#send-barrage-message)   | 消息长度默认限制为 1 KB。如需发送 1 KB 以上的消息，请联系 ZEGO 技术支持配置。  | 20 次/s | <p>消息不保证可靠。</p> |
| 发送自定义信令消息 [sendCustomCommand](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_wxxcx~class~ZegoExpressEngine#send-custom-command)   | 消息长度不能超过 1 KB。 | <ul><li>向单人发送时：200 条/s</li><li>向多人发送时：10 条/s</li></ul> | <ul><li>消息可靠。</li><li>向同一房间内的所有用户发送自定义消息，房间内所有用户都能收到消息。</li> </ul>|


<Note title="说明">
此处的 `消息可靠性` 指网络连接正常时，对端用户是否能成功收到消息。
</Note>


## 房间附加信息

| SDK 接口  | 大小限制  | 发送频率限制（SDK 下的单个房间内）<br/> | 说明 |
| :------ | :----------- | :------- | :------- |
| 设置房间附加信息 [setRoomExtraInfo](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_wxxcx~class~ZegoExpressEngine#set-room-extra-info)  | <ul><li> key：房间附加消息 key 值，不能超过 10 B，且不允许为空字符串，一个房间内只允许设置 1 个 key 类型。</li><li>value：房间附加信息内容，不能超过 128 B，允许为空字符串。</li></ul> | 10 次/s | 单个用户在客户端多次调用此接口时，再次调用前，请确保已成功收到了前一次接口调用的回调通知。 |
<Content />