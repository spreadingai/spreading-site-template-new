# 进阶功能

- - -

本文介绍如何使用 KTV 场景的进阶功能。

## 前提条件

在使用以下“进阶功能”之前，请先实现 [点歌](/online-ktv-flutter/zego-content-center/sing-songs) 功能。

## 实现歌词与歌曲进度的同步

ZEGO 提供两种形式的歌词，逐行歌词和逐字歌词。

- 逐行歌词是指歌词按照句子来分割，一句一句展示。用户可以调用 [getLrcLyric](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoCopyrightedMusic/getLrcLyric.html) 接口，传入歌曲的 song_id 获取逐行歌词。
- 逐字歌词是指歌词逐行展示后，一个字一个字的进行高亮呈现，可以用来做精确的歌词进度展示。用户可以调用 [getKrcLyricByToken](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoCopyrightedMusic/getKrcLyricByToken.html) 接口，传入获取伴奏资源信息 [requestResource](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoCopyrightedMusic/requestResource.html)、[getSharedResource](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoCopyrightedMusic/getSharedResource.html) 时得到的 krcToken 来获取逐字歌词。


### 获取歌词

- 点歌后或播放歌曲前，用户可以调用获取歌词的方法获取整首歌的歌词。具体回调的信息参考 [获取歌曲与歌词资源接口说明](/online-ktv-flutter/client-api/apis-to-obtain-songs-and-lyrics)。
- 以逐行歌词为例，歌词信息有每行歌词的开始与结束时间，用户可以先调用 [setProgressInterval](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoMediaPlayer/setProgressInterval.html) 接口设置合适播放进度回调间隔。ZEGO Express SDK 会以该时间间隔，通过 [onMediaPlayerPlayingProgress](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngine/onMediaPlayerPlayingProgress.html) 接口给出播放进度，用户可以在回调中根据播放进度显示当前的歌词。


```dart
/** 歌曲的 songID */
String songID = ;
/** 版权方，其对应的枚举值信息，请联系 ZEGO 商务咨询*/
ZegoCopyrightedMusicVendorID vendorID = ; 
// 一次性获取逐行歌词
copyrightedMusic?.getLrcLyric(songID, vendorID: vendorID).then(ZegoCopyrightedMusicGetLrcLyricResult result) {
    // result.errorCode: 调用结果
    // result.lyrics: 获取到的逐行歌词
});

/** 点歌时获取的 krcToken */
String krcToken = ;
// 一次性获取逐字歌词
copyrightedMusic?.getKrcLyricByToken(krcToken).then(ZegoCopyrightedMusicGetKrcLyricByTokenResult result) {
    // result.errorCode: 调用结果
    // result.lyrics: 获取到的逐字歌词
});

ZegoExpressEngine.onMediaPlayerPlayingProgress = (ZegoMediaPlayer mediaPlayer, int millisecond) {
    // 在歌曲播放的过程中，根据播放进度显示获取到的歌词中当前时间对应的歌词，并展示
};
```

## 分享歌曲

<Warning title="注意">

不同版权方对应的歌曲资源有效时长不同（详情请咨询 ZEGO 商务人员），调用 [getSharedResource](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoCopyrightedMusic/getSharedResource.html) 接口获取其他用户分享的资源时，如果返回了 `1017050` 错误码，表示资源已失效。

此时，需要有用户重新调用 [requestResource](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoCopyrightedMusic/requestResource.html) 接口获取资源并进行分享，其他用户重新调用 [getSharedResource](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoCopyrightedMusic/getSharedResource.html) 接口获取对应的歌曲资源。
</Warning>

点歌用户点完歌曲后，其他用户可以调用 [getSharedResource](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoCopyrightedMusic/getSharedResource.html) 获取对应的歌曲资源，接口回调的信息参考 [获取歌曲与歌词资源接口说明](/online-ktv-flutter/client-api/apis-to-obtain-songs-and-lyrics)。

获取成功后，可参考 [点歌 - 下载歌曲](/online-ktv-flutter/zego-content-center/sing-songs#下载歌曲) 获取歌曲资源。

```dart
String songID = "";
/** 版权方，其对应的枚举值信息，请联系 ZEGO 商务咨询*/
ZegoCopyrightedMusicVendorID vendorID = ; 
/** 点歌用户分享的歌曲资源对应的 songID */
var config = ZegoCopyrightedMusicGetSharedConfig(songID, vendorID: vendorID);

/** 资源类型 */
var resourceType = ZegoCopyrightedMusicResourceType.ZegoCopyrightedMusicResourceSong;

copyrightedMusic?.getSharedResource(config, resourceType).then((ZegoCopyrightedMusicGetSharedResourceResult result) {
    if (result.errorCode == 0) {
        // 歌曲资源获取成功，可进行下载歌曲等操作
    } else {
        // 失败
    }
});
```

## 伴奏/原唱切换

在用户需要切换伴奏/原唱的场景下，要求伴奏资源有原唱和伴奏双音轨。

在点伴奏的结果回调 [ZegoCopyrightedMusicRequestResourceResult](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoCopyrightedMusicRequestResourceResult-class.html)、[ZegoCopyrightedMusicGetSharedResourceResult](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoCopyrightedMusicGetSharedResourceResult-class.html) 中，“has_original” 字段会告知用户该资源是否有原唱，详细信息参考 [获取歌曲与歌词资源接口说明](/online-ktv-flutter/client-api/apis-to-obtain-songs-and-lyrics)。

若该资源有原唱，用户可以调用 [setAudioTrackIndex](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoMediaPlayer/setAudioTrackIndex.html) 进行伴奏/原唱切换：
- 0 表示伴奏；
- 1 表示原唱。

```dart
/** 播放器 */
var mediaPlayer = await ZegoExpressEngine.instance.createMediaPlayer();

/** 伴奏/原唱音轨 */
int index = 0;
mediaPlayer?.setAudioTrackIndex(index);
```

## 演唱分数与音高线

用户在根据伴奏演唱时，可以获取每一句演唱的分数，也可以在整个演唱结束后，获取到总分。

仅伴奏资源支持演唱分数的获取。

### 获取演唱分数

<Frame width="512" height="auto" ><img src="https://doc-media.zego.im/sdk-doc/Pics/GoEnjoy/online_KTV/demo/ZegoPitchView.png" /></Frame>


**实现流程**

1. 通过 [实现歌词与歌曲进度的同步](#实现歌词与歌曲进度的同步) 中获取逐字歌词。
2. 在开始播放伴奏音乐后，使用版权音乐的评分接口 [startScore](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoCopyrightedMusic/startScore.html) 开始评分。
3. 通过获取逐字歌词回调 [ZegoCopyrightedMusicGetKrcLyricByTokenResult](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoCopyrightedMusicGetKrcLyricByTokenResult-class.html) 中的参数行开始时间 begin_time 和行持续时间 duration 相加判断一句歌词完成，在用户唱完一句后，通过调用 [getPreviousScore](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoCopyrightedMusic/getPreviousScore.html) 接口获取本句得分。

### 获取演唱总分


<Frame width="512" height="auto" ><img src="https://doc-media.zego.im/sdk-doc/Pics/CopyrightedMusic/Total_score.png" /></Frame>


用户可以在演唱结束后，调用 [getTotalScore](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoCopyrightedMusic/getTotalScore.html) 计算出整个演唱的总得分。


### 获取音高线数据

<Frame width="512" height="auto" ><img src="https://doc-media.zego.im/sdk-doc/Pics/CopyrightedMusic/pitch_line_data.png" /></Frame>

可以用演唱声音的音高和歌曲伴奏本身的音高来展示歌曲的音高线。


**实现流程**

1. 通过 [实现歌词与歌曲进度的同步](#实现歌词与歌曲进度的同步) 中获取逐字歌词。

2. 调用 [startScore](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoCopyrightedMusic/startScore.html) 接口开始评分。

3. 调用 [getStandardPitch](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoCopyrightedMusic/getStandardPitch.html) 接口获取标准音高数组，数组里每一个音高线包含开始时间 begin_time，持续时间 duration，音高值 value（范围 10-90）。

4. 调用 [getCurrentPitch](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoCopyrightedMusic/getCurrentPitch.html) 接口获取当前演唱声音的音高数组。

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

```dart
/** 音乐资源 ID */
String resourceID = "";

// 开始播放的位置
long startPosition = 0L;

// 创建 ZegoMediaPlayer
var mediaPlayer = await ZegoExpressEngine.instance.createMediaPlayer();

// 开始播放音乐
mediaPlayer?.loadCopyrightedMusicResourceWithPosition(resourceID, startPosition).then((ZegoMediaPlayerLoadResourceResult result) {
});

mediaPlayer?.start();

// 开始评分
// [pitchValueInterval] 实时音高线的回调时间间隔，单位为毫秒
copyrightedMusic?.startScore(resourceID, 50);

// 唱完一句后，获取前一句分数
int? previousScore = await copyrightedMusic?.getPreviousScore(resourceID);

// 获取平均分
int? averageScore = await copyrightedMusic?.getAverageScore(resourceID);

// 获取总分
int? toTalScore = await copyrightedMusic?.getTotalScore(resourceID);

// 获取满分
int? fullScore = await copyrightedMusic?.getFullScore(resourceID);

// 暂停评分
copyrightedMusic?.pauseScore(resourceID);

// 恢复评分
copyrightedMusic?.resumeScore(resourceID);

// 停止评分
copyrightedMusic?.stopScore(resourceID);
```

### 更多演唱分数的相关接口

开发者可以使用 [getAverageScore](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoCopyrightedMusic/getAverageScore.html)、[getTotalScore](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoCopyrightedMusic/getTotalScore.html) 等接口获取分数，也可以使用 [pauseScore](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoCopyrightedMusic/pauseScore.html)、[resumeScore](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoCopyrightedMusic/resumeScore.html)、[stopScore](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoCopyrightedMusic/stopScore.html)、[resetScore](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoCopyrightedMusic/resetScore.html) 等接口控制评分状态。



## 销毁版权音乐对象

当需要调用 [destroyCopyrightedMusic](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngineCopyrightedMusic/destroyCopyrightedMusic.html) 销毁版权音乐对象时，需在反初始化 SDK 接口 [destroyEngine](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngine/destroyEngine.html) 之前。


```dart
// 先销毁 copyrightedMusic
ZegoExpressEngine.instance.destroyCopyrightedMusic(copyrightedMusic!); 

// 再销毁 ZegoExpressEngine
ZegoExpressEngine.destroyEngine();
```
