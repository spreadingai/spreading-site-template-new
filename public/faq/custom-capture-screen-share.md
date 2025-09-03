<Title>如何通过自定义采集实现屏幕共享？</Title>


---

<Warning title="注意">



如果您是 3.1.0 版本及以上的 SDK，建议您使用最新的实现方式，请参考 [屏幕共享](/real-time-video-ios-oc/video/screen-sharing) 文档。  

</Warning>



## 功能简介

屏幕共享是指在视频通话或互动直播过程中将屏幕内容以视频的方式分享给其他的观众，以增强互动体验，提高沟通效率。

屏幕共享在如下场景中应用广泛：

- 视频会议场景中，屏幕共享可以将讲话者本地的文件、数据、网页、PPT 等画面分享给其他与会人；
- 在线课堂场景中，屏幕共享可以将老师的课件、笔记、讲课内容等画面展示给学生观看。


## iOS 实现流程


### 前提条件

在实现屏幕共享功能之前，请确保：
- 已准备好 iOS 12.0 或以上版本且支持音视频的 iOS 设备或模拟器（推荐使用真机）。
- 已在项目中集成 ZEGO Express SDK，实现基本的实时音视频功能，详情请参考 [快速开始 - 集成](/real-time-video-ios-oc/quick-start/integrating-sdk) 和 [快速开始 - 实现视频通话](/real-time-video-ios-oc/quick-start/implementing-video-call)。
- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppID 和 AppSign，详情请参考 [控制台 - 项目管理](/console/project-info) 中的“项目信息”。


### 实现流程

iOS 平台是基于苹果的 [Replaykit](https://developer.apple.com/documentation/ReplayKit) 框架实现屏幕录制，能够分享整个系统的屏幕内容。但需要当前 App （主 App 进程）额外提供一个 Extension 扩展组件（Extension 进程），用于录制屏幕，再结合 ZEGO Express SDK 相关 API 来实现屏幕共享功能。

<Warning title="注意">



主 App 进程和 Extension 进程是两个进程，因此 Extension 进程中的 userID 和 streamID 不能与主 App 进程中的相同。  

</Warning>





<Frame width="512" height="auto" caption=""><Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/iOS/ZegoExpressEngine/ShareScreen/share_screen_implementation.png" /></Frame></Frame>


实现屏幕共享的主要流程如下：

1. 在您的工程中，新建一个 Broadcast Upload Extension 的 Target，并在其中集成 ZEGO Express SDK。
2. 在 Broadcast Upload Extension 的 Target 中创建 App Groups，使 Extension 进程可以与主 App 进程同步配置数据。
3. 使用 Extension 进程录制屏幕，通过 [handleReplayKitSampleBuffer](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~ObjectiveC_ios~class~zego-express-engine&jumpType=route#handle-replay-kit-sample-buffer-buffer-type) 将录制的屏幕缓存数据发送给 ZEGO Express SDK。 
4. 手动触发屏幕共享。

详细的操作请参考下文。


### 使用步骤

**在工程中新建 Broadcast Upload Extension**

<Note title="说明">



- 若您没有现成的项目工程，可以参考 [快速开始 - 集成](/real-time-video-ios-oc/quick-start/integrating-sdk#可选新建项目) 中的 “新建项目” 来创建。
- Broadcast Upload Extension 的内存使用限制为 50 MB，请确保屏幕共享的 Extension 内存使用不超过 50 MB。

</Note>




1. 使用 Xcode 打开项目工程文件，在菜单栏中依次点击 “File > New > Target..."。
<Frame width="512" height="auto" caption=""><Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/iOS/ZegoExpressEngine/ShareScreen/share_screen_create_extension_ios1.png" /></Frame></Frame>
2. 在弹出的窗口中选择 iOS 页的 “Broadcast Upload Extension” 后，单击 “Next”。
<Frame width="512" height="auto" caption=""><Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/iOS/ZegoExpressEngine/ShareScreen/share_screen_create_extension_ios.png" /></Frame></Frame>
3. 在弹出的对话框中的 “Product Name” 一栏填写 “Broadcast Upload Extension” 的名字，例如 “ScreenShare”。选择 “Team”、“Language” 等信息后，单击 “Finish” 。

<Note title="说明">


无需勾选 “Include UI Extension”。

</Note>



<Frame width="512" height="auto" caption=""><Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/iOS/ZegoExpressEngine/ShareScreen/share_screen_create_extension_ios3.png" /></Frame></Frame>

创建完成后，您会在项目中看到该 Extension 的文件夹，结构类似如下，该文件夹用于存放屏幕共享功能的实现代码：
<Frame width="512" height="auto" caption=""><Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/iOS/ZegoExpressEngine/ShareScreen/share_screen_create_extension_project.png" /></Frame></Frame>


**(可选) 通过 App Groups 同步配置数据**

<Accordion title="创建 App Groups" defaultOpen="false">
1. 在 Xcode 新建的 Target 中依次选择 “Signing & Capabilities > Capability > App Groups"。
<Frame width="512" height="auto" caption=""><Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/iOS/ZegoExpressEngine/ShareScreen/share_screen_appgroups.png" /></Frame></Frame>

2. 在弹出的窗口中添加 “App Groups ID”，将 Extension 进程与主 App 进程进行绑定。
<Frame width="512" height="auto" caption=""><Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/iOS/ZegoExpressEngine/ShareScreen/share_screen_appgroups_id.png" /></Frame></Frame>

3. 使用 iOS 系统 API [NSUserDefaults](https://developer.apple.com/documentation/foundation/nsuserdefaults) 在 Extension 进程和主 App 进程之间同步配置数据（例如 AppID、AppSign、roomID 等）。

```objc
NSUserDefaults *userDefaults = [[NSUserDefaults alloc] initWithSuiteName:appGroup];
```
</Accordion>


**通过 Extension 获取屏幕数据并推流**

<Note title="说明">


如下系统回调的实现可以在 [下载示例源码](/real-time-video-ios-oc/quick-start/run-example-code) 中的 “/ZegoExpressExample-iOS-OC/Topics/ScreenCapture/ZegoExpressExample-iOS-OC-Broadcast/SampleHandler.m” 文件中查看：

- [broadcastStartedWithSetupInfo](https://developer.apple.com/documentation/replaykit/rpbroadcastsamplehandler/2143170-broadcaststartedwithsetupinfo?language=objc) 
- [processSampleBuffer](https://developer.apple.com/documentation/replaykit/rpbroadcastsamplehandler/2123045-processsamplebuffer?language=objc) 
- [broadcastFinished](https://developer.apple.com/documentation/replaykit/rpbroadcastsamplehandler/2143169-broadcastfinished?language=objc) 


</Note>




1. 确保 Extension 的 “Info.plist” 文件中，将 “RPBroadcastProcessMode” 设置为 “RPBroadcastProcessModeSampleBuffer”。
2. 在 Extension 中导入 ZEGO Express SDK，详情请参考 [快速开始 - 集成](/real-time-video-ios-oc/quick-start/integrating-sdk#导入-sdk) 中的 “导入 SDK”。
3. 系统通过 [broadcastStartedWithSetupInfo](https://developer.apple.com/documentation/replaykit/rpbroadcastsamplehandler/2143170-broadcaststartedwithsetupinfo?language=objc) 回调通知 Extension 已开始录制屏幕，您需要在该回调中调用 ZEGO Express SDK 的如下接口实现相关功能：
    1. 创建 ZegoExpressEngine。

    ```objc
    ZegoEngineConfig *engineConfig = [[ZegoEngineConfig alloc] init];

    engineConfig.advancedConfig = @{
        @"replaykit_handle_rotation": @"false", // Specify not to process the screen rotation on the publisher side, but to process it on the player side, thereby reduce memory usage, but in this case, the player must not play this stream from the CDN but directly from the ZEGO server. If you need to play this stream from the CDN and the captured screen needs to be dynamically rotated, please comment this line of code.
        @"max_channels": @"0", // Specify the max number of streams to play as 0  (Because this extension only needs to publish stream)
        @"max_publish_channels": @"1" // Specify the max number of streams to publish as 1
    };

    // Set engine config
    [ZegoExpressEngine setEngineConfig:engineConfig];

    // Create engine
    ZegoEngineProfile *profile = [ZegoEngineProfile new];
    profile.appID = appID; 
    profile.appSign = appSign; 
    profile.scenario = ZegoScenarioDefault; 

    [ZegoExpressEngine createEngineWithProfile:profile eventHandler:self];

    // Enable hardware encoder to reduce memory usage when publishing stream
    [[ZegoExpressEngine sharedEngine] enableHardwareEncoder:YES];

    ```

    2. 初始化 Express ReplayKit 模块。

    ```objc
    // Init SDK ReplayKit module
    [[ZegoExpressEngine sharedEngine] prepareForReplayKit];
    ```

    3. 登录房间并推送屏幕共享流
    
    ```objc  
    // Login room
    [[ZegoExpressEngine sharedEngine] loginRoom:self.roomID user:[ZegoUser userWithUserID:self.userID userName:self.userName]];
    // 推送屏幕共享流
    [[ZegoExpressEngine sharedEngine] startPublishingStream:self.streamID];
    ```


4. 在 [processSampleBuffer](https://developer.apple.com/documentation/replaykit/rpbroadcastsamplehandler/2123045-processsamplebuffer?language=objc) 系统回调中，通过 [handleReplayKitSampleBuffer](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~ObjectiveC_ios~class~zego-express-engine&jumpType=route#handle-replay-kit-sample-buffer-buffer-type) 将屏幕录制的缓存数据，发送给 ZEGO Express SDK。

    ```objc
    [[ZegoExpressEngine sharedEngine] handleReplayKitSampleBuffer:sampleBuffer bufferType:sampleBufferType];
    ```

5. 系统通过 [broadcastFinished](https://developer.apple.com/documentation/replaykit/rpbroadcastsamplehandler/2143169-broadcastfinished?language=objc) 回调通知 Extension 屏幕录制已结束，您可以在该回调中调用 ZEGO Express SDK 的如下接口停止屏幕共享：
    
    ```objc
    // 1. 停止推送屏幕共享流。
    [[ZegoExpressEngine sharedEngine] stopPublishingStream];
    // 2. 退出房间
    [[ZegoExpressEngine sharedEngine] logoutRoom:self.roomID];
    // 3. 销毁 ZegoExpressEngine
    [ZegoExpressEngine destroyEngine];
    ```

**开始屏幕共享**

<Warning title="注意">


完成上述屏幕共享的准备代码后，还必须由用户手动触发屏幕共享才能真正启动屏幕共享功能。

</Warning>



您可以通过如下两种方式触发：

- 方式一（推荐）：

您需要在 iOS 系统的控制中心，长按录屏按钮后选择对应的 Extension 来开启录制。

<Frame width="512" height="auto" caption=""><Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/iOS/ZegoExpressEngine/ShareScreen/share_screen_create_trigger.png" /></Frame></Frame>

- 方式二：

<Accordion title="(可选) 在 App 中唤起屏幕共享" defaultOpen="false">
<Warning title="注意">


- 苹果在 iOS 12.0 中新增了 [RPSystemBroadcastPickerView](https://developer.apple.com/documentation/replaykit/rpsystembroadcastpickerview)，可以从 App 应用弹出启动器，供用户确认启动屏幕分享。但目前 [RPSystemBroadcastPickerView](https://developer.apple.com/documentation/replaykit/rpsystembroadcastpickerview) 还不支持自定义界面，也没有官方的唤起方法。
- 苹果官方不推荐该方案，并有可能在新一轮的系统更新中失效，因此只是一个可选方案，选用此方案您需要自行承担风险。

</Warning>



    1. 创建 [RPSystemBroadcastPickerView](https://developer.apple.com/documentation/replaykit/rpsystembroadcastpickerview) 系统类，绑定 Extension 的 “BundleID”。
    2. 遍历 [RPSystemBroadcastPickerView](https://developer.apple.com/documentation/replaykit/rpsystembroadcastpickerview) 的子 view 寻找 UIButton， 并触发其点击事件。
</Accordion>

**观看远端屏幕共享**

完成以上步骤之后，其他用户可以使用 [startPlayingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoExpressEngine#start-playing-stream-canvas) 接口拉取屏幕共享流，详细操作可以参考 [快速开始](/real-time-video-android-java/quick-start/integrating-sdk)。

```objc
// 同样的，拉流播放的用户首先需要初始化 SDK 并登录同一个房间 
...
...

// 拉流播放，需传入发起屏幕共享的用户推流时所用的 streamID
[[ZegoExpressEngine sharedEngine] startPlayingStream:streamID canvas:[ZegoCanvas canvasWithView:self.playView]];
```


## Android 实现流程


### 前提条件

在实现屏幕共享功能之前，请确保：

- 已在项目中集成 ZEGO Express SDK，实现基本的实时音视频功能，详情请参考 [快速开始 - 集成](/real-time-video-android-java/quick-start/integrating-sdk) 和 [快速开始 - 实现视频通话](/real-time-video-android-java/quick-start/implementing-video-call)。
- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppID 和 AppSign，详情请参考 [控制台 - 项目管理](/console/project-info) 中的“项目信息”。

### 实现流程

我们需要结合 Android 系统 API 和 ZEGO Express SDK 的自定义视频采集来进行屏幕分享。 

下图展示了 Android 平台实现屏幕共享的数据流转：

<Frame width="512" height="auto" caption=""><Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Express/screen_capture_android.png" /></Frame></Frame>

**获取用户录制屏幕授权**

在录制屏幕前需要获取用户的授权，不同版本下需要获取的权限如下：
- Android 4.4 及之前版本必须获取到 root 权限后才能实现屏幕录制，由于目前大部分设备的系统版本都高于 4.4，该场景此处不做赘述。
- Android 5.0 及以上版本，可以使用系统提供的 MediaProjection 和 MediaProjectionManager 进行屏幕录制。该版本下可以不获取 root 权限，但会弹窗提示用户是否允许应用录制屏幕，需要用户授权。
- Android 10.0 及以上版本，屏幕录制使用系统 API 时需要用到前台服务，详情请参考 [官方文档](https://developer.android.google.cn/reference/kotlin/android/media/projection/MediaProjectionManager?hl=en)。

```java
public static MediaProjectionManager mMediaProjectionManager;
if (Build.VERSION.SDK_INT < 21) {
    Toast.makeText(ZGVideoCaptureOriginUI.this, getString(R.string.record_request), Toast.LENGTH_SHORT).show();
    finish();
} else {
    // 5.0及以上版本
    // 请求录屏权限，等待用户授权
   mMediaProjectionManager = (MediaProjectionManager) getSystemService(MEDIA_PROJECTION_SERVICE);
   startActivityForResult(mMediaProjectionManager.createScreenCaptureIntent(), REQUEST_CODE);
    }
```

**创建 MediaProjection 实例**

1. 在 AndroidManifest.xml 中添加相关配置。

<Note title="说明">



为实现 Android 10.0 及以上版本应用的屏幕录制，需要在代码中开启前台服务，并在 AndroidManifest.xml 中注册 Service，添加 foregroundServiceType 属性。

</Note>



```xml
<application>
 <activity android:name="im.zego.videocapture.ui.ZGVideoCaptureDemoUI" />
 <activity android:name="im.zego.videocapture.ui.ZGVideoCaptureOriginUI"></activity>
 <service android:name=".service.CaptureScreenService"
     android:enabled="true"
     android:foregroundServiceType="mediaProjection"/>
</application>
```


2. 用户授权后创建 MediaProjection 实例。
 
- 对于 Android 10.0 以下版，直接在授权成功后获取 MediaProjection
- 对于 Android 10.0 及以上版本，MediaProjection 实例的创建需要在前台服务的 onStartCommand 方法中执行。

```java

@RequiresApi(api = Build.VERSION_CODES.LOLLIPOP)
   @Override
   protected void onActivityResult(int requestCode, int resultCode, Intent data) {
       super.onActivityResult(requestCode, resultCode, data);
       if (requestCode == REQUEST_CODE && resultCode == RESULT_OK) {
           if(Build.VERSION.SDK_INT>=Build.VERSION_CODES.Q){
               //Target版本高于等于10.0需要使用前台服务，并在前台服务的onStartCommand方法中创建MediaProjection
               service=new Intent(ZGVideoCaptureOriginUI.this, CaptureScreenService.class);
               service.putExtra("code",resultCode);
               service.putExtra("data",data);
               startForegroundService(service);
           }else {
               //Target版本低于10.0直接获取MediaProjection
               mMediaProjection = mMediaProjectionManager.getMediaProjection(resultCode, data);
           }
       }
   }   
``` 

创建一个类，实现 `Service` 接口，在 `onStartCommand` 中创建 `MediaProjection` 实例。

```java
@RequiresApi(api = Build.VERSION_CODES.LOLLIPOP)
public class CaptureScreenService extends Service {
    ...

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        ···
        //在这里获取MediaProjection
        ZGVideoCaptureOriginUI.mMediaProjection = ZGVideoCaptureOriginUI.mMediaProjectionManager.getMediaProjection(mResultCode, Objects.requireNonNull(mResultData));
        return super.onStartCommand(intent, flags, startId);
    }
   ··· 
}
```   


**开启 ZegoExpress SDK 的自定义视频采集功能**

调用 ZegoExpress SDK 的 [enableCustomVideoCapture](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Java_android~class~im-zego-zegoexpress-zego-express-engine&jumpType=route#enable-custom-video-capture) 开启自定义采集功能，详情请参考 [自定义视频采集](/real-time-video-android-java/video/custom-video-capture)。

```java
//VideoCaptureScreen继承IZegoCustomVideoCaptureHandler，用于监听自定义采集onStart和onStop回调
VideoCaptureScreen videoCapture = new VideoCaptureScreen(ZGVideoCaptureOriginUI.mMediaProjection, DEFAULT_VIDEO_WIDTH, DEFAULT_VIDEO_HEIGHT, mSDKEngine);
//监听自定义采集开始停止回调
mSDKEngine.setCustomVideoCaptureHandler(videoCapture);  
ZegoCustomVideoCaptureConfig videoCaptureConfig=new ZegoCustomVideoCaptureConfig();
//使用SurfaceTexture类型进行自定义采集
videoCaptureConfig.bufferType=ZegoVideoBufferType.SURFACE_TEXTURE;
//开始自定义采集
mSDKEngine.enableCustomVideoCapture(true, videoCaptureConfig, ZegoPublishChannel.MAIN); 
```

**登录房间并开始推流**

调用 [loginRoom ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Java_android~class~im-zego-zegoexpress-zego-express-engine#login-room) 接口，传入房间 ID 参数 “roomID” 和用户参数 “user”，登录房间。

调用 [startPublishingStream ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Java_android~class~im-zego-zegoexpress-zego-express-engine#start-publishing-stream) 接口，传入流 ID 参数 “streamID”，向远端用户发送本端的音视频流。


```java
/** 创建用户 */
ZegoUser user = new ZegoUser("user1");

/** 开始登录房间 */
mSDKEngine.loginRoom("room1", user);  
/** 开始推流 */
mSDKEngine.startPublishingStream("stream1");  

```

**创建 VirtualDisplay 并给 ZEGO Express SDK 发送屏幕数据**
1、创建 ZegoVideoCaptureCallback 类继承 IZegoCustomVideoCaptureHandler。

2、创建 VideoCaptureScreen 类继承 ZegoVideoCaptureCallback。

当收到 [onStart ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Java_android~class~im-zego-zegoexpress-callback-i-zego-custom-video-capture-handler#on-start) 回调后，开发者可以通过 MediaProjection 创建 VirtualDisplay 实例，用于获取屏幕数据，并发送给 ZEGO Express SDK。

3、通过 createVirtualDisplay 系统 API 将虚拟显示器的内容渲染到 Surface。

```java
//ZegoVideoCaptureCallback继承于IZegoCustomVideoCaptureHandler
class VideoCaptureScreen extends ZegoVideoCaptureCallback {
    @Override
    //当收到onStart回调后，就可以通过MediaProjection创建VirtualDisplay，并给ZEGO SDK塞屏幕数据
    public void onStart(ZegoPublishChannel channel) {
        if (mZegoEngine != null && !mIsCapturing && mMediaProjection != null) {
            mIsCapturing = true;
            //通过ZEGO API getCustomVideoCaptureSurfaceTexture获取SurfaceTexture，该接口默认使用主路通道进行推流
            SurfaceTexture texture = mZegoEngine.getCustomVideoCaptureSurfaceTexture();
            texture.setDefaultBufferSize(mCaptureWidth, mCaptureHeight);
            //通过获取的SurfaceTexture创建Surface
            mSurface = new Surface(texture);
            //通过mSurface，完成将录屏数据塞给ZEGO SDK
            mVirtualDisplay = mMediaProjection.createVirtualDisplay("ScreenCapture",
                    mCaptureWidth, mCaptureHeight, 1,
                    DisplayManager.VIRTUAL_DISPLAY_FLAG_PUBLIC, mSurface, null, mHandler);
        }
    }
}       
```

至此，我们已完成采集屏幕数据并通过 ZegoExpress SDK 分享到远端的操作。

### 观看远端屏幕共享

完成以上步骤之后，其他用户可以使用 [startPlayingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~ZegoExpressEngine#start-playing-stream) 接口拉取屏幕共享流，详细步骤可以参考 [快速开始](/real-time-video-android-java/quick-start/integrating-sdk)。

```java
// 同样的，拉流播放的用户首先需要初始化 SDK 并登录同一个房间 
...
...

// 拉流播放，需传入发起屏幕共享的用户推流时所用的 streamID
mSDKEngine.startPlayingStream(streamID, new ZegoCanvas(playView));
```



## Windows 实现流程

<Warning title="注意">


该功能以插件形式提供，具体请参考 [ZegoScreenCapture-Windows](https://doc-zh.zego.im/article/3167)。其作为 [zego-express-video-windows ](/real-time-video-windows-cpp/client-sdk/download-sdk) 的插件，二者结合使用才能实现屏幕共享的功能。


</Warning>



### 前提条件

在使用屏幕共享前，请先下载 [ScreenCapture SDK ](https://doc-zh.zego.im/article/3167)插件，并在项目中集成该插件。


### 使用步骤

屏幕共享支持如下功能，详细实现流程请参考屏幕捕捉插件中相关文档：

|功能|描述|实现流程|
|-|-|-|
|集成插件|集成屏幕采集的插件|请参考 [集成](https://doc-zh.zego.im/article/2371)|
|采集整个屏幕|选择某个屏幕进行采集|请参考 [屏幕共享](https://doc-zh.zego.im/article/2351)|
|采集指定区域|选择某个区域进行采集|请参考 [屏幕共享](https://doc-zh.zego.im/article/2363)|
|采集指定窗口|选择某个窗口进行采集|请参考 [窗口共享](https://doc-zh.zego.im/article/2364)|
|窗口缩略图|获取缩略图显示到 img 标签以方便选择采集目标|请参考 [窗口缩略图](https://doc-zh.zego.im/article/2365)|


## macOS 实现流程


### 使用步骤

屏幕共享支持如下功能，详细实现流程请参考屏幕共享中相关文档：

|功能|描述|实现流程|
|-|-|-|
|集成插件|集成屏幕采集的插件|请参考 [集成](https://doc-zh.zego.im/article/2396)|
|采集整个屏幕|选择某个屏幕进行采集|请参考 [屏幕共享](https://doc-zh.zego.im/article/2397)|
|采集指定区域|选择某个区域进行采集|请参考 [区域共享](https://doc-zh.zego.im/article/2398)|
|采集指定窗口|选择某个窗口进行采集|请参考 [窗口共享](https://doc-zh.zego.im/article/2395)|
|窗口缩略图|获取缩略图显示到 img 标签以方便选择采集目标|请参考 [窗口缩略图](https://doc-zh.zego.im/article/2399)|