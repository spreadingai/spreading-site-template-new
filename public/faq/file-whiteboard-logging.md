<Title>如何设置文件/白板的日志？</Title>



- - -

## 问题描述
 文件共享 SDK 和互动白板 SDK 默认会把日志保存到哪里？为什么通过 ZEGO 音视频 SDK 的日志上传功能上报日志，上报日志信息里查询不到互动白板 SDK 和 文件转码 SDK 的日志信息。


## 问题原因

音视频 SDK 的日志上报功能只上传 音视频 SDK 设置的日志路径下的日志文件。客户设置的互动白板日志路径和文件转码路径 和 音视频 SDK 日志路径不同，会导致上报的日志缺失。

## 解决方案
为了让用户更方便的使用 文件共享 SDK 和互动白板 SDK，如果初始化 SDK 时未指定日志路径，则会使用默认的地址做为日志写入的路径（文件共享 SDK 和互动白板 SDK 的默认日志存放路径相同）。

iOS 默认日志路径
```objc
[NSHomeDirectory() stringByAppendingPathComponent:@"Documents/ZegoLogFile"]
```

Android 默认日志路径
```java
/sdcard/Android/data/你的应用package名称/files/zegologs
```

- 如果您的互动白板 SDK 和文件转码 SDK 的版本号都大于等于 1.21.0 ，SDK 会默认设置日志的存放路径，开发者无需再手动设置一遍。开发者调用音视频 SDK 的 "uploadLog" 接口上报日志后，音视频 SDK 会根据互动白板和文件转码默认的日志路径上传日志。

- 如果您的互动白板 SDK 和文件转码 SDK 的版本号都小于 1.21.0，则可参照以下代码将互动白板 SDK、文件转码 SDK、音视频 SDK 的日志存放路径设置为一致。

iOS 示例：
```objc
NSString *appLogPath = [[NSSearchPathForDirectoriesInDomains(NSCachesDirectory, NSUserDomainMask, YES) lastObject] stringByAppendingString:@"/ZegoLogs"];
// 设置音视频 SDK 日志存放路径
ZegoLogConfig *logConfig = [[ZegoLogConfig alloc] init];
logConfig.logPath = appLogPath;
[ZegoExpressEngine setLogConfig:logConfig];

// 设置互动白板 SDK 日志存放路径
ZegoWhiteboardConfig *configw = [ZegoWhiteboardConfig new];
configw.logPath = appLogPath;
[[ZegoWhiteboardManager sharedInstance] setConfig:configw];

// 设置文件共享 SDK 日志存放路径
ZegoDocsViewConfig * docsViewConfig = [ZegoDocsViewConfig new];
docsViewConfig.logFolder = appLogPath;
//...设置 appid 等信息
//...
//...
[[ZegoDocsViewManager sharedInstance] initWithConfig:docsViewConfig completionBlock:^(ZegoDocsViewError errorCode) {

}];
```

Android 示例：
```java
String logPath = getApplicationContext().getFilesDir().getAbsolutePath() + File.separator + "zegologs";

// 设置音视频 SDK 日志存放路径
ZegoLogConfig logConfig = new ZegoLogConfig();
logConfig.setLogPath(logPath);
ZegoExpressEngine.getEngine().setLogConfig(logConfig);

// 设置互动白板 SDK 日志存放路径
ZegoWhiteboardConfig whiteboardConfig = new ZegoWhiteboardConfig();
whiteboardConfig.setLogPath(logPath);
ZegoWhiteboardManager.getInstance().setConfig(whiteboardConfig);

// 设置文件共享 SDK 日志存放路径
ZegoDocsViewConfig docsViewConfig = new ZegoDocsViewConfig();
docsViewConfig.setLogFolder(logFolder);
//... 设置 appid 等信息
//...
//...

ZegoDocsViewManager.getInstance().init(docsViewConfig, new IZegoDocsViewInitListener() {
    @Override
    public void onInit(int errorCode) {

    }
});
```


## 相关链接
1. [互动白板 SDK 配置|\_blank](https://doc-zh.zego.im/article/api?doc=WhiteBoardView_API~java~class~ZegoWhiteboardConfig&jumpType=route#log-path)
2. [文件共享 SDK 配置|\_blank](https://doc-zh.zego.im/article/api?doc=docsview_API~java~class~ZegoDocsViewConfig#log-folder)
