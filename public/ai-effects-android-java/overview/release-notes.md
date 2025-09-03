# 发布日志

- - -

## 2.2.5 版本

**发布日期：2025-08-26**

**问题修复**

1. 修复已知问题

---

## 2.2.3 版本

**发布日期：2025-08-01**

**改进优化**

1. 支持 android 16K 内存分页。


## 2.2.2 版本

**发布日期：2025-07-01**

**问题修复**

1. 修复已知问题

---

## 2.2.1 版本

**发布日期：2025-05-19**

**问题修复**

1. 修复已知问题

---

## 2.2.0 版本

**发布日期：2025-04-07**

**新增功能**

| 功能项  | 功能描述 | 相关接口 |
| -----  | ----- | ----- |
| 新增 [create](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~java_android~class~ZegoEffects#create-2) 同步接口 | 新增 [create](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~java_android~class~ZegoEffects#create-2) 同步执行接口，简化代码逻辑，便于用户集成。|[create](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~java_android~class~ZegoEffects#create-2) |


**改进优化**

| 优化项  | 优化描述 | 相关接口 |
| -----  | ----- | ----- |
| Android 最低版本优化| SDK 的最低 Android 支持版本已从 8.0.0 优化为 6.0.0。| - |

**问题修复**

1. 修复已知问题

---

## 2.1.1 版本

**发布日期：2025-01-13**

**问题修复**

1. 修复已知问题

---


## 2.1.0 版本

**发布日期：2024-12-26**

**改进优化**

| 优化项  | 优化描述 | 相关接口 |
| -----  | ----- | ----- |
| 优化在线鉴权逻辑 | 优化在线鉴权文件过期及缓存逻辑，由 SDK 统一处理，无需用户单独处理。|[create](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~java_android~class~ZegoEffects#create) |

**问题修复**

1. 修复已知问题


**废弃删除**

| 废弃接口  | 变更说明 | 废弃版本 |
| -----  | ----- | ----- |
| [create](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~java_android~class~ZegoEffects#create)| 废弃原有的创建 Effects 实例接口 [create](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~java_android~class~ZegoEffects#create)，替换为同名的 [create](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~java_android~class~ZegoEffects#create-1) 接口，接口参数不同，请注意切换。| 2.1.0|


## 2.0.3 版本

**发布日期：2024-12-18**

**问题修复**

1. 修复已知问题

---


## 2.0.2 版本

**发布日期：2024-11-28**

**问题修复**

1. 修复已知问题

---


## 2.0.1 版本

**发布日期：2024-11-19**

**问题修复**

1. 修复已知问题

---

## 2.0.0 版本

**发布日期：2024-10-31**


**新增功能**

| 功能项  |         功能描述 |         相关接口 |
|-------|-------|-------|
| 新增美颜功能 |<ul><li>祛痘斑（祛痘祛斑，皮肤更加光滑）。</li><li>清晰人像。</li><li>换肤色功能（美黑色、美白色、暖白色、冷白色、小麦色）。</li></ul>| <ul><li>[enableAcneRemoving](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~java_android~class~ZegoEffects#enable-acne-removing)、[setAcneRemovingParam](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~java_android~class~ZegoEffects#set-acne-removing-param)</li><li>[enableClarity](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~java_android~class~ZegoEffects#enable-clarity)、[setClarityParam](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~java_android~class~ZegoEffects#set-clarity-param)</li><li>[enableSkinColor](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~java_android~class~ZegoEffects#enable-skin-color)、[setSkinColorParam](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~java_android~class~ZegoEffects#set-skin-color-param)、[setSkinColorResPath](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~java_android~class~ZegoEffects#set-skin-color-res-path)</li></ul>|

**改进优化**

| 优化项  | 优化描述 | 相关接口 |
| -----  | ----- | ----- |
| 效果提升 | 磨皮效果增强、美白效果增强。|- |
| 稳定性提升 | 遮挡优化，美妆部位受手部和物体的遮挡后，显示效果更为稳定。|- |
| 性能优化| 使设备运行更加流畅。|[getDeviceLevel](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~java_android~class~ZegoEffects#get-device-level)、[setAdvancedConfig](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~java_android~class~ZegoEffects#set-advanced-config) |



## 1.4.11 版本

**发布日期：2024-04-24**


**新增功能**

| 功能项  | 优化描述 | 相关接口 |
| -----  | ----- | ----- |
| Android 支持输入 OES 类型纹理 | 1.4.11 及以后版本，支持通过相机直出的 OES 纹理进行图像处理。|[processTexture](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~java_android~class~ZegoEffects#process-texture) |


**改进优化**

| 优化项  | 优化描述 | 相关接口 |
| -----  | ----- | ----- |
| 优化人脸检测性能 | 通过优化人脸模型，提高人脸检测速度，使美颜效果更快响应。|- |


---

## 1.4.10 版本

**发布日期：2023-12-29**

**问题修复**

1. 修复背景填充模式需要设置两次才能生效的问题。
2. 修复 [ZegoEffectsScaleMode > scaleToFill](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~java_android~enum~ZegoEffectsScaleMode#scale-to-fill) 设置后效果异常的问题。

---


## 1.4.9 版本

**发布日期：2022-06-20**

**新增功能**

| 功能项  |         功能描述 |         相关文档 |
|-------|-------|-------|
| 新增支持 OpenGL ES 2.0 | <ul><li>支持 OpenGL ES 2.0。</li><li>在少量不支持 OpenGL ES 3.0 的设备上，基础美颜部分特效可以正常运行，包括磨皮、美白、红润、锐化、背景替换、背景马赛克、背景虚化等，其它特效无效果。</li></ul> |- |


**改进优化**

| 优化项  | 优化描述 | 相关接口 |
| -----  | ----- | ----- |
| 优化背景分割功能 | 背景分割时，与人脸检测进行绑定。没有检测到人脸时，会隐藏背景分割结果，直接显示背景图片。|  <ul><li>[setPortraitSegmentationBackgroundPath](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~java_android~class~ZegoEffects#set-portrait-segmentation-background-path)</li><li>[setPortraitSegmentationBackgroundBuffer](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~java_android~class~ZegoEffects#set-portrait-segmentation-background-buffer)</li></ul>  |
| 优化人脸检测模型 | 更新了人脸检测的模型，提升检测时的准确度。 |  -  |


**问题修复**

修复已知问题。

---

## 1.4.7 版本

**发布日期：2022-01-07**

**新增功能**

| 功能项  |         功能描述 |         相关文档 |
|-------|-------|-------|
| 新增服务端鉴权接口 | 新增服务端的公共网关接口，用于支持开发者通过自己的服务端，访问获取 ZegoEffects 服务端，自行设置鉴权能力，管理鉴权文件，灵活性较高。| [在线鉴权](/ai-effects-android-java/quick-starts/online-authentication) |

**改进优化**

| 优化项  | 优化描述 | 相关接口 |
| -----  | ----- | ----- |
| 优化体验 App | <ol><li>更新挂件资源，支持通过编辑器输出结果。</li><li>更新美妆资源。</li><li>更新资源配置目录。</li><li>支持美型功能的参数化更新。</li><li>支持美颜功能的全屏磨皮效果。</li><li>支持同屏中出现 2 人，都可以使用美颜、美妆、挂件等功能。</li></ol>  | [下载体验 App](/ai-effects-android-java/demo-app) |


**问题修复**

修复了体验 App 的一些已知问题。

---

## 1.4.6 版本

**发布日期：2021-12-20**

**改进优化**

| 优化项  | 优化描述 | 相关接口 |
| -----  | ----- | ----- |
| 优化 AI 模型 | 更新 AI 模型，提升人脸识别能力。  | - |
| 优化磨皮效果 | 优化美颜功能中的磨皮效果。 | [setSmoothParam](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~java_android~class~ZegoEffects#set-smooth-param) |

---

## 1.4.5 版本
**发布日期：2021-11-29**

**改进优化**

| 优化项  | 优化描述 | 相关接口 |
| -----  | ---- | ----- |
| 优化人像分割功能 |  <ul><li>优化 AI 模型，人像边缘更加贴合，显著减少边缘抖动的现象发生。</li><li>扩展人像分割背景设置的接口，支持传入 Android 的 OES 类型纹理，进行处理。</li></ul> | <ul><li>[setPortraitSegmentationBackgroundTexture](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~java_android~class~ZegoEffects#set-portrait-segmentation-background-texture)</li><li>[setChromaKeyBackgroundTexture](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~java_android~class~ZegoEffects#set-chroma-key-background-texture)</li><li>[ZegoEffectsVideoFrameParam](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~java_android~class~ZegoEffectsVideoFrameParam)</li><li>[ZegoEffectsTextureFormat](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~java_android~enum~ZegoEffectsTextureFormat)</li></ul> |

**接口变更**

- **新增接口**

| 接口 | 接口描述 | 
|---------|---------|
| [ZegoEffectsVideoFrameParam](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~java_android~class~ZegoEffectsVideoFrameParam) | 增加 `textureFormat` 字段，在设置人像分割自定义背景时，指定处理的纹理类型。 | 
| [ZegoEffectsTextureFormat](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~java_android~enum~ZegoEffectsTextureFormat) | 新增视频纹理格式的枚举对象，用于指定纹理为 “2D 纹理” 或 “OES 纹理”。 | 

---

## 1.4.0 版本

**发布日期：2021-11-10**

**新增功能**

| 功能项  |         功能描述 |         相关接口 |
|-------|-------|-------|
| 新增美妆功能 |<p>新增美妆功能，提供如下功能点：</p><ul><li>眼线</li><li>眼睫毛</li><li>眼影</li><li>腮红</li><li>口红</li><li>美瞳</li><li>风格妆</li></ul>| <ul><li>[setEyeliner](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~java_android~class~ZegoEffects#set-eyeliner)、[setEyelinerParam](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~java_android~class~ZegoEffects#set-eyeliner-param)</li><li>[setEyelashes](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~java_android~class~ZegoEffects#set-eyelashes)、[setEyelashesParam](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~java_android~class~ZegoEffects#set-eyelashes-param)</li><li>[setEyeshadow](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~java_android~class~ZegoEffects#set-eyeshadow)、[setEyeshadowParam](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~java_android~class~ZegoEffects#set-eyeshadow-param)</li><li>[setBlusher](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~java_android~class~ZegoEffects#set-blusher)、[setBlusherParam](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~java_android~class~ZegoEffects#set-blusher-param)</li><li>[setLipstick](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~java_android~class~ZegoEffects#set-lipstick)、[setLipstickParam](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~java_android~class~ZegoEffects#set-lipstick-param)</li><li>[setColoredcontacts](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~java_android~class~ZegoEffects#set-coloredcontacts)、[setColoredcontactsParam](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~java_android~class~ZegoEffects#set-coloredcontacts-param)</li><li>[setMakeup](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~java_android~class~ZegoEffects#set-makeup)、[setMakeupParam](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~java_android~class~ZegoEffects#set-makeup-param)</li></ul>|


**接口变更**

- **新增接口**

| 新增接口 | 接口描述 | 
|---------|---------|
| [setEyeliner](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~java_android~class~ZegoEffects#set-eyeliner) | 开启眼线功能。 | 
| [setEyelinerParam](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~java_android~class~ZegoEffects#set-eyeliner-param) | 设置眼线的参数。 | 
| [setEyelashes](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~java_android~class~ZegoEffects#set-eyelashes) | 开启眼睫毛功能。 | 
| [setEyelashesParam](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~java_android~class~ZegoEffects#set-eyelashes-param) | 设置眼睫毛的参数。 |
| [setEyeshadow](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~java_android~class~ZegoEffects#set-eyeshadow) | 开启眼影功能。 | 
| [setEyeshadowParam](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~java_android~class~ZegoEffects#set-eyeshadow-param) | 设置眼影的参数。 |
| [setBlusher](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~java_android~class~ZegoEffects#set-blusher) | 开启腮红功能。 | 
| [setBlusherParam](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~java_android~class~ZegoEffects#set-blusher-param) | 设置腮红的参数。 |
| [setLipstick](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~java_android~class~ZegoEffects#set-lipstick) | 开启口红功能。 | 
| [setLipstickParam](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~java_android~class~ZegoEffects#set-lipstick-param) | 设置口红的参数。 |
| [setColoredcontacts](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~java_android~class~ZegoEffects#set-coloredcontacts) | 开启美瞳功能。 | 
| [setColoredcontactsParam](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~java_android~class~ZegoEffects#set-coloredcontacts-param) | 设置美瞳的参数。 |
| [setMakeup](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~java_android~class~ZegoEffects#set-makeup) | 开启风格妆功能。 | 
| [setMakeupParam](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~java_android~class~ZegoEffects#set-makeup-param) | 设置风格妆的参数。|

---

## 1.3.0 版本

**发布日期：2021-10-09**

**新增功能**

| 功能项  |         功能描述 |         相关接口 |
|-------|-------|-------|
| 新增一些美颜功能 | <p>新增如下功能点：</p><ul><li>去除法令纹</li><li>去除黑眼圈</li></ul> | <ul><li>[enableWrinklesRemoving](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~java_android~class~ZegoEffects#enable-wrinkles-removing)、[setWrinklesRemovingParam](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~java_android~class~ZegoEffects#set-wrinkles-removing-param)</li><li>[enableDarkCirclesRemoving](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~java_android~class~ZegoEffects#enable-dark-circles-removing)、[setDarkCirclesRemovingParam](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~java_android~class~ZegoEffects#set-dark-circles-removing-param)</li></ul>|
| 新增一些美型功能 |<p>新增如下功能点：</p><ul><li>缩小额头高度</li><li>瘦下颌骨</li><li>瘦颧骨</li><li>小脸</li><li>长鼻</li></ul>| <ul><li>[enableForeheadShortening](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~java_android~class~ZegoEffects#enable-forehead-shortening)、[setForeheadShorteningParam](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~java_android~class~ZegoEffects#set-forehead-shortening-param)</li><li>[enableMandibleSlimming](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~java_android~class~ZegoEffects#enable-mandible-slimming)、[setMandibleSlimmingParam](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~java_android~class~ZegoEffects#set-mandible-slimming-param)</li><li>[enableCheekboneSlimming](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~java_android~class~ZegoEffects#enable-cheekbone-slimming)、[setCheekboneSlimmingParam](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~java_android~class~ZegoEffects#set-cheekbone-slimming-param)</li><li>[enableFaceShortening](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~java_android~class~ZegoEffects#enable-face-shortening)、[setFaceShorteningParam](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~java_android~class~ZegoEffects#set-face-shortening-param)</li><li>[enableNoseLengthening](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~java_android~class~ZegoEffects#enable-nose-lengthening)、[setNoseLengtheningParam](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~java_android~class~ZegoEffects#set-nose-lengthening-param)</li></ul>|


**接口变更**

- **新增接口**

| 新增接口 | 接口描述 | 
|---------|---------|
| [enableWrinklesRemoving](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~java_android~class~ZegoEffects#enable-wrinkles-removing) | 开启去除法令纹功能。 | 
| [setWrinklesRemovingParam](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~java_android~class~ZegoEffects#set-wrinkles-removing-param) | 设置去除法令纹的参数。 | 
| [enableDarkCirclesRemoving](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~java_android~class~ZegoEffects#enable-dark-circles-removing) | 开启去除黑眼圈功能。 | 
| [setDarkCirclesRemovingParam](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~java_android~class~ZegoEffects#set-dark-circles-removing-param) | 设置去除黑眼圈的参数。 |
| [enableForeheadShortening](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~java_android~class~ZegoEffects#enable-forehead-shortening) | 开启缩小额头高度功能。 | 
| [setForeheadShorteningParam](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~java_android~class~ZegoEffects#set-forehead-shortening-param) | 设置缩小额头高度的参数。 |
| [enableMandibleSlimming](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~java_android~class~ZegoEffects#enable-mandible-slimming) | 开启瘦下颌骨功能。 | 
| [setMandibleSlimmingParam](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~java_android~class~ZegoEffects#set-mandible-slimming-param) | 设置瘦下颌骨的参数。 |
| [enableCheekboneSlimming](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~java_android~class~ZegoEffects#enable-cheekbone-slimming) | 开启瘦颧骨功能。 | 
| [setCheekboneSlimmingParam](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~java_android~class~ZegoEffects#set-cheekbone-slimming-param) | 设置瘦颧骨的参数。 |
| [enableFaceShortening](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~java_android~class~ZegoEffects#enable-face-shortening) | 开启小脸功能。 | 
| [setFaceShorteningParam](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~java_android~class~ZegoEffects#set-face-shortening-param) | 设置小脸的参数。 |
| [enableNoseLengthening](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~java_android~class~ZegoEffects#enable-nose-lengthening) | 开启长鼻功能。 | 
| [setNoseLengtheningParam](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~java_android~class~ZegoEffects#set-nose-lengthening-param) | 设置长鼻的参数。|

---

## 1.2.0 版本

**发布日期：2021-08-31**

**新增功能**

| 功能项  |         功能描述 |         相关接口 |
|:-------|:-------|:-------|
| 新增在线鉴权功能 | 在线向 ZEGO 服务器发送请求，申请鉴权文件，支持实现更新鉴权内容。| [getAuthInfo](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~java_android~class~ZegoEffects#get-auth-info) |

**接口变更**


- **新增接口**

| 新增接口 | 接口描述 | 
|---------|---------|
| [getAuthInfo](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~java_android~class~ZegoEffects#get-auth-info) | 向 ZegoEffects SDK 发送请求，申请授权。 | 

- **废弃接口**

| 废弃接口 | 变更说明 | 预计删除版本 |
| :-------- | :------- | :----- |
| setModels | `setModels` 接口所实现的导入模型功能，合并到 [setResources](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~java_android~class~ZegoEffects#set-resources) 接口，模型和资源等由 [setResources](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~java_android~class~ZegoEffects#set-resources) 接口统一设置。 | 1.2.0 | 

---

## 1.1.0 版本

**发布日期：2021-07-01**

**新增功能**

| 功能项  |         功能描述 |         相关接口 |
|-------|-------|-------|
| 新增滤镜功能 | 提供青春、落日、琉璃、星云等多款滤镜效果，可广泛应用于短视频，直播等场景。| <ul><li>[setFilter](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~java_android~class~ZegoEffects#set-filter)</li><li>[setFilterParam](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~java_android~class~ZegoEffects#set-filter-param)</li></ul> |

---

## 1.0.0 版本

**发布日期：2021-05-25**

首次发布，支持美颜、美型、背景分割、人脸检测、挂件贴纸等功能。
