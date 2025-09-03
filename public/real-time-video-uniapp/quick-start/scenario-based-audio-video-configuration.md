# 场景化音视频配置

- - -

## 功能简介

为方便开发者快速接入，降低开发者接入门槛，SDK 通过大量线上数据验证，沉淀出多种场景化配置方案。开发者可根据所需场景，选择对应的房间模式，SDK 将自动应用适合该场景的音视频编解码器、音视频参数、流控策略等配置，从而快速实现该场景下的最佳效果。当前支持场景包括秀场直播、KTV、标准 1v1 音视频通话、高画质 1v1 音视频通话、标准语聊房、高音质语聊房。

## 调用方式

在创建引擎的 `profile` ([ZegoEngineProfile](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/classes/_zegoexpressdefines_.zegoengineprofile.html#scenario)) 参数中的 `scenario` ([ZegoScenario](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/enums/_zegoexpressdefines_.zegoscenario.html)) 字段需要指定一个场景，您可以根据实际音视频业务场景来选择。

<Warning title="注意">


同一个房间内的用户，建议使用同一种房间场景，以获得最佳效果。

</Warning>



目前 SDK 支持下列场景：

<table>
  
<tbody><tr>
<th>场景（支持版本：3.0.0 及以上）</th>
<th>场景描述</th>
<th>关键配置说明</th>
</tr>
<tr>
<td>Broadcast</td>
<td>
<p>直播场景，适用于秀场、游戏、电商、教育大班课等一对多直播的场景中，对音画质量、流畅度、兼容性等进行了优化。</p>
<p>注意：直播场景中，SDK 没有业务上的 “角色” 之分（例如主播、观众），房间内的所有用户均可推拉流。</p>
</td>
<td><ul><li>分辨率：540p。</li><li>帧率：24 fps。</li><li>音频编码器兼容：与 Web SDK 互通时需要服务端转码。</li></ul></td>
</tr>
<tr>
<td>StandardVideoCall</td>
<td><p>标准音视频通话场景，适用于 1v1 视频或语音通话场景。</p></td>
<td><ul><li>分辨率：360p。</li><li>帧率：15 fps。</li><li>音频编码器兼容：仅可用于 RTC 推流，转推 CDN 时需要服务端转码。</li></ul></td>
</tr>
<tr>
<td>HighQualityVideoCall</td>
<td><p>高品质音视频通话场景，与 StandardVideoCall 场景类似，但该场景默认采用了比 StandardVideoCall 场景更高的视频配置，适用于对画质要求较高的视频通话场景。</p></td>
<td><ul><li>分辨率：540p。</li><li>帧率：24 fps。</li><li>音频编码器兼容：仅可用于 RTC 推流，转推 CDN 时需要服务端转码。</li></ul></td>
</tr>
<tr>
<td>StandardVoiceCall</td>
<td><p>标准语音通话场景，适用于 1v1 纯语音通话场景。</p><p>注意：在实时音视频 (Express-Video) SDK 上，此场景默认不开启摄像头。</p></td>
<td>-</td>
</tr>
<tr>
<td>StandardChatroom</td>
<td><p>标准语聊房场景，适用于多人纯语音通话，节省流量。</p><p>注意：在实时音视频 （Express-Video） SDK 上，此场景默认不开启摄像头。<b>建议存在音乐的语聊房场景选择高品质语聊房场景配置。 </b></p></td>
<td>音频编码器兼容：仅可用于 RTC 推流，转推 CDN 时需要服务端转码。</td>
</tr>
<tr>
<td>HighQualityChatroom</td>
<td><p>高品质语聊房场景，与 StandardChatroom 场景类似，但此场景默认采用了比 StandardChatroom 场景下更高的音频配置，适用于对音质要求较高的多人纯语音通话场景。</p><p>注意：在实时音视频 （Express-Video）SDK 上，此场景默认不开启摄像头。</p></td>
<td>音频编码器兼容：仅可用于 RTC 推流，转推 CDN 时需要服务端转码。</td>
</tr>
<tr>
<td>Karaoke</td>
<td><p>卡拉 OK （KTV）场景，适用于实时合唱、在线 K 歌场景，对延迟、音质、耳返、回声消除等进行了优化，同时还保障了多人合唱时的精准对齐和超低时延。</p><p>注意：在实时音视频（Express-Video）SDK 上，此场景默认不开启摄像头。</p></td>
<td>音频编码器兼容：仅可用于 RTC 推流，转推 CDN 时需要服务端转码。</td>
</tr>
<tr>
<td>Default</td>
<td><p>默认（通用）场景，若上述场景枚举均不符合开发者的实际应用场景，可以使用此默认场景。</p></td>
<td><ul><li>分辨率：360p。</li><li>帧率：15 fps。</li><li>音频编码器兼容：与 Web SDK 互通时需要服务端转码。</li></ul></td>
</tr>
</tbody></table>




<Accordion title="另外 SDK 还提供 3 种旧版场景，仅适用于从 Express v3.0.0 以前的 SDK 版本升级的用户。" defaultOpen="false">
<Warning title="注意">



由于以下 3 种旧版场景已废弃，请使用旧版场景的用户尽快迁移到上述的新版场景。

</Warning>



- General 旧版通用场景。
- Communication 旧版实时通讯场景。
- Live 旧版直播场景。
</Accordion>


若指定场景后，开发者有对 SDK 音视频配置精细化控制的需求，可通过其他 API 进行配置，优先级高于场景化配置，详情请参考 [常用视频配置](https://doc-zh.zego.im/article/10406)文档。

<Accordion title="可进行精细化配置的 API 接口" defaultOpen="false">
- 视频相关配置
  - [enableCamera](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/classes/_zegoexpressengineapp_.zegoexpressengine.html#enablecamera)
  - [setVideoConfig](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/classes/_zegoexpressengineapp_.zegoexpressengine.html#setvideoconfig)
  - [enableHardwareEncoder](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/classes/_zegoexpressengineapp_.zegoexpressengine.html#enablehardwareencoder)
  - [enableHardwareDecoder](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/classes/_zegoexpressengineapp_.zegoexpressengine.html#enablehardwaredecoder)

- 音频相关配置
  - [setAudioConfig](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/classes/_zegoexpressengineapp_.zegoexpressengine.html#setaudioconfig)
  - [setAudioDeviceMode](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/classes/_zegoexpressengineapp_.zegoexpressengine.html#setaudiodevicemode)

- 音频 3A 处理相关配置
  - [enableAGC](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/classes/_zegoexpressengineapp_.zegoexpressengine.html#enableagc)
  - [enableAEC](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/classes/_zegoexpressengineapp_.zegoexpressengine.html#enableaec)
  - [setAECMode](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/classes/_zegoexpressengineapp_.zegoexpressengine.html#setaecmode)
  - [enableANS](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/classes/_zegoexpressengineapp_.zegoexpressengine.html#enableans)
  - [setANSMode](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/classes/_zegoexpressengineapp_.zegoexpressengine.html#setansmode)

- 流控相关配置
  - [enableTrafficControl](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/classes/_zegoexpressengineapp_.zegoexpressengine.html#enabletrafficcontrol)
  - [setMinVideoBitrateForTrafficControl](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/classes/_zegoexpressengineapp_.zegoexpressengine.html#setminvideobitratefortrafficcontrol)
</Accordion>

<Warning title="注意">


若有其他场景的设置需求或配置疑问，请联系 ZEGO 技术支持。

</Warning>


