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

export const createMap = {
    'default': <a href="https://doc-zh.zego.im/article/api?doc=effects-sdk_API~objectivec_ios~class~ZegoEffects#create-appid-app-sign-2" target='_blank'>create</a>,
    'macOS': <a href="https://doc-zh.zego.im/article/api?doc=effects-sdk_API~objectivec_macos~class~ZegoEffects#create-appid-app-sign-2" target='_blank'>create</a>,
}


# 实现图像处理

---

## 前提条件

在实现基本的 AI 功能之前，请确保:

- 已在项目中集成 SDK，详情请参考 [快速开始 - 集成 SDK](/ai-effects-ios-objc/quick-starts/import-the-sdk)。
- 已获取到 Effects SDK 唯一的鉴权文件，详情请参考 [快速开始 - 在线鉴权](/ai-effects-ios-objc/quick-starts/online-authentication)。
- 登录 [ZEGO 控制台](https://console.zego.im) 创建项目，获取接入 ZegoEffects SDK 服务所需的 AppID 和 AppSign，详情请参考 [控制台 - 项目信息](https://doc-zh.zego.im/article/12107)。


## 使用步骤

本节介绍如何使用 ZegoEffects SDK 实现基本的图像处理功能，API 调用时序如下图：

<Frame width="auto" height="auto">
  <img src="https://doc-media.zego.im/sdk-doc/Pics/AI_Vision/QuickStarts/Implemention_iOS_zh.png" />
</Frame>

### 1. 创建 Effects 对象

<Steps>
<Step title="传入 AI 资源或模型。  ">
使用 Effects 的 AI 相关功能前，必须调用 [setResources](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~objective-c_ios~class~ZegoEffects#set-resources-resource-info-list) 接口导入 AI 资源或模型，详情请参考 [快速开始 - 导入资源和模型](/ai-effects-ios-objc/quick-starts/import-resources-and-models)。

```objc
// 传入人脸识别模型的绝对路径。人脸检测、大眼、瘦脸功能均须导入
NSString *faceDetectionModelPath = [[NSBundle mainBundle] pathForResource:@"FaceDetectionModel" ofType:@"model"];

// 传入人像分割模型的绝对路径。AI 人像分割功能须导入
NSString *segmentationModelPath = [[NSBundle mainBundle] pathForResource:@"SegmentationModel" ofType:@"model"];

NSArray<NSString *> * modelList = @[faceDetectionModelPath, segmentationModelPath];

// 传入模型路径列表，必须在 create 之前调用
[ZegoEffects setResources:resourcesList];
```
</Step>
<Step title="部署高级配置项">
部署高级配置项，如配置设备性能等级，详情请参考 [配置设备性能等级](/ai-effects-ios-objc/quick-starts/configure-device-performance-levels)。

```objc
// 设置advancedConfig
ZegoEffectsAdvancedConfig *config = [ZegoEffectsAdvancedConfig alloc];
// 可配置设备性能等级
[ZegoEffects setAdvancedConfig:config];
```
</Step>
<Step title="创建 Effects 对象">
将 [前提条件](#前提条件) 中申请到的 AppID、AppSign 直接传入 {getPlatformData2(props,createMap)} 接口，由 SDK 内部鉴权之后，创建 Effects 对象并返回相关 [错误码](/ai-effects-ios-objc/error-codes)。

```objc
NSInteger appId = *******;
NSString *appSign = @"********";
self.effects = [ZegoEffects create:appid appSign:appSign];
```    
</Step>
</Steps>
  
### 2. 初始化 Effects 对象

<Steps>
<Step title="初始化 Effects 对象">
传入待处理的原始图像宽、高，调用 [initEnv](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~objective-c_ios~class~ZegoEffects#init-env-resolution) 接口初始化 Effects 对象。

```objc
// 初始化 Effects 对象，传入当前待处理的原始图像宽高
[self.effects initEnv:CGSizeMake(1280, 720)];
```
</Step>
<Step title="开启 AI 功能">
调用 [enableWhiten](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~objective-c_ios~class~ZegoEffects#enable-whiten-enable)/[enableBigEyes](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~objective-c_ios~class~ZegoEffects#enable-big-eyes-enable)/[setPortraitSegmentationBackgroundPath](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~objective-c_ios~class~ZegoEffects#set-portrait-segmentation-background-path-image-path-mode)/[enablePortraitSegmentation](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~objective-c_ios~class~ZegoEffects#enable-portrait-segmentation-enable) 接口开启 AI 功能。

```objc
// 1. 开启美白功能
[self.effects enableWhiten:YES];

// 2. 开启大眼功能              
[self.effects enableBigEyes:YES];

// 3. 开启 AI 人像分割功能，并传入分割背景图的绝对路径
[self.effects setPortraitSegmentationBackgroundPath: @"MY_BACKGROUND_PATH" mode:ZegoEffectsScaleModeAspectFill];

[self.effects enablePortraitSegmentation:YES];
```
</Step>
</Steps>

### 3. 处理图像

以下示例代码是通过 [processImageBuffer](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~objective-c_ios~class~ZegoEffects#process-image-buffer-buff) 接口传入待处理的原始视频图像，处理结果会回写到原来的 Buffer 中。

<Warning title="注意">
iOS 端 ZegoEffects SDK 的 `processImageBuffer` 接口只支持 BGRA32 和 RGBA32 格式的 pixelbuffer 数据。
</Warning>

```objc
// 传入待处理的原始视频图像，处理结果将回写到原来的 buffer 中
[self.effects processImageBuffer:pixelBuffer];
```
