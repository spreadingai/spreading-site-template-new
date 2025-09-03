# 水印和截图

- - -

## 功能简介

当需要为教育类的教学课件设置版权方 Logo 等场景下，可使用 SDK 的水印功能来实现。

本文主要讲述如何利用 SDK 实现水印和截图功能。

<Warning title="注意">

Web 目前不支持水印和截图功能。

</Warning>



## 前提条件

在实现水印和截图功能之前，请确保：

- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppID 和 AppSign，详情请参考 [控制台 - 项目信息](/console/project-info)。
- 已在项目中集成 ZEGO Express SDK，并实现了基本的音视频推拉流功能，详情请参考 [快速开始 - 集成](https://doc-zh.zego.im/article/21045) 和 [快速开始 - 实现流程](https://doc-zh.zego.im/article/21030)。


## 使用步骤

### 水印

调用 [ZegoWatermark](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/classes/_zegoexpressdefines_.zegowatermark.html) 配置一个水印的图片 URL 以及该水印在画面中的大小方位。

调用 [setPublishWatermark](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/classes/_zegoexpressengine_.zegoexpressengine.html#setpublishwatermark) 接口设置推流水印。

<Warning title="注意">


水印图片只支持 “PNG” 与 “JPEG” 两种图片格式，即 “.png”、“.jpg”、“.jpeg” 三种后缀的图片文件。

</Warning>



[ZegoWatermark](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/classes/_zegoexpressdefines_.zegowatermark.html) 对象中的 [imageURL](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/classes/_zegoexpressdefines_.zegowatermark.html#imageurl) 参数支持传绝对路径的形式。

`file://[图片资源名称]`：需要将图片存放在工程目录中，例如工程目录：“/static/logo.png”，通过 uni-app 提供 `plus.io.convertLocalFileSystemURL` 获取绝对路径。

```javascript
// 支持 JPG 与 PNG 格式的图片, imageURL 则须使用 "file://" 为前缀 + 设备上的绝对路径
let imagePath = 'file:' + plus.io.convertLocalFileSystemURL('/static/logo.png');

// 水印布局左上角为坐标系原点，区域不能超过编码分辨率设置的大小。若为空表示取消水印
let layout = {x:0,y:0,width:300,height:600};
let watermark = {"imagePath": imagePath, "layout": layout};

// 设置水印，支持推流过程中动态修改
ZegoExpressEngine.instance().setPublishWatermark(watermark, true);
```

### 截图

1. 推流后，调用 [takePublishStreamSnapshot ](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/classes/_zegoexpressengine_.zegoexpressengine.html#takepublishstreamsnapshot) 接口对推流画面截图。

    ```javascript
    ZegoExpressEngine.instance().takePublishStreamSnapshot.then((result) {
        if (result.errorCode) {
            // 判断截图是否成功
        }
        if (result.image) {
            // 保存图片
        }
    ```

2. 拉流后，调用 [takePlayStreamSnapshot ](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/classes/_zegoexpressengine_.zegoexpressengine.html#takeplaystreamsnapshot) 接口对拉流画面截图。

    ```javascript
    ZegoExpressEngine.instance().takePlayStreamSnapshot.then((result) {
        if (result.errorCode) {
            // 判断截图是否成功
        }
        if (result.image) {
            // 保存图片
        }
    ```

## 常见问题

1. **[ZegoWatermark](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/classes/_zegoexpressdefines_.zegowatermark.html) 中的 [imageURL](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/classes/_zegoexpressdefines_.zegowatermark.html#imageurl) 如何指定？**

   支持 JPG 与 PNG 两种格式的图片，imageURL 则须使用 `file://` 为前缀 + 设备上的绝对路径。

2. **[ZegoWatermark](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/classes/_zegoexpressdefines_.zegowatermark.html) 中的 `layout` 如何指定？**

   水印的布局不能超过当前设置的推流的视频编码分辨率，对推流编码分辨率的设置可参考 [setVideoConfig](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/classes/_zegoexpressengine_.zegoexpressengine.html#setvideoconfig) 接口。

<Content />

