<Title>Web 平台如何推纯音频的流？</Title>



- - -

SDK 内部默认推音视频，如果想要推纯音频流，则调用 [createStream ](https://doc-zh.zego.im/zh/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#create-stream) 方法时，需要将 camera 对象的属性 “video” 设为 "false"。

```js
let localStream = await zg.createStream({
        camera: {
            video: false,//不推视频
            audio: true,
       }
  });
```