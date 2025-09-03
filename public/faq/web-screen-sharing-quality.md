<Title>如何解决 Web 平台屏幕共享的质量问题？</Title>



- - -

当在 Web 平台使用屏幕共享推流时，出现了共享画面模糊或者卡顿的情况，您可以参考如下操作步骤进行处理。

1. 建议使用最新版本的 Chrome 浏览器。

2. 在推流 [startPublishingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine&jumpType=route#start-publishing-stream) 时设置视频编码 [videoCodec](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoWebPublishOption#video-codec) 为 “VP8”。

<Note title="说明">



拉流端要拉 “VP8” 或转码。

</Note>






```javascript
// localStream 为创建流获取的 MediaStream 对象
zg.startPublishingStream(streamID, localStream, { videoCodec: 'VP8' })
```

3. 确认您共享的是否为应用窗口。
   - 如果是，建议改为共享整个屏幕或者共享浏览器标签页。
   <Frame width="512" height="auto" caption=""><Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Web/ExpressSDK/Common/Screen_Sharing_Web.png" /></Frame></Frame>
4. 调用 [createStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine&jumpType=route#create-stream) 接口创建屏幕共享流时，您可以根据对画质的要求（清晰度、流畅度），通过 [screen](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoLocalStreamConfig#screen) 对象下的 “videoQuality” 参数设置屏幕共享视频质量（分辨率、帧率和码率）。
5. 
   - 如果不是，检查您在 [createStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine&jumpType=route#create-stream) 接口中设置的屏幕编码配置是否正常，即执行“步骤 4”。
   

该参数的取值及含义如下：

<table>
  
  <tbody><tr>
    <th>取值</th>
    <th>分辨率</th>
    <th>帧率（fps）</th>
    <th>码率（kbps）</th>
    <th>应用场景</th>
  </tr>
  <tr>
    <td>1</td>
    <td>实际共享分辨率宽 × 实际共享分辨率高</td>
    <td>20</td>
    <td>800</td>
    <td>“1” 为预设值，帧率较大，适用于对视频流畅度要求较高的场景。</td>
  </tr>
  <tr>
    <td>2</td>
    <td>实际共享分辨率宽 × 实际共享分辨率高</td>
    <td>15</td>
    <td>1500</td>
    <td>“2” 为预设值，适用于在视频流畅度和清晰度之间取得平衡的场景。</td>
  </tr>
  <tr>
    <td>3</td>
    <td>实际共享分辨率宽 × 实际共享分辨率高</td>
    <td>5</td>
    <td>2000</td>
    <td>“3” 为预设值，码率较大，适用于对视频清晰度要求较高的场景。</td>
  </tr>
  <tr>
    <td>4</td>
    <td>width × height</td>
    <td>frameRate</td>
    <td>bitrate</td>
    <td>“4” 为自定义取值，适用于开发者想根据自己需要设置共享区域、帧率、码率的场景。</td>
  </tr>
</tbody></table>

```javascript
const screenStream = await zg.createStream({
    screen: {
        videoQuality: 2,
    },
});
```

<Note title="说明">



详细的功能介绍和实现流程请参考 [视频进阶 - 屏幕共享](/real-time-video-web/video/screen-sharing)。


</Note>


