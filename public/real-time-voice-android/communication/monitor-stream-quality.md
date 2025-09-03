# 通话质量监测

- - -

## 功能简介

在推拉流过程中，用户可通过注册相关的回调以监听具体的推拉流的质量。

## 使用步骤

### 监控推流质量

- 接口原型

    ```java
    /**
     * 推流质量回调
     *
     * 推流成功后每3秒会收到此回调，通过该回调可以获取推送的音视频流的采集帧率，码率，RTT，丢包率等质量数据。
     * 开发者可根据该接口的质量参数实时监控推送的音视频流的健康情况，以便在设备 UI 界面上实时展示上行网络状况。
     * 若开发者不清楚该回调接口的各个参数应该如何使用，可以只关注其中的 quality 参数的 level 字段，这是 ZegoExpressEngine 内部根据质量参数计算的一个描述上行网络的综合值。level 字段的说明如下：ZegoStreamQualityLevelExcellent: 流质量极好；ZegoStreamQualityLevelGood: 流质量好；ZegoStreamQualityLevelMedium: 流质量正常；ZegoStreamQualityLevelBad: 流质量差；ZegoStreamQualityLevelDie: 流质量异常。
     * @param streamID 推流的流 ID
     * @param quality 推流质量，包含了音视频帧率、码率，RTT 等值
     */
    public void onPublisherQualityUpdate(String streamID, ZegoPublishStreamQuality quality){

    }
    ```

- 调用示例

    ```java
    class MyEventHandler extends IZegoEventHandler
    {
        public void onPublisherQualityUpdate(String streamID, ZegoPublishStreamQuality quality) {
            // 开发者可以在此回调中监控具体的质量以上报到业务服务器做监控，或者监控质量对象的某个字段以给用户友好的提示
            // 若开发者不知道监控质量哪个字段可以关注 level 字段，这个字段是质量对象的综合值
            Log.v("onPublisherQualityUpdate: streamID=", streamID);
        }
    }
    ```

### 推流质量详解

推流质量包含了采集、编码阶段音视频流的帧率，传输（发送）的音视频流的帧率、码率、延时及丢包率。具体定义如下：

```java
public class ZegoPublishStreamQuality {

    /** 视频采集帧率，单位为 f/s */
    public double videoCaptureFPS;

    /** 视频编码帧率，单位为 f/s */
    public double videoEncodeFPS;

    /** 视频发送帧率，单位为 f/s */
    public double videoSendFPS;

    /** 视频码率，单位为 kbps */
    public double videoKBPS;

    /** 音频采集帧率，单位为 f/s */
    public double audioCaptureFPS;

    /** 音频发送帧率，单位为 f/s */
    public double audioSendFPS;

    /** 音频码率，单位为 kbps */
    public double audioKBPS;

    /** 本端至服务端的延迟，单位为毫秒 */
    public int rtt;

    /** 丢包率，单位为百分比，0.0 ~ 1.0 */
    public double packetLostRate;

    /** 推流质量级别 */
    public ZegoStreamQualityLevel level;

    /** 是否开启硬件编码 */
    public boolean isHardwareEncode;

    /** 视频编码格式 */
    public ZegoVideoCodecID videoCodecID;

    /** 已发送的总字节数，包括音频、视频和SEI等 */
    public double totalSendBytes;

    /** 已发送的音频字节数 */
    public double audioSendBytes;

    /** 已发送的视频字节数 */
    public double videoSendBytes;

}
```

#### 推流采集质量

推流采集质量贴近用户预览时的主观感受，推流时 SDK 在采集阶段的音视频质量的相关参数如下：

- audioCaptureFPS：音频采集帧率（fps）
- videoCaptureFPS：视频采集帧率（fps）

#### 推流编码质量

推流时 SDK 在编码阶段的音视频质量的相关参数如下：

videoEncodeFPS：当前编码器的目标视频编码帧率（fps）

#### 推流发送质量

推流发送质量是实际推流的质量，与设置的编码和实际的网络质量有关，相关成员如下：

- audioSendFPS：实际的音频发送帧率（fps）
- audioKBPS：实际的音频发送码率（kbps）
- videoSendFPS：实际的视频发送帧率（fps）
- videoKBPS：实际的视频发送码率（kbps）
- rtt：设备到 ZEGO Server 的往返延时（ms）
- packetLostRate：设备上行丢包率

### 监控拉流质量

- 接口原型

    ```java
    /**
     * 拉流质量回调
     *
     * 拉流成功后每3秒会收到此回调，通过该回调可以获取拉取的音视频流的帧率，码率，RTT，丢包率等质量数据，实时监控拉取流的健康情况。
     * 开发者可根据该接口的质量参数实时监控拉取的音视频流的健康情况，以便在设备 UI 界面上实时展示下行网络状况。
     * 若开发者不清楚该回调接口的各个参数应该如何使用，可以只关注其中的 quality 参数的 level 字段，这是 ZegoExpressEngine 内部根据质量参数计算的一个描述下行网络的综合值。level 字段的说明如下：ZegoStreamQualityLevelExcellent: 流质量极好；ZegoStreamQualityLevelGood: 流质量好；ZegoStreamQualityLevelMedium: 流质量正常；ZegoStreamQualityLevelBad: 流质量差；ZegoStreamQualityLevelDie: 流质量异常。
     * @param streamID 拉流的流 ID
     * @param quality 拉流质量，包含了音视频帧率、码率，RTT 等值
     */
    public void onPlayerQualityUpdate(String streamID, ZegoPlayStreamQuality quality){

    }
    ```

- 调用示例

    ```java
    class MyEventHandler extends IZegoEventHandler
    {
        public void onPlayerQualityUpdate(String streamID, ZegoPlayStreamQuality quality) {
            // 开发者可以在此回调中监控具体的质量以上报到业务服务器做监控，或者监控质量对象的某个字段以给用户友好的提示
            // 若开发者不知道监控质量哪个字段可以关注 level 字段，这个字段是质量对象的综合值
            Log.v("onPlayerQualityUpdate: streamID=", streamID);
        }
    }
    ```

### 拉流质量详解

拉流质量包含了接收的音视频流的帧率、码率、延时和丢包率，解码阶段音视频流的帧率，以及渲染阶段的帧率、卡顿率、音视频整体质量。具体定义如下：

```java
public class ZegoPlayStreamQuality {

    /** 视频接收帧率，单位为 f/s */
    public double videoRecvFPS;

    /** 视频抗抖动帧率，单位为 f/s */
    public double videoDejitterFPS;

    /** 视频解码帧率，单位为 f/s */
    public double videoDecodeFPS;

    /** 视频渲染帧率，单位为 f/s */
    public double videoRenderFPS;

    /** 视频码率，单位为 kbps */
    public double videoKBPS;

    /** 视频卡顿率，单位为（卡顿次数/每10秒） */
    /** 超过 500ms 没有数据播放，即为一次视频卡顿 */
    public double videoBreakRate;

    /** 音频接收帧率，单位为 f/s */
    public double audioRecvFPS;

    /** 音频抗抖动帧率，单位为 f/s */
    public double audioDejitterFPS;

    /** 音频解码帧率，单位为 f/s */
    public double audioDecodeFPS;

    /** 音频渲染帧率，单位为 f/s */
    public double audioRenderFPS;

    /** 音频码率，单位为 kbps */
    public double audioKBPS;

    /** 音频卡顿率，单位为（卡顿次数/每10秒） */
    /** 连续丢 3 帧且在给定卡顿阈值内无音频数据渲染，即为一次音频卡顿 */
    public double audioBreakRate;

    /** 服务端至本端的延迟，单位为毫秒 */
    public int rtt;

    /** 丢包率，单位为百分比，0.0 ~ 1.0 */
    public double packetLostRate;

    /** 端到端延迟，单位为毫秒 */
    public int peerToPeerDelay;

    /** 端到端丢包率，单位为百分比，0.0 ~ 1.0 */
    public double peerToPeerPacketLostRate;

    /** 拉流质量级别 */
    public ZegoStreamQualityLevel level;

    /** 本端接收到数据后到播放的延迟，单位为毫秒 */
    public int delay;

    /** 视频时间戳相对于音频时间戳的差值，用于反映音画同步情况，单位为毫秒。此值小于 0 表示视频超前音频的毫秒数, 大于 0 表示视频滞后音频的毫秒数, 等于0表示无差别。 当绝对值小于200，可基本认为音画同步，当绝对值连续 10 秒大于 200 可以认为异常 */
    public int avTimestampDiff;

    /** 是否开启硬件解码 */
    public boolean isHardwareDecode;

    /** 视频编码格式 */
    public ZegoVideoCodecID videoCodecID;

    /** 已接收的总字节数，包括音频、视频和 SEI 等 */
    public double totalRecvBytes;

    /** 已接收的音频字节数 */
    public double audioRecvBytes;

    /** 已接收的视频字节数 */
    public double videoRecvBytes;

}
```

#### 拉流接收质量

拉流接收质量是实际的拉流质量，与实际的推流质量和当前的网络质量相关。相关参数如下：

- audioRecvFPS：实际接收的音频帧率（fps）
- audioKBPS：实际接收的音频码率（kbps）
- audioBreakRate：实际接收的音频卡顿率（卡顿次数/每10秒）
- videoKBPS：实际接收的视频码率（kbps）
- videoRecvFPS：实际接收的视频帧率（fps）
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
| [onPublisherQualityUpdate](https://doc-zh.zego.im/zh/api?doc=Express_Video_SDK_API~Java~class~im-zego-zegoexpress-callback-i-zego-event-handler#on-publisher-quality-update) | 推流质量回调 |
| [onPlayerQualityUpdate](https://doc-zh.zego.im/zh/api?doc=Express_Video_SDK_API~Java~class~im-zego-zegoexpress-callback-i-zego-event-handler#on-player-quality-update) | 拉流质量更新回调 |
