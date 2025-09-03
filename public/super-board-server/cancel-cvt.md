<Warning title="注意">

1. 本 API 为最新服务端 API v2 接口，支持全球就近接入、统一的鉴权方式、统一的参数风格和公共错误码。后续相关功能的新增都会在此更新。
2. 旧版 API 接口仅供 **2021-09-10** 前接入的旧用户维护使用。旧版接口文档请参考 [旧版服务端 API](https://doc-zh.zego.im/article/11997)。

</Warning>
# 取消文件转码

- - -

<FileServerWarning />


## 描述

通过本接口取消未开始的文件转码任务，如果转码任务开始后调用此接口会返回错误。

## 接口原型

- 请求方法：POST
- 请求地址：`https://docs-api.zego.im/?Action=StopTranscode`
- 传输协议：HTTPS
- 调用频率限制：10 次/秒

## 请求参数

以下请求参数列表仅列出了接口请求参数和部分公共参数，完整公共参数列表请参考 [调用方式](/super-board-server/accessing-server-apis) 中的 ”公共请求参数“。

| 参数 | 类型 | 是否必选 | 描述 |
|---|---|---|---|
| TaskId | String | 是 | 文件转码任务 ID。 |

## 请求示例

- 请求 URL  
```
https://docs-api.zego.im/?Action=StopTranscode
&AppId=1234567890
&SignatureNonce=15215528852396
&Timestamp=1234567890
&Signature=7a2c0f11145fb760d607a07b54825013
&SignatureVersion=2.0
&IsTest=false
```
- 请求消息体 
```json
{
    "TaskId": "task"
}
```

## 响应参数

| 参数 | 类型 | 描述 |
|---|---|---|
| Code | Int64 | 错误码。 |
| Message | String | 错误描述。 |
| RequestId | String | 请求 ID。 |

## 响应示例

```json
{
    "Code": 0,
    "Message": "succeed",
    "RequestId": "abcd123"
}
```

## 返回码

以下仅列出了接口业务相关的返回码，公共返回码请参考 [公共返回码](/super-board-server/common-error-codes)。

| 返回码 | 说明 |
|---|---|
| 60013 | 文件已经完成转码。 |
| 60014 | 不存在的文件转码任务 ID。 |
