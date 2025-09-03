
# 查询云端播放器任务列表

- - -

## 描述

调用本接口查询 AppID 下所有的云端播放器任务列表，包含已创建、正在运行中、已销毁等所有状态；或查询指定云端播放器的任务信息。

## 接口原型

- 请求方法：POST
- 请求地址：`https://cloud-player-api.zego.im/?Action=DescribePlayers`
- 传输协议：HTTPS
- 调用频率限制：10 次/秒

## 请求参数

以下请求参数列表仅列出了接口请求参数，公共参数列表请参考 [调用方式 - 公共请求参数](/cloud-player-server/accessing-server-apis#公共请求参数)。

<Warning title="注意">
- RoomId 和 PlayerId 都不填写时，调用本接口会返回 AppId 下所有的云端播放器任务列表。
- RoomId 填写、PlayerId 不填写时，调用本接口会返回 AppId 下该房间 RoomId 内的所有的云端播放器任务列表。
- PlayerId 填写（RoomId 填或不填均可）时，调用本接口会返回该 PlayerId 对应的云端播放器任务信息。
</Warning>

| 参数 | 类型 | 是否必选 | 描述 |
|------|------|----------|------|
| RoomId | String | 否 | 查询指定房间 ID，长度在 128 字节以内。<strong>如果填写了 RoomId，请确保 RoomId 是已存在的，否则查询结果可能为空。</strong> |
| PlayerId | String | 否 | 云端播放器唯一标识 ID，通过 [CreatePlayer](/cloud-player-server/create-player) 返回。<strong>如果填写了 PlayerId，请确保 PlayerId 是已存在的，否则查询结果可能为空。</strong> |
| PageSize | Number | 否 | 分页大小，取值范围 (0, 50]，默认为 50 个/页，指调用本接口一次最多返回的任务列表数量。<strong>超过 PageSize 取值的任务列表，需要根据前一次调用本接口时、返回结果中的 NextPageToken（查询任务列表分页起始位）取值，再次调用本接口进行查询。</strong>例如，当前有 123 个云端播放器任务，PageSize 取值为 50，调用本接口查询时：<ol><li>第一次调用本接口，入参 PageToken 传空，查询第 1 ～ 50 的播放器任务；返回结果中 NextPageToken 值假设为  "pagetoken1"。</li><li>第二次调用本接口，入参 PageToken 取值为 "pagetoken1"，查询第 51 ～ 100 的播放器任务；返回结果中 NextPageToken 值假设为 "pagetoken2"。</li><li>第三次调用本接口，入参 PageToken 取值为 "pagetoken2"，查询第 101 ～ 123 的播放器任务；查询完毕，返回结果中 NextPageToken 为空。</li></ol> |
| PageToken | String | 否 | 查询任务列表分页起始位，<strong>该参数不填写时，默认返回查询到的第一页任务列表。</strong><br />每次调用本接口发起请求时，响应结果中都会返回 NextPageToken，开发者需要判断是否查询到最后一页。 |


## 请求示例

- 请求 URL
  
    ```
    https://cloud-player-api.zego.im/?Action=DescribePlayers
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
        "RoomId": "room_12",
        "PlayerId": "",
        "PageSize": 50,
        "PageToken": "XXXXXXXXX"
    }
    ```

## 响应参数

| 参数 | 类型 | 描述 |
|------|------|------|
| Code | Number | 错误码。 |
| Message | String | 错误描述。 |
| RequestId | String | 请求 ID。 |
| Data | Object | 返回的具体信息。 |
| └TotalSize | Number | 查询到的云端播放器任务总数。 |
| └NextPageToken | String | 本次查询的下一页页码。NextPageToken 为空时，表示已查询到最后一页。 |
| └Players | Array Of Object | 查询到的云端播放器任务信息，详情请参考 [Players](#players)。 |

### Players
| 参数 | 类型 | 描述 |
|------|------|------|
| PlayerId | String | 云端播放器唯一标识 ID。 |
| RoomId | String | 房间 ID。 |
| StreamId | String | 推流到指定房间的流 ID。 |
| CreateTime | Number | 播放器创建时间，Unix 时间戳，单位为秒。 |
| PlayTime | Number | 开始播放媒体资源的时间，Unix 时间戳，单位为秒。 |
| PlayerName | String | 云端播放器的名称。 |
| StreamUrl | String | 播放的媒体资源的地址。 |
| Status | Number | 云端播放器的状态。<ul><li>1：创建中。</li><li>2：连接媒体资源中。</li><li>3：等待播放。</li><li>4：播放中。</li><li>5：暂停中。</li><li>6：连接媒体资源失败。</li><li>7：播放结束。</li><li>8：已销毁。</li></ul> |
| DestroyReason | Number | 云端播放器销毁的原因。<ul><li>1：调用了 [DeletePlayer](/cloud-player-server/delete-player) 接口主动销毁。</li><li>2：处于空闲状态的时长超过了 <code>MaxIdleTime</code>。</li><li>3：媒体资源播放已结束。</li><li>4：推流失败。</li><li>5：进入房间失败或被踢出房间。</li></ul> |

## 响应示例

```json
{
    "Code": 0,
    "Message": "succeed",
    "RequestId": "abcd123",
    "Data": {
        "TotalSize": 1,
        "NextPageToken": "",
        "Players": [
            {
                "PlayerId": "player_1",
                "RoomId": "room_12",
                "StreamId": "stream",
                "CreateTime": 1681221508,
                "PlayTime": 1681221508,
                "PlayerName": "player_1",
                "StreamUrl": "https://xxx.com/video/test.mp4",
                "Status": 4,
                "DestroyReason": 1
            }
        ]
    }
}
```

## 返回码

以下仅列出了接口业务逻辑相关的返回码，完整返回码请参考 [全局返回码](/cloud-player-server/return-codes)。

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
