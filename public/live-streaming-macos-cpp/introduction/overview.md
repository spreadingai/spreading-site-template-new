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
<td>SDK 包体积</td>
<td>
<li>iOS（arm64）：7.82 MB</li><li>Android（arm64）：8.93 MB</li><li>Android（armv7）：8.2 MB</li><li>macOS（x86_64）：11.25 MB</li><li>Windows（x86）：11.44 MB</li><li>Windows（x86_64）：13.84 MB</li><li>Linux ( x64)：13.59 MB</li>

<Note title="说明">
以上数据为全功能 SDK 包的大小，若您对包大小有较高要求，可以联系 ZEGO 技术支持对 SDK 进行功能裁剪，如需了解更多，请参考 <a target="_blank" href="http://doc-zh.zego.im/faq/common_faq_sdk_package_size">什么是 SDK 的安装包大小增量？</a>。
</Note>

</td>
</tr>
<tr>
<td>直播延迟</td>
<td> 毫秒级延迟，端到端延时为 600～1000ms。</td>
</tr>
<tr>
<td>直播同步性</td>
<td> 毫秒级同步，不同观众之间的同步误差 400ms。</td>
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


<Content />

## 平台兼容

超低延迟直播支持 iOS、Android、Windows、macOS、Web、 Flutter 等平台并支持平台互通，具体的兼容性要求见下表。


<table>

<tbody><tr>
<th>平台</th>
<th>支持版本</th>
<th>支持架构</th>
</tr>
<tr>
<td>iOS</td>
<td>12.0 或以上版本</td>
<td><ul><li>arm64</li><li>x86_64（模拟器）</li><li>arm64（模拟器）</li><li>x86_64（Mac Catalyst）</li><li>arm64（Mac Catalyst）</li></ul></td>
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
<td>Linux</td>
<td>任意具有 GLIBC 2.16 或以上版本的 Linux 发行版系统</td>
<td><ul><li>amd64 (x86_64-linux-gnu)</li><li>arm64 (aarch64-linux-gnu)</li><li> armhf (arm-linux-gnueabihf)</li><li>armel (arm-linux-gnueabi)</li></ul></td>
</tr>
<tr>
<td>HarmonyOS</td>
<td><ul><li>系统版本：HarmonyOS NEXT Developer Beta1 或以上版本</li><li>SDK 版本：HarmonyOS NEXT Developer Beta1 SDK（基于 OpenHarmony SDK Ohos_sdk_public 5.0.0.25 (API 12 Beta1)）或以上版本</li><li>DevEco Studio 版本：DevEco Studio NEXT Developer Beta1（5.0.3.404）或以上版本</li></ul></td>
<td>-</td>
</tr>
<tr>
<td>macOS</td>
<td>10.13 或以上版本</td>
<td><ul><li>x86_64</li><li>arm64</li></ul></td>
</tr>
<tr>
<td>Web</td>
<td><ul><li>Chrome 58 或以上版本</li><li>Firefox 56 或以上版本</li><li>Safari 11 或以上版本</li><li>Opera 45 或以上版本</li><li>QQ 浏览器 Windows 10.1 或以上版本、macOS 4.4 或以上版本</li><li>HarmonyOS NEXT beta 2 华为浏览器或以上版本</li><li>360 安全浏览器极速模式</li></ul><p>更多兼容性要求，请参考 <a target="_blank" href="/real-time-video-web/introduction/browser-restrictions">限制说明 - 浏览器兼容性和已知问题</a></p></td>
<td>-</td>
</tr>
<tr>
<td>Flutter</td>
<td><ul>
<li>Flutter 2.0 或以上版本</li>
<li>iOS 12.0 或以上版本</li>
<li>Android 4.4 或以上版本
</li><li>Windows 8 或以上版本</li>
<li>Web： Chrome 58 或以上版本、Firefox 56 或以上版本、Safari 11 或以上版本、Opera 45 或以上版本、QQ 浏览器 Windows 10.1 或以上版本/macOS 4.4 或以上版本、360 安全浏览器极速模式</li>
</ul></td>
<td>-</td>
</tr>
<tr>
<td>Electron</td>
<td><ul><li>Electron 7.0.0 或以上版本</li><li>Windows 7 及以上 / macOS 10.13 及以上操作系统</li><li>Linux 支持 x86_64、aarch64、armhf 架构的 Linux 操作系统，如需使用 Linux 平台，请联系 ZEGO 技术支持。</li></ul></td>
<td>-</td>
</tr>
<tr>
<td>uni-app</td>
<td><ul><li>HBuilderX 3.0.0 或以上版本</li><li>iOS 12.0 或以上版本</li><li>Android 4.4 或以上版本</li><li>Web： Chrome 58 或以上版本、Firefox 56 或以上版本、Safari 11 或以上版本、Opera 45 或以上版本、QQ 浏览器 Windows 10.1 或以上版本/macOS 4.4 或以上版本、360 安全浏览器极速模式</li></ul></td>
<td>-</td>
</tr>
<tr>
<td>Unity3D</td>
<td><ul><li>Unity 2018.4.21f1 或以上版本</li><li>Android：Android 4.4 或以上版本</li><li>iOS：Xcode 15.0 或以上版本，iOS 12.0 或以上版本</li><li>macOS：macOS 10.13 或以上版本</li><li>Windows：Windows 7 或以上版本</li><li>Linux：任意具有 GLIBC 2.16 或以上版本的 Linux 发行版系统（目前仅支持 x86_64 架构），libasound（ALSA），libv4l2（v4l utils），CMake 3.7 或以上版本</li><li>WebGL：浏览器需要支持 WebGL 以及 WebAssembly（推荐使用 WebGL 2.0），Chrome 57 或以上版本、Firefox 56 或以上版本、Safari 11 或以上版本，不支持移动端</li></ul></td>
<td>-</td>
</tr>
<tr>
<td>React Native</td>
<td><ul><li>React Native 0.60.0 或以上版本</li><li>iOS 12.0 或以上版本</li><li>Android 4.4 或以上版本</li></ul></td>
<td>-</td>
</tr>
<tr>
<td>Unreal Engine</td>
<td><ul><li>Unreal Engine 4.25 或以上版本</li><li>iOS 12.0 或以上版本</li><li>Android 5.0 或以上版本</li><li>macOS 11 或以上版本</li><li>Windows 7 或以上版本</li></ul></td>
<td>-</td>
</tr>
<tr>
<td>Cocos Creator</td>
<td><ul><li>Cocos Creator 3.6.0 或以上版本</li><li>iOS 12.0 或以上版本</li><li>Android 5.0 或以上版本</li><li>macOS 10.13 或以上版本</li><li>Windows 7 或以上版本</li></ul></td>
<td>-</td>
</tr>
</tbody></table>

<Note title="说明">


如果您有更多关于平台或版本支持的相关需求，请联系 ZEGO 技术支持处理。

</Note>



