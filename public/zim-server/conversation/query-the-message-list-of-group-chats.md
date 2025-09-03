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
# 查询群聊会话消息列表

- - -

## 描述

调用此接口，分页拉取某个群聊会话的消息列表。

## 接口原型

- 请求方法：POST
- 请求地址：`https://zim-api.zego.im/?Action=QueryGroupMsg`
- 传输协议：HTTPS
- 调用频率限制：20次/秒。

## 请求参数

以下请求参数列表仅列出了接口请求参数和部分公共参数，完整公共参数列表请参考 [调用方式 - 公共请求参数](/zim-server/accessing-server-apis#2-公共参数)。

<table>
<tbody><tr data-row-level="1">
<th>参数</th>
<th>类型</th>
<th>是否必选</th>
<th>描述</th>
</tr>
<tr data-row-level="2">
<td>GroupId</td>
<td>String</td>
<td>是</td>
<td>群组 ID。</td>
</tr>
<tr data-row-level="4">
<td>Limit</td>
<td>Number</td>
<td>否</td>
<td>单次获取消息的数量，取值范围为 (0, 100]，默认为 10。
<ul><li>当值 ≤ 0 时，修正为 10。</li><li>当值 &gt; 100，修正为 100。</li></ul></td>
</tr>
<tr data-row-level="5">
<td>Next</td>
<td>Number</td>
<td>否</td>
<td><p>分页拉取标志，第一次填 0 ，之后填上一次返回的 Next 值。当返回的 Next 为 0 时，代表消息列表获取完毕。</p><p> 例如，当前群聊会话有 250 条消息，调用本接口查询时：</p><ol><li> 第一次调用本接口，Limit 填 100，Next 传 0，查询第 1 ～100 条消息；返回结果中的 Next 值为 num1。</li><li> 第二次调用本接口，Limit 填 100，Next 填 num1，查询第 101 ～ 200 条消息；返回结果中 Next 值为 num2。</li><li> 第三次调用本接口，Limit 填 100，Next 填 num2，查询第 201 ～ 250 条消息；查询完毕，返回结果中的 Next 为 0。</li></ol><p></p></td>
</tr>
<tr data-row-level="6">
<td>WithEmptyMsg</td>
<td>Number</td>
<td>否</td>
<td>返回结果是否包含已撤回消息和在服务端被删除的消息。
<ul><li>0：默认值，不包含。</li><li>1：包含。</li></ul></td>
</tr>
</tbody></table>

## 请求示例

- 请求地址 URL：

```json
https://zim-api.zego.im/?Action=QueryGroupMsg
&<公共请求参数>
```

- 请求消息体：

```json
{
    "GroupId": "group1",
    "Limit": 10,
    "Next": 0,
    "WithEmptyMsg": 0
}
```

## 响应参数

<table class="collapsible-table" >
<tbody><tr data-row-level="1">
<th>参数</th>
<th>类型</th>
<th>描述</th>
</tr>
<tr data-row-level="2">
<td>Code</td>
<td>Number</td>
<td>返回码。</td>
</tr>
<tr data-row-level="3">
<td>Message</td>
<td>String</td>
<td>请求结果的说明信息。</td>
</tr>
<tr data-row-level="4">
<td>RequestId</td>
<td>String</td>
<td>请求 ID。</td>
</tr>
<tr data-row-level="5">
<td>Next</td>
<td>Number</td>
<td>分页拉取标志。<ul><li>非 0：表示还有消息未返回，需要将该字段设置到请求参数 Next&nbsp;中拉取更多消息。</li><li>为 0：表示已经返回完整消息列表。</li></ul><Note>除上述说明之外，此字段与列表信息无任何关联，请勿基于此做任何其他逻辑。</Note></td>
</tr>
<tr data-row-level="6" data-row-child="true">
<td>List</td>
<td>Array of Object</td>
<td>消息列表。按 MsgTime 降序返回结果。</td>
</tr>
<tr data-row-level="6-1">
<td>└Sender</td>
<td>String</td>
<td>消息发送者 ID。</td>
</tr>
<tr data-row-level="6-2">
<td>└MsgType</td>
<td>Number</td>
<td>消息类型：<ul><li>1：文本。</li><li>10：组合。</li><li>11：图片。</li><li>12：文档。</li><li>13：音频。</li><li>14：视频。</li><li>200：自定义。</li></ul></td>
</tr>
<tr data-row-level="6-3">
<td>└SubMsgType</td>
<td>Number</td>
<td>具体的自定义类型。值由用户发送自定义消息时填写，取值范围为 [0,200]。只有当 MsgType 为 200（自定义类型）时，此参数才有意义。</td>
</tr>
<tr data-row-level="6-4">
<td>└MsgBody</td>
<td>String</td>
<td>消息内容。<ul><li>当 MsgType 为 1（文本类型）或 200（自定义类型），MsgBody 为发送消息时传入的消息内容，开发者可直接阅读消息内容。</li><li>当 MsgType 为下列类型时，MsgBody 为 JSON 字符串。请使用 URLDecode 对此 JSON 字符串解码，并按照对应结构获取消息中各字段数据：<ul><li>当 MsgType 为 11、12、13、14（多媒体消息）：<a href="#多媒体消息">MsgBody JSON 字符串解析结果参数说明 - 多媒体消息</a>。</li><li>当 MsgType 为 10（组合消息）：<a href="#组合消息">MsgBody JSON 字符串解析结果参数说明 - 组合消息</a>。</li></ul></li></ul></td>
</tr>
<tr data-row-level="6-5">
<td>└MsgId</td>
<td>Number</td>
<td>消息 ID，可借此确定消息的唯一性。</td>
</tr>
<tr data-row-level="6-6">
<td>└MsgSeq</td>
<td>Number</td>
<td>消息 Seq</td>
</tr>
<tr data-row-level="6-7">
<td>└Payload</td>
<td>String</td>
<td>消息扩展字段。</td>
</tr>
<tr data-row-level="6-8">
<td>└MsgTime</td>
<td>Number</td>
<td>服务端收到消息的时间，Unix 时间戳，单位为毫秒（ms）。</td>
</tr>
<tr data-row-level="6-9">
<td>└IsEmpty</td>
<td>Number</td>
<td>是否是空消息。
<ul><li>0：非空。</li><li>1：消息被删除或者已过期。</li><li>2：消息被撤回。</li></ul></td>
</tr>
</tbody></table>

### MsgBody JSON 字符串解析结果参数说明

#### 多媒体消息

<MediaMsgBodyDescriptionZh />

#### 组合消息

<MultiMsgBodyDescriptionZh />

## 响应示例

```json
{
    "Code": 0
    "Message": "success",
    "RequestId": "343649807833778782",
    "Next": 1000,
    "List": [
        {
            "Sender": "user1",
            "MsgType": 1,
            "MsgBody": "这是一条消息",
            "MsgId": 971503777289036700,
            "MsgSeq": 1,
            "Payload": "Payload",
            "MsgTime": 1705895412000,
            "IsEempy": 0
        },
        ...
    ]
}
```


## 返回码

以下仅列出了接口业务逻辑相关的返回码，完整返回码请参考 [全局返回码](/zim-server/return-codes)。

<table>

<tbody><tr>
<th>返回码</th>
<th>说明</th>
<th>处理建议</th>
</tr>
<tr>
<td>660000002</td>
<td>输入参数错误。</td>
<td>请检查输入的参数。</td>
</tr>
<tr>
<td>660300005</td>
<td>调用接口的频率超出了 AppID 级别限制。</td>
<td>请稍后再试。</td>
</tr>
<tr>
<td>660500002</td>
<td>`FromUserId` 未注册。</td>
<td>请检查 `FromUserId` 是否正确。</td>
</tr>
<tr>
<td>660600001</td>
<td>输入的 GroupId 不存在。</td>
<td>请确认输入的 GroupId 是否正确。</td>
</tr>
<tr>
<td>660600009</td>
<td>获取群相关信息失败。</td>
<td>请先确认 GroupId 是否正确。如果正确，请联系 ZEGO 技术支持。</td>
</tr>
</tbody></table>
