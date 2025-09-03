# 音频频谱与音量变化

- - -

## 功能简介

- 音量变化：指某条流的音量大小，下文简称为“声浪”。

主要应用场景，在推拉流过程中, 判断麦上的用户谁在说话，并做UI展示，例如：

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Android/ZegoLiveRoom/SoundLevel.png" /></Frame>

- 音频频谱，即数字音频信号在各频点的能量值。

主要应用场景, 在主播K歌场景中, 已经推流或拉流的前提下, 让主播或观众看到音调与音量变化的动画, 例如:

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Android/ZegoLiveRoom/FrequencySpectrum.png" /></Frame>

## 示例源码下载

请参考 [下载示例源码](/real-time-video-windows-cpp/quick-start/run-example-code)。

相关源码请查看 `/ZegoExpressExample/src/SoundLevel` 目录下的文件。

## 使用步骤

### 开启/关闭声浪和频谱监控

SDK 默认关闭了声浪和频谱监控，需要用户主动调用相关接口以打开监控。

- 接口原型：

```cpp
/**
  * 启动声浪监控
  */
virtual void startSoundLevelMonitor() = 0;

/**
  * 停止声浪监控
  */
virtual void stopSoundLevelMonitor() = 0;

/**
  * 启动音频频谱监控
  */
virtual void startAudioSpectrumMonitor() = 0;

/**
  * 停止音频频谱监控
  */
virtual void stopAudioSpectrumMonitor() = 0;
```

- 调用实例：

```cpp
engine->startSoundLevelMonitor();
engine->stopSoundLevelMonitor();

engine->startAudioSpectrumMonitor();
engine->stopAudioSpectrumMonitor();
```

### 监听声浪和频谱回调

打开了声浪和频谱监控之后，SDK将周期性的通过相关回调以通知用户当前的声浪和频谱数据，用户只需重写相关回调函数实现 UI 展示即可。

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

## API 参考列表

| 方法 | 描述 |
|-------|--------|
| [startSoundLevelMonitor ](https://doc-zh.zego.im/zh/api?doc=Express_Video_SDK_API~CPP~class~zego-express-i-zego-express-engine#start-sound-level-monitor) | 开启声浪监控 |
| [stopSoundLevelMonitor ](https://doc-zh.zego.im/zh/api?doc=Express_Video_SDK_API~CPP~class~zego-express-i-zego-express-engine#stop-sound-level-monitor) | 关闭声浪监控 |
| [startAudioSpectrumMonitor ](https://doc-zh.zego.im/zh/api?doc=Express_Video_SDK_API~CPP~class~zego-express-i-zego-express-engine#start-audio-spectrum-monitor) | 开启音频频谱监控 |
| [stopAudioSpectrumMonitor ](https://doc-zh.zego.im/zh/api?doc=Express_Video_SDK_API~CPP~class~zego-express-i-zego-express-engine#stop-audio-spectrum-monitor) | 关闭音频频谱监控 |
| [onCapturedSoundLevelUpdate ](https://doc-zh.zego.im/zh/api?doc=Express_Video_SDK_API~CPP~class~zego-express-i-zego-event-handler#on-captured-sound-level-update) | 本地采集音频声浪回调 |
| [onRemoteSoundLevelUpdate ](https://doc-zh.zego.im/zh/api?doc=Express_Video_SDK_API~CPP~class~zego-express-i-zego-event-handler#on-remote-sound-level-update) | 远端音频声浪回调 |
| [onCapturedAudioSpectrumUpdate ](https://doc-zh.zego.im/zh/api?doc=Express_Video_SDK_API~CPP~class~zego-express-i-zego-event-handler#on-captured-audio-spectrum-update) | 本地采集音频频谱回调 |
| [onRemoteAudioSpectrumUpdate ](https://doc-zh.zego.im/zh/api?doc=Express_Video_SDK_API~CPP~class~zego-express-i-zego-event-handler#on-remote-audio-spectrum-update) | 远端拉流音频频谱回调 |

## Q&A

> **Q1：开启了声浪和频谱的监控开关之后，为什么没有收到相关回调？**  
> 本地采集的回调会立刻触发，未推流时的回调值为 0；远端拉流的回调在拉流[startPlayingStream ](https://doc-zh.zego.im/zh/api?doc=Express_Video_SDK_API~CPP~class~zego-express-i-zego-express-engine#start-playing-stream)成功之后才会触发。
