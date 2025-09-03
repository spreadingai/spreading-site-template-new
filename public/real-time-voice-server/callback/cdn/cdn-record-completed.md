# 录制文件生成回调

---

## 描述

当开发者有直播的回看功能的需求时，在开启后台录制的功能后，APP 在 CDN 上有流被录制完成时，将会以 POST 的形式对回调地址进行请求。



## 回调说明

- 请求方法：POST。

<Note title="说明">


    回调数据格式为 JSON，您需要对其进行 UrlDecode 解码。
    
</Note>




- 请求地址：请在 [ZEGO 控制台](https://console.zego.im/) 上配置回调地址。
- 传输协议：HTTPS/HTTP，建议使用 HTTPS。



## 回调参数


<table>

<thead>
  <tr>
    <th>参数</th>
    <th>类型</th>
    <th>描述</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>stream_alias</td>
    <td>String</td>
    <td>流名，对应客户端的 StreamID，不超过 255 字节。</td>
  </tr>
  <tr>
    <td>replay_url</td>
    <td>String</td>
    <td>回看地址，不超过 1024 字节。</td>
  </tr>
  <tr>
    <td>begin_time</td>
    <td>String</td>
    <td>开始时间，Unix 时间戳。</td>
  </tr>
  <tr>
    <td>end_time</td>
    <td>String</td>
    <td>结束时间，Unix 时间戳。</td>
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
  <tr>
    <td>appid</td>
    <td>String</td>
    <td>AppId。</td>
  </tr>
  <tr>
    <td>event</td>
    <td>String</td>
    <td>回调事件，此回调返回值为 record。</td>
  </tr>
  <tr>
    <td>extra_params</td>
    <td>String</td>
    <td>扩展字段。不同的 CDN 厂商对应的扩展字段不同，请参考下表。</td>
  </tr>
</tbody>
</table>

在使用不同的厂商提供的 CDN 服务时，**extra_params** 参数如下：

<table>
  
<tbody><tr>
<th>CDN 厂商</th>
<th><b>extra_params</b> 参数</th>
<th>类型</th>
<th>描述</th>
</tr>
<tr>
<td rowspan="3">Tencent（腾讯云）</td>
<td>TaskId</td>
<td>String</td>
<td>录制任务唯一标识。</td>
</tr>
<tr>
<td>FileID</td>
<td>String</td>
<td>录制文件唯一标识。</td>
</tr>
<tr>
<td>Duration</td>
<td>Float</td>
<td>录制时长。</td>
</tr>
<tr>
<td rowspan="2">Ws（网宿）</td>
<td>PersistentId</td>
<td>String</td>
<td>录制唯一标识。</td>
</tr>
<tr>
<td>Duration</td>
<td>Float</td>
<td>录制时长。</td>
</tr>
<tr>
<td rowspan="3">Huawei（华为云）</td>
<td>Duration</td>
<td>Float</td>
<td>录制文件的时长，单位：秒。</td>
</tr>
<tr>
<td>ObsObject</td>
<td>String</td>
<td>录制文件的 OBS 存储路径。</td>
</tr>
<tr>
<td>FileSize</td>
<td>UInt32</td>
<td>文件大小，单位：Byte。</td>
</tr>
</tbody></table>



## 数据示例

```json
{
    "stream_alias": "aaaa",
    "replay_url": "replay_url",
    "begin_time": "1481597358",
    "end_time": "1481597358",
    "timestamp": "1481597358",
    "nonce": "158273",
    "signature": "signature",
    "appid": "1",
    "event": "record",
    "extra_params": "extra_params"
}
```

## 返回响应


返回 HTTP status code 为 2XX （例如 200）表示成功，其他响应都表示失败。


## 回调重试策略

如果 ZEGO 服务器没有收到响应，或收到的 HTTP status code 不为 2XX（例如 200），都会尝试重试，**最多进行 5 次重试**。每次重试请求与**上一次请求**的间隔时间分别为 2s、4s、8s、16s、32s。若第 5 次重试后仍然失败，将不再重试，该回调丢失。
