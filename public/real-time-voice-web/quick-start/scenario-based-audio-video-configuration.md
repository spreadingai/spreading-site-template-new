# 场景化音频配置

- - -

## 功能简介

为方便开发者快速接入，降低开发者接入门槛，SDK 提供预设场景。开发者可根据所需场景，选择对应的房间模式，则 SDK 自动应用适合该场景的音频参数等配置，从而快速实现该场景下的最佳效果。当前仅支持标准语聊房场景。

## 调用方式

创建并初始化一个 [ZegoExpressEngine ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine) 的实例， `options` 参数中的 `scenario` 字段需要指定一个场景，您可以根据实际音频业务场景来选择。

```
const zg = new ZegoExpressEngine(appid, server, { scenario: 6 })
```

<Warning title="注意">


- 同一个房间内的用户，建议使用同一种房间场景，以获得最佳效果。
- 若您需要有多种音频业务场景，您可以在不创建新的引擎实例的前提下，在退出房间后，通过调用 [setRoomScenario](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#set-room-scenario) 接口切换场景，然后再登录其他房间。


</Warning>



目前 SDK 支持下列场景：

<table>
  
<tbody>
<tr>
<th>场景（支持版本：2.21.0 及以上）</th>
<th>场景值</th>
<th>场景描述</th>
<th>关键配置说明</th>
</tr>
<tr>
<td>HighQualityChatroom</td>
<td>7</td>
<td><p>高品质语聊房场景，与 StandardChatroom（6）场景类似，但此场景默认采用比 StandardChatroom（6）场景下更高的音频配置，适用于对音质要求较高的多人纯语音通话场景。</p><p>注意：</p><ul><li>此场景中，默认不开启摄像头。</li><li>此场景枚举，在 2.26.0 及以上的 SDK 版本才支持。</li></ul></td>
<td>-</td>
</tr>
<td>StandardChatroom</td>
<td>6</td>
<td>
标准语聊房场景，适用于多人纯语音通话。（节省流量）
<br />注意：此场景默认不开启摄像头。
</td>
<td>-</td>
</tbody>
</table>


若指定场景后，开发者对 SDK 音频配置精细化控制的需求，可通过其他 API 进行配置。

<Accordion title="可进行精细化配置的 API 接口" defaultOpen="false">
音频相关配置：[setAudioConfig](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#set-audio-config)
</Accordion>

<Warning title="注意">


- [setRoomScenario](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#set-room-scenario) 修改场景成功后，并不会对修改场景前 [createZegoStream](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#create-zego-stream) 已创建的流有影响，只会对于修改场景后再通过 [createZegoStream](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#create-zego-stream) 创建的流产生影响。
- 在退出房间后，一旦通过 [setRoomScenario](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#set-room-scenario) 进行切换场景，此前通过上方 API 所有进行过的相关音频的精细化配置，**都会被重置**为新场景的默认值，因此建议先设置场景后，再通过其他 API 调整音频配置。
- 若先进行场景化配置，再通过 [createZegoStream](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#create-zego-stream) 进行相关音频的精细化配置，则新的参数配置，会覆盖场景化设置中的音频相关配置。
- 若有其他场景的设置需求，请联系 ZEGO 技术支持。



</Warning>


