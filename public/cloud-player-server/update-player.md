
# 更新云端播放器

- - -

## 描述

调用本接口更新指定云端播放器的播放进度、音频转码参数、视频转码参数等信息。

## 接口原型

- 请求方法：POST
- 请求地址：`https://cloud-player-api.zego.im/?Action=UpdatePlayer`
- 传输协议：HTTPS
- 调用频率限制：20 次/秒

## 请求参数

以下请求参数列表仅列出了接口请求参数，公共参数列表请参考 [调用方式 - 公共请求参数](/cloud-player-server/accessing-server-apis#公共请求参数)。

| 参数 | 类型 | 是否必选 | 描述 |
|------|------|----------|------|
| PlayerId | String | 是 | 云端播放器唯一标识 ID，通过 [CreatePlayer](/cloud-player-server/create-player) 返回。<strong>调用本接口时，请确保 PlayerId 是已存在的，否则可能会出错。</strong> |
| Sequence | Number | 是 | 请求的序列号，用于保证时序，同个播放器任务的参数修改需要保证序列号的递增。例如："Sequence"：1。ZEGO 服务器将按照最新的配置来更新云端播放器。 |
| StreamUrl | String | 否 | 媒体资源的地址，必须是有效的 HTTP/HTTPS 地址，且长度在 1024 字节以内。 |
| BackupStreamUrl | String | 否 | 媒体资源的备用地址，必须是有效的 HTTP/HTTPS 地址，且长度在 1024 字节以内。当 StreamUrl 参数中的地址访问失败时，云端播放器会尝试访问备用地址。 |
| VideoOptions | Object | 否 | 视频转码参数配置。<strong>请注意，该参数不填写时，默认使用上一次调用本接口、或创建云端播放器时的配置。</strong> |
| └Width | Number | 否 | 视频宽度，取值范围为 [1, 3000]，且必须是 2 的整倍数，单位为 px。<strong>请注意，Width 和 Height 任意参数设置为 1 时，都表示纯音频推流；该参数不填写时，默认使用上一次调用本接口、或创建云端播放器时的配置。</strong> |
| └Height | Number | 否 | 视频高度，取值范围为 [1, 3000]，且必须是 2 的整倍数，单位为 px。<strong>请注意，Width 和 Height 任意参数设置为 1 时，都表示纯音频推流；该参数不填写时，默认使用上一次调用本接口、或创建云端播放器时的配置。</strong> |
| └VideoBitrate | Number | 否 | 视频码率，取值范围为 [1, 50000]，单位为 kbps。<strong>请注意，该参数不填写时，默认使用上一次调用本接口、或创建云端播放器时的配置。</strong> |
| AudioOptions | Object | 否 | 音频转码参数配置。<strong>请注意，该参数不填写时，默认使用上一次调用本接口、或创建云端播放器时的配置。</strong> |
| └AudioBitrate | Number | 否 | 音频码率，范围为 [1, 192]，单位为 kbps。<strong>请注意，该参数不填写时，默认使用上一次调用本接口、或创建云端播放器时的配置。</strong> |
| └Volume | Number | 否 | 音量值，范围为 [0, 200]。<strong>请注意，该参数不填写时，默认使用上一次调用本接口、或创建云端播放器时的配置。</strong> |
| SeekTo | Number | 否 | 指定播放进度（秒）。<strong>请注意，该参数不填写时，默认使用上一次调用本接口、或创建云端播放器时的配置。</strong> |
| IsPause | Number | 否 | 是否暂停播放。<ul><li>0：正常播放源文件。</li><li>1：暂停播放源文件。</li></ul> |
| RepeatTimes | Number | 否 | 播放次数。<ul><li>1：播放媒体流 1 次。</li><li>-1：自动循环播放。</li><li>n：自定义播放媒体流次数，必须大于 0。</li></ul><strong>请注意，该参数不填写或值为  0 时，默认使用上一次调用本接口、或创建云端播放器时的配置。</strong> |

## 请求示例

- 请求 URL
  
```
https://cloud-player-api.zego.im/?Action=UpdatePlayer
&AppId=1234567890
&SignatureNonce=15215528852396
&Timestamp=1234567890
&Signature=7a2c0f11145fb760d607a07b54825013
&SignatureVersion=2.0
&IsTest=false
```

- 请求消息体    

```json
{
    "PlayerId": "player_1",
    "Sequence": 100,
    "StreamUrl": "https://xxx.com/video/test111.mp4",
    "BackupStreamUrl": "",
    "VideoOptions": {
        "Width": 360,
        "Height": 640,
        "VideoBitrate": 1200
    },
    "AudioOptions": {
        "AudioBitrate": 48,
        "Volume": 150
    },
    "SeekTo": 10,
    "IsPause": 1,
    "RepeatTimes": 1
}
```

## 响应参数

| 参数 | 类型 | 描述 |
|------|------|------|
| Code | Number | 错误码。 |
| Message | String | 错误描述。 |
| RequestId | String | 请求 ID。 |

## 响应示例

```json
{
    "Code": 0,
    "Message": "succeed",
    "RequestId": "abcd123"
}
```

## 返回码

以下仅列出了接口业务逻辑相关的返回码，完整返回码请参考 [全局返回码](/cloud-player-server/return-codes)。

| 返回码 | 说明 | 处理建议 |
|--------|------|----------|
| 0 | 成功。 | - |
| 100000004 | 签名过期。 | 请重新生成签名。 |
| 100000005 | 签名错误。 | 请确认生成签名的参数是否正确。 |
| 350006001 | 接口请求频率超过上限。 | 请确认对应接口的 QPS 限制，降低请求频率。 |
| 350006002 | 网关校验失败。 | 请联系 ZEGO 技术支持处理。 |
| 350006003 | 无效的输入参数。 | 请根据 Message 提示，调整对应参数的取值。 |
| 350006006 | 服务未开通。 | 请联系 ZEGO 技术支持，开通服务权限。 |
| 350010000 | 系统错误。 | 请联系 ZEGO 技术支持处理。 |