# 流关闭回调

---

## 描述

当开发者有维护直播列表的需求时，APP 在流媒体服务器有流关闭时，将会以 POST 的形式对回调地址进行请求。

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
<td>回调事件，此回调返回值为 <code>stream_close</code>。</td>
</tr>
<tr>
<td>appid</td>
<td>String</td>
<td>AppId。</td>
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
<th>业务参数</th>
<th>类型</th>
<th>描述</th>
</tr>
<tr>
<td>room_id</td>
<td>String</td>
<td>房间 ID，对应客户端的 RoomID，同 channel_id 意义相同，不超过 127 字节。</td>
</tr>
<tr>
<td>room_session_id</td>
<td>String</td>
<td>房间生命周期唯一标识，在该房间的整个生命周期中保持不变。</td>
</tr>
<tr>
<td>user_id</td>
<td>String</td>
<td>用户 ID，不超过 255 字节。</td>
</tr>
<tr>
<td>user_name</td>
<td>String</td>
<td>用户昵称，不超过 255 字节。</td>
</tr>
<tr>
<td>channel_id</td>
<td>String</td>
<td>频道 ID，对应客户端的 RoomID，不超过 127 字节。</td>
</tr>
<tr>
<td>type</td>
<td>String</td>
<td>关闭类型。<ul><li>0：正常关闭（用户调用 SDK 的 <a href="https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~ZegoExpressEngine#stop-publishing-stream" target="blank">stopPublishingStream</a> 接口停止推流）。</li><li>非 0 为异常关闭：<ul><li>1：用户心跳超时关闭。</li><li>2：用户重复登录同一个房间，关闭上次登录会话的流。</li><li>3：服务端接口 kickout 用户，关闭用户创建的流。</li><li>4：tcp 掉线关闭流（可配置通知时间）。</li><li>5：房间被清除关闭流。</li><li>100：调用服务端接口 <a href="https://doc-zh.zego.im/article/19563" target="blank">DeleteStream</a> 关闭流。</li></ul></li></ul></td>
</tr>
<tr>
<td>stream_alias</td>
<td>String</td>
<td>流名，对应客户端的 StreamID，不超过 255 字节。</td>
</tr>
<tr>
<td>stream_id</td>
<td>String</td>
<td>流 ID，对应客户端的 StreamID，同 stream_alias 意义相同。</td>
</tr>
<tr>
<td>stream_sid</td>
<td>String</td>
<td>流 server ID, 流的唯一标识，由 ZEGO 后台生成，开发者可不关注。</td>
</tr>
<tr>
<td>stream_seq</td>
<td>String</td>
<td>服务器流列表变更的 seq，每次流变更都会加 1。</td>
</tr>
<tr>
<td>third_define_data</td>
<td>String</td>
<td>客户自定义数据。</td>
</tr>
<tr>
<td>create_time_ms</td>
<td>String</td>
<td>流创建时间，服务器当前时间，Unix 时间戳。单位：毫秒。</td>
</tr>
<tr>
<td>destroy_timemillis</td>
<td>String</td>
<td>流关闭时间，服务器当前时间，Unix 时间戳。单位：毫秒。</td>
</tr>
</tbody></table>

<Note title="说明">


建议您将部分参数转换为 Int 进行逻辑处理，相关字段包括 `type`、`destroy_timemillis`、`stream_seq`、`create_time_ms`、`room_session_id`。

</Note>



## 数据示例

```json
{
    "event": "stream_close",
    "appid": "1",
    "timestamp": "1666786067",
    "nonce": "7266888922840654370",
    "signature": "xxx",
    "room_id": "room1",
    "room_session_id": "123456789",
    "user_id": "user1",
    "user_name": "user1_name",
    "channel_id": "0xb-0x1",
    "type": "0",
    "stream_alias": "aaa",
    "stream_id": "stream_id",
    "stream_sid": "s-115205136669740000000000104",
    "stream_seq": "700",
    "third_define_data": "{\"u\":\"S1lxOUxMN2tRZ3lIY0JMSUs3VlMxZz09\"}",
    "create_time_ms": "1666786067353",
    "destroy_timemillis": "1666986067248"
}
```

## 返回响应

返回 HTTP status code 为 2XX （例如 200）表示成功，其他响应都表示失败。


## 回调重试策略

如果 ZEGO 服务器没有收到响应，或收到的 HTTP status code 不为 2XX（例如 200），都会尝试重试，**最多进行 5 次重试**。每次重试请求与**上一次请求**的间隔时间分别为 2s、4s、8s、16s、32s。若第 5 次重试后仍然失败，将不再重试，该回调丢失。
