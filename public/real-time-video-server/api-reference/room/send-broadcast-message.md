# 推送广播消息

---

## 描述

调用本接口在房间内推送广播消息，即向同一房间内所有用户发送文本消息。


客户端接收消息使用 ZEGO SDK 回调接口：

| |ZegoExpress SDK|LiveRoom SDK|
|-|-|-|
|iOS/macOS| onIMRecvBroadcastMessage | onRecvRoomMessage | 
|Android| onIMRecvBroadcastMessage | onRecvRoomMessage | 
|Windows| onIMRecvBroadcastMessage | OnRecvRoomMessage | 
|Web| IMRecvBroadcastMessage | onRecvRoomMsg | 


## 接口原型

- 请求方法：GET
- 请求地址：`https://rtc-api.zego.im/?Action=SendBroadcastMessage`
- 传输协议：HTTPS
- 调用频率限制（同一个 AppID 下所有房间）：100 次/秒（测试环境：10 次/秒）



## 请求参数

以下请求参数列表仅列出了接口请求参数和部分公共参数，完整公共参数列表请参考 完整公共参数列表请参考 [调用方式](/real-time-video-server/api-reference/accessing-server-apis#公共请求参数) 中的 “公共请求参数”。


<table>

<thead>
  <tr>
    <th>参数</th>
    <th>类型</th>
    <th>是否必选</th>
    <th>描述</th>
  </tr>
</thead>
<tbody>
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
    <td>发送方用户 ID。</td>
  </tr>
  <tr>
    <td>UserName</td>
    <td>String</td>
    <td>否</td>
    <td>发送方用户名（与 UserId 一一对应）。</td>
  </tr>
  <tr>
    <td>MessageCategory</td>
    <td>UInt32</td>
    <td>是</td>
    <td>消息分类。<ul><li>1：系统消息。</li><li>2：聊天消息。</li></ul>一般为聊天消息。</td>
  </tr>
  <tr>
    <td>MessageContent</td>
    <td>String</td>
    <td>是</td>
    <td><p>消息内容，长度不能超过 1024 个字节。</p><p>使用时，请对该参数内容进行 UrlEncode。</p></td>
  </tr>
</tbody>
</table>

<Warning title="注意">
- 在服务端通过某个 UserId 发送消息时，使用相同 UserId 的客户端不会收到该条消息，即发送方不能接收到自己发送的消息。
- 如果开发者需要让房间内的所有用户都收到消息，调用本接口时，应传入该房间用户之外的 UserId。
- 使用的 UserId 无需登录该房间，即可直接发送消息。
</Warning>



## 请求示例

```
https://rtc-api.zego.im/?Action=SendBroadcastMessage
&RoomId=room1
&UserId=user1
&UserName=userName
&MessageCategory=1
&MessageContent=hello+zego+big+im+-+%E5%B9%BF%E6%92%AD%E6%B6%88%E6%81%AF
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
  <tr>
    <td>Data</td>
    <td>Object</td>
    <td>响应数据。</td>
  </tr>
  <tr>
    <td>└ MessageId</td>
    <td>Number</td>
    <td>消息 ID。</td>
  </tr>
</tbody>
</table>


## 响应示例

```json
{
    "Code":0,
    "Data":{
        "MessageId":3
    },
    "Message":"success",
    "RequestId":"619831198646468496"
}
```

## 返回码

以下仅列出了接口业务逻辑相关的部分返回码，完整返回码请参考 [全局返回码](https://doc-zh.zego.im/)。

|返回码|说明| 处理建议 |
|-----|----|----|
| 121 | 保存广播消息失败。 |-|
| 122 | 生成 message ID 失败。 | 请重试，或联系 ZEGO 技术支持处理。 |
| 151 | 推送广播消息失败。 | 请重试，或联系 ZEGO 技术支持处理。|
| 5201 | 广播消息编码失败。 | 请重试，或联系 ZEGO 技术支持处理。|
| 5202 | 生成 message ID 失败。 | 请重试，或联系 ZEGO 技术支持处理。|
| 50012 | 消息长度超过限制。 | 请检查参数长度是否超过限制。|
