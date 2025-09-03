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
  'default': <a href="https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~objectivec_ios~class~ZegoEffects#create-appid-app-sign-callback-1" target='_blank'>create</a>,
  'mac': <a href="https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~macos_objc~class~ZegoEffects#create-appid-app-sign-callback-1" target='_blank'>create</a>,
}

# 导入资源和模型

- - -

本文档将为您介绍，如何导入 ZegoEffects SDK 内部提供的 AI 资源与模型。

## 实现流程

<Steps>
<Step title="获取资源和模型">
在使用 ZegoEffects SDK 提供的 AI 功能前，请在 [下载](/ai-effects-macos-objc/downloads) 页面的 SDK 内部，获取最新版本的 AI 资源与模型（后缀为 bundle 或 model 的文件），并将其拷贝到您的工程中，以在后续步骤中使用。
<Note title="说明">
如果需要使用美颜，美型、美白、牙齿美白、红润、大眼、瘦脸、人像分割等功能，请先导入 SDK 包内对应的资源与模型。
</Note>
</Step>
<Step title="指定路径">
指定 AI 资源和模型的绝对路径。
```objc
// 传入模型和资源的绝对路径。美颜，美型，美白，牙齿美白，红润，大眼、瘦脸、人像分割功能须导入资源及模型。
NSString *commonResources = [[NSBundle mainBundle] pathForResource:@"CommonResources" ofType:@"bundle"];
NSString *faceWhiteningResources = [[NSBundle mainBundle] pathForResource:@"FaceWhiteningResources" ofType:@"bundle"];

// 仅 2.0.0 之前版本支持挂件贴纸功能
// NSString *pendantResources = [[NSBundle mainBundle] pathForResource:@"PendantResources" ofType:@"bundle"];

NSString *teethWhiteningResources = [[NSBundle mainBundle] pathForResource:@"TeethWhiteningResources" ofType:@"bundle"];
NSString *rosyResources = [[NSBundle mainBundle] pathForResource:@"RosyResources" ofType:@"bundle"];
// 滤镜资源 (如秋风)
NSString *colorfulStyleFolderResources = [[NSBunble mainBundle] pathForResource:@"ColorfulStyleResources", ofType:nil];
NSString *colorfulStyleBundle = [colorfulStyleFolderResources stringByAppendingPathComponent:[NSString stringWithFormat:@"%@.bundle", @"Authmn"]];
// 美妆资源 (如眼线-自然)
NSString *makeupFolderResources = [[NSBunble mainBundle] pathForResource:@"MakeupResources", ofType:nil];
NSString *makeupBundle = [makeupFolderResources stringByAppendingPathComponent:[NSString stringWithFormat:@"%@/%@.bundle", @"eyelinerdir",@"eyelashesdir_natural"]];

// 只支持 2.0.0 及以后版本，清晰功能资源
NSString *clarityResources = [[NSBundle mainBundle] pathForResource:@"ClarityResources" ofType:@"bundle"];

// 传入人脸识别模型的绝对路径。人脸检测、大眼、瘦脸功能均须导入
NSString *faceDetectionModelPath = [[NSBundle mainBundle] pathForResource:@"FaceDetectionModel" ofType:@"model"];

// 传入人像分割模型的绝对路径。AI 人像分割功能须导入
NSString *segmentationModelPath = [[NSBundle mainBundle] pathForResource:@"SegmentationModel" ofType:@"model"];

NSArray<NSString *> * resourcesList = @[commonResources, faceWhiteningResources, pendantResources, teethWhiteningResources, rosyResources,faceDetectionModelPath,segmentationModelPath];

// 调整肤色资源(仅支持 2.0.0 及以后版本。美黑:meihei、麦色:maise、冷白:lengbai、暖白:nuanbai、粉白:fenbai)
//例 美黑
NSString *skinColorFolderPath = [[NSBundle mainBundle] pathForResource:@"SkinColorResources" ofType:nil];
NSString *skinColorBundlePath = [skinColorFolderPath stringByAppendingPathComponent:[NSString stringWithFormat:@"%@.bundle", @"meihei"]];
```
</Step>
<Step title="加载模型和资源">
在调用 {getPlatformData2(props,createMap)} 接口创建对象之前，先调用 [setResources](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~objective-c_macos~class~ZegoEffects#set-resources-resource-info-list) 接口传入模型和资源路径列表，加载模型和资源。
```objc
// 传入模型和资源路径列表，必须在 create 之前调用
[ZegoEffects setResources:resourcesList];
```
</Step>
</Steps>

## 支持的模型和资源

当前 ZegoEffects SDK 支持的模型和资源，请参考下表：

| 资源/模型 | 描述 | 支持功能 |
| --- | --- | --- |
| CommonResources | 美颜美型通用资源 | 美颜、美型 |
| FaceWhiteningResources | 美白颜色查找表资源 | 美白 |
| RosyResources | 红润颜色查找表资源 | 红润 |
| TeethWhiteningResources | 牙齿美白颜色查找表资源 | 牙齿美白 |
| ColorfulStyleResources | 风格滤镜资源 | 滤镜 |
| MakeupResources | 美妆功能资源 | 腮红、眼睫毛、眼线、眼影、口红、美瞳 |
| FaceDetectionModel | 人脸检测模型 | 人脸检测、大眼、瘦脸 |
| SegmentationModel | 人像分割模型 | 人像分割 |
| SkinColorResources | 美颜调整肤色资源| 美黑、麦色、冷白、暖白、粉白 |
| ClarityResources | 美颜清晰功能资源 | 清晰 |

<Content platform="mac" />