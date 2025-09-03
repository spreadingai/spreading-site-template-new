# 点播转码完成回调

- - -

## 描述

开发者通过 [开始点播转码](https://doc-zh.zego.im/article/19645) 接口完成媒体文件转码后，可以通过该回调、或 [查询媒体文件任务](https://doc-zh.zego.im/article/19643) 接口，查看转码任务的状态、文件回放地址等详细信息。

<Warning title="注意">


如果您使用的 CDN 厂商为 Tencent（腾讯云），需要设置该回调地址。

</Warning>




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
| event | String | 回调事件，此回调返回值为 <code>procedure</code>。 |
| appid | String | APP 的唯一标识。 |
| timestamp | String | 服务器当前时间，Unix 时间戳。 |
| nonce | String | 随机数。 |
| signature | String | 检验串，详情见 [检验说明](https://doc-zh.zego.im/article/19700)。 |

| 业务参数 | 类型 | 描述 |
|---|---|---|
| task_id | String | 转码任务的唯一标识 ID，与 <a href="https://doc-zh.zego.im/article/19645" target="balnk">开始点播转码</a> 响应结果中的 task_id 保持一致。 |
| status | String | <p>整体转码任务的状态。</p><ul><li>SUCCESS：转码成功，请结合 transcode.code 取值判断具体的任务处理结果。</li><li>FAILED：转码失败，extra_params 将为空。</li></ul> |
| fileId | String | 源媒体文件 ID。 |
| extra_params | String | 扩展字段，转码任务处理结果。 |
| └ media | Object | 媒体文件的处理结果，详情可见[media](#media)。 |

<a id="media"></a>
**media**
| 公共参数 | 类型 | 描述 |
|---|---|---|
| transcode | Array of Object | <p>转码任务处理结果列表。</p> |
| code | String | <p>错误码。</p><ul><li>0：成功。</li><li>其他值：失败，请结合 message 的提示信息处理。</li></ul> |
| message | String | 错误信息。 |
| replay_url | String | 转码后的媒体文件回放地址。 |
| size |  | 转码后的媒体文件大小，单位：字节。 |
| duration | Float | 视频流的时长，单位：秒。 |
| video | Object | 转码后的视频信息，与 <a href="https://doc-zh.zego.im/article/19645" target="balnk">开始点播转码</a> 请求参数中的 Resolution 配置相关。 |
| └ height | Int | 视频流高度的最大值，单位：px。 |
| └ width | Int | 视频流宽度的最大值，单位：px。 |
| └ bitrate | Int | 视频流的码率，单位：bps。 |
| └ codec | String | 视频流的编码格式，例如：H.264、HEVC 格式等。 |
| └ fps | Int | 视频流的帧率，单位：Hz。 |
| audio | Object | 转码后的音频信息，与 <a href="https://doc-zh.zego.im/article/19645" target="balnk">开始点播转码</a> 请求参数中的 Resolution 配置相关。 |
| └ bitrate | Int | 音频流的码率，单位：bps。 |
| └ codec | String | 音频流的编码格式，例如：AAC 格式等。 |
| └ sampling_rate | Int | 音频流的采样率，单位：Hz。 |



## 数据示例

```json
{
    "appid": "12345",  
    "event": "procedure", // 回调事件，此回调返回值为：procedure
    "task_id": "xxxxx", // 腾讯云点播任务 ID
    "status": "SUCCESS", // 任务状态
    "file_id":"3270835010897125368", // 文件 ID
    "extra_params": "extra_params",
    "timestamp": "148150008",
    "nonce": "158243",
    "signature": "signature"
}
```

其中，回调参数 `extra_params` 的内容如下：

```json
{
    "media": { // 媒体任务处理结果，当 key 表示不同任务类型，取值为 trancode 时表示转码任务
        "transcode": [{ // 转码任务处理结果列表
            "code": "0", // 错误码 0 表示成功，其他值表示失败
            "message": "SUCCESS", // 错误信息
            "replay_url": "http://vod-tencent-eddietest.zego.im/playlist.m3u8", // 转码后媒体文件回放地址
            "size": 6833612, // 媒体文件大小，单位：字节
            "duration": 170.612, // 视频流时长，单位：秒
            "video": { // 视频信息
                "bitrate": 205290, // 视频流的码率，单位：bps
                "codec": "hevc", // 视频流的编码格式，例如 h264
                "fps": 15, // 帧率，单位：hz
                "height": 540, // 视频流高度的最大值，单位：px
                "width": 960  // 视频流高度的最大值，单位：px
            },
            "audio": { // 音频信息
                "bitrate": 49040, // 音频流的码率，单位：bps。
                "codec": "aac", // 音频流的编码格式，例如 aac。
                "sampling_rate": 44100 // 音频流的采样率，单位：hz
            }
        }]
    }
}
```


## 返回响应

返回 HTTP status code 为 2XX （例如 200）表示成功，其他响应都表示失败。


## 回调重试策略

如果 ZEGO 服务器没有收到响应，或收到的 HTTP status code 不为 2XX（例如 200），都会尝试重试，**最多进行 5 次重试**。每次重试请求与**上一次请求**的间隔时间分别为 2s、4s、8s、16s、32s。若第 5 次重试后仍然失败，将不再重试，该回调丢失。
