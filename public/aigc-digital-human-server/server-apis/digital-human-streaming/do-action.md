# 动作驱动数字人

---

##  描述

通过本接口，您可以使数字人执行指定的动作。

## 接口原型

- 请求方法：POST
- 请求体格式：JSON
- 请求地址：{props.link}
- 传输协议：HTTPS
- 调用频率限制：{props.rateLimit || '10 次/秒'}
<PostPrototype link="https://aigc-digitalhuman-api.zegotech.cn?Action=DoAction" />

## 请求参数

以下请求参数列表仅列出了接口请求参数和部分公共参数，完整公共参数列表请参考 [调用方式 - 公共请求参数](/aigc-digital-human-server/server-apis/accessing-server-apis#公共请求参数)。

| 参数               | 类型   | 是否必填 | 描述             |
|------------------|------|------|-------------------------|
| TaskId      | String | 是    | 数字人视频流任务 ID。 通过 [创建数字人视频流任务](/aigc-digital-human-server/server-apis/digital-human-streaming/create-digital-human-stream-task) 接口的响应参数获取。    |
| Action      | String | 是    | 插入动作的名称。通过 [获取数字人信息](/aigc-digital-human-server/server-apis/digital-human-management/get-digital-human-info) 接口的响应参数获取。    |


## 请求示例

- 请求地址 URL：

    ```https
    https://aigc-digitalhuman-api.zegotech.cn?Action=DoAction
    &<公共请求参数>
    ```

- 请求消息体：

    ```json
    {
        "TaskId": "46fb5334-628a-4792-8854-d6c4c0cce6c7",
        "Action": "shake_hands"
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
    "RequestId": "d799c85c-10c8-4191-8c6a-3290a5940b5f"
}
```