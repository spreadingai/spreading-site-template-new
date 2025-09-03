# 发布日志

- - -

<Warning title="注意">

Web 播放器插件当前为 Beta 公测阶段，如果您有相关的问题或业务需求，请联系 ZEGO 技术支持咨询。

</Warning>


## 1.5.0 版本 <a id="1.5.0"></a>

**发布日期：2025-07-23**

**新增功能**

1. 支持获取播放器播放音频的实时音浪。

    相关 API 请参考：[enableSoundLevelMonitor](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressPlayer#enable-sound-level-monitor)

--- 

## 1.3.1 版本 <a id="1.3.1"></a>

**发布日期：2024-09-24**

**新增功能**

1. 播放器流质量数据新增接收字节数相关字段，用于统计流量数据

    通过 [getPlayQuality](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressPlayer#get-play-quality) 和 [onResetPlayQuality](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressPlayer#on-reset-play-quality) 获取的播放器流质量数据 [QualityStats](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~QualityStats)，增加接收字节数相关字段，包括接收到的数据总字节数、视频数据字节数、音频数据字节数、SEI 数据字节数。

    相关 API 请参考：[totalRecvBytes](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~QualityStats#total-recv-bytes)、[videoRecvBytes](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~QualityStats#video-recv-bytes)、[audioRecvBytes](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~QualityStats#audio-recv-bytes)、[seiRecvBytes](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~QualityStats#sei-recv-bytes)


2. 新增 [onResetPlayQuality](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressPlayer#on-reset-play-quality) 回调接口

    播放器重置流质量数据时，会触发 [onResetPlayQuality](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressPlayer#on-reset-play-quality) 回调，并返回重置前最终的流质量数据。以避免用 [getPlayQuality](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressPlayer#get-play-quality) 无法获取最终的流质量数据。

    相关 API 请参考：[onResetPlayQuality](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressPlayer#on-reset-play-quality)

3. 新增 [onRecvSEI](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressPlayer#on-recv-sei) 回调接口

    当播放器收到 SEI 数据时，会触发该回调。

    相关 API 请参考：[onRecvSEI](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressPlayer#on-recv-sei)

**问题修复**

1. 修复调用 [stop](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressPlayer#stop) 方法，并通过 [src](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressPlayer#src) 设置拉取的 CDN 直播流的 URL 地址后，调用 [play](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressPlayer#play) 方法时，[onplay](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressPlayer#on-play) 概率性没有回调的问题
2. 修复调用 [stop](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressPlayer#stop) 方法后，[played](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressPlayer#played) 和 [QualityStats](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~QualityStats) 状态不对的问题
3. 修复 wasm.gz 文件解压异常的问题
4. 修复 WebCodecs 解码失败后，切换解码器异常的问题
5. 修复 [QualityStats](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~QualityStats) 中，下载码率和解码码率不准确的问题


---


## 1.3.0 版本 <a id="1.3.0"></a>

**发布日期：2024-03-21**

**新增功能**

1. 支持获取拉流质量

    新增获取拉流质量接口 [getPlayQuality](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressPlayer#get-play-quality)，便于开发者获取拉流质量回调后进行相关业务处理。

2. 支持设置缓冲 Buffer

    使用播放器插件拉流时，支持设置缓冲 Buffer，提高网络抖动时的音视频播放稳定性。

    相关 API 请参考 [setBufferInterval](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressPlayer#set-buffer-interval)

**问题修复**

1. 修复播放器插件长时间使用软解进行播放，内存溢出导致画面卡死的问题。

---

## 1.2.0 版本 <a id="1.2.0"></a>

**发布日期：2024-03-07**

**新增功能**

1. 支持 H.264 和 H.265 MSE 解码

    注意：

    - MSE（Media Source Extensions）解码不支持 iOS 移动设备，在 iOS 移动设备上使用时，默认自动回退到软解进行播放。
    - 部分设备或浏览器不支持 H.265 MSE 解码，会自动回退到软解进行播放。

    播放器插件的初始化配置 [ZegoExpressPlayerConfig.decodeType](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoExpressPlayerConfig#decode-type) 参数新增取值 “MSE”，用于指定优先使用 MSE 解码，播放媒体资源。

    播放器解码时，默认按照 “WebCodecs 硬解 > MSE 硬解 > 软解” 的优先级顺序进行解码播放。如果浏览器不支持某种解码方式，会自动回退到下一种方式。

**问题修复**

1. 修复了在某些 iOS 设备上渲染音频时，受到设备的静音按键影响，导致音频没声音的问题。

---


## 1.1.0 版本 <a id="1.1.0"></a>

**发布日期：2023-12-27**

**新增功能**

1. 支持 H.264 和 H.265 WebCodecs 硬件解码

    注意：该功支持在 PC 端和少数 Android 机型的 Chrome 浏览器上使用；对于部分不支持 H.265 WebCodecs 硬件解码的 Chrome 浏览器，会自动回退到软解。

    如果在 PC 端 Chrome 浏览器中集成了播放器插件，默认会优先采用 WebCodecs 硬件解码进行播放。如果您需要指定软解，请手动修改播放器插件的初始化配置 [ZegoExpressPlayerConfig.decodeType](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoExpressPlayerConfig#decode-type)。

**改进优化**

1. 优化首帧耗时和丢帧策略，相较之前版本平均时延更小

2. 精简压缩插件包体积，相较之前的版本减少 226 KB

**问题修复**

1. 修复 Web 页面 hidden 状态下，偶现声音自动播放的问题。

---


## 1.0.0 版本 <a id="1.0.0"></a>

**发布日期：2023-10-19**

ZEGO 自研 Web 播放器插件首次发布，支持拉取 H.265 和 H.264 格式的 CDN 直播视频流，同时支持常用的播放器控制功能。

<Warning title="注意">


- 播放器插件当前仅支持 Web 平台使用。 
- 播放器插件必须搭配 Express SDK 3.0.0 或以上版本使用。 

</Warning>


