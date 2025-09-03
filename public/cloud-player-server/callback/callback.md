
# 回调
---


## 描述

凭借本回调，您可以监听与播放器任务和上传任务相关的事件。

## 回调说明

- 回调方法：POST
- 回调地址：请联系 ZEGO 技术支持进行配置
    <Note title="说明">回调数据格式为 JSON，您需要对其进行 UrlDecode 解码。</Note>
- 传输协议：HTTP 协议

## 回调参数

<Note title="说明">
回调的相关参数，ZEGO 会在之后的迭代计划中，持续优化更新（例如：新增字段、或新增某些字段的参数取值）。开发者在接入时，请避免将代码写死，造成后期更新后，无法兼容新版本。
</Note>

| <div style={{width:"4em"}}>参数</div>      | <div style={{width:"4em"}}>类型</div>   | 描述     |
| -------- | ----- | ----------- |
| AppID     | Number | ZEGO 给开发者 APP 的唯一标识。  |
| RoomId    | String | （适用于播放器任务相关事件）房间 ID。   |
| PlayerId  | String | （适用于播放器任务相关事件）云端播放器唯一标识 ID。     |
| UploadTaskId | String | （适用于上传任务相关事件）上传任务 ID。 |
| EventType | Number | 事件通知类型。<ul><li>云端播放器任务相关：<ul><li>1：云端播放器创建成功。</li><li>2：云端播放器销毁成功。</li><li>3：云端播放器状态改变。 </li><li>4：云端播放器异常通知。</li></ul></li><li>上传任务相关：<ul><li>10001：文件上传成功。</li><li>10002：文件上传失败。</li><li>10003：上传任务状态改变。</li><li>10004：取消操作失败。</li><li>10005：上传发生异常。</li><li>10006：上传文件过期。</li></ul></li></ul>|
| Nonce     | String | 随机数，用于检验串计算。   |
| Timestamp | String | 回调发送时的 Unix 时间戳（秒），用于检验串计算。  |
| Signature | String | 检验串，验证回调发送方身份。   |
| EventTime | Number | 事件在云端播放服务器上发生的 Unix 时间戳（毫秒），开发者可根据该字段判断回调顺序。 |
| Detail    | Object | 事件详细信息。详情请参考 [Detail](#detail)。    |

### Detail

根据 `EventType` 取值不同，detail 的属性不同。

<Tabs>
<Tab title="1">
| <div style={{width:"4em"}}>参数</div>        | <div style={{width:"4em"}}>类型</div>   | 描述       |
| :---------- | :----- | :-------- |
| CreateTime  | Number | 云端播放器创建成功的 Unix 时间戳（秒）。  |
| PlayTime    | Number | 云端播放器开始播放媒体流的 Unix 时间戳（秒）。  |
| MaxIdleTime | Number | 云端播放器处于空闲状态的最大时长（秒），即媒体流为非播放状态的最大时长。 |
| StreamUrl   | String | 媒体资源的地址。 |
</Tab>
<Tab title="2">
| <div style={{width:"4em"}}>参数</div>     | <div style={{width:"4em"}}>类型</div>   | 描述    |
| :------- | :----- | :------ |
| PlayTime | Number | 云端播放器开始播放媒体流的 Unix 时间戳（秒）。                             |
| Reason   | Number | 云端播放器销毁的原因。<ul><li>1：调用了 [DeletePlayer](/cloud-player-server/delete-player) 接口主动销毁。</li><li>2：处于空闲状态的时长超过了 MaxIdleTime。</li><li>3：媒体资源播放已结束。</li><li>4：推流失败。</li><li>5：进入房间失败、或被踢出房间。</li></ul> |
</Tab>
<Tab title="3">
| <div style={{width:"4em"}}>参数</div>   | <div style={{width:"4em"}}>类型</div>   | 描述        |
| :----- | :----- | :------------- |
| Status | Number | 云端播放器的状态。<ul><li>1：创建中。</li><li>2：连接媒体资源中。</li><li>3：等待播放。</li><li>4：播放中。</li><li>5：暂停中。</li><li>6：连接媒体资源失败。</li><li>7：播放结束。</li><li>8：已销毁。</li></ul> |
</Tab>
<Tab title="4">
| <div style={{width:"4em"}}>参数</div>   | <div style={{width:"4em"}}>类型</div>   | 描述        |
| :----- | :----- | :------------- |
| Code | Number | 异常类型。<ul><li>-1：资源加载超时。</li><li>-2：seek 超时。</li><li>-3：seek 失败。</li><li>-4：音频渲染帧率异常。</li><li>-5：解码数据出错。</li><li>-6：音画不同步。</li><li>-7：播放卡顿。</li><li>1：播放进度异常。</li><li>2：视频推流帧率异常（正常检测）。<Note title="说明">正常检测，是指在非流控状态下，推流帧率连续两次小于基准帧率的 90%，ZEGO 会在连续触发两次时回调异常给您。</Note></li><li>3：视频推流帧率异常（严格检测）。<Note title="说明"><ul><li>严格检测，是指在正常检测的基础上新增一个检测规则，即当推流帧率连续 3 次低于配置帧率的 40%，或者出现一次推流帧率为 0，ZEGO 会立即回调异常给您。</li><li>严格检测默认关闭，如需开启，请联系 ZEGO 技术支持。</li></ul></Note></li><li>4：音频推流帧率异常。</li><li>5：流控状态持续时间超过 5 分钟。</li></ul> |
</Tab>
<Tab title="10001 或 10006">
空
</Tab>
<Tab title="10002">
| <div style={{width:"4em"}}>参数</div>     | <div style={{width:"4em"}}>类型</div>   | 描述    |
| :------- | :----- | :------ |
| Reason   | Number | 失败原因。<ul><li>1：下载 StreamUrl 资源失败。</li><li>2：上传发生错误，此时 ZEGO 服务器不会会再重试。<Note title="说明">如果您在 [创建上传任务](/cloud-player-server/describe-upload-tasks) 时使用了 <code>ContentMd5</code> 参数，请检查传入的值是否正确。若传入的值正确，请联系 ZEGO 技术支持处理。</Note></li><li>3：资源文件大小超限。</li></ul> |
</Tab>
<Tab title="10003">
| <div style={{width:"4em"}}>参数</div>   | <div style={{width:"4em"}}>类型</div>   | 描述        |
| :----- | :----- | :------------- |
| Status | Number | 任务状态。<ul><li>1：等待中。</li><li>2：上传中。</li><li>3：已取消。</li></ul> |
</Tab>
<Tab title="10004">
| <div style={{width:"4em"}}>参数</div>   | <div style={{width:"4em"}}>类型</div>   | 描述                                                                          |
| :----- | :----- | :---------------------------------------------------------------------------- |
| Reason | Number | 取消操作失败原因：<ul><li>1：文件正在上传。</li><li>2：文件已上传。</li></ul> |
</Tab>
<Tab title="10005">
| <div style={{width:"4em"}}>参数</div>   | <div style={{width:"4em"}}>类型</div>   | 描述        |
| :----- | :----- | :------------- |
| Code | Number | 上传状态：<ul><li>1：未知异常。</li><li>2：上传发生错误。<Note title="说明">如果您在 [创建上传任务](/cloud-player-server/create-upload-task) 时使用了 <code>ContentMd5</code> 参数，请检查传入的值是否正确。若传入的值正确，请联系 ZEGO 技术支持处理。</Note></li></ul>此时 ZEGO 服务器会再次重试上传。 |
</Tab>
</Tabs>

云端播放器检测到上述异常事件后，内部会自动进行重试。如果短时间内多次收到该类异常回调通知，开发者需要检查资源服务器访问是否正常、或做其它容错处理。


## 回调示例

<Tabs>
<Tab title="创建云端播放器">
以下是调用 [CreatePlayer](/cloud-player-server/create-player) 接口创建云端播放器成功的回调示例。

```json
{
    "AppID": 123456789,
    "RoomId": "room_12",
    "PlayerId": "XXXXXX",
    "PlayerName": "XXXXXX",
    "EventType": 1,
    "Nonce": "abcdd22113",
    "Timestamp": "1681221510",
    "Signature": "XXXXXXX",
    "EventTime": 1681221510034,
    "Detail": {
        "CreateTime": 1681221508,
        "PlayTime": 1681221508,
        "MaxIdleTime": 30,
        "StreamUrl": "https://xxx.com/video/test.mp4"
    }
}
```
</Tab>
<Tab title="创建上传任务">
以下是调用 [CreateUploadTask](/cloud-player-server/create-upload-task) 接口创建上传任务的回调示例。

```json
{
    "AppID":"123456789",
    "Detail":{},
    "EventTime":"1737451074593",
    "EventType":10001,
    "Nonce":"947227",
    "Signature":"xxxxx",
    "StreamUrl":"https://your_streamurl","Timestamp":"1737451074",
    "Title":"720.mp4",
    "UploadTaskId":"678f663727b2d80007000001"
}
```
</Tab>
</Tabs>

## 返回响应

返回 HTTP status code 为 2XX （例如 200）表示成功，其他响应都表示失败。

## 回调重试策略

如果 ZEGO 服务器没有收到响应，会立刻尝试重试，最多进行 2 次重试。若第 2 次重试后仍然失败，将不再重试，该回调丢失。
