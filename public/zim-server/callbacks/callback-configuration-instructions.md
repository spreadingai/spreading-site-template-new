<Warning title="注意"><strong>回调服务不能保证完全可靠，请慎重考虑使用回调方案构建核心业务流程的风险。</strong></Warning>
# 回调配置说明
---

<Content />
    
在使用 ZIM 服务端 API 时，开发者可通过回调服务对接业务后台，进一步保证业务的有序和正常。

## 使用场景

- 用户登录或登出 ZIM 服务后，业务后台可以接收 ZIM 服务端的 [登录登出回调](/zim-server/callbacks/login-and-logout)，用于统计在线用户等业务逻辑。
- 客户端成功创建呼叫后，业务后台可以接收 ZIM 服务端的 [呼叫创建回调](/zim-server/callbacks/call-invitation-sent)，用于确定呼叫创建成功请求。
- 呼叫发起客户端成功取消呼叫，或在成功创建呼叫后主动登出或心跳超时后为登出态，业务后台可以接收 ZIM 服务端的 [呼叫取消回调](/zim-server/callbacks/call-invitation-canceled)，用于确定呼叫状态。
- 当呼叫对象客户端接受呼叫后，业务后台可以接收 ZIM 服务端的 [呼叫接受回调](/zim-server/callbacks/call-invitation-accepted)，用于确定呼叫接受成功请求。
- 当呼叫对象拒绝呼叫后，业务后台可以接收 ZIM 服务端的 [呼叫拒绝回调](/zim-server/callbacks/call-invitation-rejected)，用于确定呼叫拒绝成功请求。
- 呼叫创建成功后，呼叫对象一直未应答，直到满足后台配置的超时时间，或满足创建呼叫时设置的超时时间，业务后台可以接收 ZIM 服务端的 [呼叫超时回调](/zim-server/callbacks/call-invitation-timed-out)，用于确定呼叫超时用户。
- 用户发送单聊、群聊或房间聊天消息时，业务后台可以接受 ZIM 服务端的 [消息发送前回调](/zim-server/callbacks/message-not-sent-yet)，您可以通过应答，对消息进行实时操作。
- 用户发送单聊、群聊、房间消息成功或失败后，业务后台可以接收 ZIM 服务端的 [消息发送后回调](/zim-server/callbacks/message-sent)，将用户发送的消息实时同步至业务服务器，并存储于业务服务器。


## 回调配置

开发者可根据实际业务需要，在 [ZEGO控制台](https://console.zego.im) 的 “项目配置 ” 中配置接收回调的 URL 地址。配置详情，请参考 [控制台 - 服务配置 - 即时通讯 - ZIM 相关回调配置](https://doc-zh.zego.im/article/17223)。
