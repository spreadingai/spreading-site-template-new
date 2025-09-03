# 进阶功能

- - -

本文介绍如何使用 KTV 场景的进阶功能。

## 前提条件

在使用以下“进阶功能”之前，请先实现 [点歌](/online-ktv-android/zego-content-center/sing-songs) 功能。

## 实现歌词与歌曲进度的同步

ZEGO 提供两种形式的歌词，逐行歌词和逐字歌词。

- 逐行歌词是指歌词按照句子来分割，一句一句展示。用户可以调用 [getLrcLyric](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Java_android~class~im-zego-zegoexpress-zego-copyrighted-music&jumpType=route#get-lrc-lyric) 接口，传入歌曲的 song_id 获取逐行歌词。
- 逐字歌词是指歌词逐行展示后，一个字一个字的进行高亮呈现，可以用来做精确的歌词进度展示。用户可以调用 [getKrcLyricByToken](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Java_android~class~im-zego-zegoexpress-zego-copyrighted-music&jumpType=route#get-krc-lyric-by-token) 接口，传入获取伴奏资源信息 [requestResource](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~ZegoCopyrightedMusic#request-resource) 时得到的 krcToken 来获取逐字歌词。


### 获取歌词

- 点歌后或播放歌曲前，用户可以调用获取歌词的方法获取整首歌的歌词。具体回调的信息参考 [获取歌曲与歌词资源接口说明](/online-ktv-android/client-api/apis-to-obtain-songs-and-lyrics)。
- 成功获取歌词之后，需要将歌词放入歌词控件中进行展示。ZEGO 提供了独立的歌词 UI 组件，开发者可将该组件导入项目中，即可与 SDK 搭配使用，快速实现歌曲歌词的效果展示，详情请参考 [歌词组件](/online-ktv-android/zego-content-center/lyrics-display-component)。

```java
/** 歌曲的 songID */
String songID = "";
/** 版权方，其对应的枚举值信息，请联系 ZEGO 商务咨询*/
ZegoCopyrightedMusicVendorID vendorID = ; 
// 一次性获取逐行歌词
copyrightedMusic.getLrcLyric(songID, vendorID, new IZegoCopyrightedMusicGetLrcLyricCallback() {
    @Override
    public void onGetLrcLyricCallback(int errorCode, String lyrics) {
        // 成功获取歌词
    }  
});

/** 点歌时获取的 krcToken */
String krcToken = "";

// 一次性获取逐字歌词
copyrightedMusic.getKrcLyricByToken(krcToken, new IZegoCopyrightedMusicGetKrcLyricByTokenCallback() {
    @Override
    public void onGetKrcLyricByTokenCallback(int errorCode, String lyrics) {
            // 成功获取歌词
    }
});
```

## 分享歌曲

<Warning title="注意">

不同版权方对应的歌曲资源有效时长不同（详情请咨询 ZEGO 商务人员），调用 [getSharedResource](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~ZegoCopyrightedMusic#get-shared-resource) 接口获取其他用户分享的资源时，如果返回了 `1017050` 错误码，表示资源已失效。

此时，需要有用户重新调用 [requestResource](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~ZegoCopyrightedMusic#request-resource) 接口获取资源并进行分享，其他用户重新调用 [getSharedResource](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~ZegoCopyrightedMusic#get-shared-resource) 接口获取对应的歌曲资源。
</Warning>

点歌用户点完歌曲后，其他用户可以调用 [getSharedResource](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~ZegoCopyrightedMusic#get-shared-resource) 获取对应的歌曲资源，接口回调的信息参考 [获取歌曲与歌词资源接口说明](/online-ktv-android/client-api/apis-to-obtain-songs-and-lyrics)。

获取成功后，可参考 [点歌 - 下载歌曲](/online-ktv-android/zego-content-center/sing-songs#下载歌曲) 获取歌曲资源。

```java
/** 点歌用户分享的歌曲资源对应的 songID */
ZegoCopyrightedMusicGetSharedConfig config = new ZegoCopyrightedMusicGetSharedConfig();
config.songID = "";
config.vendorID = ;

/** 点歌用户分享的歌曲资源对应的资源类型 */
ZegoCopyrightedMusicResourceType resourceType = ZegoCopyrightedMusicResourceType.getZegoCopyrightedMusicResourceType(0);

copyrightedMusic.getSharedResource(config, resourceType, new IZegoCopyrightedMusicGetSharedResourceCallback() {
    @Override
    public void onGetSharedResourceCallback(int i, String s) {
        if (errorCode == 0) {
                // 歌曲资源获取成功，可进行下载歌曲等操作
        } else {
                // 失败
        }
    }
});
```

## 伴奏/原唱切换

在用户需要切换伴奏/原唱的场景下，要求伴奏资源有原唱和伴奏双音轨。

在点伴奏的结果回调 [IZegoCopyrightedMusicRequestResourceCallback](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~interface~IZegoCopyrightedMusicRequestResourceCallback)、[IZegoCopyrightedMusicGetSharedResourceCallback](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~interface~IZegoCopyrightedMusicGetSharedResourceCallback) 中，“has_original” 字段会告知用户该资源是否有原唱，详细信息参考 [获取歌曲与歌词资源接口说明](/online-ktv-android/client-api/apis-to-obtain-songs-and-lyrics)。

若该资源有原唱，用户可以调用 [setAudioTrackIndex](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Java_android~class~im-zego-zegoexpress-zego-media-player&jumpType=route#set-audio-track-index) 进行伴奏/原唱切换：
- 0 表示伴奏；
- 1 表示原唱。

```java
/** 播放器 */
ZegoMediaPlayer mediaPlayer = ZegoExpressEngine.createMediaPlayer();

/** 伴奏/原唱音轨 */
int index = 0;
int res = mediaPlayer.setAudioTrackIndex(index);
```

## 演唱分数与音高线

用户在根据伴奏演唱时，可以获取每一句演唱的分数，也可以在整个演唱结束后，获取到总分。

仅伴奏资源支持演唱分数的获取。

### 获取演唱分数

<Frame width="512" height="auto" ><img src="https://doc-media.zego.im/sdk-doc/Pics/GoEnjoy/online_KTV/demo/ZegoPitchView.png" /></Frame>


**实现流程**

1. 通过 [实现歌词与歌曲进度的同步](/online-ktv-android/zego-content-center/advanced-features#实现歌词与歌曲进度的同步) 中获取逐字歌词。
2. 在开始播放伴奏音乐后，使用版权音乐的评分接口 [startScore](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Java_android~class~im-zego-zegoexpress-zego-copyrighted-music&jumpType=route#start-score) 开始评分。
3. 通过获取逐字歌词回调 [IZegoCopyrightedMusicGetKrcLyricByTokenCallback](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~interface~IZegoCopyrightedMusicGetKrcLyricByTokenCallback) 中的参数行开始时间 begin_time 和行持续时间 duration 相加判断一句歌词完成，在用户唱完一句后，可调用 [getPreviousScore](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Java_android~class~im-zego-zegoexpress-zego-copyrighted-music&jumpType=route#get-previous-score) 接口获取本句得分。


### 获取演唱总分


<Frame width="512" height="auto" ><img src="https://doc-media.zego.im/sdk-doc/Pics/CopyrightedMusic/Total_score.png" /></Frame>


用户可以在演唱结束后，调用 [getTotalScore](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Java_android~class~im-zego-zegoexpress-zego-copyrighted-music&jumpType=route#get-total-score) 计算出整个演唱的总得分。


### 获取音高线数据

<Frame width="512" height="auto" ><img src="https://doc-media.zego.im/sdk-doc/Pics/CopyrightedMusic/pitch_line_data.png" /></Frame>

开发者可以用演唱声音的音高和歌曲伴奏本身的音高来展示歌曲的音高线。


**实现流程**

1. 通过 [实现歌词与歌曲进度的同步](/online-ktv-android/zego-content-center/advanced-features#实现歌词与歌曲进度的同步) 中获取逐字歌词。

2. 调用 [startScore](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Java_android~class~im-zego-zegoexpress-zego-copyrighted-music&jumpType=route#start-score) 接口开始评分。

3. 调用 [getStandardPitch](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Java_android~class~im-zego-zegoexpress-zego-copyrighted-music&jumpType=route#get-standard-pitch) 接口获取标准音高数组，数组里每一个音高线包含开始时间 begin_time，持续时间 duration，音高值 value（范围 10-90）。

4. 调用 [getCurrentPitch](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Java_android~class~im-zego-zegoexpress-zego-copyrighted-music&jumpType=route#get-current-pitch) 接口获取当前演唱声音的音高数组。

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

```java
/** 音乐资源 ID */
String resourceID = "";

// 开始播放的位置
long startPosition = 0L;

// 创建 ZegoMediaPlayer
ZegoMediaPlayer mediaPlayer = engine.createMediaPlayer();

// 开始播放音乐
mediaPlayer.loadCopyrightedMusicResourceWithPosition(resourceID, startPosition, new IZegoMediaPlayerLoadResourceCallback() {
    @Override
    public void onLoadResourceCallback(int errorcode) {

    }
});

mediaPlayer.start();

/** 设置播放器对象回调 */
mediaPlayer.setEventHandler(new IZegoMediaPlayerEventHandler() {
    /** 播放器状态变化回调 */
    @Override
    public void onMediaPlayerStateUpdate(ZegoMediaPlayer mediaPlayer, ZegoMediaPlayerState state, int errorCode) {
        if (state == ZegoMediaPlayerState.PLAYING) {
            // 重置分数
            mCopyrightedMusic.resetScore(resourceID);
            // 开启评分，设置回调间隔为 60 ms
            // 请注意，需要在 onMediaPlayerStateUpdate 回调中监听到歌曲资源已经开始播放，才能调用 startScore 接口
            mCopyrightedMusic.startScore(resourceID,60);
        } 
    }
});

// 唱完一句后，获取前一句分数
int previousScore = copyrightedMusic.getPreviousScore(resourceID);

// 获取平均分
int averageScore = copyrightedMusic.getAverageScore(resourceID);

// 获取总分
int toTalScore = copyrightedMusic.getTotalScore(resourceID);

// 获取满分
int fullScore = copyrightedMusic.getFullScore(resourceID);

// 暂停评分
copyrightedMusic.pauseScore(resourceID);

// 恢复评分
copyrightedMusic.resumeScore(resourceID);

// 停止评分
copyrightedMusic.stopScore(resourceID);
```

### 更多演唱分数的相关接口

开发者可以使用 [getAverageScore](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Java_android~class~im-zego-zegoexpress-zego-copyrighted-music&jumpType=route#get-average-score)、[getTotalScore](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Java_android~class~im-zego-zegoexpress-zego-copyrighted-music&jumpType=route#get-total-score) 等接口获取分数，也可以使用 [pauseScore](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Java_android~class~im-zego-zegoexpress-zego-copyrighted-music&jumpType=route#pause-score)、[resumeScore](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Java_android~class~im-zego-zegoexpress-zego-copyrighted-music&jumpType=route#resume-score)、[stopScore](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Java_android~class~im-zego-zegoexpress-zego-copyrighted-music&jumpType=route#stop-score)、[resetScore](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Java_android~class~im-zego-zegoexpress-zego-copyrighted-music&jumpType=route#reset-score) 等接口控制评分状态。



## 销毁版权音乐对象

当需要调用 [destroyCopyrightedMusic](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~ZegoExpressEngine#destroy-copyrighted-music) 销毁版权音乐对象时，需在反初始化 SDK 接口 [destroyEngine](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~ZegoExpressEngine#destroy-engine) 之前。


```java
// 先销毁 copyrightedMusic
engine.destroyCopyrightedMusic(copyrightedMusic); 

// 再销毁 ZegoExpressEngine
ZegoExpressEngine.destroyEngine(null);
```
