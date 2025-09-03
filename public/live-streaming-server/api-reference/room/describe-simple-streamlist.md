# 获取简易流列表

---

## 描述

调用本接口获取房间内流列表信息。获取流列表后与业务后台流列表进行对比，可以防止“炸麦”。也可以通过此接口获取房间内唯一流 ID，在使用第三方拉流器时进行混流音浪回调。




## 接口原型

- 请求方法：GET
- 请求地址：`https://rtc-api.zego.im/?Action=DescribeSimpleStreamList`
- 传输协议：HTTPS
- 调用频率限制：
    - 单个房间：1 次/10秒
    - 同一个 AppID 下所有房间：50 次/秒



## 请求参数

以下请求参数列表仅列出了接口请求参数和部分公共参数，完整公共参数列表请参考 完整公共参数列表请参考 [调用方式](/live-streaming-server/api-reference/accessing-server-apis#公共请求参数) 中的 “公共请求参数”。


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
</tbody></table>




## 请求示例

```
https://rtc-api.zego.im/?Action=DescribeSimpleStreamList
&RoomId=room1
&<公共请求参数>
```

## 响应参数


<table>
  
  <tbody><tr>
    <th>参数</th>
    <th>类型</th>
    <th>描述</th>
  </tr>
  <tr>
    <td>Code</td>
    <td>Int32</td>
    <td>返回码。</td>
  </tr>
  <tr>
    <td>Message</td>
    <td>String</td>
    <td>操作结果描述。</td>
  </tr>
  <tr>
    <td>RequestId</td>
    <td>String</td>
    <td>请求 ID。</td>
  </tr>
  <tr>
    <td>Data</td>
    <td>Object</td>
    <td>响应数据。</td>
  </tr>
  <tr>
    <td>└ StreamList</td>
    <td>Array of Object</td>
    <td>流列表。</td>
  </tr>
  <tr>
    <td>&nbsp;&nbsp;└ StreamId</td>
    <td>String</td>
    <td>流 ID。</td>
  </tr>
  <tr>
    <td>&nbsp;&nbsp;└ UserId</td>
    <td>String</td>
    <td>用户名。</td>
  </tr>
  <tr>
    <td>&nbsp;&nbsp;└ UserName</td>
    <td>String</td>
    <td>用户昵称。</td>
  </tr>
  <tr>
    <td>&nbsp;&nbsp;└ CreateTime</td>
    <td>Int64</td>
    <td>创建时间。</td>
  </tr>
  <tr>
    <td>&nbsp;&nbsp;└ StreamNumberId</td>
    <td>UInt32</td>
    <td>房间内流序号。</td>
  </tr>
</tbody></table>





## 响应示例

```
{
    "Code": 0,
    "Message": "success",
    "RequestId": "5885338326725063742",
    "Data": {
        "StreamList": [{
          "StreamId": "stream_demo",
          "UserId": "user_demo",
          "UserName": "user_name_demo",
          "CreateTime": 1642045110123,
          "StreamNumberId": 10
        }]
    }
}
```

## 返回码

以下仅列出了接口业务逻辑相关的部分返回码，完整返回码请参考 [全局返回码](https://doc-zh.zego.im/)。

|返回码|说明| 处理建议 |
|-----|----|----|
| 154 | 获取列表信息失败。 | 请重试，或联系 ZEGO 技术支持处理。|
