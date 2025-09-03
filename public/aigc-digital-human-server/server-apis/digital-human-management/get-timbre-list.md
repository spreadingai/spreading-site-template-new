## 接口原型

- 请求方法：POST
- 请求体格式：JSON
- 请求地址：{props.link}
- 传输协议：HTTPS
- 调用频率限制：{props.rateLimit || '10 次/秒'}
# 查询音色列表

---

##  描述

通过本接口，您可以获取可用的音色列表。

<PostPrototype link="https://aigc-digitalhuman-api.zegotech.cn?Action=GetTimbreList" />

## 请求参数

以下请求参数列表仅列出了接口请求参数和部分公共参数，完整公共参数列表请参考 [调用方式 - 公共请求参数](/aigc-digital-human-server/server-apis/accessing-server-apis#公共请求参数)。

| 参数               | 类型   | 是否必填 | 描述             |
|------------------|------|------|-------------------------|
| DigitalHumanId      | String | 否    | 数字人 ID。若不填或传空，则表示查询所有的公共音色。 若传入有效的数字人 ID，则表示查询绑定此数字人的私有音色。    |
| Offset         | Number | 否    | 表示从第几条开始拉取，取值范围为 [0, 1000000]。如果不填，取值为 0。如果数值小于 0 或大于 1000000，则接口调用报错。|
| Limit          | Number | 否    | 拉取多少个音色信息。取值范围为 [1, 20]。如果不填，取值为 20。如果数值小于 1 或大于 20 ，则接口调用报错。 |


## 请求示例

- 请求地址 URL：

    ```https
    https://aigc-digitalhuman-api.zegotech.cn?Action=GetTimbreList
    &<公共请求参数>
    ```

- 请求消息体：

    ```json
    {
        "DigitalHumanId": "42f97c28-1124-4cb2-800a-44d028497027",
        "Offset": 0,
        "Limit": 20
    }
    ```

## 响应参数

| 参数 | 类型 | 描述 |
|------|------|------|
| Code | Number | 返回码。0 表示成功，其他值表示失败。如需了解错误码及响应处理建议，请参考 [返回码](/aigc-digital-human-server/server-apis/return-codes)。 |
| Message | String | 请求结果的说明信息。 |
| RequestId | String | 请求 ID。 |
| Data | Object | 返回数据。 |
| └Total | Number | 符合查询条件的音色总数|
| └Timbres | Array of Object | 音色列表，详情请参考 [Timbre](#timbre)。|

### Timbre

| 参数 | 类型 | 描述 |
|------|------|------|
| TimbreId      | String       | 音色 ID。 |
| Name | String | 音色名称。 |
| AvatarUrl | String | 音色形象图片 URL，访问有效期 24 小时。 |


## 响应示例

```json
{
    "Code": 0,
    "Message": "success",
    "RequestId": "aa62cf9f-2797-4bd0-9cbf-e461b82d75a5",
    "Data": {
        "Total": 1,
        "Timbres": [
            {
                "TimbreId": "xxx",
                "Name": "xxx",
                "AvatarUrl": "https://xxx.com/xxx.png"
            }
        】
    }
}
```