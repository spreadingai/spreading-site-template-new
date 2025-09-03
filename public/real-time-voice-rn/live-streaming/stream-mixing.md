# 多路混流


## 功能简介

混流是把多路音视频流从云端混合成单流的技术。

### 混流优点

- 降低了开发实现上的复杂性，例如当有 N 个主播进行连麦，如果采用混流，观众端不必同时拉 N 路视频流，开发实现上省去了拉 N 路流并布局的步骤。
- 降低了对设备的性能要求，减少设备的性能开销和网络带宽的负担。例如当连麦方过多时，观众端需要拉 N 路视频流，需要设备硬件上能支持同时拉 N 路流。
- 转推多路 CDN 实现简单，只需要在混流配置时按需增加输出流。
- 观众端需要回放多主播连麦视频时，仅需要在 CDN 上开启录制的配置。
- 鉴黄时只需要观察一个画面，不必再同时查看多个画面。

### 混流常见使用场景

- 当设备不支持同时拉 N 路流时使用混流。
- 需要多个视频画面合成一个视频时使用混流，比如教育类场景，直播老师和学生的画面。

### 混流使用说明

SDK 既支持音视频混流，也支持纯音频混流。

开发者在拉流 / 推流成功后开始混流。比如主播 A 与观众 B 成功连麦后，成功拉取到观众 B 的画面时即开始混主播 A 的流和观众 B 的流。也可以根据需求，在其他合适时机进行混流。

### 混流系统架构图

使用混流功能时，SDK 将流推到 ZEGO 服务器上，ZEGO 服务器将指定流混合成一路流后再推到 CDN 上，观众从 CDN 上拉混流观看。

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/iOS/ZegoExpressEngine/Mixer/mixer-structure.png" /></Frame>

## 前提条件

在混流前，请确保：

- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppID 和 AppSign，详情请参考 [控制台 - 项目信息](/console/project-info)。
- 已在项目中集成 ZEGO Express SDK，并实现了基本的音视频推拉流功能，详情请参考 [快速开始 - 集成](https://doc-zh.zego.im/article/6658) 和 [快速开始 - 实现流程](https://doc-zh.zego.im/article/8611)。

<Warning title="注意">
混流功能不是默认开启的，使用前请在 [ZEGO 控制台](https://console.zego.im) 自助开通（开通步骤请参考 [项目管理 - 服务配置](/console/service-configuration/enable-stream-mixing-service) 中的“混流”），或联系 ZEGO 技术支持开通。
</Warning>



## 使用步骤

<Warning title="注意">
混流前房间内需要有已存在的流。
发起混流的设备可以混房间内已有的其他设备推的流而本端不用推流，也可以本端推流后再混自己推的流。
</Warning>



### 设置混流配置

[ZegoMixerTask](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/classes/_zegoexpressdefines_.zegomixertask.html) 是 SDK 中定义的混流任务配置对象，其中包含输入流布局、输出流等信息。

- 混流配置类原型：

    ```javascript
    export class ZegoMixerTask {
        // 混流任务 ID
        taskID: string
        // 混流任务对象的输入流列表（必填）
        inputList: ZegoMixerInput[]
        // 混流任务对象的输出列表（必填）
        outputList: ZegoMixerOutput[]
        // 混流任务对象的视频配置（可选，若对视频画面布局有要求，则必须显式填写输出的分辨率）
        videoConfig: ZegoMixerVideoConfig
        // 混流任务对象的音频配置（可选）
        audioConfig: ZegoMixerAudioConfig
        // 是否开启混流中携带各输入流的声浪信息
        enableSoundLevel: boolean

        // 通过 TaskID 构造一个混流任务对象
        constructor(taskID: string) {
            this.taskID = taskID
            this.inputList = []
            this.outputList = []
            this.audioConfig = {bitrate: 48, channel: ZegoAudioChannel.Mono, codecID: ZegoAudioCodecID.Normal}
            this.videoConfig = {width: 360, height: 640, fps: 15, bitrate: 600}
            this.enableSoundLevel = false
        }
    }
    ```

#### 创建混流任务对象

新建一个混流任务对象 [ZegoMixerTask](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/classes/_zegoexpressdefines_.zegomixertask.html)，再分别设置输入、输出等参数。

```javascript
const task = new ZegoMixerTask("MY_TASK_ID");
```

#### （可选）设置混流视频配置

<Note title="说明">
本节操作仅适用于音视频场景，纯音频场景下无需设置。
</Note>



开发者可以调用 [ZegoMixerVideoConfig](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/classes/_zegoexpressdefines_.zegomixervideoconfig.html) 方法，配置混流任务的视频参数（帧率、码率、分辨率）。

视频的帧率、码率、分辨率的默认配置分别为 15 fps、600 kbps、 360p。

```javascript
task.videoConfig = {width: 360, height: 640, fps: 15, bitrate: 600}
```

#### （可选）设置混流音频配置

开发者可以调用 [ZegoMixerAudioConfig](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/classes/_zegoexpressdefines_.zegomixeraudioconfig.html) 方法，配置混流任务的音频码率、声道数、音频编码。

音频的码率默认值为 48 kbps。

```javascript
task.audioConfig = {bitrate: 48, channel: ZegoAudioChannel.Mono, codecID: ZegoAudioCodecID.Normal}
```

#### 设置混流输入流

默认支持最多输入 9 路流，如果需要输入更多路流，请联系 ZEGO 技术支持确认和配置。

<Warning title="注意">
当混入的流为音频流时（即 “contentType” 参数设置为音频混流类型），SDK 内部不处理布局字段，此时无需关注 “layout” 参数。
</Warning>



如下代码以混两路流，上下布局为例：

```javascript

task.inputList.push({"streamID": "stream-1", "contentType": ZegoMixerInputContentType.Video, "layout": {"x": 0, "y": 0, "width": task.videoConfig.width, "height": task.videoConfig.height/2}})

task.inputList.push({"streamID": "stream-2", "contentType": ZegoMixerInputContentType.Video, "layout": {"x": 0, "y": task.videoConfig.height / 2, "width": task.videoConfig.width, "height": task.videoConfig.height/2}})

```

#### 设置混流输出

混流输出最多可设置 3 个。当输出目标为 URL 格式时，目前只支持 RTMP URL 格式：rtmp://xxxxxxxx，且不能传入两个相同的混流输出的地址。

如下代码以输出到 ZEGO 服务器，流名为 "output-stream" 为例：

```javascript
task.outputList = [{"target": "output-stream"}]
```

### 开始混流任务

完成了 [ZegoMixerTask](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/classes/_zegoexpressdefines_.zegomixertask.html) 混流任务对象的配置后，调用 [startMixerTask](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/classes/_zegoexpressengine_.zegoexpressengine.html#startmixertask) 接口以启动该混流任务，并在异步结果返回中处理启动混流任务失败的逻辑。

<Warning title="注意">
如果需要 Web 端播放混流 CDN 资源，在使用 CDN 录制时，音频编码请选择 AAC-LC，由于部分浏览器（如 Google Chrome 和 Microsoft Edge）不兼容 HE-AAC 音频编码格式，会导致录制文件无法播放。
</Warning>




- 接口原型：

    ```javascript
    // 开始混流任务
    // @param task 已配置好混流参数的任务
    startMixerTask(task: ZegoMixerTask): Promise<ZegoMixerStartResult>;
    ```

- 调用示例：

    ```javascript
    ZegoExpressEngine.instance().startMixerTask(task).then((result) => {
        if (result.errorCode == 0) {
            console.log("Start mixer task success");
        } else {
            console.log("Start mixer task fail");
        }
    }];
    ```

### 更新混流任务的配置

当混流信息发生变更时（例如混流的输入流列表发生增减、调整混流视频输出码率等，修改该混流任务对象的参数），再调用一次 [startMixerTask ](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/classes/_zegoexpressengine_.zegoexpressengine.html#startmixertask) 接口即可更新配置。

<Warning title="注意">
更新混流任务的配置时，“taskID” 不可更改。
</Warning>

如下代码以进行混流任务途中添加一条输入流，上中下布局为例：

```javascript

// 先将原来的输入流数组清空
task.inputList = []

// 重新设置之前保存的混流对象的输入流列表
task.inputList.push({"streamID": "stream-1", "contentType": ZegoMixerInputContentType.Video, "layout": {"x": 0, "y": 0, "width": task.videoConfig.width, "height": task.videoConfig.height/3}})

task.inputList.push({"streamID": "stream-2", "contentType": ZegoMixerInputContentType.Video, "layout": {"x": 0, "y": task.videoConfig.height / 3, "width": task.videoConfig.width, "height": task.videoConfig.height/3}})

task.inputList.push({"streamID": "stream-3", "contentType": ZegoMixerInputContentType.Video, "layout": {"x": 0, "y": task.videoConfig.height * (2/3), "width": task.videoConfig.width, "height": task.videoConfig.height/3}})


// 再调用一次启动混流任务接口，即可更新混流配置
ZegoExpressEngine.instance().startMixerTask(task).then((result) => {
    if (result.errorCode == 0) {
        console.log("Start mixer task success");
    } else {
        console.log("Start mixer task fail");
    }
}];
```

### 停止混流

调用 [stopMixerTask ](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/classes/_zegoexpressengine_.zegoexpressengine.html#stopmixertask) 接口停止混流。

- 接口原型：

    ```javascript
    // 停止混流任务
    // @param task 已保存的混流任务
    stopMixerTask(task: ZegoMixerTask): Promise<ZegoMixerStopResult>;
    ```

- 调用示例：

    ```objc
    // 传入正在混流中的 task 以停止该混流任务
    ZegoExpressEngine.instance().stopMixerTask(task);
    ```


## 常见问题

**1. 能将混流推到第三方 CDN 吗？如何转推多路 CDN？**

若需要将混流推到第三方 CDN，可在 [ZegoMixerOutput ](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/classes/_zegoexpressdefines_.zegomixeroutput.html) 的 “target” 参数填写 CDN 的 URL。填写的 URL 格式需要为 RTMP 格式，例如 “rtmp://xxxxxxxx”。

推多路 CDN 就创建 N 个输出流对象 [ZegoMixerOutput ](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/modules/_index_.html#zegomixeroutput) 放入 “ZegoMixerTask” 中的 “outputList” 输出列表中。

**2. 如何设置混流中每条流的布局？**

[ZegoMixerInput ](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/classes/_zegoexpressdefines_.zegomixerinput.html) 的 “layout” 参数使用示例：

1. 假设指定某条流的左上角坐标为 (50，300)，右下角坐标为 (200，450)，即 “layout” 参数为 `{"x": 50, "y": 300, "width": 200 - 50, "height": 450 - 300}`。
2. 假设 ZegoMixerTask 的 “videoConfig” 参数中的分辨率 “width” 和 “height” 分别为 (375, 667)。

则这条流在最终的输出混流中的位置如下所示：

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/iOS/ZegoExpressEngine/Mixer/mixer-layout.png" /></Frame>

**3. 混流输入对象 [ZegoMixerInput ](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/classes/_zegoexpressdefines_.zegomixerinput.html) 的 “ZegoRect” 布局的比例与这条流本身的分辨率不相符时，画面将如何裁剪？**

SDK 会做等比缩放。假设一条输入流的分辨率为 “720x1280”，即比例为 “9:16”，同时这条流的 “ZegoMixerInput” 的 “layout” 参数为 `{"x": 0, "y": 0, "width": 100, "height": 100}` 即比例为 “1:1” 时，画面将会显示这条流的中间部分，即上下部分被裁剪掉。

**4. 参与连麦的主播们想让各自的观众看到自己的视频在混流后的画面布局中位于大窗口，如何混流？**

主播们各自布局再各自发起混流。

例如：主播 A 设置自己推的流 A 画面布局的宽高大于拉主播 B 的流 B 的布局宽高，然后发起一个混流任务输出一个流 “A_Mix”。主播 B 设置自己推的流 B 画面布局的宽高大于拉主播 A 的流 A 的布局宽高，然后发起混流输出一个 流 “B_Mix”。

即总共需要发起两个混流任务。

**5. “单主播开始直播后马上开始混流”与“当第二主播加入连麦时才开始混流”两种混流方式有什么区别？优劣势是什么？**

从单主播直播开始就启动混流的优点是实现简单，缺点是会多一些额外的混单流时间的 CDN 成本开销。

从单主播直播开始仅推流，等第二路主播加入连麦时才启动混流，优点是节约成本，缺点是开发实现上会复杂一些。观众端需要先拉取单主播流，主播们连麦开启混流后需要停止拉单主播流，然后改为拉取混流。而从单主播开始混流的方式，观众端不需要做从拉单主播流再到拉混流的一个切换。

**6. 混流是否支持圆形或者方形的画面？**

不支持圆形，方形可通过布局实现。

<Content />

