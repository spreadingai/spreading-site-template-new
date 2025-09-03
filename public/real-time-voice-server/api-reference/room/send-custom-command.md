# 推送自定义消息

---


## 描述

调用本接口在房间内推送自定义消息，即向同一房间内指定的单个或多个用户发送信令消息。

客户端接收消息使用 ZEGO SDK 回调接口：

| 平台 |ZegoExpress SDK|LiveRoom SDK|
|-|-|-|
|iOS/macOS| onIMRecvCustomCommand | onReceiveCustomCommand | 
|Android| onIMRecvCustomCommand | onRecvCustomCommand | 
|Windows| onIMRecvCustomCommand |   OnRecvCustomCommand | 
|Web| IMRecvCustomCommand | onRecvCustomCommand | 




## 接口原型

- 请求方法：GET
- 请求地址：`https://rtc-api.zego.im/?Action=SendCustomCommand`
- 传输协议：HTTPS
- 调用频率限制（同一个 AppID 下所有房间）：100 次/秒（测试环境：10 次/秒）


## 请求参数

以下请求参数列表仅列出了接口请求参数和部分公共参数，完整公共参数列表请参考 完整公共参数列表请参考 [调用方式](/real-time-voice-server/api-reference/accessing-server-apis#公共请求参数) 中的 “公共请求参数”。


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
    <td>FromUserId</td>
    <td>String</td>
    <td>是</td>
    <td>发送方用户 ID。</td>
  </tr>
  <tr>
    <td>ToUserId[]</td>
    <td>Array of String</td>
    <td>否</td>
    <td>自定义消息目的用户 ID，最大支持 10 个目的用户 ID。<br />如果不填写该参数，自定义消息广播给房间内所有用户；如果填写了该参数，自定义消息只推送到目的用户。<br />示例：ToUserId[]=user1&ToUserId[]=user2</td>
  </tr>
  <tr>
    <td>MessageContent</td>
    <td>String</td>
    <td>是</td>
    <td><p>自定义消息内容，长度不能超过 1024 个字节。</p><p>使用时，请对该参数内容进行 UrlEncode。</p></td>
  </tr>
</tbody>
</table>

<Warning title="注意">


- 在服务端通过某个 FromUserId 发送消息时，使用相同 FromUserId 的客户端不会收到该条消息，即发送方不能接收到自己发送的消息。
- 如果开发者需要让房间内的所有用户都收到消息，调用本接口时，应传入该房间用户之外的 FromUserId。
- 使用的 FromUserId 无需登录该房间，即可直接发送消息。

</Warning>



## 请求示例

```
https://rtc-api.zego.im/?Action=SendCustomCommand
&RoomId=room
&FromUserId=userA
&ToUserId[]=user1&ToUserId[]=user2
&MessageContent=%E6%8E%A8%E9%80%81%E8%87%AA%E5%AE%9A%E4%B9%89%E4%BF%A1%E6%81%AF-%E6%96%B0%E6%8E%A5%E5%8F%A3
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
    <td>└ FailUsers</td>
    <td>Array of Object</td>
    <td>处理失败的目标用户 ID 列表。</td>
  </tr>
  <tr>
    <td>&nbsp;&nbsp;└ Uid</td>
    <td>String</td>
    <td>用户 ID。</td>
  </tr>
  <tr>
    <td>&nbsp;&nbsp;└ Code</td>
    <td>Int32</td>
    <td>失败的错误码（不在线：50003）。</td>
  </tr>
</tbody>
</table>


## 响应示例

```json
{
    "Code": 0,
    "Message": "success",
    "RequestId": "3005402395393320157",
    "Data": {
        "FailUsers": [{
            "Uid": "1111",
            "Code": 50003
        }]
    }
}
```

## 返回码

以下仅列出了接口业务逻辑相关的部分返回码，完整返回码请参考 [全局返回码](https://doc-zh.zego.im/)。

|返回码|说明| 处理建议 |
|-----|----|----|
| 50003 | 查找用户在线信息失败。 | 请确认请求用户 UserId 是否在线。 |
| 50011 | 用户列表长度过长。 | 请检查请求包中的用户个数是否超过限制。 |
| 50012 | 消息长度超过限制。 | 请检查参数长度是否超过限制。|
| 50013 | 发送自定义消息失败。 | 请重试，或联系 ZEGO 技术支持处理。 |
