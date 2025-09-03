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


<Warning title="注意">

本功能不支持在 WebGL 环境中运行使用。
</Warning>

## 示例源码下载

请参考 [下载示例源码](https://doc-zh.zego.im/article/13241) 获取源码。

相关源码请查看 “Assets/ZegoExpressExample/Examples/AdvancedAudioProcessing/SoundLevelAndAudioSpectrum.cs” 文件。

## 非混流场景使用步骤

### 1 开启声浪和频谱监控

SDK 默认关闭了声浪和频谱监控，需要用户主动调用相关接口以打开监控。可分别针对声浪或音频频谱，启动调用监听对应回调的接口。

调用 [StartSoundLevelMonitor ](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~ZegoExpressEngine#start-sound-level-monitor) 接口启动声浪的监听：

```csharp
// 启动声浪监控
engine.StartSoundLevelMonitor();
//需要 VAD 功能时，使用该接口传入对应 config
engine.StartSoundLevelMonitor(config);
```

调用 [StartAudioSpectrumMonitor ](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~ZegoExpressEngine#start-audio-spectrum-monitor) 接口启动音频频谱的监听：

```csharp
// 启动音频频谱监控
engine.StartAudioSpectrumMonitor();
```

### 2 监听声浪和频谱回调

打开了声浪和频谱监控之后，SDK 将周期性的通过相关回调（[OnCapturedSoundLevelUpdate](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~IZegoEventHandler#on-captured-sound-level-update)、[OnCapturedSoundLevelInfoUpdate](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~IZegoEventHandler#on-captured-sound-level-info-update)、[OnRemoteSoundLevelUpdate](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~IZegoEventHandler#on-remote-sound-level-update)、[OnRemoteSoundLevelInfoUpdate](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~IZegoEventHandler#on-remote-sound-level-info-update)、[OnCapturedAudioSpectrumUpdate](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~IZegoEventHandler#on-captured-audio-spectrum-update)、[OnRemoteAudioSpectrumUpdate](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~IZegoEventHandler#on-remote-audio-spectrum-update)）以通知用户当前的声浪和频谱数据，用户只需重写相关回调函数实现 UI 展示即可。


```csharp
/**
 * 本地采集音频声浪回调
 * @param soundLevel 本地采集的声浪值，取值范围为 0.0~100.0
 */
void OnCapturedSoundLevelUpdate(float soundLevel) {
    // operate ui in main thread
}

/**
 * 本地采集音频声浪回调，支持人声检测

 * @note 想要触发这个回调，必须调用 [startSoundLevelMonitor] 函数启动声浪监控器。
 * @note 回调通知周期为调用 [startSoundLevelMonitor] 时设置的参数值。
 *
 * @param soundLevelInfo 本地采集的声浪值，取值范围为 0.0 ~ 100.0
 */
void OnCapturedSoundLevelInfoUpdate(ZegoSoundLevelInfo soundLevelInfo) {
    // operate ui in main thread
}

/**
 * 远端音频声浪回调
 * @param soundLevels 远端的声浪键值对，key 为流ID，value 为对应的流的声浪值
 */
void OnRemoteSoundLevelUpdate(Dictionary<string, float> soundLevels) {
    // operate ui in main thread
}

/**
 * 远端拉流音频声浪回调，支持人声检测
 *
 * @note 想要触发这个回调，必须调用 [startSoundLevelMonitor] 函数启动声浪监控器，且处于正在拉流的状态。
 * @note 回调通知周期为调用 [startSoundLevelMonitor] 时设置的参数值。
 *
 * @param soundLevelInfos 远端的声浪键值对，key 为流 ID，value 为对应的流的声浪值，value 取值范围为 0.0 ~ 100.0
 */
void OnRemoteSoundLevelInfoUpdate(Dictionary<string, ZegoSoundLevelInfo> soundLevelInfos) {
    // operate ui in main thread
}

/**
 * 本地采集音频频谱回调
 * @param audioSpectrum 本地采集的音频频谱值数组，频谱值范围为 [0-2^30]
 *
 */
void OnCapturedAudioSpectrumUpdate(float[] audioSpectrum) {
    // operate ui in main thread
}

/**
 * 远端拉流音频频谱回调
 * @param audioSpectrums 远端音频频谱键值对，key 是流ID，value 为对应的流的音频频谱值数组，频谱值范围为 [0-2^30]
 */
void OnRemoteAudioSpectrumUpdate(Dictionary<string, float[]> audioSpectrums) {
    // operate ui in main thread
}
```

### 3 停止声浪和频谱监控

可分别针对声浪或音频频谱，停止调用监听对应回调的开关。

调用 [StopSoundLevelMonitor](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~ZegoExpressEngine#stop-sound-level-monitor) 接口停止声浪的监听:

```csharp
// 停止声浪监控
engine.StopSoundLevelMonitor();
```

调用 [StopAudioSpectrumMonitor](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~ZegoExpressEngine#stop-audio-spectrum-monitor) 接口停止音频频谱的监听:

```csharp
// 停止音频频谱监控
engine.StopAudioSpectrumMonitor();
```

## 混流场景使用步骤


- 混流，是将多路流混合成一路流的功能。当客户需要展示混流前各条流的声浪信息时，即可使用混流声浪的功能。由于混流的输出是单流，使用混流输出流的声浪信息是无法满足展示各条输入流声浪的需求。此时需要在混流时，在流信息里携带输入流的声浪信息，然后在拉取混流输出流时，从流信息里解析出各条输入流的声浪信息。
- 当从流信息里解析出各条输入流的声浪信息时，我们获得的是各条输入流对应声浪的值，就是一个字典。字典里面的 `key` 是流的标识符，`value` 是声浪值。但是由于流信息的大小限制，`key` 不能使用流 ID，只能用一个数字 ID（soundLevelID）来标识流。
- 在手动混流配置中，需要开发者维护数字 ID（soundLevelID）和流 ID 的关联关系。在回调中，开发者会得到数字 ID（soundLevelID）和对应声浪信息。
- 在房间自动混流中，混流服务端和 SDK 会自动处理数字 ID 和流 ID 的关联。在回调中，开发者得到的是流 ID 对应声浪信息。


### 1 监听混流声浪的回调接口

- 接口原型

    - 手动混流中每条单流的声浪更新回调接口 [OnMixerSoundLevelUpdate](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~IZegoEventHandler#on-mixer-sound-level-update)：

        ```csharp
        /**
         * 混流中的每条单流的声浪更新通知。
         * @param soundLevels 混流中每条单流的声浪键值对，key 为每条单流的 soundLevelID，value 为对应的单流的声浪值。取值范围：value 的取值范围为 0.0 ~ 100.0（该取值仅表示回调的声浪取值范围，不表示精度）。
         */
        public delegate void OnMixerSoundLevelUpdate(Dictionary<uint, float> soundLevels);
        ```

    - 自动混流中每条单流的声浪更新回调接口 [OnAutoMixerSoundLevelUpdate](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~IZegoEventHandler#on-auto-mixer-sound-level-update)：

        ```csharp
        /**
         * 自动混流中的每条单流的声浪更新通知
         * @param soundLevels 混流中每条单流的声浪键值对，key 为每条单流的 streamID，value 为对应的单流的声浪值，value 的取值范围为 0.0 ~ 100.0（该取值仅表示回调的声浪取值范围，不表示精度）。
         */
        public delegate void OnAutoMixerSoundLevelUpdate(Dictionary<string, float> soundLevels);
        ```

### 2 启动监听声浪回调的开关

在开始/更新混流时，可启动监听声浪回调的开关。

- 手动混流场景

  调用 [StartMixerTask](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~ZegoExpressEngine#start-mixer-task) 接口发起一个手动混流任务时，设置 `soundLevel` 参数为 `True` 可启动声浪的监听，并为每条输入流指定设置唯一的 `soundLevelID`：

    ```csharp
    ZegoMixerTask task = new ZegoMixerTask();
    task.taskID = "task123";
    // 开启混流声浪
    task.soundLevel = true;

    ZegoMixerInput input = new ZegoMixerInput();
    // 给输入流分配一个 soundLevelID
    input.soundLevelID = 123;

    // 其他配置

    mSDKEnging.StartMixerTask(task, null);
    ```

- 自动混流场景

  调用 [StartAutoMixerTask](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~ZegoExpressEngine#start-auto-mixer-task) 接口发起一个自动混流任务时，设置 `enableSoundLevel` 参数为 `True` 可启动声浪的监听：

    ```csharp
    ZegoAutoMixerTask task = new ZegoAutoMixerTask();
    task.taskID = "autotask123";
    // 开启混流声浪
    task.enableSoundLevel = true;
    // 其他配置

    mSDKEnging.StartAutoMixerTask(task, null);
    ```


### 3 停止监听声浪回调的开关

在更新混流任务时，可设置停止监听声浪回调的开关。

- 手动混流场景

  在调用 [StartMixerTask](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~ZegoExpressEngine#start-mixer-task) 的客户端接口更新一个混流任务时，设置 `soundLevel` 参数为 `false` 可停止声浪的监听：

    ```csharp
    ZegoMixerTask task = new ZegoMixerTask();
    // taskID 要和之前的保持一致
    task.taskID = "task123";
    // 停止监听混流声浪
    task.soundLevel = false;

    mSDKEnging.StartMixerTask(task, null);
    ```

- 自动混流场景

  调用 [StartAutoMixerTask](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~ZegoExpressEngine#start-auto-mixer-task) 的客户端接口更新一个自动混流任务时，设置 `enableSoundLevel` 参数为 `False` 可停止声浪的监听：

    ```csharp
    ZegoAutoMixerTask task = new ZegoAutoMixerTask();
    // taskID 要和之前的保持一致
    task.taskID = "autotask123";
    // 停止监听混流声浪
    task.enableSoundLevel = false;

    mSDKEnging.StartAutoMixerTask(task, null);
    ```


## 常见问题

**开启了声浪和频谱的监控开关之后，为什么没有收到相关回调？**

本地采集的回调会立刻触发，未推流时的回调值为 0。远端拉流的回调在拉流 [StartPlayingStream ](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~ZegoExpressEngine#start-playing-stream) 成功之后才会触发。


## 相关文档

- [怎么处理无声问题？](https://doc-zh.zego.im/faq/noaudio?product=all&platform=unity3d)
- [怎么处理音量太小问题？](https://doc-zh.zego.im/faq/audio_low?product=all&platform=unity3d)

<Content />

