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

请参考 [下载示例源码](https://doc-zh.zego.im/article/17152) 获取源码。

相关源码请查看 “/lib/topics/OtherFunctions/media_player” 目录下的文件。

## 前提条件

在实现媒体播放器功能之前，请确保：

- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppID 和 AppSign，详情请参考 [控制台 - 项目信息](/console/project-info)。
- 已在项目中集成 ZEGO Express SDK，并实现了基本的音视频推拉流功能，详情请参考 [快速开始 - 集成](https://doc-zh.zego.im/article/17151) 和 [快速开始 - 实现流程](https://doc-zh.zego.im/article/17184)。



## 使用步骤

### 1 创建媒体播放器

调用 `ZegoExpressEngine` 的成员方法 [createMediaPlayer](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngineMediaPlayer/createMediaPlayer.html) 接口以创建媒体播放器实例。一个媒体播放器实例只能播放一个音视频，引擎同一时间最多支持创建 10 个播放器实例，以达到同时播放多个媒体资源的效果。若当前已存在 10 个播放器实例，再次调用创建播放器接口将返回 `null`。


```dart
ZegoMediaPlayer? mediaPlayer = await ZegoExpressEngine.instance.createMediaPlayer();
if (mediaplayer != null) {
    // createMediaPlayer create sucess
} else {
    // createMediaPlayer create fail
}
```

### 2（可选）为播放器设置事件回调

<Accordion title="播放器事件设置回调" defaultOpen="false">
通过媒体播放器的 [onMediaPlayerStateUpdate](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngine/onMediaPlayerStateUpdate.html) 、[onMediaPlayerNetworkEvent](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngine/onMediaPlayerNetworkEvent.html) 和 [onMediaPlayerPlayingProgress](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngine/onMediaPlayerPlayingProgress.html) 回调来接收“播放器播放状态改变”、“播放器网络状态更新”和“播放器播放进度改变”通知。


```dart
// 播放器播放状态回调
ZegoExpressEngine.onMediaPlayerStateUpdate = (ZegoMediaPlayer mediaPlayer, ZegoMediaPlayerState state, int errorCode) {
    print("onMediaPlayerStateUpdate: state = $state, errorCode = $errorCode, mediaPlayer index = ${mediaPlayer.getIndex()}");
}

// 播放器网络状态回调
ZegoExpressEngine.onMediaPlayerNetworkEvent = (ZegoMediaPlayer mediaPlayer, ZegoMediaPlayerNetworkEvent networkEvent) {
    print("onMediaPlayerNetworkEvent: networkEvent = $networkEvent, mediaPlayer index = ${mediaPlayer.getIndex()}");
}

// 播放器播放进度回调
ZegoExpressEngine.onMediaPlayerPlayingProgress = (ZegoMediaPlayer mediaPlayer, int millisecond) {
     print("onMediaPlayerPlayingProgress: millisecond = $millisecond, mediaPlayer index = ${mediaPlayer.getIndex()}");
}
```
</Accordion>


### 3 加载媒体文件

<Warning title="注意">


如果该媒体资源已经被 [loadResource](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoMediaPlayer/loadResource.html) 或者正在播放，请先调用 [stop](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoMediaPlayer/stop.html) 接口停止播放，然后再调用 [loadResource](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoMediaPlayer/loadResource.html) 接口加载媒体资源，否则无法加载成功。

</Warning>



调用媒体播放器的 [loadResource](https://doc-zh.zego.im/article/dart_flutter/zego_express_engine/ZegoMediaPlayer/loadResource.html) 指定要播放的媒体资源，可以是本地资源的绝对路径，也可以是网络资源的 URL，如 `http://your.domain.com/your-movie.mp4`。用户可通过函数的返回值获取加载文件的结果。


```dart
 // 加载资源，可传本地资源的绝对路径或者网络资源的 URL
zegoMediaplayer.loadResource("sourcePath").then( (ZegoMediaPlayerLoadResourceResult result) {
    if(errorcode == 0){
        // loadResource success
    } else {
        // loadResource errorcode: errorcode
    }
});
```

若用户需要加载二进制音频数据时，可调用媒体播放器的 [loadResourceFromMediaData](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoMediaPlayer/loadResourceFromMediaData.html) 指定要播放的二进制音频数据。用户可通过函数的返回值获取加载数据的结果。

```dart
  //加载资源，传入需要加载的二进制音频数据及起始位置
zegoMediaplayer.loadResourceFromMediaData(data, position).then(ZegoMediaPlayerLoadResourceResult result) {
    if(errorcode == 0){
        // loadResourceFromMediaData success
    } else {
        // loadResourceFromMediaData errorcode: errorcode
    }
});
```

### 4 播放控制

**播放状态控制**

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Common/ZegoExpressEngine/mediaplayer_state_iOS.jpg" /></Frame>

在调用 [loadResource](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoMediaPlayer/loadResource.html) 加载文件成功后，可调用 [start](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoMediaPlayer/start.html)、[pause](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoMediaPlayer/pause.html)、[resume](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoMediaPlayer/resume.html)、[stop](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoMediaPlayer/stop.html) 来启停播放。一旦播放器的内部状态改变，[onMediaplayerStateUpdate](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngine/onMediaPlayerStateUpdate.html) 回调将会被触发。

用户也可通过调用 [getCurrentState](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoMediaPlayer/getCurrentState.html) 随时获取播放器的当前状态.

如果 [enableRepeat](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoMediaPlayer/enableRepeat.html) 设置为 “true”，则播放器会在播放完文件后自动重播。

```dart
// 设置是否重复播放
mediaplayer.enableRepeat(true);
// 开始播放，播放之前需要先调用接口加载媒体文件
mediaplayer.start();
 // 暂停
mediaplayer.pause();
// 恢复
mediaplayer.resume();
// 停止
mediaplayer.stop();
```

**播放进度控制**

播放文件的进度会通过 [onMediaPlayerPlayingProgress](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngine/onMediaPlayerPlayingProgress.html) 方法回调，默认触发回调的间隔是 1000 ms，可通过 [setProgressInterval](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoMediaPlayer/setProgressInterval.html) 更改此间隔。

<Warning title="注意">


在 Web 中，暂不支持使用 [onMediaPlayerPlayingProgress](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngine/onMediaPlayerPlayingProgress.html) 接口。


</Warning>



用户也可通过 [getCurrentProgress](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoMediaPlayer/getCurrentProgress.html) 来获取当前播放进度。

通过 [seekTo](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoMediaPlayer/seekTo.html) 接口来调整进度。


```dart
 // 设置播放进度回调间隔为 2000 ms
mediaplayer.setProgressInterval(2000);
// 获取播放器的播放进度，单位为毫秒
int progress = await mediaplayer.getCurrentProgress();
// 获取当前播放的媒体文件的总时长，单位为毫秒
int totalDuration = await mediaplayer.getTotalDuration();
 // 播放进度跳转到一半的总时长，进度的单位为毫秒
mediaplayer.seekTo(totalDuration / 2).then(ZegoMediaPlayerSeekToResult result){
    if(errorcode == 0){
        // seekTo success
    } else {
        // seekTo errorcode: errorcode
    }
});
```

**播放速度控制**

加载资源完成后，用户可通过 [setPlaySpeed](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoMediaPlayer/setPlaySpeed.html) 来设置当前播放速度。


```dart
// 设置播放器的播放倍速，必须在加载资源完成后才能调用
// 设置 2 倍速播放，播放速度范围为 0.3 ~ 4.0，默认为 1.0
mediaplayer.setPlaySpeed(2.0);
```

**播放器音频控制**

通过 [getPlayVolume](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoMediaPlayer/getPlayVolume.html) 和 [setPlayVolume](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoMediaPlayer/setPlayVolume.html) 获取和控制播放音量。

通过 [getPublishVolume](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoMediaPlayer/getPublishVolume.html) 和 [setPublishVolume](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoMediaPlayer/setPublishVolume.html) 获取和控制推流音量。


调用 [muteLocal](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoMediaPlayer/muteLocal.html) 可以控制本地静音播放。

调用 [enableAux](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoMediaPlayer/enableAux.html) 可以将文件的声音混入正在推的流中。

<Note title="说明">


如果要使用混音能力，必须要 [设置麦克风权限](/real-time-video-flutter/quick-start/integrating-sdk#设置权限)，如果您不希望录制麦克风的声音，可以通过 [muteMicrophone](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngineDevice/muteMicrophone.html) 静音麦克风。


</Note>



```dart
// 获取播放器当前的播放音量
int playVolume = await mediaplayer.getPlayVolume();
// 设置播放器音量为原先的一半
mediaplayer.setPlayVolume(playVolume / 2);

// 获取播放器当前的推流音量
var publishVolume = await  this.mediaPlayer.getPublishVolume();

// 设置播放器推流音量
mediaPlayer.setPublishVolume(80.0);

// 开启本地静默播放
mediaplayer.muteLocal(true);
// 开启将资源的声音混入正在推的流中
mediaplayer.enableAux(true);
```

**播放器视频控制**

当播放视频资源时，用 [setPlayerCanvas](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoMediaPlayer/setPlayerCanvas.html) 来设置视频的显示视图。


```dart
// textureView 为通过 createTextureRenderer 或者 createPlatformView 方法获取的id
mediaplayer.setPlayerCanvas(ZegoCanvas(textureView));
```


**变声**

处理类似于 KTV 中对伴奏升降调等场景时，可以调用媒体播放器的 [enableVoiceChanger](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoMediaPlayer/enableVoiceChanger.html) 接口来实现变声功能。开发者可通过 [ZegoVoiceChangerParam](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoVoiceChangerParam-class.html) 对象中的音高参数 `pitch` 设置变声效果，该参数取值范围为 [-12.0, 12.0]，值越大声音越尖锐，默认关闭变声。

<Warning title="注意">


在 Web 中，暂不支持使用 [enableVoiceChanger](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoMediaPlayer/enableVoiceChanger.html) 接口。


</Warning>



```dart
/**
 * 8.0  // 男声变童声
 * 4.0  // 男声变女声
 * 6.0  // 女声变童声
 * -3.0 // 女声变男声
 */
ZegoVoiceChangerParam param = ZegoVoiceChangerParam(6.0)
mediaplayer.enableVoiceChanger(ZegoMediaPlayerAudioChannel.All, true, param);
```


### 5 销毁媒体播放器

使用完播放器之后，需要及时的调用 [destroyMediaplayer](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngineMediaPlayer/destroyMediaPlayer.html) 销毁接口以释放占用的资源。

```dart
ZegoExpressEngine.instance.destroyMediaPlayer(mediaplayer);
mEngine.destroyMediaPlayer(mediaplayer);
```


## 常见问题

**如何在播放中途切换播放资源？**

  先调用播放器的 [stop](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoMediaPlayer/stop.html) 接口，然后重新调用 [loadResource](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoMediaPlayer/loadResource.html) 接口加载新资源。

<Content />

