# 音量变化与音频频谱

- - -

## 功能简介

<table>

<tbody><tr>
<th>概念</th>
<th>描述</th>
<th>应用场景</th>
<th>场景图</th>
</tr>
<tr>
<td>音量变化</td>
<td>指某条流的音量大小，下文简称为“声浪”。</td>
<td>在推拉流过程中，判断麦上的用户谁在说话，并做 UI 展示。</td>
<td>&nbsp; <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Android/ZegoLiveRoom/SoundLevel.png" /></Frame></td>
</tr>
<tr>
<td>音频频谱</td>
<td>指数字音频信号在各频点的能量值。</td>
<td>在主播 K 歌场景中，已经推流或拉流的前提下，让主播或观众看到音调与音量变化的动画。</td>
<td>&nbsp; &nbsp;<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Android/ZegoLiveRoom/FrequencySpectrum.png" /></Frame></td>
</tr>
</tbody></table>

## 示例源码下载

请参考 [跑通示例源码](https://doc-zh.zego.im/article/19522) 获取源码。

相关源码请查看 “/pages/Topics/SoundLevel/” 目录下的文件 SoundLevel.ets。

## 前提条件

在实现声浪与音频频谱功能之前，请确保：

- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppID 和 AppSign，详情请参考 [控制台 - 项目信息](/console/project-info)。
- 已在项目中集成 ZEGO Express SDK，并实现了基本的音视频推拉流功能，详情请参考 [快速开始 - 集成](https://doc-zh.zego.im/article/19523) 和 [快速开始 - 实现流程](https://doc-zh.zego.im/article/19524)。


## 非混流场景使用步骤

### 监听声浪与音频频谱的回调

开发者可以通过监听如下回调，接收声浪、频谱等变化通知：

- [onCapturedSoundLevelUpdate](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/ets_ohos/interfaces/_zegoexpresseventhandler_.zegoeventlistener.html#oncapturedsoundlevelupdate)：本地采集音频的声浪回调。
- [onRemoteSoundLevelUpdate](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/ets_ohos/interfaces/_zegoexpresseventhandler_.zegoeventlistener.html#onremotesoundlevelupdate)：远端拉流音频声浪回调。
- [onCapturedAudioSpectrumUpdate](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/ets_ohos/interfaces/_zegoexpresseventhandler_.zegoeventlistener.html#oncapturedaudiospectrumupdate)：本地采集的音频频谱回调。
- [onRemoteAudioSpectrumUpdate](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/ets_ohos/interfaces/_zegoexpresseventhandler_.zegoeventlistener.html#onremoteaudiospectrumupdate)：远端拉流的音频频谱回调。

远端拉流声浪和远端音频频谱的回调给的是 `Object`，对象的 `key` 是当前房间内正在推流的其他用户的流 ID，对象的 `value` 是对应这条流的声浪/音频频谱数据。

可先通过 [onRoomStreamUpdate](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/ets_ohos/interfaces/_zegoexpresseventhandler_.zegoeventlistener.html#onroomstreamupdate) 回调获取到当前房间内存在的流列表，并保存起来，然后通过保存的流列表来索引取得每条流对应的声浪/音频频谱数据。

以下示例演示如何从回调方法中获取到声浪/音频频谱的数据并传递给 UI，具体渲染到 UI 上的逻辑请参考示例源码中的 `page/Topics/SoundLevel/SoundLevel.ets` 文件。

```ts
// 本地采集音频的声浪
// 开发者可以在这里进行获取本地声浪数据之后渲染到具体的 UI 控件上
this.ZegoExpressInstance.on('onCapturedSoundLevelUpdate', (soundLevel: number) => {
    let localSoundLevel = soundLevel;
})

// 远端拉流音频的声浪回调
// 开发者可以在这里进行获取远端声浪数据之后渲染到具体的 UI 控件上
this.ZegoExpressInstance.on('onRemoteSoundLevelUpdate', (soundLevel: Object) => {
    let params = soundLevel as Record<string, number>;
    for (let element of Object.entries(params)) {
        let key = element[0];
        let value = element[1];
        {
            // 远端用户ID
            let remoteUserName:string = key;
            // 远端声浪列表
            let remoteUserSoundLevelCount:number = value;
            // 示例取用第一项值，具体应该根据业务逻辑而定
            break;
        }
    }
})

// 本地采集的音频频谱
// 开发者可以在这里进行获取本地音频频谱数据之后渲染到具体的 UI 控件上
this.ZegoExpressInstance.on('onCapturedAudioSpectrumUpdate', (audioSpectrum: number[]) => {
    if(audioSpectrum.length >0)
    {
        let localAudioSpectrumMap:number[] = audioSpectrum;
    }
})

// 远端拉流音频频谱回调
// 开发者可以在这里进行获取远端音频频谱数据之后渲染到具体的 UI 控件上
this.ZegoExpressInstance.on('onRemoteAudioSpectrumUpdate', (audioSpectrums: Object) => {
    // 根据用户显示列表
    let params = audioSpectrums as Record<string, number[]>;
    for (let element of Object.entries(params)) {
        let key = element[0];
        let value : number[] = element[1];
        {
            // 远端用户ID
            let remoteUserName:string = key;
            // 远端频谱列表
            let remoteUserSpectrumCount:number[] = value;
            // 示例取用第一项值，具体应该根据业务逻辑而定
            break;
        }
    }
})
```

### 启动监听声浪与音频频谱的回调

开发者可以分别针对声浪和音频频谱，启动监听对应回调的开关。

- 调用 [startSoundLevelMonitor](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/ets_ohos/classes/_zegoexpressengine_.zegoexpressengine.html#startsoundlevelmonitor) 接口，启动声浪的监听：

    ```ts
    // ZegoExpressInstance 为 ZegoExpressEngine 的实例
    let config = new ZegoSoundLevelConfig();
    config.millisecond = 300;  // 这里设置 300 ms 回调
    this.ZegoExpressInstance.startSoundLevelMonitor(config)
    ```

    在调用上述接口之后，[onCapturedSoundLevelUpdate ](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/ets_ohos/interfaces/_zegoexpresseventhandler_.zegoeventlistener.html#oncapturedsoundlevelupdate) 会立刻触发，未推流且未预览时回调值为 0；[onRemoteSoundLevelUpdate ](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/ets_ohos/interfaces/_zegoexpresseventhandler_.zegoeventlistener.html#onremotesoundlevelupdate) 需要在拉流 [startPlayingStream ](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/ets_ohos/classes/_zegoexpressengine_.zegoexpressengine.html#startplayingstream)之后，才会回调。

- 调用 [startAudioSpectrumMonitor](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/ets_ohos/classes/_zegoexpressengine_.zegoexpressengine.html#startaudiospectrummonitor) 接口，启动音频频谱的监听：

    ```ts
    // ZegoExpressInstance 为 ZegoExpressEngine 的实例
    // 这里设置 300 ms 回调
    this.ZegoExpressInstance.startAudioSpectrumMonitor(300)
    ```

    在调用上述接口之后，[onCapturedAudioSpectrumUpdate ](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/ets_ohos/interfaces/_zegoexpresseventhandler_.zegoeventlistener.html#oncapturedaudiospectrumupdate) 会立刻触发，未推流且未预览时回调值为 0；[onRemoteAudioSpectrumUpdate ](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/ets_ohos/interfaces/_zegoexpresseventhandler_.zegoeventlistener.html#onremoteaudiospectrumupdate) 需要在拉流 [startPlayingStream ](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/ets_ohos/classes/_zegoexpressengine_.zegoexpressengine.html#startplayingstream) 之后，才会回调。

### 停止监听声浪与音频频谱的回调

如果不再需要监听声浪或音频频谱，开发者可以通过如下接口停止监听。

- 调用 [stopSoundLevelMonitor](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/ets_ohos/classes/_zegoexpressengine_.zegoexpressengine.html#stopsoundlevelmonitor) 接口，停止声浪的监听：

    ```ts
    // ZegoExpressInstance 为 ZegoExpressEngine 的实例
    this.ZegoExpressInstance.stopSoundLevelMonitor();
    ```

    在调用上述接口之后，[onCapturedSoundLevelUpdate ](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/ets_ohos/interfaces/_zegoexpresseventhandler_.zegoeventlistener.html#oncapturedsoundlevelupdate) 与 [onRemoteSoundLevelUpdate ](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/ets_ohos/interfaces/_zegoexpresseventhandler_.zegoeventlistener.html#onremotesoundlevelupdate) 不再回调。

- 调用 [stopAudioSpectrumMonitor](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/ets_ohos/classes/_zegoexpressengine_.zegoexpressengine.html#stopaudiospectrummonitor) 接口，停止音频频谱的监听：

    ```ts
    // ZegoExpressInstance 为 ZegoExpressEngine 的实例
    this.ZegoExpressInstance.stopAudioSpectrumMonitor();
    ```

    在调用上述接口之后，[onCapturedAudioSpectrumUpdate ](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/ets_ohos/interfaces/_zegoexpresseventhandler_.zegoeventlistener.html#oncapturedaudiospectrumupdate) 与 [onRemoteAudioSpectrumUpdate ](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/ets_ohos/interfaces/_zegoexpresseventhandler_.zegoeventlistener.html#onremoteaudiospectrumupdate) 不再回调。

## 混流场景使用步骤

- 混流，是将多路流混合成一路流的功能。当客户需要展示混流前各条流的声浪信息时，即可使用混流声浪的功能。由于混流的输出是单流，使用混流输出流的声浪信息是无法满足展示各条输入流声浪的需求。此时需要在混流时，在流信息里携带输入流的声浪信息，然后在拉取混流输出流时，从流信息里解析出各条输入流的声浪信息。
- 当从流信息里解析出各条输入流的声浪信息时，我们获得的是各条输入流对应声浪的值，就是一个字典。字典里面的 `key` 是流的标识符，`value` 是声浪值。但是由于流信息的大小限制，`key` 不能使用流 ID，只能用一个数字 ID（soundLevelID）来标识流。
- 在手动混流配置中，需要开发者维护数字 ID（soundLevelID）和流 ID 的关联关系。在回调中，开发者会得到数字 ID（soundLevelID）和对应声浪信息。
- 在房间自动混流中，混流服务端和 SDK 会自动处理数字 ID 和流 ID 的关联。在回调中，开发者得到的是流 ID 对应声浪信息。

<Warning title="注意">


仅支持在手动混流时，对声浪、音频频谱进行监听。

</Warning>



### 监听混流声浪的回调

手动混流中，每条单流的声浪更新回调接口 [onMixerSoundLevelUpdate](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/ets_ohos/interfaces/_zegoexpresseventhandler_.zegoeventlistener.html#onmixersoundlevelupdate)：

```ts
/**
 * 混流中每条单流的声浪更新回调
 *
 * 回调通知周期为 100 ms。
 * @param soundLevel 混流中每条单流的声浪键值对，Object 的 key 为每条单流的 soundLevelID，value 为对应的单流的声浪值。取值范围：value 的取值范围为 0.0 ~ 100.0。
 */

 onMixerSoundLevelUpdate: (soundLevels: Object) => void
```

### 启动监听声浪回调

在开始/更新混流时，可启动监听声浪回调。

调用 [startMixerTask](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/ets_ohos/classes/_zegoexpressengine_.zegoexpressengine.html#startmixertask) 接口发起一个手动混流任务时，设置 `soundLevel` 参数为 `True` 可启动声浪的监听，并为每条输入流指定设置唯一的 `soundLevelID`：

```ts
let mixTask = new ZegoMixerTask('789');
let mixInputList:ZegoMixerInput[] = [];
// 开启混流声浪
mixTask.enableSoundLevel = true;

// 给输入流分配一个 soundLevelID
let mixInput2 = new ZegoMixerInput();
mixInput2.soundLevelID = 123;

// 其他配置

this.ZegoExpressInstance.startMixerTask(mixTask).then((result: ZegoMixerStartResult) =>{
    if(result)
    {
        this.logInfo('ZegoMixerStartResult. code: '+ result.errorCode);
    }
})
```

### 停止监听声浪回调

在更新混流任务时，可设置停止监听声浪回调。

在调用 [startMixerTask](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/ets_ohos/classes/_zegoexpressengine_.zegoexpressengine.html#startmixertask) 的客户端接口更新一个混流任务时，设置 `soundLevel` 参数为 `False` 可停止声浪的监听：

```ts
let mixTask = new ZegoMixerTask('789');
let mixInputList:ZegoMixerInput[] = [];
// 停止监听混流声浪
mixTask.enableSoundLevel = false;
// 其他配置

this.ZegoExpressInstance.startMixerTask(mixTask).then((result: ZegoMixerStartResult) =>{
    if(result)
    {
        this.logInfo('ZegoMixerStartResult. code: '+ result.errorCode);
    }
})
```

## 相关文档

- [媒体音量和通话音量有什么区别？](https://doc-zh.zego.im/faq/system_volume)
- [怎么处理无声问题？](https://doc-zh.zego.im/faq/noaudio)
- [怎么处理音量太小问题？](https://doc-zh.zego.im/faq/audio_low)

<Content />
