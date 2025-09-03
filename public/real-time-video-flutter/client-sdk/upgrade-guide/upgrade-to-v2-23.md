# 2.23.0 及以上版本升级指南

---

<Warning title="注意">


- 如果您当前的 SDK 低于 2.23.0 版本，需要升级到任一 2.23.0 或以上的 SDK 版本时，都请务必阅读本文。
- 此外，建议您根据**当前版本号**与**升级目标版本号**，参考 [发布日志](https://doc-zh.zego.im/article/12552) 中两个版本区间的变更说明，检查您的业务相关接口。

</Warning>



本文将介绍 Express Flutter 平台 SDK 版本升级至 2.23.0 及以上版本时的说明和注意事项。

## 变更说明

为方便用户使用渲染功能，自 2.23.0 版本起，决定删除 `ZegoExpressTextureRenderUtils` 和 `ZegoExpressPlatformViewUtils` 接口。

因此在从旧版本升级至 2.23.0 及以上版本时，开发者需要迁移至新的 [ZegoExpressCanvasViewUtils](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressCanvasViewUtils.html) 接口使用渲染功能。

[ZegoExpressCanvasViewUtils](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressCanvasViewUtils.html) 接口可以同时支持 [外接纹理](https://api.flutter.dev/flutter/widgets/Texture-class.html) 和 [PlatformView](https://docs.flutter.dev/development/platform-integration/android/platform-views) 渲染方式。

## 变更原因

Express SDK 支持两种渲染方式：[外接纹理](https://api.flutter.dev/flutter/widgets/Texture-class.html) 和 [PlatformView](https://docs.flutter.dev/development/platform-integration/android/platform-views)，在 2.22.0 版本前两种渲染方式分别对应两套 API。由于部分平台 Flutter 仅支持其中一种渲染方式，开发者需要自行判断对应平台可使用哪套 API：

- 外接纹理：`ZegoExpressTextureRenderUtils`
  - `createTextureRenderer`
  - `destroyTextureRenderer`
  - `updateTextureRendererSize`
  
- PlatformView：`ZegoExpressPlatformViewUtils`
  - `createPlatformView`
  - `destroyPlatformView`

为降低用户的使用成本，因此在 2.22.0 版本推出了全新的 API：

- [ZegoExpressCanvasViewUtils](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressCanvasViewUtils.html)
  - [createCanvasView](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressCanvasViewUtils/createCanvasView.html)
  - [destroyCanvasView](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressCanvasViewUtils/destroyCanvasView.html)

这套 API 屏蔽了之前两种渲染方式在使用上的差异，可以同时支持 [外接纹理](https://api.flutter.dev/flutter/widgets/Texture-class.html) 和 [PlatformView](https://docs.flutter.dev/development/platform-integration/android/platform-views) 渲染方式。

- 对于两种渲染方式都支持的平台，会根据调用 [createEngineWithProfile](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngine/createEngineWithProfile.html) 时 [enablePlatformView](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoEngineProfile/enablePlatformView.html) 参数来决定是使用 [PlatformView](https://docs.flutter.dev/development/platform-integration/android/platform-views) 还是 [外接纹理](https://api.flutter.dev/flutter/widgets/Texture-class.html)。

- 对于仅支持一种渲染方式的平台，会自动使用唯一支持的渲染方式，此时 [enablePlatformView](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoEngineProfile/enablePlatformView.html) 参数无效，即 [enablePlatformView](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoEngineProfile/enablePlatformView.html) 参数的行为模式是 `偏好` 而不是 `指定`。

在 2.23.0 及以上版本 SDK 正式支持了 macOS 和 Windows，当前 2.23.0 及以上版本支持的渲染方式及平台情况如下：

渲染方式\平台 | Android | iOS | macOS | Windows | Web | Linux
------------|---------|-----|-------|---------|-----|-------
外接纹理      | ✔️       | ✔️   | ✔️     | ✔️       | ✖   | ✖
PlatformView | ✔️       | ✔️   | ✖     | ✖       | ✔️   | ✖

2.23.0 及以上版本为了支持 `CanvasView`，重构了视频画面渲染的功能实现，提升了性能和画面的流畅度，但同时也破坏了原来 `ZegoExpressTextureRenderUtils` 的行为（view mode 异常）。

为了避免此次改动影响用户体验，现决定删除上述的 `ZegoExpressTextureRenderUtils` 和 `ZegoExpressPlatformViewUtils` 接口。

开发者需要迁移至新的 [ZegoExpressCanvasViewUtils](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressCanvasViewUtils.html) 接口，具体接口变动情况如下：

旧接口 | 新接口
----|-----
`createTextureRenderer`| [createCanvasView](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressCanvasViewUtils/createCanvasView.html)
`destroyTextureRenderer` | [destroyCanvasView](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressCanvasViewUtils/destroyCanvasView.html)
`updateTextureRendererSize` | 无需调用，SDK 内部自动处理
`createPlatformView`| [createCanvasView](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressCanvasViewUtils/createCanvasView.html)
`destroyPlatformView` | [destroyCanvasView](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressCanvasViewUtils/destroyCanvasView.html)

## 示例代码

您可以参考以下示例代码进行接口变更，也可以参考最新的 [示例 Demo](https://github.com/zegoim/zego-express-flutter-sdk/tree/main/example) 进行接口变更。

### 2.23.0 版本前

- 外接纹理

```dart
// TextureRenderer

late int _viewID;
Widget? _viewWidget;

void start() {
  ZegoExpressEngine.instance.createTextureRenderer(width, height).then((viewID) {
    _viewID = viewID;
    setState(() {
      _viewWidget = Texture(textureId: viewID)
    });
    ZegoCanvas canvas = ZegoCanvas.view(viewID);
    // 调用 [startPreview] 或 [startPlayingStream] 接口
    // ......
  });
}

void stop() {
  // 调用 [stopPreview] 或 [stopPlayingStream]
  // ......
  ZegoExpressEngine.instance.destroyTextureRenderer(_viewID);
}
```

- PlatformView

```dart
// PlatformView  

late int _viewID;
Widget? _viewWidget;

void start() {
  setState(() {
    _viewWidget = ZegoExpressEngine.instance.createPlatformView((viewID) {
      _viewID = viewID;
      ZegoCanvas canvas = ZegoCanvas.view(viewID);
      // 调用 [startPreview] 或 [startPlayingStream]
      // ......
    });
  });
}

void stop() {
  // 调用 [stopPreview] 或 [stopPlayingStream]
  // ......
  ZegoExpressEngine.instance.destroyPlatformView(_viewID);
}
```

### 2.23.0 及以上版本

```dart
// CanvasView 

late int _viewID;
Widget? _viewWidget;

void start() {
  ZegoExpressEngine.instance.createCanvasView((viewID) {
    _viewID = viewID;
    // 调用 [startPreview] 或 [startPlayingStream]
    // ......
  }).then((widget) {
    setState(() {
      _viewWidget = widget;
    });
  });
}

void stop() {
  // 调用 [stopPreview] 或 [stopPlayingStream]
  // ......
  ZegoExpressEngine.instance.destroyCanvasView(_viewID);
}
```
