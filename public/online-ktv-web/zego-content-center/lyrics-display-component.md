# 歌词组件

- - -

## 功能简介

ZEGO 歌词 UI 组件（ZegoLyricView）支持在歌曲播放的同时同步显示 KRC（逐字）格式的歌词。本文将介绍如何在项目中集成并使用 ZEGO 歌词 UI 组件。

- 歌曲播放时，根据当前播放进度显示对应的歌词。
- 自定义歌词界面。

<Frame width="512" height="auto" ><img src="https://doc-media.zego.im/sdk-doc/Pics/CopyrightedMusic/ZegoLyricView.png" /></Frame>

## 组件核心类文件介绍

### ZegoLyricView

该类是一个自定义 View 组件，用于接收歌词数据展示以及 UI 交互，可设置歌词播放时文字的高亮颜色以及字体大小。 

相关接口：

```ts
/**
  * 需要先调用 setupLyric 设置歌词数据后，再调用 setCurrentTimeMillis(long current) 方法，才能将歌词展示出来
  * @param lrc 歌词数据模型
  */
setupLyric(lrc: ZGKTVLyric): void

/**
 * 设置当前时间显示位置
 *
 * @param current 时间戳
 */
setCurrentTimeMillis(currentTime: number): void

/**
 * 挂载歌词组件到UI界面
 * @param container div容器元素或容器元素的id
 * @param config 设置字体颜色大小
 * 
*/
mount(
  container: HTMLDivElement | string,
  config: {
    highLightFontColor: string;
    defaultFontColor: string;
    highLightFontSize: number;
    defaultFontSize: number;
    ratioPositionFromTop?: number;
  }
): void

 /**
  * 设置高潮片段当前时间显示位置（仅用于高潮片段资源）
  *
  * @param current 当前播放器进度
  * @param segmentBegin 高潮片段开始时间（该字段在请求高潮片段资源时返回）
  * @param krcFormatOffset krc 格式歌词（逐字歌词）对歌曲的偏移量 （该字段在获取逐字歌词时返回）
  */
public void setAccompanimentClipCurrentTimeMillis(long current, long segmentBegin, long krcFormatOffset);

// === 配置类用于配置歌词 UI 组件的一些字体阴影、行高、行距等 CSS 样式，具体可根据自身需求设置。 ===

/**
 * 设置默认字体样式
 * @param style 示例: "text-align:center;"
 */
setCustomDefaultFontStyle(style: string): void

/**
 * 设置高亮字体样式
 * @param style 示例: "text-align:center;"
 */
setCustomHighLightFontStyle(style: string): void

/**
 * 设置行样式
 * @param style 示例: "text-align:center;"
 */
setCustomLineStyle(style: string): void
```

### 数据类文件

- LyricInfo：整首歌的 model，包含每一行 model 的集合。
- LineInfo：一行歌词的 model 信息，包含每一个字的集合。
- WordInfo：单个字的信息，包含这个字的开始播放时间、播放持续时长等。

## 前提条件

在集成歌词 UI 组件之前，请确保：

已在项目中集成 ZEGO Express SDK（含版权音乐功能），实现基本的点歌和歌曲播放相关功能，详情请参考 [点歌](/online-ktv-web/zego-content-center/sing-songs)。

## 组件接入方式

获取完整源码，请参考 [下载](/online-ktv-web/downloads)。

以下主要介绍歌词 UI 组件接入的步骤和部分代码示例。

### 引入 lyricView 组件

1. 在项目中添加 lyricView 组件。

    解压组件压缩包，拷贝 **lyricView** 文件夹至项目中，在项目中添加 lyricView 组件的依赖项。

    ```ts
    import { ZegoLyricView } from "lyricView/ZegoLyricView"
    ```

2. 在界面中引入 lyricView 组件。

    ```html
    <div id="lyricsPlayer" style="width:100%;height:300px;"></div>
    ```

    ```js
    // 初始化实例
    const view = new ZegoLyricView();
    // 挂载歌词组件
    view.mount("lyricsPlayer", {
        highLightFontColor: "#0fdd7a",
        defaultFontColor: "#cb57f7",
        highLightFontSize: 18,
        defaultFontSize: 12
    });
    ```

### 初始化 lyricView 组件并添加自定义样式

```js
// 默认字体样式
view.setCustomDefaultFontStyle("filter: drop-shadow(2px 4px 6px #0000)");
// 高亮字体样式
view.setCustomHighLightFontStyle(
    "filter: drop-shadow(2px 4px 6px #0fdd7a)"
);
// 行样式
view.setCustomLineStyle("display: flex; justify-content: center;");
```

### 获取歌词

获取歌词数据需要调用 SDK 的 [getKrcLyricByToken](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoCopyrightedMusic#get-krc-lyric-by-token) 接口获取到 lyrics 歌词信息，再调用 ZegoLyricView 的 `setupKrcLyric` 接口设置歌词数据源。

```java
const krcToken = "xxx"
const { errorCode, lyrics } = await zcm.getKrcLyricByToken(krcToken);
if(errorCode===0){
    view.setupLyric(lyrics);
}
```

### 同步更新歌词进度

#### 房主/歌唱者

开启定时器，不断循环，根据歌曲进度回调更新歌词进度展示。

```js
// 开启定时器定时更新歌词进度
setInterval(() => {
    //songPlayer 为播放歌曲的 audio 标签元素。
    const songPlayer = document.getElementById("copySongPlayer");
    if (!songPlayer.paused) {
        // 更新本地歌词播放进度
        const currentTime = songPlayer.currentTime * 1000
        view.setCurrentTimeMillis(currentTime);

        // 将歌词播放进度通过 SEI 传出去
        const info = {
            KEY_PROCESS_IN_MS: currentTime,
            KEY_TOTAL_IN_MS: songPlayer.duration * 1000
        };
        const res = zg.sendSEI(
            publishStreamID,
            new TextEncoder().encode(JSON.stringify(info))
        );
    }
    // SEI 发送频率会影响观众端的歌词进度更新频率
}, 50);
```

针对不同的音乐资源类型，房主/歌唱者在同步更新歌词进度时需要区别处理。

- 原唱资源，指的是调用 Express SDK [requestResource](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoCopyrightedMusic#request-resource) 接口，type 参数传入 0 为原曲音乐资源类型请求的资源。

- 伴奏资源，指的是调用 Express SDK [requestResource](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoCopyrightedMusic#request-resource) 接口，type 参数传入 1 为伴奏资源类型请求的资源。

<Warning title="注意">

由于原唱资源只有逐行歌词，如果您需要展示逐字歌词，请使用伴奏资源。
</Warning>

```js
// 更新本地歌词播放进度
const currentTime = songPlayer.currentTime * 1000
view.setCurrentTimeMillis(currentTime);
```

#### 观众

房主端通过 [sendSEI](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#send-sei) 发送 SEI 后，观众端可通过监听 [on](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#on) 方法监听事件 `playerRecvSEI` 的回调接收 SEI 来获取歌词的进度。观众端根据播放进度设置本地歌词播放进度，此处仅展示音乐资源为原唱/伴奏资源，歌词更新到指定位置的情况。

```js
zg.on("playerRecvSEI", (streamID, uintArray) => {
    // 根据发送的 SEI， 解出 SEI 的内容，示例如下：
    try {
        const json = JSON.parse(new TextDecoder().decode(uintArray.slice(4)));
        //  获取播放进度 json.KEY_PROCESS_IN_MS 放到歌词组件进行更新歌词进度
        view.setCurrentTimeMillis(json.KEY_PROCESS_IN_MS );

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
