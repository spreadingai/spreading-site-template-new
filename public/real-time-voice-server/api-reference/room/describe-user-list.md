# 获取房间用户列表

---

## 描述

调用本接口获取房间内用户列表。


## 接口原型

- 请求方法：GET
- 请求地址：`https://rtc-api.zego.im/?Action=DescribeUserList`
- 传输协议：HTTPS
- 调用频率限制：
   - 同一个 AppID 下：200 次/秒
   - 对同一个房间：1 次/1 秒



## 请求参数

以下请求参数列表仅列出了接口请求参数和部分公共参数，完整公共参数列表请参考 [调用方式](https://doc-zh.zego.im/article/19458#4_1) 中的 “公共请求参数”。


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
    <td>房间 ID。房间不存在会返回空列表。</td>
  </tr>
  <tr>
    <td>Mode</td>
    <td>Int32</td>
    <td>否</td>
    <td>用户登录房间的时间排序，默认值为 0。<ul><li>0：按时间正序</li><li>1：按时间倒序</li></ul></td>
  </tr>
  <tr>
    <td>Limit</td>
    <td>Int32</td>
    <td>否</td>
    <td>
    <p>单次请求返回的用户个数，取值范围 0-200，即调用本接口一次最多返回 200 个用户。<b>默认值为 200</b>，房间内人数超过 200 时，需要根据前一次调用本接口时、返回结果中的 Marker（用户起始位标识）取值，再次调用本接口查询其余用户。</p>
<p>例如，房间内有 450 个用户，调用本接口查询用户列表时：</p>
<ol>
<li>第一次调用本接口，入参 Marker 传空，查询第 1 ～ 200 的用户；返回结果中 Marker 值假设为&nbsp; “marker1”。</li><li>第二次调用本接口，入参 Marker 取值为 “marker1”，查询第 201 ～ 400 的用户；返回结果中 Marker 值假设为 “marker2”。</li>
<li>第三次调用本接口，入参 Marker 取值为 “marker2”，查询第 401 ～ 450 的用户；查询完毕，返回结果中 Marker 为空。</li>
</ol></td>
  </tr>
  <tr>
    <td>Marker</td>
    <td>String</td>
    <td>否</td>
    <td>查询用户起始位标识，每次请求的响应有返回，为空时从头开始返回用户信息。</td>
  </tr>
</tbody></table>





## 请求示例

```
https://rtc-api.zego.im/?Action=DescribeUserList
&RoomId=room_demo
&Mode=0
&Limit=2
&Marker=
&<公共请求参数>
```

## 响应参数


| 参数 | 类型 | 描述 |
|------|------|------|
| Code | Int32 | 返回码。 |
| Message | String | 操作结果描述。 |
| RequestId | String | 请求 ID。 |
| Data | Object | 响应数据。 |
| └ Marker | String | 用户起始位标识。 |
| └ UserList | Array of Object | 用户列表，详情可见[UserList](#userlist)。 |

<a id="userlist"></a>
**UserList**
| 参数 | 类型 | 描述 |
|------|------|------|
| UserId | String | 用户名。 |
| UserName | String | 用户昵称。 |
| UserRole | UInt32 | 用户角色。<ul><li>1：主播。</li><li>2：观众。</li><li>4：管理员，该类型用户主要存在于云录制、音视频流审核等场景中，客户端 SDK 的用户相关接口会过滤该类型用户。</li></ul>**该返回参数，仅在接入 LiveRoom 服务时有实际意义，接入 Express 服务时请忽略此参数。** |






## 响应示例

```json
{
    "Code": 0,
    "Message": "success",
    "RequestId": "TestRequestId1635940600561291000",
    "Data": {
        "Marker": "1635940599950-user2",
        "UserList": [
            {
                "UserId": "user1",
                "UserName": "user1",
                "UserRole": 1
            },
            {
                "UserId": "user2",
                "UserName": "user2",
                "UserRole": 2
            }
        ]
    }
}
```

## 返回码

请参考 [全局返回码](https://doc-zh.zego.im/article/19702)。
