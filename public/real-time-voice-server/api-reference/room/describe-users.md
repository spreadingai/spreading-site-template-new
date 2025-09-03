# 查询用户状态

- - -

## 描述

调用本接口，可以查询某一房间内的用户的基本状态，包括用户是否在房间、用户的角色、登录房间的时间等。

## 接口原型

- 请求方法：GET
- 请求地址：`https://rtc-api.zego.im/?Action=DescribeUsers`
- 传输协议：HTTPS
- 调用频率限制（同一个 AppID 下所有房间）：10 次/秒

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
<td>UserId[]</td>
<td>Array of String</td>
<td>是</td>
<td><p>需要查询状态的用户 ID 列表，最大支持 10 个用户 ID。</p><p>示例：UserId[]=a&UserId[]=b</p></td>
</tr>
</tbody></table>



## 请求示例

```
https://rtc-api.zego.im/?Action=DescribeUsers
&RoomId=room1
&UserId[]=a&UserId[]=b
&<公共请求参数>
```

## 响应参数


| 参数 | 类型 | 描述 |
|------|------|------|
| Code | Int32 | 返回码。 |
| Message | String | 操作结果描述。 |
| RequestId | String | 请求 ID。 |
| Data | Object | 响应数据。 |
| └ UserStatusList | Array of Object | 用户状态列表，详情可见[UserStatusList](#userStatusList)。 |

<a id="userstatuslist"></a>
**UserStatusList**
| 参数 | 类型 | 描述 |
|------|------|------|
| UserId | String | 用户 ID。 |
| Status | UInt32 | 用户状态。0：不在房间。1：在房间内。 |
| LoginTime | Int64 | 该用户登录房间的时间，Unix 毫秒时间戳。 |
| UserRole | UInt32 | 用户角色。<ul><li>1：主播。</li><li>2：观众。</li><li>4：管理员，该类型用户主要存在于云录制、音视频流审核等场景中，客户端 SDK 的用户相关接口会过滤该类型用户。</li></ul>**该返回参数，仅在接入 LiveRoom 服务时有实际意义，接入 Express 服务时请忽略此参数。** |



## 响应示例

```json
{
    "Code": 0,
    "Data": {
        "UserStatusList": [
            {
                "UserId": "a",
                "Status": 1,
                "LoginTime": 1675674019365,
                "UserRole": 1
            },
            {
                "UserId": "b",
                "Status": 1,
                "LoginTime": 1675674019455,
                "UserRole": 1
            }
        ]
    },
    "Message": "success",
    "RequestId": "TestRequestId1675674022729915000"
}
```

## 返回码

以下仅列出了接口业务逻辑相关的部分返回码，完整返回码请参考 [全局返回码](https://doc-zh.zego.im/)。


|返回码|说明| 处理建议 |
|---|----|----|
| 2 | 输入参数错误。 | -|
| 3 | 输入参数长度过长。 |请重新输入参数。|
| 206 | App 请求 QPS 过高被限制。| 降低请求频率，或联系 ZEGO 技术支持提高 QPS 限制阈值。|
| 50001 | 房间不存在。<Note title="说明"><ul><li>当房间内没有用户时，房间会被服务端自动销毁。</li><li>当房间内只有一个用户时，该用户退出房间或被踢出房间，房间会被服务端自动销毁。</li><li>当用户心跳请求超时 100 秒后，用户会掉线；所有用户都不在房间后，房间会被服务端自动销毁。</li></ul></Note>| 请确认请求房间 RoomId 是否存在。 |
