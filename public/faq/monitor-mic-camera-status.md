<Title>如何监听房间内用户的麦克风和摄像头状态？</Title>



- - -

## 简介
在某些场景中，开发者需要根据监听房间内用户的麦克风和摄像头状态来判断远端推流设备是否正常工作，以及根据相应的 `state` 码初步了解设备出现问题的原因。

## 实现方法

<Warning title="注意">


在监听设备状态功能之前，请确保实现基本的实时音视频功能。详情请参考：[快速开始 - 实现流程](/real-time-video-android-java/quick-start/implementing-video-call)  

</Warning>



ZEGO Express SDK 提供 `onRemoteMicStateUpdate` 和 `onRemoteCameraStateUpdate` 两个回调用于监听远端摄像头和麦克风的状态变化，通过此回调。

## 示例代码
```objc
// Objective-C
- (void)onRemoteMicStateUpdate:(ZegoRemoteDeviceState) state streamID:(NSString *) streamID;
- (void)onRemoteCameraStateUpdate:(ZegoRemoteDeviceState) state streamID:(NSString *) streamID;
```

```java
// Java
public void onRemoteMicStateUpdate (String streamID, ZegoRemoteDeviceState state);
public void onRemoteCameraStateUpdate (String streamID, ZegoRemoteDeviceState state);
```

```cpp
// cpp
public:
    void onRemoteMicStateUpdate(std::string streamID, ZegoRemoteDeviceState state) override;
    void onRemoteCameraStateUpdate(std::string streamID, ZegoRemoteDeviceState state) override;
```

```dart
// dart
ZegoExpressEngine.onRemoteMicStateUpdate = (String streamID, ZegoRemoteDeviceState state) {
  // 
};
ZegoExpressEngine.onRemoteCameraStateUpdate= (String streamID, ZegoRemoteDeviceState state) {
  // 
};
```

```
// c#
public delegate void OnRemoteMicStateUpdate(string streamID, ZegoRemoteDeviceState state);
public delegate void OnRemoteCameraStateUpdate(string streamID, ZegoRemoteDeviceState state);
```

```TypeScript
// TypeScript
onRemoteMicStateUpdate?(streamID: string, state: zego.ZegoRemoteDeviceState): void
onRemoteCameraStateUpdate?(streamID: string, state: zego.ZegoRemoteDeviceState): void
```

#### 注意事项

<Warning title="注意">


1. 当从 CDN 地址拉流时，不会收到以上的回调
2. 如果用户使用了自定义音频采集，不会收到 Mic 相关的回调。

</Warning>






## API 参考
- Objective-C
    - [onRemoteMicStateUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~ObjectiveC~protocol~zego-event-handler#on-remote-mic-state-update-stream-id)
    - [onRemoteCameraStateUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~ObjectiveC~protocol~zego-event-handler#on-remote-camera-state-update-stream-id)
- Java
    - [onRemoteMicStateUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Java~class~im-zego-zegoexpress-callback-i-zego-event-handler#on-remote-mic-state-update)
    - [onRemoteCameraStateUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Java~class~im-zego-zegoexpress-callback-i-zego-event-handler#on-remote-camera-state-update)
