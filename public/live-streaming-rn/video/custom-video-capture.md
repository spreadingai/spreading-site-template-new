# 自定义视频采集

- - -

## 功能简介

自定义视频采集，是指由开发者自行采集视频，向 ZEGO Express SDK 提供视频数据，并由 ZEGO Express SDK 进行编码推流的功能。当用户开启自定义视频采集的功能后，默认情况下，ZEGO Express SDK 在推流端内部将对本端预览画面进行渲染，用户无需自行进行渲染。

当开发者业务中出现以下情况时，推荐使用 SDK 的自定义视频采集功能：

- 开发者的 App 使用了第三方美颜厂商的美颜 SDK，可以直接对接 ZEGO Express SDK 的自定义视频采集功能。即由第三方美颜厂商的美颜 SDK 负责视频数据的采集和前处理，由 ZEGO Express SDK 负责视频数据的编码以及将音视频流推到 ZEGO 音视频云端。
- 直播过程中，开发者需要使用摄像头完成的额外功能和 ZEGO Express SDK 的默认的视频采集逻辑有冲突，导致摄像头无法正常使用。例如，直播到一半，需要录制短视频。
- 直播非摄像头采集的数据。例如本地视频文件播放、屏幕分享、游戏直播等。

## 前提条件

在进行自定义视频采集前，请确保：

- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppID 和 AppSign，详情请参考 [控制台 - 项目信息](/console/project-info)。
- 已在项目中集成 ZEGO Express SDK，并实现了基本的音视频推拉流功能，详情请参考 [快速开始 - 集成](https://doc-zh.zego.im/article/21002) 和 [快速开始 - 实现流程](https://doc-zh.zego.im/article/21003)。


## 技术原理

本章节将简述实现自定义视频采集时，原生层及 JavaScript 层的大致技术原理，具体实现方式请参考 [实现流程](#实现流程)。

根据 ReactNative 框架特性，它需要使用 JavaScript 访问移动平台的 API，并通过使用 React 组件来描述 UI 的外观和行为。因此视频数据在 JavaScript 与原生层之间的高频传输时，会受到性能方面的限制，所以针对 ReactNative 框架实现自定义视频采集的一般处理的方式，包括以下两方面：
- **原生层（中间层/桥阶层）**：实现视频数据对接，即用于实现自定义采集的主要步骤，包括监听自定义采集开启回调，实现数据采集，将采集后的数据通过原生层的接口再发送给 SDK 等。
- **JavaScript 层**：调用接口控制自定义采功能的启动和关闭，包括创建引擎，登录房间，预览推拉流等。



## 实现流程

自定义视频采集的具体实现步骤如下：

<Note title="说明">


本文中出现的原生接口，可在 [SDK 源码](https://www.npmjs.com/package/zego-express-engine-reactnative?activeTab=code) 中的查看
- android > src/main > java/im/zego/reactnative > ZegoCustomVideoCaptureManager.java
- ios > src > ZegoCustomVideoCaptureManager.h

</Note>



### 在 JavaScript 层开启自定义视频采集

1. 初始化 SDK 后，创建自定义视频采集对象 [ZegoCustomVideoCaptureConfig](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/classes/_zegoexpressdefines_.zegocustomvideocaptureconfig.html)，设置 [bufferType](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/classes/_zegoexpressdefines_.zegocustomvideocaptureconfig.html#buffertype) 属性，用于向 SDK 提供视频帧数据类型。
2. 调用 [enableCustomVideoCapture](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/classes/_zegoexpressengine_.zegoexpressengine.html#enablecustomvideocapture) 接口，保持默认配置 “True”（否则推流没有视频数据）开启自定义视频采集功能。

<Note title="说明">


由于视频采集的多样性，SDK 支持多种视频帧数据类型 [bufferType](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/classes/_zegoexpressdefines_.zegocustomvideocaptureconfig.html#buffertype)，开发者需告知 SDK 使用的数据类型。当前支持如下视频帧数据类型，若设置为其他枚举值，**将无法向 SDK 提供视频帧数据**。
- iOS 平台支持如下视频帧数据类型：
    - CVPixelBuffer：支持多种视频数据格式，例如 RGBA32、I420、NV12 等。
    - GLTexture2D：OpenGL Texture 2D 类型。
    - EncodedData：编码类型。
- Android 平台支持如何视频帧数据类型：
    - RawData：裸数据类型。
    - GLTexture2D：OpenGL Texture 2D 类型。
    - EncodedData：编码类型。

</Note>



```javascript
var captureConfig = new ZegoCustomVideoCaptureConfig(ZegoVideoBufferType.CVPixelBuffer);
// 选择 CVPixelBuffer 类型视频帧数据
ZegoExpressEngine.instance().enableCustomVideoCapture(true, captureConfig);
```

### 在原生层设置自定义视频采集回调

<Note title="说明">


本文中出现的原生接口，可在 [SDK 源码](https://www.npmjs.com/package/zego-express-engine-reactnative?activeTab=code) 中的查看
- android > src/main > java/im/zego/reactnative > ZegoCustomVideoCaptureManager.java
- ios > src > ZegoCustomVideoCaptureManager.h

</Note>



#### 设置自定义视频采集回调对象

将 `CustomVideoCapture`（开发者自定义）作为自定义视频采集回调对象，遵循视频回调协议。

<CodeGroup>
```objc title="iOS"
#import <ZegoCustomVideoCaptureManager.h>

@interface CustomVideoCapture () <ZegoReactNativeCustomVideoCaptureHandler>

    ......

@end
```

```java title="Android"
import im.zego.reactnative.IZegoReactNativeCustomVideoCaptureHandler;

public class CustomVideoCapture implements IZegoReactNativeCustomVideoCaptureHandler {

    ......

}
```
</CodeGroup>

调用 `setCustomVideoCaptureHandler` 接口，设置自定义视频采集回调。
<CodeGroup>
```objc title="iOS"
#import "CustomVideoCapture.h"

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  ...
   [[ZegoCustomVideoCaptureManager sharedInstance] setCustomVideoCaptureHandler:[CustomVideoCapture sharedInstance]];
}
```
```java title="Android"
import im.zego.reactnative.ZegoCustomVideoCaptureManager;

public class MainActivity extends ReactActivity {
  @Override
  public void onCreate(@Nullable Bundle savedInstanceState, @Nullable PersistableBundle persistentState) {
    super.onCreate(savedInstanceState, persistentState);
  ...
    ZegoCustomVideoCaptureManager.getInstance().setCustomVideoCaptureHandler(CustomVideoCapture.sharedInstance);
  }
}
```
</CodeGroup>

#### 实现自定义视频采集回调方法

实现 `onStart` 和 `onStop` 自定义采集回调方法。

<Note title="说明">


当自定义采集多路流时，需要在 `onStart`、`onStop` 回调中，指定推流通道，否则默认只回调主路通道的通知。

</Note>


<CodeGroup>
```objc title="iOS"
@implementation CustomVideoCapture
...
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
...
@end
```
```java title="Android"
public class CustomVideoCapture implements IZegoReactNativeCustomVideoCaptureHandler {
...
// 注意：此回调不在主线程，如有 UI 操作请自行切换到主线程
@Override
public void onStart(int channel) {
    // 收到回调后，开发者需要执行启动采集相关的业务逻辑，例如开启摄像头等

    // 此处示例启动一个自己实现的视频采集设备
    this.captureDevice.startCapture();
}

// 注意：此回调不在主线程，如有 UI 操作请自行切换到主线程
@Override
public void onStop(int channel) {
    // 收到回调后，开发者需要执行停止采集相关的业务逻辑，例如关闭摄像头等

    // 此处示例停止一个自己实现的视频采集设备
    this.captureDevice.stopCapture();
}
...
}
```
</CodeGroup>

### 向 SDK 发送视频帧数据

- 在 JavaScript 层：调用开始预览接口 [startPreview](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/classes/_zegoexpressengine_.zegoexpressengine.html#startpreview) 或开始推流接口 [startPublishingStream](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/classes/_zegoexpressengine_.zegoexpressengine.html#startpublishingstream) 后，将会触发 `onStart` 回调。
- 在原生层：开发者启动采集相关的业务逻辑后，调用发送自定义采集的视频帧数据接口，向 SDK 发送视频帧数据，自定义采集的视频帧数据接口与 [1 开启自定义视频采集](https://doc-zh.zego.im/article/21022#4_1) 中向 SDK 提供视频帧数据类型 [bufferType](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/classes/_zegoexpressdefines_.zegocustomvideocaptureconfig.html#buffertype) 一一对应：

    | 视频帧类型 | bufferType | 发送视频帧数据接口 |
    |---|---|---|
    |CVPixelBuffer 类型| CVPixelBuffer |`sendCVPixelBuffer`|
    |OpenGL Texture 2D 类型| GLTexture2D |`sendGLTextureData` |
    |编码类型| EncodedData |`sendEncodedData` |

<Warning title="注意">
在进行外部采集时，如果通过 `sendEncodedData` 接口向 SDK 发送的是视频帧编码后的数据，SDK 将无法预览，此时开发者需要自行预览。
</Warning>


以在接收到摄像头视频帧回调后，调用接口向 SDK 发送视频帧数据为例：

<CodeGroup>
```objc title="iOS"
@implementation CustomVideoCapture
...
#pragma mark - AVCaptureVideoDataOutputSampleBufferDelegate

- (void)captureOutput:(AVCaptureOutput *)captureOutput didOutputSampleBuffer:(CMSampleBufferRef)sampleBuffer fromConnection:(AVCaptureConnection *)connection {
    CVPixelBufferRef buffer = CMSampleBufferGetImageBuffer(sampleBuffer);
    CMTime timeStamp = CMSampleBufferGetPresentationTimeStamp(sampleBuffer);

    // 向 SDK 发送自定义采集的视频帧 CVPixelBuffer 数据
    [[ZegoCustomVideoCaptureManager sharedInstance] sendCVPixelBuffer:buffer timestamp:timeStamp channel:self.publishChannel];
}
...
@end
```
```java title="Android"
public class CustomVideoCapture implements IZegoReactNativeCustomVideoCaptureHandler {
...
public void didOutputTextureData(int textureID, int width, int height, long referenceTimeMillisecond) {
    // 向 SDK 发送自定义采集的视频帧 GLTextureData 数据
    ZegoCustomVideoCaptureManager.sharedInstance().sendGLTextureData(textureID, width, height, referenceTimeMillisecond, this.publishChannel);
}
...
}
@end
```
</CodeGroup>

### 在 JavaScript 层停止自定义视频采集

停止推流或预览后，退出房间或销毁引擎时，将会触发 `onStop` 回调，开发者可停止采集相关的业务逻辑，例如关闭摄像头等。


## 常见问题

1. **如何使用 “GLTexture2D” 方式传递采集数据?**

    1. 在 JavaScript 层设置 [ZegoCustomVideoCaptureConfig](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/classes/_zegoexpressdefines_.zegocustomvideocaptureconfig.html#buffertype) 的 [bufferType](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/classes/_zegoexpressdefines_.zegocustomvideocaptureconfig.html#buffertype) 为 `GLTexture2D`。
    2. 在原生层调用 `sendGLTextureData` 接口，向 SDK 发送视频帧数据。

2. **使用自定义视频采集，本地预览的画面正常，推流后观众端看到的画面变形了，该如何处理？**

    该问题是由于自定义视频采集到的图像比例，与 SDK 默认的分辨率比例不一致造成的。例如，自定义视频采集到的视频帧画面比例是 4:3，SDK 默认推流画面分辨率比例是 16:9。

    有如下解决方案：

    - 方案 1：开发者将自定义视频采集的视频分辨率比例手动修改为 16:9。
    - 方案 2：开发者在 JavaScript 层调用 [setVideoConfig](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/classes/_zegoexpressengine_.zegoexpressengine.html#setvideoconfig) 接口，将 SDK 的推流分辨率比例自定义为 4:3。


3. **开启自定义视频采集后，采集的帧率和拉流播放帧率不一致，如何处理？**

    可以通过如下方式处理：

    - 向 SDK 发送 `CVPixelBuffer` 类型视频帧数据时，设置  [setVideoConfig](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/classes/_zegoexpressengine_.zegoexpressengine.html#setvideoconfig)  接口的帧率和调用自定义采集 `sendCVPixelBuffer` 接口提供的视频数据的帧率需要保持一致。
    - 向 SDK 发送 `GLTexture2D` 类型视频帧数据时，设置  [setVideoConfig](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/classes/_zegoexpressengine_.zegoexpressengine.html#setvideoconfig)  接口的帧率和调用自定义采集 `sendGLTextureData` 接口提供的视频数据的帧率需要保持一致。


4. **SDK 接收视频帧数据方法内部对传入的数据是同步处理还是异步处理？**

    SDK 接收视频帧数据后，会先同步拷贝数据，然后再异步执行编码等操作，所以在将数据传入 SDK 后即可立即释放。


5. **如何在自定义视频采集时实现视频旋转？**

    可参考以下两种方式实现横竖屏切换：

    - 自行处理视频帧数据：在设备方向变化的回调中，对采集到的视频帧数据做旋转处理，再将处理后的数据通过 `sendCVPixelBuffer` 接口传给 SDK。
    - 通过 SDK 处理视频帧数据：在设备方向变化的回调中，如果是使用 EncodeData 类型采集数据，在将采集到的视频帧数据传给 SDK 之前，根据实际朝向设置 `ZegoVideoEncodedFrameParam` 中的 “rotation”，调用 `sendEncodedData` 接口传入视频帧数据和设置朝向的参数，将数据传给 SDK。


## 相关文档

- [怎么处理视频花屏或绿屏问题？](https://doc-zh.zego.im/faq/pixelated_green)
- [怎么处理音画不同步问题？](https://doc-zh.zego.im/faq/unsynchronized)

<Content />

