
# 查询上传任务

- - -

## 描述

本接口可用于获取单个或多个上传任务的详情。

## 接口原型

- 请求方法：POST
- 请求地址：`https://cloud-player-api.zego.im/?Action=DescribeUploadTasks`
- 传输协议：HTTPS
- 调用频率限制：20 次/秒

## 请求参数

以下请求参数列表仅列出了接口请求参数，公共参数列表请参考 [调用方式 - 公共请求参数](/cloud-player-server/accessing-server-apis#公共请求参数)。

<Note title="说明">
- 若下列参数都不传，则表示查询所有上传任务的详细信息，返回结果包含至多 50 个任务的详细信息。
- 若仅传入 `UploadTaskId`，表示查询对应上传任务的详细信息。
- 当同时传入 `UploadTaskId` 和 `Status` 时，若 `Status` 不符合该上传任务的实际状态，则返回结果为空。
</Note>

| 名称 | 类型 | 必填 | 描述 |
|------|------|------|------|
| UploadTaskId | String | 否 | 待查询的上传任务 ID。当传入此参数时，<code>PageSize</code> 无效。 |
| Status | Number | 否 | 查询处于特定状态的上传任务。支持下列值：<ul><li>0：默认值，无意义。</li><li>1：等待中。</li><li>2：上传中。</li><li>3：等待重试。</li><li>4：上传成功。</li><li>5：上传失败。</li><li>6：已取消。</li><li>7：已过期。</li></ul> |
| PageSize | Number | 否 | 当前请求返回的数据量上限。取值范围为 (0, 50]，为空时默认为 50。 |
| PageToken | String | 否 | 分页拉取标志。<br />第一次查询无需设置此参数。当返回参数中 `NextPageToken` 不为空时，表示之后的查询结果未获取完毕，再次调用本接口继续查询时，此参数填写该 `NextPageToken` 的值。 |

## 请求示例

- 请求 URL：
    ```json
    https://cloud-player-api.zego.im/?Action=DescribeUploadTasks
    &AppId=1234567890
    &SignatureNonce=15215528852396
    &Timestamp=1234567890
    &Signature=7a2c0f11145fb760d607a07b54825013
    &SignatureVersion=2.0
    &IsTest=false
    ```

- 请求消息体：

    <CodeGroup>
    ```json 查询单个上传任务
    {
        "UploadTaskId": "upload_task_1",
    }
    ```

    ```json 获取多个上传任务
    {
        // 首次查询状态为等待中的上传任务，返回 10 条数据。
        "PageSize":10,
        "Status":1,
        "PageToken":""
    }
    ```
    </CodeGroup>

## 响应参数

| 参数 | 类型 | 描述 |
|------|------|------|
| Code | Number | 返回码。 |
| Message | String | 操作结果描述。 |
| RequestId | String | 请求 ID。 |
| Data | Object | 返回的具体信息。 |
| └TotoalSize | Number | 查询结果总数。 |
| └NextPageToken | String | 分页拉取标志。<ul><li>非空时表示还有未返回的结果信息，需要将此值设置到请求参数的 <code>PageToken</code> 中再次调用本接口获取剩余结果信息。</li><li>为空时表示已经返回所有结果信息。</li></ul><Note title="说明">除上述说明之外，此字段与列表信息无任何关联，请勿基于此做任何其他逻辑。</Note> |
| └UploadTasks | Array of Object | 查询结果详情，详情请参考 [UploadTasks](#uploadtasks)。 |

### UploadTasks 

| 参数 | 类型 | 描述 |
|------|------|------|
| UploadTaskId | String | 上传任务 ID。 |
| StreamUrl | String | 媒体资源的地址。 |
| Title | String | 文件标题。 |
| Status | Number | 上传状态，数值如下所示：<ul><li>1：等待中</li><li>2：上传中</li><li>3：等待重试</li><li>4：上传成功</li><li>5：上传失败</li><li>6：已取消</li><li>7：已过期</li></ul> |
| RetryCount | Number | 上传重试次数。 |
| ExpiresAt | Number | 文件的过期 Unix 时间戳，单位为秒。 |
| CreateTime | Number | 上传任务创建成功的 Unix 时间戳，单位为秒。 |
| UploadStreamUrl | String | 上传成功后，文件的公网 URL。 |
| InternalUploadStreamUrl | String | 上传成功后，文件的 ZEGO 内网 URL。<Note title="说明">建议在 [创建媒体播放器](/cloud-player-server/create-player) 时用作 <code>StreamUrl</code>。</Note> |

## 响应示例

```json
{
    "Code": 0,
    "Message": "succeed",
    "RequestId": "abcd123",
    "Data": {
        "TotalSize": 1,
        "NextPageToken": "",
        "UploadTask": [
            {
                "UploadTaskId": "upload_task_1",
                "StreamUrl": "https://xxx.com/video/test.mp4",
                "Title": "your-title.mp4",
                "Status": 4,
                "RetryCount": 0,
                "ExpiresAt": 1742989076,
                "CreateTime": 1735213076,
                "UploadStreamUrl": "https://xxx.com/video/your-title.mp4",
                "InternalUploadStreamUrl": "https://xxx.com/video/your-title.mp4"
            }
        ]
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
| 350010000 | 系统错误。 | 请联系 ZEGO 技术支持处理。 |
