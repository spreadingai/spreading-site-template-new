# 混流

- - -

## 功能简介

### 概述

混流是把多路音视频流从云端合并成一路流的技术，也称合流。开发者只需要拉取合并后的流就能看到房间内所有成员的画面，听到房间内所有成员的声音，无需分别管理房间内的每一条流。

本篇文档主要介绍通过客户端发起混流的操作说明，如果你需要通过自己的服务端发起混流，请参考 [服务端 API - 开始混流](/real-time-video-server/api-reference/stream-mixing/start-mix)。

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Common/ZegoExpressEngine/mixed_flow.png" /></Frame>

### 混流方式分类

ZEGO 支持手动混流、自动混流和全自动混流三种方式，三种混流方式的区别如下：

<table>

  <tbody><tr>
    <th>混流方式</th>
    <td>手动混流</td>
    <td>自动混流</td>
    <td>全自动混流</td>
  </tr>
  <tr>
    <th>含义</th>
    <td>自定义控制混流任务和混流内容，包括输入流、混流布局等。支持手动混视频流和音频流。</td>
    <td>指定房间，自动将房间内的所有音频流进行混流。只支持自动混音频流。</td>
    <td>每个房间都自动混音频流。只支持全自动混音频流。</td>
  </tr>
  <tr>
    <th>应用场景</th>
    <td>合并多个视频画面和声音时可用，比如在线课堂中老师和学生画面的直播，娱乐场景中的跨房间连麦，特殊场景中需混合指定几条流等；设备不支持同时拉多条流或者设备性能较差的场景。</td>
    <td>将房间内所有音频流合为一条流时使用自动混流，比如语聊房、合唱。</td>
    <td>不想做任何开发，房间内所有音频流合为一条流时使用全自动混流，比如语聊房、合唱。</td>
  </tr>
  <tr>
    <th>优势</th>
    <td>灵活性强，能够根据业务需要实现逻辑。</td>
    <td>降低了开发者接入的复杂程度，不需要管理指定房间音频流的生命周期。</td>
    <td>开发者接入复杂程度很低，不需要管理所有房间音频混流任务的生命周期以及音频流的生命周期。</td>
  </tr>
  <tr>
    <th>发起方式</th>
    <td>用户客户端或用户服务端发起混流任务，用户客户端维护流的生命周期。</td>
    <td>用户客户端发起混流任务，ZEGO 服务端自动维护房间内流的生命周期（即输入流列表）。</td>
    <td>联系 ZEGO 技术支持开通全自动混流，ZEGO 服务端维护混流任务和房间内流的生命周期（即输入流列表）。</td>
  </tr>
</tbody></table>


### 优点

- 降低了开发实现上的复杂性。比如当有 N 个主播进行连麦，如果采用混流，观众端不必同时拉 N 路视频流，开发实现上省去了拉 N 路流并布局的步骤。
- 降低了对设备的性能要求，减少设备的性能开销和网络带宽的负担。比如当连麦方过多时，观众端需要拉 N 路视频流，需要设备硬件上能支持同时拉 N 路流。
- 转推多路 CDN 实现简单，只需要在混流配置时按需增加输出流。
- 观众端需要回放多主播连麦视频时，仅需要在 CDN 上开启录制的配置。
- 鉴黄时只需要观察一个画面，不必再同时查看多个画面。


## 示例源码下载

请参考 [下载示例源码](https://doc-zh.zego.im/article/19408) 获取源码。

相关源码请查看 “/page/Topics/MixerStream/” 目录下的文件 MixerStream.ets。

## 前提条件

在实现混流功能之前，请确保：

- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppID 和 AppSign，详情请参考 [控制台 - 项目信息](/console/project-info)。
- 已在项目中集成 ZEGO Express SDK，并实现了基本的音视频推拉流功能，详情请参考 [快速开始 - 集成](https://doc-zh.zego.im/article/19409) 和 [快速开始 - 实现流程](https://doc-zh.zego.im/article/19410)。

<Warning title="注意">
混流功能不是默认开启的，使用前请在 [ZEGO 控制台](https://console.zego.im) 自助开通（开通步骤请参考 [项目管理 - 服务配置](/console/service-configuration/enable-stream-mixing-service) 中的“混流”），或联系 ZEGO 技术支持开通。
</Warning>




## 实现流程

混流的主要流程如下：
1. 房间内的用户推 A 流和 B 流到 ZEGO 实时音视频云服务器上。
2. ZEGO 实时音视频云服务器可以根据需要配置推混流或者推单独的 A 流和 B 流到 CDN 服务器。（采用 RTMP 协议）
3. 拉流端根据需要从 CDN 服务器上拉混流，也可以拉单独的 A 流和 B 流（支持 RTMP、FLV、HLS 等协议）。


## 手动混流使用步骤

手动混流可自定义控制混流任务和混流内容，包括输入流、混流布局等，常用于多人互动直播和跨房间连麦场景。支持手动混视频流和音频流。

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Common/ZegoExpressEngine/mixstream.png" /></Frame>

开发者可通过 SDK 或 ZEGO 服务端 API 实现手动混流功能，服务端相关接口请参考 [开始混流](/real-time-video-server/api-reference/stream-mixing/start-mix) 和 [停止混流](/real-time-video-server/api-reference/stream-mixing/stop-mix)。

以下介绍如何使用 SDK 实现手动混流。

### 初始化并登录房间

可参考 [快速开始 - 实现流程](https://doc-zh.zego.im/article/19410#3_1) 的 “创建引擎” 和 “登录房间”。

<Warning title="注意">

- 混流的前置条件为房间内需要有已存在的流。
- 发起混流的设备可以混房间内已有的其他设备推的流而自己不用推流，也可以自己推流后再混自己推的流。

</Warning>



### 设置混流配置

[ZegoMixerTask](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/ets_ohos/classes/_zegoexpressdefines_.zegomixertask.html) 是 ZegoExpressEngine SDK 中定义的混流任务配置对象，其中包含输入流、输出流等信息。

**创建混流任务对象**

通过构造函数 [ZegoMixerTask ](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/ets_ohos/classes/_zegoexpressdefines_.zegomixertask.html) 新建一个混流任务对象，然后调用实例方法分别设置输入、输出等参数。

```ts
let task = new ZegoMixerTask('789');
```

**（可选）设置混流视频配置**

<Accordion title="混流视频配置设置" defaultOpen="false">

<Note title="说明">
本节操作仅适用于音视频场景，纯音频场景下无需设置。
</Note>

开发者可以调用 [ZegoMixerVideoConfig](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/ets_ohos/classes/_zegoexpressdefines_.zegomixervideoconfig.html) 方法，配置混流任务的视频参数（帧率、码率、分辨率）。

视频的帧率、码率、分辨率的默认值分别为 15 fps、600 kbps、360p。

```ts
// 在创建 ZegoMixerVideoConfig 对象之后，有需要的开发者可以直接设置 videoConfig 的对应字段的对应值，若不设置则使用默认构造方法里设置的默认值 360p、15 fps、600 kbps
let videoConfig = {width: 360, height: 480, fps: 15, bitrate: 600};

task.videoConfig = videoConfig;
```
</Accordion>


**（可选）设置混流音频配置**

<Accordion title="混流音频配置设置" defaultOpen="false">
开发者可以调用 [ZegoMixerAudioConfig](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/ets_ohos/classes/_zegoexpressdefines_.zegomixeraudioconfig.html) 方法，配置混流任务的音频码率、声道数、音频编码。

音频的码率默认值为 48 kbps。

```ts
// 在创建 ZegoMixerAudioConfig 对象之后，有需要的开发者可以直接设置 audioConfig 的对应字段的对应值，若不设置则使用默认构造方法里设置的默认值 48 kbps，单声道，默认的音频编码模式
let audioConfig = {bitrate: 48, channel: ZegoAudioChannel.Mono, codecID: ZegoAudioCodecID.Default, mixMode: ZegoAudioMixMode.Raw}

task.audioConfig = audioConfig;
```
</Accordion>


**设置混流输入流**

根据实际业务场景，定义输入的视频流 [ZegoMixerInput](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/ets_ohos/classes/_zegoexpressdefines_.zegomixerinput.html) 列表，设置其中每条视频流的 “layout” 参数来对每条输入流的画面进行布局，由 ZEGO 实时音视频云服务器将输入流进行混合，输出在一个画面中的混流。

<Warning title="注意">


- 默认支持最多输入 9 路流，如果需要输入更多路流，请联系 ZEGO 技术支持确认和配置。
- 当混入的流为音频流时（即 “contentType” 参数设置为音频混流类型），SDK 内部不处理布局字段，此时无需关注 “layout” 参数。

</Warning>



输入流的布局以输出混流画面的左上角为坐标系原点，参考原点设置输入流的布局，即将 `Rect(x, y, width, height)` 传入输入流的 “layout” 参数。此外，输入流的图层层次由输入流在输入流列表中的位置决定，在列表中的位置越后，表示图层层次越高。

`Rect` 参数说明如下：

<table>

  <tbody><tr>
    <th>参数</th>
    <th>描述</th>
  </tr>
  <tr>
    <td>x</td>
    <td>对应输入流画面左上角的 x 坐标。</td>
  </tr>
  <tr>
    <td>y</td>
    <td>对应输入流画面左上角的 y 坐标。</td>
  </tr>
  <tr>
    <td>width</td>
    <td>对应输入流画面的宽度。</td>
  </tr>
  <tr>
    <td>height</td>
    <td>对应输入流画面的高度。</td>
  </tr>
</tbody></table>

<Warning title="注意">


以上参数在不同的开发平台可能有所差异，具体请以各端的文档为准。

</Warning>



假设启动一个输出画面为 375 × 667 分辨率的混流任务，输入流为一条大小为 150 × 150，位于距左侧 50、距顶部 300 的混流，则需将 `Rect(50, 300, 150, 150)` 传入输入流的 “layout” 参数。


那么这条输入流在最终的输出混流中的位置如下所示：

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/iOS/ZegoExpressEngine/Mixer/mixer-layout.png" /></Frame>

开发者可参考以下示例代码实现常见的混流布局：两个画面水平平铺、四个画面水平垂直平铺、一个大画面铺满和两个小画面悬浮。

以下布局示例皆以 360 × 640 分辨率进行说明。

<Accordion title="混流布局示例 1：两个画面水平平铺" defaultOpen="false">
<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Common/ZegoExpressEngine/mixstreamdemo1.png" /></Frame>

```ts
// 填写第一条输入流配置，每条输入流需要设置Stream ID(该参数中的值必须是输入流的实际 ID），输入流类型，布局等等
let input_1 = {streamID: "streamID_1", contentType: ZegoMixerInputContentType.Video, layout: {x: 0, y: 0, width: 180, height: 640}};
// 填写第二条输入流配置
let input_2 = {streamID: "streamID_2", contentType: ZegoMixerInputContentType.Video, layout: {x: 180, y: 0, width: 180, height: 640}};
// 设置混流输入
task.inputList = [input_1, input_2];
```
</Accordion>


<Accordion title="混流布局示例 2：四个画面水平垂直平铺" defaultOpen="false">
<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Common/ZegoExpressEngine/mixstreamdemo2.png" /></Frame>

```ts
// 填写第一条输入流配置，每条输入流需要设置Stream ID(该参数中的值必须是输入流的实际 ID），输入流类型，布局等等
let input_1 = {streamID: "streamID_1", contentType: ZegoMixerInputContentType.Video, layout: {x: 0, y: 0, width: 180, height: 320}};
// 填写第二条输入流配置
let input_2 = {streamID: "streamID_2", contentType: ZegoMixerInputContentType.Video, layout: {x: 180, y: 0, width: 180, height: 320}};
// 填写第三条输入流配置
let input_3 = {streamID: "streamID_3", contentType: ZegoMixerInputContentType.Video, layout: {x: 0, y: 320, width: 180, height: 320}};
// 填写第四条输入流配置
let input_4 = {streamID: "streamID_4", contentType: ZegoMixerInputContentType.Video, layout: {x: 180, y: 320, width: 180, height: 320}};

// 设置混流输入
task.inputList = [input_1, input_2, input_3, input_4];
```
</Accordion>


<Accordion title="混流布局示例 3：一个大画面铺满和两个小画面悬浮" defaultOpen="false">
<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Common/ZegoExpressEngine/mixstreamdemo3.png" /></Frame>

输入流的图层层次由输入流在输入流列表中的位置决定，在列表中的位置越后，表示图层层次越高。如以下示例代码所示，第 2 条输入流的图层层次和第 3 条输入流的图层层次则比第 1 条输入流的层次要高，则第 2 条和第 3 条流悬浮第 1 条流的画面上。

```ts
// 填写第一条输入流配置，每条输入流需要设置Stream ID(该参数中的值必须是输入流的实际 ID），输入流类型，布局等等
let input_1 = {streamID: "streamID_1", contentType: ZegoMixerInputContentType.Video, layout: {x: 0, y: 0, width: 360, height: 640}};
// 填写第二条输入流配置
let input_2 = {streamID: "streamID_2", contentType: ZegoMixerInputContentType.Video, layout: {x: 230, y: 200, width: 110, height: 200}};
// 填写第三条输入流配置
let input_3 = {streamID: "streamID_3", contentType: ZegoMixerInputContentType.Video, layout: {x: 230, y: 420, width: 110, height: 200}};

// 设置混流输入
task.inputList = [input_1, input_2, input_3];
```
</Accordion>


**设置混流输出信息**

混流输出最多可设置 3 个。当输出目标为 URL 格式时，目前只支持 RTMP URL 格式：`rtmp://xxxxxxxx`，且不能传入两个相同的混流输出的地址。

下面代码演示输出到 ZEGO 服务器（流 ID 为 “output_streamid_1”），通过指定该流名进行拉取，就可以看到混流后的画面：

```ts
// 创建输出流列表对象
let mixerOutput = {target: "output_streamid_1"};
// 设置混流输出信息
task.outputList = [mixerOutput];
```

**（可选）设置混流水印**

<Accordion title="混流水印设置" defaultOpen="false">

<Note title="说明">
本节操作仅适用于音视频场景，纯音频场景下无需设置。
</Note>

如果需要水印图片的 URL，请联系 ZEGO 技术支持获取。

以下代码演示设置一个 ZEGO 的水印放置于画面左上角：

```ts
// 创建水印对象
// watermark.imageURL 的值应将图片发给 Zego 技术人员配置以得到具体字符串的值
let watermark = {imageURL: "preset-id://zegowp.png", layout: {x: 0, y: 0, width: 300, height: 200}};
// 设置输出水印配置
task.watermark = watermark;
```
</Accordion>


**（可选）设置混流背景图片**

<Accordion title="混流背景图片设置" defaultOpen="false">

<Note title="说明">
本节操作仅适用于音视频场景，纯音频场景下无需设置。
</Note>

如果需要背景图片的 URL，请联系 ZEGO 技术支持获取。

```ts
task.backgroundImageURL = "preset-id://zegobg.png";
```
</Accordion>

**（可选）设置混流音量变化回调**

<Accordion title="混流音量变化回调设置" defaultOpen="false">
<Warning title="注意">


在视频场景中，不建议打开声浪开关，否则web端拉HLS协议的流可能会出现兼容性问题。

</Warning>



可通过设置 [enableSoundLevel](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/ets_ohos/classes/_zegoexpressdefines_.zegomixertask.html#enablesoundlevel) 参数选择是否开启混流的音量变化回调通知，开启后（取值为 “True”）用户拉混流时可通过 [mixerSoundLevelUpdate](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/ets_ohos/interfaces/_zegoexpresseventhandler_.zegoeventlistener.html#mixersoundlevelupdate) 回调收到每条单流的音量变化信息。

```ts
task.enableSoundLevel = true;
```
</Accordion>


**（可选）设置高级配置**

<Accordion title="高级配置设置" defaultOpen="false">
高级配置适用于一些定制化需求，例如：配置视频编码格式。

如果需要了解具体支持的配置项信息，请联系 ZEGO 技术支持。

<Note title="说明">


普通场景无需设置高级配置。

</Note>



```ts
// 指定混流输出视频格式为 vp8 ，使用特定的推流协议才能生效。
let advancedConfig = {"video_encode": "vp8"}
task.advancedConfig = advancedConfig;

// 如果混流输出视频格式设为 vp8，请同步设置音频编码格式为 LOW3，设置方可生效。
let audioConfig = {codecID: ZegoAudioCodecID.Low3}
task.audioConfig = audioConfig;
```
</Accordion>

### 启动混流任务

完成了 [ZegoMixerTask](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/ets_ohos/classes/_zegoexpressdefines_.zegomixertask.html) 混流任务对象的配置后，调用开始混流的接口以启动这个混流任务，并在回调中处理启动混流任务失败的逻辑。

```ts
this.ZegoExpressInstance.startMixerTask(mixTask).then((result: ZegoMixerStartResult) =>{
    if(result)
    {
        this.logInfo('ZegoMixerStartResult. code: '+ result.errorCode);
        // 混流任务启动成功，或更新混流成功
        // 混流任务启动失败，或更新混流失败（更新失败不影响原先的混流任务）
    }
})
```

### 更新混流任务的配置

当混流信息发生变更时，例如混流的输入流列表发生增减、调整混流视频输出码率等，修改该混流任务对象的参数，然后再调用一次 [startMixerTask](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/ets_ohos/classes/_zegoexpressengine_.zegoexpressengine.html#startmixertask) 接口即可更新配置。

<Warning title="注意">
更新混流任务的配置时，“taskID” 不可更改。
</Warning>



### 停止混流

调用 [stopMixerTask](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/ets_ohos/classes/_zegoexpressengine_.zegoexpressengine.html#stopmixertask) 接口停止混流。

```ts
// 传入正在混流中的 taskID 以停止该混流任务
this.ZegoExpressInstance.stopMixerTask(mixTask).then((result: ZegoMixerStopResult) =>{
    if(result)
    {
        this.logInfo('ZegoMixerStopResult. code: '+ result.errorCode);
    }
})
```

## 全自动混流使用步骤

通过 ZEGO 服务端的配置实现每个房间都自动混音频流，详情请联系 ZEGO 技术支持。

## 常见问题

1. **能将混流推到第三方 CDN 吗？如何转推多路 CDN？**

    若需要将混流推到第三方 CDN，可在 [ZegoMixerOutput](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/ets_ohos/classes/_zegoexpressdefines_.zegomixeroutput.html) 的 “target” 参数填写 CDN 的 URL。

    填写的 URL 格式需要为 RTMP 格式：“rtmp://xxxxxxxx”。

    推多路 CDN 就创建 N 个输出流对象 [ZegoMixerOutput](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/ets_ohos/classes/_zegoexpressdefines_.zegomixeroutput.html) 放入 [ZegoMixerTask](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/ets_ohos/classes/_zegoexpressdefines_.zegomixertask.html) 中的 “outputList” 输出列表中。

2. **如何设置混流中每条流的布局？**

    [ZegoMixerInput](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/ets_ohos/classes/_zegoexpressdefines_.zegomixerinput.html) 的 “layout” 参数使用示例。

    - 假设指定某条流的左上角坐标为 (50，300)，右下角坐标为 (200，450)，即 “layout” 参数为 “[ZegoRect rectWithLeft:50 top:300 right:200 bottom:450];”。
    - 假设 [ZegoMixerTask](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/ets_ohos/classes/_zegoexpressdefines_.zegomixertask.html) 的 “videoConfig” 参数中的分辨率 “resolution” 为 “CGSizeMake(375, 667)”。

    那么这条流在最终的输出混流中的位置如下所示：

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/iOS/ZegoExpressEngine/Mixer/mixer-layout.png" /></Frame>

3. **混流输入对象 “ZegoMixerInput” 的 “ZegoRect” 布局的比例与这条流本身的分辨率不相符时，画面将如何裁剪？**

    SDK 会做等比缩放。假设一条输入流的分辨率为 “720 × 1280”，即比例为 “9：16”，同时这条流的 [ZegoMixerInput](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/ets_ohos/classes/_zegoexpressdefines_.zegomixerinput.html) 的 “layout” 参数为 “[left:0 top:0 right:100 bottom:100]”，即比例为 “1：1” 时，画面将会显示这条流的中间部分，即上下部分被裁剪掉。

4. **参与连麦的主播们想让各自的观众看到自己的视频在混流后的画面布局中位于大窗口，如何混流？**

    主播们各自布局再各自发起混流。

    例如：主播 A 设置自己推的流 A 画面布局的宽高大于拉主播 B 的流 B 的布局宽高，然后发起一个混流任务输出一个流 “A_Mix”；主播 B 设置自己推的流 B 画面布局的宽高大于拉主播 A 的流 A 的布局宽高，然后发起混流输出一个流 “B_Mix”。

    即总共需要发起两个混流任务。

5. **混流的两种方式：“单主播开始直播后就马上开始混流”和“当第二主播加入连麦的时候才开始混流”，这两种方式有什么区别？优劣势是什么？**

    从单主播直播开始就启动混流的优点是实现简单，缺点是会多一些额外的混单流时间的 CDN 成本开销。

    从单主播直播开始仅推流，等第二路主播加入连麦时才启动混流。优点是节约成本；缺点是开发实现上会复杂一些，观众端需要先拉取单主播流，主播们连麦开启混流后需要停止拉单主播流，然后改为拉取混流。而上述从头开始混流的方式，观众端不需要做从拉单主播流再到拉混流的一个切换。

6. **混流是否支持圆形或者方形的画面？**

    不支持圆形，方形可通过布局实现。
