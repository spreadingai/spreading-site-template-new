<Title>ZIM SDK 是否支持断线重连机制？</Title>



---

ZIM SDK 支持断线重连机制。本文将介绍 ZIM SDK 在什么情况下会出现断线的情况，以及如何处理这些异常。

<Warning title="注意">

建议开发者在真机上进行相关调试。

</Warning>



## 异常断开场景

### 场景 1：网络异常

如果用户的机器出现弱网或断网的情况，SDK 内部会主动触发重连，此时会通过 `onConnectionStateChanged` 回调出 `RECONNECTING` 的 `state` 及 `LOGIN_INTERRUPTED` 的`event`，开发者监听到断网状态事件时需要给用户一些明确的 UI 提醒以提升用户体验。

<Warning title="注意">


从 2.9.0 版本开始，SDK 会以合适的频率内部不断重连，因此开发者无需在业务层调用 SDK 的 login 接口进行重连。

</Warning>



- 如果 SDK 能重新连接，则会通过 `onConnectionStateChanged` 回调出 `CONNECTED` 的`state` 及`SUCCESS` 的 `event`。
- 如果因特殊事件导致 SDK 无法重新连接，则会通过 `onConnectionStateChanged` 回调出 `DISCONNECTED` 的 `state` 及相应的`event` 。并且此时调用其他接口都会报错，且错误码为 6000121，表示“未登录”。 遇到此情况请开发者根据 `event` 给用户明确的提醒并做相应的异常兜底逻辑（如 App 将退出到登录页面等），不要直接在应用层代码里进行重连。

#### 处理方式

正常因网络原因导致断连的情况下，开发者无需进行任何处理；若因特殊事件导致 SDK 不再进行重试的话，请开发者做好异常的兜底逻辑，不要在应用层代码进行重试。

### 场景 2：帐号被踢出

在未开启 ZIM 的多端登录情况下，如果有其他端登录了本端已登录的帐号（userID），则会把本端挤下线，本端会出现断线的情况，并且 SDK 不会主动触发重连。

此时将通过 `onConnectionStateChanged` 回调出 `DISCONNECTED` 的 `state` 及 `KICKED_OUT` 的 `event`，并且调用其他接口都会报错，且错误码为 6000121，表示“未登录”。 遇到此情况请开发者给用户明确的提醒并做相应的异常兜底逻辑（如 App 将退出到登录页面等），不要直接在应用层代码里进行重连。

#### 处理方式

请开发者给用户明确的提醒并做相应的异常兜底逻辑（如 App 将退出到登录页面等），不要直接在应用层代码里进行重连。

### 场景 3：Token 过期

如果 AppID  配置了 Token 鉴权，则在 Token 快过期时，会通过 `onTokenWillExprie` 进行回调。
- 当用户获取了新的 Token 后，通过 `renewToken` 接口向 SDK 传入新的 Token ，以保证 Token 正常使用。
- 如果没有及时传入新的 Token，则 SDK 会在 Token 过期时，断开与服务器的链接，并通过`onConnectionStateChanged` 回调出`DISCONNECTED` 的 `state` ，并且调用其他接口都会报错，且错误码为 6000121，表示“未登录”。 遇到此情况请开发者给用户明确的提醒并做相应的异常兜底逻辑（如 App 将退出到登录页面等），不要直接在应用层代码里进行重连。

#### 处理方式

请开发者给用户明确的提醒并做相应的异常兜底逻辑（如 App 将退出到登录页面等），不要直接在应用层代码里进行重连。

### 场景 4：ZIM 房间断网
房间已连接状态中，网络若异常断网，SDK 内部会自动尝试重连，则房间会经过 T0、T1、T2 三个时期，尝试恢复房间连接。

<Frame width="512" height="auto" caption=""><Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Question/home_connection_new.jpeg" /></Frame></Frame>

<Note title="说明">


在网络恢复瞬间，SDK 会询问 ZIM 后台，本段用户是否还在房间内。SDK 会根据 ZIM 后台返回结果做相应的事件通知。

</Note>



房间恢复连接的具体处理过程如下：

<table>
  
<tbody><tr>
<th>时刻</th>
<th>onConnectionStateChanged<br />（网络状态回调</th>
<th>onRoomStateChanged<br />（房间状态回调）</th>
<th>处理建议</th>
</tr>
<tr>
<td>T0</td>
<td>`state` == 3（网络重连中）</td>
<td>`state` == 1（房间进入尝试连接）
<br /> `event` == 1（房间网络中断）<br /></td>
<td>等待 SDK 自动重连网络，用户无需做任何操作。</td>
</tr>
<tr>
<td>T1</td>
<td>`state` == 2（网络恢复）</td>
<td>`state` == 1（开始真正尝试恢复房间连接）&nbsp;&nbsp;&nbsp;
<br /> `event` == 1（房间网络中断<br /></td>
<td>等待 SDK 自动重连网络，用户无需做任何操作。</td>
</tr>
<tr>
<td rowspan="3">T2</td>
<td rowspan="3">`state` == 2（网络恢复）</td>
<td>`state` == 2（房间已连接）&nbsp; &nbsp; &nbsp;
<br />`event` == 0（房间网络恢复）<br /></td>
<td>当房间状态正常恢复时，用户无需做任何操作，可正常使用房间功能。</td>
</tr>
<tr>
<td>`state` == 0（房间已断开）&nbsp; &nbsp;
<br />`event` == 9（因心跳超时而与房间断开连接）<br /></td>
<td>当房间因心跳超时而断开连接时，用户若需要重新进入房间，则可调用 `joinRoom` 或 <br />`enterRoom` 接口以重新加入房间，或在页面提示用户已退出房间聊天页面。</td>
</tr>
<tr>
<td>`state` == 0（房间已断开）
<br />`event` == 3（房间不存在）<br /></td>
<td>当房间因不存在而断开连接时，用户若需要重新创建房间，则可调用
`createRoom` 或 `enterRoom` 接口以重新创建房间，或在页面提示用户已退出房间聊天页面。</td>
</tr>
</tbody></table>