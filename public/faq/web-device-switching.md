<Title>Web 平台上，Express 如何在通话中切换音视频输入设备？</Title>



- - -

## Web 桌面端切换音视频输入设备

音视频输入设备通过设备 ID（deviceId） 标识，每个音视频设备均有一个唯一的设备 ID，可以通过 [enumDevices](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine&jumpType=route#enum-devices) 接口获取。设备 ID 是随机生成的，部分情况下同一个设备的 ID 可能会改变，因此我们建议每次切换设备时都先调用 [enumDevices](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine&jumpType=route#enum-devices) 接口获取设备 ID。

为了保护用户隐私，Chrome 81 及以上版本、Safari 和 Firefox 浏览器需要在获得媒体设备权限后才能获取设备 ID。可以通过创建临时的流采集音视频，触发媒体设备权限申请，以获得完整的设备信息。通过如下代码触发麦克风和摄像头的权限申请。
 ```javascript
 const stream = zg.createStream();
 zg.destroyStream(stream);
 ```

1. 调用 [enumDevices](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine&jumpType=route#enum-devices) 获取设备 ID。

2. 调用如下接口实时切换设备。
    - [useVideoDevice](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine&jumpType=route#use-video-device)：切换摄像头
    - [useAudioDevice](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine&jumpType=route#use-audio-device) ：切换麦克风


```javascript

const deviceInfo = await zg.enumDevices();

//切换摄像头
const cameras = deviceInfo.cameras;

const res = await zg.useVideoDevice(localStream, cameras[1].deviceID);

//切换麦克风
const microphones = deviceInfo.microphones;

const res = await zg.useAudioDevice(localStream, microphones[1].deviceID);
```

## Web 移动端切换视频输入设备

<Note title="说明">



移动端切换音频输入设备的操作与桌面端一致，详情请参考上一章节 桌面端切换音视频输入设备。

</Note>





如果要在移动端切换视频输入设备，例如从后置摄像头切换为前置摄像头，在调用切换设备接口之前必须先关闭当前视频轨道。

<Warning title="注意">


如果要在移动端切换视频输入设备，例如从后置摄像头切换为前置摄像头，在调用 [useVideoDevice](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine&jumpType=route#use-video-device) 接口之前必须先关闭当前视频轨道。

</Warning>





``` JavaScript
//关闭当前视频轨道
localStream.getVideoTracks().forEach(track => track.stop());
zg.useVideoDevices(localStream, deviceID);
```
