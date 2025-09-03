

# 查询录制状态

---

## 描述

开始录制后，开发者可以通过调用本接口来查询录制任务的状态。支持查询录制开始时间在发起接口调用时三天内的任务。

## 接口原型

- 请求方法：POST
- 请求地址：`https://cloudrecord-api.zego.im/?Action=DescribeRecordStatus`
- 传输协议：HTTPS
- 调用频率限制：10 次/秒

## 请求参数

以下请求参数列表仅列出了接口请求参数和部分公共参数，完整公共参数列表请参考 [调用方式](/cloud-recording-server/making-api-requests#公共请求参数) 中的 “公共请求参数”。

| 参数 | 类型 | 是否必选 | 描述 |
| --- | --- | --- | --- |
| TaskId | String | 是 | 录制任务 ID，长度固定为 16 个字节的字符串。 |

## 请求示例

- 请求 URL  
    ```
    https://cloudrecord-api.zego.im/?Action=DescribeRecordStatus
    &AppId=1234567890
    &SignatureNonce=15215528852396
    &Timestamp=1234567890
    &Signature=7a2c0f11145fb760d607a07b54825013
    &SignatureVersion=2.0
    ```
- 请求消息体  
    ```json
    {
        "TaskId": "X3CgNeE4I1qAAABN"
    }
    ```

## 响应参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| Code | Int64 | 错误码。 |
| Message | String | 错误描述。 |
| RequestId | String | 请求 ID。 |
| Data | Object | 响应对象。 |
| └RoomId | String | 录制的目标房间。 |
| └RecordMode | Int | 请参考 <a href="/cloud-recording-server/start" target="_blank">开始录制</a>。 |
| └StreamType | Int | 请参考 <a href="/cloud-recording-server/start" target="_blank">开始录制</a>。 |
| └RecordBeginTimestamp | Int64 | 录制任务开始的时间，为 Unix 时间戳，单位：ms。 |
| └RecordEndTimestamp | Int64 | 录制任务结束的时间，为 Unix 时间戳，单位：ms。 |
| └Status | Int | <p>录制任务的状态。</p><ul><li>1：录制任务初始化</li><li>2：录制任务进行中</li><li>3：录制任务已结束</li><li>4：录制任务异常结束</li><li>5：录制任务暂停中</li></ul> |
| └RecordFiles | Array of Object | 文件信息。<br />详见 <a href="#recordfiles">RecordFiles 属性列表</a>。<br />如果使用了视频截图功能，则不返回该字段。 |

<Warning title="注意">录制任务为已结束状态时，如果录制过程中房间内无用户推流，则不会产生录制文件，也不会返回 RecordFiles 字段。</Warning>

<span id="recordfiles"></span>
**RecordFiles**

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| UserId | String | 录制流对应的推流用户 ID（混流时，为 MixOutputStreamId）。 |
| UserName | String | 录制流对应的推流用户昵称（混流时，为 MixOutputStreamId）。 |
| StreamId | String | 录制流对应的流 ID（混流时，为 MixOutputStreamId）。 |
| FileId | String | 请参考 <a href="/cloud-recording-server/start" target="_blank">开始录制</a> 中的 OutputFileRule 参数。 |
| VideoId | String | 阿里云 Vod、腾讯云 Vod 上传成功得到的视频 ID 参数。阿里云 Vod 对应的是 VideoId，腾讯云 Vod 对应的是 FileId。 |
| FileUrl | String | 文件访问 URL。第三方存储为七牛云或阿里云 Vod 时不返回。 |
| OutputFileFormat | String | 输出录制文件的格式，包括"mp4"、"flv"、"hls"、"jpg" 和 "aac"。 |
| FileSize | Int64 | 文件大小，单位：字节。 |
| Duration | Int | 文件时长，单位：ms。 |
| ResolutionWidth | Int | 视频分辨率宽，单位：像素。 |
| ResolutionHeight | Int | 视频分辨率高，单位：像素。 |
| MediaTrackType | Int | 文件媒体类型。<ul><li>1：只有音频</li><li>2：只有视频</li><li>3：音视频</li></ul> |
| BeginTimestamp | Int64 | 开始录制文件时的 Unix 时间戳，单位：ms。 |
| Status | Int | 文件状态。<ul><li>1：录制中，表示正在录制文件。</li><li>2：上传中，表示正在上传录制文件至客户指定云存储。</li><li>3：上传成功，表示上传录制文件至客户指定云存储成功。</li><li>4：已经上传至备份云存储，表示上传客户指定云存储失败，已上传至 ZEGO 备份云存储。<b>请注意，ZEGO 备份云存储的有效期为 3 天，请您及时下载录制文件，保存到本地。</b></li><li>5：上传失败，表示上传客户指定云存储和 ZEGO 备份云存储均失败。</li></ul> |

## 响应示例

```json
{
    "Code": 0,
    "Message": "succeed",
    "RequestId": "abcd123",
    "Data": {
        "RoomId": "xxxx",
        "RecordMode": 2,
        "StreamType": 3,
        "RecordBeginTimestamp": 1601221452099,
        "RecordEndTimestamp": 1601221508795,
        "Status": 3,
        "RecordFiles": [
            {
                "UserId": "my_out",
                "UserName": "my_out",
                "StreamId": "my_out",
                "FileId": "X3CgNeE4I1qAAABN_xxxx_my_out_VA_20200927154419775.mp4",
                "VideoId": "820e50e52e0a490caf44eec8aec527a7",
                "OutputFileFormat": "mp4",
                "FileSize": 432643544,
                "Duration": 33874,
                "ResolutionWidth": 1920,
                "ResolutionHeight": 1080,
                "MediaTrackType": 3,
                "BeginTimestamp": 1601221459830,
                "Status": 3,
                "FileUrl": "https://xxxx.com/record/X3CgNeE4I1qAAABN_xxxx_my_out_VA_20200927154419775.mp4"
            }
        ]
    }
}
```
