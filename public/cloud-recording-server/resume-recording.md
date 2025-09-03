

# 恢复录制

---

## 描述

调用本接口可以恢复暂停中的任务，继续录制房间内的音视频流、白板等。

<Warning title="注意">仅通过 [暂停录制](/cloud-recording-server/pause-recording) 接口暂停的混流录制任务可通过本接口恢复录制。</Warning>

## 接口原型

- 请求方法：POST
- 请求地址：`https://cloudrecord-api.zego.im/?Action=ResumeRecord`
- 传输协议：HTTPS
- 调用频率限制：10 次/秒

## 请求参数

以下请求参数列表仅列出了接口请求参数和部分公共参数，完整公共参数列表请参考 [调用方式](/cloud-recording-server/making-api-requests#公共请求参数) 中的 “公共请求参数”。

| 参数 | 类型 | 是否必选 | 描述 |
|------|------|----------|------|
| TaskId | String | 是 | 录制任务 ID，长度固定为 16 个字节的字符串。 |

## 请求示例

以下是 ResumeRecord 接口的请求示例。
- 请求 URL  
  ```
  https://cloudrecord-api.zego.im/?Action=ResumeRecord
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
