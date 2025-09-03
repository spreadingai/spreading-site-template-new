# 自定义视频渲染

- - -

## 功能简介

自定义视频渲染指的是 SDK 向外部提供本地预览及远端拉流的视频帧数据，供用户自行渲染。

当开发者业务中出现以下情况时，我们推荐使用 SDK 的自定义视频渲染功能：

1. App 使用了跨平台界面框架（例如 QT 需要有复杂层级关系的界面以实现高体验的交互）或游戏引擎（例如 Unity、Unreal Engine、Cocos 等）
2. App 需要获取 SDK 采集或拉流的视频帧数据进行特殊处理

## 示例源码下载

请参考 [下载示例源码](https://doc-zh.zego.im/article/21140) 获取源码。

相关源码请查看 “/ZegoExpressExample/Examples/AdvancedVideoProcessing/CustomVideoRendering” 目录下的文件。

## 使用步骤

自定义视频渲染的使用流程如下：

时序图如下：

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Common/ZegoExpressEngine/custom_video_render_uml_Andriod_Windows_new.png" /></Frame>

### 1 设置自定义视频渲染配置

#### 创建 [ZegoCustomVideoRenderConfig](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_linux~struct~ZegoCustomVideoRenderConfig) 对象并配置参数。

`bufferType` 参数是枚举 [ZegoVideoBufferType ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_linux~enum~ZegoVideoBufferType)，目前 SDK 仅支持 `ZEGO_VIDEO_BUFFER_TYPE_RAWDATA` 类型。

`frameFormatSeries` 参数是枚举 [ZegoVideoFrameFormatSeries ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_linux~enum~ZegoVideoFrameFormatSeries)，可指定开发者需要的自定义视频渲染视频帧数据格式，此参数只能指定 `RGB` 或 `YUV` 颜色空间大类，具体的数据格式不同平台间不一致，以回调中的参数为准。

<Warning title="注意">


若回调中的数据格式与您预期不符，请联系 ZEGO 技术支持处理。

</Warning>



- `ZegoVideoFrameFormatSeriesRGB`：返回 BGRA。
- `ZegoVideoFrameFormatSeriesYUV`：返回 I420。

[enableEngineRender](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_linux~struct~ZegoCustomVideoRenderConfig#enable-engine-render) 表示是否在要自定义视频渲染的同时，SDK 内部也渲染。如果为 `false`，则引擎不会往预览接口 [startPreview ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_linux~class~IZegoExpressEngine#start-preview) 和拉流接口 [startPlayingStream ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_linux~class~IZegoExpressEngine#start-playing-stream) 设置的 canvas 上渲染。

接口原型

  ```cpp
  // 自定义视频渲染配置
  struct ZegoCustomVideoRenderConfig
  {
      // 自定义视频渲染视频帧数据类型
      ZegoVideoBufferType bufferType;

      // 自定义视频渲染视频帧数据格式
      ZegoVideoFrameFormatSeries frameFormatSeries;

      // 是否在自定义视频渲染的同时，引擎也渲染，默认为 [false]
      bool enableEngineRender;
  };

  /**
   * 开始或停止自定义视频渲染
   *
   * 必须在引擎启动前设置，即在调用 [startPreview]、[startPublishing]、[startPlayingStream] 之前设置；且在引擎停止之后才能修改配置
   * 当开发者开启自定义渲染时，通过调用 [setCustomVideoRenderHandler] 可设置接收本地以及远端的视频帧数据以用于自定义渲染
   *
   * @param enable 是否开启
   * @param config 自定义渲染配置
   */
  virtual void enableCustomVideoRender(bool enable, ZegoCustomVideoRenderConfig* config) = 0;
  ```

#### 调用 [enableCustomVideoRender](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_linux~class~IZegoExpressEngine#enable-custom-video-render) 接口开启自定义视频渲染。

创建 [ZegoCustomVideoRenderConfig](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_linux~struct~ZegoCustomVideoRenderConfig) 对象并配置参数后，再调用 [enableCustomVideoRender](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_linux~class~IZegoExpressEngine#enable-custom-video-render) 接口开启自定义视频渲染。

- 调用示例

  ```cpp
  ZegoCustomVideoRenderConfig renderConfig;
  renderConfig.bufferType = ZEGO_VIDEO_BUFFER_TYPE_RAWDATA;
  renderConfig.frameFormatSeries = ZEGO_VIDEO_FRAME_FORMAT_SERIES_RGB;
  renderConfig.enableEngineRender = false;

  engine->enableCustomVideoRender(true, &renderConfig);
  ```

### 2 设置自定义视频渲染回调

调用 [setCustomVideoRenderHandler ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_linux~class~IZegoExpressEngine#set-custom-video-render-handler) 接口来设置自定义视频渲染回调 [IZegoCustomVideoRenderHandler ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_linux~class~IZegoCustomVideoRenderHandler)。

```cpp
// 继承自 IZegoCustomVideoRenderHandler，实现自定义渲染回调
// 请注意，请勿在 SDK 回调线程中调用任何 SDK 接口，需要手动切换为其他线程，否则会产生死锁
class MyCustomVideoRenderHandler: public IZegoCustomVideoRenderHandler{
    /**
    * 本地预览视频帧裸数据回调
    *
    * @param data 视频帧的裸数据（例：RGBA 只需考虑 data[0]，I420 需考虑 data[0,1,2]）
    * @param dataLength 数据的长度（例：RGBA 只需考虑 dataLength[0]，I420 需考虑 dataLength[0,1,2]）
    * @param param 视频帧参数
    * @param flipMode 视频帧翻转模式
    * @param channel 推流通道
    */
    virtual void onCapturedVideoFrameRawData(unsigned char** /*data*/, unsigned int* /*dataLength*/, ZegoVideoFrameParam /*param*/, ZegoVideoFlipMode /*flipMode*/, ZegoPublishChannel /*channel*/) {

    }

    /**
    * 远端拉流视频帧裸数据回调，通过 streamID 区分不同的流
    *
    * @param data 视频帧的裸数据（例：RGBA 只需考虑 data[0]，I420 需考虑 data[0,1,2]）
    * @param dataLength 数据的长度（例：RGBA 只需考虑 dataLength[0]，I420 需考虑 dataLength[0,1,2]）
    * @param param 视频帧参数
    * @param streamID 拉流的流 ID
    */
    virtual void onRemoteVideoFrameRawData(unsigned char** /*data*/, unsigned int* /*dataLength*/, ZegoVideoFrameParam /*param*/, const std::string& /*streamID*/) {

    }
}

// 为引擎设置自定义渲染回调
engine->setCustomVideoRenderHandler(std::make_shared<MyCustomVideoRenderHandler>());
```

回调方法中的 `param` （[ZegoVideoFrameParam ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_linux~struct~ZegoVideoFrameParam) 对象）描述了该视频帧的一些参数，定义如下：

```cpp
struct ZegoVideoFrameParam
{
    // 视频帧的格式
    ZegoVideoFrameFormat format;

    // 每个平面一行字节数（例：RGBA 只需考虑 strides[0]，I420 需考虑 strides[0,1,2]）
    int strides[4];

    // 视频帧的画面宽
    int width;

    // 视频帧的画面高
    int height;

    // 视频旋转角度
    int rotation;
};
```

其中 `format` 标识了该视频帧的具体数据格式；`strides` 为数组，描述每个平面一行字节数；`size` 描述视频帧的画面尺寸。

> `strides` 和图像之间的关系如图：

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/share/strides_new.png" /></Frame>

### 3 登录房间后推/拉流，收到自定义视频渲染视频帧数据回调

开启本地预览或推流后，SDK 会将采集到的本地视频通过 [onCapturedVideoFrameRawData ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_linux~class~IZegoCustomVideoRenderHandler#on-captured-video-frame-raw-data)  回调给用户。

开启拉流后，SDK 会将获取的远端流的视频数据通过 [onRemoteVideoFrameRawData ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_linux~class~IZegoCustomVideoRenderHandler#on-remote-video-frame-raw-data) 回调给用户。

至此，App 成功获得 SDK 回调的视频帧数据，用于实际的渲染动作或者进行深加工操作。


## FAQ

1. 自定义视频渲染，分了本地采集预览自定义视频渲染和远端拉流自定义视频渲染，分别有什么作用？什么场景下使用？

   答：本地采集预览自定义视频渲染是让主播看到额外的渲染效果，在原视频画面基础上加上特效等；远端拉流自定义视频渲染是让观众看到不同的渲染画面，可以根据观众的喜好，在拉流画面的基础上加上特效。

2. 如果自定义视频渲染在配置 [ZegoCustomVideoRenderConfig ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_linux~struct~ZegoCustomVideoRenderConfig) 里的 [enableEngineRender ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_linux~struct~ZegoCustomVideoRenderConfig#enable-engine-render) 参数为 `false` 时，预览接口 [startPreview ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_linux~class~IZegoExpressEngine#start-preview) 及拉流接口 [startPlayingStream ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_linux~class~IZegoExpressEngine#start-playing-stream) 中的 `canvas` 参数填什么？

   答：当 [enableEngineRender ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_linux~struct~ZegoCustomVideoRenderConfig#enable-engine-render) 为 `false` 时，引擎不渲染，因此预览和拉流接口的 `canvas` 参数可置空 `nullptr`。

3. 推流时使用自定义视频渲染功能，处理过的预览视频数据 `buffer` 只会在本地展示吗？会加入到推流当中吗？

   答：只会在本地展示，不影响推流出去的视频数据。

4. 本地采集预览自定义视频渲染的视频帧的宽高是多少？

   答：本地采集预览自定义视频渲染的视频帧的宽高会在回调中的 [param ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_linux~struct~ZegoVideoFrameParam) 参数里返回，其值与 [setVideoConfig ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_linux~class~IZegoExpressEngine#set-video-config) 设置的分辨率相同。

5. 自定义视频渲染出来的视频帧数据格式是什么？

   答：根据选择的渲染数据格式系列 [ZegoVideoFrameFormatSeries ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_linux~enum~ZegoVideoFrameFormatSeries) 以及软解/硬解码后直接返回的数据决定，即视频帧回调方法中的 [ZegoVideoFrameParam ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_linux~struct~ZegoVideoFrameParam) 参数里的 `format` 参数。

   视频帧数据格式 [ZegoVideoFrameFormat ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_linux~enum~ZegoVideoFrameFormat) 说明：

<table>

<tbody><tr>
<th>视频帧数据格式枚举值</th>
<th>说明</th>
</tr>
<tr>
<td>ZEGO_VIDEO_FRAME_FORMAT_I420</td>
<td>YUV420P；一组 YUV 12bits；Y, U, V 三个平面，四个 Y 共用一组 UV。</td>
</tr>
<tr>
<td>ZEGO_VIDEO_FRAME_FORMAT_NV12</td>
<td>YUV420SP；一组 YUV 12bits；Y, UV 两个平面，UV 平面数据以先 U 后 V 顺序排列，四个 Y 共用一组 UV。</td>
</tr>
<tr>
<td>ZEGO_VIDEO_FRAME_FORMAT_NV21</td>
<td>YUV420SP；一组 YUV 12bits；Y, UV 两个平面，UV 平面数据以先 V 后 U 顺序排列，四个 Y 共用一组 UV。</td>
</tr>
<tr>
<td>ZEGO_VIDEO_FRAME_FORMAT_BGRA32</td>
<td>BGRA32。</td>
</tr>
<tr>
<td>ZEGO_VIDEO_FRAME_FORMAT_RGBA32</td>
<td>RGBA32。</td>
</tr>
<tr>
<td>ZEGO_VIDEO_FRAME_FORMAT_ARGB32</td>
<td>ARGB32。</td>
</tr>
<tr>
<td>ZEGO_VIDEO_FRAME_FORMAT_ABGR32</td>
<td>ABGR32。</td>
</tr>
<tr>
<td>ZEGO_VIDEO_FRAME_FORMAT_I422</td>
<td>YUV422P; 一组 YUV 16bits；两个 Y 共用一组 UV。</td>
</tr>
<tr>
<td>ZEGO_VIDEO_FRAME_FORMAT_BGR24</td>
<td>BGR24。</td>
</tr>
<tr>
<td>ZEGO_VIDEO_FRAME_FORMAT_RGB24</td>
<td>RGB24。</td>
</tr>
</tbody></table>

6. 自定义视频渲染每秒回调的频率是多少？有什么需要注意的吗？

   答：本地采集预览自定义视频渲染回调的频率一般是和推流时设置的帧率相同，但是如果开启了流量控制并且控制属性中包含帧率的话，本地采集预览自定义视频渲染的回调频率是会随之改变的；而远端拉流自定义视频渲染的回调频率也是会随着接收到的视频数据帧率改变的，比如推流端开启流量控制导致帧率改变、拉流端网络卡顿、拉流端网络恢复 SDK 开始追帧，都会影响拉流自定义视频渲染的回调频率。

7. 自定义视频渲染如何拿到第一帧数据呢？

   答：自定义视频渲染回调 [IZegoCustomVideoRenderHandler ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_linux~class~IZegoCustomVideoRenderHandler) 的第一次返回的数据即第一帧数据。

8. 为什么收不到本地视频数据的回调？

   答：需要在推流前先启动预览 [startPreview ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_linux~class~IZegoExpressEngine#start-preview)，否则收不到视频数据的回调。

9. 本地预览自定义视频渲染，视频帧数据的画面为什么没有默认做水平镜像翻转？

   答：自定义视频渲染的视频帧画面翻转需要开发者自行实现，可通过视频帧数据回调接口中的 [flipMode ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_linux~enum~ZegoVideoFlipMode) 获知该帧是否需要翻转。


## 相关文档

- [怎么处理视频黑屏问题？](https://doc-zh.zego.im/faq/video_blank)
- [怎么处理视频花屏或绿屏问题？](https://doc-zh.zego.im/faq/pixelated_green)

<Content />

