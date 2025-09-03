# 水印和截图

- - -

## 功能简介

当需要为教育类的教学课件设置版权方 Logo 等场景下，可使用 SDK 的水印功能来实现。

本文主要讲述如何利用 SDK 实现水印和截图功能。

## 示例源码下载

请参考 [下载示例源码](https://doc-zh.zego.im/article/3125) 获取源码。

相关源码请查看 “/ZegoExpressExample/Others/src/main/java/im/zego/others/beautyandwatermarkandsnapshot” 目录下的文件。

## 前提条件

在实现水印和截图功能之前，请确保：

- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppID 和 AppSign，详情请参考 [控制台 - 项目信息](/console/project-info)。
- 已在项目中集成 ZEGO Express SDK，并实现了基本的音视频推拉流功能，详情请参考 [快速开始 - 集成](https://doc-zh.zego.im/article/195) 和 [快速开始 - 实现流程](https://doc-zh.zego.im/article/7627)。


## 使用步骤

### 水印

调用 [ZegoWatermark](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~ZegoWatermark) 配置一个水印的图片 URL 以及该水印在画面中的大小方位。

调用 [setPublishWatermark](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~ZegoExpressEngine#set-publish-watermark) 接口设置推流水印。

<Warning title="注意">

水印图片只支持 “PNG” 与 “JPEG” 两种图片格式，即 “.png”、“.jpg”、“.jpeg” 三种后缀的图片文件。
</Warning>

[ZegoWatermark](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~ZegoWatermark) 对象中的 [imageURL](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~ZegoWatermark#image-url) 参数支持传三种路径格式：绝对路径、Assets、Android URI 路径。

<Accordion title="绝对路径" defaultOpen="false">
`file://[图片在 Android 设备中的绝对路径]`：需要将图片存放在 Android 设备的某目录中，例如 Android 的 app 的私有目录：“/sdcard/Android/data/im.zego.zegoexpressapp/ZegoLogo.png”。

```java
// 支持 JPG 与 PNG 格式的图片, 如果图片是放在 Android 工程的资产 assets 目录, imageURL 则须使用 "asset://" 作为前缀, 如果是设备上的绝对路径, imageURL 则须使用 "file://" 为前缀 + 设备上的绝对路径
String imageURL = "file:///sdcard/Android/data/im.zego.zegoexpressapp/ZegoLogo.png";

// 水印布局左上角为坐标系原点，区域不能超过编码分辨率设置的大小。若为空表示取消水印
Rect layout = new Rect(0,0,300,600);
ZegoWatermark watermark = new ZegoWatermark(imageURL, layout);
// 设置水印，支持推流过程中动态修改
sdk.setPublishWatermark(watermark, true);
```
</Accordion>


<Accordion title="Assets" defaultOpen="false">
`asset://[图片资源名称]`：需要将图片存放在 Android 工程的 “assets” 目录中。

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Android/ExpressSDK/WaterMark/android_asset.png" /></Frame>

```java
// 支持 JPG 与 PNG 格式的图片, 如果图片是放在 Android 工程的资产 assets 目录, imageURL 则须使用 "asset://" 作为前缀, 如果是设备上的绝对路径, imageURL 则须使用 "file://" 为前缀 + 设备上的绝对路径
String imageURL = "asset://ZegoLogo.png";

// 水印布局左上角为坐标系原点，区域不能超过编码分辨率设置的大小。若为空表示取消水印
Rect layout = new Rect(0,0,300,600);
ZegoWatermark watermark = new ZegoWatermark(imageURL,layout);
// 设置水印，支持推流过程中动态修改
sdk.setPublishWatermark(watermark, true);
```
</Accordion>

<Accordion title="Android URI 路径" defaultOpen="false">
Android URI 路径形式为：`String path = "uri://" + uri.toString();`

```java
// 必须使用 "uri://" 作为前缀
String imageURL = "uri://" + "content://com.android.providers.media.documents/document/image%3A1353";

// 水印布局左上角为坐标系原点，区域不能超过编码分辨率设置的大小。若为空表示取消水印
Rect layout = new Rect(0,0,300,600);
ZegoWatermark watermark = new ZegoWatermark(imageURL,layout);
// 设置水印，支持推流过程中动态修改
sdk.setPublishWatermark(watermark, true);
```
</Accordion>


### 截图

1. 推流后，调用 [takePublishStreamSnapshot ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~ZegoExpressEngine#take-publish-stream-snapshot) 接口对推流画面截图。

    ```java
    engine.takePublishStreamSnapshot(new IZegoPublisherTakeSnapshotCallback() {
        @Override
        public void onPublisherTakeSnapshotResult(int errorCode, Bitmap image) {
            //保存图片
        }
    });
    ```

2. 拉流后，调用 [takePlayStreamSnapshot ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~ZegoExpressEngine#take-play-stream-snapshot) 接口对拉流画面截图。

    ```java
    engine.takePlayStreamSnapshot(streamID,new IZegoPlayerTakeSnapshotCallback() {
        @Override
        public void onPlayerTakeSnapshotResult(int errorCode, Bitmap image) {
            //保存图片
        }
    });
    }
    ```

## 常见问题

1. **[ZegoWatermark](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~ZegoWatermark) 中的 [imageURL](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~ZegoWatermark#image-url) 如何指定？**

    支持 JPG 与 PNG 两种格式的图片，如果图片是放在 Android 工程的 “assets” 目录文件夹中，imageURL 则须使用 “asset://” 作为前缀，如果是设备上的绝对路径，imageURL 则须使用 “file://” 为前缀 + 设备上的绝对路径。

2. **[ZegoWatermark](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~ZegoWatermark) 中的 layout 如何指定？**

    水印的布局不能超过当前设置的推流的视频编码分辨率，对推流编码分辨率的设置可参考 [setVideoConfig](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~ZegoMixerOutput#set-video-config) 接口。
