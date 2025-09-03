# 房间关闭回调

- - -

## 描述

当开发者需要了解某个房间关闭的相关信息时，可以通过本回调获取。


## 回调说明

- 请求方法：POST。

<Note title="说明">
    回调数据格式为 JSON，您需要对其进行 UrlDecode 解码。
</Note>




- 请求地址：请在 [ZEGO 控制台](https://console.zego.im/) 上配置回调地址。
- 传输协议：HTTPS/HTTP，建议使用 HTTPS。


## 回调参数

<table>
  
<tbody><tr>
<th>公共参数</th>
<th>类型</th>
<th>描述</th>
</tr>
<tr>
<td>event</td>
<td>String</td>
<td>回调事件，此回调返回值为 <code>room_close</code>。</td>
</tr>
<tr>
<td>appid</td>
<td>UInt32</td>
<td>APP 的唯一标识。</td>
</tr>
<tr>
<td>timestamp</td>
<td>Int64</td>
<td>服务器当前时间，Unix 时间戳，单位：秒。</td>
</tr>
<tr>
<td>nonce</td>
<td>String</td>
<td>随机数。</td>
</tr>
<tr>
<td>signature</td>
<td>String</td>
<td>检验串，详情见 [检验说明](https://doc-zh.zego.im/article/19700)。</td>
</tr>
<tr>
<th>业务参数</th>
<th>类型</th>
<th>描述</th>
</tr>
<tr>
<td>room_id</td>
<td>String</td>
<td>房间 ID。</td>
</tr>
<tr>
<td>room_session_id</td>
<td>UInt64</td>
<td><p>房间生命周期唯一标识，在该房间的整个生命周期中保持不变。<br />房间创建后，会生成唯一的 room_session_id；如果房间被销毁后，再用相同的 room_id 创建一个新的房间，会生成新的唯一的 room_session_id。</p>
<p>该参数与 <a href="https://doc-zh.zego.im/article/19670">登录房间回调</a>、<a href="https://doc-zh.zego.im/article/19672">退出房间回调</a> 中的参数 room_seq 一致。</p></td>
</tr>
<tr>
<td>close_reason</td>
<td>UInt32</td>
<td>
<p>房间关闭原因。</p>
<ul>
<li>0：正常关闭。</li>
<li>1：房间内的最后一个用户心跳超时，房间无人，所以关闭。</li>
<li>2：房间内的最后一个用户掉线，房间无人，所以关闭。</li>
<li>3：房间内的最后一个用户被 <a href="https://doc-zh.zego.im/article/19569">Kickout</a>，房间无人，所以关闭。</li>
</ul>
</td>
</tr>
<tr>
<td>room_close_time</td>
<td>String</td>
<td>房间关闭时间，为服务器当前时间，Unix 时间戳，单位：毫秒。</td>
</tr>
</tbody></table>

<Note title="说明">
建议您将部分参数转换为 Int 进行逻辑处理，相关字段包括 `room_close_time`。
</Note>



## 数据示例

```json
{
    "event": "room_close",
    "appid": 1,
    "timestamp": 1499676989,
    "nonce": "350176",
    "signature": "signature",
    "room_id": "rid_1242649",
    "room_session_id": 858012925204410400,
    "close_reason": 1,
    "room_close_time": "1499676989909"
}
```

## 返回响应

返回 HTTP status code 为 2XX （例如 200）表示成功，其他响应都表示失败。


## 回调重试策略

如果 ZEGO 服务器没有收到响应，或收到的 HTTP status code 不为 2XX（例如 200），都会尝试重试，**最多进行 5 次重试**。每次重试请求与**上一次请求**的间隔时间分别为 2s、4s、8s、16s、32s。若第 5 次重试后仍然失败，将不再重试，该回调丢失。
