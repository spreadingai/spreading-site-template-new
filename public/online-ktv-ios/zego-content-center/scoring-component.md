# 评分组件

---

## 功能简介

ZEGO 评分 UI 组件（ZegoPitchView）支持显示音高线和评分效果。本文将介绍如何在项目中集成并使用 ZEGO 评分 UI 组件。   

- 歌曲播放时，根据当前播放进度展示相应标准音高线。
- 展示分数。
- 自定义音高线界面的部分元素。

<Frame width="512" height="auto" ><img src="https://doc-media.zego.im/sdk-doc/Pics/GoEnjoy/online_KTV/demo/ZegoPitchView.png" /></Frame>


## 组件核心类文件

### ZegoPitchView

该类是一个自定义 View 组件，用于接收音高线和评分数据进行展示。

```objc
/**
 * 打分控件基本设置
 * @param config 如果传入为 nil，则会使用 defaultConfig
 */
- (void)setConfig:(ZegoPitchViewConfig *)config;

/**
 * 设置打分控件的标准音高线模型数组，默认不过滤
 * @param standardPitchModels 标准音高线模型数组
 */
- (void)setStandardPitchModels:(NSArray<ZegoPitchModel *> * _Nullable)standardPitchModels;

/**
 * 获取标准音高线的开始时间
 * 例: 在有音高线之前，不需要显示音高线的得分情况
 * @return 音高线开始对应歌曲进度
 */
- (int)getPitchStartTime;

/**
 * 设置当前歌曲播放进度及音高值，控件会在这个方法中更新标准音高线及击中音高线的绘制
 * @param progress 歌曲播放进度
 * @param pitch 音高值
 */
- (void)setCurrentSongProgress:(int)progress pitch:(int)pitch;

/**
 * 设置唱歌分数并展示，推荐在每句歌词唱完之后调用
 * @param score 唱歌分数
 */
- (void)addScore:(int)score;

/**
 * 重置打分控件内部状态
 * 一般在一首歌曲结束后，下一首歌曲开始前调用
 */
- (void)reset;
```


### ZegoPitchViewConfig

该类用于配置 ZegoPitchView。

```objc
/** 音高等级数，默认配置 20，不建议修改 */
@property (nonatomic, assign) int pitchNum;

/** 最大音高值，默认配置 90，不建议修改 */
@property (nonatomic, assign) int maxPitch;

/** 最小音高值，默认配置 10，不建议修改 */
@property (nonatomic, assign) int minPitch;

/** 评分 UI 组件开始至竖线这一段表示的时间（单位 ms），默认配置 1175，不建议修改 */
@property (nonatomic, assign) int timeElapsedOnScreen;

/** 竖线至评分 UI 组件末尾这一段表示的时间（单位 ms），默认配置 2750，不建议修改 */
@property (nonatomic, assign) int timeToPlayOnScreen;

/** 调用 [ZegoPitchView setCurrentSongProgress: pitch:] 方法的大致时间间隔（单位 ms） */
@property (nonatomic, assign) int estimatedCallInterval;

#pragma mark - Colors

/** 背景颜色 */
@property (nonatomic, strong) UIColor *backgroundColor;

/** 五线谱横线颜色 */
@property (nonatomic, strong) UIColor *staffColor;

/** 竖线颜色 */
@property (nonatomic, strong) UIColor *verticalLineColor;

/** 标准音调颜色 */
@property (nonatomic, strong) UIColor *standardRectColor;

/** 击中音调颜色 */
@property (nonatomic, strong) UIColor *hitRectColor;

/** 音调指示器颜色 */
@property (nonatomic, strong) UIColor *pitchIndicatorColor;

/** 分数文本颜色 */
@property (nonatomic, strong) UIColor *scoreTextColor;

/** 默认配置 */
+ (instancetype)defaultConfig;
```

<Warning title="注意">
评分 UI 组件中 UI 元素的颜色可随意设置，但是数据部分建议使用 `defaultConfig` 提供的默认配置。
</Warning>

### ZegoPitchModel

该模型类表示一段音高线的信息，以及解析数据 json 便利方法，可以直接将 ZegoExpressSDK 的音高线数据解析为音高线模型数组。

```objc
/** 音高线开始时间 */
@property (nonatomic, assign) int begin_time;

/** 音高线持续时间 */
@property (nonatomic, assign) int duration;

/** 音高值 */
@property (nonatomic, assign) int value;

/**
 * 将音高线原始数据转为控件数据模型
 * 此接口适用于转换完整伴奏资源的音高线数据
 *
 * @param json 从 ZegoExpressSDK 的 -[ZegoCopyrightedMusic getStandardPitch: callback:] 方法回调中获取的音高线原始数据.
 *
 * @return 完整伴奏的音高线数据模型数组，可通过 -[ZegoPitchView setStandardPitchModels:] 设置音高线 UI 控件的标准音高线.
 */
+ (NSArray<ZegoPitchModel *> *)analyzePitchData:(id)json;

/**
 * 将音高线原始数据转为控件数据模型
 * 此接口仅用于转换指定时间段内的音高线数据
 *
 * @param json 从 ZegoExpressSDK 的 -[ZegoCopyrightedMusic getStandardPitch: callback:] 方法回调中获取的音高线原始数据
 * @param beginTime 需要截断音高线数据的开始时间，单位为毫秒，此时间以歌曲起始时间为基准。
 * @param endTime 需要截断音高线数据的结束时间，单位为毫秒，此时间以歌曲起始时间为基准。
 *
 * @return 指定时间段的音高线数据模型数组，可通过 -[ZegoPitchView setStandardPitchModels:] 设置音高线 UI 控件的标准音高线.
 */
+ (NSArray<ZegoPitchModel *> *)analyzePitchData:(id)json
                                      beginTime:(NSInteger)beginTime
                                        endTime:(NSInteger)endTime;

/**
 * 将音高线原始数据模型转为控件数据模型
 * 此接口仅用于转换高潮片段对应的音高线数据
 *
 * @param json 从 ZegoExpressSDK 的 -[ZegoCopyrightedMusic getStandardPitch: callback:] 方法回调中获取的音高线原始数据.
 * @param segmentBegin 高潮片段开始时间（该字段在请求高潮片段资源时返回）
 * @param segmentEnd 高潮片段结束时间（该字段在请求高潮片段资源时返回）
 * @param preludeDuration 高潮片段前奏时间（该字段在请求高潮片段资源时返回）
 * @param krcFormatOffset krc 歌词对歌曲的偏移量（该字段在 krc 歌词模型数据中获取）
 */
+ (NSArray<ZegoPitchModel *> *)analyzeAccompanimentClipPitchData:(id)json
                                                    segmentBegin:(NSInteger)segmentBegin
                                                      segmentEnd:(NSInteger)segmentEnd
                                                 preludeDuration:(NSInteger)preludeDuration
                                                 krcFormatOffset:(NSInteger)krcFormatOffset;
```

## 前提条件

在集成评分 UI 组件之前，请确保：

已在项目中集成 ZEGO Express SDK（含版权音乐功能），实现基本的点歌和歌曲播放相关功能，详情请参考 [点歌](/online-ktv-ios/zego-content-center/sing-songs)。


## 组件接入方式 

获取完整源码，请参考 [下载](/online-ktv-ios/downloads)。

以下主要介绍评分 UI 组件接入的步骤和部分代码示例。

### 引入头文件

参考如下步骤，在项目中添加 ZegoPitchView 组件：

1. 解压组件压缩包，拷贝 **ZegoPitchView** 文件夹至项目文件夹下。
2. 在项目中 `#import "ZegoPitchView.h"` 引入头文件。

### 初始化

声明及初始化 ZegoPitchView 对象。示例代码如下：

```objc
ZegoPitchView *pitchView = [[ZegoPitchView alloc] init];

/** 需在使用评分 UI 组件前设置好 config */
[pitchView setConfig:[ZegoPitchViewConfig defaultConfig]];
```

### 获取标准音高线

获取音高线数据需要调用 SDK 的 [getStandardPitch](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoCopyrightedMusic#get-standard-pitch-callback) 接口，解析为包含 ZegoPitchModel 的数组，根据不同的音乐资源类型，需要调用 ZegoPitchModel 的不同接口进行解析。

#### 伴奏

如果歌曲资源为伴奏，需要调用 ZegoPitchModel 的 `analyzePitchData:pitch` 接口解析音高线数据。

```objc
// 调用接口获取标准音高线
[self.copyrightedMusic getStandardPitch:resourceID callback:^(int errorCode, NSString * _Nonnull pitch) {
    // 解析音高线
    NSArray *ret = [ZegoPitchModel analyzePitchData:pitch];
    if (complete) {
        complete(ret);
    }
}];
```

#### 高潮片段

如果歌曲资源为高潮片段，需要调用 ZegoPitchModel 的 `analyzeAccompanimentClipPitchData:segmentBegin:segmentEnd:preludeDuration:krcFormatOffset:` 接口解析音高线数据。

```objc
// 调用接口获取标准音高线
[self.copyrightedMusic getStandardPitch:resourceID callback:^(int errorCode, NSString * _Nonnull pitch) {
    // 高潮片段资源调用专用接口来解析音高线数据
    NSArray *ret = [ZegoPitchModel analyzeAccompanimentClipPitchData:segmentBegin:segmentEnd:preludeDuration:krcFormatOffset segmentBegin:segmentBegin segmentEnd:segmentEnd preludeDuration:preludeDuration krcFormatOffset:krcFormatOffset];
    if (complete) {
      complete(ret);
    }
  }];
```

### 设置标准音高线数据

获取标准音高线之后，开发者需调用 ZegoPitchView 的 `setStandardPitchModels` 接口向评分 UI 组件设置标准音高线数据。

### 设置实时音高

#### 获取实时音高

在播放器播放状态回调中，当播放器处于开始播放状态时，调用重置分数和开启评分接口。设置音高回调间隔为 60 ms，播放器进度回调间隔为 30 ms，在播放器的进度回调中每两次对评分 UI 组件设置一次实时音高。除此之外，根据不同的音乐资源类型，获取实时音高的实现方法也有所不同。

#### 伴奏资源

如果播放器播放的是伴奏资源，需要调用 `setProgress:millisecond pitch:self.pitch` 接口设置实时音高。

```objc
/** 播放器进度变化回调 */
- (void)mediaPlayer:(ZegoMediaPlayer *)mediaPlayer playingProgress:(unsigned long long)millisecond {
    static int pitchViewTimesCount = 0;
    pitchViewTimesCount++;
    if (pitchViewTimesCount >= 2) {
        pitchViewTimesCount = 0;
        [self.pitchView setProgress:millisecond pitch:self.pitch];
    }
}

- (void)mediaPlayer:(ZegoMediaPlayer *)mediaPlayer stateUpdate:(ZegoMediaPlayerState)state errorCode:(int)errorCode {
    if (state == ZegoMediaPlayerStatePlaying) {
        // 重置分数
        [self.copyrightedMusic resetScore:self.resourceID];
        // 开启评分，设置回调间隔为 60 ms
        [self.copyrightedMusic startScore:self.resourceID pitchValueInterval:60];
    } 
}

/** 设置音高线回调 */
- (void)onCurrentPitchValueUpdate:(ZegoCopyrightedMusic *)copyrightedMusic 
                       resourceID:(NSString *)resourceID 
                  currentDuration:(int)currentDuration 
                       pitchValue:(int)pitchValue {
    self.pitch = pitchValue;
}
```

#### 高潮片段资源

如果播放器播放的是高潮片段资源，则需要调用 `setAccompanimentClipCurrentSongProgress:pitch:segBeginTime:krcFormatOffset:` 接口设置实时音高。其余接口调用与本文 4.5.1.1 保持一致。

```objc
/** 播放器进度变化回调 */
- (void)mediaPlayer:(ZegoMediaPlayer *)mediaPlayer playingProgress:(unsigned long long)millisecond {
    static int pitchViewTimesCount = 0;
    pitchViewTimesCount++;
    if (pitchViewTimesCount >= 2) {
        pitchViewTimesCount = 0;
        [self.pitchView setAccompanimentClipCurrentSongProgress:millisecond pitch:self.pitch segBeginTime:segBeginTime krcFormatOffset:krcFormatOffset];
    }
}
```

#### 添加分数

如果需要在控件上展示音高分数，则需要在歌曲开始前调用 ZegoExpresssEngine SDK 版权音乐模块的 [resetScore](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoCopyrightedMusic#reset-score) 和 [startScore](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoCopyrightedMusic#start-score-pitch-value-interval) 接口开启打分。

设置 [歌词组件](/online-ktv-ios/zego-content-center/lyrics-display-component) 的换行监听，在换行回调中判断当前播放进度时间是否大于音高线开始的时间，如果大于则添加分数。上一行分数可以通过 SDK 的 [getPreviousScore](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoCopyrightedMusic#get-previous-score) 接口获取。

```objc
// 播放器状态变化回调
- (void)mediaPlayer:(ZegoMediaPlayer *)mediaPlayer stateUpdate:(ZegoMediaPlayerState)state errorCode:(int)errorCode {
    if (state == ZegoMediaPlayerStatePlaying) {
        // 重置分数
        [self.copyrightedMusic resetScore:self.resourceID];
        // 开启评分，设置回调间隔为 60 ms
        [self.copyrightedMusic startScore:self.resourceID pitchValueInterval:60];
    } 
}

// 歌词换行回调
- (void)lyricView:(ZegoLyricView *)lyricView didFinishLineWithModel:(ZegoLyricLineModel *)lineModel lineIndex:(NSInteger)index {
    // 只有在有可唱歌词的时候才开始获取分数
    if (self.currentProgress > [self.pitchView getPitchStartTime]) {
        // 获取上一行歌词结束时的分数
        int prevScore = [self.copyrightedMusic getPreviousScore:resourceID];
        // 添加分数并展示
        [self.pitchView addScore:prevScore]
    }
}
```
