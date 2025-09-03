# 自定义音频采集

- - -

## 功能简介

ZEGO 提供自定义音频采集功能，一般应用于需要从现有音频流、音频文件中获得采集后输入，交给 SDK 传输的场景。

## 示例源码下载

请参考 [下载示例源码](https://doc-zh.zego.im/article/4658) 获取源码。

相关源码请查看 “src/Examples/AdvancedAudioProcessing/CustomAudioCaptureAndRendering” 目录下的文件。

## 前提条件

在实现自定义音频采集之前，请确保：

- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppID 和 Server 地址，详情请参考 [控制台 - 项目信息](/console/project-info)。
- 已在项目中集成 ZEGO Express SDK，并实现了基本的音视频推拉流功能，详情请参考 [快速开始 - 集成](https://doc-zh.zego.im/article/199) 和 [快速开始 - 实现流程](https://doc-zh.zego.im/article/7638)。


## 使用步骤

<Warning title="注意">


- 暂不支持在 Safari 浏览器上进行第三方音视频推拉流。
- 在线资源地址可能由于跨域问题而无法获取，需要允许跨域。
- 资源文件较大时，可能加载时间较长，需要在加载完成后，再获取音频流。
- 自 Google Chrome 86 开始，推第三方音频流时，如果本地音频设置静音，拉流端将无法听到对应的声音。

</Warning>



#### 设置第三方媒体流

调用 [createZegoStream ](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#create-zego-stream) 接口创建第三方媒体流，再调用 [startPublishingStream](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#start-publishing-stream) 接口推流。

```javascript
// 开始预览（渲染）
previewVideo.srcObject = mediaStream;
// 采集
const stream = await zg.createZegoStream({
    custom: {
        audio: {
            source: mediaStream
        }
    }
})
// 推流
zg.startPublishingStream(idName, stream);
```

#### 设置第三方音频

调用 [createZegoStream ](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#create-zego-stream) 接口创建第三方音频，再调用 [startPublishingStream](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#start-publishing-stream) 接口推流。

`source` 为 \<audio> 对象时，将其指定的音频源作为预览。

```javascript
// 开始渲染
<audio id="customAudio" crossorigin="anonymous" loop autoplay playsinline  controls  src="xxxx" />

// 采集：localAudio 为 <audio> 对象
const localAudio = document.querySelector("#customAudio")
const stream = await zg.createZegoStream({
    custom: {
        audio: {
            source: localAudio
        }
    }
})
// 推流
zg.startPublishingStream(idName, stream);
```

<Content />

