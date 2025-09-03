## 接口原型

- 请求方法：POST
- 请求体格式：JSON
- 请求地址：{props.link}
- 传输协议：HTTPS
- 调用频率限制：{props.rateLimit || '10 次/秒'}
# 查询数字人信息

---

##  描述

通过本接口，您可以获取的数字人详细信息。

<PostPrototype link="https://aigc-digitalhuman-api.zegotech.cn?Action=GetDigitalHumanInfo" />

## 请求参数

以下请求参数列表仅列出了接口请求参数和部分公共参数，完整公共参数列表请参考 [调用方式 - 公共请求参数](/aigc-digital-human-server/server-apis/accessing-server-apis#公共请求参数)。

| 参数               | 类型   | 是否必填 | 描述             |
|------------------|------|------|-------------------------|
| DigitalHumanId      | String | 是    | 数字人 ID。您可以从 [GetDigitalHumanList](/aigc-digital-human-server/server-apis/digital-human-management/get-digital-human-list) 接口的响应中获取。     |


## 请求示例

- 请求地址 URL：

    ```https
    https://aigc-digitalhuman-api.zegotech.cn?Action=GetDigitalHumanInfo
    &<公共请求参数>
    ```

- 请求消息体：

    ```json
    {
        "DigitalHumanId": "fa592895-d988-4584-b27b-97b8f4b921ad"
    }
    ```

## 响应参数

| 参数 | 类型 | 描述 |
|------|------|------|
| Code | Number | 返回码。0 表示成功，其他值表示失败。如需了解错误码及响应处理建议，请参考 [返回码](/aigc-digital-human-server/server-apis/return-codes)。 |
| Message | String | 请求结果的说明信息。 |
| RequestId | String | 请求 ID。 |
| Data | Object | 返回数据。 |
| └DigitalHumanId      | String       | 数字人 ID。 |
| └Name | String | 数字人名称。 |
| └AvatarUrl | String | 数字人图片 URL，访问有效期为 24 小时。 |
| └IsPublic | Boolean | 是否为公有数字人。 |
| └Actions | Array of Object | 数字人支持的动作列表，详情请参考 [Action](#action)。 |

### Action

| 参数 | 类型 | 描述 |
|------|------|------|
| Action | String | 动作名称。 |
| PreviewUrl | String | 动作预览视频 URL。 |


# 响应示例

```json
{
    "Code": 0,
    "Message": "success",
    "RequestId": "52ef286e-0ee5-4cbb-ba93-45c4f89c5d00",
    "Data": {
        "DigitalHumanId": "fa592895-d988-4584-b27b-97b8f4b921ad",
        "Name": "xxx",
        "AvatarUrl": "https://xxx.com/xxx.png",
        "Actions": [
            {
                "Action": "802_921474",
                "PreviewUrl": "https://xxx.com/preview/xxx/xxx.mp4"
            },
            {
                "Action": "790_421367",
                "PreviewUrl": "https://xxx.com/preview/xxx/xxx.mp4"
            },
            {
                "Action": "804_750085",
                "PreviewUrl": "https://xxx.com/preview/xxx/xxx.mp4"
            },
            {
                "Action": "idle_action",
                "PreviewUrl": "https://xxx.com/preview/xxx/xxx.mp4"
            },
            {
                "Action": "mute_action",
                "PreviewUrl": "https://xxx.com/preview/xxx/xxx.mp4"
            }
        ],
        "IsPublic": true
    }
}
```