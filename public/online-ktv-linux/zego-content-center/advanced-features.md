# 进阶功能

- - -

本文介绍如何使用 KTV 场景的进阶功能。

## 前提条件

在使用以下“进阶功能”之前，请先实现 [点歌](/online-ktv-linux/zego-content-center/sing-songs) 功能。

## 实现歌词与歌曲进度的同步

ZEGO 提供了 “逐行获取歌词” 的形式：

逐行歌词是指歌词按照句子来分割，一句一句展示。用户可以调用 [getLrcLyric](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_linux~class~IZegoCopyrightedMusic#get-lrc-lyric) 接口，传入歌曲的 song_id 获取逐行歌词。

### 获取歌词

逐行获取歌词，歌词信息有每行歌词的开始与结束时间，用户可以先调用 [setProgressInterval](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_linux~class~IZegoMediaPlayer#set-progress-interval) 接口设置合适播放进度回调间隔。ZEGO Express SDK 会以该时间间隔，通过 [onMediaPlayerPlayingProgress](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_linux~class~IZegoMediaPlayerEventHandler#on-media-player-playing-progress) 接口给出播放进度，用户可以在回调中调用获取歌词的方法获取当前时间点的歌词。具体回调的信息参考 [获取歌曲与歌词资源接口说明](/online-ktv-linux/client-api/apis-to-obtain-songs-and-lyrics)。


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
    copyrightedMusic->getLrcLyric(songID, vendorID, [=](/online-ktv-linux/zego-content-center/int-errorcode,-std::string-lyrics) {

    });

};
```

## 分享歌曲

<Warning title="注意">

不同版权方对应的歌曲资源有效时长不同（详情请咨询 ZEGO 商务人员），调用 [getSharedResource](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_linux~class~IZegoCopyrightedMusic#get-shared-resource) 接口获取其他用户分享的资源时，如果返回了 `1017050` 错误码，表示资源已失效。

此时，需要有用户重新调用 [requestResource](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_linux~class~IZegoCopyrightedMusic#request-resource) 接口获取资源并进行分享，其他用户重新调用 [getSharedResource](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_linux~class~IZegoCopyrightedMusic#get-shared-resource) 接口获取对应的歌曲资源。
</Warning>

点歌用户点完歌曲后，其他用户可以调用 [getSharedResource](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_linux~class~IZegoCopyrightedMusic#get-shared-resource) 获取对应的歌曲资源，接口回调的信息参考 [获取歌曲与歌词资源接口说明](/online-ktv-linux/client-api/apis-to-obtain-songs-and-lyrics)。

获取成功后，可参考 [点歌 - 下载歌曲](/online-ktv-linux/zego-content-center/sing-songs#下载歌曲) 获取歌曲资源。

```cpp
/** 点歌用户分享的歌曲资源对应的 songID */
ZegoCopyrightedMusicGetSharedConfig config;
config.songID = ;
config.vendorID = ;

/** 点歌用户分享的歌曲资源对应的资源类型 */
ZegoCopyrightedMusicResourceType resourceType = ZegoCopyrightedMusicResourceSong;

copyrightedMusic->getSharedResource(config, resourceType, [=](/online-ktv-linux/zego-content-center/int-errorcode,-std::string-resource) {
        if (errorCode == 0) {
                // 歌曲资源获取成功，可进行下载歌曲等操作
        } else {
                // 失败
        }
});
```

## 伴奏/原唱切换

在需要切换伴奏/原唱的场景下，要求伴奏资源有原唱和伴奏双音轨。

在点伴奏的结果回调 [ZegoCopyrightedMusicRequestResourceCallback](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_linux~interface~ZegoExpressDefines#zego-copyrighted-music-request-resource-callback)、[ZegoCopyrightedMusicGetSharedResourceCallback](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_linux~interface~ZegoExpressDefines#zego-copyrighted-music-get-shared-resource-callback) 中，“has_original” 字段会告知用户该资源是否有原唱，详细信息参考 [获取歌曲与歌词资源接口说明](/online-ktv-linux/client-api/apis-to-obtain-songs-and-lyrics)。

若该资源有原唱，开发者可以调用 [setAudioTrackIndex](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_linux~class~IZegoMediaPlayer#set-audio-track-index) 进行伴奏/原唱切换：
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

## 销毁版权音乐对象

当需要调用 [destroyCopyrightedMusic](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_linux~class~IZegoExpressEngine#destroy-copyrighted-music) 销毁版权音乐对象时，需在反初始化 SDK 接口 [destroyEngine](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_linux~class~ZegoExpressSDK#destroy-engine) 之前。


```cpp
// 先销毁 copyrightedMusic
engine->destroyCopyrightedMusic(copyrightedMusic);

// 再销毁 ZegoExpressEngine
ZegoExpressSDK::destroyEngine(engine, nullptr);
engine = nullptr;
```
