# 解散群组

---

## 描述

凭借本回调，您可以实时监听用户解散群组的行为，可用于记录用户解散群组的日志。

## 回调说明

- 请求方法：POST。
  <Note title="说明">
  回调数据格式为 JSON，您需要对其进行 UrlDecode 解码。
  </Note>
- 请求地址：请在 ZEGO 技术支持配置回调地址。
- 传输协议：HTTPS/HTTP，建议使用 HTTPS。

## 回调参数

| 公共参数 | 类型 | 说明 |
|------|------|------|
| appid | String | App 的唯一标识。 |
| event | String | 回调事件，此回调返回值为 `group_destroy`。 |
| timestamp | Int | 解散群组的时间，以服务器当前时间记录，Unix 时间戳，单位为秒（s）。 |
| nonce | String | 随机数，用于计算 signature。 |
| signature | String | 检验串，详情见 [检验说明](/zim-server/callbacks/authenticating-server-to-server-callbacks)。 |

| 业务参数 | 类型 | 说明 |
|------|------|------|
| group_id | String | 群组 ID。 |
| operator_account | String | 群组解散操作者的用户 ID。 |
| owner_account | String | 群主 ID。 |
| user_ids | Arrays | 解散群组时，所有群组成员的用户 ID。 |

## 数据示例

```json
{
    "appid" : "1",
    "event" : "group_destroy",
    "group_id" : "1",
    "nonce": "350176",
    "signature": "signature",
    "owner_account" : "userA",
    "user_ids" : ["Tony","Jenny"],
    "operator_account" : "userA",
    "timestamp" : "1499676978"
}
```

## 返回响应

返回 HTTP status code 为 2XX （例如 200）表示成功，其他响应都表示失败。

## 回调重试策略

如果 ZEGO 服务器没有收到响应，或收到的 HTTP status code 不为 2XX（例如 200），都会尝试重试，**最多进行 5 次重试**。每次重试请求与**上一次请求**的间隔时间分别为 2s、4s、8s、16s、32s。若第 5 次重试后仍然失败，将不再重试，该回调丢失。
