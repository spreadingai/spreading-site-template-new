# 设备检测

---

## 功能简介

为了保证实时通信体验，通话或直播前可以进行设备检测，提前识别并排查问题。设备检测主要是检测本地麦克风、摄像头以及扬声器是否能正常工作。


## 前提条件

在实现设备检测功能之前，请确保：

- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppID 和 AppSign，详情请参考 [控制台 - 项目信息](/console/project-info)。
- 已在项目中集成 ZEGO Express SDK，并实现了基本的音视频推拉流功能，详情请参考 [快速开始 - 集成](https://doc-zh.zego.im/article/14902) 和 [快速开始 - 实现流程](https://doc-zh.zego.im/article/14903)。



## 设备检测

### 麦克风检测

#### 检测逻辑

麦克风设备检测流程如下图所示：

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Common/ZegoExpressEngine/Microphone_detection.png" /></Frame>


#### 对应接口

**1. 启动麦克风**

调用 [startPreview](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~CPP_macos~class~zego-express-i-zego-express-engine&jumpType=route#start-preview) 接口在不推流的情况下启动音频采集。

```cpp
engine->startPreview(&canvas);
```

**2. 检测麦克风权限**

ZEGO SDK 会自动检查麦克风权限。如果用户未授权，则会请求用户同意；如果用户拒绝，则需要用户手动去系统设置里开启权限。



**3. 检测麦克风是否可用**


通过如下回调检测设备是否异常，若未检测到任何异常反馈（可同步启动“4. 检测麦克风收音数据”），且麦克风收音数据检测正常，则麦克风设备可用。

监听 [onLocalDeviceExceptionOccurred](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoEventHandler#on-local-device-exception-occurred) 回调检测设备是否异常。


```cpp
/**
 * The callback triggered when a local device exception occurred.
 *
 * Available since: 2.15.0
 * Description: The callback triggered when a local device exception occurs.
 * Trigger: This callback is triggered when the function of the local audio or video device is abnormal.
 *
 * @param exceptionType The type of the device exception.
 * @param deviceType The type of device where the exception occurred.
 * @param deviceID Device ID. Currently, only desktop devices are supported to distinguish different devices; for mobile devices, this parameter will return an empty string.
 */
virtual void onLocalDeviceExceptionOccurred(ZegoDeviceExceptionType /*exceptionType*/, ZegoDeviceType /*deviceType*/, const std::string& /*deviceID*/) {

}
```

**4. 检测麦克风收音数据**

调用 [startSoundLevelMonitor](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~CPP_macos~class~zego-express-i-zego-express-engine&jumpType=route#start-sound-level-monitor) 接口获取麦克风采集到声音的能量值，如果数据无异常则麦克风正常，可用于通话或直播。

```cpp
engine->startSoundLevelMonitor();
```


### 摄像头检测

#### 检测逻辑

摄像头设备检测流程如下图所示：

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Common/ZegoExpressEngine/Camera_detection.png" /></Frame>


#### 对应接口

**1. 启动摄像头**

调用 [startPreview](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~CPP_macos~class~zego-express-i-zego-express-engine&jumpType=route#start-preview) 接口绑定摄像头预览画面的视图，在不推流的情况下启动视频采集并预览。

```cpp
ZegoCanvas canvas(ZegoView(ui->frame_Preview->winId()));
engine->startPreview(&canvas);
```

**2. 检测摄像头权限**

ZEGO SDK 会自动检查摄像头权限。如果用户未授权，则会请求用户同意；如果用户拒绝，则需要用户手动去系统设置里开启权限。



**3. 检测摄像头是否可用**


通过如下回调检测设备是否异常，若未检测到任何异常反馈（可同步启动“4. 检测画面是否正常”），且画面显示正常，则设备可用。

监听 [onLocalDeviceExceptionOccurred](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoEventHandler#on-local-device-exception-occurred) 回调检测设备是否异常。


```cpp
/**
 * The callback triggered when a local device exception occurred.
 *
 * Available since: 2.15.0
 * Description: The callback triggered when a local device exception occurs.
 * Trigger: This callback is triggered when the function of the local audio or video device is abnormal.
 *
 * @param exceptionType The type of the device exception.
 * @param deviceType The type of device where the exception occurred.
 * @param deviceID Device ID. Currently, only desktop devices are supported to distinguish different devices; for mobile devices, this parameter will return an empty string.
 */
virtual void onLocalDeviceExceptionOccurred(ZegoDeviceExceptionType /*exceptionType*/, ZegoDeviceType /*deviceType*/, const std::string& /*deviceID*/) {

}
```

**4. 检测画面是否正常**

若此时画面显示正常，则摄像头正常，可用于通话或直播。


### 扬声器检测

#### 检测逻辑

播放设备检测流程如下图所示：

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Common/ZegoExpressEngine/Playback_device_detection.png" /></Frame>


#### 对应接口

**1. 使用媒体播放器播放音频文件**

调用 [IZegoMediaPlayer](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~CPP_macos~class~zego-express-i-zego-media-player&jumpType=route#public-func-lists) 接口播放您用于测试的音频文件。

```cpp
// 1. 创建媒体播放器
IZegoMediaPlayer *mediaPlayer = engine->createMediaPlayer();
// 2. 加载资源
std::string currentSelectPath = "xxx";
mediaPlayer->loadResource(currentSelectPath, nullptr);
// 3. 播放资源
mediaPlayer->start();
```

**2. 检测是否听到声音**

如果可以听到相应的音频，则播放设备正常，可用于通话或直播。调用 [onMediaPlayerStateUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~CPP_macos~class~zego-express-i-zego-media-player-event-handler&jumpType=route#on-media-player-state-update) 接口查看媒体播放器状态：

```cpp
/**
* 播放器播放状态回调
* @param mediaPlayer 回调的播放器实例
* @param state 播放器状态
* @param errorCode 错误码，详情请参考常见错误码文档
*/
virtual void onMediaPlayerStateUpdate(IZegoMediaPlayer* /*mediaPlayer*/, ZegoMediaPlayerState /*state*/, int /*errorCode*/) { }
```


## API 参考列表

| 方法 | 描述 |
|----|----|
|[startPreview](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~CPP_macos~class~zego-express-i-zego-express-engine&jumpType=route#start-preview)|启动本地预览|
|[onLocalDeviceExceptionOccurred](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoEventHandler#on-local-device-exception-occurred)|本地设备异常通知|
|[startSoundLevelMonitor](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~CPP_macos~class~zego-express-i-zego-express-engine&jumpType=route#start-sound-level-monitor)|启动音量变化监控|
|[onMediaPlayerStateUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~CPP_macos~class~zego-express-i-zego-media-player-event-handler&jumpType=route#on-media-player-state-update)|播放器播放状态回调|



## 常见错误码

当开发者收到 [onLocalDeviceExceptionOccurred](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoEventHandler#on-local-device-exception-occurred) 设备回调不为 0 时，相关的错误码请参考 [常见错误码](https://doc-zh.zego.im/article/5638#7)。

<Content />