# 通话前检测

---

## 功能简介

为了保证实时通话体验，通话前可以进行网络与设备的检测，提前识别并排查问题。

- 网络检测：检测网络环境，可用于判断或预测网络环境是否适合推/拉指定码率的流。
- 设备检测：检测本地麦克风、摄像头以及扬声器是否能正常工作。

本文将介绍如何使用 ZEGO SDK 接口，实现上述两个角度的检测。


## 前提条件

在实现通话前网络/设备检测功能之前，请确保：

- 已在项目中集成 ZEGO Express SDK，实现基本的实时音视频功能，详情请参考 [快速开始 - 集成](https://doc-zh.zego.im/article/1241) 和 [快速开始 - 实现流程](https://doc-zh.zego.im/article/7634)。
- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppID 和 AppSign，详情请参考 [控制台 - 项目信息](/console/project-info)。

## 网络检测

请参考 [网络测速](https://doc-zh.zego.im/article/10908) 进行操作。

## 设备检测

### 麦克风检测

**检测逻辑**

麦克风设备检测流程如下图所示：

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Common/ZegoExpressEngine/Microphone_detection.png" /></Frame>


**对应接口**

**1. 启动麦克风**

调用 [startPreview](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePublisher/startPreview.html) 接口在不推流的情况下启动音频采集。

```dart
ZegoExpressEngine.instance.startPreview();
```

**2. 检测麦克风权限**

ZEGO Express SDK 自动检查麦克风权限。

<Warning title="注意">


需要先参考 [快速开始 - 集成](https://doc-zh.zego.im/article/1241) 中的设置权限，设置好权限。

Android 6.0 在一些比较重要的权限上要求必须申请动态权限，不能只通过 “AndroidMainfest.xml” 文件申请静态权限。因此还需要参考执行如下代码，下面的方法需要 Flutter 工程安装插件 permission_handler。

</Warning>



```dart
Permission.microphone.request();
```

**3. 检测麦克风是否可用**


通过如下回调检测设备是否异常，若未检测到任何异常反馈（可同步启动 “4. 检测麦克风收音数据”，且麦克风收音数据检测正常，则麦克风设备可用。

- 2.15.0 及以后版本：监听 [onLocalDeviceExceptionOccurred](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngine/onLocalDeviceExceptionOccurred.html) 回调检测设备是否异常。
- 2.15.0 之前版本：监听 `onDeviceError` 回调检测设备是否异常。

<CodeGroup>
  ```dart title="2.15.0 及以后版本"
  class ZegoExpressEngine {

  ...

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
  static void Function(ZegoDeviceExceptionType exceptionType, ZegoDeviceType deviceType, String deviceID)? onLocalDeviceExceptionOccurred;

  ...

  }
  ```

  ```dart title="2.15.0 之前版本"
  class ZegoExpressEngine {

  ...

  /**
   * 音视频设备错误通知。
   * @param errorCode 错误码，请参考常见错误码：/real-time-video-flutter/error-code#7。
   * @param deviceName 设备类型名称。
   */
  static void Function(int errorCode, String deviceName)? onDeviceError;

  }
  ```
</CodeGroup>

**4. 检测麦克风收音数据**

调用 [startSoundLevelMonitor](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngineDevice/startSoundLevelMonitor.html) 接口获取麦克风采集到声音的能量值，如果数据无异常则麦克风正常，可用于通话。

```dart
ZegoExpressEngine.instance.startSoundLevelMonitor();
```


### 摄像头检测

<Warning title="注意">


仅接入实时语音 SDK 或者纯音频场景时，不需要进行摄像头检测，可忽略此章节。

</Warning>



**检测逻辑**

摄像头设备检测流程如下图所示：

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Common/ZegoExpressEngine/Camera_detection.png" /></Frame>


**对应接口**

**1. 启动摄像头**

调用 [startPreview](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePublisher/startPreview.html) 接口绑定摄像头预览画面的视图，在不推流的情况下启动视频采集并预览。

```java
ZegoExpressEngine.instance.startPreview();
```

**2. 检测摄像头权限**

ZEGO SDK 会自动检查摄像头权限。

<Warning title="注意">


需要先参考 [快速开始-集成](https://doc-zh.zego.im/article/1241) 中的设置权限，设置好权限。

因为 Android 6.0 在一些比较重要的权限上要求必须申请动态权限，不能只通过 “AndroidMainfest.xml” 文件申请静态权限。因此还需要参考执行如下代码，下面的方法需要Flutter工程安装插件permission_handler。

</Warning>



```dart
Permission.camera.request();
```

**3. 检测摄像头是否可用**


通过如下回调检测设备是否异常，若未检测到任何异常反馈（可同步启动“4. 检测画面是否正常”），且画面显示正常，则设备可用。

- 2.15.0 及以后版本：监听 [onLocalDeviceExceptionOccurred](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngine/onLocalDeviceExceptionOccurred.html) 回调检测设备是否异常。
- 2.15.0 之前版本：监听 `onDeviceError` 回调检测设备是否异常。

<CodeGroup>
  ```dart title="2.15.0 及以后版本"
  class ZegoExpressEngine {

  ...

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
  static void Function(ZegoDeviceExceptionType exceptionType, ZegoDeviceType deviceType, String deviceID)? onLocalDeviceExceptionOccurred;

  ...

  }
  ```

  ```dart title="2.15.0 之前版本"
  class ZegoExpressEngine {

  ...

  /**
   * 音视频设备错误通知。
   * @param errorCode 错误码，请参考常见错误码：/real-time-video-flutter/error-code#7。
   * @param deviceName 设备类型名称。
   */
  static void Function(int errorCode, String deviceName)? onDeviceError;

  }
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

调用 [ZegoMediaPlayer](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoMediaPlayer-class.html) 接口播放您用于测试的音频文件。

```dart
// 1. 创建播放器对象。
var mediaPlayer = await ZegoExpressEngine.instance.createMediaPlayer();
// 2. 加载资源。
String resourcePath = "xxx";
await mediaPlayer?.loadResource(resourcePath);
// 3. 播放资源。
mediaPlayer?.start();
```

**2. 检测是否听到声音**

如果可以听到相应的音频，则播放设备正常，可用于通话。调用 [onMediaPlayerStateUpdate](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngine/onMediaPlayerStateUpdate.html) 回调查看播放器状态：

```dart
class ZegoExpressEngine {

...

/**
 * 播放器播放状态回调。
 * @param mediaPlayer 回调的播放器实例。
 * @param state 播放器状态。
 * @param errorCode 错误码，请参考常见错误码：/real-time-video-flutter/error-code#7。
 */
static void Function(ZegoMediaPlayer mediaPlayer, ZegoMediaPlayerState state, int errorCode)? onMediaPlayerStateUpdate;

...

}
```
