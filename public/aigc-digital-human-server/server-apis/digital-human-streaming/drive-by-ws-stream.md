# 获取 WebSocket 驱动信息

---

##  描述

通过本接口，您可以获取一个 WebSocket 链接地址。通过向这个地址传输 PCM 音频数据后，即可驱动数字人说话。

如需了解完整 WebSocket 驱动数字人流程，请参考 [WebSocket 驱动数字人](/aigc-digital-human-server/basic/digital-human-ws-drive)。

<Note title="说明">
当使用 Websocket 音频流驱动数字人时，数字人会默认正在进行的播报任务，并丢弃正在排队中的播报任务。
</Note>

## 接口原型

- 请求方法：POST
- 请求体格式：JSON
- 请求地址：{props.link}
- 传输协议：HTTPS
- 调用频率限制：{props.rateLimit || '10 次/秒'}
<PostPrototype link="https://aigc-digitalhuman-api.zegotech.cn?Action=DriveByWsStream" />

## 请求参数

以下请求参数列表仅列出了接口请求参数和部分公共参数，完整公共参数列表请参考 [调用方式 - 公共请求参数](/aigc-digital-human-server/server-apis/accessing-server-apis#公共请求参数)。

| 参数               | 类型   | 是否必填 | 描述             |
|------------------|------|------|-------------------------|
| TaskId      | String | 是    | 数字人视频流任务 ID。 通过 [创建数字人视频流任务](/aigc-digital-human-server/server-apis/digital-human-streaming/create-digital-human-stream-task) 接口的响应参数获取。    |

## 请求示例

- 请求地址 URL：

    ```https
    https://aigc-digitalhuman-api.zegotech.cn?Action=DriveByWsStream
    &<公共请求参数>
    ```

- 请求消息体：

    ```json
    {
        "TaskId": "c54ffce5-e63c-414f-9342-b0777ae8e691"
    }
    ```

## 响应参数

| 参数 | 类型 | 描述 |
|------|------|------|
| Code | Number | 返回码。0 表示成功，其他值表示失败。如需了解错误码及响应处理建议，请参考 [返回码](/aigc-digital-human-server/server-apis/return-codes)。 |
| Message | String | 请求结果的说明信息。 |
| RequestId | String | 请求 ID。 |
| └DriveId      | String       | 数字人视频流驱动任务 ID。 |
| └WssAddress      | String    | 数字人视频流任务对应的 WebSocket 连接地址。通过此地址与数字人 API 服务服务端建立连接之后，可以向其传输 PCM 音频数据驱动数字人说话。 |

## 响应示例

```json
{
    "Code": 0,
    "Message": "success",
    "RequestId": "9f5228e2-2c90-4faa-aa7e-7ebbf28bbd83",
    "Data": {
        "DriveId": "9b9c09ef-281d-43d8-807f-e00e71049642",
        "WssAddress": "wss://xx.xx.xx.xx:xxx/ws?Token=xxxx"
    }
}
```