# 混流结束回调

---

## 描述

当开发者需要具体知道当前 App 的混流情况，可先 [配置回调](https://doc-zh.zego.im/article/19662)。App 在混流服务器有混流结束时，将会以 POST 的形式对回调地址进行请求。

<Warning title="注意">



当出现如下情况：
- 混流结束请求处理失败时，没有回调。
- 混流过程中异常终止，没有回调。

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

<thead>
  <tr>
    <th>参数</th>
    <th>类型</th>
    <th>描述</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>appid</td>
    <td>String</td>
    <td>APP 标识。</td>
  </tr>
  <tr>
    <td>event</td>
    <td>String</td>
    <td>回调事件，此回调返回值为 <code>mix_stop</code>。</td>
  </tr>
  <tr>
    <td>seq</td>
    <td>String</td>
    <td>混流请求的序号，保证混流请求被执行的顺序，自增唯一。</td>
  </tr>
  <tr>
    <td>task_id</td>
    <td>String</td>
    <td>混流 ID，如果混流开始请求中带上 task_id 参数，ZEGO 会加上 appid 前缀组成新的混流 ID，否则用 mix_url 等其他参数拼接混流 ID。</td>
  </tr>
  <tr>
    <td>channel_id</td>
    <td>String</td>
    <td>频道 ID，对应客户端的 RoomID，不超过 255 字节。</td>
  </tr>
  <tr>
    <td>publish_id</td>
    <td>String</td>
    <td>发布者 ID，对应客户端的 UserID，不超过 255 字节。</td>
  </tr>
  <tr>
    <td>mix_url</td>
    <td>String</td>
    <td>混流最终输出的地址，RTMP 协议地址，不超过 255 字节。</td>
  </tr>
  <tr>
    <td>mix_stream_alias</td>
    <td>String</td>
    <td>混流最终输出流名，不超过 255 字节。</td>
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
</tbody>
</table>

<Note title="说明">


建议您将部分参数转换为 Int 进行逻辑处理，相关字段包括 `appid`、`seq`、`timestamp`。

</Note>




## 数据示例

```json
{
    "appid": "111111",
    "channel_id": "2222",
    "event": "mix_stop",
    "mix_stream_alias": "aaa",
    "mix_url": "rtmp://rtmp.wsdemo.zego.im/zegodemo/aaa",
    "nonce": "7257787020413449571",
    "publish_id": "abc",
    "seq": "1234",
    "signature": "fadc2c4abb5714c30a711b3ad6f7783e37531263",
    "task_id": "111111:1111",
    "timestamp": "1689835223"
}
```

## 返回响应


返回 HTTP status code 为 2XX （例如 200）表示成功，其他响应都表示失败。


## 回调重试策略

如果 ZEGO 服务器没有收到响应，或收到的 HTTP status code 不为 2XX（例如 200），都会尝试重试，**最多进行 5 次重试**。每次重试请求与**上一次请求**的间隔时间分别为 2s、4s、8s、16s、32s。若第 5 次重试后仍然失败，将不再重试，该回调丢失。
