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


## 非混流场景使用步骤

### 1 开启声浪和频谱监控

SDK 默认关闭了声浪和频谱监控，需要用户主动调用相关接口以打开监控。可分别针对声浪或音频频谱，启动调用监听对应回调的接口。

- 接口原型：

    ```cpp
    // 启动声浪监控
    virtual void startSoundLevelMonitor() = 0;

    // 启动音频频谱监控
    virtual void startAudioSpectrumMonitor() = 0;
    ```

- 调用实例：

    调用 [startSoundLevelMonitor ](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cpp_linux~class~IZegoExpressEngine#start-sound-level-monitor) 接口启动声浪的监听：

    ```cpp
    // 启动声浪监控
    engine->startSoundLevelMonotior();
    ```

    调用 [startAudioSpectrumMonitor ](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cpp_linux~class~IZegoExpressEngine#start-audio-spectrum-monitor) 接口启动音频频谱的监听：

    ```cpp
    // 启动音频频谱监控
    engine->startAudioSpectrumMonitor();
    ```

### 2 监听声浪和频谱回调

打开了声浪和频谱监控之后，SDK将周期性的通过相关回调([onCapturedSoundLevelUpdate ](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cpp_linux~class~IZegoEventHandler#on-captured-sound-level-update)、[onRemoteSoundLevelUpdate ](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cpp_linux~class~IZegoEventHandler#on-remote-sound-level-update) 、[onCapturedAudioSpectrumUpdate ](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cpp_linux~class~IZegoEventHandler#on-captured-audio-spectrum-update)、[onRemoteAudioSpectrumUpdate ](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cpp_linux~class~IZegoEventHandler#on-remote-audio-spectrum-update))，以通知用户当前的声浪和频谱数据，用户只需重写相关回调函数实现 UI 展示即可。

- 接口原型：

    ```cpp
    /**
    * 本地采集音频声浪回调
    * @param soundLevel 本地采集的声浪值，取值范围为 0.0~100.0
    */
    virtual void onCapturedSoundLevelUpdate(double soundLevel) {

    }

    /**
    * 远端音频声浪回调
    * @param soundLevels 远端的声浪键值对，key 为流ID，value 为对应的流的声浪值
    */
    virtual void onRemoteSoundLevelUpdate(const std::map<std::string, double>& soundLevels) {

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

        virtual void onRemoteSoundLevelUpdate(const std::map<std::string, double>& soundLevels) {
            printf("onRemoteSoundLevelUpdate");
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

### 3 停止声浪和频谱监控

可分别针对声浪或音频频谱，停止调用监听对应回调的开关。

- 接口原型：

    ```cpp
    // 停止声浪监控
    virtual void stopSoundLevelMonitor() = 0;
    // 停止音频频谱监控
    virtual void stopAudioSpectrumMonitor() = 0;
    ```

- 调用实例：

    调用 [stopSoundLevelMonitor](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cpp_linux~class~IZegoExpressEngine#stop-sound-level-monitor) 接口停止声浪的监听:

    ```cpp
    // 停止声浪监控
    engine->stopSoundLevelMonotior();
    ```

    调用 [stopAudioSpectrumMonitor](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cpp_linux~class~IZegoExpressEngine#stop-audio-spectrum-monitor) 接口停止音频频谱的监听:

    ```cpp
    // 停止音频频谱监控
    engine->stopAudioSpectrumMonitor();
    ```

## 混流场景使用步骤



### 1 监听混流声浪的回调接口

- 接口原型

    - 手动混流中每条单流的声浪更新回调接口 [onMixerSoundLevelUpdate](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cpp_linux~class~IZegoEventHandler#on-mixer-sound-level-update)：

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

    - 自动混流中每条单流的声浪更新回调接口 [onAutoMixerSoundLevelUpdate](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cpp_linux~class~IZegoEventHandler#on-auto-mixer-sound-level-update)：

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

  调用 [startMixerTask](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cpp_linux~class~IZegoExpressEngine#start-mixer-task) 接口发起一个手动混流任务时，设置 `enableSoundLevel` 参数为 `true` 可启动声浪的监听，并为每条输入流指定设置唯一的 `soundLevelID`：

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

  调用 [startAutoMixerTask](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cpp_linux~class~IZegoExpressEngine#start-auto-mixer-task) 接口发起一个自动混流任务时，设置 `enableSoundLevel` 参数为 `true` 可启动声浪的监听：

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

  在调用 [startMixerTask](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cpp_linux~class~IZegoExpressEngine#start-mixer-task) 的客户端接口更新一个混流任务时，设置 `enableSoundLevel` 参数为 `false` 可停止声浪的监听：

    ```java
    ZegoMixerTask task;
    // taskID 要和之前的保持一致
    task.taskID = "task123";
    // 停止监听混流声浪
    task.soundLevel = false;

    mSDKEnging->startMixerTask(task, null);
    ```

- 自动混流场景

  调用 [startAutoMixerTask](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cpp_linux~class~IZegoExpressEngine#start-auto-mixer-task) 的客户端接口更新一个自动混流任务时，设置 `enableSoundLevel` 参数为 `false` 可停止声浪的监听：

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

本地采集的回调会立刻触发，未推流时的回调值为 0；远端拉流的回调在拉流 [startPlayingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~CPP_linux~class~zego-express-i-zego-express-engine#start-playing-stream) 成功之后才会触发。

<Content />
