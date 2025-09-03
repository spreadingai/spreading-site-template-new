# 开始自动混流

- - -

## 简介

本文介绍如何调用服务端 API 接口，指定房间，自动将房间内的所有 `音频` 流进行混流。可以应用在语聊房、合唱等场景中。

在跨房间 PK 连麦等场景中，支持增加其他房间内的某条流，参与自动混流；或剔除当前房间的某条流，不参与自动混流，具体请参考 <a href="https://doc-zh.zego.im/article/19601#ExtraMixInput">请求参数</a> 中的 `ExtraMixInput` 参数说明。

<Note title="说明">
* 目前只支持自动混 `音频` 流。
* 后续房间内如果有流新增或删除，您都不需要做任何处理，ZEGO 服务端内部自动更新混流。
</Note>

“客户端”的混流功能，请参考 [混流 - 自动混流](/real-time-video-android-java/live-streaming/stream-mixing)；“服务端”的相关回调，请参考 [混流开始回调](https://doc-zh.zego.im/article/19682) 和 [混流结束回调](https://doc-zh.zego.im/article/19684)。


## 前提条件

在实现混流之前，请确保：

- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppId 和 ServerSecret，详情请参考 [控制台 - 项目信息](/console/project-info)。
- 已在 [ZEGO 控制台](https://console.zego.im) 自助接入服务开通“混流”服务权限，详情请参考 [控制台 - 服务配置 - 混流](/console/service-configuration/enable-stream-mixing-service)，或联系 ZEGO 技术支持开通。
- 已通过开发者自己的客户端，在房间内发起推拉流，详情请参考 [实现视频通话](/real-time-video-android-java/quick-start/implementing-video-call)。
- 若您希望创建自动混流时，如果房间不存在，可自动创建对应房间，请联系 ZEGO 技术支持开启相关功能。


## 接口原型

- 请求方法：POST

<Note title="说明">
  使用 POST 请求方法传递参数时：
  - Body 中的参数直接传 JsonObject 格式即可，无需序列化为 String 格式。
  - Headers 中，设置 “Content-type” 为 “application/json”。
</Note>


- 请求地址：`https://rtc-api.zego.im/?Action=StartAutoMix`
- 传输协议：HTTPS
- 调用频率限制：100 次/秒



## 请求参数

<Note title="说明">


测试环境下（详见 <a target="_blank" href="/real-time-video-server/api-reference/accessing-server-apis#公共请求参数">调用方式</a> 中的 “公共参数” 中的 IsTest 的参数说明），`输入流`的流 ID 和`输出流`的流 ID：

- 如果是开发者自己输入的原始流 ID，需要加上 “zegotest-AppId-” 前缀，否则会导致混流失败（混流服务器拉不到输入流或拉不到混流输出流）。例如，开发者输入流 ID 为 “test”，在 AppId 为 “123456789” 的测试环境下，流 ID 应为 “zegotest-123456789-test”。
- 如果是通过 SDK 接口，或通过服务端 API 接口获取到的，此时不需要添加 “zegotest-AppId-” 的前缀。

</Note>




**此接口中只有部分参数在开始混流后支持动态更新，未标注的则不支持动态更新，详情请参考下表中的参数描述。**

| 名称 | 类型 | 必填 | 描述 |
|---|---|---|---|
| TaskId | String | 是 | 任务 ID，混流任务的唯一标识。 <ul><li>重复调用“开始混流”接口，传入相同的 TaskId，可以直接更新混流任务信息。</li><li>发起<code>音视频</code>混流时，如果之前已发起过对应 TaskId 的<code>纯音频</code>混流任务，则需要先停止此任务，再重新发起<code>音视频</code>混流任务。</li></ul> |
| UserId | String | 是 | 发起混流任务的用户 ID，由开发者自定义。<br/><b>同一个任务的用户 ID 需要一致，不同任务的用户 ID 需要保持不同。</b><br/>通过 UserId 可以实现混流任务的用户归属，也就是该用户才能更新或者停止对应 TaskId 的混流任务，该功能需要联系 ZEGO 技术支持开通。 |
| RoomId | String | 是 | 房间 ID。 |
| ExtraMixInput | Array of Object | 否 | 额外的输入流列表（其他房间内的流），默认最多支持 9 条额外的输入流。<Warning title="注意">开启自动混流时，最多支持 9 条输入流。即该房间内的流，增加、剔除（根据 ModifyType 取值判断增加或删除某条流）额外的输入流后，流的总数量不能超过 9 条。</Warning> |
| └ StreamId | String | 否 | <p>混流输入流 ID，该流 ID 来自 RTC 服务。</p><p>仅支持数字、英文字符和 "-"、"_"。</p><Warning title="注意">StreamId 和 StreamUrl 二者取其一即可，若同时填写 StreamId 和 StreamUrl：<ul><li>ModifyType 为 0（增加）时，StreamUrl 生效。</li><li>ModifyType 为 1（剔除）时，StreamId 生效。</li></ul></Warning> |
| └ StreamUrl | String | 否 | <p>混流输入流 URL，支持 RTMP 和 HTTP-FLV 两种协议。</p><Warning title="注意">StreamId 和 StreamUrl 二者取其一即可，若同时填写 StreamId 和 StreamUrl：<ul><li>ModifyType 为 0（增加）时，StreamUrl 生效。</li><li>ModifyType 为 1（剔除）时，StreamId 生效。</li></ul></Warning> |
| └ ModifyType | Int | 否 | <p>输入流列表的类型，表示在当前混流任务中“增加”或“剔除”该条输入流。</p><ul><li>0：开启自动混流时，在输入流列表中<b>增加</b>当前流，默认值。</li><li>1：开启自动混流时，在输入流列表中<b>剔除</b>当前流。此时只需要填写 StreamId 和本参数的取值即可。</li></ul> |
| └ SoundLevelId | Int | 否 | <p>声浪 ID。<b>参数 SoundLevel（混流声浪）取值为 “1” 时，此参数必填。</b></p> |
| └ Volume | Int | 否 | 音量，取值范围 [0, 200]，默认为 100。 |
| MixOutput | Array of Object | 是 | 输出流信息，目前最多支持 3 个。当输出目标为 URL 格式时，目前只支持 RTMP URL 格式：rtmp://xxxxxxxx，且不能传入两个相同的混流输出的地址。 |
| └ StreamId | String | 是 | <p>输出流 ID。默认情况下表示混流输出至 RTC 或低延迟直播产品，也可联系 ZEGO 技术支持配置混流输出至 ZEGO 代理的 CDN 直播产品，生效范围为整个 AppId。如果希望控制指定流输出至 CDN 直播产品，则不能配置混流默认输出至 ZEGO 代理 CDN，应按需设置 StreamUrl。</p><p><b>StreamId 和 StreamUrl 二者取其一即可，若填写了 StreamId，则 StreamUrl 不生效。</b></p> |
| └ StreamUrl | String | 是 | <p>仅支持 RTMP 协议，表示混流输出至 CDN 直播服务，观众可以从 CDN 直播拉混流。</p><p><b>StreamId 和 StreamUrl 二者取其一即可，若填写了 StreamUrl，则 StreamId 不生效。</b></p> |
| └ AudioCodec | Int | 否 | <p>音频编码及采样率。如需修改采样率，请联系 ZEGO 技术支持配置。</p><ul><li>0：HE-AAC，采样率：44100 kHz，默认值。</li><li>1：AAC-LC，采样率：44100 kHz。</li><li>2：MP3，采样率：44100 kHz。</li><li>3：OPUS，采样率：48000 kHz。</li></ul> |
| └ AudioBitrate | Int | 否 | 混流输出音频码率，不填时默认值为 48000，单位为 bps。 |
| └ SoundChannel | Int | 否 | <p>输出音频声道数，优先级比全局参数高。</p><ul><li>1：单声道，默认值。</li><li>2：双声道。</li></ul> |
| Sequence | Int | 否 | <p>混流请求的序列号，用于保证时序，同个任务的参数修改需要保证序列号的递增。例如："Sequence": 1。</p><p><b>如果开启了混流任务的时序控制（如有需要，请联系 ZEGO 技术支持开启），此参数必填。</b></p> |
| UserData | String | 否 | <p>自定义用户数据，使用时需要对此参数内容进行 base64 编码。长度限制为 4000 字节，建议不超过 850 字节。</p><p>自定义的用户数据将作为 SEI 信息传输给拉流方，拉流方可通过监听客户端的 <a href="https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~protocol~ZegoEventHandler#on-player-sync-recv-sei-stream-id" target="_blank">onPlayerSyncRecvSEI</a> 回调获取该数据。</p><p><b>再次调用本接口，即可动态更新该参数。</b></p> |
| SoundLevel | Int | 否 | <p>混流声浪，指混流的音量大小。支持混流过程中实时更新。</p><ul><li>0：不开启，默认值。</li><li>1：开启。开启后，客户端可以通过 <a href="https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~protocol~ZegoEventHandler#on-auto-mixer-sound-level-update" target="_blank">onAutoMixerSoundLevelUpdate</a> 回调来接收自动混流声浪更新的通知。</li></ul><p><b>再次调用本接口，即可动态更新该参数。</b></p> |
| ByPass | Int | 否 | <p>单流透传开关，即输入流就一个时是否按输出参数重新编码，该功能需要联系 ZEGO 技术支持开通。</p><ul><li>0：不启用，默认值。</li><li>1：启用。</li></ul> |
| SoundChannel | String | 否 | <p>输出音频声道数，当没有指定输出流时使用该配置。</p><ul><li>1：单声道，默认值。</li><li>2：双声道。</li></ul> |
| AlignmentType | Int | 否 | <p>控制播放的实时音视频流是否需要按照 NTP（网络时间）精准对齐后进行混流。<b>此参数主要应用于 KTV 场景中，会增加一定的混流延时；非 KTV 类似场景，不建议设置此参数。</b></p><ul><li>0：不对齐，默认值。</li><li>1：指定流对齐。</li><li>2：所有流强制对齐。</li></ul> |
| RecvBufferLevel | Int | 否 | 控制拉流最小缓冲时间，取值范围 [0, 4000]，单位：毫秒；默认最小缓冲时间为 0。 |
| ExPara | Array of Object | 否 | 拓展参数，根据实际情况填入，常规任务可不填。 |
| └ Key | String | 否 | key 值。 |
| └ Value | String | 否 | value 值。 |



## 请求示例

- 请求 URL
    ```
    https://rtc-api.zego.im/?Action=StartAutoMix
    &<公共请求参数>
    ```

- 请求消息体
    ```json
    {
        "TaskId": "2213699902971205739",
        "UserId": "123",
        "RoomId": "room123",
        "MixOutput": [
            {
                "StreamId": "stream3"
            }
        ]
    }
    ```


## 响应参数

| 参数 | 类型 | 描述 |
|---|---|---|
| Code | Number | 返回码。 |
| Message | String | 操作结果描述。 |
| RequestId | String | 请求 ID。 |
| Data | Object | 响应数据。 |
| └ UserId | String | 发起混流任务的用户 ID。 |
| └ Sequence | Int | 序列号。 |
| └ RoomId | String | 房间 ID。 |
| └ PlayInfo | Array of Object | 播放信息，详情可见[PlayInfo](#playInfo)。 |

<a id="playinfo"></a>
**PlayInfo**
| 参数 | 类型 | 描述 |
|---|---|---|
| StreamId | String | 输出流的流 ID。 |
| RTMP | String | RTMP 协议对应的 CDN 播放地址（如果指定混流输出地址是 CDN 并且配置了这个协议的拉流域名）。 |
| HLS | String | HLS 协议对应的 CDN 播放地址（如果指定混流输出地址是 CDN 并且配置了这个协议的拉流域名）。 |
| FLV | String | HTTP-FLV 协议对应的 CDN 播放地址（如果指定混流输出地址是 CDN 并且配置了这个协议的拉流域名）。 |



## 响应示例

```json
{
    "Code": 0,
    "Data": {
        "PlayInfo": [
            {
                "FLV": "http://domain/appname/test.flv",
                "HLS": "http://domain/appname/test/playlist.m3u8",
                "RTMP": "rtmp://domain/appname/test",
                "Status": 0,
                "StreamId": "test",
                "UserName": ""
            }
        ],
        "RoomId": "room123",
        "Sequence": 1,
        "UserId": "123"
    },
    "Message": "success",
    "RequestId": "8472822294336370476"
}
```

## 返回码

以下仅列出了接口业务逻辑相关的部分返回码，完整返回码请参考 [全局返回码](https://doc-zh.zego.im/)。

|返回码|说明|处理建议|
|-----|------|-----|
| 110200001 | 失败。 | 请重试。 |
| 110200002 | 输入参数错误。 | 请参考 Message 信息处理。|
| 110200003 | 鉴权失败。 | 请确认鉴权信息是否正确或过期，详情请参考 <a href="https://doc-zh.zego.im/article/19458#5" target="_blank">调用方式</a> 中的 “3 签名机制”。 |
| 110200004 | 解析输入参数失败。 | 请检查混流参数是否正确。|
| 110200005 | 混流开始获取分布式锁失败。 | 同一个 UserId 开始混流请求过于频繁，请稍后再试。|
| 110200006 | 混流结束获取分布式锁失败。 | 同一个 UserId 停止混流请求过于频繁，请稍后再试。 |
| 110200151 | 混流任务失败。 |请重试，或联系 ZEGO 技术支持处理。|
| 110200194 | 混流请求过载。 | 请求过于频繁，请稍后再试。|
