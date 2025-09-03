# 导入资源和模型

- - -

本文档将为您介绍，如何导入 ZegoEffects SDK 内部提供的 AI 资源与模型。

## 实现流程

<Steps>
<Step title="下载资源和模型">
下载 [iOS ZegoEffects SDK](/ai-effects-ios-objc/downloads) 或 [Android ZegoEffects SDK](/ai-effects-android-java/downloads) 最新版本。
</Step>
<Step title="导入资源和模型文件夹">
解压后，将 `Resources` 和 `Models` 文件夹导入到您的项目中。
<Tabs>
<Tab title="iOS">
在您的项目中，手动创建 `Assets` 文件夹，并将 `Resources` 和 `Models` 文件夹放入 `Assets` 文件夹下。例如，您的项目名为 `example` ，并且您将所有资源放在 `Assets` 文件夹中，导入后，您的项目目录结构应该如下所示：

```bash
ios
├── example
│   ├── AppDelegate.h
│   ├── AppDelegate.mm
│   ├── Images.xcassets
├── Assets
│   ├── Models
│   │   ├── FaceDetectionModel.model
│   │   └── SegmentationModel.model
│   └── Resources
│       ├── ColorfulStyleResources
│       ├── CommonResources.bundle
│       ├── FaceWhiteningResources.bundle
│       ├── MakeupResources
│       ├── PendantResources.bundle
│       ├── RosyResources.bundle
│       └── TeethWhiteningResources.bundle
│
```
</Tab>
<Tab title="Android">
将 `Resources` 和 `Models` 文件夹添加到您的 Android 项目的 `assets` 目录中。通常，资源应该放置在 `android/app/src/main/assets` 目录中，所以导入后您的项目目录结构应该如下所示：

```bash
android/app/src/main
├── AndroidManifest.xml
├── assets
│   ├── Models
│   │   ├── FaceDetectionModel.model
│   │   └── SegmentationModel.model
│   └── Resources
│       ├── ColorfulStyleResources
│       ├── CommonResources.bundle
│       ├── FaceWhiteningResources.bundle
│       ├── MakeupResources
│       ├── PendantResources.bundle
│       ├── RosyResources.bundle
│       └── TeethWhiteningResources.bundle
├── java
└── res
```
</Tab>
</Tabs>
</Step>
</Steps>

## 支持的模型和资源

当前 ZegoEffects SDK 支持的模型和资源，请参考下表：

| 模型/资源 | 描述 | 支持功能 |
| --- | --- | --- |
| CommonResources | 美颜美型通用资源 | 美颜、美型 |
| FaceWhiteningResources | 美白颜色查找表资源 | 美白 |
| RosyResources | 红润颜色查找表资源 | 红润 |
| TeethWhiteningResources | 牙齿美白颜色查找表资源 | 牙齿美白 |
| ColorfulStyleResources | 风格滤镜资源 | 滤镜 |
| MakeupResources | 美妆功能资源 | 腮红、眼睫毛、眼线、眼影、口红、美瞳 |
| FaceDetectionModel | 人脸检测模型 | 人脸检测、大眼、瘦脸 |
| SegmentationModel | 人像分割模型 | 人像分割 |
| SkinColorResources | 美颜调整肤色资源 | 美黑、麦色、冷白、暖白、粉白 |
| ClarityResources | 美颜清晰功能资源 | 清晰 |
