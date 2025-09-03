<Title>移动端如何使用 ZEGO Express Web SDK？</Title>



- - -

## 概述

ZEGO Express Web SDK 是基于 webRTC 实现⾳视频通话的，所以该 SDK 的⽀持度依赖于浏览器或 Webview 对 WebRTC 的⽀持度，⽬前市场上 PC 端绝⼤多数浏览器以及移动端主流浏览器都⽀持 WebRTC。

但需要关注的是，移动端各个平台浏览器的实现⽅式以及对**视频编码**的⽀持度各不相同，⽬前 ZOGO Express Web SDK 已⽀持 VP8 和 H.264 编码格式。PC 端绝⼤多数浏览器也⽀持这两种编码，但移动端较为复杂。故若需要在移动端使⽤ Web SDK，开发者需要关注移动端不同应⽤场景对 VP8 和 H.264 编码格式的⽀持情况，本⽂将对此做详细介绍。

## 编码格式⽀持度

### Android

⽬前 Andriod 平台除了 FireFox 浏览器在 68 版本后不再安装 OpenH264 之外，主流浏览器都⽀持 VP8 和 H.264 视频编码格式。

与 iOS 不同的是，Andriod 平台原⽣ WebView 可⽀持⾃定义，因此不同平台不同设备以及不同应⽤的 WebView 实现可能存在差异，下表仅供参考。

| 浏览器 | VP8 | H.264|
| ----- | ----- | ----- |
| Chrome 58 及以上 | ⽀持推拉流 | 部分设备⽀持推拉流 |
| FireFox 56 及以上 | 部分设备⽀持推拉流 | 部分设备⽀持推拉流 |
| 微信内置浏览器 | 最新版本⽀持推拉流 | 不⽀持推拉流 |
| 应⽤内嵌 WebView | 部分设备⽀持推拉流 | 部分设备⽀持推拉流 |

### iOS

⽬前 iOS 平台上所有应⽤内置 WebView 只能使⽤系统提供的，具有⼀定的局限性，并且除了 Safari 浏览器之外都不⽀持⾳视频的推流。

| 浏览器 | VP8 | H.264|
| ----- | ----- | ----- |
| Safari 浏览器 | iOS 12.2 及以上⽀持推拉流 | iOS 11 及以上⽀持推拉流 |
| 微信内置浏览器 | iOS 12.2 及以上只⽀持拉流 | iOS 11 及以上只⽀持拉流 |
| 应⽤内嵌 WebView | iOS 12.2 及以上只⽀持拉流 | iOS 12.1.4 及以上只⽀拉流|

## 编码格式选择

您需要根据实际情况选择合适的视频编码格式。
- 若主播端与观众端都是用 ZEGO Express Web SDK，通常情况下建议您使⽤ VP8 视频编码格式进⾏推拉流。若出现两端冲突，即⼀端只⽀持 H.264，⼀端只⽀持 VP8（比如 Andriod FireFox 68 与 iOS 11 Safari）的情况，此时建议您使⽤混流转码，具体请参考 [混流转码示例 Demo|_blank](https://zegodev.github.io/zego-express-webrtc-sample/vp8/index.html)。
- 若主播端和观众端中有⼀端使⽤ Native SDK，则需要 Native 端与 Web 端的视频编码保持⼀致。

### 检测当前浏览器是否⽀持 VP8 和 H.264 视频编码

因不同平台不同浏览器以及不同应⽤对视频编码格式的⽀持度不同，您在推拉流前需要调用 [checkSystemRequirements](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#check-system-requirements) 接口检测当前浏览器或 WebView 对 **VP8** 和 **H.264** 的⽀持情况。

``` javascript
const res = await zg.checkSystemRequirements();
if (!result.videoCodec.H264) {
alert('当前浏览器不⽀持H264视频编码')
} else if (!result.videoCodec.VP8) {
alert('当前浏览器不⽀持VP8视频编码')
}
```
### 选择合适的视频编码格式进⾏推流

可调用推流接⼝ [startPublishingStream](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine&jumpType=route#start-publishing-stream) ，并根据实际情况选择视频编码格式进⾏推流。

``` javascript
zg.startPublishingStream(streamID, localStream, {videoCodec: 'VP8'})
```

### 选择合适的视频编码格式进⾏拉流

可调用拉流接口 [startPlayingStream](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine&jumpType=route#start-playing-stream)，并根据实际情况选择视频编码格式进行拉流。

``` javascript
const remoteStream = await zg.startPlayingStream(streamId,
{videoCodec: 'VP8'})
```
