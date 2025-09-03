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
2. 修复 [ZegoEffectsScaleMode > ZegoEffectsScaleModeScaleToFill](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~objective-c_macos~enum~ZegoEffectsScaleMode#zego-effects-scale-mode-scale-to-fill) 设置后效果异常的问题。

---


## 1.4.9 版本

**发布日期：2022-06-20**

**改进优化**

| 优化项  | 优化描述 | 相关接口 |
| -----  | ----- | ----- |
| 优化背景分割功能 | 背景分割时，与人脸检测进行绑定。没有检测到人脸时，会隐藏背景分割结果，直接显示背景图片。|  <ul><li>[setPortraitSegmentationBackgroundPath](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~objective-c_macos~class~ZegoEffects#set-portrait-segmentation-background-path-image-path-mode)</li><li>[setPortraitSegmentationBackgroundBuffer](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~objective-c_macos~class~ZegoEffects#set-portrait-segmentation-background-buffer-buffer-mode)</li></ul>  |
| 优化人脸检测模型 | 更新了人脸检测的模型，提升检测时的准确度。 |  -  |


**问题修复**

修复已知问题。

---


## 1.4.7 版本

**发布日期：2022-01-07**

**新增功能**

| 功能项  |         功能描述 |         相关文档 |
|-------|-------|-------|
| 新增服务端鉴权接口 | 新增服务端的公共网关接口，用于支持开发者通过自己的服务端，访问获取 ZegoEffects 服务端，自行设置鉴权能力，管理鉴权文件，灵活性较高。| [在线鉴权](/ai-effects-macos-objc/quick-starts/online-authentication) |

**改进优化**

| 优化项  | 优化描述 | 相关接口 |
| -----  | ----- | ----- |
| 优化体验 App | <ol><li>更新挂件资源，支持通过编辑器输出结果。</li><li>更新美妆资源。</li><li>更新资源配置目录。</li><li>支持美型功能的参数化更新。</li><li>支持美颜功能的全屏磨皮效果。</li><li>支持同屏中出现 2 人，都可以使用美颜、美妆、挂件等功能。</li></ol>  | [下载体验 App](/ai-effects-macos-objc/demo-app) |


**问题修复**

修复了体验 App 的一些已知问题。

---

## 1.4.6 版本

**发布日期：2021-12-20**

**改进优化**

| 优化项  | 优化描述 | 相关接口 |
| -----  | ----- | ----- |
| 优化 AI 模型 | 更新 AI 模型，提升人脸识别能力。  | - |
| 优化磨皮效果 | 优化美颜功能中的磨皮效果。 | [setSmoothParam](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~objective-c_macos~class~ZegoEffects#set-smooth-param-param) |

---

## 1.4.5 版本
**发布日期：2021-11-29**

**改进优化**

| 优化项  | 优化描述 | 相关接口 |
| -----  | ---- | ----- |
| 优化人像分割功能 |  优化 AI 模型，人像边缘更加贴合，显著减少边缘抖动的现象发生。 | [setResources](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~objective-c_macos~class~ZegoEffects#set-resources-resource-info-list) |

---

## 1.4.0 版本

**发布日期：2021-11-10**

**新增功能**

| 功能项  |         功能描述 |         相关接口 |
|-------|-------|-------|
| 新增美妆功能 |<p>新增美妆功能，提供如下功能点：</p><ul><li>眼线</li><li>眼睫毛</li><li>眼影</li><li>腮红</li><li>口红</li><li>美瞳</li><li>风格妆</li></ul>| <ul><li>[setEyeliner](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~objective-c_macos~class~ZegoEffects#set-eyeliner-path)、[setEyelinerParam](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~objective-c_macos~class~ZegoEffects#set-eyeliner-param-param)</li><li>[setEyelashes](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~objective-c_macos~class~ZegoEffects#set-eyelashes-path)、[setEyelashesParam](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~objective-c_macos~class~ZegoEffects#set-eyelashes-param-param)</li><li>[setEyeshadow](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~objective-c_macos~class~ZegoEffects#set-eyeshadow-path)、[setEyeshadowParam](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~objective-c_macos~class~ZegoEffects#set-eyeshadow-param-param)</li><li>[setBlusher](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~objective-c_macos~class~ZegoEffects#set-blusher-path)、[setBlusherParam](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~objective-c_macos~class~ZegoEffects#set-blusher-param-param)</li><li>[setLipstick](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~objective-c_macos~class~ZegoEffects#set-lipstick-path)、[setLipstickParam](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~objective-c_macos~class~ZegoEffects#set-lipstick-param-param)</li><li>[setColoredcontacts](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~objective-c_macos~class~ZegoEffects#set-coloredcontacts-path)、[setColoredcontactsParam](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~objective-c_macos~class~ZegoEffects#set-coloredcontacts-param-param)</li><li>[setMakeup](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~objective-c_macos~class~ZegoEffects#set-makeup-path)、[setMakeupParam](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~objective-c_macos~class~ZegoEffects#set-makeup-param-param)</li></ul>|


**接口变更**

- **新增接口**

| 新增接口 | 接口描述 | 
|---------|---------|
| [setEyeliner](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~objective-c_macos~class~ZegoEffects#set-eyeliner-path) | 开启眼线功能。 | 
| [setEyelinerParam](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~objective-c_macos~class~ZegoEffects#set-eyeliner-param-param) | 设置眼线的参数。 | 
| [setEyelashes](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~objective-c_macos~class~ZegoEffects#set-eyelashes-path) | 开启眼睫毛功能。 | 
| [setEyelashesParam](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~objective-c_macos~class~ZegoEffects#set-eyelashes-param-param) | 设置眼睫毛的参数。 |
| [setEyeshadow](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~objective-c_macos~class~ZegoEffects#set-eyeshadow-path) | 开启眼影功能。 | 
| [setEyeshadowParam](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~objective-c_macos~class~ZegoEffects#set-eyeshadow-param-param) | 设置眼影的参数。 |
| [setBlusher](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~objective-c_macos~class~ZegoEffects#set-blusher-path) | 开启腮红功能。 | 
| [setBlusherParam](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~objective-c_macos~class~ZegoEffects#set-blusher-param-param) | 设置腮红的参数。 |
| [setLipstick](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~objective-c_macos~class~ZegoEffects#set-lipstick-path) | 开启口红功能。 | 
| [setLipstickParam](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~objective-c_macos~class~ZegoEffects#set-lipstick-param-param) | 设置口红的参数。 |
| [setColoredcontacts](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~objective-c_macos~class~ZegoEffects#set-coloredcontacts-path) | 开启美瞳功能。 | 
| [setColoredcontactsParam](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~objective-c_macos~class~ZegoEffects#set-coloredcontacts-param-param) | 设置美瞳的参数。 |
| [setMakeup](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~objective-c_macos~class~ZegoEffects#set-makeup-path) | 开启风格妆功能。 | 
| [setMakeupParam](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~objective-c_macos~class~ZegoEffects#set-makeup-param-param) | 设置风格妆的参数。|

---

## 1.3.0 版本

**发布日期：2021-10-09**

**新增功能**

| 功能项  |         功能描述 |         相关接口 |
|-------|-------|-------|
| 新增一些美颜功能 | <p>新增如下功能点：</p><ul><li>去除法令纹</li><li>去除黑眼圈</li></ul> | <ul><li>[enableWrinklesRemoving](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~objective-c_macos~class~ZegoEffects#enable-wrinkles-removing-enable)、[setWrinklesRemovingParam](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~objective-c_macos~class~ZegoEffects#set-wrinkles-removing-param-param)</li><li>[enableDarkCirclesRemoving](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~objective-c_macos~class~ZegoEffects#enable-dark-circles-removing-enable)、[setDarkCirclesRemovingParam](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~objective-c_macos~class~ZegoEffects#set-dark-circles-removing-param-param)</li></ul>|
| 新增一些美型功能 |<p>新增如下功能点：</p><ul><li>缩小额头高度</li><li>瘦下颌骨</li><li>瘦颧骨</li><li>小脸</li><li>长鼻</li></ul>| <ul><li>[enableForeheadShortening](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~objective-c_macos~class~ZegoEffects#enable-forehead-shortening-enable)、[setForeheadShorteningParam](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~objective-c_macos~class~ZegoEffects#set-forehead-shortening-param-param)</li><li>[enableMandibleSlimming](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~objective-c_macos~class~ZegoEffects#enable-mandible-slimming-enable)、[setMandibleSlimmingParam](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~objective-c_macos~class~ZegoEffects#set-mandible-slimming-param-param)</li><li>[enableCheekboneSlimming](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~objective-c_macos~class~ZegoEffects#enable-cheekbone-slimming-enable)、[setCheekboneSlimmingParam](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~objective-c_macos~class~ZegoEffects#set-cheekbone-slimming-param-param)</li><li>[enableFaceShortening](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~objective-c_macos~class~ZegoEffects#enable-face-shortening-enable)、[setFaceShorteningParam](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~objective-c_macos~class~ZegoEffects#set-face-shortening-param-param)</li><li>[enableNoseLengthening](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~objective-c_macos~class~ZegoEffects#enable-nose-lengthening-enable)、[setNoseLengtheningParam](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~objective-c_macos~class~ZegoEffects#set-nose-lengthening-param-param)</li></ul>|


**接口变更**

- **新增接口**

| 新增接口 | 接口描述 | 
|---------|---------|
| [enableWrinklesRemoving](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~objective-c_macos~class~ZegoEffects#enable-wrinkles-removing-enable) | 开启去除法令纹功能。 | 
| [setWrinklesRemovingParam](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~objective-c_macos~class~ZegoEffects#set-wrinkles-removing-param-param) | 设置去除法令纹的参数。 | 
| [enableDarkCirclesRemoving](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~objective-c_macos~class~ZegoEffects#enable-dark-circles-removing-enable) | 开启去除黑眼圈功能。 | 
| [setDarkCirclesRemovingParam](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~objective-c_macos~class~ZegoEffects#set-dark-circles-removing-param-param) | 设置去除黑眼圈的参数。 |
| [enableForeheadShortening](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~objective-c_macos~class~ZegoEffects#enable-forehead-shortening-enable) | 开启缩小额头高度功能。 | 
| [setForeheadShorteningParam](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~objective-c_macos~class~ZegoEffects#set-forehead-shortening-param-param) | 设置缩小额头高度的参数。 |
| [enableMandibleSlimming](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~objective-c_macos~class~ZegoEffects#enable-mandible-slimming-enable) | 开启瘦下颌骨功能。 | 
| [setMandibleSlimmingParam](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~objective-c_macos~class~ZegoEffects#set-mandible-slimming-param-param) | 设置瘦下颌骨的参数。 |
| [enableCheekboneSlimming](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~objective-c_macos~class~ZegoEffects#enable-cheekbone-slimming-enable) | 开启瘦颧骨功能。 | 
| [setCheekboneSlimmingParam](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~objective-c_macos~class~ZegoEffects#set-cheekbone-slimming-param-param) | 设置瘦颧骨的参数。 |
| [enableFaceShortening](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~objective-c_macos~class~ZegoEffects#enable-face-shortening-enable) | 开启小脸功能。 | 
| [setFaceShorteningParam](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~objective-c_macos~class~ZegoEffects#set-face-shortening-param-param) | 设置小脸的参数。 |
| [enableNoseLengthening](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~objective-c_macos~class~ZegoEffects#enable-nose-lengthening-enable) | 开启长鼻功能。 | 
| [setNoseLengtheningParam](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~objective-c_macos~class~ZegoEffects#set-nose-lengthening-param-param) | 设置长鼻的参数。|

---

## 1.2.0 版本

**发布日期：2021-08-31**

**新增功能**

| 功能项  |         功能描述 |         相关接口 |
|:-------|:-------|:-------|
| 新增在线鉴权功能 | 在线向 ZEGO 服务器发送请求，申请鉴权文件，支持实现更新鉴权内容。| [getAuthInfo](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~objective-c_macos~class~ZegoEffects#get-auth-info-app-sign) |


**接口变更**


- **新增接口**

| 新增接口 | 接口描述 | 
|---------|---------|
| [getAuthInfo](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~objective-c_macos~class~ZegoEffects#get-auth-info-app-sign) | 向 ZegoEffects SDK 发送请求，申请授权。 | 

- **废弃接口**

| 废弃接口 | 变更说明 | 预计删除版本 |
| :-------- | :------- | :----- |
| setModels | `setModels` 接口所实现的导入模型功能，合并到 [setResources](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~objective-c_macos~class~ZegoEffects#set-resources-resource-info-list) 接口，模型和资源等由 [setResources](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~objective-c_macos~class~ZegoEffects#set-resources-resource-info-list) 接口统一设置。 | 1.2.0 | 

---

## 1.1.0 版本

**发布日期：2021-07-01**

**新增功能**

| 功能项  |         功能描述 |         相关接口 |
|-------|-------|-------|
| 新增滤镜功能 | 提供青春、落日、琉璃、星云等多款滤镜效果，可广泛应用于短视频，直播等场景。| <ul><li>[setFilter](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~objective-c_macos~class~ZegoEffects#set-filter-path)</li><li>[setFilterParam](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~objective-c_macos~class~ZegoEffects#set-filter-param-param)</li></ul> |


---


## 1.0.0 版本

**发布日期：2021-05-25**

首次发布，支持美颜、美型、背景分割、人脸检测、挂件贴纸等功能。
