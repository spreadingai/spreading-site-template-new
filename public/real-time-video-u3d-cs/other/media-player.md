# 媒体播放器

- - -


## 功能简介

媒体播放器组件提供播放音视频媒体文件的能力，并且支持将播放的媒体文件的音画数据推流出去。

### 应用场景

- 播放测试音频：可以使用媒体播放器播放测试音频，验证音频播放设备是否工作正常。
- 播放背景音乐：使用媒体播放器播放音乐并混在流中推送出去，让远端听到背景音乐。
- 播放视频文件：结合自定义视频采集功能将媒体资源的视频数据推送出去，远端可拉流观看。

### 支持格式

媒体播放器默认支持以下格式和协议：

**视频编码格式：**
- H263、H264、H265、MPEG4、MJPEG

**音频编码格式：**
- AAC、MP2、MP3、FLAC、WMA V1、WMA V2、PCM、AC3、EAC3

**容器格式：**
- WAV、FLAC、MP3、MP4、MOV、MPEG-TS、FLV、Matroska(MKV)、AVI、ASF、JPEG

**支持协议：**
- HTTP、HTTPS、HLS

<Note title="说明">

如需支持其它格式，请联系 ZEGO 技术支持。
</Note>
<Content />

## 示例源码下载

请参考 [下载示例源码](https://doc-zh.zego.im/article/3235) 获取源码。

相关源码请查看 “/ZegoExpressExample/Examples/Others/MediaPlayer” 目录下的文件。

## 前提条件

在实现媒体播放器功能之前，请确保：

- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppID 和 AppSign，详情请参考 [控制台 - 项目信息](/console/project-info)。
- 已在项目中集成 ZEGO Express SDK，并实现了基本的音视频推拉流功能，详情请参考 [快速开始 - 集成](https://doc-zh.zego.im/article/3234) 和 [快速开始 - 实现流程](https://doc-zh.zego.im/article/8620)。



## 使用步骤

### 1 创建媒体播放器

调用 `ZegoExpressEngine` 的成员方法 [CreateMediaPlayer](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoExpressEngine#create-media-player) 接口，以创建媒体播放器实例。一个媒体播放器实例只能播放一个音视频，引擎同一时间最多支持创建 10 个播放器实例，以达到同时播放多个媒体资源的效果。若当前已存在 10 个播放器实例，再次调用创建播放器接口将返回 `null`。

- 调用示例

    ```csharp
    //创建媒体播放器实例对象, 目前最多支持创建 4 个实例，超过后将返回 null
    ZegoMediaPlayer mediaplayer = mEngine.CreateMediaPlayer();
    if (mediaplayer != null) {
    // sucess
    } else {
    // fail
    }
    ```

### 2（可选）为播放器设置事件回调

<Accordion title="播放器事件设置回调" defaultOpen="false">
可以设置媒体播放器回调事件委托，以接收“播放器播放状态改变”、“播放器网络状态更新”、“播放器播放进度改变”等通知。


- 调用示例

    ```csharp
    void OnMediaPlayerStateUpdate(ZegoMediaPlayer mediaPlayer, ZegoMediaPlayerState state, int errorCode)
    {
        // 本回调在 UI 线程被回调，开发者可以在此进行 UI 的变化，例如播放按钮的变化
    }

    void OnMediaPlayerNetworkEvent(ZegoMediaPlayer mediaPlayer, ZegoMediaPlayerNetworkEvent networkEvent)
    {
        // 本回调在 UI 线程被回调，开发者可以在此进行 UI 的变化，例如网络不好的情况做友好的提示
    }

    void OnMediaPlayerPlayingProgress(ZegoMediaPlayer mediaPlayer, ulong millisecond)
    {
        // 本回调在 UI 线程被回调，开发者可以在此进行 UI 的变化，例如进度条的变化
    }

    mediaplayer.OnMediaPlayerPlayingProgress = OnMediaPlayerStateUpdate;
    mediaplayer.OnMediaPlayerPlayingProgress = OnMediaPlayerNetworkEvent ;
    mediaplayer.OnMediaPlayerPlayingProgress = OnMediaPlayerPlayingProgress;
    ```
</Accordion>


### 3 加载媒体文件

<Warning title="注意">


如果该媒体资源已经被 [LoadResource](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoMediaPlayer#load-resource) 或者正在播放，请先调用 [Stop](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoMediaPlayer#stop) 接口停止播放，然后再调用 [LoadResource](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoMediaPlayer#load-resource) 接口加载媒体资源，否则无法加载成功。

</Warning>



调用媒体播放器的 [LoadResource](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoMediaPlayer#load-resource) 指定要播放的媒体资源，资源路径可以是本地资源的绝对路径，也可以是网络资源的 URL，如 `http://your.domain.com/your-movie.mp4`。用户可通过传入回调参数的方式获取加载文件的结果。

若用户需要加载二进制音频数据时，可调用媒体播放器的 [LoadResourceFromMediaData](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoMediaPlayer#load-resource-from-media-data) 指定要播放的二进制音频数据。用户可通过传入回调参数的方式获取加载数据的结果。


- 调用示例

    ```csharp
    /**
    * 加载媒体资源
    *
    * 可传本地资源的绝对路径或者网络资源的 URL
    * @param path 本地资源路径或网络资源的 URL
    * @param callback 资源加载结果的通知
    */
    mediaplayer.LoadResource("sourcePath", (int errorcode)=>{
        // 本回调在主线程被回调，开发者可以在此进行 UI 的变化
    });

    /**
    * 加载二进制音频数据
    *
    * @param mediaData 二进制音频数据
    * @param startPosition 指定开始播放的进度，单位毫秒
    * @param callback 资源加载结果的通知
    */
    mediaplayer.LoadResourceFromMediaData(data, position, (int errorcode)=>{
        // 本回调在 UI 线程被回调，开发者可以在此进行 UI 的变化
    });
    ```

### 4 播放控制

#### 播放状态控制

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Common/ZegoExpressEngine/mediaplayer_state_flutter.jpg" /></Frame>

- **播放启停**：在调用 [loadResource](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoMediaPlayer#load-resource) 加载文件成功后，可调用 [Start](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoMediaPlayer#start)、[Pause](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoMediaPlayer#pause)、[Resume](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoMediaPlayer#resume)、[Stop](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoMediaPlayer#stop) 来启停播放。一旦播放器的内部状态改变，[onMediaplayerStateUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~IZegoMediaPlayerHandler#on-media-player-state-update) 回调将会被触发。
- **获取当前播放状态**：用户可通过调用 [GetCurrentState](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoMediaPlayer#get-current-state) 随时获取播放器的当前状态。
- **是否重复播放**：如果 [EnableRepeat](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoMediaPlayer#enable-repeat) 设置为 `true`，则播放器会在播放完文件后自动重播。

- 调用示例

    ```csharp
    // 设置是否重复播放
    mediaplayer.EnableRepeat(true);
    // 开始播放，播放前需要先加载资源
    mediaplayer.Start();
    // 暂停播放
    mediaplayer.Pause();
    // 恢复播放
    mediaplayer.Resume();
    // 停止播放
    mediaplayer.Stop();
    ```

#### 播放进度控制

- **播放器播放进度回调**：播放文件的进度会通过 [OnMediaPlayerPlayingProgress](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~IZegoMediaPlayerHandler#on-media-player-playing-progress) 方法回调，默认触发回调的间隔是 1000 ms，可通过 [SetProgressInterval](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoMediaPlayer#set-progress-interval) 更改此间隔。
- **获取当前播放进度**：用户可通过 [GetCurrentProgress](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoMediaPlayer#get-current-progress) 来获取当前播放进度。
- **调整播放进度**：通过 [SeekTo](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoMediaPlayer#seek-to) 接口来调整进度。

- 调用示例

    ```csharp
    // 设置播放进度回调间隔, 单位为毫秒, 可通过此接口控制 [OnMediaPlayerPlayingProgress] 的回调频率
    mediaplayer.SetProgressInterval(2000);
    // 获取当前播放进度
    ulong progress = mediaplayer.GetCurrentProgress();
    mediaplayer.SeekTo(mediaplayer.GetTotalDuration() / 2, (int errorcode)=>{
        // 本回调在 UI 线程被回调，开发者可以在此进行 UI 的变化
    });
    ```

#### 播放速度控制

**设置当前播放速度**：加载资源完成后，用户可通过 [SetPlaySpeed](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoMediaPlayer#set-play-speed) 来设置当前播放速度。

- 调用示例

    ```csharp
    // 设置 2 倍速播放, 必须在加载资源完成后才能调用, 播放速度范围为 0.5 ~ 4.0，默认为 1.0
    mediaplayer.SetPlaySpeed(2.0);
    ```

#### 播放器音频控制

- **获取及控制播放音量**：通过 [GetPlayVolume](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoMediaPlayer#get-play-volume) 和 [SetPlayVolume](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoMediaPlayer#set-play-volume) 获取和控制播放音量。
- **获取和控制推流音量**：通过 [GetPublishVolume](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoMediaPlayer#get-publish-volume) 和 [SetPublishVolume](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoMediaPlayer#set-publish-volume) 获取和控制推流音量。
- **静默本地播放**：通过调用 [MuteLocal](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoMediaPlayer#mute-local) 可以控制本地静音播放。
- **将播放器的声音混入正在推的主通道中**：通过调用 [EnableAux](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoMediaPlayer#enable-aux) 可以将文件的声音混入正在推的流中。

<Note title="说明">


如果要使用混音能力，必须要 [设置麦克风权限](https://doc-zh.zego.im/article/3234#3)，如果您不希望录制麦克风的声音，可以通过 [MuteMicrophone](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoExpressEngine#mute-microphone) 静音麦克风。


</Note>



- 调用示例

    ```csharp
    int playVolume = mediaplayer.GetPlayVolume();
    // 设置播放器音量为原先的一半
    mediaplayer.SetPlayVolume(playVolume / 2);
    // 开启将资源的声音混入正在推的流中
    mediaplayer.EnableAux(true);
    // 开启本地静默播放
    mediaplayer.MuteLocal(true);
    ```

- **获取文件的音频数据**：如果想获取文件的音频数据，可通过 [SetAudioHandler](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoMediaPlayer#set-audio-handler) 来设置音频帧回调。

- 调用示例

    ```csharp
    // 播放器抛音频数据的回调, 可以通过设置此回调将媒体播放器播放的媒体资源文件的音频数据抛出来
    mediaplayer.SetAudioHandler((ZegoMediaPlayer mediaPlayer, System.IntPtr data, uint dataLength, ZegoAudioFrameParam param) =>{
        // 开发者可以在这个回调里对该抛出的音频帧数据进行处理，例如进行本地存储、音效处理等
    });
    ```

#### 播放器视频控制

如果想获取文件的视频数据，可通过 [SetVideoHandler](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoMediaPlayer#set-video-handler) 来设置视频帧回调。

- 调用示例

    ```csharp
    // 播放器抛视频数据的回调, 可以通过设置此回调将媒体播放器播放的媒体资源文件的视频数据抛出来
    mediaPlayer.SetVideoHandler((ZegoMediaPlayer mediaPlayer, System.IntPtr[] data, uint[] dataLength, ZegoVideoFrameParam param, string extraInfo)=>{
        // 开发者可以在这个回调里对该抛出的视频帧数据进行处理，例如进行本地存储、视频图层混合
    }, ZegoVideoFrameFormat.ARGB32);// 第二个参数一般应指定为平台默认的视频帧格式
    ```

#### 将播放器播放的视频推流出去

1. 将播放器的视频推流出去前，需要先通过 [SetVideoHandler](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoMediaPlayer#set-video-handler) 设置视频帧回调监听，用于获取 [OnVideoFrame](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~IZegoMediaPlayerHandler#on-video-frame) 抛出的视频帧数据。

2. 使用自定义方式采集视频，并将获取到的视频数据混入推流数据中，详细操作请参考 [自定义视频采集](https://doc-zh.zego.im/article/19233)。

<Note title="说明">


自定义采集数据时，建议开发者自行定义一个 “flag” 标记位：

- 当触发 [OnCustomVideoCaptureStart](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~IZegoEventHandler#on-custom-video-capture-start) 回调时将 “flag” 标记设置为 “True”，表示可以开始将自定义采集的视频数据发送给 SDK。
- 当触发 [OnCustomVideoCaptureStop](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~IZegoEventHandler#on-custom-video-capture-stop) 回调时将 “flag” 标记设置为 “False”，表示需要停止发送采集的视频数据给 SDK。

</Note>



3. 开发者需要在 [OnVideoFrame](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~IZegoMediaPlayerHandler#on-video-frame) 中添加对 “flag” 的判断逻辑，当 “flag” 设置为 “True” 时（即触发了 [OnCustomVideoCaptureStart ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~IZegoEventHandler#on-custom-video-capture-start) 回调），调用 [SendCustomVideoCaptureRawData](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoExpressEngine#send-custom-video-capture-raw-data) 方法向 SDK 发送已获取的视频数据。

4. 调用 [StartPublishingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoExpressEngine#start-publishing-stream) 开始推流，请参考 [快速开始 - 实现流程](https://doc-zh.zego.im/article/8620#publishingStream) 的 “推流”。


#### 变声

处理类似于 KTV 中对伴奏升降调等场景时，可以调用媒体播放器的 [SetVoiceChangerParam](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoExpressEngine#set-voice-changer-param) 接口来实现变声功能。开发者可通过 [ZegoVoiceChangerParam](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~struct~ZegoVoiceChangerParam#zego-voice-changer-param) 对象中的音高参数 `pitch` 设置变声效果，该参数取值范围为 [-12.0, 12.0]，值越大声音越尖锐，默认值为 “0.0”（即关闭变声器）。

- 调用示例

    ```csharp
    ZegoVoiceChangerParam param = new ZegoVoiceChangerParam()
    param.pitch = 8.0f;     // 男声变童声
    param.pitch = 4.0f;     // 男声变女声
    param.pitch = 6.0f;     // 女声变童声
    param.pitch = -3.0f;    // 女声变男声
    mediaplayer.SetVoiceChangerParam(ZegoMediaPlayerAudioChannel.All, voiceChangerParam);
    ```

#### 渲染视频画面

当播放器播放视频时，需要通过自定义渲染来播放视频画面，参考示例代码如下：

- 调用示例

    ```csharp
    //使用 RawImage 渲染
    RawImageCustomVideoSurface rawImageVideoSurface;
    //使用 Renderer 渲染
    RendererCustomVideoSurface rendererVideoSurface;

    rawImageVideoSurface = GameObject.Find("RawImage_MediaPlayer").AddComponent<RawImageCustomVideoSurface>();
    rendererVideoSurface = GameObject.Find("Plane_MediaPlayer").AddComponent<RendererCustomVideoSurface>();
    // 旋转到合适的角度
    rendererVideoSurface.transform.Rotate(90.0f, -180.0f, 0.0f);
    rendererVideoSurface.transform.localScale = new Vector3(10f, 10f, 10f);

    // 监听视频帧数据
    mediaPlayer.SetVideoHandler((ZegoMediaPlayer mediaPlayer, System.IntPtr[] data, uint[] dataLength, ZegoVideoFrameParam param, string extraInfo) =>
    {
        // 使用自定义渲染加载原始视频数据
        if(rawImageVideoSurface)
        {
            rawImageVideoSurface.LoadNativeVideoRawData(data[0], param.width, param.height, param.strides, param.format);
        }

        //if(rendererVideoSurface)
        //{
        //    rendererVideoSurface.LoadNativeVideoRawData(data[0], param.width, param.height, param.strides, param.format);
        //}
    }, ZegoVideoFrameFormat.RGBA32);
    ```

### 5 销毁媒体播放器

使用完播放器之后，需要及时的调用 [DestroyMediaPlayer](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoExpressEngine#destroy-media-player) 销毁接口以释放占用的资源。

- 调用示例

    ```csharp
    // 销毁媒体播放器实例对象
    mEngine.DestroyMediaPlayer(mediaplayer);
    // 在调用接口销毁的时候，为避免内存泄漏，开发者须自己手动释放业务层所持有的引用
    mediaplayer = null;
    ```

## 常见问题

**如何在播放中途切换播放资源？**

  先调用播放器的 [Stop](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoMediaPlayer#stop) 接口停止播放，然后重新调用 [LoadResource](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoMediaPlayer#load-resource) 接口加载新资源。
