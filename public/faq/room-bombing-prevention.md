<Title>如何防止音视频互动中的幽灵麦或炸房的现象？</Title>



- - -

## 概述

“幽灵麦”指的是在音视频房间里出现非麦上用户说话的情况。   
“炸房”指的是用户利用幽灵麦，故意扰乱音视频房间秩序，破坏正常用户音视频互动的现象。

### 常见现象

常见的幽灵麦/炸房现象包括：

- 非法用户利用某个 AppID 配置 Token 有效期过长的问题，劫持 AppID 、UserID、RoomID 和 Token 重复登录。
- 非法用户非法登录房间后，制造噪音，不断发送违规的音视频内容，破坏聊天或互动的秩序。
- 非法用户劫持开发者后台下发的信令消息，扰乱房间内用户的上下麦等麦位操作，阻止客户端获取麦位信息。
- 由于业务漏洞，音视频房间中实际说话的情况与客户端上显示的麦位信息不相符，出现未知用户发言的情况。

### 常见场景

幽灵麦/炸房现象常出现在以下场景：

- 多人连麦通话
- 在线 KTV
- 语聊房


## 预防措施

开发者可以通过正确使用 Token，增强安全性，避免业务漏洞引发的幽灵麦/炸房现象：

<Note title="说明">



以下设置仅供 Native 平台参考，主要指 iOS、Android、macOS、Windows 平台。

</Note>




- 务必在服务端生成 Token，并且妥善保管好 AppID 和 ServerSecret，不要对外公开。
- 统计房间内用户平均在线时间，根据该时间设置 Token 的有效时间戳 effectiveTimeInSeconds 参数。Token 过期后，非法用户就无法使用该 Token 反复登录房间了。
- 注册 [onRoomTokenWillExpire](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Java_android~class~im-zego-zegoexpress-callback-i-zego-event-handler#on-room-token-will-expire) 回调，监听 Token 即将过期事件。当收到该回调时，客户端向服务端申请生成新的 Token，然后调用 [renewToken](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Java_android~class~im-zego-zegoexpress-zego-express-engine#renew-token) 将新生成的 Token 传给 SDK。

相关实现可参考 [使用 Token 鉴权](/real-time-video-android-java/communication/using-token-authentication)。
