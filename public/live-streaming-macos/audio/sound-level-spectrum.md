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

请参考 [下载示例源码](https://doc-zh.zego.im/article/21224) 获取源码。

相关源码请查看 “/ZegoExpressExample/Examples/AdvancedAudioProcessing/SoundLevel” 目录下的文件。


## 前提条件

在实现声浪与音频频谱功能之前，请确保：

- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppID 和 AppSign，详情请参考 [控制台 - 项目信息](/console/project-info)。
- 已在项目中集成 ZEGO Express SDK，并实现了基本的音视频推拉流功能，详情请参考 [快速开始 - 集成](https://doc-zh.zego.im/article/21225) 和 [快速开始 - 实现流程](https://doc-zh.zego.im/article/21272)。


## 非混流场景使用步骤

### 1 监听声浪与音频频谱的回调接口

- 接口原型

    - 本地采集的声浪回调接口 [onCapturedSoundLevelUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_macos~protocol~ZegoEventHandler#on-captured-sound-level-update)、[onCapturedSoundLevelInfoUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_macos~protocol~ZegoEventHandler#on-captured-sound-level-info-update)：

        ```objc
        // 本地采集音频声浪回调
        //
        // @param soundLevel 本地采集的声浪值，取值范围为 0.0 ~ 100.0
        - (void)onCapturedSoundLevelUpdate:(NSNumber *)soundLevel;

        // 本地采集音频声浪回调，支持人声检测
        //
        // @note 想要触发这个回调，必须调用 [startSoundLevelMonitor] 函数启动声浪监控器。
        // @note 回调通知周期为调用 [startSoundLevelMonitor] 时设置的参数值。
        //
        // @param soundLevelInfo 本地采集的声浪值，取值范围为 0.0 ~ 100.0
        - (void)onCapturedSoundLevelInfoUpdate:(ZegoSoundLevelInfo *)soundLevelInfo;
        ```

    - 远端音频声浪回调接口 [onRemoteSoundLevelUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_macos~protocol~ZegoEventHandler#on-remote-sound-level-update)、[onRemoteSoundLevelInfoUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_macos~protocol~ZegoEventHandler#on-remote-sound-level-info-update)：

        ```objc
        // 远端拉流音频声浪回调
        //
        // @param soundLevels 远端的声浪键值对，key 为流 ID，value 为对应的流的声浪值，value 取值范围为 0.0 ~ 100.0
        - (void)onRemoteSoundLevelUpdate:(NSDictionary<NSString *, NSNumber *> *)soundLevels;

        // 远端拉流音频声浪回调，支持人声检测
        //
        // @note 想要触发这个回调，必须调用 [startSoundLevelMonitor] 函数启动声浪监控器，且处于正在拉流的状态。
        // @note 回调通知周期为调用 [startSoundLevelMonitor] 时设置的参数值。
        //
        // @param soundLevelInfos 远端的声浪键值对，key 为流 ID，value 为对应的流的声浪值，value 取值范围为 0.0 ~ 100.0
        - (void)onRemoteSoundLevelInfoUpdate:(NSDictionary<NSString *, ZegoSoundLevelInfo *> *)soundLevelInfos;

        ```

    - 本地采集的音频频谱回调接口 [onCapturedAudioSpectrumUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_macos~protocol~ZegoEventHandler#on-captured-audio-spectrum-update)：

        ```objc
        // 本地采集音频频谱回调
        //
        // @param audioSpectrum 本地采集的音频频谱值数组，频谱值范围为 [0-2^30]
        - (void)onCapturedAudioSpectrumUpdate:(NSArray<NSNumber *> *)audioSpectrum;
        -
        ```

    - 远端拉流音频频谱回调接口 [onRemoteAudioSpectrumUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_macos~protocol~ZegoEventHandler#on-remote-audio-spectrum-update)：

        ```objc
        // 远端拉流音频频谱回调
        //
        // @param audioSpectrums 远端音频频谱键值对，key 是流 ID，value 为对应的流的音频频谱值数组，频谱值范围为 [0-2^30]
        - (void)onRemoteAudioSpectrumUpdate:(NSDictionary<NSString *, NSArray<NSNumber *> *> *)audioSpectrums;
        ```

- 调用示例

    远端拉流声浪和远端音频频谱的回调将返回 `NSDictionary`，`key` 是当前房间内正在推流的其他用户的流 ID，`value` 是对应这条流的声浪/音频频谱数据。

    可先通过 [onRoomStreamUpdate ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_macos~protocol~ZegoEventHandler#on-room-stream-update-stream-list-extended-data-room-id) 回调方法获取到当前房间内存在的流列表，并保存起来，然后通过保存的流列表来索引 NSDictionary 取得每条流对应的声浪/音频频谱数据。

    以下示例将演示如何从回调方法中获取到声浪/音频频谱的数据并传递给 UI。具体上下文请参考示例源码中 “/ZegoExpressExample/Examples/AdvancedAudioProcessing/SoundLevel” 目录下的文件。

    ```objc
    // 本地采集音频声浪回调
    - (void)onCapturedSoundLevelUpdate:(NSNumber *)soundLevel {
        ZGSoundLevelTableViewCell *cell = [self.tableView cellForRowAtIndexPath:[NSIndexPath indexPathForRow:0 inSection:0]];
        cell.soundLevel = soundLevel;
    }

    // 本地采集音频声浪回调，支持人声检测
    - (void)onCapturedSoundLevelInfoUpdate:(ZegoSoundLevelInfo *)soundLevelInfo {
        ZGSoundLevelTableViewCell *cell = [self.tableView cellForRowAtIndexPath:[NSIndexPath indexPathForRow:0 inSection:0]];
        cell.soundLevelInfo = soundLevelInfo;
    }

    // soundLevels 远端的声浪键值对，key 为流 ID，value 为对应的流的声浪值
    - (void)onRemoteSoundLevelUpdate:(NSDictionary<NSString *,NSNumber *> *)soundLevels {
        NSInteger rowCount = [self.tableView numberOfRowsInSection:1];
        for (NSInteger row = 0; row < rowCount; row++) {
            ZGSoundLevelTableViewCell *cell = [self.tableView cellForRowAtIndexPath:[NSIndexPath indexPathForRow:row inSection:1]];
            if ([soundLevels objectForKey:cell.streamID]) {
                cell.soundLevel = soundLevels[cell.streamID];
            }
        }
    }

    // soundLevelInfos 远端的声浪键值对，key 为流 ID，value 为对应的流的声浪值
    - (void)onRemoteSoundLevelInfoUpdate:(NSDictionary<NSString *, ZegoSoundLevelInfo *> *)soundLevelInfos {
        NSInteger rowCount = [self.tableView numberOfRowsInSection:1];
        for (NSInteger row = 0; row < rowCount; row++) {
            ZGSoundLevelTableViewCell *cell = [self.tableView cellForRowAtIndexPath:[NSIndexPath indexPathForRow:row inSection:1]];
            if ([soundLevelInfos objectForKey:cell.streamID]) {
                cell. soundLevelInfos = soundLevelInfos[cell.streamID];
            }
        }
    }

    // 本地采集音频频谱回调
    - (void)onCapturedAudioSpectrumUpdate:(NSArray<NSNumber *> *)audioSpectrum {
        ZGSoundLevelTableViewCell *cell = [self.tableView cellForRowAtIndexPath:[NSIndexPath indexPathForRow:0 inSection:0]];
        cell.spectrumList = audioSpectrum;
    }

    // audioSpectrums 远端音频频谱键值对，key 是流 ID，value 为对应的流的音频频谱值数组
    - (void)onRemoteAudioSpectrumUpdate:(NSDictionary<NSString *,NSArray<NSNumber *> *> *)audioSpectrums {
        NSInteger rowCount = [self.tableView numberOfRowsInSection:1];
        for (NSInteger row = 0; row < rowCount; row++) {
            ZGSoundLevelTableViewCell *cell = [self.tableView cellForRowAtIndexPath:[NSIndexPath indexPathForRow:row inSection:1]];
            if ([audioSpectrums objectForKey:cell.streamID]) {
                cell.spectrumList = audioSpectrums[cell.streamID];
            }
        }
    }
    ```

### 2 启动监听声浪与音频频谱的回调的开关

可分别针对声浪或音频频谱，启动调用监听对应回调的接口。

- 调用  [startSoundLevelMonitor](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_macos~class~ZegoExpressEngine#start-sound-level-monitor) 接口启动声浪的监听：

    ```objc
    // 启动声浪监控
    //
    - (void)startSoundLevelMonitor;

    // 启动声浪监控，支持开启进阶功能
    //
    // @note 启动监控后可通过 [onCapturedSoundLevelUpdate] 回调接收本地采集音频声浪回调，以及 [onRemoteSoundLevelUpdate] 回调接收远端拉流音频声浪回调。
    // @note 开发者可在进入房间之前，调用 [startPreview] 此函数，并与 [onCapturedSoundLevelUpdate] 结合来判断音频设备是否正常工作。
    // @note [onCapturedSoundLevelUpdate] 与 [onRemoteSoundLevelUpdate] 回调通知周期为参数设置的值。
    //
    // @param config 启动声浪监控的配置
    - (void)startSoundLevelMonitorWithConfig:(ZegoSoundLevelConfig *)config;
    ```

    在调用上述接口后，[onCapturedSoundLevelUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_macos~protocol~ZegoEventHandler#on-captured-sound-level-update) 回调方法会立刻触发，未推流且未预览时回调值为 0。[onRemoteSoundLevelUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_macos~protocol~ZegoEventHandler#on-remote-sound-level-update) 需要在调用 [startPlayingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_macos~class~ZegoExpressEngine#start-playing-stream-canvas) 开始拉流接口之后，才会有回调。

- 调用  [startAudioSpectrumMonitor](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_macos~class~ZegoExpressEngine#start-audio-spectrum-monitor) 接口启动音频频谱的监听：

    ```objc
    // 启动音频频谱监控
    //
    - (void)startAudioSpectrumMonitor;
    ```

    在调用上述接口之后，[onCapturedAudioSpectrumUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_macos~protocol~ZegoEventHandler#on-captured-audio-spectrum-update) 回调方法会立刻触发，未推流且未预览时回调值为 0；[onRemoteAudioSpectrumUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_macos~protocol~ZegoEventHandler#on-remote-audio-spectrum-update) 需要在调用 [startPlayingStream ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_macos~class~ZegoExpressEngine#start-playing-stream-canvas) 开始拉流接口之后，才会有回调。

### 3 停止监听声浪与音频频谱的回调的开关

可分别针对声浪或音频频谱，停止调用监听对应回调的开关。

- 调用  [stopSoundLevelMonitor](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_macos~class~ZegoExpressEngine#stop-sound-level-monitor) 接口停止声浪的监听:

    ```objc
    // 停止声浪监控
    //
    - (void)stopSoundLevelMonitor;
    ```

    在调用上述接口后，[onCapturedSoundLevelUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_macos~protocol~ZegoEventHandler#on-captured-sound-level-update) 与 [onRemoteSoundLevelUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_macos~protocol~ZegoEventHandler#on-remote-sound-level-update) 不再回调。

- 调用 [stopAudioSpectrumMonitor](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_macos~class~ZegoExpressEngine#stop-audio-spectrum-monitor) 接口停止音频频谱的监听:

    ```objc
    // 停止音频频谱监控
    //
    - (void)stopAudioSpectrumMonitor;
    ```

    在调用上述接口之后，[onCapturedAudioSpectrumUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_macos~protocol~ZegoEventHandler#on-captured-audio-spectrum-update) 与 [onRemoteAudioSpectrumUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_macos~protocol~ZegoEventHandler#on-remote-audio-spectrum-update) 将不再回调。

## 混流场景使用步骤



- 混流，是将多路流混合成一路流的功能。当客户需要展示混流前各条流的声浪信息时，即可使用混流声浪的功能。由于混流的输出是单流，使用混流输出流的声浪信息是无法满足展示各条输入流声浪的需求。此时需要在混流时，在流信息里携带输入流的声浪信息，然后在拉取混流输出流时，从流信息里解析出各条输入流的声浪信息。
- 当从流信息里解析出各条输入流的声浪信息时，我们获得的是各条输入流对应声浪的值，就是一个字典。字典里面的 `key` 是流的标识符，`value` 是声浪值。但是由于流信息的大小限制，`key` 不能使用流 ID，只能用一个数字 ID（soundLevelID）来标识流。
- 在手动混流配置中，需要开发者维护数字 ID（soundLevelID）和流 ID 的关联关系。在回调中，开发者会得到数字 ID（soundLevelID）和对应声浪信息。
- 在房间自动混流中，混流服务端和 SDK 会自动处理数字 ID 和流 ID 的关联。在回调中，开发者得到的是流 ID 对应声浪信息。



### 1 监听混流声浪的回调接口

- 接口原型

    - 手动混流中每条单流的声浪更新回调接口 [onMixerSoundLevelUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_macos~protocol~ZegoEventHandler#on-mixer-sound-level-update)：

        ```objc
        /**
         * 混流中每条单流的声浪更新回调
         *
         * 回调通知周期为 100 ms。
         * @param soundLevel 混流中每条单流的声浪键值对，key 为每条单流的 soundLevelID，value 为对应的单流的声浪值。取值范围：value 的取值范围为 0.0 ~ 100.0。
         */
        - (void)onMixerSoundLevelUpdate:(NSDictionary<NSNumber *, NSNumber *> *)soundLevels {

        }
        ```

    - 自动混流中每条单流的声浪更新回调接口 [onAutoMixerSoundLevelUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_macos~protocol~ZegoEventHandler#on-auto-mixer-sound-level-update)：

        ```objc
        /**
         * 自动混流中每条单流的声浪更新回调
         *
         * 回调通知周期为 100 ms。
         * @param soundLevels 混流中每条单流的声浪键值对，key 为每条单流的 streamID，value 为对应的单流的声浪值，value 的取值范围为 0.0 ~ 100.0
         */
        - (void)onAutoMixerSoundLevelUpdate:(NSDictionary<NSString *, NSNumber *> *)soundLevels {

        }
        ```

### 2 启动监听声浪回调的开关

在开始/更新混流时，可启动监听声浪回调的开关。

- 手动混流场景

  调用 [startMixerTask](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_macos~class~ZegoExpressEngine#start-mixer-task-callback) 接口发起一个手动混流任务时，设置 `enableSoundLevel` 参数为 `YES` 可启动声浪的监听，并为每条输入流指定设置唯一的 `soundLevelID`：

    ```objc
    ZegoMixerTask *task = [[ZegoMixerTask alloc] initWithTaskID:@"task123"];
    // 开启混流声浪
    [task enableSoundLevel:YES];

    ZegoMixerInput *input = [[ZegoMixerInput alloc] init];
    // 给输入流分配一个 soundLevelID
    input.soundLevelID = 123;

    // 其他配置

    [[ZegoExpressEngine sharedEngine] startMixerTask:task callback:nil];
    ```

- 自动混流场景

  调用 [startAutoMixerTask](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_macos~class~ZegoExpressEngine#start-auto-mixer-task-callback) 接口发起一个自动混流任务时，设置 `enableSoundLevel` 参数为 `YES` 可启动声浪的监听：

    ```objc
    ZegoAutoMixerTask *task = [[ZegoAutoMixerTask alloc] init];

    task.taskID = @"autotask123";
    task.roomID = @"room123";
    task.enableSoundLevel = YES;
    // 其他配置

    [[ZegoExpressEngine sharedEngine] startAutoMixerTask:task callback:nil];
    ```


### 3 停止监听声浪回调的开关

在更新混流任务时，可设置停止监听声浪回调的开关。

- 手动混流场景

  在调用 [startMixerTask](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_macos~class~ZegoExpressEngine#start-mixer-task-callback) 的客户端接口更新一个混流任务时，设置 `enableSoundLevel` 参数为 `NO` 可停止声浪的监听：

    ```objc
    ZegoMixerTask *task = [[ZegoMixerTask alloc] initWithTaskID:@"task123"];
    // 开启混流声浪
    [task enableSoundLevel:NO];

    ZegoMixerInput *input = [[ZegoMixerInput alloc] init];
    // 给输入流分配一个 soundLevelID
    input.soundLevelID = 123;

    // 其他配置

    [[ZegoExpressEngine sharedEngine] startMixerTask:task callback:nil];
    ```

- 自动混流场景

  调用 [startAutoMixerTask](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_macos~class~ZegoExpressEngine#start-auto-mixer-task-callback) 的客户端接口更新一个自动混流任务时，设置 `enableSoundLevel` 参数为 `NO` 可停止声浪的监听：

    ```objc
    ZegoAutoMixerTask *task = [[ZegoAutoMixerTask alloc] init];

    task.taskID = @"autotask123";
    task.roomID = @"room123";
    task.enableSoundLevel = NO;
    // 其他配置

    [[ZegoExpressEngine sharedEngine] startAutoMixerTask:task callback:nil];
    ```


## 常见问题

1. **开启了声浪和音频频谱的监控开关之后，为什么没有收到相关回调？**

    本地采集的回调会立刻触发，未推流时的回调值为 0；远端拉流的回调在拉流 [startPlayingStream ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_macos~class~ZegoExpressEngine#start-playing-stream-canvas) 成功之后才会触发。


## 相关文档

- [媒体音量和通话音量有什么区别？](https://doc-zh.zego.im/faq/system_volume)
- [怎么处理无声问题？](https://doc-zh.zego.im/faq/noaudio)
- [怎么处理音量太小问题？](https://doc-zh.zego.im/faq/audio_low)

<Content />