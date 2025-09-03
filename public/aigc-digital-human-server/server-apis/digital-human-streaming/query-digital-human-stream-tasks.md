# 查询正在运行的数字人视频流任务

---

##  描述

通过本接口，您可以查询当前正在运行中的数字人视频流任务。

## 接口原型

- 请求方法：POST
- 请求体格式：JSON
- 请求地址：{props.link}
- 传输协议：HTTPS
- 调用频率限制：{props.rateLimit || '10 次/秒'}
<PostPrototype link="https://aigc-digitalhuman-api.zegotech.cn?Action=QueryDigitalHumanStreamTasks" />

## 请求参数

无接口请求参数，公共参数列表请参考 [调用方式 - 公共请求参数](/aigc-digital-human-server/server-apis/accessing-server-apis#公共请求参数)。

## 请求示例

```https
https://aigc-digitalhuman-api.zegotech.cn?Action=QueryDigitalHumanStreamTasks
&<公共请求参数>
```

## 响应参数

| 参数 | 类型 | 描述 |
|------|------|------|
| Code | Number | 返回码。0 表示成功，其他值表示失败。如需了解错误码及响应处理建议，请参考 [返回码](/aigc-digital-human-server/server-apis/return-codes)。 |
| Message | String | 请求结果的说明信息。 |
| RequestId | String | 请求 ID。 |
| Data | Object | 返回数据。 |
| └TaskList | Array of Object | 正在运行中的数字人视频流任务列表。详情请参考 [Task](#task)。 |

### Task

| 参数 | 类型 | 描述 |
|------|------|------|
| TaskId      | String       | 数字人视频流任务 ID。 |
| RoomId      | String       | 数字人视频流任务的房间ID。[创建数字人视频流任务](/aigc-digital-human-server/server-apis/digital-human-streaming/create-digital-human-stream-task) 传入的房间 ID。 |
| StreamId      | String       | 数字人视频流任务的流ID。[创建数字人视频流任务](/aigc-digital-human-server/server-apis/digital-human-streaming/create-digital-human-stream-task) 传入的流 ID。 |
| Status      | Number       | 任务状态：<ul><li>1：视频流任务初始化中。</li><li>3：推流中。</li></ul> |
| CreateTime  | Number       | 任务创建的 Unix 时间戳 （秒）。 |


## 响应示例

```json
{
    "Code": 0,
    "Message": "success",
    "RequestId": "ec0881f7-9e62-4e74-a66c-f31579c42f92",
    "Data": {
        "TaskList": [
            {
                "TaskId": "688bd608-823d-4830-b469-fb7fb1c5dbbe",
                "RoomId": "room_8176",
                "StreamId": "789856",
                "CreateTime": 1750298304,
                "Status": 3
            }
        ]
    }
}
```