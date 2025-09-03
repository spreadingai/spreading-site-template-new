<Title>如果用户同时在实时音视频和即时通讯的房间里，需要离开房间时，应该先调用 Express SDK 的 “logoutRoom” 接口，还是 ZIM SDK 的 “leaveRoom” 接口呢？</Title>



- - -

实时音视频（Express SDK）和即时通讯（ZIM SDK）是两个独立的 SDK，离开房间时，不区分先后顺序，调用任意一个接口均可。

此外，Express SDK 的“房间”更倾向音视频中“频道”的概念，而 ZIM SDK 的“房间”则更倾向于“聊天室”的概念，两个产品的业务侧重点有所不同，请开发者注意区分。



## 相关问题

[ZIM 的 login 接口和实时音视频 loginRoom 接口有何差异？](/faq/zim-vs-rtc-login)