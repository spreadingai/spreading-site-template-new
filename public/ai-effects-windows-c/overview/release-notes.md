# 发布日志

- - -


## 1.4.11 版本

**发布日期：2024-04-24**


**改进优化**

| 优化项  | 优化描述 | 相关接口 |
| -----  | ----- | ----- |
| 优化人脸检测性能 | 通过优化人脸模型，提高人脸检测速度，使美颜效果更快响应。|- |


---


## 1.4.10 版本

**发布日期：2023-12-29**

**问题修复**

1. 修复背景填充模式需要设置两次才能生效的问题。
2. 修复 [zego_effects_scale_mode > ZegoEffectsScaleModeScaleToFill](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~c_windows~enum~zego_effects_scale_mode#zego_effects_scale_mode_scale_to_fill) 设置后效果异常的问题。

---


## 1.4.9 版本

**发布日期：2022-06-20**

**新增功能**

| 功能项  |         功能描述 |         相关文档 |
|-------|-------|-------|
| 支持中文路径。| 支持传入的资源包路径中，包含中文字符。 | - |

**改进优化**

| 优化项  | 优化描述 | 相关接口 |
| -----  | ----- | ----- |
| 优化背景分割功能 | 背景分割时，与人脸检测进行绑定。没有检测到人脸时，会隐藏背景分割结果，直接显示背景图片。|  <ul><li>[zego_effects_set_portrait_segmentation_background_path](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~c_windows~class~ZegoEffects#zego_effects_set_portrait_segmentation_background_path)</li><li>[zego_effects_set_portrait_segmentation_background_buffer](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~c_windows~class~ZegoEffects#zego_effects_set_portrait_segmentation_background_buffer)</li></ul>  |
| 优化人脸检测模型 | 更新了人脸检测的模型，提升检测时的准确度。 |  -  |


**问题修复**

修复已知问题。

---


## 1.4.7 版本

**发布日期：2022-01-07**

**新增功能**

| 功能项  |         功能描述 |         相关文档 |
|-------|-------|-------|
| 新增服务端鉴权接口 | 新增服务端的公共网关接口，用于支持开发者通过自己的服务端，访问获取 ZegoEffects 服务端，自行设置鉴权能力，管理鉴权文件，灵活性较高。| [在线鉴权](/ai-effects-windows-c/quick-starts/online-authentication) |

**改进优化**

| 优化项  | 优化描述 | 相关接口 |
| -----  | ----- | ----- |
| 优化体验 App | <ol><li>更新挂件资源，支持通过编辑器输出结果。</li><li>更新美妆资源。</li><li>更新资源配置目录。</li><li>支持美型功能的参数化更新。</li><li>支持美颜功能的全屏磨皮效果。</li><li>支持同屏中出现 2 人，都可以使用美颜、美妆、挂件等功能。</li></ol>  | [下载体验 App](/ai-effects-windows-c/demo-app) |


**问题修复**

修复了体验 App 的一些已知问题。

---


## 1.4.6 版本

**发布日期：2021-12-20**

**改进优化**

| 优化项  | 优化描述 | 相关接口 |
| -----  | ----- | ----- |
| 优化 AI 模型 | 更新 AI 模型，提升人脸识别能力。  | - |
| 优化磨皮效果 | 优化美颜功能中的磨皮效果。 | [zego_effects_set_smooth_param](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~c_windows~class~ZegoEffects#zego_effects_set_smooth_param) |

---

## 1.4.5 版本
**发布日期：2021-11-29**

**改进优化**

| 优化项  | 优化描述 | 相关接口 |
| -----  | ---- | ----- |
| 优化人像分割功能 |  优化 AI 模型，人像边缘更加贴合，显著减少边缘抖动的现象发生。 | [zego_effects_set_resources](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~c_windows~class~ZegoEffects#zego_effects_set_resources) |

---


## 1.4.0 版本

**发布日期：2021-11-10**

**新增功能**

| 功能项  |         功能描述 |         相关接口 |
|-------|-------|-------|
| 新增美妆功能 |<p>新增美妆功能，提供如下功能点：</p><ul><li>眼线</li><li>眼睫毛</li><li>眼影</li><li>腮红</li><li>口红</li><li>美瞳</li><li>风格妆</li></ul>| <ul><li>[zego_effects_set_eyeliner](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~c_windows~class~ZegoEffects#zego_effects_set_eyeliner)、[zego_effects_set_eyeliner_param](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~c_windows~class~ZegoEffects#zego_effects_set_eyeliner_param)</li><li>[zego_effects_set_eyelashes](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~c_windows~class~ZegoEffects#zego_effects_set_eyelashes)、[zego_effects_set_eyelashes_param](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~c_windows~class~ZegoEffects#zego_effects_set_eyelashes_param)</li><li>[zego_effects_set_eyeshadow](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~c_windows~class~ZegoEffects#zego_effects_set_eyeshadow)、[zego_effects_set_eyeshadow_param](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~c_windows~class~ZegoEffects#zego_effects_set_eyeshadow_param)</li><li>[zego_effects_set_blusher](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~c_windows~class~ZegoEffects#zego_effects_set_blusher)、[zego_effects_set_blusher_param](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~c_windows~class~ZegoEffects#zego_effects_set_blusher_param)</li><li>[zego_effects_set_lipstick](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~c_windows~class~ZegoEffects#zego_effects_set_lipstick)、[zego_effects_set_lipstick_param](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~c_windows~class~ZegoEffects#zego_effects_set_lipstick_param)</li><li>[zego_effects_set_coloredcontacts](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~c_windows~class~ZegoEffects#zego_effects_set_coloredcontacts)、[zego_effects_set_coloredcontacts_param](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~c_windows~class~ZegoEffects#zego_effects_set_coloredcontacts_param)</li><li>[zego_effects_set_makeup](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~c_windows~class~ZegoEffects#zego_effects_set_makeup)、[zego_effects_set_makeup_param](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~c_windows~class~ZegoEffects#zego_effects_set_makeup_param)</li></ul>|


**接口变更**

- **新增接口**

| 新增接口 | 接口描述 | 
|---------|---------|
| [zego_effects_set_eyeliner](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~c_windows~class~ZegoEffects#zego_effects_set_eyeliner) | 开启眼线功能。 | 
| [zego_effects_set_eyeliner_param](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~c_windows~class~ZegoEffects#zego_effects_set_eyeliner_param) | 设置眼线的参数。 | 
| [zego_effects_set_eyelashes](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~c_windows~class~ZegoEffects#zego_effects_set_eyelashes) | 开启眼睫毛功能。 | 
| [zego_effects_set_eyelashes_param](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~c_windows~class~ZegoEffects#zego_effects_set_eyelashes_param) | 设置眼睫毛的参数。 |
| [zego_effects_set_eyeshadow](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~c_windows~class~ZegoEffects#zego_effects_set_eyeshadow) | 开启眼影功能。 | 
| [zego_effects_set_eyeshadow_param](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~c_windows~class~ZegoEffects#zego_effects_set_eyeshadow_param) | 设置眼影的参数。 |
| [zego_effects_set_blusher](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~c_windows~class~ZegoEffects#zego_effects_set_blusher) | 开启腮红功能。 | 
| [zego_effects_set_blusher_param](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~c_windows~class~ZegoEffects#zego_effects_set_blusher_param) | 设置腮红的参数。 |
| [zego_effects_set_lipstick](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~c_windows~class~ZegoEffects#zego_effects_set_lipstick) | 开启口红功能。 | 
| [zego_effects_set_lipstick_param](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~c_windows~class~ZegoEffects#zego_effects_set_lipstick_param) | 设置口红的参数。 |
| [zego_effects_set_coloredcontacts](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~c_windows~class~ZegoEffects#zego_effects_set_coloredcontacts) | 开启美瞳功能。 | 
| [zego_effects_set_coloredcontacts_param](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~c_windows~class~ZegoEffects#zego_effects_set_coloredcontacts_param) | 设置美瞳的参数。 |
| [zego_effects_set_makeup](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~c_windows~class~ZegoEffects#zego_effects_set_makeup) | 开启风格妆功能。 | 
| [zego_effects_set_makeup_param](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~c_windows~class~ZegoEffects#zego_effects_set_makeup_param) | 设置风格妆的参数。|

---

## 1.3.0 版本

**发布日期：2021-10-09**

**新增功能**

| 功能项  |         功能描述 |         相关接口 |
|-------|-------|-------|
| 新增一些美颜功能 | <p>新增如下功能点：</p><ul><li>去除法令纹</li><li>去除黑眼圈</li></ul> | <ul><li>[zego_effects_enable_wrinkles_removing](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~c_windows~class~ZegoEffects#zego_effects_enable_wrinkles_removing)、[zego_effects_set_wrinkles_removing_param](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~c_windows~class~ZegoEffects#zego_effects_set_wrinkles_removing_param)</li><li>[zego_effects_enable_darkcircles_removing](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~c_windows~class~ZegoEffects#zego_effects_enable_darkcircles_removing)、[zego_effects_set_darkcircles_removing_param](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~c_windows~class~ZegoEffects#zego_effects_set_darkcircles_removing_param)</li></ul>|
| 新增一些美型功能 |<p>新增如下功能点：</p><ul><li>缩小额头高度</li><li>瘦下颌骨</li><li>瘦颧骨</li><li>小脸</li><li>长鼻</li></ul>| <ul><li>[zego_effects_enable_forehead_shortening](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~c_windows~class~ZegoEffects#zego_effects_enable_forehead_shortening)、[zego_effects_set_forehead_shortening_param](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~c_windows~class~ZegoEffects#zego_effects_set_forehead_shortening_param)</li><li>[zego_effects_enable_mandible_slimming](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~c_windows~class~ZegoEffects#zego_effects_enable_mandible_slimming)、[zego_effects_set_mandible_slimming_param](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~c_windows~class~ZegoEffects#zego_effects_set_mandible_slimming_param)</li><li>[zego_effects_enable_cheekbone_slimming](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~c_windows~class~ZegoEffects#zego_effects_enable_cheekbone_slimming)、[zego_effects_set_cheekbone_slimming_param](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~c_windows~class~ZegoEffects#zego_effects_set_cheekbone_slimming_param)</li><li>[zego_effects_enable_face_shortening](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~c_windows~class~ZegoEffects#zego_effects_enable_face_shortening)、[zego_effects_set_face_shortening_param](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~c_windows~class~ZegoEffects#zego_effects_set_face_shortening_param)</li><li>[zego_effects_enable_nose_lengthening](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~c_windows~class~ZegoEffects#zego_effects_enable_nose_lengthening)、[zego_effects_set_nose_lengthening_param](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~c_windows~class~ZegoEffects#zego_effects_set_nose_lengthening_param)</li></ul>|


**接口变更**

- **新增接口**

| 新增接口 | 接口描述 | 
|---------|---------|
| [zego_effects_enable_wrinkles_removing](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~c_windows~class~ZegoEffects#zego_effects_enable_wrinkles_removing) | 开启去除法令纹功能。 | 
| [zego_effects_set_wrinkles_removing_param](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~c_windows~class~ZegoEffects#zego_effects_set_wrinkles_removing_param) | 设置去除法令纹的参数。 | 
| [zego_effects_enable_darkcircles_removing](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~c_windows~class~ZegoEffects#zego_effects_enable_darkcircles_removing) | 开启去除黑眼圈功能。 | 
| [zego_effects_set_darkcircles_removing_param](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~c_windows~class~ZegoEffects#zego_effects_set_darkcircles_removing_param) | 设置去除黑眼圈的参数。 |
| [zego_effects_enable_forehead_shortening](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~c_windows~class~ZegoEffects#zego_effects_enable_forehead_shortening) | 开启缩小额头高度功能。 | 
| [zego_effects_set_forehead_shortening_param](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~c_windows~class~ZegoEffects#zego_effects_set_forehead_shortening_param) | 设置缩小额头高度的参数。 |
| [zego_effects_enable_mandible_slimming](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~c_windows~class~ZegoEffects#zego_effects_enable_mandible_slimming) | 开启瘦下颌骨功能。 | 
| [zego_effects_set_mandible_slimming_param](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~c_windows~class~ZegoEffects#zego_effects_set_mandible_slimming_param) | 设置瘦下颌骨的参数。 |
| [zego_effects_enable_cheekbone_slimming](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~c_windows~class~ZegoEffects#zego_effects_enable_cheekbone_slimming) | 开启瘦颧骨功能。 | 
| [zego_effects_set_cheekbone_slimming_param](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~c_windows~class~ZegoEffects#zego_effects_set_cheekbone_slimming_param) | 设置瘦颧骨的参数。 |
| [zego_effects_enable_face_shortening](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~c_windows~class~ZegoEffects#zego_effects_enable_face_shortening) | 开启小脸功能。 | 
| [zego_effects_set_face_shortening_param](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~c_windows~class~ZegoEffects#zego_effects_set_face_shortening_param) | 设置小脸的参数。 |
| [zego_effects_enable_nose_lengthening](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~c_windows~class~ZegoEffects#zego_effects_enable_nose_lengthening) | 开启长鼻功能。 | 
| [zego_effects_set_nose_lengthening_param](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~c_windows~class~ZegoEffects#zego_effects_set_nose_lengthening_param) | 设置长鼻的参数。|

---

## 1.2.0 版本

**发布日期：2021-08-31**

**新增功能**

| 功能项  |         功能描述 |         相关接口 |
|:-------|:-------|:-------|
| 新增在线鉴权功能 | 在线向 ZEGO 服务器发送请求，申请鉴权文件，支持实现更新鉴权内容。| [zego_effects_get_auth_info](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~c_windows~class~ZegoEffects#zego_effects_get_auth_info) |


**接口变更**


- **新增接口**

| 新增接口 | 接口描述 | 
|---------|---------|
| [zego_effects_get_auth_info](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~c_windows~class~ZegoEffects#zego_effects_get_auth_info) | 向 ZegoEffects SDK 发送请求，申请授权。 | 

- **废弃接口**

| 废弃接口 | 变更说明 | 预计删除版本 |
| :-------- | :------- | :----- |
| zego_effects_set_models | `zego_effects_set_models` 接口所实现的导入模型功能，合并到 [zego_effects_set_resources](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~c_windows~class~ZegoEffects#zego_effects_set_resources) 接口，模型和资源等由 [zego_effects_set_resources](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~c_windows~class~ZegoEffects#zego_effects_set_resources) 接口统一设置。 | 1.2.0 | 

---

## 1.1.0 版本

**发布日期：2021-07-01**

**新增功能**

| 功能项  |         功能描述 |         相关接口 |
|-------|-------|-------|
| 新增滤镜功能 | 提供青春、落日、琉璃、星云等多款滤镜效果，可广泛应用于短视频，直播等场景。| <ul><li>[zego_effects_set_filter](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~c_windows~class~ZegoEffects#zego_effects_set_filter)</li><li>[zego_effects_set_filter_param](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~c_windows~class~ZegoEffects#zego_effects_set_filter_param)</li></ul> |


---


## 1.0.0 版本

**发布日期：2021-05-25**

首次发布，支持美颜、美型、背景分割、人脸检测、挂件贴纸等功能。
