为提高数据安全性，建议开发者在收到 ZEGO 服务端发出的回调时，进行本地签名计算，并与 signature 进行对比，判断该请求是否合法。

校验的使用流程如下：

<Steps>
<Step title="对参数进行排序">
将 `callbacksecret`、`timestamp`、`nonce` 三个参数按照字典序进行排序
</Step>
<Step title="计算 SHA1">
将排序后的 `callbacksecret`、`timestamp`、`nonce` 拼接成一个字符串并进行sha1计算
</Step>
<Step title="校验 signature">
将计算后的哈希字符串与 `signature` 进行校验对比，如果相同则标识该请求来源于 ZEGO
</Step>
</Steps>

参数说明如下：

| 参数 | 说明  |
|---- | ------ | 
| callbacksecret  | 服务端校验密钥。在 [ZEGO 控制台](https://console.zego.im/) 注册项目时生成，可在 “控制台 > 项目配置 > 项目信息 > 配置信息” 中查看。 | 
| timestamp| Unix 时间戳。|
| nonce | 随机数。|

<Accordion title="使用示例" defaultOpen="false">

以下示例代码用于生成和检验 signature。

<CodeGroup> 
```PHP title="PHP 示例"
// 从请求参数中获取到 signature, timestamp, nonce
$signature = $_POST["signature"];
$timestamp = $_POST["timestamp"];
$nonce = $_POST["nonce"];

$secret = callbacksecret;// 控制台获取的 callbacksecret
$tmpArr = array($secret, $timestamp, $nonce);
sort($tmpArr, SORT_STRING);
$tmpStr = implode( $tmpArr );
$tmpStr = sha1( $tmpStr );

if( $tmpStr == $signature ){
    return true;
} else {
    return false;
}
```
```java title="Java 示例"
// 从请求参数中获取到 signature, timestamp, nonce
String signature = request.getParameter("signature");
long timestamp = request.getParameter("timestamp");
String nonce = request.getParameter("nonce");

// 控制台获取的 callbacksecret
String secret = callbacksecret;

String[] tempArr = {secret, ""+timestamp, nonce};
Arrays.sort(tempArr);
        
String tmpStr = "";
for (int i = 0; i < tempArr.length; i++) {
    tmpStr += tempArr[i];
}
tmpStr = org.apache.commons.codec.digest.DigestUtils.sha1Hex(tmpStr);

return tmpStr.equals(signature);
```

</CodeGroup>

输出示例如下：

```PHP title="PHP 示例"
$nonce = 123412;
$timestamp = 1470820198;
$secret = 'secret';
// 三个参数经过排序后的顺序为：nonce、timestamp、secret
// 排序拼接后需要加密的原始串为：1234121470820198secret
// 哈希运算的结果为：5bd59fd62953a8059fb7eaba95720f66d19e4517
```

</Accordion>
# 录制状态回调
---

<Warning title="注意">

- **回调服务不能保证完全可靠，请慎重考虑使用回调方案构建核心业务流程的风险。**
- 该回调接口为 v2 版本的回调，仅 **2021-11-29** 之后开通云端录制服务的用户会收到本回调。请 **2021-11-29** 之前开通云端录制服务的用户参考 [旧版回调接口](https://doc-zh.zego.im/article/5861)。
</Warning>

## 描述

如需要第一时间获知任务状态事件，需要在开通云端录制服务时提供回调地址，详情请参考 [项目管理 - 服务配置](https://doc-zh.zego.im/article/14334) 中的“云端录制”。

录制任务过程中会以 POST 方式向回调地址发起 HTTP 请求，请求包体为 JSON 格式。

## 回调参数

|参数|类型|描述|
|:----|:----|:----|
|app_id|Int64|ZEGO 给开发者分配的 AppID，唯一标识一个应用。|
|task_id|String|录制任务 ID，长度固定为 16 个字节的字符串。|
|room_id|String|录制房间 ID。|
|event_type|Int|事件通知类型。<ul><li>1：录制文件上传状态通知，在完成录制文件上传后触发，详细信息请查看 detail 参数。</li><li>2：录制任务异常结束状态通知，详细信息请查看 `detail` 参数。</li><li>3：录制过程中自定义背景图/水印图下载失败通知，详细信息请查看 `detail` 参数。</li><li>4：录制过程中房间内流数量为 0 通知。<br />房间内流的数量变为 0 后的 30 秒内会触发此事件。首次触发后，若房间内一直无流，会每隔 30 秒触发一次此事件直到有流或者任务因无流超时异常结束。 </li><li>5：录制正常退出通知。</li><li>6：录制的流不存在，详细信息请查看 `detail` 参数。</li><li>7：录制已停止，正在上传录制的文件。</li><li>102：实时上传分片时，通知 M3U8 文件地址。</li><li>201：暂停录制成功。</li><li>202：恢复录制成功。</li></ul>|
|message|String|事件描述。|
|nonce|String|随机数，用于检验串计算。|
|timestamp|String|回调发送时的 Unix 时间戳，用于检验串计算。|
|signature|String|检验串，验证回调发送方身份。|
|sequence|Int|消息序列号，从 0 开始计数。|
|detail|JSON Object|事件详细信息，详情请参考 [detail](#detail)|

<span id="detail"></span>
**detail**

请根据 `event_type` 的不同取值，查看 detail 包含字段详情。

<Tabs>
<Tab title="1">
|参数|类型|描述|
|:----|:----|:----|
|upload_status| int |录制文件上传整体状态。<ul><li>1: 全部文件上传成功</li><li>2: 部分文件上传成功（文件信息列表中有至少一个文件的 status 不为 3）。</li></ul>|
|file_info|Array of Object|文件信息列表。列表为空表示没有产生录制文件（房间内没有用户推流）。|
|└user_id|String|录制流对应的推流用户 ID（混流时，为 MixOutputStreamId）。|
|└user_name|String|录制流对应的推流用户昵称（混流时，为 MixOutputStreamId）。|
|└stream_id|String|录制流对应的流 ID（混流时，为 MixOutputStreamId）。|
|└file_id|String|录制文件名称，详情请参考 [开始录制](/cloud-recording-server/start) 中的 OutputFileRule 参数。|
|└video_id|String|阿里云 Vod、腾讯云 Vod 上传成功得到的视频 ID 参数。阿里云 Vod 对应的是 VideoId，腾讯云 Vod 对应的是 FileId。|
|└file_url|String|文件访问 URL。第三方存储为七牛云或阿里云 Vod 时不返回。|
|└output_file_format|String|输出录制文件的格式，包括 “mp4”、“flv”、“hls”、“aac” 和 “jpg”。|
|└file_size|Int64|文件大小，单位：字节。|
|└duration|Int|文件时长，单位：ms。|
|└resolution_width|Int|视频分辨率宽，单位：像素。|
|└resolution_height|Int|视频分辨率高，单位：像素。|
|└media_track_type|Int|文件媒体类型。<ul><li>1：只有音频</li><li>2：只有视频</li><li>3：音视频</li></ul>|
|└begin_timestamp|Int64|开始录制文件时的 Unix 时间戳，单位：ms。|
|└status|Int|文件状态。<ul><li>3：上传成功，表示上传录制文件至客户指定云存储成功。</li><li>4：已经上传至备份云存储，表示上传客户指定云存储失败，已上传至 ZEGO 备份云存储。<strong>请注意，ZEGO 备份云存储的有效期为 3 天，请您及时下载录制文件，保存到本地。</strong></li><li>5：上传失败，表示上传客户指定云存储和 ZEGO 备份云存储均失败。</li></ul>|
</Tab>
<Tab title="2">
|参数|类型|描述|
|:----|:----|:----|
| quit_reason | int |录制服务异常退出原因。<ul><li>1：录制服务启动失败，建议重新发起录制请求。</li><li>2：录制服务登录房间失败，请确保要录制的房间可登录。</li><li>3：房间内没有任何流、白板的时间超过了 [开始录制](/cloud-recording-server/start) 时 MaxIdleTime 设置的值（默认 30 秒），导致录制任务自动结束。</li><li>4：达到 [开始录制](/cloud-recording-server/start) 时 设置的最大录制时长 MaxRecordTime（默认 24 小时），导致录制任务自动结束。</li><li>5：录制引擎启动失败，建议重新发起录制请求。</li><li>6：录制服务网络连接断开，建议重新发起录制请求。</li><li>1001：录制未知错误，建议重新发起录制请求。</li><li>1002：录制文件名太长，请参考 [OutputFileRule](/cloud-recording-server/start#OutputFileRule)。</li><li>1003：录制文件打开失败，建议重新发起录制请求。</li><li>1004：录制服务存储空间不足，建议重新发起录制请求。</li><li>1005：录制引擎初始化失败，建议重新发起录制请求。</li><li>1006：录制写文件头失败，建议重新发起录制请求。</li><li>1007：录制写文件 EBADF，建议重新发起录制请求。</li><li>1008：录制写文件 EIO，建议重新发起录制请求。</li><li>1009：录制内部 Channel 错误，建议重新发起录制请求。</li><li>1010：不支持的录制文件格式，请参考 [OutputFileFormat](/cloud-recording-server/start#OutputFileFormat)。</li><li>1011：录制非法状态，建议重新发起录制请求。</li></ul>|
</Tab>
<Tab title="3">
|参数|类型|描述|
|:----|:----|:----|
| image_type | int |下载失败的图片类型，对应 [开始录制](/cloud-recording-server/start) 时设置的图片类型。<ul><li>1: 视频画布背景图（MixOutputBackgroundImage）。</li><li>2: 水印图（MixOutputWatermarkImage）</li><li>3: 流画面默认背景图（DefaultMixStreamBackgroundImage）</li><li>4: 自定义布局流画面背景图（BackgroundImage）</li></ul>|
| image_url | String |下载失败的图片 url。|
</Tab>
<Tab title="4、5、7、201 或 202">
内容为空。
</Tab>
<Tab title="6">
|参数|类型|描述|
|:----|:----|:----|
|stream_id|String| 录制流对应的流 ID。|
</Tab>
<Tab title="102">
|参数|类型|描述|
|:----|:----|:----|
|stream_id|String| 录制流对应的流 ID。|
|file_id|String| 录制文件名称。|
|file_url|String| 文件访问 URL。|
|media_track_type| Int | 文件媒体类型。 <ul><li>1：只有音频。</li><li>2：只有视频。</li><li>3：音视频。</li></ul>|
</Tab>
</Tabs>

<Note title="说明">录制状态回调的相关参数，ZEGO 会在之后的迭代计划中，持续优化更新（例如：新增字段、或新增某些字段的参数取值）。开发者在接入时，请避免将代码写死，造成后期更新后，无法兼容新版本。</Note>

## 回调示例

以下是录制结束回调的请求示例。
```json
{
    "app_id": 1234567890, 
    "detail": {
        "file_info": [
            {
                "begin_timestamp": 1637753762084, 
                "duration": 170039, 
                "file_id": "YZ4joOE4IwmFAAAT_6677_800221_800221_VA_20211124113602084.mp4", 
                "file_size": 25349026, 
                "file_url": "file_url", 
                "media_track_type": 3, 
                "output_file_format": "mp4", 
                "resolution_height": 720, 
                "resolution_width": 1280, 
                "status": 3, 
                "stream_id": "800221", 
                "user_id": "800221", 
                "user_name": "play_800221", 
                "video_id": ""
            }
        ], 
        "upload_status": 1
    }, 
    "event_type": 1, 
    "message": "", 
    "nonce": "100480", 
    "room_id": "6677", 
    "sequence": 1, 
    "signature": "12345678987654321", 
    "task_id": "YZ4joOE4IwmFAAAT", 
    "timestamp": "1637753949"
}
```

## 验证签名

<Content />

## 返回响应

当您收到回调后，请返回 HTTP status code 为 2XX （例如 200），表示接收成功。返回其他，都表示接收失败。

## 回调重试策略

如果 ZEGO 服务器没有收到响应，会尝试重试，最多进行 2 次重试。每次重试请求与上一次请求的间隔时间为 5s。若第 2 次重试后仍然失败，将不再重试，该回调丢失。
