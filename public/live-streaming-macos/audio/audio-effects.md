# 变声/混响/立体声

- - -

## 功能简介

在直播、语聊房、K 歌房场景中，为增加趣味性和互动性，玩家可以通过变声来搞怪，通过混响烘托气氛，通过立体声使声音更具立体感。ZEGO Express SDK 提供了多种预设的变声、混响、混响回声、立体声效果，开发者可以灵活设置自己想要的声音，如果需要试听，可以启用耳返进行测试。

* 变声：通过改变用户的音调，使输出的声音在感官上与原始声音不同，实现男声变女生等多种效果。
* 混响：通过对声音的特殊处理，制造不同环境的混响效果，让声音如同在音乐厅、大教堂等场景中发出一般。
* 混响回声：通过对声音的特殊处理，可搭配变声、混响以实现自定义各式各样的声音效果，例如空灵，机器人的声音。
* 虚拟立体声：通过深度使用双声道技术，虚拟出发音源的各个位置角度，实现立体声、3D 环绕音、听声辩位等效果。

您可通过 ZEGO 提供的 [音效体验 DEMO](https://www.zego.im/audio-demo) 体验 SDK 预设的人声效果。

<Note title="说明">


该功能只针对 SDK 采集的声音有效，开发者可以在通话或直播过程中动态调整变声、混响、混响回声、虚拟立体声。
</Note>

## 示例源码下载

请参考 [下载示例源码](https://doc-zh.zego.im/article/21224) 获取源码。

相关源码请查看 “/ZegoExpressExample/Examples/AdvancedAudioProcessing/VoiceChangeReverbStereo” 目录下的文件。

## 前提条件

在使用变声/混响/立体声之前，请确保：

- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppID 和 AppSign，详情请参考 [控制台 - 项目信息](/console/project-info)。
- 已在项目中集成 ZEGO Express SDK，并实现了基本的音视频推拉流功能，详情请参考 [快速开始 - 集成](https://doc-zh.zego.im/article/21225) 和 [快速开始 - 实现流程](https://doc-zh.zego.im/article/21272)。


## 使用步骤

### 变声

有两种方式设置变声，分别为预设变声和自定义变声。

#### 设置预设变声

<Note title="说明">



如果需要设置自定义变声，请查看 [设置自定义变声](https://doc-zh.zego.im/article/21243#4_1_2)。
</Note>

调用 [setVoiceChangerPreset ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~ObjectiveC_ios~class~zego-express-engine#set-voice-changer-preset) 方法使用 SDK 预置的变声效果。

[ZegoVoiceChangerPreset](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_macos~enum~ZegoVoiceChangerPreset) 预置的变声效果如下，开发者可以根据需要选择：

| 类型名       | 预设值 | 描述       |  变声类型 |
| -------------- | ---  |---------- |---  |
| None         | 0 | 无变声     |-     |
| MenToChild   | 1|男声变童声 | 变声   |
| MenToWomen   | 2|男声变女声 | 变声   |
| WomenToChild | 3|女声变童声 | 变声   |
| WomenToMen   | 4|女声变男声 | 变声   |
| Foreigner      | 5|外国人音效    | 变声   |
| OptimusPrime  | 6|擎天柱音效    |变声   |
| Android        |7 |机器人音效    |变声   |
| Ethereal       |8 |空灵音效      |音色变换 |
| MaleMagnetic | 9|磁性男 |房间美声|
| FemaleFresh | 10|清新女 |房间美声|
| MajorC | 11|C大调电音 | 电音音效 |
| MinorA | 12|A小调电音 | 电音音效 |
| HarmonicMinor | 13|和声小调电音 | 电音音效 |
| FemaleEnergetic |14 |女活力音效 | 房间美声|
| RichNess |15 |浑厚音效 | 房间美声 |
| Muffled | 16|低沉音效 | 房音色变换 |
| Roundness | 17|圆润音效 | 房间美声 |
| Falsetto | 18|假音音效 | 房间美声 |
| Fullness  |19 |饱满音效 | 房间美声 |
| Clear | 20|清澈音效 | 房间美声 |
| HighlyResonant | 21|高亢音效 | 房间美声 |
| LoudClear | 22|嘹亮音效 | 房间美声 |
| Minions | 23|小黄人音效 | 变声 |
| Autobot | 30|汽车人音效 | 变声 |
| OutOfPower | 31|没电了音效 | 变声 |


以下示例代码以“男声变童声”为例：

```objc
[[ZegoExpressEngine sharedEngine] setVoiceChangerPreset:ZegoVoiceChangerPresetMenToChild];
```

#### 设置自定义变声

<Note title="说明">



如果需要设置预设变声，请查看 [设置预设变声](https://doc-zh.zego.im/article/21243#4_1_1)。
</Note>

若 SDK 预置的变声效果无法满足需求，开发者可以调用 [setVoiceChangerParam](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoExpressEngine#set-voice-changer-param) 中 [ZegoVoiceChangerParam](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~ObjectiveC_ios~class~zego-voice-changer-param) 方法，通过音高参数 “pitch” 设置自定义变声。该参数取值范围为 [-12.0, 12.0]，值越大声音越尖锐，默认值为 “0.0”（即无变声）。

<Warning title="注意">


2.18.0 及以前版本，取值范围为 [-8.0, 8.0]。
</Warning>

```objc
ZegoVoiceChangerParam *param = [[ZegoVoiceChangerParam alloc] init];
param.pitch = 2.0;
[[ZegoExpressEngine sharedEngine] setVoiceChangerParam:param];
```

### 混响

有两种方式设置混响，分别为预设混响和自定义混响。

#### 设置预设混响

<Note title="说明">



如果需要设置自定义混响，请查看 [设置自定义混响](https://doc-zh.zego.im/article/21243#4_2_2)。
</Note>

调用 [setReverbPreset ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~ObjectiveC_ios~class~zego-express-engine#set-reverb-preset) 通过预设枚举设置混响。

[ZegoReverbPreset](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_macos~enum~ZegoReverbPreset) 预置的混响效果如下，开发者可以根据需要选择：

<table>

<tbody><tr>
<th>类型名</th>
<th>预设值</th>
<th>描述</th>
<th>混响类型</th>
</tr>
<tr>
<td>None</td>
<td>0</td>
<td>无</td>
<td>-</td>
</tr>
<tr>
<td>SoftRoom</td>
<td>1</td>
<td>小房间</td>
<td>空间塑造</td>
</tr>
<tr>
<td>LargeRoom</td>
<td>2</td>
<td>大房间</td>
<td>空间塑造</td>
</tr>
<tr>
<td>ConcerHall</td>
<td>3</td>
<td>音乐厅</td>
<td>空间塑造</td>
</tr>
<tr>
<td>Valley</td>
<td>4</td>
<td>山谷</td>
<td>空间塑造</td>
</tr>
<tr>
<td>RecordingStudio</td>
<td>5</td>
<td>录音室</td>
<td>空间塑造</td>
</tr>
<tr>
<td>Basement</td>
<td>6</td>
<td>地下室</td>
<td>空间塑造</td>
</tr>
<tr>
<td>KTV</td>
<td>7</td>
<td>KTV</td>
<td>空间塑造</td>
</tr>
<tr>
<td>Popular</td>
<td>8</td>
<td>流行</td>
<td>曲风</td>
</tr>
<tr>
<td>Rock</td>
<td>9</td>
<td>摇滚</td>
<td>曲风</td>
</tr>
<tr>
<td>VocalConcert</td>
<td>10</td>
<td>演唱会</td>
<td>空间塑造</td>
</tr>
<tr>
<td>GramoPhone</td>
<td>11</td>
<td>留声机</td>
<td>空间塑造</td>
</tr>
<tr>
<td>EnhancedKTV</td>
<td>12</td>
<td>增强型 KTV，更集中、亮度更好的 KTV 人声效果，适用于普通用户和专业用户</td>
<td>空间塑造</td>
</tr>
</tbody></table>


以下示例代码以“大房间”模式为例：
```objc
[[ZegoExpressEngine sharedEngine] setReverbPreset:ZegoReverbPresetLargeRoom];
```

#### 设置自定义混响

<Note title="说明">



如果需要设置预设混响，请查看 [设置预设混响](https://doc-zh.zego.im/article/21243#4_2_1)。
</Note>

若 SDK 预设的混响类型无法满足需求，开发者可以调用 [setReverbAdvancedParam](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_macos~class~ZegoExpressEngine#set-reverb-advanced-param) 中 [ZegoReverbAdvancedParam ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_macos~class~ZegoReverbAdvancedParam) 方法，通过相关参数搭配设置，实现开发者需要的混响效果（详细参数说明请参考 API 文档）。

```objc
ZegoReverbAdvancedParam *reverbParam = [[ZegoReverbAdvancedParam alloc] init];
// 混响阻尼
reverbParam.damping = 50.0;
// 余响
reverbParam.reverberance = 50.0;
// 房间大小
reverbParam.roomSize = 50.0;
// 只有湿信号
reverbParam.wetOnly = false;
// 湿信号增益(dB)，取值范围 [-20.0, 10.0]
reverbParam.wetGain = 5.0;
// 干信号增益(dB)，取值范围 [-20.0, 10.0]
reverbParam.dryGain = 5.0;
// 低频衰减，默认为不衰减（100%）
reverbParam.toneLow = 80.0;
// 高频衰减，默认为不衰减（100%）
reverbParam.toneHigh = 80.0;
// 初始延迟时间(ms)。取值范围 [0, 200]
reverbParam.preDelay = 20.0;
// 立体声宽度（百分比），默认值为 0%
reverbParam.stereoWidth = 0.0;

[[ZegoExpressEngine sharedEngine] setReverbAdvancedParam:reverbParam];
```

<Warning title="注意">


当设置自定义混响参数后，启用混响时设置的预设混响效果则会失效。如果想再次使用 SDK 预设参数，可以使用 [setReverbPreset ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~ObjectiveC_ios~class~zego-express-engine#set-reverb-preset) 预设枚举方法进行设置。
</Warning>

### 混响回声

调用 [setReverbEchoParam ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~ObjectiveC_ios~class~zego-express-engine#set-reverb-echo-param) 方法，通过相关参数搭配设置，实现开发者需要的混响回声效果（详细参数说明请参考 API 文档）。

以下示例代码以实现“空灵音效”为例：

```objc
ZegoReverbEchoParam *echoParamEthereal = [[ZegoReverbEchoParam alloc] init];
// 输入音频信号的增益，取值范围 [0.0, 1.0]
echoParamEthereal.inGain = 0.8;
// 输出音频信号的增益，取值范围 [0.0, 1.0]
echoParamEthereal.outGain = 1.0;
// 回声数量，取值范围 [0, 7]
echoParamEthereal.numDelays = 7;
// 回声信号分别的延时
echoParamEthereal.delay = @[@230, @460, @690, @920, @1150, @1380, @1610];
// 回声信号分别的衰减系数
echoParamEthereal.decay = @[@0.41f, @0.18f, @0.08f, @0.03f, @0.009f, @0.003f, @0.001f];
[[ZegoExpressEngine sharedEngine] setReverbEchoParam:echoParamEthereal];
```


### 虚拟立体声

#### 设置推流音频声道数

如果需要开启虚拟立体声功能，必须在推流前先调用 [setAudioConfig ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~ObjectiveC~class~zego-express-engine#set-audio-config) 方法设置音频编码声道为 Stereo 双声道（默认为 Mono 单声道）。

此处示例通过预设枚举构造 [ZegoAudioConfig ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~ObjectiveC~class~zego-audio-config) 设置为双声道。

```objc
ZegoAudioConfig *config = [ZegoAudioConfig configWithPreset:ZegoAudioConfigPresetStandardQualityStereo];
[[ZegoExpressEngine sharedEngine] setAudioConfig:config];
```

#### 设置虚拟立体声参数

设置音频编码声道为双声道后，调用 [enableVirtualStereo ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~ObjectiveC~class~zego-express-engine#enable-virtual-stereo-angle) 方法，通过 “enable” 参数开启虚拟立体声，并通过 “angle” 参数设置虚拟立体声的声源角度后，才有立体声效果。角度范围为 0 ～ 360，一般可设为 90 度（即正前方）。

<Note title="说明">



自从 2.15.0 版本开始，SDK 新增支持全方位虚拟立体声效果，使用方式为将 “angle” 角度参数设置为 “-1”。
</Note>


此处示例为开启虚拟立体声并将角度设置为 90 度：

```objc
[[ZegoExpressEngine sharedEngine] enableVirtualStereo:YES angle:90];
```

此处示例为开启全方位虚拟立体声：

```objc
[[ZegoExpressEngine sharedEngine] enableVirtualStereo:YES angle:-1];
```

<Content />