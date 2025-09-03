# 屏幕共享

- - -

<Warning title="注意">
如需使用屏幕共享功能，请务必 [获取用户录制屏幕授权](#1必选获取用户录制屏幕授权)，否则将无法使用该功能。
</Warning>


## 功能简介

屏幕共享，是指在视频通话或互动直播过程中将屏幕内容以视频的方式分享给其他的观众，以增强互动体验，提高沟通效率。

屏幕共享在如下场景中应用广泛：

- 视频会议场景中，屏幕共享可以将讲话者本地的文件、数据、网页、PPT 等画面分享给其他与会人；
- 在线课堂场景中，屏幕共享可以将老师的课件、笔记、讲课内容等画面展示给学生观看。

<Frame width="512" height="auto" caption="">
  <img src="https://doc-media.zego.im/sdk-doc/Pics/Express/screen_share_scene_new.png" />
</Frame>

## 示例源码下载

请参考 [下载示例源码](/real-time-video-android-java/client-sdk/download-demo) 获取源码。

相关源码请查看 “/ZegoExpressExample/Others/src/main/java/im/zego/others/screensharing” 目录下的文件。

```tree
others
└── screensharing
    └── ScreenSharingActivity.java
...
```

## 前提条件

在实现屏幕共享功能之前，请确保：

- 支持 Android 5.0 或以上版本，且支持音视频的 Android 设备或模拟器（推荐使用真机）。
- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppID 和 AppSign，详情请参考 [控制台 - 项目信息](/console/project-info)。
- 已在项目中集成 ZEGO Express SDK，并实现了基本的音视频推拉流功能，详情请参考 [快速开始 - 集成](https://doc-zh.zego.im/article/195) 和 [快速开始 - 实现流程](https://doc-zh.zego.im/article/7627)。


## 实现流程

<Warning title="注意">


- 屏幕采集时，仅 iOS、Android 平台支持同时采集视频和音频；其他平台仅支持采集视频，如需采集音频，请开发者自行实现相关逻辑。
- 如果您已经通过 ZEGO 旧版 [屏幕共享](https://doc-zh.zego.im/article/9217) 产品实现屏幕共享功能，或者需要自己实现屏幕共享功能，请参考 [如何通过自定义采集实现屏幕共享？](http://doc-zh.zego.im/faq/Express_Share_Screen?product=HybridHierarchicalDeliverySystem&platform=windows)。
</Warning>

下图展示了 Android 平台实现屏幕共享的数据流转：

<Frame width="512" height="auto" caption="">
  <img src="https://doc-media.zego.im/sdk-doc/Pics/Express/screen_capture_android_new.jpeg" />
</Frame>


<a id="SERVICE"></a>
### 1（必选）获取用户录制屏幕授权
<Warning title="注意">


请务必声明以下权限，否则将**无法使用**屏幕共享功能。
</Warning>

在工程的 AndroidManifest.xml 文件中，增加屏幕录制的权限配置。设置完成后，在录制屏幕前，会弹窗提示用户是否允许应用录制屏幕，需要用户手动授权。

1. 屏幕录制功能依赖于前台服务保活，进入您项目的 “app/src/main” 目录，打开 “AndroidManifest.xml” 文件，添加权限声明。

    - 如果目标 Android SDK 版本低于 34.0.0 版本，需设置 `FOREGROUND_SERVICE` 权限声明。

        ```xml
        <uses-permission android:name="android.permission.FOREGROUND_SERVICE"/>
        ```

    - 如果目标 Android SDK 版本是 34.0.0 及以后版本，需要设置 `FOREGROUND_SERVICE` 及 `FOREGROUND_SERVICE_MEDIA_PROJECTION` 权限声明。

        ```xml
        <uses-permission android:name="android.permission.FOREGROUND_SERVICE"/>
        <uses-permission android:name="android.permission.FOREGROUND_SERVICE_MEDIA_PROJECTION"/>
        ```

2. 声明屏幕录制的前台服务和辅助 Activity。

    <Warning title="注意">


    - 如果您使用的是 3.6.0 或以上版本的 SDK，且通过 Maven 自动集成（或手动集成 “.aar” 包）时，可以跳过此步骤。
    - 如果您使用的是 3.6.0 以下版本的 SDK，必须手动声明屏幕录制的前台服务和辅助 Activity，否则无法启动屏幕录制。
    </Warning>

    ```xml
    <application>
    <activity
            android:name="im.zego.internal.screencapture.ZegoScreenCaptureManager$ZegoScreenCaptureAssistantActivity"
            android:exported="false"
            android:configChanges="screenSize|orientation"
            android:screenOrientation="fullUser"
            android:theme="@android:style/Theme.Translucent" />
        <service
            android:name="im.zego.internal.screencapture.ZegoScreenCaptureService"
            android:enabled="true"
            android:exported="false"
            android:foregroundServiceType="mediaProjection">
            <intent-filter>
            <action android:name="android.intent.action.screenshare" />
            </intent-filter>
        </service>
    </application>
    ```

### 2 设置采集源为屏幕共享源

- SDK 推流的“视频源”默认为摄像头，如果需要推屏幕共享源，需要通过 [setVideoSource](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~ZegoExpressEngine#set-video-source) 切换为屏幕共享。

    ```java
    engine.setVideoSource(ZegoVideoSourceType.SCREEN_CAPTURE, ZegoPublishChannel.MAIN);
    ```

- SDK 推流的“音频源”默认为麦克风，如果需要推屏幕共享源，需要通过 [setAudioSource](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~ZegoExpressEngine#set-audio-source) 切换为屏幕共享。

    ```java
    engine.setAudioSource(ZegoAudioSourceType.SCREEN_CAPTURE, ZegoPublishChannel.MAIN);
    ```

### 3 开启屏幕共享

调用 [startScreenCapture](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~ZegoExpressEngine#start-screen-capture) 接口共享整个系统的画面、采集第三方应用的音频。

```java
engine.startScreenCapture();
```

开发者还可以使用 [ZegoScreenCaptureConfig](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~ZegoScreenCaptureConfig) 参数设置是否采集视频、是否采集音频、设置音频采集时的采样率和采样通道等。

```java
ZegoScreenCaptureConfig config = new ZegoScreenCaptureConfig();
config.captureVideo = true;
config.captureAudio = true;
config.audioParam.sampleRate = ZegoAudioSampleRate.ZEGO_AUDIO_SAMPLE_RATE_16K;
config.audioParam.channel = ZegoAudioChannel.STEREO;
// 可选参数，设置视频的采集区域，必须在原始的视频数据之内，单位为像素（px）
config.cropRect = new Rect(left, top, right, bottom);

engine.startScreenCapture(config);
```

#### 3.1 设置屏幕共享朝向

屏幕共享朝向支持跟随系统朝向和固定朝向，默认跟随系统朝向。可以设置 [ZegoScreenCaptureConfig](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~ZegoScreenCaptureConfig) 中的 `orientation` 参数来设置屏幕共享朝向。

|枚举值|说明|
|-|-|
|ZegoScreenCaptureOrientation.AUTO|跟随系统朝向，拉流端根据系统朝向展示画面|
|ZegoScreenCaptureOrientation.LANDSCAPE|固定横屏，拉流端始终横屏画面|
|ZegoScreenCaptureOrientation.PORTRAIT|固定竖屏，拉流端始终竖屏画面|

```java
ZegoScreenCaptureConfig config = new ZegoScreenCaptureConfig();
...
config.orientation = ZegoScreenCaptureOrientation.LANDSCAPE; // 固定横屏
engine.startScreenCapture(config);
```

### 4 更新屏幕共享配置

调用 [updateScreenCaptureConfig](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~ZegoExpressEngine#update-screen-capture-config) 接口，可以更新屏幕共享的配置。

```java
ZegoScreenCaptureConfig config = new ZegoScreenCaptureConfig();
config.captureVideo = true;
config.captureAudio = false;
config.audioParam.sampleRate = ZegoAudioSampleRate.ZEGO_AUDIO_SAMPLE_RATE_32K;
config.audioParam.channel = ZegoAudioChannel.STEREO;
config.orientation = ZegoScreenCaptureOrientation.PORTRAIT; // 固定竖屏
// 可选参数，设置视频的采集区域，必须在原始的视频数据之内，单位为像素（px）
config.cropRect = new Rect(left, top, right, bottom);

engine.updateScreenCaptureConfig(config);
```

### 5 监听屏幕共享回调通知

开发者需要监听 [IZegoEventHandler](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~IZegoEventHandler) 类中的以下回调：
- [onScreenCaptureStart](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~IZegoEventHandler#on-screen-capture-start) 回调，接收开始屏幕采集成功的通知，方便做后续业务处理，如 UI 提示或应用跳转等。
- [onScreenCaptureExceptionOccurred](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~IZegoEventHandler#on-screen-capture-exception-occurred) 回调，接收屏幕共享过程中的异常信息通知，从而可分析屏幕共享失败的原因。

```java
public void setEngineEventHandler(){
    engine.setEventHandler(new IZegoEventHandler() {
        @Override
        public void onScreenCaptureExceptionOccurred(ZegoScreenCaptureExceptionType exceptionType) {
            super.onScreenCaptureExceptionOccurred(exceptionType);
            AppLogger.getInstance().receiveCallback("screen capture exception occurred: %s", exceptionType);
        }
        @Override
        public void onScreenCaptureStart() {
            super.onScreenCaptureStart();
            AppLogger.getInstance().receiveCallback("screen capture start");
        }
    });
}
```

### 6 登录房间并开始推流

调用 [loginRoom](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Java_android~class~im-zego-zegoexpress-zego-express-engine#login-room) 接口，传入房间 ID 参数 “roomID” 和用户参数 “user”，登录房间。

调用 [startPublishingStream ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Java_android~class~im-zego-zegoexpress-zego-express-engine#start-publishing-stream) 接口，传入流 ID 参数 “streamID”，向远端用户发送本端的音视频流。


```java
// 创建用户
ZegoUser user = new ZegoUser("user1");

// 开始登录房间
engine.loginRoom("room1", user);
// 开始推流
engine.startPublishingStream("stream1");

```

至此，我们已完成采集屏幕数据并通过 ZEGO Express SDK 分享到远端的操作。

### 7 观看远端屏幕共享

完成以上步骤之后，其他用户可以使用 [startPlayingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~ZegoExpressEngine#start-playing-stream) 接口拉取屏幕共享流。

```java
// 拉流播放，需传入发起屏幕共享的用户推流时所用的 streamID
engine.startPlayingStream(streamID, new ZegoCanvas(playView));
```

### 8 停止屏幕共享

用户可以调用 [stopScreenCapture](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~ZegoExpressEngine#stop-screen-capture) 接口停止共享。

```java
engine.stopScreenCapture();
```
