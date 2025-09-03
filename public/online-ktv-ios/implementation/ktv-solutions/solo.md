# 独唱方案

---
  
## 简介

独唱是指麦上用户独自完成演唱的 KTV 场景。搭建一个完整的独唱场景需要点歌、推拉流以及歌词同步等基础能力。

## 前提条件

在实现独唱之前，请确保：

- 已在项目中集成 ZEGO Express SDK（含版权音乐功能），详情请参考 [下载](/online-ktv-ios/downloads)。
- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppID 和 AppSign，详情请参考 [控制台 - 项目管理](/console/project-info) 中的“项目信息”。
- 已联系 ZEGO 商务人员为 AppID 开通版权音乐服务。

<Note title="说明">
SDK 支持 Token 鉴权。若您需要升级鉴权方式，可参考 [如何从 AppSign 鉴权升级为 Token 鉴权](https://doc-zh.zego.im/faq/token_upgrade?product=ExpressVideo&platform=ios)。
</Note>

## 角色说明

独唱场景中存在两种角色：`演唱者` 和 `观众`。

- 演唱者：
    - 演唱者推一路人声流，并开启混音，混入媒体播放器的声音。
    - 开唱后，媒体播放器播放本地音乐，演唱者通过播放进度回调发送 SEI 同步歌词给观众端。
- 观众：
    - 拉流收听歌声。
    - 解析流中 SEI 的歌曲进度信息，用于同步歌词。

## 场景实现

### 演唱者端

#### 点歌

具体实现方法请参考 [点歌 - 实现流程](/online-ktv-ios/implementation/song-selection) 中的步骤 “4.1 初始化 SDK” 到 “ 获取歌曲资源”。

#### 获取歌词

通过 [requestResource](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoCopyrightedMusic#request-resource-type-callback) 接口请求歌曲资源，再从返回的歌曲信息中获取 krcToken，向 [getKrcLyricByToken](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoCopyrightedMusic#get-krc-lyric-by-token-callback) 传入 krcToken，获取逐字歌词。

```objc
/** 歌曲的 songID */
NSString *songID = @"";
/** 版权方，其对应的枚举值信息，请联系 ZEGO 商务咨询*/
ZegoCopyrightedMusicVendorID vendorID = ; 
/** 一次性获取逐行歌词 */
[self.copyrightedMusic getLrcLyric:songID vendorID:vendorID callback:^(int errorCode, NSString * _Nonnull lyrics) {
    NSLog(@"逐行歌词是：%@", lyrics);
}];

/** 点歌时获取的 krcToken */
NSString *krcToken = @"";
/** 一次性获取逐字歌词 */
[self.copyrightedMusic getKrcLyricByToken:krcToken callback:^(int errorCode, NSString * _Nonnull lyrics) {
    NSLog(@"逐字歌词是：%@", lyrics);
}];
```

<Warning title="注意">
歌词控件相关内容请参考 [歌词组件](/online-ktv-ios/zego-content-center/lyrics-display-component)。
</Warning>


#### 将当前播放的歌曲音频流推送到远端

演唱者调用 [startPublishingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoExpressEngine#start-publishing-stream) 开始推流，随后调用 [enableAux](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~ObjectiveC_ios~class~zego-media-player&jumpType=route#enable-aux) 接口开启混流，将播放歌曲的音频流推送到远端，以供观众收听。

<Note title="说明">

实现基本的音频通话功能，将音频流推送到远端，可参考 [实时语音 - 快速开始 - 实现流程](/real-time-voice-ios/quick-start/implementing-voice-call#使用步骤)。
</Note>

```objc
ZegoUser *user = [ZegoUser userWithUserID:@"user1"];
ZegoRoomConfig *roomConfig = [[ZegoRoomConfig alloc] init];
roomConfig.isUserStatusNotify = YES;
// 登录房间，user 信息需要与初始化版权音乐对象时传入的一致
// 如果此前已经登录过房间，此步骤应省略。
[[ZegoExpressEngine sharedEngine] loginRoom:roomID user:user config:roomConfig];

// 将音视频流推送到远端
[[ZegoExpressEngine sharedEngine] startPublishingStream:@"stream1"];
```
```objc
/** 开启混音推流 */
BOOL enable = YES;
[mediaPlayer enableAux:enable];

/** 调整推流的音量 */
int changeVolume = 100;
[mediaPlayer setPublishVolume:changeVolume];
```

#### 向观众端发送播放进度

演唱者通过在媒体播放器的进度回调中，调用 [sendSEI](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoExpressEngine#send-sei) 发送 SEI，向观众端同步歌曲的当前播放进度，详细内容请参考 [实时音视频 - 进阶功能 - 媒体补充增强信息](/real-time-video-android-java/communication/sei)。

```objc
- (void)mediaPlayer:(ZegoMediaPlayer *)mediaPlayer 
playingProgress:(unsigned long long)millisecond {
    if (self.role == ZGRoomAnchor) {
        long long curtime = [self.engine getNetworkTimeInfo].timestamp;
        NSNumber *currentTime = [NSNumber numberWithUnsignedLongLong:curtime];
        self.curProgressNtpTime = curtime;
        self.curProgress = millisecond;
        
        NSMutableDictionary *dic = [@{} mutableCopy];
        [dic safeSetValue:@(_songDuration) forKey:@"kTotalKey"];
        [dic safeSetValue:@(self.mediaPlayer.currentState) forKey:@"kState"];
        [dic safeSetValue:@(self.role) forKey:@"kRole"];
        [dic safeSetValue:@(millisecond) forKey:@"kProgressKey"];
        [dic safeSetValue:currentTime forKey:@"kPointTimeKey"];
        [dic safeSetValue:self.resourceID forKey:@"kResourceID"];
        NSData *data = [NSJSONSerialization dataWithJSONObject:dic options:0 error:nil];
        [self.engine sendSEI:data channel:ZegoPublishChannelMain];
    }
}
```
### 观众端

#### 拉流收听

观众只要通过拉流 [startPlayingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoExpressEngine#start-playing-stream-canvas) 就可以听到歌曲的声音，不需要再去做点歌、下载、播放等的一系列操作。

```objc
/** 观众端拉流ID需要与演唱者推流ID(startPublishingStream)一致 */
[self.engine startPlayingStream:@"streamID" canvas:nil];
```

#### 观众端歌词同步

##### 获取歌词并设置

观众端将从演唱者端获取的 krcToken 传入 [getKrcLyricByToken](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoCopyrightedMusic#get-krc-lyric-by-token-callback)，获取逐字歌词。

示例代码请参考本文的 [获取歌词](/online-ktv-ios/implementation/ktv-solutions/solo#获取歌词)。

观众端也可以通过 [getSharedResource](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoCopyrightedMusic#get-shared-resource-type-callback) 接口，传入演唱者端通过 [sendExtendedRequest](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoCopyrightedMusic#send-extended-request-params-callback) 接口请求资源时获取到的 songID（请参考 [点歌](/online-ktv-ios/implementation/ktv-solutions/solo#点歌)），获取对应的歌词信息，详情请参考 [进阶功能 - 分享歌曲](/online-ktv-ios/zego-content-center/advanced-features#分享歌曲)。

##### 同步演唱者进度信息

观众通过 [onPlayerRecvSEI](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~protocol~ZegoEventHandler#on-player-recv-sei-stream-id) 回调收到 SEI 信息，获取进度信息，用于歌词同步。

```objc
- (void)onPlayerRecvSEI:(NSData *)data streamID:(NSString *)streamID {
    NSLog(@"onPlayerRecvSEI");
    NSError *error = nil;
    NSDictionary *dictionary = [NSJSONSerialization JSONObjectWithData:data options:NSJSONReadingMutableContainers error:&error];
    if (dictionary == nil) { return; }
    //观众端歌词对齐
    [self syncLyricWithDict:dictionary streamID:streamID];
}

- (void)syncLyricWithDict:dictionary streamID:(NSString *)streamID {
    if (self.role == ZGRoomAudience && [streamID isEqualToString:self.mixStreamID]) {
        NSNumber *role = [dictionary safeObjectForKey:@"kRole"];
        if (role.unsignedIntegerValue != ZGRoomAnchor) {
            return;
        }
        NSNumber *progress = [dictionary safeObjectForKey:@"kProgressKey"];
        NSNumber *total = [dictionary safeObjectForKey:@"kTotalKey"];
        //只有观众端通过这个来同步
        if ([self.delegate respondsToSelector:@selector(onUpdateMeidaplayerProgress:duration:)]) {
            [self.delegate onUpdateMeidaplayerProgress:progress.longLongValue duration:total.longLongValue];
        }
    }
}

- (void)onUpdateMeidaplayerProgress:(long long)progress duration:(long long)duration {
    self.lyricByWordView.progress = progress; 
    //当前进度
    NSString *curString = [self formatTime:(int)progress];
    //总时长
    NSString *totalString = [self formatTime:(int)duration];
   self.musicProcessLabel.text = [NSString stringWithFormat:@"%@ / %@",curString,totalString];
}
```

## 调用时序

<Frame width="512" height="auto" ><img src="https://doc-media.zego.im/sdk-doc/Pics/CopyrightedMusic/solo_new.png" /></Frame>
