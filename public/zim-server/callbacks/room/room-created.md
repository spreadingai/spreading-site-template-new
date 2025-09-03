# 创建房间

---

## 描述
凭借本回调，您可以实时监听用户创建房间的行为，查看用户创建的房间的信息

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
| event | String | 回调事件，此回调返回值为 `room_create`。 |
| timestamp | Int | 创建房间的时间，以服务器当前时间记录，Unix 时间戳，单位为秒（s）。 |
| nonce | String | 随机数，用于计算 signature。 |
| signature | String | 检验串，详情见 [检验说明](/zim-server/callbacks/authenticating-server-to-server-callbacks)。 |

| 业务参数 | 类型 | 说明 |
|------|------|------|
| room_id | String | 房间 ID。 |
| operator_account | String | 房间创建操作者的用户 ID。 |
| room_name | String | 房间名称。 |
| attributes | Array of Object | 创建房间时设置的属性。 |
| └ key | String | 属性 Key。 |
| └ value | String | 属性 Value。 |
| └ auto_delete | Int | 当 `operator_account` 退出房间时，此属性是否会被自动删除。<ul><li>0：（默认）否。</li><li>1：是。<Note title="说明">如果 `operator_account` 并未在房间内，则在其进入房间后退出时，此参数会被自动删除。</Note></li></ul> |

<Note title="说明">
建议您将部分参数转换为 Int 进行逻辑处理，相关字段包括 `appid` 和 `nonce`。
</Note>

## 数据示例

```json
{
    "appid" : "1",
    "event" : "room_create",
    "room_id" : "1",
    "nonce": "350176",
    "signature": "signature",
    "operator_account" : "userA",
    "room_name" : "room_name",
    "attributes" : [
        {
            "key" : "UserSet1",
            "value" : "UserGet1",
            "auto_delete" : 0
        }
        {
            "key" : "UserSet2",
            "value" : "UserGet2",
            "auto_delete" : 0
        }
    ],
    "timestamp" : 1499676978
}
```

## 返回响应

返回 HTTP status code 为 2XX （例如 200）表示成功，其他响应都表示失败。

## 回调重试策略

如果 ZEGO 服务器没有收到响应，或收到的 HTTP status code 不为 2XX（例如 200），都会尝试重试，**最多进行 5 次重试**。每次重试请求与**上一次请求**的间隔时间分别为 2s、4s、8s、16s、32s。若第 5 次重试后仍然失败，将不再重试，该回调丢失。