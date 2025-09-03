# 美颜

- - -

## 功能简介

ZegoEffects SDK 提供美颜功能，为用户呈现出良好的肌肤状态，打造出独特自然的美颜效果。

开发者可以根据需要调整美白、磨皮、锐化等的程度，实现美颜功能。

## 前提条件

在使用 ZegoEffects SDK 美颜功能前，请确保：

- 已在项目中集成 ZegoEffects SDK，实现基本的图像处理功能，详情请参考 [快速开始 - 集成 SDK](/ai-effects-windows-c/quick-starts/import-the-sdk)。
- 已上传待处理图像的宽、高。
- 导入基础通用资源 “CommonResources” 文件，详情请参考 [快速开始 - 导入资源和模型](/ai-effects-windows-c/quick-starts/import-resources-and-models)。

## 使用步骤

美颜包括美白、磨皮、锐化、红润等功能。

开启美颜功能之后，开发者可根据实际的需求来自定义美颜参数。如果未自定义，SDK 将采用默认参数值实现美颜功能。

### 美白

<Warning title="注意">
使用美白功能前，请先导入对应的 “FaceWhiteningResources” 资源文件，否则功能无法生效。详情请参考 [快速开始 - 导入资源和模型](/ai-effects-windows-c/quick-starts/import-resources-and-models)。
</Warning>

调用 [zego_effects_enable_whiten](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~c_windows~class~ZegoEffects#zego_effects_enable_whiten) 接口开启美白功能，并调用 [zego_effects_set_whiten_param](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~c_windows~class~ZegoEffects#zego_effects_set_whiten_param) 接口设置美白的程度。  

[zego_effects_whiten_param](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~c_windows~class~zego_effects_whiten_param) 对象的美白程度参数 “intensity” 的取值范围为 [0, 100]，默认为 “50”。取值越大，美白程度越大，开发者可以根据需求自定义取值。

```c
//  开启美白功能
zego_effects_enable_whiten(handle, true);

// 设置美白的程度，范围 [0, 100]，默认为 50
zego_effects_whiten_param param;
param.intensity = 100;
zego_effects_set_whiten_param(handle, &param);
```

### 磨皮

调用 [zego_effects_enable_smooth](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~c_windows~class~ZegoEffects#zego_effects_enable_smooth) 接口开启磨皮功能，并调用 [zego_effects_set_smooth_param](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~c_windows~class~ZegoEffects#zego_effects_set_smooth_param) 接口设置磨皮的程度。

[zego_effects_smooth_param](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~c_windows~class~zego_effects_smooth_param) 对象的磨皮程度参数 “intensity” 的取值范围为 [0, 100]，默认为 “50”。取值越大，磨皮程度越大，开发者可以根据需求自定义取值。

```c
// 开启磨皮功能
zego_effects_enable_smooth(handle, true);

// 设置磨皮的程度，范围 [0, 100]，默认为 50
zego_effects_smooth_param param;
param.intensity = 100;
zego_effects_set_smooth_param(handle, &param);
```


### 红润

<Warning title="注意">
使用红润功能前，请先导入对应的 “RosyResources” 资源文件，否则功能无法生效。详情请参考 [快速开始 - 导入资源和模型](/ai-effects-windows-c/quick-starts/import-resources-and-models)。
</Warning>


调用 [zego_effects_enable_rosy](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~c_windows~class~ZegoEffects#zego_effects_enable_rosy) 接口红润功能，并调用 [zego_effects_set_rosy_param](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~c_windows~class~ZegoEffects#zego_effects_set_rosy_param) 接口设置红润的程度。  

[zego_effects_rosy_param](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~c_windows~class~zego_effects_rosy_param) 对象的红润程度参数 “intensity” 的取值范围为 [0, 100]，默认为 “50”。取值越大，红润程度越大，开发者可以根据需求自定义取值。


```c
// 开启红润功能
zego_effects_enable_rosy(handle, true);

// 设置红润的程度，范围 [0, 100]，默认为 50
zego_effects_rosy_param param;
param.intensity = 100;
zego_effects_set_rosy_param(handle, &param);
```


### 锐化


调用 [zego_effects_enable_sharpen](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~c_windows~class~ZegoEffects#zego_effects_enable_sharpen) 接口开启锐化功能，并调用 [zego_effects_set_sharpen_param](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~c_windows~class~ZegoEffects#zego_effects_set_sharpen_param) 接口设置锐化的程度。

[zego_effects_sharpen_param](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~c_windows~class~zego_effects_sharpen_param) 对象的锐化程度参数 “intensity” 的取值范围为 [0, 100]，默认为 “50”。取值越大，锐化程度越大，开发者可以根据需求自定义取值。

```c
// 开启锐化功能
zego_effects_enable_sharpen(handle, true);

// 设置锐化的程度，范围 [0, 100]，默认为 50
zego_effects_sharpen_param param;
param.intensity = 100;
zego_effects_set_sharpen_param(handle, param);
```

### 去除法令纹


调用 [zego_effects_enable_wrinkles_removing](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~c_windows~class~ZegoEffects#zego_effects_enable_wrinkles_removing) 接口开启法令纹去除功能，并调用 [zego_effects_set_wrinkles_removing_param](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~c_windows~class~ZegoEffects#zego_effects_set_sharpen_param) 接口设置法令纹去除的程度。

[zego_effects_wrinkles_removing_param](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~c_windows~class~zego_effects_wrinkles_removing_param) 对象的法令纹去除程度参数 “intensity” 的取值范围为 [0, 100]，默认为 “50”。取值越大，法令纹去除程度越大，开发者可以根据需求自定义取值。

```c
// 开启法令纹去除功能
zego_effects_enable_wrinkles_removing(handle, true);

// 设置法令纹去除的程度，范围 [0, 100]，默认为 50
zego_effects_wrinkles_removing_param param;
param.intensity = 100;
zego_effects_set_wrinkles_removing_param(handle, param);
```

### 去除黑眼圈


调用 [zego_effects_enable_darkcircles_removing](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~c_windows~class~ZegoEffects#zego_effects_enable_darkcircles_removing) 接口开启黑眼圈去除功能，并调用 [zego_effects_set_darkcircles_removing_param](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~c_windows~class~ZegoEffects#zego_effects_set_darkcircles_removing_param) 接口设置黑眼圈去除的程度。

[zego_effects_darkcircles_removing_param](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~c_windows~class~zego_effects_darkcircles_removing_param) 对象的黑眼圈去除程度参数 “intensity” 的取值范围为 [0, 100]，默认为 “50”。取值越大，黑眼圈去除程度越大，开发者可以根据需求自定义取值。

```c
// 开启黑眼圈去除功能
zego_effects_enable_darkcircles_removing(handle, true);

// 设置黑眼圈去除的程度，范围 [0, 100]，默认为 50
zego_effects_darkcircles_removing_paramparam;
param.intensity = 100;
zego_effects_darkcircles_removing_param(handle, param);
```
