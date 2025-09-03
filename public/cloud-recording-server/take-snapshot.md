

# 截图

- - -

## 描述

调用本接口，可对 **混流画面** 进行一次截图，您可通过 [回调](/cloud-recording-server/end-callback) 接收 `event_type` 为 `1` 的通知，获取一张格式为 JPG 的图片。

## 接口原型

- 请求方法：POST
- 请求地址：`https://cloudrecord-api.zego.im/?Action=TakeSnapshot`
- 传输协议：HTTPS
- 调用频率限制：10 次/秒

## 请求参数

以下请求参数列表仅列出了接口请求参数和部分公共参数，完整公共参数列表请参考 [调用方式](/cloud-recording-server/making-api-requests#公共请求参数) 中的 “公共请求参数”。

| 参数 | 类型 | 是否必选 | 描述 |
|------|------|----------|------|
| TaskId | String | 是 | 混流录制任务 ID（进行中）。可通过 [开始录制](/cloud-recording-server/start) 和 [查询录制任务列表](/cloud-recording-server/query-record-task-list) 接口的响应获取，长度固定为 16 个字节的字符串。 |


## 请求示例
- 请求 URL  
    ```
    https://cloudrecord-api.zego.im/?Action=TakeSnapshot
    &AppId=1234567890
    &SignatureNonce=15215528852396
    &Timestamp=1234567890
    &Signature=7a2c0f11145fb760d607a07b54825013
    &SignatureVersion=2.0
    ```
- 请求消息体  
    ```json
    {
        "TaskId": "XXXXXXXXXXX"
    }
    ```

## 响应参数

| 参数 | 类型 | 描述 |
|------|------|------|
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
