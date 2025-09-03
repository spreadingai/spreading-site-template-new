# 耳返与声道设置

- - -

## 功能简介

ZEGO Express SDK 提供了耳返和双声道的功能，开发者可根据需要设置。

- 耳返，是指耳机采集监听，在设备上插入耳机（普通耳机或蓝牙耳机）后，能从本机耳机侧听到本设备麦克风采集的声音。
- 双声道，是指两个声音通道，听到声音时可以根据左耳和右耳对声音相位差来判断声源的具体位置。ZEGO Express SDK 默认音频采集单声道，当开发者有高音质需求时，可开启双声道采集功能，通过专门的双声道采集设备可以采集到双声道的音频数据并进行推流。

## 示例源码下载

请参考 [下载示例源码](https://doc-zh.zego.im/article/4658) 获取源码。

相关源码请查看 “src/Examples/AdvancedAudioProcessing/EarReturnAndChannelSettings” 目录下的文件。

## 前提条件

在设置耳返和声道功能之前，请确保：

- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppID 和 Server 地址，详情请参考 [控制台 - 项目信息](/console/project-info)。
- 已在项目中集成 ZEGO Express SDK，并实现了基本的音视频推拉流功能，详情请参考 [快速开始 - 集成](https://doc-zh.zego.im/article/199) 和 [快速开始 - 实现流程](https://doc-zh.zego.im/article/7638)。

## 使用步骤

### 预览本地媒体流

调用 [createZegoStream](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#create-zego-stream) 接口，创建 [ZegoLocalStream](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoLocalStream) 实例对象 localStream，用于预览本地媒体流。

```js
const localStream = await zg.createZegoStream();
// 预览推流前或者推流中的流，将播放组件挂载到页面组件容器 DOM 元素上。
localStream.playVideo(document.querySelector("#local-video"));
```

### 设置耳返

#### 开启耳返

开启预览或开始推流后，可调用 localStream 的 [playAudio](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoStreamView#play-audio) 接口，开始播放音频，即开启耳返功能，主播方讲话后，会听到自己的声音。

<Warning title="注意">


开启耳返后，需要插上耳机使用，否则会把外放的声音也采集进去，导致出现回音问题。

</Warning>



```javascript
// localStream 为 createZegoStream 创建的 ZegoLocalStream 实例对象
localStream.playAudio();
```

#### 设置耳返音量

开启预览或开始推流后，可调用 localStream 的 [setVolume](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressPlayer#set-volume) 接口，调整耳返的音量。

其中 `volume` 为播放的音量大小，取值范围 [0, 100] ，默认为 100。

```javascript
// volume 取值范围 [0,100]
localStream.setVolume(volume);
```

### 设置声道

#### 创建流并设置双声道

调用 [createZegoStream ](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#create-zego-stream) 接口创建流，并通过 `camera` 对象下 `audio` 的 `channelCount` 参数设置声道数，其中 channelCount 取值：

* 1：表示单声道
* 2：表示双声道

```javascript
const localStream = await zg.createZegoStream({camera: {
    video: true,
    audio: {
        // 设置为 2 代表双声道
        channelCount: 2
    }
}})
// 推流
zg.startPublishingStream(streamID, localStream);
```

<Content />

