# 实现图像处理

---

## 前提条件

在实现基本的 AI 功能之前，请确保：

- 已在项目中集成 SDK，详情请参考 [快速开始 - 集成 SDK](/ai-effects-macos-c/quick-starts/import-the-sdk)。
- 已获取到 Effects SDK 唯一的鉴权文件，详情请参考 [快速开始 - 在线鉴权](/ai-effects-macos-c/quick-starts/online-authentication)。


## 使用步骤

本节介绍如何使用 ZegoEffects SDK 实现基本的图像处理功能，API 调用时序如下图：

<Frame width="auto" height="auto">
  <img src="https://doc-media.zego.im/sdk-doc/Pics/AI_Vision/QuickStarts/Implemention_Windows_zh.png" />
</Frame>

### 1. 创建 Effects 对象

<Steps>
<Step title="传入 AI 资源或模型">
使用 Effects 的 AI 相关功能前，必须调用 [zego_effects_set_resources](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~c_macos~class~ZegoEffects#zego_effects_set_resources) 接口导入 AI 资源或模型，详情请参考 [快速开始 - 导入资源和模型](/ai-effects-macos-c/quick-starts/import-resources-and-models)。

```c
char ** model_path_list = new char*[2];
// 传入人脸识别模型目录的绝对路径。人脸检测、大眼、瘦脸功能均须导入
model_path_list[0] = new char[1024];
strcpy(model_path_list[0], "/xxx/xxxxx/FaceDetectionModel.model");

// 传入人脸识别模型目录的绝对路径。AI 人像分割功能须导入
model_path_list[1] = new char[1024];
strcpy(model_path_list[1], "/xxx/xxxxx/SegmentationModel.model");

// 传入资源或模型路径列表，必须在 create 之前调用
zego_effects_set_resources(model_path_list, 2);   
```
</Step>
<Step title="创建 Effects 对象">
调用 [zego_effects_create](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~c_macos~class~ZegoEffects#zego_effects_create) 接口，传入 [1 前提条件](https://doc-zh.zego.im/article/11767#1) 获取到的鉴权文件，创建 Effects 对象。

```c
// 创建 effects 对象，传入鉴权文件 Lincese 内容（鉴权内容请以实际获取的文件为准）
zef_handle handle = NULL;
zego_effects_create(&handle, "xxxxxxx");   
```
</Step>
</Steps>    

### 2. 初始化 Effects 对象

<Steps>
<Step title="初始化 Effects 对象">
传入待处理的原始图像宽、高，调用 [zego_effects_init_env](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~c_macos~class~ZegoEffects#zego_effects_init_env) 接口初始化 Effects 对象。

```c
// 初始化 Effects 对象，传入当前待处理的原始图像宽高
zego_effects_init_env(handle, 1280, 720);
```
</Step>
<Step title="开启 AI 功能">
调用 [zego_effects_enable_whiten](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~c_macos~class~ZegoEffects#zego_effects_enable_whiten)/[zego_effects_enable_big_eyes](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~c_macos~class~ZegoEffects#zego_effects_enable_big_eyes)/[zego_effects_set_portrait_segmentation_background_path](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~c_macos~class~ZegoEffects#zego_effects_set_portrait_segmentation_background_path)/[zego_effects_enable_portrait_segmentation\|_balank](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~c_macos~class~ZegoEffects#zego_effects_enable_portrait_segmentation) 接口开启各项 AI 功能。

```c
// 1. 开启美白功能
zego_effects_enable_whiten(handle, true);

// 2. 开启大眼功能
zego_effects_enable_big_eyes(handle, true);

// 3. 开启 AI 人像分割功能，并传入分割背景图的绝对路径
zego_effects_set_portrait_segmentation_background_path(handle, "MY_BACKGROUND_PATH", zego_effects_scale_mode_aspect_fill);
zego_effects_enable_portrait_segmentation(handle, true);
```
</Step>
</Steps>

### 3. 处理图像

SDK 支持 RGB 和 YUV 格式来处理图像，开发者可以参考如下表格：

| 视频帧类型 | 视频数据帧格式 | 处理数据接口 |
|---|---|---|
|Buff 类型| <ul><li>zego_effects_video_frame_format_bgra32</li><li>zego_effects_video_frame_format_rgba32</li></ul>|[zego_effects_process_image_buffer_rgb](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~c_macos~class~ZegoEffects#zego_effects_process_image_buffer_rgb)|
|Buff 类型| <ul><li>zego_effects_video_frame_format_nv21</li><li>zego_effects_video_frame_format_nv12</li><li>zego_effects_video_frame_format_i420</li><li>zego_effects_video_frame_format_yv12</li></ul>|[zego_effects_process_image_buffer_yuv](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~c_macos~class~ZegoEffects#zego_effects_process_image_buffer_yuv) |

以下示例代码是通过 [zego_effects_process_image_buffer_rgb](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~c_macos~class~ZegoEffects#zego_effects_process_image_buffer_rgb) 接口来进行图像处理：

```c
zego_effects_video_frame_param param{};
param.format = zego_effects_video_frame_format::zego_effects_video_frame_format_rgba32;
param.width = width;
param.height = height;
/// 调用该接口进行图像处理，SDK 修改完成后会进行回写。
zego_effects_process_image_buffer_rgb(handle, buff, buff_length, param);
```

<Content />
