## 接口原型

- 请求方法：POST
- 请求体格式：JSON
- 请求地址：{props.link}
- 传输协议：HTTPS
- 调用频率限制：{props.rateLimit || '10 次/秒'}
# 查询数字人列表

---

##  描述

通过本接口，您可以获取可用的数字人列表。

<PostPrototype link="https://aigc-digitalhuman-api.zegotech.cn?Action=GetDigitalHumanList" />

## 请求参数

以下请求参数列表仅列出了接口请求参数和部分公共参数，完整公共参数列表请参考 [调用方式 - 公共请求参数](/aigc-digital-human-server/server-apis/accessing-server-apis#公共请求参数)。

| 参数               | 类型   | 是否必填 | 描述             |
|------------------|------|------|-------------------------|
| InferenceMode  | Number | 否    | 推理模式：<ul><li>1：普通推理。</li><li>2：高级推理。</li></ul>拉取支持对应推理模式的数字人列表。如果不填，取值为 1。      |
| FetchMode      | Number | 否    | 拉取模式：<ul><li>1：全量拉取。</li><li>2：仅拉取公有数字人列表。</li><li>3：仅拉取私有数字人列表。</li></ul>如果不填，取值为 1。     |
| Offset         | Number | 否    | 表示从第几条开始拉取，取值范围为 [0, 1000000]。如果不填，取值为 0。如果数值小于 0 或大于 1000000，则接口调用报错。|
| Limit          | Number | 否    | 拉取多少个数字人信息。取值范围为 [1, 20]。如果不填，取值为 20。如果数值小于 1 或大于 20 ，则接口调用报错。 |


## 请求示例

- 请求地址 URL：
    ```https
    https://aigc-digitalhuman-api.zegotech.cn?Action=GetDigitalHumanList
    &<公共请求参数>
    ```

- 请求消息体：

    ```json
    {
        "FetchMode": 1,
        "Offset": 0,
        "Limit": 10
    }
    ```

## 响应参数

| 参数 | 类型 | 描述 |
|------|------|------|
| Code | Number | 返回码。0 表示成功，其他值表示失败。如需了解错误码及响应处理建议，请参考 [返回码](/aigc-digital-human-server/server-apis/return-codes)。 |
| Message | String | 请求结果的说明信息。 |
| RequestId | String | 请求 ID。 |
| Data | Object | 返回数据。 |
| └Total | Number | 符合查询条件的数字人总数。|
| └DigitalHumans | Array of Object | 数字人列表，详情请参考 [DigitalHuman](#digitalhuman)。 |

### DigitalHuman

| 参数 | 类型 | 描述 |
|------|------|------|
| DigitalHumanId      | String       | 数字人 ID。 |
| Name | String | 数字人名称。 |
| AvatarUrl | String | 数字人图片 URL，访问有效期为24小时。 |
| IsPublic | Boolean | 是否为公有形象：<ul><li>true：公有形象。</li><li>false：私有形象。</li></ul> |
| Actions | Array of Object | 数字人支持的动作列表。 |
| └Action | String | 动作名称。 |
| └PreviewUrl | String | 动作预览视频 URL。 | 


## 响应示例

```json
{
    "Code": 0,
    "Message": "success",
    "RequestId": "aa62cf9f-2797-4bd0-9cbf-e461b82d75a5",
    "Data": {
        "Total": 1,
        "DigitalHumans": [
            {
                "DigitalHumanId": "077f52b8-1513-49f8-af14-54a57dadda2e",
                "Name": "xxx",
                "AvatarUrl": "https://xxx.com/xxx.png",
                "Actions": [],
                "IsPublic": false
            }
        ]
    }
}
```