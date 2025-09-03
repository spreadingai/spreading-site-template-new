# 单流转码开始回调

- - -

## 描述

当开发者需要了解当前 App 的单流转码任务，可以参考 [回调配置说明](https://doc-zh.zego.im/article/19662) 配置相关回调接口。当发起 [开始单流转码](https://doc-zh.zego.im/article/19605) 请求成功后，可以通过该回调，查看转码任务的结果。

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
| Event | String | 回调事件，此回调返回值为 <code>transcode_start</code>。 |
| Appid | String | APP 的唯一标识。 |
| Timestamp | String | 服务器当前时间，Unix 时间戳。 |
| Nonce | String | 随机数。 |
| Signature | String | 检验串，详情见 [检验说明](https://doc-zh.zego.im/article/19700)。 |

| 业务参数 | 类型 | 描述 |
|---|---|---|
| TaskId | String | 单流转码任务的唯一标识 ID。 |
| UserId | String | 发起开始单流转码任务的用户 ID，由开发者自定义。 |
| Sequence | Int | 发起转码任务的序列号。 |
| Status | String | <p>转码任务的状态，返回值为：</p><ul><li>TranscodeStarted：转码任务已开始。</li><li>TranscodeUpdated：转码任务已更新。</li></ul> |
| Details | Object | 转码任务的详细信息。 |
| └ Input | Object | 转码任务的输入流信息，详情可见[Input](#input)。 |
| └ Outputs | Array of Object | 转码任务的输出流信息，详情可见[Outputs](#outputs)。 |

<a id="input"></a>
**Input**
| 公共参数 | 类型 | 描述 |
|---|---|---|
| StreamId | String | 转码输入流 ID。 |
| StreamUrl | String | 转码输入流 Url。 |

<a id="outputs"></a>
**Outputs**
| 公共参数 | 类型 | 描述 |
|---|---|---|
| StreamId | String | 转码输出流 ID。 |
| StreamUrl | String | 转码输出流 Url。 |
| VideoEncId | Int | 转码输出流的视频编码格式。 |
| VideoBitrate | Int | 转码输出流的码率。 |
| ShortEdgeAdaption | Int | 转码输出流的分辨率是否按照短边设置自适应横竖屏。 |
| Fps | Int | 转码输出流的帧率。 |
| Width | Int | 转码输出流的分辨率（宽）。 |
| Height | Int | 转码输出流的分辨率（高）。 |
| GOP | Int | 转码输出流的关键帧间隔。 |



## 数据示例

```json
{
    "Event": "transcode_start",
    "Appid": "111111",
    "Timestamp": "timestamp",
    "Nonce": "nonce",
    "Signature": "signature",
    "TaskId": "2222",
    "UserId": "2222",
    "Sequence": 0,
    "Status": "TranscodeStarted",
    "Details": {
        "Input": {
            "StreamId": "2222"
        },
        "Outputs": [
            {
                "StreamId": "2222",
                "VideoEncId": 0,
                "Fps": 0,
                "ShortEdgeAdaption": 0,
                "Width": 1280,
                "Height": 720,
                "VideoBitrate": 0,
                "GOP": 2
            }
        ]
    }
}
```

## 返回响应

返回 HTTP status code 为 2XX （例如 200）表示成功，其他响应都表示失败。


## 回调重试策略

如果 ZEGO 服务器没有收到响应，或收到的 HTTP status code 不为 2XX（例如 200），都会尝试重试，**最多进行 5 次重试**。每次重试请求与**上一次请求**的间隔时间分别为 2s、4s、8s、16s、32s。若第 5 次重试后仍然失败，将不再重试，该回调丢失。
