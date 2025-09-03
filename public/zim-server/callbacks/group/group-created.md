# 创建群组

---

## 描述

凭借本回调，您可以实时监听用户创建群组的行为，获取该群组的信息。

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
| event | String | 回调事件，此回调返回值为 `group_create`。 |
| timestamp | Int | 创建群组的时间，以服务器当前时间记录，Unix 时间戳，单位为秒（s）。 |
| nonce | String | 随机数，用于计算 signature。 |
| signature | String | 检验串，详情见 [检验说明](/zim-server/callbacks/authenticating-server-to-server-callbacks)。 |

| 业务参数 | 类型 | 说明 |
|------|------|------|
| group_id | String | 群组 ID。 |
| operator_account | String | 群组创建操作者的用户 ID。 |
| owner_account | String | 群主 ID。 |
| group_name | String | 群组名称。 |
| attributes | Array of Object  | 创建群组时设置的属性。 |
| └ key | String | 属性 Key。 |
| └ value | String | 属性 Value。 |
| user_ids | Array | 创建群组时，所有群成员的用户 ID。 |

<Note title="说明">
建议您将部分参数转换为 Int 进行逻辑处理，相关字段包括 `appid` 和 `nonce`。
</Note>

## 数据示例

```json
{
    "appid" : "1",
    "event" : "group_create",
    "group_id" : "1",
    "nonce": "350176",
    "signature": "signature",
    "operator_account" : "userA",
    "owner_account" : "operator_account",
    "group_name" : "group_name",
    "attributes" : [
        {
            "key" : "UserSet1",
            "value" : "UserGet1"
        }
        {
            "key" : "UserSet2",
            "value" : "UserGet2"
        }
    ],
    "timestamp" : 1499676978,
    "user_ids" : ["Tony","Jenny"]
}
```

## 返回响应

返回 HTTP status code 为 2XX （例如 200）表示成功，其他响应都表示失败。

## 回调重试策略

如果 ZEGO 服务器没有收到响应，或收到的 HTTP status code 不为 2XX（例如 200），都会尝试重试，**最多进行 5 次重试**。每次重试请求与**上一次请求**的间隔时间分别为 2s、4s、8s、16s、32s。若第 5 次重试后仍然失败，将不再重试，该回调丢失。
