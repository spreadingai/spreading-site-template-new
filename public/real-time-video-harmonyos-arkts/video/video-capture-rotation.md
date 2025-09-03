# 视频采集旋转

- - -

## 功能简介

ZEGO 针对移动端提供 4 种采集旋转模式（固定比例模式、自适应模式、对齐模式及自定义模式），以简化开发者实现多端旋转表现时面临的复杂适配问题，如摄像头角度、分辨率、自动旋转、StatusBar（状态栏）位置适配等。您可以根据旋转表现和业务场景要求，通过 `setAppOrientationMode` 接口配置不同模式。

<Warning title="注意">


- 为保证预期的效果，需要推拉流端在一次通话或同一房间内都保持相同的模式。
- 推拉流版本需要同时保持 v2.23.0 版本以上，才能使用自适应以及对齐模式，因此建议您在新应用中使用。
- PC 端、Web 端以及混流服务已适配旋转模式，由于它们没有移动端的旋转特性，因此默认 StatusBar 在屏幕上方。
- 固定比例模式支持所有协议场景，自适应以及对齐模式仅支持 ZEGO RTC 私有协议以及 ZEGO 混流服务。 

</Warning>



### 固定比例模式

在固定比例模式下，视频输出方向相对 StatusBar 总是保持固定比例，视频画面比例取决于编码分辨率比例。

**优势**：固定比例模式适用于所有场景，也是直播场景中常用的模式。该模式在采集端已处理好视频画面的旋转，拉流端不需要额外处理，因此无直播分发渠道的兼容性问题。

编码比例为竖屏时，推流及拉流端表现如下：

- UI 固定为竖屏：

  <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Express/collection_rotate/fixed_UI_vertical.jpg" /></Frame>

- UI 不锁定（启用 App 屏幕自动旋转）：

  <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Express/collection_rotate/fixed_UI_rotate.jpg" /></Frame>

### 自适应模式

在自适应模式下，无论何种手持方式或 UI 方向，图像会总保持垂直地面向上。

**优势**：在自适应模式下，用户可以选择自己喜欢的手持方式进行视频通话，适用于 1v1 或多人视频的 RTC 场景，您也可以通过混流转推实现直播业务。

<Warning title="注意">


- 自适应模式不支持直推 CDN。如果您需要直播，可以通过 ZEGO 混流服务处理多人画面旋转表现后，再转推 CDN，如有需要，可联系 ZEGO 技术支持开通该配置。 
- 自适应模式在 ZEGO 私有传输协议中记录了摄像头角度、手持方式、StatusBar 位置等信息，因此仅支持 ZEGO RTC 协议及 ZEGO 混流服务。

</Warning>



表现如下：

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Express/collection_rotate/Adaptive_mode.jpg" /></Frame>

### 对齐模式

在对齐模式下，以 StatusBar 作为参考，播放端的视频方向与推流端预览的视频方向一致。播放端会以 StatusBar 作为参考对图像进行旋转，播放端的旋转角度和推流端预览的旋转角度一致。

**优势**：对齐模式与自适应模式类似，但用户可以结合自动旋转开关和手持方式，主动调整满屏或等比缩放的画面表现，适用于 1v1 或多人视频的 RTC 场景。

<Warning title="注意">


- 对齐模式不支持直推 CDN。如果您需要直播，可以通过 ZEGO 混流服务处理多人画面旋转表现后，再转推 CDN，如有需要，可联系 ZEGO 技术支持开通该配置。
- 对齐模式在ZEGO私有传输协议中记录了摄像头角度、手持方式、StatusBar 位置等信息，因此仅支持 ZEGO RTC 协议及 ZEGO 混流服务。

</Warning>



- UI 固定为竖屏时：

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Express/collection_rotate/alignment_UI_vertical.jpg" /></Frame>

- UI 固定为横屏时：

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Express/collection_rotate/alignment_UI_horizontal.jpg" /></Frame>

- UI 不锁定（启用 App 屏幕自动旋转）：

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Express/collection_rotate/alignment_UI_rotate.jpg" /></Frame>

### 自定义模式（默认）

在自定义模式下，您可以根据需求自定义视频采集旋转的表现形式，实现方式更加灵活，具体实现步骤，请参考 [如何自定义视频采集旋转方式？](http://doc-zh.zego.im/faq/express_video_capture_rotation?product=ExpressVideo&platform=ios)


## 实现流程

<Warning title="注意">


以下实现流程仅适用于固定比例模式、自适应模式及对齐模式，如需自定义视频采集旋转方式，请参考 [如何自定义视频采集旋转方式？](http://doc-zh.zego.im/faq/express_video_capture_rotation?product=ExpressVideo&platform=android)


</Warning>



### 推流端

推流端需要调用 [setAppOrientationMode ](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/ets_ohos/classes/_zegoexpressengine_.zegoexpressengine.html#setapporientationmode) 接口设置任意一种采集旋转模式。

<Warning title="注意">


请在调用 [createEngine](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/ets_ohos/classes/_zegoexpressengine_.zegoexpressengine.html#createengine) 后立刻调用 [setAppOrientationMode](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/ets_ohos/classes/_zegoexpressengine_.zegoexpressengine.html#setapporientationmode) 接口，再调用 [startPublishingStream](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/ets_ohos/classes/_zegoexpressengine_.zegoexpressengine.html#startpublishingstream) 或 [startPreview](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/ets_ohos/classes/_zegoexpressengine_.zegoexpressengine.html#startpreview) 接口。
 

</Warning>



<CodeGroup>
  ```ts title="设置为固定比例模式"
ZegoExpressEngine.getInstance().setAppOrientationMode(ZegoOrientationMode.FixedResolutionRatio);
  ```
  
  ```ts title="设置为自适应模式"
ZegoExpressEngine.getInstance().setAppOrientationMode(ZegoOrientationMode.Adaption);
  ```
  
  ```ts title="设置为对齐模式"
ZegoExpressEngine.getInstance().setAppOrientationMode(ZegoOrientationMode.Alignment);
  ```
</CodeGroup>

### 拉流端

**仅自适应模式下**，拉流端需要在拉流前调用 [setAppOrientationMode](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/ets_ohos/classes/_zegoexpressengine_.zegoexpressengine.html#setapporientationmode) 接口设置自适应模式。

<Warning title="注意">



- 请在调用 [createEngine](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/ets_ohos/classes/_zegoexpressengine_.zegoexpressengine.html#createengine) 后，立刻调用 [setAppOrientationMode](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/ets_ohos/classes/_zegoexpressengine_.zegoexpressengine.html#setapporientationmode) 接口设置视频的朝向模式，再调用 [startPlayingStream](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/ets_ohos/classes/_zegoexpressengine_.zegoexpressengine.html#startplayingstream) 开始拉流。 
- 自适应模式下，仅支持从 RTC 拉流。

</Warning>



```ts
ZegoExpressEngine.getInstance().setAppOrientationMode(ZegoOrientationMode.Adaption);
```
