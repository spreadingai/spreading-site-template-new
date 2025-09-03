# 混音

- - -

## 功能简介

混音是指 SDK 从 App 获取一路音频数据，将 App 提供的音频数据与 SDK 采集的音频数据整合为一路音频数据。为了实现在通话或直播过程中，需要播放自定义的声音或者音乐文件并且让房间内的其他人也听到的需求。

适用场景：直播过程中需要有掌声、口哨等音效，或者需要播放背景音乐。

## 示例源码下载

请参考 [下载示例源码](/real-time-video-ios-oc/quick-start/run-example-code) 获取源码。

相关源码请查看 “/ZegoExpressExample/Topics/AudioMixing” 目录下的文件。

## 前提条件

在使用混音功能之前，请确保：

- 已在项目中集成 ZEGO Express SDK，实现基本的实时语音功能，详情请参考 [快速开始 - 集成](https://doc-zh.zego.im/article/3574) 和 [快速开始 - 实现流程](https://doc-zh.zego.im/article/7631)。
- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppID 和 AppSign，详情请参考 [控制台 - 项目管理](/console/project-info) 中的“项目信息”。

## 使用步骤

### 开启/关闭混音

SDK 默认关闭了混音功能，需要开发者主动调用相关接口以打开该功能。

- 接口原型

    ```objc
    /// 开/关 混音功能
    ///
    /// 开启混音，结合 setAudioMixingHandler，为 SDK 提供用于混音的音频数据
    ///
    /// @param enable 是否开启混音功能；YES 表示开启；NO 表示关闭
    - (void)enableAudioMixing:(BOOL)enable;
    ```

- 调用示例

    ```objc
    [[ZegoExpressEngine sharedEngine] enableAudioMixing:YES];
    ```

### 将混音数据传给 SDK

打开混音功能后，SDK 将会在需要混音数据时触发回调，需要开发者在此回调中将混音数据传递给 SDK。

- 接口原型

    ```objc
    /// 设置混音相关回调
    ///
    /// @param handler 混音回调
    - (void)setAudioMixingHandler:(nullable id<ZegoAudioMixingHandler>)handler;
    ```

- 调用示例

    ```objc
    // Set self as audio mixing handler
    [[ZegoExpressEngine sharedEngine] setAudioMixingHandler:self];
    ```

    ```objc
    // Audio origin data
    @property (nonatomic, strong) NSData *audioData;
    // Audio origin data position
    @property (nonatomic, assign) void *audioDataPosition;
    // Audio mixing data
    @property (nonatomic, strong) ZegoAudioMixingData *audioMixingData;
    ```

    ```objc
    // Here's an example of how to loop mixing a local wav file
    - (ZegoAudioMixingData *)onAudioMixingCopyData:(unsigned int)expectedDataLength {

        // Initialize audio pcm data
        if (!self.audioData) {
            NSURL *auxURL = [[NSBundle mainBundle] URLForResource:@"test.wav" withExtension:nil];
            self.audioData = [NSData dataWithContentsOfURL:auxURL options:0 error:nil];
            self.audioDataPosition = (void *)[self.audioData bytes];
        }

        // Initialize ZegoAudioMixingData
        if (!self.audioMixingData) {
            self.audioMixingData = [[ZegoAudioMixingData alloc] init];
            self.audioMixingData.param = [[ZegoAudioFrameParam alloc] init];
            self.audioMixingData.param.channel = ZegoAudioChannelMono;
            self.audioMixingData.param.sampleRate = ZegoAudioSampleRate16K;
        }

        // Calculate remaining data length
        unsigned int remainingDataLength = (unsigned int)([self.audioData bytes] + (int)[self.audioData length] - self.audioDataPosition);

        if (remainingDataLength >= expectedDataLength) {
            // When the remaining data length is greater than the expected data length for this callback, construct the expected length of data and move the position backward

            NSData *expectedData = [NSData dataWithBytes:self.audioDataPosition length:expectedDataLength];

            self.audioMixingData.audioData = expectedData;
            self.audioDataPosition = self.audioDataPosition + expectedDataLength;

        } else {
            // When the remaining data length is less than the expected length for this callback, move the position back to the starting point.
            self.audioMixingData.audioData = nil;
            self.audioDataPosition = (void *)[self.audioData bytes];
        }

        return self.audioMixingData;
    }
    ```

<Note title="说明">

“expectedDataLength” 为本次回调期望数据的长度，收到回调后应构造一个 [ZegoAudioMixingData](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~objective-c_ios~class~ZegoAudioMixingData) 对象，设置其 “param” 参数为待混音数据的真实采样率和声道数，将其 “audioData” 参数设置为期望长度的待混音数据。如果填写的数据不足 SDK 提供的长度值，则可设置 “audioData” 参数置空（丢弃末尾数据）；或者最后的尾音不足 SDK 提供的长度值时，可以用静音数据补齐长度。

</Note>



### 设置混音音量

在启用混音功能后，开发者可以根据需要调用 [setAudioMixingVolume](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~objective-c_ios~class~ZegoExpressEngine#set-audio-mixing-volume) 调整混音的音频的音量；或者调用 [muteLocalAudioMixing](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~objective-c_ios~class~ZegoExpressEngine#mute-local-audio-mixing) 设置混音为静音，静音后主播端将听不到混音声音，观众端还能听到混音声音。

- 接口原型

    ```cpp
    /// 禁止或恢复本地播放混音声音
    ///
    /// 当静音播放混音后，混音端（推流端）将听不到混音的播放声音，远端（拉流端）依然能听到混音
    ///
    /// @param mute 是否静音本地混音；YES 表示禁止播放播放；NO 表示开启
    - (void)muteLocalAudioMixing:(BOOL)mute;

    /// 设置混音音量
    ///
    /// 此 API 会同时修改本地播放以及混到推流中的混音数据音量大小
    ///
    /// @param volume 混音音量 取值范围是 0 ~ 200，默认为 100
    - (void)setAudioMixingVolume:(int)volume;

    /// 设置混音音量
    ///
    /// 此 API 可以单独设置本地播放的混音音量或混入推流中的混音音量
    ///
    /// @param volume 混音音量 取值范围是 0 ~ 200，默认为 100
    /// @param type 混音本地播放音量/混音推流中的音量
    - (void)setAudioMixingVolume:(int)volume type:(ZegoVolumeType)type;
    ```

- 调用示例

    ```objc
    [[ZegoExpressEngine sharedEngine] setAudioMixingVolume:80 type:ZegoVolumeTypeLocal];
    [[ZegoExpressEngine sharedEngine] setAudioMixingVolume:20 type:ZegoVolumeTypeRemote];

    [[ZegoExpressEngine sharedEngine] muteLocalAudioMixing:YES];
    ```

## API 参考列表

| 方法 | 描述 |
|-------|--------|
| [enableAudioMixing ](https://doc-zh.zego.im/zh/api?doc=Express_Video_SDK_API~ObjectiveC~class~zego-express-engine#enable-audio-mixing) | 开启/关闭混音 |
| [setAudioMixingHandler ](https://doc-zh.zego.im/zh/api?doc=Express_Video_SDK_API~ObjectiveC~class~zego-express-engine#set-audio-mixing-handler) | 设置混音回调 |
| [setAudioMixingVolume ](https://doc-zh.zego.im/zh/api?doc=Express_Video_SDK_API~ObjectiveC~class~zego-express-engine#set-audio-mixing-volume) | 设置混音音量 |
| [muteLocalAudioMixing ](https://doc-zh.zego.im/zh/api?doc=Express_Video_SDK_API~ObjectiveC~class~zego-express-engine#mute-local-audio-mixing) | 静音混音本地播放 |
