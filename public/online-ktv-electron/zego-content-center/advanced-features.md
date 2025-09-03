# 进阶功能

- - -

本文介绍如何使用 KTV 场景的进阶功能。

## 前提条件

在使用以下“进阶功能”之前，请先实现 [点歌](/online-ktv-electron/zego-content-center/sing-songs) 功能。

## 实现歌词与歌曲进度的同步

ZEGO 提供两种形式的歌词，逐行歌词和逐字歌词。

- 逐行歌词是指歌词按照句子来分割，一句一句展示。用户可以调用 [getLrcLyricWithVendorID](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_electron~class~ZegoCopyrightedMusic#get-lrc-lyric-with-vendor-id) 接口，传入歌曲的 song_id 获取逐行歌词。
- 逐字歌词是指歌词一个字一个字展示，可以用来做精确的歌词进度展示。用户可以调用 [getKrcLyricByToken](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_electron~class~ZegoCopyrightedMusic#get-krc-lyric-by-token) 接口，传入获取伴奏资源信息 [requestResource](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_electron~class~ZegoCopyrightedMusic#request-resource) 时得到的 krcToken 来获取逐字歌词。


### 获取歌词

以逐行歌词为例，歌词信息有每行歌词的开始与结束时间，用户可以先调用 [setProgressInterval](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_electron~class~ZegoMediaPlayer#set-progress-interval) 接口设置合适播放进度回调间隔。ZEGO Express SDK 会以该时间间隔，通过 [onMediaPlayerPlayingProgress](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_electron~class~ZegoMediaPlayer#on-media-player-playing-progress) 接口给出播放进度，用户可以在回调中调用获取歌词的方法获取当前时间点的歌词。具体回调的信息参考 [获取歌曲与歌词资源接口说明](/online-ktv-electron/client-api/apis-to-obtain-songs-and-lyrics)。


```js
// 在歌曲播放的过程中，不断调用获取歌词的方法获取当前时间对应的歌词，并展示
copyRightedMusicInst.on('onMediaPlayerPlayingProgress', (res) =>{
    /** 歌曲的 songID */
    const songID = ;
    // 一次性获取逐行歌词；其中版权方对应的枚举值信息，请联系 ZEGO 商务咨询
    copyRightedMusicInst.getLrcLyricWithVendorID(songID, zgDefines.ZegoCopyrightedMusicVendorID.ZegoCopyrightedMusicVendorDefault).then(function(res){
        //监听结果
        console.log(res.lyrics);
    })

    /** 点歌时获取的 krcToken */
    const krcToken = '';

    // 一次性获取逐字歌词
    copyRightedMusicInst.getKrcLyricByToken(krcToken).then(function(res){
        //监听结果
        console.log(res.lyrics);
    })
})
```

## 分享歌曲

<Warning title="注意">

不同版权方对应的歌曲资源有效时长不同（详情请咨询 ZEGO 商务人员），调用 [getSharedResource](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_electron~class~ZegoCopyrightedMusic#get-shared-resource) 接口获取其他用户分享的资源时，如果返回了 `1017050` 错误码，表示资源已失效。

此时，需要有用户重新调用 [requestResource](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_electron~class~ZegoCopyrightedMusic#request-resource) 接口获取资源并进行分享，其他用户重新调用 [getSharedResource](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_electron~class~ZegoCopyrightedMusic#get-shared-resource) 接口获取对应的歌曲资源。
</Warning>

点歌用户点完歌曲后，其他用户可以调用 [getSharedResource](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_electron~class~ZegoCopyrightedMusic#get-shared-resource) 获取对应的歌曲资源，接口回调的信息参考 [获取歌曲与歌词资源接口说明](/online-ktv-electron/client-api/apis-to-obtain-songs-and-lyrics)。

获取成功后，可参考 [点歌 - 下载歌曲](/online-ktv-electron/zego-content-center/sing-songs#下载歌曲) 获取歌曲资源。

```js
/** 点歌用户分享的歌曲资源对应的 songID */
var config = {songID: songId, vendorID: zgDefines.ZegoCopyrightedMusicVendorID.ZegoCopyrightedMusicVendorDefault}
copyRightedMusicInst.getSharedResource(config, zgDefines.ZegoCopyrightedMusicResourceType.ZegoCopyrightedMusicResourceSong).then(filled = function(res)
{
    //监听结果
   if(res.errorCode ==0)
   {
      // 歌曲资源获取成功，可进行下载歌曲等操作  
   }
   else
   {
      // 失败
   }
})
```

## 伴奏/原唱切换

在需要切换伴奏/原唱的场景下，要求伴奏资源有原唱和伴奏双音轨。

通过接口 [requestResource](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_electron~class~ZegoCopyrightedMusic#request-resource)、[getSharedResource](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_electron~class~ZegoCopyrightedMusic#get-shared-resource) 的回调结果中的 “has_original” 字段，会告知用户该资源是否有原唱，详细信息参考 [获取歌曲与歌词资源接口说明](/online-ktv-electron/client-api/apis-to-obtain-songs-and-lyrics)。

若该资源有原唱，开发者可以调用 [setAudioTrackIndex](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_electron~class~ZegoMediaPlayer#set-audio-track-index) 进行伴奏/原唱切换：
- 0 表示伴奏；
- 1 表示原唱。

```js
/** 播放器 mp */
/** 伴奏音轨 */
mp.setAudioTrackIndex(ZEGO_COPYRIGHTED_MUSIC_AUDIO_TRACK_INDEX_ACCOMPANIMENT);
/** 原唱音轨 */
mp.setAudioTrackIndex(ZEGO_COPYRIGHTED_MUSIC_AUDIO_TRACK_INDEX_ORIGINAL_SONG);
```

## 演唱分数与音高线

用户在根据伴奏演唱时，可以获取每一句演唱的分数，也可以在整个演唱结束后，获取到总分。

仅伴奏资源支持演唱分数的获取。

### 获取演唱分数

<Frame width="512" height="auto" ><img src="https://doc-media.zego.im/sdk-doc/Pics/GoEnjoy/online_KTV/demo/ZegoPitchView.png" /></Frame>


**实现流程**

1. 通过 [实现歌词与歌曲进度的同步](#实现歌词与歌曲进度的同步) 中获取逐字歌词。
2. 在开始播放伴奏音乐后，使用版权音乐的评分接口 [startScore](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_electron~class~ZegoCopyrightedMusic#start-score) 开始评分。
3. 通过接口 [getKrcLyricByToken](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_electron~class~ZegoCopyrightedMusic#get-krc-lyric-by-token) 回调结果中的参数行开始时间 begin_time 和行持续时间 duration 相加，判断一句歌词完成，在用户唱完一句后，可调用 [getPreviousScore](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_electron~class~ZegoCopyrightedMusic#get-previous-score) 接口获取本句得分。


### 获取演唱总分


<Frame width="512" height="auto" ><img src="https://doc-media.zego.im/sdk-doc/Pics/CopyrightedMusic/Total_score.png" /></Frame>


用户可以在演唱结束后，调用 [getTotalScore](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_electron~class~ZegoCopyrightedMusic#get-total-score) 计算出整个演唱的总得分。


### 获取音高线数据

<Frame width="512" height="auto" ><img src="https://doc-media.zego.im/sdk-doc/Pics/CopyrightedMusic/pitch_line_data.png" /></Frame>

可以用演唱声音的音高和歌曲伴奏本身的音高来展示歌曲的音高线。


**实现流程**

1. 通过 [实现歌词与歌曲进度的同步](#实现歌词与歌曲进度的同步) 中获取逐字歌词。

2. 调用 [startScore](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_electron~class~ZegoCopyrightedMusic#start-score) 接口开始评分。

3. 调用 [getStandardPitch](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_electron~class~ZegoCopyrightedMusic#get-standard-pitch) 接口获取标准音高数组，数组里每一个音高线包含开始时间 begin_time，持续时间 duration，音高值 value（范围 10-90）。

4. 调用 [getCurrentPitch](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_electron~class~ZegoCopyrightedMusic#get-current-pitch) 接口获取当前演唱声音的音高数组。

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


```js
/** 音乐资源 ID */
var resourceID = '';

// 开始播放的位置
var startPosition = ;

// 创建 ZegoMediaPlayer
mp = zgEngine.createMediaPlayer();
if(mp)
{
   console.log("create mediaPlayer successful!")
}
else
{
   console.log("create mediaPlayer failed!")
}

mp.loadCopyrightedMusicResourceWithPosition(resourceID, startPosition).then(function(res){
    //监听资源加载结果
    console.log(res)
}))

mp.start();

// 播放器状态变化回调
mp.on('onMediaPlayerStateUpdate', (res) => {
    if(res.state == zgDefines.ZegoMediaPlayerState.Playing)
    {
        // 开启评分，设置回调间隔为 60 ms
        // 请注意，需要在 onMediaPlayerStateUpdate 回调中监听到歌曲资源已经开始播放，才能调用 startScore 接口
        copyRightedMusicInst.resetScore(resourceID);
        copyRightedMusicInst.startScore(resourceID, 60);
    }
})

// 唱完一句后，获取前一句分数
var previousScore = copyRightedMusicInst.getPreviousScore(resourceID);

// 获取平均分
var averageScore = copyRightedMusicInst.getAverageScore(resourceID);

// 获取总分
var toTalScore = copyRightedMusicInst.getTotalScore(resourceID);

// 获取满分
var fullScore = copyRightedMusicInst.getFullScore(resourceID);

// 暂停评分
copyRightedMusicInst.pauseScore(resourceID);

// 恢复评分
copyRightedMusicInst.resumeScore(resourceID);

// 停止评分
copyRightedMusicInst.stopScore(resourceID);
```

### 更多演唱分数的相关接口

开发者可以使用 [getAverageScore](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_electron~class~ZegoCopyrightedMusic#get-average-score)、[getTotalScore](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_electron~class~ZegoCopyrightedMusic#get-total-score) 等接口获取分数，也可以使用 [pauseScore](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_electron~class~ZegoCopyrightedMusic#pause-score)、[resumeScore](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_electron~class~ZegoCopyrightedMusic#resume-score)、[stopScore](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_electron~class~ZegoCopyrightedMusic#stop-score)、[resetScore](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_electron~class~ZegoCopyrightedMusic#reset-score) 等接口控制评分状态。



## 销毁版权音乐对象

当需要调用 [destroyCopyrightedMusic](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_electron~class~ZegoExpressEngine#destroy-copyrighted-music) 销毁版权音乐对象时，需在反初始化 SDK 接口 [destroyEngine](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_electron~class~ZegoExpressEngine#destroy-engine) 之前。


```js
// 先销毁 copyrightedMusic
zgEngine.destroyCopyrightedMusic(copyRightedMusicInst);

// 再销毁 ZegoExpressEngine
zgEngine.destroyEngine();
```
