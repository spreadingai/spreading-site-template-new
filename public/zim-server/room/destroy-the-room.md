
# 销毁房间

- - -

## 描述

调用此接口，开发者可销毁房间。

客户端将通过 ZIM SDK 的回调接口，接收房间被销毁的消息通知。

| iOS-25% | Android-25% | macOS-25% | Windows-25% |
|-----|---------|--------|---------|
| [roomStateChanged](https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_ios~protocol~ZIMEventHandler#zim-room-state-changed-event-extended-data) | [onRoomStateChanged](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIMEventHandler#on-room-state-changed) | [roomStateChanged](https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_macos~protocol~ZIMEventHandler#zim-room-state-changed-event-extended-data) | [onRoomStateChanged](https://doc-zh.zego.im/article/api?doc=zim_API~cpp_windows~class~ZIMEventHandler#on-room-state-changed) |

| Web-25% | 小程序-25% | Flutter-25% | React Native-25% | 
|-----|---------|---------|---------|
| [roomStateChanged](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_web~interface~ZIMEventHandler#room-state-changed) | [roomStateChanged](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_wxxcx~interface~ZIMEventHandler#room-state-changed) | [onRoomStateChanged](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMEventHandler/onRoomStateChanged.html) | [OnRoomStateChanged](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~class~ZIMEventHandler#on-room-state-changed) |

| Unity3D-25% | uni-app \| uni-app x-25% | HarmonyOS-25% |
|---------|--------------|-----------|
| [OnRoomStateChanged](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~class~ZIMEventHandler#on-room-state-changed) | [roomStateChanged](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_uni-app~interface~ZIMEventHandler#room-state-changed) |[roomStateChanged](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_harmony~interface~ZIMEventHandler#room-state-changed) |



## 接口原型

- 请求方法：GET
- 请求地址：`https://zim-api.zego.im/?Action=DestroyRoom`
- 传输协议：HTTPS
- 调用频率限制：20 次/秒

## 请求参数

以下请求参数列表仅列出了接口请求参数和部分公共参数，完整公共参数列表请参考 [调用方式 - 公共请求参数](/zim-server/accessing-server-apis#2-公共参数)。

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
</tbody></table>

<Note title="说明">

RoomId 仅支持数字，英文字符和 {"'!'，'#'，'$'，'%'，'&'，'('，')'，'+'，'-'，':'，';'，'<'，'='，'.'，'>'，'?'，'@'，'['，']'，'^'，'_'，' '，'{'，'}'，'|'，'~'"}。
</Note>

## 请求示例

```json
https://zim-api.zego.im/?Action=DestroyRoom
&RoomId=123
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
    <td>Number</td>
    <td>返回码。</td>
  </tr>
  <tr>
    <td>Message</td>
    <td>String</td>
    <td>请求结果的说明信息。</td>
  </tr>
  <tr>
    <td>RequestId</td>
    <td>String</td>
    <td>请求 ID。</td>
  </tr>
</tbody></table>


## 响应示例

```json
{
    "Code":0,
    "Message":"success",
    "RequestId":"343649807833778782"
}
```


## 返回码

以下仅列出了接口业务逻辑相关的返回码，完整返回码请参考 [全局返回码](/zim-server/return-codes)。

<table>
<tbody><tr>
<th>返回码</th>
<th>说明</th>
</tr>
<tr>
<td>660300001</td>
<td>房间不存在。</td>
</tr>
</tbody>
</table>
