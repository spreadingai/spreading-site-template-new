# 浏览器兼容性和已知问题

- - -
## 概述

WebRTC 是一个支持网页浏览器进行实时语音对话或视频对话、进行实时数据传输（Web Real-Time Communication）的 JavaScript API。

ZEGO Express Web SDK 使用了 WebRTC 技术实现实时音视频功能。因此，在当前浏览器中能否使用 Web SDK，依赖于当前浏览器对 WebRTC 能否兼容。目前 WebRTC 主要在桌面端的 Chrome、 Firefox、Safari 等浏览器，以及移动端的 Safari 浏览器上有较为完整的支持。本文将分别介绍桌面端和移动端的浏览器兼容性情况。

<Warning title="注意">


由于平台和一些应用内置浏览器的实现各不相同，无法涵盖所有浏览器，以下文档中未列举的浏览器并不代表不支持。开发者如有疑问，请联系 ZEGO 技术支持咨询。

</Warning>




## 桌面端

### 浏览器兼容性

目前 ZEGO Express Web SDK 在桌面端支持的浏览器及版本如下：

<Warning title="注意">


WebRTC 技术在 Chrome 平台支持度最好，建议开发者使用最新版本的 [Chrome 浏览器](https://www.google.com/intlhttps://doc-zh.zego.im/article-CN/chrome/)，下载最新版本的 [Web SDK](/real-time-video-web/client-sdk/download-sdk)。

</Warning>



<table>

  <tbody><tr>
    <th>操作系统</th>
    <th>浏览器</th>
    <th>版本兼容性</th>
    <th>拉流</th>
    <th>推流</th>
    <th>屏幕共享</th>
  </tr>
  <tr>
    <td rowspan="6">macOS</td>
    <td>Safari 浏览器</td>
    <td>11 或以上版本</td>
    <td>✔️</td>
    <td>✔️</td>
    <td>✔️（需要 Safari 13 或以上版本）</td>
  </tr>
  <tr>
    <td>Chrome 浏览器</td>
    <td>56 或以上版本</td>
    <td>✔️</td>
    <td>✔️</td>
    <td>✔️（需要 Chrome 72 或以上版本）</td>
  </tr>
  <tr>
    <td>Firefox 浏览器</td>
    <td>56 或以上版本</td>
    <td>✔️</td>
    <td>✔️</td>
    <td>✔️（需要 Firefox 66 或以上版本）</td>
  </tr>
  <tr>
    <td>Edge 浏览器</td>
    <td>80 或以上版本</td>
    <td>✔️</td>
    <td>✔️</td>
    <td>✔️</td>
  </tr>
  <tr>
    <td>微信内置浏览器</td>
    <td>-</td>
    <td>✔️</td>
    <td>✔️</td>
    <td>✖</td>
  </tr>
  <tr>
    <td>企业微信内置浏览器</td>
    <td>-</td>
    <td>✔️</td>
    <td>✖</td>
    <td>✖</td>
  </tr>
  <tr>
    <td rowspan="6">Windows</td>
    <td>Chrome 浏览器</td>
    <td>56 或以上版本</td>
    <td>✔️</td>
    <td>✔️</td>
    <td>✔️（需要 Chrome72 或以上版本）</td>
  </tr>
  <tr>
    <td>
    QQ 浏览器<br/>（极速内核）
    </td>
    <td>10.4 或以上版本</td>
    <td>✔️</td>
    <td>✔️</td>
    <td>✖</td>
  </tr>
  <tr>
    <td>Firefox 浏览器</td>
    <td>56 或以上版本</td>
    <td>✔️</td>
    <td>✔️</td>
    <td>✔️（需要 Firefox 66 或以上版本）</td>
  </tr>
  <tr>
    <td>Edge 浏览器</td>
    <td>80 或以上版本</td>
    <td>✔️</td>
    <td>✔️</td>
    <td>✔️</td>
  </tr>
  <tr>
    <td>微信内置浏览器</td>
    <td>-</td>
    <td>✔️</td>
    <td>✖</td>
    <td>✖</td>
  </tr>
  <tr>
    <td>企业微信内置浏览器</td>
    <td>-</td>
    <td>✔️</td>
    <td>✖</td>
    <td>✖</td>
  </tr>
</tbody></table>



### 兼容性限制

不同的浏览器存在差异，导致支持的功能可能有所不同。

出于隐私安全考虑，Chrome 较新的版本（81 及以上版本）、Safari 和 Firefox 浏览器需要在获得媒体设备权限后才能获取设备 ID，详情请参考 [为什么在 Chrome 81 及以上版本浏览器上无法获取设备 ID](https://doc-zh.zego.im/faq/deviceId?product=all&platform=all)。

<table>

  <tbody><tr>
    <th>浏览器</th>
    <th>限制</th>
  </tr>
  <tr>
    <td>Chrome</td>
    <td>
    <p>WebRTC 技术是由 Google 最先提出，Chrome 也是最先支持的浏览器，所以在 Chrome 上的限制较少。</p>
    <ul><li><b>版本</b>：Chrome 版本要求 58 或以上，建议使用 Chrome 65 或以上版本。</li><li><b>API</b>：部分 API 的功能需要 Chrome 较高版本才支持，详情请参考 <a target="_blank" href="https://doc-zh.zego.im/article/3546">客户端 API</a>。</li><li><b>设备</b>：在一些 Windows 设备上，Chrome 使用 H.264 编码时，发送码率可能达不到设定值，可以尝试关闭硬件加速或者使用 “VP8” 编码。</li><li><b>分辨率</b>：部分 Windows 系统使用 Chrome 90 以上（不包括 90），播放第三方视频、且视频分辨率不为 8 的倍数时，可能出现画面失真问题。</li></ul>
    </td>
  </tr>
  <tr>
    <td>Firefox</td>
    <td><ul><li><b>帧率</b>：Firefox 视频帧率只支持 30 fps。</li><li><b>视频编码</b>：Firefox 在部分设备上设置视频编码不生效。目前已知的设备有：Windows 10 (MI)、MacBook Pro (13-inch, 2016, Two Thunderbolt 3 ports)。</li><li><b>编码格式</b>：Firefox 在 使用 Apple M1 芯片的 Mac 设备上不支持 H.264 编解码，详见 <a target="_blank" href="https://bugzilla.mozilla.org/show_bug.cgi?id=1686470">Firefox 官方说明</a>。</li><li><b>视频画面</b>：在Firefox 上使用 Web SDK 与某些设备通话时，可能会出现所看到的对端画面发生了旋转。</li></ul></td>
  </tr>
  <tr>
    <td>Safari</td>
    <td><ul><li><b>分辨率</b>：Safari 11 只支持 480p 及以上的分辨率。</li><li><b>编码格式</b>：Safari 12.1（或以下版本）仅支持 H.264 编解码格式。</li><li><b>推流</b>：Safari 浏览器不支持推第三方流。</li><li><b>拉流</b>：Safari 13 可能听不到拉流的声音。</li><li><b>流质量检测</b>：Safari 上获取流质量相关统计数据时，有些字段不支持，如 “audioSendLevel”。</li><li><b>音频播放</b>：macOS Safari 14.0.1 上音频可能断断续续。</li><li><b>输出设备</b>：由于 <a target="_blank" href="https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine&amp;jumpType=route#enum-devices">enumDevices</a> 方法获取的 “speakers” 为空，Safari 无法获取输出设备（扬声器）信息。</li></ul></td>
  </tr>
</tbody></table>

### 已知问题及规避方案

<Accordion title="Chrome 浏览器" defaultOpen="false">
<table>

<tbody><tr>
<th>已知问题</th>
<th>建议规避方案</th>
</tr>
<tr>
<td>调用 <code>getStatus</code> 方法报错：“Failed to execute getStats on 'RTCPeerConnection': The callback-based getStatss() method is no longer supported.”，无法正常获取推拉流质量。</td>
<td>请升级 Express Web SDK 至 2.25.1 或以上版本。</td>
</tr>
<tr>
<td>使用第三方媒体流时，如果两次对同一个 HTMLMediaElement 调用 <code>captureStream</code> 方法，第一次获取的媒体流会被停掉。</td>
<td>请避免该类用法。如果需要重新采集第三方媒体流，请及时替换后续采集的流的轨道。</td>
</tr>
</tbody></table>
</Accordion>

<Accordion title="Firefox 浏览器" defaultOpen="false">
<table>

<tbody><tr>
<th>已知问题</th>
<th>建议规避方案</th>
</tr>
<tr>
<td>
在 Firefox 浏览器上修改了音频码率，不生效。
</td>
<td>请升级 Firefox 至最新版本，或更换其它浏览器。</td>
</tr>
</tbody></table>
</Accordion>

<Accordion title="Safari 浏览器" defaultOpen="false">
<table>

<tbody><tr>
<th>已知问题</th>
<th>建议规避方案</th>
</tr>
<tr>
<td>在 Safari 14.0.1 和 14.2 版本上，音频可能出现断断续续。</td>
<td>请升级 Safari 至最新版本，或更换其它浏览器。</td>
</tr>
</tbody></table>
</Accordion>

## 移动端

### Android

#### 浏览器兼容性

Android 平台原⽣ WebView 可⽀持⾃定义，因此不同平台不同设备以及不同应⽤的 WebView 实现可能存在差异，ZEGO Express Web SDK 在 Android 支持的情况如下：

<Warning title="注意">


由于不同手机产商对自带浏览器或多或少会对其浏览器内核做出改动，无法保证自带浏览器能够很好地支持 WebRTC，建议开发者使用 Chrome 浏览器。

</Warning>



<table>
<tbody><tr>
<th>操作系统</th>
<th width="22%">浏览器</th><th width="16%">拉流</th><th width="16%">推流</th><th>屏幕共享</th>
</tr>
<tr>
<td rowspan="7">Android</td>
<td>Chrome 浏览器</td>
<td>✔️</td>
<td>✔️</td>
<td>✖</td>
</tr>
<tr>
<td>Firefox 浏览器</td>
<td>✔️</td>
<td>✔️</td>
<td>✖</td>
</tr>
<tr>
<td>QQ 浏览器</td>
<td>✔️</td>
<td>✔️</td>
<td>✖</td>
</tr>
<tr>
<td>UC 浏览器</td>
<td>✖</td>
<td>✖</td>
<td>✖</td>
</tr>
<tr>
<td>
微信内置浏览器<br/>（TBS 内核）
</td>
<td>✔️</td>
<td>✔️</td>
<td>✖</td>
</tr>
<tr>
<td>
微信内置浏览器<br/>（XWEB 内核）
</td>
<td>✔️</td>
<td>✔️</td>
<td>✖</td>
</tr>
<tr>
<td>企业微信内置浏览器</td>
<td>✔️</td>
<td>✔️</td>
<td>✖</td>
</tr>
</tbody></table>

<br/>

#### 兼容性限制

Web SDK 在 Android 上的兼容性限制如下：

<table>

  <tbody><tr>
    <th>浏览器</th>
    <th>限制</th>
  </tr>
  <tr>
    <td>所有浏览器/应用内嵌 WebView（例如微信内置浏览器、QQ 浏览器、UC 浏览器等）</td>
    <td><ul><li><b>屏幕共享</b>：不支持屏幕共享。</li><li><b>device label</b>：部分 Android 设备上可能无法获取到媒体设备的 device label。</li><li><b>兼容说明</b>：浏览器是否兼容，和浏览器版本、运行内核，设备芯片等都相关，ZEGO 强烈建议开发者在使用前，先进行兼容性检测。</li><li><b>摄像头切换</b>：部分 Android 设备上无法支持同时使用前置和后置摄像头。可以通过 <a href="https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#set-engine-config">setEngineConfig</a> 开启 <code>stopTrackWhenSwitchDevice</code> 配置来规避，详情可联系 ZEGO 技术支持。</li> <li><b>设备占用</b>：多个页面使用同摄像头麦克风会导致当前或者之前页面的画面和声音被系统 mute 且不可恢复。 可以通过监听 deviceError 事件的 1106011、1106012 错误码，UI 上提醒用户关闭其他页面并退房重进来恢复画面声音（3.8.140 及以上版本支持）。</li> </ul></td>
  </tr>
  <tr>
    <td>Chrome</td>
    <td><b>编码格式</b>：部分 Android 设备（如华为）上，Chrome 浏览器不支持 H.264 编解码格式。</td>
  </tr>
  <tr>
    <td>Firefox</td>
    <td><b>视频画面</b>：在Firefox 上使用 Web SDK 与某些设备通话时，可能会出现所看到的对端画面发生了旋转。</td>
  </tr>
</tbody></table>


部分 Android 设备不支持 H.264 编解码。开发者可以通过 [checkSystemRequirements](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#check-system-requirements) 接口检测，如果当前设备不支持该编码格式时，可以使用 “VP8” 编码。同时会有部分浏览器不支持 WebRTC 的技术，建议开发者使用 Chrome 浏览器。


### iOS

#### 浏览器兼容性

⽬前 iOS 平台上所有应⽤内置 WebView 只能使⽤系统提供的，具有⼀定的局限性。

<table>

<tbody><tr>
<th>操作系统</th>
<th>浏览器</th>
<th>版本兼容性</th>
<th>接收（播放）</th>
<th>发送（上麦）</th>
<th>屏幕共享</th>
</tr>
<tr>
<td>iOS 版本 &gt;= 11.1.2</td>
<td>Safari 浏览器</td>
<td>11 或以上版本</td>
<td>✔️</td>
<td>✔️</td>
<td>✖</td>
</tr>
<tr>
<td>iOS 版本 &gt;= 12.1.4 且 &lt; 14.3</td>
<td>Chrome 浏览器</td>
<td>-</td>
<td>✔️</td>
<td>✖</td>
<td>✖</td>
</tr>
<tr>
<td>iOS 版本 &gt;= 14.3</td>
<td>Chrome 浏览器</td>
<td>-</td>
<td>✔️</td>
<td>✔️</td>
<td>✖</td>
</tr>
<tr>
<td>iOS 版本 &gt;= 12.1.4 且 &lt; 14.3</td>
<td>微信内置浏览器</td>
<td>-</td>
<td>✔️</td>
<td>✖</td>
<td>✖</td>
</tr>
<tr>
<td>iOS 版本 &gt;= 14.3</td>
<td>微信内置浏览器</td>
<td>6.5 或以上版本<br/>（微信版本）</td>
<td>✔️</td>
<td>✔️</td>
<td>✖</td>
</tr>
<tr>
<td>iOS 版本 &gt;= 12.1.4</td>
<td>企业微信内置浏览器</td>
<td>-</td>
<td>✔️</td>
<td>✖</td>
<td>✖</td>
</tr>
</tbody></table>

#### 兼容性限制

Web SDK 在 iOS 上的兼容性限制如下：

<table>

  <tbody><tr>
    <th>浏览器</th>
    <th>限制</th>
  </tr>
  <tr>
    <td>所有浏览器/应用内嵌 webview</td>
    <td><ul><li><b>屏幕共享</b>：不支持屏幕共享。</li><li><b>推流</b>：在 iOS 推音视频流，被其它应用打断后，无法自动恢复视频流的发送，需要重新采集重新推流。</li><li><b>音频路由切换</b>：在 iOS 17 版本，若使用非 Apple 原装蓝牙耳机播放音频的同时，进行音视频采集，会导致原本从蓝牙耳机传出的声音从设备的扬声器传出。建议采集音视频时指定 deviceId 来规避该问题。</li>
<li><b>设备占用</b>： 多个页面使用同摄像头麦克风会导致前面的画面和声音被系统 mute 且不可恢复。 可以通过监听 deviceError 事件的 1106011、1106012 错误码，UI 上提醒用户关闭其他页面并退房重进来恢复画面声音（3.8.140 及以上版本支持）。</li></ul></td>
  </tr>
  <tr>
    <td>Safari </td>
    <td><ul><li><b>编码格式</b>：iOS Safari 12.1 及之前版本仅支持 H.264 编解码格式。</li><li><b>分辨率</b>：iOS Safari 11 只支持 480p 及以上分辨率。</li><li><b>媒体轨道</b>：第二次调用浏览器的 “getUserMedia” 接口获取相同媒体类型的轨道，会导致第一次获取的媒体轨道静音或黑屏。</li><li><b>音量</b>：iOS 13 版本中可能出现拉流音量大小随机变化的问题。</li><li><b>音频路由切换</b>：声音路由随机切换，即可能出现没有插耳机却从听筒出声或者插上了耳机仍然从扬声器出声的情况。</li><li><b>采集音视频</b>：（偶现）使用过其它音视频输入设备的 App 后（例如 Siri），无法采集本地音频或视频。</li><li><b>音频播放</b>：iOS Safari 14.2 和 macOS Safari 14.0.1 上音频可能断断续续。</li></ul></td>
  </tr>
</tbody></table>

### HarmonyOS

#### 浏览器兼容性

⽬前鸿蒙系统（HarmonyOS）只支持 Mate 60 Pro 机型，且需升级至 HarmonyOS NEXT 5.0 版本，同时需使用华为浏览器才能使用 WebRTC 音视频推拉流。

<table>
<tbody>
<tr>
<th>操作系统</th>
<th>浏览器</th>
<th>版本兼容性</th>
<th>接收（播放）</th>
<th>发送（上麦）</th>
<th>屏幕共享</th>
</tr>
<tr>
<td>版本 &gt;= NEXT 5.0 </td>
<td>华为浏览器</td>
<td>-</td>
<td>✔️</td>
<td>✔️</td>
<td>✖</td>
</tr>
</tbody>
</table>

#### 兼容性限制

Web SDK 在 HarmonyOS 华为浏览器上的兼容性限制如下：

<table>

<tbody><tr>
<th>浏览器</th>
<th>限制</th>
</tr>
<tr>
<td>华为浏览器</td>
<td><ul><li><b>编码格式</b>：支持 H.264 和 VP8 编解码格式， H.264 编码格式码率较低。</li><li><b>媒体轨道</b>：第二次调用浏览器的 “getUserMedia” 接口获取视频轨道，同时必须停止第一次获取的媒体轨道。</li><li><b>声音采集</b>：接入外接麦克风后，采集音频会使用外接麦克风，无法选择切换至手机自带麦克风。</li><li><b>音频路由切换</b>：声音路由切换，即可能出现当其他音频应用（如畅连）打断音频播放时，再回到浏览器后，拉流声音只从听筒传出的情况。</li><li><b>采集音视频</b>：接通手机通话，会打断音视频采集播放，此时需手动恢复播放。</li></ul></td>
</tr>
</tbody></table>

### 已知问题及规避方案

<Accordion title="微信内置浏览器" defaultOpen="false">
<table>

<tbody><tr>
<th>已知问题</th>
<th>建议规避方案</th>
</tr>
<tr>
<td>iPad 微信的内置浏览器，在 7.0.12 版本推流中开/关摄像头，拉流端会闪现一下 90 度的旋转画面。 </td>
<td>请升级微信至最新版本。 </td>
</tr>
<tr>
<td>“荣耀”系列手机端的微信内置浏览器，拉流渲染后没有声音。 </td>
<td>请升级 Express Web SDK 至 2.26.0 或以上版本。</td>
</tr>
<tr>
<td>iOS 17 部分系统的微信内置浏览器使用混音或音质增强功能时，\<audio> 标签播放器播放没有声音。 </td>
<td>建议不要使用混音、音质增强等功能。如果必须使用，请升级至 iOS 17.1.1 或以上版本。</td>
</tr>
</tbody></table>
</Accordion>


<Accordion title="Safari 浏览器" defaultOpen="false">
<table>

<tbody><tr>
<th>已知问题</th>
<th>建议规避方案</th>
</tr>
<tr>
<td>在 iOS 16.0、16.1 版本上，只要初始化时使用了 <code>AudioContext</code>，使用麦克风推流没有声音。</td>
<td>请升级至 iOS 16.2 或以上版本。</td>
</tr>
<tr>
<td>使用混音或音质增强功能时，\<audio> 标签播放器播放没有声音。</td>
<td>建议不要使用混音、音质增强等功能；如果必须使用，请升级至 iOS 17.1.1 或以上版本。</td>
</tr>
</tbody></table>
</Accordion>

<Accordion title="Chrome 浏览器" defaultOpen="false">
<table>

<tbody><tr>
<th>已知问题</th>
<th>建议规避方案</th>
</tr>
<tr>
<td>在部分 Android 设备上，由于设备不支持 H.264 编码，使用低版本的 Chrome 浏览器会出现推流报错。</td>
<td>请升级 Chrome 浏览器至最新版本。 </td>
</tr>
</tbody></table>
</Accordion>

<Accordion title="Firefox 浏览器" defaultOpen="false">
<table>

<tbody><tr>
<th>已知问题</th>
<th>建议规避方案</th>
</tr>
<tr>
<td>在鸿蒙系统上，使用 Firefox 浏览器推第三方视频流，推流/预览正常，但拉流时画面黑屏。</td>
<td><a href="https://doc-zh.zego.im/faq/Express_Web_PageYellow?product=ExpressVideo&platform=web" target="blank">使用浏览器推第三方视频流，推流/预览正常，但拉流时画面黑屏，该如何处理？</a></td>
</tr>
</tbody></table>
</Accordion>

## 浏览器兼容性检测

### 接入检测

开发者可以通过 ZEGO Express Web SDK 提供了 [checkSystemRequirements](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#check-system-requirements-t-extends-keyof-zego-check-single-type) 接口，检测当前浏览器的兼容性情况，该接口可检测 WebRTC、视频编码、自定义采集、摄像头、麦克风以及屏幕共享的支持情况。

```javascript
const result = await zg.checkSystemRequirements();
// 返回的 result 为兼容性检测结果。 webRTC 为 true 时表示支持 webRTC，其他属性含义可以参考接口 API 文档。
console.log(result);
// {
//   webRTC: true,
//   customCapture: true,
//   camera: true,
//   microphone: true,
//   videoCodec: { H264: true, H265: false, VP8: true, VP9: true },
//   screenSharing: true,
//   errInfo: {}
// }
```

### 在线检测

ZEGO 提供了一个 [在线检测工具](https://zegodev.github.io/zego-express-webrtc-sample/webrtcCheck/index.html)，帮助开发者自动检测设备浏览器能否正常运行 WebRTC 应用。

该工具支持检测以下项目：

* 浏览器兼容性
* 设备获取能力
* H264 视频编码检测
* VP8 视频编码检测
* 扬声器播放是否正常
* 当前设备可支持哪些分辨率

在线检测工具是通过调用 `zg.checkSystemRequirements` 接口，自动检测浏览器是否支持当前的语音、视频通话，下面将逐项说明其原理。

<Accordion title="WebRTC 检测" defaultOpen="false">
Web SDK 是基于 WebRTC 实现音视频通信的，故对 WebRTC 检测是必不可少的。

在线检测页面中，通过 `zg.checkSystemRequirements` 接口获取到检测结果对象，对象中存在 `webRTC`，该项用于检测当前页面是否支持 WebRTC 基本能力。如果返回结果为 “true” 表示支持 WebRTC；结果为 “false” 表示不支持，无法正常使用 Web SDK。

```javascript
const result = await zg.checkSystemRequirements();
console.log(result.webRTC)
```
</Accordion>

<Accordion title="获取设备" defaultOpen="false">
通过 `zg.enumDevices` 接口获取到设备列表，设备列表包括摄像头、麦克风以及扬声器的设备 ID、标签等信息。开发者可以通过设备列表的长度，判断当前页面是否具备获取设备信息的能力。

```javascript
const devicesInfo = await zg.enumDevices();
console.log(devicesInfo);
```
</Accordion>


<Accordion title="H.264 视频编码检测" defaultOpen="false">
通过 `zg.checkSystemRequirements` 接口获取对 H264 的兼容性。返回结果为 “true” 表示当前页面支持 H264 编码；结果为 “false” 表示不支持，若不支持则会有可能出现无法互通的问题。

```javascript
const result = await zg.checkSystemRequirements();
console.log(result.videoCodec.H264)
```
</Accordion>


<Accordion title="VP8 视频编码检测" defaultOpen="false">
通过 `zg.checkSystemRequirements` 接口获取对 VP8 的支持度。返回结果为 “true” 表示当前页面支持 VP8 编码；结果为 “false” 表示不支持，若不支持则会有可能出现无法互通的问题。

```javascript
const result = await zg.checkSystemRequirements();
console.log(result.videoCodec.VP8)
```
</Accordion>


<Accordion title="麦克风检测" defaultOpen="false">
通过 `zg.checkSystemRequirements` 接口检测能否正常采集到麦克风的声音。

开发者可以通过 `zg.enumDevices()` 接口获取到麦克风设备列表，并拿到相应的麦克风设备 ID 与 label。若检测的返回结果中，参数 “microphone” 为 “true”，且枚举设备列表中麦克风设备列表长度大于 0，则表示当前页面支持麦克风采集。

```javascript
const result = await zg.checkSystemRequirements();
console.log(result.microphone);

const devicesInfo = await zg.enumDevices();
console.log(devicesInfo.microphones);
```
</Accordion>


<Accordion title="扬声器检测" defaultOpen="false">
通过 HTML5 音频组件播放一段音乐，由用户点击播放后，确认是否听到了正在播放的声音。
</Accordion>

<Accordion title="摄像头检测" defaultOpen="false">
通过 `zg.checkSystemRequirements` 接口判断当前页面是否支持采集摄像头。

开发者可以通过 `zg.enumDevices` 获取到摄像头设备列表，并拿到相应的摄像头设备 ID 与 label。若检测的返回结果中，参数 “camera” 为 “true”，且枚举设备列表中摄像头设备列表长度大于 0，则表示当前页面支持摄像头采集。

```javascript
const result = await zg.checkSystemRequirements();
console.log(result.camera);

const devicesInfo = await zg.enumDevices();
console.log(devicesInfo.cameras);
```
</Accordion>


<Accordion title="分辨率检测" defaultOpen="false">
通过 `zg.createZegoStream` 接口，基于不同的分辨率参数，创建视频流。

开发者可以通过 `videoTrack.getSettings` 获取视频分辨率，若获取的分辨率与参数相同，则测试通过，否则提示不支持。

```javascript
const zegoLocalStream = await zg.createZegoStream({
    camera: {
        video: {
            width,
            height
        }
    }
});

const settings = zegoLocalStream.stream.getVideoTracks()[0].getSettings();
```
</Accordion>

<Accordion title="连通性检测" defaultOpen="false">
调用 `zg.createZegoStream` 接口创建流，调用 `zg.startPublishingStream` 接口，连接 ZEGO 服务，开始推流，以检测当前网络链路的可用性。

如果提示不支持，请检查当前的网络状态或联系 ZEGO 技术支持。

```javascript
const zegoLocalStream = await zg.createZegoStream();
zg.startPublishingStream('streamID', zegoLocalStream);

zg.on("publisherStateUpdate", result => {
    console.log('publisherStateUpdate: ', result.streamID, result.state);

    if (result.state == 'PUBLISHING') {
        console.info(' publish  success ' + result.streamID);
    }
})
```
</Accordion>
