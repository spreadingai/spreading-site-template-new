# 自定义视频采集

- - -

## 功能简介

自定义视频采集，是指由开发者自行采集视频，向 ZEGO Express SDK 提供视频数据，并由 ZEGO Express SDK 进行编码推流的功能。当用户开启自定义视频采集的功能后，默认情况下，ZEGO Express SDK 在推流端内部将对本端预览画面进行渲染，用户无需自行进行渲染。

当开发者业务中出现以下情况时，推荐使用 SDK 的自定义视频采集功能：

- 开发者的 App 使用了第三方美颜厂商的美颜 SDK，可以直接对接 ZEGO Express SDK 的自定义视频采集功能。即由第三方美颜厂商的美颜 SDK 负责视频数据的采集和前处理，由 ZEGO Express SDK 负责视频数据的编码以及将音视频流推到 ZEGO 音视频云端。
- 直播过程中，开发者需要使用摄像头完成的额外功能和 ZEGO Express SDK 的默认的视频采集逻辑有冲突，导致摄像头无法正常使用。例如，直播到一半，需要录制短视频。
- 直播非摄像头采集的数据。例如本地视频文件播放、屏幕分享、游戏直播等。

## 示例源码下载

请参考 [下载示例源码](https://doc-zh.zego.im/article/3127) 获取源码。

相关源码请查看 “/ZegoExpressExample/Examples/AdvancedVideoProcessing/CustomVideoCapture” 目录下的文件。

## 前提条件

在进行自定义视频采集前，请确保：

- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppID 和 AppSign，详情请参考 [控制台 - 项目信息](/console/project-info)。
- 已在项目中集成 ZEGO Express SDK，并实现了基本的音视频推拉流功能，详情请参考 [快速开始 - 集成](https://doc-zh.zego.im/article/1400) 和 [快速开始 - 实现流程](https://doc-zh.zego.im/article/7629)。


## 使用步骤

API 接口调用的时序图如下：

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Common/ZegoExpressEngine/custom_video_capture_uml_ios_new.png" /></Frame>

1. 创建 ZegoExpressEngine 引擎。
2. 调用 [enableCustomVideoCapture](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_macos~class~ZegoExpressEngine#enable-custom-video-capture-config) 接口，开启自定义视频采集功能。
3. 调用 [setCustomVideoCaptureHandler](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_macos~class~ZegoExpressEngine#set-custom-video-capture-handler) 接口，设置自定义视频采集回调对象；并实现对应的 [onStart](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_macos~protocol~ZegoCustomVideoCaptureHandler#on-start)、[onStop](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_macos~protocol~ZegoCustomVideoCaptureHandler#on-stop) 回调方法，分别用于接收自定义视频采集开始、结束的通知。
4. 登录房间，开始预览、推流后，将会触发 [onStart](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_macos~protocol~ZegoCustomVideoCaptureHandler#on-start) 自定义视频采集开始回调通知。
5. 调用 [startCapture](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_macos~class~ZegoScreenCaptureSource#start-capture) 开始采集视频；或自行实现视频采集相关的业务逻辑，例如开启摄像头等。
6. 调用 [sendCustomVideoCapturePixelBuffer](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_macos~class~ZegoExpressEngine#send-custom-video-capture-pixel-buffer-timestamp)、[sendCustomVideoCaptureTextureData](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_macos~class~ZegoExpressEngine#send-custom-video-capture-texture-data-size-timestamp)、[sendCustomVideoCaptureEncodedData](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_macos~class~ZegoExpressEngine#send-custom-video-capture-encoded-data-params-timestamp) 接口，向 SDK 发送视频帧数据。
7. 最后，结束预览、推流，将会触发 [onStop](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_macos~protocol~ZegoCustomVideoCaptureHandler#on-stop) 自定义视频采集结束回调通知。
8. 调用 [stopCapture](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_macos~class~ZegoScreenCaptureSource#stop-capture) 停止采集视频。

<Warning title="注意">


开启自定义视频采集功能时，需要将 [enableCamera](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_macos~class~ZegoExpressEngine#enable-camera) 接口保持默认配置 “True”，否则推流没有视频数据。
</Warning>

### 1 开启自定义视频采集

1. 初始化 SDK 后，创建自定义视频采集对象 [ZegoCustomVideoCaptureConfig](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_macos~class~ZegoCustomVideoCaptureConfig)，设置属性 [bufferType](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_macos~class~ZegoCustomVideoCaptureConfig#buffer-type)，向 SDK 提供视频帧数据类型。
2. 调用 [enableCustomVideoCapture](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_macos~class~ZegoExpressEngine#enable-custom-video-capture-config) 接口，开启自定义视频采集功能。

<Note title="说明">


由于 iOS 采集的多样性，SDK 支持多种视频帧数据类型 [bufferType](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_macos~class~ZegoCustomVideoCaptureConfig#buffer-type)，开发者需告知 SDK 使用的数据类型。目前 iOS SDK 支持如下视频帧数据类型：

- ZegoVideoBufferTypeCVPixelBuffer：CVPixelBuffer 类型，支持多种视频数据格式，例如 RGBA32、I420、NV12 等。
- ZegoVideoBufferTypeGLTexture2D：OpenGL Texture 2D 类型。
- ZegoVideoBufferTypeEncodedData：编码类型。

设置为其他枚举值，将无法向 SDK 提供视频帧数据。
</Note>

```objc
ZegoCustomVideoCaptureConfig *captureConfig = [[ZegoCustomVideoCaptureConfig alloc] init];
// 选择 CVPixelBuffer 类型视频帧数据
captureConfig.bufferType = ZegoVideoBufferTypeCVPixelBuffer;

[[ZegoExpressEngine sharedEngine] enableCustomVideoCapture:YES config:captureConfig channel:ZegoPublishChannelMain];
```

### 2 设置自定义视频采集回调

#### 设置自定义视频采集回调对象

将 `ViewController` 作为自定义视频采集回调对象，遵循 [ZegoCustomVideoCaptureHandler](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_macos~protocol~ZegoCustomVideoCaptureHandler) 协议。

```objc
@interface ViewController () <ZegoEventHandler, ZegoCustomVideoCaptureHandler>

    ......

@end
```

调用 [setCustomVideoCaptureHandler](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_macos~class~ZegoExpressEngine#set-custom-video-capture-handler) 接口，设置自定义视频采集回调。

```objc
// 将自身作为自定义视频采集回调对象
[[ZegoExpressEngine sharedEngine] setCustomVideoCaptureHandler:self];
```

#### 实现自定义视频采集回调方法

实现 [onStart](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_macos~protocol~ZegoCustomVideoCaptureHandler#on-start) 和 [onStop](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_macos~protocol~ZegoCustomVideoCaptureHandler#on-stop) 自定义采集回调方法。

<Note title="说明">


当自定义采集多路流时，需要在 [onStart](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_macos~protocol~ZegoCustomVideoCaptureHandler#on-start)、[onStop](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_macos~protocol~ZegoCustomVideoCaptureHandler#on-stop) 回调中指定推流通道，否则默认只回调主路通道的通知。
</Note>

```objc
// 注意：此回调不在主线程，如有 UI 操作请自行切换到主线程
- (void)onStart {

    // 收到回调后，开发者需要执行启动采集相关的业务逻辑，例如开启摄像头等

    // 此处示例启动一个自己实现的视频采集设备
    [self.captureDevice startCapture];
}

// 注意：此回调不在主线程，如有 UI 操作请自行切换到主线程
- (void)onStop {

    // 收到回调后，开发者需要执行停止采集相关的业务逻辑，例如关闭摄像头等

    // 此处示例停止一个自己实现的视频采集设备
    [self.captureDevice stopCapture];
}
```

### 3 向 SDK 发送视频帧数据

调用开始预览接口 [startPreview](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_macos~class~ZegoExpressEngine#start-preview) 或开始推流接口 [startPublishingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_macos~class~ZegoExpressEngine#start-publishing-stream) 后，将会触发 [onStart](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_macos~protocol~ZegoCustomVideoCaptureHandler#on-start) 回调；开发者启动采集相关的业务逻辑后，调用发送自定义采集的视频帧数据接口向 SDK 发送视频帧数据，自定义采集的视频帧数据接口与 [1 开启自定义视频采集](/real-time-video-ios-oc/video/custom-video-capture#1-开启自定义视频采集) 中向 SDK 提供视频帧数据类型 [bufferType](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_macos~class~ZegoCustomVideoCaptureConfig#buffer-type) 一一对应：

| 视频帧类型 | bufferType | 发送视频帧数据接口 |
|---|---|---|
|CVPixelBuffer 类型|ZegoVideoBufferTypeCVPixelBuffer|[sendCustomVideoCapturePixelBuffer ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_macos~class~ZegoExpressEngine#send-custom-video-capture-pixel-buffer-timestamp)|
|OpenGL Texture 2D 类型|ZegoVideoBufferTypeGLTexture2D|[sendCustomVideoCaptureTextureData ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_macos~class~ZegoExpressEngine#send-custom-video-capture-texture-data-size-timestamp) |
|编码类型| ZegoVideoBufferTypeEncodedData |[sendCustomVideoCaptureEncodedData ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_macos~class~ZegoExpressEngine#send-custom-video-capture-encoded-data-params-timestamp) |

<Warning title="注意">


在进行外部采集时，如果通过 [sendCustomVideoCaptureEncodedData](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_macos~class~ZegoExpressEngine#send-custom-video-capture-encoded-data-params-timestamp) 接口向 SDK 发送的是视频帧编码后的数据，SDK 只负责传输数据，无法预览。开发者需要自行预览，并且类似水印这种前处理的效果不会生效。
</Warning>

以在接收到摄像头视频帧回调后，调用 [sendCustomVideoCapturePixelBuffer ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_macos~class~ZegoExpressEngine#send-custom-video-capture-pixel-buffer-timestamp) 接口向 SDK 发送视频帧数据为例：


```objc
#pragma mark - AVCaptureVideoDataOutputSampleBufferDelegate

- (void)captureOutput:(AVCaptureOutput *)captureOutput didOutputSampleBuffer:(CMSampleBufferRef)sampleBuffer fromConnection:(AVCaptureConnection *)connection {
    CVPixelBufferRef buffer = CMSampleBufferGetImageBuffer(sampleBuffer);
    CMTime timeStamp = CMSampleBufferGetPresentationTimeStamp(sampleBuffer);

    // 向 SDK 发送自定义采集的视频帧 CVPixelBuffer 数据
    [[ZegoExpressEngine sharedEngine] sendCustomVideoCapturePixelBuffer:buffer timeStamp:timeStamp];
}
```

停止推流/预览后，退出房间或销毁引擎时，将会触发 [onStop](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_macos~protocol~ZegoCustomVideoCaptureHandler#on-stop) 回调，开发者可停止采集相关的业务逻辑，例如关闭摄像头等。

### 4（可选）设置自定义采集设备状态

1. 收到 [onStart](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_macos~protocol~ZegoCustomVideoCaptureHandler#on-start) 回调后，可以根据需要调用 [setCustomVideoCaptureDeviceState](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_macos~class~ZegoExpressEngine#set-custom-video-capture-device-state-state-channel) 接口，指定推流通道的自定义采集设备状态。

2. 拉流端可以通过监听 [onRemoteCameraStateUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_macos~protocol~ZegoEventHandler#on-remote-camera-state-update-stream-id) 回调，获取推流端设备状态。

<Warning title="注意">


- 推流端通过 [setCustomVideoCaptureDeviceState](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_macos~class~ZegoExpressEngine#set-custom-video-capture-device-state-state-channel) 接口设置设备状态为 `ZegoRemoteDeviceStateDisable` 或 `ZegoRemoteDeviceStateMute` 都无效，即拉流端无法收到 [onRemoteCameraStateUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_macos~protocol~ZegoEventHandler#on-remote-camera-state-update-stream-id) 回调。
- 当推流端通过 [enableCamera](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_macos~class~ZegoExpressEngine#enable-camera) 关闭摄像头时，拉流端会通过 [onRemoteCameraStateUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_macos~protocol~ZegoEventHandler#on-remote-camera-state-update-stream-id) 回调收到 `ZegoRemoteDeviceStateDisable` 状态，此时推流没有视频数据。
- 当推流端通过 [mutePublishStreamVideo](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_macos~class~ZegoExpressEngine#mute-publish-stream-video) 接口停止发送视频流时，拉流端会通过 [onRemoteCameraStateUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_macos~protocol~ZegoEventHandler#on-remote-camera-state-update-stream-id) 回调收到 `ZegoRemoteDeviceStateMute` 状态。
</Warning>


## 常见问题

1. **如何使用 “ZegoVideoBufferTypeGLTexture2D” 方式传递采集数据?**

    1. 设置 [ZegoCustomVideoCaptureConfig](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_macos~class~ZegoCustomVideoCaptureConfig) 的 [bufferType](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_macos~class~ZegoCustomVideoCaptureConfig#buffer-type) 为 `ZegoVideoBufferTypeGLTexture2D`。
    2. 调用 [sendCustomVideoCaptureTextureData](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_macos~class~ZegoExpressEngine#send-custom-video-capture-texture-data-size-timestamp) 接口，向 SDK 发送视频帧数据。

2. **使用自定义视频采集，本地预览的画面正常，推流后观众端看到的画面变形了，该怎么处理？**

    该问题是由于自定义视频采集到的图像比例，与 SDK 默认的分辨率比例不一致造成的。例如，自定义视频采集到的视频帧画面比例是 4:3，SDK 默认推流画面分辨率比例是 16:9。

    有如下解决方案：

    - 方案一：开发者将自定义视频采集的视频分辨率比例手动修改为 16:9。

    - 方案二：开发者调用 [setVideoConfig](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_macos~class~ZegoMixerOutput#set-video-config) 接口，将 SDK 的推流分辨率比例自定义为 4:3。

    - 方案三：开发者调用 [setCustomVideoCaptureFillMode](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_macos~class~ZegoExpressEngine#set-custom-video-capture-fill-mode) 接口，设置视频采集画面缩放填充模式为 “ZegoViewModeAspectFit”（等比缩放、可能有黑边）或者 “ZegoViewModeAspectFill”（等比填充、可能有部分画面被裁剪）。


3. **开启自定义视频采集后，采集的帧率和拉流播放帧率不一致？**

    可以通过如下方式处理：

    - 向 SDK 发送 `ZegoVideoBufferTypeCVPixelBuffer` 类型视频帧数据时，设置 [setVideoConfig](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_macos~class~ZegoMixerOutput#set-video-config) 接口的帧率和调用自定义采集 [sendCustomVideoCapturePixelBuffer](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_macos~class~ZegoExpressEngine#send-custom-video-capture-pixel-buffer-timestamp) 接口提供的视频数据的帧率需要保持一致。
    - 向 SDK 发送 `ZegoVideoBufferTypeGLTexture2D` 类型视频帧数据时，设置 [setVideoConfig](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_macos~class~ZegoMixerOutput#set-video-config) 接口的帧率和调用自定义采集 [sendCustomVideoCaptureTextureData](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_macos~class~ZegoExpressEngine#send-custom-video-capture-texture-data-size-timestamp) 接口提供的视频数据的帧率需要保持一致。


4. **SDK 接收视频帧数据方法内部对传入的数据是同步处理还是异步处理？**

    SDK 接收视频帧数据后，会先同步拷贝数据，然后再异步执行编码等操作，所以在将数据传入 SDK 后即可立即释放。


5. **如何在自定义视频采集时实现视频旋转？**

    可参考以下两种方式实现横竖屏切换：

    - 自行处理视频帧数据：在设备方向变化的回调中，对采集到的视频帧数据做旋转处理，再将处理后的数据通过 [sendCustomVideoCapturePixelBuffer](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_macos~class~ZegoExpressEngine#send-custom-video-capture-pixel-buffer-timestamp) 接口传给 SDK。
    - 通过 SDK 处理视频帧数据：在设备方向变化的回调中，在将采集到的视频帧数据传给 SDK 之前，根据实际朝向设置 [ZegoVideoEncodedFrameParam](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_macos~class~ZegoVideoEncodedFrameParam) 中的 “rotation”，调用 [sendCustomVideoCaptureEncodedData](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_macos~class~ZegoExpressEngine#send-custom-video-capture-encoded-data-params-timestamp) 接口传入视频帧数据和设置朝向的参数，将数据传给 SDK。


## 相关文档

- [怎么处理视频花屏或绿屏问题？](https://doc-zh.zego.im/faq/pixelated_green)
- [怎么处理音画不同步问题？](https://doc-zh.zego.im/faq/unsynchronized)

<Content />
