# 查询房间属性
---

## 描述

查询指定房间 ID 的所有房间属性。

## 接口原型
- 请求方法： POST
- 请求地址： `https://zim-api.zego.im/?Action=QueryRoomAttribute`
- 传输协议： HTTPS
- 调用频率限制： 20 次/秒。

## 请求参数

以下请求参数列表仅列出了接口请求参数和部分公共参数，完整公共参数列表请参考 [调用方式 - 公共请求参数](/zim-server/accessing-server-apis#2-公共参数)。

| 参数        | 类型   | 是否必选 | 描述                 |
|-------------|--------|----------|----------------------|
| FromUserId        | String                      | 是      | 操作者，需要是已注册状态，该用户不会自动加入房间。仅支持数字，英文字符和 '!'，'#'，'$'，'%'，'&'，'('，')'，'+'，'-'，':'，';'，'\<'，'='，'.'，'>'，'?'，'@'，'['，']'，'^'，'_'，' '，'{'，'}'，'|'，'~'。                                      |
| RoomId            | String                      | 是      | 房间 ID 。仅支持数字，英文字符和 '!'，'#'，'$'，'%'，'&'，'('，')'，'+'，'-'，':'，';'，'\<'，'='，'.'，'>'，'?'，'@'，'['，']'，'^'，'_'，' '，'{'，'}'，'|'，'~'。                                                                                 |


## 请求示例

- 请求地址 URL：

```json
https://zim-api.zego.im/?Action=QueryRoomAttribute
&<公共请求参数>
```

- 请求消息体：
```json
{
    "RoomId": "room123",
    "FromUserId": "fromUserId"   
}
```
## 响应参数
响应参数如下所示
| 参数         | 类型                        | 描述                    |
| ------------ | --------------------------- | ----------------------- |
| Code         | Number                      | 返回状态码（ 0 表示成功）。 |
| Message      | String                      | 返回状态信息。            |
| RequestId    | String                      | 请求唯一标识。            |
| AttributeSeq | Number                      | 房间属性 seq 。             |
| Attributes   | Array of [RoomAttribute](#RoomAttribute) | 房间属性列表。            |

<a id="RoomAttribute"></a>
**RoomAttribute 结构如下：**

| 参数       | 类型    | 描述             |
|------------|---------|------------------|
| Key        | String  | 房间属性 key 值。    |
| Value      | String  | 房间属性 value 值。  |
| AutoDelete | Number  | 是否自动删除。     |

## 响应示例
```json
{
    "Code": 0,
    "Message": "success",
    "RequestId": "req-123456789",
    "AttributeSeq":10,
    "Attributes": [
        {
            "Key": "1",
            "Value": "attr1",
            "AutoDelete":0,
        },
        {
            "Key": "2",
            "Value": "attr1",
            "AutoDelete":0,
        }
    ]
}
```
## 返回码

以下仅列出了接口业务逻辑相关的返回码，完整返回码请参考 [全局返回码](/zim-server/return-codes)。

| 返回码      | 说明     | 解决方案       |
|------------|----------|----------------|
| 660000002  | 参数错误。 | 请检查参数。     |
| 660300005  | 频率限制。 | 请稍后再尝试。   |






