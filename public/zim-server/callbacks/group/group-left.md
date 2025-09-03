# 离开群组

---

## 描述

凭借本回调，您可以实时监听用户离开特定群组的信息，可用于通知后台有成员离开群组。

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
| event | String | 回调事件，此回调返回值为 `group_exit`。 |
| timestamp | Int | 退出群组的时间，以服务器当前时间记录，Unix 时间戳，单位为秒（s）。 |
| nonce | String | 随机数，用于计算 signature。 |
| signature | String | 检验串，详情见 [检验说明](/zim-server/callbacks/authenticating-server-to-server-callbacks)。 |

| 业务参数 | 类型 | 说明 |
|------|------|------|
| group_id | String | 群组 ID。 |
| exit_type | String | 退群方式：<ul><li>Quit：主动退群；</li><li>Kickout：被踢出群。</li></ul> |
| operator_account | String | 退群操作者的用户 ID。<ul><li>当 `exit_type` 为 `Quit` 时，此参数无效；</li><li>当 `exit_type` 为 `Kickout` 时，此参数为踢人者的用户 ID。</li></ul> |
| exit_user_ids | Array | 退出群组的用户 ID。 |

<Note title="说明">
建议您将部分参数转换为 Int 进行逻辑处理，相关字段包括 `appid` 和 `nonce`。
</Note>

## 数据示例

```json
{
    "appid" : "1",
    "event" : "group_exit",
    "group_id" : "1",
    "nonce": "350176",
    "signature": "signature",
    "exit_type" : "Kickout",
    "operator_account" : "userA",
    "exit_user_ids" : ["Tony","Jenny"],
    "timestamp" : 1499676978
}
```

## 返回响应

返回 HTTP status code 为 2XX （例如 200）表示成功，其他响应都表示失败。

## 回调重试策略

如果 ZEGO 服务器没有收到响应，或收到的 HTTP status code 不为 2XX（例如 200），都会尝试重试，**最多进行 5 次重试**。每次重试请求与**上一次请求**的间隔时间分别为 2s、4s、8s、16s、32s。若第 5 次重试后仍然失败，将不再重试，该回调丢失。