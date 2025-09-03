# 超分辨率

- - - -

## 功能简介

超分辨率（简称超分）功能可以在拉流端，对拉取到的视频流画面的宽和高的像素进行倍增。例如：拉流端拉取到的原始画面分辨率为 640p x 360p，对画面进行超分处理后分辨率将提升为 1280p x 720p。


### 效果展示

- 人像

|超分前|超分后|
|-|-|
|<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/VideoSuperResolution/portrait_360.jpg" /></Frame>| <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/VideoSuperResolution/portrait_720.jpg" /></Frame>|




- **文字**

|超分前|超分后|
|-|-|
|<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/VideoSuperResolution/text_360.jpg" /></Frame>| <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/VideoSuperResolution/text_720.jpg" /></Frame>|



### 应用场景


<Warning title="注意">
由于同一台设备同时只能对 1 条流开启超分功能，因此超分功能仅适用于在只有单流或者有 1 路焦点流的场景。
</Warning>


- 1V1 视频通话场景
- 直播场景：直播场景大多数情况下，只拉取 1 条流，可对拉取的单流直播画面开启超分。当拉取多条流时，可对重点关注的主播开启超分功能。
- 在线教育：在线教育场景可能存在多流，但是会有 1 路焦点流（如教师），可以选择对教师的板书画面或正在发言的学生画面开启超分功能，实现增强效果。

### 功能优势

- **低功耗**：开启 360p 超分后，以 OPPO R11 为例，电流增量小于 60mA，额外耗电极小。
- **低发热**：开启 360p 超分半小时后，以 OPPO R11（骁龙 660）为例，温度上升小于 1.5°C。
- **高性能**：能开启超分功能的设备，超过 95% 的 CPU 增量小于 2%，内存增量小于 100MB。



## 示例源码

请参考 [下载示例源码](/real-time-video-android-java/client-sdk/download-demo) 获取源码。

相关源码请查看 “/ZegoExpressExample/Others/SuperResolution” 目录下的文件。

## 前提条件

<Warning title="注意">
开启超分功能会额外消耗系统资源，为了保证用户体验，目前仅支持对一路拉流画面开启超分，且该条流的原始分辨率不建议超过 640p × 360p。
</Warning>

在使用超分功能之前，请确保：

- 已联系 ZEGO 技术支持进行特殊编包。
- 已在项目中集成 ZEGO Express SDK，实现基本的实时音视频功能，详情请参考 [快速开始](/real-time-video-android-java/quick-start/integrating-sdk)。
- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppID 和 AppSign，详情请参考 [控制台 - 项目管理](/console-old/project-management)。



## 实现流程

<Warning title="注意">
Android 12 及以上版本，需在 AndroidManifest.xml 的 `<application>` 中添加以下配置，详情请参考 [Android Developers 相关说明](https://developer.android.google.cn/guide/topics/manifest/uses-native-library-element?hl=zh-cn)。

</Warning>
```xml
<application>
    <uses-native-library android:name="libOpenCL.so" android:required="false" />
    <uses-native-library android:name="libOpenCL-pixel.so" android:required="false" />
</application>
```

### 初始化和登录房间

初始化和登录房间的具体流程，请参考实现视频通话文档中的 “[创建引擎](https://doc-zh.zego.im/article/13395#4_1)”及“[登录房间](https://doc-zh.zego.im/article/13395#4_2)”。

### 监听超分状态回调

开启超分功能后，可通过 [onPlayerVideoSuperResolutionUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~IZegoEventHandler#on-player-video-super-resolution-update) 确认超分功能是否成功开启。

超分功能状态定义如下：

|枚举值|说明|
|-|-|
|ZegoSuperResolutionStateOff| 超分功能关闭。|
|ZegoSuperResolutionStateOn|超分功能开启。|

通过 [onPlayerVideoSizeChanged](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~IZegoEventHandler#on-player-video-size-changed) 可获取超分功能开启后的拉流视频分辨率。

```java
engine.setEventHandler(new IZegoEventHandler() {
    // 拉流视频分辨率发生变化的通知
    @Override
    public void onPlayerVideoSizeChanged(String streamID, int width, int height) {
        super.onPlayerVideoSizeChanged(streamID, width, height);

    }
    // 超分状态发生变化的通知
    @Override
    public void onPlayerVideoSuperResolutionUpdate(String streamID, ZegoSuperResolutionState state, int errorCode) {
        super.onPlayerVideoSuperResolutionUpdate(streamID, state, errorCode);

        if(state == ZegoSuperResolutionState.ON) {
            // 超分已开启
        }else if(state == ZegoSuperResolutionState.OFF) {
            // 超分已关闭
            if(errorCode == 0){
                // 正常关闭
            }
            else if(errorCode == 1004004){
                // 该设备不支持超分
            }
            else if(errorCode == 1004005){
                // 超分流数量超过限制，仅支持一条流超分
            }
            else if(errorCode == 1004006){
                // 超分原始分辨率超过限制
            }
            else if(errorCode == 1004007){
                // 超分设备性能不足
            }
            else if(errorCode == 1004008){
                // 超分未初始化，请先初始化超分
            }
        }
    }
});
```

### 初始化视频超分

在使用超分功能前，需要调用 [initVideoSuperResolution](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~ZegoExpressEngine#init-video-super-resolution) 接口初始化超分。

<Warning title="注意">


初始化视频超分为耗时操作，在 SDK 生命周期执行一次即可，不建议频繁初始化、反初始化超分。
</Warning>

```java
engine.initVideoSuperResolution();
```


### 开启视频超分

开发者可以选择在拉流前或者拉流中开启视频超分功能，以在拉流前对流 “STREAM_ID” 开启超分功能为例：

```java
engine.enableVideoSuperResolution("STREAM_ID", true);
```

开启超分功能后，需要监听回调 [onPlayerVideoSuperResolutionUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~IZegoEventHandler#on-player-video-super-resolution-update) ，以确认此次超分功能是否开启成功。

<Warning title="注意">


为了便于管理超分状态，建议在收到超分状态回调后，再开启下一次超分功能。
</Warning>

### 开始拉流

调用 [startPlayingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~ZegoExpressEngine#start-playing-stream)，传入 “STREAM_ID” 拉取远端用户的音视频流。

```java
engine.startPlayingStream("STREAM_ID", new ZegoCanvas(playView));
```

### 关闭视频超分

当不需要超分功能或者开启超分功能过程中发生错误（性能不足或原始视频分辨率超过限制）时，可关闭超分功能以释放系统资源。

```java
engine.enableVideoSuperResolution("STREAM_ID", false);
```

### 停止拉流

停止拉流后，SDK 会自动关闭超分功能并释放占用的系统资源。

```java
engine.stopPlayingStream("STREAM_ID");
```

### 反初始化视频超分

当不需要视频超分功能时，可以调用 [uninitVideoSuperResolution](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~ZegoExpressEngine#uninit-video-super-resolution) 接口反初始化视频超分，以节省内存。

```java
engine.uninitVideoSuperResolution();
```

<Content />

