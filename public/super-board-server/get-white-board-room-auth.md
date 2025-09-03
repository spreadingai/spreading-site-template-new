# 查询房间权限

- - -

##  描述

调用本接口查询房间的默认白板权限。

##  接口原型

- 请求方法：GET
- 请求地址：`https://whiteboard-api.zego.im/?Action=GetWhiteboardRoomAuth`
- 传输协议：HTTPS
- 调用频率限制：50 次/秒（测试环境：1 次/秒）

##  请求参数

以下请求参数列表仅列出了接口请求参数和部分公共参数，完整公共参数列表请参考 [调用方式](/super-board-server/accessing-server-apis#21-公共请求参数) 中的 ”公共请求参数“。

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
    <td>需要查询的房间 ID。</td>
  </tr>
</tbody></table>


##  请求示例

```bash
https://whiteboard-api.zego.im/?Action=GetWhiteboardRoomAuth
&RoomId=RoomName
&<公共请求参数>
```

##  响应参数

| 参数 | 类型 | 描述 |
| :-- | :-- | :-- | 
| Code | Number | 返回码。 |
| Message | String | 明细。 |
| RequestId | String | ZEGO 生成的唯一请求 ID。 |
| Data | Object | 如果 Data 为空, 说明该房间没有设置过白板权限。 |
| └ RoomId | String | 房间 ID 号。 |
| └ ModuleAuth[] | Array of Number | 白板操作权限集合。<ul><li>0：没有权限</li><li> 1：允许缩放白板</li><li> 2：允许滚动白板</li></ul> |
| └ GraphicAuth[] | Array of Number | 图元操作权限集合。<ul><li>0：没有任何操作权限</li><li> 2：允许修改其他人创建的图元</li><li>4：允许擦除其他人创建的图元</li><li>8：允许移动其他人创建的图元</li><li> 16：允许清空图元</li><li>32：允许创建图元</li></ul> |

##  响应示例

```json
{
    "Code":0,
    "Message":"SUCCESS",
    "RequestId":"223708046046603340",
    "Data":{
        "RoomId":"RoomName",
        "ModuleAuth":[1,2],
        "GraphicAuth":[32,2]
    }
}
```

##  返回码

以下仅列出了接口业务相关的返回码，公共返回码请参考 [公共返回码](/super-board-server/common-error-codes)。

| 返回码 | 说明 |
| :-- | :-- | 
| 120000001 | 签名鉴权失败。 |
| 120000002 | 输入参数错误。 |
| 120000104 | 查询房间权限失败。 |
| 120000301 | 房间不存在。 |

