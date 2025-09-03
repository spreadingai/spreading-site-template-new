# 踢出房间用户

---


## 描述

调用本接口踢出房间内的指定用户，该用户当前的推流和拉流会全部停止。多用于内容审核场景下，开发者后台发现某个用户的直播内容违规时，可通过本接口将该用户踢出房间。




客户端被踢的用户会收到 ZEGO SDK 回调接口：

| |ZegoExpress SDK|LiveRoom SDK|
|-|-|-|
|iOS/macOS| onRoomStateChanged | onKickOut | 
|Android| onRoomStateChanged | onKickOut | 
|Windows| onRoomStateChanged |  OnKickOut | 
|Web/小程序| roomStateChanged | onKickOut | 


客户端接收房间内用户变更的通知使用 ZEGO SDK 回调接口：

| |ZegoExpress SDK|LiveRoom SDK|
|-|-|-|
|iOS/macOS| onRoomUserUpdate | onUserUpdate | 
|Android| onRoomUserUpdate | onUserUpdate | 
|Windows| onRoomUserUpdate |  OnUserUpdate | 
|Web/小程序| roomUserUpdate | onUserStateUpdate | 



## 接口原型

- 请求方法：GET
- 请求地址：`https://rtc-api.zego.im/?Action=KickoutUser`
- 传输协议：HTTPS
- 调用频率限制（同一个 AppID 下所有房间）：50 次/秒



## 请求参数

以下请求参数列表仅列出了接口请求参数和部分公共参数，完整公共参数列表请参考 [调用方式](/real-time-voice-server/api-reference/accessing-server-apis#公共请求参数) 中的 “公共请求参数”。


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
    <td>UserId[]</td>
    <td>Array of String</td>
    <td>是</td>
    <td>踢出房间的用户 ID 列表，最大支持 5 个用户 ID。<br />示例：UserId[]=a&UserId[]=b</td>
  </tr>
  <tr>
    <td>CustomReason</td>
    <td>String</td>
    <td>否</td>
    <td><p>踢人原因，最大长度为 256 字节。</p><p>使用时，请对该参数内容进行 UrlEncode。</p></td>
  </tr>
</tbody>
</table>


## 请求示例

```
https://rtc-api.zego.im/?Action=KickoutUser
&RoomId=room1
&UserId[]=a&UserId[]=b
&CustomReason=%E8%B8%A2%E5%87%BA%E7%94%A8%E6%88%B7-%E5%8E%9F%E5%9B%A0
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
    "RequestId":"343649807833778782"
}
```

## 返回码

以下仅列出了接口业务逻辑相关的部分返回码，完整返回码请参考 [全局返回码](https://doc-zh.zego.im/)。

|返回码|说明| 处理建议 |
|-----|----|----|
| 50011 | 用户列表长度过长。 | 请检查请求包中的用户个数是否超过限制。 |
