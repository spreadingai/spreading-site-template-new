# 水印和截图

- - -

## 功能简介

当需要为教育类的教学课件设置版权方 Logo 等场景下，可使用 SDK 的水印功能来实现。

本文主要讲述如何利用 SDK 实现水印和截图功能。

## 示例源码下载

请参考 [下载示例源码](https://doc-zh.zego.im/article/13412) 获取源码。

相关源码请查看 “/ZegoExpressExample/Examples/CommonFeatures/WatermarkSnapshot” 目录下的文件。

## 前提条件

在实现水印和截图功能之前，请确保：

- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppID 和 AppSign，详情请参考 [控制台 - 项目信息](/console/project-info)。
- 已在项目中集成 ZEGO Express SDK，并实现了基本的音视频推拉流功能，详情请参考 [快速开始 - 集成](https://doc-zh.zego.im/article/13414) 和 [快速开始 - 实现流程](https://doc-zh.zego.im/article/13416)。


## 使用步骤


### 水印


调用 [setPublishWatermark ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoExpressEngine#set-publish-watermark) 接口设置推流水印。

<Warning title="注意">
水印图片只支持 “PNG” 与 “JPEG” 两种图片格式，即 “.png”、“.jpg”、“.jpeg” 三种后缀的图片文件。
</Warning>

[ZegoWatermark](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~struct~ZegoWatermark) 对象中的 [imageURL](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~struct~ZegoWatermark#image-url) 参数当前只支持 “本地文件传输协议”，即 `file:///+绝对路径的形式`。

```cpp
ZegoWatermark watermark;
watermark.imageURL = "file:///D:/ZegoLogo.png";
// 水印布局左上角为坐标系原点，区域不能超过编码分辨率设置的大小。若为空表示取消水印
watermark.layout = ZegoRect(0, 0, 200, 200);
// 设置水印，支持推流过程中动态修改
engine->setPublishWatermark(&watermark, true);
```

### 截图

1. 推流后，调用 [takePublishStreamSnapshot ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoExpressEngine#take-publish-stream-snapshot) 接口对推流画面截图。

    ```cpp
    engine->takePublishStreamSnapshot([=](/live-streaming-windows/video/int-errorcode,-void*-snapshot){
        if(errorCode == 0){
            // 保存为图片
        }
    });
    ```

2. 拉流后，调用 [takePlayStreamSnapshot ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoExpressEngine#take-play-stream-snapshot) 接口对拉流画面截图。

    ```cpp
    engine->takePlayStreamSnapshot("streamID", [=](/live-streaming-windows/video/int-errorcode,-void*-snapshot){
        if(errorCode == 0){
            // 保存为图片
        }
    });
    ```

## 常见问题

1. **[ZegoWatermark](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~struct~ZegoWatermark) 中的 [imageURL](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~struct~ZegoWatermark#image-url) 如何指定？**

    “imageURL” 当前只支持 “本地文件传输协议”，即 “file:///+绝对路径的形式”。

    例如：“file:///D:/ZegoLogo.png”。

2. **[ZegoWatermark](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~struct~ZegoWatermark) 中的 “layout” 如何指定？**

    水印的布局不能超过当前设置的推流的视频编码分辨率，对推流编码分辨率的设置请参考 [setVideoConfig ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoExpressEngine#set-video-config) 接口。

<Content />
