# 推流/拉流信息监测

- - -

## 功能简介

在推拉流过程中，用户可通过注册相关的回调以获得推流、拉流相关的信息，包括推流/拉流质量、首帧回调、分辨率变化、CDN（Content Delivery Network, 内容分发网络）相关信息和接收 SEI（Supplemental Enhancement Information，媒体补充增强信息）。本篇文档将介绍一下六个功能：

|功能名|说明|
|-|-|
|监测推拉流质量|开发者可分别监控推流质量和拉流质量来判断用户的网络状况，做出相应的处理，从而为用户提供更好的服务。其中推流质量包括帧率、码率、延时和丢包率等参数，拉流质量包括了接收、解码和渲染三个阶段的帧率、分辨率等参数。|
|监控用户状态|用户状态可分为推流方状态和拉流方状态，开发者可监控用户的状态，例如正在请求推流、正在推流、未推流、请求拉流、正在拉流和未拉流等，执行相应操作。|
|推拉流首帧回调|开发者可设置在发送、接收首帧视频或音频时收到回调。|
|监控视频大小变化|开发者可选择在视频采集或拉流分辨率大小发生变化时获取通知，以便做出相关操作|
|监控 CDN 转推状态|当开发者选择将音视频流转推到 CDN 后，可通过监控 CDN 转推状态来判断该转推的音视频流是否正常|
|接收SEI|当拉流方接收到 SEI 时，开发者可通过回调获取 SEI 信息内容。|



通过获取以上信息，开发者可以根据推拉流状态执行相关操作。例如在推流质量不佳时做出相应处理、判断推拉流是否成功、判断转推 CDN 的音视频流是否正常或接收 SEI 信息等。

相关概念解释:
- 推流：指把采集阶段封包好的内容传输到服务器的过程。
- 拉流：指服务器将已有直播内容用指定地址进行拉取的过程。

<Note title="说明">


SEI 的相关概念及原理请参考 [Express 常见问题 - 消息问题](https://doc-zh.zego.im/article/8668) 中的“如何理解和使用媒体补充增强信息”。


</Note>



## 前提条件

在监测推流、拉流信息之前，请确保：

- 已在项目中集成 ZEGO Express SDK，实现基本的实时音视频功能，详情请参考  [快速开始 - 集成](/real-time-video-macos-cpp/quick-start/integrating-sdk) 和  [快速开始 - 实现流程](/real-time-video-macos-cpp/quick-start/implementing-video-call)。
- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppID 和 AppSign，详情请参考 [控制台 - 项目管理](/console-old/project-management)。

## 示例源码下载

请参考 [下载示例源码](/real-time-video-macos-cpp/quick-start/run-example-code) 获取源码。

相关源码请查看 “/ZegoExpressExample/AdvancedStreaming/src/main/java/im/zego/streammonitoring” 目录下的文件。

## 使用步骤

### 监测推流质量

开发者可通过注册 [onPublisherQualityUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoEventHandler#on-publisher-quality-update) 接收推流质量回调。推流成功后每隔三秒会收到此回调。开发者可根据回调返回的质量参数实时监控推送的音视频流的健康情况，以便在设备 UI 界面上实时展示上行网络状况。

调用示例如下：

```cpp
class MyEventHandler : public IZegoEventHandler{
public:
    void onPublisherQualityUpdate(String streamID, ZegoPublishStreamQuality quality){
        // 开发者可以在此回调中监控具体的质量以上报到业务服务器做监控，或者监控质量对象的某个字段以给用户友好的提示
        // 若开发者不知道监控质量哪个字段可以关注 level 字段，这个字段是质量对象的综合值
    }
}
auto eventhandler = std::make_shared<MyEventHandler>();
engine->setEventHandler(eventhandler);
```

### 推流质量详解


推流质量包含了采集、编码阶段音视频流的帧率、分辨率，传输（发送）的音视频流的帧率、码率、延时及丢包率。本节将介绍推流质量 [ZegoPublishStreamQuality](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~struct~ZegoPublishStreamQuality)内的参数。


#### 推流采集质量


推流采集质量贴近用户预览时的主观感受，推流时 SDK 在采集阶段的音视频质量的相关参数如下：


- [audioCaptureFPS](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~struct~ZegoPublishStreamQuality#audio-capture-fps)：音频采集帧率（fps）
- [videoCaptureFPS](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~struct~ZegoPublishStreamQuality#video-capture-fps)：视频采集帧率（fps）

#### 推流编码质量


推流时 SDK 在编码阶段的音视频质量的相关参数如下：


- [videoEncodeFPS](https://doc-zh.zego.im/)：当前编码器的目标视频编码帧率（fps）


#### 推流发送质量


推流发送质量是实际推流的质量，与设置的编码分辨率和实际的网络质量有关，相关参数如下：


- [audioSendFPS](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~struct~ZegoPublishStreamQuality#audio-send-fps)：实际的音频发送帧率（fps）
- [audioKBPS](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~struct~ZegoPublishStreamQuality#audio-kbps)：实际的音频发送码率（kbps）
- [videoSendFPS](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~struct~ZegoPublishStreamQuality#video-send-fps)：实际的视频发送帧率（fps）
- [videoKBPS](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~struct~ZegoPublishStreamQuality#video-kbps)：实际的视频发送码率（kbps）
- [rtt](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~struct~ZegoPublishStreamQuality#rtt)：设备到 ZEGO Server 的往返延时（ms）
- [packetLostRate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~struct~ZegoPublishStreamQuality#packet-lost-rate)：设备上行丢包率

#### 字节数统计
开发者可统计已发送的视频、音频和总字节数，相关参数如下：
- [totalSendBytes](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~struct~ZegoPublishStreamQuality#total-send-bytes)：已发送的总字节数
- [audioSendBytes](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~struct~ZegoPublishStreamQuality#audio-send-bytes)：已发送的音频字节数
- [videoSendBytes](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~struct~ZegoPublishStreamQuality#video-send-bytes)：已发送的视频字节数

#### 编码信息
开发者可获得所推流的编码信息，相关参数如下：
- [videoCodecID](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~struct~ZegoPublishStreamQuality#video-codec-id)：视频编码格式
- [isHardwareEncode](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~struct~ZegoPublishStreamQuality#is-hardware-encode)：是否开启硬件编码

#### 上行网络综合质量


若发者不清楚该回调接口的各个参数应该如何使用，可只关注 [level](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~struct~ZegoPublishStreamQuality#level) 参数，这是 ZegoExpressEngine 内部根据质量参数计算的一个描述上行网络的综合值。

level 字段的说明如下：

|字段名|说明|
|-|-|
|ZEGO_STREAM_QUALITY_LEVEL_EXCELLENT|流质量极好。|
|ZEGO_STREAM_QUALITY_LEVEL_GOOD|流质量好。|
|ZEGO_STREAM_QUALITY_LEVEL_MEDIUM|流质量正常。|
|ZEGO_STREAM_QUALITY_LEVEL_BAD|流质量差。|
|ZEGO_STREAM_QUALITY_LEVEL_DIE|流质量异常。|

### 检测拉流质量

开发者可通过注册 [onPlayerQualityUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoEventHandler#on-player-quality-update) 接收拉流质量回调。拉流成功后每隔三秒会收到此回调。开发者可根据回调返回的质量参数实时监控拉取的音视频流的健康情况，以便在设备 UI 界面上实时展示下行网络状况。

调用示例如下：

```cpp
class MyEventHandler : public IZegoEventHandler{
public:
    void onPlayerQualityUpdate(String streamID, ZegoPlayStreamQuality quality){
        // 开发者可以在此回调中监控具体的质量以上报到业务服务器做监控，或者监控质量对象的某个字段以给用户友好的提示
        // 若开发者不知道监控质量哪个字段可以关注 level 字段，这个字段是质量对象的综合值
    }
}
auto eventhandler = std::make_shared<MyEventHandler>();
engine->setEventHandler(eventhandler);
```

### 拉流质量详解

拉流质量包含了接收的音视频流的帧率、码率、延时和丢包率，解码阶段音视频流的帧率和分辨率，以及渲染阶段的帧率、分辨率、卡顿率、音视频整体质量。本节将介绍推流质量 [ZegoPlayStreamQuality](https://doc-zh.zego.im/)内的参数。




#### 拉流接收质量

拉流接收质量是实际的拉流质量，与实际的推流质量和当前的网络质量相关。相关参数如下：

- [audioRecvFPS](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~struct~ZegoPlayStreamQuality#audio-recv-fps)：实际接收的音频帧率（fps）
- [audioDejitterFPS](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~struct~ZegoPlayStreamQuality#audio-dejitter-fps)：音频抗抖动帧率，单位为 f/s
- [audioKBPS](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~struct~ZegoPublishStreamQuality#audio-kbps)：实际接收的音频码率（kbps）
- [audioBreakRate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~struct~ZegoPlayStreamQuality#audio-break-rate)：实际接收的音频卡顿率（卡顿次数/每10秒）
- [videoRecvFPS](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~struct~ZegoPlayStreamQuality#video-recv-fps)：实际接收的视频帧率（fps）
- [videoDejitterFPS](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~struct~ZegoPlayStreamQuality#video-dejitter-fps)：视频抗抖动帧率，单位为 f/s
- [videoKBPS](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~struct~ZegoPublishStreamQuality#video-kbps)：实际接收的视频码率（kbps）
- [videoBreakRate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~struct~ZegoPlayStreamQuality#video-break-rate)：实际接收的视频卡顿率（卡顿次数/每10秒）
- [packetLostRate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~struct~ZegoPublishStreamQuality#packet-lost-rate)：设备下行丢包率
- [rtt](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~struct~ZegoPublishStreamQuality#rtt)：设备到 ZEGO Server 的往返延时（ms）
- [avTimestampDiff](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~struct~ZegoPlayStreamQuality#av-timestamp-diff)：视频时间戳相对于音频时间戳的差值，用于反映音画同步情况，单位为毫秒。此值小于 0 表示视频超前音频的毫秒数, 大于 0 表示视频滞后音频的毫秒数, 等于0表示无差别。 当绝对值小于200，可基本认为音画同步，当绝对值连续 10 秒大于 200 可以认为异常
- [packetLostRate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~struct~ZegoPublishStreamQuality#packet-lost-rate)：丢包率，单位为百分比，0.0 ~ 1.0
- [peerToPeerDelay](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~struct~ZegoPlayStreamQuality#peer-to-peer-delay)：端到端延迟，单位为毫秒
- [peerToPeerPacketLostRate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~struct~ZegoPlayStreamQuality#peer-to-peer-packet-lost-rate)：端到端丢包率，单位为百分比，0.0 ~ 1.0

#### 拉流渲染质量

拉流渲染质量贴近用户观看音视频的主观感受，该质量受解码器影响可能低于实际接收的拉流质量值。相关参数如下：

- [audioRenderFPS](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~struct~ZegoPlayStreamQuality#audio-render-fps)：实际的音频渲染帧率
- [videoRenderFPS](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~struct~ZegoPlayStreamQuality#video-render-fps)：实际的视频渲染帧率
- [delay](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~struct~ZegoReverbEchoParam#delay)：本端接收到数据后到播放的延迟，单位为毫秒

#### 字节数统计
开发者可统计已接收的视频、音频和总字节数，相关参数如下：
- [totalRecvBytes](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~struct~ZegoPlayStreamQuality#total-recv-bytes)：已接收的总字节数，包括音频、视频和 SEI 等
- [audioRecvBytes](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~struct~ZegoPlayStreamQuality#audio-recv-bytes)：已接收的音频字节数
- [videoRecvBytes](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~struct~ZegoPlayStreamQuality#video-recv-bytes)：已接收的视频字节数

#### 解码信息
开发者可获得所拉流的解码信息，相关参数如下：
- [videoCodecID](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~struct~ZegoPublishStreamQuality#video-codec-id)：视频解码格式
- [isHardwareDecode](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~struct~ZegoPlayStreamQuality#is-hardware-decode)：是否开启硬件解码

### 监控推流/拉流状态
#### 推流状态回调
在推流成功后，开发者可通过 [onPublisherStateUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoEventHandler#on-publisher-state-update) 获取推流状态变更的通知。

调用示例如下：
```cpp
class MyEventHandler : public IZegoEventHandler{
public:
    void onPublisherStateUpdate(String streamID, ZegoPublisherState state, int errorCode, JSONObject extendedData){
    // 当 state 为 PUBLISHER_STATE_NO_PUBLISH 时，且 errcode 非 0，表示推流失败，同时不会再进行重试推流了，此时可在界面作出推流失败提示；
    // 当 state 为 PUBLISHER_STATE_PUBLISH_REQUESTING 时，且 errcode 非 0，表示在重试推流，此时如果超出重试时间未成功推流会抛出推流失败通知。
    }
}
auto eventhandler = std::make_shared<MyEventHandler>();
engine->setEventHandler(eventhandler);
```

开发者可根据回调内的 “state” 参数是否在 “正在请求推流状态” 来大体判断用户的推流网络情况。“state” 参数的取值与用户推流状态对应如下:

|枚举值|说明|
|-|-|
|ZEGO_PUBLISHER_STATE_NO_PUBLISH|未推流状态，在推流前处于该状态。如果推流过程出现稳态的异常，例如 AppID 和 AppSign 不正确，或者如果其他用户已经在推送流，推送相同流 ID 的流会失败，都会进入未推流状态|
|ZEGO_PUBLISHER_STATE_PUBLISH_REQUESTING |正在请求推流状态，推流操作执行成功后会进入正在请求推流状态，通常通过该状态进行 UI 界面的展示。如果因为网络质量不佳产生的中断，SDK 会进行内部重试，也会回到正在请求推流状态|
|ZEGO_PUBLISHER_STATE_PUBLISHING|正在推流状态，进入该状态表明推流已经成功，用户可以正常通信|

参数 “extendedData” 为状态更新附带的扩展信息。若使用 ZEGO 的 CDN 内容分发网络，在推流成功后，该参数的内容的键为 “flv_url_list”、“rtmp_url_list”、“hls_url_list”。这些对应 flv、rtmp、hls 协议的拉流 URL。

#### 拉流状态变更回调
在拉流成功后，开发者可通过 [onPlayerStateUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoEventHandler#on-player-state-update) 获取推流状态变更的通知。

调用示例如下：
```cpp
class MyEventHandler : public IZegoEventHandler{
public:
    void onPlayerStateUpdate(String streamID, ZegoPlayerState state, int errorCode, JSONObject extendedData){
        // 当 state 为 PLAYER_STATE_NO_PLAY 时，且 errcode 非 0，表示拉流失败，同时不会再进行重试拉流了，此时可在界面作出拉流失败提示；
        // 当 state 为 PLAYER_STATE_PLAY_REQUESTING 时，且 errcode 非 0，表示重试拉流，此时如果超出重试时间未成功拉到流会抛出拉流失败通知。
    }
}
auto eventhandler = std::make_shared<MyEventHandler>();
engine->setEventHandler(eventhandler);
```

开发者可根据 “state” 参数是否在 “正在请求拉流状态” 来大体判断用户的拉流网络情况。“state” 参数的取值与用户拉流状态对应如下:

|枚举值|说明|
|-|-|
|ZEGO_PLAYER_STATE_NO_PLAY|未拉流状态，在拉流前处于该状态。如果拉流过程出现稳态的异常，例如 AppID 和 AppSign 不正确，都会进入未拉流状态|
|ZEGO_PLAYER_STATE_PLAY_REQUESTING |正在请求拉流状态，拉流操作执行成功后会进入正在请求拉流状态，通常通过该状态进行应用界面的展示。如果因为网络质量不佳产生的中断，SDK 会进行内部重试，也会回到正在请求拉流状态|
|ZEGO_PLAYER_STATE_PLAYING|正在拉流状态，进入该状态表明拉流已经成功，用户可以正常通信|

### 音视频首帧回调
#### 推流端音频采集首帧回调
开发者可通过注册 [onPublisherCapturedAudioFirstFrame](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoEventHandler#on-publisher-captured-audio-first-frame) 接收音频首帧回调。调用推流接口成功后，SDK 采集到第一帧音频数据时会收到此回调。

调用示例如下：
```cpp
class MyEventHandler : public IZegoEventHandler{
public:
    void onPublisherCapturedAudioFirstFrame(){

    }
}
auto eventhandler = std::make_shared<MyEventHandler>();
engine->setEventHandler(eventhandler);
```

<Note title="说明">


在未推流或未预览的情况下，首次推流或首次预览，即 SDK 内部的音视频模块的引擎启动时，会去采集本机设备的音频数据，会收到该回调。开发者可根据该回调判断 SDK 是否真的采集到音频数据，若未收到该回调，说明音频采集设备被占用或异常。


</Note>



#### 推流端视频采集首帧回调
开发者可通过注册 [onPublisherCapturedVideoFirstFrame](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoEventHandler#on-publisher-captured-video-first-frame) 接收视频首帧回调。调用推流接口成功后, SDK 采集到第一帧视频数据时会收到此回调。

调用示例如下：
```cpp
class MyEventHandler : public IZegoEventHandler{
public:
    void onPublisherCapturedVideoFirstFrame(ZegoPublishChannel channel){

    }
}
auto eventhandler = std::make_shared<MyEventHandler>();
engine->setEventHandler(eventhandler);
```

<Note title="说明">


在未推流或未预览的情况下，首次推流或首次预览，即 SDK 内部的音视频模块的引擎启动时，会去采集本机设备的视频数据，会收到该回调。开发者可根据该回调判断 SDK 是否真的采集到视频数据，若未收到该回调，说明视频采集设备被占用或异常。


</Note>



#### 拉流端音频接收首帧回调
开发者可通过注册 [onPlayerRecvAudioFirstFrame](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoEventHandler#on-player-recv-audio-first-frame) 监听拉流段音频接收首帧回调。调用拉流接口成功后，SDK 拉流拉到第一帧音频数据时会收到此回调。

调用示例如下：
```cpp
class MyEventHandler : public IZegoEventHandler{
public:
    void onPlayerRecvAudioFirstFrame(String streamID){

    }
}
auto eventhandler = std::make_shared<MyEventHandler>();
engine->setEventHandler(eventhandler);
```
#### 拉流端视频接收首帧回调
开发者可通过注册 [onPlayerRecvVideoFirstFrame](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoEventHandler#on-player-recv-video-first-frame) 监听拉流段接收视频首帧回调。调用拉流接口成功后，SDK 拉流拉到第一帧视频数据时会收到此回调。

调用示例如下：

```cpp
class MyEventHandler : public IZegoEventHandler{
public:
    void onPlayerRecvVideoFirstFrame(String streamID)(ZegoPublishChannel channel){

    }
}
auto eventhandler = std::make_shared<MyEventHandler>();
engine->setEventHandler(eventhandler);
```
#### 拉流端渲染完视频首帧回调
开发者可通过注册 [onPlayerRenderVideoFirstFrame](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoEventHandler#on-player-render-video-first-frame) 监听拉流端渲染完视频首帧回调。调用拉流接口成功后，SDK 拉流并渲染完第一帧视频数据后会收到此回调。

调用示例如下：
```cpp
class MyEventHandler : public IZegoEventHandler{
public:
    void onPlayerRenderVideoFirstFrame{

    }
}
auto eventhandler = std::make_shared<MyEventHandler>();
engine->setEventHandler(eventhandler);
```

<Note title="说明">


开发者可用该回调来统计首帧耗时或更新播放流的 UI 组件。


</Note>



### 监控视频分辨率变化
#### 采集视频分辨率变更回调
开发者可通过注册 [onPublisherVideoSizeChanged](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoEventHandler#on-publisher-video-size-changed) 监听采集视频大小变更回调。推流成功后，在推流中途如果有改变视频采集分辨率发生变化将会收到此回调。

<Note title="说明">

当在未推流或未预览的情况下，首次推流或首次预览，即 SDK 内部的音视频模块的引擎启动时，会去采集本机设备的视频数据，此时采集分辨率会改变。

</Note>



调用示例如下：
```cpp
class MyEventHandler : public IZegoEventHandler{
public:
    void onPublisherVideoSizeChanged(int width, int height, ZegoPublishChannel channel){

    }
}
auto eventhandler = std::make_shared<MyEventHandler>();
engine->setEventHandler(eventhandler);
```

<Note title="说明">


开发者可以根据此回调来去除本地预览的 UI 的遮盖等类似操作。也可以根据该回调的分辨率来动态调整预览视图的比例等。


</Note>



#### 拉流分辨率变更通知
开发者可通过注册 [onPlayerVideoSizeChanged](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoEventHandler#on-player-video-size-changed) 获取拉流分辨率变更通知。拉流成功后，在拉流中途如果有视频分辨率发生变化将会收到此回调，用户可根据流的最终分辨率调整显示。

<Warning title="注意">


若拉的是流只有音频数据，会收不到该回调。


</Warning>


调用示例如下：

```cpp
class MyEventHandler : public IZegoEventHandler{
public:
    void onPlayerVideoSizeChanged(String streamID, int width, int height){

    }
}
auto eventhandler = std::make_shared<MyEventHandler>();
engine->setEventHandler(eventhandler);
```

<Note title="说明">


若推流端由于网络问题触发 SDK 内部的流量控制时，可能会动态减小推流端的编码分辨率，此时也会收到此回调。


</Note>



<Note title="说明">


所拉的音视频流真正渲染到所设置 UI 播放界面时会触发此回调。开发者可利用该回调通知来更新或切换真正播放流的 UI 组件。


</Note>



### 监控 CDN 转推状态
#### 添加/删除转推 CDN 地址状态回调
开发者可通过注册 [onPublisherRelayCDNStateUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoEventHandler#on-publisher-relay-cdn-state-update) 获取添加/删除转推 CDN 地址状态回调。在 ZEGO RTC 服务器将音视频流转推到 CDN 后，如果 CDN 转推状态发生变化，例如出现转推停止或转推重试，将会收到此回调。

调用示例如下：

```cpp
class MyEventHandler : public IZegoEventHandler{
public:
    void onPublisherRelayCDNStateUpdate(String streamID, ArrayList<ZegoStreamRelayCDNInfo> infoList){

    }
}
auto eventhandler = std::make_shared<MyEventHandler>();
engine->setEventHandler(eventhandler);
```

<Note title="说明">


开发者可根据该回调判断转推 CDN 的音视频流是否正常，若不正常根据异常原因进一步定位转推 CDN 的音视频流异常的原因，以及做对应的容灾策略。


</Note>



<Note title="说明">


若对异常的原因不了解，可联系 ZEGO 技术人员分析具体异常的原因。


</Note>



#### 转推 CDN 信息详解
转推 CDN 信息 [ZegoStreamRelayCDNInfo](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~struct~ZegoStreamRelayCDNInfo) 包含了 CDN 推流的 URL，转推状态，转推状态变更的原因状态发生的时间。[ZegoStreamRelayCDNInfo](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~struct~ZegoStreamRelayCDNInfo) 内所有参数如下：

|参数名|说明|
|-|-|
|url|CDN 推流的 URL|
|state|转推状态|
|updateReason|转推状态变更的原因|
|stateTime|状态发生的时间|

其中，state取值如下：

|枚举值|说明|
|-|-|
|ZEGO_STREAM_RELAY_CDN_STATE_NO_RELAY|未转推状态，在转推前处于该状态。如果转推过程出现持续的异常，例如转推地址不正确，都会进入未转推状态。|
|ZEGO_STREAM_RELAY_CDN_STATE_RELAY_REQUESTING|正在请求转推状态，转推操作执行成功后会进入正在请求转推状态，通常通过该状态进行应用界面的展示。如果因为网络质量不佳产生的中断，SDK 会进行内部重试，也会回到正在转推状态。|
|ZEGO_STREAM_RELAY_CDN_STATE_RELAYING|正在转推状态，进入该状态表明转推已成功。|

updateReason 取值如下：

|枚举值|说明|
|-|-|
|ZEGO_STREAM_RELAY_CDN_UPDATE_REASON_NONE|无|
|ZEGO_STREAM_RELAY_CDN_UPDATE_REASON_SERVER_ERROR|服务器错误|
|ZEGO_STREAM_RELAY_CDN_UPDATE_REASON_HANDSHAKE_FAILED|握手失败|
|ZEGO_STREAM_RELAY_CDN_UPDATE_REASON_ACCESS_POINT_ERROR|接入点错误|
|ZEGO_STREAM_RELAY_CDN_UPDATE_REASON_CREATE_STREAM_FAILED|创建流失败|
|ZEGO_STREAM_RELAY_CDN_UPDATE_REASON_BAD_NAME|BAD NAME|
|ZEGO_STREAM_RELAY_CDN_UPDATE_REASON_CDN_SERVER_DISCONNECTED|CDN 服务器主动断开|
|ZEGO_STREAM_RELAY_CDN_UPDATE_REASON_DISCONNECTED|主动断开|
|ZEGO_STREAM_RELAY_CDN_UPDATE_REASON_MIX_STREAM_ALL_INPUT_STREAM_CLOSED|混流的全部输入流会话关闭|
|ZEGO_STREAM_RELAY_CDN_UPDATE_REASON_MIX_STREAM_ALL_INPUT_STREAM_NO_DATA|混流的全部输入流没有数据|
|ZEGO_STREAM_RELAY_CDN_UPDATE_REASON_MIX_STREAM_SERVER_INTERNAL_ERROR|混流服务器内部错误|

## API 参考列表

| 方法 | 描述 |
|-------|--------|
| [onPublisherQualityUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoEventHandler#on-publisher-quality-update) | 推流质量回调 |
| [onPlayerQualityUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoEventHandler#on-player-quality-update) | 拉流质量更新回调 |
| [onPublisherStateUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoEventHandler#on-publisher-state-update)| 推流状态回调 |
| [onPlayerStateUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoEventHandler#on-player-state-update)| 拉流状态回调 |
| [onPublisherCapturedAudioFirstFrame](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoEventHandler#on-publisher-captured-audio-first-frame) | 推流端音频采集首帧回调 |
| [onPublisherCapturedVideoFirstFrame](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoEventHandler#on-publisher-captured-video-first-frame) | 推流端视频采集首帧回调 |
| [onPlayerRecvAudioFirstFrame](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoEventHandler#on-player-recv-audio-first-frame) | 拉流端音频接收首帧回调 |
| [onPlayerRecvVideoFirstFrame](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoEventHandler#on-player-recv-video-first-frame) | 拉流端视频接收首帧回调 |
| [onPlayerRenderVideoFirstFrame](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoEventHandler#on-player-render-video-first-frame) | 拉流端渲染完视频首帧回调 |
| [onPublisherVideoSizeChanged](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoEventHandler#on-publisher-video-size-changed)| 采集视频大小变更回调 |
| [onPlayerVideoSizeChanged](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoEventHandler#on-player-video-size-changed) | 拉流分辨率变更通知 |
| [onPublisherRelayCDNStateUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoEventHandler#on-publisher-relay-cdn-state-update) | 添加/删除转推 CDN 地址状态回调 |
| [onPlayerRecvSEI](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~IZegoEventHandler#on-player-recv-sei) | 收到远端流的 SEI 内容 |
