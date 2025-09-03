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

export const setPortraitSegmentationBackgroundPathMap = {
    'RN': <a href="@setPortraitSegmentationBackgroundPath" target='_blank'>setPortraitSegmentationBackgroundPath</a>,
    'Flutter': <a href="https://doc-zh.zego.im/unique-api/ai-effects-sdk/zh/dart_flutter/zego_effects_plugin/ZegoEffectsPlugin/setPortraitSegmentationBackgroundPath.html" target='_blank'>setPortraitSegmentationBackgroundPath</a>,
}

export const enablePortraitSegmentationMap = {
    'default': <a href="@enablePortraitSegmentation" target='_blank'>enablePortraitSegmentation</a>,
    'Flutter': <a href="https://doc-zh.zego.im/unique-api/ai-effects-sdk/zh/dart_flutter/zego_effects_plugin/ZegoEffectsPlugin/enablePortraitSegmentation.html" target='_blank'>enablePortraitSegmentation</a>,
    'Windows': <a href="@zego_effects_enable_portrait_segmentation" target='_blank'>zego_effects_enable_portrait_segmentation</a>,
}

export const enablePortraitSegmentationBackgroundBlurMap = {
    'default': <a href="@enablePortraitSegmentationBackgroundBlur" target='_blank'>enablePortraitSegmentationBackgroundBlur</a>,
    'Flutter': <a href="https://doc-zh.zego.im/unique-api/ai-effects-sdk/zh/dart_flutter/zego_effects_plugin/ZegoEffectsPlugin/enablePortraitSegmentationBackgroundBlur.html" target='_blank'>enablePortraitSegmentationBackgroundBlur</a>,
    'Windows': <a href="@zego_effects_enable_portrait_segmentation_background_blur" target='_blank'>zego_effects_enable_portrait_segmentation_background_blur</a>,
}

export const setPortraitSegmentationBackgroundBlurParamMap = {
    'default': <a href="@setPortraitSegmentationBackgroundBlurParam" target='_blank'>setPortraitSegmentationBackgroundBlurParam</a>,
    'Flutter': <a href="https://doc-zh.zego.im/unique-api/ai-effects-sdk/zh/dart_flutter/zego_effects_plugin/ZegoEffectsPlugin/setPortraitSegmentationBackgroundBlurParam.html" target='_blank'>setPortraitSegmentationBackgroundBlurParam</a>,
    'Windows': <a href="@zego_effects_set_portrait_segmentation_background_blur_param" target='_blank'>zego_effects_set_portrait_segmentation_background_blur_param</a>,
}

export const ZegoEffectsBlurParamMap = {
    'default': <a href="@-ZegoEffectsBlurParam" target='_blank'>ZegoEffectsBlurParam</a>,
    'Flutter': <a href="https://doc-zh.zego.im/unique-api/ai-effects-sdk/zh/dart_flutter/zego_effects_defines/ZegoEffectsBlurParam-class.html" target='_blank'>ZegoEffectsBlurParam</a>,
    'Windows': <a href="@zego_effects_blur_param" target='_blank'>zego_effects_blur_param</a>,
}

export const enablePortraitSegmentationBackgroundMosaicMap = {
    'default': <a href="@enablePortraitSegmentationBackgroundMosaic" target='_blank'>enablePortraitSegmentationBackgroundMosaic</a>,
    'Flutter': <a href="https://doc-zh.zego.im/unique-api/ai-effects-sdk/zh/dart_flutter/zego_effects_plugin/ZegoEffectsPlugin/enablePortraitSegmentationBackgroundMosaic.html" target='_blank'>enablePortraitSegmentationBackgroundMosaic</a>,
    'Windows': <a href="@zego_effects_enable_portrait_segmentation_background_mosaic" target='_blank'>zego_effects_enable_portrait_segmentation_background_mosaic</a>,
}

export const setPortraitSegmentationBackgroundMosaicParamMap = {
    'default': <a href="@setPortraitSegmentationBackgroundMosaicParam" target='_blank'>setPortraitSegmentationBackgroundMosaicParam</a>,
    'Flutter': <a href="https://doc-zh.zego.im/unique-api/ai-effects-sdk/zh/dart_flutter/zego_effects_plugin/ZegoEffectsPlugin/setPortraitSegmentationBackgroundMosaicParam.html" target='_blank'>setPortraitSegmentationBackgroundMosaicParam</a>,
    'Windows': <a href="@zego_effects_set_portrait_segmentation_background_mosaic_param" target='_blank'>zego_effects_set_portrait_segmentation_background_mosaic_param</a>,
}

export const ZegoEffectsMosaicParamMap = {
    'default': <a href="@-ZegoEffectsMosaicParam" target='_blank'>ZegoEffectsMosaicParam</a>,
    'Flutter': <a href="https://doc-zh.zego.im/unique-api/ai-effects-sdk/zh/dart_flutter/zego_effects_defines/ZegoEffectsMosaicParam-class.html" target='_blank'>ZegoEffectsMosaicParam</a>,
    'Windows': <a href="@zego_effects_mosaic_param" target='_blank'>zego_effects_mosaic_param</a>,
}

export const setChromaKeyBackgroundPathMap = {
    'RN': <a href="@setChromaKeyBackgroundPath" target='_blank'>setChromaKeyBackgroundPath</a>,
    'Flutter': <a href="https://doc-zh.zego.im/unique-api/ai-effects-sdk/zh/dart_flutter/zego_effects_plugin/ZegoEffectsPlugin/setChromaKeyBackgroundPath.html" target='_blank'>setChromaKeyBackgroundPath</a>,
}

export const enableChromaKeyMap = {
    'default': <a href="@enableChromaKey" target='_blank'>enableChromaKey</a>,
    'Flutter': <a href="https://doc-zh.zego.im/unique-api/ai-effects-sdk/zh/dart_flutter/zego_effects_plugin/ZegoEffectsPlugin/enableChromaKey.html" target='_blank'>enableChromaKey</a>,
    'Windows': <a href="@zego_effects_enable_chroma_key" target='_blank'>zego_effects_enable_chroma_key</a>,
}

export const setChromaKeyParamMap = {
    'default': <a href="@setChromaKeyParam" target='_blank'>setChromaKeyParam</a>,
    'Flutter': <a href="https://doc-zh.zego.im/unique-api/ai-effects-sdk/zh/dart_flutter/zego_effects_plugin/ZegoEffectsPlugin/setChromaKeyParam.html" target='_blank'>setChromaKeyParam</a>,
    'Windows': <a href="@zego_effects_set_chroma_key_param" target='_blank'>zego_effects_set_chroma_key_param</a>,
}

export const enableChromaKeyBackgroundBlurMap = {
    'default': <a href="@enableChromaKeyBackgroundBlur" target='_blank'>enableChromaKeyBackgroundBlur</a>,
    'Flutter': <a href="https://doc-zh.zego.im/unique-api/ai-effects-sdk/zh/dart_flutter/zego_effects_plugin/ZegoEffectsPlugin/enableChromaKeyBackgroundBlur.html" target='_blank'>enableChromaKeyBackgroundBlur</a>,
    'Windows': <a href="@zego_effects_enable_chroma_key_background_blur" target='_blank'>zego_effects_enable_chroma_key_background_blur</a>,
}

export const setChromaKeyBackgroundBlurParamMap = {
    'default': <a href="@setChromaKeyBackgroundBlurParam" target='_blank'>setChromaKeyBackgroundBlurParam</a>,
    'Flutter': <a href="https://doc-zh.zego.im/unique-api/ai-effects-sdk/zh/dart_flutter/zego_effects_plugin/ZegoEffectsPlugin/setChromaKeyBackgroundBlurParam.html" target='_blank'>setChromaKeyBackgroundBlurParam</a>,
    'Windows': <a href="@zego_effects_set_chroma_key_background_blur_param" target='_blank'>zego_effects_set_chroma_key_background_blur_param</a>,
}

export const enableChromaKeyBackgroundMosaicMap = {
    'default': <a href="@enableChromaKeyBackgroundMosaic" target='_blank'>enableChromaKeyBackgroundMosaic</a>,
    'Flutter': <a href="https://doc-zh.zego.im/unique-api/ai-effects-sdk/zh/dart_flutter/zego_effects_plugin/ZegoEffectsPlugin/enableChromaKeyBackgroundMosaic.html" target='_blank'>enableChromaKeyBackgroundMosaic</a>,
    'Windows': <a href="@zego_effects_enable_chroma_key_background_mosaic" target='_blank'>zego_effects_enable_chroma_key_background_mosaic</a>,
}

export const setChromaKeyBackgroundMosaicParamMap = {
    'default': <a href="@setChromaKeyBackgroundMosaicParam" target='_blank'>setChromaKeyBackgroundMosaicParam</a>,
    'Flutter': <a href="https://doc-zh.zego.im/unique-api/ai-effects-sdk/zh/dart_flutter/zego_effects_plugin/ZegoEffectsPlugin/setChromaKeyBackgroundMosaicParam.html" target='_blank'>setChromaKeyBackgroundMosaicParam</a>,
    'Windows': <a href="@zego_effects_set_chroma_key_background_mosaic_param" target='_blank'>zego_effects_set_chroma_key_background_mosaic_param</a>,
}

# 背景分割

- - -

## 功能简介

ZegoEffects SDK 提供背景分割功能，适用于在线教育、视频会议、美发、短视频等多种场景。

## 前提条件

在使用 ZegoEffects SDK 背景分割功能前，请确保：

- 已在项目中集成 ZegoEffects SDK，实现基本的图像处理功能，详情请参考 [快速开始 - 实现图像处理](/ai-effects-react-native-javascript/quick-starts/implement-basic-image-processing)。
- 导入 “SegmentationModel” 模型路径，详情请参考 [快速开始 - 导入资源和模型](/ai-effects-react-native-javascript/quick-starts/import-resources-and-models)。

## 使用步骤

背景分割包括人像分割、绿幕分割，以及背景虚化、背景马赛克等功能。

### 人像分割

<Warning title="注意">
使用人像分割功能前，请先导入对应的 “SegmentationModel” 模型文件，否则功能无法生效。详情请参考 [快速开始 - 导入资源和模型](/ai-effects-react-native-javascript/quick-starts/import-resources-and-models)。
</Warning>

:::if{props.platform=undefined}
<div>
1. 调用 [setPortraitSegmentationBackgroundPath](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~javascript_react-native~class~ZegoEffects#set-portrait-segmentation-background-path) 或 [setPortraitSegmentationBackgroundBuffer](https://doc-zh.zego.im/) 接口，设置人像分割使用的背景路径或背景 Buffer（二选一）。

```objc
// 设置人像分割使用的背景路径（和设置 Buffer 的方式二选一即可）
[self.effects setPortraitSegmentationBackgroundPath: @"MY_BACKGROUND_PATH" mode:ZegoEffectsScaleModeAspectFill];

// 设置人像分割使用的背景 Buffer（和设置路径的方式二选一即可）
[self.effects setPortraitSegmentationBackgroundBuffer:pixelbuffer mode:ZegoEffectsScaleModeAspectFill];
```
</div>
:::
:::if{props.platform="Android"}
<div>
1. 调用 [setPortraitSegmentationBackgroundPath](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~javascript_react-native~class~ZegoEffects#set-portrait-segmentation-background-path)、[setPortraitSegmentationBackgroundBuffer](https://doc-zh.zego.im/) 或 [setPortraitSegmentationBackgroundTexture](https://doc-zh.zego.im/) 接口，设置人像分割使用的背景路径、背景 Buffer 或背景 Texture（三选一）。
</div>

```java
// 设置人像分割使用的背景路径（和设置 Buffer、Texture 的方式三选一即可）
mEffects.setPortraitSegmentationBackgroundPath("MY_BACKGROUND_PATH", ZegoEffectsScaleMode.ASPECT_FILL);

// 设置人像分割使用的背景 Buffer（和设置路径、Texture 的方式三选一即可）
mEffects.setPortraitSegmentationBackgroundBuffer(buffer, bufferLength, param, ZegoEffectsScaleMode.ASPECT_FILL);

// 设置人像分割使用的背景 Texture（和设置路径、Buffer 的方式三选一即可）
mEffects.setPortraitSegmentationBackgroundTexture(textureID, param, ZegoEffectsScaleMode.ASPECT_FILL);
```
:::
:::if{props.platform="Windows"}
<div>
1. 调用 [zego_effects_set_portrait_segmentation_background_path](https://doc-zh.zego.im/)、[zego_effects_set_portrait_segmentation_background_buffer](https://doc-zh.zego.im/) 或 [zego_effects_set_portrait_segmentation_background_texture](https://doc-zh.zego.im/) 接口，设置人像分割使用的背景路径、背景 Buffer 或背景 Texture（三选一）。
</div>

```c
// 设置人像分割使用的背景路径（和设置 Buffer、Texture 的方式三选一即可）
zego_effects_set_portrait_segmentation_background_path(handle, "MY_BACKGROUND_PATH", zego_effects_scale_mode_aspect_fill);

// 设置人像分割使用的背景 Buffer（和设置路径、Texture 的方式三选一即可）
zego_effects_set_portrait_segmentation_background_buffer(handle, buffer, buffer_length, param, zego_effects_scale_mode_aspect_fill);

// 设置人像分割使用的背景 Texture（和设置路径、Buffer 的方式三选一即可）
zego_effects_set_portrait_segmentation_background_texture(handle, texture_id, param, zego_effects_scale_mode_aspect_fill);
```
:::
:::if{props.platform="Flutter|RN"}
<div>
调用 {getPlatformData2(props,setPortraitSegmentationBackgroundPathMap)} 接口，设置人像分割使用的背景路径。
</div>
:::
:::if{props.platform="Flutter"}
```dart
// 设置人像分割使用的背景路径
ZegoEffectsPlugin.instance.setPortraitSegmentationBackgroundPath('MY_BACKGROUND_PATH', ZegoEffectsScaleMode.AspectFill);
```
:::
:::if{props.platform="RN"}
```js
// 设置人像分割使用的背景路径
mEffects.setPortraitSegmentationBackgroundPath("MY_BACKGROUND_PATH", ZegoEffectsScaleMode.ASPECT_FILL);
```
:::

2. 调用 {getPlatformData2(props,enablePortraitSegmentationMap)} 接口开启人像分割功能。

:::if{props.platform=undefined}
```objc
// 开启人像分割功能
[self.effects enablePortraitSegmentation:YES];
```
:::
:::if{props.platform="Android"}
```java
// 开启人像分割功能
mEffects.enablePortraitSegmentation(true);
```
:::
:::if{props.platform="Windows"}
```c
// 开启人像分割功能
zego_effects_enable_portrait_segmentation(handle, true);
```
:::
:::if{props.platform="Flutter"}
```dart
// 开启人像分割功能
ZegoEffectsPlugin.instance.enablePortraitSegmentation(true);
```
:::
:::if{props.platform="RN"}
```js
// 开启人像分割功能
mEffects.enablePortraitSegmentation(true);
```
:::

开启人像分割功能后，开发者可以根据需要进一步设置背景虚化、背景马赛克等功能。

#### 人像分割背景虚化

调用 {getPlatformData2(props,enablePortraitSegmentationBackgroundBlurMap)} 接口开启人像分割背景虚化功能，打开虚化功能后可调用 {getPlatformData2(props,setPortraitSegmentationBackgroundBlurParamMap)} 接口设置 {getPlatformData2(props,ZegoEffectsBlurParamMap)} 对象的 “intensity” 参数，调整背景虚化的程度。

<Warning title="注意">
开启人像分割背景虚化功能后，会覆盖自定义背景及背景马赛克功能。
</Warning>
   
:::if{props.platform=undefined}
```objc
// 开启人像分割背景虚化
[self.effects enablePortraitSegmentationBackgroundBlur:YES];

// 设置人像分割背景虚化参数
ZegoEffectsBlurParam *param = [[ZegoEffectsBlurParam alloc] init];
param.intensity = 100;
[self.effects setPortraitSegmentationBackgroundBlurParam:param];
```
:::
:::if{props.platform="Android"}
```java
// 开启人像分割背景虚化
mEffects.enablePortraitSegmentationBackgroundBlur(true);

// 设置人像分割背景虚化参数
ZegoEffectsBlurParam param = new ZegoEffectsBlurParam();
param.intensity = 100;
mEffects.setPortraitSegmentationBackgroundBlurParam(param);
```
:::
:::if{props.platform="Windows"}   
```c
// 开启人像分割背景虚化
zego_effects_enable_portrait_segmentation_background_blur(handle, true);

// 设置人像分割背景虚化参数
zego_effects_blur_param param{};
param.intensity = 100;
zego_effects_set_portrait_segmentation_background_blur_param(handle, &param);
```
:::
:::if{props.platform="Flutter"}
```dart
// 开启人像分割背景虚化
ZegoEffectsPlugin.instance.enablePortraitSegmentationBackgroundBlur(true);

// 设置人像分割背景虚化参数
ZegoEffectsBlurParam param = ZegoEffectsBlurParam();
param.intensity = 100;
ZegoEffectsPlugin.instance.setPortraitSegmentationBackgroundBlurParam(param);
```
:::
:::if{props.platform="RN"}
```js
// 开启人像分割背景虚化
mEffects.enablePortraitSegmentationBackgroundBlur(true);

// 设置人像分割背景虚化参数
mEffects.setPortraitSegmentationBackgroundBlurParam({ intensity: 100 });
```
:::

#### 人像分割背景马赛克

调用 {getPlatformData2(props,enablePortraitSegmentationBackgroundMosaicMap)} 接口开启人像分割背景马赛克功能，打开马赛克功能后可调用 {getPlatformData2(props,setPortraitSegmentationBackgroundMosaicParamMap)} 接口设置 {getPlatformData2(props,ZegoEffectsMosaicParamMap)} 对象的 “intensity” 参数参数，调整马赛克的程度。

<Warning title="注意">
开启人像分割背景马赛克功能后，会覆盖自定义背景及背景虚化功能。
</Warning>  

:::if{props.platform=undefined}
```objc
// 开启人像分割背景马赛克
[self.effects enablePortraitSegmentationBackgroundMosaic:YES];
  
// 设置人像分割背景马赛克参数
ZegoEffectsMosaicParam *param = [[ZegoEffectsMosaicParam alloc] init];
param.intensity = 100;
[self.effects setPortraitSegmentationBackgroundMosaicParam:param];
```
:::
:::if{props.platform="Android"}
```java
// 开启人像分割背景马赛克
mEffects.enablePortraitSegmentationBackgroundMosaic(true);

// 设置人像分割背景马赛克参数
ZegoEffectsMosaicParam param = new ZegoEffectsMosaicParam();
param.intensity = 100;
mEffects.setPortraitSegmentationBackgroundMosaicParam(param);
```
:::
:::if{props.platform="Windows"}
```c
// 开启人像分割背景马赛克
 zego_effects_enable_portrait_segmentation_background_mosaic(handle, true);

// 设置人像分割背景马赛克参数
zego_effects_mosaic_param param{};
param.intensity = 100;
param.type = zego_effects_mosaic_type::zego_effects_mosaic_type_square;
zego_effects_set_portrait_segmentation_background_mosaic_param(handle, &param);
```
:::
:::if{props.platform="Flutter"}
```dart
// 开启人像分割背景马赛克
ZegoEffectsPlugin.instance.enablePortraitSegmentationBackgroundMosaic(true);

// 设置人像分割背景马赛克参数
ZegoEffectsMosaicParam param = ZegoEffectsMosaicParam();
param.intesity = 100;
ZegoEffectsPlugin.instance.setPortraitSegmentationBackgroundMosaicParam(param);
```
:::
:::if{props.platform="RN"}
```js
// 开启人像分割背景马赛克
mEffects.enablePortraitSegmentationBackgroundMosaic(true);

// 设置人像分割背景马赛克参数
mEffects.setPortraitSegmentationBackgroundMosaicParam({ intensity: 100 });
```
:::


### 绿幕分割

:::if{props.platform=undefined}
<div>
1. 调用 [setChromaKeyBackgroundPath](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~javascript_react-native~class~ZegoEffects#set-chroma-key-background-path) 或 [setChromaKeyBackgroundBuffer](https://doc-zh.zego.im/) 接口，设置绿幕分割使用的背景路径或背景 Buffer（二选一）。

```objc
// 设置绿幕分割使用的背景路径（和设置 Buffer 的方式二选一即可）
[self.effects setChromaKeyBackgroundPath: @"MY_BACKGROUND_PATH" mode:ZegoEffectsScaleModeAspectFill];

// 设置绿幕分割使用的背景 Buffer（和设置路径的方式二选一即可）
[self.effects setChromaKeyBackgroundBuffer:pixelbuffer mode:ZegoEffectsScaleModeAspectFill];
```
</div>
:::
:::if{props.platform="Android"}
<div>
1. 调用 [setChromaKeyBackgroundPath](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~javascript_react-native~class~ZegoEffects#set-chroma-key-background-path)、[setChromaKeyBackgroundBuffer](https://doc-zh.zego.im/) 或 [setChromaKeyBackgroundTexture](https://doc-zh.zego.im/) 接口，设置绿幕分割使用自定义背景路径、背景 Buffer 或背景 Texture（三选一）。

    ```java
    // 设置绿幕分割使用的背景路径（和设置 Buffer、Texture 的方式三选一即可）
    mEffects.setChromaKeyBackgroundPath("MY_BACKGROUND_PATH", ZegoEffectsScaleMode.ASPECT_FILL);

    // 设置人像分割使用的背景 Buffer（和设置路径、Texture 的方式三选一即可）
    mEffects.setChromaKeyBackgroundBuffer(buffer, bufferLength, param, ZegoEffectsScaleMode.ASPECT_FILL);

    // 设置人像分割使用的背景 Texture（和设置路径、Buffer 的方式三选一即可）
    mEffects.setChromaKeyBackgroundTexture(textureID, param, ZegoEffectsScaleMode.ASPECT_FILL);
    ```
</div>
:::
:::if{props.platform="Windows"}
<div>
1. 调用 [zego_effects_set_chroma_key_background_path](https://doc-zh.zego.im/)、[zego_effects_set_chroma_key_background_buffer](https://doc-zh.zego.im/) 或 [zego_effects_set_chroma_key_background_texture](https://doc-zh.zego.im/) 接口，设置绿幕分割使用的背景路径、背景 Buffer 或背景 Texture（三选一）。
</div>

```c
// 设置绿幕分割使用的背景路径（和设置 Buffer、Texture 的方式三选一即可）
zego_effects_set_chroma_key_background_path(handle, "MY_BACKGROUND_PATH", zego_effects_scale_mode_aspect_fill);

// 设置绿幕分割使用的背景 Buffer（和设置路径、Texture 的方式三选一即可）
zego_effects_set_chroma_key_background_buffer(handle, buffer, buffer_length, param, zego_effects_scale_mode_aspect_fill);

// 设置绿幕分割使用的背景 Texture（和设置路径、Buffer 的方式三选一即可）
zego_effects_set_chroma_key_background_texture(handle, texture_id, param, zego_effects_scale_mode_aspect_fill);
```
:::
:::if{props.platform="Flutter|RN"}
<div>
1. 调用 {getPlatformData2(props,setChromaKeyBackgroundPathMap)} 方法，设置绿幕分割使用自定义背景路径。
</div>
:::
:::if{props.platform="Flutter"}
```dart
// 设置绿幕分割使用的背景路径
ZegoEffectsPlugin.instance.setChromaKeyBackgroundPath("MY_BACKGROUND_PATH", ZegoEffectsScaleMode.AspectFill);
```
:::
:::if{props.platform="RN"}
```js
// 设置绿幕分割使用的背景路径
mEffects.setChromaKeyBackgroundPath("MY_BACKGROUND_PATH", ZegoEffectsScaleMode.ASPECT_FILL);
```
:::

2. 调用 {getPlatformData2(props,enableChromaKeyMap)} 接口开启绿幕分割功能，然后调用 {getPlatformData2(props,setChromaKeyParamMap)} 接口设置参数，调整颜色容差、边缘平滑指数等。

:::if{props.platform=undefined}
```objc
// 开启功能
[self.effects enableChromaKey:YES]

// 设置绿幕参数
ZegoEffectsChromaKeyParam *param = [[ZegoEffectsChromaKeyParam alloc] init];
[self.effects setChromaKeyParam:param];
```
:::
:::if{props.platform="Android"}
```java
// 开启绿幕分割功能
mEffects.enableChromaKey(true);

// 设置绿幕分割参数
ZegoEffectsChromaKeyParam param = new ZegoEffectsChromaKeyParam();
mEffects.setChromaKeyParam(param);
```
:::
:::if{props.platform="Windows"}
```c
// 开启绿幕分割功能
zego_effects_enable_chroma_key(handle, true);

// 获取绿幕参数的默认值，并设置
zego_effects_chroma_key_param param{};
zego_effects_get_default_chroma_key_param(handle, &param);
zego_effects_set_chroma_key_param(param);
```
:::
:::if{props.platform="Flutter"}
```dart
// 开启绿幕分割功能
ZegoEffectsPlugin.instance.enableChromaKey(true);

// 设置绿幕分割参数
ZegoEffectsChromaKeyParam param = ZegoEffectsChromaKeyParam();
param.smoothness = 80;
param.opacity = 100;
param.keyColor = 65280;
param.similarity = 67;
ZegoEffectsPlugin.instance.setChromaKeyParam(param);
```
:::
:::if{props.platform="RN"}
```js
// 开启绿幕分割功能
mEffects.enableChromaKey(true);

// 设置绿幕分割参数
let param = new ZegoEffectsChromaKeyParam();
param.smoothness = 80;
param.opacity = 100;
param.keyColor = 65280;
param.similarity = 67;
mEffects.setChromaKeyParam(param);
```
:::

开启绿幕分割功能后，开发者可以根据需要进一步设置背景虚化、背景马赛克等功能。

#### 绿幕分割背景虚化

调用 {getPlatformData2(props,enableChromaKeyBackgroundBlurMap)} 接口开启绿幕背景虚化功能，打开虚化功能后可调用 {getPlatformData2(props,setChromaKeyBackgroundBlurParamMap)} 接口设置 {getPlatformData2(props,ZegoEffectsBlurParamMap)} 对下的 “intensity” 参数，调整虚化的程度。

<Warning title="注意">
开启绿幕分割背景虚化功能后，会覆盖自定义背景及背景马赛克功能。
</Warning>

:::if{props.platform=undefined}
```objc
// 开启绿幕分割背景虚化
[self.effects enableChromaKeyBackgroundBlur:YES];
    
// 设置绿幕分割背景虚化参数
ZegoEffectsBlurParam *param = [[ZegoEffectsBlurParam alloc] init];
param.intensity = 100;
[self.effects setChromaKeyBackgroundBlurParam:param];
```
:::
:::if{props.platform="Android"}
```java
// 开启绿幕分割背景虚化
mEffects.enableChromaKeyBackgroundBlur(true);

// 设置绿幕分割背景虚化参数
ZegoEffectsBlurParam param = new ZegoEffectsBlurParam();
param.intensity = 100;
mEffects.setChromaKeyBackgroundBlurParam(param);
```
:::
:::if{props.platform="Windows"}
```c
// 开启绿幕分割背景虚化
zego_effects_enable_chroma_key_background_blur(handle, true);

// 设置绿幕分割背景虚化参数
zego_effects_blur_param param{};
param.intensity = 100;
zego_effects_set_chroma_key_background_blur_param(handle, &param);
```
:::
:::if{props.platform="Flutter"}
```dart
// 开启绿幕分割背景虚化
ZegoEffectsPlugin.instance.enableChromaKeyBackgroundBlur(true);

// 设置绿幕分割背景虚化参数
ZegoEffectsBlurParam param = ZegoEffectsBlurParam();
param.intensity = 100;
ZegoEffectsPlugin.instance.setChromaKeyBackgroundBlurParam(param);
```
:::
:::if{props.platform="RN"}
```js
// 开启绿幕分割背景虚化
mEffects.enableChromaKeyBackgroundBlur(true);

// 设置绿幕分割背景虚化参数
mEffects.setChromaKeyBackgroundBlurParam({ intensity: 100 });
```
:::


#### 绿幕分割背景马赛克

调用 {getPlatformData2(props,enableChromaKeyBackgroundMosaicMap)} 接口开启绿幕背景马赛克功能，打开马赛克功能后可调用 {getPlatformData2(props,setChromaKeyBackgroundMosaicParamMap)} 接口设置 {getPlatformData2(props,ZegoEffectsMosaicParamMap)} 对象的 “intensity” 参数，调整马赛克的程度。


<Warning title="注意">
开启绿幕分割背景马赛克功能后，会覆盖自定义背景及背景虚化功能。
</Warning>

:::if{props.platform=undefined}
```objc
// 开启绿幕分割背景马赛克
[self.effects enableChromaKeyBackgroundMosaic:YES];
// 设置绿幕分割背景马赛克参数
ZegoEffectsMosaicParam *param = [[ZegoEffectsMosaicParam alloc] init];
param.intensity = 100;
[self.effects setChromaKeyBackgroundMosaicParam:param];
```
:::
:::if{props.platform="Android"}
```java
// 开启绿幕分割背景马赛克
mEffects.enableChromaKeyBackgroundMosaic(true);

// 设置绿幕分割背景马赛克参数
ZegoEffectsMosaicParam param = new ZegoEffectsMosaicParam();
param.intensity = 100;
mEffects.setChromaKeyBackgroundMosaicParam(param);
```
:::
:::if{props.platform="Windows"}
```c
// 开启绿幕分割背景马赛克
zego_effects_enable_chroma_key_background_mosaic(handle, true);

// 设置绿幕分割背景马赛克参数
zego_effects_mosaic_param param;
param.intensity = 100;
param.type = zego_effects_mosaic_type::zego_effects_mosaic_type_square;
zego_effects_set_chroma_key_background_mosaic_param(handle, &param);
```
:::
:::if{props.platform="Flutter"}
```dart
// 开启绿幕分割背景马赛克
ZegoEffectsPlugin.instance.enableChromaKeyBackgroundMosaic(true);

// 设置绿幕分割背景马赛克参数
ZegoEffectsBlurParam param = ZegoEffectsBlurParam();
param.intensity = 100;
ZegoEffectsPlugin.instance.setChromaKeyBackgroundMosaicParam(param);
```
:::
:::if{props.platform="RN"}
```js
// 开启绿幕分割背景马赛克
mEffects.enableChromaKeyBackgroundMosaic(true);

// 设置绿幕分割背景马赛克参数
mEffects.setChromaKeyBackgroundMosaicParam({ intensity: 100 });
```
:::
<Content platform="RN"/>