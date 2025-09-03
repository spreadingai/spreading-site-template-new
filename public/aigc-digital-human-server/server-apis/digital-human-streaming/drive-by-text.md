# 文本驱动数字人

---

##  描述

通过本接口，您可以使数字人播报指定的输入文本。

## 接口原型

- 请求方法：POST
- 请求体格式：JSON
- 请求地址：{props.link}
- 传输协议：HTTPS
- 调用频率限制：{props.rateLimit || '10 次/秒'}
<PostPrototype link="https://aigc-digitalhuman-api.zegotech.cn?Action=DriveByText" />

## 请求参数

以下请求参数列表仅列出了接口请求参数和部分公共参数，完整公共参数列表请参考 [调用方式 - 公共请求参数](/aigc-digital-human-server/server-apis/accessing-server-apis#公共请求参数)。

| 参数               | 类型   | 是否必填 | 描述             |
|------------------|------|------|-------------------------|
| TaskId      | String | 是    | 数字人视频流任务 ID。 通过 [创建数字人视频流任务](/aigc-digital-human-server/server-apis/digital-human-streaming/create-digital-human-stream-task) 接口的响应参数获取。    |
| Text      | String | 是    | 播报文本内容。不超过 1800 个字。    |
| InterruptMode      | Number | 否    | 是否打断正在执行的播报任务并立即执行本任务。可选值：<ul><li>0（默认）：否，排队等待前一个任务完成后再执行。</li><li>1：是，立即中断当前任务执行本任务。</li></ul> |
| TTSConfig  | Object | 是    | TTS 相关配置。 本参数结构，请参考 [TTSConfig](#ttsconfig)。           |

### TTSConfig
| 参数               | 类型   | 是否必填 | 描述             |
| ----------------|------|------|-------------------------|
| TimbreId | String | 是    | 音色 ID。通过 [获取音色列表](/aigc-digital-human-server/server-apis/digital-human-management/get-timbre-list) 接口的响应参数获取。 |
| SpeechRate | Number | 否    | 语速。取值范围为 [-500, 500]，如果不填，取值为 0。数值越大，语速越快。 |
| PitchRate | Number | 否 | 音调。取值范围为 [-500, 500]，如果不填，取值为 0。数值越大，音调越高。 |
| Volume | Number | 否 | 音量。取值范围为 [1, 100]，如果不填，取值为 50。数值越大，声音越大。 |

## 请求示例

- 请求地址 URL：

    ```https
    https://aigc-digitalhuman-api.zegotech.cn?Action=DriveByText
    &<公共请求参数>
    ```

- 请求消息体：

    ```json
    {
        "TaskId": "f06d1f5d-c0d1-4845-9a2c-f0a45ee037fd",
        "Text": "xxx",
        "TTSConfig": {
            "Volume": 51,
            "SpeechRate": 51,
            "PitchRate": 51,
            "TimbreId": "xxx"
        },
        "InterruptMode": 1
    }
    ```

## 响应参数

| 参数 | 类型 | 描述 |
|------|------|------|
| Code | Number | 返回码。0 表示成功，其他值表示失败。如需了解错误码及响应处理建议，请参考 [返回码](/aigc-digital-human-server/server-apis/return-codes)。 |
| Message | String | 请求结果的说明信息。 |
| RequestId | String | 请求 ID。 |
| └DriveId      | String       | 数字人视频流驱动任务 ID。 |

## 响应示例

```json
{
    "Code": 0,
    "Message": "success",
    "RequestId": "e6f95291-7053-4c87-9bd0-b4b8c56aabfd",
    "Data": {
        "DriveId": "ae8c4d88-44fe-469a-aedf-df06849d0fdc"
    }
}
```