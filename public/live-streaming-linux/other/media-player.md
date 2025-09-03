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

## 使用步骤

### 1 创建媒体播放器

调用`ZegoExpressEngine`的 [createMediaPlayer](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~CPP_linux~class~zego-express-i-zego-express-engine#create-media-player) 接口以创建媒体播放器实例。一个媒体播放器实例只能播放一个音视频，引擎同一时间最多支持创建 10 个播放器，以达到同时播放多个文件的效果。超出 10 个则创建失败，接口将返回 `nullptr`。

```cpp
IZegoMediaPlayer* mediaPlayer = engine->createMediaPlayer();
if (mediaPlayer == nullptr) {
    printf("创建播放器失败");
}
```

### 2（可选）为播放器设置事件回调

<Accordion title="播放器事件回调设置" defaultOpen="false">
调用媒体播放器的 [setEventHandler](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~CPP_linux~class~zego-express-i-zego-media-player#set-event-handler) 接口为播放器设置事件回调 [IZegoMediaPlayerEventHandler](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~CPP_linux~class~zego-express-i-zego-media-player-event-handler) ，以接收`播放器播放状态改变`、`播放器网络状态更新`、`播放器播放进度改变`等通知。

```cpp
// 请注意，请勿在 SDK 回调线程中调用任何 SDK 接口，需要手动切换为其他线程，否则会产生死锁
class MyMediaPlayerEventHandler: public IZegoMediaPlayerEventHandler{
public:
    // 播放器播放状态变更及事件回调
    void onMediaPlayerStateUpdate(IZegoMediaPlayer* mediaPlayer, ZegoMediaPlayerState state, int errorCode) override{
        printf("currentState: %d", state);
    }

    // 播放器网络状态事件回调
    void onMediaPlayerNetworkEvent(IZegoMediaPlayer* mediaPlayer, ZegoMediaPlayerNetworkEvent networkEvent) override {
        printf("networkEvent: %d", networkEvent);
    }

    // 播放器播放进度回调
    void onMediaPlayerPlayingProgress(IZegoMediaPlayer* mediaPlayer, unsigned long long millisecond) override {
        printf("currentProgress:%lld", millisecond);
    }
}

auto eventHandler = std::make_shared<MyMediaPlayerEventHandler>();
mediaPlayer->setEventHandler(eventHandler);
```
</Accordion>

### 3 加载媒体资源

调用媒体播放器的 [loadResource](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~CPP_linux~class~zego-express-i-zego-media-player#load-resource) 来指定要播放的媒体资源。可以是本地资源的绝对路径，如 `D:/Zego/your-movie.mp4`；也可以是网络资源的 URL，如 `http://your.domain.com/your-movie.mp4`。用户可通过传入回调参数的方式获取加载文件的结果。

<Warning title="注意">


如果该媒体资源已经被 [loadResource](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_linux~class~IZegoMediaPlayer#load-resource) 或者正在播放，请先调用 [stop](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_linux~class~IZegoMediaPlayer#stop) 接口停止播放，然后再调用 [loadResource](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_linux~class~IZegoMediaPlayer#load-resource) 接口加载媒体资源，否则无法加载成功。

</Warning>



```cpp
 // 加载资源，可传本地资源的绝对路径或者网络资源的 URL
mediaPlayer->loadResource("sourcePath", [=](/live-streaming-linux/other/int-errorcode){
    if(errorCode == 0){
        printf("the total duration of the file: %lld", mediaPlayer->getTotalDuration());
    } else {
        printf("load resource failed");
    }
});
```

### 4 播放控制

#### 播放状态控制

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Common/ZegoExpressEngine/mediaplayer_state_iOS.jpg" /></Frame>

在调用 [loadResource](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~CPP_linux~class~zego-express-i-zego-media-player#load-resource) 加载文件成功后，可调用[start](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~CPP_linux~class~zego-express-i-zego-media-player#start)、[pause](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~CPP_linux~class~zego-express-i-zego-media-player#pause)、
[resume](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~CPP_linux~class~zego-express-i-zego-media-player#resume)、[stop](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~CPP_linux~class~zego-express-i-zego-media-player#stop)来启停播放。一旦播放器的内部状态改变，[onMediaPlayerStateUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~CPP_linux~class~zego-express-i-zego-media-player-event-handler#on-media-player-state-update) 回调将会被触发。

用户也可通过调用 [getCurrentState](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~CPP_linux~class~zego-express-i-zego-media-player#get-current-state) 随时获取播放器的当前状态。

如果 [enableRepeat](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~CPP_linux~class~zego-express-i-zego-media-player#enable-repeat) 设置为 `true`，则播放器会在播放完文件后自动重播。

```cpp
// 设置是否重复播放
mediaPlayer->enableRepeat(true);
// 开始播放，播放之前需要先调用接口加载媒体文件
mediaPlayer->start();
// 暂停
mediaPlayer->pause();
// 恢复
mediaPlayer->resume();
// 停止
mediaPlayer->stop();
```

#### 播放进度控制

播放文件的进度会通过 [onMediaPlayerPlayingProgress](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~CPP_linux~class~zego-express-i-zego-media-player-event-handler#on-media-player-playing-progress) 方法回调，默认触发回调的间隔是 1000 ms，可通过 [setProgressInterval](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~CPP_linux~class~zego-express-i-zego-media-player#set-progress-interval) 来更改此间隔。

用户也可通过 [getCurrentProgress](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~CPP_linux~class~zego-express-i-zego-media-player#get-current-progress) 来获取当前播放进度

通过 [seekTo](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~CPP_linux~class~zego-express-i-zego-media-player#seek-to) 接口来调整进度。

```cpp
// 设置播放进度回调间隔为 2000 ms
mediaPlayer->setProgressInterval(2000);
// 获取播放器的播放进度，单位为毫秒
auto progress = mediaPlayer->getCurrentProgress();
// 播放进度跳转到一半的总时长，进度的单位为毫秒
mediaPlayer->seekTo(mediaPlayer->getTotalDuration() / 2, nullptr);
```

#### 播放器音频控制

通过 [getPlayVolume](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~CPP_linux~class~zego-express-i-zego-media-player#get-play-volume) 和 [setPlayVolume](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~CPP_linux~class~zego-express-i-zego-media-player#set-play-volume) 获取和控制播放音量。

通过 [getPublishVolume](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~CPP_linux~class~zego-express-i-zego-media-player#get-publish-volume) 和 [setPublishVolume](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~CPP_linux~class~zego-express-i-zego-media-player#set-publish-volume) 获取和控制推流音量。

调用 [enableAux](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~CPP_linux~class~zego-express-i-zego-media-player#enable-aux) 可以将文件的声音混入正在推的流中。

调用 [muteLocal](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~CPP_linux~class~zego-express-i-zego-media-player#mute-local) 可以控制本地静音播放。

```cpp
// 获取播放器当前的播放音量
auto playVolume = mediaPlayer->getPlayVolume();
// 设置播放器音量为原先的一半
mediaPlayer->setPlayVolume(playVolume / 2);
// 获取播放器当前的推流音量
int publishVolume = mediaPlayer->getPublishVolume();
// 设置播放器推流音量
mediaPlayer->setPublishVolume(publishVolume);
// 开启将资源的声音混入正在推的流中
mediaPlayer->enableAux(true);
// 开启本地静默播放
mediaPlayer->muteLocal(true);
```

如果想获取文件的音频数据，可通过 [setAudioHandler](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~CPP_linux~class~zego-express-i-zego-media-player#set-audio-handler) 接口来为播放器指定音频帧回调 [IZegoMediaPlayerAudioHandler](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~CPP_linux~class~zego-express-i-zego-media-player-audio-handler)。

```cpp
// 播放器抛音频数据的回调
// 请注意，请勿在 SDK 回调线程中调用任何 SDK 接口，需要手动切换为其他线程，否则会产生死锁
class MyAudioHandler: public IZegoMediaPlayerAudioHandler {
public:
    virtual void onAudioFrame(IZegoMediaPlayer* /*mediaPlayer*/, const unsigned char* /*data*/, unsigned int /*dataLength*/, ZegoAudioFrameParam /*param*/) {
    }
};
auto audioHandler = std::make_shared<MyAudioHandler>();
mediaPlayer->setAudioHandler(audioHandler);
```

#### 播放器视频控制

如果想获取文件的视频数据，可通过 [setVideoHandler](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~CPP_linux~class~zego-express-i-zego-media-player#set-video-handler) 接口来为播放器指定视频帧回调 [IZegoMediaPlayerVideoHandler](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~CPP_linux~class~zego-express-i-zego-media-player-video-handler)。

```cpp
// 设置播放器视频数据的回调
// 请注意，请勿在 SDK 回调线程中调用任何 SDK 接口，需要手动切换为其他线程，否则会产生死锁
class MyVideoHandler: public IZegoMediaPlayerVideoHandler {
public:
    void onVideoFrame(IZegoMediaPlayer* /*mediaPlayer*/, const unsigned char** /*data*/, unsigned int* /*dataLength*/, ZegoVideoFrameParam /*param*/) {
    }
};
auto videoHandler = std::make_shared<MyVideoHandler>();
mediaPlayer->setVideoHandler(videoHandler);
```

<Warning title="注意">

SDK 目前不支持在 Linux 平台上的视频渲染，用户可以在拿到视频数据后实现自定义渲染。

</Warning>



#### 将播放器播放的视频推流出去

1. 将播放器的视频推流出去前，需要先通过 [setVideoHandler](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~CPP_linux~class~zego-express-i-zego-media-player#set-video-handler) 设置视频帧回调监听，用于获取 [onVideoFrame](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~CPP_linux~class~zego-express-i-zego-media-player-video-handler#on-video-frame) 抛出的视频帧数据。

2. 使用自定义方式采集视频，并将获取到的视频数据混入推流数据中，详细操作请参考 [自定义视频采集](/real-time-video-linux-cpp/video/custom-video-capture) 。

<Note title="说明">


自定义采集数据时，建议开发者自行定义一个 `flag` 标记位：

* 当触发 [onStart](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~CPP_linux~class~zego-express-i-zego-custom-video-capture-handler#on-start) 回调时将 `flag` 标记设置为 `True`，表示可以开始将自定义采集的视频数据发送给 SDK。
* 当触发 [onStop](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~CPP_linux~class~zego-express-i-zego-custom-video-capture-handler#on-stop) 回调时将 `flag` 标记设置为 `False`，表示需要停止发送采集的视频数据给 SDK。

</Note>



3. 开发者需要在 [onVideoFrame](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~CPP_linux~class~zego-express-i-zego-media-player-video-handler#on-video-frame) 中添加对 `flag` 的判断逻辑，当 `flag` 设置为 `True` 时（即触发了 [onStart](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~CPP_linux~class~zego-express-i-zego-custom-video-capture-handler#on-start) 回调），调用 [sendCustomVideoCaptureRawData](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~CPP_linux~class~zego-express-i-zego-express-engine#send-custom-video-capture-raw-data) 方法向 SDK 发送已获取的视频数据。

4. 调用 [startPublishingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~CPP_linux~class~zego-express-i-zego-express-engine#start-publishing-stream) 开始推流，请参考 [快速开始 - 实现流程](https://doc-zh.zego.im/article/21031#publishingStream) 的 “推流”。


#### 变声

处理类似于 KTV 中对伴奏升降调等场景时，可以调用媒体播放器的 [enableVoiceChanger](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~CPP_linux~class~zego-express-i-zego-media-player#enable-voice-changer) 接口来实现变声功能。开发者可通过 [ZegoVoiceChangerParam](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~CPP_linux~struct~zego-express-zego-voice-changer-param#zego-voice-changer-param) 对象中的音高参数 `pitch` 设置变声效果，该参数取值范围为 [-12.0, 12.0]，值越大声音越尖锐，默认关闭变声。

```cpp
ZegoVoiceChangerParam param = ZegoVoiceChangerParam();
param.pitch = 8.0f;     // 男声变童声
param.pitch = 4.0f;     // 男声变女声
param.pitch = 6.0f;     // 女声变童声
param.pitch = -3.0f;    // 女声变男声
mediaPlayer->enableVoiceChanger(ZEGO_MEDIA_PLAYER_AUDIO_CHANNEL_ALL, true, param);
```

### 5 销毁媒体播放器

使用完播放器之后，需要及时的调用 [destroyMediaPlayer](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~CPP_linux~class~zego-express-i-zego-express-engine#destroy-media-player) 接口以释放该播放器占用的资源。

```cpp
engine->destroyMediaPlayer(mediaPlayer);
```

## 常见问题

#### 如何在播放中途切换播放资源？

先调用播放器的 [stop](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~CPP_linux~class~zego-express-i-zego-media-player#stop) 接口，然后重新调用 [loadResource](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~CPP_linux~class~zego-express-i-zego-media-player#load-resource) 接口加载新资源。

<Content />

