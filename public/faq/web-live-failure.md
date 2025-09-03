<Title>如何处理 Web 平台直播过程中出现黑屏或无声？</Title>



- - -

当推流端发现本地预览画面突然黑屏时或者采集的声音突然没有了，很可能是由于设备松动、接触不良或拔出，导致音频或视频轨道停止。

出现该问题时，需要在插入设备后重新创建流并推流。具体操作如下：

1. 监听设备异常回调事件 [deviceError](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoRTCEvent&jumpType=route#device-error)。

<Note title="说明">


SDK 1.16.0 及以上版本才支持 [deviceError](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoRTCEvent&jumpType=route#device-error) 回调，若您当前使用的 SDK 低于 1.16.0 版本，请先升级。

</Note>



```javascript
const zg = zg = new ZegoExpressEngine(appID, server);
zg.on('deviceError', (errorCode, deviceName) => {
        // 提示用户确认设备是否正常工作
});
```

2. 当 SDK 触发 [deviceError](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoRTCEvent#device-error) 事件后，提示用户确认设备是否正常工作。

- 若设备正常，则结束操作。
- 若设备异常，请重新插入设备，并执行后续 3 个步骤。

3. 调用 [stopPublishingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine&jumpType=route#stop-publishing-stream) 接口停止当前推流。

```javascript
zg.stopPublishingStream(streamID);
```

4. 调用 [createStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#create-stream) 接口重新创建流。

```javascript
const localStream = await zg.createStream();
```

5. 调用 [startPublishingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#start-publishing-stream) 接口重新推流。

```javascript
zg.startPublishingStream(streamID, localStream)
```
