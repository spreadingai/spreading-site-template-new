# 变声/混响/立体声

- - -

## 功能简介

<Warning title="注意">


本文档暂不适用于 Web 平台。

</Warning>



在直播、语聊房、K 歌房场景中，为增加趣味性和互动性，玩家可以通过变声来搞怪，通过混响烘托气氛，通过立体声使声音更具立体感。ZegoExpress SDK 提供了多种预设的变声、混响、混响回声、立体声效果，开发者可以灵活设置自己想要的声音，如果需要试听，可以启用耳返进行测试。

* 变声：通过改变用户的音调，使输出的声音在感官上与原始声音不同，实现男声变女生等多种效果。
* 混响：通过对声音的特殊处理，制造不同环境的混响效果，让声音如同在音乐厅、大教堂等场景中发出一般。
* 混响回声：通过对声音的特殊处理，可搭配变声、混响以实现自定义各式各样的声音效果，例如空灵，机器人的声音。
* 虚拟立体声：通过深度使用双声道技术，虚拟出发音源的各个位置角度，实现立体声、3D 环绕音、听声辩位等效果。

您可通过 ZEGO 提供的 [音效体验 DEMO](https://www.zego.im/audio-demo) 体验 SDK 预设的人声效果。

<Note title="说明">


该功能只针对 SDK 采集的声音有效，开发者可以在通话或直播过程中动态调整变声、混响、混响回声、虚拟立体声。

</Note>




## 示例源码下载

请参考 [下载示例源码](https://doc-zh.zego.im/article/17152) 获取源码。

相关源码请查看 “lib\topics\AudioAdvanced\voice_change” 目录下的文件。

## 前提条件

在进行变声/混响/立体声之前，请确保：

- 已在项目中集成 ZEGO Express SDK，实现基本的实时音视频功能，详情请参考 [快速开始 - 集成](https://doc-zh.zego.im/article/17151) 和 [快速开始 - 实现流程](https://doc-zh.zego.im/article/17184)。
- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppID 和 AppSign，详情请参考 [控制台 - 项目信息](/console/project-info)。


## 使用步骤

### 变声

有两种方式设置变声，分别为预设变声和自定义变声。

**设置预设变声**

<Note title="说明">



如果需要设置自定义变声，请查看 [设置自定义变声](https://doc-zh.zego.im/article/17171#4_1_2)。

</Note>



调用 [setVoiceChangerPreset ](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePreprocess/setVoiceChangerPreset.html) 方法使用 SDK 预置的变声效果。

[ZegoVoiceChangerPreset](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoVoiceChangerPreset.html) 预置的变声效果如下，开发者可以根据需要选择：

| 类型名       | 描述       | 变声类型 |
| -------------- | ---------- |---  |
| None           | 无变声     |-     |
| MenToChild   | 男声变童声（萝莉声效） | 变声   |
| MenToWomen   | 男声变女声（幼儿园声效） | 变声   |
| WomenToChild | 女声变童声 | 变声   |
| WomenToMen   | 女声变男声 | 变声   |
| Foreigner      | 歪果仁声效 | 变声   |
| OptimusPrime  | 擎天柱声效 |变声   |
| Android        | 机器人声效 |变声   |
| Ethereal       | 空灵声效  | 音色变换 |
| MaleMagnetic | 磁性男 |房间美声|
| FemaleFresh | 清新女 |房间美声|
| MajorC | C大调电音 |电音音效|
| MinorA | A小调电音 |电音音效|
| HarmonicMinor | 和声小调电音 |电音音效|
| FemaleEnergetic | 女活力音效 |房间美声|
| RichNess | 浑厚音效 |房间美声|
| Muffled | 低沉音效 |房音色变换|
| Roundness | 圆润音效 |房间美声|
| Falsetto | 假音音效 |房间美声|
| Fullness | 饱满音效 |房间美声|
| Clear | 清澈音效 |房间美声|
| HighlyResonant | 高亢音效 |房间美声|
| LoudClear | 嘹亮音效 |房间美声|
| Minions | 小黄人音效 |变声|
| Autobot | 汽车人音效	 |变声|
| OutOfPower | 没电了音效 |变声|

以下示例代码以“男声变童声”为例：

```dart
ZegoExpressEngine.instance.setVoiceChangerPreset(ZegoVoiceChangerPreset.MenToChild);
```

**设置自定义变声**

<Note title="说明">



如果需要设置预设变声，请查看 [设置预设变声](https://doc-zh.zego.im/article/17171#4_1_1)。

</Note>



若 SDK 预置的变声效果无法满足需求，开发者可以调用 [ZegoVoiceChangerParam ](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoVoiceChangerParam-class.html) 方法，通过音高参数 “pitch” 设置自定义变声，该参数取值范围为 [-12.0, 12.0]，值越大声音越尖锐，默认值为 “0.0”（即无变声）。

<Warning title="注意">

2.18.0 及以前版本，取值范围为 [-8.0, 8.0]。

</Warning>



```dart
var voiceChangerParam = ZegoVoiceChangerParam(2.0);
ZegoExpressEngine.instance.setVoiceChangerParam(ZegoMediaPlayerAudioChannel.All, param);
```

### 混响

有两种方式设置混响，分别为预设混响和自定义混响。

**设置预设混响**

<Note title="说明">



如果需要设置自定义混响，请查看 [设置自定义混响](https://doc-zh.zego.im/article/17171#4_2_2)。

</Note>



调用 [setReverbPreset](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePreprocess/setReverbPreset.html) 通过预设枚举设置混响。

[ZegoReverbPreset](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoReverbPreset.html) 预置的混响效果如下，开发者可以根据需要选择：

| 类型名|描述| 混响类型|
| ------------ | ------ |----- |
| NONE | 无 |-|
| SOFT_ROOM | 小房间 |空间塑造|
| LARGE_ROOM | 大房间|空间塑造|
| CONCERT_HALL | 音乐厅|空间塑造|
| VALLEY | 山谷|空间塑造|
| RECORDING_STUDIO | 录音室|空间塑造|
| BASEMENT | 地下室 | 空间塑造|
| KTV | KTV，适用于音色瑕疵较为明显的用户 |空间塑造|
| POPULAR | 流行|曲风|
| ROCK | 摇滚 |曲风|
| VOCAL_CONCERT | 演唱会|空间塑造|
| GRAMO_PHONE | 留声机 |空间塑造|
| ENHANCED_KTV | 增强型 KTV，更集中、亮度更好的 KTV 人声效果，适用于普通用户和专业用户 | 空间塑造 |


以下示例代码以“大房间”模式为例：

```dart
ZegoExpressEngine.instance.setReverbPreset(ZegoReverbPreset.LargeRoom);
```

**设置自定义混响**

<Note title="说明">



如果需要设置预设混响，请查看 [设置预设混响](https://doc-zh.zego.im/article/17171#4_2_1)。

</Note>



若 SDK 预设的混响类型无法满足需求，开发者可以调用 [ZegoReverbAdvancedParam ](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoReverbAdvancedParam-class.html) 方法，通过相关参数搭配设置，实现开发者需要的混响效果（详细参数说明请参考 API 文档）。

```dart
var reverbParam = ZegoReverbAdvancedParam(
    50.0, // roomSize 房间大小（百分比）
    50.0, // reverberance 余响（百分比）
    50.0, // damping 混响阻尼（百分比）
    false, // wetOnly 只有湿信号
    5.0, // wetGain 湿信号增益(dB)
    5.0, // dryGain 干信号增益(dB)
    80.0, // toneLow 低频衰减
    80.0, // toneHigh 高频衰减
    20.0, // preDelay 初始延迟时间(ms)
    0.0 // stereoWidth 立体声宽度（百分比）
   );
ZegoExpressEngine.instance.setReverbAdvancedParam(reverbParam);
```

<Warning title="注意">


当设置自定义混响参数后，启用混响时设置的预设混响效果则会失效。如果想再次使用 SDK 预设参数，可以使用 [setReverbPreset ](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePreprocess/setReverbPreset.html) 预设枚举方法进行设置。

</Warning>




### 混响回声

调用 [setReverbEchoParam ](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePreprocess/setReverbEchoParam.html) 方法，通过相关参数搭配设置，实现开发者需要的混响回声效果（详细参数说明请参考 API 文档）。

以下示例代码以实现“空灵声效”为例：

```dart
var echoParam = ZegoReverbEchoParam(
    0.8, // inGain 输入音频信号的增益
    1.0, // outGain 输出音频信号的增益
    7, // numDelays 回声数量
    [230,460,690,920,1150,1380,1610], // delay 回声信号分别的延时，单位为毫秒
    [0.41f,0.18f,0.08f,0.03f,0.009f,0.003f,0.001f] // decay 回声信号分别的衰减系数
    );
ZegoExpressEngine.instance.setReverbEchoParam(echoParam);
```

### 虚拟立体声

**设置推流音频声道数**

如果需要开启虚拟立体声功能，必须在推流前先调用 [setAudioConfig ](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePublisher/setAudioConfig.html) 方法设置音频编码声道为 Stereo 双声道 （默认为 Mono 单声道）。

此处示例通过预设枚举构造 [ZegoAudioConfig ](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoAudioConfig/ZegoAudioConfig.html) 设置为双声道。

```dart
var audioConfig = ZegoAudioConfig.preset(ZegoAudioConfigPreset.StandardQualityStereo);
ZegoExpressEngine.instance.setAudioConfig(audioConfig);
```

**设置虚拟立体声参数**

设置音频编码声道为双声道后，调用 [enableVirtualStereo ](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePreprocess/enableVirtualStereo.html) 方法，通过 `enable` 参数设置虚拟立体声的声源角度后，才有立体声效果。角度范围为 0 ～ 360，一般可设为 90 度（即正前方）。

<Note title="说明">



自从 2.15.0 版本开始，SDK 新增支持全方位虚拟立体声效果，使用方式为将 `angle` 角度参数设置为 “-1”。

</Note>




此处示例为开启虚拟立体声并将角度设置为 90 度：

```dart
ZegoExpressEngine.instance.enableVirtualStereo(true, 90);
```

此处示例为开启全方位虚拟立体声：

```dart
ZegoExpressEngine.instance.enableVirtualStereo(true, -1);
```

<Content />

