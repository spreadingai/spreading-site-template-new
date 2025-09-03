# 查询被禁止 CDN 推流的列表

- - -


## 描述

调用本接口查询已被禁止推流到 CDN 的 URL 列表。

<Warning title="注意">


首次使用本接口，需要联系 ZEGO 技术支持进行配置。

</Warning>



## 接口原型

- 请求方法：GET
- 请求地址：`https://rtc-api.zego.im/?Action=QueryForbidCDNLiveStream`
- 传输协议：HTTPS
- 调用频率限制：20 次/秒


## 请求参数

以下请求参数列表仅列出了接口请求参数和部分公共参数，完整公共参数列表请参考 完整公共参数列表请参考 [调用方式](/real-time-video-server/api-reference/accessing-server-apis#公共请求参数) 中的 “公共请求参数”。


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
    <td>Vendor</td>
    <td>String</td>
    <td>是</td>
    <td>CDN 提供商，ws：网宿。</td> 
  </tr>
</tbody>
</table>


## 请求示例

```
https://rtc-api.zego.im/?Action=QueryForbidCDNLiveStream
&Vendor=ws
&<公共请求参数>
```

## 响应参数


| 参数 | 类型 | 描述 |
|---|---|---|
| Code | Number | 返回码。 |
| Message | String | 操作结果描述。 |
| RequestId | String | 请求 ID。 |
| Data | Object | 响应数据。 |
| └ Ws | Object | 网宿返回的查询结果，详情可见[Ws](#ws)。 |

<a id="ws"></a>
**Ws**
| 参数 | 类型 | 描述 |
|---|---|---|
| ResultDetail | Array of Object | 查询结果的集合。 |
| Channel | String | 加速域名。 |
| Url | String | 被禁止推流的 CDN 直播地址的完整 URL，例如，rtmp://publish-ws.zegotech.cn/test/流 ID。 |
| StartTime | String | 开始禁止推流的时间，UTC 时间。 |
| EndTime | String | 恢复推流的时间，UTC 时间。 |
| Ip | String | 禁止观看直播的用户 IP（已废弃）。 |




## 响应示例

```
{
    "Code": 0,
    "Message": "success",
    "RequestId": "",
    "Data": {
        "Ws": {
            "ResultDetail": [
                {
                    "Channel": "publish-ws.zegotech.cn",
                    "Url": "rtmp://publish-ws.zegotech.cn/test/stream001",
                    "StartTime": "2024-10-12T03:47:53Z",
                    "EndTime": "2024-11-11T03:47:53Z",
                    "Ip": ""
                },
                {
                    "Channel": "publish-ws.zegotech.cn",
                    "Url": "rtmp://publish-ws.zegotech.cn/test/steram002",
                    "StartTime": "2024-10-12T02:48:15Z",
                    "EndTime": "2024-10-14T02:22:00Z",
                    "Ip": ""
                }
            ]
        }
    }
}
```

## 返回码

以下仅列出了接口业务逻辑相关的部分返回码，完整返回码请参考 [全局返回码](https://doc-zh.zego.im/)。

|返回码|说明|处理建议|
|-----|------|-----|
| 0 | 请求成功。 |-|
| 1 | 请求失败。 |-|
| 2 | 参数错误。 |-|
| 3 | 鉴权失败。 | 请检查鉴权参数是否正确。|
