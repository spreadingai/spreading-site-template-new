
# 呼叫超时回调

- - -

##  描述

在呼叫创建成功后，如果出现以下情况时，业务后台可以接收 ZIM 服务端的呼叫超时回调，用于确定呼叫超时用户：
- 在后台配置的超时时间内，呼叫发起用户在线，**部分呼叫对象**一直未响应。
- 在创建呼叫时设置的超时时间内，呼叫发起用户在线，**部分呼叫对象**一直未响应。
- 在呼叫超时时，呼叫发起用户掉线，**全体呼叫对象**都未响应。

<Note title="说明">

如果**全体呼叫对象**都在规定时间内未响应，并且呼叫发起用户在线，会触发 [呼叫取消回调](/zim-server/callbacks/call-invitation-canceled)。
</Note>

## 回调说明

- 请求方法：POST。
  <Note title="说明">
  回调数据格式为 JSON，您需要对其进行 UrlDecode 解码。
  </Note>
- 请求地址：请在 [ZEGO 控制台](https://console.zego.im/) 上配置回调地址，配置流程请参考控制台文档 [ZIM 相关回调配置](https://doc-zh.zego.im/article/17223)。
- 传输协议：HTTPS/HTTP，建议使用 HTTPS。

## 回调参数

| 参数 | 类型 | 说明 |
| -- | -- | -- |
| appid | String | APP 的唯一标识。 |
| event | String | 回调事件，此回调返回值为 `call_timeout`。 |
| nonce | String | 随机数。 |
| signature | String | 检验串，详情见 [检验说明](/zim-server/callbacks/authenticating-server-to-server-callbacks)。 |
| timestamp | Int | 服务器当前时间，Unix 时间戳。 |
| call_id | String | 呼叫 ID。 |
| user_ids | Array of String | 不应答用户 ID 列表。 |

<Note title="说明">

建议您将部分参数转换为 Int 进行逻辑处理，相关字段包括 `appid` 和 `nonce`。
</Note>

## 数据示例

```json
{
    "appid": "1",
    "event": "call_timeout",
    "nonce": "350176",
    "signature": "signature",
    "timestamp": 1499676978,
    "call_id": "3501761173612493269",
    "user_ids": ["abc","def"]
}
```

## 返回响应
返回 HTTP status code 为 2XX （例如 200）表示成功，其他响应都表示失败。

## 回调重试策略

如果 ZEGO 服务器没有收到响应，或收到的 HTTP status code 不为 2XX（例如 200），都会尝试重试，**最多进行 5 次重试**。每次重试请求与**上一次请求**的间隔时间分别为 2s、4s、8s、16s、32s。若第 5 次重试后仍然失败，将不再重试，该回调丢失。
