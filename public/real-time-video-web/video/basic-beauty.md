# 基础美颜

- - -

## 功能简介

ZEGO 提供基础美颜功能，为用户呈现出良好的肌肤状态，打造独特自然的美颜效果。该功能常用于视频通话、直播等场景。

开发者可以开启美颜开关，然后根据需要调整美白、磨皮、锐化以及红润的程度，轻松实现基础美颜功能。

<video poster="https://doc-media.zego.im/sdk-doc/Pics/Common/ZegoExpressEngine/ExpressBeauty.png" src="https://doc-media.zego.im/sdk-doc/doc/video/Express_Video_SDK/ExpressBeauty.mp4" width="65%" muted="true" loop="true" autoplay="autoplay" preload="auto" nocontrols></video>



支持美颜功能的浏览器如下表：

| 浏览器 | 兼容版本 |
|  ----  | ----  |
|Chrome	|65 及以上|
|Firefox | 70 及以上|
|Safari | 12 ～14 或 15.2 及以上 |
|Edge |	80 及以上 |
|移动端浏览器| 不支持 |
|微信内嵌网页| 不支持 |


## 示例源码下载

请参考 [下载示例源码](https://doc-zh.zego.im/article/3211) 获取源码。

相关源码请查看 “src/Examples/Others/EffectsBeauty” 目录下的文件。


## 前提条件

在实现美颜功能之前，请确保：

- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppID 和 Server 地址，详情请参考 [控制台 - 项目信息](/console/project-info)。
- 已在项目中集成 ZEGO Express SDK，并实现了基本的音视频推拉流功能，详情请参考 [快速开始 - 集成](https://doc-zh.zego.im/article/199) 和 [快速开始 - 实现流程](https://doc-zh.zego.im/article/7638)。


## 使用步骤

1. 调用 [createZegoStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#create-zego-stream) 接口获取到 [ZegoLocalStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoLocalStream) 实例对象，采集到流后，通过 ZegoExpressEngine 实例调用 [setEffectsBeauty](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#set-effects-beauty) 接口开启基础美颜功能，并可以根据需要通过 [ZegoEffectsBeautyParam](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoEffectsBeautyParam) 的 4 个参数设置美颜效果。

- smoothIntensity：磨皮，在保留脸部细节的基础上进行磨皮，比如脸上的痣会保留。
- whitenIntensity：美白，对画面整体调高亮度来美白脸部。
- rosyIntensity：红润，对画面整体进行暖色处理。
- sharpenIntensity：锐化，对画面整体进行锐化处理，当画面有些模糊时可以稍微调大锐化使轮廓清晰。

以上四个参数的取值范围都为 0 ～ 100，取值越大美颜程度越高，默认值为 50。

<Warning title="注意">


- 如果在推流前开启美颜，需要等待美颜开启完成后再调用 [startPublishingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#start-publishing-stream) 接口推流。
- 美颜效果与对应的 MediaStream 绑定，当调用 [useVideoDevice](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#use-video-device) 接口时不会改变 MediaStream 的美颜效果。
- 美颜处理占用资源并消耗性能，当不需要使用美颜时请及时调用 `zg.setEffectsBeauty(localStream,false)` 关闭。
- 当调用 [destroyStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#destroy-stream) 销毁流的同时 SDK 会关闭美颜效果，其他情况 SDK 不会自动关闭美颜，需要自行调用 `zg.setEffectsBeauty(localStream,false)` 关闭。

</Warning>




```javascript
// 创建流，zg 为 ZegoExpressEngine 实例对象。
const localStream = await zg.createZegoStream();
const enable = true;
// 开启美颜
// setEffectsBeauty 是 Promise 异步方法，异步函数执行完美颜才完成开启。
await zg.setEffectsBeauty(
    localStream,
    enable,
    {
        sharpenIntensity: 50,
        whitenIntensity: 50,
        rosyIntensity: 50,
        smoothIntensity: 50
    }
)

// 开始推流
// 如果是推流前开启美颜，需要等待美颜开启完成才能进行推流。
zg.startPublishingStream("stream1", localStream);

// 关闭美颜
await zg.setEffectsBeauty(localStream, false);
```
