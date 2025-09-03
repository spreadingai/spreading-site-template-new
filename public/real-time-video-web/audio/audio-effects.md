# 变声/混响/立体声

- - -

## 功能简介

在直播、语聊房、K 歌房场景中，为增加趣味性和互动性，玩家可以通过变声来搞怪，通过混响烘托气氛，通过立体声使声音更具立体感。ZEGO Express SDK 提供了多种预设的变声、混响、立体声效果，开发者可以灵活设置自己想要的声音，如果需要试听，可以启用耳返进行测试。

* 变声：通过改变用户的音调，使输出的声音在感官上与原始声音不同，实现男声变女生等多种效果。
* 混响：通过对声音的特殊处理，制造不同环境的混响效果，让声音如同在音乐厅、大教堂等场景中发出一般。
* 虚拟立体声：通过深度使用双声道技术，虚拟出发音源的各个位置角度，实现立体声、3D 环绕音、听声辩位等效果。

您可通过 ZEGO 提供的 [音效体验 DEMO](https://www.zego.im/audio-demo) 体验 SDK 预设的人声效果。

<Warning title="注意">


- 该功能只针对 SDK 采集的声音有效，开发者可以在通话或直播过程中动态调整变声、混响、虚拟立体声。
- 目前仅支持对特定的一条流进行处理，不支持同时对多条流进行处理。
- 混响、虚拟立体声、变声等功能，不支持同时开启使用，否则效果可能出现异常。

</Warning>




## 前提条件

在进行变声/混响/立体声之前，请确保：

- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppID 和 Server 地址，详情请参考 [控制台 - 项目信息](/console/project-info)。
- 已在项目中集成 ZEGO Express SDK，并实现了基本的音视频推拉流功能，详情请参考 [快速开始 - 集成](https://doc-zh.zego.im/article/199) 和 [快速开始 - 实现流程](https://doc-zh.zego.im/article/7638)。


## 使用步骤

### 变声

有两种方式设置变声，分别为预设变声和自定义变声。

#### 设置预设变声

<Warning title="注意">


- PC Web：变声功能支持在 Google Chrome 66.0、Microsoft Edge 79.0、FireFox 76.0 和 Safari 14.1 及以上版本使用，但为了确保变声功能的稳定性，推荐您使用最新版的 Google Chrome 浏览器或 Microsoft Edge 浏览器。
- 移动端：为了确保使用变声功能的稳定性，推荐使用 Safari 或者 Google Chrome 96.0 以上浏览器，部分 Android 微信浏览器使用变声功能可能会存在一点电流声。

</Warning>



1. 调用 [createZegoStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#create-zego-stream) 接口，创建 [ZegoLocalStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoLocalStream) 媒体流。

```javascript
// 变声模块引入
import {VoiceChanger} from "zego-express-engine-webrtc/voice-changer";
// 需要在 new ZegoExpressEngine 前调用
ZegoExpressEngine.use(VoiceChanger);
// 初始化实例
const zg = new ZegoExpressEngine(appID, server);
// 创建媒体流
const localstream = await zg.createZegoStream();
```

2. 设置变声效果。调用 [setVoiceChangerPreset ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#set-voice-changer-preset) 接口，传入需要进行变声的媒体流，开始变声处理，并完成变声处理的相关设置。

[ZegoVoiceChangerPreset](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~enum~ZegoVoiceChangerPreset) 预置的变声效果如下，开发者可以根据需要选择：

| 类型名       | 预设值| 描述       | 变声类型 |
| -------------- |  ---------- |---------- |---  |
| NONE           | 0 |无变声     |-     |
| MEN_TO_CHILD   | 1 |男声变童声 | 变声   |
| MEN_TO_WOMEN   | 2 |男声变女声 | 变声   |
| WOMEN_TO_CHILD | 3 |女声变童声 | 变声   |
| WOMEN_TO_MEN   | 4 |女声变男声 | 变声   |
| FOREIGNER      | 5 |外国人声效 | 变声   |
| OPTIMUS_PRIME  | 6 |擎天柱声效 |变声   |
| ANDROID        | 7 |机器人声效 |变声   |
| ETHEREAL       | 8 |空灵声效  | 音色变换 |
| MALE_MAGNETIC | 9 |磁性男 |房间美声|
| FEMALE_FRESH | 10 |清新女 |房间美声|
| MAJOR_C | 11 |C 大调电音 |电音音效|
| MINOR_A | 12 |A 小调电音 |电音音效|
| HARMONIC_MINOR | 13 |和声小调电音 |电音音效|
| FEMALE_ENERGETIC | 14 |女活力音效 |房间美声|
| RICH_NESS | 15 |浑厚音效|房间美声|
| MUFFLED | 16 |低沉音效|房间美声|
| ROUNDNESS |17 |圆润音效|房间美声|
| FALSETTO | 18 |假音音效|房间美声|
| FULLNESS | 19 |饱满音效 |房间美声|
| CLEAR | 20 |清澈音效|房间美声|
| HIGHLY_RESONANT | 21 |高亢音效 |房间美声|
| LOUD_CLEAR | 22 |嘹亮音效 |房间美声|

以下示例代码以“男声变童声”为例：

```js
// localStream 为通过 createZegoStream 创建的 zego 流对象
zg.setVoiceChangerPreset(1, localStream);
```

#### 设置自定义变声

若 SDK 预置的变声效果无法满足需求，开发者可以调用 [setVoiceChangerParam](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#set-voice-changer-param) 中 "voiceParam" 参数值设置自定义变声。该参数取值范围为 [-12.0, 12.0]，值越大声音越尖锐，默认值为 “0.0”（即无变声）。

```js
// localStream 为通过 createZegoStream 创建的 zego 流对象
zg.setVoiceChangerParam(localStream, 5);
```

### 混响

#### 创建媒体流

调用 [createZegoStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#create-zego-stream) 接口，创建 [ZegoLocalStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoLocalStream) 媒体流，示例代码请参考 [变声](#变声) 的第 1 步。

#### 设置混响效果

调用 [setReverbPreset](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#set-reverb-preset) 通过预设枚举设置混响。

[ZegoReverbPreset](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~enum~ZegoReverbPreset) 预置的混响效果如下，开发者可以根据需要选择：

<table>

<tbody><tr>
<th>类型名</th>
<th>预设值</th>
<th>描述</th>
<th>混响类型</th>
</tr>
<tr>
<td>NONE</td>
<td>0</td>
<td>无</td>
<td>-</td>
</tr>
<tr>
<td>SOFT_ROOM</td>
<td>1</td>
<td>小房间</td>
<td>空间塑造</td>
</tr>
<tr>
<td>LARGE_ROOM</td>
<td>2</td>
<td>大房间</td>
<td>空间塑造</td>
</tr>
<tr>
<td>CONCERT_HALL</td>
<td>3</td>
<td>音乐厅</td>
<td>空间塑造</td>
</tr>
<tr>
<td>VALLEY</td>
<td>4</td>
<td>山谷</td>
<td>空间塑造</td>
</tr>
<tr>
<td>RECORDING_STUDIO</td>
<td>5</td>
<td>录音室</td>
<td>空间塑造</td>
</tr>
<tr>
<td>BASEMENT</td>
<td>6</td>
<td>地下室</td>
<td>空间塑造</td>
</tr>
<tr>
<td>KTV</td>
<td>7</td>
<td>KTV，适用于音色瑕疵较为明显的用户</td>
<td>空间塑造</td>
</tr>
<tr>
<td>POPULAR</td>
<td>8</td>
<td>流行</td>
<td>曲风</td>
</tr>
<tr>
<td>ROCK</td>
<td>9</td>
<td>摇滚</td>
<td>曲风</td>
</tr>
<tr>
<td>VOCAL_CONCERT</td>
<td>10</td>
<td>演唱会</td>
<td>空间塑造</td>
</tr>
<tr>
<td>GRAMO_PHONE</td>
<td>11</td>
<td>留声机</td>
<td>空间塑造</td>
</tr>
<tr>
<td>ENHANCED_KTV</td>
<td>12</td>
<td>增强型 KTV，更集中、亮度更好的 KTV 人声效果，适用于普通用户和专业用户</td>
<td>空间塑造</td>
</tr>
</tbody></table>


以下示例代码以“大房间”模式为例：

```js
// localStream 为通过 createZegoStream 创建的 zego 流对象
zg.setReverbPreset(localStream, 2);
```

<Note title="说明">


Web SDK 暂不支持自定义混响效果。

</Note>




### 虚拟立体声

#### 设置推流音频声道数

如果需要开启虚拟立体声功能，必须在创建 [ZegoLocalStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoLocalStream) 媒体流时设置双声道，即调用 [createZegoStream ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#create-zego-stream) 方法时，设置 ZegoStreamOptions.camera.audio.channelCount 为 2（默认为单声道）。

示例代码为创建一个双声道的纯音频媒体流。

```js
const localStream = await zg.createZegoStream({
    camera: {
        video: false,
        audio: {
            channelCount: 2
        },
    }
});
```

#### 设置虚拟立体声参数

设置音频编码声道为双声道后，调用 [enableVirtualStereo ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#enable-virtual-stereo) 方法，通过 “enable” 参数开启虚拟立体声，并通过 “angle” 参数设置虚拟立体声的声源角度后，才有立体声效果。角度范围为 0 ～ 360，一般可设为 90 度（即正前方）。

<Note title="说明">



SDK 支持全方位虚拟立体声效果，使用方式为将 “angle” 角度参数设置为 “-1”。

</Note>




此处示例为开启虚拟立体声并将角度设置为 90 度：

```js
zg.enableVirtualStereo(localStream, true, 90);
```

此处示例为开启全方位虚拟立体声：

```js
zg.enableVirtualStereo(localStream, true, -1);
```

## 常见问题

1. **在 Safari 浏览器上，拉流方开启麦克风采集时，为什么没有立体声效果了？**

    在拉流方开启麦克风采集的情况下，拉流渲染的声音会变成 `单声道` 效果。如果需要在拉流时保持 `立体声` 效果，拉流方应关闭麦克风采集。
