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

请参考 [下载示例源码](/real-time-video-android-java/client-sdk/download-demo) 获取源码。

相关源码请查看 “/ZegoExpressExample/Others/src/main/java/im/zego/others/mediaplayer” 目录下的文件。

## 前提条件

在实现媒体播放器功能之前，请确保：

- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppID 和 AppSign，详情请参考 [控制台 - 项目信息](/console/project-info)。
- 已在项目中集成 ZEGO Express SDK，并实现了基本的音视频推拉流功能，详情请参考 [快速开始 - 集成](https://doc-zh.zego.im/article/13394) 和 [快速开始 - 实现流程](https://doc-zh.zego.im/article/13395)。



## 使用步骤

### 1 创建媒体播放器

调用 “ZegoExpressEngine” 的成员方法 [createMediaPlayer](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Java~class~im-zego-zegoexpress-zego-express-engine#create-media-player) 接口以创建媒体播放器实例。一个媒体播放器实例只能播放一个音视频，引擎同一时间最多支持创建 10 个播放器实例，以达到同时播放多个媒体资源的效果。若当前已存在 10 个播放器实例，再次调用创建播放器接口将返回 `null`。

- 调用示例

    ```java
    // 创建媒体播放器实例对象, 目前最多支持创建 4 个实例，超过后将返回 null
    ZegoMediaPlayer mediaplayer = mEngine.createMediaPlayer();
    if (mediaplayer != null) {
        Log.d(TAG, "createMediaPlayer create sucess");
    } else {
        Log.d(TAG, "createMediaPlayer create fail");
    }
    ```

### 2（可选）为播放器设置事件回调

<Accordion title="播放器事件设置回调" defaultOpen="false">
调用媒体播放器的 [setEventHandler](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Java~class~im-zego-zegoexpress-zego-media-player#set-event-handler) 接口为播放器设置事件回调，以接收“播放器播放状态改变”、“播放器网络状态更新”、“播放器播放进度改变”等通知。


- 调用示例

    ```java
    public class MyIZegoMediaPlayerEventHandler extends IZegoMediaPlayerEventHandler {

        private static final String TAG = "MyIZegoExpressMediaplay";

        @Override
        public void onMediaPlayerStateUpdate(ZegoMediaPlayer mediaPlayer, ZegoMediaPlayerState state, int errorCode) {
            // 本回调在 UI 线程被回调，开发者可以在此进行 UI 的变化，例如播放按钮的变化
            Log.d(TAG, "onMediaPlayerStateUpdate: state = " + state.value() + ", errorCode = " + errorCode + ", zegoExpressMediaplayer = " + mediaPlayer);
        }

        @Override
        public void onMediaPlayerNetworkEvent(ZegoMediaPlayer mediaPlayer, ZegoMediaPlayerNetworkEvent networkEvent) {
            // 本回调在 UI 线程被回调，开发者可以在此进行 UI 的变化，例如网络不好的情况做友好的提示
            Log.d(TAG, "onMediaPlayerNetworkEvent: networkEvent = " + networkEvent.value() + ", zegoExpressMediaplayer = " + mediaPlayer);
        }

        @Override
        public void onMediaPlayerPlayingProgress(ZegoMediaPlayer mediaPlayer, long millisecond) {
            // 本回调在 UI 线程被回调，开发者可以在此进行 UI 的变化，例如进度条的变化
            Log.d(TAG, "onMediaPlayerPlayingProgress: millisecond = " + millisecond + ", zegoExpressMediaplayer = " + mediaPlayer);
        }
    }

    mediaplayer.setEventHandler(new MyIZegoMediaPlayerEventHandler());

    ```
</Accordion>


### 3 加载媒体文件

调用媒体播放器的 [loadResource](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Java~class~im-zego-zegoexpress-zego-media-player#load-resource) 指定要播放的媒体资源，可以是本地资源的绝对路径，也可以是网络资源的 URL，如 `http://your.domain.com/your-movie.mp4`。用户可通过传入回调参数的方式获取加载文件的结果。
若用户需要加载二进制音频数据时，可调用媒体播放器的 [loadResourceFromMediaData](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Java_android~class~im-zego-zegoexpress-zego-media-player&jumpType=route#load-resource-from-media-data) 指定要播放的二进制音频数据。用户可通过传入回调参数的方式获取加载数据的结果。
<Warning title="注意">


如果该媒体资源已被 [loadResource](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~ZegoMediaPlayer#load-resource) 或者正在播放，请先调用 [stop](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~ZegoMediaPlayer#stop) 接口停止播放，然后再调用 [loadResource](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~ZegoMediaPlayer#load-resource) 接口加载媒体资源，否则无法加载成功。
</Warning>

- 调用示例

    ```java
    /**
     * 加载媒体资源
     *
     * 可传本地资源的绝对路径或者网络资源的 URL
     * @param path 本地资源路径或网络资源的 URL
     * @param callback 资源加载结果的通知
     */
    zegoMediaplayer.loadResource("sourcePath", new IZegoMediaPlayerLoadResourceCallback() {
        @Override
        public void onLoadResourceCallback(int errorcode) {
            // 本回调在 UI 线程被回调，开发者可以在此进行 UI 的变化
            if(errorcode == 0){
                Log.d(TAG, "onLoadResourceCallback: success");
            } else {
                Log.d(TAG, "onLoadResourceCallback: errorcode = " + errorcode);
            }
        }
    });
    ```
    ```java
    /**
     * 加载二进制音频数据
     *
     * @param mediaData 二进制音频数据
     * @param startPosition 指定开始播放的进度，单位毫秒
     * @param callback 资源加载结果的通知
     */
    zegoMediaplayer.loadResourceFromMediaData(data, position, new IZegoMediaPlayerLoadResourceCallback() {
        @Override
        public void onLoadResourceCallback(int errorcode) {
            // 本回调在 UI 线程被回调，开发者可以在此进行 UI 的变化
            if(errorcode == 0){
                Log.d(TAG, "onLoadResourceCallback: success");
            } else {
                Log.d(TAG, "onLoadResourceCallback: errorcode = " + errorcode);
            }
        }
    });
    ```

### 4 播放控制

#### 播放状态控制

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Common/ZegoExpressEngine/mediaplayer_state_iOS.jpg" /></Frame>

调用 [start](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Java~class~im-zego-zegoexpress-zego-media-player#start)、[pause](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Java~class~im-zego-zegoexpress-zego-media-player#pause)、[resume](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Java~class~im-zego-zegoexpress-zego-media-player#resume)、[stop](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Java~class~im-zego-zegoexpress-zego-media-player#stop) 来启停播放。一旦播放器的内部状态改变，[onMediaplayerStateUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Java~class~im-zego-zegoexpress-callback-i-zego-media-player-event-handler#on-media-player-state-update) 回调将会被触发。

用户也可通过调用 [getCurrentState](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Java~class~im-zego-zegoexpress-zego-media-player#get-current-state) 随时获取播放器的当前状态.

如果 [enableRepeat](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Java~class~im-zego-zegoexpress-zego-media-player#enable-repeat) 设置为 “true”，则播放器会在播放完文件后自动重播。

- 调用示例

    ```java
    // 设置是否重复播放
    mediaplayer.enableRepeat(true);
    // 开始播放，播放前需要先加载资源
    mediaplayer.start();
    // 暂停播放
    mediaplayer.pause();
    // 恢复播放
    mediaplayer.resume();
    // 停止播放
    mediaplayer.stop();
    ```

#### 播放进度控制

播放文件的进度会通过 [onMediaPlayerPlayingProgress](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Java~class~im-zego-zegoexpress-callback-i-zego-media-player-event-handler#on-media-player-playing-progress) 方法回调，默认触发回调的间隔是 1000 ms，可通过 [setProgressInterval](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Java~class~im-zego-zegoexpress-zego-media-player#set-progress-interval) 更改此间隔。

用户也可通过 [getCurrentProgress](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Java~class~im-zego-zegoexpress-zego-media-player#get-current-progress) 来获取当前播放进度。

通过 [seekTo](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Java~class~im-zego-zegoexpress-zego-media-player#seek-to) 接口来调整进度。

- 调用示例

    ```java
    // 设置播放进度回调间隔, 单位为毫秒, 可通过此接口控制 [onMediaPlayerPlayingProgress] 的回调频率
    mediaplayer.setProgressInterval(2000);
    // 获取当前播放进度
    long progress = mediaplayer.getCurrentProgress();
    mediaplayer.seekTo(mediaplayer.getTotalDuration() / 2, new IZegoMediaPlayerSeekToCallback(){
        @Override
        public void onSeekToTimeCallback(int errorcode) {
        // 本回调在UI线程被回调，开发者可以在此进行UI的变化
            if(errorcode == 0){
                Log.d(TAG, "onSeekToTimeCallback: success");
            } else {
                Log.d(TAG, "onSeekToTimeCallback: errorcode = " + errorcode);
            }
        }
    });
    ```

#### 播放速度控制

加载资源完成后，用户可通过 [setPlaySpeed](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Java_android~class~im-zego-zegoexpress-zego-media-player&jumpType=route#set-play-speed) 来设置当前播放速度。

- 调用示例

    ```java
    // 设置 2 倍速播放, 必须在加载资源完成后才能调用, 播放速度范围为 0.3 ~ 4.0，默认为 1.0
    mediaplayer.setPlaySpeed(2.0);
    ```

#### 播放器音频控制

通过 [getPlayVolume](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Java~class~im-zego-zegoexpress-zego-media-player#get-play-volume) 和 [setPlayVolume](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Java~class~im-zego-zegoexpress-zego-media-player#set-play-volume) 获取和控制播放音量。

通过 [getPublishVolume](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Java~class~im-zego-zegoexpress-zego-media-player#get-publish-volume) 和 [setPublishVolume](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Java~class~im-zego-zegoexpress-zego-media-player#set-publish-volume) 获取和控制推流音量。


调用 [muteLocal](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Java~class~im-zego-zegoexpress-zego-media-player#mute-local) 可以控制本地静音播放。

调用 [enableAux](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Java~class~im-zego-zegoexpress-zego-media-player#enable-aux) 可以将文件的声音混入正在推的流中。

<Note title="说明">


如果要使用混音能力，必须要 [设置麦克风权限](/live-streaming-android/quick-start/integrating-sdk#设置权限)，如果您不希望录制麦克风的声音，可以通过 [muteMicrophone](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~ZegoExpressEngine#mute-microphone) 静音麦克风。
</Note>

```java
int playVolume = mediaplayer.getPlayVolume();
mediaplayer.setPlayVolume(playVolume / 2);
int publishVolume = mediaPlayer.getPublishVolume();
mediaPlayer.setPublishVolume(publishVolume);
mediaplayer.muteLocal(true);
mediaplayer.enableAux(true);
```

如果想获取文件的音频数据，可通过 [setAudioHandler](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Java~class~im-zego-zegoexpress-zego-media-player#set-audio-handler) 来设置音频帧回调。

- 调用示例

    ```java
    // 播放器抛音频数据的回调, 可以通过设置此回调将媒体播放器播放的媒体资源文件的音频数据抛出来
    mediaplayer.setAudioHandler(new IZegoMediaPlayerAudioHandler() {
        @Override
        public void onAudioFrame(ZegoMediaPlayer mediaPlayer, ByteBuffer data, int dataLength, ZegoAudioFrameParam param) {
            // 开发者可以在这个回调里对该抛出的音频帧数据进行处理，例如进行本地存储、音效处理等
            Log.d(TAG, "onAudioFrame: buffer = " + data + ", zegoAudioFrame = " + dataLength);
        }
    });
    ```

#### 播放器视频控制

当播放视频资源时，用 [setPlayerCanvas](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Java~class~im-zego-zegoexpress-zego-media-player#set-player-canvas) 来设置视频的显示视图。

- 调用示例

    ```java
    // 设置播放器播放视频的视图
    // textureView 为附着在 UI 布局上的 android.view.TextureView 实例
    mediaplayer.setPlayerCanvas(new ZegoCanvas(textureView));
    ```

如果想获取文件的视频数据，可通过 [setVideoHandler](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Java~class~im-zego-zegoexpress-zego-media-player#set-video-handler) 来设置视频帧回调。

- 接口原型

    ```java
    /**
     * 设置视频回调 handler
     *
     * 可以通过设置此回调将媒体播放器播放的媒体资源文件的视频数据抛出来
     * @param handler 媒体播放器的视频事件回调对象
     * @param format 视频数据的视频帧格式
     */
    public void setVideoHandler(IZegoMediaPlayerVideoHandler handler, ZegoVideoFrameFormat format);
    ```

- 调用示例

    ```java
    // 播放器抛视频数据的回调, 可以通过设置此回调将媒体播放器播放的媒体资源文件的视频数据抛出来
    mediaplayer.setVideoHandler(new IZegoMediaPlayerVideoHandler(){
        @Override
        public void onVideoFrame(ZegoMediaPlayer mediaPlayer, ByteBuffer[] data, int[] dataLength, ZegoVideoFrameParam param) {
        // 开发者可以在这个回调里对该抛出的视频帧数据进行处理，例如进行本地存储、视频图层混合等
            Log.d(TAG, "onVideoFrame");
        }
    }, ZegoVideoFrameFormat.Unknown);// 第二个参数一般应指定为平台默认的视频帧格式
    ```

#### 将播放器播放的视频推流出去

1. 将播放器的视频推流出去前，需要先通过 [setVideoHandler](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Java~class~im-zego-zegoexpress-zego-media-player#set-video-handler) 设置视频帧回调监听，用于获取 [onVideoFrame](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Java~interface~im-zego-zegoexpress-callback-i-zego-media-player-video-handler#public-func-lists) 抛出的视频帧数据。

2. 使用自定义方式采集视频，并将获取到的视频数据混入推流数据中，详细操作请参考 [自定义视频采集 ](/real-time-video-android-java/video/custom-video-capture) 。

<Note title="说明">


自定义采集数据时，建议开发者自行定义一个 “flag” 标记位：

- 当触发 [onStart](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Java~class~im-zego-zegoexpress-callback-i-zego-custom-video-capture-handler#on-start) 回调时将 “flag” 标记设置为 “True”，表示可以开始将自定义采集的视频数据发送给 SDK。
- 当触发 [onStop](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Java~class~im-zego-zegoexpress-callback-i-zego-custom-video-capture-handler#on-stop) 回调时将 “flag” 标记设置为 “False”，表示需要停止发送采集的视频数据给 SDK。
</Note>

3. 开发者需要在 [onVideoFrame](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Java~interface~im-zego-zegoexpress-callback-i-zego-media-player-video-handler#public-func-lists) 中添加对 “flag” 的判断逻辑，当 “flag” 设置为 “True” 时（即触发了 [onStart ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Java~class~im-zego-zegoexpress-callback-i-zego-custom-video-capture-handler#on-start) 回调），调用 [sendCustomVideoCaptureRawData](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Java~class~im-zego-zegoexpress-zego-express-engine#send-custom-video-capture-raw-data) 方法向 SDK 发送已获取的视频数据。

4. 调用 [startPublishingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Java~class~im-zego-zegoexpress-zego-express-engine#start-publishing-stream) 开始推流，请参考 [快速开始 - 实现流程](https://doc-zh.zego.im/article/13395#publishingStream) 的 “推流”。


#### 变声

处理类似于 KTV 中对伴奏升降调等场景时，可以调用媒体播放器的 [enableVoiceChanger](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Java_android~class~im-zego-zegoexpress-zego-express-engine#enable-voice-changer) 接口来实现变声功能。开发者可通过 [ZegoVoiceChangerParam](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Java~class~im-zego-zegoexpress-entity-zego-voice-changer-param) 对象中的音高参数 “pitch” 设置变声效果，该参数取值范围为 [-12.0, 12.0]，值越大声音越尖锐，默认关闭变声。

```java
ZegoVoiceChangerParam param = new ZegoVoiceChangerParam()
// 男声变童声
param.pitch = 8.0f;
// 男声变女声
param.pitch = 4.0f;
// 女声变童声
param.pitch = 6.0f;
// 女声变男声
param.pitch = -3.0f;
mediaplayer.enableVoiceChanger(ZegoMediaPlayerAudioChannel.ALL, true, param);
```


### 5 销毁媒体播放器

使用完播放器之后，需要及时的调用销毁接口以释放占用的资源。

- 调用示例

    ```java
    // 销毁媒体播放器实例对象
    mEngine.destroyMediaPlayer(mediaplayer);
    // 在调用接口销毁的时候，为避免内存泄漏，开发者须自己手动释放业务层所持有的引用
    mediaplayer = null;
    ```

## 常见问题

1. **如何在播放中途切换播放资源？**

  先调用播放器的 [stop](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Java~class~im-zego-zegoexpress-zego-media-player#stop) 接口，然后重新调用 [loadResource](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Java~class~im-zego-zegoexpress-zego-media-player#load-resource) 接口加载新资源。

<Content />