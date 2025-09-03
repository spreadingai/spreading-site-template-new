# 流创建回调

---

## 描述

当开发者有维护直播列表的需求时，APP 在流媒体服务器有流创建时，将会以 POST 的形式对回调地址进行请求。

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
<td>回调事件，此回调返回值为 <code>stream_create</code>。</td>
</tr>
<tr>
<td>appid</td>
<td>String</td>
<td>AppId。</td>
</tr>
<tr>
<td>timestamp</td>
<td>String</td>
<td>流创建后，服务器回调给客户时，服务器当前时间，Unix 时间戳。</td>
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
<td>用户 ID，同 publish_id 意义相同，不超过 255 字节。</td>
</tr>
<tr>
<td>user_name</td>
<td>String</td>
<td>用户昵称，同 publish_name 意义相同，不超过 255 字节。</td>
</tr>
<tr>
<td>channel_id</td>
<td>String</td>
<td>频道 ID，对应客户端的 RoomID，不超过 127 字节。</td>
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
<td>title</td>
<td>String</td>
<td>标题，不超过 255 字节。</td>
</tr>
<tr>
<td>stream_alias</td>
<td>String</td>
<td>流名，对应客户端的 StreamID，不超过 255 字节。</td>
</tr>
<tr>
<td>stream_attr</td>
<td>String</td>
<td><p>流信息。回调示例：`{\"cid\":0}`，其中 cid 表示该流的编码 ID，取值如下：</p><ul><li>0：H.264。</li><li>1：H.264 分层视频编码。</li><li>2：VP8 编码。</li><li>3：H.265。</li></ul></td>
</tr>
<tr>
<td>stream_seq</td>
<td>String</td>
<td>服务器流列表变更的 seq，每次流变更都会加 1。</td>
</tr>
<tr>
<td>create_time</td>
<td>String</td>
<td>流创建时，服务器当前时间，Unix 时间戳，单位：秒。</td>
</tr>
<tr>
<td>create_time_ms</td>
<td>String</td>
<td>流创建时，服务器当前时间，Unix 时间戳，单位：毫秒。</td>
</tr>
<tr>
<td>extra_info</td>
<td>String</td>
<td>流附加信息。</td>
</tr>
<tr>
<td>recreate</td>
<td>String</td>
<td>是否重复推流。<ul><li>1：表示客户端重新推了一条服务器已存在的流。</li><li>0：表示新流。</li></ul></td>
</tr>
<tr>
<td>publish_id</td>
<td>String</td>
<td>发布者 ID，对应客户端的 UserID，不超过 255 字节。</td>
</tr>
<tr>
<td>publish_name</td>
<td>String</td>
<td>发布者名字，对应客户端的 UserName，不超过 255 字节。</td>
</tr>
<tr>
<td>rtmp_url</td>
<td>Array of String</td>
<td>RTMP 拉流地址，不超过 1024 字节。</td>
</tr>
<tr>
<td>hls_url</td>
<td>Array of String</td>
<td>HLS 拉流地址，不超过 1024 字节。</td>
</tr>
<tr>
<td>hdl_url</td>
<td>Array of String</td>
<td>HDL 拉流地址，不超过 1024 字节。</td>
</tr>
<tr>
<td>pic_url</td>
<td>Array of String</td>
<td>CDN 截图地址，不超过 255 字节。</td>
</tr>
</tbody></table>

<Note title="说明">


建议您将部分参数转换为 Int 进行逻辑处理，相关字段包括 `create_time`、`create_time_ms`、`stream_seq`、`recreate`、`room_session_id`。

</Note>




## 数据示例

```json
{
    "event": "stream_create",
    "appid": "1",
    "timestamp": "1687981272",
    "nonce": "7254119327986670314",
    "signature": "xxx",
    "room_id": "room1",
    "room_session_id": "1234567",
    "user_id": "user1",
    "user_name": "user1_name",
    "channel_id": "0xb-0x1",
    "stream_id": "stream_id",
    "stream_sid": "s-115205136669740000000000104",
    "title": "title",
    "stream_alias": "aaa",
    "stream_attr": "{\"cid\":0}",
    "stream_seq": "01",
    "create_time": "1687981272",
    "create_time_ms": "1687981272742",
    "extra_info": "extra",
    "recreate": "0",
    "publish_id": "publish",
    "publish_name": "publish_name",
    "rtmp_url": [
        "rtmp://rtmp.wsdemo.zego.im/zegodemo/aaa",
        "rtmp://testplay.aliyun.zego.im/livestream/aaa"
    ],
    "hls_url": [
        "http://hls.wsdemo.zego.im/zegodemo/aaa/playlist.m3u8",
        "http://testplay.aliyun.zego.im/livestream/aaa.m3u8"
    ],
    "hdl_url": [
        "http://hdl.wsdemo.zego.im/zegodemo/aaa.flv",
        "http://testplay.aliyun.zego.im/livestream/aaa.flv"
    ],
    "pic_url": [
        "http://pic.wsdemo.zego.im/zegodemo/aaa.jpg"
    ]
}
```

## 返回响应

返回 HTTP status code 为 2XX （例如 200）表示成功，其他响应都表示失败。


## 回调重试策略

如果 ZEGO 服务器没有收到响应，或收到的 HTTP status code 不为 2XX（例如 200），都会尝试重试，**最多进行 5 次重试**。每次重试请求与**上一次请求**的间隔时间分别为 2s、4s、8s、16s、32s。若第 5 次重试后仍然失败，将不再重试，该回调丢失。
