

# 获取标签列表

- - -

## 描述

通过获取标签列表，可以知道歌曲资源的标签列表、标签分组名称、标签 ID、标签名称等信息。

<Note title="说明">

1. 相比原有 [歌单](https://doc-zh.zego.im/article/13719) 接口，本接口歌曲资源更丰富，且支持动态更新。因此，ZEGO 推荐开发者使用本接口获得歌曲列表相关内容。
2. 调用 [根据标签获取歌曲](/online-ktv-server/describe-tag-songs) 接口需要根据标签 ID 获取对应的歌曲资源。
</Note>


## 接口原型

- 请求方法：GET
- 请求地址：`https://ktv-api.zego.im/?Action=DescribeTags`
- 传输协议：HTTPS
- 调用频率限制：200 次/秒

## 请求参数

本接口仅需要传入公共参数即可调用，完整公共参数列表请参考 [调用方式 - 公共请求参数](/online-ktv-server/accessing-server-apis#公共请求参数)。

<Note title="说明">
在线 KTV 服务端接口的公共请求参数与实时音视频、实时语音的不同，包含了 VendorId（版权方 ID），请务必阅读上述参考文档。
</Note>


## 请求示例

```
https://ktv-api.zego.im/?Action=DescribeTags
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
    <td>Number</td>
    <td>返回码。</td>
  </tr>
  <tr>
    <td>Message</td>
    <td>String</td>
    <td>请求结果的说明信息。</td>
  </tr>
  <tr>
    <td>RequestId</td>
    <td>String</td>
    <td>请求 ID。</td>
  </tr>
  <tr>
    <td>Data</td>
    <td>Object</td>
    <td>响应结果，详情可见[Data](#data)。</td>
  </tr>
</tbody></table>


##### Data
<table>
  
  <tbody><tr>
    <th>参数</th>
    <th>类型</th>
    <th>描述</th>
  </tr>
  <tr>
    <td>Groups</td>
    <td>Array of JSON</td>
    <td>响应结果，详情可见[Groups](#groups)。</td>
  </tr>
</tbody></table>

##### Groups
<table>
  
  <tbody><tr>
    <th>参数</th>
    <th>类型</th>
    <th>描述</th>
  </tr>
  <tr>
    <td>GroupId</td>
    <td> String </td>
    <td>标签分组 ID。</td>
  </tr>
  <tr>
    <td>GroupName</td>
    <td> String </td>
    <td>标签分组名称。</td>
  </tr>
  <tr>
    <td> Tags </td>
    <td>Array of JSON</td>
    <td>标签列表，详情可见[Tags](#tags)。</td>
  </tr>
</tbody></table>

##### Tags
<table>
  
  <tbody><tr>
    <th>参数</th>
    <th>类型</th>
    <th>描述</th>
  </tr>
  <tr>
    <td> TagId </td>
    <td> String </td>
    <td>标签 ID，具备唯一性。</td>
  </tr>
  <tr>
    <td> TagName </td>
    <td> String </td>
    <td>标签名称。​</td>
  </tr>
</tbody></table>



## 响应示例

```
{
    "Code": 0,
    "Message": "success",
    "RequestId": "343649807833778782",
    "Data": {
        "Groups": [
            {
                "GroupId": "5",
                "GroupName": "场景",
                "Tags": [
                    {
                        "TagId": "587",
                        "TagName": "学习"
                    }
                ]
            }
        ]
    }
}
```

## 返回码

以下仅列出了接口业务逻辑相关的部分返回码，完整返回码请参考 [全局返回码](/online-ktv-server/return-code)。

|返回码|说明|处理建议|
|-|-|-|
| 320000004 | 参数非法。 | 请根据 Message 提示判断非法参数，调整对应参数值。 |
| 320010000 | AppId 不可用 | 请联系 ZEGO 技术支持开通版权音乐服务。 |
| 320010001 | 不支持的付费类型。 | 请联系 ZEGO 技术支持开通版权音乐对应的付费类型。<ul><li>按次计费</li></ul>  |
| 320050000 | 系统错误。 | 请联系 ZEGO 技术支持。|
| 320050002 | 系统繁忙。 | 请稍后重试。|
| 320050003 | 未定义的引擎错误。 | 请联系 ZEGO 技术支持。|
| 320050004 | 引擎内部错误。 | 请联系 ZEGO 技术支持。|



