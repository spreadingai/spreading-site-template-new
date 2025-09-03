# 推流视频增强

- - -

## 功能简介

ZEGO Express SDK 提供多种视频前处理增强能力，开发者可以根据业务需要，在推流端对画面的效果进行调整。

<table>

<tbody><tr>
<th>功能</th>
<th>功能描述</th>
<th>功能优势</th>
<th colspan="2">效果展示</th>
</tr>
<tr>
<td>基础美颜</td>
<td>根据用户和业务需要，调整美白、磨皮、锐化以及红润的程度，轻松实现基础美颜功能，为用户呈现出良好的肌肤状态，打造独特自然的美颜效果。</td>
<td>覆盖高频使用的美颜能力。</td>
<td colspan="2"><Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/AI_Vision/AI_beauty.gif" /></Frame></td>
</tr>
<tr>
<td>低照度增强</td>
<td>在环境光较暗的情况下，摄像头采集到的画面亮度不满足看清人脸、或无法进行人脸识别等业务需求时，对画面亮度进行增强。</td>
<td><ul><li>轻量化，全机型覆盖。</li><li>支持自动模式，根据画面光照情况，智能开启或关闭算法。</li><li>支持传统算法与 AI 级算法，根据设备性能智能选择算法类型。</li></ul></td>
<td><Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/lowlightenhancement/lowlightenhancement_before.jpg" /></Frame></td>
<td><Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/lowlightenhancement/lowlightenhancement_after.jpg" /></Frame></td>
</tr>
<tr>
<td>视频降噪</td>
<td>摄像头的采集效果不佳、环境光亮度较低等情况，可能会造成画面出现明显的噪点，通过视频降噪功能可减少画面的噪点。</td>
<td><ul><li>根据画面噪点情况判断是否开启，避免不必要的画面损伤。</li><li>降噪强度可调整。</li></ul></td>
<td><Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/lowlightenhancement/Video_noise_reduction.png" /></Frame></td>
<td><Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/lowlightenhancement/Video_noise_reduction_1.png" /></Frame></td>
</tr>
<tr>
<td>色彩增强</td>
<td>由于摄像头的特性，采集到的视频可能存在饱和度不足的问题。使用色彩增强功能，在保护人物肤色的情况下，增强欠饱和的色彩，让画面色彩更逼真，更符合人的视觉感受。</td>
<td><ul><li>保护肤色，避免人物肤色受到增强。</li><li>保护唇色，在美颜和带妆时，使嘴唇色彩更自然。</li></ul></td>
<td><Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Express/color_enhanced_before.jpg" /></Frame></td>
<td><Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Express/color_enhanced_after.jpg" /></Frame></td>
</tr>
</tbody></table>







## 前提条件

在使用推流视频增强功能前，请确保：

- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppID 和 AppSign，详情请参考 [控制台 - 项目信息](/console/project-info)。
- 已在项目中集成 ZEGO Express SDK，并实现了基本的音视频推拉流功能，详情请参考 [快速开始 - 集成](https://doc-zh.zego.im/article/13413) 和 [快速开始 - 实现流程](https://doc-zh.zego.im/article/13415)。


## 使用步骤

### 1 初始化和登录房间

初始化和登录房间的具体流程，请参考实现视频通话文档中的 "[创建引擎](https://doc-zh.zego.im/article/13415#CreateEngine)" 及 "[登录房间](https://doc-zh.zego.im/article/13415#createroom)"。

### 2 设置推流视频增强效果

请根据需要，选择对应的功能进行配置。

<Accordion title="基础美颜" defaultOpen="false">
<Note title="说明">



此功能为 ZEGO Express SDK 内置 ZEGO Effects SDK 的基础美颜功能，仅包含美白、红润、磨皮、锐化四种美颜效果。如需使用更多进阶的美颜功能，请参考 [实时音视频和 AI 美颜的搭配使用](/real-time-video-ios-oc/best-practice/integration-with-zego-effects-sdk)。
</Note>

#### 初始化基础美颜环境

若您需要使用基础美颜功能，则必须在 [startPreview](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoExpressEngine#start-preview) 开始预览、[startPublishingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoExpressEngine#start-publishing-stream) 推流前，调用 [startEffectsEnv](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoExpressEngine#start-effects-env) 接口初始化美颜环境。

```objc
// 创建美颜环境
[[ZegoExpressEngine sharedInstance] startEffectsEnv];
```

当初始化美颜环境后，SDK 内部会使用固定的视频帧数据类型进行传输，如果您使用基础美颜功能时还需要使用到视频自定义前处理，则只能配置相对应的视频帧数据类型：

iOS 和 macOS 平台：只支持 CVPixelBuffer 类型的数据，即 [ZegoCustomVideoCaptureConfig](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoCustomVideoCaptureConfig) 的 [bufferType](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objectivec_ios~enum~ZegoVideoBufferType) 取值为 "ZegoVideoBufferTypeCVPixelBuffer"。

#### 开启基础美颜效果

<Note title="说明">


[enableEffectsBeauty](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoExpressEngine#enable-effects-beauty) 接口和 [setEffectsBeautyParam](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoExpressEngine#set-effects-beauty-param) 接口的调用时序无先后之分。
</Note>

初始化美颜环境后，您可以在推流前后，调用 [enableEffectsBeauty](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoExpressEngine#enable-effects-beauty) 接口实时开启或关闭美颜效果。

```objc
// 开关美颜效果
[[ZegoExpressEngine sharedInstance] enableEffectsBeauty:true];
```

#### 设置基础美颜效果参数

初始化美颜环境后，您可以在推流前后，调用 [setEffectsBeautyParam](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoExpressEngine#set-effects-beauty-param) 接口实时设置美颜效果参数。

- smoothIntensity：磨皮，在保留脸部细节的基础上进行磨皮，比如脸上的痣会保留。
- whitenIntensity：美白，对画面整体调高亮度来美白脸部。
- rosyIntensity：红润，对画面整体进行暖色处理。
- sharpenIntensity：锐化，对画面整体进行锐化处理，当画面有些模糊时可以稍微调大锐化使轮廓清晰。

以上四个参数的取值范围都为 0 ～ 100，取值越大美颜程度越高，默认值为 50。

```objc
// 创建美颜参数对象
ZegoEffectsBeautyParam *beautyParam = [[ZegoEffectsBeautyParam alloc] init];

// 美白、红润、磨皮、锐化
beautyParam.whitenIntensity = 50;
beautyParam.rosyIntensity = 50;
beautyParam.smoothIntensity = 50;
beautyParam.sharpenIntensity = 50;

// 设置美颜参数
[[ZegoExpressEngine sharedInstance] setEffectsBeautyParam:beautyParam];
```

#### （可选）销毁基础美颜环境

当调用 [enableEffectsBeauty](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoExpressEngine#enable-effects-beauty) 接口设为 "false" 时，会关闭美颜效果，但美颜模块还是会占用资源并消耗性能。如果想彻底释放资源，节省性能消耗，则需要在预览和推流前调用 [stopEffectsEnv](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoExpressEngine#stop-effects-env) 接口销毁美颜环境。

<Note title="说明">



当调用 [destroyEngine](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoExpressEngine#destroy-engine) 销毁引擎的同时，SDK 会自动销毁美颜环境。
</Note>

```objc
// 销毁美颜环境
[[ZegoExpressEngine sharedInstance] stopEffectsEnv];
```
</Accordion>


<Accordion title="低照度增强" defaultOpen="false">
ZEGO 提供两种低照度增强的方式：

| 方式 | 描述 |
|---|---|
| 开启自适应帧率进行增强 | 在设定的帧率范围内动态降低采集帧率，以延长每一帧的画面曝光时间，达到增强采集到的画面亮度的效果。<br />例如：开发者开启并设置自适应帧率范围为 [10, 25]。环境光照充足的时候，采集帧率依然是 25 帧，环境光照度较低的时候，采集帧率会在 [10, 25] 之间动态调整，以延长每一帧的曝光时间增强采集画面的亮度。 |
| 算法对采集到的画面亮度进行增强 | <ul><li>手动控制：开发者自主控制算法开关。</li><li>智能控制：根据画面光照情况，智能开启或关闭算法。</li></ul> |

两种处理方式可以独立使用，也可以同时使用，均兼容美颜功能。

#### 设置低照度增强开关

RTC SDK 支持不同的算法低照度增强模式，调用 [setLowlightEnhancement](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoExpressEngine#set-lowlight-enhancement-channel) 接口进行设置低照度增强模式 [ZegoLowlightEnhancementMode](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~enum~ZegoLowlightEnhancementMode)：

|枚举值|说明|
|-|-|
|ZegoLowlightEnhancementModeOff| 关闭低照度增强功能。|
|ZegoLowlightEnhancementModeOn|开启低照度增强功能，由开发者自主控制。|
|ZegoLowlightEnhancementModeAuto|智能控制低照度增强功能，根据画面光照情况，智能开启或关闭功能。|

低照度增强类型 [ZegoExpLowlightEnhancementType](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~enum~ZegoExpLowlightEnhancementType) 包括如下类型：

|枚举值|说明|
|-|-|
| ZegoExpLowlightEnhancementTypeNormal | 常规低照度增强。|
| ZegoExpLowlightEnhancementTypeAI | AI 低照度增强。如需要使用此功能，需要联系 ZEGO 技术支持。|



以开启自动低照度增强功能为例：

```objc
ZegoExpLowlightEnhancementParams *params = [[ZegoExpLowlightEnhancementParams alloc] init];
params.mode = ZegoLowlightEnhancementModeAuto;
params.type = ZegoExpLowlightEnhancementTypeAI;
[[ZegoExpressEngine sharedEngine] setLowlightEnhancementParams:params channel:ZegoPublishChannelMain];
```


#### （可选）开启摄像头自适应帧率

当环境光照度较低，且摄像头采集帧率过高时，每一帧画面的曝光时间不足，可能导致采集的视频画面偏暗，此时可以通过 [enableCameraAdaptiveFPS](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoExpressEngine#enable-camera-adaptive-fps-min-fps-max-fps-channel) 开启摄像头自适应帧率。SDK 会根据设置的帧率范围匹配摄像头支持的采集帧率范围，在此范围内，根据环境亮度动态调整摄像头采集帧率，提升设置的帧率过高时的画面亮度。

```objc
//设置最小帧率
int minCamFPS = 15;
//设置最大帧率
int maxCamFPS = 35;
[[ZegoExpressEngine sharedEngine] enableCameraAdaptiveFPS:YES minFPS:minCamFPS maxFPS:maxCamFPS channel:ZegoPublishChannelMain];
```
</Accordion>

<Accordion title="视频降噪" defaultOpen="false">
调用 [setVideoDenoiseParams](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoExpressEngine#set-video-denoise-params-channel) 接口，设置视频降噪参数 [ZegoVideoDenoiseParams](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoVideoDenoiseParams) 包括：视频降噪模式 [ZegoVideoDenoiseMode](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~enum~ZegoVideoDenoiseMode) 及视频降噪强度 [ZegoVideoDenoiseStrength](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~enum~ZegoVideoDenoiseStrength)。

<Warning title="注意">


默认不开启视频降噪功能，即 [ZegoVideoDenoiseMode](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~enum~ZegoVideoDenoiseMode) 默认值为 `ZegoVideoDenoiseMode.off`。
</Warning>

以自动降噪为例：

```objc
ZegoVideoDenoiseParams *p = [[ZegoVideoDenoiseParams alloc] init];
p.mode = ZegoVideoDenoiseModeAuto;
p.strength = ZegoVideoDenoiseStrengthLight;
[[ZegoExpressEngine sharedEngine] setVideoDenoiseParams:p channel:ZegoPublishChannelMain];
```
</Accordion>

<Accordion title="色彩增强" defaultOpen="false">
调用 [enableColorEnhancement](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoExpressEngine#enable-color-enhancement-params-channel) 接口，设置色彩增强参数 [ZegoColorEnhancementParams](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoColorEnhancementParams)（参数属性如下表）、以及其它参数，开启色彩增强功能。**默认不开启色彩增强功能。**

|色彩增强参数|描述|
|-|-|
| intensity|<p>色彩增强的强度，取值范围 [0.0, 1.0]，默认为 0.0。</p><p>取值越大，色彩增强的效果越大。</p>|
| skinToneProtectionLevel |<p>肤色保护的强度，取值范围 [0.0, 1.0]，默认为 1.0。</p><p>取值越大，保护效果越好。</p>|
| lipColorProtectionLevel |<p>唇色保护的强度，取值范围 [0.0, 1.0]，默认为 0.0。</p><p>取值越大，保护效果越好。</p>|

```objc
ZegoColorEnhancementParams *p = [[ZegoColorEnhancementParams alloc]init];
p.intensity = 1f;//取值范围：[0,1]，取值越大，色彩增强的强度越大。默认值：0。
p.skinToneProtectionLevel = 1f;//取值范围：[0,1]，取值越大，肤色保护程度越大。默认值：1。
p.lipColorProtectionLevel = 1f;//取值范围：[0,1]，取值越大，唇色保护程度越大。默认值：0。
[[ZegoExpressEngine sharedEngine]enableColorEnhancement:YES params:p channel:ZegoPublishChannelMain];//开启色彩增强
```
</Accordion>

### 3 开始预览

调用 [startPreview](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoExpressEngine#start-preview) 接口开启预览后，可以设置不同的视频增强功能，并实时体验效果。

```objc
ZegoCanvas *previewCanvas = [ZegoCanvas canvasWithView:preview];
[[ZegoExpressEngine sharedEngine] startPreview:previewCanvas];
```

### 4 开始推流

当预览效果达到预期后，可以调用 [startPublishingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoExpressEngine#start-publishing-stream) 接口开始推流，推流画面效果将与预览效果一致。

```objc
[[ZegoExpressEngine sharedEngine] startPublishingStream:@"STREAM_ID"];
```

以上，即可实现推流前视频增强功能。

<Content />

