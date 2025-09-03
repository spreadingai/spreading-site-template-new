# 获取房间人数

---

## 描述

调用本接口获取房间人数。


## 接口原型

- 请求方法：GET
- 请求地址：`https://rtc-api.zego.im/?Action=DescribeUserNum`
- 传输协议：HTTPS
- 调用频率限制（同一个 AppID 下所有房间）：10 次/秒（测试环境：1 次/秒）

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
    <td>RoomId[]</td>
    <td>Array of String</td>
    <td>是</td>
    <td>房间 ID 列表，一次调用最大支持 10 个房间。当房间不存在时，人数为 0。<br />示例：RoomId[]=room1&RoomId[]=room2</td>
  </tr>
</tbody>
</table>


## 请求示例

```
https://rtc-api.zego.im/?Action=DescribeUserNum
&RoomId[]=room1&RoomId[]=room2
&<公共请求参数>
```

## 响应参数


| 参数 | 类型 | 描述 |
|------|------|------|
| Code | Int32 | 返回码。 |
| Message | String | 操作结果描述。 |
| RequestId | String | 请求 ID。 |
| Data | Object | 响应数据。 |
| └ UserCountList | Array of Object | 房间及人数列表，详情可见[UserCountList](#userCountList)。 |

<a id="usercountList"></a>
**UserCountList**
| 参数 | 类型 | 描述 |
|------|------|------|
| RoomId | String | 房间 ID。 |
| UserCount | Int32 | 房间人数。 |
| AdminUserCount | Int32 | 房间管理员人数。该参数主要应用于云录制、音视频流审核等场景中；如果房间没有此类用户，请忽略该参数。**请注意，UserCount 中包含了 AdminUserCount 的人数。** |

## 响应示例

```json
{
    "Code": 0,
    "Message": "success",
    "RequestId": "7840039829955402142",
    "Data": {
        "UserCountList": [
            {
                "RoomId": "room1",
                "UserCount": 2,
                "AdminUserCount": 0
            },
            {
                "RoomId": "room2",
                "UserCount": 3,
                "AdminUserCount": 1
            }
        ]
    }
}
```

## 返回码

请参考 [全局返回码](https://doc-zh.zego.im/article/19702)。
