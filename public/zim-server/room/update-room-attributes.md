# 更新房间属性
---

## 描述

根据房间 ID 更新自定义的房间属性。一个房间最多可设置 20 个房间属性，如果需要增加房间属性数量上限，请联系 ZEGO 技术支持。

房间属性更新后，可以通过以下 ZIM SDK 的回调接口，接收房间属性更新的通知。

| iOS-25% | Android-25% | macOS-25% |Windows-25% |
|-----|---------|-------|-------|
|[roomAttributesUpdated](https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_ios~protocol~ZIMEventHandler#zim-room-attributes-updated-room-id)|[onRoomAttributesUpdated](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIMEventHandler#on-room-attributes-updated)|[roomAttributesUpdated](https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_macos~protocol~ZIMEventHandler#zim-room-attributes-updated-room-id)|[onRoomAttributesUpdated](https://doc-zh.zego.im/article/api?doc=zim_API~cpp_windows~class~ZIMEventHandler#on-room-attributes-updated)|

| Web-25% | 小程序-25% |Flutter-25% | React Native-25% |
|---------|-----|--------|---------|
|[roomAttributesUpdated](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_web~interface~ZIMEventHandler#room-attributes-updated)|[roomAttributesUpdated](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_wxxcx~interface~ZIMEventHandler#room-attributes-updated)|[onRoomAttributesUpdated](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMEventHandler/onRoomAttributesUpdated.html)|[roomAttributesUpdated](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_react-native~interface~ZIMEventHandler#room-attributes-updated)|

| Unity3D-25% | uni-app \| uni-app x-25% | HarmonyOS-25% |
|--------------|---------|---------|
|[OnRoomAttributesUpdated](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~class~ZIMEventHandler#on-room-attributes-updated)|[roomAttributesUpdated](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_uni-app~interface~ZIMEventHandler#room-attributes-updated)|[roomAttributesUpdated](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_harmony~interface~ZIMEventHandler#room-attributes-updated)|


## 接口原型

- 请求方法： POST
- 请求地址： `https://zim-api.zego.im/?Action=ModifyRoomAttribute`
- 传输协议： HTTPS
- 调用频率限制： 20 次/秒。


## 请求参数

以下请求参数列表仅列出了接口请求参数和部分公共参数，完整公共参数列表请参考 [调用方式 - 公共请求参数](/zim-server/accessing-server-apis#2-公共参数)。

| 参数       | 类型                              | 是否必选 | 描述                     |
| ---------- | --------------------------------- | -------- | ------------------------ |
| FromUserId | String                            | 是       | 操作者，需要是已注册状态，该用户不会自动加入房间。仅支持数字，英文字符和 '!'，'#'，'$'，'%'，'&'，'('，')'，'+'，'-'，':'，';'，'\<'，'='，'.'，'>'，'?'，'@'，'['，']'，'^'，'_'，' '，'{'，'}'，'|'，'~'。 |
| RoomId     | String                            | 是       | 房间 ID。仅支持数字，英文字符和 '!'，'#'，'$'，'%'，'&'，'('，')'，'+'，'-'，':'，';'，'\<'，'='，'.'，'>'，'?'，'@'，'['，']'，'^'，'_'，'{'，'}'，'|'，'~'。                   |
| Attributes | Array of [ModifyRoomAttribute](#ModifyRoomAttribute) | 是       | 要更新的房间属性信息。         |


<a id="ModifyRoomAttribute"></a>
**ModifyRoomAttribute 结构如下：**

| 参数       | 类型    | 是否必选 | 描述                                                                                                         |
| ---------- | ------- | -------- | ------------------------------------------------------------------------------------------------------------ |
| Action     | Number  | 是       | 删除还是设置，0设置，1删除。                           |
| Key        | String  | 是       | 房间属性 key 。                                                                                                  |
| Value      | String  | 否       | 房间属性 value 。                                                                                              |
| AutoDelete | Number  | 否       | 用户退出时，是否自动删除，0：不自动删除，1：自动删除。如果 FromUserId 不在房间内，则会在其先进入房间后，然后再退出时触发删除操作。 |
| StopOnError | Number  | 否       | 是否开启快速失败，默认为关闭。<ul><li>`0`: 关闭快速失败。执行遇到错误时，记录当前属性并继续执行后续的更新操作，执行结束后返回所有记录到的属性。</li><li>`1`: 开启快速失败。执行遇到错误时，停止更新操作并返回本次更新的属性，已执行成功的更新操作会保留。</li></ul> |

<Note title="说明">
如果传递的 Key 已经存在，则会修改已有的属性信息。
</Note>


## 请求示例

- 请求地址 URL：

```json
https://zim-api.zego.im/?Action=ModifyRoomAttribute
&<公共请求参数>
```

- 请求消息体：
```json
{
    "RoomId": "room123",
    "FromUserId": "fromUserId",
    "Attributes": [
        {
            "Action": 0,
            "Key": "attribute1",
            "Value": "value1",
            "AutoDelete": 1
        },
        {
            "Action": 1,
            "Key": "attribute2",
            "Value": "",
            "AutoDelete": 0
        }
    ]    
}
```

## 响应参数

响应参数如下所示

| 参数       | 类型                   | 是否必选 | 描述                            |
| ---------- | ---------------------- | -------- | ------------------------------- |
| Code       | Number                 | 是       | 返回状态码（ 0 表示成功）。         |
| Message    | String                 | 是       | 返回状态信息。                    |
| RequestId  | String                 | 是       | 请求唯一标识。                    |
| ErrKeyList | Array of [ErrList](#ErrList) | 否       | 错误的 key 列表（仅失败时返回）。 |

<a id="ErrList"></a>
**ErrList 结构如下：**

| 参数     | 类型   | 是否必选 | 描述           |
| -------- | ------ | -------- | -------------- |
| SubCode  | Number | 是       | 错误码。        |
| Key      | String | 是       | 出现错误的 key 值。 |


## 响应示例
```json
{
    "Code": 0,
    "Message": "success",
    "RequestId": "req-123456789",
    "ErrKeyList": [
        {
            "SubCode": 1,
            "Key": "attr1"
        },
        {
            "SubCode": 2,
            "Key": "attr2"
        }
    ]
}
```

## 返回码

以下仅列出了接口业务逻辑相关的返回码，完整返回码请参考 [全局返回码](/zim-server/return-codes)。

| 返回码      | 说明     | 解决方案         |
|------------|----------|------------------|
| 660000002  | 参数错误。 | 请检查参数。       |
| 660300005  | 频率限制。 | 请稍后再尝试。     |





