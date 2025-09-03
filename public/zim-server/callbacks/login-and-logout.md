
# 登录登出回调

- - -

## 描述

凭借本回调，您可以监听用户如下上下线行为，实现如统计在线用户等业务逻辑：
- 用户上线（TCP 连接建立）。
- 用户注销下线或者用户网络断开（TCP 连接断开）。
- App 心跳超时（App 进程被杀或者崩溃）。


## 回调说明

- 请求方法：POST。
  <Note title="说明">
  回调数据格式为 JSON，您需要对其进行 UrlDecode 解码。
  </Note>
- 请求地址：请在 [ZEGO 控制台](https://console.zego.im/) 上配置回调地址，配置流程请参考控制台文档 [ZIM 相关回调配置](https://doc-zh.zego.im/article/17223)。
- 传输协议：HTTPS/HTTP，建议使用 HTTPS。

## 回调参数

<table>
<tbody><tr>
<th>参数</th>
<th>类型</th>
<th>说明</th>
</tr>
<tr>
<td>appid</td>
<td>String</td>
<td>APP 的唯一标识。</td>
</tr>
<tr>
<td>event</td>
<td>String</td>
<td>回调事件，此回调返回值为 `user_action`。</td>
</tr>
<tr>
<td>timestamp</td>
<td>Integer</td>
<td>callback服务器当前时间 Uinx 时间戳，单位为秒。</td>
</tr>
<tr>
<td>nonce</td>
<td>String</td>
<td>随机数。</td>
</tr>
<tr>
<td>signature</td>
<td>String</td>
<td>检验串，详情见 [检验说明](/zim-server/callbacks/authenticating-server-to-server-callbacks) 。</td>
</tr>
<tr>
<td>user_id</td>
<td>String</td>
<td>用户 ID。</td>
</tr>
<tr>
<td>user_name</td>
<td>String</td>
<td>用户昵称。</td>
</tr>
<tr>
<td>os</td>
<td>String</td>
<td>操作系统说明，用户上线时同步。包含以下枚举：<ul><li>PC</li><li>IOS_PHONE</li><li>ANDROID</li><li>MAC</li><li>LINUX</li><li>WEB</li><li>MINIPROGRAM（小程序）</li><li>ANDROID_TV</li></ul></td>
</tr>
<tr>
<td>action</td>
<td>Integer</td>
<td>
状态：
<ul>
<li>0：online（登录），表示用户端 App 成功调用 `login` 接口连接到 ZIM 服务器。</li>
<li>1：logout（登出），表示用户端 App 成功调用 `logout` 接口推出登录。</li>
<li>2：offline（离线）。</li>
</ul>
</td>
</tr>
<tr>
<td>session_id</td>
<td>String</td>
<td>一个连接的唯一 ID。如果同一用户在多端同时在线，则会有多个连接，可使用此 ID 进行区分。</td>
</tr>
<tr>
<td>login_time</td>
<td>Integer</td>
<td>登录时间 Uinx时间戳， 单位为秒。</td>
</tr>
<tr>
<td>relogin</td>
<td>String</td>
<td>重新登录标识。 <ul><li>0：首次登录。 </li><li>1：重新登录。</li></ul></td>
</tr>
<tr>
<td>logout_time</td>
<td>Integer</td>
<td>登出时间 Uinx时间戳， 单位为秒。</td>
</tr>
<tr>
<td>logout_reason</td>
<td>String</td>
<td>登出原因</td>
</tr>
<tr>
<td>offline_time</td>
<td>Integer</td>
<td>离线时间 Uinx时间戳， 单位为秒。</td>
</tr>
</tbody></table>


<Note title="说明">

建议您将部分参数转换为 Int 进行逻辑处理，相关字段包括 `appid` 和 `nonce`。
</Note>


## 数据示例

- POST/JSON

```json
{
    "appid": "1",
    "event": "user_action",
    "timestamp": 1679553625,
    "nonce": "350176",
    "signature": "signature",
    "user_id": "123456",
    "user_name": "user_name",
    "os": "PC ",
    "action": 1,
    "session_id": "930821637828251648",
    "login_time": 1679553625,
    "relogin": "1",
    "logout_time": 1679553625,
    "logout_reason": "logout_reason"
}
```

## 返回响应

返回 HTTP status code 为 2XX （例如 200）表示成功，其他响应都表示失败。

## 回调重试策略

如果 ZEGO 服务器没有收到响应，或收到的 HTTP status code 不为 2XX（例如 200），都会尝试重试，**最多进行 5 次重试**。每次重试请求与**上一次请求**的间隔时间分别为 2s、4s、8s、16s、32s。若第 5 次重试后仍然失败，将不再重试，该回调丢失。
