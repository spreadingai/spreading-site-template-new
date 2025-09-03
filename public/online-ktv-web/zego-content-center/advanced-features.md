# 进阶功能

- - -

本文介绍如何使用 KTV 场景的进阶功能。

## 前提条件

在使用以下“进阶功能”之前，请先实现 [点歌](/online-ktv-web/zego-content-center/sing-songs) 功能。

## 实现歌词与歌曲进度的同步

ZEGO 提供两种形式的歌词，逐行歌词和逐字歌词。

- 逐行歌词是指歌词按照句子来分割，一句一句展示。用户可以调用 [getLrcLyric](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoCopyrightedMusic#get-lrc-lyric) 接口，传入歌曲的 song_id 及对应版权方的 vendor_id 获取逐行歌词。
- 逐字歌词是指歌词一个字一个字展示，可以用来做精确的歌词进度展示。用户可以调用 [getKrcLyricByToken](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoCopyrightedMusic#get-krc-lyric-by-token) 接口，传入获取伴奏资源信息 [requestResource](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoCopyrightedMusic#request-resource) 时得到的 krcToken 来获取逐字歌词。

### 获取歌词

- 点歌后或播放歌曲前，开发者可以调用获取歌词的方法获取整首歌的歌词。具体回调的信息参考 [获取歌曲与歌词资源接口说明](/online-ktv-web/client-api/apis-to-obtain-songs-and-lyrics)。

- 成功获取歌词之后，需要将歌词放入歌词控件中进行展示。ZEGO 提供了独立的歌词 UI 组件，开发者可将该组件导入项目中，即可与 SDK 搭配使用，快速实现歌曲歌词的效果展示，详情请参考 [歌词组件](/online-ktv-web/zego-content-center/lyrics-display-component)。

```js
/** 歌曲的 songID */
const songID = "";
/** 版权方，其对应的枚举值信息，请联系 ZEGO 商务咨询*/
const vendorID = 2; 
// 一次性获取逐行歌词
copyrightedMusic.getLrcLyric(
    songID,
    vendorID
).then(
    ({ errorCode, lyrics })=>{
        // errorCode 为 0, 则成功获取到歌词信息  lyrics
    }
);

/** 点歌时获取的 krcToken */
const krcToken = "";

// 一次性获取逐字歌词
copyrightedMusic.getKrcLyricByToken(krcToken).then(
    ({ errorCode, lyrics })=>{
        // errorCode 为 0, 则成功获取到歌词信息  lyrics
    }
);
```

## 分享歌曲

<Warning title="注意">

调用 [getSharedResource](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoCopyrightedMusic#get-shared-resource) 接口获取其他用户分享的资源时，如果返回了 `1017050` 错误码，表示资源已失效。

此时，需要有用户重新调用 [requestResource](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoCopyrightedMusic#request-resource) 接口获取资源并进行分享，其他用户重新调用 [getSharedResource](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoCopyrightedMusic#get-shared-resource) 接口获取对应的歌曲资源。
</Warning>

点歌用户点完歌曲后，其他用户可以调用 [getSharedResource](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoCopyrightedMusic#get-shared-resource) 获取对应的歌曲资源，接口回调的信息参考 [获取歌曲与歌词资源接口说明](/online-ktv-web/client-api/apis-to-obtain-songs-and-lyrics)。

获取成功后，可参考 [点歌 - 下载歌曲](/online-ktv-web/zego-content-center/sing-songs#下载歌曲) 获取歌曲资源。

```js
const typeAccompany = 2;

/** 点歌用户分享的歌曲资源对应的 songID */
copyrightedMusic.getSharedResource(
    {songID: 0, vendorID: 0},
    typeAccompany
).then(({res})=>{
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

通过接口 [requestResource](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoCopyrightedMusic#request-resource)、[getSharedResource](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoCopyrightedMusic#get-shared-resource) 的 Promise 回调结果中的 “has_original” 字段，会告知用户该资源是否有原唱，详细信息参考 [获取歌曲与歌词资源接口说明](/online-ktv-web/client-api/apis-to-obtain-songs-and-lyrics)。

若该资源有原唱，开发者可以播放，以及进行伴奏/原唱切换。

- 0 表示伴奏；
- 1 表示原唱。

``` html
<audio id="songPlayer" playsinline ></audio>
<audio id="accompanyPlayer" playsinline ></audio>
```

```js
// 歌曲音轨播放器
const songPlayer = document.getElementById("songPlayer");
// 伴奏音轨播放器
const accompanyPlayer = document.getElementById("accompanyPlayer");

// 通过控制标签 muted 来切换播放音轨
songPlayer.muted = true;
accompanyPlayer.muted = false;
```


## 演唱分数与音高线

实现本功能时，开发者需要在“初始化引擎”之前，引入音频处理的 SDK 包，示例代码如下：

```js
import { ZegoExpressEngine } from 'zego-express-engine-webrtc';
import { CopyrightedMusic } from 'zego-express-engine-webrtc/copyrighted-music';
import { VoiceChanger } from "zego-express-engine-webrtc/voice-changer";

ZegoExpressEngine.use(CopyrightedMusic);
// 引入音频处理的包，以支持歌曲评分功能。
ZegoExpressEngine.use(VoiceChanger);
```

用户在根据伴奏演唱时，可以获取每一句演唱的分数，也可以在整个演唱结束后，获取到总分。

仅伴奏资源支持演唱分数的获取。

### 获取演唱分数

<Frame width="512" height="auto" ><img src="https://doc-media.zego.im/sdk-doc/Pics/GoEnjoy/online_KTV/demo/ZegoPitchView.png" /></Frame>


**实现流程**

1. 通过 [实现歌词与歌曲进度的同步](#实现歌词与歌曲进度的同步) 中获取逐字歌词。
2. 在开始播放伴奏音乐后，使用版权音乐的评分接口 [startScore](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoCopyrightedMusic#start-score) 开始评分。
3. 通过获取逐字歌词回调 [ZegoCopyrightedMusicGetKrcLyricByTokenResponse](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoCopyrightedMusicGetKrcLyricByTokenResponse) 中的参数行开始时间 begin_time 和行持续时间 duration 相加判断一句歌词完成，在用户唱完一句后，可调用 [getPreviousScore](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoCopyrightedMusic#get-previous-score) 接口获取本句得分。

### 获取演唱总分

<Frame width="512" height="auto" ><img src="https://doc-media.zego.im/sdk-doc/Pics/CopyrightedMusic/Total_score.png" /></Frame>

用户可以在演唱结束后，调用 [getTotalScore](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoCopyrightedMusic#get-total-score) 计算出整个演唱的总得分。


### 获取音高线数据

<Frame width="512" height="auto" ><img src="https://doc-media.zego.im/sdk-doc/Pics/CopyrightedMusic/pitch_line_data.png" /></Frame>

开发者可以用演唱声音的音高和歌曲伴奏本身的音高来展示歌曲的音高线。

**实现流程**

1. 通过 [实现歌词与歌曲进度的同步](#实现歌词与歌曲进度的同步) 中获取逐字歌词。

2. 调用 [startScore](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoCopyrightedMusic#start-score) 接口开始评分。

3. 调用 [getStandardPitch](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoCopyrightedMusic#get-standard-pitch) 接口获取标准音高数组，数组里每一个音高线包含开始时间 begin_time，持续时间 duration，音高值 value（范围 10-90）。

4. 调用 [getCurrentPitch](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoCopyrightedMusic#get-current-pitch) 接口获取当前演唱声音的音高数组。

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
let resourceID = "";

// 开始播放的位置
let startPosition = 0;

// 获取伴奏音轨h5播放器
const accompanyPlayer = document.getElementById("accompanyPlayer");

// 开始播放音乐
accompanyPlayer.play();

/** 设置播放器对象回调 */
accompanyPlayer.addEventListener("play", async (event) => {
	if (!accompanyPlayer.paused) {
    	// 请注意，需要在播放器 play 事件回调中监听到歌曲资源已经开始播放，才能调用 startScore 接口
    	const res = await copyrightedMusic.startScore({
      		localStream, // localStream 为采集麦克风音频的媒体流对象，通过 createZegoStream 接口创建
      		accompanyPlayer, // accompanyPlayer 为播放伴奏的播放器
      		resourceID
    	})
    	if(res === 0) {
        	console.log("开始打分")
    	}
  	}
});

// 唱完一句后，获取前一句分数。
// 可以在歌词组件的每句播放结束回调方法中进行调用。
const preScore = await zcm.getPreviousScore(resourceID);

// 获取平均分
const average = await zcm.getAverageScore(resourceID);

// 获取总分
const totalScore = await zcm.getTotalScore(resourceID);

// 获取满分
const fullScore = await zcm.getFullScore(resourceID);

// 暂停评分
copyrightedMusic.pauseScore(resourceID);

// 恢复评分
copyrightedMusic.resumeScore(resourceID);

// 重置分数
copyrightedMusic.resetScore(resourceID);

// 停止评分
copyrightedMusic.stopScore(resourceID);
```

### 更多演唱分数的相关接口

开发者可以使用 [getAverageScore](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoCopyrightedMusic#get-average-score)、[getTotalScore](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoCopyrightedMusic#get-total-score) 等接口获取分数，也可以使用 [pauseScore](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoCopyrightedMusic#pause-score)、[resumeScore](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoCopyrightedMusic#resume-score)、[stopScore](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoCopyrightedMusic#stop-score)、[resetScore](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoCopyrightedMusic#reset-score) 等接口控制评分状态。


## 销毁版权音乐对象

调用 [destroyCopyrightedMusic](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#destroy-copyrighted-music) 销毁版权音乐对象，需在反初始化 SDK 接口 [destroyEngine](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#destroy-engine) 之前。

```js
// 销毁 copyrightedMusic
zgEngine.destroyCopyrightedMusic();

// 销毁 ZegoExpressEngine
zg.destroyEngine();
zg = null;
```
