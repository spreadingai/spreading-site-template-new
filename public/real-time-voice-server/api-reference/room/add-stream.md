# 增加房间流

---


## 描述

调用本接口可向指定房间增加一路流。多用于“一起看”场景，比如将 CDN 的直播流添加到指定房间，从而让房间内的用户获取流 ID，实现服务端控制指定房间的直播内容。

<Warning title="注意">


- 往指定房间增加流时需要保证该房间是存在的，本接口无法创建房间。若您希望增加流时，自动创建对应房间，请联系 ZEGO 技术支持开启相关功能。
- 本接口一般与 [删除房间流](https://doc-zh.zego.im/article/19563) 配合使用，比如业务上需要停止向某个房间广播流。

</Warning>



本接口仅用于抛出房间内流增加的相关通知，不会执行实际的推流操作。开发者需要从自己的客户端，调用 `startPublishingStream` 接口进行推流（或其它的推流方式），该条被增加的流才能被 `startPlayingStream` 接口拉流到。



客户端接收房间内流增加的通知使用 ZEGO SDK 回调接口：

| |ZegoExpress SDK|LiveRoom SDK|
|-|-|-|
|iOS/macOS| onRoomStreamUpdate | onStreamUpdated | 
|Android| onRoomStreamUpdate | onStreamUpdated | 
|Windows| onRoomStreamUpdate |  OnStreamUpdated | 
|Web| roomStreamUpdate | onStreamUpdated | 


## 接口原型

- 请求方法：GET
- 请求地址：`https://rtc-api.zego.im/?Action=AddStream`
- 传输协议：HTTPS
- 调用频率限制（同一个 AppID 下所有房间）：10 次/秒（测试环境：1 次/秒）



## 请求参数

以下请求参数列表仅列出了接口请求参数和部分公共参数，完整公共参数列表请参考 完整公共参数列表请参考 [调用方式](/real-time-voice-server/api-reference/accessing-server-apis#公共请求参数) 中的 “公共请求参数”。


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
<td>流 ID，不超过 256 字节。</td>
</tr>
<tr>
<td>StreamTitle</td>
<td>String</td>
<td>否</td>
<td><p>流标题，不超过 127 字节。</p><p>使用时，请对该参数内容进行 UrlEncode。</p></td>
</tr>
<tr>
<td>ExtraInfo</td>
<td>String</td>
<td>否</td>
<td>流附加信息，不超过 1024 字节。</td>
</tr>
<tr>
<td>CensorFlag</td>
<td>Int32</td>
<td>否</td>
<td>
是否允许送审标识。审核房间流列表时，当前流是否允许审核：
- 0：允许（默认）。
- 1：不允许。

<Warning title="注意">


- 当设置为不允许送审时，审核服务商将不会拉取此条流送审。
- 在使用流注入方式实现跨房间 PK 的业务场景时，建议将此字段设置为"不允许"，以避免同一条流在多个房间内被重复送审。 

</Warning>


</td>
</tr>
</tbody></table>

<Warning title="注意">



调用本服务端接口时：    
- 不建议使用与房间内实际用户相同的 UserId，避免与客户端 SDK 的流新增行为产生冲突。可以使用特定的名称标识为服务端行为，例如：userId = “Server-Administrator”。
- 如果使用了与房间内实际用户相同的 UserId（不建议）时，需要注意以下事项：
  - 相应操作人 UserId 的客户端不会收到本服务端接口触发的流增加回调。
  - 如果实际房间内用户 UserId 没有推流，会触发相应 StreamId 的流删除逻辑。
  - 如果实际房间内用户 UserId 退出房间，会触发相应 StreamId 的流删除逻辑。

</Warning>




## 请求示例

```
https://rtc-api.zego.im/?Action=AddStream
&RoomId=room1
&UserId=user1
&UserName=userName
&StreamId=streamId1
&StreamTitle=%E6%B5%81%E6%A0%87%E9%A2%98
&ExtraInfo=%E9%99%84%E5%8A%A0%E4%BF%A1%E6%81%AF
&CensorFlag=0
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
    "RequestId":"4443515903608307334"
}
```

## 返回码

以下仅列出了接口业务逻辑相关的部分返回码，完整返回码请参考 [全局返回码](https://doc-zh.zego.im/)。

|返回码|说明| 处理建议 |
|-----|----|----|
| 123 | 设置流信息失败。 | 请重试，或联系 ZEGO 技术支持处理。 |
| 1012  | 多个用户操作同一个流。 | 请检查逻辑。 |
