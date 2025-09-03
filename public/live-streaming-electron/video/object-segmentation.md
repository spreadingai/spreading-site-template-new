# 主体分割

- - -

## 功能简介

主体分割是 Express SDK 提供的增值能力，通过 AI 算法识别视频画面中的内容，对每一个像素点设置`透明度信息`。其中，主体部分的像素点会被设置为“不透明”，主体部分之外的像素点会被设置为“透明”。开发者可以利用这些像素点的透明度信息，对画面中的主体和非主体部分做不同的处理，从而实现不同的功能。

<Warning title="注意">
- 当前官网 SDK 不包含“主体分割”相关功能，如有需要，请联系 ZEGO 技术支持特殊编包，并提供您的 AppID，开通相关权限。
- “主体分割”功能为付费功能，如需申请体验或咨询正式收费标准，请联系 ZEGO 商务人员。
</Warning>



### 主体分割对象

对身处不同环境的用户，ZEGO 提供“绿幕背景分割”和“任意背景分割”两种分割能力。

<table>

<tbody><tr>
<th>分割类型</th>
<th>绿幕背景分割</th>
<th>任意背景分割</th>
</tr>
<tr>
<th>能力描述</th>
<td><p>在用户自行架设了绿幕的情况下，可以将非绿幕区域的主体保留。</p><p>适用于电商直播、在线考试等场景。</p></td>
<td><p>多数用户不具备架设绿幕的条件，可以通过 ZEGO 提供的任意背景分割能力，在没有绿幕的情况下，识别画面中的主体。</p><p>适用于在线教育、视频会议等场景。</p></td>
</tr>
<tr>
<th>图示</th>
<td><Frame width="auto" height="256" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/subject_segmentation/people_with_greenscreen.png" /></Frame></td>
<td><Frame width="auto" height="256" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/subject_segmentation/people_with_realenvironment.jpg" /></Frame></td>
</tr>
</tbody></table>

### 功能场景

基于主体分割能力，开发者可以实现背景虚化、虚拟背景、演讲模式、多人实时同台互动等业务场景，打造更多样的互动体验。

<table>

<tbody><tr>
<th>功能点</th>
<th>背景虚化</th>
<th>虚拟背景</th>
<th>背景透明</th>
<th>主体分割与传输</th>
</tr>
<tr>
<th>功能描述</th>
<td>将主体外的画面做模糊处理。</td>
<td>将主体外的画面替换为自定义的图片、颜色。</td>
<td><p>将主体的画面渲染在本端的其他视频内容上。</p><p>例如在屏幕共享或正在播放的视频等内容上，实现演讲模式等功能。</p></td>
<td>结合 Express SDK 提供的 Alpha 通道数据传输能力，将画面中分割出的主体传输到拉流端，在拉流端做主体渲染，实现多人异地实时同处于一个场景中的视觉效果</td>
</tr>
<tr>
<th>图示</th>
<td><Frame width="auto" height="auto" caption=""><img src="https://media-resource.spreading.io/docuo/workspace740/af061ebc6eaf0f12ae9e7f72235bd04e/6364d2bc42.png" /></Frame></td>
<td><Frame width="auto" height="auto" caption=""><img src="https://media-resource.spreading.io/docuo/workspace740/af061ebc6eaf0f12ae9e7f72235bd04e/de1e9cf26f.png" /></Frame></td>
<td><Frame width="auto" height="auto" caption=""><img src="https://media-resource.spreading.io/docuo/workspace740/af061ebc6eaf0f12ae9e7f72235bd04e/5bc5b6b70d.png" /></Frame></td>
<td><Frame width="auto" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/subject_segmentation/multiplayer.jpeg" /></Frame></td>
</tr>
</tbody></table>


### 硬件兼容性

<table>

<tbody><tr>
<th>平台</th>
<th>硬件要求</th>
</tr>
<tr>
<td>macOS</td>
<td>M 系列芯片：Apple M1 及以上</td>
</tr>
<tr>
<td>Windows</td>
<td>Intel Core i5 及以上</td>
</tr>
</tbody></table>


## 示例源码

请参考 [下载示例源码](/real-time-video-electron-js/quick-start/run-example-code) 获取源码。

相关源码请查看 “/ZegoExpressExample/Others/src/main/java/com/example/others/videoobjectsegmentation” 目录下的文件。

## 前提条件

在使用主体分割功能前，请确保：

- 已联系 ZEGO 技术支持进行特殊编包。

- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppID 和 AppSign，详情请参考 [控制台 - 项目信息](/console/project-info)。
- 已在项目中集成 ZEGO Express SDK，并实现了基本的音视频推拉流功能，详情请参考 [快速开始 - 集成](https://doc-zh.zego.im/article/21125) 和 [快速开始 - 实现流程](https://doc-zh.zego.im/article/21036)。


## 实现流程

<Warning title="注意">


- 开启主体分割功能会额外消耗系统资源，为了保证用户体验，目前仅支持对一路通道推流画面开启主体分割。
- 如果有经过自定义前处理第三方滤镜，需要确保第三方滤镜支持 Alpha 通道透传功能。

</Warning>



<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/subject_segmentation/subject_segmentation_electron.png" /></Frame>

请注意，开发者可根据自己的业务场景需要，选择是否实现上图中的 **（可选）** 步骤。如需实现，请参考下文中的具体说明。

### 初始化和登录房间

初始化和登录房间的具体流程，请参考实现视频通话文档中的 “[创建引擎](https://doc-zh.zego.im/article/21036#createEngine)”及“[登录房间](https://doc-zh.zego.im/article/21036#loginRoom)”。

### 监听主体分割状态回调

调用 [onVideoObjectSegmentationStateChanged](https://doc-zh.zego.im/article/21397#onVideoObjectSegmentationStateChanged) 接口，监听主体分割状态回调。

<Warning title="注意">


主体分割的状态回调依赖于开启预览或者推流，即如需监听 [onVideoObjectSegmentationStateChanged](https://doc-zh.zego.im/article/21397#onVideoObjectSegmentationStateChanged) 回调，需要调用预览 [startPreview](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_electron~class~ZegoExpressEngine#start-preview) 或推流 [startPublishingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_electron~class~ZegoExpressEngine#start-publishing-stream)。

</Warning>



```js
zgEngine.on('onVideoObjectSegmentationStateChanged', (res) =>{
   console.log('onVideoObjectSegmentationStateChanged: '+ res.state)
   if(res.state == zgDefines.ZegoObjectSegmentationState.On)
   {
       //主体分割开启
   }
   else
   {
      //主体分割关闭
      //异常关闭，请查看错误码
   }
})
```

### 使用主体分割实现不同的业务功能

<Warning title="注意">


开发者如需更新主体分割类型、背景处理类型，需要修改 [ZegoObjectSegmentationConfig](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_electron~struct~ZegoObjectSegmentationConfig) 的配置，并再次调用 [enableVideoObjectSegmentation](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_electron~class~ZegoExpressEngine#enable-video-object-segmentation) 接口开启主体分割，即可更新主体分割效果；更新结果将通过 [onVideoObjectSegmentationStateChanged](https://doc-zh.zego.im/article/21397#onVideoObjectSegmentationStateChanged) 回调通知给开发者。

</Warning>



#### 背景虚化

<Accordion title="使用主体分割实现背景虚化" defaultOpen="false">
调用 [enableVideoObjectSegmentation](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_electron~class~ZegoExpressEngine#enable-video-object-segmentation) 接口，开启主体分割，并设置背景处理类型为“虚化”。

```js
// 设置背景处理方式为虚化
// 设置背景虚化级别为中
var config = {objectSegmentationType: zgDefines.ZegoObjectSegmentationType.AnyBackground, backgroundConfig: {processType: zgDefines.ZegoBackgroundProcessType.Blur, blurLevel: zgDefines.ZegoBackgroundBlurLevel.Medium}};
//开启主体分割
zgEngine.enableVideoObjectSegmentation(true, config, zgDefines.ZegoPublishChannel.Main)
```
</Accordion>

#### 虚拟背景

<Accordion title="使用主体分割实现虚拟背景" defaultOpen="false">
<Warning title="注意">


- 开发者在使用本功能时，请注意自定义图片的宽高比，否则图片超出视图的部分会被裁减。
- 当前支持 “PNG” 与 “JPEG” 两种图片格式，即 “.png”、“.jpg”、“.jpeg” 三种后缀的图片文件。

</Warning>



调用 [enableVideoObjectSegmentation](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_electron~class~ZegoExpressEngine#enable-video-object-segmentation) 接口，开启主体分割，并设置背景处理类型为“图片”。

```js
// 设置背景处理方式图片
var config = {objectSegmentationType: zgDefines.ZegoObjectSegmentationType.AnyBackground, backgroundConfig: {processType: zgDefines.ZegoBackgroundProcessType.Image， imageURL: "设置背景图片路径"}};
//开启主体分割
zgEngine.enableVideoObjectSegmentation(true, config, zgDefines.ZegoPublishChannel.Main)
```
</Accordion>

#### 透明背景

<Accordion title="使用主体分割实现透明背景" defaultOpen="false">
<Warning title="注意">


如果开发者需要实现类似“演讲模式”的业务功能，需要在业务侧将“主体画面”与“要混合的视频源内容”混为一条视频流。

</Warning>



调用 [enableVideoObjectSegmentation](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_electron~class~ZegoExpressEngine#enable-video-object-segmentation) 接口，开启主体分割，并设置背景处理类型为“透明”。

```js
// 设置背景处理方式为透明
var config = {objectSegmentationType: zgDefines.ZegoObjectSegmentationType.AnyBackground, backgroundConfig: {processType: zgDefines.ZegoBackgroundProcessType.Transparent}};
//开启主体分割
zgEngine.enableVideoObjectSegmentation(true, config, zgDefines.ZegoPublishChannel.Main)
```
</Accordion>

### （可选）使用 Alpha 通道传输分割出的主体

<Accordion title="使用 Alpha 通道传输分割出的主体" defaultOpen="false">
如果推流端需要把分割后的主体画面通过 Alpha 通道传输到拉流端，在拉流端做主体渲染，需要先调用 [enableAlphaChannelVideoEncoder](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_electron~class~ZegoExpressEngine#enable-alpha-channel-video-encoder) 接口，设置编码器支持透明通道，然后调用 [startPublishingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_electron~class~ZegoExpressEngine#start-publishing-stream) 接口推流，使其顺利传输至拉流端。

<Warning title="注意">


目前仅支持透明通道数据排列在 RGB 或 YUV 数据下方。

</Warning>



- 开启 Alpha 通道数据传输：

    ```js
   // 透明通道数据排列在 RGB 或 YUV 数据下方
   // 设置编码器支持透明通道
   zgEngine.enableAlphaChannelVideoEncoder(true, zgDefines.ZegoAlphaLayoutType.Bottom, zgDefines.ZegoPublishChannel.Main)
    ```
- 关闭 Alpha 通道数据传输：

    ```js
    // 透明通道数据排列在 RGB 或 YUV 数据下方
    // 设置编码器支持透明通道
    zgEngine.enableAlphaChannelVideoEncoder(false, zgDefines.ZegoAlphaLayoutType.Bottom, zgDefines.ZegoPublishChannel.Main)
    ```
</Accordion>

### 开始预览和推流

通过 [enableVideoObjectSegmentation](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_electron~class~ZegoExpressEngine#enable-video-object-segmentation) 接口开启主体分割功能后，可以进行预览。

<Note title="说明">


开发者也可以先开启预览，再开启主体分割。本文以先开启主体分割，再进行预览为例进行介绍。

</Note>



```js
zgEngine.startPreview();
zgEngine.startPublishingStream(streamID);
```

### 拉流

通过 [startPlayingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_electron~class~ZegoExpressEngine#start-playing-stream) 接口，开始拉流。

```js
zgEngine.startPlayingStream(StreamID, {
    canvas: localCanvas
});
```

### 关闭主体分割

调用 [enableVideoObjectSegmentation](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_electron~class~ZegoExpressEngine#enable-video-object-segmentation) 接口，关闭主体分割。

```js
// 关闭主体分割
zgEngine.enableVideoObjectSegmentation(false, {}, zgDefines.ZegoPublishChannel.Main)
```

### 销毁引擎

调用 [destroyEngine](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_electron~class~ZegoExpressEngine#destroy-engine) 接口，销毁引擎。

```js
zgEngine.destroyEngine();
```

<Content />

