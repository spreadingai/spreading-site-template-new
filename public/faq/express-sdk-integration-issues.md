<Title>如何处理集成 Express SDK 时的相关问题？</Title>



---


### Android 平台通过 “jCenter” 集成时，“jCenter” 依赖失败，提示报错：“Failed to resolve:im.zego:express-audio:x.x.x”？

请确认依赖的 SDK 版本是否是最新的，通过 [SDK 发布历史](/real-time-video-android-java/client-sdk/download-sdk) 查询当前 SDK 版本，非最新版本则会依赖失败。




### Electron 平台使用 “Electron-Vue” 框架时，为什么会加载 SDK 失败？

“Vue” 框架要用到 “Webpack”，并将 “Webpack” 的 “require” 参数修改为 “window.require”。

 

### Web 平台如何判断硬件支持情况和权限授予情况？

硬件情况可以通过 [checkSystemRequirements\|_balnk](https://doc-zh.zego.im/zh/api?doc=Express_Video_SDK_API~javascript_web_web~class~ZegoExpressEngine#check-system-requirements) 接口，获取 “CapabilityDetection” 判断。


### 调用 createEngine 接口创建引擎时，如何设置 App 所属的应用场景 “scenario”？

调用 [createEngine](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Java_android~class~im-zego-zegoexpress-zego-express-engine&jumpType=route#create-engine) 接口创建引擎时，需要通过 “scenario” 参数设置 App 所属的应用场景，ZEGO Express SDK 提供了如下三种场景，不同场景下 [ZegoAudioConfig](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Java~class~im-zego-zegoexpress-entity-zego-audio-config) 类和 [ZegoEngineConfig](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Java~class~im-zego-zegoexpress-entity-zego-engine-config) 类的预设值不同，详情请参考下表，开发者可根据所开发 App 的实际需要选择。

<Warning title="注意">

开发者若有定制化场景需求，可以调用 [setAudioConfig](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Java_android~class~im-zego-zegoexpress-zego-express-engine&jumpType=route#set-audio-config) 接口修改 [ZegoAudioConfig](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Java~class~im-zego-zegoexpress-entity-zego-audio-config) 类中的 [CodecID](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Java~class~im-zego-zegoexpress-entity-zego-audio-config#public-func-lists) 属性，并联系 ZEGO 技术支持修改 [setEngineConfig
](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Java~class~im-zego-zegoexpress-zego-express-engine#set-engine-config) 接口 [ZegoEngineConfig](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Java~class~im-zego-zegoexpress-entity-zego-engine-config) 类中的 [advancedConfig](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Java~class~im-zego-zegoexpress-entity-zego-engine-config#advanced-config) 属性。
 

</Warning>


<Warning title="注意">macOS 和 Windows 平台无需关注 `setAudioDeviceMode`  接口。</Warning>
<table>
  <colgroup>
    <col width="15%"/>
    <col width="25%"/>
    <col width="25%"/>
    <col width="25%"/>
  </colgroup>
  <tbody><tr>
    <th>枚举值</th>
    <th>预设值</th>
    <th>详情</th>
    <th>业务场景推荐</th>
  </tr>
  <tr>
    <td rowspan="2">GENERAL（通用场景）</td>
    <td><a target="_blank" href="https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~ZegoAudioConfig#channel">ZegoAudioConfig</a> 类的 “CodecID” 属性预设为 “Normal2”</td>
    <td><ul><li>默认编码码率：48 kbps</li><li>码率范围：16 kbps ～ 192 kbps</li><li>是否支持双声道：是</li><li>延迟：500ms 左右</li><li>支持协议：ZEGO 私有协议和 RTMP 协议</li><li>用途：可用于 RTC 和 CDN 推流</li><li>转码说明：与 Web SDK 互通时需要服务端转码，转推 CDN 时不需要服务端云转码。</li></ul></td>
    <td rowspan="2"><ul><li>音乐电台</li><li>1 V 1 音乐</li></ul></td>
  </tr>
  <tr>
    <td><a target="_blank" href="https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~ZegoExpressEngine#set-audio-device-mode">setAudioDeviceMode</a> 指定参数为 "General"</td>
    <td><ul><li>麦上麦克风状态：占用</li><li>麦下麦克风状态：释放</li><li>麦上音量：媒体</li><li>麦下音量：媒体</li></ul></td>
  </tr>
  <tr>
    <td rowspan="2">COMMUNICATION（实时通讯）</td>
    <td><a target="_blank" href="https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~ZegoAudioConfig#channel">ZegoAudioConfig</a> 类的 “CodecID” 属性预设为 “Low3”</td>
    <td><ul><li>默认编码码率：48 kbps</li><li>码率范围：6 kbps ～ 192 kbps</li><li>是否支持双声道：是</li><li>延迟：200ms 左右</li><li>支持协议：ZEGO 私有协议</li><li>用途：仅限 RTC 推流</li><li>转码说明：与 Web SDK 互通时需要服务端转码，转推 CDN 时不需要服务端云转码。</li></ul></td>
    <td rowspan="2"><ul><li>语聊房</li><li>游戏开黑</li><li>小班课</li><li>1 V 1 学科</li><li>超级小班</li><li>AI 课堂</li></ul></td>
  </tr>
  <tr>
    <td><a target="_blank" href="https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~ZegoExpressEngine#set-audio-device-mode">setAudioDeviceMode</a> 指定参数为 "Communication2"</td>
    <td><ul><li>麦上麦克风状态：占用</li><li>麦下麦克风状态：占用</li><li>麦上音量：通话</li><li>麦下音量：通话</li></ul></td>
  </tr>
  <tr>
    <td rowspan="2">LIVE（直播场景）</td>
    <td><a target="_blank" href="https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~ZegoAudioConfig#channel">ZegoAudioConfig</a> 类的 “CodecID” 属性预设为 “Normal2”</td>
    <td><ul><li>默认编码码率：48 kbps</li><li>码率范围：16 kbps ～ 192 kbps</li><li>是否支持双声道：是</li><li>延迟：500ms 左右</li><li>支持协议：ZEGO 私有协议和 RTMP 协议</li><li>用途：可用于 RTC 和 CDN 推流</li><li>转码说明：与 Web SDK 互通时需要服务端转码，转推 CDN 时不需要服务端云转码。</li></ul></td>
    <td rowspan="2"><ul><li>秀场直播</li><li>电商直播</li><li>游戏直播</li><li>普通直播</li><li>大班课</li></ul></td>
  </tr>
  <tr>
    <td><a target="_blank" href="https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~ZegoExpressEngine#set-audio-device-mode">setAudioDeviceMode</a> 指定参数为 "Communication3"</td>
    <td><ul><li>麦上麦克风状态：占用</li><li>麦下麦克风状态：释放</li><li>麦上音量：通话</li><li>麦下音量：媒体</li></ul></td>
  </tr>
</tbody></table>
