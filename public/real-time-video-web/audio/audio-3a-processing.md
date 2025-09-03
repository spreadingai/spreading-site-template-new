# 音频 3A 处理

- - -

## 功能简介

在实时音视频通话时，可以对音频进行 3A 处理，主要包括 AEC（Acoustic Echo Cancelling，回声消除），AGC（Automatic Gain Control，自动增益控制）和 ANS（Active Noise Control，降噪），以提高通话质量和用户体验。

- AEC（回声消除）：对采集到的音频数据进行过滤以减少音频中的回声。
- AGC（自动增益控制）：开启该功能后，SDK 能够自动调节麦克风音量，适应远近拾音，保持音量稳定。
- ANS（降噪）：识别声音中的背景噪声并进行消除，开启该功能后可以使人声更加清晰。

## 示例源码下载

请参考 [下载示例源码](https://doc-zh.zego.im/article/3211) 获取源码。

相关源码请查看 “src/Examples/AdvancedAudioProcessing/AEC_ANS_AGC” 目录下的文件。

## 默认配置与推荐配置

SDK 中音频 3A 处理的默认配置和推荐配置如下：

<table>

  <tbody><tr>
    <th>参数名称</th>
    <th>参数描述</th>
    <th>默认配置</th>
    <th>推荐配置</th>
  </tr>
  <tr>
    <td>[AEC](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoCamera#aec)</td>
    <td>开/关回声消除。</td>
    <td>未调用此参数前，SDK 内部会自动判断是否需要使用 AEC，一旦调用此参数，则 SDK 不再自动判断。</td>
    <td>在一般使用场景中，建议不修改该配置，保持默认即可。</td>
  </tr>
  <tr>
    <td>[AGC](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoCamera#agc)</td>
    <td>开/关自动增益控制。</td>
    <td>未调用此参数前，SDK 内部会自动判断是否需要使用 AGC，一旦调用此参数，则 SDK 不再自动判断。</td>
    <td><ul><li>在普通语聊场景中，建议使用默认配置。</li><li>在音乐电台场景中，建议不开启自动增益控制以还原人声。</li><li>在教育场景中，如大班课、小班课和 1v1 等，建议开启自动增益控制。</li></ul></td>
  </tr>
  <tr>
    <td>[ANS](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoCamera#ans)</td>
    <td>开/关噪声抑制。</td>
    <td>未调用此参数前，SDK 内部会自动判断是否需要使用 ANS，一旦调用此参数，则 SDK 不再自动判断。</td>
    <td>在一般使用场景中，建议不修改该配置，保持默认即可。</td>
  </tr>
</tbody></table>


## 前提条件

在使用音频 3A 处理之前，请确保：

- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppID 和 Server 地址，详情请参考 [控制台 - 项目信息](/console/project-info)。
- 已在项目中集成 ZEGO Express SDK，并实现了基本的音视频推拉流功能，详情请参考 [快速开始 - 集成](https://doc-zh.zego.im/article/199) 和 [快速开始 - 实现流程](https://doc-zh.zego.im/article/7638)。

## 使用步骤

调用 [createZegoStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#create-zego-stream) 接口，创建 [ZegoLocalStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoLocalStream) 实例对象 localStream，通过 [camera](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoStreamOptions#camera) 视频数据采集方式配置 3A 开关。


当通过摄像头和麦克风采集源数据时，使用 [ZegoCaptureMicrophone](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoCaptureMicrophone) 对象中的 “ANS”、 “AGC”、 “AEC” 参数，分别设置降噪、自动增益、和回声消除开关。“true” 表示开启，“false” 表示关闭。

<Warning title="注意">


- 创建流时只能选择 “camera”、“screen”、“custom” 中的一种配置模式。
- 默认情况下，SDK 会根据浏览器的默认能力，判断是否开启 “ANS”、“AGC”、“AEC” 处理。**如无特殊情况，建议开发者保持默认配置。**

</Warning>



```javascript
const zg = new ZegoExpressEngine(appID, server);
// 以下配置为关闭了 3A，若无特殊情况建议开发者保持默认配置
option = {
    camera: {
        video: true
  	audio: {
            ANS: false,
            AGC: false,
            AEC: false
        }
    }
}
const localStream = await zg.createZegoStream(option)
```

<Warning title="注意">


若是在创建流后，推流中，需要配置 3A 处理，可以使用 [setAudioConfig](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#set-audio-config) 进行修改。

</Warning>


