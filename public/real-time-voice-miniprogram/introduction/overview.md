# 概述
---
实时语音（Express Audio）是一款实时的音频互动服务产品，能够为开发者提供便捷接入、高可靠、多平台互通的音频服务。通过低至 200 ms 的端到端平均时延，业内领先的保障弱网质量的 QoS 策略，并结合强大的 3A 处理能力，完美支持一对多、多对多的实时音频通话、直播、会议等场景。

实时语音同时为开发者提供 4 行代码全平台极速接入音频服务的能力，能够让开发者在 30 分钟内构建出拥有完美音频体验的产品和服务。

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Common/audiocall.png" /></Frame>

## 产品优势

#### 身临其境的音质

- 设备深度适配：深度适配各类麦克风、声卡等设备，实现低延迟采集、低延迟耳返和超高保真音质。
- 丰富音效：专业音频团队优化，变声美声、混响及虚拟立体声等音效场景多达 30 余种。
- 3A 及场景化 AI 降噪：自研 3A 算法及轻量级的 AI 降噪，实现极低性能损耗的噪声回声抑制后的纯净人声。业内首发场景化 AI 降噪，实时识别场景智能保证降噪和音质的综合效果。
- 范围音视频：结合距离、方向、传输介质等，通过专业算法，模拟现实沉浸式音视频通话体验。

#### 无限玩法及场景

- 大规模连麦互动：无房间人数限制，最多支持万人上麦音视频通话，助力虚拟演唱会、万人大会等场景。
- 状态实时同步：支持万人进行位置、形象等状态信息和自定义信令的有序高频、低延迟同步。
- 安全合规：针对防火墙环境提供云代理等方案，不同区域的数据合规诉求提供数据围栏等能力。
- 云服务及组件：满足更多样的玩法，提供混流及转码、音频审核、视频审核、录制截图等各种服务及组件。

#### 海量能力 API

- 基础音视频：提供实现 1v1 音视频通话、多人音视频通话、多房间音视频通话的能力。
- 高级音频处理：提供 3A、场景化 AI 降噪、变声、美声、混响、空间音效、耳返、范围音视频、人声检测等能力。
- 增值云服务：提供混流及转码、旁路转推 CDN、万人 RTC 连麦、超低延迟直播、万人状态实时同步、媒体流输入、SIP 互通等能力。
- 质量服务：提供通话前设备检测、实时网络检测、通话中质量洞察、全链路运维（星图）等能力。
- 多种生态组件：提供音频审核、超级白板、录制、即时通讯（ZIM）等组件。

#### 服务全球高可用

- 多终端及平台语言深度适配：深度适配各种耳机、声卡、摄像头等外设，适配 15000+ 终端设备及 IoT 设备，兼容 25+ 种语言及开发平台。
- 复杂网络环境高可用：音频最高抗 80% 丢包，视频抗 70% 丢包，可实现 1000ms 的超强抗抖动能力，网络带宽限制最低 30k。
- 海量有序网络 MSDN 全球覆盖：提供 500+ 个节点，覆盖 212 个国家，传输网络稳定。端对端时延最低 79ms，媲美现实的音视频体验，长距离端对端传输时延平均 300ms。
- 高达 99.99% 的服务高可用：提供高性能架构，可容纳千万级的高并发。根据线上量级，实现秒级平滑扩容，同时提供星图产品，用于支持实时跟踪质量，定位并解决问题等。



## 特性指标

<table>
  <colgroup>
    <col width="20%"/>
    <col width="80%"/>
  </colgroup>
  <tbody><tr>
    <th>特性</th>
    <th>实时语音指标</th>
  </tr>
  <tr>
    <td>多人音频</td>
    <td>支持 50 路实时语音互动。</td>
  </tr>
  <tr>
    <td>音频质量</td>
    <td><ul><li>音频采样率：16 kHz ～ 48 kHz。</li><li>支持单、双声道。</li><li>回声消除：支持 10 路同时讲话。</li></ul></td>
  </tr>
  <tr>
    <td>海量并发</td>
    <td>全球 200 多个 BGP 节点，提供稳定的跨国内容分发网络。</td>
  </tr>
</tbody></table>




## 平台兼容

实时语音支持 iOS、Android、Windows、macOS、HarmonyOS、Web、小程序并支持平台间互通，具体的兼容性要求见下表。
<table>
  <colgroup>
    <col width="20%"/>
    <col width="57%"/>
    <col width="23%"/>
  </colgroup>
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
<td>
<ul>
<li>amd64 (x86_64-linux-gnu)</li><li>arm64 (aarch64-linux-gnu)</li><li>armhf (arm-linux-gnueabihf)</li><li>armel (arm-linux-gnueabi)</li>
</ul>
</td>
</tr>
<tr>
<td>HarmonyOS</td>
<td><ul><li>DevEco Studio 4.1.3.600 Release 或以上版本</li><li>配套 <a href="https://developer.harmonyos.com/cn/docs/documentation/doc-references-V2/syscap-0000001580345394-V2?catalogVersion=V2" target="blank">API Version 11</a> 的 HarmonyOS NEXT SDK 或以上版本</li><li>配套 <a href="https://developer.harmonyos.com/cn/docs/documentation/doc-references-V2/syscap-0000001580345394-V2?catalogVersion=V2" target="blank">API Version 11</a> 的 HarmonyOS NEXT 2.0.0.59 操作系统或以上版本</li></ul></td>
<td>-</td>
</tr>
<tr>
<td>macOS</td>
<td>10.13 或以上版本</td>
<td><ul><li>x86_64</li><li>arm64</li></ul></td>
</tr>
<tr>
<td>Web</td>
<td><ul><li>Chrome 58 或以上版本</li><li>Firefox 56 或以上版本</li><li>Safari 11 或以上版本</li><li>Opera 45 或以上版本</li><li>QQ 浏览器 Windows 10.1 或以上版本、macOS 4.4 或以上版本</li><li>360 安全浏览器极速模式</li></ul><p>更多兼容性要求，请参考 <a target="_blank" href="/real-time-video-web/introduction/browser-restrictions">限制说明 - 浏览器兼容性说明</a></p></td>
<td>-</td>
</tr>
<tr>
<td>小程序</td>
<td><ul><li>微信小程序基础库 1.7.0 或以上版本</li><li>支付宝小程序基础库 1.23.0 或以上版本，低版本需要做 <a target="_blank" href="https://opendocs.alipay.com/mini/framework/compatibility">兼容处理</a></li></ul></td>
<td>-</td>
</tr>
<tr>
<td>Flutter</td>
<td><ul><li>Flutter 2.0 或以上版本</li><li>iOS 12.0 或以上版本</li><li>Android 4.4 或以上版本
</li><li>Windows 7 或以上版本（注意：目前 SDK 在 Windows 上仅支持音频功能，暂不支持视频功能）</li><li>Web： Chrome 58 或以上版本、Firefox 56 或以上版本、Safari 11 或以上版本、Opera 45 或以上版本、QQ 浏览器 Windows 10.1 或以上版本/macOS 4.4 或以上版本、360 安全浏览器极速模式</li></ul></td>
<td>-</td>
</tr>
<tr>
<td>Electron</td>
<td><ul><li>Electron 7.0.0 或以上版本</li><li>Windows 7 及以上 / macOS 10.13 及以上操作系统</li></ul></td>
<td>-</td>
</tr>
<tr>
<td>uni-app</td>
<td><ul><li>HBuilderX 3.0.0 或以上版本</li><li>iOS 12.0 或以上版本</li><li>Android 4.4 或以上版本</li></ul></td>
<td>-</td>
</tr>
<tr>
<td>Unity3D</td>
<td><ul><li>Unity 2018.4.21f1 或以上版本</li><li>Android：Android 4.4 或以上版本</li><li>iOS：Xcode 15.0 或以上版本，iOS 12.0 或以上版本</li><li>macOS：macOS 10.13 或以上版本</li><li>Windows：Windows 7 或以上版本</li></ul></td>
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

<Note title="说明">如果您有更多关于平台或版本支持的相关需求，请联系 ZEGO 技术支持处理。</Note>

## 语言及框架支持


<Button primary-color="White" target="_blank" href="/real-time-voice-ios/introduction/overview" icon={""}>iOS(Objective-C)</Button>
<Button primary-color="White" target="_blank" href="/real-time-voice-ios-swift/introduction/overview" icon={""}>iOS(Swift)</Button>
<Button primary-color="White" target="_blank" href="/real-time-voice-android/introduction/overview" icon={""}>Android(Java)</Button>
<Button primary-color="White" target="_blank" href="/real-time-voice-android-kotlin/introduction/overview" icon={""}>Android(Kotlin)</Button>
<Button primary-color="White" target="_blank" href="/real-time-voice-macos/introduction/overview" icon={""}>macOS(Objective-C)</Button>
<Button primary-color="White" target="_blank" href="/real-time-voice-macos-swift/introduction/overview" icon={""}>macOS(Swift)</Button>
<Button primary-color="White" target="_blank" href="/real-time-voice-macos-cpp/introduction/overview" icon={""}>macOS(C++)</Button>
<Button primary-color="White" target="_blank" href="/real-time-voice-windows/introduction/overview" icon={""}>Windows(C++)</Button>
<Button primary-color="White" target="_blank" href="/real-time-voice-harmonyos/introduction/overview" icon={""}>HarmonyOS(ArkTS)</Button>
<Button primary-color="White" target="_blank" href="/real-time-voice-linux/introduction/overview" icon={""}>Linux(C++)</Button>
<Button primary-color="White" target="_blank" href="/real-time-voice-web/introduction/overview" icon={""}>Web(JS)</Button>
<Button primary-color="White" target="_blank" href="/real-time-voice-miniprogram/introduction/overview" icon={""}>小程序(JS)</Button>
<Button primary-color="White" target="_blank" href="/real-time-voice-flutter/introduction/overview" icon={""}>Flutter(Dart)</Button>
<Button primary-color="White" target="_blank" href="/real-time-voice-electron/introduction/overview" icon={""}>Electron(JS)</Button>
<Button primary-color="White" target="_blank" href="/real-time-voice-ue/introduction/overview" icon={""}>Unreal Engine(C++)</Button>
<Button primary-color="White" target="_blank" href="/real-time-voice-u3d/introduction/overview" icon={""}>Unity3D(C#)</Button>
<Button primary-color="White" target="_blank" href="/real-time-voice-uniapp/introduction/overview" icon={""}>uni-app(JS)</Button>
<Button primary-color="White" target="_blank" href="/real-time-voice-rn/introduction/overview" icon={""}>React Native(JS)</Button>
<Button primary-color="White" target="_blank" href="/real-time-voice-cocos-creator/introduction/overview" icon={""}>Cocos Creator(TS)</Button>