# 自定义视频渲染

- - -

## 功能简介

自定义视频渲染指的是 SDK 向外部提供本地预览及远端拉流的视频帧数据，供用户自行渲染。

当开发者业务中出现以下情况时，推荐使用 SDK 的自定义视频渲染功能：

- App 使用了跨平台界面框架（例如 Qt 需要有复杂层级关系的界面以实现高体验的交互）或游戏引擎（例如 Unity、Unreal Engine、Cocos 等）。
- App 需要获取 SDK 采集或拉流的视频帧数据进行特殊处理。

## 示例源码下载

请参考 [下载示例源码](https://doc-zh.zego.im/article/13396) 获取源码。

相关源码请查看 “/ZegoExpressExample/AdvancedVideoProcessing/src/main/java/im/zego/advancedvideoprocessing/customrender” 目录下的文件。

## 前提条件

在实现自定义视频渲染功能之前，请确保：

- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppID 和 AppSign，详情请参考 [控制台 - 项目信息](/console/project-info)。
- 已在项目中集成 ZEGO Express SDK，并实现了基本的音视频推拉流功能，详情请参考 [快速开始 - 集成](https://doc-zh.zego.im/article/13394) 和 [快速开始 - 实现流程](https://doc-zh.zego.im/article/13395)。


## 使用步骤

API 接口调用的时序图如下：

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Common/ZegoExpressEngine/custom_video_render_Andriod_Windows_new.png" /></Frame>

### 1 设置自定义视频渲染配置

1. 创建 [ZegoCustomVideoRenderConfig](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Java~class~im-zego-zegoexpress-entity-zego-custom-video-render-config) 对象，配置自定义视频渲染参数，其中：

    - `bufferType`，指自定义视频渲染视频帧数据类型，取值请参考 [ZegoVideoBufferType](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~enum~ZegoVideoBufferType)。

    - `frameFormatSeries`，指自定义视频渲染视频帧数据格式，取值请参考 [ZegoVideoFrameFormatSeries](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~enum~ZegoVideoFrameFormatSeries)。此参数只能指定 RGB 或 YUV 颜色空间大类，具体的数据格式不同平台间不一致，以回调中的参数为准。
      <Warning title="注意">
      若回调中的数据格式与您预期不符，请联系 ZEGO 技术支持处理。
        </Warning>

      - `ZegoVideoFrameFormatSeriesRGB`：返回 RGBA。
      - `ZegoVideoFrameFormatSeriesYUV`：返回 I420。


    - `enableEngineRender`，指是否在要自定义视频渲染的同时，SDK 内部也渲染。默认为 “false” ，表示引擎不会在预览接口 [startPreview](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~ZegoExpressEngine#start-preview) 和拉流接口 [startPlayingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~ZegoExpressEngine#start-playing-stream) 设置的 View 上渲染。


2. 调用 [enableCustomVideoRender](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~ZegoExpressEngine#enable-custom-video-render) 接口，开启自定义视频渲染功能。

    ```java
    ZegoCustomVideoRenderConfig videoRenderConfig = new ZegoCustomVideoRenderConfig();
    // 自定义视频渲染视频帧数据类型，以 RAW_DATA 类型为例
    videoRenderConfig.bufferType = ZegoVideoBufferType.RAW_DATA;
    // 自定义视频渲染视频帧数据格式，以 RGB 色系数据格式为例
    videoRenderConfig.frameFormatSeries = ZegoVideoFrameFormatSeries.RGB;
    // 指定在自定义视频渲染的同时引擎也渲染
    videoRenderConfig.enableEngineRender = true;

    // 开启自定义视频渲染
    engine.enableCustomVideoRender(true, videoRenderConfig);
    ```

### 2 设置视频渲染器对象，并实现回调方法

调用 [setCustomVideoRenderHandler](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Java~class~im-zego-zegoexpress-zego-express-engine#set-custom-video-render-handler) 接口设置自定义视频渲染回调。

```java
// 设置自定义视频渲染回调并实现抛出视频数据的方法

engine.setCustomVideoRenderHandler(new IZegoCustomVideoRenderHandler(){

    public void onCapturedVideoFrameRawData(ByteBuffer[] data, int[] dataLength, ZegoVideoFrameParam param, ZegoVideoFlipMode flipMode, ZegoPublishChannel channel){
        // 在采集端的回调里通过 data, dataLength, param 等参数实现将本地采集的视频数据渲染到 View 的逻辑, 所抛出的数据格式参考 param.format
        ...;
    }

    public void onRemoteVideoFrameRawData(ByteBuffer[] data, int[] dataLength, ZegoVideoFrameParam param, String streamID){
        // 在拉流端的回调里通过 data, dataLength, param 等参数实现将所拉的流的视频数据渲染到 View 的逻辑, 所抛出的数据格式参考 param.format
        ...;
    }
});
```

<Note title="说明">
本地预览采集视频帧回调方法中的 [flipMode](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Java~enum~im-zego-zegoexpress-zego-video-flip-mode) 参数与镜像有关，通知开发者是否需要自行将视频帧画面做翻转，以使画面符合 [setVideoMirrorMode](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Java~class~im-zego-zegoexpress-zego-express-engine#set-video-mirror-mode) 中设置的 [ZegoVideoMirrorMode](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~enum~ZegoVideoMirrorMode) 枚举值的描述.
</Note>

以上回调方法中的 `param` 参数（[ZegoVideoFrameParam](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Java~class~im-zego-zegoexpress-entity-zego-video-frame-param) 对象）描述了该视频帧的一些参数，定义如下：

```java
/**
 * 视频帧的参数对象
 *
 * 包括视频帧的格式、宽高等
 */
public class ZegoVideoFrameParam {

    // 视频帧的格式
    public ZegoVideoFrameFormat format;

    // 每个平面一行字节数（此参数为 int 数组，数组长度为4，RGBA 只需考虑 strides[0]，I420 需考虑 strides[0,1,2]）
    final public int[] strides = new int[4];

    // 视频帧的画面宽
    public int width;

    // 视频帧的画面高
    public int height;

}
```

其中 `format` 标识了该视频帧的具体数据格式，`strides` 为数组，描述每个平面一行字节数，`size` 描述视频帧的画面尺寸。`strides` 和图像之间的关系如图：
<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/share/strides_new.png" /></Frame>

### 3 自定义视频渲染视频帧数据回调

#### 推流预览渲染

推流方首先需要调用启动预览接口，才能收到自定义视频渲染视频帧数据回调，如果 [ZegoCustomVideoRenderConfig](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Java~class~im-zego-zegoexpress-entity-zego-custom-video-render-config) 自定义视频渲染配置的 `enableEngineRender` 参数为 `false`，启动预览的 `canvas` 参数可以传空，启动预览后即可开始推流。

```java
// 如需在自定义视频渲染同时内部也渲染，可将 `ZegoCustomVideoRenderConfig` 的 `enableEngineRender` 参数设为 `true`，然后在预览时传入内部渲染的 View
ZegoCanvas previewCanvas = new ZegoCanvas(textureViewLocalPreview);// textureViewLocalPreview为UI界面上的 TextureView 对象
ZegoExpressEngine.getEngine().startPreview(previewCanvas);

// 如仅需自定义视频渲染，可将 `ZegoCustomVideoRenderConfig` 的 `enableEngineRender` 参数设为 `false`，`canvas` 参数传空即可，但也必须调用此接口，否则自定义视频渲染将不会回调预览视频帧数据
ZegoExpressEngine.getEngine().startPreview(null);

// 开始预览后，此时将会收到自定义视频渲染预览视频帧数据回调

// 开始推流
// streamid 为开发者定义的流 id
ZegoExpressEngine.getEngine().startPublishingStream(streamid);
```

#### 拉流渲染

推流成功后，可调用 [ZegoCustomVideoRenderConfig](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~ZegoCustomVideoRenderConfig) 中 [enableEngineRender](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~ZegoCustomVideoRenderConfig#enable-engine-render) 进行设置拉流渲染参数。再调用 [startPlayingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~ZegoExpressEngine#start-playing-stream) 进行拉流。

```java
// 如需在自定义视频渲染同时内部也渲染，可将 `ZegoCustomVideoRenderConfig` 的 `enableEngineRender` 参数设为 `true`，然后在拉流时传入内部渲染的 View
// textureViewLocalPreview 为 UI 界面上的 TextureView 对象
ZegoCanvas playCanvas = new ZegoCanvas(textureViewLocalPreview);
ZegoExpressEngine.getEngine().startPlayingStream(streamID, playCanvas);

// 如仅需自定义视频渲染，可将 `ZegoCustomVideoRenderConfig` 的 `enableEngineRender` 参数设为 `false`，`canvas` 参数传空即可
egoExpressEngine.getEngine().startPlayingStream(streamID, null);

// 开始拉流后，此时将会收到拉的这条流的自定义视频渲染视频帧数据回调
```

至此，App 成功获得 SDK 回调的视频帧数据，用于实际的渲染动作或者进行深加工操作。

## 常见问题

1. **自定义视频渲染，分了本地采集预览自定义视频渲染和远端拉流自定义视频渲染，分别有什么作用？什么场景下使用？**

    本地采集预览自定义视频渲染是让主播看到额外的渲染效果，在原视频画面基础上加上特效等；远端拉流自定义视频渲染是让观众看到不同的渲染画面，可以根据观众的喜好，在拉流画面的基础上加上特效。

2. **如果自定义视频渲染在配置 [ZegoCustomVideoRenderConfig](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Java~class~im-zego-zegoexpress-entity-zego-custom-video-render-config) 时 `enableEngineRender` 参数为 `false` 时，预览接口 [startPreview](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Java~class~im-zego-zegoexpress-zego-express-engine#start-preview) 及拉流接口 [startPlayingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Java~class~im-zego-zegoexpress-zego-express-engine#start-playing-stream) 中的 `canvas` 参数填什么？**

    当 `enableEngineRender` 为 `false` 时，引擎不渲染，因此预览和拉流接口的 `canvas` 参数可置空 “null”。

3. **推流时使用自定义视频渲染功能，处理过的预览视频数据 buffer 只会在本地展示吗？会加入到推流当中吗？**

    只会在本地展示，不影响推流出去的视频数据。

4. **本地采集预览自定义视频渲染的视频帧的宽高是多少？**

    本地采集预览自定义视频渲染的视频帧的宽高会在回调中的 [param](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Java~class~im-zego-zegoexpress-entity-zego-video-frame-param) 参数里返回，其值与 [setVideoConfig](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Java~class~im-zego-zegoexpress-zego-express-engine#set-video-config) 设置的分辨率相同。

5. **自定义视频渲染出来的视频帧数据格式是什么？是否支持 YUV？**

    根据选择的渲染数据格式系列 [ZegoVideoFrameFormatSeries](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~enum~ZegoVideoFrameFormatSeries) 以及软解/硬解码后直接返回的数据决定，即视频帧回调方法中的 [param](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Java~class~im-zego-zegoexpress-entity-zego-video-frame-param) 参数里的 `format`（[ZegoVideoFrameFormat](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~enum~ZegoVideoFrameFormat)）参数。

    视频帧数据格式 [ZegoVideoFrameFormat](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~enum~ZegoVideoFrameFormat) 说明：

<table>

<tbody><tr>
<th>视频帧数据格式枚举值</th>
<th>说明</th>
</tr>
<tr>
<td>I420</td>
<td>YUV420P，一组 YUV 12 bits，Y、U、V 三个平面，四个 Y 共用一组 UV。</td>
</tr>
<tr>
<td>NV12</td>
<td>YUV420SP，一组 YUV 12 bits，Y、UV 两个平面，UV 平面数据以先 U 后 V 顺序排列，四个 Y 共用一组 UV。</td>
</tr>
<tr>
<td>NV21</td>
<td>YUV420SP，一组 YUV 12 bits，Y、UV 两个平面，UV 平面数据以先 V 后 U 顺序排列，四个 Y 共用一组 UV。</td>
</tr>
<tr>
<td>BGRA32</td>
<td>BGRA32。</td>
</tr>
<tr>
<td>RGBA32</td>
<td>RGBA32。</td>
</tr>
<tr>
<td>ARGB32</td>
<td>ARGB32。</td>
</tr>
<tr>
<td>ABGR32</td>
<td>ABGR32。</td>
</tr>
<tr>
<td>I422</td>
<td>YUV422P，一组 YUV 16 bits，两个 Y 共用一组 UV。</td>
</tr>
<tr>
<td>BGR24</td>
<td>BGR24。</td>
</tr>
<tr>
<td>RGB24</td>
<td>RGB24。</td>
</tr>
</tbody></table>

6. **自定义视频渲染每秒回调的频率是多少？有什么需要注意的吗？**

    本地采集预览自定义视频渲染回调的频率一般是和推流时设置的帧率相同，但是如果开启了流量控制并且控制属性中包含帧率的话，本地采集预览自定义视频渲染的回调频率是会随之改变的；而远端拉流自定义视频渲染的回调频率也是会随着接收到的视频数据帧率改变的，比如推流端开启流量控制导致帧率改变、拉流端网络卡顿、拉流端网络恢复 SDK 开始追帧，都会影响拉流自定义视频渲染的回调频率。

7. **自定义视频渲染如何拿到第一帧数据呢？**

    自定义视频渲染回调 [IZegoCustomVideoRenderHandler](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Java~class~im-zego-zegoexpress-callback-i-zego-custom-video-render-handler) 回调第一次返回的数据即第一帧数据。

8. **是否支持可以本地采集预览渲染我们自己做，拉流渲染由 ZEGO SDK 做呢？**

    支持，自定义视频渲染在配置 [ZegoCustomVideoRenderConfig](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Java~class~im-zego-zegoexpress-entity-zego-custom-video-render-config) 时将 `enableEngineRender` 参数设为 “true” 时，不仅自定义视频渲染器会回调视频帧数据，同时 SDK 会往预览接口 [startPreview](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Java~class~im-zego-zegoexpress-zego-express-engine#start-preview) 及拉流接口 [startPlayingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~ZegoExpressEngine#start-playing-stream) 中 `canvas` 里 View 上做内部渲染。

9. **渲染预览视图时，为什么收不到视频数据的回调？**

    如果需要渲染预览视图，需要在推流前先启动预览 [startPreview](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Java~class~im-zego-zegoexpress-zego-express-engine#start-preview)，否则收不到视频数据的回调。

10. **本地预览自定义视频渲染，手机前置摄像头的视频帧数据的画面为什么没有默认做水平镜像翻转？**

    自定义视频渲染的视频帧画面翻转需要开发者自行实现，可通过视频帧数据回调接口中的 [flipMode](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Java~enum~im-zego-zegoexpress-zego-video-flip-mode) 获知该帧是否需要翻转。


## 相关文档

- [怎么处理视频黑屏问题？](https://doc-zh.zego.im/faq/video_blank)
- [怎么处理视频花屏或绿屏问题？](https://doc-zh.zego.im/faq/pixelated_green)

<Content />

