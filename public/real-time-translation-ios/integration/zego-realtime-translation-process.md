# 实现实时传译

- - -

## 简介

本文介绍如何实现实时传译的功能，包括与 Express 的接口对接，主播与观众之间的通信方式。


## 前提条件

在实现实时传译功能之前，请确保：

- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppID 和 AppSign，详情请参考 [控制台 - 项目管理 - 项目信息](/console/project-info)。
- 已在项目中集成 ZEGO Express SDK，实现基本的实时音视频功能，详情请参考 [实时音视频 - 快速开始 - 集成 SDK](/real-time-video-ios-oc/quick-start/integrating-sdk)。
- 已在项目中集成 ZegoRealtimeTranslation SDK，详情请参考 [集成 SDK](https://doc-zh.zego.im/article/16657) 文档。
- 已开通相关权限，并获取到实时传译的 License。

    - 谷歌：参考 [控制台 - 云市场 - 实时传译（谷歌）](/console/cloud-market/real-time-translation/google)，按照页面指引，自助开通相关权限。
    - 科大讯飞：联系 ZEGO 商务人员开通服务权限。

## 示例源码

ZEGO 提供了 [示例源码](https://doc-zh.zego.im/article/16655)，以供开发者进一步了解 ZEGO 实时传译功能。

## 流程图

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/ZegoRealtimeTranslation/ZegoRealtimeTranslation_Sequence_diagram.png" /></Frame>

## 实现流程

请您根据自己的业务需要，选择实现相关的内容识别传译功能。

<Accordion title="实时语音识别" defaultOpen="false">
#### 1 初始化 Express SDK

1. 创建界面。根据场景需要，为您的项目展示实时传译的用户界面，推荐您在项目中添加如下元素：

    - 主播的视频窗口
    - 语音识别结果的窗口
    - 识别结果翻译后的窗口
    - 设置项(服务商，语言等)

2. 在项目中引入 ZEGO Express 头文件。

    ```objectivec
    // 引入 ZegoExpressEngine.h 头文件
    #import <ZegoExpressEngine/ZegoExpressEngine.h>
    ```

3. 创建引擎。调用 ZEGO Express SDK 的 [createEngineWithProfile](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoExpressEngine#create-engine-with-profile-event-handler) 接口，将申请到的 AppID 和 AppSign 分别传入参数“appID”和“appSign”，创建引擎单例对象。注册回调，可将实现了 ZegoEventHandler 的对象（例如 “self”）传入参数 “eventHandler”。

    ```objectivec
    // 创建引擎
    - (void)createEngine {
        ZegoEngineProfile *profile = [[ZegoEngineProfile alloc] init];
        // 请通过官网注册获取，格式为：1234567890
        profile.appID = <#appID#>;
        // 请通过官网注册获取，格式为：@"0123456789012345678901234567890123456789012345678901234567890123"（共64个字符）
        profile.appSign = <#appSign#>;
        // 指定使用直播场景 (请根据实际情况填写适合你业务的场景)
        profile.scenario = ZegoScenarioDefault;
        // 创建引擎，并注册 self 为 eventHandler 回调。不需要注册回调的话，eventHandler 参数可以传 nil，后续可调用 "-setEventHandler:" 方法设置回调
        [ZegoExpressEngine createEngineWithProfile:profile eventHandler:self];
    }
    ```

#### 2 登录房间

调用 [loginRoom](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoExpressEngine#login-room-user) 接口登录房间。如果房间不存在，调用该接口时会创建并登录此房间。roomID 和 user 的参数由您本地生成，但是需要满足以下条件：

- 同一个 AppID 内，需保证 “roomID” 全局唯一。
- 同一个 AppID 内，需保证 “userID” 全局唯一，建议开发者将 “userID” 与自己业务的账号系统进行关联。

```objectivec
// 登录房间
// 创建用户对象，ZegoUser 的构造方法 initWithUserID “userID” 与 “userName” 不能为 “nil”，否则会导致登录房间失败。
// userID 由您本地生成,需保证 “userID” 全局唯一。
ZegoUser *user = [[ZegoUser alloc] initWithUserID:userID userName:userName];
// 只有传入 “isUserStatusNotify” 参数取值为 “YES” 的 ZegoRoomConfig，才能收到 onRoomUserUpdate 回调。
ZegoRoomConfig *config = [[ZegoRoomConfig alloc] init];
config.isUserStatusNotify = YES;
// 登录房间
[self.engine loginRoom:roomId user:user config:config callback:^(int errorCode, NSDictionary * _Nonnull extendedData) {
    if (callback) {
        callback(errorCode, extendedData);
    }
}];
```


<a name="step3"></a>

#### 3 初始化 ZegoRealtimeTranslation SDK

1. 导入 ZegoRealtimeTranslation SDK 的头文件。

    ```objectivec
    #import <ZegoRealtimeTranslation/ZegoRealtimeTranslation.h>
    ```

2. 在使用 ZegoRealtimeTranslation SDK 功能前，必须先进行初始化。

    ```objectivec
    self.realtimeTranslation = [ZegoRealtimeTranslation getInstance];
    int ret = [self.realtimeTranslation init:license];
    if (ret != ZegoRealtimeTranslationErrorSuccess) {
        // 初始化错误处理
    }
    // 设置事件处理的代理
    [self.realtimeTranslation setRealtimeTranslationHandler:self];
    ```

#### 4 开始推流

登录房间后如果是主播需要开始推流，设置声音采集的参数。同时设置声音采集的回调接口，把声音数据传给 ZegoRealtimeTranslation SDK。

```objectivec
// 开始推流
[self.engine startPublishingStream:streamID];
ZegoAudioFrameParam *audioFrameParam = [[ZegoAudioFrameParam alloc] init];
// 设置采集声音的参数，必须sampleRate是16k，单声道格式
audioFrameParam.sampleRate = ZegoAudioSampleRate16K;
audioFrameParam.channel = ZegoAudioChannelMono;
[self.engine startAudioDataObserver:ZegoAudioDataCallbackBitMaskCaptured param:audioFrameParam];
```
在 [ZegoAudioDataHandler](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~protocol~ZegoAudioDataHandler) 的回调方法 [onCapturedAudioData](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~protocol~ZegoAudioDataHandler#on-captured-audio-data-data-length-param) 中，获取到的原始音频数据，发送给实时传译 SDK。

``` Objective-C
- (void)onCapturedAudioData:(const unsigned char *)data dataLength:(unsigned int)dataLength {
    NSData *sendData = [NSData dataWithBytes:data length:dataLength];
    [[ZegoRealtimeTranslation getInstance] sendSpeechPCM:sendData];
}
```

#### 5 拉流

主播和观众都需要拉流，当有流新增时，进行拉流操作。

```objectivec
- (void)onRoomStreamUpdate:(ZegoUpdateType)updateType streamList:(NSArray<ZegoStream *> *)streamList extendedData:(NSDictionary *)extendedData roomID:(NSString *)roomID {
    ...
    if (updateType == ZegoUpdateTypeAdd) {
        ZegoCanvas *canvas = [[ZegoCanvas alloc] initWithView:self.previewView];
        canvas.viewMode = ZegoViewModeAspectFill;
        [[ZegoExpressEngine sharedEngine] startPlayingStream:stream.streamID canvas:canvas];
    }
}
```

#### 6 解析 SEI 信息

SEI 通道用来传识别和翻译后的文本，此处可以自己定义规则，
Demo 使用的规制是：<br />
`zegoa2ti:{\"username\":\"小明\", \"text\":\"今天天气不错\", \"trans\":\"It's a nice day today\"}`

- "zegoa2ti:" 开头的 SEI 信息表示传入的是识别中的文本。
- "zegoa2td:" 开头的 SEI 信息表示传入的是识别确认最终的文本。
- 后面的内容是个 json 格式的字符串，包括用户名，文本和翻译的内容。

定义两个字符串常量来表示：

```objectivec
static NSString * const SUBTITLE_RECOGNIZING_TEXT_PREFIX = @"zegoa2ti:";
static NSString * const SUBTITLE_RECOGNIZED_TEXT_PREFIX = @"zegoa2td:";
```

```objectivec
// zegoEventHandler 对应创建引擎时传的参数
- (void)onPlayerRecvSEI:(NSData *)data streamID:(NSString *)streamID {
   NSString *str = [[NSString alloc] initWithData:data encoding:NSUTF8StringEncoding];
    if ([str hasPrefix:SUBTITLE_RECOGNIZING_TEXT_PREFIX]) {
        NSString *content = [str substringFromIndex:SUBTITLE_RECOGNIZING_TEXT_PREFIX.length];
        // 需要导入头文件 #import <MJExtension/MJExtension.h> 以实现 json 字符串转模型
        RecognizedModel *recogizedModel = [RecognizedModel mj_objectWithKeyValues:content];
        // 可以在屏幕上显示语言识别动态变化的文本以及其对应的翻译结果。

    } else if ([str hasPrefix:SUBTITLE_RECOGNIZED_TEXT_PREFIX]) {
        NSString *content = [str substringFromIndex:SUBTITLE_RECOGNIZED_TEXT_PREFIX.length];
        // 需要导入头文件 #import <MJExtension/MJExtension.h> 以实现 json 字符串转模型
        RecognizedModel *recogizedModel = [RecognizedModel mj_objectWithKeyValues:content];
        // 可以在屏幕上显示语言识别出来的最终的文本以及其对应的翻译结果，以替换掉识别中的文本和翻译结果。
    }
}
```

定义的 SEI 数据解析模型。

```objectivec
@interface RecognizedModel : NSObject
// 语音识别出来的文本
@property (nonatomic, copy) NSString *text;
// 用户昵称
@property (nonatomic, copy) NSString *username;
// 翻译的结果
@property (nonatomic, copy) NSString *trans;

@end
```

#### 7 设置实时传译的参数并开启服务

1. 开启实时传译。开启实时传译前需要设置参数，包括服务提供商，源语言和目标语言。

```objectivec
// 设置语音识别的第三方服务供应商
self.realtimeTranslation.speechToTextService = ZegoRTServiceProviderIflytek;
// 设置文本翻译的第三方服务供应商
self.realtimeTranslation.textTranslationService = ZegoRTServiceProviderIflytek;
// 设置语音识别的源语言
self.realtimeTranslation.sourceSpeechLanguage = ZegoSpeechLanguageZH_CN;
// 设置文本翻译的目标语言
self.realtimeTranslation.targetTranslationLanguage = ZegoTranslationLanguageEN;
// 是否开启文本翻译，开启后可以将识别出来的内容进行翻译
self.realtimeTranslation.enableTranslate = YES;
// 是否开发识别中间结果翻译，开启后将会对识别中的不稳定的结果进行翻译，比较高频
self.realtimeTranslation.enableIntermediaTranslate = YES;

// 开启实时传译服务
int ret = [self.realtimeTranslation startRealtimeTranslation];
if (ret != ZegoRealtimeTranslationErrorSuccess) {
    // 开启失败的出错处理
}
```

2. 识别结果回调。

```objectivec
@protocol IZegoRealtimeTranslationHandler <NSObject>
/// 当有识别出来的中间结果的文本时，通过此接口来通知
/// - Parameters:
///   - sttText: 语音识别的文本
- (void)onRecognizingText:(NSString * _Nullable)sttText;

/// 当有识别出来的最终结果的文本时，通过此接口来通知
/// - Parameters:
///   - sttText: 语音识别的文本
- (void)onRecognizedText:(NSString * _Nullable)sttText;
/// 当有识别出来的中间结果的文本翻译出结果后，通过此接口来通知
/// - Parameter translatedText: 语音识别的文本翻译后的结果文本
- (void)onRecognizingTranslatedText:(NSString *)translatedText;
/// 当有识别出来的最终文本翻译出结果后，通过此接口来通知
/// - Parameter translatedText: 语音实时识别出来的最终文本翻译后的结果文本
- (void)onRecognizedTranslatedText:(NSString *)translatedText;
/// 错误回调
/// - Parameter error: 错误码
- (void)onError:(int)errorCode;
@end
```

可以在上述回调中将识别中的结果文本和最终的结果文本，通过 SEI 发送给接收方。

下面是识别中的文本通过 SEI 发送使用示例，其它类似：

```objectivec
- (void)onRecognizingText:(NSString *)sttText {
    RecognizedModel *recognizedModel = [RecognizedModel new];
    recognizedModel.username = <#username#>;  // 填写自己的昵称
    recognizedModel.text = sttText;
    // 需要导入头文件 #import <MJExtension/MJExtension.h> 以模型转 json 字符串
    NSString *jsonStr = [recognizedModel mj_JSONString];
    NSString *content = [SUBTITLE_RECOGNIZING_TEXT_PREFIX stringByAppendingString:jsonStr];
    [[ZegoExpressEngine sharedEngine] sendSEI:[content dataUsingEncoding:NSUTF8StringEncoding]];
}
```

3. 停止实时传译。

```objectivec
[self.realtimeTranslation stopRealtimeTranslation];
```

<a name="step8"></a>

#### 8 资源回收

1. 反初始化 ZegoRealtimeTranslation SDK。

```objectivec
[self.realtimeTranslation unInit];
```
如果没有手动调用停止实时传译接口，上面方法内部会调用 stopRealtimeTranslation 方法停止实时传译。

2. 停止推流。

```objectivec
[[ZegoExpressEngine sharedEngine] stopPublishingStream];
[[ZegoExpressEngine sharedEngine] stopAudioDataObserver];
```

3. 退出房间。调用 ZEGO Express SDK 的 [logoutRoom](https://doc-zh.zego.im/article/api?doc=express-video-sdk_API~objectivec_ios~class~ZegoExpressEngine#logout-room) 接口，退出房间。

```objectivec
[[ZegoExpressEngine sharedEngine] logoutRoom];
```

4. 销毁引擎。如果退出房间，不需要使用到引擎资源，可以调用 ZEGO Express SDK 的 [destroyEngine](https://doc-zh.zego.im/article/api?doc=express-video-sdk_API~objectivec_ios~class~ZegoExpressEngine#destroy-engine) 接口，销毁引擎。

```objectivec
[ZegoExpressEngine destroyEngine:^{
}];
```
</Accordion>

<Accordion title="文本翻译识别" defaultOpen="false">
#### 1 初始化 ZegoRealtimeTranslation SDK

1. 导入 ZegoRealtimeTranslation SDK 的头文件。

    ```objectivec
    #import <ZegoRealtimeTranslation/ZegoRealtimeTranslation.h>
    ```

2. 在使用 ZegoRealtimeTranslation SDK 功能前，必须先进行初始化。

    ```objectivec
    self.realtimeTranslation = [ZegoRealtimeTranslation getInstance];
    int ret = [self.realtimeTranslation init:license];
    if (ret != ZegoRealtimeTranslationErrorSuccess) {
        // 初始化错误处理
    }
    // 设置事件处理的代理
    [self.realtimeTranslation setRealtimeTranslationHandler:self];
    ```

#### 2 纯文本翻译

主持人登录房间并且播放器设置完成后，可以调用 ZegoRealtimeTranslation SDK 的 [translate](https://doc-zh.zego.im/article/api?doc=ZegoRealtimeTranslation_API~objective-c_ios~class~ZegoRealtimeTranslation#translate-text-service-provider-from-language-to-language-callback) 方法。

```objectivec
[self.realtimeTranslation translate:inputText service:ZegoThirdPartyServiceProviderIfly fromLanguage:ZegoTranslationLanguageZH_HANS toLanguage:ZegoTranslationLanguageEN callback:^(int errorCode, NSString * _Nullable resultText) {

    if (errorCode != 0) {
        // 翻译出错处理
    } else {
        // 展示翻译的结果
    }
}];
```

#### 3 资源回收

1. 反初始化 ZegoRealtimeTranslation SDK。

```objectivec
[self.realtimeTranslation unInit];
```
如果没有手动调用停止实时传译接口，上面方法内部会调用 stopRealtimeTranslation 方法停止实时传译。

2. 停止推流。

```objectivec
[[ZegoExpressEngine sharedEngine] stopPublishingStream];
[[ZegoExpressEngine sharedEngine] stopAudioDataObserver];
```

3. 退出房间。调用 ZEGO Express SDK 的 [logoutRoom](https://doc-zh.zego.im/article/api?doc=express-video-sdk_API~objectivec_ios~class~ZegoExpressEngine#logout-room) 接口，退出房间。

```objectivec
[[ZegoExpressEngine sharedEngine] logoutRoom];
```

4. 销毁引擎。如果退出房间，不需要使用到引擎资源，可以调用 ZEGO Express SDK 的 [destroyEngine](https://doc-zh.zego.im/article/api?doc=express-video-sdk_API~objectivec_ios~class~ZegoExpressEngine#destroy-engine) 接口，销毁引擎。

```objectivec
[ZegoExpressEngine destroyEngine:^{
}];
```
</Accordion>
