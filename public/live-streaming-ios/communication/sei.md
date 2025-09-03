# 媒体补充增强信息（SEI）

- - -

## 功能简介

在音视频流媒体应用中，除了可以流媒体通道推拉音视频内容外，还可以使用流 SEI（Supplemental Enhancement Information，媒体补充增强信息）通过流媒体通道将文本信息与音视频内容打包在一起，从主播端（推流端）推出，并从观众端（拉流端）接收，以此实现文本数据与音视频内容的精准同步的目的。

一般可用于视频画面的精准布局、远端歌词同步、直播答题等应用场景。


<Note title="说明">



SEI 的相关概念及原理请参考 [如何理解和使用 SEI（媒体补充增强信息）](https://doc-zh.zego.im/faq/sei)。
</Note>


## 示例源码下载

请参考 [下载示例源码](https://doc-zh.zego.im/article/13411) 获取源码。

相关源码请查看 “/ZegoExpressExample/Examples/Others/SupplementalEnhancementInformation” 目录下的文件。


## 前提条件

在实现 SEI 功能之前，请确保：

- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppID 和 AppSign，详情请参考 [控制台 - 项目信息](/console/project-info)。
- 已在项目中集成 ZEGO Express SDK，并实现了基本的音视频推拉流功能，详情请参考 [快速开始 - 集成](https://doc-zh.zego.im/article/13413) 和 [快速开始 - 实现流程](https://doc-zh.zego.im/article/13415)。



## 使用步骤

发送与接收 SEI 信息功能，需要在推流端发送 SEI 信息，在拉流端接收 SEI 信息，如下图所示：

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Common/ZegoExpressEngine/send_and_recv_sei_iOS_new.png" /></Frame>

推流端：

1. 调用 [createEngineWithProfile](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoExpressEngine#create-engine-with-profile-event-handler) 接口创建 engine 对象。

2. 调用 [loginRoom](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoExpressEngine#login-room-user) 接口登录房间。

3. 调用 [startPublishingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoExpressEngine#start-publishing-stream) 接口推流。

4. 在推流成功后，调用 [sendSEI](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoExpressEngine#send-sei) 接口发送 SEI 信息。

拉流端：

1. 调用 [createEngineWithProfile](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoExpressEngine#create-engine-with-profile-event-handler) 接口创建 engine 对象。

2. 创建 [ZegoEventHandler](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~protocol~ZegoEventHandler) 对象，并重写接收 SEI 信息的 [onPlayerRecvSEI](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~protocol~ZegoEventHandler#on-player-recv-sei-stream-id) 方法，调用 [setEventHandler](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~protocol~ZegoEventHandler) 接口传入创建的 [ZegoEventHandler](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~protocol~ZegoEventHandler) 监听 [onPlayerRecvSEI](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~protocol~ZegoEventHandler#on-player-recv-sei-stream-id) 的回调。

3. 调用 [loginRoom](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoExpressEngine#login-room-user) 接口登录房间。

4. 调用 [startPlayingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoExpressEngine#start-playing-stream-canvas) 接口拉流。

5. 在拉流成功后，接收到推流端发送的 SEI 信息之后触发 [onPlayerRecvSEI](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~protocol~ZegoEventHandler#on-player-recv-sei-stream-id) 回调。

    <Note title="说明">


    拉流时，如果开发者通过调用 `mutePlayStreamVideo` 或 `muteAllPlayStreamVideo` 接口，设置了只拉音频流时，将无法接收 SEI 信息。
    </Note>

### 1（可选）设置 SEI 类型

<Accordion title="设置 SEI 类型" defaultOpen="false">
由于 SDK 默认使用 ZEGO 自行定义的 SEI（nalu type = 6, payload type = 243）类型打包，且此类型是 SEI 标准未规定的类型，因此跟视频编码器或者视频文件中的 SEI 不存在冲突。但当开发者需要使用第三方解码器解码时（如 FFmpeg），会导致解不出正确的 SEI，此时需要在推流前调用 [setSEIConfig](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoExpressEngine#set-sei-config) 接口更换 SDK 发送 SEI 的类型，使用 UserUnregister 的 SEI（nalu type = 6, payload type = 5）类型打包。



<Note title="说明">


仅当开发者使用第三方解码器解码 SEI 时需要执行该步骤。
</Note>

- 接口原型

    ```objc
    // 设置媒体增强补充信息（SEI）类型。
    //
    // 必须在推流之前设置。
    //
    // @param config SEI 配置属性。默认使用 ZEGO 定义的 SEI 类型。
    - (void)setSEIConfig:(ZegoSEIConfig *)config;
    ```

- 调用示例

    ```objc
    ZegoSEIConfig *seiConfig = [[ZegoSEIConfig alloc] init];
    // 采用 H.264 的 SEI (nalu type = 6,payload type = 5) 类型打包，因为视频编码器自身会产生 payload type 为 5 的 SEI，或者使用视频文件推流时，视频文件中也可能存在这样的 SEI，所以使用此类型时，用户需要把 uuid + content 当作 buffer 塞给 SEI 发送接口；此时为了区别视频编码器自身产生的 SEI， App 在发送此类型 SEI 时，可以填写业务特定的 uuid（uuid 长度为 16 字节），接收方使用 SDK 解析 payload type 为 5 的 SEI 时，会根据设置的过滤字符串过滤出 uuid相符的 SEI 抛给业务，如果没有设置过滤字符串，SDK 会把所有收到的 SEI 都抛给开发者。
    seiConfig.type = ZegoSEITypeUserUnregister;

    [self.engine setSEIConfig:seiConfig];

    // 通过 advancedConfig 设置 uuid 过滤字段，设置之后 SDK 只会抛出前 12 个字节为开发者所设置 uuid 的 SEI。
    ZegoEngineConfig *engineConfig = [[ZegoEngineConfig alloc] init];
    // 其他用户通过 [onPlayerRecvSEI] 收到的 SEI 信息前 12 个字节一定是 zegozegozego，其他会被过滤。
    engineConfig.advancedConfig = @{@"unregister_sei_filter": @"zegozegozego"};

    [ZegoExpressEngine setEngineConfig:engineConfig];

    // 开始推流。
    [self.engine startPublishingStream:@"STREAM_ID"];
    ```
</Accordion>


### 2 推流方

发送 SEI 信息的接口需要在推流成功之后调用，接口原型如下：

- 接口原型

    ```objc
    // 发送媒体增强补充信息。
    //
    // 此接口可在开发者推流传输音视频流数据同时，发送流媒体增强补充信息来同步一些其他附加信息。
    // 一般如同步音乐歌词或视频画面精准布局等场景，可选择使用发送 SEI。
    // 当推流方发送 SEI 后，拉流方可通过监听 [onPlayerRecvSEI] 的回调获取 SEI 内容。
    // 由于 SEI 信息跟随视频帧或音频帧，由于网络问题有可能丢帧，因此 SEI 信息也有可能丢，为解决这种情况，应该在限制频率内多发几次。
    // 限制频率：1 秒钟不要超过 30 次。
    // SEI 数据长度限制为 4096 字节。
    //
    // @param data SEI 内容。
    - (void)sendSEI:(NSData *)data;
    ```

- 调用示例

    ```objc
    ZegoEngineProfile *profile = [ZegoEngineProfile new];
    // 请通过官网注册获取，格式为：1234567890。
    profile.appID = appID;
    // 请通过官网注册获取，格式为：@"0123456789012345678901234567890123456789012345678901234567890123"（共 64 个字符）。
    profile.appSign = appSign;
    // 通用场景接入。
    profile.scenario = ZegoScenarioDefault;
    // 创建引擎，并注册 self 为 eventHandler 回调。不需要注册回调的话，eventHandler 参数可以传 nil，后续可调用 "setEventHandler:" 方法设置回调。
    self.engine = [[ZegoExpressEngine createEngineWithProfile:profile eventHandler:self];
    // 登录房间。
    [self.engine loginRoom:roomID user:[ZegoUser userWithUserID:userID userName:userName]];
    // 推流。
    [self.engine startPublishingStream:publishStreamID];
    // 开发者的其他业务逻辑。
    ...;
    // 在业务场景需要的时机发送 SEI 信息。
    char *str = "1234567\0";
    [self.manager sendSEI:[NSData dataWithBytes:str length:7 ]];
    ```

### 3 拉流方

接收 SEI 信息的回调接口需要在拉流成功之后触发，接口原型如下：

- 接口原型

    ```objc
    // 收到远端流的 SEI 内容。
    //
    // 拉流成功后，当远端流调用 sendSEI 后，本端会收到此回调。
    // 若只拉纯音频流，将收不到推流端发送的 SEI 信息。
    //
    // @param data SEI 内容。
    // @param streamID 拉流的流 ID。
    - (void)onPlayerRecvSEI:(NSData *)data streamID:(NSString *)streamID;
    ```

- 调用示例

    ```objc
    @implementation xx
     // 监听接收 SEI 信息的回调, 当发送端调用 sendSEI 发送信息时会触发此回调。
    - (void)onPlayerRecvSEI:(NSData *)data streamID:(NSString *)streamID {
         在这里实现业务场景相关的逻辑, 例如展现相关的UI等
            ...;
    }
     // 重写的其他回调。
        ...
    @end

    ZegoEngineProfile *profile = [ZegoEngineProfile new];
    // 请通过官网注册获取，格式为：1234567890。
    profile.appID = appID;
    // 请通过官网注册获取，格式为：@"0123456789012345678901234567890123456789012345678901234567890123"（共 64 个字符）。
    profile.appSign = appSign;
    // 通用场景接入。
    profile.scenario = ZegoScenarioDefault;
    // 创建引擎，并注册 self 为 eventHandler 回调。不需要注册回调的话，eventHandler 参数可以传 nil，后续可调用 "-setEventHandler:" 方法设置回调。
    self.engine = [[ZegoExpressEngine createEngineWithProfile:profile eventHandler:self];
    // 添加监听的回调对象。
    [self.engine setEventHandler:self];
    // 登录房间。
    [self.engine loginRoom:roomID user:[ZegoUser userWithUserID:userID userName:userName]];
    // 拉流, canvas 为 ZegoCanvas 类型的索引 UI 渲染控件的对象。
    [self.engine startPlayingStream:self.firstStreamID canvas:firstPlayCanvas];
    // 开发者的其他业务逻辑。
    ...;
    ```


## 相关文档

[如何理解和使用 SEI（媒体补充增强信息）？](https://doc-zh.zego.im/faq/sei)

<Content />