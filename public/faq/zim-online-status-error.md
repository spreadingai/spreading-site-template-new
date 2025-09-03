<Title>通过 ZIM 服务端 “查询用户在线状态” 接口返回 660200001 错误码，该如何处理？</Title>



- - - 


ZIM 的用户状态分为 2 种：

- Online：在线。
- Offline：离线，即 [心跳超时](https://doc-zh.zego.im/faq/ZIM_heartbeat)。

如果所查询的用户 UserId 是 “调用 `logout` 接口退出登录” 或 “未注册” 的状态，会归类到查询失败列表、返回 660200001，返回码详情请参考 [全局返回码](/zim-server/user/query-users-online-status)。
