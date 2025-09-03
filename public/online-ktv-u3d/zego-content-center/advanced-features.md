# 进阶功能

- - -

本文介绍如何使用 KTV 场景的进阶功能。

## 前提条件

在使用以下“进阶功能”之前，请先实现 [点歌](/online-ktv-u3d/zego-content-center/sing-songs) 功能。

## 实现歌词与歌曲进度的同步

ZEGO 提供两种形式的歌词，逐行歌词和逐字歌词。

- 逐行歌词是指歌词按照句子来分割，一句一句展示。用户可以调用 [GetLrcLyric](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoCopyrightedMusic#get-lrc-lyric) 接口，传入歌曲的 songID 获取逐行歌词。
- 逐字歌词是指歌词逐行展示后，一个字一个字的高亮呈现，可以用来做精确的歌词进度展示。用户可以调用 [GetKrcLyricByToken](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoCopyrightedMusic#get-krc-lyric-by-token) 接口，传入获取伴奏资源信息 [RequestResource](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoCopyrightedMusic#request-resource)、[GetSharedResource](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoCopyrightedMusic#get-shared-resource) 时得到的 krcToken 来获取逐字歌词。


### 获取歌词

以逐行歌词为例，歌词信息有每行歌词的开始与结束时间，用户可以先调用 [SetProgressInterval](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~interface~ZegoMediaPlayer#set-progress-interval) 接口设置合适播放进度回调间隔。ZEGO Express SDK 会以该时间间隔，通过 [OnMediaPlayerPlayingProgress](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~IZegoMediaPlayerHandler#on-media-player-playing-progress) 接口给出播放进度，用户可以在回调中调用获取歌词的方法获取当前时间点的歌词。具体回调的信息参考 [获取歌曲与歌词资源接口说明](/online-ktv-u3d/client-api/apis-to-obtain-songs-and-lyrics)。


```c#
// 设置 mediaplayer 代理
mediaPlayer.onMediaPlayerPlayingProgress = (ZegoMediaPlayer mediaPlayer, ulong millisecond) => {
    // 在歌曲播放的过程中，不断调用获取歌词的方法获取当前时间对应的歌词，并展示
    
    /** 歌曲的 songID */
    string songID = ;
    /** 版权方，其对应的枚举值信息，请联系 ZEGO 商务咨询*/
    ZegoCopyrightedMusicVendorID vendorID = ;
    // 一次性获取逐行歌词
    copyrightedMusic.GetLrcLyric(songID, vendorID, (int errorCode, string lyrics)=>{

    });

    /** 点歌时获取的 krcToken */
    string krcToken = ;

    // 一次性获取逐字歌词
    copyrightedMusic.GetKrcLyricByToken(krcToken, (int errorCode, string lyrics)={
    });
};
```

## 分享歌曲

<Warning title="注意">

不同版权方对应的歌曲资源有效时长不同（详情请咨询 ZEGO 商务人员），调用 [GetSharedResource](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoCopyrightedMusic#get-shared-resource) 接口获取其他用户分享的资源时，如果返回了 `1017050` 错误码，表示资源已失效。

此时，需要有用户重新调用 [RequestResource](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoCopyrightedMusic#request-resource) 接口获取资源并进行分享，其他用户重新调用 [GetSharedResource](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoCopyrightedMusic#get-shared-resource) 接口获取对应的歌曲资源。
</Warning>

点歌用户点完歌曲后，其他用户可以调用 [GetSharedResource](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoCopyrightedMusic#get-shared-resource) 获取对应的歌曲资源，接口回调的信息参考 [获取歌曲与歌词资源接口说明](/online-ktv-u3d/client-api/apis-to-obtain-songs-and-lyrics)。

获取成功后，可参考 [点歌 - 下载歌曲](/online-ktv-u3d/zego-content-center/sing-songs#下载歌曲) 获取歌曲资源。

```c#
/** 点歌用户分享的歌曲资源对应的 songID */
ZegoCopyrightedMusicGetSharedConfig config = new ZegoCopyrightedMusicGetSharedConfig;
config.songID = "";
config.vendorID = ;

/** 点歌用户分享的歌曲资源对应的资源类型 */
ZegoCopyrightedMusicResourceType resourceType = ZegoCopyrightedMusicResourceType.ZegoCopyrightedMusicResourceSong;

copyrightedMusic.GetSharedResource(config, resourceType, (int errorCode, string resource) => {
    if (errorCode == 0) {
        // 歌曲资源获取成功，可进行下载歌曲等操作
    } else {
        // 失败
    }
});
```

## 伴奏/原唱切换

在需要切换伴奏/原唱的场景下，要求伴奏资源有原唱和伴奏双音轨。

在点伴奏的结果回调 [OnCopyrightedMusicRequestResourceCallback](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~interface~IZegoCopyrightedMusicHandler#on-copyrighted-music-request-resource-callback)、[OnCopyrightedMusicGetSharedResourceCallback](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~interface~IZegoCopyrightedMusicHandler#on-copyrighted-music-get-shared-resource-callback) 中，“has_original” 字段会告知用户该资源是否有原唱，详细信息参考 [获取歌曲与歌词资源接口说明](/online-ktv-u3d/client-api/apis-to-obtain-songs-and-lyrics)。

若该资源有原唱，开发者可以调用 [SetAudioTrackIndex](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~interface~ZegoMediaPlayer#set-audio-track-index) 进行伴奏/原唱切换：
- 0 表示伴奏；
- 1 表示原唱。

```c#
/** 播放器 */
ZegoMediaPlayer mediaPlayer = engine.CreateMediaPlayer();
/** 伴奏/原唱音轨 */
int index = ;
int res = mediaPlayer.SetAudioTrackIndex(index);
```

## 演唱分数与音高线

用户在根据伴奏演唱时，可以获取每一句演唱的分数，也可以在整个演唱结束后，获取到总分。

仅伴奏资源支持演唱分数的获取。

### 获取演唱分数

<Frame width="512" height="auto" ><img src="https://doc-media.zego.im/sdk-doc/Pics/GoEnjoy/online_KTV/demo/ZegoPitchView.png" /></Frame>


**实现流程**

1. 通过 [实现歌词与歌曲进度的同步](#实现歌词与歌曲进度的同步) 中获取逐字歌词。
2. 在开始播放伴奏音乐后，使用版权音乐的评分接口 [StartScore](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoCopyrightedMusic#start-score) 开始评分。
3. 通过获取逐字歌词回调 [OnCopyrightedMusicGetKrcLyricByTokenCallback](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~interface~IZegoCopyrightedMusicHandler#on-copyrighted-music-get-krc-lyric-by-token-callback) 中的参数行开始时间 begin_time 和行持续时间 duration 相加判断一句歌词完成，在用户唱完一句后，可调用 [GetPreviousScore](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoCopyrightedMusic#get-previous-score) 接口获取本句得分。


### 获取演唱总分


<Frame width="512" height="auto" ><img src="https://doc-media.zego.im/sdk-doc/Pics/CopyrightedMusic/Total_score.png" /></Frame>


用户可以在演唱结束后，调用 [GetTotalScore](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoCopyrightedMusic#get-total-score) 计算出整个演唱的总得分。


### 获取音高线数据

<Frame width="512" height="auto" ><img src="https://doc-media.zego.im/sdk-doc/Pics/CopyrightedMusic/pitch_line_data.png" /></Frame>

开发者可以用演唱声音的音高和歌曲伴奏本身的音高来展示歌曲的音高线。


**实现流程**

1. 通过 [实现歌词与歌曲进度的同步](#实现歌词与歌曲进度的同步) 中获取逐字歌词。

2. 调用 [StartScore](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoCopyrightedMusic#start-score) 接口开始评分。

3. 调用 [GetStandardPitch](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoCopyrightedMusic#get-standard-pitch) 接口获取标准音高数组，数组里每一个音高线包含开始时间 begin_time，持续时间 duration，音高值 value（范围 10-90）。

4. 调用 [GetCurrentPitch](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoCopyrightedMusic#get-standard-pitch) 接口获取当前演唱声音的音高数组。

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

```c#
/** 音乐资源 ID */
string resourceID = ;

// 开始播放的位置
ulong startPosition = ;

// 创建 ZegoMediaPlayer
ZegoMediaPlayer mediaPlayer = engine.CreateMediaPlayer();

mediaPlayer.LoadCopyrightedMusicResourceWithPosition(resourceID, startPosition, (int errorCode) =>
{
    if (errorCode == 0)
    {
        mediaPlayer.Start();

        // 开始评分
        copyrightedMusic.StartScore(resourceID);

        // 唱完一句后，获取前一句分数
        int previousScore = copyrightedMusic.GetPreviousScore(resourceID);

        // 获取平均分
        int averageScore = copyrightedMusic.GetAverageScore(resourceID);

        // 获取总分
        int toTalScore = copyrightedMusic.GetTotalScore(resourceID);

        // 获取满分
        int fullScore = copyrightedMusicInstance.GetFullScore(resourceID);

        // 暂停评分
        copyrightedMusic.PauseScore(resourceID);

        // 恢复评分
        copyrightedMusic.RresumeScore(resourceID);

        // 停止评分
        copyrightedMusic.StopScore(resourceID);  
    }
});
```

### 更多演唱分数的相关接口

开发者可以使用 [GetAverageScore](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoCopyrightedMusic#get-average-score)、[GetTotalScore](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoCopyrightedMusic#get-total-score) 等接口获取分数，也可以使用 [PauseScore](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoCopyrightedMusic#pause-score)、[ResumeScore](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoCopyrightedMusic#resume-score)、[StopScore](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoCopyrightedMusic#stop-score)、[ResetScore](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoCopyrightedMusic#reset-score) 等接口控制评分状态。


## 销毁版权音乐对象

当需要调用 [DestroyCopyrightedMusic](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoExpressEngine#destroy-copyrighted-music) 销毁版权音乐对象时，需在反初始化 SDK 接口 [DestroyEngine](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoExpressEngine#destroy-engine) 之前。

```c#
// 先销毁 copyrightedMusic
engine.DestroyCopyrightedMusic(copyrightedMusic);

// 再销毁 ZegoExpressEngine
ZegoExpressEngine.DestroyEngine();
```
