

# 更新白板

---

## 描述

在录制过程中，可以随时调用本接口更改录制的白板。

当用户切换白板时，建议开发者调用 UpdateWhiteboard 接口更新切换后的白板 ID。

## 接口原型

- 请求方法：POST
- 请求地址：`https://cloudrecord-api.zego.im/?Action=UpdateWhiteboard`
- 传输协议：HTTPS
- 调用频率限制：10 次/秒

## 请求参数

以下请求参数列表仅列出了接口请求参数和部分公共参数，完整公共参数列表请参考 [调用方式](/cloud-recording-server/making-api-requests#公共请求参数) 中的 “公共请求参数”。

| 参数 | 类型 | 是否必选 | 描述 |
|------|------|----------|------|
| TaskId | String | 是 | 录制任务 ID，长度固定为 16 个字节的字符串。 |
| WhiteboardId | String | 是 | 录制白板的 ID。 |

## 请求示例

- 请求 URL  
    ```
    https://cloudrecord-api.zego.im/?Action=UpdateWhiteboard
    &AppId=1234567890
    &SignatureNonce=15215528852396
    &Timestamp=1234567890
    &Signature=7a2c0f11145fb760d607a07b54825013
    &SignatureVersion=2.0
    ```
- 请求消息体  
    ```json
    {
        "TaskId": "xxxx",
        "WhiteboardId": "1111"
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
