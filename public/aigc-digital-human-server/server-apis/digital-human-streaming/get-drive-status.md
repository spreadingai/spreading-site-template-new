# 获取数字人视频流驱动任务状态

---

##  描述

通过本接口，您可以获取数字人视频流驱动任务的状态。

## 接口原型

- 请求方法：POST
- 请求体格式：JSON
- 请求地址：{props.link}
- 传输协议：HTTPS
- 调用频率限制：{props.rateLimit || '10 次/秒'}
<PostPrototype link="https://aigc-digitalhuman-api.zegotech.cn?Action=GetDriveStatus" />

## 请求参数

以下请求参数列表仅列出了接口请求参数和部分公共参数，完整公共参数列表请参考 [调用方式 - 公共请求参数](/aigc-digital-human-server/server-apis/accessing-server-apis#公共请求参数)。

| 参数               | 类型   | 是否必填 | 描述             |
|------------------|------|------|-------------------------|
| TaskId      | String | 否    | 数字人视频流任务 ID，如果仅填入此字段，表示拉取此视频流任务的所有驱动任务状态。 通过 [创建数字人视频流任务](/aigc-digital-human-server/server-apis/digital-human-streaming/create-digital-human-stream-task) 接口的响应参数获取。    |
| DriveId      | String | 否    | 数字人视频流驱动任务 ID。您可通过 [音频驱动数字人](/aigc-digital-human-server/server-apis/digital-human-streaming/drive-by-audio)、[文本驱动数字人](/aigc-digital-human-server/server-apis/digital-human-streaming/drive-by-text) 和 [WebSocket 驱动数字人](/aigc-digital-human-server/server-apis/digital-human-streaming/drive-by-ws-stream) 接口的响应参数获取。    |

## 请求示例

- 请求地址 URL：

    ```https
    https://aigc-digitalhuman-api.zegotech.cn?Action=GetDriveStatus
    &<公共请求参数>
    ```

- 请求消息体：

    ```json
    {
        "DriveId": "1d4e048a-7520-4b7b-b762-5d8266bb8b7f"
    }
    ```

## 响应参数

| 参数 | 类型 | 描述 |
|------|------|------|
| Code | Number | 返回码。0 表示成功，其他值表示失败。如需了解错误码及响应处理建议，请参考 [返回码](/aigc-digital-human-server/server-apis/return-codes)。 |
| Message | String | 请求结果的说明信息。 |
| RequestId | String | 请求 ID。 |
| Data | Object | 返回数据。 |
| └DriveList | Array of Object | 数字人视频流驱动任务列表，详情请参考 [Drive](#drive)。 |

### Drive

| 参数 | 类型 | 描述 |
|------|------|------|
| DriveId      | String       | 数字人视频流驱动任务 ID。 |
| Status      | Number       | 数字人视频流驱动任务状态：<ul><li>1：排队中。</li><li>2：播报中。</li><li>3：播报失败。</li><li>4：播报结束。</li></ul> |


## 响应示例

```json
{
    "Code": 0,
    "Message": "success",
    "RequestId": "831234c7-8385-4051-8d3f-d491fe89cc2f",
    "Data": {
        "DriveList": [
            {
                "DriveId": "1d4e048a-7520-4b7b-b762-5d8266bb8b7f",
                "Status": 1
            }
        ]
    }
}
```