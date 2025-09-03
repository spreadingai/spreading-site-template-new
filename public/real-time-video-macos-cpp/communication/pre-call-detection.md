# 通话前检测

---

## 功能简介

为了保证实时通话体验，通话前可以进行网络与设备的检测，提前识别并解决问题。
- 网络检测：检测网络环境，可用于判断或预测网络环境是否适合推/拉指定码率的流。
- 设备检测：检测本地麦克风、摄像头以及扬声器是否能正常工作。

本文将介绍如何使用 ZEGO SDK 接口，实现上述两个角度的检测。


## 前提条件

在实现通话前网络/设备检测功能之前，请确保：

- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppID 和 AppSign，详情请参考 [控制台 - 项目信息](/console/project-info)。
- 已在项目中集成 ZEGO Express SDK，并实现了基本的音视频推拉流功能，详情请参考 [快速开始 - 集成](https://doc-zh.zego.im/article/9975) 和 [快速开始 - 实现流程](https://doc-zh.zego.im/article/9976)。



## 网络检测

请参考 [网络与性能](/real-time-video-macos-cpp/communication/testing-network) 进行操作。


## 设备检测


### 麦克风检测

**检测逻辑**

麦克风设备检测流程如下图所示：

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Common/ZegoExpressEngine/Microphone_detection.png" /></Frame>


**对应接口**

**1. 启动麦克风**

调用 [startPreview](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~CPP_macos~class~zego-express-i-zego-express-engine&jumpType=route#start-preview) 接口在不推流的情况下启动音频采集。

```cpp
engine->startPreview(&canvas);
```

**2. 检测麦克风权限**

ZEGO SDK 会自动检查麦克风权限。如果用户未授权，则会请求用户同意；如果用户拒绝，则需要用户手动去系统设置里开启权限。



**3. 检测麦克风是否可用**


通过如下回调检测设备是否异常，若未检测到任何异常反馈（可同步启动“4. 检测麦克风收音数据”），且麦克风收音数据检测正常，则麦克风设备可用。

- 2.15.0 及以后版本：监听 [onLocalDeviceExceptionOccurred](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoEventHandler#on-local-device-exception-occurred) 回调检测设备是否异常。
- 2.15.0 之前版本：监听 `onDeviceError` 回调检测设备是否异常。
<CodeGroup>
  ```cpp 2.15.0 及以后版本
/**
 * 本地设备异常通知。
 *
 * 支持版本：2.15.0 及以后。
 * 详情描述：本地设备异常。
 * 通知时机：当本地音频或视频设备功能出现异常时会触发此回调。
 *
 * @param exceptionType 设备异常类型。
 * @param deviceType 发生异常的设备类型。
 * @param deviceID 设备 ID。目前仅支持桌面端设备，用于标识具体的设备；对于移动端设备，此参数将返回空字符串。
 */
virtual void onLocalDeviceExceptionOccurred(ZegoDeviceExceptionType /*exceptionType*/, ZegoDeviceType /*deviceType*/, const std::string& /*deviceID*/) {

}
  ```
  ```cpp 2.15.0 之前版本
/**
* 设备异常通知。
* @param errorCode 设备异常的错误码，请参考常见错误码文档：/real-time-video-macos-cpp/error-code#7。
* @param deviceName 设备名称。
*/
virtual void onDeviceError(int /*errorCode*/, const std::string& /*deviceName*/) {}
  ```
</CodeGroup>


**4. 检测麦克风收音数据**

调用 [startSoundLevelMonitor](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~CPP_macos~class~zego-express-i-zego-express-engine&jumpType=route#start-sound-level-monitor) 接口获取麦克风采集到声音的能量值，如果数据无异常则麦克风正常，可用于通话。

```cpp
engine->startSoundLevelMonitor();
```


### 摄像头检测

**检测逻辑**

摄像头设备检测流程如下图所示：

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Common/ZegoExpressEngine/Camera_detection.png" /></Frame>


**对应接口**

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

- 2.15.0 及以后版本：监听 [onLocalDeviceExceptionOccurred](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoEventHandler#on-local-device-exception-occurred) 回调检测设备是否异常。
- 2.15.0 之前版本：监听 `onDeviceError` 回调检测设备是否异常。

<CodeGroup>
  ```cpp 2.15.0 及以后版本
/**
 * 本地设备异常通知。
 *
 * 支持版本：2.15.0 及以后。
 * 详情描述：本地设备异常。
 * 通知时机：当本地音频或视频设备功能出现异常时会触发此回调。
 *
 * @param exceptionType 设备异常类型。
 * @param deviceType 发生异常的设备类型。
 * @param deviceID 设备 ID。目前仅支持桌面端设备，用于标识具体的设备；对于移动端设备，此参数将返回空字符串。
 */
virtual void onLocalDeviceExceptionOccurred(ZegoDeviceExceptionType /*exceptionType*/, ZegoDeviceType /*deviceType*/, const std::string& /*deviceID*/) {

}
  ```
  ```cpp 2.15.0 之前版本
/**
* 设备异常通知。
* @param errorCode 设备异常的错误码，请参考常见错误码文档：/real-time-video-macos-cpp/error-code#7。
* @param deviceName 设备名称。
*/
virtual void onDeviceError(int /*errorCode*/, const std::string& /*deviceName*/) {}
  ```
</CodeGroup>

**4. 检测画面是否正常**

若此时画面显示正常，则摄像头正常，可用于通话。


### 扬声器检测

**检测逻辑**

播放设备检测流程如下图所示：

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Common/ZegoExpressEngine/Playback_device_detection.png" /></Frame>


**对应接口**

**1. 使用媒体播放器播放音频文件**

调用 [IZegoMediaPlayer](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~CPP_macos~class~zego-express-i-zego-media-player&jumpType=route#public-func-lists) 接口播放您用于测试的音频文件。

```cpp
// 1. 创建媒体播放器。
IZegoMediaPlayer *mediaPlayer = engine->createMediaPlayer();
// 2. 加载资源。
std::string currentSelectPath = "xxx";
mediaPlayer->loadResource(currentSelectPath, nullptr);
// 3. 播放资源。
mediaPlayer->start();
```

**2. 检测是否听到声音**

如果可以听到相应的音频，则播放设备正常，可用于通话。调用 [onMediaPlayerStateUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~CPP_macos~class~zego-express-i-zego-media-player-event-handler&jumpType=route#on-media-player-state-update) 回调查看媒体播放器状态：

```cpp
/**
* 播放器播放状态回调。
* @param mediaPlayer 回调的播放器实例。
* @param state 播放器状态。
* @param errorCode 错误码，请参考常见错误码文档：/real-time-video-macos-cpp/error-code#7。
*/
virtual void onMediaPlayerStateUpdate(IZegoMediaPlayer* /*mediaPlayer*/, ZegoMediaPlayerState /*state*/, int /*errorCode*/) { }
```
