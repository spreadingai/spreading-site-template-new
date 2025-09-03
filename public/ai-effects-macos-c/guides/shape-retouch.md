export const getPlatformData = (props, data) => {
    const platform = (props.platform ?? "Android").toLowerCase();
    for (const [key, value] of Object.entries(data)) {
        const pList = key.split(",").map((v) => v.toLowerCase());
        if (pList.includes(platform)) {
            return value;
        }
    }
    return data["Android"] || data["android"] || data["default"];
};

export const getPlatformData2 = (props, data) => {
    const platform = (props.platform ?? "default").toLowerCase();
    for (const [key, value] of Object.entries(data)) {
        const pList = key.split(",").map((v) => v.toLowerCase());
        if (pList.includes(platform)) {
            return value;
        }
    }
    return data["default"];
};

export const enableBigEyesMap = {
    'default': <a href="@enableBigEyes" target='_blank'>enableBigEyes</a>,
    'Flutter': <a href="https://doc-zh.zego.im/unique-api/ai-effects-sdk/zh/dart_flutter/zego_effects_plugin/ZegoEffectsPlugin/enableBigEyes.html" target='_blank'>enableBigEyes</a>,
    'Windows': <a href="@zego_effects_enable_big_eyes" target='_blank'>zego_effects_enable_big_eyes</a>,
}

export const setBigEyesParamMap = {
    'default': <a href="@setBigEyesParam" target='_blank'>setBigEyesParam</a>,
    'Flutter': <a href="https://doc-zh.zego.im/unique-api/ai-effects-sdk/zh/dart_flutter/zego_effects_plugin/ZegoEffectsPlugin/setBigEyesParam.html" target='_blank'>setBigEyesParam</a>,
    'Windows': <a href="@zego_effects_set_big_eyes_param" target='_blank'>zego_effects_set_big_eyes_param</a>,
}

export const ZegoEffectsBigEyesParamMap = {
    'default': <a href="@-ZegoEffectsBigEyesParam" target='_blank'>ZegoEffectsBigEyesParam</a>,
    'Flutter': <a href="https://doc-zh.zego.im/unique-api/ai-effects-sdk/zh/dart_flutter/zego_effects_defines/ZegoEffectsBigEyesParam-class.html" target='_blank'>ZegoEffectsBigEyesParam</a>,
    'Windows': <a href="@-zego_effects_big_eyes_param" target='_blank'>zego_effects_big_eyes_param</a>,
}

export const enableFaceLiftingMap = {
    'default': <a href="@enableFaceLifting" target='_blank'>enableFaceLifting</a>,
    'Flutter': <a href="https://doc-zh.zego.im/unique-api/ai-effects-sdk/zh/dart_flutter/zego_effects_plugin/ZegoEffectsPlugin/enableFaceLifting.html" target='_blank'>enableFaceLifting</a>,
    'Windows': <a href="@zego_effects_enable_face_lifting" target='_blank'>zego_effects_enable_face_lifting</a>,
}

export const setFaceLiftingParamMap = {
    'default': <a href="@setFaceLiftingParam" target='_blank'>setFaceLiftingParam</a>,
    'Flutter': <a href="https://doc-zh.zego.im/unique-api/ai-effects-sdk/zh/dart_flutter/zego_effects_plugin/ZegoEffectsPlugin/setFaceLiftingParam.html" target='_blank'>setFaceLiftingParam</a>,
    'Windows': <a href="@zego_effects_set_face_lifting_param" target='_blank'>zego_effects_set_face_lifting_param</a>,
}

export const ZegoEffectsFaceLiftingParamMap = {
    'default': <a href="@-ZegoEffectsFaceLiftingParam" target='_blank'>ZegoEffectsFaceLiftingParam</a>,
    'Flutter': <a href="https://doc-zh.zego.im/unique-api/ai-effects-sdk/zh/dart_flutter/zego_effects_defines/ZegoEffectsFaceLiftingParam-class.html" target='_blank'>ZegoEffectsFaceLiftingParam</a>,
    'Windows': <a href="@-zego_effects_face_lifting_param" target='_blank'>zego_effects_face_lifting_param</a>,
}   

export const enableSmallMouthMap = {
    'default': <a href="@enableSmallMouth" target='_blank'>enableSmallMouth</a>,
    'Flutter': <a href="https://doc-zh.zego.im/unique-api/ai-effects-sdk/zh/dart_flutter/zego_effects_plugin/ZegoEffectsPlugin/enableSmallMouth.html" target='_blank'>enableSmallMouth</a>,
    'Windows': <a href="@zego_effects_enable_small_mouth" target='_blank'>zego_effects_enable_small_mouth</a>,
}


export const setSmallMouthParamMap = {
    'default': <a href="@setSmallMouthParam" target='_blank'>setSmallMouthParam</a>,
    'Flutter': <a href="https://doc-zh.zego.im/unique-api/ai-effects-sdk/zh/dart_flutter/zego_effects_plugin/ZegoEffectsPlugin/setSmallMouthParam.html" target='_blank'>setSmallMouthParam</a>,
    'Windows': <a href="@zego_effects_set_small_mouth_param" target='_blank'>zego_effects_set_small_mouth_param</a>,
}

export const ZegoEffectsSmallMouthParamMap = {
    'default': <a href="@-ZegoEffectsSmallMouthParam" target='_blank'>ZegoEffectsSmallMouthParam</a>,
    'Flutter': <a href="https://doc-zh.zego.im/unique-api/ai-effects-sdk/zh/dart_flutter/zego_effects_defines/ZegoEffectsSmallMouthParam-class.html" target='_blank'>ZegoEffectsSmallMouthParam</a>,
    'Windows': <a href="@-zego_effects_small_mouth_param" target='_blank'>zego_effects_small_mouth_param</a>,
}

export const enableEyesBrighteningMap = {
    'default': <a href="@enableEyesBrightening" target='_blank'>enableEyesBrightening</a>,
    'Flutter': <a href="https://doc-zh.zego.im/unique-api/ai-effects-sdk/zh/dart_flutter/zego_effects_plugin/ZegoEffectsPlugin/enableEyesBrightening.html" target='_blank'>enableEyesBrightening</a>,
    'Windows': <a href="@zego_effects_enable_eyes_brightening" target='_blank'>zego_effects_enable_eyes_brightening</a>,
}

export const setEyesBrighteningParamMap = {
    'default': <a href="@setEyesBrighteningParam" target='_blank'>setEyesBrighteningParam</a>,
    'Flutter': <a href="https://doc-zh.zego.im/unique-api/ai-effects-sdk/zh/dart_flutter/zego_effects_plugin/ZegoEffectsPlugin/setEyesBrighteningParam.html" target='_blank'>setEyesBrighteningParam</a>,
    'Windows': <a href="@zego_effects_set_eyes_brightening_param" target='_blank'>zego_effects_set_eyes_brightening_param</a>,
}

export const ZegoEffectsEyesBrighteningParamMap = {
    'default': <a href="@-ZegoEffectsEyesBrighteningParam" target='_blank'>ZegoEffectsEyesBrighteningParam</a>,
    'Flutter': <a href="https://doc-zh.zego.im/unique-api/ai-effects-sdk/zh/dart_flutter/zego_effects_defines/ZegoEffectsEyesBrighteningParam-class.html" target='_blank'>ZegoEffectsEyesBrighteningParam</a>,
    'Windows': <a href="@-zego_effects_eyes_brightening_param" target='_blank'>zego_effects_eyes_brightening_param</a>,
}

export const enableNoseNarrowingMap = {
    'default': <a href="@enableNoseNarrowing" target='_blank'>enableNoseNarrowing</a>,
    'Flutter': <a href="https://doc-zh.zego.im/unique-api/ai-effects-sdk/zh/dart_flutter/zego_effects_plugin/ZegoEffectsPlugin/enableNoseNarrowing.html" target='_blank'>enableNoseNarrowing</a>,
    'Windows': <a href="@zego_effects_enable_nose_narrowing" target='_blank'>zego_effects_enable_nose_narrowing</a>,
}

export const setNoseNarrowingParamMap = {
    'default': <a href="@setNoseNarrowingParam" target='_blank'>setNoseNarrowingParam</a>,
    'Flutter': <a href="https://doc-zh.zego.im/unique-api/ai-effects-sdk/zh/dart_flutter/zego_effects_plugin/ZegoEffectsPlugin/setNoseNarrowingParam.html" target='_blank'>setNoseNarrowingParam</a>,
    'Windows': <a href="@zego_effects_set_nose_narrowing_param" target='_blank'>zego_effects_set_nose_narrowing_param</a>,
}

export const ZegoEffectsNoseNarrowingParamMap = {
    'default': <a href="@-ZegoEffectsNoseNarrowingParam" target='_blank'>ZegoEffectsNoseNarrowingParam</a>,
    'Flutter': <a href="https://doc-zh.zego.im/unique-api/ai-effects-sdk/zh/dart_flutter/zego_effects_defines/ZegoEffectsNoseNarrowingParam-class.html" target='_blank'>ZegoEffectsNoseNarrowingParam</a>,
    'Windows': <a href="@-zego_effects_nose_narrowing_param" target='_blank'>zego_effects_nose_narrowing_param</a>,
}

export const enableTeethWhiteningMap = {
    'default': <a href="@enableTeethWhitening" target='_blank'>enableTeethWhitening</a>,
    'Flutter': <a href="https://doc-zh.zego.im/unique-api/ai-effects-sdk/zh/dart_flutter/zego_effects_plugin/ZegoEffectsPlugin/enableTeethWhitening.html" target='_blank'>enableTeethWhitening</a>,
    'Windows': <a href="@zego_effects_enable_teeth_whitening" target='_blank'>zego_effects_enable_teeth_whitening</a>,
}

export const setTeethWhiteningParamMap = {
    'default': <a href="@setTeethWhiteningParam" target='_blank'>setTeethWhiteningParam</a>,
    'Flutter': <a href="https://doc-zh.zego.im/unique-api/ai-effects-sdk/zh/dart_flutter/zego_effects_plugin/ZegoEffectsPlugin/setTeethWhiteningParam.html" target='_blank'>setTeethWhiteningParam</a>,
    'Windows': <a href="@zego_effects_set_teeth_whitening_param" target='_blank'>zego_effects_set_teeth_whitening_param</a>,
}

export const ZegoEffectsTeethWhiteningParamMap = {
    'default': <a href="@-ZegoEffectsTeethWhiteningParam" target='_blank'>ZegoEffectsTeethWhiteningParam</a>,
    'Flutter': <a href="https://doc-zh.zego.im/unique-api/ai-effects-sdk/zh/dart_flutter/zego_effects_defines/ZegoEffectsTeethWhiteningParam-class.html" target='_blank'>ZegoEffectsTeethWhiteningParam</a>,
    'Windows': <a href="@-zego_effects_teeth_whitening_param" target='_blank'>zego_effects_teeth_whitening_param</a>,
}

export const enableLongChinMap = {
    'default': <a href="@enableLongChin" target='_blank'>enableLongChin</a>,
    'Flutter': <a href="https://doc-zh.zego.im/unique-api/ai-effects-sdk/zh/dart_flutter/zego_effects_plugin/ZegoEffectsPlugin/enableLongChin.html" target='_blank'>enableLongChin</a>,
    'Windows': <a href="@zego_effects_enable_long_chin" target='_blank'>zego_effects_enable_long_chin</a>,
}

export const setLongChinParamMap = {
    'default': <a href="@setLongChinParam" target='_blank'>setLongChinParam</a>,
    'Flutter': <a href="https://doc-zh.zego.im/unique-api/ai-effects-sdk/zh/dart_flutter/zego_effects_plugin/ZegoEffectsPlugin/setLongChinParam.html" target='_blank'>setLongChinParam</a>,
    'Windows': <a href="@zego_effects_set_long_chin_param" target='_blank'>zego_effects_set_long_chin_param</a>,
}

export const ZegoEffectsLongChinParamMap = {
    'default': <a href="@-ZegoEffectsLongChinParam" target='_blank'>ZegoEffectsLongChinParam</a>,
    'Flutter': <a href="https://doc-zh.zego.im/unique-api/ai-effects-sdk/zh/dart_flutter/zego_effects_defines/ZegoEffectsLongChinParam-class.html" target='_blank'>ZegoEffectsLongChinParam</a>,
    'Windows': <a href="@-zego_effects_long_chin_param" target='_blank'>zego_effects_long_chin_param</a>,
}

export const enableForeheadShorteningMap = {
    'default': <a href="@enableForeheadShortening" target='_blank'>enableForeheadShortening</a>,
    'Flutter': <a href="https://doc-zh.zego.im/unique-api/ai-effects-sdk/zh/dart_flutter/zego_effects_plugin/ZegoEffectsPlugin/enableForeheadShortening.html" target='_blank'>enableForeheadShortening</a>,
    'Windows': <a href="@zego_effects_enable_forehead_shortening" target='_blank'>zego_effects_enable_forehead_shortening</a>,
}


export const setForeheadShorteningParamMap = {
    'default': <a href="@setForeheadShorteningParam" target='_blank'>setForeheadShorteningParam</a>,
    'Flutter': <a href="https://doc-zh.zego.im/unique-api/ai-effects-sdk/zh/dart_flutter/zego_effects_plugin/ZegoEffectsPlugin/setForeheadShorteningParam.html" target='_blank'>setForeheadShorteningParam</a>,
    'Windows': <a href="@zego_effects_set_forehead_shortening_param" target='_blank'>zego_effects_set_forehead_shortening_param</a>,
}

export const ZegoEffectsForeheadShorteningParamMap = {
    'default': <a href="@-ZegoEffectsForeheadShorteningParam" target='_blank'>ZegoEffectsForeheadShorteningParam</a>,
    'Flutter': <a href="https://doc-zh.zego.im/unique-api/ai-effects-sdk/zh/dart_flutter/zego_effects_defines/ZegoEffectsForeheadShorteningParam-class.html" target='_blank'>ZegoEffectsForeheadShorteningParam</a>,
    'Windows': <a href="@-zego_effects_forehead_shortening_param" target='_blank'>zego_effects_forehead_shortening_param</a>,
}

export const enableMandibleSlimmingMap = {
    'default': <a href="@enableMandibleSlimming" target='_blank'>enableMandibleSlimming</a>,
    'Flutter': <a href="https://doc-zh.zego.im/unique-api/ai-effects-sdk/zh/dart_flutter/zego_effects_plugin/ZegoEffectsPlugin/enableMandibleSlimming.html" target='_blank'>enableMandibleSlimming</a>,
    'Windows': <a href="@zego_effects_enable_mandible_slimming" target='_blank'>zego_effects_enable_mandible_slimming</a>,
}

export const setMandibleSlimmingParamMap = {
    'default': <a href="@setMandibleSlimmingParam" target='_blank'>setMandibleSlimmingParam</a>,
    'Flutter': <a href="https://doc-zh.zego.im/unique-api/ai-effects-sdk/zh/dart_flutter/zego_effects_plugin/ZegoEffectsPlugin/setMandibleSlimmingParam.html" target='_blank'>setMandibleSlimmingParam</a>,
    'Windows': <a href="@zego_effects_set_mandible_slimming_param" target='_blank'>zego_effects_set_mandible_slimming_param</a>,
}

export const ZegoEffectsMandibleSlimmingParamMap = {
    'default': <a href="@-ZegoEffectsMandibleSlimmingParam" target='_blank'>ZegoEffectsMandibleSlimmingParam</a>,
    'Flutter': <a href="https://doc-zh.zego.im/unique-api/ai-effects-sdk/zh/dart_flutter/zego_effects_defines/ZegoEffectsMandibleSlimmingParam-class.html" target='_blank'>ZegoEffectsMandibleSlimmingParam</a>,
    'Windows': <a href="@-zego_effects_mandible_slimming_param" target='_blank'>zego_effects_mandible_slimming_param</a>,
}

export const enableCheekboneSlimmingMap = {
    'default': <a href="@enableCheekboneSlimming" target='_blank'>enableCheekboneSlimming</a>,
    'Flutter': <a href="https://doc-zh.zego.im/unique-api/ai-effects-sdk/zh/dart_flutter/zego_effects_plugin/ZegoEffectsPlugin/enableCheekboneSlimming.html" target='_blank'>enableCheekboneSlimming</a>,
    'Windows': <a href="@zego_effects_enable_cheekbone_slimming" target='_blank'>zego_effects_enable_cheekbone_slimming</a>,
}

export const setCheekboneSlimmingParamMap = {
    'default': <a href="@setCheekboneSlimmingParam" target='_blank'>setCheekboneSlimmingParam</a>,
    'Flutter': <a href="https://doc-zh.zego.im/unique-api/ai-effects-sdk/zh/dart_flutter/zego_effects_plugin/ZegoEffectsPlugin/setCheekboneSlimmingParam.html" target='_blank'>setCheekboneSlimmingParam</a>,
    'Windows': <a href="@zego_effects_set_cheekbone_slimming_param" target='_blank'>zego_effects_set_cheekbone_slimming_param</a>,
}

export const ZegoEffectsCheekboneSlimmingParamMap = {
    'default': <a href="@-ZegoEffectsCheekboneSlimmingParam" target='_blank'>ZegoEffectsCheekboneSlimmingParam</a>,
    'Flutter': <a href="https://doc-zh.zego.im/unique-api/ai-effects-sdk/zh/dart_flutter/zego_effects_defines/ZegoEffectsCheekboneSlimmingParam-class.html" target='_blank'>ZegoEffectsCheekboneSlimmingParam</a>,
    'Windows': <a href="@-zego_effects_cheekbone_slimming_param" target='_blank'>zego_effects_cheekbone_slimming_param</a>,
}

export const enableJawSlimmingMap = {
    'default': <a href="@enableJawSlimming" target='_blank'>enableJawSlimming</a>,
    'Flutter': <a href="https://doc-zh.zego.im/unique-api/ai-effects-sdk/zh/dart_flutter/zego_effects_plugin/ZegoEffectsPlugin/enableJawSlimming.html" target='_blank'>enableJawSlimming</a>,
    'Windows': <a href="@zego_effects_enable_jaw_slimming" target='_blank'>zego_effects_enable_jaw_slimming</a>,
}

export const setJawSlimmingParamMap = {
    'default': <a href="@setJawSlimmingParam" target='_blank'>setJawSlimmingParam</a>,
    'Flutter': <a href="https://doc-zh.zego.im/unique-api/ai-effects-sdk/zh/dart_flutter/zego_effects_plugin/ZegoEffectsPlugin/setJawSlimmingParam.html" target='_blank'>setJawSlimmingParam</a>,
    'Windows': <a href="@zego_effects_set_jaw_slimming_param" target='_blank'>zego_effects_set_jaw_slimming_param</a>,
}

export const ZegoEffectsJawSlimmingParamMap = {
    'default': <a href="@-ZegoEffectsJawSlimmingParam" target='_blank'>ZegoEffectsJawSlimmingParam</a>,
    'Flutter': <a href="https://doc-zh.zego.im/unique-api/ai-effects-sdk/zh/dart_flutter/zego_effects_defines/ZegoEffectsJawSlimmingParam-class.html" target='_blank'>ZegoEffectsJawSlimmingParam</a>,
    'Windows': <a href="@-zego_effects_jaw_slimming_param" target='_blank'>zego_effects_jaw_slimming_param</a>,
}

export const enableFaceShorteningMap = {
    'default': <a href="@enableFaceShortening" target='_blank'>enableFaceShortening</a>,
    'Flutter': <a href="https://doc-zh.zego.im/unique-api/ai-effects-sdk/zh/dart_flutter/zego_effects_plugin/ZegoEffectsPlugin/enableFaceShortening.html" target='_blank'>enableFaceShortening</a>,
    'Windows': <a href="@zego_effects_enable_face_shortening" target='_blank'>zego_effects_enable_face_shortening</a>,
}

export const setFaceShorteningParamMap = {
    'default': <a href="@setFaceShorteningParam" target='_blank'>setFaceShorteningParam</a>,
    'Flutter': <a href="https://doc-zh.zego.im/unique-api/ai-effects-sdk/zh/dart_flutter/zego_effects_plugin/ZegoEffectsPlugin/setFaceShorteningParam.html" target='_blank'>setFaceShorteningParam</a>,
    'Windows': <a href="@zego_effects_set_face_shortening_param" target='_blank'>zego_effects_set_face_shortening_param</a>,
}

export const ZegoEffectsFaceShorteningParamMap = {
    'default': <a href="@-ZegoEffectsFaceShorteningParam" target='_blank'>ZegoEffectsFaceShorteningParam</a>,
    'Flutter': <a href="https://doc-zh.zego.im/unique-api/ai-effects-sdk/zh/dart_flutter/zego_effects_defines/ZegoEffectsFaceShorteningParam-class.html" target='_blank'>ZegoEffectsFaceShorteningParam</a>,
    'Windows': <a href="@-zego_effects_face_shortening_param" target='_blank'>zego_effects_face_shortening_param</a>,
}

export const enableNoseLengtheningMap = {
    'default': <a href="@enableNoseLengthening" target='_blank'>enableNoseLengthening</a>,
    'Flutter': <a href="https://doc-zh.zego.im/unique-api/ai-effects-sdk/zh/dart_flutter/zego_effects_plugin/ZegoEffectsPlugin/enableNoseLengthening.html" target='_blank'>enableNoseLengthening</a>,
    'Windows': <a href="@zego_effects_enable_nose_lengthening">zego_effects_enable_nose_lengthening</a>
}


export const setNoseLengtheningParamMap = {
    'default': <a href="@setNoseLengtheningParam" target='_blank'>setNoseLengtheningParam</a>,
    'Flutter': <a href="https://doc-zh.zego.im/unique-api/ai-effects-sdk/zh/dart_flutter/zego_effects_plugin/ZegoEffectsPlugin/setNoseLengtheningParam.html" target='_blank'>setNoseLengtheningParam</a>,
    'Windows': <a href="@zego_effects_set_nose_lengthening_param">zego_effects_set_nose_lengthening_param</a>
}

export const ZegoEffectsNoseLengtheningParamMap = {
    'default': <a href="@-ZegoEffectsNoseLengtheningParam" target='_blank'>ZegoEffectsNoseLengtheningParam</a>,
    'Flutter': <a href="https://doc-zh.zego.im/unique-api/ai-effects-sdk/zh/dart_flutter/zego_effects_defines/ZegoEffectsNoseLengtheningParam-class.html" target='_blank'>ZegoEffectsNoseLengtheningParam</a>,
    'Windows': <a href="@-zego_effects_nose_lengthening_param">zego_effects_nose_lengthening_param</a>
}

# 美型

- - -

## 功能简介

ZegoEffects SDK 提供美型功能，基于精准的人脸关键点检测和 3D 模型，实现大眼、瘦脸、小嘴、牙齿美白等功能，实现全方位五官变美。

开发者可以根据需要调整大眼、瘦脸、小嘴、瘦鼻、牙齿美白等的程度，实现美型功能。

## 前提条件

在使用 ZegoEffects SDK 美型功能前，请确保

- 已在项目中集成 ZegoEffects SDK，实现基本的图像处理功能，详情请参考 [快速开始 - 集成 SDK](/ai-effects-macos-c/quick-starts/import-the-sdk)。
- 导入基础通用资源 “CommonResources” 文件，详情请参考 [快速开始 - 导入资源和模型](/ai-effects-macos-c/quick-starts/import-resources-and-models)。

## 使用步骤

美型包括大眼、瘦脸、小嘴、亮眼、瘦鼻、牙齿美白、长下巴等功能。

开启美型功能之后，开发者可根据实际的需求来自定义美型参数。如果未自定义，SDK 将采用默认参数值实现美型功能。

### 大眼

<Warning title="注意">
使用大眼功能前，请先导入对应的 “FaceDetectionModel” 模型文件，否则功能无法生效。详情请参考 [快速开始 - 导入资源和模型](/ai-effects-macos-c/quick-starts/import-resources-and-models)。
</Warning>

调用 {getPlatformData2(props,enableBigEyesMap)} 接口开启大眼功能，并调用 {getPlatformData2(props,setBigEyesParamMap)} 接口设置大眼的程度。  

{getPlatformData2(props,ZegoEffectsBigEyesParamMap)} 对象的大眼程度参数 “intensity” 的取值范围为 [0, 100]，默认为 “50”。取值越大，大眼程度越大，开发者可以根据需求自定义取值。

:::if{props.platform=undefined}
```objc
// 开启大眼功能
[self.effects enableBigEyes:YES];

// 设置大眼的程度，范围 [0, 100]，默认为 50
ZegoEffectsBigEyesParam *param = [[ZegoEffectsBigEyesParam alloc] init];
param.intensity = 100;
[self.effects setBigEyesParam:param];
```
:::
:::if{props.platform="Android"}
```java
// 开启大眼功能
mEffects.enableBigEyes(true);

// 设置大眼的程度，范围 [0, 100]，默认为 50
ZegoEffectsBigEyesParam param = new ZegoEffectsBigEyesParam();
param.intensity = 100;
mEffects.setBigEyesParam(param);
```
:::
:::if{props.platform="Windows"}
```c
// 开启大眼功能
zego_effects_enable_big_eyes(handle, true);

// 设置大眼的程度，范围 [0, 100]，默认为 50
zego_effects_big_eyes_param param;
param.intensity = 100;
zego_effects_set_big_eyes_param(handle, &param);
```
:::
:::if{props.platform="RN"}
```js
// 开启大眼功能
mEffects.enableBigEyes(true);

// 设置大眼的程度，范围 [0, 100]，默认为 50

mEffects.setBigEyesParam({ intensity: 100 });
```
:::
:::if{props.platform="Flutter"}
```dart
// 开启大眼功能
ZegoEffectsPlugin.instance.enableBigEyes(true);

// 设置大眼的程度，范围 [0, 100]，默认为 50
ZegoEffectsBigEyesParam param = ZegoEffectsBigEyesParam();
param.intensity = 100;
ZegoEffectsPlugin.instance.setBigEyesParam(param);
```
:::

### 瘦脸

<Warning title="注意">
使用瘦脸功能前，请先导入对应的 “FaceDetectionModel” 模型文件，否则功能无法生效。详情请参考 [快速开始 - 导入资源和模型](/ai-effects-macos-c/quick-starts/import-resources-and-models)。
</Warning>

调用 {getPlatformData2(props,enableFaceLiftingMap)} 接口开启瘦脸功能，并调用 {getPlatformData2(props,setFaceLiftingParamMap)} 接口设置瘦脸的程度。  

{getPlatformData2(props,ZegoEffectsFaceLiftingParamMap)} 对象的瘦脸程度参数 “intensity” 的取值范围为 [0, 100]，默认为 “50”。取值越大，瘦脸程度越大，开发者可以根据需求自定义取值。

:::if{props.platform=undefined}
```objc
// 开启瘦脸功能
[self.effects enableFaceLifting:YES];

// 设置瘦脸的程度，范围 [0, 100]，默认为 50
ZegoEffectsFaceLiftingParam *param = [[ZegoEffectsFaceLiftingParam alloc] init];
param.intensity = 100;
[self.effects setFaceLiftingParam:param];
```
:::
:::if{props.platform="Android"}
```java
// 开启瘦脸功能
mEffects.enableFaceLifting(true);

// 设置瘦脸的程度，范围 [0, 100]，默认为 50
ZegoEffectsFaceLiftingParam param = new ZegoEffectsFaceLiftingParam();
param.intensity = 100;
mEffects.setFaceLiftingParam(param);
```
:::
:::if{props.platform="Windows"}
```c
// 开启瘦脸功能
zego_effects_enable_face_lifting(handle, true);

// 设置瘦脸的程度，范围 [0, 100]，默认为 50
zego_effects_face_lifting_param param;
param.intensity = 100;
zego_effects_set_face_lifting_param(handle, &param);
```
:::
:::if{props.platform="RN"}
```js
// 开启瘦脸功能
mEffects.enableFaceLifting(true);

// 设置瘦脸的程度，范围 [0, 100]，默认为 50

mEffects.setFaceLiftingParam({ intensity: 100 });
```
:::
:::if{props.platform="Flutter"}
```dart
// 开启瘦脸功能
ZegoEffectsPlugin.instance.enableFaceLifting(true);

// 设置瘦脸的程度，范围 [0, 100]，默认为 50
ZegoEffectsFaceLiftingParam param = ZegoEffectsFaceLiftingParam();
param.intensity = 100;
ZegoEffectsPlugin.instance.setFaceLiftingParam(param);
```
:::

### 小嘴

调用 {getPlatformData2(props,enableSmallMouthMap)} 接口开启小嘴功能，并调用 {getPlatformData2(props,setSmallMouthParamMap)} 接口设置小嘴的程度。  

{getPlatformData2(props,ZegoEffectsSmallMouthParamMap)} 对象的小嘴程度参数 “intensity” 的取值范围为 [-100, 100]，默认为 “50”。取值越大，小嘴程度越大，开发者可以根据需求自定义取值。

:::if{props.platform=undefined}
```objc
// 开启小嘴功能
[self.effects enableSmallMouth:YES];

// 设置小嘴的程度，范围 [-100, 100]，默认为 50
ZegoEffectsSmallMouthParam *param = [[ZegoEffectsSmallMouthParam alloc] init];
param.intensity = 100;
[self.effects setSmallMouthParam:param];
```
:::
:::if{props.platform="Android"}
```java
// 开启小嘴功能
mEffects.enableSmallMouth(true);

// 设置小嘴的程度，范围 [-100, 100]，默认为 50
ZegoEffectsSmallMouthParam param = new ZegoEffectsSmallMouthParam();
param.intensity = 100;
mEffects.setSmallMouthParam(param);
```
:::
:::if{props.platform="Windows"}
```c
// 开启小嘴功能
zego_effects_enable_small_mouth(handle, true);

// 设置小嘴的程度，范围 [-100, 100]，默认为 50
zego_effects_small_mouth_param param;
param.intensity = 100;
zego_effects_set_small_mouth_param(handle, &param);
```
:::
:::if{props.platform="RN"}
```js
// 开启小嘴功能
mEffects.enableSmallMouth(true);

// 设置小嘴的程度，范围 [-100, 100]，默认为 50

mEffects.setSmallMouthParam({ intensity: 100 });
```
:::
:::if{props.platform="Flutter"}
```dart
// 开启小嘴功能
ZegoEffectsPlugin.instance.enableSmallMouth(true);

// 设置小嘴的程度，范围 [-100, 100]，默认为 50
ZegoEffectsSmallMouthParam param = new ZegoEffectsSmallMouthParam();
param.intensity = 100;
mEffects.setSmallMouthParam(param);
```
:::

### 亮眼

调用 {getPlatformData2(props,enableEyesBrighteningMap)} 接口开启亮眼功能，并调用 {getPlatformData2(props,setEyesBrighteningParamMap)} 接口设置亮眼的程度。  


{getPlatformData2(props,ZegoEffectsEyesBrighteningParamMap)} 对象的亮眼程度参数 “intensity” 的取值范围为 [0, 100]，默认为 “50”。取值越大，亮眼程度越大，开发者可以根据需求自定义取值。

:::if{props.platform=undefined}
```objc
// 开启亮眼功能
[self.effects enableEyesBrightening:YES];

// 设置亮眼的程度，范围 [0, 100]，默认为 50
ZegoEffectsEyesBrighteningParam *param = [[ZegoEffectsEyesBrighteningParam alloc] init];
param.intensity = 100;
[self.effects setEyesBrighteningParam:param];
```
:::
:::if{props.platform="Android"}
```java
// 开启亮眼功能
mEffects.enableEyesBrightening(true);

// 设置亮眼的程度，范围 [0, 100]，默认为 50
ZegoEffectsEyesBrighteningParam param = new ZegoEffectsEyesBrighteningParam();
param.intensity = 100;
mEffects.setEyesBrighteningParam(param);
```
:::
:::if{props.platform="Windows"}
```c
// 开启亮眼功能
zego_effects_enable_eyes_brightening(handle, true);

// 设置亮眼的程度，范围 [0, 100]，默认为 50
zego_effects_eyes_brightening_param param;
param.intensity = 100;
zego_effects_set_eyes_brightening_param(handle, &param);
```
:::
:::if{props.platform="RN"}
```js
// 开启亮眼功能
mEffects.enableEyesBrightening(true);

// 设置亮眼的程度，范围 [0, 100]，默认为 50

mEffects.setEyesBrighteningParam({ intensity: 100 });
```
:::
:::if{props.platform="Flutter"}
```dart
// 开启亮眼功能
ZegoEffectsPlugin.instance.enableEyesBrightening(true);

// 设置亮眼的程度，范围 [0, 100]，默认为 50
ZegoEffectsEyesBrighteningParam param = new ZegoEffectsEyesBrighteningParam();
param.intensity = 100;
mEffects.setEyesBrighteningParam(param);
```
:::

### 瘦鼻

调用 {getPlatformData2(props,enableNoseNarrowingMap)} 接口开启瘦鼻功能，并调用 {getPlatformData2(props,setNoseNarrowingParamMap)} 接口设置瘦鼻的程度。  

{getPlatformData2(props,ZegoEffectsNoseNarrowingParamMap)} 对象的瘦鼻程度参数 “intensity” 的取值范围为 [0, 100]，默认为 “50”。取值越大，瘦鼻程度越大，开发者可以根据需求自定义取值。

:::if{props.platform=undefined}
```objc
// 开启瘦鼻功能
[self.effects enableNoseNarrowing:YES];

// 设置瘦鼻的程度，范围 [0, 100]，默认为 50
ZegoEffectsNoseNarrowingParam *param = [[ZegoEffectsNoseNarrowingParam alloc] init];
param.intensity = 100;
[self.effects setNoseNarrowingParam:param];
```
:::
:::if{props.platform="Android"}
```java
// 开启瘦鼻功能
mEffects.enableNoseNarrowing(true);

// 设置瘦鼻的程度，范围 [0, 100]，默认为 50
ZegoEffectsNoseNarrowingParam param = new ZegoEffectsNoseNarrowingParam();
param.intensity = 100;
mEffects.setNoseNarrowingParam(param);
```
:::
:::if{props.platform="Windows"}
```c
// 开启瘦鼻功能
zego_effects_enable_nose_narrowing(handle, true);

// 设置瘦鼻的程度，范围 [0, 100]，默认为 50
zego_effects_nose_narrowing_param param;
param.intensity = 100;
zego_effects_set_nose_narrowing_param(handle, &param);
```
:::
:::if{props.platform="RN"}
```js
// 开启瘦鼻功能
mEffects.enableNoseNarrowing(true);

// 设置瘦鼻的程度，范围 [0, 100]，默认为 50

mEffects.setNoseNarrowingParam({ intensity: 100 });
```
:::
:::if{props.platform="Flutter"}
```dart
// 开启瘦鼻功能
ZegoEffectsPlugin.instance.enableNoseNarrowing(true);

// 设置瘦鼻的程度，范围 [0, 100]，默认为 50
ZegoEffectsNoseNarrowingParam param = new ZegoEffectsNoseNarrowingParam();
param.intensity = 100;
mEffects.setNoseNarrowingParam(param);
```
:::

### 牙齿美白

<Warning title="注意">
使用牙齿美白功能前，请先导入对应的 “TeethWhiteningResources” 资源文件，否则功能无法生效。详情请参考 [快速开始 - 导入资源和模型](/ai-effects-macos-c/quick-starts/import-resources-and-models)。
</Warning>

调用 {getPlatformData2(props,enableTeethWhiteningMap)} 接口开启牙齿美白功能，并调用 {getPlatformData2(props,setTeethWhiteningParamMap)} 接口设置牙齿美白的程度。  

{getPlatformData2(props,ZegoEffectsTeethWhiteningParamMap)} 对象的牙齿美白程度参数 “intensity” 的取值范围为 [0, 100]，默认为 “50”。取值越大，牙齿美白程度越大，开发者可以根据需求自定义取值。

:::if{props.platform=undefined}
```objc
// 开启牙齿美白功能
[self.effects enableTeethWhitening:YES];

// 设置牙齿美白的程度，范围 [0, 100]，默认为 50
ZegoEffectsTeethWhiteningParam *param = [[ZegoEffectsTeethWhiteningParam alloc] init];
param.intensity = 100;
[self.effects setTeethWhiteningParam:param];
```
:::
:::if{props.platform="Android"}
```java
// 开启牙齿美白功能
mEffects.enableTeethWhitening(true);

// 设置牙齿美白的程度，范围 [0, 100]，默认为 50
ZegoEffectsTeethWhiteningParam param = new ZegoEffectsTeethWhiteningParam();
param.intensity = 100;
mEffects.setTeethWhiteningParam(param);
```
:::
:::if{props.platform="Windows"}
```c
// 开启牙齿美白功能
zego_effects_enable_teeth_whitening(handle, true);

// 设置牙齿美白的程度，范围 [0, 100]，默认为 50
zego_effects_set_teeth_whitening_param param;
param.intensity = 100;
zego_effects_set_teeth_whitening_param(handle, &param);
```
:::
:::if{props.platform="RN"}
```js
// 开启牙齿美白功能
mEffects.enableTeethWhitening(true);

// 设置牙齿美白的程度，范围 [0, 100]，默认为 50

mEffects.setTeethWhiteningParam({ intensity: 100 });
```
:::
:::if{props.platform="Flutter"}
```dart
// 开启牙齿美白功能
ZegoEffectsPlugin.instance.enableTeethWhitening(true);

// 设置牙齿美白的程度，范围 [0, 100]，默认为 50
ZegoEffectsTeethWhiteningParam param = new ZegoEffectsTeethWhiteningParam();
param.intensity = 100;
mEffects.setTeethWhiteningParam(param);
```
:::

### 长下巴

调用 {getPlatformData2(props,enableLongChinMap)} 接口开启长下巴功能，并调用 {getPlatformData2(props,setLongChinParamMap)} 接口设置长下巴的程度。  

{getPlatformData2(props,ZegoEffectsLongChinParamMap)} 对象的长下巴程度参数 “intensity” 的取值范围为 [0, 100]，默认为 “50”。取值越大，长下巴程度越大，开发者可以根据需求自定义取值。

:::if{props.platform=undefined}
```objc
// 开启长下巴功能
[self.effects enableLongChin:YES];

// 设置长下巴的程度，范围 [0, 100]，默认为 50
ZegoEffectsLongChinParam *param = [[ZegoEffectsLongChinParam alloc] init];
param.intensity = 100;
[self.effects setLongChinParam:param];
```
:::
:::if{props.platform="Android"}
```java
// 开启长下巴功能
mEffects.enableLongChin(true);

// 设置长下巴的程度，范围 [0, 100]，默认为 50
ZegoEffectsLongChinParam param = new ZegoEffectsLongChinParam();
param.intensity = 100;
mEffects.setLongChinParam(param);
```
:::
:::if{props.platform="Windows"}
```c
// 开启长下巴功能
zego_effects_enable_long_chin(handle, true);

// 设置长下巴的程度，范围 [0, 100]，默认为 50
zego_effects_long_chin_param param;
param.intensity = 100;
zego_effects_set_long_chin_param(handle, &param);
```
:::
:::if{props.platform="RN"}
```js
// 开启长下巴功能
mEffects.enableLongChin(true);

// 设置长下巴的程度，范围 [0, 100]，默认为 50

mEffects.setLongChinParam({ intensity: 100 });
```
:::
:::if{props.platform="Flutter"}
```dart
// 开启长下巴功能
ZegoEffectsPlugin.instance.enableLongChin(true);

// 设置长下巴的程度，范围 [0, 100]，默认为 50
ZegoEffectsLongChinParam param = ZegoEffectsLongChinParam();
param.intensity = 100;
ZegoEffectsPlugin.instance.setLongChinParam(param);
```
:::

### 缩小额头高度

调用 {getPlatformData2(props,enableForeheadShorteningMap)} 接口开启缩小额头高度功能，并调用 {getPlatformData2(props,setForeheadShorteningParamMap)} 接口设置缩小额头高度的程度。  

{getPlatformData2(props,ZegoEffectsForeheadShorteningParamMap)} 对象的缩小额头高度程度参数 “intensity” 的取值范围为 [-100, 100]，默认为 “50”。取值越大，缩小额头高度程度越大，开发者可以根据需求自定义取值。

:::if{props.platform=undefined}
```objc
// 开启缩小额头高度功能
[self.effects enableForeheadShortening:YES];

// 设置缩小额头高度的程度，范围 [-100, 100]，默认为 50
ZegoEffectsForeheadShorteningParam*param = [[ZegoEffectsForeheadShorteningParam alloc] init];
param.intensity = 100;
[self.effects setForeheadShorteningParam:param];
```
:::
:::if{props.platform="Android"}
```java
// 开启缩小额头高度功能
mEffect.enableForeheadShortening(true);

// 设置缩小额头高度的程度，范围 [-100, 100]，默认为 50
ZegoEffectsForeheadShorteningParam param = new ZegoEffectsForeheadShorteningParam();
param.intensity = 100;
mEffects.setForeheadShorteningParam(param);
```
:::
:::if{props.platform="Windows"}
```c
// 开启缩小额头高度功能
zego_effects_enable_forehead_shortening(handle, true);

// 设置缩小额头高度的程度，范围 [-100, 100]，默认为 50
zego_effects_forehead_shortening_param param;
param.intensity = 100;
zego_effects_set_forehead_shortening_param(handle, &param);
```
:::
:::if{props.platform="RN"}
```js
// 开启缩小额头高度功能
mEffect.enableForeheadShortening(true);

// 设置缩小额头高度的程度，范围 [-100, 100]，默认为 50
mEffects.setForeheadShorteningParam({ intensity: 100 });
```
:::
:::if{props.platform="Flutter"}
```dart
// 开启缩小额头高度功能
ZegoEffectsPlugin.instance.enableForeheadShortening(true);

// 设置缩小额头高度的程度，范围 [-100, 100]，默认为 50
ZegoEffectsForeheadShorteningParam param = ZegoEffectsForeheadShorteningParam();
param.intensity = 100;
ZegoEffectsPlugin.instance.setForeheadShorteningParam(param);
```
:::

### 瘦下颌骨

调用 {getPlatformData2(props,enableMandibleSlimmingMap)} 接口开启瘦下颌骨功能，并调用 {getPlatformData2(props,setMandibleSlimmingParamMap)} 接口设置瘦下颌骨的程度。  

{getPlatformData2(props,ZegoEffectsMandibleSlimmingParamMap)} 对象的瘦下颌骨程度参数 “intensity” 的取值范围为 [0, 100]，默认为 “50”。取值越大，瘦下颌骨程度越大，开发者可以根据需求自定义取值。

:::if{props.platform=undefined}
```objc
// 开启瘦下颌骨功能
[self.effects enableMandibleSlimming:YES];

// 设置瘦下颌骨的程度，范围 [0, 100]，默认为 50
ZegoEffectsMandibleSlimmingParam*param = [[ZegoEffectsMandibleSlimmingParam alloc] init];
param.intensity = 100;
[self.effects setMandibleSlimmingParam:param];
```
:::
:::if{props.platform="Android"}

```java
// 开启瘦下颌骨功能
mEffect.enableMandibleSlimming(true);

// 设置瘦下颌骨的程度，范围 [0, 100]，默认为 50
ZegoEffectsMandibleSlimmingParam param = new ZegoEffectsMandibleSlimmingParam();
param.intensity = 100;
mEffects.setMandibleSlimmingParam(param);
```
:::
:::if{props.platform="Windows"}
```c
// 开启瘦下颌骨功能
zego_effects_enable_mandible_slimming(handle, true);

// 设置瘦下颌骨的程度，范围 [0, 100]，默认为 50
zego_effects_mandible_slimming_param param;
param.intensity = 100;
zego_effects_set_mandible_slimming_param(handle, &param);
```
:::
:::if{props.platform="RN"}
```js
// 开启瘦下颌骨功能
mEffect.enableMandibleSlimming(true);

// 设置瘦下颌骨的程度，范围 [0, 100]，默认为 50
mEffects.setMandibleSlimmingParam({ intensity: 100 });
```
:::
:::if{props.platform="Flutter"}
```dart
// 开启瘦下颌骨功能
ZegoEffectsPlugin.instance.enableMandibleSlimming(true);

// 设置瘦下颌骨的程度，范围 [0, 100]，默认为 50
ZegoEffectsMandibleSlimmingParam param = ZegoEffectsMandibleSlimmingParam();
param.intensity = 100;
ZegoEffectsPlugin.instance.setMandibleSlimmingParam(param);
```
:::

### 瘦颧骨

调用 {getPlatformData2(props,enableCheekboneSlimmingMap)} 接口开启瘦颧骨功能，并调用 {getPlatformData2(props,setCheekboneSlimmingParamMap)} 接口设置瘦颧骨的程度。  

{getPlatformData2(props,ZegoEffectsCheekboneSlimmingParamMap)} 对象的瘦颧骨程度参数 “intensity” 的取值范围为 [0, 100]，默认为 “50”。取值越大，瘦颧骨程度越大，开发者可以根据需求自定义取值。

:::if{props.platform=undefined}
```objc
// 开启瘦颧骨功能
[self.effects enableCheekboneSlimming:YES];

// 设置颧骨的程度，范围 [0, 100]，默认为 50
ZegoEffectsCheekboneSlimmingParam*param = [[ZegoEffectsCheekboneSlimmingParam alloc] init];
param.intensity = 100;
[self.effects setCheekboneSlimmingParam:param];
```
:::
:::if{props.platform="Android"}
```java
// 开启瘦颧骨功能
mEffect.enableCheekboneSlimming(true);

// 设置瘦颧骨的程度，范围 [0, 100]，默认为 50
ZegoEffectsCheekboneSlimmingParam param = new ZegoEffectsCheekboneSlimmingParam();
param.intensity = 100;
mEffects.setCheekboneSlimmingParam(param);
```
:::
:::if{props.platform="Windows"}
```c
// 开启瘦颧骨功能
zego_effects_enable_cheekbone_slimming(handle, true);

// 设置瘦颧骨的程度，范围 [0, 100]，默认为 50
zego_effects_cheekbone_slimming_param param;
param.intensity = 100;
zego_effects_set_cheekbone_slimming_param(handle, &param);
```
:::
:::if{props.platform="RN"}
```js
// 开启瘦颧骨功能
mEffect.enableCheekboneSlimming(true);

// 设置瘦颧骨的程度，范围 [0, 100]，默认为 50
mEffects.setCheekboneSlimmingParam({ intensity: 100 });
```
:::
:::if{props.platform="Flutter"}
```dart
// 开启瘦颧骨功能
ZegoEffectsPlugin.instance.enableCheekboneSlimming(true);

// 设置瘦颧骨的程度，范围 [0, 100]，默认为 50
ZegoEffectsCheekboneSlimmingParam param = ZegoEffectsCheekboneSlimmingParam();
param.intensity = 100;
ZegoEffectsPlugin.instance.setCheekboneSlimmingParam(param);
```
:::

### 小脸

调用 {getPlatformData2(props,enableFaceShorteningMap)} 接口开启小脸功能，并调用 {getPlatformData2(props,setFaceShorteningParamMap)} 接口设置小脸的程度。  

{getPlatformData2(props,ZegoEffectsFaceShorteningParamMap)} 对象的小脸程度参数 “intensity” 的取值范围为 [0, 100]，默认为 “50”。取值越大，小脸程度越大，开发者可以根据需求自定义取值。

:::if{props.platform=undefined}
```objc
// 开启小脸功能
[self.effects enableFaceShortening:YES];

// 设置小脸的程度，范围 [0, 100]，默认为 50
ZegoEffectsFaceShorteningParam* param = [[ZegoEffectsFaceShorteningParam alloc] init];
param.intensity = 100;
[self.effects setFaceShorteningParam:param];
```
:::
:::if{props.platform="Android"}
```java
// 开启小脸功能
mEffect.enableFaceShortening(true);

// 设置小脸的程度，范围 [0, 100]，默认为 50
ZegoEffectsFaceShorteningParam* param = new ZegoEffectsFaceShorteningParam();
param.intensity = 100;
mEffects.setFaceShorteningParam(param);
```
:::
:::if{props.platform="Windows"}
```c
// 开启小脸功能
zego_effects_enable_face_shortening(handle, true);

// 设置小脸的程度，范围 [0, 100]，默认为 50
zego_effects_face_shortening_param param;
param.intensity = 100;
zego_effects_set_face_shortening_param(handle, &param);
```
:::
:::if{props.platform="RN"}
```js
// 开启小脸功能
mEffect.enableFaceShortening(true);

// 设置小脸的程度，范围 [0, 100]，默认为 50
mEffects.setFaceShorteningParam({ intensity: 100 });
```
:::
:::if{props.platform="Flutter"}
```dart
// 开启小脸功能
ZegoEffectsPlugin.instance.enableFaceShortening(true);

// 设置小脸的程度，范围 [0, 100]，默认为 50
ZegoEffectsFaceShorteningParam param = ZegoEffectsFaceShorteningParam();
param.intensity = 100;
ZegoEffectsPlugin.instance.setFaceShorteningParam(param);
```
:::

### 长鼻

调用 {getPlatformData2(props,enableNoseLengtheningMap)} 接口开启长鼻功能，并调用 {getPlatformData2(props,setNoseLengtheningParamMap)} 接口设置长鼻的程度。  

{getPlatformData2(props,ZegoEffectsNoseLengtheningParamMap)} 对象的长鼻程度参数 “intensity” 的取值范围为 [-100, 100]，默认为 “50”。取值越大，长鼻程度越大，开发者可以根据需求自定义取值。

:::if{props.platform=undefined}
```objc
// 开启长鼻功能
[self.effects enableNoseLengthening];

// 设置长鼻的程度，范围 [-100, 100]，默认为 50
ZegoEffectsNoseLengtheningParam* param = [[ZegoEffectsNoseLengtheningParam alloc] init];
param.intensity = 100;
[self.effects setNoseLengtheningParam:param];
```
:::
:::if{props.platform="Android"}
```java
// 开启长鼻功能
mEffect.enableNoseLengthening(true);

// 设置长鼻的程度，范围 [-100, 100]，默认为 50
ZegoEffectsNoseLengtheningParam* param = new ZegoEffectsNoseLengtheningParam();
param.intensity = 100;
mEffects.setNoseLengheningParam(param);
```
:::
:::if{props.platform="Windows"}
```c
// 开启长鼻功能
zego_effects_enable_nose_lengthening(handle, true);

// 设置长鼻的程度，范围 [-100, 100]，默认为 50
zego_effects_nose_lengthening_param param;
param.intensity = 100;
zego_effects_set_nose_lengthening_param(handle, &param);
```
:::
:::if{props.platform="RN"}
```js
// 开启长鼻功能
mEffect.enableNoseLengthening(true);

// 设置长鼻的程度，范围 [-100, 100]，默认为 50
mEffects.setNoseLengheningParam({ intensity: 100 });
```
:::
:::if{props.platform="Flutter"}
```dart
// 开启长鼻功能
ZegoEffectsPlugin.instance.enableNoseLengthening(true);

// 设置长鼻的程度，范围 [-100, 100]，默认为 50
ZegoEffectsFaceLiftingParam param = ZegoEffectsFaceLiftingParam();
param.intensity = 100;
ZegoEffectsPlugin.instance.setFaceLiftingParam(param);
```
:::
<Content platform="Windows"/>