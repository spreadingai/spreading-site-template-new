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

相关接口：

```java
/** 传入音高线数组 */
public void setStandardPitch(List<MusicPitch> pitchList);

/** 设置伴奏当前播放时间和实时音高，两个参数必须同时设置，保证数据同步性
 *
 * @param progress 当前播放时间
 * @param pitch 实时音高
 */
public void setCurrentSongProgress(long progress, int pitch);

/**
 * 设置高潮片段当前播放时间和实时音高，两个参数必须同时设置，保证数据同步性（仅用于高潮片段资源）
 *
 * @param progress 当前播放时间
 * @param pitch 实时音高
 * @param segmentBegin 高潮片段开始时间（该字段在请求高潮片段资源时返回）
 * @param krcFormatOffset krc 歌词对歌曲的偏移量（该字段在 krc 歌词数据中获取）
 */
public void setAccompanimentClipCurrentSongProgress(long progress, int pitch, long segmentBegin, long krcFormatOffset);

/** 添加分数在当前时间点展示 */
public void addScore(int score);

/** 重置音高线数据 */
public void reset();

/** 获取标准音高线开始的时间 */
public long getPitchStartTime();

/** 设置 UI 配置 */
public void setUIConfig(ZegoPitchViewUIConfig zegoPitchViewUIConfig);
```


### ZegoPitchViewHelper

该类是一个用于处理音高线数据和音高线 UI 的帮助类。

核心接口：

```java
/**
 * 将音高线原始数据模型转为控件数据模型
 * 此接口适用于转换完整伴奏资源的音高线数据
 * @param zgktvPitch 音高线原始 model
 * @return 完整伴奏的音高线控件数据模型
 */
public static List<MusicPitch> parsePitch(ZGKTVPitch zgktvPitch);

 /**
  * 将音高线原始数据模型转为控件数据模型
  * 此接口仅用于转换指定时间段内的音高线数据
  * @param beginTime 开始时间，单位为毫秒，此时间以歌曲起始时间为基准。
  * @param endTime 结束时间，单位为毫秒，此时间以歌曲起始时间为基准。
  * @param zgktvPitch 音高线原始 model
  * @return 指定时间段的音高线控件数据模型
  */
 public static List<MusicPitch> parsePitch(long beginTime, long endTime, ZGKTVPitch zgktvPitch);

/**
 * 将音高线原始数据模型转为控件数据模型
 * 此接口仅用于转换高潮片段对应的音高线数据
 * @param segmentBegin 高潮片段开始时间（该字段在请求高潮片段资源时返回）
 * @param segmentEnd 高潮片段结束时间（该字段在请求高潮片段资源时返回）
 * @param preludeDuration 高潮片段前奏时间（该字段在请求高潮片段资源时返回）
 * @param krcFormatOffset krc 歌词对歌曲的偏移量（该字段在 krc 歌词数据中获取）
 * @param zgktvPitch 音高线原始 model
 * @return 高潮片段的音高线控件数据模型
 */
public static List<MusicPitch> parseAccompanimentClipPitch(long segmentBegin, long segmentEnd, long preludeDuration, long krcFormatOffset, ZGKTVPitch zgktvPitch); 
```

### ZegoPitchViewUIConfig

该类是用于配置音高线 UI 效果。

开发者需要创建该类对象，设置 UI 效果；并调用 `ZegoPitchView` 中的 `setUIConfig()` 接口，使 UI 生效。

```java
/** 默认音高线颜色 */
public void setStandardPitchColor(int standardPitchColor);

/** 击中音高线颜色 */
public void setHitPitchColor(int hitPitchColor);

/** 音调指示器颜色 */
public void setPitchIndicatorColor(int pitchIndicatorColor);

/** 五线谱横线颜色 */
public void setStaffColor(int staffColor);

/** 竖线颜色 */
public void setVerticalLineColor(int verticalLineColor);

/** 分数文本颜色 */
public void setScoreTextColor(int scoreTextColor);
```

### 数据类文件

- ZGKTVPitch：对 SDK 返回的音高线数据进行反序列化的类。
- MusicPitch：一段音高线数据信息。


## 前提条件

在集成评分 UI 组件之前，请确保：

已在项目中集成 ZEGO Express SDK（含版权音乐功能），实现基本的点歌和歌曲播放相关功能，详情请参考 [点歌](/online-ktv-android/zego-content-center/sing-songs)。

## 组件接入方式

获取完整源码，请参考 [下载](/online-ktv-android/downloads)。

以下主要介绍评分 UI 组件接入的步骤和部分代码示例。

### 引入 pitchview 组件

参考如下步骤，在项目中添加 pitchview 组件：

1. 解压组件压缩包，拷贝 **pitchview** 文件夹至项目文件夹下。
2. 在项目中引入 pitchview 组件。

打开项目的 settings.gradle 文件，添加如下代码：

```gradle
include ':pitchview'
```

3. 在项目中添加 pitchview 组件的依赖项。打开项目的 app/build.gradle 文件，添加如下代码：

```gradle
dependencies {
    implementation project(':pitchview')
    ......
}
```

### 在界面中引入 pitchview 组件

在项目的 Activity 中，引入 pitchview 组件。

```xml
<im.zego.pitchview.ZegoPitchView
    android:id="@+id/pitch_view"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:paddingTop="5dp"
    android:paddingBottom="5dp"/>
```

### 初始化 pitchview 组件

在项目的 Activity 中，声明和初始化 pitchview 组件对象。

```java
public class KTVActivity extends AppCompatActivity {
    private ZegoPitchView mZGPitchView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        ...
        mZGPitchView = findViewById(R.id.pitch_view);
        ...
    }
}
```

### 获取标准音高线

获取音高线数据需要调用 SDK 的 [getStandardPitch](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Java_android~class~im-zego-zegoexpress-zego-copyrighted-music&jumpType=route#get-standard-pitch) 接口，拉取到数据后通过 ZGKTVPitch 进行反序列化，调用 `ZegoPitchViewHelper.parsePitch` 返回音高线列表，再调用 ZegoPitchView 的 `setStandardPitch` 接口设置标准音高线数据源。

```java
/** 获取 Express 引擎实例 */
ZegoExpressEngine mSDKEngine = ZegoExpressEngine.getEngine();

/** 获取版权音乐实例 */
ZegoCopyrightedMusic mCopyrightedMusic = mSDKEngine.createCopyrightedMusic();

/** 调用接口获取标准音高线 */
mCopyrightedMusic.getStandardPitch(resourceID, new IZegoCopyrightedMusicGetStandardPitchCallback() {
    @Override
    public void onGetStandardPitchCallback(int errorCode, String pitch) {
        if (errorCode == 0) {
            Gson gson = new Gson();
            ZGKTVPitch standardPitch = gson.fromJson(pitch, ZGKTVPitch.class);
            // 获取音高线数据给评分 UI 组件
            mZGPitchView.setStandardPitch(ZegoPitchViewHelper.parsePitch(standardPitch));
        }
    }
});
```

如果歌曲资源是`高潮片段资源`，设置标准音高可以使用 `parseAccompanimentClipPitch(long segmentBegin, long segmentEnd, long preludeDuration, long krcFormatOffset, ZGKTVPitch zgktvPitch)`，获取仅处于高潮片段内的音高。


### 设置实时音高

#### 获取实时音高

先开启一个定时器每 60 ms 不断循环调用设置实时音高的方法。在播放器播放状态回调中，开始播放状态时重置分数和开启评分功能，设置回调间隔为 60 ms。

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
/** 记录当前的实时音高 */
private int mCurrentPitch = 0;

/** 记录播放器的进度时间 */
private long mCurrentProgress = 0;

/** 播放器进度回调时的时间，未播放状态需设为 0 */
private long mPlayerCurrentTimeMillis = 0;

/** 播放器进度，未播放状态需设为 0 */
private long mPlayerCurrentProgress = 0;
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
        if (state == ZegoMediaPlayerState.PLAYING) {
            // 重置分数
            mCopyrightedMusic.resetScore(resourceID);
            // 开启评分，设置回调间隔为 60 ms
            mCopyrightedMusic.startScore(resourceID,60);
        } 

        if(errorCode == 0 ){
            if(state != ZegoMediaPlayerState.PLAYING) {
                //非正在播放状态清零
                mPlayerCurrentTimeMillis = 0;
                mPlayerCurrentProgress = 0;
            }else {
                mPlayerCurrentTimeMillis = System.currentTimeMillis();
                mPlayerCurrentProgress = mediaPlayer.getCurrentProgress();
                mProgressTimer.scheduleAtFixedRate(0, 30);
            }
        }
    }

    /** 播放器进度变化回调 */
    @Override
    public void onMediaPlayerPlayingProgress(ZegoMediaPlayer mediaPlayer, long millisecond) {
        mCurrentProgress = millisecond;
        mPlayerCurrentTimeMillis = System.currentTimeMillis();
        mPlayerCurrentProgress = millisecond;
       
    }
});
```

```java
/** 设置音高线回调 */
mCopyrightedMusic.setEventHandler(new IZegoCopyrightedMusicEventHandler() {
    @Override
    public void onCurrentPitchValueUpdate(ZegoCopyrightedMusic copyrightedMusic, String resourceID, int currentDuration, int pitchValue) {
        mCurrentPitch = pitchValue;
    }
});
```

针对不同的音乐资源类型，房主/歌唱者在同步更新音高时需要区别处理。

##### 伴奏资源

伴奏资源，指的是调用 Express SDK [requestResource](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~ZegoCopyrightedMusic#request-resource) 接口，传入 `ZEGO_COPYRIGHTED_MUSIC_RESOURCE_ACCOMPANIMENT` 音乐资源类型请求的资源。

```java
/** 记录播放器回调次数 */
private int mPitchInterval = 0;

/** 定时器对象 */
private CustomProgressTimer mProgressTimer = new CustomProgressTimer(new Runnable() {
    @Override
    public void run() {
        if(mPlayerCurrentTimeMillis != 0){
            // 计算出当前播放器进度（当前播放器进度 = 当前时间 - 播放器回调时的时间 + 回调返回的播放器进度）
            long customProgress = System.currentTimeMillis() - mPlayerCurrentTimeMillis + mPlayerCurrentProgress;
            mCurrentProgress = customProgress;

            // 定时器每 30 ms 调用一次，所以每两次设置一次实时音高
            mPitchInterval ++;
            if(mPitchInterval >= 2) {
                mPitchInterval = 0;
                // 因为音乐资源为伴奏，所以调用 setCurrentSongProgress 直接传入播放器进度
                mZGPitchView.setCurrentSongProgress(customProgress, mCurrentPitch);
            }
        }
    }
});
```

##### 高潮片段资源

伴奏高潮片段资源，指的是调用 Express SDK [requestResource](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~ZegoCopyrightedMusic#request-resource) 接口，传入 `ZEGO_COPYRIGHTED_MUSIC_RESOURCE_ACCOMPANIMENT_CLIP` 音乐资源类型后请求的资源。

```java
/** 记录播放器回调次数 */
private int mPitchInterval = 0;

/** 定时器对象 */
private CustomProgressTimer mProgressTimer = new CustomProgressTimer(new Runnable() {
    @Override
    public void run() {
        if(mPlayerCurrentTimeMillis != 0){
            // 计算出当前播放器进度（当前播放器进度 = 当前时间 - 播放器回调时的时间 + 回调返回的播放器进度）
            long customProgress = System.currentTimeMillis() - mPlayerCurrentTimeMillis + mPlayerCurrentProgress;
            mCurrentProgress = customProgress;

            // 定时器每 30 ms 调用一次，所以每两次设置一次实时音高
            mPitchInterval ++;
            if(mPitchInterval >= 2) {
                mPitchInterval = 0;
                // 由于音乐资源为高潮片段，所以调用 setAccompanimentClipCurrentSongProgress 方法
                // @param segmentBegin 高潮片段开始时间（该字段在请求高潮片段资源时返回）
                // @param krcFormatOffset krc 格式歌词（逐字歌词）对歌曲的偏移量 （该字段在获取逐字歌词时返回）
                mZGPitchView.setAccompanimentClipCurrentSongProgress(customProgress, mCurrentPitch, segmentBegin, krcFormatOffset);
            }
        }
    }
});
```

#### 添加分数

设置 [歌词组件](/online-ktv-android/zego-content-center/lyrics-display-component) 的换行监听回调，并在回调中判断“当前播放进度时间”是否大于“音高线开始时间”。**如果`大于`音高线开始时间，则延迟 100ms 获取分数。**

开发者可以通过 SDK 的 [getPreviousScore](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~ZegoCopyrightedMusic#get-previous-score) 接口，获取并添加上一行分数。

```java
 /** 设置换行监听 */
 mZGLyricView.setOnLyricFinishLineListener(new OnLyricLineFinishedListener() {
     @Override
     public void onLyricLineFinished(int position, LineInfo lineInfo) {
         if(mZGPitchView.getPitchStartTime() < mCurrentProgress){
             // 在某些情况下，打分处理结果会出现延迟，建议开发者延迟 100ms 获取分数
             mZGPitchView.postDelayed(new Runnable() {
                 @Override
                 public void run() {
                     // 获取上一行分数并添加
                     mZGPitchView.addScore(mCopyrightedMusic.getPreviousScore(resourceID));
                 }
             },100);
         }
     }
 });
```
