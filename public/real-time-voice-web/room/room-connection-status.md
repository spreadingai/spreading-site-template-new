# 房间连接状态说明

- - -

用户在使用 ZEGO Express SDK 进行音视频通话或直播时，需要先加入房间才能收到来自同一房间内的其他用户的流新增/删除、用户进出等回调通知，所以用户在房间内的连接状态决定了用户是否能正常使用音视频业务。

本文主要介绍如何判断用户在房间内的连接状态，以及各个连接状态的转化过程。

## 监听房间连接状态

用户可通过监听 [roomStateChanged](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~interface~ZegoRTMEvent#room-state-changed) 回调实时监控自己在本房间内的连接状态。当用户连接状态发生改变时，SDK 会触发该回调，并在回调中给出房间连接状态发生改变的原因（即房间连接状态）和相关错误码。

如果因为网络质量不佳导致房间连接中断，SDK 内部会自动进行重试，详情请参考 [房间断线重连](https://doc-zh.zego.im/article/18663#2) 章节。


#### 房间状态说明

用户可通过 [roomStateChanged](https://doc-zh.zego.im/) 回调，实时监听自己在房间内的连接状态变化。当用户房间连接状态发生改变时，SDK 会触发该回调，并在回调中给出房间连接状态发生改变的原因（即房间连接状态）和相关错误码。

因网络质量不佳而导致的房间连接中断，SDK 内部会自动进行重试，详情请参考 [房间断线重连](https://doc-zh.zego.im/article/18663#2) 章节。

#### 房间状态说明

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Express/Android/express_roomstate_change_android.png" /></Frame>

房间连接状态会因多种情况互相转化，开发者可通过房间连接状态发生改变的原因 [ZegoRoomStateChangedReason](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~enum~ZegoRoomStateChangedReason) （即房间连接状态）结合 errorCode 做相应的业务逻辑处理。

<table>

<tbody><tr>
<th>状态及 Reason 枚举值</th>
<th>含义</th>
<th>触发进入该状态的常见事件</th>
</tr>
<tr>
<td>Logining（Logining）</td>
<td>正在登录房间。当调用 [loginRoom] 登录房间或 [switchRoom] 切换到目标房间时，进入该状态，表示正在请求连接服务器。通常通过该状态进行应用界面的展示。</td>
<td><ul><li>调用 [loginRoom] 登录房间，此时会先进入该状态，此时 errorCode 为 0。</li><li>调用 [switchRoom] 切换到目标房间时，SDK 内部请求登录目标房间，此时 errorCode 为 0。</li></ul></td>
</tr>
<tr>
<td>Logined（Logined）</td>
<td>登录房间成功。当登录房间或切换房间成功后，进入该状态，表示登录房间已经成功，用户可以正常收到房间内的其他用户和所有流信息增删的回调通知。</td>
<td><ul><li>调用 [loginRoom] 登录房间成功，此时 errorCode 为 0。</li><li>调用 [switchRoom] 切换到目标房间时，SDK 内部登录目标房间成功，此时 errorCode 为 0。</li></ul></td>
</tr>
<tr>
<td>LoginFailed（LoginFailed）</td>
<td>登录房间失败。当登录房间或切换房间失败后，进入该状态，表示登录房间或切换房间已经失败，例如 AppID 或 Token 不正确等。</td>
<td><ul><li>当使用 Token 鉴权功能时，传入的 Token 错误，此时 errorCode 为 1002033。</li><li>当因为网络问题导致登录房间超时，此时 errorCode 为 1002053。</li><li>当切换到目标房间时，SDK 内部登录目标房间失败，此时 errorCode 请参考以上登录错误说明。</li></ul></td>
</tr>
<tr>
<td>Reconnecting（Reconnecting）</td>
<td>房间连接临时中断。如果因为网络质量不佳产生的中断，SDK 会进行内部重试。</td>
<td>当因为网络质量不佳导致房间连接临时中断并进行重连，此时 errorCode 为 1000017。</td>
</tr>
<tr>
<td>Reconnected（Reconnected）</td>
<td>房间重新连接成功。如果因为网络质量不佳产生的中断，SDK 会进行内部重试，重连成功后进入该状态。</td>
<td>当因为网络质量不佳导致房间连接临时中断后重连成功，此时 errorCode 为 0。</td>
</tr>
<tr>
<td>ReconnectFailed（ReconnectFailed）</td>
<td>房间重新连接失败。如果因为网络质量不佳产生的中断，SDK 会进行内部重试，重连失败后进入该状态。</td>
<td>当因为网络质量不佳导致房间连接临时中断后重连失败，此时 errorCode 为 1002053。</td>
</tr>
<tr>
<td>KickOut（Kickout）</td>
<td>被服务器踢出房间。例如有相同用户名在其他地方登录房间导致本端被踢出房间，会进入该状态。</td>
<td><ul><li>用户被踢出房间（由于 userID 相同的用户在其他地方登录），此时 errorCode 为 1002050。</li><li>用户被踢出房间（开发者主动调用后台的 <a target="_blank" href="/real-time-video-server/api-reference/room/kick-out-user">踢出房间用户</a> 接口），此时 errorCode 为 1002055。</li></ul></td>
</tr>
<tr>
<td>Logout（Logout）</td>
<td>登出房间成功。没有登录房间前默认为该状态，当调用 [logoutRoom] 登出房间成功或 [switchRoom] 内部登出当前房间成功后，进入该状态。</td>
<td><ul><li>当调用 [logoutRoom] 登出房间成功后，此时 errorCode 为 0。</li><li>当调用 [switchRoom] 切换房间时，SDK 内部登出当前房间成功。</li></ul></td>
</tr>
<tr>
<td>LogoutFailed（LogoutFailed）</td>
<td>登出房间失败。当调用 [logoutRoom] 登出房间失败或 [switchRoom] 内部登出当前房间失败后，进入该状态。</td>
<td>在多房间场景下，当调用 [logoutRoom] 登出某个房间时，房间 ID 不存在。<br />登出房间失败后，在心跳超时前其他用户都能看到该用户。</td>
</tr>
</tbody></table>


开发者可参考以下代码处理常见业务事件：

```javascript
// 项目唯一标识 AppID，Number 类型，请从 ZEGO 控制台获取
let appID = ;
// 接入服务器地址 Server，String 类型，请从 ZEGO 控制台获取
let server = "";

// 初始化实例
const zg = new ZegoExpressEngine(appID, server);

// 房间状态更新回调
zg.on('roomStateChanged', (roomID, reason, errorCode, extendData) => {
    if (reason == ZegoRoomStateChangedReason.Logining) {
        // 登录中
        // 当调用 loginRoom 登录房间或 switchRoom 切换到目标房间时，进入该状态，表示正在请求连接服务器。
    } else if (reason == ZegoRoomStateChangedReason.Logined) {
        // 登录成功
        // 当前是开发者主动调用 loginRoom 登录成功，或调用 switchRoom 切换房间成功触发的回调。这里可以处理首次登录房间成功的业务逻辑，比如拉取聊天室、直播间基础信息。
        //只有当房间状态是登录成功或重连成功时，推流（startPublishingStream）、拉流（startPlayingStream）才能正常收发音视频
        //将自己的音视频流推送到 ZEGO 音视频云
    } else if (reason == ZegoRoomStateChangedReason.LoginFailed) {
        // 登录失败
    } else if (reason == ZegoRoomStateChangedReason.Reconnecting) {
        // 重连中
    } else if (reason == ZegoRoomStateChangedReason.Reconnected) {
        // 重连成功
    } else if (reason == ZegoRoomStateChangedReason.ReconnectFailed) {
        // 重连失败
    } else if (reason == ZegoRoomStateChangedReason.Kickout) {
        // 被踢出房间
    } else if (reason == ZegoRoomStateChangedReason.Logout) {
        // 登出成功
        // 开发者主动调用 logoutRoom 登出房间或调用 switchRoom 切换房间，SDK 内部登出当前房间成功
    } else if (reason == ZegoRoomStateChangedReason.LogoutFailed) {
        // 登出失败
    }
});
```


## 房间断线重连

用户登录房间后，因网络信号问题/网络类型切换问题导致与房间断连，SDK 内部会自动重连。用户与房间断连后重连有三种情况：

- 在 ZEGO 服务端判断用户 A 心跳超时前重连成功
- 在 ZEGO 服务端判断用户 A 心跳超时后重连成功
- 用户 A 重连失败

<Note title="说明">

- 心跳超时时间为 90s。
- 重试超时时间为 5min。

</Note>




下图以用户 A 和用户 B 已登录同一个房间的情况下，用户 A 与房间断连后重连的情况为例：

#### 情况一：在 ZEGO 服务端判断用户 A 心跳超时前重连成功

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/FAQ/reconnect_web_1.png" /></Frame>

如果用户 A 短暂断线，但是在 90s 内重连成功了，那么用户 B 不会收到 [roomUserUpdate](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~interface~ZegoRTMEvent#room-user-update) 的回调通知。

- T0 = 0s：用户 A 的 SDK 收到客户端发起的 [loginRoom](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#login-room) 请求。
- T1 ≈ T0 + 120 ms：通常在调用 [loginRoom](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#login-room) 120 ms 后，客户端可以加入房间。加入房间过程中，用户 A 的客户端会收到 2 次 [roomStateChanged](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~interface~ZegoRTMEvent#room-state-changed) 回调，分别通知客户端正在连接房间（Logining）以及连接房间成功（Logined）。
- T2 ≈ T1 + 100 ms：因网络传输延迟，用户 B 约在 100 ms 后收到 [roomUserUpdate](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~interface~ZegoRTMEvent#room-user-update) 回调以通知客户端用户 A 加入房间。
- T3：某个时间点，用户 A 因网络断开等原因导致上行网络变差。SDK 会尝试重新加入房间，同时客户端会收到 [roomStateChanged](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~interface~ZegoRTMEvent#room-state-changed) 回调以通知客户端用户 A 正在断线重连。
- T5 = T3 + time（小于 90s）：用户 A 在重连时间内恢复网络，重连成功。会收到 [roomStateChanged](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~interface~ZegoRTMEvent#room-state-changed) 回调以通知客户端用户 A 重连成功。


#### 情况二：在 ZEGO 服务端判断用户 A 心跳超时后重连成功

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/FAQ/reconnect_web_2.png" /></Frame>

- T0、T1、T2、T3 时刻的情况同 [情况一：在 ZEGO 服务端判断用户 A 心跳超时前重连成功](https://doc-zh.zego.im/article/18663#2) 中的 T0、T1、T2、T3。
- T4' ≈ T3 + 90s：用户 B 此时收到 [roomUserUpdate](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~interface~ZegoRTMEvent#room-user-update) 回调以通知 用户 A 已断线。
- T5' = T3 + time（大于 90s，小于 5 min）：用户 A 在重连时间内恢复网络，重连成功。此时客户端会收到 [roomStateChanged](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~interface~ZegoRTMEvent#room-state-changed) 回调以通知客户端用户 A 重连成功。
- T6' ≈ T5'  + 100 ms：因网络传输延迟，用户 B 约在 100 ms 后收到 [roomUserUpdate](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~interface~ZegoRTMEvent#room-user-update) 回调以通知客户端用户 A 重连成功。

#### 情况三：用户 A 重连失败

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/FAQ/reconnect_web_3.png" /></Frame>


- T0、T1、T2、T3 时刻的情况同 [情况一：在 ZEGO 服务端判断用户 A 心跳超时前重连成功](https://doc-zh.zego.im/article/18663#2) 中的 T0、T1、T2、T3。
- T4'' ≈ T3 + 90s：用户 B 此时收到 [roomUserUpdate](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~interface~ZegoRTMEvent#room-user-update) 回调以通知 用户 A 已断线。
- T5'' = T3 + 5 min：如果用户 A 连续 5 min 无法重新加入房间，SDK 不再继续尝试重新连接。用户 A 将会收到 [roomStateChanged](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~interface~ZegoRTMEvent#room-state-changed) 回调以通知客户端断开连接。


## 相关文档

[Web 平台上，Express SDK 是否支持断线重连机制？](https://doc-zh.zego.im/faq/reconnect_web?product=all&platform=web)

<Content />

