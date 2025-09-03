# RTC 音频流驱动数字人

---

##  描述

通过本接口，您可以使数字人播报 RTC 房间内的音频流。

<Note title="说明">
RTC 音频流驱动数字人，会默认打断当前数字人正在进行的播报任务，并丢弃正在排队中的播报任务。
</Note>

## 接口原型

- 请求方法：POST
- 请求体格式：JSON
- 请求地址：{props.link}
- 传输协议：HTTPS
- 调用频率限制：{props.rateLimit || '10 次/秒'}
<PostPrototype link="https://aigc-digitalhuman-api.zegotech.cn?Action=DriveByRTCStream" />

## 请求参数

以下请求参数列表仅列出了接口请求参数和部分公共参数，完整公共参数列表请参考 [调用方式 - 公共请求参数](/aigc-digital-human-server/server-apis/accessing-server-apis#公共请求参数)。

| 参数               | 类型   | 是否必填 | 描述             |
|------------------|------|------|-------------------------|
| TaskId      | String | 是    | 数字人视频流任务 ID。 通过 [创建数字人视频流任务](/aigc-digital-human-server/server-apis/digital-human-streaming/create-digital-human-stream-task) 接口的响应参数获取。    |
| RTCConfig      | Object | 是    | RTC 相关配置。 本参数结构，请参考 [RTCConfig](#RTCConfig)。           |

### RTCConfig
| 参数               | 类型   | 是否必填 | 描述             |
|------------------|------|------|-------------------------|
| RoomId      | String | 是    | 音频流来源的房间 ID。     |
| StreamId      | String | 是    | 流 ID。    |

## 请求示例

- 请求地址 URL：

    ```https
    https://aigc-digitalhuman-api.zegotech.cn?Action=DriveByRTCStream
    &<公共请求参数>
    ```

- 请求消息体：

    ```json
    {
        "TaskId": "c54ffce5-e63c-414f-9342-b0777ae8e691",
        "RTCConfig": {
            "RoomId": "1234567890",
            "StreamId": "test"
        }
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