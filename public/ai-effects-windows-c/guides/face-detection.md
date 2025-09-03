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

export const setEventHandlerMap = {
    'default': <a href="@setEventHandler" target='_blank'>setEventHandler</a>,
    'Windows': <a href="@zego_register_face_detection_result_callback" target='_blank'>zego_register_face_detection_result_callback</a>,
}

export const enableFaceDetectionMap = {
    'default': <a href="@enableFaceDetection" target='_blank'>enableFaceDetection</a>,
    'Windows': <a href="@zego_effects_enable_face_detection" target='_blank'>zego_effects_enable_face_detection</a>,
}

# 人脸检测

- - -

## 功能简介

ZegoEffects SDK 提供人脸检测功能，可通过此功能检测到视频中存在多少个人脸，以及人脸在图像中处于的位置信息。


## 前提条件

在使用 ZegoEffects SDK 人脸检测功能前，请确保：

- 已在项目中集成 ZegoEffects SDK，实现基本的图像处理功能，详情请参考 [快速开始 - 实现图像处理](/ai-effects-windows-c/quick-starts/implement-basic-image-processing)。
- 导入 “FaceDetectionModel” 模型路径，详情请参考 [快速开始 - 导入资源和模型](/ai-effects-windows-c/quick-starts/import-resources-and-models)。

## 使用步骤

<Warning title="注意">
使用人脸检测功能前，请先导入对应的 “FaceDetectionModel” 模型文件，否则功能无法生效。详情请参考 [快速开始 - 导入资源和模型](/ai-effects-windows-c/quick-starts/import-resources-and-models)。
</Warning>

### 设置回调

调用 {getPlatformData2(props,setEventHandlerMap)} 接口设置人脸检测结果回调。

:::if{props.platform=undefined}
```objc
// 设置人脸检测结果回调
[self.effects setEventHandler:self]
```
:::
:::if{props.platform="Android"}
```java
// 设置人脸检测结果回调
mEffects.setEventHandler(new ZegoEffectsEventHandler() {  
    @Override  
    public void onFaceDetectionResult(ZegoEffectsFaceDetectionResult[] results, ZegoEffects handle) { 
    // 获取人脸检测结果，包含人脸个数、每个人脸的置信度和其 Rect 位置信息    
    }
});
```
:::
:::if{props.platform="Windows"}
```c
// 设置人脸检测结果回调
zego_register_face_detection_result_callback(handle, on_face_detection_result);
```
:::

### 开启人脸检测

调用 {getPlatformData2(props,enableFaceDetectionMap)} 接口开启人脸检测功能。

:::if{props.platform=undefined}
```objc
// 开启人脸检测功能
[self.effects enableFaceDetection:YES];

- (void)effects:(ZegoEffects *)effects faceDetectionResults:(NSArray<ZegoEffectsFaceDetectionResult *> *)results{  
    // 获取人脸检测结果，包含人脸个数、每个人脸的置信度和其 Rect 位置信息
}
```
:::
:::if{props.platform="Android"}
```java
// 开启人脸检测功能
mEffects.enableFaceDetection(true);
```
:::
:::if{props.platform="Windows"}
```c
// 开启人脸检测功能
zego_effects_enable_face_detection(handle, true);

void on_face_detection_result(zef_handle handle, struct zego_effects_face_detection_result *results, int result_size) {  
    // 获取人脸检测结果，包含人脸个数、每个人脸的置信度和其 Rect 位置信息
}
```
:::

<Content platform="Windows" />