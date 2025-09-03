# 多路混流

- - -

## 功能简介

混流是把多路音视频流从云端混合成单流的技术，混流发起方可以混房间内其他用户或自己推的流。

### 优点

1. 降低了开发实现上的复杂性，比如当有 N 个主播进行连麦，如果采用混流，观众端不必同时拉 N 路视频流，开发实现上省去了拉 N 路流并布局的步骤。
2. 降低了对设备的性能要求，减少设备的性能开销和网络带宽的负担；比如当连麦方过多时，观众端需要拉 N 路视频流，需要设备硬件上能支持同时拉 N 路流。
3. 转推多路 CDN 实现简单，只需要在混流配置时按需增加输出流。
4. 观众端需要回放多主播连麦视频时，仅需要在 CDN 上开启录制的配置。
5. 鉴黄时只需要观察一个画面，不必再同时查看多个画面。

### 常见应用场景

1. 当设备不支持同时拉 N 路流时使用混流。
2. 需要多个视频画面合成一个视频时使用混流，比如教育类场景，直播老师和学生的画面。

### 使用说明

SDK 既支持音视频混流，也支持纯音频混流。

开发者在拉流/推流成功后开始混流，比如主播 A 与观众 B 成功连麦后，成功拉取到观众 B 的画面时即开始混主播 A 和观众 B 的流。也可以根据需求，在其他合适时机进行混流。

### 系统架构图

使用混流功能时，SDK 将流推到 ZEGO 服务器上，ZEGO 服务器将指定流混成一路流后再推到 CDN，观众从 CDN 上拉混流观看。

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/iOS/ZegoExpressEngine/Mixer/mixer-structure.png" /></Frame>

## 前提条件

- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppID 和 Server 地址，详情请参考 [控制台 - 项目信息](/console/project-info)。
- 已在项目中集成 ZEGO Express SDK，并实现了基本的音视频推拉流功能，详情请参考 [快速开始 - 集成](https://doc-zh.zego.im/article/1240) 和 [快速开始 - 实现流程](https://doc-zh.zego.im/article/7635)。

- 确保房间内已有流。

<Warning title="注意">


混流功能不是默认开启的，使用前请在 [ZEGO 控制台](https://console.zego.im) 自助开通（开通步骤请参考 [项目管理 - 服务配置](/console/service-configuration/enable-stream-mixing-service) 中的“混流”），或联系 ZEGO 技术支持开通。

</Warning>




## 使用步骤

### 设置混流配置

[ZegoMixerTask ](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_electron~struct~ZegoMixerTask) 是 ZegoExpressEngine SDK 中定义的混流任务配置对象，其中包含输入流、输出流等信息。

#### 创建混流视频配置对象

<Note title="说明">
本节操作仅适用于音视频场景，纯音频场景下无需设置。
</Note>

创建 [ZegoMixerVideoConfig ](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_electron~struct~ZegoMixerVideoConfig) 对象，设置混流视频相关配置，包含视频分辨率、帧率和码率，开始混流后不支持修改视频帧率。

```JavaScript
// 以下视频配置的字段必须存在且正确
let videoConfig = {
    width: 360,
    height: 640,
    fps: 15,
    bitrate: 600
}
```

#### 创建混流音频配置对象

创建 [ZegoMixerAudioConfig ](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_electron~struct~ZegoMixerAudioConfig) 对象，设置混流音频配置，包含音频码率、声道和编码 ID，开始混流后不支持修改音频码率。

```JavaScript
// 以下视频配置的字段必须存在且正确
let audioConfig = {
    bitrate: 48,
    channel: ZegoAudioChannel.MONO,
    codecID: ZegoAudioCodecID.DEFAULT
}
```

#### 创建混流输出信息对象数组

创建 [ZegoMixerOutput ](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_electron~struct~ZegoMixerOutput) 对象，设置混流输出信息。

数组输出最多可设 3 个元素，表示混流之后对应输出多条流。当输出目标为 URL 格式时，目前只支持 RTMP URL 格式：rtmp://xxxxxxxx，且不能传入两个相同的混流输出的地址。

如下示例代码表示混流输出到 ZEGO 服务器，流名为 "output_streamid_1"，通过指定该流名进行拉取，就可以看到混流后的画面。

```JavaScript
// ZegoMixerOutput 对象必须为数组类型
let outputList = [
    {target: "output_streamid_1"}
]
```

#### 创建混流输入流信息对象数组

创建 [ZegoMixerInput ](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_electron~struct~ZegoMixerInput) 对象，设置混流输入信息，包含流 ID、混流内容类型、混流布局等。

输入流最多支持设置 9 路。

<Warning title="注意">


当混入的流为音频流时（即 “contentType” 参数设置为音频混流类型），SDK 内部不处理布局字段，此时无需关注 “layout” 参数。


</Warning>




如下示例代码以混两路流，上下布局为例：

```JavaScript
// ZegoMixerInput 对象必须为数组类型，以下混流输入的单项的字段必须存在且正确，并使用上述创建的 videoConfig 的对象
let inputList = [
    {
        streamID: "streamID_1",
        contentType: ZegoMixerInputContentType.Video,
        layout: {
            x: 0,
            y: 0,
            width: videoConfig.width,
            height: videoConfig.height/2
        },
        soundLevelID: 1
    },
    {
        streamID: "streamID_2",
        contentType: ZegoMixerInputContentType.Video,
        layout: {
            x: 0,
            y: videoConfig.height/2,
            width: videoConfig.width,
            height: videoConfig.height/2
        },
        soundLevelID: 2
    }
]
```

#### 创建混流水印对象（可选）

<Note title="说明">
1. 本节操作仅适用于实时音视频场景，不适用于纯音频场景。
2. 实时音视频场景下，若不设置混流水印，则可跳过此步骤，在构造混流任务 task 对象时，无需填写“watermark”的键。
</Note>


创建 [ZegoWatermark ](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_electron~struct~ZegoWatermark) 对象，设置混流水印，水印的“imageURL”需要联系 ZEGO 技术支持获取。

如下示例代码以设置一个 ZEGO Logo 水印放置于画面左上角为例：

```JavaScript
// ZegoWatermark 字段必须存在且正确，并使用上述创建的 videoConfig 的对象
let watermark = {
    // imageURL 的值应将图片发给 ZEGO 技术支持配置以得到具体字符串的值
    imageURL: "preset-id://zegowp.png",
    layout: {
        x: 0,
        y: 0,
        width: 200,
        height: 200
    }
}
```

#### 创建混流背景图片

<Note title="说明">

本节操作仅适用于音视频场景，纯音频场景下无需设置。

</Note>




可以为混流任务指定背景图片，图片的“backgroundImageURL”需要联系 ZEGO 技术支持获取。若不设置背景图片，则“backgroundImageURL”可传空字符串。

```JavaScript
let backgroundImageURL = "preset-id://zegobg.png"
```

#### 创建混流任务对象

创建 [ZegoMixerTask ](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_electron~struct~ZegoMixerTask) 对象，设置混流任务。

```JavaScript
let task = {
    // 一个混流任务的唯一标识
    "taskID": "task1",
    // 上述 3.2.4 小节创建的 inputList 对象
    "inputList": inputList,
    // 上述 3.2.3 小节创建的 outputList 对象
    "outputList": outputList,
    // 上述 3.2.1 小节创建的 videoConfig 对象
    "videoConfig": videoConfig,
    // 上述 3.2.2 小节创建的 audioConfig 对象
    "audioConfig": audioConfig,
    // 上述 3.2.5 小节创建的 watermark 对象。若不想设置水印，则不要填写此键值对
    "watermark": watermark,
    // 上述 3.2.6 小节创建的 backgroundImageURL 对象
    "backgroundImageURL": backgroundImageURL,
    "enableSoundLevel": enableSoundLevel
}
```

### 启动混流任务

混流任务创建完成后，调用 [startMixerTask ](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_electron~class~ZegoExpressEngine#start-mixer-task) 接口启动该混流任务，若请求开启混流任务发生异常，例如混流的输入流不存在，将会从 callback 回调的错误码给出。

<Warning title="注意">
如果需要 Web 端播放混流 CDN 资源，在使用 CDN 录制时，音频编码请选择 AAC-LC，由于部分浏览器（如 Google Chrome 和 Microsoft Edge）不兼容 HE-AAC 音频编码格式，会导致录制文件无法播放。
</Warning>



```JavaScript
// 上述 3.2.7 小节创建的 task 对象
zgEngine.startMixerTask(task).then(function (errorCode, extendedData){
    // 混流失败的处理逻辑
    ...
})
```

### 更新混流任务配置

当混流信息发生变更时，例如混流的输入流列表发生增减、调整混流视频输出码率等，则修改该混流任务对象的参数后再调用一次 [startMixerTask ](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_electron~class~ZegoExpressEngine#start-mixer-task) 接口即可更新配置。

<Warning title="注意">


更新混流任务的配置时，“taskID” 不可更改。

</Warning>




### 停止混流任务

调用 [stopMixerTask ](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_electron~class~ZegoExpressEngine#stop-mixer-task) 接口停止混流任务。

<Warning title="注意">
启动下一个混流任务时，建议先停止上一个混流任务，以免造成主播已经开启下一个混流任务与其他主播混流，观众依然在拉上一个混流任务输出流的情况。
</Warning>




```JavaScript
// 传入正在混流中的 taskID 以停止该混流任务
// task 对象为上述 3.2.7 小节创建的
zgEngine.stopMixerTask(task);
```

## 常见问题

**1. 能将混流推到第三方 CDN 吗？如何转推多路 CDN？**

若需要将混流推到第三方 CDN，可在 [ZegoMixerOutput ](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_electron~struct~ZegoMixerOutput) 接口的“target”参数填写 CDN 的 URL，且 URL 格式需要为 RTMP 格式，例如“rtmp://xxxxxxxx”。

推多路 CDN 需要创建 N 个输出流对象，将 [ZegoMixerOutput ](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_electron~struct~ZegoMixerOutput) 放入 [ZegoMixerTask ](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_electron~struct~ZegoMixerTask) 的 “outputList”输出列表中。

**2. 如何设置混流中每条流的布局？**

通过 [ZegoMixerInput ](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_electron~struct~ZegoMixerInput) 对象的“layout”参数进行设置，使用示例如下：

1. 假设指定某条流的左上角坐标为 (50，300)，右下角坐标为 (200，450)，则“layout”参数为[ZegoRect rectWithLeft:50 top:300 right:200 bottom:450]。
2. 假设 [ZegoMixerTask ](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_electron~struct~ZegoMixerTask) 对象的“setVideoConfig”参数中的分辨率“resolution”为“CGSizeMake(375, 667)”，则这条流在最终的输出混流中的位置如下所示：

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/iOS/ZegoExpressEngine/Mixer/mixer-layout.png" /></Frame>

**3. 混流输入对象 [ZegoMixerInput ](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_electron~struct~ZegoMixerInput) 的“ZegoRect”布局的比例与这条流本身的分辨率不相符时，画面将如何裁剪？**

SDK 会做等比缩放。假设一条输入流的分辨率为“720x1280”，即比例为“9:16”，同时这条流的 [ZegoMixerInput ](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_electron~struct~ZegoMixerInput) 的“layout”参数为“[left:0 top:0 right:100 bottom:100]”， 即比例为 “1:1” 时，画面将会显示这条流的中间部分，即裁剪了上下部分。

**4. 参与连麦的主播们想让各自的观众看到自己的视频在混流后的画面布局中位于大窗口时，如何混流？**

主播们各自布局后再各自发起混流。

例如：主播 A 设置自己推的流 A 画面布局的宽高大于拉主播 B 的流 B 的布局宽高，然后发起一个混流任务输出一个流“A_Mix”，主播 B 设置自己推的流 B 画面布局的宽高大于拉主播 A 的流 A 的布局宽高，然后发起混流输出一个流 “B_Mix”。

即总共需要发起两个混流任务。

**5. 混流“方式1:单主播开始直播后马上开始混流”和“方式2:当第二主播加入连麦时才开始混流”有什么区别？优劣势是什么？**

- 从单主播直播开始就启动混流的优点是实现简单，缺点是会多一些额外的混单流时间的 CDN 成本开销。

- 从单主播直播开始仅推流，等第二路主播加入连麦时才启动混流，优点是节约成本，缺点是开发实现上会复杂一些。观众端需要先拉取单主播流，主播们连麦开启混流后需要停止拉单主播流，然后改为拉取混流。而方式1中观众端不需要从拉单主播流切换到拉混流。

**6. 混流是否支持圆形或者方形的画面？**

不支持圆形，方形可通过布局实现。

<Content />
