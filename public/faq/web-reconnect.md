<Title>Web 平台上，Express SDK 是否支持断线重连机制？</Title>



- - -

ZEGO Web SDK 支持断线重连机制。断线重连，是为保证用户在因一些异常原因，导致房间或推拉流断开后，能够自行恢复的机制。本文将介绍房间重连、推流重连、拉流重连三种情况下的 SDK 的逻辑处理，以及应对常见异常断开的处理方法。


## 重连逻辑说明

### 房间重连

用户登录房间后，如果因网络信号问题或网络类型切换问题，导致的与房间断开连接，SDK 内部会进行自动重连。

用户可通过监听 [roomStateChanged](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoRTMEvent#room-state-changed) 回调，实时监控自己在本房间内的连接状态。在登录房间时将参数 `config` 中的 `userUpdate` 设置为 “true” 的前提下，房间内的其他用户可通过 [roomUserUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoRTMEvent#room-user-update) 回调获取到某用户连接状态变化的通知。

**房间状态回调**

<table>
  
<tbody><tr>
<th>状态</th>
<th>含义</th>
</tr>
<tr>
<td>ZegoRoomStateChangedReason.Logining</td>
<td>正在登录房间。当调用 [loginRoom] 登录房间时，进入该状态，表示正在请求连接服务器。通常通过该状态进行应用界面的展示。</td>
</tr>
<tr>
<td>ZegoRoomStateChangedReason.Logined</td>
<td>登录房间成功。当登录房间或切换房间成功后，进入该状态，表示登录房间已经成功，用户可以正常收到房间内的其他用户和所有流信息增删的回调通知。</td>
</tr>
<tr>
<td>ZegoRoomStateChangedReason.LoginFailed</td>
<td>登录房间失败。当登录房间或切换房间失败后，进入该状态，表示登录房间或切换房间已经失败，例如 AppID 或 Token 不正确等。</td>
</tr>
<tr>
<td>ZegoRoomStateChangedReason.Reconnecting</td>
<td>房间连接临时中断。如果因为网络质量不佳产生的中断，SDK 会进行内部重试。</td>
</tr>
<tr>
<td>ZegoRoomStateChangedReason.Reconnected</td>
<td>房间重新连接成功。如果因为网络质量不佳产生的中断，SDK 会进行内部重试，重连成功后进入该状态。</td>
</tr>
<tr>
<td>ZegoRoomStateChangedReason.ReconnectFailed</td>
<td>房间重新连接失败。如果因为网络质量不佳产生的中断，SDK 会进行内部重试，重连失败后进入该状态。</td>
</tr>
<tr>
<td>ZegoRoomStateChangedReason.Kickout</td>
<td>被服务器踢出房间。例如有相同用户名在其他地方登录房间导致本端被踢出房间，会进入该状态。</td>
</tr>
<tr>
<td>ZegoRoomStateChangedReason.Logout</td>
<td>登出房间成功。没有登录房间前默认为该状态，当调用 [logoutRoom] 登出房间成功后，进入该状态。</td>
</tr>
<tr>
<td>ZegoRoomStateChangedReason.LogoutFailed</td>
<td>登出房间失败。当调用 [logoutRoom] 登出房间失败后，进入该状态。</td>
</tr>
</tbody></table>

**房间状态示意图**

房间断连后重连的情况有如下三种：

**情况一：在服务端判断用户 A 心跳超时前重连成功**

<Frame width="auto" height="auto" caption="image description text">
  <img src="https://storage.zego.im/sdk-doc/Pics/FAQ/reconnect_web_1.png" />
</Frame>

如果用户 A 短暂断线，但是在 90s 内重连成功了，那么用户 B 不会收到 [roomUserUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoRTMEvent#room-user-update) 的回调通知。

- T0 = 0s：用户 A 的 SDK 收到客户端发起的 [loginRoom](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#login-room) 请求。
- T1 ≈ T0 + 120 ms：通常在调用 [loginRoom](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#login-room) 120 ms 后，客户端可以加入房间。加入房间过程中，用户 A 的客户端会收到 2 次 [roomStateChanged](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoRTMEvent#room-state-changed) 回调，分别通知客户端正在连接房间（logining）以及连接房间成功（logined）。
- T2 ≈ T1 + 100 ms：因网络传输延迟，用户 B 约在 100 ms 后收到 [roomUserUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoRTMEvent#room-user-update) 回调以通知客户端用户 A 加入房间。
- T3：某个时间点，用户 A 因网络断开等原因导致上行网络变差。SDK 会尝试重新加入房间，同时客户端会收到 [roomStateChanged](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoRTMEvent#room-state-changed) 回调以通知客户端用户 A 正在断线重连。
- T5 = T3 + time（小于 90s）：用户 A 在重连时间内恢复网络，重连成功。会收到 [roomStateChanged](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoRTMEvent#room-state-changed) 回调以通知客户端用户 A 重连成功。


**情况二：在服务端判断用户 A 心跳超时后重连成功：**

<Frame width="auto" height="auto" caption="image description text">
  <img src="https://storage.zego.im/sdk-doc/Pics/FAQ/reconnect_web_2.png" />
</Frame>

- T0、T1、T2、T3 时刻的情况同“情况一：在服务端判断用户 A 心跳超时前重连成功”中的 T0、T1、T2、T3。
- T4' ≈ T3 + 90s：用户 B 此时收到 [roomUserUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoRTMEvent#room-user-update) 回调以通知 用户 A 已断线。
- T5' = T3 + time（大于 90s，小于 5 min）：用户 A 在重连时间内恢复网络，重连成功。此时客户端会收到 [roomStateChanged](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoRTMEvent#room-state-changed) 回调以通知客户端用户 A 重连成功。
- T6' ≈ T5'  + 100 ms：因网络传输延迟，用户 B 约在 100 ms 后收到 [roomUserUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoRTMEvent#room-user-update) 回调以通知客户端用户 A 重连成功。

**情况三：用户 A 重连失败：**

<Frame width="auto" height="auto" caption="image description text">
  <img src="https://storage.zego.im/sdk-doc/Pics/FAQ/reconnect_web_3.png" />
</Frame>


- T0、T1、T2、T3 时刻的情况同“情况一：在服务端判断用户 A 心跳超时前重连成功”中的 T0、T1、T2、T3。
- T4'' ≈ T3 + 90s：用户 B 此时收到 [roomUserUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoRTMEvent#room-user-update) 回调以通知 用户 A 已断线。
- T5'' = T3 + 5 min：如果用户 A 连续 5 min 无法重新加入房间，SDK 不再继续尝试重新连接。用户 A 将会收到 [roomStateChanged](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoRTMEvent#room-state-changed) 回调以通知客户端断开连接。

### 推流重连

在用户推流过程中，如果因网络信号问题或网络类型切换问题，导致的推流不成功，SDK 内部会进行自动重连。

若所有推流节点都尝试了仍不成功，用户将会收到 [publisherStateUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoRTCEvent#publisher-state-update) 回调。“state” 为 `NO_PUBLISH`，且 “errorCode” 不为 “0”，表示 SDK 内部重连已失败，具体错误请根据 “errorCode” 的值进行判断，可参考 [常见错误码](/real-time-video-web/client-sdk/error-code)。此时，业务侧可以考虑等待几秒后（比如 3 ～ 5 秒）开始重新推流，但是不要不断地进行重试，导致陷入死循环。

**推流状态回调**

<table>
  
  <tbody><tr>
    <th>状态</th>
    <th>含义</th>
  </tr>
  <tr>
    <td>NO_PUBLISH</td>
    <td>未推流状态，在推流前处于该状态。如果推流过程中出现稳态的异常，比如 AppID 不正确，或者其他用户已经在推送相同流 ID 的流（推流会失败），都会进入未推流状态。</td>
  </tr>
  <tr>
    <td>PUBLISH_REQUESTING</td>
    <td>正在请求推流状态，推流动作执行成功后，会进入正在请求推流状态。通常情况下，可通过该状态进行 UI 界面的展示。如果是因为网络质量不佳产生的中断，SDK 内部会进行重试，也会进入正在请求推流状态。</td>
  </tr>
  <tr>
    <td>PUBLISHING</td>
    <td>正在推流状态，成功推流后进入该状态。此时，用户可以正常进行通信。</td>
  </tr>
</tbody></table>



### 拉流重连

在用户拉流过程中，如果因网络信号问题/网络类型切换问题，导致的拉流不成功，SDK 内部会进行自动重连。

若所有拉流节点都尝试了仍不成功，用户将会收到 [playerStateUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoRTCEvent#player-state-update) 回调，“state” 为 `NO_PLAY`，且 “errorCode” 不为 “0”，表示 SDK 内部重连已失败，具体错误请根据 “errCode” 的值进行判断，可参考 [常见错误码](/real-time-video-web/client-sdk/error-code)。此时，业务侧可以考虑等待几秒后(比如 3 ～ 5 秒)开始重新拉流，但是不要不断地进行重试，导致陷入死循环。

**拉流状态回调**

<table>
  
  <tbody><tr>
    <th>状态</th>
    <th>含义</th>
  </tr>
  <tr>
    <td>NO_PLAY</td>
    <td>未拉流状态，在拉流前处于该状态。如果拉流过程中出现稳态的异常，比如 AppID 不正确，都会进入未拉流状态。</td>
  </tr>
  <tr>
    <td>PLAY_REQUESTING</td>
    <td>正在请求拉流状态，拉流动作执行成功后，会进入正在请求拉流状态。通常情况下，可通过该状态进行 UI 界面的展示。如果是因为网络质量不佳产生的中断，SDK 内部会进行重试，也会进入正在请求拉流状态。</td>
  </tr>
  <tr>
    <td>PLAYING</td>
    <td>正在拉流状态，成功拉流后进入该状态。此时，用户可以正常进行通信。</td>
  </tr>
</tbody></table>

### 重连时间设置

<Warning title="注意">
此功能在 3.7.0 或更高的版本中支持。如要开启此功能，请在登录房间前设置重连时间。

</Warning>




因网络原因断开连接时，SDK 重连的默认时间是 5 分钟，超出该时间 SDK 将不再继续尝试重连。

  - 可通过 [setEngineConfig](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#set-engine-config) 配置 `"room_retry_time=xxxx"`，设置房间重连时间（单位为：秒）。
  - 可通过 [setEngineConfig](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#set-engine-config) 配置 `"av_retry_time=xxxx"` ，设置推流、拉流重连时间（单位为：秒）。


## 处理异常断开

<Note title="说明">

房间内用户断开连接时，默认情况下，房间内的其他用户会在 90 秒后收到该用户断线的回调通知。如需修改该默认值，请联系 ZEGO 技术支持。

</Note>




### 主播端断网时的处理

SDK 会自动检测主播的网络情况，当检测到主播断网时，会自动暂停推流。如果网络在 300 秒内恢复正常，SDK 会自动重新推流。

断网 90 秒后，如果网络没有恢复，房间内的所有用户会收到 [roomStreamUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoRTCEvent#room-stream-update) 回调中的“流删除”通知，观众可在收到此回调时，调用 [stopPlayingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#stop-playing-stream) 接口停止拉流。如果 SDK 重试推流成功，房间内的所有用户会收到 [roomStreamUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoRTCEvent#room-stream-update) 回调中的“流新增”通知，观众可在收到此回调时，调用 [startPlayingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#start-playing-stream) 重新开始拉流。


### 主播端网络异常时观众端如何处理

主播端断网时，观众端是无法监控到的。此时，观众端无法正常拉流，SDK 内部会自动重试拉流，如果重试后仍然拉不到流，观众端将会收到 [playerStateUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoRTCEvent#player-state-update) 回调，回调中的 “errorCode” 不为 “0”，建议观众端间隔一段时间（比如 3 秒后）后再次进行拉流。

在 SDK 内部会自动重试拉流的过程中，针对主播端的情况，可做以下处理：

- 如果主播端网络恢复正常，重试拉流成功，观众端即可正常进行拉流。
- 如果主播端网络一直没有恢复，主播端断网的 90 秒后，观众端会收到 [roomStreamUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoRTCEvent#room-stream-update) 回调中的“流删除”通知，观众端可在收到此回调时，调用 [stopPlayingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#stop-playing-stream) 接口停止拉流。
- 如果后续主播端恢复正常且成功重新推流后，观众端可在收到 [roomStreamUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoRTCEvent#room-stream-update) 回调中的“流新增”通知时，调用 [startPlayingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#start-playing-stream) 重新开始拉流。

<Warning title="注意">


为避免陷入拉流的死循环中，观众端在收到流删除通知要及时停止拉流。

</Warning>





### 主播端浏览器进程被杀或者页面崩溃时观众端如何处理

主播端浏览器进程被杀或者页面崩溃的情况下，主播端在 90 秒时仍未开播，观众端会收到 [roomStreamUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoRTCEvent#room-stream-update) 回调中的“流删除”通知，针对 90 秒之内和 90 秒后主播开播情况，可做以下处理。

- 90 秒内，如果主播再次开播，房间内的观众会先收到 [roomStreamUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoRTCEvent#room-stream-update) 回调中的“流删除”通知，此时需调用 [stopPlayingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#stop-playing-stream) 接口停止拉流，之后会收到 [roomStreamUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoRTCEvent#room-stream-update) 回调中的“流新增”通知，此时需调用 [startPlayingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#start-playing-stream) 接口重新拉流。
- 90 秒后，如果主播仍然没有推流，房间内的观众会收到 [roomStreamUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoRTCEvent#room-stream-update) 回调中的“流删除”通知，此时调用 [stopPlayingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#stop-playing-stream) 停止拉流即可。

如果后续主播端恢复正常且成功重新推流后，观众端可在收到 [roomStreamUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoRTCEvent#room-stream-update) 回调中的“流新增”通知时，调用 [startPlayingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#start-playing-stream) 重新开始拉流。
