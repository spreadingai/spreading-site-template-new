# 设置房间权限

-----

##  描述

调用本接口用来设置房间的默认白板权限。
- 设置成功后，在当前房间的用户使用白板时，默认以这次设置的房间权限为准。
- 如果单独 [设置了用户的权限](/super-board-server/set-white-board-user-auth)，这个用户使用白板以用户权限为准。
- 房间销毁时，房间权限也会被清理。房间销毁后，用户后续登录相同 RoomId 的房间，如果要使用房间权限功能，也需要重新设置房间权限。

##  接口原型

- 请求方法：GET
- 请求地址：`https://whiteboard-api.zego.im/?Action=SetWhiteboardRoomAuth`
- 传输协议：HTTPS
- 调用频率限制：50 次/秒（测试环境：1 次/秒）

##  请求参数

以下请求参数列表仅列出了接口请求参数和部分公共参数，完整公共参数列表请参考 [调用方式](/super-board-server/accessing-server-apis#21-公共请求参数) 中的 ”公共请求参数“。

| 参数 | 类型 | 是否必选 | 描述 |
| :-- | :-- | :-- | :-- | 
| RoomId | String | 是 | 需要设置的房间 ID。 |
| ModuleAuth[] | Array of Number | 是 | 白板操作权限集合，不允许传空数组。<ul><li> 0：没有权限</li><li> 1：允许缩放白板</li><li>2：允许滚动白板</li></ul>示例：ModuleAuth[]=1&ModuleAuth[]=2 |
| GraphicAuth[] | Array of Number | 是 | 图元操作权限集合，不允许传空数组。<ul><li>0：没有任何操作权限</li><li>2：允许修改其他人创建的图元</li><li>4：允许擦除其他人创建的图元</li><li>8：允许移动其他人创建的图元</li><li>16：允许清空图元</li><li>32：允许创建图元</li></ul>示例：GraphicAuth[]=32&GraphicAuth[]=2 |



##  请求示例

设置房间默认权限为：

1. 白板可缩放，可滚动翻页。
2. 可以创建图元，可以修改别人的图元。

```bash
https://whiteboard-api.zego.im/?Action=SetWhiteboardRoomAuth
&RoomId=RoomName
&ModuleAuth[]=1&ModuleAuth[]=2
&GraphicAuth[]=32&GraphicAuth[]=2
&<公共请求参数>
```

##  响应参数

| 参数 | 类型 | 描述 |
| :-- | :-- | :-- | 
| Code | Number | 返回码。 |
| Message | String | 明细。 |
| RequestId | String | ZEGO 生成的唯一请求 ID。 |



##  响应示例

```
{
    "Code":0,
    "Message":"SUCCESS",
    "RequestId":"2237080460466033406"
}
```

##  返回码

以下仅列出了接口业务相关的返回码，公共返回码请参考 [公共返回码](/super-board-server/common-error-codes)。

| 返回码 | 说明 |
| :-- | :-- | 
| 120000001 | 签名鉴权失败。 |
| 120000002 | 输入参数错误。 |
| 120000103 | 设置房间权限失败。 |
| 120000105 | 权限集合传了空数组导致失败。 |
| 120000106 | 权限集合设置了不合法的权限数字。 |
| 120000301 | 房间不存在。 |

