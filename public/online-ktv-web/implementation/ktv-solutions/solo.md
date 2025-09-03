# 独唱方案

---
  
## 简介

独唱是指麦上用户独自完成演唱的 KTV 场景。搭建一个完整的独唱场景需要点歌、推拉流以及歌词同步等基础能力。

## 前提条件

在实现独唱之前，请确保：

- 已在项目中集成 ZEGO Express SDK（含版权音乐功能），详情请参考 [下载](/online-ktv-web/downloads)。
- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppID，详情请参考 [控制台 - 项目管理](/console/project-info) 中的“项目信息”。
- 已联系 ZEGO 商务人员为 AppID 开通版权音乐服务。

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

具体实现方法请参考 [点歌 - 实现流程](/online-ktv-web/zego-content-center/sing-songs#实现流程) 中的步骤 “初始化 SDK” 到 “获取歌曲资源”。

#### 获取歌词

通过 [requestResource](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoCopyrightedMusic#request-resource) 接口请求歌曲资源，再从返回的歌曲信息中获取 krcToken，向 [getKrcLyricByToken](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoCopyrightedMusic#get-krc-lyric-by-token) 传入 krcToken，获取逐字歌词。

```js
// copyrightedMusicInst 为版权音乐实例
copyrightedMusicInst.getKrcLyricByToken(
    krcToken
).then(res => {
    const { errorCode, lyrics } = res
    if(errorCode===0) {
        // 获取到歌词内容 lyrics 后放到歌词UI组件播放。
    }
});
```

<Warning title="注意">
歌词控件相关内容请参考 [歌词组件](/online-ktv-web/zego-content-center/lyrics-display-component)。
</Warning>

#### 将当前播放的歌曲音频流推送到远端

演唱者可以调用 [startPublishingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#start-publishing-stream) 开启推流，随后调用 [startMixingAudio](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#start-mixing-audio) 接口开启混流，将播放歌曲的音频流推送到远端，以供观众收听。

<Note title="说明">

实现基本的音频通话功能，将音频流推送到远端，可参考 [实时语音 - 快速开始 - 实现流程](/real-time-voice-web/quick-start/implementing-voice-call#使用步骤)。
</Note>

```js
/** 推流并开启发送 SEI 功能 */
zg.startPublishingStream(publishStreamID, localStream, {
    isSEIStart: true, // 开启发送 SEI
    SEIType: 0 // 默认为0，代表 payload type = 243
});

/** 开启混音 */
// localStream 为通过 createZegoStream 创建的媒体流对象
const result = zg.startMixingAudio(localStream, [
    // songPlayer, accompanyPlayer 为播放伴奏的 audio 标签元素
    songPlayer,
    accompanyPlayer,
]);

/** 调整推流麦克风和伴奏的音量 */
let micVolume = 100;
let songVolume = 100;
// 设置麦克风音量
zg.setCaptureVolume(localStream, micVolume);
// 设置歌曲音量
zg.setMixingAudioVolume(localStream, songVolume, songPlayer);
zg.setMixingAudioVolume(localStream, songVolume, accompanyPlayer);
```

#### 向观众端发送播放进度

演唱者通过在媒体播放器的进度回调中，调用 [sendSEI](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#send-sei) 发送 SEI，向观众端同步歌曲的当前播放进度，详细内容请参考 [实时音视频 - 进阶功能 - 媒体补充增强信息](/real-time-video-web/communication/sei)。

```js
// 开启定时器定时更新歌词进度
setInterval(() => {
    const songPlayer = document.getElementById("copySongPlayer");
    if (!songPlayer.paused) {
        // 更新本地歌词播放进度
        //...代码略，参考文档 [歌词组件-更新歌词进度]
        const currentTime = songPlayer.currentTime * 1000
        // 将歌词播放进度通过SEI传出去
        const info = {
            KEY_PROCESS_IN_MS: currentTime,
            KEY_TOTAL_IN_MS: songPlayer.duration * 1000
        };
        const res = zg.sendSEI(
            publishStreamID,
            new TextEncoder().encode(JSON.stringify(info))
        );
    }
    // SEI发送频率会影响观众端的歌词进度更新频率
}, 50);
```

### 观众端

#### 拉流收听

观众只要通过拉流 [startPlayingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#start-playing-stream) 就可以听到歌曲的声音，不需要再去做点歌、下载、播放等的一系列操作。

```js
// 观众端拉流 ID 需要与演唱者推流 ID (startPublishingStream) 一致 
// playStreamID 为流 ID
zg.startPlayingStream(playStreamID, {
    isSEIStart: true // 开启解析 SEI
})
```

#### 观众端歌词同步

1. 获取歌词并设置

观众端将从歌唱端获取的 krcToken 传入 [getKrcLyricByToken](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoCopyrightedMusic#get-krc-lyric-by-token) ，获取逐字歌词。

示例代码请参考本文的 [获取歌词](#获取歌词) 。

观众端也可以通过 [getSharedResource](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoCopyrightedMusic#get-shared-resource) 接口，传入演唱者端通过 [sendExtendedRequest](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoCopyrightedMusic#send-extended-request) 接口请求资源时获取到的 songID（请参考 [点歌](#点歌)），获取对应的歌词信息，详情请参考 [进阶功能 - 分享歌曲](/online-ktv-web/zego-content-center/advanced-features#分享歌曲)。

2. 同步演唱者进度信息

观众通过 [playerRecvSEI](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoRTCEvent#player-recv-sei) 事件回调收到 SEI 信息，获取进度信息，用于歌词同步。

```js
zg.on("playerRecvSEI", (streamID, uintArray) => {
    // 根据发送的 SEI， 解出 SEI 的内容，示例如下：
    try {
        const json = JSON.parse(new TextDecoder().decode(uintArray.slice(4)));
        //  获取播放进度 json.KEY_PROCESS_IN_MS 放到歌词组件进行更新歌词进度
        //...代码略，参考文档 [歌词组件-更新歌词进度]

        console.warn("playerRecvSE KEY_PROCESS_IN_MS", json.KEY_PROCESS_IN_MS);
    } catch (error) {
        console.warn(
            "playerRecvSEI error",
            error,
            new TextDecoder().decode(uintArray.buffer)
        );
    }
});
```

## 调用时序

<img src="https://doc-media.zego.im/sdk-doc/Pics/CopyrightedMusic/solo_Web.png" width="50%"/>
