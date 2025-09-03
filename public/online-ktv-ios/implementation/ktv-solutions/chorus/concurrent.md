# 实时方案

---

实时方案是 ZEGO 首创的K歌方案，有别于市面上的串行 KTV 方案，让线下K歌房在线上完美呈现。麦上用户可以实时参与合唱，观众也可以中途加入合唱。接下来，让我们看看如何基于 ZEGO 实时方案打造实时合唱K歌房。

## 方案架构

K歌房是基于语聊房衍生发展的玩法。换而言之，K歌离不开连麦。实时方案中推拉流架构如下：
<Frame width="auto" height="auto" >
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

实时方案主要有几个环节：超低延迟配置、K歌场景音频配置、推拉流配置、混流对齐配置、伴奏同步、中途加入合唱、伴奏进度保障等。结合实际的K歌业务、上面环节以及时序进度，本方案将实现流程分为合唱准备和合唱开始阶段。按照合唱准备和合唱开始阶段，下文将具体描述如何基于 ZEGO SDK 打造实时K歌房。

### 合唱准备

合唱准备阶段，开发者需要完成六项配置：超低延迟配置、K歌场景音频配置、推拉流配置、混流对齐配置、下载伴奏、伴奏同步。

#### 超低延迟配置

超低延迟配置需要在创建引擎前配置。

```objc
ZegoEngineConfig *config = [[ZegoEngineConfig alloc] init];
config.advancedConfig = @{
   //超低延时模式
   @"ultra_low_latency":@"true",
   @"enforce_audio_loopback_in_sync":@"true"};
[ZegoExpressEngine setEngineConfig:config];
```
<Note title="说明">
超低延迟模式无法动态更新，关闭该模式需要重启引擎。
</Note>

#### K歌场景音频配置

这一部分的配置都是在创建引擎后且推流之前设置。

##### 设置伴奏流音源

点歌用户的伴奏流需要音乐数据，设置音乐数据来源于媒体播放器。完成设置后，ZEGO SDK 内部会自动将数据塞到伴奏流。如果不设置伴奏流音源，观众端无法收听到音乐。

```objc
//set channel aux audio source
ZegoCustomAudioConfig *audioConfig = [[ZegoCustomAudioConfig alloc] init];
audioConfig.sourceType = ZegoAudioSourceTypeMediaPlayer;
[[ZegoExpressEngine sharedEngine] enableCustomAudioIO:YES config:audioConfig channel:ZegoPublishChannelAux];
```

##### 音频配置

音频编码设置如下：

|  | 声道 | 格式 | 码率 |
| ---- | ----| ----| ---- |
| 人声流 | 单声道 | Low3 | 64K |
| 伴奏流 | 双声道 | Low3 | 128K |

```objc
//设置音频编码配置
ZegoAudioConfig *config = [[ZegoAudioConfig alloc] initWithPreset:ZegoAudioConfigPresetHighQuality];
config.channel = ZegoAudioChannelMono;
config.codecID = ZegoAudioCodecIDLow3;
config.bitrate = 64;
[self.engine setAudioConfig:config channel:ZegoPublishChannelMain];

ZegoAudioConfig *configAux = [[ZegoAudioConfig alloc] init];
configAux.channel = ZegoAudioChannelStereo;
configAux.codecID = ZegoAudioCodecIDLow3;
configAux.bitrate = 128;
[self.engine setAudioConfig:configAux channel:ZegoPublishChannelAux];
```

##### 创建媒体播放器

合唱示例 Demo 中使用的是 ZGKTVMediaplayer。ZGKTVMediaplayer 是对 ZegoMediaPlayer 的封装。ZGKTVMediaplayer 定义和实现了同步伴奏、中途加入合唱、伴奏进度对齐功能。

```objc
self.mediaPlayer = [[ZGKTVMediaplayer alloc] init];
self.mediaPlayer.delegate = self;
```

由于逐字歌词需要高频率回调同步进度，可以将进度回调间隔设置为60ms。歌曲评分也会用到媒体播放器的进度回调。如果觉得回调间隔不满足需求，可以调到30ms。

```objc
[self.mediaPlayer setProgressInterval:60];
```

##### 音频前处理(可选)

设备外放时，可以开启 AEC(回声消除)和 ANS(噪声抑制)；带耳机时，可以考虑关闭 AEC 和 ANS。AEC 和 ANS 会对音质有一点损伤和延迟。外放时，如果发现有噪音和回声，可以考虑默认打开 AEC 和 ANS。

```objc
[self.engine setAECMode:ZegoAECModeMedium];  //设置回声消除模式
[self.engine enableAEC:YES];                 //是否开启回声消除；YES 表示开启；NO 表示关闭
[self.engine setANSMode:ZegoANSModeMedium];  //设置音频噪声抑制模式
[self.engine enableANS:YES];                 //是否开启噪声抑制；YES 表示开启噪声抑制；NO 表示关闭噪声抑制
[self.engine enableAGC:NO];                  //是否开启自动增益控制；YES 表示开启；NO 表示关闭
```

另外为了K歌效果好，可以考虑添加混响。混流为枚举值。详情见 [setReverbPreset](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoExpressEngine#set-reverb-preset)。

```objc
[self.engine setReverbPreset:value];
```

#### 推拉流配置

先登录房间，再推拉流。

##### 登录房间

```objc
ZegoUser *user = [ZegoUser userWithUserID:userID userName:userName];
[[ZegoExpressEngine sharedEngine] loginRoom:roomID user:user];
```
##### 同步NTP时间后推流

在推流之前，需要同步 NTP 时间，等同步完后，再推流，开发者可以在推流配置中设置同步完后再推流即可。推流必须在登录房间成功后进行。登录房间成功会触发回调 [onRoomStateUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~protocol~ZegoEventHandler#on-room-stream-update-stream-list-extended-data-room-id)。

当state == ZegoRoomStateConnected && errorCode == 0时，登录房间成功。然后将 [ZegoPublisherConfig](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoPublisherConfig) 中 forceSynchronousNetworkTime 设置为YES。

```objc
- (void)onRoomStateUpdate:(ZegoRoomState)state errorCode:(int)errorCode extendedData:(nullable NSDictionary *)extendedData roomID:(NSString *)roomID {
    if (state == ZegoRoomStateConnected && errorCode == 0) {
        if (self.role == ZGRoomAnchor) {
            ZegoPublisherConfig *config = [[ZegoPublisherConfig alloc] init];
            config.roomID = self.roomID;
            config.forceSynchronousNetworkTime = YES;
            [self.engine startPublishingStream:[self streamID] config:config channel:ZegoPublishChannelMain];
            [self.engine startPublishingStream:[NSString stringWithFormat:@"%@_mv",[self streamID]] config:config channel:ZegoPublishChannelAux];
            ...
        }else if(self.role == ZGRoomAudience){
            ...
        }
    }
}
```

##### 拉流设置 jitterBuffer

麦上用户为了低延迟，需要对拉流配置进行处理，根据不同角色设置不同的 jitterBuffer。观众：(500-3000)，合唱用户：(30,30)。

观众在登录房间后直接拉混流并设置 jitterbuffer。

```objc
if (state == ZegoRoomStateConnected && errorCode == 0) {
   if (self.role == ZGRoomAnchor) {
            ...
   }else if(self.role == ZGRoomAudience){
       [self.engine startPlayingStream:self.mixStreamID canvas:nil];
       NSRange range = NSMakeRange(500, 3000);
       [self.engine setPlayStreamBufferIntervalRange:range streamID:self.mixStreamID];
    }
    ...
}
```

在 onUserJoinedWithStreamdID:username:userID: 和 onUserLeavedWithStreamdID:stream: 回调中调用 setupCanvas: 设置拉流配置。

```objc
- (void)onRoomStreamUpdate:(ZegoUpdateType)updateType streamList:(NSArray<ZegoStream *> *)streamList extendedData:(nullable NSDictionary *)extendedData roomID:(NSString *)roomID {
    if (updateType == ZegoUpdateTypeAdd) {
        for (ZegoStream *stream in streamList) {
            if(![stream.streamID containsString:@"_mv"] && ![self.playStreams containsObject:stream.streamID]){
                if([self.delegate respondsToSelector:@selector(onUserJoinedWithStreamdID:username:userID:)]){  //调用 setupCanvas: 设置拉流配置。
                    [self.delegate onUserJoinedWithStreamdID:stream.streamID username:stream.user.userID userID:stream.user.userID];
                }
            }
        }
    }else if(updateType == ZegoUpdateTypeDelete){
        for (ZegoStream *stream in streamList) {
            [self.playStreams removeObject:stream.streamID];
            [self.engine stopPlayingStream:stream.streamID];
            if([self.delegate respondsToSelector:@selector(onUserLeavedWithStreamdID:)]){
                [self.delegate onUserLeavedWithStreamdID:stream.streamID]; //调用 setupCanvas: 设置拉流配置。
            }
        }
    }
    ......
}

- (void)setupCanvas:(ZGCanvas *)canvas {
    NSString *publishStreamID = [ZGUserIDHelper userID];
    if ([publishStreamID isEqualToString:canvas.streamID]) {
        ......
    }else {
        ZegoCanvas *zegoCanvas = [[ZegoCanvas alloc]init];
        zegoCanvas.view = canvas.renderView;
        zegoCanvas.viewMode = canvas.mode;
        [self.engine startPlayingStream:canvas.streamID canvas:zegoCanvas];
        NSRange range = NSMakeRange(30, 30);
        [self.engine setPlayStreamBufferIntervalRange:range streamID:canvas.streamID];
    }
}
```

##### 多推一路伴奏

点歌用户需要多推一路流。ZEGO SDK 中没有现成接口标识点歌用户，需要业务侧自行标识。在推人声流的时候，根据角色顺带推伴奏流即可。推流时机为成功登录房间之后。

```objc
ZegoPublisherConfig *config = [[ZegoPublisherConfig alloc] init];
config.forceSynchronousNetworkTime = YES;
[self.engine startPublishingStream:[NSString stringWithFormat:@"%@_mv",[self streamID]] config:config channel:ZegoPublishChannelAux];
```

#### 混流对齐配置

点歌用户会发起混流对齐任务，ZEGO 服务器会将麦上用户的人声流和自己的伴奏流对齐后混成一路流，观众拉混流收听即可。发起混流任务的时机为点歌用户推流之后。混流对齐可以节省费用。

混流对齐需要设置流对齐模式和设置混流任务的对齐模式。每当有用户下麦或者上麦，点歌用户需要更新混流任务，主要是修改需要混的流的数量。

另外，为了保证每次合唱时观众端的收听体验（即人声和伴奏是对齐的），需要在每次开唱前重推伴奏流，再次更新混流任务。

##### 设置流对齐模式

设置需要进行混流对齐的流。人声流和伴奏流都要设置为对齐。在创建引擎后且播放音乐前设置即可。

```objc
[self.engine setStreamAlignmentProperty:1 channel:ZegoPublishChannelAux];
[self.engine setStreamAlignmentProperty:1 channel:ZegoPublishChannelMain];
```

##### 混流任务设置对齐模式

点歌用户需要发起混流任务。人声和伴奏流都需要设置对齐。[ZegoMixerTask](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoMixerTask) 类中 [setStreamAlignmentMode](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoMixerTask#set-background-image-url) 设置为 ZegoStreamAlignmentModeTry。

```objc
NSString *taskID = [NSString stringWithFormat:@"ktv_mix_task_%@",[self streamID]];
self.task = [[ZegoMixerTask alloc] initWithTaskID:taskID];
[self.task setStreamAlignmentMode:ZegoStreamAlignmentModeTry];
ZegoMixerVideoConfig *videoConfig = [ZegoMixerVideoConfig configWithResolution:CGSizeMake(1, 1) fps:1 bitrate:1];
[self.task setVideoConfig:videoConfig];
```

##### 每次播放前重推伴奏流并更新混流

重推伴奏流后需要更新混流。确保后台服务每次都能对流进行对齐。

```objc
- (void)republishAndUpdateMixer {
    if(self.role == ZGRoomAnchor){
        [self.engine stopPublishingStream:ZegoPublishChannelAux];
        ZegoPublisherConfig *config = [[ZegoPublisherConfig alloc] init];
        config.roomID = self.roomID;
        config.forceSynchronousNetworkTime = 1;
        NSString *streamID = [ZGUserIDHelper userID];
        [self.engine startPublishingStream:[NSString stringWithFormat:@"%@_mv",streamID] config:config channel:ZegoPublishChannelAux];
        [self initMixer];
        [self updateMixerStreams];
    }
}
```

#### 混流输入和输出配置

完成 `4.2 混流任务设置对齐模式` 创建混流任务后，接下来设置混流任务的输入和输出。混流输出的流 ID 由业务侧自定义，混流 ID 的如何下发也由业务侧决定。

```objc
//设置混流的音频配置
ZegoMixerAudioConfig *audioConfig = [ZegoMixerAudioConfig defaultConfig];
audioConfig.bitrate = 128;
audioConfig.codecID = ZegoAudioCodecIDLow3;
audioConfig.channel = ZegoAudioChannelStereo;
[self.task setAudioConfig:audioConfig];
//开启混流的音浪
[self.task enableSoundLevel:YES];
[self setMixStreamOuput];
```

混流的输出

```objc
ZegoMixerOutput *output = [[ZegoMixerOutput alloc] initWithTarget:self.mixStreamID];
self.task.outputList = [@[output] mutableCopy];
```

混流的输入

```objc
NSMutableArray *willMixStreams = [self.playStreams mutableCopy];
NSString *publishStreamID = [self streamID];
NSString *publishStreamID2 = [NSString stringWithFormat:@"%@_mv",publishStreamID];
[willMixStreams addObjectsFromArray:@[publishStreamID, publishStreamID2]];
NSMutableArray *inputs = [NSMutableArray array];
for (NSString *stream in willMixStreams) {
    ZegoMixerInput *input = [self mixStreamInputWithID:stream rect:CGRectZero];
    [inputs addObject:input];
}
[self.task setInputList:inputs];
```

```objc
- (ZegoMixerInput *)mixStreamInputWithID:(NSString *)streamID rect:(CGRect)rect{
    ZegoMixerInput *input = [[ZegoMixerInput alloc] initWithStreamID:streamID contentType:ZegoMixerInputContentTypeAudio layout:rect];
    if (![streamID hasSuffix:@"_mv"]) {
        int ID = [self getLastFifthNumber:streamID.integerValue];
        input.soundLevelID = ID;
    }
    return input;
}
```

启动混流任务

```objc
- (void)updateMixerStreams{
    [self layoutMixStreamFrame];
    [self.engine startMixerTask:self.task callback:^(int errorCode, NSDictionary * _Nullable extendedData) {
        if (errorCode == 0) {
            NSLog(@"mix success! extendedData = %@",extendedData);
        }else {
            NSLog(@"======startMixerTask:%d=====",errorCode);
        }
    }];
}

//音频的混流布局frame设置为0即可。
- (void)layoutMixStreamFrame{
    NSMutableArray *willMixStreams = [self.playStreams mutableCopy];
    NSString *publishStreamID = [self streamID];
    NSString *publishStreamID2 = [NSString stringWithFormat:@"%@_mv",publishStreamID];
    [willMixStreams addObjectsFromArray:@[publishStreamID, publishStreamID2]];
    NSMutableArray *inputs = [NSMutableArray array];
    for (NSString *stream in willMixStreams) {
        ZegoMixerInput *input = [self mixStreamInputWithID:stream rect:CGRectZero];
        [inputs addObject:input];
    }
    [self.task setInputList:inputs];
}
```

#### 下载伴奏

实时方案要求本地播放伴奏，所以需要将伴奏下载到本地。

合唱示例 demo 会将下载好的歌曲信息通过房间附加消息通知给其他用户，合唱用户需要下载资源参与合唱，观众需要下载歌词用于同步展示。

```objc
- (void)sendRoomExtraInfo:(ZegoRequestAccompanyInfo *)info {
    //把歌曲信息通过房间附加消息发出去
    NSDictionary *infoValueDict = @{@"songID" : info.songID,@"songName" : info.songName,@"singerName" : info.singerName,@"albumImg" : info.albumImg,@"krcToken" : info.krcToken};
    //切歌时前停止播放
    [self.manager stopMediaplayer];
    [self.manager setRoomExtraInfo:infoValueDict];
}

- (void)onRoomExtraInfoUpdate:(NSArray<ZegoRoomExtraInfo *> *)roomExtraInfoList roomID:(NSString *)roomID{
    for (ZegoRoomExtraInfo *info in roomExtraInfoList) {
        if([info.key isEqualToString:@"RoomMusicInfo"]){
            if ([self.delegate respondsToSelector:@selector(downloadMediaWithValue:)]) {
                [self.delegate downloadMediaWithValue:info.value];
            }
        }
    }
}
```

实现此功能也可以使用其他方式，只需通知到位即可。收到歌曲信息后，参与合唱的用户开始下载歌曲。如何搜索歌词、展示歌单、下载歌曲和下载歌词，请参考 [ZEGO 内容中心 - 点歌](/online-ktv-ios/zego-content-center/sing-songs)。

#### 伴奏同步

完成伴奏同步后，就开始播放音乐进行合唱。

伴奏同步的做法为：点歌用户约定在未来某个时间点（如延迟 N 秒后）开始播放伴奏，然后合唱。各端的时间都以 NTP 时间为准，NTP 时间会在 ZEGO SDK 初始化后开始同步。

具体流程如下：
1. 某个合唱者发起合唱，先获取 NTP 时间 “T”，设置播放伴奏时间为 “T0（ms） = T + delay”。delay可以是3秒，10秒。
2. 将播放伴奏时间 “T0” 通过更新流附加消息接口/后台接口等发送出去。
3. 本地设置定时器等时间点到 “T0” 时刻就播放伴奏。
4. 其他合唱用户接收到发起合唱通知后执行“步骤 3”。

流程图：

<Frame width="auto" height="auto" >
  <img src="https://doc-media.zego.im/sdk-doc/Pics/GoEnjoy/online_KTV/Implementation/real_time_KTV_Chorus_Synchronization_Implementation.png" />
</Frame>
在合唱示例 Demo 中，点歌用户约定好时间后，通过流附加消息通知其他合唱用户一起同步伴奏。ZGKTVMediaplayer 是对 ZegoMediaPlayer 的封装，只需往 startInFuture 这个接口传入未来的时间，音乐就会在这个约定时间点定时播放。

发起合唱用户：

```objc
- (void)startMediaplayer:(NSString *)resourceID {
    self.resourceID = resourceID;
    long long timestamp = [self getNetworkTimestamp];
    long long startTime = timestamp + 2000;
    //同步播放时间
    NSMutableDictionary *message = [NSMutableDictionary dictionary];
    message[@"message"] = @"Mediaplayer-StartInFuture";
    message[@"kStartTime"] = @(startTime);
    message[@"kBehaviorType"] = @(MediaPlayerBehaviorPlay);
    if (resourceID) {
        message[@"kResourceID"] = resourceID;
    }
    [self updateStreamExtraInfo:message];
    //定时播放
    [self performMediaplayer:MediaPlayerBehaviorPlay onTime:startTime resourceID:resourceID];
}
- (void)performMediaplayer:(MediaPlayerBehavior)behavior onTime:(long long)ntpTimestamp resourceID:(NSString * __nullable)resourceID {
    if (self.role == ZGRoomAudience) {
        return;
    }
    if(behavior == MediaPlayerBehaviorPlay || behavior == MediaPlayerBehaviorResume) {
        [self republishAndUpdateMixer];
    }
    if (behavior == MediaPlayerBehaviorPlay) {
        if (self.mediaPlayer.currentState == ZegoMediaPlayerStatePlaying) {
            return;
        }
        [self.mediaPlayer loadCopyrightedMusicResourceWithPosition:resourceID];
        [self.mediaPlayer startInFuture:ntpTimestamp];
    }else if (behavior == MediaPlayerBehaviorStop) {
        [self.mediaPlayer stop];
    }
}
```

参与合唱用户：

```objc
- (void)onRoomStreamExtraInfoUpdate:(NSArray<ZegoStream *> *)streamList roomID:(NSString *)roomID {
    if (self.role == ZGRoomAnchor) {
        NSData *data = [streamList.firstObject.extraInfo dataUsingEncoding:NSUTF8StringEncoding];
        NSDictionary *dict = [NSJSONSerialization JSONObjectWithData:data options:0 error:nil];
        NSString *message = dict[@"message"];
        if (![message isEqualToString:@"LeaveRoom"]) {
            NSInteger behavior = [dict[@"kBehaviorType"] integerValue];
            long long ntpTimestamp = [[dict[@"kStartTime"] description] longLongValue];
            NSString *resourceID = dict[@"kResourceID"];
            [self performMediaplayer:behavior onTime:ntpTimestamp resourceID:resourceID];
        }
    }
}
```

### 合唱开始

此时已经是播放音乐开始合唱了，合唱的过程中需要支持中途加入合唱、伴奏进度保障和​观众歌词同步的功能。这些功能的实现都需要点歌用户将伴奏进度和同步伴奏进度的信息通过 SEI 发送出去。

```objc
- (void)playingProgress:(unsigned long long)millisecond {
    if (self.role == ZGRoomAnchor) {
        long long curtime = [self.engine getNetworkTimeInfo].timestamp;
        NSNumber *currentTime = [NSNumber numberWithUnsignedLongLong:curtime];
        self.curProgressNtpTime = curtime;
        self.curProgress = millisecond;
        
        NSMutableDictionary *dic = [@{} mutableCopy];
        if (self.role == ZGRoomAnchor) {
            [dic safeSetValue:@(_songDuration) forKey:@"kTotalKey"];
            [dic safeSetValue:@(self.mediaPlayer.currentState) forKey:@"kState"];
        }
        [dic safeSetValue:@(self.role) forKey:@"kRole"];
        [dic safeSetValue:@(millisecond) forKey:@"kProgressKey"];
        [dic safeSetValue:currentTime forKey:@"kPointTimeKey"];
        [dic safeSetValue:self.resourceID forKey:@"kResourceID"];
        NSData *data = [NSJSONSerialization dataWithJSONObject:dic options:0 error:nil];
        [self.engine sendSEI:data channel:ZegoPublishChannelMain];
    }
    ...
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

```objc
- (void)syncAccompanyWithDict:dictionary streamID:(NSString *)streamID {
    //判断是否属于中途加入合唱的主播，下载完资源才同步伴奏
    if(self.role == ZGRoomAnchor && self.playerState == ZegoMediaPlayerStateNoPlay && _tagHadDownload){
        NSString *localResourceID = [dictionary objectForKey:@"kResourceID"];
        if (localResourceID.length == 0) {
            return;
        }
        NSNumber *mediaPlayerState = [dictionary safeObjectForKey:@"kState"];
        NSNumber *progress = [dictionary safeObjectForKey:@"kProgressKey"];
        NSNumber *pointTime = [dictionary objectForKey:@"kPointTimeKey"];
        if (mediaPlayerState.integerValue == ZegoMediaPlayerStatePlaying) {
            [self.mediaPlayer conformAccompany:localResourceID withProgress:progress.longLongValue pointTime:pointTime.longLongValue];
        }
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

```objc
- (void)calculateAccompanyLatencyWithDict:(NSDictionary *)dictionary streamID:(NSString *)streamID {
    if(self.role == ZGRoomAudience) {
        return;
    }
    NSNumber *oppositeProgress = [dictionary objectForKey:@"kProgressKey"];
    NSNumber *oppositeTime = [dictionary objectForKey:@"kPointTimeKey"];
    if(oppositeTime){
        if(oppositeTime) {
            long long latency = self.curProgressNtpTime - oppositeTime.longLongValue - (self.curProgress - oppositeProgress.longLongValue);
            if (latency > 30) {
                [self.mediaPlayer conformAccompanyWithLatency:latency];
            }
        }
    }
}
```

#### 歌词同步

##### 合唱用户歌词同步

通过媒体播放器的进度回调进行同步即可，歌词控件请参考 [下载](/online-ktv-ios/downloads) 页面获取。

```objc
- (void)playingProgress:(unsigned long long)millisecond {
    ...
    if ([self.delegate respondsToSelector:@selector(onUpdateMeidaplayerProgress:duration:)]) {
        [self.delegate onUpdateMeidaplayerProgress:millisecond duration:_songDuration];
    }
}

- (void)onUpdateMeidaplayerProgress:(long long)progress duration:(long long)duration {
    self.lyricByWordView.progress = progress;
    self.currentProgress = progress;
    //歌词滚动相关
    //打分相关
    [self.pitchView setCurrentSongProgress:(int)progress pitch:self.pitch];
    NSString *curString = [self formatTime:(int)progress];
    NSString *totalString = [self formatTime:(int)duration];
    self.musicProcessLabel.text = [NSString stringWithFormat:@"%@ / %@",curString,totalString];
}

```

##### 观众端歌词同步

通过解析混流中的 SEI，观众端获取播放点歌用户的播放进度，以此同步歌词进度。

```objc
- (void)syncLyricWithDict:dictionary streamID:(NSString *)streamID {
    if (self.role == ZGRoomAudience && [streamID isEqualToString:self.mixStreamID]) {
        NSNumber *role = [dictionary safeObjectForKey:@"kRole"];
        if (role.unsignedIntegerValue != ZGRoomAnchor) {
            return;
        }
        NSNumber *progress = [dictionary safeObjectForKey:@"kProgressKey"];
        NSNumber *total = [dictionary safeObjectForKey:@"kTotalKey"];
        if ([self.delegate respondsToSelector:@selector(onUpdateMeidaplayerProgress:duration:)]) {
            [self.delegate onUpdateMeidaplayerProgress:progress.longLongValue duration:total.longLongValue];
        }
    }
}

- (void)onUpdateMeidaplayerProgress:(long long)progress duration:(long long)duration {
    self.lyricByWordView.progress = progress;
    self.currentProgress = progress;
    //歌词滚动相关
    //打分相关
    [self.pitchView setCurrentSongProgress:(int)progress pitch:self.pitch];
    NSString *curString = [self formatTime:(int)progress];
    NSString *totalString = [self formatTime:(int)duration];
    self.musicProcessLabel.text = [NSString stringWithFormat:@"%@ / %@",curString,totalString];
}
```
