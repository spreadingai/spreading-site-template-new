# 获取数字人视频流任务状态

---

##  描述

通过本接口，您可以获取数字人视频流任务的状态。

## 接口原型

- 请求方法：POST
- 请求体格式：JSON
- 请求地址：{props.link}
- 传输协议：HTTPS
- 调用频率限制：{props.rateLimit || '10 次/秒'}
<PostPrototype link="https://aigc-digitalhuman-api.zegotech.cn?Action=GetDigitalHumanStreamTaskStatus" />

## 请求参数

以下请求参数列表仅列出了接口请求参数和部分公共参数，完整公共参数列表请参考 [调用方式 - 公共请求参数](/aigc-digital-human-server/server-apis/accessing-server-apis#公共请求参数)。

| 参数               | 类型   | 是否必填 | 描述             |
|------------------|------|------|-------------------------|
| TaskId      | String | 是    | 数字人视频流任务 ID。 通过 [创建数字人视频流任务](/aigc-digital-human-server/server-apis/digital-human-streaming/create-digital-human-stream-task) 接口的响应参数获取。    |

## 请求示例

- 请求地址 URL：

    ```https
    https://aigc-digitalhuman-api.zegotech.cn?Action=GetDigitalHumanStreamTaskStatus
    &<公共请求参数>
    ```

- 请求消息体：

    ```json
    {
        "TaskId": "f06d1f5d-c0d1-4845-9a2c-f0a45ee037fd"
    }
    ```

## 响应参数

| 参数 | 类型 | 描述 |
|------|------|------|
| Code | Number | 返回码。0 表示成功，其他值表示失败。如需了解错误码及响应处理建议，请参考 [返回码](/aigc-digital-human-server/server-apis/return-codes)。 |
| Message | String | 请求结果的说明信息。 |
| RequestId | String | 请求 ID。 |
| Data | Object | 返回数据。 |
| └Status      | Number       | 任务状态：<ul><li>1：视频流任务初始化中。</li><li>2：视频流任务初始化失败。</li><li>3：推流中。</li><li>4：正在停止推流。</li><li>5：已停止推流。</li></ul> |
| └RoomId | String | 数字人视频流任务 的房间ID。[创建数字人视频流任务](/aigc-digital-human-server/server-apis/digital-human-streaming/create-digital-human-stream-task) 传入的房间 ID。 |
| └StreamId | String | 数字人视频流任务 的流ID。[创建数字人视频流任务](/aigc-digital-human-server/server-apis/digital-human-streaming/create-digital-human-stream-task) 传入的流 ID。 |
| └FailReason | String | 数字人视频流任务初始化失败的原因描述信息，仅当 status 为 2 时有意义。 |
| └CreateTime  | Number       | 任务创建的 Unix 时间戳 （秒）。 |

## 响应示例

```json
{
    "Code": 0,
    "Message": "success",
    "RequestId": "f0a9bf1d-167c-4c0e-af69-96d4e1cf6686",
    "Data": {
        "RoomId": "digital_room_1749541482",
        "StreamId": "digital_stream_1749541482",
        "Status": 5,
        "CreateTime": 1749541482
    }
}
```