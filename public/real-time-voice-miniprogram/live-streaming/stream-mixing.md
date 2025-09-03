# 混流

- - -

## 简介

混流是把多路音视频流从云端混合成单流的技术。

主播端和观众端均可主动触发混流。SDK 既支持音视频混流，也支持纯音频混流。本文主要以**主播端及观众端推流后混流**为例，其他时机时设置混流的步骤类似，不再赘述。

SDK 对设置混流的时机没有硬性要求，建议开发者在拉流/推流后，或根据需求，在其他合适时机进行混流。

<Warning title="注意">
本功能仅支持在 `微信小程序` 上使用。
</Warning>

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




## 前提条件

在设置混流前，请确保已在项目中实现了基本的音视频推拉流功能，详情请参考 [微信小程序 - 集成 SDK](https://doc-zh.zego.im/article/18273) 和 [微信小程序 - 实现流程](https://doc-zh.zego.im/article/18272)。

<Warning title="注意">


混流功能不是默认开启的，使用前请在 [ZEGO 控制台](https://console.zego.im) 自助开通（开通步骤请参考 [项目管理 - 服务配置](/console/service-configuration/enable-stream-mixing-service) 中的“混流”），或联系 ZEGO 技术支持开通。

</Warning>



## 手动混流步骤

按照上述流程，SDK API 调用过程如下所示。

### 设置混流配置

**混流配置参数**

开发者可以调用 [ZegoMixStreamConfig](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_wxxcx~interface~ZegoMixStreamConfig) 设置混流相关的参数。`taskID` 为混流任务 ID，由开发者自定义，须保证是唯一的。[inputList](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_wxxcx~interface~ZegoMixStreamConfig#input-list) 为输入流列表，列表中是 [ZegoMixStreamInput](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_wxxcx~interface~ZegoMixStreamInput) 对象，表示为 `streamID` 的流，根据所需的输入流个数构建 N 个 [ZegoMixStreamInput](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_wxxcx~interface~ZegoMixStreamInput) 放入输入流列表。

<Warning title="注意">


SDK 对混流画面布局采用输入流列表中的输入流排序，按照叠放的方式布局，为了避免大布局遮挡小布局，将输入流信息放进列表时需将大布局的输入流排在小布局输入流前面；例如，想在 A 布局上再放一个小布局 B，输入流列表就应写 `ZegoMixStreamInput[] inputStreamInfo = {streamInfoA, streamInfoB}`。

</Warning>




**输入流使用示例**

[ZegoMixStreamInput](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_wxxcx~interface~ZegoMixStreamInput) 的使用示例：假设指定某条流的左上角坐标为（50，300），右下角坐标为（200，450），这条流在最终的输出混流中的位置如下所示：
<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/iOS/ZegoLiveRoom/ZegoLiveRoom-MixStream/mixStreamInfo.png" /></Frame>

下面代码仅供参考：

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


const inputList = [{
        streamID: this.data.pushStreamID,
        layout: {
                top: 0,
                left: 0,
                bottom: 480,
                right: 640,
        }
}];
if (this.data.livePlayerList.length > 0) {
        const playerStream = this.data.livePlayerList[0]
        inputList.push({
                streamID: playerStream.streamID,
                layout: {
                        top: 480,
                        left: 0,
                        bottom: 960,
                        right: 640
                }
        });
}

```

<Note title="说明">

streamList 中的一个元素为输入流的参数配置，包括了 streamID 和布局，布局 layout 包括了 top、left、bottom 及 right。

</Note>





**输出流类型**

在混流参数`outputList`中，输出流的target 可为流名（streamID）或 URL，如果需要将流推到 CDN 上，采用 URL；不需要将流推到 CDN 上时，由调用者决定采用 URL 或者流名。

### 开始混流

在推流成功后，调用 [startMixerTask ](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_wxxcx~class~ZegoExpressEngine#start-mixer-task)  将混流配置发送至 Zego 混流服务器，并触发混流。

<Warning title="注意">


- 当混流信息发生变更（例如，混流的输入流列表发生增减、调整混流视频输出码率等），开发者仍然需要在合适的时机调用本接口，更新 Zego 混流服务器上的混流配置。
- 如果需要 Web 端播放混流 CDN 资源，在使用 CDN 录制时，音频编码请选择 AAC-LC，由于部分浏览器（如 Google Chrome 和 Microsoft Edge）不兼容 HE-AAC 音频编码格式，会导致录制文件无法播放。

</Warning>



Demo 中演示源代码如下：

```javascript
const inputList = [{
    streamID: this.data.pushStreamID,
    contentType	: 'video',
    layout: {
        top: 0,
        left: 0,
        bottom: 480,
        right: 640,
    }
}];
if (this.data.livePlayerList.length > 0) {
    const playerStream = this.data.livePlayerList[0]
    inputList.push({
        streamID: playerStream.streamID,
        contentType	: 'video',
        layout: {
            top: 480,
            left: 0,
            bottom: 960,
            right: 640
        }
    });
}
const outputList = [{
    target: this.data.mixStreamID,
}]
const outputConfig = {
    outputBitrate: 800 * 1000,
    outputFPS: 15,
    outputWidth: 640,
    outputHeight: 960,
}
const mixParam = {
    taskID: this.data.mixTaskID,
    inputList: inputList,
    outputList,
    outputConfig
};
console.log('mixParam', mixParam);
try {
    const result = await zg.startMixerTask(mixParam)
    console.log('mixPlayInfoList: ', result);
    const _mixPlayerUrls = []
    if (result.errorCode !== 0) {
        console.error('mix fail', result);
    }
    //2.12.1 及以前版本，支持通过 startPlayingStream 接口设置 isMix 参数为 true，此时只能从 CDN 拉混流。
    //2.12.2 及以后版本，支持通过 startPlayingStream 接口设置 sourceType 参数，此时可设置拉混流来源为 CDN 或 BGP。
    const { streamID, url } = await zg.startPlayingStream(this.data.mixStreamID, { isMix: true, sourceType: "BGP" })
    console.log('>>>[liveroom-room] startPlayingStream, streamID: ', streamID, ' url: ', url);
    _mixPlayerUrls.push({ streamID, url })
    this.setData({
        mixPlayerUrls: _mixPlayerUrls
    })
} catch (err) {
    console.log('err: ', err);
};
```

<Note title="说明">


如果要混流纯音频数据，部分参数配置会有如下特殊处理：
- 当混流输入流的 “contentType” 都设置为 “audio” 时，SDK 内部不处理布局字段，此时无需传 “layout” 参数。
- 当混流输入流的 “contentType” 都设置为 “audio” 时，SDK 内部会默认把分辨率设置为 1*1（即混流输出是纯音频）。如果您想要混流输出有视频画面或者背景图，则至少需要将一路输入流的 “contentType” 设置为 “video”。
- 输入流 “inputList” 纯音频配置规则：“top”、“left”、“bottom”、“right” 不能全设置为 “0”，或全设置为 “1”。推荐配置：“top = 0, left = 0, bottom = 1, right = 1”。
- “outputConfig” 纯音频配置规则：“outputFPS”、“outputBitrate” 不能设置为 “0”。推荐配置：“outputFPS = 1, outputBitrate = 1, outputResolution = (1,1)”。

</Note>





### 混流配置更新通知

混流请求发送成功后，调用者可在成功回调中获取混流配置的结果及混流 ID。

<Warning title="注意">
更新混流任务的配置时，“taskID” 不可更改。
</Warning>




**常见错误码及含义如下**

错误码 | 说明
-----|------
 errorCode = 150 | 混流的输入流不存在。请检查输入流是否正常
 errorCode = 151 | 混流失败。请检查混流流程是否处理正常
 errorCode = 152 | 停止混流失败。请检查混流流程是否处理正常
 errorCode = 153 | 输入参数错误，请检查输入参数是否正确
 errorCode = 154 | 输出参数错误，请检查输出参数是否正确
 errorCode = 155 | 输入分辨率格式错误，请检查输入分辨率格式是否正确
 errorCode = 156 | 输出分辨率格式错误，请检查输出分辨率格式是否正确
 errorCode = 157 | 混流没开，请检查是否开启混流模式


### 停止混流

停止混流是通过调用 [stopMixerTask](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_wxxcx~class~ZegoExpressEngine#stop-mixer-task) 实现。

参考代码如下：

<Warning title="注意">

开始混流和停止混流使用的 taskID 需要保持一致。

</Warning>




```javascript
try {
    const { errorCode } = await zg.stopMixerTask(this.data.mixTaskID)
    console.log('stopMixerTask ', errorCode)
    if (this.data.mixPlayerUrls.length > 0) {
        this.data.mixPlayerUrls.forEach((item) => {
            zg.stopPlayingStream(item.streamID);
        })
        this.setData({
            mixPlayerUrls: []
        })
    }
} catch (error) {
    console.error('error: ', error);
}
```

## 自动混流使用步骤

### 初始化并登录房间

请参考 [快速开始 - 实现流程](https://doc-zh.zego.im/) 的 “创建引擎” 和 “登录房间”。

<Warning title="注意">


- 自动混流的前置条件为目标房间存在。
- 发起自动混流的用户可以混房间内已有的其他用户推的流（只能混音频流），而自己不用登录房间或者在房间内推流。

</Warning>



### 设置混流配置，开始自动混流

[ZegoAutoMixerTask](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_wxxcx~interface~ZegoAutoMixerTask) 是 SDK 中定义的自动混流任务配置对象，通过配置该对象可定制化自动混流任务。

**设置混流配置，开始自动混流**

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
    ]
})
    .then(res => {
        console.warn("startAutoMixer", res);
    })
    .catch(e => {
        console.error("startAutoMixer", e);
    });
}
```


**（可选）设置自动混流音频配置**

<Accordion title="自动混流音频配置" defaultOpen="false">
通过 [ZegoMixerAudioConfig](https://doc-zh.zego.im/) 设置自动混流音频相关配置，主要包括音频码率、声道数、编码 ID，以及多路音频流混音模式。

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

通过 [channel](https://doc-zh.zego.im/) 参数可以修改音频声道，目前支持如下音频声道:

|枚举值|说明|适用场景|
|-|-|-|
|1|单声道。|只有单声道的场景。|
|2|双声道。|有双声道的场景。|

通过 [codecID](https://doc-zh.zego.im/) 参数可以修改编码 ID，目前支持如下编码 ID:

|枚举值|说明|适用场景|
|-|-|-|
|1|<ul><li>码率范围 10 kbps ~ 128 kbps。</li><li>支持双声道。</li><li>延迟在 500ms 左右。</li><li>需要服务端云转码，转推 CDN 时不需要服务端云转码。</li></ul>|可用于 RTC 和 CDN 推流。|
|2|<ul><li>兼容性好，码率范围 16 kbps ~ 192 kbps。</li><li>支持双声道</li><li>延迟 350ms 左右</li><li>相同码率下（较低码率），音质弱于枚举值为 1 时的效果。</li><li>需要服务端云转码，转推 CDN 时不需要服务端云转码。</li></ul>|可用于 RTC 和 CDN 推流。|
|6|<ul><li>码率范围 6 kbps ~ 192 kbps。</li><li>支持双声道</li><li>延迟在 200ms 左右。</li><li>相同码率下（较低码率），音质明显好于枚举值为 1 和 2 时的效果，CPU 开销较低。</li><li>不需要服务端云转码，转推 CDN 时需要服务端转码。</li></ul>|仅可用于 RTC 推流。|
</Accordion>



### 停止自动混流

调用 [stopAutoMixerTask ](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_wxxcx~class~ZegoExpressEngine#stop-auto-mixer-task) 接口停止自动混流。

<Warning title="注意">


在同一个房间内开启下一个自动混流任务前，请先调用 [stopAutoMixerTask ](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_wxxcx~class~ZegoExpressEngine#stop-auto-mixer-task) 接口结束上一次自动混流任务，以免造成当一个主播已经开启下一个自动混流任务与其他主播混流时，观众依然在一直拉上一个自动混流任务的输出流的情况。若用户未主动结束当前自动混流任务，该任务将在房间关闭后自动结束。

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

<Content />
