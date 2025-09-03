# 实现图像处理

---

## 前提条件

在实现基本的 AI 美颜功能之前，请确保：

- 登录 [ZEGO 控制台](https://console.zego.im) 创建项目，获取接入 ZegoEffects SDK 服务所需的 AppID 和 AppSign，详情请参考 [控制台 - 项目信息](https://doc-zh.zego.im/article/12107)。
- 已在项目中集成 AI 美颜 SDK，详情请参考 [快速开始 - 集成 SDK](/ai-effects-flutter-dart/quick-starts/import-the-sdk)。
- 已在项目中集成 ZegoExpressSDK，详情请参考 [快速开始 - 集成 SDK](https://doc-zh.zego.im/article/1241)。

## 使用步骤

### 1. 导入 AI 资源或模型

使用 AI 美颜 的 AI 相关功能前，必须调用 [setResources](https://doc-zh.zego.im/unique-api/ai-effects-sdk/zh/dart_flutter/zego_effects_plugin/ZegoEffectsPlugin/setResources.html) 接口导入 AI 资源或模型，详情请参考 [快速开始 - 导入资源和模型](/ai-effects-flutter-dart/quick-starts/import-resources-and-models)。

```dart
ZegoEffectsPlugin.instance.setResources();
```

### 2. 创建 Effects 对象    
    
<Warning title="注意">
- 调用此方法时，前面必须添加 await 关键字。
- 创建 Effects 对象时，SDK 内部会通过 AppID 及 AppSign 进行鉴权。
</Warning>

```dart
// 请确保已调用 [setResources] 方法加载资源、模型。

//appID 和 appSign 为前提条件获取到的参数  必须添加await关键字
await ZegoEffectsPlugin.instance.create(appID,appSign);
```

### 3. 初始化并开启 AI 美颜功能

<Warning title="注意">
请确保已经初始化 Express SDK，详情可参考 [实现视频通话文档](https://doc-zh.zego.im/article/7634)。
</Warning>

<Steps>
<Step title="开启自定义视频前处理">
调用 Express 的 [enableCustomVideoProcessing](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngineCustomVideoIO/enableCustomVideoProcessing.html) 方法，开启自定义视频前处理。

```dart
// 启用 ExpressEngine 的自定义处理
ZegoCustomVideoProcessConfig config = ZegoCustomVideoProcessConfig(ZegoVideoBufferType.GLTexture2D);
if (Platform.isIOS) {
  config.bufferType = ZegoVideoBufferType.CVPixelBuffer;
} else if (Platform.isAndroid) {
  config.bufferType = ZegoVideoBufferType.GLTexture2D;
}

// 启用自定义前处理
ZegoExpressEngine.instance.enableCustomVideoProcessing(true, config);
```
</Step>
<Step title="启用图像处理功能">
调用 AI 美颜的 [enableImageProcessing](https://doc-zh.zego.im/unique-api/ai-effects-sdk/zh/dart_flutter/zego_effects_plugin/ZegoEffectsPlugin/enableImageProcessing.html) 方法，启用图像处理功能。

```dart
// 使用 AI 美颜的自定义处理
ZegoEffectsPlugin.instance.enableImageProcessing(true);
```
</Step>
<Step title="开启预览">
调用 Express 的 [createCanvasView](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressCanvasViewUtils/createCanvasView.html) 方法创建用语预览的视图，并调用 Express 的 [startPreview](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePublisher/startPreview.html) 开启预览。

```dart
// 必须在 ZegoExpressSDK 创建引擎成功后调用
ZegoExpressEngine.instance.createCanvasView((viewID) {
    _previewId = viewID;
    print('createCanvasView viewId: $viewID');
    startPreview(_previewId);
    }).then((widget) {
    print('createCanvasView widget: $widget');
    setState(() {
        _previewViewWidget = widget!;
    });
    }).catchError((err){
    // 输出相关错误码
    print('createCanvasView Error: $err' );
    });
```
</Step>
<Step title="开启美颜功能">
开启美颜功能。

调用 [enableSmooth](https://doc-zh.zego.im/unique-api/ai-effects-sdk/zh/dart_flutter/zego_effects_plugin/ZegoEffectsPlugin/enableSmooth.html)/[enableFaceLifting](https://doc-zh.zego.im/unique-api/ai-effects-sdk/zh/dart_flutter/zego_effects_plugin/ZegoEffectsPlugin/enableFaceLifting.html) 等接口开启美颜功能。

```dart
// 启用并配置磨皮效果以获得更好的美化效果
ZegoEffectsPlugin.instance.enableSmooth(true);
ZegoEffectsSmoothParam param = ZegoEffectsSmoothParam();
param.intensity = 100;
ZegoEffectsPlugin.instance.setSmoothParam(param);

// 启用瘦脸效果以创建更小的脸部外观
ZegoEffectsPlugin.instance.enableFaceLifting(true);
ZegoEffectsFaceLiftingParam param = ZegoEffectsFaceLiftingParam();
param.intensity = 100;
ZegoEffectsPlugin.instance.setFaceLiftingParam(param);
```
</Step>
</Steps>