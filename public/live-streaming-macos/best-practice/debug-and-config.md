# 调试与配置

- - -

## 功能简介

开发者在集成 SDK 时会遇到一些错误，SDK 会输出相关错误日志，开发者可以根据需要，配置日志输出路径和单个日志文件大小。

除此之外，SDK 支持调用接口查看当前版本。

## 示例源码下载

请参考 [下载示例源码](https://doc-zh.zego.im/article/21224) 获取源码。

相关源码请查看 “/ZegoExpressExample/Examples/Debug&Config” 目录下的文件。

## 前提条件

在使用日志相关功能之前，请确保：

- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppID 和 AppSign，详情请参考 [控制台 - 项目信息](/console/project-info)。
- 已在项目中集成 ZEGO Express SDK，并实现了基本的音视频推拉流功能，详情请参考 [快速开始 - 集成](https://doc-zh.zego.im/article/21225) 和 [快速开始 - 实现流程](https://doc-zh.zego.im/article/21272)。


## 使用步骤

### 1 设置日志属性

在创建引擎前，可通过调用 [setLogConfig](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_macos~class~ZegoExpressEngine#set-log-config) 设置日志属性。

以设置日志存储路径为 “[[NSSearchPathForDirectoriesInDomains(NSCachesDirectory, NSUserDomainMask, YES) lastObject] stringByAppendingString:@"/ZegoLogs"]”，单个日志文件大小上限为 5 MB 为例：

```objc
NSString *appLogPath = [[NSSearchPathForDirectoriesInDomains(NSCachesDirectory, NSUserDomainMask, YES) lastObject] stringByAppendingString:@"/ZegoLogs"];
ZegoLogConfig *logConfig = [[ZegoLogConfig alloc] init];
logConfig.logPath = appLogPath;
// 5 MB
logConfig.logSize = 5 * 1024 * 1024;
[ZegoExpressEngine setLogConfig:logConfig];
```


其中，[ZegoLogConfig](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_macos~class~ZegoLogConfig) 包含了日志相关设置（保存路径和文件大小上限），具体定义如下：

```objc
@interface ZegoLogConfig : NSObject

// 日志文件的存储路径。默认路径是[NSCachesDirectory]/ZegoLogs/
@property (nonatomic, copy) NSString *logPath;

// 日志文件的最大大小（Bytes）默认最大大小为 5 MB
@property (nonatomic, assign) unsigned long long logSize;

@end
```

### 2 创建引擎

定义 SDK 引擎对象，调用 [createEngineWithProfile](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_macos~class~ZegoExpressEngine#create-engine-with-profile-event-handler) 接口，将申请到的 AppID 和 AppSign 传入参数 “appID” 和 “appSign”，创建引擎单例对象。

如果需要注册回调代理，可将声明了 [ZegoEventHandler](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_macos~protocol~ZegoEventHandler) 的对象传入参数 “eventHandler”。如果不需要注册回调代理，可将 “nil” 传入参数 “eventHandler”，创建引擎后仍需要注册回调时可通过调用 [setEventHandler](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_macos~class~ZegoExpressEngine#set-event-handler) 接口设置回调代理。


```objc
ZegoEngineProfile *profile = [ZegoEngineProfile new];
// 请通过官网注册获取，格式为：1234567890
profile.appID = appID;
// 请通过官网注册获取，格式为：@"0123456789012345678901234567890123456789012345678901234567890123"（共64个字符）
profile.appSign = appSign;
// 通用场景接入
profile.scenario = ZegoScenarioDefault;
// 创建引擎，并注册 self 为 eventHandler 回调。不需要注册回调的话，eventHandler 参数可以传 nil，后续可调用 "-setEventHandler:" 方法设置回调
[ZegoExpressEngine createEngineWithProfile:profile eventHandler:self];
```

### 3（可选）开启调试助手

建议在开发调试阶段调用 [enableDebugAssistant](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_macos~class~ZegoExpressEngine#enable-debug-assistant) 接口开启 SDK 的调试助手功能，当后续调用其他 SDK 的接口时，既能输出日志到控制台，同时在接口调用出错时还会弹窗提醒，方便开发者第一时间发现问题并及时修正。

<Warning title="注意">



当开发完成，即将上线 App 前，请务必关闭此功能，以避免在线上环境发生潜藏错误时弹出 UI 弹窗。
</Warning>

```objc
[[ZegoExpressEngine sharedEngine] enableDebugAssistant:YES];
```

### 4 获取 SDK 版本号

调用 [getVersion](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_macos~class~ZegoExpressEngine#get-version) 可获得 SDK 版本号。开发者可将 SDK 版本号信息作为 App 所使用的 Engine 的版本信息，以便统计线上各版本 App 对应的各版本 SDK。

<Note title="说明">


SDK 在运行过程中，当开发者发现与预期情况不符时，可将问题与相关日志提交给 ZEGO 技术支持定位，ZEGO 技术支持可能需要 Engine 的版本的信息来辅助定位问题。
</Note>

```objc
[ZegoExpressEngine getVersion];
```

## 相关文档

[如何设置和获取 SDK 的日志、堆栈信息？](https://doc-zh.zego.im/faq/express_sdkLog)

<Content />

