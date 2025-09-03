
# 呼叫取消回调

- - -

## 描述

当出现以下情况（可分为两类）时，业务后台可以接收 ZIM 服务端的呼叫取消回调，用于确定呼叫状态：
- 主动取消：
    - 呼叫发起用户主动取消呼叫。
    - 在呼叫邀请成功创建后至其超时前，没有任何呼叫对象接受，发起用户主动登出。
    - 在呼叫邀请成功创建后至其超时前，没有任何呼叫对象接受，发起用户因心跳超时导致掉线。
- 超时取消：
    - 在呼叫邀请成功创建后至其超时时，没有任何呼叫对象响应，发起用户在线。

        <Note title="说明">

        如果在呼叫成功创建后至呼叫超时时，没有任何呼叫对象响应，发起用户掉线，则会触发 [呼叫超时回调](/zim-server/callbacks/call-invitation-timed-out)。
        </Note>


## 回调说明

- 请求方法：POST。
  <Note title="说明">
  回调数据格式为 JSON，您需要对其进行 UrlDecode 解码。
  </Note>
- 请求地址：请在 [ZEGO 控制台](https://console.zego.im/) 上配置回调地址，配置流程请参考控制台文档 [ZIM 相关回调配置](https://doc-zh.zego.im/article/17223)。
- 传输协议：HTTPS/HTTP，建议使用 HTTPS。

## 回调参数

| 参数 |	类型 | 说明 |
| -- | -- | -- |
| appid | String | APP 的唯一标识。 |
| event | String | 回调事件，此回调返回值为 `call_cancel`。 |
| nonce | String | 随机数。 |
| signature | String | 检验串，详情见 [检验说明](/zim-server/callbacks/authenticating-server-to-server-callbacks)。 |	
| timestamp | Int | 服务器当前时间，Unix 时间戳。 |
| call_id | String | 呼叫 ID。 |	
| user_ids | Array | 呼叫对象用户 ID 列表。<Note title="说明"><p>当呼叫取消时，若呼叫对象登出了，呼叫取消回调的 `user_ids` 仍会返回该呼叫对象。</p></Note> |
| reason | String | 取消的原因：<ul><li>主动取消（caller_cancel）</li><li>超时取消（timeout_cancel）</li></ul> |
| payload | String | 呼叫取消填充的扩展字段。 |	

<Note title="说明">

建议您将部分参数转换为 Int 进行逻辑处理，相关字段包括 `appid` 和 `nonce`。
</Note>



## 数据示例

```json
{
    "appid": "1",
    "event": "call_cancel",
    "nonce": "350176",
    "signature": "signature",
    "timestamp": 1499676978,
    "call_id": "3501761173612493269",
    "user_ids": ["abc","def"],
    "reason": "caller_cancel",
    "payload": "payload",
}
```

## 返回响应
返回 HTTP status code 为 2XX （例如 200）表示成功，其他响应都表示失败。

## 回调重试策略

如果 ZEGO 服务器没有收到响应，或收到的 HTTP status code 不为 2XX（例如 200），都会尝试重试，**最多进行 5 次重试**。每次重试请求与**上一次请求**的间隔时间分别为 2s、4s、8s、16s、32s。若第 5 次重试后仍然失败，将不再重试，该回调丢失。
