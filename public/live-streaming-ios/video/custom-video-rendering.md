# 自定义视频渲染

- - -

## 功能简介

自定义视频渲染指的是 SDK 向外部提供本地预览及远端拉流的视频帧数据，供用户自行渲染。

当开发者业务中出现以下情况时，推荐使用 SDK 的自定义视频渲染功能：

- App 使用了跨平台界面框架（例如 Qt 需要有复杂层级关系的界面以实现高体验的交互）或游戏引擎（例如 Unity、Unreal Engine、Cocos 等）。
- App 需要获取 SDK 采集或拉流的视频帧数据进行特殊处理。


## 示例源码下载

请参考 [下载示例源码](https://doc-zh.zego.im/article/13411) 获取源码。

相关源码请查看 "ZegoExpressExample/Examples/AdvancedVideoProcessing/CustomVideoRender" 目录下的文件。


## 前提条件

在实现自定义视频渲染功能之前，请确保：

- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppID 和 AppSign，详情请参考 [控制台 - 项目信息](/console/project-info)。
- 已在项目中集成 ZEGO Express SDK，并实现了基本的音视频推拉流功能，详情请参考 [快速开始 - 集成](https://doc-zh.zego.im/article/13413) 和 [快速开始 - 实现流程](https://doc-zh.zego.im/article/13415)。



## 使用步骤

自定义视频渲染的使用流程如下：
API 接口调用的时序图如下：
    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Common/ZegoExpressEngine/custom_video_render_uml_iOS_new.png" /></Frame>

### 1 设置自定义视频渲染配置

 ####  创建 [ZegoCustomVideoRenderConfig](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoCustomVideoRenderConfig) 对象并配置参数。

`bufferType` 参数是枚举 [ZegoVideoBufferType](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~enum~ZegoVideoBufferType)，可指定开发者需要的自定义视频渲染视频帧数据类型，目前仅支持裸数据类型 `ZegoVideoBufferTypeRawData`、CVPixelBuffer 类型 `ZegoVideoBufferTypeCVPixelBuffer` 及 `ZegoVideoBufferTypeEncodedData`，设置其他不支持的枚举值，将不会回调视频帧数据。

`frameFormatSeries` 参数是枚举 [ZegoVideoFrameFormatSeries](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~enum~ZegoVideoFrameFormatSeries)，可指定开发者需要的自定义视频渲染视频帧数据格式，此参数只能指定 RGB 或 YUV 颜色空间大类，具体的数据格式不同平台间不一致，以回调中的参数为准。
<Warning title="注意">


若回调中的数据格式与您预期不符，请联系 ZEGO 技术支持处理。
</Warning>

- `ZegoVideoFrameFormatSeriesRGB`：返回 BGRA。
- `ZegoVideoFrameFormatSeriesYUV`：返回 I420。

[enableEngineRender](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoCustomVideoRenderConfig#enable-engine-render) 表示是否在要自定义视频渲染的同时，SDK 内部也渲染。设置为 "NO" 时，引擎不会在预览接口 [startPreview](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoExpressEngine#start-preview) 和拉流接口 [startPlayingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoExpressEngine#start-playing-stream-canvas) 设置的 View 上渲染。

- 接口原型

    ```objc
    // 自定义视频渲染配置
    @interface ZegoCustomVideoRenderConfig : NSObject

    // 自定义视频渲染视频帧数据类型
    @property (nonatomic, assign) ZegoVideoBufferType bufferType;

    // 自定义视频渲染视频帧数据格式
    @property (nonatomic, assign) ZegoVideoFrameFormatSeries frameFormatSeries;

    // 是否在自定义视频渲染的同时，引擎也渲染
    @property (nonatomic, assign) BOOL enableEngineRender;

    // 开始或停止自定义视频渲染
    //
    // 必须在引擎启动前设置，即在调用 [startPreview]、[startPublishing]、[startPlayingStream] 之前设置；且在引擎停止之后才能修改配置
    // 当开发者开启自定义渲染时，通过调用 [setCustomVideoRenderHandler] 可设置接收本地以及远端的视频帧数据以用于自定义渲染
    //
    // @param enable 是否开启
    // @param config 自定义渲染配置
    - (void)enableCustomVideoRender:(BOOL)enable config:(nullable ZegoCustomVideoRenderConfig *)config;
    ```

#### 调用 [enableCustomVideoRender](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoExpressEngine#enable-custom-video-render-config) 接口开启自定义视频渲染。

创建 [ZegoCustomVideoRenderConfig](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoCustomVideoRenderConfig) 对象并配置参数后，再调用 [enableCustomVideoRender](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoExpressEngine#enable-custom-video-render-config) 接口开启自定义视频渲染。

- 调用示例

    ```objc
    ZegoCustomVideoRenderConfig *renderConfig = [[ZegoCustomVideoRenderConfig alloc] init];
    // 选择 CVPixelBuffer 类型视频帧数据
    renderConfig.bufferType = ZegoVideoBufferTypeCVPixelBuffer;
    // 选择 RGB 色系数据格式
    renderConfig.frameFormatSeries = ZegoVideoFrameFormatSeriesRGB;
    // 指定在自定义视频渲染的同时引擎也渲染
    renderConfig.enableEngineRender = YES;

    [[ZegoExpressEngine sharedEngine] enableCustomVideoRender:YES config:renderConfig];
    ```

### 2 设置自定义视频渲染器对象并实现回调方法

调用 [setCustomVideoRenderHandler](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoExpressEngine#set-custom-video-render-handler) 接口设置自定义视频渲染回调。

- 接口原型

    ```objc
    // 设置自定义视频渲染回调
    //
    // 自定义视频渲染，由开发者负责把视频数据渲染到 UI 组件上。该功能一般为使用第三方美颜功能或使用第三方渲染框架的开发者使用。
    // 当开发者使用 SDK 的自定义视频渲染的高级功能时需要调用此接口来设置给开发者抛视频数据的回调对象。
    // 当开发者调用启动预览 [startPreview]、开始推流 [startPublishingStream]、开始拉流 [startPlayingStream] 时会触发向开发者抛视频数据的回调方法。
    // 开发者可根据 SDK 抛视频数据的回调进行视频画面的渲染。
    // 自定义视频渲染功能可以与自定义视频采集功能同时使用。
    //
    // @param handler 自定义视频渲染回调对象
    - (void)setCustomVideoRenderHandler:(nullable id<ZegoCustomVideoRenderHandler>)handler;
    ```

    其中的自定义视频渲染回调协议 [ZegoCustomVideoRenderHandler](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~protocol~ZegoCustomVideoRenderHandler) 定义如下：

    ```objc
    @protocol ZegoCustomVideoRenderHandler <NSObject>

    @optional

    // 本地预览视频帧裸数据回调
    //
    // @param data 视频帧的裸数据（例：RGBA 只需考虑 data[0]，I420 需考虑 data[0,1,2]）
    // @param dataLength 数据的长度（例：RGBA 只需考虑 dataLength[0]，I420 需考虑 dataLength[0,1,2]）
    // @param param 视频帧参数
    // @param flipMode 视频帧翻转模式
    // @param channel 推流通道
    - (void)onCapturedVideoFrameRawData:(unsigned char * _Nonnull * _Nonnull)data dataLength:(unsigned int *)dataLength param:(ZegoVideoFrameParam *)param flipMode:(ZegoVideoFlipMode)flipMode channel:(ZegoPublishChannel)channel;

    // 远端拉流视频帧裸数据回调，通过 streamID 区分不同的流
    //
    // @param data 视频帧的裸数据（例：RGBA 只需考虑 data[0]，I420 需考虑 data[0,1,2]）
    // @param dataLength 数据的长度（例：RGBA 只需考虑 dataLength[0]，I420 需考虑 dataLength[0,1,2]）
    // @param param 视频帧参数
    // @param streamID 拉流的流 ID
    - (void)onRemoteVideoFrameRawData:(unsigned char * _Nonnull * _Nonnull)data dataLength:(unsigned int *)dataLength param:(ZegoVideoFrameParam *)param streamID:(NSString *)streamID;

    // 本地预览视频帧 CVPixelBuffer 数据回调，通过 streamID 区分不同的流
    //
    // @param buffer 封装为 CVPixelBuffer 的视频帧数据
    // @param param 视频帧参数
    // @param flipMode 视频帧翻转模式
    // @param channel 推流通道
    - (void)onCapturedVideoFrameCVPixelBuffer:(CVPixelBufferRef)buffer param:(ZegoVideoFrameParam *)param flipMode:(ZegoVideoFlipMode)flipMode channel:(ZegoPublishChannel)channel;

    // 远端拉流视频帧 CVPixelBuffer 数据回调，通过 streamID 区分不同的流
    //
    // @param buffer 封装为 CVPixelBuffer 的视频帧数据
    // @param param 视频帧参数
    // @param streamID 拉流的流 ID
    - (void)onRemoteVideoFrameCVPixelBuffer:(CVPixelBufferRef)buffer param:(ZegoVideoFrameParam *)param streamID:(NSString *)streamID;

    @end
    ```

- 调用示例

    ```objc
    @interface ViewController () <ZegoEventHandler, ZegoCustomVideoRenderHandler>

    ......

    // 设置自定义视频渲染回调

    // 将自身作为自定义视频渲染回调对象
    [[ZegoExpressEngine sharedEngine] setCustomVideoRenderHandler:self];

    // 实现本地预览采集的视频帧回调方法
    // 当 `ZegoCustomVideoRenderConfig.bufferType` 设为裸数据 `ZegoVideoBufferTypeRawData` 时, 本地预览采集到的视频帧裸数据将会从此方法中回调
    - (void)onCapturedVideoFrameRawData:(unsigned char * _Nonnull *)data dataLength:(unsigned int *)dataLength param:(ZegoVideoFrameParam *)param flipMode:(ZegoVideoFlipMode)flipMode {
        NSLog(@"raw data video frame callback. format:%d, width:%f, height:%f, isNeedFlip:%d", (int)param.format, param.size.width, param.size.height, (int)flipMode);
    }

    // 当 `ZegoCustomVideoRenderConfig.bufferType` 设为 `ZegoVideoBufferTypeCVPixelBuffer` 时, 本地预览采集到的 CVPixelBuffer 视频帧将会从此方法中回调
    - (void)onCapturedVideoFrameCVPixelBuffer:(CVPixelBufferRef)buffer param:(ZegoVideoFrameParam *)param flipMode:(ZegoVideoFlipMode)flipMode {
        NSLog(@"pixel buffer video frame callback. format:%d, width:%f, height:%f, isNeedFlip:%d", (int)param.format, param.size.width, param.size.height, (int)flipMode);
    }

    // 实现远端拉流的视频帧回调方法
    // 当 `ZegoCustomVideoRenderConfig.bufferType` 设为裸数据 `ZegoVideoBufferTypeRawData` 时, 远端拉流的视频帧裸数据将会从此方法中回调, 通过 streamID 标识本次回调的是哪条拉的流的数据
    - (void)onRemoteVideoFrameRawData:(unsigned char * _Nonnull * _Nonnull)data dataLength:(unsigned int *)dataLength param:(ZegoVideoFrameParam *)param streamID:(NSString *)streamID {
        NSLog(@"raw data video frame callback. format:%d, width:%f, height:%f", (int)param.format, param.size.width, param.size.height);
    }

    // 当 `ZegoCustomVideoRenderConfig.bufferType` 设为 `ZegoVideoBufferTypeCVPixelBuffer` 时, 远端拉流的 CVPixelBuffer 视频帧将会从此方法中回调, 通过 streamID 标识本次回调的是哪条拉的流的数据
    - (void)onRemoteVideoFrameCVPixelBuffer:(CVPixelBufferRef)buffer param:(ZegoVideoFrameParam *)param streamID:(NSString *)streamID {
        NSLog(@"pixel buffer video frame callback. format:%d, width:%f, height:%f", (int)param.format, param.size.width, param.size.height);
    }
    ```

<Note title="说明">
本地预览采集视频帧回调方法中的 `flipMode` 参数与镜像有关，通知开发者是否需要自行将视频帧画面做翻转，以使画面符合 [setVideoMirrorMode](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoExpressEngine#set-video-mirror-mode) 中设置的 [ZegoVideoMirrorMode](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~enum~ZegoVideoMirrorMode) 枚举值的描述。
</Note>

以上回调方法中的 `param` 参数（[ZegoVideoFrameParam](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoVideoFrameParam) 对象）描述了该视频帧的一些参数，定义如下：

```objc
// 视频帧的参数对象
//
// 包括视频帧的格式、宽高等
@interface ZegoVideoFrameParam : NSObject

// 视频帧的格式
@property (nonatomic, assign) ZegoVideoFrameFormat format;

// 每个平面一行字节数（此参数为 int 数组，数组长度为4，RGBA 只需考虑 strides[0]，I420 需考虑 strides[0,1,2]）
@property (nonatomic, assign) int *strides;

// 视频帧的画面尺寸
@property (nonatomic, assign) CGSize size;

@end
```

其中 "format" 标识了该视频帧的具体数据格式，"strides" 为数组，描述每个平面一行字节数，"size" 描述视频帧的画面尺寸。"strides" 和图像之间的关系如图：
<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/share/strides_new.png" /></Frame>


### 3 自定义视频渲染视频帧数据回调

#### 推流预览渲染

推流方首先需要调用启动预览接口，才能收到自定义视频渲染视频帧数据回调，如果 [ZegoCustomVideoRenderConfig](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoCustomVideoRenderConfig) 自定义视频渲染配置的 "enableEngineRender" 参数为 "NO"，启动预览的 `canvas` 参数可以传空，启动预览后即可开始推流。

```objc
// 如需在自定义视频渲染同时内部也渲染，可将 `ZegoCustomVideoRenderConfig` 的 `enableEngineRender` 参数设为 `YES`，然后在预览时传入内部渲染的 View
ZegoCanvas *previewCanvas = [ZegoCanvas canvasWithView:self.previewView];
[[ZegoExpressEngine sharedEngine] startPreview:previewCanvas];

// 如仅需自定义视频渲染，可将 `ZegoCustomVideoRenderConfig` 的 `enableEngineRender` 参数设为 `NO`，`canvas` 参数传空即可，但也必须调用此接口，否则自定义视频渲染将不会回调预览视频帧数据
[[ZegoExpressEngine sharedEngine] startPreview:nil];

// 开始预览后，此时将会收到自定义视频渲染预览视频帧数据回调

// 开始推流
[[ZegoExpressEngine sharedEngine] startPublishing:self.streamID];
```

#### 拉流渲染

推流成功后，可调用 [ZegoCustomVideoRenderConfig](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoCustomVideoRenderConfig) 中 [enableEngineRender](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoCustomVideoRenderConfig#enable-engine-render) 进行设置拉流渲染参数。再调用 [startPlayingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoExpressEngine#start-playing-stream-canvas) 进行拉流。

至此，App 成功获得 SDK 回调的视频帧数据，用于实际的渲染动作或者进行深加工操作。

```objc
// 如需在自定义视频渲染同时内部也渲染，可将 `ZegoCustomVideoRenderConfig` 的 `enableEngineRender` 参数设为 `YES`，然后在拉流时传入内部渲染的 View
ZegoCanvas *playCanvas = [ZegoCanvas canvasWithView:self.playView];
[[ZegoExpressEngine sharedEngine] startPlayingStream:self.streamID canvas:playCanvas];

// 如仅需自定义视频渲染，可将 `ZegoCustomVideoRenderConfig` 的 `enableEngineRender` 参数设为 `NO`，`canvas` 参数传空即可
[[ZegoExpressEngine sharedEngine] startPlayingStream:self.streamID canvas:nil];

// 开始拉流后，此时将会收到拉的这条流的自定义视频渲染视频帧数据回调
```

## 常见问题

1. **自定义视频渲染，分了本地采集预览自定义视频渲染和远端拉流自定义视频渲染，分别有什么作用？什么场景下使用？**

    本地采集预览自定义视频渲染是让主播看到额外的渲染效果，在原视频画面基础上加上特效等；远端拉流自定义视频渲染是让观众看到不同的渲染画面，可以根据观众的喜好，在拉流画面的基础上加上特效。

2. **如果自定义视频渲染在配置 [ZegoCustomVideoRenderConfig](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoCustomVideoRenderConfig) 时 `enableEngineRender` 参数为 "NO" 时，预览接口 [startPreview](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoExpressEngine#start-preview) 及拉流接口 [startPlayingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoExpressEngine#start-playing-stream-canvas) 中的 "canvas" 参数填什么？**

    当 `enableEngineRender` 为 "NO" 时，引擎不渲染，因此预览和拉流接口的 `canvas` 参数可置空为 "nil"。

3. **推流时使用自定义视频渲染功能，处理过的预览视频数据 buffer 只会在本地展示吗？会加入到推流当中吗？**

    只会在本地展示，不影响推流出去的视频数据。

4. **本地采集预览自定义视频渲染的视频帧的宽高是多少？**

    本地采集预览自定义视频渲染的视频帧的宽高会在回调中的 [param](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoVideoFrameParam) 参数里返回，其值与 [setVideoConfig](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoMixerOutput#set-video-config) 设置的分辨率相同。

5. **自定义视频渲染出来的视频帧数据格式是什么？是否支持 YUV？**

    根据选择的渲染数据格式系列 [ZegoVideoFrameFormatSeries](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~enum~ZegoVideoFrameFormatSeries) 以及软解/硬解码后直接返回的数据决定，即视频帧回调方法中的 [param](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoVideoFrameParam) 参数里的 `format` ([ZegoVideoFrameFormat](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~enum~ZegoVideoFrameFormat)) 参数。

    视频帧数据格式 [ZegoVideoFrameFormat](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~enum~ZegoVideoFrameFormat) 说明：

| 视频帧数据格式枚举值 | 说明 |
|---|---|
| ZegoVideoFrameFormatI420 | YUV420P，一组 YUV 12 bits，Y、U、V 三个平面，四个 Y 共用一组 UV。 |
| ZegoVideoFrameFormatNV12 | YUV420SP，一组 YUV 12 bits，Y、UV 两个平面，UV 平面数据以先 U 后 V 顺序排列，四个 Y 共用一组 UV。 |
| ZegoVideoFrameFormatNV21 | YUV420SP，一组 YUV 12 bits，Y、UV 两个平面，UV 平面数据以先 V 后 U 顺序排列，四个 Y 共用一组 UV。 |
| ZegoVideoFrameFormatBGRA32 | BGRA32。 |
| ZegoVideoFrameFormatRGBA32 | RGBA32。 |
| ZegoVideoFrameFormatARGB32 | ARGB32。 |
| ZegoVideoFrameFormatABGR32 | ABGR32。 |
| ZegoVideoFrameFormatI422 | YUV422P，一组 YUV 16 bits，两个 Y 共用一组 UV。 |
| ZegoVideoFrameFormatBGR24 | BGR24。 |
| ZegoVideoFrameFormatRGB24 | RGB24。 |

6. **自定义视频渲染每秒回调的频率是多少？有什么需要注意的吗？**

    本地采集预览自定义视频渲染回调的频率一般是和推流时设置的帧率相同，但是如果开启了流量控制并且控制属性中包含帧率的话，本地采集预览自定义视频渲染的回调频率是会随之改变的；而远端拉流自定义视频渲染的回调频率也是会随着接收到的视频数据帧率改变的，比如推流端开启流量控制导致帧率改变、拉流端网络卡顿、拉流端网络恢复 SDK 开始追帧，都会影响拉流自定义视频渲染的回调频率。

7. **自定义视频渲染如何拿到第一帧数据呢？**

    自定义视频渲染回调 [ZegoCustomVideoRenderHandler](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~protocol~ZegoCustomVideoRenderHandler) 回调第一次返回的数据即第一帧数据。

8. **是否支持可以本地采集预览渲染我们自己做，拉流渲染由 ZEGO SDK 做呢？**

    支持，自定义视频渲染在配置 [ZegoCustomVideoRenderConfig](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoCustomVideoRenderConfig) 时将 `enableEngineRender` 参数设为 "YES" 时，不仅自定义视频渲染器会回调视频帧数据，同时 SDK 会往预览接口 [startPreview](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoExpressEngine#start-preview) 及拉流接口 [startPlayingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoExpressEngine#start-playing-stream-canvas) 中 `canvas` 里 View 上做内部渲染。

9. **渲染预览视图时，为什么收不到视频数据的回调？**

    如果需要渲染预览视图，需要在推流前先启动预览 [startPreview](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoExpressEngine#start-preview)，否则收不到视频数据的回调。

10. **本地预览自定义视频渲染，手机前置摄像头的视频帧数据的画面为什么没有默认做水平镜像翻转？**

    自定义视频渲染的视频帧画面翻转需要开发者自行实现，可通过视频帧数据回调接口中的 `flipMode` 获知该帧是否需要翻转。


## 相关文档

- [怎么处理视频黑屏问题？](https://doc-zh.zego.im/faq/video_blank)
- [怎么处理视频花屏或绿屏问题？](https://doc-zh.zego.im/faq/pixelated_green)

<Content />

