# 恢复 CDN 推流

---

## 描述

调用本接口恢复 CDN 推流，适用直推 CDN 场景。如需应用于转推 CDN 场景，请使用 [启动旁路推流](https://doc-zh.zego.im/article/19624) 接口。

<Warning title="注意">


首次使用本接口，需要联系 ZEGO 技术支持进行配置。

</Warning>



## 接口原型

- 请求方法：GET
- 请求地址：`https://rtc-api.zego.im/?Action=ResumeCDNLiveStream`
- 传输协议：HTTPS
- 调用频率限制：20 次/秒


## 请求参数

以下请求参数列表仅列出了接口请求参数和部分公共参数，完整公共参数列表请参考 完整公共参数列表请参考 [调用方式](/live-streaming-server/api-reference/accessing-server-apis#公共请求参数) 中的 “公共请求参数”。


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
    <td>StreamId</td>
    <td>String</td>
    <td>是</td>
    <td>流 ID。</td>
  </tr>
</tbody>
</table>


## 请求示例

```
https://rtc-api.zego.im/?Action=ResumeCDNLiveStream
&StreamId=stream001
&<公共请求参数>
```

## 响应参数


| 参数 | 类型 | 描述 |
|---|---|---|
| Code | Number | 返回码。 |
| Message | String | 操作结果描述。 |
| RequestId | String | 请求 ID。 |
| Data | Array of Object | 响应数据。 |
| └ CdnType | String | CDN 类型。<ul><li>ws：网宿。</li><li>aliyun：阿里云。</li><li>tencent：腾讯云。</li><li>huawei：华为云。</li></ul> |
| └ CdnResult | String | CDN 处理结果。 |



## 响应示例

```
{
    "Code": 0,
    "Message": "success",
    "Data": [
        {
            "CdnType": "ws",
            "CdnResult": "success append purge tasks"
        }
    ],
    "RequestId": "3162938795049910659"
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
