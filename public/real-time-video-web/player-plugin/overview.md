# 播放器简介

- - -

## 概述

ZEGO 提供自研 Web 端播放器插件，可结合 CDN 直播服务，快速集成到 Web 应用中，为开发者提供可监控、稳定、流畅的 CDN 直播播放能力。

<Note title="说明">


播放器插件主要适用于 CDN 直播播放，暂不支持点播播放能力。

</Note>



## 产品优势

#### 支持 H.265 CDN 直播拉流

对于 H.265 编码格式的 CDN 直播流，ZEGO 播放器插件无需编码降级就能正常解码和播放。

H.265 是一种高效的视频编码标准，能用更低的拉流带宽传输更高质量的网络视频。

#### 支持播放质量监控和异常问题快速定位

- 提供日志上报，便于快速定位和排查异常问题。
- 支持首帧时长等关键质量上报，帮助开发者实现播放质量监控。

#### 低门槛便捷接入

支持低门槛接入、快速集成，且提供全面的示例源码和体验 Demo，大幅降低开发成本。

#### 与其他直播能力灵活搭配

- 播放器插件补齐了 CDN 拉流能力，与 Express SDK 搭配使用后，能够支持 RTC、L3（超低延迟直播）、CDN 等多种拉流方式。
- 可支持直播连麦、低延迟高质量观看、大规模并发观看等能力，为开发者提供最佳的直播体验、覆盖全场景的解决方案。


## 协议支持

Web 播放器插件支持的协议如：

<table>
  
<tbody><tr>
<th rowspan="2">协议</th>
<th colspan="2">H.264 播放&nbsp;</th>
<th colspan="2">H.265 播放</th>
</tr>
<tr>
<th>桌面端浏览器</th>
<th>移动端浏览器</th>
<th>桌面端浏览器</th>
<th>移动端浏览器</th>
</tr>
<tr>
<td>FLV</td>
<td>支持</td>
<td>支持</td>
<td>支持</td>
<td>支持</td>
</tr>
<tr>
<td>HLS</td>
<td>不支持</td>
<td>不支持</td>
<td>不支持</td>
<td>不支持</td>
</tr>
<tr>
<td>webRTC</td>
<td>Express SDK 已支持</td>
<td>Express SDK 已支持</td>
<td>不支持</td>
<td>不支持</td>
</tr>
</tbody></table>

<Note title="说明">


ZEGO Express SDK 已支持 webRTC 协议的 RTC、L3 拉流方式，您无需额外集成 Web 播放器插件。

</Note>




## 功能支持

播放器兼容常用的浏览器，播放器支持自动区分平台，使用最优的播放方案。

<table>
  
<tbody><tr>
<th>功能</th>
<th>桌面端</th>
<th>移动端</th>
</tr>
<tr>
<td>播放器尺寸设置</td>
<td>支持</td>
<td>支持</td>
</tr>
<tr>
<td>H.264 播放</td>
<td>支持</td>
<td>支持</td>
</tr>
<tr>
<td>H.265 播放</td>
<td>支持</td>
<td>支持</td>
</tr>
<tr>
<td>自动播放</td>
<td>支持</td>
<td>支持</td>
</tr>
<tr>
<td>全屏播放</td>
<td>支持</td>
<td>支持</td>
</tr>
<tr>
<td>弱网追帧</td>
<td>支持</td>
<td>支持</td>
</tr>
<tr>
<td>音量调节</td>
<td>支持</td>
<td>支持</td>
</tr>
<tr>
<td>SEI 接收回调</td>
<td>支持</td>
<td>支持</td>
</tr>
<tr>
<td>媒体信息更新回调</td>
<td>支持</td>
<td>支持</td>
</tr>
<tr>
<td>日志上报</td>
<td>支持</td>
<td>支持</td>
</tr>
<tr>
<td>关键质量上报</td>
<td>支持</td>
<td>支持</td>
</tr>
<tr>
<td>硬件解码</td>
<td>支持</td>
<td>支持</td>
</tr>
</tbody></table>

<Note title="说明">


- 播放器插件**默认开启自动播放**，但浏览器的策略限制会影响自动播放功能，我们提供了自动播放失败回调，您可以基于该回调引导用户点击触发视频播放。

- 播放器解码播放时，默认按照 “WebCodecs 硬解 > MSE 硬解 > 软解” 的优先级进行解码。如果您需要指定优先使用某种解码方式，可以手动修改播放器插件的初始化配置 [ZegoExpressPlayerConfig.decodeType](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoExpressPlayerConfig#decode-type) 的取值。如果浏览器不支持当前解码方式，会按优先级自动回退到下一种方式。


</Note>


