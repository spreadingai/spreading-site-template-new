<Title>如何理解和使用 SEI（媒体补充增强信息）？</Title>



- - -

## 使用场景

当开发者对消息发送有较高频率和实时性要求，且消息丢失不会影响业务逻辑时，推荐使用 SEI（Supplemental Enhancement Information，媒体补充增强信息）。主要应用于如下场景：
- 单向发送大并发 IM 的场景
- 需要文本信息跟媒体流实时同步的场景，例如:
  - 直播答题
  - 歌词同步
  - 单流自定义音浪
  - 混流视频画面布局更换的精准控制

媒体补充增强信息具有如下优缺点：

- 优点：实时性高；文本信息和媒体流同步；接收方没有人数限制，拉流则能收到。 

- 缺点：由于媒体流的传输协议为 UDP 协议，存在丢包的可能性。当某个视频帧在传输过程中丢失时，将导致该视频帧上的媒体补充增强信息也会一起丢失。

## 概念解释

<Note title="说明">


H.264 和 H.265 编码都支持使用 SEI，下文以 H.264 为例进行说明。

</Note>



#### H.264 原始码流组成结构

H.264 原始码流（裸流）是由一个接一个 NALU 组成。它的功能分为两层，VCL（视频编码层）和 NAL（网络提取层）。

为了方便从字节流中提取出 NALU，协议规定，在每个 NALU 的前面加上起始码（StartCode）: 0x000001 或 0x00000001。

#### NALU 组成结构

NALU（NAL Unit）= 一组对应于视频编码的 NALU 头部信息（NAL header）+ 一个 RBSP（Raw Byte Sequence Payload，原始字节序列负荷）

<Frame width="512" height="auto" caption=""><Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/FAQ/NALU_structure.png" /></Frame></Frame> 

#### NALU Header 组成结构

NALU Header 由 8 bit 组成，其中最后的 5 bit 表示 NAL Unit Type，具体结构⻅下图： 

<Frame width="512" height="auto" caption=""><Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/FAQ/Header_structure.png" /></Frame></Frame>

NAL Unit Type 常⻅类型如下：

| NAL Unit Type |  NAL Unit Content  | 
|---------|--------|
|  1  | 非 IDR 图像，且不采用数据划分的片段。   |
|  5  | IDR 图像。   |
|  6  | 补充增强信息（SEI）。  | 
|  7  | 序列参数集（SPS）。  | 
|  8  | 图像参数集（PPS）。  | 
|  11 | 流结束符。    | 

#### SEI payload type 计算方式

当开始解析类型为 SEI 的 NAL 时，在 RBSP 中持续读取 8 bit，直到非 0xff 为止，然后把读取的数值累加，累加值即为 SEI payload type。 

SEI RBSP 结构图如下：

<Frame width="512" height="auto" caption=""><Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/FAQ/RBSP_structure.png" /></Frame></Frame>

#### SEI payload size 计算方式

读取 SEI payload size 的逻辑与 SEI payload type 类似，即读取到非 0xff 为止，这样可以支持任意⻓度的 SEI payload 添加。假设 SEI payload type 后面的字符序列是 FF FF AA BB ....，则 FF FF AA 将会解析成 SEI payload size，为 255 + 255 + 170 = 680。


## 内部关键实现

#### 媒体补充增强信息的注入和提取时机

注入时机：编码后，网络传输之前。 

提取时机：Jitter 缓冲后，解码之前。

优点如下：
1. 一套代码实现次媒体方式打包和 SEI 方式打包的媒体补充增强信息的注入逻辑和提取逻辑。
2. 没有视频模块，缺少视频编码模块的情况下，可以正常发送媒体补充增强信息。 
3. 方便实现自定义格式的 NALU 组装和拆箱。

缺点如下:
编码器编码完一个 NALU 时，会检测 NALU 内部是否出现关键字序列，如“StartCode”，并做“防止竞争”处理。而 ZEGO 并没有做该实现，而是内部报错误，拦截这次媒体补充增强信息的发送。

#### 4K 限制

媒体补充增强信息主要使用于文本信息传输，为了保证不占用过多的带宽，ZEGO 现在传入的 inData 总⻓度，不能大于 4096 Bytes。 

#### 驱动传输媒介

- 音视频

音视频场景下，将会以视频去驱动媒体补充增强信息的传输，时间戳使用的是视频的时间戳。
在视频编码器 编出一帧后，会将发送队列中的每一个媒体补充增强信息分别组装成一个个 NALU，并用于发送传输。 由于以视频编码去驱动媒体补充增强信息发送，所以此时如果视频编码器不出帧（如关闭摄像头），将会导致媒体补充增强信息不能正常发送。

- 纯音频 

纯音频场景下，将会以音频去驱动媒体补充增强信息的传输，时间戳使用的是音频的时间戳。
在音频编码器编出一帧后，会将发送队列中的每一个媒体补充增强信息分别组装成一个个 NALU，并用于发送传输。 

不同的音频编码格式，编码帧率不一样。如 AAC-LC 的编码帧率为 20 ～ 25 帧，OPUS 的编码帧率约为 50 帧。以音频去驱动，并且使用 OPUS 编码，可以支持每秒 50 条信息。 由音频来驱动媒体补充增强信息的传输，将会忽略视频流传输。 

如果以音频去驱动媒体补充增强信息的传输，若此时发送视频，则视频帧的时间戳将会有两种（基于音频的时间戳和基于视频的时间戳）。由于不同设备和进程等因素的影响，音频时间戳和视频时间戳两种有一定差距，有可能会出现时间倒退的情况。

同理可以解析为什么不支持纯音频驱动和视频驱动媒体补充增强信息的切换。

下图显示允许中途切换的情况下，发送时间倒退的问题：

<Frame width="512" height="auto" caption=""><Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/FAQ/Video_driver.png" /></Frame></Frame>

#### 单帧发送和随视频帧发送的区别

- 单帧发送：每一个承载着媒体补充增强信息的 NALU，都会单独以一个视频帧的形式发送传输。

- 随视频帧发送：将需要传输的媒体补充增强信息 NALU 插入到视频帧的原始码流后面。  

#### 发送队列大小限制

媒体补充增强信息发送端，内部发送队列最多维护 10 条媒体补充增强信息.假设没有媒介去驱动媒体补充增强信息的发送或者媒体补充增强信息发送的频率过于频繁，在驱动传输间隔时间内，插入多于 10 条媒体补充增强信息，不能插入到发送队列的媒体补充增强信息将会直接抛弃。 

#### SideInfoZegoDefined 结构

<Frame width="512" height="auto" caption=""><Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/FAQ/SideInfoZegoDefined_structure.png" /></Frame></Frame>

#### 接收端数据封装

为了兼容 SideInfoZegoDefined 的结构，接收端在接收到媒体补充增强信息后，会封装成如下格式：

<Frame width="512" height="auto" caption=""><Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/FAQ/MediaType_structure.png" /></Frame></Frame>

MediaType 常⻅类型如下: 

| MediaType |  NAL Unit Content  | 
|---------|--------|
|  1001  | SDK 采用次媒体方式打包的媒体信息。   | 
|  1003  | 混流服务器打包的 Layout 信息。   | 
|  1004  | SEI 中 payload type = 5 的信息，即开启发送媒体补充增强信息开关时 “mediaInfoType” 参数设置为 “SeiUserUnregisted”。   | 
|  1005  |  SEI 中 payload type = 243 的信息，即开启发送媒体补充增强信息开关时 “mediaInfoType” 参数设置为 “SeiZegoDefined”。  |

## 相关参考

详细的功能介绍和实现流程请参考“媒体补充增强信息”，各平台相关链接如下。   

- iOS：[媒体补充增强信息](/real-time-video-ios-oc/communication/sei)
- Android：[媒体补充增强信息](/real-time-video-android-java/communication/sei)
- macOS：[媒体补充增强信息](/real-time-video-macos-oc/communication/sei)
- Windows：[媒体补充增强信息](/real-time-video-windows-cpp/communication/sei)
- Flutter：[媒体补充增强信息](/real-time-video-flutter/communication/sei)
