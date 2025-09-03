# 同时推多路流

- - -

## 功能简介

Express SDK 提供了同时推多路流的能力。当开发者的业务中出现以下情况时，推荐使用 SDK 的推多路流的功能：

- 游戏主播主路流推摄像头画面，第二路流推屏幕采集画面。
- 户外主播主路流推前置摄像头，第二路流推后置摄像头。

<Note title="说明">

目前 SDK 支持最大推流通道数量为 4 路流，2.14.0 之前版本默认最大推流通道数量为 2 路。如需支持更多推流通道，请联系 ZEGO 技术支持进行特殊编包。
</Note>

## 示例源码下载

请参考 [下载示例源码](https://doc-zh.zego.im/article/13396) 获取源码。

相关源码，请查看下载的示例源码中的 “/ZegoExpressExample/AdvancedStreaming/src/main/java/im/zego/publishingmultiplestreams” 目录下的文件。


## 前提条件

在实现推多路流功能之前，请确保：

- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppID 和 AppSign，详情请参考 [控制台 - 项目信息](/console/project-info)。
- 已在项目中集成 ZEGO Express SDK，并实现了基本的音视频推拉流功能，详情请参考 [快速开始 - 集成](https://doc-zh.zego.im/article/13394) 和 [快速开始 - 实现流程](https://doc-zh.zego.im/article/13395)。




## 使用步骤

<Warning title="注意">


- 推除主路流以外的其他路流，无法直接获取摄像头数据。
- 默认情况下所推的非主路流只能推音频数据，若需要推音视频数据，需要开启自定义视频采集功能。
- 本文将介绍推辅路流实现方法，推其他非主路流实现方式同理。
</Warning>

### 1 创建 ZegoExpressEngine 引擎

请参考 [快速开始 - 实现视频通话](https://doc-zh.zego.im/article/13395#创建引擎) 的 “创建引擎”。

```java
ZegoEngineProfile profile = new ZegoEngineProfile();
profile.appID = appID;
profile.appSign = appSign;
profile.scenario = ZegoScenario.DEFAULT;
profile.application = getApplication();
engine = ZegoExpressEngine.createEngine(profile, null);
```

### 2（可选）设置自定义视频采集配置

<Accordion title="自定义视频采集配置设置" defaultOpen="false">
调用 [ZegoCustomVideoCaptureConfig ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Java_android~class~im-zego-zegoexpress-entity-zego-custom-video-capture-config) 接口创建自定义视频采集对象，设置属性 [bufferType ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Java_android~class~im-zego-zegoexpress-entity-zego-custom-video-capture-config#buffer-type)，向 SDK 提供视频帧数据类型；调用接口 [enableCustomVideoCapture ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Java_android~class~im-zego-zegoexpress-zego-express-engine#enable-custom-video-capture-1) 开启自定义视频采集功能，详情可参考 [自定义视频采集](https://doc-zh.zego.im/article/14804)。

<Note title="说明">



由于 Android 采集的多样性，SDK 支持多种视频帧数据类型 [bufferType ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Java_android~class~im-zego-zegoexpress-entity-zego-custom-video-capture-config#buffer-type)，开发者需告知 SDK 使用的数据类型。
</Note>



```java
ZegoCustomVideoCaptureConfig videoCaptureConfig = new ZegoCustomVideoCaptureConfig();
// 选择 RAW_DATA 类型视频帧数据
videoCaptureConfig.bufferType = ZegoVideoBufferType.RAW_DATA;
engine.enableCustomVideoCapture(true, videoCaptureConfig, ZegoPublishChannel.AUX);
```
</Accordion>


### 3（可选）设置辅助推流器自定义视频采集回调

<Accordion title="辅助推流器自定义视频采集回调设置" defaultOpen="false">
调用 [setCustomVideoCaptureHandler](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Java_android~class~im-zego-zegoexpress-zego-express-engine#set-custom-video-capture-handler) 设置自定义视频采集的通知回调，实现 [onStart](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Java_android~class~im-zego-zegoexpress-callback-i-zego-custom-video-capture-handler#on-start) 和 [onStop](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Java_android~class~im-zego-zegoexpress-callback-i-zego-custom-video-capture-handler#on-stop) 自定义采集回调方法。

```java
// 将自身作为自定义视频采集回调对象
sdk.setCustomVideoCaptureHandler(new IZegoCustomVideoCaptureHandler() {
    @Override
    public void onStart(ZegoPublishChannel channel) {
        // 收到回调后，开发者需要执行启动视频采集相关的业务逻辑，例如开启摄像头等
        ...
    }
    @Override
    public void onStop(ZegoPublishChannel channel) {
        // 收到回调后，开发者需要执行停止视频采集相关的业务逻辑，例如关闭摄像头等
        ...
    }
});
```
</Accordion>


### 4 调用辅助推流器方法实现预览和推流

登录房间后，调用开始预览接口 [startPreview ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Java_android~class~im-zego-zegoexpress-zego-express-engine#start-preview) 或者开始推流接口 [startPublishingStream ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Java_android~class~im-zego-zegoexpress-zego-express-engine#start-publishing-stream)，触发 [3 设置辅助推流器自定义视频采集回调](#3可选设置辅助推流器自定义视频采集回调) 的 [onStart](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Java~class~im-zego-zegoexpress-callback-i-zego-custom-video-capture-handler#on-start)。当 [onStart ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Java_android~class~im-zego-zegoexpress-callback-i-zego-custom-video-capture-handler#on-start) 回调触发后，开发者可以开始采集视频帧数据。


当停止推流 [stopPublishingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Java_android~class~im-zego-zegoexpress-zego-express-engine#stop-publishing-stream) 且停止预览 [stopPreview ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Java~class~im-zego-zegoexpress-zego-express-engine#stop-preview) 后，会触发 [3 设置辅助推流器自定义视频采集回调](#3可选设置辅助推流器自定义视频采集回调) 的 [onStop ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Java_android~class~im-zego-zegoexpress-callback-i-zego-custom-video-capture-handler#on-stop) 的回调，此时开发者应停止视频数据的采集。

```java
/**
*  启动预览，设置本地预览视图，视图模式采用 SDK 默认的模式，等比缩放填充整个 View
*  如下 preview_view 为 UI 界面上的 SurfaceView/TextureView/SurfaceTexture 对象
*/
engine.startPreview(new ZegoCanvas(preview_view), ZegoPublishChannel.AUX);

/** 开始推流 */
engine.startPublishingStream("stream1", ZegoPublishChannel.AUX);
```

### 5（可选）向 SDK 发送采集到视频帧数据


<Accordion title="向 SDK 发送采集到视频帧数据" defaultOpen="false">
当 [onStart ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Java_android~class~im-zego-zegoexpress-callback-i-zego-custom-video-capture-handler#on-start) 回调触发之后，开发者可以调用 [sendCustomVideoCaptureRawData ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Java_android~class~im-zego-zegoexpress-zego-express-engine#send-custom-video-capture-raw-data) 或 [sendCustomVideoCaptureTextureData ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Java_android~class~im-zego-zegoexpress-zego-express-engine#send-custom-video-capture-texture-data) 向 SDK 发送采集到的视频数据。

- 调用 [sendCustomVideoCaptureRawData ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Java_android~class~im-zego-zegoexpress-zego-express-engine#send-custom-video-capture-raw-data)

    ```java
    engine.sendCustomVideoCaptureRawData(buffer, data.length, param, System.currentTimeMillis(), ZegoPublishChannel.AUX);
    ```

- 调用 [sendCustomVideoCaptureTextureData ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Java_android~class~im-zego-zegoexpress-zego-express-engine#send-custom-video-capture-texture-data)

    ```java
    engine.sendCustomVideoCaptureTextureData(textureID, width, height, System.currentTimeMillis(), egoPublishChannel.AUX);
    ```
</Accordion>


### 6 设置辅助推流器事件回调

调用辅助推流器的 [setEventHandler](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Java_android~class~im-zego-zegoexpress-zego-express-engine#set-event-handler) 接口为辅助推流器设置事件回调，以接收辅助推流器“推流状态改变回调”、“推流质量回调”、“推流首帧回调”等通知。

```java
engine.setEventHandler(new IZegoEventHandler(){

    // 重写的其他回调
    ...

    @Override
    public void onPublisherStateUpdate(String streamID, ZegoPublisherState state, int errorCode, JSONObject extendedData){
        // 进行对应的推流动作结果的逻辑
        ...
    }
    @Override
    public void onPublisherQualityUpdate(String streamID, ZegoPublishStreamQuality quality){
        // 进行对应的推流中途流质量相关显示等业务逻辑
        ...
    }
    @Override
    public void onPublisherCapturedVideoFirstFrame(ZegoPublishChannel channel){
        // SDK 第一次收到到视频数据的通知
        ...
    }
    @Override
    public void onPublisherVideoSizeChanged(int width, int height, ZegoPublishChannel channel){
        // 开发者可以在此回调里去掉显示视频的 UI 遮罩空间等逻辑
    }
    @Override
    public void onPublisherRelayCDNStateUpdate(String streamID, ArrayList<ZegoStreamRelayCDNInfo> infoList){
        // 流转推到 CDN 的通知
    }

    // 重写的其他回调
    ...

});

```


## 常见问题

1. **[onStart](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Java_android~class~im-zego-zegoexpress-callback-i-zego-custom-video-capture-handler#on-start) 什么时候会回调？**

    当开启了自定义视频采集的情况下，SDK 开始推流 [startPublishingStream ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Java_android~class~im-zego-zegoexpress-zego-express-engine#start-publishing-stream) 或启动预览 [startPreview ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Java_android~class~im-zego-zegoexpress-zego-express-engine#start-preview) 的时候会触发。

2. **是否支持同时推 4 路以上的流？**

    为了配合实时信令功能，目前 SDK 默认最大推流通道数量为 4 路，但 2.14.0 之前版本默认最大推流通道数量为 2 路。如需支持更多推流通道，请联系 ZEGO 技术支持进行特殊编包。

<Content />

