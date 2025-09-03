# 发送与接收语音消息

- - -

本文介绍如何使用 ZIM SDK 和 ZIM Audio SDK 快速实现基本的语音消息发送与接收功能。

## 前提条件

在实现“发送与接收语音消息”功能之前，请确保：


- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，获取到了接入 ZIM SDK 服务所需的 AppID、AppSign。ZIM 服务权限不是默认开启的，使用前，请先在 [ZEGO 控制台](https://console.zego.im) 自助开通 ZIM 服务（详情请参考控制台的 [服务配置 - 即时通讯 - 开通服务](https://doc-zh.zego.im/article/14994)），若无法开通 ZIM 服务，请联系 ZEGO 技术支持开通。
- 已集成 ZIM SDK，详情请参考 [快速开始 - 实现基本收发消息](/zim-ios/send-and-receive-messages) 的 “2 集成 SDK”。
- 已集成 ZIM Audio SDK，详情请参考 [语音组件 - 集成 SDK](/zim-ios/zim-audio/integrate-the-zim-audio-sdk)。

## 实现流程

用户发送与接收语音消息的过程主要包含录制音频、发送音频、接收音频和播放音频等环节。以客户端 A 和 B 的语音消息交互为例：
<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/ZIM/ZIMAudio/audio_message.png" /></Frame>

### 1 导入头文件
在项目文件中引入头文件 “ZIMAudio.h”。
```objective-c
#import <ZIMAudio/ZIMAudio.h>
```

<a id="init"></a>
### 2 初始化 SDK

在使用 ZIM Audio SDK 其他接口前，请先调用 [initWithLicense](https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_ios~class~ZIMAudio#init-with-license-license) 进行初始化。

在调用此接口时，如果您只希望实现最基础的语音消息收发，接口参数可以传空字符串。

如果您希望实现更多音频处理，请传入鉴权文件 License，如何获取 License，请参考 [在线鉴权](/zim-ios/zim-audio/implement-online-authentication)。

```objc
// 初始化 ZIM Audio SDK
// 本文描述的场景无需 License
[[ZIMAudio sharedInstance] initWithLicense:@""];
```

### 3 监听回调

1. 创建一个声明 [ZIMAudioEventHandler](https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_ios~class~ZIMAudioEventHandler) 协议的类，并实现 [ZIMAudioEventHandler](https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_ios~class~ZIMAudioEventHandler) 中的方法。

    ```objc
    #import <ZIMAudio/ZIMAudio.h>

    @interface ZIMAudioEventHandler : NSObject<ZIMAudioEventHandler>

    + (instancetype)sharedInstance;

    @end

    @implementation ZIMAudioEventHandler

    + (instancetype)sharedInstance {
        static ZIMAudioEventHandler *instance = nil;
        static dispatch_once_t onceToken;
        dispatch_once(&onceToken, ^{
            instance = [[ZIMAudioEventHandler alloc] init];
        });
        return instance;
    }

    - (void)onError:(ZIMAudioError *)errorInfo{
        // 编写业务逻辑
    }
    @end
    ```

2. 调用 [setEventHandler](https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_ios~class~ZIMAudio#set-event-handler-event-handler) 设置该类的一个实例作为监听对象。

    ```objc
    [[ZIMAudio sharedInstance] setEventHandler:[ZIMAudioEventHandler sharedInstance]];
    ```

<a id="record"></a>

### 4 录制音频文件

#### 4.1 开始录制

1. 消息发送客户端调用 [startRecordWithConfig](https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_ios~class~ZIMAudio#start-record-with-config-config) 接口定义音频文件存放的本地绝对路径（需包含音频文件名称与后缀，如 xxx/xxx/xxx.m4a，仅支持 .m4a 和 .mp3）和录制时长上限，开始录制音频文件。

    ```objc
    ZIMAudioRecordConfig *config = [[ZIMAudioRecordConfig alloc] init];
    config.filePath = @""; // 音频文件预期存放的本地绝对路径并携带文件后缀名，如 xxx/xxx/xxx.m4a，仅支持 .m4a 和 .mp3
    config.maxDuration = 10 * 1000; // 音频的最大录制时长，单位为 ms。
                                    // 默认为 60000 ms（即 60 秒）。最大值不超过 300000 ms（即 5 分钟）。
                                    // 此处示例表示 10 个 1000 ms（即 10 秒）。
    [[ZIMAudio sharedInstance] startRecordWithConfig:config];
    ```

2. 触发相关回调。

    - 开始录制后，消息发送客户端可以监听 [onRecorderStarted](https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_ios~class~ZIMAudioEventHandler#on-recorder-started) 回调，用于更新 UI。

        ```objc
        - (void)onRecorderStarted;
        ```

    - ZIM Audio SDK 会每 500 毫秒通过 [onRecorderProgress](https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_ios~class~ZIMAudioEventHandler#on-recorder-progress-current-duration) 回调一次进度通知，说明已录制的音频文件时长，此信息可用于 UI 更新 。

        ```objc
        - (void)onRecorderProgress:(int)currentDuration;
        ```

    - 在录音开始时或在录音过程中，如果因异常导致录音失败，ZIM Audio SDK 将会通过 [onRecorderFailed](https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_ios~class~ZIMAudioEventHandler#on-recorder-failed-error-code) 进行通知，消息发送客户端可以监听该回调并参考 [ZIM Audio 错误码文档](/zim-ios/sdk-error-codes/zim-audio#错误码) 处理失败事件。

        ```objc
        - (void)onRecorderFailed:(ZIMAudioErrorCode)errorCode;
        ```

<a id="complete"></a>
#### 4.2 完成录制 

1. 如需结束录制音频，请调用 [completeRecord](https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_ios~class~ZIMAudio#complete-record) 接口。

    <Note title="说明">

    - 请在调用 [completeRecord](https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_ios~class~ZIMAudio#complete-record) 接口之前，您已监听到 [onRecorderStarted](https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_ios~class~ZIMAudioEventHandler#on-recorder-started) 回调，否则会导致本次录制取消，且收到录制时间过短的报错。
    - 如果录制没有被 <a href="#complete">完成</a> 或 <a href="#cancel">取消</a>，当录制时长达到时间上限时，ZIM Audio SDK 将会自动完成录制，并触发 [onRecorderCompleted](https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_ios~class~ZIMAudioEventHandler#on-recorder-completed-total-duration) 回调。
    </Note>

    ```objc
    [[ZIMAudio sharedInstance] completeRecord];
    ```

2. 收到 [onRecorderCompleted](https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_ios~class~ZIMAudioEventHandler#on-recorder-completed-total-duration) 回调后，即可根据开始录制时传入的路径找到该音频文件。

    ```objc
    - (void)onRecorderCompleted:(int)totalDuration; // totalDuration 为音频文件总时长，单位为毫秒
    ```

<a id="cancel"></a>
#### 4.3（可选）取消录制

1. 如需提前停止录音且不需要发送语音消息时，调用 [cancelRecord](https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_ios~class~ZIMAudio#cancel-record) 即可中断录制并删除该录制文件。

    ```objc
    [[ZIMAudio sharedInstance] cancelRecord];
    ```

2. 调用 [cancelRecord](https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_ios~class~ZIMAudio#cancel-record) 接口后，将会触发 [onRecorderCancelled](https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_ios~class~ZIMAudioEventHandler#on-recorder-cancelled) 回调，消息发送客户端可监听该回调用于 UI 更新。

    ```objc
    - (void)onRecorderCancelled;
    ```

#### 4.4（可选）检查当前是否正在录制

如需在某一时刻检查当前是否正在录制中，可调用 [isRecording](https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_ios~class~ZIMAudio#is-recording) 接口获取当前录制状态。

```objc
BOOL isRecording = [[ZIMAudio sharedInstance] isRecording];   
```

### 5 发送语音消息

<Warning title="注意">

实现此步骤前，请确认用户已 [登录 ZIM](/zim-ios/send-and-receive-messages#4-登录-zim)。
</Warning>


当 [onRecorderCompleted](https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_ios~class~ZIMAudioEventHandler#on-recorder-completed-total-duration) 触发后，消息发送客户端可以使用音频文件绝对路径构造 [ZIMAudioMessage](https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_ios~class~ZIMAudioMessage)（ZIM 音频消息），并调用 [sendMediaMessage](https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_ios~protocol~ZIM#send-media-message-message-to-conversation-id-conversation-type-config-notification-callback) 接口发送该消息，下列代码以在单聊会话中发送音频消息为例。

```objc
// 录制完成回调
- (void)onRecorderCompleted:(int)totalDuration{
    // 将单位为毫秒的音频时长转换为 ZIM 需要的秒
    int second = totalDuration / 1000; 
    // 构造 ZIM 音频消息
    ZIMAudioMessage *audioMessage = [[ZIMAudioMessage alloc] initWithFileLocalPath:@"录制音频文件绝对路径" audioDuration: second];

    // 在单聊会话中发送音频消息
    ZIMMessageSendConfig *sendConfig = [[ZIMMessageSendConfig alloc] init];
    [[ZIM getInstance] sendMediaMessage:audioMessage toConversationID:@"单聊的会话 ID" conversationType:ZIMConversationTypePeer config:sendConfig notification:nil callback:^(ZIMMessage * _Nonnull message, ZIMError * _Nonnull errorInfo) {
        if(errorInfo.code == ZIMErrorCodeSuccess){
            // 消息发送成功
        }else{
            // 根据官网 ZIM 错误码文档处理
        }
    }];   
}  
```

如需了解发送进度，请参考收发消息文档的 [富媒体文件消息的发送进度回调](/zim-android/guides/messaging/send-and-receive-messages#富媒体文件消息的发送进度回调)。

### 6 接收语音消息

<Warning title="注意">

实现此步骤前，请确认用户已 [登录 ZIM](/zim-ios/send-and-receive-messages#4-登录-zim)。
</Warning>


根据会话类型（单聊、房间、群组），消息接收客户端监听 [peerMessageReceived](https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_ios~protocol~ZIMEventHandler#zim-peer-message-received-from-user-id)、[groupMessageReceived](https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_ios~protocol~ZIMEventHandler#zim-group-message-received-from-group-id)、[roomMessageReceived](https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_ios~protocol~ZIMEventHandler#zim-room-message-received-from-room-id)，接收语音消息的相关通知，然后可以调用 [downloadMediaFileWithMessage](https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_ios~protocol~ZIM#download-media-file-with-message-message-file-type-config-progress-callback) 接口，下载音频文件到本地。

下列代码描述在单聊会话接收并下载音频消息。

```objc
 - (void)zim:(ZIM *)zim peerMessageReceived:(NSArray<ZIMMessage *> *)messageList info:(ZIMMessageReceivedInfo *)info fromUserID:(NSString *)fromUserID {
    // 遍历收到的消息列表
    for (ZIMMessage *message in messageList) {
        // 如果消息类型为音频消息
        if(message.type == ZIMMessageTypeAudio){
            
            ZIMAudioMessage *audioMessage = (ZIMAudioMessage *)message;

            // 音频消息的本地文件路径为空字符串，则调用下载接口
            if([audioMessage.fileLocalPath isEqual:@""]){
                //如果该音频消息不存在本地文件路径，代表该消息的音频文件还未下载到本地
                [[ZIM getInstance] downloadMediaFileWithMessage:audioMessage fileType:ZIMMediaFileTypeOriginalFile progress:^(ZIMMediaMessage * _Nonnull message, unsigned long long currentFileSize, unsigned long long totalFileSize) {
                    // 此处获取音频文件下载进度
                } callback:^(ZIMMediaMessage * _Nonnull message, ZIMError * _Nonnull errorInfo) {
                    if(errorInfo.code == ZIMErrorCodeSuccess){
                         message.fileLocalPath; // 下载成功，获取音频文件本地绝对路径
                    }else{
                        // 下载失败，根据 ZIM 官网错误码表处理失败事件
                    }
                }];
            }
            // 本地音频文件路径不为空，直接取值即可
            else{
                audioMessage.fileLocalPath; // 音频文件本地绝对路径
            }
        }
    }
}  
```

如需了解下载进度，请参考收发消息文档的 [富媒体文件消息的下载进度回调](/zim-android/guides/messaging/send-and-receive-messages#富媒体文件消息的下载进度回调)。

### 7 播放音频文件

#### 7.1 开始播放

1. 消息接收客户端调用 [startPlayWithConfig](https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_ios~class~ZIMAudio#start-play-with-config-config) 接口，传入音频文件的本地绝对路径，设置音频输出的路由类型，开始播放音频文件。

    ```objc
    // 开始播放音频

    // 构造播放设置
    ZIMAudioPlayConfig *config = [[ZIMAudioPlayConfig alloc] init];
    config.filePath = @"";// 填入音频文件的本地路径。
    config.routeType = ZIMAudioRouteTypeSpeaker; // ZIMAudioRouteTypeSpeaker：扬声器播放
                                                 // ZIMAudioRouteTypeReceiver：听筒播放
    [[ZIMAudio sharedInstance] startPlayWithConfig:config];
    ```

2. 触发相关回调。

    - 监听回调 [onPlayerStarted](https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_ios~class~ZIMAudioEventHandler#on-player-started-total-duration) ，用于 UI 更新。

        ```objc
        - (void)onPlayerStarted:(int)totalDuration; // totalDuration 为音频文件总时长，单位为毫秒
        ```

    - ZIM Audio SDK 会每 500 毫秒通过 [onPlayerProgress](https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_ios~class~ZIMAudioEventHandler#on-player-progress-current-duration) 回调一次进度通知，说明已播放时长，此信息可用于 UI 更新 。

        ```objc
        - (void)onPlayerProgress:(int)currentDuration;
        ```

    - 在播放开始时或在播放过程中，如果因异常导致播放失败，ZIM Audio SDK 将会通过 [onPlayerFailed](https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_ios~class~ZIMAudioEventHandler#on-player-failed-error-code) 进行通知，消息接收客户端可以监听该回调并参考 [ZIM Audio 错误码文档](/zim-ios/sdk-error-codes/zim-audio#错误码) 处理失败事件。

        ```objc
        - (void)onPlayerFailed:(ZIMAudioErrorCode)errorCode;
        ```

    - 若因其他操作（如在播放期间开始录音、在播放期间接收到系统的来电事件、在播放期间音频设备被其他应用抢占等情况。）导致播放终端，ZIM Audio SDK 将回调 [onPlayerInterrupted](https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_ios~class~ZIMAudioEventHandler#on-player-interrupted)。
   
        ```objc
        - (void)onPlayerInterrupted;
        ```

    - 播放完成时，ZIM Audio SDK 将会回调 [onPlayerEnded](https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_ios~class~ZIMAudioEventHandler#on-player-ended)。

        ```objc
        - (void)onPlayerEnded;
        ```

3. （可选）如需在播放过程中切换音频输出设备(扬声器或听筒)，请调用 [setAudioRouteType](https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_ios~class~ZIMAudio#set-audio-route-type-route-type) 。

    <Warning title="注意">

    若用户已连接耳机，该接口调用将不会生效，音频输出仍将通过耳机进行。
    </Warning>

    ```objc
    // 设置输出设备为扬声器
   [[ZIMAudio sharedInstance] setAudioRouteType:ZIMAudioRouteTypeSpeaker];
    ```

#### 7.2（可选）停止播放

1. 如需中断播放，请调用 [stopPlay](https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_ios~class~ZIMAudio#stop-play) 接口。

    ```objc
    [[ZIMAudio sharedInstance] stopPlay];
    ```

2. 监听 [onPlayerStopped](https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_ios~class~ZIMAudioEventHandler#on-player-stopped) 回调，更新 UI。停止播放或播放完成后，ZIM Audio SDK 将释放对音频设备的占用。

    ```objc
    - (void)onPlayerStopped;
    ```

### 8 反初始化

如果用户彻底不使用语音功能，可调用 [uninit](https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_ios~class~ZIMAudio#uninit) 释放资源。

```objc
[[ZIMAudio sharedInstance] uninit];
```
