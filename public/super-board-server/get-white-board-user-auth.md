# 查询用户权限

- - -

##  描述

调用本接口用来查询用户的白板权限，每次最多允许查询 10 个用户的权限。
如果查询的用户中没有设置过权限，服务端不会返回该用户的权限数据。

##  接口原型

- 请求方法：GET
- 请求地址：`https://whiteboard-api.zego.im/?Action=GetWhiteboardUserAuth`
- 传输协议：HTTPS
- 调用频率限制：50 次/秒（测试环境：1 次/秒）

##  请求参数

以下请求参数列表仅列出了接口请求参数和部分公共参数，完整公共参数列表请参考 [调用方式](/super-board-server/accessing-server-apis#21-公共请求参数) 中的 ”公共请求参数“。

| 参数 | 类型 | 是否必选 | 描述 |
| :-- | :-- | :-- | :-- | 
| RoomId | String | 是 | 需要查询的房间 ID。 |
| UserId[] | Array of String | 是 | 需要查询的用户 ID 集合, 一次最多允许查询 10 个用户。 |


##  请求示例

```bash
https://whiteboard-api.zego.im/?Action=GetWhiteboardUserAuth
&RoomId=RoomName
&UserId[]=jack&UserId[]=tom
&<公共请求参数>
```

##  响应参数

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
    <td>明细。</td>
  </tr>
  <tr>
    <td>RequestId</td>
    <td>String</td>
    <td>ZEGO 生成的唯一请求 ID。</td>
  </tr>
  <tr>
    <td>Data</td>
    <td>Object</td>
    <td>如果 Data 为空, 说明该房间没有设置过白板权限。</td>
  </tr>
  <tr>
    <td>└ UserId</td>
    <td>String</td>
    <td>用户 ID。</td>
  </tr>
  <tr>
    <td>└ ModuleAuth[]</td>
    <td>Array of Number</td>
    <td>白板操作权限集合。<ul><li>0：没有权限</li><li> 1：允许缩放白板</li><li> 2：允许滚动白板</li></ul></td>
  </tr>
  <tr>
    <td>└ GraphicAuth[]</td>
    <td>Array of Number</td>
    <td>图元操作权限集合。<ul><li>0：没有任何操作权限</li><li> 2：允许修改其他人创建的图元</li><li>4：允许擦除其他人创建的图元</li><li>8：允许移动其他人创建的图元</li><li> 16：允许清空图元</li><li>32：允许创建图元</li></ul></td>
  </tr>
</tbody></table>

##  响应示例

```json
{
    "Code":0,
    "Message":"SUCCESS",
    "RequestId":"2237080460466033406",
    "Data":[
        {
            "UserId":"jack",
            "ModuleAuth":[1,2],
            "GraphicAuth":[32,2]
        },
        {
            "UserId":"tom",
            "ModuleAuth":[1,2],
            "GraphicAuth":[32]
        }
    ]
}
```

##  返回码

以下仅列出了接口业务相关的返回码，公共返回码请参考 [公共返回码](/super-board-server/common-error-codes)。

<table>
  
  <tbody><tr>
    <th>返回码</th>
    <th>说明</th>
  </tr>
  <tr>
    <td>120000001</td>
    <td>签名鉴权失败。</td>
  </tr>
  <tr>
    <td>120000002</td>
    <td>输入参数错误。</td>
  </tr>
  <tr>
    <td>120000102</td>
    <td>查询用户权限失败。</td>
  </tr>
  <tr>
    <td>120000107</td>
    <td>获取用户数量超过限制。</td>
  </tr>
  <tr>
    <td>120000301</td>
    <td>房间不存在。</td>
  </tr>
</tbody></table>
