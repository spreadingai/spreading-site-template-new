
# 创建上传任务

- - -

<Note title="说明">
此功能为增值服务，如需使用，请联系 ZEGO 商务人员开通。
</Note>

## 描述

创建一个上传任务，将 URL 在线资源上传到 OSS。上传之后同区域的云播放器集群可以通过内网拉流地址获取播放资源，保证资源传输过程的稳定性。

## 接口原型
- 请求方法：POST
- 请求地址：`https://cloud-player-api.zego.im/?Action=CreateUploadTask`
- 传输协议：HTTPS
- 调用频率限制：20 次/秒
  <Note title="说明">
  对于单个 AppID 而言，ZEGO 服务端最多同时可处理 10 上传任务（包含上传中和等待中），如需调高上限，请联系 ZEGO 技术支持修改。
  </Note>

## 请求参数

以下请求参数列表仅列出了接口请求参数，公共参数列表请参考 [调用方式 - 公共请求参数](/cloud-player-server/accessing-server-apis#公共请求参数)。

| 名称 | 类型 | 必填 | 描述 |
|------|------|------|------|
| Title | String | 是 | 文件名称，长度上限为 100B，文件后缀（支持 <code>.mp3</code>、<code>.mp4</code>、<code>.flv</code>、<code>.wav</code>、<code>.aac</code> 和 <code>.flac</code>） 需保留且正确，否则可能导致播放失败。<Warning title="注意">请勿使用相同文件名称。如果多个文件的 Title 相同，它们会互相替代，只保留最后上传的文件，但是，新文件可能会继承旧文件的过期时间。</Warning> |
| StreamUrl | String | 是 | 媒体资源的地址，必须是有效的 HTTP/HTTPS 地址，且长度在 1024 字节以内，文件大小上限为 5GB。 |
| RetentionDays | Number | 否 | 资源有效时长，单位为天。有效取值范围为 [1, 7]，（默认值：3），如果您需要提高上限，请联系 ZEGO 技术支持处理。 |
| ContentMd5 | String | 否 | ContentMd5 是通过 MD5 算法对文件进行计算生成的哈希值，然后经过 Base64 编码得到的结果，用于验证文件在上传过程中是否保持完整性。<br />如果您在上传时提供了 ContentMd5 参数，ZEGO 服务端会通过 OSS 计算文件的 ContentMd5 并与您提供的值进行比对。若两者不一致，上传将失败，表明文件可能被篡改或损坏。<br />为确保文件的完整性和安全性，强烈建议在上传文件时传入 ContentMd5 参数。 |

以下是使用 PHP 生成 ContentMd5 的示例：
```PHP 
function calculateMD5($content) {
    return base64_encode(md5($content, true));
}
```
## 请求示例

- 请求 URL：
    ```json
    https://cloud-player-api.zego.im/?Action=CreateUploadTask
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
        "Title":"your-title.mp4",
        "StreamUrl": "https://xxx.com/video/test.mp4",
        "RetentionDays":3,
        "ContentMd5":"0uyh0doi++pDCwZkI0VEfA=="
    }
    ```

## 响应参数

| 参数 | 类型 | 描述 |
|------|------|------|
| Code | Number | 返回码 |
| Message | String | 操作结果描述。 |
| RequestId | String | 请求 ID。 |
| Data | Object | 响应对象。 |
| └UploadTaskId | String | 上传任务 ID。 |
| └CreateTime | Number | 文件上传任务创建成功的 Unix 时间戳，单位：秒。 |

## 响应示例

```json
{
    "Code": 0,
    "Message": "succeed",
    "RequestId": "955607951583870294",
    "Data": {
        "UploadTaskId": "upload_task_1",
        "CreateTime": 1681221508
    }
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
| 350006010 | 上传任务并发数达到上限。 | 请确认当前进行中的上传任务数量是否超过上限，默认上限为 10 个。 |
| 350010000 | 系统错误。 | 请联系 ZEGO 技术支持处理。 |
