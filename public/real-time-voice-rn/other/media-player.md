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

请参考 [下载示例源码](https://doc-zh.zego.im/article/6656)。

相关源码请查看 “App.js” 文件。

## 前提条件

在使用媒体播放器前，请确保：

- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppID 和 AppSign，详情请参考 [控制台 - 项目信息](/console/project-info)。
- 已在项目中集成 ZEGO Express SDK，并实现了基本的音视频推拉流功能，详情请参考 [快速开始 - 集成](https://doc-zh.zego.im/article/6658) 和 [快速开始 - 实现流程](https://doc-zh.zego.im/article/8611)。


## 使用步骤

### 1 创建媒体播放器

调用 ZegoExpressEngine 的 [createMediaPlayer ](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/classes/_zegoexpressengine_.zegoexpressengine.html#createmediaplayer) 接口以创建媒体播放器实例。一个媒体播放器实例只能播放一个音视频，引擎同一时间最多支持创建 10 个播放器实例，以达到同时播放多个媒体资源的效果。若当前已存在 10 个播放器实例，再次调用创建播放器接口将返回 `null`。

- 调用示例：

    ```javascript
    ZegoExpressEngine.instance().createMediaPlayer().then((player) => {
      this.mediaPlayer = player;
    });
    ```

### 2（可选）为播放器设置事件回调

<Accordion title="播放器事件回调设置" defaultOpen="false">
调用媒体播放器的 [on ](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/classes/_zegoexpressdefines_.zegomediaplayer.html#on) 接口为播放器设置事件回调，以接收“播放器播放状态改变”、“播放器网络状态更新”、“播放器播放进度改变”等通知。

- 接口原型：

    ```javascript
    export abstract class ZegoMediaPlayer {

    /**
     * 监听播放器事件通知
     *
     * @param event 事件类型
     * @param callback 事件发送后触发的方法
     */
    abstract on<MediaPlayerEventType extends keyof ZegoMediaPlayerListener>(event: MediaPlayerEventType, callback: ZegoMediaPlayerListener[MediaPlayerEventType]): void;
    ......
    }
    ```

    ```javascript
    export interface ZegoMediaPlayerListener {
    /**
     * @event ZegoMediaPlayer#onMediaPlayerStateUpdate
     * @desc 播放器播放状态回调
     *
     * @property {ZegoMediaPlayer} mediaPlayer - 回调的播放器实例
     * @property {ZegoMediaPlayerState} state - 播放器状态
     * @property {number} errorCode - 错误码，详情请参考常用错误码文档 /real-time-video-rn/error-code.html
     */
    mediaPlayerStateUpdate: (mediaPlayer: ZegoMediaPlayer, state: ZegoMediaPlayerState, errorCode: number) => void;

    /**
     * @event ZegoMediaPlayer#onMediaPlayerNetworkEvent
     * @desc 播放器网络状态事件回调
     *
     * @property {ZegoMediaPlayer} mediaPlayer - 回调的播放器实例
     * @property {ZegoMediaPlayerNetworkEvent} networkEvent - 网络状态事件
     */
    mediaPlayerNetworkEvent: (mediaPlayer: ZegoMediaPlayer, networkEvent: ZegoMediaPlayerNetworkEvent) => void;

    /**
     * @event ZegoMediaPlayer#onMediaPlayerPlayingProgress
     * @desc 播放器播放进度回调
     *
     * @property {ZegoMediaPlayer} mediaPlayer - 回调的播放器实例
     * @property {number} millisecond - 进度，单位为毫秒
     */
    mediaPlayerPlayingProgress: (mediaPlayer: ZegoMediaPlayer, millisecond: number) => void;
    }
    ```

- 调用示例：

    ```javascript
    this.mediaPlayer.on("mediaPlayerStateUpdate", (player, state, errorCode) => {
        switch (state) {
            case ZegoMediaPlayerState.NoPlay:
                // 播放停止状态
                break;
            case ZegoMediaPlayerState.Playing:
                // 正在播放状态
                break;
            case ZegoMediaPlayerState.Pausing:
                // 暂停状态
                break;
            case ZegoMediaPlayerState.PlayEnded:
                // 当前曲目播放完成，可执行播放下一首等操作
                break;
        }
      });
    ```
</Accordion>


### 3 加载媒体资源

调用媒体播放器的 [loadResource ](https://doc-zh.zego.im/article/javascript_react-native/classes/_zegoexpressdefines_.zegomediaplayer.html#loadresource) 指定要播放的媒体资源，可以是本地资源的绝对路径，也可以是网络资源的 URL，如 `http://your.domain.com/your-movie.mp4`。 用户可通过传入回调参数的方式获取加载文件的结果。

<Warning title="注意">


如果该媒体资源已经被 [loadResource](https://doc-zh.zego.im/article/javascript_react-native/classes/_zegoexpressdefines_.zegomediaplayer.html#loadresource) 或者正在播放，请先调用 [stop](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/classes/_zegoexpressdefines_.zegomediaplayer.html#stop) 接口停止播放，然后再调用 [loadResource](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/classes/_zegoexpressdefines_.zegomediaplayer.html#loadresource) 接口加载媒体资源，否则无法加载成功。

</Warning>



- 接口原型：

    ```javascript
    // 加载资源，可传本地资源的绝对路径或者网络资源的 URL
    abstract loadResource(path: string): Promise<ZegoMediaPlayerLoadResourceResult>;
    ```

- 调用示例：

    ```javascript
    // 此处示例获取 App 包内的 sample.mp4 文件绝对路径
    this.mediaPlayer.loadResource("sample.mp4").then((ret) => {
        console.log("load resource error: " + ret.errorCode);
      });
    ```

### 4 播放控制

#### 播放状态控制

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Common/ZegoExpressEngine/mediaplayer_state_iOS.jpg" /></Frame>

在调用 [loadResource](https://doc-zh.zego.im) 加载文件成功后，可调用 [start ](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/classes/_zegoexpressdefines_.zegomediaplayer.html#start)、[pause ](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/classes/_zegoexpressdefines_.zegomediaplayer.html#pause)、[resume ](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/classes/_zegoexpressdefines_.zegomediaplayer.html#resume)、[stop ](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/classes/_zegoexpressdefines_.zegomediaplayer.html#stop) 来启停播放。一旦播放器的内部状态改变，[mediaPlayerStateUpdate ](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/interfaces/_zegoexpresseventhandler_.zegomediaplayerlistener.html#mediaplayerstateupdate) 回调将会被触发。

开发者也可通过调用 [getCurrentState ](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/classes/_zegoexpressdefines_.zegomediaplayer.html#getcurrentstate) 随时获取播放器的当前状态。

如果 [enableRepeat ](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/classes/_zegoexpressdefines_.zegomediaplayer.html#enablerepeat) 设置为 “YES”，则播放器会在播放完文件后自动重播。


- 调用示例：

    ```javascript
    export abstract class ZegoMediaPlayer {

        // 加载媒体资源
        abstract loadResource(path: string): Promise<ZegoMediaPlayerLoadResourceResult>;

        // 开始播放（播放前需要先加载资源）
        abstract start(): Promise<void>;

       // 停止播放
        abstract stop(): Promise<void>;

        // 暂停播放
        abstract pause(): Promise<void>;

       // 恢复播放
        abstract resume(): Promise<void>;

        ......
       }
      ```

#### 播放进度控制

播放文件的进度会通过 [mediaPlayerPlayingProgress ](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/interfaces/_zegoexpresseventhandler_.zegomediaplayerlistener.html#mediaplayerplayingprogress) 接口回调，默认触发回调的间隔是 1000 ms，可通过 [setProgressInterval ](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/classes/_zegoexpressdefines_.zegomediaplayer.html#setprogressinterval) 更改此间隔。

开发者也可通过 [getCurrentProgress ](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/classes/_zegoexpressdefines_.zegomediaplayer.html#getcurrentprogress) 来获取当前播放进度。

通过 [seekTo ](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/classes/_zegoexpressdefines_.zegomediaplayer.html#seekto) 接口可以调整播放进度进度。

- 接口原型：

    ```javascript
    export abstract class ZegoMediaPlayer {

    }
    @interface ZegoMediaPlayer : NSObject

    /// 整个文件的播放时长，单位为毫秒
    abstract getTotalDuration(): Promise<number>;

    /// 当前播放进度，单位为毫秒
    abstract getCurrentProgress(): Promise<number>;

    ......

    /// 设置指定播放进度，单位为毫秒
    abstract seekTo(millisecond: number): Promise<ZegoMediaPlayerSeekToResult>;

    ......

    /// 设置播放进度回调间隔
    abstract setProgressInterval(millisecond: number): Promise<void>;

    ......

    @end
    ```

- 调用示例：

    ```javascript
    this.mediaPlayer.setProgressInterval(1000)

    var totalDuration = await this.mediaPlayer.getTotalDuration()

    await this.mediaPlayer.seekTo(totalDuration/2);
    var progress = await this.mediaPlayer.getCurrentProgress()

    NSLog(@"process: %llu", progress);
    ```

#### 播放速度控制

加载资源完成后，用户可通过 [setPlaySpeed](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/classes/_zegoexpressdefines_.zegomediaplayer.html#setplayspeed) 来设置当前播放速度。

- 调用示例

    ```java
    // 设置 2 倍速播放，播放速度范围为 0.5 ~ 4.0，默认为 1.0
    await this.mediaPlayer.setPlaySpeed(2.0)；
    ```

#### 播放器音频控制

通过 [getPlayVolume ](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/classes/_zegoexpressdefines_.zegomediaplayer.html#getplayvolume) 和 [setPlayVolume ](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/classes/_zegoexpressdefines_.zegomediaplayer.html#setplayvolume) 接口获取和控制播放音量。

通过 [getPublishVolume ](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/classes/_zegoexpressdefines_.zegomediaplayer.html#getpublishvolume) 和 [setPublishVolume ](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/classes/_zegoexpressdefines_.zegomediaplayer.html#setpublishvolume) 接口获取和控制推流音量。

调用 [enableAux ](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/classes/_zegoexpressdefines_.zegomediaplayer.html#enableaux) 接口可以将文件的声音混入正在推的流中。

<Note title="说明">
如果要使用混音能力，必须要 [设置麦克风权限](https://doc-zh.zego.im/article/6658#3)，如果您不希望录制麦克风的声音，可以通过 [muteMicrophone](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/classes/_zegoexpressengine_.zegoexpressengine.html#mutemicrophone) 静音麦克风。
</Note>



调用 [muteLocal ](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/classes/_zegoexpressdefines_.zegomediaplayer.html#mutelocal) 接口可以使本地静默播放但能正常将声音混入流。

- 调用示例：

    ```javascript
    // 获取播放器当前播放音量
    var playVolume = await this.mediaPlayer.getPlayVolume;

    // 设置播放器音量为原先的一半
    this.mediaPlayer.setPlayVolume(playVolume/2);

    // 获取播放器当前推流音量
    var publishVolume = await  this.mediaPlayer.getPublishVolume();

    // 设置播放器推流音量
    this.mediaPlayer.setPublishVolume(80.0);

    // 开启将资源的声音混入正在推的流中
    this.mediaPlayer.enableAux(true);

    // 开启本地静默播放
    this.mediaPlayer.muteLocal(true);
    ```


#### 播放器视频控制

<Note title="说明">
本节操作仅适用于音视频场景，纯音频场景下无需设置。
</Note>



当播放视频资源时，通过 [setPlayerView ](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/classes/_zegoexpressdefines_.zegomediaplayer.html#setplayerview) 接口来设置视频的显示视图。

- 接口原型:

    ```javascript
    // 设置播放器视图
    abstract setPlayerView(view: ZegoView): Promise<void>;
    ```

- 调用示例:

    ```javascript
    this.mediaPlayer.setPlayerView({"reactTag": findNodeHandle(this.refs.zego_media_view), "viewMode": 0, "backgroundColor": 0});

    render() {
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
              <View style={{height: 200}}>
                  <ZegoTextureView ref='zego_media_view' style={{height: 200}}/>
              </View>
        </SafeAreaView>
      </>
    );
    }
    }
    ```


### 5 销毁媒体播放器

使用完媒体播放器后，需要及时调用 [destroyMediaPlayer ](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/classes/_impl_zegoexpressengineimpl_.zegoexpressengineimpl.html#destroymediaplayer) 接口销毁播放器实例变量，释放占用的资源。

- 调用示例:

    ```javascript
    ZegoExpressEngine.instance().destroyMediaPlayer(this.mediaPlayer)
    ```

## 常见问题

**如何在播放中途切换播放资源？**

先调用播放器的 [stop ](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/classes/_zegoexpressdefines_.zegomediaplayer.html#stop) 接口，然后重新调用 [loadResource ](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/classes/_zegoexpressdefines_.zegomediaplayer.html#loadresource) 接口加载新资源。

<Content />

