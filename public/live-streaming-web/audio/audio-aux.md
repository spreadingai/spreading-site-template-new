# 混音

- - -

## 功能简介

混音是指 SDK 将第三方音频数据与麦克风采集的音频数据整合为一路音频流，以实现在通话或直播过程中播放音效（如掌声、口哨声）、自定义声音、音乐文件等，并且让房间内的其他成员也能听到声音。

## 示例源码下载

请参考 [下载示例源码](/real-time-video-web/quick-start/run-example-code) 获取源码。

相关源码请查看 “src/Examples/AdvancedAudioProcessing/AudioMixing” 目录下的文件。

## 前提条件

在使用混音功能之前，请确保：

- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppID 和 Server 地址，详情请参考 [控制台 - 项目信息](/console/project-info)。
- 已在项目中集成 ZEGO Express SDK，并实现了基本的音视频推拉流功能，详情请参考 [快速开始 - 集成](https://doc-zh.zego.im/article/199) 和 [快速开始 - 实现流程](https://doc-zh.zego.im/article/7638)。


## 使用步骤

### （可选）变调

<Accordion title="开始混音前，开发者可以根据需要，选择是否对媒体标签的音频进行变调" defaultOpen="false">
在混音前，开发者可以根据业务需要，通过 [setAudioChangerParam](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#set-audio-changer-param) 接口改变音频数据的音调。例如，在 KTV 独唱场景中，对伴奏进行升、降调，同时保持人声不变。

<Warning title="注意">


- 同一时间内，一个 \<video> 或 \<audio> 标签的数据仅能进行一种音效处理，不可同时进行多种处理，即变声、混响、立体声、变调只能选择一种使用。
- 针对同一个 \<audio> 标签的音频数据，如果开发者调用了 [setAudioChangerParam](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#set-audio-changer-param)、[enableLiveAudioEffect](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#enable-live-audio-effect)（两个接口都包含 mode 参数，用于设置音效生效模式），则音效生效模式以最后调用的接口设置为准。

</Warning>



```js
const result = await zg.setAudioChangerParam(
    document.getElementById("audio"),
    3,
    3
);
```
</Accordion>


### 开始混音

推流后，调用 [startMixingAudio](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#start-mixing-audio) 方法开始混音，通过 `streamID` 及 `mediaList`（媒体标签列表：`video` 或 `audio`）将音频混入正在推的流中。

<Warning title="注意">


- 通过 `video` 或 `audio` 媒体标签来控制已混入音频的暂停、恢复操作。
- 自 Chrome 86 开始，混第三方音频时，如果本地音频设置静音，拉流端将无法听到对应的声音。
- 受 Safari 浏览器策略影响，将 `audio` 标签设置为静音，会出现播放后自动暂停、无法混入多条音频的情况。
- 通过能力检测接口 [checkSystemRequirements](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#check-system-requirements) 检查到 `customCapture` 为 `false` ，即浏览器不支持获取媒体元素的 `MediaStream`，则不能使用该接口。

</Warning>



```javascript
const result = zg.startMixingAudio(publishStreamId, [
    $('#extenerVideo1')[0] ,
    $('#extenerVideo2')[0] ,
]);
console.warn('混音', result);
```

### 停止混音

<Warning title="注意">


- 通过能力检测接口 [checkSystemRequirements](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#check-system-requirements) 检查到 `customCapture` 为 `false` ，即浏览器不支持获取媒体元素的 `MediaStream`，则不能使用该接口。

</Warning>



调用 [stopMixingAudio](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#stop-mixing-audio) 方法停止混音。

```javascript
zg.stopMixingAudio(publishStreamId);
```

<Content />

