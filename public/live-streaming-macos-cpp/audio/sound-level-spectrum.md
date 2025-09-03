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

请参考 [下载示例源码](https://doc-zh.zego.im/article/14904) 获取源码。

相关源码请查看 “/ZegoExpressExample/Examples/AdvancedAudioProcessing/SoundLevelAndAudioSpectrum“ 目录下的文件。

## 前提条件

在实现声浪与音频频谱功能之前，请确保：

- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppID 和 AppSign，详情请参考 [控制台 - 项目信息](/console/project-info)。
- 已在项目中集成 ZEGO Express SDK，并实现了基本的音视频推拉流功能，详情请参考 [快速开始 - 集成](https://doc-zh.zego.im/article/14902) 和 [快速开始 - 实现流程](https://doc-zh.zego.im/article/14903)。


## 非混流场景使用步骤

### 1 开启声浪和音频频谱监控

SDK 默认关闭了声浪和音频频谱监控，需要用户主动调用相关接口以打开监控。可分别针对声浪或音频频谱，启动调用监听对应回调的接口。

- 接口原型：

    ```cpp
    // 启动声浪监控
    virtual void startSoundLevelMonitor() = 0;

    // 需要 VAD 功能时，使用该接口传入对应 config
    virtual void startSoundLevelMonitor(ZegoSoundLevelConfig config) = 0;

    // 启动音频频谱监控
    virtual void startAudioSpectrumMonitor() = 0;
    ```

- 调用实例：

    调用 [startSoundLevelMonitor ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#start-sound-level-monitor) 接口启动声浪的监听：

    ```cpp
    // 启动声浪监控
    engine->startSoundLevelMonitor();
    // 需要 VAD 功能时，使用该接口传入对应 config
    engine->startSoundLevelMonitor(config);
    ```

    调用 [startAudioSpectrumMonitor ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#start-audio-spectrum-monitor) 接口启动音频频谱的监听：

    ```cpp
    // 启动音频频谱监控
    engine->startAudioSpectrumMonitor();
    ```

### 2 监听声浪和音频频谱回调

打开了声浪和音频频谱监控之后，SDK 将周期性地通过相关回调([onCapturedSoundLevelUpdate ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoEventHandler#on-captured-sound-level-update)、[onRemoteSoundLevelUpdate ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoEventHandler#on-remote-sound-level-update) 、[onCapturedAudioSpectrumUpdate ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoEventHandler#on-captured-audio-spectrum-update)、[onRemoteAudioSpectrumUpdate ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoEventHandler#on-remote-audio-spectrum-update))，以通知用户当前的声浪和音频频谱数据，用户只需重写相关回调函数实现 UI 展示即可。

- 接口原型：

    ```cpp
    /**
    * 本地采集音频声浪回调
    * @param soundLevel 本地采集的声浪值，取值范围为 0.0~100.0
    */
    virtual void onCapturedSoundLevelUpdate(double soundLevel) {

    }
    /**
    * 本地采集音频声浪回调，支持人声检测

    * @note 想要触发这个回调，必须调用 [startSoundLevelMonitor] 函数启动声浪监控器。
    * @note 回调通知周期为调用 [startSoundLevelMonitor] 时设置的参数值。
    *
    * @param soundLevelInfo 本地采集的声浪值，取值范围为 0.0 ~ 100.0
    virtual void onCapturedSoundLevelInfoUpdate(const ZegoSoundLevelInfo& soundLevelInfo) {

    }

    /**
    * 远端音频声浪回调
    * @param soundLevels 远端的声浪键值对，key 为流ID，value 为对应的流的声浪值
    */
    virtual void onRemoteSoundLevelUpdate(const std::map<std::string, double>& soundLevels) {

    }
    /**
    * 远端拉流音频声浪回调，支持人声检测
    *
    * @note 想要触发这个回调，必须调用 [startSoundLevelMonitor] 函数启动声浪监控器，且处于正在拉流的状态。
    * @note 回调通知周期为调用 [startSoundLevelMonitor] 时设置的参数值。
    *
    * @param soundLevelInfos 远端的声浪键值对，key 为流 ID，value 为对应的流的声浪值，value 取值范围为 0.0 ~ 100.0
    virtual void onRemoteSoundLevelInfoUpdate(const std::unordered_map<std::string, ZegoSoundLevelInfo>& soundLevelInfo) {

    }

    /**
    * 本地采集音频频谱回调
    * @param audioSpectrum 本地采集的音频频谱值数组，频谱值范围为 [0-2^30]
    *
    */
    virtual void onCapturedAudioSpectrumUpdate(const ZegoAudioSpectrum& audioSpectrum) {

    }

    /**
    * 远端拉流音频频谱回调
    * @param audioSpectrums 远端音频频谱键值对，key 是流ID，value 为对应的流的音频频谱值数组，频谱值范围为 [0-2^30]
    *
    */
    virtual void onRemoteAudioSpectrumUpdate(const std::map<std::string, ZegoAudioSpectrum>& audioSpectrums) {

    }
    ```

- 调用实例：

    ```cpp
    class MyEventHandler: public IZegoEventHandler
    {
        virtual void onCapturedSoundLevelUpdate(double soundLevel) {
            printf("onCapturedSoundLevelUpdate");
            ... // operate ui
        }
        virtual void onCapturedSoundLevelInfoUpdate(const ZegoSoundLevelInfo& soundLevelInfo) {
            printf("onCapturedSoundLevelInfoUpdate");
            ... // operate ui
        }

        virtual void onRemoteSoundLevelUpdate(const std::map<std::string, double>& soundLevels) {
            printf("onRemoteSoundLevelUpdate");
            ... // operate ui
        }
        virtual void onRemoteSoundLevelInfoUpdate(const std::unordered_map<std::string, ZegoSoundLevelInfo>& soundLevelInfo) {
            printf("onRemoteSoundLevelInfoUpdate");
            ... // operate ui
        }

        virtual void onCapturedAudioSpectrumUpdate(const ZegoAudioSpectrum& audioSpectrum) {
            printf("onCapturedAudioSpectrumUpdate");
            ... // operate ui
        }

        virtual void onRemoteAudioSpectrumUpdate(const std::map<std::string, ZegoAudioSpectrum>& audioSpectrums) {
            printf("onRemoteAudioSpectrumUpdate");
            ... // operate ui
        }
    };
    ```

### 3 停止声浪和音频频谱监控

可分别针对声浪或音频频谱，停止调用监听对应回调的开关。

- 接口原型：

    ```cpp
    // 停止声浪监控
    virtual void stopSoundLevelMonitor() = 0;
    // 停止音频频谱监控
    virtual void stopAudioSpectrumMonitor() = 0;
    ```

- 调用实例：

    调用 [stopSoundLevelMonitor](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#stop-sound-level-monitor) 接口停止声浪的监听:

    ```cpp
    // 停止声浪监控
    engine->stopSoundLevelMonitor();
    ```

    调用 [stopAudioSpectrumMonitor](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#stop-audio-spectrum-monitor) 接口停止音频频谱的监听:

    ```cpp
    // 停止音频频谱监控
    engine->stopAudioSpectrumMonitor();
    ```


## 混流场景使用步骤


- 混流，是将多路流混合成一路流的功能。当客户需要展示混流前各条流的声浪信息时，即可使用混流声浪的功能。由于混流的输出是单流，使用混流输出流的声浪信息是无法满足展示各条输入流声浪的需求。此时需要在混流时，在流信息里携带输入流的声浪信息，然后在拉取混流输出流时，从流信息里解析出各条输入流的声浪信息。
- 当从流信息里解析出各条输入流的声浪信息时，我们获得的是各条输入流对应声浪的值，就是一个字典。字典里面的 `key` 是流的标识符，`value` 是声浪值。但是由于流信息的大小限制，`key` 不能使用流 ID，只能用一个数字 ID（soundLevelID）来标识流。
- 在手动混流配置中，需要开发者维护数字 ID（soundLevelID）和流 ID 的关联关系。在回调中，开发者会得到数字 ID（soundLevelID）和对应声浪信息。
- 在房间自动混流中，混流服务端和 SDK 会自动处理数字 ID 和流 ID 的关联。在回调中，开发者得到的是流 ID 对应声浪信息。


### 1 监听混流声浪的回调接口

- 接口原型

    - 手动混流中每条单流的声浪更新回调接口 [onMixerSoundLevelUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoEventHandler#on-mixer-sound-level-update)：

        ```cpp
        /**
         * 混流中每条单流的声浪更新回调
         *
         * 回调通知周期为 100 ms。
         * @param soundLevel 混流中每条单流的声浪键值对，key 为每条单流的 soundLevelID，value 为对应的单流的声浪值。取值范围：value 的取值范围为 0.0 ~ 100.0。
         */
        public void onMixerSoundLevelUpdate(const std::unordered_map<unsigned int, float> &soundLevels){

        }
        ```

    - 自动混流中每条单流的声浪更新回调接口 [onAutoMixerSoundLevelUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoEventHandler#on-auto-mixer-sound-level-update)：

        ```cpp
        /**
         * 自动混流中每条单流的声浪更新回调
         *
         * 回调通知周期为 100 ms。
         * @param soundLevels 混流中每条单流的声浪键值对，key 为每条单流的 streamID，value 为对应的单流的声浪值，value 的取值范围为 0.0 ~ 100.0
         */
        public void onAutoMixerSoundLevelUpdate(const std::unordered_map<std::string, float> &soundLevels){

        }
        ```

### 2 启动监听声浪回调的开关

在开始/更新混流时，可启动监听声浪回调的开关。

- 手动混流场景

  调用 [startMixerTask](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#start-mixer-task) 接口发起一个手动混流任务时，设置 `enableSoundLevel` 参数为 `true` 可启动声浪的监听，并为每条输入流指定设置唯一的 `soundLevelID`：

    ```cpp
    ZegoMixerTask task;
    task.taskID = "task123";
    // 开启混流声浪
    task.enableSoundLevel = true;

    ZegoMixerInput input;
    // 给输入流分配一个 soundLevelID
    input.soundLevelID = 123;

    // 其他配置

    mSDKEnging->startMixerTask(task, null);
    ```

- 自动混流场景

  调用 [startAutoMixerTask](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#start-auto-mixer-task) 接口发起一个自动混流任务时，设置 `enableSoundLevel` 参数为 `true` 可启动声浪的监听：

    ```cpp
    ZegoAutoMixerTask task;
    task.taskID = "autotask123";
    // 开启混流声浪
    task.enableSoundLevel = true;
    // 其他配置

    mSDKEnging->startAutoMixerTask(task, null);
    ```


### 3 停止监听声浪回调的开关

在更新混流任务时，可设置停止监听声浪回调的开关。

- 手动混流场景

  在调用 [startMixerTask](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#start-mixer-task) 的客户端接口更新一个混流任务时，设置 `enableSoundLevel` 参数为 `false` 可停止声浪的监听：

    ```java
    ZegoMixerTask task;
    // taskID 要和之前的保持一致
    task.taskID = "task123";
    // 停止监听混流声浪
    task.soundLevel = false;

    mSDKEnging->startMixerTask(task, null);
    ```

- 自动混流场景

  调用 [startAutoMixerTask](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#start-auto-mixer-task) 的客户端接口更新一个自动混流任务时，设置 `enableSoundLevel` 参数为 `false` 可停止声浪的监听：

    ```java
    ZegoAutoMixerTask task;
    // taskID 要和之前的保持一致
    task.taskID = "autotask123";
    // 停止监听混流声浪
    task.enableSoundLevel = false;

    mSDKEnging->startAutoMixerTask(task, null);
    ```

## 常见问题

**开启了声浪和频谱的监控开关之后，为什么没有收到相关回调？**

本地采集的回调会立刻触发，未推流时的回调值为 0；远端拉流的回调在拉流 [startPlayingStream ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoExpressEngine#start-playing-stream) 成功之后才会触发。


## 相关文档

- [怎么处理无声问题？](https://doc-zh.zego.im/faq/noaudio)
- [怎么处理音量太小问题？](https://doc-zh.zego.im/faq/audio_low)

<Content />

