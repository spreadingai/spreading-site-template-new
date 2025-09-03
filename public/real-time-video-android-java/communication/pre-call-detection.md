# 通话前网络/设备检测

---

## 功能简介

为了保证实时通话体验，通话前可以进行网络与设备的检测，提前识别并解决问题。

- 网络检测：检测网络环境，可用于判断或预测网络环境是否适合推/拉指定码率的流。
- 设备检测：检测本地麦克风、摄像头以及扬声器是否能正常工作。

本文将介绍如何使用 ZEGO SDK 接口，实现上述两个角度的检测。


## 前提条件

在实现通话前网络/设备检测功能之前，请确保：

- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppID 和 AppSign，详情请参考 [控制台 - 项目信息](/console/project-info)。
- 已在项目中集成 ZEGO Express SDK，并实现了基本的音视频推拉流功能，详情请参考 [快速开始 - 集成](https://doc-zh.zego.im/article/195) 和 [快速开始 - 实现流程](https://doc-zh.zego.im/article/7627)。



## 网络检测

请参考 [网络与性能](/real-time-video-android-java/communication/testing-network) 进行操作。


## 设备检测


### 麦克风检测

#### 检测逻辑

麦克风设备检测流程如下图所示：

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Common/ZegoExpressEngine/Microphone_detection.png" /></Frame>


#### 对应接口

**1. 启动麦克风**

调用 [startPreview](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Java_android~class~im-zego-zegoexpress-zego-express-engine&jumpType=route#start-preview) 接口在不推流的情况下启动音频采集。

```java
engine.startPreview();
```

**2. 检测麦克风权限**

ZEGO SDK 自动检查麦克风权限。
<Warning title="注意">
因为 Android 6.0 在一些比较重要的权限上要求必须申请动态权限，不能只通过 "AndroidMainfest.xml" 文件申请静态权限。因此还需要参考执行如下代码，其中 "requestPermissions" 是 "Activity" 的方法。
</Warning>

```java
String[] permissionNeeded = {
    "android.permission.RECORD_AUDIO"};

if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
    if (ContextCompat.checkSelfPermission(this, "android.permission.RECORD_AUDIO") != PackageManager.PERMISSION_GRANTED) {
        //101 为 requestCode，可以是任何大于 0 的数字，会透传到权限请求结果回调 onRequestPermissionsResult
        requestPermissions(permissionNeeded, 101);
    }
}
```

**3. 检测麦克风是否可用**


通过如下回调检测设备是否异常，若未检测到任何异常反馈（可同步启动 "4. 检测麦克风收音数据"），且麦克风收音数据检测正常，则麦克风设备可用。

- 2.15.0 及以后版本：监听 [onLocalDeviceExceptionOccurred](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~IZegoEventHandler#on-local-device-exception-occurred) 回调检测设备是否异常。
- 2.15.0 之前版本：监听 `onDeviceError` 回调检测设备是否异常。

<CodeGroup>
```java title="2.15.0 及以后版本"
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
public void onLocalDeviceExceptionOccurred(ZegoDeviceExceptionType exceptionType, ZegoDeviceType deviceType, String deviceID){

}
```

```java title="2.15.0 之前版本"
/**
* 音视频设备错误通知。
* @param deviceName 设备类型名称。
* @param errorCode 错误码，请参考常见错误码：/real-time-video-android-java/client-sdk/error-code#7。
*/
void onDeviceError(String deviceName, int errorCode);
```
</CodeGroup>


**4. 检测麦克风收音数据**

调用 [startSoundLevelMonitor](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Java_android~class~im-zego-zegoexpress-zego-express-engine&jumpType=route#start-sound-level-monitor) 接口获取麦克风采集到声音的能量值，如果数据无异常则麦克风正常，可用于通话。

```java
engine.startSoundLevelMonitor();
```


### 摄像头检测

#### 检测逻辑

摄像头设备检测流程如下图所示：

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Common/ZegoExpressEngine/Camera_detection.png" /></Frame>


#### 对应接口

**1. 启动摄像头**

调用 [startPreview](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Java_android~class~im-zego-zegoexpress-zego-express-engine&jumpType=route#start-preview) 接口绑定摄像头预览画面的视图，在不推流的情况下启动视频采集并预览。

```java
engine.startPreview();
```

**2. 检测摄像头权限**

ZEGO SDK 会自动检查摄像头权限。
<Warning title="注意">
因为 Android 6.0 在一些比较重要的权限上要求必须申请动态权限，不能只通过 "AndroidMainfest.xml" 文件申请静态权限。因此还需要参考执行如下代码，其中 "requestPermissions" 是 "Activity" 的方法。
</Warning>

```java
String[] permissionNeeded = {
    "android.permission.CAMERA"};

if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
    if (ContextCompat.checkSelfPermission(this, "android.permission.CAMERA") != PackageManager.PERMISSION_GRANTED) {
        //101 为 requestCode，可以是任何大于 0 的数字，会透传到权限请求结果回调 onRequestPermissionsResult
        requestPermissions(permissionNeeded, 101);
    }
}
```

**3. 检测摄像头是否可用**


通过如下回调检测设备是否异常，若未检测到任何异常反馈（可同步启动"4. 检测画面是否正常"），且画面显示正常，则设备可用。

- 2.15.0 及以后版本：监听 [onLocalDeviceExceptionOccurred](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~IZegoEventHandler#on-local-device-exception-occurred) 回调检测设备是否异常。
- 2.15.0 之前版本：监听 `onDeviceError` 回调检测设备是否异常。

<CodeGroup>
  ```java title="2.15.0 及以后版本"
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
public void onLocalDeviceExceptionOccurred(ZegoDeviceExceptionType exceptionType, ZegoDeviceType deviceType, String deviceID){

}
```

  ```java title="2.15.0 之前版本"
/**
* 音视频设备错误通知。
* @param deviceName 设备类型名称。
* @param errorCode 错误码，请参考常见错误码：/real-time-video-android-java/client-sdk/error-code#7。
*/
void onDeviceError(String deviceName, int errorCode);
```
</CodeGroup>


**4. 检测画面是否正常**

若此时画面显示正常，则摄像头正常，可用于通话。


### 扬声器检测

#### 检测逻辑

播放设备检测流程如下图所示：

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Common/ZegoExpressEngine/Playback_device_detection.png" /></Frame>


#### 对应接口

**1. 使用媒体播放器播放音频文件**

调用 [ZegoMediaPlayer](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Java_android~class~im-zego-zegoexpress-zego-media-player&jumpType=route) 接口播放您用于测试的音频文件。

```java
// 1. 创建播放器对象。
ZegoMediaPlayer mediaPlayer = engine.createMediaPlayer();
// 2. 加载资源。
String resourcePath = "xxx";
mediaPlayer.loadResource(resourcePath, null);
// 3. 播放资源。
mediaPlayer.start();
```

**2. 检测是否听到声音**

如果可以听到相应的音频，则播放设备正常，可用于通话。调用 [onMediaPlayerStateUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Java_android~class~im-zego-zegoexpress-callback-i-zego-media-player-event-handler&jumpType=route#on-media-player-state-update) 回调查看播放器状态回调：

```java
/**
* 播放器播放状态回调。
* @param mediaPlayer 回调的播放器实例。
* @param state 播放器状态。
* @param errorCode 错误码，详情请参考常见错误码文档：/real-time-video-android-java/client-sdk/error-code#7。
*/
public void onMediaPlayerStateUpdate(ZegoMediaPlayer mediaPlayer, ZegoMediaPlayerState state, int errorCode){}
```
