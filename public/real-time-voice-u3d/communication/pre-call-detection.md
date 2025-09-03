# 通话前检测

---

## 功能简介

为了保证实时通话体验，通话前可以对设备进行检测，提前识别并排查问题。

设备检测主要是检测本地麦克风、摄像头以及扬声器是否能正常工作。

本文将介绍如何使用 ZEGO SDK 接口，实现设备检测。

<Warning title="注意">

本功能不支持在 WebGL 环境中运行使用。
</Warning>

## 前提条件

在实现通话前设备检测功能之前，请确保：

- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppID 和 AppSign，详情请参考 [控制台 - 项目信息](/console/project-info)。
- 已在项目中集成 ZEGO Express SDK，并实现了基本的音视频推拉流功能，详情请参考 [快速开始 - 集成](https://doc-zh.zego.im/article/13242) 和 [快速开始 - 实现流程](https://doc-zh.zego.im/article/13243)。



## 设备检测

### 麦克风检测

#### 检测逻辑

麦克风设备检测流程如下图所示：

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Common/ZegoExpressEngine/Microphone_detection.png" /></Frame>


#### 对应接口

**1. 启动麦克风**

调用 [StartPreview](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~ZegoExpressEngine#start-preview) 接口在不推流的情况下启动音频采集。

```cs
engine.StartPreview();
```

**2. 检测麦克风权限**

ZEGO SDK 会自动检查麦克风权限。如果用户未授权，则会请求用户同意；如果用户拒绝，则需要用户手动去系统设置里开启权限。


**3. 检测麦克风是否可用**

通过如下回调检测设备是否异常，若未检测到任何异常反馈（可同步启动 “4. 检测麦克风收音数据”），且麦克风收音数据检测正常，则麦克风设备可用。

- 2.15.0 及以后版本：监听 [OnLocalDeviceExceptionOccurred](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~IZegoEventHandler#on-local-device-exception-occurred) 回调检测设备是否异常。
- 2.15.0 之前版本：监听 `OnDeviceError` 回调检测设备是否异常。

<CodeGroup>
```cs title="2.15.0 及以后版本"
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
public delegate void OnLocalDeviceExceptionOccurred(ZegoDeviceExceptionType exceptionType,ZegoDeviceType deviceType,string deviceID);
```

 ```cs title="2.15.0 之前版本"
 /**
  * 设备异常通知
  * @param errorCode 设备异常的错误码，请参考常见错误码文档：/real-time-video-u3d-cs/client-sdk/error-code#7
  * @param deviceName 设备名称
  */
 public delegate void OnDeviceError(int errorCode,string deviceName);
 ```
</CodeGroup>


**4. 检测麦克风收音数据**

调用 [StartSoundLevelMonitor](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~ZegoExpressEngine#start-sound-level-monitor) 接口获取麦克风采集到声音的能量值，如果数据无异常则麦克风正常，可用于通话。

```cs
engine.StartSoundLevelMonitor();
```

### 摄像头检测

<Warning title="注意">



仅接入实时语音 SDK 或者纯音频场景时，不需要进行摄像头检测，可忽略此章节。

</Warning>



#### 检测逻辑

摄像头设备检测流程如下图所示：

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Common/ZegoExpressEngine/Camera_detection.png" /></Frame>


#### 对应接口

**1. 启动摄像头**

调用 [StartPreview](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~ZegoExpressEngine#start-preview) 接口绑定摄像头预览画面的视图（详情请参考 [启用本地预览](/real-time-video-u3d-cs/quick-start/implementing-video-call#推流)），在不推流的情况下启动视频采集并预览。

```cs
engine.StartPreview();
```

**2. 检测摄像头权限**

ZEGO SDK 会自动检查摄像头权限。如果用户未授权，则会请求用户同意；如果用户拒绝，则需要用户手动去系统设置里开启权限。



**3. 检测摄像头是否可用**


通过如下回调检测设备是否异常，若未检测到任何异常反馈（可同步启动 “4. 检测画面是否正常”），且画面显示正常，则设备可用。

- 2.15.0 及以后版本：监听 [OnLocalDeviceExceptionOccurred](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~IZegoEventHandler#on-local-device-exception-occurred) 回调检测设备是否异常。
- 2.15.0 之前版本：监听 `OnDeviceError` 回调检测设备是否异常。

<CodeGroup>
```cs title="2.15.0 及以后版本"
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
public delegate void OnLocalDeviceExceptionOccurred(ZegoDeviceExceptionType exceptionType,ZegoDeviceType deviceType,string deviceID);
```

```cs title="2.15.0 之前版本"
/**
* 设备异常通知
* @param errorCode 设备异常的错误码，请参考常见错误码文档：/real-time-video-u3d-cs/client-sdk/error-code#7
* @param deviceName 设备名称
*/
public delegate void OnDeviceError(int errorCode,string deviceName);
```
</CodeGroup>

**4. 检测画面是否正常**

若此时画面显示正常，则摄像头正常，可用于通话。


### 扬声器检测

#### 检测逻辑

播放设备检测流程如下图所示：

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Common/ZegoExpressEngine/Playback_device_detection.png" /></Frame>


#### 对应接口

**1. 使用音效播放器播放音频文件**

调用 [ZegoAudioEffectPlayer](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~ZegoAudioEffectPlayer) 接口播放您用于测试的音频文件。

```cs
// 1. 创建音效播放器
ZegoAudioEffectPlayer audioEffectPlayer= engine.CreateAudioEffectPlayer();
// 2. 加载资源
string currentSelectPath = "xxx";
audioEffectPlayer.LoadResource(1, currentSelectPath, (errorCode) =>
{
    Debug.Log("LoadResource errorCode:" + errorCode);
});
// 3. 播放资源
audioEffectPlayer.Start(1, currentSelectPath, null);
```

**2. 检测是否听到声音**

如果可以听到相应的音频，则播放设备正常，可用于通话。调用 [OnAudioEffectPlayStateUpdate](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~cs_unity3d~class~IZegoAudioEffectPlayerHandler#on-audio-effect-play-state-update) 回调查看音效播放器状态：

```cs
/**
 * 音效播放状态回调。
 *
 * 支持版本：1.16.0 及以后。
 * 详情描述：当音效播放器的某条音效的播放状态改变时会触发此回调。
 * 通知时机：当音效的播放状态变化时会触发这个回调。
 * 使用限制：无。
 *
 * @param audioEffectPlayer 触发此次回调的音效播放器实例。
 * @param audioEffectID 触发此次回调的音效资源的 ID。
 * @param state 音效的播放状态。
 * @param errorCode 错误码，详情请参考 常见错误码文档 https://doc-zh.zego.im/real-time-video-android-java/client-sdk/error-code.html 。
 */
public delegate void OnAudioEffectPlayStateUpdate(ZegoAudioEffectPlayer audioEffectPlayer, uint audioEffectID, ZegoAudioEffectPlayState state, int errorCode);
```

<Content />


