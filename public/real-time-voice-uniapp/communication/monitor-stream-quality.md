# 通话质量监测

- - -

## 功能简介

在通话或直播的过程中，用户可通过注册相关的回调以获得通话相关的信息，包括推流和拉流的质量报告、接收到音视频首帧的回调、分辨率变化、CDN（Content Delivery Network, 内容分发网络）相关信息和接收 SEI（Supplemental Enhancement Information，媒体补充增强信息）。本文将介绍以下功能：

<table>

<tbody><tr>
<th>功能名</th>
<th>说明</th>
</tr>
<tr>
<td>监测推拉流质量</td>
<td>开发者可分别监控推流质量和拉流质量来判断用户的网络状况，做出相应的处理，从而为用户提供更好的服务。其中推流质量包括帧率、码率、延时和丢包率等参数，拉流质量包括了接收、解码和渲染三个阶段的帧率等参数。</td>
</tr>
<tr>
<td>监控用户状态</td>
<td>用户状态可分为推流方状态和拉流方状态，开发者可监控用户的状态，例如正在请求推流、正在推流、未推流、请求拉流、正在拉流和未拉流等，并执行相应操作。</td>
</tr>
<tr>
<td>推拉流首帧回调</td>
<td>开发者可设置在发送、接收首帧视频或音频时收到回调。</td>
</tr>
<tr>
<td>监控视频大小变化</td>
<td>开发者可选择在视频采集或拉流分辨率大小发生变化时获取通知，以便做出相关操作。</td>
</tr>
<tr>
<td>监控 CDN 转推状态</td>
<td>当开发者选择将音视频流转推到 CDN 后，可通过监控 CDN 转推状态来判断该转推的音视频流是否正常。</td>
</tr>
<tr>
<td>接收 SEI</td>
<td>当拉流方接收到 SEI 时，开发者可通过回调获取 SEI 信息内容。</td>
</tr>
</tbody></table>

通过获取以上信息，开发者可以根据推流/拉流状态执行相关操作。例如在推流质量不佳时做出相应处理、判断推拉流是否成功、判断转推 CDN 的音视频流是否正常或接收 SEI 信息等。

相关概念解释:
- 推流：指把采集阶段封包好的内容传输到服务器的过程。
- 拉流：指服务器将已有直播内容用指定地址进行拉取的过程。

<Note title="说明">


SEI 的相关概念及原理请参考 [常见问题 - 实时音视频](https://doc-zh.zego.im/faq/sei) 中的 “如何理解和使用 SEI（媒体补充增强信息）”。


</Note>




## 示例源码下载

请参考 [下载示例源码](https://doc-zh.zego.im/article/8787) 获取源码。

相关源码请查看 “/page/example/advance-stream/stream-monitor.nvue” 目录下的文件。

## 前提条件

在进行通话质量监测之前，请确保：

- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppID 和 AppSign，详情请参考 [控制台 - 项目信息](/console/project-info)。
- 已在项目中集成 ZEGO Express SDK，并实现了基本的音视频推拉流功能，详情请参考 [快速开始 - 集成](https://doc-zh.zego.im/article/13230) 和 [快速开始 - 实现流程](https://doc-zh.zego.im/article/13231)。


## 使用步骤

### 监测推流质量

开发者可通过注册 [publisherQualityUpdate](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/interfaces/_zegoexpresseventhandler_.zegoeventlistener.html#publisherqualityupdate) 接收推流质量回调。推流成功后每隔三秒会收到此回调。开发者可根据回调返回的质量参数实时监控推送的音视频流的健康情况，以便在设备 UI 界面上实时展示上行网络状况。

```javascript
ZegoExpressEngine.instance().on("publisherQualityUpdate", (streamID, quality) => {
    console.info(`publisherQualityUpdate:width:streamID:${streamID}, quality:${JSON.stringify(quality)}`);
    // 开发者可以在此回调中监控具体的质量以上报到业务服务器做监控，或者监控质量对象的某个字段以给用户友好的提示
    // 若开发者不知道监控质量哪个字段可以关注 level 字段，这个字段是质量对象的综合值
})
```

### 推流质量详解

推流质量包含了采集、编码阶段音视频流的帧率，传输（发送）的音视频流的帧率、码率、延时及丢包率。本节将介绍推流质量 [ZegoPublishStreamQuality](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/interfaces/_zegoexpressdefines_.zegopublishstreamquality.html) 内的参数。

#### 推流采集质量

推流采集质量贴近用户预览时的主观感受，推流时 SDK 在采集阶段的音视频质量的相关参数如下：

- [audioCaptureFPS](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/interfaces/_zegoexpressdefines_.zegopublishstreamquality.html#audiocapturefps)：音频采集帧率（fps，仅 App 有返回）
- [videoCaptureFPS](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/interfaces/_zegoexpressdefines_.zegopublishstreamquality.html#videocapturefps)：视频采集帧率（fps，Web 不支持该参数）

#### 推流编码质量

推流时 SDK 在编码阶段的音视频质量的相关参数如下：

- [videoEncodeFPS](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/interfaces/_zegoexpressdefines_.zegopublishstreamquality.html#videoencodefps)：当前编码器的目标视频编码帧率（fps，Web 不支持该参数）

#### 推流发送质量

推流发送质量是实际推流的质量，与实际的网络质量有关，相关参数如下：

- [audioSendFPS](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/interfaces/_zegoexpressdefines_.zegopublishstreamquality.html#audiosendfps)：实际的音频发送帧率（fps）
- [audioKBPS](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/interfaces/_zegoexpressdefines_.zegopublishstreamquality.html#audiokbps)：实际的音频发送码率（kbps）
- [videoSendFPS](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/interfaces/_zegoexpressdefines_.zegopublishstreamquality.html#videosendfps)：实际的视频发送帧率（fps）
- [videoKBPS](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/interfaces/_zegoexpressdefines_.zegopublishstreamquality.html#videokbps)：实际的视频发送码率（kbps）
- [rtt](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/interfaces/_zegoexpressdefines_.zegopublishstreamquality.html#rtt)：设备到 ZEGO Server 的往返延时（ms）
- [packetLostRate](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/interfaces/_zegoexpressdefines_.zegopublishstreamquality.html#packetlostrate)：设备上行丢包率

#### 字节数统计

开发者可统计已发送的视频、音频和总字节数，相关参数如下：
- [totalSendBytes](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/interfaces/_zegoexpressdefines_.zegopublishstreamquality.html#totalsendbytes)：已发送的总字节数（Web 不支持该参数）
- [audioSendBytes](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/interfaces/_zegoexpressdefines_.zegopublishstreamquality.html#audiosendbytes)：已发送的音频字节数（Web 不支持该参数）
- [videoSendBytes](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/interfaces/_zegoexpressdefines_.zegopublishstreamquality.html#videosendbytes)：已发送的视频字节数（Web 不支持该参数）

#### 编码信息

开发者可获得所推流的编码信息，相关参数如下：
- [videoCodecID](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/interfaces/_zegoexpressdefines_.zegopublishstreamquality.html#videocodecid)：视频编码格式（Web 不支持该参数）
- [isHardwareEncoder](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/interfaces/_zegoexpressdefines_.zegopublishstreamquality.html#ishardwareencode)：是否开启硬件编码（Web 不支持该参数）

#### 上行网络综合质量

在 uni-app 项目的 App 平台中，若开发者不清楚该回调接口的各个参数应该如何使用，可只关注 [level](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/enums/_zegoexpressdefines_.zegostreamqualitylevel.html) 参数，这是 ZegoExpressEngine 内部根据质量参数计算的一个描述上行网络的综合值。

level 字段的说明如下：

|字段名|说明|
|-|-|
|ZegoStreamQualityLevel.Excellent|流质量极好|
|ZegoStreamQualityLevel.Good|流质量好|
|ZegoStreamQualityLevel.Medium|流质量正常|
|ZegoStreamQualityLevel.Bad|流质量差|
|ZegoStreamQualityLevel.Die|流质量异常|

在 Web 平台，开发者可以关注 videoQuality 和 audioQuality


### 检测拉流质量

开发者可通过注册 [playerQualityUpdate](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/interfaces/_zegoexpresseventhandler_.zegoeventlistener.html#playerqualityupdate) 接收拉流质量回调。拉流成功后每隔三秒会收到此回调。开发者可根据回调返回的质量参数实时监控拉取的音视频流的健康情况，以便在设备 UI 界面上实时展示下行网络状况。

```javascript
ZegoExpressEngine.instance().on("playerQualityUpdate", (streamID, quality) => {
    console.info(`playerQualityUpdate:streamID:${streamID}, quality:${JSON.stringify(quality)}`);
    // 开发者可以在此回调中监控具体的质量以上报到业务服务器做监控，或者监控质量对象的某个字段以给用户友好的提示
    // 若开发者不知道监控质量哪个字段可以关注 level 字段，这个字段是质量对象的综合值
})
```

### 拉流质量详解

拉流质量包含了接收的音视频流的帧率、码率、延时和丢包率，解码阶段音视频流的帧率，以及渲染阶段的帧率、卡顿率、音视频整体质量。本节将介绍推流质量 [ZegoPlayStreamQuality](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/interfaces/_zegoexpressdefines_.zegoplaystreamquality.html) 内的参数。


#### 拉流接收质量

拉流接收质量是实际的拉流质量，与实际的推流质量和当前的网络质量相关。相关参数如下：
- [audioRecvFPS](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/interfaces/_zegoexpressdefines_.zegoplaystreamquality.html#audiorecvfps)：实际接收的音频帧率（fps）
- [audioKBPS](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/interfaces/_zegoexpressdefines_.zegoplaystreamquality.html#audiokbps)：实际接收的音频码率（kbps）
- [videoDejitterFPS](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/interfaces/_zegoexpressdefines_.zegoplaystreamquality.html#videodejitterfps)：视频抗抖动帧率，单位为 f/s
- [audioDejitterFPS](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/interfaces/_zegoexpressdefines_.zegoplaystreamquality.html#audiodejitterfps)：视频抗抖动帧率，单位为 f/s
- [audioBreakRate](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/interfaces/_zegoexpressdefines_.zegoplaystreamquality.html#audiobreakrate)：实际接收的音频卡顿率（卡顿次数/每 10 秒，Web 不支持该参数）
- [videoKBPS](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/interfaces/_zegoexpressdefines_.zegoplaystreamquality.html#videokbps)：实际接收的视频码率（kbps）
- [videoRecvFPS](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/interfaces/_zegoexpressdefines_.zegoplaystreamquality.html#videorecvfps)：实际接收的视频帧率（fps）
- [videoBreakRate](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/interfaces/_zegoexpressdefines_.zegoplaystreamquality.html#videobreakrate)：实际接收的视频卡顿率（卡顿次数/每 10 秒，Web 不支持该参数）
- [packetLostRate](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/interfaces/_zegoexpressdefines_.zegoplaystreamquality.html#packetlostrate)：设备下行丢包率
- [rtt](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/interfaces/_zegoexpressdefines_.zegoplaystreamquality.html#rtt)：设备到 ZEGO Server 的往返延时（ms）
- [avTimestampDiff](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/interfaces/_zegoexpressdefines_.zegoplaystreamquality.html#avtimestampdiff)：视频时间戳相对于音频时间戳的差值，用于反映音画同步情况，单位为毫秒。此值小于 0 表示视频超前音频的毫秒数, 大于 0 表示视频滞后音频的毫秒数, 等于 0 表示无差别。 当绝对值小于 200，可基本认为音画同步，当绝对值连续 10 秒大于 200 可以认为异常（Web 不支持该参数）
- [packetLostRate](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/interfaces/_zegoexpressdefines_.zegoplaystreamquality.html#packetlostrate)：丢包率，单位为百分比，取值范围为 0.0 ～ 1.0
- [peerToPeerDelay](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/interfaces/_zegoexpressdefines_.zegoplaystreamquality.html#peertopeerdelay)： 端到端延迟，单位为毫秒（Web 不支持该参数）
- [peerToPeerPacketLostRate](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/interfaces/_zegoexpressdefines_.zegoplaystreamquality.html#peertopeerpacketlostrate)：端到端丢包率，单位为百分比，取值范围为 0.0 ～ 1.0（Web 不支持该参数）

#### 拉流渲染质量

拉流渲染质量贴近用户观看音视频的主观感受，该质量受解码器影响可能低于实际接收的拉流质量值。相关参数如下：
- [audioRenderFPS](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/interfaces/_zegoexpressdefines_.zegoplaystreamquality.html#audiorenderfps)：实际的音频渲染帧率（Web 不支持该参数）
- [videoRenderFPS](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/interfaces/_zegoexpressdefines_.zegoplaystreamquality.html#videorenderfps)：实际的视频渲染帧率（Web 不支持该参数）
- [delay](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/interfaces/_zegoexpressdefines_.zegoplaystreamquality.html#delay)：本端接收到数据后到播放的延迟，单位为毫秒（Web 不支持该参数）

#### 字节数统计

开发者可统计已接收的视频、音频和总字节数，相关参数如下：
- [totalRecvBytes](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/interfaces/_zegoexpressdefines_.zegoplaystreamquality.html#totalrecvbytes)：已接收的总字节数，包括音频、视频和 SEI 等（Web 不支持该参数）
- [audioRecvBytes](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/interfaces/_zegoexpressdefines_.zegoplaystreamquality.html#audiorecvbytes)：已接收的音频字节数（Web 不支持该参数）
- [videoRecvBytes](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/interfaces/_zegoexpressdefines_.zegoplaystreamquality.html#videorecvbytes)：已接收的视频字节数（Web 不支持该参数）

#### 解码信息

开发者可获得所拉流的解码信息，相关参数如下：
- [videoCodecID](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/interfaces/_zegoexpressdefines_.zegoplaystreamquality.html#videocodecid)：视频解码格式（Web 不支持该参数）
- [isHardwareDecode](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/interfaces/_zegoexpressdefines_.zegoplaystreamquality.html#ishardwaredecode)：是否开启硬件解码（Web 不支持该参数）

### 监控推流/拉流状态

#### 推流状态回调

在推流成功后，开发者可通过 [publisherStateUpdate](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/interfaces/_zegoexpresseventhandler_.zegoeventlistener.html#publisherstateupdate) 获取推流状态变更的通知。

```javascript
ZegoExpressEngine.instance().on("publisherStateUpdate", (streamID, state, errorCode, extendedData) => {
    console.info(`publisherStateUpdate:streamID:${streamID}, state:${state}, errorCode:${errorCode}, extendedData:${JSON.stringify(extendedData)}`);
    // 当 state 为 ZegoPublisherState.NoPublish 时，且 errcode 非 0，表示推流失败，同时不会再进行重试推流了，此时可在界面作出推流失败提示；
    // 当 state 为 ZegoPublisherState.PublishRequesting 时，且 errcode 非 0，表示在重试推流，此时如果超出重试时间未成功推流会抛出推流失败通知。
})
```

开发者可根据回调内的 “state” 参数是否在“正在请求推流状态”来大体判断用户的推流网络情况。“state” 参数的取值与用户推流状态对应如下:

<table>

<tbody><tr>
<th>枚举值</th>
<th>说明</th>
</tr>
<tr>
<td>ZegoPublisherState.NoPublish</td>
<td>未推流状态，在推流前处于该状态。如果推流过程出现稳态的异常，例如 AppID、AppSign、或 Token 等不正确，或者如果其他用户已经在推送流，推送相同流 ID 的流会失败，都会进入未推流状态。</td>
</tr>
<tr>
<td>ZegoPublisherState.PublishRequesting</td>
<td>正在请求推流状态，推流操作执行成功后会进入正在请求推流状态，通常通过该状态进行 UI 界面的展示。如果因为网络质量不佳产生的中断，SDK 会进行内部重试，也会回到正在请求推流状态。</td>
</tr>
<tr>
<td>ZegoPublisherState.Publishing</td>
<td>正在推流状态，进入该状态表明推流已经成功，用户可以正常通信。</td>
</tr>
</tbody></table>

参数 “extendedData” 为状态更新附带的扩展信息。若使用 ZEGO 的 CDN 内容分发网络，在推流成功后，该参数的内容的键为 “flv_url_list”、“rtmp_url_list”、“hls_url_list”。分别对应 flv、rtmp、hls 协议的拉流 URL。

#### 拉流状态变更回调

在拉流成功后，开发者可通过 [playerStateUpdate](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/interfaces/_zegoexpresseventhandler_.zegoeventlistener.html#playerstateupdate) 获取拉流状态变更的通知。

```javascript
ZegoExpressEngine.instance().on("playerStateUpdate", (streamID, state, errorCode, extendedData) => {
    console.info(`playerStateUpdate:streamID:${streamID}, state:${state}, errorCode:${errorCode}, extendedData:${JSON.stringify(extendedData)}`);
    // 当 state 为 ZegoPlayerState.NoPlay 时，且 errcode 非 0，表示推流失败，同时不会再进行重试推流了，此时可在界面作出推流失败提示；
    // 当 state 为 ZegoPlayerState.PlayRequesting 时，且 errcode 非 0，表示在重试推流，此时如果超出重试时间未成功推流会抛出推流失败通知。
})
```

开发者可根据 “state” 参数是否在 “正在请求拉流状态” 来大体判断用户的拉流网络情况。“state” 参数的取值与用户拉流状态对应如下:

<table>

<tbody><tr>
<th>枚举值</th>
<th>说明</th>
</tr>
<tr>
<td>ZegoPlayerState.NoPlay</td>
<td>未拉流状态，在拉流前处于该状态。如果拉流过程出现稳态的异常，例如 AppID、AppSign、或 Token 等不正确，都会进入未拉流状态。</td>
</tr>
<tr>
<td>ZegoPlayerState.PlayRequesting</td>
<td>正在请求拉流状态，拉流操作执行成功后会进入正在请求拉流状态，通常通过该状态进行应用界面的展示。如果因为网络质量不佳产生的中断，SDK 会进行内部重试，也会回到正在请求拉流状态。</td>
</tr>
<tr>
<td>ZegoPlayerState.Playing</td>
<td>正在拉流状态，进入该状态表明拉流已经成功，用户可以正常通信。</td>
</tr>
</tbody></table>

### 音视频首帧回调

<Warning title="注意">


在 Web 中，暂不支持音视频首帧回调的相关方法及回调。


</Warning>



#### 推流端音频采集首帧回调

开发者可通过注册 [publisherCapturedAudioFirstFrame](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/interfaces/_zegoexpresseventhandler_.zegoeventlistener.html#publishercapturedaudiofirstframe) 接收音频首帧回调。调用推流接口成功后，SDK 采集到第一帧音频数据时会收到此回调。

<Note title="说明">


在未推流或未预览的情况下，首次推流或首次预览，即 SDK 内部的音视频模块的引擎启动时，会去采集本机设备的音频数据，会收到该回调。开发者可根据该回调判断 SDK 是否真的采集到音频数据，若未收到该回调，说明音频采集设备被占用或异常。

</Note>



```javascript
ZegoExpressEngine.instance().on("publisherCapturedAudioFirstFrame", () => {
    console.info(`publisherCapturedAudioFirstFrame`);
})
```

#### 推流端视频采集首帧回调

<Note title="说明">



本节操作仅适用于音视频场景，纯音频场景下无需设置。

</Note>



开发者可通过注册 [publisherCapturedVideoFirstFrame](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/interfaces/_zegoexpresseventhandler_.zegoeventlistener.html#publishercapturedvideofirstframe) 接收视频首帧回调。调用推流接口成功后，SDK 采集到第一帧视频数据时会收到此回调。

<Note title="说明">


在未推流或未预览的情况下，首次推流或首次预览，即 SDK 内部的音视频模块的引擎启动时，会去采集本机设备的视频数据，会收到该回调。开发者可根据该回调判断 SDK 是否真的采集到视频数据，若未收到该回调，说明视频采集设备被占用或异常。

</Note>



```javascript
ZegoExpressEngine.instance().on("publisherCapturedVideoFirstFrame", (channel) => {
    console.info(`publisherCapturedVideoFirstFrame:width:channel:${channel}`);
})
```

#### 拉流端音频接收首帧回调

开发者可通过注册 [playerRecvAudioFirstFrame](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/interfaces/_zegoexpresseventhandler_.zegoeventlistener.html#playerrecvaudiofirstframe) 监听拉流段音频接收首帧回调。调用拉流接口成功后，SDK 拉流拉到第一帧音频数据时会收到此回调。

```javascript
ZegoExpressEngine.instance().on("playerRecvAudioFirstFrame", (streamID) => {
    console.info(`playerRecvAudioFirstFrame:streamID:${streamID}`);
})
```

#### 拉流端视频接收首帧回调

<Note title="说明">



本节操作仅适用于音视频场景，纯音频场景下无需设置。

</Note>




开发者可通过注册 [playerRecvVideoFirstFrame](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/interfaces/_zegoexpresseventhandler_.zegoeventlistener.html#playerrecvvideofirstframe) 监听拉流段接收视频首帧回调。调用拉流接口成功后，SDK 拉流拉到第一帧视频数据时会收到此回调。

```javascript
ZegoExpressEngine.instance().on("playerRecvVideoFirstFrame", (streamID) => {
    console.info(`playerRecvVideoFirstFrame:streamID:${streamID}`);
})
```

#### 拉流端渲染完视频首帧回调

开发者可通过注册 [playerRenderVideoFirstFrame](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/interfaces/_zegoexpresseventhandler_.zegoeventlistener.html#playerrendervideofirstframe) 监听拉流端渲染完视频首帧回调。调用拉流接口成功后，SDK 拉流并渲染完第一帧视频数据后会收到此回调。

<Note title="说明">


开发者可用该回调来统计首帧耗时或更新播放流的 UI 组件。

</Note>



```javascript
ZegoExpressEngine.instance().on("playerRenderVideoFirstFrame", (streamID) => {
    console.info(`playerRenderVideoFirstFrame:streamID:${streamID}`);
})
```

### 监控视频分辨率变化

<Note title="说明">



本节操作仅适用于音视频场景，纯音频场景下无需设置。

</Note>




#### 采集视频分辨率变更回调

<Warning title="注意">


在 Web 中，暂不支持采集视频分辨率变更回调。


</Warning>



开发者可通过注册 [publisherVideoSizeChanged](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/interfaces/_zegoexpresseventhandler_.zegoeventlistener.html#publishervideosizechanged) 监听采集视频大小变更回调。推流成功后，在推流中途如果有改变视频采集分辨率发生变化将会收到此回调。

<Note title="说明">


当在未推流或未预览的情况下，首次推流或首次预览，即 SDK 内部的音视频模块的引擎启动时，会去采集本机设备的视频数据，此时采集分辨率会改变。

开发者可以根据此回调来去除本地预览的 UI 的遮盖等类似操作。也可以根据该回调的分辨率来动态调整预览视图的比例等。

</Note>



```javascript
ZegoExpressEngine.instance().on("publisherVideoSizeChanged", (width, height, channel) => {
    console.info(`publisherVideoSizeChanged:width:${width}, height:${height}, channel:${channel}`);
})
```

#### 拉流分辨率变更通知

开发者可通过注册 [playerVideoSizeChanged](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/interfaces/_zegoexpresseventhandler_.zegoeventlistener.html#playervideosizechanged) 获取拉流分辨率变更通知。拉流成功后，在拉流中途如果有视频分辨率发生变化将会收到此回调，用户可根据流的最终分辨率调整显示。

<Note title="说明">


- 若拉的是流只有音频数据，会收不到该回调。
- 若推流端由于网络问题触发 SDK 内部的流量控制时，可能会动态减小推流端的编码分辨率，此时也会收到此回调。所拉的音视频流真正渲染到所设置 UI 播放界面时会触发此回调。开发者可利用该回调通知来更新或切换真正播放流的 UI 组件。

</Note>



```javascript
ZegoExpressEngine.instance().on("playerVideoSizeChanged", (streamID, width, height) => {
    console.info(`playerVideoSizeChanged:streamID:${streamID},width:${width},height:${height}`);
})
```

<Content />

