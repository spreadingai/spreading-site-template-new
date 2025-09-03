# 屏幕共享

- - -

## 功能简介

屏幕共享，是指在视频通话或互动直播过程中将屏幕内容以视频的方式分享给其他的观众，以增强互动体验，提高沟通效率。

屏幕共享在如下场景中应用广泛：

- 视频会议场景中，屏幕共享可以将讲话者本地的文件、数据、网页、PPT 等画面分享给其他与会人；
- 在线课堂场景中，屏幕共享可以将老师的课件、笔记、讲课内容等画面展示给学生观看。

<Frame width="512" height="auto" caption="">
  <img src="https://doc-media.zego.im/sdk-doc/Pics/Express/screen_share_scene_new.png" />
</Frame>

## 示例源码下载

请参考 [下载示例源码](/real-time-video-ios-oc/quick-start/run-example-code) 获取源码。

相关源码请查看 "/ZegoExpressExample/Examples/Others/ScreenSharing" 目录下的文件。

## 前提条件

在实现屏幕共享功能之前，请确保：

- 支持 iOS 12.0 或以上版本且支持音视频的 iOS 设备或模拟器（推荐使用真机）。
- 该功能对设备性能要求较高，推荐在 iPhone X 及之后机型上使用。
- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppID 和 AppSign，详情请参考 [控制台 - 项目信息](/console/project-info)。
- 已在项目中集成 ZEGO Express SDK，并实现了基本的音视频推拉流功能，详情请参考 [快速开始 - 集成](/real-time-video-ios-oc/quick-start/integrating-sdk) 和 [快速开始 - 实现流程](/real-time-video-ios-oc/quick-start/implementing-video-call)。

## 实现流程

<Warning title="注意">

- 屏幕采集时，仅 iOS、Android 平台支持同时采集视频和音频；其他平台仅支持采集视频，如需采集音频，请开发者自行实现相关逻辑。
- 如果您已经通过 ZEGO 旧版 [屏幕共享](https://doc-zh.zego.im/article/11150) 产品实现屏幕共享功能，或者需要自己实现屏幕共享功能，请参考 [如何通过自定义采集实现屏幕共享？](http://doc-zh.zego.im/faq/Express_Share_Screen?product=HybridHierarchicalDeliverySystem&platform=windows)。

</Warning>



iOS 平台是基于苹果的 [Replaykit](https://developer.apple.com/documentation/ReplayKit) 框架实现屏幕录制，能够分享整个系统的屏幕内容。但需要当前 App （主 App 进程）额外提供一个 Extension 扩展组件（Extension 进程），用于录制屏幕，再结合 ZEGO Express SDK 相关 API 来实现屏幕共享功能。

实现屏幕共享的主要流程如下：

1. 切换采集源为屏幕共享源
2. 开始屏幕共享
   * 应用内共享

   * 跨应用共享
     1. 新建 Broadcast Upload Extension
     2. 设置 Extension
     3. 开始屏幕共享
     4. 启动 Extension 扩展进程
     5. 获取屏幕数据

3. 登录房间推流
4. 观看远端共享屏幕
5. 停止屏幕共享

详细的操作请参考下文。

### 1 在主 App 设置采集源为屏幕共享源

设置采集源为屏幕共享源，则需要对视频源和音频源进行设置。

SDK 推流的“视频源”默认为摄像头源，如果需要推屏幕共享源，需要通过 [setVideoSource](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoExpressEngine#set-video-source) 进行切换为屏幕共享。

```objc
[ZegoExpressEngine.shareEnigne setVideoSource:ZegoVideoSourceScreenCapture channel:ZegoPublishChannelMain];
```

SDK 推流的“音频源”默认为麦克风源，如果需要推屏幕共享源，需要通过 [setAudioSource](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoExpressEngine#set-audio-source) 进行切换为屏幕共享。

<Note title="说明">

若主路使用屏幕共享功能，只有当主路音频源设置为 `Microphone` 时，SDK 会启动音频内部采集，维持后台保活；若设置为其他音频源类型，当应用退出后台后，屏幕共享将停止使用，建议用户自主对应用添加后台保活逻辑。

</Note>



```objc
[ZegoExpressEngine.shareEnigne setAudioSource:ZegoAudioSourceTypeScreenCapture channel:ZegoPublishChannelMain];
```

### 2 开始屏幕共享

有两种屏幕共享方式，分别为“应用内屏幕共享”和“跨应用屏幕共享”。

<Accordion title="应用内屏幕共享" defaultOpen="false">
若用户只在应用内共享画面与声音，可以调用 [startScreenCaptureInApp](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoExpressEngine#start-screen-capture-in-app) 接口开启屏幕共享。也可调用 [broadcastFinished](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoReplayKitExtHandler#broadcast-finished-reason) 接口回调屏幕共享结束通知，若屏幕采集失败可接收到失败的原因。

```objc
ZegoScreenCaptureConfig *config = [[ZegoScreenCaptureConfig alloc] init];
config.captureVideo = true;
config.captureAudio = true;
// 可选参数，设置视频的采集区域，必须在原始的视频数据之内，单位为像素（px）
config.cropRect = CGRectMake(x, y, width, height);
[ZegoExpressEngine.sharedEngine startScreenCaptureInApp:config];
```
</Accordion>


<Accordion title="跨应用屏幕共享" defaultOpen="false">
跨应用屏幕共享是由 iOS 系统通过 Extension 扩展进程进行录制的，所以需要再额外创建扩展进程，并启动。具体请参考如下实现步骤：

#### 1 新建 Broadcast Upload Extension

<Note title="说明">

Broadcast Upload Extension 的内存使用限制为 50 MB，请勿在屏幕共享的 Extension 中进行额外的内存分配。

</Note>



1. 使用 Xcode 打开项目工程文件，在菜单栏中依次点击 “File > New > Target..."。

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/iOS/ZegoExpressEngine/ShareScreen/share_screen_create_extension_ios1.png" /></Frame>

2. 在弹出的窗口中选择 iOS 页的 “Broadcast Upload Extension” 后，单击 “Next”。

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/iOS/ZegoExpressEngine/ShareScreen/share_screen_create_extension_ios.png" /></Frame>

3. 在弹出的对话框中的 “Product Name” 一栏填写 “Broadcast Upload Extension” 的名字，例如 “ScreenShare”。选择 “Team”、“Language” 等信息后，单击 “Finish” 。

<Note title="说明">

    无需勾选 “Include UI Extension”。

</Note>



    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/iOS/ZegoExpressEngine/ShareScreen/share_screen_create_extension_ios3.png" /></Frame>

    创建完成后，您会在项目中看到该 Extension 的文件夹，结构类似如下，该文件夹用于存放屏幕共享功能的实现代码：

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/iOS/ZegoExpressEngine/ShareScreen/share_screen_create_extension_project.png" /></Frame>

#### 2 设置 Extension

1. 确保 Extension 的 “Info.plist” 文件中，将 “RPBroadcastProcessMode” 设置为 “RPBroadcastProcessModeSampleBuffer”。
2. 在 Extension 中导入 ZEGO Express SDK，详情请参考 [快速开始 - 集成](/real-time-video-ios-oc/quick-start/integrating-sdk#导入-sdk) 中的 “导入 SDK”。

#### 3 开始屏幕共享

若用户需要共享整个系统的画面与声音，可以调用 [startScreenCapture](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoExpressEngine#start-screen-capture) 接口开启屏幕共享。

```objc
ZegoScreenCaptureConfig *config = [[ZegoScreenCaptureConfig alloc] init];
config.captureVideo = true;
config.captureAudio = true;
// 可选参数，设置视频的采集区域，必须在原始的视频数据之内，单位为 像素（px）
config.cropRect = CGRectMake(x, y, width, height);
[ZegoExpressEngine.sharedEngine startScreenCapture:config];
```

##### 3.1 设置或更新屏幕共享朝向

屏幕共享朝向支持跟随系统朝向和固定朝向，默认跟随系统朝向。可以设置 [ZegoScreenCaptureConfig](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoScreenCaptureConfig) 中的 `orientation` 参数来设置屏幕共享朝向。

|枚举值|说明|
|-|-|
|ZegoScreenCaptureOrientationAuto|跟随系统朝向，拉流端根据系统朝向展示画面|
|ZegoScreenCaptureOrientationLandscape|固定横屏，拉流端始终横屏画面|
|ZegoScreenCaptureOrientationPortrait|固定竖屏，拉流端始终竖屏画面|

```objc
ZegoScreenCaptureConfig *config = [[ZegoScreenCaptureConfig alloc] init];
...
config.orientation = ZegoScreenCaptureOrientationLandscape; // 固定横屏
[ZegoExpressEngine.sharedEngine startScreenCapture:config];
// or 更新屏幕共享配置时设置
[ZegoExpressEngine.sharedEngine updateScreenCaptureConfig:config];
```

#### 4 启动 Extension 扩展进程

有两种启动方式，请根据需要选择实现。

<Tabs>
<Tab title="方式一">
您需要在 iOS 系统的控制中心，长按录屏按钮后，选择对应的 Extension 来开启录制。

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/iOS/ZegoExpressEngine/ShareScreen/share_screen_create_trigger.png" /></Frame>
</Tab>
<Tab title="方式二">
苹果在 iOS 12.0 中新增了 [RPSystemBroadcastPickerView](https://developer.apple.com/documentation/replaykit/rpsystembroadcastpickerview)，可以从 App 应用弹出启动器，供用户确认启动屏幕分享。

1. 创建 [RPSystemBroadcastPickerView](https://developer.apple.com/documentation/replaykit/rpsystembroadcastpickerview) 系统类，绑定 Extension 的 “BundleID”。
2. 遍历 [RPSystemBroadcastPickerView](https://developer.apple.com/documentation/replaykit/rpsystembroadcastpickerview) 的子 view 寻找 UIButton， 并触发其点击事件。

```objc
RPSystemBroadcastPickerView *broadcastPickerView = [[RPSystemBroadcastPickerView alloc] initWithFrame:CGRectMake(0, 0, 44, 44)];
NSString *bundlePath = [[NSBundle mainBundle] pathForResource:@"ZegoExpressExample-Broadcast" ofType:@"appex" inDirectory:@"PlugIns"];
if (bundlePath) {
    NSBundle *bundle = [NSBundle bundleWithPath:bundlePath];
    if (bundle) {
        broadcastPickerView.preferredExtension = bundle.bundleIdentifier;
        for (UIView *subView in broadcastPickerView.subviews) {
            if ([subView isMemberOfClass:[UIButton class]]) {
                UIButton *button = (UIButton *)subView;
                [button sendActionsForControlEvents:UIControlEventAllEvents];
            }
        }
    }
}
```

<Warning title="注意">

- 苹果在 iOS 12.0 中新增了 [RPSystemBroadcastPickerView](https://developer.apple.com/documentation/replaykit/rpsystembroadcastpickerview)，可以从 App 应用弹出启动器，供用户确认启动屏幕分享。但目前 [RPSystemBroadcastPickerView](https://developer.apple.com/documentation/replaykit/rpsystembroadcastpickerview) 还不支持自定义界面，也没有官方的唤起方法。
- 苹果官方不推荐该方案，并有可能在新一轮的系统更新中失效，因此只是一个可选方案，选用此方案您需要自行承担风险。
</Warning>



</Tab>
</Tabs>
#### 5 获取屏幕数据

<Note title="说明">


如下系统回调的实现，可以在 [下载示例源码](https://doc-zh.zego.im/article/3126) 中的 “/ZegoExpressExample/Examples/Others/ScreenSharing/ZegoExpressExample-Broadcast/SampleHandler.m” 文件中查看：

- [broadcastStartedWithSetupInfo](https://developer.apple.com/documentation/replaykit/rpbroadcastsamplehandler/2143170-broadcaststartedwithsetupinfo?language=objc)
- [processSampleBuffer](https://developer.apple.com/documentation/replaykit/rpbroadcastsamplehandler/2123045-processsamplebuffer?language=objc)
- [broadcastFinished](https://developer.apple.com/documentation/replaykit/rpbroadcastsamplehandler/2143169-broadcastfinished?language=objc)

</Note>



1. 系统通过 [broadcastStartedWithSetupInfo](https://developer.apple.com/documentation/replaykit/rpbroadcastsamplehandler/2143170-broadcaststartedwithsetupinfo?language=objc) 回调通知 Extension 已开始录制屏幕，您需要在该回调中，调用 [ZegoReplayKitExt](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoReplayKitExt) 类中的 [setupWithDelegate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoReplayKitExt#setup-with-delegate) 接口创建数据传输通道：

    ```objc
    [ZegoReplayKitExt.sharedInstance setupWithDelegate:self];
    ```

2. 在 [processSampleBuffer](https://developer.apple.com/documentation/replaykit/rpbroadcastsamplehandler/2123045-processsamplebuffer?language=objc) 系统回调中，通过 [ZegoReplayKitExt](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoReplayKitExt) 类中的 [sendSampleBuffer](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoReplayKitExt#send-sample-buffer-with-type) 接口发送给 ZEGO Express SDK。

    ```objc
    [ZegoReplayKitExt.sharedInstance sendSampleBuffer:sampleBuffer withType:sampleBufferType];
    ```

3. 系统通过 [broadcastFinished](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoReplayKitExtHandler#broadcast-finished-reason) 回调通知 Extension 屏幕录制已结束，若屏幕录制失败可接收到失败的原因。您可以在该回调中，调用 [ZegoReplayKitExt](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoReplayKitExt) 类中的 [finished](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoReplayKitExt#finished) 接口停止屏幕采集并断开数据传输通道：

    ```objc
    [ZegoReplayKitExt.sharedInstance finished];
    ```

4. 通过上述调用 SDK 的 [setupWithDelegate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoReplayKitExt#setup-with-delegate) 方法初始化并设置代理，可以在当前类添加 `<ZegoReplayKitExtHandler>` 协议以及实现回调，用于监听屏幕共享结束或失败的原因。

    ```objc
    - (void)broadcastFinished:(ZegoReplayKitExt *)broadcast reason:(ZegoReplayKitExtReason)reason {

        switch (reason) {
            case ZegoReplayKitExtReasonHostStop:
                {
                    NSDictionary *userInfo = @{NSLocalizedDescriptionKey : @"Host app stop srceen capture"};
                    NSError *error = [NSError errorWithDomain:NSCocoaErrorDomain code:0 userInfo:userInfo];
                    [self finishBroadcastWithError:error];
                }
                break;
            case ZegoReplayKitExtReasonConnectFail:
                {
                    NSDictionary *userInfo = @{NSLocalizedDescriptionKey : @"Connect host app fail need startScreenCapture in host app"};
                    NSError *error = [NSError errorWithDomain:NSCocoaErrorDomain code:0 userInfo:userInfo];
                    [self finishBroadcastWithError:error];
                }
                break;
            case ZegoReplayKitExtReasonDisconnect:
                {
                    NSDictionary *userInfo = @{NSLocalizedDescriptionKey : @"disconnect with host app"};
                    NSError *error = [NSError errorWithDomain:NSCocoaErrorDomain code:0 userInfo:userInfo];
                    [self finishBroadcastWithError:error];
                }
                break;
        }
    }
    ```
</Accordion>


### 3 登录房间推流

完成上述屏幕共享源的采集过程后，将采集到的数据源 [startPublishingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoExpressEngine#start-publishing-stream) 推送到云服务器。（推送数据源的通道必须与设置采集源的通道保持一致）

```objc
[ZegoExpressEngine.sharedEngine startPublishingStream:streamID channel:ZegoPublishChannelMain];
```


### 4 观看远端屏幕共享

完成以上步骤后，其他用户可以使用 [startPlayingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoExpressEngine#start-playing-stream-canvas) 接口拉取屏幕共享流。

```objc
// 拉流播放，需传入发起屏幕共享的用户推流时所用的 streamID
[[ZegoExpressEngine sharedEngine] startPlayingStream:streamID canvas:[ZegoCanvas canvasWithView:self.playView]];
```

### 5 停止屏幕共享

用户可以调用 [stopScreenCapture](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoExpressEngine#stop-screen-capture) 接口停止共享。

```objc
[ZegoExpressEngine.sharedEngine stopScreenCapture];
```

## 常见问题

1. **iOS 是否支持共享指定区域？**

    iOS 系统仅支持共享整个屏幕，不支持共享指定区域。

2. **iOS 使用屏幕共享时进入后台，为什么会停止采集？**
    - 在应用中开启音频录制的后台模式。
    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/iOS/ZegoExpressEngine/ShareScreen/share_screen_background_mode.png" /></Frame>
    - 若主路使用屏幕共享功能，只有当主路音频源设置为 `Microphone` 时，SDK 会启动音频内部采集，维持后台保活；若设置为其他音频源类型，当应用退出后台后，屏幕共享将停止使用，建议用户自主对应用添加后台保活逻辑。

3. **iOS 使用屏幕共享时出现音频播放异常，如何处理？**

    若使用屏幕共享功能采集并推流音频，同时又在本机使用拉流功能，会导致 iOS 系统重复采集拉流音频，导致音频播放异常，建议使用 [muteAllPlayStreamAudio](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoExpressEngine#mute-all-play-stream-audio) 禁止拉取所有音频流。

<Content />

