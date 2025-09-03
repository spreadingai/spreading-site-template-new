# 加入群组

---

## 描述

凭借本回调，您可以实时查看用户加入特定群组的信息，可用于通知后台有成员入加群组。

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
| event | String |  回调事件，此回调返回值为 `group_join`。 |
| timestamp | Int | 加入群组的时间，以服务器当前时间记录，Unix 时间戳，单位为秒（s）。 |
| nonce | String | 随机数，用于计算 signature。 |
| signature | String | 检验串，详情见 [检验说明](/zim-server/callbacks/authenticating-server-to-server-callbacks)。 |

| 业务参数 | 类型 | 说明 |
|------|------|------|
| group_id | String | 群组 ID。 |
| join_type | String | 入群方式：<ul><li>`Apply`：用户通过申请入群。</li><li>`Invited`：用户通过邀请进群。</li></ul> |
| operator_account | String | 入群操作者的用户 ID。<ul><li>当 `join_type` 为 `Apply` 时，此参数无效；</li><li>当 `join_type` 为 `Invited` 时，此参数为邀请者的用户 ID。</li></ul>|
| new_user_ids | Arrays | 进入群组的用户 ID。 |

## 数据示例

```json
{
    "appid" : "1",
    "event" : "group_join",
    "group_id" : "1",
    "nonce": "350176",
    "signature": "signature",
    "operator_account" : "userA",
    "join_type" : "Apply",
    "new_user_ids" : ["Tony","Jenny"],
    "timestamp" : "1499676978"
}
```

## 返回响应

返回 HTTP status code 为 2XX （例如 200）表示成功，其他响应都表示失败。

## 回调重试策略

如果 ZEGO 服务器没有收到响应，或收到的 HTTP status code 不为 2XX（例如 200），都会尝试重试，**最多进行 5 次重试**。每次重试请求与**上一次请求**的间隔时间分别为 2s、4s、8s、16s、32s。若第 5 次重试后仍然失败，将不再重试，该回调丢失。