## 导入资源和模型

- - -

本文档将为您介绍，如何导入 ZegoEffects SDK 内部提供的 AI 资源与模型。

## 实现流程

<Steps>
<Step title="获取资源和模型">
在使用 ZegoEffects SDK 提供的 AI 功能前，请在 [下载](/ai-effects-windows-c/downloads) 页面的 SDK 内部，获取最新版本的 AI 资源与模型（后缀为 bundle 或 model 的文件），并将其拷贝到您的工程中，以在后续步骤中使用。
<Note title="说明">
如果需要使用美颜、美型、美白、挂件、牙齿美白，红润、大眼、瘦脸、人像分割等功能，请先导入 SDK 包内对应的资源与模型。
</Note>
</Step>
<Step title="指定路径">
指定 AI 资源和模型的绝对路径。

```cpp
// 传入模型和资源的绝对路径。美颜、美型、美白、挂件、牙齿美白、红润、大眼、瘦脸、人像分割功能须导入资源及模型。
char ** model_path_list = new char*[7];
for(int i = 0; i < 7; i++)
{
    model_path_list[i] = new char[1024];
}
strcpy(model_path_list[0], "D:\\YOUR_APP\\CommonResources.bundle");
strcpy(model_path_list[1], "D:\\YOUR_APP\\FaceWhiteningResources.bundle");
strcpy(model_path_list[2], "D:\\YOUR_APP\\PendantResources.bundle");
strcpy(model_path_list[3], "D:\\YOUR_APP\\RosyResources.bundle");
strcpy(model_path_list[4], "D:\\YOUR_APP\\TeethWhiteningResources.bundle");
strcpy(model_path_list[5], "D:\\YOUR_APP\\FaceDetectionModel.model");
strcpy(model_path_list[6], "D:\\YOUR_APP\\SegmentationModel.model");
```
</Step>
<Step title="加载资源和模型">
在调用 [zego_effects_create](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~c_windows~class~ZegoEffects#zego_effects_create) 接口创建对象之前，先调用 [zego_effects_set_resources](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~c_windows~class~ZegoEffects#zego_effects_set_resources) 接口传入模型和资源路径列表，加载模型和资源。

```cpp
// 传入模型和资源路径列表，必须在 create 之前调用
zego_effects_set_resources(model_path_list, 7);
```
</Step>
</Steps>


## 支持的模型和资源

当前 ZegoEffects SDK 支持的模型和资源，请参考下表：

| 模型/资源 | 描述 | 支持功能 |
| --- | --- | --- |
| CommonResources | 美颜美型通用资源 | 美颜、美型 |
| FaceWhiteningResources | 美白颜色查找表资源 | 美白 |
| PendantResources | 挂件贴纸资源 | 挂件 |
| RosyResources | 红润颜色查找表资源 | 红润 |
| TeethWhiteningResources | 牙齿美白颜色查找表资源 | 牙齿美白 |
| FaceDetectionModel | 人脸检测模型 | 人脸检测、大眼、瘦脸 |
| SegmentationModel | 人像分割模型 | 人像分割 |