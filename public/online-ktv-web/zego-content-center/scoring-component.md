# 评分组件

---

## 功能简介

ZEGO 评分 UI 组件（ZegoPitchView）支持显示音高线和评分效果。本文将介绍如何在项目中集成并使用 ZEGO 评分 UI 组件。   

- 歌曲播放时，根据当前播放进度展示对应的音高线。
- 展示分数。
- 自定义音高线界面的部分元素。

<Frame width="512" height="auto" ><img src="https://doc-media.zego.im/sdk-doc/Pics/GoEnjoy/online_KTV/demo/ZegoPitchView.png" /></Frame>


## 组件核心类文件介绍

### ZegoPitchView

该类是一个自定义 View 组件，用于接收音高线和评分数据进行展示。

```ts
/**
 * 挂载到 DOM 上
 * @param container div 容器元素或容器元素的 id。
 * @param config UI 配置
 */
public mount(container: HTMLElement | string, config?: ZegoPitchConfig): void

/** 传入音高线数组 */
public setStandardPitch(pitchList: ZegoPitch[]): void

/**
 * 设置当前播放时间和音阶，两个参数必须同时设置，保证数据同步性
 *
 * @param progress 当前播放时间
 * @param pitch 实时音高
 */
public setCurrentSongProgress(progress: number, pitch: number): void

/**
 * 设置高潮片段 当前播放时间和音阶，两个参数必须同时设置，保证数据同步性(仅用于高潮片段资源)
 *
 * @param progress 当前播放时间
 * @param pitch 实时音高
 * @param segmentBegin 高潮片段开始时间 （该字段在请求高潮片段资源时返回）
 * @param krcFormatOffset krc歌词对歌曲的偏移量 （该字段在krc歌词中返回）
 */
public setAccompanimentClipCurrentSongProgress(
    progress: number,
    pitch: number,
    segmentBegin: number,
   krcFormatOffset: number
): void

/**
 * 添加分数在当前时间点展示
 *
 * @param {number} score 分数
 */
public addScore(score: number): void

/**
 * 重置音高线数据
 */
public reset(): void

/**
 *获取标准音高线开始的时间
 * @returns
 */
public getPitchStartTime(): number;

/**
 * 设置 UI 配置
 * @param config
 */
public setUIConfig(config: ZegoPitchConfig): void

/**
 * 将音高线原始数据模型转为控件数据模型
 * 仅截取高潮片段开始时间到结束时间那段的数据(仅用于高潮片段资源)
 * @param pitchList 完整音高线原始model
 * @param segmentBegin 高潮片段开始时间 （该字段在请求高潮片段资源时返回）
 * @param segmentEnd 高潮片段结束时间 （该字段在请求高潮片段资源时返回）
 * @param preludeDuration 高潮片段前奏时间 （该字段在请求高潮片段资源时返回）
 * @param krcFormatOffset krc歌词对歌曲的偏移量 （该字段在krc歌词中返回）
 * @return
 */
public parseAccompanimentClipPitch(
    pitchList: ZegoPitch[],
    segmentBegin: number,
    segmentEnd: number,
   preludeDuration: number,
   krcFormatOffset = 0
): ZegoPitch[]
```

### ZegoPitch

该类是音高对象数据模型。

```ts
interface ZegoPitch {
  begin_time: number; // 开始时间，单位为毫秒，此时间以歌曲起始时间为基准。
  duration: number; // 持续时长。
  value: number; // 音高值
}
```

### ZegoPitchConfig

该类是用于配置音高线的 UI 效果。

开发者需要创建该类对象，设置 UI 效果；并调用 `ZegoPitchView` 中的 `setUIConfig()` 接口，使 UI 生效。

```ts
interface ZegoPitchConfig {
    /**五线谱横线颜色 */
    staffColor: string;
    /**竖线颜色 */
    verticalLineColor: string;
    /**默认音高线颜色 */
    standardPitchColor: string;
    /**击中音高线颜色 */
    hitPitchColor: string;
    /**音调指示器颜色 */
    pitchIndicatorColor: string;
    /**分数文本颜色 */
    scoreTextColor: string;
}
```

## 前提条件

在集成评分 UI 组件之前，请确保：

已在项目中集成 ZEGO Express SDK（含版权音乐功能），实现基本的点歌和歌曲播放相关功能，详情请参考 [点歌](/online-ktv-web/zego-content-center/sing-songs)。

## 组件接入方式

获取完整源码，请参考 [下载](/online-ktv-web/downloads)。

以下主要介绍评分 UI 组件接入的步骤和部分代码示例。

### 引入 pitchview 组件

开发者可通过以下任意一种方式实现集成 SDK。

- 复制文件，手动引入。

    1. 解压组件压缩包，拷贝 **pitchview** 文件夹至项目文件夹下。
    2. 在项目中引入 pitchview 组件。

- ESM 模块化引入。

    ```js
    import { ZegoPitchView } from "./pitchView/dist/ZegoPitchView.esm.js";
    ```

- 使用 \<script> 标签引入。

    ```html
    <script src="./pitchView/dist/ZegoPitchView.browser.js"></script>
    ```

### 在界面中引入 pitchview 组件

创建一个 \<div> 容器，初始化音高线组件。

```html
<div id="pitchView" style="width: 100%; height: 120px; background-color: #1d0741; border-radius: 5px; padding: 0 20px;"></div>
```
```js
// 初始化音高线组件
const pitchView = new ZegoPitchView();
pitchView.mount("pitchView");
```

### 设置 pitchview 组件 (可选)

```js
// 设置样式
pitchView.setUIConfig({
    standardPitchColor: "#5e3b8e", //默认音高线颜色
    hitPitchColor: "#f34160", // 击中音高线颜色
    pitchIndicatorColor: "#fff", // 音调指示器颜色
    staffColor: "#28104d", //五线谱横线颜色
    verticalLineColor: "#3e2869", //竖线颜色
    scoreTextColor: "#fff" //分数文本颜色
})
```

### 获取标准音高线

获取音高线数据需要调用 SDK 的 [getStandardPitch](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoCopyrightedMusic#get-standard-pitch) 接口，拉取到数据后通过 ZGKTVPitch 进行反序列化，调用 `ZegoPitchViewHelper.parsePitch` 返回音高线列表，再调用 ZegoPitchView 的 `setStandardPitch` 接口设置标准音高线数据源。

```js
/** 获取 Express 引擎实例 */
const zg = new ZegoExpressEngine();

/** 获取版权音乐实例 */
const copyrightedMusic = zg.createCopyrightedMusic();

/** 调用接口获取标准音高线 */
copyrightedMusic.getStandardPitch().then(({ errorCode, pitch }) => {
  if (errorCode == 0) {
    // 获取音高线数据给评分 UI 组件
    pitchView.setStandardPitch(pitch);
  }
})
```

如果歌曲资源是`高潮片段资源`，设置标准音高可以通过以下接口，获取仅处于高潮片段内的音高。

```js
parseAccompanimentClipPitch(
    pitchList: ZegoPitch[],
    segmentBegin: number,
    segmentEnd: number,
    preludeDuration: number,
    krcFormatOffset = 0
  ): ZegoPitch[]
``` 


### 设置实时音高

#### 获取实时音高

先开启一个定时器每 60 ms 不断循环调用设置实时音高的方法。在播放器播放状态回调中，开始播放状态时重置分数和开启评分功能，设置回调间隔为 60 ms。

```ts
/** 获取播放器对象 */
const accompanyPlayer = document.getElementById("accompanyPlayer");

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

/** 播放器进度变化回调 */
let pitchTimer = setInterval(async () => {
    if (!accompanyPlayer.paused && pitchView) {
        const value = await copyrightedMusic.getCurrentPitch(resourceID);
        console.info("getCurrentPitch", value)
        // 音高线组件更新播放进度
        pitchView.setCurrentSongProgress(
            accompanyPlayer.currentTime * 1000,
            value
        );
    }
  // 更新频率 60ms
}, 60);
```

针对不同的音乐资源类型，房主/歌唱者在同步更新音高时需要区别处理。

##### 伴奏资源

伴奏资源，指的是调用 Express SDK [requestResource](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoCopyrightedMusic#request-resource) 接口，传入 `ZEGO_COPYRIGHTED_MUSIC_RESOURCE_ACCOMPANIMENT` 音乐资源类型请求的资源。

```js
// 音高线组件更新播放进度
pitchView.setCurrentSongProgress(
    accompanyPlayer.currentTime * 1000,
    value
);
```

##### 高潮片段资源

伴奏高潮片段资源，指的是调用 Express SDK [requestResource](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoCopyrightedMusic#request-resource) 接口，传入 `ZEGO_COPYRIGHTED_MUSIC_RESOURCE_ACCOMPANIMENT_CLIP` 音乐资源类型后请求的资源。

```ts
/**
 * 设置高潮片段 当前播放时间和音阶，两个参数必须同时设置，保证数据同步性(仅用于高潮片段资源)
 *
 * @param progress 当前播放时间
 * @param pitch 实时音高
 * @param segmentBegin 高潮片段开始时间 （该字段在请求高潮片段资源时返回）
 * @param krcFormatOffset krc 歌词对歌曲的偏移量 （该字段在 krc 歌词中返回）
 */
pitchView.setAccompanimentClipCurrentSongProgress(
    songPlayer.currentTime * 1000,
    value,
    segmentBegin,
    krcFormatOffset
);
```

#### 添加分数

设置 [歌词组件](/online-ktv-web/zego-content-center/lyrics-display-component) 的换行监听回调，并在回调中判断“当前播放进度时间”是否大于“音高线开始时间”。**如果`大于`音高线开始时间，则延迟 100ms 获取分数。**

开发者可以通过 SDK 的 [getPreviousScore](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoCopyrightedMusic#get-previous-score) 接口，获取并添加上一行分数。

```ts
 /** 设置换行监听 */
async function playLineFinished(currentIndex) {
    // 在某些情况下，打分处理结果会出现延迟，建议开发者延迟 100ms 获取分数
    setTimeout( async () => {
        const total = await copyrightedMusic.getTotalScore(resourceID);
        const average = await copyrightedMusic.getAverageScore(resourceID);
        const preScore = await copyrightedMusic.getPreviousScore(resourceID);
        console.log(`满分：${fullScore}, 总分：${total}, 平均分：${average}, 上句分: ${preScore}
          暂停：${isScorePaused}, 打分中：${isScoreRunning}
        `)
        if (preScore >= 0) {
          pitchView.addScore(preScore);
          console.warn("zc.cm addScore", postion, preScore);
        }
    }, 100)
};
lyricView.onLyricLineFinished = playLineFinished
```
