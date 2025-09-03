# 场景化音视频配置

- - -

## 功能简介

为方便开发者快速接入，降低开发者接入门槛，SDK 通过大量线上数据验证，沉淀出多种场景化配置方案。开发者可根据所需场景，选择对应的房间模式，SDK 将自动应用适合该场景的音视频编解码器、音视频参数、流控策略等配置，从而快速实现该场景下的最佳效果。当前支持场景包括秀场直播、KTV、标准 1v1 音视频通话、高画质 1v1 音视频通话、标准语聊房、高音质语聊房。

## 调用方式

创建并初始化一个 [ZegoExpressEngine ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine) 的实例， [ZegoOptions](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoOptions) 参数中的 `scenario` 字段需要指定一个场景（[ZegoScenario](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~enum~ZegoScenario)），您可以根据实际音视频业务场景进行选择。

```js
const zg = new ZegoExpressEngine(appid, server, { scenario: 4 })
```

<Warning title="注意">

- 同一个房间内的用户，建议使用同一种房间场景，以获得最佳效果。
- 若您需要有多种音视频业务场景，例如，同时有 1v1 音视频通话场景和秀场直播场景。您可以在不创建新的引擎实例的前提下，在退出房间后，通过调用 [setRoomScenario](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#set-room-scenario) 接口切换场景，然后再登录其他房间。

</Warning>



目前 SDK 支持下列场景：

<table>
  <colgroup>
    <col width="20%"/>
    <col width="10%"/>
    <col width="40%"/>
    <col width="30%"/>
  </colgroup>
<tbody>
<tr>
<th>场景（支持版本：2.21.0 及以上）</th>
<th>场景值</th>
<th>场景描述</th>
<th>关键配置说明</th>
</tr>
<tr>
<td>Default</td>
<td>3</td>
<td>默认（通用）场景，如果上述场景枚举均不符合开发者的实际应用场景，可以使用此默认场景。</td>
<td><ul><li>分辨率：480p。</li><li>帧率：15 fps。</li></ul></td>
</tr>
<tr>
<td>StandardVideoCall</td>
<td>4</td>
<td>标准音视频通话场景，适用于 1v1 视频或语音通话场景。</td>
<td><ul><li>分辨率：360p。</li><li>帧率：15 fps。</li><li>音频编码器兼容：仅可用于 RTC 推流，转推 CDN 时需要服务端转码。</li></ul></td>
</tr>
<tr>
<td>HighQualityVideoCall</td>
<td>5</td>
<td>高品质音视频通话场景，与 StandardVideoCall（4）场景类似，但该场景默认采用了比 StandardVideoCall（4）场景更高的视频配置，适用于对画质要求较高的视频通话场景。</td>
<td><ul><li>分辨率：540p。</li><li>帧率：25 fps。</li></ul></td>
</tr>
<tr>
<td>StandardChatroom</td>
<td>6</td>
<td><p>标准语聊房场景，适用于多人纯语音通话，节省流量。</p><Warning title="注意">此场景中，默认不开启摄像头。建议存在音乐的语聊房场景选择高品质语聊房场景配置。</Warning></td>
<td>-</td>
</tr>
<tr>
<td>HighQualityChatroom</td>
<td>7</td>
<td><p>高品质语聊房场景，与 StandardChatroom（6）场景类似，但此场景默认采用比 StandardChatroom（6）场景下更高的音频配置，适用于对音质要求较高的多人纯语音通话场景。</p><Warning title="注意"><ul><li>此场景中，默认不开启摄像头。</li><li>此场景枚举，在 2.26.0 及以上的 SDK 版本才支持。</li></ul></Warning></td>
<td>-</td>
</tr>
<tr>
<td>Broadcast</td>
<td>8</td>
<td><p>直播场景，适用于秀场、游戏、电商、教育大班课等一对多直播的场景中，对音画质量、流畅度、兼容性等进行了优化。</p><Warning title="注意">直播场景中，SDK 没有业务上的 “角色” 之分（例如主播、观众），房间内的所有用户均可推拉流。</Warning></td>
<td><ul><li>分辨率：540p。</li><li>帧率：20 fps。</li><li>音频编码器兼容：与 iOS、Android、Windows 或 macOS 平台的 SDK 互通时，需要通过服务端转码。</li></ul></td>
</tr>
<tr>
<td>Karaoke</td>
<td>9</td>
<td><p>卡拉 OK (KTV) 场景，适用于实时合唱、在线 K 歌场景，保障了多人合唱时精准对齐和超低时延。</p> <Warning title="注意">此场景枚举，在 3.10.0 及以上的 SDK 版本才支持</Warning></td>
<td>音频编码器兼容：仅可用于 RTC 推流，转推 CDN 时需要服务端转码。</td>
</tr>
</tbody>
</table>

若指定场景后，开发者有对 SDK 音视频配置精细化控制的需求，可通过其他 API 进行配置，优先级高于场景化配置。

<Accordion title="可进行精细化配置的 API 接口" defaultOpen="false">
- 视频相关配置
  - [enableVideoCaptureDevice](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#enable-video-capture-device)
  - [setVideoConfig](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#set-video-config)
  - [enableHardwareEncoder](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#enable-hardware-encoder)

- 音频相关配置
  - [setAudioConfig](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#set-audio-config)
</Accordion>

<Warning title="注意">


- [setRoomScenario](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#set-room-scenario) 修改场景成功后，并不会对修改场景前 [createZegoStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#create-zego-stream) 已创建的流有影响，只会对于修改场景后再通过 [createZegoStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#create-zego-stream) 创建的流产生影响。
- 在退出房间后，一旦通过 [setRoomScenario](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#set-room-scenario) 进行切换场景，此前通过上方 API 所有进行过的相关音视频的精细化配置，**都会被重置**为新场景的默认值，因此建议先设置场景后，再通过其他 API 调整音视频配置。
- 若先进行场景化配置，再通过 [createZegoStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#create-zego-stream) 进行相关音视频的精细化配置，则新的参数配置，会覆盖场景化设置中的音视频相关配置。
- 若有其他场景的设置需求或配置疑问，请联系 ZEGO 技术支持。


</Warning>



<Content />

