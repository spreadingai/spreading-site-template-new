<Title>为什么在 Chrome 81 及以上版本浏览器上无法获取设备 ID？</Title>



- - -

## 问题描述

在 Chrome 81 浏览器上调用 [enumDevices](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#enum-devices) 接口，获取到的 “deviceID” 为空。

<Note title="说明">



在 Safari 浏览器和 Firefox 浏览器上也可能遇到该问题，问题原因和解决方案同下。


</Note>




## 问题原因

为了保护用户隐私，从 Chrome 81 版本起，如果浏览器没有获得使用媒体设备的权限，将无法获取设备 ID（deviceID） 信息。

在 ZEGO Express Web SDK 中，如果在调用 [creatStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#create-stream) 接口成功之前调用 [enumDevices](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#enum-devices)接口，则获得的 “deviceID” 可能为空。


## 解决方案

您可以通创建临时的流采集音视频，触发媒体设备权限申请，以获得完整的设备信息。

1. 创建临时的音频流和视频流分别用于采集音频和视频，触发麦克风和摄像头的权限申请。

2. 采集完音视频流后，调用 [enumDevices](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#enum-devices) 接口即可获得完整的设备信息。

<Warning title="注意">



- 如果您没有麦克风或者摄像头，或者这些设备被禁用了，采集可能会失败。此时采集音视频的目的是获取使用媒体设备的权限，只要确保采集失败不影响整个流程即可。

- 如果发生采集失败的情况，获取到的设备列表中可能会存在 “deviceId” 和 “deviceName” 为空的设备。


</Warning>




```javascript
 
// zg = new ZegoExpressEngine(appID, server);
let tempAudioStream: mediaStream,tempVideoStream: mediaStream;
try{
  tempAudioStream =  await zg.createStream({ camera:{ audio: true, video: false } });
  tempVideoStream =  await zg.createStream({ camera:{ audio: false, video: true } });
}catch(err){
  console.warn("create stream failed!", err);
}

// 音视频采集完成后，调用 enumDevices 获取 deviceName 和 deviceID
  const devices = await zg.enumDevices();
 console.log("get device info!", devices);
});

```
