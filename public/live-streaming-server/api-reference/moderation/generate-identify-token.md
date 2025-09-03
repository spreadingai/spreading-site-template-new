# 音视频流审核鉴权 Token

- - -

## 描述

当您使用第三方音视频流审核服务时，您需要通过本接口生成 `IdentifyToken` 并将其传给审核服务提供商，以作鉴权。

目前支持的厂商包括数美、网易易盾、图谱、依图、火山引擎等厂商，完整对接流程如下：

### 数美

1. 完成对接数美 [智能音频流识别](https://www.ishumei.com/new/product/tj/audio)、[智能视频流识别](https://www.ishumei.com/new/product/tj/video) 产品。
2. 调用本服务端接口获取 `IdentifyToken`。
3. 调用数美 [音频流上传请求接口](https://help.ishumei.com/docs/tj/audioStream/versionV4/async/developDoc) 或 [视频流上传请求接口](https://help.ishumei.com/docs/tj/videoStream/versionV4/requestInterface/developDoc) 发起请求，在请求参数中需将将 `IdentifyToken` 赋值给 `Token`。

### 网易易盾

1. 完成对接网易易盾 的审核功能 [音视频解决方案](https://support.dun.163.com/documents/594247746924453888?docId=600827338598789120#%E5%8D%B3%E6%9E%84)。
2. 调用本服务端接口获取 `IdentifyToken`。
3. 调用网易易盾 [异步检测接口](https://support.dun.163.com/documents/594247746924453888?docId=600827510305206272) 发起请求，在请求参数中需将将 `IdentifyToken` 赋值给 `Token`。

### 图谱

1. 完成对接图谱 的 [即构语音流异步接口](https://docs-site.cloud.tuputech.com/docs/api/speech/speech-stream/stream-zego/)。
2. 调用本服务端接口获取 `IdentifyToken`。
3. 调用图谱 的 [即构语音流异步接口](https://docs-site.cloud.tuputech.com/docs/api/speech/speech-stream/stream-zego/) 发起请求，在请求参数中需将将 `IdentifyToken` 赋值给 `Token`。

### 依图和火山引擎

1. 完成对接这两家服务提供商的审核功能，详情请联系服务提供商的技术支持。
2. 调用本服务端接口获取 `IdentifyToken`。
3. 调用这两家服务提供商的音视频审核接口（详情请联系服务提供商的技术支持）发起请求，在请求参数中需将将 `IdentifyToken` 赋值给 `Token`。

<Warning title="注意">
- 每个 `IdentifyToken` 仅能用于一次审核请求；每次调用接口开始审核前，请重新生成 1 个 `IdentifyToken` 使用。
- 不同厂商在实际使用上可能有由于版本更新或其他原因与本文存在差异，建议在使用前联系技术支持确认。

</Warning>



## 接口原型

- 请求方法：GET
- 请求地址：`https://rtc-api.zego.im/?Action=GenerateIdentifyToken`
- 传输协议：HTTPS
- 调用频率限制（同一个 AppID 下所有房间）：100 次/秒

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
<td>EffectiveTime</td>
<td>Int64</td>
<td>否</td>
<td><p>流审核鉴权 Token 的有效时长。</p><p>单位：秒，默认为 3600 秒；最大不能超过 30 天（即取值不能超过 60 * 60 * 24 * 30）。</p></td>
</tr>
</tbody></table>

## 请求示例

```
https://rtc-api.zego.im/?Action=GenerateIdentifyToken
&AppId=1234567890
&SignatureNonce=15215528852396
&Timestamp=1234567890
&Signature=7a2c0f11145fb760d607a07b54825013
&SignatureVersion=2.0
&EffectiveTime=3600
```

## 响应参数


| 参数 | 类型 | 描述 |
|---|---|---|
| Code | Int32 | 返回码。 |
| Message | String | 操作结果描述。 |
| RequestId | String | 请求 ID。 |
| Data | Object | 响应数据。 |
| └ IdentifyToken | String | 鉴权 Token。 |
| └ RemainTime | Int64 | <p>Token 的有效时长，指在“有效时长”范围内，可以向 <code>数美</code> 发起音视频流审核；审核任务开始后，正常流审核期间，不会出现审核用户掉线的问题。</p><p>单位：秒，默认为 1 小时（3600 秒）。</p> |


## 响应示例

```json
{
    "Code":0,
    "Data":{
        "IdentifyToken":"1234567890asdfasdfzxcvxxxxxxxxxx",
        "RemainTime":3600
    },
    "Message":"success",
    "RequestId":"TestRequestId1653536127853122000"
}
```

## 返回码

请参考 [全局返回码](https://doc-zh.zego.im/article/19702)。
