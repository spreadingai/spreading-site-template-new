# 媒体文件合并完成回调

- - -

## 描述

调用 [合并媒体文件](https://doc-zh.zego.im/article/19641) 前配置了回调地址且 CDN 厂商为腾讯云或华为云时，合并任务完成时会收到该回调，回调将以 POST 的形式对回调地址进行请求。

<Warning title="注意">


收到媒体文件合并完成回调后，建议 5s 后再检索相关信息。

</Warning>






## 回调说明

- 请求方法：POST。

<Note title="说明">

 
  回调数据格式为 JSON，您需要对其进行 UrlDecode 解码。
   
</Note>



- 请求地址：请联系 ZEGO 技术支持配置回调地址。
- 传输协议：HTTPS/HTTP，建议使用 HTTPS。


## 回调参数


<table>
  
<tbody><tr>
<th>参数</th>
<th>类型</th>
<th>描述</th>
</tr>
<tr>
<td>appid</td>
<td>String</td>
<td>AppId。</td>
</tr>
<tr>
<td>event</td>
<td>String</td>
<td>回调事件，此回调返回值为 compose。</td>
</tr>
<tr>
<td>replay_url</td>
<td>String</td>
<td>合并后的媒体文件的回看地址，不超过 1024 字节。</td>
</tr>
<tr>
<td>task_id</td>
<td>String</td>
<td>任务 ID，与 <a href="https://doc-zh.zego.im/article/19641" target="_blank">合并媒体文件</a> 接口响应中 Data 参数内携带的 TaskId 相同。</td>
</tr>
<tr>
<td>file_id</td>
<td>String</td>
<td>文件 ID，与 <a href="https://doc-zh.zego.im/article/19637" target="_blank">检索媒体信息</a> 接口响应中 Data 参数内携带的 FileId 相同。<b>仅在 CDN 厂商为腾讯云时返回。</b></td>
</tr>
<tr>
<td>code</td>
<td>String</td>
<td>错误码。0 表示成功，其他值表示失败：<ul><li>40000：输入参数不合法，请检查输入参数</li><li>60000：源文件错误（如视频数据损坏），请确认源文件是否正常</li><li>70000：内部服务错误，建议重试</li></ul><b>仅在 CDN 厂商为腾讯云时需关注。</b></td>
</tr>
<tr>
<td>message</td>
<td>String</td>
<td>错误信息。<b>仅在 CDN 厂商为腾讯云时需关注。</b></td>
</tr>
<tr>
<td>timestamp</td>
<td>String</td>
<td>服务器当前时间，Unix 时间戳。</td>
</tr>
<tr>
<td>nonce</td>
<td>String</td>
<td>随机数。</td>
</tr>
<tr>
<td>signature</td>
<td>String</td>
<td>检验串，请参考 <a target="_blank" href="https://doc-zh.zego.im/article/19700">回调说明 - 检验说明</a>。</td>
</tr>
</tbody></table>



## 数据示例

```json
{
    "appid": "1",
    "event": "compose",
    "replay_url": "replay_url",
    "task_id": "task_id",
    "file_id": "5285890813218549789",
    "code": "0",
    "message": "message",
    "timestamp": "1481597358",
    "nonce": "158273",
    "signature": "signature"
}
```

## 返回响应

返回 HTTP status code 为 2XX （例如 200）表示成功，其他响应都表示失败。


## 回调重试策略

如果 ZEGO 服务器没有收到响应，或收到的 HTTP status code 不为 2XX（例如 200），都会尝试重试，**最多进行 5 次重试**。每次重试请求与**上一次请求**的间隔时间分别为 2s、4s、8s、16s、32s。若第 5 次重试后仍然失败，将不再重试，该回调丢失。
