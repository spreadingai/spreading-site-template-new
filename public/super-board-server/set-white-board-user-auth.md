# 设置用户权限

-----

##  描述

调用本接口设置用户的白板权限。
- 用户退出房间或掉线，该用户权限会被清理。该用户下一次再登录相同的房间，如果要使用用户权限功能，需要重新设置一次用户权限。
- 用户所在的房间被销毁，该用户权限也会被清理掉。

##  接口原型

- 请求方法：GET
- 请求地址：`https://whiteboard-api.zego.im/?Action=SetWhiteboardUserAuth`
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
    <td>需要设置的房间 ID。</td>
  </tr>
  <tr>
    <td>UserId</td>
    <td>String</td>
    <td>是</td>
    <td>需要设置的用户 ID。</td>
  </tr>
  <tr>
    <td>ModuleAuth[]</td>
    <td>Array of Number</td>
    <td>是</td>
    <td>白板操作权限集合，不允许传空数组。<ul><li> 0：没有权限</li><li> 1：允许缩放白板</li><li>2：允许滚动白板</li></ul>示例：ModuleAuth[]=1&ModuleAuth[]=2</td>
  </tr>
  <tr>
    <td>GraphicAuth[]</td>
    <td>Array of Number</td>
    <td>是</td>
    <td>图元操作权限集合，不允许传空数组。<ul><li>0：没有任何操作权限</li><li>2：允许修改其他人创建的图元</li><li>4：允许擦除其他人创建的图元</li><li>8：允许移动其他人创建的图元</li><li>16：允许清空图元</li><li>32：允许创建图元</li></ul>示例：GraphicAuth[]=32&GraphicAuth[]=2</td>
  </tr>
</tbody></table>


##  请求示例

设置用户权限为：
1. 白板可缩放，可滚动翻页。
2. 可以创建图元，可以修改别人的图元。

```bash
https://whiteboard-api.zego.im/?Action=SetWhiteboardUserAuth
&RoomId=RoomName
&UserId=jack
&ModuleAuth[]=1&ModuleAuth[]=2
&GraphicAuth[]=32&GraphicAuth[]=2
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
</tbody></table>


##  响应示例


```json
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
| 120000101 | 设置用户权限失败。 |
| 120000105 | 权限集合传了空数组导致失败。 |
| 120000106 | 权限集合设置了不合法的权限数字。 |
| 120000201 | 用户不存在。 |
