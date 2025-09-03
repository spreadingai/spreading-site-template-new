# 自定义视频采集

- - -

## 功能简介

自定义视频采集，是指由开发者自行采集视频，向 ZEGO Express SDK 提供视频数据，并由 ZEGO Express SDK 进行编码推流的功能。当用户开启自定义视频采集的功能后，默认情况下，ZEGO Express SDK 在推流端内部将对本端预览画面进行渲染，用户无需自行进行渲染。

当开发者业务中出现以下情况时，推荐使用 SDK 的自定义视频采集功能：

- 开发者的 App 使用了第三方美颜厂商的美颜 SDK，可以直接对接 ZEGO Express SDK 的自定义视频采集功能。即由第三方美颜厂商的美颜 SDK 负责视频数据的采集和前处理，由 ZEGO Express SDK 负责视频数据的编码以及将音视频流推到 ZEGO 音视频云端。
- 直播过程中，开发者需要使用摄像头完成的额外功能和 ZEGO Express SDK 的默认的视频采集逻辑有冲突，导致摄像头无法正常使用。例如，直播到一半，需要录制短视频。
- 直播非摄像头采集的数据。例如本地视频文件播放、屏幕分享、游戏直播等。

## 示例源码下载

请参考 [下载示例源码](https://doc-zh.zego.im/article/3235) 获取源码。

相关源码请查看 “/Assets/ZegoExpressExample/Examples/AdvancedVideoProcessing/CustomVideoCapture.cs” 目录下的文件。

## 前提条件

在进行自定义视频采集前，请确保：

- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppID 和 AppSign，详情请参考 [控制台 - 项目信息](/console/project-info)。
- 已在项目中集成 ZEGO Express SDK，并实现了基本的音视频推拉流功能，详情请参考 [快速开始 - 集成](https://doc-zh.zego.im/article/3234) 和 [快速开始 - 实现流程](https://doc-zh.zego.im/article/8620)。



## 使用步骤

自定义视频采集的使用流程如下：

1. 创建 ZegoExpressEngine 引擎。
2. 调用 [EnableCustomVideoCapture](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoExpressEngine#enable-custom-video-capture) 接口，开启自定义视频采集功能。
3. 设置自定义视频采集回调对象并实现 [OnCustomVideoCaptureStart](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~IZegoEventHandler#on-custom-video-capture-start) 和 [OnCustomVideoCaptureStop](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~IZegoEventHandler#on-custom-video-capture-stop) 方法，分别用于接收自定义视频采集开始、结束的通知。
4. 登录房间，开始预览、推流后，将会触发 [OnCustomVideoCaptureStart](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~IZegoEventHandler#on-custom-video-capture-start) 自定义视频采集开始回调通知。
5. 调用 [SendCustomVideoCaptureRawData](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoExpressEngine#send-custom-video-capture-raw-data) 向 SDK 提供视频帧数据。
6. 结束推流，将收到 [OnCustomVideoCaptureStop](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~IZegoEventHandler#on-custom-video-capture-stop) 自定义视频采集回调通知停止采集。

API 接口调用的时序图如下：
<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Common/ZegoExpressEngine/custom_video_capture_uml_u3d.png" /></Frame>

<Warning title="注意">


开启自定义视频采集功能时，需要将 [EnableCamera](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoExpressEngine#enable-camera) 接口保持默认配置 “True”，否则推流没有视频数据。

</Warning>



### 1 开启自定义视频采集功能

通过 [ZegoCustomVideoCaptureConfig](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~struct~ZegoCustomVideoCaptureConfig) 创建自定义视频采集对象，设置属性 [bufferType](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~struct~ZegoCustomVideoCaptureConfig#buffer-type)，向 SDK 提供视频帧数据类型；调用 [EnableCustomVideoCapture](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoExpressEngine#enable-custom-video-capture) 接口开启自定义视频采集功能。

SDK 支持多种视频帧数据类型 [bufferType](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~struct~ZegoCustomVideoCaptureConfig#buffer-type)，开发者需告知 SDK 使用的数据类型。目前 Unity3D SDK 支持裸数据类型 `RawData`，设置其他枚举值将无法向 SDK 提供视频帧数据。


```csharp
ZegoCustomVideoCaptureConfig videoCaptureConfig = new ZegoCustomVideoCaptureConfig();
// 选择 RawData 类型视频帧数据
videoCaptureConfig.bufferType = ZegoVideoBufferType.RawData;

engine.enableCustomVideoCapture(true, videoCaptureConfig, ZegoPublishChannel.MAIN);
```

### 2 设置自定义视频采集回调

设置自定义视频采集的回调委托，实现 [OnCustomVideoCaptureStart](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~IZegoEventHandler#on-custom-video-capture-start) 和 [OnCustomVideoCaptureStop](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~IZegoEventHandler#on-custom-video-capture-stop) 自定义采集回调方法。

<Note title="说明">


当自定义采集多路流时，需要在 [OnCustomVideoCaptureStart](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~IZegoEventHandler#on-custom-video-capture-start) 及 [OnCustomVideoCaptureStop](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~IZegoEventHandler#on-custom-video-capture-stop) 回调中指定推流通道，否则默认只回调主路通道的通知。

</Note>



```csharp
// 设置自定义采集开始回调
engine.OnCustomVideoCaptureStart = (channel) =>
{
    // SDK 通知将要开始采集视频帧，收到该回调后向 SDK 发送的视频帧数据才有效
    // 通知开始视频采集
};
// 设置自定义采集停止回调
engine.OnCustomVideoCaptureStop = (channel) =>
{
    // SDK 通知将要停止采集视频帧
    // 停止视频采集
};
```

### 3 向 SDK 发送视频帧数据

在 Unity3D 中，支持采集场景中的摄像头或者本地摄像头的画面。例如，可以使用 Unity3D 中的 `WebCamTexture` 控制本地摄像头，或者通过 `RenderTexture` 采集游戏中的摄像头，作为视频采集源。

调用开始预览接口 [StartPreview](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoExpressEngine#start-preview) 或者开始推流接口 [StartPublishingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoExpressEngine#start-publishing-stream) 后，将会收到 [OnCustomVideoCaptureStart](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~IZegoEventHandler#on-custom-video-capture-start) 回调；开发者启动采集相关的业务逻辑后，调用发送自定义采集的视频帧数据接口向 SDK 发送视频帧数据，自定义采集的视频帧数据接口与 [1 开启自定义视频采集功能](https://doc-zh.zego.im/article/19233#4_1) 中向 SDK 提供视频帧数据类型 [bufferType](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~struct~ZegoCustomVideoCaptureConfig#buffer-type) 一一对应：

|视频帧类型|bufferType|发送视频帧数据接口|
|-|-|-|
|裸数据类型|RawData|[SendCustomVideoCaptureRawData ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoExpressEngine#send-custom-video-capture-raw-data)|


以下代码是调用 [SendCustomVideoCaptureRawData](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoExpressEngine#send-custom-video-capture-raw-data) 接口，以默认的 15 FPS 帧率向 SDK 发送视频帧数据。

```csharp
// 在 Unity 的 Update 接口中调用
void Update(){
    //自定义代码
    ...

    PushExternalVideoDataIfNeeded();

    //自定义代码
    ...
}

public void PushExternalVideoDataIfNeeded()
{
    //自定义代码
    ...

    ulong curTimeStamp = GetTimeStamp();
    // 1000/15 = 66.6 , 间隔 60 毫秒输入给 SDK 一帧数据，帧率fps = 15 帧左右
    if (curTimeStamp - lastTimeStamp > 60)
    {
        lastTimeStamp = curTimeStamp;

        ZegoVideoFrameParam videoFrameParam = new ZegoVideoFrameParam();

        //自定义代码
        ...

        // 设置外部采集的图像格式为 BGRA，对应 Unity 中 RGBA32
        videoFrameParam.format = ZegoVideoFrameFormat.BGRA32;
        // 宽
        videoFrameParam.width = w;
        // 高
        videoFrameParam.height = h;
        // 旋转角度
        videoFrameParam.rotation = getRealRotation();
        videoFrameParam.strides = new int[4];
        // 设置 stride，rgba 格式，只需要填 strides[0]，rgba 的 stride 为宽*4
        videoFrameParam.strides[0] = stride;
        UnityEngine.Debug.Log(String.Format("SendCustomVideoCaptureRawData, w:{0}, h:{1},", w, h));
        // 向 SDK 发送视频帧数据
        engine.SendCustomVideoCaptureRawData(
            Marshal.UnsafeAddrOfPinnedArrayElement(imgData, 0),
            (uint)(w * h * 4),
            videoFrameParam,
            curTimeStamp
        );
    }
}
```

停止推流或预览后，在退出房间或销毁引擎时，将会收到 [OnCustomVideoCaptureStop](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~IZegoEventHandler#on-custom-video-capture-stop) 回调，开发者可停止采集相关的业务逻辑，例如关闭摄像头等。


## 常见问题

1. **使用自定义视频采集，本地预览的画面正常，推出去观众端看到的画面变形了？**

    自定义视频采集进来的图像比例和 SDK 默认设置的分辨率的比例不一致（比如自定义视频采集进来的视频帧画面比例是 4:3，SDK 默认推流画面分辨率比例是 16:9）。解决方案：

    - 方案一：开发者自行将自定义视频采集的视频分辨率比例修改为 16:9。

    - 方案二：开发者调用 [SetVideoConfig](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoExpressEngine#set-video-config)，将 SDK 的推流分辨率比例自定义为 4:3。

3. **开启自定义视频采集后，采集的帧率和拉流播放帧率不一致？**

    当自定义采集的帧率和拉流播放帧率不一致时，可以通过如下方式处理：
    - 向 SDK 提供 “RAW_DATA” 类型视频帧数据时，设置 [SetVideoConfig](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoExpressEngine#set-video-config) 接口的帧率和调用自定义采集 [SendCustomVideoCaptureRawData](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoExpressEngine#send-custom-video-capture-raw-data) 接口提供的视频数据的帧率一致。

4. **SDK 接收视频帧数据方法内部对传入的数据是同步处理还是异步处理？**

    SDK 接收视频帧数据后，会先同步拷贝数据，然后再异步执行编码等操作，所以在将数据传入 SDK 后即可立即释放。


4. **如何在自定义视频采集时实现视频旋转？**

    当开发者使用自定义视频采集时，监听设备方向变化后，可参考以下两种方式实现横竖屏切换：

    - 自行处理视频帧数据：在设备方向变化的回调中，对采集到的视频帧数据做旋转处理，再将处理后的数据通过 [SendCustomVideoCaptureRawData](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoExpressEngine#send-custom-video-capture-raw-data) 接口传给 SDK。
    - 通过 SDK 处理视频帧数据：在设备方向变化的回调中，在将采集到的视频帧数据传给 SDK 之前，根据实际朝向设置 [ZegoVideoFrameParam](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~struct~ZegoVideoFrameParam) 中的 “rotation”，调用 [SendCustomVideoCaptureRawData](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoExpressEngine#send-custom-video-capture-raw-data) 接口传入视频帧数据和设置朝向的参数，将数据传给 SDK。




## 相关文档

- [怎么处理视频花屏或绿屏问题？](https://doc-zh.zego.im/faq/pixelated_green)
- [怎么处理音画不同步问题？](https://doc-zh.zego.im/faq/unsynchronized)
