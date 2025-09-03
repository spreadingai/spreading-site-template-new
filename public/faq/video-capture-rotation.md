<Title>如何自定义视频采集旋转方式？</Title>



- - -

本文将为您介绍如何自定义视频采集旋转方式。

<Warning title="注意">


对于 v2.23.0 及以后版本，如需自定义视频采集旋转方式，为避免与其他视频朝向模式冲突，请勿调用 [setAppOrientationMode|\blank](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoExpressEngine#set-app-orientation-mode) 设置除自定义模式外的模式。 

</Warning>





## 概述

如您想在移动端视频通话或直播时实现自定义的画面旋转表现，可参考以下三种常见实现方式：

- 固定竖屏
- 固定横屏
- 横竖屏自动切换

<Note title="说明">


以下示例中“拉流端”渲染画面的模式以默认的 “ZegoViewModeAspectFit”（等比缩放，可能有黑边）方式，具体请参考 [ZegoViewMode](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~enum~ZegoViewMode)。

</Note>



**固定竖屏**：表示推流端固定采集以竖屏方式展示的视频，此时当对端设备方向为竖屏时，观看到的画面为充满设备屏幕的竖屏效果。当对端设备方向为横屏时，观看到的画面为相对推流端图像有一定旋转角度的效果（下图以逆时针旋转 90 度为例）。

- 如果设备的旋转方向锁定：
    <Frame width="512" height="auto" caption=""><Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Android/Video-rotation/Fixed_portrait_screen.png" /></Frame></Frame>
- 如果设备的旋转方向不锁定：
    <Frame width="512" height="auto" caption=""><Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Android/Video-rotation/Fixed_portrait_screen_noUI.png" /></Frame></Frame>

**固定横屏**：表示推流端固定采集以横屏方式展示的视频，此时当对端设备方向为横屏时，观看到的画面为充满设备屏幕的横屏效果。当对端设备方向为竖屏时，观看到的画面为相对推流端图像有一定旋转角度的效果（下图以逆时针旋转 90 度为例）。

- 如果设备的旋转方向锁定：
    <Frame width="512" height="auto" caption=""><Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Android/Video-rotation/Fixed_horizontal_screen.png" /></Frame></Frame>
- 如果设备的旋转方向不锁定：
    <Frame width="512" height="auto" caption=""><Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Android/Video-rotation/Fixed_horizontal_screen_noUI.png" /></Frame></Frame>

**横竖屏自动切换**：提供视频旋转功能，用户可以根据需要将视频相比于手机正立的方向逆时针旋转 90，180 或 270 度。便于用户结合视频场景需要，获取想要的视频渲染效果。视频旋转后会自动进行调整，以适配编码后的图像分辨率。
<Frame width="512" height="auto" caption=""><Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Android/Video-rotation/Switch_between_horizontal_and_portrait_01.png" /></Frame></Frame>
<Frame width="512" height="auto" caption=""><Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Android/Video-rotation/Switch_between_horizontal_and_portrait_02.png" /></Frame></Frame>

以上三种方式调用的接口存在差异，详细描述请参考本文的 [实现流程](/faq/express_video_capture_rotation#4)。

## 示例源码下载

请参考 [下载示例源码](http://doc-zh.zego.im/article/3126) 获取源码。

相关源码请查看 “/ZegoExpressExample/Examples/CommonFeatures/VideoRotation” 目录下的文件。

## 前提条件

在实现视频采集旋转之前，请确保：

- 已在项目中集成 ZEGO Express SDK，实现基本的实时音视频功能，详情请参考 [快速开始 - 集成](/real-time-video-android-java/quick-start/integrating-sdk) 和 [快速开始 - 实现视频通话](/real-time-video-android-java/quick-start/implementing-video-call)。
- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppID 和 AppSign，详情请参考 [控制台 - 项目管理](/console/project-info) 中的“项目信息”。

## 实现流程

### 固定竖屏

#### iOS

使用竖屏直播或视频通话时，宽的分辨率应比高的分辨率小，假设为 “360 × 640”，则需要通过如下步骤实现功能。

1. 调用 [createEngine ](https://doc-zh.zego.im/zh/api?doc=Express_Video_SDK_API~ObjectiveC~class~zego-express-engine#create-engine-with-app-id-app-sign-is-test-env-scenario-event-handler) 接口创建 SDK 引擎实例，详情请参考 [快速开始 - 实现流程](/real-time-video-ios-oc/quick-start/implementing-video-call#1-初始化) 的 “创建引擎”。

```objc
ZegoEngineProfile *profile = [[ZegoEngineProfile alloc] init];
// 请通过官网注册获取，格式为：1234567890
profile.appID = appID; 
// 请通过官网注册获取
profile.appSign = appSign; 
//通用场景接入，请根据实际情况选择合适的场景
profile.scenario = ZegoScenarioDefault; 
// 创建引擎，并注册 self 为 eventHandler 回调。不需要注册回调的话，eventHandler 参数可以传 nil，后续可调用 "-setEventHandler:" 方法设置回调
[ZegoExpressEngine createEngineWithProfile:profile eventHandler:self];
```

2. （可选）调用 [setVideoConfig ](https://doc-zh.zego.im/zh/api?doc=Express_Video_SDK_API~ObjectiveC~class~zego-express-engine#set-video-config) 接口设置编码分辨率，默认值为 “360 × 640”, 可以根据需要调整，若保持默认值则跳过此步骤。
竖屏直播的分辨率设置如下：

```objc
ZegoVideoConfig *videoConfig = [[ZegoVideoConfig alloc] init];
videoConfig.encodeResolution = CGSizeMake(360, 640);
[[ZegoExpressEngine sharedEngine] setVideoConfig:videoConfig];
```

3. 调用 [loginRoom ](https://doc-zh.zego.im/zh/api?doc=Express_Video_SDK_API~ObjectiveC~class~zego-express-engine#login-room-user) 接口登录房间，详情请参考 [快速开始 - 实现流程](/real-time-video-ios-oc/quick-start/implementing-video-call#2-登录房间) 的 “登录房间”。

```objc
ZegoUser *user = [ZegoUser userWithUserID:@"test_userid"];
[[ZegoExpressEngine sharedEngine] loginRoom:@"test_roomid" user:user];
```

4. 调用 [startPreview ](https://doc-zh.zego.im/zh/api?doc=Express_Video_SDK_API~ObjectiveC~class~zego-express-engine#start-preview) 接口启动本地预览，用于显示本地画面。previewView 为 UIView（iOS）或 NSView（macOS）。

```objc
ZegoCanvas *previewCanvas = [ZegoCanvas canvasWithView:previewView];
[[ZegoExpressEngine sharedEngine] startPreview:previewCanvas]；
```

5. 调用 [startPublishingStream ](https://doc-zh.zego.im/zh/api?doc=Express_Video_SDK_API~ObjectiveC~class~zego-express-engine#start-publishing-stream) 接口开始推流，将本地的音视频流推送到实时音视频云，详情请参考 [快速开始 - 实现流程](/real-time-video-ios-oc/quick-start/implementing-video-call#3-预览自己的画面并推送到-zego-音视频云) 的 “推流”。

```objc
[[ZegoExpressEngine sharedEngine] startPublishingStream:@"test_streamid"];
```

6. 使用固定的竖屏方式进行直播或视频通话。

#### Android

使用竖屏直播或视频通话时，宽的分辨率应比高的分辨率小，假设为 “360 × 640”，则需要通过如下步骤实现功能。

1. 调用 [createEngine ](https://doc-zh.zego.im/zh/api?doc=Express_Video_SDK_API~Java~class~im-zego-zegoexpress-zego-express-engine#create-engine) 接口创建 SDK 引擎实例，详情请参考 [快速开始 - 实现流程](/real-time-video-android-java/quick-start/implementing-video-call#初始化) 的 “创建引擎”。


```Java
// 创建引擎，通用场景接入，并注册 self 为 eventHandler 回调
// 不需要注册回调的话，eventHandler 参数可以传 null，后续可调用 "setEventHandler:" 方法设置回调
ZegoEngineProfile profile = new ZegoEngineProfile();
profile.appID = ;  // 请通过官网注册获取，格式为：1234567890L
profile.appSign = ;  // 请通过官网注册获取，格式为："1234567890"
profile.scenario = ZegoScenario.DEFAULT;  // 通用场景接入，请根据实际情况选择合适的场景
profile.application = getApplication();
engine = ZegoExpressEngine.createEngine(profile, null);
```

2. （可选）调用 [setVideoConfig ](https://doc-zh.zego.im/zh/api?doc=Express_Video_SDK_API~Java~class~im-zego-zegoexpress-zego-express-engine#set-video-config) 接口设置编码分辨率，默认值为 “360 × 640”, 可以根据需要调整，若保持默认值则跳过此步骤。

```java
ZegoVideoConfig config = new ZegoVideoConfig();
```

竖屏直播的分辨率设置如下：

```java
config.setEncodeResolution(360, 640);
ZegoExpressEngine.getEngine().setVideoConfig(config);
```

3. 调用 [loginRoom](https://doc-zh.zego.im/zh/api?doc=Express_Video_SDK_API~Java~class~im-zego-zegoexpress-zego-express-engine#login-room) 接口登录房间，详情请参考 [快速开始 - 实现流程](/real-time-video-android-java/quick-start/implementing-video-call#登录房间) 的 “登录房间”。

```java
ZegoExpressEngine.getEngine().loginRoom("test_roomid", new ZegoUser("test_userid"), null);
```

4. 调用 [startPreview ](https://doc-zh.zego.im/zh/api?doc=Express_Video_SDK_API~Java~class~im-zego-zegoexpress-zego-express-engine#start-preview) 接口启动本地预览，用于显示本地画面。textureViewLocalPreview 为布局上的 TextureView 对象。

```java
ZegoExpressEngine.getEngine().startPreview(new ZegoCanvas(textureViewLocalPreview));
```

5. 调用 [startPublishingStream ](https://doc-zh.zego.im/zh/api?doc=Express_Video_SDK_API~Java~class~im-zego-zegoexpress-zego-express-engine#start-publishing-stream) 接口开始推流，将本地的音视频流推送到实时音视频云，详情请参考 [快速开始 - 实现流程](/real-time-video-android-java/quick-start/implementing-video-call#预览自己的画面并推送到-zego-音视频云) 的 “推流”。

```java
ZegoExpressEngine.getEngine().startPublishingStream("test_streamid");
```

6. 使用固定的竖屏方式进行直播或视频通话。

### 固定横屏

#### iOS

使用横屏直播或视频通话时，宽的分辨率应比高的分辨率大，假设为 “640 × 360”，则需要通过如下步骤实现功能。

1. 调用 [createEngine ](https://doc-zh.zego.im/zh/api?doc=Express_Video_SDK_API~ObjectiveC~class~zego-express-engine#create-engine-with-app-id-app-sign-is-test-env-scenario-event-handler) 接口创建 SDK 引擎实例，详情请参考 [快速开始 - 实现流程](/real-time-video-ios-oc/quick-start/implementing-video-call#1-初始化) 的 “创建引擎”。


```objc
ZegoEngineProfile *profile = [[ZegoEngineProfile alloc] init];
// 请通过官网注册获取，格式为：1234567890
profile.appID = appID; 
// 请通过官网注册获取
profile.appSign = appSign; 
//通用场景接入，请根据实际情况选择合适的场景
profile.scenario = ZegoScenarioDefault; 
// 创建引擎，并注册 self 为 eventHandler 回调。不需要注册回调的话，eventHandler 参数可以传 nil，后续可调用 "-setEventHandler:" 方法设置回调
[ZegoExpressEngine createEngineWithProfile:profile eventHandler:self];
```

2. 调用 [setVideoConfig ](https://doc-zh.zego.im/zh/api?doc=Express_Video_SDK_API~ObjectiveC~class~zego-express-engine#set-video-config) 接口设置编码分辨率为 “640 × 360”。

横屏直播的分辨率设置如下：

```objc
ZegoVideoConfig *videoConfig = [[ZegoVideoConfig alloc] init];
videoConfig.encodeResolution = CGSizeMake(640, 360);
[[ZegoExpressEngine sharedEngine] setVideoConfig:videoConfig];
```

3. 调用 [setAppOrientation](https://doc-zh.zego.im/zh/api?doc=Express_Video_SDK_API~ObjectiveC~class~zego-express-engine#set-app-orientation) 接口设置视频的朝向，若逆时针旋转 90 度，则如下接口传参为 UIInterfaceOrientationLandscapeLeft。若顺时针旋转 90 度，则传参为 UIInterfaceOrientationLandscapeRight。

```objc
[[ZegoExpressEngine sharedEngine] setAppOrientation:UIInterfaceOrientationLandscapeLeft];
```

4. 调用 [loginRoom ](https://doc-zh.zego.im/zh/api?doc=Express_Video_SDK_API~ObjectiveC~class~zego-express-engine#login-room-user) 接口登录房间，详情请参考 [快速开始 - 实现流程](/real-time-video-ios-oc/quick-start/implementing-video-call#2-登录房间) 的 “登录房间”。

```objc
ZegoUser *user = [ZegoUser userWithUserID:@"test_userid"];
[[ZegoExpressEngine sharedEngine] loginRoom:@"test_roomid" user:user];
```

5. 调用 [startPreview ](https://doc-zh.zego.im/zh/api?doc=Express_Video_SDK_API~ObjectiveC~class~zego-express-engine#start-preview) 接口启动本地预览，用于显示本地画面。previewView 为 UIView（iOS）或 NSView（macOS）。

```objc
ZegoCanvas *previewCanvas = [ZegoCanvas canvasWithView:previewView];
[[ZegoExpressEngine sharedEngine] startPreview:previewCanvas]；
```

6. 调用 [startPublishingStream ](https://doc-zh.zego.im/zh/api?doc=Express_Video_SDK_API~ObjectiveC~class~zego-express-engine#start-publishing-stream) 接口开始推流，将本地的音视频流推送到实时音视频云，详情请参考 [快速开始 - 实现流程](/real-time-video-ios-oc/quick-start/implementing-video-call#3-预览自己的画面并推送到-zego-音视频云) 的 “推流”。

```objc
[[ZegoExpressEngine sharedEngine] startPublishingStream:@"test_streamid"];
```

7. 使用固定的横屏方式进行直播或视频通话。


#### Android

使用横屏直播或视频通话时，宽的分辨率应比高的分辨率大，假设为 “640 × 360”，则需要通过如下步骤实现功能。

1. 调用 [createEngine ](https://doc-zh.zego.im/zh/api?doc=Express_Video_SDK_API~Java~class~im-zego-zegoexpress-zego-express-engine#create-engine) 接口创建 SDK 引擎实例，详情请参考 [快速开始 - 实现流程](/real-time-video-android-java/quick-start/implementing-video-call#初始化) 的 “创建引擎”。


```Java
// 创建引擎，通用场景接入，并注册 self 为 eventHandler 回调
// 不需要注册回调的话，eventHandler 参数可以传 null，后续可调用 "setEventHandler:" 方法设置回调
ZegoEngineProfile profile = new ZegoEngineProfile();
profile.appID = ;  // 请通过官网注册获取，格式为：1234567890L
profile.appSign = ;  // 请通过官网注册获取，格式为："1234567890"
profile.scenario = ZegoScenario.DEFAULT;  // 通用场景接入，请根据实际情况选择合适的场景
profile.application = getApplication();
engine = ZegoExpressEngine.createEngine(profile, null);
```

2. 调用 [setVideoConfig ](https://doc-zh.zego.im/zh/api?doc=Express_Video_SDK_API~Java~class~im-zego-zegoexpress-zego-express-engine#set-video-config) 接口设置编码分辨率为 “640 × 360”。

```java
ZegoVideoConfig config = new ZegoVideoConfig();
```

横屏直播的分辨率设置如下：

```java
config.setEncodeResolution(640, 360);
ZegoExpressEngine.getEngine().setVideoConfig(config);
```

3. 调用 [setAppOrientation ](https://doc-zh.zego.im/zh/api?doc=Express_Video_SDK_API~Java~class~im-zego-zegoexpress-zego-express-engine#set-app-orientation) 接口设置视频的朝向，若逆时针旋转 90 度，则如下接口传参为 ZegoOrientation.ORIENTATION_90。若顺时针旋转 90 度，则传参为 ZegoOrientation.ORIENTATION_270。

```java
ZegoExpressEngine.getEngine().setAppOrientation(ZegoOrientation.ORIENTATION_90);
```

4. 调用 [loginRoom ](https://doc-zh.zego.im/zh/api?doc=Express_Video_SDK_API~Java~class~im-zego-zegoexpress-zego-express-engine#login-room) 接口登录房间，详情请参考 [快速开始 - 实现流程](/real-time-video-android-java/quick-start/implementing-video-call#登录房间) 的 “登录房间”。

```java
ZegoExpressEngine.getEngine().loginRoom("test_roomid", new ZegoUser("test_userid"), null);
```

5. 调用 [startPreview ](https://doc-zh.zego.im/zh/api?doc=Express_Video_SDK_API~Java~class~im-zego-zegoexpress-zego-express-engine#start-preview) 接口启动本地预览，用于显示本地画面。textureViewLocalPreview 为布局上的 TextureView 对象。

```java
ZegoExpressEngine.getEngine().startPreview(new ZegoCanvas(textureViewLocalPreview));
```

6. 调用 [startPublishingStream ](https://doc-zh.zego.im/zh/api?doc=Express_Video_SDK_API~Java~class~im-zego-zegoexpress-zego-express-engine#start-publishing-stream) 接口开始推流，将本地的音视频流推送到实时音视频云，详情请参考 [快速开始 - 实现流程](/real-time-video-android-java/quick-start/implementing-video-call#预览自己的画面并推送到-zego-音视频云) 的 “推流”。

```java
ZegoExpressEngine.getEngine().startPublishingStream("test_streamid");
```

7. 使用固定的横屏方式进行直播或视频通话。


### 横竖屏自动切换

#### iOS

若直播或视频通话过程中 App 的设置为视频画面根据重力感应的变化而旋转，则需要监听对应平台的屏幕旋转事件，并依此做视频方向的旋转。

当开发者使用 SDK 采集时，横竖屏的切换主要通过 [setVideoConfig](https://doc-zh.zego.im/zh/api?doc=Express_Video_SDK_API~ObjectiveC~class~zego-express-engine#set-video-config) 接口设置编码分辨率，并通过 [setAppOrientation ](https://doc-zh.zego.im/zh/api?doc=Express_Video_SDK_API~ObjectiveC~class~zego-express-engine#set-app-orientation) 接口设置视频朝向。



1. 监听设备方向变化。

```objc
[[UIDevice currentDevice] beginGeneratingDeviceOrientationNotifications];
[[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(orientationChanged:) name:UIDeviceOrientationDidChangeNotification object:[UIDevice currentDevice]];
```

2. 在设备方向变化的回调中修改对应编码分辨率，并设置视频朝向。

```objc
- (void)orientationChanged:(NSNotification *)notification {
    UIDevice *device = notification.object;

    ZegoVideoConfig *videoConfig = [[ZegoExpressEngine sharedEngine] getVideoConfig];
    UIInterfaceOrientation orientation = UIInterfaceOrientationUnknown;

    switch (device.orientation) {
        // Note that UIInterfaceOrientationLandscapeLeft is equal to UIDeviceOrientationLandscapeRight (and vice versa).
        // This is because rotating the device to the left requires rotating the content to the right.
        case UIDeviceOrientationLandscapeLeft:
            orientation = UIInterfaceOrientationLandscapeRight;
            videoConfig.encodeResolution = CGSizeMake(640, 360);
            break;
        case UIDeviceOrientationLandscapeRight:
            orientation = UIInterfaceOrientationLandscapeLeft;
            videoConfig.encodeResolution = CGSizeMake(640, 360);
            break;
        case UIDeviceOrientationPortrait:
            orientation = UIInterfaceOrientationPortrait;
            videoConfig.encodeResolution = CGSizeMake(360, 640);
            break;
        case UIDeviceOrientationPortraitUpsideDown:
            orientation = UIInterfaceOrientationPortraitUpsideDown;
            videoConfig.encodeResolution = CGSizeMake(360, 640);
            break;
        default:
            // Unknown / FaceUp / FaceDown
            break;
    }

    [[ZegoExpressEngine sharedEngine] setVideoConfig:videoConfig];
    [[ZegoExpressEngine sharedEngine] setAppOrientation:orientation];
}
```

当开发者使用 [自定义视频采集](/real-time-video-ios-oc/video/custom-video-capture) 时，监听设备方向变化后，可参考以下两种方式实现横竖屏自动切换：

- 自行处理视频帧数据：在设备方向变化的回调中，对采集到的视频帧数据做旋转处理，再将处理后的数据通过 [sendCustomVideoCapturePixelBuffer](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoExpressEngine#send-custom-video-capture-pixel-buffer-timestamp) 接口传给 SDK。
- 通过 SDK 处理视频帧数据：在设备方向变化的回调中，在将采集到的视频帧数据传给 SDK 之前，根据实际朝向设置 [ZegoVideoEncodedFrameParam](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoVideoEncodedFrameParam) 中的 “rotation”，调用 [sendCustomVideoCaptureEncodedData](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoExpressEngine#send-custom-video-capture-encoded-data-params-timestamp) 接口传入视频帧数据和设置朝向的参数，将数据传给 SDK。

#### Android


若直播或视频通话过程中 App 的设置为视频画面根据重力感应的变化而旋转，则需要监听对应平台的屏幕旋转事件，并依此做视频方向的旋转。

当开发者使用 SDK 采集时，横竖屏切换主要通过 [setVideoConfig ](https://doc-zh.zego.im/zh/api?doc=Express_Video_SDK_API~Java~class~im-zego-zegoexpress-zego-express-engine#set-video-config) 接口设置编码分辨率，并通过 [setAppOrientation ](https://doc-zh.zego.im/zh/api?doc=Express_Video_SDK_API~Java~class~im-zego-zegoexpress-zego-express-engine#set-app-orientation) 接口设置视频朝向。

在对应 Activity 中监听屏幕旋转事件触发的 “onConfigurationChanged” 回调，在事件处理的回调中修改对应编码分辨率并告知 SDK App 的方向。

```java
@Override
public void onConfigurationChanged(Configuration newConfig) {
    super.onConfigurationChanged(newConfig);

    // Checks the orientation of the screen

    ZegoVideoConfig videoConfig = ZegoExpressEngine.getEngine().getVideoConfig();
    ZegoOrientation orientation = ZegoOrientation.ORIENTATION_0;

    if(Surface.ROTATION_0 ==  this.getWindowManager().getDefaultDisplay().getRotation()){
        orientation = ZegoOrientation.ORIENTATION_0;
        videoConfig.setEncodeResolution(360, 640);
    }else if(Surface.ROTATION_180 ==  this.getWindowManager().getDefaultDisplay().getRotation()){
        orientation = ZegoOrientation.ORIENTATION_180;
        videoConfig.setEncodeResolution(360, 640);
    }else if(Surface.ROTATION_270 ==  this.getWindowManager().getDefaultDisplay().getRotation()){
        orientation = ZegoOrientation.ORIENTATION_270;
        videoConfig.setEncodeResolution(640, 360);
    }else if(Surface.ROTATION_90 ==  this.getWindowManager().getDefaultDisplay().getRotation()){
        orientation = ZegoOrientation.ORIENTATION_90;
        videoConfig.setEncodeResolution(640, 360);
    }

    ZegoExpressEngine.getEngine().setAppOrientation(orientation);
    ZegoExpressEngine.getEngine().setVideoConfig(videoConfig);
}
```


当开发者使用 [自定义视频采集](/real-time-video-android-java/video/custom-video-capture) 时，监听设备方向变化后，可参考以下两种方式实现横竖屏切换：

- 自行处理视频帧数据：在设备方向变化的回调中，对采集到的视频帧数据做旋转处理，再将处理后的数据通过 [sendCustomVideoCaptureTextureData](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~ZegoExpressEngine#send-custom-video-capture-texture-data) 接口传给 SDK。
- 通过 SDK 处理视频帧数据：在设备方向变化的回调中，在将采集到的视频帧数据传给 SDK 之前，根据实际朝向设置 [ZegoVideoEncodedFrameParam](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~ZegoVideoEncodedFrameParam) 中的 “rotation”，调用 [sendCustomVideoCaptureEncodedData](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~ZegoExpressEngine#send-custom-video-capture-encoded-data) 接口传入视频帧数据和设置朝向的参数，将数据传给 SDK。

<Warning title="注意">



若录制出来的直播流无法观看，可能原因为：由于横竖屏切换时，流的编码分辨率被修改，部分第三方播放器对分辨率修改的视频兼容性不好，可能会出现播放失败的问题，因此一般不推荐在直播或视频过程中进行横竖屏切换时修改分辨率。 

</Warning>







    
