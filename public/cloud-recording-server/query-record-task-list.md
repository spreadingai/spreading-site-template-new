

# 查询录制任务列表

- - -

## 描述

开始录制后，开发者可以通过调用本接口，查询正在录制或已结束录制的任务列表。

## 接口原型

- 请求方法：POST
- 请求地址：`https://cloudrecord-api.zego.im/?Action=DescribeTasks`
- 传输协议：HTTPS
- 调用频率限制：10 次/秒

## 请求参数

以下请求参数列表仅列出了接口请求参数和部分公共参数，完整公共参数列表请参考 [调用方式](/cloud-recording-server/making-api-requests#公共请求参数) 中的 “公共请求参数”。

| 参数 | 类型 | 是否必选 | 描述 |
|------|------|----------|------|
| Status | Int | 是 | <ul><li>2：表示正在录制的任务。</li><li>3：表示已结束录制的任务。</li></ul> |
| RoomId | String | 否 | 用于指定要查询录制任务的房间号。不填写时查询 AppId 下所有房间的录制任务。 |
| PageOffset | Int | 否 | 分页查询时的页码 ，从 1 开始。不填写或者填写为 0 时，默认为 1。 |
| PageSize | Int | 否 | 分页查询时每页的记录条数，该值需小于等于 50，并且大于 0。不填写时默认为 50。 |
| StartTime | Int64 | 是 | 查询的开始时间，为Unix 时间戳，单位：ms。开始时间不能早于当前时间的 3 天之前。 |
| EndTime | Int64 | 是 | 查询的结束时间，为Unix 时间戳，单位：ms。EndTime 必须大于 StartTime，且查询时间跨度不超过 3 天。接口仅返回录制开始时间在查询时间范围内的记录。 |


## 请求示例
- 请求 URL  
    ```
    https://cloudrecord-api.zego.im/?Action=DescribeTasks
    &AppId=1234567890
    &SignatureNonce=15215528852396
    &Timestamp=1234567890
    &Signature=7a2c0f11145fb760d607a07b54825013
    &SignatureVersion=2.0
    ```
- 请求消息体  
    ```json
    {
        "Status":2,
        "RoomId":"1230",
        "StartTime": 1628474401000,
        "EndTime": 1628475402000,
        "PageOffset": 1,
        "PageSize": 50
    }
    ```

## 响应参数

| 参数 | 类型 | 描述 |
|------|------|------|
| Code | Int64 | 错误码。 |
| Message | String | 错误描述。 |
| RequestId | String | 请求 ID。 |
| Data | Object | 响应对象。 |
| └PageOffset | Int | 分页查询时的页码。 |
| └PageSize | Int | 分页查询时每页的记录条数。 |
| └TotalCount | Int | 查询结果总数。 |
| └TaskList | JSON Array | 详见 <a href="#tasklist">TaskList 属性列表</a>。 |

<span id="tasklist"></span>
**TaskList**

| 参数名 | 类型 | 说明 |
|------|------|------|
| RecordBeginTimestamp | Int64 | 开始录制的时间戳。 |
| TaskId | String | 录制任务 ID。 |
| RoomId | String | 录制的目标房间 ID。 |
| Status | Int | 录制状态。<ul><li>1：录制任务初始化</li><li>2：录制任务进行中</li><li>3：录制任务已结束</li><li>4：录制任务异常结束</li><li>5：录制任务暂停中</li></ul> |

## 响应示例

```json
{
    "Code": 0,
    "Message": "succeed",
    "RequestId": "abcd123",
    "Data": {
        "PageOffset": 1,
        "PageSize": 50,
        "TotalCount": 3,
        "TaskidList": [
            {
                "RecordBeginTimestamp": 1628565227899,
                "TaskId": "YRHu6-E4IyvEAAAD",
                "RoomId": "1000",
                "Status": 2
            },
            {
                "RecordBeginTimestamp": 1628565226303,
                "TaskId": "YRHu6uE4IyvEAAAC",
                "RoomId": "1000",
                "Status": 2
            },
            {
                "RecordBeginTimestamp": 1628565222498,
                "TaskId": "YRHu5uE4IyvEAAAB",
                "RoomId": "1000",
                "Status": 2
            }
        ]
    }
}
```
