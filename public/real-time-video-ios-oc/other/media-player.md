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

请参考 [下载示例源码](/real-time-video-ios-oc/quick-start/run-example-code) 获取源码。

相关源码请查看 “/ZegoExpressExample/Examples/Others/MediaPlayer” 目录下的文件。

## 前提条件

在实现媒体播放器功能之前，请确保：

- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppID 和 AppSign，详情请参考 [控制台 - 项目信息](/console/project-info)。
- 已在项目中集成 ZEGO Express SDK，并实现了基本的音视频推拉流功能，详情请参考 [快速开始 - 集成](https://doc-zh.zego.im/article/196) 和 [快速开始 - 实现流程](https://doc-zh.zego.im/article/7628)。


## 使用步骤

### 1 创建媒体播放器

调用 “ZegoExpressEngine” 的 [createMediaPlayer](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~ObjectiveC~class~zego-express-engine#create-media-player) 接口以创建媒体播放器实例。一个媒体播放器实例只能播放一个音视频，引擎同一时间最多支持创建 10 个播放器实例，以达到同时播放多个媒体资源的效果。若当前已存在 10 个播放器实例，再次调用创建播放器接口将返回 `nil`。

- 调用示例

    ```objc
    ZegoMediaPlayer *mediaPlayer = [[ZegoExpressEngine sharedEngine] createMediaPlayer];

    if (mediaPlayer) {
        self.mediaPlayer = mediaPlayer;
    } else {
        NSLog(@"创建播放器失败");
    }
    ```

### 2（可选）为播放器设置事件回调

<Accordion title="播放器事件回调设置" defaultOpen="false">
调用媒体播放器的 [setEventHandler](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~ObjectiveC~class~zego-media-player#set-event-handler) 接口为播放器设置事件回调，以接收“播放器播放状态改变”、“播放器网络状态更新”、“播放器播放进度改变”等通知。

- 调用示例

    ```objc
    // 此处示例 self 实现了 `ZegoMediaPlayerEventHandler` 协议
    [self.mediaPlayer setEventHandler:self];
    ```

    ```objc
    // 播放器播放状态回调

    // @param mediaPlayer 回调的播放器实例
    // @param state 播放器状态
    // @param errorCode 错误码，详情请参考常用错误码文档
    - (void)mediaPlayer:(ZegoMediaPlayer *)mediaPlayer stateUpdate:(ZegoMediaPlayerState)state errorCode:(int)errorCode {
        switch (state) {
            case ZegoMediaPlayerStateNoPlay:
                // 播放停止状态
                break;
            case ZegoMediaPlayerStatePlaying:
                // 正在播放状态
                break;
            case ZegoMediaPlayerStatePausing:
                // 暂停状态
                break;
            case ZegoMediaPlayerStatePlayEnded:
                // 当前曲目播放完成，可执行播放下一首等操作
                break;
        }
    }

    // 播放器网络状态回调

    // @param mediaPlayer 回调的播放器实例
    // @param networkEvent 网络状态事件
    - (void)mediaPlayer:(ZegoMediaPlayer *)mediaPlayer networkEvent:(ZegoMediaPlayerNetworkEvent)networkEvent {
        if (networkEvent == ZegoMediaPlayerNetworkEventBufferBegin) {
            // 展示 Loading UI
        } else if (networkEvent == ZegoMediaPlayerNetworkEventBufferEnded) {
            // 关闭 Loading UI
        }
    }

    // 播放器播放进度回调

    // @param mediaPlayer 回调的播放器实例
    // @param millisecond 进度，单位为毫秒
    - (void)mediaPlayer:(ZegoMediaPlayer *)mediaPlayer playingProgress:(unsigned long long)millisecond {
        // 更新进度条
    }
    ```
</Accordion>

### 3 加载媒体资源

调用媒体播放器的 [loadResource](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~ObjectiveC~class~zego-media-player#load-resource-callback) 指定要播放的媒体资源，可以是本地资源的绝对路径，也可以是网络资源的 URL，如 `http://your.domain.com/your-movie.mp4`。用户可通过传入回调参数的方式获取加载文件的结果。

- 调用示例

    ```objc
    // 此处示例获取 App 包内的 sample.mp4 文件绝对路径
    NSString *fileURL = [[NSBundle mainBundle] pathForResource:@"sample" ofType:@"mp4"];

     // 加载资源，可传本地资源的绝对路径或者网络资源的 URL
    [self.mediaPlayer loadResource:fileURL callback:^(int errorCode) {
        // 可执行更新 UI 等逻辑
        if (errorCode == 0) {
             // 加载文件成功，此时可以开始播放媒体资源
             // [self.mediaPlayer start];
        }
    }];
    ```

若用户需要加载二进制音频数据时，可调用媒体播放器的 [loadResourceFromMediaData](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~ObjectiveC_ios~class~zego-media-player&jumpType=route#load-resource-from-media-data-start-position-callback) 指定要播放的二进制音频数据。用户可通过传入回调参数的方式获取加载数据的结果。

- 调用示例

    ```objc
     //加载资源，传入需要加载的二进制音频数据及起始位置
    [self.mediaPlayer loadResourceFromMediaData:data startPosition:0L callback:^(int errorCode) {
        // 可执行更新 UI 等逻辑
        if (errorCode == 0) {
             // 加载文件成功，此时可以开始播放媒体资源
            // [self.mediaPlayer start];
        }
    }];
    ```

<Warning title="注意">

如果该媒体资源已经被 [loadResource](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoMediaPlayer#load-resource-callback) 或者正在播放，请先调用 [stop](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoMediaPlayer#stop) 接口停止播放，然后再调用 [loadResource](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoMediaPlayer#load-resource-callback) 接口加载新的媒体资源，否则无法加载成功。
</Warning>

### 4 播放控制

#### 播放状态控制

在调用 [loadResource](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoMediaPlayer#load-resource-audio-effect-id-callback) 加载文件成功后，可调用 [start](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~ObjectiveC~class~zego-media-player#start)、[pause](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~ObjectiveC~class~zego-media-player#pause)、[resume](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~ObjectiveC~class~zego-media-player#resume)、[stop](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~ObjectiveC~class~zego-media-player#stop) 来启停播放。一旦播放器的内部状态改变，ZegoMediaPlayer 的 [stateUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~ObjectiveC~protocol~zego-media-player-event-handler#media-player-state-update-error-code) 回调将会被触发。

用户也可通过调用 [currentState](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~ObjectiveC~class~zego-media-player#current-state) 随时获取播放器的当前状态。

如果 [enableRepeat](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~ObjectiveC~class~zego-media-player#enable-repeat) 设置为 “YES”，则播放器会在播放完文件后自动重播。


```objc
// 设置是否重复播放
[self.mediaPlayer enableRepeat:YES];
// 开始播放，播放之前需要先调用接口加载媒体文件
[self.mediaPlayer start];
// 暂停
[self.mediaPlayer pause];
// 恢复
[self.mediaPlayer resume];
// 停止
[self.mediaPlayer stop];
```

播放状态转换示意图：

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Common/ZegoExpressEngine/mediaplayer_state_iOS.jpg" /></Frame>

#### 播放进度控制

播放文件的进度会通过 [mediaPlayer:playingProgress](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~ObjectiveC~protocol~zego-media-player-event-handler#media-player-playing-progress) 方法回调，默认触发回调的间隔是 1000 ms，可通过 [setProgressInterval](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~ObjectiveC~class~zego-media-player#set-progress-interval) 更改此间隔。

用户也可通过 [currentProgress](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~ObjectiveC~class~zego-media-player#current-progress) 来获取当前播放进度。

通过 [seekTo](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~ObjectiveC~class~zego-media-player#seek-to-callback) 接口可以调整播放进度。

- 调用示例

    ```objc
    // 设置播放进度回调间隔为 1000ms，即每 1000 ms 会收到一次 - (void)mediaPlayer:(ZegoMediaPlayer *)mediaPlayer playingProgress:(unsigned long long)millisecond 回调
    [self.mediaPlayer setProgressInterval:1000];

    // 获取当前播放的媒体文件的总时长，单位毫秒
    unsigned long long totalDuration = self.mediaPlayer.totalDuration;

    // 获取播放器的播放进度，单位毫秒
    unsigned long long progress = self.mediaPlayer.currentProgress;

    NSLog(@"process: %llu", progress);

    // 播放进度跳转到一半的总时长，进度的单位为毫秒
    [self.mediaPlayer seekTo:totalDuration/2 callback:^(int errorCode) {
        NSLog(@"errorCode: %d", errorCode);
    }];
    ```

#### 播放速度控制

加载资源完成后，用户可通过 [setPlaySpeed](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~ObjectiveC_ios~class~zego-media-player&jumpType=route#set-play-speed) 来设置当前播放速度。

- 调用示例

    ```objc
    // 设置播放器的播放倍速，必须在加载资源完成后才能调用
    // 设置 2 倍速播放，播放速度范围为 0.3 ~ 4.0，默认为 1.0
    [self.mediaPlayer setPlaySpeed:2.0];
    ```

#### 播放器音频控制

通过 [playVolume](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~ObjectiveC~class~zego-media-player#play-volume) 和 [setPlayVolume](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~ObjectiveC~class~zego-media-player#set-play-volume) 获取和控制播放音量。

通过 [publishVolume](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~ObjectiveC~class~zego-media-player#publish-volume) 和 [setPublishVolume](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~ObjectiveC~class~zego-media-player#set-publish-volume) 获取和控制推流音量。

调用 [enableAux](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~ObjectiveC~class~zego-media-player#enable-aux) 可以将文件的声音混入正在推的流中。

<Note title="说明">


如果要使用混音能力，必须要 [设置麦克风权限](/real-time-video-ios-oc/quick-start/integrating-sdk)，如果您不希望录制麦克风的声音，可以通过 [muteMicrophone](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoExpressEngine#mute-microphone) 静音麦克风。
</Note>


调用 [muteLocal](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~ObjectiveC~class~zego-media-player#mute-local) 可以使本地静默播放但能正常将声音混入流。

```objc
// 获取播放器当前播放音量
int playVolume = self.mediaPlayer.playVolume;

// 设置播放器音量为原先的一半
[self.mediaPlayer setPlayVolume:playVolume/2];

// 获取当前播放器推流的音量
int publishVolume = [self.mediaPlayer publishVolume];

// 设置播放器推流音量
[self.mediaPlayer setPublishVolume:publishVolume];

// 开启将资源的声音混入正在推的流中
[self.mediaPlayer enableAux:YES];

// 开启本地静默播放
[self.mediaPlayer muteLocal:YES];
```

如果想获取文件的音频数据，可通过 [setAudioHandler](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~ObjectiveC~class~zego-media-player#set-audio-handler) 来设置音频帧回调。


- 调用示例

    ```objc
    // 此处示例 self 实现了 `ZegoMediaPlayerAudioHandler` 协议并调用播放器的 set 接口
    [self.mediaPlayer setAudioHandler:self];
    ```

    ```objc
    // 播放器音频帧数据回调
    // @param mediaPlayer 回调的播放器实例
    // @param data 音频帧的裸数据
    // @param dataLength 数据的长度
    // @param param 音频帧参数
    - (void)mediaPlayer:(ZegoMediaPlayer *)mediaPlayer audioFrameData:(const unsigned char *)data dataLength:(unsigned int)dataLength param:(ZegoAudioFrameParam *)param {
    // 收到媒体播放器音频数据回调
    }
    ```

#### 播放器视频控制

当播放视频资源时，用 [setPlayerCanvas](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~ObjectiveC~class~zego-media-player#set-player-canvas) 来设置视频的显示视图。

- 调用示例

    ```objc
    // 设置播放视图
    [self.mediaPlayer setPlayerCanvas:[ZegoCanvas canvasWithView:self.mediaPlayerView]];
    ```

如果想获取文件的视频数据，可通过 [setVideoHandler](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~ObjectiveC~class~zego-media-player#set-video-handler-format-type) 来设置视频帧回调。

- 接口原型

    ```objc
    // 设置播放器视频数据回调，希望接收的视频帧数据格式以及数据类型
    - (void)setVideoHandler:(nullable id<ZegoMediaPlayerVideoHandler>)handler format:(ZegoVideoFrameFormat)format type:(ZegoVideoBufferType)type;
    ```

    ```objc
    @protocol ZegoMediaPlayerVideoHandler <NSObject>

    @optional

    // 播放器视频帧裸数据回调
    // @param mediaPlayer 回调的播放器实例
    // @param data 视频帧的裸数据（例：RGBA 只需考虑 data[0]，I420 需考虑 data[0,1,2]）
    // @param dataLength 数据的长度（例：RGBA 只需考虑 dataLength[0]，I420 需考虑 dataLength[0,1,2]）
    // @param param 视频帧参数
    - (void)mediaPlayer:(ZegoMediaPlayer *)mediaPlayer videoFrameRawData:(const unsigned char * _Nonnull * _Nonnull)data dataLength:(unsigned int *)dataLength param:(ZegoVideoFrameParam *)param;

    // 播放器视频帧 CVPixerBuffer 数据回调
    // @param mediaPlayer 回调的播放器实例
    // @param buffer 封装为 CVPixerBuffer 的视频帧数据
    // @param param 视频帧参数
    - (void)mediaPlayer:(ZegoMediaPlayer *)mediaPlayer videoFramePixelBuffer:(CVPixelBufferRef)buffer param:(ZegoVideoFrameParam *)param;

    @end
    ```

- 调用示例

    ```objc
    // 设置视频数据格式为 NV12，数据类型为 CVPixelBuffer
    [self.mediaPlayer setVideoHandler:self format:ZegoVideoFrameFormatNV12 type:ZegoVideoBufferTypeCVPixelBuffer];
    ```

    ```objc
    // 播放器视频帧 CVPixerBuffer 数据回调
    // @param mediaPlayer 回调的播放器实例
    // @param buffer 封装为 CVPixerBuffer 的视频帧数据
    // @param param 视频帧参数
    - (void)mediaPlayer:(ZegoMediaPlayer *)mediaPlayer videoFramePixelBuffer:(CVPixelBufferRef)buffer param:(ZegoVideoFrameParam *)param {
    // NSLog(@"pixel buffer video frame callback. format:%d, width:%f, height:%f", (int)param.format, param.size.width, param.size.height);
    }
    ```

<Warning title="注意">

当数据类型 “type” 设为 “ZegoVideoBufferTypeCVPixelBuffer” 时，数据格式 “format” 仅支持设为 “ZegoVideoFrameFormatI420”、“ZegoVideoFrameFormatNV12”、“ZegoVideoFrameFormatBGRA32”、
“ZegoVideoFrameFormatARGB32”；设为其他不支持的格式后续将不会回调视频帧数据。

</Warning>


#### 将播放器播放的视频推流出去

1. 将播放器的视频推流出去前，需要先通过 [setVideoHandler](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~ObjectiveC~class~zego-media-player#set-video-handler-format-type) 设置视频帧回调监听，用于获取 [videoFrameRawData](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~ObjectiveC_ios~protocol~zego-media-player-video-handler#media-player-video-frame-raw-data-data-length-param) 或 [videoFramePixelBuffer](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~ObjectiveC_ios~protocol~zego-media-player-video-handler#media-player-video-frame-pixel-buffer-param) 抛出的视频帧数据。

2. 使用自定义方式采集视频，并将获取到的视频数据混入推流数据中，详细操作请参考 [自定义视频采集](/real-time-video-ios-oc/video/custom-video-capture)。

<Note title="说明">

自定义采集数据时，建议开发者自行定义一个 “flag” 标记位：

- 当触发 [onStart](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~ObjectiveC~protocol~zego-custom-video-capture-handler#on-start) 回调时将 “flag” 标记设置为 “True”，表示可以开始将自定义采集的视频数据发送给 SDK。
- 当触发 [onStop](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~ObjectiveC~protocol~zego-custom-video-capture-handler#on-stop) 回调时将 “flag” 标记设置为 “False”，表示需要停止发送采集的视频数据给 SDK。
</Note>

3. 开发者需要在 [videoFrameRawData](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~ObjectiveC_ios~protocol~zego-media-player-video-handler#media-player-video-frame-raw-data-data-length-param) 或 [videoFramePixelBuffer](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~ObjectiveC_ios~protocol~zego-media-player-video-handler#media-player-video-frame-pixel-buffer-param) 中添加对 “flag” 的判断逻辑，当 “flag” 设置为 “True” 时（即触发了 [onStart](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~ObjectiveC~protocol~zego-custom-video-capture-handler#on-start) 回调），调用 [sendCustomVideoCapturePixelBuffer](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~ObjectiveC~class~zego-express-engine#send-custom-video-capture-pixel-buffer-timestamp) 方法向 SDK 发送已获取的视频数据。

4. 调用 [startPublishingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~ObjectiveC~class~zego-express-engine#start-publishing-stream) 开始推流，请参考 [快速开始 - 实现流程](https://doc-zh.zego.im/article/7628#publishingStream) 的“推流”。


#### 变声

处理类似于 KTV 中，对伴奏升降调等场景时，可以调用媒体播放器的 [enableVoiceChanger](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~ObjectiveC_ios~class~zego-express-engine#enable-voice-changer) 接口来实现变声功能。开发者可通过 [ZegoVoiceChangerParam](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~ObjectiveC~class~zego-voice-changer-param) 对象中的音高参数 “pitch” 设置变声效果，该参数取值范围为 [-12.0, 12.0]，值越大声音越尖锐，默认关闭变声。

```objc
ZegoVoiceChangerParam *param = [[ZegoVoiceChangerParam alloc] init];
// 男声变童声
param.pitch = 8.0f;
//男声变女声
param.pitch = 4.0f;
// 女声变童声
param.pitch = 6.0f;
// 女声变男声
param.pitch = -3.0f;
[self.mediaPlayer enableVoiceChanger:YES param:param audioChannel:ZegoMediaPlayerAudioChannelAll];
```

### 5 销毁媒体播放器

使用完播放器之后，需要及时置空播放器实例变量以销毁媒体播放器，释放占用的资源。调用示例如下：

```objc
self.mediaPlayer = nil;
```

<Note title="说明">

当该媒体播放器实例对象的引用计数为 0 时将销毁该播放器实例并释放其占用的资源。
</Note>

## 常见问题

1. **如何在播放中途切换播放资源？**

  先调用播放器的 [stop](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~ObjectiveC~class~zego-media-player#stop) 接口，然后重新调用 [loadResource](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~ObjectiveC~class~zego-media-player#load-resource-callback) 接口加载新资源。
