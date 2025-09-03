# 删除房间流

---


## 描述

调用本接口删除某个房间的指定流，与 [踢出房间用户](https://doc-zh.zego.im/article/19569) 不同的是，这路流对应的用户是仍在房间内的。可通过本接口强制“下麦”某个用户，或者在“一起看”场景里删掉增加的 CDN 直播流。

本接口仅用于抛出房间内流删除的相关通知，不会执行实际的停止推流操作。开发者需要从自己的客户端，调用 `stopPublishingStream` 接口停止推流，才会停止向流媒体传输音视频数据；相应的拉流端，需要调用客户端 `stopPlayingStream` 接口停止拉流，才会停止从流媒体接收音视频数据。


客户端接收房间内流减少的通知使用 ZEGO SDK 回调接口：

| |ZegoExpress SDK|LiveRoom SDK|
|-|-|-|
|iOS/macOS| onRoomStreamUpdate | onStreamUpdated | 
|Android| onRoomStreamUpdate | onStreamUpdated | 
|Windows| onRoomStreamUpdate |  OnStreamUpdated | 
|Web| roomStreamUpdate | onStreamUpdated | 


## 接口原型

- 请求方法：GET
- 请求地址：`https://rtc-api.zego.im/?Action=DeleteStream`
- 传输协议：HTTPS
- 调用频率限制（同一个 AppID 下所有房间）：10 次/秒（测试环境：1 次/秒）


## 请求参数

以下请求参数列表仅列出了接口请求参数和部分公共参数，完整公共参数列表请参考 完整公共参数列表请参考 [调用方式](/live-streaming-server/api-reference/accessing-server-apis#公共请求参数) 中的 “公共请求参数”。


<table>
  
  <tbody><tr>
    <th>参数</th>
    <th>类型</th>
    <th>是否必选</th>
    <th>描述</th>
  </tr>
  <tr>
    <td>RoomId</td>
    <td>String</td>
    <td>是</td>
    <td>房间 ID。</td>
  </tr>
  <tr>
    <td>UserId</td>
    <td>String</td>
    <td>是</td>
    <td>用户 ID。</td>
  </tr>
  <tr>
    <td>UserName</td>
    <td>String</td>
    <td>否</td>
    <td>用户名。</td>
  </tr>
  <tr>
    <td>StreamId</td>
    <td>String</td>
    <td>是</td>
    <td>流 ID。</td>
  </tr>
</tbody></table>

<Warning title="注意">



调用本服务端接口时：
- 不建议使用与房间内实际用户相同的 UserId，避免与客户端 SDK 的流删除行为产生冲突。可以使用特定的名称标识为服务端行为，例如：userId = “Server-Administrator”。
- 如果使用了与房间内实际用户相同的 UserId（不建议）时，相应操作人 UserId 的客户端不会收到本服务端接口触发的流删除回调，房间内的其他用户会收到流删除回调。

</Warning>



## 请求示例

```
https://rtc-api.zego.im/?Action=DeleteStream
&RoomId=room1
&UserId=user1
&UserName=userName
&StreamId=streamId1    
&<公共请求参数>
```

## 响应参数


<table>

<thead>
  <tr>
    <th>参数</th>
    <th>类型</th>
    <th>描述</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>Code</td>
    <td>Int32</td>
    <td>返回码。</td>
  </tr>
  <tr>
    <td>Message</td>
    <td>String</td>
    <td>操作结果描述。</td>
  </tr>
  <tr>
    <td>RequestId</td>
    <td>String</td>
    <td>请求 ID。</td>
  </tr>
</tbody>
</table>


## 响应示例

```json
{
    "Code":0,
    "Message":"success",
    "RequestId":"5885338326725063742"
}
```

## 返回码

以下仅列出了接口业务逻辑相关的部分返回码，完整返回码请参考 [全局返回码](https://doc-zh.zego.im/)。

|返回码|说明| 处理建议 |
|-----|----|----|
| 124 | 删除流信息失败。 | 请重试，或联系 ZEGO 技术支持处理。 |
| 138 | 流信息不存在。 | 请重试，或联系 ZEGO 技术支持处理。 |
