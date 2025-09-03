# 退出房间回调

- - -

## 描述

当开发者需要了解目前房间内的人数时，可以通过回调用户退出房间的情况，并结合 [登录房间回调](https://doc-zh.zego.im/article/19670) 进行分析。

## 回调说明

- 请求方法：POST。

<Note title="说明">


    回调数据格式为 JSON，您需要对其进行 UrlDecode 解码。
    
</Note>




- 请求地址：请在 [ZEGO 控制台](https://console.zego.im/) 上配置回调地址。
- 传输协议：HTTPS/HTTP，建议使用 HTTPS。



## 回调参数

<table>
  
<tbody><tr>
<th>公共参数</th>
<th>类型</th>
<th>描述</th>
</tr>
<tr>
<td>event</td>
<td>String</td>
<td>回调事件，此回调返回值为 <code>room_logout</code>。</td>
</tr>
<tr>
<td>appid</td>
<td>String</td>
<td>App 的唯一标识。</td>
</tr>
<tr>
<td>timestamp</td>
<td>String</td>
<td>服务器当前时间，Unix 时间戳，单位：秒。</td>
</tr>
<tr>
<td>nonce</td>
<td>String</td>
<td>随机数。</td>
</tr>
<tr>
<td>signature</td>
<td>String</td>
<td>检验串，详情见 [检验说明](https://doc-zh.zego.im/article/19700)。</td>
</tr>
<tr>
<th>业务参数</th>
<th>类型</th>
<th>描述</th>
</tr>
<tr>
<td>room_id</td>
<td>String</td>
<td>房间 ID。</td>
</tr>
<tr>
<td>room_seq</td>
<td>String</td>
<td><p>房间生命周期唯一标识，在该房间的整个生命周期中保持不变。<br />房间创建后，会生成唯一的 room_seq；如果房间被销毁后，再用相同的 room_id 创建一个新的房间，会生成新的唯一的 room_seq。</p><p>该参数与 <a href="https://doc-zh.zego.im/article/19664">房间创建回调</a>、<a href="https://doc-zh.zego.im/article/19666">房间关闭回调</a> 中的参数 room_session_id 一致。</p></td>
</tr>
<tr>
<td>user_account</td>
<td>String</td>
<td>登录房间的用户账号 ID。</td>
</tr>
<tr>
<td>user_nickname</td>
<td>String</td>
<td>登录房间的用户昵称。</td>
</tr>
<tr>
<td>session_id</td>
<td>String</td>
<td>登录房间的用户会话 ID。</td>
</tr>
<tr>
<td>login_time</td>
<td>String</td>
<td>用户登录房间时的服务器当前时间，Unix 时间戳，单位：毫秒。</td>
</tr>
<tr>
<td>logout_time</td>
<td>String</td>
<td>用户退出房间时的服务器当前时间，Unix 时间戳，单位：毫秒。</td>
</tr>
<tr>
<td>reason</td>
<td>String</td>
<td><p>用户退出房间的原因。</p><ul><li>0：正常退出。</li><li>1：业务层心跳超时。</li><li>2：接入层连接断开或心跳超时。</li><li>3：调用后台接口被踢出。</li><li>4：token 过期退出。</li></ul></td>
</tr>
<tr>
<td>user_role</td>
<td>String</td>
<td><p>登录房间的用户角色。</p><ul><li>1：主播。</li><li>2：观众。</li><li>4：管理员，该类型用户主要存在于云录制、音视频流审核等场景中，客户端 SDK 的用户相关接口会过滤该类型用户。</li></ul><p>该返回参数，仅在接入 LiveRoom 服务时有实际意义，接入 Express 服务时请忽略此参数。</p></td>
</tr>
<tr>
<td>user_update_seq</td>
<td>String</td>
<td>房间用户列表变更 seq，用户登录或者退出都会递增 1。</td>
</tr>
</tbody></table>

<Note title="说明">



建议您将部分参数转换为 Int 进行逻辑处理，相关字段包括 `appid`、`login_time`、`logout_time `、`reason`、`room_seq`、`session_id`、`timestamp`、`user_role` 和 `user_update_seq`。

</Note>





## 数据示例

```json
{
    "event": "room_logout",
    "appid": "1",
    "timestamp": "1499676978",
    "nonce": "350176",
    "signature": "signature",
    "room_id": "rid_1242649",
    "room_seq": "6085791336856668982",
    "user_account": "888120154",
    "user_nickname": "888120154",
    "session_id": "792462300429684736",
    "login_time": "1663740623660",
    "logout_time": "1663740627986",
    "reason": "0",
    "user_role": "1",
    "user_update_seq": "13"
}
```

## 返回响应


返回 HTTP status code 为 2XX （例如 200）表示成功，其他响应都表示失败。


## 回调重试策略


如果 ZEGO 服务器没有收到响应，或收到的 HTTP status code 不为 2XX（例如 200），都会尝试重试，**最多进行 5 次重试**。每次重试请求与**上一次请求**的间隔时间分别为 2s、4s、8s、16s、32s。若第 5 次重试后仍然失败，将不再重试，该回调丢失。
