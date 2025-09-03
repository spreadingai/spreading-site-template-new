# 混流
- - -
## 功能简介
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


### 混流优点
1. 降低了开发实现上的复杂性。比如当有 N 个主播进行连麦，如果采用混流，观众端不必同时拉 N 路视频流，开发实现上省去了拉 N 路流并布局的步骤。
2. 降低了对设备的性能要求，减少设备的性能开销和网络带宽的负担。比如当连麦方过多时，观众端需要拉 N 路视频流，需要设备硬件上能支持同时拉 N 路流。
3. 转推多路 CDN 实现简单，只需要在混流配置时按需增加输出流。
4. 观众端需要回放多主播连麦视频时，仅需要在 CDN 上开启录制的配置。
5. 鉴黄时只需要观察一个画面，不必再同时查看多个画面。




## 示例源码下载

请参考 [下载示例源码](https://doc-zh.zego.im/article/3211) 获取源码。

相关源码请查看 “src/Examples/Others/StreamMixing” 目录下的文件。

## 前提条件

在实现混流功能之前，请确保：

- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppID 和 Server 地址，详情请参考 [控制台 - 项目信息](/console/project-info)。
- 已在项目中集成 ZEGO Express SDK，并实现了基本的音视频推拉流功能，详情请参考 [快速开始 - 集成](https://doc-zh.zego.im/article/199) 和 [快速开始 - 实现流程](https://doc-zh.zego.im/article/7638)。

<Warning title="注意">


混流功能不是默认开启的，使用前请在 [ZEGO 控制台](https://console.zego.im) 自助开通（开通步骤请参考 [项目管理 - 服务配置](/console/service-configuration/enable-stream-mixing-service) 中的“混流”），或联系 ZEGO 技术支持开通。

</Warning>



## 手动混流使用步骤

手动混流可自定义控制混流任务和混流内容，包括输入流、混流布局等，常用于多人互动直播和跨房间连麦场景。支持手动混视频流和音频流。

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Common/ZegoExpressEngine/mixstream.png" /></Frame>

开发者可通过 SDK 或 ZEGO 服务端 API 实现手动混流功能，服务端相关接口请参考 [开始混流](/real-time-video-server/api-reference/stream-mixing/start-mix) 和 [停止混流](/real-time-video-server/api-reference/stream-mixing/stop-mix)。

以下介绍如何使用 SDK 实现手动混流。

混流的主要流程：

1. 进入房间并推拉流。
2. 开始混流。
3. 将混流成功后的 URL 地址通过后台做下发。
4. 观众获取到 URL 地址后进行播放。

按照上述流程，SDK API 调用过程如下文所示。

### 推流
主播端推流后混流的前置条件为推流，请参考 [快速开始 - 实现流程](https://doc-zh.zego.im/article/7638#publishingStream) 的 “推流”。

### 设置混流配置

#### 设置混流输入流

根据实际业务场景，调用 [ZegoMixStreamConfig](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoMixStreamConfig) 中 [inputList](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoMixStreamConfig#input-list) 的定义输入的视频流列表，列表中是 [ZegoMixStreamInput](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoMixStreamInput) 对象，表示为 “streamID” 的流。根据所需的输入流个数构建 N 个 [ZegoMixStreamInput](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoMixStreamInput) 放入输入流列表。

<Warning title="注意">


- “taskID” 为混流任务 ID，由开发者自定义，须保证是唯一的。
- SDK 对混流画面布局采用输入流列表中的输入流排序，按照叠放的方式布局，为了避免大布局遮挡小布局，将输入流信息放进列表时需将大布局的输入流排在小布局输入流前面。例如，想在 A 布局上放置一个小布局 B，输入流列表就应写 `ZegoMixStreamInput[] inputStreamInfo = {streamInfoA, streamInfoB}`。
- 当混流输入流的 “ContentType” 都设置为 “AUDIO” 时，SDK 内部不处理布局字段，此时无需关注 “layout” 参数。
- 当混流输入流的 “ContentType” 都设置为 “AUDIO” 时，SDK 内部会默认把分辨率设置为 1*1（即混流输出是纯音频）。如果您想要混流输出有视频画面或者背景图，则至少需要将一路输入流的 “ContentType” 设置为 “VIDEO”。


</Warning>



[ZegoMixStreamInput](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoMixStreamInput) 的使用示例：

输入流的布局以输出混流画面的左上角为坐标系原点，参考原点设置输入流的布局，即传入输入流的 “layout” 参数。此外，输入流的图层层次由输入流在输入流列表中的位置决定，在列表中的位置越后，表示图层层次越高。

“layout” 参数说明如下：
<table>

  <tbody><tr>
    <th>参数</th>
    <th>描述</th>
  </tr>
  <tr>
    <td>left</td>
    <td>对应输入流画面左上角的 x 坐标。</td>
  </tr>
  <tr>
    <td>top&nbsp;</td>
    <td>对应输入流画面左上角的 y 坐标。</td>
  </tr>
  <tr>
    <td>right</td>
    <td>对应输入流画面右下角的 x 坐标。</td>
  </tr>
  <tr>
    <td>bottom&nbsp;</td>
    <td>对应输入流画面右下角的 y 坐标。</td>
  </tr>
</tbody></table>

假设指定某条流的左上角坐标为 (50, 300)，右下角坐标为 (200, 450)，这条流在最终的输出混流中的位置如下图所示：
<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/iOS/ZegoLiveRoom/ZegoLiveRoom-MixStream/mixStreamInfo.png" /></Frame>


``` javascript
 /**
     *  原点在左上角，top/bottom/left/right 定义如下：
     *
     *  (left, top)-----------------------
     *  |                                |
     *  |                                |
     *  |                                |
     *  |                                |
     *  -------------------(right, bottom)
     */

// inputList 参数设置
const inputList = [
    // 画面A
    {
        streamID: "streamA",
        layout: {
            top: 0,
            left: 0,
            bottom: 375,
            right: 667,
        },
    },
    //画面B
    {
        streamID: "streamB",
        layout: {
            top: 300,
            left: 50,
            bottom: 450,
            right: 200,
        },
    },

];

```
开发者可参考以下示例代码实现常见的混流布局：两个画面水平平铺、四个画面水平垂直平铺、一个大画面铺满和两个小画面悬浮。

以下布局示例皆以 360×640 分辨率进行说明。

<Accordion title="混流布局示例 1：两个画面水平平铺" defaultOpen="false">
<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Common/ZegoExpressEngine/mixstreamdemo1.png" /></Frame>

```javascript
// 设置inputList
const inputList = [
    {
        streamID: "streamA", // 左边的流
        layout: {
            top: 0,
            left: 0,
            bottom: 640,
            right: 180,
        },
    },
    {
        streamID: "streamB", // 右边的流
        layout: {
            top: 0,
            left: 180,
            bottom: 640,
            right: 360,
        },
    }
]
// 开始混流
const result = await zg.startMixerTask({
    taskID:'taskUUID',
    inputList,
    // 设置混流输出
    outputList:['mixStreamID'],
    outputConfig: {
       outputBitrate: 300,
       outputFPS: 15,
       outputWidth: 360,
       outputHeight: 640,
    }
})

```
</Accordion>


<Accordion title="混流布局示例 2：四个画面水平垂直平铺" defaultOpen="false">
<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Common/ZegoExpressEngine/mixstreamdemo2.png" /></Frame>


```javascript
// 设置inputList
const inputList = [
    {
        streamID: "streamA", // 左上角的流
        layout: {
            top: 0,
            left: 0,
            bottom: 320,
            right: 180,
        },
    },
    {
        streamID: "streamC", // 左下角的流
        layout: {
            top: 320,
            left: 0,
            bottom: 640,
            right: 180,
        },
    },
    {
        streamID: "streamB", // 右上角的流
        layout: {
            top: 0,
            left: 180,
            bottom: 320,
            right: 360,
        },
    },
    {
        streamID: "streamD", // 右下角的流
        layout: {
            top: 320,
            left: 180,
            bottom: 640,
            right: 360,
        },
    }
]
// 开始混流
const result = await zg.startMixerTask({
    taskID:'taskUUID',
    inputList,
    // 设置混流输出
    outputList:['mixStreamID'],
    outputConfig: {
       outputBitrate: 300,
       outputFPS: 15,
       outputWidth: 360,
       outputHeight: 640,
    }
})

```
</Accordion>


<Accordion title="混流布局示例 3：一个大画面铺满和两个小画面悬浮" defaultOpen="false">
<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Common/ZegoExpressEngine/mixstreamdemo3.png" /></Frame>


输入流的图层层次由输入流在输入流列表中的位置决定，在列表中的位置越后，表示图层层次越高。如以下示例代码所示，第 2 条输入流的图层层次和第 3 条输入流的图层层次则比第 1 条输入流的层次要高，则第 2 条和第 3 条流悬浮第 1 条流的画面上。



```java
// 设置inputList
const inputList = [
    {
        streamID: "streamA", // 第一条流
        layout: {
            top: 0,
            left: 0,
            bottom: 640,
            right: 320,
        },
    },
    {
        streamID: "streamB", // 第二条流
        layout: {
            top:200,
            left:230,
            bottom:400,
            right: 340,
        },
    },
    {
        streamID: "streamC", // 第三条流
        layout: {
            top:420,
            left:230,
            bottom:620,
            right: 340,
        },
    }
]
// 开始混流
const result = await zg.startMixerTask({
    taskID:'taskUUID',
    inputList,
    // 设置混流输出
    outputList:['mixStreamID'],
    outputConfig: {
       outputBitrate: 300,
       outputFPS: 15,
       outputWidth: 360,
       outputHeight: 640,
    }
})

```
</Accordion>

#### 设置混流输出

在混流参数 “outputList” 中，输出流的 [target](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoMixStreamOutput) 可为流名 “streamID” 或 “URL”。如果需要将流推到 CDN 上，采用 “URL”；不需要将流推到 CDN 上时，由调用者决定采用 “URL” 或者 “streamID”。
"outputConfig" 参数可设置输出流的分辨率、帧率、码率、音频编码等。

<Warning title="注意">


- 混流输出的最大帧率默认限制在 20 帧以内，如果需要输出更大帧率，请联系技术支持进行配置。
- 如果需要 Web 端播放混流 CDN 资源，在使用 CDN 录制时，音频编码请选择 AAC-LC，由于部分浏览器（如 Google Chrome 和 Microsoft Edge）不兼容 HE-AAC 音频编码格式，会导致录制文件无法播放。

</Warning>



```javascript
const result = await zg.startMixerTask({
    taskID:'taskUUID',
    inputList,
    // 设置混流输出
    outputList:['mixStreamID'],

    outputConfig: {
       outputBitrate: 300,
       outputFPS: 15,
       outputWidth: 360,
       outputHeight: 640,
    }
})

```


#### （可选）设置混流图片水印

<Accordion title="混流图片水印设置" defaultOpen="false">
如果需要水印图片的 URL，请联系 ZEGO 技术支持获取。

以下代码演示设置一个 ZEGO 的图片水印放置于画面左上角：

```javascript
// 设置水印图片
const watermark = [
    {
        imageURL: "preset-id://zegowp.png",
        layout: {
            top: 0,
            left: 0,
            bottom: 100,
            right: 200,
        },
    }
]
// 开始混流
const result = await zg.startMixerTask({
    taskID:'taskUUID',
    inputList,
    watermark,
    // 设置混流输出
    outputList:['mixStreamID'],
    outputConfig: {
       outputBitrate: 300,
       outputFPS: 15,
       outputWidth: 360,
       outputHeight: 640,
    }
})

```
</Accordion>

#### （可选）设置混流背景图片

<Accordion title="混流背景图片设置" defaultOpen="false">
如果需要背景图片 [ZegoMixerImageInfo](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoMixerImageInfo) 的 URL，请联系 ZEGO 技术支持获取, 或者可以用网络图片，但只支持 HTTP 协议的。

```javascript
// 设置inputList
const inputList = [
    {
        streamID: "streamA", // 左边的流
        layout: {
            top: 0,
            left: 0,
            bottom: 640,
            right: 180,
        },
        // 设置混流背景图片
        imageInfo: {
            url: "preset-id://zegobg.png",
            displayMode: 1, // 当关闭摄像头时才展示背景图片，具体参数值可以查看接口文档
        }
    }
]
// 开始混流
const result = await zg.startMixerTask({
    taskID:'taskUUID',
    inputList,
    // 设置混流输出
    outputList:['mixStreamID'],
    outputConfig: {
       outputBitrate: 300,
       outputFPS: 15,
       outputWidth: 360,
       outputHeight: 640,
    }
})
```
</Accordion>

#### （可选）设置混流声浪回调

<Accordion title="混流声浪回调设置" defaultOpen="false">
<Warning title="注意">


在视频场景中，不建议打开声浪开关，否则web端拉HLS协议的流可能会出现兼容性问题。

</Warning>



可通过设置 [enableSoundLevel](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoMixStreamConfig#enable-sound-level) 参数选择是否开启混流的声浪回调通知，开启后（取值为 “True”）用户拉混流时可通过 [mixerSoundLevelUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoRTCEvent#mixer-sound-level-update) 回调收到每条单流的音量变化（声浪）信息。

```javascript
// 开始混流
const result = await zg.startMixerTask({
    taskID:'taskUUID',
    // 开启混流的声浪回调通知，开启后拉混流时可通过 [onMixerSoundLevelUpdate] 回调收到每条单流的声浪信息
    enableSoundLevel: true,
    inputList: {
        streamID: "streamA", // 左边的流
        layout: {
            top: 0,
            left: 0,
            bottom: 640,
            right: 180,
        },
        soundLevelID: 1, //混流音浪 ID，用于在 [mixerSoundLevelUpdate] 中找对应输入流的音浪值。
    },
    // 设置混流输出
    outputList:['mixStreamID'],
    outputConfig: {
       outputBitrate: 300,
       outputFPS: 15,
       outputWidth: 360,
       outputHeight: 640,
    }
})
```
</Accordion>

### 开始混流

在推流成功后，调用 [startMixerTask](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#start-mixer-task) 将混流配置发送至 ZEGO 混流服务器，并触发混流。

```javascript
const result = await zg.startMixerTask(config)
if(result.errorCode !== 0) {
    //混流失败
    console.error(result.extendedData)
}
```

<Note title="说明">


如果要混流纯音频数据，部分参数配置会有如下特殊处理：
- 输入流 “inputList” 纯音频配置规则：“top”、“left”、“bottom”、“right” 不能全设置为 “0”，或全设置为 “1”。推荐配置：“top = 0, left = 0, bottom = 1, right = 1”。
- “outputConfig” 纯音频配置规则：“outputFPS”、“outputBitrate” 不能设置为 “0”。推荐配置：“outputFPS = 1, outputBitrate = 1, outputResolution = (1,1)”。

</Note>



### 混流配置更新通知

当混流信息发生变更时，例如混流的输入流列表发生增减、调整混流视频输出码率等，修改该混流任务对象的参数，然后再调用一次 [startMixerTask](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#start-mixer-task) 即可更新 ZEGO 混流服务器上的混流配置。

<Warning title="注意">


更新混流任务的配置时，“taskID” 不可更改。

</Warning>



常见错误码及含义如下：

错误码 | 说明
-----|------
 errorCode = 150 | 混流的输入流不存在，请检查输入流是否正常。
 errorCode = 151 | 混流失败，请检查混流流程是否处理正常。
 errorCode = 152 | 停止混流失败，请检查混流流程是否处理正常。
 errorCode = 153 | 输入参数错误，请检查输入参数是否正确。
 errorCode = 154 | 输出参数错误，请检查输出参数是否正确。
 errorCode = 155 | 输入分辨率格式错误，请检查输入分辨率格式是否正确。
 errorCode = 156 | 输出分辨率格式错误，请检查输出分辨率格式是否正确。
 errorCode = 157 | 混流没开，请检查是否开启混流模式。


### 停止混流

停止混流是通过调用 [stopMixerTask](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#stop-mixer-task) 实现。

<Warning title="注意">


开始混流和停止混流使用的 “taskID” 需要保持一致。

</Warning>



```javascript
try {
    await zg.stopMixerTask(taskID);
    alert('停止混流成功。。。');
} catch (err) {
    alert('停止混流失败。。。');
    console.log('stopMixStream err: ', err);
}
```

## 自动混流使用步骤

### 初始化并登录房间

请参考 [快速开始 - 实现流程](https://doc-zh.zego.im/article/7638#CreateEngine) 的 “创建引擎” 和 “登录房间”。

<Warning title="注意">


- 自动混流的前置条件为目标房间存在。
- 发起自动混流的用户可以混房间内已有的其他用户推的流（只能混音频流），而自己不用登录房间或者在房间内推流。

</Warning>



### 设置混流配置，开始自动混流

[ZegoAutoMixerTask](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoAutoMixerTask) 是 SDK 中定义的自动混流任务配置对象，通过配置该对象可定制化自动混流任务。

#### 设置混流配置，开始自动混流

新建一个自动混流任务对象，然后分别设置输入、输出等参数。

- 一个房间内只能存在一个自动混流任务 ID，即保证自动混流任务 ID 的唯一性，建议自动混流任务 ID 与房间 ID 关联，可直接使用房间 ID 作为自动混流任务 ID。
- 需要自动混流的房间 ID，如果房间不存在则无法自动混流。

```javascript
zg.startAutoMixerTask({
    taskID, // 自动混流任务的任务 ID
    roomID: "room1", // 自动混流任务的房间 ID
    audioConfig: {
        bitrate: 64,
        channel: 2,
        codecID: 6
    },
    outputList: [
        // 自动混流输出列表
        {
            target: mixStreamID
        }
    ],
    enableSoundLevel: true
})
    .then(res => {
        console.warn("startAutoMixer", res);
    })
    .catch(e => {
        console.error("startAutoMixer", e);
    });
}
```


#### （可选）设置自动混流音频配置

<Accordion title="自动混流音频配置" defaultOpen="false">
通过 [ZegoMixerAudioConfig](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoMixerAudioConfig) 设置自动混流音频相关配置，主要包括音频码率、声道数、编码 ID，以及多路音频流混音模式。

```javascript
zg.startAutoMixerTask({
    taskID, // 自动混流任务的任务 ID
    roomID: "room1", // 自动混流任务的房间 ID
    // 音频配置
    audioConfig: {
        bitrate: 64, // 音频码率
        channel: 2, // 音频声道数
        codecID: 6
    },
    outputList: [
        // 自动混流输出列表
        {
            target: mixStreamID
        }
    ]
})
    .then(res => {
        console.warn("startAutoMixer", res);
    })
    .catch(e => {
        console.error("startAutoMixer", e);
    });
```

通过 [channel](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoMixerAudioConfig) 参数可以修改音频声道，目前支持如下音频声道:

|枚举值|说明|适用场景|
|-|-|-|
|1|单声道。|只有单声道的场景。|
|2|双声道。|有双声道的场景。|

通过 [codecID](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~enum~ZegoAudioCodecID) 参数可以修改编码 ID，目前支持如下编码 ID:

|枚举值|说明|适用场景|
|-|-|-|
|1|<ul><li>码率范围 10 kbps ~ 128 kbps。</li><li>支持双声道。</li><li>延迟在 500ms 左右。</li><li>需要服务端云转码，转推 CDN 时不需要服务端云转码。</li></ul>|可用于 RTC 和 CDN 推流。|
|2|<ul><li>兼容性好，码率范围 16 kbps ~ 192 kbps。</li><li>支持双声道</li><li>延迟 350ms 左右</li><li>相同码率下（较低码率），音质弱于枚举值为 1 时的效果。</li><li>需要服务端云转码，转推 CDN 时不需要服务端云转码。</li></ul>|可用于 RTC 和 CDN 推流。|
|6|<ul><li>码率范围 6 kbps ~ 192 kbps。</li><li>支持双声道</li><li>延迟在 200ms 左右。</li><li>相同码率下（较低码率），音质明显好于枚举值为 1 和 2 时的效果，CPU 开销较低。</li><li>不需要服务端云转码，转推 CDN 时需要服务端转码。</li></ul>|仅可用于 RTC 推流。|
</Accordion>



#### （可选）设置自动混流声浪回调

<Accordion title="自动混流声浪回调设置" defaultOpen="false">
<Warning title="注意">


在视频场景中，不建议打开声浪开关，否则web端拉HLS协议的流可能会出现兼容性问题。

</Warning>



可通过设置 [enableSoundLevel](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoAutoMixerTask#enable-sound-level) 参数选择是否开启自动混流的声浪回调通知，开启后（取值为 “True”）用户拉混流时可通过 [AutoMixerSoundLevelUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoRTCEvent#auto-mixer-sound-level-update) 回调收到每条单流的音量变化（声浪）信息。

```javascript
zg.startAutoMixerTask({
    taskID, // 自动混流任务的任务 ID
    roomID: "room1", // 自动混流任务的房间 ID
    outputList: [
        {
            target: mixStreamID
        }
    ],
    enableSoundLevel: true
})
    .then(res => {
        console.warn("startAutoMixer", res);
    })
    .catch(e => {
        console.error("startAutoMixer", e);
    });
```
</Accordion>




### 停止自动混流

调用 [stopAutoMixerTask ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#stop-auto-mixer-task) 接口停止自动混流。

<Warning title="注意">


在同一个房间内开启下一个自动混流任务前，请先调用 [stopAutoMixerTask ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#stop-auto-mixer-task) 接口结束上一次自动混流任务，以免造成当一个主播已经开启下一个自动混流任务与其他主播混流时，观众依然在一直拉上一个自动混流任务的输出流的情况。若用户未主动结束当前自动混流任务，该任务将在房间关闭后自动结束。

</Warning>




```javascript
// 传入之前创建的混流任务对象
zg.stopAutoMixerTask({
    taskID: taskID,
    roomID: "room1",
})
    .then(res => {
        console.warn("stopAutoMixerTask", res);
    })
    .catch(e => {
        console.error("stopAutoMixerTask", e);
    });
```

## 全自动混流使用步骤

通过 ZEGO 服务端的配置实现每个房间都自动混音频流，详情请联系 ZEGO 技术支持。
