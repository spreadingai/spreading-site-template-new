# MessageBody 说明

- - -

ZIM 服务端支持开发者通过服务端 API 向会话发送不同类型的消息，支持类型如下表所示：

<table>
<tbody><tr>
<th>消息类型</th>
<th>MessageType 值</th>
<th>适用会话类型</th>
<th>是否支持全员推送</th>
</tr>
<tr>
<td>[文本消息](#文本消息自定义消息和弹幕消息)</td>
<td>1</td>
<td rowspan="8"><ul><li>单聊</li><li>群聊</li><li>房间</li></ul></td>
<td>✔️</td>
</tr>
<tr>
<td>[信令消息](#信令消息)</td>
<td>2</td>
<td>✖</td>
</tr>
<tr>
<td>[组合消息](#组合消息)</td>
<td>10</td>
<td>✖</td>
</tr>
<tr>
<td>[图片消息](#图片消息)</td>
<td>11</td>
<td>✔️</td>
</tr>
<tr>
<td>[文件消息](#文件消息)</td>
<td>12</td>
<td>✔️</td>
</tr>
<tr>
<td>[音频消息](#音频消息)</td>
<td>13</td>
<td>✔️</td>
</tr>
<tr>
<td>[视频消息](#视频消息)</td>
<td>14</td>
<td>✔️</td>
</tr>
<tr>
<td>[自定义消息](#文本消息自定义消息和弹幕消息)</td>
<td>200</td>
<td>✔️</td>
</tr>
<tr>
<td>[弹幕消息](#文本消息自定义消息和弹幕消息)</td>
<td>20</td>
<td>房间</td>
<td>✖</td>
</tr>
</tbody></table>

开发者在调用 ZIM 服务端接口发送消息时，需要通过参数 MessageBody 传入消息内容。MessageBody 的格式消息类型而不同，本文将介绍各类型消息的对应参数。
## 文本消息、自定义消息和弹幕消息

### MessageBody 结构

文本消息、自定义消息和弹幕消息的 MessageBody 结构相同，说明如下：

| 参数 | 类型 | 是否必选 | 描述 |
|------|------|----------|------|
| Message | String | 是 | 消息内容，默认为 2 KB，不可为空。如有需要，请联系 ZEGO 技术支持配置，最大可达 32 KB。 |
| ExtendedData | String | 否 | 扩展字段，长度上限为 1 KB，如需上调，请联系 ZEGO 技术支持。 |
| OfflinePush | Object | 否 | 离线推送配置，详情请参考 <a href="#offlinepush-说明房间消息不支持此字段">OfflinePush 说明。</a><Warning title="注意">导入消息时，此参数无意义。</Warning> |
| HasReceipt | Number | 否 | 消息是否附带回执：<ul><li>0：不是。</li><li>1：是。</li></ul><Warning title="注意"><ul><li>弹幕消息不支持附带回执。</li><li>导入消息时，此参数无意义。</li></ul></Warning> |

### OfflinePush 说明（房间消息不支持此字段）

| 参数 | 类型 | 是否必选 | 描述 |
|------|------|----------|------|
| Enable | Number | 否 | 是否推送：<ul><li>0：（默认）否。</li><li>1：是。</li></ul> |
| Title | String | 否 | 离线推送展示的标题。 |
| Content | String | 否 | 离线推送展示的内容。 |
| Payload | String | 否 | 扩展字段，开发者可以自定义收到离线推送消息后的行为。 |
| PushStrategyId | String | 否 | 自定义推送策略，配置方式请参考 [resourcesID 说明](/zim-android/offline-push-notifications/resourcesid-introduction)。<Warning title="注意"><ul><li>此字段仅适用于 [发送单聊消息](/zim-server/messaging/send-a-one-to-one-message)、[发送群聊消息](/zim-server/messaging/send-group-messages) 和 [全员推送](/zim-server/messaging/push-message-to-all-users) 接口。</li><li>如需实现向国内 Android 厂商无限制推送，此参数为 **必填**，且请先参考如下文档，开通各厂商的私信通道：<ul><li>[小米推送集成指南 - 使用私信通道无限制推送](/zim-android/offline-push-notifications/integrate-xiaomi#使用私信通道无限制推送)</li><li>[华为推送集成指南 - 基于消息分类实现无限制推送](/zim-server/messaging/zh/zim-android/offline-push-notifications/integrate-huawei#基于消息分类实现无限制推送)</li><li>[OPPO 推送集成指南 - 使用私信通道不限量推送](/zim-android/offline-push-notifications/integrate-oppo#使用私信通道不限量推送)</li><li>[vivo 推送集成指南 - 基于系统消息配置不限量推送](/zim-server/messaging/zh/zim-android/offline-push-notifications/integrate-vivo#基于系统消息配置不限量推送)</li></ul></li></ul></Warning> |
| PushImageInfo | Object | 否 | 图片推送信息。<Warning title="注意"><ul><li>此字段仅适用于 [全员推送](/zim-server/messaging/push-message-to-all-users) 接口。</li></ul></Warning> |
| └Apns | Object | 否 | 苹果推送额外信息。 |
| &nbsp;&nbsp;&nbsp;&nbsp;└Image | String | 否 | 该字段用于标识 APNs 携带的图片地址，当客户端拿到该字段时，可以通过下载图片资源的方式将图片展示在弹窗上。 |
| └Android | Object | 否 | 安卓推送额外信息。 |
| &nbsp;&nbsp;&nbsp;&nbsp;└HuaWei | Object | 否 | 华为推送通道相关配置。 |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└Image | String | 否 | 图片文件须小于 512 KB，规格建议为 40dp x 40dp，弧角大小为 8dp。超出建议规格的图片会存在图片压缩或图片显示不全的情况。图片格式建议使用JPG/JPEG/PNG。必须是https协议的链接。 |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└Icon | String | 否 | 图标文件必须存放在应用的 `/res/raw` 路径下。例如，"icon" 的值为"res/raw/ic_launcher"，标识您应用本地的小图标路径为"/res/raw/ic_launcher.jpg"。 |
| &nbsp;&nbsp;&nbsp;&nbsp;└FCM | Object | 否 | 谷歌推送通道相关配置。 |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└Image | String | 否 | 图片地址，大小限制 1M 以内。 |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└Icon | String | 否 | 图标地址。 |
| EnableBadge | Boolean | 否 | 系统推送是否携带角标信息。<ul><li>true：是。</li><li>false：否。</li></ul> |
| BadgeIncrement | Number | 否 | 指定用户接收离线推送时，App 图标角标应增加的数量。默认为 0。取值范围 [0, 99]，超过 99 按 99 处理。|

### MessageBody 示例

```json
{
  "MessageBody": {
      "Message":"hello world",
      "ExtendedData":"extendedData",
      "OfflinePush" :{
          "Enable":0,
          "Title":"Title",
          "Content":"Content",
          "Payload":"data"
      },
      "HasReceipt": 1
  }
}
```

## 信令消息

### MessageBody 结构

| 参数 | 类型 | 是否必选 | 描述 |
|------|------|----------|------|
| Message | String | 是 | 信令消息内容，默认为 2 KB，不可为空。如有需要，请联系 ZEGO 技术支持配置，最大可达 32 KB。<Warning title="注意"><p>若消息为经 base64 编码后的内容，则此处的长度限制指的是在 base64 编码前的原消息长度。</p></Warning> |
| ExtendedData | String | 否 | 扩展字段，长度上限为 1 KB，如需上调，请联系 ZEGO 技术支持。 |
| IsBase64 | Number | 否 | 是否为 base64 编码后的消息。<ul><li>0：否（默认）。</li><li>1：是。ZIM 服务端收到此消息后，会进行 base64 解码，获取实际消息内容，再发送给 ZIM SDK。</li></ul> |


### MessageBody 示例

```json
{
    "MessageBody": {
        "Message":"hello world",
        "ExtendedData":"extendedData",
        "IsBase64":0
    }
}
```

## 组合消息

### MessageBody 结构

| 参数           | 类型    | 是否必选 | 描述                                                                 |
|---------------|--------|--------|--------------------------------------------------------------------|
| Message       | String | 是      | 组合消息内容，为按照组合消息类型的 [Message 结构](#message-结构)生成的 JSON 字节串，默认为 5 KB，不可为空。如有需要，请联系 ZEGO 技术支持配置，最大可达 32 KB。 |
| ExtendedData  | String | 否      | 扩展字段，长度上限为 1 KB，如需上调，请联系 ZEGO 技术支持。                             |
| OfflinePush   | Object | 否      | 离线推送配置，详情请参考 [OfflinePush 说明](#offlinepush-说明房间消息不支持此字段)。<Warning title="注意">导入消息时，此参数无意义。</Warning>                                  |
| HasReceipt    | Number | 否      | 消息是否附带回执：<ul><li>0：不是。</li><li>1：是。</li></ul><Warning title="注意">导入消息时，此参数无意义。</Warning>                               |

### MessageBody 示例

```json
{
    "MessageBody": {
        "Message":"", // 组合消息内容，为按组合消息类型的 Message 结构生成的 JSON 字节串
        "ExtendedData":"extendedData",
        "OfflinePush" :{
            "Enable":0, 
            "Title":"Title",
            "Content":"Content", 
            "Payload":"data"
        },
        "HasReceipt": 1
    }
}
```

### Message 结构

| 参数      | 类型          | 是否必选 | 描述           |
|----------|--------------|--------|--------------|
| MultiMsg | Array of Object | 是 | 组合消息 Item 数组，长度上限为 20。 |
| └MsgType         | Number | 是      | Item 类型，目前支持 1（文本）、11（图片）、12（文本）、13（音频）、14（视频）和 200（自定义消息）。                           |
| └SubMsgType      | Number | 否      | 仅当 MsgType 为 200 时需填入。                                                    |
| └Msg             | String | 是      | Item 内容。<ul><li>当 Item 类型为 1 或 200 时，此处可直接传入消息内容。</li><li>当 Item 类型为 11、12、13 或 14 时，请参考本文档对相应类型消息的 Message 结构生成 JSON 字符串并传入此处。</li></ul> |
| └SearchedContent | String | 否      | 搜索内容，仅当 MsgType 为 200 时，可选。  |

### Message 示例

```json
{
    "MultiMsg": [
        {
            "MsgType": 1,
            "Msg": "11111"
        },
        {
            "MsgType": 11,
            "Msg": "xxxx" // 参考本文档对相应类型消息的 Message 结构生成 JSON 字符串并传入此处
        }
    ]
}
```


## 图片消息

### MessageBody 结构

| 参数 | 类型 | 是否必选 | 描述 |
|------|------|----------|------|
| Message | String | 是 | 图片消息内容，为按照图片消息的 <a href="#message-结构-2">Message 结构</a> 生成的 JSON 字节串，默认为 2 KB，不可为空。如有需要，请联系 ZEGO 技术支持配置，最大可达 32 KB。 |
| ExtendedData | String | 否 | 扩展字段，长度上限为 1 KB，如需上调，请联系 ZEGO 技术支持。 |
| OfflinePush | Object | 否 | 离线推送配置，详情请参考 <a href="#offlinepush-说明房间消息不支持此字段">OfflinePush 说明。</a><Warning title="注意">导入消息时，此参数无意义。</Warning> |
| HasReceipt | Number | 否 | 消息是否附带回执：<ul><li>0：不是。</li><li>1：是。</li></ul><Warning title="注意">导入消息时，此参数无意义。</Warning> |

### MessageBody 示例

```json
{
    "MessageBody": {
        "Message":"", // 图片消息内容，为按图片消息的 Message 结构生成的 JSON 字节串
        "ExtendedData":"extendedData",
        "OfflinePush" :{
            "Enable":0,
            "Title":"Title",
            "Content":"Content",
            "Payload":"data"
        },
        "HasReceipt": 1
    }
}
```

### Message 结构

| 参数 | 类型 | 是否必选 | 描述 |
|------|------|----------|------|
| Uid | String | 是 | 图片的唯一 ID。由开发者自行生成。 |
| Origin | Object | 是 | 原图。 |
| └Url | String | 是 | 原图的 URL 地址，长度上限为 500 字节。 |
| └Width | Number | 是 | 原图宽度，单位为像素（px）。 |
| └Height | Number | 是 | 原图高度，单位为像素（px）。 |
| LargeImage | Object | 否 | 大图。 |
| └Url | String | 否 | 大图的 URL 地址，长度上限为 500 字节。 |
| └Width | Number | 否 | 大图宽度，单位为像素（px）。 |
| └Height | Number | 否 | 大图高度，单位为像素（px）。 |
| Thumbnail | Object | 否 | 缩略图。 |
| └Url | String | 否 | 缩略图的 URL 地址，长度上限为 500 字节。 |
| └Width | Number | 否 | 缩略图宽度，单位为像素（px）。 |
| └Height | Number | 否 | 缩略图高度，单位为像素（px）。 |
| FileName | String | 是 | 文件名称，格式建议为 "xxx.文件扩展名"，长度上限为 150 字节。 |
| Size | Number | 否 | 图片数据大小，单位为字节。 |

### Message 示例

```json
{
    "Uid":"343649807833778782", 
    "Origin": {
        "Url":"https:xxx", 
        "Width":100,
        "Height":200
    },
    "FileName":"FileName.jpg", 
    "Size":1024
}
```

## 文件消息

### MessageBody 结构

| 参数 | 类型 | 是否必选 | 描述 |
|------|------|----------|------|
| Message | String | 是 | 文件消息内容，为按照文件消息的 <a href="#message-结构-3">Message 结构</a> 生成的 JSON 字节串，默认为 2 KB，不可为空。如有需要，请联系 ZEGO 技术支持配置，最大可达 32 KB。 |
| ExtendedData | String | 否 | 扩展字段，长度上限为 1 KB，如需上调，请联系 ZEGO 技术支持。 |
| OfflinePush | Object | 否 | 离线推送配置，详情请参考 <a href="#offlinepush-说明房间消息不支持此字段">OfflinePush 说明。</a><Warning title="注意">导入消息时，此参数无意义。</Warning> |
| HasReceipt | Number | 否 | 消息是否附带回执：<ul><li>0：不是。</li><li>1：是。</li></ul><Warning title="注意">导入消息时，此参数无意义。</Warning> |

### MessageBody 示例

```json
{
    "MessageBody": {
        "Message":"", // 文件消息内容，为按文件消息的 Message 结构生成的 JSON 字节串
        "ExtendedData":"extendedData",
        "OfflinePush" :{
            "Enable":0,
            "Title":"Title",
            "Content":"Content",
            "Payload":"data"
        },
        "HasReceipt": 1
    }
}
```

### Message 结构

<table>
<tbody><tr data-row-level="1">
<th>参数</th>
<th>类型</th>
<th>是否必选</th>
<th>描述</th>
</tr>
<tr data-row-level="2">
<td>Uid</td>
<td>String</td>
<td>是</td>
<td>文件的唯一 ID。由开发者自行生成。</td>
</tr>
<tr data-row-level="4">
<td>Url</td>
<td>String</td>
<td>是</td>
<td>文件的 URL 地址，长度上限为 500 字节。</td>
</tr>
<tr data-row-level="7">
<td>FileName</td>
<td>String</td>
<td>是</td>
<td>文件名称，格式建议为 “xxx.文件扩展名”，长度上限为 150 字节。</td>
</tr>
<tr data-row-level="8">
<td>Size</td>
<td>Number</td>
<td>否</td>
<td>文件数据大小，单位为字节。</td>
</tr>
</tbody></table>

### Message 示例

```json
{
  "Uid":"343649807833778782", 
  "Url":"https:xxx", 
  "FileName":"FileName.txt", 
  "Size":1024
}
```

## 音频消息

### MessageBody 结构

| 参数 | 类型 | 是否必选 | 描述 |
|------|------|----------|------|
| Message | String | 是 | 视频消息内容，为按照音频消息的 <a href="#message-结构-4">Message 结构</a> 生成的 JSON 字节串，默认为 2 KB，不可为空。如有需要，请联系 ZEGO 技术支持配置，最大可达 32 KB。 |
| ExtendedData | String | 否 | 扩展字段，长度上限为 1 KB，如需上调，请联系 ZEGO 技术支持。 |
| OfflinePush | Object | 否 | 离线推送配置，详情请参考 <a href="#offlinepush-说明房间消息不支持此字段">OfflinePush 说明。</a> |
| HasReceipt | Number | 否 | 消息是否附带回执：<ul><li>0：不是。</li><li>1：是。</li></ul><Warning title="注意">导入消息时，此参数无意义。</Warning> |

### MessageBody 示例

```json
{
    "MessageBody": {
        "Message":"", // 音频消息内容，为按音频消息的 Message 结构生成的 JSON 字节串
        "ExtendedData":"extendedData",
        "OfflinePush" :{
            "Enable":0, 
            "Title":"Title",
            "Content":"Content",
            "Payload":"data"
        },
        "HasReceipt": 1
    }
}
```

### Message 结构

<table>
<tbody><tr data-row-level="1">
<th>参数</th>
<th>类型</th>
<th>是否必选</th>
<th>描述</th>
</tr>
<tr data-row-level="2">
<td>Uid</td>
<td>String</td>
<td>是</td>
<td>音频的唯一 ID。由开发者自行生成。</td>
</tr>
<tr data-row-level="4">
<td>Url</td>
<td>String</td>
<td>是</td>
<td>音频的 URL 地址，长度上限为 500 字节。</td>
</tr>
<tr data-row-level="7">
<td>FileName</td>
<td>String</td>
<td>是</td>
<td>音频名称，格式建议为 “xxx.文件扩展名”，长度上限为 150 字节。</td>
</tr>
<tr data-row-level="8">
<td>Size</td>
<td>Number</td>
<td>否</td>
<td>音频数据大小，单位为字节。</td>
</tr>
<tr data-row-level="9">
<td>MediaDuration</td>
<td>Number</td>
<td>否</td>
<td>音频时长，单位为秒。</td>
</tr>
</tbody></table>

### Message 示例

```json
{
    "Uid":"343649807833778782", 
    "Url":"https:xxx", 
    "FileName":"FileName.mp3", 
    "Size":1024,
    "MediaDuration":30
}
```

## 视频消息

### MessageBody 结构

| 参数 | 类型 | 是否必选 | 描述 |
|------|------|----------|------|
| Message | String | 是 | 视频消息内容，为按照视频消息的 <a href="#message-结构-5">Message 结构</a> 生成的 JSON 字节串，默认为 2 KB，不可为空。如有需要，请联系 ZEGO 技术支持配置，最大可达 32 KB。 |
| ExtendedData | String | 否 | 扩展字段，长度上限为 1 KB，如需上调，请联系 ZEGO 技术支持。 |
| OfflinePush | Object | 否 | 离线推送配置，详情请参考 <a href="#offlinepush-说明房间消息不支持此字段">OfflinePush 说明。</a><Warning title="注意">导入消息时，此参数无意义。</Warning> |
| HasReceipt | Number | 否 | 消息是否附带回执：<ul><li>0：不是。</li><li>1：是。</li></ul><Warning title="注意">导入消息时，此参数无意义。</Warning> |

### MessageBody 示例

```json
{
    "MessageBody": {
        "Message":"", // 视频消息内容，为按音频消息的 Message 结构生成的 JSON 字节串
        "ExtendedData":"extendedData",
        "OfflinePush" :{
            "Enable":0,
            "Title":"Title",
            "Content":"Content",
            "Payload":"data"
        },
        "HasReceipt": 1
    }
}
```

### Message 结构

<table class="collapsible-table" >

<tbody><tr data-row-level="1">
<th>参数</th>
<th>类型</th>
<th>是否必选</th>
<th>描述</th>
</tr>
<tr data-row-level="2">
<td>Uid</td>
<td>String</td>
<td>是</td>
<td>文件的唯一 ID。由开发者自行生成。</td>
</tr>
<tr data-row-level="4">
<td>Url</td>
<td>String</td>
<td>是</td>
<td>视频的 URL 地址，长度上限为 500 字节。</td>
</tr>
<tr data-row-level="7">
<td>FileName</td>
<td>String</td>
<td>是</td>
<td>视频名称，格式建议为 “xxx.文件扩展名”，长度上限为 150 字节。</td>
</tr>
<tr data-row-level="8">
<td>Size</td>
<td>Number</td>
<td>否</td>
<td>视频数据大小，单位为字节。</td>
</tr>
<tr data-row-level="9">
<td>MediaDuration</td>
<td>Number</td>
<td>否</td>
<td>视频时长，单位为秒。</td>
</tr>
<tr data-row-level="10" data-row-child="true">
<td>Thumbnail</td>
<td>Object</td>
<td>否</td>
<td>视频首帧。</td>
</tr>
<tr data-row-level="10-1">
<td>└Url</td>
<td>String</td>
<td>是（仅当需要视频首帧时）</td>
<td>缩略图的 URL 地址，长度上限为 500 字节。</td>
</tr>
<tr data-row-level="10-2">
<td>└Width</td>
<td>Number</td>
<td>是（仅当需要视频首帧时）</td>
<td>图片宽度，单位为像素（px）。</td>
</tr>
<tr data-row-level="10-3">
<td>└Height</td>
<td>Number</td>
<td>是（仅当需要视频首帧时）</td>
<td>图片高度，单位为像素（px）。</td>
</tr>
</tbody></table>

### Message 示例

```json
{
    "Uid":"343649807833778782", 
    "Url":"https:xxx", 
    "FileName":"FileName.mp4", 
    "Size":1024,
    "MediaDuration":300,
    "Thumbnail": {
        "Url":"https:xxx", 
        "Width":100,
        "Height":200
    }
}
```

