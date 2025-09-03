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

export const enableWhitenMap = {
    'default': <a href="@enableWhiten" target='_blank'>enableWhiten</a>,
    'Flutter': <a href="https://doc-zh.zego.im/unique-api/ai-effects-sdk/zh/dart_flutter/zego_effects_plugin/ZegoEffectsPlugin/enableWhiten.html" target='_blank'>enableWhiten</a>,
}

export const setWhitenParamMap = {
    'default': <a href="@setWhitenParam" target='_blank'>setWhitenParam</a>,
    'Flutter': <a href="https://doc-zh.zego.im/unique-api/ai-effects-sdk/zh/dart_flutter/zego_effects_plugin/ZegoEffectsPlugin/setWhitenParam.html" target='_blank'>setWhitenParam</a>,
}

export const ZegoEffectsWhitenParamMap = {
    'default': <a href="@-ZegoEffectsWhitenParam" target='_blank'>ZegoEffectsWhitenParam</a>,
    'Flutter': <a href="https://doc-zh.zego.im/unique-api/ai-effects-sdk/zh/dart_flutter/zego_effects_defines/ZegoEffectsWhitenParam-class.html" target='_blank'>ZegoEffectsWhitenParam</a>,
}

export const enableSmoothMap = {
    'default': <a href="@enableSmooth" target='_blank'>enableSmooth</a>,
    'Flutter': <a href="https://doc-zh.zego.im/unique-api/ai-effects-sdk/zh/dart_flutter/zego_effects_plugin/ZegoEffectsPlugin/enableSmooth.html" target='_blank'>enableSmooth</a>,
}

export const setSmoothParamMap = {
    'default': <a href="@setSmoothParam" target='_blank'>setSmoothParam</a>,
    'Flutter': <a href="https://doc-zh.zego.im/unique-api/ai-effects-sdk/zh/dart_flutter/zego_effects_plugin/ZegoEffectsPlugin/setSmoothParam.html" target='_blank'>setSmoothParam</a>,
}

export const ZegoEffectsSmoothParamMap = {
    'default': <a href="@-ZegoEffectsSmoothParam" target='_blank'>ZegoEffectsSmoothParam</a>,
    'Flutter': <a href="https://doc-zh.zego.im/unique-api/ai-effects-sdk/zh/dart_flutter/zego_effects_defines/ZegoEffectsSmoothParam-class.html" target='_blank'>ZegoEffectsSmoothParam</a>,
}

export const enableRosyMap = {
    'default': <a href="@enableRosy" target='_blank'>enableRosy</a>,
    'Flutter': <a href="https://doc-zh.zego.im/unique-api/ai-effects-sdk/zh/dart_flutter/zego_effects_plugin/ZegoEffectsPlugin/enableRosy.html" target='_blank'>enableRosy</a>,
}

export const ZegoEffectsRosyParamMap = {
    'default': <a href="@-ZegoEffectsRosyParam" target='_blank'>ZegoEffectsRosyParam</a>,
    'Flutter': <a href="https://doc-zh.zego.im/unique-api/ai-effects-sdk/zh/dart_flutter/zego_effects_defines/ZegoEffectsRosyParam-class.html" target='_blank'>ZegoEffectsRosyParam</a>,
}

export const setRosyParamMap = {
    'default': <a href="@setRosyParam" target='_blank'>setRosyParam</a>,
    'Flutter': <a href="https://doc-zh.zego.im/unique-api/ai-effects-sdk/zh/dart_flutter/zego_effects_plugin/ZegoEffectsPlugin/setRosyParam.html" target='_blank'>setRosyParam</a>,
}

export const enableSharpenMap = {
    'default': <a href="@enableSharpen" target='_blank'>enableSharpen</a>,
    'Flutter': <a href="https://doc-zh.zego.im/unique-api/ai-effects-sdk/zh/dart_flutter/zego_effects_plugin/ZegoEffectsPlugin/enableSharpen.html" target='_blank'>enableSharpen</a>,
}

export const setSharpenParamMap = {
    'default': <a href="@setSharpenParam" target='_blank'>setSharpenParam</a>,
    'Flutter': <a href="https://doc-zh.zego.im/unique-api/ai-effects-sdk/zh/dart_flutter/zego_effects_plugin/ZegoEffectsPlugin/setSharpenParam.html" target='_blank'>setSharpenParam</a>,
}

export const ZegoEffectsSharpenParamMap = {
    'default': <a href="@-ZegoEffectsSharpenParam" target='_blank'>ZegoEffectsSharpenParam</a>,
    'Flutter': <a href="https://doc-zh.zego.im/unique-api/ai-effects-sdk/zh/dart_flutter/zego_effects_defines/ZegoEffectsSharpenParam-class.html" target='_blank'>ZegoEffectsSharpenParam</a>,
}

export const enableWrinklesRemovingMap = {
    'default': <a href="@enableWrinklesRemoving" target='_blank'>enableWrinklesRemoving</a>,
    'Flutter': <a href="https://doc-zh.zego.im/unique-api/ai-effects-sdk/zh/dart_flutter/zego_effects_plugin/ZegoEffectsPlugin/enableWrinklesRemoving.html" target='_blank'>enableWrinklesRemoving</a>,
}

export const setWrinklesRemovingParamMap = {
    'default': <a href="@setWrinklesRemovingParam" target='_blank'>setWrinklesRemovingParam</a>,
    'Flutter': <a href="https://doc-zh.zego.im/unique-api/ai-effects-sdk/zh/dart_flutter/zego_effects_plugin/ZegoEffectsPlugin/setWrinklesRemovingParam.html" target='_blank'>setWrinklesRemovingParam</a>,
}

export const ZegoEffectsWrinklesRemovingParamMap = {
    'default': <a href="@-ZegoEffectsWrinklesRemovingParam" target='_blank'>ZegoEffectsWrinklesRemovingParam</a>,
    'Flutter': <a href="https://doc-zh.zego.im/unique-api/ai-effects-sdk/zh/dart_flutter/zego_effects_defines/ZegoEffectsWrinklesRemovingParam-class.html" target='_blank'>ZegoEffectsWrinklesRemovingParam</a>,
}

export const enableDarkCirclesRemovingMap = {
    'default': <a href="@enableDarkCirclesRemoving" target='_blank'>enableDarkCirclesRemoving</a>,
    'Flutter': <a href="https://doc-zh.zego.im/unique-api/ai-effects-sdk/zh/dart_flutter/zego_effects_plugin/ZegoEffectsPlugin/enableDarkCirclesRemoving.html" target='_blank'>enableDarkCirclesRemoving</a>,
}

export const setDarkCirclesRemovingParamMap = {
    'default': <a href="@setDarkCirclesRemovingParam" target='_blank'>setDarkCirclesRemovingParam</a>,
    'Flutter': <a href="https://doc-zh.zego.im/unique-api/ai-effects-sdk/zh/dart_flutter/zego_effects_plugin/ZegoEffectsPlugin/setDarkCirclesRemovingParam.html" target='_blank'>setDarkCirclesRemovingParam</a>,
}

export const ZegoEffectsDarkCirclesRemovingParamMap = {
    'default': <a href="@-ZegoEffectsDarkCirclesRemovingParam" target='_blank'>ZegoEffectsDarkCirclesRemovingParam</a>,
    'Flutter': <a href="https://doc-zh.zego.im/unique-api/ai-effects-sdk/zh/dart_flutter/zego_effects_defines/ZegoEffectsDarkCirclesRemovingParam-class.html" target='_blank'>ZegoEffectsDarkCirclesRemovingParam</a>,
}

export const enableAcneRemovingMap = {
    'default': <a href="@enableAcneRemoving" target='_blank'>enableAcneRemoving</a>,
    'Flutter': <a href="https://doc-zh.zego.im/unique-api/ai-effects-sdk/zh/dart_flutter/zego_effects_plugin/ZegoEffectsPlugin/enableAcneRemoving.html" target='_blank'>enableAcneRemoving</a>,
}

export const setAcneRemovingParamMap = {
    'default': <a href="@setAcneRemovingParam" target='_blank'>setAcneRemovingParam</a>,
    'Flutter': <a href="https://doc-zh.zego.im/unique-api/ai-effects-sdk/zh/dart_flutter/zego_effects_plugin/ZegoEffectsPlugin/setAcneRemovingParam.html" target='_blank'>setAcneRemovingParam</a>,
}

export const ZegoEffectsAcneRemovingParamMap = {
    'default': <a href="@-ZegoEffectsAcneRemovingParam" target='_blank'>ZegoEffectsAcneRemovingParam</a>,
    'Flutter': <a href="https://doc-zh.zego.im/unique-api/ai-effects-sdk/zh/dart_flutter/zego_effects_defines/ZegoEffectsAcneRemovingParam-class.html" target='_blank'>ZegoEffectsAcneRemovingParam</a>,
}

export const enableClarityMap = {
    'default': <a href="@enableClarity" target='_blank'>enableClarity</a>,
    'Flutter': <a href="https://doc-zh.zego.im/unique-api/ai-effects-sdk/zh/dart_flutter/zego_effects_plugin/ZegoEffectsPlugin/enableClarity.html" target='_blank'>enableClarity</a>,
}

export const setClarityParamMap = {
    'default': <a href="@setClarityParam" target='_blank'>setClarityParam</a>,
    'Flutter': <a href="https://doc-zh.zego.im/unique-api/ai-effects-sdk/zh/dart_flutter/zego_effects_plugin/ZegoEffectsPlugin/setClarityParam.html" target='_blank'>setClarityParam</a>,
}

export const ZegoEffectsClarityParamMap = {
    'default': <a href="@-ZegoEffectsClarityParam" target='_blank'>ZegoEffectsClarityParam</a>,
    'Flutter': <a href="https://doc-zh.zego.im/unique-api/ai-effects-sdk/zh/dart_flutter/zego_effects_defines/ZegoEffectsClarityParam-class.html" target='_blank'>ZegoEffectsClarityParam</a>,
}

export const enableSkinColorMap = {
    'default': <a href="@enableSkinColor" target='_blank'>enableSkinColor</a>,
    'Flutter': <a href="https://doc-zh.zego.im/unique-api/ai-effects-sdk/zh/dart_flutter/zego_effects_plugin/ZegoEffectsPlugin/enableSkinColor.html" target='_blank'>enableSkinColor</a>,
}

export const setSkinColorResPathMap = {
    'default': <a href="@setSkinColorResPath" target='_blank'>setSkinColorResPath</a>,
    'Flutter': <a href="https://doc-zh.zego.im/unique-api/ai-effects-sdk/zh/dart_flutter/zego_effects_plugin/ZegoEffectsPlugin/setSkinColor.html" target='_blank'>setSkinColor</a>,
}
export const setSkinColorParamMap = {
    'default': <a href="@setSkinColorParam" target='_blank'>setSkinColorParam</a>,
    'Flutter': <a href="https://doc-zh.zego.im/unique-api/ai-effects-sdk/zh/dart_flutter/zego_effects_plugin/ZegoEffectsPlugin/setSkinColorParam.html" target='_blank'>setSkinColorParam</a>,
}

export const ZegoEffectsSkinColorParamMap = {
    'default': <a href="@-ZegoEffectsSkinColorParam" target='_blank'>ZegoEffectsSkinColorParam</a>,
    'Flutter': <a href="https://doc-zh.zego.im/unique-api/ai-effects-sdk/zh/dart_flutter/zego_effects_defines/ZegoEffectsSkinColorParam-class.html" target='_blank'>ZegoEffectsSkinColorParam</a>,
}

# 美颜

- - -

## 功能简介

ZegoEffects SDK 提供美颜功能，为用户呈现出良好的肌肤状态，打造出独特自然的美颜效果。

开发者可以根据需要调整美白、磨皮、锐化等的程度，实现美颜功能。

## 前提条件

在使用 ZegoEffects SDK 美颜功能前，请确保：

- 已在项目中集成 ZegoEffects SDK，实现基本的图像处理功能，详情请参考 [快速开始 - 实现图像处理](/ai-effects-flutter-dart/quick-starts/implement-basic-image-processing)。
:::if{props.platform="undefined|Android|Flutter"}
<div>
- 已上传待处理图像的宽、高。
</div>
:::
- 导入基础通用资源 “CommonResources” 文件，详情请参考 [快速开始 - 导入资源和模型](/ai-effects-flutter-dart/quick-starts/import-resources-and-models)。

## 使用步骤

美颜包括美白、磨皮、锐化、红润等功能。

开启美颜功能之后，开发者可根据实际的需求来自定义美颜参数。如果未自定义，SDK 将采用默认参数值实现美颜功能。

### 美白

<Warning title="注意">
使用美白功能前，请先导入对应的 “FaceWhiteningResources” 资源文件，否则功能无法生效。详情请参考 [快速开始 - 导入资源和模型](/ai-effects-flutter-dart/quick-starts/import-resources-and-models)。
</Warning>

调用 {getPlatformData2(props,enableWhitenMap)} 接口开启美白功能，并调用 {getPlatformData2(props,setWhitenParamMap)} 接口设置美白的程度。  

{getPlatformData2(props,ZegoEffectsWhitenParamMap)} 对象的美白程度参数 “intensity” 的取值范围为 [0, 100]，默认为 “50”。取值越大，美白程度越大，开发者可以根据需求自定义取值。

:::if{props.platform=undefined}
```objc
// 开启美白功能
[self.effects enableWhiten:YES];

// 设置美白的程度，范围 [0, 100]，默认为 50
ZegoEffectsWhitenParam *param = [[ZegoEffectsWhitenParam alloc] init];
param.intensity = 100;
[self.effects setWhitenParam:param];
```
:::
:::if{props.platform="Android"}
```java
// 开启美白功能
mEffects.enableWhiten(true);   

// 设置美白的程度，范围 [0, 100]，默认为 50
ZegoEffectsWhitenParam param = new ZegoEffectsWhitenParam();
param.intensity = 100;
mEffects.setWhitenParam(param);
```
:::
:::if{props.platform="Flutter"}
```dart
// 开启美白功能
ZegoEffectsPlugin.instance.enableWhiten(true);

// 设置美白的程度，范围 [0, 100]，默认为 50
ZegoEffectsWhitenParam param = ZegoEffectsWhitenParam();
param.intensity = 100;
ZegoEffectsPlugin.instance.setWhitenParam(param);
```
:::
:::if{props.platform="RN"}
```js
// 开启美白功能
mEffects.enableWhiten(true);   

// 设置美白的程度，范围 [0, 100]，默认为 50
mEffects.setWhitenParam({ intensity: 100 });
```

### 磨皮

调用 {getPlatformData2(props,enableSmoothMap)} 接口开启磨皮功能，并调用 {getPlatformData2(props,setSmoothParamMap)} 接口设置磨皮的程度。

{getPlatformData2(props,ZegoEffectsSmoothParamMap)} 对象的磨皮程度参数 “intensity” 的取值范围为 [0, 100]，默认为 “50”。取值越大，磨皮程度越大，开发者可以根据需求自定义取值。

:::if{props.platform=undefined}
```objc
// 开启磨皮功能
[self.effects enableSmooth:YES];

// 设置磨皮的程度，范围 [0, 100]，默认为 50
ZegoEffectsSmoothParam *param = [[ZegoEffectsSmoothParam alloc] init];
param.intensity = 100;
[self.effects setSmoothParam:param];
```
:::
:::if{props.platform="Android"}
```java
// 开启磨皮功能
mEffects.enableSmooth(true);

// 设置磨皮的程度，范围 [0, 100]，默认为 50
ZegoEffectsSmoothParam param = new ZegoEffectsSmoothParam();
param.intensity = 100;
mEffects.setSmoothParam(param);
```
:::
:::if{props.platform="Flutter"}
```dart
// 开启磨皮功能
ZegoEffectsPlugin.instance.enableSmooth(true);

// 设置磨皮的程度，范围 [0, 100]，默认为 50
ZegoEffectsSmoothParam param = ZegoEffectsSmoothParam();
param.intensity = 100;
ZegoEffectsPlugin.instance.setSmoothParam(param);
```
:::
:::if{props.platform="RN"}
```js
// 开启磨皮功能
mEffects.enableSmooth(true);

// 设置磨皮的程度，范围 [0, 100]，默认为 50

mEffects.setSmoothParam({ intensity: 100 });
```
:::

### 红润

<Warning title="注意">
使用红润功能前，请先导入对应的 “RosyResources” 资源文件，否则功能无法生效。详情请参考 [快速开始 - 导入资源和模型](/ai-effects-flutter-dart/quick-starts/import-resources-and-models)。
</Warning>

调用 {getPlatformData2(props,enableRosyMap)} 接口红润功能，并调用 {getPlatformData2(props,setRosyParamMap)} 接口设置红润的程度。  

{getPlatformData2(props,ZegoEffectsRosyParamMap)} 对象的红润程度参数 “intensity” 的取值范围为 [0, 100]，默认为 “50”。取值越大，红润程度越大，开发者可以根据需求自定义取值。


:::if{props.platform=undefined}
```objc
// 开启红润功能
[self.effects enableRosy:YES];

// 设置红润的程度，范围 [0, 100]，默认为 50
ZegoEffectsRosyParam *param = [[ZegoEffectsRosyParam alloc] init];
param.intensity = 100;
[self.effects setRosyParam:param];
```
:::
:::if{props.platform="Android"}
```java
// 开启红润功能
// 开启红润功能
mEffects.enableRosy(true)   

// 设置红润的程度，范围 [0, 100]，默认为 50
ZegoEffectsRosyParam param = new ZegoEffectsRosyParam();
param.intensity = 100;
mEffects.setRosyParam(param);
```
:::
:::if{props.platform="Flutter"}
```dart
// 开启红润功能
ZegoEffectsPlugin.instance.enableRosy(true);

// 设置红润的程度，范围 [0, 100]，默认为 50
ZegoEffectsRosyParam param = ZegoEffectsRosyParam();
param.intensity = 100;
ZegoEffectsPlugin.instance.setRosyParam(param);
```
:::
:::if{props.platform="RN"}
```js
// 开启红润功能
mEffects.enableRosy(true)   

// 设置红润的程度，范围 [0, 100]，默认为 50
mEffects.setRosyParam({ intensity: 100 });
```
:::

### 锐化

调用 {getPlatformData2(props,enableSharpenMap)} 接口开启锐化功能，并调用 {getPlatformData2(props,setSharpenParamMap)} 接口设置锐化的程度。

{getPlatformData2(props,ZegoEffectsSharpenParamMap)} 对象的锐化程度参数 “intensity” 的取值范围为 [0, 100]，默认为 “50”。取值越大，锐化程度越大，开发者可以根据需求自定义取值。

:::if{props.platform=undefined}
```objc
// 开启锐化功能
[self.effects enableSharpen:YES];

// 设置锐化的程度，范围 [0, 100]，默认为 50
ZegoEffectsSharpenParam *param = [[ZegoEffectsSharpenParam alloc] init];
param.intensity = 100;
[self.effects setSharpenParam:param];
```
:::
:::if{props.platform="Android"}
```java
// 开启锐化功能
mEffects.enableSharpen(true);

// 设置锐化的程度，范围 [0, 100]，默认为 50
ZegoEffectsSharpenParam param = new ZegoEffectsSharpenParam();
param.intensity = 100;
mEffects.setSharpenParam(param);
```
:::
:::if{props.platform="Flutter"}
```dart
// 开启锐化功能
ZegoEffectsPlugin.instance.enableSharpen(true);

// 设置锐化的程度，范围 [0, 100]，默认为 50
ZegoEffectsSharpenParam param = ZegoEffectsSharpenParam();
param.intensity = 100;
ZegoEffectsPlugin.instance.setSharpenParam(param);
```
:::
:::if{props.platform="RN"}
```js
// 开启锐化功能
mEffects.enableSharpen(true);

// 设置锐化的程度，范围 [0, 100]，默认为 50

mEffects.setSharpenParam({ intensity: 100 });
```
:::

### 去除法令纹

调用 {getPlatformData2(props,enableWrinklesRemovingMap)} 接口开启法令纹去除功能，并调用 {getPlatformData2(props,setWrinklesRemovingParamMap)} 接口设置法令纹去除的程度。

{getPlatformData2(props,ZegoEffectsWrinklesRemovingParamMap)} 对象的法令纹去除程度参数 “intensity” 的取值范围为 [0, 100]，默认为 “50”。取值越大，法令纹去除程度越大，开发者可以根据需求自定义取值。

:::if{props.platform=undefined}
```objc
// 开启法令纹去除功能
[self.effects enableWrinklesRemoving:YES];

// 设置法令纹去除的程度，范围 [0, 100]，默认为 50
ZegoEffectsWrinklesRemovingParam *param = [[ZegoEffectsWrinklesRemovingParam  alloc] init];
param.intensity = 100;
[self.effects setWrinklesRemovingParam:param];
```
:::
:::if{props.platform="Android"}
```java
// 开启法令纹去除除功能
mEffects.enableWrinklesRemoving(true);

// 设置法令纹去除的程度，范围 [0, 100]，默认为 50
ZegoEffectsWrinklesRemovingParam param = new ZegoEffectsWrinklesRemovingParam ();
param.intensity = 100;
mEffects.setWrinklesRemovingParam(param);
```
:::
:::if{props.platform="Flutter"}
```dart
// 开启法令纹去除除功能
ZegoEffectsPlugin.instance.enableWrinklesRemoving(true);

// 设置法令纹去除的程度，范围 [0, 100]，默认为 50
ZegoEffectsWrinklesRemovingParam param = ZegoEffectsWrinklesRemovingParam();
param.intensity = 100;
ZegoEffectsPlugin.instance.setWrinklesRemovingParam(param);
```
:::
:::if{props.platform="RN"}
```js
// 开启法令纹去除除功能
mEffects.enableWrinklesRemoving(true);

// 设置法令纹去除的程度，范围 [0, 100]，默认为 50
mEffects.setWrinklesRemovingParam({ intensity: 100 });
```
:::

### 去除黑眼圈

调用 {getPlatformData2(props,enableDarkCirclesRemovingMap)} 接口开启黑眼圈去除功能，并调用 {getPlatformData2(props,setDarkCirclesRemovingParamMap)} 接口设置黑眼圈去除的程度。

{getPlatformData2(props,ZegoEffectsDarkCirclesRemovingParamMap)} 对象的黑眼圈去除程度参数 “intensity” 的取值范围为 [0, 100]，默认为 “50”。取值越大，黑眼圈去除程度越大，开发者可以根据需求自定义取值。

:::if{props.platform=undefined}
```objc
// 开启黑眼圈去除功能
[self.effects enableDarkCirclesRemoving:YES];

// 设置黑眼圈去除的程度，范围 [0, 100]，默认为 50
ZegoEffectsDarkCirclesRemovingParam *param = [[ZegoEffectsDarkCirclesRemovingParam  alloc] init];
param.intensity = 100;
[self.effects setDarkCirclesRemovingParam:param];
```
:::
:::if{props.platform="Android"}
```java
// 开启黑眼圈去除功能
mEffects.enableDarkCirclesRemoving(true);

// 设置黑眼圈去除的程度，范围 [0, 100]，默认为 50
ZegoEffectsDarkCirclesRemovingParam param = new ZegoEffectsDarkCirclesRemovingParam ();
param.intensity = 100;
mEffects.setDarkCirclesRemovingParam(param);
```
:::
:::if{props.platform="Flutter"}
```dart
// 开启黑眼圈去除功能
ZegoEffectsPlugin.instance.enableDarkCirclesRemoving(true);

// 设置黑眼圈去除的程度，范围 [0, 100]，默认为 50
ZegoEffectsDarkCirclesRemovingParam param = ZegoEffectsDarkCirclesRemovingParam();
param.intensity = 100;
ZegoEffectsPlugin.instance.setDarkCirclesRemovingParam(param);
```
:::
:::if{props.platform="RN"}
```js
// 开启黑眼圈去除功能
mEffects.enableDarkCirclesRemoving(true);

// 设置黑眼圈去除的程度，范围 [0, 100]，默认为 50
mEffects.setDarkCirclesRemovingParam({ intensity: 100 });
```
:::

### 祛痘斑

调用 {getPlatformData2(props,enableAcneRemovingMap)} 接口开启祛痘祛斑功能，并调用 {getPlatformData2(props,setAcneRemovingParamMap)} 接口设置祛痘祛斑的程度。

{getPlatformData2(props,ZegoEffectsAcneRemovingParamMap)} 对象的祛痘斑程度参数 “intensity” 的取值范围为 [0, 100]，默认为 “0”。取值越大，祛痘斑效果强度越大，开发者可以根据需求自定义取值。

:::if{props.platform=undefined}
```objc
// 开启祛痘祛斑功能
[self.effects enableAcneRemoving:YES];

// 设置祛痘祛斑的程度，范围 [0, 100]，默认为 0
ZegoEffectsAcneRemovingParam *param = [[ZegoEffectsAcneRemovingParam  alloc] init];
param.intensity = 0;
[self.effects setAcneRemovingParam:param];
```
:::
:::if{props.platform="Android"}
```java
// 开启原肤功能
mEffects.enableAcneRemoving(true);

// 设置原肤的程度，范围 [0, 100]，默认为 0
ZegoEffectsAcneRemovingParam param = new ZegoEffectsAcneRemovingParam();
param.intensity = 0;
mEffects.setAcneRemovingParam(param);
```
:::
:::if{props.platform="Flutter"}
```dart
// 开启祛痘斑功能
ZegoEffectsPlugin.instance.enableAcneRemoving(true);

// 设置祛痘斑的程度，范围 [0, 100]，默认为 0
ZegoEffectsAcneRemovingParam param = ZegoEffectsAcneRemovingParam();
param.intensity = 100;
ZegoEffectsPlugin.instance.setAcneRemovingParam(param);
```
:::
:::if{props.platform="RN"}
```js
// 开启祛痘斑功能
mEffects.enableAcneRemoving(true);

// 设置祛痘斑的程度，范围 [0, 100]，默认为 0
mEffects.setAcneRemovingParam({ intensity: 100 });
```
:::

### 清晰效果

<Warning title="注意">
使用清晰效果功能前，请先导入对应的 “ClarityResources” 资源文件，否则功能无法生效。详情请参考 [快速开始 - 导入资源和模型](/ai-effects-flutter-dart/quick-starts/import-resources-and-models)。
</Warning>

调用 {getPlatformData2(props,enableClarityMap)} 接口开启清晰功能，并调用 {getPlatformData2(props,setClarityParamMap)} 接口设置清晰程度。

{getPlatformData2(props,ZegoEffectsClarityParamMap)} 对象的清晰程度参数 “intensity” 的取值范围为 [0, 100]，默认为 “0”。取值越大，清晰效果强度越大，开发者可以根据需求自定义取值。

:::if{props.platform=undefined}
```objc
// 开启清晰功能
[self.effects enableClarity:YES];

// 设置清晰的程度，范围 [0, 100]，默认为 0
ZegoEffectsClarityParam *param = [[ZegoEffectsClarityParam  alloc] init];
param.intensity = 0;
[self.effects setClarityParam:param];
```
:::
:::if{props.platform="Android"}
```java
// 开启清晰功能
mEffects.enableClarity(true);

// 设置清晰的程度，范围 [0, 100]，默认为 0
ZegoEffectsClarityParam param = new ZegoEffectsClarityParam();
param.intensity = 0;
mEffects.setClarityParam(param);
```
:::
:::if{props.platform="Flutter"}
```dart
// 开启清晰功能
ZegoEffectsPlugin.instance.enableClarity(true);

// 设置清晰的程度，范围 [0, 100]，默认为 0
ZegoEffectsClarityParam param = ZegoEffectsClarityParam();
param.intensity = 100;
ZegoEffectsPlugin.instance.setClarityParam(param);
```
:::
:::if{props.platform="RN"}
```js
// 开启清晰功能
mEffects.enableClarity(true);

// 设置清晰的程度，范围 [0, 100]，默认为 0
mEffects.setClarityParam({ intensity: 100 });
```
:::

### 调整肤色效果

<Warning title="注意">
调整肤色效果，请先导入“SkinColorResources” 对应的皮肤资源文件并加载，否则功能无法正常生效。详情请参考 [快速开始 - 导入资源和模型](/ai-effects-flutter-dart/quick-starts/import-resources-and-models)。
</Warning>

调用 {getPlatformData2(props,enableSkinColorMap)} 接口开启调整肤色功能，并调用 {getPlatformData2(props,setSkinColorResPathMap)} 加载可支持的皮肤资源，再调用 {getPlatformData2(props,setSkinColorParamMap)} 接口设置调整肤色的强度。

{getPlatformData2(props,ZegoEffectsSkinColorParamMap)} 对象的调整肤色程度参数 “intensity” 的取值范围为 [0, 100]，默认为 “0”。取值越大，皮肤颜色变化越明显，开发者可以根据需求自定义取值。

:::if{props.platform=undefined}
```objc
// 开启肤色功能
[self.effects enableSkinColor:YES];

// 加载可支持/指定的肤色资源
NSString *skinResPath = @"SkinColorResources/***";
[self.effects setSkinColorResPath:skinResPath];

// 设置肤色的程度，范围 [0, 100]，默认为 0
ZegoEffectsSkinColorParam *param = [[ZegoEffectsSkinColorParam  alloc] init];
param.intensity = 0;
[self.effects setSkinColorParam:param];
```
:::
:::if{props.platform="Android"}
```java
// 开启肤色功能
mEffects.enableSkinColor(true);

// 加载可支持/指定的肤色资源
String skinResPath = "SkinColorResources/***";
mEffects.setSkinColorResPath(skinResPath);

// 设置肤色的程度，范围 [0, 100]，默认为 0
ZegoEffectsSkinColorParam param = new ZegoEffectsSkinColorParam();
param.intensity = 0;
mEffects.setSkinColorParam(param);
```
:::
:::if{props.platform="Flutter"}
```dart
// 开启肤色功能
ZegoEffectsPlugin.instance.enableSkinColor(true);

// 设置指定肤色名字
ZegoEffectsPlugin.instance.setSkinColor('fenbai');

// 设置肤色的程度，范围 [0, 100]，默认为 0
ZegoEffectsSkinColorParam param = ZegoEffectsSkinColorParam();
param.intensity = 100;
ZegoEffectsPlugin.instance.setSkinColorParam(param);
```
:::
:::if{props.platform="RN"}
```js
// 开启肤色功能
mEffects.enableSkinColor(true);

// 加载可支持/指定的肤色资源
String skinResPath = "SkinColorResources/***";
mEffects.setSkinColorResPath(skinResPath);

// 设置肤色的程度，范围 [0, 100]，默认为 0;
mEffects.setSkinColorParam({ intensity: 100 });
```
:::

## 相关文档

[开启美白后画面整体变黑或者偏蓝，该如何处理？](https://doc-zh.zego.im/faq/AI_Black_Blue)

<Content platform="Flutter"/>
