# 歌词组件

---

## 功能简介

ZEGO 歌词 UI 组件（ZegoLyricView）支持在歌曲播放的同时同步显示 KRC（逐字）格式的歌词。本文将介绍如何在项目中集成并使用 ZEGO 歌词 UI 组件。   

- 歌曲播放时，根据当前播放进度显示对应的歌词。
- 自定义歌词界面。

<Frame width="512" height="auto" ><img src="https://doc-media.zego.im/sdk-doc/Pics/GoEnjoy/online_KTV/demo/ZegoLyricView.png" /></Frame>


## 组件核心类文件介绍

### ZegoLyricView

该类是一个自定义 View 组件，用于接收歌词数据展示以及 UI 交互。

相关接口：

```java
/**
 * 需要先调用 setupLyric 设置歌词数据后，再调用 setCurrentTimeMillis(long current) 方法，才能将歌词展示出来
 * @param lrc 歌词数据模型
 */
public void setupLyric(ZGKTVLyric lrc);

/**
 * 更新逐字歌词 UI 组件的时间
 * @param current 当前播放器进度
 */
public void setCurrentTimeMillis(long current);

 /**
  * 设置高潮片段当前时间显示位置（仅用于高潮片段资源）
  *
  * @param current 当前播放器进度
  * @param segmentBegin 高潮片段开始时间（该字段在请求高潮片段资源时返回）
  * @param krcFormatOffset krc 格式歌词（逐字歌词）对歌曲的偏移量 （该字段在获取逐字歌词时返回）
  */
 public void setAccompanimentClipCurrentTimeMillis(long current, long segmentBegin, long krcFormatOffset);

// === 配置类用于配置歌词 UI 组件的一些字体颜色和字体大小，具体可根据自身需求新增字段。 ===

/** 设置高亮字体颜色 */
public void setHighLightTextColor(int color);

/** 设置默认文字颜色 */
public void setDefaultTextColor(int color);

/** 设置高亮字体大小 */
public void setHighLightTextSizeSp(float size);

/*** 设置歌词换行回调监听。只在逐字歌词模式才会生效 */
public void setOnLyricFinishLineListener(OnLyricLineFinishedListener onLyricLineFinishedListener);
```


### ZegoLyricViewHelper

该类是一个用于解析、计算当前整首歌时间进度等的数据帮助类。

核心接口：

```java
/**
 * 逐字歌词播放模式下，根据当前播放的时间戳计算出这一行文字的百分比进度
 * 因为一行歌词中不同的词语占用时间比重是不均匀的，所以不是一个简单的线性函数（是一个折线函数，单个词语视为线性的），需要单独处理
 *
 * @param currentTimeMillis 当前播放的时间戳
 * @param lineInfo 当前行 model
 * @return 进度
 */
public static float calculateCurrentKrcProgress(long currentTimeMillis, LineInfo lineInfo);

/**
 * 解析歌词数据
 * @param lrc 歌词原始 model
 */
public static LyricInfo parseKrcLyric(ZGKTVLyric lrc);

/**
 * 裁剪歌词 ，获取处于 beginTime 和 endTime 之间的歌词
 * 此接口主要应用于音乐资源为高潮片段的场景。
 * 由于调用 requestResource 接口请求高潮片段后会返回的 krc_token，调用 getKrcLyricByToken 
 * 后传入此 krc_token，获取的是整首歌的歌词，而非仅高潮片段对应的歌词，因此需要对原歌词进行裁剪 
 *
 * @param beginTime 歌词开始时间，单位为毫秒，推荐与调用 requestResource 接口请求高潮片段
 *                  后返回的 segment_begin + prelude_duration 后计算的值相同
 * @param endTime 歌词结束时间，单位为毫秒，推荐与调用 requestResource 接口请求高潮片段
 *                后返回的 segment_end 的值保持一致
 * @param lrc 歌曲的完整歌词的原始 model
 * @return 裁剪后歌词片段的原始 model
 */
public static ZGKTVLyric clipLyric(long beginTime, long endTime, ZGKTVLyric lrc);
```

### 数据类文件
- LyricInfo：整首歌的 model，包含每一行 model 的集合。
- LineInfo：一行歌词的 model 信息，包含每一个字的集合。
- WordInfo：单个字的信息，包含这个字的开始播放时间、播放持续时长等。


## 前提条件

在集成歌词 UI 组件之前，请确保：

已在项目中集成 ZEGO Express SDK（含版权音乐功能），实现基本的点歌和歌曲播放相关功能，详情请参考 [点歌（获取和分享歌曲）](/online-ktv-android/zego-content-center/sing-songs)。


## 组件接入方式

获取完整源码，请参考 [下载](/online-ktv-android/downloads)。

以下主要介绍歌词 UI 组件接入的步骤和部分代码示例。

### 引入 lyricview 组件

参考如下步骤，在项目中添加 lyricview 组件：

1. 解压组件压缩包，拷贝 **lyricview** 文件夹至项目中。

2. 在项目中引入 lyricview 组件。

打开项目的 settings.gradle 文件，添加如下代码：

```gradle
include ':lyricview'
```

3. 在项目中添加 lyricview 组件的依赖项。打开项目的 app/build.gradle 文件，添加如下代码：

```gradle
dependencies {
    implementation project(path: ':lyricview')
    ......
}
```

### 在界面中引入 lyricview 组件

在项目的 Activity 中，引入 lyricview 组件。

```xml
<im.zego.lyricview.ZegoLyricView
    android:id="@+id/lyric_view"
    android:layout_width="match_parent"
    android:layout_height="match_parent"/>
```

### 初始化 lyricview 组件并添加自定义属性

在项目的 Activity 中，声明和初始化 lyricview 组件对象。示例代码如下：

```java
public class KTVActivity extends AppCompatActivity {
    private ZegoLyricView mZGLyricView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        ...
        mZGLyricView = findViewById(R.id.lyric_view);
        // 设置高亮字体大小
        mZGLyricView.setHighLightTextSizeSp(20);
        // 设置默认字体大小
        mZGLyricView.setDefaultTextSizeSp(12);
        // 设置高亮字体颜色
        mZGLyricView.setHighLightTextColor(Color.RED);
        // 设置默认字体颜色
        mZGLyricView.setDefaultTextColor(Color.WHITE);
        ...
    }
}
```

### 获取歌词

获取歌词数据需要调用 SDK 的 [getKrcLyricByToken](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~ZegoCopyrightedMusic#get-krc-lyric-by-token) 接口，拉取到数据后转为 ZGKTVLyric 模型，再调用 ZGLyricView 的 `setupKrcLyric` 接口设置歌词数据源。

```java
/** 获取 Express 引擎实例 */
ZegoExpressEngine mSDKEngine = ZegoExpressEngine.getEngine();

/** 获取版权音乐实例 */
ZegoCopyrightedMusic mCopyrightedMusic = mSDKEngine.createCopyrightedMusic();

/** 调用接口获取 krc 逐字歌词内容，token 是从主播端获取的 */
mCopyrightedMusic.getKrcLyricByToken(token, new IZegoCopyrightedMusicGetKrcLyricByTokenCallback() {
    @Override
    public void onGetKrcLyricByTokenCallback(int errorCode, String lyrics) {
        ZGKTVLyric lyric = gson.fromJson(lyrics, ZGKTVLyric.class);
        // 设置歌词为 krc 格式 (逐字歌词)
        lyric.setHasKrcFormat(true);
        // 获取到歌词内容后设置给歌词 UI 组件
        mZGLyricView.setupLyric(lyric);
    }
});
```

### 同步更新歌词进度

#### 房主/歌唱者

通过开启定时器每 30 ms 不断循环调用更新歌词进度展示。

```java
/** 定时器封装类 */
public class CustomProgressTimer {
    private static final Handler HANDLER = new Handler(Looper.getMainLooper());
    private Timer timer = new Timer();
    private TimerTask timerTask = new TimerTask() {
        @Override
        public void run() {
            HANDLER.post(runnable);
        }
    };

    private final Runnable runnable;
    private boolean isRunning = false;

    public CustomProgressTimer(Runnable runnable) {
        this.runnable = runnable;
    }

    public void scheduleAtFixedRate(long delay, long period) {
        if (isRunning) return;
        isRunning = true;
        timer.scheduleAtFixedRate(timerTask, delay, period);
    }

    public void cancel() {
        if (isRunning) {
            timer.cancel();
        }
    }
}
```

```java
/** 获取播放器对象 */
ZegoMediaPlayer mediaPlayer = ZegoExpressEngine.getEngine().createMediaPlayer();

/** 设置播放器进度回调间隔 */
mediaPlayer.setProgressInterval(500);

/** 设置播放器对象回调 */
mediaPlayer.setEventHandler(new IZegoMediaPlayerEventHandler() {

    /** 播放器状态变化回调 */
    @Override
    public void onMediaPlayerStateUpdate(ZegoMediaPlayer mediaPlayer, ZegoMediaPlayerState state, int errorCode) {
       
        if(errorCode == 0 ){
            if(state != ZegoMediaPlayerState.PLAYING) {
                // 非正在播放状态清零
                mPlayerCurrentTimeMillis = 0;
                mPlayerCurrentProgress = 0;
            }else {
                mPlayerCurrentTimeMillis = System.currentTimeMillis();
                mPlayerCurrentProgress = mediaPlayer.getCurrentProgress();
                /** 开启定时器，间隔为 30 ms */
                mProgressTimer.scheduleAtFixedRate(0, 30);
            }
        }
    }

    /** 播放器进度变化回调 */
    @Override
    public void onMediaPlayerPlayingProgress(ZegoMediaPlayer mediaPlayer, long millisecond) {
        mPlayerCurrentTimeMillis = System.currentTimeMillis();
        mPlayerCurrentProgress = millisecond;

    }
});
```

针对不同的音乐资源类型，房主/歌唱者在同步更新歌词进度时需要区别处理。

#### 原唱或者伴奏资源

原唱资源，指的是调用 Express SDK [requestResource](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~ZegoCopyrightedMusic#request-resource) 接口，传入 `ZEGO_COPYRIGHTED_MUSIC_RESOURCE_SONG` 音乐资源类型请求的资源。

伴奏资源，指的是调用 Express SDK [requestResource](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~ZegoCopyrightedMusic#request-resource) 接口，传入 `ZEGO_COPYRIGHTED_MUSIC_RESOURCE_ACCOMPANIMENT` 音乐资源类型请求的资源。

<Warning title="注意">

由于原唱资源只有逐行歌词，如果您需要展示逐字歌词，请使用伴奏资源。
</Warning>


```java
/** 播放器进度回调时的时间，未播放状态需设为 0 */
private long mPlayerCurrentTimeMillis = 0;

/** 播放器进度，未播放状态需设为 0 */
private long mPlayerCurrentProgress = 0;

/** 定时器对象 */
private CustomProgressTimer mProgressTimer = new CustomProgressTimer(new Runnable() {
        @Override
        public void run() {
            if(mPlayerCurrentTimeMillis != 0){
                // 计算出当前播放器进度（当前播放器进度 = 当前时间 - 播放器回调时的时间 + 回调返回的播放器进度）
                long customProgress = System.currentTimeMillis() - mPlayerCurrentTimeMillis + mPlayerCurrentProgress;
                // 更新当前播放器的时间，歌词 UI 组件会自动更新到指定位置并高亮
                // 因为音乐资源为原曲或者伴奏，所以调用 setCurrentTimeMillis 直接传入播放器进度
                mZGLyricView.setCurrentTimeMillis(customProgress);
              
            }
        }
    });
```

#### 高潮片段资源

伴奏高潮片段资源，指的是调用 Express SDK [requestResource](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~ZegoCopyrightedMusic#request-resource) 接口，传入 `ZEGO_COPYRIGHTED_MUSIC_RESOURCE_ACCOMPANIMENT_CLIP` 音乐资源类型后请求的资源。

```java
/** 播放器进度回调时的时间，未播放状态需设为 0 */
private long mPlayerCurrentTimeMillis = 0;

/** 播放器进度，未播放状态需设为 0 */
private long mPlayerCurrentProgress = 0;

/** 定时器对象 */
private CustomProgressTimer mProgressTimer = new CustomProgressTimer(new Runnable() {
        @Override
        public void run() {
            if(mPlayerCurrentTimeMillis != 0){
                // 计算出当前播放器进度（当前播放器进度 = 当前时间 - 播放器回调时的时间 + 回调返回的播放器进度）
                long customProgress = System.currentTimeMillis() - mPlayerCurrentTimeMillis + mPlayerCurrentProgress;
                // 更新当前播放器的时间，歌词 UI 组件会自动更新到指定位置并高亮
                // 由于音乐资源为高潮片段，所以调用 setAccompanimentClipCurrentTimeMillis 方法
                //
                // @param current 当前播放器进度
                // @param segmentBegin 高潮片段开始时间（该字段在调用 requestResource 请求高潮片段资源时返回）
                // @param krcFormatOffset krc 格式歌词（逐字歌词）对歌曲的偏移量 （该字段在获取逐字歌词时返回）
                mZGLyricView.setAccompanimentClipCurrentTimeMillis(customProgress, segmentBegin, krcFormatOffset);
             
            }
        }
    });
```

#### 观众

房主端通过 [sendSEI](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~ZegoExpressEngine#send-sei-1) 发送 SEI 后，观众端可以监听 [onPlayerRecvSEI](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~IZegoEventHandler#on-player-recv-sei) 回调接收 SEI 来获取歌词的进度。观众端流畅的歌词效果也需要通过定时器每 30ms 调用一次，此处仅展示音乐资源为原唱/伴奏资源，歌词更新到指定位置的情况。高潮片段资源的歌词同步实现流程请参考上文[高潮片段资源](#高潮片段资源)。


```java
/** 观众端同步收到流额外信息的回调（SEI）*/
public void onPlayerRecvSEI(String streamID, byte[] data) {
    // 解析 data 字段数据获取当前进度 currentProgress
    // 更新当前播放器的时间，歌词 UI 组件会自动更新到指定位置并高亮
    mZGLyricView.setCurrentTimeMillis(currentProgress);
}
```
