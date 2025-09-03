
# 取消上传任务

- - -

## 描述

可通过本接口取消一个上传任务。

<Note title="说明">

- 本接口只能取消正在等待中的任务， 不适用于已开始或已结束的任务。
- 取消结果请通过 [回调](/cloud-player-server/callback/callback) 或 [查询上传任务](/cloud-player-server/describe-upload-tasks) 接口判断。
</Note>

## 接口原型

- 请求方法：POST
- 请求地址：`https://cloud-player-api.zego.im/?Action=CancelUploadTask`
- 传输协议：HTTPS
- 调用频率限制：20 次/秒

## 请求参数

以下请求参数列表仅列出了接口请求参数，公共参数列表请参考 [调用方式 - 公共请求参数](/cloud-player-server/accessing-server-apis#公共请求参数)。

| 参数 | 类型 | 是否必填 | 描述 |
|------|------|----------|------|
| UploadTaskId | String | 是 | 上传任务 ID，上传任务的唯一标识。在调用 [CreateUploadTask](/cloud-player-server/create-upload-task) 接口创建上传任务后，您可通过响应参数获取此 ID。 |

## 请求示例

- 请求 URL：
    ```json
    https://cloud-player-api.zego.im/?Action=CancelUploadTask
    &AppId=1234567890
    &SignatureNonce=15215528852396
    &Timestamp=1234567890
    &Signature=7a2c0f11145fb760d607a07b54825013
    &SignatureVersion=2.0
    &IsTest=false
    ```

- 请求消息体：
    ```json
    {
        "UploadTaskId": "XXXXXXXXXXXX"
    }
    ```


## 响应参数

| 参数 | 类型 | 描述 |
|------|------|------|
| Code | Number | 错误码。 |
| Message | String | 错误描述。 |
| RequestId | String | 请求 ID。 |


## 响应示例

```json
{
    "Code": 0,
    "Message": "succeed",
    "RequestId": "3433376152562619",
    "Data": null
}
```

## 返回码

| 返回码 | 说明 | 处理建议 |
|--------|------|----------|
| 0 | 成功。 | - |
| 100000004 | 签名过期。 | 请重新生成签名。 |
| 100000005 | 签名错误。 | 请确认生成签名的参数是否正确。 |
| 350006001 | 接口请求频率超过上限。 | 请确认对应接口的 QPS 限制，降低请求频率。 |
| 350006002 | 网关校验失败。 | 请联系 ZEGO 技术支持处理。 |
| 350006003 | 无效的输入参数。 | 请根据 Message 提示，调整对应参数的取值。 |
| 350006006 | 服务未开通。 | 请联系 ZEGO 技术支持，开通服务权限。 |
| 350006011 | 重复取消。 | 无需处理。 |
| 350010000 | 系统错误。 | 请联系 ZEGO 技术支持处理。 |