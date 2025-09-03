# 实时方案

---

实时方案是 ZEGO 首创的K歌方案，有别于市面上的串行 KTV 方案，让线下K歌房在线上完美呈现。麦上用户可以实时参与合唱，观众也可以中途加入合唱。接下来，让我们看看如何基于 ZEGO 实时方案打造线上K歌房。

## 方案架构

K歌房是基于语聊房衍生发展的玩法。换而言之，K歌离不开连麦。实时方案中推拉流架构如下：
<Frame width="512" height="auto" >
  <img src="https://doc-media.zego.im/sdk-doc/Pics/GoEnjoy/online_KTV/overview_2.png" />
</Frame>

方案中角色分为：**合唱者** 和 **观众**。

**合唱者**
1. 点播歌曲的合唱者，需要多推一路伴奏流。
2. 合唱者推一路人声流，拉麦上合唱用户的人声流，拉流调整 jitterbuffer。
3. 所有合唱者需要设置人声流和伴奏流需要混流对齐。
4. 在推流后，点播歌曲的合唱者发起混流对齐任务。
5. 开唱后，媒体播放器播放本地音乐，合唱者通过播放进度回调同步歌词。
6. 点播歌曲的合唱者需要通过 SEI 发送歌曲进度，以便观众端同步歌词。

**观众**
1. 拉混流收听合唱。
2. 解析混流中 SEI 的歌曲进度信息，用于同步歌词。
3. 上麦后，停止拉混流，拉麦上人声流，调整 jitterbuffer。

实时方案中只有合唱用户会在本地播放伴奏。麦上用户会因为端到端传输延迟，导致收听延迟。为了提高麦上合唱体验，需要在 ZEGO SDK 中开启超低延迟模式。开启超低延迟模式后，可以大大减低端到端时延。

实时方案中需要在开唱后实时同步伴奏进度，避免因伴奏误差而增加端到端延迟。同步伴奏需要基于 NTP 时间，ZEGO SDK 内部带有 NTP 时间接口。不同设备的本地时钟并不一致，存在一定误差，因此需要引入 NTP 时间。同时，中途加入合唱的用户也需要同步伴奏进度，只有同步进度后，才能合唱。另外，本方案还提供了进度保障机制，以保证伴奏进度是同步的。

<Note title="说明">

1.如果没有观众，点歌用户可以不发起混流，也不需要多推一路伴奏流。

2.端到端延迟受网络影响比较大，网络越差延迟越高，麦上合唱体验就越差，但是观众收听不受影响。

3.正版曲库不属于本方案的一部分，如果开发者有自己的版权音乐也可使用实时方案。

4.为了保证伴奏同步、中途加入合唱和伴奏进度保障这三个功能的效果，以及方便开发者集成，合唱示例 Demo 将这三个功能封装成对应的接口，开发者可以直接参考集成。
</Note>

## 方案实现

实时方案主要有几个环节：超低延迟配置、K歌场景音频配置、推拉流配置、混流对齐配置、伴奏同步、中途加入合唱，以及伴奏进度保障。结合实际的K歌业务、上面环节以及时序进度，本方案将实现流程分为合唱准备和合唱开始阶段。按照合唱准备和合唱开始阶段，下文将具体描述如何基于 ZEGO SDK 打造实时K歌房。

### 合唱准备

合唱准备阶段，开发者需要完成六项配置：超低延迟配置、K歌场景音频配置、推拉流配置、混流对齐配置、下载伴奏、伴奏同步。

#### 超低延迟配置

超低延迟配置需要在创建引擎前配置。


```java
//初始化引擎前配置
private void preEngineConfig(Context application) {
     // 开启超低延迟模式
     engineConfig.advancedConfig.put("ultra_low_latency", "true");
     // 开启超低采集和渲染耗时模式
     engineConfig.advancedConfig.put("enforce_audio_loopback_in_sync", "true");
     ZegoExpressEngine.setEngineConfig(engineConfig);
}
```

<Note title="说明">
超低延迟模式无法动态更新，关闭该模式需要重启引擎。
</Note>

#### K歌场景音频配置

这一部分的配置都是在创建引擎后且推流之前设置。

##### 设置伴奏流音源

点歌用户的伴奏流需要音乐数据，设置音乐数据来源于媒体播放器。完成设置完后，ZEGO SDK 内部会自动将数据塞到伴奏流。如果不设置伴奏流音源，观众端无法收听到音乐。

```java
// 第二路流配置媒体播放器
ZegoCustomAudioConfig zegoCustomAudioConfig = new ZegoCustomAudioConfig();
zegoCustomAudioConfig.sourceType = ZegoAudioSourceType.MEDIA_PLAYER;
mSDKEngine.enableCustomAudioIO(true, zegoCustomAudioConfig, ZegoPublishChannel.AUX);
```

##### 音频配置

音频编码设置如下：

|  | 声道 | 格式 | 码率 |
| ---- | ----| ----| ---- |
| 人声流 | 单声道 | Low3 | 64K |
| 伴奏流 | 双声道 | Low3 | 128K |

```java
ZegoAudioConfig audioConfig = new ZegoAudioConfig(ZegoAudioConfigPreset.HIGH_QUALITY);
audioConfig.bitrate = 64;
audioConfig.codecID = ZegoAudioCodecID.LOW3;
audioConfig.channel = ZegoAudioChannel.MONO;
mSDKEngine.setStreamAlignmentProperty(1, ZegoPublishChannel.MAIN);
mSDKEngine.setAudioConfig(audioConfig, ZegoPublishChannel.MAIN);

ZegoAudioConfig auxAudioConfig = new ZegoAudioConfig(ZegoAudioConfigPreset.HIGH_QUALITY);
audioConfig.bitrate = 128;
audioConfig.codecID = ZegoAudioCodecID.LOW3;
audioConfig.channel = ZegoAudioChannel.STEREO;
mSDKEngine.setStreamAlignmentProperty(1, ZegoPublishChannel.AUX);
mSDKEngine.setAudioConfig(auxAudioConfig, ZegoPublishChannel.AUX);
```

##### 创建媒体播放器

合唱示例 Demo 使用的是 ZGKTVPlayerManager。ZGKTVPlayerManager 是对 ZegoMediaPlayer的封装。ZGKTVMediaplayer 定义和实现了同步伴奏、中途加入合唱、伴奏进度对齐功能。

```java
public static ZGKTVPlayerManager getInstance() {
    if (mInstance == null) {
        synchronized (ZGKTVPlayerManager.class) {
           if (mInstance == null) {
              mInstance = new ZGKTVPlayerManager();
           }
        }
    }
    return mInstance;
}
```

由于逐字歌词需要高频率回调同步进度，可以将进度回调间隔设置为60ms。歌曲评分也会用到媒体播放器的进度回调。如果觉得回调间隔不满足需求，可以调到30ms。

```java
mediaPlayer.setProgressInterval(60);
```

##### 音频前处理(可选)

设备外放时，可以开启 AEC(回声消除)和 ANS(噪声抑制)；带耳机时，可以考虑关闭 AEC 和 ANS。AEC 和 ANS 会对音质有一点损伤和延迟。外放时，如果发现有噪音和回声，可以考虑默认打开 AEC 和 ANS。

```java
mSDKEngine.enableAEC(true);  //是否开启回声消除；true 表示开启；false 表示关闭
mSDKEngine.enableAGC(false);  //是否开启自动增益控制；true 表示开启；false 表示关闭
mSDKEngine.enableANS(true);  //是否开启噪声抑制；true 表示开启噪声抑制；false 表示关闭噪声抑制
mSDKEngine.setAECMode(ZegoAECMode.MEDIUM); //设置回声消除模式
mSDKEngine.setANSMode(ZegoANSMode.MEDIUM); //设置音频噪声抑制模式
mSDKEngine.enableHeadphoneMonitor(false);  //开启耳返， false: 关闭耳返
```

另外为了K歌效果好，可以考虑添加混响。混流为枚举值。详情见 [setReverbPreset](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~ZegoExpressEngine#set-reverb-preset)。

```java
mSDKEngine.setReverbPreset(ZegoReverbPreset.RECORDING_STUDIO); 
```

#### 推拉流配置

先登录房间，再推拉流。

##### 登录房间

```java
mUserInfo = new ZegoUser(String.valueOf(userID), userName);
mSDKEngine.loginRoom(roomID, mUserInfo);
```
##### 同步NTP时间后推流

在推流之前，需要同步 NTP 时间，等同步完后，再推流，开发者可以在推流配置中设置同步完后再推流即可。推流必须在登录房间成功后进行。登录房间成功会触发回调 [onRoomStateUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~IZegoEventHandler#on-room-state-update)。

当state == ZegoRoomStateConnected && errorCode == 0时，登录房间成功。然后将 ZegoPublisherConfig 中 forceSynchronousNetworkTime 设置为 1，开启同步。

```java
public void onRoomStateUpdate(String roomID, ZegoRoomState state, int errorCode, JSONObject extendedData) {
     if (state == CONNECTED && errorCode == 0) {
        mRetryTime = 0;
        if (!mHasFirstLoginRoom) {
            ......
           // 观众进房默认拉混流 上台后停止拉混流
           if (mRole == ZGRoomIdentifier.ZGRoomAnchor) {
                startPublishMV(null);
                startPublishAudio(null);
            } else {
                startPlayingAux();
            }
            mHasFirstLoginRoom = true;
        }
    }
}
public void startPublishMV(@NotNull IRTCCommonCallback callback) {
   ZegoPublisherConfig config = new ZegoPublisherConfig();
   config.forceSynchronousNetworkTime = 1;
   config.roomID = mRoomID;
   L.i(TAG, "startPublishAudio AUX");
   mSDKEngine.startPublishingStream(getMVStreamId(), config, ZegoPublishChannel.AUX);
}

public void startPublishAudio(@NotNull IRTCCommonCallback callback) {
    ZegoPublisherConfig config = new ZegoPublisherConfig();
    config.forceSynchronousNetworkTime = 1;
    config.roomID = mRoomID;
    L.i(TAG, "startPublishAudio MAIN");
    mSDKEngine.startPublishingStream(getMainStreamId(), config, ZegoPublishChannel.MAIN);
}
```

##### 拉流设置 jitterBuffer

麦上用户为了低延迟，需要对拉流配置进行处理，根据不同角色设置不同的 jitterBuffer。观众：(500-3000)，合唱用户：(30,30)。

观众在登录房间后直接拉混流并设置 jitterbuffer。

```java
public void startPlayingAux() {
    mSDKEngine.setPlayStreamBufferIntervalRange(getMixStreamID(), 500, 3000);
    mSDKEngine.startPlayingStream(getMixStreamID(), null);
}
```

每当房间内有人开始推流或者停止推流，其他房间内的人都会收到流变更通知，麦上用户在 [onRoomStreamUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~IZegoEventHandler#on-room-stream-update) 中处理拉流事件。

```java
public void onRoomStreamUpdate(String roomID, ZegoUpdateType updateType, ArrayList<ZegoStream> streamList, JSONObject extendedData) {
    for (ZegoStream stream : streamList) {
       L.e(TAG, "onRoomStreamUpdate:" + " : updateType : " + updateType + " : streamID : " + stream.streamID);
       if (updateType == ADD) {
            if (!stream.streamID.contains("_mv") && !getMainStreamId().contains(stream.streamID)) {
                mSDKEngine.setPlayStreamBufferIntervalRange(stream.streamID, 30, 30);
                mSDKEngine.startPlayingStream(stream.streamID, null);
                mUserStreamIDMap.put(stream.user.userID, stream.streamID);
                mUserNameIDMap.put(stream.user.userID, stream.user.userName);
            }
        } else if (updateType == DELETE) {
            if (!stream.streamID.contains("_mv")) {
                mSDKEngine.stopPlayingStream(stream.streamID);
                mUserStreamIDMap.remove(stream.user.userID);
                mUserNameIDMap.remove(stream.user.userID);
            }
        }
    }
}
```

##### 多推一路伴奏

点歌用户需要多推一路流。ZEGO SDK 中没有现成接口标识点歌用户，需要业务侧自行标识。在推人声流的时候，根据角色顺带推伴奏流即可。推流时机为成功登录房间之后。

```java
public void startPublishMV(@NotNull IRTCCommonCallback callback) {
   ZegoPublisherConfig config = new ZegoPublisherConfig();
   config.forceSynchronousNetworkTime = 1;
   config.roomID = mRoomID;
   L.i(TAG, "startPublishAudio AUX");
   mSDKEngine.startPublishingStream(getMVStreamId(), config, ZegoPublishChannel.AUX);
}
```

#### 混流对齐配置

点歌用户会发起混流对齐任务，ZEGO 服务器会将麦上用户的人声流和自己的伴奏流对齐后混成一路流，观众拉混流收听即可。发起混流任务的时机为点歌用户推流之后。混流对齐可以节省费用。

混流对齐需要设置流对齐模式和设置混流任务的对齐模式。每当有用户下麦或者上麦，点歌用户需要更新混流任务，主要是修改需要混的流的数量。

另外，为了保证每次合唱时观众端的收听体验（即人声和伴奏是对齐的），需要在每次开唱前重推伴奏流，再次更新混流任务。

##### 设置流对齐模式

设置需要进行混流对齐的流。人声流和伴奏流都要设置为对齐。在创建引擎后且播放音乐前设置即可。

```java
mSDKEngine.setStreamAlignmentProperty(1, ZegoPublishChannel.MAIN);
mSDKEngine.setStreamAlignmentProperty(1, ZegoPublishChannel.AUX);
```

##### 混流任务设置对齐模式

点歌用户需要发起混流任务。人声和伴奏流都需要设置对齐。[ZegoMixerTask](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~ZegoMixerTask) 类中 [setStreamAlignmentMode](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~ZegoMixerTask#set-stream-alignment-mode) 设置为 ZegoStreamAlignmentModeTry。

```java
ZegoMixerTask mixerTask = new ZegoMixerTask(getMixStreamID());
mixerTask.enableSoundLevel(true);
mixerTask.setStreamAlignmentMode(ZegoStreamAlignmentMode.TRY);
```

##### 每次播放前重推伴奏流并更新混流

重推伴奏流后需要更新混流。确保后台服务每次都能对流进行对齐。

```java
public void restartMvStream() {
    L.i(TAG, "restartMvStream");
    if (mRole == ZGRoomIdentifier.ZGRoomAnchor) {
        mSDKEngine.stopPublishingStream(ZegoPublishChannel.AUX);
        ZegoPublisherConfig config = new ZegoPublisherConfig();
        config.forceSynchronousNetworkTime = 1;
        config.roomID = mRoomID;
        mSDKEngine.startPublishingStream(getMVStreamId(), config, ZegoPublishChannel.AUX);
        updateMixStream();
    }
}

```

##### 混流输入和输出配置

完成 [混流任务设置对齐模式](#混流任务设置对齐模式) 创建混流任务后，接下来设置混流任务的输入和输出。混流输出的流 ID 由业务侧自定义，混流 ID 的如何下发也由业务侧决定。

```java
private void updateMixStream() {
    L.i(TAG, "updateMixStream");
    ZegoMixerTask mixerTask = new ZegoMixerTask(getMixStreamID());
    mixerTask.enableSoundLevel(true);
    mixerTask.setStreamAlignmentMode(ZegoStreamAlignmentMode.TRY);

    ZegoMixerAudioConfig audioConfig = new ZegoMixerAudioConfig();
    audioConfig.bitrate = 128;
    audioConfig.codecID = ZegoAudioCodecID.LOW3;
    audioConfig.channel = ZegoAudioChannel.STEREO;
    mixerTask.setAudioConfig(audioConfig);

    ArrayList<ZegoMixerInput> inputs = new ArrayList<>();
    int length = 0;
    Rect audioRect = new Rect(0, 0, 0, 0);

    ZegoMixerInput publisherMusicInput = new ZegoMixerInput(getMVStreamId(),
            ZegoMixerInputContentType.AUDIO, audioRect);
    inputs.add(publisherMusicInput);

    ZegoMixerInput playStreamInput;
    for (String playStreamID : mUserStreamIDMap.values()) {
        playStreamInput = new ZegoMixerInput(playStreamID, ZegoMixerInputContentType.AUDIO, audioRect);
        length = playStreamID.length();
        if (length >= Constants.SOUND_ID_SURFIX_NUM) {
            playStreamInput.soundLevelID = Integer.parseInt(playStreamID.substring(length - Constants.SOUND_ID_SURFIX_NUM, length));
        }
        inputs.add(playStreamInput);
    }
    mixerTask.setInputList(inputs);

    ZegoMixerOutput output = new ZegoMixerOutput(getMixStreamID());
    ArrayList<ZegoMixerOutput> outputs = new ArrayList<>();
    outputs.add(output);
    mixerTask.setOutputList(outputs);

    mSDKEngine.startMixerTask(mixerTask, new IZegoMixerStartCallback() {
        @Override
        public void onMixerStartResult(int resultCode, JSONObject jsonObject) {
            if (resultCode != 0) {

            }
        }
    });
}
```

#### 下载伴奏

实时方案要求本地播放伴奏，所以需要将伴奏下载到本地。

合唱示例 demo 会将下载好的歌曲信息通过房间附加消息通知给其他用户，合唱用户需要下载资源参与合唱，观众需要下载歌词用于同步展示。

```java
public void selectSong(View view) {
    if (CheckDoubleClick.isFastDoubleClick()) {
        return;
    }

    songListDialog = new SongListDialog(songId -> {
       switchMusicPlayerMenu(songId);
       // 设置房间附加消息
       ZGKTVCopyrightedSong song = ZGKTVPlayerManager.getInstance().getSong(songId);
       RoomMusicInfo roomMusicInfo = new RoomMusicInfo();
       roomMusicInfo.setSongID(song.getSongID());
       roomMusicInfo.setSongName(song.getSongName());
       roomMusicInfo.setSingerName(song.getSingerName());
       roomMusicInfo.setAlbumImg(song.getAlbumImageUri());
       roomMusicInfo.setKrcToken(song.getKrcToken());
       ZGRealTimeKtvManager.getInstance().setRoomExtraMusic(roomMusicInfo);

       songListDialog.dismiss();
    });
    songListDialog.show(getSupportFragmentManager(), songListDialog.getTag());
}

public void setRoomExtraMusic(RoomMusicInfo roomMusicInfo) {
    mSDKEngine.setRoomExtraInfo(mRoomID, "RoomMusicInfo", APIBase.getGson().toJson(roomMusicInfo), null);
    FileDownloadManager.getInstance().downloadFile(roomMusicInfo.getSongID(), roomMusicInfo);
}
```

实现此功能也可以使用其他方式，只需通知到位即可。收到歌曲信息后，参与合唱的用户开始下载歌曲。如何搜索歌词、展示歌单、下载歌曲和下载歌词，请参考 [ZEGO 内容中心 - 点歌](/online-ktv-android/zego-content-center/sing-songs)。

#### 伴奏同步

完成伴奏同步后，就开始播放音乐进行合唱。

伴奏同步的做法为：点歌用户约定在未来某个时间点（如延迟 N 秒后）开始播放伴奏，然后合唱。各端的时间都以 NTP 时间为准，NTP 时间会在 ZEGO SDK 初始化后开始同步。

具体流程如下：
1. 某个合唱者发起合唱，先获取 NTP 时间 “T”，设置播放伴奏时间为 “T0（ms） = T + delay”。delay可以是3秒，10秒。
2. 将播放伴奏时间 “T0” 通过更新流附加消息接口/后台接口等发送出去。
3. 本地设置定时器等时间点到 “T0” 时刻就播放伴奏。
4. 其他合唱用户接收到发起合唱通知后执行“步骤 3”。

流程图：

<Frame width="512" height="auto" >
  <img src="https://doc-media.zego.im/sdk-doc/Pics/GoEnjoy/online_KTV/Implementation/real_time_KTV_Chorus_Synchronization_Implementation.png" />
</Frame>

在合唱示例 Demo 中，点歌用户约定好时间后，通过流附加消息通知其他合唱用户一起同步伴奏。ZGKTVMediaplayer 是对 ZegoMediaPlayer 的封装，只需往 startInFuture 这个接口传入未来的时间，音乐就会在这个约定时间点定时播放。


发起合唱用户：

```java
StreamExtraInfo extraInfo = new StreamExtraInfo();
extraInfo.setMessage("Mediaplayer-StartInFuture");
extraInfo.setkBehaviorType(Constants.MediaPlayerBehavior.PLAYING.value());
long startTime = ZGRealTimeKtvManager.getInstance().getNetworkTime() + 2000;
extraInfo.setkStartTime(startTime);
if (!currentPlaySongId.isEmpty()) {
    ZGKTVCopyrightedSong song = ZGKTVPlayerManager.getInstance().getSong(currentPlaySongId);
    extraInfo.setkResourceID(song.getResourceID());
    ZGKTVPlayerManager.getInstance().startInFuture(startTime, song.getResourceID());
}
ZGRealTimeKtvManager.getInstance().setStreamExtraInfo(APIBase.getGson().toJson(extraInfo));
```

参与合唱用户：

```java
public void onRoomStreamExtraInfoUpdate(String roomId, ArrayList<ZegoStream> streamList) {
     StreamExtraInfo streamExtraInfo = APIBase.getGson().fromJson(
     streamList.get(0).extraInfo, StreamExtraInfo.class);
     if (streamExtraInfo != null && !streamExtraInfo.getMessage().equals("LeaveRoom")) {
     if (mRole == ZGRoomIdentifier.ZGRoomAudience) {
            return;
     }
     if (streamExtraInfo.getkBehaviorType() == Constants.MediaPlayerBehavior.PLAYING.value()) {
        ZGKTVPlayerManager.getInstance().startInFuture(streamExtraInfo.getkStartTime(),
        streamExtraInfo.getkResourceID());
    } 
}
```

### 合唱开始

此时已经是播放音乐开始合唱了，合唱的过程中需要支持中途加入合唱、伴奏进度保障和​观众歌词同步的功能。这些功能的实现都需要点歌用户将伴奏进度和同步伴奏进度的信息通过 SEI 发送出去。

```java
public void onPlaybackProgressUpdate(ZegoMediaPlayer mediaPlayer, long progress) {
    mPlayerCurrentTimeMillis = System.currentTimeMillis();
    mPlayerCurrentProgress = progress;
    if (ZGRealTimeKtvManager.getInstance().isAnchor()) {
          long curtime = ZGRealTimeKtvManager.getInstance().getNetworkTime();
          HostSEIInfo hostSEIInfo = new HostSEIInfo();
          ZGKTVCopyrightedSong song = ZGKTVPlayerManager.getInstance().getSong(currentPlaySongId);
          hostSEIInfo.setkTotalKey(song.getDuration());
          hostSEIInfo.setkState(0);
          // hostSEIInfo.setkRole();
          hostSEIInfo.setkProgressKey(progress);
          hostSEIInfo.setkPointTimeKey(curtime);
          hostSEIInfo.setkResourceID(song.getResourceID());
          ZGRealTimeKtvManager.getInstance().sendSEI(APIBase.getGson().toJson(hostSEIInfo).getBytes());
     }
}
```

#### 中途加入合唱

中途加入合唱需要加入者先获取当前播放歌曲的信息，下载对应的歌曲到本地，然后解析 SEI 信息进行伴奏同步。

具体流程如下：

1. 点歌用户会在本端的播放进度回调中，通过 SEI 发送当前伴奏的播放进度 p（ms）和进度回调的 NTP 时间 t0（ms）。
2. 中途上麦后接收到房主的进度 p 和进度回调时间 t0，获取当前 NTP 时间 t1（ms）。
3. 计算需要跳转（seek）的伴奏播放进度：p0 = t1 - t0 + p。
4. 先加载伴奏，完成后再跳转 seek 到 p0 位置。如果当前房主在暂停伴奏，seek 后需要 暂停（pause）。

代码实现：

```java
private void syncAccompanyWithDict(HostSEIInfo hostSEIInfo) {
    if (isAnchor() && !ZGKTVPlayerManager.getInstance().isPlaying()) {
         ZGKTVPlayerManager.getInstance().conformAccompany(
            hostSEIInfo.getkResourceID(),
            hostSEIInfo.getkProgressKey(),
            hostSEIInfo.getPointTimeKey()
        );
   }
}
```

#### 伴奏对齐

麦上合唱用户的进度以点歌用户的伴奏进度为准，根据点歌用户 SEI 中的同步伴奏信息进行调节。由于插拔耳机会导致本地伴奏进度滞后，可以以此来保证进度一致。

具体的流程如下：

1. 麦上合唱者在播放进度回调时通过 SEI 发送当前播放进度 p 和进度回调的 NTP 时间 t，同时保存进度 p’ 和 NTP 时间 t‘。
2. 其他合唱者接收到其他人的进度 p 和进度回调时间 t。
3. 计算进度差：md（ms） = t' - t - (p'- p)（其中 p 和 p’ 不相等，需要抹去进度差）。
md > 0：本端伴奏慢
md = 0：同步
md < 0：本端伴奏快
4. 当 md > 30 毫秒时，需要 seek 的播放进度为 p = p' + md，然后同步伴奏进度。
5. 不断重复以上流程。

代码实现：

```java
private void calculateAccompanyLatencyWithDict(HostSEIInfo hostSEIInfo) {
    long oppositeProgress = hostSEIInfo.getProcessMillis();
    long oppositeTime = hostSEIInfo.getPointTimeKey();
    long ntp = mSDKEngine.getNetworkTimeInfo().timestamp;
    long currentProgress = ZGKTVPlayerManager.getInstance().getCurrentProgress();
    long latency = ntp - oppositeTime - (currentProgress - oppositeProgress);
    if (latency > 30) {
        ZGKTVPlayerManager.getInstance().seekTo(currentProgress + latency);
    }
}
```

#### 歌词同步

##### 合唱用户歌词同步

通过媒体播放器的进度回调进行同步即可，歌词控件请参考 [下载](/online-ktv-android/downloads) 页面获取。

```java
public void onMediaPlayerPlayingProgress(ZegoMediaPlayer mediaPlayer, long millisecond) {
     L.i("PlayerManager", "onPlaybackProgressUpdate:progress:" + millisecond);
     ZGKTVCopyrightedSong song = getSongByResourceID(mResourceID);
     if (song != null && song.getCallback() != null) {
         song.getCallback().onPlaybackProgressUpdate(millisecond);
    }
     if (mIZGKTVPlayerUpdateListener != null) {
          mIZGKTVPlayerUpdateListener.onPlaybackProgressUpdate(mediaPlayer, millisecond);
     }
}

public void onPlaybackProgressUpdate(ZegoMediaPlayer mediaPlayer, long progress) {
       ......
       if (ZGRealTimeKtvManager.getInstance().isAnchor()) {
       ......
       updateMusicPlayerMenu();
   }
}

private void updateMusicPlayerMenu() {
    // 计算出当前播放器进度 （当前进度 = 当前时间 - 播放器回调时的时间 + 播放器进度）
    long customProgress = System.currentTimeMillis() - mPlayerCurrentTimeMillis + mPlayerCurrentProgress;
    L.i(TAG, "onPlaybackProgressUpdate:" + customProgress);
    currentProgress = customProgress;
    List<ZGKTVCopyrightedSong> orderList = KTVRoomOrderSongManager.getInstance().getOrderList();
    if (orderList == null || orderList.isEmpty()) {
       return;
 }
    String songId = orderList.get(orderList.size() - 1).getSongID();
    if (songId == null || songId.isEmpty()) {
        return;
    }
    mZegoLyricView.setCurrentTimeMillis(customProgress);
    progressInterval++;
    if (progressInterval >= 2) {
        ZGKTVCopyrightedSong song = ZGKTVPlayerManager.getInstance().getSong(songId);
        long duration = 0;
        if (song != null) {
            duration = song.getDuration();
        }
        if (duration == 0) {
            duration = ZGKTVPlayerManager.getInstance().getTotalDuration();
        }
        mMusicPlayerMenu.updateTime(customProgress, duration);
        mZegoNetworkTime = ZGRealTimeKtvManager.getInstance().getNetworkTime();
        mPlayProgress = customProgress;
        progressInterval = 0;
        mMusicPlayerMenu.getPitchView().setCurrentSongProgress(customProgress, mCurrentPitch);
    }
}
```
##### 观众端的歌词同步

通过解析混流中的 SEI，观众端获取播放点歌用户的播放进度，以此同步歌词进度。

```java
public void onPlayerRecvSEI(String streamId, HostSEIInfo info) {
    if (!ZGRealTimeKtvManager.getInstance().isAnchor()) {
        // 观众同步歌词
        mZegoLyricView.setCurrentTimeMillis(info.getkProgressKey());
        mMusicPlayerMenu.updateTime(info.getkProgressKey(), info.getkTotalKey());
    }
}
```
