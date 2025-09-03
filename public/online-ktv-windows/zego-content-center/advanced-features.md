# 进阶功能

- - -

本文介绍如何使用 KTV 场景的进阶功能。

## 前提条件

在使用以下“进阶功能”之前，请先实现 [点歌](/online-ktv-windows/zego-content-center/sing-songs) 功能。

## 实现歌词与歌曲进度的同步

ZEGO 提供两种形式的歌词，逐行歌词和逐字歌词。

- 逐行歌词是指歌词按照句子来分割，一句一句展示。用户可以调用 [getLrcLyric](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~zego-express-i-zego-copyrighted-music#get-lrc-lyric) 接口，传入歌曲的 song_id 获取逐行歌词。
- 逐字歌词是指歌词一个字一个字展示，可以用来做精确的歌词进度展示。用户可以调用 [getKrcLyricByToken](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~CPP_windows~class~zego-express-i-zego-copyrighted-music&jumpType=route#get-krc-lyric-by-token) 接口，传入获取伴奏资源信息 [requestResource](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoCopyrightedMusic#request-resource)、[getSharedResource](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoCopyrightedMusic#get-shared-resource) 时得到的 krcToken 来获取逐字歌词。


### 获取歌词

以逐行歌词为例，歌词信息有每行歌词的开始与结束时间，用户可以先调用 [setProgressInterval](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~CPP_windows~class~zego-express-i-zego-media-player&jumpType=route#set-progress-interval) 接口设置合适播放进度回调间隔。ZEGO Express SDK 会以该时间间隔，通过 [onMediaPlayerPlayingProgress](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~CPP_windows~class~zego-express-i-zego-media-player-event-handler&jumpType=route#on-media-player-playing-progress) 接口给出播放进度，用户可以在回调中调用获取歌词的方法获取当前时间点的歌词。具体回调的信息参考 [获取歌曲与歌词资源接口说明](/online-ktv-windows/client-api/apis-to-obtain-songs-and-lyrics)。


```cpp
// 设置 mediaplayer 代理
mediaPlayer->setEventHandler(eventHandler);
```

```cpp
public void onMediaPlayerPlayingProgress(IZegoMediaPlayer* mediaPlayer, unsigned long long millisecond) override {
    // 在歌曲播放的过程中，不断调用获取歌词的方法获取当前时间对应的歌词，并展示
    
    /** 歌曲的 songID */
    std::string songID = ;
    /** 版权方，其对应的枚举值信息，请联系 ZEGO 商务咨询*/
    ZegoCopyrightedMusicVendorID vendorID = ; 
    // 一次性获取逐行歌词
    copyrightedMusic->getLrcLyric(songID, vendorID, [=](/online-ktv-windows/zego-content-center/int-errorcode,-std::string-lyrics) {

    });

    /** 点歌时获取的 krcToken */
    std::string krcToken = ;

    // 一次性获取逐字歌词
    COPYRIGHTED_MUSIC::GetKrcLyricByToken(krcToken.c_str());
};
```

## 分享歌曲

<Warning title="注意">

不同版权方对应的歌曲资源有效时长不同（详情请咨询 ZEGO 商务人员），调用 [getSharedResource](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoCopyrightedMusic#get-shared-resource) 接口获取其他用户分享的资源时，如果返回了 `1017050` 错误码，表示资源已失效。

此时，需要有用户重新调用 [requestResource](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoCopyrightedMusic#request-resource) 接口获取资源并进行分享，其他用户重新调用 [getSharedResource](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoCopyrightedMusic#get-shared-resource) 接口获取对应的歌曲资源。
</Warning>

点歌用户点完歌曲后，其他用户可以调用 [getSharedResource](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoCopyrightedMusic#get-shared-resource) 获取对应的歌曲资源，接口回调的信息参考 [获取歌曲与歌词资源接口说明](/online-ktv-windows/client-api/apis-to-obtain-songs-and-lyrics)。

获取成功后，可参考 [点歌 - 下载歌曲](/online-ktv-windows/zego-content-center/sing-songs#下载歌曲) 获取歌曲资源。

```cpp
/** 点歌用户分享的歌曲资源对应的 songID */
ZegoCopyrightedMusicGetSharedConfig config;
config.songID = ;
config.vendorID = ;

/** 点歌用户分享的歌曲资源对应的资源类型 */
ZegoCopyrightedMusicResourceType resourceType = ZegoCopyrightedMusicResourceSong;

copyrightedMusic->getSharedResource(config, resourceType, [=](/online-ktv-windows/zego-content-center/int-errorcode,-std::string-resource) {
        if (errorCode == 0) {
                // 歌曲资源获取成功，可进行下载歌曲等操作
        } else {
                // 失败
        }
});
```

## 伴奏/原唱切换

在需要切换伴奏/原唱的场景下，要求伴奏资源有原唱和伴奏双音轨。

在点伴奏的结果回调 [ZegoCopyrightedMusicRequestResourceCallback](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~interface~ZegoExpressDefines#zego-copyrighted-music-request-resource-callback)、[ZegoCopyrightedMusicGetSharedResourceCallback](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~interface~ZegoExpressDefines#zego-copyrighted-music-get-shared-resource-callback) 中，“has_original” 字段会告知用户该资源是否有原唱，详细信息参考 [获取歌曲与歌词资源接口说明](/online-ktv-windows/client-api/apis-to-obtain-songs-and-lyrics)。

若该资源有原唱，开发者可以调用 [setAudioTrackIndex](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~CPP_windows~class~zego-express-i-zego-media-player&jumpType=route#set-audio-track-index) 进行伴奏/原唱切换：
- 0 表示伴奏；
- 1 表示原唱。

```cpp
/** 播放器 */
IZegoMediaPlayer* mediaPlayer = ;
/** 伴奏音轨 */
mediaPlayer->setAudioTrackIndex(ZEGO_COPYRIGHTED_MUSIC_AUDIO_TRACK_INDEX_ACCOMPANIMENT);
/** 原唱音轨 */
mediaPlayer->setAudioTrackIndex(ZEGO_COPYRIGHTED_MUSIC_AUDIO_TRACK_INDEX_ORIGINAL_SONG);
```

## 演唱分数与音高线

用户在根据伴奏演唱时，可以获取每一句演唱的分数，也可以在整个演唱结束后，获取到总分。

仅伴奏资源支持演唱分数的获取。

### 获取演唱分数

<Frame width="512" height="auto" ><img src="https://doc-media.zego.im/sdk-doc/Pics/GoEnjoy/online_KTV/demo/ZegoPitchView.png" /></Frame>


**实现流程**

1. 通过 [实现歌词与歌曲进度的同步](#实现歌词与歌曲进度的同步) 中获取逐字歌词。
2. 在开始播放伴奏音乐后，使用版权音乐的评分接口 [startScore](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~CPP_windows~class~zego-express-i-zego-copyrighted-music&jumpType=route#start-score) 开始评分。
3. 通过获取逐字歌词回调 [ZegoCopyrightedMusicGetKrcLyricByTokenCallback](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~interface~ZegoExpressDefines#zego-copyrighted-music-get-krc-lyric-by-token-callback) 中的参数行开始时间 begin_time 和行持续时间 duration 相加判断一句歌词完成，在用户唱完一句后，可调用 [getPreviousScore](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~CPP_windows~class~zego-express-i-zego-copyrighted-music&jumpType=route#get-previous-score) 接口获取本句得分。


### 获取演唱总分


<Frame width="512" height="auto" ><img src="https://doc-media.zego.im/sdk-doc/Pics/CopyrightedMusic/Total_score.png" /></Frame>


用户可以在演唱结束后，调用 [getTotalScore](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~CPP_windows~class~zego-express-i-zego-copyrighted-music&jumpType=route#get-total-score) 计算出整个演唱的总得分。


### 获取音高线数据

<Frame width="512" height="auto" ><img src="https://doc-media.zego.im/sdk-doc/Pics/CopyrightedMusic/pitch_line_data.png" /></Frame>

可以用演唱声音的音高和歌曲伴奏本身的音高来展示歌曲的音高线。


**实现流程**

1. 通过 [实现歌词与歌曲进度的同步](#实现歌词与歌曲进度的同步) 中获取逐字歌词。

2. 调用 [startScore](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~CPP_windows~class~zego-express-i-zego-copyrighted-music&jumpType=route#start-score) 接口开始评分。

3. 调用 [getStandardPitch](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~CPP_windows~class~zego-express-i-zego-copyrighted-music&jumpType=route#get-standard-pitch) 接口获取标准音高数组，数组里每一个音高线包含开始时间 begin_time，持续时间 duration，音高值 value（范围 10-90）。

4. 调用 [getCurrentPitch](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~CPP_windows~class~zego-express-i-zego-copyrighted-music&jumpType=route#get-current-pitch) 接口获取当前演唱声音的音高数组。

```json
/** 音高线数据 */
{
    "pitch": [
      {
        "begin_time": 13350,
        "duration": 199,
        "value": 18
      },
      {
        "begin_time": 13549,
        "duration": 600,
        "value": 26
      }
    ]
}
```


```cpp
/** 音乐资源 ID */
std::string resourceID = ;

// 开始播放的位置
unsigned long long startPosition = ;

// 创建 ZegoMediaPlayer
IZegoMediaPlayer* mediaPlayer = engine->createMediaPlayer();

mediaPlayer->loadCopyrightedMusicResourceWithPosition(resourceID,startPosition, [=](/online-ktv-windows/zego-content-center/int-errorcode){

});
mediaPlayer->start();

/** 播放器状态变化回调 */
void onMediaPlayerStateUpdate(IZegoMediaPlayer *mediaPlayer, ZegoMediaPlayerState state, int errorCode)
{
    if(state = ZegoMediaPlayerState::ZEGO_MEDIA_PLAYER_STATE_PLAYING)
    {
        // 重置分数
        copyrightedMusic->resetScore(resourceID);
        // 开启评分，设置回调间隔为 60 ms
        // 请注意，需要在 onMediaPlayerStateUpdate 回调中监听到歌曲资源已经开始播放，才能调用 startScore 接口
        copyrightedMusic->startScore(resourceID,60);
    }
}

// 唱完一句后，获取前一句分数
int previousScore = copyrightedMusic->getPreviousScore(resourceID);

// 获取平均分
int averageScore = copyrightedMusic->getAverageScore(resourceID);

// 获取总分
int toTalScore = copyrightedMusic->getTotalScore(resourceID);

// 获取满分
int fullScore = copyrightedMusic->getFullScore(resourceID);

// 暂停评分
copyrightedMusic->pauseScore(resourceID);

// 恢复评分
copyrightedMusic->resumeScore(resourceID);

// 停止评分
copyrightedMusic->stopScore(resourceID);
```

### 更多演唱分数的相关接口

开发者可以使用 [getAverageScore](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~CPP_windows~class~zego-express-i-zego-copyrighted-music&jumpType=route#get-average-score)、[getTotalScore](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~CPP_windows~class~zego-express-i-zego-copyrighted-music&jumpType=route#get-total-score) 等接口获取分数，也可以使用 [pauseScore](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~CPP_windows~class~zego-express-i-zego-copyrighted-music&jumpType=route#pause-score)、[resumeScore](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~CPP_windows~class~zego-express-i-zego-copyrighted-music&jumpType=route#resume-score)、[stopScore](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~CPP_windows~class~zego-express-i-zego-copyrighted-music&jumpType=route#stop-score)、[resetScore](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~CPP_windows~class~zego-express-i-zego-copyrighted-music&jumpType=route#reset-score) 等接口控制评分状态。



## 销毁版权音乐对象

当需要调用 [destroyCopyrightedMusic](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoExpressEngine#destroy-copyrighted-music) 销毁版权音乐对象时，需在反初始化 SDK 接口 [destroyEngine](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~ZegoExpressSDK#destroy-engine) 之前。


```cpp
// 先销毁 copyrightedMusic
engine->destroyCopyrightedMusic(copyrightedMusic);

// 再销毁 ZegoExpressEngine
ZegoExpressSDK::destroyEngine(engine, nullptr);
engine = nullptr;
```
