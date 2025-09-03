# 概述

---

## 产品简介

ZEGO 超低延迟直播（Low-Latency Live Streaming，L3）为高质量体验而生，可打造超低延迟、超强同步、抗极端弱网、超低卡顿、超清画质、首帧秒开的极致直播体验，是直播分发产品中的“六边形战士”。
<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/A_LiveStreamingSDK/LiveStreaming_overview.jpg" /></Frame>

### 与传统 CDN 直播区别

相较于传统 CDN 直播，ZEGO 超低延迟直播基于全链路自研私有协议、海量有序数据网络（MSDN）和端到端监控等多种策略，提供更加稳定、更高质量的大规模直播分发服务。

有效解决 CDN 的延迟高、同步性差、弱网播放不稳定等痛点，重塑每个观众的直播体验，助力业务指标的正增长，是众多直播头部客户的共同选择。

<video poster="http://media-resource.spreading.io/docuo/workspace564/27e54a759d23575969552654cb45bf89/d3f29ec6e8.png" src="http://media-resource.spreading.io/docuo/workspace564/27e54a759d23575969552654cb45bf89/36e23be657.mp4" width="80%" muted="true" loop="true" autoplay="autoplay" preload="auto" controls></video>




## 特性指标

<table>
  
<tbody><tr>
<th>特性</th>
<th>超低延迟直播指标</th>
</tr>
<tr>
<td>直播延迟</td>
<td> 毫秒级延迟，端到端延时为 600～1000ms。</td>
</tr>
<tr>
<td>直播同步性</td>
<td> 毫秒级同步，不同观众之间的同步误差 &lt;400ms。</td>
</tr>
<tr>
<td>抗丢包率</td>
<td><ul><li>音频：上下行抗丢包率 80%。</li><li>视频：上下行抗丢包率 70%。</li></ul></td>
</tr>
<tr>
<td>视频质量</td>
<td>SDK 采集支持 4K 分辨率、1 fps ～ 60 fps 帧率。</td>
</tr>
<tr>
<td>音频质量</td>
<td><ul><li>音频采样率：16 kHz ～ 48 kHz。</li><li>支持单、双声道。</li><li>回声消除：支持 10 路同时讲话。</li></ul></td>
</tr>
<tr>
<td>IP 协议</td>
<td>IPv4、IPv6。</td>
</tr>
<tr>
<td>最大并发</td>
<td> 能支持千万级别的直播并发。</td>
</tr>
<tr>
<td>全球覆盖</td>
<td>全球 500+ 多个节点，提供稳定的内容分发网络。</td>
</tr>
</tbody></table>


## 平台兼容

超低延迟直播支持 iOS、Android、Windows、macOS、Web、微信小程序等平台并支持平台互通，具体的兼容性要求见下表。

<Note title="说明">

超低延迟直播暂不支持小程序。

</Note>



<table>
  
  <tbody><tr>
    <th>平台</th>
    <th>支持版本</th>
    <th>支持架构</th>
  </tr>
  <tr>
    <td>iOS</td>
    <td>11.0 或以上版本</td>
    <td><ul><li>arm64</li><li>armv7</li><li>x86_64（模拟器）</li><li>arm64（模拟器）</li><li>x86_64（Mac Catalyst）</li><li>arm64（Mac Catalyst）</li></ul></td>
  </tr>
  <tr>
    <td>Android</td>
    <td>4.4 或以上版本</td>
    <td><ul><li>arm64-v8a</li><li>armeabi-v7a</li><li>x86</li><li>x86_64</li></ul></td>
  </tr>
  <tr>
    <td>Windows</td>
    <td>Windows 7 或以上版本</td>
    <td><ul><li>x86</li><li>x64</li></ul></td>
  </tr>
  <tr>
    <td>macOS</td>
    <td>10.11 或以上版本</td>
    <td>x86_64</td>
  </tr>
  <tr>
    <td>Web</td>
    <td><ul><li>Chrome 58 或以上版本</li><li>Firefox 56 或以上版本</li><li>Safari 11 或以上版本</li><li>Opera 45 或以上版本</li><li>QQ 浏览器 Windows 10.1 或以上版本、macOS 4.4 或以上版本</li><li>360 安全浏览器极速模式</li><ul></ul></ul></td>
    <td>-</td>
  </tr>
  <tr>
    <td>Flutter</td>
    <td>
    <ul>
    <li>Flutter 2.0 或以上版本</li><li>iOS 11.0 或以上版本</li><li>Android 4.4 或以上版本</li>
    <li>Windows 7 或以上版本（注意：目前 SDK 在 Windows 上仅支持音频功能，暂不支持视频功能）</li>
    <li>Web： Chrome 58 或以上版本、Firefox 56 或以上版本、Safari 11 或以上版本、Opera 45 或以上版本、QQ 浏览器 Windows 10.1 或以上版本/macOS 4.4 或以上版本、360 安全浏览器极速模式</li>
    </ul>
    </td>    
    <td>-</td>
  </tr>
</tbody></table>
