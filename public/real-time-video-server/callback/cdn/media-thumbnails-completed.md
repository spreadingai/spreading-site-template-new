# 点播截图回调

- - -

## 描述

开发者通过 [开始点播截图](https://doc-zh.zego.im/article/21352) 接口完成媒体文件转码后，可以通过该回调查询截图信息。


## 回调说明

- 请求方法：POST。

<Note title="说明">

 
  回调数据格式为 JSON，您需要对其进行 UrlDecode 解码。
   
</Note>



- 请求地址：请联系 ZEGO 技术支持配置回调地址。
- 传输协议：HTTPS/HTTP，建议使用 HTTPS。

## 回调参数

| 公共参数 | 类型 | 描述 |
|---|---|---|
| event | String | 回调事件。<br/>此回调返回值为`snapshot` - 截图完成。 |
| appid | String | App 的唯一标识。 |
| timestamp | String | 服务器当前时间，Unix 时间戳。 |
| nonce | String | 随机数。 |
| signature | String | 检验串，详情见 [检验说明](https://doc-zh.zego.im/article/19700)。 |

| 业务参数 | 类型 | 描述 |
|---|---|---|
| task_id | String | 截图任务 ID，与 <a href="https://doc-zh.zego.im/article/21352" target="balnk">开始点播截图</a> 响应结果中的 task_id 保持一致。 |
| vendor | String | CDN 厂商：<ul><li>tencent：腾讯云。</li><li>hw：华为云。</li></ul> |
| field_id | String | 源媒体文件 ID。<br/>仅当 CND 厂商为腾讯云有该字段。 |
| snapshot_pic_list | Array SnapshotPicObject | 点播截图信息列表 JSON 数组格式字符串。 |
| └ url | string | 点播截图 URL |
| └ offset | float | 该张截图对应视频文件中的时间偏移，即为第多少毫秒的截图，单位为毫秒。<br/>仅当 CND 厂商为腾讯云时，在时间点截图条件下，才有该字段。 |



## 数据示例

```json
{
        "appid": "12345",  
        "event": "snapshot",
        "timestamp": "148150008",
        "nonce": "158243",
        "signature": "signature"
        "task_id": "1253642700910365374",
        "field_id": "abcwurywbhsfwi",
        "vendor": "tencent",
        "snapshot_pic_list": "[{\"url\":\"http://abc.com/1.jpg\",\"offset\":0},{\"url\":\"http://abc.com/1.jpg\",\"offset\":0}]",
}
```


## 返回响应

返回 HTTP status code 为 2XX （例如 200）表示成功，其他响应都表示失败。


## 回调重试策略

如果 ZEGO 服务器没有收到响应，或收到的 HTTP status code 不为 2XX（例如 200），都会尝试重试，**最多进行 5 次重试**。每次重试请求与**上一次请求**的间隔时间分别为 2s、4s、8s、16s、32s。若第 5 次重试后仍然失败，将不再重试，该回调丢失。
