# 通话质量监测

- - -

## 功能简介

在推拉流过程中，用户可通过注册相关的回调以监听具体的推拉流的质量。

## 示例源码下载

请参考 [下载示例源码](/real-time-video-ios-oc/quick-start/run-example-code) 获取源码。

- 推流：相关源码请查看 “/ZegoExpressExample/Topics/PublishStream/ZGPublishStreamViewController.m” 文件。
- 拉流：相关源码请查看 “/ZegoExpressExample/Topics/PlayStream/ZGPlayStreamViewController.m” 文件。

## 使用步骤

### 监控推流质量

- 接口原型

    ```objc
    /// 推流质量回调
    /// @discussion 推流成功后每3秒会收到此回调，通过该回调可以获取推送的音视频流的采集帧率，码率，RTT，丢包率等质量数据，实时监控推送流的健康情况。
    /// @param quality 推流质量，包含了音视频帧率、码率、RTT等值
    /// @param streamID 流 ID
    - (void)onPublisherQualityUpdate:(ZegoPublishStreamQuality *)quality streamID:(NSString *)streamID;
    ```

- 调用示例

    在需要接收回调的类中声明遵守 [ZegoEventHandler](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~objective-c_macos~protocol~ZegoEventHandler) 协议，并在调用创建引擎对象的方法时为 “eventHandler” 参数传入该类，即可通过实现此方法来接收质量信息回调。

    ```objc
    - (void)onPublisherQualityUpdate:(ZegoPublishStreamQuality *)quality streamID:(NSString *)streamID {
        NSLog(@"Video Capture FPS: %f", quality.videoCaptureFPS);
        NSLog(@"Video Encode FPS: %f", quality.videoEncodeFPS);
        NSLog(@"Video Send FPS: %f", quality.videoSendFPS);
        NSLog(@"Video KBPS: %f", quality.videoKBPS);
        NSLog(@"Audio Capture FPS: %f", quality.audioCaptureFPS);
        NSLog(@"Audio Send FPS: %f", quality.audioSendFPS);
        NSLog(@"Audio KBPS: %f", quality.audioKBPS);
        NSLog(@"RTT: %d", quality.rtt);
        NSLog(@"Packet Lost Rate: %f", quality.packetLostRate);
        NSLog(@"Quality Level: %d", (int)quality.level);
        NSLog(@"is Hardware Encode: %d", quality.isHardwareEncode);
    }
    ```

### 推流质量详解

推流质量包含了采集、编码阶段音视频流的帧率、传输（发送）的音视频流的帧率、码率、延时及丢包率。具体定义如下：

```objc
/// 音视频参数与网络质量等
@interface ZegoPublishStreamQuality : NSObject

/// 视频采集帧率，单位为 f/s
@property (nonatomic, assign) double videoCaptureFPS;

/// 视频编码帧率，单位为 f/s
@property (nonatomic, assign) double videoEncodeFPS;

/// 视频发送帧率，单位为 f/s
@property (nonatomic, assign) double videoSendFPS;

/// 视频码率，单位为 kbps
@property (nonatomic, assign) double videoKBPS;

/// 音频采集帧率，单位为 f/s
@property (nonatomic, assign) double audioCaptureFPS;

/// 音频发送帧率，单位为 f/s
@property (nonatomic, assign) double audioSendFPS;

/// 音频码率，单位为 kbps
@property (nonatomic, assign) double audioKBPS;

/// 本端至服务端的延迟，单位为毫秒
@property (nonatomic, assign) int rtt;

/// 丢包率，单位为百分比，0.0 ~ 1.0
@property (nonatomic, assign) double packetLostRate;

/// 推流质量级别
@property (nonatomic, assign) ZegoStreamQualityLevel level;

/// 是否开启硬件编码
@property (nonatomic, assign) BOOL isHardwareEncode;

/// 视频编码格式
@property (nonatomic, assign) ZegoVideoCodecID videoCodecID;

/// 已发送的总字节数，包括音频、视频和SEI等
@property (nonatomic, assign) double totalSendBytes;

/// 已发送的音频字节数
@property (nonatomic, assign) double audioSendBytes;

/// 已发送的视频字节数
@property (nonatomic, assign) double videoSendBytes;

@end
```

#### 推流采集质量

推流采集质量贴近用户预览时的主观感受，推流时 SDK 在采集阶段的音视频质量的相关参数如下：

- audioCaptureFPS：音频采集帧率（fps）
- videoCaptureFPS：视频采集帧率（fps）

#### 推流编码质量

推流时 SDK 在编码阶段的音视频质量的相关参数如下：

videoEncodeFPS：当前编码器的目标视频编码帧率（fps）

#### 推流发送质量

推流发送质量是实际推流的质量，与实际的网络质量有关，相关成员如下：

- audioSendFPS：实际的音频发送帧率（fps）
- audioKBPS：实际的音频发送码率（kbps）
- videoSendFPS：实际的视频发送帧率（fps）
- videoKBPS：实际的视频发送码率（kbps）
- rtt：设备到 ZEGO Server 的往返延时（ms）
- packetLostRate：设备上行丢包率

### 监控拉流质量

- 接口原型

    ```objc
    /// 拉流质量回调
    /// @discussion 拉流成功后每3秒会收到此回调，通过该回调可以获取拉取的音视频流的帧率，码率，RTT，丢包率等质量数据，实时监控拉取流的健康情况。
    /// @param quality 拉流质量
    /// @param streamID 流 ID
    - (void)onPlayerQualityUpdate:(ZegoPlayStreamQuality *)quality streamID:(NSString *)streamID;
    ```

- 调用示例

    在需要接收回调的类中声明遵守 [ZegoEventHandler](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~objective-c_macos~protocol~ZegoEventHandler) 协议，并在调用创建引擎对象的方法时为 “eventHandler” 参数传入该类，即可通过实现此方法来接收质量信息回调。

    ```objc
    - (void)onPlayerQualityUpdate:(ZegoPlayStreamQuality *)quality streamID:(NSString *)streamID {
        NSLog(@"Video Received FPS: %f", quality.videoRecvFPS);
        NSLog(@"Video Decode FPS: %f", quality.videoDecodeFPS);
        NSLog(@"Video Render FPS: %f", quality.videoRenderFPS);
        NSLog(@"Video KBPS: %f", quality.videoKBPS);
        NSLog(@"Audio Received FPS: %f", quality.audioRecvFPS);
        NSLog(@"Audio Decode FPS: %f", quality.audioDecodeFPS);
        NSLog(@"Audio Render FPS: %f", quality.audioRenderFPS);
        NSLog(@"Audio KBPS: %f", quality.audioKBPS);
        NSLog(@"RTT: %d", quality.rtt);
        NSLog(@"Packet Lost Rate: %f", quality.packetLostRate);
        NSLog(@"Quality Level: %d", (int)quality.level);
        NSLog(@"Delay: %d", quality.delay);
        NSLog(@"is Hardware Decode: %d", quality.isHardwareDecode);
    }
    ```

### 拉流质量详解

拉流质量包含了接收的音视频流的帧率、码率、延时和丢包率，解码阶段音视频流的帧率，以及渲染阶段的帧率、卡顿率、音视频整体质量。具体定义如下：

```objc
@interface ZegoPlayStreamQuality : NSObject

/// 视频接收帧率，单位为 f/s
@property (nonatomic, assign) double videoRecvFPS;

/// 视频抗抖动帧率，单位为 f/s
@property (nonatomic, assign) double videoDejitterFPS;

/// 视频解码帧率，单位为 f/s
@property (nonatomic, assign) double videoDecodeFPS;

/// 视频渲染帧率，单位为 f/s
@property (nonatomic, assign) double videoRenderFPS;

/// 视频码率，单位为 kbps
@property (nonatomic, assign) double videoKBPS;

/// 视频卡顿率，单位为（卡顿次数/每10秒）
/// 超过 500ms 没有数据播放，即为一次视频卡顿
@property (nonatomic, assign) double videoBreakRate;

/// 音频接收帧率，单位为 f/s
@property (nonatomic, assign) double audioRecvFPS;

/// 音频抗抖动帧率，单位为 f/s
@property (nonatomic, assign) double audioDejitterFPS;

/// 音频解码帧率，单位为 f/s
@property (nonatomic, assign) double audioDecodeFPS;

/// 音频渲染帧率，单位为 f/s
@property (nonatomic, assign) double audioRenderFPS;

/// 音频码率，单位为 kbps
@property (nonatomic, assign) double audioKBPS;

/// 音频卡顿率，单位为（卡顿次数/每10秒）
/// 连续丢 3 帧且在给定卡顿阈值内无音频数据渲染，即为一次音频卡顿
@property (nonatomic, assign) double audioBreakRate;

/// 服务端至本端的延迟，单位为毫秒
@property (nonatomic, assign) int rtt;

/// 丢包率，单位为百分比，0.0 ~ 1.0
@property (nonatomic, assign) double packetLostRate;

/// 端到端延迟，单位为毫秒
@property (nonatomic, assign) int peerToPeerDelay;

/// 端到端丢包率，单位为百分比，0.0 ~ 1.0
@property (nonatomic, assign) double peerToPeerPacketLostRate;

/// 拉流质量级别
@property (nonatomic, assign) ZegoStreamQualityLevel level;

/// 本端接收到数据后到播放的延迟，单位为毫秒
@property (nonatomic, assign) int delay;

/// 视频时间戳相对于音频时间戳的差值，用于反映音画同步情况，单位为毫秒。此值小于 0 表示视频超前音频的毫秒数, 大于 0 表示视频滞后音频的毫秒数, 等于0表示无差别。 当绝对值小于200，可基本认为音画同步，当绝对值连续 10 秒大于 200 可以认为异常
@property (nonatomic, assign) int avTimestampDiff;

/// 是否开启硬件解码
@property (nonatomic, assign) BOOL isHardwareDecode;

/// 视频编码格式
@property (nonatomic, assign) ZegoVideoCodecID videoCodecID;

/// 已接收的总字节数，包括音频、视频和 SEI 等
@property (nonatomic, assign) double totalRecvBytes;

/// 已接收的音频字节数
@property (nonatomic, assign) double audioRecvBytes;

/// 已接收的视频字节数
@property (nonatomic, assign) double videoRecvBytes;

@end
```

#### 拉流接收质量

拉流接收质量是实际的拉流质量，与实际的推流质量和当前的网络质量相关。相关参数如下：

- audioRecvFPS：实际接收的音频帧率（fps）
- audioKBPS：实际接收的音频码率（kbps）
- audioBreakRate：实际接收的音频卡顿率（卡顿次数/每10秒）
- videoKBPS：实际接收的视频帧率（fps）
- videoRecvFPS：实际接收的视频码率（kbps）
- videoBreakRate：实际接收的视频卡顿率（卡顿次数/每10秒）
- packetLostRate：设备下行丢包率
- rtt：设备到 ZEGO Server 的往返延时（ms）

#### 拉流渲染质量

拉流渲染质量贴近用户观看音视频的主观感受，该质量受解码器影响可能低于实际接收的拉流质量值。相关参数如下：

- audioRenderFPS：实际的音频渲染帧率
- videoRenderFPS：实际的视频渲染帧率

## API 参考列表

| 方法 | 描述 |
|-------|--------|
| [onPublisherQualityUpdate](https://doc-zh.zego.im/zh/api?doc=Express_Video_SDK_API~ObjectiveC~protocol~zego-event-handler#on-publisher-quality-update-stream-id) | 推流质量回调 |
| [onPlayerQualityUpdate](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~objective-c_macos~protocol~ZegoEventHandler#on-player-quality-update-stream-id) | 拉流质量更新回调 |

<Content />