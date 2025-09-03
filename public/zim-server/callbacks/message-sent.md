<Accordion title="展开查看详细内容" defaultOpen="false">
#### 基础参数

| 参数              | 类型     | 描述    |
|-----------------|--------|-------|
| md5             | String | 文件的 MD5 值。   |
| file_name       | String | 文件名称。  |
| file_size       | String | 文件大小，单位为字节（B）。  |
| download_url    | String | 下载地址。  |
| media_duration  | String | 音视频时长，单位为秒（s）。 |

#### 图片消息扩展参数

如果是图片消息，在基础参数上额外以下参数。

| 参数                      | 类型   | 描述                         |
|-------------------------|------|----------------------------|
| origin_image_width      | Int  | 原图的宽度，单位为像素（px）。   |
| origin_image_height     | Int  | 原图的高度，单位为像素（px）。   |
| large_image_download_url| String | 大图下载地址。                  |
| large_image_width       | Int  | 大图的宽度，单位为像素（px）。   |
| large_image_height      | Int  | 大图的高度，单位为像素（px）。   |
| thumbnail_download_url  | String | 缩略图下载地址。                |
| thumbnail_width         | Int  | 缩略图的宽度，单位为像素（px）。 |
| thumbnail_height        | Int  | 缩略图的高度，单位为像素（px）。 |

#### 视频消息扩展参数

如果是视频消息，在基础参数上额外以下参数。

| 参数                          | 类型   | 描述                           |
|-----------------------------|------|------------------------------|
| video_first_frame_download_url | String | 视频首帧图的下载地址。              |
| video_first_frame_width     | Int  | 视频首帧图的宽度，单位为像素（px）。   |
| video_first_frame_height    | Int  | 视频首帧图的高度，单位为像素（px）。   |
</Accordion>
<Accordion title="展开查看详细内容" defaultOpen="false">

| 参数              | 类型     | 描述    |
|-----------------|--------|-------|
| multi_msg       | Array of Object | 组合消息 Item 数组。  |
|  └msg_type       | Int | Item 类型：<ul><li>1：文本。</li><li>11：图片。</li><li>12：文档。</li><li>13：音频。</li><li>14：视频。</li><li>200：自定义消息类型。</li></ul>  |
|  └sub_msg_type | Int | 仅当 msg_type 为 200 时，返回此参数。  |
|  └callback_content | Object | Item 内容。<ul><li>仅当 msg_type 为 1 或 200 时，可直接在此参数阅读消息内容。</li><li>当 Item 为 11、12、13 或 14，请参考本文 [多媒体消息结构](#多媒体消息) 了解消息的的各个字段数据。</li></ul>  |
</Accordion>
<Accordion title="展开查看详细内容" defaultOpen="false">

| 参数              | 类型     | 描述    |
|-----------------|--------|-------|
| Title       | String | 标题。  |
| Summary       | String | 概要。  |
</Accordion>
# 消息发送后回调

- - -

## 描述

用户发送单聊、群聊、房间消息成功或失败后，业务后台可以接收 ZIM 服务端的发送消息回调，将用户发送的消息实时同步至业务服务器，并存储于业务服务器。

<Warning title="注意">

此回调支持的消息类型为文本消息、图片消息、文件消息、音频消息、视频消息、自定义消息，不支持信令消息、弹幕消息。 
</Warning>


## 回调说明

- 请求方法：POST。
  <Note title="说明">
  回调数据格式为 JSON，您需要对其进行 UrlDecode 解码。
  </Note>
- 请求地址：请在 [ZEGO 控制台](https://console.zego.im/) 上配置回调地址，配置流程请参考控制台文档 [ZIM 相关回调配置](https://doc-zh.zego.im/article/17223)。
- 传输协议：HTTPS/HTTP，建议使用 HTTPS。

## 回调参数

| 公共参数 | 类型 | 描述 |
|---------|------|------|
| appid | String | App 的唯一标识。 |
| event | String | 回调事件，此回调返回值为 `send_msg`。 |
| nonce | String | 随机数，用于计算 signature。 |
| signature | String | 检验串，详情见 [检验说明](/zim-server/callbacks/authenticating-server-to-server-callbacks)。 |
| timestamp | Int | 服务器当前时间，Unix 时间戳，单位为秒（s），用于计算 signature。 |


| 业务参数 | 类型 | 描述 |
|---------|------|------|
| from_user_id | String | 消息发送者 ID。 |
| conv_type | Int | 目标会话类型：<ul><li>0：单聊。</li><li>1：房间。</li><li>2：群聊。</li></ul> |
| conv_id | String | 目标会话 ID。<Note title="说明">当开发者使用服务端发送单聊消息时，此字段为空，"user_list"有值。</Note> |
| msg_type | Int | 消息类型：<ul><li>1：文本。</li><li>10：组合。</li><li>11：图片。</li><li>12：文档。</li><li>13：音频。</li><li>14：视频。</li><li>100：合并</li><li>200：自定义。</li></ul> |
| sub_msg_type | Int | 具体的自定义类型。值由用户发送自定义消息时填写，取值范围为 [0,200]。只有当 msg_type 为 200（自定义类型）时，此参数才有意义。 |
| source | Int | 消息来源：<ul><li>0：通过 SDK 接口发送的消息（默认）。</li><li>1：通过服务端接口发送的消息。</li></ul> |
| msg_body | String | 消息内容<ul><li>消息由客户端发送时（即 `source` 为0）：<ul><li>当 msg_type 为 1（文本类型）或 200（自定义类型），msg_body 为发送消息时传入的消息内容，开发者可直接阅读消息内容。</li><li>当 msg_type 为下列类型时，msg_body 为 JSON 字符串。请使用 URLDecode 对此 JSON 字符串解码，并按照对应结构获取消息中各字段数据：<ul><li>当 msg_type 为 11、12、13、14（多媒体消息）：<a href="#多媒体消息">msg_body JSON 字符串解析结果参数说明 - 多媒体消息</a>。</li><li>当 msg_type 为 10（组合消息）：<a href="#组合消息">msg_body JSON 字符串解析结果参数说明 - 组合消息</a>。</li><li>当 msg_type 为 100（合并消息）：<a href="#合并消息">msg_body JSON 字符串解析结果参数说明 - 合并消息</a>。</li></ul></li></ul></li><li>消息由服务端发送时（即 `source` 为1），不论消息类型，本回调会直接透传发送消息时传入的内容。</li></ul> |
| msg_id | String | 消息 ID，可借此确定消息的唯一性。<Warning title="注意">通过服务端 API <strong>批量</strong>发送单聊消息时，此字段为空。此时如需获取消息 ID，请从"user_list"获取。</Warning> |
| msg_seq | Int | 消息 Seq，可用于撤回消息。<Warning title="注意">通过服务端 API <strong>批量</strong>发送单聊消息时，此字段为空。此时如需获取消息 Seq，请从"user_list"获取。</Warning> |
| payload | String | 消息扩展字段。 |
| msg_time | Int | 服务端收到消息的时间，Unix 时间戳，单位为毫秒（ms）。 |
| send_result | Int | 消息发送结果。0 表示发送成功，其他整数为具体错误码，表示发送失败，您可参考 [全局返回码](/zim-server/return-codes) 了解原因。 |
| user_list | Array of Object | 只有通过服务端发送单聊消息时，回调会包含此字段，用于批量返回消息接收用户信息。<Note title="说明"><ul><li>此字段有值时，"conv_id"为空。</li><li>如果您在 2024 年 1 月 5 日前使用过本回调，会发现回调中不包含此字段。如需回调支持此字段，请联系 ZEGO 技术支持。</li></ul></Note> |
| └UserId | String | 消息接收用户。 |
| └MsgId | String | 消息 ID，可借此确定消息的唯一性。消息发送失败时，此字段为空。 |
| └MsgSeq | Int | 消息 Seq，可用于撤回消息。 |


<Note title="说明">
建议您将部分参数转换为 Int 进行逻辑处理，相关字段包括 `appid` 和 `nonce`。
</Note>

### msg_body JSON 字符串解析结果参数说明

#### 多媒体消息

<MediaMsgBodyDescriptionZh />

#### 组合消息

<MultiMsgBodyDescriptionZh />

#### 合并消息

<CombinedMsgBodyDescriptionZh />

## 数据示例

- POST/JSON

```json
{
    "appid": "1",
    "event": "send_msg",
    "nonce": "350176",
    "signature": "signature",
    "timestamp": 1679553625,
    "from_user_id": "350176117361",
    "conv_type": 0,
    "conv_id": "",
    "msg_type": 1,
    "msg_body": "msg_body",
    "msg_id": "857639062792568832",
    "payload": "payload",
    "msg_time": 1679554146000,
    "send_result": 0,
    "sub_msg_type": 0,
    "user_list":[
        {"UserId":"userid1","MsgId": "857639062792568822",},
        {"UserId":"userid2","MsgId": "857639062792568833",}
    ]
}
```

## 返回响应

收到回调后，如果您的服务器返回的 HTTP status code 为 2XX （例如 200），表示成功；返回其他，表示失败。

## 回调重试策略

如果 ZEGO 服务器没有收到响应，或收到的 HTTP status code 不为 2XX（例如 200），都会尝试重试，**最多进行 5 次重试**。每次重试请求与**上一次请求**的间隔时间分别为 2s、4s、8s、16s、32s。若第 5 次重试后仍然失败，将不再重试，该回调丢失。

## send_result 说明

以下仅列出了回调相关的返回码，完整返回码请参考 [全局返回码](/zim-server/return-codes)。

| 返回码      | 描述                                      | 可能原因                                         | 处理建议                     |
|-------------|------------------------------------------|------------------------------------------------|----------------------------|
| 660000002   | 输入参数错误。                            | 输入的参数缺失或不合法。                         | 请检查输入的参数。           |
| 660500002   | 用户未注册。                              | 消息发送者未登录过 SDK。                        | 请用户先登录后再发送消息。   |
| 660500004   | 文本审核请求出错。                        | 文本审核请求出错。                              | 请联系 ZEGO 技术支持。      |
| 660500005   | 发送的文本消息没有通过审核。              | 发送的文本消息没有通过审核。                    | 请勿发送该消息。             |
| 660500006   | 图片审核请求出错。                        | 图片审核请求出错。                              | 请联系 ZEGO 技术支持。      |
| 660500007   | 发送的图片消息没有通过审核。              | 发送的图片消息没有通过审核。                    | 请勿发送该消息。             |
| 660500009   | 您的业务后台判断此消息应当“静默发送”。    | 收到“消息发送前回调”后，您的业务后台返回了 2。 | 无需处理。                   |
| 660500010   | 您的业务后台判断此消息应当“不发送”。      | 收到“消息发送前回调”后，您的业务后台返回了 3。 | 无需处理。                   |
| 660600021   | 发送消息参数错误。                        | 发送消息参数错误。                              | 请检查参数。                 |
| 660600022   | 发送多媒体消息，获取重定向地址失败。      | 发送多媒体消息，获取重定向地址失败。            | 请联系 ZEGO 技术支持处理。  |
| 660600023   | 消息长度超过限制。                        | 消息长度超过限制。                              | 请缩小消息长度。             |