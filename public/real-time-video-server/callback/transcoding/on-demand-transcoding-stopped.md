# 单流转码停止回调

- - -

## 描述

当开发者需要了解当前 App 的单流转码任务，可以参考 [回调配置说明](https://doc-zh.zego.im/article/19662) 配置相关回调接口。当发起 [停止单流转码](https://doc-zh.zego.im/article/19607) 请求后，可以通过该回调，查看停止转码任务操作的结果。

## 回调说明

- 请求方法：POST。

<Note title="说明">

 
  回调数据格式为 JSON，您需要对其进行 UrlDecode 解码。
   
</Note>



- 请求地址：请联系 ZEGO 技术支持配置回调地址。
- 传输协议：HTTPS/HTTP，建议使用 HTTPS。

## 回调参数

| 公共参数 | 类型 | 描述 |
|---|---|---|
| Event | String | 回调事件，此回调返回值为 <code>transcode_stop</code>。 |
| Appid | String | APP 的唯一标识。 |
| Timestamp | String | 服务器当前时间，Unix 时间戳。 |
| Nonce | String | 随机数。 |
| Signature | String | 检验串，详情见 [检验说明](https://doc-zh.zego.im/article/19700)。 |

| 业务参数 | 类型 | 描述 |
|---|---|---|
| TaskId | String | 单流转码任务的唯一标识 ID。 |
| UserId | String | 发起停止转码任务的用户 ID，由开发者自定义。 |
| Sequence | Int | 停止转码任务的序列号。 |
| Status | String | <p>转码任务的状态，返回值为 TranscodeStopped：转码任务已停止。</p> |
| StopReason | Int | <p>转码任务的停止原因：</p><ul><li>0：用户主动终止。</li><li>1：任务异常，自动终止。</li></ul> |



## 数据示例

```json
{
    "Event": "transcode_stop",
    "Appid": "111111",
    "Timestamp": "timestamp",
    "Nonce": "nonce",
    "Signature": "signature",
    "TaskId": "2222",
    "UserId": "2222",
    "Sequence": 0,
    "Status": "TranscodeStarted",
    "StopReason": 0
}
```

## 返回响应

返回 HTTP status code 为 2XX （例如 200）表示成功，其他响应都表示失败。


## 回调重试策略

如果 ZEGO 服务器没有收到响应，或收到的 HTTP status code 不为 2XX（例如 200），都会尝试重试，**最多进行 5 次重试**。每次重试请求与**上一次请求**的间隔时间分别为 2s、4s、8s、16s、32s。若第 5 次重试后仍然失败，将不再重试，该回调丢失。
