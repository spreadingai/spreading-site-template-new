# 停止数字人视频流任务

---

##  描述

通过本接口，您可以停止数字人视频流任务。

## 接口原型

- 请求方法：POST
- 请求体格式：JSON
- 请求地址：{props.link}
- 传输协议：HTTPS
- 调用频率限制：{props.rateLimit || '10 次/秒'}
<PostPrototype link="https://aigc-digitalhuman-api.zegotech.cn?Action=StopDigitalHumanStreamTask" />

## 请求参数

以下请求参数列表仅列出了接口请求参数和部分公共参数，完整公共参数列表请参考 [调用方式 - 公共请求参数](/aigc-digital-human-server/server-apis/accessing-server-apis#公共请求参数)。

| 参数               | 类型   | 是否必填 | 描述             |
|------------------|------|------|-------------------------|
| TaskId      | String | 是    | 数字人视频流任务 ID。过 [创建数字人视频流任务](/aigc-digital-human-server/server-apis/digital-human-streaming/create-digital-human-stream-task) 接口的响应参数获取。    |

## 请求示例

- 请求地址 URL：

    ```https
    https://aigc-digitalhuman-api.zegotech.cn?Action=StopDigitalHumanStreamTask
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

## 响应示例

```json
{
    "Code": 0,
    "Message": "success",
    "RequestId": "e6f95291-7053-4c87-9bd0-b4b8c56aabfd"
}
```