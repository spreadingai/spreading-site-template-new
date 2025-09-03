# 获取歌词分片

- - -

## 描述

当多人合唱一首歌曲时，通过获取歌词分片，将歌词加上分片标签后，每个人可以选择不同的歌词片段进行演唱。

<Warning title="注意">
仅当传入的版权方 VendorId 为 “0（默认）” 或 “1” 时，才能使用本服务端接口；其余版权方不支持。版权方的详细信息，请联系 ZEGO 商务人员咨询。
</Warning>

## 接口原型

- 请求方法：GET
- 请求地址：`https://ktv-api.zego.im/?Action=DescribeKrcSegment`
- 传输协议：HTTPS
- 调用频率限制：200 次/秒

## 请求参数

以下请求参数列表仅列出了接口请求参数和部分公共参数，完整公共参数列表请参考 [调用方式 - 公共请求参数](/online-ktv-server/accessing-server-apis#公共请求参数)。

<Note title="说明">
在线 KTV 服务端接口的公共请求参数与实时音视频、实时语音的不同，包含了 VendorId（版权方 ID），请务必阅读上述参考文档。
</Note>

<table>
  
  <tbody><tr>
    <th>参数</th>
    <th>类型</th>
    <th>是否必选</th>
    <th>描述</th>
  </tr>
  <tr>
    <td>SongId</td>
    <td>String</td>
    <td>是</td>
    <td>歌曲 ID。</td>
  </tr>
</tbody></table>



## 请求示例

```
https://ktv-api.zego.im/?Action=DescribeKrcSegment
&SongId=125282604
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
    <td>响应结果，详情可见 [Data](#data)。</td>
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
    <td>Tags</td>
    <td>Array of Object</td>
    <td>歌词分片数据，详情可见 [Tags](#tags)。</td>
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
    <td>Start</td>
    <td>Number</td>
    <td>开始偏移量。</td>
  </tr>
  <tr>
    <td>End</td>
    <td>Number</td>
    <td>结束偏移量。</td>
  </tr>
  <tr>
    <td>Tags</td>
    <td>Array of String</td>
    <td>分片标签。</td>
  </tr>
</tbody></table>



## 响应示例

```
{
    "Code": 0,
    "Message": "succeed",
    "RequestId": "74dffcf4-018b-44d1-b4c6-912d6b0fee57",
    "Data": {
        "Tags": [
            {
                "End": 20310,
                "Start": 710,
                "Tags": [
                    "1"
                ]
            },
            {
                "End": 35580,
                "Start": 20310,
                "Tags": [
                    "2"
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
