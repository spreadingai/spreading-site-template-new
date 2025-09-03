# 水印和截图

- - -

## 功能简介

当需要为教育类的教学课件设置版权方 Logo 等场景下，可使用 SDK 的水印功能来实现。

本文主要讲述如何利用 SDK 实现水印和截图功能。

## 示例源码下载

请参考 [下载示例源码](https://doc-zh.zego.im/article/13411) 获取源码。

相关源码请查看 “/ZegoExpressExample/Examples/Others/Beautify” 文件。

## 前提条件

在实现水印和截图功能之前，请确保：

- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppID 和 AppSign，详情请参考 [控制台 - 项目信息](/console/project-info)。
- 已在项目中集成 ZEGO Express SDK，并实现了基本的音视频推拉流功能，详情请参考 [快速开始 - 集成](https://doc-zh.zego.im/article/13413) 和 [快速开始 - 实现流程](https://doc-zh.zego.im/article/13415)。


## 使用步骤

### 水印

调用 [ZegoWatermark](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoWatermark) 配置一个水印的图片 URL 以及该水印在画面中的大小方位。

调用 [setPublishWatermark](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoExpressEngine#set-publish-watermark-is-preview-visible) 接口设置推流水印。
<Warning title="注意">
水印图片只支持 “PNG” 与 “JPEG” 两种图片格式，即 “.png”、“.jpg”、“.jpeg” 三种后缀的图片文件。
</Warning>

[ZegoWatermark](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoWatermark) 对象中的 [imageURL](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoWatermark#image-url) 参数支持传两种路径格式：绝对路径和 Assets。

<Accordion title="绝对路径" defaultOpen="false">
`file://[图片在 Bundle 中的绝对路径]`：需要将图片存放于项目 Bundle 内任意位置，通过 `NSBundle` 的 `pathForResource:ofType:` 方法获取图片的绝对路径，并加上 “file://” 前缀。

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/iOS/ZegoExpressEngine/Beautify/watermark-bundle.png" /></Frame>

```objc
ZegoWatermark *watermark = [[ZegoWatermark alloc] init];

NSString *imagePath = [[NSBundle mainBundle] pathForResource:@"ZegoLogo" ofType:@"png"];
watermark.imageURL = [NSString stringWithFormat:@"file://%@", imagePath];
// 水印布局左上角为坐标系原点，区域不能超过编码分辨率设置的大小。若为空表示取消水印
watermark.layout = CGRectMake(0, 0, 200, 200);
// 设置水印，支持在推流前后动态修改
[self.engine setPublishWatermark:watermark isPreviewVisible:YES];
```
</Accordion>

<Accordion title="Assets" defaultOpen="false">
`asset://[图片资源名称]`：需要将图片存放在 iOS 工程自带的 “Assets.xcassets” 中。

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/iOS/ZegoExpressEngine/Beautify/watermark-assets.png" /></Frame>

```objc
ZegoWatermark *watermark = [[ZegoWatermark alloc] init];
watermark.imageURL = @"asset://ZegoLogo";
// 水印布局左上角为坐标系原点，区域不能超过编码分辨率设置的大小。若为空表示取消水印
watermark.layout = CGRectMake(0, 0, 200, 200);
// 设置水印，支持在推流前后动态修改
[self.engine setPublishWatermark:watermark isPreviewVisible:YES];
```
</Accordion>

### 截图

1. 推流后，调用 [takePublishStreamSnapshot ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoExpressEngine#take-publish-stream-snapshot) 接口对推流画面截图。

    ```objc
    [[ZegoExpressEngine sharedEngine] takePublishStreamSnapshot:^(int errorCode, ZGImage * _Nullable image) {

        if (errorCode == ZegoErrorCodeCommonSuccess && image) {
            UIImageView *imageView = [[UIImageView alloc] initWithFrame:CGRectMake(0, 0, UIScreen.mainScreen.bounds.size.width / 2, UIScreen.mainScreen.bounds.size.height / 2)];
            imageView.image = image;
            imageView.contentMode = UIViewContentModeScaleAspectFit;
        }
    }];
    ```

2. 拉流后，调用 [takePlayStreamSnapshot ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoExpressEngine#take-play-stream-snapshot-callback) 接口对拉流画面截图。

    ```objc
    [[ZegoExpressEngine sharedEngine] takePlayStreamSnapshot:self.streamID callback:^(int errorCode, ZGImage * _Nullable image) {
        if (errorCode == ZegoErrorCodeCommonSuccess && image) {
            UIImageView *imageView = [[UIImageView alloc] initWithFrame:CGRectMake(0, 0, UIScreen.mainScreen.bounds.size.width / 2, UIScreen.mainScreen.bounds.size.height / 2)];
            imageView.image = image;
            imageView.contentMode = UIViewContentModeScaleAspectFit;
        }
    }];
    ```

## 常见问题

1. **[ZegoWatermark](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoWatermark) 中的 layout 如何指定？**

    水印的布局不能超过当前设置的推流的视频编码分辨率，对推流编码分辨率的设置可参考 [setVideoConfig](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoMixerOutput#set-video-config) 接口。

<Content />

