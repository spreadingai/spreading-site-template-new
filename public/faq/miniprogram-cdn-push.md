<Title>小程序如何直推 CDN？</Title>



- - -

调用 [startPublishingStream ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_wxxcx~class~ZegoExpressEngine&jumpType=route#start-publishing-stream) 方法，将 “publishOption” 中的参数 “sourceType” 设置为 “CDN” 即可获取到 CDN 推流地址，用该地址进行推流即可。

```JavaScript
const { url } = await zg.startPublishingStream(data.pushStreamID,{sourceType:"CDN"})
```
