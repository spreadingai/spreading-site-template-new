# 视频编码格式选择

- - -

## 概览

ZEGO Express Web SDK 使用 WebRTC 技术实现实时音视频功能，其中视频编码支持 **H.264** 和 **VP8** 两种格式。本文介绍了两种编码格式的优劣势，并根据业务场景选择适合的编码格式，帮助开发者更好的了解编码格式的选择。


## 兼容性说明

开发者在开始使用音视频业务前，可以使用 ZEGO Express Web SDK 提供的兼容性检测接口 [checkSystemRequirements](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#check-system-requirements)，对浏览器环境和设备做检测，并提示相关风险。

### 编码格式对比

两种编码格式对比如下：

<table>
  <colgroup>
    <col width="15%"/>
    <col width="40%"/>
    <col width="45%"/>
  </colgroup>
  <tbody><tr>
    <th>编码格式</th>
    <th>优势</th>
    <th>劣势</th>
  </tr>
  <tr>
    <td>H.264</td>
    <td>配套生态成熟，可直接转推 CDN，以及直接和小程序互通。</td>
    <td>在移动端浏览器上支持度稍差，例如微信浏览器，WebView 等。</td>
  </tr>
  <tr>
    <td>VP8</td>
    <td><ul><li> Google 主推，在 Chrome 浏览器中的表现优于 H.264 格式，且完全开源。</li><li>在移动端浏览器上兼容性更好，例如微信浏览器，WebView 等。</li></ul></td>
    <td>配套较差，不可直接转推 CDN，不可直接和小程序互通。</td>
  </tr>
</tbody></table>


### 浏览器兼容性

#### 桌面端

<table>
  <colgroup>
  </colgroup>
  <tbody><tr>
    <th>系统</th>
    <th>浏览器</th>
    <th>H.264</th>
    <th>VP8</th>
  </tr>
  <tr>
    <td>Windows</td>
    <td><ul><li>Chrome</li><li>Edge</li><li>Firefox</li></ul></td>
    <td>✔️</td>
    <td>✔️</td>
  </tr>
  <tr>
    <td>macOS</td>
    <td><ul><li>Chrome</li><li>Safari</li><li>Edge</li><li>Firefox</li></ul></td>
    <td>✔️</td>
    <td>✔️</td>
  </tr>
  <tr>
    <td>ChromeOS</td>
    <td>Chrome</td>
    <td>✔️</td>
    <td>✔️</td>
  </tr>
</tbody></table>

- **Chrome**
    - 在所有使用 AMD 芯片和部分使用 Intel 芯片的 Windows 设备上，Chrome 使用 H.264 编码时，发送码率可能达不到设定值。建议开发者可以使用 VP8 编码或者尝试关闭硬件加速。
    - macOS 上 Chrome 84 存在缺陷，采用 H.264 格式进行编码时，WebRTC 可能会出现帧率突然下降，从而导致图像卡顿的情况。详情请参考 Google 官方说明 [Issue 1088650](https://bugs.chromium.org/p/chromium/issues/detail?id=1203206&can=2&q=webrtc%20drop%20component%3ABlink%3EWebRTC%3EVideo) 和 [Issue 12704](https://bugs.chromium.org/p/webrtc/issues/detail?id=12704#c3)。建议开发者在 macOS 上 Chrome 84 或以上版本中使用 VP8 格式。
    
- **Safari** 

    Safari 12.1 或以下版本，仅支持 H.264 编解码。

- **Firefox**

    在使用 Apple M1 芯片的 Mac 设备上，Firefox 不支持 H.264 编解码，详见 [Firefox 官方说明](https://bugzilla.mozilla.org/show_bug.cgi?id=1686470)。

<br/>

#### 移动端

**Android**

Android 支持自研 WebView 或引入第三方 WebView，不同设备、不同应用的 WebView 实现的方式有所不同，因此 ZEGO Express Web SDK 对不同应用版本和设备硬件的支持也有不同，推荐开发者在使用前进行兼容性检测。

<table>
  <colgroup>
    <col width="25%"/>
    <col width="16%"/>
    <col width="30%"/>
    <col width="29%"/>
  </colgroup>
  <tbody><tr>
    <th>浏览器</th>
    <th>功能</th>
    <th>H.264</th>
    <th>VP8</th>
  </tr>
  <tr>
    <td>WebView</td>
    <td>推/拉流</td>
    <td>✔️</td>
    <td>✔️</td>
  </tr>
  <tr>
    <td>Chrome 浏览器</td>
    <td>推/拉流</td>
    <td>✔️</td>
    <td>✔️</td>
  </tr>
</tbody></table>

其中 WebView 包含了如微信内置浏览器、企业微信内置浏览器、QQ 内置浏览器、钉钉、头条等。在这些 WebView 和 Chrome 浏览器中，关于浏览器版本、芯片类型和编码格式的使用限制说明如下：
    
<table>
  <colgroup>
    <col width="25%"/>
    <col width="75%"/>
  </colgroup>
<tbody><tr>
<th>限制名称</th>
<th>限制说明</th>
</tr>
<tr>
<td>编码格式</td>
<td>使用 H.264 编码发送视频流可能会导致发送视频流的码率偏低，无法达到预期码率。&nbsp;</td>
</tr>
<tr>
<td>搭载芯片</td>
<td>在搭载联发科芯片的设备上无法使用 H.264 编码发送视频流。&nbsp;&nbsp;</td>
</tr>
<tr>
<td>浏览器版本及搭载芯片</td>
<td><ul>
<li>在 Android Chrome 88 以下版本，搭载华为海思麒麟芯片的设备无法使用 H.264 编码发送视频流。</li><li>在 Android Chrome 81 以下版本，搭载联发科或华为海思麒麟芯片的设备无法使用 H.264 解码接收视频流。由于 ZEGO Native SDK 发送的视频流默认为 H.264 编码，所以如果房间内有推流端使用 ZEGO Native SDK，在使用华为海思麒麟或联发科芯片的设备上，Web SDK 接收 H.264 编码格式的流时，必须使用 Chrome 81 或以上版本。</li>
<ul></ul></ul></td>
</tr>
</tbody></table>

**iOS**

iOS 只支持系统 WebView，因此 ZEGO Express Web SDK 对 WebView 的支持，仅与 iOS 系统版本有关。

<table>
  <colgroup>
    <col width="25%"/>
    <col width="16%"/>
    <col width="30%"/>
    <col width="29%"/>
  </colgroup>
  <tbody><tr>
    <th>浏览器</th>
    <th>功能</th>
    <th>H.264</th>
    <th>VP8</th>
  </tr>
  <tr>
    <td rowspan="2">WebView（微信内置浏览器等）</td>
    <td>推流</td>
    <td colspan="2">✔️（iOS 14.3 或以上版本）</td>
  </tr>
  <tr>
    <td>拉流</td>
    <td>✔️（iOS 12.1.4 或以上版本）</td>
    <td>✔️（iOS 12.2 或以上版本）</td>
  </tr>
  <tr>
    <td>Safari 浏览器</td>
    <td>推/拉流</td>
    <td>✔️（iOS 11 或以上版本）</td>
    <td>✔️（iOS 12.2 或以上版本）</td>
  </tr>
</tbody></table>
 

在 iOS 上使用 H.264 编码格式推流，无法将 1080p 或以上分辨率的视频推送到 CDN。


## 推荐方案

综合上述兼容性说明，以及 ZEGO 市场用户数据统计，不支持 VP8 的设备占比相对较少，VP8 在浏览器的兼容性方面，略优于 H.264。因此：

- 业务场景以 Web 平台为主时，**建议开发者使用 VP8 编码格式**。
- 如果开发者的业务场景中，涉及到 Web、iOS、Android、Windows、macOS 等多端平台，如果想保证良好的多端兼容性，**建议开发者使用 H.264 编码格式**。

具体的场景推荐如下：

<table>
  <colgroup>
  </colgroup>
  <tbody><tr>
    <th>主播端</th>
    <th>观众端</th>
    <th>推荐编码格式</th>
    <th>优点</th>
    <th>缺点</th>
    <th>应用场景</th>
  </tr>
  <tr>
    <td rowspan="5">WebRTC</td>
    <td>WebRTC</td>
    <td>VP8</td>
    <td>兼容性最好，质量最佳。</td>
    <td>-</td>
    <td>银行/证券开户</td>
  </tr>
  <tr>
    <td rowspan="2">CDN</td>
    <td>H.264</td>
    <td>无需转码。</td>
    <td>主播端推流时，部分机型不支持 H.264 编码格式。</td>
    <td rowspan="2">秀场直播</td>
  </tr>
  <tr>
    <td>VP8</td>
    <td>推流端兼容性较好。</td>
    <td>需手动转码。</td>
  </tr>
  <tr>
    <td>小程序</td>
    <td>H.264</td>
    <td>无需转码。</td>
    <td>主播端推流时，部分机型不支持 H.264 编码格式。</td>
    <td>银行/证券开户</td>
  </tr>
</tbody></table>


<Warning title="注意">

- Web 端拉流时，不需要指定编码格式，SDK 会根据推流编码，自动选择格式。
- Web 端选择 VP8 编码格式和 Native UDP 互通时，Native 需要指定 VP8 编码格式（默认构建支持）。 
</Warning>


不论选择 H.264 还是 VP8，都需要先对使用的浏览器进行兼容性检测。开发者可以通过 [checkSystemRequirements](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#check-system-requirements) 接口，对浏览器进行兼容性检查，这也是 SDK 自动选择编码的前提条件。

<Note title="说明">

转码，是指将视频信号从一种格式转换成另一种格式。在 ZEGO 服务中，支持音视频编码格式、分辨率、码率等的转换，开发者可以参考 [混流转码示例 Demo](https://zegodev.github.io/zego-express-webrtc-sample/vp8/index.html)。如有疑问，请联系 ZEGO 技术支持。

</Note>
