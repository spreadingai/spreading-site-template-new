# 设备检测

---

## 功能简介

为了保证实时通信体验，通话或直播前可以进行设备检测，提前识别并排查问题。设备检测主要是检测本地麦克风、摄像头以及扬声器是否能正常工作。   


## 前提条件

在实现设备检测功能之前，请确保：

- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppID 和 AppSign，详情请参考 [控制台 - 项目信息](https://doc-zh.zego.im/article/12107)。
- 已在项目中集成 ZEGO Express SDK，并实现了基本的音视频推拉流功能，详情请参考 [快速开始 - 集成](https://doc-zh.zego.im/article/13413) 和 [快速开始 - 实现流程](https://doc-zh.zego.im/article/13415)。



## 使用步骤


### 麦克风检测

#### 检测逻辑

麦克风设备检测流程如下图所示：

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Common/ZegoExpressEngine/Microphone_detection.png" /></Frame>


#### 对应接口

**1. 启动麦克风**

调用 [startPreview](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~ObjectiveC_ios~class~zego-express-engine&jumpType=route#start-preview) 接口在不推流的情况下启动音频采集。

```objc
[[ZegoExpressEngine sharedEngine] startPreview:nil];
```

**2. 检测麦克风权限**

ZEGO SDK 会自动检查麦克风权限。如果用户未授权，则会请求用户同意；如果用户拒绝，则需要用户手动去系统设置里开启权限。   


**3. 检测麦克风是否可用**

通过如下回调检测设备是否异常，若未检测到任何异常反馈（可同步启动 “4. 检测麦克风收音数据”），且麦克风收音数据检测正常，则麦克风设备可用。

监听 [onLocalDeviceExceptionOccurred](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~protocol~ZegoEventHandler#on-local-device-exception-occurred-device-type-device-id) 回调检测设备是否异常。


```objc
/// 本地设备异常通知
///
/// 支持版本：1.0.0 及以上。
/// 详情描述：本地设备异常。
/// 通知时机：当本地音频或视频设备功能出现异常时会触发此回调。
///
/// @param exceptionType 设备异常类型。
/// @param deviceType 发生异常的设备类型。
/// @param deviceID 设备 ID。目前仅支持桌面端设备，用于标识具体的设备；对于移动端设备，此参数将返回空字符串。
- (void)onLocalDeviceExceptionOccurred:(ZegoDeviceExceptionType)exceptionType deviceType:(ZegoDeviceType)deviceType deviceID:(NSString *)deviceID;
```

**4. 检测麦克风收音数据**

调用 [startSoundLevelMonitor](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~ObjectiveC_ios~class~zego-express-engine&jumpType=route#start-sound-level-monitor) 接口获取麦克风采集到声音的能量值，如果数据无异常则麦克风正常，可用于通话或直播。

```objc
[[ZegoExpressEngine sharedEngine] startSoundLevelMonitor];
```

### 摄像头检测

#### 检测逻辑

摄像头设备检测流程如下图所示：

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Common/ZegoExpressEngine/Camera_detection.png" /></Frame>

#### 对应接口

**1. 启动摄像头**

调用 [startPreview](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~ObjectiveC_ios~class~zego-express-engine&jumpType=route#start-preview) 接口绑定摄像头预览画面的视图，在不推流的情况下启动视频采集并预览。

```objc
ZegoCanvas *previewCanvas = [ZegoCanvas canvasWithView:self.previewView];
[[ZegoExpressEngine sharedEngine] startPreview:previewCanvas];
```

**2. 检测摄像头权限**

ZEGO SDK 会自动检查摄像头权限。如果用户未授权，则会请求用户同意；如果用户拒绝，则需要用户手动去系统设置里开启权限。


**3. 检测摄像头是否可用**


通过如下回调检测设备是否异常，若未检测到任何异常反馈（可同步启动“4. 检测画面是否正常”），且画面显示正常，则设备可用。

监听 [onLocalDeviceExceptionOccurred](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~protocol~ZegoEventHandler#on-local-device-exception-occurred-device-type-device-id) 回调检测设备是否异常。


```objc
//// 本地设备异常通知
///
/// 支持版本：1.0.0 及以上。
/// 详情描述：本地设备异常。
/// 通知时机：当本地音频或视频设备功能出现异常时会触发此回调。
///
/// @param exceptionType 设备异常类型。
/// @param deviceType 发生异常的设备类型。
/// @param deviceID 设备 ID。目前仅支持桌面端设备，用于标识具体的设备；对于移动端设备，此参数将返回空字符串。
- (void)onLocalDeviceExceptionOccurred:(ZegoDeviceExceptionType)exceptionType deviceType:(ZegoDeviceType)deviceType deviceID:(NSString *)deviceID;
```


**4. 检测画面是否正常**

若此时画面显示正常，则摄像头正常，可用于通话或直播。

### 扬声器检测

#### 检测逻辑

播放设备检测流程如下图所示：

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Common/ZegoExpressEngine/Playback_device_detection.png" /></Frame>

#### 对应接口

**1. 使用媒体播放器播放音频文件** 

调用 [ZegoMediaPlayer](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~ObjectiveC_ios~class~zego-media-player&jumpType=route) 接口播放您用于测试的音频文件。

```objc
/// 1. 创建媒体播放器
ZegoMediaPlayer *mediaPlayer = [[ZegoExpressEngine sharedEngine] createMediaPlayer];
/// 2. 加载媒体资源
NSString *resourcePath = "xxx";
[mediaPlayer loadResource: resourcePath callback:^(int errorCode) {
    NSLog(@"Media Player load resource. errorCode: %d", errorCode);
}];
/// 3. 开始播放媒体
[mediaPlayer start];
```

**2. 检测是否听到声音**

如果可以听到相应的音频，则播放设备正常，可用于通话或直播。调用 [mediaPlayer:stateUpdate:errorCode:](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~ObjectiveC~protocol~zego-media-player-event-handler#media-player-state-update-error-code) 接口查看媒体播放器状态：

```objc
/// 播放器播放状态回调
/// @param mediaPlayer 回调的播放器实例
/// @param state 播放器状态
/// @param errorCode 错误码，详情请参考常用错误码文档
- (void)mediaPlayer:(ZegoMediaPlayer *)mediaPlayer stateUpdate:(ZegoMediaPlayerState)state errorCode:(int)errorCode;
```


## API 参考列表

| 方法 | 描述 |
|----|----|
|[startPreview](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~ObjectiveC_ios~class~zego-express-engine&jumpType=route#start-preview)|启动本地预览|
|[onLocalDeviceExceptionOccurred](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~protocol~ZegoEventHandler#on-local-device-exception-occurred-device-type-device-id)|本地设备异常通知|
|[startSoundLevelMonitor](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~ObjectiveC_ios~class~zego-express-engine&jumpType=route#start-sound-level-monitor)|启动声浪监控|
|[mediaPlayer:stateUpdate:errorCode:](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~ObjectiveC~protocol~zego-media-player-event-handler#media-player-state-update-error-code)|播放器播放状态回调|


## 常见错误码

当开发者收到 [onLocalDeviceExceptionOccurred](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~protocol~ZegoEventHandler#on-local-device-exception-occurred-device-type-device-id) 设备回调不为 0 时，相关的错误码请参考 [常见错误码](https://doc-zh.zego.im/article/13784)。
