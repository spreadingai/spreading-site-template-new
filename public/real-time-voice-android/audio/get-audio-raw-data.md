# 原始音频数据获取

- - -

## 功能简介

SDK 为开发者提供了获取原始音频数据的功能，获取的原始音频数据格式为 PCM，开发者可以将此数据写到本地设备中，实现录制音频。

## 示例源码下载

请参考 [下载示例源码](https://doc-zh.zego.im/article/3583) 获取源码。

相关源码请查看 “/ZegoExpressExample/AdvancedAudioProcessing/src/main/java/im/zego/advancedaudioprocessing/originalaudiodataacquisition” 目录下的文件。

## 前提条件

在获取原始音频数据之前，请确保：

- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppID 和 AppSign，详情请参考 [控制台 - 项目信息](/console/project-info)。
- 已在项目中集成 ZEGO Express SDK，并实现了基本的音视频推拉流功能，详情请参考 [快速开始 - 集成](https://doc-zh.zego.im/article/3575) 和 [快速开始 - 实现流程](https://doc-zh.zego.im/article/7636)。



## 使用步骤

### 1 初始化 SDK

请参考 [快速开始 - 实现流程](https://doc-zh.zego.im/article/7636#CreateEngine) 的 “创建引擎”。

### 2 开启获取原始音频数据功能

开发者可调用 [startAudioDataObserver ](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~java_android~class~ZegoExpressEngine#start-audio-data-observer) 接口，开启原始音频数据回调监测。回调的音频数据类型为 [ZegoAudioDataCallbackBitMask](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~java_android~enum~ZegoAudioDataCallbackBitMask)，包括有 `CAPTURED`、`PLAYBACK`、`MIXED`、`PLAYER`，这四个回调类型都需要开启。

```java
// 开启获取原始音频数据功能
ZegoAudioFrameParam param=new ZegoAudioFrameParam();
param.channel = ZegoAudioChannel.STEREO;
param.sampleRate = ZegoAudioSampleRate.ZEGO_AUDIO_SAMPLE_RATE_8K;
int bitmask = 0;
// 添加 bitmask，开启采集到音频数据到回调开关。
// 采集、播放、混合、拉流对应的位掩码值分别是：CAPTURED=1，PLAYBACK=2，MIXED=4，PLAYER=8，bitmask 最终得到的值为 15，表示会同时触发采集、播放、混合、拉流的原始数据回调。
bitmask |= ZegoAudioDataCallbackBitMask.CAPTURED.value();
bitmask |= ZegoAudioDataCallbackBitMask.PLAYBACK.value();
bitmask |= ZegoAudioDataCallbackBitMask.MIXED.value();
bitmask |= ZegoAudioDataCallbackBitMask.PLAYER.value();
engine.startAudioDataObserver(bitmask, param);
```
<Accordion title="位掩码的使用" defaultOpen="false">


**应用场景**

程序中的所有数在计算机内存中都是以二进制的形式储存，而位运算则是直接对整数在内存中的二进制位进行操作。

| 符号   | 含义         | 运算规则                                                                 | 举例                                                         |
| ------ | ------------ | ------------------------------------------------------------------------ | ------------------------------------------------------------ |
| &      | 与           | 两个位都为 1 时，结果才为 1。                                            | 0&1=0，1&1=1。                                               |
| \|     | 或           | 两个位都为 0 时，结果才为 0。                                            | 0\|0=0，0\|1=1。                                             |
| ^      | 异或         | 两个位相同为 0，相异为 1。                                               | 1^1=0，0^1=1。                                               |
| ~      | 取反         | 0 变 1，1 变 0。                                                        | ~1=0，~0=1。                                                 |
| \<\<     | 左移         | 按二进制形式把所有的数字向左移动对应的位数，高位移出（舍弃），低位补零。 | 例如整数 3 的二进制为 00000011，3 \<\< 2 左移 2 位为 00001100。 |
| \>\>     | 带符号右移   | 按二进制形式把所有的数字向右移动对应位数，低位移出（舍弃），高位补符号位，即正数补零，负数补 1。 | 例如整数 3 的二进制为 00000011，3 \>\> 1 带符号右移 1 位为 00000001。 |
| \>\>\>    | 无符号右移   | 按二进制形式把所有的数字向右移动对应位数，低位移出（舍弃），高位补零。对于正数则和带符号右移规则相同，对于负数则不同。 | 例如整数 3 的二进制为 00000011，3 \>\>\> 1 带符号右移 1 位为 00000001。 |

SDK 主要利用位掩码（bitmask）原理实现多个开关的操作，即当 API 中需要进行模块开关的多选时，开发者需要向 SDK 传入位掩码结果。

**示例**

以获取原始音视频数据功能为例，不同语言的位掩码使用示例如下：

<CodeGroup>
```cpp C++
enum ZegoAudioDataCallbackBitMask
{
    /** 此属性控制 SDK 是否回调 [onCapturedAudioData] 方法 */
    ZEGO_AUDIO_DATA_CALLBACK_BIT_MASK_CAPTURED = 1 << 0,

    /** 此属性控制 SDK 是否回调 [onPlaybackAudioData] 方法 */
    ZEGO_AUDIO_DATA_CALLBACK_BIT_MASK_PLAYBACK = 1 << 1,

    /** 此属性控制 SDK 是否回调 [onMixedAudioData] 方法 */
    ZEGO_AUDIO_DATA_CALLBACK_BIT_MASK_MIXED = 1 << 2,

    /** 此属性控制 SDK 是否回调 [onPlayerAudioData] 方法 */
    ZEGO_AUDIO_DATA_CALLBACK_BIT_MASK_PLAYER = 1 << 3
};

// 打开 SDK 获取原始音频数据功能，指定 SDK 需要同时触发采集音频数据回调与播放音频数据回调
unsigned int bitmask = ZEGO_AUDIO_DATA_CALLBACK_BIT_MASK_CAPTURED | ZEGO_AUDIO_DATA_CALLBACK_BIT_MASK_PLAYBACK;
engine->startAudioDataObserver(bitmask, param);
```

```objc Objective-C
typedef NS_OPTIONS(NSUInteger, ZegoAudioDataCallbackBitMask) {
    /// 此属性控制 SDK 是否回调 [onCapturedAudioData] 方法
    ZegoAudioDataCallbackBitMaskCaptured = 1 << 0,
    /// 此属性控制 SDK 是否回调 [onPlaybackAudioData] 方法
    ZegoAudioDataCallbackBitMaskPlayback = 1 << 1,
    /// 此属性控制 SDK 是否回调 [onMixedAudioData] 方法
    ZegoAudioDataCallbackBitMaskMixed = 1 << 2,
    /// 此属性控制 SDK 是否回调 [onPlayerAudioData] 方法
    ZegoAudioDataCallbackBitMaskPlayer = 1 << 3
};

// 打开 SDK 获取原始音频数据功能，指定 SDK 需要同时触发采集音频数据回调与播放音频数据回调
ZegoAudioDataCallbackBitMask bitmask = ZegoAudioDataCallbackBitMaskCaptured | ZegoAudioDataCallbackBitMaskPlayback;
[[ZegoExpressEngine sharedEngine] startAudioDataObserver:bitmask param:param];
```

```java Java
public enum ZegoAudioDataCallbackBitMask {
    /** 此属性控制 SDK 是否回调 [onCapturedAudioData] 方法 */
    CAPTURED(1 << 0),
    /** 此属性控制 SDK 是否回调 [onPlaybackAudioData] 方法 */
    PLAYBACK(1 << 1),
    /** 此属性控制 SDK 是否回调 [onMixedAudioData] 方法 */
    MIXED(1 << 2),
    /** 此属性控制 SDK 是否回调 [onPlayerAudioData] 方法 */
    PLAYER(1 << 3);
}

// 打开 SDK 获取原始音频数据功能，指定 SDK 需要同时触发采集音频数据回调与播放音频数据回调
int bitmask = 0;
bitmask |= ZegoAudioDataCallbackBitMask.CAPTURED.value();
bitmask |= ZegoAudioDataCallbackBitMask.PLAYBACK.value();
engine.startAudioDataObserver(bitmask, param);
```
</CodeGroup>


</Accordion>
<Content />

### 3 设置回调接收原始音频数据并处理

开发者可调用 [setAudioDataHandler ](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~java_android~class~ZegoExpressEngine#set-audio-data-handler) 接口设置额外接收音频数据的回调。根据需要可实现回调 [onCapturedAudioData](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~java_android~class~IZegoAudioDataHandler#on-captured-audio-data)、[onPlaybackAudioData](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~java_android~class~IZegoAudioDataHandler#on-playback-audio-data)、[onMixedAudioData](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~java_android~class~IZegoAudioDataHandler#on-mixed-audio-data)、[onPlayerAudioData](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~java_android~class~IZegoAudioDataHandler#on-player-audio-data)，分别对应上述 [ZegoAudioDataCallbackBitMask](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~java_android~enum~ZegoAudioDataCallbackBitMask) 中的四个音频数据类型。

```java
// 设置原始音频数据回调
engine.setAudioDataHandler(new IZegoAudioDataHandler() {
	@Override
	public void onCapturedAudioData(ByteBuffer data, int dataLength, ZegoAudioFrameParam param) {
	// 本地采集音频数据，推流后可收到回调
	}

	@Override
	public void onPlaybackAudioData (ByteBuffer data, int dataLength, ZegoAudioFrameParam param) {
	// SDK 播放的音频数据，在非拉流状态的引擎启动状态且未使用媒体播放器播放媒体文件状态时，回调的音频数据是静音的音频数据
	}

	@Override
	public void onMixedAudioData(ByteBuffer data, int dataLength, ZegoAudioFrameParam param) {
	// 本地采集与 SDK 播放的声音混合后的音频数据回调
	}

	@Override
	public void onPlayerAudioData(ByteBuffer data, int dataLength, ZegoAudioFrameParam param, String streamID) {
	// 远端拉流音频数据，开始拉流后每条拉流数据的回调
	}
});
```

### 4 停止音频数据回调监测



若想停止音频数据回调监测，可调用 [stopAudioDataObserver ](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~java_android~class~ZegoExpressEngine#stop-audio-data-observer) 接口。

```java
engine.stopAudioDataObserver();
```

<Content />