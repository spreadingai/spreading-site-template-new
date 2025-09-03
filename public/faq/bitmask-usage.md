<Title>如何使用位掩码？</Title>




---

## 应用场景

程序中的所有数在计算机内存中都是以二进制的形式储存，而位运算则是直接对整数在内存中的二进制位进行操作。

| 符号|  含义  |  运算规则 | 举例 |
|---------|--------|--------|--------|
| & | 与 | 两个位都为 1 时，结果才为 1。 | 0&1=0，1&1=1。 |
| ｜ | 或 | 两个位都为 0 时，结果才为 0。 | 0｜0=0，0｜1=1。 |
| ^ | 异或 |  两个位相同为 0，相异为 11。 | 1^1=0，0^1=1。 |
| ~ | 取反 |0 变 1，1 变 0。 |~1=0， ~0=1。|
|  \<\<  | 左移   | 按二进制形式把所有的数字向左移动对应的位数，高位移出（舍弃），低位的空位补零。   | 例如整数 3 的二进制为 00000011 ，3 \<< 2 表示将数字 3 的二进制位左移 2 位，移位后的二进制为 00001100。|
|  >>  | 带符号右移   |  按二进制形式把所有的数字向右移动对应位数，低位移出（舍弃），高位的空位补符号位，即正数补零，负数补 1。 |  例如整数 3 的二进制为 00000011，3 >> 1 表示将数字 3 的二进制位带符号右移 1 位，移位后的二进制为 00000001。  |
|  >>>  | 无符号右移   |  按二进制形式把所有的数字向右移动对应位数，低位移出（舍弃），高位的空位补零。对于正数则和带符号右移规则相同，对于负数则不同。  | 例如整数 3 的二进制为 00000011，3 >> 1 表示将数字 3 的二进制位带符号右移 1 位，移位后的二进制为 00000001。  |

SDK 主要利用位掩码（bitmask）原理实现多个开关的操作，即当 API 中需要进行模块开关的多选时，开发者需要向 SDK 传入位掩码结果。

## 操作步骤

以获取原始音视频数据功能为例，不同语言的位掩码使用示例如下：

- **C++** 

```cpp
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

- **Objective-C**

```objc
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

- **Java**

```java
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
