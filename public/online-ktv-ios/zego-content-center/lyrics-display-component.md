# 歌词组件

---

## 功能简介


ZEGO 歌词 UI 组件（ZegoLyricView）支持在歌曲播放的同时同步显示 KRC（逐字）格式的歌词。本文将介绍如何在项目中集成并使用 ZEGO 歌词 UI 组件。

- 歌曲播放时，根据当前播放进度显示对应的歌词。
- 自定义歌词界面。

<Frame width="512" height="auto" ><img src="https://doc-media.zego.im/sdk-doc/Pics/GoEnjoy/online_KTV/demo/ZegoLyricView.png" /></Frame>


## 组件核心类文件介绍

### ZegoLyricView

该类是一个继承于 UITableView 的组件，用于接收歌词数据展示以及 UI 交互。    

相关接口：

```objc
/** 
 * 初始化方法
 * @param frame 位置大小
 * @param style 列表样式
 * @param config 歌词配置
 */
- (instancetype)initWithFrame:(CGRect)frame style:(UITableViewStyle)style config:(ZegoLyricViewConfig *)config;

/** 
 * 设置原曲/伴奏的歌词数据
 * @param model 原曲/伴奏的完整歌词数据模型
 */
- (void)setupMusicDataSource:(ZegoLyricModel *)model;

/**
 * 设置歌词数据，根据传入的时间区域过滤
 * 此接口主要应用于音乐资源为高潮片段的场景
 * 由于调用 requestResource 接口请求高潮片段后会返回的 krc_token，调用 getKrcLyricByToken 
 * 后传入此 krc_token，获取的是整首歌的歌词，而非仅高潮片段对应的歌词，因此需要对原歌词进行裁剪 
 * @param model 歌曲的完整歌词数据模型
 * @param beginTime 歌词开始时间，单位为毫秒，推荐与调用 requestResource 接口请求高潮片段
 *                  后返回的 segment_begin + prelude_duration 后计算的值相同
 * @param endTime 歌词结束时间，单位为毫秒，推荐与调用 requestResource 接口请求高潮片段
 *                后返回的 segment_end 的值保持一致
 */
- (void)setupMusicDataSource:(ZegoLyricModel * _Nullable)model
                   beginTime:(NSInteger)beginTime
                     endTime:(NSInteger)endTime;

/**
 * 设置播放器进度, 展示对应歌词
 * 用于原唱或伴奏类型资源
 * @param progress 播放器进度，单位毫秒(ms)
 */
- (void)setProgress:(NSInteger)progress;

/**
 * 设置播放器进度, 展示对应歌词
 * 仅用于高潮片段类型资源
 * @param progress 播放器进度，单位为毫秒(ms)
 * @param segBeginTime 高潮片段开始时间（该字段在请求高潮片段资源时返回）
 * @param krcFormatOffset krc 歌词与歌曲的偏移时间量（该字段在请求逐字歌词时返回）
 */
- (void)setAccompanimentClipProgress:(NSInteger)progress 
                        segBeginTime:(NSInteger)segBeginTime 
                     krcFormatOffset:(NSInteger)krcFormatOffset;
```

ZegoLyricView.h 文件还包含了 ZegoLyricViewProtocol 协议，用于向外界通知关键事件。

```objc
@protocol ZegoLyricViewProtocol <NSObject>

/** 
 * 歌曲播放完一行歌词回调
 * @param lyricView self
 * @param lineModel 行信息
 * @param index 行数
 */
- (void)lyricView:(ZegoLyricView *)lyricView didFinishLineWithModel:(ZegoLyricLineModel *)lineModel lineIndex:(NSInteger)index;

@end
```

### ZegoLyricViewConfig

该类是一个歌词 UI 组件配置类，可设置歌词播放时文字的高亮颜色以及字体大小。   

相关接口：

```objc
/** 文字播放的高亮颜色 */
@property (nonatomic,strong)UIColor *playingColor;

/** 未播放时的默认颜色 */
@property (nonatomic,strong)UIColor *nomalColor;

/** 播放时的字体大小 */
@property (nonatomic,strong)UIFont *playingFont;
```

### 数据类文件

- ZegoLyricModel：整首歌的 model，包含每一行 model 的集合。
- ZegoLyricLineModel：一行歌词的 model 信息，包含每一个字的集合。
- ZegoLyricWordModel：单个字的信息，包含这个字的开始播放时间、播放持续时长等。

## 前提条件

在集成歌词 UI 组件之前，请确保：

已在项目中集成 ZEGO Express SDK（含版权音乐功能），实现基本的点歌和歌曲播放相关功能，详情请参考 [点歌（获取和分享歌曲）](/online-ktv-ios/zego-content-center/sing-songs)。

## 组件接入方式

获取完整源码，请参考 [下载](/online-ktv-ios/downloads)。

以下主要介绍歌词 UI 组件接入的步骤和部分代码示例。

### 引入 ZegoLyricView 组件

解压组件压缩包，拷贝 **ZegoLyricView** 文件夹至项目中。

### 初始化 ZegoLyricView 组件并添加到视图上

在项目中，初始化 ZegoLyricView 组件并添加到界面视图上。

```objc
#import "ZegoLyricView.h"

/** 初始化歌词 UI 组件配置 */
ZegoLyricViewConfig *config = [ZegoLyricViewConfig new];
config.playingFont = [UIFont systemFontOfSize:20 weight:UIFontWeightMedium];
config.playingColor = [UIColor redColor];
config.nomalColor = [UIColor whiteColor];

/** 初始化歌词 UI 组件并添加到视图上 */
ZegoLyricView *lyricByWordView = [[ZegoLyricView alloc]initWithFrame:self.view.bounds style:UITableViewStyleGrouped config:config];
lyricByWordView.separatorStyle = UITableViewCellSeparatorStyleNone;
lyricByWordView.backgroundColor = [UIColor whiteColor];
lyricByWordView.userInteractionEnabled = NO;
lyricTableView.rowHeight = 30.f;
lyricByWordView.tableFooterView = [[UIView alloc] init];
[self.view addSubview:self.lyricByWordView];
```

### 获取歌词

获取歌词数据需要调用 [getKrcLyricByToken](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoCopyrightedMusic#get-krc-lyric-by-token-callback) 接口，拉取到数据后转为 ZegoLyricModel 模型，再调用 ZegoLyricView 的 `setupMusicDataSource:` 接口设置歌词数据源。

```objc
ZegoLyricView *lyricTableView;
__weak typeof(self) weakSelf = self;

/** 获取歌词数据 */
[self.copyrightedMusic getKrcLyricByToken:token callback:^(int errorCode, NSString * _Nonnull lyrics) {
    if (errorCode == 0) {
      ZegoLyricModel *model = [ZegoLyricModel analyticalLyricData:lyrics];
      // 设置歌词 UI 组件数据源
      [weakSelf.lyricTableView setupMusicDataSource:model];
    } 
  }];
```


### 同步更新歌词进度

#### 房主/歌唱者

通过获取播放器的进度回调来更新歌词进度展示。针对不同的音乐资源类型，房主/歌唱者在同步更新歌词进度时需要区别处理。

##### 原唱或者伴奏资源

原唱资源，指的是调用 Express SDK [requestResource](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoCopyrightedMusic#request-resource-type-callback) 接口，传入 ZegoCopyrightedMusicResourceSong 音乐资源类型请求的资源。

伴奏资源，指的是调用 Express SDK [requestResource](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoCopyrightedMusic#request-resource-type-callback) 接口，传入 ZegoCopyrightedMusicResourceAccompaniment 音乐资源类型请求的资源。

<Warning title="注意">

由于原唱资源只有逐行歌词，如果您需要展示逐字歌词，请使用伴奏资源。
</Warning>

原唱或者伴奏资源同步歌词进度示例代码如下所示：

```objc
/** 主播端播放器更新回调 */
- (void)mediaPlayer:(ZegoMediaPlayer *)mediaPlayer playingProgress:(unsigned long long)millisecond {
    // 更新当前播放器的时间，歌词 UI 组件会自动更新到指定位置并高亮
    [lyricView setProgress:millisecond];
}
```

##### 高潮片段资源

伴奏资源，指的是调用 Express SDK [requestResource](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoCopyrightedMusic#request-resource-type-callback) 接口，传入 ZegoCopyrightedMusicResourceAccompanimentClip 音乐资源类型请求的资源。

高潮片段资源同步歌词进度示例代码如下所示：

```objc
/** 主播端播放器更新回调 */
- (void)mediaPlayer:(ZegoMediaPlayer *)mediaPlayer playingProgress:(unsigned long long)millisecond {
    // 更新当前播放器的时间，歌词 UI 组件会自动更新到指定位置并高亮
    // 由于音乐资源为高潮片段，所以调用 setAccompanimentClipProgress:segBeginTime:krcFormatOffset: 方法
    //
    // @param millisecond 当前播放器进度
    // @param segBeginTime 高潮片段开始时间（该字段在请求高潮片段资源时返回）
    // @param krcFormatOffset krc 格式歌词（逐字歌词）对歌曲的偏移量 （该字段在获取逐字歌词时返回）
    [lyricView setAccompanimentClipProgress:millisecond 
                               segBeginTime:segBeginTime 
                            krcFormatOffset:krcFormatOffset];
}
```


#### 观众 

房主端通过 [sendSEI](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoExpressEngine#send-sei) 发送 SEI 后，观众端可以监听 [onPlayerRecvSEI](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~protocol~ZegoEventHandler#on-player-sync-recv-sei-stream-id) 回调接收 SEI 来获取歌词的进度。此处仅展示音乐资源为原唱/伴奏资源，歌词更新到指定位置的情况。高潮片段资源的歌词同步实现流程请参考上文[高潮片段资源](#高潮片段资源)。

```objc
- (void)onPlayerRecvSEI:(NSData *)data streamID:(NSString *)streamID {
    NSError *error = nil;
    NSDictionary *dictionary = [NSJSONSerialization JSONObjectWithData:data options:NSJSONReadingMutableContainers error:&error];
    if (dictionary == nil) { return; }
    long long progress = [[dictionary safeObjectForKey:@"kProgressKey"]longLongValue];
   	NSNumber *total = [dictionary safeObjectForKey:@"kTotalKey"];
    NSString *songID = [dictionary safeObjectForKey:@"kSongID"];
    // 更新歌词展示位置
    [lyricView setProgress:millisecond];
}
```
