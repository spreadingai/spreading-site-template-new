# 水印和截图

- - -

## 功能简介

<Warning title="注意">



本文档暂不适用于 Web 平台。

</Warning>



当需要为教育类的教学课件设置版权方 Logo 等场景下，可使用 SDK 的水印功能来实现。

本文主要讲述如何利用 SDK 实现水印和截图功能。

## 示例源码下载

请参考 [下载示例源码](https://doc-zh.zego.im/article/3130) 获取源码。

相关源码请查看 “lib\topics\OtherFunctions\beauty_watermark_snapshot” 目录下的文件。

## 前提条件

在实现水印和截图功能之前，请确保：

- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppID 和 AppSign，详情请参考 [控制台 - 项目信息](/console/project-info)。
- 已在项目中集成 ZEGO Express SDK，并实现了基本的音视频推拉流功能，详情请参考 [快速开始 - 集成](https://doc-zh.zego.im/article/1241) 和 [快速开始 - 实现流程](https://doc-zh.zego.im/article/7634)。


## 使用步骤

### 水印

调用 [ZegoWatermark](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoWatermark-class.html) 配置一个水印的图片 URL 以及该水印在画面中的大小方位。

调用 [setPublishWatermark](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePublisher/setPublishWatermark.html) 接口设置推流水印。

<Warning title="注意">


水印图片只支持 “PNG” 与 “JPEG” 两种图片格式，即 “.png”、“.jpg”、“.jpeg” 三种后缀的图片文件。

</Warning>



[ZegoWatermark](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoWatermark-class.html) 对象中的 [imageURL](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoWatermark/imageURL.html) 参数支持传两种路径格式。

<Accordion title="绝对路径" defaultOpen="false">
- Android：`file://[图片在 Android 设备中的绝对路径]`，需要将图片存放在 Android 设备的某目录中，例如 Android 的 App 的私有目录：“/sdcard/Android/data/im.zego.zegoexpressapp/ZegoLogo.png”。
- iOS：`file://[图片在 Bundle 中的绝对路径]`，需要将图片存放于项目 Bundle 内任意位置，通过 “NSBundle” 的 `pathForResource:ofType:` 方法获取图片的绝对路径，并加上 `file://` 前缀。

```dart
// 支持 JPG 与 PNG 格式的图片
String imageURL = "file:///sdcard/Android/data/im.zego.zegoexpressapp/ZegoLogo.png";
// 水印布局左上角为坐标系原点，区域不能超过编码分辨率设置的大小。若为空表示取消水印
var layout = Rect.fromLTWH(0,0,300,600);
var watermark = ZegoWatermark(imageURL, layout);
// 设置水印，支持推流过程中动态修改
ZegoExpressEngine.instance.setPublishWatermark.setPublishWatermark(watermark: watermark, isPreviewVisible: true);
```
</Accordion>

<Accordion title="Assets" defaultOpen="false">
`flutter-asset://[图片资源名称]`：需要在 `pubspec.yaml` 中声明资源文件的相对路径。

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Flutter/ZegoExpressEngine/flutter_assets.png" /></Frame>

```dart
// 支持 JPG 与 PNG 格式的图片
String imageURL = "flutter-asset://resources/images/ZegoLogo.png";

// 水印布局左上角为坐标系原点，区域不能超过编码分辨率设置的大小。若为空表示取消水印
var layout = Rect.fromLTWH(0,0,300,600);
var watermark = ZegoWatermark(imageURL,layout);
// 设置水印，支持推流过程中动态修改
ZegoExpressEngine.instance.setPublishWatermark.setPublishWatermark(watermark: watermark, isPreviewVisible: true);
```
</Accordion>

### 截图

1. 推流后，调用 [takePublishStreamSnapshot](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePublisher/takePublishStreamSnapshot.html) 接口对推流画面截图。

    ```dart
    ZegoExpressEngine.instance.takePublishStreamSnapshot().then((ZegoPublisherTakeSnapshotResult result) {
        // 保存图片
    });
    ```

2. 拉流后，调用 [takePlayStreamSnapshot](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePlayer/takePlayStreamSnapshot.html) 接口对拉流画面截图。

    ```dart
    ZegoExpressEngine.instance.takePlayStreamSnapshot(streamID).then((ZegoPlayerTakeSnapshotResult result) {
        // 保存图片
    });
    ```

## 常见问题

1. **[ZegoWatermark](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoWatermark-class.html) 中的 [imageURL](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoWatermark/imageURL.html) 如何指定？**

    支持 JPG 与 PNG 两种格式的图片，如果图片的路径为是设备上的绝对路径，[imageURL](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoWatermark/imageURL.html) 则须使用 `file://` 为前缀 + 设备上的绝对路径；

   如果路径是 Assets 形式，且图片是放在 Flutter 工程中，需要先在 `pubspec.yaml` 中声明资源文件的相对路径，[imageURL](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoWatermark/imageURL.html) 则须使用 “flutter-asset://” 作为前缀。

2. **[ZegoWatermark](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoWatermark-class.html) 中的 `layout` 如何指定？**

    水印的布局不能超过当前设置的推流的视频编码分辨率，对推流编码分辨率的设置可参考 [setVideoConfig](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePublisher/setVideoConfig.html) 接口。
