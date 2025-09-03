
# 查询用户是否在房间内

- - -

## 描述

查询用户是否在指定房间内。默认支持批量查询至多 10 名用户，如需调整，请联系 ZEGO 技术支持。

## 接口原型

- 请求方法：GET
- 请求地址： `https://zim-api.zego.im/?Action=QueryRoomMembers`
- 传输协议：HTTPS
- 调用频率限制：5 次/秒，房间级别限制。

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
<td>UserId[]</td>
<td>Array of String</td>
<td>是</td>
<td><p>需要查询的用户 ID 列表，默认最多可查询 10 个用户 ID。</p><p>示例：UserId[]=a&UserId[]=b&UserId[]=c&UserId[]=d</p></td>
</tr>
<tr>
<td>RoomId</td>
<td>String</td>
<td>是</td>
<td>房间 ID。</td>
</tr>
</tbody></table>

<Note title="说明">

UserId 长度上限为 32 字节，RoomID 长度上限为 128 字节，均仅支持数字，英文字符和 {"'!'，'#'，'$'，'%'，'&'，'('，')'，'+'，'-'，':'，';'，'<'，'='，'.'，'>'，'?'，'@'，'['，']'，'^'，'_'，' '，'{'，'}'，'|'，'~'"}。
</Note>


## 请求示例

```json
https://zim-api.zego.im/?Action=QueryRoomMembers
&UserId[]=a&UserId[]=b&UserId[]=c&UserId[]=d&RoomId=roomid
&<公共请求参数>
```

## 响应参数

| 参数 | 类型 | 描述 |
|------|------|------|
| Code | Number | 返回码。 |
| Message | String | 请求结果的说明信息。 |
| RequestId | String | 请求 ID。 |
| UserList | Array of Object| 查询结果，即在指定房间的用户列表。 |
| └user_id | String | 在指定房间的用户的 ID。 |
| └user_name | String | 在指定房间的用户的名称。 |
| └avatar | String | 用户头像信息，可为 null。 |
| └extra | String | 扩展信息，可为 null。 | 
| ErrorList | Array of Object | 不在指定房间的用户列表。<ul><li>Code 为 0：<ul><li>ErrorList 为空，全部用户都在指定房间。</li><li>ErrorList 不为空，表示部分用户不在指定房间，请参考 SubCode 处理。</li></ul></li><li>Code 不为 0：<ul><li>ErrorList 为空，表示参数错误、接口频率限制、系统错误。</li><li>ErrorList 不为空，表示全部用户都不在指定房间。</li></ul></li></ul> |
| └UserId | String | 不在指定房间的用户的 ID。 |
| └SubCode | Number | 不在指定房间原因的返回码。 |

## 响应示例

```json
{
    "Code": 0,
    "Message": "success",
    "RequestId": "343649807833778782",
    "UserList": [
        {
            "user_id": "a",
            "user_name": "UserNamea",
            "avatar": "https://www.xxx.com/avatarA.png",
            "extra": "Extraa"
        },
        {
            "user_id": "b",
            "user_name": "UserNameb",
            "avatar": "https://www.xxx.com/avatarB.png",
            "extra": "Extrab"
        }
    ],
     "ErrorList": [
        {
            "UserId": "c",
            "SubCode": 660300012
        },
        {
            "UserId": "d",
            "SubCode": 660200001
        }
    ]
}
```

## 返回码

以下仅列出了接口业务逻辑相关的返回码，完整返回码请参考 [全局返回码](/zim-server/return-codes)。

<table>
<tbody><tr>
<th>返回码</th>
<th>说明</th>
<th>处理建议</th>
</tr>
<tr>
<td>660000002</td>
<td>参数错误</td>
<td>请检查输入的参数</td>
</tr>
<tr>
<td>660000011</td>
<td>用户个数超过限制。</td>
<td>请检查输入的用户列表。</td>
</tr>
<tr>
<td>660200001</td>
<td>用户未注册</td>
<td>请确认用户 ID 是否存在或用户是否已登出 ZIM 服务。</td>
</tr>
<tr>
<td>660300006</td>
<td>调用接口频率超出限制。</td>
<td>请稍后再试。</td>
</tr>
<tr>
<td>660300012</td>
<td> 用户不在房间内</td>
<td>无需处理。</td>
</tr>
</tbody></table>
