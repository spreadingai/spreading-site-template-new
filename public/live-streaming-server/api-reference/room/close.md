# 关闭房间

- - -

## 描述

调用本接口将把房间内所有用户从房间移出，并关闭房间。

如果开发者已参考 [回调配置说明](https://doc-zh.zego.im/article/19662)，配置了 [退出房间回调](https://doc-zh.zego.im/article/19672)、[流关闭回调](https://doc-zh.zego.im/article/19678)，服务端调用本接口时：

- 服务端会收到 [退出房间回调](https://doc-zh.zego.im/article/19672) 通知，开发者可以了解用户退出房间的情况。
- 原房间内的流的状态为关闭，服务端会收到 [流关闭回调](https://doc-zh.zego.im/article/19678)，开发者可以知悉有关房间内流关闭的信息。

房间关闭后，客户端用户会被踢出房间，会收到 ZEGO SDK 回调接口：   

| |ZegoExpress SDK|LiveRoom SDK|
|-|-|-|
|iOS/macOS| onRoomStateChanged | onKickout | 
|Android| onRoomStateChanged | onKickout | 
|Windows| onRoomStateChanged | OnKickOut | 
|Web| roomStateChanged | onKickout | 


## 接口原型

- 请求方法：GET
- 请求地址：`https://rtc-api.zego.im/?Action=CloseRoom`
- 传输协议：HTTPS
- 调用频率限制（同一个 AppID 下所有房间）：1 次/秒（测试环境：1 次/秒）



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
<td>CustomReason</td>
<td>String</td>
<td>否</td>
<td><p>关闭原因，最大长度为 256 字节。</p><p>使用时，请对该参数内容进行 UrlEncode。</p></td>
</tr>
<tr>
<td>RoomCloseCallback</td>
<td>Boolean</td>
<td>否</td>
<td>
<p>是否产生 <a href="https://doc-zh.zego.im/article/19666" target="_blank">房间关闭回调</a>，默认为 false。</p><p>由于通常是开发者主动发起的关闭行为，故不再另行通过 <a href="https://doc-zh.zego.im/article/19666" target="_blank">房间关闭回调</a> 通知开发者。如果您需要通过 <a href="https://doc-zh.zego.im/article/19666" target="_blank">房间关闭回调</a> 进行统一的逻辑处理，可自行修改为 true。</p>

<Note title="说明">
<p>该参数只影响是否产生 <a href="https://doc-zh.zego.im/article/19666" target="_blank">房间关闭回调</a>，其他原因导致房间关闭的回调通知（例如 <a href="https://doc-zh.zego.im/article/19672" target="_blank">退出房间回调</a>）不受影响。</p>
</Note>

</td>
</tr>
</tbody></table>


## 请求示例

```html
https://rtc-api.zego.im/?Action=CloseRoom
&RoomId=room1
&CustomReason=clear
&RoomCloseCallback=false
&<公共请求参数>
```

## 响应参数


<table>
  
  <tbody><tr>
    <th>参数</th>
    <th>类型</th>
    <th>描述</th>
  </tr>
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
    "Code": 0,
    "Message": "success",
    "RequestId": "TestRequestId1642755866616219000"
}
```

## 返回码

以下仅列出了接口业务逻辑相关的部分返回码，完整返回码请参考 [全局返回码](https://doc-zh.zego.im/)。

|返回码|说明| 处理建议 |
|-----|----|----|
| 5018 | 房间已销毁或不存在。 | 请确认请求房间 RoomId 是否存在。 |
| 5024 | 房间不存在，与 104、50001 内部判断逻辑相同。 | 请确认请求房间 RoomId 是否存在。 |
